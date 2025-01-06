"use client";
import React, { useState, useEffect } from "react";
import * as S from "./styles";

interface Prontuario {
  id: string;
  nomePaciente: string;
  dataNascimento: string;
  nomeMedico: string;
  diagnostico: string;
  planoTratamento: string;
  notas: string;
  dataCriacao: string;
  dataAtualizacao: string;
  status: string;
}

// Mock API functions
const fetchProntuarios = async (): Promise<Prontuario[]> => {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return [
    {
      id: "1",
      nomePaciente: "João Silva",
      dataNascimento: "1990-05-15",
      nomeMedico: "Dr. Carlos Santos",
      diagnostico: "Hipertensão",
      planoTratamento: "Medicação e mudança de dieta",
      notas: "Paciente apresenta melhora",
      dataCriacao: "2023-12-01",
      dataAtualizacao: "2023-12-15",
      status: "Em tratamento",
    },
    {
      id: "2",
      nomePaciente: "Maria Oliveira",
      dataNascimento: "1985-08-22",
      nomeMedico: "Dra. Ana Paula",
      diagnostico: "Diabetes Tipo 2",
      planoTratamento: "Insulina e dieta controlada",
      notas: "Paciente necessita de acompanhamento regular",
      dataCriacao: "2023-11-10",
      dataAtualizacao: "2023-12-10",
      status: "Em observação",
    },
  ];
};

const searchPacientes = async (termo: string): Promise<{ nome: string; dataNascimento: string }[]> => {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  const pacientes = [
    { nome: "João Silva", dataNascimento: "1990-05-15" },
    { nome: "Maria Oliveira", dataNascimento: "1985-08-22" },
  ];
  return pacientes.filter(p => p.nome.toLowerCase().includes(termo.toLowerCase()));
};

const searchMedicos = async (termo: string): Promise<string[]> => {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  const medicos = ["Dr. Carlos Santos", "Dra. Ana Paula", "Dr. Roberto Martins"];
  return medicos.filter(m => m.toLowerCase().includes(termo.toLowerCase()));
};

