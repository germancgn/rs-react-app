import HttpError from '../utils/HttpError';
import type { MovieResponse } from '../types/movies/MovieResponse';

// API key is provided for convenience only. Will be deactivated after the cross-check.
const API_KEY = '42f561b23ffd1830a30eaf91afadf039';
const BASE_URL = 'https://api.themoviedb.org/3';

export async function fetchPopularMovies(page = 1): Promise<MovieResponse> {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?page=${page}&api_key=${API_KEY}`
    );
    if (!response.ok) {
      throw new HttpError(
        response.status,
        `Error fetching movies: ${response.statusText}`
      );
    }
    return await response.json();
  } catch (error) {
    if (error instanceof HttpError) {
      console.error(
        `fetchPopularMovies - HTTP Error: ${error.status} - ${error.message}`
      );
    } else {
      console.error('fetchPopularMovies - Unexpected Error:', error);
    }
    throw error;
  }
}

export async function searchMovies(name: string): Promise<MovieResponse> {
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?query=${encodeURIComponent(name)}&api_key=${API_KEY}`
    );
    if (!response.ok) {
      throw new HttpError(
        response.status,
        `Error searching movies: ${response.statusText}`
      );
    }
    return await response.json();
  } catch (error) {
    if (error instanceof HttpError) {
      console.error(
        `searchMovies - HTTP Error: ${error.status} - ${error.message}`
      );
    } else {
      console.error('searchMovies - Unexpected Error:', error);
    }
    throw error;
  }
}

export async function discoverMovies(page = 1): Promise<MovieResponse> {
  try {
    const response = await fetch(
      `${BASE_URL}/discover/movie?page=${page}&api_key=${API_KEY}`
    );
    if (!response.ok) {
      throw new HttpError(
        response.status,
        `Error discovering movies: ${response.statusText}`
      );
    }
    return await response.json();
  } catch (error) {
    if (error instanceof HttpError) {
      console.error(
        `discoverMovies - HTTP Error: ${error.status} - ${error.message}`
      );
    } else {
      console.error('discoverMovies - Unexpected Error:', error);
    }
    throw error;
  }
}

export async function trendingMovies(): Promise<MovieResponse> {
  try {
    const response = await fetch(
      `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`
    );
    if (!response.ok) {
      throw new HttpError(
        response.status,
        `Error fetching trending movies: ${response.statusText}`
      );
    }
    return await response.json();
  } catch (error) {
    if (error instanceof HttpError) {
      console.error(
        `trendingMovies - HTTP Error: ${error.status} - ${error.message}`
      );
    } else {
      console.error('trendingMovies - Unexpected Error:', error);
    }
    throw error;
  }
}
