import React from "react";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

interface PreviewViewProps {
  previewUrl: string;
  setSelectedFile: (file: File | null) => void;
  setPreviewUrl: (url: string) => void;
}

const PreviewView: React.FC<PreviewViewProps> = ({
  previewUrl,
  setSelectedFile,
  setPreviewUrl,
}) => {
  return (
    <div className="space-y-4 w-full p-4">
      <img
        src={previewUrl}
        alt="Preview"
        className="w-full h-64 object-cover rounded-lg"
      />
      <div className="flex justify-center gap-2">
        <Button
          variant="outline"
          onClick={() => {
            setSelectedFile(null);
            setPreviewUrl("");
          }}
        >
          <RefreshCcw className="mr-2 w-4 h-4" /> Reset
        </Button>
      </div>
    </div>
  );
};

export default PreviewView;
