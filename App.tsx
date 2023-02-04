import {StatusBar} from 'react-native';
import React from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
import {NavigationContainer} from '@react-navigation/native';
import StackNav from '@screens/index';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar
            backgroundColor={'#be2ed6'}
            animated={false}
            hidden={false}
          />
          <StackNav />
        </NavigationContainer>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
};

export default App;
