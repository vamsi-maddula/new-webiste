# NovaSphere — Modern Website Template

A complete, production-ready, responsive website built from scratch with **vanilla HTML5, CSS3, and JavaScript**. Zero build tools or package managers required.

---

## 🚀 Quick Start

### 1. View in Browser
Simply open the `index.html` file in any modern web browser (Google Chrome, Safari, Firefox, Edge, Brave):
- **On macOS**: Double-click `index.html` or run:
  ```bash
  open index.html
  ```
- **On Windows**:
  ```cmd
  start index.html
  ```

### 2. Run with a Local Web Server (Optional)
If you prefer running a local development server with live reloads:
```bash
# Using Python 3:
python3 -m http.server 8000

# Or using npx serve:
npx serve .
```
Then visit `http://localhost:8000` in your browser.

---

## 📁 Project Structure

```text
sample project/
├── index.html       # Semantic HTML5 layout & structure
├── styles.css       # Responsive CSS with Dark/Light mode tokens
├── script.js        # Interactive JS (theme toggle, mobile nav, FAQ, form)
└── README.md        # Documentation and deployment instructions
```

---

## ✨ Features Included

- 🌓 **Theme Switcher**: Dark and Light mode toggle with automatic persistence via `localStorage` and system preference detection.
- 📱 **Mobile-First Responsive Design**: Works seamlessly across mobile phones, tablets, and wide desktop screens.
- 🍔 **Mobile Drawer Menu**: Smooth hamburger navigation drawer with animated toggle icon.
- ⚡ **Zero Dependencies**: Pure HTML, CSS, and JavaScript. Lightning-fast performance with no external frameworks.
- 🎯 **Interactive Accordion FAQ**: Smoothly expandable/collapsible questions.
- ✉️ **Contact Form Validation**: Real-time form feedback, required field checks, email format validation, and animated success toast notifications.
- 🎨 **Modern Design Aesthetics**: Glassmorphism cards, subtle drop shadows, fluid typography, and clean color palettes.

---

## 🎨 Customizing Your Website

### Changing Brand Colors
Open `styles.css` and modify the CSS variables in the `:root` block:
```css
:root {
  --primary: #3b82f6;          /* Primary brand accent */
  --accent: #8b5cf6;           /* Gradient secondary color */
  --font-family: 'Inter', ...; /* Typography */
}
```

### Adding New Sections
1. Add a new `<section id="your-section" class="section">` in `index.html`.
2. Add a navigation link in the `<nav class="nav-menu">`:
   ```html
   <a href="#your-section" class="nav-link">Your Section</a>
   ```
The scroll spy script will automatically highlight the active link as you scroll!

---

## 🌐 Free Deployment Options

1. **Netlify Drop**:
   - Go to [app.netlify.com/drop](https://app.netlify.com/drop)
   - Drag & drop this project folder to get a live URL in seconds.

2. **GitHub Pages**:
   - Push this directory to a GitHub repository.
   - Go to **Settings** > **Pages** > Select branch `main` and root `/` > Click **Save**.

3. **Vercel**:
   - Run `npx vercel` in the terminal or import your GitHub repo directly into Vercel.

