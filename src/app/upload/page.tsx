"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UploadButton } from "@uploadthing/react";
import { addVideo } from "@/lib/firestore";
import { useUser } from "@clerk/nextjs";
import type { OurFileRouter } from "@/lib/uploadthing";
import type { VideoData } from "@/types";
import { UploadFileResponse } from "@uploadthing/react";

// Remove this interface if it's not used
// interface VideoMetadata {
//   userId: string;
//   // Add other metadata fields if needed
// }

export default function UploadPage() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Wait for auth to load before redirecting
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!user) {
    router.push("/sign-in");
    return null;
  }

  const handleUploadComplete = async (
    res: UploadFileResponse[] | undefined
  ) => {
    console.log("📤 Client upload complete", {
      hasResponse: !!res,
      responseLength: res?.length,
    });

    if (!res?.[0]) {
      console.error("❌ Upload completed but no response received");
      setError("Upload failed - no response received");
      setUploading(false);
      return;
    }

    try {
      const videoData: VideoData = {
        title,
        description,
        url: res[0].url,
        timestamp: new Date(),
        likes: [],
        comments: [],
        userId: user.id,
      };

      console.log("💾 Saving video metadata to Firestore...");
      await addVideo(videoData);
      console.log("✅ Video metadata saved successfully");
      router.push("/");
    } catch (err) {
      console.error("❌ Failed to save video metadata:", err);
      setError("Failed to save video details");
    } finally {
      setUploading(false);
    }
  };

  return (
    <main className="container mx-auto px-4 pt-24">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Upload Video</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 rounded-lg border bg-background"
              placeholder="Enter video title"
              disabled={uploading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 rounded-lg border bg-background h-32"
              placeholder="Enter video description"
              disabled={uploading}
            />
          </div>

          <div className="border-2 border-dashed rounded-lg p-8 text-center">
            {uploading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                <span className="ml-2">Uploading...</span>
              </div>
            ) : (
              <UploadButton<OurFileRouter, "videoUploader">
                endpoint="videoUploader"
                onUploadBegin={() => {
                  setError(null);
                  setUploading(true);
                }}
                onClientUploadComplete={handleUploadComplete}
                onUploadError={(error: Error) => {
                  console.error("❌ Upload error:", error);
                  setError(error.message);
                  setUploading(false);
                }}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
