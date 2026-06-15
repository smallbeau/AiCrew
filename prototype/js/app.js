/* AiCrew — Theme Switcher + Shared Logic */
(function(){
  // Theme
  const themes = ['neon-dark','ocean-blue','sunset-warm','aurora-green','purple-haze','light'];
  const labels = ['暗夜','海洋','日落','极光','紫雾','明亮'];
  const saved = localStorage.getItem('aicrew-theme') || 'neon-dark';
  document.documentElement.setAttribute('data-theme', saved);

  // Build switcher
  const sw = document.createElement('div');
  sw.className = 'theme-switcher';
  sw.innerHTML = '<span class="theme-label">主题</span>';
  themes.forEach((t,i) => {
    const b = document.createElement('button');
    b.className = 'theme-btn' + (t===saved?' active':'');
    b.dataset.set = t;
    b.title = labels[i];
    b.onclick = () => {
      document.documentElement.setAttribute('data-theme', t);
      localStorage.setItem('aicrew-theme', t);
      sw.querySelectorAll('.theme-btn').forEach(x=>x.classList.remove('active'));
      b.classList.add('active');
    };
    sw.appendChild(b);
  });
  document.body.appendChild(sw);

  // Highlight active nav
  const page = location.pathname.split('/').pop() || 'dashboard.html';
  document.querySelectorAll('.nav-item').forEach(a => {
    if(a.getAttribute('href')===page) a.classList.add('active');
  });
})();
