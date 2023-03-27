// Define function to train a linear regression model with NLP vectors and click counts as inputs
// function trainLinearRegressionModel(trainData) {

//   // Initialize weights and bias to zero
//   let weights = new Array(trainData.length).fill(0);
//   let bias = 0;

//   // Set learning rate and number of iterations
//   const learningRate = 0.0001;
//   const numIterations = 3;

//   // Perform gradient descent
//   for (let i = 0; i < numIterations; i++) {
//     let predictions = [];

//     // Compute predictions for each data point
//     for (let j = 0; j < trainData.length; j++) {
//       let prediction = 0;
//       for (let k = 0; k < trainData[j].vectors.length; k++) {
//         prediction += trainData[j].vectors[k] * weights[j];
//       }
//       prediction += bias;
//       // console.log(prediction)
//       predictions.push(prediction);
//     }
//     // console.log(predictions)
//     // Compute errors and update weights and bias
//     let errors = [];
//     for (let j = 0; j < trainData.length; j++) {
//       errors.push(predictions[j] - trainData[j].clicks);
//     }

//     for (let j = 0; j < weights.length; j++) {
//       let gradient = 0;
//       for (let k = 0; k < trainData.length; k++) {
//         gradient += trainData[k].vectors[j] * errors[k];
//       }
//       weights[j] -= learningRate * gradient;
//     }

//     let biasGradient = 0;
//     for (let j = 0; j < trainData.length; j++) {
//       biasGradient += errors[j];
//     }
//     bias -= learningRate * biasGradient;
//   }

//   // Return the trained weights and bias
//   return { weights: weights, bias: bias };
// }

function trainLinearRegressionModel(trainData) {

  // Initialize weights and bias to zero
  let weights = new Array(trainData[0].vectors.length).fill(0);
  let bias = 0;

  // Set learning rate, regularization strength and number of iterations
  const learningRate = 0.07;
  const regularizationStrength = 0.1;
  const numIterations = 2;

  // Perform gradient descent
  for (let i = 0; i < numIterations; i++) {
    let predictions = [];

    // Compute predictions for each data point
    for (let j = 0; j < trainData.length; j++) {
      let prediction = 0;
      for (let k = 0; k < trainData[j].vectors.length; k++) {
        prediction += trainData[j].vectors[k] * weights[k];
      }
      prediction += bias;
      predictions.push(prediction);
    }

    // Compute errors and update weights and bias
    let errors = [];
    for (let j = 0; j < trainData.length; j++) {
      errors.push(predictions[j] - trainData[j].clicks);
    }

    let weightUpdates = new Array(weights.length).fill(0);
    for (let j = 0; j < weights.length; j++) {
      let gradient = 0;
      for (let k = 0; k < trainData.length; k++) {
        gradient += trainData[k].vectors[j] * errors[k];
      }
      weightUpdates[j] = -learningRate * gradient + regularizationStrength * weights[j];
    }
    weights = weights.map((w, j) => w + weightUpdates[j]);

    let biasGradient = 0;
    for (let j = 0; j < trainData.length; j++) {
      biasGradient += errors[j];
    }
    bias -= learningRate * biasGradient;
  }

  // Return the trained weights and bias
  return { weights: weights, bias: bias };
}




// Add event listener for incoming messages
self.addEventListener("message", event=> {
  trainData = event.data[0];

  console.log(trainData);
  // Train the linear regression model
  const model = trainLinearRegressionModel(trainData);
  
  // Send the trained model back to the main thread
  self.postMessage(model);
});
