    // document.addEventListener('DOMContentLoaded', () => {
    //   const voiceInput = document.getElementById('voiceInput');
    //   const voiceButton = document.getElementById('voiceButton');


    //   voiceInput.addEventListener('click', () => {
    //     voiceInput.removeAttribute('readonly');
    //   });
    // });

    var ignore_onend;
    var recognizing = false;

    var final_transcript = '';


    var first_char = /\S/;
function capitalize(s) {
  return s.replace(first_char, function(m) { return m.toUpperCase(); });
}


    const startButton=()=>{
            const recognition = new webkitSpeechRecognition(); // Use the appropriate interface for different browsers

            // console.log("inside the browser")
            recognition.continuous = true;
            recognition.interimResults = true;
    
            recognition.onresult = (event) => {
            // console.log(event)
            //   const spokenText = event.results[0][0].transcript;
             

              var interim_transcript = '';
              for (var i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                  final_transcript += event.results[i][0].transcript;
                } else {
                  interim_transcript += event.results[i][0].transcript;
                }
              }
              final_transcript = capitalize(final_transcript);
              voiceInput.value = final_transcript;
  



            };
    
            if (recognizing) {
                recognition.stop();
                // console.log("stoping the recording")
                start_img.src = 'mic.gif';
                return;
              }

            recognition.start();

            recognition.onstart = function() {
                recognizing = true;
                console.log("starting")
                start_img.src = 'mic-animate.gif';
              };

              recognition.onerror = function(event) {
                if (event.error == 'no-speech') {
                  start_img.src = 'mic.gif';
                  console.log("error")    
                  ignore_onend = true;
                }
                if (event.error == 'audio-capture') {
                  start_img.src = 'mic.gif';
                 console.log("audio capture error")
                  ignore_onend = true;
                }
                if (event.error == 'not-allowed') {
                  if (event.timeStamp - start_timestamp < 100) {
                    // console.log("info blocked")
                  } else {
                    
                  }
                  ignore_onend = true;
                }
              };

              recognition.onend = function() {
                // console.log("in recognition on end")
                recognizing = false;
                if (ignore_onend) {
                  return;
                }
                start_img.src = 'mic.gif';


              };

    }

  
    if (!('webkitSpeechRecognition' in window)) {

        console.log("this browser doesnot support chrome voice input")
      } 

      else{

        var recognition = new webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onstart = function() {
            recognizing = true;
            showInfo('info_speak_now');
            start_img.src = 'mic-animate.gif';
          };



          recognition.onerror = function(event) {
            if (event.error == 'no-speech') {
              start_img.src = 'mic.gif';
            //   console.log("error")    
              ignore_onend = true;
            }
            if (event.error == 'audio-capture') {
              start_img.src = 'mic.gif';
            //  console.log("audio capture error")
              ignore_onend = true;
            }
            if (event.error == 'not-allowed') {
              if (event.timeStamp - start_timestamp < 100) {
                // console.log("info blocked")
              } else {
                
              }
              ignore_onend = true;
            }
          };


          recognition.onend = function() {
            recognizing = false;
            if (ignore_onend) {
              return;
            }
            start_img.src = 'mic.gif';
            if (!final_transcript) {
              showInfo('info_start');
              return;
            }
            showInfo('');
            if (window.getSelection) {
              window.getSelection().removeAllRanges();
              var range = document.createRange();
              range.selectNode(document.getElementById('final_span'));
              window.getSelection().addRange(range);
            }
            if (create_email) {
              create_email = false;
              createEmail();
            }
          };
        
          recognition.onresult = (event) => {
            const spokenText = event.results[0][0].transcript;
            voiceInput.value = spokenText;
          };
  
      }