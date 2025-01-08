"use client"

import React, { useState, useEffect } from "react"
import * as S from "./styles"

interface Annotation {
  id: string
  content: string
  createdAt: string
  editedAt: string | null
}

interface MedicalRecord {
  id: string
  patient: string
  birthDate: string
  doctor: string
  diagnosis: string
  creationDate: string
  annotations: Annotation[]
}

const diagnoses = [
  'Hipertensão', 'Diabetes Tipo 2', 'Depressão', 'Ansiedade', 'Asma',
  'Artrite', 'Gastrite', 'Enxaqueca', 'Obesidade'
]

const doctors = [
  'Dr. Carlos Santos', 'Dr. Ricardo Lima', 'Dra. Maria Silva',
  'Dr. João Oliveira', 'Dra. Ana Paula Costa', 'Dr. Roberto Almeida'
]

const firstNames = [
  'Maria', 'José', 'Ana', 'João', 'Antônio', 'Francisco', 'Carlos', 'Paulo', 'Pedro', 'Lucas',
  'Luiz', 'Marcos', 'Luis', 'Gabriel', 'Rafael', 'Daniel', 'Marcelo', 'Bruno', 'Eduardo', 'Felipe',
  'Raimundo', 'Rodrigo', 'Patrícia', 'Julia', 'Márcia', 'Fernanda', 'Aline', 'Sandra', 'Camila', 'Juliana'
]

const lastNames = [
  'Silva', 'Santos', 'Oliveira', 'Souza', 'Rodrigues', 'Ferreira', 'Alves', 'Pereira', 'Lima', 'Gomes',
  'Costa', 'Ribeiro', 'Martins', 'Carvalho', 'Almeida', 'Lopes', 'Soares', 'Fernandes', 'Vieira', 'Barbosa'
]

