import {View, Text, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import Input from '@components/Input';
import {useForm} from 'react-hook-form';
import {useSignin} from '@query/auth';

const SignInScreen = ({navigation}: any) => {
  const {handleSubmit, control} = useForm();
  const {mutate: signIn, isLoading} = useSignin();
  const onSubmit = async (data: any) => {
    const {email, password} = data;
    signIn({email, password});
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email (Required)</Text>
      <Input name="email" control={control} style={styles.input} />

      <Text style={styles.label}>Password (Required)</Text>
      <Input
        name="password"
        control={control}
        style={styles.input}
        props={{secureTextEntry: true}}
      />
      <Pressable
        onPress={handleSubmit(onSubmit)}
        style={styles.button}
        android_ripple={{color: '#fff4'}}>
        <Text style={styles.buttonText}>SIGN IN</Text>
      </Pressable>
      <Pressable
        style={{alignSelf: 'flex-end'}}
        onPress={() => {
          console.log('Whoop');
          navigation.navigate('SignUpScreen');
        }}>
        <Text style={styles.accessory}>
          You already have an account?
          <Text style={{color: 'teal'}}> Sign in here</Text>
        </Text>
      </Pressable>
      {isLoading && (
        <View style={styles.notification}>
          <Text style={styles.notificationText}>Request is sent</Text>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 40,
    flex: 1,
  },
  label: {
    marginTop: 16,
    marginBottom: 8,
    fontSize: 16,
    color: '#333',
  },
  input: {
    borderColor: '#99b3',
    borderWidth: 2,
    color: '#202030',
    padding: 16,
    paddingVertical: 8,
    fontSize: 20,
  },
  button: {
    marginTop: 16,
    backgroundColor: 'teal',
    padding: 16,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: '#eee',
  },
  accessory: {
    paddingVertical: 8,
    color: '#000',
    fontSize: 18,
  },
  notification: {
    position: 'absolute',
    height: 100,
    width: 250,
    marginTop: 150,
    marginLeft: 100,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    color: '#000',
    fontSize: 20,
  },
});
export default SignInScreen;
