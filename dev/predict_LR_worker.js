// Define function to compute cosine similarity between two vectors
function predictSimilarityScore(weights, bias, vector, avgScore) {
  let prediction = 0;
  let totalSimilarity = 0;
  for (let i = 0; i < weights.length; i++){
    for (let j = 0; j < vector.length; j++) {
      prediction += vector[j] * weights[i];
      totalSimilarity += Math.abs(vector[j] - weights[i]);
    }
  }
  prediction += bias;
  let similarityPercentage = 100 - (prediction / (weights.length * 2)/avgScore) * 100; // Get similarity percentage

  return similarityPercentage;
}
  
function predictTrainingScore(weights, bias, trainData) {
  let totalScore = 0;
  for(let i = 0; i < trainData.length; i++){
    vector = trainData[i].vectors;
    let prediction = 0;
    let totalSimilarity = 0;
    let avgScore = 0;
    for (let i = 0; i < weights.length; i++){
      for (let j = 0; j < vector.length; j++) {
        prediction += vector[j] * weights[i];
        totalSimilarity += Math.abs(vector[j] - weights[i]);
      }
    }
    prediction += bias;
    
    let similarityPercentage = 100 - (prediction / (weights.length * 2)) * 100;
    totalScore += similarityPercentage
  }
  result = Math.abs(totalScore/trainData.length)
  return result;
}

// function predictSimilarityScore(weights, bias, vector) {
//   let dotProduct = 0;
//   let vectorMagnitude = 0;
//   let weightsMagnitude = 0;

//   for (let i = 0; i < weights.length; i++) {
//     dotProduct += weights[i] * vector[i];
//     vectorMagnitude += vector[i] ** 2;
//     weightsMagnitude += weights[i] ** 2;
//   }

//   vectorMagnitude = bias + Math.sqrt(vectorMagnitude);
//   weightsMagnitude = Math.sqrt(weightsMagnitude);
//   // console.log("vector Magnitude - ",vectorMagnitude, "weights Magnitude - ", weightsMagnitude, " dot product - ", dotProduct)
//   const cosineSimilarity = dotProduct / (vectorMagnitude * weightsMagnitude);

//   return cosineSimilarity * 10000;
// }

// function predictSimilarityScore(weights, bias, vector) {
//   let prediction = 0;
//   let similarity = 0;
  
//   for (let i = 0; i < weights.length; i++){
//     similarity += Math.abs(vector[i] - weights[i]);
//     prediction += vector[i] * weights[i];
//   }
  
//   similarity = ((weights.length - similarity) / weights.length) * 100;
//   prediction += bias;
  
//   return {score: similarity, prediction: prediction};
// }

// Add event listener for incoming messages
self.addEventListener("message", function (event) {
  model = event.data[0];
  testData = event.data[1];
  trainData = event.data[2];
  let avgScore = 0;
  // Compute cosine similarity scores between test vector and all vectors in the corpus
  avgScore = predictTrainingScore(model.weights, model.bias, trainData);

  testData = testData.map(obj =>{
      obj.score = predictSimilarityScore(model.weights, model.bias, obj.vectors,avgScore);
      return obj;
    })


  testData = testData.sort((a, b) => b.score - a.score);

  // Send the similarity scores back to the main thread
  self.postMessage(testData);
});
