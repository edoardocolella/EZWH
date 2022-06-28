'use strict'

//EZWH - Software Engineering - Group 25

const PositionController = require("./positionController");
const SkuController = require("./skuController");
const UserController = require("./userController");
const TestResultController = require("./testResultController");
const TestDescriptorController = require("./testDescriptorController");
const InternalOrderController = require("./internalOrderController");
const RestockOrderController = require("./restockOrderController");
const ReturnOrderController = require("./returnOrderController");
const ItemController = require("./itemController");
const DBManager = require("../database/databaseManager");
const SkuItemController = require("./skuItemController");
const Exceptions = require("../../routers/exceptions");
const dayjs = require("dayjs");
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)
class Controller {

    #itemController;
    #userController;
    #positionController;
    #skuController;
    #skuItemController
    #testResultController;
    #testDescriptorController;
    #restockOrderController;
    #returnOrderController;
    #internalOrderController;
    #dbManager;

    constructor() {
        this.#dbManager = new DBManager();

        (async () => {
            await this.#dbManager.deleteAllData()
                .catch(err => { throw err })
        })()

        this.#itemController = new ItemController(this);
        this.#userController = new UserController(this);
        this.#positionController = new PositionController(this);
        this.#skuController = new SkuController(this);
        this.#skuItemController = new SkuItemController(this);
        this.#testResultController = new TestResultController(this);
        this.#testDescriptorController = new TestDescriptorController(this);
        this.#restockOrderController = new RestockOrderController(this);
        this.#returnOrderController = new ReturnOrderController(this);
        this.#internalOrderController = new InternalOrderController(this);
        console.log("general Controller started");

    }


    getUserController() {
        return this.#userController;
    }

    getPositionController() {
        return this.#positionController;
    }

    getSkuController() {
        return this.#skuController;
    }

    getSkuItemController() {
        return this.#skuItemController;
    }

    getTestResultController() {
        return this.#testResultController;
    }

    getTestDescriptorController() {
        return this.#testDescriptorController;
    }

    getRestockOrderController() {
        return this.#restockOrderController;
    }

    getReturnOrderController() {
        return this.#returnOrderController;
    }

    getInternalOrderController() {
        return this.#internalOrderController;
    }

    getItemController() {
        return this.#itemController;
    }

    getDBManager() {
        return this.#dbManager;
    }

    getSession() {
        let user;
        try {
            user = this.#userController.getUserAPI();
        } catch (error) {
            throw error;
        }
        return user;
    }

    /** temporaneamente ritorna sempre true prima di usare passport.js*/
    isLoggedAndHasPermission(...validType) {
        /*let user = this.#userController.getUser()
        if (!user) return false;
      return this.#userController.hasPermission(user.type, validType);*/
        return true;
    }

    areUndefined(...params) {
        const value = (params.includes(undefined) || params.includes(null));
        return value;
    }

    areEmptyStings(...params) {
        for (let i = 0; i < params.length; i++) {
            if (String(params[i]).length === 0)
                return true;
        }
        return false;
    }

    areNotInt(...params) {
        for (let i = 0; i < params.length; i++) {
            /* if (params[i] % 1 !== 0)
                return true; */
            if (!Number.isInteger(params[i]))
                return true;
        }
        return false;
    }

    areNotNumbers(...params) {
        const value = params.some((num) => isNaN(Number(num)));
        return value;
    }

    checkRFID(rfid) {
        return (!rfid || isNaN(Number(rfid)) || !Number.isInteger(Number(rfid)) || rfid.length !== 32)
    }

    areAllPositiveOrZero(...numbers) {
        for (let i = 0; i < numbers.length; i++) {
            if (Number(numbers[i]) < 0)
                return false;
        }
        return true;
    }

    checkStateInternalOrders(state) {
        const validStates = ["ISSUED", "ACCEPTED", "REFUSED",
            "CANCELED", "COMPLETED"]

        return validStates.includes(String(state));
    }

    checkStateRestockOrders(state) {

        const validStates = ["ISSUED", "DELIVERY", "DELIVERED", "TESTED",
            "COMPLETEDRETURN", "COMPLETED"]
        return validStates.includes(String(state));
    }

    checkAndFormatDate(date) {

        let formattedDate;
        if (dayjs(date, "YYYY/MM/DD", true).isValid()) {
            formattedDate = dayjs(date).format("YYYY/MM/DD")
        }
        else if (dayjs(date, "YYYY/MM/DD HH:mm", true).isValid()) {
            formattedDate = dayjs(date).format("YYYY/MM/DD HH:mm")
        }
        else if (dayjs(date, "YYYY/MM/DD H:mm", true).isValid()) {
            formattedDate = dayjs(date).format("YYYY/MM/DD H:mm")

        }
        else throw new Exceptions(422);
        return formattedDate
    }


    validateEmail(email) {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

}

module.exports = Controller;
