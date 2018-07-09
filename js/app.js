const path = require('path');
const file = path.resolve('./stats.js');

function createJSONFile(file, JSONObject){
    require('fs').writeFile(file, JSON.stringify(JSONObject, null, 5), (err) => {
        if(err){
            console.log(err);
            return;
        }
        console.log('File Created');
    });
}
