function post(url, obj) {
    return fetch(url, {
	method: "POST",
	headers: {
	    "Content-Type": "application/json"
	},
	body: JSON.stringify(obj)
    });
}


/** Artificial delay, usefull for debugging */
function delay(ms) {
    return new Promise(ok => setTimeout(ok, ms));
}

const api = {
    async authenticate(user) {
	await delay(500);

	const res = await post("/api/auth", user);
	if (!res.ok) {
	    const errorObj = await res.json();
	    throw new Error(errorObj.error);
	}
    },
    
    async login(username, password) {
	const res = await post("/api/login", { username, password });
	if (res.ok) return await res.json();

	else {
	    const errorObj = await res.json();
	    throw new Error(errorObj.error);
	}
    },

    async add(resource, obj) {
    }
};

export default api;
