var ignore_onend;
var recognizing = false;

var final_transcript = '';
browser=''


        var first_char = /\S/;
    function capitalize(s) {
    return s.replace(first_char, function(m) { return m.toUpperCase(); });
    }

if (!('webkitSpeechRecognition' in window)) {
    browser="chrome browser not supported"
    console.log("chrome browser not supported")

    console.log("this browser doesnot support chrome voice input")
} 

else if ('SpeechRecognition' in window) {
    // Firefox
    recognition = new SpeechRecognition();

    browser="firefox"
    console.log("firefox")


}

else{

    var recognition = new webkitSpeechRecognition();
    browser="chrome browser"
    console.log("chrome browser support")

}


const startButton=()=>{
        
    if(recognition){
        console.log(browser)

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
    else{
        console.log("voice input not supported")
    }

}

    


function confirmText() {
    console.log("in confirm text");
    console.log(final_transcript);

    // Get the current content of the .confirmedText element
    var currentContent = document.querySelector(".confirmedText").innerHTML;

    var voiceInputText = document.querySelector("#voiceInput").value

    if(voiceInputText==''){
        console.log("no voice input")
        return;
    }
    document.querySelector("#voiceInput").value=''
    

    // Check if .confirmedText already has content
    if (currentContent.length > 0) {
        // If it does, prepend a line break or new div before the new content
        document.querySelector(".confirmedText").innerHTML += "<br><div>" + voiceInputText + "</div>";
    } else {
        // If it's empty, just set the new content
        document.querySelector(".confirmedText").innerHTML = "<div>" + voiceInputText + "</div>";
    }
}




