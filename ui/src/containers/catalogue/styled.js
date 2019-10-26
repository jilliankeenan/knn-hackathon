// styled components should go in here and be imported into container
import styled from 'styled-components';

export const ImageContainer = styled.img`
    display: flex;
    flex-direction: column; 
    align-content: center;
    height: 150px;
    width: 200px;
    padding: 20px;
`;

export const Input = styled.input`
    width: 100%;
    height: 45px;
    font-size: ${({ theme }) => theme.fontSizes.lg};
    -webkit-appearance: none;
`;

export const VideoContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

export const VideoDetailsContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const PageContainer = styled.div`
    margin-top: 4rem;
    margin-right: auto;
    margin-left: auto;
    padding: 1rem;
    width: 900px;
    box-shadow: ${({ theme }) => theme.shadows.default};
    border-radius: ${({ theme }) => theme.radii.default};
`;

export const Header = styled.h1`
    font-family: Roboto;
`;