import React, { useState, useEffect } from "react";
import stack from "../../common/contentstack";
import { InfoContainer, Tag, Link, SkeletonTile, Icon } from "@contentstack/venus-components";
import { contentModelName_Dev, contentModelName_Prod, contentModelName_Stag } from "app/common/mapper";
import "./contentModelSidebar.style.scss";
import { useQuery } from "@tanstack/react-query";
import { ReactComponent as ContentModelIcon } from "../../assets/ContentModelLogo.svg";

let staticExternalLinks = [
  {
    type: "View in Marketplace",
    url: "https://app.contentstack.com/#!/marketplace/starters",
  },
  {
    type: "Terms of Service",
    url: "https://www.contentstack.com/legal/marketplace-terms-of-service-for-customers/",
  },
  {
    type: "Privacy policy",
    url: "https://www.contentstack.com/legal/privacy/",
  },
  {
    type: "Support",
    url: "https://www.contentstack.com/company/contact-us/",
  },
];

const ExternalLinks = () => {
  return (
    <div className="external-links">
      <span className="sub-heading">To learn more, visit the following sites:</span>
      <ul>
        {staticExternalLinks.map((link, key) => {
          return (
            <li key={key}>
              <Link href={link.url} type="external" fontSize={"small"}>
                {link.type}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export const ContentModelSideBar = () => {
  const CM_ContentTypeUid = process.env.REACT_APP_CONTENTSTACK_CM_CONTENT_TYPE_UID as string;

  async function fetchEntry() {
    let urlParams = new URLSearchParams(window.location.search);
    let params = Object.fromEntries(urlParams);
    let frameWorkDetails: any;
    switch (process.env.REACT_APP_NODE_ENVIRONMENT) {
      case "development":
        frameWorkDetails = await stack.getEntry(CM_ContentTypeUid, contentModelName_Dev.get(params?.contentModelName));
        break;
      case "production":
        frameWorkDetails = await stack.getEntry(CM_ContentTypeUid, contentModelName_Prod.get(params?.contentModelName));
        break;
      case "staging":
        frameWorkDetails = await stack.getEntry(CM_ContentTypeUid, contentModelName_Stag.get(params?.contentModelName));
        break;
      default:
        frameWorkDetails = await stack.getEntry(CM_ContentTypeUid, contentModelName_Dev.get(params?.contentModelName));
        break;
    }

    const staticLinksFirst = staticExternalLinks.slice(0, 1);
    const staticLinksSecond = staticExternalLinks.slice(1);
    staticExternalLinks = staticLinksFirst.concat(frameWorkDetails?.static_links, staticLinksSecond);
    return frameWorkDetails;
  }
  const { data: frameWorkDetails } = useQuery(["entry"], fetchEntry);

  let rows = [
    {
      title: "Category",
      content: (
        <>
          {frameWorkDetails?.category.map((category, key) => {
            return (
              <div className="category-tags">
                <Tag tags={[category.title]} isDisabled key={key} />
              </div>
            );
          })}
        </>
      ),
    },
    {
      title: "Built By",
      content: (
        <div className="build-description">
          {frameWorkDetails?.built_by?.map((build, key) => {
            return (
              <a href="https://www.contentstack.com/" key={key} className="build-links">
                <img src={build.logo?.url} alt="Contentstack logo"></img>
                <span>Contentstack</span>
              </a>
            );
          })}
        </div>
      ),
    },
    {
      title: "Links",
      content: <ExternalLinks />,
    },
  ];

  const Skeletons = ({ numberOfTiles, width, height }) => {
    const arr = Array.from(Array(numberOfTiles), (_, index) => index + 1);
    return (
      <div>
        {arr.map((key) => (
          <div className="flex" key={key}>
            <SkeletonTile
              numberOfTiles={1}
              tileBottomSpace={0}
              tileHeight={height}
              tileRadius={0}
              tileTopSpace={10}
              tileWidth={width}
              tileleftSpace={0}
            />
          </div>
        ))}
      </div>
    );
  };

  return frameWorkDetails ? (
    <div className="sidebar-wrapper">
      <div className="image-card">
        <div className="image">
          <img src={frameWorkDetails.banner_image?.url} alt="starter app logo" />
        </div>
        <div className="logo">
          <ContentModelIcon />
        </div>
        <div className="description">
          <h6>{frameWorkDetails.title}</h6>
          <p>{frameWorkDetails.summary}</p>
        </div>
      </div>
      <div className="info">
        <InfoContainer rows={rows} />
      </div>
    </div>
  ) : (
    <div className="sidebar-wrapper">
      {<Skeletons numberOfTiles={1} width={300} height={300} />}
      {<Skeletons numberOfTiles={4} width={100} height={10} />}
      <div className="info">{<Skeletons numberOfTiles={12} width={250} height={10} />}</div>
    </div>
  );
};