    document.addEventListener('DOMContentLoaded', () => {
      const voiceInput = document.getElementById('voiceInput');
      const voiceButton = document.getElementById('voiceButton');

      voiceButton.addEventListener('click', () => {
        const recognition = new webkitSpeechRecognition(); // Use the appropriate interface for different browsers
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onresult = (event) => {
          const spokenText = event.results[0][0].transcript;
          voiceInput.value = spokenText;
        };

        recognition.start();
      });

      voiceInput.addEventListener('click', () => {
        voiceInput.removeAttribute('readonly');
      });
    });