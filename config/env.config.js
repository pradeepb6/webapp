//load environment variables
const fs = require('fs');
const dotenv = require('dotenv');
const envFile = fs.readFileSync(`./config/${process.env.NODE_ENV}.env`);
const envs = dotenv.parse(envFile);
Object.assign(process.env, envs);