import type { JikanAPIResponse, Anime, Manga, Character, Person, Genre, Season, News, AnimeStatistics, StaffMember, AnimeRelation, AnimeTheme, AnimeEpisode, ForumTopic, AnimeVideo, ExternalLink, Picture, AnimeReview, MangaStatistics, MangaRecommendation, MangaRelation, CharacterAnime, CharacterManga, VoiceActor, PersonManga, Club, ClubMember } from '@/lib/types';

const API_BASE_URL = 'https://api.jikan.moe/v4';

async function fetchJikanAPI<T>(endpoint: string): Promise<T | null> {
    try {
        await new Promise(resolve => setTimeout(resolve, 350)); // Rate limiting
        const res = await fetch(`${API_BASE_URL}/${endpoint}`);
        if (!res.ok) {
            if (res.status === 404) return null;
            console.error(`Failed to fetch ${endpoint}:`, res.status, await res.text());
            return null;
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
        return null;
    }
}

// Anime
export const getAnimeSearch = async (query: string): Promise<JikanAPIResponse<Anime[]> | null> => fetchJikanAPI(`anime?q=${encodeURIComponent(query)}&sfw`);
export const getAnimeById = async (id: string): Promise<JikanAPIResponse<Anime> | null> => fetchJikanAPI(`anime/${id}/full`);
export const getAnimeCharacters = async (id: string): Promise<JikanAPIResponse<{ character: Character; role: string }[]> | null> => fetchJikanAPI(`anime/${id}/characters`);
export const getAnimeStaff = async (id: string): Promise<JikanAPIResponse<StaffMember[]> | null> => fetchJikanAPI(`anime/${id}/staff`);
export const getAnimeEpisodes = async (id: string, page: number = 1): Promise<JikanAPIResponse<AnimeEpisode[]> | null> => fetchJikanAPI(`anime/${id}/episodes?page=${page}`);
export const getAnimeEpisodeDetails = async (id: string, episode: string): Promise<JikanAPIResponse<AnimeEpisode> | null> => fetchJikanAPI(`anime/${id}/episodes/${episode}`);
export const getAnimeVideos = async (id: string): Promise<JikanAPIResponse<AnimeVideo> | null> => fetchJikanAPI(`anime/${id}/videos`);
export const getAnimeVideoEpisodes = async (id: string, page: number = 1): Promise<JikanAPIResponse<any[]> | null> => fetchJikanAPI(`anime/${id}/videos/episodes?page=${page}`);
export const getAnimePictures = async (id: string): Promise<JikanAPIResponse<Picture[]> | null> => fetchJikanAPI(`anime/${id}/pictures`);
export const getAnimeStatistics = async (id: string): Promise<JikanAPIResponse<AnimeStatistics> | null> => fetchJikanAPI(`anime/${id}/statistics`);
export const getAnimeRecommendations = async (id: string): Promise<JikanAPIResponse<any[]> | null> => fetchJikanAPI(`anime/${id}/recommendations`);
export const getAnimeReviews = async (id: string, page: number = 1): Promise<JikanAPIResponse<AnimeReview[]> | null> => fetchJikanAPI(`anime/${id}/reviews?page=${page}&preliminary=true&spoilers=true`);
export const getAnimeRelations = async (id: string): Promise<JikanAPIResponse<AnimeRelation[]> | null> => fetchJikanAPI(`anime/${id}/relations`);
export const getAnimeThemes = async (id: string): Promise<JikanAPIResponse<AnimeTheme> | null> => fetchJikanAPI(`anime/${id}/themes`);
export const getAnimeExternal = async (id: string): Promise<JikanAPIResponse<ExternalLink[]> | null> => fetchJikanAPI(`anime/${id}/external`);
export const getAnimeStreaming = async (id: string): Promise<JikanAPIResponse<ExternalLink[]> | null> => fetchJikanAPI(`anime/${id}/streaming`);
export const getAnimeNews = async (id: string, page: number = 1): Promise<JikanAPIResponse<News[]> | null> => fetchJikanAPI(`anime/${id}/news?page=${page}`);
export const getAnimeForum = async (id: string): Promise<JikanAPIResponse<ForumTopic[]> | null> => fetchJikanAPI(`anime/${id}/forum`);


// Manga
export const getMangaSearch = async (query: string): Promise<JikanAPIResponse<Manga[]> | null> => fetchJikanAPI(`manga?q=${encodeURIComponent(query)}&sfw`);
export const getMangaById = async (id: string): Promise<JikanAPIResponse<Manga> | null> => fetchJikanAPI(`manga/${id}/full`);
export const getMangaCharacters = async (id: string): Promise<JikanAPIResponse<any[]> | null> => fetchJikanAPI(`manga/${id}/characters`);
export const getMangaPictures = async (id: string): Promise<JikanAPIResponse<Picture[]> | null> => fetchJikanAPI(`manga/${id}/pictures`);
export const getMangaStatistics = async (id: string): Promise<JikanAPIResponse<MangaStatistics> | null> => fetchJikanAPI(`manga/${id}/statistics`);
export const getMangaRecommendations = async (id: string): Promise<JikanAPIResponse<MangaRecommendation[]> | null> => fetchJikanAPI(`manga/${id}/recommendations`);
export const getMangaNews = async (id: string, page: number = 1): Promise<JikanAPIResponse<News[]> | null> => fetchJikanAPI(`manga/${id}/news?page=${page}`);
export const getMangaForum = async (id: string): Promise<JikanAPIResponse<ForumTopic[]> | null> => fetchJikanAPI(`manga/${id}/forum`);
export const getMangaReviews = async (id: string, page: number = 1): Promise<JikanAPIResponse<AnimeReview[]> | null> => fetchJikanAPI(`manga/${id}/reviews?page=${page}&preliminary=true&spoilers=true`);
export const getMangaRelations = async (id: string): Promise<JikanAPIResponse<MangaRelation[]> | null> => fetchJikanAPI(`manga/${id}/relations`);
export const getMangaExternal = async (id: string): Promise<JikanAPIResponse<ExternalLink[]> | null> => fetchJikanAPI(`manga/${id}/external`);


// Characters
export const getCharactersSearch = async (query: string): Promise<JikanAPIResponse<Character[]> | null> => fetchJikanAPI(`characters?q=${encodeURIComponent(query)}`);
export const getCharacterById = async (id: string): Promise<JikanAPIResponse<Character> | null> => fetchJikanAPI(`characters/${id}/full`);
export const getCharacterAnime = async (id: string): Promise<JikanAPIResponse<CharacterAnime[]> | null> => fetchJikanAPI(`characters/${id}/anime`);
export const getCharacterManga = async (id: string): Promise<JikanAPIResponse<CharacterManga[]> | null> => fetchJikanAPI(`characters/${id}/manga`);
export const getCharacterVoices = async (id: string): Promise<JikanAPIResponse<VoiceActor[]> | null> => fetchJikanAPI(`characters/${id}/voices`);
export const getCharacterPictures = async (id: string): Promise<JikanAPIResponse<Picture[]> | null> => fetchJikanAPI(`characters/${id}/pictures`);


// People
export const getPeopleSearch = async (query: string): Promise<JikanAPIResponse<Person[]> | null> => fetchJikanAPI(`people?q=${encodeURIComponent(query)}`);
export const getPersonById = async (id: string): Promise<JikanAPIResponse<Person> | null> => fetchJikanAPI(`people/${id}/full`);
export const getPersonAnime = async (id: string): Promise<JikanAPIResponse<any[]> | null> => fetchJikanAPI(`people/${id}/anime`);
export const getPersonManga = async (id: string): Promise<JikanAPIResponse<PersonManga[]> | null> => fetchJikanAPI(`people/${id}/manga`);
export const getPersonVoices = async (id: string): Promise<JikanAPIResponse<any[]> | null> => fetchJikanAPI(`people/${id}/voices`);
export const getPersonPictures = async (id: string): Promise<JikanAPIResponse<Picture[]> | null> => fetchJikanAPI(`people/${id}/pictures`);


// Users
export const getUserByName = async (username: string): Promise<JikanAPIResponse<any> | null> => fetchJikanAPI(`users/${username}`);
export const getUserStatistics = async (username: string): Promise<JikanAPIResponse<any> | null> => fetchJikanAPI(`users/${username}/statistics`);
export const getUserFavorites = async (username: string): Promise<JikanAPIResponse<any> | null> => fetchJikanAPI(`users/${username}/favorites`);
export const getUserFriends = async (username: string): Promise<JikanAPIResponse<any[]> | null> => fetchJikanAPI(`users/${username}/friends`);

// Seasons
export const getSeasonsList = async (): Promise<JikanAPIResponse<Season[]> | null> => fetchJikanAPI('seasons');
export const getSeasonNow = async (): Promise<JikanAPIResponse<Anime[]> | null> => fetchJikanAPI('seasons/now');
export const getSeasonUpcoming = async (): Promise<JikanAPIResponse<Anime[]> | null> => fetchJikanAPI('seasons/upcoming');
export const getSeason = async (year: string, season: string): Promise<JikanAPIResponse<Anime[]> | null> => fetchJikanAPI(`seasons/${year}/${season}`);


// Top
export const getTopAnime = async (filter: string = 'bypopularity'): Promise<JikanAPIResponse<Anime[]> | null> => fetchJikanAPI(`top/anime?filter=${filter}`);
export const getTopManga = async (filter: string = 'bypopularity'): Promise<JikanAPIResponse<Manga[]> | null> => fetchJikanAPI(`top/manga?filter=${filter}`);
export const getTopCharacters = async (): Promise<JikanAPIResponse<Character[]> | null> => fetchJikanAPI('top/characters');
export const getTopPeople = async (): Promise<JikanAPIResponse<Person[]> | null> => fetchJikanAPI('top/people');
export const getTopClubs = async (): Promise<JikanAPIResponse<Club[]> | null> => fetchJikanAPI('top/clubs');


// Recommendations
export const getRecentAnimeRecommendations = async (): Promise<JikanAPIResponse<any[]> | null> => fetchJikanAPI('recommendations/anime');
export const getRecentMangaRecommendations = async (): Promise<JikanAPIResponse<any[]> | null> => fetchJikanAPI('recommendations/manga');


// Random
export const getRandomAnime = async (): Promise<JikanAPIResponse<Anime> | null> => fetchJikanAPI('random/anime');
export const getRandomManga = async (): Promise<JikanAPIResponse<Manga> | null> => fetchJikanAPI('random/manga');
export const getRandomCharacter = async (): Promise<JikanAPIResponse<Character> | null> => fetchJikanAPI('random/characters');
export const getRandomPerson = async (): Promise<JikanAPIResponse<Person> | null> => fetchJikanAPI('random/people');


// Reviews
export const getRecentAnimeReviews = async (): Promise<JikanAPIResponse<AnimeReview[]> | null> => fetchJikanAPI('reviews/anime');
export const getRecentMangaReviews = async (): Promise<JikanAPIResponse<any[]> | null> => fetchJikanAPI('reviews/manga');


// Genres
export const getAnimeGenres = async (): Promise<JikanAPIResponse<Genre[]> | null> => fetchJikanAPI('genres/anime');
export const getMangaGenres = async (): Promise<JikanAPIResponse<Genre[]> | null> => fetchJikanAPI('genres/manga');

// Clubs
export const getClubById = async (id: string): Promise<JikanAPIResponse<Club> | null> => fetchJikanAPI(`clubs/${id}`);
export const getClubMembers = async (id: string, page: number = 1): Promise<JikanAPIResponse<ClubMember[]> | null> => fetchJikanAPI(`clubs/${id}/members?page=${page}`);

// Other
export const getMagazines = async (): Promise<JikanAPIResponse<any[]> | null> => fetchJikanAPI('magazines');
export const getProducers = async (): Promise<JikanAPIResponse<any[]> | null> => fetchJikanAPI('producers');
export const getWatchRecentPromos = async (): Promise<JikanAPIResponse<any[]> | null> => fetchJikanAPI('watch/promos');
export const getWatchRecentEpisodes = async (): Promise<JikanAPIResponse<any[]> | null> => fetchJikanAPI('watch/episodes');
