import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import React from 'react';
import {useSignOut} from '@query/auth';

const StartTestScreen = () => {
  const {mutate: signOut} = useSignOut();
  const onSignOut = () => {
    console.log('signOut Clicked');
    signOut();
  };
  return (
    <View style={styles.container}>
      <TouchableHighlight
        onPress={() => {
          onSignOut();
        }}>
        <Text>Hello World</Text>
      </TouchableHighlight>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 32,
  },
  prompt: {
    fontSize: 18,
    color: '#222',
  },
  startButton: {
    backgroundColor: 'teal',
    padding: 16,
    paddingHorizontal: 32,
  },
  buttonText: {
    color: 'white',
    fontSize: 22,
    alignSelf: 'stretch',
  },
});
export default StartTestScreen;
