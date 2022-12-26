import { ImgHTMLAttributes, useEffect, useRef, useState, type FC } from "react";
import styles from "../styles/Engine.module.css";
import GoogleImage from "../assets/engines/google.png";
import YoutubeImage from "../assets/engines/youtube.png";
import isMac from "../utils/isMac";

export type Engine = {
  name: string;
  src: string;
  alt: string;
  base: string;
  places: {
    name: string;
    href: string;
  }[];
};

const engines: Engine[] = [
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
      // TODO: For future use
      // {
      //   name: "images",
      //   href: "https://www.google.com/images?q=%query%",
      // },
      // {
      //   name: "map",
      //   href: "https://www.google.com/maps?q=%query%",
      // },
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

const Engine: FC<
  {
    engine: Engine;
    index: number;
    isActive: boolean;
  } & ImgHTMLAttributes<HTMLImageElement>
> = ({ engine, isActive, ...props }) => {
  return (
    <img
      src={engine.src}
      alt={engine.alt}
      className={`${isActive ? styles.engineActive : null} snap-center`}
      {...props}
    />
  );
};

const doSearch = (engine: Engine, search: string) => {
  let url = engine.base;
  if (search) {
    url = engine.places[0].href.replace("%query%", search);
  }
  window.location.href = url;
};

const currentOsMac = isMac();

const Engines: FC = () => {
  const [active, setActive] = useState(0);
  const [search, setSearch] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  const isActive = (index: number) => {
    return active === index;
  };

  const changeEngine = (index: number) => {
    setActive(index);
    searchRef.current?.focus();
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((currentOsMac && !event.metaKey) || (!currentOsMac && !event.altKey))
        return;

      const keyInt = parseInt(event.key);

      if (keyInt > 0 && keyInt <= 9 && keyInt <= engines.length) {
        setActive(keyInt - 1);
      } else if (event.key === "c") {
        setSearch("");
      } else {
        return;
      }
      event.preventDefault();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <div
        className={
          styles.engines +
          " snap-x overflow-x-auto justify-start sm:justify-center"
        }
      >
        {engines.map((engine, index) => (
          <Engine
            key={`${engine.name} - ${index}`}
            engine={engine}
            index={index}
            isActive={isActive(index)}
            onClick={() => changeEngine(index)}
          />
        ))}
      </div>
      <div id="container">
        <form
          id="form"
          onSubmit={(e) => {
            e.preventDefault();
            doSearch(engines[active], search);
          }}
        >
          <div id="input">
            <input
              ref={searchRef}
              autoFocus={true}
              id="i"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search ${engines[active].name}`}
              autoComplete="off"
              className="text-4xl sm:text-6xl"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Engines;
