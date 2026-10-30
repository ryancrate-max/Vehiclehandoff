export type Kit = { slug: string; name: string; short: string; icon: string; priceCents: number; blurb: string; checklist: string[] };

export const KITS: Kit[] = [
  { slug: "used-car-truck", name: "Used car & truck", short: "car or truck", icon: "🚗", priceCents: 2900,
    blurb: "Bill of sale with VIN check digit, odometer and lien disclosure, plus your province's transfer steps.",
    checklist: ["VIN matches the ownership and the dash plate", "Odometer reading recorded and initialled", "Lien search run by the buyer", "Safety / inspection requirement checked for the province", "Plates and permit handled as the province requires", "Both parties keep a signed copy"] },
  { slug: "snowmobile", name: "Snowmobile", short: "snowmobile", icon: "🛷", priceCents: 1900,
    blurb: "Snowmobile bill of sale, VIN and registration transfer checklist, track and hyfax inspection list.",
    checklist: ["VIN on the tunnel matches the registration", "Track, studs, skis and carbides inspected", "Hours or km recorded", "Registration / permit transfer per province", "Trail permit is not transferable in most provinces"] },
  { slug: "atv-side-by-side", name: "ATV / side-by-side", short: "ATV", icon: "🏍️", priceCents: 1900,
    blurb: "Off-road vehicle bill of sale with registration transfer steps and an inspection photo checklist.",
    checklist: ["VIN on the frame matches the paperwork", "Hours recorded", "CV boots, bearings and tires checked", "Off-road vehicle registration transfer per province"] },
  { slug: "trailer", name: "Utility & boat trailer", short: "trailer", icon: "🚚", priceCents: 1900,
    blurb: "Trailer bill of sale, plate and permit notes, and a lights, bearings and coupler checklist.",
    checklist: ["VIN plate on the tongue matches the permit", "Lights, bearings, tires and coupler checked", "Seller keeps the plate in provinces where plates stay with the owner"] },
  { slug: "rv-camper", name: "RV & camper", short: "RV", icon: "🚐", priceCents: 3900,
    blurb: "RV and camper kit: bill of sale, water damage and roof inspection list, propane and appliance checks, and payment-safety guide.",
    checklist: ["Roof, seals and soft spots checked for water damage", "Propane system and appliances tested", "Slide-outs, awning and generator hours", "Lien search and safe payment method", "Transfer steps for a motorhome vs towable"] },
];

export type Province = { code: string; slug: string; name: string; live: boolean; rule?: string; source?: string };

export const PROVINCES: Province[] = [
  { code: "ON", slug: "ontario", name: "Ontario", live: true,
    rule: "The seller must give the buyer a Used Vehicle Information Package (UVIP). The buyer has 6 days to register the vehicle at ServiceOntario, and needs a Safety Standards Certificate to plate it. Retail sales tax of 13% is paid on the greater of the price or the wholesale value.",
    source: "https://www.ontario.ca/page/buy-or-sell-used-vehicle-ontario" },
  { code: "BC", slug: "british-columbia", name: "British Columbia", live: true,
    rule: "Seller and buyer complete and sign the Transfer/Tax Form (APV9T). The buyer registers within 10 days at an Autoplan broker, and PST is paid on the greater of the price or the average wholesale value.",
    source: "https://www.icbc.com/vehicle-registration/sell-vehicle/Selling-a-used-vehicle" },
  { code: "AB", slug: "alberta", name: "Alberta", live: true,
    rule: "A bill of sale is required. It must list both names and addresses, the VIN, make, model, year and colour, the price and both signatures. The buyer registers at a registry agent.",
    source: "https://www.alberta.ca/standard-bill-sale" },
  { code: "QC", slug: "quebec", name: "Quebec", live: false },
  { code: "MB", slug: "manitoba", name: "Manitoba", live: false },
  { code: "SK", slug: "saskatchewan", name: "Saskatchewan", live: false },
  { code: "NS", slug: "nova-scotia", name: "Nova Scotia", live: false },
  { code: "NB", slug: "new-brunswick", name: "New Brunswick", live: false },
  { code: "PE", slug: "prince-edward-island", name: "Prince Edward Island", live: false },
  { code: "NL", slug: "newfoundland-and-labrador", name: "Newfoundland and Labrador", live: false },
  { code: "YT", slug: "yukon", name: "Yukon", live: false },
  { code: "NT", slug: "northwest-territories", name: "Northwest Territories", live: false },
  { code: "NU", slug: "nunavut", name: "Nunavut", live: false },
];

export const FAQ = [
  ["Is a bill of sale legally required?", "It depends on the province. Alberta requires one to transfer ownership; Ontario uses the bill of sale section of the UVIP. Each kit shows your province's rule with a link to the official source."],
  ["Is VehicleHandoff a government service?", "No. We prepare your paperwork. Official filings happen with ServiceOntario, ICBC / Autoplan brokers, Alberta registry agents and other provincial offices."],
  ["Does an e-signed bill of sale count?", "Some registries require original signatures (BC's APV9T does). Your kit tells you when to print and sign on paper."],
  ["Can you confirm a vehicle is lien-free?", "No. We link to the official provincial lien search so the buyer can run it before paying."],
  ["What does it cost?", "A basic bill of sale is free. Snowmobile, ATV and trailer kits are C$19, car and truck kits are C$29, and RV kits are C$39, plus GST/HST."],
  ["Is this legal advice?", "No. VehicleHandoff is an organizing tool based on official public guidance."],
];

export const GUIDES = [
  { slug: "sell-a-car-privately-in-ontario", title: "How to sell a car privately in Ontario", desc: "UVIP, Safety Standards Certificate, plates and the 6-day registration window, step by step.", province: "ON" },
  { slug: "bc-apv9t-transfer-form", title: "BC's APV9T transfer form, explained", desc: "Who fills which section of the Transfer/Tax Form, and why BC wants original signatures.", province: "BC" },
  { slug: "alberta-bill-of-sale-required-fields", title: "Alberta bill of sale: the required fields", desc: "Exactly what an Alberta registry agent expects to see on a private-sale bill of sale.", province: "AB" },
];
