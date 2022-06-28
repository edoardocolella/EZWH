const express = require('express')
const router = express.Router()
const Controller = require('../modules/logic/controller')
const Singleton = require('../modules/logic/controllerSingleton');
/** @type {Controller} */
const controller = Singleton.getInstance()

//SKU ITEM

//GET /api/skuitems
router.get('/api/skuitems', async (req, res) => {

  await controller.getSkuItemController().getAllSkuItems()
    .then(skuitems => res.status(200).json(skuitems))
    .catch(error => res.status(error.code).send(error.message));


});

//GET /api/skuitems/sku/:id
router.get('/api/skuitems/sku/:id', async (req, res) => {
  const param = req.params.id;

  await controller.getSkuItemController().getSkuItems(param)
    .then(skuitems => res.status(200).json(skuitems))
    .catch(error => res.status(error.code).send(error.message));
});

//GET /api/skuitems/:rfid
router.get('/api/skuitems/:rfid', async (req, res) => {
  const param = req.params.rfid;

  await controller.getSkuItemController().getSkuItem(param)
    .then(skuitem => res.status(200).json(skuitem))
    .catch(error => res.status(error.code).send(error.message));
});

//POST /api/skuitem
router.post('/api/skuitem', async (req, res) => {

  await controller.getSkuItemController().createSkuItem(req.body)
    .then(() => res.status(201).end())
    .catch(error => res.status(error.code).send(error.message));
});

//PUT /api/skuitems/:rfid
router.put('/api/skuitems/:rfid', async (req, res) => {
  const param = req.params.rfid;

  await controller.getSkuItemController().editSkuItem(param, req.body)
    .then(() => res.status(200).end())
    .catch(error => res.status(error.code).send(error.message));
});

//DELETE /api/skuitems/:rfid
router.delete('/api/skuitems/:rfid', async (req, res) => {
  const param = req.params.rfid;

  await controller.getSkuItemController().deleteSkuItem(param)
    .then(() => res.status(204).end())
    .catch(error => res.status(error.code).send(error.message));
});



module.exports = router