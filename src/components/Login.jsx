import "./Login.css";

const Login = () => {
  return (
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
        <button type="submit" className="submitSignupBtn">
          회원가입
        </button>
      </div>
    </div>
  );
};

export default Login;
