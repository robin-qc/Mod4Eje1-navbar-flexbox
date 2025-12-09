// Seleccionar elementos del DOM
const navbarToggle = document.getElementById('navbarToggle');
const navbarMenu = document.getElementById('navbarMenu');
const navbarActions = document.querySelector('.navbar-actions');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.getElementById('navbar');
const searchToggle = document.getElementById('searchToggle');
const searchBar = document.getElementById('searchBar');
const searchClose = document.getElementById('searchClose');
const themeToggle = document.getElementById('themeToggle');
const backToTop = document.getElementById('backToTop');
const scrollProgress = document.getElementById('scrollProgress');
const loginBtn = document.querySelector('.btn-login');
const signupBtn = document.querySelector('.btn-signup');
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const loginClose = document.getElementById('loginClose');
const registerClose = document.getElementById('registerClose');
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const testimonialPrev = document.querySelector('.testimonial-prev');
const testimonialNext = document.querySelector('.testimonial-next');
const testimonialDots = document.querySelectorAll('.dot');
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const contactForm = document.getElementById('contactForm');
const scrollDown = document.querySelector('.scroll-down');

let currentTestimonial = 0;
let lastScroll = 0;

/**
 * Inicializar la aplicación
 */
document.addEventListener('DOMContentLoaded', () => {
    // Cargar tema guardado
    loadTheme();
    
    // Inicializar animaciones
    initAnimations();
    
    // Inicializar sliders
    initTestimonialSlider();
    
    // Inicializar filtros del portfolio
    initPortfolioFilter();
    
    // Inicializar modales
    initModals();
    
    // Inicializar formularios
    initForms();
});

/**
 * Toggle del menú móvil
 */
navbarToggle.addEventListener('click', toggleMobileMenu);

function toggleMobileMenu() {
    navbarToggle.classList.toggle('active');
    navbarMenu.classList.toggle('active');
    navbarActions.classList.toggle('active');
    
    if (navbarMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

/**
 * Cerrar el menú al hacer clic en un enlace (en móviles)
 */
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Cerrar el menú móvil
        if (window.innerWidth <= 768) {
            closeMobileMenu();
        }
        
        // Quitar clase active de todos los enlaces
        navLinks.forEach(l => l.classList.remove('active'));
        
        // Añadir clase active al enlace clicado
        link.classList.add('active');
        
        // Scroll suave para enlaces internos
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
    });
});

/**
 * Cerrar menú móvil
 */
function closeMobileMenu() {
    navbarToggle.classList.remove('active');
    navbarMenu.classList.remove('active');
    navbarActions.classList.remove('active');
    document.body.style.overflow = '';
}

/**
 * Buscar
 */
searchToggle.addEventListener('click', () => {
    searchBar.classList.add('active');
    document.querySelector('.search-input').focus();
});

searchClose.addEventListener('click', () => {
    searchBar.classList.remove('active');
});

// Cerrar barra de búsqueda al hacer clic fuera
document.addEventListener('click', (e) => {
    if (!searchBar.contains(e.target) && !searchToggle.contains(e.target)) {
        searchBar.classList.remove('active');
    }
});

/**
 * Toggle del tema oscuro/claro
 */
themeToggle.addEventListener('click', toggleTheme);

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('navbar-theme', newTheme);
    
    // Actualizar icono
    const themeIcon = document.getElementById('themeIcon');
    if (themeIcon) {
        themeIcon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

function loadTheme() {
    const savedTheme = localStorage.getItem('navbar-theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Actualizar icono
    const themeIcon = document.getElementById('themeIcon');
    if (themeIcon) {
        themeIcon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

/**
 * Cambiar el estilo de la navbar al hacer scroll
 */
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Cambiar el color de fondo de la navbar
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(26, 26, 46, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.background = 'var(--bg-dark)';
        navbar.style.backdropFilter = 'none';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    }
    
    // Mostrar/ocultar botón de volver arriba
    if (currentScroll > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
    
    // Actualizar indicador de progreso de scroll
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (currentScroll / windowHeight) * 100;
    scrollProgress.style.width = `${progress}%`;
    
    lastScroll = currentScroll;
});

/**
 * Scroll spy - Resaltar el enlace de la sección actual
 */
const sections = document.querySelectorAll('.section');

const observerOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            
            // Quitar active de todos los enlaces
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            
            // Añadir active al enlace correspondiente
            const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}, observerOptions);

// Observar todas las secciones
sections.forEach(section => {
    observer.observe(section);
});

/**
 * Animación de aparición suave para las cards al hacer scroll
 */
function initAnimations() {
    const observeElements = document.querySelectorAll('.service-card, .portfolio-item, .testimonial, .about-container > *');
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1
    });
    
    observeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeInObserver.observe(element);
    });
}

