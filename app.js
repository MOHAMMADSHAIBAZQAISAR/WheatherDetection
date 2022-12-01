const express = require("express");

const https = require("https");
const bodyParser = require("body-parser");


const app = express();


app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){

    res.sendFile(__dirname+"/index.html");
  //res.send("Server is up and running"); only one send...
});

app.post("/",function(req,res){

  console.log(req.body.cityName);
  const loc = req.body.cityName;
  const appkey = "3698ebd15b7b5eb35922e8af2ad0206e";
  const unit= "metric";

  var url = "https://api.openweathermap.org/data/2.5/weather?q="+loc+"&appid="+appkey+"&units="+unit;

  console.log(req.body.cityName);

    https.get(url,function(response){
      console.log(response.statusCode);

      response.on("data",function(data){
        const wheatherData = JSON.parse(data);
        const icon = wheatherData.weather[0].icon;
        const imageUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
        const temp = wheatherData.main.temp;
        const WheatherDescription = wheatherData.weather[0].description;
        console.log(WheatherDescription);
        console.log(temp);
        //res.write("<img src="+imageUrl+">");
        res.write("<h1>The temperature in " +req.body.cityName + temp +" <h1>degree celcius.</h1>") ;
        res.write("<h2>The wheather is currently " + WheatherDescription + "<h2>");

      });
  });


})









app.listen(3000, function(){
    console.log("Server is running on port 3000");
});
