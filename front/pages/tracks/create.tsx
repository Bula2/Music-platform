import React, {useState} from 'react';
import MainLayout from "../../layouts/MainLayout";
import {Button, Card, Grid, TextField} from "@mui/material";
import StepWrapper from "../../components/StepWrapper";
import FileUpload from "../../components/FileUpload";
import {useInput} from "../../hooks/useInput";
import axios from "axios";
import {router} from "next/client";
import {useRouter} from "next/router";



const Create = () => {

    const [activeStep, setActiveStep] = useState(0)
    const [picture, setPicture] = useState(null)
    const [audio, setAudio] = useState(null)
    const name = useInput('')
    const artist = useInput('')
    const text = useInput('')
    const router = useRouter()
    const next = () => {
        if (activeStep === 2){
          const formData = new FormData()
          formData.append('name', name.value)
          formData.append('artist', artist.value)
          formData.append('text', text.value)
          formData.append('picture', picture)
          formData.append('audio', audio)
          axios.post('http://localhost:5000/tracks', formData)
            .then(response => router.push('/tracks'))
            .catch(e => console.log(e))
        }else{
          setActiveStep(prevState => prevState + 1)
        }
    }

    const back = () => {
        setActiveStep(prevState => prevState - 1)
    }

    return (
        <MainLayout>
            <StepWrapper activeStep={activeStep}>
                <>
                {activeStep === 0 &&
                    <Grid container direction={"column"} style={{padding: 20}}>
                        <TextField {...name} style={{marginTop: 10}} label={"Название трека"}/>
                        <TextField {...artist} style={{marginTop: 10}} label={"Имя автора"}/>
                        <TextField {...text} style={{marginTop: 10}} label={"Текст трека"} multiline rows={3}/>
                    </Grid>
                }
                {activeStep === 1 &&
                    <FileUpload setFile={setPicture} accept={"image/*"}>
                        <Button>Загрузить изображение</Button>
                    </FileUpload>
                }
                {activeStep === 2 &&
                    <FileUpload setFile={setAudio} accept={"audio/*"}>
                        <Button>Загрузить аудио</Button>
                    </FileUpload>
                }
                </>
            </StepWrapper>
            <Grid container justifyContent={"space-between"}>
                <Button variant={"outlined"} disabled={activeStep == 0} onClick={back}>Назад</Button>
                <Button variant={"outlined"} disabled={activeStep == 3} onClick={next}>Далее</Button>
            </Grid>
        </MainLayout>
    );
};

export default Create;