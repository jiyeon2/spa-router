import useRouter from "../useRouter";

function Root() {
  const { push } = useRouter();
  const onClick = () => {
    push({ url: "about" });
  };
  return (
    <div className="page">
      <h1>Root</h1>
      <button onClick={onClick}>about</button>
    </div>
  );
}

export default Root;
