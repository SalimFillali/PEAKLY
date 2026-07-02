/* =====================================================================
   AUDIO-AMBIENT.JS
   Bouton flottant pour activer/couper une musique d'ambiance en boucle.
   Le choix de l'utilisateur est mémorisé (localStorage) pour essayer de
   reprendre automatiquement la lecture d'une page à l'autre — le site
   étant en pages HTML séparées, chaque navigation recharge le lecteur.
   ===================================================================== */

(function () {
  var STORAGE_KEY = 'peakly_ambient_sound';

  document.addEventListener('DOMContentLoaded', function () {
    var audio = document.getElementById('ambient_audio');
    var btn = document.getElementById('audio_toggle_btn');

    if (!audio || !btn) return;

    var TIME_KEY = 'peakly_ambient_time';

    // Sauvegarde la position toutes les 250 ms
    setInterval(function () {
        if (!audio.paused) {
            localStorage.setItem(TIME_KEY, audio.currentTime);
        }
    }, 250);


    function setPlayingState(isPlaying) {
      btn.classList.toggle('is_playing', isPlaying);
      btn.setAttribute('aria-pressed', isPlaying ? 'true' : 'false');
      btn.setAttribute('aria-label', isPlaying ? 'Couper la musique d\'ambiance' : 'Activer la musique d\'ambiance');
    }

    /* Reprend la lecture si l'utilisateur l'avait activée sur une page précédente */
    if (localStorage.getItem(STORAGE_KEY) === 'on') {

    var savedTime = parseFloat(localStorage.getItem(TIME_KEY));

    if (!isNaN(savedTime)) {
        audio.currentTime = savedTime;
    }

    audio.play().then(function () {
        setPlayingState(true);
    }).catch(function () {
        setPlayingState(false);
    });
}

    btn.addEventListener('click', function () {
      if (audio.paused) {
        audio.play().then(function () {
          setPlayingState(true);
          localStorage.setItem(STORAGE_KEY, 'on');
        }).catch(function () {
          setPlayingState(false);
        });
      } else {
        audio.pause();
        setPlayingState(false);
        localStorage.setItem(STORAGE_KEY, 'off');
      }
    });
  });
  window.addEventListener('beforeunload', function () {
    localStorage.setItem(TIME_KEY, audio.currentTime);
});
})();