"use client";
import { useEffect, useState } from "react";
import { CalendarIcon, Users, Plus, Minus } from "lucide-react";
import { format, addDays } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Calendar } from "../../components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { cn } from "../../lib/utils";
import { toast } from "../../hooks/use-toast";

export default function EnquireNow({
  basePrice,
  currency,
  tourDuration = 3,
  tagMonths = [],
  tourType = "fixed_date",
  tourId,
  getDateRange,
  creatorId,
}) {
  console.log("tourType", tourType, getDateRange);

  const [dateRange, setDateRange] = useState(getDateRange);
  const [guests, setGuests] = useState({ adults: 2, children: 0 });
  const [selectedTab, setSelectedTab] = useState(
    tourType == "both" ? "fixed_date" : tourType
  );
  const [showGuestDetails, setShowGuestDetails] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  // Contact form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

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

  const handleSendEnquiry = async (e) => {
    e.preventDefault();
    const payload = {
      name,
      email,
      phone,
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
      tourCreatedBy: creatorId,
    };
    console.log("Enquiry Payload:", payload);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/enquiries`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
        },
        body: JSON.stringify(payload),
      }
    );
    const result = await res.json(); // 👈 parse JSON response

    console.log(result);

    if (!result.success) {
      console.error("Failed to send enquiry:", res);

      return;
    }

    setShowDialog(false);
    setName("");
    setEmail("");
    setPhone("");
    toast({ title: "Success", description: "Enquiry sent successfully" });
  };

  return (
    <>
      <Card className="w-full max-w-2xl shadow-lg border-border">
        <CardHeader className="flex flex-col gap-1">
          <CardTitle className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground">
            Plan Your Journey
          </CardTitle>
          <CardDescription className="text-sm sm:text-base text-muted-foreground">
            Select your travel dates and number of guests
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          {/* Tab Selector */}
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

          {/* Date Range Picker */}
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
                  <CalendarIcon className="mr-2 h-4 w-4 text-orange-600" />
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
                      "bg-orange-600 text-white hover:bg-orange-700 focus:bg-orange-700",
                    day_today: "border border-orange-600",
                    day: "hover:bg-orange-100",
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Guests Selector */}
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
              <Users className="mr-2 h-4 w-4 text-orange-600" />
              {totalGuests} {totalGuests === 1 ? "Guest" : "Guests"}
            </Button>

            {showGuestDetails && (
              <div className="mt-3 p-4 border border-border rounded-lg bg-card flex flex-col gap-4">
                {/* Adults */}
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
                      <Minus className="h-4 w-4 text-orange-600" />
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
                      <Plus className="h-4 w-4 text-orange-600" />
                    </Button>
                  </div>
                </div>

                {/* Children */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground text-sm sm:text-base">
                      Children
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Ages 0–12
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
                      <Minus className="h-4 w-4 text-orange-600" />
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
                      <Plus className="h-4 w-4 text-orange-600" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Submit */}
          <Button
            onClick={() => setShowDialog(true)}
            className="w-full h-11 sm:h-12 bg-orange-600 hover:bg-orange-700 text-white font-medium text-sm sm:text-base transition-colors"
          >
            Continue
          </Button>
        </CardContent>
      </Card>

      {/* Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl font-semibold text-orange-600">
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
                className="text-sm sm:text-base"
              />
            </div>

            {/* Summary */}
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
                  ₹{totalGuests * basePrice}
                </span>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-11 sm:h-12 bg-orange-600 hover:bg-orange-700 text-white font-medium text-sm sm:text-base transition-colors"
            >
              Send Enquiry
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
