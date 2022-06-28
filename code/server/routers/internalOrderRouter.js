const express = require('express');
const router = express.Router()

const Controller = require('../modules/logic/controller')
const Singleton = require('../modules/logic/controllerSingleton');
/** @type {Controller} */
const controller = Singleton.getInstance()

router.get('/api/internalOrders', async (req, res) => {

  await controller.getInternalOrderController().getAllInternalOrders()
    .then((orders) => res.status(200).json(orders))
    .catch(error => res.status(error.code).send(error.message));

});

router.get('/api/internalOrdersIssued', async (req, res) => {

  await controller.getInternalOrderController().getIssuedInternalOrders()
    .then((orders) => res.status(200).json(orders))
    .catch(error => res.status(error.code).send(error.message));
});

router.get('/api/internalOrdersAccepted', async (req, res) => {

  await controller.getInternalOrderController().getAcceptedInternalOrders()
    .then((orders) => res.status(200).json(orders))
    .catch(error => res.status(error.code).send(error.message));
});

router.get('/api/internalOrders/:id', async (req, res) => {
  const param = req.params.id;

  await controller.getInternalOrderController().getInternalOrder(param)
    .then((orders) => res.status(200).json(orders))
    .catch(error => res.status(error.code).send(error.message));
});

router.post('/api/internalOrders', async (req, res) => {

  await controller.getInternalOrderController().createInternalOrder(req.body)
    .then(() => res.status(201).end())
    .catch(error => res.status(error.code).send(error.message));
});


router.put('/api/internalOrders/:id', async (req, res) => {
  const param = req.params.id;

  await controller.getInternalOrderController().editInternalOrder(param, req.body)
    .then(() => res.status(200).end())
    .catch(error => res.status(error.code).send(error.message));
});

router.delete('/api/internalOrders/:id', async (req, res) => {
  const param = req.params.id;

  await controller.getInternalOrderController().deleteInternalOrder(param)
    .then(() => res.status(204).end())
    .catch(error => res.status(error.code).send(error.message));

});


module.exports = router;