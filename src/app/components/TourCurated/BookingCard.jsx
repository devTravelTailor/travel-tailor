"use client";
import { useEffect, useRef, useState } from "react";
import { CalendarIcon, Users, Plus, Minus, CheckCircle2, Lock } from "lucide-react";
import { format, addDays } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { cn } from "../../lib/utils";
import { toast } from "../../hooks/use-toast";

export default function EnquireNow({
  basePrice,
  currency,
  tourDuration = 3,
  tagMonths = [],
  tourType = "fixed_date",
  tourId,
  tourSlug,
  tourName,
  getDateRange,
  creatorId,
  isDisabled = false,
}) {
  const [dateRange, setDateRange] = useState(getDateRange);
  const [guests, setGuests] = useState({ adults: 2, children: 0 });
  const [selectedTab, setSelectedTab] = useState(
    tourType == "both" ? "fixed_date" : tourType
  );
  const [showGuestDetails, setShowGuestDetails] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const originalUrlRef = useRef("");
  const thankYouUrlAppliedRef = useRef(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValidDate = (date) => date instanceof Date && !isNaN(date);

  useEffect(() => {
    if (tourType === "fixed_date" && getDateRange) {
      const { startDate, endDate } = getDateRange;
      const validStartDate = isValidDate(startDate) ? startDate : null;
      const validEndDate = isValidDate(endDate) ? endDate : null;
      setDateRange({ startDate: validStartDate, endDate: validEndDate });
    }
  }, [tourType, getDateRange]);

  const handleSelect = (day) => {
    if (!day) return;
    const end = addDays(day, tourDuration - 1);
    setDateRange({ startDate: day, endDate: end });
  };

  const increment = (type) => setGuests((g) => ({ ...g, [type]: g[type] + 1 }));
  const decrement = (type) =>
    setGuests((g) => ({ ...g, [type]: Math.max(0, g[type] - 1) }));

  const totalGuests = guests.adults + guests.children;

  const handleTabChange = (type) => {
    setSelectedTab(type);
    if (type === "fixed_date") {
      setDateRange(getDateRange);
    }
  };

  const resetContactFields = () => {
    setName("");
    setEmail("");
    setPhone("");
  };

  const restoreThankYouUrl = () => {
    if (
      typeof window === "undefined" ||
      !thankYouUrlAppliedRef.current ||
      !originalUrlRef.current
    ) {
      return;
    }

    window.history.replaceState(window.history.state, "", originalUrlRef.current);
    thankYouUrlAppliedRef.current = false;
    originalUrlRef.current = "";
  };

  const applyThankYouUrl = () => {
    if (typeof window === "undefined" || thankYouUrlAppliedRef.current) {
      return;
    }

    const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    const normalizedPath = window.location.pathname.endsWith("/")
      ? window.location.pathname.slice(0, -1)
      : window.location.pathname;

    originalUrlRef.current = currentUrl;
    window.history.pushState(
      window.history.state,
      "",
      `${normalizedPath}/thankyou${window.location.search}${window.location.hash}`
    );
    thankYouUrlAppliedRef.current = true;
  };

  const getThankYouPageRoute = () => {
    if (typeof window === "undefined") return "";

    const normalizedPath = window.location.pathname.endsWith("/")
      ? window.location.pathname.slice(0, -1)
      : window.location.pathname;

    return `${normalizedPath}/thankyou${window.location.search}${window.location.hash}`;
  };

  const handleDialogChange = (open) => {
    setShowDialog(open);
    if (!open) {
      setShowThankYou(false);
      restoreThankYouUrl();
    }
  };

  useEffect(() => {
    if (showThankYou) {
      applyThankYouUrl();
      return;
    }

    restoreThankYouUrl();
  }, [showThankYou]);

  useEffect(() => () => restoreThankYouUrl(), []);

  const handleSendEnquiry = async (e) => {
    e.preventDefault();
    if (isSubmitting || isDisabled) return;
    setIsSubmitting(true);
    const payload = {
      name,
      email,
      phone,
      sourceType: "tour",
      sourcePage: tourSlug || "",
      pageRoute: getThankYouPageRoute(),
      startDate: dateRange?.startDate
        ? format(dateRange.startDate, "yyyy-MM-dd")
        : "",
      endDate: dateRange?.endDate
        ? format(dateRange.endDate, "yyyy-MM-dd")
        : "",
      adults: guests.adults,
      children: guests.children,
      totalPeople: totalGuests,
      totalPrice: basePrice * totalGuests,
      tour: tourId,
      tourId,
      tourSlug: tourSlug || "",
      tourName: tourName || "",
      tourCreatedBy: creatorId,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
          },
          body: JSON.stringify(payload),
        }
      );
      const result = await res.json();
      if (!result.success) {
        console.error("Failed to send enquiry:", result);
        toast({
          title: "Error",
          description: "Failed to send enquiry. Please try again.",
          variant: "destructive",
        });
        return;
      }

      resetContactFields();
      setShowThankYou(true);
      toast({ title: "Success", description: "Enquiry sent successfully" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isDisabled) {
    return (
      <Card className="w-full max-w-2xl shadow-xs border-amber-200 bg-amber-50/80">
        <CardHeader className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-amber-800">
            <Lock className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase tracking-[0.14em]">
              Past Trip
            </span>
          </div>
          <CardTitle className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">
            Plan Your Journey is closed
          </CardTitle>
          <CardDescription className="text-sm sm:text-base text-gray-600">
            This trip is completed, so new enquiries are disabled. The tour stays visible on the website as a past trip.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-2xl border border-amber-200 bg-white/80 p-4 text-sm text-gray-700">
            <div className="flex items-center justify-between gap-4">
              <span>Tour</span>
              <span className="font-medium text-right">{tourName || "This tour"}</span>
            </div>
            {dateRange?.startDate && dateRange?.endDate && (
              <div className="mt-3 flex items-center justify-between gap-4">
                <span>Dates</span>
                <span className="font-medium text-right">
                  {`${format(dateRange.startDate, "MMM dd")} - ${format(
                    dateRange.endDate,
                    "MMM dd, yyyy"
                  )}`}
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="w-full max-w-2xl shadow-xs border-border">
        <CardHeader className="flex flex-col gap-1">
          <CardTitle className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground">
            Plan Your Journey
          </CardTitle>
          <CardDescription className="text-sm sm:text-base text-muted-foreground">
            Select your travel dates and number of guests
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          {tourType === "both" && (
            <Tabs
              value={selectedTab}
              onValueChange={handleTabChange}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 text-sm sm:text-base">
                <TabsTrigger value="fixed_date">Fixed Date</TabsTrigger>
                <TabsTrigger value="flexible_date">Flexible Date</TabsTrigger>
              </TabsList>
            </Tabs>
          )}

          <div className="flex flex-col gap-2">
            <Label
              htmlFor="dates"
              className="text-sm sm:text-base font-medium text-muted-foreground"
            >
              Travel Dates
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="dates"
                  disabled={selectedTab === "fixed_date"}
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal h-12 border-input hover:bg-secondary transition-colors text-sm sm:text-base",
                    !dateRange && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-[#ff5b06]" />
                  {dateRange?.startDate ? (
                    dateRange.endDate ? (
                      <>
                        {format(dateRange.startDate, "MMM d, yyyy")} -{" "}
                        {format(dateRange.endDate, "MMM d, yyyy")}
                      </>
                    ) : (
                      format(dateRange.startDate, "MMM d, yyyy")
                    )
                  ) : (
                    <span>Pick your dates</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="single"
                  defaultMonth={dateRange?.startDate}
                  selected={dateRange?.startDate}
                  onSelect={handleSelect}
                  disabled={(date) => date < new Date()}
                  className="pointer-events-auto"
                  classNames={{
                    day_selected:
                      "bg-[#ff5b06] text-white hover:bg-orange-700 focus:bg-orange-700",
                    day_today: "border border-[#ff5b06]",
                    day: "hover:bg-orange-100",
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex flex-col gap-2">
            <Label
              htmlFor="guests"
              className="text-sm sm:text-base font-medium text-muted-foreground"
            >
              Guests
            </Label>
            <Button
              id="guests"
              variant="outline"
              onClick={() => setShowGuestDetails(!showGuestDetails)}
              className="w-full justify-start text-left font-normal h-12 border-input hover:bg-secondary transition-colors text-sm sm:text-base"
            >
              <Users className="mr-2 h-4 w-4 text-[#ff5b06]" />
              {totalGuests} {totalGuests === 1 ? "Guest" : "Guests"}
            </Button>

            {showGuestDetails && (
              <div className="mt-3 p-4 border border-border rounded-lg bg-card flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground text-sm sm:text-base">
                      Adults
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Ages 13+
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => decrement("adults")}
                      disabled={guests.adults <= 1}
                      className="h-8 w-8 sm:h-9 sm:w-9 rounded-full border-input hover:bg-secondary"
                    >
                      <Minus className="h-4 w-4 text-[#ff5b06]" />
                    </Button>
                    <span className="w-6 sm:w-8 text-center font-medium text-foreground text-sm sm:text-base">
                      {guests.adults}
                    </span>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => increment("adults")}
                      disabled={guests.adults >= 10}
                      className="h-8 w-8 sm:h-9 sm:w-9 rounded-full border-input hover:bg-secondary"
                    >
                      <Plus className="h-4 w-4 text-[#ff5b06]" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground text-sm sm:text-base">
                      Children
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Ages 0-12
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => decrement("children")}
                      disabled={guests.children <= 0}
                      className="h-8 w-8 sm:h-9 sm:w-9 rounded-full border-input hover:bg-secondary"
                    >
                      <Minus className="h-4 w-4 text-[#ff5b06]" />
                    </Button>
                    <span className="w-6 sm:w-8 text-center font-medium text-foreground text-sm sm:text-base">
                      {guests.children}
                    </span>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => increment("children")}
                      disabled={guests.children >= 10}
                      className="h-8 w-8 sm:h-9 sm:w-9 rounded-full border-input hover:bg-secondary"
                    >
                      <Plus className="h-4 w-4 text-[#ff5b06]" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Button
            onClick={() => {
              setShowThankYou(false);
              setShowDialog(true);
            }}
            className="w-full h-11 sm:h-12 bg-[#ff5b06] hover:bg-orange-700 text-white font-medium text-sm sm:text-base transition-colors"
          >
            Continue
          </Button>
        </CardContent>
      </Card>

      <Dialog open={showDialog} onOpenChange={handleDialogChange}>
        <DialogContent
          showCloseButton={!isSubmitting}
          className={cn(
            "sm:max-w-md overflow-hidden",
            showThankYou &&
              "sm:max-w-lg border-0 bg-gradient-to-br from-orange-50 via-white to-amber-50 p-0 shadow-2xl data-[state=open]:zoom-in-100"
          )}
        >
          {showThankYou ? (
            <div className="relative px-6 py-8 sm:px-8 sm:py-10 text-center">
              <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#ff5b06] via-orange-400 to-amber-400" />
              <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#ff5b06]/10 animate-in zoom-in-50 duration-500">
                <CheckCircle2 className="h-11 w-11 text-[#ff5b06]" />
              </div>
              <DialogHeader className="items-center text-center">
                <DialogTitle className="text-2xl sm:text-3xl font-bold text-gray-900 animate-in slide-in-from-bottom-2 duration-500">
                  Thank You!
                </DialogTitle>
                <DialogDescription className="max-w-md text-sm sm:text-base leading-relaxed text-gray-600 animate-in slide-in-from-bottom-3 duration-700">
                  Your enquiry for <span className="font-semibold text-gray-900">{tourName || "this tour"}</span> has been sent successfully. Our team will review your travel details and get back to you shortly.
                </DialogDescription>
              </DialogHeader>
              <div className="mt-6 rounded-2xl border border-orange-100 bg-white/80 p-4 text-left shadow-sm animate-in slide-in-from-bottom-4 duration-700">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Travel Dates</span>
                  <span className="font-medium text-gray-900">
                    {dateRange?.startDate && dateRange?.endDate
                      ? `${format(dateRange.startDate, "MMM dd")} - ${format(
                          dateRange.endDate,
                          "MMM dd, yyyy"
                        )}`
                      : "To be confirmed"}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="text-gray-500">Guests</span>
                  <span className="font-medium text-gray-900">{totalGuests}</span>
                </div>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="text-gray-500">Estimated Total</span>
                  <span className="font-medium text-[#ff5b06]">
                    Rs.{totalGuests * basePrice}
                  </span>
                </div>
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center animate-in slide-in-from-bottom-5 duration-700">
                <Button
                  type="button"
                  onClick={() => {
                    setShowDialog(false);
                    setShowThankYou(false);
                    restoreThankYouUrl();
                  }}
                  className="bg-[#ff5b06] hover:bg-orange-700 text-white"
                >
                  Done
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowThankYou(false);
                    restoreThankYouUrl();
                  }}
                  className="border-[#ff5b06]/30 text-[#ff5b06] hover:bg-orange-50"
                >
                  Submit Another Enquiry
                </Button>
              </div>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl sm:text-2xl font-semibold text-[#ff5b06]">
                  Send Enquiry
                </DialogTitle>
                <DialogDescription className="text-sm sm:text-base text-muted-foreground">
                  Enter your contact details to receive a personalized quote
                </DialogDescription>
              </DialogHeader>

              <form
                onSubmit={handleSendEnquiry}
                className="flex flex-col gap-4 mt-4"
              >
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="name"
                    className="text-sm sm:text-base text-muted-foreground"
                  >
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    disabled={isSubmitting}
                    className="text-sm sm:text-base"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="email"
                    className="text-sm sm:text-base text-muted-foreground"
                  >
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isSubmitting}
                    className="text-sm sm:text-base"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="phone"
                    className="text-sm sm:text-base text-muted-foreground"
                  >
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 00000-00000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    disabled={isSubmitting}
                    className="text-sm sm:text-base"
                  />
                </div>

                <div className="pt-4 pb-2 border-t border-border flex flex-col gap-2 text-sm sm:text-base">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Travel Dates:</span>
                    <span className="font-medium text-foreground">
                      {dateRange?.startDate &&
                        dateRange?.endDate &&
                        `${format(dateRange.startDate, "MMM dd")} - ${format(
                          dateRange.endDate,
                          "MMM dd, yyyy"
                        )}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Guests:</span>
                    <span className="font-medium text-foreground">
                      {totalGuests} {totalGuests === 1 ? "person" : "people"} (
                      {guests.adults} {guests.adults === 1 ? "adult" : "adults"}
                      {guests.children > 0 &&
                        `, ${guests.children} ${
                          guests.children === 1 ? "child" : "children"
                        }`}
                      )
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Price:</span>
                    <span className="font-medium text-foreground">
                      Rs.{totalGuests * basePrice}
                    </span>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-11 sm:h-12 bg-[#ff5b06] hover:bg-orange-700 text-white font-medium text-sm sm:text-base transition-colors"
                >
                  {isSubmitting ? "Sending..." : "Send Enquiry"}
                </Button>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
