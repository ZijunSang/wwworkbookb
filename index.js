document.addEventListener('DOMContentLoaded', () => {
    const intro    = document.getElementById('intro');
    const video    = document.getElementById('introVideo');
    const skipBtn  = document.getElementById('skipBtn');
    const soundBtn = document.getElementById('soundBtn');

    document.body.style.overflowY = 'hidden';

    function exitIntro() {
        intro.style.opacity = '0';
        setTimeout(() => {
            intro.style.display = 'none';
            document.body.style.overflowY = 'auto';
        }, 800);
    }

    video.addEventListener('ended', exitIntro);

    skipBtn.addEventListener('click', () => {
        video.pause();
        exitIntro();
    });

    soundBtn.addEventListener('click', () => {
        video.muted = !video.muted;
        soundBtn.textContent = video.muted ? 'Unmute' : 'Mute';
    });

    intro.addEventListener('click', (e) => {
        if (e.target.tagName.toLowerCase() === 'button') return;
        video.pause();
        exitIntro();
    });

    video.addEventListener('loadedmetadata', () => {
        const duration = video.duration;
        const caption = document.getElementById('intro-caption');
        if (caption) {
            caption.style.setProperty('--caption-fade-delay', `${duration - 2}s`);
        }
    });

    const trailList = [];
    const maxTrail  = 50;
    let mouseX = 0, mouseY = 0;

    function createCircle(x, y) {
        const colors = ['#ff4df0', '#a6b2ff', '#00ffe0', '#ffe44d', '#ff6b6b', '#7b00ff'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        const circle = document.createElement('div');
        circle.className = 'circle-trail';
        circle.style.left        = `${x}px`;
        circle.style.top         = `${y}px`;
        circle.style.opacity     = 1;
        circle.style.width       = '10px';
        circle.style.height      = '10px';
        circle.style.borderRadius = '50%';
        circle.style.background  = randomColor;
        circle.style.transform   = 'translate(-50%, -50%) scale(1)';
        document.body.appendChild(circle);
        trailList.push(circle);

        setTimeout(() => {
            circle.style.opacity   = 0;
            circle.style.transform = 'translate(-50%, -50%) scale(0)';
            setTimeout(() => circle.remove(), 700);
        }, 100);

        if (trailList.length > maxTrail) {
            trailList.shift().remove();
        }
    }

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        createCircle(mouseX, mouseY);
    });
});