var models = require('../models/models');
var mail = require('../lib/services/sendEmail');

var fs = require('fs');
var async = require('async');




var getParagraph = function(callback){
    var data = {};
    models.paragraph.getParagraphs({ element_type: "Plataform"}, function(err, plataform){
        if (err) {
          callback(null, err)
        } else {
            data.plataform = plataform;
            models.paragraph.getParagraphs({ element_type: "Object 1"}, function(err, obj1){
                if (err) {
                  callback(null, err);
                } else {
                  data.obj1 = obj1;
                  models.paragraph.getParagraphs({ element_type: "Object 2"}, function(err, obj2){
                    if (err) {
                    callback(null, err);
                    } else {
                    data.obj2 = obj2;
                    callback(data, null);
                    }
                  });
                
                }
            });
        }
    });
}


var randomizer = function(arry) {
    var randno = Math.floor ( Math.random() * arry.length );
    return arry[randno];
}

var createChallenge = function() {
    getParagraph(function(paragraph, err){
        if (err) {
            console.log(err)
            return false
        } else {   
            var pp = {plataform: randomizer(paragraph.plataform),
                      obj1: randomizer(paragraph.obj1),
                      obj2: randomizer(paragraph.obj2)}

            var  challenge ={
                    "plataform_id":  pp.plataform._id ,
                    "object_one_id": pp.obj1._id,
                    "object_two_id": pp.obj2._id
                }
            async.nextTick(function() {    
                models.challenge.create(challenge, function(erro, result){
                    if (erro) {
                        console.log(erro)
                        return false
                    } else {
                        models.subscription.getSubscriptions({}, function(err, result){
                            console.log('antes:' + pp )

                            for (let i = 0; i < result.length; i++) {
                                const element = result[i];
                                console.log(element);
                                async.nextTick(function() {
                                    mail.challengeEmail(pp, element, function(err, json){
                                        console.log(result)
                                    });   
                                });   
                            }
                        })
                    
                    }
                });
            });
           return false
        }
    })
}



createChallenge();

