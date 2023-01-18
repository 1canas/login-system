import express from "express";
import dotenv from "dotenv";
import router from "./routes/router";
import mongoose from "mongoose";

dotenv.config();

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName= process.env.DB_NAME;


mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.j3zhyqs.mongodb.net/${dbName}?retryWrites=true&w=majority`)
        .then(() => console.log('Success on connect to db'))
        .catch(err => console.log('Error on connect to db ', err));

// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken')

const app = express();

app.use(express.json());
app.use(router);

export default app;