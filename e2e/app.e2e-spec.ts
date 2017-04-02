import { KeepInTouchPage } from './app.po';

describe('keep-in-touch App', () => {
  let page: KeepInTouchPage;

  beforeEach(() => {
    page = new KeepInTouchPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
