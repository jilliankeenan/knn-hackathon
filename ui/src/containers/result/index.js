import React, { Fragment, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import mockData from './mock';
import { Heading } from '../../components/Heading';
import VideoPlayer from '../../components/VideoPlayer';
import SearchBar from '../../components/SearchBar';
import Select from '../../components/Select';
import VideoQualityIndicator from '../../components/VideoQualityIndicator';
import TranscriptionPane from '../../components/TranscriptionPane';
import { PageContainer, FlexContainer, VideoContainer, TranscriptionPaneContainer, ControlBar } from './styled';

const instanceToSeconds = (instanceTime) => {
    const time = instanceTime.split('.')[0];
    const a = time.split(':');
    return (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
};

const ResultPage = () => {
    const playerRef = useRef(null);
    const { videoId } = useParams();
    const [resultData, setResultData] = useState(mockData);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentTokenIndex, setCurrentTokenIndex] = useState(0);

    console.log({ resultData, searchTerm });

    const handleTokenClick = (tokenDetail) => {
        const firstInstance = tokenDetail.instances.length > 0 ? tokenDetail.instances[0] : null;

        if (!firstInstance) {
            console.log('No instances! :(');
            return;
        }

        const time = instanceToSeconds(firstInstance.start)

        playerRef.current.seekTo(time, 'seconds');
    };

    const handleOnProgress = ({ playedSeconds }) => {
        const currentToken = resultData.transcription.find((token) => {
            const firstInstance = token.instances.length > 0 ? token.instances[0] : null;

            if (!firstInstance) {
                return;
            }

            const startTime = instanceToSeconds(firstInstance.start);
            const endTime = instanceToSeconds(firstInstance.end);

            if (playedSeconds > startTime && playedSeconds < endTime) {
                return true;
            }
        });

        if (currentToken) {
            setCurrentTokenIndex(currentToken.id - 1)
        }
    };

    return (
        <Fragment>
            <PageContainer>
                <Heading>{resultData.name}</Heading>
                <FlexContainer>
                    <VideoContainer>
                        <ControlBar>
                            <SearchBar
                                onChange={(event) => setSearchTerm(event.target.value)}
                            />
                        </ControlBar>
                        <VideoPlayer
                            ref={playerRef}
                            url={resultData.videoPlayerUrl}
                            onProgress={handleOnProgress}
                            progressInterval={500}
                        />
                        <VideoQualityIndicator
                            status={resultData.videoQuality}
                        />
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
                        <TranscriptionPane
                            currentTokenIndex={currentTokenIndex}
                            onTokenClick={handleTokenClick}
                            transcription={resultData.transcription}
                        />
                    </TranscriptionPaneContainer>
                </FlexContainer>
            </PageContainer>
        </Fragment>
    );
};

export default ResultPage;