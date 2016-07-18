// server.js

// BASE SETUP
// =============================================================================



var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');


mongoose.connect('mongodb://localhost/restaurants');

var db = mongoose.connection;

//model
var Restaurant = require('./models/restaurant');
var Menu = require('./models/menu');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

// RUTE ZA API
// =============================================================================

var router = express.Router();

// middleware
router.use(function(req, res, next) {

    console.log('Something is happening.');
    next();
});

// provjera rute sa GET na http://localhost:8080/api
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// RUTE -------------------------------

app.use('/api', router);

// rute koje zavrsavaju sa /restaurant
// ----------------------------------------------------

router.route('/restaurant')

// stvoriti restaurant ( POST http://localhost:8080/api/restaurant)
    .post(function(req, res) {

        var restaurant = new Restaurant();
        restaurant.id = req.body.id;
        restaurant.name = req.body.name;
        restaurant.latitude = req.body.latitude;
        restaurant.longitude = req.body.longitude;

        var menu = new Menu(req.body.menu);
        menu.name = req.body.menu.name;
        menu.cost = req.body.menu.cost;
        restaurant.menu = menu.id;

        restaurant.save(function (err) {
            if (err) {
                res.send(err);
                console.log('err');
            }
            res.json({message: 'Restaurant created!'});

        });
    })
        // dohvati sve restorane GET http://localhost:8080/api/restaurant)
    .get(function (req, res) {

        Restaurant.find(function (err, restaurant) {
            if (err)
                res.send(err);

            res.json(restaurant);
        });
    });


    router.route('/restaurant/:restaurant_id')

    // dohvati restoran sa tim id-em (accessed at GET http://localhost:8080/api/restaurant/:restaurant_id)
    .get(function(req, res) {

        Restaurant.findById(req.params.restaurant_id, function(err, restaurant) {
            if (err)
                res.send(err);

            res.json(restaurant);
        });
    })

    //  update sa id-em (accessed at PUT http://localhost:8080/api/restaurant/:restaurant_id)
    .put(function(req, res) {

        Restaurant.findById(req.params.restaurant_id, function(err, restaurant) {

            if (err)
                res.send(err);

            restaurant.name = req.body.name;
            restaurant.latitude = req.body.latitude;
            restaurant.longitude = req.body.longitude;

            var menu = new Menu(req.body.menu);
            menu.name = req.body.menu.name;
            menu.cost = req.body.menu.cost;
            restaurant.menu = menu.id;

            restaurant.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Restaurant updated!' });
            });

        });
    })

    // izbrisi restoran s ovim id-em (accessed at DELETE http://localhost:8080/api/restaurant/:restaurant_id)
    .delete(function(req, res) {
        Restaurant.remove({
            _id: req.params.restaurant_id
        }, function(err, restaurant) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

// START SERVERA
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);