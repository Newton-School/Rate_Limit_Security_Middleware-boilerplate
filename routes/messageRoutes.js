const express = require('express');

const {
  newmessages,
  updateMessage,
  getAllMessages,
  deleteMessage,
} = require('../controllers/messageControllers');

const isLoggedIn = require('../middlewares/isLoggedIn');

const router = express.Router();

router.post('/newmessage', isLoggedIn, newmessages);
router.put('/updatemessage/:id', isLoggedIn, updateMessage);
router.get('/message', isLoggedIn, getAllMessages);
router.delete('/deletemessage/:id', isLoggedIn, deleteMessage);

module.exports = router;
