const express = require('express')
const app = express()
const port = 4000

app.use(express.static('static'))

app.get('/',(req,res) => {
    res.send('Nice!!!')
});

app.listen(port, () => console.log('Connected on localhost:4000'))