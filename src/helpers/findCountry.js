import axios from "axios";

function findCountry(border, setName) {
  console.log("testenTESTEN");
  async function fetchData() {
    try {
      const { data } = await axios.get(`https://restcountries.com/v2/all`);
      //   setResult(data);
      console.log("tada", data[0]);

      changeName(data, border, setName);
    } catch (e) {
      console.error(e);
    }
  }

  fetchData();
}

const changeName = (data, border, setName) => {
  const findCountry = data.filter((country) => country.cca3 === border);

  //country.cca3 == border);

  setName(findCountry);
  console.log("wat", findCountry);
};

export default findCountry;

// const changeName = () => {
//   const findCountry = data.filter((country) => country.cca3 === border);
//   setName(findCountry);
// };

// console.log(cca3, changeName());
