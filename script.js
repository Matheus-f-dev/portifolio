// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

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

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.skill-category, .project-card, .about-stats .stat').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Typing effect for hero title
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

// Initialize when page loads
window.addEventListener('load', () => {
    initPreloader();
    createMatrixRain();
    createFAB();
    animateCodeBlock();
    animateSkillBars();
    initProjectsCarousel();
    initProjectLinks();
    initSocialLinks();
    initThemeToggle();
});

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');
    
    // Check for saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    if (savedTheme === 'light') {
        body.setAttribute('data-theme', 'light');
        icon.className = 'fas fa-sun';
    }
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        
        // Add rotation animation
        icon.style.transform = 'rotate(360deg) scale(0.8)';
        
        setTimeout(() => {
            if (currentTheme === 'light') {
                body.removeAttribute('data-theme');
                icon.className = 'fas fa-moon';
                localStorage.setItem('theme', 'dark');
            } else {
                body.setAttribute('data-theme', 'light');
                icon.className = 'fas fa-sun';
                localStorage.setItem('theme', 'light');
            }
            
            // Reset transform
            setTimeout(() => {
                icon.style.transform = '';
            }, 100);
        }, 200);
    });
}

// Social Links Functionality
function initSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        // Ensure links are clickable
        link.style.pointerEvents = 'auto';
        link.style.cursor = 'pointer';
        
        link.addEventListener('click', (e) => {
            // Visual feedback
            link.style.transform = 'scale(0.95)';
            setTimeout(() => {
                link.style.transform = '';
            }, 100);
        });
    });
}

// Matrix Rain Effect
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    canvas.style.opacity = '0.1';
    document.body.appendChild(canvas);
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const matrix = '01';
    const matrixArray = matrix.split('');
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];
    
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(15, 20, 25, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#e74c3c';
        ctx.font = fontSize + 'px JetBrains Mono';
        
        for (let i = 0; i < drops.length; i++) {
            const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 100);
}

// Advanced Preloader
function initPreloader() {
    const preloader = document.getElementById('preloader');
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        
        progressFill.style.width = progress + '%';
        progressText.textContent = Math.floor(progress) + '%';
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                preloader.classList.add('fade-out');
                setTimeout(() => {
                    preloader.remove();
                }, 800);
            }, 500);
        }
    }, 100);
}

// Create Floating Action Button
function createFAB() {
    const fabContainer = document.createElement('div');
    fabContainer.className = 'fab-container';
    fabContainer.innerHTML = `
        <div class="fab" onclick="scrollToTop()">
            <i class="fas fa-rocket"></i>
        </div>
    `;
    document.body.appendChild(fabContainer);
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Animate Skill Progress Bars
function animateSkillBars() {
    const skills = {
        'HTML5': 95,
        'CSS3': 90,
        'JavaScript': 92,
        'React': 88,
        'Node.js': 85,
        'Python': 80,
        'MongoDB': 82,
        'Express': 87,
        'AWS': 78,
        'Docker': 75,
        'Kubernetes': 70,
        'Git/CI/CD': 90,
        'PostgreSQL': 85,
        'Redis': 75,
        'Elasticsearch': 70
    };
    
    setTimeout(() => {
        document.querySelectorAll('.skill-item').forEach((item, index) => {
            const skillName = item.querySelector('span').textContent.trim();
            const level = skills[skillName];
            
            if (level && !item.querySelector('.skill-progress')) {
                const progressBar = document.createElement('div');
                progressBar.className = 'skill-progress';
                progressBar.innerHTML = `<div class="skill-progress-bar"></div>`;
                item.appendChild(progressBar);
                
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            setTimeout(() => {
                                const bar = entry.target.querySelector('.skill-progress-bar');
                                if (bar) {
                                    bar.style.width = level + '%';
                                }
                            }, index * 100);
                            observer.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.3 });
                
                observer.observe(item);
            }
        });
    }, 1000);
}

// Animate Code Block
function animateCodeBlock() {
    const codeLines = document.querySelectorAll('.code-line');
    codeLines.forEach((line, index) => {
        line.style.opacity = '0';
        line.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            line.style.transition = 'all 0.5s ease';
            line.style.opacity = '1';
            line.style.transform = 'translateX(0)';
        }, index * 300);
    });
}

// Contact form handling
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const message = contactForm.querySelector('textarea').value;
    
    // Simple validation
    if (!name || !email || !message) {
        alert('Por favor, preencha todos os campos!');
        return;
    }
    
    // Simulate form submission
    const submitBtn = contactForm.querySelector('.btn');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        alert('Mensagem enviada com sucesso! Entrarei em contato em breve.');
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Enhanced Parallax effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.3;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
    
    // Parallax for skill categories
    document.querySelectorAll('.skill-category').forEach((category, index) => {
        const rect = category.getBoundingClientRect();
        const speed = 0.1 + (index * 0.05);
        const yPos = -(scrolled * speed);
        category.style.transform = `translateY(${yPos}px)`;
    });
    
    // Dynamic navbar blur
    const navbar = document.querySelector('.navbar');
    const blurAmount = Math.min(scrolled / 100, 1) * 10;
    navbar.style.backdropFilter = `blur(${blurAmount}px)`;
    

});

