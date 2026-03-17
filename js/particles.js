/*
 * Canvas 粒子连线背景效果
 * Connecting particles with mouse interaction
 */

class ParticleNetwork {
    constructor(canvas, options = {}) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.options = Object.assign({
            particleCount: 80,
            particleColor: '#2E7D32',
            lineColor: 'rgba(46, 125, 50, 0.3)',
            particleRadius: 3,
            lineWidth: 1,
            connectionDistance: 150,
            mouseConnectionDistance: 200,
            speed: 1
        }, options);

        this.particles = [];
        this.mouse = {
            x: null,
            y: null,
            radius: this.options.mouseConnectionDistance
        };

        this.init();
        this.bindEvents();
        this.animate();
    }

    init() {
        this.resize();
        this.createParticles();
    }

    resize() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }

    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.options.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * this.options.speed,
                vy: (Math.random() - 0.5) * this.options.speed
            });
        }
    }

    bindEvents() {
        window.addEventListener('resize', () => {
            this.resize();
            this.createParticles();
        });

        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });

        this.canvas.addEventListener('mouseleave', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });
    }

    update() {
        for (let i = 0; i < this.particles.length; i++) {
            let p = this.particles[i];
            
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;

            if (p.x < 0) p.x = 0;
            if (p.x > this.canvas.width) p.x = this.canvas.width;
            if (p.y < 0) p.y = 0;
            if (p.y > this.canvas.height) p.y = this.canvas.height;
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // 绘制粒子
        for (let i = 0; i < this.particles.length; i++) {
            let p1 = this.particles[i];

            // 绘制粒子圆点
            this.ctx.beginPath();
            this.ctx.arc(p1.x, p1.y, this.options.particleRadius, 0, Math.PI * 2);
            this.ctx.fillStyle = this.options.particleColor;
            this.ctx.fill();

            // 粒子之间连线
            for (let j = i + 1; j < this.particles.length; j++) {
                let p2 = this.particles[j];
                let dx = p1.x - p2.x;
                let dy = p1.y - p2.y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.options.connectionDistance) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = this.options.lineColor;
                    this.ctx.lineWidth = this.options.lineWidth * (1 - distance / this.options.connectionDistance);
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.stroke();
                }
            }

            // 鼠标连线
            if (this.mouse.x !== null && this.mouse.y !== null) {
                let dx = p1.x - this.mouse.x;
                let dy = p1.y - this.mouse.y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.mouse.radius) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(46, 125, 50, ${0.6 * (1 - distance / this.mouse.radius)})`;
                    this.ctx.lineWidth = this.options.lineWidth * 1.5;
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(this.mouse.x, this.mouse.y);
                    this.ctx.stroke();
                }
            }
        }
    }

    animate() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        new ParticleNetwork(canvas, {
            particleCount: 60,
            connectionDistance: 160,
            speed: 0.8
        });
    }
});
