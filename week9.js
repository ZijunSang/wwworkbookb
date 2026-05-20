document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modalImg');
  const modalDesc = document.getElementById('modalDesc');

  document.querySelectorAll('.week9_content').forEach(item => {
    const img = item.querySelector('img');
    const tip = item.querySelector('.view-tip');
    const desc = item.querySelector('.full-desc').innerText.trim();
    const src = img.src;

    function open() {
      modalImg.src = src;
      modalDesc.innerText = desc;
      modal.style.display = 'flex';
    }

    img.addEventListener('click', (e) => {
      e.stopPropagation();
      open();
    });

    tip.addEventListener('click', (e) => {
      e.stopPropagation();
      open();
    });
  });

  modal.addEventListener('click', () => {
    modal.style.display = 'none';
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