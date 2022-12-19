const express = require('express');
const path = require('path');
const { nextTick } = require('process');
// const members = require('./Members');
const logger = require('./middleware/Logger')

const app = express();

app.use(logger);

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    console.log(`req: ${req}`)
    // res.send("Hello server")
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.use('/api/members', require('./routes/api/members'))

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
});
