# HIGIMAC

**A professional cleaning and sanitization services platform.**

![license](https://img.shields.io/github/license/gabemaldito/higimac?style=flat-square&color=0080ff)
![repo-top-language](https://img.shields.io/github/languages/top/gabemaldito/higimac?style=flat-square&color=0080ff)
![last-commit](https://img.shields.io/github/last-commit/gabemaldito/higimac?style=flat-square&color=0080ff)

---

## 📖 Overview

**HIGIMAC** is a mobile application built with **React Native** and **Expo** designed to bridge the gap between cleaning professionals and clients. 

The project features a dual-interface architecture, providing tailored experiences for both service providers and customers within a single unified codebase.

---

## ✨ Key Features

* **Dual-Role Architecture**: Specialized workflows for **Clients** (booking/exploring) and **Professionals** (job management/earnings).
* **Authentication & Onboarding**: Complete user journey from registration to role-specific onboarding.
* **Service Management**: Real-time job tracking, calendars for professionals, and booking history for clients.
* **Centralized Design System**: Custom theme engine managing typography, spacing, and colors.
* **Secure Context API**: Global state management for user authentication and session persistence.

---

## 📂 Project Structure

```bashv
└── higimac/
    ├── app/                # Expo Router (File-based navigation)
    │   ├── (auth)          # Login, Signup, Onboarding
    │   ├── (client)        # Explore, Bookings, Messages, Profile
    │   └── (professional)  # Jobs, Earnings, Calendar, Pro-Profile
    ├── context/            # Global state (AuthContext.tsx)
    ├── src/components/     # Reusable UI components
    ├── theme/              # Design tokens (colors, layout, spacing, typography)
    └── hooks/              # Custom React hooks
```

## 🛠️ Tech Stack

Framework: React Native & Expo

Navigation: Expo Router

Language: TypeScript

State Management: React Context API
