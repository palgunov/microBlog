const express = require("express");
const fs = require("mz/fs");
const bodyParser  = require('body-parser');
const app = express();
const port = 5000;
const messageFile =(__dirname+"/messages.txt");
async function readFile(){
    await fs.readFile(messageFile);
 }
 readFile();
app.use(express.static(__dirname + "/public/"));
app.use(bodyParser.json());
app.post("/save",(req, res) => {
   async function save(){
        await fs.writeFile(messageFile,JSON.stringify(req.body), (err) => {
            if (err) {
                console.log("Ошибка записи в файл!");
            }
        })
    };
    save();
});
app.get("/message", (req, res) => {
    async function readFile(){
        res.send(await fs.readFile(messageFile));
    }
    readFile()
});
app.listen(port , ()=>
    console.log("5000"),

);