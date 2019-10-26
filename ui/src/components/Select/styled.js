import styled from 'styled-components';

export const StyledSelect = styled.select`
    width: 100%;
    height: 45px;
    font-size: ${({ theme }) => theme.fontSizes.lg};
    border-radius: ${({ theme }) => theme.radii.default};
    border: 2px solid ${({ theme }) => theme.colors.grey.default};
    outline: none;
    transition: .2s all ease;
    
    ::-webkit-input-placeholder { /* Edge */
        color: ${({ theme }) => theme.colors.grey.text};
    }
    
    :-ms-input-placeholder { /* Internet Explorer 10-11 */
        color: ${({ theme }) => theme.colors.grey.text};
    }
    
    ::placeholder {
        color: ${({ theme }) => theme.colors.grey.text};
    }

    &:focus {
        -webkit-box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.focus};
        box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.focus};
        border-color: ${({ theme }) => theme.colors.grey.dark};
    }
`;