const express = require('express')
const router = express.Router()
const Controller = require('../modules/logic/controller')
const Singleton = require('../modules/logic/controllerSingleton');
/** @type {Controller} */
const controller = Singleton.getInstance()

//GET /api/items
router.get('/api/items', async (req, res) => {

  await controller.getItemController().getAllItems()
    .then(items => res.status(200).json(items))
    .catch(error => res.status(error.code).send(error.message));
});

//GET /api/items/:id/:supplierId
router.get('/api/items/:id/:supplierId', async (req, res) => {
  const itemId = req.params.id;
  const supplierId = req.params.supplierId;

  await controller.getItemController().getItem(itemId, supplierId)
    .then((item) => res.status(200).json(item))
    .catch(error => res.status(error.code).send(error.message));
});

//POST /api/item
router.post('/api/item', async (req, res) => {

  await controller.getItemController().createItem(req.body)
    .then(() => res.status(201).end())
    .catch(error => res.status(error.code).send(error.message));
});

//PUT /api/item/:id/:supplierId
router.put('/api/item/:id/:supplierId', async (req, res) => {
  const itemId = req.params.id;
  const supplierId = req.params.supplierId;

  await controller.getItemController().editItem(itemId, supplierId, req.body)
    .then(() => res.status(200).end())
    .catch(error => res.status(error.code).send(error.message));
});

//DELETE /api/items/:id/:supplierId
router.delete('/api/items/:id/:supplierId', async (req, res) => {
  const itemId = req.params.id;
  const supplierId = req.params.supplierId;

  await controller.getItemController().deleteItem(itemId, supplierId)
    .then(() => res.status(204).end())
    .catch(error => res.status(error.code).send(error.message));
});

module.exports = router;