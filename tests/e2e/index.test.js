import { Selector } from 'testcafe';

fixture`Home page`.page`http://localhost:3000`;

test('Page heading is displayed', async t => {
  const heading = Selector('h1');
  await t.expect(heading.textContent).contains('Things I Learned');
});

test('Articles loaded are not more than 6', async t => {
  const articlesSection = Selector('section:last-of-type');
  await t.expect(articlesSection.childElementCount).lte(6);
});

test('Single article is loaded from home', async t => {
  const articlesSection = Selector('section:last-of-type');
  const articleTitle = articlesSection.child('div').find('a.article-title');
  await t.click(articleTitle);
  await t.expect(Selector('div.article--container').exists).ok();
});

test('Article page displays article read time', async t => {
  const articlesSection = Selector('section:last-of-type');
  const articleTitle = articlesSection.child('div').find('a.article-title');
  await t.click(articleTitle);
  const readTime = Selector('.article-header p:last-of-type');
  await t.expect(readTime.textContent).contains('mins');
  await t.expect(readTime.textContent).contains('read');
});

test('Article page has button to go back to the home page', async t => {
  const articlesSection = Selector('section:last-of-type');
  const articleTitle = articlesSection.child('div').find('a.article-title');
  await t.click(articleTitle);
  const backButton = Selector('.btn--back-home');
  await t.click(backButton);
  await t.expect(Selector('.summary_intro').exists).ok();
});
