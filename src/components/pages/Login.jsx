import { Link } from "react-router-dom";
import "./Login.css";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import app from "../../firebase";

const Login = () => {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const handleAuth = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="login">
      <div className="loginContainer">
        {/* <img src="src/images/signuplogo.png" className="signupImg"></img> */}
        <h1>로그인</h1>
        <div className="loginTextDiv">
          <label>이메일</label>
          <input
            type="email"
            name="email"
            required
            placeholder="이메일을 입력해주세요."
          />
          <label>비밀번호</label>
          <input
            type="password"
            name="pwd"
            required
            placeholder="비밀번호를 입력해주세요."
          />
          <button type="submit" className="submitLoginBtn">
            로그인
          </button>
          {/* <Link to={"/signup"}>
            <button type="submit" className="submitSignupBtn">
              회원가입
            </button>
          </Link> */}
          {/* <hr className="loginHr" /> */}
          <fieldset className="loginHr">
            <legend>또는 다른 서비스 계정으로 로그인</legend>
          </fieldset>
          <div className="socialLoginContainer">
            <div className="googleImgDiv">
              <img
                src="src/images/Search_GSA.original.png"
                className="googleImg"
              />
            </div>
            <div className="socialLoginTextDiv" onClick={handleAuth}>
              <p>Google로 로그인</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
