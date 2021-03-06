var express = require("express");
var path = require('path');
var app = express();
var port = 5500;

var __dirname = "C:/Users/aarth/Documents/mongo/students/test";
// module to allow passing data in the body to the server, as well as 
// converting to json format
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
// app.use(express.static(__dirname ));





// connecting to the db
var mongoose = require("mongoose");
mongoose.Promise =
global.Promise;mongoose.connect("mongodb://localhost:27017/DnDDatabase");

// specify the schema
var characterSchema = new mongoose.Schema({
        // cInfo
        Name: String,      // done
        Race: String,      // done
        Class: String,      // done
        Owner: String,      // done
        // cStats
        XP: Number,      // done
        Level: Number,      // done
        
        HP: Number,      // done
        MaxHP: Number,      // done
        
        Speed: Number,     // done
        MoveCapacity: Number,      // done
        CarryCapacity: Number,      // done
        CarryLoad: Number, 

        HitDice: Number,      // done
        HitDieType: String,      // done
        ProficiencyBonus: Number,      // done
        InitMod: Number,       // done
        PassivePerception: Number,     // done

        Stats: {                           // done
            Strength: {
                Value: Number,
                Mod: Number
            },
            Dexterity: {
                Value: Number,
                Mod: Number
            },
            Constitution: {
                Value: Number,
                Mod: Number
            },
            Intelligence: {
                Value: Number,
                Mod: Number
            },
            Wisdom: {
                Value: Number,
                Mod: Number
            },
            Charisma: {
                Value: Number,
                Mod: Number
            }
        },
        Coins: Number,
        Inventory: [
            {
                Name: String,
                Description: String,
                Weight: Number
            }
        ],
        Weapons: [{
            Name: String,
            Description: String,
            Damage: String,
            ToHit: Number,
        }],
        Spells: [ {Name: String} ],
   }, 
   {
    versionKey: false
   },
   {
       collection: 'Characters_'
   }
   );

// creating a model from the schema
var Character = mongoose.model("Characters_", characterSchema, "Characters_");

// 'reading' endpoint
        
app.get("/", (req, res) => {
    // res.send("Hello World:");
    // res.render('ejsfile')
    res.sendFile( "C:/Users/aarth/Documents/mongo/students/test/index.html")
    // res.render('header.ejs')
});

app.get("/selectrace", (req, res) => {
    // res.send("Hello World:");
    res.sendFile( "C:/Users/aarth/Documents/mongo/students/test/selectrace.html")
});

// app.get("/stylesheet.css", (req, res) => {
//     // res.send("Hello World:");
//     res.sendFile( "C:/Users/aarth/Documents/mongo/students/test/stylesheet.css")
// });

// app.post("/selectrace.html", (req, res) => {
//     // making a new instance of the model
//     var myData = new Character(req.body);
//     myData.save()
//     .then(item => {
//         res.send("Item saved to database");
//     })
//     .catch(err => {
//         res.status(400).send("Unable to save to database");
//     });
// });

// 'creating' endpoint
app.post("/add", (req, res) => {
    // res.render("Hello World:");

    // making a new instance of the model
    var myData = new Character(req.body);
    myData.save()
    .then(item => {
        res.send("Item saved to database testtest");
        res.send("Name : ");
    })
    .catch(err => {
        res.status(400).send("Unable to save to database");
    });
});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});













// express.connect('mongodb://localhost/student_tests')   //establish connection
// express.connection
// .once('open', () => console.log('Connection Established'))
// .on('error', (error) => {
//     console.log('Warning : ' + error)
// });
