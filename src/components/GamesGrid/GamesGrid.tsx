/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Grid } from '@mui/material'
import GameCard from '../GameCard/GameCard'
import { useGetGamesQuery, useLazySortByGenreQuery, useLazySortByPlatformQuery, useLazySortQuery } from '../../store/api/gamesApi';
import styles from './GamesGrid.module.scss';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../utils/utils';
import { setAllGenres, setAllPlatforms } from '../../store/reducers/filtersSlice';
import { IGame } from '../../types/responses';
import ErrorComponent from '../ErrorPage/ErrorComponent';
import { useRef } from "react";
import {ViewportList} from "react-viewport-list";

const GamesGrid: React.FC = () => {
  const [dataToShow, setDataToShow] = useState<'genre' | 'platform' | 'sort' |undefined>()
  
  const {data: gamesData, isFetching: isGamesDataFetching, isSuccess: gamesDataLoaded, isError: gamesDataError} = useGetGamesQuery();
  const [sortByPlatform, {data: sortedByPlatformData, isFetching: isSortedByPlatformFetching, isError: sortedByPlatformError}] = useLazySortByPlatformQuery()
  const [sortByGenre, {data: sortedByGenreData, isFetching: isSortedByGenreFetching, isError: sortedByGenreError}] = useLazySortByGenreQuery()
  const [sort, {data: sortedData, isFetching: isSortedFetching, isError: sortedDataError}] = useLazySortQuery()
  
  const ref = useRef(null);
  
  const collectFilterValues = (key: keyof IGame): string[] => {
    const uniqueValues: Set<string> = new Set();
    
    gamesData?.forEach(item => {
      uniqueValues.add(item[key].trim());
    });
    
    return Array.from(uniqueValues);
  }
  
  const dispatch = useAppDispatch()
  const selectedGenre = useAppSelector(state => state.gamesFilters.genre)
  const selectedPlatform = useAppSelector(state => state.gamesFilters.platform)
  const selectedSort = useAppSelector(state => state.gamesFilters.sortBy)
  
  useEffect(() => {
    if(selectedGenre) {
      sortByGenre(selectedGenre)
      setDataToShow('genre')
    }
    if(selectedPlatform) {
      sortByPlatform(selectedPlatform)
      setDataToShow('platform')
    }
    if(selectedSort) {
      sort(selectedSort)
      setDataToShow('sort')
    }
  },[selectedGenre, selectedPlatform, selectedSort])
  
  useEffect(() =>{
    if(gamesDataLoaded) {
      const uniqueGenres = collectFilterValues( 'genre');
      const uniquePlatforms = collectFilterValues( 'platform');
      
      dispatch(setAllGenres(uniqueGenres))
      dispatch(setAllPlatforms(uniquePlatforms))
    }
  },[isGamesDataFetching])
  
  if(sortedByPlatformError || gamesDataError || sortedByGenreError || sortedDataError) {
    return <ErrorComponent />
  }
  
  if(gamesData && !isGamesDataFetching && !isSortedByPlatformFetching && !isSortedByGenreFetching && !isSortedFetching) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center'}}>
          <Grid ref={ref} className={styles.grid_container} container spacing={2} justifyContent="center">
            <ViewportList viewportRef={ref} items={gamesData}>
              {(game) => (
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <GameCard
                    id={game.id} 
                    title={game.title}
                    release_date={game.release_date}
                    genre={game.genre}
                    publisher={game.publisher}
                    developer={game.developer}
                    thumbnail={game.thumbnail}
                    />
                </Grid>
              )}
            </ViewportList>
            
            <ViewportList viewportRef={ref} items={sortedByGenreData}>
              {(game) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={game.id}>
                  <GameCard
                    id={game.id} 
                    title={game.title}
                    release_date={game.release_date}
                    genre={game.genre}
                    publisher={game.publisher}
                    developer={game.developer}
                    thumbnail={game.thumbnail}
                  />
                </Grid>
              )}
            </ViewportList>
            
            <ViewportList viewportRef={ref} items={sortedByPlatformData}>
              {(game) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={game.id}>
                  <GameCard
                    id={game.id} 
                    title={game.title}
                    release_date={game.release_date}
                    genre={game.genre}
                    publisher={game.publisher}
                    developer={game.developer}
                    thumbnail={game.thumbnail}
                  />
                </Grid>
              )}
            </ViewportList>
            
            <ViewportList viewportRef={ref} items={sortedData}>
              {(game) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={game.id}>
                  <GameCard
                    id={game.id} 
                    title={game.title}
                    release_date={game.release_date}
                    genre={game.genre}
                    publisher={game.publisher}
                    developer={game.developer}
                    thumbnail={game.thumbnail}
                  />
                </Grid>
              )}
            </ViewportList>
          </Grid>
      </Box>
    )
  }
  return (
    <div style={{width: '100%'}}> 
      <LoadingSpinner withHeader/>
    </div>
  )
}

export default GamesGrid