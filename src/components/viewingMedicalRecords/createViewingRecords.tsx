"use client"

import React, { useState, useEffect, useMemo } from "react";
import * as S from "./styles";

interface MedicalRecord {
  id: number;
  patientName: string;
  birthDate: string;
  doctorName: string;
  diagnosis: string;
  treatmentPlan: string;
  notes: string;
  creationDate: string;
  updateDate: string;
}

const patients = [
  "Maria Silva", "João Oliveira", "Pedro Costa", "Sofia Martins", "Lucas Ferreira",
  "Ana Paula", "Gustavo Lima", "Fernanda Alves", "Marcos Souza", "Bruna Silva",
  "Lucas Pereira", "Jéssica Alves", "Carlos Nunes", "Patrícia Rocha", "Fábio Duarte",
  "Cláudia Lima", "Renato Borges", "Rafael Silva", "Carolina Andrade", "Felipe Gonçalves"
];

const doctors = [
  "Dr. Carlos Santos", "Dra. Ana Beatriz", "Dr. Ricardo Lima", "Dra. Juliana Mendes", "Dr. Gabriel Santos"
];

const diagnoses = [
  "Hipertensão", "Diabetes Tipo 2", "Asma", "Artrite", "Depressão",
  "Ansiedade", "Obesidade", "Enxaqueca", "Hipotireoidismo", "Gastrite"
];

const generateMockMedicalRecords = (): MedicalRecord[] => {
  const records: MedicalRecord[] = [];

  for (let i = 1; i <= 1200; i++) {
    const randomPatient = patients[Math.floor(Math.random() * patients.length)];
    const randomDoctor = doctors[Math.floor(Math.random() * doctors.length)];
    const randomDiagnosis = diagnoses[Math.floor(Math.random() * diagnoses.length)];

    const birthDate = new Date(
      1950 + Math.floor(Math.random() * 50),
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28) + 1
    );

    const creationDate = new Date(
      2020 + Math.floor(Math.random() * 4),
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28) + 1
    );

    const updateDate = new Date(creationDate);
    updateDate.setDate(updateDate.getDate() + Math.floor(Math.random() * 30));

    records.push({
      id: i,
      patientName: randomPatient,
      birthDate: birthDate.toLocaleDateString("pt-BR"),
      doctorName: randomDoctor,
      diagnosis: randomDiagnosis,
      treatmentPlan: `Plano de tratamento para ${randomDiagnosis}`,
      notes: `Observações sobre o paciente com ${randomDiagnosis}`,
      creationDate: creationDate.toLocaleDateString("pt-BR"),
      updateDate: updateDate.toLocaleDateString("pt-BR"),
    });
  }

  return records;
};

const medicalRecords = generateMockMedicalRecords();

