const MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
const uri = "mongodb+srv://admin:admin@cluster0.gzwwd.gcp.mongodb.net?retryWrites=true&w=majority";

function teste() {
  const client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
    const collection = client.db("mydb").collection("users");
    console.log("Database created");
    client.close();
  });
}

function collection() {
  MongoClient.connect(uri, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.createCollection("users", function (err, res) {
      if (err) throw err;
      console.log("Collection created!");
      db.close();
    });
  });
}

function insert() {
  MongoClient.connect(uri, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myobj = { name: "Company Inc", address: "Highway 37" };
    dbo.collection("users").insertOne(myobj, function (err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  });
}

function select() {
  MongoClient.connect(uri, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("users").findOne({}, function (err, result) {
      if (err) throw err;
      console.log(result.name);
      db.close();
    });
  });
}

function query() {
  MongoClient.connect(uri, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var query = { address: "Park Lane 38" };
    dbo.collection("users").find(query).toArray(function (err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    });
  });
}

function sort() {
  MongoClient.connect(uri, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var mysort = { name: 1 };
    dbo.collection("users").find().sort(mysort).toArray(function (err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    });
  });
}

function del(id) {
  MongoClient.connect(uri, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myquery = { _id: ObjectID(id) };
    dbo.collection("users").deleteOne(myquery, function (err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      db.close();
    });
  });
}

function drop_collection() {
  MongoClient.connect(uri, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("users").drop(function (err, delOK) {
      if (err) throw err;
      if (delOK) console.log("Collection deleted");
      db.close();
    });
  });
}




function update() {
  MongoClient.connect(uri, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myquery = { address: "Valley 345" };
    var newvalues = { $set: { name: "Mickey", address: "Canyon 123" } };
    dbo.collection("users").updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      db.close();
    });
  });
}

function limit() {
  MongoClient.connect(uri, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("users").find().limit(5).toArray(function (err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    });
  });
}

drop_collection();