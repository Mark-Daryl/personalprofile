// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Hide loading screen
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 800);
    }

    // Initialize all features
    initTypingAnimation();
    initMobileNav();
    initSkillBars();
    initStatsCounter();
    initProjects();
    initContactForm();
    initSmoothScroll();
    initThemeToggle();
    initBackToTop();
    initNavbarScroll();
    initFilterButtons();
    updateCopyrightYear();
    initResumeButton();
});

// ============ TYPING ANIMATION ============
function initTypingAnimation() {
    const typedTextElement = document.getElementById('typed-text');
    if (!typedTextElement) return;

    const textArray = ['Web Developer', 'UI/UX Designer', 'Problem Solver', 'Creative Thinker'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeText() {
        const currentText = textArray[textIndex];
        
        if (!isDeleting) {
            typedTextElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            
            if (charIndex === currentText.length) {
                setTimeout(() => {
                    isDeleting = true;
                    setTimeout(typeText, 1000);
                }, 2000);
                return;
            }
        } else {
            typedTextElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            
            if (charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % textArray.length;
                setTimeout(typeText, 500);
                return;
            }
        }
        
        setTimeout(typeText, isDeleting ? 50 : 100);
    }

    typeText();
}

// ============ MOBILE NAVIGATION ============
function initMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close mobile menu on link click
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
}

// ============ SKILL BARS ============
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    let animated = false;

    function animateSkillBars() {
        if (animated) return;
        
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            const rect = bar.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
            
            if (isVisible) {
                bar.style.width = width;
                animated = true;
            }
        });
    }

    // Initial check with delay
    setTimeout(animateSkillBars, 500);
    window.addEventListener('scroll', animateSkillBars);
}

// ============ STATS COUNTER ============
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat .number');
    let counted = false;

    function animateStats() {
        if (counted) return;
        
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const rect = stat.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
            const current = parseInt(stat.textContent);
            
            if (isVisible && current === 0) {
                let count = 0;
                const interval = setInterval(() => {
                    count++;
                    stat.textContent = count;
                    if (count === target) {
                        clearInterval(interval);
                        counted = true;
                    }
                }, 100);
            }
        });
    }

    setTimeout(animateStats, 500);
    window.addEventListener('scroll', animateStats);
}

