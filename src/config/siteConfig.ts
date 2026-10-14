import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import advisory from "@/assets/svc-advisory.jpg";
import tax from "@/assets/svc-tax.jpg";
import consulting from "@/assets/svc-consulting.jpg";
import it from "@/assets/svc-it.jpg";
import {
  Building2,
  ShieldCheck,
  Calculator,
  Receipt,
  ClipboardCheck,
  TrendingUp,
  Briefcase,
  MonitorCog,
  Scale,
  type LucideIcon,
} from "lucide-react";

export const images = { hero1, hero2, hero3, advisory, tax, consulting, it };

export const siteConfig = {
  name: "Sadiq Associates",
  descriptor: "Chartered Firm",
  owner: "Muhammad Sadiq",
  ownerTitle: "Founder / Principal Partner",
  domain: "https://sadiqassociates.com",
  address: { line1: "Sabzazar Plaza, 3rd Floor", line2: "Sabzazar, Lahore, Pakistan" },
  phones: [
    { label: "0315-4603790", tel: "+923154603790" },
    { label: "0315-4880408", tel: "+923154880408" },
  ],
  email: "info@sadiqassociates.com",
  whatsapp: "https://wa.me/923154603790",
  mapEmbed: "https://www.google.com/maps?q=Sabzazar+Plaza,+Sabzazar,+Lahore&output=embed",
  // TODO(owner): replace with real office hours
  officeHours: "Mon – Sat, 10:00 AM – 6:00 PM (to be confirmed)",
  // TODO(owner): add real social profile links (leave "" to hide)
  social: { facebook: "", linkedin: "", instagram: "" },
  // TODO(owner): replace these placeholder figures with real numbers
  stats: [
    { key: "years", label: "Years of Experience", value: 10, suffix: "+" },
    { key: "clients", label: "Clients Served", value: 250, suffix: "+" },
    { key: "industries", label: "Industries Supported", value: 15, suffix: "+" },
  ],
  // TODO(owner): confirm skill percentages
  skills: [
    { label: "Audit & Assurance", value: 95 },
    { label: "Accounting & Reporting", value: 92 },
    { label: "Tax & Compliance", value: 90 },
    { label: "Corporate Advisory", value: 88 },
  ],
  // TODO(owner): edit the founder message
  founderMessage:
    "At Sadiq Associates, our commitment is simple: give every client clear, honest and dependable financial guidance. Whether you are forming a new company, preparing for an audit or planning your taxes, we work closely with you so you can make decisions with confidence.",
  // TODO(owner): fill or remove these optional team members
  team: [
    { name: "Muhammad Sadiq", role: "Founder / Principal Partner", placeholder: false },
    { name: "Team Member", role: "Position to be added", placeholder: true },
    { name: "Team Member", role: "Position to be added", placeholder: true },
  ],
};

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  icon: LucideIcon;
  image: string;
  gallery: string[];
  includes: string[];
};

