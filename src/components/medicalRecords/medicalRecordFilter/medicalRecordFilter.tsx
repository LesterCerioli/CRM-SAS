"use client";
import React, { useState } from "react";
import * as S from "./styles";

interface Record {
    id: string;
    patientName: string;
    dateOfBirth: string;
    gender: string;
    age: string;
}

const MedicalRecordFilter: React.FC = () => {
    const [searchName, setSearchName] = useState("");
    const [records, setRecords] = useState<Record[]>([]);
    const [selectedRecord, setSelectedRecord] = useState<Record | null>(null);

    // Mocked data to list meducal recirds
    const mockData: Record[] = [
        {
            id: "1",
            patientName: "John Doe",
            dateOfBirth: "01/01/2000",
            gender: "M",
            age: "23",
        },
        {
            id: "2",
            patientName: "Jane Smith",
            dateOfBirth: "15/06/1985",
            gender: "F",
            age: "38",
        },
        {
            id: "3",
            patientName: "Michael Brown",
            dateOfBirth: "22/03/1990",
            gender: "M",
            age: "33",
        },
        {
            id: "4",
            patientName: "Emily White",
            dateOfBirth: "10/08/1999",
            gender: "F",
            age: "28",
        },
    ];

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();

        
        const mockData: Record[] = [
            {
                id: "1",
                patientName: "John Doe",
                dateOfBirth: "01/01/2000",
                gender: "M",
                age: "23",
            },
            {
                id: "2",
                patientName: "Jane Smith",
                dateOfBirth: "15/06/1985",
                gender: "F",
                age: "38",
            },
        ];

        
        const filtered = mockData.filter((record) =>
            record.patientName.toLowerCase().includes(searchName.toLowerCase())
        );

        setRecords(filtered);
    };

    const handleRowClick = (record: Record) => {
        setSelectedRecord(record);
    };

    return (
        <S.FilterContainer>
            <h2>Filtrar Prontuário</h2>
            <S.Form onSubmit={handleSearch}>
                <S.FieldGroup>
                    <label htmlFor="searchName">Nome do Paciente:</label>
                    <input
                        type="text"
                        id="searchName"
                        name="searchName"
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                        required
                    />
                </S.FieldGroup>
                <S.Button type="submit">Buscar</S.Button>
            </S.Form>

            {records.length > 0 && (
                <S.Table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Data de Nascimento</th>
                            <th>Sexo</th>
                            <th>Idade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.map((record) => (
                            <tr key={record.id} onClick={() => handleRowClick(record)}>
                                <td>{record.patientName}</td>
                                <td>{record.dateOfBirth}</td>
                                <td>{record.gender === "M" ? "Masculino" : "Feminino"}</td>
                                <td>{record.age}</td>
                            </tr>
                        ))}
                    </tbody>
                </S.Table>
            )}

            {selectedRecord && (
                <S.SummaryContainer>
                    <h3>Detalhes do Prontuário</h3>
                    <p><strong>Nome do Paciente:</strong> {selectedRecord.patientName}</p>
                    <p><strong>Data de Nascimento:</strong> {selectedRecord.dateOfBirth}</p>
                    <p><strong>Sexo:</strong> {selectedRecord.gender === "M" ? "Masculino" : "Feminino"}</p>
                    <p><strong>Idade:</strong> {selectedRecord.age}</p>
                </S.SummaryContainer>
            )}
        </S.FilterContainer>
    );
};

export default MedicalRecordFilter;