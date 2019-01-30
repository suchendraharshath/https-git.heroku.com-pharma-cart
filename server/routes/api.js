const exp=require('express');
const app=exp();
//hashing module
var bcrypt=require('bcryptjs');
var mongoose=require('mongoose');
const bodyparser=require('body-parser');
const path=require('path');
//getting mongodb client object
var mongoclient=require('mongodb').MongoClient;
var dbo; //database object
var url="mongodb://pharmacart:pharmacart108@ds261644.mlab.com:61644/pharmacart";
var jwt=require('jsonwebtoken');
var name="req.decoded.Username";

s="secretkey";

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

//check for validations of token
let checkToken=(req,res,next)=>{
    //capture headers with names 'x-access-token' or 'Authorization'
    //express headers are auto converted to lowercases
    let token=req.headers['x-access-token'] || req.headers['authorization'];
    console.log(token);
    if(token===undefined)
    {

        return res.json({message:'no token found'})
    }    
    if(token.startsWith("Bearer "))
    {
        //remove Bearer from string
        token=token.slice(7,token.length);
    }
    //using jwt package and secret string, validate the token
    if(token!==undefined)
    {
        jwt.verify(token,s,(err,decoded)=>{
            //if anything goes wrong, return an error immediately before passing control to next handler
            if(err)
            {
                return res.json({ message:'Token is not valid' });
            }
            else
            {
                req.decoded=decoded;
                console.log(req.decoded);
                next();
            }
        });
    }
}

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
//var Username;
app.post('/home/login',(req,res,next)=>{
    console.log('working');
    console.log(req.body);
    dbo.collection('signup').find({Username:req.body.Username}).toArray((err,data)=>{
       //Username=req.body.Username;
        //if password matched then true is assigned to success,else false
            if(data.length==0){
                res.json("invalid Username");
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
                   // res.json("logged in successfully")

                   var jwtBearerToken=jwt.sign({Username:req.body.Username},s,{expiresIn:600000});
                   console.log('token is'+jwtBearerToken);
                   res.status(200).json({idtoken:jwtBearerToken});
                   //name=req.body.Username;
                   console.log(req.body.Username);

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
app.post('/admin/medicines',checkToken,(req,res,next)=>{
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
app.get('/admin/stock',checkToken,(req,res,next)=>{
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
app.post('/user/pharma/babycare',checkToken,(req,res,next)=>{
    dbo.collection(req.decoded['Username']).insertOne(req.body,(err,data)=>{
    if(err)
    {
        console.log(err)
    }
    else
    {
        res.send(data)
    }
    })
})
// geting data from cart collection
app.get('/user/cart',checkToken,(req,res,next)=>{
    dbo.collection(req.decoded['Username']).find({}).toArray((err,data)=>{
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

    app.delete('/user/cart',checkToken,(req,res)=>{
        dbo.collection(req.decoded['Username']).remove({medicine:req.body.medicine},(err,success)=>{
            if(err){
                console.log('delete is error');
            }
            else
            {
                dbo.collection(req.decoded['Username']).find({}).toArray((err,data)=>{
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
        module.exports=app;
