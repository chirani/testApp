import {
  View,
  Text,
  Pressable,
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {signUpWithEmail} from '../supabase/auth';
const Question = () => {
  const data = [
    {
      key: 'Android',
      image: 'https://cdn-icons-png.flaticon.com/512/4174/4174508.png',
    },
    {
      key: 'iOS',
      image: 'https://cdn-icons-png.flaticon.com/512/1787/1787077.png',
    },
    {
      key: 'Java',
      image: 'https://cdn-icons-png.flaticon.com/512/1834/1834842.png',
    },
    {
      key: 'Swift',
      image: 'https://cdn-icons-png.flaticon.com/512/1912/1912692.png',
    },
  ];
  return (
    <View style={styles.container}>
      <Text style={styles.questionNumber}>Question N° 13</Text>
      <Text style={styles.question}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In gravida
        metus tortor?
      </Text>
      <FlatList
        numColumns={2}
        contentContainerStyle={styles.flatListStyle}
        columnWrapperStyle={{
          justifyContent: 'space-between',
        }}
        ItemSeparatorComponent={() => <View style={{height: 16}} />}
        data={data}
        renderItem={({item, index}: any) => (
          <TouchableOpacity style={styles.item} activeOpacity={0.7}>
            <View style={styles.sequenceChar}>
              <Text style={styles.char}>{String.fromCharCode(65 + index)}</Text>
            </View>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{uri: item.image}} alt="" />
            </View>
          </TouchableOpacity>
        )}
      />
      <View style={styles.buttonContainer}>
        <Pressable
          onPress={() => {
            signUpWithEmail('Hello@mail.com', 'pompom');
          }}
          android_ripple={{color: '#fff6'}}
          style={[styles.button, styles.backButton]}>
          <Text style={styles.buttonText}>Go Back</Text>
        </Pressable>
        <View style={styles.buttonSpacer} />
        <Pressable
          style={styles.button}
          android_ripple={{color: '#fff6'}}
          onPress={() => {
            console.log('hey');
          }}>
          <Text style={styles.buttonText}>Next</Text>
        </Pressable>
      </View>
    </View>
  );
};
const screenWidth = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  container: {margin: 16, flex: 1},
  question: {fontSize: 22, color: '#101022', paddingVertical: 12},
  questionNumber: {color: 'teal'},
  flatListStyle: {
    justifyContent: 'space-evenly',
  },
  item: {
    borderWidth: 3,
    borderColor: '#aaa',
    width: (screenWidth - 32) / 2 - 8,
    height: (screenWidth - 32) / 2 - 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sequenceChar: {
    opacity: 0.8,
    position: 'absolute',
    top: 8,
    left: 8,
    width: 40,
    height: 40,
    backgroundColor: '#aaa',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  char: {
    fontSize: 20,
    color: 'white',
  },
  buttonContainer: {
    marginVertical: 16,
    flexDirection: 'row',
  },
  button: {
    padding: 16,
    paddingHorizontal: 32,
    backgroundColor: 'teal',
    borderRadius: 4,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    backgroundColor: '#222',
    fontWeight: '600',
  },
  buttonSpacer: {
    width: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  image: {
    height: '100%',
    resizeMode: 'center',
  },
  imageContainer: {
    height: '80%',
    width: '80%',
  },
});

export default Question;
