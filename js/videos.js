/* ===================================================
   VIDEOS.JS — Tarjetas de TikTok "portada + reproductor"
   Muestra la portada local del video; al tocarla la
   reemplaza por el reproductor oficial de TikTok
   (tiktok.com/player/v1). No carga nada de TikTok
   hasta que alguien toca un video.
   =================================================== */

(function () {
  'use strict';

  const data = window.VIDEOS || {};
  const PLAYER = 'https://www.tiktok.com/player/v1/';
  const PLAYER_PARAMS = '?autoplay=1&music_info=1&description=1&rel=0';
  const PLACEHOLDERS = 3;
  const PLAY_SVG =
    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="5 3 19 12 5 21 5 3" /></svg>';

  const compact = new Intl.NumberFormat('es', {
    notation: 'compact',
    maximumFractionDigits: 1,
  });

  // Solo un video sonando a la vez
  let active = null;

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function stopActive() {
    if (!active) return;
    active.box.replaceChildren(active.button);
    active = null;
  }

  function play(box, button, video) {
    stopActive();
    const iframe = el('iframe', 'video-card__player');
    iframe.src = PLAYER + encodeURIComponent(video.id) + PLAYER_PARAMS;
    iframe.title = 'Video de TikTok de ' + video.cuenta;
    iframe.allow = 'autoplay; fullscreen; encrypted-media; picture-in-picture';
    iframe.allowFullscreen = true;
    box.replaceChildren(iframe);
    active = { box, button };
  }

  function createCard(video) {
    const item = el('div', 'video-item');
    const box = el('div', 'video-card');

    const button = el('button', 'video-card__play');
    button.type = 'button';
    button.setAttribute('aria-label', 'Reproducir video de ' + video.cuenta);

    const cover = el('img', 'video-card__cover');
    cover.src = 'recursos/videos/' + video.id + '.webp';
    cover.alt = '';
    cover.loading = 'lazy';
    cover.decoding = 'async';
    // Portada .webp, si no .jpg; sin portada queda el fondo de color
    cover.addEventListener('error', () => {
      if (cover.src.endsWith('.webp')) {
        cover.src = 'recursos/videos/' + video.id + '.jpg';
      } else {
        cover.remove();
      }
    });
    button.appendChild(cover);

    const icon = el('span', 'video-card__icon');
    icon.innerHTML = PLAY_SVG;
    button.appendChild(icon);

    const info = el('span', 'video-card__info');
    info.appendChild(el('span', 'video-card__account', video.cuenta));
    if (video.vistas) {
      info.appendChild(el('span', 'video-card__views', compact.format(video.vistas) + ' vistas'));
    }
    button.appendChild(info);

    button.addEventListener('click', () => play(box, button, video));
    box.appendChild(button);
    item.appendChild(box);

    if (video.titulo) {
      item.appendChild(el('p', 'video-card__title', video.titulo));
    }

    const link = el('a', 'video-card__link', 'Ver en TikTok ↗');
    link.href = video.url;
    link.target = '_blank';
    link.rel = 'noopener';
    item.appendChild(link);

    return item;
  }

  function createPlaceholder() {
    const ph = el('div', 'video-placeholder');
    const icon = el('div', 'video-placeholder__icon');
    icon.innerHTML = PLAY_SVG;
    ph.appendChild(icon);
    ph.appendChild(el('span', 'video-placeholder__label', 'Próximamente'));
    return ph;
  }

  function renderVideoGrid(grid) {
    const list = data[grid.getAttribute('data-videos')] || [];
    grid.textContent = '';
    if (list.length === 0) {
      for (let i = 0; i < PLACEHOLDERS; i++) grid.appendChild(createPlaceholder());
      return;
    }
    list.forEach((video) => grid.appendChild(createCard(video)));
  }

  function renderStats(node) {
    const list = data[node.getAttribute('data-videos-stats')] || [];
    if (list.length === 0) return;
    const total = list.reduce((sum, v) => sum + (v.vistas || 0), 0);
    node.textContent = '';
    node.appendChild(el('strong', '', String(list.length)));
    node.appendChild(document.createTextNode(list.length === 1 ? ' video' : ' videos'));
    if (total > 0) {
      node.appendChild(document.createTextNode(' · '));
      node.appendChild(el('strong', '', compact.format(total)));
      node.appendChild(document.createTextNode(' vistas'));
    }
  }

  document.querySelectorAll('.video-grid[data-videos]').forEach(renderVideoGrid);
  document.querySelectorAll('[data-videos-stats]').forEach(renderStats);
})();
