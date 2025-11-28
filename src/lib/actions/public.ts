"use server"

import { createClient } from "@/utils/supabase/server"
import type { Repuesto, Motocarguero } from "@/types/database.types"

export async function getActiveRepuestos(): Promise<Repuesto[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("repuestos")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching active repuestos:", error)
    return []
  }

  return data || []
}

export async function getActiveMotocargueros(): Promise<Motocarguero[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("motocargueros")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching active motocargueros:", error)
    return []
  }

  return data || []
}

export async function getProductCounts(): Promise<{ repuestos: number; motocargueros: number }> {
  const supabase = await createClient()

  const [repuestosResult, motocargueroResult] = await Promise.all([
    supabase.from("repuestos").select("id", { count: "exact", head: true }),
    supabase.from("motocargueros").select("id", { count: "exact", head: true }),
  ])

  return {
    repuestos: repuestosResult.count || 0,
    motocargueros: motocargueroResult.count || 0,
  }
}
