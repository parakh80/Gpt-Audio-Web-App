const express = require('express');
const app = express();
const path = require('path');

// Serve static files
app.use(express.static('public'));

const GPTresponce = require('./text-to-gpt');
const getSpeech = require('./gpt-to-speech');


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});






app.use(express.json());

// Handle POST request to '/spokenwords' endpoint
app.post('/spokenwords', async (req, res) => {

  const spokenWords = req.body.spokenWords;

  console.log('Spoken words received:', spokenWords);

  let answer = await GPTresponce(spokenWords);
  answer = answer.replace(/\n/g, ' ');
  console.log("answer: ",answer)

  const response = await getSpeech(answer);

  res.send(response);
});


app.listen(3000, () => {
  console.log('listening on port:3000');
});


