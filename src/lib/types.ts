export interface JikanAPIResponse<T> {
  data: T;
  pagination?: {
    last_visible_page: number;
    has_next_page: boolean;
    current_page: number;
    items: {
      count: number;
      total: number;
      per_page: number;
    };
  };
}

export interface Anime {
  mal_id: number;
  url: string;
  images: {
    jpg: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
    webp: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
  };
  trailer: {
    youtube_id: string | null;
    url: string | null;
    embed_url: string | null;
  };
  title: string;
  title_english: string | null;
  title_japanese: string;
  type: string;
  source: string;
  episodes: number | null;
  status: string;
  airing: boolean;
  aired: {
    from: string;
    to: string | null;
    prop: {
      from: { day: number; month: number; year: number };
      to: { day: number | null; month: number | null; year: number | null };
    };
    string: string;
  };
  duration: string;
  rating: string;
  score: number | null;
  scored_by: number | null;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string | null;
  background: string | null;
  season: string | null;
  year: number | null;
  broadcast: {
    day: string | null;
    time: string | null;
    timezone: string | null;
    string: string | null;
  };
  producers: Genre[];
  licensors: Genre[];
  studios: Genre[];
  genres: Genre[];
  explicit_genres: Genre[];
  themes: Genre[];
  demographics: Genre[];
}

export interface Manga {
    mal_id: number;
    url: string;
    images: {
        jpg: {
            image_url: string;
            small_image_url: string;
            large_image_url: string;
        };
        webp: {
            image_url: string;
            small_image_url: string;
            large_image_url: string;
        };
    };
    title: string;
    title_english: string | null;
    title_japanese: string;
    type: string;
    chapters: number | null;
    volumes: number | null;
    status: string;
    publishing: boolean;
    published: {
        from: string;
        to: string | null;
        prop: {
            from: { day: number; month: number; year: number };
            to: { day: number | null; month: number | null; year: number | null };
        };
        string: string;
    };
    score: number | null;
    scored_by: number | null;
    rank: number;
    popularity: number;
    members: number;
    favorites: number;
    synopsis: string | null;
    background: string | null;
    authors: Genre[];
    serializations: Genre[];
    genres: Genre[];
    explicit_genres: Genre[];
    themes: Genre[];
    demographics: Genre[];
}

export interface Person {
  mal_id: number;
  url: string;
  website_url: string | null;
  images: {
    jpg: {
      image_url: string;
    };
  };
  name: string;
  given_name: string;
  family_name: string;
  alternate_names: string[];
  birthday: string;
  favorites: number;
  about: string | null;
  anime: {
    position: string;
    anime: Anime;
  }[];
  manga: {
    position: string;
    manga: Manga;
  }[];
  voices: {
    role: string;
    anime: Anime;
    character: Character;
  }[];
}


export interface Genre {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface AnimeRecommendation {
  entry: {
    mal_id: number;
    url: string;
    images: {
      jpg: {
        image_url: string;
        small_image_url: string;
        large_image_url: string;
      };
      webp: {
        image_url: string;
        small_image_url: string;
        large_image_url: string;
      };
    };
    title: string;
  };
  url: string;
  votes: number;
}

export interface Character {
  mal_id: number;
  url: string;
  images: {
    jpg: {
      image_url: string;
    };
    webp: {
      image_url: string;
      small_image_url: string;
    };
  };
  name: string;
  name_kanji: string;
  nicknames: string[];
  favorites: number;
  about: string | null;
  anime?: {
    role: string;
    anime: Anime;
  }[];
  manga?: {
    role: string;
    manga: Manga;
  }[];
  voices?: VoiceActor[];
}

export interface CharacterAnime {
  role: string;
  anime: Anime;
}

export interface CharacterManga {
  role: string;
  manga: Manga;
}

export interface VoiceActor {
    language: string;
    person: {
        mal_id: number;
        url: string;
        images: {
            jpg: {
                image_url: string;
            }
        },
        name: string;
    }
}

export interface AnimeCharacter {
  character: {
    mal_id: number;
    url: string;
    images: {
      jpg: {
        image_url: string;
      };
      webp: {
        image_url: string;
        small_image_url: string;
      };
    };
    name: string;
  };
  role: string;
  favorites: number;
  voice_actors: {
    person: {
      mal_id: number;
      url: string;
      images: {
        jpg: {
          image_url: string;
        };
      };
      name: string;
    };
    language: string;
  }[];
}

export interface Season {
  year: number;
  seasons: string[];
}

export interface News {
  mal_id: number;
  url: string;
  title: string;
  date: string;
  author_username: string;
  author_url: string;
  forum_url: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
  comments: number;
  excerpt: string;
}

export interface AnimeStatistics {
  watching: number;
  completed: number;
  on_hold: number;
  dropped: number;
  plan_to_watch: number;
  total: number;
  scores: {
    score: number;
    votes: number;
    percentage: number;
  }[];
}

export interface StaffMember {
  person: {
    mal_id: number;
    url: string;
    images: {
      jpg: {
        image_url: string;
      };
    };
    name: string;
  };
  positions: string[];
}

export interface RelationEntry {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface AnimeRelation {
  relation: string;
  entry: RelationEntry[];
}

export interface AnimeTheme {
  openings: string[];
  endings: string[];
}

export interface AnimeEpisode {
    mal_id: number;
    url: string;
    title: string;
    title_japanese: string;
    title_romanji: string;
    aired: string;
    score: number | null;
    filler: boolean;
    recap: boolean;
    forum_url: string;
    synopsis?: string;
}

export interface ForumTopic {
  mal_id: number;
  url: string;
  title: string;
  date: string;
  author_username: string;
  author_url: string;
  comments: number;
  last_comment: {
    url: string;
    author_username: string;
    author_url: string;
    date: string;
  };
}

export interface PromoVideo {
    title: string;
    trailer: {
      youtube_id: string;
      url: string;
      embed_url: string;
      images: {
        image_url: string;
        small_image_url: string;
        medium_image_url: string;
        large_image_url: string;
        maximum_image_url: string;
      }
    }
}

export interface VideoEpisode {
    mal_id: number;
    url: string;
    title: string;
    episode: string;
    images: {
        jpg: {
            image_url: string;
        }
    }
}

export interface AnimeVideo {
    promo: PromoVideo[];
    episodes: VideoEpisode[];
}

export interface ExternalLink {
  name: string;
  url: string;
}

export interface Picture {
    jpg: {
        image_url: string;
        small_image_url: string;
        large_image_url: string;
    };
    webp: {
        image_url: string;
        small_image_url: string;
        large_image_url: string;
    };
}
