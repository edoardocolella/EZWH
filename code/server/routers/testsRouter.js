const express = require('express')
const router = express.Router()
const Controller = require('../modules/logic/controller')
const Singleton = require('../modules/logic/controllerSingleton');
/** @type {Controller} */
const controller = Singleton.getInstance()

//TEST DESCRIPTOR
//GET /api/testDescriptors
router.get('/api/testDescriptors', async (req, res) => {

  await controller.getTestDescriptorController().getAllTestDescriptors()
    .then(testDescriptors => res.status(200).json(testDescriptors))
    .catch(error => res.status(error.code).send(error.message));
});


//GET /api/testDescriptors/:id
router.get('/api/testDescriptors/:id', async (req, res) => {
  const param = req.params.id;

  await controller.getTestDescriptorController().getTestDescriptor(param)
    .then(testDescriptor => res.status(200).json(testDescriptor))
    .catch(error => res.status(error.code).send(error.message));
});

//POST /api/testDescriptor
router.post('/api/testDescriptor', async (req, res) => {

  await controller.getTestDescriptorController().createTestDescriptor(req.body)
    .then(() => res.status(201).end())
    .catch(error => res.status(error.code).send(error.message));
});

//PUT /api/testDescriptor/:id
router.put('/api/testDescriptor/:id', async (req, res) => {
  const param = req.params.id;

  await controller.getTestDescriptorController().editTestDescriptor(param, req.body)
    .then(() => res.status(200).end())
    .catch(error => res.status(error.code).send(error.message));
});

//DELETE /api/testDescriptor/:id
router.delete('/api/testDescriptor/:id', async (req, res) => {
  const param = req.params.id;

  await controller.getTestDescriptorController().deleteTestDescriptor(param)
    .then(() => res.status(204).end())
    .catch(error => res.status(error.code).send(error.message));
});



//TEST RESULT
//GET /api/skuitems/:rfid/testResults
router.get('/api/skuitems/:rfid/testResults', async (req, res) => {
  const param = req.params.rfid;

  await controller.getTestResultController().getTestResults(param)
    .then(test => res.status(200).json(test))
    .catch(error => res.status(error.code).send(error.message));
});

//GET /api/skuitems/:rfid/testResults/:id
router.get('/api/skuitems/:rfid/testResults/:id', async (req, res) => {
  const paramRfid = req.params.rfid;
  const paramId = req.params.id;

  await controller.getTestResultController().getTestResult(paramRfid, paramId)
    .then(test => res.status(200).json(test))
    .catch(error => res.status(error.code).send(error.message));
});

//POST /api/skuitems/testResult
router.post('/api/skuitems/testResult', async (req, res) => {

  await controller.getTestResultController().createTestResult(req.body)
    .then(test => res.status(201).json(test))
    .catch(error => res.status(error.code).send(error.message));
});

//PUT /api/skuitems/:rfid/testResult/:id
router.put('/api/skuitems/:rfid/testResult/:id', async (req, res) => {
  const paramRfid = req.params.rfid;
  const paramId = req.params.id;

  await controller.getTestResultController().editTestResult(paramRfid, paramId, req.body)
    .then(test => res.status(200).json(test))
    .catch(error => res.status(error.code).send(error.message));
});

//DELETE /api/skuitems/:rfid/testResult/:id
router.delete('/api/skuitems/:rfid/testResult/:id', async (req, res) => {
  const paramRfid = req.params.rfid;
  const paramId = req.params.id;

  await controller.getTestResultController().deleteTestResult(paramRfid, paramId)
    .then(test => res.status(204).json(test))
    .catch(error => res.status(error.code).send(error.message));
});


module.exports = router