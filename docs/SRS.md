# Software Requirements Specification (SRS)
## Ékes Ékszer

**Version:** 0.0.1
**Status:** Draft
**Author(s):** Pal Anita, Berkeczi Róbert
**Date:** 2026.10.27

---

## 1. Purpose and Product Scope

Ékes Ékszer is planned as a web application for designing traditional Hungarian
folk-dance necklaces. Buyers should be able to configure a necklace and share
its specification with the artisan who will make it.

This specification separates the intended product from the current
implementation. The repository currently contains a basic Astro frontend and a
small Rust/Axum backend; the necklace customizer and the other product features
described below are not implemented yet.

### 1.1 In Scope

- Configure necklace strands and their bead patterns.
- Preview a design while it is being configured.
- Produce a design specification that can be shared with the artisan.
- Provide a foundation for the artisan to review customer designs.

### 1.2 Out of Scope for the Current Implementation

- Customer accounts, authentication, and authorization.
- Online payments, order fulfillment, or inventory management.
- Artisan catalog administration.
- Email delivery, PDF generation, and image export.

---

## 2. Users and Roles

The current application has no user accounts or role-based access control.

---

## 3. Functional Requirements

The requirements in this section describe the planned product. None of the
customizer or design-sharing requirements are implemented in the current
repository.

### 3.1 Necklace Design

* **FR-3.1.1:** The application shall let the buyer configure the number of necklace strands.
* **FR-3.1.2:** The application shall let the buyer choose beads from a product catalog, including the available types, sizes, materials, and colors.
* **FR-3.1.3:** The application shall let the buyer define the bead sequence for each strand.
* **FR-3.1.4:** The application shall display a visual preview of the current design and update it when the configuration changes.
* **FR-3.1.5:** The application shall let the buyer configure applicable necklace measurements and fastening options.

### 3.2 Design Specification and Sharing

* **FR-3.2.1:** The application shall provide a readable summary of a completed design for the artisan.
* **FR-3.2.2:** The application shall let the buyer share a saved design with the artisan.
* **FR-3.2.3:** The design summary shall include enough information to identify the selected beads, their sequence, and quantities.

The storage format, retention period, and sharing mechanism have not yet been
selected. Export formats and email delivery are not required by the current
implementation.

---

## 4. Non-Functional Requirements

* **Maintainability:** The frontend and backend shall remain independently buildable and runnable.
* **Compatibility:** The application shall be usable in current desktop and mobile web browsers when the product UI is implemented.
* **Security:** Any future persistence or sharing feature shall protect customer design data and restrict access to saved designs as appropriate. Authentication and the required access model remain to be specified.
* **Performance and availability targets:** Numerical targets have not yet been established and shall be defined before production deployment.

---

## 5. Current Implementation and Architecture

### 5.1 Repository Components

| Component | Current implementation |
| :--- | :--- |
| Frontend | Astro 7 application in `apps/frontend`, with the Astro React integration configured. |
| Backend | Rust 2024 application using Axum and Tokio in `apps/backend`. |
| Data storage | No database or persistent storage is configured. |
| Local development | The root `justfile` provides commands to run, build, and check both applications. |

---

## 6. User Interface References

* **Figma Board:** [Link to Figma board](https://www.figma.com/design/uZC856mBdonOGqfALBivDy/Untitled?node-id=2-3123&t=kDC6FXlzifmRpawb-1)
* **Planned primary components:**
  * Necklace preview.
  * Strand and bead selection controls.
  * Design summary for the artisan.

The current frontend does not yet implement these components.

---

## 7. Data and External Dependencies

The current application has no database, external service, or product-specific
integration. A bead catalog, design persistence, and a sharing mechanism will
be selected when those capabilities are implemented. PDF/image generation and
email services are not part of the current scope.

---

## 8. Delivery Roadmap

- [x] **Foundation:** Establish the Astro frontend, Rust/Axum backend, and root development commands.
- [ ] **Design experience:** Implement strand and bead configuration with a live preview.
- [ ] **Design summary:** Produce an artisan-readable specification.
- [ ] **Persistence and sharing:** Select and implement storage and a way to share saved designs.
- [ ] **Artisan workflow:** Define and implement how artisans access customer specifications.
- [ ] **Production readiness:** Define measurable performance, security, accessibility, and deployment requirements; validate the application against them.
