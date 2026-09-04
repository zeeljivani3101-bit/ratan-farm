// =========================================================
// RATAN FARM (રતન ફાર્મ) - WEBSITE JAVASCRIPT & CONFIG
// =========================================================

// Business Configuration
const config = {
    name: "રતન ફાર્મ",
    nameEnglish: "Ratan Farm",
    phone: "+91 8511815615",
    whatsapp: "+91 7405401530",
    email: "ratanfarm@gmail.com",
    address: "સેરેટોન ટાવર ની બાજુ માં, ભરથાણા, ન્યૂ રિંગ રોડ, મોટા વરાછા, સુરત",
    mapUrl: "https://maps.google.com/maps?q=Ratan+Farm+Bharthana+New+Ring+Road+Mota+Varachha+Surat&t=&z=15&ie=UTF8&iwloc=&output=embed",
    social: {
        instagram: "https://www.instagram.com/ratan_farm_?igsi=MWl4dmRtbTkzMWU4bw==",
    },
    stats: {
        capacity: 3000,
        parking: 1000,
        events: 600
    }
};

// DOM Content Loaded Handler
document.addEventListener("DOMContentLoaded", () => {
    // 1. Inject Configuration Data
    document.querySelectorAll(".config-name").forEach(el => el.textContent = config.name);
    document.querySelectorAll(".config-phone").forEach(el => el.textContent = config.phone);
    document.querySelectorAll(".config-phone-href").forEach(el => el.href = `tel:${config.phone.replace(/\s+/g, '')}`);
    
    document.querySelectorAll(".config-whatsapp").forEach(el => el.textContent = config.whatsapp);
    document.querySelectorAll(".config-whatsapp-href").forEach(el => {
        el.href = `https://wa.me/${config.whatsapp.replace(/\D/g, '')}`;
    });
    
    document.querySelectorAll(".config-email").forEach(el => el.textContent = config.email);
    document.querySelectorAll(".config-email-href").forEach(el => el.href = `mailto:${config.email}`);
    document.querySelectorAll(".config-address").forEach(el => el.textContent = config.address);
    
    const mapEl = document.querySelector(".config-map");
    if (mapEl) {
        mapEl.src = config.mapUrl;
    }

    // Social Links
    const instaLink = document.querySelector(".config-instagram");
    if (instaLink) {
        instaLink.href = config.social.instagram;
    }

    // 2. Stats Update
    const capacityStat = document.querySelector(".stat-capacity");
    if (capacityStat) {
        capacityStat.dataset.target = config.stats.capacity;
        const parkingStat = document.querySelector(".stat-parking");
        if (parkingStat) parkingStat.dataset.target = config.stats.parking;
        const eventsStat = document.querySelector(".stat-events");
        if (eventsStat) eventsStat.dataset.target = config.stats.events;
    }

    // 3. Counter Animation Logic
    const counters = document.querySelectorAll('.counter-number');
    const speed = 120;

    const startCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target') || 0;
            let count = 0;
            const step = Math.max(1, Math.ceil(target / speed));

            const updateCount = () => {
                count += step;
                if (count < target) {
                    counter.innerText = count.toLocaleString();
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target.toLocaleString() + "+";
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
                if (entry.target.classList.contains('counters') && !countersStarted) {
                    startCounters();
                    countersStarted = true;
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.counters').forEach(el => {
        observer.observe(el);
    });

    // 4. Initialize AOS (Animate on Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 900,
            once: true,
            offset: 40
        });
    }

    // 5. Gallery Filter Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item-wrapper');

    if (filterButtons.length > 0 && galleryItems.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                galleryItems.forEach(item => {
                    const itemCategory = item.getAttribute('data-category');
                    if (filterValue === 'all' || itemCategory === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.95)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 250);
                    }
                });
            });
        });
    }

    // 6. Lightbox Functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');

    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (img && lightbox && lightboxImg) {
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt || "Gallery Image";
                lightbox.classList.add('active');
            }
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            if (lightbox) lightbox.classList.remove('active');
        });
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.classList.contains('lightbox-content-box')) {
                lightbox.classList.remove('active');
            }
        });
    }

    // 7. Sticky & Scrolled Navbar Glassmorphism
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 40) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // 8. Booking Form (WhatsApp Integration)
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nameEl = document.getElementById('name');
            const phoneEl = document.getElementById('phone');
            const dateEl = document.getElementById('eventDate');
            const guestsEl = document.getElementById('guests');
            const messageEl = document.getElementById('message');

            const name = nameEl ? nameEl.value.trim() : "";
            const phone = phoneEl ? phoneEl.value.trim() : "";
            const eventDate = dateEl ? dateEl.value : "";
            const guests = guestsEl ? guestsEl.value : "";
            const message = messageEl ? messageEl.value.trim() : "";

            const waText = `નમસ્કાર રતન ફાર્મ,%0A%0Aમારે પ્રસંગ માટે બુકિંગ વિશે વિગતવાર માહિતી જોઈએ છે:%0A%0A*નામ:* ${encodeURIComponent(name)}%0A*મોબાઇલ:* ${encodeURIComponent(phone)}%0A*તારીખ:* ${encodeURIComponent(eventDate)}%0A*મહેમાનોની સંખ્યા:* ${encodeURIComponent(guests)}%0A*સંદેશ / જરૂરિયાત:* ${encodeURIComponent(message || "કોઈ વધારાનો સંદેશ નથી")}%0A%0Aકૃપા કરીને ઉપલબ્ધતા અને વિગતો જણાવશો. આભાર!`;

            const waUrl = `https://wa.me/${config.whatsapp.replace(/\D/g, '')}?text=${waText}`;
            window.open(waUrl, '_blank');
        });
    }
});
