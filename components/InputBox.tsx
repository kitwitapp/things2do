import React, { useState } from 'react';
import { Text, View } from './Themed';
import { TextInput, StyleSheet } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { TouchableHighlight } from 'react-native-gesture-handler';

const db = SQLite.openDatabase('db.db');

db.transaction(tx => {
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, task TEXT)',
    []
  )
})

export default function InputBox() {
  const [task, addTask] = useState('');
  function onChangeText(value: any) {
    addTask(value)
  }
  function onPress(task: string) {
    db.transaction(tx => {
      tx.executeSql('INSERT INTO `tasks` (`task`) VALUES (?)', [task])
    })
  }
  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={onChangeText}
        placeholder='Add a task...'
        style={styles.input}
      />
      <TouchableHighlight
        onPress={() => onPress(task)}
        style={styles.button}
      >
        <Text>ADD</Text>
      </TouchableHighlight>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    color: '#888',
    width: 200,
    marginVertical: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  button: {
    backgroundColor: '#28f',
    alignItems: 'center',
    color: '#fff',
    padding: 10,
  }
})
