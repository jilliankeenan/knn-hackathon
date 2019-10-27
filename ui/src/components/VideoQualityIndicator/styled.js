import styled from 'styled-components';

const getStatusColor = ({ status, theme }) => {

  if (status === 'high') {
    return theme.colors.positive;
  } else if (status === 'medium') {
    return theme.colors.medium;
  } else {
    return theme.colors.negative;
  }
};

export const Wrapper = styled.div`
    margin-top: .5rem;
    border: 1px solid #eee;
    border-left: 4px solid ${getStatusColor};
    padding: .8rem;
    border-radius: 4px;
`;

export const Heading = styled.div`
    font-weight: bold;
    font-size: ${({theme}) => theme.fontSizes.lg}
    color: ${getStatusColor};
    padding-bottom: .4rem;
    font-family: ${({ theme }) => theme.fonts.headings}
`;