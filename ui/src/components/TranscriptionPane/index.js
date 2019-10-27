import React from 'react';
import { Wrapper, Token } from './styled'


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
            {!transcription || transcription.length === 0 && <p>No transcription available</p>}
            {rawText}
        </Wrapper>
    );
}

export default TranscriptionPane;