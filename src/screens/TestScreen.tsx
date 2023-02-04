import {
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
import {useCreateTestItem, useFetchTestItems} from '@query/test';
import supabase from '@spbase/index';

const TestScreen = ({route}: any) => {
  const [formVisible, setFormVisible] = useState(false);
  const hideForm = () => {
    setFormVisible(false);
  };
  const {id, creator} = route?.params.UserTest;
  let {data: testItems, isSuccess} = useFetchTestItems({test_id: id});

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.container, {padding: 16, paddingTop: 40}]}>
        <ScrollView>
          {isSuccess &&
            testItems?.data?.map(testItem => (
              <View key={testItem.id} style={styles.testContainer}>
                <View>
                  <Text style={styles.testItem}>
                    <Text style={{color: '#222'}}>Question:</Text>{' '}
                    {testItem.prompt_text}
                  </Text>
                  <Text style={styles.testItem}>
                    <Text style={{color: '#222'}}>Choices: </Text>
                    {testItem.choices.join(', ')}
                  </Text>
                </View>
              </View>
            ))}
        </ScrollView>
        <Pressable
          style={styles.button}
          onPress={() => {
            setFormVisible(true);
          }}>
          <Text style={styles.buttonText}>A Question to this Test</Text>
        </Pressable>
      </View>
      {formVisible && (
        <CreateTestItemForm hide={hideForm} test_id={id} creator={creator} />
      )}
    </SafeAreaView>
  );
};

const CreateTestItemForm = (props: any) => {
  const [numberOfChoices, setNumberOfChoices] = useState<string[]>([
    'test_choice_1',
    'test_choice_2',
  ]);

  const {mutate: createATestItem, error: createTestData} = useCreateTestItem();

  const {handleSubmit, control} = useForm();
  const addChoice = () => {
    if (numberOfChoices.length < 6) {
      setNumberOfChoices(current => {
        const choiceNumber = current.length + 2;
        return current.concat(['test_choice_' + choiceNumber]);
      });
    }
  };
  const onSubmit = async (data: any) => {
    const choices = Object.entries(data)
      .filter(entry => entry[0] !== 'prompt_text')
      .map(entry => entry[1]);

    createATestItem({
      choices,
      creator: props.creator,
      test_id: props.test_id,
      prompt_text: data.prompt_text,
    });
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.label}>Test Prompt (Required)</Text>
      <Input name="prompt_text" control={control} style={styles.input} />
      <Text style={styles.label}>Test Choices</Text>
      {numberOfChoices.map((choice: string, index: number) => (
        <Input
          name={choice}
          control={control}
          style={styles.input}
          props={{key: index}}
        />
      ))}
      <Pressable
        onPress={handleSubmit(onSubmit)}
        style={styles.button}
        android_ripple={{color: '#fff4'}}>
        <Text style={styles.buttonText}>Add Question to Test</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          addChoice();
        }}
        style={styles.button}
        android_ripple={{color: '#fff4'}}>
        <Text style={styles.buttonText}>Add Choice</Text>
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

export default TestScreen;
