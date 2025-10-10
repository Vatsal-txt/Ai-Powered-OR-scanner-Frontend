import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Camera, Upload, Clock, LogOut, CheckCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import QRScanner from "@/components/QRScanner";
import QRUpload from "@/components/QRUpload";
import { toast } from "sonner";

const Dashboard = () => {
  const navigate = useNavigate();
  const userEmail = "vatsalxd@gmail.com"; // This would come from auth context
  const [showScanner, setShowScanner] = useState(false);
  const [showUpload, setShowUpload] = useState(false);

  const handleLogout = () => {
    navigate("/");
  };

  const handleScanSuccess = (decodedText: string) => {
    console.log("QR Code scanned:", decodedText);
    toast.success("QR Code scanned successfully!");
    setShowScanner(false);
    setShowUpload(false);
    // Here you would send the decoded text to your AI analysis endpoint
  };

  const securityFeatures = [
    {
      title: "URL Analysis",
      description: "Advanced analysis of URLs for suspicious patterns and domains",
      color: "bg-green-50 border-green-200",
      textColor: "text-green-700",
      icon: CheckCircle,
      iconColor: "text-green-500"
    },
    {
      title: "Phishing Detection",
      description: "AI-powered detection of phishing attempts and social engineering",
      color: "bg-blue-50 border-blue-200",
      textColor: "text-blue-700",
      icon: CheckCircle,
      iconColor: "text-blue-500"
    },
    {
      title: "Malicious Links",
      description: "Identification of known malicious URLs and suspicious redirects",
      color: "bg-purple-50 border-purple-200",
      textColor: "text-purple-700",
      icon: CheckCircle,
      iconColor: "text-purple-500"
    },
    {
      title: "Risk Assessment",
      description: "Real-time risk evaluation with detailed threat breakdown",
      color: "bg-yellow-50 border-yellow-200",
      textColor: "text-yellow-700",
      icon: AlertTriangle,
      iconColor: "text-yellow-500"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                <Shield className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary">SafeScan AI</h1>
                <p className="text-sm text-muted-foreground">Welcome, {userEmail}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <Clock className="h-4 w-4" />
                History
              </Button>
              <Button variant="destructive" className="gap-2" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Scan QR Code Section */}
          <div>
            <h2 className="mb-6 text-2xl font-semibold flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded border-2 border-primary">
                <div className="h-3 w-3 rounded-sm border border-primary" />
              </div>
              Scan QR Code
            </h2>
            <div className="space-y-4">
              <Button 
                variant="gradient" 
                size="lg" 
                className="w-full h-16 text-base font-semibold gap-3"
                onClick={() => setShowScanner(true)}
              >
                <Camera className="h-5 w-5" />
                Scan with Camera
              </Button>
              <Button 
                variant="gradient" 
                size="lg" 
                className="w-full h-16 text-base font-semibold gap-3"
                onClick={() => setShowUpload(true)}
              >
                <Upload className="h-5 w-5" />
                Upload QR Image
              </Button>
            </div>
          </div>

          {/* Security Features Section */}
          <div>
            <h2 className="mb-6 text-2xl font-semibold flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              Security Features
            </h2>
            <div className="space-y-4">
              {securityFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className={`${feature.color} border-2`}>
                    <CardHeader className="pb-3">
                      <CardTitle className={`text-lg flex items-center gap-2 ${feature.textColor}`}>
                        <Icon className={`h-5 w-5 ${feature.iconColor}`} />
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-muted-foreground">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                );
              })}

              {/* Powered by Gemini */}
              <Card className="bg-cyan-50 border-2 border-cyan-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2 text-cyan-700">
                    <Shield className="h-5 w-5 text-cyan-500" />
                    Powered by Gemini 2.5 Pro
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    Our AI analyzes QR codes using advanced machine learning to protect you from scams and malicious content.
                  </CardDescription>
                </CardContent>
              </Card>
          </div>
        </div>
      </div>

      {showScanner && (
        <QRScanner onScanSuccess={handleScanSuccess} onClose={() => setShowScanner(false)} />
      )}

      {showUpload && (
        <QRUpload onScanSuccess={handleScanSuccess} onClose={() => setShowUpload(false)} />
      )}
    </div>
    </div>
  );
};

export default Dashboard;
