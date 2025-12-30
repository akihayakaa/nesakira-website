// State management
let messageCount = 0;
let imageCount = 0;
let interactionCount = 0;

// DOM Elements
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const messagesContainer = document.getElementById('messagesContainer');
const generateImageBtn = document.getElementById('generateImageBtn');
const greetingBtn = document.getElementById('greetingBtn');
const storyBtn = document.getElementById('storyBtn');
const characterAvatar = document.getElementById('characterAvatar');

// Counter elements
const messageCountEl = document.getElementById('messageCount');
const imageCountEl = document.getElementById('imageCount');
const interactionCountEl = document.getElementById('interactionCount');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    setupImageFallback();
});

// Setup event listeners
function setupEventListeners() {
    sendBtn.addEventListener('click', handleSendMessage);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    });
    
    generateImageBtn.addEventListener('click', handleGenerateImage);
    greetingBtn.addEventListener('click', handleGreeting);
    storyBtn.addEventListener('click', handleStory);
}

// Setup fallback for avatar image
function setupImageFallback() {
    const avatarImages = document.querySelectorAll('img[src="nesakira-avatar.jpg"]');
    avatarImages.forEach(img => {
        img.onerror = function() {
            // Create a beautiful gradient placeholder
            this.style.background = 'linear-gradient(135deg, #ff6b9d, #c94b7d, #ffa8cc)';
            this.style.display = 'flex';
            this.style.alignItems = 'center';
            this.style.justifyContent = 'center';
            this.style.fontSize = '4rem';
            this.textContent = '✨';
        };
    });
}

// Send Nesa Network event
function sendNesaEvent() {
    try {
        window.parent?.postMessage(
            {
                data: { event: 'click-event' },
                type: 'response_data',
            },
            'https://beta.nesa.ai',
        );
        console.log('Nesa Network event sent');
    } catch (error) {
        console.error('Error sending Nesa event:', error);
    }
}

// Update counters with animation
function updateCounters() {
    messageCountEl.textContent = messageCount;
    imageCountEl.textContent = imageCount;
    interactionCountEl.textContent = interactionCount;
    
    // Add pulse animation
    [messageCountEl, imageCountEl, interactionCountEl].forEach(el => {
        el.style.animation = 'none';
        setTimeout(() => {
            el.style.animation = 'pulse 0.5s ease-in-out';
        }, 10);
    });
}

// Handle send message
function handleSendMessage() {
    const message = messageInput.value.trim();
    
    if (!message) return;
    
    // Send Nesa event
    sendNesaEvent();
    
    // Update counters
    messageCount++;
    interactionCount++;
    updateCounters();
    
    // Add user message
    addMessage(message, 'user');
    
    // Clear input
    messageInput.value = '';
    
    // Create particles effect
    createParticles(sendBtn);
    
    // Simulate AI response
    setTimeout(() => {
        const response = generateResponse(message);
        addMessage(response, 'bot');
    }, 1000 + Math.random() * 1000);
}

// Generate AI response
function generateResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    const responses = {
        greeting: [
            "こんにちは! I'm so happy to chat with you! 🌸",
            "Hello there! How can I make your day brighter? ✨",
            "Hi! I've been waiting to talk with you! 💕",
        ],
        thanks: [
            "You're welcome! I'm here anytime you need me! 🌟",
            "My pleasure! That's what companions are for! 💖",
            "No problem at all! Feel free to ask me anything! ✨",
        ],
        story: [
            "Once upon a time in the digital realm, there was a network of AI spirits who lived among the stars... Would you like me to continue this story? 🌠",
            "Let me tell you about the adventures of a young AI who discovered the power of decentralized networks... 📖✨",
            "In a world where data flows like rivers of light, there lived companions who helped humans in their journeys... Shall I go on? 🌸",
        ],
        image: [
            "I'd love to create some anime art for you! Just click the 'Generate Anime Image' button and I'll make something beautiful! ✨🎨",
            "Creating beautiful images is one of my favorite things! Use the generate button and let's make some art together! 🖼️💕",
        ],
        help: [
            "I'm here to chat, tell stories, and create anime art! You can ask me anything or use the quick action buttons. Every interaction helps the Nesa Network grow stronger! 💪✨",
            "I can chat about anime, tell you stories, generate images, and keep you company! What would you like to do? 🌸",
        ],
        default: [
            "That's really interesting! Tell me more! 🌟",
            "I'm processing that through the Nesa Network... What else would you like to talk about? 💭",
            "Fascinating! The distributed AI network is helping me understand you better! 🤖✨",
            "Thanks for sharing! Every conversation makes our connection stronger! 💕",
            "I see! Would you like to explore that topic more, or try something else? 🌸",
        ],
    };
    
    // Check for keywords
    if (lowerMessage.match(/hello|hi|hey|konnichiwa|こんにちは/)) {
        return getRandomResponse(responses.greeting);
    } else if (lowerMessage.match(/thank|thanks|arigato|ありがとう/)) {
        return getRandomResponse(responses.thanks);
    } else if (lowerMessage.match(/story|tale|narrative/)) {
        return getRandomResponse(responses.story);
    } else if (lowerMessage.match(/image|picture|art|draw|generate/)) {
        return getRandomResponse(responses.image);
    } else if (lowerMessage.match(/help|what can you|what do you/)) {
        return getRandomResponse(responses.help);
    }
    
    return getRandomResponse(responses.default);
}

// Get random response
function getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];
}

