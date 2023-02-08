import React, { useEffect, useState, useRef } from "react";
import Header from "../bar/header";
import Modal from "../task/Modal";
import uniqid from "uniqid";

import SidemenuData from "../bar/json/sidemenu.json";
import TaskView from "../task/TaskView";
import { TfiAngleLeft, TfiMoreAlt } from "react-icons/tfi";
import { TfiPlus } from "react-icons/tfi";

function School() {
  // const filteredTask = response => {
  //   const search = response.target.value.toLowerCase()
  //   const filterNames = TaskContent.filter(response => response.Name.toLowerCase().includes(search));
  //   SetName(filteredTask);

  // }

  //   const Searchdata = (e) => {
  //     console.log(e.target.value);

  //     // if(e.target.value != '') {
  //     //     Setsearchvalue(e.target.value);
  //     //     console.log(searchvalue);
  //     // }
  // }
  var generateId = uniqid();
  let dateObj = new Date();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let dates =
    dateObj.getDate() +
    "/" +
    (dateObj.getMonth() + 1) +
    "/" +
    dateObj.getFullYear();
  let day = days[dateObj.getDay()];

  // hours & minutes
  let min = dateObj.getMinutes();
  let hr = dateObj.getHours();

  if (min < 10) {
    min = "0" + min;
  }
  var ampm = "AM";

  if (hr > 12) {
    hr -= 12;
    ampm = "PM";
  }

  let time = hr + ":" + min + "" + ampm;

  //Edit Popup Modal Data
  const [dialogModal, setDialogModal] = useState({
    modalstatus: false,
    modalDesc: "",
    onclick: "",
  });

  //Confirm Complete Popup Modal Data
  const [completeModal, SetCompleteModal] = useState({
    modalstatus: false,
    modalDesc: "",
    onclick: "",
  });

  //Popup Modal Data
  const DeleteTodo = (getData) => {
    //console.log(getData);
    setDialogModal({
      modalstatus: true,
      modalDesc: getData,
      onclick: () => {
        DeleteTask(getData.id);
      },
    });
  };

  //Confirm DeleteTask

  const DeleteTask = (modalData) => {
    // console.log(modalData);
    const filterTask = TaskContent.filter((e, i) => {
      return e.id !== modalData.id;
    });

    SetTaskcontent(filterTask);
  };

  //CompleteHandle
  const completeHandle = (completeData) => {
    // console.log("data showing : ", completeData);
    SetCompleteModal({
      modalstatus: true,
      modalDesc: completeData,
      onclick: () => {
        confirmComplete(completeData.id);
      },
    });
  };

  //confirmComplete
  const confirmComplete = (finished) => {
    console.log("id :", finished);
    SetTaskcontent(
      TaskContent.map((TaskContent) => {
        if (TaskContent.id === finished.id) {
          return { ...TaskContent, ischecked: !TaskContent.ischecked };
        } else {
          return TaskContent;
        }
      })
    );
  };

  //Todo Task value getting
  const SaveData = () => {
    const data = localStorage.getItem("TaskContent");
    //console.log(data);
    if (data) {
      return JSON.parse(data);
    } else {
      return [];
    }
  };

  //Hooks
  const [Name, SetName] = useState([]);
  const [Open, SetOpen] = useState(false);

  const [mobAddTaskModal, SetMobAddTaskModal] = useState(false);
  const [Count, SetCount] = useState(1);
  const [parentId, SetParentId] = useState("p1");
  const [menuTitle, SetMenuTitle] = useState("School");
  const [TaskContent, SetTaskcontent] = useState(SaveData());
  const [buttonText, SetbuttonText] = useState("Add");
  const [sideMenuActive, SetSideMenuActive] = useState(1);
  const [exist, SetExist] = useState(false);
  //error
  const [error, SetError] = useState(false);

  // const counterId = 0;
  const addInputRef = useRef();
  const mobInputRef = useRef();
  const scrolltoinput = useRef();

  //AddTask Button
  const addTask_mobile = (e) => {
    console.log("mobTask One");
    SetName('');
    SetbuttonText("Add");
    SetMobAddTaskModal(true);
    mobInputRef.current.focus();
    addInputRef.current.focus();
  };

  const closeTask = () => {
    SetMobAddTaskModal(false);
  };

  // //EditTodo List
  // const EditTodo = (dataValue) => {
  //   SetbuttonText("Edit");

  //   // console.log(dataValue);

  //   addInputRef.current.id = dataValue.id;
  //   addInputRef.current.value = dataValue.Name;

  //   SetName(dataValue.Name);
  //   addInputRef.current.focus();
  //   // console.log(addeditid,addeditName);
  //   scrolltoinput.current?.scrollIntoView({
  //     top: 0,
  //     behaviour: "smooth",
  //   });
  // };

  const EditTodo = (dataValue) => {
    {
      window.innerWidth > 769 ? desktopEdit() : mobileEdit();
      window.innerWidth > 769 ? SetMobAddTaskModal(false) : SetMobAddTaskModal(true);
    }

    function mobileEdit(e) {
      console.log("mobile Edit", dataValue.Name);
      SetbuttonText("Edit");
      SetMobAddTaskModal(true);
      // console.log(dataValue);

      addInputRef.current.id = dataValue.id;
      addInputRef.current.value = dataValue.Name;
      // mobInputRef.current.value = dataValue.Name;

      SetName(dataValue.Name);
      addInputRef.current.focus();
      // mobInputRef.current.focus();
      // console.log(addeditid,addeditName);
      scrolltoinput.current?.scrollIntoView({
        bottom: 0,
        behaviour: "smooth",
      });
    }

    function desktopEdit() {
      SetbuttonText("Edit");
      addInputRef.current.focus();
      SetMobAddTaskModal(false);
      // console.log(dataValue);

      addInputRef.current.id = dataValue.id;
      addInputRef.current.value = dataValue.Name;
      // mobInputRef.current.value = dataValue.Name;

      SetName(dataValue.Name);
      addInputRef.current.focus();
      // mobInputRef.current.focus();
      // console.log(addeditid,addeditName);
      scrolltoinput.current?.scrollIntoView({
        bottom: 0,
        behaviour: "smooth",
      });
    }
  };

  //Mobile Add function
  const mobileSubmit = (e) => {
    e.preventDefault();
    if (Name.length == 0) {
      SetError(true);
      addInputRef.current.focus();
    }
    if (Name != "") {
      Task_submit(e);
      // SetMobAddTaskModal((e) => !SetMobAddTaskModal(false));
      SetError(false);
      // SetExist(true);
      addInputRef.current.focus();
    }
  };

  //Mobile Close function
  const closeMob = (e) => {
    SetMobAddTaskModal(false);
    SetError(false);
    SetExist(false);
    addInputRef.current.value = '';
  };

  //Add function
  const Task_submit = (e) => {
    let addeditid = addInputRef.current.id;
    let addeditName = addInputRef.current.value;
    // console.log(addeditid,addeditName);

    e.preventDefault(e);

    addeditid ? edit() : add();
  };

   function edit() {
    let addeditid = addInputRef.current.id;
    let addeditName = addInputRef.current.value;

    if (Name != "") {
      const checkEqual1 = TaskContent.filter((response) => {
        return addeditName.toLowerCase() == response.Name.toLowerCase();
      });

      // return false;
      if (!checkEqual1.length) {
        let result = TaskContent.map((response) =>
          response.id == addeditid
            ? {
                ...response,
                Name: addeditName,
                id: response.id,
                parent_id: response.parent_id,
                date: dates,
                day: day,
                time: time,
                dateTime: new Date(),
              }
            : response
        );

        SetTaskcontent(result);
        SetName("");
        reset();
        SetExist(false);
        SetMobAddTaskModal(false);
        SetError(false);
      } else {
        SetExist(true);
        // addInputRef.current.id = "";
        // addInputRef.current.value = "";
        addInputRef.current.focus();
      }
    }
  }

  //Reset Edit Task
  const reset = () => {
    SetbuttonText("Add");
    addInputRef.current.id = "";
    addInputRef.current.value = "";
    SetName("");
  };

  //Adding Task
  function add() {
    SetCount(Count + 1);
    // if(Name !== '') {
    if (Name != "") {
      const checkEqual = TaskContent.filter((res) => {
        return res.Name.toLowerCase() == Name.toLowerCase();
      });
      // console.log("check exist text:", Number(checkEqual.length));
      
      if (!checkEqual.length) {
        let TaskView = {
          // id : Number(TaskContent.length+1),
          id: generateId,
          parent_id: parentId,
          Name,
          ischecked: false,
          count: Count,
          day: day,
          time: time,
          date: dates,
          dateTime: new Date(),
          timestamp: dateObj,
        };
        // console.log(TaskView);
        SetTaskcontent([...TaskContent, TaskView]);
        SetName("");
        SetExist('');
        // getDatewiseTask();
        SetMobAddTaskModal(false);
      } else {
        SetExist(true);
        addInputRef.current.id = "";
        addInputRef.current.value = "";
        SetName('');
        addInputRef.current.focus();
      }
      // nameRef.current.value = "";
    }
  }

  //Save data localStorage
  useEffect(() => {
    localStorage.setItem("TaskContent", JSON.stringify(TaskContent));
  }, [TaskContent]);

  // useEffect (() => {
  //   console.log(parentId);
  // },[parentId])

  // const SubmitEvents = () => {
  //   document.getElementById('submit').style.display='block';
  // }

  // console.log("dashboard", sideMenuActive);

  const [search, setSearch] = useState("");
  const [ShowMenu, SetShowMenu] = useState(true);

  //Sidemenu UI Connection
  let sidemenuDataUI = SidemenuData.map((item, pos) => {
    return (
      <li
        onClick={() => {
          window.innerWidth < 769 ? SetShowMenu(false) : SetShowMenu(true)
        }}
        key={item.id}
      >
        <div
          className={
            sideMenuActive == item.id
              ? "side_menu side_menu--active"
              : "side_menu"
          }
          onClick={() => {
            SetSideMenuActive(item.id);
            SetParentId(item.parentId);
            SetMenuTitle(item.header);

            reset();
          }}
        >
          <img src={item.image} className="sidemenu_img" alt="School" />
          <p className="sidemenu_para">{item.header}</p>
        </div>
      </li>
    );
  });

  return (
    <>
      <Header
        setSearch={setSearch}
        search={search}
        ShowMenu={ShowMenu}
        SetShowMenu={SetShowMenu}
      >
        {sidemenuDataUI}
      </Header>

      <div className="view_data" ref={scrolltoinput}>
        <section className="list_data">
          <div className="auto_scroll">
            <div className="list_dashboard">
              <div className="dashboard_view">
                <div className="dashboard_set">
                  <div className="left_chevron"
                    onClick={() => {SetShowMenu(true);}}
                  >
                    <TfiAngleLeft className="back_to_chevron" />
                  </div>
                  <div className="dash_head">{menuTitle}</div>
                </div>

                <div className="list_view">
                  <TfiMoreAlt className="show_view" />
                </div>
              </div>

              <div className="add_task">
                <div className="task_plus">
                  <span className="circle_first">
                    <TfiPlus className="plus_sign" />
                  </span>
                  <input
                    type="text"
                    placeholder={
                      buttonText == "Edit" ? "Edit a Task" : "Add a Task"
                    }
                    value={Name}
                    id=""
                    className="input_file"
                    onChange={(e) => {
                      SetName(e.target.value);
                    }}
                    // onClick={()=> SetOpen(!Open)}
                    // onClick={() => SubmitEvents()}
                    ref={addInputRef}
                    required
                  />
                  {/* <button className={`submit ${Open ? "block" : "hidden"}`} onClick={Task_submit}>Add</button> */}
                  <div className="space_button">
                    {buttonText == "Edit" && (
                      <button className="canceltask" onClick={reset}>
                        Cancel
                      </button>
                    )}

                    <button className="submit" onClick={Task_submit}>
                      {buttonText}
                    </button>
                  </div>
                </div>
                      <div className='error_task'>
                        {
                          !exist == 0 && 
                          <span className='error'> * Task is already exist..</span>
                        }
                      </div>
              </div>

              <div className="view_status">
                {TaskContent.length > 0 && (
                  <TaskView
                    search={search}
                    TaskContent={TaskContent}
                    DeleteTodo={DeleteTodo}
                    EditTodo={EditTodo}
                    completeHandle={completeHandle}
                    currentParentId={parentId}
                  />
                )}

                {TaskContent.length < 1 && (
                  <div className="empty_task">
                    <div className="enter_task"> No task added...</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mobilewise">
            <div className="add_task_button">
              <TfiPlus className="mob_add" onClick={addTask_mobile} />
            </div>
          </div>

          {
            // <div className=>
            <div
              className={
                mobAddTaskModal
                  ? "modal show_modal show_modal--active"
                  : "modal show_modal"
              }
            >
              <div className="modal_content">
                <div className="modal_close">
                  <span className="close_button" onClick={closeMob}>
                    <span className="close_code">&times;</span>
                  </span>
                </div>
                <div className="modal_header">
                  <span className="modal_title">Do you want to add Task?</span>
                </div>

                <div className="modal_container">
                  <div className="taskadd_mod">
                    <input
                      type="text"
                      placeholder=
                      {
                        buttonText == "Edit" ? "Edit a Task" : "Add a Task"
                      }
                      value={Name}
                      id=""
                      className="task_mob_input"
                      onChange={(e) => {
                        SetName(e.target.value);
                      }}
                      // onClick={()=> SetOpen(!Open)}
                      // onClick={() => SubmitEvents()}
                      ref={addInputRef}
                      ref={mobInputRef}
                      required
                      autoFocus
                    />
                  </div>
                  <div className="errors">
                    {error && Name.length <= 0 ? (
                      <span className="error_name">
                        * Kindly enter the task.
                      </span>
                    ) : (
                      ""
                    )}
                    
                        {
                          !exist == 0 && 
                          <span className='error'> * Task is already exist..</span>
                        }
                  </div>
                </div>

                <div className="modal_footer">
                  <button
                    className="btn btn_confirm btn_right"
                    onClick={mobileSubmit}
                  >
                    {buttonText}
                  </button>
                  <button className="btn btn_close" onClick={closeMob}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>

            // </div>
          }
        </section>

        {dialogModal.modalstatus && (
          <Modal
            modalDesc={dialogModal.modalDesc}
            Title={"Do you want to Delete?"}
            onDelete={() => {
              DeleteTask(dialogModal.modalDesc);
              setDialogModal(!dialogModal.modalstatus);
            }}
            onClose={() => setDialogModal(!dialogModal.modalstatus)}
          />
        )}

        {completeModal.modalstatus && (
          <Modal
            Title={"Are you sure completed the task?"}
            modalDesc={completeModal.modalDesc}
            Note={"*Note: Once you click confirm you can't change it."}
            onDelete={() => {
              confirmComplete(completeModal.modalDesc);
              SetCompleteModal(!completeModal.modalstatus);
            }}
            onClose={() => SetCompleteModal(!completeModal.modalstatus)}
          />
        )}
      </div>
    </>
  );
}

export default School;
