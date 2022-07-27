import React from 'react';

const Form = ({updateMainCar}) => {           

    const includesHangul = (text) => /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/i.test(text);
    const [value,setValue]  = React.useState('');
    const [errorMsg,setErrorMsg]  = React.useState('');
    
    function handleInputChange(e)
    {
        const userValue = e.target.value;
        console.log(includesHangul(userValue));
        setErrorMsg('');
        if(includesHangul(userValue))
        {
            setErrorMsg('한글은 입력할수 없습니다');
        }
        setValue(userValue.toUpperCase());
    }
  
    function handleFormSubmit(e) {
        e.preventDefault();
  
        setErrorMsg("");
        if(value === "")
        {
            setErrorMsg('빈 값으로 만들수 없습니다');
            return;
        }
  
        updateMainCar(value);
    }
  
    return (
        <form onSubmit = {handleFormSubmit}>
        <input type = "text" name = "name" placeholder="영어 대사를 입력해주세요"
        onChange= {handleInputChange}
        value = {value}
        />
        <button type = "submit"> 생성 </button>
        <p style = {{color : 'red'}}> {errorMsg} </p>
    </form>
    );
  }

  export default Form;