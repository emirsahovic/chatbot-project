import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";

const ShowInfo = () => {
  const [distanceFather, setDistanceFather] = useState();
  const [distanceMother, setDistanceMother] = useState();
  const [distanceHospitalFather, setDistanceHospitalFather] = useState();
  const [distanceHospitalMother, setDistanceHospitalMother] = useState();

  function getPositionAtCenter(element) {
    const { top, left, width, height } = element.getBoundingClientRect();
    return {
      x: left + width / 2,
      y: top + height / 2,
    };
  }

  function getDistanceBetweenElements(a, b) {
    const aPosition = getPositionAtCenter(a);
    const bPosition = getPositionAtCenter(b);

    return Math.hypot(aPosition.x - bPosition.x, aPosition.y - bPosition.y);
  }

  const { info } = useSelector((state) => state.info);

  useEffect(() => {
    if (info.firstPerson === "dad" || (info.firstPerson === "mom" && +info.secondPersonAge > 0)) {
      setDistanceFather(getDistanceBetweenElements(document.getElementById("x2"), document.getElementById("y")));
      setDistanceHospitalFather(getDistanceBetweenElements(document.getElementById("x2"), document.getElementById("z")));
    }

    if (info.firstPerson === "mom" || (info.firstPerson === "dad" && +info.secondPersonAge > 0)) {
      setDistanceMother(getDistanceBetweenElements(document.getElementById("x"), document.getElementById("y")));
      setDistanceHospitalMother(getDistanceBetweenElements(document.getElementById("x"), document.getElementById("z")));
    }
  }, []);

  let firstDigitFather;
  let secondDigitFather;
  let firstDigitMother;
  let secondDigitMother;

  if (info.firstPerson === "dad") {
    firstDigitFather = Number(("" + info.firstPersonAge)[0]);
    secondDigitFather = Number(("" + info.firstPersonAge)[1]);
  } else if (info.firstPerson === "mom" && +info.secondPersonAge > 0) {
    firstDigitFather = Number(("" + info.secondPersonAge)[0]);
    secondDigitFather = Number(("" + info.secondPersonAge)[1]);
  }

  if (info.firstPerson === "mom") {
    firstDigitMother = Number(("" + info.firstPersonAge)[0]);
    secondDigitMother = Number(("" + info.firstPersonAge)[1]);
  } else if (info.firstPerson === "dad" && +info.secondPersonAge > 0) {
    firstDigitMother = Number(("" + info.secondPersonAge)[0]);
    secondDigitMother = Number(("" + info.secondPersonAge)[1]);
  }

  const mother = () => {
    return (
      <div
        style={{ marginLeft: `${secondDigitMother === 0 ? "0.1rem" : secondDigitMother * 1.57 - 1 + "rem"}` }}
        className={`${
          firstDigitMother === firstDigitFather || firstDigitMother === 7
            ? "-mt-28"
            : info.firstPerson === "mom" && +info.secondPersonAge < 1
            ? "mt-72"
            : "mt-[14.5rem]"
        }`}
      >
        <span id="x" className="bg-green-600 text-white rounded-full p-3 text-lg relative z-40 cursor-pointer">
          {info.firstPerson === "mom" ? info.firstPersonAge : info.secondPersonAge > 0 ? info.secondPersonAge : null}
        </span>
        <div className="-mt-3 ml-1">
          <div style={{ width: distanceMother + "px" }} className="bg-[#8533ff] h-[3px] relative">
            <div
              id="hosp2"
              style={{
                width: 260 + "px",
                marginLeft: distanceHospitalMother - firstDigitMother + 10 + "px",
              }}
              className="absolute -top-1 bg-[#8533ff] h-[10px] cursor-pointer hover:bg-purple-500 duration-300 border-[1px] border-gray-700"
            ></div>
            <ReactTooltip anchorId="hosp2" place="top-center" content="Hospital" />
          </div>
        </div>
      </div>
    );
  };

  const father = () => {
    return (
      <div
        style={{ marginLeft: `${secondDigitFather === 0 ? "0.1rem" : secondDigitFather * 1.57 - 1 + "rem"}` }}
        className={`${firstDigitFather === 8 || firstDigitFather === 7 ? "-mt-7" : "mt-72"}`}
      >
        <span id="x2" className="bg-green-900 text-white rounded-full p-3 text-lg relative z-40 cursor-pointer">
          {info.firstPerson === "dad" ? info.firstPersonAge : info.secondPersonAge > 0 ? info.secondPersonAge : null}
        </span>
        <div className="-mt-3 ml-1">
          <div style={{ width: distanceFather + "px" }} className="bg-[#8533ff] h-[3px] relative">
            <div
              id="hosp"
              style={{
                width: 260 + "px",
                marginLeft: distanceHospitalFather - firstDigitFather + 18 + "px",
              }}
              className="absolute -top-1 bg-[#8533ff] h-[10px] cursor-pointer hover:bg-purple-500 duration-300 border-[1px] border-gray-700"
            ></div>
            <ReactTooltip anchorId="hosp" place="top-center" content="Hospital" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen bg-[#eee]">
      <h1 className="text-center pt-20 text-3xl font-semibold">
        Results <span className="font-normal">[Test ID: {info.testId}]</span>
      </h1>
      <div className="flex justify-center items-center mt-16 mb-20">
        <div className="flex">
          <div className="flex flex-col">
            <p className="text-center font-bold text-gray-700 text-3xl mb-2">40</p>
            <div className="bg-white border-r-[1px] border-l-[3px] border-t-[3px] border-b-[3px] border-gray-400 border-r-slate-400 rounded-tl-lg rounded-bl-lg w-64 h-[38rem] shadow-xl">
              {firstDigitFather === 4 && father()}
              {firstDigitMother === 4 && mother()}
            </div>
          </div>
          <div className="flex flex-col">
            <p className="text-center font-bold text-gray-700 text-3xl mb-2">50</p>
            <div className="bg-white border-r-[1px] border-t-[3px] border-b-[3px] border-gray-400 border-r-slate-400 w-64 h-[38rem] shadow-xl">
              {firstDigitFather === 5 && father()}
              {firstDigitMother === 5 && mother()}
            </div>
          </div>
          <div className="flex flex-col">
            <p className="text-center font-bold text-gray-700 text-3xl mb-2">60</p>
            <div className="bg-white border-r-[1px] border-t-[3px] border-b-[3px] border-gray-400 border-r-slate-400 w-64 h-[38rem] shadow-xl">
              {firstDigitFather === 6 && father()}
              {firstDigitMother === 6 && mother()}
            </div>
          </div>
          <div className="flex flex-col">
            <p className="text-center font-bold text-gray-700 text-3xl mb-2">70</p>
            <div className="bg-white border-t-[3px] border-b-[3px] border-gray-400  w-64 h-[38rem] shadow-xl">
              <div style={{ marginLeft: 5 * 1.57 - 1 + "rem" }} className="mt-72">
                <span
                  id="z"
                  className={`${firstDigitFather === 8 &&
                    secondDigitFather === 4 &&
                    "ml-8"} invisible p-3 text-lg relative z-40 cursor-pointer opacity-0`}
                >
                  75
                </span>
                <ReactTooltip anchorId="y" place="top-center" content="Life Expectancy" />
              </div>
              {firstDigitFather === 7 && father()}
              {firstDigitMother === 7 && mother()}
            </div>
          </div>
          <div className="flex flex-col">
            <p className="text-center font-bold text-gray-700 text-3xl mb-2">80</p>
            <div className="bg-white border-[3px] border-l-[1px] border-gray-400 border-l-slate-400 rounded-tr-lg rounded-br-lg  w-64 h-[38rem] shadow-xl">
              <div style={{ marginLeft: 5 * 1.57 - 1 + "rem" }} className="mt-72">
                <span
                  id="y"
                  className={`${firstDigitFather === 8 &&
                    secondDigitFather === 4 &&
                    "ml-8"} bg-blue-600 text-white rounded-full p-3 text-lg relative z-40 cursor-pointer`}
                >
                  85
                </span>
                <ReactTooltip anchorId="y" place="top-center" content="Life Expectancy" />
              </div>
              {firstDigitFather === 8 && father()}
              {firstDigitMother === 8 && mother()}
            </div>
          </div>
        </div>
        <ReactTooltip anchorId="x2" place="top-center" content="Dad's age" />
        <ReactTooltip anchorId="x" place="top-center" content="Mom's age" />
      </div>
    </div>
  );
};

export default ShowInfo;
