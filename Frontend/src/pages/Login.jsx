import { useMemo, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import Button from "../components/Button";

const Login = () => {
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const loginPayload = useMemo(() => {
    const id = form.identifier.trim();
    return id.includes("@")
      ? { email: id, password: form.password }
      : { username: id, password: form.password };
  }, [form]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/users/login", loginPayload);
      const data = res.data.data;
      const nextAuth = {
        user: data.user,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      };

      setAuth(nextAuth);
      localStorage.setItem("auth", JSON.stringify(nextAuth));

      navigate("/dashboard");
    } catch {
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-shell">
      <form className="auth-card" onSubmit={handleLogin}>
        <FormInput label="Username or Email" type="text"
          value={form.identifier}
          onChange={(e) => setForm({ ...form, identifier: e.target.value })} />
        <FormInput label="Password" type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <Button text="Login" loading={loading} />
      </form>
      <div style={{ marginTop: "20px", textAlign: "center", width: "100%", maxWidth: "460px" }}>
        <p>Not registered?</p>
        <button
          type="button"
          onClick={() => navigate("/register")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Register Here
        </button>
      </div>
    </div>
  );
};

export default Login;