import React, { Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';
import mockData from './mock';
import { Heading } from '../../components/Heading';
import VideoPlayer from '../../components/VideoPlayer';
import SearchBar from '../../components/SearchBar';
import Select from '../../components/Select';
import VideoQualityIndicator from '../../components/VideoQualityIndicator';
import TranscriptionPane from '../../components/TranscriptionPane';
import { PageContainer, FlexContainer, VideoContainer, TranscriptionPaneContainer, ControlBar } from './styled';

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
                        <VideoQualityIndicator status={resultData.videoQuality} />
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
                        <TranscriptionPane text={resultData.transcriptionText} />
                    </TranscriptionPaneContainer>
                </FlexContainer>
            </PageContainer>
        </Fragment>
    );
};

export default ResultPage;