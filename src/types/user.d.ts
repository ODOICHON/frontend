export {};

declare global {
  type UserType = 'NONE' | 'AGENT' | 'WEB' | 'SERVER';

  type User = {
    id: string;
    userName: string;
    email: string;
    nick_name: string;
    phone_num: string;
    authority: 'USER' | 'ADMIN';
    userType: UserType;
    age: string;
    profile_image_url?: string | null;
  };

  type Token = {
    access_token: string;
  };
}
