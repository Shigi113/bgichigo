/**
 * ╔══════════════════════════════════════════════════════╗
 * ║  Scroll Progress Indicator + Enhancements          ║
 * ║  Beautiful visual feedback for page scrolling       ║
 * ╚══════════════════════════════════════════════════════╝
 */

class ScrollProgressIndicator {
    constructor() {
        this.progressBar = null;
        this.init();
    }

    init() {
        this.createProgressBar();
        this.attachListeners();
    }

    createProgressBar() {
        // Check if progress bar already exists
        if (document.querySelector('.scroll-progress')) return;

        this.progressBar = document.createElement('div');
        this.progressBar.className = 'scroll-progress';
        document.body.insertBefore(this.progressBar, document.body.firstChild);
    }

    attachListeners() {
        window.addEventListener('scroll', () => this.updateProgress(), { passive: true });
        window.addEventListener('resize', () => this.updateProgress(), { passive: true });
        this.updateProgress(); // Initial call
    }

    updateProgress() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = window.scrollY;
        const progress = windowHeight > 0 ? (scrolled / windowHeight) * 100 : 0;
        
        this.progressBar.style.width = progress + '%';
    }
}

/**
 * Smooth Scroll Enhancement
 * Improves scroll experience with momentum and easing
 */
class SmoothScrollEnhancer {
    constructor() {
        this.init();
    }

    init() {
        this.attachSmoothScrollLinks();
        this.enhanceScrollBehavior();
    }

    attachSmoothScrollLinks() {
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href').slice(1);
                const target = document.getElementById(targetId);

                if (target) {
                    e.preventDefault();
                    this.smoothScroll(target);
                }
            });
        });
    }

    smoothScroll(element) {
        const targetPosition = element.offsetTop - 100; // Account for fixed header
        const startPosition = window.scrollY;
        const distance = targetPosition - startPosition;
        const duration = 1000; // 1 second
        let start = null;

        const ease = (t) => {
            // Easing function: ease-out cubic
            return 1 - Math.pow(1 - t, 3);
        };

        const animation = (currentTime) => {
            if (start === null) start = currentTime;
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            window.scrollTo(0, startPosition + distance * ease(progress));

            if (progress < 1) {
                requestAnimationFrame(animation);
            }
        };

        requestAnimationFrame(animation);
    }

    enhanceScrollBehavior() {
        // Add scroll direction detection
        let lastScrollY = 0;
        let scrollDirection = 'down';

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
            lastScrollY = currentScrollY;

            // Store direction on document for CSS/JS usage
            document.documentElement.setAttribute('data-scroll-direction', scrollDirection);
        }, { passive: true });
    }
}

/**
 * Viewport Visibility Tracker
 * Track which sections are in viewport
 */
class ViewportTracker {
    constructor() {
        this.currentSection = null;
        this.init();
    }

    init() {
        const sections = document.querySelectorAll('section[id]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.currentSection = entry.target.id;
                    document.documentElement.setAttribute('data-current-section', this.currentSection);
                    
                    // Highlight active nav link
                    this.updateActiveNavLink();
                }
            });
        }, { threshold: 0.3 });

        sections.forEach(section => observer.observe(section));
    }

    updateActiveNavLink() {
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === this.currentSection) {
                link.classList.add('active');
            }
        });
    }
}

/**
 * Dynamic Theme Detector
 * Adjust animations based on user's OS theme preference
 */
class ThemeDetector {
    constructor() {
        this.init();
    }

    init() {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
        const prefersMotion = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;

        document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
        document.documentElement.setAttribute('data-motion', prefersMotion ? 'full' : 'reduced');

        // Listen for theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addListener((e) => {
            document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
        });
    }
}

/**
 * Lazy Load Animation Trigger
 * Trigger animations only when they're about to be visible
 */
class LazyLoadAnimations {
    constructor() {
        this.init();
    }

    init() {
        const animatedElements = document.querySelectorAll('[data-animate-on-scroll]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const animationType = entry.target.getAttribute('data-animate-on-scroll');
                    entry.target.classList.add(`animate-${animationType}`);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2, rootMargin: '50px' });

        animatedElements.forEach(el => observer.observe(el));
    }
}

/**
 * Scroll-Linked Animations (CSS Custom Properties)
 * Use for continuous animations that follow scroll
 */
class ScrollLinkedAnimations {
    constructor() {
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.updateScrollProperties(), { passive: true });
        this.updateScrollProperties();
    }

    updateScrollProperties() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // Progress from 0 to 100
        const scrollProgress = (scrollY / (documentHeight - windowHeight)) * 100;
        
        document.documentElement.style.setProperty('--scroll-progress', scrollProgress);
        document.documentElement.style.setProperty('--scroll-y', scrollY + 'px');
    }
}

/**
 * Initialize All Enhancements
 */
function initializeScrollEnhancements() {
    // Check if prefers-reduced-motion is set
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
        new ScrollProgressIndicator();
        new SmoothScrollEnhancer();
        new ViewportTracker();
        new LazyLoadAnimations();
        new ScrollLinkedAnimations();
    }
    
    new ThemeDetector();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeScrollEnhancements);
} else {
    initializeScrollEnhancements();
}

/**
 * Export for use in other scripts
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ScrollProgressIndicator,
        SmoothScrollEnhancer,
        ViewportTracker,
        ThemeDetector,
        LazyLoadAnimations,
        ScrollLinkedAnimations
    };
}
