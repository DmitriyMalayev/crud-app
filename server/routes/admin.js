const express = require("express")
const router = express.Router
const Post = require("../models/Post")
const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const adminLayout = "../views/layouts/admin"
const jwtSecret = process.env.JWT_SECRET



