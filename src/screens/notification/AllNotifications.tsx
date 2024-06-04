import { View, Text } from 'react-native'
import React from 'react'

const AllNotifications = () => {
  return (
    <View>
      <Text>AllNotifications</Text>
      <Text>project id: {process.env.EXPO_PUBLIC_PROJECT_ID}</Text>
    </View>
  )
}

export default AllNotifications