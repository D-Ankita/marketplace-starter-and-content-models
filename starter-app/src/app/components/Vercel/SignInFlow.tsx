import { useEffect, useState, useMemo } from 'react';
import { Line } from '@contentstack/venus-components';
import land from '../../assets/land.svg';
import logo from '../../assets/logo.svg';
import AppLoader from './AppLoader';
import AppHeader from './AppHeader';
import { DatacenterItem, fetchDataCenter } from '../../helper/vercel';
import './styles.scss';
import {alertUserBeforeUnload} from "../../common/constants";

const { REACT_APP_BASE_URL } = process.env;
const Header = () => (
  <div className="header-wrapper">
    <div className="bg-img">
      <img src={logo} alt="" />
    </div>
    <span className="title">Contentstack</span>
    <span className="sub-title">Choose your data center</span>
  </div>
);

const Footer = () => (
  <div className="footer-wrapper">
    <span className="title">Can't find your data center? Contact support.</span>
    <span className="sub-title">
      <a href="https://www.contentstack.com/legal/terms-of-service/" target="_blank" rel="noreferrer">
        Terms & conditions
      </a>{' '}
      •{' '}
      <a href="https://www.contentstack.com/legal/privacy/" target="_blank" rel="noreferrer">Privacy policy</a>
    </span>
  </div>
);

const dataCenterClick = (value, state) => {
  window.removeEventListener('beforeunload', alertUserBeforeUnload);
  window.location.href = `${REACT_APP_BASE_URL}/vercel/start?datacenter=${value}&state=${state}`;
};

const datacenterList = (datacenters: DatacenterItem[], state) => {
  return datacenters.map(({ title, value, host }, index) => (
    <div key={`${index}-${title}`}>
      <div
        className="data-center-wrapper"
        onClick={() => dataCenterClick(value, state)}
      >
        <div className="img-wrapper">
          <div className="bg-img">
            <img src={land} alt="" />
          </div>
        </div>
        <div className="data-center">
          <span className={'title'}>{title}</span>
          <span className={'value'}>{host}</span>
        </div>
      </div>
      <Line type="solid" />
    </div>
  ));
};

const SignInFlow = ({ params }) => {
  const { state } = params;
  const [dataCenters, setDataCenters] = useState<any>([]);
  const dataCenterList = useMemo(
    () => (dataCenters && state ? datacenterList(dataCenters, state) : null),
    [dataCenters, state],
  );

  useEffect(() => {
    fetchDataCenter().then((res: any) => {
      setDataCenters(res);
    });
  }, []);

  useEffect(() => {
    window.addEventListener('beforeunload', alertUserBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', alertUserBeforeUnload);
    }
  },[]);

  return dataCenters.length === 0 ? (
    <AppLoader />
  ) : (
    <div className="vercel-ui-wrapper">
      <AppHeader />
      <div className="sign-in-page">
        <Header />
        {dataCenterList}
        <Footer />
      </div>
    </div>
  );
};

export default SignInFlow;
