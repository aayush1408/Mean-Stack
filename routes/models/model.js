var mongoose =  require('mongoose');
var connect = mongoose.connect('mongodb://localhost/todom');
var db = mongoose.connection;

var todoSchema = mongoose.Schema({
    task:{type:String}
});

var Todo = module.exports = mongoose.model('Todo',todoSchema);
