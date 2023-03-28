import { lazy } from 'react';
import GlobalLayout from '@/pages/_layout';

const MainPage = lazy(() => import('@/pages/Main'));
const LoginPage = lazy(() => import('@/pages/Login'));
const SignUpPage = lazy(() => import('@/pages/SignUp'));
const MyPage = lazy(() => import('@/pages/Mypage'));
const IntroducePage = lazy(() => import('@/pages/Introduce'));
const TradePage = lazy(() => import('@/pages/Trade'));
const CommunityPage = lazy(() => import('@/pages/Community'));

export const routes = [
  {
    path: '/',
    element: <GlobalLayout />,
    children: [
      { index: true, element: <MainPage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/signup', element: <SignUpPage /> },
      { path: '/mypage', element: <MyPage /> },
      { path: '/introduce', element: <IntroducePage /> },
      { path: '/trade', element: <TradePage /> },
      { path: '/community', element: <CommunityPage /> },
    ],
  },
];

export const pages = [{ route: '/' }];
