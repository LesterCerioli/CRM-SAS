"use client";
import React, { useState } from "react";
import * as S from "./styles";
import axios from "axios";

const diasDaSemana = ["SEG", "TER", "QUA", "QUI", "SEX", "SAB", "DOM"];

const FormularioDeAgendamento: React.FC = () => {
  const [dataAtual, setDataAtual] = useState(new Date());
  const [dataSelecionada, setDataSelecionada] = useState<Date | null>(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nomePaciente, setNomePaciente] = useState("");
  const [horario, setHorario] = useState("");
  const [medicoSelecionado, setMedicoSelecionado] = useState("");
  const [buscaMedico, setBuscaMedico] = useState("");

  const medicos = [
    "Dr. João - Cardiologista",
    "Dra. Maria - Dermatologista",
    "Dr. Carlos - Ortopedista",
    "Dra. Ana - Pediatra",
  ];

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

  const handleEnviar = async () => {
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
  
      console.log("Resposta da API:", response.data);
      alert("Agendamento enviado com sucesso!");
      setMostrarFormulario(false);
      limparFormulario();
    } catch (erro) {
      console.error("Erro ao enviar os dados:", erro);
      alert("Erro ao enviar o agendamento. Tente novamente mais tarde.");
    }
  };

  const handleCancelar = () => {
    // Fechar o formulário ao cancelar
    setMostrarFormulario(false);
    limparFormulario();
  };

  const limparFormulario = () => {
    // Limpar os campos do formulário
    setNomePaciente("");
    setHorario("");
    setMedicoSelecionado("");
    setBuscaMedico("");
  };

  const medicosFiltrados = medicos.filter((medico) =>
    medico.toLowerCase().includes(buscaMedico.toLowerCase())
  );

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
            <S.MonthYear>
              {dataAtual.toLocaleString("pt-BR", { month: "long", year: "numeric" })}
            </S.MonthYear>
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
        {mostrarFormulario && (
          <S.FormContainer>
            <S.FormHeader>Agendamento</S.FormHeader>
            <S.Input
              placeholder="Nome do Paciente"
              value={nomePaciente}
              onChange={(e) => setNomePaciente(e.target.value)}
            />
            <S.DisabledInput value={dataSelecionada?.toLocaleDateString("pt-BR") || ""} disabled />
            <S.Input
              type="time"
              value={horario}
              onChange={(e) => setHorario(e.target.value)}
            />
            <S.Select onChange={(e) => setMedicoSelecionado(e.target.value)}>
              <option value="">Selecione um médico</option>
              {medicosFiltrados.map((medico, index) => (
                <option key={index} value={medico}>
                  {medico}
                </option>
              ))}
            </S.Select>
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

export default FormularioDeAgendamento;
