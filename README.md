# spa-router

React와 History API 사용하여 SPA Router 기능 구현하기

## 프로젝트 설치 및 실행

```bash
# 설치
yarn install
# 로컬 서버 실행
yarn dev

```


## 목표

라이브러리를 사용하지 않고 history api를 활용하여 클라이언트에서 라우팅 기능 구현

## 기능

1. 주소에 맞는 페이지를 표시한다
   - "/" 로 진입시 root 페이지를 표시한다
   - "/about"로 진입시 about 페이지를 표시한다
2. 각 페이지에 보이는 버튼을 클릭하면 해당 페이지로 이동한다.
3. 뒤로 가기 버튼을 누르면 이전 페이지로 이동한다

## 과제 요구사항

1. 아래와 같은 형태의 Router, Route 컴포넌트를 구현한다

```tsx
<Router>
  <Route path="/" component={<Root />} />
  <Route path="/about" component={<About />} />
</Router>
```

2. 최소한의 push 기능을 가진 useRouter Hook을 작성한다

```tsx
const { push } = useRouter();
```

## 동작화면
![test1](https://github.com/jiyeon2/spa-router/assets/18395475/8d6de7e7-ab48-4c9d-9d87-178a92cd3f5a)

## 진행 과정

### 수업에서 배운 내용 돌아보기

MPA(multi page application)에서 페이지 이동(라우팅)은 서버 측에서 특정 url에 해당하는 전체 html을 클라이언트에 전송하여 이루어진다. 정보가 갱신되지 않은 부분도 포함된 전체 html이 전달되므로 불필요한 통신이 발생하는 등의 문제가 있었다.
문제점을 해결하기 위해 CSR(client side rendering) 방식이 등장하였다. CSR을 사용한 SPA(single page application)에서는 페이지 이동시 서버에서 html을 요청하고 받아오는 과정이 없다. 아래와 같은 절차를 거쳐 화면을 표시한다.

1. 브라우저 경로 변경시 발생하는 기본 http get 요청을 막는다
2. 브라우저 주소는 변경된 상태를 유지한다
3. 변경을 감지하여 주소에 맞는 화면을 그린다

### 과제 요구사항 이해, 힌트 참고하여 요구사항 구현

`<Router>`

- props로 children을 받는 컴포넌트

`<Route>`

- props로 {path: string, component: Component}를 받는 컴포넌트
- 현재 주소가 path로 받은 주소와 일치하는 경우에만 component를 리턴한다

힌트를 통해 다음과 같은 정보를 얻었다.

- 현재 주소 구하기 -> window.location.pathname에 저장되어 있다
- 주소 변경 감지(페이지 이동 감지) -> window.onpopstate 이벤트 핸들러 등록하기
- 주소 변경하기 -> history.pushState()

path(주소)에 따라 표시될 컴포넌트가 달라져야 했으므로 path를 state로 저장했다. 부모 컴포넌트인 Router에 path를 state로 저장하고, popstate이벤트 핸들러를 등록하여 주소 변경시 path를 업데이트 하였다. 자식 컴포넌트인 Route는 부모에서 전달받은 path state에 따라 컴포넌트를 표시한다. 예시 코드에서 Route 컴포넌트는 현재 주소를 props로 받지 않는 형태여서 context provider를 사용하여 path 값을 전달했다.

Route 컴포넌트 내부에서 path를 state로 둬도 괜찮지 않을까 하는 생각이 들었다. 그러면 동일한 window.location.pathname이 여러 Route 컴포넌트에 중복으로 저장될 것이라 생각하여 부모 컴포넌트인 Router에서 하나만 저장하기로 했다.

버튼 클릭 시 history.pushState() 함수를 실행하면 주소는 변경되지만 popstate 이벤트는 발생하지 않아서 Router에 저장된 path를 갱신할 수 없었다. new PopStateEvent()로 이벤트 객체를 생성하고 dispatchEvent(popStateEvent)를 호출하여 popstate이벤트를 발생시켰다.

요구사항 중 '최소한의 push 기능을 가진 useRouter 훅을 작성한다'에서 *최소한의 push 기능*이 어떤 의미인지 이해하지 못했다. 버튼 클릭 시 일어나야 하는 동작 두 가지(url 변경, popstate이벤트 발생시키기)를 묶어서 push 함수로 구현하였다.

### 진행 과정에서 접한 개념 정리

#### [History API](https://developer.mozilla.org/en-US/docs/Web/API/History)

history 전역 객체를 사용하면 브라우저 세션 히스토리를 조작할 수 있다.

> 브라우저 세션 히스토리 : 현재 탭에서 방문한 페이지의 기록

#### [history.pushState](https://developer.mozilla.org/en-US/docs/Web/API/History_API/Working_with_the_History_API)

브라우저 세션 히스토리 스택에 엔트리를 추가한다. (현재 탭에서의 방문 기록이 추가됨)
history.pushState(state, title, url)의 형태로 호출한다.

- state는 브라우저 세션 히스토리 스택에 저장될 정보로 아무 값이나 넣을 수 있다.
- title은 사파리를 제외한 모든 브라우저에서 무시된다. 안 씀.
- url에 새로 저장되는 엔트리의 url이다. 주소표시창의 주소는 변경되지만, 바로 해당 페이지로 이동하지 않는다.

#### [window.location](https://developer.mozilla.org/en-US/docs/Web/API/Window/location)

문서의 현재 location에 대한 정보를 반환한다
location.pathname은 전체 주소에서 origin, search, hash 부분을 제외한 pathname만 반환한다

#### [popstate event](https://developer.mozilla.org/en-US/docs/Web/API/Window/popstate_event#when_popstate_is_sent)

popstate 이벤트가 발생하면 히스토리 스택에 있던 state(history.pushState를 호출하여 저장했던)가 반환(pop)된다.

> The popstate event of the Window interface is fired when the active history entry changes while the user navigates the session history.

사용자가 세션 히스토리를 탐색하는 동안 활성화된 히스토리 엔트리가 바뀌면 popstate 이벤트가 발생한다는데,
사용자가 보고 있는 페이지가 변경되면 popstate 이벤트가 발생한다는 의미로 이해하였다.(활성화된 히스토리 엔트리 = 히스토리 스택에 저장된 엔트리 중 현재 사용자가 보고 있는 페이지)
history.pushState를 호출한다고 하여 popstate이벤트가 발생하지 않는다.(pushState는 히스토리 스택에 엔트리를 '추가'하는 함수고 사용자가 보는 페이지를 변경하진 않는다)

사용자가 이전 페이지로 가기, 다음 페이지로 가기 버튼을 누른 경우, 혹은 history.back(), history.forward() 함수가 호출된 경우 popstate이벤트가 발생한다.
