const express = require('express');
const oracledb = require('oracledb');
const { run } = require("./connect");
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.set('views', './views');
app.set('view engine', 'ejs');
run();
app.get("/", async (req, res)=>{
    res.render('dbe');
})
app.post("/add", async (req, res)=>{
    try {
        console.log(req.body);
        console.log(req.body.username, req.body.email, req.body.phone,req.body.startloc,req.body.destloc,req.body.depart,req.body.return);
        const connection = await oracledb.getConnection();
        const result = await connection.execute(
          "INSERT INTO transport (tname,temail,tphone,startloc,destloc,depart,return) VALUES (:1, :2, :3,:4,:5,:6,:7)",
          [req.body.name, req.body.email, req.body.phone,req.body.startloc,req.body.destloc,req.body.depart,req.body.return]
        );
            
        await connection.commit();
        await connection.close();
        console.log("Data inserted into Oracle Database");
        res.redirect('/add');
       
      } catch (err) {
        console.error(err.message);

      }
  
})
app.get("/add", async (req, res)=>{
    try {
        console.log(req.body);
        const connection = await oracledb.getConnection();
        const result = await connection.execute(
          "SELECT * FROM transport"
        );

        const rows=result.rows.map((row)=>({
            name:row[0],
            email:row[1],
            phone:row[2],
            startloc:row[3],
            destloc:row[4],
            depart:row[5],
            return:row[6]
        }));
        console.log(rows);
        await connection.close();
        res.render('show',{data:rows})
    
      } catch (err) {
        console.error(err.message);
     
      }
  
})
app.listen(5000, ()=> console.log("Example app listening on port 5000!"));
