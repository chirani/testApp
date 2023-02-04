import {
  Pressable,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import React from 'react';
import {useSignOut} from '@query/auth';

const StartTestScreen = ({navigation}: any) => {
  const {mutate: signOut} = useSignOut();
  const onSignOut = () => {
    signOut();
  };
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.startTestButton}
        onPress={() => navigation.navigate('CreateTestScreen')}>
        <Text style={styles.startTestButtonText}>Create Tests</Text>
      </Pressable>
      <Pressable
        style={styles.startTestButton}
        onPress={() => navigation.navigate('TakeTestScreen')}>
        <Text style={styles.startTestButtonText}>Start Taking A test</Text>
      </Pressable>
      <TouchableHighlight
        style={styles.signoutButton}
        onPress={() => {
          onSignOut();
        }}>
        <Text style={styles.signoutButtonText}>Sign Out</Text>
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
  startTestButton: {
    padding: 24,
    paddingVertical: 12,
    backgroundColor: '#be2ed6',
  },
  startTestButtonText: {
    color: 'white',
    fontSize: 24,
  },
  signoutButton: {
    backgroundColor: 'turquoise',
    padding: 16,
    paddingVertical: 8,
  },
  signoutButtonText: {
    color: '#011',
  },
  label: {
    marginTop: 16,
    marginBottom: 8,
    fontSize: 16,
    color: '#333',
  },
});
export default StartTestScreen;
