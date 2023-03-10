let stopwords = ['i','me','my','myself','we','our','ours','ourselves','you','your','yours','yourself','yourselves','he','him','his','himself','she','her','hers','herself','it','its','itself','they','them','their','theirs','themselves','what','which','who','whom','this','that','these','those','am','is','are','was','were','be','been','being','have','has','had','having','do','does','did','doing','a','an','the','and','but','if','or','because','as','until','while','of','at','by','for','with','about','against','between','into','through','during','before','after','above','below','to','from','up','down','in','out','on','off','over','under','again','further','then','once','here','there','when','where','why','how','all','any','both','each','few','more','most','other','some','such','no','nor','not','only','own','same','so','than','too','very','s','t','can','will','just','don','should','now'];
let corpus = [];
const maxLength = 250;

function removeDuplicates(searchResultsData){
    const uniqueItems = searchResultsData.filter((item, index) => {
        return index === searchResultsData.findIndex(obj => {
          return obj.url === item.url;
        });
      });

    return uniqueItems;
}

function clearText(text) {
    return text
      .toLowerCase()
      .replace(/[^A-Za-zА-Яа-яЁёЇїІіҐґЄє0-9\-]|\s]/g, " ")
      .replace(/\s{2,}/g, " ");
}
  
function removeStopwords(text){
    res = []
    words = text.split(' ')
    for(let i=0;i<words.length;i++) {
        word_clean = words[i].split(".").join("")
        if(!stopwords.includes(word_clean)) {
            res.push(word_clean)
        }
    }
    return(res.join(' '))
}
  
function tokenizer(text){
    return text.split(/\W+/);
}

function padding(preprocessedResult){
    const paddingLength = maxLength - preprocessedResult.length;
    return preprocessedResult.concat(new Array(paddingLength).fill(0));
}
  
function preprocessing(searchResultsData) {

    searchResultsData = removeDuplicates(searchResultsData);

    searchResultsData.forEach(result =>{
        preprocessedResult = clearText(result.snippet);
        preprocessedResult = removeStopwords(preprocessedResult);
        preprocessedResult = tokenizer(preprocessedResult);
        preprocessedResult = padding(preprocessedResult);
        result.preprocessedResults = preprocessedResult;
        result.vectors = [];
        result.clicks = 0;
        corpus.push(preprocessedResult);
    })
    // console.log("Preprocessed text snippets");
    return searchResultsData;
}
  
self.addEventListener('message', event => {
    const searchResultsData = event.data;
    // Perform preprocessing and vectorization
    const preprocessedData = preprocessing(searchResultsData);
    // const vectorizedData = tf_idfVectorizer(corpus, preprocessedData);
    // Send the vectorized data back to the main script
    self.postMessage([preprocessedData,corpus]);

});