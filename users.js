
const fs = require('fs')
const data = fs.readFileSync('./database/data.json','UTF-8')
console.table(JSON.parse(data))