import React, { useCallback, Fragment, useState } from 'react';
import VideoImage from '../../../src/video.jpg'
import {
    Link
} from "react-router-dom";
import Dropzone, { useDropzone } from 'react-dropzone'
import { catalogueData } from './mockDataCatalogue';
import { ImageContainer, Input, VideoContainer, VideoDetailsContainer, PageContainer } from './styled';
import { useFetch } from "./useEffect";

const CataloguePage = () => {
    const handleUploadFile = (acceptedFiles) => {
        fetch('https://knn-functions.azurewebsites.net/api/ingest', { // Your POST endpoint
            method: 'POST',
            headers: {
                // Content-Type may need to be completely **omitted**
                // or you may need something
                "Content-Type": "video/mp4"
            },
            body: acceptedFiles[0] // This is your file object
        }).then(
            response => response.json() // if the response is a JSON object
        ).then(
            success => console.log(success) // Handle the success response object
        ).catch(
            error => console.log(error) // Handle the error response object
        );
    }


    fetch('https://knn-functions.azurewebsites.net/api/getCatalogue')
    // .then(res => {
    //     res.json().then((result) => {
    //         setCatalogueData(result)
    //     })
    // }
    const [catalogueData, loading] = useFetch(
        "https://knn-functions.azurewebsites.net/api/getCatalogue"
    )
    console.log(catalogueData, "catalogue")

    return (
        <Fragment>
            <PageContainer>
                <h1>Video Catalogue</h1>
                <Dropzone onDrop={handleUploadFile}>
                    {({ getRootProps, getInputProps }) => (
                        <section>
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <p>Drag 'n' drop some files here, or click to select files</p>
                            </div>
                        </section>
                    )}
                </Dropzone>
                {catalogueData.map((data, index) => (
                    <div key={index}>
                        <VideoContainer>
                            <ImageContainer src={VideoImage} ></ImageContainer>
                            <VideoDetailsContainer>
                                <h1>Name: {catalogueData[index].name}</h1>
                                <h1>Duration: {Math.floor(catalogueData[index].durationInSeconds / 60)} minute(s)</h1>
                            </VideoDetailsContainer>
                        </VideoContainer>
                    </div>
                ))}
            </PageContainer>
        </ Fragment>
    );
};

export default CataloguePage;