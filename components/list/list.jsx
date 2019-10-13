import React from 'react';
import styled from 'styled-components';
import './list.scss';

const ListContainer = styled.div``;

const List = ({ children }) => {
  return <ListContainer>{children}</ListContainer>;
};

export default List;
