/**
 * AI Second Brain — Blog Open Graph & Social Meta Tags Updater
 * 
 * Atualiza e padroniza as tags Open Graph, Twitter Cards, Canonical e hreflang
 * em todos os 16 artigos (em /pt/ e /en/) e nos 2 hubs (pt/index.html e en/index.html).
 */
const fs = require('fs');
const path = require('path');

const baseDir = __dirname;
const siteBaseUrl = 'https://alfredorcamara.github.io/ai-second-brain-site';
const defaultBanner = `${siteBaseUrl}/assets/banner-grafo-3d.webp`;

const articlesConfig = {
  // --- ARTIGOS EM PORTUGUÊS ---
  'pt/adrs-para-agentes-de-ia.html': {
    lang: 'pt-BR',
    locale: 'pt_BR',
    type: 'article',
    canonical: `${siteBaseUrl}/blog/pt/adrs-para-agentes-de-ia.html`,
    altPt: `${siteBaseUrl}/blog/pt/adrs-para-agentes-de-ia.html`,
    altEn: `${siteBaseUrl}/blog/en/adrs-for-ai-agents.html`,
    ogTitle: 'ADRs para agentes: como impedir que a IA desfaça decisões que você já tomou',
    ogDesc: 'O Git mostra o que mudou, o ADR registra o porquê. Veja como decisões arquiteturais registradas impedem que o próximo agente de IA desfaça a sua otimização.',
    twTitle: 'ADRs para agentes de IA',
    twDesc: 'Como impedir que a IA desfaça decisões que você já tomou.',
    image: defaultBanner
  },
  'pt/seu-agente-de-ia-tem-amnesia.html': {
    lang: 'pt-BR',
    locale: 'pt_BR',
    type: 'article',
    canonical: `${siteBaseUrl}/blog/pt/seu-agente-de-ia-tem-amnesia.html`,
    altPt: `${siteBaseUrl}/blog/pt/seu-agente-de-ia-tem-amnesia.html`,
    altEn: `${siteBaseUrl}/blog/en/does-your-ai-agent-have-amnesia.html`,
    ogTitle: 'Seu agente de IA tem amnésia? Dê a ele um segundo cérebro.',
    ogDesc: 'Memória persistente em Markdown que vira um grafo neural 3D vivo, lido pelo seu agente a cada sessão. Conheça o AI Second Brain.',
    twTitle: 'Seu agente de IA tem amnésia?',
    twDesc: 'Dê ao seu agente de IA uma memória persistente.',
    image: defaultBanner
  },
  'pt/zero-ms-custo-zero.html': {
    lang: 'pt-BR',
    locale: 'pt_BR',
    type: 'article',
    canonical: `${siteBaseUrl}/blog/pt/zero-ms-custo-zero.html`,
    altPt: `${siteBaseUrl}/blog/pt/zero-ms-custo-zero.html`,
    altEn: `${siteBaseUrl}/blog/en/zero-ms-and-zero-cost.html`,
    ogTitle: '0 ms e custo zero: as tarefas que você não deveria mandar para uma IA',
    ogDesc: 'A pergunta mais valiosa não é "qual modelo usar?", mas "eu preciso de um modelo aqui?". Veja tarefas que resolvem em zero milissegundos e a custo zero de tokens.',
    twTitle: '0 ms e custo zero: o que não mandar para uma IA',
    twDesc: 'Tarefas que resolvem em 0 ms e a custo zero sem chamar nenhum LLM.',
    image: defaultBanner
  },
  'pt/quando-nao-usar-llm.html': {
    lang: 'pt-BR',
    locale: 'pt_BR',
    type: 'article',
    canonical: `${siteBaseUrl}/blog/pt/quando-nao-usar-llm.html`,
    altPt: `${siteBaseUrl}/blog/pt/quando-nao-usar-llm.html`,
    altEn: `${siteBaseUrl}/blog/en/when-not-to-use-llms.html`,
    ogTitle: 'Quando NÃO usar LLM: o portão de decisão que poupa tokens e latência',
    ogDesc: 'Determinística, decisão ou geração: as 3 faixas para decidir quando chamar um modelo e parar de pagar token por aquilo que uma regra simples resolve.',
    twTitle: 'Quando NÃO usar LLM',
    twDesc: 'O portão de decisão que economiza tokens e elimina latência desnecessária.',
    image: defaultBanner
  },
  'pt/por-que-vibe-coding-morre.html': {
    lang: 'pt-BR',
    locale: 'pt_BR',
    type: 'article',
    canonical: `${siteBaseUrl}/blog/pt/por-que-vibe-coding-morre.html`,
    altPt: `${siteBaseUrl}/blog/pt/por-que-vibe-coding-morre.html`,
    altEn: `${siteBaseUrl}/blog/en/why-vibe-coding-dies.html`,
    ogTitle: 'Por que o vibe coding costuma morrer aos 3 meses: como estruturar um segundo cérebro para IA',
    ogDesc: 'A ressaca técnica de programar conversando e como estruturei um segundo cérebro persistente para impedir a entropia prematura do código.',
    twTitle: 'Por que o vibe coding costuma morrer aos 3 meses',
    twDesc: 'Como um segundo cérebro persistente impede a entropia e o caos no código gerado por IA.',
    image: defaultBanner
  },
  'pt/document-rot-risco-segundo-cerebro.html': {
    lang: 'pt-BR',
    locale: 'pt_BR',
    type: 'article',
    canonical: `${siteBaseUrl}/blog/pt/document-rot-risco-segundo-cerebro.html`,
    altPt: `${siteBaseUrl}/blog/pt/document-rot-risco-segundo-cerebro.html`,
    altEn: `${siteBaseUrl}/blog/en/document-rot-second-brain.html`,
    ogTitle: 'Document rot: o risco que pode matar qualquer segundo cérebro e as 3 defesas que adotei',
    ogDesc: 'Document rot: o risco que pode matar qualquer segundo cérebro e as 3 defesas que adotei para manter a documentação viva e sincronizada com o código.',
    twTitle: 'Document rot: o risco que pode matar qualquer segundo cérebro',
    twDesc: 'As 3 defesas essenciais para manter a documentação viva e sincronizada com o código.',
    image: defaultBanner
  },
  'pt/conhecimento-e-acao-duas-camadas.html': {
    lang: 'pt-BR',
    locale: 'pt_BR',
    type: 'article',
    canonical: `${siteBaseUrl}/blog/pt/conhecimento-e-acao-duas-camadas.html`,
    altPt: `${siteBaseUrl}/blog/pt/conhecimento-e-acao-duas-camadas.html`,
    altEn: `${siteBaseUrl}/blog/en/knowledge-and-action-two-layers.html`,
    ogTitle: 'Conhecimento e ação em duas camadas: como organizo pesquisa técnica para agentes de IA',
    ogDesc: 'Como separar pesquisa técnica entre knowledge/ e actionable/ para evitar o efeito Lost in the Middle em agentes de IA. Metodologia do Research Lab no AI Second Brain.',
    twTitle: 'Conhecimento e ação em duas camadas para IA',
    twDesc: 'Como separar knowledge/ e actionable/ para evitar sobrecarga de contexto em agentes de IA.',
    image: defaultBanner
  },
  'pt/pesquisa-com-ia-que-retoma-de-onde-parou.html': {
    lang: 'pt-BR',
    locale: 'pt_BR',
    type: 'article',
    canonical: `${siteBaseUrl}/blog/pt/pesquisa-com-ia-que-retoma-de-onde-parou.html`,
    altPt: `${siteBaseUrl}/blog/pt/pesquisa-com-ia-que-retoma-de-onde-parou.html`,
    altEn: `${siteBaseUrl}/blog/en/resilient-ai-research-resuming-jobs.html`,
    ogTitle: 'Pesquisa com IA que retoma de onde parou e não gasta token duas vezes',
    ogDesc: 'Como estruturar pesquisas longas e automações com IA que são resilientes a falhas, respeitam limites de taxa e não gastam tokens desnecessários.',
    twTitle: 'Pesquisa com IA que retoma de onde parou',
    twDesc: 'Automações resilientes a falhas e rate limits que nunca pagam duas vezes pelo mesmo token.',
    image: defaultBanner
  },
  'pt/research-lab-documentacao-tecnica.html': {
    lang: 'pt-BR',
    locale: 'pt_BR',
    type: 'article',
    canonical: `${siteBaseUrl}/blog/pt/research-lab-documentacao-tecnica.html`,
    altPt: `${siteBaseUrl}/blog/pt/research-lab-documentacao-tecnica.html`,
    altEn: `${siteBaseUrl}/blog/en/research-lab-self-writing-documentation.html`,
    ogTitle: 'Um laboratório que escreve a documentação técnica do seu projeto sozinho',
    ogDesc: 'Como o Research Lab transforma conversas efêmeras com IA em documentação técnica estruturada, versionada e conectada ao grafo do projeto.',
    twTitle: 'Um laboratório que escreve a documentação técnica sozinho',
    twDesc: 'Como transformar conversas efêmeras com IA em documentação técnica versionada no seu repositório.',
    image: defaultBanner
  },
  'pt/index.html': {
    lang: 'pt-BR',
    locale: 'pt_BR',
    type: 'website',
    canonical: `${siteBaseUrl}/blog/pt/`,
    altPt: `${siteBaseUrl}/blog/pt/`,
    altEn: `${siteBaseUrl}/blog/en/`,
    ogTitle: 'Blog — Artigos & Ideias | AI Second Brain',
    ogDesc: 'Reflexões sobre arquitetura, governança e o ciclo de vida do desenvolvimento de software com agentes de IA.',
    twTitle: 'Blog — AI Second Brain',
    twDesc: 'Reflexões sobre arquitetura, governança e memória persistente para agentes de IA.',
    image: defaultBanner
  },

  // --- ARTIGOS EM INGLÊS ---
  'en/adrs-for-ai-agents.html': {
    lang: 'en',
    locale: 'en_US',
    type: 'article',
    canonical: `${siteBaseUrl}/blog/en/adrs-for-ai-agents.html`,
    altPt: `${siteBaseUrl}/blog/pt/adrs-para-agentes-de-ia.html`,
    altEn: `${siteBaseUrl}/blog/en/adrs-for-ai-agents.html`,
    ogTitle: 'ADRs for AI agents: how to stop the AI from undoing decisions you already made',
    ogDesc: 'Git shows what changed; the ADR records why. See how recorded architecture decisions stop the next AI agent from “cleaning up” your optimization.',
    twTitle: 'ADRs for AI agents',
    twDesc: 'How to stop the AI from undoing decisions you already made.',
    image: defaultBanner
  },
  'en/does-your-ai-agent-have-amnesia.html': {
    lang: 'en',
    locale: 'en_US',
    type: 'article',
    canonical: `${siteBaseUrl}/blog/en/does-your-ai-agent-have-amnesia.html`,
    altPt: `${siteBaseUrl}/blog/pt/seu-agente-de-ia-tem-amnesia.html`,
    altEn: `${siteBaseUrl}/blog/en/does-your-ai-agent-have-amnesia.html`,
    ogTitle: 'Does your AI agent have amnesia? Give it a second brain.',
    ogDesc: 'Persistent Markdown memory turned into an interactive 3D neural graph, ingested by your agent every session. Meet AI Second Brain.',
    twTitle: 'Does your AI agent have amnesia?',
    twDesc: 'Give your AI agent persistent memory and continuous governance.',
    image: defaultBanner
  },
  'en/zero-ms-and-zero-cost.html': {
    lang: 'en',
    locale: 'en_US',
    type: 'article',
    canonical: `${siteBaseUrl}/blog/en/zero-ms-and-zero-cost.html`,
    altPt: `${siteBaseUrl}/blog/pt/zero-ms-custo-zero.html`,
    altEn: `${siteBaseUrl}/blog/en/zero-ms-and-zero-cost.html`,
    ogTitle: "0 ms and zero cost: the tasks you shouldn't send to an AI",
    ogDesc: "The most valuable question isn't 'which model should I use?', but 'do I need a model here?'. Discover tasks solved in zero milliseconds and at zero token cost.",
    twTitle: "0 ms and zero cost: tasks you shouldn't send to an AI",
    twDesc: 'Tasks that execute in 0 ms and zero token cost without calling any LLM.',
    image: defaultBanner
  },
  'en/when-not-to-use-llms.html': {
    lang: 'en',
    locale: 'en_US',
    type: 'article',
    canonical: `${siteBaseUrl}/blog/en/when-not-to-use-llms.html`,
    altPt: `${siteBaseUrl}/blog/pt/quando-nao-usar-llm.html`,
    altEn: `${siteBaseUrl}/blog/en/when-not-to-use-llms.html`,
    ogTitle: 'When NOT to use an LLM: the decision gate that saves tokens and latency',
    ogDesc: 'Deterministic, decision, or generation: the 3 execution tiers to decide when to call a model and stop paying token costs for tasks simple logic can solve.',
    twTitle: 'When NOT to use an LLM',
    twDesc: 'The decision gate that saves tokens and eliminates unnecessary latency.',
    image: defaultBanner
  },
  'en/why-vibe-coding-dies.html': {
    lang: 'en',
    locale: 'en_US',
    type: 'article',
    canonical: `${siteBaseUrl}/blog/en/why-vibe-coding-dies.html`,
    altPt: `${siteBaseUrl}/blog/pt/por-que-vibe-coding-morre.html`,
    altEn: `${siteBaseUrl}/blog/en/why-vibe-coding-dies.html`,
    ogTitle: 'Why vibe coding typically dies at 3 months: structuring a second brain for AI',
    ogDesc: 'The technical hangover of coding purely via chat, and how structuring a persistent second brain prevents premature codebase entropy.',
    twTitle: 'Why vibe coding typically dies at 3 months',
    twDesc: 'How a persistent second brain prevents codebase entropy in AI coding.',
    image: defaultBanner
  },
  'en/document-rot-second-brain.html': {
    lang: 'en',
    locale: 'en_US',
    type: 'article',
    canonical: `${siteBaseUrl}/blog/en/document-rot-second-brain.html`,
    altPt: `${siteBaseUrl}/blog/pt/document-rot-risco-segundo-cerebro.html`,
    altEn: `${siteBaseUrl}/blog/en/document-rot-second-brain.html`,
    ogTitle: 'Document rot: the silent risk that can destroy any second brain, and the 3 defenses I built',
    ogDesc: 'Document rot: the insidious threat that can destroy any AI second brain and the 3 automated defenses we designed to keep documentation alive and synchronized with code.',
    twTitle: 'Document rot: the silent risk that can destroy any second brain',
    twDesc: '3 automated defenses to keep documentation alive and synchronized with code.',
    image: defaultBanner
  },
  'en/knowledge-and-action-two-layers.html': {
    lang: 'en',
    locale: 'en_US',
    type: 'article',
    canonical: `${siteBaseUrl}/blog/en/knowledge-and-action-two-layers.html`,
    altPt: `${siteBaseUrl}/blog/pt/conhecimento-e-acao-duas-camadas.html`,
    altEn: `${siteBaseUrl}/blog/en/knowledge-and-action-two-layers.html`,
    ogTitle: 'Knowledge and action in two layers: organizing technical research for AI agents',
    ogDesc: "How decoupling technical research between knowledge/ and actionable/ eliminates the 'Lost in the Middle' cognitive bottleneck in AI agents. Research Lab methodology.",
    twTitle: 'Knowledge and action in two layers for AI',
    twDesc: 'How decoupling knowledge/ and actionable/ eliminates cognitive bottlenecks in AI agents.',
    image: defaultBanner
  },
  'en/resilient-ai-research-resuming-jobs.html': {
    lang: 'en',
    locale: 'en_US',
    type: 'article',
    canonical: `${siteBaseUrl}/blog/en/resilient-ai-research-resuming-jobs.html`,
    altPt: `${siteBaseUrl}/blog/pt/pesquisa-com-ia-que-retoma-de-onde-parou.html`,
    altEn: `${siteBaseUrl}/blog/en/resilient-ai-research-resuming-jobs.html`,
    ogTitle: 'AI research that resumes where it left off and never spends tokens twice',
    ogDesc: 'How to design long-running automated research workflows and AI pipelines that fail gracefully, respect rate limits, and never pay twice for the same token.',
    twTitle: 'AI research that resumes where it left off',
    twDesc: 'Fail-safe research workflows that respect rate limits and never spend tokens twice.',
    image: defaultBanner
  },
  'en/research-lab-self-writing-documentation.html': {
    lang: 'en',
    locale: 'en_US',
    type: 'article',
    canonical: `${siteBaseUrl}/blog/en/research-lab-self-writing-documentation.html`,
    altPt: `${siteBaseUrl}/blog/pt/research-lab-documentacao-tecnica.html`,
    altEn: `${siteBaseUrl}/blog/en/research-lab-self-writing-documentation.html`,
    ogTitle: "An autonomous lab that writes your project's technical documentation on its own",
    ogDesc: 'How Research Lab turns ephemeral AI chat threads into structured, versioned technical documentation connected to the project graph.',
    twTitle: 'An autonomous lab that writes technical documentation on its own',
    twDesc: 'Turn ephemeral AI conversations into structured, versioned technical documentation.',
    image: defaultBanner
  },
  'en/index.html': {
    lang: 'en',
    locale: 'en_US',
    type: 'website',
    canonical: `${siteBaseUrl}/blog/en/`,
    altPt: `${siteBaseUrl}/blog/pt/`,
    altEn: `${siteBaseUrl}/blog/en/`,
    ogTitle: 'Blog — Articles & Insights | AI Second Brain',
    ogDesc: 'In-depth reflections on architecture, governance, drastic token savings, and ending memory amnesia in AI agents.',
    twTitle: 'Blog — AI Second Brain',
    twDesc: 'In-depth reflections on architecture, persistent memory, and continuous governance for AI agents.',
    image: defaultBanner
  }
};

