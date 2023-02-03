import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import SideBarLogoutButton from "./SideBarLogoutButton";

import { AiOutlineHome } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { BsPeople } from "react-icons/bs";
import { AiOutlineMessage } from "react-icons/ai";
import { AiOutlineSetting } from "react-icons/ai";

import { user } from "../../Store";
import { useRecoilValue } from "recoil";

const SideBar = () => {
  const LoginUser = useRecoilValue(user);

  const menus1 = [
    { name: "Home", path: "/", icon: <AiOutlineHome size="24" /> },
    {
      name: "My-page",
      path: `/my-page/${LoginUser.userPk}/meeting-list`,
      icon: <BsPerson size="24" />,
    },
    { name: "Group", path: "/grouplist", icon: <BsPeople size="24" /> },
  ];

  const menus2 = [
    { name: "Message", path: "/message", icon: <AiOutlineMessage size="24" /> },
    { name: "Setting", path: "/setting", icon: <AiOutlineSetting size="24" /> },
  ];

  const SideBarLogoutHandler = () => {
    console.log("logout");
  };

  const FirstMenu = menus1.map((menu, index) => {
    return (
      <NavBarStyle
        exact="true"
        style={{
          textDecoration: "none",
          margin: "7px",
          marginLeft: "10px",
          marginRight: "2px",
        }}
        to={menu.path}
        key={index}
      >
        {menu.icon}
      </NavBarStyle>
    );
  });

  const SecondMenu = menus2.map((menu, index) => {
    return (
      <NavBarStyle
        exact="true"
        style={{
          textDecoration: "none",
          margin: "7px",
          marginLeft: "10px",
          marginRight: "2px",
          marginTop: "10px",
        }}
        to={menu.path}
        key={index}
      >
        {menu.icon}
      </NavBarStyle>
    );
  });

  return (
    <Side>
      <Menu>{FirstMenu}</Menu>
      <Menu2>
        {SecondMenu}
        <div style={{ marginTop: "20px" }}>
          <SideBarLogoutButton onClick={SideBarLogoutHandler} />
        </div>
      </Menu2>
    </Side>
  );
};

export default SideBar;

const Side = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  width: 20%;
  height: 95%;
`;

const Menu = styled.div`
  margin-top: 50px;
  width: 20%;
  display: flex;
  flex-direction: column;

`;

const Menu2 = styled.div`
  margin-bottom: 30px;
  width: 20%;
  display: flex;
  flex-direction: column;
`;


const NavBarStyle = styled(NavLink)`
  color: black;
  font-size: 20px;
  outline: invert;
  &:link {
    transition : 0.5s;
    text-decoration: none;
  }
  &:hover {
    color: #10f14c;
  }
  &.active {
    color: #29a846;
  }
`;