prediction1="";
prediction2="";
Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90
});
Webcam.attach("#camera");
function take_snap(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';
    })
}
console.log("ml5 version",ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/7I6EGA-Ab/model.json",modelloaded);
function modelloaded(){
    console.log("model is loaded");
}
function check(){
    img=document.getElementById("captured_image");
    classifier.classify(img,gotresult);
}
function gotresult(error,results){
if(error){
    console.log(error);
}
else{
    console.log(results);
    document.getElementById("result_emotion_name").innerHTML=results[0].label;
    document.getElementById("result_emotion_name2").innerHTML=results[1].label;
    prediction1=results[0].label;
    prediction2=results[1].label;
    speak();
    if( results[0].label=="Happy"){
        document.getElementById("update_emoji").innerHTML="&#128522;";

    }
       if( results[0].label=="Sad"){
        document.getElementById("update_emoji").innerHTML="&#128532;";
        
    }
    if( results[0].label=="Angry"){
        document.getElementById("update_emoji").innerHTML="&#128548;";
        
    }
    if( results[1].label=="Happy"){
        document.getElementById("update_emoji2").innerHTML="&#128522;";

    }
       if( results[1].label=="Sad"){
        document.getElementById("update_emoji2").innerHTML="&#128532;";
        
    }
    if( results[1].label=="Angry"){
        document.getElementById("update_emoji2").innerHTML="&#128548;";
        
    }
    


}
}
function speak(){
    var synth=window.speechSynthesis;
    speakdata1="the first prediction is "+prediction1;
    speakdata2="and the second prediction is "+prediction2;
    utterthis=new SpeechSynthesisUtterance(speakdata1+speakdata2);
    synth.speak(utterthis);
}