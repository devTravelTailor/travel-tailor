"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Input } from "../ui/input";

export default function EnquiryDialog({
  open,
  setOpen,
  onSubmit,
  guests,
  dateRange,
  totalPrice,
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // compute derived values
  const totalPeople = (guests?.adults || 0) + (guests?.children || 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const payload = {
      ...form,
      adults: guests?.adults || 0,
      children: guests?.children || 0,
      totalPeople,
      totalPrice: totalPrice || 0,
      startDate: dateRange?.startDate,
      endDate: dateRange?.endDate,
    };
    onSubmit(payload);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="border border-gray-100 max-w-md rounded-xl p-6">
        <DialogHeader>
          <DialogTitle className="text-orange-600 font-handwriting text-2xl font-semibold">
            Send
            <span className="text-black font-sans ml-1   font-semibold">
              Enquiry
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className=" flex flex-col gap-4">
          {/* Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Name</label>
            <Input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded-md p-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <Input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded-md p-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Phone</label>
            <Input
              type="tel"
              name="phone"
              placeholder="Your Phone Number"
              value={form.phone}
              onChange={handleChange}
              className="w-full border rounded-md p-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          {/* Read-only trip info */}
          <div className="  text-sm border-t  pt-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Travel Dates:</span>
              <span className="font-medium">
                {dateRange?.startDate
                  ? `${format(dateRange.startDate, "MMM d, yyyy")} - ${format(
                      dateRange.endDate,
                      "MMM d, yyyy"
                    )}`
                  : "N/A"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Adults:</span>
              <span>{guests?.adults || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Children:</span>
              <span>{guests?.children || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total People:</span>
              <span className="font-medium">{totalPeople}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Price:</span>
              <span className="font-medium">₹{totalPrice || 0}</span>
            </div>
          </div>

          {/* Submit */}
          <Button
            type="button"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium"
            onClick={handleSubmit}
          >
            Submit Enquiry
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
