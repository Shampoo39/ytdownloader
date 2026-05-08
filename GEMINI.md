# TubeGrab - Project Guidelines

## 🎯 Overview
TubeGrab is a premium, cinematic YouTube video downloader. Phase 1 focuses on a high-fidelity frontend prototype with a modern dark UI, glassmorphism, and red accent glows.

## 🎨 Design System

### Theme & Colors
- **Background:** Very dark cool slate (`220 20% 6%`)
- **Card:** Elevated dark (`220 18% 10%`) with 80% opacity for glass effect.
- **Primary Accent:** Vivid red (`0 72% 51%`) — used for glows, buttons, and highlights.
- **Border:** Subtle slate (`220 14% 18%`).

### Typography
- **Display/Headings:** `Space Grotesk` (600–700 weight).
- **Body:** `Inter` (400–500 weight).

### Custom Utilities (Tailwind)
- `.glow-red`: Strong red box-shadow halo.
- `.glow-red-sm`: Subtle red glow for focused states/buttons.
- `.glass-card`: Background blur (12px) + subtle border + translucent card color.
- `.gradient-text`: Red linear gradient for hero accents.

## 🏗️ Technical Stack
- **Framework:** React 18 (Vite + TypeScript).
- **Styling:** Tailwind CSS (Vanilla CSS approach for custom utilities).
- **Icons:** Lucide React.
- **Components:** Extended Shadcn-like architecture using `class-variance-authority`.

## 🛠️ Workflows

### Component Architecture
- Place all reusable UI primitives in `src/components/ui`.
- Feature-specific components (e.g., `UrlInput`, `VideoPreview`) live in `src/components`.
- Always use `cn()` utility for merging Tailwind classes.

### Styling Rules
- **NO hardcoded hex colors.** Use semantic HSL tokens (e.g., `hsl(var(--primary))`).
- Prefer `glass-card` for container elements to maintain the premium cinematic aesthetic.
- Use `animate-slide-up` for entry transitions on new content.

### Mock Data
- Use `MOCK_VIDEO` in `src/pages/Index.tsx` for previewing.
- Simulate API latency with a 1500ms `setTimeout` during the loading phase.

## 🚀 Getting Started
1. `npm install`
2. `npm run dev`
3. `npm run build` (to verify TypeScript and production integrity)
