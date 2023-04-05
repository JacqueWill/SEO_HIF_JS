// Define function to compute prediction given weights and bias
function predict(weights, bias, vector) {
  let prediction = 0;
  for (let i = 0; i < weights.length; i++){
    for (let j = 0; j < vector.length; j++) {
      prediction += vector[j] * weights[i];
    }
  }
  prediction += bias;

  return prediction
}
  

// Add event listener for incoming messages
self.addEventListener("message", function (event) {
  model = event.data[0];
  testData = event.data[1];
  trainData = event.data[2];

  testData = testData.map(obj =>{
      obj.score = predict(model.weights, model.bias, obj.vectors);
      return obj;
    })

  // Compute classification accuracy
  let numCorrect = 0;
  for (let i = 0; i < testData.length; i++) {
    if (testData[i].clicks === testData[i].expected) {
      numCorrect++;
    }
  }
  let classificationAccuracy = numCorrect / testData.length;

  // Send the classification accuracy back to the main thread
  self.postMessage([testData,classificationAccuracy]);
});
