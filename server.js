//conection of express app
const exp=require('express');
const app=exp();
const path=require('path');
const bodyparser=require('body-parser');
//get our api routes
const api=require('./server/routes/api');
//const http=require('http')
//parser for post data
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
//point static path to dist
app.use(exp.static(path.join(__dirname,'dist/pharmacart')));
//set our api routes
app.use('/api',api);
//catch all other routes and return the index file
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'dist/pharmacart/index.html'));
});

const port=process.env.PORT || '8080';
app.set('port',port);
//const server=http.createServer(app);
app.listen(port,()=>{
           console.log('API running on localhost:'+(port) )
        })

// //connect with pharmacart database
// app.listen(process.env.PORT || 8080,()=>{
//     console.log('server listning on port 8080...')
// });