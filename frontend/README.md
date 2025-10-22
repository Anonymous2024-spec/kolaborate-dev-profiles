# Personal Finance Dashboard

![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=flat&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB)
![Tailwind CSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=flat&logo=tailwind-css&logoColor=white)

A modern personal finance management dashboard built with:

- ⚡ **Vite** for ultra-fast development
- 🎨 **Tailwind CSS** + **Shadcn/ui** for beautiful, accessible components
- 🗺️ **React Router** for navigation
- 🧩 **Zustand** for state management

## Why JavaScript?

While TypeScript was the client's preference, this project uses **JavaScript** because:
1. It's the language I'm currently most proficient in
2. Allows faster initial development for Phase 1
3. Can be migrated to TypeScript incrementally

## Getting Started

### Installation
```bash
npm install

Key Features
✅ Modern Vite + React setup
✅ Tailwind CSS with proper configuration
✅ Shadcn/ui component library
✅ Clean routing structure
✅ Path aliases (@/ for src/)

src/
├── components/    # Reusable components
├── lib/           # Utilities (cn() for Shadcn)
├── pages/         # Route pages
├── routes/        # Router configuration
├── App.jsx        # Main app
└── main.jsx       # Entry point

Dependencies
react-router-dom - Routing

zustand - State management

axios + swr - API handling

tailwindcss + shadcn/ui - Styling

