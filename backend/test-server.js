import express from 'express';

const app = express();
const PORT = 5001;

app.get('/', (req, res) => {
  res.json({ 
    message: 'Test server is running!',
    port: PORT,
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    server: 'test-server',
    port: PORT
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🧪 Test server running on http://localhost:${PORT}`);
  console.log(`✅ Health check: http://localhost:${PORT}/health`);
});