const { Message, Conversation } = require('../models/Message');

// @desc    Get all conversations for user
// @route   GET /api/messages/conversations
// @access  Private
exports.getConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({
      participants: req.user.id
    })
      .populate('participants', 'firstName lastName avatar')
      .populate('listing', 'title images')
      .populate('lastMessage')
      .sort('-updatedAt');

    res.status(200).json({
      success: true,
      count: conversations.length,
      data: conversations
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Get messages in a conversation
// @route   GET /api/messages/conversations/:id
// @access  Private
exports.getMessages = async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.id);

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: 'Conversation not found'
      });
    }

    // Check if user is participant
    if (!conversation.participants.includes(req.user.id)) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this conversation'
      });
    }

    const messages = await Message.find({ conversation: req.params.id })
      .populate('sender', 'firstName lastName avatar')
      .sort('createdAt');

    // Mark messages as read
    await Message.updateMany(
      { conversation: req.params.id, sender: { $ne: req.user.id }, read: false },
      { read: true }
    );

    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Send a message
// @route   POST /api/messages
// @access  Private
exports.sendMessage = async (req, res) => {
  try {
    const { recipientId, listingId, content } = req.body;

    // Find or create conversation
    let conversation = await Conversation.findOne({
      participants: { $all: [req.user.id, recipientId] },
      listing: listingId
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [req.user.id, recipientId],
        listing: listingId
      });
    }

    // Create message
    const message = await Message.create({
      conversation: conversation._id,
      sender: req.user.id,
      content
    });

    // Update conversation's last message
    conversation.lastMessage = message._id;
    conversation.updatedAt = Date.now();
    await conversation.save();

    // Populate sender info
    await message.populate('sender', 'firstName lastName avatar');

    res.status(201).json({
      success: true,
      data: message
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Get unread messages count
// @route   GET /api/messages/unread
// @access  Private
exports.getUnreadCount = async (req, res) => {
  try {
    // Get all conversations where user is participant
    const conversations = await Conversation.find({
      participants: req.user.id
    });

    const conversationIds = conversations.map(c => c._id);

    // Count unread messages
    const count = await Message.countDocuments({
      conversation: { $in: conversationIds },
      sender: { $ne: req.user.id },
      read: false
    });

    res.status(200).json({
      success: true,
      count
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};
