import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Users, 
  Calendar, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  UserPlus,
  LogOut,
  MapPin,
  DollarSign,
  FileText,
  Download,
  BarChart3
} from "lucide-react";
import { mockBookings, mockServiceProviders, mockReceipts, type Staff, type Receipt } from "../data/mockData";
import { toast } from "sonner";
// import logo from "figma:asset/ff974acc25be3bdb52e4b37eb1c66a6e7431e30c.png";

interface ServiceProviderDashboardProps {
  userEmail: string;
  onLogout: () => void;
}

export function ServiceProviderDashboard({ userEmail, onLogout }: ServiceProviderDashboardProps) {
  const provider = mockServiceProviders[0];
  const [staff, setStaff] = useState<Staff[]>(provider.staff);
  const [bookings, setBookings] = useState(mockBookings);
  const [newStaffName, setNewStaffName] = useState("");
  const [newStaffPhone, setNewStaffPhone] = useState("");
  const [dailyStaffCount, setDailyStaffCount] = useState(provider.staffCount);
  const [receipts, setReceipts] = useState<Receipt[]>(mockReceipts);
  const [reportPeriod, setReportPeriod] = useState<'week' | 'month' | 'year'>('month');
  const [showAddStaffDialog, setShowAddStaffDialog] = useState(false);

  const handleAddStaff = () => {
    if (!newStaffName || !newStaffPhone) {
      toast.error("Please fill all fields");
      return;
    }

    const newStaff: Staff = {
      id: `s${Date.now()}`,
      name: newStaffName,
      phone: newStaffPhone,
      providerId: provider.id,
      isAvailable: true,
      assignedAppointments: []
    };

    setStaff([...staff, newStaff]);
    toast.success("Staff member added successfully");
    setShowAddStaffDialog(false);
    setNewStaffName("");
    setNewStaffPhone("");
  };

  const handleAssignStaff = (bookingId: string, staffId: string) => {
    const selectedStaff = staff.find(s => s.id === staffId);
    setBookings(bookings.map(b =>
      b.id === bookingId
        ? { ...b, assignedStaffId: staffId, assignedStaffName: selectedStaff?.name }
        : b
    ));
    toast.success("Staff assigned successfully");
  };

  const todayBookings = bookings.filter(b => {
    const today = new Date().toISOString().split('T')[0];
    return b.date >= today && (b.status === 'confirmed' || b.status === 'in-progress');
  });

  const completedToday = bookings.filter(b => {
    const today = new Date().toISOString().split('T')[0];
    return b.date === today && b.status === 'completed';
  }).length;

  const handleUpdatePaymentStatus = (bookingId: string) => {
    setBookings(bookings.map(b =>
      b.id === bookingId ? { ...b, paymentStatus: 'received' as const } : b
    ));
    
    // Generate receipt
    const booking = bookings.find(b => b.id === bookingId);
    if (booking) {
      const newReceipt: Receipt = {
        id: `REC-${Date.now()}`,
        bookingId: booking.id,
        customerName: booking.customerName,
        serviceName: booking.packageName,
        amount: booking.paymentAmount || 0,
        date: new Date().toISOString().split('T')[0],
        paymentStatus: 'received',
        generatedAt: new Date().toISOString()
      };
      setReceipts([...receipts, newReceipt]);
      toast.success("Payment status updated! Receipt generated and notifications sent.");
    }
  };

  // Calculate analytics based on period
  const getAnalytics = () => {
    const now = new Date();
    let startDate = new Date();
    
    if (reportPeriod === 'week') {
      startDate.setDate(now.getDate() - 7);
    } else if (reportPeriod === 'month') {
      startDate.setMonth(now.getMonth() - 1);
    } else {
      startDate.setFullYear(now.getFullYear() - 1);
    }

    const periodBookings = bookings.filter(b => {
      const bookingDate = new Date(b.date);
      return bookingDate >= startDate && bookingDate <= now && b.status === 'completed';
    });

    const totalServices = periodBookings.length;
    const totalRevenue = periodBookings.reduce((sum, b) => {
      if (b.paymentStatus === 'received' && b.paymentAmount) {
        return sum + b.paymentAmount;
      }
      return sum;
    }, 0);

    const pendingPayments = bookings.filter(b => 
      b.status === 'completed' && b.paymentStatus === 'pending'
    ).length;

    return { totalServices, totalRevenue, pendingPayments };
  };

  const analytics = getAnalytics();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              {/* <img src={logo} alt="CycleLife" className="h-10" /> */}
              <div>
                <p className="text-xs text-gray-500">Service Provider Portal</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-900">{provider.name}</p>
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
          <h1 className="text-3xl mb-2 text-gray-900">Service Provider Dashboard</h1>
          <p className="text-gray-600">Manage your staff and appointments</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Today's Appointments</CardDescription>
              <CardTitle className="text-3xl">{todayBookings.length}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Scheduled</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Completed Today</CardDescription>
              <CardTitle className="text-3xl">{completedToday}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-green-600">
                <CheckCircle className="w-4 h-4" />
                <span>Done</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Active Staff</CardDescription>
              <CardTitle className="text-3xl">{staff.filter(s => s.isAvailable).length}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="w-4 h-4" />
                <span>of {staff.length} total</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Services</CardDescription>
              <CardTitle className="text-3xl">{provider.servicesCompleted}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-blue-600">
                <TrendingUp className="w-4 h-4" />
                <span>All time</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="appointments" className="space-y-6">
          <TabsList>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="analytics">Analytics & Reports</TabsTrigger>
            <TabsTrigger value="payments">Payments & Receipts</TabsTrigger>
            <TabsTrigger value="staff">Staff Management</TabsTrigger>
          </TabsList>

          <TabsContent value="appointments">
            <div className="grid lg:grid-cols-3 gap-6">
          {/* Appointments */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Today's Appointments</CardTitle>
                    <CardDescription>Manage and assign staff to appointments</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="staff-count" className="text-sm">Daily Staff:</Label>
                    <Input
                      id="staff-count"
                      type="number"
                      className="w-20"
                      value={dailyStaffCount}
                      onChange={(e) => setDailyStaffCount(parseInt(e.target.value))}
                      min={0}
                      max={staff.length}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {todayBookings.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Calendar className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>No appointments scheduled for today</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {todayBookings.map((booking) => (
                      <Card key={booking.id} className="border-l-4 border-l-blue-600">
                        <CardContent className="pt-4">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="text-gray-900 mb-1">{booking.packageName}</h3>
                              <p className="text-sm text-gray-600">{booking.customerName}</p>
                            </div>
                            <Badge className={
                              booking.status === 'confirmed' 
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }>
                              {booking.status}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                            <div className="flex items-center gap-2 text-gray-600">
                              <Clock className="w-4 h-4" />
                              {booking.timeSlot}
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <MapPin className="w-4 h-4" />
                              {booking.address.split(',')[0]}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Label className="text-sm">Assign Staff:</Label>
                            <Select
                              value={booking.assignedStaffId || ""}
                              onValueChange={(value) => handleAssignStaff(booking.id, value)}
                            >
                              <SelectTrigger className="flex-1">
                                <SelectValue placeholder="Select staff member" />
                              </SelectTrigger>
                              <SelectContent>
                                {staff.filter(s => s.isAvailable).map((member) => (
                                  <SelectItem key={member.id} value={member.id}>
                                    {member.name} ({member.assignedAppointments.length} assigned)
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Weekly Overview */}
            <Card>
              <CardHeader>
                <CardTitle>This Week's Schedule</CardTitle>
                <CardDescription>Upcoming appointments for the week</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Staff</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.slice(0, 5).map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell>{booking.date}</TableCell>
                        <TableCell className="text-sm">{booking.timeSlot}</TableCell>
                        <TableCell>{booking.customerName}</TableCell>
                        <TableCell className="text-sm">{booking.packageName}</TableCell>
                        <TableCell>
                          {booking.assignedStaffName ? (
                            <Badge variant="outline">{booking.assignedStaffName}</Badge>
                          ) : (
                            <span className="text-sm text-gray-400">Unassigned</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Staff Management in Sidebar */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
                <CardDescription>Real-time overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Active Staff</span>
                    <span className="text-gray-900">{staff.filter(s => s.isAvailable).length}/{staff.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Today's Tasks</span>
                    <span className="text-gray-900">{todayBookings.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Analytics & Reports</CardTitle>
                    <CardDescription>View your business performance metrics</CardDescription>
                  </div>
                  <Select value={reportPeriod} onValueChange={(value: any) => setReportPeriod(value)}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="week">Last Week</SelectItem>
                      <SelectItem value="month">Last Month</SelectItem>
                      <SelectItem value="year">Last Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <Card className="border-l-4 border-l-blue-600">
                    <CardHeader className="pb-3">
                      <CardDescription>Total Services</CardDescription>
                      <CardTitle className="text-3xl">{analytics.totalServices}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <BarChart3 className="w-4 h-4" />
                        <span>Completed</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-green-600">
                    <CardHeader className="pb-3">
                      <CardDescription>Total Revenue</CardDescription>
                      <CardTitle className="text-3xl">₹{analytics.totalRevenue.toLocaleString()}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 text-sm text-green-600">
                        <DollarSign className="w-4 h-4" />
                        <span>Earned</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-orange-600">
                    <CardHeader className="pb-3">
                      <CardDescription>Pending Payments</CardDescription>
                      <CardTitle className="text-3xl">{analytics.pendingPayments}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 text-sm text-orange-600">
                        <Clock className="w-4 h-4" />
                        <span>To collect</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="text-center py-8 text-gray-500">
                  <BarChart3 className="w-16 h-16 mx-auto mb-3 opacity-50" />
                  <p className="mb-2">Detailed charts and graphs coming soon</p>
                  <p className="text-sm">Track your revenue trends, service distribution, and performance metrics</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle>Payments & Receipts</CardTitle>
                <CardDescription>Manage payment status and view receipts</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Booking ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Payment Status</TableHead>
                      <TableHead>Receipt</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.filter(b => b.status === 'completed').map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="text-gray-900">{booking.id}</TableCell>
                        <TableCell>{booking.customerName}</TableCell>
                        <TableCell>{booking.packageName}</TableCell>
                        <TableCell className="text-gray-900">₹{booking.paymentAmount || 0}</TableCell>
                        <TableCell>{booking.date}</TableCell>
                        <TableCell>
                          <Badge variant={booking.paymentStatus === 'received' ? 'default' : 'secondary'}>
                            {booking.paymentStatus || 'pending'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {booking.receiptId ? (
                            <Button variant="ghost" size="sm">
                              <FileText className="w-4 h-4 mr-2" />
                              View
                            </Button>
                          ) : (
                            <span className="text-sm text-gray-400">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {booking.paymentStatus === 'pending' ? (
                            <Button
                              size="sm"
                              onClick={() => handleUpdatePaymentStatus(booking.id)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              Mark Received
                            </Button>
                          ) : (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {receipts.length > 0 && (
                  <div className="mt-6">
                    <h3 className="mb-4 text-gray-900">Recent Receipts</h3>
                    <div className="space-y-2">
                      {receipts.map((receipt) => (
                        <div key={receipt.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="text-sm text-gray-900">{receipt.id} - {receipt.customerName}</p>
                            <p className="text-xs text-gray-500">{receipt.serviceName}</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-gray-900">₹{receipt.amount}</span>
                            <Button variant="outline" size="sm">
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="staff">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Staff Management</CardTitle>
                    <CardDescription>Manage your technician team</CardDescription>
                  </div>
                  <Dialog open={showAddStaffDialog} onOpenChange={setShowAddStaffDialog}>
                    <DialogTrigger asChild>
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        <UserPlus className="w-4 h-4 mr-2" />
                        Add Staff
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Staff Member</DialogTitle>
                        <DialogDescription>
                          Add a new technician to your team
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="staff-name">Full Name</Label>
                          <Input
                            id="staff-name"
                            value={newStaffName}
                            onChange={(e) => setNewStaffName(e.target.value)}
                            placeholder="Enter staff name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="staff-phone">Phone Number</Label>
                          <Input
                            id="staff-phone"
                            value={newStaffPhone}
                            onChange={(e) => setNewStaffPhone(e.target.value)}
                            placeholder="+91 77380 84657"
                          />
                        </div>
                        <Button 
                          onClick={handleAddStaff}
                          className="w-full bg-blue-600 hover:bg-blue-700"
                        >
                          Add Staff Member
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {staff.map((member) => (
                    <Card key={member.id}>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                              <Users className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-gray-900">{member.name}</p>
                              <p className="text-sm text-gray-500">{member.phone}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge variant={member.isAvailable ? "default" : "secondary"} className="mb-2">
                              {member.isAvailable ? "Available" : "Busy"}
                            </Badge>
                            <p className="text-sm text-gray-500">
                              {member.assignedAppointments.length} appointments assigned
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
