import React, { useState } from 'react';
import { Text, View } from './Themed';
import { TextInput, StyleSheet } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db.db');

export default function InputBox() {
  const [task, addTask] = useState('');
  function onChangeText(value: any) {
    addTask(value)
  }
  return (
    <View>
      <TextInput
        onChangeText={onChangeText}
        placeholder='Add a task...'
        style={styles.input}
      />
      <Text>You wrote: {task}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    color: '#888',
    width: 200,
    marginVertical: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  }
})
