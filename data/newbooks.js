require('dotenv').config();

const apiKey = process.env.API_KEY;
const url = `http://openapi.seoul.go.kr:8088/${apiKey}/xml/SeoulLibNewArrivalInfo/1/5/`;

fetch(url)
  .then((response) => response.text())
  .then((data) => {
    console.log(data);
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data, 'application/xml');
    console.log(xmlDoc);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
