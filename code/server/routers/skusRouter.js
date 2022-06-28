const express = require('express')
const router = express.Router()
const Controller = require('../modules/logic/controller')
const Singleton = require('../modules/logic/controllerSingleton');
/** @type {Controller} */
const controller = Singleton.getInstance()


//SKU
//GET /api/skus
router.get('/api/skus', async (req, res) => {

  await controller.getSkuController().getAllSku()
    .then(skus => res.status(200).json(skus))
    .catch(error => res.status(error.code).send(error.message));



});

//GET /api/skus/:id
router.get('/api/skus/:id', async (req, res) => {
  const param = req.params.id;

  await controller.getSkuController().getSku(param)
    .then(sku => res.status(200).json(sku))
    .catch(error => res.status(error.code).send(error.message));


});

//POST /api/sku
router.post('/api/sku', async (req, res) => {

  await controller.getSkuController().createSku(req.body)
    .then(() => res.status(201).end())
    .catch(error => res.status(error.code).send(error.message));


});

//PUT /api/sku/:id
router.put('/api/sku/:id', async (req, res) => {
  const param = req.params.id;

  await controller.getSkuController().editSku(param, req.body)
    .then(() => res.status(200).end())
    .catch(error => res.status(error.code).send(error.message));
});

//PUT /api/sku/:id/position
router.put('/api/sku/:id/position', async (req, res) => {
  const param = req.params.id;

  await controller.getSkuController().setPosition(param, req.body)
    .then(() => res.status(200).end())
    .catch(error => res.status(error.code).send(error.message));
});

//DELETE /api/skus/:id
router.delete('/api/skus/:id', async (req, res) => {
  const param = req.params.id;

  await controller.getSkuController().deleteSku(param)
    .then(() => res.status(204).end())
    .catch(error => res.status(error.code).send(error.message));


});


module.exports = router;