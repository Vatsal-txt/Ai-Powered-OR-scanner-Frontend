import { useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Upload } from "lucide-react";

interface QRUploadProps {
  onScanSuccess: (decodedText: string) => void;
  onClose: () => void;
}

const QRUpload = ({ onScanSuccess, onClose }: QRUploadProps) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    const html5QrCode = new Html5Qrcode("qr-upload-reader");

    try {
      const decodedText = await html5QrCode.scanFile(file, false);
      onScanSuccess(decodedText);
    } catch (error) {
      console.error("Error scanning file:", error);
      alert("Could not scan QR code from image. Please try another image.");
    } finally {
      setIsProcessing(false);
      html5QrCode.clear();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Upload QR Code Image</CardTitle>
              <CardDescription>Select an image file containing a QR code</CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div id="qr-upload-reader" className="hidden" />
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              disabled={isProcessing}
              className="cursor-pointer"
            />
            {isProcessing && <p className="mt-4 text-sm text-muted-foreground">Processing image...</p>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QRUpload;
