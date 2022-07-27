import './App.css';
import React from "react"
import Title from "./components/Title"
import Form from "./components/Form"
import CarItem from "./components/CarItem"
import MainCard from "./components/MainCard"

const CAR1 = "http://img.danawa.com/cms/img/2014/06/13/1402626434_thumb.jpg";
const CAR2 = "https://c.wallhere.com/photos/85/46/Tesla_Motors_Tesla_Model_S_car-56926.jpg!d";
const CAR3 = "https://img.hankyung.com/photo/202104/01.25994984.1.jpg";
const CAR4 = "https://t1.daumcdn.net/cfile/tistory/9983F83A5B9F450528";

const fetchCat = async (text) => {
  const OPEN_API_DOMAIN = "https://cataas.com";
  const response = await fetch(`${OPEN_API_DOMAIN}/cat/says/${text}?json=true`);
  const responseJson = await response.json();
  return `${OPEN_API_DOMAIN}/${responseJson.url}`;
};

//JSON형식의 데이터 저장/로딩
const jsonLocalStorage = {
  setItem: (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
  },
  getItem: (key) => {
  return JSON.parse(localStorage.getItem(key));
  },
};

//console.log("부릉");

function Faverites({faverites}) 
{
  if(faverites.length === 0)
  {
      return <div> 사진 위 하트를 눌러 사진을 저장해봐요~</div>
  }

  // const cars = [CAR1,CAR2,CAR3,CAR4];
  // //주의: react 문법에서 class는 className으로 사용해야 한다
  // //아래 샘플 - Array.map
  // return (
  //     <ul className = "favorites">
  //     { cars.map((car) => ( <CarItem img={car} key={car}/>))}
  //     </ul>
  // ); 

  //주의: react 문법에서 class는 className으로 사용해야 한다
  //아래 샘플 - Array.map
  return (
      <ul className = "favorites">
      { faverites.map((car) => ( <CarItem img={car} key={car}/>))}
      </ul>
  ); 
}   

//Component 코드 재사용(태그 처럼 사용)     
const App = () => {

  let [counter,setCounter] = React.useState(() => {
      return jsonLocalStorage.getItem("nowcounter") || 1;
  });

  const [mainCarImg,setCarImg] = React.useState(CAR1);
  //const [faverites,setFaverites] = React.useState([CAR1,CAR2,CAR3]);
  //faverite가 null이면 []을 사용해라
  //let jsonResultFaverites = jsonLocalStorage.getItem("faverites") || [CAR1,CAR2,CAR3];            
  const [faverites,setFaverites] = React.useState(() => {
      return jsonLocalStorage.getItem("faverites") || [];
  });
              
  //localStorage 항목의 제거 - localStorage.removeItem('counter');
  //localStorage 항목의 전체 제거 - localStorage.clear();
  
  const alreadyFaverites = faverites.includes(mainCarImg);

  async function setInitCat() {
      
      const newCat = await fetchCat('First cat');
      console.log(newCat);
      setCarImg(newCat);
  }

  React.useEffect(() => {
      setInitCat();   
  },[]);

  //UI가 바뀔때말고 원하는 시점에 함수를 호출하고 싶을때 사용하는 함수가 useEffect

  //여기서는 counter가 변경될때마다 호출
  // React.useEffect(() => {
  //     console.log("hello");
  // },[counter]);

  //만일 앱이 최초에 생성될때 호출하고 싶다면 아래처럼 빈 배열 사용
  // React.useEffect(() => {
  //     console.log("hello");
  // },[]);
  
  async function updateMainCar(value) {

      const newCat = await fetchCat(value);
      setCarImg(newCat);

      setCounter((prev) => {
          const nextCounter = prev + 1;
          jsonLocalStorage.setItem("nowcounter",nextCounter);
          return nextCounter; 
      });             
  }
  
  function handleHeartClick()
  {
      const nextFaverites = [...faverites,mainCarImg];
      setFaverites(nextFaverites);
      jsonLocalStorage.setItem("faverites",nextFaverites);
  }

  //handler함수이름을 props으로 넘길때 약속 on~으로 시작
  return (
      <div>
          <Title> {counter}번째 자동차 가라사대</Title>
          <Form updateMainCar = {updateMainCar}/>
          <MainCard img = {mainCarImg} onHeartClick = {handleHeartClick}  alreadyFaverites = {alreadyFaverites} />
          <Faverites faverites = {faverites}/> 
      </div>
  );
}

export default App;
