class Player {
  play(song) {
    this.currentlyPlayingSong = song;
    this.isPlaying = true;
  }

  pause() {
    this.isPlaying = false;
  }

  resume() {
    if ((this, this.isPlaying)) {
      throw new Error(`Song is already playing`);
    }
    this.isPlaying = true;
  }

  makeFavorite() {
    this.currentlyPlayingSong.persistFavoriteStatus();
  }
}
