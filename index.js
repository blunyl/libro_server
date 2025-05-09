require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8000;
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

app.use(cors());
app.use(express.json());

// 도서관 API
app.get('/api/libraries', async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const apiKey = process.env.API_KEY;
    const totPage = 1;
    const libNum = 206;
    const pageSize = 6;

    const apiUrl = `http://openapi.seoul.go.kr:8088/${apiKey}/json/SeoulPublicLibraryInfo/${totPage}/${libNum}/`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    res.json(data);
  } catch (err) {
    console.error('도서관 API 호출 실패:', err.message);
    res.status(500).json({ error: '서울시 도서관 API 요청 실패' });
  }
});

app.listen(PORT, () => {
  console.log(`libro_server is running`);
});
