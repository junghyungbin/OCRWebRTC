import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import imageCompression from "browser-image-compression"; // npm install browser-image-compression --save
import { useEffect } from "react";
import styled from "styled-components";

const SignUp22Page = () => {
  const imageinput = useRef();

  const [inputName, setInputName] = useState("");
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");
  const [inputSecondPw, setInputSecondPw] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPhoneNum, setInputPhoneNum] = useState("");
  const [inputImage, setInputImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [inputNicName, setInputNicName] = useState("Unregistered");
  const [privateEmail, setPrivateEmail] = useState(true);
  const [privatePhoneNum, setPrivatePhoneNum] = useState(true);
  const [checkInformation, setCheckInformation] = useState(false);

  // useEffect(()=>{twitSubmit()}, [inputImage])

  const navigate = useNavigate();

  const inputNameHandler = (event) => {
    setInputName(event.target.value);
  };
  const inputIdHandler = (event) => {
    setInputId(event.target.value);
  };
  const inputPwHandler = (event) => {
    setInputPw(event.target.value);
  };
  const inputSecondPwHandler = (event) => {
    setInputSecondPw(event.target.value);
  };
  const inputEmailHandler = (event) => {
    setInputEmail(event.target.value);
  };
  const inputPhoneNumHandler = (event) => {
    setInputPhoneNum(event.target.value);
  };
  const inputImageHandler = (event) => {
    // setInputImage(event.target.value);
    event.preventDefault();
    // setInputImage(URL.createObjectURL(event.target.files[0]))

    //이미지 미리보기 코드 해석 참고: https://velog.io/@devyouth94/react-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EB%A6%AC%EC%82%AC%EC%9D%B4%EC%A7%95%EC%9D%84-%ED%95%B4%EB%B3%B4%EC%9E%90-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EB%AF%B8%EB%A6%AC%EB%B3%B4%EA%B8%B0
    const encodeFile = (file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise((resolve) => {
        reader.onload = () => {
          setPreviewImage(reader.result);
          resolve();
        };
      });
    };

    // 이미지 리사이징
    const [file] = event.target.files;
    imageCompression(file, {
      maxSizeMB: 1,
      maxWidthOrHeight: 100,
    }).then((compressedFile) => {
      const newFile = new File([compressedFile], file.name, {
        type: file.type,
      });

      //이미지 미리보기 관련
      encodeFile(newFile);
      setInputImage(newFile);
    });
  };

  const deleteFileImage = () => {
    // URL.revokeObjectURL(inputImage);
    // setInputImage('');
    // imageinput.current.value = null
    // encodeFile(null)
    setPreviewImage(null);
    imageinput.current.value = null;
  };
  const inputNicNameHandler = (event) => {
    setInputNicName(event.target.value);
  };

  const changePrivateEmailHandler = () => {
    setPrivateEmail(!privateEmail);
  };
  const changePrivatePhoneNumHandler = () => {
    setPrivatePhoneNum(!privatePhoneNum);
  };

  const InfoAgreeCheck = () => {
    setCheckInformation(!checkInformation);
  };

  const JoinSuccessHandler = async() => {
    // 이미지 파일 서버 보내기
    const formData = new FormData();
    formData.append("profilePhoto", inputImage);

    await fetch(`http://aeoragy.iptime.org:18081/file`, {
      method: "POST",
      headers: {
        // 'Content-Type': 'multipart/form-data',
        redirect: "follow",
      },
      cache: "no-cache",
      body: JSON.stringify({
        formData,
      }),
    })
      .then((response) => {
        setInputImage(response.json());
      })
      // .then((response) => {
      //   console.log(JSON.stringify(response));
      // })
      .catch((err) => console.log(err));
    //await 쓰려면 = async () => { 해줘야 됨




    console.log(
      JSON.stringify({
        email: inputEmail,
        emailPublic: +privateEmail, // 최종 privateEmail이 + true 면 1 ,  + false 면 0 결과로 보내줌
        nickname: inputNicName,
        password: inputPw,
        profilePhoto: inputImage,
        tel: inputPhoneNum,
        telPublic: +privatePhoneNum,
        userId: inputId,
        userName: inputName,
      })
    );
    if (inputPw !== inputSecondPw) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (
      inputName === "" ||
      inputId === "" ||
      inputPw === "" ||
      inputSecondPw === "" ||
      inputEmail === "" ||
      inputPhoneNum === ""
    ) {
      alert("필수사항 입력해주세요.");
      return;
    }
    if (checkInformation === false) {
      alert("정보 제공 동의는 필수입니다.");
      return;
    }
    // await fetch 를 쓸거면 양식 맞게 써준 뒤 if문으로 id 중복이 아니면 다음 fetch 검사하는 식으로 짜야 됨.

    // if 써서 에러 발생하면 멈추고 에러 발생 안하면 다음 fetch 실행

    await fetch("http://aeoragy.iptime.org:18081/user/regist", {
      // await fetch : fetch를 하나씩 하나씩 실행되어 검사하는 것.
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: inputEmail,
        emailPublic: +privateEmail,
        nickname: inputNicName,
        password: inputPw,
        profilePhoto: inputImage,
        tel: inputPhoneNum,
        telPublic: +privatePhoneNum,
        userId: inputId,
        userName: inputName,
      }),
    })
      .then((response) => {
        if (response.ok) {
          alert(`${inputName}님, 반갑습니다.`);
          navigate("/codemeets/login");
        }
      })
      .catch((err) => console.log(err));
  };
  // 현재 등록되어 있는 아이디 admin01
  const IdOverlapConfirm = () => {
    fetch(`http://aeoragy.iptime.org:18081/user/overlap?userId=${inputId}`)
      .then((response) => response.json())
      .then((response) => {
        if (JSON.stringify(response) === "1") {
          alert("이미 존재하는 아이디 입니다.");
        } else {
          alert("사용 가능한 ID입니다.");
        }
      })
      .catch((err) => console.log(err));
  };

  // 사용중인 이메일 : ssafy@naver.com
  const EmailOverlapConfirm = () => {
    fetch(
      `http://aeoragy.iptime.org:18081/user/emailOverlap?email=${inputEmail}`
    )
      .then((response) => response.json())
      .then((response) => {
        if (JSON.stringify(response) === "1") {
          alert("이미 사용되고 있는 이메일 입니다.");
        } else {
          alert("사용 가능한 이메일 입니다.");
        }
      })
      .catch((err) => console.log(err));
  };

  // 사용중인 번호 : f
  const PhoneNumOverlapConfirm = () => {
    fetch(
      `http://aeoragy.iptime.org:18081/user/telOverlap?tel=${inputPhoneNum}`
    )
      .then((response) => response.json())
      .then((response) => {
        if (JSON.stringify(response) === "1") {
          alert("이미 등록된 번호 입니다.");
        } else {
          alert("사용가능한 번호 입니다.");
        }
      })
      .catch((err) => console.log(err));
  };

  const JoinCancelHandler = () => {
    navigate("/codemeets/login");
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <FormStyle>
        <h4 style={{ marginTop: "0px" }}>필수 사항</h4>
        <label htmlFor="">Name</label>
        <span>
          <InputStyle
            type="text"
            placeholder="Name"
            onChange={inputNameHandler}
          />
        </span>
        <label htmlFor="">ID</label>
        <div>
          <span>
            <InputStyle
              type="text"
              placeholder="ID"
              onChange={inputIdHandler}
            />
            <button type="submit" onClick={IdOverlapConfirm}>
              중복 확인
            </button>
          </span>
        </div>
        <label htmlFor="">Password</label>
        <div>
          <InputStyle
            type="text"
            placeholder="Password"
            onChange={inputPwHandler}
          />
        </div>
        <label htmlFor="">Password Check</label>
        <div>
          <InputStyle
            type="text"
            placeholder="Password"
            onChange={inputSecondPwHandler}
          />
        </div>
        <label htmlFor="">E-mail</label>
        <div>
          <span>
            <InputStyle
              type="text"
              placeholder="E-mail"
              onChange={inputEmailHandler}
            />
            <button type="submit" onClick={EmailOverlapConfirm}>
              중복 확인
            </button>
            <CheckBoxStyle>
              <input type="checkbox" onClick={changePrivateEmailHandler} />
              비공개
            </CheckBoxStyle>
          </span>
        </div>
        <label htmlFor="">Phone number</label>
        <span>
          <InputStyle
            type="text"
            placeholder="Phone Number"
            onChange={inputPhoneNumHandler}
          />
          <button type="submit" onClick={PhoneNumOverlapConfirm}>
            중복 확인
          </button>
          <CheckBoxStyle>
            <input type="checkbox" onClick={changePrivatePhoneNumHandler} />
            비공개
          </CheckBoxStyle>
        </span>
        <h4>선택 사항</h4>
        <label htmlFor="">프로필 사진</label>
        <div>
          {/* {inputImage && <img alt="sample" src={inputImage} />} */}
          {/* {inputImage && (<img alt="sample" src={inputImage} />)} */}
          {/* <input type="file" accept="image/*" onChange={inputImageHandler} ref={imageinput}/> */}
          <img src={previewImage} />
          <InputStyle
            type="file"
            accept="image/*"
            onChange={(event) => inputImageHandler(event)}
            ref={imageinput}
            style={{ height: "25px" }}
          />
          <button type="button" onClick={() => deleteFileImage()}>
            삭제
          </button>
        </div>
        <label htmlFor="">닉네임</label>
        <div>
          <InputStyle
            type="text"
            placeholder="Nick Name"
            onChange={inputNicNameHandler}
          />
        </div>
        <div>
          <LastCheckBox>
            <input type="checkbox" onClick={InfoAgreeCheck} />
            (필수)위 내용을 제공하는 것에 동의 합니다.
          </LastCheckBox>
        </div>
        <div>
          <button type="button" onClick={JoinSuccessHandler}>
            가입
          </button>
          <button type="button" onClick={JoinCancelHandler}>
            취소
          </button>
        </div>
      </FormStyle>
    </div>
  );
};

export default SignUp22Page;

const InputStyle = styled.input`
  margin: 3px;
`;

const CheckBoxStyle = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  width: 18rem;
  input {
    width: 20px;
  }
`;

const FormStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  padding-left: 7rem;
  height: 33rem;
  width: 25rem;
  padding-bottom: 30px;
  overflow: scroll;
`;

const LastCheckBox = styled.div`
  display: flex;
  input {
    width: 20px;
  }
`;