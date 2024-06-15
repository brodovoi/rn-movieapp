import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  Button,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { fetchGenres } from '../utils/api';
import GenreTag from '../components/GenreTag/GenreTag';

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

  const hours = Math.floor(movie.duration / 60);
  const minutes = movie.duration % 60;
  const durationString = `${hours}ч ${minutes}м`;

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      style={styles.scrollView}>
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
        <Text style={styles.rating}>Рейтинг: {movie.vote_average}</Text>
        <Text>Оригинальный язык: {movie.original_language}</Text>
        <Text style={styles.releaseDate}>
          Дата выхода: {movie.release_date}
        </Text>

        <Text style={styles.genres}>Жанры:</Text>
        {/* {getGenreNames()} */}

        <Text style={styles.duration}>Продолжительность: {durationString}</Text>
        <Text style={styles.actorsTitle}>Актеры:</Text>
        <View style={styles.actorsContainer}>
          <ScrollView horizontal={true}>
            {movie.actors &&
              movie.actors.map((actor, index) => (
                <View key={index} style={styles.actorContainer}>
                  <Image
                    style={styles.actorImage}
                    source={{
                      uri: `https://image.tmdb.org/t/p/w500${actor.profile_path}`,
                    }}
                  />
                  <Text style={styles.actorName}>{actor.name}</Text>
                </View>
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
  container: {
    paddingTop: 20,
    paddingBottom: 300,
  },
  info: {
    paddingHorizontal: 20,
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingBottom: 200,
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  poster: {
    width: '100%',
    height: '100%',
    // maxHeight: 300,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  originalTitle: {
    fontSize: 16,
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
  releaseDate: {
    fontSize: 16,
    marginBottom: 10,
  },
  genres: {
    fontSize: 16,
    marginBottom: 10,
  },
  duration: {
    fontSize: 16,
    marginBottom: 10,
  },
  actorsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  actorsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  actorContainer: {
    marginRight: 20,
    marginBottom: 10,
    alignItems: 'center',
  },
  actorImage: {
    width: 100,
    height: 150,
    resizeMode: 'cover',
    marginBottom: 5,
    borderRadius: 10,
    backgroundColor: '#666',
  },
  actorName: {
    textAlign: 'center',
    marginTop: 5,
  },
});

export default MovieDetailsScreen;
