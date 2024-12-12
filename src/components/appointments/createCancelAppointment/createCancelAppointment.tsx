"use client";

import React, { useState } from "react";
import * as S from "./styles";

interface Appointment {
  id: number;
  appointmentDate: string;
  patientName: string;
  time: string;
  doctorName: string;
}

const CreateCancelAppointment: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([]);

  const appointments: Appointment[] = [
    {
      id: 1,
      appointmentDate: "10/12/2023",
      patientName: "Maria Silva",
      time: "09:00",
      doctorName: "Dr. Carlos Santos",
    },
    {
      id: 2,
      appointmentDate: "10/12/2023",
      patientName: "João Oliveira",
      time: "10:30",
      doctorName: "Dra. Ana Beatriz",
    },
    {
      id: 3,
      appointmentDate: "10/12/2023",
      patientName: "Pedro Costa",
      time: "14:00",
      doctorName: "Dr. Ricardo Lima",
    },
    {
      id: 4,
      appointmentDate: "11/12/2023",
      patientName: "Sofia Martins",
      time: "11:00",
      doctorName: "Dra. Juliana Mendes",
    },
    {
      id: 5,
      appointmentDate: "11/12/2023",
      patientName: "Lucas Ferreira",
      time: "15:30",
      doctorName: "Dr. Gabriel Santos",
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const filtered = appointments.filter(
      (appointment) =>
        appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAppointments(filtered);
  };

  return (
    <S.Container>
      <S.Content>
        <S.Card>
          <S.Header>
            <S.Title>Consultas Canceladas</S.Title>
            <S.IconWrapper>
              <S.CalendarIcon />
            </S.IconWrapper>
          </S.Header>

          <S.FilterForm onSubmit={handleSearch}>
            <S.FilterInput
              type="text"
              placeholder="Buscar por nome do paciente ou médico"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <S.FilterButton type="submit">Buscar</S.FilterButton>
          </S.FilterForm>

          {filteredAppointments.length > 0 && (
            <>
              {/* Desktop Table */}
              <S.DesktopTable>
                <S.Table>
                  <S.TableHeader>
                    <S.TableRow>
                      <S.TableHead>Data de Agendamento</S.TableHead>
                      <S.TableHead>Nome do Paciente</S.TableHead>
                      <S.TableHead>Horário</S.TableHead>
                      <S.TableHead>Nome do Médico</S.TableHead>
                    </S.TableRow>
                  </S.TableHeader>
                  <S.TableBody>
                    {filteredAppointments.map((appointment) => (
                      <S.TableRow key={appointment.id}>
                        <S.TableCell>{appointment.appointmentDate}</S.TableCell>
                        <S.TableCell>{appointment.patientName}</S.TableCell>
                        <S.TableCell>{appointment.time}</S.TableCell>
                        <S.TableCell>{appointment.doctorName}</S.TableCell>
                      </S.TableRow>
                    ))}
                  </S.TableBody>
                </S.Table>
              </S.DesktopTable>
              <S.MobileCards>
                {filteredAppointments.map((appointment) => (
                  <S.MobileCard key={appointment.id}>
                    <S.MobileCardItem>
                      <S.MobileLabel>Data:</S.MobileLabel>
                      <span>{appointment.appointmentDate}</span>
                    </S.MobileCardItem>
                    <S.MobileCardItem>
                      <S.MobileLabel>Paciente:</S.MobileLabel>
                      <span>{appointment.patientName}</span>
                    </S.MobileCardItem>
                    <S.MobileCardItem>
                      <S.MobileLabel>Horário:</S.MobileLabel>
                      <span>{appointment.time}</span>
                    </S.MobileCardItem>
                    <S.MobileCardItem>
                      <S.MobileLabel>Médico:</S.MobileLabel>
                      <span>{appointment.doctorName}</span>
                    </S.MobileCardItem>
                  </S.MobileCard>
                ))}
              </S.MobileCards>
            </>
          )}
        </S.Card>
      </S.Content>
    </S.Container>
  );
};

export default CreateCancelAppointment;

