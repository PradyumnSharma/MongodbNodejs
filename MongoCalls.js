const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://pradyumn:pradyumn@mycluster.ib6m5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

async function execute() {
    const client = new MongoClient(uri);
    await client.connect();
    if (client.err) throw err;

    // findOne(client);
    // findOneWithFilter(client);
    // findAll(client);
    // findAllWithFilter(client);
    // findAllWithFilterAndProjection(client);
    // findAllWithProjectionAndSort(client);
    // findAllWithSkipAndLimit(client);
    // insertOne(client);
    // insertMany(client);
    // updateOne(client);
    // updateMany(client);
    // replaceOne(client);
    // deleteOne(client);
    // deleteMany(client);
    // countDocuments(client);
    // distinctValues(client);
    // aggregation(client);
    // dropCollection(client);
    transaction (client);
};

async function findOne(client) {
    const database = client.db('training');
    const collection = database.collection('persons');
    var document = await collection.findOne();
    console.log(document);
    client.close();
};

async function findOneWithFilter(client) {
    const database = client.db('training');
    const collection = database.collection('persons');
    const filter = { gender: 'T' };
    var document = await collection.findOne(filter);
    if (document == null) {
        console.log('no document found');
    } else {
        console.log(document);
    }
    client.close();
};

async function findAll(client) {
    const database = client.db('training');
    const collection = database.collection('persons');
    var resultSet = collection.find();
    await printAll(resultSet);
    client.close();
};

async function printAll(resultSet) {
    var resultCount = await (resultSet.count());
    if (resultCount === 0) {
        console.log('No data found');
    } else {
        await resultSet.forEach(console.log);
    };
    console.log(resultCount);
}

async function findAllWithFilter(client) {
    const database = client.db('training');
    const collection = database.collection('persons');
    const filter = { gender: 'F' };
    var resultSet = collection.find(filter);
    await printAll(resultSet);
    client.close();
};

async function findAllWithFilterAndProjection(client) {
    const database = client.db('training');
    const collection = database.collection('persons');
    const filter = { gender: 'F' };
    const projection = { name: true, gender: true, _id: false };
    var resultSet = collection.find(filter, { projection: projection });
    await printAll(resultSet);
    client.close();
};

async function findAllWithProjectionAndSort(client) {
    const database = client.db('training');
    const collection = database.collection('persons');
    const projection = { name: true, gender: true, _id: false };
    const sortBy = { 'name.last': 1, 'name.first': 1 };
    var resultSet = collection.find({}, { projection: projection }).sort(sortBy);
    await printAll(resultSet);
    client.close();
};

async function findAllWithSkipAndLimit(client) {
    const database = client.db('training');
    const collection = database.collection('persons');
    const filter = { gender: 'F' };
    const projection = { name: true, gender: true, _id: false };
    const sortBy = { 'name.last': 1, 'name.first': 1 };
    var resultSet = collection.find(filter, { projection: projection }).sort(sortBy).skip(3).limit(3);
    await printAll(resultSet);
    client.close();
};

async function insertOne(client) {
    const database = client.db('training');
    const collection = database.collection('countries');
    var document = { name: "India", capital: "New Delhi", languages: ['Hindi', 'English', 'Bengali', 'Marathi'] };
    var result = await collection.insertOne(document);
    console.log(result.insertedCount);
    client.close();
};

async function insertMany(client) {
    const database = client.db('training');
    const collection = database.collection('countries');
    var documents = [
        { name: "India", capital: "New Delhi", languages: ['Hindi', 'English', 'Bengali', 'Marathi'] },
        { name: 'Nepal', capital: 'Kathmandu', languages: ['Nepali', 'Hindi'] },
        { name: 'Bangladesh', capital: 'Dhaka', languages: ['Bengali', 'Urdu', 'Hindi', 'English'] }
    ];
    var result = await collection.insertMany(documents);
    console.log(result.insertedCount);
    client.close();
};

async function updateOne(client) {
    const database = client.db('training');
    const collection = database.collection('persons');
    const searchFor = { 'name.first': 'Nancy', 'name.last': 'Karin' };
    const newValues = { $set: { passport: 'H1233210', yearOfBirth: 1950 } };
    var result = await collection.updateOne(searchFor, newValues);
    console.log(result.modifiedCount);
    client.close();
};

async function updateMany(client) {
    const database = client.db('training');
    const collection = database.collection('persons');
    var searchFor = { gender: 'M' };
    var newValues = { $set: { isMale: true } };
    var result = await collection.updateMany(searchFor, newValues);
    console.log(result.modifiedCount);
    client.close();
};

async function replaceOne(client) {
    const database = client.db('training');
    const collection = database.collection('persons');
    var searchFor = { 'name.first': 'Nancy', 'name.last': 'Karin' };
    var newDocument = {
        name: { first: 'Nancy', last: 'Karin' },
        gender: 'O',
        yearOfBirth: 1962,
        livesIn: 'Montreal',
        countriesVisited: ['Canada', 'United States of America'],
        languages: [
            { name: 'English', proficiency: 'Fluent' },
            { name: 'French', proficiency: 'Fluent' },
            { name: 'German', proficiency: 'Intermediate' },
            { name: 'Greek', proficiency: 'Intermediate' },
            { name: 'Latin', proficiency: 'Intermediate' },
            { name: 'Sanskrit', proficiency: 'Beginner' }]
    };
    var result = await collection.replaceOne(searchFor, newDocument);
    console.log(result.modifiedCount);
    client.close();
};

async function deleteOne(client) {
    const database = client.db('training');
    const collection = database.collection('persons');
    var searchFor = { 'name.first': 'Nancy', 'name.last': 'Karin' };
    var result = await collection.deleteOne(searchFor);
    console.log(result.deletedCount);
    client.close();
};

async function deleteMany(client) {
    const database = client.db('training');
    const collection = database.collection('persons');
    var searchFor = { gender: 'M' };
    var result = await collection.deleteMany(searchFor);
    console.log(result.deletedCount);
    client.close();
};

async function countDocuments(client) {
    const database = client.db('training');
    const collection = database.collection('persons');
    var result = await collection.countDocuments();
    console.log(result);
    client.close();
};

async function distinctValues(client) {
    const database = client.db('training');
    const collection = database.collection('persons');
    var result = await (collection.distinct('gender'));
    console.log(result);
    client.close();
};

async function aggregation(client) {
    const database = client.db('training');
    const collection = database.collection('zips');
    var aggregation = [
        { $group: { _id: '$state', population: { $sum: '$pop' } } },
        { $match: { population: { $gte: 10 * 1000 * 1000 } } },
        { $sort: { _id: 1 } }
    ];
    var resultSet = await collection.aggregate(aggregation);
    resultSet.forEach(console.dir);
    client.close();
};

async function dropCollection(client) {
    const database = client.db('training');
    const collection = database.collection('countries');
    var result = await collection.drop();
    console.log(result);
    client.close();
};

async function transaction (client) {
    const session = client.startSession();
    const transOptions = {readPreference: 'primary', readConcern: {level: 'local'}, writeConcern: {w: 'majority'}};
    var result = await session.withTransaction (
        async () =>{
            const col1 = client.db ('training').collection ('countries');
            const col2 = client.db ('pragati').collection ('languages');
            await col1.insertOne ({a: 1}, {session});
            await col2.insertOne ({b: 2}, {session});
        }, transOptions
    );
    await session.endSession();
    console.log ("so far so good");
    client.close();
};

execute();