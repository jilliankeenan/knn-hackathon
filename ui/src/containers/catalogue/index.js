import React, { useCallback, Fragment, useState } from 'react';
import VideoImage from '../../../src/video.jpg'
import {
    Link
} from "react-router-dom";
import Dropzone, { useDropzone } from 'react-dropzone'
import { catalogueData } from './mockDataCatalogue';
import { ImageContainer, CatalogueHeader, NavLink, SubHeading, Heading, VideoContainer, VideoDetailsContainer, PageContainer } from './styled';
import  { Heading as MainHeading } from '../../components/Heading';
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
            body: acceptedFiles[0] // file object
        }).then(
            response => response.json() // JSON object
        ).then(
            success => console.log(success) // Handle the success response object
        ).catch(
            error => console.log(error) // Handle the error response object
        );
    }


    fetch('https://knn-functions.azurewebsites.net/api/getCatalogue')
    const [catalogueData, loading] = useFetch(
        "https://knn-functions.azurewebsites.net/api/getCatalogue"
    )
    console.log(catalogueData, "catalogue")

    return (
        <Fragment>
            <PageContainer>
                <CatalogueHeader>
                <MainHeading>Video Catalogue</MainHeading>
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
                </CatalogueHeader>
                {catalogueData.map((data, index) => (
                    <div key={index}>
                        <NavLink to={`/result/${catalogueData[index].id}`}>
                            <VideoContainer>
                                <ImageContainer src={VideoImage} ></ImageContainer>
                                <VideoDetailsContainer>
                                    <Heading>{catalogueData[index].name}</Heading>
                                    <SubHeading>Around {Math.floor(catalogueData[index].durationInSeconds / 60)} minute(s)</SubHeading>
                                </VideoDetailsContainer>
                            </VideoContainer>
                        </NavLink>
                    </div>
                ))}
            </PageContainer>
        </ Fragment>
    );
};

export default CataloguePage;