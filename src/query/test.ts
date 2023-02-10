import {
  createTestItem,
  createTest,
  fetchUserTests,
  fetchTestItems,
  fetchTestItemsByKey,
  postTestAnswer,
  getCurrentAnswer,
  deleteAnswer,
} from '@spbase/test';
import {useMutation, useQuery} from 'react-query';
import {queryClient} from '../../App';

interface TestInterface {
  test_key: string;
  test_name: string;
  creator: string;
}

const useCreateTest = () =>
  useMutation(
    async (test: TestInterface) => {
      return createTest(test.test_key, test.test_name, test.creator);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('fetchUserTests');
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
  useMutation(
    async (test_item: TestItemInterface) => {
      const {test_id, prompt_text, creator, choices} = test_item;
      return createTestItem(test_id, creator, prompt_text, choices);
    },
    {
      onSettled() {
        queryClient.invalidateQueries('fetchTestItems');
      },
    },
  );

const useFetchUserTests = ({user_id}: Record<string, string>) =>
  useQuery('fetchUserTests', () => fetchUserTests(user_id));

const useFetchTestItems = ({test_id}: Record<string, string>) =>
  useQuery('fetchTestItems', async () => fetchTestItems(test_id));

const useFetchTestItemsByKey = () =>
  useMutation('fetchTestItems', async ({test_key}: Record<string, string>) =>
    fetchTestItemsByKey(test_key),
  );
const usePostTestAnswer = () =>
  useMutation(
    'postTestAnswer',
    async ({test_id, test_item_id, answer, answer_index}: any) => {
      const {data} = await getCurrentAnswer(test_item_id);
      if (!data) {
        return postTestAnswer(test_id, test_item_id, answer, answer_index);
      } else {
        return await deleteAnswer(test_item_id).then(() =>
          postTestAnswer(test_id, test_item_id, answer, answer_index),
        );
      }
    },
  );
const useGetCurrentAnswer = (test_item_id: string) =>
  useQuery(
    'getCurrentAnswer_' + test_item_id,
    async () => await getCurrentAnswer(test_item_id),
  );

export {
  usePostTestAnswer,
  useGetCurrentAnswer,
  useCreateTest,
  useCreateTestItem,
  useFetchTestItems,
  useFetchUserTests,
  useFetchTestItemsByKey,
};
