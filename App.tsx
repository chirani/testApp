import {StatusBar} from 'react-native';
import React from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
import {NavigationContainer} from '@react-navigation/native';
import StackNav from '@screens/index';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <StatusBar backgroundColor={'teal'} animated={false} hidden={false} />
        <StackNav />
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
