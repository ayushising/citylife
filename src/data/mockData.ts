export interface ServicePackage {
  id: string;
  name: string;
  description: string;
  price: number;
  annualPrice: number;
  duration: string;
  features: string[];
  cycleType: "Non Geared" | "Geared" | "Road";
  serviceLevel: "Assembly" | "Standard" | "Advanced";
}

export interface Receipt {
  id: string;
  bookingId: string;
  customerName: string;
  serviceName: string;
  amount: number;
  date: string;
  paymentStatus: "pending" | "received";
  generatedAt: string;
}

export interface OTPLog {
  timestamp: string;
  type: "start" | "completion";
  otp: string;
  enteredBy: string;
  isValid: boolean;
  expiresAt: string;
}

export interface DiscountCampaign {
  id: string;
  name: string;
  packageIds: string[];
  discountPercentage: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface Booking {
  id: string;
  customerId: string;
  customerName: string;
  packageId: string;
  packageName: string;
  date: string;
  timeSlot: string;
  status:
    | "pending"
    | "confirmed"
    | "in-progress"
    | "completed"
    | "cancelled";
  address: string;
  phone: string;
  assignedStaffId?: string;
  assignedStaffName?: string;
  feedback?: {
    rating: number;
    comment: string;
  };
  isAnnualPackage?: boolean;
  annualPackageId?: string;
  serviceNumber?: number; // 1, 2, or 3 for annual packages
  paymentStatus?: "pending" | "received";
  paymentAmount?: number;
  receiptId?: string;
  startOTP?: string;
  completionOTP?: string;
  otpLogs?: OTPLog[];
}

export interface AnnualPackage {
  id: string;
  customerId: string;
  purchaseDate: string;
  appointments: {
    date: string;
    timeSlot: string;
    status: "scheduled" | "completed" | "rescheduled";
    bookingId?: string;
  }[];
}

export interface Staff {
  id: string;
  name: string;
  phone: string;
  providerId: string;
  isAvailable: boolean;
  assignedAppointments: string[];
}

export interface ServiceProvider {
  id: string;
  name: string;
  email: string;
  phone: string;
  staffCount: number;
  staff: Staff[];
  rating: number;
  servicesCompleted: number;
  isActive: boolean;
}

export interface PartnerRequest {
  id: string;
  name: string;
  contact: string;
  email: string;
  location: string;
  businessName?: string;
  experience?: string;
  submittedAt: string;
  status: "pending" | "approved" | "rejected";
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "customer" | "provider" | "staff" | "admin";
  address?: string;
}

export const servicePackages: ServicePackage[] = [
  // Assembly Service - Non Geared
  {
    id: "assembly-nongeared",
    name: "Cycle Assembly - Non Geared",
    description: "Expert assembly for single-speed bikes",
    price: 500,
    annualPrice: 500,
    duration: "1 hour",
    cycleType: "Non Geared",
    serviceLevel: "Assembly",
    features: [
      "Complete bicycle assembly from box",
      "Wheel installation and alignment",
      "Handlebar and stem installation",
      "Brake installation and adjustment",
      "Pedal installation",
      "Seat and seat post installation",
      "Chain lubrication",
      "Safety check and test ride",
      "Disposal of packaging materials",
      "30-day assembly warranty",
    ],
  },
  // Assembly Service - Geared
  {
    id: "assembly-geared",
    name: "Cycle Assembly - Geared",
    description: "Professional assembly for geared bikes",
    price: 750,
    annualPrice: 750,
    duration: "1.5 hours",
    cycleType: "Geared",
    serviceLevel: "Assembly",
    features: [
      "Complete bicycle assembly from box",
      "Wheel installation and truing",
      "Handlebar and stem installation",
      "Brake installation and adjustment",
      "Gear system installation and tuning",
      "Derailleur adjustment and indexing",
      "Pedal installation",
      "Seat and seat post installation",
      "Chain lubrication",
      "Safety check and test ride",
      "Disposal of packaging materials",
      "30-day assembly warranty",
    ],
  },
  // Assembly Service - Road
  {
    id: "assembly-road",
    name: "Cycle Assembly - Road",
    description: "Premium assembly for road bikes",
    price: 1000,
    annualPrice: 1000,
    duration: "2 hours",
    cycleType: "Road",
    serviceLevel: "Assembly",
    features: [
      "Complete bicycle assembly from box",
      "Precision wheel installation and truing",
      "Handlebar and stem installation with cable routing",
      "Brake installation and fine adjustment",
      "Gear system installation and precision tuning",
      "Derailleur hanger alignment and indexing",
      "Pedal installation with torque specification",
      "Seat and seat post installation",
      "Chain lubrication and tension adjustment",
      "Comprehensive safety check",
      "Performance test ride",
      "Disposal of packaging materials",
      "30-day assembly warranty",
    ],
  },
  // Standard Service - Non Geared
  {
    id: "standard-nongeared",
    name: "Standard Service - Non Geared",
    description:
      "Essential maintenance for your single-speed bike",
    price: 799,
    annualPrice: 1598,
    duration: "1-2 hours",
    cycleType: "Non Geared",
    serviceLevel: "Standard",
    features: [
      "Inspection for wear and tear",
      "Check and adjust Wheels, Hubs, Bottom Bracket, Headset and Stem",
      "Checking and Tightening all screws and bolts",
      "Bearings check (chargeable if bearings need to be replaced)",
      "Check and adjust brakes",
      "Chain cleaning and lubrication",
      "Fixing Puncture (If any) and inflating the tires to accurate pressure",
      "Wipe clean the bicycle",
      "Test ride by service engineer",
      "*Any spares consumed will be additional",
    ],
  },
  // Standard Service - Geared
  {
    id: "standard-geared",
    name: "Standard Service - Geared",
    description:
      "Essential maintenance including gear adjustments",
    price: 1099,
    annualPrice: 2198,
    duration: "2-3 hours",
    cycleType: "Geared",
    serviceLevel: "Standard",
    features: [
      "Inspection for wear and tear",
      "Check and adjust Fork, Wheels, Hubs, Bottom Bracket, Headset and Stem",
      "Checking and Tightening all screws and bolts",
      "Bearings check (chargeable if bearings need to be replaced)",
      "Check and adjust brakes",
      "Gear and Drivetrain tuning and adjustment",
      "Lubrication of Gear System",
      "Fixing Puncture (If any) and inflating the tires to accurate pressure",
      "Wipe clean the bicycle",
      "Test ride by service engineer",
      "*Any spares consumed will be additional",
    ],
  },
  // Standard Service - Road
  {
    id: "standard-road",
    name: "Standard Service - Road",
    description:
      "Precision adjustments for optimal road performance",
    price: 1299,
    annualPrice: 2598,
    duration: "2-3 hours",
    cycleType: "Road",
    serviceLevel: "Standard",
    features: [
      "Inspection for wear and tear",
      "Check and adjust Fork, Wheels, Hubs, Bottom Bracket, Headset and Stem",
      "Checking and Tightening all screws and bolts",
      "Bearings check (chargeable if bearings need to be replaced)",
      "Check and adjust brakes",
      "Gear and Drivetrain tuning and adjustment",
      "Lubrication of Gear System",
      "Derailleur hanger alignment check",
      "Fixing Puncture (If any) and inflating the tires to accurate pressure",
      "Wipe clean the bicycle",
      "Test ride by service engineer",
      "*Any spares consumed will be additional",
    ],
  },
  // Advanced Service - Non Geared
  {
    id: "advanced-nongeared",
    name: "Advanced Service - Non Geared",
    description:
      "Comprehensive maintenance for optimal performance",
    price: 999,
    annualPrice: 1998,
    duration: "2-3 hours",
    cycleType: "Non Geared",
    serviceLevel: "Advanced",
    features: [
      "Inspection for entire bicycle",
      "Check and adjust Wheels, Hubs, Bottom Bracket, Headset and Stem",
      "Checking and Tightening all screws and bolts",
      "Bearings check (chargeable if bearings need to be replaced)",
      "Brakes checked, adjusted and cleaned",
      "Chain cleaning and lubrication",
      "Greasing of all the components",
      "Lubrication of Brake System",
      "Fixing Puncture (If any) and inflating the tires to accurate pressure",
      "Wheel truing if required (Wheel Bend/ Broken Wheel repair not covered)",
      "Complete cleaning of Bicycle",
      "Test ride by service engineer",
      "*Any spares consumed will be additional",
    ],
  },
  // Advanced Service - Geared
  {
    id: "advanced-geared",
    name: "Advanced Service - Geared",
    description:
      "Comprehensive service for smooth gear operation",
    price: 1399,
    annualPrice: 2798,
    duration: "3-4 hours",
    cycleType: "Geared",
    serviceLevel: "Advanced",
    features: [
      "Inspection for entire bicycle",
      "Check and adjust Fork, Wheels, Hubs, Bottom Bracket, Headset and Stem",
      "Checking and Tightening all screws and bolts",
      "Bearings check (chargeable if bearings need to be replaced)",
      "Brakes checked, adjusted and cleaned",
      "Gear and Drivetrain tuning and adjustment",
      "Greasing of all the components",
      "Degrease the drivetrain",
      "Lubrication of Gear System",
      "Lubrication of Brake System",
      "Fixing Puncture (If any) and inflating the tires to accurate pressure",
      "Wheel truing if required (Wheel Bend/ Broken Wheel repair not covered)",
      "Complete cleaning of Bicycle",
      "Test ride by service engineer",
      "*Any spares consumed will be additional",
    ],
  },
  // Advanced Service - Road
  {
    id: "advanced-road",
    name: "Advanced Service - Road",
    description:
      "Competition-grade service for serious cyclists",
    price: 1699,
    annualPrice: 3398,
    duration: "3-5 hours",
    cycleType: "Road",
    serviceLevel: "Advanced",
    features: [
      "Inspection for entire bicycle",
      "Check and adjust Fork, Wheels, Hubs, Bottom Bracket, Headset and Stem",
      "Checking and Tightening all screws and bolts",
      "Bearings check (chargeable if bearings need to be replaced)",
      "Brakes checked, adjusted and cleaned",
      "Gear and Drivetrain tuning and adjustment",
      "Greasing of all the components",
      "Degrease the drivetrain",
      "Lubrication of Gear System",
      "Lubrication of Brake System",
      "Derailleur hanger alignment and precision adjustment",
      "Fixing Puncture (If any) and inflating the tires to accurate pressure",
      "Precision wheel truing and spoke tension adjustment",
      "Complete cleaning and detailing of Bicycle",
      "Performance optimization and test ride by service engineer",
      "*Any spares consumed will be additional",
    ],
  },
];

export const mockUsers: User[] = [
  {
    id: "u1",
    name: "John Doe",
    email: "john@example.com",
    phone: "+91 77380 84657",
    role: "customer",
    address: "123 MG Road, Bangalore, Karnataka 560001",
  },
  {
    id: "u2",
    name: "Sarah Wilson",
    email: "serviceprovider@cyclelife.in",
    phone: "+91 77380 84657",
    role: "provider",
  },
  {
    id: "u3",
    name: "Raj Kumar",
    email: "technician@cyclelife.in",
    phone: "+91 77380 84657",
    role: "staff",
  },
  {
    id: "admin1",
    name: "Admin User",
    email: "admin@cyclelife.in",
    phone: "+91 77380 84657",
    role: "admin",
  },
];

// Helper function to generate mock bookings
const generateMockBookings = (): Booking[] => {
  const baseBookings: Booking[] = [
    {
      id: "b1",
      customerId: "u1",
      customerName: "John Doe",
      packageId: "advanced-geared",
      packageName: "Advanced Service - Geared",
      date: "2025-11-05",
      timeSlot: "10:00 AM - 11:00 AM",
      status: "confirmed",
      address: "123 MG Road, Bangalore, Karnataka 560001",
      phone: "+91 77380 84657",
      assignedStaffId: "u3",
      assignedStaffName: "Raj Kumar",
      paymentStatus: "pending",
      paymentAmount: 1399,
      startOTP: "123456",
      completionOTP: "123456",
    },
    {
      id: "b2",
      customerId: "u1",
      customerName: "John Doe",
      packageId: "standard-nongeared",
      packageName: "Standard Service - Non Geared",
      date: "2025-10-15",
      timeSlot: "2:00 PM - 3:00 PM",
      status: "completed",
      address: "123 MG Road, Bangalore, Karnataka 560001",
      phone: "+91 77380 84657",
      assignedStaffId: "u3",
      assignedStaffName: "Raj Kumar",
      feedback: {
        rating: 5,
        comment: "Excellent service! Very professional and thorough.",
      },
      paymentStatus: "received",
      paymentAmount: 799,
      receiptId: "REC-001",
      otpLogs: [
        {
          timestamp: "2025-10-15T14:00:00Z",
          type: "start",
          otp: "123456",
          enteredBy: "Raj Kumar",
          isValid: true,
          expiresAt: "2025-10-15T14:15:00Z",
        },
        {
          timestamp: "2025-10-15T15:30:00Z",
          type: "completion",
          otp: "123456",
          enteredBy: "Raj Kumar",
          isValid: true,
          expiresAt: "2025-10-15T15:45:00Z",
        },
      ],
    },
  ];
  
  // Generate additional completed bookings to simulate 5000+ services
  // In a real app, this would be fetched from database
  return baseBookings;
};

export const mockBookings: Booking[] = generateMockBookings();

export const mockReceipts: Receipt[] = [
  {
    id: "REC-001",
    bookingId: "b2",
    customerName: "John Doe",
    serviceName: "Standard Service - Non Geared",
    amount: 799,
    date: "2025-10-15",
    paymentStatus: "received",
    generatedAt: "2025-10-15T15:30:00Z",
  },
];

export const mockServiceProviders: ServiceProvider[] = [
  {
    id: "sp1",
    name: "CycleCare Services",
    email: "serviceprovider@cyclelife.in",
    phone: "+91 77380 84657",
    staffCount: 5,
    staff: [
      {
        id: "s1",
        name: "Raj Kumar",
        phone: "+91 77380 84657",
        providerId: "sp1",
        isAvailable: true,
        assignedAppointments: ["b1"],
      },
      {
        id: "s2",
        name: "Amit Sharma",
        phone: "+91 77380 84657",
        providerId: "sp1",
        isAvailable: true,
        assignedAppointments: [],
      },
      {
        id: "s3",
        name: "Priya Patel",
        phone: "+91 77380 84657",
        providerId: "sp1",
        isAvailable: true,
        assignedAppointments: [],
      },
    ],
    rating: 4.8,
    servicesCompleted: 5000,
    isActive: true,
  },
];

export const partnerRequests: PartnerRequest[] = [
  {
    id: "pr1",
    name: "Vikram Singh",
    contact: "+91 98765 43210",
    email: "vikram@bikeservices.com",
    location: "Mumbai, Maharashtra",
    businessName: "Bike Pro Services",
    experience: "10 years of experience in cycle repair and maintenance",
    submittedAt: "2025-11-03T10:00:00Z",
    status: "pending",
  },
  {
    id: "pr2",
    name: "Anjali Mehta",
    contact: "+91 87654 32109",
    email: "anjali@cyclefix.in",
    location: "Delhi",
    businessName: "CycleFix Solutions",
    experience: "5 years running a cycle service center",
    submittedAt: "2025-11-04T14:30:00Z",
    status: "pending",
  },
];

export const timeSlots = [
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "12:00 PM - 1:00 PM",
  "1:00 PM - 2:00 PM",
  "2:00 PM - 3:00 PM",
  "3:00 PM - 4:00 PM",
  "4:00 PM - 5:00 PM",
  "5:00 PM - 6:00 PM",
  "6:00 PM - 7:00 PM",
  "7:00 PM - 8:00 PM",
];

export const discountCampaigns: DiscountCampaign[] = [
  {
    id: "dc1",
    name: "New Year Special - 20% Off Standard Services",
    packageIds: [
      "standard-nongeared",
      "standard-geared",
      "standard-road",
    ],
    discountPercentage: 20,
    startDate: "2025-01-01",
    endDate: "2025-01-31",
    isActive: true,
  },
];

// Platform-wide statistics (to match landing page)
export const platformStats = {
  totalCustomers: 1200,
  totalServicesCompleted: 5000,
  totalReviews: 1000,
  averageRating: 4.8,
  totalTechnicians: 50,
};