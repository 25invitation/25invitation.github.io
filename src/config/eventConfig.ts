export interface GuestProfile {
  id: string; // Unique slug for URL: e.g. 'name-varun-tiwari'
  name: string; // Display name for RSVP: e.g. 'Varun Tiwari' or 'Varun & Shweta Tiwari'
  salutation: string; // e.g. 'Dear Varun', 'Dear Varun and Shweta', or 'Dear Tiwari Family'
  customNote?: string; // Optional custom note
}

export interface EventConfig {
  couple: {
    partner1: string;
    partner2: string;
    anniversaryYears: number;
    weddingDateYear: number;
    celebrationYear: number;
    shortBio: string;
  };
  event: {
    title: string;
    subtitle: string;
    date: string; // Human-readable date
    isoDate: string; // ISO date for countdown: YYYY-MM-DDTHH:mm:ss
    time: string;
    venueName: string;
    venueHall: string;
    address: string;
    cityStateZip: string;
    mapUrl: string;
    calendarDetails: {
      title: string;
      description: string;
      location: string;
      startTime: string; // YYYYMMDDTHHMMSSZ
      endTime: string; // YYYYMMDDTHHMMSSZ
    };
  };
  timeline: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  dressCode: {
    theme: string;
    description: string;
    suggestions: string[];
    palette: Array<{ name: string; hex: string; desc: string }>;
  };
  googleForms: {
    formActionUrl: string;
    fieldEntries: {
      guestId: string;
      guestName: string;
      attending: string;
      guestCount: string;
      phoneNumber: string;
      message: string;
    };
    isLiveEnabled: boolean;
  };
}

export const eventConfig: EventConfig = {
  couple: {
    partner1: "Kshitiz",
    partner2: "Sakshi",
    anniversaryYears: 25,
    weddingDateYear: 2001,
    celebrationYear: 2026,
    shortBio: "25 Years of Unconditional Love, Boundless Laughter, and Cherished Memories",
  },
  event: {
    title: "The Silver Jubilee Celebration",
    subtitle: "25 Years of Togetherness",
    date: "Sunday, September 6, 2026",
    isoDate: "2026-09-06T17:30:00",
    time: "5:30 PM Onwards",
    venueName: "Shubham Hall",
    venueHall: "Grand Ballroom",
    address: "341 Colbalt Way",
    cityStateZip: "Sunnyvale, CA 94085",
    mapUrl: "https://maps.google.com/?q=341+Colbalt+Way,+Sunnyvale,+CA+94085",
    calendarDetails: {
      title: "Kshitiz & Sakshi's 25th Silver Jubilee Anniversary Celebration",
      description: "Join us in celebrating 25 years of love and togetherness with Kshitiz & Sakshi! Dress code: Silver Jubilee Glam & Indian Festive.",
      location: "Shubham Hall, 341 Colbalt Way, Sunnyvale, CA 94085",
      startTime: "20260907T003000Z", // 5:30 PM PDT
      endTime: "20260907T063000Z",
    },
  },
  timeline: [
    {
      title: "Swagat & Welcome Reception",
      description: "Welcoming guests with celebratory mocktails, cocktails, and appetizers.",
      icon: "PartyPopper",
    },
    {
      title: "Milestone Toast",
      description: "Silver milestone cake cutting, and memory walkthrough.",
      icon: "Heart",
    },
    {
      title: "Sangeet & Dance Performances",
      description: "Musical tributes, special family performances, and open dance floor.",
      icon: "Music",
    },
    {
      title: "Dinner",
      description: "Dinner will be served.",
      icon: "Utensils",
    },
  ],
  dressCode: {
    theme: "Silver Jubilee Glam",
    description: "",
    suggestions: [
      "Women: Party Sarees, Lehengas, or Anarkalis (avoid pink)",
      "Men: Suits and Dinner Jackets",
    ],
    palette: [
      { name: "Pure Silver Foil", hex: "#E2E8F0", desc: "Shimmer & Sparkle" },
      { name: "Platinum Metallic", hex: "#CBD5E1", desc: "Timeless Elegance" },
      { name: "Royal Midnight Navy", hex: "#0E1224", desc: "Regal Depth" },
      { name: "Champagne Gold Accent", hex: "#E5B869", desc: "Festive Warmth" },
    ],
  },
  googleForms: {
    formActionUrl: "https://docs.google.com/forms/d/e/1FAIpQLSevVkjgEaRsltM-6H0XQxeF3skT8AD-1g0Qrzkf2fdFUVnItg/formResponse",
    fieldEntries: {
      guestId: "entry.449237194",
      guestName: "entry.1537876543",
      attending: "entry.1990115148",
      guestCount: "entry.2077372707",
      phoneNumber: "entry.PHONE_NUMBER",
      message: "entry.1521333215",
    },
    isLiveEnabled: true,
  },
};

