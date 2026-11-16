// 1. Live System Clock (Jakarta WIB)
const sysClock = document.getElementById('sys-clock');
function updateClock() {
    if (!sysClock) return;
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-GB', {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    sysClock.textContent = `${timeString} WIB`;
}
setInterval(updateClock, 1000);
updateClock();

// Dismiss system toast notification
const toastClose = document.getElementById('toast-close');
const sysToast = document.getElementById('sys-toast');

if (toastClose && sysToast) {
    toastClose.addEventListener('click', () => {
        sysToast.style.opacity = '0';
        sysToast.style.transform = 'translateY(-20px)';
        sysToast.style.pointerEvents = 'none';
        setTimeout(() => {
            sysToast.style.display = 'none';
        }, 300); // Matches transition duration
    });
}

// 2. Top Scroll Progress Bar & Active Floating Dock Highlight
const scrollProgress = document.getElementById('scroll-progress');
const sections = document.querySelectorAll('main section');
const dockItems = document.querySelectorAll('.dock-item');

window.addEventListener('scroll', () => {
    if (scrollProgress) {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        scrollProgress.style.width = `${progress}%`;
    }

    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 220;
        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute('id');
        }
    });

    dockItems.forEach(item => {
        item.classList.remove('active-section');
        if (item.getAttribute('data-target') === currentSection) {
            item.classList.add('active-section');
        }
    });
});

// 3. Smooth scrolling for floating dock icons
dockItems.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// 4. Enlarge project card & toggle tab switcher
const projectCard = document.querySelector('.project-card');
const clickHint = document.querySelector('.click-hint');

if (projectCard) {
    const toggleProject = () => {
        projectCard.classList.toggle('enlarged');
        if (clickHint) {
            clickHint.textContent = projectCard.classList.contains('enlarged')
                ? '[ CLICK TO COLLAPSE ]'
                : '[ CLICK TO EXPAND ]';
        }
    };

    projectCard.addEventListener('click', (e) => {
        // Prevent toggle if clicking tab buttons inside the card
        if (e.target.classList.contains('tab-btn')) return;
        toggleProject();
    });

    projectCard.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleProject();
        }
    });
}

// Project Card Tab Switcher Logic
const tabBtns = document.querySelectorAll('.tab-btn');
const archContent = document.getElementById('arch-content');
const devlogContent = document.getElementById('devlog-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const targetTab = btn.getAttribute('data-tab');
        if (targetTab === 'arch') {
            archContent.style.display = 'block';
            devlogContent.style.display = 'none';
        } else {
            archContent.style.display = 'none';
            devlogContent.style.display = 'block';
        }
    });
});

// 5. Interactive Skill Module Inspector
const skillBadges = document.querySelectorAll('.skill-badge');
const skillReadout = document.getElementById('skill-readout');

skillBadges.forEach(badge => {
    badge.addEventListener('click', () => {
        skillBadges.forEach(b => b.classList.remove('selected'));
        badge.classList.add('selected');

        if (skillReadout) {
            const skillName = badge.textContent;
            const skillInfo = badge.getAttribute('data-info');
            skillReadout.innerHTML = `<span class="mono-label">[${skillName}]:</span> ${skillInfo}`;
        }
    });
});

// 6. One-Click Copy to Clipboard for Contact Details
document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const textToCopy = btn.getAttribute('data-copy');
        navigator.clipboard.writeText(textToCopy).then(() => {
            const originalText = btn.textContent;
            btn.textContent = 'COPIED';
            btn.classList.add('copied');
            setTimeout(() => {
                btn.textContent = originalText;
                btn.classList.remove('copied');
            }, 1800);
        });
    });
});

// 7. Theme toggle
const themeToggleBtn = document.getElementById('theme-toggle');
if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });
}

// 8. Typing Effect for Welcome Text
const textToType = "Welcome to my Portfolio";
const typedTextElement = document.getElementById("typed-text");
let charIndex = 0;

function typeWriter() {
    if (typedTextElement && charIndex < textToType.length) {
        typedTextElement.textContent += textToType.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 80);
    }
}

window.addEventListener("DOMContentLoaded", () => {
    if (typedTextElement) {
        typedTextElement.textContent = "";
        setTimeout(typeWriter, 400);
    }
});

// 9. Scroll Reveal & Hide Animation Observer (15% viewport threshold)
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        } else {
            entry.target.classList.remove('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(section => {
    observer.observe(section);
});

