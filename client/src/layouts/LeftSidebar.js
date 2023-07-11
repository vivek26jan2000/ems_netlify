// @flow
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import SimpleBar from "simplebar-react";

import { getMenuItems } from "../helpers/menu";

// components
import AppMenu from "./Menu";

// images
import logoSm from "../assets/images/logo_sm.png";
import logoDark from "../assets/images/logo-dark.png";
import logoDarkSm from "../assets/images/logo_sm_dark.png";
import logo from "../assets/images/logo.png";
import profileImg from "../assets/images/users/avatar-1.jpg";

/* sidebar content */
const SideBarContent = ({ hideUserProfile }) => {
  return (
    <>
      {!hideUserProfile && (
        <div className="leftbar-user">
          <Link to="/">
            <img
              src={profileImg}
              alt=""
              height="42"
              className="rounded-circle shadow-sm"
            />
            <span className="leftbar-user-name">Dominic Keller</span>
          </Link>
        </div>
      )}
      <AppMenu menuItems={getMenuItems()} />
      <div className="clearfix" />
    </>
  );
};

const LeftSidebar = ({ isCondensed, isLight, hideLogo, hideUserProfile }) => {
  const menuNodeRef = useRef(null);

  /**
   * Handle the click anywhere in doc
   */
  const handleOtherClick = (e) => {
    if (
      menuNodeRef &&
      menuNodeRef.current &&
      menuNodeRef.current.contains(e.target)
    )
      return;
    // else hide the menubar
    if (document.body) {
      document.body.classList.remove("sidebar-enable");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOtherClick, false);

    return () => {
      document.removeEventListener("mousedown", handleOtherClick, false);
    };
  }, []);

  return (
    <>
      <div className="leftside-menu" ref={menuNodeRef}>
        {!hideLogo && (
          <>
            <Link to="/" className="logo text-center logo-light">
              <span className="logo-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-stack-pop"
                  width="44"
                  height="44"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#00abfb"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M7 9.5l-3 1.5l8 4l8 -4l-3 -1.5" />
                  <path d="M4 15l8 4l8 -4" />
                  <path d="M12 11v-7" />
                  <path d="M9 7l3 -3l3 3" />
                </svg>
                <span>AppNeuralShift</span>
                {/* <img src={isLight ? logoDark : logo} alt="logo" height="15" /> */}
              </span>
              <span className="logo-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-stack-pop"
                  width="44"
                  height="44"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#00abfb"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M7 9.5l-3 1.5l8 4l8 -4l-3 -1.5" />
                  <path d="M4 15l8 4l8 -4" />
                  <path d="M12 11v-7" />
                  <path d="M9 7l3 -3l3 3" />
                </svg>
                <span>AppNeuralShift</span>
                {/* <img
                  src={isLight ? logoSm : logoDarkSm}
                  alt="logo"
                  height="15"
                /> */}
              </span>
            </Link>

            <Link
              to="/"
              className="logo text-center logo-dark text-dark text-decoration-none font-20"
              style={{ fontWeight: "600" }}
            >
              <span className="logo-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-stack-pop"
                  width="44"
                  height="44"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#00abfb"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M7 9.5l-3 1.5l8 4l8 -4l-3 -1.5" />
                  <path d="M4 15l8 4l8 -4" />
                  <path d="M12 11v-7" />
                  <path d="M9 7l3 -3l3 3" />
                </svg>
                <span>NSift</span>
                {/* <img src={isLight ? logoDark : logo} alt="logo" height="15" /> */}
              </span>
              <span className="logo-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-stack-pop"
                  width="44"
                  height="44"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#00abfb"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M7 9.5l-3 1.5l8 4l8 -4l-3 -1.5" />
                  <path d="M4 15l8 4l8 -4" />
                  <path d="M12 11v-7" />
                  <path d="M9 7l3 -3l3 3" />
                </svg>
                {/* <img
                  src={isLight ? logoSm : logoDarkSm}
                  alt="logo"
                  height="36"
                /> */}
                {/* <span>AppNeuralShift</span> */}
              </span>
            </Link>
          </>
        )}

        {!isCondensed && (
          <SimpleBar
            style={{ maxHeight: "100%" }}
            timeout={500}
            scrollbarMaxSize={320}
          >
            <SideBarContent
              menuClickHandler={() => {}}
              isLight={isLight}
              hideUserProfile={hideUserProfile}
            />
          </SimpleBar>
        )}
        {isCondensed && (
          <SideBarContent isLight={isLight} hideUserProfile={hideUserProfile} />
        )}
      </div>
    </>
  );
};

LeftSidebar.defaultProps = {
  hideLogo: false,
  hideUserProfile: false,
  isLight: false,
  isCondensed: false,
};

export default LeftSidebar;