// Skills animation on scroll
const skillItems = document.querySelectorAll('.skill-item');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.5 });

skillItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    skillObserver.observe(item);
});

// Enhanced project cards effects
document.querySelectorAll('.project-card').forEach((card, index) => {
    // Staggered entrance animation
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    observer.observe(card);
    
    // Enhanced hover effects
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-20px) scale(1.05) rotateX(5deg)';
        card.style.boxShadow = '0 25px 50px rgba(231, 76, 60, 0.3)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1) rotateX(0deg)';
        card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
    });
    
    // Tilt effect on mouse move
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `translateY(-20px) scale(1.05) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }
    updateCounter();
}

// Observe stats for counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('h3');
            const targetNumber = parseInt(statNumber.textContent);
            animateCounter(statNumber, targetNumber);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
});

// Enhanced loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Staggered animation for hero elements
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-buttons, .hero-stats');
    heroElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.8s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Terminal-like typing effect for hero subtitle
function terminalType(element, text, speed = 50) {
    element.innerHTML = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Add blinking cursor
            element.innerHTML += '<span class="cursor">|</span>';
        }
    }
    
    setTimeout(type, 1000);
}

// Initialize terminal typing
setTimeout(() => {
    const subtitle = document.querySelector('.hero-subtitle');
    const originalText = subtitle.textContent;
    terminalType(subtitle, originalText);
}, 2000);

// Add cursor blinking CSS
const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
    .cursor {
        animation: blink 1s infinite;
        color: #e74c3c;
    }
    
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
`;
document.head.appendChild(cursorStyle);

// Smooth reveal animation for sections
const sections = document.querySelectorAll('section');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => {
    sectionObserver.observe(section);
});

// Projects Carousel
function initProjectsCarousel() {
    const projectsGrid = document.getElementById('projectsGrid');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicatorsContainer = document.getElementById('carouselIndicators');
    const projectCards = document.querySelectorAll('.project-card');
    
    let currentIndex = 0;
    const totalSlides = projectCards.length;
    
    // Create indicators
    for (let i = 0; i < totalSlides; i++) {
        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        if (i === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(i));
        indicatorsContainer.appendChild(indicator);
    }
    
    const indicators = document.querySelectorAll('.indicator');
    
    function updateCarousel() {
        const cardWidth = projectCards[0].offsetWidth;
        const translateX = -currentIndex * cardWidth;
        projectsGrid.style.transform = `translateX(${translateX}px)`;
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
        
        // Update button states
        prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
        nextBtn.style.opacity = currentIndex === totalSlides - 1 ? '0.5' : '1';
    }
    
    function goToSlide(index) {
        currentIndex = Math.max(0, Math.min(index, totalSlides - 1));
        updateCarousel();
    }
    
    function nextSlide() {
        if (currentIndex < totalSlides - 1) {
            currentIndex++;
            updateCarousel();
        }
    }
    
    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    }
    
    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });
    
    // Auto-play (optional)
    let autoPlayInterval = setInterval(nextSlide, 5000);
    
    // Pause auto-play on hover
    const carousel = document.querySelector('.projects-carousel');
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval);
    });
    
    carousel.addEventListener('mouseleave', () => {
        autoPlayInterval = setInterval(nextSlide, 5000);
    });
    
    // Touch/swipe support
    let startX = 0;
    let isDragging = false;
    
    projectsGrid.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    });
    
    projectsGrid.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
    });
    
    projectsGrid.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        
        const endX = e.changedTouches[0].clientX;
        const diffX = startX - endX;
        
        if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    });
    
    // Initial setup
    updateCarousel();
    
    // Update on window resize
    window.addEventListener('resize', () => {
        updateCarousel();
    });
}

// Project Links Functionality
function initProjectLinks() {
    const demoLinks = document.querySelectorAll('.demo-link');
    
    const projectDemos = {
        'ecommerce': 'https://ecommerce-demo.netlify.app',
        'taskmanager': 'https://taskmanager-demo.netlify.app',
        'dashboard': 'https://dashboard-demo.netlify.app',
        'chat': 'https://chat-demo.netlify.app',
        'weather': 'https://weather-demo.netlify.app',
        'games': 'https://games-demo.netlify.app'
    };
    
    demoLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const projectType = link.getAttribute('data-project');
            const demoUrl = projectDemos[projectType];
            
            if (demoUrl) {
                const originalIcon = link.innerHTML;
                link.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                
                setTimeout(() => {
                    window.open(demoUrl, '_blank');
                    link.innerHTML = originalIcon;
                }, 500);
            } else {
                showNotification('Demo em breve! 🚀');
            }
        });
    });
}

// Notification function
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #e74c3c, #c0392b);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(231, 76, 60, 0.3);
        z-index: 9999;
        font-weight: 500;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add notification animations
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyle);

