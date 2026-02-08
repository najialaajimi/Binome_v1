const express = require('express');
const router = express.Router();
const {
  getConversations,
  getMessages,
  sendMessage,
  getUnreadCount
} = require('../controllers/messageController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.get('/conversations', getConversations);
router.get('/conversations/:id', getMessages);
router.post('/', sendMessage);
router.get('/unread', getUnreadCount);

module.exports = router;
