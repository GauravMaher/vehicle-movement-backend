const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

// Function to read vehicle data from JSON file
const getVehicleLocationData = () => {
  const dataPath = path.join(__dirname, 'data', 'vehicleData.json');
  

  return new Promise((resolve, reject) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        console.log(err)
        reject('Failed to read file');
      } else {
        try {
          const vehicleData = JSON.parse(data);
          resolve(vehicleData);
        } catch (parseError) {
          reject('Failed to parse JSON');
        }
      }
    });
  });
};

// API to get vehicle location data
app.get('/api/vehicle-location', async (req, res) => {
  try {
    const vehicleData = await getVehicleLocationData();  // Fetch vehicle data
    res.json(vehicleData);
  } catch (error) {
    console.error("Error fetching vehicle data:", error);
    res.status(500).json({ error: 'Failed to load data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//extra
