import removeImg from '@/assets/common/remove.png';
import { opacityVariants } from '@/constants/variants';
import useInput from '@/hooks/useInput';
import { restFetcher } from '@/queryClient';
import userStore from '@/store/userStore';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';

type LoginForm = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const { mutate: loginAPI } = useMutation(
    (form: LoginForm) =>
      restFetcher({
        method: 'POST',
        path: '/api/v1/users/sign-in',
        body: form,
      }),
    {
      onSuccess: (res) => {
        if (!res || res.code !== 'SUCCESS') throw Error;
        const tokens: Tokens = {
          access_token: res.data.access_token,
          refresh_token: res.data.refresh_token,
        };
        setTokens(tokens);
        navigate('/');
      },
      onError(err) {
        console.log(err);
      },
    },
  );
  const { setTokens } = userStore();
  const navigate = useNavigate();
  const [id, handleId, setId] = useInput('');
  const [password, handlePassword, setPassword] = useInput('');
  const handleRemove = (e: React.SyntheticEvent) => {
    if (e.currentTarget.parentElement?.id === 'idContainer') setId('');
    if (e.currentTarget.parentElement?.id === 'passwordContainer')
      setPassword('');
    else return;
  };
  const handleLogin = () => {
    if (id === '' || password === '') {
      alert('아이디 또는 비밀번호를 입력하세요.');
      return;
    }
    const form: LoginForm = {
      email: id,
      password,
    };
    loginAPI(form);
  };
  return (
    <motion.div
      className={styles.container}
      variants={opacityVariants}
      initial="initial"
      animate="mount"
    >
      <div className={styles.title}>로그인</div>
      <div className={styles.contents}>
        <div id="idContainer" className={styles.inputContainer}>
          <input
            className={styles.inputBox}
            type="text"
            value={id}
            onChange={handleId}
            placeholder="아이디"
          />
          {id !== '' && (
            <img
              className={styles.removeImg}
              src={removeImg}
              onClick={handleRemove}
            />
          )}
        </div>
        <div id="passwordContainer" className={styles.inputContainer}>
          <input
            className={styles.inputBox}
            type="password"
            value={password}
            onChange={handlePassword}
            placeholder="비밀번호"
          />
          {password !== '' && (
            <img
              className={styles.removeImg}
              src={removeImg}
              onClick={handleRemove}
            />
          )}
        </div>
        <button className={styles.loginButton} onClick={handleLogin}>
          로그인
        </button>
        <span className={styles.subContainer}>
          <p>회원으로 가입하고 싶으신가요?</p>
          <Link to="/signup">회원가입</Link>
        </span>
      </div>
    </motion.div>
  );
}
