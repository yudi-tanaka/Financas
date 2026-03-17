import styled from "styled-components";

export const Container = styled.div`
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
`;

export const Title = styled.h1`
    font-size: 28px;
    margin-bottom: 20px;
    color: #333;
`;

export const Subtitle = styled.h2`
    font-size: 22px;
    margin-bottom: 15px;
    color: #555;
`;

export const Button = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;

    th, td {
        border: 1px solid #ddd;
        padding: 3px;
        text-align: center;
    };
`;

export const TableHeader = styled.th`
    background-color: #d4d4d4;
`;



export const Input = styled.input`
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px; 
    margin-bottom: 20px;
    width: 100%;
    box-sizing: border-box;
`;

export const Select = styled.select`
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 20px;
    width: 100%;
`;


export const ErrorMessage = styled.p`
    color: red;
    margin-bottom: 14px;
`;

export const DisplayFlex = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
`;

export const Label = styled.label`
    display: block; 
    margin-bottom: 5px;
`;



export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`

export const Card = styled.div`
  height: 150px;
  background: #0d6efd;
  color: white;
  border-radius: 12px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: #0b5ed7;
    transform: translateY(-3px);
  }
`

export const Icon = styled.div`
  font-size: 28px;
  margin-bottom: 8px;
`

export const Text = styled.span`
  font-size: 14px;
  font-weight: 500;
`

    
    