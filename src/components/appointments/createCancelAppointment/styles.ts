import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  max-width: 1200px;
  width: 100%;
  min-height: 100px;
  height: auto;
  display: flex;
  flex-direction: column;
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 0.25rem;
    min-height: auto;
    height: auto;
    justify-content: flex-start;
    margin-top: 5rem;
    margin-bottom: 5rem;
  }
`;

export const Card = styled.div`
  background: #ffa573;
  border-radius: 0.25rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  height: 100%;

  @media (max-width: 768px) {
    height: auto;
    min-height: auto;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  padding-bottom: 0.25rem;
  border-bottom: 1px solid #4f98a0;
 
  @media (max-width: 768px) {
    position: sticky;
    top: 0;
    background: #ffa573;
    z-index: 10;
    padding-top: 0.5rem;
  }
`;

export const Title = styled.h1`
  font-size: 1.1rem;
  font-weight: 900;
  color: #4f98a0;
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const IconWrapper = styled.div`
  background-color: #4f98a0;
  padding: 0.25rem;
  border-radius: 50%;
`;

export const CalendarIcon = styled.div`
  width: 0.75rem;
  height: 0.75rem;
  position: relative;
  &:before {
    content: '+';
    color: white;
    font-size: 1rem;
    font-weight: bold;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const FilterForm = styled.div`
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    position: sticky;
    top: 3rem;
    background: #ffa573;
    z-index: 9;
    padding: 0.5rem 0;
  }
`;

export const FilterInputGroup = styled.div`
  display: flex;
  gap: 0.25rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const FilterInput = styled.input`
  flex: 1;
  padding: 0.2rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.2rem;
  min-width: 0;
  font-size: 0.75rem;
`;

export const TableContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    overflow-y: auto;
  }
`;

export const DesktopTable = styled.div`
  display: block;
  flex: 1;
  @media (max-width: 768px) {
    display: none;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-size: 0.75rem;
`;

export const TableHeader = styled.thead`
  background-color: #f8fafc;
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f8fafc;
  }
`;

export const TableHead = styled.th`
  text-align: left;
  padding: 0.3rem;
  font-weight: 800;
  background-color: #ff7f50;
  color: #fff;
  border-bottom: 1px solid #e2e8f0;
`;

export const TableCell = styled.td`
  padding: 0.3rem;
  color: #fff;
  background-color: #ff7f50;
  border-bottom: 1px solid #e2e8f0;
`;

export const MobileCards = styled.div`
  display: none;
  flex: 1;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    overflow-y: auto;
    max-height: none;
    height: auto;
  }
`;

export const MobileCard = styled.div`
  color: #fff;
  background-color: #ff7f50;
  border-bottom: 1px solid #e2e8f0;
  padding: 0.3rem;
  border-radius: 0.2rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
  font-size: 0.75rem;
`;

export const MobileCardItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.15rem 0;
  border-bottom: 1px solid #f0f4ff;
  &:last-child {
    border-bottom: none;
  }
`;

export const MobileLabel = styled.span`
  font-weight: 700;
  color: #fff;
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.25rem;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
    padding: 0.15rem 0;
    position: sticky;
    bottom: 0;
    background: #ffa573;
    z-index: 10;
  }
`;

export const PaginationNumbers = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    flex: 1;
    justify-content: center;
  }
`;

export const PaginationButton = styled.button`
  background-color: #4f98a0;
  color: white;
  border: none;
  padding: 0.2rem 0.3rem;
  margin: 0.08rem;
  border-radius: 0.2rem;
  cursor: pointer;
  font-size: 0.75rem;
  min-width: 1.5rem;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    padding: 0.15rem 0.25rem;
    font-size: 0.65rem;
    min-width: 1rem;
    margin: 0.05rem;
  }
`;

export const PaginationEllipsis = styled.span`
  margin: 0 0.06rem;
  color: #4f98a0;

  @media (max-width: 768px) {
    margin: 0 0.03rem;
  }
`;

export const NoResultsMessage = styled.p`
  text-align: center;
  color: #4f98a0;
  font-size: 0.7rem;
  margin-top: 0.5rem;
`;

