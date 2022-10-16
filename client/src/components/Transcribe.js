import MicRecorder from "mic-recorder-to-mp3"
import React, { useReducer, useEffect, useState, useRef } from "react"
import axios from "axios"
import Quote from './quote';
import Quote2 from './quote2';

import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { Mic, Cancel } from '@mui/icons-material';
import SendIcon from '@mui/icons-material/Send';

  // Set AssemblyAI Axios Header
  const assembly = axios.create({
    baseURL: "https://api.assemblyai.com/v2",
    headers: {
      authorization: "e6ac1c103d534c75be756929fe1be101",
      "content-type": "application/json",
      "transfer-encoding": "chunked",
    },
  })

const Transcribe = () => {
  // Mic-Recorder-To-MP3
  const recorder = useRef(null) //Recorder
  const audioPlayer = useRef(null) //Ref for the HTML Audio Tag
  const [blobURL, setBlobUrl] = useState(null)
  const [audioFile, setAudioFile] = useState(null)
  const [isRecording, setIsRecording] = useState(null)

  useEffect(() => {
    //Declares the recorder object and stores it inside of ref
    recorder.current = new MicRecorder({ bitRate: 128 })
  }, [])

  const startRecording = () => {
    // Check if recording isn't blocked by browser
    recorder.current.start().then(() => {
      setIsRecording(true)
    })
  }

  const stopRecording = () => {
    recorder.current
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const file = new File(buffer, "audio.mp3", {
          type: blob.type,
          lastModified: Date.now(),
        })
        const newBlobUrl = URL.createObjectURL(blob)
        setBlobUrl(newBlobUrl)
        setIsRecording(false)
        setAudioFile(file)
      })
      .catch((e) => console.log(e))
  }

  // AssemblyAI API

  // State variables
  const [uploadURL, setUploadURL] = useState("")
  const [transcriptID, setTranscriptID] = useState("")
  const [transcriptData, setTranscriptData] = useState("")
  const [transcript, setTranscript] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Upload the Audio File and retrieve the Upload URL
  useEffect(() => {
    if (audioFile) {
      assembly
        .post("/upload", audioFile)
        .then((res) => setUploadURL(res.data.upload_url))
        .catch((err) => console.error(err))
    }
  }, [audioFile])

  // Submit the Upload URL to AssemblyAI and retrieve the Transcript ID
  const submitTranscriptionHandler = () => {
    assembly
      .post("/transcript", {
        audio_url: uploadURL,
        language_code: "fr"
      })
      .then((res) => {
        setTranscriptID(res.data.id)

        checkStatusHandler()
      })
      .catch((err) => console.error(err))
  }

  // Check the status of the Transcript
  const checkStatusHandler = async () => {
    setIsLoading(true)
    try {
      await assembly.get(`/transcript/${transcriptID}`).then((res) => {
        setTranscriptData(res.data)
      })
    } catch (err) {
      console.error(err)
    }
  }

  // Periodically check the status of the Transcript
  useEffect(() => {
    const interval = setInterval(() => {
      if (transcriptData.status !== "completed" && isLoading) {
        checkStatusHandler()
      } else {
        setIsLoading(false)
        setTranscript(transcriptData.text)
      }
    }, 1000)
    return () => clearInterval(interval)
  },)

  // Accuracy Test
  const [pass, setPass] = useState(false)

  //Accuracy Test
  useEffect(() => {
    if (!isLoading && Math.round(100*transcriptData.confidence) > 80) {
      setPass(true)
    }
  }, [isLoading, transcriptData.confidence])

  if (pass){
    return (
      <Stack spacing={4}>
        <Quote2 passed={pass}/>
          <audio ref={audioPlayer} src={blobURL} controls='controls' />
        <Stack spacing={2}>
          <Button variant="outlined" disabled={isRecording} onClick={startRecording} endIcon={<Mic />}>
            START RECORDING
          </Button>
          <Button variant="outlined" disabled={!isRecording} onClick={stopRecording} endIcon={<Cancel />}>
            STOP RECORDING
          </Button>
          <Button variant="contained" onClick={submitTranscriptionHandler} endIcon={<SendIcon />}>
            SUBMIT
          </Button>
        </Stack>
        {transcriptData.status === "completed" ? (
          <Stack spacing={1} divider={<Divider orientation="horizontal" />} paddingBottom={1}>
            <Typography variant="h6"><b>Accuracy:</b> {Math.round(100*transcriptData.confidence)}%</Typography>
            <Stack spacing={1}>
              <Typography variant="h6"><b>What you said:</b></Typography>
              <Typography variant="subtitle1">{transcript}</Typography>
            </Stack>
            <Typography variant="subtitle1">You managed to pass smartass. good job</Typography>
          </Stack>
        ) : (
          <Typography variant="h6">{transcriptData.status}</Typography>
        )}
      </Stack>
    )
  } else {
    return (
      <Stack spacing={4}>
        <Quote passed={!pass}/>
        <audio ref={audioPlayer} src={blobURL} controls='controls' />
        <Stack spacing={2}>
          <Button variant="outlined" disabled={isRecording} onClick={startRecording} endIcon={<Mic />}>
            START RECORDING
          </Button>
          <Button variant="outlined" disabled={!isRecording} onClick={stopRecording} endIcon={<Cancel />}>
            STOP RECORDING
          </Button>
          <Button variant="contained" onClick={submitTranscriptionHandler} endIcon={<SendIcon />}>
            SUBMIT
          </Button>
        </Stack>
        {transcriptData.status === "completed" ? (
          <Stack spacing={1} divider={<Divider orientation="horizontal" />} paddingBottom={1}>
            <Typography variant="h6"><b>Accuracy:</b> {Math.round(100*transcriptData.confidence)}%</Typography>
            <Stack spacing={1}>
              <Typography variant="h6"><b>What you said:</b></Typography>
              <Typography variant="subtitle1">{transcript}</Typography>
            </Stack>
            <Typography variant="subtitle1">You managed to fail dumbass. good job</Typography>
          </Stack>
        ) : (
          <Typography variant="h6">{transcriptData.status}</Typography>
        )}
      </Stack>
    )
  }
}

export default Transcribe