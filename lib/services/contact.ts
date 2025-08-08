import { deploymentConfig } from './deployment';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactSubmissionResult {
  success: boolean;
  message?: string;
  error?: string;
  id?: string;
}

// EmailJS type definitions
declare global {
  interface Window {
    emailjs?: {
      init: (publicKey: string) => void;
      send: (serviceId: string, templateId: string, params: Record<string, string>, publicKey?: string) => Promise<{ status: number; text: string }>;
    };
  }
}

async function submitContactClientSide(data: ContactFormData): Promise<ContactSubmissionResult> {
  try {
    // Basic validation
    if (!data.name || !data.email || !data.message) {
      return {
        success: false,
        error: 'All fields are required'
      };
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return {
        success: false,
        error: 'Please enter a valid email address'
      };
    }

    if (data.name.length < 2) {
      return {
        success: false,
        error: 'Name must be at least 2 characters long'
      };
    }

    if (data.message.length < 10) {
      return {
        success: false,
        error: 'Message must be at least 10 characters long'
      };
    }

    // Try EmailJS if available
    const emailjsServiceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const emailjsTemplateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const emailjsPublicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (typeof window !== 'undefined' && window.emailjs && emailjsServiceId && emailjsTemplateId && emailjsPublicKey) {
      try {
        const result = await window.emailjs.send(
          emailjsServiceId,
          emailjsTemplateId,
          {
            from_name: data.name,
            from_email: data.email,
            message: data.message,
            reply_to: data.email
          },
          emailjsPublicKey
        );
        
        if (result.status === 200) {
          return {
            success: true,
            message: 'Thank you for your message! I will get back to you soon.',
            id: result.text
          };
        }
      } catch (emailjsError) {
        console.error('EmailJS error:', emailjsError);
        // Fall through to demo mode
      }
    }
    
    // Simulate processing delay for demo
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Log for demo purposes
    console.log('Contact form submission (demo mode):', {
      name: data.name,
      email: data.email,
      message: data.message,
      timestamp: new Date().toISOString()
    });
    
    return {
      success: true,
      message: 'Thank you for your message! This is demo mode - to enable real email sending, configure EmailJS in your environment variables.',
      id: Date.now().toString()
    };
    
  } catch (error) {
    console.error('Client-side contact submission error:', error);
    return {
      success: false,
      error: 'Something went wrong. Please try again later.'
    };
  }
}

async function submitContactServerSide(data: ContactFormData): Promise<ContactSubmissionResult> {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Server-side contact submission error:', error);
    return {
      success: false,
      error: 'Network error. Please check your connection and try again.'
    };
  }
}

export async function submitContactForm(data: ContactFormData): Promise<ContactSubmissionResult> {
  if (deploymentConfig.canUseApiRoutes && !deploymentConfig.isClient) {
    // Server environment with API routes available
    return submitContactServerSide(data);
  } else {
    // Client environment or static export - use client-side submission
    return submitContactClientSide(data);
  }
}
