async function errFromRes(res) {
    const hasBody = String(res.headers.get("Content-Type"))
	  .startsWith("application/json");

    return new Error(hasBody ?
		     (await res.json()).error :
		     res.statusText);
}

function request(url, { method="GET", payload, auth }={}) {
    const options = { method };

    if (payload) {
	options.headers = { "Content-Type": "application/json" };
	options.body = JSON.stringify(payload);
    }
    
    if (auth) {
	options.headers = {
	    ...(options.headers || {}),
	    "Authentication": `bearer ${auth}`
	};
    }

    return fetch(url, options);
}

/** Artificial delay, usefull for debugging */
function delay(ms) {
    return new Promise(ok => setTimeout(ok, ms));
}

const api = {
    token: null,
    
    async authenticate(user) {
	await delay(500);

	const res = await request("/api/auth", {
	    method: "POST",
	    payload: user
	});
	
	if (!res.ok) throw new Error((await res.json()).error);

	this.token = user.token;
    },
    
    async login(username, password) {
	const res = await request("/api/login", {
	    method: "POST",
	    payload: { username, password }
	});

	if (res.ok) {
	    const loggedUser = await res.json();
	    this.token = loggedUser.token;
	    return loggedUser;
	}
	throw new Error((await res.json()).error);
    },

    async add(resourceType, obj) {
	const res = await request(`/api/${resourceType}`, {
	    method: "POST",
	    payload: obj,
	    auth: this.token
	});
	
	if (!res.ok) throw await errFromRes(res);
    },

    async getAll(resourceType) {
	const res = await request(`/api/${resourceType}`,
				   { auth: this.token });

	if (res.ok) return await res.json();
	throw await errFromRes(res);
    }
};

export default api;
