import React from 'react';
import Quiz from 'containers/Quiz';

const QuizScreen = () => {
  return <Quiz />;
};

export default QuizScreen;

import {View, Text, TextInput, Pressable} from 'react-native';
import {useController, useForm} from 'react-hook-form';

const Input = ({name, control, label}: any) => {
  const {field} = useController({
    control,
    defaultValue: '',
    name,
  });

  return (
    <View>
      <Text>{label}</Text>
      <TextInput value={field.value} onChangeText={field.onChange} />
    </View>
  );
};
const AddItemForm = (props: any) => {
  const {control, handleSubmit} = useForm();
  const [numberofChoices, setnumberofChoices] = React.useState<Number>(2);
  const choices = new Array(numberofChoices);
  choices.map((choice: any) => ({
    name: 'choice ' + 1,
    label: 'choice ' + 1,
  }));
  return (
    <View>
      <Input name="Qustion" label="Question" />
      {choices.map((item: any) => (
        <Input name={item.name} label={item.label} control={control} />
      ))}
      <Pressable onPress={() => setnumberofChoices((item): number => item + 1)}>
        Add choice
      </Pressable>
    </View>
  );
};
export {AddItemForm};
