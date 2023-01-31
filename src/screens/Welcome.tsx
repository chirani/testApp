import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const Welcome = () => {
  return (
    <View>
      <TouchableOpacity>
        <Text>Create A Test</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>Take A Test</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Welcome;
