import Crud from "./crud";

export default function Subjects() {
    return (
	<Crud resourceType="subjects"
	      resourceName="Subject"
	      resourceKey="code"
	      fields={[
		  {
		      codename: "code",
		      desc: "Code Name",
		      required: true,
		      transform: str => str.toUpperCase()
		  },
		  {
		      codename: "description",
		      desc: "Description"
		  }
	      ]} />
    );
}
