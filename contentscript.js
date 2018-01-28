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
            var text = node.nodeValue;
            //console.log(text);
            var openParenLoc = text.search(/[(]/);
            if (openParenLoc !== -1)
            {
                //console.log("found open paren");
                var closeParenLoc = text.substring(openParenLoc).search(/[)]/);
                if (closeParenLoc !== -1)
                {
                    //console.log("found close paren");
                    var acronym = text.substring(openParenLoc + 1, openParenLoc + closeParenLoc);
                    if (acronym.search(" ") == -1)
                    {
                        //console.log(acronym.length);
                        var scanner = 1;
                        var nSpaces = 0;
                        var threshold = 20; //max length of last word before it decides that this likely isn't an acronym
                        while (nSpaces < acronym.length)
                        {
                            //console.log(scanner);
                            scanner++;
                            if (text.charAt(openParenLoc - scanner) == ' ' || text.charAt(openParenLoc - scanner) == "-")
                            {
                                nSpaces++;
                                threshold *= 2;
                            }
                            else if (scanner > threshold)
                            {
                                break;
                            }
                        }
                        //console.log("out of while loop");
                        if (nSpaces > 0)
                        {
                            //console.log("check for letter match")
                            var OGwords = text.substring(openParenLoc - scanner + 1, openParenLoc);
                            //console.log(OGwords);
                            var words = OGwords.replace("-", " ")
                            var wordArray = words.split(" ");
                            //console.log(wordArray[0]);
                            var works = true;
                            for (var k = 0; k < wordArray.length; k++)
                            {
                                if (acronym.charAt(k).toLowerCase() !== wordArray[k].charAt(0).toLowerCase())
                                {
                                    works = false;
                                    break;
                                }
                            }
                            if (works)
                            {

                                var fakeAcronym = getText(acronym.toLowerCase()) + " ";
                                //var fakeAcronym = "test";
                                console.log(fakeAcronym);

                                var replacedText = text.replace(OGwords, fakeAcronym);
                                //var replacedText = text.replace(OGwords, "test");

                                if (replacedText !== text)
                                {
                                    element.replaceChild(document.createTextNode(replacedText), node);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}