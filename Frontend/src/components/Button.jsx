const Button = ({ text, loading, ...props }) => (
  <button className="btn" {...props}>
    {loading ? "Please wait..." : text}
  </button>
);

export default Button;
