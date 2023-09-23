import {
  OAuthCard,
  OAuthCardContent,
  OAuthCardFooter,
  Button,
  Paragraph,
  ClipBoard,
  Icon,
} from '@contentstack/venus-components';
import { ReactComponent as Denied } from '../../assets/denied.svg';
import { ReactComponent as BackIcon } from '../../assets/back-icon.svg';
import './style.scss';

export const AuthorizationCard = ({ redirectUrl }) => {
  return (
    <div className="Authorization-Card">
      <OAuthCard>
        <OAuthCardContent className="Authorization-Accordion d-flex">
          <div className="Authorization-error-details">
            <div className="Authorization-error-fix">
              <div>
                <Denied />
                <p className="mt-15">
                  <b>Denied Access</b>
                </p>
              </div>
              <p className="mt-10">
                To proceed with installation, user should grant permissions to{' '}
                <strong>Contentstack Starter</strong>
              </p>
            </div>
          </div>
          <div className="Authorization-error-info">
            <p>
              Try going back and authorizing again. For help,{' '}
              <a
                href="mailto:support@contentstack.com"
                className="contact-color"
              >
                contact support
              </a>
            </p>
          </div>
          <Paragraph text="Error details" className="Authorization-error" />
          <div className="Authorization-error-code">
            <div className="error-wrapper">
              <div className="copyError">
                <ClipBoard copyText="Permission Denied - No user permissions">
                  <Icon
                    icon="CopyWhite"
                    className="ml-5 cursor-pointer"
                    size="tiny"
                  />
                </ClipBoard>
              </div>
              <div className="error font-small fontWeightRegular">
                <span>Permission Denied - No user permissions</span>
              </div>
            </div>
          </div>
        </OAuthCardContent>
        <OAuthCardFooter className="Authorizations-card-footer">
          <Button
            data-testid="modal-form-cancel"
            buttonType="primary"
            onClick={() => {
              window.location.href = redirectUrl;
            }}
          >
            <BackIcon />
            <span> Go back </span>
          </Button>
        </OAuthCardFooter>
      </OAuthCard>
    </div>
  );
};
