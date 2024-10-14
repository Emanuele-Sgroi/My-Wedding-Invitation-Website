import axios from "axios";
import qs from "qs";

// In-memory storage for client access token and its expiry
let clientAccessToken = null;
let clientTokenExpiry = null;

// Function to fetch a new client access token
async function fetchClientAccessToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  const tokenUrl = "https://accounts.spotify.com/api/token";
  const data = qs.stringify({ grant_type: "client_credentials" });

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization:
      "Basic " + Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
  };

  try {
    const response = await axios.post(tokenUrl, data, { headers });
    const { access_token, expires_in } = response.data;
    clientAccessToken = access_token;
    // Set token expiry time (current time + expires_in seconds - buffer)
    clientTokenExpiry = Date.now() + (expires_in - 60) * 1000; // 60-second buffer
    return clientAccessToken;
  } catch (error) {
    console.error(
      "Error fetching client access token:",
      error.response?.data || error.message
    );
    return null;
  }
}

// Function to get a valid client access token
export async function getClientAccessToken() {
  if (clientAccessToken && Date.now() < clientTokenExpiry) {
    return clientAccessToken;
  }
  // Token expired or doesn't exist, fetch a new one
  return await fetchClientAccessToken();
}
