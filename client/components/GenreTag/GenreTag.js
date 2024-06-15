import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GenreTag = ({ genreName }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{genreName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#6C38CC',
    padding: 5,
    borderRadius: 10,
    marginRight: 5,
    marginBottom: 5,
  },
  text: {
    fontSize: 12,
    color: '#ffff',
  },
});

export default GenreTag;
