import { useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  Clock,
  MapPin,
  Star,
  Shield,
} from "lucide-react";
import { Packages } from "./Packages";
import { PartnerForm } from "./PartnerForm";
// import logo from "figma:asset/ff974acc25be3bdb52e4b37eb1c66a6e7431e30c.png";

interface LandingPageProps {
  onGetStarted: () => void;
  onLogin: () => void;
  onNavigateToAbout?: () => void;
  onNavigateToCareers?: () => void;
}

export function LandingPage({
  onGetStarted,
  onLogin,
  onNavigateToAbout,
  onNavigateToCareers,
}: LandingPageProps) {
  const [partnerFormOpen, setPartnerFormOpen] = useState(false);
  return (
    <div className="min-h-screen bg-[#0D1117]">
      {/* Header */}
      <header className="border-b border-gray-800 bg-[#161B22]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            {/* <img src={logo} alt="CycleLife" className="h-12" /> */}
          </div>
          <nav className="hidden md:flex gap-6">
            <a
              href="#services"
              className="text-gray-300 hover:text-blue-400 transition"
            >
              Services
            </a>
            <a
              href="#how-it-works"
              className="text-gray-300 hover:text-blue-400 transition"
            >
              How It Works
            </a>
            <a
              href="#packages"
              className="text-gray-300 hover:text-blue-400 transition"
            >
              Packages
            </a>
            <a
              href="#contact"
              className="text-gray-300 hover:text-blue-400 transition"
            >
              Contact
            </a>
          </nav>
          <Button onClick={onLogin} variant="outline">
            Login
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="mb-4 bg-blue-900 text-blue-200 hover:bg-blue-900">
              Doorstep Service
            </Badge>
            <h1 className="text-5xl mb-6 text-[#E6EDF3]">
              Professional Cycle Servicing at Your Doorstep
            </h1>
            <p className="text-xl text-[#E6EDF3] mb-8">
              Book expert cycle maintenance and repair services
              from the comfort of your home. Quick, reliable,
              and hassle-free.
            </p>
            <div className="flex gap-4">
              <Button
                onClick={onGetStarted}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700"
              >
                Book Now
              </Button>
              <Button
                onClick={() => {
                  const element = document.getElementById('how-it-works');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                size="lg"
                variant="outline"
                className="border-blue-500 text-blue-400 hover:bg-blue-900/50"
              >
                Learn More
              </Button>
            </div>
            <div className="flex gap-8 mt-8">
              <div>
                <div className="flex items-center gap-1 text-2xl text-[#E6EDF3]">
                  <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                  4.8
                </div>
                <p className="text-sm text-gray-400">
                  1000+ Reviews
                </p>
              </div>
              <div>
                <div className="text-2xl text-[#E6EDF3]">
                  5000+
                </div>
                <p className="text-sm text-gray-400">
                  Services Completed
                </p>
              </div>
              <div>
                <div className="text-2xl text-[#E6EDF3]">
                  50+
                </div>
                <p className="text-sm text-gray-400">
                  Expert Technicians
                </p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1675798227643-da319f8ee8f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaWN5Y2xlJTIwcmVwYWlyJTIwd29ya3Nob3B8ZW58MXx8fHwxNzU3ODM3NzY4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Cycling"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-[#0D1117] py-20" id="services">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4 text-[#E6EDF3]">
              Why Choose CycleLife?
            </h2>
            <p className="text-xl text-[#E6EDF3]">
              We make cycle maintenance simple and convenient
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-[#161B22] border-gray-800">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-blue-400" />
                </div>
                <CardTitle className="text-[#E6EDF3]">Doorstep Service</CardTitle>
                <CardDescription className="text-[#E6EDF3]">
                  No need to visit a shop. Our expert
                  technicians come to your location at your
                  convenience.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-[#161B22] border-gray-800">
              <CardHeader>
                <div className="w-12 h-12 bg-green-900 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-green-400" />
                </div>
                <CardTitle className="text-[#E6EDF3]">Flexible Scheduling</CardTitle>
                <CardDescription className="text-[#E6EDF3]">
                  Choose your preferred date and time slot. We
                  work around your schedule, not the other way
                  around.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-[#161B22] border-gray-800">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-purple-400" />
                </div>
                <CardTitle className="text-[#E6EDF3]">Quality Guaranteed</CardTitle>
                <CardDescription className="text-[#E6EDF3]">
                  Certified technicians, genuine parts, and
                  comprehensive warranties on all services.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-[#161B22]" id="how-it-works">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4 text-[#E6EDF3]">
              How It Works
            </h2>
            <p className="text-xl text-[#E6EDF3]">
              Get your cycle serviced in 3 simple steps
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl mb-2 text-[#E6EDF3]">
                Choose Service
              </h3>
              <p className="text-[#E6EDF3]">
                Select from our range of servicing packages
                based on your cycle's needs
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl mb-2 text-[#E6EDF3]">
                Book Slot
              </h3>
              <p className="text-[#E6EDF3]">
                Pick a convenient date and time for our
                technician to visit your location
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl mb-2 text-[#E6EDF3]">
                Get Serviced
              </h3>
              <p className="text-[#E6EDF3]">
                Our expert arrives on time and services your
                cycle at your doorstep
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Packages */}
      <Packages onBookNow={onGetStarted} />

      {/* Footer */}
      <footer
        className="bg-gray-900 text-white py-12"
        id="contact"
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="mb-4">
               <h1>cyclelife</h1>
              </div>
              <p className="text-gray-400">
                Professional doorstep cycle servicing for
                everyone.
              </p>
            </div>
            <div>
              <h3 className="mb-4 text-[#E6EDF3]">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Assembly Service</li>
                <li>Standard Service</li>
                <li>Advanced Service</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-[#E6EDF3]">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button
                    onClick={onNavigateToAbout}
                    className="hover:text-blue-400 transition"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={onNavigateToCareers}
                    className="hover:text-blue-400 transition"
                  >
                    Careers
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setPartnerFormOpen(true)}
                    className="hover:text-blue-400 transition"
                  >
                    Partner with Us
                  </button>
                </li>
                <li>
                  <a href="#contact" className="hover:text-blue-400 transition">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-[#E6EDF3]">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>support@cyclelife.in</li>
                <li>+91 77380 84657</li>
                <li>Available 10 AM - 8 PM</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 CycleLife. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
      <PartnerForm open={partnerFormOpen} onOpenChange={setPartnerFormOpen} />
    </div>
  );
}