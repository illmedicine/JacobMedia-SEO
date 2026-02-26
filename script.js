// =============================================
// JACOBMEDIA - Interactive Scripts
// =============================================

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });

        // Close menu on link click
        document.querySelectorAll('.mobile-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
            });
        });
    }

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveNav() {
        const scrollY = window.scrollY + 100;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollY >= top && scrollY < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });

    // Scroll reveal animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll(
        '.section-header, .feature-card, .sol-card, .video-card, .cta-card, .stream-embed'
    ).forEach(el => observer.observe(el));

    // Counter animation for hero stats
    const statValues = document.querySelectorAll('.stat-value[data-count]');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const count = parseInt(target.getAttribute('data-count'));
                animateCounter(target, 0, count, 1500);
                counterObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    statValues.forEach(el => counterObserver.observe(el));

    function animateCounter(element, start, end, duration) {
        const range = end - start;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
            const current = Math.round(start + range * eased);
            element.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        
        if (currentScroll > 50) {
            navbar.style.background = 'rgba(10, 10, 15, 0.95)';
            navbar.style.borderBottomColor = 'rgba(255, 255, 255, 0.08)';
        } else {
            navbar.style.background = 'rgba(10, 10, 15, 0.8)';
            navbar.style.borderBottomColor = 'rgba(255, 255, 255, 0.05)';
        }

        lastScroll = currentScroll;
    }, { passive: true });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Parallax effect on hero glows
    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;

            document.querySelectorAll('.bg-glow').forEach((glow, i) => {
                const speed = (i + 1) * 0.5;
                glow.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
            });
        });
    }

    // SolPump Leaderboard Data
    const solpumpData = [
        { user: 'YNSage', wagered: 8.6803, lastSeen: '12/27/2025' },
        { user: 'JayWooki', wagered: 1.1610, lastSeen: '12/13/2025' },
        { user: 'WTOMXX', wagered: 0.6115, lastSeen: '12/28/2025' },
        { user: 'WTOMX', wagered: 0.2117, lastSeen: '12/18/2025' },
        { user: 'jusagamblerkick', wagered: 0.1898, lastSeen: '12/17/2025' },
        { user: 'Victamna', wagered: 0.1214, lastSeen: '01/18/2026' },
        { user: 'BAKASTA987', wagered: 0.1078, lastSeen: '12/17/2025' },
        { user: 'WAGURIANYA090', wagered: 0.0771, lastSeen: '12/17/2025' },
        { user: 'IAMKURUSO', wagered: 0.0701, lastSeen: '12/17/2025' },
        { user: 'KICK-YOPOPPA', wagered: 0.0689, lastSeen: '12/17/2025' }
    ];

    // Rainbet Leaderboard Data
    const rainbetData = [
        { user: 'CryptoKing', wagered: 15420.50, lastSeen: '02/25/2026' },
        { user: 'RainMaker', wagered: 12350.25, lastSeen: '02/24/2026' },
        { user: 'BetMaster', wagered: 8940.00, lastSeen: '02/25/2026' },
        { user: 'LuckyStrike', wagered: 5620.75, lastSeen: '02/23/2026' },
        { user: 'HighRoller', wagered: 4210.10, lastSeen: '02/25/2026' },
        { user: 'CoinFlipper', wagered: 3150.00, lastSeen: '02/22/2026' },
        { user: 'SatoshiFan', wagered: 2840.50, lastSeen: '02/24/2026' },
        { user: 'DiamondHands', wagered: 1950.25, lastSeen: '02/21/2026' },
        { user: 'MoonBoy', wagered: 1420.00, lastSeen: '02/25/2026' },
        { user: 'WhaleAlert', wagered: 980.50, lastSeen: '02/20/2026' }
    ];

    const leaderboardBody = document.getElementById('leaderboard-body');
    const leaderboardTitleText = document.getElementById('leaderboard-title-text');
    const wageredHeader = document.getElementById('wagered-header');
    
    if (leaderboardBody) {
        function renderLeaderboard(data, platform) {
            leaderboardBody.innerHTML = '';
            data.forEach((row, index) => {
                const tr = document.createElement('tr');
                
                // Add rank classes for top 3
                let rankClass = '';
                if (index === 0) rankClass = 'rank-1';
                else if (index === 1) rankClass = 'rank-2';
                else if (index === 2) rankClass = 'rank-3';

                let wageredIcon = '';
                if (platform === 'solpump') {
                    wageredIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M8 15h8l-2-3H10l-2 3zm0-4h8l-2-3H10l-2 3z"/>
                    </svg>`;
                } else {
                    wageredIcon = `<span style="font-weight: bold; margin-right: 4px;">$</span>`;
                }

                tr.innerHTML = `
                    <td><span class="rank-badge ${rankClass}">${index + 1}</span></td>
                    <td class="user-cell">
                        <div class="user-avatar">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${row.user}&backgroundColor=1c1c28" alt="${row.user}">
                        </div>
                        <span class="user-name">${row.user}</span>
                    </td>
                    <td class="wagered-cell ${platform === 'rainbet' ? 'text-rainbet-wagered' : ''}">
                        ${wageredIcon}
                        ${platform === 'solpump' ? row.wagered.toFixed(4) : row.wagered.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                    </td>
                    <td class="date-cell">${row.lastSeen}</td>
                `;
                leaderboardBody.appendChild(tr);
            });
        }

        // Initial render
        renderLeaderboard(solpumpData, 'solpump');

        // Tab functionality
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                filterBtns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                
                const platform = e.target.dataset.platform;
                
                if (platform === 'solpump') {
                    leaderboardTitleText.textContent = 'SolPump Top Affiliates';
                    wageredHeader.textContent = 'Wagered (SOL)';
                    renderLeaderboard(solpumpData, 'solpump');
                } else if (platform === 'rainbet') {
                    leaderboardTitleText.textContent = 'Rainbet Top Affiliates';
                    wageredHeader.textContent = 'Wagered (USD)';
                    renderLeaderboard(rainbetData, 'rainbet');
                }
            });
        });
    }
});
