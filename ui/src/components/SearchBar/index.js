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
                            const firstEntry = result.instances.length > 0 && result.instances[0];
                            const splitText = result.text.split(result.searchTerm);

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
                        {entitySearchResults.length === 0 && <p>No Results</p>}
                        {entitySearchResults.map((result, index) => {
                            const firstEntry = result.instances.length > 0 && result.instances[0];

                            return (
                                <SearchResult onClick={() => onResultClick(result)} key={index}>
                                    <TimeStamp>{firstEntry.start}</TimeStamp>
                                    {result.name}
                                </SearchResult>
                            );
                        })}
                    </ResultSection>
                </FloatingDiv>
            }
        </Fragment>
    );
}

export default SearchBar;