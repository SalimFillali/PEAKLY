import yfinance as yf

tickers = {
    'SPOT': 'Spotify',
    'UMG.AS': 'Universal Music Group',
    'WMG': 'Warner Music Group',
    'LYV': 'Live Nation'
}

for ticker, name in tickers.items():
    try:
        hist = yf.Ticker(ticker).history(period='1mo')
        if hist.empty:
            print(f"❌ {ticker} ({name}) : aucune donnée")
        else:
            print(f"✅ {ticker} ({name}) : dernier cours = {hist['Close'].iloc[-1]:.2f}")
    except Exception as e:
        print(f"❌ {ticker} ({name}) : ERREUR — {e}")
