import styled from 'styled-components';

export const Container = styled.div`
  max-width: 100%;
  margin: 20px auto;
  padding: 0;
  color: white;
  display: flex;
  flex-direction: column;
`;

export const FormWrapper = styled.div<{ $isExpanded: boolean }>`
  background-color: #ffa573;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 15px;
  margin: 0 auto;
  width: 95%;
  max-width: 1200px;
  transition: min-height 0.3s ease-in-out;
  min-height: ${props => props.$isExpanded ? '500px' : '150px'};
  @media (max-width: 768px) {
    width: 100%;
    padding: 10px;
  }
`;

export const Header = styled.header`
  margin-bottom: 10px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Title = styled.h1`
  font-size: 18px;
  color: #4f98a0;
  margin-bottom: 10px;
`;

export const FilterContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const NewPatientButton = styled.button`
  background-color: #4f98a0;
  border: none;
  color: white;
  padding: 4px 8px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
  margin: 2px 2px;
  cursor: pointer;
  border-radius: 4px;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 150px;
  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 10px;
  }
`;

export const Label = styled.label`
  font-size: 12px;
  margin-bottom: 2px;
  color: white;
`;

export const Input = styled.input`
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  color: black;

  @media (max-width: 768px) {
    font-size: 16px;
    padding: 8px;
    &::placeholder {
      font-size: 14px;
      white-space: nowrap;
      overflow: visible;
    }
  }
`;

export const TableWrapper = styled.div<{ $showDescriptions: boolean }>`
  max-height: ${props => props.$showDescriptions ? 'none' : 'calc(100% - 1rem)'};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
  margin-top: 1rem;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 10px;
`;

export const TableHeader = styled.thead`
  background-color: #ff7f50;
  position: sticky;
  top: 0;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #ff7f50;
  }
  height: 40px;
`;

export const TableHeaderCell = styled.th`
  padding: 2px;
  text-align: left;
  font-weight: bold;
  cursor: pointer;
  color: white;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export const TableBody = styled.tbody``;

export const TableCell = styled.td`
  padding: 6px 2px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  position: relative;
  vertical-align: middle;
  word-break: break-word;

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 4px 2px;
  }
`;

export const ClickableTableCell = styled(TableCell)`
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export const TreatmentCell = styled.div`
  max-height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  white-space: normal;
`;

export const TruncatedText = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const NotesCell = styled(TruncatedText)`
  max-height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  white-space: normal;
`;

export const LoadingMessage = styled.div`
  text-align: center;
  font-size: 16px;
  margin-top: 10px;
`;

export const GlobalErrorMessage = styled.div`
  text-align: center;
  font-size: 16px;
  color: red;
  margin-top: 10px;
`;

export const EditButton = styled.button`
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 2px 6px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 10px;
  margin: 1px;
  cursor: pointer;
  border-radius: 2px;
  white-space: nowrap;

  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 14px;
  }
`;

export const EditForm = styled.div`
  background-color: #ff7f50;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
  color: white;
`;

export const FormTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 10px;
  color: #4f98a0;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    margin-bottom: 15px;
  }
`;

export const FormLabel = styled(Label)`
  @media (max-width: 768px) {
    font-size: 14px;
    margin-bottom: 4px;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  resize: vertical;
  color: black;

  @media (max-width: 768px) {
    font-size: 16px;
    padding: 8px;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 5px;
`;

export const SaveButton = styled.button`
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  margin: 2px;
  cursor: pointer;
  border-radius: 4px;
`;

export const CancelButton = styled.button`
  background-color: #f44336;
  border: none;
  color: white;
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  margin: 2px;
  cursor: pointer;
  border-radius: 4px;
`;

export const Suggestions = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  border: 1px solid #ccc;
  border-top: none;
  max-height: 100px;
  overflow-y: auto;
`;

export const SuggestionItem = styled.li`
  padding: 4px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

