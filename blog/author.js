/**
 * AI Second Brain — Blog Author Data & Auto-Hydrator
 * 
 * Centraliza os dados de biografia do autor para todos os artigos do blog (PT e EN).
 * Ao editar este arquivo ou author.json, as alterações refletem automaticamente em todos os artigos
 * tanto online (GitHub Pages) quanto localmente (file://) sem erros de CORS.
 */
window.AUTHOR_DATA = {
  "name": "Alfredo R. Câmara",
  "avatar": "https://github.com/alfredorcamara.png",
  "github": "https://github.com/alfredorcamara",
  "linkedin": "https://www.linkedin.com/in/alfredo-rodrigues-c%C3%A2mara-0a564162/",
  "bio": {
    "pt": "Mais de 28 anos de experiência em desenvolvimento, arquitetura de software e integração de sistemas. Criador do <strong>AI Second Brain</strong>, projeto open source que explora novas formas de organizar conhecimento e contexto para apoiar o desenvolvimento com IA.",
    "en": "Over 28 years of experience in software development, architecture, and systems integration. Creator of <strong>AI Second Brain</strong>, an open-source project exploring new ways to organize knowledge and context to empower AI-assisted development."
  }
};

(function () {
  function renderAuthorBio() {
    var data = window.AUTHOR_DATA;
    if (!data || !data.bio) return;
    var lang = (document.documentElement.lang || 'pt').toLowerCase().startsWith('en') ? 'en' : 'pt';
    var text = data.bio[lang] || data.bio.pt;

    var bios = document.querySelectorAll('.author-bio, [data-author-bio]');
    for (var i = 0; i < bios.length; i++) {
      bios[i].innerHTML = text;
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderAuthorBio);
  } else {
    renderAuthorBio();
  }
})();
