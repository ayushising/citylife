import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { toast } from "sonner";
// import logo from "figma:asset/ff974acc25be3bdb52e4b37eb1c66a6e7431e30c.png";

interface AuthPageProps {
  onLogin: (email: string, role: 'customer' | 'provider' | 'staff' | 'admin') => void;
  onBack: () => void;
}

export function AuthPage({ onLogin, onBack }: AuthPageProps) {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerPhone, setRegisterPhone] = useState("");
  const [registerAddress, setRegisterAddress] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock login - determine role based on email
    let role: 'customer' | 'provider' | 'staff' | 'admin' = 'customer';
    
    if (loginEmail.includes('admin')) {
      role = 'admin';
    } else if (loginEmail.includes('provider')) {
      role = 'provider';
    } else if (loginEmail.includes('staff') || loginEmail.includes('technician')) {
      role = 'staff';
    }
    
    toast.success(`Logged in as ${role}`);
    onLogin(loginEmail, role);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Registration successful! Please login.");
    // Reset form
    setRegisterName("");
    setRegisterEmail("");
    setRegisterPassword("");
    setRegisterPhone("");
    setRegisterAddress("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            {/* <img src={logo} alt="CycleLife" className="h-16" /> */}
          </div>
          <p className="text-gray-600">Welcome back! Please login to continue.</p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>Enter your credentials to access your account</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="john@example.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    Login
                  </Button>
                </form>
                <div className="mt-4 text-sm text-gray-600">
                  <p className="mb-2">Demo accounts:</p>
                  <ul className="space-y-1 text-xs">
                    <li>• Customer: john@example.com</li>
                    <li>• Service Provider: serviceprovider@cyclelife.in</li>
                    <li>• Technician: technician@cyclelife.in</li>
                    <li>• Admin: admin@cyclelife.in</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>Register</CardTitle>
                <CardDescription>Create a new account to get started</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name">Full Name</Label>
                    <Input
                      id="register-name"
                      type="text"
                      placeholder="John Doe"
                      value={registerName}
                      onChange={(e) => setRegisterName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="john@example.com"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-phone">Phone</Label>
                    <Input
                      id="register-phone"
                      type="tel"
                      placeholder="+91 77380 84657"
                      value={registerPhone}
                      onChange={(e) => setRegisterPhone(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-address">Address</Label>
                    <Input
                      id="register-address"
                      type="text"
                      placeholder="123 Street, City"
                      value={registerAddress}
                      onChange={(e) => setRegisterAddress(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="••••••••"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    Register
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-4">
          <Button variant="ghost" onClick={onBack}>
            ← Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
