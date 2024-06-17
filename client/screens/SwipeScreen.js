import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { useNavigation } from '@react-navigation/native';
import {
  getRandomMovie,
  addBookmark,
  getGenreNameById,
  fetchGenres,
} from '../utils/api';
import RatingIcon from '../assets/icons/star';
import DurationIcon from '../assets/icons/time';
import GenreTag from '../components/GenreTag/GenreTag';
import DateIcon from '../assets/icons/date';

const SwipeScreen = ({ onBookmarkAdded }) => {
  const [currentMovie, setCurrentMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [genres, setGenres] = useState([]);
  const navigation = useNavigation();

  const language = 'ru';

  useEffect(() => {
    fetchRandomMovie();
  }, []);

  const fetchRandomMovie = async () => {
    setIsLoading(true);
    try {
      const [randomMovie, genres] = await Promise.all([
        getRandomMovie(language),
        fetchGenres(),
      ]);
      setCurrentMovie(randomMovie);
      setGenres(genres);
    } catch (error) {
      console.error('Ошибка при загрузке случайного фильма:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePressMovieDetails = () => {
    if (currentMovie) {
      navigation.navigate('MovieDetails', {
        movie: {
          ...currentMovie,
          actors: currentMovie.actors || [],
          genre_ids: currentMovie.genre_ids || [],
          language, // Передаем параметр языка
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
        // onBookmarkAdded();
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
                  <View style={styles.movieDetailsContainer}>
                    <Text style={styles.movieDetails}>
                      <RatingIcon /> {movie.vote_average.toFixed(1)}
                    </Text>
                    <Text style={styles.movieDetails}>
                      <DurationIcon /> {movie.duration} minutes
                    </Text>
                    <Text style={styles.movieDetails}>
                      <DateIcon />
                      {new Date(movie.release_date).getFullYear()}
                    </Text>
                  </View>
                  <View style={styles.genreContainer}>
                    <Text style={styles.genreTitle}>Жанры:</Text>
                    <View style={styles.genreTagsContainer}>
                      {movie.genre_ids.map((genreId) => (
                        <GenreTag
                          key={genreId}
                          genreName={getGenreNameById(genreId, genres)}
                        />
                      ))}
                    </View>
                  </View>
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
    position: 'relative',
  },
  movieInfo: {
    padding: 20,
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',

    backgroundColor:
      'rgba(0, 0, 0, 0.7)' /* Цвет фона: черный с прозрачностью 70% */,
    backdropFilter: 'blur(10px)' /* Размытие фона */,
    WebkitBackdropFilter: 'blur(10px)' /* Для поддержки вебкит-браузеров */,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#ffffff',
  },
  movieDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  movieDetails: {
    fontSize: 14,
    color: '#ffffff',
  },
  posterContainer: {
    width: '100%',
    height: '100%',
    marginBottom: 10,
  },
  poster: {
    width: '100%',
    height: '100%',
    // resizeMode: '100%',
  },
  genreContainer: {
    marginTop: 10,
  },
  genreTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  genreTagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SwipeScreen;
