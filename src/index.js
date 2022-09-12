import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import { connect, Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./reducer";
import { compose, branch } from "recompose";

const store = createStore(rootReducer);

const mapStateToProps = (state) => ({ pageData: state.pageData });

const Cat = () => {
  return (
    <div className="cat-root">
      pet me <br />
    </div>
  );
};

const withAccor = () => (WrappedComponent) => {
  const Accor = (props) => {
    const { pageData } = props;
    console.log(props);
    const [newPageData, setNewPageData] = useState(pageData);
    useEffect(() => {
      console.log("changed");
      setNewPageData(pageData);
    }, [pageData]);
    return (
      <div>
        <WrappedComponent {...props} pageData={newPageData} />
        <br />
        First Wrapper: {props.pageData.value}
        <br />
      </div>
    );
  };
  return Accor;
};

const FirstWrapper = branch((props) => {
  return 3 === 1 + 2;
}, withAccor());

const SecondWrapper = (WrapperComponent) => {
  return (props) => {
    console.log("props in second wrapper", props);
    // setTimeout(() => {
    //   props.dispatch({ type: "changePageData", payload: "sunny" })
    // }, 4000);
    return (
      <div className="second-wrapper">
        <WrapperComponent secondWrapperProp="wrappers-wrapper" />
        <br />
        <button
          onClick={() =>
            props.dispatch({
              type: "changePageData",
              payload: Math.random() > 0.5 ? "sunny" : "bunny"
            })
          }
        >
          Helloo
        </button>
        <br />
        <br />
        Second Wrapper: {props.pageData.value}
      </div>
    );
  };
};

const Composed = compose(
  connect(mapStateToProps),
  FirstWrapper,
  SecondWrapper
)(Cat);

const App = () => (
  <div>
    <Composed />
  </div>
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
