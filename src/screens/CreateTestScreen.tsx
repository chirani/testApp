import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useForm} from 'react-hook-form';
import Input from '@components/Input';
import {useCreateTest, useFetchUserTests} from '@query/test';
import useAuthStore from '@zustand/store';

const CreateTestScreen = ({navigation}) => {
  const authStore = useAuthStore();
  const [formVisible, setFormVisible] = useState(false);
  const hideForm = () => {
    setFormVisible(false);
  };
  const user_id = authStore?.session.user.id;
  const {data: UserTests} = useFetchUserTests({
    user_id,
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.container, {padding: 16, paddingTop: 40}]}>
        <ScrollView contentContainerStyle={{padding: 16, paddingVertical: 0}}>
          {UserTests?.data?.map(UserTest => (
            <Pressable
              key={UserTest.id}
              onPress={() => {
                navigation.navigate('TestScreen', {UserTest});
              }}>
              <View style={styles.testContainer}>
                <View>
                  <Text style={styles.testItem}>
                    Test Name: {UserTest.test_name}
                  </Text>
                  <Text style={styles.testItem}>
                    Test Key: {UserTest.test_key}
                  </Text>
                </View>
                <View style={styles.deleteButton}></View>
              </View>
            </Pressable>
          ))}
        </ScrollView>
        <Pressable
          style={styles.button}
          onPress={() => {
            setFormVisible(true);
          }}>
          <Text style={styles.buttonText}>Create A test</Text>
        </Pressable>
      </View>
      {formVisible && <CreateTestForm hide={hideForm} />}
    </SafeAreaView>
  );
};

const CreateTestForm = (props: any) => {
  const authStore = useAuthStore();
  const user_id = authStore?.session.user.id;

  const {handleSubmit, control} = useForm();
  const {mutate: createATest} = useCreateTest();

  const onSubmit = async (data: any) => {
    createATest({...data, creator: user_id});
    props.hide();
  };
  return (
    <View style={styles.formContainer}>
      <Text style={styles.label}>Test name (Required)</Text>
      <Input name="test_name" control={control} style={styles.input} />
      <Text style={styles.label}>Test code (Required)</Text>
      <Input name="test_key" control={control} style={styles.input} />
      <Pressable
        onPress={handleSubmit(onSubmit)}
        style={styles.button}
        android_ripple={{color: '#fff4'}}>
        <Text style={styles.buttonText}>Create</Text>
      </Pressable>
      <TouchableOpacity
        onPress={() => {
          props.hide();
        }}>
        <Text>Close</Text>
      </TouchableOpacity>
    </View>
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
    backgroundColor: Platform.OS !== 'android' ? 'white' : '#f7f7f7',
  },
  testItem: {
    fontSize: 20,
    color: '#222',
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

export default CreateTestScreen;
