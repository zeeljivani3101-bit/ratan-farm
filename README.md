# Gujarati Party Plot Website

A modern, responsive, single-page static website for a Gujarati Party Plot / Wedding Venue. 
Built using HTML5, CSS3, JavaScript, Bootstrap 5, and FontAwesome.

## Features
- Fully responsive on all devices
- Premium design with Dark Green, Maroon, and Gold color scheme
- Glassmorphism effects and smooth scrolling animations
- Gujarati content for localized audience
- Configurable business details from a single JavaScript object
- Direct WhatsApp booking integration
- Modern Image Gallery with Lightbox

## How to Configure

To update the website with your actual Party Plot information, open `script.js` and edit the `config` object at the top of the file:

```javascript
const config = {
    name: "રતન ફાર્મ",
    nameEnglish: "Ratan farm",
    phone: "+919067702502",
    whatsapp: "+918511815615",
    email: "ratanfarm@gmail.com",
    address: "રતન ફાર્મ મોટા વરાછા સુરત",
    mapUrl: "YOUR_GOOGLE_MAPS_EMBED_URL",
    social: {
        instagram: "https://instagram.com/",
        facebook: "https://facebook.com/",
        youtube: "https://youtube.com/"
    },
    stats: {
        capacity: 1500,
        parking: 500,
        events: 1200
    }
};
```

Everything else on the website will automatically update based on these values!

## How to Deploy to Netlify

Since this is a fully static website with no backend, deploying it to Netlify is extremely simple:

1. Create an account on [Netlify](https://www.netlify.com/).
2. Drag and drop the `party-plot-website` folder directly into the Netlify deployment area.
3. Your website will be live in seconds!

## Modifying Images

All images are stored in the `images/` directory.
- `hero.jpg`: Background image for the top section.
- `venue.jpg`: Used in the About section and gallery.
- `stage.jpg`, `decoration.jpg`, `dining.jpg`, `outdoor.jpg`: Used in Events and Gallery sections.

To replace an image, simply overwrite the existing file with your new image, keeping the exact same filename.
