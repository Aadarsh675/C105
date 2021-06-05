Webcam.set({
    width: 300,
    height: 300,
    image_format: "png",
    png_quality: 90
});
//code for triggering the camera
Webcam.attach("camera")
//code for taking snapshot
function capture() {
    Webcam.snap(
        function (img) {//img stores the picture taken by webcam.snap
            document.getElementById("snapshot").innerHTML = `<img id="picture" src=${img}>`
        }
    )
}
//check ml5 version in the console
console.log("ml5.version = " + ml5.version)
//import the model in variable classifier
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/epbJj_Rqh/model.json", modelLoader)//image classifier is a predefined function of ml5 which triggers image identification
//code for checking whether the model has loaded or not with the help of function modelLoader
function modelLoader(){
    console.log("Your model has loaded successfully.");
}

function identify() {
    //Get the captured image and store it in a variable
    snap = document.getElementById("picture");
    //Classify is a predifined function of ml5 used to compare the captured image with the model and get the results
    classifier.classify(snap, getResults);
}

function getResults(error, results) {
    if (error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("object").innerHTML = results[0].label;
        document.getElementById("accuracy").innerHTML = (results[0].confidence.toFixed(4)) * 100 + "%";
    }
}
