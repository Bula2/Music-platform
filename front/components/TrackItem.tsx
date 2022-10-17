import React from 'react';
import {ITrack} from "../types/track";
import {Card, Grid} from "@mui/material";
import styles from "../styles/TrackItem.module.sass"
import IconButton from "@mui/material/IconButton";
import {PauseCircle, PlayArrow, Delete} from "@mui/icons-material";
import {useRouter} from "next/router";
import {useActions} from "../hooks/useActions";
import axios from "axios";

interface TrackItemProps {
    track: ITrack,
    active?: boolean,
    id: string
}

const TrackItem: React.FC<TrackItemProps> = ({track, active=false, id}) => {
    const router = useRouter()
    const{playTrack, pauseTrack, setActiveTrack} = useActions()
    const deleteTrack = async (e) => {
      e.stopPropagation();
      await axios.delete("http://localhost:5000/tracks/" + id);
      await router.push("/tracks");
    }
    const play = (e) =>{
        e.stopPropagation()
        setActiveTrack(track)
        playTrack()
    }
    return (
        <Card className={styles.track} style={{background: "#c8faf5"}} onClick={() => router.push("/tracks/" + track._id)}>
            <IconButton onClick={play}>
                {
                    active ?
                        <PauseCircle/>
                        :
                        <PlayArrow/>
                }
            </IconButton>
            <img width={70} height={70} src={"http://localhost:5000/" + track.picture} alt={track.name}/>
            <Grid container direction={"column"} style={{width: 200, margin: '0 20px'}} >
                <div>{track.name}</div>
                <div style={{fontSize: 12, color: "gray"}}>{track.artist}</div>
            </Grid>
            {active && <div>02:42/03:22</div>}
            <IconButton onClick={(e) => deleteTrack(e)} style={{marginLeft: 'auto'}}>
                <Delete/>
            </IconButton>
        </Card>
    );
};

export default TrackItem;