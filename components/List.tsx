import React, { useState, useEffect } from 'react'
import { View } from './Themed'
import * as SQLite from 'expo-sqlite'
import { Calendar } from 'react-native-calendars'
import { prepareMarkedDates } from '../utils'
import { ScrollView } from 'react-native'
import DraggableList from './DraggableList'

const db = SQLite.openDatabase('app.db')

export default function List() {
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
    <ScrollView>
      <View>
        <Calendar
          style={{
            borderWidth: 1,
          }}
          onDayPress={(date) => { setTasksForDate(date['dateString']) }}
          markedDates={markedDates}
        />
        <DraggableList tasks={tasks} />
      </View>
    </ScrollView>
  )
}
