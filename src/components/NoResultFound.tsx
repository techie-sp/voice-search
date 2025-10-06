import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'

interface NoResultFoundProps {
  message?: string
}

const NoResultFound: React.FC<NoResultFoundProps> = ({ message }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://cdn-icons-png.flaticon.com/512/7486/7486802.png', // simple search icon illustration
        }}
        style={styles.image}
      />
      <Text style={styles.title}>No Results Found</Text>
      <Text style={styles.message}>
        {message || 'Try adjusting your search or filters to find what you’re looking for.'}
      </Text>
    </View>
  )
}

export default NoResultFound

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 16,
    opacity: 0.8,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  message: {
    textAlign: 'center',
    marginTop: 8,
    color: '#777',
    fontSize: 14,
    lineHeight: 20,
  },
})
