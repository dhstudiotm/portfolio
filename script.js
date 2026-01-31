// ========== ВИДЕОФОН ==========
const bgVideo = document.getElementById('bgVideo');
const playPauseBtn = document.getElementById('playPauseBtn');
const playPauseIcon = document.getElementById('playPauseIcon');

let isPlaying = true;

// Функция для отладки
function debugVideo() {
    console.log('=== DEBUG VIDEO ===');
    console.log('Элемент видео:', bgVideo);
    console.log('Источник:', bgVideo.src);
    console.log('Готовность:', bgVideo.readyState);
    console.log('Ошибка:', bgVideo.error);
    console.log('==================');
}

// Инициализация видео
function initVideo() {
    if (!bgVideo) {
        console.error('❌ Элемент video не найден!');
        return;
    }
    
    console.log('🎬 Инициализация видеофона...');
    debugVideo();
    
    // Устанавливаем обработчики событий
    bgVideo.addEventListener('loadeddata', function() {
        console.log('✅ Видео загружено успешно');
        console.log('Длительность:', bgVideo.duration.toFixed(1), 'секунд');
        console.log('Разрешение:', bgVideo.videoWidth, 'x', bgVideo.videoHeight);
        console.log('Атрибуты:', 'autoplay=' + bgVideo.autoplay, 'muted=' + bgVideo.muted, 'loop=' + bgVideo.loop);
    });
    
    bgVideo.addEventListener('canplay', function() {
        console.log('✅ Видео готово к воспроизведению');
        // Пробуем запустить воспроизведение программно
        const playPromise = bgVideo.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                console.log('✅ Автовоспроизведение запущено');
                isPlaying = true;
                updatePlayIcon();
            }).catch(error => {
                console.log('⚠️ Автовоспроизведение заблокировано:', error);
                // Показываем кнопку воспроизведения
                playPauseIcon.classList.remove('fa-pause');
                playPauseIcon.classList.add('fa-play');
                isPlaying = false;
            });
        }
    });
    
    bgVideo.addEventListener('error', function(e) {
        console.error('❌ Ошибка загрузки видео:', e);
        console.error('Код ошибки:', bgVideo.error ? bgVideo.error.code : 'неизвестно');
        console.error('Сообщение:', bgVideo.error ? bgVideo.error.message : 'нет сообщения');
        
        // Показываем градиентный фон при ошибке
        document.querySelector('.video-bg').style.background = 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%)';
        document.querySelector('.video-bg').style.animation = 'gradientShift 15s ease infinite';
        document.querySelector('.video-bg').style.backgroundSize = '400% 400%';
    });
    
    bgVideo.addEventListener('play', function() {
        console.log('▶️ Воспроизведение началось');
        isPlaying = true;
        updatePlayIcon();
    });
    
    bgVideo.addEventListener('pause', function() {
        console.log('⏸️ Воспроизведение приостановлено');
        isPlaying = false;
        updatePlayIcon();
    });
    
    // Обновляем иконку каждые 100мс (на случай проблем с автовоспроизведением)
    setTimeout(updatePlayIcon, 100);
    setTimeout(updatePlayIcon, 500);
    setTimeout(updatePlayIcon, 1000);
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
    
    try {
        if (isPlaying) {
            bgVideo.pause();
        } else {
            const playPromise = bgVideo.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.error('Ошибка воспроизведения:', error);
                });
            }
        }
    } catch (error) {
        console.error('Ошибка при переключении видео:', error);
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
        
        // Здесь можно добавить отправку на сервер
        // Например, через Telegram бота
        
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
    console.log('🚀 Страница загружена');
    
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
    
    // Проверяем видео через 2 секунды
    setTimeout(debugVideo, 2000);
});

// ========== АНИМАЦИЯ ГРАДИЕНТА (запасной вариант) ==========
const style = document.createElement('style');
style.textContent = `
    @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
`;
document.head.appendChild(style);
// Мобильное меню
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Меняем иконку
        const icon = mobileMenuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Закрываем меню при клике на ссылку
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
}