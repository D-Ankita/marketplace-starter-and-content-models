import {
  Line,
  Button,
  Icon,
  Link,
  InfoContainer,
  Accordion,
} from '@contentstack/venus-components';

import { ReactComponent as VercelLogo } from '../../assets/vercel.svg';
import { ReactComponent as CSLogo } from '../../assets/cs.svg';
import { ReactComponent as GithubLogo } from '../../assets/github.svg';
import { ReactComponent as VercelLogoWhite } from '../../assets/vercel-logo-white.svg';
import { ReactComponent as GithubLogoWhite } from '../../assets/github-white.svg';

type RowProp = {
  title: string;
  content: any;
};
type ButtonDetailsProp = {
  url: string;
  type: 'primary' | 'secondary' | 'tertiary';
  iconFirst: boolean;
  iconName?: string;
  customIcon?: string;
  iconSize?: 'original' | 'tiny' | 'small' | 'large' | 'medium' | 'mini';
  className?: string;
  innerText: string;
};

type CardProps = {
  cardName: string;
  cardLogo: string;
  rows: [RowProp[]] | [RowProp[], RowProp[]];
  buttonDetails?: ButtonDetailsProp[];
};

export const DeploymentLinksCard = ({
  rows,
  cardName,
  cardLogo,
  buttonDetails,
}: CardProps) => {
  return (
    <div className="form">
      <div className="head">
        {cardLogo === 'CSLogo' ? (
          <CSLogo />
        ) : cardLogo === 'VercelLogo' ? (
          <VercelLogo />
        ) : (
          <GithubLogo />
        )}
        <h6>{cardName}</h6>
      </div>
      <Line type="solid" />

      <div className="info">
        {rows?.map((element, idx) => {
          return idx === 0 ? (
            <InfoContainer rows={element} key={idx} />
          ) : (
            <Accordion
              title="Useful Links"
              accordionDataCount={element.length}
              key={idx}
            >
              <InfoContainer rows={element} />
            </Accordion>
          );
        })}
      </div>

      <Line type="solid" />
      <div className="right colored">
        {buttonDetails?.map(btn => {
          return (
            <Link href={btn.url} target="_blank" key={btn.type}>
              <Button buttonType={btn.type}>
                {btn.iconFirst ? (
                  <>
                    {!btn.customIcon && btn.iconName ? (
                      <Icon
                        icon={btn.iconName}
                        size={btn.iconSize}
                        className={btn?.className}
                        withTooltip={false}
                        testId={btn.innerText.replaceAll(' ', '-')}
                      />
                    ) : (
                      <>
                        {btn.customIcon === 'vercel' ? (
                          <VercelLogoWhite />
                        ) : (
                          <GithubLogoWhite />
                        )}
                      </>
                    )}
                    {btn.innerText}
                  </>
                ) : (
                  <>
                    {btn.innerText}
                    {!btn.customIcon && btn.iconName ? (
                      <Icon
                        icon={btn.iconName}
                        size={btn.iconSize}
                        className={btn?.className}
                        withTooltip={false}
                        testId={btn.innerText.replaceAll(' ', '-')}
                      />
                    ) : (
                      <>
                        {btn.customIcon === 'vercel' ? (
                          <VercelLogoWhite />
                        ) : (
                          <GithubLogoWhite />
                        )}
                      </>
                    )}
                  </>
                )}
              </Button>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
