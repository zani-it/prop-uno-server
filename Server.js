const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

// Enable CORS
app.use(cors());

// Parse incoming request bodies in a middleware before your handlers
app.use(bodyParser.json());

// Define a route to handle the Face++ API request
app.post("/detect", (req, res) => {
  const {
    api_key,
    api_secret,
    file_base64,
    detection_flags,
    set_person_id,
    recognize_targets,
    original_filename,
  } = req.body;

  axios
    .post("www.betafaceapi.com/v2/media", {
      api_key,
      api_secret,
      file_base64,
      detection_flags,
      set_person_id,
      recognize_targets,
      original_filename,
    })
    .then((response) => {
      res.json(response.data);
      console.log(response.data);
    })
    .catch((error) => {
      res.status(500).send("Error processing Face++ API request");
    });
});

// Start the server
app.listen(3001, () => {
  console.log("Server started on port 3001");
});
