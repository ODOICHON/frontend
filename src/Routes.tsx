import { RouteObject } from 'react-router-dom';
import GlobalLayout from '@/pages/_layout';
import CommunityPage from './pages/Community';
import CommunityBoardPage from './pages/Community/Board';
import CommunityBoardDetailPage from './pages/Community/Detail';
import CommunityWritePage from './pages/Community/Write';
import IntroducePage from './pages/Introduce';
import IntroBoardPage from './pages/Introduce/Board';
import IntroWritePage from './pages/Introduce/Write';
import LoginPage from './pages/Login';
import MainPage from './pages/Main';
import MyPage from './pages/MyPage';
import MyCommentsPage from './pages/MyPage/community/comments';
import MyLikesPage from './pages/MyPage/community/likes';
import MyWritePage from './pages/MyPage/community/write';
import MyHomePage from './pages/MyPage/home';
import MySettingsPage from './pages/MyPage/setting';
import CertificateMember from './pages/MyPage/setting/CertificateMember';
import EditMember from './pages/MyPage/setting/EditMember';
import EditPassword from './pages/MyPage/setting/EditPassword';
import WithdrawalFromMembership from './pages/MyPage/setting/WithdrawalFromMembership';
import MySelfPage from './pages/MyPage/trade/myself';
import MySavesPage from './pages/MyPage/trade/saves';
import MyScrapPage from './pages/MyPage/trade/scrap';
import NotFoundPage from './pages/NotFound';
import SignUpPage from './pages/SignUp';
import AgentSignUpPage from './pages/SignUp/AgentSignUp';
import TradePage from './pages/Trade';
import TradeBoardPage from './pages/Trade/Board';
import TradeProcessPage from './pages/Trade/Process';
import TradeWritePage from './pages/Trade/Write';
import TradeLayoutPage from './pages/Trade/_layout';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <GlobalLayout />,
    children: [
      { index: true, element: <MainPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'signup', element: <SignUpPage /> },
      { path: 'agentSignup', element: <AgentSignUpPage /> },
      {
        path: 'myPage',
        element: <MyPage />,
        children: [
          {
            path: 'home',
            element: <MyHomePage />,
          },
          {
            path: 'trade/myself',
            element: <MySelfPage />,
          },
          {
            path: 'trade/saves',
            element: <MySavesPage />,
          },
          {
            path: 'trade/scrap',
            element: <MyScrapPage />,
          },
          {
            path: 'community/write',
            element: <MyWritePage />,
          },
          {
            path: 'community/comment',
            element: <MyCommentsPage />,
          },
          {
            path: 'community/likes',
            element: <MyLikesPage />,
          },
          {
            path: 'setting',
            element: <MySettingsPage />,
            children: [
              { index: true, element: <CertificateMember /> },
              {
                path: 'edit',
                element: <EditMember />,
              },
              {
                path: 'withdrawal',
                element: <WithdrawalFromMembership />,
              },
              {
                path: 'password',
                element: <EditPassword />,
              },
            ],
          },
        ],
      },
      { path: 'introduce', element: <IntroducePage /> },
      { path: 'intro_write', element: <IntroWritePage /> },
      { path: 'intro_board/:id', element: <IntroBoardPage /> },
      {
        path: 'community',
        element: <CommunityPage />,
        children: [
          {
            path: ':category',
            element: <CommunityBoardPage />,
          },
          {
            path: ':category/:id',
            element: <CommunityBoardDetailPage />,
          },
          {
            path: 'write/:category',
            element: <CommunityWritePage />,
          },
        ],
      },
      {
        path: 'trade',
        element: <TradeLayoutPage />,
        children: [
          {
            index: true,
            element: <TradePage />,
          },
          {
            path: 'trade_board/:id',
            element: <TradeBoardPage />,
          },
          {
            path: 'write',
            element: <TradeWritePage />,
          },
          {
            path: 'process',
            element: <TradeProcessPage />,
          },
        ],
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
];

export const pages = [{ route: '/' }];
