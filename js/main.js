document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileBtn.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Sticky Header Effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Gallery Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add to clicked
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    item.style.display = 'block';
                    // Re-trigger masonry/layout if using a library, but CSS columns handle this mostly auto
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Lightbox Functionality (Enhanced)
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <span class="lightbox-close">&times;</span>
        <img src="" alt="Full view">
        <div class="lightbox-caption"></div>
    `;
    document.body.appendChild(lightbox);

    const galleryImages = document.querySelectorAll('.gallery-grid-masonry img, .lightbox-trigger');
    const lightboxImg = lightbox.querySelector('img');
    const lightboxCap = lightbox.querySelector('.lightbox-caption');
    const lightboxClose = lightbox.querySelector('.lightbox-close');

    // Use event delegation for dynamic gallery items if needed, or attach to existing
    const attachLightbox = () => {
        document.querySelectorAll('.gallery-item img, .lightbox-trigger').forEach(img => {
            img.addEventListener('click', e => {
                e.preventDefault();
                const src = img.getAttribute('src');
                const caption = img.getAttribute('alt');
                lightboxImg.src = src;
                lightboxCap.textContent = caption || '';
                lightbox.classList.add('active');
            });
        });
    };

    attachLightbox();
    // Re-attach if we dynamically load items (not doing that yet, but good practice)

    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });

    // Form Submissions
    // Removed JS hijack to allow Formspree standard submission
    // const forms = document.querySelectorAll('form'); ...
});
