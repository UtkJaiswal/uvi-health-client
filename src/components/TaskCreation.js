import React from 'react';
import './styling/TaskCreation.css';
import Axios from 'axios';
import {DateTimePickerComponent} from '@syncfusion/ej2-react-calendars';


import {useState} from "react";


function TaskCreation() {

    //useState to store data entered in the form
    const [appointmentName, setappointmentName] = useState("")
    const [personName, setpersonName] = useState("")
    const [appointmentType, setappointmentType] = useState("")
    const [appointmentSlot, setappointmentSlot] = useState("")
    

    const minDate  = new Date();

    const style = {
        textAlign:"center"
    }
    
    
    //API call using axios to create a new task
    const createTask = ()=>{
        Axios.post("https://uvi-health-server.herokuapp.com/addAppointment",{appointmentName,personName,appointmentType,appointmentSlot}).then((response)=>{
            alert("Task added successfully")
        })
    }
    
    
    return (
        <div className='container my-5'>
            <form onSubmit={createTask}>
                <h4 className='my-3' style={style}>Create Task</h4>
                <div className="mb-3">
                    <label htmlFor="appointmentName" className="form-label">Appointment Name</label>
                    <input required={true} type="text" className="form-control" id="appointmentName"  onChange={(e)=>{setappointmentName(e.target.value)}}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="personName" className="form-label">Person Name</label>
                    <input required={true} type="text" className="form-control" id="personName"  onChange={(e)=>{setpersonName(e.target.value)}}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="appointmentType"  className="form-label">Appointment Type</label>
                    <select required={true} defaultValue={'DEFAULT'} className="form-select form-select-sm" aria-label=".form-select-sm example" onChange={(e)=>{setappointmentType(e.target.value)}}>
                        <option value="DEFAULT" disabled={true}>Select</option>
                        <option value="Fitness Coach Appointment">Fitness Coach Appointment</option>
                        <option value="Nutrition Coach Appointment">Nutrition Coach Appointment</option>
                        <option value="Doctor Appointment">Doctor Appointment</option>
                    </select>
                </div>
                
                <DateTimePickerComponent min={minDate} placeholder="Choose a date and time for appointment" format="dd-MMM-yy HH:mm" step={30} onChange={(e)=>{setappointmentSlot(e.target.value)}}/>
                
      
      
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default TaskCreation
