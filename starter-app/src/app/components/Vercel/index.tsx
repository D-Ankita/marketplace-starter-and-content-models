import SignInFlow from './SignInFlow';
import LandingPage from './LandingPage';

export default function VercelUICallback(props) {
  const { orgUid, state } = props?.params || {};

  return <>{!orgUid || !state  ?
    <SignInFlow {...props}/> : <LandingPage {...props} />}</>;
}
