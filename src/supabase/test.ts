import supabase from './index';

const createTest = async (
  test_key: string,
  test_name: string,
  creator: string,
) => supabase.from('tests').insert([{test_key, test_name, creator}]);

const createTestItem = async (
  test_id: string,
  creator: string,
  prompt_text: string,
  choices: string[],
) =>
  await supabase
    .from('test_items')
    .insert([{test_id, creator, prompt_text, choices}])
    .then(res => res);

const fetchUserTests = async (user_id: string) =>
  await supabase.from('tests').select('*').eq('creator', user_id);

const fetchTestItems = async (test_id: string) =>
  await supabase.from('test_items').select().eq('test_id', test_id);

const fetchTestByKey = async (test_key: string) =>
  await supabase.from('tests').select().eq('test_key', test_key).maybeSingle();

const fetchTestItemsByKey = async (test_key: string) =>
  fetchTestByKey(test_key).then(res => fetchTestItems(res?.data?.id));

const postTestAnswer = async (
  test_id: number,
  test_item_id: string,
  answer: string,
  answer_index: number,
) =>
  await supabase
    .from('test_answers')
    .insert({test_id, test_item_id, answer, answer_index})
    .then(res => res);

const deleteAnswer = async (test_item_id: string) =>
  await supabase.from('test_answers').delete().eq('test_item_id', test_item_id);

const getCurrentAnswer = async (test_item_id: string) =>
  await supabase.from('test_answers').select().eq('test_item_id', test_item_id);

export {
  deleteAnswer,
  createTest,
  createTestItem,
  fetchUserTests,
  fetchTestItems,
  fetchTestByKey,
  fetchTestItemsByKey,
  postTestAnswer,
  getCurrentAnswer,
};
