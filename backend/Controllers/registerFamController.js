// controllers/userController.js
const express = require('express');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const FamilyUser = require('../models/FamilyUser');

const registerFamController = {
  registerFam: async (req, res) => {
    const { id, username, email, password  } = req.body;
    console.log(id , username, email, password );
    const errors = validationResult(req);
    if (!errors.array()) {
      return res.status(400).json({ error: 'Bad Request', message: errors.array() });
    }
    

    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = await FamilyUser.create({... req.body,  password: hashedPassword});
      res.status(200).json({ message: 'Registration successful' }); // Send 200 status and message
      console.log('Registration Done ...');
    } catch (error) {
      console.error('Error during registration : ',error);
      res.status(500).json({ error:'Internal  Server Error' });
    }
  }
};

module.exports = registerFamController;