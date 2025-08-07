import Link from "next/link";
import { ShieldAlert, ArrowLeft, Lock } from "lucide-react";

export default function RestrictedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-red-200">
          <div className="flex justify-center mb-6">
            <div className="bg-red-100 p-4 rounded-full">
              <ShieldAlert className="w-12 h-12 text-red-600" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Access Restricted
          </h1>
          
          <div className="space-y-4 text-gray-600">
            <div className="flex items-center justify-center space-x-2 text-sm bg-red-50 p-3 rounded-lg">
              <Lock className="w-4 h-4 text-red-600" />
              <span>Admin-only system</span>
            </div>
            
            <p className="text-sm leading-relaxed">
              This blog administration system is restricted to authorized administrators only. 
              New user registrations are not permitted.
            </p>
            
            <p className="text-xs text-gray-500">
              If you believe you should have access, please contact the system administrator.
            </p>
          </div>
          
          <div className="mt-8 space-y-3">
            <Link
              href="/blog"
              className="inline-flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Return to Blog
            </Link>
            
            <Link
              href="/"
              className="inline-flex items-center justify-center w-full px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors text-sm"
            >
              Back to Portfolio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
