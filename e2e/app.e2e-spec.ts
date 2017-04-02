import { InTouchPage } from './app.po';

describe('in-touch App', () => {
  let page: InTouchPage;

  beforeEach(() => {
    page = new InTouchPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
