import axios from 'axios';

// 회원탈퇴 api
export const withdrawalAPI = async (reason: string[], content: string) => {
  return axios.post(`/users/withdrawal`, { reason, content });
};
