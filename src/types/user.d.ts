export {};

declare global {
  type User = {
    id: string;
    userName: string;
    email: string;
    nick_name: string;
    phone_num: string;
    authority: 'USER' | 'ADMIN';
    userType: 'NONE' | 'AGENT' | 'WEB' | 'SERVER';
    age: string;
    profile_image_url?: string | null;
  };

  type Token = {
    access_token: string;
  };
}
