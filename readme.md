# fakeronyms
idk man this is a janky project put together in a few hours
(by kristy c and amy w @ hack@brown 2018!)

## what does it do?
it's a chrome extension (save in a folder then upload as an unpacked extension) that makes subtle changes to acronyms and things that look like acronyms to screw with you but like, just a little

## how did you make it?
javascript, chrome extension tutorials, and much less motivation than a hackathon usually entails

## so what works and what doesn't?
running a chrome extension from a folder with all these files should work -- the only files that are actually called are contentscript.js, icon.png, and manifest.json. if you want to deal with or test broken code, make your edits to contentscript-allcaps.js or contentscript-onbutton.js and modify manifest.json to call the appropriate javascript file.
