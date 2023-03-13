// Declare and initialize constants
const apiKey = "dc46558a883b422497f8e35b4098f5da";
const searchForm = document.querySelector('#search-form');
const searchResults = document.querySelector('#search-results');
const pagination = document.querySelector('#pagination');
const prevPageButton = document.querySelector('#prev-page');
const nextPageButton = document.querySelector('#next-page');
const pageNumber = document.querySelector('#page-number');
const totalPageCount = document.querySelector('#total-pages');

// Declare and initialize variables
let currentPage = 1;
let totalResults = 0;
let totalPages = 0;
let currentOffset = 0;
let searchResultsData = [];
let resultsToDisplay = [];
let newSearchResultsData =[];
let previousTotalResults = 0;
let clickedUrls = [];
let stopwords = ['i','me','my','myself','we','our','ours','ourselves','you','your','yours','yourself','yourselves','he','him','his','himself','she','her','hers','herself','it','its','itself','they','them','their','theirs','themselves','what','which','who','whom','this','that','these','those','am','is','are','was','were','be','been','being','have','has','had','having','do','does','did','doing','a','an','the','and','but','if','or','because','as','until','while','of','at','by','for','with','about','against','between','into','through','during','before','after','above','below','to','from','up','down','in','out','on','off','over','under','again','further','then','once','here','there','when','where','why','how','all','any','both','each','few','more','most','other','some','such','no','nor','not','only','own','same','so','than','too','very','s','t','can','will','just','don','should','now'];
let corpus = [];
let trainData = [];
let testData = [];

// Event listener for search form submit
searchForm.addEventListener('submit', event => {
  // location.reload(true);
  event.preventDefault();
  const searchTerm = searchForm.elements['search-term'].value;
  currentOffset = 0;
  currentPage = 1;
  searchBingApi(searchTerm);
});

