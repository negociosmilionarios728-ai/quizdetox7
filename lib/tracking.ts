const TRACKING_PARAM_KEYS = [
  "utm_source",
  "utm_campaign",
  "utm_medium",
  "utm_content",
  "utm_term",
  "utm_id",
  "fbclid",
  "fbc",
  "fbp",
  "src",
  "sck",
  "xcod",
  "ttclid",
] as const

const STORAGE_KEY = "reset30dias_tracking_params"
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 90

type TrackingKey = (typeof TRACKING_PARAM_KEYS)[number]
type TrackingParams = Partial<Record<TrackingKey, string>>

function isBrowser() {
  return typeof window !== "undefined"
}

function normalizeValue(value: string | null) {
  if (!value) return null

  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : null
}

function readBrowserCookies() {
  if (!isBrowser()) return new Map<string, string>()

  return document.cookie.split(";").reduce((acc, rawCookie) => {
    const [rawName, ...rawValueParts] = rawCookie.trim().split("=")
    if (!rawName) return acc

    acc.set(rawName, rawValueParts.join("="))
    return acc
  }, new Map<string, string>())
}

function setTrackingCookie(name: TrackingKey, value: string) {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${COOKIE_MAX_AGE_SECONDS}; SameSite=Lax`
}

function readStoredTrackingParams() {
  if (!isBrowser()) return {}

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}

    const parsed = JSON.parse(raw) as Record<string, unknown>
    const entries = Object.entries(parsed).filter(
      ([key, value]) => TRACKING_PARAM_KEYS.includes(key as TrackingKey) && typeof value === "string" && value.length > 0
    )

    return Object.fromEntries(entries) as TrackingParams
  } catch {
    return {}
  }
}

function writeStoredTrackingParams(params: TrackingParams) {
  if (!isBrowser()) return

  const sanitizedEntries = Object.entries(params).filter(
    ([key, value]) => TRACKING_PARAM_KEYS.includes(key as TrackingKey) && typeof value === "string" && value.length > 0
  )

  if (sanitizedEntries.length === 0) return

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(Object.fromEntries(sanitizedEntries)))
}

function buildFbcFromFbclid(fbclid: string) {
  const creationTime = Date.now()
  return `fb.1.${creationTime}.${fbclid}`
}

export function captureTrackingParamsFromLocation() {
  if (!isBrowser()) return {}

  const searchParams = new URLSearchParams(window.location.search)
  const cookieValues = readBrowserCookies()
  const storedValues = readStoredTrackingParams()
  const nextValues: TrackingParams = {}

  for (const key of TRACKING_PARAM_KEYS) {
    const value =
      normalizeValue(searchParams.get(key)) ??
      normalizeValue(storedValues[key] ?? null) ??
      normalizeValue(cookieValues.get(key) ?? null)

    if (value) {
      nextValues[key] = value
    }
  }

  if (!nextValues.fbc && nextValues.fbclid) {
    nextValues.fbc = buildFbcFromFbclid(nextValues.fbclid)
  }

  if (!nextValues.fbp) {
    const browserFbp = normalizeValue(cookieValues.get("_fbp") ?? null)
    if (browserFbp) {
      nextValues.fbp = browserFbp
    }
  }

  writeStoredTrackingParams(nextValues)

  for (const [key, value] of Object.entries(nextValues) as Array<[TrackingKey, string]>) {
    setTrackingCookie(key, value)
  }

  return nextValues
}

export function buildCheckoutUrl(baseUrl: string) {
  if (!isBrowser()) return baseUrl

  const checkoutUrl = new URL(baseUrl)
  const currentParams = new URLSearchParams(window.location.search)
  const storedParams = captureTrackingParamsFromLocation()

  for (const key of TRACKING_PARAM_KEYS) {
    const currentValue = normalizeValue(currentParams.get(key))
    const storedValue = normalizeValue(storedParams[key] ?? null)
    const value = currentValue ?? storedValue

    if (value) {
      checkoutUrl.searchParams.set(key, value)
    }
  }

  return checkoutUrl.toString()
}
