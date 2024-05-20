const express = require("express");
const router = express.Router();
const fs = require("fs");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const dotenv = require("dotenv");

dotenv.config();
