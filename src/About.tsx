function About() {
  const onClick = () => {
    const state = {};
    const url = "/"; // url 이 설정되지 않으면 (빈 문자열인 경우) 현재 url로 설정된다

    history.pushState(state, "", url);

    const popStateEvent = new PopStateEvent("popstate", {
      state: history.state,
    });
    dispatchEvent(popStateEvent);
  };
  return (
    <div>
      About
      <button onClick={onClick}>root</button>
    </div>
  );
}

export default About;
