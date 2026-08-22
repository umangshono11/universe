// EKKAYI Furniture Collections Data
// All images verified real high-end furniture photography

export const COLLECTIONS = [
  {
    id: "sofas",
    title: "Living Room Sofas & Recliners",
    shortTitle: "Sofas & Seating",
    year: "2025 - 2026",
    subtitle: "Chenille Bouclé, Motorized Recliners & Sectionals",
    collaborator: "EKKAYI Artisanal",
    collabLogo: "/ekkayi-logo.svg",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80",
    pdf: "#",
    description: "Contemporary living room sofas crafted in premium textured Chenille Bouclé, modular L-shape sectionals, multi-functional sofa beds, and motorized home theatre electric recliners."
  },
  {
    id: "dining",
    title: "Dining Tables & Chairs",
    shortTitle: "Dining Sanctuaries",
    year: "2025",
    subtitle: "Solid Teak Tables, Woven Cane & Leather Dining Sets",
    collaborator: "EKKAYI Atelier",
    collabLogo: "/ekkayi-logo.svg",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1000&q=80",
    pdf: "#",
    description: "Architectural 6 & 8-seater dining tables crafted from kiln-dried solid Sheesham and Grade-A Teakwood, paired with handcrafted ergonomic rattan cane dining chairs."
  },
  {
    id: "tables",
    title: "Coffee, Center & Console Tables",
    shortTitle: "Living Room Tables",
    year: "2025",
    subtitle: "Nested Wood Sets, Travertine & Media Consoles",
    collaborator: "EKKAYI Earth",
    collabLogo: "/ekkayi-logo.svg",
    image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1000&q=80",
    pdf: "#",
    description: "Organic earthen coffee tables, nested circular solid wood sets, cantilevered entryway console tables, and fluted media entertainment credenzas."
  },
  {
    id: "bedroom",
    title: "Bedroom Sanctuaries & Beds",
    shortTitle: "Bedroom Suites",
    year: "2025 - 2026",
    subtitle: "Hydraulic Storage Beds, Platform Beds & Wardrobes",
    collaborator: "EKKAYI Sanctuary",
    collabLogo: "/ekkayi-logo.svg",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80",
    pdf: "#",
    description: "Low-profile upholstered platform beds and hydraulic lift-up storage beds in King and Queen dimensions with matching fluted nightstands."
  },
  {
    id: "storage",
    title: "Storage, Credenzas & Bookcases",
    shortTitle: "Storage & Shelving",
    year: "2025",
    subtitle: "Bar Cabinets, Sideboards & Open Bookcases",
    collaborator: "EKKAYI Atelier",
    collabLogo: "/ekkayi-logo.svg",
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1000&q=80",
    pdf: "#",
    description: "Modern dining sideboards with brass hardware, dedicated bar cabinets with hanging stemware racks, and multi-tier geometric open bookcases."
  },
  {
    id: "accent",
    title: "Accent Chairs & Lounge Seating",
    shortTitle: "Accent Chairs",
    year: "2025",
    subtitle: "Wingback Armchairs, Cane Rockers & Benches",
    collaborator: "EKKAYI Atelier",
    collabLogo: "/ekkayi-logo.svg",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80",
    pdf: "#",
    description: "Statement wingback reading armchairs with ottomans, natural cane rocking chairs, and solid wood upholstered entryway benches."
  }
];

export function getCollectionById(id) {
  if (!id) return null;
  return COLLECTIONS.find(c => c.id === id || c.id.toLowerCase() === id.toLowerCase());
}
