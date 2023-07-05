export default function useRouter() {
  const push = ({ state, url }: { state?: any; url?: string }) => {
    history.pushState(state, "", url);

    const popStateEvent = new PopStateEvent("popstate", {
      state,
    });
    dispatchEvent(popStateEvent);
  };

  return { push };
}
