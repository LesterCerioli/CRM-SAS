import React, { useState } from "react";
import { 
  Container, 
  FormContainer, 
  FieldRow, 
  FieldContainer, 
  SubmitButton, 
  DatePickerStyles 
} from "./styles";

const CreateImportExportNF = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== "application/pdf") {
        setError("Please upload a valid PDF file.");
        setFile(null);
      } else {
        setError("");
        setFile(selectedFile);
      }
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!file) {
      setError("No file selected. Please upload a PDF file.");
      return;
    }

    // Simulando envio do arquivo
    const formData = new FormData();
    formData.append("file", file);

    // Fazer uma chamada API ou lógica de envio
    console.log("File ready to be sent:", file);

    alert("Nota Fiscal importada com sucesso!");
    setFile(null); // Limpa o estado
  };

  return (
    <Container>
      <DatePickerStyles />
      <FormContainer>
        <h2 style={{ textAlign: "center", color: "#fff", marginBottom: "1rem" }}>
          Importar Nota Fiscal
        </h2>
        <form onSubmit={handleSubmit}>
          <FieldRow>
            <FieldContainer>
              <label htmlFor="file">Escolher Nota Fiscal (PDF):</label>
              <input
                type="file"
                id="file"
                accept=".pdf"
                onChange={handleFileChange}
              />
              {error && <span style={{ color: "red" }}>{error}</span>}
            </FieldContainer>
          </FieldRow>
          <SubmitButton type="submit">Importar Nota Fiscal</SubmitButton>
        </form>
      </FormContainer>
    </Container>
  );
};

export default CreateImportExportNF;
