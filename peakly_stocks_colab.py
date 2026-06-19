# ============================================================
# PEAKLY — Nettoyage & Transformation Données Boursières
# Google Colab — Prêt pour Power BI
# ============================================================

# ── ÉTAPE 1 : Installation ──────────────────────────────────
!pip install yfinance pandas -q

import yfinance as yf
import pandas as pd
from google.colab import files

# ── ÉTAPE 2 : Téléchargement des données ───────────────────
tickers = {
    'SPOT'  : 'Spotify',
    'UMG.AS': 'Universal Music Group',
    'WMG'   : 'Warner Music Group',
    'LYV'   : 'Live Nation'
}

raw = {}
for ticker, name in tickers.items():
    df = yf.Ticker(ticker).history(start='2018-01-01', end='2025-12-31')
    df.index = df.index.tz_localize(None)          # Supprime timezone
    raw[ticker] = df[['Open', 'High', 'Low', 'Close', 'Volume']]
    print(f"✅ {ticker} ({name}) — {len(df)} jours")

# ── ÉTAPE 3 : Nettoyage individuel par action ───────────────
def clean_stock(df, ticker, name):
    df = df.copy()
    df.index.name = 'Date'
    df = df.reset_index()

    # Format Date propre (YYYY-MM-DD) — reconnu automatiquement par Power BI
    df['Date'] = pd.to_datetime(df['Date']).dt.date

    # Forcer les types numériques (float64) — obligatoire pour Power BI
    for col in ['Open', 'High', 'Low', 'Close']:
        df[col] = pd.to_numeric(df[col], errors='coerce').round(2)

    # Volume en entier
    df['Volume'] = df['Volume'].astype(int)

    # Colonnes ajoutées pour Power BI
    df['Ticker']    = ticker
    df['Company']   = name
    df['Année']     = pd.to_datetime(df['Date']).dt.year
    df['Mois']      = pd.to_datetime(df['Date']).dt.month
    df['Mois_Nom']  = pd.to_datetime(df['Date']).dt.strftime('%B')
    df['Trimestre'] = pd.to_datetime(df['Date']).dt.quarter.map(lambda q: f'Q{q}')

    # Variation journalière (%)
    df['Variation_%'] = df['Close'].pct_change().mul(100).round(2)

    # Moyenne mobile 30 jours et 90 jours
    df['MA_30j'] = df['Close'].rolling(30).mean().round(2)
    df['MA_90j'] = df['Close'].rolling(90).mean().round(2)

    # Supprimer les NaN restants (premières lignes des moyennes mobiles)
    df = df.dropna(subset=['MA_30j'])

    # Réordonner les colonnes
    df = df[['Date', 'Année', 'Trimestre', 'Mois', 'Mois_Nom',
             'Ticker', 'Company',
             'Open', 'High', 'Low', 'Close',
             'Volume', 'Variation_%', 'MA_30j', 'MA_90j']]
    return df

cleaned = {}
for ticker, name in tickers.items():
    cleaned[ticker] = clean_stock(raw[ticker], ticker, name)
    print(f"✅ {ticker} nettoyé — {len(cleaned[ticker])} lignes")

# ── ÉTAPE 4 : Export CSV individuels ───────────────────────
for ticker, df in cleaned.items():
    filename = f"{ticker.replace('.', '_')}_2018_2025_clean.csv"
    df.to_csv(filename, index=False, sep=',', encoding='utf-8-sig')
    print(f"💾 {filename} sauvegardé")

# ── ÉTAPE 5 : Fichier combiné (tous les tickers ensemble) ──
# C'est ce fichier qui est le plus utile pour Power BI
# (1 seule source, filtrable par Ticker)
df_all = pd.concat(cleaned.values(), ignore_index=True)
# S'assurer que les colonnes numériques sont bien en float dans le CSV final
for col in ['Open', 'High', 'Low', 'Close', 'MA_30j', 'MA_90j', 'Variation_%']:
    df_all[col] = pd.to_numeric(df_all[col], errors='coerce')
df_all['Volume'] = df_all['Volume'].astype('Int64')
df_all.to_csv('peakly_stocks_ALL_clean.csv', index=False, sep=',', encoding='utf-8-sig')
print(f"\n✅ Fichier combiné : peakly_stocks_ALL_clean.csv — {len(df_all)} lignes")

# ── ÉTAPE 6 : Aperçu des données ───────────────────────────
print("\n📊 Aperçu du fichier combiné :")
print(df_all.head(5).to_string(index=False))
print(f"\nColonnes : {list(df_all.columns)}")
print(f"Période  : {df_all['Date'].min()} → {df_all['Date'].max()}")
print(f"Tickers  : {df_all['Ticker'].unique()}")

# ── ÉTAPE 7 : Téléchargement ───────────────────────────────
print("\n⬇️ Téléchargement des fichiers...")
files.download('peakly_stocks_ALL_clean.csv')
for ticker in tickers:
    files.download(f"{ticker.replace('.', '_')}_2018_2025_clean.csv")
print("✅ Tous les fichiers téléchargés !")
