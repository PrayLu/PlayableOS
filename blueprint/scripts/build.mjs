import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { marked } from "marked";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const ASSETS = path.join(ROOT, "assets");

const CHAPTERS = [
  { id: "00", file: "00_Cover.md", label: "封面页：PlayableOS", image: "00" },
  {
    id: "01",
    file: "02_Problem.md",
    label: "企业培训，为什么越来越难？",
    image: "02",
  },
  {
    id: "02",
    file: "01_Why the World Needs PlayableOS.md",
    label: "为什么世界需要 PlayableOS",
    image: "01",
  },
  { id: "03", file: "03_Insight.md", label: "AI 正在重新定义能力成长", image: "03" },
  { id: "04", file: "04_Solution.md", label: "PlayableOS 到底是什么", image: "04" },
  { id: "05", file: "05_Core_Innovation.md", label: "四个核心创新", image: "05" },
  { id: "06", file: "06_Product.md", label: "知识如何变成能力", image: "06" },
  { id: "07", file: "07_AI.md", label: "AI 如何驱动平台", image: "07" },
  { id: "08", file: "08_Market.md", label: "市场机会", image: "08" },
  { id: "09", file: "09_Business_Model.md", label: "商业模式", image: "09" },
  { id: "10", file: "10_GTM.md", label: "我们如何进入市场", image: "10" },
  {
    id: "11",
    file: "11_Competition_and_Moat.md",
    label: "竞争格局与核心壁垒",
    image: "11",
  },
  { id: "12", file: "12_Roadmap.md", label: "产品如何一步步成长", image: "12" },
  { id: "13", file: "13_Team.md", label: "为什么是我们", image: "13" },
  { id: "14", file: "14_Vision.md", label: "我们真正想建设什么", image: "14" },
];

marked.setOptions({ gfm: true, breaks: false });

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fff\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 60);
}

function isSpecialLine(line) {
  const t = line.trim();
  return (
    !t ||
    t === "---" ||
    /^#{1,6}\s/.test(t) ||
    t.startsWith("```") ||
    t.startsWith(">") ||
    /^[-*+]\s/.test(t) ||
    /^\d+\.\s/.test(t)
  );
}

