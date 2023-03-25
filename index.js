const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const app = express();
const port =process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//user:dbuser2
//pass:7BrknIn05YVV4UuP


const uri = "mongodb+srv://dbuser2:7BrknIn05YVV4UuP@cluster0.rbhccf3.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){

    try{
        const collection = client.db('nodeMongoCrud').collection('users')

        app.get('/users', async(req, res)=>{
            const query = {};
            const cursor = collection.find(query)
            const users = await cursor.toArray();
            res.send(users);
        })
        app.put('/users/:id', async(req, res)=>{
            const id = req.params.id;
            const filter = await {_id: new ObjectId(id)};
            const user = req.body;
            const option = {upsert: true};
            const updateUser = {
                $set:{
                 name:user.name,
                 email:user.email
                }
            }
            const result = await collection.updateOne(filter,updateUser,option);
            res.send(result);
           
        });

        app.get('/users/:userId', async(req, res)=>{
            const id = req.params.userId;
            const query = {_id:new ObjectId(id)};
            const user = await collection.findOne(query);
            res.send(user);
        })
        app.post('/users',async (req,res)=>{
         const user = req.body;
         const result = await collection.insertOne(user)
         res.send(result);
         console.log(user);
         console.log(result);
        })
        app.delete('/users/:id',async (req,res)=>{
            const id = req.params.id;
            const query = {_id:new ObjectId(id)};
            //console.log('Trying delete user', id)
            const result = await collection.deleteOne(query)
            res.send(result);
            console.log(result);
        })


    }

    finally{

    }
}
run().catch(console.dir)

app.get('/',(req,res)=>{
    res.send('hello ')
});

app.listen(port,()=>{
    console.log(`Starting ${port}`)
});




