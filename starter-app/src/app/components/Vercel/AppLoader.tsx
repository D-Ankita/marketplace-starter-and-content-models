import { FullPageLoader } from '@contentstack/venus-components';

const AppLoader = () => {
  return (
    <div style={{ fontFamily: 'inter' }}>
      <FullPageLoader resourceName="Venus"></FullPageLoader>
    </div>
  );
};

export default AppLoader;
