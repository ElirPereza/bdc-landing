"use server"

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import type { InsertBannerImage, UpdateBannerImage, BannerImage } from "@/types/database.types"

export async function getBannerImages(): Promise<BannerImage[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("banner_images")
    .select("*")
    .order("display_order", { ascending: true })

  if (error) {
    console.error("Error fetching banner images:", error)
    return []
  }

  return data || []
}

export async function getActiveBannerImages(): Promise<BannerImage[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("banner_images")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true })

  if (error) {
    console.error("Error fetching active banner images:", error)
    return []
  }

  return data || []
}

export async function createBannerImage(banner: InsertBannerImage): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()
  const { error } = await supabase
    .from("banner_images")
    .insert(banner)

  if (error) {
    console.error("Error creating banner image:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/dashboard/banner")
  revalidatePath("/")
  return { success: true }
}

export async function updateBannerImage(id: string, banner: UpdateBannerImage): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()
  const { error } = await supabase
    .from("banner_images")
    .update(banner)
    .eq("id", id)

  if (error) {
    console.error("Error updating banner image:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/dashboard/banner")
  revalidatePath("/")
  return { success: true }
}

export async function deleteBannerImage(id: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()
  const { error } = await supabase
    .from("banner_images")
    .delete()
    .eq("id", id)

  if (error) {
    console.error("Error deleting banner image:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/dashboard/banner")
  revalidatePath("/")
  return { success: true }
}

export async function reorderBannerImages(orderedIds: string[]): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()

  // Update each banner with its new order
  for (let i = 0; i < orderedIds.length; i++) {
    const { error } = await supabase
      .from("banner_images")
      .update({ display_order: i })
      .eq("id", orderedIds[i])

    if (error) {
      console.error("Error reordering banner images:", error)
      return { success: false, error: error.message }
    }
  }

  revalidatePath("/dashboard/banner")
  revalidatePath("/")
  return { success: true }
}
