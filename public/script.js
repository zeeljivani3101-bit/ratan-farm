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

// DOM Elements to Update
document.addEventListener("DOMContentLoaded", () => {
    // Inject Configuration Data
    document.querySelectorAll(".config-name").forEach(el => el.textContent = config.name);
    document.querySelectorAll(".config-phone").forEach(el => el.textContent = config.phone);
    document.querySelectorAll(".config-phone-href").forEach(el => el.href = `tel:${config.phone}`);
    document.querySelectorAll(".config-whatsapp-href").forEach(el => el.href = `https://wa.me/${config.whatsapp.replace(/\D/g, '')}`);
    document.querySelectorAll(".config-email").forEach(el => el.textContent = config.email);
    document.querySelectorAll(".config-email-href").forEach(el => el.href = `mailto:${config.email}`);
    document.querySelectorAll(".config-address").forEach(el => el.textContent = config.address);
    const mapEl = document.querySelector(".config-map");
    if (mapEl) {
        mapEl.src = config.mapUrl;
    }

    // Social Links
    document.querySelector(".config-instagram").href = config.social.instagram;

    // Stats Update (with Animation support)
    const capacityStat = document.querySelector(".stat-capacity");
    if (capacityStat) {
        capacityStat.dataset.target = config.stats.capacity;
        document.querySelector(".stat-parking").dataset.target = config.stats.parking;
        document.querySelector(".stat-events").dataset.target = config.stats.events;
    }

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
                // Trigger counters if it's the counter section
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

    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 50
    });

    // Form Submission (WhatsApp Integration)
    const form = document.getElementById('bookingForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const eventDate = document.getElementById('eventDate').value;
            const guests = document.getElementById('guests').value;
            const message = document.getElementById('message').value;

            const waText = `નમસ્કાર, મારે બુકિંગ વિશે માહિતી જોઈએ છે.%0A%0A*નામ:* ${name}%0A*મોબાઇલ:* ${phone}%0A*તારીખ:* ${eventDate}%0A*મહેમાનોની સંખ્યા:* ${guests}%0A*વધુ માહિતી:* ${message}`;

            const waUrl = `https://wa.me/${config.whatsapp.replace(/\D/g, '')}?text=${waText}`;
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
