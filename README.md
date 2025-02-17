# Anicrush Scraper API

An API to fetch data from Anicrush.to

## Features

- Get trending anime
- Get top airing anime
- Get anime info
- Get anime characters
- Get anime episodes
- Get anime episode sources
- Get anime search results
- Get complete mapping with everything needed.
- Fully functional and ready to use.
- Reliable and fast.
- Cached
- Very less rate limit.

# Requirements

- Bun 1.2.x
- Node.js 20.x

## Installation

Clone the repository

```bash
git clone https://github.com/shimizudev/anicrush-api.git
```

Install dependencies

```bash
bun install
```

Run the server

```bash
bun run start
```

## Usage

This thing is API based.

## Routes

### Get trending anime

```bash
GET /api/v1/scraper/trending
```

Parameters:

- `page` (optional): The page number to fetch. Default is 1.
- `limit` (optional): The number of results to fetch. Default is 20.

### Get top airing anime

```bash
GET /api/v1/scraper/top-airing
```

Parameters:

- `page` (optional): The page number to fetch. Default is 1.
- `limit` (optional): The number of results to fetch. Default is 20.

### Get anime info

```bash
GET /api/v1/scraper/anime/:id
```

Parameters:

- `id`: The ID of the anime to fetch.

### Get anime characters

```bash
GET /api/v1/scraper/characters/:id
```

Parameters:

- `id`: The ID of the anime to fetch.

### Get anime episodes

```bash
GET /api/v1/scraper/episodes/:id
```

Parameters:

- `id`: The ID of the anime to fetch.

### Get anime search results

```bash
GET /api/v1/scraper/search/:query
```

Parameters:

- `query`: The query to search for.



## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.


## License

[MIT](./LICENSE)

## Contact

[ShimizuDev](https://github.com/shimizudev)
