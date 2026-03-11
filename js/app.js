/**
 * 小说角色百科 - 应用逻辑
 */
(function () {
  let currentView = 'home'; // home | category | subcategory | gallery
  let currentCategoryId = null;
  let currentSubCategoryId = null;
  let currentCharacterId = null;
  let currentLightboxList = [];
  let currentLightboxIndex = 0;
  let searchResults = [];

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


  function getAvatarSrc(ch) {
    if (!ch) return 'images/placeholder.png';
    if (ch.avatar && String(ch.avatar).trim()) return ch.avatar;
    if (ch.id && String(ch.id).trim()) return `images/${String(ch.id).trim()}.png`;
    return 'images/placeholder.png';
  }

  function renderAvatarImage(ch, cls, alt) {
    return `<img class="${cls}" src="${getAvatarSrc(ch)}" alt="${alt || (ch?.name || '')}" onerror="this.onerror=null;this.src='images/placeholder.png'">`;
  }

  function findCharacterById(charId) {
    for (const cat of NOVEL_DATA.categories) {
      for (const sub of cat.subCategories) {
        const found = sub.characters.find(c => c.id === charId);
        if (found) return found;
      }
    }
    return null;
  }

  function init() {
    renderHome();
    window.addEventListener('popstate', handlePopState);
    // 点击空白区域关闭搜索下拉
    document.addEventListener('click', (e) => {
      const wrapper = document.querySelector('.search-wrapper');
      if (wrapper && !wrapper.contains(e.target)) {
        clearSearch();
      }
    });
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
    } else if (state.view === 'gallery') {
      renderGallery(state.charId, false);
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
        <div class="search-wrapper">
          <div class="search-container">
            <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            <input type="text" id="searchBox" class="search-input" placeholder="搜索角色名称..." autocomplete="off" oninput="window.__app.searchCharacters(this.value)">
          </div>
          <div id="searchDropdown" class="search-dropdown"></div>
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
              ${renderAvatarImage(ch, 'char-avatar-img', ch.name)}
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
                  ${renderAvatarImage(ch, 'char-avatar-img', ch.name)}
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
            <div class="modal-avatar" ${(ch.avatar || ch.id) ? `onclick="event.stopPropagation(); window.__app.openLightbox('avatar_${ch.id}', null)" style="cursor: pointer;"` : ''}>
              ${renderAvatarImage(ch, 'modal-avatar-img', ch.name)}
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
                ${ch.relations.map(r => {
                  const relationChar = r.charId ? findCharacterById(r.charId) : null;
                  return `
                  <div class="relation-item" onclick="${r.charId ? `event.stopPropagation(); window.__app.openCharacter('${r.charId}')` : 'event.stopPropagation();'}">
                    <div class="relation-avatar">
                      ${relationChar ? renderAvatarImage(relationChar, 'modal-avatar-img', r.name) : `<img class="modal-avatar-img" src="images/placeholder.png" alt="${r.name}" onerror="this.onerror=null;this.src='images/placeholder.png'">`}
                    </div>
                    <div class="relation-name">${r.name}</div>
                    <div class="relation-type">${r.relation}</div>
                  </div>
                `}).join('')}
              </div>
            </div>
          ` : ''}
          ${(() => {
            const charFanarts = getFanartsForCharacter(ch.id);
            if (charFanarts.length === 0) return '';
            const previews = charFanarts.slice(0, 4);
            return `
              <div class="modal-fanart">
                <h3 class="fanart-title">同人图</h3>
                <div class="fanart-preview-grid">
                  ${previews.map(fa => `
                    <div class="fanart-preview-item" onclick="event.stopPropagation(); window.__app.openLightbox('${fa.id}', '${ch.id}')">
                      <img src="${fa.src}" alt="${fa.desc}" loading="lazy">
                    </div>
                  `).join('')}
                </div>
                ${charFanarts.length > 0 ? `
                  <button class="fanart-more-btn" onclick="event.stopPropagation(); window.__app.closeModal(); window.__app.openGallery('${ch.id}')">
                    查看全部 ${charFanarts.length} 张 →
                  </button>
                ` : ''}
              </div>
            `;
          })()}
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

  /* ========== 同人图辅助 ========== */
  function findCharacterName(charId) {
    for (const cat of NOVEL_DATA.categories) {
      for (const sub of cat.subCategories) {
        const ch = sub.characters.find(c => c.id === charId);
        if (ch) return ch.name;
      }
    }
    return charId;
  }

  function getFanartsForCharacter(charId) {
    return (NOVEL_DATA.fanarts || []).filter(fa => fa.tags.includes(charId));
  }

  function renderFanartTagsHtml(tags) {
    return tags.map(tid => {
      const name = findCharacterName(tid);
      return `<span class="gallery-tag" onclick="event.stopPropagation(); window.__app.openGallery('${tid}')">${name}</span>`;
    }).join('');
  }

  /* ========== 同人图集页面 ========== */
  function renderGallery(charId, doPush = true) {
    closeModal();
    closeLightbox();
    currentView = 'gallery';
    if (doPush) {
      history.pushState({ view: 'gallery', charId }, '', '#');
    }

    const charName = findCharacterName(charId);
    const fanarts = getFanartsForCharacter(charId);

    app.innerHTML = `
      <div class="gallery-view animate-fadeIn">
        <div class="gallery-header">
          <button class="gallery-back-btn" onclick="window.__app.goHome()">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
            返回
          </button>
          <h1 class="gallery-title">${charName}的同人图</h1>
          <p class="gallery-subtitle">共 ${fanarts.length} 张</p>
        </div>
        ${fanarts.length > 0 ? `
          <div class="gallery-grid">
            ${fanarts.map((fa, i) => `
              <div class="gallery-item" style="--delay: ${i * 0.06}s">
                <div class="gallery-item-img-wrap" onclick="window.__app.openLightbox('${fa.id}', '${charId}')">
                  <img class="gallery-item-img" src="${fa.src}" alt="${fa.desc}" loading="lazy">
                </div>
                <div class="gallery-item-info">
                  <p class="gallery-item-desc">${fa.desc}</p>
                  <div class="gallery-tags">
                    ${renderFanartTagsHtml(fa.tags)}
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        ` : '<p class="gallery-empty">暂无同人图</p>'}
      </div>
    `;
  }

  /* ========== Lightbox 大图 ========== */
  function openLightbox(fanartId, charId) {
    // 如果是头像点击（avatar_xxx 格式）
    if (fanartId.startsWith('avatar_')) {
      const avatarCharId = fanartId.replace('avatar_', '');
      let character = null;
      for (const cat of NOVEL_DATA.categories) {
        for (const sub of cat.subCategories) {
          const found = sub.characters.find(c => c.id === avatarCharId);
          if (found) { character = found; break; }
        }
        if (character) break;
      }
      if (character) {
        const avatarSrc = getAvatarSrc(character);
        // 创建临时的单图列表
        currentLightboxList = [{
          id: fanartId,
          src: avatarSrc,
          desc: `${character.name}的头像`,
          tags: [avatarCharId]
        }];
        currentLightboxIndex = 0;
        showLightbox();
      }
      return;
    }

    currentLightboxList = charId ? getFanartsForCharacter(charId) : (NOVEL_DATA.fanarts || []);
    currentLightboxIndex = currentLightboxList.findIndex(fa => fa.id === fanartId);
    if (currentLightboxIndex === -1) currentLightboxIndex = 0;
    showLightbox();
  }

  function showLightbox() {
    closeLightbox();
    const fa = currentLightboxList[currentLightboxIndex];
    if (!fa) return;

    const hasPrev = currentLightboxIndex > 0;
    const hasNext = currentLightboxIndex < currentLightboxList.length - 1;

    const lb = document.createElement('div');
    lb.className = 'lightbox-overlay';
    lb.id = 'lightboxOverlay';
    lb.innerHTML = `
      <button class="lightbox-close" onclick="window.__app.closeLightbox()">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </button>
      ${hasPrev ? `
        <button class="lightbox-nav prev" onclick="window.__app.lightboxPrev()">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
      ` : ''}
      ${hasNext ? `
        <button class="lightbox-nav next" onclick="window.__app.lightboxNext()">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      ` : ''}
      <div class="lightbox-img-wrap">
        <img class="lightbox-img" src="${fa.src}" alt="${fa.desc}">
      </div>
      <div class="lightbox-info">
        <p class="lightbox-desc">${fa.desc}</p>
        <div class="lightbox-tags">
          ${renderFanartTagsHtml(fa.tags)}
        </div>
      </div>
    `;

    // 点击背景关闭（但不是点击图片/按钮时）
    lb.addEventListener('click', (e) => {
      if (e.target === lb) closeLightbox();
    });

    document.body.appendChild(lb);
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => lb.classList.add('show'));

    // ESC & 方向键
    const keyHandler = (e) => {
      if (e.key === 'Escape') { closeLightbox(); document.removeEventListener('keydown', keyHandler); }
      if (e.key === 'ArrowLeft' && currentLightboxIndex > 0) { lightboxPrev(); }
      if (e.key === 'ArrowRight' && currentLightboxIndex < currentLightboxList.length - 1) { lightboxNext(); }
    };
    document.addEventListener('keydown', keyHandler);
    lb._keyHandler = keyHandler;
  }

  function closeLightbox() {
    const lb = document.getElementById('lightboxOverlay');
    if (lb) {
      if (lb._keyHandler) document.removeEventListener('keydown', lb._keyHandler);
      lb.classList.remove('show');
      setTimeout(() => {
        lb.remove();
        // 只有没有其他弹窗时才恢复滚动
        if (!document.getElementById('characterModal')) {
          document.body.style.overflow = '';
        }
      }, 300);
    }
  }

  function lightboxPrev() {
    if (currentLightboxIndex > 0) {
      currentLightboxIndex--;
      showLightbox();
    }
  }

  function lightboxNext() {
    if (currentLightboxIndex < currentLightboxList.length - 1) {
      currentLightboxIndex++;
      showLightbox();
    }
  }

  /* ========== 搜索功能 ========== */
  function searchCharacters(keyword) {
    if (!keyword || !keyword.trim()) {
      searchResults = [];
      return;
    }

    const kw = keyword.trim().toLowerCase();
    searchResults = [];

    for (const cat of NOVEL_DATA.categories) {
      for (const sub of cat.subCategories) {
        for (const ch of sub.characters) {
          if (ch.name.toLowerCase().includes(kw)) {
            searchResults.push({
              character: ch,
              category: cat,
              subCategory: sub
            });
          }
        }
      }
    }

    renderSearchResults();
  }

  function renderSearchResults() {
    const searchBox = document.getElementById('searchBox');
    const dropdown = document.getElementById('searchDropdown');

    if (!searchBox || !dropdown) return;

    if (searchResults.length === 0) {
      dropdown.style.display = 'none';
      return;
    }

    dropdown.innerHTML = searchResults.map(result => {
      const { character, category, subCategory } = result;
      const groupText = character.group ? ` - ${character.group}` : '';
      const path = `${category.name} - ${subCategory.name}${groupText}`;

      return `
        <div class="search-result-item" onclick="window.__app.selectSearchResult('${character.id}')">
          <div class="search-result-avatar">
            <img src="${getAvatarSrc(character)}" alt="${character.name}" onerror="this.onerror=null;this.src='images/placeholder.png'">
          </div>
          <div class="search-result-info">
            <div class="search-result-name">${character.name}</div>
            <div class="search-result-path">${path}</div>
          </div>
        </div>
      `;
    }).join('');

    dropdown.style.display = 'block';
  }

  function selectSearchResult(charId) {
    const searchBox = document.getElementById('searchBox');
    const dropdown = document.getElementById('searchDropdown');

    if (searchBox) searchBox.value = '';
    if (dropdown) dropdown.style.display = 'none';
    searchResults = [];

    openCharacter(charId);
  }

  function clearSearch() {
    const searchBox = document.getElementById('searchBox');
    const dropdown = document.getElementById('searchDropdown');

    if (searchBox) searchBox.value = '';
    if (dropdown) dropdown.style.display = 'none';
    searchResults = [];
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
    closeModal,
    openGallery: (charId) => renderGallery(charId),
    openLightbox,
    closeLightbox,
    lightboxPrev,
    lightboxNext,
    searchCharacters,
    selectSearchResult
  };

  // 启动
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
