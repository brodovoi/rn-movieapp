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
import ReturnIcon from '../assets/icons/return';

const SwipeScreen = ({ onBookmarkAdded }) => {
  const [currentMovie, setCurrentMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [genres, setGenres] = useState([]);
  const [previousMovie, setPreviousMovie] = useState(null);
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
    setPreviousMovie(currentMovie); // Сохраняем фильм только при свайпе влево
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

  const handleBackButton = () => {
    if (previousMovie) {
      setCurrentMovie(previousMovie);
      setPreviousMovie(null);
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
                {previousMovie && (
                  <TouchableOpacity
                    onPress={handleBackButton}
                    style={styles.backButton}>
                    <ReturnIcon />
                  </TouchableOpacity>
                )}
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
                    <View style={styles.movieDetails}>
                      <RatingIcon />
                      <Text style={styles.detailText}>
                        {movie.vote_average.toFixed(1)}
                      </Text>
                    </View>
                    <View style={styles.movieDetails}>
                      <DurationIcon />
                      <Text style={styles.detailText}>
                        {movie.duration} minutes
                      </Text>
                    </View>
                    <View style={styles.movieDetails}>
                      <DateIcon />
                      <Text style={styles.detailText}>
                        {new Date(movie.release_date).getFullYear()}
                      </Text>
                    </View>
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
    backgroundColor: '#0c0c0c',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    right: 10,
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  card: {
    width: '100%',
    height: '90%',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#0c0c0c',
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 12,
    position: 'relative',
  },
  movieInfo: {
    padding: 20,
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    // borderRadius: 10,
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
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 14,
  },
  detailText: {
    marginLeft: 5,
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
    backgroundColor: '#0c0c0c',
  },
});

export default SwipeScreen;
