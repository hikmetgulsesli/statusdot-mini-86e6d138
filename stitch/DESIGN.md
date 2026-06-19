---
name: StatusDot Mini
colors:
  surface: '#031427'
  surface-dim: '#031427'
  surface-bright: '#2a3a4f'
  surface-container-lowest: '#000f21'
  surface-container-low: '#0b1c30'
  surface-container: '#102034'
  surface-container-high: '#1b2b3f'
  surface-container-highest: '#26364a'
  on-surface: '#d3e4fe'
  on-surface-variant: '#c6c6cd'
  inverse-surface: '#d3e4fe'
  inverse-on-surface: '#213145'
  outline: '#909097'
  outline-variant: '#45464d'
  surface-tint: '#bec6e0'
  primary: '#bec6e0'
  on-primary: '#283044'
  primary-container: '#0f172a'
  on-primary-container: '#798098'
  inverse-primary: '#565e74'
  secondary: '#4edea3'
  on-secondary: '#003824'
  secondary-container: '#00a572'
  on-secondary-container: '#00311f'
  tertiary: '#ffb95f'
  on-tertiary: '#472a00'
  tertiary-container: '#251400'
  on-tertiary-container: '#b47300'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#031427'
  on-background: '#d3e4fe'
  surface-variant: '#26364a'
typography:
  headline-sm:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: -0.01em
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: '0'
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 12px
    letterSpacing: 0.05em
  mono-data:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: '0'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  container-padding: 12px
  element-gap: 8px
  stack-tight: 4px
  grid-gutter: 12px
---

## Brand & Style

The design system is engineered for high-density information environments, specifically tailored for system monitoring and developer utilities. The brand personality is clinical, precise, and unobtrusive, prioritizing functional clarity over decorative flair. 

The aesthetic follows a **Modern Corporate/Technical** style with a focus on systematic rigor. It draws inspiration from hardware diagnostic interfaces and advanced IDEs, where every pixel serves a purpose. The UI should evoke a sense of calm reliability, using a muted foundational palette to ensure that the primary status indicators—Ready, Warn, and Fail—are immediately visible without visual competition.

## Colors

The color system is rooted in a deep Slate Gray foundation to minimize eye strain during long-term monitoring. The primary background uses a very dark slate, while UI surfaces are layered using subtle shifts in tonal value.

Semantic colors are the lifeblood of this design system:
- **Emerald (Ready):** Used exclusively for healthy states and successful pings.
- **Amber (Warn):** Indicates latency or non-critical issues.
- **Rose (Fail):** High-visibility red for critical failures or disconnected states.
- **Slate (Neutral/UI):** Various weights of slate are used for borders, secondary text, and inactive states to maintain a low-noise environment.

## Typography

This design system utilizes **Inter** for its exceptional legibility at small scales and neutral tone. It is paired with **JetBrains Mono** for data-heavy strings, timestamps, and status labels to reinforce the technical utility aesthetic.

Type scales are kept intentionally small to facilitate high-density layouts. Letter spacing is slightly tightened on headlines to maintain a compact feel, while labels use all-caps with increased tracking for clear categorization of status groups.

## Layout & Spacing

The layout philosophy is built on a **4px rigid grid** to ensure precision in small-scale components. The system favors a compact "Dashboard" approach where multiple status containers are tiled across the screen.

- **Desktop:** Uses a 12-column fluid grid with small 12px gutters, allowing for a high volume of small cards.
- **Mobile:** Reflows to a single column, maintaining 12px horizontal margins.
- **Density:** Padding is minimized; vertical stack spacing typically defaults to 4px or 8px to maximize information per square inch.

## Elevation & Depth

Depth in the design system is achieved through **Tonal Layering** rather than traditional shadows. This keeps the interface feeling "flat" and focused. 

1. **Level 0 (Background):** Deep Slate `#0F172A`.
2. **Level 1 (Card/Surface):** Slightly lighter Slate `#1E293B` with a subtle 1px border of `#334155`.
3. **Level 2 (In-set/Active):** Higher contrast backgrounds for active inputs or highlighted rows.

Shadows, if used, are extremely subtle (2-4px blur, 10% opacity) and only applied to modal overlays or floating tooltips to separate them from the grid.

## Shapes

The design system uses a **Soft** shape language. A 4px (`0.25rem`) corner radius is applied to cards, buttons, and input fields. This provides just enough softness to prevent the UI from feeling aggressive, while maintaining the structured, technical look of a professional tool. Status dots themselves are the only perfectly circular elements, making them stand out against the rectangular grid.

## Components

### Status Dots
The core component. A 10px circle. 
- **Ready:** Solid Emerald with a soft outer glow.
- **Warn:** Solid Amber with a slow pulse animation.
- **Fail:** Solid Rose with a 1px white inner ring for maximum contrast.

### Small-Scale Cards
Used for individual service monitoring. They feature a 1px border, 12px internal padding, and a "Label-Caps" header.

### Compact Tables
Rows have a fixed height of 32px. No vertical borders; only 1px horizontal dividers. Monospaced font is used for numerical data and status codes.

### Toggle Controls
Small, low-profile switches. When "On," they use the primary slate color rather than a bright brand color, keeping the focus on the actual status indicators elsewhere in the UI.

### Input Fields
Dark backgrounds with subtle borders. Focus states are indicated by a 1px Emerald border, signaling the field is "Ready" for input.