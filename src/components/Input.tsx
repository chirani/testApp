import React from 'react';
import {useController} from 'react-hook-form';
import {TextInput} from 'react-native';

export default ({name, control, style, props}: any) => {
  const {field} = useController({
    control,
    defaultValue: '',
    name,
  });

  return (
    <TextInput
      style={style}
      value={field.value}
      onChangeText={field.onChange}
      {...props}
    />
  );
};
