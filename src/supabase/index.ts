import {createClient} from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-url-polyfill/auto';
import {SUPABASE_API_KEY} from '@env';

const supabaseUrl = 'https://ibftixmovwilnbfpusjx.supabase.co';
const supabaseKey = SUPABASE_API_KEY;

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: AsyncStorage as any,
    storageKey: 'Session',
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export default supabase;
