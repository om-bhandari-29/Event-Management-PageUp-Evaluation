const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan'); //to display route that is requested
const path = require('path');

dotenv.config();