import axios from "axios";

// TODO
//const API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
const API_KEY = `AIzaSyCCzgHCm9VNsedikWjZrH0HWgJNzFV34aw`;

const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-preview-image-generation:generateContent?key=${API_KEY}`;

const geminiApiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default geminiApiClient;
