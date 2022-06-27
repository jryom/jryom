const api = async (method, period) =>
  await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=${method}&user=${process.env.LASTFM_USER}&api_key=${process.env.API_KEY}&format=json&limit=10&period=${period}`
  ).then((res) => res.json());

const tracks = async () => {
  const {
    toptracks: { track },
  } = await api("user.gettoptracks", "1month");

  const topTracks = track
    .map((item, idx) => {
      const searchQuery = encodeURIComponent(
        item.artist.name + " " + item.name
      );

      return (
        `${idx + 1}. ` +
        `[<img alt="spotify" width="18px" src="assets/spotify.png" />](https://open.spotify.com/search/${searchQuery})` +
        ` [<img alt="youtube" width="18px" src="assets/youtube.png" />](https://www.youtube.com/results?search_query=${searchQuery}) ` +
        `[${`${item.artist.name} - ${item.name}`.replace(
          /(.{40})..+/,
          "$1…"
        )}](${item.url})`
      );
    })
    .join("\n");

  console.log(topTracks);
};

const artists = async () => {
  const {
    topartists: { artist },
  } = await api("user.gettopartists", "3month");

  const topArtists = artist
    .map((item, idx) => {
      const searchQuery = encodeURIComponent(item.name);

      return (
        `${idx + 1}. ` +
        `[<img alt="spotify" width="18px" src="assets/spotify.png" />](https://open.spotify.com/search/${searchQuery})` +
        ` [<img alt="youtube" width="18px" src="assets/youtube.png" />](https://www.youtube.com/results?search_query=${searchQuery}) ` +
        `[${item.name}](${item.url})`
      );
    })
    .join("\n");

  console.log(topArtists);
};

if (process.argv.includes("tracks")) {
  tracks();
} else if (process.argv.includes("artists")) {
  artists();
}
