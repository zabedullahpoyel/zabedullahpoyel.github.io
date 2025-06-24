// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    }
});

// Gallery Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const loadMoreBtn = document.getElementById('load-more-btn');
    const galleryGrid = document.querySelector('.gallery-grid');

    // Function to show only first 9 items of a category
    function showFirstNineItems(category) {
        let visibleCount = 0;
        galleryItems.forEach((item, index) => {
            const itemCategory = item.getAttribute('data-category');
            if (category === 'all' || itemCategory === category) {
                if (visibleCount < 9) {
                    item.style.display = 'block';
                    item.style.animation = `fadeInUp 0.6s ease-out ${visibleCount * 0.1}s`;
                    visibleCount++;
                } else {
                    item.style.display = 'none';
                }
            } else {
                item.style.display = 'none';
            }
        });

        // Show/hide load more button based on whether there are more than 9 items
        const totalItemsInCategory = Array.from(galleryItems).filter(item => 
            category === 'all' || item.getAttribute('data-category') === category
        ).length;

        if (loadMoreBtn) {
            if (totalItemsInCategory > 9) {
                loadMoreBtn.style.display = 'block';
                loadMoreBtn.innerHTML = '<i class="fas fa-plus"></i> See More';
            } else {
                loadMoreBtn.style.display = 'none';
            }
        }
    }

    // Function to show all items of a category
    function showAllItems(category) {
        let visibleCount = 0;
        galleryItems.forEach((item, index) => {
            const itemCategory = item.getAttribute('data-category');
            if (category === 'all' || itemCategory === category) {
                item.style.display = 'block';
                item.style.animation = `fadeInUp 0.6s ease-out ${visibleCount * 0.1}s`;
                visibleCount++;
            } else {
                item.style.display = 'none';
            }
        });

        // Hide the load more button
        if (loadMoreBtn) {
            loadMoreBtn.style.display = 'none';
        }
    }

    // Track current category and expanded state
    let currentCategory = 'all';
    let isExpanded = false;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');
            currentCategory = filterValue;
            isExpanded = false;

            // Reset to show only first 9 items when filtering
            galleryGrid.classList.remove('show-all');
            showFirstNineItems(filterValue);
        });
    });

    // Load More functionality
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            isExpanded = true;
            galleryGrid.classList.add('show-all');
            showAllItems(currentCategory);
        });
    }

    // Initialize with first 9 items
    showFirstNineItems('all');
});

// Lightbox Functionality
function openLightbox(button) {
    const galleryItem = button.closest('.gallery-item');
    const img = galleryItem.querySelector('img');
    const title = galleryItem.querySelector('.gallery-info h3').textContent;
    const description = galleryItem.querySelector('.gallery-info p').textContent;

    document.getElementById('lightbox-image').src = img.src;
    document.getElementById('lightbox-title').textContent = title;
    document.getElementById('lightbox-description').textContent = description;

    document.getElementById('lightbox').style.display = 'flex';
}

// Close lightbox function
function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
    document.getElementById('lightbox-image').src = '';
    document.getElementById('lightbox-title').textContent = '';
    document.getElementById('lightbox-description').textContent = '';
}

// Attach event listeners after DOM is loaded
window.addEventListener('DOMContentLoaded', function() {
    // Close icon
    var closeIcon = document.querySelector('.close-lightbox');
    if (closeIcon) closeIcon.addEventListener('click', closeLightbox);
    // Close button
    var closeBtn = document.getElementById('lightbox-close-btn');
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    // Optional: Close lightbox when clicking outside the content
    var lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === this) closeLightbox();
        });
    }
});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Video Lightbox Functionality for videos.html
if (document.querySelector('.video-gallery-grid')) {
    const videoItems = document.querySelectorAll('.video-gallery-item');
    const lightbox = document.getElementById('video-lightbox');
    const closeBtn = lightbox.querySelector('.close-lightbox');
    const embedContainer = document.getElementById('video-embed-container');

    videoItems.forEach(item => {
        item.addEventListener('click', () => {
            const videoId = item.getAttribute('data-video-id');
            embedContainer.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
            
            lightbox.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    function closeVideoLightbox() {
        lightbox.style.display = 'none';
        embedContainer.innerHTML = '';
        document.body.style.overflow = 'auto';
    }

    closeBtn.addEventListener('click', closeVideoLightbox);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeVideoLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.style.display === 'block') {
            closeVideoLightbox();
        }
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .methodology-item, .stat-item, .contact-item, .gallery-item');
    animateElements.forEach(el => observer.observe(el));
});

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#00ff88' : type === 'error' ? '#ff4444' : '#00d4ff'};
        color: ${type === 'success' ? '#000' : '#fff'};
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 1000);
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Service card hover effects
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent);
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Observe stats section
const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Add loading animation to page
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add CSS for loading state
const loadingStyles = document.createElement('style');
loadingStyles.textContent = `
    body:not(.loaded) {
        overflow: hidden;
    }
    
    body:not(.loaded)::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #0a0a0a;
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    body:not(.loaded)::after {
        content: '';
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 50px;
        height: 50px;
        border: 3px solid #00ff88;
        border-top: 3px solid transparent;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        z-index: 10000;
    }
    
    @keyframes spin {
        0% { transform: translate(-50%, -50%) rotate(0deg); }
        100% { transform: translate(-50%, -50%) rotate(360deg); }
    }
`;

