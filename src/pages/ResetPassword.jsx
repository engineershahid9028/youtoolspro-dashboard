import { useState } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const reset = async () => {
    await axios.post("https://web-production-1d44e.up.railway.app/auth/reset-password", {
      token: params.get("token"),
      new_password: password
    });

    alert("Password updated");
    navigate("/");
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <input type="password" placeholder="New password" onChange={e=>setPassword(e.target.value)} />
      <button onClick={reset}>Reset</button>
    </div>
  );
}
