/* ===================================================
   CALENDAR.JS — Calendarios de contenido interactivos
   Lee window.CALENDARS (calendar-data.js) y dibuja la
   grilla mensual en cada .content-calendar[data-brand].
   Al tocar un día abre #calendarModal con la publicación.
   =================================================== */

(function () {
  'use strict';

  const data = window.CALENDARS || {};
  const WEEKDAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

  const modal = document.getElementById('calendarModal');
  const state = { brand: null, index: 0 };

  // ── Helpers ───────────────────────────────────────
  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function imgPath(brand, name) {
    return 'recursos/calendario/' + brand + '/' + name + '.webp';
  }

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  // ── Grilla mensual ────────────────────────────────
  function renderCalendar(container) {
    const brandKey = container.getAttribute('data-brand');
    const cal = data[brandKey];
    if (!cal) return;

    const postsByDay = {};
    cal.posts.forEach((post, i) => {
      postsByDay[post.dia] = i;
    });

    // Lunes = 0 ... Domingo = 6
    const offset = (new Date(cal.anio, cal.mesIndex, 1).getDay() + 6) % 7;
    const daysInMonth = new Date(cal.anio, cal.mesIndex + 1, 0).getDate();
    const totalCells = Math.ceil((offset + daysInMonth) / 7) * 7;

    container.style.setProperty('--brand', cal.color);
    container.textContent = '';

    // Encabezado
    const header = el('div', 'content-calendar__header');
    header.appendChild(el('span', 'content-calendar__month', cal.mes + ' ' + cal.anio));
    const count = el('span', 'content-calendar__count');
    count.appendChild(el('strong', '', String(cal.posts.length)));
    count.appendChild(document.createTextNode(' publicaciones planificadas'));
    header.appendChild(count);
    container.appendChild(header);

    // Días de la semana
    const weekdays = el('div', 'content-calendar__weekdays');
    weekdays.setAttribute('aria-hidden', 'true');
    WEEKDAYS.forEach((d) => weekdays.appendChild(el('span', '', d)));
    container.appendChild(weekdays);

    // Celdas
    const grid = el('div', 'content-calendar__grid');
    for (let c = 0; c < totalCells; c++) {
      const day = c - offset + 1;
      const cell = el('div', 'content-calendar__cell');

      if (day < 1 || day > daysInMonth) {
        cell.classList.add('content-calendar__cell--empty');
      } else if (postsByDay[day] !== undefined) {
        const index = postsByDay[day];
        const post = cal.posts[index];
        const btn = el('button', 'content-calendar__post');
        btn.type = 'button';
        btn.setAttribute(
          'aria-label',
          day + ' de ' + cal.mes.toLowerCase() + ': ' + post.titulo + ' (ver publicación)'
        );
        btn.appendChild(el('span', 'content-calendar__num', String(day)));
        const img = el('img');
        img.src = imgPath(brandKey, pad(day) + '-thumb');
        img.alt = '';
        img.loading = 'lazy';
        img.decoding = 'async';
        btn.appendChild(img);
        btn.addEventListener('click', () => openModal(brandKey, index));
        cell.appendChild(btn);
      } else {
        cell.appendChild(el('span', 'content-calendar__num', String(day)));
      }

      grid.appendChild(cell);
    }
    container.appendChild(grid);

    container.appendChild(
      el(
        'p',
        'content-calendar__footer',
        'Calendario real · ' + cal.mes + ' ' + cal.anio +
          ' · realizado en ZetaPro · Toca un día para ver la publicación'
      )
    );
  }

  // ── Modal ─────────────────────────────────────────
  function fillModal() {
    const cal = data[state.brand];
    const post = cal.posts[state.index];

    const media = modal.querySelector('.calendar-modal__media');
    media.textContent = '';
    const main = el('img');
    main.src = imgPath(state.brand, pad(post.dia));
    main.alt = post.titulo;
    media.appendChild(main);
    if (post.extra) {
      const extra = el('img');
      extra.src = imgPath(state.brand, post.extra);
      extra.alt = post.titulo + ' — slides del carrusel';
      extra.loading = 'lazy';
      media.appendChild(extra);
    }

    const meta = modal.querySelector('.calendar-modal__meta');
    meta.textContent = '';
    meta.appendChild(el('span', '', post.dia + ' de ' + cal.mes + ' · ' + cal.nombre));
    meta.appendChild(el('span', 'badge', post.formato));

    modal.querySelector('.calendar-modal__title').textContent = post.titulo;
    modal.querySelector('.calendar-modal__copy').textContent = post.copy;

    const ctaText = post.cta === true ? cal.cta : post.cta || '';
    const cta = modal.querySelector('.calendar-modal__cta');
    cta.textContent = ctaText;
    cta.hidden = !ctaText;

    const tags = modal.querySelector('.calendar-modal__hashtags');
    tags.textContent = post.hashtags;
    tags.hidden = !post.hashtags;

    modal.querySelector('.calendar-modal__counter').textContent =
      state.index + 1 + ' / ' + cal.posts.length;
    modal.querySelector('.calendar-modal__media').scrollTop = 0;
    modal.querySelector('.calendar-modal__body').scrollTop = 0;
  }

  function openModal(brand, index) {
    state.brand = brand;
    state.index = index;
    fillModal();
    modal.showModal();
    document.documentElement.style.overflow = 'hidden';
  }

  function step(delta) {
    const total = data[state.brand].posts.length;
    state.index = (state.index + delta + total) % total;
    fillModal();
  }

  if (modal) {
    modal.querySelector('.calendar-modal__close').addEventListener('click', () => modal.close());
    modal.querySelector('[data-step="-1"]').addEventListener('click', () => step(-1));
    modal.querySelector('[data-step="1"]').addEventListener('click', () => step(1));

    // Clic en el fondo oscuro (fuera del contenido)
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.close();
    });

    modal.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'ArrowRight') step(1);
    });

    modal.addEventListener('close', () => {
      document.documentElement.style.overflow = '';
    });
  }

  document.querySelectorAll('.content-calendar[data-brand]').forEach(renderCalendar);
})();
