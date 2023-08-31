import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../utils/utils';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { setGenre, setPlatform, setSorting } from '../../store/reducers/filtersSlice';

interface ISorting {
  name: string,
  value: 'alphabetical' | 'release-date' | 'popularity' | 'relevance' | '',
}

const SORTING: ISorting[] = [
  {name: 'Название', value: 'alphabetical'},
  {name: 'Дата релиза', value: 'release-date'},
  {name: 'Популярность', value: 'popularity'},
  {name: 'Актуальность', value: 'relevance'}
]

const BarComponent: React.FC = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<string>('');
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [selectedSort, setSelectedSort] = useState<ISorting["value"]>('');
  
  const allPlatforms = useAppSelector(state => state.gamesFilters.allPlatforms)
  const allGenres = useAppSelector(state => state.gamesFilters.allGenres)
  
  const dispatch = useAppDispatch()

  const handleChangePlatform = (event: SelectChangeEvent): void => {
    setSelectedPlatform(event.target.value)
    setSelectedGenre('')
    setSelectedSort('')
    dispatch(setPlatform(event.target.value.toLowerCase().split(" ")[0]))
  };
  const handleChangeGenre = (event: SelectChangeEvent): void => {
    setSelectedPlatform('')
    setSelectedGenre(event.target.value)
    setSelectedSort('')
    dispatch(setGenre(event.target.value.toLowerCase().replace(' ', '-')))
  };
  const handleChangeSorting = (event: SelectChangeEvent): void => {
    setSelectedPlatform('')
    setSelectedSort('')
    setSelectedSort(event.target.value as ISorting['value'])
    dispatch(setSorting(event.target.value as ISorting['value']))
  }
  
  const getPlatformValue = (value: string): string => {
    switch(value) {
      case 'PC (Windows)':
        return 'pc'
      case 'Web Browser':
        return 'browser'
      default:
        return 'all'
    }
  }
  
  return (
    <AppBar component="nav" sx={{backgroundColor: '#aaa'}}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, color: '#32383e', fontWeight: 'bold' }}
        >
          Avito Trainee Assignment
        </Typography>
        <Box sx={{ display: { xs: 'none', sm: 'block'} }}>
          {/* {navItems.map((item) => (
            <Button key={item} sx={{ color: '#32383e' }}>
              {item}
            </Button>
          ))} */}
          <FormControl sx={{ m: 1, minWidth: 150 }}>
            <InputLabel id="platform-select-label">Платформа</InputLabel>
            <Select
              labelId="platform-select-label"
              id="platform-select"
              value={selectedPlatform}
              onChange={handleChangePlatform}
              autoWidth
              label="Platform"
            >
              <MenuItem value="">
                <em>Не выбрано</em>
              </MenuItem>
              {allPlatforms.map(platform => <MenuItem value={getPlatformValue(platform)}>{platform}</MenuItem>)}
            </Select>
          </FormControl>
          
          <FormControl sx={{ m: 1, minWidth: 100 }}>
            <InputLabel id="genre-select-label">Жанр</InputLabel>
            <Select
              labelId="genre-select-label"
              id="genre-select"
              value={selectedGenre}
              onChange={handleChangeGenre}
              autoWidth
              label="Genre"
            >
              <MenuItem value="">
                <em>Не выбрано</em>
              </MenuItem>
              {allGenres.map(genre => <MenuItem value={genre}>{genre}</MenuItem>)}
            </Select>
          </FormControl>
          
          <FormControl sx={{ m: 1, minWidth: 150 }}>
            <InputLabel id="sort-label">Сортировка</InputLabel>
            <Select
              labelId="sort-label"
              id="sort"
              value={selectedSort}
              onChange={handleChangeSorting}
              autoWidth
              label="Sort"
            >
              <MenuItem value="">
                <em>Не выбрано</em>
              </MenuItem>
              {SORTING.map(sort => <MenuItem value={sort.value}>{sort.name}</MenuItem>)}
            </Select>
          </FormControl>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default BarComponent