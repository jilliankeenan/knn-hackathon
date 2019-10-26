import styled from 'styled-components';
import {
    Link
} from "react-router-dom";

export const Nav = styled.nav`

    background: ${({ theme }) => theme.colors.primary};
    padding: 1rem;
    height: 45px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    box-shadow: ${({ theme }) => theme.shadows.default};
`;

export const Brand = styled(Link)`
    color: white;
    font-size: 1.2rem;
    text-decoration: none;
    text-transform: uppercase;
`;

export const AppContainer = styled.nav`

    background: ${({ theme }) => theme.colors.background};
    height: 100vh;
`;
