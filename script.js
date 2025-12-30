// NesaKira - Real Nesa Network Integration
// This script handles Glimpse event tracking for real AI interactions

// DOM Elements
const greetingBtn = document.getElementById('greetingBtn');
const storyBtn = document.getElementById('storyBtn');
const imageBtn = document.getElementById('imageBtn');
const characterAvatar = document.getElementById('characterAvatar');
const iframeOverlay = document.getElementById('iframeOverlay');
const nesaIframe = document.getElementById('nesaIframe');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    setupImageFallback();
    handleIframeLoading();
});

// Setup event listeners for Glimpse tracking
function setupEventListeners() {
    // Quick action buttons trigger Glimpse events
    greetingBtn.addEventListener('click', () => handleQuickAction('greeting'));
    storyBtn.addEventListener('click', () => handleQuickAction('story'));
    imageBtn.addEventListener('click', () => handleQuickAction('image'));
}

// Setup fallback for avatar image
function setupImageFallback() {
    if (characterAvatar) {
        characterAvatar.onerror = function() {
            // Create a beautiful gradient placeholder if image fails to load
            this.style.background = 'linear-gradient(135deg, #ff6b9d, #c94b7d, #ffa8cc)';
            this.style.display = 'flex';
            this.style.alignItems = 'center';
            this.style.justifyContent = 'center';
            this.style.fontSize = '4rem';
            this.textContent = '✨';
        };
    }
}

// Handle iframe loading state
function handleIframeLoading() {
    // Hide overlay after iframe loads
    nesaIframe.addEventListener('load', () => {
        setTimeout(() => {
            if (iframeOverlay) {
                iframeOverlay.classList.add('hidden');
            }
        }, 1000);
    });

    // Fallback: hide overlay after 5 seconds even if load event doesn't fire
    setTimeout(() => {
        if (iframeOverlay) {
            iframeOverlay.classList.add('hidden');
        }
    }, 5000);
}

// Send Glimpse event to Nesa Network
function sendGlimpseEvent() {
    try {
        window.parent?.postMessage(
            {
                data: { event: 'click-event' },
                type: 'response_data',
            },
            'https://beta.nesa.ai',
        );
        console.log('✅ Glimpse event sent to Nesa Network');
    } catch (error) {
        console.error('❌ Error sending Glimpse event:', error);
    }
}

// Handle quick action button clicks
function handleQuickAction(actionType) {
    // Send Glimpse event to track interaction
    sendGlimpseEvent();
    
    // Create visual feedback
    createParticles(event.currentTarget);
    
    // Optional: Focus the iframe so user can start typing
    if (nesaIframe) {
        nesaIframe.focus();
    }
    
    // Log the action
    console.log(`🌸 NesaKira action: ${actionType}`);
    
    // Show a subtle visual confirmation
    showActionFeedback(event.currentTarget);
}

// Create particle effect for visual feedback
function createParticles(element) {
    const rect = element.getBoundingClientRect();
    const particleContainer = document.getElementById('particleContainer');
    
    if (!particleContainer) return;
    
    // Create 12 particles in a circle pattern
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Calculate particle trajectory
        const angle = (Math.PI * 2 * i) / 12;
        const velocity = 50 + Math.random() * 50;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        
        // Position particle at button center
        particle.style.left = rect.left + rect.width / 2 + 'px';
        particle.style.top = rect.top + rect.height / 2 + 'px';
        particle.style.setProperty('--tx', tx + 'px');
        particle.style.setProperty('--ty', ty + 'px');
        
        particleContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
}

// Show visual feedback on button click
function showActionFeedback(button) {
    // Add a brief scale animation
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = '';
    }, 150);
}

// Listen for messages from the Nesa iframe (optional, for advanced tracking)
window.addEventListener('message', (event) => {
    // Only accept messages from Nesa
    if (event.origin !== 'https://beta.nesa.ai') {
        return;
    }
    
    // Log any messages from Nesa (for debugging)
    console.log('📨 Message from Nesa:', event.data);
    
    // You can add custom handling here if Nesa sends specific events
});

// Easter egg: clicking avatar multiple times
let avatarClickCount = 0;
if (characterAvatar) {
    characterAvatar.addEventListener('click', () => {
        avatarClickCount++;
        
        if (avatarClickCount === 5) {
            console.log('🌸 NesaKira: Thanks for clicking me! Keep chatting with the AI! ✨');
            avatarClickCount = 0;
            createParticles(characterAvatar);
        }
    });
}

// Log initialization
console.log('%c🌸 NesaKira AI Companion', 'color: #ff6b9d; font-size: 20px; font-weight: bold;');
console.log('%cConnected to Nesa Network', 'color: #ffa8cc; font-size: 14px;');
console.log('%cAll interactions are tracked via Glimpse', 'color: #c94b7d; font-size: 12px;');
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #ff6b9d;');
console.log('');
console.log('This website embeds the official Nesa AI interface.');
console.log('Every interaction you make contributes to the decentralized network!');
console.log('');
console.log('💡 Try the quick action buttons to get started!');
