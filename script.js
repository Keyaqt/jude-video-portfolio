(() => {
  'use strict';

  const projects = Array.isArray(window.PORTFOLIO_PROJECTS) ? window.PORTFOLIO_PROJECTS : [];
  const featuredIds = Array.isArray(window.FEATURED_PROJECT_IDS) ? window.FEATURED_PROJECT_IDS : [];
  const featured = featuredIds.map(id => projects.find(project => project.id === id)).filter(Boolean);

  const portfolioGrid = document.querySelector('#portfolio-grid');
  const featuredGrid = document.querySelector('#featured-grid');
  const videoModal = document.querySelector('#video-modal');
  const modalVideo = document.querySelector('#modal-video');
  const modalTitle = document.querySelector('#video-modal-title');
  const modalKicker = document.querySelector('#video-modal-kicker');
  const modalDescription = document.querySelector('#video-modal-description');
  const aboutModal = document.querySelector('#about-modal');

  const escapeHTML = value => String(value).replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));

  function mediaMarkup(project, featuredCard = false) {
    const cls = featuredCard ? 'featured-media preview-media' : 'project-media preview-media';
    return `
      <div class="${cls}" data-project-id="${escapeHTML(project.id)}" tabindex="0" role="button" aria-label="Play ${escapeHTML(project.title)}">
        <img src="${escapeHTML(project.thumbnail)}" alt="Thumbnail from ${escapeHTML(project.title)}" loading="lazy" decoding="async">
        <video class="preview-video" muted loop playsinline preload="none" data-src="${escapeHTML(project.preview)}" aria-hidden="true"></video>
      </div>`;
  }

  function renderFeatured() {
    if (!featuredGrid) return;
    featuredGrid.innerHTML = featured.map(project => `
      <article class="featured-card">
        ${mediaMarkup(project, true)}
        <div class="featured-content">
          <div>
            <div class="project-meta"><span>${escapeHTML(project.category)}</span><span>${escapeHTML(project.duration)}</span></div>
            <h3>${escapeHTML(project.title)}</h3>
            <p>${escapeHTML(project.description)}</p>
          </div>
          <button class="play-link" type="button" data-play-project="${escapeHTML(project.id)}"><span aria-hidden="true">▶</span> Watch full video</button>
        </div>
      </article>`).join('');
  }

  function renderPortfolio(filter = 'All') {
    if (!portfolioGrid) return;
    const filtered = filter === 'All' ? projects : projects.filter(project => project.category === filter);
    portfolioGrid.innerHTML = filtered.map(project => `
      <article class="project-card">
        ${mediaMarkup(project)}
        <div class="project-info">
          <h3>${escapeHTML(project.title)}</h3>
          <p>${escapeHTML(project.subcategory)} · ${escapeHTML(project.duration)}</p>
        </div>
      </article>`).join('');
    activatePreviewObservers();
  }

  function activatePreviewObservers() {
  document.querySelectorAll('.preview-media').forEach(media => {
    const video = media.querySelector('.preview-video');

    media.addEventListener('mouseenter', () => {
      if (!video.src) {
        video.src = video.dataset.src;
        video.load();
      }

      video.play()
        .then(() => video.classList.add('is-playing'))
        .catch(() => {});
    });

    media.addEventListener('mouseleave', () => {
      video.pause();
      video.currentTime = 0;
      video.classList.remove('is-playing');
    });
  });
}

  function openProject(id) {
    const project = projects.find(item => item.id === id);
    if (!project || !videoModal || !modalVideo) return;
    document.querySelectorAll('.preview-video').forEach(video => video.pause());
    modalTitle.textContent = project.title;
    modalKicker.textContent = `${project.subcategory} · ${project.duration}`;
    modalDescription.textContent = project.description;
    modalVideo.poster = project.thumbnail;
    modalVideo.src = project.video;
    videoModal.showModal();
    modalVideo.play().catch(() => {});
  }

  function closeVideoModal() {
    if (!videoModal?.open) return;
    modalVideo.pause();
    modalVideo.removeAttribute('src');
    modalVideo.load();
    videoModal.close();
  }

  renderFeatured();
  renderPortfolio();
  activatePreviewObservers();

  document.addEventListener('click', event => {
    const filter = event.target.closest('[data-filter]');
    if (filter) {
      document.querySelectorAll('[data-filter]').forEach(button => button.classList.remove('is-active'));
      filter.classList.add('is-active');
      renderPortfolio(filter.dataset.filter);
      return;
    }

    const playButton = event.target.closest('[data-play-project]');
    if (playButton) {
      openProject(playButton.dataset.playProject);
      return;
    }

    const media = event.target.closest('.preview-media');
    if (media) {
      openProject(media.dataset.projectId);
      return;
    }

    if (event.target.closest('[data-close-video]')) closeVideoModal();
    if (event.target.closest('[data-open-about]')) aboutModal?.showModal();
    if (event.target.closest('[data-close-about]')) aboutModal?.close();
  });

  document.addEventListener('keydown', event => {
    const media = event.target.closest?.('.preview-media');
    if (media && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      openProject(media.dataset.projectId);
    }
  });

  videoModal?.addEventListener('click', event => {
    if (event.target === videoModal) closeVideoModal();
  });
  aboutModal?.addEventListener('click', event => {
    if (event.target === aboutModal) aboutModal.close();
  });
  videoModal?.addEventListener('close', () => {
    modalVideo.pause();
    modalVideo.removeAttribute('src');
    modalVideo.load();
  });

  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.querySelector('#site-nav');
  navToggle?.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    siteNav?.classList.toggle('is-open', !expanded);
  });
  siteNav?.addEventListener('click', event => {
    if (event.target.matches('a')) {
      siteNav.classList.remove('is-open');
      navToggle?.setAttribute('aria-expanded', 'false');
    }
  });

  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();
})();
