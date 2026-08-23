export interface GuestProfile {
  id: string; // Unique slug for URL: e.g. 'sharma-family'
  name: string; // Display name: e.g. 'Rajesh & Anjali Sharma'
  salutation?: string; // e.g. 'Dear Uncle & Aunty' or 'Dear Rajesh & Anjali'
  customNote?: string; // Special personal message from the couple
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
    time: string;
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
      message: string;
    };
    isLiveEnabled: boolean;
  };
  guests: Record<string, GuestProfile>;
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
    isoDate: "2026-09-06T18:30:00",
    time: "6:30 PM Onwards",
    venueName: "Shubham Hall",
    venueHall: "Grand Ballroom",
    address: "1214 Apollo Way",
    cityStateZip: "Sunnyvale, CA 94085",
    mapUrl: "https://maps.google.com/?q=1214+Apollo+Way,+Sunnyvale,+CA+94085",
    calendarDetails: {
      title: "Kshitiz & Sakshi's 25th Silver Jubilee Anniversary Celebration",
      description: "Join us in celebrating 25 years of love and togetherness with Kshitiz & Sakshi! Dress code: Silver Jubilee Glam & Indian Festive.",
      location: "Shubham Hall, 1214 Apollo Way, Sunnyvale, CA 94085",
      startTime: "20260907T013000Z", // 6:30 PM PDT
      endTime: "20260907T063000Z",
    },
  },
  timeline: [
    {
      time: "6:30 PM",
      title: "Swagat & Welcome Reception",
      description: "Welcoming guests with celebratory mocktails, traditional music, and appetizers.",
      icon: "PartyPopper",
    },
    {
      time: "7:30 PM",
      title: "Silver Vows & Milestone Toast",
      description: "Renewal of vows, silver milestone cake cutting, and memory walkthrough.",
      icon: "Heart",
    },
    {
      time: "8:15 PM",
      title: "Sangeet & Dance Performances",
      description: "Musical tributes, special family performances, and open dance floor.",
      icon: "Music",
    },
    {
      time: "9:15 PM",
      title: "Shahi Dawat (Celebration Dinner)",
      description: "A lavish Indian banquet feast featuring signature regional delicacies and desserts.",
      icon: "Utensils",
    },
  ],
  dressCode: {
    theme: "Silver Jubilee Glam & Indian Festive",
    description: "Embrace the sparkle! Shimmering silvers, metallic accents, festive sarees, sherwanis, and Indo-Western attire.",
    suggestions: [
      "Women: Silver or Metallic Sarees, Lehengas, Sequinned Anarkalis, or Elegant Evening Wear",
      "Men: Bandhgalas, Embroidered Kurtas with Silver Accents, or Suits",
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
      message: "entry.1521333215",
    },
    isLiveEnabled: true,
  },
  guests: {
    "sharma-family": {
      id: "sharma-family",
      name: "Rajesh & Anjali Sharma",
      salutation: "Dear Rajesh & Anjali",
      customNote: "Our 25-year milestone would not be complete without our dearest friends by our side! We can't wait to celebrate with you.",
    },
    "kapoor-couple": {
      id: "kapoor-couple",
      name: "Dr. Vikram & Neha Kapoor",
      salutation: "Dear Vikram & Neha",
      customNote: "From 25 years ago to today, thank you for sharing this beautiful journey with us!",
    },
    "gupta-family": {
      id: "gupta-family",
      name: "Sanjay & Meenakshi Gupta & Family",
      salutation: "Dear Sanjay, Meenakshi & Kids",
      customNote: "We are thrilled to celebrate this special evening surrounded by your love and warmth.",
    },
    "patel-couple": {
      id: "patel-couple",
      name: "Karan & Pooja Patel",
      salutation: "Dear Karan & Pooja",
      customNote: "Looking forward to creating more unforgettable memories together on our Silver Jubilee!",
    },
    "verma-family": {
      id: "verma-family",
      name: "Sunil & Ritu Verma",
      salutation: "Dear Sunil & Ritu",
      customNote: "Your presence and blessings will make our silver celebration truly special and complete.",
    },
    "vip-guest": {
      id: "vip-guest",
      name: "Special Guests & Family",
      salutation: "Dear Honored Guests",
      customNote: "We cordially invite you to celebrate 25 years of love and companionship with us.",
    }
  },
};

export function getGuestFromUrl(): GuestProfile {
  if (typeof window === "undefined") {
    return {
      id: "general",
      name: "Cherished Friends & Family",
      salutation: "Dear Cherished Guests",
    };
  }

  const searchParams = new URLSearchParams(window.location.search);
  const guestParam = searchParams.get("guest") || searchParams.get("id") || searchParams.get("g");

  if (guestParam && eventConfig.guests[guestParam]) {
    return eventConfig.guests[guestParam];
  }

  const customNameParam = searchParams.get("name");
  if (customNameParam) {
    return {
      id: "custom-" + encodeURIComponent(customNameParam.toLowerCase().replace(/\s+/g, "-")),
      name: customNameParam,
      salutation: `Dear ${customNameParam}`,
    };
  }

  const hash = window.location.hash.replace(/^#/, "");
  if (hash && eventConfig.guests[hash]) {
    return eventConfig.guests[hash];
  }

  return {
    id: "general",
    name: "Cherished Friends & Family",
    salutation: "Dear Cherished Guests",
    customNote: "We request the honor of your presence to celebrate 25 years of love, laughter, and lifelong memories.",
  };
}