/** 将 Markdown 中逐行短句合并为完整段落，并规范标题层级 */
function prepareMarkdown(raw) {
  const lines = raw.split("\n");
  const out = [];
  let i = 0;
  let seenH1 = false;
  let proseBuf = [];

  const flushProse = () => {
    if (proseBuf.length === 0) return;
    let text = proseBuf.join("");
    text = text.replace(/\*\*\*\*/g, "** **");
    text = text.replace(/\s{2,}/g, " ");
    out.push(text);
    out.push("");
    proseBuf = [];
  };

  const peekNextContent = (from) => {
    for (let j = from; j < lines.length; j++) {
      const t = lines[j].trim();
      if (t) return t;
    }
    return null;
  };

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed.startsWith("```")) {
      flushProse();
      out.push(line);
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        out.push(lines[i]);
        i++;
      }
      if (i < lines.length) out.push(lines[i]);
      out.push("");
      i++;
      continue;
    }

    if (/^#{1,6}\s/.test(trimmed) && !/^##/.test(trimmed)) {
      flushProse();
      if (!seenH1) {
        seenH1 = true;
        out.push(line);
      } else {
        out.push("#" + line);
      }
      out.push("");
      i++;
      continue;
    }

    if (/^#{2,6}\s/.test(trimmed)) {
      flushProse();
      out.push(line);
      out.push("");
      i++;
      continue;
    }

    if (trimmed === "---") {
      flushProse();
      out.push(line);
      out.push("");
      i++;
      continue;
    }

    if (trimmed.startsWith(">")) {
      flushProse();
      const quoteLines = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ""));
        i++;
      }
      out.push("> " + quoteLines.join(" ").replace(/\*\*\*\*/g, "** **"));
      out.push("");
      continue;
    }

    if (/^[-*+]\s/.test(trimmed) || /^\d+\.\s/.test(trimmed)) {
      flushProse();
      while (
        i < lines.length &&
        (/^[-*+]\s/.test(lines[i].trim()) || /^\d+\.\s/.test(lines[i].trim()))
      ) {
        out.push(lines[i].trim());
        i++;
      }
      out.push("");
      continue;
    }

    if (trimmed === "") {
      const next = peekNextContent(i + 1);
      if (!next || isSpecialLine(next)) {
        flushProse();
      }
      i++;
      continue;
    }

    proseBuf.push(trimmed);
    i++;
  }

  flushProse();
  return out
    .join("\n")
    .replace(/\n#{1,2} 下一章\n[\s\S]*?(?=\n## |\n# [^#]|\n---|$)/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function isEnglishSectionTitle(title) {
  const t = title.trim();
  if (!t) return true;
  if (/[\u4e00-\u9fff]/.test(t)) return false;
  return /^[A-Za-z0-9\s&|:,.'\-·/()]+$/.test(t);
}

function enhanceHtml(html, chapterId) {
  let result = html
    .replace(/<h1>/g, '<h1 class="chapter-title">')
    .replace(/<h2>([^<]+)<\/h2>/g, (_, title) => {
      if (isEnglishSectionTitle(title) || title.trim() === "下一章") return "";
      const id = `ch${chapterId}-${slugify(title)}`;
      return `<h2 class="section-title" id="${id}"><span>${title}</span></h2>`;
    })
    .replace(/<h3>/g, '<h3 class="subsection-title">')
    .replace(/<blockquote>/g, '<blockquote class="pull-quote">')
    .replace(/<pre><code>/g, '<pre class="flow-diagram"><code>')
    .replace(/<ul>/g, '<ul class="content-list">')
    .replace(/<ol>/g, '<ol class="content-list ordered">')
    .replace(/<p>/g, '<p class="content-paragraph">')
    .replace(/<hr>/g, '<div class="section-divider" aria-hidden></div>');

  result = result.replace(
    /<p class="content-paragraph"><strong>([^<]+)<\/strong><\/p>/g,
    '<p class="key-statement"><strong>$1</strong></p>',
  );

  result = result.replace(
    /<blockquote class="pull-quote">\s*<p class="content-paragraph">([^<]{1,80})<\/p>\s*<\/blockquote>/g,
    '<p class="inline-quote">$1</p>',
  );

  result = wrapSections(result);
  return result;
}

function wrapSections(html) {
  const chunks = html.split(/(?=<h2 class="section-title")/);
  return chunks
    .map((chunk, idx) => {
      const trimmed = chunk.trim();
      if (!trimmed) return "";
      if (idx === 0 && !trimmed.startsWith("<h2")) {
        return `<div class="chapter-lead">${trimmed}</div>`;
      }
      return `<section class="narrative-section">${trimmed}</section>`;
    })
    .join("\n");
}

function heroImage(imageId) {
  const imgPath = path.join(ASSETS, `ch-${imageId}.png`);
  if (fs.existsSync(imgPath)) {
    return `<div class="chapter-hero"><div class="chapter-hero__overlay"></div><img src="assets/ch-${imageId}.png" alt="" loading="lazy" /></div>`;
  }
  return `<div class="chapter-hero chapter-hero--gradient" data-chapter="${imageId}"><div class="chapter-hero__overlay"></div></div>`;
}

function renderChapter(ch) {
  const filePath = path.join(ROOT, ch.file);
  const raw = fs.readFileSync(filePath, "utf8");
  const { content } = matter(raw);
  const prepared = prepareMarkdown(content);
  let body = enhanceHtml(marked.parse(prepared), ch.id);
  const isCover = ch.id === "00";

  if (isCover) {
    body = body
      .replace(
        /<p class="content-paragraph"><strong>Blueprint<\/strong>Version 1\.0Confidential2026<\/p>/,
        `<div class="cover-meta">
          <p class="cover-meta__label">Blueprint</p>
          <p class="cover-meta__version">Version 1.0</p>
          <p class="cover-meta__tag">Confidential</p>
          <p class="cover-meta__year">2026</p>
        </div>`,
      )
      .replace(
        /<h2 class="section-title" id="[^"]*"><span>企业培训，为什么越来越难？<\/span><\/h2>/,
        `<p class="cover-subtitle">企业培训，为什么越来越难？</p>`,
      )
      .replace(
        /<h3 class="subsection-title">AI 正在重新定义能力成长<\/h3>/,
        `<p class="cover-tagline">AI 正在重新定义能力成长</p>`,
      );
  }

  return `
    <article class="chapter ${isCover ? "chapter--cover" : ""}" id="chapter-${ch.id}" data-chapter="${ch.id}">
      <div class="chapter-inner">
        ${heroImage(ch.image ?? ch.id)}
        <div class="chapter-content">
          <div class="chapter-meta">
            <span class="chapter-number">${isCover ? "封面" : `第 ${ch.id} 章`}</span>
          </div>
          <div class="chapter-body prose">
            ${body}
          </div>
        </div>
      </div>
    </article>
  `;
}

