import React, {useState} from 'react';
import MainLayout from "../../layouts/MainLayout";
import {ITrack} from "../../types/track";
import {Button, Grid, TextField} from "@mui/material";
import {useRouter} from "next/router";
import {GetServerSideProps} from "next";
import axios from "axios";
import {useInput} from "../../hooks/useInput";
import {comment} from "postcss";

const TrackPage = ({serverTrack}) => {
    const [track, setTrack] = useState<ITrack>(serverTrack)
    const router = useRouter();
    const username = useInput('')
    const text = useInput('')

    const addComment = async () => {
      try{
        const response = await axios.post("http://localhost:5000/tracks/comment", {
          username: username.value,
          text: text.value,
          trackId: track._id
        })
        setTrack({...track, comments: [...track.comments, response.data]})
      } catch(e) {
          console.log(e)
      }

    }
    return (
        <MainLayout>
            <Button
                variant={'outlined'}
                style={{fontSize: 20}}
                onClick = {() => router.push("/tracks")}
            >
                К списку
            </Button>
            <Grid container style={{margin: '20px 0'}}>
                <img src={'http://localhost:5000/' + track.picture} alt={track.name} width={200} height={200}/>
                <div style={{marginLeft: '20px', marginTop: "38px"}}>
                    <h2>Название - {track.name}</h2>
                    <h2>Исполнитель - {track.artist}</h2>
                    <h2>Количество прослушиваний - {track.listens}</h2>
                </div>
            </Grid>
            <h1>Текст трека</h1>
            <p>{track.text}</p>
            <Grid container>
                <h1>Комментарии</h1>
                <TextField
                    label={"Ваше имя"}
                    fullWidth
                    {...username}
                />
                <TextField
                    label={"Комментарий"}
                    fullWidth
                    multiline
                    rows={4}
                    style={{marginTop: "20px", marginBottom: "20px"}}
                    {...text}
                />
                <Button onClick={addComment} variant={'outlined'}>Отправить</Button>
            </Grid>
            <div>
                {track.comments?.map(comment =>
                    <div style={{marginTop: "30px"}}>
                        <div>Автор - {comment.username}</div>
                        <div>Комментарий - {comment.text}</div>
                    </div>
                )}
            </div>
        </MainLayout>
    );
};

export default TrackPage;

export const getServerSideProps: GetServerSideProps = async ({params}) => {
  const response = await axios.get("http://localhost:5000/tracks/" + params.id)
  return {
    props: {
      serverTrack: response.data
    }
  }
}