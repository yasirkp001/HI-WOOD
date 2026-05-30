import { NextResponse } from 'next/server';

// Simple in-memory cache for IP-based rate limiting
const ipCache = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10; // Max 10 requests per minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const userData = ipCache.get(ip);

  if (!userData) {
    ipCache.set(ip, { count: 1, lastReset: now });
    return false;
  }

  if (now - userData.lastReset > RATE_LIMIT_WINDOW) {
    ipCache.set(ip, { count: 1, lastReset: now });
    return false;
  }

  if (userData.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  userData.count += 1;
  return false;
}

export async function GET(request: Request) {
  // Get IP address from headers
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '127.0.0.1';

  // Apply rate limiting
  if (isRateLimited(ip)) {
    console.warn(`Rate limit exceeded for IP: ${ip}`);
    return new NextResponse('Too many requests. Please try again in a minute.', { 
      status: 429,
      headers: {
        'Retry-After': '60',
      }
    });
  }

  const { searchParams } = new URL(request.url);
  const prompt = searchParams.get('prompt');

  if (!prompt) {
    return new NextResponse('Prompt is required', { status: 400 });
  }

  try {
    const encodedPrompt = encodeURIComponent(prompt);
    const seed = Math.floor(Math.random() * 1000000);
    // Use pollinations with strict constraints
    const aiUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1080&height=1080&nologo=true&seed=${seed}`;
    
    console.log('Generating AI image for:', prompt);
    
    // Add a controller to handle timeouts
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout

    const response = await fetch(aiUrl, { signal: controller.signal });
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      console.error('AI Provider Error:', response.status, response.statusText);
      throw new Error(`AI Provider failed: ${response.statusText}`);
    }
    
    const imageBuffer = await response.arrayBuffer();
    
    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'no-store, max-age=0',
      }
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('AI Studio Error:', errorMessage);
    // If it's a timeout or error, we might want to return something else
    return new NextResponse('Error generating design', { status: 500 });
  }
}
