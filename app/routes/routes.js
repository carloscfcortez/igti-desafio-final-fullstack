const express = require('express');
const controller = require('./../controllers/transaction.controller.js');
const router = express.Router();


router.post('/', controller.create);
router.get('/', controller.findAll);
router.get('/:id', controller.findOne);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);
router.delete('/', controller.removeAll);

router.get('/group/year-month', controller.findGroupYearMonth);


module.exports = router;
