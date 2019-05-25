var config = require('configure');



module.exports = function(mongoose){

  var Schema = mongoose.Schema,
      ObjectId = mongoose.Schema.Types.ObjectId;
      bcrypt = require('bcrypt');

  var ClientSchema = new Schema({
    name: String,
    client_type: String,
    hours_available: Number,
    hours_consumed: Number,
    pm_name: String,
    pm_email: String
  });

  var Client = mongoose.model('Client', ClientSchema);

  function getClients(filter, resultsCallback){
    filter =  filter || {};

    Client.find(filter)
      .populate('plataform_id')
      .populate('object_one_id')
      .populate('object_two_id').exec(
      function(err, result){
        if (resultsCallback && typeof(resultsCallback === "function")) {
          resultsCallback(err, result);
        }
    });
  }

  function getClient(_id, resultsCallback){
    Client.findById(_id, function(err, result){
      if (resultsCallback && typeof(resultsCallback === "function")) {
        resultsCallback(err, result);
      }
    });
  }

  function create(attrs, resultsCallback){
    var Client = new Client(attrs);

    Client.save(function(err) {
      if (err) return resultsCallback(err, null);

      getClient(Client, resultsCallback);
    });
  }

  function update(_id, attrs, resultsCallback){
    Client.findByIdAndUpdate(_id, attrs, function(err, result){
      getClient(_id, resultsCallback);
    });
  }

  function destroy(_id, resultsCallback){
    Client.findByIdAndRemove(_id, resultsCallback)
  }


  function getEndClient(numberDays){
    var date = new Date();
    var result = numberDays * 86400000;
    date.setTime(date.getTime() + result );

    return date
  }

  var methods = {
    getClient: getClient,
    getClients: getClients,
    create: create,
    update: update,
    destroy: destroy
  }

  return methods;
}
