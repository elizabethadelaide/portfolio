// server.js
// where your node app starts

// init project
const express = require('express')
const app = express();

app.use(express.static('public'))

app.get("/", (request, response) => {
  response.sendFile(__dirname + '/views/index.html')
})

app.get("/lavalamp", (request, response) => {
  response.sendFile(__dirname + '/views/lavalamp.html')
})

app.get("/magenta", (request, response) => {
  response.sendFile(__dirname + "/views/magentaeater.html")
})

app.get("/skills", (request, response) =>{
  response.sendFile(__dirname + '/data/skills.json')
})

//get content
var spreadsheetID = process.env.SECRET;
var request = require("request")
 // Make sure it is public or set to Anyone with link can view
var url = "https://docs.google.com/spreadsheets/d/e/"+spreadsheetID+"/pub?gid=0&single=true&output=csv";
const csv=require('csvtojson');
console.log(url)
var portObj = {}

//load projects
portObj["Entries"] = []
csv()
.fromStream(request.get(url))
.then((jsonArrayObj)=>{
    console.log("Got mail");
    //console.log(jsonArrayObj);

    //return jsonArrayObj;
    for (var i = 0; i < jsonArrayObj.length; i++){
      var ID = parseInt(jsonArrayObj[i]["ID"])-1;
     portObj["Entries"][ID] = {};
    if (jsonArrayObj[i]["Show"] == "TRUE"){
      jsonArrayObj[i]["Show"] = true;
    }
    else{
      jsonArrayObj[i]["Show"] = false;
    }
     portObj["Entries"][ID]["Project"] = jsonArrayObj[i];
    portObj["Entries"][ID]["Project"]["Content"] = [];
    }
      //load content of each project;
        var nurl = "https://docs.google.com/spreadsheets/d/e/"+spreadsheetID+"/pub?gid=1076929027&single=true&output=csv";
        csv()
        .fromStream(request.get(nurl))
        .then((jsonArrayObj)=>{
            console.log("Got mail");
            //console.log(jsonArrayObj);

            var k = 0;

            //return jsonArrayObj;
            for (var i = 0; i < jsonArrayObj.length; i++){
              var ID = parseInt(jsonArrayObj[i]["ID"])-1;
              //console.log("ID", ID, portObj["Entries"])
              var type = jsonArrayObj[i]["Type"]
              k = portObj["Entries"][ID]["Project"]["Content"].length;
              portObj["Entries"][ID]["Project"]["Content"][k] = {}
              portObj["Entries"][ID]["Project"]["Content"][k][type] = jsonArrayObj[i]["Stuff"];
            }
        })
})

console.log("Hello")

app.get("/portfolio", (request, response) => {
    response.send(portObj);
});


// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`)
})
