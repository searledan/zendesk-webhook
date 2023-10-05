'use strict';

const express = require('express');
const app = express();
const fs = require("fs");
const dayjs = require("dayjs");
const relativeTime = require('dayjs/plugin/relativeTime')

dayjs.extend(relativeTime)
app.set("port", process.env.PORT || 4000);
app.use(express.json());

cleanFiles();

app.get('/', function (req, res) {
   res.writeHead(200, { 'Content-Type': 'application/json' });
   var response = { "response": "This is GET method." }
   console.log(response);
   console.log(req.body);
   writeFile(req.body);
   res.end(JSON.stringify(response));
})

app.get('/:id', function (req, res) {
   res.writeHead(200, { 'Content-Type': 'application/json' });
   var response = { "response": "This is GET method with id=" + req.params.id + "." }
   console.log(response);
   console.log(req.body);
   writeFile(req.body);
   res.end(JSON.stringify(response));
})

app.post('/', function (req, res) {
   res.writeHead(200, { 'Content-Type': 'application/json' });
   var response = { "response": "This is POST method." }
   console.log(response);
   console.log(req.body);
   writeFile(req.body);
   res.end(JSON.stringify(response));
})

app.put('/', function (req, res) {
   res.writeHead(200, { 'Content-Type': 'application/json' });
   var response = { "response": "This is PUT method." }
   console.log(response);
   console.log(req.body);
   writeFile(req.body);
   res.end(JSON.stringify(response));
})

app.delete('/', function (req, res) {
   res.writeHead(200, { 'Content-Type': 'application/json' });
   var response = { "response": "This is DELETE method." }
   console.log(response);
   console.log(req.body);
   writeFile(req.body);
   res.end(JSON.stringify(response));
})

var server = app.listen(app.get("port"), function () {

   var host = server.address().address
   var port = server.address().port

   console.log("Node.js API app listening at http://%s:%s", host, port)

})

function writeFile(data) {
   const date = dayjs();
   const formatted = date.format("HHmmss-DDMMYYYY");

   if (!fs.existsSync("data")) {
      fs.mkdirSync("data");
   }

   fs.writeFileSync("data\\" + formatted + ".json", JSON.stringify(data));
}

function cleanFiles() {
   fs.readdir("data", function (error, files) {
      if (!error) {
         files.forEach(function (file) {
            var fullFile = "data\\" + file;

            (fs.stat(fullFile, function (error, stats) {
               if (!error) {
                  if (dayjs().diff(dayjs(stats.birthtime), "month") >= 1) {
                     fs.rm(fullFile, function (error) {
                        if (!error) {
                           console.log("Cleaned: " + fullFile)
                        }
                        else {
                           console.log(error);
                        }
                     });
                  }
               }
               else {
                  console.log(error);
               }
            }))
         })
      }
      else {
         console.log(error);
      }
   })
}
