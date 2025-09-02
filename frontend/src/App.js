import React, { useState } from 'react';
import { Container, Typography, Tabs, Tab, Box, TextField, Button, Grid, Card, CardContent, Chip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const PREPOSITIONS = [
  { label: 'à', value: 'à' },
  { label: 'de', value: 'de' },
  { label: 'None', value: 'none' }
];

function App() {
  const [mode, setMode] = useState('verb');
  const [search, setSearch] = useState('');
  const [preposition, setPreposition] = useState('à');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);


  const handleModeChange = (event, newValue) => {
    setMode(newValue);
    setResults([]);
    setSearch('');
  };

  const handleSearch = async () => {
    setLoading(true);
    let url = 'https://french-verbs-backend.onrender.com/api/verbs?';
    console.log('Calling service at: ' + url);
    if (mode === 'verb') {
      url += `search=${encodeURIComponent(search)}`;
    } else {
      url += `preposition=${encodeURIComponent(preposition)}`;
    }
    const res = await fetch(url);
    const data = await res.json();
    setResults(data);
    setLoading(false);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom fontWeight={700}>
        French Verb Prepositions
      </Typography>
      <Tabs
        value={mode}
        onChange={handleModeChange}
        centered
        sx={{ mb: 2 }}
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab label="Search by Verb" value="verb" />
        <Tab label="Search by Preposition" value="prep" />
      </Tabs>
      <Box sx={{ mb: 3 }}>
        {mode === 'verb' ? (
          <TextField
            label="Enter a verb"
            variant="outlined"
            fullWidth
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleSearch(); }}
            InputProps={{
              endAdornment: (
                <Button onClick={handleSearch} disabled={!search.trim() || loading}>
                  <SearchIcon />
                </Button>
              )
            }}
          />
        ) : (
          <Box display="flex" gap={2} alignItems="center">
            {PREPOSITIONS.map(p => (
              <Chip
                key={p.value}
                label={p.label}
                color={preposition === p.value ? 'primary' : 'default'}
                onClick={() => setPreposition(p.value)}
                sx={{ fontSize: 18, px: 2, py: 1 }}
              />
            ))}
            <Button
              variant="contained"
              onClick={handleSearch}
              disabled={loading}
              startIcon={<SearchIcon />}
            >
              Search
            </Button>
          </Box>
        )}
      </Box>
      <Box>
        {loading && <Typography align="center">Loading...</Typography>}
        {!loading && results.length === 0 && (
          <Typography align="center" color="text.secondary">
            {mode === 'verb' ? 'Type a verb to search.' : 'Select a preposition and search.'}
          </Typography>
        )}
        <Grid container spacing={2}>
          {results.map((verb, idx) => (
            <Grid item xs={12} key={idx}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" fontWeight={600}>
                    {verb.verb} <Chip label={verb.preposition} size="small" color="primary" sx={{ ml: 1 }} />
                  </Typography>
                  <Typography variant="h7" fontWeight={400}>
                    {verb.translation}
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    {verb.examples.map((ex, i) => (
                      <Typography key={i} variant="body2" color="text.secondary">{ex}</Typography>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default App; 