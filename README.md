# Project Name : GameForge Catalogue

## 🏠 About
GameForge Catalogue is a simple e-shop for digital games that let users purchase the game goods conveniencely. It focus on a simple but user-friendly interface with filter, highlight, and responsiveness between devices.

## 🚀 Key Features
- **Dynamic Data Rendering:** Items are asynchronously loaded from artifacts.json and rendered as responsive cards.
- **Advanced Filtering System:**
    - **Category Filter:** Automatically generates a unique list of categories from the source data, including an "All Categories" option that will display all the cards.
    - **Real-time Search Highlighting:** Highlighting the card by a case-insensitive searching feature without hiding non-matches.
- **Interactive Shopping Cart:**
    - Incrementing the total item added in the card and displaying in the header.
    - A "Reset Cart" feature with a safety confirmation- only reset the cart after confirming.
- **Dual-Theme Support:** To build a user-friendly interface, implementing to multi-environment. There is a "Light/Dock Mode" toggle for synchronized transitions of backgrounds, text, and card elements.

- **Basic Responsiveness:** Utilizes CSS Grid and Media Queries to ensure the layout remains usable and aesthetic across mobile, tablet, and desktop devices.

## 📂 Project Structure
```bash
.
├── index.html          # Main page structure and accessibility labels
├── styles.css          # Theming, grid layouts, and media queries
├── script.js           # Filtering logic, search, and cart functionality
├── artifacts.json      # Backend data simulation
└── images/             # Local directory for asset thumbnails
```

## 💻 Quick Start
1. Clone or download this repository.
2. Ensure all files remain in the same root directory level.
3. Open <span style="color: orange">index.html</span> in a web browser.
