const { MongoClient } = require('mongodb')

const uri =
  'mongodb+srv://admin:admin@cluster0.gzwwd.gcp.mongodb.net?retryWrites=true&w=majority'

const database = callback => MongoClient.connect(uri, callback)

module.exports = database
