import { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface QRScannerProps {
  onScanSuccess: (decodedText: string) => void;
  onClose: () => void;
}

const QRScanner = ({ onScanSuccess, onClose }: QRScannerProps) => {
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const [isScanning, setIsScanning] = useState(true);

  useEffect(() => {
    if (!scannerRef.current && isScanning) {
      scannerRef.current = new Html5QrcodeScanner(
        "qr-reader",
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        false
      );

      scannerRef.current.render(
        (decodedText) => {
          onScanSuccess(decodedText);
          setIsScanning(false);
        },
        (error) => {
          console.warn("QR scan error:", error);
        }
      );
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(console.error);
        scannerRef.current = null;
      }
    };
  }, [isScanning, onScanSuccess]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Scan QR Code</CardTitle>
              <CardDescription>Position the QR code within the frame</CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div id="qr-reader" className="w-full" />
        </CardContent>
      </Card>
    </div>
  );
};

export default QRScanner;
