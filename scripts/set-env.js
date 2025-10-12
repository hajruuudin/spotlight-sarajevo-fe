const fs = require('fs')
const dontenv = require('dotenv')
dontenv.config()

const targetPath = './src/environments/environment.prod.ts'

const envConfigFile = `export const environment = {
    production: true,
    IMAGE_BB_API: "${process.env.IMAGE_BB_KEY}",
    API_URL: "https://spotlight-sarajevo-be-1-0-0.onrender.com"
};`

fs.writeFileSync(targetPath, envConfigFile, { encoding: 'utf8'});
console.log('Environment vars for production generated')