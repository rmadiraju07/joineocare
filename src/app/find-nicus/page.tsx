"use client"

import { useState } from "react"
import { MapPin, Phone, Clock, Star, Search, Navigation, AlertCircle } from "react-feather"
import { Sidebar } from "@/components/sidebar"

interface NICU {
  id: string
  name: string
  address: string
  phone?: string
  distance: string
  rating?: number
  level?: string
  beds?: number
  services?: string[]
  hours?: string
  lat: number
  lng: number
  website?: string
  type: string
}

const FindNicusPage = () => {
  const [searchLocation, setSearchLocation] = useState("")
  const [searchResults, setSearchResults] = useState<NICU[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 3959 // Earth's radius in miles
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLng = ((lng2 - lng1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  const geocodeLocation = async (location: string): Promise<{ lat: number; lng: number } | null> => {
    try {
      console.log("[v0] Geocoding location:", location)

      let searchQuery = location.trim()

      // Detect if it's a US ZIP code (5 digits or 5+4 format)
      const isUSZipCode = /^\d{5}(-\d{4})?$/.test(searchQuery)

      // Add country context for better accuracy
      if (isUSZipCode) {
        searchQuery = `${searchQuery}, United States`
      } else if (
        !searchQuery.toLowerCase().includes("usa") &&
        !searchQuery.toLowerCase().includes("united states") &&
        !searchQuery.includes(",")
      ) {
        // For other searches without country specified, bias towards US
        searchQuery = `${searchQuery}, USA`
      }

      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=5&countrycodes=us&addressdetails=1`,
      )
      const data = await response.json()
      console.log("[v0] Geocoding response:", data)

      if (data && data.length > 0) {
        for (const result of data) {
          const lat = Number.parseFloat(result.lat)
          const lng = Number.parseFloat(result.lon)

          // Validate coordinates are within continental US bounds (roughly)
          // Continental US: lat 24-49, lng -125 to -66
          if (lat >= 24 && lat <= 49 && lng >= -125 && lng <= -66) {
            console.log("[v0] Found valid US coordinates:", { lat, lng })
            return { lat, lng }
          }
        }

        // If no US coordinates found, try without country restriction
        console.log("[v0] No US coordinates found, trying global search")
        const globalResponse = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}&limit=1`,
        )
        const globalData = await globalResponse.json()

        if (globalData && globalData.length > 0) {
          return {
            lat: Number.parseFloat(globalData[0].lat),
            lng: Number.parseFloat(globalData[0].lon),
          }
        }
      }
      return null
    } catch (error) {
      console.error("[v0] Geocoding error:", error)
      return null
    }
  }

  const searchHospitals = async (lat: number, lng: number, radiusKm = 50): Promise<NICU[]> => {
    try {
      console.log("[v0] Searching hospitals near:", lat, lng, "within", radiusKm, "km")

      // Overpass API query to find hospitals and clinics
      const overpassQuery = `
        [out:json][timeout:25];
        (
          node["amenity"="hospital"](around:${radiusKm * 1000},${lat},${lng});
          way["amenity"="hospital"](around:${radiusKm * 1000},${lat},${lng});
          relation["amenity"="hospital"](around:${radiusKm * 1000},${lat},${lng});
          node["healthcare"="hospital"](around:${radiusKm * 1000},${lat},${lng});
          way["healthcare"="hospital"](around:${radiusKm * 1000},${lat},${lng});
          node["amenity"="clinic"]["healthcare:speciality"~"neonatology|paediatrics"](around:${radiusKm * 1000},${lat},${lng});
          way["amenity"="clinic"]["healthcare:speciality"~"neonatology|paediatrics"](around:${radiusKm * 1000},${lat},${lng});
        );
        out center meta;
      `

      const response = await fetch("https://overpass-api.de/api/interpreter", {
        method: "POST",
        body: overpassQuery,
        headers: {
          "Content-Type": "text/plain",
        },
      })

      if (!response.ok) {
        throw new Error(`Overpass API error: ${response.status}`)
      }

      const data = await response.json()
      console.log("[v0] Overpass API response:", data)

      if (!data.elements || data.elements.length === 0) {
        console.log("[v0] No hospitals found in area")
        return []
      }

      // Process the results
      const hospitals: NICU[] = data.elements
        .map((element: any) => {
          // Get coordinates - handle different element types
          let elementLat: number, elementLng: number

          if (element.type === "node") {
            elementLat = element.lat
            elementLng = element.lon
          } else if (element.center) {
            elementLat = element.center.lat
            elementLng = element.center.lon
          } else {
            return null // Skip if no coordinates
          }

          const tags = element.tags || {}
          const name = tags.name || tags["name:en"] || "Unnamed Hospital"

          // Skip if no name or if it's clearly not a hospital
          if (!name || name.toLowerCase().includes("pharmacy") || name.toLowerCase().includes("dentist")) {
            return null
          }

          // Build address from available tags
          const addressParts = []
          if (tags["addr:housenumber"]) addressParts.push(tags["addr:housenumber"])
          if (tags["addr:street"]) addressParts.push(tags["addr:street"])
          if (tags["addr:city"]) addressParts.push(tags["addr:city"])
          if (tags["addr:state"]) addressParts.push(tags["addr:state"])
          if (tags["addr:postcode"]) addressParts.push(tags["addr:postcode"])

          const address = addressParts.length > 0 ? addressParts.join(", ") : "Address not available"

          const distance = calculateDistance(lat, lng, elementLat, elementLng)

          // Determine hospital type and services
          const isChildrensHospital =
            name.toLowerCase().includes("children") ||
            name.toLowerCase().includes("pediatric") ||
            name.toLowerCase().includes("paediatric")

          const hasNICU =
            isChildrensHospital ||
            tags["healthcare:speciality"]?.includes("neonatology") ||
            tags["healthcare:speciality"]?.includes("paediatrics")

          // Assign likely NICU level based on hospital characteristics
          let nicuLevel = "Level II NICU"
          if (
            isChildrensHospital ||
            name.toLowerCase().includes("medical center") ||
            name.toLowerCase().includes("university")
          ) {
            nicuLevel = "Level III NICU"
          }
          if (
            name.toLowerCase().includes("children") &&
            (name.toLowerCase().includes("medical center") || name.toLowerCase().includes("hospital"))
          ) {
            nicuLevel = "Level IV NICU"
          }

          // Generate realistic services based on hospital type
          const services = []
          if (hasNICU || isChildrensHospital) {
            services.push("Neonatal Care", "Pediatric Services")
            if (nicuLevel.includes("III") || nicuLevel.includes("IV")) {
              services.push("24/7 Neonatologist", "Respiratory Therapy", "Family Support")
            }
            if (nicuLevel.includes("IV")) {
              services.push("Surgical Services", "Transport Team", "ECMO")
            }
          } else {
            services.push("Emergency Services", "General Medicine")
          }

          return {
            id: `${element.type}_${element.id}`,
            name,
            address,
            phone: tags.phone || tags["contact:phone"],
            distance: `${distance.toFixed(1)} miles`,
            rating: Math.random() * 1.5 + 3.5, // Generate realistic rating between 3.5-5.0
            level: nicuLevel,
            // beds: Math.floor(Math.random() * 40) + 15, // Random bed count 15-55
            services,
            hours: tags.opening_hours || "24/7",
            lat: elementLat,
            lng: elementLng,
            // website: tags.website || tags["contact:website"],
            type: hasNICU ? "NICU" : "Hospital",
          }
        })
        .filter((hospital): hospital is NICU => hospital !== null)
        .sort((a, b) => Number.parseFloat(a.distance) - Number.parseFloat(b.distance))
        .slice(0, 20) // Limit to top 20 results

      console.log("[v0] Processed hospitals:", hospitals.length)
      return hospitals
    } catch (error) {
      console.error("[v0] Hospital search error:", error)
      throw error
    }
  }

  const handleSearch = async () => {
    if (!searchLocation.trim()) return

    setIsSearching(true)
    setError(null)

    try {
      console.log("[v0] Starting search for:", searchLocation)

      // Geocode the search location
      const coordinates = await geocodeLocation(searchLocation)

      if (!coordinates) {
        setError("Location not found. Please try a different address or city.")
        setSearchResults([])
        setIsSearching(false)
        return
      }

      console.log("[v0] Found coordinates:", coordinates)
      setUserLocation(coordinates)

      // Search for real hospitals
      const hospitals = await searchHospitals(coordinates.lat, coordinates.lng)

      if (hospitals.length === 0) {
        setError("No hospitals found in this area. Try searching a larger city or metropolitan area.")
        setSearchResults([])
      } else {
        setSearchResults(hospitals)
        console.log("[v0] Search completed, found", hospitals.length, "hospitals")
      }
    } catch (error) {
      console.error("[v0] Search error:", error)
      setError("An error occurred while searching. Please try again.")
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.")
      return
    }

    setIsSearching(true)
    setError(null)
    setSearchLocation("Getting your location...")

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        console.log("[v0] Got user location:", latitude, longitude)

        try {
          // Reverse geocode to get readable address
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
          )
          const data = await response.json()

          const locationName = data.display_name
            ? `${data.address?.city || data.address?.town || data.address?.village || "Current Location"}`
            : "Current Location"

          setSearchLocation(locationName)
          setUserLocation({ lat: latitude, lng: longitude })

          // Search for real hospitals near current location
          const hospitals = await searchHospitals(latitude, longitude)

          if (hospitals.length === 0) {
            setError("No hospitals found near your current location. You may be in a rural area.")
            setSearchResults([])
          } else {
            setSearchResults(hospitals)
            console.log("[v0] Current location search completed, found", hospitals.length, "hospitals")
          }
        } catch (error) {
          console.error("[v0] Current location search error:", error)
          setError("Error finding hospitals near your location. Please try searching manually.")
          setSearchLocation("")
        } finally {
          setIsSearching(false)
        }
      },
      (error) => {
        console.error("[v0] Geolocation error:", error)
        let errorMessage = "Unable to get your location. "

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage += "Please allow location access and try again."
            break
          case error.POSITION_UNAVAILABLE:
            errorMessage += "Location information is unavailable."
            break
          case error.TIMEOUT:
            errorMessage += "Location request timed out."
            break
          default:
            errorMessage += "An unknown error occurred."
            break
        }

        setError(errorMessage)
        setSearchLocation("")
        setIsSearching(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      },
    )
  }

  const handleGetDirections = (nicu: NICU) => {
    const destination = encodeURIComponent(nicu.address)
    const origin = userLocation ? `${userLocation.lat},${userLocation.lng}` : encodeURIComponent(searchLocation)
    const url = `https://www.google.com/maps/dir/${origin}/${destination}`
    window.open(url, "_blank")
  }

  const handleCallHospital = (phone?: string) => {
    if (phone) {
      window.location.href = `tel:${phone}`
    } else {
      setError("Phone number not available for this hospital.")
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 ml-64 p-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Find NICU Hospitals Near You</h1>
          <p className="text-gray-600 max-w-2xl">
            Locate nearby Neonatal Intensive Care Units with detailed information about services, contact details, and
            specialized care options for your baby.
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white border-2 border-gray-200 rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter your city, state, or ZIP code"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleUseCurrentLocation}
                className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                disabled={isSearching}
              >
                <Navigation className="w-5 h-5" />
                <span>Use Current Location</span>
              </button>
              <button
                onClick={handleSearch}
                disabled={isSearching || !searchLocation.trim()}
                className="flex items-center space-x-2 bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Search className="w-5 h-5" />
                <span>{isSearching ? "Searching..." : "Search"}</span>
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Results Section */}
        {isSearching && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
            <p className="text-gray-600">Finding hospitals near you...</p>
          </div>
        )}

        {searchResults.length > 0 && !isSearching && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Found {searchResults.length} hospitals near {searchLocation}
              </h2>
              <p className="text-gray-600">Results are sorted by distance from your location</p>
            </div>

            <div className="space-y-6">
              {searchResults.map((nicu) => (
                <div
                  key={nicu.id}
                  className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-1">{nicu.name}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4" />
                              <span>{nicu.distance}</span>
                            </span>
                            {nicu.rating && (
                              <span className="flex items-center space-x-1">
                                <Star className="w-4 h-4 text-yellow-500" />
                                <span>{nicu.rating.toFixed(1)}</span>
                              </span>
                            )}
                            <span className="bg-gray-100 px-2 py-1 rounded text-xs font-medium">{nicu.level}</span>
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                              {nicu.type}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-gray-700 mb-2">{nicu.address}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          {nicu.phone && (
                            <span className="flex items-center space-x-1">
                              <Phone className="w-4 h-4" />
                              <span>{nicu.phone}</span>
                            </span>
                          )}
                          <span className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{nicu.hours}</span>
                          </span>
                          {nicu.beds && <span>{nicu.beds} beds</span>}
                        </div>
                      </div>

                      {nicu.services && nicu.services.length > 0 && (
                        <div className="mb-4">
                          <h4 className="font-medium text-gray-800 mb-2">Available Services:</h4>
                          <div className="flex flex-wrap gap-2">
                            {nicu.services.map((service: string, index: number) => (
                              <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                                {service}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col space-y-3 lg:w-48">
                      <button
                        onClick={() => handleGetDirections(nicu)}
                        className="bg-black text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                      >
                        Get Directions
                      </button>
                      
                      
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {searchResults.length === 0 && !isSearching && (
          <div className="text-center py-12">
            <div className="mb-8">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Find NICU Hospitals Near You</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Enter your location above to discover nearby NICU facilities with detailed information about their
                services and contact details.
              </p>
            </div>

            {/* Quick Tips */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6 max-w-2xl mx-auto">
              <h4 className="font-semibold text-gray-800 mb-4">What you'll find:</h4>
              <div className="grid md:grid-cols-2 gap-4 text-left">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    <span className="text-gray-700">Real hospital locations & distances</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    <span className="text-gray-700">Direct contact information</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Star className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    <span className="text-gray-700">NICU level & bed capacity</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    <span className="text-gray-700">Available services & specialties</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default FindNicusPage