let updatedCount = 0;

for (const [relPath, cfg] of Object.entries(articlesConfig)) {
  const filePath = path.join(baseDir, relPath);
  if (!fs.existsSync(filePath)) {
    console.warn('Arquivo não encontrado:', filePath);
    continue;
  }

  let html = fs.readFileSync(filePath, 'utf-8');

  // Atualizar links canonical e alternate
  html = html.replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${cfg.canonical}">`);
  html = html.replace(/<link rel="alternate" hreflang="pt-BR" href="[^"]*">/, `<link rel="alternate" hreflang="pt-BR" href="${cfg.altPt}">`);
  html = html.replace(/<link rel="alternate" hreflang="en" href="[^"]*">/, `<link rel="alternate" hreflang="en" href="${cfg.altEn}">`);

  // Construir bloco OpenGraph e Twitter Cards padronizado
  const metaBlock = `  <!-- OpenGraph / Social Meta Tags -->
  <meta property="og:type" content="${cfg.type}">
  <meta property="og:title" content="${cfg.ogTitle}">
  <meta property="og:description" content="${cfg.ogDesc}">
  <meta property="og:image" content="${cfg.image}">
  <meta property="og:url" content="${cfg.canonical}">
  <meta property="og:site_name" content="AI Second Brain">
  <meta property="og:locale" content="${cfg.locale}">

  <!-- Twitter Cards -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${cfg.twTitle}">
  <meta name="twitter:description" content="${cfg.twDesc}">
  <meta name="twitter:image" content="${cfg.image}">`;

  // Substituir bloco antigo de OpenGraph / Twitter Cards
  const ogPattern = /<!-- (?:OpenGraph \/ Social Meta Tags|OpenGraph \/ Facebook) -->[\s\S]*?(?:<!-- Google Fonts -->|<link rel="preconnect")/i;
  if (ogPattern.test(html)) {
    html = html.replace(ogPattern, `${metaBlock}\n\n  <!-- Google Fonts -->`);
  } else {
    // Fallback: se não encontrar comentário delimitador, substituir antes de Google Fonts
    const fontsPattern = /(<!-- Google Fonts -->|<link rel="preconnect")/i;
    html = html.replace(fontsPattern, `${metaBlock}\n\n  $1`);
  }

  fs.writeFileSync(filePath, html, 'utf-8');
  console.log(`✓ Metatags atualizadas em: ${relPath}`);
  updatedCount++;
}

console.log(`\nConcluído com sucesso! Total de arquivos atualizados: ${updatedCount}`);
