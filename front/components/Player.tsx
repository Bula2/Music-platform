import React, {useEffect, useState} from 'react';
import {PauseCircle, PlayArrow, VolumeUp} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import style from "./../styles/Player.module.sass"
import {ITrack} from "../types/track";
import {Grid} from "@mui/material";
import TrackProgress from "./TrackProgress";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useActions} from "../hooks/useActions";
import {playerReducer} from "../store/reducers/playerReducer";

let audio;

const Player = () => {
    const{pause, volume, duration, active, currentTime} = useTypedSelector(state => state.player)
    const{pauseTrack, playTrack, setVolume, setCurrentTime, setDuration} = useActions()

    useEffect(() => {
        if (!audio) {
            audio = new Audio()
        } else {
            setAudio()
            play()
        }
    }, [active])

    const play = () => {
        if (pause){
            playTrack()
            audio.play()
        } else {
            pauseTrack()
            audio.pause()
        }
    }
    const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        audio.volume = Number(e.target.value) / 100
        setVolume(Number(e.target.value))
    }
    const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        audio.currentTime = Number(e.target.value)
        setCurrentTime(Number(e.target.value))
    }

    const setAudio = () => {
        if (active) {
            audio.src = "http://localhost:5000/" + active.audio
            audio.volume = volume / 100
            audio.onloadedmetadata = () => {
                setDuration(Math.ceil(audio.duration))
            }
            audio.ontimeupdate = () => {
                setCurrentTime(Math.ceil(audio.currentTime))
            }
        }
    }

    if (!active){
        return null
    }

    return (
        <div className={style.player}>
            <IconButton onClick={play}>
                {
                    !pause ?
                        <PauseCircle/>
                        :
                        <PlayArrow/>
                }
            </IconButton>
            <Grid container direction={"column"} style={{width: 200, margin: '0 20px'}} >
                <div style={{fontSize: 20}}>{active?.name}</div>
                <div style={{fontSize: 16, color: "gray"}}>{active?.artist}</div>
            </Grid>
            <TrackProgress left={currentTime} right={duration} onChange={changeCurrentTime}/>
            <VolumeUp style={{marginLeft: 'auto'}}/>
            <TrackProgress left={volume} right={100} onChange={changeVolume}/>
        </div>
    )
}

export default Player;