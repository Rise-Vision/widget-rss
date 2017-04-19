mkdir -p dist/gadgets
curl --compressed "http://rvashow2.appspot.com/gadgets/gadgets.min.js" -o dist/gadgets/gadgets.min.js

mkdir -p dist/scripts/greensock
curl "http://s3.amazonaws.com/rise-common/scripts/greensock/ThrowPropsPlugin.min.js" -o dist/scripts/greensock/ThrowPropsPlugin.min.js