export const services: Service[] = [
  {
    slug: "company-formation-services",
    title: "Company Formation Services",
    short: "Set up your legal entity the right way.",
    description:
      "Complete assistance in setting up a new legal entity and handling the regulatory requirements of forming a company.",
    icon: Building2,
    image: advisory,
    gallery: [advisory, hero3, hero2],
    includes: [
      "Company incorporation support",
      "Selection of the right legal structure",
      "Help with formation documents",
      "Corporate registration guidance",
      "Regulatory requirement support",
      "Post-incorporation compliance guidance",
    ],
  },
  {
    slug: "audit-assurance",
    title: "Audit & Assurance",
    short: "Independent audits you can rely on.",
    description:
      "Independent audit services that improve financial transparency, strengthen internal controls and support dependable financial reporting.",
    icon: ShieldCheck,
    image: hero2,
    gallery: [hero2, tax, hero1],
    includes: [
      "Financial statement audits",
      "Internal control assessments",
      "Business and industry risk reviews",
      "Financial reporting evaluation",
      "Audit recommendations and improvement support",
    ],
  },
  {
    slug: "accounting-services",
    title: "Accounting Services",
    short: "Accurate books, clear performance.",
    description:
      "Accurate and up-to-date accounting that shows clearly how your business is performing, including its strengths and weaknesses.",
    icon: Calculator,
    image: tax,
    gallery: [tax, hero2, consulting],
    includes: [
      "Bookkeeping and financial records",
      "Financial statement preparation",
      "Management reporting",
      "Accounting system design",
      "Financial control development",
      "Accounting process improvement",
    ],
  },
  {
    slug: "tax-consultancy",
    title: "Tax Consultancy",
    short: "Income and sales tax, handled properly.",
    description:
      "Income tax and sales tax guidance that helps individuals and businesses meet their obligations and manage tax matters effectively.",
    icon: Receipt,
    image: hero1,
    gallery: [hero1, tax, hero2],
    includes: [
      "Income tax consultancy",
      "Sales tax consultancy",
      "Tax planning and advisory",
      "Preparation and filing of tax returns",
      "Tax compliance reviews",
      "Assistance during tax investigations",
      "Representation in tax disputes",
    ],
  },
  {
    slug: "compliance-consultancy",
    title: "Compliance Consultancy",
    short: "Stay on the right side of every rule.",
    description:
      "Practical compliance support that helps your organisation meet regulatory, reporting and contractual requirements.",
    icon: ClipboardCheck,
    image: hero3,
    gallery: [hero3, advisory, tax],
    includes: [
      "Regulatory compliance reviews",
      "Corporate compliance support",
      "Financial reporting compliance",
      "Internal policy assessments",
      "Contractual requirement reviews",
      "Compliance risk identification",
    ],
  },
  {
    slug: "financial-consultancy",
    title: "Financial Consultancy",
    short: "Insight for sound financial decisions.",
    description:
      "Clear financial insight and structured advice that helps management evaluate performance, improve controls and make sound decisions.",
    icon: TrendingUp,
    image: consulting,
    gallery: [consulting, hero2, hero1],
    includes: [
      "Financial performance analysis",
      "Financial planning support",
      "Cash-flow and control reviews",
      "Assessment of financial strengths and weaknesses",
      "Management information development",
      "Decision-making support",
    ],
  },
  {
    slug: "management-consultancy",
    title: "Management Consultancy",
    short: "Better systems, policies and processes.",
    description:
      "Management solutions that improve organisational systems, internal processes, policies and operational effectiveness.",
    icon: Briefcase,
    image: hero3,
    gallery: [consulting, hero3, advisory],
    includes: [
      "Management information system development",
      "Accounting information system design",
      "Finance and purchasing procedures",
      "Sales and marketing policies",
      "Personnel policies and job descriptions",
      "Asset and treasury control systems",
      "Executive search and selection support",
    ],
  },
  {
    slug: "business-it-reviews",
    title: "Business IT Reviews",
    short: "The right technology at the right cost.",
    description:
      "Technology reviews that help businesses choose and implement suitable systems, considering compatibility, cost, efficiency and staff needs.",
    icon: MonitorCog,
    image: it,
    gallery: [it, consulting, hero3],
    includes: [
      "Hardware and software needs assessment",
      "Technology cost-benefit analysis",
      "System compatibility reviews",
      "Business software selection",
      "Technology implementation planning",
      "Conversion cost assessment",
      "Employee system training requirements",
    ],
  },
  {
    slug: "corporate-business-advisory",
    title: "Corporate & Business Advisory",
    short: "Clarity on agreements, law and regulation.",
    description:
      "Professional advice that helps businesses understand commercial agreements, regulatory responsibilities and important corporate matters.",
    icon: Scale,
    image: advisory,
    gallery: [advisory, hero1, consulting],
    includes: [
      "Financial contract reviews",
      "Corporate advisory services",
      "Interpretation of business regulations",
      "Company law advisory",
      "Labour law advisory",
      "Contractual compliance support",
      "Business restructuring guidance",
    ],
  },
];

export const pageTitle = (page: string) => `${page} | Sadiq Associates - Chartered Firm in Lahore`;
