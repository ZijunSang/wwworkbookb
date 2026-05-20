document.addEventListener('DOMContentLoaded', () => {
  const modal         = document.getElementById('modal');
  const modalImg      = document.getElementById('modalImg');
  const modalVideo    = document.getElementById('modalVideo');
  const modalVideoSrc = document.getElementById('modalVideoSrc');
  const modalDesc     = document.getElementById('modalDesc');

  document.querySelectorAll('.week8_content').forEach(item => {
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
});