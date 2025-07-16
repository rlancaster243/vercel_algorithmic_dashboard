export default async function handler(req, res) {
  const API_KEY = process.env.ALPACA_KEY;
  const API_SECRET = process.env.ALPACA_SECRET;

  const headers = {
    'APCA-API-KEY-ID': API_KEY,
    'APCA-API-SECRET-KEY': API_SECRET
  };

  try {
    const resp = await fetch('https://paper-api.alpaca.markets/v2', { headers });
    const json = await resp.json();
    const price = json['AAPL']?.trade?.p || null;
    res.status(200).json({ price });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch price', details: err.message });
  }
}
