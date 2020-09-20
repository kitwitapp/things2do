import React, { useState } from 'react';
import { Text, View } from './Themed';
import * as SQLite from 'expo-sqlite';
import { FlatList } from 'react-native-gesture-handler';
import { Calendar } from 'react-native-calendars';

const db = SQLite.openDatabase('app.db')

export default function List({ style }: { style: Object }) {
  const [tasks, setTasks] = useState([])
  const [date, setDate] = useState('')

  function getTasksByDate(date: string) {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT task, date FROM tasks WHERE date = ?`,
        [date],
        (_, { rows }) => setTasks(rows['_array'])
      )
    })
  }

  return (
    <View style={style}>
      <Calendar
        style={{
          borderWidth: 1,
        }}
        onDayPress={(date) => { getTasksByDate(date['dateString']) }}
      />
      <View>
        <FlatList
          keyExtractor={(item, idx) => item['task']}
          data={tasks}
          renderItem={({item}) => <Text>{item['task']}</Text>}
          style={style}
        />
      </View>
    </View>
  )
}