document.head.appendChild(loadingStyles);

// Add notification styles
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: inherit;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
    
    .notification-close:hover {
        opacity: 0.7;
    }
`;

document.head.appendChild(notificationStyles);

/*=============== VIDEO GALLERY LOAD MORE ===============*/
document.addEventListener('DOMContentLoaded', () => {
    const videoLoadMoreBtn = document.getElementById('video-load-more-btn');
    const videoGrid = document.querySelector('.video-gallery-grid');

    if (videoLoadMoreBtn) {
        const videoItems = videoGrid.querySelectorAll('.video-gallery-item');

        if (videoItems.length <= 9) {
            videoLoadMoreBtn.style.display = 'none';
        }

        videoLoadMoreBtn.addEventListener('click', () => {
            videoGrid.classList.add('show-all');
            videoLoadMoreBtn.parentElement.style.display = 'none';
        });
    }

    // Video gallery click handlers
    const videoItems = document.querySelectorAll('.video-gallery-item');
    let clickTimeout;

    videoItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const videoId = item.getAttribute('data-video-id');
            
            // Single click - play in lightbox
            clickTimeout = setTimeout(() => {
                const videoIframe = document.getElementById('video-iframe');
                const lightbox = document.getElementById('lightbox');
                
                if (videoIframe && lightbox) {
                    videoIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
                    lightbox.style.display = 'flex';
                }
            }, 200); // Small delay to detect double click
        });

        item.addEventListener('dblclick', (e) => {
            e.preventDefault();
            clearTimeout(clickTimeout); // Cancel single click
            
            // Double click - go to YouTube
            const videoId = item.getAttribute('data-video-id');
            window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
        });
    });

    // Close lightbox functionality
    const lightbox = document.getElementById('lightbox');
    const closeLightbox = document.getElementById('close-lightbox');

    if (lightbox && closeLightbox) {
        closeLightbox.addEventListener('click', () => {
            const videoIframe = document.getElementById('video-iframe');
            if (videoIframe) {
                videoIframe.src = '';
            }
            lightbox.style.display = 'none';
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                const videoIframe = document.getElementById('video-iframe');
                if (videoIframe) {
                    videoIframe.src = '';
                }
                lightbox.style.display = 'none';
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      // User-Agent based block (simple example)
      const badBots = [/curl/i, /wget/i, /python/i, /scrapy/i, /bot/i];
      const userAgent = navigator.userAgent;
      if (badBots.some(re => re.test(userAgent))) {
        alert('Your browser is not allowed to submit this form.');
        return;
      }

      // Set the current time in the hidden field
      var timeField = document.getElementById('form-time');
      if (timeField) {
        timeField.value = new Date().toLocaleString();
      }

      // Email-based rate limit (3 per hour)
      const formData = new FormData(form);
      let name = formData.get('name');
      let email = formData.get('email');
      let message = formData.get('message');

      // Sanitize name and message fields
      name = stripHTML(name);
      message = stripHTML(message);
      form.elements['name'].value = name;
      form.elements['message'].value = message;

      // Require name and message
      if (!name.trim()) {
        alert('Please enter your name.');
        return;
      }
      if (!message.trim()) {
        alert('Please enter your message.');
        return;
      }

      const now = Date.now();
      let emailSubmissions = JSON.parse(localStorage.getItem('emailSubmissions') || '{}');
      emailSubmissions[email] = emailSubmissions[email] || [];
      // Remove submissions older than 1 hour
      emailSubmissions[email] = emailSubmissions[email].filter(ts => now - ts < 60 * 60 * 1000);
      if (emailSubmissions[email].length >= 3) {
        alert('You have reached the submission limit for this email. Please try again later.');
        return;
      }
      emailSubmissions[email].push(now);
      localStorage.setItem('emailSubmissions', JSON.stringify(emailSubmissions));

      emailjs.sendForm('service_9ovl28m', 'template_ghla5dg', this)
        .then(function() {
          // Send auto-reply to the user
          const formData = new FormData(form);
          emailjs.send('service_9ovl28m', 'template_z0pt47i', {
            name: formData.get('name'),
            email: formData.get('email'),
            title: formData.get('service') || 'Contact Request',
            message: formData.get('message')
          })
          .then(function() {
            // Auto-reply sent successfully (optional: show notification)
          }, function(error) {
            // Auto-reply failed (optional: show notification)
          });
          alert('Message sent successfully!');
          form.reset();
        }, function(error) {
          alert('Failed to send message. Please try again.');
        });
    });
  }
});

// Add a function to strip HTML tags
function stripHTML(input) {
  return input.replace(/<[^>]*>?/gm, '');
} 