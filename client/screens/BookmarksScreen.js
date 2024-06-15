import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { getBookmarks, deleteBookmark } from '../utils/api';

const BookmarksScreen = ({ navigation }) => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    try {
      const bookmarksData = await getBookmarks();
      setBookmarks(bookmarksData);
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
      Alert.alert('Error', 'Failed to load bookmarks');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBookmark = async (id) => {
    try {
      await deleteBookmark(id);
      // Удаление закладки из списка без повторной загрузки всех закладок
      setBookmarks((prevBookmarks) =>
        prevBookmarks.filter((bookmark) => bookmark._id !== id)
      );
    } catch (error) {
      console.error('Error deleting bookmark:', error);
      Alert.alert('Error', 'Failed to delete bookmark');
    }
  };

  const updateBookmarks = () => {
    // Обновление списка закладок при изменениях
    fetchBookmarks();
  };

  const renderItem = ({ item }) => {
    if (!item || !item._id) {
      console.error('Invalid item data:', item);
      return null;
    }

    return (
      <Swipeable
        renderRightActions={() => (
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDeleteBookmark(item._id)}>
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        )}>
        <TouchableOpacity
          style={styles.bookmarkCard}
          onPress={() => navigation.navigate('MovieDetails', { movie: item })}>
          <Image
            style={styles.poster}
            source={{
              uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
            }}
          />
          <Text style={styles.title}>{item.title}</Text>
        </TouchableOpacity>
      </Swipeable>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {bookmarks.length > 0 ? (
        <FlatList
          data={bookmarks}
          renderItem={renderItem}
          keyExtractor={(item) => (item && item._id ? item._id.toString() : '')}
        />
      ) : (
        <Text style={styles.emptyText}>No bookmarks to display</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookmarkCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    marginLeft: 10,
  },
  poster: {
    width: 100,
    height: 150,
    resizeMode: 'cover',
    marginRight: 10,
  },
  emptyText: {
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    flex: 1,
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default BookmarksScreen;
