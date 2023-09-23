import { Content } from '../Content/index';
import { SideBar } from '../SideBar';
import { Icon, PageLayout } from '@contentstack/venus-components';
import { ReactComponent as HeaderLogo } from '../../assets/header-logo.svg';
import './style.scss';
import { ContentModelSideBar } from '../ContentModelSideBar';
import { ContentModel } from '../ContentModel';

export const Layout = () => {
  return (
    <div className="wrapper">
      <div className="header">
        <div className="logo">
          <HeaderLogo />
        </div>
      </div>
      <PageLayout
        type="list"
        content={{
          component: (
            <div className="content">
              <Content />
            </div>
          ),
        }}
        leftSidebar={{
          component: <SideBar />,
        }}
      />
    </div>
  );
};

export const ContentModelLayout = () =>{
  return(
    <div className="wrapper">
      <div className="header">
        <div className="logo">
          <HeaderLogo/>
        </div>
      </div>
      <PageLayout type="list"
        content={{
          component: (
            <div className="content">
              <ContentModel />
            </div>
          ),
        }}
        leftSidebar={{
          component: <ContentModelSideBar />,
        }}/>
    </div>
  )
}