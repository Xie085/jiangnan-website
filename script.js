// 移动端菜单
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuClose = document.getElementById('mobile-menu-close');
const mobileLinks = document.querySelectorAll('.mobile-link');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.add('open');
    });
}

if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
    });
}

if (mobileLinks) {
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
        });
    });
}

// 滚动导航效果
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// 点击导航链接关闭移动端菜单
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        if (mobileMenu) {
            mobileMenu.classList.remove('open');
        }
    });
});

// 滚动动画 - 元素进入视口时添加渐入效果
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

// 观察需要动画的元素
document.querySelectorAll('.service-card, .product-card, .stat-item, .credential-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// 控制台欢迎信息
console.log('%c陕西江南环保科技服务有限公司', 'color:#16A34A;font-size:20px;font-weight:bold;');
console.log('%cDesign: Gemini + AI Adaptation', 'color:#111;font-size:14px;');
console.log('%cCanvas particles background enabled', 'color:#666;font-size:12px;');
