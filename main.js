img = "";
status = "";
object = [];

function preload(){
    img = loadImage("dog_cat.jpg");
}

function setup(){
    canvas = createCanvas(600,400);
    canvas.center();
    objectDetector = ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Object";
}

function modelLoaded(){
    console.log("model is ready");
    status = true;
    objectDetector.detect(img, gotResults);
}

function gotResults(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        object = results;
    }

}

function draw(){
    image(img,0,0,600,400);

    if(status != ""){
        for(i = 0;i < object.length;i=i+1){
            document.getElementById("status").innerHTML = "Status: Object Detected";
            percent = floor(object[i].confidence * 100);
            fill("#ff0000");
            text(object[i].label + " " + percent + "%",object[i].x + 15,object[i].y + 15)
            noFill();
            stroke("#ff0000");
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
        }

    }

   
   /* fill("#ff0000"); 
    noFill();
    stroke("#ff0000");
    rect(40,40,275,350);
    rect(280,80,250,275);
    textSize(20);
    text("dog",50,60);
    text("cat",285,100); 
    */
}