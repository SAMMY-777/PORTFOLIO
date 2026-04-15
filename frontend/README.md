# 📊 Data Analyst Portfolio

A modern, animated, dark-themed portfolio for a Data Analyst.  
Built with **React 18** and pure CSS (no Tailwind dependency needed).

---

## 🚀 Quick Start

```bash
# 1. Create a new React app
npx create-react-app data-analyst-portfolio
cd data-analyst-portfolio

# 2. Replace src/App.js with DataAnalystPortfolio.jsx content
# (copy the full component into src/App.js)

# 3. Update src/index.js to import App.js as usual

# 4. Start the dev server
npm start
```

---

## 📁 Project Structure

```
src/
├── App.js              ← Main portfolio component (all-in-one)
├── index.js            ← Entry point
public/
├── index.html          ← Standard CRA HTML
```

All data (skills, projects, experience) lives at the top of `App.js` in plain arrays — easy to edit.

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Background | `#060b14` |
| Surface | `#0d1526` |
| Accent 1 | `#06B6D4` (Cyan) |
| Accent 2 | `#8B5CF6` (Purple) |
| Accent 3 | `#EC4899` (Pink) |
| Text primary | `#f1f5f9` |
| Text muted | `#64748b` |
| Font display | Syne (Google Fonts) |
| Font body | Space Grotesk |
| Font mono | JetBrains Mono |

---

## ✏️ Customisation

### Change personal info
Edit the hero section in `App.js`:
- Name: Search for `"Alex Morgan"` and replace
- Role titles: Edit the `strings` array in the `Typewriter` component
- Stats: Update the `["5+", "Years Experience"]` array

### Add/remove projects
Edit the `PROJECTS` array at the top of `App.js`:
```js
{
  title: "Your Project Title",
  desc: "What you did and how.",
  tools: ["Python", "SQL", "Tableau"],
  impact: "Quantified result",
  type: "Dashboard" | "Machine Learning" | "Analytics" | "Case Study",
  color: "#HEX",   // accent color for the card
}
```

### Add skills
Edit the `SKILLS` array:
```js
{ name: "Spark", icon: "⚡", level: 75, color: "#F59E0B" }
```

---

## 📝 Sections

| Section | Description |
|---------|-------------|
| **Hero** | Name, animated typewriter role, CTA buttons, floating badges |
| **About** | Bio, tags, code snippet decoration |
| **Skills** | Animated progress bars for 8 skills + tool pills |
| **Experience** | Timeline-style cards for 3 roles |
| **Projects** | 6 project cards with hover effects, type badges, impact metrics |
| **Contact** | Contact form + info panel |
| **Footer** | Clean minimal footer |

---

## ⚙️ Features

- ✅ Sticky transparent → frosted-glass navbar on scroll
- ✅ Typewriter hero animation (cycles through 5 roles)
- ✅ Scroll-triggered fade-in for every section
- ✅ Animated skill progress bars (triggered on viewport entry)
- ✅ Animated stat counters
- ✅ Hover lift effect on project cards with glow shadow
- ✅ Timeline experience section
- ✅ Contact form with success state
- ✅ Floating hero badges
- ✅ Grid dot background
- ✅ Ambient glow blobs
- ✅ Custom scrollbar
- ✅ Google Fonts (Syne, Space Grotesk, JetBrains Mono)

---

## 📌 Notes / Assumptions

Since the source video could not be played directly:
1. Layout is based on a **two-column hero** (text left, avatar right) — extremely common in 2024-2025 dev portfolios.
2. Navbar is assumed to be **transparent → frosted glass** on scroll.
3. Dark theme with **cyan + purple** gradient accents — inferred from typical modern dev portfolios.
4. Skills section uses animated **horizontal progress bars** — a common pattern.
5. Experience section uses a **left-border timeline** — widely used.
6. Projects use a **3-column responsive card grid**.
7. Contact uses a **2-column layout** (info left, form right).
