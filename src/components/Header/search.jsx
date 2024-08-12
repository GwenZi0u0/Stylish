import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { theme } from "../../theme";
import SearchImg from "../../assets/icon/search.png";

const SearchContainer = styled.form`
  display: flex;
  align-items: center;
  flex-direction: row;
  position: relative;
  cursor: text;

  @media screen and (max-width: 1279.9px) {
    display: flex;
    position: absolute;
    top: 0;
    width: 95vw;
  }
`;

const SearchInput = styled.input`
  display: flex;
  background-color: ${theme.colors.primaryColor};
  border: none;
  color: ${theme.colors.brownColor};
  font-size: 20px;
  line-height: 24px;
  outline: 0;
  border: 1px solid #979797;
  width: 214px;
  height: 44px;
  padding: 10px 46px 10px 20px;
  margin: 28px 0 28px 0;
  border-radius: 20px;
  z-index: 40;

  &::placeholder {
    color: var(--brown-color);
  }

  @media screen and (max-width: 1279.9px) {
    display: ${(props) => (props.$show ? "flex" : "none")};
    width: 100%;
    height: 42px;
    padding: 8px 42px 8px 20px;
    margin: 5px 0;
  }
`;

const SearchIcon = styled.img`
  position: absolute;
  right: 10px;
  width: 44px;
  height: 44px;
  z-index: 41;

  @media screen and (max-width: 1279.9px) {
    display: block !important;
    width: 40px;
    height: 40px;
    right: 6px;
    top: 5px;
  }
`;

const Search = () => {
  const [showInput, setShowInput] = useState(false);
  const [isScreen, setIsScreen] = useState(window.innerWidth <= 1279.9);
  const containerRef = useRef(null);

  let urlParams = location.href;
  let url = new URL(urlParams);

  const submitSearch = (e) => {
    if (e.key == "Enter") {
      let searchValue = e.target.value;
      if (searchValue !== "") {
        url.searchParams.set("keyword", searchValue);
        url.pathname = "/index.html";
        location.href = url.toString();
      }
    }
  };

  const handleResize = () => {
    setIsScreen(window.innerWidth <= 1279.9);
    if (window.innerWidth > 1280) {
      setShowInput(true);
    }
  };

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setShowInput(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleIconClick = (event) => {
    event.preventDefault();
    if (window.innerWidth <= 1279.9) {
      setShowInput(!showInput);
    }
  };

  return (
    <SearchContainer ref={containerRef}>
      {(isScreen || showInput) && (
        <SearchInput
          type="text"
          placeholder="西裝"
          onKeyDown={submitSearch}
          $show={showInput}
        />
      )}
      <SearchIcon src={SearchImg} onClick={handleIconClick} />
    </SearchContainer>
  );
};

export default Search;
