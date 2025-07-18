import { NextResponse } from 'next/server';
import axios from 'axios';

// Sample subscription plans data for fallback
const samplePlans = [
  {
    id: 1,
    name: "Basic Plan",
    description: "Casual users needing regular support",
    price: 19,
    features: [
      "Unlimited AI text-based sessions",
      "Emotion-aware AI responses",
      "Personalized mental health insights",
      "Guided meditations & calming audios",
      "Validity - 7 days"
    ],
    recommended: false,
  },
  {
    id: 2,
    name: "Standard Plan",
    description: "Casual users needing regular support",
    price: 39,
    features: [
      "Unlimited AI text-based sessions",
      "Emotion-aware AI responses",
      "Personalized mental health insights",
      "Guided meditations & calming audios",
      "Validity - 30 days"
    ],
    recommended: true,
  },
  {
    id: 3,
    name: "Premium Plan",
    description: "Casual users needing regular support",
    price: 79,
    features: [
      "Unlimited AI text-based sessions",
      "Emotion-aware AI responses",
      "Personalized mental health insights",
      "Guided meditations & calming audios",
      "Priority support",
      "Validity - 90 days"
    ],
    recommended: false,
  }
];

export async function GET() {
  try {
    // Try to fetch from external API first
    const externalApiUrl = 'https://stirring-camel-exotic.ngrok-free.app/api/subscriptions/plans/';
    
    try {
      const response = await axios.get(externalApiUrl, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        timeout: 5000 // 5 second timeout
      });
      
      return NextResponse.json(response.data);
    } catch (error) {
      console.error('Error fetching from external API:', error.message);
      // Fall back to sample data
      return NextResponse.json(samplePlans);
    }
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subscription plans' },
      { status: 500 }
    );
  }
}
