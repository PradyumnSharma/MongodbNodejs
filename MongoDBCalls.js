const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://pradyumn:pradyumn@mycluster.ib6m5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

function dbConnect() {
    // callback = insertOne;
    // callback = insertMany;
    // callback = findOne;
    // callback = findAll;
    // callback = findAll2;
    // callback = findWithFilter;
    // callback = findWithFilterAndProjection;
    // callback = findAllWithProjectionAndSort;
    // callback = findWithVariousOptions;
    // callback = deleteJennyHJones;
    // callback = deleteAllMen;
    // callback = updateNancyKarin;
    callback = updateMany;
    // callback = dropCollection;


    MongoClient.connect(uri, callback);
};

function insertOne(err, db) {
    if (err) throw err;
    var dbo = db.db("training");
    var myobj = { name: "India", capital: "New Delhi", languages: ['Hindi', 'English', 'Bengali', 'Marathi'] };
    dbo.collection("countries").insertOne(myobj, function (err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();

    });
};

function insertMany(err, db) {
    if (err) throw err;
    var dbo = db.db("training");
    var myobj = [
        { name: 'Nepal', capital: 'Kathmandu' },
        { name: 'Bhutan', capital: 'Thimphu' },
        { name: 'Sri Lanka', capital: 'Colombo' }
    ];
    dbo.collection("countries").insertMany(myobj, function (err, res) {
        if (err) throw err;
        console.log("Number of documents inserted: " + res.insertedCount);
        // console.log(res);
        db.close();
    });
};

function findOne(err, db) {
    if (err) throw err;
    var dbo = db.db('training');
    dbo.collection('countries').findOne({}, function (err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
    });
};


function findAll(err, db) {
    if (err) throw err;
    var dbo = db.db('training');
    dbo.collection('persons').find({}).toArray(function (err, result) { 
        if (err) throw err;
        // console.log(result);
        // var myJSON = result;
        // console.log(`length of result = ${(myJSON.length)}`);
        // console.log("first element = "+myJSON[0]);
        // console.log("name key in first element = "+myJSON[0]["name"]);
        // result.forEach(console.log);
        console.log (result.length);
        console.log (result[0]['name']['first']);
        db.close();
    });
};

function findAll2 (err, db) {
    if (err) throw err;
    var dbo = db.db ('training');
    dbo.collection ('persons').find({}, function (err, result) {
        if (err) throw err;
        result.forEach (console.dir);
        db.close();
    });
};

function findWithFilter(err, db) {
    if (err) throw err;
    var dbo = db.db('training');
    var query = { gender: 'F' };
    dbo.collection('persons').find(query).toArray(function (err, result) {
        if (err) throw err;
        // console.log(result);
        console.log(result[0]);
        db.close();
    });
};

function findWithFilterAndProjection(err, db) {
    if (err) throw err;
    var dbo = db.db('training');
    var query = { gender: 'F' };
    var projection = { name: true, gender: true, _id: false };
    dbo.collection('persons').find({ gender: 'F' }, { projection: projection }).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
    });
};

function findAllWithProjectionAndSort(err, db) {
    if (err) throw err;
    var dbo = db.db('training');
    var byLastNameAndFirstName = { 'name.last': 1, 'name.first': 1 };
    var projection = { name: true, gender: true, _id: false };
    // dbo.collection('persons').find({}, { projection: projection }).sort(byLastNameAndFirstName).toArray(function (err, result) {
    //     if (err) throw err;
    //     console.log(result);
    //     db.close();
    // });
    // Alternatively...
    // dbo.collection('persons').find({}, { projection: projection, sort: byLastNameAndFirstName, skip: 3, limit: 3 }).
    // toArray(function (err, result) {
    //     if (err) throw err;
    //     console.log(result);
    //     db.close();
    // });
    // Alternatively...
    dbo.collection('persons').find({}, { projection: projection}).sort (byLastNameAndFirstName).skip(3).limit(3).
    toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
    });

};

function findWithVariousOptions (err, db) {
    if (err) throw err;
    var dbo = db.db ('training');
    var query = {gender: 'F'};
    var projection = {name: 1, gender: 1, yearOfBirth: 1, _id: 0};
    var limit = 3;
    var skip = 3;
    // dbo.collection ('persons').find({}, {projection: projection, limit: limit, skip: skip}, function (err, result) {
    //     if (err) throw err;
    //     result.forEach (console.dir);
    //     db.close();
    // });
    dbo.collection ('persons').find({}, {batchsize: 2}, function (err, result) {
        if (err) throw err;
        result.forEach (console.dir);
        db.close();
    });
};

function deleteJennyHJones(err, db) {
    if (err) throw err;
    var dbo = db.db('training');
    var deleteFor = { 'name.first': 'Jenny', 'name.middle': 'H', 'name.last': 'Jones' };
    dbo.collection('persons').deleteOne(deleteFor, function (err, result) {
        if (err) throw err;
        console.log(result.result.n);
        db.close();
    });
};

function deleteAllMen(err, db) {
    if (err) throw err;
    var dbo = db.db('training');
    var deleteMen = { gender: 'M' };
    dbo.collection('persons').deleteMany(deleteMen, function (err, result) {
        if (err) throw err;
        console.log(result.deletedCount);
        db.close();
    });
};

function updateNancyKarin (err, db) {
    if (err) throw err;
    var dbo = db.db ('training');
    var query = {'name.first': 'Nancy', 'name.last': 'Karin'};
    var newValues = {$set: {passport: 'H123321', yearOfBirth: 1950}};
    dbo.collection ('persons').updateOne (query, newValues, function (err, result) {
        if (err) throw err;
        console.log (result.result.n);
        db.close();
    });
};

function updateMany (err, db) {
    if (err) throw err;
    var dbo = db.db ('training');
    var query = {gender: 'M'};
    var newValues = {$set: {isMale: true}};
    dbo.collection ('persons').updateMany (query, newValues, function (err, result) {
        if (err) throw err;
        console.log (result.result.n);
        db.close();
    });
};

function dropCollection(err, db) {
    if (err) throw err;
    var dbo = db.db('training');
    dbo.collection('countries').drop(function (err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
    });
};

dbConnect();