/* =====================================================================
   TRANSITIONS.JS
   1) Écran de lancement (splash) : uniquement si #launch_screen existe
      sur la page (présent seulement sur index.html).
   2) Transition entre les pages : un voile noir apparaît en fondu avant
      de charger la page suivante, pour éviter le "flash" blanc/brut
      du changement de page classique.
   ===================================================================== */

(function () {
  document.addEventListener('DOMContentLoaded', function () {

    /* ---------- 1) Écran de lancement ---------- */
    var launchScreen = document.getElementById('launch_screen');
    if (launchScreen) {
      window.addEventListener('load', function () {
        setTimeout(function () {
          launchScreen.classList.add('is_hidden');
        }, 1200);
      });
    }

    /* ---------- 2) Voile de transition entre les pages ---------- */
    var veil = document.createElement('div');
    veil.className = 'page_transition_veil';
    document.body.appendChild(veil);

    var internalLinkSelector = 'a[href$=".html"], a[href="index.html"]';
    document.querySelectorAll(internalLinkSelector).forEach(function (link) {
      link.addEventListener('click', function (e) {
        var href = link.getAttribute('href');
        if (!href || link.target === '_blank') return;
        e.preventDefault();
        veil.classList.add('is_active');
        setTimeout(function () {
          window.location.href = href;
        }, 320);
      });
    });

    /* ---------- 3) Apparition progressive des blocs de contenu ---------- */
    /* On marque automatiquement les blocs "visuels" de la page (cartes, graphiques,
       tableaux...) avec .reveal_item, puis on les fait apparaître en cascade.
       Pour ajouter un nouveau type de bloc à cet effet, ajoute simplement sa classe
       à la liste ci-dessous. */
    var revealSelectors = '.section_head, .card_panel, .chart_card, .rec_card, .price_card, .quote_box, .arch_tile, .table_wrap, .timeline_list';
    var revealItems = document.querySelectorAll(revealSelectors);
    revealItems.forEach(function (el) {
      el.classList.add('reveal_item');
    });
    requestAnimationFrame(function () {
      revealItems.forEach(function (el, index) {
        setTimeout(function () {
          el.classList.add('is_visible');
        }, 45 * Math.min(index, 12));
      });
    });
  });
})();
