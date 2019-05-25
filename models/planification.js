var config = require('configure');

module.exports = function(mongoose){
  var Schema = mongoose.Schema,
      ObjectId = mongoose.Schema.Types.ObjectId;
      bcrypt = require('bcrypt');

  var PlanificationSchema = new Schema({
    people_id: { type: Schema.Types.ObjectId, ref: 'People' },
    start_date: { type: Date },
    end_date: { type: Date },
  });

  var Planification = mongoose.model('Planification', PlanificationSchema);

  function getPlanifications(filter, resultsCallback){
    filter =  filter || {};

    Planification.find(filter)
        .populate('people_id')
        .exec( 
            function(err, result){
            if (resultsCallback && typeof(resultsCallback === "function")) {
                resultsCallback(err, result);
            }
    });
  }

  function getPlanification(_id, resultsCallback){
    Planification.findById(_id, function(err, result){
      if (resultsCallback && typeof(resultsCallback === "function")) {
        resultsCallback(err, result);
      }
    });
  }

  function create(attrs, resultsCallback){
    var Planification = new Planification(attrs);

    Planification.save(function(err) {
      if (err) return resultsCallback(err, null);

      getPlanification(Planification, resultsCallback);
    });
  }

  function update(_id, attrs, resultsCallback){
    Planification.findByIdAndUpdate(_id, attrs, function(err, result){
      getPlanification(_id, resultsCallback);
    });
  }

  function destroy(_id, resultsCallback){
    Planification.findByIdAndRemove(_id, resultsCallback)
  }


  function getEndPlanification(numberDays){
    var date = new Date();
    var result = numberDays * 86400000;
    date.setTime(date.getTime() + result );

    return date
  }

  var methods = {
    getPlanification: getPlanification,
    getPlanifications: getPlanifications,
    create: create,
    update: update,
    destroy: destroy
  }

  return methods;
}
