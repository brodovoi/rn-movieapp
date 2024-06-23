import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchGenres, getMovieTrailer } from '../utils/api';
import GenreTag from '../components/GenreTag/GenreTag';
import RatingIcon from '../assets/icons/star';
import DurationIcon from '../assets/icons/time';
import DateIcon from '../assets/icons/date';
import ArrowBackIcon from '../assets/icons/arrow-left';
import BookmarkIcon from '../assets/icons/bookmark';
import PlayIcon from '../assets/icons/play';
import { WebView } from 'react-native-webview';

const MovieDetailsScreen = ({ route }) => {
  const { movie } = route.params;
  const navigation = useNavigation();
  const [genres, setGenres] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);
  const [isTrailerVisible, setIsTrailerVisible] = useState(false);
  const [isLoadingTrailer, setIsLoadingTrailer] = useState(false);

  useEffect(() => {
    const getGenres = async () => {
      const fetchedGenres = await fetchGenres();
      setGenres(fetchedGenres);
    };

    getGenres();
  }, []);

  const getGenreNames = () => {
    return (
      <View style={styles.genresContainer}>
        {genres
          .filter((genre) => movie.genre_ids.includes(genre.id))
          .map((genre, index) => (
            <GenreTag key={index} genreName={genre.name} />
          ))}
      </View>
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('ru-RU', options);
  };

  const navigateToActorDetails = (actor) => {
    navigation.navigate('ActorDetails', { actor });
  };

  const fetchTrailer = async () => {
    setIsLoadingTrailer(true);
    try {
      // Определяем язык фильма
      const language = movie.original_language || 'en'; // Используем язык фильма или по умолчанию английский
      const trailers = await getMovieTrailer(movie._id, language);
      const youtubeTrailer = trailers.find(
        (trailer) => trailer.site === 'YouTube'
      );
      if (youtubeTrailer) {
        setTrailerKey(youtubeTrailer.key);
        setIsTrailerVisible(true);
      }
    } catch (error) {
      console.error('Error fetching trailer:', error);
    } finally {
      setIsLoadingTrailer(false);
    }
  };

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.contentContainer}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <ArrowBackIcon />
      </TouchableOpacity>
      <TouchableOpacity style={styles.bookmarkButton}>
        <BookmarkIcon />
      </TouchableOpacity>
      <View style={styles.posterContainer}>
        <Image
          style={styles.poster}
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
          }}
        />
        <TouchableOpacity style={styles.playButton} onPress={fetchTrailer}>
          {isLoadingTrailer ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : (
            <PlayIcon />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.info}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.originalTitle}>
          Оригинальное название: {movie.original_title}
        </Text>

        <View style={styles.movieDetailsContainer}>
          <View style={styles.movieDetails}>
            <RatingIcon />
            <Text style={styles.detailText}>
              {movie.vote_average.toFixed(1)}
            </Text>
          </View>
          <View style={styles.movieDetails}>
            <DurationIcon />
            <Text style={styles.detailText}>{movie.duration} minutes</Text>
          </View>
          <View style={styles.movieDetails}>
            <DateIcon />
            <Text style={styles.detailText}>
              {formatDate(movie.release_date)}
            </Text>
          </View>
        </View>

        <Text style={styles.genres}>Жанры:</Text>
        {getGenreNames()}
        <Text style={styles.actorsTitle}>Актеры:</Text>
        <View style={styles.actorsContainer}>
          <ScrollView horizontal={true}>
            {movie.actors &&
              movie.actors.map((actor, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => navigateToActorDetails(actor)}>
                  <View style={styles.actorContainer}>
                    <Image
                      style={styles.actorImage}
                      source={{
                        uri: `https://image.tmdb.org/t/p/w500${actor.profile_path}`,
                      }}
                    />
                    <Text style={styles.actorName}>{actor.name}</Text>
                  </View>
                </TouchableOpacity>
              ))}
          </ScrollView>
        </View>
        <Text style={styles.overview}>{movie.overview}</Text>
      </View>
      <Modal
        visible={isTrailerVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsTrailerVisible(false)}>
        <TouchableOpacity
          style={styles.modalBackground}
          activeOpacity={1}
          onPress={() => setIsTrailerVisible(false)}>
          <TouchableOpacity activeOpacity={1} style={styles.videoContainer}>
            <WebView
              source={{
                uri: `https://www.youtube.com/embed/${trailerKey}?autoplay=1`,
              }}
              style={styles.webView}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#0c0c0c',
  },
  contentContainer: {
    position: 'relative',
  },
  posterContainer: {
    position: 'relative',
  },
  poster: {
    width: '100%',
    height: 345,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    zIndex: 10,
    transform: [{ translateX: -25 }, { translateY: -25 }],
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    paddingHorizontal: 20,
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#ffffff',
  },
  originalTitle: {
    fontSize: 18,
    marginBottom: 10,
    color: '#ffffff',
  },
  rating: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'orange',
    marginBottom: 10,
  },
  overview: {
    fontSize: 16,
    textAlign: 'left',
    marginBottom: 20,
    color: '#ffffff',
  },
  genres: {
    fontSize: 16,
    marginBottom: 10,
    color: '#ffffff',
  },
  actorsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#ffffff',
  },
  actorsContainer: {
    marginBottom: 20,
  },
  actorContainer: {
    marginRight: 5,
    alignItems: 'center',
    width: 115,
  },
  actorImage: {
    width: 110,
    height: 140,
    resizeMode: 'cover',
    marginBottom: 5,
    borderRadius: 10,
    backgroundColor: '#666',
  },
  actorName: {
    textAlign: 'center',
    color: '#ffffff',
  },
  movieDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
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
  backButton: {
    position: 'absolute',
    top: 40,
    left: 10,
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  bookmarkButton: {
    position: 'absolute',
    top: 40,
    right: 10,
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoContainer: {
    width: '90%',
    aspectRatio: 16 / 9,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
  },
  webView: {
    flex: 1,
  },
});

export default MovieDetailsScreen;
