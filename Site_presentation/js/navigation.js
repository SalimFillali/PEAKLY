/* =====================================================================
   NAVIGATION.JS
   Navigation clavier (flèches, Home/End) et swipe tactile entre les pages.
   Les liens précédent/suivant sont déjà écrits en dur dans chaque page
   (voir .nav_arrow.prev / .nav_arrow.next) : ce script les déclenche
   simplement au clavier ou au swipe, il ne recalcule rien.
   ===================================================================== */

(function () {
  document.addEventListener('DOMContentLoaded', function () {

    var prevLink = document.querySelector('.nav_arrow.prev');
    var nextLink = document.querySelector('.nav_arrow.next');

    function goPrev() {
      if (prevLink && !prevLink.classList.contains('is_disabled')) prevLink.click();
    }
    function goNext() {
      if (nextLink && !nextLink.classList.contains('is_disabled')) nextLink.click();
    }

    document.addEventListener('keydown', function (e) {
      /* ignore les flèches si on tape dans un champ de formulaire */
      var tag = (e.target.tagName || '').toLowerCase();
      if (tag === 'input' || tag === 'textarea') return;

      if (['ArrowRight', 'ArrowDown', 'PageDown', ' '].indexOf(e.key) > -1) {
        e.preventDefault();
        goNext();
      } else if (['ArrowLeft', 'ArrowUp', 'PageUp'].indexOf(e.key) > -1) {
        e.preventDefault();
        goPrev();
      }
    });

    /* swipe tactile basique */
    var touchStartX = null;
    document.addEventListener('touchstart', function (e) {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });

    document.addEventListener('touchend', function (e) {
      if (touchStartX === null) return;
      var dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 60) {
        dx < 0 ? goNext() : goPrev();
      }
      touchStartX = null;
    }, { passive: true });

    /* recalcule la hauteur réelle du header (utile si le menu passe sur 2 lignes en mobile) */
    function syncHeaderHeight() {
      var header = document.querySelector('.header_main');
      if (!header) return;
      document.documentElement.style.setProperty('--nav-height', header.offsetHeight + 'px');
    }
    syncHeaderHeight();
    window.addEventListener('resize', syncHeaderHeight);
  });
})();
