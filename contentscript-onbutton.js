function replace()
{
    console.log("started script");
    var elements = document.getElementsByTagName('*');
    //var elements = document.body;
    //console.log(elements);

    for (var i = 0; i < elements.length; i++) {
    //for (var i = 0; i < 1; i++) {
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
                    console.log("found open paren");
                    var closeParenLoc = text.substring(openParenLoc).search(/[)]/);
                    if (closeParenLoc !== -1)
                    {
                        console.log("found close paren");
                        var acronym = text.substring(openParenLoc + 1, openParenLoc + closeParenLoc);
                        if (acronym.search(" ") == -1)
                        {
                            console.log(acronym.length);
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
                            console.log("out of while loop");
                            if (nSpaces > 0)
                            {
                                console.log("check for letter match")
                                var OGwords = text.substring(openParenLoc - scanner + 1, openParenLoc);
                                console.log(OGwords);
                                var words = OGwords.replace("-", " ")
                                var wordArray = words.split(" ");
                                console.log(wordArray[0]);
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
                                    var replacedText = text.replace(OGwords, 'some fake acronym ');

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
}

document.getElementById('clickme').addEventListener('click', replace);