function renderToc() {
  return CHAPTERS.map((ch) => {
    const num = ch.id === "00" ? "00" : ch.id;
    return `
      <a href="#chapter-${ch.id}" class="toc-link" data-target="chapter-${ch.id}">
        <span class="toc-num">${num}</span>
        <span class="toc-label">${ch.label}</span>
      </a>
    `;
  }).join("\n");
}

const css = fs.readFileSync(path.join(ROOT, "styles", "blueprint.css"), "utf8");

const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>PlayableOS Blueprint — The Future of Capability Growth</title>
  <meta name="description" content="PlayableOS 公司蓝图 — AI 驱动的企业能力成长平台" />
  <style>${css}</style>
</head>
<body>
  <div class="app-bg" aria-hidden>
    <div class="app-bg__grid"></div>
    <div class="app-bg__orb app-bg__orb--1"></div>
    <div class="app-bg__orb app-bg__orb--2"></div>
    <div class="app-bg__orb app-bg__orb--3"></div>
  </div>

  <button class="sidebar-toggle" id="sidebarToggle" aria-label="打开目录">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
  </button>

  <aside class="sidebar glass-panel" id="sidebar">
    <div class="sidebar-header">
      <div class="logo-mark">P</div>
      <div>
        <div class="sidebar-brand">PlayableOS</div>
        <div class="sidebar-sub">Blueprint v1.0</div>
      </div>
    </div>
    <nav class="toc" aria-label="章节目录">
      ${renderToc()}
    </nav>
    <div class="sidebar-footer">
      <span class="badge badge-brand">Confidential</span>
      <span class="sidebar-year">2026</span>
    </div>
  </aside>

  <main class="main-content" id="mainContent">
    <header class="top-bar">
      <span class="label-caps">Company Blueprint</span>
      <h1 class="top-bar__title text-gradient-brand">The Future of Capability Growth</h1>
      <p class="top-bar__sub">AI 正在重新定义能力成长</p>
      <span class="badge badge-brand top-bar__badge">Release Candidate</span>
    </header>

    <div class="chapters">
      ${CHAPTERS.map(renderChapter).join("\n")}
    </div>

    <footer class="site-footer">
      <p class="text-gradient-brand footer-slogan">Make Every Knowledge Playable.</p>
      <p class="footer-sub">让每一份知识，都能够转化为真正的组织能力。</p>
      <p class="footer-copy">© 2026 PlayableOS · Confidential</p>
    </footer>
  </main>

  <script>
    const sidebar = document.getElementById('sidebar');
    const toggle = document.getElementById('sidebarToggle');
    const tocLinks = document.querySelectorAll('.toc-link');
    const chapters = document.querySelectorAll('.chapter');

    toggle?.addEventListener('click', () => {
      sidebar.classList.toggle('sidebar--open');
    });

    tocLinks.forEach(link => {
      link.addEventListener('click', () => {
        sidebar.classList.remove('sidebar--open');
        tocLinks.forEach(l => l.classList.remove('toc-link--active'));
        link.classList.add('toc-link--active');
      });
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          tocLinks.forEach(link => {
            link.classList.toggle('toc-link--active', link.dataset.target === id);
          });
        }
      });
    }, { rootMargin: '-25% 0px -55% 0px', threshold: 0 });

    chapters.forEach(ch => observer.observe(ch));
  </script>
</body>
</html>`;

fs.writeFileSync(path.join(ROOT, "index.html"), html, "utf8");
console.log("✓ Built blueprint/index.html");
