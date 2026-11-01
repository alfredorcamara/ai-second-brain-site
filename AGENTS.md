# Diretrizes de IA — `AI_SECOND_BRAIN-SITE`

> Este repositório contém a **Landing Page**, a **Demo 3D** e o **Blog Bilíngue** do AI Second Brain (hospedado no GitHub Pages).
> Não é o repositório do motor/cockpit que os desenvolvedores baixam.

## Fonte de verdade

A memória, as decisões e as especificações deste site são mantidas no **hub central**, em:

**`../AI_SECOND_BRAIN/docs/internals/`**

Não crie documentos de especificação ou de memória neste repositório. Registre-os lá.

## Blog Bilíngue (`blog/`)

O blog utiliza arquitetura bilíngue separada por pastas:
- `blog/index.html`: Roteador cliente que redireciona automaticamente para `pt/` ou `en/` com base no `localStorage` e idioma do navegador.
- `blog/pt/`: Hub e artigos canônicos em português.
- `blog/en/`: Hub e artigos canônicos em inglês.

Antes de criar ou editar qualquer artigo, leia obrigatoriamente:

- **Especificação:** [`../AI_SECOND_BRAIN/docs/internals/GUIA_TEMPLATE_ARTIGOS_BLOG.md`](../AI_SECOND_BRAIN/docs/internals/GUIA_TEMPLATE_ARTIGOS_BLOG.md)
- **Modelos de referência:**
  - 🇧🇷 [`blog/pt/quando-nao-usar-llm.html`](blog/pt/quando-nao-usar-llm.html)
  - 🇺🇸 [`blog/en/when-not-to-use-llms.html`](blog/en/when-not-to-use-llms.html)
