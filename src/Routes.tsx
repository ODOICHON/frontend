import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import GlobalLayout from '@/pages/_layout';
import MyPage from './pages/Mypage';
import MyCommentsPage from './pages/Mypage/community/comments';

import MyLikesPage from './pages/Mypage/community/likes';
import MyWritePage from './pages/Mypage/community/write';
import MyHomePage from './pages/Mypage/home';
import MySettingsPage from './pages/Mypage/setting';
import CertificateMember from './pages/Mypage/setting/CertificateMember';
import EditMember from './pages/Mypage/setting/EditMember';
import EditPassword from './pages/Mypage/setting/EditPassword';
import WithdrawalFromMembership from './pages/Mypage/setting/WithdrawalFromMembership';
import MySelfPage from './pages/Mypage/trade/myself';
import MySavesPage from './pages/Mypage/trade/saves';
import MyScrapPage from './pages/Mypage/trade/scrap';

const MainPage = lazy(() => import('@/pages/Main'));
const LoginPage = lazy(() => import('@/pages/Login'));
const SignUpPage = lazy(() => import('@/pages/SignUp'));
const AgentSignUpPage = lazy(() => import('@/pages/SignUp/AgentSignUp'));
const IntroducePage = lazy(() => import('@/pages/Introduce'));
const IntroWritePage = lazy(() => import('@/pages/Introduce/Write'));
const IntroBoardPage = lazy(() => import('@/pages/Introduce/Board'));
const CommunityPage = lazy(() => import('@/pages/Community'));
const CommunityBoardPage = lazy(() => import('@/pages/Community/Board'));
const CommunityBoardDetailPage = lazy(() => import('@/pages/Community/Detail'));
const CommunityWritePage = lazy(() => import('@/pages/Community/Write'));
const TradeLayoutPage = lazy(() => import('@/pages/Trade/_layout'));
const TradePage = lazy(() => import('@/pages/Trade'));
const TradeBoardPage = lazy(() => import('@/pages/Trade/Board'));
const TradeWritePage = lazy(() => import('@/pages/Trade/Write'));
const TradeProcessPage = lazy(() => import('@/pages/Trade/Process'));
const NotFoundPage = lazy(() => import('@/pages/NotFound'));
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
        path: 'mypage',
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
                path: 'withdraw',
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
