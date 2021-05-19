const database = require('../config/database')

const authController = {
  login: (req, res) => {
    const { email } = req.body

    database((err, db) => {
      if (err) throw err

      const dbo = db.db('mydb')

      dbo
        .collection('users')
        .findOne({ email })
        .then(response => {
          response
            ? res.json(response)
            : res.status(401).json({
                message: 'Invalid e-mail.',
              })

          db.close()
        })
    })
  },

  register: (req, res) => {
    database((err, db) => {
      if (err) throw err

      const dbo = db.db('mydb')

      dbo
        .collection('users')
        .insertOne(req.body)
        .then(() => {
          res.sendStatus(200)

          db.close()
        })
    })
  },
}

module.exports = authController
