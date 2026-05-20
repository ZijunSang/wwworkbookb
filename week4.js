document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modalImg');
  const modalDesc = document.getElementById('modalDesc');

  // 给所有卡片绑定点击
  document.querySelectorAll('.week4_content').forEach(item => {
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

  // 点击关闭弹窗
  modal.addEventListener('click', () => {
    modal.style.display = 'none';
  });
});