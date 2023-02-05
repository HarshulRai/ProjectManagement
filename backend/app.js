const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const cors = require('cors');
const helmet = require("helmet");
const compression = require('compression')
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose')
// const https = require('https');


const accessLogStream = fs.createWriteStream('access.log', {flag: 'a'})


const userRouter = require('./routes/user');
const projectRouter =require('./routes/project');
const forgetpassRouter = require('./routes/forgetpass') 

app.use(express.json())

app.use(helmet());
app.use(cors());
app.use(compression());
app.use(morgan('combined', {stream: accessLogStream}));

app.use(bodyParser.json({extended:false}))

app.use('/user' , userRouter )
app.use('/project' , projectRouter )
app.use('/password' , forgetpassRouter)


    
mongoose.connect('mongodb://localhost:27017/projectDB')
.then(()=>{
    app.listen(3000 , (req,res)=>{
        console.log('running')
    })
})
