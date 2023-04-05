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
          <form action="" onSubmit={handleClickLogin}>
            <h2>HGPT Ver 0.1</h2>
            <div className="inputbox">
              <input id="email" type="email" required />
              <label htmlFor="email">Email</label>
            </div>
            <div className="inputbox">
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
