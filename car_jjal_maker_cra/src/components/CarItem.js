function CarItem(props) 
{
  return (
  <li>
      <img 
      src = {props.img} 
      style = {{ width : "150px"}}
      onClick = {onFaveritesClick}                
      />
  </li>
  );
}

function onFaveritesClick({img})
{
  console.log("이미지 눌렀음");
  console.log(img);
  // const nextFaverites = [...faverites,mainCarImg];
  // setFaverites(nextFaverites);
  // jsonLocalStorage.setItem("faverites",nextFaverites);            
}

export default CarItem;