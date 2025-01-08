import styled from "styled-components"

export const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px;
  background-color: #4A9B9B;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

export const SearchContainer = styled.div`
  background-color: #FF7F6F;
  padding: 10px;
  border-radius: 8px;
  width: 100%;
  margin-top: 5rem;
`

export const SearchHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`

export const Title = styled.h2`
  color: white;
  margin: 0;
  font-size: 1.2rem;
`

export const HospitalIcon = styled.div`
  color: white;
  font-size: 20px;
  &:before {
    content: "✚";
  }
`

export const SearchForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const QuickSearchInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid white;
  border-radius: 4px;
  background-color: white;
  font-size: 0.9rem;

  &::placeholder {
    color: #666;
  }
`

export const FilterGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`

export const FilterInput = styled.input`
  padding: 8px;
  border: 1px solid white;
  border-radius: 4px;
  background-color: white;
  font-size: 0.8rem;

  &::placeholder {
    color: #666;
  }
`

export const ResultsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-top: 10px;
`

export const ResultsContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  flex-grow: 1;
`

export const ResultsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.8rem;

  th, td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #eee;
  }

  th {
    background-color: #FF7F6F;
    color: white;
    font-weight: 500;
    position: sticky;
    top: 0;
  }

  tbody tr:nth-child(even) {
    background-color: #f9f9f9;
  }
`

export const ResultRow = styled.tr`
  &:hover {
    background-color: #f0f0f0;
  }
`

export const PatientLink = styled.span`
  color: #4A9B9B;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: #3a7a7a;
  }
`

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
  padding: 10px;
  background-color: white;
  border-top: 1px solid #eee;
`

export const PaginationButton = styled.button<{ active?: string; disabled?: boolean }>`
  padding: 5px 10px;
  border: 1px solid ${props => props.active === "true" ? '#FF7F6F' : '#ddd'};
  background-color: ${props => props.active === "true" ? '#FF7F6F' : 'white'};
  color: ${props => props.active === "true" ? 'white' : '#333'};
  border-radius: 4px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.5 : 1};
  font-size: 0.8rem;

  &:hover:not(:disabled) {
    background-color: ${props => props.active === "true" ? '#FF7F6F' : '#f5f5f5'};
  }
`

export const PaginationEllipsis = styled.span`
  padding: 5px;
  color: #666;
`

export const EditButton = styled.button`
  background-color: #4A9B9B;
  color: white;
  border: none;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;

  &:hover {
    background-color: #3a7a7a;
  }
`

export const IndividualFormContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
`

export const FormTitle = styled.h3`
  color: #4A9B9B;
  margin-bottom: 20px;
`

export const FormGroup = styled.div`
  margin-bottom: 15px;
`

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
`

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`

export const TextArea = styled.textarea`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  min-height: 100px;
  resize: vertical;

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`

export const SaveButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background-color: #218838;
  }
`

export const CancelButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background-color: #c82333;
  }
`

export const AnnotationsContainer = styled.div`
  margin-top: 20px;
  border-top: 1px solid #eee;
  padding-top: 20px;
`

export const AnnotationTitle = styled.h4`
  color: #4A9B9B;
  margin-bottom: 10px;
`

export const AnnotationItem = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
`

export const AnnotationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
`

export const AnnotationDate = styled.span`
  font-size: 0.8rem;
  color: #666;
`

export const AnnotationContent = styled.p`
  margin: 0;
  color: #333;
`

export const ErrorMessage = styled.div`
  color: #dc3545;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
`

