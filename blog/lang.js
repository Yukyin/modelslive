// 默认英文。网址带 ?lang=zh 直接打开中文版；点右上角按钮切换，并记住这次的选择。
(function () {
  var root = document.documentElement;
  function apply(lang) {
    var zh = lang === 'zh';
    root.lang = zh ? 'zh-CN' : 'en';
    var t = document.querySelector('meta[name="title-' + (zh ? 'zh' : 'en') + '"]');
    if (t) document.title = t.content;
    var btn = document.getElementById('langBtn');
    if (btn) btn.textContent = zh ? 'EN' : '中文';
  }
  function current() {
    var q = new URLSearchParams(location.search).get('lang');
    if (q === 'zh' || q === 'en') return q;
    try { var s = localStorage.getItem('ml_lang'); if (s === 'zh' || s === 'en') return s; } catch (e) {}
    return 'en';
  }
  var lang = current();
  apply(lang);
  document.addEventListener('DOMContentLoaded', function () {
    apply(lang);
    var btn = document.getElementById('langBtn');
    if (!btn) return;
    btn.addEventListener('click', function () {
      lang = lang === 'zh' ? 'en' : 'zh';
      apply(lang);
      try { localStorage.setItem('ml_lang', lang); } catch (e) {}
      var u = new URL(location.href);
      if (lang === 'zh') u.searchParams.set('lang', 'zh'); else u.searchParams.delete('lang');
      history.replaceState(null, '', u.toString());
    });
  });
})();
