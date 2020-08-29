var express = require("express");
var app = express();
var port = 3000;
// module to allow passing data in the body to the server, as well as 
// converting to json format
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));


// connecting to the db
var mongoose = require("mongoose");
mongoose.Promise =
global.Promise;mongoose.connect("mongodb://localhost:27017/dnd_demo");

// specify the schema
var characterSchema = new mongoose.Schema({
    // cInfo
    cName: String,
    cRace: String,
    cClass: String,
    cOwner: String,
    // cStats
    cXP: Number,
    cLevel: Number,
    
    cHP: Number,
    cMaxHP: Number,
    
    cSpeed: Number,
    cMoveCapacity: Number,
    cCarryCapacity: Number,

    cHitDice: Number,
    cHitDieType: String,
    cProficiencyBonus: Number,
    cInitMod: Number,
    cPassivePerception: Number,

    cStats: {
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
    cCoins: Number,
    
   }, {
    versionKey: false
   }
   );

// creating a model from the schema
var Character = mongoose.model("Character", characterSchema);

// 'reading' endpoint
app.get("/", (req, res) => {
    // res.send("Hello World:");
    res.sendFile( "C:/Users/aarth/Documents/mongo/students/test/index.html")
});

// 'creating' endpoint
app.post("/addname", (req, res) => {
    // making a new instance of the model
    var myData = new Character(req.body);
    myData.save()
    .then(item => {
        res.send("Item saved to database");
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
