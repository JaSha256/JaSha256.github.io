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

Alpine.data('readingProgress', () => ({
  progress: 0,

  init() {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      this.progress = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0;
    }, { passive: true });
  }
}));

Alpine.data('readingTime', () => ({
  minutes: 0,

  init() {
    const article = document.querySelector('article');
    if (!article) return;
    const text = article.textContent || '';
    const words = text.trim().split(/\s+/).length;
    this.minutes = Math.ceil(words / 225);
  }
}));

Alpine.data('search', () => ({
  open: false,
  query: '',
  results: [],
  currentIdx: -1,
  totalMatches: 0,
  highlights: [],

  toggle() {
    this.open = !this.open;
    if (this.open) {
      this.$nextTick(() => this.$refs.searchInput?.focus());
    } else {
      this.clearHighlights();
      this.query = '';
      this.results = [];
      this.currentIdx = -1;
      this.totalMatches = 0;
    }
  },

  doSearch() {
    this.clearHighlights();
    this.results = [];
    this.currentIdx = -1;
    this.totalMatches = 0;

    const q = this.query.trim();
    if (q.length < 2) return;

    const article = document.querySelector('article');
    if (!article) return;

    const walker = document.createTreeWalker(article, NodeFilter.SHOW_TEXT);
    const matches = [];
    const qLower = q.toLowerCase();

    while (walker.nextNode()) {
      const node = walker.currentNode;
      const parent = node.parentElement;
      if (!parent || parent.closest('.fn-tooltip, .search-panel, script, style')) continue;

      const text = node.textContent;
      const textLower = text.toLowerCase();
      let idx = 0;

      while ((idx = textLower.indexOf(qLower, idx)) !== -1) {
        matches.push({ node, offset: idx, length: q.length });
        idx += q.length;
      }
    }

    this.totalMatches = matches.length;

    for (let i = matches.length - 1; i >= 0; i--) {
      const { node, offset, length } = matches[i];
      const range = document.createRange();
      range.setStart(node, offset);
      range.setEnd(node, offset + length);

      const mark = document.createElement('mark');
      mark.className = 'search-highlight';
      mark.dataset.searchIdx = String(i);
      range.surroundContents(mark);
      this.highlights.unshift(mark);
    }

    if (this.totalMatches > 0) {
      this.currentIdx = 0;
      this.scrollToCurrent();
    }
  },

  next() {
    if (this.totalMatches === 0) return;
    this.currentIdx = (this.currentIdx + 1) % this.totalMatches;
    this.scrollToCurrent();
  },

  prev() {
    if (this.totalMatches === 0) return;
    this.currentIdx = (this.currentIdx - 1 + this.totalMatches) % this.totalMatches;
    this.scrollToCurrent();
  },

  scrollToCurrent() {
    this.highlights.forEach((m, i) => {
      m.classList.toggle('search-current', i === this.currentIdx);
    });
    const current = this.highlights[this.currentIdx];
    if (current) {
      current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  },

  clearHighlights() {
    for (const mark of this.highlights) {
      const parent = mark.parentNode;
      if (parent) {
        parent.replaceChild(document.createTextNode(mark.textContent), mark);
        parent.normalize();
      }
    }
    this.highlights = [];
  },

  handleKey(e) {
    if (e.key === 'Enter') {
      if (e.shiftKey) this.prev();
      else if (this.totalMatches > 0) this.next();
      else this.doSearch();
    } else if (e.key === 'Escape') {
      this.toggle();
    }
  }
}));

Alpine.data('langToggle', () => ({
  glossary: {
    'Klarnamenpflicht': 'real-name requirement',
    'Volkszahlungsurteil': 'Census Ruling',
    'Recht auf informationelle Selbstbestimmung': 'right to informational self-determination',
    'Nichtverkettbarkeit': 'unlinkability',
    'Anlassbezogenheit': 'requirement of specific cause',
    'IT-Grundrecht': 'IT fundamental right',
    'Grundrecht auf Vertraulichkeit und Integrität informationstechnischer Systeme': 'fundamental right to confidentiality and integrity of IT systems',
    'Jugendmedienschutz-Staatsvertrag': 'Interstate Treaty on the Protection of Minors in the Media',
  },
  showGlossary: false,
  tooltipText: '',
  tooltipX: 0,
  tooltipY: 0,
  tooltipVisible: false,

  init() {
    const article = document.querySelector('article');
    if (!article) return;

    article.addEventListener('mouseover', (e) => {
      const em = e.target.closest('em');
      if (!em) return;
      const text = em.textContent.trim();
      const translation = this.glossary[text];
      if (!translation) return;

      const rect = em.getBoundingClientRect();
      this.tooltipText = translation;
      this.tooltipX = rect.left + window.scrollX;
      this.tooltipY = rect.top + window.scrollY - 8;
      this.tooltipVisible = true;
    });

    article.addEventListener('mouseout', (e) => {
      if (e.target.closest('em')) {
        this.tooltipVisible = false;
      }
    });
  },

  toggleGlossary() {
    this.showGlossary = !this.showGlossary;
  },

  get glossaryEntries() {
    return Object.entries(this.glossary).sort((a, b) => a[0].localeCompare(b[0], 'de'));
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
