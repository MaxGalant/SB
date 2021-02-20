import axios from "axios";
import { useState } from "react";

const Calculator = () => {
  const [dict, setDict] = useState({});
  const [text, setText] = useState("");
  const [etalon, setEtalon] = useState({});
  const [saveEtalon, setSaveEtalon] = useState({});
  const [count, setCount] = useState(0);
  const [getEtalon, setGetEtalon] = useState({});
  const [message, setMessage] = useState("");
  let table = [];
  function Count(e) {
    let str =
      e.target.parentElement.parentElement.parentElement.children[0].children[1]
        .value;
    if (str.length > 0) {
      setText(str);
      let UpStr = str.toUpperCase();
      let arr = UpStr.split("");
      if (
        e.target.parentElement.parentElement.children[0].children[0].checked ===
          true &&
        e.target.parentElement.parentElement.children[0].children[1].checked ===
          true
      ) {
        setMessage("Please, select lenguage");
      } else if (
        e.target.parentElement.parentElement.children[0].children[0].checked ===
          false &&
        e.target.parentElement.parentElement.children[0].children[1].checked ===
          false
      ) {
        setMessage("Please, select lenguage");
      } else if (
        e.target.parentElement.parentElement.children[0].children[0].checked ===
        true
      ) {
        setMessage("");
        let dictUkr = {
          А: 0,
          Б: 0,
          В: 0,
          Г: 0,
          Ґ: 0,
          Д: 0,
          Е: 0,
          Є: 0,
          Ж: 0,
          З: 0,
          И: 0,
          І: 0,
          Й: 0,
          К: 0,
          Л: 0,
          М: 0,
          Н: 0,
          О: 0,
          П: 0,
          Р: 0,
          С: 0,
          Т: 0,
          У: 0,
          Ф: 0,
          Х: 0,
          Ц: 0,
          Ч: 0,
          Ш: 0,
          Щ: 0,
          Ь: 0,
          Ю: 0,
          Я: 0,
        };
        let etalonDict = {};
        let count = 0;
        for (let i = 0; i < arr.length; i++) {
          if (arr[i] in dictUkr) {
            let s = dictUkr[arr[i]];
            s++;
            dictUkr[arr[i]] = s;
          } else {
            count++;
          }
        }
        for (let key in dictUkr) {
          etalonDict[key] = dictUkr[key];
          let s = dictUkr[key];
          dictUkr[key] =
            Math.round(((s * 100) / (arr.length - count)) * 100) / 100;
        }

        setDict(dictUkr);
        setEtalon(etalonDict);
        setCount(arr.length - count);

        axios.get("http://localhost:3001/getEtalonUkr").then((Response) => {
          setGetEtalon(Response.data[0]);
        });
      } else if (
        e.target.parentElement.parentElement.children[0].children[1].checked ===
        true
      ) {
        setMessage("");
        let dictEng = {
          A: 0,
          B: 0,
          C: 0,
          D: 0,
          E: 0,
          F: 0,
          G: 0,
          H: 0,
          I: 0,
          J: 0,
          K: 0,
          L: 0,
          M: 0,
          N: 0,
          O: 0,
          P: 0,
          Q: 0,
          R: 0,
          S: 0,
          T: 0,
          U: 0,
          V: 0,
          W: 0,
          X: 0,
          Y: 0,
          Z: 0,
        };
        let etalonDict = {};

        let count = 0;
        for (let i = 0; i < arr.length; i++) {
          if (arr[i] in dictEng) {
            let s = dictEng[arr[i]];
            s++;
            dictEng[arr[i]] = s;
          } else {
            count++;
          }
        }

        for (let key in dictEng) {
          etalonDict[key] = dictEng[key];
          let s = dictEng[key];
          dictEng[key] =
            Math.round(((s * 100) / (arr.length - count)) * 100) / 100;
        }

        setDict(dictEng);
        setEtalon(etalonDict);
        setCount(arr.length - count);

        axios.get("http://localhost:3001/getEtalonEng").then((Response) => {
          setGetEtalon(Response.data[0]);
        });
      }
    }
    else{
      setMessage("Please, input text")
    }
  }
  function Save(e) {
    if (
      e.target.parentElement.parentElement.children[0].children[0].checked ===
        true &&
      e.target.parentElement.parentElement.children[0].children[1].checked ===
        true
    ) {
    } else if (
      e.target.parentElement.parentElement.children[0].children[1].checked ===
      true
    ) {
      axios
        .post("http://localhost:3001/saveEng", { text: text, dict: dict })
        .then((Response) => {});
      axios.get("http://localhost:3001/getEtalonEng").then((Response) => {
        setSaveEtalon(Response.data[0]);

        axios
          .put("http://localhost:3001/etalonEng", {
            count: count,
            save: saveEtalon,
            etalon: etalon,
          })
          .then((Response) => {});
      });
    } else if (
      e.target.parentElement.parentElement.children[0].children[0].checked ===
      true
    ) {
      axios
        .post("http://localhost:3001/saveUk", { text: text, dict: dict })
        .then((Response) => {});
      axios.get("http://localhost:3001/getEtalonUkr").then((Response) => {
        setSaveEtalon(Response.data[0]);
        axios
          .put("http://localhost:3001/etalonUkr", {
            save: saveEtalon,
            count: count,
            etalon: etalon,
          })
          .then((Response) => {});
      });
    }
  }
  function Clean(e) {
    e.target.parentElement.parentElement.parentElement.children[0].children[1].value =
      "";
    if (
      e.target.parentElement.parentElement.children[0].children[0].checked ===
        true &&
      e.target.parentElement.parentElement.children[0].children[1].checked ===
        true
    ) {
      console.log("error");
    } else if (
      e.target.parentElement.parentElement.children[0].children[0].checked ===
      true
    ) {
      let dictUkr = {
        А: 0,
        Б: 0,
        В: 0,
        Г: 0,
        Ґ: 0,
        Д: 0,
        Е: 0,
        Є: 0,
        Ж: 0,
        З: 0,
        И: 0,
        І: 0,
        Й: 0,
        К: 0,
        Л: 0,
        М: 0,
        Н: 0,
        О: 0,
        П: 0,
        Р: 0,
        С: 0,
        Т: 0,
        У: 0,
        Ф: 0,
        Х: 0,
        Ц: 0,
        Ч: 0,
        Ш: 0,
        Щ: 0,
        Ь: 0,
        Ю: 0,
        Я: 0,
      };
      setDict(dictUkr);
    } else if (
      e.target.parentElement.parentElement.children[0].children[1].checked ===
      true
    ) {
      let dictEng = {
        A: 0,
        B: 0,
        C: 0,
        D: 0,
        E: 0,
        F: 0,
        G: 0,
        H: 0,
        I: 0,
        J: 0,
        K: 0,
        L: 0,
        M: 0,
        N: 0,
        O: 0,
        P: 0,
        Q: 0,
        R: 0,
        S: 0,
        T: 0,
        U: 0,
        V: 0,
        W: 0,
        X: 0,
        Y: 0,
        Z: 0,
      };
      setDict(dictEng);
    }
  }
  function ChangeUK() {
    let en = document.getElementById("EN");
    en.checked = false;
  }
  function ChangeEN() {
    let uk = document.getElementById("UK");
    uk.checked = false;
  }
  function SortValues() {
    var sortable = [];
    for (var key in dict) {
      sortable.push([key, dict[key]]);
    }

    sortable.sort(function (a, b) {
      return a[1] - b[1];
    });
    let newDict = {};
    newDict = Object.fromEntries(sortable);
    setDict(newDict);
  }
  function SortKeys() {
    function uaSort(s1, s2) {
      return s1.localeCompare(s2);
    }
    setDict(
      Object.keys(dict)
        .sort(uaSort)
        .reduce(function (result, key) {
          result[key] = dict[key];
          return result;
        }, {})
    );
  }
  let freq_en = {
    A: 8.17,
    B: 1.49,
    C: 2.78,
    D: 4.25,
    E: 12.7,
    F: 2.23,
    G: 2.02,
    H: 6.09,
    I: 6.97,
    J: 0.15,
    K: 0.77,
    L: 4.03,
    M: 2.41,
    N: 6.75,
    O: 7.51,
    P: 1.93,
    Q: 0.1,
    R: 5.99,
    S: 6.33,
    T: 9.06,
    U: 2.76,
    V: 0.98,
    W: 2.36,
    X: 0.15,
    Y: 1.97,
    Z: 0.07,
  };
  let freq_ua = {
    А: 7.2,
    Б: 1.7,
    В: 5.2,
    Г: 1.6,
    Ґ: 0.01,
    Д: 3.5,
    Е: 1.7,
    Є: 0.8,
    Ж: 0.9,
    З: 2.3,
    И: 6.1,
    І: 5.7,
    Й: 0.6,
    К: 3.5,
    Л: 3.6,
    М: 3.1,
    Н: 6.5,
    О: 9.4,
    П: 2.9,
    Р: 4.7,
    С: 4.1,
    Т: 5.4,
    У: 4.0,
    Ф: 0.1,
    Х: 1.2,
    Ц: 0.6,
    Ч: 1.8,
    Ш: 1.2,
    Щ: 0.1,
    Ь: 2.9,
    Ю: 0.4,
    Я: 2.9,
  };
  for (let key in dict) {
    table.push(
      <div key={key}>
        <div className="TableRow">
          <div className="Symvol">{key}</div>
          <div className="Persent">{dict[key]}%</div>
          <div className="Etalon">
            {document.getElementById("EN").checked === true &&
            document.getElementById("UK").checked === false
              ? freq_en[key]
              : document.getElementById("UK").checked === true &&
                document.getElementById("EN").checked === false
              ? freq_ua[key]
              : 0}
            %
          </div>
          <div className="MyEtalon">
            {((getEtalon[key] * 100) / getEtalon["Sum"]).toFixed(1)}%
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="CalculatorBlock">
      <div className="TextBlock">
        <div className="Title">Text</div>
        <textarea className="Text"></textarea>
        <div className="Message">{message}</div>
      </div>
      <div className="ButtonBlock">
        <div className="LenguageBlock">
          <input type="checkbox" className="UK" id="UK" onClick={ChangeUK} />
          UK
          <input type="checkbox" className="EN" id="EN" onClick={ChangeEN} />
          EN
        </div>
        <div className="ButBlock">
          <button className="But" onClick={Count}>
            Count
          </button>
          <button className="But" onClick={Clean}>
            Clean
          </button>
          <button className="But" onClick={Save}>
            Save
          </button>
          <button className="But" onClick={SortKeys}>
            Sort by keys
          </button>
          <button onClick={SortValues} className="But">
            Sort by values
          </button>
        </div>
      </div>
      <div className="TableBlock">
        <div className="EnTable">
          <div className="TableRow">
            <div className="Symvol">Letter</div>
            <div className="Persent">%</div>
            <div className="Etalon">Etalon</div>
            <div className="MyEtalon">My</div>
          </div>
          {table}{" "}
        </div>
      </div>
    </div>
  );
};
export default Calculator;
