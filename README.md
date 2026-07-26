<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=f59e0b&height=200&section=header&text=NoteSync&fontSize=72&fontColor=ffffff&fontAlignY=38&desc=India%27s%20University%20Notes%20Platform&descAlignY=58&descSize=20&descColor=f5e6c8&animation=fadeIn" width="100%" />

<br/>

[![Live](https://img.shields.io/badge/🌐%20Live-notesync.in-f59e0b?style=for-the-badge&labelColor=0c0c0e)](https://notesync.in)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge)](LICENSE)

<br/>

```
  ┌──────────────────────────────────────────────────┐
  │                                                  │
  │   note sync . in                                 │
  │   ─────────────────────────────────────────      │
  │   Verified notes, PYQs & solutions               │
  │   from 50+ Indian universities                   │
  │                                                  │
  │   $ notesync --universities 50                   │
  │   → Loaded KIIT · IIT-D · VIT · NITR · BITS     │
  │   $ notesync --resources --count                 │
  │   → 1,00,247 files indexed                       │
  │   $ notesync --status                            │
  │   → ● live · 80,412 studying now                 │
  │                                                  │
  └──────────────────────────────────────────────────┘
```

</div>

---

## ✦ What is NoteSync?

**NoteSync** is India's academic knowledge platform — a beautifully designed, secure web app where university students access **verified notes, previous year question papers (PYQs), and solutions** for every subject, semester, and branch across 50+ Indian universities.

> Free for all. Premium for serious students.

---

## ⚡ Features

<table>
<tr>
<td width="50%">

### 📚 Content
- Notes, PYQs, Lab manuals, Solutions
- Organised by university → branch → semester → subject
- Verified and quality-checked uploads
- Earn **₹20** per approved topic contribution

</td>
<td width="50%">

### 🔒 Security
- DRM-protected PDF viewer
- DevTools detection & blocking
- Watermarked pages (no screenshots)
- Text layer disabled (no copy-paste)

</td>
</tr>
<tr>
<td width="50%">

### 🎓 Universities
- KIIT University
- IIT Delhi
- VIT Vellore
- NIT Rourkela
- BITS Pilani
- SRM, Manipal, Amity + 40 more

</td>
<td width="50%">

### 🛠 Tech
- Next.js 16 App Router (RSC)
- NextAuth v5 (Google OAuth)
- Tailwind CSS v4
- Framer Motion animations
- Dynamic OG images & full SEO

</td>
</tr>
</table>

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/Technicalranjitofficial/notesync.git
cd notesync

# Install dependencies
npm install

# Copy env template
cp .env.example .env.local
# Fill in your values in .env.local

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## 🔑 Environment Variables

```bash
# .env.local

# NextAuth
AUTH_SECRET=your_secret_min_32_chars
AUTH_URL=http://localhost:3000
AUTH_GOOGLE_ID=your_google_client_id
AUTH_GOOGLE_SECRET=your_google_client_secret

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# NoteSync Backend API
API_URL=http://localhost:8001/api/v1
NEXT_PUBLIC_API_URL=http://localhost:8001/api/v1
```

---

## 🐳 Docker

```bash
# Build image
docker build -t notesync .

# Run container
docker run -p 3000:3000 \
  -e AUTH_SECRET=... \
  -e AUTH_GOOGLE_ID=... \
  -e AUTH_GOOGLE_SECRET=... \
  -e NEXT_PUBLIC_APP_URL=https://notesync.in \
  notesync
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── [uni-slug]/              # University pages (SSG)
│   │   ├── [branch-slug]/       # Branch + semester view
│   │   │   └── [sem]/[subject]/ # Subject resources
│   │   └── opengraph-image.tsx  # Dynamic OG per university
│   ├── api/
│   │   ├── auth/                # NextAuth handlers
│   │   └── user/profile/        # Profile save endpoint
│   ├── auth/
│   │   ├── login/               # Auth page (Google + credentials)
│   │   └── complete-profile/    # 3-step profile wizard
│   ├── layout.tsx               # Root layout (SEO + JSON-LD)
│   ├── sitemap.ts               # Dynamic sitemap (260+ routes)
│   └── robots.ts                # Crawler rules
├── components/
│   ├── sections/                # Landing page sections
│   └── browse/                  # Browse/subject client components
└── lib/
    ├── auth.ts                  # NextAuth v5 config
    ├── mock-data.ts             # University + subject data
    └── profile-store.ts         # In-memory profile store
```

---

## 🗺 Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/[uni-slug]` | University overview + branches |
| `/[uni-slug]/[branch-slug]` | Branch subjects by semester |
| `/[uni-slug]/[branch-slug]/[sem]/[subject]` | Subject resources |
| `/auth/login` | Sign in |
| `/auth/complete-profile` | Profile setup wizard |

---

## 🔍 SEO

- `generateMetadata` on every dynamic route
- Dynamic `ImageResponse` OG images (1200×630) per university, branch, and subject
- Sitemap covering 260+ pre-generated routes
- JSON-LD structured data (Organization, WebSite, Course, BreadcrumbList)
- `robots.ts` with per-bot rules

---

## 🤝 Contributing

1. Fork the repo
2. Create your branch: `git checkout -b feat/my-feature`
3. Commit: `git commit -m "feat: add my feature"`
4. Push: `git push origin feat/my-feature`
5. Open a Pull Request

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=f59e0b&height=100&section=footer&animation=fadeIn" width="100%" />

**Built with ♥ for Indian university students**

[![GitHub](https://img.shields.io/badge/GitHub-Technicalranjitofficial-181717?style=flat-square&logo=github)](https://github.com/Technicalranjitofficial)

</div>
