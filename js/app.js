/**
 * 小说角色百科 - 应用逻辑
 */
(function () {
  let currentView = 'home'; // home | category | subcategory
  let currentCategoryId = null;
  let currentSubCategoryId = null;
  let currentCharacterId = null;

  const app = document.getElementById('app');

  function renderGender(gender) {
  // 兼容：gender 可能是 "男"/"女" 或者 "male"/"female"
  const g = (gender || '').toString().trim().toLowerCase();

  if (g === '女' || g === 'female' || g === 'f') {
    return `<span class="gender-badge female">♀ 女</span>`;
  }
  if (g === '男' || g === 'male' || g === 'm') {
    return `<span class="gender-badge male">♂ 男</span>`;
  }
  return `<span class="gender-badge unknown">?</span>`;
}

  function init() {
    renderHome();
    window.addEventListener('popstate', handlePopState);
  }

  function pushState(view, catId, subCatId) {
    const state = { view, catId, subCatId };
    history.pushState(state, '', '#');
    currentView = view;
    currentCategoryId = catId || null;
    currentSubCategoryId = subCatId || null;
  }

  function handlePopState() {
    const state = history.state;
    if (!state || state.view === 'home') {
      renderHome();
    } else if (state.view === 'category') {
      renderCategory(state.catId, false);
    }
  }

  /* ========== 首页：大分类 ========== */
  function renderHome() {
    currentView = 'home';
    currentCategoryId = null;
    const cats = NOVEL_DATA.categories;
    app.innerHTML = `
      <div class="home-view animate-fadeIn">
        <div class="home-header">
          <div class="header-ornament-left"></div>
          <h1 class="home-title">角色百科</h1>
          <p class="home-subtitle">点击阵营查看旗下角色</p>
          <div class="header-ornament-right"></div>
        </div>
        <div class="categories-grid">
          ${cats.map((cat, i) => `
            <div class="category-card" data-cat-id="${cat.id}" style="--cat-color: ${cat.color}; --delay: ${i * 0.1}s; background: ${cat.bgGradient};" onclick="window.__app.openCategory('${cat.id}')">
              <div class="card-border-top"></div>
              <div class="card-border-bottom"></div>
              <div class="card-icon">${cat.icon}</div>
              <h2 class="card-title">${cat.name}</h2>
              <p class="card-subtitle">${cat.subtitle}</p>
              <div class="card-info">
                <span>${cat.subCategories.length} 个势力</span>
                <span class="card-dot">·</span>
                <span>${cat.subCategories.reduce((sum, sc) => sum + sc.characters.length, 0)} 位角色</span>
              </div>
              <div class="card-arrow">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  /* ========== 分类页：子分类 + 角色列表 ========== */
  function renderCategory(catId, doPush = true) {
    const cat = NOVEL_DATA.categories.find(c => c.id === catId);
    if (!cat) return;
    if (doPush) pushState('category', catId);
    currentCategoryId = catId;

    // 默认选第一个子分类
    const firstSub = cat.subCategories[0];
    currentSubCategoryId = firstSub?.id;

    app.innerHTML = `
      <div class="category-view animate-fadeIn" style="--cat-color: ${cat.color}">
        <div class="category-header" style="background: ${cat.bgGradient}">
          <button class="back-btn" onclick="window.__app.goHome()">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
            返回
          </button>
          <div class="category-header-content">
            <span class="category-icon">${cat.icon}</span>
            <h1 class="category-name">${cat.name}</h1>
            <p class="category-subtitle-text">${cat.subtitle}</p>
          </div>
        </div>
        <div class="sub-tabs-wrapper">
          <div class="sub-tabs" id="subTabs">
            ${cat.subCategories.map(sc => `
              <button class="sub-tab ${sc.id === currentSubCategoryId ? 'active' : ''}"
                      data-sub-id="${sc.id}"
                      onclick="window.__app.switchSub('${catId}', '${sc.id}')">
                ${sc.name}
              </button>
            `).join('')}
          </div>
        </div>
        <div class="characters-area" id="charactersArea">
          ${renderCharacterGrid(firstSub)}
        </div>
      </div>
    `;
  }

function renderCharacterGrid(subCat) {
  if (!subCat) return '<p class="empty-text">暂无角色</p>';

  const chars = subCat.characters || [];

  // ✅ 没有 group：完全沿用你以前的渲染
  const hasGroup = chars.some(ch => ch.group && String(ch.group).trim());
  if (!hasGroup) {
    return `
      <div class="sub-desc">${subCat.desc}</div>
      <div class="characters-grid">
        ${chars.map((ch, i) => `
          <div class="character-card" style="--delay: ${i * 0.05}s" onclick="window.__app.openCharacter('${ch.id}')">
            <div class="char-avatar">
              <div class="char-avatar-inner">${ch.name.charAt(0)}</div>
            </div>
            <div class="char-info">
             <div class="char-name">${ch.name}</div>
             <div class="char-role">${renderGender(ch.gender)}</div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // ✅ 有 group：分组显示
  const order = subCat.groupOrder && subCat.groupOrder.length
    ? subCat.groupOrder
    : ["凌家宗族", "凌家弟子", "其他"];

  const groups = new Map();
  for (const ch of chars) {
    const g = (ch.group && String(ch.group).trim()) ? String(ch.group).trim() : "其他";
    if (!groups.has(g)) groups.set(g, []);
    groups.get(g).push(ch);
  }

  const groupNames = Array.from(groups.keys()).sort((a, b) => {
    const ia = order.indexOf(a);
    const ib = order.indexOf(b);
    if (ia === -1 && ib === -1) return a.localeCompare(b, 'zh');
    if (ia === -1) return 1;
    if (ib === -1) return -1;
    return ia - ib;
  });

  return `
    <div class="sub-desc">${subCat.desc}</div>
    ${groupNames.map((gname) => {
      const list = groups.get(gname) || [];
      if (!list.length) return '';
      return `
        <div class="group-section">
          <div class="group-header">
            <div class="group-title">${gname}</div>
            <div class="group-count">${list.length} 人</div>
          </div>
          <div class="characters-grid">
            ${list.map((ch, i) => `
              <div class="character-card" style="--delay: ${i * 0.05}s" onclick="window.__app.openCharacter('${ch.id}')">
                <div class="char-avatar">
                  <div class="char-avatar-inner">${ch.name.charAt(0)}</div>
                </div>
                <div class="char-info">
                 <div class="char-name">${ch.name}</div>
                 <div class="char-role">${renderGender(ch.gender)}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }).join('')}
  `;
}

  function switchSub(catId, subId) {
    const cat = NOVEL_DATA.categories.find(c => c.id === catId);
    if (!cat) return;
    const sub = cat.subCategories.find(s => s.id === subId);
    if (!sub) return;
    currentSubCategoryId = subId;

    // 更新 tab 状态
    document.querySelectorAll('.sub-tab').forEach(t => {
      t.classList.toggle('active', t.dataset.subId === subId);
    });

    // 更新角色区域
    const area = document.getElementById('charactersArea');
    area.innerHTML = renderCharacterGrid(sub);
    area.classList.add('animate-fadeIn');
    requestAnimationFrame(() => {
      area.classList.remove('animate-fadeIn');
    });
  }

  /* ========== 角色弹窗 ========== */
  function openCharacter(charId) {
    // 在所有数据中查找角色
    let character = null;
    for (const cat of NOVEL_DATA.categories) {
      for (const sub of cat.subCategories) {
        const found = sub.characters.find(c => c.id === charId);
        if (found) { character = found; break; }
      }
      if (character) break;
    }
    if (!character) return;
    currentCharacterId = charId;
    showModal(character);
  }

  function showModal(ch) {
    // 关闭已有弹窗
    closeModal();

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = 'characterModal';
    modal.innerHTML = `
      <div class="modal-backdrop" onclick="window.__app.closeModal()"></div>
      <div class="modal-container animate-slideUp">
        <button class="modal-close" onclick="window.__app.closeModal()">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
        <div class="modal-body">
          <div class="modal-top">
            <div class="modal-avatar">
              <div class="modal-avatar-inner">${ch.name.charAt(0)}</div>
            </div>
            <div class="modal-title-area">
              <div class="modal-char-title">${ch.title}</div>
              <h2 class="modal-char-name">${ch.name}</h2>
             <span class="modal-char-role">${renderGender(ch.gender)}</span>
            </div>
          </div>
          <div class="modal-desc">${ch.desc}</div>
          <div class="modal-attributes">
            ${Object.entries(ch.attributes).map(([k, v]) => `
              <div class="attr-item">
                <span class="attr-label">${k}</span>
                <span class="attr-value">${v}</span>
              </div>
            `).join('')}
          </div>
          ${ch.relations && ch.relations.length > 0 ? `
            <div class="modal-relations">
              <h3 class="relations-title">相关角色</h3>
              <div class="relations-grid">
                ${ch.relations.map(r => `
                  <div class="relation-item" onclick="event.stopPropagation(); window.__app.openCharacter('${r.charId}')">
                    <div class="relation-avatar">
                      <div class="relation-avatar-inner">${r.name.charAt(0)}</div>
                    </div>
                    <div class="relation-name">${r.name}</div>
                    <div class="relation-type">${r.relation}</div>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    // 动画
    requestAnimationFrame(() => {
      modal.classList.add('show');
    });

    // ESC 关闭
    const escHandler = (e) => {
      if (e.key === 'Escape') {
        closeModal();
        document.removeEventListener('keydown', escHandler);
      }
    };
    document.addEventListener('keydown', escHandler);
  }

  function closeModal() {
    const modal = document.getElementById('characterModal');
    if (modal) {
      modal.classList.remove('show');
      setTimeout(() => {
        modal.remove();
        document.body.style.overflow = '';
      }, 300);
    }
  }

  function goHome() {
    history.pushState({ view: 'home' }, '', '#');
    renderHome();
  }

  // 暴露给 HTML onclick
  window.__app = {
    openCategory: (id) => renderCategory(id),
    goHome,
    switchSub,
    openCharacter,
    closeModal
  };

  // 启动
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
