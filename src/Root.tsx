import useRouter from "./useRouter";

function Root() {
  const { push } = useRouter();
  const onClick = () => {
    push({ url: "about" });
  };
  return (
    <div>
      Root
      <button onClick={onClick}>about</button>
    </div>
  );
}

export default Root;
