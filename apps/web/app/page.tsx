import { PromptInput } from "ui";

export default function Page() {
  return (
    <section>
      <div className="form-box">
        <div className="form-value">
          <form action="">
            <h2>로그인</h2>
            <div className="inputbox">
              <input id='email' type="email" required />
              <label htmlFor="email">Email</label>
            </div>
            <div className="inputbox">
              <input id='password' type="password" required />
              <label htmlFor="password">Password</label>
            </div>
            <button>Log in</button>
          </form>
        </div>
      </div>
    </section>
  );

}