import React from 'react';
import { Input } from './styled'

const SearchBar = ({ ...rest }) => {
    return (<Input type="search" placeholder="Search for something . . . " {...rest} />);
}

export default SearchBar;