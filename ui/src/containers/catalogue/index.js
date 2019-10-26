import React, { Fragment } from 'react';
import {
    Link
  } from "react-router-dom";

const CataloguePage = () => {



    return (
        <Fragment>
            <h1>This is the catalogue page</h1>
            <Link to="/result">Link to a result page</Link>
        </ Fragment>
    );
};

export default CataloguePage;