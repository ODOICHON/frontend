export {};

declare global {
  type User = {
    id: string;
    email: string;
    nick_name: string;
    phone_num: string;
    authority: 'USER' | 'ADMIN';
    userType: 'NONE' | 'AGENT' | 'WEB' | 'SERVER';
    age: string;
  };

  type Token = {
    access_token: string;
  };
}
