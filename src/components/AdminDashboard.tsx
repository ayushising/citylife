import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Checkbox } from "./ui/checkbox";
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Package,
  UserPlus,
  LogOut,
  CheckCircle,
  MessageSquare,
  Star,
  Settings,
  Edit,
  Calendar as CalendarIcon,
  Percent,
  Tag
} from "lucide-react";
import { mockBookings, mockServiceProviders, servicePackages, discountCampaigns, partnerRequests, platformStats, type ServicePackage, type DiscountCampaign, type PartnerRequest } from "../data/mockData";
import { toast } from "sonner";
// import logo from "figma:asset/ff974acc25be3bdb52e4b37eb1c66a6e7431e30c.png";

interface AdminDashboardProps {
  userEmail: string;
  onLogout: () => void;
}

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const formatDateDisplay = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  };
  return date.toLocaleDateString('en-US', options);
};

export function AdminDashboard({ userEmail, onLogout }: AdminDashboardProps) {
  const [providers, setProviders] = useState(mockServiceProviders);
  const [bookings] = useState(mockBookings);
  const [packages, setPackages] = useState<ServicePackage[]>(servicePackages);
  const [campaigns, setCampaigns] = useState<DiscountCampaign[]>(discountCampaigns);
  const [partnerReqs, setPartnerReqs] = useState<PartnerRequest[]>(partnerRequests);
  
  // Provider states
  const [newProviderName, setNewProviderName] = useState("");
  const [newProviderEmail, setNewProviderEmail] = useState("");
  const [newProviderPhone, setNewProviderPhone] = useState("");
  const [showAddProviderDialog, setShowAddProviderDialog] = useState(false);
  
  // Package edit states
  const [editingPackageId, setEditingPackageId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState("");
  const [editAnnualPrice, setEditAnnualPrice] = useState("");
  
  // Campaign states
  const [showAddCampaignDialog, setShowAddCampaignDialog] = useState(false);
  const [campaignName, setCampaignName] = useState("");
  const [campaignDiscount, setCampaignDiscount] = useState("");
  const [campaignStartDate, setCampaignStartDate] = useState<Date>();
  const [campaignEndDate, setCampaignEndDate] = useState<Date>();
  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);

  const handleAddProvider = () => {
    if (!newProviderName || !newProviderEmail || !newProviderPhone) {
      toast.error("Please fill all fields");
      return;
    }

    const newProvider = {
      id: `sp${Date.now()}`,
      name: newProviderName,
      email: newProviderEmail,
      phone: newProviderPhone,
      staffCount: 0,
      staff: [],
      rating: 0,
      servicesCompleted: 0,
      isActive: true
    };

    setProviders([...providers, newProvider]);
    toast.success("Service provider onboarded successfully");
    setShowAddProviderDialog(false);
    setNewProviderName("");
    setNewProviderEmail("");
    setNewProviderPhone("");
  };

  const handleToggleProviderStatus = (providerId: string) => {
    setProviders(providers.map(p =>
      p.id === providerId
        ? { ...p, isActive: !p.isActive }
        : p
    ));
    const provider = providers.find(p => p.id === providerId);
    toast.success(`Provider ${provider?.isActive ? 'deactivated' : 'activated'} successfully`);
  };

  const handleApprovePartner = (requestId: string) => {
    const request = partnerReqs.find(r => r.id === requestId);
    if (request) {
      const newProvider = {
        id: `sp${Date.now()}`,
        name: request.businessName || request.name,
        email: request.email,
        phone: request.contact,
        staffCount: 0,
        staff: [],
        rating: 0,
        servicesCompleted: 0,
        isActive: true
      };
      setProviders([...providers, newProvider]);
      setPartnerReqs(partnerReqs.map(r =>
        r.id === requestId ? { ...r, status: 'approved' as const } : r
      ));
      toast.success("Partner request approved and provider onboarded");
    }
  };

  const handleRejectPartner = (requestId: string) => {
    setPartnerReqs(partnerReqs.map(r =>
      r.id === requestId ? { ...r, status: 'rejected' as const } : r
    ));
    toast.success("Partner request rejected");
  };

  const handleUpdatePackagePrice = (packageId: string) => {
    if (!editPrice || !editAnnualPrice) {
      toast.error("Please enter both prices");
      return;
    }

    setPackages(packages.map(pkg => 
      pkg.id === packageId 
        ? { ...pkg, price: parseFloat(editPrice), annualPrice: parseFloat(editAnnualPrice) }
        : pkg
    ));

    toast.success("Package prices updated successfully");
    setEditingPackageId(null);
    setEditPrice("");
    setEditAnnualPrice("");
  };

  const handleAddCampaign = () => {
    if (!campaignName || !campaignDiscount || !campaignStartDate || !campaignEndDate || selectedPackages.length === 0) {
      toast.error("Please fill all campaign details");
      return;
    }

    const newCampaign: DiscountCampaign = {
      id: `dc${Date.now()}`,
      name: campaignName,
      packageIds: selectedPackages,
      discountPercentage: parseFloat(campaignDiscount),
      startDate: formatDate(campaignStartDate),
      endDate: formatDate(campaignEndDate),
      isActive: true
    };

    setCampaigns([...campaigns, newCampaign]);
    toast.success("Discount campaign created successfully");
    setShowAddCampaignDialog(false);
    setCampaignName("");
    setCampaignDiscount("");
    setCampaignStartDate(undefined);
    setCampaignEndDate(undefined);
    setSelectedPackages([]);
  };

  const toggleCampaignStatus = (campaignId: string) => {
    setCampaigns(campaigns.map(c => 
      c.id === campaignId 
        ? { ...c, isActive: !c.isActive }
        : c
    ));
    toast.success("Campaign status updated");
  };

  // Use platform stats for accurate numbers
  const totalRevenue = providers.reduce((sum, p) => {
    // Calculate revenue based on average price of ₹1000 per service
    return sum + (p.servicesCompleted * 1000);
  }, 0);
  
  const totalCustomers = platformStats.totalCustomers;
  const completedServices = platformStats.totalServicesCompleted;
  const averageRating = platformStats.averageRating;
  const totalReviews = platformStats.totalReviews;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              {/* <img src={logo} alt="CycleLife" className="h-10" /> */}
              <Badge className="bg-purple-100 text-purple-800">Admin</Badge>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{userEmail}</span>
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
          <h1 className="text-3xl mb-2 text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Manage platform operations, providers, packages, and campaigns</p>
        </div>

        {/* Analytics Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">Total Revenue</CardTitle>
              <DollarSign className="w-4 h-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">₹{totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-gray-600 mt-1">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">Total Customers</CardTitle>
              <Users className="w-4 h-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">{totalCustomers}</div>
              <p className="text-xs text-gray-600 mt-1">+5 new this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">Services Completed</CardTitle>
              <CheckCircle className="w-4 h-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">{completedServices}</div>
              <p className="text-xs text-gray-600 mt-1">95% completion rate</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">Average Rating</CardTitle>
              <Star className="w-4 h-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">{averageRating}</div>
              <p className="text-xs text-gray-600 mt-1">From {totalReviews}+ reviews</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="providers" className="space-y-6">
          <TabsList>
            <TabsTrigger value="providers">Service Providers</TabsTrigger>
            <TabsTrigger value="partners">Partner Requests</TabsTrigger>
            <TabsTrigger value="analytics">Analytics & Reports</TabsTrigger>
            <TabsTrigger value="packages">Package Management</TabsTrigger>
            <TabsTrigger value="campaigns">Discount Campaigns</TabsTrigger>
            <TabsTrigger value="bookings">All Bookings</TabsTrigger>
            <TabsTrigger value="complaints">Complaints</TabsTrigger>
          </TabsList>

          {/* Service Providers Tab */}
          <TabsContent value="providers" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl text-gray-900">Service Providers</h2>
              <Dialog open={showAddProviderDialog} onOpenChange={setShowAddProviderDialog}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add Provider
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Onboard New Service Provider</DialogTitle>
                    <DialogDescription>
                      Add a new service provider to the platform
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Provider Name</Label>
                      <Input
                        placeholder="Enter provider name"
                        value={newProviderName}
                        onChange={(e) => setNewProviderName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input
                        type="email"
                        placeholder="provider@example.com"
                        value={newProviderEmail}
                        onChange={(e) => setNewProviderEmail(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Phone</Label>
                      <Input
                        placeholder="+91 77380 84657"
                        value={newProviderPhone}
                        onChange={(e) => setNewProviderPhone(e.target.value)}
                      />
                    </div>
                    <Button onClick={handleAddProvider} className="w-full bg-blue-600 hover:bg-blue-700">
                      Add Provider
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Provider Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Staff Count</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Services</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {providers.map((provider) => (
                      <TableRow key={provider.id}>
                        <TableCell>{provider.name}</TableCell>
                        <TableCell>{provider.email}</TableCell>
                        <TableCell>{provider.phone}</TableCell>
                        <TableCell>{provider.staffCount}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            {provider.rating}
                          </div>
                        </TableCell>
                        <TableCell>{provider.servicesCompleted}</TableCell>
                        <TableCell>
                          <Badge variant={provider.isActive ? "default" : "secondary"}>
                            {provider.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleToggleProviderStatus(provider.id)}
                          >
                            {provider.isActive ? "Deactivate" : "Activate"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Partner Requests Tab */}
          <TabsContent value="partners" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl text-gray-900">Partner Requests</h2>
              <Badge className="bg-orange-100 text-orange-800">
                {partnerReqs.filter(r => r.status === 'pending').length} Pending
              </Badge>
            </div>

            <div className="grid gap-4">
              {partnerReqs.map((request) => (
                <Card key={request.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{request.name}</CardTitle>
                        <CardDescription>{request.email}</CardDescription>
                      </div>
                      <Badge variant={request.status === 'pending' ? 'default' : request.status === 'approved' ? 'outline' : 'secondary'}>
                        {request.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">Contact</p>
                        <p>{request.contact}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Location</p>
                        <p>{request.location}</p>
                      </div>
                      {request.businessName && (
                        <div>
                          <p className="text-sm text-gray-600">Business Name</p>
                          <p>{request.businessName}</p>
                        </div>
                      )}
                      <div>
                        <p className="text-sm text-gray-600">Submitted</p>
                        <p>{formatDateDisplay(request.submittedAt)}</p>
                      </div>
                    </div>
                    {request.experience && (
                      <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-1">Experience</p>
                        <p className="text-sm">{request.experience}</p>
                      </div>
                    )}
                    {request.status === 'pending' && (
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleApprovePartner(request.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Approve
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => handleRejectPartner(request.id)}
                        >
                          Reject
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics & Reports Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl text-gray-900">Analytics & Reports</h2>
              <Badge className="bg-blue-100 text-blue-800">Platform Wide</Badge>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm text-gray-600">Total Customers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl">{platformStats.totalCustomers.toLocaleString()}</div>
                  <p className="text-sm text-gray-600 mt-2">Registered users</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm text-gray-600">Services Completed</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl">{platformStats.totalServicesCompleted.toLocaleString()}+</div>
                  <p className="text-sm text-gray-600 mt-2">Across all providers</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm text-gray-600">Total Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl">{platformStats.totalReviews.toLocaleString()}+</div>
                  <p className="text-sm text-gray-600 mt-2">Customer feedback</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm text-gray-600">Platform Rating</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl flex items-center gap-2">
                    {platformStats.averageRating}
                    <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Average rating</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm text-gray-600">Active Technicians</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl">{platformStats.totalTechnicians}+</div>
                  <p className="text-sm text-gray-600 mt-2">Expert technicians</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm text-gray-600">Total Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl">₹{totalRevenue.toLocaleString()}</div>
                  <p className="text-sm text-gray-600 mt-2">Platform revenue</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Service Provider Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Provider</TableHead>
                      <TableHead>Services Completed</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {providers.map((provider) => (
                      <TableRow key={provider.id}>
                        <TableCell>{provider.name}</TableCell>
                        <TableCell>{provider.servicesCompleted.toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            {provider.rating}
                          </div>
                        </TableCell>
                        <TableCell>₹{(provider.servicesCompleted * 1000).toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant={provider.isActive ? "default" : "secondary"}>
                            {provider.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Package Management Tab */}
          <TabsContent value="packages" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl text-gray-900">Package Management</h2>
              <Badge className="bg-blue-100 text-blue-800">{packages.length} Total Packages</Badge>
            </div>

            <div className="grid gap-4">
              {packages.map((pkg) => (
                <Card key={pkg.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{pkg.name}</CardTitle>
                        <CardDescription>{pkg.description}</CardDescription>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="outline">{pkg.serviceLevel}</Badge>
                          <Badge variant="outline">{pkg.cycleType}</Badge>
                        </div>
                      </div>
                      <Dialog open={editingPackageId === pkg.id} onOpenChange={(open) => {
                        if (!open) {
                          setEditingPackageId(null);
                          setEditPrice("");
                          setEditAnnualPrice("");
                        }
                      }}>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setEditingPackageId(pkg.id);
                              setEditPrice(pkg.price.toString());
                              setEditAnnualPrice(pkg.annualPrice.toString());
                            }}
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Price
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Update Package Pricing</DialogTitle>
                            <DialogDescription>
                              Modify pricing for {pkg.name}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label>Single Service Price (₹)</Label>
                              <Input
                                type="number"
                                placeholder="Enter price"
                                value={editPrice}
                                onChange={(e) => setEditPrice(e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Annual Package Price (₹)</Label>
                              <Input
                                type="number"
                                placeholder="Enter annual price"
                                value={editAnnualPrice}
                                onChange={(e) => setEditAnnualPrice(e.target.value)}
                              />
                              <p className="text-sm text-gray-600">
                                Recommended: {(parseFloat(editPrice || "0") * 2).toFixed(0)} (cost of 2 services)
                              </p>
                            </div>
                            <Button
                              onClick={() => handleUpdatePackagePrice(pkg.id)}
                              className="w-full bg-blue-600 hover:bg-blue-700"
                            >
                              Update Pricing
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">Single Service</p>
                        <p className="text-2xl text-gray-900">₹{pkg.price}</p>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg">
                        <p className="text-sm text-gray-600">Annual Package</p>
                        <p className="text-2xl text-green-700">₹{pkg.annualPrice}</p>
                        {pkg.serviceLevel !== 'Assembly' && (
                          <p className="text-xs text-gray-600">3 services</p>
                        )}
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-gray-600">Duration</p>
                        <p className="text-lg text-gray-900">{pkg.duration}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Discount Campaigns Tab */}
          <TabsContent value="campaigns" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl text-gray-900">Discount Campaigns</h2>
              <Dialog open={showAddCampaignDialog} onOpenChange={setShowAddCampaignDialog}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Tag className="w-4 h-4 mr-2" />
                    Create Campaign
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Create Discount Campaign</DialogTitle>
                    <DialogDescription>
                      Set up a timed discount for one-time service packages
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Campaign Name</Label>
                      <Input
                        placeholder="e.g., Summer Sale - 20% Off"
                        value={campaignName}
                        onChange={(e) => setCampaignName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Discount Percentage (%)</Label>
                      <Input
                        type="number"
                        placeholder="Enter discount %"
                        value={campaignDiscount}
                        onChange={(e) => setCampaignDiscount(e.target.value)}
                        min="0"
                        max="100"
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Start Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start">
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {campaignStartDate ? formatDateDisplay(formatDate(campaignStartDate)) : "Pick a date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={campaignStartDate}
                              onSelect={setCampaignStartDate}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="space-y-2">
                        <Label>End Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start">
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {campaignEndDate ? formatDateDisplay(formatDate(campaignEndDate)) : "Pick a date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={campaignEndDate}
                              onSelect={setCampaignEndDate}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Select Packages (One-time services only)</Label>
                      <div className="border rounded-lg p-4 space-y-3 max-h-64 overflow-y-auto">
                        {packages.filter(pkg => pkg.serviceLevel !== 'Assembly').map((pkg) => (
                          <div key={pkg.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={pkg.id}
                              checked={selectedPackages.includes(pkg.id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedPackages([...selectedPackages, pkg.id]);
                                } else {
                                  setSelectedPackages(selectedPackages.filter(id => id !== pkg.id));
                                }
                              }}
                            />
                            <Label htmlFor={pkg.id} className="cursor-pointer flex-1">
                              <div className="flex justify-between">
                                <span>{pkg.name}</span>
                                <span className="text-gray-600">₹{pkg.price}</span>
                              </div>
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Button
                      onClick={handleAddCampaign}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      Create Campaign
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {campaigns.map((campaign) => (
                <Card key={campaign.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle>{campaign.name}</CardTitle>
                          <Badge className={campaign.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                            {campaign.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Percent className="w-4 h-4" />
                            {campaign.discountPercentage}% Off
                          </div>
                          <div className="flex items-center gap-1">
                            <CalendarIcon className="w-4 h-4" />
                            {formatDateDisplay(campaign.startDate)} - {formatDateDisplay(campaign.endDate)}
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleCampaignStatus(campaign.id)}
                      >
                        {campaign.isActive ? 'Deactivate' : 'Activate'}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Label className="text-sm">Applicable Packages:</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {campaign.packageIds.map((pkgId) => {
                        const pkg = packages.find(p => p.id === pkgId);
                        return pkg ? (
                          <Badge key={pkgId} variant="outline">
                            {pkg.name} - ₹{pkg.price} → ₹{Math.round(pkg.price * (1 - campaign.discountPercentage / 100))}
                          </Badge>
                        ) : null;
                      })}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* All Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            <h2 className="text-xl text-gray-900">All Bookings</h2>
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Booking ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Package</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((booking) => {
                      const pkg = packages.find(p => p.id === booking.packageId);
                      return (
                        <TableRow key={booking.id}>
                          <TableCell>{booking.id}</TableCell>
                          <TableCell>{booking.customerName}</TableCell>
                          <TableCell>{booking.packageName}</TableCell>
                          <TableCell>{booking.date}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{booking.status}</Badge>
                          </TableCell>
                          <TableCell>₹{pkg?.price || 0}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Complaints Tab */}
          <TabsContent value="complaints" className="space-y-6">
            <h2 className="text-xl text-gray-900">Customer Complaints</h2>
            <Card>
              <CardContent className="p-12 text-center">
                <MessageSquare className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600">No complaints to display</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
