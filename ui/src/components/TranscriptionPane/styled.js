import styled from 'styled-components';

export const Wrapper = styled.div`
  overflow-y: auto;
  height: 500px;
  line-height: 1.4;
  padding: 8px;
`;

export const Token = styled.span`
  cursor: pointer;
  background-color: ${({ isCurrentTokenIndex }) => isCurrentTokenIndex && '#d0f3eb'};
  transition: .2s all ease;
  border-radius: 5px;
  padding: 1px;
  font-size: 1.1rem;

  :hover {
    background-color: #fff5dd;
  }
`;