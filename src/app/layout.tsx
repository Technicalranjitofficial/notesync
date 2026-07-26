import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Script from "next/script";
import Providers from "./providers";
import "./globals.css";

const BASE_URL = "https://notesync.in";

const SITE_NAME = "NoteSync";
const SITE_TITLE = "NoteSync — Free Notes, PYQs & Solutions for Indian University Students";
const SITE_DESCRIPTION =
  "Download verified notes, previous year question papers (PYQs), and solutions for KIIT, IIT Delhi, VIT Vellore, NIT Rourkela, BITS Pilani, SRM, Manipal, Amity and 50+ Indian universities. Free for CSE, ECE, MECH, CIVIL and all branches.";

const KEYWORDS = [
  // Platform generic
  "NoteSync",
  "free university notes India",
  "university notes download",
  "PYQ download India",
  "previous year question papers",
  "engineering notes India",
  "study material India universities",
  "free notes for engineering students",
  "semester notes India",
  // KIIT
  "KIIT notes",
  "KIIT University notes",
  "KIIT PYQ",
  "KIIT previous year papers",
  "KIIT CSE notes",
  "KIIT Bhubaneswar study material",
  "KIIT semester notes",
  "KIIT University Bhubaneswar",
  // IIT
  "IIT Delhi notes",
  "IIT Delhi PYQ",
  "IIT Delhi study material",
  "IIT notes download",
  "IIT previous year papers",
  // VIT
  "VIT Vellore notes",
  "VIT PYQ",
  "VIT University notes",
  "VIT Vellore study material",
  "VIT CSE notes",
  // NIT
  "NIT Rourkela notes",
  "NIT notes download",
  "NIT PYQ",
  "NIT previous year papers",
  // BITS
  "BITS Pilani notes",
  "BITS Pilani PYQ",
  "BITS study material",
  // SRM
  "SRM University notes",
  "SRM notes download",
  "SRM PYQ",
  // Manipal
  "Manipal University notes",
  "Manipal notes download",
  "Manipal PYQ",
  // Amity
  "Amity University notes",
  "Amity notes download",
  // Branches
  "CSE notes India",
  "ECE notes India",
  "mechanical engineering notes India",
  "civil engineering notes India",
  // Subjects
  "data structures notes",
  "operating systems notes",
  "DBMS notes",
  "computer networks notes",
  "algorithms notes",
  "machine learning notes",
];

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0c0c0e",
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },

  description: SITE_DESCRIPTION,
  keywords: KEYWORDS,

  authors: [{ name: "NoteSync", url: BASE_URL }],
  creator: "NoteSync",
  publisher: "NoteSync",

  // Canonical & alternates
  alternates: {
    canonical: BASE_URL,
    languages: {
      "en-IN": BASE_URL,
      "en-US": BASE_URL,
    },
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Open Graph
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BASE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NoteSync — Free Notes, PYQs & Solutions for Indian University Students",
        type: "image/png",
      },
    ],
  },

  // Twitter / X Card
  twitter: {
    card: "summary_large_image",
    site: "@notesyncin",
    creator: "@notesyncin",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        alt: "NoteSync — India's University Notes Platform",
      },
    ],
  },

  // App manifest & icons
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },

  manifest: "/site.webmanifest",

  // App-specific meta
  applicationName: SITE_NAME,
  category: "education",

  // Verification (add values when ready)
  verification: {
    google: "YOUR_GOOGLE_SITE_VERIFICATION_TOKEN",
    // bing: "YOUR_BING_VERIFICATION_TOKEN",
  },

  // Other
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

// ── JSON-LD structured data ──────────────────────────────────────────────────

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${BASE_URL}/#organization`,
  name: SITE_NAME,
  url: BASE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${BASE_URL}/logo.png`,
    width: 200,
    height: 50,
  },
  sameAs: [
    "https://twitter.com/notesyncin",
    "https://instagram.com/notesync.in",
  ],
  description: SITE_DESCRIPTION,
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  url: BASE_URL,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  publisher: { "@id": `${BASE_URL}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
  inLanguage: "en-IN",
};

const educationOrganizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": `${BASE_URL}/#edu-org`,
  name: SITE_NAME,
  url: BASE_URL,
  description:
    "A platform providing verified academic notes, previous year question papers, and study materials for 50+ Indian universities including KIIT, IIT Delhi, VIT Vellore, NIT Rourkela, BITS Pilani, SRM, Manipal, and Amity.",
  areaServed: "IN",
  audience: {
    "@type": "EducationalAudience",
    educationalRole: "student",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} h-full`}
    >
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(educationOrganizationSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--color-bg)] text-[var(--color-text-1)] font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
