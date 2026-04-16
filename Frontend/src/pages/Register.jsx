import { useState } from "react";
import api from "../services/api";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/users/register", form);
      navigate("/login");
    } catch (err) {
      alert("Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-shell">
      <form className="auth-card" onSubmit={handleRegister}>
        <FormInput label="Username" type="text" value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })} />
        <FormInput label="Email" type="email" value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <FormInput label="Password" type="password" value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <Button text="Register" loading={loading} />
      </form>
    </div>
  );
};

export default Register;