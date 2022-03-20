/**
 *
 * Checks for the operating user of the current browser window.
 * Possible values:
 * - 'Windows'
 * - 'MacOS'
 * - 'Linux'
 * - 'Unknown'
 *
 * @returns {string}
 */
const useOS = () => {
  let operatingSystem = "Unknown";
  if (
    typeof navigator.userAgentData === "undefined" ||
    typeof navigator.userAgentData.platform === "undefined"
  ) {
    if (navigator.platform.indexOf("Win") !== -1) {
      operatingSystem = "Windows";
    }
    if (navigator.platform.indexOf("Mac") !== -1) {
      operatingSystem = "MacOS";
    }
    if (navigator.platform.indexOf("X11") !== -1) {
      operatingSystem = "Linux";
    }
    if (navigator.platform.indexOf("Linux") !== -1) {
      operatingSystem = "Linux";
    }
    return operatingSystem;
  }

  if (navigator.userAgentData.platform.indexOf("Win") !== -1) {
    operatingSystem = "Windows";
  }
  if (navigator.userAgentData.platform.indexOf("Mac") !== -1) {
    operatingSystem = "MacOS";
  }
  if (navigator.userAgentData.platform.indexOf("X11") !== -1) {
    operatingSystem = "Linux";
  }
  if (navigator.userAgentData.platform.indexOf("Linux") !== -1) {
    operatingSystem = "Linux";
  }
  return operatingSystem;
};

export default useOS;
