const maxLength = 400;


function embed_freq(freqMap, searchResultsData){
    searchResultsData.forEach(results =>{
        results.preprocessedResults.forEach(word =>{
            results.vectors.push(freqMap.get(word));
        })
        results.vectors = padding(results.vectors);
    })
    return searchResultsData;
}

function padding(vectors){
    const paddingLength = maxLength - vectors.length;
    return vectors.concat(new Array(paddingLength).fill(0));
}

self.addEventListener('message', event => {
    const searchResultsData = event.data[1];
    const freqMap = event.data[0];
    // Perform preprocessing and vectorization
    const vectorizedData = embed_freq(freqMap, searchResultsData);
    // Send the vectorized data back to the main script
    // console.log(vectorizedData);
    self.postMessage(vectorizedData);
});
