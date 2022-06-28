'use strict'

const Exceptions = require('../../routers/exceptions');
const Controller = require('./controller');
const itemDao = require('../DAOs/itemDAO');

class ItemController {
    /** @type {Controller} */
    #controller;
    constructor(controller) {
        this.#controller = controller;
    }


    /** getter function to retreive all the items
     * @throws 401 Unauthorized (not logged in or wrong permissions)
     * @throws 500 Internal Server Error (generic error).
    */
    async getAllItems() {

        /*check if the current user is authorized*/
        if (!this.#controller.isLoggedAndHasPermission("supplier"))
            throw new Exceptions(401);

        let rows = await itemDao.getAllItems()
            .catch(error => { throw error });
        return rows;


    }

    /**getter function to retreive a single item given its ID
     * @throws 401 Unauthorized (not logged in or wrong permissions)
     * @throws 404 Not Found (no item associated to id)
     * @throws 422 Unprocessable Entity (validation of id failed)
     * @throws 500 Internal Server Error (generic error).
    */
    async getItem(id, supplierId) {

        /*check if the current user is authorized */
        if (!this.#controller.isLoggedAndHasPermission("manager"))
            throw new Exceptions(401);


        //check if the id is valid
        if (this.#controller.areUndefined(id, supplierId) || this.#controller.areNotNumbers(id, supplierId)
            || !this.#controller.areAllPositiveOrZero(id)) {
            throw new Exceptions(422, "check");

        }


        const suppliers = await this.#controller.getUserController().getAllSuppliers()
            .catch(err => { throw err })


        const suppliersCode = suppliers.map(s => s.id);

        let supplierFound = false;
        for (let supCode of suppliersCode) {
            if (Number(supCode) === Number(supplierId)) {
                supplierFound = true;
            }
        }

        if (!supplierFound) {
            throw new Exceptions(404)
        }

        let row = await itemDao.getItem(id, supplierId)
            .catch(error => { throw error });

        //check if the item exists
        if (!row)
            throw new Exceptions(404)

        return row;

    }

    /**creation of a new item in the table
     * @throws 401 Unauthorized (not logged in or wrong permissions)
     * @throws 404 Not Found (Sku not found)
     * @throws 422 Unprocessable Entity (validation of request body failed or this supplier already sells an item with the same SKUId or supplier already sells an Item with the same ID)
     * @throws 503 Service Unavailable (generic error).
    */
    async createItem(body) {

        /*check if the user is authorized */
        if (!this.#controller.isLoggedAndHasPermission("supplier"))
            throw new Exceptions(401);

        const id = body["id"];
        const description = body["description"];
        const price = body["price"];
        const SKUId = body["SKUId"]
        const supplierId = body["supplierId"];


        //check if the body is valid
        if (this.#controller.areUndefined(id, description, price, SKUId, supplierId)
            || this.#controller.areNotNumbers(id, price, SKUId, supplierId)
            || !this.#controller.areAllPositiveOrZero(id, price, SKUId, supplierId))
            throw new Exceptions(422);

        //check if sku exists in the SKU table
        await this.#controller.getSkuController().getSku(SKUId)
            .catch(error => { if (error.code === 500) throw new Exceptions(503); else throw error })

        //check if the supplier already sells an item with the same SKUId

        let item = await itemDao.getItemFromSkuId(SKUId, supplierId)
            .catch(error => { throw error });
        if (item !== undefined) {
            throw new Exceptions(422);
        }

        item = await itemDao.getItem(id)
            .catch(error => { if (error.code === 500) throw new Exceptions(503); else throw error })
        if (item !== undefined) {
            throw new Exceptions(422);
        }

        await itemDao.createItem(id, description, price, SKUId, supplierId)
            .catch(error => { throw error });

    }

    /**function to edit the properties of a specific item, given its ID
     * @throws 401 Unauthorized (not logged in or wrong permissions)
     * @throws 404 Not found (Item not existing)
     * @throws 422 Unprocessable Entity (validation of request body failed)
     * @throws 503 Service Unavailable (generic error).
    */
    async editItem(id, supplierId, body) {

        /*check if the current user is authorized*/
        if (!this.#controller.isLoggedAndHasPermission("supplier"))
            throw new Exceptions(401);

        const newDescription = body["newDescription"];
        const newPrice = body["newPrice"];

        /*check if the body is valid*/
        if (this.#controller.areUndefined(newDescription, newPrice, id, supplierId)
            || this.#controller.areNotNumbers(id, supplierId, newPrice)
            || !this.#controller.areAllPositiveOrZero(newPrice))
            throw new Exceptions(422);

        await this.getItem(id, supplierId)
            .catch(error => { if (error.code === 500) throw new Exceptions(503); else throw error })

        const suppliers = await this.#controller.getUserController().getAllSuppliers()
            .catch(err => { throw err })

        const suppliersCode = suppliers.map(s => s.id);

        let supplierFound = false;

        for (let supCode of suppliersCode) {
            if (Number(supCode) === Number(supplierId)) {
                supplierFound = true;
            }
        }

        if (!supplierFound) {
            throw new Exceptions(404)
        }

        await itemDao.updateItem(newDescription, newPrice, id, supplierId)
            .catch(error => { throw error });

    }

    /**delete function to remove an item from the table, given its ID
     * @throws 401 Unauthorized (not logged in or wrong permissions)
     * @throws 422 Unprocessable Entity (validation of id failed)
     * @throws 503 Service Unavailable (generic error).
    */
    async deleteItem(id, supplierId) {

        /*check if the current user is authorized*/
        if (!this.#controller.isLoggedAndHasPermission("supplier"))
            throw new Exceptions(401);

        /*check if the id is valid*/
        if (this.#controller.areUndefined(id, supplierId) || this.#controller.areNotNumbers(id, supplierId)
            || !this.#controller.areAllPositiveOrZero(id))
            throw new Exceptions(422);


        const suppliers = await this.#controller.getUserController().getAllSuppliers()
            .catch(err => { throw err })

        const suppliersCode = suppliers.map(s => s.id);
        if (!suppliersCode.includes(Number(supplierId))) {
            throw new Exceptions(404)
        }


        await itemDao.deleteItem(id, supplierId)
            .catch((error) => { throw error });
    }


}

module.exports = ItemController;