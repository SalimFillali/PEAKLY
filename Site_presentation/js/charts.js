/* =====================================================================
   CHARTS.JS
   Configuration partagée + initialisation de tous les graphiques Chart.js
   du site. Chaque graphique est protégé par un test document.getElementById :
   ce fichier peut donc être inclus sur n'importe quelle page sans risque,
   même si elle ne contient aucun graphique.
   ===================================================================== */

(function () {
  if (typeof Chart === 'undefined') return;

  var palette = {
    gold:  '#D4AF37',
    goldBright: '#F1D272',
    success: '#22C55E',
    neutral: '#94A3B8',
    neutralDark: '#475569'
  };

  Chart.defaults.color = '#A79E8C';
  Chart.defaults.borderColor = 'rgba(212, 175, 55, 0.10)';
  Chart.defaults.font.family = "'Inter', Helvetica, Arial, sans-serif";

  function baseOptions(extra) {
    var opts = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { labels: { color: '#F8F5EC', boxWidth: 12, font: { size: 11 } } } },
      scales: {
        x: { ticks: { color: '#A79E8C', font: { size: 10 } }, grid: { color: 'rgba(212, 175, 55, 0.08)' } },
        y: { ticks: { color: '#A79E8C', font: { size: 10 } }, grid: { color: 'rgba(212, 175, 55, 0.08)' } }
      }
    };
    if (extra) {
      for (var k in extra) {
        if (k === 'plugins' || k === 'scales') {
          opts[k] = Object.assign({}, opts[k], extra[k]);
        } else {
          opts[k] = extra[k];
        }
      }
    }
    return opts;
  }

  function makeGoldGradient(ctx, chartArea) {
    var gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    gradient.addColorStop(0, 'rgba(212, 175, 55, 0.20)');
    gradient.addColorStop(1, palette.gold);
    return gradient;
  }

  function gradientBackground(context) {
    var chart = context.chart;
    var chartArea = chart.chartArea;
    if (!chartArea) return 'rgba(212, 175, 55, 0.2)';
    return makeGoldGradient(chart.ctx, chartArea);
  }

  /* ---------- Graphique : évolution des revenus Spotify (barres) ---------- */
  if (document.getElementById('chartRevenue')) {
    try {
      new Chart(document.getElementById('chartRevenue'), {
        type: 'bar',
        data: {
          labels: ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
          datasets: [{
            label: 'Revenus (Mds€)',
            data: [2.94, 4.62, 5.25, 6.76, 7.88, 9.66, 11.72, 13.24, 15.62],
            backgroundColor: gradientBackground,
            borderRadius: 5
          }]
        },
        options: baseOptions({ plugins: { legend: { display: false } } })
      });
    } catch (e) { console.error('chartRevenue', e); }
  }

  /* ---------- Graphique : utilisateurs vs abonnés Spotify (lignes) ---------- */
  if (document.getElementById('chartUsers')) {
    try {
      new Chart(document.getElementById('chartUsers'), {
        type: 'line',
        data: {
          labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
          datasets: [
            { label: 'Utilisateurs (M)', data: [77, 104, 138, 180, 232, 299, 365, 433, 551, 626], borderColor: palette.neutral, backgroundColor: 'transparent', tension: 0.3 },
            { label: 'Abonnés (M)', data: [22, 36, 59, 83, 108, 138, 165, 188, 220, 246], borderColor: palette.success, backgroundColor: 'transparent', tension: 0.3 }
          ]
        },
        options: baseOptions()
      });
    } catch (e) { console.error('chartUsers', e); }
  }

  /* ---------- Graphique : variation annuelle des cours boursiers (lignes) ---------- */
  if (document.getElementById('chartStocks')) {
    try {
      new Chart(document.getElementById('chartStocks'), {
        type: 'line',
        data: {
          labels: ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'],
          datasets: [
            { label: 'SPOT', data: [-23.83, 31.48, 107.53, -24.75, -67.66, 129.44, 136.96, 25.97], borderColor: palette.gold, backgroundColor: 'transparent', tension: 0.25 },
            { label: 'LYV', data: [15.47, 47.94, 2.21, 69.36, -42.43, 35.93, 41.05, 11.5], borderColor: palette.success, backgroundColor: 'transparent', tension: 0.25 },
            { label: 'UMG', data: [null, null, null, -0.48, -5.96, 15.35, -0.47, -7.43], borderColor: palette.neutral, backgroundColor: 'transparent', tension: 0.25 },
            { label: 'WMG', data: [null, null, 27.16, 18.81, -16.76, 3.46, -11.55, -0.26], borderColor: palette.neutralDark, backgroundColor: 'transparent', tension: 0.25 }
          ]
        },
        options: baseOptions()
      });
    } catch (e) { console.error('chartStocks', e); }
  }

  /* ---------- Graphique : démographie des utilisateurs US (barres) ---------- */
  if (document.getElementById('chartDemo')) {
    try {
      new Chart(document.getElementById('chartDemo'), {
        type: 'bar',
        data: {
          labels: ['18-24', '25-34', '35-44', '45-54', '55+'],
          datasets: [{ label: '% utilisateurs', data: [26, 29, 16, 11, 19], backgroundColor: gradientBackground, borderRadius: 5 }]
        },
        options: baseOptions({ plugins: { legend: { display: false } } })
      });
    } catch (e) { console.error('chartDemo', e); }
  }
})();
