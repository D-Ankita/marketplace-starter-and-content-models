import { useEffect, useState } from 'react';
import { AuthorizationCard } from '../components/AuthorizationCard';

const AuthorizationError = () => {
  const [redirectUrl, setRedirectUrl] = useState<string>();

  useEffect(() => {
    let urlParams = new URLSearchParams(window.location.search);
    let params = Object.fromEntries(urlParams);
    setRedirectUrl(params.redirect_uri + window.location.hash);
  }, []);
  return <AuthorizationCard redirectUrl={redirectUrl} />;
};

export default AuthorizationError;
