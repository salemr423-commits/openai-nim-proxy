export default async function handler(req, res) {
  // 1. Set the NVIDIA endpoint
  const NVIDIA_URL = "https://integrate.api.nvidia.com/v1/chat/completions";

  // 2. Extract the body from Janitor AI's request
  const body = req.body;

  try {
    const response = await fetch(NVIDIA_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.NVIDIA_API_KEY}`, // Your key hidden in Vercel
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    
    // 3. Send the AI response back to Janitor AI
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to connect to NVIDIA NIM" });
  }
}
