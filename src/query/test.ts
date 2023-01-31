import {createTestItem} from '@spbase/test';
import {createTest} from '@spbase/test';
import {useMutation} from 'react-query';

interface TestInterface {
  test_key: string;
  creator: string;
}

const useCreateTest = () =>
  useMutation(
    async (test: TestInterface) => createTest(test.test_key, test.creator),
    {
      onSuccess: () => {
        console.log('Create Test Mutation Success');
      },
    },
  );

interface TestItemInterface {
  prompt_text: string;
  choices: string[];
  creator: string;
  test_id: string;
}
const useCreateTestItem = () =>
  useMutation(async (test_item: TestItemInterface) => {
    const {test_id, prompt_text, creator, choices} = test_item;
    return createTestItem(test_id, prompt_text, creator, choices);
  });

export {useCreateTest, useCreateTestItem};