const ProntuarioMedico: React.FC = () => {
  const [prontuarios, setProntuarios] = useState<Prontuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [orderBy, setOrderBy] = useState<keyof Prontuario>("dataCriacao");
  const [nomePaciente, setNomePaciente] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [nomeMedico, setNomeMedico] = useState("");
  const [diagnostico, setDiagnostico] = useState("");
  const [planoTratamento, setPlanoTratamento] = useState("");
  const [notas, setNotas] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Simulating authenticated state

  useEffect(() => {
    const loadProntuarios = async () => {
      try {
        setLoading(true);
        const data = await fetchProntuarios();
        setProntuarios(data);
      } catch (err) {
        console.error("Erro ao carregar prontuários:", err);
        setError("Falha ao carregar os prontuários. Por favor, tente novamente.");
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      loadProntuarios();
    }
  }, [isAuthenticated]);

  const handlePacienteChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    setNomePaciente(valor);

    if (valor.length >= 3) {
      try {
        const pacientes = await searchPacientes(valor);
        if (pacientes.length > 0) {
          setNomePaciente(pacientes[0].nome);
          setDataNascimento(pacientes[0].dataNascimento);
        }
      } catch (err) {
        console.error("Erro ao buscar pacientes:", err);
      }
    }
  };

  const handleMedicoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    setNomeMedico(valor);

    if (valor.length >= 2) {
      try {
        const medicos = await searchMedicos(valor);
        if (medicos.length > 0) {
          setNomeMedico(medicos[0]);
        }
      } catch (err) {
        console.error("Erro ao buscar médicos:", err);
      }
    }
  };

  const prontuariosFiltrados = prontuarios
    .filter(prontuario => 
      prontuario.nomePaciente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prontuario.nomeMedico.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prontuario.diagnostico.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a[orderBy].localeCompare(b[orderBy]));

  if (!isAuthenticated) {
    return <S.ErrorMessage>Você precisa estar autenticado para acessar esta página.</S.ErrorMessage>;
  }

  if (loading) {
    return (
      <S.LoadingContainer>
        <S.Spinner />
        <p>Carregando prontuários...</p>
      </S.LoadingContainer>
    );
  }

  if (error) {
    return <S.ErrorMessage>{error}</S.ErrorMessage>;
  }

  return (
    <S.Container>
      <S.Header>
        <h1>Prontuários Médicos</h1>
        <S.Button>
          <span>+</span>
          <span className="sr-only">Adicionar novo prontuário</span>
        </S.Button>
      </S.Header>

      <S.SearchSection>
        <div className="flex gap-2 flex-wrap">
          <S.Input
            type="text"
            placeholder="Pesquisar prontuários..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Pesquisar prontuários"
          />
          <S.Select
            value={orderBy}
            onChange={(e) => setOrderBy(e.target.value as keyof Prontuario)}
          >
            <option value="dataCriacao">Data de Criação</option>
            <option value="nomePaciente">Nome do Paciente</option>
            <option value="nomeMedico">Nome do Médico</option>
            <option value="status">Status</option>
          </S.Select>
        </div>
      </S.SearchSection>

      <S.Form onSubmit={(e) => e.preventDefault()}>
        <S.FormGroup>
          <label htmlFor="nomePaciente">Nome do Paciente</label>
          <S.Input
            id="nomePaciente"
            type="text"
            value={nomePaciente}
            onChange={handlePacienteChange}
            placeholder="Digite o nome do paciente"
          />
        </S.FormGroup>

        <S.FormGroup>
          <label htmlFor="dataNascimento">Data de Nascimento</label>
          <S.Input
            id="dataNascimento"
            type="date"
            value={dataNascimento}
            readOnly
            className="bg-gray-50"
          />
        </S.FormGroup>

        <S.FormGroup>
          <label htmlFor="nomeMedico">Nome do Médico</label>
          <S.Input
            id="nomeMedico"
            type="text"
            value={nomeMedico}
            onChange={handleMedicoChange}
            placeholder="Digite o nome do médico"
          />
        </S.FormGroup>

        <S.FormGroup>
          <label htmlFor="diagnostico">Diagnóstico</label>
          <S.Input
            id="diagnostico"
            type="text"
            value={diagnostico}
            onChange={(e) => setDiagnostico(e.target.value)}
            placeholder="Digite o diagnóstico"
          />
        </S.FormGroup>

        <S.FormGroup>
          <label htmlFor="planoTratamento">Plano de Tratamento</label>
          <S.Input
            id="planoTratamento"
            type="text"
            value={planoTratamento}
            onChange={(e) => setPlanoTratamento(e.target.value)}
            placeholder="Digite o plano de tratamento"
          />
        </S.FormGroup>

        <S.FormGroup>
          <label htmlFor="notas">Notas/Observações</label>
          <S.Textarea
            id="notas"
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
            placeholder="Digite as observações"
          />
        </S.FormGroup>
      </S.Form>

      <S.TableContainer>
        <table>
          <thead>
            <tr>
              <th>Nome do Paciente</th>
              <th>Data de Nascimento</th>
              <th>Médico</th>
              <th>Diagnóstico</th>
              <th>Status</th>
              <th>Última Atualização</th>
            </tr>
          </thead>
          <tbody>
            {prontuariosFiltrados.map((prontuario) => (
              <tr key={prontuario.id}>
                <td>{prontuario.nomePaciente}</td>
                <td>{new Date(prontuario.dataNascimento).toLocaleDateString()}</td>
                <td>{prontuario.nomeMedico}</td>
                <td>{prontuario.diagnostico}</td>
                <td>{prontuario.status}</td>
                <td>{new Date(prontuario.dataAtualizacao).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </S.TableContainer>
    </S.Container>
  );
};

export default ProntuarioMedico;

