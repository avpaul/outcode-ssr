import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const TabContent = styled.div`
  margin-left: 8px;
  margin-right: 8px;
`;
const TabHeaderButton = styled.button`
  display: inline-block;
  height: 36px;
  padding: 0 8px;
  margin: 8px;
  font-family: inherit;
  text-transform: uppercase;
  font-weight: 600;
  text-align: center;
  font-size: 14px;
  line-height: 36px;
  text-decoration: none;
  box-shadow: none;
  border: none;
  border-radius: 0;
  cursor: pointer;
  color: #17223b;

  &:focus {
    outline: none;
  }
  &:hover {
    color: #ffffff;
    background-color: #17223b;
  }
  &.tab-active {
    border: 1px solid #17223b;
  }
  @media (prefers-color-scheme: dark) {
    background-color: transparent;
    color: #ffffff;
    &.tab-active {
      border-color: #ffffff;
    }
    &:hover {
      background-color: #202124;
    }
  }
`;

const ReloadBtn = styled.button`
  min-width: 64px;
  height: 36px;
  padding: 0 16px;
  text-transform: uppercase;
  font-family: inherit;
  font-weight: 600;
  text-align: center;
  font-size: 14px;
  line-height: 36px;
  text-decoration: none;
  box-shadow: none;
  border: 1px solid #17223b;
  cursor: pointer;
  color: #17223b;

  &:focus {
    outline: none;
  }
  &:hover {
    color: #ffffff;
    background-color: #17223b;
  }
  @media (prefers-color-scheme: dark) {
    background-color: transparent;
    color: #ffffff;
    border-color: #ffffff;
  }
`;

const TabContainer = ({ tabs, tabContent }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const renderTabHeadings = tabHeadings => {
    return tabHeadings.map(heading => (
      <TabHeaderButton
        key={heading}
        type="button"
        onClick={() => {
          setActiveTab(heading);
        }}
        className={activeTab === heading ? 'tab-active' : ''}
      >
        {heading}
      </TabHeaderButton>
    ));
  };
  return (
    <section>
      <div>{renderTabHeadings(tabs)}</div>
      <TabContent>{tabContent[activeTab]}</TabContent>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          padding: 8
        }}
      >
        <ReloadBtn>
          <i className="zmdi zmdi-replay" />
          &nbsp; load more
        </ReloadBtn>
      </div>
    </section>
  );
};

TabContainer.propTypes = {
  tabs: PropTypes.arrayOf(String).isRequired,
  tabContent: PropTypes.objectOf(PropTypes.any).isRequired
};

export default TabContainer;
