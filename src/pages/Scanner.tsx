import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Loader2, Camera } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Webcam from "react-webcam";
import { analyzeFoodImage } from "@/api/food";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "@/lib/types";
import { getUser } from "@/utils/auth";
import ScannerHeader from "@/components/scanner/ScannerHeader";
import CameraView from "@/components/scanner/CameraView";
import PreviewView from "@/components/scanner/PreviewView";
import UploadView from "@/components/scanner/UploadView";
import TipsCard from "@/components/scanner/TipsCard";

const Scanner = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const webcamRef = useRef<Webcam>(null);

  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const user = getUser();
    if (!user) {
      navigate("/auth");
    }
  }, [navigate]);

  const dataURLtoFile = (dataurl: string, filename: string) => {
    const arr = dataurl.split(",");
    const mimeMatch = arr[0].match(/:(.*?);/);
    if (!mimeMatch) {
      throw new Error("Invalid data URL");
    }
    const mime = mimeMatch[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setIsCameraOpen(false);
    }
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      const file = dataURLtoFile(imageSrc, "camera-capture.jpg");
      setSelectedFile(file);
      setPreviewUrl(imageSrc);
      setIsCameraOpen(false);
    }
  }, [webcamRef]);

  const handleAnalyze = async () => {
    if (!selectedFile) {
      toast({
        title: "Pilih Foto Terlebih Dahulu",
        description:
          "Silakan unggah atau ambil foto makanan yang ingin dianalisis",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);

    try {
      const response = await analyzeFoodImage(selectedFile);
      const result = response.data;

      toast({
        title: "Analisis Selesai!",
        description: `Terdeteksi: ${result.foodName}`,
      });

      navigate("/results", {
        state: {
          foodImage: previewUrl,
          analysisResult: result,
        },
      });
    } catch (error: unknown) {
      console.error("Error analyzing food:", error);

      let errorMessage = "Gagal terhubung ke server analisis.";

      if (error instanceof AxiosError) {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        errorMessage =
          axiosError.response?.data?.message ||
          axiosError.message ||
          errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast({
        title: "Gagal Menganalisis",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2" /> Kembali
          </Button>
        </Link>

        <div className="max-w-4xl mx-auto">
          <ScannerHeader />

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="p-8">
              <div className="space-y-6">
                <div className="border-2 border-dashed border-primary/30 rounded-xl overflow-hidden bg-black/5 relative min-h-[300px] flex flex-col items-center justify-center">
                  {isCameraOpen ? (
                    <CameraView
                      webcamRef={webcamRef}
                      capture={capture}
                      setIsCameraOpen={setIsCameraOpen}
                    />
                  ) : previewUrl ? (
                    <PreviewView
                      previewUrl={previewUrl}
                      setSelectedFile={setSelectedFile}
                      setPreviewUrl={setPreviewUrl}
                    />
                  ) : (
                    <UploadView
                      setIsCameraOpen={setIsCameraOpen}
                      handleFileSelect={handleFileSelect}
                    />
                  )}
                </div>

                <Button
                  variant="hero"
                  className="w-full"
                  size="lg"
                  onClick={handleAnalyze}
                  disabled={!selectedFile || isAnalyzing || isCameraOpen}
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-2 animate-spin" /> Menganalisis...
                    </>
                  ) : (
                    <>
                      <Camera className="mr-2" /> Analisis Sekarang
                    </>
                  )}
                </Button>
              </div>
            </Card>

            <TipsCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scanner;