import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { toast } from "sonner";

interface PartnerFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PartnerForm({ open, onOpenChange }: PartnerFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    location: "",
    businessName: "",
    experience: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would send to backend
    console.log("Partner request submitted:", formData);
    
    toast.success("Partner request submitted successfully! We'll get back to you soon.");
    
    // Reset form
    setFormData({
      name: "",
      contact: "",
      email: "",
      location: "",
      businessName: "",
      experience: "",
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-[#161B22] border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-[#E6EDF3]">Partner with CycleLife</DialogTitle>
          <DialogDescription className="text-[#E6EDF3]">
            Join our network of service providers and grow your business with us.
            Fill in the details below and we'll get back to you.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
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
              <Label htmlFor="contact" className="text-[#E6EDF3]">Contact Number *</Label>
              <Input
                id="contact"
                type="tel"
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                required
                className="bg-[#0D1117] border-gray-700 text-[#E6EDF3]"
                placeholder="+91 XXXXX XXXXX"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            
            <div>
              <Label htmlFor="location" className="text-[#E6EDF3]">Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
                className="bg-[#0D1117] border-gray-700 text-[#E6EDF3]"
                placeholder="City, State"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="businessName" className="text-[#E6EDF3]">Business Name</Label>
            <Input
              id="businessName"
              value={formData.businessName}
              onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
              className="bg-[#0D1117] border-gray-700 text-[#E6EDF3]"
              placeholder="Your business name (if applicable)"
            />
          </div>
          
          <div>
            <Label htmlFor="experience" className="text-[#E6EDF3]">Tell us about your experience</Label>
            <Textarea
              id="experience"
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              className="bg-[#0D1117] border-gray-700 text-[#E6EDF3] min-h-[100px]"
              placeholder="Share your experience in cycle servicing and repair..."
            />
          </div>
          
          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 border-gray-700 text-[#E6EDF3]"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              Submit Request
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
