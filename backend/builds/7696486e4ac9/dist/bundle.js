
          const require = (name) => {
            if (name === 'react') return window.React;
            if (name === 'react-dom') return window.ReactDOM;
            throw new Error(`Dynamic require of "${name}" is not supported`);
          };
        
(() => {
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });

  // builds/7696486e4ac9/src/Component.jsx
  var import_jsx_runtime = __require("react/jsx-runtime");
  function ChildComponent({ name }) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { padding: "10px", background: "#ffe0b2", borderRadius: "4px" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", { children: [
        "Hello, ",
        name,
        "!"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "This component was imported from 'Component.jsx'." })
    ] });
  }

  // builds/7696486e4ac9/src/index.jsx
  var import_jsx_runtime2 = __require("react/jsx-runtime");
  var App = () => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { fontFamily: "Inter, sans-serif", padding: "20px", textAlign: "center" }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h1", { children: "Welcome to the React IDE!" }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ChildComponent, { name: "World" })
  ] });
  var root = document.getElementById("root");
  ReactDOM.createRoot(root).render(/* @__PURE__ */ (0, import_jsx_runtime2.jsx)(App, {}));
})();
//# sourceMappingURL=bundle.js.map
