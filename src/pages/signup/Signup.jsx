import { useEffect, useState } from "react";
import "./Signup.css";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [pwdMsg, setPwdMsg] = useState("");
  const [pwdCheckMsg, setPwdCheckMsg] = useState("");
  const [pwd, setPwd] = useState("");
  const [email, setEmail] = useState("");
  const [pwdCheck, setPwdCheck] = useState("");
  const [emailMsg, setEmailMsg] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [pwdValid, setPwdValid] = useState(false);
  const [pwdMatch, setPwdMatch] = useState(false);

  const auth = getAuth();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (emailValid && pwdValid && pwdMatch) {
      createUserWithEmailAndPassword(auth, email, pwd)
        .then((userCredential) => {
          // Signed in
          alert("회원가입이 완료되었습니다.");
          navigate("/");
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/email-already-in-use":
              alert("이미 가입된 이메일 입니다.");
              break;
          }
        });
    } else {
      console.log("가입실패");
      alert("회원가입에 실패하였습니다.");
    }
  };

  const handleEmailCheck = (e) => {
    const email = e.target.value;
    setEmail(email);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setEmailMsg("이메일 양식에 맞게 작성해주세요.");
      setEmailValid(false);
    } else {
      setEmailMsg("");
      setEmailValid(true);
    }
  };

  const handlePwdCheck = (e) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,}$/; //영문, 숫자,특수기호 8자이상
    const pwd = e.target.value;
    setPwd(pwd);

    if (!pwd) {
      setPwdMsg("");
    } else if (!passwordRegex.test(pwd)) {
      setPwdMsg("영문, 숫자, 특수기호를 포함하여 8자리 이상으로 작성해주세요.");
      setPwdValid(false);
    } else {
      setPwdMsg("사용가능한 비밀번호입니다.");
      setPwdValid(true);
    }
  };

  const isPwdMatch = (e) => {
    const pwdCheck = e.target.value;
    setPwdCheck(pwdCheck);

    if (!pwdCheck) {
      setPwdCheck("");
    } else if (pwd !== pwdCheck) {
      setPwdCheckMsg("비밀번호가 일치하지 않습니다.");
      setPwdMatch(false);
    } else {
      setPwdCheckMsg("비밀번호가 일치합니다.");
      setPwdMatch(true);
    }
  };

  useEffect(() => {
    if (pwd && pwdCheck) {
      if (pwd !== pwdCheck) {
        setPwdCheckMsg("비밀번호가 일치하지 않습니다.");
        setPwdMatch(false);
      } else {
        setPwdCheckMsg("비밀번호가 일치합니다.");
        setPwdMatch(true);
      }
    }
  }, [pwd, pwdCheck]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="signup">
        <div className="signupContainer">
          <h1>회원가입</h1>
          <div className="signTextDiv">
            <label>이름</label>
            <input
              type="text"
              name="name"
              required
              placeholder="이름을 입력해주세요."
            />
            <label>이메일</label>
            <input
              type="email"
              name="email"
              required
              placeholder="이메일을 입력해주세요."
              onChange={handleEmailCheck}
            />
            <span
              className={emailMsg ? "show" : "hide"}
              id="hideEmail"
              style={{ color: "red" }}
            >
              {emailMsg}
            </span>
            <label>비밀번호</label>
            <input
              type="password"
              name="pwd"
              required
              placeholder="비밀번호를 입력해주세요."
              onChange={handlePwdCheck}
              value={pwd}
            />
            <span
              className={pwdMsg ? "show" : "hide"}
              id="hidePwd"
              style={{
                color: pwdMsg.startsWith("사용가능") ? "green" : "red",
              }}
            >
              {pwdMsg}
            </span>
            <label>비밀번호 확인</label>
            <input
              type="password"
              name="pwdCheck"
              required
              placeholder="비밀번호를 확인해주세요."
              onChange={isPwdMatch}
              value={pwdCheck}
            />
            <span
              className={pwdCheckMsg ? "show" : "hide"}
              id="hidePwdCheck"
              style={{
                color: pwdCheckMsg.includes("일치합니다") ? "green" : "red",
              }}
            >
              {pwdCheckMsg}
            </span>
            <button type="submit" className="submitBtn">
              회원가입
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Signup;
