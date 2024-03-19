let scriptTag = document.createElement("script");
scriptTag.type = "text/javascript";
scriptTag.src = "https://raw.githubusercontent.com/haison8x/xqwlight/master/JavaScript/codeinject.js";
let contentNode = document.getElementById('contentNewsShow')
contentNode.append(scriptTag)