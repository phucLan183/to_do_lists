const express = require('express');
const router = express.Router();
const taskController = require('../controllers/Tasks');

router.get('/', taskController.home)
router.get('/category/:categoryId', taskController.category)

router.get('/addtask', taskController.indexAdd)
router.post('/addtask', taskController.addNew)

router.get('/edit/:id', taskController.edit)
router.post('/edit/:id', taskController.update)

router.get('/delete/:id', taskController.remove)
router.post('/delete/:id', taskController.obliterate)

router.get('/complete/:id', taskController.complete)
router.get('/restore/:id', taskController.restore)
module.exports = router