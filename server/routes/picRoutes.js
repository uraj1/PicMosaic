import express from 'express';
import * as dotenv from 'dotenv';
import OpenAIApi from "openai";

dotenv.config();

const router = express.Router();

const openai = new OpenAIApi({
    apiKey: process.env.OPENAI_API_KEY
})

router.route('/').get((req, res) => {
    res.status(200).json({ message: 'Hello from DALL-E!' });
  });
  
  router.route('/').post(async (req, res) => {
    try {
      const { prompt } = req.body;
  
      const aiResponse = await openai.images.generate({
        prompt,
        n: 1,
        size: '1024x1024',
        response_format: 'b64_json',
      });
      
      const image = aiResponse.data[0].b64_json;

      res.status(200).json({ photo: image });
    }  catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.error && error.response.data.error.message) {
        res.status(500).json({ error: error.response.data.error.message });
      } else {
        res.status(500).json({ error: 'Something went wrong' });
      }
    }
  });

export default router;