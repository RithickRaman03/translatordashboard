import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import Topbar from "./topbar";
import Navbar from "./navbar";
import axios from "axios";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const TranslatorDashboard = () => {
  const todoTitles = ["TASK NAME", " DATE", "TYPE", "PICKED BY", ""];
  const [table1details, setTable1Details] = useState([]);
  const [myQueue, setMyQueue] = useState([]);
  const [draftTable, setDraftTable] = useState([]);
  const [ischanged, setischanged] = useState(true);
  const [completedtable, setcompletedtable] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    audio: false,
    word: false,
    picked: false,
    unpicked: false,
  });
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * 5;
  const indexOfFirstItem = indexOfLastItem - 5;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const currentmyqueue = myQueue.slice(indexOfFirstItem, indexOfLastItem);
  const currentdraft = draftTable.slice(indexOfFirstItem, indexOfLastItem);

  // Change page function
  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);

  useEffect(() => {
    axios
      .get("http://localhost:3008/translator_dashboard")
      .then((response) => {
        const initialTableDetails = response.data.map((row) => ({
          ...row,
          checked: false,
        }));
        setTable1Details(initialTableDetails);
        setFilteredData(initialTableDetails);
        setMyQueue(
          initialTableDetails.filter((item) => {
            return item.id === "2" && item.isdraft === null;
          })
        );
        setDraftTable(
          initialTableDetails.filter((item) => {
            return item.isdraft === true && item.id === "2";
          })
        );
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [ischanged]);

  function getType(file_name) {
    const extension = file_name.split(".").pop();
    return extension === "docx" ? "Document" : "Audio";
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const formattedDate = `${date.getDate()} - ${
      date.getMonth() + 1
    } - ${date.getFullYear()}`;
    return formattedDate;
  }

  const handlepick = (id, file_id) => {
    const data = {
      id: id,
      file_id: file_id,
    };
    axios.put("http://localhost:3008/update", data);
    setischanged(!ischanged);
  };
  const handleStart = (index) => {
    const data = {
      id: index.id,
      file_id: index.file_id,
    };

    setischanged(!ischanged);

    // Make the API call to update the database
    axios.put("http://localhost:3008/updateTodraft", data);
  };
  function getType(file_name) {
    const extension = file_name.split(".").pop();
    return extension === "docx" ? "Document" : "Audio";
  }
  function isPicked(name) {
    return name != null ? "Picked" : "Unpicked";
  }

  const applyFilters = () => {
    let filtered = table1details.filter((item) => {
      const fileType = getType(item.file_name);
      const userPicked = isPicked(item.first_name);
      return (
        (!filterOptions.picked || userPicked === "Picked") &&
        (!filterOptions.unpicked || userPicked === "Unpicked") &&
        (!filterOptions.audio || fileType === "Audio") &&
        (!filterOptions.word || fileType === "Document")
      );
    });

    setFilteredData(filtered);
  };

  console.log(filteredData);

  return (
    <div>
      <Topbar />
      <div className="transcontent">
        <Navbar />
        <div className="transbody">
          <h3>OVERVIEW</h3>
          <div className="transfirstrow">
            <div className="dash1table">
              <div className="filter">
                <Popup
                  trigger={
                    <button>
                      <span class="material-symbols-outlined">filter_list</span>
                    </button>
                  }
                  position="bottom center"
                >
                  {(close) => (
                    <div className="modal">
                      <div className="content">
                        <input
                          type="checkbox"
                          id="audio"
                          name="audio"
                          value="audio"
                          checked={filterOptions.audio}
                          onChange={(e) =>
                            setFilterOptions(
                              {
                                ...filterOptions,
                                audio: e.target.checked,
                              },
                              setFilteredData([])
                            )
                          }
                        />
                        <label htmlFor="audio">AUDIO FILES</label>
                        <br />
                        <input
                          type="checkbox"
                          id="word"
                          name="word"
                          value="word"
                          checked={filterOptions.word}
                          onChange={(e) =>
                            setFilterOptions(
                              {
                                ...filterOptions,
                                word: e.target.checked,
                              },
                              setFilteredData([])
                            )
                          }
                        />
                        <label htmlFor="word">WORD FILES</label>
                        <br />
                        <input
                          type="checkbox"
                          id="picked"
                          name="picked"
                          value="picked"
                          checked={filterOptions.picked}
                          onChange={(e) =>
                            setFilterOptions(
                              {
                                ...filterOptions,
                                picked: e.target.checked,
                              },
                              setFilteredData([])
                            )
                          }
                        />
                        <label htmlFor="picked">PICKED FILES</label>
                        <br />
                        <input
                          type="checkbox"
                          id="unpicked"
                          name="unpicked"
                          value="unpicked"
                          checked={filterOptions.unpicked}
                          onChange={(e) =>
                            setFilterOptions(
                              {
                                ...filterOptions,
                                unpicked: e.target.checked,
                              },
                              setFilteredData([])
                            )
                          }
                        />
                        <label htmlFor="unpicked">UNPICKED FILES</label>
                        <br />
                      </div>
                      <div>
                        <button
                          className="FilterApplyButton"
                          onClick={() => {
                            applyFilters();
                            close();
                          }}
                        >
                          APPLY
                        </button>
                        <button onClick={() => close()}>Close modal</button>
                      </div>
                    </div>
                  )}
                </Popup>
              </div>
              <TableContainer component={Paper}>
                <Table className="dashassigntable">
                  <TableHead>
                    <TableRow>
                      {todoTitles.map((title) => (
                        <TableCell key={title}>
                          <b>{title}</b>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {currentItems.map((index) => (
                      <TableRow key={index.id} hover>
                        <TableCell>{index.file_name}</TableCell>
                        <TableCell>{formatDate(index.assigned_dt)}</TableCell>
                        <TableCell>{getType(index.file_name)}</TableCell>
                        <TableCell>{index.first_name}</TableCell>
                        <TableCell>
                          {!index.first_name && (
                            <Button
                              variant="contained"
                              className="dashstartbutton"
                              size="small"
                              style={{ width: "100px" }}
                              onClick={() => handlepick(2, index.file_id)}
                            >
                              PICK
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="next_back">
                  <Button
                    className="back_button"
                    sx={{ marginRight: 1, marginTop: 5.5 }}
                    onClick={prevPage}
                    disabled={currentPage === 1}
                  >
                    back
                  </Button>
                  <Button
                    className="next_button"
                    sx={{ marginRight: 1, marginTop: 5.5 }}
                    onClick={nextPage}
                    disabled={indexOfLastItem >= filteredData.length}
                  >
                    next
                  </Button>
                </div>
              </TableContainer>
            </div>
          </div>
          <br></br>
          <div className="transsecondrow">
            <div className="dash2table">
              <TableContainer component={Paper}>
                <Table className="dashdrafttable">
                  <TableHead>
                    MY QUEUE
                    <TableRow>
                      <TableCell>
                        <b>DOCUMENT</b>
                      </TableCell>
                      <TableCell>
                        <b>PICKED ON </b>
                      </TableCell>
                      <TableCell></TableCell>
                      <Link to="/myqueue">
                        <button className="cb">
                          <span className="material-symbols-outlined google-icon">
                            expand_content
                          </span>
                        </button>
                      </Link>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {currentmyqueue.map((index) => (
                      <TableRow key={index.id} hover>
                        <TableCell>{index.file_name}</TableCell>
                        <TableCell>{formatDate(index.assigned_dt)}</TableCell>
                        <TableCell>
                          <Button onClick={() => handleStart(index)}>
                            start
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="next_back">
                  <Button
                    className="back_button"
                    sx={{ marginRight: 1, marginTop: 5.5 }}
                    onClick={prevPage}
                    disabled={currentPage === 1}
                  >
                    back
                  </Button>
                  <Button
                    className="next_button"
                    sx={{ marginRight: 1, marginTop: 5.5 }}
                    onClick={nextPage}
                    disabled={indexOfLastItem >= filteredData.length}
                  >
                    next
                  </Button>
                </div>
              </TableContainer>
            </div>
            <div className="dash3table">
              <TableContainer component={Paper}>
                <Table className="dashdrafttable">
                  <TableHead>
                    DRAFT
                    <TableRow>
                      <TableCell>
                        <b>DOCUMENT</b>
                      </TableCell>
                      <TableCell>
                        <b>LAST MODIFIED</b>
                      </TableCell>
                      <TableCell></TableCell>
                      <Link to="/mydraft">
                        <button className="cb">
                          <span className="material-symbols-outlined google-icon">
                            expand_content
                          </span>
                        </button>
                      </Link>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {currentdraft.map((index) => (
                      <TableRow key={index.id} hover>
                        <TableCell>{index.file_name}</TableCell>
                        <TableCell>{formatDate(index.assigned_dt)}</TableCell>
                        <TableCell>
                          <Button>start</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="next_back">
                  <Button
                    className="back_button"
                    sx={{ marginRight: 1, marginTop: 5.5 }}
                    onClick={prevPage}
                    disabled={currentPage === 1}
                  >
                    back
                  </Button>
                  <Button
                    className="next_button"
                    sx={{ marginRight: 1, marginTop: 5.5 }}
                    onClick={nextPage}
                    disabled={indexOfLastItem >= filteredData.length}
                  >
                    next
                  </Button>
                </div>
              </TableContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TranslatorDashboard;
