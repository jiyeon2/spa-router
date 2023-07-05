import useRouter from "../useRouter";

function About() {
  const { push } = useRouter();
  const onClick = () => {
    push({ url: "/" });
  };
  return (
    <div className="page">
      <h1>About</h1>

      <button onClick={onClick}>root</button>
    </div>
  );
}

export default About;
