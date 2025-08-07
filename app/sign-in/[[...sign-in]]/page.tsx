import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Sign In</h1>
          <p className="text-gray-600">Sign in to access the blog admin panel</p>
          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-amber-800">
              <strong>Admin Only:</strong> This system is restricted to authorized administrators only.
            </p>
          </div>
        </div>
        <SignIn 
          appearance={{
            elements: {
              formButtonPrimary: 
                "bg-blue-600 hover:bg-blue-700 text-sm normal-case",
              card: "shadow-xl",
              headerTitle: "hidden",
              headerSubtitle: "hidden",
              footerActionLink: "hidden", // Hide sign-up link
              footerAction: "hidden" // Hide entire footer with sign-up option
            },
          }}
          redirectUrl="/blog/admin"
        />
      </div>
    </div>
  );
}
