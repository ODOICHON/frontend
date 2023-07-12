import { Navigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import CommunityQuill from '@/components/Community/Quill';
import userStore from '@/store/userStore';
import { opacityVariants } from '@/constants/variants';

function CommunityWritePage() {
  const { category } = useParams();
  const { token } = userStore();

  if (!token) return <Navigate to="/login" />;

  if (category !== 'free_board' && category !== 'advertisement_board')
    return <Navigate to="/community/free_board" />;

  return (
    <motion.div variants={opacityVariants} initial="initial" animate="mount">
      <CommunityQuill queryParam={category} />;
    </motion.div>
  );
}

export default CommunityWritePage;
