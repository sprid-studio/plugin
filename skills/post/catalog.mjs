// Shared editorial-guide navigation. Instructions live in guides/*.md beside the
// skill that teaches them; `dir` names that folder and defaults to post/guides.
export const CONTENT_GUIDE_SPECS = [
  { id: 'chat', file: 'chat', title: 'Use Sprid in chat', url: 'https://sprid.studio/docs/chat' },
  { id: 'local', file: 'local', title: 'Build locally and send to Sprid', url: 'https://sprid.studio/docs/local' },
  { id: 'marketing-review', file: 'marketing-review', title: 'Review marketing from connected evidence', url: 'https://sprid.studio/docs/marketing-review' },
  { id: 'traffic', file: 'traffic', title: 'Check whether a traffic spike is real', url: 'https://sprid.studio/docs/traffic' },
  {
    id: 'pinterest-content',
    file: 'pinterest',
    title: 'Pinterest content and publishing',
    url: 'https://sprid.studio/docs/pinterest',
  },
  { id: 'distribution', file: 'distribution', title: 'Why a post travels', url: 'https://sprid.studio/docs/distribution' },
  {
    id: 'reel-first-seconds',
    file: 'first-seconds',
    dir: 'reels/guides',
    title: 'The first seconds of a reel',
    url: 'https://sprid.studio/docs/reel-first-seconds',
  },
  {
    id: 'store-listing',
    file: 'store-listing',
    dir: 'store-metadata/guides',
    title: 'Write a store listing people can find',
    url: 'https://sprid.studio/docs/store-listing',
  },
];
