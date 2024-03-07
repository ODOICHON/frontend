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
    suspenseReason?: string | null;
    reportedAt?: string | null;
    agentCode?: string | null;
    companyName?: string | null;
    companyAddress?: string | null;
    companyPhoneNum?: string | null;
    agentName?: string | null;
    assistantName?: string | null;
  };

  type Token = {
    access_token: string;
  };
}
