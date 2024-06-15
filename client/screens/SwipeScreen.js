import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { useNavigation } from '@react-navigation/native';
import { getRandomMovie, addBookmark } from '../utils/api';

const SwipeScreen = ({ onBookmarkAdded }) => {
  const [currentMovie, setCurrentMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  const language = 'ru';

  useEffect(() => {
    fetchRandomMovie();
  }, []);

  const fetchRandomMovie = async () => {
    setIsLoading(true);
    try {
      const randomMovie = await getRandomMovie(language);
      setCurrentMovie(randomMovie);
    } catch (error) {
      console.error('Error fetching random movie:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePressMovieDetails = () => {
    if (currentMovie) {
      navigation.navigate('MovieDetails', {
        movie: {
          ...currentMovie,
          actors: currentMovie.actors || [], // Убедитесь, что actors всегда массив
          genre_ids: currentMovie.genre_ids || [], // Убедитесь, что genre_ids всегда массив
        },
      });
    }
  };

  const handleSwipeLeft = () => {
    console.log('Swiped left!');
    updateCurrentMovie();
  };

  const handleSwipeRight = async () => {
    console.log('Swiped right!');
    if (currentMovie) {
      try {
        await addBookmark({
          ...currentMovie,
        });
        console.log('Added to bookmarks:', currentMovie);
        updateCurrentMovie();
        // Вызываем колбэк, чтобы обновить список закладок
        onBookmarkAdded();
      } catch (error) {
        console.error('Error adding to bookmarks:', error);
      }
    }
  };

  const updateCurrentMovie = async () => {
    setIsLoading(true);
    try {
      const randomMovie = await getRandomMovie(language);
      setCurrentMovie(randomMovie);
    } catch (error) {
      console.error('Error updating current movie:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePressMovieDetails}>
        <Swiper
          cards={[currentMovie]}
          renderCard={(movie) => (
            <TouchableOpacity onPress={handlePressMovieDetails}>
              <View style={styles.card}>
                <View style={styles.posterContainer}>
                  <Image
                    style={styles.poster}
                    source={{
                      uri: movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : 'https://via.placeholder.com/500x750',
                    }}
                  />
                </View>
                <View style={styles.movieInfo}>
                  <Text style={styles.title}>{movie.title}</Text>
                  <Text style={styles.originalTitle}>
                    Original Title: {movie.original_title}
                  </Text>
                  <Text style={styles.rating}>
                    Rating: {movie.vote_average}
                  </Text>
                  <Text style={styles.runtime}>
                    Runtime: {movie.runtime} minutes
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          onSwipedRight={handleSwipeRight}
          onSwipedLeft={handleSwipeLeft}
          cardIndex={0}
          backgroundColor="red"
          stackSize={2}
          verticalSwipe={false}
          cardVerticalMargin={20}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  card: {
    width: '100%',
    height: '90%',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#0c0c0c',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  movieInfo: {
    padding: 20,
  },
  runtime: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#ffffff',
  },
  posterContainer: {
    width: '100%',
    height: '70%',
    marginBottom: 10,
  },
  poster: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  originalTitle: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 5,
  },
  rating: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'orange',
    marginBottom: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SwipeScreen;
