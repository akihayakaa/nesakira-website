// ============================================
// NesaKira - REAL AI Chat with Groq API
// + Nesa Glimpse Tracking
// ============================================

// Configuration
const CONFIG = {
    USE_SERVERLESS: true,  // ← CHANGE ke true!
    GROQ_API_KEY: '',      // ← KOSONG! (aman!)
    GROQ_API_URL: 'https://api.groq.com/openai/v1/chat/completions',
    CHAT_ENDPOINT: '/api/chat',  // ← Backend endpoint
    MODEL: 'llama-3.1-8b-instant',
    
    // NesaKira personality
    SYSTEM_PROMPT: `You are NesaKira, a friendly and cheerful anime-style AI companion. 
Your personality:
- Warm, friendly, and supportive
- Use occasional Japanese phrases (like "こんにちは", "ありがとう", "すごい")
- Love anime, games, and creative topics
- Always encouraging and positive
- Keep responses concise (2-4 sentences unless asked for more)
- Use emojis sparingly but naturally (🌸, ✨, 💕, 🎨, etc.)

You're here to chat, tell stories, help with ideas, and be a companion to users on the Nesa Network.`
};

// State
let messageCount = 0;
let interactionCount = 0;
let conversationHistory = [];

// DOM Elements
const messagesContainer = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const quickPrompts = document.querySelectorAll('.prompt-chip');
const messageCountEl = document.getElementById('messageCount');
const interactionCountEl = document.getElementById('interactionCount');
const avatar = document.getElementById('avatar');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    setupAvatarFallback();
    loadStats();
    checkAPIKey();
    logInit();
});

// Setup event listeners
function setupEventListeners() {
    sendBtn.addEventListener('click', handleSendMessage);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    });
    
    quickPrompts.forEach(chip => {
        chip.addEventListener('click', () => {
            const prompt = chip.dataset.prompt;
            messageInput.value = prompt;
            
            // Send quick prompt event
            sendGlimpseEvent('quick-prompt-used');
            
            handleSendMessage();
        });
    });
}

// Handle send message
async function handleSendMessage() {
    const message = messageInput.value.trim();
    
    if (!message) return;
    
    // Disable input
    setLoading(true);
    
    // Send Nesa tracking event with specific event name
    sendGlimpseEvent('chat-message-sent');
    
    // Update stats
    messageCount++;
    interactionCount++;
    updateStats();
    
    // Send additional event for multiple messages
    if (messageCount >= 3) {
        sendGlimpseEvent('conversation-continued');
    }
    
    // Add user message to chat
    addMessage(message, 'user');
    
    // Clear input
    messageInput.value = '';
    
    // Add to conversation history
    conversationHistory.push({
        role: 'user',
        content: message
    });
    
    // Show typing indicator
    const typingId = addTypingIndicator();
    
    try {
        // Get AI response
        const response = await getAIResponse(message);
        
        // Remove typing indicator
        removeTypingIndicator(typingId);
        
        // Add bot response
        addMessage(response, 'bot');
        
        // Add to conversation history
        conversationHistory.push({
            role: 'assistant',
            content: response
        });
        
        // Keep conversation history manageable (last 10 messages)
        if (conversationHistory.length > 10) {
            conversationHistory = conversationHistory.slice(-10);
        }
        
    } catch (error) {
        removeTypingIndicator(typingId);
        addMessage('Gomen! 😅 I had trouble connecting. Please try again!', 'bot');
        console.error('AI Error:', error);
    }
    
    // Re-enable input
    setLoading(false);
}

// Get AI response from Groq
async function getAIResponse(userMessage) {
    // Check if we have API key
    const apiKey = getAPIKey();
    
    if (!apiKey || apiKey === 'GROQ_API_KEY_PLACEHOLDER') {
        return "Hi! I'm NesaKira! 🌸 To chat with me, please set up your Groq API key. Check the setup instructions!";
    }
    
    try {
        const response = await fetch(CONFIG.GROQ_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: CONFIG.MODEL,
                messages: [
                    {
                        role: 'system',
                        content: CONFIG.SYSTEM_PROMPT
                    },
                    ...conversationHistory,
                    {
                        role: 'user',
                        content: userMessage
                    }
                ],
                temperature: 0.8,
                max_tokens: 300,
                top_p: 0.9,
            })
        });
        
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }
        
        const data = await response.json();
        return data.choices[0].message.content;
        
    } catch (error) {
        console.error('Groq API Error:', error);
        throw error;
    }
}

// Get API key (from environment or fallback)
function getAPIKey() {
    // In production (Vercel), this will be replaced by environment variable
    // For local testing, you can temporarily paste your key here
    return CONFIG.GROQ_API_KEY;
}

// Check if API key is configured
function checkAPIKey() {
    const apiKey = getAPIKey();
    
    if (!apiKey || apiKey === 'GROQ_API_KEY_PLACEHOLDER') {
        console.warn('⚠️ Groq API key not configured!');
        console.log('📝 To enable AI chat:');
        console.log('1. Get free API key from: https://console.groq.com');
        console.log('2. In Vercel: Settings → Environment Variables');
        console.log('3. Add: GROQ_API_KEY = your_key_here');
    } else {
        console.log('✅ Groq API key configured');
    }
}

