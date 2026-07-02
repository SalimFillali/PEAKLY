/* =====================================================================
   CURSOR.JS
   Curseur personnalisé (un point + un anneau) qui suit la souris.
   Ne s'active pas sur tactile (les écrans tactiles n'ont pas de souris).
   ===================================================================== */

(function () {
  var isMouseDevice = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!isMouseDevice) return;

  document.addEventListener('DOMContentLoaded', function () {
    document.body.classList.add('has_custom_cursor');

    var dot = document.createElement('div');
    dot.className = 'cursor_dot';
    var ring = document.createElement('div');
    ring.className = 'cursor_ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    var ringX = 0, ringY = 0;
    var targetX = 0, targetY = 0;

    document.addEventListener('mousemove', function (e) {
      targetX = e.clientX;
      targetY = e.clientY;
      dot.style.left = targetX + 'px';
      dot.style.top = targetY + 'px';
    });

    /* L'anneau suit avec un léger retard pour un effet plus doux */
    function animateRing() {
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;
      ring.style.left = ringX + 'px';
      ring.style.top = ringY + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    /* Grossit au survol de tout élément cliquable */
    var hoverSelector = 'a, button, .card_panel, .arch_tile, .price_card, .rec_card, input, select, textarea';
    document.addEventListener('mouseover', function (e) {
      if (e.target.closest(hoverSelector)) {
        ring.classList.add('is_hovering');
      }
    });
    document.addEventListener('mouseout', function (e) {
      if (e.target.closest(hoverSelector)) {
        ring.classList.remove('is_hovering');
      }
    });

    /* Cache le curseur perso quand la souris quitte la fenêtre */
    document.addEventListener('mouseleave', function () {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    });
    document.addEventListener('mouseenter', function () {
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    });
  });
})();
