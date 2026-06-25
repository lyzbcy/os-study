// 捞鱼工作室导流入口 · promo.js
// 原生 JS，无依赖。在每个页面 <body> 末尾引入 promo.css + promo.js 即可。
(function () {
  "use strict";

  // —— 配置（按 skill 默认值，可改）——
  var CONFIG = {
    studio: "捞鱼工作室",
    author: "捞鱼",
    home: "https://lyzbcy.github.io/",
    sticker: "https://lyzbcy.github.io/" // 表情包/更多测试入口，暂同主页
  };

  // 注入顶部浮条
  function injectBar() {
    if (document.getElementById("promoBar")) return;
    var bar = document.createElement("div");
    bar.id = "promoBar";
    bar.className = "promo-bar";
    bar.innerHTML =
      '<button class="promo-btn" id="promoAboutBtn"><span class="emoji">🐟</span>关于捞鱼</button>';
    document.body.appendChild(bar);
    document.getElementById("promoAboutBtn").addEventListener("click", openModal);
  }

  // 注入模态框
  function injectModal() {
    if (document.getElementById("promoOverlay")) return;
    var ov = document.createElement("div");
    ov.id = "promoOverlay";
    ov.className = "promo-overlay";
    ov.innerHTML =
      '<div class="promo-card">' +
        '<button class="promo-close" id="promoClose" aria-label="关闭">×</button>' +
        '<span class="promo-tag">由 ' + CONFIG.studio + ' 制作</span>' +
        '<h2>🐟 关于捞鱼</h2>' +
        '<p>这个备考网站由<strong>捞鱼</strong>独立制作。捞鱼还在做更多好玩的东西——趣味测试、表情包、学习工具。</p>' +
        '<div class="promo-links">' +
          '<a class="promo-link" href="' + CONFIG.home + '" target="_blank" rel="noopener">' +
            '<span class="icon">🏠</span><span>访问捞鱼主页<small>更多作品 · lyzbcy.github.io</small></span>' +
          '</a>' +
          '<a class="promo-link" href="' + CONFIG.sticker + '" target="_blank" rel="noopener">' +
            '<span class="icon">😺</span><span>看看表情包/趣味测试<small>开盲盒式测试 · 等你来玩</small></span>' +
          '</a>' +
        '</div>' +
      '</div>';
    document.body.appendChild(ov);
    document.getElementById("promoClose").addEventListener("click", closeModal);
    ov.addEventListener("click", function (e) {
      if (e.target === ov) closeModal();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeModal();
    });
  }

  function openModal() {
    var ov = document.getElementById("promoOverlay");
    if (ov) ov.classList.add("show");
  }
  function closeModal() {
    var ov = document.getElementById("promoOverlay");
    if (ov) ov.classList.remove("show");
  }

  // 暴露（方便 onclick 调用）
  window.Promo = { open: openModal, close: closeModal };

  // DOM 就绪后注入
  function init() { injectBar(); injectModal(); }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
