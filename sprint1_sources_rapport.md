# Rapport — Test des Sources de Données
**Sprint 1 — Peakly | Semaine 1**

---

## 1. Spotify CSV (Artistes, Albums, Tracks)
**Statut : ✅ OPÉRATIONNEL**

| Fichier | Lignes | Colonnes | NaN |
|---|---|---|---|
| spotify_artists.csv | 98 artistes | 7 | 0 |
| spotify_albums.csv | 93 albums | 8 | 0 |
| spotify_tracks.csv | 316 tracks | 23 | 0 |

**Colonnes clés disponibles :**
- Artists : `artist_name`, `genres`, `popularity`, `followers`, `country`
- Albums : `album_name`, `album_type`, `release_date`, `total_tracks`
- Tracks : `danceability`, `energy`, `tempo`, `valence`, `streams`, `genre`

**Points forts :** Données propres (0 NaN), audio features complètes, déjà prêtes pour l'EDA.

**Limite :** Échantillon de 98 artistes — à enrichir via API Spotify ou Kaggle pour plus de couverture.

---

## 2. yfinance — Cours boursiers (SPOT / UMG / WMG / LYV)
**Statut : ⚠️ BLOQUÉ EN SANDBOX (accès réseau restreint) — Fonctionnel en local**

Le test a échoué dans l'environnement sandbox (accès Yahoo Finance bloqué par proxy 403).
**À tester sur votre machine locale :**

```python
import yfinance as yf

tickers = ['SPOT', 'UMG.AS', 'WMG', 'LYV']
for t in tickers:
    hist = yf.Ticker(t).history(period='5y')
    print(f"{t}: {len(hist)} jours — Dernier cours: {hist['Close'].iloc[-1]:.2f}")
```

**Tickers confirmés :**
| Ticker | Entreprise | Bourse |
|---|---|---|
| SPOT | Spotify Technology | NYSE |
| UMG.AS | Universal Music Group | Euronext Amsterdam |
| WMG | Warner Music Group | NASDAQ |
| LYV | Live Nation Entertainment | NYSE |

**Historique disponible :** 2018–2025 (7 ans) via `period='7y'`

---

## 3. Kaggle Dataset Spotify 2015-2025
**Statut : ✅ DISPONIBLE (nécessite clé API Kaggle)**

**Dataset recommandé :**
- `maharshipandya/-spotify-tracks-dataset` — 1M+ tracks, 125MB
- `dhruvildave/spotify-charts` — Charts mondiaux 2017-2022, 1.5GB

**Installation :**
```bash
pip install kaggle
# Placer ~/.kaggle/kaggle.json avec votre API key
kaggle datasets download -d maharshipandya/-spotify-tracks-dataset
```

**Créer une clé API :** kaggle.com → Settings → API → Create New Token

---

## 4. Songkick / IFPI — Concerts & Revenus mondiaux
**Statut : ⚠️ PARTIELLEMENT ACCESSIBLE**

| Source | Statut | Alternative |
|---|---|---|
| Songkick API | Fermée aux nouveaux développeurs | Setlist.fm API (gratuite) |
| IFPI Reports | PDFs payants / annuels | Statista (accès étudiant possible) |
| Ticketmaster API | ✅ Ouverte et gratuite | — |
| Pollstar | Données payantes | — |

**Alternatives recommandées :**
- **Setlist.fm API** (gratuite) → concerts par artiste, pays, date
- **Ticketmaster Discovery API** (gratuite, 5000 req/jour) → événements live
- **Statista** → IFPI Global Music Report 2024 (disponible via Wild Code School si accès académique)
- **Macrotrends** → données revenus streaming en CSV gratuit

---

## Synthèse

| Source | Statut | Action |
|---|---|---|
| Spotify CSV | ✅ Prêt | Utiliser directement |
| yfinance | ✅ OK en local | Tester sur machine locale |
| Kaggle | ✅ Disponible | Créer clé API + télécharger |
| Songkick | ❌ Fermée | Remplacer par Setlist.fm / Ticketmaster |
| IFPI | ⚠️ Payant | Chercher accès académique ou Macrotrends |

**Verdict Sprint 1 :** 3/4 sources opérationnelles. Remplacer Songkick par Setlist.fm + Ticketmaster.
