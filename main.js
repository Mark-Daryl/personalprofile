// Typing Animation
const typedTextElement = document.getElementById('typed-text');
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

// Start typing animation
document.addEventListener('DOMContentLoaded', () => {
    typeText();
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Skill Bar Animation
const skillBars = document.querySelectorAll('.skill-progress');

function animateSkillBars() {
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        const rect = bar.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        
        if (isVisible && bar.style.width !== width) {
            bar.style.width = width;
        }
    });
}

// Initialize skill bars
window.addEventListener('load', () => {
    setTimeout(animateSkillBars, 500);
});

window.addEventListener('scroll', animateSkillBars);

// Number Counter Animation
const stats = document.querySelectorAll('.stat .number');

function animateStats() {
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
                }
            }, 100);
        }
    });
}

window.addEventListener('scroll', animateStats);
window.addEventListener('load', animateStats);

// Projects Data
const projectsData = [
    {
        title: 'Project 1',
        description: 'A full-stack web application built with React and Node.js',
        icon: 'fa-code',
        tech: ['React', 'Node.js', 'MongoDB'],
        demo: '#',
        code: '#'
    },
    {
        title: 'Project 2',
        description: 'E-commerce platform with payment integration',
        icon: 'fa-shopping-cart',
        tech: ['Next.js', 'Stripe', 'PostgreSQL'],
        demo: '#',
        code: '#'
    },
    {
        title: 'Project 3',
        description: 'Mobile-first weather application',
        icon: 'fa-cloud-sun',
        tech: ['JavaScript', 'API', 'CSS3'],
        demo: '#',
        code: '#'
    }
];

// Render Projects
function renderProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    
    projectsData.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
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
                <a href="${project.demo}" target="_blank">Live Demo</a>
                <a href="${project.code}" target="_blank">Source Code</a>
            </div>
        `;
        projectsGrid.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', renderProjects);

// Contact Form
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Simple validation
    if (name && email && message) {
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    } else {
        alert('Please fill in all fields.');
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Dynamic copyright year
document.querySelector('footer p').textContent = 
    `© ${new Date().getFullYear()} Your Name. All rights reserved.`;