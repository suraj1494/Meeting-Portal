const express=require('express')

const meet_crudController=require('../controllers/meet_crud')

const router=express.Router();

router.get('/',meet_crudController.getAllMeet)

router.post('/',meet_crudController.postMeet)

router.get('/getById/:id',meet_crudController.findById)

router.post('/getById/:id',meet_crudController.postById)

router.get('/getByDate/:userDate',meet_crudController.findByDate)

router.get('/getLastRecord',meet_crudController.getLastRecord);

module.exports=router;