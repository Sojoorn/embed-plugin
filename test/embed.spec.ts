import { Embed } from "../src/Embed";

describe("Embed", () => {
  it("Verify YouTube Url", () => {
    expect(Embed.getInfo('https://www.youtube.com/watch?v=jABp-FRUJ48')).toMatchObject({
      id: expect.any(String), 
      source: expect.any(String),
      url: expect.any(String),
      embedUrl: expect.any(String)
    });
  });
  it("Verify Vimeo Url", () => {
    expect(Embed.getInfo('https://vimeo.com/243244233')).toMatchObject({
      id: expect.any(String), 
      source: expect.any(String),
      url: expect.any(String),
      embedUrl: expect.any(String)
    });
  });
  it("Verify Dailymotion Url", () => {
    expect(Embed.getInfo('https://www.dailymotion.com/video/x7zn3je')).toMatchObject({
      id: expect.any(String), 
      source: expect.any(String),
      url: expect.any(String),
      embedUrl: expect.any(String)
    });
  });
});