require('dotenv').config()


const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000


//bike model 
const Bike = require("./models/bike")


//config file
//const connectdb = require("./config/connectToDb")
const connectToDB= require('./config/connectToDb')
connectToDB();

app.use(express.json());
//routes
//get request
app.get("/", (req, res) => {
    res.send("the root the root the root is on fyyyaaaa!!");
  });

  app.get("/bikes", async (req, res) => {
    //   Get all bikes from DB
    const bikes = await Bike.find();
    console.log(`Currently Fetching ALL Bikes`);
    res.json({ bikes: bikes });
  });

app.get("/bikes/:id" ,async( req,res) =>{
    const bikeid = req.params.id
    const thisbikeid = await Bike.findById(bikeid)
    res.json({bike: thisbikeid});
})
app.get("/bikes/id/:bikeid" ,async( req,res) =>{
  const bikeid1 = (req.params.bikeid)
  const thisbikeid = await Bike.findOne({bikeid : bikeid1})
  res.json({bike: thisbikeid});
})
//POST REquest

app.post("/bikes", async (req, res) => {
    const {bikeid,bikename,color,modelno,wheels}= req.body
    const bike = await Bike.create({
        bikeid: bikeid,
        bikename: bikename,
        color : color,
        modelno : modelno,
        wheels:wheels,

       
    })
    console.log("SuccessfullyMadePOST")
    res.json({bike: bike})
  });


  app.put("/bikes/:id", async (req, res) => {

    const bikeid1 = req.params.id;
    const {bikeid,bikename,color,modelno,wheels}= req.body
    const bike = await Bike.findByIdAndUpdate(bikeid1,{
         bikeid:bikeid,
        bikename: bikename,
        color : color,
        modelno : modelno,
        wheels:wheels,

       
    })

    const updatedBike = await Bike.findById(bikeid1)
    res.json({bike: updatedBike})
    console.log("Successfully updated")
    res.json({bike: bike})
  });


  app.delete("/bikes/:id", async (req, res) => {
    const bikeId = req.params.bikeid
    await Bike.deleteOne({
      id: bikeId
    })
    res.json({success: "Its Deleted"})
  });



app.listen(PORT ,() =>
{
    console.log("Server is running");
})

