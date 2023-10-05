process.env.GOOGLE_APPLICATION_CREDENTIALS = `${__dirname}/adept-bond-390108-c5cc6a247ee0.json`;

const { TextToSpeechClient } = require('@google-cloud/text-to-speech');

const convertTextToSpeech = async (text) => {
  // Creates a client
  const client = new TextToSpeechClient();

  // Construct the request
  const request = {
    input: { text: text },
    voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
    audioConfig: { audioEncoding: 'MP3' },
  };

  try {
    // Perform the text-to-speech request
    const [response] = await client.synthesizeSpeech(request);
    const audioContent = response.audioContent;
    return audioContent;
  } catch (error) {
    console.error('Error:', error);
  }
}



module.exports = convertTextToSpeech;