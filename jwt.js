const jwt = require('jsonwebtoken')
const fs = require('fs')

fs.readFile()

let token = jwt.sign({ ten: 'thai' }, 'nodemy', { expiresIn: 30 })
console.log(token);

let string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW4iOiJ0aGFpIiwiaWF0IjoxNjIzNjQzMDAxLCJleHAiOjE2MjM2NDMwMzF9.Fr5R7L4hQiG7FKcZRhnVLmnVX7HGCFWodW6Qz5cbDHc'
let data = jwt.verify(string, 'nodemy')

console.log(data);
