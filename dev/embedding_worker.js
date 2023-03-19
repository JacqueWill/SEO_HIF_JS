function tfidf(corpus, term) {
    // Compute the term frequency (TF) and inverse document frequency (IDF) for the given term in each document
    const tfidfScores = corpus.map((doc) => {
        const tf = doc.filter((word) => word === term).length / doc.length;
        const idf = Math.log(corpus.length / corpus.filter((doc) => doc.includes(term)).length);
        return tf * idf;
    });
    // Return the TF-IDF score for the term across all documents
    return tfidfScores.reduce((sum, score) => sum + score, 0) / tfidfScores.length;
}

function tf_idfVectorizer(corpus, searchResultsData){
    searchResultsData.forEach(result =>{
        result.preprocessedResults.forEach(text =>{
            result.vectors.push(tfidf(corpus, text));
        })
    })
    return searchResultsData;
}


self.addEventListener('message', event => {
    const searchResultsData = event.data[0];
    const corpus = event.data[1];
    // Perform preprocessing and vectorization
    const vectorizedData = tf_idfVectorizer(corpus, searchResultsData);
    // Send the vectorized data back to the main script
    self.postMessage(vectorizedData);
    
});
