// 移动端菜单切换
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// 点击导航链接后关闭移动端菜单
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        if (mobileMenu) {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// 滚动时导航栏效果
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
    }
    
    lastScroll = currentScroll;
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
document.querySelectorAll('.service-card, .product-card, .stat-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// 平滑滚动已经通过CSS scroll-behavior: smooth实现了

// 控制台欢迎信息
console.log('%c陕西江南环保科技服务有限公司', 'color:#0891B2;font-size:20px;font-weight:bold;');
console.log('%c设计: Swiss Modernism 2.0', 'color:#16A34A;font-size:14px;');
console.log('%c增加了 Canvas 粒子连线背景效果', 'color:#64748B;font-size:12px;');
