// pages/api/summarize.js

import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { documentText } = req.body;

  try {
    const response = await axios.post('https://api.gemini.com/summarize', {
      text: documentText,
    }, {
      headers: {
        'Authorization': `Bearer YOUR_GEMINI_API_KEY`,
        'Content-Type': 'application/json',
      },
    });

    const summarizedText = response.data.summary;
    res.status(200).json({ summarizedText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
