import useRouter from "./useRouter";

function About() {
  const { push } = useRouter();
  const onClick = () => {
    push({ url: "/" });
  };
  return (
    <div>
      About
      <button onClick={onClick}>root</button>
    </div>
  );
}

export default About;
