"use client";

import { useMemo, useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";

import CustomGoogleButton from "./GoogleBtn";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export function AuthDialog({ open, onOpenChange, onAuthSuccess }) {
  const router = useRouter();

  const [selectedTab, setSelectedTab] = useState("login"); // "login" | "signup"
  const [showOtp, setShowOtp] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendIn, setResendIn] = useState(0);
  const timerRef = useRef(null);

  const API_BASE = useMemo(
    () => process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "",
    []
  );

  const resetForm = () => {
    setEmail("");
    setName("");
    setProfileImg("");
    setOtp("");
    setShowOtp(false);
    setResendIn(0);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
  };

  const startResendTimer = (seconds = 30) => {
    setResendIn(seconds);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setResendIn((s) => {
        if (s <= 1) {
          clearInterval(timerRef.current);
          timerRef.current = null;
          return 0;
        }
        return s - 1;
      });
    }, 1000);
  };

  // ---------- Google ----------
  const handleGoogleSuccess = async (googleData) => {
    try {
      const accessToken = googleData?.access_token;
      if (!accessToken) throw new Error("No access token received");

      setLoading(true);

      // 1️⃣ Get user info from Google
      const profileRes = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      const profile = await profileRes.json();

      // 2️⃣ Send to backend
      const res = await fetch(`${API_BASE}/api/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: accessToken }), // ✅ backend will verify this
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Login failed");
        return;
      }

      // 3️⃣ Save to local storage
      if (data?.token) localStorage.setItem("token", data.token);
      if (data?.user) localStorage.setItem("user", JSON.stringify(data.user));

      toast.success({
        title: "Success",
        description: "Signed in successfully",
      });
      onAuthSuccess?.({ token: data.token, user: data.user });
      onOpenChange(false);
    } catch (err) {
      console.error("Google sign-in error:", err);
      toast({
        title: "Error",
        description: err.message || "Login failed",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    toast({
      title: "Error",
      description: "Google login failed",
      variant: "destructive",
    });
  };

  // ---------- Email/OTP ----------
  const handleEmailSubmit = async () => {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    if (selectedTab === "signup" && !name) {
      toast.error("Please enter your name");
      return;
    }

    try {
      setLoading(true);

      const check = await fetch(`${API_BASE}/api/auth/check-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }).then((r) => r.json());

      if (selectedTab === "login" && check?.exists === false) {
        toast.error("Account not found. Please sign up first.");
        setLoading(false);
        return;
      }

      if (selectedTab === "signup" && check?.exists === true) {
        toast.warning("Account already exists. Switch to Login to continue.");
        setLoading(false);
        return;
      }

      const res = await fetch(`${API_BASE}/api/auth/request-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, type: selectedTab }),
      });

      const payload = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(payload?.message || `OTP request failed (${res.status})`);
        return;
      }

      setShowOtp(true);
      startResendTimer(30);
      toast.success("OTP sent! Check your email for the code.");
    } catch (err) {
      console.error(err);
      toast.error(err?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerify = async () => {
    if (otp.length !== 6) {
      toast.error("Please enter the 6-digit code");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_BASE}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          otp,
          type: selectedTab,
          name: selectedTab === "signup" ? name : undefined,
        }),
      });

      const payload = await res.json().catch(() => ({}));

      if (!res.ok) {
        // ✅ Detect Google-auth restriction (from backend)
        if (
          res.status === 403 ||
          payload?.message?.includes("Google Sign-In")
        ) {
          toast.warning(
            "This account was created using Google Sign-In. Please log in with Google instead."
          );
          return;
        }

        throw new Error(
          payload?.message || `OTP verification failed (${res.status})`
        );
      }

      if (payload?.token) localStorage.setItem("token", payload.token);
      if (payload?.user)
        localStorage.setItem("user", JSON.stringify(payload.user));

      toast.success(payload?.message || "You're now logged in!");
      onAuthSuccess?.({ token: payload.token, user: payload.user });
      resetForm();
      onOpenChange(false);
    } catch (err) {
      console.error("OTP verification error:", err);
      toast.error(err?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendIn > 0 || !email) return;
    await handleEmailSubmit();
  };

  const handleTabChange = (value) => {
    setSelectedTab(value);
    setShowOtp(false);
    setOtp("");
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) resetForm();
        onOpenChange(v);
      }}
    >
      <DialogContent className="sm:max-w-md animate-in fade-in-0 zoom-in-95 duration-300">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-center">
            {selectedTab === "login" ? "Welcome Back" : "Create your account"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-6 py-4">
          <div className="w-full flex justify-center">
            <div className="w-full flex justify-center">
              <CustomGoogleButton
                onSuccess={(data) => {
                  handleGoogleSuccess(data);
                }}
                onError={() =>
                  toast({
                    title: "Error",
                    description: "Google login failed",
                    variant: "destructive",
                  })
                }
              />
            </div>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with email
              </span>
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={selectedTab} onValueChange={handleTabChange}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            {/* LOGIN */}
            <TabsContent
              value="login"
              className="flex flex-col gap-4 animate-in slide-in-from-bottom-2 duration-300"
            >
              {!showOtp ? (
                <>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="transition-all duration-200 focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <Button
                    className="w-full bg-orange-500 hover:bg-orange-600 transition-all duration-200 hover:scale-[1.02]"
                    onClick={handleEmailSubmit}
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send OTP"}
                  </Button>
                </>
              ) : (
                <div className="flex flex-col gap-4 animate-in fade-in-0 duration-300">
                  <div className="flex justify-center">
                    <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  <Button
                    className="w-full bg-orange-500 hover:bg-orange-600 transition-all duration-200 hover:scale-[1.02]"
                    onClick={handleOtpVerify}
                    disabled={loading}
                  >
                    {loading ? "Verifying..." : "Verify OTP"}
                  </Button>
                  <div className="flex items-center justify-between">
                    <Button
                      variant="ghost"
                      className="px-0"
                      onClick={() => setShowOtp(false)}
                    >
                      Back
                    </Button>
                    <Button
                      variant="ghost"
                      className="px-0"
                      onClick={handleResend}
                      disabled={resendIn > 0}
                    >
                      {resendIn > 0 ? `Resend in ${resendIn}s` : "Resend code"}
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>

            {/* SIGNUP */}
            <TabsContent
              value="signup"
              className="flex flex-col gap-4 animate-in slide-in-from-bottom-2 duration-300"
            >
              {!showOtp ? (
                <>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="signup-name">Name</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="transition-all duration-200 focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="transition-all duration-200 focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <Button
                    className="w-full bg-orange-500 hover:bg-orange-600 transition-all duration-200 hover:scale-[1.02]"
                    onClick={handleEmailSubmit}
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send OTP"}
                  </Button>
                </>
              ) : (
                <div className="flex flex-col gap-4 animate-in fade-in-0 duration-300">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="otp">Enter 6-digit code</Label>
                    <div className="flex justify-center">
                      <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                  </div>
                  <Button
                    className="w-full bg-orange-500 hover:bg-orange-600 transition-all duration-200 hover:scale-[1.02]"
                    onClick={handleOtpVerify}
                    disabled={loading}
                  >
                    {loading ? "Verifying..." : "Verify OTP"}
                  </Button>
                  <div className="flex items-center justify-between">
                    <Button
                      variant="ghost"
                      className="px-0"
                      onClick={() => setShowOtp(false)}
                    >
                      Back
                    </Button>
                    <Button
                      variant="ghost"
                      className="px-0"
                      onClick={handleResend}
                      disabled={resendIn > 0}
                    >
                      {resendIn > 0 ? `Resend in ${resendIn}s` : "Resend code"}
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
