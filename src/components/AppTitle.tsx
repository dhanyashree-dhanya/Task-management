import React, { useState } from "react";
import BackButton from "../assets/BackButton.png";
import '../styles.css';

interface Props {
    title: string;
    backButton: boolean;
  onBackClick: () => void;
}

const AppTitle: React.FC<Props> = ({ title, backButton,onBackClick }) => {
 
  return (
    <div className="todo-header">
        {backButton && <span className="back-button" onClick={onBackClick}>
            <img src={BackButton} alt="Back" />
            </span>}
        {title}</div>
  );
};

export default AppTitle;