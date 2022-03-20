const useLogger = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const logger = (message, ...optionalDetails) => {
    if (
      typeof window === "undefined" ||
      process.env.NODE_ENV === "development" ||
      urlSearchParams.has("debugOnprod")
    ) {
      console.log(message, ...optionalDetails);
    }
  };
  return logger;
};

export default useLogger;
