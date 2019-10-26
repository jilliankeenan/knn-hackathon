import React, { Fragment } from 'react';
import VideoImage from '../../../src/video.jpg'
import {
    Link
} from "react-router-dom";
import { catalogueData } from './mockDataCatalogue';
import { ImageContainer } from './styled';
const CataloguePage = () => {

    // vidarCall(video) {
    //     return new Promise((resolve, reject) => {
    //         vidarProxy('', 'POST', {
    //             //POST REQUEST
    //             .then((response) => {
    //             //RECIEVE REQUEST
    //         }),
    //         }).catch((error) => {
    //             reject({
    //                 hasError: true,
    //                 errorMessage: error
    //             })
    //         });
    //     })
    // }
    console.log(catalogueData)

    return (
        <Fragment>
            <h1>Video Catalogue</h1>
            <Link to="/result">Link to a result page</Link>
            {catalogueData.map((data, index) => (
            <div key={index}> 
                <ImageContainer src={VideoImage} ></ImageContainer>
                <div>
                    <p>{data.videoStatus}</p>
                    <p>{data.videoName}</p>      
                    <p>{data.runTime}</p>
                </div>
            </div>
            
            ))};
        </ Fragment>
    );
};

export default CataloguePage;