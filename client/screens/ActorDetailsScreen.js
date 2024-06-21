import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { getActorMovies, getActorDetails } from '../utils/api';

const ActorDetailsScreen = ({ route, navigation }) => {
  const { actor } = route.params;
  const [actorMovies, setActorMovies] = useState([]);
  const [actorDetails, setActorDetails] = useState(null);
  const [error, setError] = useState(null);
  const [age, setAge] = useState(null); // Состояние для хранения возраста актера

  useEffect(() => {
    const fetchActorData = async () => {
      try {
        const movies = await getActorMovies(actor.id);
        setActorMovies(movies);

        const details = await getActorDetails(actor.id);
        console.log('Ответ API для деталей актера:', details); // Добавляем для отладки

        setActorDetails(details);

        // Расчет возраста актера
        if (details.birthday) {
          const birthDate = new Date(details.birthday);
          const today = new Date();
          let age = today.getFullYear() - birthDate.getFullYear();
          const monthDiff = today.getMonth() - birthDate.getMonth();
          if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birthDate.getDate())
          ) {
            age--;
          }
          setAge(age);
        }
      } catch (error) {
        console.error('Ошибка при получении данных об актере:', error);
        setError(error);
      }
    };

    fetchActorData();
  }, [actor.id]);

  // Функция для открытия профилей в социальных сетях
  const openSocialMediaProfile = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error('Не удалось открыть URL:', err)
    );
  };

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Ошибка при получении данных об актере:</Text>
        <Text>{error.message}</Text>
      </View>
    );
  }

  if (!actorDetails) {
    return (
      <View style={styles.container}>
        <Text>Загрузка...</Text>
      </View>
    );
  }

  // Функция для обработки нажатия на фильм
  const handleMoviePress = (movie) => {
    navigation.navigate('MovieDetails', { movie });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.actorInfoContainer}>
        <Image
          style={styles.actorImage}
          source={{
            uri: `https://image.tmdb.org/t/p/w500${actor.profile_path}`,
          }}
        />
        <View style={styles.actorDetailsContainer}>
          <View style={styles.personalInfoContainer}>
            <Text style={styles.actorName}>{actor.name}</Text>
            <Text style={styles.infoItem}>
              <Text style={styles.infoLabel}>Пол</Text>
              <Text style={styles.infoValue}>
                {actorDetails.gender === 2 ? 'Мужской' : 'Женский'}
              </Text>
            </Text>
            <Text style={styles.infoItem}>
              <Text style={styles.infoLabel}>Дата рождения</Text>
              <Text style={styles.infoValue}>
                {actorDetails.birthday
                  ? `${formatDate(actorDetails.birthday)} (${age} ${
                      age === 1 ? 'год' : 'лет'
                    })`
                  : 'Неизвестно'}
              </Text>
            </Text>
            <Text style={styles.infoItem}>
              <Text style={styles.infoLabel}>Место рождения</Text>
              <Text style={styles.infoValue}>
                {actorDetails.place_of_birth || 'Неизвестно'}
              </Text>
            </Text>
          </View>

          <View style={styles.socialMediaContainer}>
            {/* Заменить реальными ссылками на социальные сети из actorDetails */}
            {actorDetails.twitter_id && (
              <TouchableOpacity
                style={styles.socialMediaButton}
                onPress={() =>
                  openSocialMediaProfile(
                    `https://twitter.com/intent/user?user_id=${actorDetails.twitter_id}`
                  )
                }>
                <Text style={styles.socialMediaButtonText}>Twitter</Text>
              </TouchableOpacity>
            )}
            {actorDetails.instagram_id && (
              <TouchableOpacity
                style={styles.socialMediaButton}
                onPress={() =>
                  openSocialMediaProfile(
                    `https://www.instagram.com/${actorDetails.instagram_id}`
                  )
                }>
                <Text style={styles.socialMediaButtonText}>Instagram</Text>
              </TouchableOpacity>
            )}
            {actorDetails.facebook_id && (
              <TouchableOpacity
                style={styles.socialMediaButton}
                onPress={() =>
                  openSocialMediaProfile(
                    `https://www.facebook.com/${actorDetails.facebook_id}`
                  )
                }>
                <Text style={styles.socialMediaButtonText}>Facebook</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>

      <Text style={styles.moviesTitle}>Фильмы:</Text>
      <View style={styles.moviesContainer}>
        {actorMovies.map((movie, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleMoviePress(movie)}
            style={styles.movieContainer}>
            <Image
              style={styles.moviePoster}
              source={{
                uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
              }}
            />
            <Text style={styles.movieTitle}>{movie.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

// Функция для форматирования даты в заданный формат
const formatDate = (dateString) => {
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('ru-RU', options);
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
  },
  actorInfoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
    paddingTop: 50,
  },
  actorImage: {
    width: 150,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  actorDetailsContainer: {
    flex: 1,
    marginLeft: 20,
  },
  actorName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  personalInfoContainer: {
    width: '100%',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  infoLabel: {
    flex: 1,
    fontSize: 16,
    marginRight: 10,
    fontWeight: 'bold',
  },
  infoValue: {
    flex: 2,
    fontSize: 16,
  },
  moviesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    textAlign: 'center',
  },
  moviesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  movieContainer: {
    width: '30%',
    alignItems: 'center',
    marginVertical: 5,
  },
  moviePoster: {
    width: 100,
    height: 150,
    resizeMode: 'cover',
    marginBottom: 5,
    borderRadius: 5,
  },
  movieTitle: {
    textAlign: 'center',
    width: '100%',
  },
  socialMediaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  socialMediaButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  socialMediaButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ActorDetailsScreen;
