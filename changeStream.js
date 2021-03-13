const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://pradyumn:pradyumn@mycluster.ib6m5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

async function execute () {
    const client = new MongoClient(uri);
    await client.connect();
    if (client.err) throw err;

    const database = client.db('training');
    const collection = database.collection('persons');

    const pipeline = [
        {$match: {operationType: 'delete'} },
        {$project: {documentKey: true, _id: true}}
    ];

    const resumeToken = {
            _data: '82604AEFD00000000F2B022C0100296E5A1004787EF1B3DD424CF9BC78D0FB7041734646645F69640064604AEF890E13F9D4CA138B540004'
    };

    // const changeStream = collection.watch ();
    // const changeStream = collection.watch ({ fullDocument: 'updateLookup' });
    // const changeStream = collection.watch (pipeline, { fullDocument: 'updateLookup' });
    const changeStream = collection.watch (pipeline, { fullDocument: 'updateLookup', resumeAfter: resumeToken });
    changeStream.on ('change', next => processDocument(next));
    // const next = await changeStream.next ();

};

function processDocument (next) {
    console.log (next);
};

execute ();