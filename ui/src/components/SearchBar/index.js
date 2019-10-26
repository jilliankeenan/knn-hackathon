import React, { Fragment } from 'react';
import { Input, FloatingDiv, Heading, ResultSection, SearchResult, TimeStamp, HighlightedTerm } from './styled'

const SearchBar = ({ showSearchResults, entitySearchResults, textSearchResults, onResultClick, ...rest }) => {
    return (
        <Fragment>
            <Input type="search" placeholder="Search for something . . . " {...rest} />
            {showSearchResults &&
                <FloatingDiv>
                    <ResultSection>
                        <Heading>
                            Text
                        </Heading>

                        {textSearchResults.length === 0 && <p>No Results</p>}
                        {textSearchResults.map((result, index) => {
                            console.log(result)

                            const firstEntry = result.instances.length > 0 && result.instances[0];

                            const splitText = result.text.split(result.searchTerm);

                            console.log({ splitText });

                            // if (!splitText || splitText.length === 0) {
                            //     return;
                            // }

                            return (
                                <SearchResult onClick={() => onResultClick(result)} key={index}>
                                    <TimeStamp>{firstEntry.start}</TimeStamp>
                                    {splitText[0]}<HighlightedTerm>{result.searchTerm}</HighlightedTerm>{splitText[1]}
                                </SearchResult>
                            );
                        })}
                    </ResultSection>
                    <ResultSection>
                        <Heading>
                            Entities
                        </Heading>
                        {entitySearchResults.map((result, index) => <p onClick={() => onResultClick(result)} key={index}>{result.text}</p>)}
                    </ResultSection>
                </FloatingDiv>
            }
        </Fragment>
    );
}

export default SearchBar;