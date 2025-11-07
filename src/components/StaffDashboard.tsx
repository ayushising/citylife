import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";
import { Label } from "./ui/label";
import { 
  MapPin, 
  Phone, 
  Clock, 
  Navigation, 
  CheckCircle,
  PlayCircle,
  LogOut,
  Bell,
  Shield
} from "lucide-react";
import { mockBookings, type Booking, type OTPLog } from "../data/mockData";
import { toast } from "sonner";
// import logo from "figma:asset/ff974acc25be3bdb52e4b37eb1c66a6e7431e30c.png";

interface StaffDashboardProps {
  userEmail: string;
  onLogout: () => void;
}

export function StaffDashboard({ userEmail, onLogout }: StaffDashboardProps) {
  const [bookings, setBookings] = useState<Booking[]>(
    mockBookings.filter(b => b.assignedStaffId === 'u3')
  );
  const [selectedNext, setSelectedNext] = useState<string | null>(null);
  const [showOTPDialog, setShowOTPDialog] = useState(false);
  const [otpType, setOtpType] = useState<'start' | 'completion'>('start');
  const [currentBookingId, setCurrentBookingId] = useState<string>('');
  const [enteredOTP, setEnteredOTP] = useState('');

  const handleStartService = (bookingId: string) => {
    setCurrentBookingId(bookingId);
    setOtpType('start');
    setEnteredOTP('');
    setShowOTPDialog(true);
  };

  const handleCompleteService = (bookingId: string) => {
    setCurrentBookingId(bookingId);
    setOtpType('completion');
    setEnteredOTP('');
    setShowOTPDialog(true);
  };

  const handleVerifyOTP = () => {
    const booking = bookings.find(b => b.id === currentBookingId);
    if (!booking) return;

    const expectedOTP = otpType === 'start' ? booking.startOTP : booking.completionOTP;
    const currentTime = new Date();
    const expiryTime = new Date(currentTime.getTime() + 15 * 60000); // 15 minutes validity

    if (enteredOTP === expectedOTP) {
      const otpLog: OTPLog = {
        timestamp: currentTime.toISOString(),
        type: otpType,
        otp: enteredOTP,
        enteredBy: 'Raj Kumar',
        isValid: true,
        expiresAt: expiryTime.toISOString()
      };

      const newStatus = otpType === 'start' ? 'in-progress' as const : 'completed' as const;
      
      setBookings(bookings.map(b =>
        b.id === currentBookingId 
          ? { 
              ...b, 
              status: newStatus,
              otpLogs: [...(b.otpLogs || []), otpLog]
            } 
          : b
      ));

      setShowOTPDialog(false);
      toast.success(`Service ${otpType === 'start' ? 'started' : 'completed'}! Customer and service provider notified.`);
    } else {
      toast.error("Invalid OTP. Please check the code from customer.");
    }
  };

  const handleSelectNext = (bookingId: string) => {
    setSelectedNext(bookingId);
    toast.success("Next appointment selected for navigation");
  };

  const todayBookings = bookings.filter(b => {
    const today = new Date().toISOString().split('T')[0];
    return b.date >= today;
  });

  const upcomingBookings = todayBookings.filter(b => 
    b.status === 'confirmed' || b.status === 'in-progress'
  );
  const completedBookings = todayBookings.filter(b => b.status === 'completed');

  const getGoogleMapsUrl = (address: string) => {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              {/* <img src={logo} alt="CycleLife" className="h-10" /> */}
              <div>
                <p className="text-xs text-gray-500">Technician Portal</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <div className="text-right">
                <p className="text-sm text-gray-900">Raj Kumar</p>
                <p className="text-xs text-gray-500">{userEmail}</p>
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
          <h1 className="text-3xl mb-2 text-gray-900">My Appointments</h1>
          <p className="text-gray-600">Manage your daily service schedule</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Today's Appointments</CardDescription>
              <CardTitle className="text-3xl">{todayBookings.length}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-blue-600">
                <Clock className="w-4 h-4" />
                <span>Total scheduled</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Completed Today</CardDescription>
              <CardTitle className="text-3xl">{completedBookings.length}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-green-600">
                <CheckCircle className="w-4 h-4" />
                <span>Services done</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Pending</CardDescription>
              <CardTitle className="text-3xl">{upcomingBookings.length}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-orange-600">
                <PlayCircle className="w-4 h-4" />
                <span>To be completed</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Appointments */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Today's Schedule</CardTitle>
              <CardDescription>Your assigned appointments with navigation links</CardDescription>
            </CardHeader>
            <CardContent>
              {upcomingBookings.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <CheckCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>All appointments completed for today!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {upcomingBookings.map((booking) => (
                    <Card 
                      key={booking.id} 
                      className={`border-l-4 ${
                        selectedNext === booking.id 
                          ? 'border-l-blue-600 bg-blue-50' 
                          : booking.status === 'in-progress'
                          ? 'border-l-yellow-600 bg-yellow-50'
                          : 'border-l-gray-300'
                      }`}
                    >
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg text-gray-900 mb-1">{booking.packageName}</h3>
                            <Badge className={
                              booking.status === 'in-progress'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-blue-100 text-blue-700'
                            }>
                              {booking.status === 'in-progress' ? 'In Progress' : 'Scheduled'}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock className="w-4 h-4" />
                            {booking.timeSlot}
                          </div>
                        </div>

                        <div className="space-y-3 mb-4">
                          <div className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 text-gray-500 flex-shrink-0 mt-1" />
                            <div className="flex-1">
                              <p className="text-sm text-gray-900">{booking.address}</p>
                              <a
                                href={getGoogleMapsUrl(booking.address)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-blue-600 hover:underline inline-flex items-center gap-1 mt-1"
                              >
                                <Navigation className="w-3 h-3" />
                                Open in Google Maps
                              </a>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-500" />
                            <div>
                              <p className="text-sm text-gray-900">{booking.customerName}</p>
                              <p className="text-sm text-gray-600">{booking.phone}</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          {booking.status === 'confirmed' && (
                            <>
                              <Button
                                onClick={() => handleStartService(booking.id)}
                                className="flex-1 bg-blue-600 hover:bg-blue-700"
                              >
                                <PlayCircle className="w-4 h-4 mr-2" />
                                Start Service
                              </Button>
                              <Button
                                variant={selectedNext === booking.id ? "default" : "outline"}
                                onClick={() => handleSelectNext(booking.id)}
                              >
                                <Navigation className="w-4 h-4 mr-2" />
                                {selectedNext === booking.id ? 'Selected' : 'Next'}
                              </Button>
                            </>
                          )}
                          {booking.status === 'in-progress' && (
                            <Button
                              onClick={() => handleCompleteService(booking.id)}
                              className="flex-1 bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Mark as Completed
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Completed Appointments */}
          {completedBookings.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Completed Today</CardTitle>
                <CardDescription>Services you've finished</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {completedBookings.map((booking) => (
                    <div 
                      key={booking.id}
                      className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-900">{booking.packageName}</p>
                          <p className="text-xs text-gray-600">{booking.customerName}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">{booking.timeSlot}</p>
                        <Badge className="bg-green-100 text-green-700 mt-1">Completed</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* OTP Verification Dialog */}
        <Dialog open={showOTPDialog} onOpenChange={setShowOTPDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                Enter Customer OTP
              </DialogTitle>
              <DialogDescription>
                Ask the customer for their {otpType === 'start' ? 'Start Service' : 'Completion'} OTP to {otpType === 'start' ? 'begin' : 'complete'} the service
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Enter 6-digit OTP</Label>
                <div className="flex justify-center">
                  <InputOTP maxLength={6} value={enteredOTP} onChange={setEnteredOTP}>
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
                <p className="text-xs text-gray-500 text-center mt-2">
                  OTP is valid for 15 minutes and can be used only once
                </p>
              </div>
              <Button
                onClick={handleVerifyOTP}
                disabled={enteredOTP.length !== 6}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Verify & {otpType === 'start' ? 'Start Service' : 'Complete Service'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
