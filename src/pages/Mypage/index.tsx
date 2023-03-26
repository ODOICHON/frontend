import userStore from '@/store/userStore';
import { Navigate } from 'react-router-dom';

export default function MyPage() {
  const { tokens } = userStore();

  if (!tokens) return <Navigate to="/login" />;
  return <div></div>;
}
