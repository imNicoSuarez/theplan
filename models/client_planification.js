var config = require('configure');

module.exports = function(mongoose){
  var Schema = mongoose.Schema,
      ObjectId = mongoose.Schema.Types.ObjectId;
      bcrypt = require('bcrypt');

  var ClientPlanificationSchema = new Schema({
    client_id: { type: Schema.Types.ObjectId, ref: 'Client' },
    planification_id: { type: Schema.Types.ObjectId, ref: 'Planification' }
  });

  var ClientPlanification = mongoose.model('ClientPlanification', ClientPlanificationSchema);

  function getClientPlanifications(filter, resultsCallback){
    filter =  filter || {};

    ClientPlanification.find(filter)
        .populate('client_id')
        .exec( 
            function(err, result){
            if (resultsCallback && typeof(resultsCallback === "function")) {
                resultsCallback(err, result);
            }
    });
  }

  function getClientPlanification(_id, resultsCallback){
    ClientPlanification.findById(_id, function(err, result){
      if (resultsCallback && typeof(resultsCallback === "function")) {
        resultsCallback(err, result);
      }
    });
  }

  function create(attrs, resultsCallback){
    var ClientPlanification = new ClientPlanification(attrs);

    ClientPlanification.save(function(err) {
      if (err) return resultsCallback(err, null);

      getClientPlanification(ClientPlanification, resultsCallback);
    });
  }

  function update(_id, attrs, resultsCallback){
    ClientPlanification.findByIdAndUpdate(_id, attrs, function(err, result){
      getClientPlanification(_id, resultsCallback);
    });
  }

  function destroy(_id, resultsCallback){
    ClientPlanification.findByIdAndRemove(_id, resultsCallback)
  }


  function getEndClientPlanification(numberDays){
    var date = new Date();
    var result = numberDays * 86400000;
    date.setTime(date.getTime() + result );

    return date
  }

  var methods = {
    getClientPlanification: getClientPlanification,
    getClientPlanifications: getClientPlanifications,
    create: create,
    update: update,
    destroy: destroy
  }

  return methods;
}
