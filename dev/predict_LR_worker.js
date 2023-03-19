// Define function to compute cosine similarity between two vectors
function predictSimilarityScore(weights, bias, vector) {
  let prediction = 0;
  for (let i = 0; i < weights.length; i++){
    for (let j = 0; j < vector.length; j++) {
        prediction += vector[i] * weights[i];
        }
  }
  prediction += bias;
  return prediction;
}
  
// Add event listener for incoming messages
self.addEventListener("message", function (event) {
  model = event.data[0];
  testData = event.data[1];

  // console.log(testData)

  // Compute cosine similarity scores between test vector and all vectors in the corpus
  testData = testData.map(obj =>{
      obj.score = predictSimilarityScore(model.weights, model.bias, obj.vectors);
      return obj;
    })


  testData = testData.sort((a, b) => b.score - a.score);

  // Send the similarity scores back to the main thread
  self.postMessage(testData);
});
