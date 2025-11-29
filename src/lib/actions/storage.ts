"use server"

import { createClient } from "@/utils/supabase/server"

const DEFAULT_BUCKET = "products"

export async function uploadImage(
  formData: FormData,
  bucket: string = DEFAULT_BUCKET
): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    const file = formData.get("file") as File
    if (!file) {
      return { success: false, error: "No file provided" }
    }

    const supabase = await createClient()

    // Generate unique filename
    const fileExt = file.name.split(".").pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      })

    if (uploadError) {
      console.error("Upload error:", uploadError)
      return { success: false, error: uploadError.message }
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName)

    return { success: true, url: urlData.publicUrl }
  } catch (error) {
    console.error("Upload error:", error)
    return { success: false, error: "Failed to upload image" }
  }
}

export async function uploadBannerImage(
  formData: FormData
): Promise<{ success: boolean; url?: string; error?: string }> {
  return uploadImage(formData, "banners")
}

export async function deleteImage(imageUrl: string, bucket: string = DEFAULT_BUCKET): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createClient()

    // Extract filename from URL
    const urlParts = imageUrl.split("/")
    const fileName = urlParts[urlParts.length - 1]

    const { error } = await supabase.storage
      .from(bucket)
      .remove([fileName])

    if (error) {
      console.error("Delete error:", error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error("Delete error:", error)
    return { success: false, error: "Failed to delete image" }
  }
}

export async function getStorageUrl(bucket: string = DEFAULT_BUCKET): Promise<string> {
  const supabase = await createClient()
  const { data } = supabase.storage.from(bucket).getPublicUrl("")
  // Remove trailing slash and empty filename
  return data.publicUrl.replace(/\/$/, "")
}
