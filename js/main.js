(function(){
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- FOOTER YEAR ---------- */
  var yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- ROOM SECTION: show a note if no background image is set ---------- */
  var roomImageVar = getComputedStyle(document.documentElement).getPropertyValue('--room-image').trim();
  var roomNote = document.getElementById('roomNote');
  if(roomImageVar === 'none' && roomNote){
    roomNote.hidden = false;
  }

  /* ---------- ROOM SECTION: scroll-reveal headline lines ---------- */
  var roomLines = document.querySelectorAll('[data-room-line]');
  if(roomLines.length){
    if(reduceMotion){
      roomLines.forEach(function(el){ el.classList.add('is-visible'); });
    } else if('IntersectionObserver' in window){
      var lineObserver = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if(entry.isIntersecting){
            entry.target.classList.add('is-visible');
          }
        });
      }, { threshold: 0.4 });
      roomLines.forEach(function(el){ lineObserver.observe(el); });
    } else {
      roomLines.forEach(function(el){ el.classList.add('is-visible'); });
    }
  }

  /* ---------- ROOM SECTION: dust particle canvas ---------- */
  var canvas = document.getElementById('particleCanvas');
  if(canvas && !reduceMotion){
    var ctx = canvas.getContext('2d');
    var room = document.getElementById('room');
    var particles = [];
    var rafId = null;
    var running = false;
    var PARTICLE_COUNT = 46;

    function resize(){
      var rect = room.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    }

    function makeParticle(rect){
      return {
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        r: 0.6 + Math.random() * 1.8,
        speedY: 0.12 + Math.random() * 0.28,
        driftX: (Math.random() - 0.5) * 0.25,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.005 + Math.random() * 0.01,
        alpha: 0.15 + Math.random() * 0.35
      };
    }

    function initParticles(){
      var rect = room.getBoundingClientRect();
      particles = [];
      for(var i = 0; i < PARTICLE_COUNT; i++){
        particles.push(makeParticle(rect));
      }
    }

    function tick(){
      var rect = room.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      ctx.fillStyle = 'rgba(255, 244, 214, 0.9)';
      particles.forEach(function(p){
        p.wobble += p.wobbleSpeed;
        p.y -= p.speedY;
        p.x += p.driftX + Math.sin(p.wobble) * 0.15;

        if(p.y < -10){
          p.y = rect.height + 10;
          p.x = Math.random() * rect.width;
        }
        if(p.x < -10) p.x = rect.width + 10;
        if(p.x > rect.width + 10) p.x = -10;

        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      if(running) rafId = requestAnimationFrame(tick);
    }

    function start(){
      if(running) return;
      running = true;
      resize();
      initParticles();
      rafId = requestAnimationFrame(tick);
    }
    function stop(){
      running = false;
      if(rafId) cancelAnimationFrame(rafId);
    }

    if('IntersectionObserver' in window){
      var roomObserver = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if(entry.isIntersecting) start(); else stop();
        });
      }, { threshold: 0.05 });
      roomObserver.observe(room);
    } else {
      start();
    }

    var resizeTimer;
    window.addEventListener('resize', function(){
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function(){
        if(running){ resize(); initParticles(); }
      }, 200);
    });
  }

  /* ---------- WORK: FOLDER NAVIGATION ---------- */
  var works = (window.SK_WORKS || []);
  var folderGrid = document.getElementById('folderGrid');
  var workList = document.getElementById('workList');
  var backBtn = document.getElementById('backToFolders');
  var workKicker = document.getElementById('workKicker');
  var workTitle = document.getElementById('workTitle');

  function escapeHtml(str){
    if(str === undefined || str === null) return '';
    return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }
  function pad(n){ return String(n).length < 2 ? '0' + n : String(n); }

  // group works by category, preserving first-seen order
  var categories = [];
  var byCategory = {};
  works.forEach(function(w){
    if(!byCategory[w.type]){
      byCategory[w.type] = [];
      categories.push(w.type);
    }
    byCategory[w.type].push(w);
  });

  var FOLDER_ICONS = { 'Digital art': '\u270E', 'Branding, merch & product': '\u25A0', 'Music & band merch': '\u266A' };
  var GRAIN_CATEGORY = ''; // was 'Music & band merch' — grain disabled per feedback, set back to re-enable

  function renderFolders(){
    if(!folderGrid) return;
    folderGrid.innerHTML = '';
    categories.forEach(function(cat){
      var count = byCategory[cat].length;
      var tile = document.createElement('button');
      tile.type = 'button';
      tile.className = 'folder-tile' + (cat === GRAIN_CATEGORY ? ' folder-tile--grain' : '');
      tile.innerHTML =
        '<span class="folder-tile__icon">' + (FOLDER_ICONS[cat] || '\u25A1') + '</span>' +
        '<p class="folder-tile__name">' + escapeHtml(cat) + '</p>' +
        '<p class="folder-tile__count">' + count + (count === 1 ? ' piece' : ' pieces') + '</p>';
      tile.addEventListener('click', function(){ openFolder(cat); });
      folderGrid.appendChild(tile);
    });
  }

  function makeRow(work, globalIndex, displayIndex){
    var el = document.createElement('button');
    el.type = 'button';
    el.className = 'work-row' + (work.type === GRAIN_CATEGORY ? ' work-row--grain' : '');
    el.innerHTML =
      '<span class="work-row__index">' + pad(displayIndex + 1) + '</span>' +
      '<span class="work-row__main">' +
        '<p class="work-row__title">' + escapeHtml(work.title) + '</p>' +
        '<p class="work-row__type">' + escapeHtml(work.type) + '</p>' +
      '</span>' +
      '<span class="work-row__year">' + escapeHtml(work.year) + '</span>' +
      '<span class="work-row__client">' + escapeHtml(work.client) + '</span>';
    el.addEventListener('click', function(){ openViewer(globalIndex); });
    return el;
  }

  function openFolder(cat){
    if(!workList || !folderGrid) return;
    folderGrid.hidden = true;
    backBtn.hidden = false;
    workList.hidden = false;
    workKicker.textContent = 'Work / ' + cat;
    workTitle.textContent = cat;
    workList.innerHTML = '';
    byCategory[cat].forEach(function(w, i){
      var globalIndex = works.indexOf(w);
      workList.appendChild(makeRow(w, globalIndex, i));
    });
  }

  function closeFolder(){
    if(!workList || !folderGrid) return;
    folderGrid.hidden = false;
    backBtn.hidden = true;
    workList.hidden = true;
    workKicker.textContent = 'Work';
    workTitle.textContent = 'Browse by category';
  }

  if(backBtn) backBtn.addEventListener('click', closeFolder);
  renderFolders();

  /* ---------- VIEWER MODAL ---------- */
  var viewer = document.getElementById('viewer');
  var viewerBackdrop = document.getElementById('viewerBackdrop');
  var viewerClose = document.getElementById('viewerClose');
  var viewerImg = document.getElementById('viewerImg');
  var viewerVideo = document.getElementById('viewerVideo');
  var viewerType = document.getElementById('viewerType');
  var viewerTitle = document.getElementById('viewerTitle');
  var viewerDesc = document.getElementById('viewerDesc');
  var viewerStats = document.getElementById('viewerStats');
  var viewerLink = document.getElementById('viewerLink');
  var viewerThumbs = document.getElementById('viewerThumbs');
  var viewerPrev = document.getElementById('viewerPrev');
  var viewerNext = document.getElementById('viewerNext');

  var currentIndex = 0;
  var currentImageIndex = 0;
  var lastFocused = null;
  var viewerPanel = document.querySelector('.viewer__panel');

  function getImages(work){
    if(work.images && work.images.length) return work.images;
    return work.img ? [work.img] : [];
  }

  function showImage(work, imgIndex){
    var images = getImages(work);
    if(!images.length) return;
    currentImageIndex = ((imgIndex % images.length) + images.length) % images.length;
    viewerImg.src = images[currentImageIndex];
    viewerImg.alt = work.title;

    if(viewerThumbs){
      if(images.length > 1){
        viewerThumbs.hidden = false;
        viewerThumbs.innerHTML = '';
        images.forEach(function(src, i){
          var thumb = document.createElement('button');
          thumb.type = 'button';
          thumb.className = 'viewer__thumb' + (i === currentImageIndex ? ' is-active' : '');
          thumb.innerHTML = '<img src="' + src + '" alt="">';
          thumb.addEventListener('click', function(){ showImage(work, i); });
          viewerThumbs.appendChild(thumb);
        });
      } else {
        viewerThumbs.hidden = true;
        viewerThumbs.innerHTML = '';
      }
    }
  }

  function renderViewer(index){
    var work = works[index];
    if(!work) return;
    currentIndex = index;
    showImage(work, 0);

    if(work.video){
      viewerVideo.src = work.video;
      viewerVideo.hidden = false;
      viewerVideo.load();
    } else {
      viewerVideo.pause();
      viewerVideo.removeAttribute('src');
      viewerVideo.hidden = true;
    }
    if(viewerPanel){
      viewerPanel.classList.toggle('viewer__panel--grain', work.type === GRAIN_CATEGORY);
    }
    viewerType.textContent = work.type;
    viewerTitle.textContent = work.title;
    viewerDesc.textContent = work.desc;
    viewerStats.innerHTML =
      '<dt>Client</dt><dd>' + escapeHtml(work.client) + '</dd>' +
      '<dt>Year</dt><dd>' + escapeHtml(work.year) + '</dd>' +
      '<dt>Role</dt><dd>' + escapeHtml(work.role) + '</dd>';
    if(work.link){
      viewerLink.href = work.link;
      viewerLink.textContent = (work.linkLabel || 'View full project') + ' \u2192';
      viewerLink.hidden = false;
    } else {
      viewerLink.hidden = true;
      viewerLink.removeAttribute('href');
      viewerLink.textContent = '';
    }
  }

  function openViewer(index){
    lastFocused = document.activeElement;
    renderViewer(index);
    viewer.classList.add('is-open');
    viewer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    viewerClose.focus();
  }

  function closeViewer(){
    viewer.classList.remove('is-open');
    viewer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if(viewerVideo){ viewerVideo.pause(); }
    if(lastFocused) lastFocused.focus();
  }

  if(viewerClose){
    viewerClose.addEventListener('click', closeViewer);
    viewerBackdrop.addEventListener('click', closeViewer);
    viewerPrev.addEventListener('click', function(){
      renderViewer((currentIndex - 1 + works.length) % works.length);
    });
    viewerNext.addEventListener('click', function(){
      renderViewer((currentIndex + 1) % works.length);
    });
    document.addEventListener('keydown', function(e){
      if(!viewer.classList.contains('is-open')) return;
      if(e.key === 'Escape') closeViewer();
      if(e.key === 'ArrowLeft') renderViewer((currentIndex - 1 + works.length) % works.length);
      if(e.key === 'ArrowRight') renderViewer((currentIndex + 1) % works.length);
    });
  }

  /* ---------- TESTIMONIALS ---------- */
  var testimonials = (window.SK_TESTIMONIALS || []);
  var testimonialGrid = document.getElementById('testimonialGrid');
  if(testimonialGrid){
    testimonials.forEach(function(t){
      var card = document.createElement('div');
      card.className = 'testimonial-card';
      card.innerHTML =
        '<p class="testimonial-card__quote">\u201C' + escapeHtml(t.quote) + '\u201D</p>' +
        '<p class="testimonial-card__name">' + escapeHtml(t.name) +
          (t.role ? ' <span class="testimonial-card__role">&mdash; ' + escapeHtml(t.role) + '</span>' : '') +
        '</p>';
      testimonialGrid.appendChild(card);
    });
  }

})();
