import { useState } from "react";
import phoneCollage from "@/assets/phone-collage.png";
import instagramLogo from "@/assets/instagram-logo.png";
const InstagramLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt with:", username);
  };

  const footerLinks = [
    "Meta", "About", "Blog", "Jobs", "Help", "API", "Privacy", "Terms",
    "Locations", "Instagram Lite", "Meta AI", "Threads", 
    "Contact Uploading & Non-Users", "Meta Verified"
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="flex items-center gap-8 max-w-[935px] w-full">
          {/* Left Side - Phone Collage (hidden on mobile) */}
          <div className="hidden lg:block flex-shrink-0">
            <img 
              src={phoneCollage} 
              alt="Instagram app screenshots" 
              className="w-[456px] h-auto"
            />
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full max-w-[350px] mx-auto lg:mx-0">
            {/* Instagram Logo */}
            <div className="text-center mb-8">
              <img src={instagramLogo} alt="Instagram" className="h-[51px] mx-auto" />
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-2">
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Phone number, username, or email"
                  className="w-full px-2 py-[9px] text-xs bg-secondary border border-input rounded-sm focus:outline-none focus:border-muted-foreground placeholder:text-muted-foreground"
                />
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full px-2 py-[9px] text-xs bg-secondary border border-input rounded-sm focus:outline-none focus:border-muted-foreground placeholder:text-muted-foreground pr-14"
                />
                {password && (
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-sm font-semibold text-foreground"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                )}
              </div>
              <button
                type="submit"
                disabled={!username || !password}
                className="w-full bg-instagram-blue text-primary-foreground py-[7px] rounded-lg font-semibold text-sm mt-4 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-instagram-blue/90 transition-colors"
              >
                Log in
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-5">
              <div className="flex-1 h-px bg-input"></div>
              <span className="text-xs font-semibold text-muted-foreground">OR</span>
              <div className="flex-1 h-px bg-input"></div>
            </div>

            {/* Facebook Login */}
            <button className="w-full flex items-center justify-center gap-2 text-facebook-blue font-semibold text-sm">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
              </svg>
              Log in with Facebook
            </button>

            {/* Forgot Password */}
            <div className="text-center mt-5">
              <a href="#" className="text-xs text-instagram-link">
                Forgot password?
              </a>
            </div>

            {/* Sign Up Link */}
            <div className="text-center mt-5 pt-5 border-t border-input">
              <p className="text-sm">
                Don't have an account?{" "}
                <a href="#" className="text-instagram-blue font-semibold">
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6">
        <div className="max-w-[1024px] mx-auto px-4">
          {/* Footer Links */}
          <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-4">
            {footerLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-xs text-footer-text hover:underline"
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Language and Copyright */}
          <div className="flex justify-center items-center gap-4 text-xs text-footer-text">
            <button className="flex items-center gap-1">
              English
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <span>© 2025 Instagram from Meta</span>
          </div>
        </div>
      </footer>

      {/* Terms Banner */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-input py-3 px-4">
        <div className="max-w-[1024px] mx-auto flex items-center gap-4">
          <button className="text-muted-foreground hover:text-foreground">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <p className="text-sm">
            By continuing, you agree to Instagram's{" "}
            <a href="#" className="font-semibold hover:underline">Terms of Use</a>
            {" "}and{" "}
            <a href="#" className="font-semibold hover:underline">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InstagramLogin;
