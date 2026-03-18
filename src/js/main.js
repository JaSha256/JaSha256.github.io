import Alpine from 'alpinejs';

Alpine.data('scrollSpy', () => ({
  activeId: '',
  sectionIds: [],

  init() {
    this.sectionIds = [
      'part-0', 'part-1', 'part-2', 'part-2b', 'interim',
      'part-3', 'conclusion', 'footnotes-section', 'references', 'revision-history'
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.activeId = entry.target.id;
          }
        }
      },
      { rootMargin: '-10% 0px -80% 0px' }
    );

    for (const id of this.sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
  }
}));

Alpine.data('tocSidebar', () => ({
  open: false,

  toggle() {
    this.open = !this.open;
  },

  close() {
    this.open = false;
  },

  navigateTo(hash) {
    this.open = false;
    const el = document.querySelector(hash);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}));

Alpine.data('footnoteTooltip', () => ({
  visible: false,
  content: '',
  x: 0,
  y: 0,
  pinned: false,

  init() {
    this.$el.addEventListener('mouseover', (e) => {
      const link = this.findFnLink(e.target);
      if (link) this.showTooltip(link);
    });

    this.$el.addEventListener('mouseout', (e) => {
      const link = this.findFnLink(e.target);
      if (link) this.hideTooltip();
    });

    this.$el.addEventListener('click', (e) => {
      const link = this.findFnLink(e.target);
      if (link) {
        e.preventDefault();
        this.togglePin(link);
      }
    });
  },

  findFnLink(el) {
    const sup = el.closest('sup');
    if (!sup) return null;
    const link = sup.querySelector('a[href^="#fn-"]');
    if (link && (el === link || el === sup || sup.contains(el))) return link;
    return null;
  },

  showTooltip(link) {
    if (this.pinned) return;
    this.populateAndPosition(link);
  },

  hideTooltip() {
    if (this.pinned) return;
    this.visible = false;
    this.content = '';
  },

  togglePin(link) {
    if (this.pinned) {
      this.dismiss();
      return;
    }
    this.populateAndPosition(link);
    this.pinned = true;
  },

  populateAndPosition(link) {
    const fnId = link.getAttribute('href')?.replace('#', '');
    const fnEl = document.getElementById(fnId);
    if (!fnEl) return;

    const clone = fnEl.cloneNode(true);
    clone.querySelectorAll('.fn-back').forEach(el => el.remove());
    this.content = clone.innerHTML;

    const rect = link.getBoundingClientRect();
    const tooltipWidth = 400;
    let left = rect.left + window.scrollX;
    if (left + tooltipWidth > window.innerWidth - 16) {
      left = window.innerWidth - tooltipWidth - 16;
    }
    if (left < 16) left = 16;

    this.x = left;
    this.y = rect.bottom + window.scrollY + 8;
    this.visible = true;
  },

  dismiss() {
    this.pinned = false;
    this.visible = false;
    this.content = '';
  }
}));

Alpine.data('collapsible', () => ({
  collapsed: false,

  toggle() {
    this.collapsed = !this.collapsed;
  }
}));

Alpine.data('themeToggle', () => ({
  mode: 'system',

  init() {
    const saved = localStorage.getItem('theme');
    if (saved) {
      this.mode = saved;
    }
    this.apply();
  },

  cycle() {
    const modes = ['system', 'light', 'dark'];
    const idx = modes.indexOf(this.mode);
    this.mode = modes[(idx + 1) % modes.length];
    localStorage.setItem('theme', this.mode);
    this.apply();
  },

  apply() {
    const html = document.documentElement;
    html.removeAttribute('data-theme');

    if (this.mode === 'light') {
      html.setAttribute('data-theme', 'light');
    } else if (this.mode === 'dark') {
      html.setAttribute('data-theme', 'dark');
    }
  },

  get icon() {
    if (this.mode === 'light') return '\u2600';
    if (this.mode === 'dark') return '\u263E';
    return '\u25D0';
  },

  get label() {
    if (this.mode === 'light') return 'Light';
    if (this.mode === 'dark') return 'Dark';
    return 'System';
  }
}));

Alpine.data('backToTop', () => ({
  visible: false,

  init() {
    window.addEventListener('scroll', () => {
      this.visible = window.scrollY > 600;
    }, { passive: true });
  },

  scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}));

Alpine.start();
