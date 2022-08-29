import { createContext } from "react";

const definedContexts = [ "Notif" ];

const Ctx = definedContexts
      .reduce((prev, curr) => (
	  {
	      ...prev,
	      [curr]: createContext()
	  }), {});

export default Ctx;

