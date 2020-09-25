import * as React from 'react';
import { StyleSheet } from 'react-native';

import InputBox from '../components/InputBox';
import { View } from '../components/Themed';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <InputBox />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
