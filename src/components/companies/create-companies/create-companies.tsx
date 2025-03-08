import { useCallback, useState } from "react"
import * as S from "./styles";

const CreateCompanies: React.FC = () => {
  const [formData, setFormData] = useState({
    fantasyname: "",
    legalName: "",
    cnpj: "",
    ownerName: "",
    cpf: "",
    phomeOwner: "",
    phoneCompany: "",
    address: "",
    district: "",
    city: "",
    state: "",
    country: "",
    businessType: ""   
    
  });

  const [isFromUS, setIsFromUS] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const fetchCompaniesData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/company-data?cnpj=${formData.cnpj}`);
      if (response.ok) {
        const data = await response.json();
        setFormData((prevData) => ({
          ...prevData,
          ...data,
        }));
        setIsDisabled(true);
      }
    } catch (error) {
      console.error("Error fetching company data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [formData.cnpj]);

  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
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
          fantasyname: "",
          legalName: "",
          cnpj: "",
          ownerName: "",
          cpf: "",
          phomeOwner: "",
          phoneCompany: "",
          address: "",
          district: "",
          city: "",
          state: "",
          country: "",
          businessType: ""   
        });
        setIsDisabled(false);
        console.log("API Response:", result);
      } else {
        const errorData = await response.json();
        setMessage(`Erro ao registrar médico: ${errorData.message}`);
      }
    } catch (error) {
      setMessage("Erro ao cadastrar a empresa");
      console.error("API Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <S.Container>
      <S.Title>Cadastro de Empresas</S.Title>
      <S.Form onSubmit={handleSubmit}>
        <S.InputGroup>
          <S.Label htmlFor="fantasyname">Nome Fantasia da Empresa</S.Label>
          <S.Input
            type="text"
            id="fantasyname"
            name="fantasyname"
            value={formData.fantasyname}
            onChange={handleChange}
            required
            disabled={isDisabled}
          />
        </S.InputGroup>
        <S.InputGroup>
          <S.Label htmlFor="legalName">Razão Social da Empresa</S.Label>
          <S.Input
            type="tel"
            id="legalName"
            name="legalName"
            value={formData.legalName}
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
        <S.InputGroup>
          <S.Label htmlFor="ownerName">Nome do Proprietário</S.Label>
          <S.Input
            type="tel"
            id="ownerName"
            name="ownerName"
            value={formData.ownerName}
            onChange={handleChange}
            required
            disabled={isDisabled}

          />
        
        </S.InputGroup>     
        <S.InputGroup>
          <S.Label htmlFor="cpf">CPF do Proprietário</S.Label>
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
          <S.Label htmlFor="phoneOwner">Telefone do Proprietário</S.Label>
          <S.Input
            type="text"
            id="phoneOwner"
            name="phoneOwner"
            value={formData.phomeOwner}
            onChange={handleChange}
            required
            disabled={isDisabled}

          />

          
        </S.InputGroup>
        <S.InputGroup>
          <S.Label htmlFor="phoneCompany">Telefone da Empresa</S.Label>
          <S.Input
            type="text"
            id="phoneCompany"
            name="phoneCompany"
            value={formData.phoneCompany}
            onChange={handleChange}
            required
            disabled={isDisabled}

          />

          
        </S.InputGroup>
        <S.InputGroup>
          <S.Label htmlFor="address">Endereço da Empresa</S.Label>
          <S.Input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            disabled={isDisabled}

          />

          
        </S.InputGroup>
        <S.InputGroup>
          <S.Label htmlFor="district">Bairro</S.Label>
          <S.Input
            type="text"
            id="district"
            name="district"
            value={formData.district}
            onChange={handleChange}
            required
            disabled={isDisabled}

          />

          
        </S.InputGroup>
        <S.InputGroup>
          <S.Label htmlFor="city">Cidade</S.Label>
          <S.Input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            disabled={isDisabled}

          />

          
        </S.InputGroup>
        <S.InputGroup>
          <S.Label htmlFor="state">Estado</S.Label>
          <S.Input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
            disabled={isDisabled}

          />

          
        </S.InputGroup>
        <S.InputGroup>
          <S.Label htmlFor="country">Pais</S.Label>
          <S.Input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
            disabled={isDisabled}

          />

          
        </S.InputGroup>
        
        {showMessage && message && <S.Message>{message}</S.Message>}
        <S.SubmitButton type="submit" disabled={isLoading}>
          {isLoading ? "Carregando..." : "Enviar"}
        </S.SubmitButton>
      </S.Form>
    </S.Container>
  );
};

export default CreateCompanies;