export const PaginationButton = styled.button`
  background-color: #4f98a0;
  border: none;
  color: white;
  padding: 5px 10px;
  margin: 0 2px;
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 30px;

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #3d7a80;
  }
  @media (max-width: 768px) {
    margin: 4px;
  }
`;

export const PageInfo = styled.span`
  font-size: 14px;
  color: white;
`;

export const EmptyTable = styled.div`
  height: 1rem;
  background-color: transparent;
`;

export const NonEditableIndicator = styled.span`
  font-size: 10px;
  color: #666;
  display: block;
`;

export const EditFormGrid = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

export const FullWidthFormGroup = styled(FormGroup)`
  grid-column: 1 / -1;
`;

export const ReadOnlyInput = styled(Input)`
  background-color: #f0f0f0;
  color: #666;
  cursor: not-allowed;
`;

export const Select = styled.select`
  width: 100%;
  padding: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 12px;
  color: black;
  background-color: white;
`;

export const EditableFieldsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const EditableField = styled.div`
  margin-bottom: 15px;
`;

export const FullWidthEditableField = styled(EditableField)`
  grid-column: 1 / -1;
`;

export const DoctorInputWrapper = styled.div`
  position: relative;
`;

export const DoctorSuggestions = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: white;
  border: 1px solid #ccc;
  border-top: none;
  list-style-type: none;
  margin: 0;
  padding: 0;
  max-height: 150px;
  overflow-y: auto;
  z-index: 1;
`;

export const DoctorSuggestionItem = styled.li`
  padding: 8px;
  cursor: pointer;
  color: black;
  &:hover {
    background-color: #f0f0f0;
  }
`;

export const EditFormContainer = styled.div`
  background-color: #ff6a33; // Alterado de #ffa573 para um tom mais escuro
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  max-height: calc(100vh - 200px);
  overflow-y: auto;
`;

export const PaginationEllipsis = styled.span`
  margin: 0 5px;
  color: white;
`;

export const FormColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const FormFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
`;

export const Tooltip = styled.div`
  visibility: hidden;
  width: 200px;
  background-color: #382EC4;
  color: white;
  text-align: center;
  border-radius: 6px;
  padding: 5px;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -100px;
  opacity: 0;
  transition: opacity 0.3s;

  ${TooltipContainer}:hover & {
    visibility: visible;
    opacity: 1;
  }

  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #382EC4 transparent transparent transparent;
  }
`;

export const DesktopView = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

export const MobileView = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
`;

export const MobileCard = styled.div`
  background-color: #ffa573;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
  overflow: hidden;
`;

export const MobileCardHeader = styled.div`
  background-color: #ff7f50;
  color: white;
  padding: 12px 16px;
`;

export const MobileCardTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #4f98a0;
  }
`;

export const MobileCardSubtitle = styled.p`
  margin: 4px 0 0;
  font-size: 14px;
`;

export const MobileCardContent = styled.div`
  padding: 16px;
  color: white;
`;

export const MobileCardItem = styled.div`
  margin-bottom: 12px;
`;

export const MobileCardLabel = styled.span`
  font-weight: bold;
  font-size: 14px;
  color: white;
  display: block;
  margin-bottom: 4px;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
`;

export const MobileCardValue = styled.span`
  font-size: 14px;
  color: white;
`;

export const MobileCardFooter = styled.div`
  padding: 12px 16px;
  background-color: #ff7f50;
  display: flex;
  justify-content: flex-end;
`;

export const SignatureSavedMessage = styled.p`
  color: #4CAF50;
  font-size: 14px;
  margin-top: 5px;
`;

export const SignatureCanvas = styled.canvas`
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  height: 200px;
  touch-action: none;
`;

export const SignatureButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  gap: 10px;
`;

export const SignatureButton = styled.button`
  background-color: #4f98a0;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #3d7a80;
  }
`;

export const SignatureSaved = styled.p`
  color: #4CAF50;
  font-size: 14px;
  margin-top: 5px;
`;

export const EmptyMessage = styled.div`
  text-align: center;
  font-size: 16px;
  color: white;
  margin-top: 20px;
`;

