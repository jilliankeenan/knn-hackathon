import React from 'react';
import { Wrapper, Token } from './styled'

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)   // General scroll to element function


const TranscriptionPane = ({ transcription, onTokenClick, currentTokenIndex }) => {    
    const rawText = transcription
        .map(({ text, ...rest }, index) => (
            <Token
                key={index}
                isCurrentTokenIndex={currentTokenIndex === index}
                onClick={(event) => onTokenClick({ text, ...rest }, event)}
            >
                {`${text} `}
            </Token>));

    return (
        <Wrapper>
            {rawText}
        </Wrapper>
    );
}

export default TranscriptionPane;