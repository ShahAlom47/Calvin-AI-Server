const express = require('express')
const app = express()
const port = process.env.PORT || 3000
require('dotenv').config()
var jwt = require('jsonwebtoken');
var cors = require('cors');
const { connect } = require('./utils/DB-connect');


// ========================
// global
// ========================
app.use(express.json());
app.use(
    cors({
      origin: [
        "http://localhost:5173",
        "http://localhost:5174",
  
      ],
      credentials: true,
    })
  );


// db connection 
connect();

    // jwt releted api 

    app.post('/jwt', async (req, res) => {
        const userInfo = req.body.userInfo
        
  
        const token = jwt.sign({
          data: userInfo
        }, process.env.ACCESS_TOKEN, { expiresIn: '1h' });
      
        res.send({ token })
  
      })
  

      // routes

      const paintingRoutes= require('./Routes/painting.routes')
      app.use('/painting',paintingRoutes)






app.get('/', (req, res) => {
    res.send('Calvin AI is  Running')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})







