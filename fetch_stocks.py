import yfinance as yf
import pandas as pd
import os

tickers = {
    'SPOT': 'Spotify',
    'UMG.AS': 'Universal Music Group',
    'WMG': 'Warner Music Group',
    'LYV': 'Live Nation'
}

os.makedirs('data', exist_ok=True)

# Un CSV par action
for ticker, name in tickers.items():
    print(f"Téléchargement {ticker} ({name})...")
    hist = yf.Ticker(ticker).history(period='7y')
    hist.index = hist.index.tz_localize(None)  # Supprime le timezone
    hist = hist[['Open', 'High', 'Low', 'Close', 'Volume']]
    hist.index.name = 'Date'
    filename = f"data/{ticker.replace('.', '_')}_2018_2025.csv"
    hist.to_csv(filename)
    print(f"  ✅ {len(hist)} jours sauvegardés → {filename}")

# Un CSV combiné (cours de clôture uniquement)
print("\nGénération du fichier combiné...")
closes = {}
for ticker in tickers:
    hist = yf.Ticker(ticker).history(period='7y')
    hist.index = hist.index.tz_localize(None)
    closes[ticker] = hist['Close']

df_combined = pd.DataFrame(closes)
df_combined.index.name = 'Date'
df_combined.to_csv('data/stocks_combined_close.csv')
print(f"  ✅ Fichier combiné sauvegardé → data/stocks_combined_close.csv")
print(f"\n✅ Terminé — {len(df_combined)} jours de données (2018-2025)")
