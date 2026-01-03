// Vercel Serverless Function
// API key disimpan di environment variable (aman!)

export default async function handler(req, res) {
    // CORS headers (allow dari semua origin)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Handle preflight request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    
    // Only allow POST
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }
    
    try {
        const { messages } = req.body;
        
        // Validate input
        if (!messages || !Array.isArray(messages)) {
            res.status(400).json({ error: 'Invalid messages format' });
            return;
        }
        
        // Get API key from environment variable (SECURE!)
        const apiKey = process.env.GROQ_API_KEY;
        
        if (!apiKey) {
            console.error('GROQ_API_KEY not found in environment');
            res.status(500).json({ error: 'API key not configured' });
            return;
        }
        
        // Call Groq API
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'llama-3.1-8b-instant',
                messages: messages,
                temperature: 0.8,
                max_tokens: 300,
                top_p: 0.9,
            })
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Groq API error:', response.status, errorText);
            res.status(response.status).json({ 
                error: 'AI service error',
                details: errorText 
            });
            return;
        }
        
        const data = await response.json();
        res.status(200).json(data);
        
    } catch (error) {
        console.error('Function error:', error);
        res.status(500).json({ 
            error: 'Internal server error',
            message: error.message 
        });
    }
}
