function displayMetrics(pagesVisited, clicks, similarityScore) {
  console.log("Number of pages visited: " + pagesVisited);
  console.log("Number of clicks: " + clicks);
  console.log("Similarity score: " + similarityScore + "%");
}

self.addEventListener("message", event=> {
  pageNumber = event.data[0];
  trainData = event.data[1];
  testData = event.data[2];

  clicks = trainData.length
  displayedResults = testData.slice(0,10);
  let avgSim = 0;
  for(let i =0; i<10; i++){
    avgSim = displayedResults[i].score;
  }
  similarityScore = 100 - (avgSim/10);

  displayMetrics(pageNumber, clicks, similarityScore)
  
  // Send the trained model back to the main thread
  self.postMessage("Metrics Displayed");
});