/**
 * Extracts the first name from a full name string, ignoring common prefixes/honorifics.
 * e.g. "Varun Tiwari" -> "Varun", "Dr. Varun Tiwari" -> "Varun", "Varun" -> "Varun"
 */
export function extractFirstName(fullName: string): string {
  const trimmed = fullName.trim();
  if (!trimmed) return "";
  const parts = trimmed.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "";

  const honorifics = new Set(["dr", "dr.", "mr", "mr.", "mrs", "mrs.", "ms", "ms.", "prof", "prof.", "er", "er."]);
  if (parts.length > 1 && honorifics.has(parts[0].toLowerCase())) {
    return parts[1];
  }
  return parts[0];
}

/**
 * Parses ?name= query param
 * e.g. "?name=Varun Tiwari" ->
 *   salutation: "Dear Varun"
 *   RSVP name: "Varun Tiwari"
 */
export function parseName(nameParam: string): GuestProfile {
  const trimmed = nameParam.trim();
  const firstName = extractFirstName(trimmed);
  const salutation = firstName ? `Dear ${firstName}` : "Dear Cherished Guest";
  const slug = trimmed.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  return {
    id: `name-${slug || "guest"}`,
    name: trimmed,
    salutation,
  };
}

/**
 * Parses ?special= query param without changing its display text.
 * The supplied value is used verbatim for the envelope, greeting, and RSVP.
 */
export function parseSpecial(specialParam: string): GuestProfile {
  const slug = specialParam.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  return {
    id: `special-${slug || "guest"}`,
    name: specialParam,
    salutation: specialParam,
  };
}

/**
 * Parses ?couple= query param
 * e.g. "?couple=Varun & Shweta Tiwari" ->
 *   salutation: "Dear Varun and Shweta"
 *   RSVP name: "Varun & Shweta Tiwari"
 */
export function parseCouple(coupleParam: string): GuestProfile {
  const trimmed = coupleParam.trim();
  // Split on '&', 'and', '+', '&amp;'
  const splitRegex = /\s+(?:&|and|\+|&amp;)\s+|\s*&\s*|\s*\+\s*/i;
  const parts = trimmed.split(splitRegex).filter(Boolean);

  let salutation = `Dear ${trimmed}`;
  if (parts.length >= 2) {
    const first1 = extractFirstName(parts[0]);
    const first2 = extractFirstName(parts[1]);
    if (first1 && first2) {
      salutation = `Dear ${first1} and ${first2}`;
    }
  } else if (parts.length === 1) {
    const first = extractFirstName(parts[0]);
    if (first) {
      salutation = `Dear ${first}`;
    }
  }

  const slug = trimmed.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  return {
    id: `couple-${slug || "guests"}`,
    name: trimmed,
    salutation,
  };
}

/**
 * Parses ?family= query param
 * e.g. "?family=Tiwari" or "?family=Tiwari Family" ->
 *   salutation: "Dear Tiwari Family"
 *   RSVP name: "Tiwari Family"
 */
