/**
 * AI Second Brain — Blog Author Sync Tool
 * 
 * Sincroniza o arquivo `author.json` para `author.js` e atualiza o HTML estático
 * de todos os 16 artigos (em /pt/ e /en/).
 * 
 * Uso: node AI_SECOND_BRAIN-SITE/blog/sync-author.js
 */
const fs = require('fs');
const path = require('path');

const blogDir = __dirname;
const jsonPath = path.join(blogDir, 'author.json');
const jsPath = path.join(blogDir, 'author.js');

if (!fs.existsSync(jsonPath)) {
  console.error('author.json não encontrado em', jsonPath);
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

// 1. Atualizar author.js
const jsContent = `/**
 * AI Second Brain — Blog Author Data & Auto-Hydrator
 * 
 * Centraliza os dados de biografia do autor para todos os artigos do blog (PT e EN).
 * Ao editar este arquivo ou author.json, as alterações refletem automaticamente em todos os artigos
 * tanto online (GitHub Pages) quanto localmente (file://) sem erros de CORS.
 */
window.AUTHOR_DATA = ${JSON.stringify(data, null, 2)};

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
`;

fs.writeFileSync(jsPath, jsContent, 'utf-8');
console.log('✓ author.js atualizado a partir de author.json');

// 2. Atualizar artigos em /pt/ e /en/
function updateArticles(folder, lang) {
  const dir = path.join(blogDir, folder);
  if (!fs.existsSync(dir)) return;

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'index.html');
  const bioText = data.bio[lang] || data.bio.pt;

  files.forEach(file => {
    const filePath = path.join(dir, file);
    let html = fs.readFileSync(filePath, 'utf-8');

    // Substituir parágrafo da bio dentro de .bio-content
    const bioCardRegex = /(<div class="bio-content">[\s\S]*?<h4>[\s\S]*?<\/h4>\s*)<p[^>]*>[\s\S]*?<\/p>/;
    if (bioCardRegex.test(html)) {
      html = html.replace(bioCardRegex, `$1<p class="author-bio" data-author-bio>${bioText}</p>`);
    }

    // Garantir inclusão do script author.js antes do fechamento do body
    if (!html.includes('author.js')) {
      if (html.includes('<script src="../../js/i18n.js"></script>')) {
        html = html.replace(
          '<script src="../../js/i18n.js"></script>',
          '<script src="../../js/i18n.js"></script>\n  <script src="../author.js"></script>'
        );
      } else if (html.includes('</body>')) {
        html = html.replace('</body>', '  <script src="../author.js"></script>\n</body>');
      }
    }

    fs.writeFileSync(filePath, html, 'utf-8');
    console.log(`✓ Atualizado: ${folder}/${file}`);
  });
}

updateArticles('pt', 'pt');
updateArticles('en', 'en');
console.log('\nSincronização concluída com sucesso em todos os 16 artigos!');

