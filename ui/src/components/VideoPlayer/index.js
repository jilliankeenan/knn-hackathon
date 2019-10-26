import React from 'react';
import { Video } from './styled';

const VideoPlayer = () => {

    return (
        <Video width="400" controls>
            <source src="mov_bbb.mp4" type="video/mp4" />
            <source src="mov_bbb.ogg" type="video/ogg" />
            Your browser does not support HTML5 video.
        </Video>
    );
};

export default VideoPlayer;