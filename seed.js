const fs = require('fs');
const { addOrUpdateItem } = require('./dynamo');
 
function stringToJSON() {
    try{
        return JSON.parse(fs.readFileSync('./PES.json'));
    } catch(err){
        console.log(err);
    }
}

function fillNullId(obj){
    for (var i=0; i < obj.length; ++i) {
        obj[i].ID = i + '';
     }
}





const seedData = async () => {
    try {
        const items = stringToJSON();
        fillNullId(items);
        for (var i=0; i < items.length; ++i) {
            addOrUpdateItem(items[i]);
        }
        await Promise.all(itemPromises);
    } catch (err) {
        console.error(err);
        console.log('AHHHHHHHHHHH');
    }
};
seedData();






    
    

