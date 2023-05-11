import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import GlobalLayout from '@/pages/_layout';

const MainPage = lazy(() => import('@/pages/Main'));
const LoginPage = lazy(() => import('@/pages/Login'));
const SignUpPage = lazy(() => import('@/pages/SignUp'));
const MyPage = lazy(() => import('@/pages/Mypage'));
const IntroducePage = lazy(() => import('@/pages/Introduce'));
const IntroWritePage = lazy(() => import('@/pages/IntroWrite'));
const IntroBoardPage = lazy(() => import('@/pages/IntroBoard'));
const CommunityPage = lazy(() => import('@/pages/Community'));
const CommunityBoardPage = lazy(() => import('@/pages/Community/Board'));
const TradePage = lazy(() => import('@/pages/Trade'));

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <GlobalLayout />,
    children: [
      { index: true, element: <MainPage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/signup', element: <SignUpPage /> },
      { path: '/mypage', element: <MyPage /> },
      { path: '/introduce', element: <IntroducePage /> },
      { path: '/intro_write', element: <IntroWritePage /> },
      { path: '/intro_board/:id', element: <IntroBoardPage /> },
      {
        path: '/community/',
        element: <CommunityPage />,
        children: [
          {
            path: '/community/:category',
            element: <CommunityBoardPage />,
          },
        ],
      },
      { path: '/trade', element: <TradePage /> },
      { path: '*', element: <div>not found</div> },
    ],
  },
];

export const pages = [{ route: '/' }];
