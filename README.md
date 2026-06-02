# 🛠️ Chrono Service — Professional Web Platform

A corporate, modern, and minimalist web platform optimized with a clean aesthetic, readable typography, and a fully responsive design. The interface implements advanced visual layouts like a Bento Grid for capabilities, an immersive dynamic viewport for the portfolio, and an interactive step-by-step budget calculator. 

I built this project to master native frontend architecture, layout precision, and asynchronous client-side logic.

## 📦 Technologies

- `HTML5` (Advanced Semantic Structure)
- `CSS3` (CSS Grid, Flexbox, Animations)
- `JavaScript` (Vanilla JS)
- `Google Fonts` (Afacad Typography)

## 🦄 Features

Here's what you can do with Chrono Service:

- **Integrated Bento Grid Layout**: Asymmetric, high-impact visual organization for the Capabilities and Gallery sections.
- **Interactive Immersive Viewport**: A dynamic panel in the gallery triggered via JavaScript to display technical details of selected projects.
- **Advanced Budget Calculator**: A guided step-by-step form with real-time data validation, custom selectors, range sliders, and a subtle floating sticky receipt that calculates investment asynchronously.
- **Dynamic Routing & Mapping**: A dedicated contact section equipped with a control panel to trace routes and transport modes to the corporate headquarters.
- **Clean CSS Architecture**: Decoupled and modular styles based on global variables (`:root`) to ensure scalable color themes and easy maintenance.

### 🎨 Design Customization:
The platform's visual identity is centralized. Modifying the global tokens in `variables.css` instantly updates contrasts, buttons, and layouts across the entire site:
```css
:root {
  --color-primary: #456084;   /* Highlights, buttons, and links */
  --color-secondary: #516176; /* Secondary text and hover states */
  --color-tertiary: #DBE4E7;  /* Divider lines and subtle borders */
  --color-neutral: #F1F4F6;   /* Card backgrounds and containers */
  --color-main: #F8F9FB;      /* Clean main background */
}
