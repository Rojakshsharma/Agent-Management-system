import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    number: "",
  });

  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowText(true), 300); // delay for reveal
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (isLogin) {
    // Call login API
    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Login successful!");
        // Save JWT token in localStorage
        localStorage.setItem("token", data.token);


        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Something went wrong!");
    }
  } else {
    // Signup API (your existing code)
    try {
      const res = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Signup successful!");
        setIsLogin(true);
        setFormData({ name: "", email: "", password: "", number: "" });
      } else {
        toast.error(data.message || "Signup failed");
      }
    } catch (err) {
      console.error("Signup error:", err);
      toast.error("Something went wrong!");
    }
  }
};



  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-5xl shadow-2xl rounded-2xl flex overflow-hidden">
        {/* Left Section */}
        <div className="w-1/2 p-10 bg-blue-900 text-white flex flex-col justify-center rounded-l-2xl transition-all duration-500">
          <div
            className={`transition-all duration-1000 ${
              showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-3xl font-bold mb-4 text-center">
              Welcome to Dashboard
            </h2>
            <p className="text-base text-gray-200 text-center">
              Manage your data securely and efficiently.
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-1/2 p-10">
          <h2 className="text-2xl font-semibold text-blue-900 mb-6 text-center">
            {isLogin ? "Login" : "Sign Up"}
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {!isLogin && (
              <>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="p-2 border rounded text-gray-700"
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="number"
                  placeholder="Phone Number"
                  className="p-2 border rounded text-gray-700"
                  onChange={handleChange}
                  required
                />
              </>
            )}
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="p-2 border rounded text-gray-700"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="p-2 border rounded text-gray-700"
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              className="bg-blue-900 hover:bg-blue-800 text-white py-2 rounded transition"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-blue-900 underline"
            >
              {isLogin
                ? "Don't have an account? Sign Up"
                : "Already have an account? Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
