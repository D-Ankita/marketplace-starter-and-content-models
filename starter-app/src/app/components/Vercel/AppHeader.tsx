import logo from '../../assets/logo.svg';

const AppHeader = () => {
  return (
    <div className="app-header">
      <img src={logo} alt="" />
      <span className="title">Contentstack</span>
    </div>
  );
};

export default AppHeader;
