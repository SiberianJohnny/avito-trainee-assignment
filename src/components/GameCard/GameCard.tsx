import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { IGame } from '../../types/responses';
import { useNavigate } from 'react-router-dom';
import styles from './GameCard.module.scss';

interface Props extends Partial<IGame>{}

export default function GameCard({id, title, release_date, publisher, genre, thumbnail}:Props) {
  const navigate = useNavigate();
  
  const navigateToGamesPage = () => {
    navigate(`games/${id}`, {state: {id: id}})
  }
  return (
    <Card className={styles.card} sx={{
      backgroundColor: '#32383e', 
      WebkitBoxShadow: '0 .5rem 1rem rgba(0,0,0,.15)',
      boxShadow: '0 .5rem 1rem rgba(0,0,0,.15)',
      }}>
      <CardActionArea onClick={navigateToGamesPage}>
        <CardMedia
          component="img"
          image={thumbnail}
          alt={title}
        />
        <CardContent>
          <Typography className={styles.card_title} gutterBottom variant="h5" component="div" sx={{ 
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 1,
            }} >
            {title}
          </Typography>
          <Typography sx={{color: '#7a8288'}} variant="body2" color="text.secondary">
            Жанр: {genre}. Дата релиза: {release_date?.replace(/^(\d{4})-(\d{2})-(\d{2})$/, '$3.$2.$1')}.
          </Typography>
          <Typography sx={{color: '#7a8288'}} variant="body2" color="text.secondary">
            Издатель: {publisher}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}