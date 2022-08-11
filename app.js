const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(express.static("public"));
app.use(express.static("public/fabric"));
// Bodyparser Middleware
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req, res) =>{
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) =>{
    var firstname = req.body.fname;
    var lastname= req.body.lname;
    var email = req.body.email;

    var data = {
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME: firstname,
                    LNAME: lastname
                }
            }
        ]
    };

    var jsonData = JSON.stringify(data);

// console.log(firstname, lastname, email);

    var option = {
        url: "https://us8.api.mailchimp.com/3.0/lists/ac647ba04f",
        method: "POST",
        headers:{
            Authorization:'auth 468ab6ac36ecdf7f91463261d02d55fb-us8'
        },
        body: jsonData
    };

    request(option, function (error, response, body) {
        if(error){
            res.send("Sorry!! There is an error in the server, Please try latter.");
        } else{
            if(response.statusCode===200){
                res.sendFile(__dirname+ "/success.html");
            }else{
                
                res.sendFile(__dirname + "/failure.html");
            }
        }
    });

});

// To redirect the page 

app.post("/failure", (req,res)=>{
    res.redirect("/");
})

app.post("/success",(req,res)=>{
    res.sendFile(__dirname + "/index.html");
})

app.listen(3000, () => {
    console.log("server is running at port 3000");
})              


// ac647ba04f


// 468ab6ac36ecdf7f91463261d02d55fb-us8

