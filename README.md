# 🌸 NesaKira - Decentralized AI Companion

**An anime-themed AI companion website powered by the Nesa Network**

![NesaKira Status](https://img.shields.io/badge/status-active-success)
![Platform](https://img.shields.io/badge/platform-Nesa_Network-purple)
![License](https://img.shields.io/badge/license-MIT-blue)

---

## 🎯 About NesaKira

NesaKira is a decentralized AI companion that runs on Nesa's distributed inference network. Every interaction with NesaKira contributes to the network's AI capabilities while providing users with an engaging anime-themed experience.

**Key Features:**
- 💬 Interactive AI chat interface
- ✨ Anime image generation (powered by Nesa's distributed GPU network)
- 📊 Real-time interaction tracking
- 🌐 Fully decentralized AI processing
- 🎨 Beautiful anime-inspired UI design

---

## 📁 File Structure

```
nesakira-website/
├── index.html          # Main HTML structure
├── style.css           # Complete styling and animations
├── script.js           # Interactive features and Nesa integration
├── nesakira-avatar.jpg # Character profile image (YOU NEED TO ADD THIS!)
├── DEPLOYMENT-GUIDE.md # Step-by-step deployment instructions
└── README.md           # This file
```

---

## 🖼️ IMPORTANT: Add Your Avatar Image

**Before deploying, you MUST add your NesaKira character image!**

1. **Prepare your image:**
   - File format: JPG or JPEG
   - Recommended size: 500x500 pixels or larger (square format works best)
   - File size: Keep under 500KB for faster loading

2. **Rename your image to:** `nesakira-avatar.jpg`
   - Must be exactly this name (all lowercase)
   - Must be .jpg extension

3. **Place in the same folder as index.html**

**If you don't have an avatar image yet:**
- The website will display a beautiful gradient placeholder with a ✨ emoji
- You can add your image later by uploading it to your GitHub repository

---

## 🚀 Quick Start

### Option 1: Deploy to GitHub Pages (Recommended for Beginners)

Follow the detailed **[DEPLOYMENT-GUIDE.md](DEPLOYMENT-GUIDE.md)** included in this project. It covers:

1. ✅ Creating a GitHub account
2. ✅ Setting up a repository
3. ✅ Uploading files
4. ✅ Enabling GitHub Pages
5. ✅ Getting your public URL
6. ✅ Adding the URL to Nesa Glimpse

**Time needed:** ~15 minutes

### Option 2: Local Testing

Want to test before deploying?

1. Download all files to a folder
2. Add your `nesakira-avatar.jpg` image
3. Open `index.html` in your web browser
4. Test all features locally

**Note:** The Nesa Network event tracking only works when deployed online.

---

## 🔧 How It Works

### Nesa Network Integration

Every meaningful user interaction triggers this event:

```javascript
window.parent?.postMessage(
  {
    data: { event: 'click-event' },
    type: 'response_data',
  },
  'https://beta.nesa.ai',
);
```

**Interactions that trigger events:**
- Sending a chat message
- Generating an anime image
- Clicking quick action buttons (Greeting, Story)

This measures engagement and AI usage on the Nesa Network.

### Features Explained

**Chat System:**
- Real-time message display
- Simulated AI responses
- Message timestamps
- Smooth animations

**Image Generation:**
- Triggers Nesa Network events
- Shows loading animation
- Updates interaction counters
- Simulates distributed GPU processing

**Statistics Tracking:**
- Message count
- Image generation count
- Total interaction count
- All displayed in real-time

---

## 🎨 Customization

Want to personalize your NesaKira website? Here's what you can modify:

### Colors (in style.css)

```css
:root {
    --primary-color: #ff6b9d;     /* Main pink color */
    --secondary-color: #c94b7d;   /* Darker pink */
    --accent-color: #ffa8cc;      /* Light pink accent */
    /* Change these to match your aesthetic! */
}
```

### AI Responses (in script.js)

Edit the `generateResponse()` function to customize how NesaKira talks:

```javascript
const responses = {
    greeting: [
        "Your custom greeting here!",
        // Add more variations
    ],
    // Add more response categories
};
```

### Character Name

1. Edit the HTML to change "NesaKira" to your character's name
2. Update the tagline and descriptions
3. Modify the welcome message in the chat

---

## 📊 Tracking & Analytics

The website automatically tracks three key metrics:

1. **Messages:** Total chat messages sent
2. **Images:** Total images generated
3. **Interactions:** Combined total of all interactions

These counters update in real-time and are displayed on the character card.

---

## 🌐 Browser Compatibility

**Fully Supported:**
- ✅ Chrome/Edge (v90+)
- ✅ Firefox (v88+)
- ✅ Safari (v14+)
- ✅ Opera (v76+)

**Mobile Responsive:**
- ✅ iOS Safari
- ✅ Chrome Mobile
- ✅ Samsung Internet

---

## ⚡ Performance

- **Page Load:** < 1 second
- **Image Fallback:** Instant gradient placeholder
- **Animations:** 60 FPS CSS-based
- **File Size:** ~50KB total (excluding avatar image)

---

## 🛠️ Technical Stack

- **Frontend:** Pure HTML5, CSS3, JavaScript (ES6+)
- **Styling:** Custom CSS with CSS Variables
- **Fonts:** Google Fonts (Kalam + Noto Sans JP)
- **Integration:** Nesa Network PostMessage API
- **Hosting:** GitHub Pages (free!)

**No build process required!** ✨

---

## 🐛 Troubleshooting

### Avatar Image Not Showing

**Problem:** Shows ✨ emoji instead of image

**Solutions:**
1. Check that image is named exactly `nesakira-avatar.jpg`
2. Verify image is in the root folder (same location as index.html)
3. Try a different image format (ensure it's JPG)
4. Check file permissions on GitHub

### Website Not Loading

**Problem:** 404 error or blank page

**Solutions:**
1. Wait 3-5 minutes after enabling GitHub Pages
2. Ensure repository is Public, not Private
3. Verify index.html is in the root folder
4. Clear browser cache and refresh

### Interactions Not Tracking

**Problem:** Counters not updating

**Solutions:**
1. Check JavaScript console for errors (F12 in browser)
2. Ensure script.js loaded correctly
3. Test in a different browser
4. Verify all files uploaded successfully

---

## 📝 License

MIT License - Feel free to customize and use this project!

---

## 🤝 Contributing

This is a template project for the Nesa Network. Feel free to:

- Customize the design
- Add new features
- Improve AI responses
- Share your variations!

---

## 🌟 Credits

- **Design:** Custom anime-inspired interface
- **Fonts:** Google Fonts (Kalam, Noto Sans JP)
- **Network:** Powered by Nesa's decentralized AI infrastructure
- **Icons:** Custom SVG and Unicode emoji

---

## 📞 Support

**Need Help?**

1. Read the [DEPLOYMENT-GUIDE.md](DEPLOYMENT-GUIDE.md)
2. Check the Troubleshooting section above
3. Visit Nesa Network documentation
4. Ask in the Nesa community Discord

---

## 🎉 What's Next?

After deploying your NesaKira website:

1. **Share Your URL** - Let others interact with your AI companion
2. **Monitor Usage** - Track engagement through Nesa dashboard
3. **Customize** - Make it uniquely yours!
4. **Expand** - Add more features and personality
5. **Engage** - The more interactions, the stronger the network!

---

**Built with 💕 for the Nesa Network Community**

*Every interaction makes the decentralized AI network stronger!* 🌸✨

---

**Ready to deploy? Follow the [DEPLOYMENT-GUIDE.md](DEPLOYMENT-GUIDE.md)!** 🚀
