var config = require('configure');

module.exports = function(mongoose){
  var Schema = mongoose.Schema,
      ObjectId = mongoose.Schema.Types.ObjectId;
      bcrypt = require('bcrypt');

  var TaskSchema = new Schema({
    title: String,
    estimated_time: Number,
    real_time: Number,
    end_date: { type: Date },
    client_id: { type: Schema.Types.ObjectId, ref: 'Client' },
    planification_id: { type: Schema.Types.ObjectId, ref: 'Planification' }
  });

  var Task = mongoose.model('Task', TaskSchema);

  function getTasks(filter, resultsCallback){
    filter =  filter || {};

    Task.find(filter, function(err, result){
      if (resultsCallback && typeof(resultsCallback === "function")) {
        resultsCallback(err, result);
      }
    });
  }

  function getTask(_id, resultsCallback){
    Task.findById(_id, function(err, result){
      if (resultsCallback && typeof(resultsCallback === "function")) {
        resultsCallback(err, result);
      }
    });
  }

  function create(attrs, resultsCallback){
    var Task = new Task(attrs);

    Task.save(function(err) {
      if (err) return resultsCallback(err, null);

      getTask(Task, resultsCallback);
    });
  }

  function update(_id, attrs, resultsCallback){
    Task.findByIdAndUpdate(_id, attrs, function(err, result){
      getTask(_id, resultsCallback);
    });
  }

  function destroy(_id, resultsCallback){
    Task.findByIdAndRemove(_id, resultsCallback)
  }


  function getEndTask(numberDays){
    var date = new Date();
    var result = numberDays * 86400000;
    date.setTime(date.getTime() + result );

    return date
  }

  var methods = {
    getTask: getTask,
    getTasks: getTasks,
    create: create,
    update: update,
    destroy: destroy
  }

  return methods;
}
