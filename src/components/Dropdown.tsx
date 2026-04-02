import { useState, useEffect, useRef } from "react";
import type { Status } from "../types/index";
import '../styles.css';
import dropdownIcon from "../assets/Vector.png";
import { STATUS_OPTIONS } from "../constants";

interface Props {
  status: Status;
  onStatusChange: (status: Status) => void;
}

const Dropdown: React.FC<Props> = ({ status, onStatusChange }) => {
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const statusSelectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        statusSelectRef.current &&
        !statusSelectRef.current.contains(event.target as Node)
      ) {
        setIsStatusOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);



  return (
     <div className="status-select-wrap">
        <div className="custom-select" ref={statusSelectRef}>
          <button
            type="button"
            className="custom-select-trigger"
            onClick={() => setIsStatusOpen((s) => !s)}
          >
            <div style={{display:"flex", flexDirection:"row", gap:"8px"}}>
              <div
                className="status-badge"
                style={{
                  background: STATUS_OPTIONS.find((x) => x.value === status)?.color,
                }}
              />
              <div>{STATUS_OPTIONS.find((x) => x.value === status)?.label}</div>
            </div>
            <div className={isStatusOpen ? "dropdown-icon open" : "dropdown-icon"}>
              <img src={dropdownIcon} alt="Toggle dropdown" />
            </div>
          </button>

          {isStatusOpen && (
            <ul className="custom-options">
              {STATUS_OPTIONS.map((option) => (
                <li key={option.value}>
                  <button
                    type="button"
                    className={`custom-option ${status === option.value ? "selected" : ""}`}
                    onClick={() => {
                      onStatusChange(option.value);
                      setIsStatusOpen(false);
                    }}
                  >
                    <span className="status-badge" style={{ background: option.color }} />
                    {option.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
  );
};

export default Dropdown;