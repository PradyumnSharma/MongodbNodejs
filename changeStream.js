const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://pradyumn:pradyumn@mycluster.ib6m5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

async function execute () {
    const client = new MongoClient(uri);
    await client.connect();
    if (client.err) throw err;

    const database = client.db('training');
    const collection = database.collection('persons');
    // const changeStream = collection.watch ();
    const changeStream = collection.watch ({ fullDocument: 'updateLookup' });
    changeStream.on ('change', next => processDocument(next));
    // const next = await changeStream.next ();

};

function processDocument (next) {
    console.log (next);
};

execute ();