import React, { Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';
import mockData from './mock';
import { Heading } from '../../components/Heading';
import VideoPlayer from '../../components/VideoPlayer';
import SearchBar from '../../components/SearchBar';
import Select from '../../components/Select';
import { PageContainer, FlexContainer, VideoContainer, TranscriptionPaneContainer, ControlBar, VideoQualityIndicator } from './styled';

const ResultPage = () => {
    const { videoId } = useParams();
    const [resultData, setResultData] = useState(mockData);

    console.log({ resultData });

    return (
        <Fragment>
            <PageContainer>
                <Heading>{resultData.name}</Heading>
                <FlexContainer>
                    <VideoContainer>
                        <ControlBar>
                            <SearchBar />
                        </ControlBar>
                        <VideoPlayer />
                        <VideoQualityIndicator>Video Quality Indicator</VideoQualityIndicator>
                    </VideoContainer>
                    <TranscriptionPaneContainer>
                        <ControlBar>
                            <Select />
                        </ControlBar>
                        Transcription Pane
                    </TranscriptionPaneContainer>
                </FlexContainer>
            </PageContainer>
        </Fragment>
    );
};

export default ResultPage;