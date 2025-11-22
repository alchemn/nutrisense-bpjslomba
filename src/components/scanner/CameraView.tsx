import React from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { Camera, X } from "lucide-react";

interface CameraViewProps {
  webcamRef: React.RefObject<Webcam>;
  capture: () => void;
  setIsCameraOpen: (isOpen: boolean) => void;
}

const CameraView: React.FC<CameraViewProps> = ({
  webcamRef,
  capture,
  setIsCameraOpen,
}) => {
  return (
    <div className="w-full h-full relative bg-black">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="w-full h-64 object-cover"
        videoConstraints={{ facingMode: "environment" }}
      />
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
        <Button
          variant="destructive"
          size="icon"
          onClick={() => setIsCameraOpen(false)}
        >
          <X className="w-4 h-4" />
        </Button>
        <Button variant="default" onClick={capture}>
          <Camera className="mr-2 w-4 h-4" /> Jepret
        </Button>
      </div>
    </div>
  );
};

export default CameraView;
