import "./Signup.css";

const Signup = () => {
  return (
    <div className="signupContainer">
      {/* <img src="src/images/signuplogo.png" className="signupImg"></img> */}
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
        />
        <label>비밀번호</label>
        <input
          type="password"
          name="pwd"
          required
          placeholder="비밀번호를 입력해주세요."
        />
        <label>비밀번호 확인</label>
        <input
          type="password"
          name="pwdCheck"
          required
          placeholder="비밀번호를 확인해주세요."
        />
        <button type="submit" className="submitBtn">
          회원가입
        </button>
      </div>
    </div>
  );
};

export default Signup;
