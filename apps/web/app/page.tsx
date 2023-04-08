"use client";

import { useRouter } from "next/navigation";
import { FormEvent } from "react";

import "./global.css";

export default function Page() {
  const router = useRouter();

  const handleClickLogin = (e: FormEvent) => {
    e.preventDefault();
    router.push("/chat");
  };
  return (
    <section>
      <div className="form-box">
        <div className="form-value">
          <form onSubmit={handleClickLogin}>
            <h2>HGPT Ver 0.1</h2>
            <p>패스워드가 뭘까용</p>
            <div className="py-5">
              <input id="password" type="password" required />
              <label htmlFor="password">Password</label>
            </div>
            <button>Log in</button>
          </form>
        </div>
      </div>
    </section>
  );
}
