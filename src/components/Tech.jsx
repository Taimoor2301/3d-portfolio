import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { useEffect, useState } from "react";

const Tech = () => {
  let [tech, setTech] = useState(technologies);
  useEffect(() => {
    if (window.innerWidth < 450) {
      setTech(tech.slice(0, 5));
    }
  }, []);

  return (
    <div className="flex flex-row flex-wrap justify-center gap-10">
      {tech.map((technology) => {
        return (
          <div className="w-28 h-28" key={technology.name}>
            <BallCanvas icon={technology.icon} />
          </div>
        );
      })}
    </div>
  );
};

export default SectionWrapper(Tech, "");
