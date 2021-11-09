import { SafeAreaProvider } from 'react-native-safe-area-context'
import React from 'react'
import { View, Text, Imagei, StyleSheet } from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import Deck from './src/Deck'
const DATA = [
  { id: 1, text: 'Card #1', uri: 'https://www.ehaliyle.com/wp-content/uploads/2018/10/google-ranking-factors.png' },
  { id: 2, text: 'Card #2', uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg' },
  { id: 3, text: 'Card #3', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg' },
  { id: 4, text: 'Card #4', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg' },
  { id: 5, text: 'Card #5', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' },
  { id: 6, text: 'Card #6', uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg' },
  { id: 7, text: 'Card #7', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg' },
  { id: 8, text: 'Card #8', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg' },
]
export default function App() {
  const renderCard = (item) => {
    return (
      <Card>
        <Card.Image source={{ uri: 'https://www.ehaliyle.com/wp-content/uploads/2018/10/google-ranking-factors.png' }} />
        <Card.Title style={{ marginHorizontal: 10 }}>{item.text}</Card.Title>
        <Button icon={{ name: 'code' }}  title='Get more!' />
      </Card>
    )
  }
  const onSwipeRight = (index) => {}
  const renderNoMoreCards = () => {
    return (
      <Card>
        <Card.Title style={{fontSize: 24, marginHorizontal: 10 }}>All Done!</Card.Title>
        <Text>There is no more content here!</Text>
        <Button icon={{ name: 'code' }}  title='View More!' />
      </Card>
    )
  }
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Deck data={DATA} renderCard={renderCard} onSwipeRight={onSwipeRight} renderNoMoreCards={renderNoMoreCards}/>
      </View>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
