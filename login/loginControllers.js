const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userModel = require('../users/models/users.model');
const login = async (req, res) => {
    try{
        const user = await userModel.isEmailValid(req.body.email);
        if (!user) return res.status(400).send('Invali email or password');
    
       const validPassword = await bcrypt.compare(req.body.password,user.password);
       if(!validPassword) return res.status(400).send('Invali email or password');
       else{
        const token = user.generateAuthToken();

       res.header('x-token', token);
       res.cookie('x-token',token,{httpOnly:true,maxAge: 24 * 60 * 60 * 1000});
       
        res.send(user);

        
       
       } 
    }
    catch(ex){
        console.log(ex);
    }
    
}



module.exports = {login}
