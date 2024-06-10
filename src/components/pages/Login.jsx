import { useNavigate } from "react-router-dom";
import "./Login.css";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import app from "../../firebase";

const Login = () => {
  const auth = getAuth(app); //app인자는 없어도 됨
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const handleAuth = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user);
        navigate("/");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const pwd = e.target.elements.pwd.value;
    signInWithEmailAndPassword(auth, email, pwd)
      .then((result) => {
        // Signed in
        console.log(result.user);
        navigate("/");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error.code);
        document.getElementById("pwd").value = "";
        switch (error.code) {
          case "auth/invalid-email":
            alert("이메일 양식으로 입력해주세요.");
            break;
          case "auth/invalid-credential":
            alert("이메일 혹은 비밀번호가 맞지 않습니다.");
            break;
        }
      });
  };

  return (
    <form onSubmit={handleSubmit}>
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
              id="pwd"
            />
            <button type="submit" className="submitLoginBtn">
              로그인
            </button>
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
    </form>
  );
};

export default Login;
