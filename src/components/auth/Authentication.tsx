import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #001f3f;
`;

const Header = styled.header`
  position: absolute;
  top: 0;
  right: 0;
  margin: 20px;
  color: white;

  .user-info {
    display: flex;
    align-items: center;
    gap: 10px;

    button {
      background-color: transparent;
      border: none;
      color: white;
      cursor: pointer;
      font-size: 14px;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 250px;

  label {
    color: white;
    margin-bottom: 5px;
  }

  input {
    margin-bottom: 10px;
  }

  button {
    text-transform: uppercase;
    padding: 12px 25px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    font-weight: 700;
    letter-spacing: 0.071em;
    font-size: 14px;
    transition: all ease-in-out 0.2s;
    background-color: white;
    color: #001f3f;

    &:hover {
      transform: scale(1.1);
    }
  }

  .checkbox-container {
    display: flex;
    align-items: center;
    margin-top: 8px;

    label {
      margin-left: 4px;
      color: white;
    }
  }

  .error-message {
    color: red;
    font-size: 14px;
    margin-top: 10px;
    text-align: center;
  }
`;

interface AuthenticationProps {
  onLogin: (email: string, password: string) => void;
}

const Authentication: React.FC<AuthenticationProps> = ({ onLogin }) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    
    const token = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("userName");
    if (token && storedUser) {
      setIsLoggedIn(true);
      setUserName(storedUser);
      router.push("/admin");
    }
  }, [router]);

  useEffect(() => {
    if (forgotPassword) {
      router.push("/reset"); // Redireciona para a página de redefinição de senha
    }
  }, [forgotPassword, router]);

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();

    if (email === "lesterlucasit@hotmail.com" && password === "1234") {
      onLogin(email, password);
      setIsLoggedIn(true);
      setUserName(email);
      setErrorMessage("");
      
      if (rememberMe) {
        localStorage.setItem("authToken", "fakeToken"); // token fictício
        localStorage.setItem("userName", email);
      }
      
      router.push("/admin");
    } else {
      setErrorMessage("Email ou senha incorretos.");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName("");
    localStorage.removeItem("authToken");
    localStorage.removeItem("userName");
    router.push("/");
  };

  return (
    <>
      {isLoggedIn && (
        <Header>
          <div className="user-info">
            <span>Bem-vindo, {userName}!</span>
            <button onClick={handleLogout}>Logoff</button>
          </div>
        </Header>
      )}
      {!isLoggedIn && (
        <Container>
          <StyledForm onSubmit={handleLogin}>
            <div>
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Senha:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="checkbox-container">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <label>Lembrar de mim</label>
            </div>

            <div className="checkbox-container">
              <input
                type="checkbox"
                checked={forgotPassword}
                onChange={() => setForgotPassword(!forgotPassword)}
              />
              <label>Esqueci minha senha</label>
            </div>

            {errorMessage && <div className="error-message">{errorMessage}</div>}

            <button type="submit" style={{ marginTop: "10px" }}>
              Entrar
            </button>
          </StyledForm>
        </Container>
      )}
    </>
  );
};

export default Authentication;