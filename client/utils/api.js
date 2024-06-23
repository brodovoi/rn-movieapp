// client/utils/api.js

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL, TMDB_URL, TMDB_API_KEY } from './config';

// Экземпляр axios для авторизационных запросов
const api = axios.create({
  baseURL: `${BASE_URL}/api/auth`,
});

// Экземпляр axios для запросов к закладкам
const bookmarksApi = axios.create({
  baseURL: `${BASE_URL}/api/bookmarks`,
});

// Экземпляр axios для запросов к TMDB API
const tmdbApi = axios.create({
  baseURL: TMDB_URL,
});

export const register = async (name, email, password) => {
  const response = await api.post('/signup', { name, email, password });
  return response.data;
};

export const login = async (email, password) => {
  const response = await api.post('/login', { email, password });
  return response.data;
};

export const getUser = async () => {
  const token = await AsyncStorage.getItem('token');
  const response = await api.get('/profile', {
    headers: {
      'x-auth-token': token,
    },
  });
  return response.data;
};

export const updateUserProfile = async (userData) => {
  const token = await AsyncStorage.getItem('token');
  const formData = new FormData();

  formData.append('name', userData.name);
  formData.append('email', userData.email);
  formData.append('phone', userData.phone);
  formData.append('birthdate', userData.birthdate);

  if (userData.photo) {
    const photoName = new Date().getTime() + '.jpg';
    formData.append('photo', {
      uri: userData.photo,
      type: 'image/jpg',
      name: photoName,
    });
  }

  const response = await api.put('/profile', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'x-auth-token': token,
    },
  });
  return response.data;
};

export const getBookmarks = async () => {
  const token = await AsyncStorage.getItem('token');
  const response = await bookmarksApi.get('/', {
    headers: {
      'x-auth-token': token,
    },
  });
  return response.data;
};

export const addBookmark = async (bookmark) => {
  const token = await AsyncStorage.getItem('token');
  const response = await bookmarksApi.post('/', bookmark, {
    headers: {
      'x-auth-token': token,
    },
  });
  return response.data;
};

export const deleteBookmark = async (id) => {
  const token = await AsyncStorage.getItem('token');
  const response = await bookmarksApi.delete(`/${id}`, {
    headers: {
      'x-auth-token': token,
    },
  });
  return response.data;
};

export const getRandomMovie = async (language) => {
  const page = Math.floor(Math.random() * 500) + 1;
  const response = await tmdbApi.get(
    `/discover/movie?api_key=${TMDB_API_KEY}&language=${language}&page=${page}`
  );

  const movies = response.data.results;
  const randomMovie = movies[Math.floor(Math.random() * movies.length)];
  const movieId = randomMovie.id;

  // Получаем детальную информацию о фильме, включая жанры и актеров
  const movieDetailsResponse = await tmdbApi.get(
    `/movie/${movieId}?api_key=${TMDB_API_KEY}&language=${language}&append_to_response=credits`
  );

  const movieDetails = movieDetailsResponse.data;

  // Формируем объект для возврата, включая жанры и актеров
  return {
    _id: movieId,
    title: randomMovie.title,
    poster_path: randomMovie.poster_path,
    backdrop_path: randomMovie.backdrop_path,
    vote_average: randomMovie.vote_average,
    overview: randomMovie.overview,
    duration: movieDetails.runtime,
    original_title: randomMovie.original_title,
    genre_ids: movieDetails.genres.map((genre) => genre.id), // массив id жанров
    actors: movieDetails.credits.cast.map((actor) => ({
      id: actor.id, // добавляем id актера
      name: actor.name,
      profile_path: actor.profile_path,
    })),
    release_date: randomMovie.release_date, // добавляем дату выпуска фильма
  };
};

// Функция для получения имени жанра по его id
export const getGenreNameById = (genreId, genres) => {
  const genre = genres.find((genre) => genre.id === genreId);
  return genre ? genre.name : '';
};

export const fetchGenres = async () => {
  const response = await tmdbApi.get(
    `/genre/movie/list?api_key=${TMDB_API_KEY}`
  );
  return response.data.genres;
};

// export const getMovieTrailer = async (movieId, language) => {
//   const response = await fetch(
//     `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=&language=${language}`
//   );
//   const data = await response.json();
//   return data.results;
// };

export const getMovieTrailer = async (movieId, language) => {
  const response = await tmdbApi.get(`/movie/${movieId}/videos`, {
    params: {
      api_key: TMDB_API_KEY,
      language: language,
    },
  });
  return response.data.results;
};

export const getActorMovies = async (actorId) => {
  try {
    console.log(`Fetching movies for actor ID: ${actorId}`); // Добавляем логирование ID актера
    const response = await tmdbApi.get(`/person/${actorId}/movie_credits`, {
      params: {
        api_key: TMDB_API_KEY,
        language: 'ru-RU',
      },
    });

    return response.data.cast;
  } catch (error) {
    console.error('Error fetching actor movies:', error);
    throw error;
  }
};

export const getActorDetails = async (actorId) => {
  try {
    const response = await tmdbApi.get(`/person/${actorId}`, {
      params: {
        api_key: TMDB_API_KEY,
        language: 'ru-RU',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching actor details:', error);
    throw error;
  }
};
