"use client"

import { useEffect } from "react"
import { captureTrackingParamsFromLocation } from "@/lib/tracking"

export function TrackingBootstrap() {
  useEffect(() => {
    captureTrackingParamsFromLocation()
  }, [])

  return null
}