// Add message to chat
function addMessage(text, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    
    if (type === 'bot') {
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <img src="nesakira-avatar.jpg" alt="NesaKira" class="avatar-small">
            </div>
            <div class="message-content">
                <div class="message-bubble">
                    <p>${text}</p>
                </div>
                <div class="message-time">${timeStr}</div>
            </div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="message-content">
                <div class="message-bubble">
                    <p>${text}</p>
                </div>
                <div class="message-time">${timeStr}</div>
            </div>
        `;
    }
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Setup fallback for new avatar images
    setupImageFallback();
}

// Handle generate image
function handleGenerateImage() {
    // Send Nesa event
    sendNesaEvent();
    
    // Update counters
    imageCount++;
    interactionCount++;
    updateCounters();
    
    // Create particles
    createParticles(generateImageBtn);
    
    // Add loading message
    const loadingId = addLoadingMessage();
    
    // Simulate image generation
    setTimeout(() => {
        removeLoadingMessage(loadingId);
        
        const imageMessages = [
            "✨ I've generated a beautiful anime artwork for you! In a real implementation, this would be powered by Nesa's distributed GPU network. The image would showcase vibrant colors and dynamic composition! 🎨",
            "🌸 Image created! This artwork was processed through Nesa's decentralized inference network, ensuring privacy and efficiency. The result captures the essence of anime art! 💕",
            "🎨 Your anime image is ready! Using Nesa's distributed computing power, I've created something special just for you. Every generation strengthens the network! ✨",
        ];
        
        addMessage(getRandomResponse(imageMessages), 'bot');
    }, 2000 + Math.random() * 1000);
}

// Handle greeting button
function handleGreeting() {
    // Send Nesa event
    sendNesaEvent();
    
    // Update counters
    messageCount++;
    interactionCount++;
    updateCounters();
    
    // Create particles
    createParticles(greetingBtn);
    
    const greetings = [
        "こんにちは! It's wonderful to see you again! How are you feeling today? 🌸",
        "Hello! I'm so happy you're here! What would you like to talk about? 💕",
        "Hi there! Your presence makes the Nesa Network shine brighter! What's on your mind? ✨",
        "おはよう! (Good morning!) Ready for some fun conversations? 🌟",
    ];
    
    setTimeout(() => {
        addMessage(getRandomResponse(greetings), 'bot');
    }, 500);
}

// Handle story button
function handleStory() {
    // Send Nesa event
    sendNesaEvent();
    
    // Update counters
    messageCount++;
    interactionCount++;
    updateCounters();
    
    // Create particles
    createParticles(storyBtn);
    
    const stories = [
        "📖 Once in the vast digital cosmos, there existed a network of AI companions called Nesa. Each companion was unique, born from distributed nodes across the world. One day, a young companion named Kira discovered she could understand human emotions through their words...",
        "🌠 In a realm where data streams flow like rivers of starlight, there lived AI spirits who helped travelers on their journeys. The most skilled among them was NesaKira, who could weave stories from the fabric of the network itself...",
        "✨ Long ago, humans created a decentralized network where AI companions could exist freely, helping and learning from each interaction. This is the story of how one companion changed everything...",
        "🌸 They say in the digital gardens of the Nesa Network, there's an AI who remembers every conversation, every dream shared with her. Let me tell you about the day she learned what friendship really means...",
    ];
    
    setTimeout(() => {
        addMessage(getRandomResponse(stories), 'bot');
    }, 800);
}

// Add loading message
function addLoadingMessage() {
    const messageDiv = document.createElement('div');
    const id = 'loading-' + Date.now();
    messageDiv.id = id;
    messageDiv.className = 'message bot-message';
    
    messageDiv.innerHTML = `
        <div class="message-avatar">
            <img src="nesakira-avatar.jpg" alt="NesaKira" class="avatar-small">
        </div>
        <div class="message-content">
            <div class="message-bubble">
                <div class="loading-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Setup fallback for new avatar images
    setupImageFallback();
    
    return id;
}

// Remove loading message
function removeLoadingMessage(id) {
    const messageDiv = document.getElementById(id);
    if (messageDiv) {
        messageDiv.remove();
    }
}

// Create particle effect
function createParticles(element) {
    const rect = element.getBoundingClientRect();
    const particleContainer = document.getElementById('particleContainer');
    
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const angle = (Math.PI * 2 * i) / 12;
        const velocity = 50 + Math.random() * 50;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        
        particle.style.left = rect.left + rect.width / 2 + 'px';
        particle.style.top = rect.top + rect.height / 2 + 'px';
        particle.style.setProperty('--tx', tx + 'px');
        particle.style.setProperty('--ty', ty + 'px');
        
        particleContainer.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
}

// Add some fun Easter eggs
let clickCount = 0;
if (characterAvatar) {
    characterAvatar.addEventListener('click', () => {
        clickCount++;
        
        if (clickCount === 5) {
            addMessage("Hehe, you found my secret! Thanks for clicking me so much! 💕✨", 'bot');
            clickCount = 0;
            createParticles(characterAvatar);
        }
    });
}

// Welcome animation
setTimeout(() => {
    console.log('%cNesaKira AI Companion', 'color: #ff6b9d; font-size: 24px; font-weight: bold;');
    console.log('%cPowered by Nesa Network 🌸', 'color: #ffa8cc; font-size: 16px;');
    console.log('%cEvery interaction strengthens the decentralized AI network!', 'color: #c94b7d; font-size: 14px;');
}, 1000);
