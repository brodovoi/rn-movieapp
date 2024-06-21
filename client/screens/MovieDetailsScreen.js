import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { fetchGenres } from '../utils/api';
import GenreTag from '../components/GenreTag/GenreTag';
import RatingIcon from '../assets/icons/star';
import DurationIcon from '../assets/icons/time';
import DateIcon from '../assets/icons/date';

const MovieDetailsScreen = ({ route }) => {
  const { movie } = route.params;
  const navigation = useNavigation();
  const [genres, setGenres] = useState([]);

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

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.contentContainer}>
      <Image
        style={styles.poster}
        source={{
          uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        }}
      />

      <View style={styles.info}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.originalTitle}>
          Оригинальное название: {movie.original_title}
        </Text>
        {/* <Text>Оригинальный язык: {movie.original_language}</Text> */}
        {/*  */}
        <View style={styles.movieDetailsContainer}>
          <Text style={styles.movieDetails}>
            <RatingIcon /> {movie.vote_average.toFixed(1)}
          </Text>
          <Text style={styles.movieDetails}>
            <DurationIcon /> {movie.duration} minutes
          </Text>
          <Text style={styles.movieDetails}>
            <DateIcon />
            {formatDate(movie.release_date)}
          </Text>
        </View>
        {/*  */}
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
        <Button title="Назад" onPress={() => navigation.goBack()} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    // paddingVertical: 20,
  },
  poster: {
    width: '100%',
    height: 345,
    resizeMode: 'cover',
    marginBottom: 20,
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
  },
  originalTitle: {
    fontSize: 18,
    marginBottom: 10,
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
  },

  genres: {
    fontSize: 16,
    marginBottom: 10,
  },

  actorsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
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
  },
  movieDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  movieDetails: {
    fontSize: 14,
    color: '#000',
  },
});

export default MovieDetailsScreen;
