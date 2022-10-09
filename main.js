status= "";
inputval= "";
array= [];
synth= window.speechSynthesis;

function setup() {
    canvas= createCanvas(370, 300);
    canvas.center();
    video= createCapture(VIDEO);
    video.hide();
}

function starty() {
    objdect= ml5.objectDetector("cocossd", modlod);
    document.getElementById("stat").innerHTML= "Status- Detecting Object";
    inputval= document.getElementById("yeet");
}

function modlod() {
    console.log("mod loded!");
    status= true;
}

function gotres(error, results) {
    if(error) {
        console.log(error);
    }
    console.log(results);
    array= results;
}

function draw() {
    image(video, 0, 0, 370, 300);
    if(status == true) {
        for(i = 0; i < array.length; i++) {
            per= floor(array[i].confidence * 100);
            fill("skyblue");
            text(array[i].label + " " + per + "%", array[i].x + 10, array[i].y + 10);
            noFill();
            stroke("lightblue");
            rect(array[i].x, array[i].y, array[i].width, array[i].height);
            if(array[i].label == inputval) {
                video.stop();
                objdect.detect(gotres);
                document.getElementById("stat").innerHTML= "Status- " + inputval + " Found!";
                utterThis= SpeechSynthesisUtterance("Object Found");
                synth.speak(utterThis);
            }
            else {
                document.getElementById("stat").innerHTML= "Status- " + inputval + " Not Found :(";
            }
        }
    }
}