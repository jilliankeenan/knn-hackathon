import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100% !important;
    height: 380px !important;
    outline: none;
    transition: .3s all ease;

    &:focus {
        -webkit-box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.focus};
        box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.focus};
        border-color: ${({ theme }) => theme.colors.grey.dark};
    }

    iframe {
        border-radius: 6px;
    }
`;