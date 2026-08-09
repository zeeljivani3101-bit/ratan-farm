// Business Configuration
const config = {
    name: "રતન ફાર્મ",
    nameEnglish: "Ratan Farm",
    phone: "+919876543210",
    whatsapp: "+919876543210",
    email: "info@ratanfarm.com",
    address: "રતન ફાર્મ, એસ.જી. હાઇવે, અમદાવાદ, ગુજરાત",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.391515904005!2d72.5020!3d23.0450!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDAyJzQyLjAiTiA3MsKwMzAnMDcuMiJF!5e0!3m2!1sen!2sin!4v1614249112423!5m2!1sen!2sin",
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

// DOM Elements to Update
document.addEventListener("DOMContentLoaded", () => {
    // Inject Configuration Data
    document.querySelectorAll(".config-name").forEach(el => el.textContent = config.name);
    document.querySelectorAll(".config-phone").forEach(el => el.textContent = config.phone);
    document.querySelectorAll(".config-phone-href").forEach(el => el.href = `tel:${config.phone}`);
    document.querySelectorAll(".config-whatsapp-href").forEach(el => el.href = `https://wa.me/${config.whatsapp.replace('+', '')}`);
    document.querySelectorAll(".config-email").forEach(el => el.textContent = config.email);
    document.querySelectorAll(".config-email-href").forEach(el => el.href = `mailto:${config.email}`);
    document.querySelectorAll(".config-address").forEach(el => el.textContent = config.address);
    document.querySelector(".config-map").src = config.mapUrl;
    
    // Social Links
    document.querySelector(".config-instagram").href = config.social.instagram;
    document.querySelector(".config-facebook").href = config.social.facebook;
    document.querySelector(".config-youtube").href = config.social.youtube;
    
    // Stats Update (with Animation support)
    document.querySelector(".stat-capacity").dataset.target = config.stats.capacity;
    document.querySelector(".stat-parking").dataset.target = config.stats.parking;
    document.querySelector(".stat-events").dataset.target = config.stats.events;

    // Counter Animation Logic
    const counters = document.querySelectorAll('.counter-number');
    const speed = 200;

    const startCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target + "+";
                }
            };
            updateCount();
        });
    };

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px"
    };

    let countersStarted = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                
                // Trigger counters if it's the counter section
                if (entry.target.classList.contains('counters') && !countersStarted) {
                    startCounters();
                    countersStarted = true;
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll, .counters').forEach(el => {
        observer.observe(el);
    });

    // Form Submission (WhatsApp Integration)
    const form = document.getElementById('bookingForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const eventType = document.getElementById('eventType').value;
            const eventDate = document.getElementById('eventDate').value;
            const guests = document.getElementById('guests').value;
            const message = document.getElementById('message').value;

            const waText = `નમસ્કાર, મારે બુકિંગ વિશે માહિતી જોઈએ છે.%0A%0A*નામ:* ${name}%0A*મોબાઇલ:* ${phone}%0A*પ્રસંગ:* ${eventType}%0A*તારીખ:* ${eventDate}%0A*મહેમાનોની સંખ્યા:* ${guests}%0A*વધુ માહિતી:* ${message}`;
            
            const waUrl = `https://wa.me/${config.whatsapp.replace('+', '')}?text=${waText}`;
            window.open(waUrl, '_blank');
        });
    }

    // Lightbox Functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');

    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', (e) => {
            const imgSrc = item.querySelector('img').src;
            lightboxImg.src = imgSrc;
            lightbox.classList.add('active');
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            lightbox.classList.remove('active');
        });
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
            }
        });
    }

    // Sticky Navbar
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 15px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
});
