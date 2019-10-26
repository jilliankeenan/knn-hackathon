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
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [textSearchResults, setTextSearchResults] = useState([]);
    const [entitySearchResults, setEntitySearchResults] = useState([]);

    // console.log({ resultData, searchTerm });

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

    const handleOnResultClick = (result) => {
        const firstInstance = result.instances.length > 0 ? result.instances[0] : null;

        if (!firstInstance) {
            console.log('No instances! :(');
            return;
        }

        const time = instanceToSeconds(firstInstance.start)
        playerRef.current.seekTo(time, 'seconds');
        setShowSearchResults(false);
    };

    const handleSearchTermChange = (event) => {
        const value = event.target.value;

        if (!value) {
            setShowSearchResults(false);
            setTextSearchResults({});
            setEntitySearchResults({});
        }

        if (value && value.length > 2) {
            setShowSearchResults(true);

            const textSearchResults = resultData.transcription.filter(({ text }) => {
                if (text && searchTerm && text.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return true;
                }
            }).map((result) => ({ ...result, searchTerm }));

            setTextSearchResults(textSearchResults);
            setEntitySearchResults([{
                token: 'something that is an entity'
            }]);
        }

        setSearchTerm(event.target.value)
    };

    return (
        <Fragment>
            <PageContainer>
                <Heading>{resultData.name}</Heading>
                <FlexContainer>
                    <VideoContainer>
                        <ControlBar>
                            <SearchBar
                                showSearchResults={showSearchResults}
                                onKeyUp={handleSearchTermChange}
                                // onBlur={() => setShowSearchResults(false)}
                                textSearchResults={textSearchResults}
                                entitySearchResults={entitySearchResults}
                                onResultClick={handleOnResultClick}
                                onFocus={() => {
                                    if (searchTerm) {
                                        setShowSearchResults(true)
                                    }
                                }}
                            />
                        </ControlBar>
                        <VideoPlayer
                            ref={playerRef}
                            url={resultData.videoPlayerUrl}
                            onProgress={handleOnProgress}
                            progressInterval={50}
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