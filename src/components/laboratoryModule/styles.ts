import styled from 'styled-components';

export const Container = styled.div`
  background-color: #ff6a33;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  width: 300px;
  padding: 20px;
  margin-left: 20px;
  height: fit-content;
`;

export const Header = styled.h2`
  color: white;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
`;

export const TabsContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;

export const Tab = styled.button<{ $active: boolean }>`
  padding: 8px 16px;
  border: none;
  background: none;
  color: ${props => props.$active ? 'white' : 'rgba(255, 255, 255, 0.7)'};
  font-weight: bold;
  cursor: pointer;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background-color: ${props => props.$active ? 'white' : 'transparent'};
  }

  &:hover {
    color: white;
  }
`;

export const Content = styled.div`
  padding: 10px 0;
  background-color: #ffa573;
  border-radius: 8px;
  padding: 15px;
`;

export const Section = styled.div`
  margin-bottom: 20px;
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;

export const SectionTitle = styled.h3`
  color: white;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 8px;

  svg {
    color: white;
  }
`;

export const Counter = styled.span`
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
`;

export const UploadContainer = styled.div`
  margin-bottom: 15px;
`;

export const UploadLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: #1e88e5;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  transition: background-color 0.2s;
  width: fit-content;

  &:hover {
    background-color: #1976d2;
  }

  &:active {
    background-color: #1565c0;
  }
`;

export const UploadInput = styled.input`
  display: none;
`;

export const FileList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: white;
  font-weight: bold;
`;

