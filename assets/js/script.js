// Create circuit lines animation
        function createCircuitLines() {
            const container = document.getElementById('circuitLines');
            const horizontalLines = 8;
            const verticalLines = 6;

            // Horizontal lines
            for (let i = 0; i < horizontalLines; i++) {
                const line = document.createElement('div');
                line.className = 'circuit-line';
                line.style.top = Math.random() * 100 + '%';
                line.style.animationDelay = Math.random() * 8 + 's';
                line.style.animationDuration = (Math.random() * 4 + 6) + 's';
                container.appendChild(line);
            }

            // Vertical lines
            for (let i = 0; i < verticalLines; i++) {
                const line = document.createElement('div');
                line.className = 'circuit-line vertical';
                line.style.left = Math.random() * 100 + '%';
                line.style.animationDelay = Math.random() * 10 + 's';
                line.style.animationDuration = (Math.random() * 5 + 8) + 's';
                container.appendChild(line);
            }
        }

        // Enhanced navbar scroll effect
        let lastScrollY = 0;
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                navbar.style.background = 'rgba(5, 5, 5, 0.98)';
                navbar.style.borderBottomColor = 'rgba(255, 255, 255, 0.08)';
            } else {
                navbar.style.background = 'rgba(10, 10, 10, 0.95)';
                navbar.style.borderBottomColor = 'rgba(255, 255, 255, 0.05)';
            }
            
            // Hide/show navbar on scroll
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            lastScrollY = currentScrollY;
        });

        // Service card interactions with stagger effect
        document.querySelectorAll('.service-card').forEach((card, index) => {
            card.style.animationDelay = (index * 0.1) + 's';
            
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });

        // Mobile menu toggle
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');

        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
        });

        // Initialize circuit lines
        createCircuitLines();

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
                
                // Close mobile menu if open
                navLinks.classList.remove('active');
                mobileMenuBtn.textContent = '☰';
            });
        });

        // Add entrance animations on scroll
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

        // Observe service cards for animation
        document.querySelectorAll('.service-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            observer.observe(card);
        });

        // Newsletter form functionality (footer)
        document.querySelector('.newsletter-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('.newsletter-input').value;
            if (email) {
                // Add success feedback
                const btn = this.querySelector('.newsletter-btn');
                const originalText = btn.textContent;
                btn.textContent = 'Subscribed!';
                btn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
                
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = 'linear-gradient(135deg, #60a5fa 0%, #a855f7 100%)';
                    this.querySelector('.newsletter-input').value = '';
                }, 2000);
            }
        });

        // Add scroll effect to footer glow
        window.addEventListener('scroll', () => {
            const footer = document.querySelector('.footer');
            const footerRect = footer.getBoundingClientRect();
            const isVisible = footerRect.top < window.innerHeight;
            
            if (isVisible) {
                footer.style.setProperty('--scroll-progress', 
                    Math.min(1, (window.innerHeight - footerRect.top) / window.innerHeight));
            }
        });