const MedicalRecords: React.FC = () => {
  const [patientSearch, setPatientSearch] = useState("");
  const [doctorSearch, setDoctorSearch] = useState("");
  const [dateSearch, setDateSearch] = useState("");
  const [quickSearch, setQuickSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const itemsPerPage = 20;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredRecords = useMemo(() => {
    if (!isSearching && !quickSearch) return [];

    return medicalRecords.filter((record) => {
      const matchQuickSearch = quickSearch
        ? Object.values(record).some(value => 
            value.toString().toLowerCase().includes(quickSearch.toLowerCase())
          )
        : true;
      const matchPatient = record.patientName
        .toLowerCase()
        .includes(patientSearch.toLowerCase());
      const matchDoctor = record.doctorName
        .toLowerCase()
        .includes(doctorSearch.toLowerCase());
      const matchDate = record.creationDate
        .toLowerCase()
        .includes(dateSearch.toLowerCase());

      return matchQuickSearch && matchPatient && matchDoctor && matchDate;
    });
  }, [patientSearch, doctorSearch, dateSearch, quickSearch, isSearching]);

  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);

  const paginatedRecords = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredRecords.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredRecords, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
    setIsSearching(patientSearch !== "" || doctorSearch !== "" || dateSearch !== "" || quickSearch !== "");
  }, [patientSearch, doctorSearch, dateSearch, quickSearch]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleRecordSelect = (record: MedicalRecord) => {
    setSelectedRecord(record);
  };

  return (
    <S.Container>
      <S.Content>
        <S.Card>
          <S.Header>
            <S.Title>Prontuários Médicos</S.Title>
            <S.IconWrapper>
              <span className="cross-icon"></span>
            </S.IconWrapper>
          </S.Header>

          <S.QuickSearchBar>
            <S.QuickSearchInput
              type="text"
              placeholder="Pesquisa rápida (nome, médico, diagnóstico, data...)"
              value={quickSearch}
              onChange={(e) => setQuickSearch(e.target.value)}
            />
          </S.QuickSearchBar>

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
                placeholder="Data de Criação (dd/mm/aaaa)"
                value={dateSearch}
                onChange={(e) => setDateSearch(e.target.value)}
              />
            </S.FilterInputGroup>
          </S.FilterForm>

          {(isSearching || quickSearch) && (
            <S.TableContainer>
              {filteredRecords.length > 0 ? (
                <>
                  <S.DesktopTable>
                    <S.Table>
                      <S.TableHeader>
                        <S.TableRow>
                          <S.TableHead>Paciente</S.TableHead>
                          <S.TableHead>Data de Nascimento</S.TableHead>
                          <S.TableHead>Médico</S.TableHead>
                          <S.TableHead>Diagnóstico</S.TableHead>
                          <S.TableHead>Data de Criação</S.TableHead>
                          <S.TableHead>Notas/Observações</S.TableHead>
                        </S.TableRow>
                      </S.TableHeader>
                      <S.TableBody>
                        {paginatedRecords.map((record) => (
                          <S.TableRow
                            key={record.id}
                            onClick={() => handleRecordSelect(record)}
                          >
                            <S.TableCell>{record.patientName}</S.TableCell>
                            <S.TableCell>{record.birthDate}</S.TableCell>
                            <S.TableCell>{record.doctorName}</S.TableCell>
                            <S.TableCell>{record.diagnosis}</S.TableCell>
                            <S.TableCell>{record.creationDate}</S.TableCell>
                            <S.TableCell>{record.notes}</S.TableCell>
                          </S.TableRow>
                        ))}
                      </S.TableBody>
                    </S.Table>
                  </S.DesktopTable>
                  <S.MobileCards>
                    {paginatedRecords.map((record) => (
                      <S.MobileCard
                        key={record.id}
                        onClick={() => handleRecordSelect(record)}
                      >
                        <S.MobileCardItem>
                          <S.MobileLabel>Paciente:</S.MobileLabel>
                          <span>{record.patientName}</span>
                        </S.MobileCardItem>
                        <S.MobileCardItem>
                          <S.MobileLabel>Data de Nascimento:</S.MobileLabel>
                          <span>{record.birthDate}</span>
                        </S.MobileCardItem>
                        <S.MobileCardItem>
                          <S.MobileLabel>Médico:</S.MobileLabel>
                          <span>{record.doctorName}</span>
                        </S.MobileCardItem>
                        <S.MobileCardItem>
                          <S.MobileLabel>Diagnóstico:</S.MobileLabel>
                          <span>{record.diagnosis}</span>
                        </S.MobileCardItem>
                        <S.MobileCardItem>
                          <S.MobileLabel>Data de Criação:</S.MobileLabel>
                          <span>{record.creationDate}</span>
                        </S.MobileCardItem>
                        <S.MobileCardItem>
                          <S.MobileLabel>Notas/Observações:</S.MobileLabel>
                          <span>{record.notes}</span>
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
                            (pageNum >= currentPage - 2 && pageNum <= currentPage + 2)
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
              ) : (
                <S.NoResultsMessage>Nenhum resultado encontrado.</S.NoResultsMessage>
              )}
            </S.TableContainer>
          )}
        </S.Card>
      </S.Content>
    </S.Container>
  );
};

export default MedicalRecords;

