import React , {useRef, useState, useEffect} from "react";
// import DialogModal from "../component/Dialog";

import '../App.scss';

function Home(){
    const [input4, setInput4] = useState("");
    const [inputSession, setInputSession] = useState([{id: 0, value: 'html', ischecked: false}]);
    const inputvalue4 = useRef(null)

    // modal state 
    const [snackbar, setSnackbar] = useState({
        open:  false,
        desc: '',
        severity: "success"
    }); {/*snackbar*/}
    const [dialogModal, setDialogModal] = useState({
        modalStatus: false,
        modaDesc: '',
        onclick: ''
    }); {/*Dialog*/}
    // Dialog Close
    const handleCloseDialog = ()=> {
        setDialogModal(!dialogModal.modalStatus);
    };

    useEffect(() => {
        // let storedValue = localStorage.getItem("lastname");
        // setInputSession(storedValue);
        console.log('inputSession:' + JSON.stringify(inputSession) );
    }, [inputSession]);

    let completedTaskTitle = "Completed List"
    let newTaskTitle = "New Task"
    const clearInput = ()=>{
      setInput4('');
    //   inputvalue4.current.value="";
    //   inputvalue4.current.focus();
    }   
    const inputCredHandle = (e)=>{
      const {value} = e.target;
      setInput4(value)
    }
    const submitHanle = ()=>{
      clearInput();
      setInputSession([...inputSession, {id: Number(inputSession.length+1), value: input4, ischecked: false}]);
    }
    const completedHandle = (e)=>{
      const {checked,id} = e.target;
      setInputSession(
          inputSession.map((response)=>{
              if(response.id == id){
                  return {...response, ischecked: !response.ischecked}
                  
              }
              else{
                  return response;
              }
          })
      )
    }
    const deleteHandler = (e)=>{
      const {id,value} = e.target;
      console.log('value: ' + value)
      setDialogModal({modalStatus: true,modaDesc: value,onclick: ()=>{handleDeleteItem(id)}})
    }

     // Delete Items
     const handleDeleteItem = (dataId)=>{
        setDialogModal(!dialogModal.modalStatus);
        setSnackbar({open: !snackbar.open, desc: "Record deleted successfully..."});
         setInputSession(
            inputSession.filter((response)=>{
                return (response.id != dataId)
            })
        )
    }
  
    return (
        <>
        <div className="task-bax">
        <input type="text" className="task-area__input-box" value={input4} onChange={inputCredHandle} refs={inputvalue4} placeholder = "" label="Create Task"/>
        <button className="btn btn--sm btn--primary" onClick={submitHanle}>Add</button>
        <div className="task-box">
            <h1>{newTaskTitle}</h1> 
            {
                inputSession.map((response,index)=>(
                    !response.ischecked && (
                        <div className="task-items" key={index}>
                            <div className="task-item">
                                <input type="checkbox" className="" checked={response.ischecked} id={response.id} value={response.id} onChange= {completedHandle}/>
                                <p>{response.value}</p>
                                <button className="btn btn--sm btn--danger mr-align" id={response.id} value={response.value} onClick={deleteHandler}>Delete</button>
                            </div>
                        </div>
                    )
                ))                                              
            }
        </div>
        <div className="task-box">
            <h1>{completedTaskTitle}</h1>
            {
                inputSession.map((response,index)=>(
                    response.ischecked && (
                        <div className="task-items" key={index}>
                            <div className="task-item">
                                <input type="checkbox" className="" checked={response.ischecked} id={response.id} value={response.id} onChange= {completedHandle}/>
                                <p>{response.value}</p>
                                <button className="btn btn--sm btn--danger mr-align" id={response.id} value={response.value} onClick={deleteHandler}>Delete</button>
                            </div>
                        </div>
                    )
                ))
            }
        </div>
    </div>

    {/* <DialogModal open = {dialogModal.modalStatus} onClose = {handleCloseDialog} onDelete = {dialogModal.onclick} value = {dialogModal.modaDesc}/> */}
</>
    
    )
}

export default Home;