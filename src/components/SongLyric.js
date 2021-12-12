import React from 'react';
import styled from "@emotion/styled";

const PLyric = styled.p`
  white-space: pre-wrap;
`;

export const SongLyric = ({lyric, titleSong, errorSong}) => {

    return (
        <>
            {
                errorSong ? 'No found.' : null
            }
            {
                lyric ? <h2 className={"animate__animated animate__fadeIn"}>{titleSong}</h2> : null
            }

            <PLyric className={"animate__animated animate__fadeIn"}>
                {lyric}
            </PLyric>
        </>
    );
};