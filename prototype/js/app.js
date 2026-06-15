/* AiCrew — Theme Switcher Dropdown + Shared Logic */
(function(){
  const themes = [
    { id:'neon-dark',    label:'暗夜霓虹', colors:['#6366f1','#a855f7','#00d4ff'] },
    { id:'ocean-blue',   label:'深海蓝调', colors:['#0ea5e9','#22d3ee','#38bdf8'] },
    { id:'sunset-warm',  label:'日落暖橙', colors:['#f97316','#f43f5e','#fbbf24'] },
    { id:'aurora-green', label:'极光绿野', colors:['#10b981','#06d6a0','#34d399'] },
    { id:'purple-haze',  label:'紫雾迷梦', colors:['#a855f7','#c084fc','#818cf8'] },
    { id:'light',        label:'明亮清爽', colors:['#f1f5f9','#e2e8f0','#94a3b8'] }
  ];
  const saved = localStorage.getItem('aicrew-theme') || 'neon-dark';
  document.documentElement.setAttribute('data-theme', saved);

  /* Build dropdown switcher */
  const wrapper = document.createElement('div');
  wrapper.className = 'theme-switcher-dropdown';
  const current = themes.find(t=>t.id===saved) || themes[0];

  wrapper.innerHTML = `
    <button class="theme-trigger" id="themeTrigger">
      <span class="theme-dot" style="background:linear-gradient(135deg,${current.colors.join(',')})"></span>
      <span class="theme-label-text">${current.label}</span>
      <svg class="theme-arrow" width="12" height="12" viewBox="0 0 12 12"><path d="M3 5l3 3 3-3" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/></svg>
    </button>
    <div class="theme-dropdown" id="themeDropdown">
      ${themes.map(t=>`
        <button class="theme-option${t.id===saved?' active':''}" data-theme="${t.id}">
          <span class="theme-dot" style="background:linear-gradient(135deg,${t.colors.join(',')})"></span>
          <span>${t.label}</span>
          ${t.id===saved?'<svg width="14" height="14" viewBox="0 0 14 14"><path d="M3 7l3 3 5-5" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg>':''}
        </button>
      `).join('')}
    </div>
  `;
  document.body.appendChild(wrapper);

  const trigger = document.getElementById('themeTrigger');
  const dropdown = document.getElementById('themeDropdown');

  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('open');
    trigger.classList.toggle('open');
  });
  document.addEventListener('click', () => {
    dropdown.classList.remove('open');
    trigger.classList.remove('open');
  });

  wrapper.querySelectorAll('.theme-option').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const t = btn.dataset.theme;
      document.documentElement.setAttribute('data-theme', t);
      localStorage.setItem('aicrew-theme', t);
      // Update trigger
      const theme = themes.find(x=>x.id===t);
      trigger.querySelector('.theme-dot').style.background = `linear-gradient(135deg,${theme.colors.join(',')})`;
      trigger.querySelector('.theme-label-text').textContent = theme.label;
      // Update active state
      wrapper.querySelectorAll('.theme-option').forEach(o => o.classList.remove('active'));
      btn.classList.add('active');
      dropdown.classList.remove('open');
      trigger.classList.remove('open');
    });
  });

  /* Highlight active nav */
  const page = location.pathname.split('/').pop() || 'dashboard.html';
  document.querySelectorAll('.nav-item').forEach(a => {
    if(a.getAttribute('href')===page) a.classList.add('active');
  });
})();
