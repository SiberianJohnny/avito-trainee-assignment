export type IGetGames = IGame[]

export interface IGame {
  id: number
  title: string
  thumbnail: string
  short_description: string
  game_url: string
  genre: string
  platform: string
  publisher: string
  developer: string
  release_date: string
  freetogame_profile_url: string
}

export interface IGetGameData {
  id: number
  title: string
  thumbnail: string
  status: string
  short_description: string
  description: string
  game_url: string
  genre: string
  platform: string
  publisher: string
  developer: string
  release_date: string
  freetogame_profile_url: string
  minimum_system_requirements: IMinimumSystemRequirements
  screenshots: IScreenshot[]
}

export interface IMinimumSystemRequirements {
  os: string
  processor: string
  memory: string
  graphics: string
  storage: string
}

export interface IScreenshot {
  id: number
  image: string
}

