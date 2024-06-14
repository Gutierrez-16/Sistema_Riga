const getToken = () => {
  return localStorage.getItem("token");
};

const getHeaders = () => {
  const token = getToken();
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

const handleConnectionError = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};

const apiClient = async (url, method, body = null) => {
  try {
    const options = {
      method,
      headers: getHeaders(),
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    if (!response.ok) {
      handleConnectionError();
      throw new Error(
        `API request failed with status: ${response.status} - ${response.statusText}`
      );
    }

    if (response.status === 204) {
      return null;
    }

    if (method === "GET") {
      const data = await response.json();
      return data;
    } else {
      const data = await response.text();
      return data;
    }
  } catch (error) {
    console.error("Error:", error);
    // Handle the connection error
    handleConnectionError(error);
  }
};

export const get = (url) => apiClient(url, "GET");
export const post = (url, body) => apiClient(url, "POST", body);
export const put = (url, body) => apiClient(url, "PUT", body);
export const del = (url) => apiClient(url, "DELETE");
export const patch = (url, body) => apiClient(url, "PATCH", body);

export default {
  get,
  post,
  put,
  del,
  patch,
};
