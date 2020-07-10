const MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
const uri = "mongodb+srv://admin:admin@cluster0.gzwwd.gcp.mongodb.net?retryWrites=true&w=majority";

module.exports = {
    description: "Manipulação de dados do usuário",
    listausuarios: (req, res) => {
        MongoClient.connect(uri, function (err, db) {
            if (err) throw err;
            var dbo = db.db("mydb");
            dbo.collection("users").find().limit(5).toArray(function (err, result) {
                res.send(result)
                if (err) throw err;
                db.close();
            });
        });

    },
    registro: (req, res) => {
        MongoClient.connect(uri, function (err, db) {
            if (err) throw err;
            var dbo = db.db("mydb");
            var myobj = req.body;
            dbo.collection("users").insertOne(myobj, function (err, res1) {
                if (err) throw err;
                console.log("1 document inserted");
                res.json({ "status": "ok" })
                db.close();
            });
        });

    },
    usuario: (req, res) => {
        MongoClient.connect(uri, function (err, db) {
            if (err) throw err;
            var dbo = db.db("mydb");
            dbo.collection("users").findOne({ _id: ObjectID(req.params.id) }, function (err, result) {
                if (err) throw err;
                res.json(result)
                db.close();
            });
        });
    },
    login: (req, res) => {
        MongoClient.connect(uri, function (err, db) {
            if (err) throw err;
            var dbo = db.db("mydb");
            dbo.collection("users").findOne({ email: req.body.email }, function (err, result) {
                if (err) throw err;
                console.log(req.body.email)
                res.send(result)
                db.close();
            });
        });
    },
    atualiza: (req, res) => {
        console.log(req.body)
        MongoClient.connect(uri, function (err, db) {
            if (err) throw err;
            var dbo = db.db("mydb");
            var myquery = { _id: ObjectID(req.params.id) }
            var newvalues = { $set: req.body };
            dbo.collection("users").updateOne(myquery, newvalues, function (err, res1) {
                if (err) throw err;
                console.log("1 document updated");
                res.send({ "status": "ok" })
                db.close();
            });
        });
    },
    erase: (req, res) => {
        MongoClient.connect(uri, function (err, db) {
            if (err) throw err;
            var dbo = db.db("mydb");
            dbo.collection("users").drop(function (err, delOK) {
                if (err) throw err;
                if (delOK) res.send("Banco deletado com sucesso, sr. Estagiário");
                db.close();
            });
        });
    }

}