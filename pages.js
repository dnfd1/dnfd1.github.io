(function() {

    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const pageLinks = document.querySelectorAll('.page-link');
    const pageWrapper = document.getElementById('page-wrapper');
    const pageContent = document.getElementById('page-content');
    const skinsGrid = document.querySelector('.skins-grid');
    if (pageLinks && pageWrapper) {
        pageLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const destination = this.href;
                pageContent.style.animation = 'fadeOut 0.5s ease-in-out forwards';
                setTimeout(() => {
                    window.location.href = destination;
                }, 500);
            });
        });
    }
    const yearSpan = document.getElementById('current-year');

    // --- THEME TOGGLE LOGIC ---
    const applyTheme = () => {
        const storedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        // Use saved theme OR system preference if no saved theme exists
        if (storedTheme === 'dark' || (!storedTheme && systemPrefersDark)) {
            body.classList.add('dark-mode');
        } else {
            body.classList.remove('dark-mode');
        }
    };

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // --- SKIN GRID LOGIC ---
     if (skinsGrid) {
        fetch('skins.json')
            .then(response => response.json()) 
            .then(skins => {
                skins.forEach(skin => {
                    const cardHTML = `
                        <div class="skin-card">
                            <div class="skin-preview">
                                <img src="${skin.image}" alt="${skin.title} Preview">
                            </div>
                            <div class="skin-info">
                                <h2>${skin.title}</h2>
                                <a href="${skin.downloadLink}" class="download-button" target="_blank" rel="noopener noreferrer">Download</a>
                            </div>
                        </div>
                    `;
                    skinsGrid.innerHTML += cardHTML;
                });
            })
            .catch(error => {
                console.error('Error loading skins:', error);
                skinsGrid.innerHTML = "<p class='container'>Could not load skins. Please try again later.</p>";
            });
    }

    // --- COPYRIGHT YEAR LOGIC ---
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    applyTheme();

    // --- SNOW ---
    document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('snowCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let snowflakes = [];

    const numberOfSnowflakes = 150;
    const maxSnowflakeSize = 5;
    const maxSnowflakeSpeed = 0.25;

    function createSnowflakes() {
        for (let i = 0; i < numberOfSnowflakes; i++) {
        snowflakes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * maxSnowflakeSize,
            speed: Math.random() * maxSnowflakeSpeed,
            density: Math.random() * numberOfSnowflakes
        });
        }
    }

    function drawSnowflakes() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "rgba(255, 174, 219, 0.8)";
        ctx.beginPath();
        for (let i = 0; i < snowflakes.length; i++) {
        const snowflake = snowflakes[i];
        ctx.moveTo(snowflake.x, snowflake.y);
        ctx.arc(snowflake.x, snowflake.y, snowflake.radius, 0, Math.PI * 2, true);
        }
        ctx.fill();
        moveSnowflakes();
    }

    function moveSnowflakes() {

        for (let i = 0; i < snowflakes.length; i++) {
        let snowflake = snowflakes[i];
        snowflake.y += snowflake.speed;

        if (snowflake.y > canvas.height) {
            snowflakes[i] = {
            x: Math.random() * canvas.width,
            y: -10,
            radius: snowflake.radius,
            speed: snowflake.speed,
            density: snowflake.density
            };
        }
        }
    }

    function animateSnow() {
        drawSnowflakes();
        requestAnimationFrame(animateSnow);
    }

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        snowflakes = [];
        createSnowflakes();
    });

    createSnowflakes();
    animateSnow();
    });
})();