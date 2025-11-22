import React from "react";
import { Button } from "@/components/ui/button";
import { Camera, Upload } from "lucide-react";

interface UploadViewProps {
  setIsCameraOpen: (isOpen: boolean) => void;
  handleFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const UploadView: React.FC<UploadViewProps> = ({
  setIsCameraOpen,
  handleFileSelect,
}) => {
  return (
    <div className="space-y-4 p-8 text-center w-full">
      <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
        <Camera className="w-8 h-8 text-primary-foreground" />
      </div>
      <div>
        <p className="text-foreground font-medium mb-2">Foto Makanan Anda</p>
        <p className="text-sm text-muted-foreground pb-4">
          Gunakan kamera langsung atau unggah file
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <div className="relative">
          <Button onClick={() => setIsCameraOpen(true)} variant="outline">
            <Camera className="mr-2 w-4 h-4" /> Buka Kamera
          </Button>
        </div>

        <div className="relative">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload">
            <Button variant="default" asChild className="cursor-pointer">
              <span>
                <Upload className="mr-2 w-4 h-4" /> Upload Galeri
              </span>
            </Button>
          </label>
        </div>
      </div>
    </div>
  );
};

export default UploadView;
