import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CoinCard from '../components/CoinCard';
import { Container, Row, Col, Form, Dropdown, Alert } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


function Home() {
  const [coins, setCoins] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('market_cap_desc');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem('favorites');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    fetchCoins();
  }, [sortBy]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const fetchCoins = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets`, {
          params: {
            vs_currency: 'usd',
            order: sortBy,
            per_page: 10,
            page: 1,
            sparkline: false
          }
        }
      );
      setCoins(data);
      setFilteredCoins(data);
    } catch (error) {
      console.error("Error fetching coin data", error);
      setError("⚠️ Failed to fetch coin data. Please check your internet or try again.");
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearch(term);
    const filtered = coins.filter(coin =>
      coin.name.toLowerCase().includes(term) ||
      coin.symbol.toLowerCase().includes(term)
    );
    setFilteredCoins(filtered);
  };

  const handleSort = (order) => {
    setSortBy(order);
  };

  const toggleFavorite = (coinId) => {
    setFavorites((prev) =>
      prev.includes(coinId) ? prev.filter((id) => id !== coinId) : [...prev, coinId]
    );
  };

  return (
    <Container className="mt-4">
      {/* <h2 className="text-center mb-4">Top 10 Cryptocurrencies</h2> */}

      <Row className="align-items-center mb-3">
      <Col xs={12} md={4}>
  <div className="input-group">
    <span className="input-group-text bg-white">
      <i className="bi bi-search" />
    </span>
    <Form.Control
      type="text"
      placeholder="Search by coin name or symbol..."
      value={search}
      onChange={handleSearch}
      aria-label="Search cryptocurrencies"
    />
  </div>
</Col>


  <Col xs={12} md={8} className="text-md-end mt-2 mt-md-0">
    <Dropdown onSelect={handleSort}>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        Sort By
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item eventKey="market_cap_desc">Market Cap (High to Low)</Dropdown.Item>
        <Dropdown.Item eventKey="market_cap_asc">Market Cap (Low to High)</Dropdown.Item>
        <Dropdown.Item eventKey="volume_desc">Volume (High to Low)</Dropdown.Item>
        <Dropdown.Item eventKey="volume_asc">Volume (Low to High)</Dropdown.Item>
        <Dropdown.Item eventKey="price_desc">Price (High to Low)</Dropdown.Item>
        <Dropdown.Item eventKey="price_asc">Price (Low to High)</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </Col>
</Row>


      {error && (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      )}

      <Row>
        {loading
          ? [...Array(8)].map((_, idx) => (
              <Col md={4} lg={3} sm={6} xs={12} className="mb-4" key={idx}>
                <div className="p-3 border rounded">
                  <Skeleton height={50} width={50} circle className="mb-2" />
                  <Skeleton height={20} width={`60%`} className="mb-2" />
                  <Skeleton height={20} width={`40%`} />
                </div>
              </Col>
            ))
          : filteredCoins.map(coin => (
              <Col md={4} lg={3} sm={6} xs={12} className="mb-4" key={coin.id}>
                <CoinCard
                  coin={coin}
                  isFavorite={favorites.includes(coin.id)}
                  toggleFavorite={toggleFavorite}
                />
              </Col>
            ))
        }
      </Row>
    </Container>
  );
}

export default Home;