const CreateEditingRecords: React.FC = () => {
  const [allRecords, setAllRecords] = useState<MedicalRecord[]>([])
  const [filteredRecords, setFilteredRecords] = useState<MedicalRecord[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({
    quickSearch: "",
    patientName: "",
    doctorName: "",
    creationDate: ""
  })
  const [showRecords, setShowRecords] = useState(false)
  const [editingRecord, setEditingRecord] = useState<MedicalRecord | null>(null)
  const [showIndividualForm, setShowIndividualForm] = useState(false)
  const [newAnnotation, setNewAnnotation] = useState("")
  const [editingAnnotation, setEditingAnnotation] = useState<Annotation | null>(null)
  const [auditLog, setAuditLog] = useState<string[]>([])
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const recordsPerPage = 20
  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage)
  const indexOfLastRecord = currentPage * recordsPerPage
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage
  const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord)

  useEffect(() => {
    const generateRecords = () => {
      const now = new Date()
      const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000)
      
      return Array.from({ length: 1200 }, (_, index) => {
        const creationDate = Math.random() < 0.5 ? now : threeDaysAgo
        
        return {
          id: `${index + 1}`,
          patient: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
          birthDate: new Date(Date.now() - Math.floor(Math.random() * 2524608000000)).toLocaleDateString('pt-BR'),
          doctor: doctors[Math.floor(Math.random() * doctors.length)],
          diagnosis: diagnoses[Math.floor(Math.random() * diagnoses.length)],
          creationDate: creationDate.toISOString(),
          annotations: [
            {
              id: `${index + 1}-1`,
              content: `Observações iniciais sobre o paciente com ${diagnoses[Math.floor(Math.random() * diagnoses.length)]}`,
              createdAt: creationDate.toISOString(),
              editedAt: null
            }
          ]
        }
      })
    }

    const records = generateRecords()
    setAllRecords(records)
    setFilteredRecords(records)
  }, [])

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFilters(prev => ({
      ...prev,
      [name]: value
    }))

    setShowRecords(true)
    applyFilters({
      ...filters,
      [name]: value
    })
  }

  const applyFilters = (currentFilters: typeof filters) => {
    let results = allRecords

    if (currentFilters.quickSearch) {
      const search = currentFilters.quickSearch.toLowerCase()
      results = results.filter(record => 
        record.patient.toLowerCase().includes(search) ||
        record.doctor.toLowerCase().includes(search) ||
        record.diagnosis.toLowerCase().includes(search) ||
        record.creationDate.includes(search)
      )
    }

    if (currentFilters.patientName) {
      results = results.filter(record => 
        record.patient.toLowerCase().includes(currentFilters.patientName.toLowerCase())
      )
    }

    if (currentFilters.doctorName) {
      results = results.filter(record => 
        record.doctor.toLowerCase().includes(currentFilters.doctorName.toLowerCase())
      )
    }

    if (currentFilters.creationDate) {
      results = results.filter(record => 
        record.creationDate.includes(currentFilters.creationDate)
      )
    }

    setFilteredRecords(results)
    setCurrentPage(1)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const isEditable = (annotation: Annotation) => {
    const now = new Date()
    const createdAt = new Date(annotation.createdAt)
    const hoursDiff = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60)
    return hoursDiff <= 24
  }

  const handleEdit = (record: MedicalRecord) => {
    setEditingRecord(record)
    setShowIndividualForm(true)
    setErrorMessage(null)
  }

  const handleSave = () => {
    if (editingRecord && editingAnnotation) {
      const now = new Date().toISOString()
      const updatedAnnotations = editingRecord.annotations.map(annotation =>
        annotation.id === editingAnnotation.id
          ? { ...annotation, content: editingAnnotation.content, editedAt: now }
          : annotation
      )

      const updatedRecord = { ...editingRecord, annotations: updatedAnnotations }
      const updatedRecords = allRecords.map(record =>
        record.id === updatedRecord.id ? updatedRecord : record
      )

      setAllRecords(updatedRecords)
      setFilteredRecords(updatedRecords)
      setEditingAnnotation(null)
      setAuditLog(prev => [...prev, `Anotação editada para o paciente ${editingRecord.patient} em ${formatDate(now)}`])
    }
  }

  const handleAnnotationEdit = (annotation: Annotation) => {
    if (isEditable(annotation)) {
      setEditingAnnotation(annotation)
      setErrorMessage(null)
    } else {
      setErrorMessage("Esta anotação não pode mais ser editada. Crie uma nova anotação para adicionar informações.")
    }
  }

  const handleAnnotationChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (editingAnnotation) {
      setEditingAnnotation({ ...editingAnnotation, content: e.target.value })
    }
  }

  const handleNewAnnotation = () => {
    if (editingRecord && newAnnotation.trim()) {
      const now = new Date().toISOString()
      const newAnnotationObj: Annotation = {
        id: `${editingRecord.id}-${editingRecord.annotations.length + 1}`,
        content: newAnnotation,
        createdAt: now,
        editedAt: null
      }

      const updatedRecord = {
        ...editingRecord,
        annotations: [...editingRecord.annotations, newAnnotationObj]
      }

      const updatedRecords = allRecords.map(record =>
        record.id === updatedRecord.id ? updatedRecord : record
      )

      setAllRecords(updatedRecords)
      setFilteredRecords(updatedRecords)
      setNewAnnotation("")
      setAuditLog(prev => [...prev, `Nova anotação adicionada para o paciente ${editingRecord.patient} em ${formatDate(now)}`])
    }
  }

  return (
    <S.PageContainer>
      <S.SearchContainer>
        <S.SearchHeader>
          <S.Title>Prontuários Médicos</S.Title>
          <S.HospitalIcon />
        </S.SearchHeader>

        <S.SearchForm>
          <S.QuickSearchInput
            type="text"
            name="quickSearch"
            placeholder="Pesquisa rápida (nome, médico, diagnóstico, data...)"
            value={filters.quickSearch}
            onChange={handleFilterChange}
          />

          <S.FilterGroup>
            <S.FilterInput
              type="text"
              name="patientName"
              placeholder="Nome do Paciente"
              value={filters.patientName}
              onChange={handleFilterChange}
            />
            <S.FilterInput
              type="text"
              name="doctorName"
              placeholder="Nome do Médico"
              value={filters.doctorName}
              onChange={handleFilterChange}
            />
            <S.FilterInput
              type="date"
              name="creationDate"
              placeholder="Data de Criação"
              value={filters.creationDate}
              onChange={handleFilterChange}
            />
          </S.FilterGroup>
        </S.SearchForm>
      </S.SearchContainer>

      {showRecords && !showIndividualForm && (
        <S.ResultsWrapper>
          <S.ResultsContainer>
            <S.ResultsTable>
              <thead>
                <tr>
                  <th>Paciente</th>
                  <th>Data de Nascimento</th>
                  <th>Médico</th>
                  <th>Diagnóstico</th>
                  <th>Data de Criação</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {currentRecords.map(record => (
                  <S.ResultRow key={record.id}>
                    <td>{record.patient}</td>
                    <td>{record.birthDate}</td>
                    <td>{record.doctor}</td>
                    <td>{record.diagnosis}</td>
                    <td>{formatDate(record.creationDate)}</td>
                    <td>
                      <S.EditButton onClick={() => handleEdit(record)}>Editar</S.EditButton>
                    </td>
                  </S.ResultRow>
                ))}
              </tbody>
            </S.ResultsTable>
          </S.ResultsContainer>
          
          <S.PaginationContainer>
            <S.PaginationButton 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              {"<"}
            </S.PaginationButton>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(page => {
                const distance = Math.abs(page - currentPage)
                return distance === 0 || distance === 1 || page === 1 || page === totalPages
              })
              .map((page, index, array) => (
                <React.Fragment key={page}>
                  {index > 0 && array[index - 1] !== page - 1 && (
                    <S.PaginationEllipsis>...</S.PaginationEllipsis>
                  )}
                  <S.PaginationButton
                    onClick={() => handlePageChange(page)}
                    active={(currentPage === page).toString()}
                  >
                    {page}
                  </S.PaginationButton>
                </React.Fragment>
              ))}
            
            <S.PaginationButton
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              {">"}
            </S.PaginationButton>
          </S.PaginationContainer>
        </S.ResultsWrapper>
      )}

      {showIndividualForm && editingRecord && (
        <S.IndividualFormContainer>
          <S.FormTitle>Prontuário de {editingRecord.patient}</S.FormTitle>
          <S.FormGroup>
            <S.Label>Nome do Paciente:</S.Label>
            <S.Input value={editingRecord.patient} disabled />
          </S.FormGroup>
          <S.FormGroup>
            <S.Label>Data de Nascimento:</S.Label>
            <S.Input value={editingRecord.birthDate} disabled />
          </S.FormGroup>
          <S.FormGroup>
            <S.Label>Médico:</S.Label>
            <S.Input value={editingRecord.doctor} disabled />
          </S.FormGroup>
          <S.FormGroup>
            <S.Label>Diagnóstico:</S.Label>
            <S.Input value={editingRecord.diagnosis} disabled />
          </S.FormGroup>
          <S.FormGroup>
            <S.Label>Data de Criação:</S.Label>
            <S.Input value={formatDate(editingRecord.creationDate)} disabled />
          </S.FormGroup>
          
          <S.AnnotationsContainer>
            <S.AnnotationTitle>Anotações:</S.AnnotationTitle>
            {editingRecord.annotations.map((annotation, index) => (
              <S.AnnotationItem key={annotation.id}>
                <S.AnnotationHeader>
                  <S.AnnotationDate>
                    {formatDate(annotation.createdAt)}
                    {annotation.editedAt && ` (Editado em ${formatDate(annotation.editedAt)})`}
                  </S.AnnotationDate>
                  {isEditable(annotation) && (
                    <S.EditButton onClick={() => handleAnnotationEdit(annotation)}>
                      Editar
                    </S.EditButton>
                  )}
                </S.AnnotationHeader>
                {editingAnnotation && editingAnnotation.id === annotation.id ? (
                  <S.TextArea
                    value={editingAnnotation.content}
                    onChange={handleAnnotationChange}
                  />
                ) : (
                  <S.AnnotationContent>{annotation.content}</S.AnnotationContent>
                )}
              </S.AnnotationItem>
            ))}
          </S.AnnotationsContainer>

          {errorMessage && <S.ErrorMessage>{errorMessage}</S.ErrorMessage>}

          <S.FormGroup>
            <S.Label>Nova Anotação:</S.Label>
            <S.TextArea
              value={newAnnotation}
              onChange={(e) => setNewAnnotation(e.target.value)}
              placeholder="Digite uma nova anotação..."
            />
          </S.FormGroup>

          <S.ButtonGroup>
            {editingAnnotation && (
              <S.SaveButton onClick={handleSave}>Salvar Edição</S.SaveButton>
            )}
            <S.SaveButton onClick={handleNewAnnotation}>Adicionar Nova Anotação</S.SaveButton>
            <S.CancelButton onClick={() => {
              setShowIndividualForm(false)
              setEditingRecord(null)
              setEditingAnnotation(null)
              setErrorMessage(null)
            }}>
              Voltar
            </S.CancelButton>
          </S.ButtonGroup>
        </S.IndividualFormContainer>
      )}
    </S.PageContainer>
  )
}

export default CreateEditingRecords;

