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
        { user: 'coleJS992', wagered: 133.27, lastSeen: '01/21/2026' },
        { user: 'brodygroom45544', wagered: 96.97, lastSeen: '01/21/2026' },
        { user: 'skill10000x', wagered: 32.22, lastSeen: '01/20/2026' },
        { user: 'EarlyKit260', wagered: 0.00, lastSeen: '01/21/2026' },
        { user: 'darvini', wagered: 0.00, lastSeen: '01/21/2026' }
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
        const platformInfoSolpump = document.getElementById('platform-info-solpump');
        const platformInfoRainbet = document.getElementById('platform-info-rainbet');

        function triggerFadeIn(element) {
            if (!element) return;
            element.classList.remove('fade-in');
            void element.offsetWidth; // trigger reflow
            element.classList.add('fade-in');
        }

        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                filterBtns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                
                const platform = e.target.dataset.platform;
                
                if (platform === 'solpump') {
                    leaderboardTitleText.textContent = 'SolPump Top Affiliates';
                    wageredHeader.textContent = 'Wagered (SOL)';
                    if (platformInfoSolpump) {
                        platformInfoSolpump.style.display = 'block';
                        triggerFadeIn(platformInfoSolpump);
                    }
                    if (platformInfoRainbet) platformInfoRainbet.style.display = 'none';
                    renderLeaderboard(solpumpData, 'solpump');
                    triggerFadeIn(leaderboardBody);
                } else if (platform === 'rainbet') {
                    leaderboardTitleText.textContent = 'Rainbet Top Affiliates';
                    wageredHeader.textContent = 'Wagered (USD)';
                    if (platformInfoSolpump) platformInfoSolpump.style.display = 'none';
                    if (platformInfoRainbet) {
                        platformInfoRainbet.style.display = 'block';
                        triggerFadeIn(platformInfoRainbet);
                    }
                    renderLeaderboard(rainbetData, 'rainbet');
                    triggerFadeIn(leaderboardBody);
                }
            });
        });
    }

    // Instagram Feed Fetcher
    async function fetchInstagramPosts() {
        const feedContainer = document.getElementById('instagram-feed');
        if (!feedContainer) return;

        try {
            // Using a public RSS proxy to bypass Instagram's strict CORS/scraping blocks
            // Note: This relies on a third-party service and may be rate-limited or delayed
            const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Frsshub.app%2Finstagram%2Fuser%2Fyopoppa.media');
            const data = await response.json();

            if (data.status === 'ok' && data.items && data.items.length > 0) {
                feedContainer.innerHTML = ''; // Clear loading spinner
                
                // Get top 5 posts
                const posts = data.items.slice(0, 5);
                
                posts.forEach((post, index) => {
                    // Extract shortcode from URL (e.g., https://www.instagram.com/p/SHORTCODE/)
                    const urlParts = post.link.split('/');
                    const shortcode = urlParts[urlParts.indexOf('p') + 1];
                    
                    // Clean up title (remove hashtags or truncate if too long)
                    let title = post.title || `Instagram Post #${index + 1}`;
                    if (title.length > 40) title = title.substring(0, 40) + '...';

                    const postHtml = `
                        <div class="video-card ig-card" style="display: block; padding: 20px; background: var(--bg-card); border-radius: 16px; border: 1px solid rgba(255,255,255,0.05);">
                            <div class="embed-container" style="margin-bottom: 20px; border-radius: 8px; overflow: hidden; background: #000;">
                                <iframe src="https://www.instagram.com/p/${shortcode}/embed" width="100%" height="400" frameborder="0" scrolling="no" allowtransparency="true"></iframe>
                            </div>
                            <div class="video-info" style="display: flex; justify-content: space-between; align-items: center;">
                                <h3 style="font-size: 1.1rem;" title="${post.title}">${title}</h3>
                                <a href="${post.link}" target="_blank" rel="noopener" class="btn btn-outline-sol" style="padding: 8px 16px; font-size: 0.9rem;">Source Link</a>
                            </div>
                        </div>
                    `;
                    feedContainer.insertAdjacentHTML('beforeend', postHtml);
                });
            } else {
                throw new Error('Failed to load posts or no posts found');
            }
        } catch (error) {
            console.error('Error fetching Instagram posts:', error);
            feedContainer.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 40px; background: var(--bg-card); border-radius: 16px; border: 1px solid rgba(255,255,255,0.05);">
                    <p style="color: var(--text-secondary); margin-bottom: 16px;">Unable to load live Instagram feed at this time.</p>
                    <a href="https://www.instagram.com/yopoppa.media/" target="_blank" rel="noopener" class="btn btn-outline-sol">View Profile on Instagram</a>
                </div>
            `;
        }
    }

    // Initialize Instagram fetch
    fetchInstagramPosts();
});
