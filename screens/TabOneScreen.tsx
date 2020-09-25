import * as React from 'react'
import { StyleSheet } from 'react-native'

import List from '../components/List'
import { Text, View } from '../components/Themed'

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <List />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