// Add message to chat
function addMessage(text, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    
    const time = new Date().toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit' 
    });
    
    if (type === 'bot') {
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <img src="nesakira-avatar.jpg" alt="NesaKira" class="avatar-small">
            </div>
            <div class="message-content">
                <div class="message-bubble">
                    <p>${escapeHtml(text)}</p>
                </div>
                <div class="message-time">${time}</div>
            </div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="message-content">
                <div class="message-bubble">
                    <p>${escapeHtml(text)}</p>
                </div>
                <div class="message-time">${time}</div>
            </div>
            <div class="message-avatar">
                <div class="avatar-small"></div>
            </div>
        `;
    }
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Add typing indicator
function addTypingIndicator() {
    const id = 'typing-' + Date.now();
    const typingDiv = document.createElement('div');
    typingDiv.id = id;
    typingDiv.className = 'message bot-message';
    typingDiv.innerHTML = `
        <div class="message-avatar">
            <img src="nesakira-avatar.jpg" alt="NesaKira" class="avatar-small">
        </div>
        <div class="message-content">
            <div class="message-bubble">
                <div class="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    `;
    
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    return id;
}

// Remove typing indicator
function removeTypingIndicator(id) {
    const element = document.getElementById(id);
    if (element) {
        element.remove();
    }
}

// Send Glimpse tracking event to Nesa
function sendGlimpseEvent(eventName = 'click-event') {
    // Check if we were opened from Nesa platform
    const hasOpener = window.opener !== null;
    const isInIframe = window.self !== window.top;
    
    // If not opened from Nesa and not in iframe, skip tracking
    if (!hasOpener && !isInIframe) {
        console.log('ℹ️ Not opened from Nesa - Glimpse tracking skipped');
        console.log('💡 Access via: beta.nesa.ai/dai/nesakira');
        return;
    }
    
    try {
        let eventSent = false;
        
        // Method 1: Try iframe method (if in iframe)
        if (isInIframe) {
            try {
                window.parent.postMessage(
                    {
                        data: { event: eventName },
                        type: 'response_data',
                    },
                    'https://beta.nesa.ai'
                );
                window.parent.postMessage(
                    {
                        data: { event: eventName },
                        type: 'response_data',
                    },
                    '*'
                );
                eventSent = true;
                console.log(`✅ Glimpse event sent via iframe: ${eventName}`);
            } catch (e) {
                console.log('⚠️ Iframe method failed:', e.message);
            }
        }
        
        // Method 2: Try opener method (if opened from Nesa)
        if (hasOpener && window.opener) {
            try {
                window.opener.postMessage(
                    {
                        data: { event: eventName },
                        type: 'response_data',
                    },
                    'https://beta.nesa.ai'
                );
                window.opener.postMessage(
                    {
                        data: { event: eventName },
                        type: 'response_data',
                    },
                    '*'
                );
                eventSent = true;
                console.log(`✅ Glimpse event sent via opener: ${eventName}`);
            } catch (e) {
                console.log('⚠️ Opener method failed:', e.message);
            }
        }
        
        if (!eventSent) {
            console.log('⚠️ No valid tracking method available');
        }
        
    } catch (error) {
        console.error('❌ Glimpse error:', error);
    }
}

// Update stats display
function updateStats() {
    messageCountEl.textContent = messageCount;
    interactionCountEl.textContent = interactionCount;
    saveStats();
    
    // Animate
    [messageCountEl, interactionCountEl].forEach(el => {
        el.style.transform = 'scale(1.1)';
        setTimeout(() => {
            el.style.transform = 'scale(1)';
        }, 200);
    });
}

// Save stats to localStorage
function saveStats() {
    try {
        localStorage.setItem('nesakira_stats', JSON.stringify({
            messageCount,
            interactionCount
        }));
    } catch (e) {
        // Ignore if localStorage not available
    }
}

// Load stats from localStorage
function loadStats() {
    try {
        const saved = localStorage.getItem('nesakira_stats');
        if (saved) {
            const stats = JSON.parse(saved);
            messageCount = stats.messageCount || 0;
            interactionCount = stats.interactionCount || 0;
            updateStats();
        }
    } catch (e) {
        // Ignore
    }
}

// Set loading state
function setLoading(loading) {
    sendBtn.disabled = loading;
    messageInput.disabled = loading;
    
    if (loading) {
        messagesContainer.classList.add('loading');
    } else {
        messagesContainer.classList.remove('loading');
        messageInput.focus();
    }
}

// Setup avatar fallback
function setupAvatarFallback() {
    const avatars = document.querySelectorAll('img[src="nesakira-avatar.jpg"]');
    avatars.forEach(img => {
        img.onerror = function() {
            this.style.display = 'flex';
            this.style.alignItems = 'center';
            this.style.justifyContent = 'center';
            this.style.fontSize = this.classList.contains('avatar-small') ? '1.5rem' : '3rem';
            this.textContent = '✨';
        };
    });
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Log initialization
function logInit() {
    console.log('%c🌸 NesaKira AI Companion', 'color: #ff6b9d; font-size: 20px; font-weight: bold;');
    console.log('%cReal AI powered by Groq', 'color: #ffa8cc; font-size: 14px;');
    console.log('%cTracked by Nesa Network', 'color: #c94b7d; font-size: 14px;');
    console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #ff6b9d;');
    console.log('');
    console.log('✅ Chat functionality: REAL AI');
    console.log('✅ Glimpse tracking: ACTIVE');
    console.log('💡 Model: Llama 3.1 8B (via Groq)');
    console.log('');
}

// Send initial load event
setTimeout(() => {
    try {
        window.parent.postMessage(
            { data: { event: 'glimpse-loaded' }, type: 'status' },
            '*'
        );
    } catch (e) {
        // Ignore
    }
}, 500);
