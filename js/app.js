/**Function to create JSON file */
function createJSON(file, dataset) {
    require('fs').writeFile(file, JSON.stringify(dataset, null, 5), (err) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log('File Created');
    });
}

module.exports = {
    createJSON: createJSON
}