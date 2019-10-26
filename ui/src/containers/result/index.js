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
    const [searchTerm, setSearchTerm] = useState('');

    console.log({ resultData, searchTerm });

    return (
        <Fragment>
            <PageContainer>
                <Heading>{resultData.name}</Heading>
                <FlexContainer>
                    <VideoContainer>
                        <ControlBar>
                            <SearchBar onChange={(event) => setSearchTerm(event.target.value)} />
                        </ControlBar>
                        <VideoPlayer />
                        <VideoQualityIndicator>Video Quality Indicator</VideoQualityIndicator>
                    </VideoContainer>
                    <TranscriptionPaneContainer>
                        <ControlBar>
                            <Select>
                                <option>English</option>
                                <option>Spanish</option>
                                <option>French</option>
                                <option>Swedish</option>
                            </Select>
                        </ControlBar>
                        Transcription Pane
                    </TranscriptionPaneContainer>
                </FlexContainer>
            </PageContainer>
        </Fragment>
    );
};

export default ResultPage;