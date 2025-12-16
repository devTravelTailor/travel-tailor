"use client";
import { useState } from "react";

import { Upload, X, FileText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "react-toastify";

export function CreatorApplicationDialog({ open, onOpenChange }) {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ---------- constants ----------
  const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "");
  const SIGN_ENDPOINT = `${API_BASE}/api/images/sign-upload`;

  // ---------- helpers ----------
  async function signUpload({ folder, filename, contentType, token }) {
    const res = await fetch(SIGN_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ folder, filename, contentType }),
    });
    if (!res.ok) throw new Error(`Sign failed: ${res.status}`);
    return res.json();
  }

  async function uploadFileToGCS(file, folder, token) {
    if (file.size > 10 * 1024 * 1024)
      throw new Error(`${file.name} exceeds 10MB`);

    const { uploadUrl, publicUrl } = await signUpload({
      folder,
      filename: `${Date.now()}-${file.name}`,
      contentType: file.type || "application/octet-stream",
      token,
    });

    const put = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": file.type || "application/octet-stream",
        "x-goog-acl": "public-read",
      },
      body: file,
    });
    if (!put.ok) throw new Error(`Upload failed: ${put.status}`);
    return publicUrl;
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Accept PDF, DOC, DOCX
      const allowedTypes = ["application/pdf"];
      if (!allowedTypes.includes(selectedFile.type)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF or Word document",
          variant: "destructive",
        });
        return;
      }
      if (selectedFile.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 10MB",
          variant: "destructive",
        });
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !file) {
      toast({
        title: "Missing information",
        description: "Please provide your name and upload your portfolio",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);

      // 1️⃣ Read token
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please Sign In Before");

        return;
      }

      // 2️⃣ Upload PDF to GCS (same helper as images)
      const folder = "uploads/creator-applications";
      const pdfUrl = await uploadFileToGCS(file, folder, token);

      // 3️⃣ POST application payload to backend
      const res = await fetch(`${API_BASE}/api/creator-requests/apply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: name.trim(),
          documentLink: pdfUrl, // <— the GCS URL
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        toast.error(err || "Submission failed");
        throw new Error(err || "Submission failed");
      }

      toast.success("Application submitted!");

      setName("");
      setFile(null);
      onOpenChange(false);
    } catch (err) {
      console.error(err);
      toast.error({
        title: "Upload failed",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeFile = () => setFile(null);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Apply to be a Smith
          </DialogTitle>
          <DialogDescription>
            Share your details and portfolio to start your journey as a travel
            creator.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="my-6 mt-4">
          {/* Name Input */}
          <div className="my-2">
            <Label htmlFor="name" className="text-sm mb-3 font-medium">
              Full Name
            </Label>
            <Input
              id="name"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-12 ring-0 outline-0 focus:outline-0 focus:ring-0  "
            />
          </div>

          {/* File Upload */}
          <div className="my-2">
            <Label className="text-sm mb-3 font-medium">
              Portfolio / Resume
            </Label>

            {!file ? (
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-[#ff5b06]/50 hover:bg-muted/50 transition-colors"
              >
                <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                <span className="text-sm  text-center text-muted-foreground">
                  Click to upload PDF document <br />( single pdf containing all
                  the details )
                </span>
                <span className="text-xs text-muted-foreground mt-1">
                  Max 10MB
                </span>
                <input
                  id="file-upload"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl border border-border">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#ff5b06]/10 rounded-lg">
                    <FileText className="w-5 h-5 text-[#ff5b06]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium truncate max-w-[200px]">
                      {file.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={removeFile}
                  className="h-8 w-8"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-12 bg-[#ff5b06] text-base font-semibold"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
