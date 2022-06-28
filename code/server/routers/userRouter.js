const express = require('express')
const router = express.Router()
const Controller = require('../modules/logic/controller')
const Singleton = require('../modules/logic/controllerSingleton');
/** @type {Controller} */
const controller = Singleton.getInstance()
//USER
//GET /api/userinfo
router.get('/api/userinfo', async (req, res) => {

  let user;
  try {
    user = controller.getUserController().getUser()
  } catch (error) {
    return res.status(error.code).send(error.message);
  }
  return res.status(200).json(user);

});

//GET /api/suppliers
router.get('/api/suppliers', async (req, res) => {

  await controller.getUserController().getAllSuppliers()
    .then((suppliers) => res.status(200).json(suppliers))
    .catch(error => res.status(error.code).send(error.message));
});

//GET /api/users
router.get('/api/users', async (req, res) => {

  await controller.getUserController().getAllUsers()
    .then((users) => res.status(200).json(users))
    .catch(error => res.status(error.code).send(error.message));

});

//POST /api/newUser
router.post('/api/newUser', async (req, res) => {

  await controller.getUserController().createUser(req.body)
    .then(() => res.status(201).end())
    .catch(error => res.status(error.code).send(error.message));
});

//POST /api/managerSessions
router.post('/api/managerSessions', async (req, res) => {

  await controller.getUserController().login(req.body, "manager")
    .then((value) => res.status(200).json(value))
    .catch(error => res.status(error.code).send(error.message));
});

//POST /api/customerSessions
router.post('/api/customerSessions', async (req, res) => {

  await controller.getUserController().login(req.body, "customer")
    .then(() => res.status(200).end())
    .catch(error => res.status(error.code).send(error.message));
});

//POST /api/supplierSessions
router.post('/api/supplierSessions', async (req, res) => {

  await controller.getUserController().login(req.body, "supplier")
    .then(() => res.status(200).end())
    .catch(error => res.status(error.code).send(error.message));
});

//POST /api/clerkSessions
router.post('/api/clerkSessions', async (req, res) => {

  await controller.getUserController().login(req.body, "clerk")
    .then(() => res.status(200).end())
    .catch(error => res.status(error.code).send(error.message));
});

//POST /api/qualityyEmployeeSessions
router.post('/api/qualityEmployeeSessions', async (req, res) => {

  await controller.getUserController().login(req.body, "qualityEmployee")
    .then(() => res.status(200).end())
    .catch(error => res.status(error.code).send(error.message));
});

//POST /api/deliveryEmployeeSessions
router.post('/api/deliveryEmployeeSessions', async (req, res) => {

  await controller.getUserController().login(req.body, "deliveryEmployee")
    .then(() => res.status(200).end())
    .catch(error => res.status(error.code).send(error.message));
});

//POST /api/logout
router.post('/api/logout', async (req, res) => {

  try {
    controller.getUserController().logout()
  } catch (error) {
    return res.status(error.code).send(error.message);
  }
  return res.status(200).end()

});


//PUT /api/users/:username
router.put('/api/users/:username', async (req, res) => {
  const param = req.params.username;

  await controller.getUserController().editUser(param, req.body)
    .then(() => res.status(200).end())
    .catch(error => res.status(error.code).send(error.message));
});

//DELETE /api/users/:username/:type
router.delete('/api/users/:username/:type', async (req, res) => {
  const paramUsername = req.params.username;
  const paramType = req.params.type;

  await controller.getUserController().deleteUser(paramUsername, paramType)
    .then(() => res.status(204).end())
    .catch(error => res.status(error.code).send(error.message));
});



module.exports = router