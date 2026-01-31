// ========== ВИДЕОФОН ==========
const bgVideo = document.getElementById('bgVideo');
const playPauseBtn = document.getElementById('playPauseBtn');
const playPauseIcon = document.getElementById('playPauseIcon');

let isPlaying = true;

// Инициализация видео
function initVideo() {
    if (!bgVideo) return;
    
    bgVideo.addEventListener('loadeddata', function() {
        console.log('✅ Видео загружено');
    });
    
    bgVideo.addEventListener('error', function(e) {
        console.error('❌ Ошибка загрузки видео');
        document.querySelector('.video-bg').style.background = 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%)';
    });
    
    bgVideo.addEventListener('play', function() {
        isPlaying = true;
        updatePlayIcon();
    });
    
    bgVideo.addEventListener('pause', function() {
        isPlaying = false;
        updatePlayIcon();
    });
}

// Обновление иконки воспроизведения
function updatePlayIcon() {
    if (!playPauseIcon) return;
    
    if (isPlaying) {
        playPauseIcon.classList.remove('fa-play');
        playPauseIcon.classList.add('fa-pause');
    } else {
        playPauseIcon.classList.remove('fa-pause');
        playPauseIcon.classList.add('fa-play');
    }
}

// Переключение воспроизведения/паузы
function togglePlayPause() {
    if (!bgVideo) return;
    
    if (isPlaying) {
        bgVideo.pause();
    } else {
        bgVideo.play();
    }
}

// ========== FAQ АККОРДЕОН ==========
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Закрываем все другие элементы
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });
        
        // Переключаем текущий элемент
        item.classList.toggle('active');
    });
});

// ========== ПЛАВНАЯ ПРОКРУТКА ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// ========== ФОРМА ОБРАТНОЙ СВЯЗИ ==========
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Получаем данные формы
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        // Показываем уведомление
        alert(`Спасибо, ${name}! Ваше сообщение отправлено. Я свяжусь с вами в течение 24 часов.`);
        
        // Очищаем форму
        this.reset();
    });
}

// ========== АНИМАЦИЯ ПРИ СКРОЛЛЕ ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Наблюдаем за элементами для анимации
document.querySelectorAll('.service-card, .project-vertical, .why-card').forEach(el => {
    observer.observe(el);
});

// ========== ИЗМЕНЕНИЕ НАВБАРА ПРИ СКРОЛЛЕ ==========
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 15, 0.95)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 10, 15, 0.8)';
        navbar.style.boxShadow = 'none';
    }
});

// ========== ИНИЦИАЛИЗАЦИЯ ==========
document.addEventListener('DOMContentLoaded', () => {
    // Инициализируем видеофон
    initVideo();
    
    // Добавляем обработчик для кнопки воспроизведения/паузы
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', togglePlayPause);
    }
    
    // Добавляем класс для анимации существующим элементам
    document.querySelectorAll('.service-card, .project-vertical, .why-card').forEach(el => {
        el.classList.add('animate');
    });
});