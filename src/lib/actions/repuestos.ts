"use server"

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import type { InsertRepuesto, UpdateRepuesto, Repuesto } from "@/types/database.types"

export async function getRepuestos(): Promise<Repuesto[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("repuestos")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching repuestos:", error)
    return []
  }

  return data || []
}

export async function getRepuesto(id: string): Promise<Repuesto | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("repuestos")
    .select("*")
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error fetching repuesto:", error)
    return null
  }

  return data
}

export async function createRepuesto(repuesto: InsertRepuesto): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()
  const { error } = await supabase
    .from("repuestos")
    .insert(repuesto)

  if (error) {
    console.error("Error creating repuesto:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/dashboard/repuestos")
  revalidatePath("/")
  return { success: true }
}

export async function updateRepuesto(id: string, repuesto: UpdateRepuesto): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()
  const { error } = await supabase
    .from("repuestos")
    .update(repuesto)
    .eq("id", id)

  if (error) {
    console.error("Error updating repuesto:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/dashboard/repuestos")
  revalidatePath("/")
  return { success: true }
}

export async function deleteRepuesto(id: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()
  const { error } = await supabase
    .from("repuestos")
    .delete()
    .eq("id", id)

  if (error) {
    console.error("Error deleting repuesto:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/dashboard/repuestos")
  revalidatePath("/")
  return { success: true }
}

export async function toggleRepuestoActive(id: string, isActive: boolean): Promise<{ success: boolean; error?: string }> {
  return updateRepuesto(id, { is_active: isActive })
}
