// EKKAYI Complete Luxury Furniture Catalog
// Sourced from HomeTown.in & Indian Luxury Contemporary Living
// Brand: EKKAYI (Forest Green #2D4C3A, Charred Black #0A0A0A, Terracotta #AC6644, Sand #DAC8B1, Parchment #F0E8DD)

export const MARBLE_SWATCHES = [
  { name: "Banswara White", src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80", color: "#f5f5f0" },
  { name: "Indian Black Bheslana", src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=400&q=80", color: "#1a1a1a" },
  { name: "Indian Rosso Levante", src: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=400&q=80", color: "#542426" },
  { name: "Italian Beige Travertine", src: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=400&q=80", color: "#d6c5a5" },
  { name: "Spider Green", src: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=400&q=80", color: "#1b3323" }
];

export const FABRIC_SWATCHES = [
  { name: "EKKAYI Forest Green", src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80", color: "#2D4C3A" },
  { name: "Terracotta Clay", src: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=400&q=80", color: "#AC6644" },
  { name: "Unbleached Sand", src: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=400&q=80", color: "#DAC8B1" },
  { name: "Charred Black", src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=400&q=80", color: "#0A0A0A" },
  { name: "Soft Parchment Bouclé", src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80", color: "#F0E8DD" }
];

export const PRODUCTS = [
  // =================== 1. LIVING ROOM SOFAS & RECLINERS ===================
  {
    _id: { $oid: "ekkayi-liora-3s-recliner" },
    id: "liora-3-seater-electric-recliner-sofa",
    title: "Liora 3 Seater Electric Recliner Sofa",
    group: "sofas",
    groupName: "Living Room Sofas",
    price: 74900,
    priceFormatted: "₹74,900",
    originalPrice: "₹109,990",
    discount: "32% OFF",
    rating: 4.8,
    reviewsCount: 126,
    material: "Ultra-Soft Suede Fabric & Kiln-Dried Hardwood",
    leadTime: "12 - 15 Days",
    warranty: "3 Years",
    seatingCapacity: "3 SEATER (DUAL POWER RECLINER)",
    dimensions: "W 198 x D 95 x H 102 cm",
    upholstery: "Ultra-Soft Suede Fabric",
    foamType: "High Resilience Foam",
    frameMaterial: "Kiln-Dried Hardwood",
    reclinerMechanism: "Dual Motorized",
    usbPorts: "2 Fast-Charging Ports",
    care: "Easy to Clean",
    description: `Cinema-grade luxury in your living room. The Liora 3-Seater Electric Recliner features dual whisper-quiet motorized mechanisms with integrated USB fast-charging ports.

Multi-tier padded headrests and overstuffed armrests offer zero-gravity pressure relief, upholstered in stain-resistant velvet suede fabric.`,
    images: [
      { filePath: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80", fileName: "Liora Main View" },
      { filePath: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80", fileName: "Liora Living Room Angle" },
      { filePath: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80", fileName: "Liora Front View" },
      { filePath: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80", fileName: "Liora Cushion Detail" },
      { filePath: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80", fileName: "Liora Side Profile" },
      { filePath: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80", fileName: "Liora Sanctuary Context" }
    ]
  },
  {
    _id: { $oid: "ekkayi-hazel-3s" },
    id: "hazel-3-seater-sofa",
    title: "Hazel Fabric 3 Seater Sofa",
    group: "sofas",
    groupName: "Living Room Sofas",
    price: 34900,
    priceFormatted: "₹34,900",
    originalPrice: "₹49,990",
    discount: "30% OFF",
    material: "Chenille Bouclé Fabric & Kiln-Dried Hardwood",
    leadTime: "7 - 10 Days",
    seatingCapacity: "3 Seater",
    collabtext: "HomeTown × EKKAYI",
    collablink: "https://www.hometown.in/",
    pdf: "#",
    dimensions: "82\" W x 35\" D x 34\" H (2080 x 890 x 865 mm)",
    description: `A sophisticated, contemporary 3-seater sofa crafted in premium textured Chenille Bouclé upholstery.
    
Engineered with high-density 32-density foam cushions and a reinforced zig-zag spring suspension system to provide long-lasting ergonomic lumbar support and plush sink-in comfort.

Solid kiln-dried hardwood internal frame with anti-termite treatment, designed specifically for modern Indian living rooms.`,
    images: [
      { filePath: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80", fileName: "Hazel 3 Seater Main" },
      { filePath: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1000&q=80", fileName: "Hazel 3 Seater Angle" }
    ]
  },
  {
    _id: { $oid: "ekkayi-hazel-2s" },
    id: "hazel-2-seater-sofa",
    title: "Hazel Fabric 2 Seater Loveseat",
    group: "sofas",
    groupName: "Living Room Sofas",
    price: 27900,
    priceFormatted: "₹27,900",
    originalPrice: "₹38,990",
    discount: "28% OFF",
    material: "Chenille Bouclé & Solid Oak Base",
    leadTime: "7 - 10 Days",
    seatingCapacity: "2 Seater",
    collabtext: "HomeTown × EKKAYI",
    collablink: "https://www.hometown.in/",
    pdf: "#",
    dimensions: "60\" W x 35\" D x 34\" H (1520 x 890 x 865 mm)",
    description: `Compact luxury crafted for cozy corners and urban living spaces. The Hazel 2-Seater pairs the warmth of textured Bouclé fabric with minimalist clean geometry.

Features high-resilience foam core, pocket spring seats, and sturdy tapered timber legs designed for easy robotic vacuum cleaning.`,
    images: [
      { filePath: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80", fileName: "Hazel 2 Seater Front" },
      { filePath: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80", fileName: "Hazel 2 Seater Detail" }
    ]
  },
  {
    _id: { $oid: "ekkayi-valencia-sectional" },
    id: "valencia-l-shape-sectional-sofa",
    title: "Valencia L-Shape Corner Sectional Sofa",
    group: "sofas",
    groupName: "Living Room Sofas",
    price: 54900,
    priceFormatted: "₹54,900",
    originalPrice: "₹79,990",
    discount: "31% OFF",
    material: "Textured Jute Weave & Seasoned Sal Wood Frame",
    leadTime: "10 - 14 Days",
    seatingCapacity: "5 Seater L-Shape",
    collabtext: "HomeTown × EKKAYI",
    collablink: "https://www.hometown.in/",
    pdf: "#",
    dimensions: "108\" W x 68\" Chaise Depth x 35\" H",
    description: `An expansive 5-seater corner sectional sofa designed for generous family entertaining. Reversible chaise configuration allows left or right corner placement according to your floor plan.

Multi-density layered foam with feather-blend toppers ensures superior sink-in relaxation.`,
    images: [
      { filePath: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1000&q=80", fileName: "Valencia Sectional Main" },
      { filePath: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80", fileName: "Valencia Sectional Living Room" }
    ]
  },
  {
    _id: { $oid: "ekkayi-liora-3s" },
    id: "liora-3-seater-electric-recliner",
    title: "Liora 3 Seater Electric Recliner Sofa",
    group: "sofas",
    groupName: "Living Room Sofas",
    price: 74900,
    priceFormatted: "₹74,900",
    originalPrice: "₹109,990",
    discount: "32% OFF",
    material: "Ultra-Soft Suede Fabric & German Dual Motors",
    leadTime: "12 - 15 Days",
    seatingCapacity: "3 Seater (Dual Power Recliner)",
    collabtext: "HomeTown × EKKAYI",
    collablink: "https://www.hometown.in/",
    pdf: "#",
    dimensions: "86\" W x 38\" D x 40\" H",
    description: `Cinema-grade luxury in your living room. The Liora 3-Seater Electric Recliner features dual whisper-quiet motorized mechanisms with integrated USB fast-charging ports.

Multi-tier padded headrests and overstuffed armrests offer zero-gravity pressure relief, upholstered in stain-resistant velvet suede fabric.`,
    images: [
      { filePath: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1000&q=80", fileName: "Liora 3 Seater Recliner" },
      { filePath: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80", fileName: "Liora Reclined Angle" }
    ]
  },
  {
    _id: { $oid: "ekkayi-liora-2s" },
    id: "liora-2-seater-recliner-console",
    title: "Liora 2 Seater Home Theatre Recliner with Console",
    group: "sofas",
    groupName: "Living Room Sofas",
    price: 59900,
    priceFormatted: "₹59,900",
    originalPrice: "₹84,990",
    discount: "29% OFF",
    material: "Velvet Suede, Central Storage & Cup Holders",
    leadTime: "10 - 14 Days",
    seatingCapacity: "2 Seater with Console",
    collabtext: "HomeTown × EKKAYI",
    collablink: "https://www.hometown.in/",
    pdf: "#",
    dimensions: "74\" W x 38\" D x 40\" H",
    description: `The ultimate couple home theatre setup. Includes a central storage console with soft-close lid, hidden storage for remotes, twin stainless steel cup holders, and dual motorized power recliners.`,
    images: [
      { filePath: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1000&q=80", fileName: "Liora 2 Seater Console" },
      { filePath: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80", fileName: "Liora Recliner Angle" }
    ]
  },
  {
    _id: { $oid: "ekkayi-riga-3s" },
    id: "riga-3-seater-sofa",
    title: "Riga Modern 3 Seater Sofa",
    group: "sofas",
    groupName: "Living Room Sofas",
    price: 29900,
    priceFormatted: "₹29,900",
    originalPrice: "₹42,990",
    discount: "30% OFF",
    material: "High-Tensile Polyester & S-Spring Base",
    leadTime: "7 - 10 Days",
    seatingCapacity: "3 Seater",
    collabtext: "HomeTown × EKKAYI",
    collablink: "https://www.hometown.in/",
    pdf: "#",
    dimensions: "80\" W x 34\" D x 35\" H (2030 x 865 x 890 mm)",
    description: `Clean Scandinavian lines meet everyday practicality. The Riga 3-Seater Sofa features subtle button-tufted backrest detailing and gently rounded track arms.

Upholstered in breathable, fade-resistant polyester fabric that stays cool in all seasons, supported by an S-spring suspension system.`,
    images: [
      { filePath: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1000&q=80", fileName: "Riga 3 Seater Front" },
      { filePath: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80", fileName: "Riga 3 Seater Studio" }
    ]
  },
  {
    _id: { $oid: "ekkayi-lavista-sb" },
    id: "lavista-sofa-bed",
    title: "Lavista Multi-Functional Sofa Cum Bed",
    group: "sofas",
    groupName: "Living Room Sofas",
    price: 39900,
    priceFormatted: "₹39,900",
    originalPrice: "₹59,990",
    discount: "33% OFF",
    material: "Solid Wood Box Frame & 40D Orthopedic Foam",
    leadTime: "10 - 12 Days",
    seatingCapacity: "3 Seater (Converts to Queen Bed)",
    collabtext: "HomeTown × EKKAYI",
    collablink: "https://www.hometown.in/",
    pdf: "#",
    dimensions: "84\" W x 38\" D x 36\" H (Converts to 84\" x 60\" Queen Bed)",
    description: `The ultimate multi-functional transformer for modern living. Effortlessly transitions from a generous 3-seater sofa into a supportive queen-size guest bed in seconds.

Built with an integrated reinforced solid wood box storage base for pillows and duvets, topped with 40-density 50mm orthopedic grade foam cushions.`,
    images: [
      { filePath: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=1000&q=80", fileName: "Lavista Sofa Bed Closed" },
      { filePath: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80", fileName: "Lavista Bed Open" }
    ]
  },
  {
    _id: { $oid: "ekkayi-stella-chesterfield" },
    id: "stella-velvet-chesterfield-sofa",
    title: "Stella Velvet 3 Seater Chesterfield Sofa",
    group: "sofas",
    groupName: "Living Room Sofas",
    price: 42500,
    priceFormatted: "₹42,500",
    originalPrice: "₹62,000",
    discount: "31% OFF",
    material: "Royal Velvet & Hand-Deep Button Tufting",
    leadTime: "10 - 14 Days",
    seatingCapacity: "3 Seater",
    collabtext: "HomeTown × EKKAYI",
    collablink: "https://www.hometown.in/",
    pdf: "#",
    dimensions: "88\" W x 36\" D x 32\" H",
    description: `Timeless British sophistication. Handcrafted with deep diamond-button tufting across the rolled arms and backrest, dressed in rich jewel-toned velvet fabric with turned wooden legs.`,
    images: [
      { filePath: "https://images.unsplash.com/photo-1550254478-ead40cc54513?auto=format&fit=crop&w=1000&q=80", fileName: "Stella Chesterfield Main" },
      { filePath: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80", fileName: "Stella Living Room" }
    ]
  },

  // =================== 2. DINING TABLES & CHAIRS ===================
  {
    _id: { $oid: "ekkayi-aura-teak-table" },
    id: "aura-solid-teak-8-seater-dining-table",
    title: "Aura Solid Teak 8 Seater Dining Table",
    group: "dining",
    groupName: "Dining Sanctuaries",
    price: 48900,
    priceFormatted: "₹48,900",
    originalPrice: "₹69,990",
    discount: "30% OFF",
    material: "100% Kiln-Dried Grade-A Teakwood",
    leadTime: "12 - 16 Days",
    collabtext: "HomeTown × EKKAYI",
    collablink: "https://www.hometown.in/",
    pdf: "#",
    dimensions: "96\" L x 40\" W x 30\" H (2440 x 1016 x 760 mm)",
    description: `A stately 8-seater dining table sculpted from solid timber planks. Finished in natural non-toxic polyurethane to highlight the golden-brown grain patterns and natural wood knots.

Features heavy-duty mortise and tenon joinery built to endure generations of festive family dining.`,
    images: [
      { filePath: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1000&q=80", fileName: "Aura Table Top" },
      { filePath: "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=1000&q=80", fileName: "Aura Dining Set" }
    ]
  },
  {
    _id: { $oid: "ekkayi-kyoto-cane-chairs" },
    id: "kyoto-handcrafted-cane-dining-chairs",
    title: "Kyoto Cane & Teak Dining Chairs (Set of 6)",
    group: "dining",
    groupName: "Dining Sanctuaries",
    price: 36000,
    priceFormatted: "₹36,000",
    originalPrice: "₹48,000",
    discount: "25% OFF",
    material: "Handwoven Natural Rattan Cane & Teakwood",
    leadTime: "10 - 12 Days",
    collabtext: "HomeTown × EKKAYI",
    collablink: "https://www.hometown.in/",
    pdf: "#",
    dimensions: "20\" W x 22\" D x 34\" H (Seat Height: 18\")",
    description: `Set of 6 handcrafted dining chairs marrying French mid-century cane weaving with Indian teakwood framing. Breathable mesh backrests offer ergonomic support during long dining conversations.`,
    images: [
      { filePath: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1000&q=80", fileName: "Kyoto Cane Chair Front" },
      { filePath: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1000&q=80", fileName: "Kyoto Chairs with Table" }
    ]
  },
  {
    _id: { $oid: "ekkayi-ethan-dining-set" },
    id: "ethan-6-seater-dining-set-bench",
    title: "Ethan 6 Seater Solid Wood Dining Set with Bench",
    group: "dining",
    groupName: "Dining Sanctuaries",
    price: 52000,
    priceFormatted: "₹52,000",
    originalPrice: "₹72,000",
    discount: "28% OFF",
    material: "Solid Sheesham Wood & Padded Seats",
    leadTime: "10 - 14 Days",
    collabtext: "HomeTown × EKKAYI",
    collablink: "https://www.hometown.in/",
    pdf: "#",
    dimensions: "Table: 70\" L x 36\" W x 30\" H | Bench: 54\" L x 16\" W",
    description: `Complete 6-piece dining suite comprising 1 large solid Sheesham table, 4 cushioned dining chairs, and 1 spacious matching bench for flexible seating.`,
    images: [
      { filePath: "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=1000&q=80", fileName: "Ethan Dining Suite" },
      { filePath: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1000&q=80", fileName: "Ethan Table Detail" }
    ]
  },
  {
    _id: { $oid: "ekkayi-jina-travertine-table" },
    id: "jina-monolithic-travertine-dining-table",
    title: "Jina Monolithic Travertine Dining Table",
    group: "dining",
    groupName: "Dining Sanctuaries",
    price: 88000,
    priceFormatted: "₹88,000",
    originalPrice: "₹120,000",
    discount: "26% OFF",
    material: "Italian Roman Travertine & Solid Steel Core",
    leadTime: "20 - 25 Days",
    collabtext: "EKKAYI Stone",
    collablink: "https://www.hometown.in/",
    pdf: "#",
    dimensions: "84\" L x 42\" W x 30\" H",
    description: `Sculptural dining table crafted with double cylindrical fluted travertine pedestals supporting a bevel-edged matte-honed natural stone tabletop.`,
    images: [
      { filePath: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1000&q=80", fileName: "Jina Travertine Table" },
      { filePath: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1000&q=80", fileName: "Jina Dining Setting" }
    ]
  },

  // =================== 3. COFFEE, CENTER & CONSOLE TABLES ===================
  {
    _id: { $oid: "ekkayi-hugo-nested" },
    id: "hugo-nested-round-coffee-table-set",
    title: "Hugo Nested Solid Wood Coffee Tables (Set of 2)",
    group: "tables",
    groupName: "Living Room Tables",
    price: 18900,
    priceFormatted: "₹18,900",
    originalPrice: "₹26,990",
    discount: "30% OFF",
    material: "Solid Oak & Powder Coated Charcoal Metal Legs",
    leadTime: "5 - 7 Days",
    collabtext: "HomeTown × EKKAYI",
    collablink: "https://www.hometown.in/",
    pdf: "#",
    dimensions: "Large: 32\" Dia x 18\" H | Small: 24\" Dia x 15\" H",
    description: `Dual-tier nested circular center tables that slide together or separate for entertaining. Beveled natural oak top with scratch-resistant matte clear coat.`,
    images: [
      { filePath: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1000&q=80", fileName: "Hugo Nested Tables" },
      { filePath: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=1000&q=80", fileName: "Hugo Living Room Set" }
    ]
  },
  {
    _id: { $oid: "ekkayi-terracotta-table" },
    id: "terracotta-organic-center-table",
    title: "Terracotta Hand-Molded Organic Center Table",
    group: "tables",
    groupName: "Living Room Tables",
    price: 24500,
    priceFormatted: "₹24,500",
    originalPrice: "₹34,000",
    discount: "28% OFF",
    material: "High-Fire Terracotta Ceramic & Sealed Stone Core",
    leadTime: "8 - 10 Days",
    collabtext: "EKKAYI Earth",
    collablink: "https://www.hometown.in/",
    pdf: "#",
    dimensions: "44\" L x 28\" W x 16\" H",
    description: `Hand-molded organically shaped earthen coffee table finished in warm terracotta clay glaze. Sealed with hydrophobic nano-coating to protect against coffee spills.`,
    images: [
      { filePath: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=1000&q=80", fileName: "Terracotta Table Top" },
      { filePath: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1000&q=80", fileName: "Terracotta Living Room" }
    ]
  },
  {
    _id: { $oid: "ekkayi-travertine-console" },
    id: "cantilevered-travertine-console-table",
    title: "Cantilevered Travertine Foyer Console Table",
    group: "tables",
    groupName: "Living Room Tables",
    price: 38000,
    priceFormatted: "₹38,000",
    originalPrice: "₹52,000",
    discount: "27% OFF",
    material: "Porous Italian Travertine & Brushed Brass Accents",
    leadTime: "12 - 15 Days",
    collabtext: "EKKAYI Stone",
    collablink: "https://www.hometown.in/",
    pdf: "#",
    dimensions: "52\" W x 14\" D x 32\" H",
    description: `Minimalist entryway console table showcasing natural travertine veins and matte brushed brass base supports for entrance foyers and corridors.`,
    images: [
      { filePath: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1000&q=80", fileName: "Travertine Console Front" },
      { filePath: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1000&q=80", fileName: "Console Entryway" }
    ]
  },

  // =================== 4. BEDROOM SUITES & BEDS ===================
  {
    _id: { $oid: "ekkayi-sylvan-bed" },
    id: "sylvan-upholstered-king-bed",
    title: "Sylvan Upholstered Platform Bed (King Size)",
    group: "bedroom",
    groupName: "Bedroom Sanctuaries",
    price: 62000,
    priceFormatted: "₹62,000",
    originalPrice: "₹89,000",
    discount: "30% OFF",
    material: "Unbleached Sand Bouclé & Solid Teak Base",
    leadTime: "14 - 18 Days",
    collabtext: "HomeTown × EKKAYI",
    collablink: "https://www.hometown.in/",
    pdf: "#",
    dimensions: "82\" W x 88\" L x 46\" H (Fits 78\" x 72\" King Mattress)",
    description: `An architectural low-profile floating platform bed upholstered in soft textured Sand Bouclé fabric.

Features a floating cantilevered base with concealed warm under-bed ambient LED channel lighting and an overstuffed ergonomic headrest.`,
    images: [
      { filePath: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80", fileName: "Sylvan Bed Front" },
      { filePath: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1000&q=80", fileName: "Sylvan Bed Room" }
    ]
  },
  {
    _id: { $oid: "ekkayi-max-hydraulic-bed" },
    id: "max-solid-wood-hydraulic-storage-bed",
    title: "Max Solid Wood Hydraulic Storage Bed (Queen Size)",
    group: "bedroom",
    groupName: "Bedroom Sanctuaries",
    price: 45900,
    priceFormatted: "₹45,900",
    originalPrice: "₹65,000",
    discount: "29% OFF",
    material: "Kiln-Dried Solid Sheesham Wood & German Gas-Lift Pistons",
    leadTime: "12 - 15 Days",
    collabtext: "HomeTown × EKKAYI",
    collablink: "https://www.hometown.in/",
    pdf: "#",
    dimensions: "66\" W x 84\" L x 42\" H (Fits 78\" x 60\" Queen Mattress)",
    description: `Heavy-duty solid Sheesham wood bed with premium German gas-lift hydraulic pistons for smooth, effortless lifting. Opens to a massive 950-litre dust-free under-bed storage compartment.`,
    images: [
      { filePath: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1000&q=80", fileName: "Max Bed Frame" },
      { filePath: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80", fileName: "Max Bed Storage" }
    ]
  },
  {
    _id: { $oid: "ekkayi-nightstands" },
    id: "charred-oak-fluted-nightstands",
    title: "Charred Oak Fluted Bedside Tables (Set of 2)",
    group: "bedroom",
    groupName: "Bedroom Sanctuaries",
    price: 16500,
    priceFormatted: "₹16,500",
    originalPrice: "₹22,000",
    discount: "25% OFF",
    material: "Fluted Charred Oak & Brushed Brass Handles",
    leadTime: "7 - 10 Days",
    collabtext: "HomeTown × EKKAYI",
    collablink: "https://www.hometown.in/",
    pdf: "#",
    dimensions: "20\" W x 18\" D x 22\" H",
    description: `Set of 2 minimalist cylindrical bedside cabinets featuring fluted tambour wood detailing, soft-close Blum drawers, and brass edge inlays.`,
    images: [
      { filePath: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=1000&q=80", fileName: "Nightstand Main" },
      { filePath: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80", fileName: "Nightstand Detail" }
    ]
  },
  {
    _id: { $oid: "ekkayi-wardrobe" },
    id: "earthy-sand-3-door-wardrobe",
    title: "Kanso 3-Door Architectural Wardrobe",
    group: "bedroom",
    groupName: "Bedroom Sanctuaries",
    price: 78000,
    priceFormatted: "₹78,000",
    originalPrice: "₹105,000",
    discount: "25% OFF",
    material: "Natural Oak, Sand Linen Panels & Concealed LED",
    leadTime: "18 - 22 Days",
    collabtext: "EKKAYI Sanctuary",
    collablink: "https://www.hometown.in/",
    pdf: "#",
    dimensions: "72\" W x 24\" D x 84\" H",
    description: `A floor-to-ceiling architectural wardrobe combining warm oak framework with acoustic sand linen door panels, full-length dressing mirror, and automated interior sensor lighting.`,
    images: [
      { filePath: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1000&q=80", fileName: "Wardrobe Closed" },
      { filePath: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80", fileName: "Wardrobe Interior" }
    ]
  },

  // =================== 5. STORAGE & CREDENZAS ===================
  {
    _id: { $oid: "ekkayi-aurelia-sideboard" },
    id: "aurelia-modern-sideboard-credenza",
    title: "Aurelia Modern Sideboard Credenza",
    group: "storage",
    groupName: "Storage & Credenzas",
    price: 46000,
    priceFormatted: "₹46,000",
    originalPrice: "₹65,000",
    discount: "29% OFF",
    material: "Solid Oak, Fluted Glass & Brushed Gold Hardware",
    leadTime: "12 - 16 Days",
    collabtext: "HomeTown × EKKAYI",
    collablink: "https://www.hometown.in/",
    pdf: "#",
    dimensions: "66\" W x 18\" D x 34\" H",
    description: `A multi-purpose dining sideboard and living room entertainment buffet featuring 4 fluted glass doors, adjustable interior shelves, and soft-close German hinges.`,
    images: [
      { filePath: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1000&q=80", fileName: "Aurelia Sideboard Main" },
      { filePath: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1000&q=80", fileName: "Aurelia Living Room" }
    ]
  },
  {
    _id: { $oid: "ekkayi-kanso-bookcase" },
    id: "kanso-open-architectural-bookcase",
    title: "Kanso Open Architectural Bookcase",
    group: "storage",
    groupName: "Storage & Credenzas",
    price: 38000,
    priceFormatted: "₹38,000",
    originalPrice: "₹52,000",
    discount: "27% OFF",
    material: "Kiln-Dried Hardwood & Matte Charcoal Metal Supports",
    leadTime: "10 - 14 Days",
    collabtext: "HomeTown × EKKAYI",
    collablink: "https://www.hometown.in/",
    pdf: "#",
    dimensions: "48\" W x 15\" D x 78\" H",
    description: `Geometric asymmetrical open-shelving bookcase designed to organize book collections, planters, and decorative sculptures in home offices and studies.`,
    images: [
      { filePath: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1000&q=80", fileName: "Kanso Bookcase Front" },
      { filePath: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1000&q=80", fileName: "Kanso Bookcase Angle" }
    ]
  },

  // =================== 6. ACCENT CHAIRS & LOUNGE SEATING ===================
  {
    _id: { $oid: "ekkayi-kyoto-armchair" },
    id: "kyoto-solid-oak-accent-armchair",
    title: "Kyoto Solid Oak & Bouclé Accent Armchair",
    group: "accent",
    groupName: "Accent Chairs & Benches",
    price: 22900,
    priceFormatted: "₹22,900",
    originalPrice: "₹32,000",
    discount: "28% OFF",
    material: "Natural White Oak & Soft Parchment Bouclé",
    leadTime: "7 - 10 Days",
    seatingCapacity: "1 Seater Armchair",
    collabtext: "HomeTown × EKKAYI",
    collablink: "https://www.hometown.in/",
    pdf: "#",
    dimensions: "32\" W x 34\" D x 30\" H (Seat Height: 17\")",
    description: `Sculptural accent armchair featuring sweeping curved solid oak armrests and deep feather-filled bouclé cushions for reading corners and lounges.`,
    images: [
      { filePath: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80", fileName: "Kyoto Armchair Front" },
      { filePath: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80", fileName: "Kyoto Armchair Angle" }
    ]
  },
  {
    _id: { $oid: "ekkayi-aston-wingchair" },
    id: "aston-wingback-velvet-lounge-chair",
    title: "Aston Wingback Velvet Lounge Chair with Ottoman",
    group: "accent",
    groupName: "Accent Chairs & Benches",
    price: 28500,
    priceFormatted: "₹28,500",
    originalPrice: "₹39,990",
    discount: "28% OFF",
    material: "Deep Forest Green Velvet & Solid Wood Legs",
    leadTime: "7 - 10 Days",
    seatingCapacity: "1 Seater + Footrest",
    collabtext: "HomeTown × EKKAYI",
    collablink: "https://www.hometown.in/",
    pdf: "#",
    dimensions: "Chair: 34\" W x 36\" D x 42\" H | Ottoman: 22\" x 18\" x 16\"",
    description: `A classic high-back wing chair upholstered in luxurious Deep Forest Green velvet with matching padded footstool ottoman for reading sanctuaries.`,
    images: [
      { filePath: "https://images.unsplash.com/photo-1580481077195-c99981881335?auto=format&fit=crop&w=1000&q=80", fileName: "Aston Wing Chair" },
      { filePath: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80", fileName: "Aston Setting" }
    ]
  },
  {
    _id: { $oid: "ekkayi-charred-bench" },
    id: "monolithic-charred-wood-bench",
    title: "Monolithic Charred Wood & Leather Foyer Bench",
    group: "accent",
    groupName: "Accent Chairs & Benches",
    price: 26000,
    priceFormatted: "₹26,000",
    originalPrice: "₹36,000",
    discount: "27% OFF",
    material: "Shou Sugi Ban Charred Oak & Artisan Leather",
    leadTime: "10 - 12 Days",
    collabtext: "HomeTown × EKKAYI",
    collablink: "https://www.hometown.in/",
    pdf: "#",
    dimensions: "64\" L x 18\" W x 18\" H",
    description: `A sculptural monolith blending charred natural timber with buttery artisanal leather upholstery. An architectural anchor for expansive foyers and master bedroom ends.`,
    images: [
      { filePath: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1000&q=80", fileName: "Charred Bench Main" },
      { filePath: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80", fileName: "Bench Foyer Angle" }
    ]
  }
];

// Helper to find product by id, handle, or title slug
export function getProductById(id) {
  if (!id) return PRODUCTS[0];
  const cleanId = id.toLowerCase().replace(/[^a-z0-9]/g, '');
  return PRODUCTS.find(p => {
    const pOid = (p._id?.$oid || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    const pId = (p.id || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    const pTitle = (p.title || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    const pGroup = (p.group || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    return pOid === cleanId || pId === cleanId || pTitle.includes(cleanId) || cleanId.includes(pTitle) || pGroup.includes(cleanId);
  }) || PRODUCTS[0];
}

export function getProductsByGroup(group) {
  if (!group) return PRODUCTS;
  return PRODUCTS.filter(p => p.group.toLowerCase() === group.toLowerCase());
}
