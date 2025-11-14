import express from "express"; //const express=require('express'); - It is old style 
import cors from "cors";
import mongoose from "mongoose";

const app=express();
app.use(cors());
app.use(express.json()); //used to read json format

//connecting with mongodb
const url="mongodb+srv://mahimaakkina_db_user:GodisLove%40143@cluster0.l6kxe98.mongodb.net/TodoTask";


mongoose.connect(url)
.then(()=>console.log("MongoDB connected"))
.catch(err=>console.log(err));

//schema
const list=new mongoose.Schema({
    text:String,
    status:Boolean
});

//model
const Item=mongoose.model("Item", list);

//get all tasks list
app.get('/items', async (req,res)=>{
    const items=await Item.find();
    res.json(items);
})

//adding task item
app.post('/items',async (req,res)=>{
    const item=new Item({
        text:req.body.text,
        status:false //initially when task is enteres it is incomplete, so in false, user have to complete
    });
    await item.save(); //saved the item object in database
    res.json(item);
    // res.json({message:"Task added"});
});

//update task

app.put("/items/:id", async (req,res)=>{
    const updated=await Item.findByIdAndUpdate(
        req.params.id, //id of which item to be updated
        {status:req.body.status}, //updating status field
        {new:true}); // it gives updated value stored in db, if we don't use this it will return old data only
    res.json(updated);
});

//deleting task

app.delete("/items/:id", async (req, res)=>{
    await Item.findByIdAndDelete(req.params.id); // params captures dynamic values in url
    res.json({message:"Task deleted"});
});

app.listen(4000,()=>{
    console.log("Server running on port 4000");
});


