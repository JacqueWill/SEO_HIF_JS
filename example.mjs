import natural from 'natural';
const stemmer = new natural.PorterStemmer();
const stemmedWord = stemmer.stem('jumping');
console.log(stemmedWord); // prints 'jump'