// styled components should go in here and be imported into container
import styled from 'styled-components';
import {
    Link
} from "react-router-dom";

export const NavLink = styled(Link)`
    text-decoration: none;
`
export const ImageContainer = styled.img`
    display: flex;
    flex-direction: column; 
    align-content: center;
    height: 300px;
    width: 400px;
    border-radius: 4px;
    
`;

export const Input = styled.input`
    width: 100%;
    height: 45px;
    font-size: ${({ theme }) => theme.fontSizes.lg};
    -webkit-appearance: none;
`;

export const VideoContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: auto;
    margin-right: auto;
    width:400px;
    margin-top:2rem;
    margin-bottom:2rem;
    border-radius: 7px;
    border: 3px solid #eee;

    :hover {
        border: 3px solid ${({ theme }) => theme.colors.focus};
    }
    transition: .3s all ease;

`;

export const VideoDetailsContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: .5rem 1rem;

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

export const Heading = styled.h1`
    font-family: ${({ theme }) => theme.fonts.headings};
    padding-botton: 1.5rem;
    font-weight: bold;
    font-size: 1.8rem;
    margin-bottom: 0;
    margin-top: 0;
    color: black;
    text-decoration: none;
`;

export const SubHeading = styled.h2`
    font-family: ${({ theme }) => theme.fonts.headings};
    padding-botton: 1.5rem;
    font-weight: bold;
    font-size: 1rem;
    margin-bottom: .2rem;
    margin-top: 0;
    color: lightgray;
    text-decoration: none;
`;

export const CatalogueHeader = styled.div`
    text-align: center;
`;

export const DropzoneContainer = styled.div`
    font-size: ${({ theme }) => theme.fontSizes.lg};
    border-radius: ${({ theme }) => theme.radii.default};
    border: 2px dashed ${({ theme }) => theme.colors.primary};
    padding: 1rem;
    margin: 1.5rem;
    padding-left: 1rem;
    padding-right: 1rem;
    -webkit-appearance: none;
    outline: none;
    transition: .2s all ease;
    cursor: pointer;
    
    ::-webkit-input-placeholder { /* Edge */
        color: ${({ theme }) => theme.colors.grey.text};
    }
    
    :-ms-input-placeholder { /* Internet Explorer 10-11 */
        color: ${({ theme }) => theme.colors.grey.text};
    }
    
    ::placeholder {
        color: ${({ theme }) => theme.colors.grey.text};
    }

    &:focus, &:hover {
        background: #d3d3d336;
    }

    width: 500px;
    margin-left: auto;
    margin-right: auto;
`;

export const DropzoneMessage = styled.p`
    color: ${({ isDark }) => isDark ? 'black' : 'lightgrey' };
    font-size: ${({ isDark }) => isDark ? '' : '.95rem' };
    margin-top: .2rem;
    margin-bottom: 0;
`;