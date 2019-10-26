import React, { Fragment, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import mockData from './mock';
import { Heading } from '../../components/Heading';
import VideoPlayer from '../../components/VideoPlayer';
import SearchBar from '../../components/SearchBar';
import Select from '../../components/Select';
import VideoQualityIndicator from '../../components/VideoQualityIndicator';
import TranscriptionPane from '../../components/TranscriptionPane';
import useFetch from '../../hooks/useFetch';
import { PageContainer, FlexContainer, VideoContainer, TranscriptionPaneContainer, ControlBar, KeyValuePair } from './styled';

const instanceToSeconds = (instanceTime) => {
    const time = instanceTime.split('.')[0];
    const a = time.split(':');
    return (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
};

const getAverage = (numbers) => {
    let sum = 0;
    for (let i = 0; i < numbers.length; i++) {
        sum += parseInt(numbers[i], 10); //don't forget to add the base
    }

    return sum / numbers.length;
}

const ResultPage = () => {
    const playerRef = useRef(null);
    const { videoId } = useParams();
    const [selectedLanguage, setSelectedLanguage] = useState('en-US');
    const [resultData, isLoading] = useFetch(`https://knn-functions.azurewebsites.net/api/getCatalogueId?catalogueid=${videoId}`);

    const [searchTerm, setSearchTerm] = useState('');
    const [currentTokenIndex, setCurrentTokenIndex] = useState(0);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [textSearchResults, setTextSearchResults] = useState([]);
    const [entitySearchResults, setEntitySearchResults] = useState([]);


    if (isLoading || !resultData[0]) {
        return <p>Loading</p>;
    }

    const confidences = resultData[0].transcription[0].transcription.map(({ confidence }) => confidence);
    const quality = confidences.reduce((a, b) => a + b, 0) / confidences.length;
    const qualityString = quality > 0.9 ? 'high' : (quality > 0.7 ? 'medium' : 'low')

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
        const currentToken = resultData[0].transcription
            .find(({ languageCode }) => languageCode === selectedLanguage).transcription
            .find((token) => {
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
            setTextSearchResults([]);
            setEntitySearchResults([]);
        }

        if (value && value.length > 2) {
            setShowSearchResults(true);

            const textSearchResults = resultData[0].transcription
                .find(({ languageCode }) => languageCode === selectedLanguage).transcription
                .filter(({ text }) => {
                    if (text && searchTerm && text.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return true;
                    }
                })
                .map((result) => ({ ...result, searchTerm }));

            const entitySearchResults = resultData[0].labels.filter(({ name }) => {
                if (name && searchTerm && name.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return true;
                }
            }).map((result) => ({ ...result, searchTerm }));

            setTextSearchResults(textSearchResults);
            setEntitySearchResults(entitySearchResults);
        }

        setSearchTerm(event.target.value)
    };

    const durationInMinutes = Math.floor(resultData[0].durationInSeconds / 60);
    const url = resultData[0].videoPlayerUrl.substring(1, resultData[0].videoPlayerUrl.length - 1);

    return (
        <Fragment>
            <PageContainer>
                {!isLoading && (
                    <Fragment>
                        <Heading>{resultData[0].name}</Heading>
                        <KeyValuePair>Around {durationInMinutes} minutes long</KeyValuePair>
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
                                    url={url}
                                    onProgress={handleOnProgress}
                                    progressInterval={50}
                                />
                                <VideoQualityIndicator
                                    status={qualityString}
                                />
                            </VideoContainer>
                            <TranscriptionPaneContainer>
                                <ControlBar>
                                    <Select value={selectedLanguage} onChange={(event) => setSelectedLanguage(event.target.value)}>
                                        <option value="en-US">English</option>
                                        <option value="fr-FR">French</option>
                                        <option value="de-DE">German</option>
                                        <option value="it-IT">Italian</option>
                                    </Select>
                                </ControlBar>
                                <TranscriptionPane
                                    currentTokenIndex={currentTokenIndex}
                                    onTokenClick={handleTokenClick}
                                    transcription={resultData[0].transcription.find(({ languageCode }) => languageCode === selectedLanguage).transcription}
                                />
                            </TranscriptionPaneContainer>
                        </FlexContainer>
                    </Fragment>
                )}
            </PageContainer>
        </Fragment>
    );
};

export default ResultPage;