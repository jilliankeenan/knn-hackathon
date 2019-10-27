import React, { Fragment } from 'react';
import VideoImage from '../../../src/video.jpg'
import {
    Link
} from "react-router-dom";
import Dropzone from 'react-dropzone'
import { ImageContainer, CatalogueHeader, DropzoneMessage, NavLink, SubHeading, Heading, VideoContainer, VideoDetailsContainer, PageContainer, DropzoneContainer } from './styled';
import { Heading as MainHeading } from '../../components/Heading';
import { useFetch } from "../../hooks/useFetch";

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

    const [catalogueData, loading] = useFetch(
        "https://knn-functions.azurewebsites.net/api/getCatalogue"
    )
    return (
        <Fragment>
            <PageContainer>
                <CatalogueHeader>
                    <MainHeading>Video Catalogue</MainHeading>
                    <Dropzone onDrop={handleUploadFile}>
                        {({ getRootProps, getInputProps }) => (
                            <div>
                                <DropzoneContainer {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <DropzoneMessage isDark>Upload new video for analysis</DropzoneMessage>
                                    <DropzoneMessage>Videos must be in .mp4 format</DropzoneMessage>
                                </DropzoneContainer>
                            </div>
                        )}
                    </Dropzone>
                </CatalogueHeader>
                {catalogueData.map((data, index) => (
                    <div key={index}>
                        <VideoContainer>
                            <NavLink to={`/result/${catalogueData[index].id}`}>
                                <ImageContainer src={'https://marketingland.com/wp-content/ml-loads/2015/01/video-generic-ss-1920.jpg'} ></ImageContainer>
                                <VideoDetailsContainer>
                                    <Heading>{catalogueData[index].name}</Heading>
                                    <SubHeading>Around {Math.floor(catalogueData[index].durationInSeconds / 60)} minute(s)</SubHeading>
                                </VideoDetailsContainer>
                            </NavLink>
                        </VideoContainer>
                    </div>
                ))}
            </PageContainer>
        </ Fragment>
    );
};

export default CataloguePage;