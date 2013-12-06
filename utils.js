var NAME    = "utils",
    path    = require('path'),
    fs      = require('fs');

exports.reachFirst = function reachFirst(options) {

    var type = options.type,
        name = options.name,
        from = options.from,
        returnObject, pathFolder, pathFile, recurs;

    //params control
    if (type && (type !== "folder" && type !== "file")) {
        throw new Error("Please enter a valid type");
    }

    if(from){
        if(!fs.existsSync(from) || !fs.statSync(from).isDirectory()){
            from = process.cwd();
        }
    }else{
        from = process.cwd();
    }

    //params control - end

    // console.log(NAME ? NAME : "" ," type : ", type);
    // console.log(NAME ? NAME : "" ," name : ", name);
    // console.log(NAME ? NAME : "" ," from : ", from);

    recurs = "";

    while (true) {

        pathFolder = path.join(from, recurs);
        pathFile = path.join(pathFolder,name);

        // console.log("in ", pathFolder);
        // console.log("look for ", pathFile);

        if (fs.existsSync(pathFile)) {
            returnObject = {
                relativeNode : recurs + name,
                relativeContainer : recurs,
                absContainer: pathFolder,
                absNode: pathFile
            };
            // console.log("returnObject : ", returnObject);
            return returnObject;
        }
        //change path
        recurs = recurs + "../";
        if (pathFolder === "/") {
            // console.log(name + " not found");
            return;
        }
    }
}
