export const APIBASE = {
    "/anime/{id}/full": {
        "get": {
            "tags": [
                "anime"
            ],
            "operationId": "getAnimeFullById",
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "integer"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns complete anime resource data",
                    "content": {
                        "application/json": {
                            "schema": {
                                "properties": {
                                    "data": {
                                        "$ref": "#/components/schemas/anime_full"
                                    }
                                },
                                "type": "object"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/anime/{id}": {
        "get": {
            "tags": [
                "anime"
            ],
            "operationId": "getAnimeById",
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "integer"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns anime resource",
                    "content": {
                        "application/json": {
                            "schema": {
                                "properties": {
                                    "data": {
                                        "$ref": "#/components/schemas/anime"
                                    }
                                },
                                "type": "object"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/anime/{id}/characters": {
        "get": {
            "tags": [
                "anime"
            ],
            "operationId": "getAnimeCharacters",
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "integer"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns anime characters resource",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/anime_characters"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/anime/{id}/staff": {
        "get": {
            "tags": [
                "anime"
            ],
            "operationId": "getAnimeStaff",
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "integer"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns anime staff resource",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/anime_staff"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/anime/{id}/episodes": {
        "get": {
            "tags": [
                "anime"
            ],
            "operationId": "getAnimeEpisodes",
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "integer"
                    }
                },
                {
                    "$ref": "#/components/parameters/page"
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns a list of anime episodes",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/anime_episodes"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/anime/{id}/episodes/{episode}": {
        "get": {
            "tags": [
                "anime"
            ],
            "operationId": "getAnimeEpisodeById",
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "integer"
                    }
                },
                {
                    "name": "episode",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "integer"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns a single anime episode resource",
                    "content": {
                        "application/json": {
                            "schema": {
                                "properties": {
                                    "data": {
                                        "$ref": "#/components/schemas/anime_episode"
                                    }
                                },
                                "type": "object"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/anime/{id}/news": {
        "get": {
            "tags": [
                "anime"
            ],
            "operationId": "getAnimeNews",
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "integer"
                    }
                },
                {
                    "$ref": "#/components/parameters/page"
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns a list of news articles related to the entry",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/anime_news"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/anime/{id}/forum": {
        "get": {
            "tags": [
                "anime"
            ],
            "operationId": "getAnimeForum",
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "integer"
                    }
                },
                {
                    "name": "filter",
                    "in": "query",
                    "description": "Filter topics",
                    "required": false,
                    "schema": {
                        "type": "string",
                        "enum": [
                            "all",
                            "episode",
                            "other"
                        ]
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns a list of forum topics related to the entry",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/forum"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/anime/{id}/videos": {
        "get": {
            "tags": [
                "anime"
            ],
            "operationId": "getAnimeVideos",
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "integer"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns videos related to the entry",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/anime_videos"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/anime/{id}/videos/episodes": {
        "get": {
            "tags": [
                "anime"
            ],
            "operationId": "getAnimeVideosEpisodes",
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "integer"
                    }
                },
                {
                    "$ref": "#/components/parameters/page"
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns episode videos related to the entry",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/anime_videos_episodes"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/anime/{id}/pictures": {
        "get": {
            "tags": [
                "anime"
            ],
            "operationId": "getAnimePictures",
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "integer"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns pictures related to the entry",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/pictures_variants"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/anime/{id}/statistics": {
        "get": {
            "tags": [
                "anime"
            ],
            "operationId": "getAnimeStatistics",
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "integer"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns anime statistics",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/anime_statistics"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/anime/{id}/moreinfo": {
        "get": {
            "tags": [
                "anime"
            ],
            "operationId": "getAnimeMoreInfo",
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "integer"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns anime statistics",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/moreinfo"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/anime/{id}/recommendations": {
        "get": {
            "tags": [
                "anime"
            ],
            "operationId": "getAnimeRecommendations",
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "integer"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns anime recommendations",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/entry_recommendations"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/anime/{id}/userupdates": {
        "get": {
            "tags": [
                "anime"
            ],
            "operationId": "getAnimeUserUpdates",
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "integer"
                    }
                },
                {
                    "$ref": "#/components/parameters/page"
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns a list of users who have added/updated/removed the entry on their list",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/anime_userupdates"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/anime/{id}/reviews": {
        "get": {
            "tags": [
                "anime"
            ],
            "operationId": "getAnimeReviews",
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "integer"
                    }
                },
                {
                    "$ref": "#/components/parameters/page"
                },
                {
                    "$ref": "#/components/parameters/preliminary"
                },
                {
                    "$ref": "#/components/parameters/spoilers"
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns anime reviews",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/anime_reviews"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/anime/{id}/relations": {
        "get": {
            "tags": [
                "anime"
            ],
            "operationId": "getAnimeRelations",
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "integer"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns anime relations",
                    "content": {
                        "application/json": {
                            "schema": {
                                "properties": {
                                    "data": {
                                        "type": "array",
                                        "items": {
                                            "$ref": "#/components/schemas/relation"
                                        }
                                    }
                                },
                                "type": "object"
                            }
                        }
                    }
                }
            }
        }
    },
    "/anime/{id}/themes": {
        "get": {
            "tags": [
                "anime"
            ],
            "operationId": "getAnimeThemes",
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "integer"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns anime themes",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/anime_themes"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/anime/{id}/external": {
        "get": {
            "tags": [
                "anime"
            ],
            "operationId": "getAnimeExternal",
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "integer"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns anime external links",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/external_links"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/anime/{id}/streaming": {
        "get": {
            "tags": [
                "anime"
            ],
            "operationId": "getAnimeStreaming",
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "integer"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns anime streaming links",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/external_links"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/characters/{id}/full": {
        "get": {
            "tags": [
                "characters"
            ],
            "operationId": "getCharacterFullById",
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "integer"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns complete character resource data",
                    "content": {
                        "application/json": {
                            "schema": {
                                "properties": {
                                    "data": {
                                        "$ref": "#/components/schemas/character_full"
                                    }
                                },
                                "type": "object"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/characters/{id}": {
        "get": {
            "tags": [
                "characters"
            ],
            "operationId": "getCharacterById",
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "integer"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns character resource",
                    "content": {
                        "application/json": {
                            "schema": {
                                "properties": {
                                    "data": {
                                        "$ref": "#/components/schemas/character"
                                    }
                                },
                                "type": "object"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/characters/{id}/anime": {
        "get": {
            "tags": [
                "characters"
            ],
            "operationId": "getCharacterAnime",
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "integer"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns anime that character is in",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/character_anime"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/characters/{id}/manga": {
        "get": {
            "tags": [
                "characters"
            ],
            "operationId": "getCharacterManga",
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "integer"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns manga that character is in",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/character_manga"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/characters/{id}/voices": {
        "get": {
            "tags": [
                "characters"
            ],
            "operationId": "getCharacterVoiceActors",
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "integer"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns the character's voice actors",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/character_voice_actors"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/characters/{id}/pictures": {
        "get": {
            "tags": [
                "characters"
            ],
            "operationId": "getCharacterPictures",
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "integer"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns pictures related to the entry",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/character_pictures"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/clubs/{id}": {
        "get": {
            "tags": [
                "clubs"
            ],
            "operationId": "getClubsById",
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "integer"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns Club Resource",
                    "content": {
                        "application/json": {
                            "schema": {
                                "properties": {
                                    "data": {
                                        "$ref": "#/components/schemas/club"
                                    }
                                },
                                "type": "object"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/clubs/{id}/members": {
        "get": {
            "tags": [
                "clubs"
            ],
            "operationId": "getClubMembers",
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "integer"
                    }
                },
                {
                    "$ref": "#/components/parameters/page"
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns Club Members Resource",
                    "content": {
                        "application/json": {
                            "schema": {
                                "allOf": [
                                    {
                                        "$ref": "#/components/schemas/pagination"
                                    },
                                    {
                                        "$ref": "#/components/schemas/club_member"
                                    }
                                ]
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/clubs/{id}/staff": {
        "get": {
            "tags": [
                "clubs"
            ],
            "operationId": "getClubStaff",
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "integer"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns Club Staff",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/club_staff"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/clubs/{id}/relations": {
        "get": {
            "tags": [
                "clubs"
            ],
            "operationId": "getClubRelations",
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "integer"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns Club Relations",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/club_relations"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/genres/anime": {
        "get": {
            "tags": [
                "genres"
            ],
            "operationId": "getAnimeGenres",
            "parameters": [
                {
                    "name": "filter",
                    "in": "query",
                    "schema": {
                        "$ref": "#/components/schemas/genre_query_filter"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns entry genres, explicit_genres, themes and demographics",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/genres"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/genres/manga": {
        "get": {
            "tags": [
                "genres"
            ],
            "operationId": "getMangaGenres",
            "parameters": [
                {
                    "name": "filter",
                    "in": "query",
                    "schema": {
                        "$ref": "#/components/schemas/genre_query_filter"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns entry genres, explicit_genres, themes and demographics",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/genres"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/magazines": {
        "get": {
            "tags": [
                "magazines"
            ],
            "operationId": "getMagazines",
            "parameters": [
                {
                    "$ref": "#/components/parameters/page"
                },
                {
                    "$ref": "#/components/parameters/limit"
                },
                {
                    "name": "q",
                    "in": "query",
                    "schema": {
                        "type": "string"
                    }
                },
                {
                    "name": "order_by",
                    "in": "query",
                    "schema": {
                        "$ref": "#/components/schemas/magazines_query_orderby"
                    }
                },
                {
                    "name": "sort",
                    "in": "query",
                    "schema": {
                        "$ref": "#/components/schemas/search_query_sort"
                    }
                },
                {
                    "name": "letter",
                    "in": "query",
                    "description": "Return entries starting with the given letter",
                    "schema": {
                        "type": "string"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns magazines collection",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/magazines"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/manga/{id}/full": {
        "get": {
            "tags": [
                "manga"
            ],
            "operationId": "getMangaFullById",
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "integer"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns complete manga resource data",
                    "content": {
                        "application/json": {
                            "schema": {
                                "properties": {
                                    "data": {
                                        "$ref": "#/components/schemas/manga_full"
                                    }
                                },
                                "type": "object"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/manga/{id}": {
        "get": {
            "tags": [
                "manga"
            ],
            "operationId": "getMangaById",
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "integer"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns pictures related to the entry",
                    "content": {
                        "application/json": {
                            "schema": {
                                "properties": {
                                    "data": {
                                        "$ref": "#/components/schemas/manga"
                                    }
                                },
                                "type": "object"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/manga/{id}/characters": {
        "get": {
            "tags": [
                "manga"
            ],
            "operationId": "getMangaCharacters",
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "integer"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns manga characters resource",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/manga_characters"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/manga/{id}/news": {
        "get": {
            "tags": [
                "manga"
            ],
            "operationId": "getMangaNews",
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "integer"
                    }
                },
                {
                    "$ref": "#/components/parameters/page"
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns a list of manga news topics",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/manga_news"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/manga/{id}/forum": {
        "get": {
            "tags": [
                "manga"
            ],
            "operationId": "getMangaTopics",
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "integer"
                    }
                },
                {
                    "name": "filter",
                    "in": "query",
                    "description": "Filter topics",
                    "required": false,
                    "schema": {
                        "type": "string",
                        "enum": [
                            "all",
                            "episode",
                            "other"
                        ]
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns a list of manga forum topics",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/forum"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/manga/{id}/pictures": {
        "get": {
            "tags": [
                "manga"
            ],
            "operationId": "getMangaPictures",
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "integer"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns a list of manga pictures",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/manga_pictures"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/manga/{id}/statistics": {
        "get": {
            "tags": [
                "manga"
            ],
            "operationId": "getMangaStatistics",
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "integer"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns anime statistics",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/manga_statistics"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/manga/{id}/moreinfo": {
        "get": {
            "tags": [
                "manga"
            ],
            "operationId": "getMangaMoreInfo",
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "integer"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns manga moreinfo",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/moreinfo"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/manga/{id}/recommendations": {
        "get": {
            "tags": [
                "manga"
            ],
            "operationId": "getMangaRecommendations",
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "integer"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns manga recommendations",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/entry_recommendations"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/manga/{id}/userupdates": {
        "get": {
            "tags": [
                "manga"
            ],
            "operationId": "getMangaUserUpdates",
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "integer"
                    }
                },
                {
                    "$ref": "#/components/parameters/page"
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns manga user updates",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/manga_userupdates"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/manga/{id}/reviews": {
        "get": {
            "tags": [
                "manga"
            ],
            "operationId": "getMangaReviews",
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "integer"
                    }
                },
                {
                    "$ref": "#/components/parameters/page"
                },
                {
                    "$ref": "#/components/parameters/preliminary"
                },
                {
                    "$ref": "#/components/parameters/spoilers"
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns manga reviews",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/manga_reviews"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/manga/{id}/relations": {
        "get": {
            "tags": [
                "manga"
            ],
            "operationId": "getMangaRelations",
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "integer"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns manga relations",
                    "content": {
                        "application/json": {
                            "schema": {
                                "properties": {
                                    "data": {
                                        "type": "array",
                                        "items": {
                                            "$ref": "#/components/schemas/relation"
                                        }
                                    }
                                },
                                "type": "object"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/manga/{id}/external": {
        "get": {
            "tags": [
                "manga"
            ],
            "operationId": "getMangaExternal",
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "integer"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns manga external links",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/external_links"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/people/{id}/full": {
        "get": {
            "tags": [
                "people"
            ],
            "operationId": "getPersonFullById",
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "integer"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns complete character resource data",
                    "content": {
                        "application/json": {
                            "schema": {
                                "properties": {
                                    "data": {
                                        "$ref": "#/components/schemas/person_full"
                                    }
                                },
                                "type": "object"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/people/{id}": {
        "get": {
            "tags": [
                "people"
            ],
            "operationId": "getPersonById",
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "integer"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns pictures related to the entry",
                    "content": {
                        "application/json": {
                            "schema": {
                                "properties": {
                                    "data": {
                                        "$ref": "#/components/schemas/person"
                                    }
                                },
                                "type": "object"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/people/{id}/anime": {
        "get": {
            "tags": [
                "people"
            ],
            "operationId": "getPersonAnime",
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "integer"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns person's anime staff positions",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/person_anime"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/people/{id}/voices": {
        "get": {
            "tags": [
                "people"
            ],
            "operationId": "getPersonVoices",
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "integer"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns person's voice acting roles",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/person_voice_acting_roles"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/people/{id}/manga": {
        "get": {
            "tags": [
                "people"
            ],
            "operationId": "getPersonManga",
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "integer"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns person's published manga works",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/person_manga"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/people/{id}/pictures": {
        "get": {
            "tags": [
                "people"
            ],
            "operationId": "getPersonPictures",
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "integer"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns a list of pictures of the person",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/person_pictures"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/producers/{id}": {
        "get": {
            "tags": [
                "producers"
            ],
            "operationId": "getProducerById",
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "integer"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns producer resource",
                    "content": {
                        "application/json": {
                            "schema": {
                                "properties": {
                                    "data": {
                                        "$ref": "#/components/schemas/producer"
                                    }
                                },
                                "type": "object"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/producers/{id}/full": {
        "get": {
            "tags": [
                "producers"
            ],
            "operationId": "getProducerFullById",
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "integer"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns producer resource",
                    "content": {
                        "application/json": {
                            "schema": {
                                "properties": {
                                    "data": {
                                        "$ref": "#/components/schemas/producer_full"
                                    }
                                },
                                "type": "object"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/producers/{id}/external": {
        "get": {
            "tags": [
                "producers"
            ],
            "operationId": "getProducerExternal",
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "integer"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns producer's external links",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/external_links"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/random/anime": {
        "get": {
            "tags": [
                "random"
            ],
            "operationId": "getRandomAnime",
            "responses": {
                "200": {
                    "description": "Returns a random anime resource",
                    "content": {
                        "application/json": {
                            "schema": {
                                "properties": {
                                    "data": {
                                        "$ref": "#/components/schemas/anime"
                                    }
                                },
                                "type": "object"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/random/manga": {
        "get": {
            "tags": [
                "random"
            ],
            "operationId": "getRandomManga",
            "responses": {
                "200": {
                    "description": "Returns a random manga resource",
                    "content": {
                        "application/json": {
                            "schema": {
                                "properties": {
                                    "data": {
                                        "$ref": "#/components/schemas/manga"
                                    }
                                },
                                "type": "object"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/random/characters": {
        "get": {
            "tags": [
                "random"
            ],
            "operationId": "getRandomCharacters",
            "responses": {
                "200": {
                    "description": "Returns a random character resource",
                    "content": {
                        "application/json": {
                            "schema": {
                                "properties": {
                                    "data": {
                                        "$ref": "#/components/schemas/character"
                                    }
                                },
                                "type": "object"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/random/people": {
        "get": {
            "tags": [
                "random"
            ],
            "operationId": "getRandomPeople",
            "responses": {
                "200": {
                    "description": "Returns a random person resource",
                    "content": {
                        "application/json": {
                            "schema": {
                                "properties": {
                                    "data": {
                                        "$ref": "#/components/schemas/person"
                                    }
                                },
                                "type": "object"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/random/users": {
        "get": {
            "tags": [
                "random"
            ],
            "operationId": "getRandomUsers",
            "responses": {
                "200": {
                    "description": "Returns a random user profile resource",
                    "content": {
                        "application/json": {
                            "schema": {
                                "properties": {
                                    "data": {
                                        "$ref": "#/components/schemas/user_profile"
                                    }
                                },
                                "type": "object"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/recommendations/anime": {
        "get": {
            "tags": [
                "recommendations"
            ],
            "operationId": "getRecentAnimeRecommendations",
            "parameters": [
                {
                    "$ref": "#/components/parameters/page"
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns recent anime recommendations",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/recommendations"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/recommendations/manga": {
        "get": {
            "tags": [
                "recommendations"
            ],
            "operationId": "getRecentMangaRecommendations",
            "parameters": [
                {
                    "$ref": "#/components/parameters/page"
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns recent manga recommendations",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/recommendations"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/reviews/anime": {
        "get": {
            "tags": [
                "reviews"
            ],
            "operationId": "getRecentAnimeReviews",
            "parameters": [
                {
                    "$ref": "#/components/parameters/page"
                },
                {
                    "$ref": "#/components/parameters/preliminary"
                },
                {
                    "$ref": "#/components/parameters/spoilers"
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns recent anime reviews",
                    "content": {
                        "application/json": {
                            "schema": {}
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/reviews/manga": {
        "get": {
            "tags": [
                "reviews"
            ],
            "operationId": "getRecentMangaReviews",
            "parameters": [
                {
                    "$ref": "#/components/parameters/page"
                },
                {
                    "$ref": "#/components/parameters/preliminary"
                },
                {
                    "$ref": "#/components/parameters/spoilers"
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns recent manga reviews",
                    "content": {
                        "application/json": {
                            "schema": {}
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/schedules": {
        "get": {
            "tags": [
                "schedules"
            ],
            "operationId": "getSchedules",
            "parameters": [
                {
                    "name": "filter",
                    "in": "query",
                    "description": "Filter by day",
                    "required": false,
                    "schema": {
                        "type": "string",
                        "enum": [
                            "monday",
                            "tuesday",
                            "wednesday",
                            "thursday",
                            "friday",
                            "saturday",
                            "sunday",
                            "unknown",
                            "other"
                        ]
                    }
                },
                {
                    "name": "kids",
                    "in": "query",
                    "description": "When supplied, it will filter entries with the `Kids` Genre Demographic. When supplied as `kids=true`, it will return only Kid entries and when supplied as `kids=false`, it will filter out any Kid entries. Defaults to `false`.",
                    "required": false,
                    "schema": {
                        "type": "string",
                        "enum": [
                            "true",
                            "false"
                        ]
                    }
                },
                {
                    "name": "sfw",
                    "in": "query",
                    "description": "'Safe For Work'. When supplied, it will filter entries with the `Hentai` Genre. When supplied as `sfw=true`, it will return only SFW entries and when supplied as `sfw=false`, it will filter out any Hentai entries. Defaults to `false`.",
                    "required": false,
                    "schema": {
                        "type": "string",
                        "enum": [
                            "true",
                            "false"
                        ]
                    }
                },
                {
                    "$ref": "#/components/parameters/unapproved"
                },
                {
                    "$ref": "#/components/parameters/page"
                },
                {
                    "$ref": "#/components/parameters/limit"
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns weekly schedule",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/schedules"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/anime": {
        "get": {
            "tags": [
                "anime"
            ],
            "operationId": "getAnimeSearch",
            "parameters": [
                {
                    "$ref": "#/components/parameters/unapproved"
                },
                {
                    "$ref": "#/components/parameters/page"
                },
                {
                    "$ref": "#/components/parameters/limit"
                },
                {
                    "name": "q",
                    "in": "query",
                    "schema": {
                        "type": "string"
                    }
                },
                {
                    "name": "type",
                    "in": "query",
                    "schema": {
                        "$ref": "#/components/schemas/anime_search_query_type"
                    }
                },
                {
                    "name": "score",
                    "in": "query",
                    "schema": {
                        "type": "number"
                    }
                },
                {
                    "name": "min_score",
                    "in": "query",
                    "description": "Set a minimum score for results.",
                    "schema": {
                        "type": "number"
                    }
                },
                {
                    "name": "max_score",
                    "in": "query",
                    "description": "Set a maximum score for results",
                    "schema": {
                        "type": "number"
                    }
                },
                {
                    "name": "status",
                    "in": "query",
                    "schema": {
                        "$ref": "#/components/schemas/anime_search_query_status"
                    }
                },
                {
                    "name": "rating",
                    "in": "query",
                    "schema": {
                        "$ref": "#/components/schemas/anime_search_query_rating"
                    }
                },
                {
                    "name": "sfw",
                    "in": "query",
                    "description": "Filter out Adult entries",
                    "schema": {
                        "type": "boolean"
                    }
                },
                {
                    "name": "genres",
                    "in": "query",
                    "description": "Filter by genre(s) IDs. Can pass multiple with a comma as a delimiter. e.g 1,2,3",
                    "schema": {
                        "type": "string"
                    }
                },
                {
                    "name": "genres_exclude",
                    "in": "query",
                    "description": "Exclude genre(s) IDs. Can pass multiple with a comma as a delimiter. e.g 1,2,3",
                    "schema": {
                        "type": "string"
                    }
                },
                {
                    "name": "order_by",
                    "in": "query",
                    "schema": {
                        "$ref": "#/components/schemas/anime_search_query_orderby"
                    }
                },
                {
                    "name": "sort",
                    "in": "query",
                    "schema": {
                        "$ref": "#/components/schemas/search_query_sort"
                    }
                },
                {
                    "name": "letter",
                    "in": "query",
                    "description": "Return entries starting with the given letter",
                    "schema": {
                        "type": "string"
                    }
                },
                {
                    "name": "producers",
                    "in": "query",
                    "description": "Filter by producer(s) IDs. Can pass multiple with a comma as a delimiter. e.g 1,2,3",
                    "schema": {
                        "type": "string"
                    }
                },
                {
                    "name": "start_date",
                    "in": "query",
                    "description": "Filter by starting date. Format: YYYY-MM-DD. e.g `2022`, `2005-05`, `2005-01-01`",
                    "schema": {
                        "type": "string"
                    }
                },
                {
                    "name": "end_date",
                    "in": "query",
                    "description": "Filter by ending date. Format: YYYY-MM-DD. e.g `2022`, `2005-05`, `2005-01-01`",
                    "schema": {
                        "type": "string"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns search results for anime",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/anime_search"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/manga": {
        "get": {
            "tags": [
                "manga"
            ],
            "operationId": "getMangaSearch",
            "parameters": [
                {
                    "$ref": "#/components/parameters/unapproved"
                },
                {
                    "$ref": "#/components/parameters/page"
                },
                {
                    "$ref": "#/components/parameters/limit"
                },
                {
                    "name": "q",
                    "in": "query",
                    "schema": {
                        "type": "string"
                    }
                },
                {
                    "name": "type",
                    "in": "query",
                    "schema": {
                        "$ref": "#/components/schemas/manga_search_query_type"
                    }
                },
                {
                    "name": "score",
                    "in": "query",
                    "schema": {
                        "type": "number"
                    }
                },
                {
                    "name": "min_score",
                    "in": "query",
                    "description": "Set a minimum score for results.",
                    "schema": {
                        "type": "number"
                    }
                },
                {
                    "name": "max_score",
                    "in": "query",
                    "description": "Set a maximum score for results",
                    "schema": {
                        "type": "number"
                    }
                },
                {
                    "name": "status",
                    "in": "query",
                    "schema": {
                        "$ref": "#/components/schemas/manga_search_query_status"
                    }
                },
                {
                    "name": "sfw",
                    "in": "query",
                    "description": "Filter out Adult entries",
                    "schema": {
                        "type": "boolean"
                    }
                },
                {
                    "name": "genres",
                    "in": "query",
                    "description": "Filter by genre(s) IDs. Can pass multiple with a comma as a delimiter. e.g 1,2,3",
                    "schema": {
                        "type": "string"
                    }
                },
                {
                    "name": "genres_exclude",
                    "in": "query",
                    "description": "Exclude genre(s) IDs. Can pass multiple with a comma as a delimiter. e.g 1,2,3",
                    "schema": {
                        "type": "string"
                    }
                },
                {
                    "name": "order_by",
                    "in": "query",
                    "schema": {
                        "$ref": "#/components/schemas/manga_search_query_orderby"
                    }
                },
                {
                    "name": "sort",
                    "in": "query",
                    "schema": {
                        "$ref": "#/components/schemas/search_query_sort"
                    }
                },
                {
                    "name": "letter",
                    "in": "query",
                    "description": "Return entries starting with the given letter",
                    "schema": {
                        "type": "string"
                    }
                },
                {
                    "name": "magazines",
                    "in": "query",
                    "description": "Filter by magazine(s) IDs. Can pass multiple with a comma as a delimiter. e.g 1,2,3",
                    "schema": {
                        "type": "string"
                    }
                },
                {
                    "name": "start_date",
                    "in": "query",
                    "description": "Filter by starting date. Format: YYYY-MM-DD. e.g `2022`, `2005-05`, `2005-01-01`",
                    "schema": {
                        "type": "string"
                    }
                },
                {
                    "name": "end_date",
                    "in": "query",
                    "description": "Filter by ending date. Format: YYYY-MM-DD. e.g `2022`, `2005-05`, `2005-01-01`",
                    "schema": {
                        "type": "string"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns search results for manga",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/manga_search"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/people": {
        "get": {
            "tags": [
                "people"
            ],
            "operationId": "getPeopleSearch",
            "parameters": [
                {
                    "$ref": "#/components/parameters/page"
                },
                {
                    "$ref": "#/components/parameters/limit"
                },
                {
                    "name": "q",
                    "in": "query",
                    "schema": {
                        "type": "string"
                    }
                },
                {
                    "name": "order_by",
                    "in": "query",
                    "schema": {
                        "$ref": "#/components/schemas/people_search_query_orderby"
                    }
                },
                {
                    "name": "sort",
                    "in": "query",
                    "schema": {
                        "$ref": "#/components/schemas/search_query_sort"
                    }
                },
                {
                    "name": "letter",
                    "in": "query",
                    "description": "Return entries starting with the given letter",
                    "schema": {
                        "type": "string"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns search results for people",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/people_search"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/characters": {
        "get": {
            "tags": [
                "characters"
            ],
            "operationId": "getCharactersSearch",
            "parameters": [
                {
                    "$ref": "#/components/parameters/page"
                },
                {
                    "$ref": "#/components/parameters/limit"
                },
                {
                    "name": "q",
                    "in": "query",
                    "schema": {
                        "type": "string"
                    }
                },
                {
                    "name": "order_by",
                    "in": "query",
                    "schema": {
                        "$ref": "#/components/schemas/characters_search_query_orderby"
                    }
                },
                {
                    "name": "sort",
                    "in": "query",
                    "schema": {
                        "$ref": "#/components/schemas/search_query_sort"
                    }
                },
                {
                    "name": "letter",
                    "in": "query",
                    "description": "Return entries starting with the given letter",
                    "schema": {
                        "type": "string"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns search results for characters",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/characters_search"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/users": {
        "get": {
            "tags": [
                "users"
            ],
            "operationId": "getUsersSearch",
            "parameters": [
                {
                    "$ref": "#/components/parameters/page"
                },
                {
                    "$ref": "#/components/parameters/limit"
                },
                {
                    "name": "q",
                    "in": "query",
                    "schema": {
                        "type": "string"
                    }
                },
                {
                    "name": "gender",
                    "in": "query",
                    "schema": {
                        "$ref": "#/components/schemas/users_search_query_gender"
                    }
                },
                {
                    "name": "location",
                    "in": "query",
                    "schema": {
                        "type": "string"
                    }
                },
                {
                    "name": "maxAge",
                    "in": "query",
                    "schema": {
                        "type": "integer"
                    }
                },
                {
                    "name": "minAge",
                    "in": "query",
                    "schema": {
                        "type": "integer"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns search results for users",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/users_search"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/users/userbyid/{id}": {
        "get": {
            "tags": [
                "users"
            ],
            "operationId": "getUserById",
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "integer"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns username by ID search",
                    "content": {
                        "application/json": {
                            "schema": {
                                "properties": {
                                    "data": {
                                        "$ref": "#/components/schemas/user_by_id"
                                    }
                                },
                                "type": "object"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/clubs": {
        "get": {
            "tags": [
                "clubs"
            ],
            "operationId": "getClubsSearch",
            "parameters": [
                {
                    "$ref": "#/components/parameters/page"
                },
                {
                    "$ref": "#/components/parameters/limit"
                },
                {
                    "name": "q",
                    "in": "query",
                    "schema": {
                        "type": "string"
                    }
                },
                {
                    "name": "type",
                    "in": "query",
                    "schema": {
                        "$ref": "#/components/schemas/club_search_query_type"
                    }
                },
                {
                    "name": "category",
                    "in": "query",
                    "schema": {
                        "$ref": "#/components/schemas/club_search_query_category"
                    }
                },
                {
                    "name": "order_by",
                    "in": "query",
                    "schema": {
                        "$ref": "#/components/schemas/club_search_query_orderby"
                    }
                },
                {
                    "name": "sort",
                    "in": "query",
                    "schema": {
                        "$ref": "#/components/schemas/search_query_sort"
                    }
                },
                {
                    "name": "letter",
                    "in": "query",
                    "description": "Return entries starting with the given letter",
                    "schema": {
                        "type": "string"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns search results for clubs",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/clubs_search"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/producers": {
        "get": {
            "tags": [
                "producers"
            ],
            "operationId": "getProducers",
            "parameters": [
                {
                    "$ref": "#/components/parameters/page"
                },
                {
                    "$ref": "#/components/parameters/limit"
                },
                {
                    "name": "q",
                    "in": "query",
                    "schema": {
                        "type": "string"
                    }
                },
                {
                    "name": "order_by",
                    "in": "query",
                    "schema": {
                        "$ref": "#/components/schemas/producers_query_orderby"
                    }
                },
                {
                    "name": "sort",
                    "in": "query",
                    "schema": {
                        "$ref": "#/components/schemas/search_query_sort"
                    }
                },
                {
                    "name": "letter",
                    "in": "query",
                    "description": "Return entries starting with the given letter",
                    "schema": {
                        "type": "string"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns producers collection",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/producers"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/seasons/now": {
        "get": {
            "tags": [
                "seasons"
            ],
            "operationId": "getSeasonNow",
            "parameters": [
                {
                    "name": "filter",
                    "in": "query",
                    "description": "Entry types",
                    "schema": {
                        "type": "string",
                        "enum": [
                            "tv",
                            "movie",
                            "ova",
                            "special",
                            "ona",
                            "music"
                        ]
                    }
                },
                {
                    "$ref": "#/components/parameters/sfw"
                },
                {
                    "$ref": "#/components/parameters/unapproved"
                },
                {
                    "$ref": "#/components/parameters/continuing"
                },
                {
                    "$ref": "#/components/parameters/page"
                },
                {
                    "$ref": "#/components/parameters/limit"
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns current seasonal anime",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/anime_search"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/seasons/{year}/{season}": {
        "get": {
            "tags": [
                "seasons"
            ],
            "operationId": "getSeason",
            "parameters": [
                {
                    "name": "year",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "integer"
                    }
                },
                {
                    "name": "season",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "string"
                    }
                },
                {
                    "name": "filter",
                    "in": "query",
                    "description": "Entry types",
                    "schema": {
                        "type": "string",
                        "enum": [
                            "tv",
                            "movie",
                            "ova",
                            "special",
                            "ona",
                            "music"
                        ]
                    }
                },
                {
                    "$ref": "#/components/parameters/sfw"
                },
                {
                    "$ref": "#/components/parameters/unapproved"
                },
                {
                    "$ref": "#/components/parameters/continuing"
                },
                {
                    "$ref": "#/components/parameters/page"
                },
                {
                    "$ref": "#/components/parameters/limit"
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns seasonal anime",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/anime_search"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/seasons": {
        "get": {
            "tags": [
                "seasons"
            ],
            "operationId": "getSeasonsList",
            "responses": {
                "200": {
                    "description": "Returns available list of seasons",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/seasons"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/seasons/upcoming": {
        "get": {
            "tags": [
                "seasons"
            ],
            "operationId": "getSeasonUpcoming",
            "parameters": [
                {
                    "name": "filter",
                    "in": "query",
                    "description": "Entry types",
                    "schema": {
                        "type": "string",
                        "enum": [
                            "tv",
                            "movie",
                            "ova",
                            "special",
                            "ona",
                            "music"
                        ]
                    }
                },
                {
                    "$ref": "#/components/parameters/sfw"
                },
                {
                    "$ref": "#/components/parameters/unapproved"
                },
                {
                    "$ref": "#/components/parameters/continuing"
                },
                {
                    "$ref": "#/components/parameters/page"
                },
                {
                    "$ref": "#/components/parameters/limit"
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns upcoming season's anime",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/anime_search"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/top/anime": {
        "get": {
            "tags": [
                "top"
            ],
            "operationId": "getTopAnime",
            "parameters": [
                {
                    "name": "type",
                    "in": "query",
                    "required": false,
                    "schema": {
                        "$ref": "#/components/schemas/anime_search_query_type"
                    }
                },
                {
                    "name": "filter",
                    "in": "query",
                    "required": false,
                    "schema": {
                        "$ref": "#/components/schemas/top_anime_filter"
                    }
                },
                {
                    "name": "rating",
                    "in": "query",
                    "schema": {
                        "$ref": "#/components/schemas/anime_search_query_rating"
                    }
                },
                {
                    "name": "sfw",
                    "in": "query",
                    "description": "Filter out Adult entries",
                    "schema": {
                        "type": "boolean"
                    }
                },
                {
                    "$ref": "#/components/parameters/page"
                },
                {
                    "$ref": "#/components/parameters/limit"
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns top anime",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/anime_search"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/top/manga": {
        "get": {
            "tags": [
                "top"
            ],
            "operationId": "getTopManga",
            "parameters": [
                {
                    "name": "type",
                    "in": "query",
                    "required": false,
                    "schema": {
                        "$ref": "#/components/schemas/manga_search_query_type"
                    }
                },
                {
                    "name": "filter",
                    "in": "query",
                    "required": false,
                    "schema": {
                        "$ref": "#/components/schemas/top_manga_filter"
                    }
                },
                {
                    "$ref": "#/components/parameters/page"
                },
                {
                    "$ref": "#/components/parameters/limit"
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns top manga",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/manga_search"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/top/people": {
        "get": {
            "tags": [
                "top"
            ],
            "operationId": "getTopPeople",
            "parameters": [
                {
                    "$ref": "#/components/parameters/page"
                },
                {
                    "$ref": "#/components/parameters/limit"
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns top people",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/people_search"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/top/characters": {
        "get": {
            "tags": [
                "top"
            ],
            "operationId": "getTopCharacters",
            "parameters": [
                {
                    "$ref": "#/components/parameters/page"
                },
                {
                    "$ref": "#/components/parameters/limit"
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns top characters",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/characters_search"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/top/reviews": {
        "get": {
            "tags": [
                "top"
            ],
            "operationId": "getTopReviews",
            "parameters": [
                {
                    "$ref": "#/components/parameters/page"
                },
                {
                    "name": "type",
                    "in": "query",
                    "required": false,
                    "schema": {
                        "$ref": "#/components/schemas/top_reviews_type_enum"
                    }
                },
                {
                    "name": "preliminary",
                    "in": "query",
                    "description": "Whether the results include preliminary reviews or not. Defaults to true.",
                    "required": false,
                    "schema": {
                        "type": "boolean"
                    }
                },
                {
                    "name": "spoilers",
                    "in": "query",
                    "description": "Whether the results include reviews with spoilers or not. Defaults to true.",
                    "required": false,
                    "schema": {
                        "type": "boolean"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns top reviews",
                    "content": {
                        "application/json": {
                            "schema": {
                                "properties": {
                                    "data": {
                                        "allOf": [
                                            {
                                                "properties": {
                                                    "data": {
                                                        "type": "array",
                                                        "items": {
                                                            "anyOf": [
                                                                {
                                                                    "allOf": [
                                                                        {
                                                                            "properties": {
                                                                                "user": {
                                                                                    "$ref": "#/components/schemas/user_meta"
                                                                                }
                                                                            },
                                                                            "type": "object"
                                                                        },
                                                                        {
                                                                            "properties": {
                                                                                "anime": {
                                                                                    "$ref": "#/components/schemas/anime_meta"
                                                                                }
                                                                            },
                                                                            "type": "object"
                                                                        },
                                                                        {
                                                                            "$ref": "#/components/schemas/anime_review"
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    "allOf": [
                                                                        {
                                                                            "properties": {
                                                                                "user": {
                                                                                    "$ref": "#/components/schemas/user_meta"
                                                                                }
                                                                            },
                                                                            "type": "object"
                                                                        },
                                                                        {
                                                                            "properties": {
                                                                                "manga": {
                                                                                    "$ref": "#/components/schemas/manga_meta"
                                                                                }
                                                                            },
                                                                            "type": "object"
                                                                        },
                                                                        {
                                                                            "$ref": "#/components/schemas/manga_review"
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    }
                                                },
                                                "type": "object"
                                            },
                                            {
                                                "$ref": "#/components/schemas/pagination"
                                            }
                                        ]
                                    }
                                },
                                "type": "object"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/users/{username}/full": {
        "get": {
            "tags": [
                "users"
            ],
            "operationId": "getUserFullProfile",
            "parameters": [
                {
                    "name": "username",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "string"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns complete user resource data",
                    "content": {
                        "application/json": {
                            "schema": {
                                "properties": {
                                    "data": {
                                        "$ref": "#/components/schemas/user_profile_full"
                                    }
                                },
                                "type": "object"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/users/{username}": {
        "get": {
            "tags": [
                "users"
            ],
            "operationId": "getUserProfile",
            "parameters": [
                {
                    "name": "username",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "string"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns user profile",
                    "content": {
                        "application/json": {
                            "schema": {
                                "properties": {
                                    "data": {
                                        "$ref": "#/components/schemas/user_profile"
                                    }
                                },
                                "type": "object"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/users/{username}/statistics": {
        "get": {
            "tags": [
                "users"
            ],
            "operationId": "getUserStatistics",
            "parameters": [
                {
                    "name": "username",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "string"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns user statistics",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/user_statistics"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/users/{username}/favorites": {
        "get": {
            "tags": [
                "users"
            ],
            "operationId": "getUserFavorites",
            "parameters": [
                {
                    "name": "username",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "string"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns user favorites",
                    "content": {
                        "application/json": {
                            "schema": {
                                "properties": {
                                    "data": {
                                        "$ref": "#/components/schemas/user_favorites"
                                    }
                                },
                                "type": "object"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/users/{username}/userupdates": {
        "get": {
            "tags": [
                "users"
            ],
            "operationId": "getUserUpdates",
            "parameters": [
                {
                    "name": "username",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "string"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns user updates",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/user_updates"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/users/{username}/about": {
        "get": {
            "tags": [
                "users"
            ],
            "operationId": "getUserAbout",
            "parameters": [
                {
                    "name": "username",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "string"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns user about in raw HTML",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/user_about"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/users/{username}/history": {
        "get": {
            "tags": [
                "users"
            ],
            "operationId": "getUserHistory",
            "parameters": [
                {
                    "name": "username",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "string"
                    }
                },
                {
                    "name": "type",
                    "in": "query",
                    "required": false,
                    "schema": {
                        "type": "string",
                        "enum": [
                            "anime",
                            "manga"
                        ]
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns user history (past 30 days)",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/user_history"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/users/{username}/friends": {
        "get": {
            "tags": [
                "users"
            ],
            "operationId": "getUserFriends",
            "parameters": [
                {
                    "name": "username",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "string"
                    }
                },
                {
                    "$ref": "#/components/parameters/page"
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns user friends",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/user_friends"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/users/{username}/animelist": {
        "get": {
            "tags": [
                "users"
            ],
            "description": "User Anime lists have been discontinued since May 1st, 2022. <a href='https://docs.google.com/document/d/1-6H-agSnqa8Mfmw802UYfGQrceIEnAaEh4uCXAPiX5A'>Read more</a>",
            "operationId": "getUserAnimelist",
            "parameters": [
                {
                    "name": "username",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "string"
                    }
                },
                {
                    "name": "status",
                    "in": "query",
                    "schema": {
                        "$ref": "#/components/schemas/user_anime_list_status_filter"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns user anime list",
                    "content": {
                        "application/json": {
                            "schema": {}
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            },
            "deprecated": true
        }
    },
    "/users/{username}/mangalist": {
        "get": {
            "tags": [
                "users"
            ],
            "description": "User Manga lists have been discontinued since May 1st, 2022. <a href='https://docs.google.com/document/d/1-6H-agSnqa8Mfmw802UYfGQrceIEnAaEh4uCXAPiX5A'>Read more</a>",
            "operationId": "getUserMangaList",
            "parameters": [
                {
                    "name": "username",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "string"
                    }
                },
                {
                    "name": "status",
                    "in": "query",
                    "schema": {
                        "$ref": "#/components/schemas/user_manga_list_status_filter"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns user manga list",
                    "content": {
                        "application/json": {
                            "schema": {}
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            },
            "deprecated": true
        }
    },
    "/users/{username}/reviews": {
        "get": {
            "tags": [
                "users"
            ],
            "operationId": "getUserReviews",
            "parameters": [
                {
                    "name": "username",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "string"
                    }
                },
                {
                    "$ref": "#/components/parameters/page"
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns user reviews",
                    "content": {
                        "application/json": {
                            "schema": {
                                "properties": {
                                    "data": {
                                        "allOf": [
                                            {
                                                "properties": {
                                                    "data": {
                                                        "type": "array",
                                                        "items": {
                                                            "anyOf": [
                                                                {
                                                                    "allOf": [
                                                                        {
                                                                            "properties": {
                                                                                "user": {
                                                                                    "$ref": "#/components/schemas/user_meta"
                                                                                }
                                                                            },
                                                                            "type": "object"
                                                                        },
                                                                        {
                                                                            "properties": {
                                                                                "anime": {
                                                                                    "$ref": "#/components/schemas/anime_meta"
                                                                                }
                                                                            },
                                                                            "type": "object"
                                                                        },
                                                                        {
                                                                            "$ref": "#/components/schemas/anime_review"
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    "allOf": [
                                                                        {
                                                                            "properties": {
                                                                                "user": {
                                                                                    "$ref": "#/components/schemas/user_meta"
                                                                                }
                                                                            },
                                                                            "type": "object"
                                                                        },
                                                                        {
                                                                            "properties": {
                                                                                "manga": {
                                                                                    "$ref": "#/components/schemas/manga_meta"
                                                                                }
                                                                            },
                                                                            "type": "object"
                                                                        },
                                                                        {
                                                                            "$ref": "#/components/schemas/manga_review"
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    }
                                                },
                                                "type": "object"
                                            },
                                            {
                                                "$ref": "#/components/schemas/pagination"
                                            }
                                        ]
                                    }
                                },
                                "type": "object"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/users/{username}/recommendations": {
        "get": {
            "tags": [
                "users"
            ],
            "operationId": "getUserRecommendations",
            "parameters": [
                {
                    "name": "username",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "string"
                    }
                },
                {
                    "$ref": "#/components/parameters/page"
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns Recent Anime Recommendations",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/recommendations"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/users/{username}/clubs": {
        "get": {
            "tags": [
                "users"
            ],
            "operationId": "getUserClubs",
            "parameters": [
                {
                    "name": "username",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "string"
                    }
                },
                {
                    "$ref": "#/components/parameters/page"
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns user clubs",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/user_clubs"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/users/{username}/external": {
        "get": {
            "tags": [
                "users"
            ],
            "operationId": "getUserExternal",
            "parameters": [
                {
                    "name": "username",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "string"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns user's external links",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/external_links"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/watch/episodes": {
        "get": {
            "tags": [
                "watch"
            ],
            "operationId": "getWatchRecentEpisodes",
            "responses": {
                "200": {
                    "description": "Returns Recently Added Episodes",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/watch_episodes"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/watch/episodes/popular": {
        "get": {
            "tags": [
                "watch"
            ],
            "operationId": "getWatchPopularEpisodes",
            "responses": {
                "200": {
                    "description": "Returns Popular Episodes",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/watch_episodes"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/watch/promos": {
        "get": {
            "tags": [
                "watch"
            ],
            "operationId": "getWatchRecentPromos",
            "parameters": [
                {
                    "$ref": "#/components/parameters/page"
                }
            ],
            "responses": {
                "200": {
                    "description": "Returns Recently Added Promotional Videos",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/watch_promos"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    },
    "/watch/promos/popular": {
        "get": {
            "tags": [
                "watch"
            ],
            "operationId": "getWatchPopularPromos",
            "responses": {
                "200": {
                    "description": "Returns Popular Promotional Videos",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/watch_promos"
                            }
                        }
                    }
                },
                "400": {
                    "description": "Error: Bad request. When required parameters were not supplied."
                }
            }
        }
    }
}