export function parseFamily(familyParam: string): GuestProfile {
  let cleaned = familyParam.trim();
  // Remove leading "The " if present
  cleaned = cleaned.replace(/^the\s+/i, "");
  // Remove trailing "Family" if present so we don't end up with "Tiwari Family Family"
  cleaned = cleaned.replace(/\s+family$/i, "");

  const displayName = cleaned ? `${cleaned} Family` : "Family";
  const salutation = `Dear ${displayName}`;
  const slug = displayName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  return {
    id: `family-${slug || "guests"}`,
    name: displayName,
    salutation,
  };
}

/**
 * Known query parameter keys used by this application.
 * Used to distinguish real parameter boundaries from literal '&' in values.
 */
const KNOWN_PARAM_KEYS = ["special", "couple", "family", "name"];

/**
 * Extracts the raw value of a query parameter from the URL search string,
 * tolerating unencoded '&' characters within the value.
 *
 * Standard URLSearchParams treats every '&' as a parameter separator, which
 * breaks inputs like "?couple=John & Jane Smith" (parsed as couple="John ",
 * with " Jane Smith" becoming a separate key). This helper only splits on '&'
 * when it is immediately followed by a known parameter key and '=', treating
 * all other '&' as literal parts of the value.
 *
 * @param search - The raw query string (window.location.search), e.g. "?couple=John & Jane Smith"
 * @param key    - The parameter key to extract, e.g. "couple"
 * @returns The decoded value, or null if the key is not present.
 */
export function getRawParam(search: string, key: string): string | null {
  // Strip leading '?'
  const qs = search.startsWith("?") ? search.slice(1) : search;
  if (!qs) return null;

  // Build a regex that splits only on '&' followed by a known param key and '='
  // e.g. splits on "&family=" or "&name=" but NOT on "& Jane"
  const knownBoundary = new RegExp(
    `&(?=${KNOWN_PARAM_KEYS.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})=`,
    "i"
  );
  const segments = qs.split(knownBoundary);

  for (const segment of segments) {
    const eqIdx = segment.indexOf("=");
    if (eqIdx === -1) continue;
    const segKey = segment.slice(0, eqIdx).trim();
    if (segKey.toLowerCase() === key.toLowerCase()) {
      const rawValue = segment.slice(eqIdx + 1);
      // Decode percent-encoded characters (e.g. %26 -> &, %20 -> space)
      try {
        return decodeURIComponent(rawValue);
      } catch {
        return rawValue;
      }
    }
  }

  return null;
}

/**
 * Extracts and constructs guest profile dynamically from URL search params.
 * Priority:
 * 1. ?special=
 * 2. ?couple=
 * 3. ?family=
 * 4. ?name=
 * Fallback: General invitation
 */
export function getGuestFromUrl(): GuestProfile {
  if (typeof window === "undefined") {
    return {
      id: "general",
      name: "Cherished Friends & Family",
      salutation: "Dear Cherished Guests",
      customNote: "Together with our families, we joyfully request the pleasure of your company as we celebrate 25 years of cherished love, friendship, and togetherness.",
    };
  }

  const rawSearch = window.location.search;

  // 1. Check ?special= and retain the value exactly as supplied.
  const specialParam = getRawParam(rawSearch, "special");
  if (specialParam && specialParam.trim()) {
    return parseSpecial(specialParam);
  }

  // 2. Check ?couple= (use raw parsing to handle unencoded '&')
  const coupleParam = getRawParam(rawSearch, "couple");
  if (coupleParam && coupleParam.trim()) {
    return parseCouple(coupleParam);
  }

  // 3. Check ?family=
  const familyParam = getRawParam(rawSearch, "family");
  if (familyParam && familyParam.trim()) {
    return parseFamily(familyParam);
  }

  // 4. Check ?name=
  const nameParam = getRawParam(rawSearch, "name");
  if (nameParam && nameParam.trim()) {
    return parseName(nameParam);
  }

  // Fallback: General Invitation
  return {
    id: "general",
    name: "Cherished Friends & Family",
    salutation: "Dear Cherished Guests",
    customNote: "Together with our families, we joyfully request the pleasure of your company as we celebrate 25 years of cherished love, friendship, and togetherness.",
  };
}
