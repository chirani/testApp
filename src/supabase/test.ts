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

export {createTest, createTestItem, fetchUserTests, fetchTestItems};
