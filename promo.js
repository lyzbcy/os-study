// 捞鱼工作室导流入口 · promo.js
// 原生 JS，无依赖。在每个页面 <body> 末尾引入 promo.css + promo.js 即可。
(function () {
  "use strict";

  // —— 配置（按 skill 默认值，可改）——
  var CONFIG = {
    studio: "捞鱼工作室",
    author: "捞鱼",
    home: "https://lyzbcy.github.io/",
    // 微信表情包下载二维码（固定，长按扫码即可在微信使用）
    stickerQr: "https://s41.ax1x.com/2026/06/25/pmtdMWV.png"
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
        '<p>这个备考网站由<strong>捞鱼</strong>独立制作。捞鱼还在做更多好玩的东西——趣味测试、微信表情包、学习工具。</p>' +
        '<div class="promo-links">' +
          '<a class="promo-link" href="' + CONFIG.home + '" target="_blank" rel="noopener">' +
            '<span class="icon">🏠</span><span>访问捞鱼主页<small>更多作品 · lyzbcy.github.io</small></span>' +
          '</a>' +
          '<a class="promo-link" href="' + CONFIG.stickerQr + '" target="_blank" rel="noopener">' +
            '<span class="icon">😺</span><span>微信扫码下载表情包<small>周三涵/周五涵系列 · 长按识别</small></span>' +
          '</a>' +
        '</div>' +
        '<div style="margin-top:16px;text-align:center">' +
          '<img src="' + CONFIG.stickerQr + '" alt="微信表情包二维码" style="width:150px;height:150px;border:2px solid #1E3A24;border-radius:12px">' +
          '<p style="font-size:12px;color:rgba(26,32,24,.6);margin-top:8px">📱 长按或扫码 · 微信里也能用这些表情</p>' +
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
