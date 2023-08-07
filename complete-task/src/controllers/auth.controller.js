const admin = require('firebase-admin');
const jwt = require('jsonwebtoken')
const registerController = (req, res) => {
  const { email, password } = req.body;
  admin.auth().createUser({
      email,
      password,
    }).then((userRecord) => {
      console.log('Successfully created new user:', userRecord.uid);
      res.status(201).json({ message: 'User registered successfully' });
    })
    .catch((error) => {
      console.error('Error creating new user:', error);
      res.status(500).json({ error: 'Error creating new user' });
    });
};


const loginController = (req, res) => {
    const { email, password } = req.body;
    admin
      .auth()
      .getUserByEmail(email)
      .then((userRecord) => {
        const token = jwt.sign(
          { userId: userRecord.uid, email: userRecord.email },
          'mysecret'
        );
        res.json({ token });
      })
      .catch((error) => {
        console.error('User not found:', error);
        res.status(404).json({ error: 'User not found' });
      });
  };
  

module.exports = {
    registerController,
    loginController
};
