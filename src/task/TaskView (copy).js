import React, { useEffect, useRef } from "react";
import { GiCheckboxTree } from "react-icons/gi";
import { BsTrash, BsPencil, BsClock } from "react-icons/bs";

import { format } from "date-fns";

function TaskView({
  TaskContent,
  DeleteTodo,
  EditTodo,
  completeHandle,
  currentParentId,
  search = "",
}) {
  const nameRef = useRef();

  // let storedtime = [day +' | ',time +' | ',date];
  // let taskCount = TaskContent.filter((response) => !response.ischecked);

  let totalTask = TaskContent.filter((response) => {
    return response.parent_id == currentParentId;
  });
  let taskCount = TaskContent.filter((response) => {
    return !response.ischecked && response.parent_id == currentParentId;
  });
  let taskCompletedCount = TaskContent.filter((response) => {
    return response.ischecked && response.parent_id == currentParentId;
  });

  //Datewise Total Task Count
  let totaltaskdatewiseCount = TaskContent.filter((response) => {
    return (
      response.ischecked ||
      (response.date && response.parent_id == currentParentId)
    );
  });
  //Datewise Total Task Checked Count

  // const groupByCategory = TaskContent.reduce((group, product) => {
  //     const { date } = product;
  //     group[date] = group[date] ?? [];
  //     if( !product.ischecked && product.parent_id == currentParentId)
  //         {
  //             group[date].push(product);
  //         }

  //     return group;
  //   }, {});

  //   console.log(groupByCategory);

  let taskdatewiseCount = TaskContent.filter((response) => {
    return (
      response.date &&
      currentParentId == response.parent_id &&
      !response.ischecked
    );
  });

  let curDate = new Date();
  let TaskCounter = TaskContent.filter((response) => {
    return currentParentId === response.parent_id && response.date === curDate;
  });

  // useEffect (() => {
  //     TaskContent.sort()
  //     // console.log("taskview" , TaskContent.map((TaskContent, index) => {TaskContent}))
  //     console.log('date:', TaskContent)
  // },[TaskContent])

  const dateWiseCounts = TaskContent.reduce((counts, item) => {
    const { date } = item;
    counts[date] = counts[date] ? counts[date] + 1 : 1;
    return counts;
  }, {});
    //console.log(dateWiseCounts);

  let datesCount = {};
  TaskContent.forEach((response) => {
    if (datesCount[response.date]) {
      datesCount[response.date] += 1;
    } else {
      datesCount[response.date] = 1;
    }
  });

  const TaskDate = TaskContent.map((task) => task.date === task.parent_id);

  // let temp= {};
  // TaskContent.forEach(element => {
  //     if(element.parent_id == currentParentId) {
  //     if(!temp[element['date']]) {
  //         temp[element['date']] = {'done': 0, 'progress': 0, 'total': 0};
  //     }
  //     console.log(temp[element['date']]);
  //     if (element['ischecked']) {
  //         temp[element['date']]['done'] =  (temp[element['date']]['done']) + 1;
  //     } else {
  //         console.log(temp[element['date']]);
  //         temp[element['date']]['progress'] =  (temp[element['date']]['progress']) + 1;
  //     }
  //     temp[element['date']]['total'] =  (temp[element['date']]['total']) + 1;
  // }
  // })

  // console.log('counterview',temp)

  // console.log('mm', TaskContent);

  // console.log('taskcount set : ', datesCount);

  // console.log('taskcount is : ', taskdatewiseCount);

  const getTaskCount = (task) => {
    let position = 0;
    const totalTasks = TaskContent?.sort(
      (a, b) => new Date(a.dateTime) - new Date(b.dateTime)
    )?.filter(
      (each) =>
        each.ischecked === false &&
        each.parent_id === currentParentId &&
        format(new Date(task.dateTime), "P") ===
          format(new Date(each.dateTime), "P")
    );
    totalTasks?.forEach((each, index) => {
      if (task.id === each.id) position = index + 1;
    });
    return position;
  };

  return (
    <>
      {/* //Search */}

      <div className="task_name">Total Tasks - {totalTask.length}</div>
      <div className="task_name">Tasks - {taskCount.length}</div>

      {TaskContent?.filter((each) =>
        !search
          ? true
          : each?.Name?.startsWith(
              search.slice(0, Math.max(search.length - 1, 1))
            )
          ? true
          : false
      )?.length === 0 ? (
        <div className="empty_task">
          <div className="enter_task"> No Task Found...</div>
        </div>
      ) : null}

      {TaskContent && taskCount.length ? (
        TaskContent.sort((a, b) => {
          return new Date(b.dateTime) - new Date(a.dateTime);
        })
          .filter((each) =>
            !search
              ? true
              : each?.Name?.startsWith(
                  search.slice(0, Math.max(search.length - 1, 1))
                )
              ? true
              : false
          )
          .map(
            (each, index) =>
              !each.ischecked &&
              each.parent_id == currentParentId && (
                <>
                  {/* {(index === 0 ||
                    format(
                      new Date(
                        TaskContent?.filter(
                          (each) => each?.ischecked === false
                        )[index - 1]?.dateTime ?? new Date()
                      ),
                      "P"
                    ) !== format(new Date(each.dateTime), "P")) && (
                    <span className="sp">
                      {format(new Date(each.dateTime), "dd/MM/yyyy")}
                    </span>
                  )} */}
                  <div className="enter_task" key={index}>
                    {/* {JSON.stringify(new Date(each.dateTime), null, 4)} */}
                    <div className="enter_lists">
                      {/* <div className='task_sure'> */}
                      <input
                        type="checkbox"
                        className="check_first"
                        //id={each.id}
                        checked={each.ischecked}
                        value={each.id}
                        ref={nameRef}
                        onChange={(e) => {
                          completeHandle(each);
                        }}
                      />
                      {/* </div> */}
                      <div className="show_data">
                        <label className="task_names">{each.Name}</label>

                        <div className="show_date">
                          <div className="task_display">
                            <GiCheckboxTree className="task_icon" />
                            <span className="display_count">
                              {getTaskCount(each)}/
                              {
                                TaskContent?.filter(
                                  (e) =>
                                    e.parent_id === currentParentId &&
                                    format(new Date(e.dateTime), "P") ===
                                      format(new Date(each.dateTime), "P")
                                )?.length
                              }
                            </span>
                          </div>

                          <div className="task_display today_task">
                            <BsClock className="clock_set" />
                            <span className="task_date">
                              <span className="sp">
                                {format(new Date(each.dateTime), "iii")}
                              </span>
                              <span className="sp">
                                {format(new Date(each.dateTime), "p")}
                              </span>
                              <span className="sp">
                                {format(new Date(each.dateTime), "dd/MM/yyyy")}
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="task_status">
                      <BsPencil
                        className="status_act mr_right"
                        onClick={(e) => {
                          EditTodo(each);
                        }}
                      />
                      <BsTrash
                        className="status_act"
                        onClick={(e) => {
                          DeleteTodo(each);
                        }}
                      />
                    </div>
                  </div>
                </>
              )
          )
      ) : (
        <div className="empty_task">
          <div className="enter_task"> No task added...</div>
        </div>
      )}

      <div className="task_name">Completed - {taskCompletedCount.length}</div>
      {TaskContent && taskCompletedCount.length > 0 ? (
        TaskContent.sort((a, b) => {
          return a.date - b.date;
        }).map(
          (TaskContent, index) =>
            TaskContent.ischecked &&
            TaskContent.parent_id == currentParentId && (
              <div className="enter_task" key={index}>
                <div className="enter_lists">
                  {/* <div className='task_sure'> */}
                  <input
                    type="checkbox"
                    className="check_first line-through"
                    // id={TaskContent.id}
                    checked={TaskContent.ischecked}
                    value={TaskContent.id}
                    disabled
                    onChange={(e) => {
                      completeHandle(TaskContent.id);
                    }}
                  />
                  {/* </div> */}

                  <div className="show_data">
                    <label className="task_names">{TaskContent.Name}</label>
                    <div className="show_date">
                      <div className="task_display today_task">
                        <BsClock className="clock_set" />
                        <span className="task_date">
                          <span className="sp">
                            {format(new Date(TaskContent.dateTime), "iii")}
                          </span>
                          <span className="sp">
                            {format(new Date(TaskContent.dateTime), "p")}
                          </span>
                          <span className="sp">
                            {format(
                              new Date(TaskContent.dateTime),
                              "dd/MM/yyyy"
                            )}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="task_status">
                  {/* <BsPencil className='status_act mr_right' onClick={(e) => {EditTodo(TaskContent.id)}}/> */}
                  <BsTrash
                    className="status_act"
                    onClick={(e) => {
                      DeleteTodo(TaskContent);
                    }}
                  />
                </div>
              </div>
            )
        )
      ) : (
        <div className="empty_task">
          <div className="enter_task"> No Completed task...</div>
        </div>
      )}
    </>
  );
}

export default TaskView;
