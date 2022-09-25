import { useContext, useEffect, useState } from "react";
import { Routes, Route, useParams, useNavigate } from "react-router-dom";
import api from "../api";
import Ctx from "../contexts";

function Student() {
    const { studentId } = useParams();
    const [student, setStudent] = useState();
    const [view, setView] = useState("read");
    const showNotif = useContext(Ctx.Notif);
    const navigate = useNavigate();

    const setReadView = () => setView("read");
    const setEditView = () => setView("edit");

    useEffect(() => {
	api.getOne("students", studentId)
	    .then(obj => setStudent(obj))
	    .catch(err => {
		showNotif(err.message, "error");
		setStudent(null);
	    });// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [studentId]);

    const editStudent = newData => api
	  .replaceOne("students", student.studentNum, newData)
	  .then(() => {
	      setStudent(newData);
	      navigate(`/students/${newData.studentNum}`);
	      setReadView();
	      return "Student updated successfully";
	  });

    const deleteStudent = () => {
	if (!window.confirm(`Delete student '${student.fullname}'?`)) return;

	api.deleteOne("students", student.studentNum)
	    .then(() => {
		navigate(`/students`);
		showNotif("Student deleted successfully", "success");
	    })
	    .catch(err => {
		showNotif(err.message, "error");
	    });
    }

    const style = {
	textAlign: "center"
    };

    return (
	<div {...{ style }}>
	    { student === undefined ? <h3>Loading...</h3> :

	      student === null ? <h3>This student data are unavailable</h3> :
	      
	      view === "edit" ? <StudentForm student={ student }
					     handleData={ editStudent }
					     cancel={ setReadView } /> :
	      <div>
		  <button onClick={ setEditView }>Edit</button>{" "}
		  <button onClick={ deleteStudent }>Delete</button>
		  <table>
		      <tbody>
			  <tr>
			      <td>Student number</td>
			      <td>{ student.studentNum }</td>
			  </tr>
			  <tr>
			      <td>Full name</td>
			      <td>{ student.fullname }</td>
			  </tr>
			  <tr>
			      <td>Birth date</td>
			      <td>{ student.birthDate }</td>
			  </tr>
			  <tr>
			      <td>Branch</td>
			      <td>{ student.branch }</td>
			  </tr>
			  <tr>
			      <td>Level</td>
			      <td>{ student.level }</td>
			  </tr>
		      </tbody>
		  </table>
	      </div>
	    }
	</div>
    );
}

function StudentForm({ student, handleData, cancel }) {
    const showNotif = useContext(Ctx.Notif);

    const handleSubmit = event => {
	event.preventDefault();

	handleData(Array.from(event.target)
		   .reduce((prev, curr) =>
		       ({ ...prev, [curr.name]: curr.value }),
		       {}))
	    .then(msg => {
		event.target.reset();
		showNotif(msg, "success");
	    })
	    .catch(err => {
		showNotif(err.message, "error");
	    });
    };
    
    return (
	<form onSubmit={ handleSubmit }>
	    <label htmlFor="student-number">
		Student number <input id="student-number"
				      name="studentNum"
				      type="text"
				      defaultValue={ student?.studentNum }
				      required />
	    </label>
	    <label htmlFor="fullname">
		Full name <input id="fullname" name="fullname" type="text"
				 defaultValue={ student?.fullname } />
	    </label>
	    <label htmlFor="birth-date">
		Birth date <input id="birth-date" name="birthDate" type="date"
				  defaultValue={ student?.birthDate } />
	    </label>
	    <label htmlFor="branch">
		Branch <select id="branch" name="branch"
			       defaultValue={ student?.branch }>
			   <option value="engineering">Engineering</option>
			   <option value="exSciences">Experimental Sciences</option>
			   <option value="humanities">Humanities</option>
		       </select>
	    </label>
	    <label htmlFor="level">
		Level <input id="level"
			     name="level"
			     type="number"
			     min="1"
			     max="10"
			     placeholder="1"
			     defaultValue={ student?.level }
			     required
		      />
	    </label>
	    <button>Save</button>
	    { cancel && <button type="button" onClick={ cancel }>Cancel</button> }
	</form>
    );
}

function StudentTable() {
    const [students, setStudents] = useState([]);
    const showNotif = useContext(Ctx.Notif);
    const navigate = useNavigate();

    useEffect(() => {
	api.getAll("students")
	    .then(arr => setStudents(arr))
	    .catch(err => {
		showNotif(err.message, "error");
	    });
    }, [showNotif]);

    const showStudent = (studentId) => {
	navigate(`/students/${studentId}`);
    };

    return (
	<table>
	    <thead>
		<tr>
		    <th>Student number</th>
		    <th>Full name</th>
		    <th>Birth date</th>
		    <th>Branch</th>
		    <th>Level</th>
		</tr>
	    </thead>
	    <tbody>
		{
		    students.map(student =>
			<tr onClick={ () => showStudent(student.studentNum) }
			    key={ student.studentNum }
			>
			    <td>{ student.studentNum }</td>
			    <td>{ student.fullname }</td>
			    <td>{ student.birthDate }</td>
			    <td>{ student.branch }</td>
			    <td>{ student.level }</td>
			</tr>)
		}
	    </tbody>
	</table>
    );
}

export default function Students() {
    const [view, setView] = useState("table");
    const navigate = useNavigate();

    const showTable = () => {
	setView("table");
    };

    const showForm = () => {
	navigate("/students");
	setView("form");
    };

    const addStudent = studentData =>
	  api
	  .add("students", studentData)
	  .then(() => "Student added successfully");

    return (
	<section>
	    <div className="toolbar">
		{ view === "form" ?
		  <button onClick={ showTable }>Go back</button> :
		  <button onClick={ showForm }>Add student</button>
		}
	    </div>
	    <hr />
	    <Routes>
		<Route path=""
		       element={ view === "form" ?
				 <StudentForm handleData={ addStudent }/> :
				 <StudentTable />}
		/>
		<Route path=":studentId"
		       element={ <Student /> }
		/>
	    </Routes>
	</section>
    );
}
