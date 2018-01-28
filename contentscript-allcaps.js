//begin amy's code
// this is a method that takes in an acronym in the form of a string, and returns
// as output a randomly generated series of words the acronym stands for


//var html = getPageHTML();
//document.write(html);

/*// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
  // Great success! All the File APIs are supported.
} else {
  alert('The File APIs are not fully supported in this browser.');
}*/

var elements = document.getElementsByTagName('p');
var allText = "";

var acronym = "FBI";

for(var i = 0; i < elements.length; i++) {
    var element = elements[i];
    allText += (element.textContent).toLowerCase();
}

//console.log(allText);

var associativeArray = {};
populate();

//console.log(acronym + "stands for" + getText(acronym.toLowerCase()));

function populate() {
    /*var url = "http://anyorigin.com/go?url=" + 
    encodeURIComponent("https://en.wikipedia.org/wiki/Iguana") + "&callback=?";
    */
    /* COME BACK TO THIS var url = "http://www.whateverorigin.org/go?url=" + 
    encodeURIComponent("https://en.wikipedia.org/wiki/Iguana") + "&callback=?";
    $.get(url, 
        function(response) {console.log(response);
        });*/
    //parse webpage to obtain words, 
    //save words in dictionary mapping letter to dynamic list of words 
    associativeArray['H'] = new Array("Help");
    associativeArray['I'] = new Array("Iguanas");

    splitText = allText.split(" ");
    for(var i=0; i<splitText.length; i++) {
        var currentWord = splitText[i];
        var startingChar = currentWord.charAt(0);
        var oldList = associativeArray[startingChar];
        if(Array.isArray(oldList)) {
            //console.log(oldList);
            oldList.push(currentWord);
            //console.log(oldList);
            newList = oldList;
            associativeArray[startingChar] = newList;
        }
        else {
            associativeArray[startingChar] = new Array(currentWord);
        }
    }
}

console.log(associativeArray);

//use letter as key in dictionary to obtain the corresponding value: a list 
//of words that start with that letter. pick a random number from 0 to the 
//length of that list, and then get the value at that index of the list
function getRandomWord(letter) {
    console.log(letter);
    var letterList = associativeArray[letter];
    var index = Math.floor(Math.random()*letterList.length)
    console.log(letterList[index]);
    return letterList[index];
}

function getText(acronym) {
    console.log(acronym);
    var toReturn = ""
    for(var ii=0; ii<acronym.length; ii++) {
        var character = acronym[ii];
        var randomWord = getRandomWord(acronym.charAt(ii));
        var stripped = randomWord.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
        var toAdd = stripped.charAt(0).toUpperCase() + stripped.slice(1);
        //console.log(toAdd);
        toReturn = toReturn + " " + toAdd;
    }
    return toReturn;
    //return "test";
}



//begin kristy's code
//console.log("started script");
var elements = document.getElementsByTagName('*');
//var elements = document.getElementsByTagName('p');
//console.log(elements);

// var text = "";

// for(var i = 0; i < elements.length; i++) {
//     var element = elements[i];
//     text += (element.textContent).toLowerCase();
// }

for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    //var element = elements;
    //console.log(element);
    //console.log(element.childNodes.length);

    for (var j = 0; j < element.childNodes.length; j++) {
        var node = element.childNodes[j];
        //console.log(node);

        if (node.nodeType === 3) {
            var text = node.textContent;
            console.log(text);
            var bigArray = text.split(" ");
            if (bigArray.length > 1)
            {
                for (var littleWord = 0; littleWord < bigArray.length; littleWord++)
                {
                    var word = bigArray[littleWord];
                    console.log(word);
                    var upperWord = word.toUpperCase();
                    if (word.length > 1 && word.match(/[a-z]/i) && upperWord === word)
                    {
                        var fakeAcronym = getText(word.toLowerCase()) + " ";
                        //var fakeAcronym = "test";1
                        console.log(fakeAcronym);

                        var newWord = word + " (" + fakeAcronym + ") ";

                        var replacedText = text.replace(word, "test");
                        //var replacedText = text.replace(OGwords, "test");

                        if (replacedText !== text)
                        {
                            //element.replaceChild(document.createTextNode(replacedText), node);
                        }
                    }
                }
            }
        }
    }
}