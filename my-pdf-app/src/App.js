import React, { useState } from 'react';
import axios from 'axios';
import { CssBaseline, Container, Typography, TextField, Button, Paper, Box } from '@mui/material';
import { FileUpload } from '@mui/icons-material';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [query, setQuery] = useState('');
  const [result, setResult] = useState('');

  // Handles file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Handles query input change
  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  // Handles form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile || !query) {
      alert('Please select a file and enter a query.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('query', query);

    try {
      const response = await axios.post(`http://127.0.0.1:5000/ask_pdf`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setResult(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('An error occurred while processing your request.');
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Paper elevation={3} sx={{ mt: 4, p: 2 }}>
        <Typography variant="h4" gutterBottom>
          PDF Query Tool
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <input
            accept="application/pdf"
            style={{ display: 'none' }}
            id="raised-button-file"
            multiple
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="raised-button-file">
            <Button variant="contained" component="span" startIcon={<FileUpload />}>
              Upload PDF
            </Button>
          </label>
          <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
            {selectedFile ? selectedFile.name : "No file chosen"}
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="query"
            label="Query"
            name="query"
            autoComplete="query"
            autoFocus
            value={query}
            onChange={handleQueryChange}
            variant="outlined"
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Submit
          </Button>
        </Box>
        {result && (
          <Box sx={{ mt: 3, p: 2, backgroundColor: '#fafafa' }}>
            <Typography variant="h6" gutterBottom>
              Result:
            </Typography>
            <Typography variant="body1">{result}</Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
}

export default App;
