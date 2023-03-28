export {};

declare global {
  type User = {
    id: string;
    email: string;
    nick_name: string;
    phone_num: string;
    authority: string;
    age: string;
  };

  type Tokens = {
    access_token: string;
    refresh_token: string;
  };
}
