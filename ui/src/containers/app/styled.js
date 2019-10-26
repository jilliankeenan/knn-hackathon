import styled from 'styled-components';
import {
    Link
} from "react-router-dom";

export const Nav = styled.nav`

    background: ${({ theme }) => theme.colors.primary};
    padding: 1rem;
    box-shadow: ${({ theme }) => theme.shadows.default};
`;

export const NavLink = styled(Link)`
    color: white;
`;

export const AppContainer = styled.nav`

    background: ${({ theme }) => theme.colors.background};
    height: 100vh;
`;
