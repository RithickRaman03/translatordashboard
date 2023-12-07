import React from "react";
import Translator_Dashboard from "./translator_dashboard";
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <>
      {/* <button id="close-btn">
            <span className="material-symbols-sharp">close</span>
          </button> */}
      <main>
        <aside>
          <div className="sidebar">
            <Link to="/translatorDashboard">
              <button className="google-icon">
                <span className="material-symbols-outlined google-icon">
                  HOME
                </span>
              </button>
              <h4 className="text">DASHBOARD</h4>
            </Link>
            <a className={"icon"}>
              <span class="material-symbols-outlined google-icon">reviews</span>
              <h4 className="text"> VIEW FEEDBACK</h4>
            </a>
            <Link to="/mycompleted">
              <button className="google-icon">
                <span className="material-symbols-outlined google-icon">
                  TASK
                </span>
              </button>
              <h4 className="text">COMPLETED TASK</h4>
            </Link>

            <a className={"icon"}>
              <span className="material-symbols-outlined google-icon">
                question_mark
              </span>
              <h4 className="text">HELP</h4>
            </a>
            <a className={"icon"}>
              <span className="material-symbols-outlined google-icon">
                logout
              </span>
              <h4 className="text">LOGOUT</h4>
            </a>
          </div>
        </aside>
      </main>
    </>
  );
}
