import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Spinner, Card, Button, Alert } from 'react-bootstrap';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = '2123b9fbdab160da648a71a340b104160100c370'; // Replace this with your actual key

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Use the relative URL, no need for the full base URL (proxy takes care of it)
        const { data } = await axios.get(`/api/v1/posts/`, {
          params: {
            auth_token: API_KEY,
            filter: 'trending', // Or 'news', 'media', etc.
          },
        });
        
        console.log("API response data:", data);  // Log the full response for debugging
        setNews(data.results || []);
      } catch (err) {
        console.error("API error:", err.response ? err.response.data : err.message);
        setError("⚠️ Failed to load news. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div className="mt-3">
      {news.map((item) => (
        <Card className="mb-3" key={item.id}>
          <Card.Body>
            <Card.Title>{item.title}</Card.Title>
            <Card.Text>{item.domain}</Card.Text>
            <Button
              variant="primary"
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read More
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default News;
