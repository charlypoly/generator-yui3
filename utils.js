var path = require('path');
var fs = require('fs');

/*
 * @return {
    folder : xxx,
    file : xxx
 }
 *
 * look for the first "fileName" in ancestor folder
 * @method reachFirst
 *
 */

exports.reachFirst = function reachFirst(fileName) {
    var recurs = "";

    while (true) {

        var pathFolder = path.join(process.cwd(), recurs);
        var pathFile = path.join(pathFolder, fileName);

        if (fs.existsSync(pathFile)) {
            var returnObject = {
                pathFolder: pathFolder,
                pathFile: pathFile
            };
            // console.log("returnObject : ", returnObject);
            return returnObject;
        }
        //change path
        recurs = recurs + "../";
        if(pathFolder === "/"){
            console.log(fileName + " not found");
            return;
        }
    }

}
