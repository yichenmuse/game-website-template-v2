import { SiteConfig } from '../types';

export const siteConfig: SiteConfig = {
  name: 'Game Portal Demo',
  slogan: 'slogan',
  domain: '',
  icon: '/favicon.ico',
  appleIcon: '/apple-touch-icon.png',
  theme: {
    headFont: 'Arial, sans-serif',
    primaryColor: '#007bff',
    fontColor: '#333333',
    backgroundColor: '#ffffff',
  },
  gaId: 'G-XXXXXXXXXX',
  plausible: 'game-portal.com',
  navbarItems: [
    {
      title: 'home',
      href: '/',
    },
    {
      title: 'guide',
      href: '/guide',
    },
    {
      title: 'information',
      href: '/t',
    },
  ],
  gameType: 'iframe',
  gameIframeUrl: '',
  gameDownloadBg: '',
  gameDownloadUrl: 'https://example.com/download',
  isShowFAQs: true,
  isShowVideo: true,
  isShowGuide: true,
  videos: [
    {
      title: 'Game Tutorial',
      url: 'https://www.youtube.com/watch?v=T4DFKOlrXCQ',
    },
    {
      title: 'Gameplay Preview',
      url: 'https://www.youtube.com/watch?v=NcHyE_N1QDI',
    },
    {
      title: 'Game Tutorial',
      url: 'https://www.youtube.com/watch?v=T4DFKOlrXCQ',
    },
    {
      title: 'Gameplay Preview',
      url: 'https://www.youtube.com/watch?v=NcHyE_N1QDI',
    },
    {
      title: 'Game Tutorial',
      url: 'https://www.youtube.com/watch?v=T4DFKOlrXCQ',
    },
    {
      title: 'Gameplay Preview',
      url: 'https://www.youtube.com/watch?v=NcHyE_N1QDI',
    },
  ],
  isShowComments: true,
  isShowTweets: false,
  useRealTweets: true,
  tweets: [''],
  comments: [
    {
      author: 'Player123',
      role: '',
      content: 'Great game! Love the graphics and gameplay.',
      avatar: '/images/avatars/player1.jpg',
    },
    {
      author: 'GamerGirl',
      role: '',
      content: 'The tutorial was very helpful. Thanks!',
      avatar: '/images/avatars/player2.jpg',
    },
    {
      author: 'GamerGirl',
      role: '',
      content: 'The tutorial was very helpful. Thanks!',
      avatar: '/images/avatars/player2.jpg',
    },
    {
      author: 'Player123',
      role: '',
      content: 'Great game! Love the graphics and gameplay.',
      avatar: '/images/avatars/player1.jpg',
    },
    {
      author: 'GamerGirl',
      role: '',
      content: 'The tutorial was very helpful. Thanks!',
      avatar: '/images/avatars/player2.jpg',
    },
    {
      author: 'GamerGirl',
      role: '',
      content: 'The tutorial was very helpful. Thanks!',
      avatar: '/images/avatars/player2.jpg',
    },
  ],
  isShowRecommendation: true,
  friendLinks: [
    {
      title: 'Gaming Community',
      url: 'https://gaming-community.com',
    },
    {
      title: 'Game News',
      url: 'https://game-news.com',
    },
  ],
};
