//https://github.com/Chan11/node-yelp-fusion (3 yrs old)

const Yelp = require('node-yelp-fusion');
const yelp = new Yelp({id: Meteor.settings.public.keys.yelp.client_id , secret: Meteor.settings.public.keys.yelp.client_secret });

const yelpSearchByPhone = function(phone) {
    check(phone, String);
    // check(location, String);
    // let latLng = location.split(",");
    // let lat = Number(latLng[0]);
    // let lng = Number(latLng[1]);

    yelp.phoneSearch(`phone=+1${phone}`)
    .then(function(result){
    if (result.businesses[0]) {
        yelpObj = result.businesses[0]
        
        yelpID = yelpObj.id;
        console.log(yelpID);
        return yelpID;
    } else {
        // NO RESULTS
        console.log('NO YELP_ID FOR ' + name);
        return false;
    }
    });
};

const yelpReviewsById = function(yelp_id) {
    check(yelp_id, String);

    yelp.reviews(yelp_id)
    .then(function(result){
        console.log(result);
        return result;
    });
}


///https://github.com/tonybadguy/yelp-fusion

