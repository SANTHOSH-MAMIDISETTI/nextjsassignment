import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Card, CardContent, Grid, CircularProgress, Snackbar, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';

// Define a styled card with hover effects
const HoverCard = styled(Card)(({ theme }) => ({
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: theme.shadows[10],
  },
}));

const getRandomColor = () => {
  const colors = ['#FFDDC1', '#C1E3D4', '#D4E1FF', '#F4B3F4', '#E3F4B3'];
  return colors[Math.floor(Math.random() * colors.length)];
};

const ReviewRequestSummary: React.FC = () => {
  const [summary, setSummary] = useState<{ totalRequests: number; approvedRequests: number; rejectedRequests: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get('/api/reviewrequest/summary');
        setSummary(response.data);
      } catch (error) {
        setError('Failed to fetch review request summary');
        console.error('Error fetching review request summary:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Review Request Summary
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : summary ? (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <HoverCard>
              <CardContent style={{ backgroundColor: getRandomColor() }}>
                <Typography variant="h6">Total Requests</Typography>
                <Typography variant="h4">{summary.totalRequests}</Typography>
              </CardContent>
            </HoverCard>
          </Grid>
          <Grid item xs={12} sm={4}>
            <HoverCard>
              <CardContent style={{ backgroundColor: getRandomColor() }}>
                <Typography variant="h6">Approved Requests</Typography>
                <Typography variant="h4">{summary.approvedRequests}</Typography>
              </CardContent>
            </HoverCard>
          </Grid>
          <Grid item xs={12} sm={4}>
            <HoverCard>
              <CardContent style={{ backgroundColor: getRandomColor() }}>
                <Typography variant="h6">Rejected Requests</Typography>
                <Typography variant="h4">{summary.rejectedRequests}</Typography>
              </CardContent>
            </HoverCard>
          </Grid>
        </Grid>
      ) : (
        <Typography>No summary available</Typography>
      )}
      {error && (
        <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
          <Alert onClose={() => setError(null)} severity="error">
            {error}
          </Alert>
        </Snackbar>
      )}
    </Container>
  );
};

export default ReviewRequestSummary;
