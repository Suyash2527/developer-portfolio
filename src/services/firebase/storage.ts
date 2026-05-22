import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

/**
 * Uploads a file to Firebase Storage and returns its public download URL.
 * @param file The file to upload
 * @param folder The target folder in Storage (e.g., "projects" or "blogs")
 * @returns Promise resolving to the download URL
 */
export async function uploadFile(file: File, folder: string): Promise<string> {
  if (!file) throw new Error("No file provided");
  
  // Create a unique filename
  const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
  const storageRef = ref(storage, `${folder}/${filename}`);

  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      () => {
        // We could track progress here if needed
      },
      (error) => {
        console.error("Upload error:", error);
        reject(error);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        } catch (err) {
          reject(err);
        }
      }
    );
  });
}
