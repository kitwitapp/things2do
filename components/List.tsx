import React, { useState } from 'react';
import { Text, View } from './Themed';
import * as SQLite from 'expo-sqlite';
import { FlatList } from 'react-native-gesture-handler';
import { Calendar, Agenda } from 'react-native-calendars';
import SortableList from 'react-native-sortable-list';
import { getDummyData } from '../utils';
import { StyleSheet } from 'react-native';

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

  function _renderRow({ data }) {
    return <Row data={data} />
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
        <SortableList
          data={getDummyData()}
          renderRow={_renderRow}
          />
      </View>
    </View>
  )
}

function Row ({ data }) {
  return (
    <View>
      <Text style={styles.row}>{data.text}</Text>
    </View>
  )
}


const styles = StyleSheet.create({
  row: {
    marginTop: 2,
    backgroundColor: '#555',
  }
})
