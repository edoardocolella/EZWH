const express = require('express');
const router = express.Router();
const Controller = require('../modules/logic/controller')
const Singleton = require('../modules/logic/controllerSingleton');
/** @type {Controller} */
const controller = Singleton.getInstance()

//ReturnOrder Requests
router.get('/api/returnOrders', async (req, res) => {

    await controller.getReturnOrderController().getAllReturnOrders()
        .then(returnOrders => res.status(200).json(returnOrders))
        .catch(error => res.status(error.code).send(error.message));
});


router.get('/api/returnOrders/:id', async (req, res) => {
    const param = req.params.id;

    await controller.getReturnOrderController().getReturnOrder(param)
        .then(returnOrder => res.status(200).json(returnOrder))
        .catch(error => res.status(error.code).send(error.message));
});



router.post('/api/returnOrder', async (req, res) => {

    await controller.getReturnOrderController().createReturnOrder(req.body)
        .then(() => res.status(201).end())
        .catch(error => res.status(error.code).send(error.message));
});

router.delete('/api/returnOrder/:id', async (req, res) => {
    const param = req.params.id;

    await controller.getReturnOrderController().deleteReturnOrder(param)
        .then(() => res.status(204).end())
        .catch(error => res.status(error.code).send(error.message));
});



module.exports = router;