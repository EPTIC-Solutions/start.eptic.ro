import { createContext, useContext, useState } from "react";
import GoogleImage from "/engines/google.png";
import YoutubeImage from "/engines/youtube.png";

const engineContext = createContext();

export const EngineProvider = ({ children }) => {
  const engine = useProvideEngine();
  return (
    <engineContext.Provider value={engine}>{children}</engineContext.Provider>
  );
};

export const useEngine = () => {
  return useContext(engineContext);
};

const useProvideEngine = () => {
  const engines = [
    {
      name: "Google",
      src: GoogleImage,
      alt: "Google Logo",
      base: "https://google.com/",
      places: [
        {
          name: "web",
          href: "https://www.google.com/search?q=%query%",
        },
        {
          name: "images",
          href: "https://www.google.com/images?q=%query%",
        },
        {
          name: "map",
          href: "https://www.google.com/maps?q=%query%",
        },
      ],
    },
    {
      name: "Youtube",
      src: YoutubeImage,
      alt: "Youtube Logo",
      base: "https://youtube.com/",
      places: [
        {
          name: "search",
          href: "https://youtube.com/results?search_query=%query%",
        },
      ],
    },
  ];

  const [active, setActive] = useState(engines[0]);
  const [clearInput, setClearInput] = useState(false);

  const isActive = (name) => {
    return name === active.name;
  };

  const handleActiveChange = (name) => {
    setActive(engines.find((e) => e.name === name));
  };

  const doSearch = (search) => {
    // TODO: Implement different places
    let url = "";
    if (!search) {
      url = active.base;
    } else {
      url = active.places[0].href.replace("%query%", search);
    }
    window.location.href = url;
  };

  return {
    engines,
    isActive,
    active,
    setActive,
    doSearch,
    handleActiveChange,
    clearInput,
    setClearInput,
  };
};
