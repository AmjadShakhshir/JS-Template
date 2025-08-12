import { NextRequest, NextResponse } from 'next/server';
import type { ContactFormData } from '@/lib/supabase/queries/contacts';

// Fallback in-memory storage for when database is unavailable
const fallbackSubmissions: (ContactFormData & { 
  id: string; 
  timestamp: string; 
  userAgent?: string;
})[] = [];

// Currently using in-memory storage for demonstration
// In production, you'd integrate with Supabase, SendGrid, or similar
// const isDatabaseAvailable = () => {
//   return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
// };

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();
    
    // Basic validation
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'All fields are required' 
        },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Please enter a valid email address' 
        },
        { status: 400 }
      );
    }

    // Additional validation
    if (body.name.length < 2) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Name must be at least 2 characters long' 
        },
        { status: 400 }
      );
    }

    if (body.message.length < 10) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Message must be at least 10 characters long' 
        },
        { status: 400 }
      );
    }

    const userAgent = request.headers.get('user-agent') || 'unknown';
    const forwardedFor = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const ipAddress = forwardedFor?.split(',')[0] || realIp || 'unknown';

    // For demo purposes, store in memory
    // In production, you'd integrate with Supabase, SendGrid, or similar
    const submission = {
      ...body,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      userAgent,
      ipAddress
    };
    
    fallbackSubmissions.push(submission);
    const submissionId = submission.id;

    // Log submission for debugging
    console.log('Contact form submission:', {
      id: submissionId,
      name: body.name,
      email: body.email,
      timestamp: submission.timestamp
    });

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return NextResponse.json({
      success: true,
      message: 'Thank you for your message! I will get back to you soon.',
      id: submissionId
    });

  } catch (error) {
    console.error('Contact form submission error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Something went wrong. Please try again later.' 
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Admin endpoint to view submissions (for development/testing)
    return NextResponse.json({
      submissions: fallbackSubmissions.map(sub => ({
        id: sub.id,
        name: sub.name,
        email: sub.email,
        message: sub.message,
        timestamp: sub.timestamp
      })),
      total: fallbackSubmissions.length,
      source: 'memory'
    });
  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    );
  }
}
