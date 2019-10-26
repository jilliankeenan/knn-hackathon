import React from 'react';
import { Wrapper, Heading } from './styled'

const VideoQualityIndicator = ({ status }) => {

    return (
        <Wrapper status={status}>
            <Heading status={status}>Video quality is {status}</Heading>
            While processing this video, our analysis indicates that the audio and visual quality of this video is {status}. Higher quality source videos will produce better results.
        </Wrapper>
    );
}

export default VideoQualityIndicator;