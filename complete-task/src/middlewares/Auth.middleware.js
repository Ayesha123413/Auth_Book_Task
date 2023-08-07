const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    try {

      let token = req.headers.authorization

      //if token found

      if (token) token = token.replace('Bearer ', '')
  
      //if token is not found
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized' })
      }

  //verify present token
      const decoded = jwt.verify(token, 'mysecret')
      console.log({ decoded })
      req.user = decoded
  
      next()
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized' })
    }
  }

  module.exports = auth

