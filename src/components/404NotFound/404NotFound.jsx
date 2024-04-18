import React from 'react';
import './404NotFound.css';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {

    const navigate = useNavigate();

  return (
    <div id="total-div">
      <div className="mobileImage">
        <img src="/src/assets/images/404image.svg" alt="Not Found" />
      </div>
      <div id='text-div'>
        <h1 className="title">Something is not right...</h1>
        <p className="dimmed">
          Page you are trying to open does not exist. You may have mistyped the address, or the
          page has been moved to another URL. If you think this is an error, contact support.
        </p>
        <button className="control" onClick={() => {navigate("/");}}>Get back to home page</button>
      </div>
      <div className="desktopImage">
        <img src="/src/assets/images/404image.svg" alt="Not Found" />
      </div>
    </div>
  );
}

