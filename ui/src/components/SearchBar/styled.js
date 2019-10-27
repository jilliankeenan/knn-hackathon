import styled from 'styled-components';

export const Input = styled.input`
    width: 100%;
    height: 45px;
    font-size: ${({ theme }) => theme.fontSizes.lg};
    border-radius: ${({ theme }) => theme.radii.default};
    border: 2px solid ${({ theme }) => theme.colors.grey.default};
    padding-left: 1rem;
    padding-right: 1rem;
    -webkit-appearance: none;
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

export const Heading = styled.h2`
    margin-top: 0;
    margin-bottom: 0;
    padding-left: 1.2rem;
    font-family: ${({ theme }) => theme.fonts.headings};
`;

export const ResultSection = styled.div`
    width: 50%;
`

export const FloatingDiv = styled.div`
    background: white;
    position: absolute;
    width: 605px;
    margin-top: 5px;
    border-radius: 5px;
    -webkit-box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.focus};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.focus};
    border-color: ${({ theme }) => theme.colors.grey.dark};
    box-shadow: ${({ theme }) => theme.shadows.default};
    padding: .5rem;
    display: flex;
    justify-content: space-between;
    height: 300px
    overflow-y: scroll;
    z-index: 999;
`;

export const SearchResult = styled.div`
    cursor: pointer;
    padding: .5rem;
    padding-left: 1.2rem;
    padding-right: 1.2rem;
    font-size: 0.9rem;
    border-radius: 4px;

    :hover {
      background: #c7c7c738;
    }
`;

export const TimeStamp = styled.div`
    color: #8080809c;
`;

export const HighlightedTerm = styled.span`
  background-color: #d0f3eb;
  border-radius: 5px;
  padding: 1px;
  font-weight: 800;
`;

export const EmptyMessage = styled.p`
    padding-left: 1.2rem;
`;