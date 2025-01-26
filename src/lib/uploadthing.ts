import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

const f = createUploadthing();

export const ourFileRouter = {
  videoUploader: f({ video: { maxFileSize: "512MB", maxFileCount: 1 } })
    .middleware(async ({ req }) => {
      console.log("📤 UploadThing middleware starting");

      try {
        const { userId } = getAuth(req as NextRequest);
        console.log("👤 User check result:", {
          hasUser: !!userId,
          userId: userId,
        });

        if (!userId) {
          console.error("❌ No user found in middleware");
          throw new Error("Unauthorized - No user found");
        }

        console.log("✅ User authorized for upload");
        return { userId };
      } catch (error) {
        console.error("❌ Upload middleware error:", error);
        throw error;
      }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("✅ Upload completed successfully:", {
        userId: metadata.userId,
        fileUrl: file.url,
        fileKey: file.key,
      });

      return { uploadedBy: metadata.userId, url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
