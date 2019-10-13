import React from "react";
import styled from "styled-components";

const SearchBar = styled.div`
  position: absolute;
  top: 50%;
  bottom: 50%;
  right: 0;
  height: 36px;
  width: 600px;
  transform: translateY(-50%);
  background-color: #ffffff;
  border-radius: 18px;
  overflow: hidden;
  z-index: 1000;
`;

const CloseButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  display: inline-block;
  height: 36px;
  width: 36px;
  font-weight: 200;
  text-align: center;
  font-size: 28px;
  line-height: 36px;
  box-shadow: none;
  cursor: pointer;
  background-color: transparent;
  color: #17223b;
  border: none;
  border-radius: 50%;

  &:focus {
    outline: none;
  }
  &:hover {
    background-color: #999999;
    font-weight: 300;
    font-size: 32px;
    transition: font-weight 0.5s ease-in-out, font-size 0.5s ease-in-out;
  }
`;
const InputHolder = styled.div`
  position: relative;
  width: 100%;
  background-color: #99999936;
`;

const Input = styled.input`
  display: inline-block;
  width: 100%;
  padding: 8px 16px;
  font-size: 18px;
  font-weight: 200;
  border: none;
  background-color: #99999936;
  color: #17223b;

  &:focus {
    outline: none;
  }
`;

const Search = ({ closeSearch }) => {
  return (
    <SearchBar>
      <InputHolder >
        <Input placeholder="What about..."/>
        <CloseButton onClick={() => closeSearch()}>&#215;</CloseButton>
      </InputHolder>
    </SearchBar>
  );
};

export default Search;
