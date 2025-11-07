import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Check, Star, Bike, Settings, Zap, Calendar, Wrench } from 'lucide-react';

interface PackagesProps {
  onBookNow?: () => void;
}

export function Packages({ onBookNow }: PackagesProps = {}) {
  const serviceCategories = {
    assembly: {
      name: "Assembly",
      description: "Professional assembly service for your new cycle",
      icon: Wrench,
      tagline: "Bought cycle online and got it box delivered without assembly? Don't worry, we got your back. Schedule the cycle assembly with us",
      packages: [
        {
          id: "assembly-nongeared",
          cycleType: "Non Geared Cycle",
          icon: Bike,
          price: 500,
          annualPrice: 500, // No annual option for assembly
          duration: "1 hour",
          description: "Expert assembly for single-speed bikes",
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
            "30-day assembly warranty"
          ]
        },
        {
          id: "assembly-geared",
          cycleType: "Geared Cycle",
          icon: Settings,
          price: 750,
          annualPrice: 750,
          duration: "1 hour",
          description: "Professional assembly for geared bikes",
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
            "30-day assembly warranty"
          ]
        },
        {
          id: "assembly-road",
          cycleType: "Road Cycle",
          icon: Zap,
          price: 1000,
          annualPrice: 1000,
          duration: "1 hour",
          description: "Premium assembly for road bikes",
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
            "30-day assembly warranty"
          ]
        }
      ]
    },
    standard: {
      name: "Standard Service Package",
      description: "Essential maintenance for optimal performance",
      icon: Settings,
      packages: [
        {
          id: "standard-nongeared",
          cycleType: "Non Geared Cycle",
          icon: Bike,
          price: 799,
          annualPrice: 1598,
          duration: "1 hour",
          description: "Essential maintenance for your single-speed bike",
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
            "*Any spares consumed will be additional"
          ]
        },
        {
          id: "standard-geared",
          cycleType: "Geared Cycle",
          icon: Settings,
          price: 1099,
          annualPrice: 2198,
          duration: "1.5 hours",
          description: "Essential maintenance including gear adjustments",
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
            "*Any spares consumed will be additional"
          ]
        },
        {
          id: "standard-road",
          cycleType: "Road Cycle",
          icon: Zap,
          price: 1299,
          annualPrice: 2598,
          duration: "1.5 hours",
          description: "Precision adjustments for optimal road performance",
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
            "*Any spares consumed will be additional"
          ]
        }
      ]
    },
    advanced: {
      name: "Advanced Service Package",
      description: "Comprehensive service for peak performance",
      icon: Star,
      packages: [
        {
          id: "advanced-nongeared",
          cycleType: "Non Geared Cycle",
          icon: Bike,
          price: 999,
          annualPrice: 1998,
          duration: "1 hour",
          description: "Comprehensive maintenance for optimal performance",
          popular: true,
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
            "*Any spares consumed will be additional"
          ]
        },
        {
          id: "advanced-geared",
          cycleType: "Geared Cycle",
          icon: Settings,
          price: 1399,
          annualPrice: 2798,
          duration: "1.5 hours",
          description: "Comprehensive service for smooth gear operation",
          popular: true,
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
            "*Any spares consumed will be additional"
          ]
        },
        {
          id: "advanced-road",
          cycleType: "Road Cycle",
          icon: Zap,
          price: 1699,
          annualPrice: 3398,
          duration: "1.5 hours",
          description: "Competition-grade service for serious cyclists",
          popular: true,
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
            "*Any spares consumed will be additional"
          ]
        }
      ]
    }
  };

  const handleBookNow = () => {
    if (onBookNow) {
      onBookNow();
    } else {
      // Try to scroll to booking if on dashboard
      const element = document.getElementById('booking');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const renderPackageCard = (pkg: any, categoryKey: string, showAnnual: boolean = true) => (
    <Card key={pkg.id} className={`relative bg-[#161B22] border-gray-800 ${pkg.popular ? 'border-blue-500 shadow-lg shadow-blue-900/20' : ''}`}>
      {pkg.popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-blue-600 text-white px-4 py-1">
            <Star className="w-3 h-3 mr-1 inline" />
            Most Popular
          </Badge>
        </div>
      )}
      
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2 mb-2">
          {(() => {
            const IconComponent = pkg.icon;
            return <IconComponent className="w-5 h-5 text-blue-400" />;
          })()}
          <CardTitle className="text-lg text-[#E6EDF3]">{pkg.cycleType}</CardTitle>
        </div>
        <div className="mb-2">
          <div className="text-3xl text-blue-400">Rs. {pkg.price}/-</div>
          <div className="text-sm text-gray-400 mt-1">{categoryKey === 'assembly' ? 'One-time assembly' : 'Single service'}</div>
        </div>
        {showAnnual && categoryKey !== 'assembly' && (
          <div className="bg-green-900/30 border border-green-700 rounded-lg p-3 mb-2">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-4 h-4 text-green-400" />
              <span className="text-sm text-green-300">Annual Plan Available</span>
            </div>
            <div className="text-lg text-green-400">Rs. {pkg.annualPrice}/-</div>
            <div className="text-xs text-gray-400">3 services (Save 1 service cost!)</div>
          </div>
        )}
        <div className="text-sm text-gray-400">{pkg.duration}</div>
        <CardDescription className="text-[#E6EDF3] mt-2">
          {pkg.description}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ul className="space-y-2">
          {pkg.features.map((feature: string, featureIndex: number) => (
            <li key={featureIndex} className="flex items-start space-x-2">
              <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-[#E6EDF3] text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter>
        <Button 
          onClick={handleBookNow}
          className={`w-full ${pkg.popular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-900 hover:bg-gray-800'}`}
        >
          {categoryKey === 'assembly' ? 'Book Assembly' : 'Select Package'}
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <section id="packages" className="py-20 bg-[#0D1117]">
      <div id="pricing"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl text-[#E6EDF3] mb-4">
            Service Packages
          </h2>
          <p className="text-lg text-[#E6EDF3] max-w-2xl mx-auto">
            Professional cycle assembly and maintenance services. Choose from Assembly, Standard, or Advanced packages.
          </p>
        </div>

        <Tabs defaultValue="assembly" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-12 bg-[#161B22] border border-gray-800 max-w-2xl mx-auto">
            {Object.entries(serviceCategories).map(([key, category]) => {
              const IconComponent = category.icon;
              return (
                <TabsTrigger 
                  key={key} 
                  value={key}
                  className="flex items-center gap-2 py-4 text-gray-400 data-[state=active]:bg-blue-900/30 data-[state=active]:text-blue-400"
                >
                  <IconComponent className="w-5 h-5" />
                  <span>{category.name.split(' ')[0]}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {Object.entries(serviceCategories).map(([key, category]) => (
            <TabsContent key={key} value={key} className="space-y-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl text-[#E6EDF3] mb-2">{category.name}</h3>
                <p className="text-[#E6EDF3]">{category.description}</p>



                {key === 'assembly' && 'tagline' in category && (
                  <div className="mt-4 mx-auto max-w-3xl">
                    <div className="bg-blue-900/30 border-l-4 border-blue-500 p-4 rounded-r-lg">
                      <p className="text-[#E6EDF3]">
                        {/* You can even remove the `?` here, as TypeScript now knows it exists */}
                        {category.tagline}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
                {category.packages.map((pkg) => renderPackageCard(pkg, key, key !== 'assembly'))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
