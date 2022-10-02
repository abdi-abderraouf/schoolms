import { useContext, useEffect, useState } from "react";
import { days, branches } from "../static-data";
import api from "../api";
import Ctx from "../contexts";

function ClassForm({ onAdd, onCancel }) {
    const [subjects, setSubjects] = useState();
    const [teachers, setTeachers] = useState();
    const showNotif = useContext(Ctx.Notif);

    useEffect(() => {
	api.getAll("subjects")
	    .then(res => setSubjects(res))
	    .catch(err => {
		showNotif(err.message, "error");
	    });

	api.getAll("teachers")
	    .then(res => setTeachers(res))
	    .catch(err => {
		showNotif(err.message, "error");
	    }); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const addClass = e => {
	e.preventDefault();
	const form = e.target;

	api.add("classes", {
	    day: form.day.value,
	    branch: form.branch.value,
	    level: form.level.value,
	    subject: form.subject.value,
	    timeframe: [form.timeframeStart.value, form.timeframeEnd.value],
	    teacher: form.teacher.value
	})
	    .then(() => {
		onAdd();
		showNotif("Classes added successfully");
		form.reset();
	    })
	    .catch(err => {
		showNotif(err.message, "error");
	    });
    };
	
    return (
	<form onSubmit={addClass}>
	    <label htmlFor="class-day">Week Day</label>
	    <select id="class-day" name="day">
		{ days.map((day, i) =>
		    <option value={i} key={day}>{day}</option>)
		}
	    </select>
	    <label htmlFor="class-branch">Branch</label>
	    <select id="class-branch" name="branch">
		{ branches.map(branch =>
		    <option value={branch} key={branch}>{branch}</option>)
		}
	    </select>
	    <label htmlFor="class-level">Level</label>
	    <input id="class-level"
		   type="number"
		   name="level"
		   min="1"
		   max="10"
		   defaultValue="1"/>
	    <label htmlFor="class-subject">Subject</label>
	    <select id="class-subject" name="subject">
		{ subjects?.map(subject =>
		    <option value={subject.code} key={subject.code}>
			{subject.code}
		    </option>)
		}
	    </select>
	    <label htmlFor="class-timeframe">Time frame: from</label>
	    <input id="class-timeframe"
		   name="timeframeStart"
		   type="number"
		   min="0"
		   max="23"
		   placeholder="08" />
	    to <input name="timeframeEnd"
		      type="number"
		      min="0"
		      max="23"
		      placeholder="10" />
	    <label htmlFor="class-teacher">Teacher</label>
	    <select id="class-teacher" name="teacher">
		{ teachers?.map(teacher =>
		    <option value={teacher._id} key={teacher._id}>
			{teacher.fullname}
		    </option>)
		}
	    </select>
	    <button type="submit">Save</button>
	    <button type="button" className="alt" onClick={onCancel}>Cancel</button>
	</form>
    );
}

export default function Classes() {
    const showNotif = useContext(Ctx.Notif);
    const [classes, setClasses] = useState();
    const [trigger, setTrigger] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const refreshData = () => setTrigger(bit => !bit);

    useEffect(() => {
	api.getAll("classes")
	    .then(res => setClasses(res))
	    .catch(err => {
		showNotif(err.message, "error");
	    }); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [trigger]); 

    const classesPerDay = days.map(day => ({ name: day,	classes: [] }));

    classes?.forEach(c => {
	classesPerDay[c.day].classes.push(c);
    });

    return (
	<section>
	    <div className="toolbar">
		<button onClick={() => setShowForm(true)}>Add</button>
	    </div>
	    <hr />
	    { showForm && <ClassForm
			      onAdd={refreshData}
			      onCancel={() => setShowForm(false)}/>
	    }
	    <table>
		<thead>
		    <tr>
			<th>Week Day</th>
			<th>Branch</th>
			<th>Level</th>
			<th>Subject</th>
			<th>Time Frame</th>
			<th>Teacher</th>
		    </tr>
		</thead>
		<tbody>
		    { classesPerDay.map(day =>
			day.classes.length ?

			    day.classes.map((c, i) =>
				<tr key={`${day.name}-${c.teacher}-${c.timeframe[0]}`}>
				    { i===0 &&
				      <td rowSpan={day.classes.length || 1}>{day.name}</td>
				    }
				    <td>{c.branch}</td>
				    <td>{c.level}</td>
				    <td>{c.subject}</td>
				    <td>{c.timeframe.join(" - ")}</td>
				    <td>{c.teacher}</td>
				</tr>) :
			    
			    <tr key={day.name}>
				<td>{day.name}</td>
			    </tr>)
		    }
		</tbody>
	    </table>
	</section>
    );
}
