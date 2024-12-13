import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
 height: auto;
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  height: calc(100vh - 4rem);
  margin-top: 5rem;
  @media (max-width: 768px) {
    width: 28rem;
    height: auto;
  }
`;

export const Card = styled.div`
  background: #ffa573;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #4f98a0;
  @media (max-width: 768px) {
    width: 22rem;
    height: auto;
  }
`;

export const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: 900;
  color: #4f98a0;
  @media (max-width: 768px) {
   font-size: 2.2;
  }
`;

export const IconWrapper = styled.div`
  background-color: #4f98a0;
  padding: 0.75rem;
  border-radius: 50%;
`;

export const CalendarIcon = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  position: relative;
  &:before {
    content: '+';
    color: white;
    font-size: 2rem;
    font-weight: bold;
    position: absolute;
    font-size: 600;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const FilterForm = styled.div`
  margin-bottom: 2rem;
`;

export const FilterInputGroup = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const FilterInput = styled.input`
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  min-width: 0;
`;

export const DesktopTable = styled.div`
  display: block;
  @media (max-width: 768px) {
    display: none;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
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
  padding: 1rem;
  font-weight: 800;
  background-color: #ff7f50;
  color: #fff;
  border-bottom: 2px solid #e2e8f0;
`;

export const TableCell = styled.td`
  padding: 1rem;
  color: #fff;
  background-color: #ff7f50;
  border-bottom: 1px solid #e2e8f0;
`;

export const MobileCards = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

export const MobileCard = styled.div`
  color: #fff;
  background-color: #ff7f50;
  border-bottom: 1px solid #e2e8f0;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
`;

export const MobileCardItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f0f4ff;
  &:last-child {
    border-bottom: none;
  }
`;

export const MobileLabel = styled.span`
  font-weight: 700;
  color: #fff;
`;

export const HiddenContent = styled.div<{ isVisible: boolean }>`
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
    padding: 0.5rem 0;
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
  padding: 0.5rem 1rem;
  margin: 0.25rem;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 0.875rem;
  min-width: 2.5rem;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    padding: 0.25rem 0.5rem;
    font-size: 0.7rem;
    min-width: 1.5rem;
    margin: 0.125rem;
  }
`;

export const PaginationText = styled.span`
  margin: 0 1rem;
`;

export const PaginationEllipsis = styled.span`
  margin: 0 0.25rem;
  color: #4f98a0;

  @media (max-width: 768px) {
    margin: 0 0.1rem;
  }
`;

