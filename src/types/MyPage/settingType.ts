import { settingStep } from '@/constants/myPage';

export type SettingStep = (typeof settingStep)[number];

export type SettingInfoData = {
  title: string;
  subTitle: string;
  component: (
    setState: React.Dispatch<React.SetStateAction<SettingStep>>,
  ) => JSX.Element;
};

export type SettingInfo = {
  certification: SettingInfoData;
  editInfo: SettingInfoData;
  withdraw: SettingInfoData;
};
