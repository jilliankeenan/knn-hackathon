import React, { useCallback, Fragment } from 'react';
import VideoImage from '../../../src/video.jpg'
import {
    Link
} from "react-router-dom";
import Dropzone, { useDropzone } from 'react-dropzone'
import { catalogueData } from './mockDataCatalogue';
import { ImageContainer, Input, VideoContainer, VideoDetailsContainer, PageContainer } from './styled';


function MyDropzone() {
    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            {
                isDragActive ?
                    <p>Drop the files here ...</p> :
                    <p>Drag 'n' drop some files here, or click to select files</p>
            }
        </div>
    )
}

const CataloguePage = () => {

    function vidarCall() {
        fetch('https://knn-functions.azurewebsites.net/api/getCatalogue')
            .then(res => {

                res.json().then((result) => {
                    console.log(result)
                })
             
            })
            .then((data) => {
                console.log(data)
            }).catch(() => { console.log('something went wrong') })
    }

    console.log(catalogueData)


    return (
        <Fragment>
            <PageContainer>
                {vidarCall()}
                <h1>Video Catalogue</h1>
                <Link to="/result">Link to a result page</Link>
                <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
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
                                <h1>{data.videoName}</h1>
                                <h1>{data.videoStatus}</h1>
                                <h1>{data.runTime}</h1>
                            </VideoDetailsContainer>
                        </VideoContainer>
                    </div>
                ))}
            </PageContainer>
        </ Fragment>
    );
};

export default CataloguePage;