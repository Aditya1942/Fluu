import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {Sizes} from '../../const';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import axios from '../../Axios';
import Voice from '../Voice';

const SetupProfile = ({navigation}) => {
  const [ProfilePic, setProfilePic] = useState('');
  const ImageUpload = img => {
    setProfilePic(img.uri);
    const fd = new FormData();
    fd.append('file', {
      uri: img.uri,
      name: img.fileName,
      type: img.type,
    });
    axios
      .post('/image.php', fd, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const updateProfilePicture = () => {
    let options = {
      // rest of the properties remain same
      mediaType: 'photo', // other values 'video', 'mixed'
    };
    launchCamera(options, response => {
      console.log(response.uri);
      // ImageUpload(response); // upload image
    });
  };
  const PrifilePic = () => {
    return (
      <View style={{margin: 40, marginHorizontal: 70}}>
        <View>
          <Text>Step 1 Add your Profile Picture</Text>
          <View
            style={{
              borderWidth: 1,
              height: 150,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={updateProfilePicture}>
              <Text
                style={{
                  fontSize: 20,
                  borderRadius: Sizes.width / 2,
                  borderWidth: 1,
                  width: 30,
                  textAlign: 'center',
                }}>
                +
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View>
      <Text style={{margin: 30, fontSize: 20}}>Setup Your Profile</Text>
      <PrifilePic />
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Voice2');
          }}>
          <Text>Voice</Text>
        </TouchableOpacity>
        <Voice />
      </View>
    </View>
  );
};

export default SetupProfile;
