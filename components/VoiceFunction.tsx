import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
  PlayBackType,
  RecordBackType,
} from 'react-native-audio-recorder-player';
import {
  Dimensions,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';
import React, {FC, useState, useEffect} from 'react';

// import Button from './Voicebtn';
import RNFetchBlob from 'rn-fetch-blob';

const styles: any = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#455A64',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

interface VoiceProps {
  isLoggingIn: boolean;
  recordSecs: number;
  recordTime: string;
  currentPositionSec: number;
  currentDurationSec: number;
  playTime: string;
  duration: string;
}

const screenWidth = Dimensions.get('screen').width;

const Voice3: FC<VoiceProps> = () => {
  const dirs = RNFetchBlob.fs.dirs;
  const path = Platform.select({
    ios: 'hello.m4a',
    android: `${dirs.CacheDir}/hello.mp3`,
  });

  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [recordSecs, setrecordSecs] = useState(0);
  const [recordTime, setrecordTime] = useState('00:00:00');
  const [currentPositionSec, setcurrentPositionSec] = useState(0);
  const [currentDurationSec, setcurrentDurationSec] = useState(0);
  const [playTime, setPlayTime] = useState('00:00:00');
  const [duration, setDuration] = useState('00:00:00');
  const audioRecorderPlayer = new AudioRecorderPlayer();

  useEffect(() => {
    audioRecorderPlayer.setSubscriptionDuration(0.1); // optional. Default is 0.5
  }, []);

  let playWidth =
    (currentPositionSec / currentDurationSec) * (screenWidth - 56);

  if (!playWidth) {
    playWidth = 0;
  }
  const onStatusPress = (e: any) => {
    const touchX = e.nativeEvent.locationX;
    console.log(`touchX: ${touchX}`);
    const playWidth =
      (currentPositionSec / currentDurationSec) * (screenWidth - 56);
    console.log(`currentPlayWidth: ${playWidth}`);

    const currentPosition = Math.round(currentPositionSec);
    console.log(`currentPosition: ${currentPosition}`);

    if (playWidth && playWidth < touchX) {
      const addSecs = Math.round(currentPosition + 1000);
      audioRecorderPlayer.seekToPlayer(addSecs);
      console.log(`addSecs: ${addSecs}`);
    } else {
      const subSecs = Math.round(currentPosition - 1000);
      audioRecorderPlayer.seekToPlayer(subSecs);
      console.log(`subSecs: ${subSecs}`);
    }
  };

  const onStartRecord = React.useCallback(async () => {
    if (Platform.OS === 'android') {
      try {
        const grants = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);
        console.log('write external stroage', grants);
        if (
          grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.READ_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.RECORD_AUDIO'] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('permissions granted');
        } else {
          console.log('All required permissions not granted');
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }
    const audioSet: AudioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    };
    console.log('audioSet', audioSet);
    const uri = await audioRecorderPlayer.startRecorder(undefined, audioSet);
    audioRecorderPlayer.addRecordBackListener((e: RecordBackType) => {
      console.log('record-back', e);
      setrecordSecs(e.currentPosition);
      setrecordTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
    });
    console.log(`uri: ${uri}`);
  }, []);

  const onStopRecord = React.useCallback(async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setrecordSecs(0);
    console.log(result);
  }, []);
  const onStartPlay = async () => {
    console.log('onStartPlay');
    //? Custom path
    // const msg = await this.audioRecorderPlayer.startPlayer(this.path);

    //? Default path
    const msg = await audioRecorderPlayer.startPlayer();
    const volume = await audioRecorderPlayer.setVolume(1.0);
    console.log(`file: ${msg}`, `volume: ${volume}`);

    audioRecorderPlayer.addPlayBackListener((e: PlayBackType) => {
      if (e.currentPosition === e.duration) {
        console.log('finished');
        audioRecorderPlayer.stopPlayer();
      }
      setcurrentPositionSec(e.currentPosition);
      setcurrentDurationSec(e.duration);
      setPlayTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
      setDuration(audioRecorderPlayer.mmssss(Math.floor(e.duration)));
    });
  };
  const onPausePlay = async () => {
    await audioRecorderPlayer.pausePlayer();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.txtRecordCounter}>{recordTime}</Text>
      <View style={styles.viewRecorder}>
        <View style={styles.recordBtnWrapper}>
          <Button
            title={'Record'}
            style={styles.btn}
            onPress={onStartRecord}
            textStyle={styles.txt}
          />

          <Button
            title={'Stop'}
            style={[styles.btn, {marginLeft: 12}]}
            onPress={onStopRecord}
            textStyle={styles.txt}
          />
        </View>
      </View>
      <View style={styles.viewPlayer}>
        <TouchableOpacity style={styles.viewBarWrapper} onPress={onStatusPress}>
          {/* <View style={styles.viewBar}>
                <View style={[styles.viewBarPlay, {width: playWidth}]} />
              </View> */}
        </TouchableOpacity>
        <Text style={styles.txtCounter}>
          {playTime} / {duration}
        </Text>
        <View style={styles.playBtnWrapper}>
          <Button
            title={'Play'}
            style={styles.btn}
            onPress={onStartPlay}
            textStyle={styles.txt}
          />

          <Button
            title={'Pause'}
            style={[
              styles.btn,
              {
                marginLeft: 12,
              },
            ]}
            onPress={onPausePlay}
            textStyle={styles.txt}
          />
        </View>
      </View>
    </View>
  );
};

export default Voice3;
