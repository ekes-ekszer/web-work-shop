# Software Requirements Specification (SRS)
## Ékes Ékszer

**Version:** 0.0.1  
**Status:** Draft
**Author(s):** Pal Anita, Berkeczi Róbert
**Date:** 2026.10.12

---

## 1. Executive Summary & Purpose

* **Objective:** Provide an interactive web-based customizer for multi-strand traditional Hungarian folk dance necklaces, enabling users to visually design and personalize their piece online.
* **Scope:** 2D/3D real-time visualizer allowing dynamic adjustment of strand counts, bead selection, pattern ordering, and color combinations. Exporting the finalized design into a printable/shareable specification format.
* **Target Audience:** Serves a dual audience:
  1. **Buyers / Folk Dancers:** Enables intuitive design creation without technical knowledge.
  2. **Artisans / Makers:** Streamlines communication by receiving precise design specifications, reducing misinterpretations and back-and-forth messaging.

---

## 2. User Roles & Permissions

| Role | Description | Key Permissions |
| :--- | :--- | :--- |
| **Guest / Buyer** | Unauthenticated or registered user | Customize necklaces, preview designs, save/export configuration, share design link with the maker. |
| **Maker / Admin** | Artisan or system administrator | Manage available bead types/colors, view customer orders and design specifications, update product settings. |

---

## 3. Functional Requirements

### 3.1 Necklace Customization & Visualization
* **FR-3.1.1:** Users can specify and adjust the number of strands (rows) on the necklace.
* **FR-3.1.2:** Users can select bead types, sizes, materials, and colors from a predefined library.
* **FR-3.1.3:** Users can set and reorder the bead sequence for each strand individually or apply a pattern across multiple strands.
* **FR-3.1.4:** The system must render a real-time visual preview of the customized necklace upon any configuration change.
* **FR-3.1.5:** Users can adjust structural parameters such as strand length, spacing, and ribbon/clasp fasteners.

### 3.2 Design Saving & Communication Tools
* **FR-3.2.1:** Users can export the finished design as a PDF summary or downloadable image file.
* **FR-3.2.2:** System generates a unique shareable URL/code for each saved configuration so buyers can easily send it to the maker.
* **FR-3.2.3:** The system generates an itemized bead list (bead count, types, pattern guide) for the artisan to facilitate the handcrafting process.

---

## 4. Non-Functional Requirements (NFR)

* **Performance:** Real-time visual adjustments (bead recoloring, reordering) must render within 100ms on the client side. Initial page load must be under 2 seconds.
* **Scalability:** System architecture must support up to 1,000 concurrent interactive sessions without canvas performance degradation.
* **Usability & UX:** Intuitive drag-and-drop or click-to-place interface optimized for touch devices (smartphones/tablets) and desktop.
* **Security:** All web communication must be encrypted via SSL/TLS (HTTPS). User data compliance with GDPR regulations.
* **Compatibility:** Fully functional on modern desktop and mobile browsers (Chrome, Safari, Firefox, Edge).

---

## 5. System Architecture & Tech Stack (Suggested)

* **Frontend:** React / Next.js + HTML5 Canvas or Three.js / Fabric.js (for real-time bead and necklace rendering)
* **Backend:** Node.js (Express) or Python (FastAPI)
* **Database:** PostgreSQL (for storing user accounts, bead catalogs, and saved design JSON structures)
* **Hosting / Infrastructure:** Vercel / Netlify (Frontend) + Render / AWS (Backend & DB)

---

## 6. UI/UX & Wireframes

* **Figma Board:** [Link to Figma board]
* **Key Components:**
  * Interactive Canvas Area (Center)
  * Strand & Bead Palette Controls (Sidebar/Bottom Bar)
  * Design Summary & Export Modal

---

## 7. External Integrations & Dependencies

* **PDF Generator:** `jspdf` or server-side renderer for artisan build specification sheets.
* **Image Export:** HTML5 Canvas `toDataURL` for PNG/JPEG preview generation.
* **Email Service (Optional):** SendGrid or Resend to send completed design specs directly to the maker's inbox.

---

## 8. Milestones & Delivery Roadmap

- [ ] **Phase 1:** Core Canvas Engine Development (Strand layout & bead rendering algorithms)
- [ ] **Phase 2:** Customization Controls (Strand count selector, bead picker, sequence manager)
- [ ] **Phase 3:** Export & Sharing System (Unique link generator, PDF specification sheet output)
- [ ] **Phase 4:** Maker Dashboard & Catalog Management (Adding/editing beads and colors)
- [ ] **Phase 5:** Testing, UI Refinement, and Production Release