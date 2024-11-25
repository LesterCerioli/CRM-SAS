"use client";

import { useState } from "react";
import { Container, StyledForm } from "@/components/styles/resetPasswordStyles";
import crypto from "crypto";

const ResetPassword: React.FC = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleGeneratePassword = () => {
        // Gera uma senha utilizando o algoritmo SHA-256
        const password = crypto.randomBytes(16).toString('hex');
        const sha256Password = crypto.createHash('sha256').update(password).digest('hex');
        setNewPassword(sha256Password);
        setConfirmPassword(sha256Password);
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setErrorMessage("Passwords don't match!");
            return;
        }

        try {
            const response = await fetch("/api/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, newPassword }),
            });

            if (!response.ok) {
                throw new Error("Failed to reset password");
            }

            setErrorMessage("Password reset successfully!");
            window.location.href = "http://localhost:3000/login";
        } catch (error) {
            setErrorMessage("There was an error resetting your password.");
        }
    };

    return (
        <Container>
            <StyledForm onSubmit={handleResetPassword}>
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
                    <label>Nova Senha:</label>
                    <input
                        type={showNewPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                    <button type="button" onClick={() => setShowNewPassword(!showNewPassword)}>
                        {showNewPassword ? "Hide" : "Show"}
                    </button>
                    <button type="button" onClick={handleGeneratePassword}>
                        Gerar Senha
                    </button>
                </div>
                
                <div>
                    <label>Confirme a Nova Senha:</label>
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                        {showConfirmPassword ? "Hide" : "Show"}
                    </button>
                </div>
                
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                <button type="submit">Resetar Senha</button>
            </StyledForm>
        </Container>
    );
};

export default ResetPassword;
