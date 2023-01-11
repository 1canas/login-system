import express from "express";
import dotenv from "dotenv";
import router from "./routes/router";
import mongoose from "mongoose";

dotenv.config();

express.json();

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.j3zhyqs.mongodb.net/myFirstDatabase`)
        .then(() => console.log('Success'))
        .catch(err => console.log(err));


// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken')

const app = express();
app.use(router);

export default app;