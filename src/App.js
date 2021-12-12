import React, {useEffect, useState} from 'react';
import {Form} from "./components/Form";
import {API_BASE} from "./helpers/env";
import axios from "axios";
import {SongLyric} from "./components/SongLyric";
import {ArtitstInfo} from "./components/ArtitstInfo";
import {Spinner} from "./components/spinner/Spinner";
import RemoveAccents from "./helpers/RemoveAccents";


export const App = () => {
    const [query, setQuery] = useState({});
    const [lyric, setLyric] = useState('');
    const [info, setInfo] = useState({});
    const [titleSong, setTitleSong] = useState('');
    const [errorSong, setErrorSong] = useState(false);
    const [errorInfo, setErrorInfo] = useState(false);

    const [loadingSong, setLoadingSong] = useState(false);
    const [loadingInfo, setLoadingInfo] = useState(false);

    useEffect(() => {
        if (errorSong) {
            setErrorSong(false);
        }

        if (Object.keys(query).length === 0) return
        const queryApi = async () => {
            setLoadingInfo(true);
            setLoadingSong(true);
            const {artist, song} = query;
            const url = `${API_BASE}/api/lyric/artist/${encodeURIComponent(RemoveAccents(artist)).replace('%20', '+')}/title/${encodeURIComponent(song).replace('%20', '+')}`;
            const response = await axios.get(url);
            const {full_title, lyrics} = response.data;

            setLoadingSong(false);
            if (!lyrics) {
                setErrorSong(true);
            }
            setLyric(lyrics);
            setTitleSong(full_title);

            ////////////////////////////////////
            /*const authorization = await axios(LYRIC_API_BASE, {
                'method': 'POST',
                'headers': {
                    'Content-Type':'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + (new Buffer(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')),
                },
                data: 'grant_type=client_credentials'
            });

            const access_token = authorization.data.access_token;

            const request = await axios(`https://api.spotify.com/v1/search?q=${artist}&type=artist`,{
                'method': 'GET',
                'headers': {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + authorization.data.access_token
                }
            });*/
            ////////////////////////////////////

            const result = await axios.get(`https://www.theaudiodb.com/api/v1/json/1/search.php?s=${RemoveAccents(artist)}`);
            console.log()
            setLoadingInfo(false);
            //console.log(result.data.artists)
            if (result.data.artists !== null) {
                setInfo(result.data.artists[0]);
                setErrorInfo(false);
            }else if (result.data.artists === null){
                setErrorInfo(true);
            }

        }
        queryApi();
        if (lyric) {
            setLyric('');
        }
        if (info) {
            setInfo({});
        }

    }, [query]);

    const artitstInfo = (loadingInfo) ? <Spinner /> : <ArtitstInfo info={info} errorInfo={errorInfo} />
    const songLyric = (loadingSong) ? <Spinner /> : <SongLyric lyric={lyric} titleSong={titleSong} errorSong={errorSong} />

    return (
        <>
            <Form
                setQuery={setQuery}
            />
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6">
                        {artitstInfo}

                    </div>
                    <div className="col-md-6">
                        {songLyric}
                    </div>
                </div>
            </div>
        </>
    );
};