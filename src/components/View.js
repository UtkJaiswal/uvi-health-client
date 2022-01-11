import React from "react";

import { useState, useEffect } from "react";
import Axios from "axios";
import {
  ScheduleComponent,
  Day,
  Month,
  Inject,
  ViewsDirective,
  ViewDirective,
} from "@syncfusion/ej2-react-schedule";
import Footer from "./Footer";



function View() {
  const [listOfAppointments, setlistOfAppointments] = useState([]);

  const [data, setdata] = useState([]);
  let data2 = [];

  
  const style = {
    textAlign:"center"
  }

  useEffect(() => {
    //API call using axios to GET all appointments from database
    Axios.get("https://uvi-health-server.herokuapp.com/getAppointments")
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          const isCompleted=response.data[i].isCompleted;
          let startTime="";
          let endTime="";
          let mm="";
          let hh=(parseInt(response.data[i].appointmentSlot.substr(11,2))+5).toString();
          mm=parseInt(response.data[i].appointmentSlot.substr(14,2))+30>=60?(hh=(parseInt(hh)+1).toString(),mm=(parseInt(response.data[i].appointmentSlot.substr(14,2))+30-60).toString()):mm=(parseInt(response.data[i].appointmentSlot.substr(14,2))+30).toString()
          startTime=hh+":"+mm;
          
          mm=parseInt(mm)+30>=60?(hh=(parseInt(hh)+1).toString(),mm=(parseInt(mm)+30-60)).toString():mm=(parseInt(mm)+30).toString();
          endTime=hh+":"+mm

          data2.push({
            id:response.data[i]._id,
            EndTime: new Date(
              response.data[i].appointmentSlot.substr(0, 4),
              response.data[i].appointmentSlot.substr(5, 2) - 1,
              response.data[i].appointmentSlot.substr(8, 2),
              endTime.substr(0,2),
              endTime.substr(3,2)
            ),
            StartTime: new Date(
              response.data[i].appointmentSlot.substr(0, 4),
              response.data[i].appointmentSlot.substr(5, 2) - 1,
              response.data[i].appointmentSlot.substr(8, 2),
              startTime.substr(0,2),
              startTime.substr(3,2)
            ),
            Subject: [response.data[i].appointmentType,response.data[i].appointmentName,response.data[i].personName, isCompleted?"TASK COMPLETED":"TASK INCOMPLETE"],
            IsReadonly: false,
            
          });
        }

        setdata(data2);
        setlistOfAppointments(data2);
        
      })
      .catch((err) => {
        console.log("err in making axios req", err);
      });

    
  }, []);


  //Filter function to display only SELECTED TYPE of Appointments
  const handleFilter = (e) => {
    
    
    if (e.target.value === "Fitness Coach Appointment") {
      let arr = listOfAppointments.filter(function (v) {
        return v.Subject.includes("Fitness Coach Appointment");
      });
      setdata(arr);
    } else if (e.target.value === "Nutrition Coach Appointment") {
      let arr = listOfAppointments.filter(function (v) {
        return v.Subject.includes("Nutrition Coach Appointment");
      });
      setdata(arr);
    } else if (e.target.value === "Doctor Appointment") {
      let arr = listOfAppointments.filter(function (v) {
        return v.Subject.includes("Doctor Appointment");
      });
      setdata(arr);
    } else {
        setdata(listOfAppointments)
    }
    
  };


  //Function to trigger appointment completion
  const handleAppointmentComplete = (props) => {
    let newData=listOfAppointments;
    
    newData.map((data)=>{
      if(data.id===props.id){
      data.isCompleted=true;
      
      }
    })
    
    setlistOfAppointments(newData)
    setdata(newData)


    //API call to trigger the selected task and mark it as Completed in the backend
    Axios.put(`https://uvi-health-server.herokuapp.com/editAppointment/${props.id}`,{appointmentName:props.appointmentName,personName:props.personName,appointmentType:props.appointmentType,appointmentSlot:props.appointmentSlot,isCompleted:true}).then((response)=>{
        alert("Task edited successfully")
    })
    window.location.reload();
  
    
  }

  
  //Function to edit the form on double clicking or clicking the edit option after selecting a particular task
  const editorWindowTemplate = (props)=>{
    
    return (
      <div className="custom-event-editor">
        <h1>Is the appointment completed?</h1>
        <button className="btn btn-primary" onClick={()=>handleAppointmentComplete(props)}>Yes</button>
      </div>
    )
  }
  

  return (
    <div>
    <div className="container">
      <h3 className="my-5"  style={style}>View Appointments</h3>
      <label htmlFor="appointmentType" className="form-label">
        Filter by Appointment Type
      </label>
      <select
        className="form-select form-select-sm"
        aria-label=".form-select-sm example"
        onChange={handleFilter}
      >
        <option >None</option>
        <option value="Fitness Coach Appointment">
          Fitness Coach Appointment
        </option>
        <option value="Nutrition Coach Appointment">
          Nutrition Coach Appointment
        </option>
        <option value="Doctor Appointment">Doctor Appointment</option>
      </select>
      <br />

      <ScheduleComponent
        width="100%"
        height="550px"
        currentView="Month"
        eventSettings={{ dataSource: data }}
        editorTemplate={editorWindowTemplate}
      >
        <ViewsDirective>
          <ViewDirective
            option="Day"
            startHour="00:00"
            endHour="00:00"
            timeScale={{ enable: true, slotCount: 5 }}
            
          />

          <ViewDirective option="Month" />
        </ViewsDirective>
        <Inject services={[Day, Month]} />
      </ScheduleComponent>
      </div>
      <Footer />
    
    </div>
  );
}

export default View;
