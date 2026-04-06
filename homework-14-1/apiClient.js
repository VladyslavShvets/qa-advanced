const axios = require("axios");

const apiClient = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const method = config.method ? config.method.toUpperCase() : "GET";
    const fullUrl = `${config.baseURL}${config.url}`;

    config.metadata = {
      startedAt: Date.now(),
    };

    console.log(`[axios][request] ${method} ${fullUrl}`);

    if (config.params) {
      console.log(`[axios][params] ${JSON.stringify(config.params)}`);
    }

    if (config.data) {
      console.log(`[axios][body] ${JSON.stringify(config.data)}`);
    }

    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => {
    const method = response.config.method
      ? response.config.method.toUpperCase()
      : "GET";
    const fullUrl = `${response.config.baseURL}${response.config.url}`;
    const duration = Date.now() - response.config.metadata.startedAt;

    console.log(
      `[axios][response] ${response.status} ${method} ${fullUrl} (${duration} ms)`,
    );

    return response;
  },
  (error) => {
    if (error.response) {
      const method = error.config?.method
        ? error.config.method.toUpperCase()
        : "GET";
      const fullUrl = `${error.config?.baseURL || ""}${error.config?.url || ""}`;

      console.log(
        `[axios][error] ${error.response.status} ${method} ${fullUrl}`,
      );
    }

    return Promise.reject(error);
  },
);

module.exports = {
  apiClient,
};
