import React from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

function CoinCard({ coin, isFavorite, toggleFavorite }) {
  const navigate = useNavigate();

  const handleCardClick = () => navigate(`/coin/${coin.id}`);
  const handleHeartClick = (e) => {
    e.stopPropagation(); // prevent card navigation
    toggleFavorite(coin.id);
  };

  return (
    <Card
    className="shadow-sm h-100 position-relative coin-card"
    onClick={handleCardClick}
    style={{ cursor: 'pointer' }}
  >
  
      <Card.Body>
        {/* Favorite Icon */}
        <div
          className="position-absolute top-0 end-0 p-2"
          onClick={handleHeartClick}
          style={{ zIndex: 10 }}
          role="button"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? <FaHeart color="red" /> : <FaRegHeart color="gray" />}
        </div>

        <div className="d-flex align-items-center mb-3">
          <img
            src={coin.image}
            alt={coin.name}
            width="32"
            height="32"
            className="me-2"
          />
          <div>
            <strong>{coin.name}</strong> <span>({coin.symbol.toUpperCase()})</span>
          </div>
        </div>

        <div className="mb-2">
          <strong>💲 Price: </strong>${coin.current_price.toLocaleString()}
        </div>
        <div className="mb-2">
          <strong>📉 24h Change: </strong>
          <span
            style={{
              color: coin.price_change_percentage_24h >= 0 ? 'green' : 'red',
            }}
          >
            {coin.price_change_percentage_24h != null
              ? `${coin.price_change_percentage_24h.toFixed(2)}%`
              : 'N/A'}
          </span>
        </div>
        <div>
          <strong>🏦 Market Cap: </strong>${coin.market_cap.toLocaleString()}
        </div>
      </Card.Body>
    </Card>
  );
}

export default CoinCard;
