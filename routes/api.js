var express = require('express');
var router = express.Router();
var Todo = require('./models/model.js');
/* GET home page. */


router.get('/', function(req, res, next) {
  Todo.find().exec(function(err,doc){
    if (err) throw err;
    else{
        console.log(doc);
        res.json(doc);

    }
  }); 
  });




router.post('/',function(req,res,next){
    var task = req.body.text;//we reciece the task.text
    console.log(task);
    var newTodo = new Todo({
        task:task//
    });
    newTodo.save(function(err,doc){
        if (err) throw err;
        else{
            console.log('Saved');
            Todo.find().exec(function(err,todos){
                if (err) throw err;
                else{
                    res.json(todos);
                    
                } 
            });
        }
    });    
});
 
 router.get('/delete/:id',function(req,res,next){
    Todo.findOneAndRemove({ _id :req.params.id } , function(err){
        console.log(req.params.id);
        if (err) throw err;
        else{
            console.log('Removed');
             Todo.find().exec(function(err,doc){
                if (err) throw err;
                else{
                    res.json(doc);
                    
                } 
            });
        }
    });
 });

router.get('*',function(req,res){
    res.sendFile('./public/index.html');
});

module.exports = router;
