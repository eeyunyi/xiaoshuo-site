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
  let currentCharList = [];      // 当前子分类的角色列表（用于弹窗左右滑动）
  let currentCharIndex = -1;     // 当前角色在列表中的索引

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


// ===== 资源配置：头像 / 同人图 =====
const ASSET_CONFIG = {
  cdnBaseUrl: 'https://img.nvergu.com',
  avatarsDir: 'avatars',
  fanartDir: 'fanart',
  placeholder: 'images/placeholder.png',
  fanartThumbWidth: 720,
  fanartCardWidth: 640,
  fanartQuality: 85,
  avatarCardWidth: 400,
  avatarModalWidth: 480,
  avatarQuality: 85
};

function normalizePath(path) {
  return String(path || '').trim().replace(/\/+$/g, '');
}

function normalizeSegment(segment) {
  return String(segment || '')
    .trim()
    .replace(/^\/+/, '')
    .replace(/\/+$/g, '')
    .split('/')
    .map(part => encodeURIComponent(part))
    .join('/');
}

function isRemoteUrl(path) {
  return /^https?:\/\//i.test(String(path || '').trim());
}

function uniqueList(list) {
  return [...new Set((list || []).filter(Boolean))];
}

function buildCdnUrl(...segments) {
  const base = normalizePath(ASSET_CONFIG.cdnBaseUrl);
  const clean = segments
    .map(normalizeSegment)
    .filter(Boolean)
    .join('/');
  return clean ? `${base}/${clean}` : base;
}

function buildAliyunImageUrl(url, { width = 720, quality = 85, mode = 'm_lfit' } = {}) {
  const raw = String(url || '').trim();
  if (!raw || !isRemoteUrl(raw)) return raw || ASSET_CONFIG.placeholder;
  if (/x-oss-process=/i.test(raw)) return raw;
  const joiner = raw.includes('?') ? '&' : '?';
  return `${raw}${joiner}x-oss-process=image/auto-orient,1/resize,w_${width},${mode}/quality,q_${quality}`;
}

function getAvatarUrl(charId) {
  const id = String(charId || '').trim();
  if (!id) return ASSET_CONFIG.placeholder;
  return buildCdnUrl(ASSET_CONFIG.avatarsDir, `${id.padStart(4, '0')}.png`);
}

function getAvatarThumbUrl(url, width) {
  width = width || ASSET_CONFIG.avatarCardWidth;
  if (!url || url === ASSET_CONFIG.placeholder) return url;
  return buildAliyunImageUrl(url, { width: width, quality: ASSET_CONFIG.avatarQuality, mode: 'm_lfit' });
}

function getAvatarCandidates(ch) {
  if (!ch) return [ASSET_CONFIG.placeholder];

  const candidates = [];
  const rawAvatar = String(ch.avatar || '').trim();
  const charId = String(ch.id || '').trim();

  if (isRemoteUrl(rawAvatar)) {
    candidates.push(rawAvatar);
  }

  if (charId) {
    candidates.push(getAvatarUrl(charId));
  }

  if (rawAvatar && !isRemoteUrl(rawAvatar) && /^\d{1,4}\.png$/i.test(rawAvatar)) {
    candidates.push(buildCdnUrl(ASSET_CONFIG.avatarsDir, rawAvatar));
  }

  return uniqueList(candidates);
}

function getAvatarSrc(ch) {
  return getAvatarCandidates(ch)[0] || '';
}

function getAssetFallbackAttr(candidates) {
  const rest = (candidates || []).slice(1);
  return rest.length ? ` data-fallbacks="${rest.join('|')}"` : '';
}

function handleAssetFallback(img) {
  if (!img) return;
  const shell = img.closest('.asset-shell');
  const raw = img.dataset.fallbacks || '';
  const next = raw.split('|').filter(Boolean);
  const candidate = next.shift();
  img.dataset.fallbacks = next.join('|');

  if (candidate) {
    if (shell) shell.classList.remove('is-missing');
    img.src = candidate;
    return;
  }

  img.onerror = null;
  img.removeAttribute('src');
  img.classList.add('is-broken');
  if (shell) shell.classList.add('is-missing');
}

