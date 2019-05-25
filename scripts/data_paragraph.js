var models = require('../models/models');


var createPeople = function(people) {

    var peopleData = {
        "name":  people.first_name + " " + people.last_name,
        "first_name": people.first_name,
        "last_name": people.last_name,
        "username": people.username,
        "avatar_link": people.avatar_link,
        "work_hours": people.work_hours,
        "email":people.email
    }

    models.people.create(peopleData, function(err, result){
        if (err) {
            console.log(result + "- Error :", err)
            return false
        } else {
            console.log(result + "- Success")
            return true
        }
    });

}

var generatePeople = function() {
    var peopels = [ {first_name:"Nicolas", last_name: "Suarez", 
                       username: "nsuarez", avatar_link:"https://d17dednewomw88.cloudfront.net/assets/images/team/nicolas-suarez-f482f4a6.jpg",
                       email: "nicolas.suarez@moove-it.com", work_hours: 40 },
                    {first_name:"Jordi", last_name: "Trias", 
                       username: "jtrias", avatar_link:"https://d17dednewomw88.cloudfront.net/assets/images/team/jordi-trias-b1dcb386.jpg",
                       email: "jordi.trias@moove-it.com", work_hours: 40 },
                    {first_name:"Gonzalo", last_name: "Vilar", 
                       username: "gvilar", avatar_link:"https://d17dednewomw88.cloudfront.net/assets/images/team/gonzalo-vilar-755f9e15.jpg",
                       email: "gonzalo.vilar@moove-it.com", work_hours: 40 },
                    {first_name:"Guzman", last_name: "Iglesias", 
                       username: "giglesias", avatar_link:"https://d17dednewomw88.cloudfront.net/assets/images/team/guzman-iglesias-b3b1e4a8.jpg",
                       email: "gonzalo.vilar@moove-it.com", work_hours: 40 },
                    {first_name:"Federico", last_name: "Hurst", 
                       username: "fhurst", avatar_link:"http://s3cdn-test-lookbooknu.netdna-ssl.com/files/users/large/3235557_10006563_10203353392854742_993632380_n.jpg?1404479436",
                       email: "federico.hurst@moove-it.com", work_hours: 20 }
                     ];

    for (let i = 0; i < peopels.length; i++) {
        const element = peopels[i];

        createPeople(element);
        
    }

}


generatePeople();
