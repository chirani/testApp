import {View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Input from '@components/Input';
import {useForm} from 'react-hook-form';

const TakeTestScreen = ({navigation}: any) => {
  const {handleSubmit, control} = useForm();
  const onSubmit = async (data: Record<string, string>) => {
    navigation.navigate('TestQuestions', {test_key: data.test_key});
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.container, {padding: 16, paddingTop: 40}]}>
        <Text>Enter Test Key To Take The Test:</Text>
        <Input control={control} name="test_key" style={styles.input} />
        <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>Start Test</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  input: {
    borderColor: '#99b3',
    borderWidth: 2,
    backgroundColor: 'white',
    color: '#202030',
    padding: 16,
    paddingVertical: 8,
    fontSize: 20,
    marginBottom: 8,
  },
  label: {
    marginTop: 16,
    marginBottom: 8,
    fontSize: 16,
    color: '#333',
  },
  button: {
    marginTop: 16,
    backgroundColor: '#be2ed6',
    padding: 16,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: '#eee',
  },
  closeButton: {
    fontSize: 20,
  },
  deleteButton: {
    height: 40,
    width: 40,
    backgroundColor: '#c33',
    borderRadius: 25,
  },
  testContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 16,
    marginVertical: 8,
    elevation: 3,
    backgroundColor: 'white',
  },
  testItem: {
    fontSize: 16,
    color: '#555',
  },
  formContainer: {
    padding: 16,
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#fffe',
    width: '100%',
    height: '100%',
  },
});
export default TakeTestScreen;