function renderAvatarImage(ch, cls, alt, thumbWidth) {
  const candidates = getAvatarCandidates(ch);
  const rawSrc = candidates[0] || '';
  var width = thumbWidth;
  if (!width) {
    if (cls.includes('gallery-hero')) width = ASSET_CONFIG.avatarModalWidth;
    else if (cls.includes('modal')) width = ASSET_CONFIG.avatarModalWidth;
    else width = ASSET_CONFIG.avatarCardWidth;
  }
  const src = rawSrc ? getAvatarThumbUrl(rawSrc, width) : '';
  const missingClass = src ? '' : ' is-missing';
  const imgClass = src ? cls : `${cls} is-broken`;
  return `
    <div class="asset-shell avatar-asset-shell${missingClass}" data-kind="avatar">
      <img class="${imgClass}" src="${src}" alt="${alt || (ch?.name || '')}" loading="lazy" decoding="async"${getAssetFallbackAttr(candidates)} onerror="window.__app.handleAssetFallback(this)">
      <div class="asset-fallback avatar-fallback" aria-hidden="true"></div>
    </div>
  `;
}

function stripAliyunProcess(url) {
  return String(url || '').trim().replace(/([?&])x-oss-process=[^&]+/i, '').replace(/[?&]$/, '');
}

function normalizeFanartRecord(fa) {
  if (!fa) return null;

  const path = String(fa.path || fa.fileName || '').trim();
  const full = String(fa.full || fa.src || '').trim();
  const thumb = String(fa.thumb || '').trim();

  return {
    ...fa,
    path,
    full,
    thumb
  };
}

function getFanartOriginalUrl(fa) {
  if (!fa) return ASSET_CONFIG.placeholder;

  const item = normalizeFanartRecord(fa);

  if (item.full) {
    return stripAliyunProcess(item.full);
  }

  if (item.thumb) {
    return stripAliyunProcess(item.thumb);
  }

  if (item.path) {
    return isRemoteUrl(item.path) ? item.path : buildCdnUrl(item.path);
  }

  return ASSET_CONFIG.placeholder;
}

function getFanartThumbUrl(fa, width = ASSET_CONFIG.fanartThumbWidth) {
  const original = getFanartOriginalUrl(fa);
  if (!original || original === ASSET_CONFIG.placeholder) {
    return ASSET_CONFIG.placeholder;
  }
  return buildAliyunImageUrl(original, {
    width,
    quality: ASSET_CONFIG.fanartQuality,
    mode: 'm_lfit'
  });
}

function prepareNovelData() {
  const avatarSet = new Set(NOVEL_DATA.avatarIds || []);

  for (const cat of (NOVEL_DATA.categories || [])) {
    for (const sub of (cat.subCategories || [])) {
      for (const ch of (sub.characters || [])) {
        if (!String(ch.avatar || '').trim()) {
          if (avatarSet.has(ch.id)) {
            ch.avatar = getAvatarUrl(ch.id);
          }
          // no avatar on OSS → leave empty, skip loading entirely
        }
      }
    }
  }

  if (!Array.isArray(NOVEL_DATA.fanarts)) {
    NOVEL_DATA.fanarts = [];
    return;
  }

  NOVEL_DATA.fanarts = NOVEL_DATA.fanarts.map((fa, index) => {
    const original = getFanartOriginalUrl(fa);
    return {
      ...fa,
      __order: index,
      path: String(fa.path || fa.fileName || '').trim(),
      full: original,
      src: original,
      thumb: getFanartThumbUrl(fa, ASSET_CONFIG.fanartCardWidth)
    };
  });
}

function findCharacterByName(name) {
  const target = String(name || '').trim();
  if (!target) return null;

  for (const cat of NOVEL_DATA.categories) {
    for (const sub of cat.subCategories) {
      const found = sub.characters.find(c => String(c.name || '').trim() === target);
      if (found) return found;
    }
  }
  return null;
}

function getFanartThumbSrc(fa) {
  return getFanartThumbUrl(fa, ASSET_CONFIG.fanartCardWidth);
}

