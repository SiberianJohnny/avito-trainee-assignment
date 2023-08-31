// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IGetGameData, IGetGames } from '../../types/responses'

// Define a service using a base URL and expected endpoints
export const gamesApi = createApi({
  reducerPath: 'gamesApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://free-to-play-games-database.p.rapidapi.com/api/',
    prepareHeaders:  headers => {
      headers.set('X-RapidAPI-Key', 'b609a9084emsh909d4f864125b06p1ab75bjsn5e66e815627f');
      headers.set('X-RapidAPI-Host', 'free-to-play-games-database.p.rapidapi.com');
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getGames: builder.query<IGetGames, void>({
      query: () => `games`,
    }),
    sortByPlatform: builder.query<IGetGames, string>({
      query: (platform) => `games?platform=${platform}`,
    }),
    sortByGenre: builder.query<IGetGames, string>({
      query: (category) => `games?category=${category}`,
    }),
    sort: builder.query<IGetGames, string>({
      query: (category) => `games?sort-by=${category}`,
    }),
    getGameData: builder.query<IGetGameData, number>({
      query: (id) => `game?id=${id}`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { 
  useGetGamesQuery, 
  useGetGameDataQuery, 
  useLazySortByPlatformQuery, 
  useLazySortByGenreQuery,
  useLazySortQuery
} = gamesApi