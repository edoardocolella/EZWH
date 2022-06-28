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
    .then(skuitems => { return res.status(200).json(skuitems); })
    .catch(error => { return res.status(error.getCode()).send(error.getMessage()); });


});

//GET /api/skuitems/sku/:id
router.get('/api/skuitems/sku/:id', async (req, res) => {
  const param = req.params.id;

  await controller.getSkuItemController().getSkuItems(param)
    .then(skuitems => { return res.status(200).json(skuitems); })
    .catch(error => { return res.status(error.getCode()).send(error.getMessage()); });
});

//GET /api/skuitems/:rfid
router.get('/api/skuitems/:rfid', async (req, res) => {
  const param = req.params.rfid;

  await controller.getSkuItemController().getSkuItem(param)
    .then(skuitem => { return res.status(200).json(skuitem); })
    .catch(error => { console.log(error); return res.status(error.getCode()).send(error.getMessage()); });
});

//POST /api/skuitem
router.post('/api/skuitem', async (req, res) => {

  await controller.getSkuItemController().createSkuItem(req.body)
    .then(() => { return res.status(201).end(); })
    .catch(error => { return res.status(error.getCode()).send(error.getMessage()); });
});

//PUT /api/skuitems/:rfid
router.put('/api/skuitems/:rfid', async (req, res) => {
  const param = req.params.rfid;

  await controller.getSkuItemController().editSkuItem(param, req.body)
    .then(() => { return res.status(200).end(); })
    .catch(error => { return res.status(error.getCode()).send(error.getMessage()); });
});

//DELETE /api/skuitems/:rfid
router.delete('/api/skuitems/:rfid', async (req, res) => {
  const param = req.params.rfid;

  await controller.getSkuItemController().deleteSkuItem(param)
    .then(() => { return res.status(204).end(); })
    .catch(error => { return res.status(error.getCode()).send(error.getMessage()); });
});



module.exports = router