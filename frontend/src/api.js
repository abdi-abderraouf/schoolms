function post(url, obj, token=null) {
    const headers = { "Content-Type": "application/json" };
    if (token) headers["Authentication"] = `bearer ${token}`;
    
    return fetch(url, {
	method: "POST",
	headers,
	body: JSON.stringify(obj)
    });
}


/** Artificial delay, usefull for debugging */
function delay(ms) {
    return new Promise(ok => setTimeout(ok, ms));
}

const api = {
    token: null,
    
    async authenticate(user) {
	await delay(500);

	const res = await post("/api/auth", user);
	
	if (!res.ok) throw new Error((await res.json()).error);

	this.token = user.token;
    },
    
    async login(username, password) {
	const res = await post("/api/login", { username, password });

	if (res.ok) {
	    const loggedUser = await res.json();
	    this.token = loggedUser.token;
	    return loggedUser;
	}
	throw new Error((await res.json()).error);
    },

    async add(resourceType, obj) {
	const res = await post(`/api/${resourceType}`, obj, this.token);
	
	if (!res.ok) {
	    const hasBody = String(res.headers.get("Content-Type"))
		  .startsWith("application/json");

	    throw new Error(hasBody ?
			    (await res.json()).error :
			    "Internal Server Error");
	}
    }
};

export default api;
