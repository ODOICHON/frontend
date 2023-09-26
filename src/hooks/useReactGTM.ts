import { useEffect } from 'react';
import TagManager from 'react-gtm-module';

const GTM_ID = import.meta.env.VITE_GTM_ID;

const GoogleTagManager = () => {
  useEffect(() => {
    TagManager.initialize({ gtmId: GTM_ID });
  }, [GTM_ID]);
};

export default GoogleTagManager;