// Function to search Bing API
function searchBingApi(searchTerm) {

  // Construct API URL with search term and offset
  const apiUrl = `https://api.bing.microsoft.com/v7.0/search?q=${encodeURIComponent(searchTerm)}&count=50&offset=${previousTotalResults}`;

  // Fetch data from API
  fetch(apiUrl, {
    headers: {
      "Ocp-Apim-Subscription-Key": apiKey
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    // Get total number of search results and concatenate with existing search results
    totalResults = Object.keys(data.webPages.value).length;

    previousTotalResults = previousTotalResults + totalResults;
    newSearchResultsData = data.webPages.value;
    searchResultsData = searchResultsData.concat(newSearchResultsData);

    // //Test --------------------------------------------------------
   
    //Test end ----------------------------------------------------

    if(previousTotalResults>=50){
      // Display search results for first page
      displaySearchResults();
      // Update pagination
      updatePagination();
      
      // setTimeout(() => {console.log("Delayed for 0.01 second.");}, "10");
      preprocessing(searchResultsData);
      tf_idfVectorizer(corpus, searchResultsData);
    }else{
      // setTimeout(() => {console.log("Delayed for 0.5 second.");}, "501");
      searchBingApi(searchForm.elements['search-term'].value);
    }

    //Test ----------------------------------------------------------

    // totalResults = Object.keys(searchResultsData).length;

    // displaySearchResults();
    // // Update pagination
    // updatePagination();
    
    // // setTimeout(() => {console.log("Delayed for 0.01 second.");}, "10");
    // preprocessing(searchResultsData);
    // tf_idfVectorizer(corpus, searchResultsData);

    //Test end -------------------------------------------------------

    console.log("Results acquired, Number of results - ",totalResults);
    // Calculate total pages
    totalResults = Object.keys(searchResultsData).length;
    totalPages = Math.ceil(totalResults / 10);
  })
  .catch(error => {
    console.error(error);
  });
}

// Event listener for previous page button
prevPageButton.addEventListener('click', () => {
  currentOffset -= 10;
  currentPage--;
  displaySearchResults();
  updatePagination();
});

// Event listener for next page button
nextPageButton.addEventListener('click', () => {
  currentOffset += 10;
  currentPage++;

  // If nothing is clicked
  if(Object.keys(trainData).length == 0){
    console.log("No Clicks recorded")
    displaySearchResults();
    updatePagination();
  }else{
    console.log("Updating ranks")
    // Retrain your model and rerank the results
    displaySearchResults();
    updatePagination();

    // Compute similarity scores for test data
    for (let i = 0; i < testData.length; i++) {
    testData[i].score = linearRegression(trainData);
    }
    // Sort test data based on similarity scores
    testData.sort((a, b) => b.score - a.score);

  }
});

// Function to display search results for current page
function displaySearchResults() {
  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 10;
  // If no results are clicked
  if(Object.keys(trainData).length == 0){
    console.log("No clicks recorded for display")
    resultsToDisplay = searchResultsData.slice(startIndex, endIndex);
  }else{
    console.log("Fetching new ranked results")
    resultsToDisplay = testData.slice(0,10);
  }
  testData = searchResultsData.slice(endIndex,);

  let html = '';
  resultsToDisplay.forEach(result => {
    html += `
      <article>
        <h2><a href="${result.url}" target ="_blank">${result.name}</a></h2>
        <p>${result.snippet}</p>
      </article>
    `;
  });
  searchResults.innerHTML = html;
  console.log("Search Results slice displayed for page",currentPage)

  // Count clicks on hyperlinks
  const hyperlinks = document.querySelectorAll('#search-results a');
  hyperlinks.forEach(hyperlink => {
    hyperlink.addEventListener('click', () => {
      const clickedUrl = hyperlink.href;

      // Adding number of clicks to the data
      searchResultsData = searchResultsData.map(obj =>{
        if(obj.url == clickedUrl){
          obj.clicks++;
          trainData.push(obj);
          console.log('Click acknowledged',clickedUrl);
        }
        return obj;
      })
    });
  });
}

// Function to update pagination and navigation
function updatePagination() {
  pageNumber.textContent = currentPage;
  totalPageCount.textContent = totalPages;

  if (currentPage === 1) {
    prevPageButton.disabled = true;
  } else {
    prevPageButton.disabled = false;
  }

  if (currentPage === totalPages) {
    nextPageButton.disabled = true;
  } else {
    nextPageButton.disabled = false;
  }
  console.log("Pagination Updated for page",currentPage)
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

function preprocessing(searchResultsData) {
  searchResultsData.forEach(result =>{
    preprocessedResult = clearText(result.snippet);
    preprocessedResult = removeStopwords(preprocessedResult);
    preprocessedResult = tokenizer(preprocessedResult);
    result.preprocessedResults = preprocessedResult
    result.vectors = [];
    result.clicks = 0;
    corpus.push(preprocessedResult);
  })
  
  console.log("Preprocessed text snippets");
}

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
}

function cosineSimilarity(v1, v2) {
  let dotProduct = 0;
  let v1Magnitude = 0;
  let v2Magnitude = 0;
  
  for (let i = 0; i < v1.length; i++) {
    dotProduct += v1[i] * v2[i];
    v1Magnitude += v1[i] * v1[i];
    v2Magnitude += v2[i] * v2[i];
  }
  
  v1Magnitude = Math.sqrt(v1Magnitude);
  v2Magnitude = Math.sqrt(v2Magnitude);
  
  return dotProduct / (v1Magnitude * v2Magnitude);
}


// Define a function for computing linear regression
function linearRegression(trainData) {
  let xSum = 0;
  let ySum = 0;
  let xySum = 0;
  let xSquareSum = 0;
  let n = trainData.length;
  
  for (let i = 0; i < n; i++) {
    xSum += trainData[i].clicks;
    ySum += cosineSimilarity(trainData[i].vectors, testData[0].vectors);
    xySum += trainData[i].clicks * cosineSimilarity(trainData[i].vectors, testData[0].vectors);
    xSquareSum += trainData[i].clicks * trainData[i].clicks;
  }
  
  let slope = (n * xySum - xSum * ySum) / (n * xSquareSum - xSum * xSum);
  let intercept = (ySum - slope * xSum) / n;
  
  return slope * testData[0].clicks + intercept;
}





