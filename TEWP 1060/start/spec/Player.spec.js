const customMatchers = {
  toBePlaying: () => {
    return {
      compare: (actual, expected) => {
        let player = actual;
        let song = expected;

        return {
          pass: player.currentlyPlayingSong == song && player.isPlaying,
        };
      },
    };
  },
};

describe("Player", () => {
  let player;
  let song;

  beforeEach(() => {
    player = new Player();
    song = new Song();
    jasmine.addMatchers(customMatchers);
  });
  it("should play a song", () => {
    player.play(song);
    expect(player).toBePlaying(song);
  });
});
