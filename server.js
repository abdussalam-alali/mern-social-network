const express = require('express');
const apiRoutes = require('./routes/api');
const app = express();
const cors = require('cors');
const  connectDB = require('./config/db');
// connect to database
connectDB();
app.use(cors());
app.use(express.json({extended: false}));
app.use('/api',apiRoutes);
const PORT = process.env.PORT || 5000;

app.get('/',(req,res)=>{
   res.send(`Hey there!`);
});
app.listen(PORT, ()=>{
    console.log(`Server started at port ${PORT}`);
});