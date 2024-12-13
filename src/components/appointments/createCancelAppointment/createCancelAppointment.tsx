"use client"
import React, { useState, useEffect, useMemo } from "react";
import * as S from "./styles";

interface Appointment {
  id: number;
  appointmentDate: string;
  patientName: string;
  time: string;
  doctorName: string;
}


const patients = [
  "Maria Silva",
  "João Oliveira",
  "Pedro Costa",
  "Sofia Martins",
  "Lucas Ferreira",
  "Ana Paula",
  "Gustavo Lima",
  "Fernanda Alves",
  "Marcos Souza",
  "Bruna Silva",
  "Lucas Pereira",
  "Jéssica Alves",
  "Carlos Nunes",
  "Patrícia Rocha",
  "Fábio Duarte",
  "Cláudia Lima",
  "Renato Borges",
  "Rafael Silva",
  "Carolina Andrade",
  "Felipe Gonçalves",
  "Amanda Cruz",
  "Eduardo Alves",
  "Gabriela Souza",
  "Daniel Santos",
  "Bianca Oliveira",
  "Roberto Dias",
  "Fernanda Lima",
  "Marcelo Nunes",
  "Renata Carvalho",
  "Igor Ferreira",
];

const doctors = [
  "Dr. Carlos Santos",
  "Dra. Ana Beatriz",
  "Dr. Ricardo Lima",
  "Dra. Juliana Mendes",
  "Dr. Gabriel Santos",
];

const generateMockAppointments = (): Appointment[] => {
  const appointments: Appointment[] = [];

  for (let i = 1; i <= 1200; i++) {
    const randomPatient = patients[Math.floor(Math.random() * patients.length)];
    const randomDoctor = doctors[Math.floor(Math.random() * doctors.length)];

    const randomDate = new Date(
      2023,
      Math.floor(Math.random() * 12), 
      Math.floor(Math.random() * 28) + 1 
    );

    const formattedDate = randomDate.toLocaleDateString("pt-BR"); 
    const randomHour = String(Math.floor(Math.random() * 8) + 9).padStart(2, "0"); 
    const randomMinute = Math.random() < 0.5 ? "00" : "30"; 

    appointments.push({
      id: i,
      appointmentDate: formattedDate,
      patientName: randomPatient,
      time: `${randomHour}:${randomMinute}`,
      doctorName: randomDoctor,
    });
  }

  return appointments;
};

const appointments = generateMockAppointments();

const CreateCancelAppointment: React.FC = () => {
  const [patientSearch, setPatientSearch] = useState("");
  const [doctorSearch, setDoctorSearch] = useState("");
  const [dateSearch, setDateSearch] = useState("");
  const [isTableVisible, setIsTableVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); 
  const itemsPerPage =7;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const filteredAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      const matchPatient = appointment.patientName
        .toLowerCase()
        .includes(patientSearch.toLowerCase());
      const matchDoctor = appointment.doctorName
        .toLowerCase()
        .includes(doctorSearch.toLowerCase());
      const matchDate = appointment.appointmentDate
        .toLowerCase()
        .includes(dateSearch.toLowerCase());

      return matchPatient && matchDoctor && matchDate;
    });
  }, [patientSearch, doctorSearch, dateSearch]);

  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);

  const paginatedAppointments = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAppointments.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAppointments, currentPage]);

  useEffect(() => {
    setIsTableVisible(
      patientSearch !== "" || doctorSearch !== "" || dateSearch !== ""
    );
    setCurrentPage(1);
  }, [patientSearch, doctorSearch, dateSearch]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
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

          <S.FilterForm>
            <S.FilterInputGroup>
              <S.FilterInput
                type="text"
                placeholder="Nome do Paciente"
                value={patientSearch}
                onChange={(e) => setPatientSearch(e.target.value)}
              />
              <S.FilterInput
                type="text"
                placeholder="Nome do Médico"
                value={doctorSearch}
                onChange={(e) => setDoctorSearch(e.target.value)}
              />
              <S.FilterInput
                type="text"
                placeholder="Data (dd/mm/aaaa)"
                value={dateSearch}
                onChange={(e) => setDateSearch(e.target.value)}
              />
            </S.FilterInputGroup>
          </S.FilterForm>

          {isTableVisible && filteredAppointments.length > 0 && (
            <>
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
                    {paginatedAppointments.map((appointment) => (
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
                {paginatedAppointments.map((appointment) => (
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
              <S.PaginationContainer>
                <S.PaginationButton
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  &lt;
                </S.PaginationButton>

                <S.PaginationNumbers>
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(pageNum => {
                      if (isMobile) { 
                        return (
                          pageNum === 1 ||
                          pageNum === totalPages ||
                          (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                        );
                      }
                      return (
                        pageNum === 1 ||
                        pageNum === totalPages ||
                        (pageNum >= currentPage - 3 && pageNum <= currentPage + 3)
                      );
                    })
                    .map((page, index, array) => {
                      if (index > 0 && array[index - 1] !== page - 1) {
                        return (
                          <React.Fragment key={`ellipsis-${page}`}>
                            <S.PaginationEllipsis>...</S.PaginationEllipsis>
                            {page !== totalPages && (
                              <S.PaginationButton
                                onClick={() => handlePageChange(page)}
                                disabled={currentPage === page}
                              >
                                {page}
                              </S.PaginationButton>
                            )}
                          </React.Fragment>
                        );
                      }
                      return (
                        <S.PaginationButton
                          key={page}
                          onClick={() => handlePageChange(page)}
                          disabled={currentPage === page}
                        >
                          {page}
                        </S.PaginationButton>
                      );
                    })}
                </S.PaginationNumbers>

                <S.PaginationButton
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  &gt;
                </S.PaginationButton>
              </S.PaginationContainer>
            </>
          )}
        </S.Card>
      </S.Content>
    </S.Container>
  );
};

export default CreateCancelAppointment;

