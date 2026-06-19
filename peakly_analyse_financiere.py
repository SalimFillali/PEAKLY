# ============================================================
# PEAKLY — Analyses Financières
# Google Colab — Prêt pour Power BI
# ============================================================

!pip install yfinance pandas -q

import yfinance as yf
import pandas as pd
import os
from google.colab import drive

drive.mount('/content/drive')
SAVE_PATH = '/content/drive/MyDrive/PEAKLY/data/'
os.makedirs(SAVE_PATH, exist_ok=True)

# ── CHARGEMENT DES DONNÉES ──────────────────────────────────
tickers = {
    'SPOT'  : 'Spotify',
    'UMG.AS': 'Universal Music Group',
    'WMG'   : 'Warner Music Group',
    'LYV'   : 'Live Nation'
}

raw = {}
for ticker, name in tickers.items():
    df = yf.Ticker(ticker).history(start='2018-01-01', end='2025-12-31')
    df.index = df.index.tz_localize(None)
    raw[ticker] = df[['Open', 'High', 'Low', 'Close', 'Volume']]
    print(f"✅ {ticker} — {len(df)} jours")


# ════════════════════════════════════════════════════════════
# ANALYSE 1 — VARIATION ANNUELLE % PAR ACTION
# ════════════════════════════════════════════════════════════
print("\n📊 Analyse 1 : Variation annuelle %")

rows = []
for ticker, name in tickers.items():
    df = raw[ticker].copy()
    df['Année'] = df.index.year

    for année in df['Année'].unique():
        année_df = df[df['Année'] == année]
        if len(année_df) < 2:
            continue
        prix_debut = année_df['Close'].iloc[0]
        prix_fin   = année_df['Close'].iloc[-1]
        variation  = round((prix_fin - prix_debut) / prix_debut * 100, 2)
        rows.append({
            'Ticker'     : ticker,
            'Company'    : name,
            'Année'      : int(année),
            'Prix_Debut' : round(prix_debut, 2),
            'Prix_Fin'   : round(prix_fin, 2),
            'Variation_%': variation,
            'Rendement'  : 'Positif' if variation > 0 else 'Négatif'
        })

df_variation = pd.DataFrame(rows).sort_values(['Ticker', 'Année'])
path = SAVE_PATH + 'peakly_variation_annuelle.csv'
df_variation.to_csv(path, index=False, encoding='utf-8-sig')
print(f"✅ Sauvegardé → {path}")
print(df_variation.to_string(index=False))


# ════════════════════════════════════════════════════════════
# ANALYSE 2 — VOLUME VS COURS PAR SEMESTRE
# ════════════════════════════════════════════════════════════
print("\n📊 Analyse 2 : Volume vs Cours")

rows = []
for ticker, name in tickers.items():
    df = raw[ticker].copy()
    df['Année']      = df.index.year
    df['Mois']       = df.index.month
    df['Semestre']   = df['Année'].astype(str) + '-S' + df['Mois'].apply(lambda m: '1' if m <= 6 else '2')
    df['Tri_Sem']    = df['Année'] * 10 + df['Mois'].apply(lambda m: 1 if m <= 6 else 2)

    grouped = df.groupby(['Semestre', 'Tri_Sem']).agg(
        Close_Moyen  = ('Close', 'mean'),
        Volume_Total = ('Volume', 'sum'),
        Ticker       = ('Close', lambda x: ticker),
    ).reset_index()
    grouped['Company']      = name
    grouped['Close_Moyen']  = grouped['Close_Moyen'].round(2)
    grouped['Volume_M']     = (grouped['Volume_Total'] / 1_000_000).round(2)
    rows.append(grouped)

df_volume = pd.concat(rows, ignore_index=True)
df_volume = df_volume[['Semestre', 'Tri_Sem', 'Ticker', 'Company',
                        'Close_Moyen', 'Volume_Total', 'Volume_M']]
df_volume = df_volume.sort_values(['Ticker', 'Tri_Sem'])

path = SAVE_PATH + 'peakly_volume_vs_cours.csv'
df_volume.to_csv(path, index=False, encoding='utf-8-sig')
print(f"✅ Sauvegardé → {path}")


# ════════════════════════════════════════════════════════════
# ANALYSE 3 — CORRÉLATION ENTRE LES 4 ACTIONS
# ════════════════════════════════════════════════════════════
print("\n📊 Analyse 3 : Corrélation")

# Cours de clôture alignés par date
closes = {}
for ticker in tickers:
    closes[ticker] = raw[ticker]['Close'].rename(ticker)

df_closes = pd.concat(closes.values(), axis=1).dropna()

# Matrice de corrélation
corr = df_closes.corr().round(3)
print("Matrice de corrélation :")
print(corr)

# Format long pour Power BI
corr_long = corr.reset_index().melt(id_vars='index', var_name='Ticker_B', value_name='Correlation')
corr_long.columns = ['Ticker_A', 'Ticker_B', 'Correlation']
corr_long['Intensite'] = corr_long['Correlation'].apply(
    lambda x: 'Forte' if abs(x) >= 0.7 else ('Modérée' if abs(x) >= 0.4 else 'Faible')
)

path = SAVE_PATH + 'peakly_correlation.csv'
corr_long.to_csv(path, index=False, encoding='utf-8-sig')
print(f"✅ Sauvegardé → {path}")

# Variation journalière corrélée
df_returns = df_closes.pct_change().dropna().round(4)
corr_returns = df_returns.corr().round(3)
corr_returns_long = corr_returns.reset_index().melt(id_vars='index', var_name='Ticker_B', value_name='Correlation')
corr_returns_long.columns = ['Ticker_A', 'Ticker_B', 'Correlation']
path2 = SAVE_PATH + 'peakly_correlation_rendements.csv'
corr_returns_long.to_csv(path2, index=False, encoding='utf-8-sig')
print(f"✅ Sauvegardé → {path2}")

print("\n🎯 Tous les fichiers sont dans Google Drive → PEAKLY/data/")
print("Fichiers générés :")
print("  • peakly_variation_annuelle.csv")
print("  • peakly_volume_vs_cours.csv")
print("  • peakly_correlation.csv")
print("  • peakly_correlation_rendements.csv")
