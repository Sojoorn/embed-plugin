import { Embed } from "../src/Embed";

const embed = new Embed('AIzaSyDqJnKWU6bN4GyjH6IZ9Fpqx7YLh3-CYRI');

describe("Embed", () => {
  it("Verify YouTube Url", () => {
    expect(embed.getInfo('https://www.youtube.com/watch?v=jABp-FRUJ48')).toMatchObject({
      id: expect.any(String), 
      source: expect.any(String),
      url: expect.any(String),
      embedUrl: expect.any(String)
    });
  });
  it("Verify Vimeo Url", () => {
    expect(embed.getInfo('https://vimeo.com/243244233')).toMatchObject({
      id: expect.any(String), 
      source: expect.any(String),
      url: expect.any(String),
      embedUrl: expect.any(String)
    });
  });
  it("Verify Dailymotion Url", () => {
    expect(embed.getInfo('https://www.dailymotion.com/video/x7zn3je')).toMatchObject({
      id: expect.any(String), 
      source: expect.any(String),
      url: expect.any(String),
      embedUrl: expect.any(String)
    });
  });
  it("Verify Drive Url", () => {
    expect(embed.getInfo('https://drive.google.com/file/d/10OoKhqUM2ZukFc-2oVYd-MFy9NWArAFH/view')).toMatchObject({
      id: expect.any(String), 
      source: expect.any(String),
      url: expect.any(String),
      embedUrl: expect.any(String)
    });
  });
});