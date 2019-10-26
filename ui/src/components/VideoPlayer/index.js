import React, { forwardRef } from 'react';
import { Wrapper } from './styled';
import ReactPlayer from 'react-player'

const VideoPlayer = forwardRef(({ url, ...rest }, ref) => {

    return (
        <ReactPlayer
            ref={ref}
            url={url}
            playing
            controls
            wrapper={Wrapper}
            {...rest}
        />
    );
});

export default VideoPlayer;