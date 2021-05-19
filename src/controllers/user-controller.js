const { ObjectId } = require('mongodb')
const database = require('../config/database')

const userController = {
  index: (req, res) => {
    database((err, db) => {
      if (err) throw err

      const dbo = db.db('mydb')

      dbo
        .collection('users')
        .find()
        .toArray()
        .then(response => {
          res.json(response)

          db.close()
        })
    })
  },

  show: (req, res) => {
    const { id } = req.params

    database((err, db) => {
      if (err) throw err

      const dbo = db.db('mydb')

      dbo
        .collection('users')
        .findOne({ _id: ObjectId(id) })
        .then(response => {
          response
            ? res.json(response)
            : res.status(404).json({
                message: 'User not found.',
              })

          db.close()
        })
    })
  },

  update: (req, res) => {
    res.end()
  },

  destroy: (req, res) => {
    res.end()
  },
}

module.exports = userController
