require('dotenv').load();

var Twitter = require('twitter');

var models = require('../models/models');


var laodTweets = function(){
    
    var client = new Twitter({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        bearer_token: process.env.TWITTER_BEARER_TOKEN
    });
    
    models.challenge.getChallenges(function(err, results){
        var last =  results.pop();


        console.log(formatDate(last.end_date));


        

        var query = { 
                    q: '#hohochallenge', 
                    fromDate: formatDate(last.start_date), 
                    toDate: formatDate(last.end_date)
                };

        client.get('search/tweets', query, function(err, tweets, response) {
            
            if (err) { 
                console.log(err)  
                return false 
            }
            
            tweets.statuses.forEach(function(tweet) {
                if (typeof tweet.entities.media !== 'undefined' && typeof tweet.retweeted_status == 'undefined' ) {
                    var tweetChallenge = {
                        challenge_id: last._id ,
                        profile_link: "https://twitter.com/"+tweet.user.screen_name,
                        img_link: tweet.entities.media[0].media_url,
                        img_profile_link: tweet.user.profile_image_url,
                        tweet_id: tweet.id_str
                    }
                
                    models.tweet.create(tweetChallenge, function(erro, result){
                        if (!erro) {
                            console.log(result);
                        } else {
                            console.log('-- Tweet already exist ... ');
                        }
                    });
                }
                
                
            });
        });
    });
}

// Private Functions
function pad(number) {
    if (number < 10) {
      return '0' + number;
    }
    return number;
}

var formatDate = function(date) {
    return date.getUTCFullYear() +
        '' + pad(date.getUTCMonth() + 1) +
        '' + pad(date.getUTCDate()) +
        '' + pad(date.getUTCHours()) +
        '' + pad(date.getUTCMinutes());
}


// Ejecution Scripts

laodTweets();

// Tareas
//  1 - VER COMO OBTENER EL LINK DEL TWEET
