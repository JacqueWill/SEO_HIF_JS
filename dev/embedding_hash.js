const maxLength = 400;


function embed_freq(freqMap, searchResultsData){
    searchResultsData.forEach(results =>{
        results.preprocessedResults.forEach(word =>{
            results.vectors.push(freqMap.get(word));
        })
        results.vectors = normalize(results.vectors);
        results.vectors = padding(results.vectors);
    })
    return searchResultsData;
}

function padding(vectors){
    const paddingLength = maxLength - vectors.length;
    return vectors.concat(new Array(paddingLength).fill(0));
}

function normalize(vectors){
    let sumOfSquares = 0;

    for(let i =0; i< vectors.length ; i++){
        sumOfSquares += (vectors[i]*vectors[i]);
    }
    normalizationFactor = Math.sqrt(sumOfSquares);

    for(let i =0; i<vectors.length;i++){
        vectors[i] = vectors[i]/normalizationFactor;
    }
    return vectors
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
