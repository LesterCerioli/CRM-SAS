"use client"

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Container, StyledForm } from "./styles";
import CryptoJS from "crypto-js";

const CreateUser: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [cpf, setCpf] = useState("");
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [roleName, setRoleName] = useState("");
  const [permissionType, setPermissionType] = useState("");
  const [email, setEmail] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

 
  const generatePassword = () => {
    const randomString = Math.random().toString(36).slice(-8);
    const hash = CryptoJS.SHA256(randomString).toString(CryptoJS.enc.Hex);
    setPassword(hash.slice(0, 12));
  };


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  
  const copyPassword = () => {
    navigator.clipboard.writeText(password);
    alert("Password copied to clipboard!");
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log({
      fullName,
      cpf,
      birthDate,
      phoneNumber,
      roleName,
      permissionType,
      email,
      login,
      password,
    });
  };

  return (
    <Container>
      <StyledForm onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Nome completo:</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>

        <div className="form-field">
          <label>CPF:</label>
          <input
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            required
          />
        </div>

        <div className="form-field">
          <label>Data de nascimento:</label>
          <DatePicker
            selected={birthDate}
            onChange={(date: Date | null) => setBirthDate(date)}
            dateFormat="yyyy-MM-dd"
            showYearDropdown
            showMonthDropdown
            dropdownMode="select"
            className="datepicker-input"
            placeholderText="Selecione uma data"
          />
        </div>

        <div className="form-field">
          <label>Número de telefone::</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <div className="form-field">
          <label>Nome da função::</label>
          <select
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            required
          >
            <option value="" disabled>Selecione uma função</option>
            <option value="Administrative">Administrativo</option>
            <option value="Commercial">Comercial</option>
            <option value="Finance"> Financeiro</option>
            <option value="Accounting">Contabilidade</option>
            <option value="Fiscal">Fiscal</option>
            <option value="Marketing">Marketing</option>
            <option value="IT">IT</option>
          </select>
        </div>

        <div className="form-field">
          <label>Tipo de permissão:</label>
          <select
            value={permissionType}
            onChange={(e) => setPermissionType(e.target.value)}
            required
          >
            <option value="" disabled>Selecione o tipo de permissão</option>
            <option value="Read-Only">Somente leitura</option>
            <option value="Writing">Escrita</option>
          </select>
        </div>

        <div className="form-field">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-field">
          <label>Login:</label>
          <input
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
          />
        </div>

        <div className="form-field">
          <label>Senha:</label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="button" onClick={generatePassword} style={{ color: "white", backgroundColor: "green", marginLeft: "8px" }}>
          Gerar senha
          </button>
          <button type="button" onClick={togglePasswordVisibility} style={{ marginLeft: "8px" }}>
            {showPassword ? "Esconder" : "Mostrar"}
          </button>
          <button type="button" onClick={copyPassword} style={{ marginLeft: "8px" }}>
           Copiar
          </button>
        </div>

        <button type="submit">Enviar</button>
      </StyledForm>
    </Container>
  );
};

export default CreateUser;