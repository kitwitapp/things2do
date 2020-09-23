import React, { useState, useEffect } from 'react'
import { Text, View } from './Themed'
import * as SQLite from 'expo-sqlite'
import { FlatList } from 'react-native-gesture-handler'
import { Calendar } from 'react-native-calendars'
import SortableList from 'react-native-sortable-list'
import { getDummyData, prepareMarkedDates } from '../utils'
import { StyleSheet } from 'react-native'

const db = SQLite.openDatabase('app.db')

export default function List({ style }: { style: Object }) {
  const [tasks, setTasks] = useState([])
  const [markedDates, setMarkedDates] = useState({})
  const [] = useState('')

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT date FROM tasks`,
        [],
        (_, { rows }) => {
          setMarkedDates(prepareMarkedDates(rows['_array']))
        }
      )
    })
  }, [])

  function setTasksForDate(date: string) {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT task, date FROM tasks WHERE date = ?`,
        [date],
        (_, { rows }) => {
          setTasks(rows['_array'])
        }
      )
    })
  }

  return (
    <View style={style}>
      <Calendar
        style={{
          borderWidth: 1,
        }}
        onDayPress={(date) => { setTasksForDate(date['dateString']) }}
        markedDates={markedDates}
      />
      <View>
        <FlatList
          keyExtractor={(item, _idx) => item['task']}
          data={tasks}
          renderItem={({item}) => <Text>{item['task']}</Text>}
        />
      </View>
      {/* <View>
        <SortableList
          data={getDummyData()}
          renderRow={_renderRow}
          />
      </View> */}
    </View>
  )
}

function _renderRow(data) {
  return <Row data={data} />
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
