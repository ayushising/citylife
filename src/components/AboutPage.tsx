import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ArrowLeft, Bike } from "lucide-react";
// import logo from "figma:asset/ff974acc25be3bdb52e4b37eb1c66a6e7431e30c.png";

interface AboutPageProps {
  onBack: () => void;
}

export function AboutPage({ onBack }: AboutPageProps) {
  const team = [
    {
      name: "Leena",
      role: "Co-Founder & CEO",
      bio: "Leena is an avid cyclist who discovered her love for cycling during morning rides in the city. With a background in operations management, she ensures CycleLife delivers exceptional service quality. She personally tests every service package to maintain the highest standards.",
    },
    {
      name: "Dhaval",
      role: "Co-Founder & COO",
      bio: "An avid cyclist himself, Dhaval has been cycling for over 10 years. His passion for cycling and frustration with unreliable service options led him to co-found CycleLife. He envisions a world where every cyclist has access to professional, doorstep cycle maintenance.",
    },
    {
      name: "Harsh",
      role: "Co-Founder & CTO",
      bio: "A passionate cyclist and technology enthusiast, Harsh combines his two loves at CycleLife. He's an avid cyclist who participates in weekend cycling events. His technical expertise drives the platform's innovation, making doorstep cycle servicing seamless and efficient.",
    },
    {
      name: "Rejoe",
      role: "Co-Founder & Head of Service",
      bio: "Rejoe is an avid cyclist with extensive experience in cycling industry. Having worked with a major cycle manufacturer for years, he understands every aspect of cycle maintenance. His expertise ensures that CycleLife's service quality is unmatched in the industry.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0D1117]">
      {/* Header */}
      <header className="border-b border-gray-800 bg-[#161B22]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button
              onClick={onBack}
              variant="ghost"
              size="sm"
              className="text-gray-300 hover:text-[#E6EDF3]"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
          {/* <img src={logo} alt="CycleLife" className="h-12" /> */}
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-900 rounded-full mb-6">
              <Bike className="w-10 h-10 text-blue-400" />
            </div>
            <h1 className="text-4xl mb-4 text-[#E6EDF3]">
              About CycleLife
            </h1>
            <p className="text-xl text-[#E6EDF3] max-w-3xl mx-auto">
              Founded by cyclists, for cyclists. We understand
              your needs because we share your passion.
            </p>
          </div>

          {/* Our Story */}
          <Card className="bg-[#161B22] border-gray-800 mb-12">
            <CardHeader>
              <CardTitle className="text-[#E6EDF3]">
                Our Story
              </CardTitle>
            </CardHeader>
            <CardContent className="text-[#E6EDF3]">
              <p className="mb-4">
                CycleLife was born out of a simple frustration:
                getting quality cycle service was too difficult
                and time-consuming. As avid cyclists ourselves,
                we knew there had to be a better way.
              </p>
              <p className="mb-4">
                We started CycleLife with a mission to make
                professional cycle maintenance accessible to
                everyone, right at their doorstep. No more
                dragging your bike to a shop, no more waiting in
                long queues, and no more compromising on
                quality.
              </p>
              <p>
                Today, we're proud to serve thousands of
                cyclists across India, bringing expert
                technicians and quality service directly to
                their homes. Every member of our founding team
                is an avid cyclist who understands the
                importance of a well-maintained bike.
              </p>
            </CardContent>
          </Card>

          {/* Team */}
          <div className="mb-12">
            <h2 className="text-3xl mb-8 text-center text-[#E6EDF3]">
              Meet Our Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {team.map((member) => (
                <Card
                  key={member.name}
                  className="bg-[#161B22] border-gray-800"
                >
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-2">
                      <div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center">
                        <span className="text-2xl text-blue-400">
                          {member.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <CardTitle className="text-[#E6EDF3]">
                          {member.name}
                        </CardTitle>
                        <CardDescription className="text-blue-400">
                          {member.role}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[#E6EDF3]">
                      {member.bio}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Values */}
          <Card className="bg-[#161B22] border-gray-800">
            <CardHeader>
              <CardTitle className="text-[#E6EDF3]">
                Our Values
              </CardTitle>
            </CardHeader>
            <CardContent className="text-[#E6EDF3]">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="mb-2 text-blue-400">
                    Quality First
                  </h3>
                  <p className="text-sm">
                    We never compromise on the quality of our
                    service. Every technician is certified and
                    trained to deliver excellence.
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 text-blue-400">
                    Convenience Matters
                  </h3>
                  <p className="text-sm">
                    Your time is valuable. We bring professional
                    service to your doorstep, making cycle
                    maintenance hassle-free.
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 text-blue-400">
                    Cyclist Community
                  </h3>
                  <p className="text-sm">
                    We're not just a service - we're part of the
                    cycling community. We ride, we understand,
                    and we care.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}