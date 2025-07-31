import React, { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";
import axios from "axios";

const FaceDetection = ({ setSongs }) => {
  const videoRef = useRef();
  const canvasRef = useRef();
  const containerRef = useRef();
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [detecting, setDetecting] = useState(false);
  const [mood, setMood] = useState("");
  const [dimensions, setDimensions] = useState({ width: 400, height: 300 });

  // Load face-api models once
  useEffect(() => {
    const loadModels = async () => {
      try {
        const MODEL_URL = "/models";
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        ]);
        setModelsLoaded(true);
        startVideo();
      } catch (error) {
        console.error("Failed to load models:", error);
      }
    };

    loadModels();

    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Start webcam stream
  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: "user",
        },
      })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error("Camera access error:", err);
        alert("Could not access the camera. Please check permissions.");
      });
  };

  // Handle detection
  const handleDetect = async () => {
    if (!modelsLoaded || !videoRef.current) return;

    setDetecting(true);
    setMood("");

    let detectedMood = "";

    try {
      const detectionInterval = setInterval(async () => {
        const detections = await faceapi
          .detectAllFaces(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions()
          )
          .withFaceExpressions();

        const resized = faceapi.resizeResults(detections, {
          width: videoRef.current.videoWidth,
          height: videoRef.current.videoHeight,
        });

        const ctx = canvasRef.current.getContext("2d");
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        faceapi.draw.drawFaceExpressions(canvasRef.current, resized);

        if (resized[0]?.expressions) {
          const expressions = resized[0].expressions;
          const sorted = Object.entries(expressions).sort(
            (a, b) => b[1] - a[1]
          );
          detectedMood = sorted[0][0];
          setMood(detectedMood.charAt(0).toUpperCase() + detectedMood.slice(1));
        }
      }, 300);

      setTimeout(async () => {
        clearInterval(detectionInterval);
        setDetecting(false);

        if (detectedMood) {
          try {
            const response = await axios.get(
              `http://localhost:3000/songs?mood=${detectedMood}`
            );
            console.log(response.data);
            setSongs(response.data.songs);
          } catch (error) {
            console.error("Error fetching songs:", error);
          }
        } else {
          console.warn("No face/mood detected.");
        }
      }, 3000);
    } catch (error) {
      console.error("Detection error:", error);
      setDetecting(false);
    }
  };

  return (
    <div className="flex flex-col p-20 w-[60%]">
      <div
        ref={containerRef}
        className="relative w-full max-w-md mx-auto rounded-xl overflow-hidden shadow-lg mb-6 ml-0"
        style={{ height: `${dimensions.height}px` }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <canvas
          ref={canvasRef}
          width={dimensions.width}
          height={dimensions.height}
          className="absolute inset-0 w-full h-full"
        />
      </div>

      <div className="flex flex-col items-center space-y-4 w-full max-w-md">
        <button
          onClick={handleDetect}
          disabled={!modelsLoaded || detecting}
          className={`px-6 py-2 rounded-lg shadow-md transition ${
            !modelsLoaded || detecting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          } font-medium w-full`}
        >
          {!modelsLoaded
            ? "Loading..."
            : detecting
            ? "Detecting..."
            : "Detect Mood"}
        </button>

        {mood && (
          <div className="text-xl font-semibold text-gray-700 text-center">
            Mood: <span className="text-blue-600">{mood}</span>
          </div>
        )}

        {!modelsLoaded && (
          <div className="text-gray-600 text-center text-sm">
            Loading facial recognition models...
          </div>
        )}
      </div>
    </div>
  );
};

export default FaceDetection;
