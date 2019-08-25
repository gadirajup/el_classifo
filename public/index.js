const imgEl = document.getElementById('img');
var shouldClassify = imgEl.src.includes("uploads");

let classifier;
let img;

function preload() {
  classifier = ml5.imageClassifier('MobileNet');
  
  if (shouldClassify) {
    img = loadImage(imgEl.src);
  }
}

function setup() {
  const imgEl = document.getElementById('img');
  
  if (shouldClassify) {
    classifier.classify(img, gotResult);
  }
}

async function gotResult(error, results) {
    if (error) {
      console.error(error);
    } else {
      console.log(results);
      var prediction = document.createElement("h1");
      prediction.innerHTML = "It's a " + results[0].label;       
      var objTo = document.getElementById('container');            
      objTo.appendChild(prediction);  
    }
}