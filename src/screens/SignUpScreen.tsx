import {View, Text, Pressable, Alert, StyleSheet} from 'react-native';
import React from 'react';
import Input from '@components/Input';
import {useForm} from 'react-hook-form';
import {useSignUpWithEmail} from '@query/auth';

const SignUpScreen = ({navigation}: any) => {
  const {handleSubmit, control} = useForm();
  const {mutate: signUp, data: signUpData, isSuccess} = useSignUpWithEmail();
  const onSubmit = async (data: any) => {
    const {email, password} = data;

    signUp({email, password});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email (Required)</Text>
      <Input name="email" control={control} style={styles.input} />
      <Text style={styles.label}>Username (Required)</Text>
      <Input name="username" control={control} style={styles.input} />
      <Text style={styles.label}>Password (Required)</Text>
      <Input
        name="password"
        control={control}
        style={styles.input}
        props={{secureTextEntry: true}}
      />
      <Text style={styles.label}>Last Name </Text>
      <Input name="last_name" control={control} style={styles.input} />
      <Text style={styles.label}>First Name </Text>
      <Input name="first_name" control={control} style={styles.input} />
      <Pressable
        onPress={handleSubmit(onSubmit)}
        style={styles.button}
        android_ripple={{color: '#fff4'}}>
        <Text style={styles.buttonText}>SIGN UP</Text>
      </Pressable>
      <Pressable style={{alignSelf: 'flex-end'}}>
        <Text
          style={styles.accessory}
          onPress={() => {
            navigation.navigate('SignInScreen');
          }}>
          You already have an account?
          <Text style={{color: 'teal'}}> Sign in here</Text>
        </Text>
      </Pressable>
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
});
export default SignUpScreen;
