import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  useFetchTestItemsByKey,
  useGetCurrentAnswer,
  usePostTestAnswer,
} from '@query/test';
import {queryClient} from '../../App';

const TestQuestion = ({route}: any) => {
  const {test_key} = route.params;
  const {mutate: fetchTestItems, data: testItems} = useFetchTestItemsByKey();

  React.useEffect(() => {
    fetchTestItems({test_key});
  }, [test_key, fetchTestItems]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollBox}>
        {testItems?.data?.map(item => (
          <Question
            key={item.id}
            question={item.prompt_text}
            options={item.choices}
            id={item.id}
            test_id={item.test_id}
          />
        ))}
        <View style={{height: 80}} />
      </ScrollView>
    </SafeAreaView>
  );
};

const Question = (props: any) => {
  const {question, options, id, test_id} = props;
  const {data: currentAnswer, isSuccess} = useGetCurrentAnswer(id);
  const {mutate: postAnswer, isSuccess: isPostAnswerSuccess} =
    usePostTestAnswer();
  let currentAnswerIndex = -1;

  const onPress = (option: string) => {
    const answer_index = options.indexOf(option);
    const myAnswer = {
      test_id,
      test_item_id: id,
      answer: option,
      answer_index,
    };

    postAnswer(myAnswer);
  };
  if (isPostAnswerSuccess) {
    queryClient.invalidateQueries('getCurrentAnswer_' + id);
  }
  if (isSuccess) {
    currentAnswerIndex = currentAnswer?.data[0]?.answer_index ?? -1;
  }
  return (
    <View style={styles.questionContainer}>
      <Text style={styles.questionText}>{question}</Text>
      <View style={styles.optionsContainer}>
        {options.map((option: string, index: number) => (
          <Pressable
            key={option + index}
            style={[
              styles.optionContainer,
              currentAnswerIndex === index
                ? styles.optionContainerSelected
                : {},
            ]}
            onPress={() => {
              currentAnswerIndex = index;
              onPress(option);
            }}>
            <Text
              style={[
                styles.optionText,
                currentAnswerIndex === index ? styles.optionTextSelected : {},
              ]}>
              {option}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  scrollBox: {},
  questionContainer: {
    backgroundColor: 'white',
    padding: 16,
    elevation: 2,
    margin: 16,
    marginBottom: 0,
  },
  questionText: {
    fontSize: 16,
    color: 'black',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },

  optionContainer: {
    padding: 8,
    paddingHorizontal: 16,
    backgroundColor: '#f9f9f9',
    borderColor: '#888',
    borderWidth: 2,
    marginEnd: 8,
    marginVertical: 4,
    borderRadius: 8,
  },
  optionContainerSelected: {
    borderColor: 'purple',
    backgroundColor: '#ffddfb',
  },
  optionText: {
    fontSize: 16,
    color: '#888',
  },
  optionTextSelected: {
    color: 'purple',
  },
});

export default TestQuestion;
