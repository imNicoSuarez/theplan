var config = require('configure');

module.exports = function(mongoose){
  var Schema = mongoose.Schema,
      ObjectId = mongoose.Schema.Types.ObjectId;
      bcrypt = require('bcrypt');

  var PeopleSchema = new Schema({
    name:  String,
    first_name: String,
    username: String,
    last_name: String,
    avatar_link: String,
    work_hours: Number,
    email: { type: String, required: true, index: { unique: true}},
    created_at: { type: Date, default: Date.now }
  });

  var People = mongoose.model('People', PeopleSchema);

  function getPeoples(filter, resultsCallback){
    filter =  filter || {};

    People.find(filter, function(err, result){
      if (resultsCallback && typeof(resultsCallback === "function")) {
        resultsCallback(err, result);
      }
    });
  }

  function getPeople(_id, resultsCallback){
    People.findById(_id, function(err, result){
      if (resultsCallback && typeof(resultsCallback === "function")) {
        resultsCallback(err, result);
      }
    });
  }

  function create(attrs, resultsCallback){
    var people = new People(attrs);
    
    people.save(function(err) {
      if (err) return resultsCallback(err, null);

      getPeople(people, resultsCallback);
    });
  }

  function update(_id, attrs, resultsCallback){
    People.findByIdAndUpdate(_id, attrs, function(err, result){
      getPeople(_id, resultsCallback);
    });
  }

  function destroy(_id, resultsCallback){
    People.findByIdAndRemove(_id, resultsCallback)
  }


  function getEndPeople(numberDays){
    var date = new Date();
    var result = numberDays * 86400000;
    date.setTime(date.getTime() + result );

    return date
  }

  var methods = {
    getPeople: getPeople,
    getPeoples: getPeoples,
    create: create,
    update: update,
    destroy: destroy
  }

  return methods;
}
