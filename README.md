<div align="center">
  
  <br />
  <br />

  <h1 align="center">
    <strong>Developer Portfolio.</strong><br>
    <em>Pro. Beyond.</em>
  </h1>

  <p align="center">
    A premium, cinematic developer portfolio inspired by Apple's design language.<br>
    Built for the modern web with Next.js 15, Framer Motion, and Firebase.
  </p>

  <p align="center">
    <a href="https://portfolio-f3a7b.web.app" target="_blank">
      <img src="/src/app/opengraph-image.png" alt="Live Preview" width="800" style="border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" />
    </a>
  </p>
  <p align="center">
    <a href="https://portfolio-f3a7b.web.app" target="_blank"><strong>✨ Click above to view Live Preview ✨</strong></a>
  </p>

  <br />

  <p align="center">
    <a href="#features">Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#architecture">Architecture</a> •
    <a href="#getting-started">Getting Started</a>
  </p>

  <br />
  <br />
</div>

---

## **Design. Redefined.**
Every pixel is engineered to leave a lasting impression. Dark premium themes, smooth scroll-triggered reveals, and cinematic glassmorphism combine to create a digital experience that feels less like a website and more like a luxury product.

<br />

## **Pro Performance. Inside and Out.**
Built on the robust foundation of **Next.js 15 App Router**, delivering lightning-fast static and dynamic rendering. Optimized for the ultimate edge performance.

<br />

## **Features that shine.**
*   **Cinematic UI:** Apple-inspired minimalism. Deep blacks, vibrant accent glows, and pristine typography.
*   **Fluid Motion:** Choreographed entry animations, stagger effects, and an interactive mouse-glow using Framer Motion.
*   **Dynamic Data Core:** Seamlessly integrated with Firebase Firestore. Your projects, blogs, and skills update in real-time.
*   **Secure Admin Dashboard:** A protected enclave. Authenticate via Firebase to manage your content effortlessly.
*   **Live GitHub Sync:** Building in public. Automatically fetches and displays your live repositories and contribution stats.
*   **Responsive by Design:** Looks stunning on the Pro Display XDR, and just as beautiful on the iPhone.

<br />

## **The Tech.**

The foundation of a pro-level experience requires pro-level tools.

*   **Framework:** Next.js 15 (React 19 ready)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS (with custom utility tokens)
*   **Animation:** Framer Motion
*   **Backend & Auth:** Firebase (Firestore, Authentication, Storage)
*   **Integrations:** GitHub REST API

<br />

## **Getting Started.**

To run this project locally, you need Node.js (v20+) installed.

### **1. Clone the repository**
```bash
git clone https://github.com/Suyash2527/developer-portfolio.git
cd developer-portfolio
```

### **2. Install the dependencies**
```bash
npm install
```

### **3. Configure the environment**
Duplicate `.env.local.example` and rename it to `.env.local`. Fill in your Firebase and GitHub credentials.
```bash
cp .env.local.example .env.local
```

### **4. Ignite the engine**
Start the development server.
```bash
npm run dev
```
Navigate to `http://localhost:3000`.

<br />

## **Architecture.**

```text
src/
├── app/                  # Next.js App Router (Pages & Layouts)
│   ├── admin/            # Protected Dashboard
│   └── blog/             # Dynamic Blog Routing
├── components/           # Reusable UI & Animations
├── sections/             # Modular Landing Page Sections
├── services/             # Firebase & GitHub Integrations
└── styles/               # Global CSS & Design Tokens
```

<br />

---

<div align="center">
  <p>Engineered for excellence. Designed to inspire.</p>
</div>
