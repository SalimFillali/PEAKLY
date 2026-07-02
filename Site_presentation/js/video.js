/* =====================================================================
   VIDEO-CARDS.JS
   Lecture automatique au survol d'une .video_card, pause + retour au
   début à la sortie. S'applique à toutes les .video_card de la page,
   sans configuration supplémentaire.
   ===================================================================== */

(function () {
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.video_card video').forEach(function (video) {
      var card = video.closest('.video_card');
      if (!card) return;

      card.addEventListener('mouseenter', function () {
        video.play();
      });

      card.addEventListener('mouseleave', function () {
        video.pause();
        video.currentTime = 0;
      });
    });
  });
})();