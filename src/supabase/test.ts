import supabase from '@spbase';

const createTest = async (test_key: string, creator: string) =>
  await supabase.from('tests').insert([{test_key, creator}]);

const createTestItem = async (
  test_id: string,
  creator: string,
  prompt_text: string,
  choices: string[],
) => await supabase.insert([{test_id, prompt_text, creator, choices}], c);

export {createTest, createTestItem};
