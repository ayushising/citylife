import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Briefcase, Upload, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
// import logo from "figma:asset/ff974acc25be3bdb52e4b37eb1c66a6e7431e30c.png";

interface CareersPageProps {
  onBack: () => void;
}

export function CareersPage({ onBack }: CareersPageProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    resume: null as File | null,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, resume: e.target.files[0] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.resume) {
      toast.error("Please upload your resume");
      return;
    }
    
    // In a real app, this would upload to backend
    console.log("Resume submitted:", formData);
    
    toast.success("Resume submitted successfully! We'll review it and get back to you.");
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      position: "",
      resume: null,
    });
  };

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
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-900 rounded-full mb-6">
              <Briefcase className="w-10 h-10 text-blue-400" />
            </div>
            <h1 className="text-4xl mb-4 text-[#E6EDF3]">Careers at CycleLife</h1>
            <p className="text-xl text-[#E6EDF3] max-w-2xl mx-auto">
              We are planning to expand our team soon!
            </p>
          </div>

          <Card className="bg-[#161B22] border-gray-800 mb-8">
            <CardHeader>
              <CardTitle className="text-[#E6EDF3]">Join Our Growing Team</CardTitle>
              <CardDescription className="text-[#E6EDF3]">
                CycleLife is on a mission to revolutionize cycle servicing across India. 
                We're looking for passionate individuals who share our vision and want to 
                make a difference in the cycling community.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-[#E6EDF3]">
              <p className="mb-4">
                While we don't have any open positions at the moment, we're always interested 
                in connecting with talented people. Submit your resume below and we'll keep 
                you in mind for future opportunities.
              </p>
              <p>
                We're especially looking for:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-2 ml-4">
                <li>Experienced Cycle Technicians</li>
                <li>Customer Support Specialists</li>
                <li>Operations Managers</li>
                <li>Software Developers</li>
                <li>Marketing Professionals</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-[#161B22] border-gray-800">
            <CardHeader>
              <CardTitle className="text-[#E6EDF3]">Submit Your Resume</CardTitle>
              <CardDescription className="text-[#E6EDF3]">
                Fill in your details and upload your resume. We'll reach out when suitable positions open up.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-[#E6EDF3]">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="bg-[#0D1117] border-gray-700 text-[#E6EDF3]"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-[#E6EDF3]">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="bg-[#0D1117] border-gray-700 text-[#E6EDF3]"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone" className="text-[#E6EDF3]">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="bg-[#0D1117] border-gray-700 text-[#E6EDF3]"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="position" className="text-[#E6EDF3]">Position of Interest *</Label>
                    <Input
                      id="position"
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      required
                      className="bg-[#0D1117] border-gray-700 text-[#E6EDF3]"
                      placeholder="e.g., Cycle Technician"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="resume" className="text-[#E6EDF3]">Upload Resume *</Label>
                  <div className="mt-2">
                    <div className="flex items-center gap-4">
                      <Input
                        id="resume"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        required
                        className="bg-[#0D1117] border-gray-700 text-[#E6EDF3]"
                      />
                      <Upload className="w-5 h-5 text-gray-400" />
                    </div>
                    {formData.resume && (
                      <p className="text-sm text-green-400 mt-2">
                        Selected: {formData.resume.name}
                      </p>
                    )}
                    <p className="text-xs text-gray-400 mt-1">
                      Accepted formats: PDF, DOC, DOCX (Max 5MB)
                    </p>
                  </div>
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 mt-6"
                >
                  Submit Resume
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
