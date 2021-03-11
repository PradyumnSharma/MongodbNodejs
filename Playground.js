const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://pradyumn:pradyumn@mycluster.ib6m5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


async function dbConnect () {
    // callback = findWithFilterAndProjection;
    const myMongoClient = new MongoClient(uri);
    await myMongoClient.connect(); //'await' forces js execution to pause here till a connection is established
    // findWithFilterAndProjection(myMongoClient.err, myMongoClient.db);
    findWithFilterAndProjection(myMongoClient);
};

async function findWithFilterAndProjection(client) {
    if (client.err) throw err;
    var dbo = client.db('training');
    var queryString = { gender: 'F' };
    var projection = { name: true, gender: true, _id: false };
    //var processResult = (res)=>{console.log(`result: ${res}`)};
    var resultIter = dbo.collection('persons').find(queryString, { projection: projection });
    var resultCount = await resultIter.count();
    if (resultCount === 0) 
    {
        console.log(`No records found for the query ${queryString}`);
    }
    else
    {
        await resultIter.forEach(console.log);
    }
    
    // when all is done
    // because all db.xx calls are 'await'
    // we can directly close the database connection
    client.close();
};

//chain promises using .then and .catch
// dosth().then(another).then(yetanother).catch()
// async / await 
// step 1: declare that the function is async
// async function myFunction(){};
// var myFunction = async function (){};
// function onEvent (async ()=>{});
//
// step 2: how to use functions that are async
// var myResult = await myFunction();
// var myResult = new Promise(resolve(myFunction)).then();

// declare with async, js compiler will replace declaration with a promise
// use with await, compiler will replace it with a .then()



dbConnect();
// await dbConnect() does not make sense here