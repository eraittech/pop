# Hey Pop Chips — Static HTML/CSS/JS Frontend Mockup

## Original Problem Statement
Create a premium, modern, responsive corporate website for Hey Pop Chips (heypopchips.com).
- Inspired by popchips.co.uk but original UI
- NOT eCommerce — discovery, brand, store locator, online marketplace links, social
- User chose option B: Static HTML/CSS/JS frontend mockup (PHP/MySQL hosted elsewhere by user)
- User chose option B for Google Maps: Wait for API key — implemented with Leaflet/OpenStreetMap as placeholder
- User chose options a+b for Instagram: Embed-ready + static gallery
- User chose option a for Admin: JWT-based custom auth (mockup login UI only)
- User chose option a for Scope: Full user-facing site + basic admin CRUD UI

## Architecture
- Pure HTML5 + CSS3 + Vanilla JavaScript (no framework)
- CDN libraries: Swiper 11, GSAP 3.12.5 + ScrollTrigger, Leaflet 1.9.4, Font Awesome 6.5.1
- Google Fonts: Montserrat (headings) + Poppins (body)
- Header/footer loaded via fetch from `/partials/` (port to PHP `include`)
- Stored at `/app/frontend/public/` and served by the React dev server as static files
- React entry `/app/frontend/src/index.js` intentionally empty (no React mount)

## Color Palette
- Primary: #FFD600 (yellow)
- Secondary: #FF6B00 (orange)
- Accent: #00C853 (green)
- Background: #FDFCF0 (warm off-white)
- Text: #1A1A1A

## Pages Implemented (2026-02-12)
- `index.html` — Home: hero with floating chips, product highlights, why us bento, ingredients, marketplaces, locator preview stats, Instagram tiles, testimonials swiper, newsletter, footer
- `about.html` — Company story, mission, vision, manufacturing, quality, promise, stats
- `products.html` — 7 flavors with filter chips (all/classic/spicy/tangy/cheesy/vegan)
- `product-detail.html` — Peri Peri detail page: sticky image, ingredients, nutrition table, health benefits, related products
- `store-locator.html` — Leaflet map + search by city/state/pincode + store type filters + 12 mock stores
- `available-online.html` — Marketplace cards (Blinkit, Zepto, Swiggy Instamart, Amazon, Flipkart, BigBasket, Google Shopping)
- `vending-machines.html` — Dedicated vending locator with map + 8 mock machines + partner CTA
- `social.html` — Social platform cards + Instagram-style gallery grid
- `contact.html` — Contact form (localStorage stub), HQ map, FAQ accordion
- `404.html` — Branded 404 page
- `admin/index.html` — Admin login mockup (demo credentials pre-filled)
- `admin/dashboard.html` — Full admin SPA with 12 sections: Dashboard, Products, Categories, Stores, Vending, Marketplaces, Testimonials, Enquiries, Instagram, Media Library, SEO, Settings

## Features
- Sticky animated header (transparent on hero, glassmorphism on scroll)
- Mobile drawer navigation
- Hero floating chips with GSAP yoyo animations
- AOS-lite scroll reveal via IntersectionObserver
- Counter animations for stats
- Swiper testimonial carousel with autoplay
- Leaflet maps with custom branded pin markers (yellow/orange/green by category)
- Filter chips for products and store types
- Newsletter form (localStorage stub)
- Cookie consent banner
- Back-to-top button
- Page loader animation
- robots.txt + sitemap.xml
- 404 page

## Mock Data
- 7 products: Sea Salt, Tangy Tomato, Cream & Onion, Peri Peri, Cheese Burst, Sweet Chili, Salt & Pepper
- 12 stores across Mumbai, Delhi NCR, Bengaluru, Hyderabad, Chennai, Pune, Gurugram
- 8 vending machines: airports, offices, gyms, metro stations
- 6 online marketplaces + 3 quick-commerce platforms

## Tech Notes for PHP Migration
- All HTML files are independent and use `<div data-include="header"></div>` and `<div data-include="footer"></div>` for partials. Replace with `<?php include 'partials/header.php'; ?>` etc.
- Mock data in `<script>` blocks at the bottom of `store-locator.html` and `vending-machines.html` should be replaced with PHP-rendered JSON from MySQL.
- Contact form saves to `localStorage` — replace `<form>` action with PHP POST handler.
- Admin login is a mock that sets `sessionStorage` — replace with real PHP session + bcrypt + CSRF.

## P0 Remaining (PHP backend handoff)
- Implement PHP/MySQL CRUD endpoints for Products, Categories, Stores, Vending, Marketplaces, Testimonials, Enquiries, Settings
- Wire admin forms (currently no-ops) to real endpoints
- Replace Leaflet/OSM with Google Maps API when key is provided (swap the `<script src=>` + map init lines)
- Connect Instagram embed/API to real `@heypopchips` handle

## P1 Backlog
- Product image uploads (admin media library is visual mockup)
- CSV import for stores
- Real Instagram Graph API integration
- Email notifications for new enquiries
- Google Analytics integration
- Multi-language support
- Search functionality (header search button)

## P2 Nice-to-haves
- Schema.org structured data for products
- Lottie loading animations
- AR product preview (3D chip pack viewer)
- Loyalty program integration
- WhatsApp Business Chat widget
