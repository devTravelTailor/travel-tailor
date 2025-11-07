"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";
import { Loader2, CheckCircle2, X } from "lucide-react";
import { usePopupTrigger } from "../../hooks/popupContext";

export default function PopupDialog() {
  const { isVisible, handleClose, handleSuccess } = usePopupTrigger();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+91",
    phoneNumber: "",
    requirement: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submitMessage, setSubmitMessage] = useState("");

  const countryCodes = [
    { code: "+91", country: "India" },
    { code: "+1", country: "USA" },
    { code: "+44", country: "UK" },
    { code: "+61", country: "Australia" },
    { code: "+27", country: "South Africa" },
    { code: "+971", country: "UAE" },
    { code: "+65", country: "Singapore" },
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email address is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email address";
    if (!formData.phoneNumber.trim())
      newErrors.phoneNumber = "Contact number is required";
    else if (!/^\d{7,15}$/.test(formData.phoneNumber.replace(/\D/g, "")))
      newErrors.phoneNumber = "Please enter a valid phone number";
    if (formData.requirement.length > 900)
      newErrors.requirement = "Requirement cannot exceed 900 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const data = {
        name: formData.name,
        email: formData.email,
        contact: `${formData.countryCode} ${formData.phoneNumber}`,
        requirement: formData.requirement || "",
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (res.ok) {
        setSubmitStatus("success");
        setSubmitMessage("Thank you! We’ll get back to you shortly.");
        setFormData({
          name: "",
          email: "",
          countryCode: "+91",
          phoneNumber: "",
          requirement: "",
        });
        setTimeout(() => handleSuccess(), 2500);
      } else {
        setSubmitStatus("error");
        setSubmitMessage("Something went wrong. Please try again.");
      }
    } catch {
      setSubmitStatus("error");
      setSubmitMessage("Unexpected error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isVisible} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg w-full max-h-[90vh] overflow-y-auto p-0 bg-white border border-gray-100 shadow-2xl rounded-xl animate-in fade-in-0 zoom-in-95">
        {/* Header */}
        <DialogHeader className="px-6 py-4 border-b border-gray-200">
          <DialogTitle className="text-2xl font-semibold text-gray-800">
            Plan Your Trip
          </DialogTitle>
          <DialogDescription className="text-gray-500 mt-1">
            Fill in your details and we’ll reach out shortly.
          </DialogDescription>
        </DialogHeader>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 px-6 py-4">
          {submitStatus && (
            <div
              className={`rounded-md px-4 py-3 text-sm font-medium ${
                submitStatus === "success"
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {submitMessage}
            </div>
          )}

          {/* Name */}
          <div className="flex flex-col gap-4">
            <Label htmlFor="name" className="text-gray-700 font-medium">
              Full Name *
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              disabled={isSubmitting}
              className={`${
                errors.name ? "border-red-500 focus-visible:ring-red-500" : ""
              }`}
            />
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-4">
            <Label htmlFor="email" className="text-gray-700 font-medium">
              Email Address *
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              disabled={isSubmitting}
              className={`${
                errors.email ? "border-red-500 focus-visible:ring-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-4">
            <Label className="text-gray-700 font-medium">
              Contact Number *
            </Label>
            <div className="flex gap-4">
              <select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm w-28 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {countryCodes.map(({ code, country }) => (
                  <option key={code} value={code}>
                    {country} ({code})
                  </option>
                ))}
              </select>
              <Input
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Your phone number"
                disabled={isSubmitting}
                className={`${
                  errors.phoneNumber
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }`}
              />
            </div>
            {errors.phoneNumber && (
              <p className="text-xs text-red-500">{errors.phoneNumber}</p>
            )}
          </div>

          {/* Requirement */}
          <div className="flex flex-col gap-4">
            <Label htmlFor="requirement" className="text-gray-700 font-medium">
              Requirement
            </Label>
            <Textarea
              id="requirement"
              name="requirement"
              value={formData.requirement}
              onChange={handleChange}
              placeholder="Tell us about your travel plans..."
              rows={4}
              maxLength={900}
              disabled={isSubmitting}
              className={`${
                errors.requirement
                  ? "border-red-500 focus-visible:ring-red-500"
                  : ""
              }`}
            />
            <p className="text-xs text-gray-400 text-right">
              {formData.requirement.length}/900
            </p>
            {errors.requirement && (
              <p className="text-xs text-red-500">{errors.requirement}</p>
            )}
          </div>

          {/* Footer */}
          <DialogFooter className="pt-2 flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto bg-primary text-white hover:bg-primary/90"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting
                </>
              ) : submitStatus === "success" ? (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
                  Submitted
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
