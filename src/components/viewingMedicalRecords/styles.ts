import styled from 'styled-components';

export const Container = styled.div`
  max-width: 100%;
  min-height: 100vh;
  margin: 0 auto;
  padding: 10px;
  margin-top: 5rem;
`;

export const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const Card = styled.div`
  background-color: #FF7F50;
  border-radius: 8px;
  padding:24px;
  box-shadow: 0 2px 4px rgba(0,0, 0, 0.1);
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 7px;
`;

export const Title = styled.h1`
  font-size: 20px;
  color: #4f98a0;
  margin: 0;
`;

export const IconWrapper = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color:#4f98a0;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.2s;


  .cross-icon {
    position: relative;
    width: 20px;
    height: 20px;

  }

  .cross-icon::before,
  .cross-icon::after {
    content: '';
    position: absolute;
    background-color: #FFFFFF;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .cross-icon::before {
    width: 100%;
    height: 2px;
  }

  .cross-icon::after {
    width: 2px;
    height: 100%;
  }
`;

export const FilterForm = styled.form`
  margin-bottom: 8px;
`;

export const FilterInputGroup = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;

export const FilterInput = styled.input`
  flex: 1;
  min-width: 200px;
  padding: 6px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  font-size: 16px;
  background-color: rgba(255, 255, 255, 0.9);

  &:focus {
    outline: none;
    border-color: #fff;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.2);
  }
`;

export const QuickSearchBar = styled.div`
  margin-bottom: 5px;
`;

export const QuickSearchInput = styled(FilterInput)`
  width: 100%;
  font-size: 16px;
`;

export const TableContainer = styled.div`
  background-color: #FF6347; 
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHeader = styled.thead`
  background-color: #FF6347; 
`;

export const TableBody = styled.tbody`
  tr {
    background-color: #FF6347; 
    color: white;
  }

  tr:nth-child(even) {
    background-color: #FF7256; 
  }

  tr:hover {
    background-color: #FF8066; 
  }
`;

export const TableRow = styled.tr`
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 12px;
`;

export const TableHead = styled.th`
  padding: 12px;
  text-align: left;
  font-weight: 600;
  color: white;
`;

export const TableCell = styled.td`
  padding: 7px;
  color: white;
  font-size: 12px;
`;

export const MobileCards = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const MobileCard = styled.div`
  background-color: #FF6347;
  color: #ffffffff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 26px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const MobileCardItem = styled.div`
  margin-bottom: 8px;
`;

export const MobileLabel = styled.span`
  font-weight: 600;
  margin-right: 8px;
`;

export const DesktopTable = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 24px;
`;

export const PaginationButton = styled.button`
  padding: 8px 12px;
  margin: 0 4px;
  background-color: rgba(255, 255, 255, 0.9);
  color: #FF8C73;
  border: 1px solid #FF8C73;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background-color: #FF8C73;
    color: white;
  }

  &:disabled {
    background-color: rgba(255, 255, 255, 0.5);
    border-color: rgba(255, 140, 115, 0.5);
    color: rgba(255, 140, 115, 0.5);
    cursor: not-allowed;
  }
`;

export const PaginationNumbers = styled.div`
  display: flex;
`;

export const PaginationEllipsis = styled.span`
  padding: 8px 12px;
`;

export const NoResultsMessage = styled.p`
  text-align: center;
  color: #495057;
  font-style: italic;
`;

export const RecordDetails = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 24px;
  margin-top: 24px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`;

export const DetailItem = styled.div`
  label {
    display: block;
    font-weight: 600;
    margin-bottom: 4px;
    color: #495057;
  }

  p {
    margin: 0;
    color: #495057;
  }
`;

