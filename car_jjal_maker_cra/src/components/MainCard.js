//함수인데 function으로 명시하지 않은 화살표 함수형태로 
//주의:새로운 문법 props를 쓰지 않고 
//사용자 img를 직접 사용하려면 ({img})라고 하고 아래에 그대로 {img}를 쓰면 된다
const MainCard = ({img,onHeartClick,alreadyFaverites}) => {

    const heartIcon = alreadyFaverites ? "💖" : "🤍";
  
    return (
        <div className = "main-card">
        <img 
        src = {img}
        alt = "자동차"
        width = "400"
        />
        <button onClick = {onHeartClick}>{heartIcon}</button>    
        </div>
    );
  } 

  export default MainCard;