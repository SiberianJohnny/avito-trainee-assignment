import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useGetGameDataQuery } from '../store/api/gamesApi';
import styles from './GamePage.module.scss';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Carousel } from 'react-carousel-minimal';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import ErrorComponent from '../components/ErrorPage/ErrorComponent';

function GamePage() {
  const location = useLocation();
  const {id} = useParams();
  const navigate = useNavigate();
  
  const {data: gameData, isFetching: isGameDataFetching, isError: gameDataError} = useGetGameDataQuery(location.state?.id ? location.state?.id : id);
  
  const goBack = () => {
    navigate('/')
  }
  
  const captionStyle = {
    fontSize: '2em',
    fontWeight: 'bold',
  }
  const slideNumberStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
  }
  
  if(gameDataError) {
    return <ErrorComponent />
  }
  
  return (
    <div className={styles.game_page} style={isGameDataFetching ? {padding: 0} : undefined}>
      {gameData && !isGameDataFetching
        ? <div className={styles.game_page__content}>
            <div className={styles.game_page__info_block}>
              <button className={styles.game_page__back_button} onClick={goBack}><ArrowBackIcon /></button>
              <div className={styles.game_page__info}>
                <h1 className={styles.game_page__title}>
                  {gameData?.title}
                </h1>
                <p className={styles.game_page__info_text}>Жанр: {gameData.genre}</p>
                <p className={styles.game_page__info_text}>Платформа: {gameData.platform}</p>
                <p className={styles.game_page__info_text}>Дата релиза: {gameData.release_date.replace(/^(\d{4})-(\d{2})-(\d{2})$/, '$3.$2.$1')}</p>
                <p className={styles.game_page__info_text}>Издатель: {gameData.publisher}</p>
                <p className={styles.game_page__info_text}>Разработчик: {gameData.developer}</p>
              </div>
              <img src={gameData.thumbnail}/>
            </div>
            <Carousel
              data={gameData.screenshots}
              time={3000}
              width="100%"
              height="500px"
              captionStyle={captionStyle}
              radius="10px"
              slideNumber={true}
              slideNumberStyle={slideNumberStyle}
              captionPosition="bottom"
              automatic={true}
              dots={true}
              pauseIconColor="white"
              pauseIconSize="40px"
              slideBackgroundColor="darkgrey"
              slideImageFit="cover"
              thumbnails={true}
              thumbnailWidth="100px"
              style={{
                margin: "40px auto",
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            
              }}
            />
            <p className={styles.game_page__description}>{gameData.description}</p>
            <h3 className={styles.game_page__requirements_title}>Минимальные системные требования: </h3>
            <ul className={styles.game_page__requirements_list}>
              <li className={styles.game_page__requirements_list_item}>
                <p className={styles.game_page__requirements_item_text}>
                  ОС: 
                </p>
                <p className={styles.game_page__requirements_item_text}>
                  {gameData.minimum_system_requirements?.os && gameData.minimum_system_requirements?.os !== '?' ? gameData.minimum_system_requirements?.os : 'Неизвестно'}
                </p>
              </li>
              <li className={styles.game_page__requirements_list_item}>
                <p className={styles.game_page__requirements_item_text}>
                  Процессор: 
                </p>
                <p className={styles.game_page__requirements_item_text}>
                  {gameData.minimum_system_requirements?.processor && gameData.minimum_system_requirements?.processor !== '?' ? gameData.minimum_system_requirements?.processor : 'Неизвестно'}
                </p>
              </li>
              <li className={styles.game_page__requirements_list_item}>
                <p className={styles.game_page__requirements_item_text}>
                  ГПУ: 
                </p>
                <p className={styles.game_page__requirements_item_text}>
                  {gameData.minimum_system_requirements?.graphics && gameData.minimum_system_requirements?.graphics !== '?' ? gameData.minimum_system_requirements?.graphics : 'Неизвестно'}
                </p>
              </li>
              <li className={styles.game_page__requirements_list_item}>
                <p className={styles.game_page__requirements_item_text}>
                  Оперативная память: 
                </p>
                <p className={styles.game_page__requirements_item_text}>
                  {gameData.minimum_system_requirements?.memory && gameData.minimum_system_requirements?.memory !== '?' ? gameData.minimum_system_requirements?.memory : 'Неизвестно'}
                </p>
              </li>
              <li className={styles.game_page__requirements_list_item}>
                <p className={styles.game_page__requirements_item_text}>
                  Место на диске: 
                </p>
                <p className={styles.game_page__requirements_item_text}>
                  {gameData.minimum_system_requirements?.storage && gameData.minimum_system_requirements?.storage !== '?' ? gameData.minimum_system_requirements?.storage : 'Неизвестно'}
                </p>
              </li>
            </ul>
          </div> 
        : <LoadingSpinner />}
    </div>
  )
}

export default GamePage;