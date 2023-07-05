function Root() {
  const onClick = () => {
    const state = {};
    const url = "about";

    history.pushState(state, "", url);

    const popStateEvent = new PopStateEvent("popstate", {
      state: history.state,
    });
    dispatchEvent(popStateEvent);
  };
  return (
    <div>
      Root
      <button onClick={onClick}>about</button>
    </div>
  );
}

export default Root;
