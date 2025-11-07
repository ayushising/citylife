import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Star, 
  MessageSquare, 
  Package, 
  Bell,
  LogOut,
  User,
  CheckCircle,
  AlertCircle,
  Edit,
  Shield,
  FileText,
  Download
} from "lucide-react";
import { servicePackages, mockBookings, mockReceipts, type Booking, type Receipt, timeSlots } from "../data/mockData";
import { toast } from "sonner";
// import logo from "figma:asset/ff974acc25be3bdb52e4b37eb1c66a6e7431e30c.png";

interface CustomerDashboardProps {
  userEmail: string;
  onLogout: () => void;
}

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const formatDateDisplay = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return date.toLocaleDateString('en-US', options);
};

const addMonths = (date: Date, months: number): Date => {
  const newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() + months);
  return newDate;
};

export function CustomerDashboard({ userEmail, onLogout }: CustomerDashboardProps) {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [selectedPackage, setSelectedPackage] = useState<string>("");
  const [bookingDate, setBookingDate] = useState<Date>();
  const [bookingTime, setBookingTime] = useState<string>("");
  const [bookingAddress, setBookingAddress] = useState("123 MG Road, Bangalore, Karnataka 560001");
  const [bookingPhone, setBookingPhone] = useState("+91 77380 84657");
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [complaint, setComplaint] = useState("");
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [isAnnualPackage, setIsAnnualPackage] = useState(false);
  const [rescheduleBookingId, setRescheduleBookingId] = useState<string | null>(null);
  const [rescheduleDate, setRescheduleDate] = useState<Date>();
  const [rescheduleTime, setRescheduleTime] = useState<string>("");

  const handleBookService = () => {
    if (!selectedPackage || !bookingDate || !bookingTime) {
      toast.error("Please fill all booking details");
      return;
    }

    const selectedPkg = servicePackages.find(p => p.id === selectedPackage);
    if (!selectedPkg) return;

    if (isAnnualPackage) {
      // Create 3 bookings for annual package
      const annualPackageId = `annual-${Date.now()}`;
      const baseDate = new Date(bookingDate);
      
      const service1Date = baseDate;
      const service2Date = addMonths(baseDate, 4);
      const service3Date = addMonths(baseDate, 8);

      const newBookings: Booking[] = [
        {
          id: `b${Date.now()}-1`,
          customerId: 'u1',
          customerName: 'John Doe',
          packageId: selectedPackage,
          packageName: `${selectedPkg.name} (Annual - Service 1/3)`,
          date: formatDate(service1Date),
          timeSlot: bookingTime,
          status: 'confirmed',
          address: bookingAddress,
          phone: bookingPhone,
          isAnnualPackage: true,
          annualPackageId,
          serviceNumber: 1
        },
        {
          id: `b${Date.now()}-2`,
          customerId: 'u1',
          customerName: 'John Doe',
          packageId: selectedPackage,
          packageName: `${selectedPkg.name} (Annual - Service 2/3)`,
          date: formatDate(service2Date),
          timeSlot: bookingTime,
          status: 'pending',
          address: bookingAddress,
          phone: bookingPhone,
          isAnnualPackage: true,
          annualPackageId,
          serviceNumber: 2
        },
        {
          id: `b${Date.now()}-3`,
          customerId: 'u1',
          customerName: 'John Doe',
          packageId: selectedPackage,
          packageName: `${selectedPkg.name} (Annual - Service 3/3)`,
          date: formatDate(service3Date),
          timeSlot: bookingTime,
          status: 'pending',
          address: bookingAddress,
          phone: bookingPhone,
          isAnnualPackage: true,
          annualPackageId,
          serviceNumber: 3
        }
      ];

      setBookings([...newBookings, ...bookings]);
      toast.success(`Annual package booked! 3 services scheduled at ${formatDateDisplay(service1Date)}, ${formatDateDisplay(service2Date)}, and ${formatDateDisplay(service3Date)}`);
    } else {
      // Single service booking
      const newBooking: Booking = {
        id: `b${Date.now()}`,
        customerId: 'u1',
        customerName: 'John Doe',
        packageId: selectedPackage,
        packageName: selectedPkg.name,
        date: formatDate(bookingDate),
        timeSlot: bookingTime,
        status: 'confirmed',
        address: bookingAddress,
        phone: bookingPhone
      };

      setBookings([newBooking, ...bookings]);
      toast.success("Booking confirmed! You'll receive a confirmation notification.");
    }

    setShowBookingDialog(false);
    setSelectedPackage("");
    setBookingDate(undefined);
    setBookingTime("");
    setIsAnnualPackage(false);
  };

  const handleReschedule = () => {
    if (!rescheduleBookingId || !rescheduleDate || !rescheduleTime) {
      toast.error("Please select new date and time");
      return;
    }

    setBookings(bookings.map(b => 
      b.id === rescheduleBookingId 
        ? { ...b, date: formatDate(rescheduleDate), timeSlot: rescheduleTime }
        : b
    ));

    toast.success("Booking rescheduled successfully!");
    setRescheduleBookingId(null);
    setRescheduleDate(undefined);
    setRescheduleTime("");
  };

  const handleSubmitFeedback = (bookingId: string) => {
    setBookings(bookings.map(b => 
      b.id === bookingId 
        ? { ...b, feedback: { rating, comment: feedback } }
        : b
    ));
    toast.success("Thank you for your feedback!");
    setFeedback("");
    setRating(0);
  };

  const handleSubmitComplaint = () => {
    if (!complaint) {
      toast.error("Please enter your complaint");
      return;
    }
    toast.success("Complaint submitted. Our team will contact you soon.");
    setComplaint("");
  };

  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const upcomingBookings = bookings.filter(b => 
    b.status === 'pending' || b.status === 'confirmed' || b.status === 'in-progress'
  );

  const pastBookings = bookings.filter(b => 
    b.status === 'completed' || b.status === 'cancelled'
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              {/* <img src={logo} alt="CycleLife" className="h-10" /> */}
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-gray-600" />
                <span className="text-sm text-gray-600">{userEmail}</span>
              </div>
              <Button variant="outline" onClick={onLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl mb-2 text-gray-900">Customer Dashboard</h1>
          <p className="text-gray-600">Manage your bookings and service history</p>
        </div>

        <Tabs defaultValue="book" className="space-y-6">
          <TabsList>
            <TabsTrigger value="book">Book Service</TabsTrigger>
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
            <TabsTrigger value="history">Service History</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
          </TabsList>

          {/* Book Service Tab */}
          <TabsContent value="book" className="space-y-6" id="booking">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {servicePackages.map((pkg) => (
                <Card key={pkg.id} className="hover:shadow-lg transition">
                  <CardHeader>
                    <CardTitle className="text-lg">{pkg.name}</CardTitle>
                    <CardDescription>{pkg.description}</CardDescription>
                    <div className="mt-4">
                      <div className="text-3xl text-gray-900">₹{pkg.price}</div>
                      <p className="text-sm text-gray-600">{pkg.duration}</p>
                      {pkg.serviceLevel !== 'Assembly' && (
                        <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded">
                          <p className="text-sm text-green-800">Annual: ₹{pkg.annualPrice}</p>
                          <p className="text-xs text-gray-600">3 services - Save 1 service!</p>
                        </div>
                      )}
                      {pkg.serviceLevel === 'Assembly' && (
                        <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded">
                          <p className="text-sm text-blue-800">One-time assembly</p>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-4">
                      {pkg.features.slice(0, 4).map((feature, i) => (
                        <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          {feature}
                        </li>
                      ))}
                      {pkg.features.length > 4 && (
                        <li className="text-sm text-blue-600">+{pkg.features.length - 4} more features</li>
                      )}
                    </ul>
                    <Dialog open={showBookingDialog && selectedPackage === pkg.id} onOpenChange={(open) => {
                      setShowBookingDialog(open);
                      if (!open) {
                        setSelectedPackage("");
                        setIsAnnualPackage(false);
                      }
                    }}>
                      <DialogTrigger asChild>
                        <Button 
                          className="w-full bg-blue-600 hover:bg-blue-700"
                          onClick={() => {
                            setSelectedPackage(pkg.id);
                            setShowBookingDialog(true);
                          }}
                        >
                          Book Now
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Book {pkg.name}</DialogTitle>
                          <DialogDescription>
                            Choose your preferred date and time for doorstep service
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          {pkg.serviceLevel !== 'Assembly' && (
                            <div className="space-y-2">
                              <Label>Package Type</Label>
                              <RadioGroup value={isAnnualPackage ? "annual" : "single"} onValueChange={(val) => setIsAnnualPackage(val === "annual")}>
                                <div className="flex items-center space-x-2 border rounded-lg p-3">
                                  <RadioGroupItem value="single" id="single" />
                                  <Label htmlFor="single" className="flex-1 cursor-pointer">
                                    <div>Single Service</div>
                                    <div className="text-sm text-gray-600">₹{pkg.price}</div>
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2 border border-green-500 bg-green-50 rounded-lg p-3">
                                  <RadioGroupItem value="annual" id="annual" />
                                <Label htmlFor="annual" className="flex-1 cursor-pointer">
                                  <div className="flex items-center gap-2">
                                    <span>Annual Package</span>
                                    <Badge className="bg-green-600">Save ₹{pkg.price}</Badge>
                                  </div>
                                  <div className="text-sm text-gray-600">₹{pkg.annualPrice} - 3 services (every 4 months)</div>
                                </Label>
                              </div>
                            </RadioGroup>
                            </div>
                          )}
                          <div className="space-y-2">
                            <Label>Select Date {isAnnualPackage && pkg.serviceLevel !== 'Assembly' && "(First Service)"}</Label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button variant="outline" className="w-full justify-start">
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {bookingDate ? formatDateDisplay(bookingDate) : "Pick a date"}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar
                                  mode="single"
                                  selected={bookingDate}
                                  onSelect={setBookingDate}
                                  disabled={(date) => date < new Date()}
                                />
                              </PopoverContent>
                            </Popover>
                            {isAnnualPackage && bookingDate && pkg.serviceLevel !== 'Assembly' && (
                              <div className="text-sm text-gray-600 bg-blue-50 p-2 rounded">
                                <p>Service 1: {formatDateDisplay(bookingDate)}</p>
                                <p>Service 2: {formatDateDisplay(addMonths(bookingDate, 4))}</p>
                                <p>Service 3: {formatDateDisplay(addMonths(bookingDate, 8))}</p>
                              </div>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label>Select Time Slot</Label>
                            <Select value={bookingTime} onValueChange={setBookingTime}>
                              <SelectTrigger>
                                <SelectValue placeholder="Choose time slot" />
                              </SelectTrigger>
                              <SelectContent>
                                {timeSlots.map((slot) => (
                                  <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Address</Label>
                            <Input 
                              value={bookingAddress}
                              onChange={(e) => setBookingAddress(e.target.value)}
                              placeholder="Enter your address"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Phone</Label>
                            <Input 
                              value={bookingPhone}
                              onChange={(e) => setBookingPhone(e.target.value)}
                              placeholder="Enter your phone"
                            />
                          </div>
                          <div className="bg-gray-50 p-3 rounded">
                            <p className="text-sm">
                              <strong>Total Amount:</strong> ₹{(isAnnualPackage && pkg.serviceLevel !== 'Assembly') ? pkg.annualPrice : pkg.price}
                            </p>
                            {pkg.serviceLevel === 'Assembly' && (
                              <p className="text-xs text-gray-600 mt-1">One-time assembly service</p>
                            )}
                          </div>
                          <Button 
                            className="w-full bg-blue-600 hover:bg-blue-700"
                            onClick={handleBookService}
                          >
                            Confirm Booking
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* My Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            {upcomingBookings.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Package className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600">No upcoming bookings</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {upcomingBookings.map((booking) => (
                  <Card key={booking.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{booking.packageName}</CardTitle>
                          <CardDescription>Booking ID: {booking.id}</CardDescription>
                        </div>
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2 text-gray-600">
                        <CalendarIcon className="w-4 h-4" />
                        <span>{booking.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{booking.timeSlot}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{booking.address}</span>
                      </div>
                      {booking.assignedStaffName && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <User className="w-4 h-4" />
                          <span>Technician: {booking.assignedStaffName}</span>
                        </div>
                      )}
                      {booking.isAnnualPackage && (
                        <Badge className="bg-purple-100 text-purple-800">
                          Annual Package - Service {booking.serviceNumber}/3
                        </Badge>
                      )}
                      {(booking.status === 'pending' || booking.status === 'confirmed') && (
                        <Dialog open={rescheduleBookingId === booking.id} onOpenChange={(open) => {
                          if (!open) {
                            setRescheduleBookingId(null);
                            setRescheduleDate(undefined);
                            setRescheduleTime("");
                          }
                        }}>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setRescheduleBookingId(booking.id)}
                            >
                              <Edit className="w-4 h-4 mr-2" />
                              Reschedule
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Reschedule Booking</DialogTitle>
                              <DialogDescription>
                                Choose a new date and time for your service
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label>New Date</Label>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button variant="outline" className="w-full justify-start">
                                      <CalendarIcon className="mr-2 h-4 w-4" />
                                      {rescheduleDate ? formatDateDisplay(rescheduleDate) : "Pick a date"}
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-0">
                                    <Calendar
                                      mode="single"
                                      selected={rescheduleDate}
                                      onSelect={setRescheduleDate}
                                      disabled={(date) => date < new Date()}
                                    />
                                  </PopoverContent>
                                </Popover>
                              </div>
                              <div className="space-y-2">
                                <Label>New Time Slot</Label>
                                <Select value={rescheduleTime} onValueChange={setRescheduleTime}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Choose time slot" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {timeSlots.map((slot) => (
                                      <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <Button 
                                className="w-full bg-blue-600 hover:bg-blue-700"
                                onClick={handleReschedule}
                              >
                                Confirm Reschedule
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Service History Tab */}
          <TabsContent value="history" className="space-y-6">
            {pastBookings.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Clock className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600">No service history yet</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {pastBookings.map((booking) => (
                  <Card key={booking.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{booking.packageName}</CardTitle>
                          <CardDescription>Booking ID: {booking.id}</CardDescription>
                        </div>
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2 text-gray-600">
                        <CalendarIcon className="w-4 h-4" />
                        <span>{booking.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{booking.timeSlot}</span>
                      </div>
                      {booking.feedback ? (
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                          <div className="flex gap-1 mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-4 h-4 ${
                                  star <= booking.feedback!.rating
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-sm text-gray-700">{booking.feedback.comment}</p>
                        </div>
                      ) : booking.status === 'completed' && (
                        <div className="mt-4 space-y-3">
                          <Label>Rate this service</Label>
                          <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-6 h-6 cursor-pointer ${
                                  star <= rating
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                                onClick={() => setRating(star)}
                              />
                            ))}
                          </div>
                          <Textarea
                            placeholder="Share your experience..."
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                          />
                          <Button
                            onClick={() => handleSubmitFeedback(booking.id)}
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            Submit Feedback
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Support Tab */}
          <TabsContent value="support" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Support</CardTitle>
                <CardDescription>We're here to help with any issues or questions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="mb-2">Phone Support</h3>
                    <p className="text-blue-600">+91 77380 84657</p>
                    <p className="text-sm text-gray-600 mt-1">Mon-Sun: 10 AM - 8 PM</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="mb-2">Email Support</h3>
                    <p className="text-blue-600">support@cyclelife.in</p>
                    <p className="text-sm text-gray-600 mt-1">24/7 Support</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <Label>Submit a Complaint</Label>
                  <Textarea
                    placeholder="Describe your issue..."
                    value={complaint}
                    onChange={(e) => setComplaint(e.target.value)}
                    rows={5}
                  />
                  <Button
                    onClick={handleSubmitComplaint}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Submit Complaint
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
