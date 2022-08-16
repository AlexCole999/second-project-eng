import React, { useState, useRef, useEffect } from 'react'
import './Instruction.scss'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

type Props = {}

export default function Instruction({ }: Props) {

  const {
    transcript,
    resetTranscript,
    listening,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const startListening = () => SpeechRecognition.startListening({ continuous: true });

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const input = useRef()

  useEffect(
    () => {
      let searchedValue = transcript.match(/[а-яА-Яa-zA-Z]+$/i) ? transcript.match(/[а-яА-Яa-zA-Z]+$/i)[0] : ''
      input.current.value = searchedValue;
      console.log(searchedValue)
    },
    [transcript]
  )

  return (
    <div className='Instruction'>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button
        onTouchStart={startListening}
        onMouseDown={startListening}
        onTouchEnd={SpeechRecognition.stopListening}
        onMouseUp={SpeechRecognition.stopListening}
      >Hold to talk</button>
      <button
        onClick={() => { console.log(SpeechRecognition.getRecognition()) }}
      >1</button>
      <p>{transcript}</p>
      <input type="text" ref={input} />
    </div>
  );
};