import React, { useState, useEffect } from 'react';
import { messageService } from '../../services/messageService';
import Loading from '../../components/common/Loading';

const TenantMessages = () => {
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      const response = await messageService.getConversations();
      setConversations(response.data || []);
    } catch (err) {
      console.log('Error fetching conversations');
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (conversationId) => {
    try {
      const response = await messageService.getMessages(conversationId);
      setMessages(response.data || []);
    } catch (err) {
      console.log('Error fetching messages');
    }
  };

  const handleConversationClick = (conversation) => {
    setActiveConversation(conversation);
    fetchMessages(conversation._id);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeConversation) return;

    try {
      await messageService.sendMessage({
        recipientId: activeConversation.participants.find(p => p._id !== activeConversation.currentUser)?._id,
        listingId: activeConversation.listing?._id,
        content: newMessage
      });
      setNewMessage('');
      fetchMessages(activeConversation._id);
    } catch (err) {
      console.log('Error sending message');
    }
  };

  if (loading) {
    return <Loading text="Chargement des messages..." />;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Messages</h1>

      <div className="card" style={{ display: 'flex', height: '500px', overflow: 'hidden' }}>
        {/* Conversations List */}
        <div style={{ 
          width: '300px', 
          borderRight: '1px solid #e2e8f0',
          overflowY: 'auto'
        }}>
          {conversations.length > 0 ? (
            conversations.map(conv => (
              <div
                key={conv._id}
                onClick={() => handleConversationClick(conv)}
                style={{
                  padding: '1rem',
                  cursor: 'pointer',
                  backgroundColor: activeConversation?._id === conv._id ? '#f1f5f9' : 'transparent',
                  borderBottom: '1px solid #e2e8f0'
                }}
              >
                <div className="flex gap-2">
                  <img
                    src={conv.participants?.[0]?.avatar || 'https://via.placeholder.com/40'}
                    alt=""
                    style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p className="font-medium" style={{ 
                      overflow: 'hidden', 
                      textOverflow: 'ellipsis', 
                      whiteSpace: 'nowrap' 
                    }}>
                      {conv.participants?.map(p => `${p.firstName}`).join(', ')}
                    </p>
                    <p className="text-sm text-secondary" style={{ 
                      overflow: 'hidden', 
                      textOverflow: 'ellipsis', 
                      whiteSpace: 'nowrap' 
                    }}>
                      {conv.listing?.title || 'Conversation'}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{ padding: '2rem', textAlign: 'center' }}>
              <p className="text-secondary">Aucune conversation</p>
            </div>
          )}
        </div>

        {/* Messages Area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {activeConversation ? (
            <>
              {/* Header */}
              <div style={{ 
                padding: '1rem', 
                borderBottom: '1px solid #e2e8f0',
                backgroundColor: '#f8fafc'
              }}>
                <p className="font-semibold">
                  {activeConversation.listing?.title || 'Conversation'}
                </p>
              </div>

              {/* Messages */}
              <div style={{ 
                flex: 1, 
                padding: '1rem', 
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
              }}>
                {messages.map(msg => (
                  <div
                    key={msg._id}
                    style={{
                      alignSelf: msg.sender?._id === 'currentUserId' ? 'flex-end' : 'flex-start',
                      maxWidth: '70%'
                    }}
                  >
                    <div style={{
                      padding: '0.75rem 1rem',
                      borderRadius: '1rem',
                      backgroundColor: msg.sender?._id === 'currentUserId' ? '#2563eb' : '#f1f5f9',
                      color: msg.sender?._id === 'currentUserId' ? 'white' : 'inherit'
                    }}>
                      <p>{msg.content}</p>
                    </div>
                    <p className="text-xs text-secondary mt-1">
                      {new Date(msg.createdAt).toLocaleTimeString('fr-FR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                ))}
              </div>

              {/* Input */}
              <form 
                onSubmit={handleSendMessage}
                style={{ 
                  padding: '1rem', 
                  borderTop: '1px solid #e2e8f0',
                  display: 'flex',
                  gap: '0.5rem'
                }}
              >
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tapez votre message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  style={{ flex: 1 }}
                />
                <button type="submit" className="btn btn-primary">
                  Envoyer
                </button>
              </form>
            </>
          ) : (
            <div style={{ 
              flex: 1, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              <p className="text-secondary">
                Sélectionnez une conversation pour commencer
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TenantMessages;
