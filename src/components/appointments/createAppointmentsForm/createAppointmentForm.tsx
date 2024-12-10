"use client";

import React, { useState, useEffect } from "react";
import * as S from "./styles";
import axios from "axios";

const diasDaSemana = ["S", "T", "Q", "Q", "S", "S", "D"];

const CreateAppointmentsForm: React.FC = () => {
  const [dataAtual, setDataAtual] = useState(new Date());
  const [dataSelecionada, setDataSelecionada] = useState<Date | null>(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nomePaciente, setNomePaciente] = useState("");
  const [horario, setHorario] = useState("");
  const [medicoSelecionado, setMedicoSelecionado] = useState("");
  const [buscaMedico, setBuscaMedico] = useState("");
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const [erros, setErros] = useState({
    nomePaciente: "",
    horario: "",
    medicoSelecionado: "",
  });

 
  const consultasAgendadas: Record<string, string[]> = {
    "2024-12-01": [
      "Filipe Camarão de Lima: 2024-12-01 10:30 consulta com Dr. João - Cardiologista",
      "Ana Lucia da Silva: 2024-12-01 10:30 consulta com Dr. João - Cardiologista",
      "Flavio de Oliveira Lima: 2024-12-01 10:30 consulta com Dr. João - Cardiologista",
    ],
    "2024-12-02": [
      "Carlos Rodrigues Pereira: 2024-12-02 09:00 consulta com Dr. Carlos - Ortopedista",
    ],
  };

  const medicos = [
    "Dr. João - Cardiologista",
    "Dra. Maria - Dermatologista",
    "Dr. Carlos - Ortopedista",
    "Dra. Ana - Pediatra",
    "Dr. Pedro - Neurologista",
    "Dra. Luísa - Ginecologista",
    "Dr. Ricardo - Oftalmologista",
    "Dra. Beatriz - Endocrinologista",
    "Dr. Rafael - Urologista",
    "Dra. Sofia - Reumatologista",
    "Dr. Henrique - Psiquiatra",
    "Dra. Clara - Infectologista",
    "Dr. Gustavo - Oncologista",
    "Dra. Juliana - Nefrologista",
    "Dr. Leonardo - Anestesiologista",
    "Dra. Carolina - Hematologista",
  ];

  
 
  useEffect(() => {
    const intervalId = setInterval(() => {
      setDataAtual(new Date());
    }, 1000 * 60 * 60 * 24); 
    return () => clearInterval(intervalId); 
  }, []);

  const getDiasNoMes = (data: Date) => {
    const ano = data.getFullYear();
    const mes = data.getMonth();
    const dias = [];
    const primeiroDia = new Date(ano, mes, 1).getDay();
    const ultimoDia = new Date(ano, mes + 1, 0).getDate();

    for (let i = 0; i < primeiroDia; i++) {
      dias.push(null);
    }
    for (let i = 1; i <= ultimoDia; i++) {
      dias.push(new Date(ano, mes, i));
    }
    return dias;
  };

  const mudarMes = (incremento: number) => {
    setDataAtual((dataAnterior) => {
      const novaData = new Date(dataAnterior);
      novaData.setMonth(novaData.getMonth() + incremento);
      return novaData;
    });
  };

  const eHoje = (data: Date) => {
    const hoje = new Date();
    return (
      data.getDate() === hoje.getDate() &&
      data.getMonth() === hoje.getMonth() &&
      data.getFullYear() === hoje.getFullYear()
    );
  };

  const handleClickData = (data: Date) => {
    setDataSelecionada(data);
    setMostrarFormulario(true);
  };

  const validarFormulario = () => {
    const novosErros = {
      nomePaciente: nomePaciente.trim() ? "" : "Preencha este campo",
      horario: horario ? "" : "Preencha este campo",
      medicoSelecionado: medicoSelecionado ? "" : "Preencha este campo",
    };
    setErros(novosErros);
    return !Object.values(novosErros).some((erro) => erro !== "");
  };

  const handleEnviar = async () => {
    if (validarFormulario()) {
      const dados = {
        nomePaciente,
        data: dataSelecionada?.toLocaleDateString("pt-BR"),
        horario,
        medico: medicoSelecionado,
      };
      try {
        const response = await axios.post("https://sua-api.com/endpoint", dados, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setMostrarFormulario(false);
        limparFormulario();
      } catch (erro) {
      }
    }
  };

  const handleCancelar = () => {
    setMostrarFormulario(false);
    limparFormulario();
  };

  const limparFormulario = () => {
    setNomePaciente("");
    setHorario("");
    setMedicoSelecionado("");
    setBuscaMedico("");
    setErros({
      nomePaciente: "",
      horario: "",
      medicoSelecionado: "",
    });
  };

  const medicosFiltrados = medicos.filter((medico) =>
    medico.toLowerCase().includes(buscaMedico.toLowerCase())
  );

  const obterResumoConsultas = (data: Date): string[] => {
    const dataKey = data.toISOString().split("T")[0];
    return consultasAgendadas[dataKey] || [];
  };

  return (
    <S.OuterContainer>
      <S.CalendarContainer>
        <S.TopTabs>
          <S.SideTab />
          <S.CenterTab />
          <S.SideTab />
        </S.TopTabs>
        <S.Container>
          <S.CalendarHeader>
            <S.NavButton onClick={() => mudarMes(-1)}>&lt;</S.NavButton>
            <S.MonthYearContainer>
              <S.MonthDisplay>
                {dataAtual.toLocaleString("pt-BR", { month: "long" })}
              </S.MonthDisplay>
              <S.YearSelect
                value={dataAtual.getFullYear()}
                onChange={(e) => {
                  const novoAno = parseInt(e.target.value, 10);
                  setDataAtual((dataAnterior) => {
                    const novaData = new Date(dataAnterior);
                    novaData.setFullYear(novoAno);
                    return novaData;
                  });
                }}
              >
                {Array.from({ length: 50 }, (_, i) => i + 2024).map((ano) => (
                  <option key={ano} value={ano}>
                    {ano}
                  </option>
                ))}
              </S.YearSelect>
            </S.MonthYearContainer>
            <S.NavButton onClick={() => mudarMes(1)}>&gt;</S.NavButton>
          </S.CalendarHeader>
          <div>
            <S.WeekDays>
              {diasDaSemana.map((dia) => (
                <div key={dia}>{dia}</div>
              ))}
            </S.WeekDays>
            <S.Days>
              {getDiasNoMes(dataAtual).map((data, index) =>
                data ? (
                  <S.Day
                    key={index}
                    isToday={eHoje(data)}
                    isSelected={dataSelecionada?.getTime() === data.getTime()}
                    onClick={() => handleClickData(data)}
                    onMouseEnter={() => setHoveredDate(data)}
                    onMouseLeave={() => setHoveredDate(null)}
                  >
                    {data.getDate()}
                  </S.Day>
                ) : (
                  <div key={index} />
                )
              )}
            </S.Days>
          </div>
        </S.Container>
        {hoveredDate && (
          <S.Tooltip>
            <S.Consultas>
            {obterResumoConsultas(hoveredDate).length > 0 ? (
              obterResumoConsultas(hoveredDate).map((consulta, index) => (
                <div key={index}>{consulta}</div>
              ))
            ) : (
              <div>Nenhuma consulta agendada</div>
            )}
          </S.Consultas>
          </S.Tooltip>
        )}
        {mostrarFormulario && (
          <S.FormContainer>
            <S.FormHeader>Agendamento</S.FormHeader>
            <S.InputContainer>
              <S.Input
                placeholder="Nome do Paciente"
                value={nomePaciente}
                onChange={(e) => {
                  setNomePaciente(e.target.value);
                  setErros({ ...erros, nomePaciente: "" });
                }}
                style={{ borderColor: erros.nomePaciente ? "red" : "#ccc" }}
              />
              {erros.nomePaciente && (
                <S.ErrorText>{erros.nomePaciente}</S.ErrorText>
              )}
            </S.InputContainer>
            <S.DisabledInput
              value={dataSelecionada?.toLocaleDateString("pt-BR") || ""}
              disabled
            />
            <S.InputContainer>
              <S.Input
                type="time"
                value={horario}
                onChange={(e) => {
                  setHorario(e.target.value);
                  setErros({ ...erros, horario: "" });
                }}
                style={{ borderColor: erros.horario ? "red" : "#ccc" }}
              />
              {erros.horario && <S.ErrorText>{erros.horario}</S.ErrorText>}
            </S.InputContainer>
            <S.InputContainer>
  <div style={{ position: "relative" }}>
    <S.Input
      type="text"
      value={buscaMedico}
      onChange={(e) => {
        setBuscaMedico(e.target.value);
        setMedicoSelecionado("");
        setErros({ ...erros, medicoSelecionado: "" });
      }}
      onFocus={() => setMostrarFormulario(true)}
      placeholder="Selecione ou digite o nome do médico"
      style={{ borderColor: erros.medicoSelecionado ? "red" : "#ccc" }}
    />
    {erros.medicoSelecionado && (
      <S.ErrorText>{erros.medicoSelecionado}</S.ErrorText>
    )}
    {buscaMedico && medicosFiltrados.length > 0 && (
      <S.Dropdown>
        {medicosFiltrados.map((medico, index) => (
          <S.DropdownItem
            key={index}
            onClick={() => {
              setMedicoSelecionado(medico);
              setBuscaMedico(medico);
              setErros({ ...erros, medicoSelecionado: "" });
            }}
          >
            {medico}
          </S.DropdownItem>
        ))}
      </S.Dropdown>
    )}
  </div>
  {medicoSelecionado && (
    <S.SelectedMedico>
      Médico selecionado: {medicoSelecionado}
    </S.SelectedMedico>
  )}
</S.InputContainer>

            <S.ButtonContainer>
              <S.ConfirmButton onClick={handleEnviar}>Confirmar</S.ConfirmButton>
              <S.CancelButton onClick={handleCancelar}>Cancelar</S.CancelButton>
            </S.ButtonContainer>
          </S.FormContainer>
        )}
      </S.CalendarContainer>
    </S.OuterContainer>
  );
};

export default CreateAppointmentsForm;

