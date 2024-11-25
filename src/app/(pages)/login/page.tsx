"use client"; // Add this line to make the component a Client Component

import Authentication from "@/components/auth/Authentication";

const Login: React.FC = () => {
  const handleLogin = (email: string, password: string) => {
    // Handle the login logic here
    console.log("Logging in with:", email, password);
  };

  return <Authentication onLogin={handleLogin} />;
};

export default Login;