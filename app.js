import express from "express";
import fs from "fs";

const app = express();

app.use(express.json());

app.get("/",(req,res)=>{
  res.send("Home");
});

app.get("/:city_name",(req,res)=>{

    const {city_name} = req.params;

    const restaurantLocation = JSON.parse(fs.readFileSync("./models/restaurant.json"))

    const restaurantData = restaurantLocation.filter(restaurant => restaurant.city_name === city_name);
    

    if(restaurantData.length > 0){
        res.json(restaurantData);
    }
    else{
        res.status(404).json({
            success:false,
            message: "Location Not Found"
        })
    }
    
})

app.listen(4000,()=>{
    console.log("Server is Working");
})