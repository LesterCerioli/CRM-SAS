"use client";
import React, { useState, useEffect, useCallback } from "react";
import * as S from "./styles";

const specialties = [
  "Allergy and Immunology",
  "Anesthesiology",
  "Cardiology",
  "Dermatology",
  "Emergency Medicine",
  "Endocrinology",
  "Family Medicine",
  "Gastroenterology",
  "General Surgery",
  "Geriatrics",
  "Hematology",
  "Infectious Disease",
  "Internal Medicine",
  "Medical Genetics",
  "Nephrology",
  "Neurology",
  "Neurosurgery",
  "Obstetrics and Gynecology (OB-GYN)",
  "Oncology",
  "Ophthalmology",
  "Orthopedic Surgery",
  "Otolaryngology (ENT - Ear, Nose, and Throat)",
  "Pathology",
  "Pediatrics",
  "Physical Medicine and Rehabilitation (PM&R)",
  "Plastic Surgery",
  "Psychiatry",
  "Pulmonology",
  "Radiology",
  "Rheumatology",
  "Sports Medicine",
  "Thoracic Surgery",
  "Urology",
  "Vascular Surgery",
];

const CreateDoctorRegistration: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    crm: "",
    specialty: "",
    address: "",
    identity: "",
    cpf: "",
    cnpj: "",
    ssn: "",
    ein: "",
    stateid: "",
    npi: "",
    deaRegistration: "",
    licenseIssueDate: "",
    licenseExpiryDate: "",
    birthDate: "",
  });

  const [isFromUS, setIsFromUS] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const fetchDoctorData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/doctor-data?crm=${formData.crm}`);
      if (response.ok) {
        const data = await response.json();
        setFormData((prevData) => ({
          ...prevData,
          ...data,
        }));
        setIsDisabled(true);
      }
    } catch (error) {
      console.error("Error fetching doctor data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [formData.crm]);

  useEffect(() => {
    if (formData.crm.length === 6) {
      fetchDoctorData();
    }
  }, [formData.crm, fetchDoctorData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = () => {
    setIsFromUS((prev) => !prev);
    setFormData((prevData) => ({
      ...prevData,
      crm: "",
      cpf: "",
      cnpj: "",
      ssn: "",
      ein: "",
      stateid: "",
      npi: "",
      deaRegistration: "",
      licenseIssueDate: "",
      licenseExpiryDate: "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setShowMessage(true);

    try {
      const response = await fetch("/api/register-doctor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        setMessage("Enviado com sucesso");
        setFormData({
          fullName: "",
          phone: "",
          crm: "",
          specialty: "",
          address: "",
          identity: "",
          cpf: "",
          cnpj: "",
          ssn: "",
          ein: "",
          stateid: "",
          npi: "",
          deaRegistration: "",
          licenseIssueDate: "",
          licenseExpiryDate: "",
          birthDate: "",
        });
        setIsDisabled(false);
        console.log("API Response:", result);
      } else {
        const errorData = await response.json();
        setMessage(`Erro ao registrar médico: ${errorData.message}`);
      }
    } catch (error) {
      setMessage("Erro ao registrar médico");
      console.error("API Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <S.Container>
      <S.Title>Doctor Registration</S.Title>
      <S.Form onSubmit={handleSubmit}>
        <S.InputGroup>
          <S.Label htmlFor="fullName">Doctor Fullname</S.Label>
          <S.Input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            disabled={isDisabled}
          />
        </S.InputGroup>
        <S.InputGroup>
          <S.Label htmlFor="phone">Telephone Number</S.Label>
          <S.Input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            disabled={isDisabled}
          />
        </S.InputGroup>
        {!isFromUS && (
          <>
            <S.InputGroup>
              <S.Label htmlFor="crm">CRM</S.Label>
              <S.Input
                type="text"
                id="crm"
                name="crm"
                value={formData.crm}
                onChange={handleChange}
                required
                disabled={isDisabled}
              />
            </S.InputGroup>
            <S.InputGroup>
              <S.Label htmlFor="cpf">CPF</S.Label>
              <S.Input
                type="text"
                id="cpf"
                name="cpf"
                value={formData.cpf}
                onChange={handleChange}
                required
                disabled={isDisabled}
              />
            </S.InputGroup>

            <S.InputGroup>
              <S.Label htmlFor="cnpj">CNPJ</S.Label>
              <S.Input
                type="text"
                id="cnpj"
                name="cnpj"
                value={formData.cnpj}
                onChange={handleChange}
                required
                disabled={isDisabled}
              />
            </S.InputGroup>
          </>
        )}
        <S.InputGroup>
          <S.Label htmlFor="specialty">Specialty</S.Label>
          <S.Select
            id="specialty"
            name="specialty"
            value={formData.specialty}
            onChange={handleChange}
            required
            disabled={isDisabled}
          >
            <option value="">Select Specialty</option>
            {specialties.map((specialty) => (
              <option key={specialty} value={specialty}>
                {specialty}
              </option>
            ))}
          </S.Select>
        </S.InputGroup>
        {isFromUS && (
          <>
            <S.InputGroup>
              <S.Label htmlFor="npi">NPI</S.Label>
              <S.Input
                type="text"
                id="npi"
                name="npi"
                value={formData.npi}
                onChange={handleChange}
                required
                disabled={isDisabled}
              />
            </S.InputGroup>
            <S.InputGroup>
              <S.Label htmlFor="deaRegistration">DEA Registration</S.Label>
              <S.Input
                type="text"
                id="deaRegistration"
                name="deaRegistration"
                value={formData.deaRegistration}
                onChange={handleChange}
                required
                disabled={isDisabled}
              />
            </S.InputGroup>
            <S.InputGroup>
              <S.Label htmlFor="licenseIssueDate">Emission Date</S.Label>
              <S.Input
                type="date"
                id="licenseIssueDate"
                name="licenseIssueDate"
                value={formData.licenseIssueDate}
                onChange={handleChange}
                required
                disabled={isDisabled}
              />
            </S.InputGroup>
            <S.InputGroup>
              <S.Label htmlFor="licenseExpiryDate">Expiration Date</S.Label>
              <S.Input
                type="date"
                id="licenseExpiryDate"
                name="licenseExpiryDate"
                value={formData.licenseExpiryDate}
                onChange={handleChange}
                required
                disabled={isDisabled}
              />
            </S.InputGroup>
          </>
        )}
        <S.InputGroup>
          <S.CheckboxGroup>
            <S.Label htmlFor="isFromUS">Is from US?</S.Label>
            <S.Checkbox
              type="checkbox"
              id="isFromUS"
              name="isFromUS"
              checked={isFromUS}
              onChange={handleCheckboxChange}
            />
          </S.CheckboxGroup>
        </S.InputGroup>
        {showMessage && message && <S.Message>{message}</S.Message>}
        <S.SubmitButton type="submit" disabled={isLoading}>
          {isLoading ? "Carregando..." : "Enviar"}
        </S.SubmitButton>
      </S.Form>
    </S.Container>
  );
};

export default CreateDoctorRegistration;
