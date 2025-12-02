// "use client"
import React, { useState, useEffect, useCallback } from 'react';

// IMPORTANT: The Firebase variables are provided by the canvas environment.
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};

// Base URL for the Imagen 3.0 API
const IMAGEN_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict';
// API Key is automatically injected by the canvas environment if left as an empty string.
const apiKey = "";

// Utility function to handle exponential backoff for API calls
const exponentialBackoffFetch = async (url, options, maxRetries = 5) => {
    for (let i = 0; i < maxRetries; i++) {
        try {
            const response = await fetch(url, options);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response;
        } catch (error) {
            if (i === maxRetries - 1) {
                console.error("Max retries reached. Failed to fetch:", error);
                throw error;
            }
            const delay = Math.pow(2, i) * 1000;
            await new Promise(resolve => setTimeout(resolve, delay));
            console.warn(`Retrying fetch (Attempt ${i + 2})...`);
        }
    }
};

// --- Dedicated Signature Component ---
const SignatureDisplay = () => {
    const [signatureUrl, setSignatureUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // The core prompt that generates the signature image
    // *** Updated to explicitly request a TRULY TRANSPARENT BACKGROUND ***
    const SIGNATURE_PROMPT = "Generate a high-resolution, professional, elegant, and fluid connected script signature for the name 'Naim'. The signature must be rendered in black ink on a **TRULY TRANSPARENT BACKGROUND** as a PNG output. Emphasize a slightly larger, sophisticated capital 'N' and include a neat, stylized flourish on the final letter 'm'.";

    const generateSignature = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        setSignatureUrl(null);

        try {
            const payload = {
                instances: [{ prompt: SIGNATURE_PROMPT }],
                parameters: { "sampleCount": 1 }
            };

            const url = `${IMAGEN_API_URL}?key=${apiKey}`;

            const response = await exponentialBackoffFetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            // Check if the response contains base64 image data
            const base64Data = result?.predictions?.[0]?.bytesBase64Encoded;

            if (base64Data) {
                const imageUrl = `data:image/png;base64,${base64Data}`;
                setSignatureUrl(imageUrl);
            } else {
                setError("Image generation failed. Could not retrieve image data.");
                console.error("API response missing image data:", result);
            }

        } catch (err) {
            setError(`Error fetching signature: ${err.message}. Check the console for details.`);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        generateSignature();
    }, [generateSignature]);

    if (isLoading) {
        return (
            <div className="flex items-center space-x-2">
                <svg className="animate-spin h-5 w-5 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-indigo-400 text-sm">Generating Signature...</span>
            </div>
        );
    }
    
    if (error) {
        return (
            <div className="text-red-400 font-medium text-sm">
                <span className="font-bold">Error:</span> {error}
            </div>
        );
    }
    
    if (signatureUrl) {
        return (
            // Removed background classes (bg-white) to ensure transparency is visible
            <img
                src={signatureUrl}
                alt="Generated Signature for Naim"
                className="h-12 w-auto object-contain transition-transform duration-300 hover:scale-[1.05]"
                // Adding a slight white drop shadow to make the black ink stand out on the dark background
                style={{ filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.4))' }}
            />
        );
    }

    return <div className="text-gray-400 text-sm">Signature Placeholder</div>;
};

export default SignatureDisplay;