/**
 * ╔══════════════════════════════════════════════════════╗
 * ║  Scroll-Triggered Animations — Brian Gichigo        ║
 * ║  Premium entrance animations tied to scroll events  ║
 * ╚══════════════════════════════════════════════════════╝
 */

class ScrollAnimationController {
    constructor() {
        this.elements = [];
        this.observer = null;
        this.init();
    }

    init() {
        this.setupObserver();
        this.registerElements();
    }

    setupObserver() {
        const options = {
            threshold: 0.15,
            rootMargin: '0px 0px -100px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.triggerAnimation(entry.target);
                    this.observer.unobserve(entry.target);
                }
            });
        }, options);
    }

    registerElements() {
        // Sections
        document.querySelectorAll('.section').forEach(el => {
            this.observer.observe(el);
            el.classList.add('scroll-animate');
        });

        // Cards/Tiles
        document.querySelectorAll('.card, .tile, .case').forEach((el, index) => {
            this.observer.observe(el);
            el.setAttribute('data-index', index);
            el.classList.add('scroll-animate-item');
        });

        // Section headers
        document.querySelectorAll('.section__head').forEach(el => {
            this.observer.observe(el);
            el.classList.add('scroll-animate-header');
        });

        // Hero grid content
        document.querySelectorAll('.hero__content, .hero__card').forEach(el => {
            this.observer.observe(el);
            el.classList.add('scroll-animate-hero');
        });

        // Content blocks
        document.querySelectorAll('[data-animate]').forEach(el => {
            const animationType = el.getAttribute('data-animate');
            this.observer.observe(el);
            el.classList.add(`scroll-animate-${animationType}`);
        });
    }

    triggerAnimation(element) {
        const animationType = this.getAnimationType(element);
        element.classList.add('in-view');
        element.style.animation = animationType;
    }

    getAnimationType(element) {
        if (element.classList.contains('section')) {
            return 'sectionReveal 0.8s var(--ease-out) forwards';
        }
        if (element.classList.contains('section__head')) {
            return 'headerReveal 0.7s var(--ease-out) forwards';
        }
        if (element.classList.contains('scroll-animate-hero')) {
            return 'heroReveal 0.8s var(--ease-out) forwards';
        }
        if (element.classList.contains('scroll-animate-item')) {
            const index = parseInt(element.getAttribute('data-index')) || 0;
            const delay = Math.min(index * 0.08, 0.4);
            return `itemReveal 0.6s var(--ease-out) ${delay}s forwards`;
        }
        return 'itemReveal 0.6s var(--ease-out) forwards';
    }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ScrollAnimationController();
    });
} else {
    new ScrollAnimationController();
}

/**
 * Parallax Scroll Effect for Hero Section
 */
class ParallaxEffect {
    constructor() {
        this.hero = document.querySelector('.hero');
        this.heroContent = document.querySelector('.hero__content');
        this.init();
    }

    init() {
        if (!this.hero) return;
        
        window.addEventListener('scroll', () => this.updateParallax(), { passive: true });
        this.updateParallax();
    }

    updateParallax() {
        const scrollY = window.scrollY;
        const heroBottom = this.hero.offsetTop + this.hero.offsetHeight;
        
        if (scrollY < heroBottom) {
            const offset = scrollY * 0.5;
            this.hero.style.backgroundPosition = `center ${offset}px`;
        }
    }
}

// Initialize parallax
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ParallaxEffect();
    });
} else {
    new ParallaxEffect();
}

/**
 * Counter Animation for Stats/Numbers
 */
class CounterAnimation {
    constructor() {
        this.counters = [];
        this.init();
    }

    init() {
        document.querySelectorAll('[data-count]').forEach(el => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateCounter(el);
                        observer.unobserve(el);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(el);
        });
    }

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const start = 0;
        const startTime = Date.now();

        const animate = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / duration, 1);
            const current = Math.floor(start + (target - start) * progress);
            element.textContent = current.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        animate();
    }
}

// Initialize counters
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new CounterAnimation();
    });
} else {
    new CounterAnimation();
}

/**
 * Stagger Group Animation
 * Animates groups of elements with cascading effect
 */
class StaggerAnimation {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('[data-stagger]').forEach(container => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.staggerChildren(container);
                        observer.unobserve(container);
                    }
                });
            }, { threshold: 0.2 });

            observer.observe(container);
        });
    }

    staggerChildren(container) {
        const children = container.querySelectorAll('[data-stagger-item]');
        const staggerDelay = parseFloat(container.getAttribute('data-stagger-delay') || 0.1);

        children.forEach((child, index) => {
            const delay = index * staggerDelay;
            child.style.animationDelay = `${delay}s`;
            child.classList.add('stagger-in');
        });
    }
}

// Initialize stagger
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new StaggerAnimation();
    });
} else {
    new StaggerAnimation();
}

/**
 * Text Reveal Animation
 * Line-by-line or word-by-word reveal effect
 */
class TextRevealAnimation {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('[data-text-reveal]').forEach(element => {
            const revealType = element.getAttribute('data-text-reveal');
            this.setupTextReveal(element, revealType);
        });
    }

    setupTextReveal(element, type) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.revealText(element, type);
                    observer.unobserve(element);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(element);
    }

    revealText(element, type) {
        const text = element.textContent;
        element.textContent = '';
        element.style.opacity = '1';

        if (type === 'word') {
            this.revealByWord(element, text);
        } else if (type === 'line') {
            this.revealByLine(element, text);
        } else {
            this.revealByChar(element, text);
        }
    }

    revealByWord(element, text) {
        const words = text.split(' ');
        words.forEach((word, index) => {
            const span = document.createElement('span');
            span.className = 'word-reveal';
            span.textContent = word + ' ';
            span.style.animationDelay = `${index * 0.05}s`;
            element.appendChild(span);
        });
    }

    revealByLine(element, text) {
        const lines = text.split('\n');
        lines.forEach((line, index) => {
            const span = document.createElement('span');
            span.className = 'line-reveal';
            span.textContent = line;
            span.style.animationDelay = `${index * 0.1}s`;
            span.style.display = 'block';
            element.appendChild(span);
        });
    }

    revealByChar(element, text) {
        [...text].forEach((char, index) => {
            const span = document.createElement('span');
            span.className = 'char-reveal';
            span.textContent = char;
            span.style.animationDelay = `${index * 0.02}s`;
            element.appendChild(span);
        });
    }
}

// Initialize text reveal
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new TextRevealAnimation();
    });
} else {
    new TextRevealAnimation();
}