// ============ PROJECTS ============
function initProjects() {
    const projectsData = [
        {
            title: 'E-Commerce Platform',
            description: 'A full-featured e-commerce platform with payment integration and admin dashboard.',
            icon: 'fa-shopping-cart',
            tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
            demo: '#',
            code: '#',
            category: 'ecommerce'
        },
        {
            title: 'Task Management App',
            description: 'A collaborative task management application with real-time updates.',
            icon: 'fa-tasks',
            tech: ['React', 'Firebase', 'CSS3'],
            demo: '#',
            code: '#',
            category: 'web'
        },
        {
            title: 'Weather Dashboard',
            description: 'A beautiful weather application with live data and interactive maps.',
            icon: 'fa-cloud-sun',
            tech: ['JavaScript', 'API', 'CSS3'],
            demo: '#',
            code: '#',
            category: 'mobile'
        },
        {
            title: 'Portfolio Builder',
            description: 'A drag-and-drop portfolio builder for creative professionals.',
            icon: 'fa-palette',
            tech: ['React', 'Redux', 'TailwindCSS'],
            demo: '#',
            code: '#',
            category: 'web'
        },
        {
            title: 'Food Delivery App',
            description: 'A mobile-first food delivery application with location tracking.',
            icon: 'fa-utensils',
            tech: ['React Native', 'Node.js', 'PostgreSQL'],
            demo: '#',
            code: '#',
            category: 'mobile'
        },
        {
            title: 'Analytics Dashboard',
            description: 'An interactive analytics dashboard with real-time data visualization.',
            icon: 'fa-chart-line',
            tech: ['Vue.js', 'D3.js', 'Python'],
            demo: '#',
            code: '#',
            category: 'web'
        }
    ];

    const projectsGrid = document.querySelector('.projects-grid');
    if (!projectsGrid) return;

    function renderProjects(filter = 'all') {
        projectsGrid.innerHTML = '';
        
        const filtered = filter === 'all' 
            ? projectsData 
            : projectsData.filter(p => p.category === filter);
        
        filtered.forEach((project, index) => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.style.animationDelay = `${index * 0.1}s`;
            card.innerHTML = `
                <div class="project-image">
                    <i class="fas ${project.icon}"></i>
                </div>
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tech">
                    ${project.tech.map(tech => `<span>${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.demo}" target="_blank"><i class="fas fa-external-link-alt"></i> Live Demo</a>
                    <a href="${project.code}" target="_blank"><i class="fas fa-code"></i> Source Code</a>
                </div>
            `;
            projectsGrid.appendChild(card);
        });
    }

    renderProjects('all');

    // Filter buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderProjects(btn.dataset.filter);
        });
    });
}

// ============ CONTACT FORM ============
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');
        
        // Simple validation
        if (!name.value || !email.value || !message.value) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }

        // Show success message
        showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
        contactForm.reset();
    });
}

// ============ NOTIFICATION SYSTEM ============
function showNotification(message, type = 'success') {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <p>${message}</p>
        </div>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    document.body.appendChild(notification);
    
    // Add styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 10px;
            color: white;
            z-index: 10000;
            max-width: 400px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            animation: slideInRight 0.5s ease;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 15px;
        }
        .notification.success {
            background: #4caf50;
        }
        .notification.error {
            background: #f44336;
        }
        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .notification-content i {
            font-size: 1.5rem;
        }
        .notification-content p {
            margin: 0;
            font-size: 0.95rem;
        }
        .notification-close {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            font-size: 1.2rem;
            opacity: 0.8;
            transition: opacity 0.3s;
        }
        .notification-close:hover {
            opacity: 1;
        }
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @media (max-width: 480px) {
            .notification {
                right: 10px;
                left: 10px;
                max-width: none;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Auto dismiss after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease forwards';
        setTimeout(() => notification.remove(), 500);
    }, 5000);
    
    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.5s ease forwards';
        setTimeout(() => notification.remove(), 500);
    });
    
    // Add slideOutRight animation
    const style2 = document.createElement('style');
    style2.textContent = `
        @keyframes slideOutRight {
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
    document.head.appendChild(style2);
}

// ============ SMOOTH SCROLL ============
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(targetId);
            if (target) {
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============ THEME TOGGLE ============
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    });
}

// ============ BACK TO TOP ============
function initBackToTop() {
    const backToTop = document.getElementById('back-to-top');
    if (!backToTop) return;
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add styles for back to top button
    const style = document.createElement('style');
    style.textContent = `
        #back-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: var(--primary);
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 1.2rem;
            cursor: pointer;
            transition: all 0.3s ease;
            opacity: 0;
            visibility: hidden;
            box-shadow: 0 5px 15px rgba(108, 99, 255, 0.3);
            z-index: 999;
        }
        #back-to-top.visible {
            opacity: 1;
            visibility: visible;
        }
        #back-to-top:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 25px rgba(108, 99, 255, 0.4);
        }
        @media (max-width: 480px) {
            #back-to-top {
                bottom: 20px;
                right: 20px;
                width: 45px;
                height: 45px;
                font-size: 1rem;
            }
        }
    `;
    document.head.appendChild(style);
}

// ============ NAVBAR SCROLL EFFECT ============
function initNavbarScroll() {
    const nav = document.getElementById('navbar');
    if (!nav) return;
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

// ============ FILTER BUTTONS ============
function initFilterButtons() {
    // Already handled in initProjects
}

// ============ COPYRIGHT YEAR ============
function updateCopyrightYear() {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

// ============ RESUME BUTTON ============
function initResumeButton() {
    const resumeBtn = document.getElementById('resume-btn');
    if (resumeBtn) {
        resumeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Resume download will be available soon!', 'success');
        });
    }
}
