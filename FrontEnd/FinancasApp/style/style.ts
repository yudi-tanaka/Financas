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

export const Button = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    margin-bottom: 20px;

    &:hover {
        background-color: #0056b3;
    }
`;

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;

    th, td {
        border: 1px solid #ddd;
        padding: 8px;
    };
`;

export const TableHeader = styled.th`
    background-color: #d4d4d4;
    text-align: left;
`;



export const Input = styled.input`
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px; 
    margin-bottom: 20px;
    width: 100%;
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
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
`;

    
    