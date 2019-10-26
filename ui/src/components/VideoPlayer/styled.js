import styled from 'styled-components';

export const Video = styled.video`
    width: 100%;
    height: 380px;
    border-radius: 6px;
    outline: none;
    transition: .3s all ease;

    &:focus {
        -webkit-box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.focus};
        box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.focus};
        border-color: ${({ theme }) => theme.colors.grey.dark};
    }
`;