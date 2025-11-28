"use server"

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import type { InsertMotocarguero, UpdateMotocarguero, Motocarguero } from "@/types/database.types"

export async function getMotocargueros(): Promise<Motocarguero[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("motocargueros")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching motocargueros:", error)
    return []
  }

  return data || []
}

export async function getMotocarguero(id: string): Promise<Motocarguero | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("motocargueros")
    .select("*")
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error fetching motocarguero:", error)
    return null
  }

  return data
}

export async function createMotocarguero(motocarguero: InsertMotocarguero): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()
  const { error } = await supabase
    .from("motocargueros")
    .insert(motocarguero)

  if (error) {
    console.error("Error creating motocarguero:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/dashboard/motocargueros")
  revalidatePath("/")
  return { success: true }
}

export async function updateMotocarguero(id: string, motocarguero: UpdateMotocarguero): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()
  const { error } = await supabase
    .from("motocargueros")
    .update(motocarguero)
    .eq("id", id)

  if (error) {
    console.error("Error updating motocarguero:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/dashboard/motocargueros")
  revalidatePath("/")
  return { success: true }
}

export async function deleteMotocarguero(id: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()
  const { error } = await supabase
    .from("motocargueros")
    .delete()
    .eq("id", id)

  if (error) {
    console.error("Error deleting motocarguero:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/dashboard/motocargueros")
  revalidatePath("/")
  return { success: true }
}

export async function toggleMotocargueroActive(id: string, isActive: boolean): Promise<{ success: boolean; error?: string }> {
  return updateMotocarguero(id, { is_active: isActive })
}
