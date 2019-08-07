import React from "react";
import styled from "styled-components";

const Container = styled.div``;

const ModalComponent = ({ children }) => {
  return <Container>{children}</Container>;
};

export default ModalComponent;
