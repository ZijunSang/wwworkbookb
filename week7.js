document.addEventListener('DOMContentLoaded', () => {
  const modal         = document.getElementById('modal');
  const modalImg      = document.getElementById('modalImg');
  const modalVideo    = document.getElementById('modalVideo');
  const modalVideoSrc = document.getElementById('modalVideoSrc');
  const modalDesc     = document.getElementById('modalDesc');

  document.querySelectorAll('.week7_content').forEach(item => {
    const img   = item.querySelector('img');
    const video = item.querySelector('video');
    const tip   = item.querySelector('.view-tip');
    const desc  = item.querySelector('.full-desc').innerText.trim();

    function openImage() {
      modalImg.src = img.src;
      modalImg.style.display = 'block';
      modalVideo.style.display = 'none';
      modalVideo.pause();
      modalDesc.innerText = desc;
      modal.style.display = 'flex';
    }

    function openVideo() {
      modalVideoSrc.src = video.querySelector('source').src;
      modalVideo.load();
      modalVideo.style.display = 'block';
      modalImg.style.display = 'none';
      modalDesc.innerText = desc;
      modal.style.display = 'flex';
    }

    if (img) {
      img.addEventListener('click', (e) => {
        e.stopPropagation();
        openImage();
      });
    }

    if (video) {
      video.addEventListener('click', (e) => {
        e.stopPropagation();
        openVideo();
      });
    }

    if (tip) {
      tip.addEventListener('click', (e) => {
        e.stopPropagation();
        if (video) openVideo();
        else if (img) openImage();
      });
    }
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target === modalDesc) {
      modalVideo.pause();
      modal.style.display = 'none';
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