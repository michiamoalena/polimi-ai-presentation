

# Interactive Presentation App — Implementation Plan

## Overview
A 12-slide presentation app with real-time mobile polling, glassmorphism design, and inline text editing. Two routes: `/` (presentation) and `/poll` (mobile audience).

## Architecture

```text
/                          /poll
┌─────────────────┐       ┌──────────────────┐
│  Presentation    │       │  Mobile Poll      │
│  12 slides       │◄─────►│  5-step form      │
│  Live charts     │  RT   │  Framer Motion    │
│  Arrow nav       │       │  swipe transitions│
└────────┬────────┘       └────────┬─────────┘
         │                         │
         └────── Supabase ─────────┘
           poll_responses table
           Realtime subscriptions
```

## Backend: Supabase

**Table: `poll_responses`**
- `id` (uuid), `created_at`, `role` (text), `status` (text), `uses_ai` (boolean), `ai_tools` (text[]), `ai_no_reason` (text)

**Realtime**: Presentation subscribes to INSERT events on `poll_responses`. Aggregates counts client-side for charts.

## Design System

- **Background**: White base + animated gradient orbs (orange/pink/violet, blur-3xl, animated position)
- **GlassPanel**: `bg-white/70 backdrop-blur-xl border border-white/50 shadow-2xl rounded-2xl`
- **Typography**: Inter font, headings 4xl-6xl bold dark text for max contrast, body xl-2xl
- **Slides render at 1920x1080**, scaled to fit viewport via CSS transform
- **Colors**: Vibrant gradient accents (orange-500, pink-500, violet-500, fuchsia-500)

## Slides (12 total)

| # | Title | Type |
|---|-------|------|
| 1 | Title: "Meta & Techno Skills..." | Text only on gradient bg |
| 2 | QR Code + "Let's Connect!" | GlassPanel, QR + live counter |
| 3 | Live Results | 3-column charts (Recharts) |
| 4 | "You are the Director, AI is your Buddy" | Content + bullet points |
| 5 | "Phase 0 — Voice-to-Text Brainstorm" | Content + WhisperFlow CTA |
| 6 | "Your Software Stack" | Table layout in GlassPanel |
| 7 | "Gemini — Your Professional Hub" | Content + steps |
| 8 | "Architectural Prompting (The Cheat Code)" | Formula + tips |
| 9 | "Editing without Photoshop" | Content + tool tips |
| 10 | "Official Docs & Tutorials" | Link buttons grid |
| 11 | "In the Next Episode..." | Teaser list |
| 12 | "The Ultimate AI Coach Prompt" | Copyable prompt block |

## Inline Text Editing

All slide text stored in a `slideContent` state object. Clicking any text field makes it editable (contentEditable or input overlay). Changes persist in React state during the session. This lets you tweak wording live.

## Mobile Poll (`/poll`)

- Multi-step flow with Framer Motion AnimatePresence (slide transitions)
- One question per screen, tap answer → 400ms highlight → auto-advance
- Vibrant gradient background, large touch-friendly buttons
- Step 5: Thank you screen + submit to Supabase
- Branching: "Do you use AI?" → Yes → "Which tools?" / No → "Why not?"

## File Structure

```text
src/
  components/
    presentation/
      SlideContainer.tsx      # 1920x1080 scaling + navigation
      GlassPanel.tsx          # Reusable glass card
      AnimatedBackground.tsx  # Gradient orbs
      EditableText.tsx        # Inline text editing
      slides/
        TitleSlide.tsx         # Slide 1
        QRCodeSlide.tsx        # Slide 2 (uses qrcode.react)
        LiveResultsSlide.tsx   # Slide 3 (Recharts)
        DirectorSlide.tsx      # Slide 4
        VoiceBrainstormSlide.tsx # Slide 5
        SoftwareStackSlide.tsx # Slide 6
        GeminiSlide.tsx        # Slide 7
        PromptingSlide.tsx     # Slide 8
        EditingSlide.tsx       # Slide 9
        DocsSlide.tsx          # Slide 10
        TeaserSlide.tsx        # Slide 11
        CoachPromptSlide.tsx   # Slide 12
    poll/
      PollFlow.tsx            # Multi-step controller
      PollStep.tsx            # Single question UI
      PollSuccess.tsx         # Thank you screen
  hooks/
    usePollData.ts            # Supabase realtime subscription
    useSlideNavigation.ts     # Arrow keys + click navigation
  pages/
    Index.tsx                 # Presentation route
    Poll.tsx                  # Mobile poll route
  lib/
    supabase.ts               # Supabase client
```

## Dependencies to Add
- `framer-motion` — slide transitions + poll animations
- `recharts` — already available via chart.tsx
- `qrcode.react` — QR code generation
- Supabase client (via Lovable integration)

## Navigation
- Arrow keys (left/right) to navigate slides
- Semi-transparent nav arrows at bottom-right
- Slide counter indicator (e.g. "3 / 12")

## Implementation Order
1. Supabase table + realtime setup
2. Core layout (AnimatedBackground, GlassPanel, SlideContainer, EditableText)
3. All 12 slides with editable text
4. Mobile poll flow (`/poll`)
5. Live data connection (poll → Supabase → charts)

