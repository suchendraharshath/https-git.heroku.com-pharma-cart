//conection of express app
var exp=require('express');
var app=exp();

var path=require('path');
var bodyparser=require('body-parser');
//hashing module
var bcrypt=require('bcryptjs');
var mongoose=require('mongoose');
//getting mongodb client object
var mongoclient=require('mongodb').MongoClient;
var dbo; //database object
var url="mongodb://pharmacart:pharmacart108@ds261644.mlab.com:61644/pharmacart";
//connect with pharmacart database
mongoclient.connect(url,(err,client)=>{
    if(err)
    {
        console.log('error in database connection');
    }
    else
    {
        //get object of pharmacart database
        dbo=client.db('pharmacart');
        console.log('connected with database');        
    }
})

app.use(bodyparser.json());

//connect serve with angular path
//app.use(exp.static(path.join(first,second)));
app.use(exp.static(path.join(__dirname,'dist/pharmacart')));

app.post('/home/signup',(req,res,next)=>{
console.log('working');
console.log(req.body);
    //check for user existence
    dbo.collection('signup').find({Username:req.body.Username}).toArray((err,data)=>{
        //if user not found the inser user document
        if(data.length===0){
           bcrypt.hash(req.body.password,10,(err,hashcode)=>{
               if(err)
               {
                console.log('error during hashing');
               }
               else
               {
                dbo.collection('signup').insertOne({firstname:req.body.firstname,
                                                    middlename:req.body.middlename,
                                                    lastname:req.bodylastname,
                                                    Username:req.body.Username,
                                                    email:req.body.email,
                                                    password:hashcode,
                                                    repassword:hashcode,
                                                    gender:req.body.gender},()=>{
                        res.json("registration succesfull")
                    })
               }
           })
        }
        //if user is existed, send responce to client to choose another name
        else{
            res.json({"message":"user existed change Username"});
        }
    })
})

app.post('/home/login',(req,res,next)=>{
    console.log('working');
    console.log(req.body);
    dbo.collection('signup').find({Username:req.body.Username}).toArray((err,data)=>{
       
        if//if password matched then true is assigned to success,else false
            (data.length==0){
                res.json("invalid username");
            }
            else{
                console.log(data.length)
            bcrypt.compare(req.body.password,data[0].password,(err,success)=>{
                if(err)
                {
                    console.log(err);
                }
                else if(success==true)
                {
                    res.json("logged in successfully")
                }
                else if(success==false)
                {
                    res.json("wrong password")
                } 
            })
        }
        
    })
})

//posting medicines from medicines component to medicines collection
app.post('/admin/medicines',(req,res,next)=>{
    console.log(req.body);
    dbo.collection('medicines').insertOne(req.body,(err,success)=>{
    if(err)
    {
        console.log(err)
    }
    else
    {
        res.json('sent succuessfully')
    }
    })
})

//getting medicines to stock component from medicines collection
app.get('/admin/stock',(req,res,next)=>{
    dbo.collection('medicines').find({}).toArray((err,data)=>{
        if(err)
        {
            console.log(err)
        }
        else{
            res.send(data);
        }
    })
})

//getting medicines to medicines component from medicines collection
app.get('/admin/medicines',(req,res,next)=>{
    dbo.collection('medicines').find({}).toArray((err,data)=>{
        if(err)
        {
            console.log(err)
        }
        else{
            res.send(data);
        }
    })
})

//getting medicines to babycare from medicines collection
app.get('/home/pharma/babycare',(req,res,next)=>{
    dbo.collection('medicines').find({}).toArray((err,data)=>{
        if(err)
        {
            console.log(err)
        }
        else{
            res.send(data);
        }
    })
})

//getting userdetails from signup collections
app.get('/admin/userdetails',(req,res,next)=>{
    dbo.collection('signup').find({}).toArray((err,data)=>{
        if(err)
        {
            console.log(err)
        }
        else{
            res.send(data);
        }
    })
})

//updating medicines data in medicines collection
app.put('/admin/medicines',(req,res)=>{
    //object received from client
    console.log(req.body);
    //convert string id to objectid
    console.log(req.body._id);
    var object=new mongoose.Types.ObjectId(req.body._id);
    console.log(object);
    //updating document in database
    dbo.collection('medicines').update({_id:object},{$set:{category:req.body.category,
                                                            medicine:req.body.medicine,
                                                            price:req.body.price,
                                                            quantity:req.body.quantity,
                                                            date:req.body.date}},(err,success)=>{
                                                                if(err){
                                                                    console.log(err);
                                                                }
                                                                else{
                                                                    dbo.collection('medicines').find({}).toArray((err,data)=>{
                                                                        if(err){
                                                                            console.log(err);
                                                                        }
                                                                        else{
                                                                            res.json('success');
                                                                        }
                                                                    
                                                                    })
                                                                }
                                                            })
})

//posting babycare data to cart collection
app.post('/user/pharma/babycare',(req,res,next)=>{
    console.log(req.body);
    dbo.collection('cart').insertOne(req.body,(err,success)=>{
    if(err)
    {
        console.log(err)
    }
    else
    {
        res.json('sent succuessfully')
    }
    })
})
// geting data from cart collection
app.get('/user/cart',(req,res,next)=>{
    dbo.collection('cart').find({}).toArray((err,data)=>{
        if(err)
        {
            console.log(err)
        }
        else{
            res.send(data);
        }
    })
})

app.delete('/admin/medicines',(req,res)=>{
    dbo.collection('medicines').remove({medicine:req.body.medicine},(err,success)=>{
        if(err){
            console.log('delete is error');
        }
        else
        {
            dbo.collection('medicines').find({}).toArray((err,data)=>{
                if(err){
                    console.log(err)
                }
                else{
                    res.json(data)
                }
                })
            }
        })
    })

    app.delete('/user/cart',(req,res)=>{
        dbo.collection('cart').remove({medicine:req.body.medicine},(err,success)=>{
            if(err){
                console.log('delete is error');
            }
            else
            {
                dbo.collection('cart').find({}).toArray((err,data)=>{
                    if(err){
                        console.log(err)
                    }
                    else{
                        res.json(data)
                    }
                    })
                }
            })
        })



app.listen(process.env.PORT || 8080,()=>{
    console.log('server listning on port 8080...')
});