function getFanartFullSrc(fa) {
  return getFanartOriginalUrl(fa);
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
    prepareNovelData();
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

    queueMasonryLayout();
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

    queueMasonryLayout();
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

    queueMasonryLayout();
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
    let charSub = null;
    for (const cat of NOVEL_DATA.categories) {
      for (const sub of cat.subCategories) {
        const found = sub.characters.find(c => c.id === charId);
        if (found) { character = found; charSub = sub; break; }
      }
      if (character) break;
    }
    if (!character) return;
    currentCharacterId = charId;

    // 判断是否从弹窗内跳转（点关系角色）
    var isFromModal = !!document.getElementById('characterModal');

    if (!isFromModal && charSub) {
      // 从角色卡片网格点进来：建立滑动列表
      currentCharList = charSub.characters;
      currentCharIndex = currentCharList.findIndex(c => c.id === charId);
    }
    // 从弹窗内跳转：不改 currentCharList，只替换弹窗内容

    showModal(character);
  }

  function modalPrev() {
    if (currentCharList.length === 0) return;
    // 如果当前角色不在列表中（关系跳转过来的），先回到列表原位置
    if (currentCharList[currentCharIndex]?.id !== currentCharacterId) {
      var ch = currentCharList[currentCharIndex];
      currentCharacterId = ch.id;
      showModal(ch, 'slide-right');
      return;
    }
    if (currentCharIndex <= 0) return;
    currentCharIndex--;
    var ch = currentCharList[currentCharIndex];
    currentCharacterId = ch.id;
    showModal(ch, 'slide-right');
  }

  function modalNext() {
    if (currentCharList.length === 0) return;
    // 如果当前角色不在列表中（关系跳转过来的），先回到列表原位置
    if (currentCharList[currentCharIndex]?.id !== currentCharacterId) {
      var ch = currentCharList[currentCharIndex];
      currentCharacterId = ch.id;
      showModal(ch, 'slide-left');
      return;
    }
    if (currentCharIndex >= currentCharList.length - 1) return;
    currentCharIndex++;
    var ch = currentCharList[currentCharIndex];
    currentCharacterId = ch.id;
    showModal(ch, 'slide-left');
  }

  function showModal(ch, slideDir) {
    // 关闭已有弹窗（无动画，立即移除）
    var old = document.getElementById('characterModal');
    if (old) {
      if (old._keyHandler) document.removeEventListener('keydown', old._keyHandler);
      old.remove();
    }

    var animClass = slideDir === 'slide-left' ? 'animate-slideLeft'
                  : slideDir === 'slide-right' ? 'animate-slideRight'
                  : 'animate-slideUp';

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = 'characterModal';
    modal.innerHTML = `
      <div class="modal-backdrop" onclick="window.__app.closeModal()"></div>
      <div class="modal-container ${animClass}">
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
  let relationChar = r.charId ? findCharacterById(r.charId) : null;
  if (!relationChar) {
    relationChar = findCharacterByName(r.name);
  }

  const openTargetId = relationChar ? relationChar.id : null;

  return `
  <div class="relation-item" onclick="${openTargetId ? `event.stopPropagation(); window.__app.openCharacter('${openTargetId}')` : 'event.stopPropagation();'}">
    <div class="relation-avatar">
      ${relationChar
        ? renderAvatarImage(relationChar, 'modal-avatar-img', r.name)
        : `<img class="modal-avatar-img" src="${ASSET_CONFIG.placeholder}" alt="${r.name}" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='${ASSET_CONFIG.placeholder}'">`}
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
                      <img src="${getFanartThumbSrc(fa)}" alt="${fa.desc}" loading="lazy" decoding="async" onerror="window.__app.handleAssetFallback(this)">
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

    // 键盘：ESC 关闭，左右方向键切换角色
    const keyHandler = (e) => {
      if (e.key === 'Escape') {
        closeModal();
        document.removeEventListener('keydown', keyHandler);
      }
      if (e.key === 'ArrowLeft') modalPrev();
      if (e.key === 'ArrowRight') modalNext();
    };
    document.addEventListener('keydown', keyHandler);
    modal._keyHandler = keyHandler;

    // 触摸滑动：左右滑切换角色
    var touchStartX = 0;
    var touchStartY = 0;
    var touchMoved = false;
    var modalContainer = modal.querySelector('.modal-container');

    modalContainer.addEventListener('touchstart', function(e) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchMoved = false;
    }, { passive: true });

    modalContainer.addEventListener('touchmove', function(e) {
      touchMoved = true;
    }, { passive: true });

    modalContainer.addEventListener('touchend', function(e) {
      if (!touchMoved) return;
      var dx = e.changedTouches[0].clientX - touchStartX;
      var dy = e.changedTouches[0].clientY - touchStartY;
      // 只在水平滑动距离 > 60px 且大于垂直距离时触发（避免和滚动冲突）
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
        if (dx < 0) modalNext();   // 左滑 → 下一个
        else modalPrev();           // 右滑 → 上一个
      }
    }, { passive: true });
  }

  function closeModal() {
    const modal = document.getElementById('characterModal');
    if (modal) {
      if (modal._keyHandler) document.removeEventListener('keydown', modal._keyHandler);
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

  function sortFanartsByTagPriority(list) {
    return [...(list || [])].sort((a, b) => {
      const tagDiff = (a.tags?.length || 0) - (b.tags?.length || 0);
      if (tagDiff !== 0) return tagDiff;

      const orderA = Number.isFinite(a.__order) ? a.__order : 0;
      const orderB = Number.isFinite(b.__order) ? b.__order : 0;
      return orderA - orderB;
    });
  }

  var _masonryTimer = null;
  function queueMasonryLayout() {
    if (_masonryTimer) clearTimeout(_masonryTimer);
    _masonryTimer = setTimeout(function() {
      window.requestAnimationFrame(function() {
        document.querySelectorAll('[data-masonry-grid]').forEach(setupMasonryGrid);
      });
    }, 80);
  }

  function setupMasonryGrid(grid) {
    if (!grid) return;

    const computed = window.getComputedStyle(grid);
    const rowHeight = parseFloat(computed.getPropertyValue('--masonry-row-height')) || 10;
    const gap = parseFloat(computed.rowGap || computed.gap || 18) || 18;

    grid.querySelectorAll('.gallery-item').forEach((item) => {
      const imageWrap = item.querySelector('.gallery-item-img-wrap');
      const info = item.querySelector('.gallery-item-info');
      const fallback = item.querySelector('.gallery-fallback');
      const mediaHeight = imageWrap ? imageWrap.getBoundingClientRect().height : (fallback ? fallback.getBoundingClientRect().height : 0);
      const infoHeight = info ? info.getBoundingClientRect().height : 0;
      const total = Math.max(mediaHeight + infoHeight, 220);
      const span = Math.max(18, Math.ceil((total + gap) / (rowHeight + gap)));
      item.style.gridRowEnd = `span ${span}`;
    });
  }

  function renderFanartAsset(fa) {
    const desc = fa?.desc || '';
    const tagsLabel = (fa?.tags || []).map(findCharacterName).join(' · ');
    return `
      <div class="asset-shell gallery-asset-shell" data-kind="fanart">
        <img class="gallery-item-img" src="${getFanartThumbSrc(fa)}" alt="${desc}" loading="lazy" decoding="async" onload="window.__app.queueMasonryLayout()" onerror="window.__app.handleAssetFallback(this)">
        <div class="asset-fallback gallery-fallback" aria-hidden="true">
          <div class="gallery-fallback-mark"></div>
          <div class="gallery-fallback-meta">
            <span class="gallery-fallback-label">IMAGE UNAVAILABLE</span>
            <span class="gallery-fallback-tags">${tagsLabel}</span>
          </div>
        </div>
      </div>
    `;

    queueMasonryLayout();
  }

  function getFanartsForCharacter(charId) {
    const matched = (NOVEL_DATA.fanarts || []).filter(fa => fa.tags.includes(charId));
    return sortFanartsByTagPriority(matched);
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
    window.scrollTo(0, 0);

    const character = findCharacterById(charId);
    const charName = character?.name || findCharacterName(charId);
    const fanarts = getFanartsForCharacter(charId);

    app.innerHTML = `
      <div class="gallery-view animate-fadeIn">
        <div class="gallery-header">
          <button class="gallery-back-btn" onclick="window.__app.goHome()">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
            返回
          </button>
          <div class="gallery-hero">
            <div class="gallery-hero-avatar">
              ${renderAvatarImage(character, 'gallery-hero-avatar-img', charName)}
            </div>
            <div class="gallery-hero-text">
              <div class="gallery-hero-kicker">TAG ARCHIVE</div>
              <h1 class="gallery-title">${charName} 的同人图</h1>
              <p class="gallery-subtitle">共 ${fanarts.length} 张 · 点击标签可切到别的单人主页</p>
              <div class="gallery-hero-tags">
                <span class="gallery-tag active">${charName}</span>
              </div>
            </div>
          </div>
        </div>
        ${fanarts.length > 0 ? `
          <div class="gallery-grid gallery-masonry" data-masonry-grid>
            ${fanarts.map((fa, i) => `
              <article class="gallery-item" style="--delay: ${i * 0.04}s">
                <div class="gallery-item-img-wrap" onclick="window.__app.openLightbox('${fa.id}', '${charId}')">
                  ${renderFanartAsset(fa)}
                </div>
                <div class="gallery-item-info">
                  <p class="gallery-item-desc">${fa.desc}</p>
                  <div class="gallery-tags">
                    ${renderFanartTagsHtml(fa.tags)}
                  </div>
                </div>
              </article>
            `).join('')}
          </div>
        ` : '<p class="gallery-empty">暂无同人图</p>'}
      </div>
    `;

    queueMasonryLayout();
    setTimeout(queueMasonryLayout, 300);
    setTimeout(queueMasonryLayout, 800);
    setTimeout(queueMasonryLayout, 2000);
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

    currentLightboxList = charId ? getFanartsForCharacter(charId) : sortFanartsByTagPriority(NOVEL_DATA.fanarts || []);
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
        <img class="lightbox-img" src="${getFanartFullSrc(fa)}" alt="${fa.desc}" decoding="async" onerror="window.__app.handleAssetFallback(this)">
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
            ${renderAvatarImage(character, 'search-result-avatar-img', character.name)}
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
    handleAssetFallback,
    queueMasonryLayout,
    closeModal,
    modalPrev,
    modalNext,
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
