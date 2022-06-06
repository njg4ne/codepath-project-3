import axios from "axios";

class API {
  constructor(url) {
    this.url = url;
    this.token = null;
  }
  setToken(token) {
    this.token = token;
  }
  async request({ endpoint, method = "GET", data = {} }) {
    const fqUrl = `${this.url}/${endpoint}`;
    const headers = {
      "Content-Type": "application/json",
    };
    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
      // console.log(headers);
    }
    try {
      // console.log({ url: fqUrl, method, data, headers });
      const res = await axios({ url: fqUrl, method, data, headers });
      return { data: res.data, error: null };
    } catch (error) {
      //   console.error({ errorResponse: error.response });
      const innerError = error?.response?.data?.error;
      const status = innerError?.status;
      const msg = innerError?.message;
      let errorMsg;
      if (status && msg) {
        errorMsg = `API Error, ${status}, ${msg}`;
        console.error(`${method} on ${endpoint} failed with:`, errorMsg);
      }

      return { data: null, error: errorMsg || String(error) };
    }
  }
  async auth(credentials, endpoint) {
    const method = "POST";
    const data = credentials;
    return await this.request({ endpoint, method, data });
  }
  async login(credentials) {
    return await this.auth(credentials, "auth/login");
  }
  async register(credentials) {
    return await this.auth(credentials, "auth/register");
  }
}

export default new API(
  process.env.REACT_APP_API_URL || "http://localhost:3002"
);
