import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import GlobalLayout from '@/pages/_layout';
import MyselfPage from './pages/Mypage/trade/myself';

const MainPage = lazy(() => import('@/pages/Main'));
const LoginPage = lazy(() => import('@/pages/Login'));
const SignUpPage = lazy(() => import('@/pages/SignUp'));
const AgentSignUpPage = lazy(() => import('@/pages/SignUp/AgentSignUp'));
const MyPage = lazy(() => import('@/pages/Mypage'));
const MyPageHome = lazy(() => import('@/pages/Mypage/home'));
const MyPageTradeScrap = lazy(() => import('@/pages/Mypage/trade/scrap'));
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
            element: <MyPageHome />,
          },
          {
            path: 'trade/myself',
            element: <MyselfPage />,
          },
          {
            path: 'trade/save',
            element: <div>save</div>,
          },
          {
            path: 'trade/scrap',
            element: <MyPageTradeScrap />,
          },
          {
            path: 'community/write',
            element: <div>write</div>,
          },
          {
            path: 'community/comment',
            element: <div>comment</div>,
          },
          {
            path: 'community/like',
            element: <div>like</div>,
          },
          {
            path: 'setting',
            element: <div>setting</div>,
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
