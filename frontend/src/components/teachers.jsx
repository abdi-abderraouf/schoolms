import Crud from "./crud";

export default function Teachers() {
    return (
	<Crud resourceType="teachers"
	      resourceName="Teacher"
	      resourceKey="_id"
	      fields={[
		  {
		      codename: "fullname",
		      desc: "Full Name",
		      required: true
		  },
		  {
		      codename: "subjects",
		      desc: "Subjects taught",
		      transform: str => str.split(",").map(s => s.trim()),
		      toStr: arr => arr.join(", ")
		  }
	      ]} />
    );
}
