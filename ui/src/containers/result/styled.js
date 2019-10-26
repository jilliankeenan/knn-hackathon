import styled from 'styled-components';

export const FlexContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

export const VideoContainer = styled.div`
    width: 70%;
    padding: .5rem;
`;

export const TranscriptionPaneContainer = styled.div`
    width: 30%;
    padding: .5rem;
`;

export const PageContainer = styled.div`
    margin-top: 4rem;
    margin-right: auto;
    margin-left: auto;
    padding: 1rem;
    width: 900px;
    box-shadow: ${({ theme }) => theme.shadows.default};
    border-radius: ${({ theme }) => theme.radii.default};
`

export const ControlBar = styled.div`
    height: 45px;
    width: 100%;
    padding-bottom: .5rem;
`;

export const VideoQualityIndicator = styled.div`
    background: papayawhip;
    height: 30px;
`;