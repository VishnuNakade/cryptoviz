import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Tab, Tabs, Row, Col, Image, Alert } from 'react-bootstrap';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import News from '../components/News';

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false); // Add state for dark mode

  useEffect(() => {
    fetchCoinData();
    fetchChartData();
  }, [id]);

  const fetchCoinData = async () => {
    try {
      const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
      setCoin(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch coin data.");
    }
  };

  const fetchChartData = async () => {
    try {
      const { data } = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart`, {
          params: {
            vs_currency: 'usd',
            days: 7,
          },
        }
      );

      const formatted = data.prices.map(price => ({
        time: new Date(price[0]).toLocaleDateString(),
        value: price[1],
      }));
      setChartData(formatted);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch chart data.");
    }
  };
  

  if (error) return <Alert variant="danger" className="m-4 text-center">{error}</Alert>;

  // 👇 Loading State with Skeleton Placeholder
  if (!coin) {
    return (
      <Container className="my-4">
        <Row className="mb-4 align-items-center">
          <Col md={2}>
            <Skeleton circle height={80} width={80} />
          </Col>
          <Col>
            <h2><Skeleton width={200} /></h2>
            <Skeleton count={3} />
          </Col>
        </Row>

        <Tabs defaultActiveKey="market" className="mb-3" role="tablist">
          <Tab eventKey="market" title="Market Data" role="tab" tabIndex={0}>
            <Row className="mb-3">
              {[...Array(6)].map((_, idx) => (
                <Col md={6} key={idx}>
                  <Skeleton height={20} className="mb-2" />
                </Col>
              ))}
            </Row>
          </Tab>

          <Tab eventKey="chart" title="7-Day Price Chart" role="tab" tabIndex={0}>
            <Skeleton height={300} />
          </Tab>

          <Tab eventKey="distribution" title="Market Distribution" role="tab" tabIndex={0}>
            <Skeleton height={300} />
          </Tab>

          <Tab eventKey="links" title="Links" role="tab" tabIndex={0}>
            <ul>
              {[...Array(3)].map((_, idx) => (
                <li key={idx}><Skeleton width={180} /></li>
              ))}
            </ul>
          </Tab>
        </Tabs>
      </Container>
    );
  }

  const {
    image,
    name,
    symbol,
    market_data,
    links,
    description,
  } = coin;

  const chartLineColor = darkMode ? '#8884d8' : '#007bff';
  const pieColors = ['#8884d8', '#82ca9d', '#ffc658'];

  return (
    <Container className="my-4">
      <Row className="mb-4 align-items-center">
        <Col md={2}>
          <Image src={image?.large} alt={name} fluid rounded />
        </Col>
        <Col>
          <h2>{name} ({symbol?.toUpperCase()})</h2>
          <p dangerouslySetInnerHTML={{ __html: description?.en?.slice(0, 200) || 'No description available.' }} />
        </Col>
      </Row>

      <Tabs defaultActiveKey="market" className="mb-3">
        <Tab eventKey="market" title="Market Data">
          {market_data ? (
            <Row className="mb-3">
              <Col md={6}><strong>Current Price:</strong> ${market_data.current_price?.usd?.toLocaleString()}</Col>
              <Col md={6}><strong>Market Cap:</strong> ${market_data.market_cap?.usd?.toLocaleString()}</Col>
              <Col md={6}><strong>24h High:</strong> ${market_data.high_24h?.usd?.toLocaleString()}</Col>
              <Col md={6}><strong>24h Low:</strong> ${market_data.low_24h?.usd?.toLocaleString()}</Col>
              <Col md={6}><strong>Total Volume:</strong> ${market_data.total_volume?.usd?.toLocaleString()}</Col>
              <Col md={6}><strong>Circulating Supply:</strong> {market_data.circulating_supply?.toLocaleString()}</Col>
            </Row>
          ) : (
            <p>Market data not available.</p>
          )}
        </Tab>

        <Tab eventKey="chart" title="7-Day Price Chart">
          <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData} aria-label="Price trends over 7 days" role="img">
              <XAxis dataKey="time" />
              <YAxis domain={['auto', 'auto']} />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke={chartLineColor} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Tab>

        <Tab eventKey="distribution" title="Market Distribution">
          <h5 className="mt-3">🧩 Market Distribution Pie</h5>
          {market_data ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart aria-label="Market distribution pie chart" role="img">
                <Pie
                  data={[
                    { name: 'Market Cap', value: market_data.market_cap?.usd || 0 },
                    { name: 'Volume (24h)', value: market_data.total_volume?.usd || 0 },
                    { name: 'Circulating Supply', value: market_data.circulating_supply || 0 }
                  ]}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label
                >
                  {pieColors.map((color, index) => <Cell key={`cell-${index}`} fill={color} />)}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p>Distribution data not available.</p>
          )}
        </Tab>

        <Tab eventKey="links" title="Links">
          <ul>
            {links?.homepage?.[0] && <li><a href={links.homepage[0]} target="_blank" rel="noreferrer">Official Website</a></li>}
            {links?.repos_url?.github?.[0] && <li><a href={links.repos_url.github[0]} target="_blank" rel="noreferrer">GitHub</a></li>}
            {links?.twitter_screen_name && <li><a href={`https://twitter.com/${links.twitter_screen_name}`} target="_blank" rel="noreferrer">Twitter</a></li>}
          </ul>
        </Tab>

        {/* <Tab eventKey="news" title="News">
    <News />
  </Tab> */}

      </Tabs>
    </Container>
  );
};

export default CoinPage;
