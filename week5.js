document.addEventListener('DOMContentLoaded', () => {
  const modal         = document.getElementById('modal');
  const modalImg      = document.getElementById('modalImg');
  const modalVideo    = document.getElementById('modalVideo');
  const modalVideoSrc = document.getElementById('modalVideoSrc');
  const modalDesc     = document.getElementById('modalDesc');

  document.querySelectorAll('.week5_content').forEach(item => {
    const img   = item.querySelector('img');
    const video = item.querySelector('video');
    const tip   = item.querySelector('.view-tip');
    const desc  = item.querySelector('.full-desc')?.innerText.trim() || '';

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
    circle.style.position = 'fixed';
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;
    circle.style.opacity = 1;
    circle.style.width = '10px';
    circle.style.height = '10px';
    circle.style.borderRadius = '50%';
    circle.style.background = randomColor;
    circle.style.transform = 'translate(-50%, -50%) scale(1)';
    circle.style.pointerEvents = 'none';
    circle.style.zIndex = '99999';
    circle.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    
    document.body.appendChild(circle);
    trailList.push(circle);

    setTimeout(() => {
      circle.style.opacity = 0;
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

let portraitCanvas;

function setup() {
  portraitCanvas = createCanvas(420, 500);
  portraitCanvas.parent('portrait-canvas');
}

function draw() {
  background(242, 225, 205);
  let cx = width / 2;
  let cy = height / 2;

  fill(15);
  noStroke();
  ellipse(cx, cy - 80, 280, 220);
  rect(cx - 140, cy - 20, 55, 450);
  rect(cx + 85, cy - 20, 55, 450);

  fill(255, 222, 188);
  ellipse(cx, cy, 220, 260);
  stroke(0);
  strokeWeight(7);
  noFill();
  ellipse(cx - 55, cy - 30, 75, 75);
  ellipse(cx + 55, cy - 30, 75, 75);
  line(cx - 20, cy - 30, cx + 20, cy - 30);

  fill(255);
  noStroke();
  ellipse(cx - 55, cy - 30, 62, 62);
  ellipse(cx + 55, cy - 30, 62, 62);

  let leftPupilX = constrain(mouseX, cx - 75, cx - 35);
  let leftPupilY = constrain(mouseY, cy - 50, cy - 10);
  let rightPupilX = constrain(mouseX, cx + 35, cx + 75);
  let rightPupilY = constrain(mouseY, cy - 50, cy - 10);
  
  fill(0);
  ellipse(leftPupilX, leftPupilY, 22, 22);
  ellipse(rightPupilX, rightPupilY, 22, 22);
  
  stroke(0);
  strokeWeight(4);
  noFill();

  let dis = dist(mouseX, mouseY, cx, cy + 60);
  let smileRange = map(dis, 0, 300, 1.4, 0.2);
  arc(cx, cy + 60, 70, 50, 0, PI * smileRange);
}