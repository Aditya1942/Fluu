import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import React, {useState} from 'react';
import {View, Text, Button} from 'react-native';

const Voice = () => {
  const audioRecorderPlayer = new AudioRecorderPlayer();
  const [recordSecs, setRecordSecs] = useState('');
  const [recordTime, setRecordTime] = useState('');
  const [currentPositionSec, setCurrentPositionSec] = useState('');
  const [currentDurationSec, setCurrentDurationSec] = useState('');
  const [playTime, setPlayTime] = useState('');
  const [duration, setDuration] = useState('');

  const onStartRecord = async () => {
    var result = await audioRecorderPlayer.startRecorder();
    audioRecorderPlayer.addRecordBackListener(e => {
      setRecordSecs(e.currentPosition);
      setRecordTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
      return;
    });
    console.log(result);
  };

  const onPauseRecorder = async () => {
    var result = await audioRecorderPlayer.pauseRecorder();

    audioRecorderPlayer.removeRecordBackListener();
    // setRecordSecs(0);

    console.log(result);
    return;
  };
  const onStopRecord = async () => {
    var result = await audioRecorderPlayer.stopRecorder();

    audioRecorderPlayer.removeRecordBackListener();
    // setRecordSecs(0);

    console.log(result);
    return;
  };
  const onResumeRecorder = async () => {
    var result = await audioRecorderPlayer.resumeRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    // setRecordSecs(0);

    console.log(result);
  };

  const onStartPlay = async () => {
    console.log('onStartPlay');
    const msg = await audioRecorderPlayer.startPlayer();
    console.log(msg);
    audioRecorderPlayer.addPlayBackListener(e => {
      setCurrentPositionSec(e.currentPosition);
      setCurrentDurationSec(e.duration);
      setPlayTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
      setDuration(audioRecorderPlayer.mmssss(Math.floor(e.duration)));
      return;
    });
  };

  const onPausePlay = async () => {
    await audioRecorderPlayer.stopPlayer();
  };

  const onStopPlay = async () => {
    console.log('onStopPlay');
    audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
  };
  return (
    <View>
      <Text>Audio</Text>
      <Button title="Start Record" onPress={onStartRecord} />
      <Button title="Pause Record" onPress={onPauseRecorder} />
      <Button title="Resume Record" onPress={onResumeRecorder} />
      <Button title="Stop Record" onPress={onStopRecord} />
      <Text>recordSecs: {recordSecs}</Text>
      <Text>recordTime: {recordTime}</Text>
      <Button title="Start Play " onPress={onStartPlay} />
      <Text>recordSecs: {playTime}</Text>
      <Text>recordTime: {duration}</Text>
      <Button title="Start Pause " onPress={onStopPlay} />
    </View>
  );
};

export default Voice;
