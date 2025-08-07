import { NextRequest, NextResponse } from 'next/server';
import { 
  createContactSubmission, 
  getAllContactSubmissions,
  ContactFormData 
} from '@/lib/supabase/queries/contacts';

// Fallback in-memory storage for when database is unavailable
const fallbackSubmissions: (ContactFormData & { 
  id: string; 
  timestamp: string; 
  userAgent?: string;
})[] = [];

const isDatabaseAvailable = () => {
  return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_API_KEY);
};

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

    let submissionId: string;

    // Try to store in database first, fallback to memory
    if (isDatabaseAvailable()) {
      try {
        const submission = await createContactSubmission(body, userAgent, ipAddress);
        submissionId = submission.id;
      } catch (error) {
        console.error('Database storage failed, using fallback:', error);
        // Fallback to in-memory storage
        const submission = {
          ...body,
          id: Date.now().toString(),
          timestamp: new Date().toISOString(),
          userAgent
        };
        fallbackSubmissions.push(submission);
        submissionId = submission.id;
      }
    } else {
      // Use fallback storage directly
      const submission = {
        ...body,
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        userAgent
      };
      fallbackSubmissions.push(submission);
      submissionId = submission.id;
    }

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
    if (isDatabaseAvailable()) {
      try {
        const submissions = await getAllContactSubmissions();
        return NextResponse.json({
          submissions,
          total: submissions.length,
          source: 'database'
        });
      } catch (error) {
        console.error('Database fetch failed, using fallback:', error);
        // Fallback to in-memory data
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
      }
    } else {
      // Use fallback storage directly
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
    }
  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    );
  }
}
