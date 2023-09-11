var express = require('express');
var router = express.Router();
const userModel = require("../models/userModel");
const taskModel = require("../models/taskModel");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/signup', function(req, res, next){
  res.render('signup', { title: 'sign-up'})
})

router.post('/signup', async function(req, res, next){
  try {
    const newuser = new userModel(req.body)
    await newuser.save()
    res.redirect("/signin")
  } catch (error) {
    res.send(error)
  }
})


router.get('/signin', function(req, res, next){
  res.render('signin', { title: 'sign-in'})
})

router.post("/signin", async function (req, res, next) {
  try {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });
    if(user === null) {
      return res.send(`user not found. <a href="/signin">signin</a>`);
    }
    if (user.password !== password) {
      return res.send(`Incorrect password. <a href="/signin">signin</a>`);
    }
  // res.send(user)
    res.redirect("/tasklist");
  
  } catch (error) {
    res.send(error);
  }
  });

router.get('/createtask', function(req, res, next){
  res.render('createtask', { title: 'createtask'})
})

router.post('/createtask', async function(req, res, next){
try {
  const {task, details, datetask } = req.body;
  const sam = new taskModel ({ task, details, datetask });
  
  const result = await sam.save()
  console.log(result);

  res.redirect("/tasklist")

} catch (error) {
  res.send(error)
}
})

router.get("/updatetask/:id", async function (req, res, next) {
  try {
    const task = await taskModel.findById(req.params.id);
    res.render("updatetask", { title: "update", task})
  } catch (error) {
    res.send(error);
  }
  });
  
  router.post("/updatetask/:id", async function (req, res, next) {
    try {
      const task = await taskModel.findByIdAndUpdate(req.params.id, req.body);
      res.redirect("/tasklist")
    } catch (error) {
      res.send(error);
    }
    });

router.get('/tasklist', async function(req, res, next){
try {
  const dets = await taskModel.find();
  res.render('tasklist', { title: 'task-list', dets})

} catch (error) {
  res.send(error)
}
})


router.get("/delete/:id", async function(req, res, next) {
  try {
    const users = await taskModel.findByIdAndDelete(req.params.id);
    res.redirect("/tasklist");

  } catch (error) {
    res.send(error);
  }
});



module.exports = router;
