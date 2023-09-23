import { useEffect, useState } from 'react';
// The URL of this page should be added as Configuration URL in your integration settings on Vercel
const Configure = () => {
  const [configurationId, setConfigurationId] = useState();

  useEffect(() => {
    let urlParams = new URLSearchParams(window.location.search);
    let configId: any = urlParams.get('configurationId');
    setConfigurationId(configId);
  }, []);

  return (
    <div className="space-y-2 text-center">
      <h1 className="text-lg font-medium">Example Integration</h1>
      <p className="max-w-lg">
        This page is used to show some configuration options for the
        configuration with the id{' '}
        <code
          className="text-sm inline-block"
          style={{ color: '#F81CE5', minWidth: 245 }}
        >
          {configurationId ? configurationId : ''}
        </code>
      </p>
    </div>
  );
};

export default Configure;
