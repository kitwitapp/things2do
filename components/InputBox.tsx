import React, { useState } from 'react'
import { Text, View } from './Themed'
import { TextInput, StyleSheet } from 'react-native'
import * as SQLite from 'expo-sqlite'
import { TouchableHighlight } from 'react-native-gesture-handler'

const db = SQLite.openDatabase('app.db')

db.transaction((tx) => {
  tx.executeSql(
    `
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY,
      task TEXT,
      date TEXT
    )`,
    []
  )
})

export default function InputBox() {
  const [task, setTask] = useState('')
  const [date, setDate] = useState('')

  function saveToDatabase(task: string, date: string) {
    db.transaction((tx) => {
      tx.executeSql('INSERT INTO `tasks` (task, date) VALUES (?, ?)', [
        task,
        date,
      ])
    })
  }

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={(value) => {
          setTask(value)
        }}
        placeholder="Add a task..."
        style={styles.input}
      />
      <TextInput
        onChangeText={(value) => {
          setDate(value)
        }}
        placeholder="Set date (in YYYY-MM-DD format)"
        style={styles.input}
      />
      <TouchableHighlight
        onPress={() => saveToDatabase(task, date)}
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
  },
})
