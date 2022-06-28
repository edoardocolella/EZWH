const express = require('express')
const router = express.Router()
const Controller = require('../modules/logic/controller')
const Singleton = require('../modules/logic/controllerSingleton');
/** @type {Controller} */
const controller = Singleton.getInstance()

router.get('/api/restockOrders', async (req, res) => {

  await controller.getRestockOrderController().getAllRestockOrders()
    .then(restockOrders => res.status(200).json(restockOrders))
    .catch(error => res.status(error.code).send(error.message));
});

router.get('/api/restockOrders/:id', async (req, res) => {
  const param = req.params.id;

  await controller.getRestockOrderController().getRestockOrder(param)
    .then(restockOrder => res.status(200).json(restockOrder))
    .catch(error => res.status(error.code).send(error.message));
});

router.get('/api/restockOrders/:id/returnItems', async (req, res) => {
  const param = req.params.id;

  await controller.getRestockOrderController().getRestockOrderToBeReturned(param)
    .then(restockOrder => res.status(200).json(restockOrder))
    .catch(error => res.status(error.code).send(error.message));
});


router.get('/api/restockOrdersIssued', async (req, res) => {

  await controller.getRestockOrderController().getIssuedRestockOrders()
    .then(restockOrder => res.status(200).json(restockOrder))
    .catch(error => res.status(error.code).send(error.message));
});


router.post('/api/restockOrder', async (req, res) => {

  await controller.getRestockOrderController().createRestockOrder(req.body)
    .then(() => res.status(201).end())
    .catch(error => res.status(error.code).send(error.message));
});

router.put('/api/restockOrder/:id', async (req, res) => {
  const param = req.params.id

  await controller.getRestockOrderController().editRestockOrder(param, req.body)
    .then(() => res.status(200).end())
    .catch(error => res.status(error.code).send(error.message));
})

router.put('/api/restockOrder/:id/skuItems', async (req, res) => {
  const param = req.params.id;

  await controller.getRestockOrderController().addSkuItemsToRestockOrder(param, req.body)
    .then(() => res.status(200).end())
    .catch(error => res.status(error.code).send(error.message));
});


router.put('/api/restockOrder/:id/transportNote', async (req, res) => {
  const param = req.params.id;

  await controller.getRestockOrderController().addTransportNote(param, req.body)
    .then(() => res.status(200).end())
    .catch(error => res.status(error.code).send(error.message));
});


router.delete('/api/restockOrder/:id', async (req, res) => {
  const param = req.params.id;

  await controller.getRestockOrderController().deleteRestockOrder(param)
    .then(() => res.status(204).end())
    .catch(error => res.status(error.code).send(error.message));
});

module.exports = router