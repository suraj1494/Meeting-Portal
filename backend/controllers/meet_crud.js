const meet =require('../models/meet_modal')


exports.getAllMeet=async (req,res,next)=>{
    try{
        const [allMeet]=await meet.fetchAll();
        res.status(200).json(allMeet)
    } catch(err){
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err);
    }
};

exports.postMeet = async (req, res, next) => {
    try {
      // console.log("hello")
      // console.log(req.body)
      const postResponse = await meet.post(req.body);
      // console.log("posting response")
      // console.log(postResponse)
      res.status(201).json(postResponse);
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
};

exports.findById = async (req, res, next) => {
  let id = req.params.id;  
  try {
    const [respo] = await meet.itemSearch(id);
    res.status(200).json(respo);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postById = async (req, res, next) => {
  let id=req.params.id;
  // console.log("logging value of id")
  id = parseInt(id)
  // console.log(typeof(id))
  try {
    const postResponse = await meet.postItem(req.body,id);
    res.status(201).json(postResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.findByDate = async (req, res, next) => {
  let userDate = req.params.userDate
  try {
    const [respo] = await meet.dateSearch(userDate);
    res.status(201).json(respo);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};


exports.getLastRecord = async (req, res, next) => {
  try {
    const [respo] = await meet.getLastRecord()
    res.status(201).json(respo);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

