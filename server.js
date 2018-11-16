const express = require("express");
const fs = require("mz/fs");
const app = express();
const port = 5000;
const messageFile =(__dirname+"/messages.txt");
async function readFile(){
    await fs.readFileSync(messageFile);
 }
 readFile();
app.use(express.static(__dirname + "/public/"));
app.get("/save", (req, res) => {
   async function save(){
        res.send(await fs.writeFile(messageFile, JSON.stringify(req.query.message), (err) => {
            if (err) {
                console.log("Ошибка записи в файл!");
            }
        }))
    }
    save();
});
app.get("/message", (req, res) => {
    async function readFile(){
        res.send(await fs.readFileSync(messageFile));
    }
    readFile()
});
app.listen(port , ()=>
    console.log("5000"),

);