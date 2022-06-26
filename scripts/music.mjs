const main = async () => {
  const {
    toptracks: { track },
  } = await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=${process.env.LASTFM_USER}&api_key=${process.env.API_KEY}&format=json&limit=10&period=1month`
  ).then((res) => res.json());

  const topTracks = track
    .map((item, idx) => {
      const searchQuery = encodeURIComponent(
        item.artist.name + " " + item.name
      );

      return (
        `${idx + 1}. [${item.artist.name} - ${item.name}](${item.url})` +
        ` [<img alt="spotify" width="16px" src="assets/spotify.png" />](https://open.spotify.com/search/${searchQuery})` +
        ` [<img alt="youtube" width="16px" src="assets/youtube.png" />](https://www.youtube.com/results?search_query=${searchQuery})`
      );
    })
    .join("\n");

  console.log(topTracks);
};

main();
