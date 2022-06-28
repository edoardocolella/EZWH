const express = require('express')
const router = express.Router();
const Controller = require('../modules/logic/controller')
const Singleton = require('../modules/logic/controllerSingleton');
/** @type {Controller} */
const controller = Singleton.getInstance()

//POSITION
//GET /api/positions
router.get('/api/positions', async(req, res) => {
  
  await controller.getPositionController().getAllPositions()
    .then(positions =>  res.status(200).json(positions))
    .catch(error =>  res.status(error.code).send(error.message));

});

//POST /api/position
router.post('/api/position', async (req, res) => {

  await controller.getPositionController().createPosition(req.body)
    .then(() =>  res.status(201).end())
    .catch(error =>  res.status(error.code).send(error.message));

});

//PUT /api/position/:positionID
router.put('/api/position/:positionID', async (req, res) => {
  const param = req.params.positionID;

  await controller.getPositionController().editPositionVer1(param, req.body)
    .then(() =>  res.status(200).end())
    .catch(error =>  res.status(error.code).send(error.message));

});

//PUT /api/position/:positionID/changeID
router.put('/api/position/:positionID/changeID', async (req, res) => {
  const param = req.params.positionID;

  await controller.getPositionController().editPositionVer2(param, req.body)
    .then(() =>  res.status(200).end())
    .catch(error =>  res.status(error.code).send(error.message));

});

//DELETE /api/position/:positionID
router.delete('/api/position/:positionID', async (req, res) => {
  const param = req.params.positionID;

  await controller.getPositionController().deletePosition(param)
    .then(() =>  res.status(204).end())
    .catch(error =>  res.status(error.code).send(error.message));
});

module.exports = router;