/**
 * Volver al inicio
 */
backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

/**
 * Scroll hacia abajo en hero
 */
scrollDown.addEventListener('click', () => {
    window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
    });
});

/**
 * Modales
 */
function initModals() {
    // Login modal
    loginBtn.addEventListener('click', () => {
        loginModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    loginClose.addEventListener('click', () => {
        loginModal.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Register modal
    signupBtn.addEventListener('click', () => {
        registerModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    registerClose.addEventListener('click', () => {
        registerModal.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Cerrar modales al hacer clic fuera
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.classList.remove('active');
            document.body.style.overflow = '';
        }
        if (e.target === registerModal) {
            registerModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/**
 * Filtro del portfolio
 */
function initPortfolioFilter() {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remover clase active de todos los botones
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Añadir clase active al botón clicado
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            // Filtrar items del portfolio
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

/**
 * Slider de testimonios
 */
function initTestimonialSlider() {
    function showTestimonial(index) {
        testimonialSlides.forEach(slide => slide.classList.remove('active'));
        testimonialDots.forEach(dot => dot.classList.remove('active'));
        
        testimonialSlides[index].classList.add('active');
        testimonialDots[index].classList.add('active');
        currentTestimonial = index;
    }
    
    testimonialPrev.addEventListener('click', () => {
        let newIndex = currentTestimonial - 1;
        if (newIndex < 0) newIndex = testimonialSlides.length - 1;
        showTestimonial(newIndex);
    });
    
    testimonialNext.addEventListener('click', () => {
        let newIndex = currentTestimonial + 1;
        if (newIndex >= testimonialSlides.length) newIndex = 0;
        showTestimonial(newIndex);
    });
    
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showTestimonial(index);
        });
    });
    
    // Auto slide cada 5 segundos
    setInterval(() => {
        let newIndex = currentTestimonial + 1;
        if (newIndex >= testimonialSlides.length) newIndex = 0;
        showTestimonial(newIndex);
    }, 5000);
}

/**
 * Formularios
 */
function initForms() {
    // Formulario de contacto
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Validación básica
            const inputs = contactForm.querySelectorAll('input, textarea, select');
            let isValid = true;
            
            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ff5722';
                } else {
                    input.style.borderColor = '';
                }
            });
            
            if (isValid) {
                // Simular envío
                const submitBtn = contactForm.querySelector('.btn-submit');
                const originalText = submitBtn.querySelector('span').textContent;
                const originalIcon = submitBtn.querySelector('i').className;
                
                submitBtn.querySelector('span').textContent = 'Enviando...';
                submitBtn.querySelector('i').className = 'fas fa-spinner fa-spin';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    submitBtn.querySelector('span').textContent = '¡Mensaje Enviado!';
                    submitBtn.querySelector('i').className = 'fas fa-check';
                    
                    setTimeout(() => {
                        submitBtn.querySelector('span').textContent = originalText;
                        submitBtn.querySelector('i').className = originalIcon;
                        submitBtn.disabled = false;
                        contactForm.reset();
                    }, 2000);
                }, 1500);
            }
        });
    }
    
    // Formularios de modales
    const modalForms = document.querySelectorAll('.modal-form');
    modalForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simular envío
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Procesando...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = '¡Éxito!';
                submitBtn.style.background = '#4CAF50';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    form.reset();
                    
                    // Cerrar modal después de éxito
                    const modal = form.closest('.modal');
                    if (modal) {
                        modal.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                }, 1500);
            }, 1500);
        });
    });
}

/**
 * Cerrar el menú al hacer clic fuera de él (en móviles)
 */
document.addEventListener('click', (e) => {
    const isClickInsideNavbar = navbar.contains(e.target);
    const isMenuOpen = navbarMenu.classList.contains('active');
    
    if (!isClickInsideNavbar && isMenuOpen) {
        closeMobileMenu();
    }
});

/**
 * Prevenir scroll del body cuando el menú está abierto
 */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeMobileMenu();
        searchBar.classList.remove('active');
        loginModal.classList.remove('active');
        registerModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

/**
 * Efecto hover en los botones
 */
const buttons = document.querySelectorAll('.btn, .filter-btn');
buttons.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

/**
 * Efecto de carga inicial
 */
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});