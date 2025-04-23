import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchCoinDetail } from '../api/crypto';
import ChartComponent from './ChartComponent';

const CoinDetail = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCoinDetail(id).then(data => {
      setCoin(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <div className="container mt-4">Loading...</div>;

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-body">
          <h2 className="card-title">{coin.name} ({coin.symbol.toUpperCase()})</h2>
          <img src={coin.image.large} alt={coin.name} className="my-3" style={{ width: '80px' }} />

          <p className="card-text">
            <strong>Current Price:</strong> ${coin.market_data.current_price.usd}
          </p>
          <p className="card-text">
            <strong>Market Cap:</strong> ${coin.market_data.market_cap.usd.toLocaleString()}
          </p>
          <p className="card-text">
            <strong>24h High:</strong> ${coin.market_data.high_24h.usd} <br />
            <strong>24h Low:</strong> ${coin.market_data.low_24h.usd}
          </p>
          <p className="card-text">
            <strong>Description:</strong> {coin.description.en?.split('. ')[0]}.
          </p>

          {/* Chart below */}
          <ChartComponent coinId={coin.id} />
        </div>
      </div>
    </div>
  );
};

export default CoinDetail;
