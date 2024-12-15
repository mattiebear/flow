var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// js/server.js
var server_exports = {};
__export(server_exports, {
  render: () => render
});
module.exports = __toCommonJS(server_exports);

// import-glob:../svelte/**/*.svelte
var __exports = {};
__export(__exports, {
  default: () => __default,
  filenames: () => filenames
});

// svelte/TechniqueForm.svelte
var TechniqueForm_exports = {};
__export(TechniqueForm_exports, {
  default: () => TechniqueForm_default
});

// node_modules/svelte/src/runtime/internal/utils.js
function noop() {
}
function run(fn) {
  return fn();
}
function blank_object() {
  return /* @__PURE__ */ Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function is_function(thing) {
  return typeof thing === "function";
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || a && typeof a === "object" || typeof a === "function";
}
function validate_store(store, name) {
  if (store != null && typeof store.subscribe !== "function") {
    throw new Error(`'${name}' is not a store with a 'subscribe' method`);
  }
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    for (const callback of callbacks) {
      callback(void 0);
    }
    return noop;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function compute_rest_props(props, keys) {
  const rest = {};
  keys = new Set(keys);
  for (const k in props)
    if (!keys.has(k) && k[0] !== "$")
      rest[k] = props[k];
  return rest;
}

// node_modules/svelte/src/runtime/internal/globals.js
var globals = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : (
  // @ts-ignore Node typings have this
  global
);

// node_modules/svelte/src/runtime/internal/ResizeObserverSingleton.js
var ResizeObserverSingleton = class {
  /**
   * @private
   * @readonly
   * @type {WeakMap<Element, import('./private.js').Listener>}
   */
  _listeners = "WeakMap" in globals ? /* @__PURE__ */ new WeakMap() : void 0;
  /**
   * @private
   * @type {ResizeObserver}
   */
  _observer = void 0;
  /** @type {ResizeObserverOptions} */
  options;
  /** @param {ResizeObserverOptions} options */
  constructor(options) {
    this.options = options;
  }
  /**
   * @param {Element} element
   * @param {import('./private.js').Listener} listener
   * @returns {() => void}
   */
  observe(element2, listener) {
    this._listeners.set(element2, listener);
    this._getObserver().observe(element2, this.options);
    return () => {
      this._listeners.delete(element2);
      this._observer.unobserve(element2);
    };
  }
  /**
   * @private
   */
  _getObserver() {
    return this._observer ?? (this._observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        ResizeObserverSingleton.entries.set(entry.target, entry);
        this._listeners.get(entry.target)?.(entry);
      }
    }));
  }
};
ResizeObserverSingleton.entries = "WeakMap" in globals ? /* @__PURE__ */ new WeakMap() : void 0;

// node_modules/svelte/src/runtime/internal/dom.js
function insert(target, node, anchor) {
  target.insertBefore(node, anchor || null);
}
function detach(node) {
  if (node.parentNode) {
    node.parentNode.removeChild(node);
  }
}
function element(name) {
  return document.createElement(name);
}
function attr(node, attribute, value) {
  if (value == null)
    node.removeAttribute(attribute);
  else if (node.getAttribute(attribute) !== value)
    node.setAttribute(attribute, value);
}
function get_custom_elements_slots(element2) {
  const result = {};
  element2.childNodes.forEach(
    /** @param {Element} node */
    (node) => {
      result[node.slot || "default"] = true;
    }
  );
  return result;
}

// node_modules/svelte/src/runtime/internal/lifecycle.js
var current_component;
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function onDestroy(fn) {
  get_current_component().$$.on_destroy.push(fn);
}
function setContext(key, context) {
  get_current_component().$$.context.set(key, context);
  return context;
}
function getContext(key) {
  return get_current_component().$$.context.get(key);
}

// node_modules/svelte/src/runtime/internal/each.js
function ensure_array_like(array_like_or_iterator) {
  return array_like_or_iterator?.length !== void 0 ? array_like_or_iterator : Array.from(array_like_or_iterator);
}

// node_modules/svelte/src/shared/boolean_attributes.js
var _boolean_attributes = (
  /** @type {const} */
  [
    "allowfullscreen",
    "allowpaymentrequest",
    "async",
    "autofocus",
    "autoplay",
    "checked",
    "controls",
    "default",
    "defer",
    "disabled",
    "formnovalidate",
    "hidden",
    "inert",
    "ismap",
    "loop",
    "multiple",
    "muted",
    "nomodule",
    "novalidate",
    "open",
    "playsinline",
    "readonly",
    "required",
    "reversed",
    "selected"
  ]
);
var boolean_attributes = /* @__PURE__ */ new Set([..._boolean_attributes]);

// node_modules/svelte/src/shared/utils/escape.js
var ATTR_REGEX = /[&"<]/g;
var CONTENT_REGEX = /[&<]/g;
function escape(value, is_attr = false) {
  const str = String(value);
  const pattern = is_attr ? ATTR_REGEX : CONTENT_REGEX;
  pattern.lastIndex = 0;
  let escaped = "";
  let last = 0;
  while (pattern.test(str)) {
    const i = pattern.lastIndex - 1;
    const ch = str[i];
    escaped += str.substring(last, i) + (ch === "&" ? "&amp;" : ch === '"' ? "&quot;" : "&lt;");
    last = i + 1;
  }
  return escaped + str.substring(last);
}

// node_modules/svelte/src/runtime/internal/ssr.js
var invalid_attribute_name_character = /[\s'">/=\u{FDD0}-\u{FDEF}\u{FFFE}\u{FFFF}\u{1FFFE}\u{1FFFF}\u{2FFFE}\u{2FFFF}\u{3FFFE}\u{3FFFF}\u{4FFFE}\u{4FFFF}\u{5FFFE}\u{5FFFF}\u{6FFFE}\u{6FFFF}\u{7FFFE}\u{7FFFF}\u{8FFFE}\u{8FFFF}\u{9FFFE}\u{9FFFF}\u{AFFFE}\u{AFFFF}\u{BFFFE}\u{BFFFF}\u{CFFFE}\u{CFFFF}\u{DFFFE}\u{DFFFF}\u{EFFFE}\u{EFFFF}\u{FFFFE}\u{FFFFF}\u{10FFFE}\u{10FFFF}]/u;
function spread(args, attrs_to_add) {
  const attributes = Object.assign({}, ...args);
  if (attrs_to_add) {
    const classes_to_add = attrs_to_add.classes;
    const styles_to_add = attrs_to_add.styles;
    if (classes_to_add) {
      if (attributes.class == null) {
        attributes.class = classes_to_add;
      } else {
        attributes.class += " " + classes_to_add;
      }
    }
    if (styles_to_add) {
      if (attributes.style == null) {
        attributes.style = style_object_to_string(styles_to_add);
      } else {
        attributes.style = style_object_to_string(
          merge_ssr_styles(attributes.style, styles_to_add)
        );
      }
    }
  }
  let str = "";
  Object.keys(attributes).forEach((name) => {
    if (invalid_attribute_name_character.test(name))
      return;
    const value = attributes[name];
    if (value === true)
      str += " " + name;
    else if (boolean_attributes.has(name.toLowerCase())) {
      if (value)
        str += " " + name;
    } else if (value != null) {
      str += ` ${name}="${value}"`;
    }
  });
  return str;
}
function merge_ssr_styles(style_attribute, style_directive) {
  const style_object = {};
  for (const individual_style of style_attribute.split(";")) {
    const colon_index = individual_style.indexOf(":");
    const name = individual_style.slice(0, colon_index).trim();
    const value = individual_style.slice(colon_index + 1).trim();
    if (!name)
      continue;
    style_object[name] = value;
  }
  for (const name in style_directive) {
    const value = style_directive[name];
    if (value) {
      style_object[name] = value;
    } else {
      delete style_object[name];
    }
  }
  return style_object;
}
function escape_attribute_value(value) {
  const should_escape = typeof value === "string" || value && typeof value === "object";
  return should_escape ? escape(value, true) : value;
}
function escape_object(obj) {
  const result = {};
  for (const key in obj) {
    result[key] = escape_attribute_value(obj[key]);
  }
  return result;
}
function each(items, fn) {
  items = ensure_array_like(items);
  let str = "";
  for (let i = 0; i < items.length; i += 1) {
    str += fn(items[i], i);
  }
  return str;
}
function validate_component(component, name) {
  if (!component || !component.$$render) {
    if (name === "svelte:component")
      name += " this={...}";
    throw new Error(
      `<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules. Otherwise you may need to fix a <${name}>.`
    );
  }
  return component;
}
var on_destroy;
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(context || (parent_component ? parent_component.$$.context : [])),
      // these will be immediately discarded
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context = /* @__PURE__ */ new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: /* @__PURE__ */ new Set() };
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css) => css.code).join("\n"),
          map: null
          // TODO
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name, value, boolean) {
  if (value == null || boolean && !value)
    return "";
  const assignment = boolean && value === true ? "" : `="${escape(value, true)}"`;
  return ` ${name}${assignment}`;
}
function style_object_to_string(style_object) {
  return Object.keys(style_object).filter((key) => style_object[key] != null && style_object[key] !== "").map((key) => `${key}: ${escape_attribute_value(style_object[key])};`).join(" ");
}

// node_modules/svelte/src/runtime/internal/Component.js
var SvelteElement;
if (typeof HTMLElement === "function") {
  SvelteElement = class extends HTMLElement {
    /** The Svelte component constructor */
    $$ctor;
    /** Slots */
    $$s;
    /** The Svelte component instance */
    $$c;
    /** Whether or not the custom element is connected */
    $$cn = false;
    /** Component props data */
    $$d = {};
    /** `true` if currently in the process of reflecting component props back to attributes */
    $$r = false;
    /** @type {Record<string, CustomElementPropDefinition>} Props definition (name, reflected, type etc) */
    $$p_d = {};
    /** @type {Record<string, Function[]>} Event listeners */
    $$l = {};
    /** @type {Map<Function, Function>} Event listener unsubscribe functions */
    $$l_u = /* @__PURE__ */ new Map();
    constructor($$componentCtor, $$slots, use_shadow_dom) {
      super();
      this.$$ctor = $$componentCtor;
      this.$$s = $$slots;
      if (use_shadow_dom) {
        this.attachShadow({ mode: "open" });
      }
    }
    addEventListener(type, listener, options) {
      this.$$l[type] = this.$$l[type] || [];
      this.$$l[type].push(listener);
      if (this.$$c) {
        const unsub = this.$$c.$on(type, listener);
        this.$$l_u.set(listener, unsub);
      }
      super.addEventListener(type, listener, options);
    }
    removeEventListener(type, listener, options) {
      super.removeEventListener(type, listener, options);
      if (this.$$c) {
        const unsub = this.$$l_u.get(listener);
        if (unsub) {
          unsub();
          this.$$l_u.delete(listener);
        }
      }
    }
    async connectedCallback() {
      this.$$cn = true;
      if (!this.$$c) {
        let create_slot = function(name) {
          return () => {
            let node;
            const obj = {
              c: function create() {
                node = element("slot");
                if (name !== "default") {
                  attr(node, "name", name);
                }
              },
              /**
               * @param {HTMLElement} target
               * @param {HTMLElement} [anchor]
               */
              m: function mount(target, anchor) {
                insert(target, node, anchor);
              },
              d: function destroy(detaching) {
                if (detaching) {
                  detach(node);
                }
              }
            };
            return obj;
          };
        };
        await Promise.resolve();
        if (!this.$$cn || this.$$c) {
          return;
        }
        const $$slots = {};
        const existing_slots = get_custom_elements_slots(this);
        for (const name of this.$$s) {
          if (name in existing_slots) {
            $$slots[name] = [create_slot(name)];
          }
        }
        for (const attribute of this.attributes) {
          const name = this.$$g_p(attribute.name);
          if (!(name in this.$$d)) {
            this.$$d[name] = get_custom_element_value(name, attribute.value, this.$$p_d, "toProp");
          }
        }
        for (const key in this.$$p_d) {
          if (!(key in this.$$d) && this[key] !== void 0) {
            this.$$d[key] = this[key];
            delete this[key];
          }
        }
        this.$$c = new this.$$ctor({
          target: this.shadowRoot || this,
          props: {
            ...this.$$d,
            $$slots,
            $$scope: {
              ctx: []
            }
          }
        });
        const reflect_attributes = () => {
          this.$$r = true;
          for (const key in this.$$p_d) {
            this.$$d[key] = this.$$c.$$.ctx[this.$$c.$$.props[key]];
            if (this.$$p_d[key].reflect) {
              const attribute_value = get_custom_element_value(
                key,
                this.$$d[key],
                this.$$p_d,
                "toAttribute"
              );
              if (attribute_value == null) {
                this.removeAttribute(this.$$p_d[key].attribute || key);
              } else {
                this.setAttribute(this.$$p_d[key].attribute || key, attribute_value);
              }
            }
          }
          this.$$r = false;
        };
        this.$$c.$$.after_update.push(reflect_attributes);
        reflect_attributes();
        for (const type in this.$$l) {
          for (const listener of this.$$l[type]) {
            const unsub = this.$$c.$on(type, listener);
            this.$$l_u.set(listener, unsub);
          }
        }
        this.$$l = {};
      }
    }
    // We don't need this when working within Svelte code, but for compatibility of people using this outside of Svelte
    // and setting attributes through setAttribute etc, this is helpful
    attributeChangedCallback(attr2, _oldValue, newValue) {
      if (this.$$r)
        return;
      attr2 = this.$$g_p(attr2);
      this.$$d[attr2] = get_custom_element_value(attr2, newValue, this.$$p_d, "toProp");
      this.$$c?.$set({ [attr2]: this.$$d[attr2] });
    }
    disconnectedCallback() {
      this.$$cn = false;
      Promise.resolve().then(() => {
        if (!this.$$cn && this.$$c) {
          this.$$c.$destroy();
          this.$$c = void 0;
        }
      });
    }
    $$g_p(attribute_name) {
      return Object.keys(this.$$p_d).find(
        (key) => this.$$p_d[key].attribute === attribute_name || !this.$$p_d[key].attribute && key.toLowerCase() === attribute_name
      ) || attribute_name;
    }
  };
}
function get_custom_element_value(prop, value, props_definition, transform) {
  const type = props_definition[prop]?.type;
  value = type === "Boolean" && typeof value !== "boolean" ? value != null : value;
  if (!transform || !props_definition[prop]) {
    return value;
  } else if (transform === "toAttribute") {
    switch (type) {
      case "Object":
      case "Array":
        return value == null ? null : JSON.stringify(value);
      case "Boolean":
        return value ? "" : null;
      case "Number":
        return value == null ? null : value;
      default:
        return value;
    }
  } else {
    switch (type) {
      case "Object":
      case "Array":
        return value && JSON.parse(value);
      case "Boolean":
        return value;
      case "Number":
        return value != null ? +value : value;
      default:
        return value;
    }
  }
}

// node_modules/@tanstack/query-core/build/lib/subscribable.mjs
var Subscribable = class {
  constructor() {
    this.listeners = /* @__PURE__ */ new Set();
    this.subscribe = this.subscribe.bind(this);
  }
  subscribe(listener) {
    const identity2 = {
      listener
    };
    this.listeners.add(identity2);
    this.onSubscribe();
    return () => {
      this.listeners.delete(identity2);
      this.onUnsubscribe();
    };
  }
  hasListeners() {
    return this.listeners.size > 0;
  }
  onSubscribe() {
  }
  onUnsubscribe() {
  }
};

// node_modules/@tanstack/query-core/build/lib/utils.mjs
var isServer = typeof window === "undefined" || "Deno" in window;
function noop2() {
  return void 0;
}
function functionalUpdate(updater, input) {
  return typeof updater === "function" ? updater(input) : updater;
}
function isValidTimeout(value) {
  return typeof value === "number" && value >= 0 && value !== Infinity;
}
function timeUntilStale(updatedAt, staleTime) {
  return Math.max(updatedAt + (staleTime || 0) - Date.now(), 0);
}
function parseQueryArgs(arg1, arg2, arg3) {
  if (!isQueryKey(arg1)) {
    return arg1;
  }
  if (typeof arg2 === "function") {
    return {
      ...arg3,
      queryKey: arg1,
      queryFn: arg2
    };
  }
  return {
    ...arg2,
    queryKey: arg1
  };
}
function parseMutationArgs(arg1, arg2, arg3) {
  if (isQueryKey(arg1)) {
    if (typeof arg2 === "function") {
      return {
        ...arg3,
        mutationKey: arg1,
        mutationFn: arg2
      };
    }
    return {
      ...arg2,
      mutationKey: arg1
    };
  }
  if (typeof arg1 === "function") {
    return {
      ...arg2,
      mutationFn: arg1
    };
  }
  return {
    ...arg1
  };
}
function parseFilterArgs(arg1, arg2, arg3) {
  return isQueryKey(arg1) ? [{
    ...arg2,
    queryKey: arg1
  }, arg3] : [arg1 || {}, arg2];
}
function matchQuery(filters, query) {
  const {
    type = "all",
    exact,
    fetchStatus,
    predicate,
    queryKey,
    stale
  } = filters;
  if (isQueryKey(queryKey)) {
    if (exact) {
      if (query.queryHash !== hashQueryKeyByOptions(queryKey, query.options)) {
        return false;
      }
    } else if (!partialMatchKey(query.queryKey, queryKey)) {
      return false;
    }
  }
  if (type !== "all") {
    const isActive = query.isActive();
    if (type === "active" && !isActive) {
      return false;
    }
    if (type === "inactive" && isActive) {
      return false;
    }
  }
  if (typeof stale === "boolean" && query.isStale() !== stale) {
    return false;
  }
  if (typeof fetchStatus !== "undefined" && fetchStatus !== query.state.fetchStatus) {
    return false;
  }
  if (predicate && !predicate(query)) {
    return false;
  }
  return true;
}
function matchMutation(filters, mutation) {
  const {
    exact,
    fetching,
    predicate,
    mutationKey
  } = filters;
  if (isQueryKey(mutationKey)) {
    if (!mutation.options.mutationKey) {
      return false;
    }
    if (exact) {
      if (hashQueryKey(mutation.options.mutationKey) !== hashQueryKey(mutationKey)) {
        return false;
      }
    } else if (!partialMatchKey(mutation.options.mutationKey, mutationKey)) {
      return false;
    }
  }
  if (typeof fetching === "boolean" && mutation.state.status === "loading" !== fetching) {
    return false;
  }
  if (predicate && !predicate(mutation)) {
    return false;
  }
  return true;
}
function hashQueryKeyByOptions(queryKey, options) {
  const hashFn = (options == null ? void 0 : options.queryKeyHashFn) || hashQueryKey;
  return hashFn(queryKey);
}
function hashQueryKey(queryKey) {
  return JSON.stringify(queryKey, (_, val) => isPlainObject(val) ? Object.keys(val).sort().reduce((result, key) => {
    result[key] = val[key];
    return result;
  }, {}) : val);
}
function partialMatchKey(a, b) {
  return partialDeepEqual(a, b);
}
function partialDeepEqual(a, b) {
  if (a === b) {
    return true;
  }
  if (typeof a !== typeof b) {
    return false;
  }
  if (a && b && typeof a === "object" && typeof b === "object") {
    return !Object.keys(b).some((key) => !partialDeepEqual(a[key], b[key]));
  }
  return false;
}
function replaceEqualDeep(a, b) {
  if (a === b) {
    return a;
  }
  const array = isPlainArray(a) && isPlainArray(b);
  if (array || isPlainObject(a) && isPlainObject(b)) {
    const aSize = array ? a.length : Object.keys(a).length;
    const bItems = array ? b : Object.keys(b);
    const bSize = bItems.length;
    const copy = array ? [] : {};
    let equalItems = 0;
    for (let i = 0; i < bSize; i++) {
      const key = array ? i : bItems[i];
      copy[key] = replaceEqualDeep(a[key], b[key]);
      if (copy[key] === a[key]) {
        equalItems++;
      }
    }
    return aSize === bSize && equalItems === aSize ? a : copy;
  }
  return b;
}
function shallowEqualObjects(a, b) {
  if (a && !b || b && !a) {
    return false;
  }
  for (const key in a) {
    if (a[key] !== b[key]) {
      return false;
    }
  }
  return true;
}
function isPlainArray(value) {
  return Array.isArray(value) && value.length === Object.keys(value).length;
}
function isPlainObject(o) {
  if (!hasObjectPrototype(o)) {
    return false;
  }
  const ctor = o.constructor;
  if (typeof ctor === "undefined") {
    return true;
  }
  const prot = ctor.prototype;
  if (!hasObjectPrototype(prot)) {
    return false;
  }
  if (!prot.hasOwnProperty("isPrototypeOf")) {
    return false;
  }
  return true;
}
function hasObjectPrototype(o) {
  return Object.prototype.toString.call(o) === "[object Object]";
}
function isQueryKey(value) {
  return Array.isArray(value);
}
function sleep(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}
function scheduleMicrotask(callback) {
  sleep(0).then(callback);
}
function getAbortController() {
  if (typeof AbortController === "function") {
    return new AbortController();
  }
  return;
}
function replaceData(prevData, data, options) {
  if (options.isDataEqual != null && options.isDataEqual(prevData, data)) {
    return prevData;
  } else if (typeof options.structuralSharing === "function") {
    return options.structuralSharing(prevData, data);
  } else if (options.structuralSharing !== false) {
    return replaceEqualDeep(prevData, data);
  }
  return data;
}

// node_modules/@tanstack/query-core/build/lib/focusManager.mjs
var FocusManager = class extends Subscribable {
  constructor() {
    super();
    this.setup = (onFocus) => {
      if (!isServer && window.addEventListener) {
        const listener = () => onFocus();
        window.addEventListener("visibilitychange", listener, false);
        window.addEventListener("focus", listener, false);
        return () => {
          window.removeEventListener("visibilitychange", listener);
          window.removeEventListener("focus", listener);
        };
      }
      return;
    };
  }
  onSubscribe() {
    if (!this.cleanup) {
      this.setEventListener(this.setup);
    }
  }
  onUnsubscribe() {
    if (!this.hasListeners()) {
      var _this$cleanup;
      (_this$cleanup = this.cleanup) == null ? void 0 : _this$cleanup.call(this);
      this.cleanup = void 0;
    }
  }
  setEventListener(setup) {
    var _this$cleanup2;
    this.setup = setup;
    (_this$cleanup2 = this.cleanup) == null ? void 0 : _this$cleanup2.call(this);
    this.cleanup = setup((focused) => {
      if (typeof focused === "boolean") {
        this.setFocused(focused);
      } else {
        this.onFocus();
      }
    });
  }
  setFocused(focused) {
    const changed = this.focused !== focused;
    if (changed) {
      this.focused = focused;
      this.onFocus();
    }
  }
  onFocus() {
    this.listeners.forEach(({
      listener
    }) => {
      listener();
    });
  }
  isFocused() {
    if (typeof this.focused === "boolean") {
      return this.focused;
    }
    if (typeof document === "undefined") {
      return true;
    }
    return [void 0, "visible", "prerender"].includes(document.visibilityState);
  }
};
var focusManager = new FocusManager();

// node_modules/@tanstack/query-core/build/lib/onlineManager.mjs
var onlineEvents = ["online", "offline"];
var OnlineManager = class extends Subscribable {
  constructor() {
    super();
    this.setup = (onOnline) => {
      if (!isServer && window.addEventListener) {
        const listener = () => onOnline();
        onlineEvents.forEach((event) => {
          window.addEventListener(event, listener, false);
        });
        return () => {
          onlineEvents.forEach((event) => {
            window.removeEventListener(event, listener);
          });
        };
      }
      return;
    };
  }
  onSubscribe() {
    if (!this.cleanup) {
      this.setEventListener(this.setup);
    }
  }
  onUnsubscribe() {
    if (!this.hasListeners()) {
      var _this$cleanup;
      (_this$cleanup = this.cleanup) == null ? void 0 : _this$cleanup.call(this);
      this.cleanup = void 0;
    }
  }
  setEventListener(setup) {
    var _this$cleanup2;
    this.setup = setup;
    (_this$cleanup2 = this.cleanup) == null ? void 0 : _this$cleanup2.call(this);
    this.cleanup = setup((online) => {
      if (typeof online === "boolean") {
        this.setOnline(online);
      } else {
        this.onOnline();
      }
    });
  }
  setOnline(online) {
    const changed = this.online !== online;
    if (changed) {
      this.online = online;
      this.onOnline();
    }
  }
  onOnline() {
    this.listeners.forEach(({
      listener
    }) => {
      listener();
    });
  }
  isOnline() {
    if (typeof this.online === "boolean") {
      return this.online;
    }
    if (typeof navigator === "undefined" || typeof navigator.onLine === "undefined") {
      return true;
    }
    return navigator.onLine;
  }
};
var onlineManager = new OnlineManager();

// node_modules/@tanstack/query-core/build/lib/retryer.mjs
function defaultRetryDelay(failureCount) {
  return Math.min(1e3 * 2 ** failureCount, 3e4);
}
function canFetch(networkMode) {
  return (networkMode != null ? networkMode : "online") === "online" ? onlineManager.isOnline() : true;
}
var CancelledError = class {
  constructor(options) {
    this.revert = options == null ? void 0 : options.revert;
    this.silent = options == null ? void 0 : options.silent;
  }
};
function isCancelledError(value) {
  return value instanceof CancelledError;
}
function createRetryer(config) {
  let isRetryCancelled = false;
  let failureCount = 0;
  let isResolved = false;
  let continueFn;
  let promiseResolve;
  let promiseReject;
  const promise = new Promise((outerResolve, outerReject) => {
    promiseResolve = outerResolve;
    promiseReject = outerReject;
  });
  const cancel = (cancelOptions) => {
    if (!isResolved) {
      reject(new CancelledError(cancelOptions));
      config.abort == null ? void 0 : config.abort();
    }
  };
  const cancelRetry = () => {
    isRetryCancelled = true;
  };
  const continueRetry = () => {
    isRetryCancelled = false;
  };
  const shouldPause = () => !focusManager.isFocused() || config.networkMode !== "always" && !onlineManager.isOnline();
  const resolve = (value) => {
    if (!isResolved) {
      isResolved = true;
      config.onSuccess == null ? void 0 : config.onSuccess(value);
      continueFn == null ? void 0 : continueFn();
      promiseResolve(value);
    }
  };
  const reject = (value) => {
    if (!isResolved) {
      isResolved = true;
      config.onError == null ? void 0 : config.onError(value);
      continueFn == null ? void 0 : continueFn();
      promiseReject(value);
    }
  };
  const pause = () => {
    return new Promise((continueResolve) => {
      continueFn = (value) => {
        const canContinue = isResolved || !shouldPause();
        if (canContinue) {
          continueResolve(value);
        }
        return canContinue;
      };
      config.onPause == null ? void 0 : config.onPause();
    }).then(() => {
      continueFn = void 0;
      if (!isResolved) {
        config.onContinue == null ? void 0 : config.onContinue();
      }
    });
  };
  const run2 = () => {
    if (isResolved) {
      return;
    }
    let promiseOrValue;
    try {
      promiseOrValue = config.fn();
    } catch (error) {
      promiseOrValue = Promise.reject(error);
    }
    Promise.resolve(promiseOrValue).then(resolve).catch((error) => {
      var _config$retry, _config$retryDelay;
      if (isResolved) {
        return;
      }
      const retry = (_config$retry = config.retry) != null ? _config$retry : 3;
      const retryDelay = (_config$retryDelay = config.retryDelay) != null ? _config$retryDelay : defaultRetryDelay;
      const delay = typeof retryDelay === "function" ? retryDelay(failureCount, error) : retryDelay;
      const shouldRetry = retry === true || typeof retry === "number" && failureCount < retry || typeof retry === "function" && retry(failureCount, error);
      if (isRetryCancelled || !shouldRetry) {
        reject(error);
        return;
      }
      failureCount++;
      config.onFail == null ? void 0 : config.onFail(failureCount, error);
      sleep(delay).then(() => {
        if (shouldPause()) {
          return pause();
        }
        return;
      }).then(() => {
        if (isRetryCancelled) {
          reject(error);
        } else {
          run2();
        }
      });
    });
  };
  if (canFetch(config.networkMode)) {
    run2();
  } else {
    pause().then(run2);
  }
  return {
    promise,
    cancel,
    continue: () => {
      const didContinue = continueFn == null ? void 0 : continueFn();
      return didContinue ? promise : Promise.resolve();
    },
    cancelRetry,
    continueRetry
  };
}

// node_modules/@tanstack/query-core/build/lib/logger.mjs
var defaultLogger = console;

// node_modules/@tanstack/query-core/build/lib/notifyManager.mjs
function createNotifyManager() {
  let queue = [];
  let transactions = 0;
  let notifyFn = (callback) => {
    callback();
  };
  let batchNotifyFn = (callback) => {
    callback();
  };
  const batch = (callback) => {
    let result;
    transactions++;
    try {
      result = callback();
    } finally {
      transactions--;
      if (!transactions) {
        flush2();
      }
    }
    return result;
  };
  const schedule = (callback) => {
    if (transactions) {
      queue.push(callback);
    } else {
      scheduleMicrotask(() => {
        notifyFn(callback);
      });
    }
  };
  const batchCalls = (callback) => {
    return (...args) => {
      schedule(() => {
        callback(...args);
      });
    };
  };
  const flush2 = () => {
    const originalQueue = queue;
    queue = [];
    if (originalQueue.length) {
      scheduleMicrotask(() => {
        batchNotifyFn(() => {
          originalQueue.forEach((callback) => {
            notifyFn(callback);
          });
        });
      });
    }
  };
  const setNotifyFunction = (fn) => {
    notifyFn = fn;
  };
  const setBatchNotifyFunction = (fn) => {
    batchNotifyFn = fn;
  };
  return {
    batch,
    batchCalls,
    schedule,
    setNotifyFunction,
    setBatchNotifyFunction
  };
}
var notifyManager = createNotifyManager();

// node_modules/@tanstack/query-core/build/lib/removable.mjs
var Removable = class {
  destroy() {
    this.clearGcTimeout();
  }
  scheduleGc() {
    this.clearGcTimeout();
    if (isValidTimeout(this.cacheTime)) {
      this.gcTimeout = setTimeout(() => {
        this.optionalRemove();
      }, this.cacheTime);
    }
  }
  updateCacheTime(newCacheTime) {
    this.cacheTime = Math.max(this.cacheTime || 0, newCacheTime != null ? newCacheTime : isServer ? Infinity : 5 * 60 * 1e3);
  }
  clearGcTimeout() {
    if (this.gcTimeout) {
      clearTimeout(this.gcTimeout);
      this.gcTimeout = void 0;
    }
  }
};

// node_modules/@tanstack/query-core/build/lib/query.mjs
var Query = class extends Removable {
  constructor(config) {
    super();
    this.abortSignalConsumed = false;
    this.defaultOptions = config.defaultOptions;
    this.setOptions(config.options);
    this.observers = [];
    this.cache = config.cache;
    this.logger = config.logger || defaultLogger;
    this.queryKey = config.queryKey;
    this.queryHash = config.queryHash;
    this.initialState = config.state || getDefaultState(this.options);
    this.state = this.initialState;
    this.scheduleGc();
  }
  get meta() {
    return this.options.meta;
  }
  setOptions(options) {
    this.options = {
      ...this.defaultOptions,
      ...options
    };
    this.updateCacheTime(this.options.cacheTime);
  }
  optionalRemove() {
    if (!this.observers.length && this.state.fetchStatus === "idle") {
      this.cache.remove(this);
    }
  }
  setData(newData, options) {
    const data = replaceData(this.state.data, newData, this.options);
    this.dispatch({
      data,
      type: "success",
      dataUpdatedAt: options == null ? void 0 : options.updatedAt,
      manual: options == null ? void 0 : options.manual
    });
    return data;
  }
  setState(state, setStateOptions) {
    this.dispatch({
      type: "setState",
      state,
      setStateOptions
    });
  }
  cancel(options) {
    var _this$retryer;
    const promise = this.promise;
    (_this$retryer = this.retryer) == null ? void 0 : _this$retryer.cancel(options);
    return promise ? promise.then(noop2).catch(noop2) : Promise.resolve();
  }
  destroy() {
    super.destroy();
    this.cancel({
      silent: true
    });
  }
  reset() {
    this.destroy();
    this.setState(this.initialState);
  }
  isActive() {
    return this.observers.some((observer) => observer.options.enabled !== false);
  }
  isDisabled() {
    return this.getObserversCount() > 0 && !this.isActive();
  }
  isStale() {
    return this.state.isInvalidated || !this.state.dataUpdatedAt || this.observers.some((observer) => observer.getCurrentResult().isStale);
  }
  isStaleByTime(staleTime = 0) {
    return this.state.isInvalidated || !this.state.dataUpdatedAt || !timeUntilStale(this.state.dataUpdatedAt, staleTime);
  }
  onFocus() {
    var _this$retryer2;
    const observer = this.observers.find((x) => x.shouldFetchOnWindowFocus());
    if (observer) {
      observer.refetch({
        cancelRefetch: false
      });
    }
    (_this$retryer2 = this.retryer) == null ? void 0 : _this$retryer2.continue();
  }
  onOnline() {
    var _this$retryer3;
    const observer = this.observers.find((x) => x.shouldFetchOnReconnect());
    if (observer) {
      observer.refetch({
        cancelRefetch: false
      });
    }
    (_this$retryer3 = this.retryer) == null ? void 0 : _this$retryer3.continue();
  }
  addObserver(observer) {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
      this.clearGcTimeout();
      this.cache.notify({
        type: "observerAdded",
        query: this,
        observer
      });
    }
  }
  removeObserver(observer) {
    if (this.observers.includes(observer)) {
      this.observers = this.observers.filter((x) => x !== observer);
      if (!this.observers.length) {
        if (this.retryer) {
          if (this.abortSignalConsumed) {
            this.retryer.cancel({
              revert: true
            });
          } else {
            this.retryer.cancelRetry();
          }
        }
        this.scheduleGc();
      }
      this.cache.notify({
        type: "observerRemoved",
        query: this,
        observer
      });
    }
  }
  getObserversCount() {
    return this.observers.length;
  }
  invalidate() {
    if (!this.state.isInvalidated) {
      this.dispatch({
        type: "invalidate"
      });
    }
  }
  fetch(options, fetchOptions) {
    var _this$options$behavio, _context$fetchOptions;
    if (this.state.fetchStatus !== "idle") {
      if (this.state.dataUpdatedAt && fetchOptions != null && fetchOptions.cancelRefetch) {
        this.cancel({
          silent: true
        });
      } else if (this.promise) {
        var _this$retryer4;
        (_this$retryer4 = this.retryer) == null ? void 0 : _this$retryer4.continueRetry();
        return this.promise;
      }
    }
    if (options) {
      this.setOptions(options);
    }
    if (!this.options.queryFn) {
      const observer = this.observers.find((x) => x.options.queryFn);
      if (observer) {
        this.setOptions(observer.options);
      }
    }
    if (process.env.NODE_ENV !== "production") {
      if (!Array.isArray(this.options.queryKey)) {
        this.logger.error("As of v4, queryKey needs to be an Array. If you are using a string like 'repoData', please change it to an Array, e.g. ['repoData']");
      }
    }
    const abortController = getAbortController();
    const queryFnContext = {
      queryKey: this.queryKey,
      pageParam: void 0,
      meta: this.meta
    };
    const addSignalProperty = (object) => {
      Object.defineProperty(object, "signal", {
        enumerable: true,
        get: () => {
          if (abortController) {
            this.abortSignalConsumed = true;
            return abortController.signal;
          }
          return void 0;
        }
      });
    };
    addSignalProperty(queryFnContext);
    const fetchFn = () => {
      if (!this.options.queryFn) {
        return Promise.reject("Missing queryFn for queryKey '" + this.options.queryHash + "'");
      }
      this.abortSignalConsumed = false;
      return this.options.queryFn(queryFnContext);
    };
    const context = {
      fetchOptions,
      options: this.options,
      queryKey: this.queryKey,
      state: this.state,
      fetchFn
    };
    addSignalProperty(context);
    (_this$options$behavio = this.options.behavior) == null ? void 0 : _this$options$behavio.onFetch(context);
    this.revertState = this.state;
    if (this.state.fetchStatus === "idle" || this.state.fetchMeta !== ((_context$fetchOptions = context.fetchOptions) == null ? void 0 : _context$fetchOptions.meta)) {
      var _context$fetchOptions2;
      this.dispatch({
        type: "fetch",
        meta: (_context$fetchOptions2 = context.fetchOptions) == null ? void 0 : _context$fetchOptions2.meta
      });
    }
    const onError = (error) => {
      if (!(isCancelledError(error) && error.silent)) {
        this.dispatch({
          type: "error",
          error
        });
      }
      if (!isCancelledError(error)) {
        var _this$cache$config$on, _this$cache$config, _this$cache$config$on2, _this$cache$config2;
        (_this$cache$config$on = (_this$cache$config = this.cache.config).onError) == null ? void 0 : _this$cache$config$on.call(_this$cache$config, error, this);
        (_this$cache$config$on2 = (_this$cache$config2 = this.cache.config).onSettled) == null ? void 0 : _this$cache$config$on2.call(_this$cache$config2, this.state.data, error, this);
        if (process.env.NODE_ENV !== "production") {
          this.logger.error(error);
        }
      }
      if (!this.isFetchingOptimistic) {
        this.scheduleGc();
      }
      this.isFetchingOptimistic = false;
    };
    this.retryer = createRetryer({
      fn: context.fetchFn,
      abort: abortController == null ? void 0 : abortController.abort.bind(abortController),
      onSuccess: (data) => {
        var _this$cache$config$on3, _this$cache$config3, _this$cache$config$on4, _this$cache$config4;
        if (typeof data === "undefined") {
          if (process.env.NODE_ENV !== "production") {
            this.logger.error("Query data cannot be undefined. Please make sure to return a value other than undefined from your query function. Affected query key: " + this.queryHash);
          }
          onError(new Error(this.queryHash + " data is undefined"));
          return;
        }
        this.setData(data);
        (_this$cache$config$on3 = (_this$cache$config3 = this.cache.config).onSuccess) == null ? void 0 : _this$cache$config$on3.call(_this$cache$config3, data, this);
        (_this$cache$config$on4 = (_this$cache$config4 = this.cache.config).onSettled) == null ? void 0 : _this$cache$config$on4.call(_this$cache$config4, data, this.state.error, this);
        if (!this.isFetchingOptimistic) {
          this.scheduleGc();
        }
        this.isFetchingOptimistic = false;
      },
      onError,
      onFail: (failureCount, error) => {
        this.dispatch({
          type: "failed",
          failureCount,
          error
        });
      },
      onPause: () => {
        this.dispatch({
          type: "pause"
        });
      },
      onContinue: () => {
        this.dispatch({
          type: "continue"
        });
      },
      retry: context.options.retry,
      retryDelay: context.options.retryDelay,
      networkMode: context.options.networkMode
    });
    this.promise = this.retryer.promise;
    return this.promise;
  }
  dispatch(action) {
    const reducer = (state) => {
      var _action$meta, _action$dataUpdatedAt;
      switch (action.type) {
        case "failed":
          return {
            ...state,
            fetchFailureCount: action.failureCount,
            fetchFailureReason: action.error
          };
        case "pause":
          return {
            ...state,
            fetchStatus: "paused"
          };
        case "continue":
          return {
            ...state,
            fetchStatus: "fetching"
          };
        case "fetch":
          return {
            ...state,
            fetchFailureCount: 0,
            fetchFailureReason: null,
            fetchMeta: (_action$meta = action.meta) != null ? _action$meta : null,
            fetchStatus: canFetch(this.options.networkMode) ? "fetching" : "paused",
            ...!state.dataUpdatedAt && {
              error: null,
              status: "loading"
            }
          };
        case "success":
          return {
            ...state,
            data: action.data,
            dataUpdateCount: state.dataUpdateCount + 1,
            dataUpdatedAt: (_action$dataUpdatedAt = action.dataUpdatedAt) != null ? _action$dataUpdatedAt : Date.now(),
            error: null,
            isInvalidated: false,
            status: "success",
            ...!action.manual && {
              fetchStatus: "idle",
              fetchFailureCount: 0,
              fetchFailureReason: null
            }
          };
        case "error":
          const error = action.error;
          if (isCancelledError(error) && error.revert && this.revertState) {
            return {
              ...this.revertState,
              fetchStatus: "idle"
            };
          }
          return {
            ...state,
            error,
            errorUpdateCount: state.errorUpdateCount + 1,
            errorUpdatedAt: Date.now(),
            fetchFailureCount: state.fetchFailureCount + 1,
            fetchFailureReason: error,
            fetchStatus: "idle",
            status: "error"
          };
        case "invalidate":
          return {
            ...state,
            isInvalidated: true
          };
        case "setState":
          return {
            ...state,
            ...action.state
          };
      }
    };
    this.state = reducer(this.state);
    notifyManager.batch(() => {
      this.observers.forEach((observer) => {
        observer.onQueryUpdate(action);
      });
      this.cache.notify({
        query: this,
        type: "updated",
        action
      });
    });
  }
};
function getDefaultState(options) {
  const data = typeof options.initialData === "function" ? options.initialData() : options.initialData;
  const hasData = typeof data !== "undefined";
  const initialDataUpdatedAt = hasData ? typeof options.initialDataUpdatedAt === "function" ? options.initialDataUpdatedAt() : options.initialDataUpdatedAt : 0;
  return {
    data,
    dataUpdateCount: 0,
    dataUpdatedAt: hasData ? initialDataUpdatedAt != null ? initialDataUpdatedAt : Date.now() : 0,
    error: null,
    errorUpdateCount: 0,
    errorUpdatedAt: 0,
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchMeta: null,
    isInvalidated: false,
    status: hasData ? "success" : "loading",
    fetchStatus: "idle"
  };
}

// node_modules/@tanstack/query-core/build/lib/queryCache.mjs
var QueryCache = class extends Subscribable {
  constructor(config) {
    super();
    this.config = config || {};
    this.queries = [];
    this.queriesMap = {};
  }
  build(client, options, state) {
    var _options$queryHash;
    const queryKey = options.queryKey;
    const queryHash = (_options$queryHash = options.queryHash) != null ? _options$queryHash : hashQueryKeyByOptions(queryKey, options);
    let query = this.get(queryHash);
    if (!query) {
      query = new Query({
        cache: this,
        logger: client.getLogger(),
        queryKey,
        queryHash,
        options: client.defaultQueryOptions(options),
        state,
        defaultOptions: client.getQueryDefaults(queryKey)
      });
      this.add(query);
    }
    return query;
  }
  add(query) {
    if (!this.queriesMap[query.queryHash]) {
      this.queriesMap[query.queryHash] = query;
      this.queries.push(query);
      this.notify({
        type: "added",
        query
      });
    }
  }
  remove(query) {
    const queryInMap = this.queriesMap[query.queryHash];
    if (queryInMap) {
      query.destroy();
      this.queries = this.queries.filter((x) => x !== query);
      if (queryInMap === query) {
        delete this.queriesMap[query.queryHash];
      }
      this.notify({
        type: "removed",
        query
      });
    }
  }
  clear() {
    notifyManager.batch(() => {
      this.queries.forEach((query) => {
        this.remove(query);
      });
    });
  }
  get(queryHash) {
    return this.queriesMap[queryHash];
  }
  getAll() {
    return this.queries;
  }
  find(arg1, arg2) {
    const [filters] = parseFilterArgs(arg1, arg2);
    if (typeof filters.exact === "undefined") {
      filters.exact = true;
    }
    return this.queries.find((query) => matchQuery(filters, query));
  }
  findAll(arg1, arg2) {
    const [filters] = parseFilterArgs(arg1, arg2);
    return Object.keys(filters).length > 0 ? this.queries.filter((query) => matchQuery(filters, query)) : this.queries;
  }
  notify(event) {
    notifyManager.batch(() => {
      this.listeners.forEach(({
        listener
      }) => {
        listener(event);
      });
    });
  }
  onFocus() {
    notifyManager.batch(() => {
      this.queries.forEach((query) => {
        query.onFocus();
      });
    });
  }
  onOnline() {
    notifyManager.batch(() => {
      this.queries.forEach((query) => {
        query.onOnline();
      });
    });
  }
};

// node_modules/@tanstack/query-core/build/lib/mutation.mjs
var Mutation = class extends Removable {
  constructor(config) {
    super();
    this.defaultOptions = config.defaultOptions;
    this.mutationId = config.mutationId;
    this.mutationCache = config.mutationCache;
    this.logger = config.logger || defaultLogger;
    this.observers = [];
    this.state = config.state || getDefaultState2();
    this.setOptions(config.options);
    this.scheduleGc();
  }
  setOptions(options) {
    this.options = {
      ...this.defaultOptions,
      ...options
    };
    this.updateCacheTime(this.options.cacheTime);
  }
  get meta() {
    return this.options.meta;
  }
  setState(state) {
    this.dispatch({
      type: "setState",
      state
    });
  }
  addObserver(observer) {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
      this.clearGcTimeout();
      this.mutationCache.notify({
        type: "observerAdded",
        mutation: this,
        observer
      });
    }
  }
  removeObserver(observer) {
    this.observers = this.observers.filter((x) => x !== observer);
    this.scheduleGc();
    this.mutationCache.notify({
      type: "observerRemoved",
      mutation: this,
      observer
    });
  }
  optionalRemove() {
    if (!this.observers.length) {
      if (this.state.status === "loading") {
        this.scheduleGc();
      } else {
        this.mutationCache.remove(this);
      }
    }
  }
  continue() {
    var _this$retryer$continu, _this$retryer;
    return (_this$retryer$continu = (_this$retryer = this.retryer) == null ? void 0 : _this$retryer.continue()) != null ? _this$retryer$continu : this.execute();
  }
  async execute() {
    const executeMutation = () => {
      var _this$options$retry;
      this.retryer = createRetryer({
        fn: () => {
          if (!this.options.mutationFn) {
            return Promise.reject("No mutationFn found");
          }
          return this.options.mutationFn(this.state.variables);
        },
        onFail: (failureCount, error) => {
          this.dispatch({
            type: "failed",
            failureCount,
            error
          });
        },
        onPause: () => {
          this.dispatch({
            type: "pause"
          });
        },
        onContinue: () => {
          this.dispatch({
            type: "continue"
          });
        },
        retry: (_this$options$retry = this.options.retry) != null ? _this$options$retry : 0,
        retryDelay: this.options.retryDelay,
        networkMode: this.options.networkMode
      });
      return this.retryer.promise;
    };
    const restored = this.state.status === "loading";
    try {
      var _this$mutationCache$c3, _this$mutationCache$c4, _this$options$onSucce, _this$options2, _this$mutationCache$c5, _this$mutationCache$c6, _this$options$onSettl, _this$options3;
      if (!restored) {
        var _this$mutationCache$c, _this$mutationCache$c2, _this$options$onMutat, _this$options;
        this.dispatch({
          type: "loading",
          variables: this.options.variables
        });
        await ((_this$mutationCache$c = (_this$mutationCache$c2 = this.mutationCache.config).onMutate) == null ? void 0 : _this$mutationCache$c.call(_this$mutationCache$c2, this.state.variables, this));
        const context = await ((_this$options$onMutat = (_this$options = this.options).onMutate) == null ? void 0 : _this$options$onMutat.call(_this$options, this.state.variables));
        if (context !== this.state.context) {
          this.dispatch({
            type: "loading",
            context,
            variables: this.state.variables
          });
        }
      }
      const data = await executeMutation();
      await ((_this$mutationCache$c3 = (_this$mutationCache$c4 = this.mutationCache.config).onSuccess) == null ? void 0 : _this$mutationCache$c3.call(_this$mutationCache$c4, data, this.state.variables, this.state.context, this));
      await ((_this$options$onSucce = (_this$options2 = this.options).onSuccess) == null ? void 0 : _this$options$onSucce.call(_this$options2, data, this.state.variables, this.state.context));
      await ((_this$mutationCache$c5 = (_this$mutationCache$c6 = this.mutationCache.config).onSettled) == null ? void 0 : _this$mutationCache$c5.call(_this$mutationCache$c6, data, null, this.state.variables, this.state.context, this));
      await ((_this$options$onSettl = (_this$options3 = this.options).onSettled) == null ? void 0 : _this$options$onSettl.call(_this$options3, data, null, this.state.variables, this.state.context));
      this.dispatch({
        type: "success",
        data
      });
      return data;
    } catch (error) {
      try {
        var _this$mutationCache$c7, _this$mutationCache$c8, _this$options$onError, _this$options4, _this$mutationCache$c9, _this$mutationCache$c10, _this$options$onSettl2, _this$options5;
        await ((_this$mutationCache$c7 = (_this$mutationCache$c8 = this.mutationCache.config).onError) == null ? void 0 : _this$mutationCache$c7.call(_this$mutationCache$c8, error, this.state.variables, this.state.context, this));
        if (process.env.NODE_ENV !== "production") {
          this.logger.error(error);
        }
        await ((_this$options$onError = (_this$options4 = this.options).onError) == null ? void 0 : _this$options$onError.call(_this$options4, error, this.state.variables, this.state.context));
        await ((_this$mutationCache$c9 = (_this$mutationCache$c10 = this.mutationCache.config).onSettled) == null ? void 0 : _this$mutationCache$c9.call(_this$mutationCache$c10, void 0, error, this.state.variables, this.state.context, this));
        await ((_this$options$onSettl2 = (_this$options5 = this.options).onSettled) == null ? void 0 : _this$options$onSettl2.call(_this$options5, void 0, error, this.state.variables, this.state.context));
        throw error;
      } finally {
        this.dispatch({
          type: "error",
          error
        });
      }
    }
  }
  dispatch(action) {
    const reducer = (state) => {
      switch (action.type) {
        case "failed":
          return {
            ...state,
            failureCount: action.failureCount,
            failureReason: action.error
          };
        case "pause":
          return {
            ...state,
            isPaused: true
          };
        case "continue":
          return {
            ...state,
            isPaused: false
          };
        case "loading":
          return {
            ...state,
            context: action.context,
            data: void 0,
            failureCount: 0,
            failureReason: null,
            error: null,
            isPaused: !canFetch(this.options.networkMode),
            status: "loading",
            variables: action.variables
          };
        case "success":
          return {
            ...state,
            data: action.data,
            failureCount: 0,
            failureReason: null,
            error: null,
            status: "success",
            isPaused: false
          };
        case "error":
          return {
            ...state,
            data: void 0,
            error: action.error,
            failureCount: state.failureCount + 1,
            failureReason: action.error,
            isPaused: false,
            status: "error"
          };
        case "setState":
          return {
            ...state,
            ...action.state
          };
      }
    };
    this.state = reducer(this.state);
    notifyManager.batch(() => {
      this.observers.forEach((observer) => {
        observer.onMutationUpdate(action);
      });
      this.mutationCache.notify({
        mutation: this,
        type: "updated",
        action
      });
    });
  }
};
function getDefaultState2() {
  return {
    context: void 0,
    data: void 0,
    error: null,
    failureCount: 0,
    failureReason: null,
    isPaused: false,
    status: "idle",
    variables: void 0
  };
}

// node_modules/@tanstack/query-core/build/lib/mutationCache.mjs
var MutationCache = class extends Subscribable {
  constructor(config) {
    super();
    this.config = config || {};
    this.mutations = [];
    this.mutationId = 0;
  }
  build(client, options, state) {
    const mutation = new Mutation({
      mutationCache: this,
      logger: client.getLogger(),
      mutationId: ++this.mutationId,
      options: client.defaultMutationOptions(options),
      state,
      defaultOptions: options.mutationKey ? client.getMutationDefaults(options.mutationKey) : void 0
    });
    this.add(mutation);
    return mutation;
  }
  add(mutation) {
    this.mutations.push(mutation);
    this.notify({
      type: "added",
      mutation
    });
  }
  remove(mutation) {
    this.mutations = this.mutations.filter((x) => x !== mutation);
    this.notify({
      type: "removed",
      mutation
    });
  }
  clear() {
    notifyManager.batch(() => {
      this.mutations.forEach((mutation) => {
        this.remove(mutation);
      });
    });
  }
  getAll() {
    return this.mutations;
  }
  find(filters) {
    if (typeof filters.exact === "undefined") {
      filters.exact = true;
    }
    return this.mutations.find((mutation) => matchMutation(filters, mutation));
  }
  findAll(filters) {
    return this.mutations.filter((mutation) => matchMutation(filters, mutation));
  }
  notify(event) {
    notifyManager.batch(() => {
      this.listeners.forEach(({
        listener
      }) => {
        listener(event);
      });
    });
  }
  resumePausedMutations() {
    var _this$resuming;
    this.resuming = ((_this$resuming = this.resuming) != null ? _this$resuming : Promise.resolve()).then(() => {
      const pausedMutations = this.mutations.filter((x) => x.state.isPaused);
      return notifyManager.batch(() => pausedMutations.reduce((promise, mutation) => promise.then(() => mutation.continue().catch(noop2)), Promise.resolve()));
    }).then(() => {
      this.resuming = void 0;
    });
    return this.resuming;
  }
};

// node_modules/@tanstack/query-core/build/lib/infiniteQueryBehavior.mjs
function infiniteQueryBehavior() {
  return {
    onFetch: (context) => {
      context.fetchFn = () => {
        var _context$fetchOptions, _context$fetchOptions2, _context$fetchOptions3, _context$fetchOptions4, _context$state$data, _context$state$data2;
        const refetchPage = (_context$fetchOptions = context.fetchOptions) == null ? void 0 : (_context$fetchOptions2 = _context$fetchOptions.meta) == null ? void 0 : _context$fetchOptions2.refetchPage;
        const fetchMore = (_context$fetchOptions3 = context.fetchOptions) == null ? void 0 : (_context$fetchOptions4 = _context$fetchOptions3.meta) == null ? void 0 : _context$fetchOptions4.fetchMore;
        const pageParam = fetchMore == null ? void 0 : fetchMore.pageParam;
        const isFetchingNextPage = (fetchMore == null ? void 0 : fetchMore.direction) === "forward";
        const isFetchingPreviousPage = (fetchMore == null ? void 0 : fetchMore.direction) === "backward";
        const oldPages = ((_context$state$data = context.state.data) == null ? void 0 : _context$state$data.pages) || [];
        const oldPageParams = ((_context$state$data2 = context.state.data) == null ? void 0 : _context$state$data2.pageParams) || [];
        let newPageParams = oldPageParams;
        let cancelled = false;
        const addSignalProperty = (object) => {
          Object.defineProperty(object, "signal", {
            enumerable: true,
            get: () => {
              var _context$signal;
              if ((_context$signal = context.signal) != null && _context$signal.aborted) {
                cancelled = true;
              } else {
                var _context$signal2;
                (_context$signal2 = context.signal) == null ? void 0 : _context$signal2.addEventListener("abort", () => {
                  cancelled = true;
                });
              }
              return context.signal;
            }
          });
        };
        const queryFn = context.options.queryFn || (() => Promise.reject("Missing queryFn for queryKey '" + context.options.queryHash + "'"));
        const buildNewPages = (pages, param, page, previous) => {
          newPageParams = previous ? [param, ...newPageParams] : [...newPageParams, param];
          return previous ? [page, ...pages] : [...pages, page];
        };
        const fetchPage = (pages, manual, param, previous) => {
          if (cancelled) {
            return Promise.reject("Cancelled");
          }
          if (typeof param === "undefined" && !manual && pages.length) {
            return Promise.resolve(pages);
          }
          const queryFnContext = {
            queryKey: context.queryKey,
            pageParam: param,
            meta: context.options.meta
          };
          addSignalProperty(queryFnContext);
          const queryFnResult = queryFn(queryFnContext);
          const promise2 = Promise.resolve(queryFnResult).then((page) => buildNewPages(pages, param, page, previous));
          return promise2;
        };
        let promise;
        if (!oldPages.length) {
          promise = fetchPage([]);
        } else if (isFetchingNextPage) {
          const manual = typeof pageParam !== "undefined";
          const param = manual ? pageParam : getNextPageParam(context.options, oldPages);
          promise = fetchPage(oldPages, manual, param);
        } else if (isFetchingPreviousPage) {
          const manual = typeof pageParam !== "undefined";
          const param = manual ? pageParam : getPreviousPageParam(context.options, oldPages);
          promise = fetchPage(oldPages, manual, param, true);
        } else {
          newPageParams = [];
          const manual = typeof context.options.getNextPageParam === "undefined";
          const shouldFetchFirstPage = refetchPage && oldPages[0] ? refetchPage(oldPages[0], 0, oldPages) : true;
          promise = shouldFetchFirstPage ? fetchPage([], manual, oldPageParams[0]) : Promise.resolve(buildNewPages([], oldPageParams[0], oldPages[0]));
          for (let i = 1; i < oldPages.length; i++) {
            promise = promise.then((pages) => {
              const shouldFetchNextPage = refetchPage && oldPages[i] ? refetchPage(oldPages[i], i, oldPages) : true;
              if (shouldFetchNextPage) {
                const param = manual ? oldPageParams[i] : getNextPageParam(context.options, pages);
                return fetchPage(pages, manual, param);
              }
              return Promise.resolve(buildNewPages(pages, oldPageParams[i], oldPages[i]));
            });
          }
        }
        const finalPromise = promise.then((pages) => ({
          pages,
          pageParams: newPageParams
        }));
        return finalPromise;
      };
    }
  };
}
function getNextPageParam(options, pages) {
  return options.getNextPageParam == null ? void 0 : options.getNextPageParam(pages[pages.length - 1], pages);
}
function getPreviousPageParam(options, pages) {
  return options.getPreviousPageParam == null ? void 0 : options.getPreviousPageParam(pages[0], pages);
}

// node_modules/@tanstack/query-core/build/lib/queryClient.mjs
var QueryClient = class {
  constructor(config = {}) {
    this.queryCache = config.queryCache || new QueryCache();
    this.mutationCache = config.mutationCache || new MutationCache();
    this.logger = config.logger || defaultLogger;
    this.defaultOptions = config.defaultOptions || {};
    this.queryDefaults = [];
    this.mutationDefaults = [];
    this.mountCount = 0;
    if (process.env.NODE_ENV !== "production" && config.logger) {
      this.logger.error("Passing a custom logger has been deprecated and will be removed in the next major version.");
    }
  }
  mount() {
    this.mountCount++;
    if (this.mountCount !== 1)
      return;
    this.unsubscribeFocus = focusManager.subscribe(() => {
      if (focusManager.isFocused()) {
        this.resumePausedMutations();
        this.queryCache.onFocus();
      }
    });
    this.unsubscribeOnline = onlineManager.subscribe(() => {
      if (onlineManager.isOnline()) {
        this.resumePausedMutations();
        this.queryCache.onOnline();
      }
    });
  }
  unmount() {
    var _this$unsubscribeFocu, _this$unsubscribeOnli;
    this.mountCount--;
    if (this.mountCount !== 0)
      return;
    (_this$unsubscribeFocu = this.unsubscribeFocus) == null ? void 0 : _this$unsubscribeFocu.call(this);
    this.unsubscribeFocus = void 0;
    (_this$unsubscribeOnli = this.unsubscribeOnline) == null ? void 0 : _this$unsubscribeOnli.call(this);
    this.unsubscribeOnline = void 0;
  }
  isFetching(arg1, arg2) {
    const [filters] = parseFilterArgs(arg1, arg2);
    filters.fetchStatus = "fetching";
    return this.queryCache.findAll(filters).length;
  }
  isMutating(filters) {
    return this.mutationCache.findAll({
      ...filters,
      fetching: true
    }).length;
  }
  getQueryData(queryKey, filters) {
    var _this$queryCache$find;
    return (_this$queryCache$find = this.queryCache.find(queryKey, filters)) == null ? void 0 : _this$queryCache$find.state.data;
  }
  ensureQueryData(arg1, arg2, arg3) {
    const parsedOptions = parseQueryArgs(arg1, arg2, arg3);
    const cachedData = this.getQueryData(parsedOptions.queryKey);
    return cachedData ? Promise.resolve(cachedData) : this.fetchQuery(parsedOptions);
  }
  getQueriesData(queryKeyOrFilters) {
    return this.getQueryCache().findAll(queryKeyOrFilters).map(({
      queryKey,
      state
    }) => {
      const data = state.data;
      return [queryKey, data];
    });
  }
  setQueryData(queryKey, updater, options) {
    const query = this.queryCache.find(queryKey);
    const prevData = query == null ? void 0 : query.state.data;
    const data = functionalUpdate(updater, prevData);
    if (typeof data === "undefined") {
      return void 0;
    }
    const parsedOptions = parseQueryArgs(queryKey);
    const defaultedOptions = this.defaultQueryOptions(parsedOptions);
    return this.queryCache.build(this, defaultedOptions).setData(data, {
      ...options,
      manual: true
    });
  }
  setQueriesData(queryKeyOrFilters, updater, options) {
    return notifyManager.batch(() => this.getQueryCache().findAll(queryKeyOrFilters).map(({
      queryKey
    }) => [queryKey, this.setQueryData(queryKey, updater, options)]));
  }
  getQueryState(queryKey, filters) {
    var _this$queryCache$find2;
    return (_this$queryCache$find2 = this.queryCache.find(queryKey, filters)) == null ? void 0 : _this$queryCache$find2.state;
  }
  removeQueries(arg1, arg2) {
    const [filters] = parseFilterArgs(arg1, arg2);
    const queryCache = this.queryCache;
    notifyManager.batch(() => {
      queryCache.findAll(filters).forEach((query) => {
        queryCache.remove(query);
      });
    });
  }
  resetQueries(arg1, arg2, arg3) {
    const [filters, options] = parseFilterArgs(arg1, arg2, arg3);
    const queryCache = this.queryCache;
    const refetchFilters = {
      type: "active",
      ...filters
    };
    return notifyManager.batch(() => {
      queryCache.findAll(filters).forEach((query) => {
        query.reset();
      });
      return this.refetchQueries(refetchFilters, options);
    });
  }
  cancelQueries(arg1, arg2, arg3) {
    const [filters, cancelOptions = {}] = parseFilterArgs(arg1, arg2, arg3);
    if (typeof cancelOptions.revert === "undefined") {
      cancelOptions.revert = true;
    }
    const promises = notifyManager.batch(() => this.queryCache.findAll(filters).map((query) => query.cancel(cancelOptions)));
    return Promise.all(promises).then(noop2).catch(noop2);
  }
  invalidateQueries(arg1, arg2, arg3) {
    const [filters, options] = parseFilterArgs(arg1, arg2, arg3);
    return notifyManager.batch(() => {
      var _ref, _filters$refetchType;
      this.queryCache.findAll(filters).forEach((query) => {
        query.invalidate();
      });
      if (filters.refetchType === "none") {
        return Promise.resolve();
      }
      const refetchFilters = {
        ...filters,
        type: (_ref = (_filters$refetchType = filters.refetchType) != null ? _filters$refetchType : filters.type) != null ? _ref : "active"
      };
      return this.refetchQueries(refetchFilters, options);
    });
  }
  refetchQueries(arg1, arg2, arg3) {
    const [filters, options] = parseFilterArgs(arg1, arg2, arg3);
    const promises = notifyManager.batch(() => this.queryCache.findAll(filters).filter((query) => !query.isDisabled()).map((query) => {
      var _options$cancelRefetc;
      return query.fetch(void 0, {
        ...options,
        cancelRefetch: (_options$cancelRefetc = options == null ? void 0 : options.cancelRefetch) != null ? _options$cancelRefetc : true,
        meta: {
          refetchPage: filters.refetchPage
        }
      });
    }));
    let promise = Promise.all(promises).then(noop2);
    if (!(options != null && options.throwOnError)) {
      promise = promise.catch(noop2);
    }
    return promise;
  }
  fetchQuery(arg1, arg2, arg3) {
    const parsedOptions = parseQueryArgs(arg1, arg2, arg3);
    const defaultedOptions = this.defaultQueryOptions(parsedOptions);
    if (typeof defaultedOptions.retry === "undefined") {
      defaultedOptions.retry = false;
    }
    const query = this.queryCache.build(this, defaultedOptions);
    return query.isStaleByTime(defaultedOptions.staleTime) ? query.fetch(defaultedOptions) : Promise.resolve(query.state.data);
  }
  prefetchQuery(arg1, arg2, arg3) {
    return this.fetchQuery(arg1, arg2, arg3).then(noop2).catch(noop2);
  }
  fetchInfiniteQuery(arg1, arg2, arg3) {
    const parsedOptions = parseQueryArgs(arg1, arg2, arg3);
    parsedOptions.behavior = infiniteQueryBehavior();
    return this.fetchQuery(parsedOptions);
  }
  prefetchInfiniteQuery(arg1, arg2, arg3) {
    return this.fetchInfiniteQuery(arg1, arg2, arg3).then(noop2).catch(noop2);
  }
  resumePausedMutations() {
    return this.mutationCache.resumePausedMutations();
  }
  getQueryCache() {
    return this.queryCache;
  }
  getMutationCache() {
    return this.mutationCache;
  }
  getLogger() {
    return this.logger;
  }
  getDefaultOptions() {
    return this.defaultOptions;
  }
  setDefaultOptions(options) {
    this.defaultOptions = options;
  }
  setQueryDefaults(queryKey, options) {
    const result = this.queryDefaults.find((x) => hashQueryKey(queryKey) === hashQueryKey(x.queryKey));
    if (result) {
      result.defaultOptions = options;
    } else {
      this.queryDefaults.push({
        queryKey,
        defaultOptions: options
      });
    }
  }
  getQueryDefaults(queryKey) {
    if (!queryKey) {
      return void 0;
    }
    const firstMatchingDefaults = this.queryDefaults.find((x) => partialMatchKey(queryKey, x.queryKey));
    if (process.env.NODE_ENV !== "production") {
      const matchingDefaults = this.queryDefaults.filter((x) => partialMatchKey(queryKey, x.queryKey));
      if (matchingDefaults.length > 1) {
        this.logger.error("[QueryClient] Several query defaults match with key '" + JSON.stringify(queryKey) + "'. The first matching query defaults are used. Please check how query defaults are registered. Order does matter here. cf. https://react-query.tanstack.com/reference/QueryClient#queryclientsetquerydefaults.");
      }
    }
    return firstMatchingDefaults == null ? void 0 : firstMatchingDefaults.defaultOptions;
  }
  setMutationDefaults(mutationKey, options) {
    const result = this.mutationDefaults.find((x) => hashQueryKey(mutationKey) === hashQueryKey(x.mutationKey));
    if (result) {
      result.defaultOptions = options;
    } else {
      this.mutationDefaults.push({
        mutationKey,
        defaultOptions: options
      });
    }
  }
  getMutationDefaults(mutationKey) {
    if (!mutationKey) {
      return void 0;
    }
    const firstMatchingDefaults = this.mutationDefaults.find((x) => partialMatchKey(mutationKey, x.mutationKey));
    if (process.env.NODE_ENV !== "production") {
      const matchingDefaults = this.mutationDefaults.filter((x) => partialMatchKey(mutationKey, x.mutationKey));
      if (matchingDefaults.length > 1) {
        this.logger.error("[QueryClient] Several mutation defaults match with key '" + JSON.stringify(mutationKey) + "'. The first matching mutation defaults are used. Please check how mutation defaults are registered. Order does matter here. cf. https://react-query.tanstack.com/reference/QueryClient#queryclientsetmutationdefaults.");
      }
    }
    return firstMatchingDefaults == null ? void 0 : firstMatchingDefaults.defaultOptions;
  }
  defaultQueryOptions(options) {
    if (options != null && options._defaulted) {
      return options;
    }
    const defaultedOptions = {
      ...this.defaultOptions.queries,
      ...this.getQueryDefaults(options == null ? void 0 : options.queryKey),
      ...options,
      _defaulted: true
    };
    if (!defaultedOptions.queryHash && defaultedOptions.queryKey) {
      defaultedOptions.queryHash = hashQueryKeyByOptions(defaultedOptions.queryKey, defaultedOptions);
    }
    if (typeof defaultedOptions.refetchOnReconnect === "undefined") {
      defaultedOptions.refetchOnReconnect = defaultedOptions.networkMode !== "always";
    }
    if (typeof defaultedOptions.useErrorBoundary === "undefined") {
      defaultedOptions.useErrorBoundary = !!defaultedOptions.suspense;
    }
    return defaultedOptions;
  }
  defaultMutationOptions(options) {
    if (options != null && options._defaulted) {
      return options;
    }
    return {
      ...this.defaultOptions.mutations,
      ...this.getMutationDefaults(options == null ? void 0 : options.mutationKey),
      ...options,
      _defaulted: true
    };
  }
  clear() {
    this.queryCache.clear();
    this.mutationCache.clear();
  }
};

// node_modules/@tanstack/query-core/build/lib/queryObserver.mjs
var QueryObserver = class extends Subscribable {
  constructor(client, options) {
    super();
    this.client = client;
    this.options = options;
    this.trackedProps = /* @__PURE__ */ new Set();
    this.selectError = null;
    this.bindMethods();
    this.setOptions(options);
  }
  bindMethods() {
    this.remove = this.remove.bind(this);
    this.refetch = this.refetch.bind(this);
  }
  onSubscribe() {
    if (this.listeners.size === 1) {
      this.currentQuery.addObserver(this);
      if (shouldFetchOnMount(this.currentQuery, this.options)) {
        this.executeFetch();
      }
      this.updateTimers();
    }
  }
  onUnsubscribe() {
    if (!this.hasListeners()) {
      this.destroy();
    }
  }
  shouldFetchOnReconnect() {
    return shouldFetchOn(this.currentQuery, this.options, this.options.refetchOnReconnect);
  }
  shouldFetchOnWindowFocus() {
    return shouldFetchOn(this.currentQuery, this.options, this.options.refetchOnWindowFocus);
  }
  destroy() {
    this.listeners = /* @__PURE__ */ new Set();
    this.clearStaleTimeout();
    this.clearRefetchInterval();
    this.currentQuery.removeObserver(this);
  }
  setOptions(options, notifyOptions) {
    const prevOptions = this.options;
    const prevQuery = this.currentQuery;
    this.options = this.client.defaultQueryOptions(options);
    if (process.env.NODE_ENV !== "production" && typeof (options == null ? void 0 : options.isDataEqual) !== "undefined") {
      this.client.getLogger().error("The isDataEqual option has been deprecated and will be removed in the next major version. You can achieve the same functionality by passing a function as the structuralSharing option");
    }
    if (!shallowEqualObjects(prevOptions, this.options)) {
      this.client.getQueryCache().notify({
        type: "observerOptionsUpdated",
        query: this.currentQuery,
        observer: this
      });
    }
    if (typeof this.options.enabled !== "undefined" && typeof this.options.enabled !== "boolean") {
      throw new Error("Expected enabled to be a boolean");
    }
    if (!this.options.queryKey) {
      this.options.queryKey = prevOptions.queryKey;
    }
    this.updateQuery();
    const mounted = this.hasListeners();
    if (mounted && shouldFetchOptionally(this.currentQuery, prevQuery, this.options, prevOptions)) {
      this.executeFetch();
    }
    this.updateResult(notifyOptions);
    if (mounted && (this.currentQuery !== prevQuery || this.options.enabled !== prevOptions.enabled || this.options.staleTime !== prevOptions.staleTime)) {
      this.updateStaleTimeout();
    }
    const nextRefetchInterval = this.computeRefetchInterval();
    if (mounted && (this.currentQuery !== prevQuery || this.options.enabled !== prevOptions.enabled || nextRefetchInterval !== this.currentRefetchInterval)) {
      this.updateRefetchInterval(nextRefetchInterval);
    }
  }
  getOptimisticResult(options) {
    const query = this.client.getQueryCache().build(this.client, options);
    const result = this.createResult(query, options);
    if (shouldAssignObserverCurrentProperties(this, result, options)) {
      this.currentResult = result;
      this.currentResultOptions = this.options;
      this.currentResultState = this.currentQuery.state;
    }
    return result;
  }
  getCurrentResult() {
    return this.currentResult;
  }
  trackResult(result) {
    const trackedResult = {};
    Object.keys(result).forEach((key) => {
      Object.defineProperty(trackedResult, key, {
        configurable: false,
        enumerable: true,
        get: () => {
          this.trackedProps.add(key);
          return result[key];
        }
      });
    });
    return trackedResult;
  }
  getCurrentQuery() {
    return this.currentQuery;
  }
  remove() {
    this.client.getQueryCache().remove(this.currentQuery);
  }
  refetch({
    refetchPage,
    ...options
  } = {}) {
    return this.fetch({
      ...options,
      meta: {
        refetchPage
      }
    });
  }
  fetchOptimistic(options) {
    const defaultedOptions = this.client.defaultQueryOptions(options);
    const query = this.client.getQueryCache().build(this.client, defaultedOptions);
    query.isFetchingOptimistic = true;
    return query.fetch().then(() => this.createResult(query, defaultedOptions));
  }
  fetch(fetchOptions) {
    var _fetchOptions$cancelR;
    return this.executeFetch({
      ...fetchOptions,
      cancelRefetch: (_fetchOptions$cancelR = fetchOptions.cancelRefetch) != null ? _fetchOptions$cancelR : true
    }).then(() => {
      this.updateResult();
      return this.currentResult;
    });
  }
  executeFetch(fetchOptions) {
    this.updateQuery();
    let promise = this.currentQuery.fetch(this.options, fetchOptions);
    if (!(fetchOptions != null && fetchOptions.throwOnError)) {
      promise = promise.catch(noop2);
    }
    return promise;
  }
  updateStaleTimeout() {
    this.clearStaleTimeout();
    if (isServer || this.currentResult.isStale || !isValidTimeout(this.options.staleTime)) {
      return;
    }
    const time = timeUntilStale(this.currentResult.dataUpdatedAt, this.options.staleTime);
    const timeout = time + 1;
    this.staleTimeoutId = setTimeout(() => {
      if (!this.currentResult.isStale) {
        this.updateResult();
      }
    }, timeout);
  }
  computeRefetchInterval() {
    var _this$options$refetch;
    return typeof this.options.refetchInterval === "function" ? this.options.refetchInterval(this.currentResult.data, this.currentQuery) : (_this$options$refetch = this.options.refetchInterval) != null ? _this$options$refetch : false;
  }
  updateRefetchInterval(nextInterval) {
    this.clearRefetchInterval();
    this.currentRefetchInterval = nextInterval;
    if (isServer || this.options.enabled === false || !isValidTimeout(this.currentRefetchInterval) || this.currentRefetchInterval === 0) {
      return;
    }
    this.refetchIntervalId = setInterval(() => {
      if (this.options.refetchIntervalInBackground || focusManager.isFocused()) {
        this.executeFetch();
      }
    }, this.currentRefetchInterval);
  }
  updateTimers() {
    this.updateStaleTimeout();
    this.updateRefetchInterval(this.computeRefetchInterval());
  }
  clearStaleTimeout() {
    if (this.staleTimeoutId) {
      clearTimeout(this.staleTimeoutId);
      this.staleTimeoutId = void 0;
    }
  }
  clearRefetchInterval() {
    if (this.refetchIntervalId) {
      clearInterval(this.refetchIntervalId);
      this.refetchIntervalId = void 0;
    }
  }
  createResult(query, options) {
    const prevQuery = this.currentQuery;
    const prevOptions = this.options;
    const prevResult = this.currentResult;
    const prevResultState = this.currentResultState;
    const prevResultOptions = this.currentResultOptions;
    const queryChange = query !== prevQuery;
    const queryInitialState = queryChange ? query.state : this.currentQueryInitialState;
    const prevQueryResult = queryChange ? this.currentResult : this.previousQueryResult;
    const {
      state
    } = query;
    let {
      dataUpdatedAt,
      error,
      errorUpdatedAt,
      fetchStatus,
      status
    } = state;
    let isPreviousData = false;
    let isPlaceholderData = false;
    let data;
    if (options._optimisticResults) {
      const mounted = this.hasListeners();
      const fetchOnMount = !mounted && shouldFetchOnMount(query, options);
      const fetchOptionally = mounted && shouldFetchOptionally(query, prevQuery, options, prevOptions);
      if (fetchOnMount || fetchOptionally) {
        fetchStatus = canFetch(query.options.networkMode) ? "fetching" : "paused";
        if (!dataUpdatedAt) {
          status = "loading";
        }
      }
      if (options._optimisticResults === "isRestoring") {
        fetchStatus = "idle";
      }
    }
    if (options.keepPreviousData && !state.dataUpdatedAt && prevQueryResult != null && prevQueryResult.isSuccess && status !== "error") {
      data = prevQueryResult.data;
      dataUpdatedAt = prevQueryResult.dataUpdatedAt;
      status = prevQueryResult.status;
      isPreviousData = true;
    } else if (options.select && typeof state.data !== "undefined") {
      if (prevResult && state.data === (prevResultState == null ? void 0 : prevResultState.data) && options.select === this.selectFn) {
        data = this.selectResult;
      } else {
        try {
          this.selectFn = options.select;
          data = options.select(state.data);
          data = replaceData(prevResult == null ? void 0 : prevResult.data, data, options);
          this.selectResult = data;
          this.selectError = null;
        } catch (selectError) {
          if (process.env.NODE_ENV !== "production") {
            this.client.getLogger().error(selectError);
          }
          this.selectError = selectError;
        }
      }
    } else {
      data = state.data;
    }
    if (typeof options.placeholderData !== "undefined" && typeof data === "undefined" && status === "loading") {
      let placeholderData;
      if (prevResult != null && prevResult.isPlaceholderData && options.placeholderData === (prevResultOptions == null ? void 0 : prevResultOptions.placeholderData)) {
        placeholderData = prevResult.data;
      } else {
        placeholderData = typeof options.placeholderData === "function" ? options.placeholderData() : options.placeholderData;
        if (options.select && typeof placeholderData !== "undefined") {
          try {
            placeholderData = options.select(placeholderData);
            this.selectError = null;
          } catch (selectError) {
            if (process.env.NODE_ENV !== "production") {
              this.client.getLogger().error(selectError);
            }
            this.selectError = selectError;
          }
        }
      }
      if (typeof placeholderData !== "undefined") {
        status = "success";
        data = replaceData(prevResult == null ? void 0 : prevResult.data, placeholderData, options);
        isPlaceholderData = true;
      }
    }
    if (this.selectError) {
      error = this.selectError;
      data = this.selectResult;
      errorUpdatedAt = Date.now();
      status = "error";
    }
    const isFetching = fetchStatus === "fetching";
    const isLoading = status === "loading";
    const isError2 = status === "error";
    const result = {
      status,
      fetchStatus,
      isLoading,
      isSuccess: status === "success",
      isError: isError2,
      isInitialLoading: isLoading && isFetching,
      data,
      dataUpdatedAt,
      error,
      errorUpdatedAt,
      failureCount: state.fetchFailureCount,
      failureReason: state.fetchFailureReason,
      errorUpdateCount: state.errorUpdateCount,
      isFetched: state.dataUpdateCount > 0 || state.errorUpdateCount > 0,
      isFetchedAfterMount: state.dataUpdateCount > queryInitialState.dataUpdateCount || state.errorUpdateCount > queryInitialState.errorUpdateCount,
      isFetching,
      isRefetching: isFetching && !isLoading,
      isLoadingError: isError2 && state.dataUpdatedAt === 0,
      isPaused: fetchStatus === "paused",
      isPlaceholderData,
      isPreviousData,
      isRefetchError: isError2 && state.dataUpdatedAt !== 0,
      isStale: isStale(query, options),
      refetch: this.refetch,
      remove: this.remove
    };
    return result;
  }
  updateResult(notifyOptions) {
    const prevResult = this.currentResult;
    const nextResult = this.createResult(this.currentQuery, this.options);
    this.currentResultState = this.currentQuery.state;
    this.currentResultOptions = this.options;
    if (shallowEqualObjects(nextResult, prevResult)) {
      return;
    }
    this.currentResult = nextResult;
    const defaultNotifyOptions = {
      cache: true
    };
    const shouldNotifyListeners = () => {
      if (!prevResult) {
        return true;
      }
      const {
        notifyOnChangeProps
      } = this.options;
      const notifyOnChangePropsValue = typeof notifyOnChangeProps === "function" ? notifyOnChangeProps() : notifyOnChangeProps;
      if (notifyOnChangePropsValue === "all" || !notifyOnChangePropsValue && !this.trackedProps.size) {
        return true;
      }
      const includedProps = new Set(notifyOnChangePropsValue != null ? notifyOnChangePropsValue : this.trackedProps);
      if (this.options.useErrorBoundary) {
        includedProps.add("error");
      }
      return Object.keys(this.currentResult).some((key) => {
        const typedKey = key;
        const changed = this.currentResult[typedKey] !== prevResult[typedKey];
        return changed && includedProps.has(typedKey);
      });
    };
    if ((notifyOptions == null ? void 0 : notifyOptions.listeners) !== false && shouldNotifyListeners()) {
      defaultNotifyOptions.listeners = true;
    }
    this.notify({
      ...defaultNotifyOptions,
      ...notifyOptions
    });
  }
  updateQuery() {
    const query = this.client.getQueryCache().build(this.client, this.options);
    if (query === this.currentQuery) {
      return;
    }
    const prevQuery = this.currentQuery;
    this.currentQuery = query;
    this.currentQueryInitialState = query.state;
    this.previousQueryResult = this.currentResult;
    if (this.hasListeners()) {
      prevQuery == null ? void 0 : prevQuery.removeObserver(this);
      query.addObserver(this);
    }
  }
  onQueryUpdate(action) {
    const notifyOptions = {};
    if (action.type === "success") {
      notifyOptions.onSuccess = !action.manual;
    } else if (action.type === "error" && !isCancelledError(action.error)) {
      notifyOptions.onError = true;
    }
    this.updateResult(notifyOptions);
    if (this.hasListeners()) {
      this.updateTimers();
    }
  }
  notify(notifyOptions) {
    notifyManager.batch(() => {
      if (notifyOptions.onSuccess) {
        var _this$options$onSucce, _this$options, _this$options$onSettl, _this$options2;
        (_this$options$onSucce = (_this$options = this.options).onSuccess) == null ? void 0 : _this$options$onSucce.call(_this$options, this.currentResult.data);
        (_this$options$onSettl = (_this$options2 = this.options).onSettled) == null ? void 0 : _this$options$onSettl.call(_this$options2, this.currentResult.data, null);
      } else if (notifyOptions.onError) {
        var _this$options$onError, _this$options3, _this$options$onSettl2, _this$options4;
        (_this$options$onError = (_this$options3 = this.options).onError) == null ? void 0 : _this$options$onError.call(_this$options3, this.currentResult.error);
        (_this$options$onSettl2 = (_this$options4 = this.options).onSettled) == null ? void 0 : _this$options$onSettl2.call(_this$options4, void 0, this.currentResult.error);
      }
      if (notifyOptions.listeners) {
        this.listeners.forEach(({
          listener
        }) => {
          listener(this.currentResult);
        });
      }
      if (notifyOptions.cache) {
        this.client.getQueryCache().notify({
          query: this.currentQuery,
          type: "observerResultsUpdated"
        });
      }
    });
  }
};
function shouldLoadOnMount(query, options) {
  return options.enabled !== false && !query.state.dataUpdatedAt && !(query.state.status === "error" && options.retryOnMount === false);
}
function shouldFetchOnMount(query, options) {
  return shouldLoadOnMount(query, options) || query.state.dataUpdatedAt > 0 && shouldFetchOn(query, options, options.refetchOnMount);
}
function shouldFetchOn(query, options, field) {
  if (options.enabled !== false) {
    const value = typeof field === "function" ? field(query) : field;
    return value === "always" || value !== false && isStale(query, options);
  }
  return false;
}
function shouldFetchOptionally(query, prevQuery, options, prevOptions) {
  return options.enabled !== false && (query !== prevQuery || prevOptions.enabled === false) && (!options.suspense || query.state.status !== "error") && isStale(query, options);
}
function isStale(query, options) {
  return query.isStaleByTime(options.staleTime);
}
function shouldAssignObserverCurrentProperties(observer, optimisticResult, options) {
  if (options.keepPreviousData) {
    return false;
  }
  if (options.placeholderData !== void 0) {
    return optimisticResult.isPlaceholderData;
  }
  if (!shallowEqualObjects(observer.getCurrentResult(), optimisticResult)) {
    return true;
  }
  return false;
}

// node_modules/@tanstack/query-core/build/lib/mutationObserver.mjs
var MutationObserver2 = class extends Subscribable {
  constructor(client, options) {
    super();
    this.client = client;
    this.setOptions(options);
    this.bindMethods();
    this.updateResult();
  }
  bindMethods() {
    this.mutate = this.mutate.bind(this);
    this.reset = this.reset.bind(this);
  }
  setOptions(options) {
    var _this$currentMutation;
    const prevOptions = this.options;
    this.options = this.client.defaultMutationOptions(options);
    if (!shallowEqualObjects(prevOptions, this.options)) {
      this.client.getMutationCache().notify({
        type: "observerOptionsUpdated",
        mutation: this.currentMutation,
        observer: this
      });
    }
    (_this$currentMutation = this.currentMutation) == null ? void 0 : _this$currentMutation.setOptions(this.options);
  }
  onUnsubscribe() {
    if (!this.hasListeners()) {
      var _this$currentMutation2;
      (_this$currentMutation2 = this.currentMutation) == null ? void 0 : _this$currentMutation2.removeObserver(this);
    }
  }
  onMutationUpdate(action) {
    this.updateResult();
    const notifyOptions = {
      listeners: true
    };
    if (action.type === "success") {
      notifyOptions.onSuccess = true;
    } else if (action.type === "error") {
      notifyOptions.onError = true;
    }
    this.notify(notifyOptions);
  }
  getCurrentResult() {
    return this.currentResult;
  }
  reset() {
    this.currentMutation = void 0;
    this.updateResult();
    this.notify({
      listeners: true
    });
  }
  mutate(variables, options) {
    this.mutateOptions = options;
    if (this.currentMutation) {
      this.currentMutation.removeObserver(this);
    }
    this.currentMutation = this.client.getMutationCache().build(this.client, {
      ...this.options,
      variables: typeof variables !== "undefined" ? variables : this.options.variables
    });
    this.currentMutation.addObserver(this);
    return this.currentMutation.execute();
  }
  updateResult() {
    const state = this.currentMutation ? this.currentMutation.state : getDefaultState2();
    const result = {
      ...state,
      isLoading: state.status === "loading",
      isSuccess: state.status === "success",
      isError: state.status === "error",
      isIdle: state.status === "idle",
      mutate: this.mutate,
      reset: this.reset
    };
    this.currentResult = result;
  }
  notify(options) {
    notifyManager.batch(() => {
      if (this.mutateOptions && this.hasListeners()) {
        if (options.onSuccess) {
          var _this$mutateOptions$o, _this$mutateOptions, _this$mutateOptions$o2, _this$mutateOptions2;
          (_this$mutateOptions$o = (_this$mutateOptions = this.mutateOptions).onSuccess) == null ? void 0 : _this$mutateOptions$o.call(_this$mutateOptions, this.currentResult.data, this.currentResult.variables, this.currentResult.context);
          (_this$mutateOptions$o2 = (_this$mutateOptions2 = this.mutateOptions).onSettled) == null ? void 0 : _this$mutateOptions$o2.call(_this$mutateOptions2, this.currentResult.data, null, this.currentResult.variables, this.currentResult.context);
        } else if (options.onError) {
          var _this$mutateOptions$o3, _this$mutateOptions3, _this$mutateOptions$o4, _this$mutateOptions4;
          (_this$mutateOptions$o3 = (_this$mutateOptions3 = this.mutateOptions).onError) == null ? void 0 : _this$mutateOptions$o3.call(_this$mutateOptions3, this.currentResult.error, this.currentResult.variables, this.currentResult.context);
          (_this$mutateOptions$o4 = (_this$mutateOptions4 = this.mutateOptions).onSettled) == null ? void 0 : _this$mutateOptions$o4.call(_this$mutateOptions4, void 0, this.currentResult.error, this.currentResult.variables, this.currentResult.context);
        }
      }
      if (options.listeners) {
        this.listeners.forEach(({
          listener
        }) => {
          listener(this.currentResult);
        });
      }
    });
  }
};

// node_modules/@tanstack/query-core/build/lib/hydration.mjs
function hydrate(client, dehydratedState, options) {
  if (typeof dehydratedState !== "object" || dehydratedState === null) {
    return;
  }
  const mutationCache = client.getMutationCache();
  const queryCache = client.getQueryCache();
  const mutations = dehydratedState.mutations || [];
  const queries = dehydratedState.queries || [];
  mutations.forEach((dehydratedMutation) => {
    var _options$defaultOptio;
    mutationCache.build(client, {
      ...options == null ? void 0 : (_options$defaultOptio = options.defaultOptions) == null ? void 0 : _options$defaultOptio.mutations,
      mutationKey: dehydratedMutation.mutationKey
    }, dehydratedMutation.state);
  });
  queries.forEach(({
    queryKey,
    state,
    queryHash
  }) => {
    var _options$defaultOptio2;
    const query = queryCache.get(queryHash);
    if (query) {
      if (query.state.dataUpdatedAt < state.dataUpdatedAt) {
        const {
          fetchStatus: _ignored,
          ...dehydratedQueryState
        } = state;
        query.setState(dehydratedQueryState);
      }
      return;
    }
    queryCache.build(
      client,
      {
        ...options == null ? void 0 : (_options$defaultOptio2 = options.defaultOptions) == null ? void 0 : _options$defaultOptio2.queries,
        queryKey,
        queryHash
      },
      // Reset fetch status to idle to avoid
      // query being stuck in fetching state upon hydration
      {
        ...state,
        fetchStatus: "idle"
      }
    );
  });
}

// node_modules/svelte/src/runtime/ssr.js
function onMount2() {
}

// node_modules/@tanstack/svelte-query/build/lib/context.js
var _contextKey = "$$_queryClient";
var getQueryClientContext = () => {
  const client = getContext(_contextKey);
  if (!client) {
    throw new Error("No QueryClient was found in Svelte context. Did you forget to wrap your component with QueryClientProvider?");
  }
  return client;
};
var setQueryClientContext = (client) => {
  setContext(_contextKey, client);
};

// node_modules/svelte/src/runtime/store/index.js
var subscriber_queue = [];
function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
function writable(value, start = noop) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set2(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set2(fn(value));
  }
  function subscribe2(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set2, update) || noop;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0 && stop) {
        stop();
        stop = null;
      }
    };
  }
  return { set: set2, update, subscribe: subscribe2 };
}
function derived(stores, fn, initial_value) {
  const single = !Array.isArray(stores);
  const stores_array = single ? [stores] : stores;
  if (!stores_array.every(Boolean)) {
    throw new Error("derived() expects stores as input, got a falsy value");
  }
  const auto = fn.length < 2;
  return readable(initial_value, (set2, update) => {
    let started = false;
    const values = [];
    let pending = 0;
    let cleanup = noop;
    const sync = () => {
      if (pending) {
        return;
      }
      cleanup();
      const result = fn(single ? values[0] : values, set2, update);
      if (auto) {
        set2(result);
      } else {
        cleanup = is_function(result) ? result : noop;
      }
    };
    const unsubscribers = stores_array.map(
      (store, i) => subscribe(
        store,
        (value) => {
          values[i] = value;
          pending &= ~(1 << i);
          if (started) {
            sync();
          }
        },
        () => {
          pending |= 1 << i;
        }
      )
    );
    started = true;
    sync();
    return function stop() {
      run_all(unsubscribers);
      cleanup();
      started = false;
    };
  });
}

// node_modules/@tanstack/svelte-query/build/lib/useQueryClient.js
function useQueryClient() {
  const queryClient = getQueryClientContext();
  return queryClient;
}

// node_modules/@tanstack/svelte-query/build/lib/createBaseQuery.js
function createBaseQuery(options, Observer) {
  const queryClient = useQueryClient();
  const defaultedOptions = queryClient.defaultQueryOptions(options);
  defaultedOptions._optimisticResults = "optimistic";
  let observer = new Observer(queryClient, defaultedOptions);
  if (defaultedOptions.onError) {
    defaultedOptions.onError = notifyManager.batchCalls(defaultedOptions.onError);
  }
  if (defaultedOptions.onSuccess) {
    defaultedOptions.onSuccess = notifyManager.batchCalls(defaultedOptions.onSuccess);
  }
  if (defaultedOptions.onSettled) {
    defaultedOptions.onSettled = notifyManager.batchCalls(defaultedOptions.onSettled);
  }
  readable(observer).subscribe(($observer) => {
    observer = $observer;
    observer.setOptions(defaultedOptions, { listeners: false });
  });
  const result = readable(observer.getCurrentResult(), (set2) => {
    return observer.subscribe(notifyManager.batchCalls(set2));
  });
  const { subscribe: subscribe2 } = derived(result, ($result) => {
    $result = observer.getOptimisticResult(defaultedOptions);
    return !defaultedOptions.notifyOnChangeProps ? observer.trackResult($result) : $result;
  });
  return { subscribe: subscribe2 };
}

// node_modules/@tanstack/svelte-query/build/lib/createQuery.js
function createQuery(arg1, arg2, arg3) {
  const parsedOptions = parseQueryArgs(arg1, arg2, arg3);
  const result = createBaseQuery(parsedOptions, QueryObserver);
  return result;
}

// node_modules/@tanstack/svelte-query/build/lib/createMutation.js
function createMutation(arg1, arg2, arg3) {
  const options = parseMutationArgs(arg1, arg2, arg3);
  const queryClient = useQueryClient();
  let observer = new MutationObserver2(queryClient, options);
  let mutate;
  readable(observer).subscribe(($observer) => {
    observer = $observer;
    mutate = (variables, mutateOptions) => {
      observer.mutate(variables, mutateOptions).catch(noop3);
    };
    observer.setOptions(options);
  });
  const result = readable(observer.getCurrentResult(), (set2) => {
    return observer.subscribe(notifyManager.batchCalls((val) => set2(val)));
  });
  const { subscribe: subscribe2 } = derived(result, ($result) => ({
    ...$result,
    mutate,
    mutateAsync: $result.mutate
  }));
  return { subscribe: subscribe2 };
}
function noop3() {
}

// node_modules/@tanstack/svelte-query/build/lib/useHydrate.js
function useHydrate(state, options) {
  const client = useQueryClient();
  if (state) {
    hydrate(client, state, options);
  }
}

// node_modules/@tanstack/svelte-query/build/lib/Hydrate.svelte
var Hydrate = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { state } = $$props;
  let { options = void 0 } = $$props;
  useHydrate(state, options);
  if ($$props.state === void 0 && $$bindings.state && state !== void 0)
    $$bindings.state(state);
  if ($$props.options === void 0 && $$bindings.options && options !== void 0)
    $$bindings.options(options);
  return `${slots.default ? slots.default({}) : ``}`;
});

// node_modules/@tanstack/svelte-query/build/lib/QueryClientProvider.svelte
var QueryClientProvider = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { client = new QueryClient() } = $$props;
  onMount2(() => {
    client.mount();
  });
  setQueryClientContext(client);
  onDestroy(() => {
    client.unmount();
  });
  if ($$props.client === void 0 && $$bindings.client && client !== void 0)
    $$bindings.client(client);
  return `${slots.default ? slots.default({}) : ``}`;
});
var QueryClientProvider_default = QueryClientProvider;

// svelte/technique_form/Form.svelte
var Form_exports = {};
__export(Form_exports, {
  default: () => Form_default
});

// node_modules/immer/dist/immer.mjs
var NOTHING = Symbol.for("immer-nothing");
var DRAFTABLE = Symbol.for("immer-draftable");
var DRAFT_STATE = Symbol.for("immer-state");
var errors = process.env.NODE_ENV !== "production" ? [
  // All error codes, starting by 0:
  function(plugin) {
    return `The plugin for '${plugin}' has not been loaded into Immer. To enable the plugin, import and call \`enable${plugin}()\` when initializing your application.`;
  },
  function(thing) {
    return `produce can only be called on things that are draftable: plain objects, arrays, Map, Set or classes that are marked with '[immerable]: true'. Got '${thing}'`;
  },
  "This object has been frozen and should not be mutated",
  function(data) {
    return "Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? " + data;
  },
  "An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.",
  "Immer forbids circular references",
  "The first or second argument to `produce` must be a function",
  "The third argument to `produce` must be a function or undefined",
  "First argument to `createDraft` must be a plain object, an array, or an immerable object",
  "First argument to `finishDraft` must be a draft returned by `createDraft`",
  function(thing) {
    return `'current' expects a draft, got: ${thing}`;
  },
  "Object.defineProperty() cannot be used on an Immer draft",
  "Object.setPrototypeOf() cannot be used on an Immer draft",
  "Immer only supports deleting array indices",
  "Immer only supports setting array indices and the 'length' property",
  function(thing) {
    return `'original' expects a draft, got: ${thing}`;
  }
  // Note: if more errors are added, the errorOffset in Patches.ts should be increased
  // See Patches.ts for additional errors
] : [];
function die(error, ...args) {
  if (process.env.NODE_ENV !== "production") {
    const e = errors[error];
    const msg = typeof e === "function" ? e.apply(null, args) : e;
    throw new Error(`[Immer] ${msg}`);
  }
  throw new Error(
    `[Immer] minified error nr: ${error}. Full error at: https://bit.ly/3cXEKWf`
  );
}
var getPrototypeOf = Object.getPrototypeOf;
function isDraft(value) {
  return !!value && !!value[DRAFT_STATE];
}
function isDraftable(value) {
  if (!value)
    return false;
  return isPlainObject2(value) || Array.isArray(value) || !!value[DRAFTABLE] || !!value.constructor?.[DRAFTABLE] || isMap(value) || isSet(value);
}
var objectCtorString = Object.prototype.constructor.toString();
function isPlainObject2(value) {
  if (!value || typeof value !== "object")
    return false;
  const proto = getPrototypeOf(value);
  if (proto === null) {
    return true;
  }
  const Ctor = Object.hasOwnProperty.call(proto, "constructor") && proto.constructor;
  if (Ctor === Object)
    return true;
  return typeof Ctor == "function" && Function.toString.call(Ctor) === objectCtorString;
}
function each2(obj, iter) {
  if (getArchtype(obj) === 0) {
    Reflect.ownKeys(obj).forEach((key) => {
      iter(key, obj[key], obj);
    });
  } else {
    obj.forEach((entry, index) => iter(index, entry, obj));
  }
}
function getArchtype(thing) {
  const state = thing[DRAFT_STATE];
  return state ? state.type_ : Array.isArray(thing) ? 1 : isMap(thing) ? 2 : isSet(thing) ? 3 : 0;
}
function has(thing, prop) {
  return getArchtype(thing) === 2 ? thing.has(prop) : Object.prototype.hasOwnProperty.call(thing, prop);
}
function set(thing, propOrOldValue, value) {
  const t = getArchtype(thing);
  if (t === 2)
    thing.set(propOrOldValue, value);
  else if (t === 3) {
    thing.add(value);
  } else
    thing[propOrOldValue] = value;
}
function is(x, y) {
  if (x === y) {
    return x !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}
function isMap(target) {
  return target instanceof Map;
}
function isSet(target) {
  return target instanceof Set;
}
function latest(state) {
  return state.copy_ || state.base_;
}
function shallowCopy(base, strict) {
  if (isMap(base)) {
    return new Map(base);
  }
  if (isSet(base)) {
    return new Set(base);
  }
  if (Array.isArray(base))
    return Array.prototype.slice.call(base);
  const isPlain = isPlainObject2(base);
  if (strict === true || strict === "class_only" && !isPlain) {
    const descriptors = Object.getOwnPropertyDescriptors(base);
    delete descriptors[DRAFT_STATE];
    let keys = Reflect.ownKeys(descriptors);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const desc = descriptors[key];
      if (desc.writable === false) {
        desc.writable = true;
        desc.configurable = true;
      }
      if (desc.get || desc.set)
        descriptors[key] = {
          configurable: true,
          writable: true,
          // could live with !!desc.set as well here...
          enumerable: desc.enumerable,
          value: base[key]
        };
    }
    return Object.create(getPrototypeOf(base), descriptors);
  } else {
    const proto = getPrototypeOf(base);
    if (proto !== null && isPlain) {
      return { ...base };
    }
    const obj = Object.create(proto);
    return Object.assign(obj, base);
  }
}
function freeze(obj, deep = false) {
  if (isFrozen(obj) || isDraft(obj) || !isDraftable(obj))
    return obj;
  if (getArchtype(obj) > 1) {
    obj.set = obj.add = obj.clear = obj.delete = dontMutateFrozenCollections;
  }
  Object.freeze(obj);
  if (deep)
    Object.entries(obj).forEach(([key, value]) => freeze(value, true));
  return obj;
}
function dontMutateFrozenCollections() {
  die(2);
}
function isFrozen(obj) {
  return Object.isFrozen(obj);
}
var plugins = {};
function getPlugin(pluginKey) {
  const plugin = plugins[pluginKey];
  if (!plugin) {
    die(0, pluginKey);
  }
  return plugin;
}
var currentScope;
function getCurrentScope() {
  return currentScope;
}
function createScope(parent_, immer_) {
  return {
    drafts_: [],
    parent_,
    immer_,
    // Whenever the modified draft contains a draft from another scope, we
    // need to prevent auto-freezing so the unowned draft can be finalized.
    canAutoFreeze_: true,
    unfinalizedDrafts_: 0
  };
}
function usePatchesInScope(scope, patchListener) {
  if (patchListener) {
    getPlugin("Patches");
    scope.patches_ = [];
    scope.inversePatches_ = [];
    scope.patchListener_ = patchListener;
  }
}
function revokeScope(scope) {
  leaveScope(scope);
  scope.drafts_.forEach(revokeDraft);
  scope.drafts_ = null;
}
function leaveScope(scope) {
  if (scope === currentScope) {
    currentScope = scope.parent_;
  }
}
function enterScope(immer2) {
  return currentScope = createScope(currentScope, immer2);
}
function revokeDraft(draft) {
  const state = draft[DRAFT_STATE];
  if (state.type_ === 0 || state.type_ === 1)
    state.revoke_();
  else
    state.revoked_ = true;
}
function processResult(result, scope) {
  scope.unfinalizedDrafts_ = scope.drafts_.length;
  const baseDraft = scope.drafts_[0];
  const isReplaced = result !== void 0 && result !== baseDraft;
  if (isReplaced) {
    if (baseDraft[DRAFT_STATE].modified_) {
      revokeScope(scope);
      die(4);
    }
    if (isDraftable(result)) {
      result = finalize(scope, result);
      if (!scope.parent_)
        maybeFreeze(scope, result);
    }
    if (scope.patches_) {
      getPlugin("Patches").generateReplacementPatches_(
        baseDraft[DRAFT_STATE].base_,
        result,
        scope.patches_,
        scope.inversePatches_
      );
    }
  } else {
    result = finalize(scope, baseDraft, []);
  }
  revokeScope(scope);
  if (scope.patches_) {
    scope.patchListener_(scope.patches_, scope.inversePatches_);
  }
  return result !== NOTHING ? result : void 0;
}
function finalize(rootScope, value, path) {
  if (isFrozen(value))
    return value;
  const state = value[DRAFT_STATE];
  if (!state) {
    each2(
      value,
      (key, childValue) => finalizeProperty(rootScope, state, value, key, childValue, path)
    );
    return value;
  }
  if (state.scope_ !== rootScope)
    return value;
  if (!state.modified_) {
    maybeFreeze(rootScope, state.base_, true);
    return state.base_;
  }
  if (!state.finalized_) {
    state.finalized_ = true;
    state.scope_.unfinalizedDrafts_--;
    const result = state.copy_;
    let resultEach = result;
    let isSet2 = false;
    if (state.type_ === 3) {
      resultEach = new Set(result);
      result.clear();
      isSet2 = true;
    }
    each2(
      resultEach,
      (key, childValue) => finalizeProperty(rootScope, state, result, key, childValue, path, isSet2)
    );
    maybeFreeze(rootScope, result, false);
    if (path && rootScope.patches_) {
      getPlugin("Patches").generatePatches_(
        state,
        path,
        rootScope.patches_,
        rootScope.inversePatches_
      );
    }
  }
  return state.copy_;
}
function finalizeProperty(rootScope, parentState, targetObject, prop, childValue, rootPath, targetIsSet) {
  if (process.env.NODE_ENV !== "production" && childValue === targetObject)
    die(5);
  if (isDraft(childValue)) {
    const path = rootPath && parentState && parentState.type_ !== 3 && // Set objects are atomic since they have no keys.
    !has(parentState.assigned_, prop) ? rootPath.concat(prop) : void 0;
    const res = finalize(rootScope, childValue, path);
    set(targetObject, prop, res);
    if (isDraft(res)) {
      rootScope.canAutoFreeze_ = false;
    } else
      return;
  } else if (targetIsSet) {
    targetObject.add(childValue);
  }
  if (isDraftable(childValue) && !isFrozen(childValue)) {
    if (!rootScope.immer_.autoFreeze_ && rootScope.unfinalizedDrafts_ < 1) {
      return;
    }
    finalize(rootScope, childValue);
    if ((!parentState || !parentState.scope_.parent_) && typeof prop !== "symbol" && Object.prototype.propertyIsEnumerable.call(targetObject, prop))
      maybeFreeze(rootScope, childValue);
  }
}
function maybeFreeze(scope, value, deep = false) {
  if (!scope.parent_ && scope.immer_.autoFreeze_ && scope.canAutoFreeze_) {
    freeze(value, deep);
  }
}
function createProxyProxy(base, parent) {
  const isArray = Array.isArray(base);
  const state = {
    type_: isArray ? 1 : 0,
    // Track which produce call this is associated with.
    scope_: parent ? parent.scope_ : getCurrentScope(),
    // True for both shallow and deep changes.
    modified_: false,
    // Used during finalization.
    finalized_: false,
    // Track which properties have been assigned (true) or deleted (false).
    assigned_: {},
    // The parent draft state.
    parent_: parent,
    // The base state.
    base_: base,
    // The base proxy.
    draft_: null,
    // set below
    // The base copy with any updated values.
    copy_: null,
    // Called by the `produce` function.
    revoke_: null,
    isManual_: false
  };
  let target = state;
  let traps = objectTraps;
  if (isArray) {
    target = [state];
    traps = arrayTraps;
  }
  const { revoke, proxy } = Proxy.revocable(target, traps);
  state.draft_ = proxy;
  state.revoke_ = revoke;
  return proxy;
}
var objectTraps = {
  get(state, prop) {
    if (prop === DRAFT_STATE)
      return state;
    const source = latest(state);
    if (!has(source, prop)) {
      return readPropFromProto(state, source, prop);
    }
    const value = source[prop];
    if (state.finalized_ || !isDraftable(value)) {
      return value;
    }
    if (value === peek(state.base_, prop)) {
      prepareCopy(state);
      return state.copy_[prop] = createProxy(value, state);
    }
    return value;
  },
  has(state, prop) {
    return prop in latest(state);
  },
  ownKeys(state) {
    return Reflect.ownKeys(latest(state));
  },
  set(state, prop, value) {
    const desc = getDescriptorFromProto(latest(state), prop);
    if (desc?.set) {
      desc.set.call(state.draft_, value);
      return true;
    }
    if (!state.modified_) {
      const current2 = peek(latest(state), prop);
      const currentState = current2?.[DRAFT_STATE];
      if (currentState && currentState.base_ === value) {
        state.copy_[prop] = value;
        state.assigned_[prop] = false;
        return true;
      }
      if (is(value, current2) && (value !== void 0 || has(state.base_, prop)))
        return true;
      prepareCopy(state);
      markChanged(state);
    }
    if (state.copy_[prop] === value && // special case: handle new props with value 'undefined'
    (value !== void 0 || prop in state.copy_) || // special case: NaN
    Number.isNaN(value) && Number.isNaN(state.copy_[prop]))
      return true;
    state.copy_[prop] = value;
    state.assigned_[prop] = true;
    return true;
  },
  deleteProperty(state, prop) {
    if (peek(state.base_, prop) !== void 0 || prop in state.base_) {
      state.assigned_[prop] = false;
      prepareCopy(state);
      markChanged(state);
    } else {
      delete state.assigned_[prop];
    }
    if (state.copy_) {
      delete state.copy_[prop];
    }
    return true;
  },
  // Note: We never coerce `desc.value` into an Immer draft, because we can't make
  // the same guarantee in ES5 mode.
  getOwnPropertyDescriptor(state, prop) {
    const owner = latest(state);
    const desc = Reflect.getOwnPropertyDescriptor(owner, prop);
    if (!desc)
      return desc;
    return {
      writable: true,
      configurable: state.type_ !== 1 || prop !== "length",
      enumerable: desc.enumerable,
      value: owner[prop]
    };
  },
  defineProperty() {
    die(11);
  },
  getPrototypeOf(state) {
    return getPrototypeOf(state.base_);
  },
  setPrototypeOf() {
    die(12);
  }
};
var arrayTraps = {};
each2(objectTraps, (key, fn) => {
  arrayTraps[key] = function() {
    arguments[0] = arguments[0][0];
    return fn.apply(this, arguments);
  };
});
arrayTraps.deleteProperty = function(state, prop) {
  if (process.env.NODE_ENV !== "production" && isNaN(parseInt(prop)))
    die(13);
  return arrayTraps.set.call(this, state, prop, void 0);
};
arrayTraps.set = function(state, prop, value) {
  if (process.env.NODE_ENV !== "production" && prop !== "length" && isNaN(parseInt(prop)))
    die(14);
  return objectTraps.set.call(this, state[0], prop, value, state[0]);
};
function peek(draft, prop) {
  const state = draft[DRAFT_STATE];
  const source = state ? latest(state) : draft;
  return source[prop];
}
function readPropFromProto(state, source, prop) {
  const desc = getDescriptorFromProto(source, prop);
  return desc ? `value` in desc ? desc.value : (
    // This is a very special case, if the prop is a getter defined by the
    // prototype, we should invoke it with the draft as context!
    desc.get?.call(state.draft_)
  ) : void 0;
}
function getDescriptorFromProto(source, prop) {
  if (!(prop in source))
    return void 0;
  let proto = getPrototypeOf(source);
  while (proto) {
    const desc = Object.getOwnPropertyDescriptor(proto, prop);
    if (desc)
      return desc;
    proto = getPrototypeOf(proto);
  }
  return void 0;
}
function markChanged(state) {
  if (!state.modified_) {
    state.modified_ = true;
    if (state.parent_) {
      markChanged(state.parent_);
    }
  }
}
function prepareCopy(state) {
  if (!state.copy_) {
    state.copy_ = shallowCopy(
      state.base_,
      state.scope_.immer_.useStrictShallowCopy_
    );
  }
}
var Immer2 = class {
  constructor(config) {
    this.autoFreeze_ = true;
    this.useStrictShallowCopy_ = false;
    this.produce = (base, recipe, patchListener) => {
      if (typeof base === "function" && typeof recipe !== "function") {
        const defaultBase = recipe;
        recipe = base;
        const self = this;
        return function curriedProduce(base2 = defaultBase, ...args) {
          return self.produce(base2, (draft) => recipe.call(this, draft, ...args));
        };
      }
      if (typeof recipe !== "function")
        die(6);
      if (patchListener !== void 0 && typeof patchListener !== "function")
        die(7);
      let result;
      if (isDraftable(base)) {
        const scope = enterScope(this);
        const proxy = createProxy(base, void 0);
        let hasError = true;
        try {
          result = recipe(proxy);
          hasError = false;
        } finally {
          if (hasError)
            revokeScope(scope);
          else
            leaveScope(scope);
        }
        usePatchesInScope(scope, patchListener);
        return processResult(result, scope);
      } else if (!base || typeof base !== "object") {
        result = recipe(base);
        if (result === void 0)
          result = base;
        if (result === NOTHING)
          result = void 0;
        if (this.autoFreeze_)
          freeze(result, true);
        if (patchListener) {
          const p = [];
          const ip = [];
          getPlugin("Patches").generateReplacementPatches_(base, result, p, ip);
          patchListener(p, ip);
        }
        return result;
      } else
        die(1, base);
    };
    this.produceWithPatches = (base, recipe) => {
      if (typeof base === "function") {
        return (state, ...args) => this.produceWithPatches(state, (draft) => base(draft, ...args));
      }
      let patches, inversePatches;
      const result = this.produce(base, recipe, (p, ip) => {
        patches = p;
        inversePatches = ip;
      });
      return [result, patches, inversePatches];
    };
    if (typeof config?.autoFreeze === "boolean")
      this.setAutoFreeze(config.autoFreeze);
    if (typeof config?.useStrictShallowCopy === "boolean")
      this.setUseStrictShallowCopy(config.useStrictShallowCopy);
  }
  createDraft(base) {
    if (!isDraftable(base))
      die(8);
    if (isDraft(base))
      base = current(base);
    const scope = enterScope(this);
    const proxy = createProxy(base, void 0);
    proxy[DRAFT_STATE].isManual_ = true;
    leaveScope(scope);
    return proxy;
  }
  finishDraft(draft, patchListener) {
    const state = draft && draft[DRAFT_STATE];
    if (!state || !state.isManual_)
      die(9);
    const { scope_: scope } = state;
    usePatchesInScope(scope, patchListener);
    return processResult(void 0, scope);
  }
  /**
   * Pass true to automatically freeze all copies created by Immer.
   *
   * By default, auto-freezing is enabled.
   */
  setAutoFreeze(value) {
    this.autoFreeze_ = value;
  }
  /**
   * Pass true to enable strict shallow copy.
   *
   * By default, immer does not copy the object descriptors such as getter, setter and non-enumrable properties.
   */
  setUseStrictShallowCopy(value) {
    this.useStrictShallowCopy_ = value;
  }
  applyPatches(base, patches) {
    let i;
    for (i = patches.length - 1; i >= 0; i--) {
      const patch = patches[i];
      if (patch.path.length === 0 && patch.op === "replace") {
        base = patch.value;
        break;
      }
    }
    if (i > -1) {
      patches = patches.slice(i + 1);
    }
    const applyPatchesImpl = getPlugin("Patches").applyPatches_;
    if (isDraft(base)) {
      return applyPatchesImpl(base, patches);
    }
    return this.produce(
      base,
      (draft) => applyPatchesImpl(draft, patches)
    );
  }
};
function createProxy(value, parent) {
  const draft = isMap(value) ? getPlugin("MapSet").proxyMap_(value, parent) : isSet(value) ? getPlugin("MapSet").proxySet_(value, parent) : createProxyProxy(value, parent);
  const scope = parent ? parent.scope_ : getCurrentScope();
  scope.drafts_.push(draft);
  return draft;
}
function current(value) {
  if (!isDraft(value))
    die(10, value);
  return currentImpl(value);
}
function currentImpl(value) {
  if (!isDraftable(value) || isFrozen(value))
    return value;
  const state = value[DRAFT_STATE];
  let copy;
  if (state) {
    if (!state.modified_)
      return state.base_;
    state.finalized_ = true;
    copy = shallowCopy(value, state.scope_.immer_.useStrictShallowCopy_);
  } else {
    copy = shallowCopy(value, true);
  }
  each2(copy, (key, childValue) => {
    set(copy, key, currentImpl(childValue));
  });
  if (state) {
    state.finalized_ = false;
  }
  return copy;
}
var immer = new Immer2();
var produce = immer.produce;
var produceWithPatches = immer.produceWithPatches.bind(
  immer
);
var setAutoFreeze = immer.setAutoFreeze.bind(immer);
var setUseStrictShallowCopy = immer.setUseStrictShallowCopy.bind(immer);
var applyPatches = immer.applyPatches.bind(immer);
var createDraft = immer.createDraft.bind(immer);
var finishDraft = immer.finishDraft.bind(immer);

// js/utils/dom.js
function waitForElement(selector) {
  return new Promise((resolve) => {
    let el = document.querySelector(selector);
    if (el) {
      return resolve(el);
    }
    let observer = new MutationObserver(() => {
      let el2 = document.querySelector(selector);
      if (el2) {
        observer.disconnect();
        resolve(el2);
      }
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
}

// js/utils/style.js
function className(...classes) {
  return classes.map((c) => {
    if (typeof c === "string") {
      return c;
    }
    if (Array.isArray(c)) {
      return className(...c);
    }
    if (typeof c === "object") {
      return Object.entries(c).filter(([, value]) => value).map(([key]) => key).join(" ");
    }
    return "";
  }).join(" ");
}

// svelte/components/AutoResizeTextarea.svelte
var AutoResizeTextarea_exports = {};
__export(AutoResizeTextarea_exports, {
  default: () => AutoResizeTextarea_default
});
var AutoResizeTextarea = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  let el;
  onMount2(() => {
    el.style.height = el.scrollHeight + "px";
    el.style.overflowY = "hidden";
    el.addEventListener("input", () => {
      el.style.height = "auto";
      el.style.height = el.scrollHeight + "px";
    });
  });
  return `<textarea${spread([escape_object($$restProps)], {})}${add_attribute("this", el, 0)}></textarea>`;
});
var AutoResizeTextarea_default = AutoResizeTextarea;

// svelte/components/Popover.svelte
var Popover_exports = {};
__export(Popover_exports, {
  default: () => Popover_default
});
var Popover = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { isOpen: isOpen2 = false } = $$props;
  let { size = "md" } = $$props;
  let listener;
  let popover;
  let trigger;
  let content;
  onMount2(() => {
    listener = (e) => {
      if (popover && !popover.contains(e.target)) {
        isOpen2 = false;
      }
    };
    document.addEventListener("click", listener);
  });
  onDestroy(() => {
    if (listener) {
      document.removeEventListener("click", listener);
    }
  });
  if ($$props.isOpen === void 0 && $$bindings.isOpen && isOpen2 !== void 0)
    $$bindings.isOpen(isOpen2);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  return `<div class="relative"${add_attribute("this", popover, 0)}>${slots.trigger ? slots.trigger({}) : ``} ${isOpen2 ? `<div${add_attribute("class", className("menu absolute z-popover", size), 0)}${add_attribute("this", content, 0)}>${slots.content ? slots.content({}) : ``}</div>` : ``}</div>`;
});
var Popover_default = Popover;

// svelte/technique_form/LabelPopover.svelte
var LabelPopover_exports = {};
__export(LabelPopover_exports, {
  default: () => LabelPopover_default
});
function clampOverflow(n, total) {
  if (n < 0) {
    return total - 1;
  }
  if (n >= total) {
    return 0;
  }
  return n;
}
var LabelPopover = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let query;
  let $query, $$unsubscribe_query = noop, $$subscribe_query = () => ($$unsubscribe_query(), $$unsubscribe_query = subscribe(query, ($$value) => $query = $$value), query);
  let $mutation, $$unsubscribe_mutation;
  let { isOpen: isOpen2 = false } = $$props;
  let { onAddLabel } = $$props;
  let tag = "";
  let search = "";
  let timeout;
  let selected = -1;
  let listener;
  let mutation = createMutation({
    mutationFn: async (tag2) => {
      let res = await fetch("/api/labels", {
        method: "POST",
        body: JSON.stringify({ tag: tag2 }),
        headers: { "Content-Type": "application/json" }
      });
      let data = await res.json();
      if (!res.ok) {
        throw new Error(data.errors.tag.join(", "));
      }
      selectLabel(data);
    }
  });
  validate_store(mutation, "mutation");
  $$unsubscribe_mutation = subscribe(mutation, (value) => $mutation = value);
  function selectLabel(label) {
    onAddLabel(label);
    tag = search = "";
    isOpen2 = false;
    selected = -1;
  }
  function inputKeyPress(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      let label;
      if (selected !== -1) {
        let label2 = $query.data[selected];
      }
      if (tag.length > 0 && (!$query.data.length || selected === -1)) {
        let existing = $query.data.find((label2) => label2.tag === tag);
        if (existing) {
          selectLabel(existing);
        } else {
          $mutation.mutate(tag);
        }
        return;
      }
      if (selected !== -1) {
        let label2 = $query.data[selected];
        if (label2) {
          selectLabel(label2);
        }
      }
    }
  }
  onMount2(() => {
    listener = (e) => {
      if (e.key === "ArrowDown") {
        selected = clampOverflow(selected + 1, $query.data.length);
      }
      if (e.key === "ArrowUp") {
        selected = clampOverflow(selected - 1, $query.data.length);
      }
    };
    document.addEventListener("keydown", listener);
  });
  onDestroy(() => {
    if (listener) {
      document.removeEventListener("keydown", listener);
    }
    if (timeout) {
      clearTimeout(timeout);
    }
  });
  if ($$props.isOpen === void 0 && $$bindings.isOpen && isOpen2 !== void 0)
    $$bindings.isOpen(isOpen2);
  if ($$props.onAddLabel === void 0 && $$bindings.onAddLabel && onAddLabel !== void 0)
    $$bindings.onAddLabel(onAddLabel);
  $: {
    {
      if (timeout && search !== tag) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(
        () => {
          search = tag;
        },
        300
      );
    }
  }
  $$subscribe_query(query = createQuery({
    queryKey: ["labels", { search }],
    queryFn: async () => {
      let res = await fetch(`/api/labels?search=${search}&limit=5`);
      let data = await res.json();
      selected = -1;
      return data;
    },
    initialData: [],
    enabled: search.length > 0
  }));
  $$unsubscribe_query();
  $$unsubscribe_mutation();
  return `${validate_component(Popover_default, "Popover").$$render($$result, { isOpen: isOpen2, size: "lg" }, {}, {
    content: () => {
      return `<div slot="content" class="flex flex-col gap-y-2"><div class="flex flex-row gap-x-2 items-center"><input${add_attribute("class", className("focus:ring-0 border border-solid border-indigo-700 rounded-md", "bg-none bg-transparent outline-none p-2 w-full"), 0)} id="technique-label-input" placeholder="guard/half"${add_attribute("value", tag, 0)}> <button aria-label="Add position" class="button sm" type="button" data-svelte-h="svelte-1nehyig">Add</button></div> ${$query.data.length > 0 ? `<ul class="flex flex-col gap-y-2">${each($query.data, (label, index) => {
        return `<li><button${spread(
          [
            { class: "option text-left" },
            { type: "button" },
            escape_object(selected === index ? { "data-selected": true } : {})
          ],
          {}
        )}>#${escape(label.tag)}</button> </li>`;
      })}</ul>` : ``}</div>`;
    },
    trigger: () => {
      return `<button aria-label="Add positions or labels to technique" class="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors" type="button" slot="trigger"><span class="hero-tag"></span></button>`;
    }
  })}`;
});
var LabelPopover_default = LabelPopover;

// svelte/technique_form/StepCard.svelte
var StepCard_exports = {};
__export(StepCard_exports, {
  default: () => StepCard_default
});

// svelte/components/Modal.svelte
var Modal_exports = {};
__export(Modal_exports, {
  default: () => Modal_default
});
var Modal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { isOpen: isOpen2 = false } = $$props;
  let { onClose } = $$props;
  let { size = "md" } = $$props;
  let listener;
  let modal;
  onMount2(() => {
    listener = (e) => {
      if (modal && !modal.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("click", listener);
  });
  onDestroy(() => {
    if (listener) {
      document.removeEventListener("click", listener);
    }
  });
  if ($$props.isOpen === void 0 && $$bindings.isOpen && isOpen2 !== void 0)
    $$bindings.isOpen(isOpen2);
  if ($$props.onClose === void 0 && $$bindings.onClose && onClose !== void 0)
    $$bindings.onClose(onClose);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  return `${isOpen2 ? `<div class="relative z-50"><div class="bg-zinc-50/90 dark:bg-zinc-800/90 fixed inset-0 transition-opacity" aria-hidden="true"></div> <div class="fixed inset-0 overflow-y-auto" role="dialog" aria-modal="true"><div class="flex min-h-full items-center justify-center"><div${add_attribute(
    "class",
    className([
      "w-full p-4 sm:p-6 lg:py-8",
      {
        "max-w-lg": size === "sm",
        "max-w-xl": size === "md",
        "max-w-2xl": size === "lg",
        "max-w-3xl": size === "xl"
      }
    ]),
    0
  )}${add_attribute("this", modal, 0)}><div class="shadow-zinc-700/10 ring-zinc-700/10 relative rounded-2xl bg-stone-300 dark:bg-zinc-900 p-14 shadow-lg ring-1 transition"><div class="absolute top-6 right-5"><button type="button" class="-m-3 flex-none p-3 opacity-20 hover:opacity-40" aria-label="close"><span class="hero-x-mark-solid h-5 w-5"></span></button></div> <div>${slots.default ? slots.default({}) : ``}</div></div></div></div></div></div>` : ``}`;
});
var Modal_default = Modal;

// svelte/technique_form/StepCard.svelte
var StepCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { canMoveDown } = $$props;
  let { canMoveUp } = $$props;
  let { onChange } = $$props;
  let { onDelete } = $$props;
  let { onMove } = $$props;
  let { onNext } = $$props;
  let { number } = $$props;
  let { step } = $$props;
  let isFocusModalOpen = false;
  let isMenuOpen = false;
  function moveStep(direction) {
    isOpen = false;
    onMove(step.layout_id, direction);
  }
  function addFocus() {
    onChange(step.layout_id, "focuses", [...step.focuses, { description: "" }]);
  }
  if ($$props.canMoveDown === void 0 && $$bindings.canMoveDown && canMoveDown !== void 0)
    $$bindings.canMoveDown(canMoveDown);
  if ($$props.canMoveUp === void 0 && $$bindings.canMoveUp && canMoveUp !== void 0)
    $$bindings.canMoveUp(canMoveUp);
  if ($$props.onChange === void 0 && $$bindings.onChange && onChange !== void 0)
    $$bindings.onChange(onChange);
  if ($$props.onDelete === void 0 && $$bindings.onDelete && onDelete !== void 0)
    $$bindings.onDelete(onDelete);
  if ($$props.onMove === void 0 && $$bindings.onMove && onMove !== void 0)
    $$bindings.onMove(onMove);
  if ($$props.onNext === void 0 && $$bindings.onNext && onNext !== void 0)
    $$bindings.onNext(onNext);
  if ($$props.number === void 0 && $$bindings.number && number !== void 0)
    $$bindings.number(number);
  if ($$props.step === void 0 && $$bindings.step && step !== void 0)
    $$bindings.step(step);
  return `<div class="flex justify-end items-start mt-[calc(3rem_-_16px)]"><span${add_attribute("class", className("inline-block px-6 py-1 rounded-full", "border border-solid border-zinc-500 dark:border-zinc-300"), 0)}>Step ${escape(number)}</span></div> <div${add_attribute(
    "class",
    className("rounded-xl w-full py-2 px-3 border navigateToStepborder-solid", step.errors.description ? "border-red-900" : "border-zinc-500"),
    0
  )}>${validate_component(AutoResizeTextarea_default, "AutoResizeTextarea").$$render(
    $$result,
    {
      id: `step-description-${number}`,
      class: className("bg-none bg-transparent outline-none border-none p-1", "w-full resize-none min-h-[6rem] focus:ring-0"),
      placeholder: "Describe the this step",
      value: step.description
    },
    {},
    {}
  )} ${step.errors.description ? `<p class="text-red-700 dark:text-red-300 text-sm mt-1">${escape(step.errors.description)}</p>` : ``} <div class="flex justify-end gap-x-2">${validate_component(Modal_default, "Modal").$$render(
    $$result,
    {
      isOpen: isFocusModalOpen,
      onClose: () => isFocusModalOpen = false,
      size: "md"
    },
    {},
    {
      default: () => {
        return `<div class="flex flex-col gap-y-2"><p class="text-lg" data-svelte-h="svelte-izvpgr">At this point:</p> <div class="rounded-xl w-full py-2 px-3 border border-solid border-zinc-500"><p class="text-zinc-500 italic">${escape(step.description || "No description given...")}</p></div> <p class="text-lg" data-svelte-h="svelte-1mmbrjl">focus on:</p></div> <div class="w-full grid grid-cols-[5rem_1fr] gap-4">${each(step.focuses, (focus, index) => {
          return `<div class="flex justify-end items-start mt-4"><span${add_attribute("class", className("inline-block px-2 py-0.5 rounded-full text-sm", "border border-solid border-zinc-500 dark:border-zinc-300"), 0)}>Focus ${escape(index + 1)}</span></div> <div${add_attribute("class", className("rounded-xl w-full py-2 px-3 border border-solid", "border-amber-500"), 0)}>${validate_component(AutoResizeTextarea_default, "AutoResizeTextarea").$$render(
            $$result,
            {
              id: `step-description-${number}`,
              class: className("bg-none bg-transparent outline-none border-none p-1", "w-full resize-none min-h-[6rem] focus:ring-0"),
              placeholder: "What is your focus?",
              value: focus.description
            },
            {},
            {}
          )} </div>`;
        })} <div class="col-span-2 flex flex-row justify-center"><button aria-label="Add focus"${add_attribute("class", className("p-1 rounded-full border border-solid border-zinc-500 transition-colors", "hover:bg-zinc-300 dark:hover:bg-zinc-700 hover:text-zinc-900 dark:hover:text-zinc-200"), 0)} type="button"><span class="hero-plus"></span></button></div></div>`;
      }
    }
  )} <button aria-label="Edit focuses" class="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors" type="button"><span class="hero-exclamation-circle"></span></button> ${validate_component(Popover_default, "Popover").$$render($$result, { isOpen: isMenuOpen }, {}, {
    content: () => {
      return `<ul class="flex flex-col gap-y-2" slot="content">${canMoveUp ? `<li><button class="option flex justify-between" type="button">Move Up
              <span class="hero-arrow-up"></span></button></li>` : ``} ${canMoveDown ? `<li><button class="option flex justify-between" type="button">Move Down
              <span class="hero-arrow-down"></span></button></li>` : ``} <li><button class="option flex justify-between" type="button">Remove
            <span class="hero-trash"></span></button></li></ul>`;
    },
    trigger: () => {
      return `<button aria-label="Edit step" class="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors" type="button" slot="trigger"><span class="hero-cog-6-tooth"></span></button>`;
    }
  })}</div></div>`;
});
var StepCard_default = StepCard;

// svelte/technique_form/Form.svelte
var Form = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let orderedSteps;
  let { action } = $$props;
  let { errors: errors2 = {} } = $$props;
  let { live } = $$props;
  let { technique } = $$props;
  let form = { ...technique };
  let isLabelMenuOpen = false;
  function addStep() {
    form = produce(form, (draft) => {
      let id = (form.steps.map((step) => step.layout_id).sort((a, b) => a - b).pop() || 0) + 1;
      draft.steps.push({ description: "", layout_id: id });
      draft.layout.push({ layout_id: id });
    });
  }
  function deleteStep(id) {
    form = produce(form, (draft) => {
      draft.steps = draft.steps.filter((step) => step.layout_id !== id);
      draft.layout = draft.layout.filter((child) => child.layout_id !== id);
    });
  }
  function updateStep(id, key, value) {
    form = produce(form, (draft) => {
      let step = draft.steps.find((step2) => step2.layout_id === id);
      step[key] = value;
    });
  }
  function moveStep(id, direction) {
    let index = form.layout.findIndex((node) => node.layout_id === id);
    let newIndex = index + direction;
    if (newIndex < 0 || newIndex >= form.layout.length) {
      return;
    }
    form = produce(form, (draft) => {
      draft.layout.splice(newIndex, 0, draft.layout.splice(index, 1)[0]);
    });
  }
  function submit() {
    live.pushEventTo("#technique-form", "save", { technique: form });
  }
  async function navigateToStep(number) {
    let el = document.getElementById(`step-description-${number}`);
    if (el) {
      return el.focus();
    }
    addStep();
    el = await waitForElement(`#step-description-${number}`);
    el.focus();
  }
  async function openLabelMenu() {
    isLabelMenuOpen = !isLabelMenuOpen;
    let el = await waitForElement("#technique-label-input");
    el.focus();
  }
  function addLabel(label) {
    form = produce(form, (draft) => {
      draft.labels.push(label);
    });
    isLabelMenuOpen = false;
    document.getElementById("description").focus();
  }
  function removeLabel(id) {
    form = produce(form, (draft) => {
      draft.labels = draft.labels.filter((label) => label.id !== id);
    });
  }
  if ($$props.action === void 0 && $$bindings.action && action !== void 0)
    $$bindings.action(action);
  if ($$props.errors === void 0 && $$bindings.errors && errors2 !== void 0)
    $$bindings.errors(errors2);
  if ($$props.live === void 0 && $$bindings.live && live !== void 0)
    $$bindings.live(live);
  if ($$props.technique === void 0 && $$bindings.technique && technique !== void 0)
    $$bindings.technique(technique);
  orderedSteps = form.layout.map((node) => {
    let index = form.steps.findIndex((step) => step.layout_id === node.layout_id);
    return {
      ...form.steps[index],
      errors: errors2.steps ? errors2.steps[index] : {}
    };
  });
  return `<form autocomplete="off"><div class="mb-8"><input${add_attribute("value", form.name, 0)}${add_attribute(
    "class",
    className("text-6xl px-3 py-4 h-[92px] placeholder:text-neutral-500 w-full outline-none border-b", "text-neutral-900 dark:text-neutral-300 bg-transparent transition-colors", {
      "border-red-900 placeholder:text-red-400 dark:placeholder:text-red-300": errors2.name,
      "border-zinc-400 dark:border-zinc-500 focus:border-zinc-500 dark:focus:border-zinc-100": !errors2.name
    }),
    0
  )} placeholder="Technique name"> ${errors2.name ? `<p class="text-red-700 dark:text-red-300 text-sm mt-1">${escape(errors2.name)}</p>` : ``}</div> <div class="w-full grid grid-cols-[8rem_1fr] gap-4"><div class="flex justify-end items-start mt-[calc(3rem_-_16px)]"><span${add_attribute("class", className("inline-block px-6 py-1 rounded-full", "border border-solid border-zinc-500 dark:border-zinc-300"), 0)} data-svelte-h="svelte-1vztkyv">Start</span></div> <div${add_attribute("class", className("rounded-xl w-full py-2 px-3", "border border-solid border-zinc-500", "bg-gradient-to-br from-indigo-950 to-zinc-900 to-50%"), 0)}>${validate_component(AutoResizeTextarea_default, "AutoResizeTextarea").$$render(
    $$result,
    {
      autofocus: true,
      id: "description",
      value: form.description,
      "aria-label": "Description of starting position",
      class: className("bg-none bg-transparent outline-none border-none p-1", "w-full resize-none min-h-[6rem] focus:ring-0"),
      placeholder: "Describe the starting position for this technique"
    },
    {},
    {}
  )} <div class="flex justify-between"><div class="flex flex-row gap-x-2 grow">${each(form.labels, (label) => {
    return `<button${add_attribute("class", className("inline-flex gap-x-0.5 items-center px-3 rounded-full leading-7 bg-indigo-800", "border border-solid border-zinc-500 dark:border-zinc-300"), 0)} type="button"><span class="text-zinc-300">#${escape(label.tag)}</span> <span class="hero-x-mark-micro text-zinc-500 hover:text-zinc-300"></span> </button>`;
  })}</div> ${validate_component(LabelPopover_default, "LabelPopover").$$render(
    $$result,
    {
      isOpen: isLabelMenuOpen,
      onAddLabel: addLabel
    },
    {},
    {}
  )}</div></div> ${each(orderedSteps, (step, index) => {
    return `${validate_component(StepCard_default, "StepCard").$$render(
      $$result,
      {
        canMoveDown: index < orderedSteps.length - 1,
        canMoveUp: index > 0,
        onChange: updateStep,
        onDelete: deleteStep,
        onMove: moveStep,
        onNext: () => navigateToStep(index + 2),
        number: index + 1,
        step
      },
      {},
      {}
    )}`;
  })} <div class="col-start-2 flex flex-row justify-center"><button aria-label="Add step"${add_attribute("class", className("p-1 rounded-full border border-solid border-zinc-500 transition-colors", "hover:bg-zinc-300 dark:hover:bg-zinc-700 hover:text-zinc-900 dark:hover:text-zinc-200"), 0)} type="button"><span class="hero-plus"></span></button></div></div> <div class="flex justify-end mt-6 gap-x-2">${action === "edit" ? `<a class="button outlined"${add_attribute("href", `/techniques/${technique.id}`, 0)} type="button" data-phx-link="patch" data-phx-link-state="push">Cancel</a>` : ``} <button class="button" type="submit">${escape(action === "new" ? "Create" : "Update")}</button></div></form>`;
});
var Form_default = Form;

// svelte/TechniqueForm.svelte
var TechniqueForm = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { action } = $$props;
  let { errors: errors2 } = $$props;
  let { live } = $$props;
  let { technique } = $$props;
  let client = new QueryClient();
  if ($$props.action === void 0 && $$bindings.action && action !== void 0)
    $$bindings.action(action);
  if ($$props.errors === void 0 && $$bindings.errors && errors2 !== void 0)
    $$bindings.errors(errors2);
  if ($$props.live === void 0 && $$bindings.live && live !== void 0)
    $$bindings.live(live);
  if ($$props.technique === void 0 && $$bindings.technique && technique !== void 0)
    $$bindings.technique(technique);
  return `${validate_component(QueryClientProvider_default, "QueryClientProvider").$$render($$result, { client }, {}, {
    default: () => {
      return `${validate_component(Form_default, "Form").$$render($$result, { action, errors: errors2, live, technique }, {}, {})}`;
    }
  })}`;
});
var TechniqueForm_default = TechniqueForm;

// import-glob:../svelte/**/*.svelte
var modules = [TechniqueForm_exports, AutoResizeTextarea_exports, Modal_exports, Popover_exports, Form_exports, LabelPopover_exports, StepCard_exports];
var __default = modules;
var filenames = ["../svelte/TechniqueForm.svelte", "../svelte/components/AutoResizeTextarea.svelte", "../svelte/components/Modal.svelte", "../svelte/components/Popover.svelte", "../svelte/technique_form/Form.svelte", "../svelte/technique_form/LabelPopover.svelte", "../svelte/technique_form/StepCard.svelte"];

// ../deps/live_svelte/priv/static/live_svelte.esm.js
function normalizeComponents(components) {
  if (!Array.isArray(components.default) || !Array.isArray(components.filenames))
    return components;
  const normalized = {};
  for (const [index, module2] of components.default.entries()) {
    const Component = module2.default;
    const name = components.filenames[index].replace("../svelte/", "").replace(".svelte", "");
    normalized[name] = Component;
  }
  return normalized;
}
function getRender(components) {
  components = normalizeComponents(components);
  return function render2(name, props, slots) {
    const Component = components[name];
    const $$slots = Object.fromEntries(Object.entries(slots).map(([k, v]) => [k, () => v]));
    return Component.render(props, { $$slots });
  };
}

// js/server.js
var render = getRender(__exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  render
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vYXNzZXRzL2pzL3NlcnZlci5qcyIsICJpbXBvcnQtZ2xvYjouLi9zdmVsdGUvKiovKi5zdmVsdGUiLCAiLi4vLi4vYXNzZXRzL25vZGVfbW9kdWxlcy9zdmVsdGUvc3JjL3J1bnRpbWUvaW50ZXJuYWwvdXRpbHMuanMiLCAiLi4vLi4vYXNzZXRzL25vZGVfbW9kdWxlcy9zdmVsdGUvc3JjL3J1bnRpbWUvaW50ZXJuYWwvZ2xvYmFscy5qcyIsICIuLi8uLi9hc3NldHMvbm9kZV9tb2R1bGVzL3N2ZWx0ZS9zcmMvcnVudGltZS9pbnRlcm5hbC9SZXNpemVPYnNlcnZlclNpbmdsZXRvbi5qcyIsICIuLi8uLi9hc3NldHMvbm9kZV9tb2R1bGVzL3N2ZWx0ZS9zcmMvcnVudGltZS9pbnRlcm5hbC9kb20uanMiLCAiLi4vLi4vYXNzZXRzL25vZGVfbW9kdWxlcy9zdmVsdGUvc3JjL3J1bnRpbWUvaW50ZXJuYWwvbGlmZWN5Y2xlLmpzIiwgIi4uLy4uL2Fzc2V0cy9ub2RlX21vZHVsZXMvc3ZlbHRlL3NyYy9ydW50aW1lL2ludGVybmFsL2VhY2guanMiLCAiLi4vLi4vYXNzZXRzL25vZGVfbW9kdWxlcy9zdmVsdGUvc3JjL3NoYXJlZC9ib29sZWFuX2F0dHJpYnV0ZXMuanMiLCAiLi4vLi4vYXNzZXRzL25vZGVfbW9kdWxlcy9zdmVsdGUvc3JjL3NoYXJlZC91dGlscy9lc2NhcGUuanMiLCAiLi4vLi4vYXNzZXRzL25vZGVfbW9kdWxlcy9zdmVsdGUvc3JjL3J1bnRpbWUvaW50ZXJuYWwvc3NyLmpzIiwgIi4uLy4uL2Fzc2V0cy9ub2RlX21vZHVsZXMvc3ZlbHRlL3NyYy9ydW50aW1lL2ludGVybmFsL0NvbXBvbmVudC5qcyIsICIuLi8uLi9hc3NldHMvbm9kZV9tb2R1bGVzL0B0YW5zdGFjay9xdWVyeS1jb3JlL3NyYy9zdWJzY3JpYmFibGUudHMiLCAiLi4vLi4vYXNzZXRzL25vZGVfbW9kdWxlcy9AdGFuc3RhY2svcXVlcnktY29yZS9zcmMvdXRpbHMudHMiLCAiLi4vLi4vYXNzZXRzL25vZGVfbW9kdWxlcy9AdGFuc3RhY2svcXVlcnktY29yZS9zcmMvZm9jdXNNYW5hZ2VyLnRzIiwgIi4uLy4uL2Fzc2V0cy9ub2RlX21vZHVsZXMvQHRhbnN0YWNrL3F1ZXJ5LWNvcmUvc3JjL29ubGluZU1hbmFnZXIudHMiLCAiLi4vLi4vYXNzZXRzL25vZGVfbW9kdWxlcy9AdGFuc3RhY2svcXVlcnktY29yZS9zcmMvcmV0cnllci50cyIsICIuLi8uLi9hc3NldHMvbm9kZV9tb2R1bGVzL0B0YW5zdGFjay9xdWVyeS1jb3JlL3NyYy9sb2dnZXIudHMiLCAiLi4vLi4vYXNzZXRzL25vZGVfbW9kdWxlcy9AdGFuc3RhY2svcXVlcnktY29yZS9zcmMvbm90aWZ5TWFuYWdlci50cyIsICIuLi8uLi9hc3NldHMvbm9kZV9tb2R1bGVzL0B0YW5zdGFjay9xdWVyeS1jb3JlL3NyYy9yZW1vdmFibGUudHMiLCAiLi4vLi4vYXNzZXRzL25vZGVfbW9kdWxlcy9AdGFuc3RhY2svcXVlcnktY29yZS9zcmMvcXVlcnkudHMiLCAiLi4vLi4vYXNzZXRzL25vZGVfbW9kdWxlcy9AdGFuc3RhY2svcXVlcnktY29yZS9zcmMvcXVlcnlDYWNoZS50cyIsICIuLi8uLi9hc3NldHMvbm9kZV9tb2R1bGVzL0B0YW5zdGFjay9xdWVyeS1jb3JlL3NyYy9tdXRhdGlvbi50cyIsICIuLi8uLi9hc3NldHMvbm9kZV9tb2R1bGVzL0B0YW5zdGFjay9xdWVyeS1jb3JlL3NyYy9tdXRhdGlvbkNhY2hlLnRzIiwgIi4uLy4uL2Fzc2V0cy9ub2RlX21vZHVsZXMvQHRhbnN0YWNrL3F1ZXJ5LWNvcmUvc3JjL2luZmluaXRlUXVlcnlCZWhhdmlvci50cyIsICIuLi8uLi9hc3NldHMvbm9kZV9tb2R1bGVzL0B0YW5zdGFjay9xdWVyeS1jb3JlL3NyYy9xdWVyeUNsaWVudC50cyIsICIuLi8uLi9hc3NldHMvbm9kZV9tb2R1bGVzL0B0YW5zdGFjay9xdWVyeS1jb3JlL3NyYy9xdWVyeU9ic2VydmVyLnRzIiwgIi4uLy4uL2Fzc2V0cy9ub2RlX21vZHVsZXMvQHRhbnN0YWNrL3F1ZXJ5LWNvcmUvc3JjL211dGF0aW9uT2JzZXJ2ZXIudHMiLCAiLi4vLi4vYXNzZXRzL25vZGVfbW9kdWxlcy9AdGFuc3RhY2svcXVlcnktY29yZS9zcmMvaHlkcmF0aW9uLnRzIiwgIi4uLy4uL2Fzc2V0cy9ub2RlX21vZHVsZXMvc3ZlbHRlL3NyYy9ydW50aW1lL3Nzci5qcyIsICIuLi8uLi9hc3NldHMvbm9kZV9tb2R1bGVzL0B0YW5zdGFjay9zdmVsdGUtcXVlcnkvYnVpbGQvbGliL2NvbnRleHQuanMiLCAiLi4vLi4vYXNzZXRzL25vZGVfbW9kdWxlcy9zdmVsdGUvc3JjL3J1bnRpbWUvc3RvcmUvaW5kZXguanMiLCAiLi4vLi4vYXNzZXRzL25vZGVfbW9kdWxlcy9AdGFuc3RhY2svc3ZlbHRlLXF1ZXJ5L2J1aWxkL2xpYi91c2VRdWVyeUNsaWVudC5qcyIsICIuLi8uLi9hc3NldHMvbm9kZV9tb2R1bGVzL0B0YW5zdGFjay9zdmVsdGUtcXVlcnkvYnVpbGQvbGliL2NyZWF0ZUJhc2VRdWVyeS5qcyIsICIuLi8uLi9hc3NldHMvbm9kZV9tb2R1bGVzL0B0YW5zdGFjay9zdmVsdGUtcXVlcnkvYnVpbGQvbGliL2NyZWF0ZVF1ZXJ5LmpzIiwgIi4uLy4uL2Fzc2V0cy9ub2RlX21vZHVsZXMvQHRhbnN0YWNrL3N2ZWx0ZS1xdWVyeS9idWlsZC9saWIvY3JlYXRlTXV0YXRpb24uanMiLCAiLi4vLi4vYXNzZXRzL25vZGVfbW9kdWxlcy9AdGFuc3RhY2svc3ZlbHRlLXF1ZXJ5L2J1aWxkL2xpYi91c2VIeWRyYXRlLmpzIiwgIi4uLy4uL2Fzc2V0cy9ub2RlX21vZHVsZXMvQHRhbnN0YWNrL3N2ZWx0ZS1xdWVyeS9idWlsZC9saWIvSHlkcmF0ZS5zdmVsdGUiLCAiLi4vLi4vYXNzZXRzL25vZGVfbW9kdWxlcy9AdGFuc3RhY2svc3ZlbHRlLXF1ZXJ5L2J1aWxkL2xpYi9RdWVyeUNsaWVudFByb3ZpZGVyLnN2ZWx0ZSIsICIuLi8uLi9hc3NldHMvbm9kZV9tb2R1bGVzL2ltbWVyL3NyYy91dGlscy9lbnYudHMiLCAiLi4vLi4vYXNzZXRzL25vZGVfbW9kdWxlcy9pbW1lci9zcmMvdXRpbHMvZXJyb3JzLnRzIiwgIi4uLy4uL2Fzc2V0cy9ub2RlX21vZHVsZXMvaW1tZXIvc3JjL3V0aWxzL2NvbW1vbi50cyIsICIuLi8uLi9hc3NldHMvbm9kZV9tb2R1bGVzL2ltbWVyL3NyYy91dGlscy9wbHVnaW5zLnRzIiwgIi4uLy4uL2Fzc2V0cy9ub2RlX21vZHVsZXMvaW1tZXIvc3JjL2NvcmUvc2NvcGUudHMiLCAiLi4vLi4vYXNzZXRzL25vZGVfbW9kdWxlcy9pbW1lci9zcmMvY29yZS9maW5hbGl6ZS50cyIsICIuLi8uLi9hc3NldHMvbm9kZV9tb2R1bGVzL2ltbWVyL3NyYy9jb3JlL3Byb3h5LnRzIiwgIi4uLy4uL2Fzc2V0cy9ub2RlX21vZHVsZXMvaW1tZXIvc3JjL2NvcmUvaW1tZXJDbGFzcy50cyIsICIuLi8uLi9hc3NldHMvbm9kZV9tb2R1bGVzL2ltbWVyL3NyYy9jb3JlL2N1cnJlbnQudHMiLCAiLi4vLi4vYXNzZXRzL25vZGVfbW9kdWxlcy9pbW1lci9zcmMvcGx1Z2lucy9wYXRjaGVzLnRzIiwgIi4uLy4uL2Fzc2V0cy9ub2RlX21vZHVsZXMvaW1tZXIvc3JjL3BsdWdpbnMvbWFwc2V0LnRzIiwgIi4uLy4uL2Fzc2V0cy9ub2RlX21vZHVsZXMvaW1tZXIvc3JjL2ltbWVyLnRzIiwgIi4uLy4uL2Fzc2V0cy9qcy91dGlscy9kb20uanMiLCAiLi4vLi4vYXNzZXRzL2pzL3V0aWxzL3N0eWxlLmpzIiwgIi4uLy4uL2Fzc2V0cy9zdmVsdGUvY29tcG9uZW50cy9BdXRvUmVzaXplVGV4dGFyZWEuc3ZlbHRlIiwgIi4uLy4uL2Fzc2V0cy9zdmVsdGUvY29tcG9uZW50cy9Qb3BvdmVyLnN2ZWx0ZSIsICIuLi8uLi9hc3NldHMvc3ZlbHRlL3RlY2huaXF1ZV9mb3JtL0xhYmVsUG9wb3Zlci5zdmVsdGUiLCAiLi4vLi4vYXNzZXRzL3N2ZWx0ZS9jb21wb25lbnRzL01vZGFsLnN2ZWx0ZSIsICIuLi8uLi9hc3NldHMvc3ZlbHRlL3RlY2huaXF1ZV9mb3JtL1N0ZXBDYXJkLnN2ZWx0ZSIsICIuLi8uLi9hc3NldHMvc3ZlbHRlL3RlY2huaXF1ZV9mb3JtL0Zvcm0uc3ZlbHRlIiwgIi4uLy4uL2Fzc2V0cy9zdmVsdGUvVGVjaG5pcXVlRm9ybS5zdmVsdGUiLCAiLi4vLi4vZGVwcy9saXZlX3N2ZWx0ZS9hc3NldHMvanMvbGl2ZV9zdmVsdGUvdXRpbHMuanMiLCAiLi4vLi4vZGVwcy9saXZlX3N2ZWx0ZS9hc3NldHMvanMvbGl2ZV9zdmVsdGUvcmVuZGVyLmpzIiwgIi4uLy4uL2RlcHMvbGl2ZV9zdmVsdGUvYXNzZXRzL2pzL2xpdmVfc3ZlbHRlL2hvb2tzLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgKiBhcyBDb21wb25lbnRzIGZyb20gXCIuLi9zdmVsdGUvKiovKi5zdmVsdGVcIjtcbmltcG9ydCB7IGdldFJlbmRlciB9IGZyb20gXCJsaXZlX3N2ZWx0ZVwiO1xuXG5leHBvcnQgY29uc3QgcmVuZGVyID0gZ2V0UmVuZGVyKENvbXBvbmVudHMpO1xuIiwgIlxuICAgICAgICBpbXBvcnQgKiBhcyBtb2R1bGUwIGZyb20gJy4uL3N2ZWx0ZS9UZWNobmlxdWVGb3JtLnN2ZWx0ZSc7aW1wb3J0ICogYXMgbW9kdWxlMSBmcm9tICcuLi9zdmVsdGUvY29tcG9uZW50cy9BdXRvUmVzaXplVGV4dGFyZWEuc3ZlbHRlJztpbXBvcnQgKiBhcyBtb2R1bGUyIGZyb20gJy4uL3N2ZWx0ZS9jb21wb25lbnRzL01vZGFsLnN2ZWx0ZSc7aW1wb3J0ICogYXMgbW9kdWxlMyBmcm9tICcuLi9zdmVsdGUvY29tcG9uZW50cy9Qb3BvdmVyLnN2ZWx0ZSc7aW1wb3J0ICogYXMgbW9kdWxlNCBmcm9tICcuLi9zdmVsdGUvdGVjaG5pcXVlX2Zvcm0vRm9ybS5zdmVsdGUnO2ltcG9ydCAqIGFzIG1vZHVsZTUgZnJvbSAnLi4vc3ZlbHRlL3RlY2huaXF1ZV9mb3JtL0xhYmVsUG9wb3Zlci5zdmVsdGUnO2ltcG9ydCAqIGFzIG1vZHVsZTYgZnJvbSAnLi4vc3ZlbHRlL3RlY2huaXF1ZV9mb3JtL1N0ZXBDYXJkLnN2ZWx0ZSdcblxuICAgICAgICBjb25zdCBtb2R1bGVzID0gW21vZHVsZTAsbW9kdWxlMSxtb2R1bGUyLG1vZHVsZTMsbW9kdWxlNCxtb2R1bGU1LG1vZHVsZTZdO1xuXG4gICAgICAgIGV4cG9ydCBkZWZhdWx0IG1vZHVsZXM7XG4gICAgICAgIGV4cG9ydCBjb25zdCBmaWxlbmFtZXMgPSBbJy4uL3N2ZWx0ZS9UZWNobmlxdWVGb3JtLnN2ZWx0ZScsJy4uL3N2ZWx0ZS9jb21wb25lbnRzL0F1dG9SZXNpemVUZXh0YXJlYS5zdmVsdGUnLCcuLi9zdmVsdGUvY29tcG9uZW50cy9Nb2RhbC5zdmVsdGUnLCcuLi9zdmVsdGUvY29tcG9uZW50cy9Qb3BvdmVyLnN2ZWx0ZScsJy4uL3N2ZWx0ZS90ZWNobmlxdWVfZm9ybS9Gb3JtLnN2ZWx0ZScsJy4uL3N2ZWx0ZS90ZWNobmlxdWVfZm9ybS9MYWJlbFBvcG92ZXIuc3ZlbHRlJywnLi4vc3ZlbHRlL3RlY2huaXF1ZV9mb3JtL1N0ZXBDYXJkLnN2ZWx0ZSddXG4gICAgICAiLCAiLyoqIEByZXR1cm5zIHt2b2lkfSAqL1xuZXhwb3J0IGZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5leHBvcnQgY29uc3QgaWRlbnRpdHkgPSAoeCkgPT4geDtcblxuLyoqXG4gKiBAdGVtcGxhdGUgVFxuICogQHRlbXBsYXRlIFNcbiAqIEBwYXJhbSB7VH0gdGFyXG4gKiBAcGFyYW0ge1N9IHNyY1xuICogQHJldHVybnMge1QgJiBTfVxuICovXG5leHBvcnQgZnVuY3Rpb24gYXNzaWduKHRhciwgc3JjKSB7XG5cdC8vIEB0cy1pZ25vcmVcblx0Zm9yIChjb25zdCBrIGluIHNyYykgdGFyW2tdID0gc3JjW2tdO1xuXHRyZXR1cm4gLyoqIEB0eXBlIHtUICYgU30gKi8gKHRhcik7XG59XG5cbi8vIEFkYXB0ZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vdGhlbi9pcy1wcm9taXNlL2Jsb2IvbWFzdGVyL2luZGV4LmpzXG4vLyBEaXN0cmlidXRlZCB1bmRlciBNSVQgTGljZW5zZSBodHRwczovL2dpdGh1Yi5jb20vdGhlbi9pcy1wcm9taXNlL2Jsb2IvbWFzdGVyL0xJQ0VOU0Vcbi8qKlxuICogQHBhcmFtIHthbnl9IHZhbHVlXG4gKiBAcmV0dXJucyB7dmFsdWUgaXMgUHJvbWlzZUxpa2U8YW55Pn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzX3Byb21pc2UodmFsdWUpIHtcblx0cmV0dXJuIChcblx0XHQhIXZhbHVlICYmXG5cdFx0KHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSAmJlxuXHRcdHR5cGVvZiAoLyoqIEB0eXBlIHthbnl9ICovICh2YWx1ZSkudGhlbikgPT09ICdmdW5jdGlvbidcblx0KTtcbn1cblxuLyoqIEByZXR1cm5zIHt2b2lkfSAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFkZF9sb2NhdGlvbihlbGVtZW50LCBmaWxlLCBsaW5lLCBjb2x1bW4sIGNoYXIpIHtcblx0ZWxlbWVudC5fX3N2ZWx0ZV9tZXRhID0ge1xuXHRcdGxvYzogeyBmaWxlLCBsaW5lLCBjb2x1bW4sIGNoYXIgfVxuXHR9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcnVuKGZuKSB7XG5cdHJldHVybiBmbigpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYmxhbmtfb2JqZWN0KCkge1xuXHRyZXR1cm4gT2JqZWN0LmNyZWF0ZShudWxsKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0Z1bmN0aW9uW119IGZuc1xuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBydW5fYWxsKGZucykge1xuXHRmbnMuZm9yRWFjaChydW4pO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7YW55fSB0aGluZ1xuICogQHJldHVybnMge3RoaW5nIGlzIEZ1bmN0aW9ufVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNfZnVuY3Rpb24odGhpbmcpIHtcblx0cmV0dXJuIHR5cGVvZiB0aGluZyA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuLyoqIEByZXR1cm5zIHtib29sZWFufSAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNhZmVfbm90X2VxdWFsKGEsIGIpIHtcblx0cmV0dXJuIGEgIT0gYSA/IGIgPT0gYiA6IGEgIT09IGIgfHwgKGEgJiYgdHlwZW9mIGEgPT09ICdvYmplY3QnKSB8fCB0eXBlb2YgYSA9PT0gJ2Z1bmN0aW9uJztcbn1cblxubGV0IHNyY191cmxfZXF1YWxfYW5jaG9yO1xuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBlbGVtZW50X3NyY1xuICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzcmNfdXJsX2VxdWFsKGVsZW1lbnRfc3JjLCB1cmwpIHtcblx0aWYgKGVsZW1lbnRfc3JjID09PSB1cmwpIHJldHVybiB0cnVlO1xuXHRpZiAoIXNyY191cmxfZXF1YWxfYW5jaG9yKSB7XG5cdFx0c3JjX3VybF9lcXVhbF9hbmNob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG5cdH1cblx0Ly8gVGhpcyBpcyBhY3R1YWxseSBmYXN0ZXIgdGhhbiBkb2luZyBVUkwoLi4pLmhyZWZcblx0c3JjX3VybF9lcXVhbF9hbmNob3IuaHJlZiA9IHVybDtcblx0cmV0dXJuIGVsZW1lbnRfc3JjID09PSBzcmNfdXJsX2VxdWFsX2FuY2hvci5ocmVmO1xufVxuXG4vKiogQHBhcmFtIHtzdHJpbmd9IHNyY3NldCAqL1xuZnVuY3Rpb24gc3BsaXRfc3Jjc2V0KHNyY3NldCkge1xuXHRyZXR1cm4gc3Jjc2V0LnNwbGl0KCcsJykubWFwKChzcmMpID0+IHNyYy50cmltKCkuc3BsaXQoJyAnKS5maWx0ZXIoQm9vbGVhbikpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7SFRNTFNvdXJjZUVsZW1lbnQgfCBIVE1MSW1hZ2VFbGVtZW50fSBlbGVtZW50X3NyY3NldFxuICogQHBhcmFtIHtzdHJpbmcgfCB1bmRlZmluZWQgfCBudWxsfSBzcmNzZXRcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5leHBvcnQgZnVuY3Rpb24gc3Jjc2V0X3VybF9lcXVhbChlbGVtZW50X3NyY3NldCwgc3Jjc2V0KSB7XG5cdGNvbnN0IGVsZW1lbnRfdXJscyA9IHNwbGl0X3NyY3NldChlbGVtZW50X3NyY3NldC5zcmNzZXQpO1xuXHRjb25zdCB1cmxzID0gc3BsaXRfc3Jjc2V0KHNyY3NldCB8fCAnJyk7XG5cblx0cmV0dXJuIChcblx0XHR1cmxzLmxlbmd0aCA9PT0gZWxlbWVudF91cmxzLmxlbmd0aCAmJlxuXHRcdHVybHMuZXZlcnkoXG5cdFx0XHQoW3VybCwgd2lkdGhdLCBpKSA9PlxuXHRcdFx0XHR3aWR0aCA9PT0gZWxlbWVudF91cmxzW2ldWzFdICYmXG5cdFx0XHRcdC8vIFdlIG5lZWQgdG8gdGVzdCBib3RoIHdheXMgYmVjYXVzZSBWaXRlIHdpbGwgY3JlYXRlIGFuIGEgZnVsbCBVUkwgd2l0aFxuXHRcdFx0XHQvLyBgbmV3IFVSTChhc3NldCwgaW1wb3J0Lm1ldGEudXJsKS5ocmVmYCBmb3IgdGhlIGNsaWVudCB3aGVuIGBiYXNlOiAnLi8nYCwgYW5kIHRoZVxuXHRcdFx0XHQvLyByZWxhdGl2ZSBVUkxzIGluc2lkZSBzcmNzZXQgYXJlIG5vdCBhdXRvbWF0aWNhbGx5IHJlc29sdmVkIHRvIGFic29sdXRlIFVSTHMgYnlcblx0XHRcdFx0Ly8gYnJvd3NlcnMgKGluIGNvbnRyYXN0IHRvIGltZy5zcmMpLiBUaGlzIG1lYW5zIGJvdGggU1NSIGFuZCBET00gY29kZSBjb3VsZFxuXHRcdFx0XHQvLyBjb250YWluIHJlbGF0aXZlIG9yIGFic29sdXRlIFVSTHMuXG5cdFx0XHRcdChzcmNfdXJsX2VxdWFsKGVsZW1lbnRfdXJsc1tpXVswXSwgdXJsKSB8fCBzcmNfdXJsX2VxdWFsKHVybCwgZWxlbWVudF91cmxzW2ldWzBdKSlcblx0XHQpXG5cdCk7XG59XG5cbi8qKiBAcmV0dXJucyB7Ym9vbGVhbn0gKi9cbmV4cG9ydCBmdW5jdGlvbiBub3RfZXF1YWwoYSwgYikge1xuXHRyZXR1cm4gYSAhPSBhID8gYiA9PSBiIDogYSAhPT0gYjtcbn1cblxuLyoqIEByZXR1cm5zIHtib29sZWFufSAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzX2VtcHR5KG9iaikge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMob2JqKS5sZW5ndGggPT09IDA7XG59XG5cbi8qKiBAcmV0dXJucyB7dm9pZH0gKi9cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZV9zdG9yZShzdG9yZSwgbmFtZSkge1xuXHRpZiAoc3RvcmUgIT0gbnVsbCAmJiB0eXBlb2Ygc3RvcmUuc3Vic2NyaWJlICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKGAnJHtuYW1lfScgaXMgbm90IGEgc3RvcmUgd2l0aCBhICdzdWJzY3JpYmUnIG1ldGhvZGApO1xuXHR9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdWJzY3JpYmUoc3RvcmUsIC4uLmNhbGxiYWNrcykge1xuXHRpZiAoc3RvcmUgPT0gbnVsbCkge1xuXHRcdGZvciAoY29uc3QgY2FsbGJhY2sgb2YgY2FsbGJhY2tzKSB7XG5cdFx0XHRjYWxsYmFjayh1bmRlZmluZWQpO1xuXHRcdH1cblx0XHRyZXR1cm4gbm9vcDtcblx0fVxuXHRjb25zdCB1bnN1YiA9IHN0b3JlLnN1YnNjcmliZSguLi5jYWxsYmFja3MpO1xuXHRyZXR1cm4gdW5zdWIudW5zdWJzY3JpYmUgPyAoKSA9PiB1bnN1Yi51bnN1YnNjcmliZSgpIDogdW5zdWI7XG59XG5cbi8qKlxuICogR2V0IHRoZSBjdXJyZW50IHZhbHVlIGZyb20gYSBzdG9yZSBieSBzdWJzY3JpYmluZyBhbmQgaW1tZWRpYXRlbHkgdW5zdWJzY3JpYmluZy5cbiAqXG4gKiBodHRwczovL3N2ZWx0ZS5kZXYvZG9jcy9zdmVsdGUtc3RvcmUjZ2V0XG4gKiBAdGVtcGxhdGUgVFxuICogQHBhcmFtIHtpbXBvcnQoJy4uL3N0b3JlL3B1YmxpYy5qcycpLlJlYWRhYmxlPFQ+fSBzdG9yZVxuICogQHJldHVybnMge1R9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRfc3RvcmVfdmFsdWUoc3RvcmUpIHtcblx0bGV0IHZhbHVlO1xuXHRzdWJzY3JpYmUoc3RvcmUsIChfKSA9PiAodmFsdWUgPSBfKSkoKTtcblx0cmV0dXJuIHZhbHVlO1xufVxuXG4vKiogQHJldHVybnMge3ZvaWR9ICovXG5leHBvcnQgZnVuY3Rpb24gY29tcG9uZW50X3N1YnNjcmliZShjb21wb25lbnQsIHN0b3JlLCBjYWxsYmFjaykge1xuXHRjb21wb25lbnQuJCQub25fZGVzdHJveS5wdXNoKHN1YnNjcmliZShzdG9yZSwgY2FsbGJhY2spKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZV9zbG90KGRlZmluaXRpb24sIGN0eCwgJCRzY29wZSwgZm4pIHtcblx0aWYgKGRlZmluaXRpb24pIHtcblx0XHRjb25zdCBzbG90X2N0eCA9IGdldF9zbG90X2NvbnRleHQoZGVmaW5pdGlvbiwgY3R4LCAkJHNjb3BlLCBmbik7XG5cdFx0cmV0dXJuIGRlZmluaXRpb25bMF0oc2xvdF9jdHgpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGdldF9zbG90X2NvbnRleHQoZGVmaW5pdGlvbiwgY3R4LCAkJHNjb3BlLCBmbikge1xuXHRyZXR1cm4gZGVmaW5pdGlvblsxXSAmJiBmbiA/IGFzc2lnbigkJHNjb3BlLmN0eC5zbGljZSgpLCBkZWZpbml0aW9uWzFdKGZuKGN0eCkpKSA6ICQkc2NvcGUuY3R4O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0X3Nsb3RfY2hhbmdlcyhkZWZpbml0aW9uLCAkJHNjb3BlLCBkaXJ0eSwgZm4pIHtcblx0aWYgKGRlZmluaXRpb25bMl0gJiYgZm4pIHtcblx0XHRjb25zdCBsZXRzID0gZGVmaW5pdGlvblsyXShmbihkaXJ0eSkpO1xuXHRcdGlmICgkJHNjb3BlLmRpcnR5ID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHJldHVybiBsZXRzO1xuXHRcdH1cblx0XHRpZiAodHlwZW9mIGxldHMgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRjb25zdCBtZXJnZWQgPSBbXTtcblx0XHRcdGNvbnN0IGxlbiA9IE1hdGgubWF4KCQkc2NvcGUuZGlydHkubGVuZ3RoLCBsZXRzLmxlbmd0aCk7XG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSArPSAxKSB7XG5cdFx0XHRcdG1lcmdlZFtpXSA9ICQkc2NvcGUuZGlydHlbaV0gfCBsZXRzW2ldO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG1lcmdlZDtcblx0XHR9XG5cdFx0cmV0dXJuICQkc2NvcGUuZGlydHkgfCBsZXRzO1xuXHR9XG5cdHJldHVybiAkJHNjb3BlLmRpcnR5O1xufVxuXG4vKiogQHJldHVybnMge3ZvaWR9ICovXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlX3Nsb3RfYmFzZShcblx0c2xvdCxcblx0c2xvdF9kZWZpbml0aW9uLFxuXHRjdHgsXG5cdCQkc2NvcGUsXG5cdHNsb3RfY2hhbmdlcyxcblx0Z2V0X3Nsb3RfY29udGV4dF9mblxuKSB7XG5cdGlmIChzbG90X2NoYW5nZXMpIHtcblx0XHRjb25zdCBzbG90X2NvbnRleHQgPSBnZXRfc2xvdF9jb250ZXh0KHNsb3RfZGVmaW5pdGlvbiwgY3R4LCAkJHNjb3BlLCBnZXRfc2xvdF9jb250ZXh0X2ZuKTtcblx0XHRzbG90LnAoc2xvdF9jb250ZXh0LCBzbG90X2NoYW5nZXMpO1xuXHR9XG59XG5cbi8qKiBAcmV0dXJucyB7dm9pZH0gKi9cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVfc2xvdChcblx0c2xvdCxcblx0c2xvdF9kZWZpbml0aW9uLFxuXHRjdHgsXG5cdCQkc2NvcGUsXG5cdGRpcnR5LFxuXHRnZXRfc2xvdF9jaGFuZ2VzX2ZuLFxuXHRnZXRfc2xvdF9jb250ZXh0X2ZuXG4pIHtcblx0Y29uc3Qgc2xvdF9jaGFuZ2VzID0gZ2V0X3Nsb3RfY2hhbmdlcyhzbG90X2RlZmluaXRpb24sICQkc2NvcGUsIGRpcnR5LCBnZXRfc2xvdF9jaGFuZ2VzX2ZuKTtcblx0dXBkYXRlX3Nsb3RfYmFzZShzbG90LCBzbG90X2RlZmluaXRpb24sIGN0eCwgJCRzY29wZSwgc2xvdF9jaGFuZ2VzLCBnZXRfc2xvdF9jb250ZXh0X2ZuKTtcbn1cblxuLyoqIEByZXR1cm5zIHthbnlbXSB8IC0xfSAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldF9hbGxfZGlydHlfZnJvbV9zY29wZSgkJHNjb3BlKSB7XG5cdGlmICgkJHNjb3BlLmN0eC5sZW5ndGggPiAzMikge1xuXHRcdGNvbnN0IGRpcnR5ID0gW107XG5cdFx0Y29uc3QgbGVuZ3RoID0gJCRzY29wZS5jdHgubGVuZ3RoIC8gMzI7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuXHRcdFx0ZGlydHlbaV0gPSAtMTtcblx0XHR9XG5cdFx0cmV0dXJuIGRpcnR5O1xuXHR9XG5cdHJldHVybiAtMTtcbn1cblxuLyoqIEByZXR1cm5zIHt7fX0gKi9cbmV4cG9ydCBmdW5jdGlvbiBleGNsdWRlX2ludGVybmFsX3Byb3BzKHByb3BzKSB7XG5cdGNvbnN0IHJlc3VsdCA9IHt9O1xuXHRmb3IgKGNvbnN0IGsgaW4gcHJvcHMpIGlmIChrWzBdICE9PSAnJCcpIHJlc3VsdFtrXSA9IHByb3BzW2tdO1xuXHRyZXR1cm4gcmVzdWx0O1xufVxuXG4vKiogQHJldHVybnMge3t9fSAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbXB1dGVfcmVzdF9wcm9wcyhwcm9wcywga2V5cykge1xuXHRjb25zdCByZXN0ID0ge307XG5cdGtleXMgPSBuZXcgU2V0KGtleXMpO1xuXHRmb3IgKGNvbnN0IGsgaW4gcHJvcHMpIGlmICgha2V5cy5oYXMoaykgJiYga1swXSAhPT0gJyQnKSByZXN0W2tdID0gcHJvcHNba107XG5cdHJldHVybiByZXN0O1xufVxuXG4vKiogQHJldHVybnMge3t9fSAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbXB1dGVfc2xvdHMoc2xvdHMpIHtcblx0Y29uc3QgcmVzdWx0ID0ge307XG5cdGZvciAoY29uc3Qga2V5IGluIHNsb3RzKSB7XG5cdFx0cmVzdWx0W2tleV0gPSB0cnVlO1xuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59XG5cbi8qKiBAcmV0dXJucyB7KHRoaXM6IGFueSwgLi4uYXJnczogYW55W10pID0+IHZvaWR9ICovXG5leHBvcnQgZnVuY3Rpb24gb25jZShmbikge1xuXHRsZXQgcmFuID0gZmFsc2U7XG5cdHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdGlmIChyYW4pIHJldHVybjtcblx0XHRyYW4gPSB0cnVlO1xuXHRcdGZuLmNhbGwodGhpcywgLi4uYXJncyk7XG5cdH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBudWxsX3RvX2VtcHR5KHZhbHVlKSB7XG5cdHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiB2YWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldF9zdG9yZV92YWx1ZShzdG9yZSwgcmV0LCB2YWx1ZSkge1xuXHRzdG9yZS5zZXQodmFsdWUpO1xuXHRyZXR1cm4gcmV0O1xufVxuXG5leHBvcnQgY29uc3QgaGFzX3Byb3AgPSAob2JqLCBwcm9wKSA9PiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGFjdGlvbl9kZXN0cm95ZXIoYWN0aW9uX3Jlc3VsdCkge1xuXHRyZXR1cm4gYWN0aW9uX3Jlc3VsdCAmJiBpc19mdW5jdGlvbihhY3Rpb25fcmVzdWx0LmRlc3Ryb3kpID8gYWN0aW9uX3Jlc3VsdC5kZXN0cm95IDogbm9vcDtcbn1cblxuLyoqIEBwYXJhbSB7bnVtYmVyIHwgc3RyaW5nfSB2YWx1ZVxuICogQHJldHVybnMge1tudW1iZXIsIHN0cmluZ119XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzcGxpdF9jc3NfdW5pdCh2YWx1ZSkge1xuXHRjb25zdCBzcGxpdCA9IHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgdmFsdWUubWF0Y2goL15cXHMqKC0/W1xcZC5dKykoW15cXHNdKilcXHMqJC8pO1xuXHRyZXR1cm4gc3BsaXQgPyBbcGFyc2VGbG9hdChzcGxpdFsxXSksIHNwbGl0WzJdIHx8ICdweCddIDogWy8qKiBAdHlwZSB7bnVtYmVyfSAqLyAodmFsdWUpLCAncHgnXTtcbn1cblxuZXhwb3J0IGNvbnN0IGNvbnRlbnRlZGl0YWJsZV90cnV0aHlfdmFsdWVzID0gWycnLCB0cnVlLCAxLCAndHJ1ZScsICdjb250ZW50ZWRpdGFibGUnXTtcbiIsICIvKiogQHR5cGUge3R5cGVvZiBnbG9iYWxUaGlzfSAqL1xuZXhwb3J0IGNvbnN0IGdsb2JhbHMgPVxuXHR0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJ1xuXHRcdD8gd2luZG93XG5cdFx0OiB0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gJ3VuZGVmaW5lZCdcblx0XHQ/IGdsb2JhbFRoaXNcblx0XHQ6IC8vIEB0cy1pZ25vcmUgTm9kZSB0eXBpbmdzIGhhdmUgdGhpc1xuXHRcdCAgZ2xvYmFsO1xuIiwgImltcG9ydCB7IGdsb2JhbHMgfSBmcm9tICcuL2dsb2JhbHMuanMnO1xuXG4vKipcbiAqIFJlc2l6ZSBvYnNlcnZlciBzaW5nbGV0b24uXG4gKiBPbmUgbGlzdGVuZXIgcGVyIGVsZW1lbnQgb25seSFcbiAqIGh0dHBzOi8vZ3JvdXBzLmdvb2dsZS5jb20vYS9jaHJvbWl1bS5vcmcvZy9ibGluay1kZXYvYy96Nmllbk9OVWI1QS9tL0Y1LVZjVVp0QkFBSlxuICovXG5leHBvcnQgY2xhc3MgUmVzaXplT2JzZXJ2ZXJTaW5nbGV0b24ge1xuXHQvKipcblx0ICogQHByaXZhdGVcblx0ICogQHJlYWRvbmx5XG5cdCAqIEB0eXBlIHtXZWFrTWFwPEVsZW1lbnQsIGltcG9ydCgnLi9wcml2YXRlLmpzJykuTGlzdGVuZXI+fVxuXHQgKi9cblx0X2xpc3RlbmVycyA9ICdXZWFrTWFwJyBpbiBnbG9iYWxzID8gbmV3IFdlYWtNYXAoKSA6IHVuZGVmaW5lZDtcblxuXHQvKipcblx0ICogQHByaXZhdGVcblx0ICogQHR5cGUge1Jlc2l6ZU9ic2VydmVyfVxuXHQgKi9cblx0X29ic2VydmVyID0gdW5kZWZpbmVkO1xuXG5cdC8qKiBAdHlwZSB7UmVzaXplT2JzZXJ2ZXJPcHRpb25zfSAqL1xuXHRvcHRpb25zO1xuXG5cdC8qKiBAcGFyYW0ge1Jlc2l6ZU9ic2VydmVyT3B0aW9uc30gb3B0aW9ucyAqL1xuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG5cdFx0dGhpcy5vcHRpb25zID0gb3B0aW9ucztcblx0fVxuXG5cdC8qKlxuXHQgKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnRcblx0ICogQHBhcmFtIHtpbXBvcnQoJy4vcHJpdmF0ZS5qcycpLkxpc3RlbmVyfSBsaXN0ZW5lclxuXHQgKiBAcmV0dXJucyB7KCkgPT4gdm9pZH1cblx0ICovXG5cdG9ic2VydmUoZWxlbWVudCwgbGlzdGVuZXIpIHtcblx0XHR0aGlzLl9saXN0ZW5lcnMuc2V0KGVsZW1lbnQsIGxpc3RlbmVyKTtcblx0XHR0aGlzLl9nZXRPYnNlcnZlcigpLm9ic2VydmUoZWxlbWVudCwgdGhpcy5vcHRpb25zKTtcblx0XHRyZXR1cm4gKCkgPT4ge1xuXHRcdFx0dGhpcy5fbGlzdGVuZXJzLmRlbGV0ZShlbGVtZW50KTtcblx0XHRcdHRoaXMuX29ic2VydmVyLnVub2JzZXJ2ZShlbGVtZW50KTsgLy8gdGhpcyBsaW5lIGNhbiBwcm9iYWJseSBiZSByZW1vdmVkXG5cdFx0fTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0X2dldE9ic2VydmVyKCkge1xuXHRcdHJldHVybiAoXG5cdFx0XHR0aGlzLl9vYnNlcnZlciA/P1xuXHRcdFx0KHRoaXMuX29ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKChlbnRyaWVzKSA9PiB7XG5cdFx0XHRcdGZvciAoY29uc3QgZW50cnkgb2YgZW50cmllcykge1xuXHRcdFx0XHRcdFJlc2l6ZU9ic2VydmVyU2luZ2xldG9uLmVudHJpZXMuc2V0KGVudHJ5LnRhcmdldCwgZW50cnkpO1xuXHRcdFx0XHRcdHRoaXMuX2xpc3RlbmVycy5nZXQoZW50cnkudGFyZ2V0KT8uKGVudHJ5KTtcblx0XHRcdFx0fVxuXHRcdFx0fSkpXG5cdFx0KTtcblx0fVxufVxuXG4vLyBOZWVkcyB0byBiZSB3cml0dGVuIGxpa2UgdGhpcyB0byBwYXNzIHRoZSB0cmVlLXNoYWtlLXRlc3RcblJlc2l6ZU9ic2VydmVyU2luZ2xldG9uLmVudHJpZXMgPSAnV2Vha01hcCcgaW4gZ2xvYmFscyA/IG5ldyBXZWFrTWFwKCkgOiB1bmRlZmluZWQ7XG4iLCAiaW1wb3J0IHsgY29udGVudGVkaXRhYmxlX3RydXRoeV92YWx1ZXMsIGhhc19wcm9wIH0gZnJvbSAnLi91dGlscy5qcyc7XG5cbmltcG9ydCB7IFJlc2l6ZU9ic2VydmVyU2luZ2xldG9uIH0gZnJvbSAnLi9SZXNpemVPYnNlcnZlclNpbmdsZXRvbi5qcyc7XG5cbi8vIFRyYWNrIHdoaWNoIG5vZGVzIGFyZSBjbGFpbWVkIGR1cmluZyBoeWRyYXRpb24uIFVuY2xhaW1lZCBub2RlcyBjYW4gdGhlbiBiZSByZW1vdmVkIGZyb20gdGhlIERPTVxuLy8gYXQgdGhlIGVuZCBvZiBoeWRyYXRpb24gd2l0aG91dCB0b3VjaGluZyB0aGUgcmVtYWluaW5nIG5vZGVzLlxubGV0IGlzX2h5ZHJhdGluZyA9IGZhbHNlO1xuXG4vKipcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gc3RhcnRfaHlkcmF0aW5nKCkge1xuXHRpc19oeWRyYXRpbmcgPSB0cnVlO1xufVxuXG4vKipcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZW5kX2h5ZHJhdGluZygpIHtcblx0aXNfaHlkcmF0aW5nID0gZmFsc2U7XG59XG5cbi8qKlxuICogQHBhcmFtIHtudW1iZXJ9IGxvd1xuICogQHBhcmFtIHtudW1iZXJ9IGhpZ2hcbiAqIEBwYXJhbSB7KGluZGV4OiBudW1iZXIpID0+IG51bWJlcn0ga2V5XG4gKiBAcGFyYW0ge251bWJlcn0gdmFsdWVcbiAqIEByZXR1cm5zIHtudW1iZXJ9XG4gKi9cbmZ1bmN0aW9uIHVwcGVyX2JvdW5kKGxvdywgaGlnaCwga2V5LCB2YWx1ZSkge1xuXHQvLyBSZXR1cm4gZmlyc3QgaW5kZXggb2YgdmFsdWUgbGFyZ2VyIHRoYW4gaW5wdXQgdmFsdWUgaW4gdGhlIHJhbmdlIFtsb3csIGhpZ2gpXG5cdHdoaWxlIChsb3cgPCBoaWdoKSB7XG5cdFx0Y29uc3QgbWlkID0gbG93ICsgKChoaWdoIC0gbG93KSA+PiAxKTtcblx0XHRpZiAoa2V5KG1pZCkgPD0gdmFsdWUpIHtcblx0XHRcdGxvdyA9IG1pZCArIDE7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGhpZ2ggPSBtaWQ7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBsb3c7XG59XG5cbi8qKlxuICogQHBhcmFtIHtOb2RlRXh9IHRhcmdldFxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmZ1bmN0aW9uIGluaXRfaHlkcmF0ZSh0YXJnZXQpIHtcblx0aWYgKHRhcmdldC5oeWRyYXRlX2luaXQpIHJldHVybjtcblx0dGFyZ2V0Lmh5ZHJhdGVfaW5pdCA9IHRydWU7XG5cdC8vIFdlIGtub3cgdGhhdCBhbGwgY2hpbGRyZW4gaGF2ZSBjbGFpbV9vcmRlciB2YWx1ZXMgc2luY2UgdGhlIHVuY2xhaW1lZCBoYXZlIGJlZW4gZGV0YWNoZWQgaWYgdGFyZ2V0IGlzIG5vdCA8aGVhZD5cblxuXHRsZXQgY2hpbGRyZW4gPSAvKiogQHR5cGUge0FycmF5TGlrZTxOb2RlRXgyPn0gKi8gKHRhcmdldC5jaGlsZE5vZGVzKTtcblx0Ly8gSWYgdGFyZ2V0IGlzIDxoZWFkPiwgdGhlcmUgbWF5IGJlIGNoaWxkcmVuIHdpdGhvdXQgY2xhaW1fb3JkZXJcblx0aWYgKHRhcmdldC5ub2RlTmFtZSA9PT0gJ0hFQUQnKSB7XG5cdFx0Y29uc3QgbXlfY2hpbGRyZW4gPSBbXTtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRjb25zdCBub2RlID0gY2hpbGRyZW5baV07XG5cdFx0XHRpZiAobm9kZS5jbGFpbV9vcmRlciAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdG15X2NoaWxkcmVuLnB1c2gobm9kZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGNoaWxkcmVuID0gbXlfY2hpbGRyZW47XG5cdH1cblx0Lypcblx0ICogUmVvcmRlciBjbGFpbWVkIGNoaWxkcmVuIG9wdGltYWxseS5cblx0ICogV2UgY2FuIHJlb3JkZXIgY2xhaW1lZCBjaGlsZHJlbiBvcHRpbWFsbHkgYnkgZmluZGluZyB0aGUgbG9uZ2VzdCBzdWJzZXF1ZW5jZSBvZlxuXHQgKiBub2RlcyB0aGF0IGFyZSBhbHJlYWR5IGNsYWltZWQgaW4gb3JkZXIgYW5kIG9ubHkgbW92aW5nIHRoZSByZXN0LiBUaGUgbG9uZ2VzdFxuXHQgKiBzdWJzZXF1ZW5jZSBvZiBub2RlcyB0aGF0IGFyZSBjbGFpbWVkIGluIG9yZGVyIGNhbiBiZSBmb3VuZCBieVxuXHQgKiBjb21wdXRpbmcgdGhlIGxvbmdlc3QgaW5jcmVhc2luZyBzdWJzZXF1ZW5jZSBvZiAuY2xhaW1fb3JkZXIgdmFsdWVzLlxuXHQgKlxuXHQgKiBUaGlzIGFsZ29yaXRobSBpcyBvcHRpbWFsIGluIGdlbmVyYXRpbmcgdGhlIGxlYXN0IGFtb3VudCBvZiByZW9yZGVyIG9wZXJhdGlvbnNcblx0ICogcG9zc2libGUuXG5cdCAqXG5cdCAqIFByb29mOlxuXHQgKiBXZSBrbm93IHRoYXQsIGdpdmVuIGEgc2V0IG9mIHJlb3JkZXJpbmcgb3BlcmF0aW9ucywgdGhlIG5vZGVzIHRoYXQgZG8gbm90IG1vdmVcblx0ICogYWx3YXlzIGZvcm0gYW4gaW5jcmVhc2luZyBzdWJzZXF1ZW5jZSwgc2luY2UgdGhleSBkbyBub3QgbW92ZSBhbW9uZyBlYWNoIG90aGVyXG5cdCAqIG1lYW5pbmcgdGhhdCB0aGV5IG11c3QgYmUgYWxyZWFkeSBvcmRlcmVkIGFtb25nIGVhY2ggb3RoZXIuIFRodXMsIHRoZSBtYXhpbWFsXG5cdCAqIHNldCBvZiBub2RlcyB0aGF0IGRvIG5vdCBtb3ZlIGZvcm0gYSBsb25nZXN0IGluY3JlYXNpbmcgc3Vic2VxdWVuY2UuXG5cdCAqL1xuXHQvLyBDb21wdXRlIGxvbmdlc3QgaW5jcmVhc2luZyBzdWJzZXF1ZW5jZVxuXHQvLyBtOiBzdWJzZXF1ZW5jZSBsZW5ndGggaiA9PiBpbmRleCBrIG9mIHNtYWxsZXN0IHZhbHVlIHRoYXQgZW5kcyBhbiBpbmNyZWFzaW5nIHN1YnNlcXVlbmNlIG9mIGxlbmd0aCBqXG5cdGNvbnN0IG0gPSBuZXcgSW50MzJBcnJheShjaGlsZHJlbi5sZW5ndGggKyAxKTtcblx0Ly8gUHJlZGVjZXNzb3IgaW5kaWNlcyArIDFcblx0Y29uc3QgcCA9IG5ldyBJbnQzMkFycmF5KGNoaWxkcmVuLmxlbmd0aCk7XG5cdG1bMF0gPSAtMTtcblx0bGV0IGxvbmdlc3QgPSAwO1xuXHRmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y29uc3QgY3VycmVudCA9IGNoaWxkcmVuW2ldLmNsYWltX29yZGVyO1xuXHRcdC8vIEZpbmQgdGhlIGxhcmdlc3Qgc3Vic2VxdWVuY2UgbGVuZ3RoIHN1Y2ggdGhhdCBpdCBlbmRzIGluIGEgdmFsdWUgbGVzcyB0aGFuIG91ciBjdXJyZW50IHZhbHVlXG5cdFx0Ly8gdXBwZXJfYm91bmQgcmV0dXJucyBmaXJzdCBncmVhdGVyIHZhbHVlLCBzbyB3ZSBzdWJ0cmFjdCBvbmVcblx0XHQvLyB3aXRoIGZhc3QgcGF0aCBmb3Igd2hlbiB3ZSBhcmUgb24gdGhlIGN1cnJlbnQgbG9uZ2VzdCBzdWJzZXF1ZW5jZVxuXHRcdGNvbnN0IHNlcV9sZW4gPVxuXHRcdFx0KGxvbmdlc3QgPiAwICYmIGNoaWxkcmVuW21bbG9uZ2VzdF1dLmNsYWltX29yZGVyIDw9IGN1cnJlbnRcblx0XHRcdFx0PyBsb25nZXN0ICsgMVxuXHRcdFx0XHQ6IHVwcGVyX2JvdW5kKDEsIGxvbmdlc3QsIChpZHgpID0+IGNoaWxkcmVuW21baWR4XV0uY2xhaW1fb3JkZXIsIGN1cnJlbnQpKSAtIDE7XG5cdFx0cFtpXSA9IG1bc2VxX2xlbl0gKyAxO1xuXHRcdGNvbnN0IG5ld19sZW4gPSBzZXFfbGVuICsgMTtcblx0XHQvLyBXZSBjYW4gZ3VhcmFudGVlIHRoYXQgY3VycmVudCBpcyB0aGUgc21hbGxlc3QgdmFsdWUuIE90aGVyd2lzZSwgd2Ugd291bGQgaGF2ZSBnZW5lcmF0ZWQgYSBsb25nZXIgc2VxdWVuY2UuXG5cdFx0bVtuZXdfbGVuXSA9IGk7XG5cdFx0bG9uZ2VzdCA9IE1hdGgubWF4KG5ld19sZW4sIGxvbmdlc3QpO1xuXHR9XG5cdC8vIFRoZSBsb25nZXN0IGluY3JlYXNpbmcgc3Vic2VxdWVuY2Ugb2Ygbm9kZXMgKGluaXRpYWxseSByZXZlcnNlZClcblxuXHQvKipcblx0ICogQHR5cGUge05vZGVFeDJbXX1cblx0ICovXG5cdGNvbnN0IGxpcyA9IFtdO1xuXHQvLyBUaGUgcmVzdCBvZiB0aGUgbm9kZXMsIG5vZGVzIHRoYXQgd2lsbCBiZSBtb3ZlZFxuXG5cdC8qKlxuXHQgKiBAdHlwZSB7Tm9kZUV4MltdfVxuXHQgKi9cblx0Y29uc3QgdG9fbW92ZSA9IFtdO1xuXHRsZXQgbGFzdCA9IGNoaWxkcmVuLmxlbmd0aCAtIDE7XG5cdGZvciAobGV0IGN1ciA9IG1bbG9uZ2VzdF0gKyAxOyBjdXIgIT0gMDsgY3VyID0gcFtjdXIgLSAxXSkge1xuXHRcdGxpcy5wdXNoKGNoaWxkcmVuW2N1ciAtIDFdKTtcblx0XHRmb3IgKDsgbGFzdCA+PSBjdXI7IGxhc3QtLSkge1xuXHRcdFx0dG9fbW92ZS5wdXNoKGNoaWxkcmVuW2xhc3RdKTtcblx0XHR9XG5cdFx0bGFzdC0tO1xuXHR9XG5cdGZvciAoOyBsYXN0ID49IDA7IGxhc3QtLSkge1xuXHRcdHRvX21vdmUucHVzaChjaGlsZHJlbltsYXN0XSk7XG5cdH1cblx0bGlzLnJldmVyc2UoKTtcblx0Ly8gV2Ugc29ydCB0aGUgbm9kZXMgYmVpbmcgbW92ZWQgdG8gZ3VhcmFudGVlIHRoYXQgdGhlaXIgaW5zZXJ0aW9uIG9yZGVyIG1hdGNoZXMgdGhlIGNsYWltIG9yZGVyXG5cdHRvX21vdmUuc29ydCgoYSwgYikgPT4gYS5jbGFpbV9vcmRlciAtIGIuY2xhaW1fb3JkZXIpO1xuXHQvLyBGaW5hbGx5LCB3ZSBtb3ZlIHRoZSBub2Rlc1xuXHRmb3IgKGxldCBpID0gMCwgaiA9IDA7IGkgPCB0b19tb3ZlLmxlbmd0aDsgaSsrKSB7XG5cdFx0d2hpbGUgKGogPCBsaXMubGVuZ3RoICYmIHRvX21vdmVbaV0uY2xhaW1fb3JkZXIgPj0gbGlzW2pdLmNsYWltX29yZGVyKSB7XG5cdFx0XHRqKys7XG5cdFx0fVxuXHRcdGNvbnN0IGFuY2hvciA9IGogPCBsaXMubGVuZ3RoID8gbGlzW2pdIDogbnVsbDtcblx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHRvX21vdmVbaV0sIGFuY2hvcik7XG5cdH1cbn1cblxuLyoqXG4gKiBAcGFyYW0ge05vZGV9IHRhcmdldFxuICogQHBhcmFtIHtOb2RlfSBub2RlXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFwcGVuZCh0YXJnZXQsIG5vZGUpIHtcblx0dGFyZ2V0LmFwcGVuZENoaWxkKG5vZGUpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7Tm9kZX0gdGFyZ2V0XG4gKiBAcGFyYW0ge3N0cmluZ30gc3R5bGVfc2hlZXRfaWRcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHlsZXNcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gYXBwZW5kX3N0eWxlcyh0YXJnZXQsIHN0eWxlX3NoZWV0X2lkLCBzdHlsZXMpIHtcblx0Y29uc3QgYXBwZW5kX3N0eWxlc190byA9IGdldF9yb290X2Zvcl9zdHlsZSh0YXJnZXQpO1xuXHRpZiAoIWFwcGVuZF9zdHlsZXNfdG8uZ2V0RWxlbWVudEJ5SWQoc3R5bGVfc2hlZXRfaWQpKSB7XG5cdFx0Y29uc3Qgc3R5bGUgPSBlbGVtZW50KCdzdHlsZScpO1xuXHRcdHN0eWxlLmlkID0gc3R5bGVfc2hlZXRfaWQ7XG5cdFx0c3R5bGUudGV4dENvbnRlbnQgPSBzdHlsZXM7XG5cdFx0YXBwZW5kX3N0eWxlc2hlZXQoYXBwZW5kX3N0eWxlc190bywgc3R5bGUpO1xuXHR9XG59XG5cbi8qKlxuICogQHBhcmFtIHtOb2RlfSBub2RlXG4gKiBAcmV0dXJucyB7U2hhZG93Um9vdCB8IERvY3VtZW50fVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0X3Jvb3RfZm9yX3N0eWxlKG5vZGUpIHtcblx0aWYgKCFub2RlKSByZXR1cm4gZG9jdW1lbnQ7XG5cdGNvbnN0IHJvb3QgPSBub2RlLmdldFJvb3ROb2RlID8gbm9kZS5nZXRSb290Tm9kZSgpIDogbm9kZS5vd25lckRvY3VtZW50O1xuXHRpZiAocm9vdCAmJiAvKiogQHR5cGUge1NoYWRvd1Jvb3R9ICovIChyb290KS5ob3N0KSB7XG5cdFx0cmV0dXJuIC8qKiBAdHlwZSB7U2hhZG93Um9vdH0gKi8gKHJvb3QpO1xuXHR9XG5cdHJldHVybiBub2RlLm93bmVyRG9jdW1lbnQ7XG59XG5cbi8qKlxuICogQHBhcmFtIHtOb2RlfSBub2RlXG4gKiBAcmV0dXJucyB7Q1NTU3R5bGVTaGVldH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFwcGVuZF9lbXB0eV9zdHlsZXNoZWV0KG5vZGUpIHtcblx0Y29uc3Qgc3R5bGVfZWxlbWVudCA9IGVsZW1lbnQoJ3N0eWxlJyk7XG5cdC8vIEZvciB0cmFuc2l0aW9ucyB0byB3b3JrIHdpdGhvdXQgJ3N0eWxlLXNyYzogdW5zYWZlLWlubGluZScgQ29udGVudCBTZWN1cml0eSBQb2xpY3ksXG5cdC8vIHRoZXNlIGVtcHR5IHRhZ3MgbmVlZCB0byBiZSBhbGxvd2VkIHdpdGggYSBoYXNoIGFzIGEgd29ya2Fyb3VuZCB1bnRpbCB3ZSBtb3ZlIHRvIHRoZSBXZWIgQW5pbWF0aW9ucyBBUEkuXG5cdC8vIFVzaW5nIHRoZSBoYXNoIGZvciB0aGUgZW1wdHkgc3RyaW5nIChmb3IgYW4gZW1wdHkgdGFnKSB3b3JrcyBpbiBhbGwgYnJvd3NlcnMgZXhjZXB0IFNhZmFyaS5cblx0Ly8gU28gYXMgYSB3b3JrYXJvdW5kIGZvciB0aGUgd29ya2Fyb3VuZCwgd2hlbiB3ZSBhcHBlbmQgZW1wdHkgc3R5bGUgdGFncyB3ZSBzZXQgdGhlaXIgY29udGVudCB0byAvKiBlbXB0eSAqLy5cblx0Ly8gVGhlIGhhc2ggJ3NoYTI1Ni05T2xOTzBETkVlYVZ6SEw0Ulp3Q0xzQkhBOFdCUTh0b0JwLzRGNVhWMm5jPScgd2lsbCB0aGVuIHdvcmsgZXZlbiBpbiBTYWZhcmkuXG5cdHN0eWxlX2VsZW1lbnQudGV4dENvbnRlbnQgPSAnLyogZW1wdHkgKi8nO1xuXHRhcHBlbmRfc3R5bGVzaGVldChnZXRfcm9vdF9mb3Jfc3R5bGUobm9kZSksIHN0eWxlX2VsZW1lbnQpO1xuXHRyZXR1cm4gc3R5bGVfZWxlbWVudC5zaGVldDtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge1NoYWRvd1Jvb3QgfCBEb2N1bWVudH0gbm9kZVxuICogQHBhcmFtIHtIVE1MU3R5bGVFbGVtZW50fSBzdHlsZVxuICogQHJldHVybnMge0NTU1N0eWxlU2hlZXR9XG4gKi9cbmZ1bmN0aW9uIGFwcGVuZF9zdHlsZXNoZWV0KG5vZGUsIHN0eWxlKSB7XG5cdGFwcGVuZCgvKiogQHR5cGUge0RvY3VtZW50fSAqLyAobm9kZSkuaGVhZCB8fCBub2RlLCBzdHlsZSk7XG5cdHJldHVybiBzdHlsZS5zaGVldDtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge05vZGVFeH0gdGFyZ2V0XG4gKiBAcGFyYW0ge05vZGVFeH0gbm9kZVxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhcHBlbmRfaHlkcmF0aW9uKHRhcmdldCwgbm9kZSkge1xuXHRpZiAoaXNfaHlkcmF0aW5nKSB7XG5cdFx0aW5pdF9oeWRyYXRlKHRhcmdldCk7XG5cdFx0aWYgKFxuXHRcdFx0dGFyZ2V0LmFjdHVhbF9lbmRfY2hpbGQgPT09IHVuZGVmaW5lZCB8fFxuXHRcdFx0KHRhcmdldC5hY3R1YWxfZW5kX2NoaWxkICE9PSBudWxsICYmIHRhcmdldC5hY3R1YWxfZW5kX2NoaWxkLnBhcmVudE5vZGUgIT09IHRhcmdldClcblx0XHQpIHtcblx0XHRcdHRhcmdldC5hY3R1YWxfZW5kX2NoaWxkID0gdGFyZ2V0LmZpcnN0Q2hpbGQ7XG5cdFx0fVxuXHRcdC8vIFNraXAgbm9kZXMgb2YgdW5kZWZpbmVkIG9yZGVyaW5nXG5cdFx0d2hpbGUgKHRhcmdldC5hY3R1YWxfZW5kX2NoaWxkICE9PSBudWxsICYmIHRhcmdldC5hY3R1YWxfZW5kX2NoaWxkLmNsYWltX29yZGVyID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHRhcmdldC5hY3R1YWxfZW5kX2NoaWxkID0gdGFyZ2V0LmFjdHVhbF9lbmRfY2hpbGQubmV4dFNpYmxpbmc7XG5cdFx0fVxuXHRcdGlmIChub2RlICE9PSB0YXJnZXQuYWN0dWFsX2VuZF9jaGlsZCkge1xuXHRcdFx0Ly8gV2Ugb25seSBpbnNlcnQgaWYgdGhlIG9yZGVyaW5nIG9mIHRoaXMgbm9kZSBzaG91bGQgYmUgbW9kaWZpZWQgb3IgdGhlIHBhcmVudCBub2RlIGlzIG5vdCB0YXJnZXRcblx0XHRcdGlmIChub2RlLmNsYWltX29yZGVyICE9PSB1bmRlZmluZWQgfHwgbm9kZS5wYXJlbnROb2RlICE9PSB0YXJnZXQpIHtcblx0XHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShub2RlLCB0YXJnZXQuYWN0dWFsX2VuZF9jaGlsZCk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRhcmdldC5hY3R1YWxfZW5kX2NoaWxkID0gbm9kZS5uZXh0U2libGluZztcblx0XHR9XG5cdH0gZWxzZSBpZiAobm9kZS5wYXJlbnROb2RlICE9PSB0YXJnZXQgfHwgbm9kZS5uZXh0U2libGluZyAhPT0gbnVsbCkge1xuXHRcdHRhcmdldC5hcHBlbmRDaGlsZChub2RlKTtcblx0fVxufVxuXG4vKipcbiAqIEBwYXJhbSB7Tm9kZX0gdGFyZ2V0XG4gKiBAcGFyYW0ge05vZGV9IG5vZGVcbiAqIEBwYXJhbSB7Tm9kZX0gW2FuY2hvcl1cbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gaW5zZXJ0KHRhcmdldCwgbm9kZSwgYW5jaG9yKSB7XG5cdHRhcmdldC5pbnNlcnRCZWZvcmUobm9kZSwgYW5jaG9yIHx8IG51bGwpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7Tm9kZUV4fSB0YXJnZXRcbiAqIEBwYXJhbSB7Tm9kZUV4fSBub2RlXG4gKiBAcGFyYW0ge05vZGVFeH0gW2FuY2hvcl1cbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gaW5zZXJ0X2h5ZHJhdGlvbih0YXJnZXQsIG5vZGUsIGFuY2hvcikge1xuXHRpZiAoaXNfaHlkcmF0aW5nICYmICFhbmNob3IpIHtcblx0XHRhcHBlbmRfaHlkcmF0aW9uKHRhcmdldCwgbm9kZSk7XG5cdH0gZWxzZSBpZiAobm9kZS5wYXJlbnROb2RlICE9PSB0YXJnZXQgfHwgbm9kZS5uZXh0U2libGluZyAhPSBhbmNob3IpIHtcblx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKG5vZGUsIGFuY2hvciB8fCBudWxsKTtcblx0fVxufVxuXG4vKipcbiAqIEBwYXJhbSB7Tm9kZX0gbm9kZVxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZXRhY2gobm9kZSkge1xuXHRpZiAobm9kZS5wYXJlbnROb2RlKSB7XG5cdFx0bm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGUpO1xuXHR9XG59XG5cbi8qKlxuICogQHJldHVybnMge3ZvaWR9ICovXG5leHBvcnQgZnVuY3Rpb24gZGVzdHJveV9lYWNoKGl0ZXJhdGlvbnMsIGRldGFjaGluZykge1xuXHRmb3IgKGxldCBpID0gMDsgaSA8IGl0ZXJhdGlvbnMubGVuZ3RoOyBpICs9IDEpIHtcblx0XHRpZiAoaXRlcmF0aW9uc1tpXSkgaXRlcmF0aW9uc1tpXS5kKGRldGFjaGluZyk7XG5cdH1cbn1cblxuLyoqXG4gKiBAdGVtcGxhdGUge2tleW9mIEhUTUxFbGVtZW50VGFnTmFtZU1hcH0gS1xuICogQHBhcmFtIHtLfSBuYW1lXG4gKiBAcmV0dXJucyB7SFRNTEVsZW1lbnRUYWdOYW1lTWFwW0tdfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZWxlbWVudChuYW1lKSB7XG5cdHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KG5hbWUpO1xufVxuXG4vKipcbiAqIEB0ZW1wbGF0ZSB7a2V5b2YgSFRNTEVsZW1lbnRUYWdOYW1lTWFwfSBLXG4gKiBAcGFyYW0ge0t9IG5hbWVcbiAqIEBwYXJhbSB7c3RyaW5nfSBpc1xuICogQHJldHVybnMge0hUTUxFbGVtZW50VGFnTmFtZU1hcFtLXX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVsZW1lbnRfaXMobmFtZSwgaXMpIHtcblx0cmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobmFtZSwgeyBpcyB9KTtcbn1cblxuLyoqXG4gKiBAdGVtcGxhdGUgVFxuICogQHRlbXBsYXRlIHtrZXlvZiBUfSBLXG4gKiBAcGFyYW0ge1R9IG9ialxuICogQHBhcmFtIHtLW119IGV4Y2x1ZGVcbiAqIEByZXR1cm5zIHtQaWNrPFQsIEV4Y2x1ZGU8a2V5b2YgVCwgSz4+fVxuICovXG5leHBvcnQgZnVuY3Rpb24gb2JqZWN0X3dpdGhvdXRfcHJvcGVydGllcyhvYmosIGV4Y2x1ZGUpIHtcblx0Y29uc3QgdGFyZ2V0ID0gLyoqIEB0eXBlIHtQaWNrPFQsIEV4Y2x1ZGU8a2V5b2YgVCwgSz4+fSAqLyAoe30pO1xuXHRmb3IgKGNvbnN0IGsgaW4gb2JqKSB7XG5cdFx0aWYgKFxuXHRcdFx0aGFzX3Byb3Aob2JqLCBrKSAmJlxuXHRcdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdFx0ZXhjbHVkZS5pbmRleE9mKGspID09PSAtMVxuXHRcdCkge1xuXHRcdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdFx0dGFyZ2V0W2tdID0gb2JqW2tdO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gdGFyZ2V0O1xufVxuXG4vKipcbiAqIEB0ZW1wbGF0ZSB7a2V5b2YgU1ZHRWxlbWVudFRhZ05hbWVNYXB9IEtcbiAqIEBwYXJhbSB7S30gbmFtZVxuICogQHJldHVybnMge1NWR0VsZW1lbnR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdmdfZWxlbWVudChuYW1lKSB7XG5cdHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgbmFtZSk7XG59XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IGRhdGFcbiAqIEByZXR1cm5zIHtUZXh0fVxuICovXG5leHBvcnQgZnVuY3Rpb24gdGV4dChkYXRhKSB7XG5cdHJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShkYXRhKTtcbn1cblxuLyoqXG4gKiBAcmV0dXJucyB7VGV4dH0gKi9cbmV4cG9ydCBmdW5jdGlvbiBzcGFjZSgpIHtcblx0cmV0dXJuIHRleHQoJyAnKTtcbn1cblxuLyoqXG4gKiBAcmV0dXJucyB7VGV4dH0gKi9cbmV4cG9ydCBmdW5jdGlvbiBlbXB0eSgpIHtcblx0cmV0dXJuIHRleHQoJycpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb250ZW50XG4gKiBAcmV0dXJucyB7Q29tbWVudH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbW1lbnQoY29udGVudCkge1xuXHRyZXR1cm4gZG9jdW1lbnQuY3JlYXRlQ29tbWVudChjb250ZW50KTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0V2ZW50VGFyZ2V0fSBub2RlXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRcbiAqIEBwYXJhbSB7RXZlbnRMaXN0ZW5lck9yRXZlbnRMaXN0ZW5lck9iamVjdH0gaGFuZGxlclxuICogQHBhcmFtIHtib29sZWFuIHwgQWRkRXZlbnRMaXN0ZW5lck9wdGlvbnMgfCBFdmVudExpc3RlbmVyT3B0aW9uc30gW29wdGlvbnNdXG4gKiBAcmV0dXJucyB7KCkgPT4gdm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxpc3Rlbihub2RlLCBldmVudCwgaGFuZGxlciwgb3B0aW9ucykge1xuXHRub2RlLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGhhbmRsZXIsIG9wdGlvbnMpO1xuXHRyZXR1cm4gKCkgPT4gbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyLCBvcHRpb25zKTtcbn1cblxuLyoqXG4gKiBAcmV0dXJucyB7KGV2ZW50OiBhbnkpID0+IGFueX0gKi9cbmV4cG9ydCBmdW5jdGlvbiBwcmV2ZW50X2RlZmF1bHQoZm4pIHtcblx0cmV0dXJuIGZ1bmN0aW9uIChldmVudCkge1xuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdHJldHVybiBmbi5jYWxsKHRoaXMsIGV2ZW50KTtcblx0fTtcbn1cblxuLyoqXG4gKiBAcmV0dXJucyB7KGV2ZW50OiBhbnkpID0+IGFueX0gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdG9wX3Byb3BhZ2F0aW9uKGZuKSB7XG5cdHJldHVybiBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHQvLyBAdHMtaWdub3JlXG5cdFx0cmV0dXJuIGZuLmNhbGwodGhpcywgZXZlbnQpO1xuXHR9O1xufVxuXG4vKipcbiAqIEByZXR1cm5zIHsoZXZlbnQ6IGFueSkgPT4gYW55fSAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN0b3BfaW1tZWRpYXRlX3Byb3BhZ2F0aW9uKGZuKSB7XG5cdHJldHVybiBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcblx0XHQvLyBAdHMtaWdub3JlXG5cdFx0cmV0dXJuIGZuLmNhbGwodGhpcywgZXZlbnQpO1xuXHR9O1xufVxuXG4vKipcbiAqIEByZXR1cm5zIHsoZXZlbnQ6IGFueSkgPT4gdm9pZH0gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZWxmKGZuKSB7XG5cdHJldHVybiBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHQvLyBAdHMtaWdub3JlXG5cdFx0aWYgKGV2ZW50LnRhcmdldCA9PT0gdGhpcykgZm4uY2FsbCh0aGlzLCBldmVudCk7XG5cdH07XG59XG5cbi8qKlxuICogQHJldHVybnMgeyhldmVudDogYW55KSA9PiB2b2lkfSAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRydXN0ZWQoZm4pIHtcblx0cmV0dXJuIGZ1bmN0aW9uIChldmVudCkge1xuXHRcdC8vIEB0cy1pZ25vcmVcblx0XHRpZiAoZXZlbnQuaXNUcnVzdGVkKSBmbi5jYWxsKHRoaXMsIGV2ZW50KTtcblx0fTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IG5vZGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBhdHRyaWJ1dGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBbdmFsdWVdXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGF0dHIobm9kZSwgYXR0cmlidXRlLCB2YWx1ZSkge1xuXHRpZiAodmFsdWUgPT0gbnVsbCkgbm9kZS5yZW1vdmVBdHRyaWJ1dGUoYXR0cmlidXRlKTtcblx0ZWxzZSBpZiAobm9kZS5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlKSAhPT0gdmFsdWUpIG5vZGUuc2V0QXR0cmlidXRlKGF0dHJpYnV0ZSwgdmFsdWUpO1xufVxuLyoqXG4gKiBMaXN0IG9mIGF0dHJpYnV0ZXMgdGhhdCBzaG91bGQgYWx3YXlzIGJlIHNldCB0aHJvdWdoIHRoZSBhdHRyIG1ldGhvZCxcbiAqIGJlY2F1c2UgdXBkYXRpbmcgdGhlbSB0aHJvdWdoIHRoZSBwcm9wZXJ0eSBzZXR0ZXIgZG9lc24ndCB3b3JrIHJlbGlhYmx5LlxuICogSW4gdGhlIGV4YW1wbGUgb2YgYHdpZHRoYC9gaGVpZ2h0YCwgdGhlIHByb2JsZW0gaXMgdGhhdCB0aGUgc2V0dGVyIG9ubHlcbiAqIGFjY2VwdHMgbnVtZXJpYyB2YWx1ZXMsIGJ1dCB0aGUgYXR0cmlidXRlIGNhbiBhbHNvIGJlIHNldCB0byBhIHN0cmluZyBsaWtlIGA1MCVgLlxuICogSWYgdGhpcyBsaXN0IGJlY29tZXMgdG9vIGJpZywgcmV0aGluayB0aGlzIGFwcHJvYWNoLlxuICovXG5jb25zdCBhbHdheXNfc2V0X3Rocm91Z2hfc2V0X2F0dHJpYnV0ZSA9IFsnd2lkdGgnLCAnaGVpZ2h0J107XG5cbi8qKlxuICogQHBhcmFtIHtFbGVtZW50ICYgRWxlbWVudENTU0lubGluZVN0eWxlfSBub2RlXG4gKiBAcGFyYW0ge3sgW3g6IHN0cmluZ106IHN0cmluZyB9fSBhdHRyaWJ1dGVzXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldF9hdHRyaWJ1dGVzKG5vZGUsIGF0dHJpYnV0ZXMpIHtcblx0Ly8gQHRzLWlnbm9yZVxuXHRjb25zdCBkZXNjcmlwdG9ycyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKG5vZGUuX19wcm90b19fKTtcblx0Zm9yIChjb25zdCBrZXkgaW4gYXR0cmlidXRlcykge1xuXHRcdGlmIChhdHRyaWJ1dGVzW2tleV0gPT0gbnVsbCkge1xuXHRcdFx0bm9kZS5yZW1vdmVBdHRyaWJ1dGUoa2V5KTtcblx0XHR9IGVsc2UgaWYgKGtleSA9PT0gJ3N0eWxlJykge1xuXHRcdFx0bm9kZS5zdHlsZS5jc3NUZXh0ID0gYXR0cmlidXRlc1trZXldO1xuXHRcdH0gZWxzZSBpZiAoa2V5ID09PSAnX192YWx1ZScpIHtcblx0XHRcdC8qKiBAdHlwZSB7YW55fSAqLyAobm9kZSkudmFsdWUgPSBub2RlW2tleV0gPSBhdHRyaWJ1dGVzW2tleV07XG5cdFx0fSBlbHNlIGlmIChcblx0XHRcdGRlc2NyaXB0b3JzW2tleV0gJiZcblx0XHRcdGRlc2NyaXB0b3JzW2tleV0uc2V0ICYmXG5cdFx0XHRhbHdheXNfc2V0X3Rocm91Z2hfc2V0X2F0dHJpYnV0ZS5pbmRleE9mKGtleSkgPT09IC0xXG5cdFx0KSB7XG5cdFx0XHRub2RlW2tleV0gPSBhdHRyaWJ1dGVzW2tleV07XG5cdFx0fSBlbHNlIHtcblx0XHRcdGF0dHIobm9kZSwga2V5LCBhdHRyaWJ1dGVzW2tleV0pO1xuXHRcdH1cblx0fVxufVxuXG4vKipcbiAqIEBwYXJhbSB7RWxlbWVudCAmIEVsZW1lbnRDU1NJbmxpbmVTdHlsZX0gbm9kZVxuICogQHBhcmFtIHt7IFt4OiBzdHJpbmddOiBzdHJpbmcgfX0gYXR0cmlidXRlc1xuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRfc3ZnX2F0dHJpYnV0ZXMobm9kZSwgYXR0cmlidXRlcykge1xuXHRmb3IgKGNvbnN0IGtleSBpbiBhdHRyaWJ1dGVzKSB7XG5cdFx0YXR0cihub2RlLCBrZXksIGF0dHJpYnV0ZXNba2V5XSk7XG5cdH1cbn1cblxuLyoqXG4gKiBAcGFyYW0ge1JlY29yZDxzdHJpbmcsIHVua25vd24+fSBkYXRhX21hcFxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRfY3VzdG9tX2VsZW1lbnRfZGF0YV9tYXAobm9kZSwgZGF0YV9tYXApIHtcblx0T2JqZWN0LmtleXMoZGF0YV9tYXApLmZvckVhY2goKGtleSkgPT4ge1xuXHRcdHNldF9jdXN0b21fZWxlbWVudF9kYXRhKG5vZGUsIGtleSwgZGF0YV9tYXBba2V5XSk7XG5cdH0pO1xufVxuXG4vKipcbiAqIEByZXR1cm5zIHt2b2lkfSAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldF9jdXN0b21fZWxlbWVudF9kYXRhKG5vZGUsIHByb3AsIHZhbHVlKSB7XG5cdGNvbnN0IGxvd2VyID0gcHJvcC50b0xvd2VyQ2FzZSgpOyAvLyBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHkgd2l0aCBleGlzdGluZyBiZWhhdmlvciB3ZSBkbyBsb3dlcmNhc2UgZmlyc3Rcblx0aWYgKGxvd2VyIGluIG5vZGUpIHtcblx0XHRub2RlW2xvd2VyXSA9IHR5cGVvZiBub2RlW2xvd2VyXSA9PT0gJ2Jvb2xlYW4nICYmIHZhbHVlID09PSAnJyA/IHRydWUgOiB2YWx1ZTtcblx0fSBlbHNlIGlmIChwcm9wIGluIG5vZGUpIHtcblx0XHRub2RlW3Byb3BdID0gdHlwZW9mIG5vZGVbcHJvcF0gPT09ICdib29sZWFuJyAmJiB2YWx1ZSA9PT0gJycgPyB0cnVlIDogdmFsdWU7XG5cdH0gZWxzZSB7XG5cdFx0YXR0cihub2RlLCBwcm9wLCB2YWx1ZSk7XG5cdH1cbn1cblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gdGFnXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRfZHluYW1pY19lbGVtZW50X2RhdGEodGFnKSB7XG5cdHJldHVybiAvLS8udGVzdCh0YWcpID8gc2V0X2N1c3RvbV9lbGVtZW50X2RhdGFfbWFwIDogc2V0X2F0dHJpYnV0ZXM7XG59XG5cbi8qKlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB4bGlua19hdHRyKG5vZGUsIGF0dHJpYnV0ZSwgdmFsdWUpIHtcblx0bm9kZS5zZXRBdHRyaWJ1dGVOUygnaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycsIGF0dHJpYnV0ZSwgdmFsdWUpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IG5vZGVcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRfc3ZlbHRlX2RhdGFzZXQobm9kZSkge1xuXHRyZXR1cm4gbm9kZS5kYXRhc2V0LnN2ZWx0ZUg7XG59XG5cbi8qKlxuICogQHJldHVybnMge3Vua25vd25bXX0gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRfYmluZGluZ19ncm91cF92YWx1ZShncm91cCwgX192YWx1ZSwgY2hlY2tlZCkge1xuXHRjb25zdCB2YWx1ZSA9IG5ldyBTZXQoKTtcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBncm91cC5sZW5ndGg7IGkgKz0gMSkge1xuXHRcdGlmIChncm91cFtpXS5jaGVja2VkKSB2YWx1ZS5hZGQoZ3JvdXBbaV0uX192YWx1ZSk7XG5cdH1cblx0aWYgKCFjaGVja2VkKSB7XG5cdFx0dmFsdWUuZGVsZXRlKF9fdmFsdWUpO1xuXHR9XG5cdHJldHVybiBBcnJheS5mcm9tKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0hUTUxJbnB1dEVsZW1lbnRbXX0gZ3JvdXBcbiAqIEByZXR1cm5zIHt7IHAoLi4uaW5wdXRzOiBIVE1MSW5wdXRFbGVtZW50W10pOiB2b2lkOyByKCk6IHZvaWQ7IH19XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbml0X2JpbmRpbmdfZ3JvdXAoZ3JvdXApIHtcblx0LyoqXG5cdCAqIEB0eXBlIHtIVE1MSW5wdXRFbGVtZW50W119ICovXG5cdGxldCBfaW5wdXRzO1xuXHRyZXR1cm4ge1xuXHRcdC8qIHB1c2ggKi8gcCguLi5pbnB1dHMpIHtcblx0XHRcdF9pbnB1dHMgPSBpbnB1dHM7XG5cdFx0XHRfaW5wdXRzLmZvckVhY2goKGlucHV0KSA9PiBncm91cC5wdXNoKGlucHV0KSk7XG5cdFx0fSxcblx0XHQvKiByZW1vdmUgKi8gcigpIHtcblx0XHRcdF9pbnB1dHMuZm9yRWFjaCgoaW5wdXQpID0+IGdyb3VwLnNwbGljZShncm91cC5pbmRleE9mKGlucHV0KSwgMSkpO1xuXHRcdH1cblx0fTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge251bWJlcltdfSBpbmRleGVzXG4gKiBAcmV0dXJucyB7eyB1KG5ld19pbmRleGVzOiBudW1iZXJbXSk6IHZvaWQ7IHAoLi4uaW5wdXRzOiBIVE1MSW5wdXRFbGVtZW50W10pOiB2b2lkOyByOiAoKSA9PiB2b2lkOyB9fVxuICovXG5leHBvcnQgZnVuY3Rpb24gaW5pdF9iaW5kaW5nX2dyb3VwX2R5bmFtaWMoZ3JvdXAsIGluZGV4ZXMpIHtcblx0LyoqXG5cdCAqIEB0eXBlIHtIVE1MSW5wdXRFbGVtZW50W119ICovXG5cdGxldCBfZ3JvdXAgPSBnZXRfYmluZGluZ19ncm91cChncm91cCk7XG5cblx0LyoqXG5cdCAqIEB0eXBlIHtIVE1MSW5wdXRFbGVtZW50W119ICovXG5cdGxldCBfaW5wdXRzO1xuXG5cdGZ1bmN0aW9uIGdldF9iaW5kaW5nX2dyb3VwKGdyb3VwKSB7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBpbmRleGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRncm91cCA9IGdyb3VwW2luZGV4ZXNbaV1dID0gZ3JvdXBbaW5kZXhlc1tpXV0gfHwgW107XG5cdFx0fVxuXHRcdHJldHVybiBncm91cDtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcmV0dXJucyB7dm9pZH0gKi9cblx0ZnVuY3Rpb24gcHVzaCgpIHtcblx0XHRfaW5wdXRzLmZvckVhY2goKGlucHV0KSA9PiBfZ3JvdXAucHVzaChpbnB1dCkpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEByZXR1cm5zIHt2b2lkfSAqL1xuXHRmdW5jdGlvbiByZW1vdmUoKSB7XG5cdFx0X2lucHV0cy5mb3JFYWNoKChpbnB1dCkgPT4gX2dyb3VwLnNwbGljZShfZ3JvdXAuaW5kZXhPZihpbnB1dCksIDEpKTtcblx0fVxuXHRyZXR1cm4ge1xuXHRcdC8qIHVwZGF0ZSAqLyB1KG5ld19pbmRleGVzKSB7XG5cdFx0XHRpbmRleGVzID0gbmV3X2luZGV4ZXM7XG5cdFx0XHRjb25zdCBuZXdfZ3JvdXAgPSBnZXRfYmluZGluZ19ncm91cChncm91cCk7XG5cdFx0XHRpZiAobmV3X2dyb3VwICE9PSBfZ3JvdXApIHtcblx0XHRcdFx0cmVtb3ZlKCk7XG5cdFx0XHRcdF9ncm91cCA9IG5ld19ncm91cDtcblx0XHRcdFx0cHVzaCgpO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0LyogcHVzaCAqLyBwKC4uLmlucHV0cykge1xuXHRcdFx0X2lucHV0cyA9IGlucHV0cztcblx0XHRcdHB1c2goKTtcblx0XHR9LFxuXHRcdC8qIHJlbW92ZSAqLyByOiByZW1vdmVcblx0fTtcbn1cblxuLyoqIEByZXR1cm5zIHtudW1iZXJ9ICovXG5leHBvcnQgZnVuY3Rpb24gdG9fbnVtYmVyKHZhbHVlKSB7XG5cdHJldHVybiB2YWx1ZSA9PT0gJycgPyBudWxsIDogK3ZhbHVlO1xufVxuXG4vKiogQHJldHVybnMge2FueVtdfSAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRpbWVfcmFuZ2VzX3RvX2FycmF5KHJhbmdlcykge1xuXHRjb25zdCBhcnJheSA9IFtdO1xuXHRmb3IgKGxldCBpID0gMDsgaSA8IHJhbmdlcy5sZW5ndGg7IGkgKz0gMSkge1xuXHRcdGFycmF5LnB1c2goeyBzdGFydDogcmFuZ2VzLnN0YXJ0KGkpLCBlbmQ6IHJhbmdlcy5lbmQoaSkgfSk7XG5cdH1cblx0cmV0dXJuIGFycmF5O1xufVxuXG4vKipcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudFxuICogQHJldHVybnMge0NoaWxkTm9kZVtdfVxuICovXG5leHBvcnQgZnVuY3Rpb24gY2hpbGRyZW4oZWxlbWVudCkge1xuXHRyZXR1cm4gQXJyYXkuZnJvbShlbGVtZW50LmNoaWxkTm9kZXMpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7Q2hpbGROb2RlQXJyYXl9IG5vZGVzXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZnVuY3Rpb24gaW5pdF9jbGFpbV9pbmZvKG5vZGVzKSB7XG5cdGlmIChub2Rlcy5jbGFpbV9pbmZvID09PSB1bmRlZmluZWQpIHtcblx0XHRub2Rlcy5jbGFpbV9pbmZvID0geyBsYXN0X2luZGV4OiAwLCB0b3RhbF9jbGFpbWVkOiAwIH07XG5cdH1cbn1cblxuLyoqXG4gKiBAdGVtcGxhdGUge0NoaWxkTm9kZUV4fSBSXG4gKiBAcGFyYW0ge0NoaWxkTm9kZUFycmF5fSBub2Rlc1xuICogQHBhcmFtIHsobm9kZTogQ2hpbGROb2RlRXgpID0+IG5vZGUgaXMgUn0gcHJlZGljYXRlXG4gKiBAcGFyYW0geyhub2RlOiBDaGlsZE5vZGVFeCkgPT4gQ2hpbGROb2RlRXggfCB1bmRlZmluZWR9IHByb2Nlc3Nfbm9kZVxuICogQHBhcmFtIHsoKSA9PiBSfSBjcmVhdGVfbm9kZVxuICogQHBhcmFtIHtib29sZWFufSBkb250X3VwZGF0ZV9sYXN0X2luZGV4XG4gKiBAcmV0dXJucyB7Un1cbiAqL1xuZnVuY3Rpb24gY2xhaW1fbm9kZShub2RlcywgcHJlZGljYXRlLCBwcm9jZXNzX25vZGUsIGNyZWF0ZV9ub2RlLCBkb250X3VwZGF0ZV9sYXN0X2luZGV4ID0gZmFsc2UpIHtcblx0Ly8gVHJ5IHRvIGZpbmQgbm9kZXMgaW4gYW4gb3JkZXIgc3VjaCB0aGF0IHdlIGxlbmd0aGVuIHRoZSBsb25nZXN0IGluY3JlYXNpbmcgc3Vic2VxdWVuY2Vcblx0aW5pdF9jbGFpbV9pbmZvKG5vZGVzKTtcblx0Y29uc3QgcmVzdWx0X25vZGUgPSAoKCkgPT4ge1xuXHRcdC8vIFdlIGZpcnN0IHRyeSB0byBmaW5kIGFuIGVsZW1lbnQgYWZ0ZXIgdGhlIHByZXZpb3VzIG9uZVxuXHRcdGZvciAobGV0IGkgPSBub2Rlcy5jbGFpbV9pbmZvLmxhc3RfaW5kZXg7IGkgPCBub2Rlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0Y29uc3Qgbm9kZSA9IG5vZGVzW2ldO1xuXHRcdFx0aWYgKHByZWRpY2F0ZShub2RlKSkge1xuXHRcdFx0XHRjb25zdCByZXBsYWNlbWVudCA9IHByb2Nlc3Nfbm9kZShub2RlKTtcblx0XHRcdFx0aWYgKHJlcGxhY2VtZW50ID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRub2Rlcy5zcGxpY2UoaSwgMSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0bm9kZXNbaV0gPSByZXBsYWNlbWVudDtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoIWRvbnRfdXBkYXRlX2xhc3RfaW5kZXgpIHtcblx0XHRcdFx0XHRub2Rlcy5jbGFpbV9pbmZvLmxhc3RfaW5kZXggPSBpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBub2RlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHQvLyBPdGhlcndpc2UsIHdlIHRyeSB0byBmaW5kIG9uZSBiZWZvcmVcblx0XHQvLyBXZSBpdGVyYXRlIGluIHJldmVyc2Ugc28gdGhhdCB3ZSBkb24ndCBnbyB0b28gZmFyIGJhY2tcblx0XHRmb3IgKGxldCBpID0gbm9kZXMuY2xhaW1faW5mby5sYXN0X2luZGV4IC0gMTsgaSA+PSAwOyBpLS0pIHtcblx0XHRcdGNvbnN0IG5vZGUgPSBub2Rlc1tpXTtcblx0XHRcdGlmIChwcmVkaWNhdGUobm9kZSkpIHtcblx0XHRcdFx0Y29uc3QgcmVwbGFjZW1lbnQgPSBwcm9jZXNzX25vZGUobm9kZSk7XG5cdFx0XHRcdGlmIChyZXBsYWNlbWVudCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0bm9kZXMuc3BsaWNlKGksIDEpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdG5vZGVzW2ldID0gcmVwbGFjZW1lbnQ7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCFkb250X3VwZGF0ZV9sYXN0X2luZGV4KSB7XG5cdFx0XHRcdFx0bm9kZXMuY2xhaW1faW5mby5sYXN0X2luZGV4ID0gaTtcblx0XHRcdFx0fSBlbHNlIGlmIChyZXBsYWNlbWVudCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0Ly8gU2luY2Ugd2Ugc3BsaWNlZCBiZWZvcmUgdGhlIGxhc3RfaW5kZXgsIHdlIGRlY3JlYXNlIGl0XG5cdFx0XHRcdFx0bm9kZXMuY2xhaW1faW5mby5sYXN0X2luZGV4LS07XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdC8vIElmIHdlIGNhbid0IGZpbmQgYW55IG1hdGNoaW5nIG5vZGUsIHdlIGNyZWF0ZSBhIG5ldyBvbmVcblx0XHRyZXR1cm4gY3JlYXRlX25vZGUoKTtcblx0fSkoKTtcblx0cmVzdWx0X25vZGUuY2xhaW1fb3JkZXIgPSBub2Rlcy5jbGFpbV9pbmZvLnRvdGFsX2NsYWltZWQ7XG5cdG5vZGVzLmNsYWltX2luZm8udG90YWxfY2xhaW1lZCArPSAxO1xuXHRyZXR1cm4gcmVzdWx0X25vZGU7XG59XG5cbi8qKlxuICogQHBhcmFtIHtDaGlsZE5vZGVBcnJheX0gbm9kZXNcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge3sgW2tleTogc3RyaW5nXTogYm9vbGVhbiB9fSBhdHRyaWJ1dGVzXG4gKiBAcGFyYW0geyhuYW1lOiBzdHJpbmcpID0+IEVsZW1lbnQgfCBTVkdFbGVtZW50fSBjcmVhdGVfZWxlbWVudFxuICogQHJldHVybnMge0VsZW1lbnQgfCBTVkdFbGVtZW50fVxuICovXG5mdW5jdGlvbiBjbGFpbV9lbGVtZW50X2Jhc2Uobm9kZXMsIG5hbWUsIGF0dHJpYnV0ZXMsIGNyZWF0ZV9lbGVtZW50KSB7XG5cdHJldHVybiBjbGFpbV9ub2RlKFxuXHRcdG5vZGVzLFxuXHRcdC8qKiBAcmV0dXJucyB7bm9kZSBpcyBFbGVtZW50IHwgU1ZHRWxlbWVudH0gKi9cblx0XHQobm9kZSkgPT4gbm9kZS5ub2RlTmFtZSA9PT0gbmFtZSxcblx0XHQvKiogQHBhcmFtIHtFbGVtZW50fSBub2RlICovXG5cdFx0KG5vZGUpID0+IHtcblx0XHRcdGNvbnN0IHJlbW92ZSA9IFtdO1xuXHRcdFx0Zm9yIChsZXQgaiA9IDA7IGogPCBub2RlLmF0dHJpYnV0ZXMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0Y29uc3QgYXR0cmlidXRlID0gbm9kZS5hdHRyaWJ1dGVzW2pdO1xuXHRcdFx0XHRpZiAoIWF0dHJpYnV0ZXNbYXR0cmlidXRlLm5hbWVdKSB7XG5cdFx0XHRcdFx0cmVtb3ZlLnB1c2goYXR0cmlidXRlLm5hbWUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZW1vdmUuZm9yRWFjaCgodikgPT4gbm9kZS5yZW1vdmVBdHRyaWJ1dGUodikpO1xuXHRcdFx0cmV0dXJuIHVuZGVmaW5lZDtcblx0XHR9LFxuXHRcdCgpID0+IGNyZWF0ZV9lbGVtZW50KG5hbWUpXG5cdCk7XG59XG5cbi8qKlxuICogQHBhcmFtIHtDaGlsZE5vZGVBcnJheX0gbm9kZXNcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge3sgW2tleTogc3RyaW5nXTogYm9vbGVhbiB9fSBhdHRyaWJ1dGVzXG4gKiBAcmV0dXJucyB7RWxlbWVudCB8IFNWR0VsZW1lbnR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjbGFpbV9lbGVtZW50KG5vZGVzLCBuYW1lLCBhdHRyaWJ1dGVzKSB7XG5cdHJldHVybiBjbGFpbV9lbGVtZW50X2Jhc2Uobm9kZXMsIG5hbWUsIGF0dHJpYnV0ZXMsIGVsZW1lbnQpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7Q2hpbGROb2RlQXJyYXl9IG5vZGVzXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHt7IFtrZXk6IHN0cmluZ106IGJvb2xlYW4gfX0gYXR0cmlidXRlc1xuICogQHJldHVybnMge0VsZW1lbnQgfCBTVkdFbGVtZW50fVxuICovXG5leHBvcnQgZnVuY3Rpb24gY2xhaW1fc3ZnX2VsZW1lbnQobm9kZXMsIG5hbWUsIGF0dHJpYnV0ZXMpIHtcblx0cmV0dXJuIGNsYWltX2VsZW1lbnRfYmFzZShub2RlcywgbmFtZSwgYXR0cmlidXRlcywgc3ZnX2VsZW1lbnQpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7Q2hpbGROb2RlQXJyYXl9IG5vZGVzXG4gKiBAcmV0dXJucyB7VGV4dH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNsYWltX3RleHQobm9kZXMsIGRhdGEpIHtcblx0cmV0dXJuIGNsYWltX25vZGUoXG5cdFx0bm9kZXMsXG5cdFx0LyoqIEByZXR1cm5zIHtub2RlIGlzIFRleHR9ICovXG5cdFx0KG5vZGUpID0+IG5vZGUubm9kZVR5cGUgPT09IDMsXG5cdFx0LyoqIEBwYXJhbSB7VGV4dH0gbm9kZSAqL1xuXHRcdChub2RlKSA9PiB7XG5cdFx0XHRjb25zdCBkYXRhX3N0ciA9ICcnICsgZGF0YTtcblx0XHRcdGlmIChub2RlLmRhdGEuc3RhcnRzV2l0aChkYXRhX3N0cikpIHtcblx0XHRcdFx0aWYgKG5vZGUuZGF0YS5sZW5ndGggIT09IGRhdGFfc3RyLmxlbmd0aCkge1xuXHRcdFx0XHRcdHJldHVybiBub2RlLnNwbGl0VGV4dChkYXRhX3N0ci5sZW5ndGgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRub2RlLmRhdGEgPSBkYXRhX3N0cjtcblx0XHRcdH1cblx0XHR9LFxuXHRcdCgpID0+IHRleHQoZGF0YSksXG5cdFx0dHJ1ZSAvLyBUZXh0IG5vZGVzIHNob3VsZCBub3QgdXBkYXRlIGxhc3QgaW5kZXggc2luY2UgaXQgaXMgbGlrZWx5IG5vdCB3b3J0aCBpdCB0byBlbGltaW5hdGUgYW4gaW5jcmVhc2luZyBzdWJzZXF1ZW5jZSBvZiBhY3R1YWwgZWxlbWVudHNcblx0KTtcbn1cblxuLyoqXG4gKiBAcmV0dXJucyB7VGV4dH0gKi9cbmV4cG9ydCBmdW5jdGlvbiBjbGFpbV9zcGFjZShub2Rlcykge1xuXHRyZXR1cm4gY2xhaW1fdGV4dChub2RlcywgJyAnKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0NoaWxkTm9kZUFycmF5fSBub2Rlc1xuICogQHJldHVybnMge0NvbW1lbnR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjbGFpbV9jb21tZW50KG5vZGVzLCBkYXRhKSB7XG5cdHJldHVybiBjbGFpbV9ub2RlKFxuXHRcdG5vZGVzLFxuXHRcdC8qKiBAcmV0dXJucyB7bm9kZSBpcyBDb21tZW50fSAqL1xuXHRcdChub2RlKSA9PiBub2RlLm5vZGVUeXBlID09PSA4LFxuXHRcdC8qKiBAcGFyYW0ge0NvbW1lbnR9IG5vZGUgKi9cblx0XHQobm9kZSkgPT4ge1xuXHRcdFx0bm9kZS5kYXRhID0gJycgKyBkYXRhO1xuXHRcdFx0cmV0dXJuIHVuZGVmaW5lZDtcblx0XHR9LFxuXHRcdCgpID0+IGNvbW1lbnQoZGF0YSksXG5cdFx0dHJ1ZVxuXHQpO1xufVxuXG5mdW5jdGlvbiBnZXRfY29tbWVudF9pZHgobm9kZXMsIHRleHQsIHN0YXJ0KSB7XG5cdGZvciAobGV0IGkgPSBzdGFydDsgaSA8IG5vZGVzLmxlbmd0aDsgaSArPSAxKSB7XG5cdFx0Y29uc3Qgbm9kZSA9IG5vZGVzW2ldO1xuXHRcdGlmIChub2RlLm5vZGVUeXBlID09PSA4IC8qIGNvbW1lbnQgbm9kZSAqLyAmJiBub2RlLnRleHRDb250ZW50LnRyaW0oKSA9PT0gdGV4dCkge1xuXHRcdFx0cmV0dXJuIGk7XG5cdFx0fVxuXHR9XG5cdHJldHVybiAtMTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGlzX3N2Z1xuICogQHJldHVybnMge0h0bWxUYWdIeWRyYXRpb259XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjbGFpbV9odG1sX3RhZyhub2RlcywgaXNfc3ZnKSB7XG5cdC8vIGZpbmQgaHRtbCBvcGVuaW5nIHRhZ1xuXHRjb25zdCBzdGFydF9pbmRleCA9IGdldF9jb21tZW50X2lkeChub2RlcywgJ0hUTUxfVEFHX1NUQVJUJywgMCk7XG5cdGNvbnN0IGVuZF9pbmRleCA9IGdldF9jb21tZW50X2lkeChub2RlcywgJ0hUTUxfVEFHX0VORCcsIHN0YXJ0X2luZGV4ICsgMSk7XG5cdGlmIChzdGFydF9pbmRleCA9PT0gLTEgfHwgZW5kX2luZGV4ID09PSAtMSkge1xuXHRcdHJldHVybiBuZXcgSHRtbFRhZ0h5ZHJhdGlvbihpc19zdmcpO1xuXHR9XG5cblx0aW5pdF9jbGFpbV9pbmZvKG5vZGVzKTtcblx0Y29uc3QgaHRtbF90YWdfbm9kZXMgPSBub2Rlcy5zcGxpY2Uoc3RhcnRfaW5kZXgsIGVuZF9pbmRleCAtIHN0YXJ0X2luZGV4ICsgMSk7XG5cdGRldGFjaChodG1sX3RhZ19ub2Rlc1swXSk7XG5cdGRldGFjaChodG1sX3RhZ19ub2Rlc1todG1sX3RhZ19ub2Rlcy5sZW5ndGggLSAxXSk7XG5cdGNvbnN0IGNsYWltZWRfbm9kZXMgPSBodG1sX3RhZ19ub2Rlcy5zbGljZSgxLCBodG1sX3RhZ19ub2Rlcy5sZW5ndGggLSAxKTtcblx0aWYgKGNsYWltZWRfbm9kZXMubGVuZ3RoID09PSAwKSB7XG5cdFx0cmV0dXJuIG5ldyBIdG1sVGFnSHlkcmF0aW9uKGlzX3N2Zyk7XG5cdH1cblx0Zm9yIChjb25zdCBuIG9mIGNsYWltZWRfbm9kZXMpIHtcblx0XHRuLmNsYWltX29yZGVyID0gbm9kZXMuY2xhaW1faW5mby50b3RhbF9jbGFpbWVkO1xuXHRcdG5vZGVzLmNsYWltX2luZm8udG90YWxfY2xhaW1lZCArPSAxO1xuXHR9XG5cdHJldHVybiBuZXcgSHRtbFRhZ0h5ZHJhdGlvbihpc19zdmcsIGNsYWltZWRfbm9kZXMpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7VGV4dH0gdGV4dFxuICogQHBhcmFtIHt1bmtub3dufSBkYXRhXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldF9kYXRhKHRleHQsIGRhdGEpIHtcblx0ZGF0YSA9ICcnICsgZGF0YTtcblx0aWYgKHRleHQuZGF0YSA9PT0gZGF0YSkgcmV0dXJuO1xuXHR0ZXh0LmRhdGEgPSAvKiogQHR5cGUge3N0cmluZ30gKi8gKGRhdGEpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7VGV4dH0gdGV4dFxuICogQHBhcmFtIHt1bmtub3dufSBkYXRhXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldF9kYXRhX2NvbnRlbnRlZGl0YWJsZSh0ZXh0LCBkYXRhKSB7XG5cdGRhdGEgPSAnJyArIGRhdGE7XG5cdGlmICh0ZXh0Lndob2xlVGV4dCA9PT0gZGF0YSkgcmV0dXJuO1xuXHR0ZXh0LmRhdGEgPSAvKiogQHR5cGUge3N0cmluZ30gKi8gKGRhdGEpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7VGV4dH0gdGV4dFxuICogQHBhcmFtIHt1bmtub3dufSBkYXRhXG4gKiBAcGFyYW0ge3N0cmluZ30gYXR0cl92YWx1ZVxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRfZGF0YV9tYXliZV9jb250ZW50ZWRpdGFibGUodGV4dCwgZGF0YSwgYXR0cl92YWx1ZSkge1xuXHRpZiAofmNvbnRlbnRlZGl0YWJsZV90cnV0aHlfdmFsdWVzLmluZGV4T2YoYXR0cl92YWx1ZSkpIHtcblx0XHRzZXRfZGF0YV9jb250ZW50ZWRpdGFibGUodGV4dCwgZGF0YSk7XG5cdH0gZWxzZSB7XG5cdFx0c2V0X2RhdGEodGV4dCwgZGF0YSk7XG5cdH1cbn1cblxuLyoqXG4gKiBAcmV0dXJucyB7dm9pZH0gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRfaW5wdXRfdmFsdWUoaW5wdXQsIHZhbHVlKSB7XG5cdGlucHV0LnZhbHVlID0gdmFsdWUgPT0gbnVsbCA/ICcnIDogdmFsdWU7XG59XG5cbi8qKlxuICogQHJldHVybnMge3ZvaWR9ICovXG5leHBvcnQgZnVuY3Rpb24gc2V0X2lucHV0X3R5cGUoaW5wdXQsIHR5cGUpIHtcblx0dHJ5IHtcblx0XHRpbnB1dC50eXBlID0gdHlwZTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdC8vIGRvIG5vdGhpbmdcblx0fVxufVxuXG4vKipcbiAqIEByZXR1cm5zIHt2b2lkfSAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldF9zdHlsZShub2RlLCBrZXksIHZhbHVlLCBpbXBvcnRhbnQpIHtcblx0aWYgKHZhbHVlID09IG51bGwpIHtcblx0XHRub2RlLnN0eWxlLnJlbW92ZVByb3BlcnR5KGtleSk7XG5cdH0gZWxzZSB7XG5cdFx0bm9kZS5zdHlsZS5zZXRQcm9wZXJ0eShrZXksIHZhbHVlLCBpbXBvcnRhbnQgPyAnaW1wb3J0YW50JyA6ICcnKTtcblx0fVxufVxuXG4vKipcbiAqIEByZXR1cm5zIHt2b2lkfSAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNlbGVjdF9vcHRpb24oc2VsZWN0LCB2YWx1ZSwgbW91bnRpbmcpIHtcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBzZWxlY3Qub3B0aW9ucy5sZW5ndGg7IGkgKz0gMSkge1xuXHRcdGNvbnN0IG9wdGlvbiA9IHNlbGVjdC5vcHRpb25zW2ldO1xuXHRcdGlmIChvcHRpb24uX192YWx1ZSA9PT0gdmFsdWUpIHtcblx0XHRcdG9wdGlvbi5zZWxlY3RlZCA9IHRydWU7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHR9XG5cdGlmICghbW91bnRpbmcgfHwgdmFsdWUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHNlbGVjdC5zZWxlY3RlZEluZGV4ID0gLTE7IC8vIG5vIG9wdGlvbiBzaG91bGQgYmUgc2VsZWN0ZWRcblx0fVxufVxuXG4vKipcbiAqIEByZXR1cm5zIHt2b2lkfSAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNlbGVjdF9vcHRpb25zKHNlbGVjdCwgdmFsdWUpIHtcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBzZWxlY3Qub3B0aW9ucy5sZW5ndGg7IGkgKz0gMSkge1xuXHRcdGNvbnN0IG9wdGlvbiA9IHNlbGVjdC5vcHRpb25zW2ldO1xuXHRcdG9wdGlvbi5zZWxlY3RlZCA9IH52YWx1ZS5pbmRleE9mKG9wdGlvbi5fX3ZhbHVlKTtcblx0fVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2VsZWN0X3ZhbHVlKHNlbGVjdCkge1xuXHRjb25zdCBzZWxlY3RlZF9vcHRpb24gPSBzZWxlY3QucXVlcnlTZWxlY3RvcignOmNoZWNrZWQnKTtcblx0cmV0dXJuIHNlbGVjdGVkX29wdGlvbiAmJiBzZWxlY3RlZF9vcHRpb24uX192YWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNlbGVjdF9tdWx0aXBsZV92YWx1ZShzZWxlY3QpIHtcblx0cmV0dXJuIFtdLm1hcC5jYWxsKHNlbGVjdC5xdWVyeVNlbGVjdG9yQWxsKCc6Y2hlY2tlZCcpLCAob3B0aW9uKSA9PiBvcHRpb24uX192YWx1ZSk7XG59XG4vLyB1bmZvcnR1bmF0ZWx5IHRoaXMgY2FuJ3QgYmUgYSBjb25zdGFudCBhcyB0aGF0IHdvdWxkbid0IGJlIHRyZWUtc2hha2VhYmxlXG4vLyBzbyB3ZSBjYWNoZSB0aGUgcmVzdWx0IGluc3RlYWRcblxuLyoqXG4gKiBAdHlwZSB7Ym9vbGVhbn0gKi9cbmxldCBjcm9zc29yaWdpbjtcblxuLyoqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc19jcm9zc29yaWdpbigpIHtcblx0aWYgKGNyb3Nzb3JpZ2luID09PSB1bmRlZmluZWQpIHtcblx0XHRjcm9zc29yaWdpbiA9IGZhbHNlO1xuXHRcdHRyeSB7XG5cdFx0XHRpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LnBhcmVudCkge1xuXHRcdFx0XHR2b2lkIHdpbmRvdy5wYXJlbnQuZG9jdW1lbnQ7XG5cdFx0XHR9XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdGNyb3Nzb3JpZ2luID0gdHJ1ZTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIGNyb3Nzb3JpZ2luO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IG5vZGVcbiAqIEBwYXJhbSB7KCkgPT4gdm9pZH0gZm5cbiAqIEByZXR1cm5zIHsoKSA9PiB2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gYWRkX2lmcmFtZV9yZXNpemVfbGlzdGVuZXIobm9kZSwgZm4pIHtcblx0Y29uc3QgY29tcHV0ZWRfc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xuXHRpZiAoY29tcHV0ZWRfc3R5bGUucG9zaXRpb24gPT09ICdzdGF0aWMnKSB7XG5cdFx0bm9kZS5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XG5cdH1cblx0Y29uc3QgaWZyYW1lID0gZWxlbWVudCgnaWZyYW1lJyk7XG5cdGlmcmFtZS5zZXRBdHRyaWJ1dGUoXG5cdFx0J3N0eWxlJyxcblx0XHQnZGlzcGxheTogYmxvY2s7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgdG9wOiAwOyBsZWZ0OiAwOyB3aWR0aDogMTAwJTsgaGVpZ2h0OiAxMDAlOyAnICtcblx0XHRcdCdvdmVyZmxvdzogaGlkZGVuOyBib3JkZXI6IDA7IG9wYWNpdHk6IDA7IHBvaW50ZXItZXZlbnRzOiBub25lOyB6LWluZGV4OiAtMTsnXG5cdCk7XG5cdGlmcmFtZS5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcblx0aWZyYW1lLnRhYkluZGV4ID0gLTE7XG5cdGNvbnN0IGNyb3Nzb3JpZ2luID0gaXNfY3Jvc3NvcmlnaW4oKTtcblxuXHQvKipcblx0ICogQHR5cGUgeygpID0+IHZvaWR9XG5cdCAqL1xuXHRsZXQgdW5zdWJzY3JpYmU7XG5cdGlmIChjcm9zc29yaWdpbikge1xuXHRcdGlmcmFtZS5zcmMgPSBcImRhdGE6dGV4dC9odG1sLDxzY3JpcHQ+b25yZXNpemU9ZnVuY3Rpb24oKXtwYXJlbnQucG9zdE1lc3NhZ2UoMCwnKicpfTwvc2NyaXB0PlwiO1xuXHRcdHVuc3Vic2NyaWJlID0gbGlzdGVuKFxuXHRcdFx0d2luZG93LFxuXHRcdFx0J21lc3NhZ2UnLFxuXHRcdFx0LyoqIEBwYXJhbSB7TWVzc2FnZUV2ZW50fSBldmVudCAqLyAoZXZlbnQpID0+IHtcblx0XHRcdFx0aWYgKGV2ZW50LnNvdXJjZSA9PT0gaWZyYW1lLmNvbnRlbnRXaW5kb3cpIGZuKCk7XG5cdFx0XHR9XG5cdFx0KTtcblx0fSBlbHNlIHtcblx0XHRpZnJhbWUuc3JjID0gJ2Fib3V0OmJsYW5rJztcblx0XHRpZnJhbWUub25sb2FkID0gKCkgPT4ge1xuXHRcdFx0dW5zdWJzY3JpYmUgPSBsaXN0ZW4oaWZyYW1lLmNvbnRlbnRXaW5kb3csICdyZXNpemUnLCBmbik7XG5cdFx0XHQvLyBtYWtlIHN1cmUgYW4gaW5pdGlhbCByZXNpemUgZXZlbnQgaXMgZmlyZWQgX2FmdGVyXyB0aGUgaWZyYW1lIGlzIGxvYWRlZCAod2hpY2ggaXMgYXN5bmNocm9ub3VzKVxuXHRcdFx0Ly8gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9zdmVsdGVqcy9zdmVsdGUvaXNzdWVzLzQyMzNcblx0XHRcdGZuKCk7XG5cdFx0fTtcblx0fVxuXHRhcHBlbmQobm9kZSwgaWZyYW1lKTtcblx0cmV0dXJuICgpID0+IHtcblx0XHRpZiAoY3Jvc3NvcmlnaW4pIHtcblx0XHRcdHVuc3Vic2NyaWJlKCk7XG5cdFx0fSBlbHNlIGlmICh1bnN1YnNjcmliZSAmJiBpZnJhbWUuY29udGVudFdpbmRvdykge1xuXHRcdFx0dW5zdWJzY3JpYmUoKTtcblx0XHR9XG5cdFx0ZGV0YWNoKGlmcmFtZSk7XG5cdH07XG59XG5leHBvcnQgY29uc3QgcmVzaXplX29ic2VydmVyX2NvbnRlbnRfYm94ID0gLyogQF9fUFVSRV9fICovIG5ldyBSZXNpemVPYnNlcnZlclNpbmdsZXRvbih7XG5cdGJveDogJ2NvbnRlbnQtYm94J1xufSk7XG5leHBvcnQgY29uc3QgcmVzaXplX29ic2VydmVyX2JvcmRlcl9ib3ggPSAvKiBAX19QVVJFX18gKi8gbmV3IFJlc2l6ZU9ic2VydmVyU2luZ2xldG9uKHtcblx0Ym94OiAnYm9yZGVyLWJveCdcbn0pO1xuZXhwb3J0IGNvbnN0IHJlc2l6ZV9vYnNlcnZlcl9kZXZpY2VfcGl4ZWxfY29udGVudF9ib3ggPSAvKiBAX19QVVJFX18gKi8gbmV3IFJlc2l6ZU9ic2VydmVyU2luZ2xldG9uKFxuXHR7IGJveDogJ2RldmljZS1waXhlbC1jb250ZW50LWJveCcgfVxuKTtcbmV4cG9ydCB7IFJlc2l6ZU9ic2VydmVyU2luZ2xldG9uIH07XG5cbi8qKlxuICogQHJldHVybnMge3ZvaWR9ICovXG5leHBvcnQgZnVuY3Rpb24gdG9nZ2xlX2NsYXNzKGVsZW1lbnQsIG5hbWUsIHRvZ2dsZSkge1xuXHQvLyBUaGUgYCEhYCBpcyByZXF1aXJlZCBiZWNhdXNlIGFuIGB1bmRlZmluZWRgIGZsYWcgbWVhbnMgZmxpcHBpbmcgdGhlIGN1cnJlbnQgc3RhdGUuXG5cdGVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZShuYW1lLCAhIXRvZ2dsZSk7XG59XG5cbi8qKlxuICogQHRlbXBsYXRlIFRcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gKiBAcGFyYW0ge1R9IFtkZXRhaWxdXG4gKiBAcGFyYW0ge3sgYnViYmxlcz86IGJvb2xlYW4sIGNhbmNlbGFibGU/OiBib29sZWFuIH19IFtvcHRpb25zXVxuICogQHJldHVybnMge0N1c3RvbUV2ZW50PFQ+fVxuICovXG5leHBvcnQgZnVuY3Rpb24gY3VzdG9tX2V2ZW50KHR5cGUsIGRldGFpbCwgeyBidWJibGVzID0gZmFsc2UsIGNhbmNlbGFibGUgPSBmYWxzZSB9ID0ge30pIHtcblx0cmV0dXJuIG5ldyBDdXN0b21FdmVudCh0eXBlLCB7IGRldGFpbCwgYnViYmxlcywgY2FuY2VsYWJsZSB9KTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3JcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHBhcmVudFxuICogQHJldHVybnMge0NoaWxkTm9kZUFycmF5fVxuICovXG5leHBvcnQgZnVuY3Rpb24gcXVlcnlfc2VsZWN0b3JfYWxsKHNlbGVjdG9yLCBwYXJlbnQgPSBkb2N1bWVudC5ib2R5KSB7XG5cdHJldHVybiBBcnJheS5mcm9tKHBhcmVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSk7XG59XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IG5vZGVJZFxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gaGVhZFxuICogQHJldHVybnMge2FueVtdfVxuICovXG5leHBvcnQgZnVuY3Rpb24gaGVhZF9zZWxlY3Rvcihub2RlSWQsIGhlYWQpIHtcblx0Y29uc3QgcmVzdWx0ID0gW107XG5cdGxldCBzdGFydGVkID0gMDtcblx0Zm9yIChjb25zdCBub2RlIG9mIGhlYWQuY2hpbGROb2Rlcykge1xuXHRcdGlmIChub2RlLm5vZGVUeXBlID09PSA4IC8qIGNvbW1lbnQgbm9kZSAqLykge1xuXHRcdFx0Y29uc3QgY29tbWVudCA9IG5vZGUudGV4dENvbnRlbnQudHJpbSgpO1xuXHRcdFx0aWYgKGNvbW1lbnQgPT09IGBIRUFEXyR7bm9kZUlkfV9FTkRgKSB7XG5cdFx0XHRcdHN0YXJ0ZWQgLT0gMTtcblx0XHRcdFx0cmVzdWx0LnB1c2gobm9kZSk7XG5cdFx0XHR9IGVsc2UgaWYgKGNvbW1lbnQgPT09IGBIRUFEXyR7bm9kZUlkfV9TVEFSVGApIHtcblx0XHRcdFx0c3RhcnRlZCArPSAxO1xuXHRcdFx0XHRyZXN1bHQucHVzaChub2RlKTtcblx0XHRcdH1cblx0XHR9IGVsc2UgaWYgKHN0YXJ0ZWQgPiAwKSB7XG5cdFx0XHRyZXN1bHQucHVzaChub2RlKTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn1cbi8qKiAqL1xuZXhwb3J0IGNsYXNzIEh0bWxUYWcge1xuXHQvKipcblx0ICogQHByaXZhdGVcblx0ICogQGRlZmF1bHQgZmFsc2Vcblx0ICovXG5cdGlzX3N2ZyA9IGZhbHNlO1xuXHQvKiogcGFyZW50IGZvciBjcmVhdGluZyBub2RlICovXG5cdGUgPSB1bmRlZmluZWQ7XG5cdC8qKiBodG1sIHRhZyBub2RlcyAqL1xuXHRuID0gdW5kZWZpbmVkO1xuXHQvKiogdGFyZ2V0ICovXG5cdHQgPSB1bmRlZmluZWQ7XG5cdC8qKiBhbmNob3IgKi9cblx0YSA9IHVuZGVmaW5lZDtcblx0Y29uc3RydWN0b3IoaXNfc3ZnID0gZmFsc2UpIHtcblx0XHR0aGlzLmlzX3N2ZyA9IGlzX3N2Zztcblx0XHR0aGlzLmUgPSB0aGlzLm4gPSBudWxsO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBodG1sXG5cdCAqIEByZXR1cm5zIHt2b2lkfVxuXHQgKi9cblx0YyhodG1sKSB7XG5cdFx0dGhpcy5oKGh0bWwpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBodG1sXG5cdCAqIEBwYXJhbSB7SFRNTEVsZW1lbnQgfCBTVkdFbGVtZW50fSB0YXJnZXRcblx0ICogQHBhcmFtIHtIVE1MRWxlbWVudCB8IFNWR0VsZW1lbnR9IGFuY2hvclxuXHQgKiBAcmV0dXJucyB7dm9pZH1cblx0ICovXG5cdG0oaHRtbCwgdGFyZ2V0LCBhbmNob3IgPSBudWxsKSB7XG5cdFx0aWYgKCF0aGlzLmUpIHtcblx0XHRcdGlmICh0aGlzLmlzX3N2Zylcblx0XHRcdFx0dGhpcy5lID0gc3ZnX2VsZW1lbnQoLyoqIEB0eXBlIHtrZXlvZiBTVkdFbGVtZW50VGFnTmFtZU1hcH0gKi8gKHRhcmdldC5ub2RlTmFtZSkpO1xuXHRcdFx0LyoqICM3MzY0ICB0YXJnZXQgZm9yIDx0ZW1wbGF0ZT4gbWF5IGJlIHByb3ZpZGVkIGFzICNkb2N1bWVudC1mcmFnbWVudCgxMSkgKi8gZWxzZVxuXHRcdFx0XHR0aGlzLmUgPSBlbGVtZW50KFxuXHRcdFx0XHRcdC8qKiBAdHlwZSB7a2V5b2YgSFRNTEVsZW1lbnRUYWdOYW1lTWFwfSAqLyAoXG5cdFx0XHRcdFx0XHR0YXJnZXQubm9kZVR5cGUgPT09IDExID8gJ1RFTVBMQVRFJyA6IHRhcmdldC5ub2RlTmFtZVxuXHRcdFx0XHRcdClcblx0XHRcdFx0KTtcblx0XHRcdHRoaXMudCA9XG5cdFx0XHRcdHRhcmdldC50YWdOYW1lICE9PSAnVEVNUExBVEUnXG5cdFx0XHRcdFx0PyB0YXJnZXRcblx0XHRcdFx0XHQ6IC8qKiBAdHlwZSB7SFRNTFRlbXBsYXRlRWxlbWVudH0gKi8gKHRhcmdldCkuY29udGVudDtcblx0XHRcdHRoaXMuYyhodG1sKTtcblx0XHR9XG5cdFx0dGhpcy5pKGFuY2hvcik7XG5cdH1cblxuXHQvKipcblx0ICogQHBhcmFtIHtzdHJpbmd9IGh0bWxcblx0ICogQHJldHVybnMge3ZvaWR9XG5cdCAqL1xuXHRoKGh0bWwpIHtcblx0XHR0aGlzLmUuaW5uZXJIVE1MID0gaHRtbDtcblx0XHR0aGlzLm4gPSBBcnJheS5mcm9tKFxuXHRcdFx0dGhpcy5lLm5vZGVOYW1lID09PSAnVEVNUExBVEUnID8gdGhpcy5lLmNvbnRlbnQuY2hpbGROb2RlcyA6IHRoaXMuZS5jaGlsZE5vZGVzXG5cdFx0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcmV0dXJucyB7dm9pZH0gKi9cblx0aShhbmNob3IpIHtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubi5sZW5ndGg7IGkgKz0gMSkge1xuXHRcdFx0aW5zZXJ0KHRoaXMudCwgdGhpcy5uW2ldLCBhbmNob3IpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gaHRtbFxuXHQgKiBAcmV0dXJucyB7dm9pZH1cblx0ICovXG5cdHAoaHRtbCkge1xuXHRcdHRoaXMuZCgpO1xuXHRcdHRoaXMuaChodG1sKTtcblx0XHR0aGlzLmkodGhpcy5hKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcmV0dXJucyB7dm9pZH0gKi9cblx0ZCgpIHtcblx0XHR0aGlzLm4uZm9yRWFjaChkZXRhY2gpO1xuXHR9XG59XG5cbmV4cG9ydCBjbGFzcyBIdG1sVGFnSHlkcmF0aW9uIGV4dGVuZHMgSHRtbFRhZyB7XG5cdC8qKiBAdHlwZSB7RWxlbWVudFtdfSBoeWRyYXRpb24gY2xhaW1lZCBub2RlcyAqL1xuXHRsID0gdW5kZWZpbmVkO1xuXG5cdGNvbnN0cnVjdG9yKGlzX3N2ZyA9IGZhbHNlLCBjbGFpbWVkX25vZGVzKSB7XG5cdFx0c3VwZXIoaXNfc3ZnKTtcblx0XHR0aGlzLmUgPSB0aGlzLm4gPSBudWxsO1xuXHRcdHRoaXMubCA9IGNsYWltZWRfbm9kZXM7XG5cdH1cblxuXHQvKipcblx0ICogQHBhcmFtIHtzdHJpbmd9IGh0bWxcblx0ICogQHJldHVybnMge3ZvaWR9XG5cdCAqL1xuXHRjKGh0bWwpIHtcblx0XHRpZiAodGhpcy5sKSB7XG5cdFx0XHR0aGlzLm4gPSB0aGlzLmw7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHN1cGVyLmMoaHRtbCk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEByZXR1cm5zIHt2b2lkfSAqL1xuXHRpKGFuY2hvcikge1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5uLmxlbmd0aDsgaSArPSAxKSB7XG5cdFx0XHRpbnNlcnRfaHlkcmF0aW9uKHRoaXMudCwgdGhpcy5uW2ldLCBhbmNob3IpO1xuXHRcdH1cblx0fVxufVxuXG4vKipcbiAqIEBwYXJhbSB7TmFtZWROb2RlTWFwfSBhdHRyaWJ1dGVzXG4gKiBAcmV0dXJucyB7e319XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhdHRyaWJ1dGVfdG9fb2JqZWN0KGF0dHJpYnV0ZXMpIHtcblx0Y29uc3QgcmVzdWx0ID0ge307XG5cdGZvciAoY29uc3QgYXR0cmlidXRlIG9mIGF0dHJpYnV0ZXMpIHtcblx0XHRyZXN1bHRbYXR0cmlidXRlLm5hbWVdID0gYXR0cmlidXRlLnZhbHVlO1xuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59XG5cbmNvbnN0IGVzY2FwZWQgPSB7XG5cdCdcIic6ICcmcXVvdDsnLFxuXHQnJic6ICcmYW1wOycsXG5cdCc8JzogJyZsdDsnXG59O1xuXG5jb25zdCByZWdleF9hdHRyaWJ1dGVfY2hhcmFjdGVyc190b19lc2NhcGUgPSAvW1wiJjxdL2c7XG5cbi8qKlxuICogTm90ZSB0aGF0IHRoZSBhdHRyaWJ1dGUgaXRzZWxmIHNob3VsZCBiZSBzdXJyb3VuZGVkIGluIGRvdWJsZSBxdW90ZXNcbiAqIEBwYXJhbSB7YW55fSBhdHRyaWJ1dGVcbiAqL1xuZnVuY3Rpb24gZXNjYXBlX2F0dHJpYnV0ZShhdHRyaWJ1dGUpIHtcblx0cmV0dXJuIFN0cmluZyhhdHRyaWJ1dGUpLnJlcGxhY2UocmVnZXhfYXR0cmlidXRlX2NoYXJhY3RlcnNfdG9fZXNjYXBlLCAobWF0Y2gpID0+IGVzY2FwZWRbbWF0Y2hdKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge1JlY29yZDxzdHJpbmcsIHN0cmluZz59IGF0dHJpYnV0ZXNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ2lmeV9zcHJlYWQoYXR0cmlidXRlcykge1xuXHRsZXQgc3RyID0gJyAnO1xuXHRmb3IgKGNvbnN0IGtleSBpbiBhdHRyaWJ1dGVzKSB7XG5cdFx0aWYgKGF0dHJpYnV0ZXNba2V5XSAhPSBudWxsKSB7XG5cdFx0XHRzdHIgKz0gYCR7a2V5fT1cIiR7ZXNjYXBlX2F0dHJpYnV0ZShhdHRyaWJ1dGVzW2tleV0pfVwiIGA7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHN0cjtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKiBAcmV0dXJucyB7e319XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRfY3VzdG9tX2VsZW1lbnRzX3Nsb3RzKGVsZW1lbnQpIHtcblx0Y29uc3QgcmVzdWx0ID0ge307XG5cdGVsZW1lbnQuY2hpbGROb2Rlcy5mb3JFYWNoKFxuXHRcdC8qKiBAcGFyYW0ge0VsZW1lbnR9IG5vZGUgKi8gKG5vZGUpID0+IHtcblx0XHRcdHJlc3VsdFtub2RlLnNsb3QgfHwgJ2RlZmF1bHQnXSA9IHRydWU7XG5cdFx0fVxuXHQpO1xuXHRyZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29uc3RydWN0X3N2ZWx0ZV9jb21wb25lbnQoY29tcG9uZW50LCBwcm9wcykge1xuXHRyZXR1cm4gbmV3IGNvbXBvbmVudChwcm9wcyk7XG59XG5cbi8qKlxuICogQHR5cGVkZWYge05vZGUgJiB7XG4gKiBcdGNsYWltX29yZGVyPzogbnVtYmVyO1xuICogXHRoeWRyYXRlX2luaXQ/OiB0cnVlO1xuICogXHRhY3R1YWxfZW5kX2NoaWxkPzogTm9kZUV4O1xuICogXHRjaGlsZE5vZGVzOiBOb2RlTGlzdE9mPE5vZGVFeD47XG4gKiB9fSBOb2RlRXhcbiAqL1xuXG4vKiogQHR5cGVkZWYge0NoaWxkTm9kZSAmIE5vZGVFeH0gQ2hpbGROb2RlRXggKi9cblxuLyoqIEB0eXBlZGVmIHtOb2RlRXggJiB7IGNsYWltX29yZGVyOiBudW1iZXIgfX0gTm9kZUV4MiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtDaGlsZE5vZGVFeFtdICYge1xuICogXHRjbGFpbV9pbmZvPzoge1xuICogXHRcdGxhc3RfaW5kZXg6IG51bWJlcjtcbiAqIFx0XHR0b3RhbF9jbGFpbWVkOiBudW1iZXI7XG4gKiBcdH07XG4gKiB9fSBDaGlsZE5vZGVBcnJheVxuICovXG4iLCAiaW1wb3J0IHsgY3VzdG9tX2V2ZW50IH0gZnJvbSAnLi9kb20uanMnO1xuXG5leHBvcnQgbGV0IGN1cnJlbnRfY29tcG9uZW50O1xuXG4vKiogQHJldHVybnMge3ZvaWR9ICovXG5leHBvcnQgZnVuY3Rpb24gc2V0X2N1cnJlbnRfY29tcG9uZW50KGNvbXBvbmVudCkge1xuXHRjdXJyZW50X2NvbXBvbmVudCA9IGNvbXBvbmVudDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldF9jdXJyZW50X2NvbXBvbmVudCgpIHtcblx0aWYgKCFjdXJyZW50X2NvbXBvbmVudCkgdGhyb3cgbmV3IEVycm9yKCdGdW5jdGlvbiBjYWxsZWQgb3V0c2lkZSBjb21wb25lbnQgaW5pdGlhbGl6YXRpb24nKTtcblx0cmV0dXJuIGN1cnJlbnRfY29tcG9uZW50O1xufVxuXG4vKipcbiAqIFNjaGVkdWxlcyBhIGNhbGxiYWNrIHRvIHJ1biBpbW1lZGlhdGVseSBiZWZvcmUgdGhlIGNvbXBvbmVudCBpcyB1cGRhdGVkIGFmdGVyIGFueSBzdGF0ZSBjaGFuZ2UuXG4gKlxuICogVGhlIGZpcnN0IHRpbWUgdGhlIGNhbGxiYWNrIHJ1bnMgd2lsbCBiZSBiZWZvcmUgdGhlIGluaXRpYWwgYG9uTW91bnRgXG4gKlxuICogaHR0cHM6Ly9zdmVsdGUuZGV2L2RvY3Mvc3ZlbHRlI2JlZm9yZXVwZGF0ZVxuICogQHBhcmFtIHsoKSA9PiBhbnl9IGZuXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJlZm9yZVVwZGF0ZShmbikge1xuXHRnZXRfY3VycmVudF9jb21wb25lbnQoKS4kJC5iZWZvcmVfdXBkYXRlLnB1c2goZm4pO1xufVxuXG4vKipcbiAqIFRoZSBgb25Nb3VudGAgZnVuY3Rpb24gc2NoZWR1bGVzIGEgY2FsbGJhY2sgdG8gcnVuIGFzIHNvb24gYXMgdGhlIGNvbXBvbmVudCBoYXMgYmVlbiBtb3VudGVkIHRvIHRoZSBET00uXG4gKiBJdCBtdXN0IGJlIGNhbGxlZCBkdXJpbmcgdGhlIGNvbXBvbmVudCdzIGluaXRpYWxpc2F0aW9uIChidXQgZG9lc24ndCBuZWVkIHRvIGxpdmUgKmluc2lkZSogdGhlIGNvbXBvbmVudDtcbiAqIGl0IGNhbiBiZSBjYWxsZWQgZnJvbSBhbiBleHRlcm5hbCBtb2R1bGUpLlxuICpcbiAqIElmIGEgZnVuY3Rpb24gaXMgcmV0dXJuZWQgX3N5bmNocm9ub3VzbHlfIGZyb20gYG9uTW91bnRgLCBpdCB3aWxsIGJlIGNhbGxlZCB3aGVuIHRoZSBjb21wb25lbnQgaXMgdW5tb3VudGVkLlxuICpcbiAqIGBvbk1vdW50YCBkb2VzIG5vdCBydW4gaW5zaWRlIGEgW3NlcnZlci1zaWRlIGNvbXBvbmVudF0oaHR0cHM6Ly9zdmVsdGUuZGV2L2RvY3MjcnVuLXRpbWUtc2VydmVyLXNpZGUtY29tcG9uZW50LWFwaSkuXG4gKlxuICogaHR0cHM6Ly9zdmVsdGUuZGV2L2RvY3Mvc3ZlbHRlI29ubW91bnRcbiAqIEB0ZW1wbGF0ZSBUXG4gKiBAcGFyYW0geygpID0+IGltcG9ydCgnLi9wcml2YXRlLmpzJykuTm90RnVuY3Rpb248VD4gfCBQcm9taXNlPGltcG9ydCgnLi9wcml2YXRlLmpzJykuTm90RnVuY3Rpb248VD4+IHwgKCgpID0+IGFueSl9IGZuXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG9uTW91bnQoZm4pIHtcblx0Z2V0X2N1cnJlbnRfY29tcG9uZW50KCkuJCQub25fbW91bnQucHVzaChmbik7XG59XG5cbi8qKlxuICogU2NoZWR1bGVzIGEgY2FsbGJhY2sgdG8gcnVuIGltbWVkaWF0ZWx5IGFmdGVyIHRoZSBjb21wb25lbnQgaGFzIGJlZW4gdXBkYXRlZC5cbiAqXG4gKiBUaGUgZmlyc3QgdGltZSB0aGUgY2FsbGJhY2sgcnVucyB3aWxsIGJlIGFmdGVyIHRoZSBpbml0aWFsIGBvbk1vdW50YFxuICpcbiAqIGh0dHBzOi8vc3ZlbHRlLmRldi9kb2NzL3N2ZWx0ZSNhZnRlcnVwZGF0ZVxuICogQHBhcmFtIHsoKSA9PiBhbnl9IGZuXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFmdGVyVXBkYXRlKGZuKSB7XG5cdGdldF9jdXJyZW50X2NvbXBvbmVudCgpLiQkLmFmdGVyX3VwZGF0ZS5wdXNoKGZuKTtcbn1cblxuLyoqXG4gKiBTY2hlZHVsZXMgYSBjYWxsYmFjayB0byBydW4gaW1tZWRpYXRlbHkgYmVmb3JlIHRoZSBjb21wb25lbnQgaXMgdW5tb3VudGVkLlxuICpcbiAqIE91dCBvZiBgb25Nb3VudGAsIGBiZWZvcmVVcGRhdGVgLCBgYWZ0ZXJVcGRhdGVgIGFuZCBgb25EZXN0cm95YCwgdGhpcyBpcyB0aGVcbiAqIG9ubHkgb25lIHRoYXQgcnVucyBpbnNpZGUgYSBzZXJ2ZXItc2lkZSBjb21wb25lbnQuXG4gKlxuICogaHR0cHM6Ly9zdmVsdGUuZGV2L2RvY3Mvc3ZlbHRlI29uZGVzdHJveVxuICogQHBhcmFtIHsoKSA9PiBhbnl9IGZuXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG9uRGVzdHJveShmbikge1xuXHRnZXRfY3VycmVudF9jb21wb25lbnQoKS4kJC5vbl9kZXN0cm95LnB1c2goZm4pO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYW4gZXZlbnQgZGlzcGF0Y2hlciB0aGF0IGNhbiBiZSB1c2VkIHRvIGRpc3BhdGNoIFtjb21wb25lbnQgZXZlbnRzXShodHRwczovL3N2ZWx0ZS5kZXYvZG9jcyN0ZW1wbGF0ZS1zeW50YXgtY29tcG9uZW50LWRpcmVjdGl2ZXMtb24tZXZlbnRuYW1lKS5cbiAqIEV2ZW50IGRpc3BhdGNoZXJzIGFyZSBmdW5jdGlvbnMgdGhhdCBjYW4gdGFrZSB0d28gYXJndW1lbnRzOiBgbmFtZWAgYW5kIGBkZXRhaWxgLlxuICpcbiAqIENvbXBvbmVudCBldmVudHMgY3JlYXRlZCB3aXRoIGBjcmVhdGVFdmVudERpc3BhdGNoZXJgIGNyZWF0ZSBhXG4gKiBbQ3VzdG9tRXZlbnRdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9DdXN0b21FdmVudCkuXG4gKiBUaGVzZSBldmVudHMgZG8gbm90IFtidWJibGVdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvTGVhcm4vSmF2YVNjcmlwdC9CdWlsZGluZ19ibG9ja3MvRXZlbnRzI0V2ZW50X2J1YmJsaW5nX2FuZF9jYXB0dXJlKS5cbiAqIFRoZSBgZGV0YWlsYCBhcmd1bWVudCBjb3JyZXNwb25kcyB0byB0aGUgW0N1c3RvbUV2ZW50LmRldGFpbF0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0N1c3RvbUV2ZW50L2RldGFpbClcbiAqIHByb3BlcnR5IGFuZCBjYW4gY29udGFpbiBhbnkgdHlwZSBvZiBkYXRhLlxuICpcbiAqIFRoZSBldmVudCBkaXNwYXRjaGVyIGNhbiBiZSB0eXBlZCB0byBuYXJyb3cgdGhlIGFsbG93ZWQgZXZlbnQgbmFtZXMgYW5kIHRoZSB0eXBlIG9mIHRoZSBgZGV0YWlsYCBhcmd1bWVudDpcbiAqIGBgYHRzXG4gKiBjb25zdCBkaXNwYXRjaCA9IGNyZWF0ZUV2ZW50RGlzcGF0Y2hlcjx7XG4gKiAgbG9hZGVkOiBuZXZlcjsgLy8gZG9lcyBub3QgdGFrZSBhIGRldGFpbCBhcmd1bWVudFxuICogIGNoYW5nZTogc3RyaW5nOyAvLyB0YWtlcyBhIGRldGFpbCBhcmd1bWVudCBvZiB0eXBlIHN0cmluZywgd2hpY2ggaXMgcmVxdWlyZWRcbiAqICBvcHRpb25hbDogbnVtYmVyIHwgbnVsbDsgLy8gdGFrZXMgYW4gb3B0aW9uYWwgZGV0YWlsIGFyZ3VtZW50IG9mIHR5cGUgbnVtYmVyXG4gKiB9PigpO1xuICogYGBgXG4gKlxuICogaHR0cHM6Ly9zdmVsdGUuZGV2L2RvY3Mvc3ZlbHRlI2NyZWF0ZWV2ZW50ZGlzcGF0Y2hlclxuICogQHRlbXBsYXRlIHtSZWNvcmQ8c3RyaW5nLCBhbnk+fSBbRXZlbnRNYXA9YW55XVxuICogQHJldHVybnMge2ltcG9ydCgnLi9wdWJsaWMuanMnKS5FdmVudERpc3BhdGNoZXI8RXZlbnRNYXA+fVxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRXZlbnREaXNwYXRjaGVyKCkge1xuXHRjb25zdCBjb21wb25lbnQgPSBnZXRfY3VycmVudF9jb21wb25lbnQoKTtcblx0cmV0dXJuICh0eXBlLCBkZXRhaWwsIHsgY2FuY2VsYWJsZSA9IGZhbHNlIH0gPSB7fSkgPT4ge1xuXHRcdGNvbnN0IGNhbGxiYWNrcyA9IGNvbXBvbmVudC4kJC5jYWxsYmFja3NbdHlwZV07XG5cdFx0aWYgKGNhbGxiYWNrcykge1xuXHRcdFx0Ly8gVE9ETyBhcmUgdGhlcmUgc2l0dWF0aW9ucyB3aGVyZSBldmVudHMgY291bGQgYmUgZGlzcGF0Y2hlZFxuXHRcdFx0Ly8gaW4gYSBzZXJ2ZXIgKG5vbi1ET00pIGVudmlyb25tZW50P1xuXHRcdFx0Y29uc3QgZXZlbnQgPSBjdXN0b21fZXZlbnQoLyoqIEB0eXBlIHtzdHJpbmd9ICovICh0eXBlKSwgZGV0YWlsLCB7IGNhbmNlbGFibGUgfSk7XG5cdFx0XHRjYWxsYmFja3Muc2xpY2UoKS5mb3JFYWNoKChmbikgPT4ge1xuXHRcdFx0XHRmbi5jYWxsKGNvbXBvbmVudCwgZXZlbnQpO1xuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gIWV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQ7XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9O1xufVxuXG4vKipcbiAqIEFzc29jaWF0ZXMgYW4gYXJiaXRyYXJ5IGBjb250ZXh0YCBvYmplY3Qgd2l0aCB0aGUgY3VycmVudCBjb21wb25lbnQgYW5kIHRoZSBzcGVjaWZpZWQgYGtleWBcbiAqIGFuZCByZXR1cm5zIHRoYXQgb2JqZWN0LiBUaGUgY29udGV4dCBpcyB0aGVuIGF2YWlsYWJsZSB0byBjaGlsZHJlbiBvZiB0aGUgY29tcG9uZW50XG4gKiAoaW5jbHVkaW5nIHNsb3R0ZWQgY29udGVudCkgd2l0aCBgZ2V0Q29udGV4dGAuXG4gKlxuICogTGlrZSBsaWZlY3ljbGUgZnVuY3Rpb25zLCB0aGlzIG11c3QgYmUgY2FsbGVkIGR1cmluZyBjb21wb25lbnQgaW5pdGlhbGlzYXRpb24uXG4gKlxuICogaHR0cHM6Ly9zdmVsdGUuZGV2L2RvY3Mvc3ZlbHRlI3NldGNvbnRleHRcbiAqIEB0ZW1wbGF0ZSBUXG4gKiBAcGFyYW0ge2FueX0ga2V5XG4gKiBAcGFyYW0ge1R9IGNvbnRleHRcbiAqIEByZXR1cm5zIHtUfVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0Q29udGV4dChrZXksIGNvbnRleHQpIHtcblx0Z2V0X2N1cnJlbnRfY29tcG9uZW50KCkuJCQuY29udGV4dC5zZXQoa2V5LCBjb250ZXh0KTtcblx0cmV0dXJuIGNvbnRleHQ7XG59XG5cbi8qKlxuICogUmV0cmlldmVzIHRoZSBjb250ZXh0IHRoYXQgYmVsb25ncyB0byB0aGUgY2xvc2VzdCBwYXJlbnQgY29tcG9uZW50IHdpdGggdGhlIHNwZWNpZmllZCBga2V5YC5cbiAqIE11c3QgYmUgY2FsbGVkIGR1cmluZyBjb21wb25lbnQgaW5pdGlhbGlzYXRpb24uXG4gKlxuICogaHR0cHM6Ly9zdmVsdGUuZGV2L2RvY3Mvc3ZlbHRlI2dldGNvbnRleHRcbiAqIEB0ZW1wbGF0ZSBUXG4gKiBAcGFyYW0ge2FueX0ga2V5XG4gKiBAcmV0dXJucyB7VH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldENvbnRleHQoa2V5KSB7XG5cdHJldHVybiBnZXRfY3VycmVudF9jb21wb25lbnQoKS4kJC5jb250ZXh0LmdldChrZXkpO1xufVxuXG4vKipcbiAqIFJldHJpZXZlcyB0aGUgd2hvbGUgY29udGV4dCBtYXAgdGhhdCBiZWxvbmdzIHRvIHRoZSBjbG9zZXN0IHBhcmVudCBjb21wb25lbnQuXG4gKiBNdXN0IGJlIGNhbGxlZCBkdXJpbmcgY29tcG9uZW50IGluaXRpYWxpc2F0aW9uLiBVc2VmdWwsIGZvciBleGFtcGxlLCBpZiB5b3VcbiAqIHByb2dyYW1tYXRpY2FsbHkgY3JlYXRlIGEgY29tcG9uZW50IGFuZCB3YW50IHRvIHBhc3MgdGhlIGV4aXN0aW5nIGNvbnRleHQgdG8gaXQuXG4gKlxuICogaHR0cHM6Ly9zdmVsdGUuZGV2L2RvY3Mvc3ZlbHRlI2dldGFsbGNvbnRleHRzXG4gKiBAdGVtcGxhdGUge01hcDxhbnksIGFueT59IFtUPU1hcDxhbnksIGFueT5dXG4gKiBAcmV0dXJucyB7VH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEFsbENvbnRleHRzKCkge1xuXHRyZXR1cm4gZ2V0X2N1cnJlbnRfY29tcG9uZW50KCkuJCQuY29udGV4dDtcbn1cblxuLyoqXG4gKiBDaGVja3Mgd2hldGhlciBhIGdpdmVuIGBrZXlgIGhhcyBiZWVuIHNldCBpbiB0aGUgY29udGV4dCBvZiBhIHBhcmVudCBjb21wb25lbnQuXG4gKiBNdXN0IGJlIGNhbGxlZCBkdXJpbmcgY29tcG9uZW50IGluaXRpYWxpc2F0aW9uLlxuICpcbiAqIGh0dHBzOi8vc3ZlbHRlLmRldi9kb2NzL3N2ZWx0ZSNoYXNjb250ZXh0XG4gKiBAcGFyYW0ge2FueX0ga2V5XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhhc0NvbnRleHQoa2V5KSB7XG5cdHJldHVybiBnZXRfY3VycmVudF9jb21wb25lbnQoKS4kJC5jb250ZXh0LmhhcyhrZXkpO1xufVxuXG4vLyBUT0RPIGZpZ3VyZSBvdXQgaWYgd2Ugc3RpbGwgd2FudCB0byBzdXBwb3J0XG4vLyBzaG9ydGhhbmQgZXZlbnRzLCBvciBpZiB3ZSB3YW50IHRvIGltcGxlbWVudFxuLy8gYSByZWFsIGJ1YmJsaW5nIG1lY2hhbmlzbVxuLyoqXG4gKiBAcGFyYW0gY29tcG9uZW50XG4gKiBAcGFyYW0gZXZlbnRcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gYnViYmxlKGNvbXBvbmVudCwgZXZlbnQpIHtcblx0Y29uc3QgY2FsbGJhY2tzID0gY29tcG9uZW50LiQkLmNhbGxiYWNrc1tldmVudC50eXBlXTtcblx0aWYgKGNhbGxiYWNrcykge1xuXHRcdC8vIEB0cy1pZ25vcmVcblx0XHRjYWxsYmFja3Muc2xpY2UoKS5mb3JFYWNoKChmbikgPT4gZm4uY2FsbCh0aGlzLCBldmVudCkpO1xuXHR9XG59XG4iLCAiaW1wb3J0IHsgdHJhbnNpdGlvbl9pbiwgdHJhbnNpdGlvbl9vdXQgfSBmcm9tICcuL3RyYW5zaXRpb25zLmpzJztcbmltcG9ydCB7IHJ1bl9hbGwgfSBmcm9tICcuL3V0aWxzLmpzJztcblxuLy8gZ2VuZXJhbCBlYWNoIGZ1bmN0aW9uczpcblxuZXhwb3J0IGZ1bmN0aW9uIGVuc3VyZV9hcnJheV9saWtlKGFycmF5X2xpa2Vfb3JfaXRlcmF0b3IpIHtcblx0cmV0dXJuIGFycmF5X2xpa2Vfb3JfaXRlcmF0b3I/Lmxlbmd0aCAhPT0gdW5kZWZpbmVkXG5cdFx0PyBhcnJheV9saWtlX29yX2l0ZXJhdG9yXG5cdFx0OiBBcnJheS5mcm9tKGFycmF5X2xpa2Vfb3JfaXRlcmF0b3IpO1xufVxuXG4vLyBrZXllZCBlYWNoIGZ1bmN0aW9uczpcblxuLyoqIEByZXR1cm5zIHt2b2lkfSAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlc3Ryb3lfYmxvY2soYmxvY2ssIGxvb2t1cCkge1xuXHRibG9jay5kKDEpO1xuXHRsb29rdXAuZGVsZXRlKGJsb2NrLmtleSk7XG59XG5cbi8qKiBAcmV0dXJucyB7dm9pZH0gKi9cbmV4cG9ydCBmdW5jdGlvbiBvdXRyb19hbmRfZGVzdHJveV9ibG9jayhibG9jaywgbG9va3VwKSB7XG5cdHRyYW5zaXRpb25fb3V0KGJsb2NrLCAxLCAxLCAoKSA9PiB7XG5cdFx0bG9va3VwLmRlbGV0ZShibG9jay5rZXkpO1xuXHR9KTtcbn1cblxuLyoqIEByZXR1cm5zIHt2b2lkfSAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZpeF9hbmRfZGVzdHJveV9ibG9jayhibG9jaywgbG9va3VwKSB7XG5cdGJsb2NrLmYoKTtcblx0ZGVzdHJveV9ibG9jayhibG9jaywgbG9va3VwKTtcbn1cblxuLyoqIEByZXR1cm5zIHt2b2lkfSAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZpeF9hbmRfb3V0cm9fYW5kX2Rlc3Ryb3lfYmxvY2soYmxvY2ssIGxvb2t1cCkge1xuXHRibG9jay5mKCk7XG5cdG91dHJvX2FuZF9kZXN0cm95X2Jsb2NrKGJsb2NrLCBsb29rdXApO1xufVxuXG4vKiogQHJldHVybnMge2FueVtdfSAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZV9rZXllZF9lYWNoKFxuXHRvbGRfYmxvY2tzLFxuXHRkaXJ0eSxcblx0Z2V0X2tleSxcblx0ZHluYW1pYyxcblx0Y3R4LFxuXHRsaXN0LFxuXHRsb29rdXAsXG5cdG5vZGUsXG5cdGRlc3Ryb3ksXG5cdGNyZWF0ZV9lYWNoX2Jsb2NrLFxuXHRuZXh0LFxuXHRnZXRfY29udGV4dFxuKSB7XG5cdGxldCBvID0gb2xkX2Jsb2Nrcy5sZW5ndGg7XG5cdGxldCBuID0gbGlzdC5sZW5ndGg7XG5cdGxldCBpID0gbztcblx0Y29uc3Qgb2xkX2luZGV4ZXMgPSB7fTtcblx0d2hpbGUgKGktLSkgb2xkX2luZGV4ZXNbb2xkX2Jsb2Nrc1tpXS5rZXldID0gaTtcblx0Y29uc3QgbmV3X2Jsb2NrcyA9IFtdO1xuXHRjb25zdCBuZXdfbG9va3VwID0gbmV3IE1hcCgpO1xuXHRjb25zdCBkZWx0YXMgPSBuZXcgTWFwKCk7XG5cdGNvbnN0IHVwZGF0ZXMgPSBbXTtcblx0aSA9IG47XG5cdHdoaWxlIChpLS0pIHtcblx0XHRjb25zdCBjaGlsZF9jdHggPSBnZXRfY29udGV4dChjdHgsIGxpc3QsIGkpO1xuXHRcdGNvbnN0IGtleSA9IGdldF9rZXkoY2hpbGRfY3R4KTtcblx0XHRsZXQgYmxvY2sgPSBsb29rdXAuZ2V0KGtleSk7XG5cdFx0aWYgKCFibG9jaykge1xuXHRcdFx0YmxvY2sgPSBjcmVhdGVfZWFjaF9ibG9jayhrZXksIGNoaWxkX2N0eCk7XG5cdFx0XHRibG9jay5jKCk7XG5cdFx0fSBlbHNlIGlmIChkeW5hbWljKSB7XG5cdFx0XHQvLyBkZWZlciB1cGRhdGVzIHVudGlsIGFsbCB0aGUgRE9NIHNodWZmbGluZyBpcyBkb25lXG5cdFx0XHR1cGRhdGVzLnB1c2goKCkgPT4gYmxvY2sucChjaGlsZF9jdHgsIGRpcnR5KSk7XG5cdFx0fVxuXHRcdG5ld19sb29rdXAuc2V0KGtleSwgKG5ld19ibG9ja3NbaV0gPSBibG9jaykpO1xuXHRcdGlmIChrZXkgaW4gb2xkX2luZGV4ZXMpIGRlbHRhcy5zZXQoa2V5LCBNYXRoLmFicyhpIC0gb2xkX2luZGV4ZXNba2V5XSkpO1xuXHR9XG5cdGNvbnN0IHdpbGxfbW92ZSA9IG5ldyBTZXQoKTtcblx0Y29uc3QgZGlkX21vdmUgPSBuZXcgU2V0KCk7XG5cdC8qKiBAcmV0dXJucyB7dm9pZH0gKi9cblx0ZnVuY3Rpb24gaW5zZXJ0KGJsb2NrKSB7XG5cdFx0dHJhbnNpdGlvbl9pbihibG9jaywgMSk7XG5cdFx0YmxvY2subShub2RlLCBuZXh0KTtcblx0XHRsb29rdXAuc2V0KGJsb2NrLmtleSwgYmxvY2spO1xuXHRcdG5leHQgPSBibG9jay5maXJzdDtcblx0XHRuLS07XG5cdH1cblx0d2hpbGUgKG8gJiYgbikge1xuXHRcdGNvbnN0IG5ld19ibG9jayA9IG5ld19ibG9ja3NbbiAtIDFdO1xuXHRcdGNvbnN0IG9sZF9ibG9jayA9IG9sZF9ibG9ja3NbbyAtIDFdO1xuXHRcdGNvbnN0IG5ld19rZXkgPSBuZXdfYmxvY2sua2V5O1xuXHRcdGNvbnN0IG9sZF9rZXkgPSBvbGRfYmxvY2sua2V5O1xuXHRcdGlmIChuZXdfYmxvY2sgPT09IG9sZF9ibG9jaykge1xuXHRcdFx0Ly8gZG8gbm90aGluZ1xuXHRcdFx0bmV4dCA9IG5ld19ibG9jay5maXJzdDtcblx0XHRcdG8tLTtcblx0XHRcdG4tLTtcblx0XHR9IGVsc2UgaWYgKCFuZXdfbG9va3VwLmhhcyhvbGRfa2V5KSkge1xuXHRcdFx0Ly8gcmVtb3ZlIG9sZCBibG9ja1xuXHRcdFx0ZGVzdHJveShvbGRfYmxvY2ssIGxvb2t1cCk7XG5cdFx0XHRvLS07XG5cdFx0fSBlbHNlIGlmICghbG9va3VwLmhhcyhuZXdfa2V5KSB8fCB3aWxsX21vdmUuaGFzKG5ld19rZXkpKSB7XG5cdFx0XHRpbnNlcnQobmV3X2Jsb2NrKTtcblx0XHR9IGVsc2UgaWYgKGRpZF9tb3ZlLmhhcyhvbGRfa2V5KSkge1xuXHRcdFx0by0tO1xuXHRcdH0gZWxzZSBpZiAoZGVsdGFzLmdldChuZXdfa2V5KSA+IGRlbHRhcy5nZXQob2xkX2tleSkpIHtcblx0XHRcdGRpZF9tb3ZlLmFkZChuZXdfa2V5KTtcblx0XHRcdGluc2VydChuZXdfYmxvY2spO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR3aWxsX21vdmUuYWRkKG9sZF9rZXkpO1xuXHRcdFx0by0tO1xuXHRcdH1cblx0fVxuXHR3aGlsZSAoby0tKSB7XG5cdFx0Y29uc3Qgb2xkX2Jsb2NrID0gb2xkX2Jsb2Nrc1tvXTtcblx0XHRpZiAoIW5ld19sb29rdXAuaGFzKG9sZF9ibG9jay5rZXkpKSBkZXN0cm95KG9sZF9ibG9jaywgbG9va3VwKTtcblx0fVxuXHR3aGlsZSAobikgaW5zZXJ0KG5ld19ibG9ja3NbbiAtIDFdKTtcblx0cnVuX2FsbCh1cGRhdGVzKTtcblx0cmV0dXJuIG5ld19ibG9ja3M7XG59XG5cbi8qKiBAcmV0dXJucyB7dm9pZH0gKi9cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZV9lYWNoX2tleXMoY3R4LCBsaXN0LCBnZXRfY29udGV4dCwgZ2V0X2tleSkge1xuXHRjb25zdCBrZXlzID0gbmV3IE1hcCgpO1xuXHRmb3IgKGxldCBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcblx0XHRjb25zdCBrZXkgPSBnZXRfa2V5KGdldF9jb250ZXh0KGN0eCwgbGlzdCwgaSkpO1xuXHRcdGlmIChrZXlzLmhhcyhrZXkpKSB7XG5cdFx0XHRsZXQgdmFsdWUgPSAnJztcblx0XHRcdHRyeSB7XG5cdFx0XHRcdHZhbHVlID0gYHdpdGggdmFsdWUgJyR7U3RyaW5nKGtleSl9JyBgO1xuXHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHQvLyBjYW4ndCBzdHJpbmdpZnlcblx0XHRcdH1cblx0XHRcdHRocm93IG5ldyBFcnJvcihcblx0XHRcdFx0YENhbm5vdCBoYXZlIGR1cGxpY2F0ZSBrZXlzIGluIGEga2V5ZWQgZWFjaDogS2V5cyBhdCBpbmRleCAke2tleXMuZ2V0KFxuXHRcdFx0XHRcdGtleVxuXHRcdFx0XHQpfSBhbmQgJHtpfSAke3ZhbHVlfWFyZSBkdXBsaWNhdGVzYFxuXHRcdFx0KTtcblx0XHR9XG5cdFx0a2V5cy5zZXQoa2V5LCBpKTtcblx0fVxufVxuIiwgImNvbnN0IF9ib29sZWFuX2F0dHJpYnV0ZXMgPSAvKiogQHR5cGUge2NvbnN0fSAqLyAoW1xuXHQnYWxsb3dmdWxsc2NyZWVuJyxcblx0J2FsbG93cGF5bWVudHJlcXVlc3QnLFxuXHQnYXN5bmMnLFxuXHQnYXV0b2ZvY3VzJyxcblx0J2F1dG9wbGF5Jyxcblx0J2NoZWNrZWQnLFxuXHQnY29udHJvbHMnLFxuXHQnZGVmYXVsdCcsXG5cdCdkZWZlcicsXG5cdCdkaXNhYmxlZCcsXG5cdCdmb3Jtbm92YWxpZGF0ZScsXG5cdCdoaWRkZW4nLFxuXHQnaW5lcnQnLFxuXHQnaXNtYXAnLFxuXHQnbG9vcCcsXG5cdCdtdWx0aXBsZScsXG5cdCdtdXRlZCcsXG5cdCdub21vZHVsZScsXG5cdCdub3ZhbGlkYXRlJyxcblx0J29wZW4nLFxuXHQncGxheXNpbmxpbmUnLFxuXHQncmVhZG9ubHknLFxuXHQncmVxdWlyZWQnLFxuXHQncmV2ZXJzZWQnLFxuXHQnc2VsZWN0ZWQnXG5dKTtcblxuLyoqXG4gKiBMaXN0IG9mIEhUTUwgYm9vbGVhbiBhdHRyaWJ1dGVzIChlLmcuIGA8aW5wdXQgZGlzYWJsZWQ+YCkuXG4gKiBTb3VyY2U6IGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL2luZGljZXMuaHRtbFxuICpcbiAqIEB0eXBlIHtTZXQ8c3RyaW5nPn1cbiAqL1xuZXhwb3J0IGNvbnN0IGJvb2xlYW5fYXR0cmlidXRlcyA9IG5ldyBTZXQoWy4uLl9ib29sZWFuX2F0dHJpYnV0ZXNdKTtcblxuLyoqIEB0eXBlZGVmIHt0eXBlb2YgX2Jvb2xlYW5fYXR0cmlidXRlc1tudW1iZXJdfSBCb29sZWFuQXR0cmlidXRlcyAqL1xuIiwgImNvbnN0IEFUVFJfUkVHRVggPSAvWyZcIjxdL2c7XG5jb25zdCBDT05URU5UX1JFR0VYID0gL1smPF0vZztcblxuLyoqXG4gKiBOb3RlOiB0aGlzIG1ldGhvZCBpcyBwZXJmb3JtYW5jZSBzZW5zaXRpdmUgYW5kIGhhcyBiZWVuIG9wdGltaXplZFxuICogaHR0cHM6Ly9naXRodWIuY29tL3N2ZWx0ZWpzL3N2ZWx0ZS9wdWxsLzU3MDFcbiAqIEBwYXJhbSB7dW5rbm93bn0gdmFsdWVcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBlc2NhcGUodmFsdWUsIGlzX2F0dHIgPSBmYWxzZSkge1xuXHRjb25zdCBzdHIgPSBTdHJpbmcodmFsdWUpO1xuXHRjb25zdCBwYXR0ZXJuID0gaXNfYXR0ciA/IEFUVFJfUkVHRVggOiBDT05URU5UX1JFR0VYO1xuXHRwYXR0ZXJuLmxhc3RJbmRleCA9IDA7XG5cdGxldCBlc2NhcGVkID0gJyc7XG5cdGxldCBsYXN0ID0gMDtcblx0d2hpbGUgKHBhdHRlcm4udGVzdChzdHIpKSB7XG5cdFx0Y29uc3QgaSA9IHBhdHRlcm4ubGFzdEluZGV4IC0gMTtcblx0XHRjb25zdCBjaCA9IHN0cltpXTtcblx0XHRlc2NhcGVkICs9IHN0ci5zdWJzdHJpbmcobGFzdCwgaSkgKyAoY2ggPT09ICcmJyA/ICcmYW1wOycgOiBjaCA9PT0gJ1wiJyA/ICcmcXVvdDsnIDogJyZsdDsnKTtcblx0XHRsYXN0ID0gaSArIDE7XG5cdH1cblx0cmV0dXJuIGVzY2FwZWQgKyBzdHIuc3Vic3RyaW5nKGxhc3QpO1xufVxuIiwgImltcG9ydCB7IHNldF9jdXJyZW50X2NvbXBvbmVudCwgY3VycmVudF9jb21wb25lbnQgfSBmcm9tICcuL2xpZmVjeWNsZS5qcyc7XG5pbXBvcnQgeyBydW5fYWxsLCBibGFua19vYmplY3QgfSBmcm9tICcuL3V0aWxzLmpzJztcbmltcG9ydCB7IGJvb2xlYW5fYXR0cmlidXRlcyB9IGZyb20gJy4uLy4uL3NoYXJlZC9ib29sZWFuX2F0dHJpYnV0ZXMuanMnO1xuaW1wb3J0IHsgZW5zdXJlX2FycmF5X2xpa2UgfSBmcm9tICcuL2VhY2guanMnO1xuaW1wb3J0IHsgZXNjYXBlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3V0aWxzL2VzY2FwZS5qcyc7XG5leHBvcnQgeyBpc192b2lkIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3V0aWxzL25hbWVzLmpzJztcbmV4cG9ydCB7IGVzY2FwZSB9O1xuXG5leHBvcnQgY29uc3QgaW52YWxpZF9hdHRyaWJ1dGVfbmFtZV9jaGFyYWN0ZXIgPVxuXHQvW1xccydcIj4vPVxcdXtGREQwfS1cXHV7RkRFRn1cXHV7RkZGRX1cXHV7RkZGRn1cXHV7MUZGRkV9XFx1ezFGRkZGfVxcdXsyRkZGRX1cXHV7MkZGRkZ9XFx1ezNGRkZFfVxcdXszRkZGRn1cXHV7NEZGRkV9XFx1ezRGRkZGfVxcdXs1RkZGRX1cXHV7NUZGRkZ9XFx1ezZGRkZFfVxcdXs2RkZGRn1cXHV7N0ZGRkV9XFx1ezdGRkZGfVxcdXs4RkZGRX1cXHV7OEZGRkZ9XFx1ezlGRkZFfVxcdXs5RkZGRn1cXHV7QUZGRkV9XFx1e0FGRkZGfVxcdXtCRkZGRX1cXHV7QkZGRkZ9XFx1e0NGRkZFfVxcdXtDRkZGRn1cXHV7REZGRkV9XFx1e0RGRkZGfVxcdXtFRkZGRX1cXHV7RUZGRkZ9XFx1e0ZGRkZFfVxcdXtGRkZGRn1cXHV7MTBGRkZFfVxcdXsxMEZGRkZ9XS91O1xuLy8gaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2Uvc3ludGF4Lmh0bWwjYXR0cmlidXRlcy0yXG4vLyBodHRwczovL2luZnJhLnNwZWMud2hhdHdnLm9yZy8jbm9uY2hhcmFjdGVyXG5cbi8qKiBAcmV0dXJucyB7c3RyaW5nfSAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNwcmVhZChhcmdzLCBhdHRyc190b19hZGQpIHtcblx0Y29uc3QgYXR0cmlidXRlcyA9IE9iamVjdC5hc3NpZ24oe30sIC4uLmFyZ3MpO1xuXHRpZiAoYXR0cnNfdG9fYWRkKSB7XG5cdFx0Y29uc3QgY2xhc3Nlc190b19hZGQgPSBhdHRyc190b19hZGQuY2xhc3Nlcztcblx0XHRjb25zdCBzdHlsZXNfdG9fYWRkID0gYXR0cnNfdG9fYWRkLnN0eWxlcztcblx0XHRpZiAoY2xhc3Nlc190b19hZGQpIHtcblx0XHRcdGlmIChhdHRyaWJ1dGVzLmNsYXNzID09IG51bGwpIHtcblx0XHRcdFx0YXR0cmlidXRlcy5jbGFzcyA9IGNsYXNzZXNfdG9fYWRkO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0YXR0cmlidXRlcy5jbGFzcyArPSAnICcgKyBjbGFzc2VzX3RvX2FkZDtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKHN0eWxlc190b19hZGQpIHtcblx0XHRcdGlmIChhdHRyaWJ1dGVzLnN0eWxlID09IG51bGwpIHtcblx0XHRcdFx0YXR0cmlidXRlcy5zdHlsZSA9IHN0eWxlX29iamVjdF90b19zdHJpbmcoc3R5bGVzX3RvX2FkZCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRhdHRyaWJ1dGVzLnN0eWxlID0gc3R5bGVfb2JqZWN0X3RvX3N0cmluZyhcblx0XHRcdFx0XHRtZXJnZV9zc3Jfc3R5bGVzKGF0dHJpYnV0ZXMuc3R5bGUsIHN0eWxlc190b19hZGQpXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdGxldCBzdHIgPSAnJztcblx0T2JqZWN0LmtleXMoYXR0cmlidXRlcykuZm9yRWFjaCgobmFtZSkgPT4ge1xuXHRcdGlmIChpbnZhbGlkX2F0dHJpYnV0ZV9uYW1lX2NoYXJhY3Rlci50ZXN0KG5hbWUpKSByZXR1cm47XG5cdFx0Y29uc3QgdmFsdWUgPSBhdHRyaWJ1dGVzW25hbWVdO1xuXHRcdGlmICh2YWx1ZSA9PT0gdHJ1ZSkgc3RyICs9ICcgJyArIG5hbWU7XG5cdFx0ZWxzZSBpZiAoYm9vbGVhbl9hdHRyaWJ1dGVzLmhhcyhuYW1lLnRvTG93ZXJDYXNlKCkpKSB7XG5cdFx0XHRpZiAodmFsdWUpIHN0ciArPSAnICcgKyBuYW1lO1xuXHRcdH0gZWxzZSBpZiAodmFsdWUgIT0gbnVsbCkge1xuXHRcdFx0c3RyICs9IGAgJHtuYW1lfT1cIiR7dmFsdWV9XCJgO1xuXHRcdH1cblx0fSk7XG5cdHJldHVybiBzdHI7XG59XG5cbi8qKiBAcmV0dXJucyB7e319ICovXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2Vfc3NyX3N0eWxlcyhzdHlsZV9hdHRyaWJ1dGUsIHN0eWxlX2RpcmVjdGl2ZSkge1xuXHRjb25zdCBzdHlsZV9vYmplY3QgPSB7fTtcblx0Zm9yIChjb25zdCBpbmRpdmlkdWFsX3N0eWxlIG9mIHN0eWxlX2F0dHJpYnV0ZS5zcGxpdCgnOycpKSB7XG5cdFx0Y29uc3QgY29sb25faW5kZXggPSBpbmRpdmlkdWFsX3N0eWxlLmluZGV4T2YoJzonKTtcblx0XHRjb25zdCBuYW1lID0gaW5kaXZpZHVhbF9zdHlsZS5zbGljZSgwLCBjb2xvbl9pbmRleCkudHJpbSgpO1xuXHRcdGNvbnN0IHZhbHVlID0gaW5kaXZpZHVhbF9zdHlsZS5zbGljZShjb2xvbl9pbmRleCArIDEpLnRyaW0oKTtcblx0XHRpZiAoIW5hbWUpIGNvbnRpbnVlO1xuXHRcdHN0eWxlX29iamVjdFtuYW1lXSA9IHZhbHVlO1xuXHR9XG5cdGZvciAoY29uc3QgbmFtZSBpbiBzdHlsZV9kaXJlY3RpdmUpIHtcblx0XHRjb25zdCB2YWx1ZSA9IHN0eWxlX2RpcmVjdGl2ZVtuYW1lXTtcblx0XHRpZiAodmFsdWUpIHtcblx0XHRcdHN0eWxlX29iamVjdFtuYW1lXSA9IHZhbHVlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRkZWxldGUgc3R5bGVfb2JqZWN0W25hbWVdO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gc3R5bGVfb2JqZWN0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXNjYXBlX2F0dHJpYnV0ZV92YWx1ZSh2YWx1ZSkge1xuXHQvLyBrZWVwIGJvb2xlYW5zLCBudWxsLCBhbmQgdW5kZWZpbmVkIGZvciB0aGUgc2FrZSBvZiBgc3ByZWFkYFxuXHRjb25zdCBzaG91bGRfZXNjYXBlID0gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyB8fCAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jyk7XG5cdHJldHVybiBzaG91bGRfZXNjYXBlID8gZXNjYXBlKHZhbHVlLCB0cnVlKSA6IHZhbHVlO1xufVxuXG4vKiogQHJldHVybnMge3t9fSAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVzY2FwZV9vYmplY3Qob2JqKSB7XG5cdGNvbnN0IHJlc3VsdCA9IHt9O1xuXHRmb3IgKGNvbnN0IGtleSBpbiBvYmopIHtcblx0XHRyZXN1bHRba2V5XSA9IGVzY2FwZV9hdHRyaWJ1dGVfdmFsdWUob2JqW2tleV0pO1xuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59XG5cbi8qKiBAcmV0dXJucyB7c3RyaW5nfSAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVhY2goaXRlbXMsIGZuKSB7XG5cdGl0ZW1zID0gZW5zdXJlX2FycmF5X2xpa2UoaXRlbXMpO1xuXHRsZXQgc3RyID0gJyc7XG5cdGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpICs9IDEpIHtcblx0XHRzdHIgKz0gZm4oaXRlbXNbaV0sIGkpO1xuXHR9XG5cdHJldHVybiBzdHI7XG59XG5cbmV4cG9ydCBjb25zdCBtaXNzaW5nX2NvbXBvbmVudCA9IHtcblx0JCRyZW5kZXI6ICgpID0+ICcnXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVfY29tcG9uZW50KGNvbXBvbmVudCwgbmFtZSkge1xuXHRpZiAoIWNvbXBvbmVudCB8fCAhY29tcG9uZW50LiQkcmVuZGVyKSB7XG5cdFx0aWYgKG5hbWUgPT09ICdzdmVsdGU6Y29tcG9uZW50JykgbmFtZSArPSAnIHRoaXM9ey4uLn0nO1xuXHRcdHRocm93IG5ldyBFcnJvcihcblx0XHRcdGA8JHtuYW1lfT4gaXMgbm90IGEgdmFsaWQgU1NSIGNvbXBvbmVudC4gWW91IG1heSBuZWVkIHRvIHJldmlldyB5b3VyIGJ1aWxkIGNvbmZpZyB0byBlbnN1cmUgdGhhdCBkZXBlbmRlbmNpZXMgYXJlIGNvbXBpbGVkLCByYXRoZXIgdGhhbiBpbXBvcnRlZCBhcyBwcmUtY29tcGlsZWQgbW9kdWxlcy4gT3RoZXJ3aXNlIHlvdSBtYXkgbmVlZCB0byBmaXggYSA8JHtuYW1lfT4uYFxuXHRcdCk7XG5cdH1cblx0cmV0dXJuIGNvbXBvbmVudDtcbn1cblxuLyoqIEByZXR1cm5zIHtzdHJpbmd9ICovXG5leHBvcnQgZnVuY3Rpb24gZGVidWcoZmlsZSwgbGluZSwgY29sdW1uLCB2YWx1ZXMpIHtcblx0Y29uc29sZS5sb2coYHtAZGVidWd9ICR7ZmlsZSA/IGZpbGUgKyAnICcgOiAnJ30oJHtsaW5lfToke2NvbHVtbn0pYCk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuXHRjb25zb2xlLmxvZyh2YWx1ZXMpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcblx0cmV0dXJuICcnO1xufVxuXG5sZXQgb25fZGVzdHJveTtcblxuLyoqIEByZXR1cm5zIHt7IHJlbmRlcjogKHByb3BzPzoge30sIHsgJCRzbG90cywgY29udGV4dCB9PzogeyAkJHNsb3RzPzoge307IGNvbnRleHQ/OiBNYXA8YW55LCBhbnk+OyB9KSA9PiB7IGh0bWw6IGFueTsgY3NzOiB7IGNvZGU6IHN0cmluZzsgbWFwOiBhbnk7IH07IGhlYWQ6IHN0cmluZzsgfTsgJCRyZW5kZXI6IChyZXN1bHQ6IGFueSwgcHJvcHM6IGFueSwgYmluZGluZ3M6IGFueSwgc2xvdHM6IGFueSwgY29udGV4dDogYW55KSA9PiBhbnk7IH19ICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlX3Nzcl9jb21wb25lbnQoZm4pIHtcblx0ZnVuY3Rpb24gJCRyZW5kZXIocmVzdWx0LCBwcm9wcywgYmluZGluZ3MsIHNsb3RzLCBjb250ZXh0KSB7XG5cdFx0Y29uc3QgcGFyZW50X2NvbXBvbmVudCA9IGN1cnJlbnRfY29tcG9uZW50O1xuXHRcdGNvbnN0ICQkID0ge1xuXHRcdFx0b25fZGVzdHJveSxcblx0XHRcdGNvbnRleHQ6IG5ldyBNYXAoY29udGV4dCB8fCAocGFyZW50X2NvbXBvbmVudCA/IHBhcmVudF9jb21wb25lbnQuJCQuY29udGV4dCA6IFtdKSksXG5cdFx0XHQvLyB0aGVzZSB3aWxsIGJlIGltbWVkaWF0ZWx5IGRpc2NhcmRlZFxuXHRcdFx0b25fbW91bnQ6IFtdLFxuXHRcdFx0YmVmb3JlX3VwZGF0ZTogW10sXG5cdFx0XHRhZnRlcl91cGRhdGU6IFtdLFxuXHRcdFx0Y2FsbGJhY2tzOiBibGFua19vYmplY3QoKVxuXHRcdH07XG5cdFx0c2V0X2N1cnJlbnRfY29tcG9uZW50KHsgJCQgfSk7XG5cdFx0Y29uc3QgaHRtbCA9IGZuKHJlc3VsdCwgcHJvcHMsIGJpbmRpbmdzLCBzbG90cyk7XG5cdFx0c2V0X2N1cnJlbnRfY29tcG9uZW50KHBhcmVudF9jb21wb25lbnQpO1xuXHRcdHJldHVybiBodG1sO1xuXHR9XG5cdHJldHVybiB7XG5cdFx0cmVuZGVyOiAocHJvcHMgPSB7fSwgeyAkJHNsb3RzID0ge30sIGNvbnRleHQgPSBuZXcgTWFwKCkgfSA9IHt9KSA9PiB7XG5cdFx0XHRvbl9kZXN0cm95ID0gW107XG5cdFx0XHRjb25zdCByZXN1bHQgPSB7IHRpdGxlOiAnJywgaGVhZDogJycsIGNzczogbmV3IFNldCgpIH07XG5cdFx0XHRjb25zdCBodG1sID0gJCRyZW5kZXIocmVzdWx0LCBwcm9wcywge30sICQkc2xvdHMsIGNvbnRleHQpO1xuXHRcdFx0cnVuX2FsbChvbl9kZXN0cm95KTtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGh0bWwsXG5cdFx0XHRcdGNzczoge1xuXHRcdFx0XHRcdGNvZGU6IEFycmF5LmZyb20ocmVzdWx0LmNzcylcblx0XHRcdFx0XHRcdC5tYXAoKGNzcykgPT4gY3NzLmNvZGUpXG5cdFx0XHRcdFx0XHQuam9pbignXFxuJyksXG5cdFx0XHRcdFx0bWFwOiBudWxsIC8vIFRPRE9cblx0XHRcdFx0fSxcblx0XHRcdFx0aGVhZDogcmVzdWx0LnRpdGxlICsgcmVzdWx0LmhlYWRcblx0XHRcdH07XG5cdFx0fSxcblx0XHQkJHJlbmRlclxuXHR9O1xufVxuXG4vKiogQHJldHVybnMge3N0cmluZ30gKi9cbmV4cG9ydCBmdW5jdGlvbiBhZGRfYXR0cmlidXRlKG5hbWUsIHZhbHVlLCBib29sZWFuKSB7XG5cdGlmICh2YWx1ZSA9PSBudWxsIHx8IChib29sZWFuICYmICF2YWx1ZSkpIHJldHVybiAnJztcblx0Y29uc3QgYXNzaWdubWVudCA9IGJvb2xlYW4gJiYgdmFsdWUgPT09IHRydWUgPyAnJyA6IGA9XCIke2VzY2FwZSh2YWx1ZSwgdHJ1ZSl9XCJgO1xuXHRyZXR1cm4gYCAke25hbWV9JHthc3NpZ25tZW50fWA7XG59XG5cbi8qKiBAcmV0dXJucyB7c3RyaW5nfSAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFkZF9jbGFzc2VzKGNsYXNzZXMpIHtcblx0cmV0dXJuIGNsYXNzZXMgPyBgIGNsYXNzPVwiJHtjbGFzc2VzfVwiYCA6ICcnO1xufVxuXG4vKiogQHJldHVybnMge3N0cmluZ30gKi9cbmZ1bmN0aW9uIHN0eWxlX29iamVjdF90b19zdHJpbmcoc3R5bGVfb2JqZWN0KSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhzdHlsZV9vYmplY3QpXG5cdFx0LmZpbHRlcigoa2V5KSA9PiBzdHlsZV9vYmplY3Rba2V5XSAhPSBudWxsICYmIHN0eWxlX29iamVjdFtrZXldICE9PSAnJylcblx0XHQubWFwKChrZXkpID0+IGAke2tleX06ICR7ZXNjYXBlX2F0dHJpYnV0ZV92YWx1ZShzdHlsZV9vYmplY3Rba2V5XSl9O2ApXG5cdFx0LmpvaW4oJyAnKTtcbn1cblxuLyoqIEByZXR1cm5zIHtzdHJpbmd9ICovXG5leHBvcnQgZnVuY3Rpb24gYWRkX3N0eWxlcyhzdHlsZV9vYmplY3QpIHtcblx0Y29uc3Qgc3R5bGVzID0gc3R5bGVfb2JqZWN0X3RvX3N0cmluZyhzdHlsZV9vYmplY3QpO1xuXHRyZXR1cm4gc3R5bGVzID8gYCBzdHlsZT1cIiR7c3R5bGVzfVwiYCA6ICcnO1xufVxuIiwgImltcG9ydCB7XG5cdGFkZF9yZW5kZXJfY2FsbGJhY2ssXG5cdGZsdXNoLFxuXHRmbHVzaF9yZW5kZXJfY2FsbGJhY2tzLFxuXHRzY2hlZHVsZV91cGRhdGUsXG5cdGRpcnR5X2NvbXBvbmVudHNcbn0gZnJvbSAnLi9zY2hlZHVsZXIuanMnO1xuaW1wb3J0IHsgY3VycmVudF9jb21wb25lbnQsIHNldF9jdXJyZW50X2NvbXBvbmVudCB9IGZyb20gJy4vbGlmZWN5Y2xlLmpzJztcbmltcG9ydCB7IGJsYW5rX29iamVjdCwgaXNfZW1wdHksIGlzX2Z1bmN0aW9uLCBydW4sIHJ1bl9hbGwsIG5vb3AgfSBmcm9tICcuL3V0aWxzLmpzJztcbmltcG9ydCB7XG5cdGNoaWxkcmVuLFxuXHRkZXRhY2gsXG5cdHN0YXJ0X2h5ZHJhdGluZyxcblx0ZW5kX2h5ZHJhdGluZyxcblx0Z2V0X2N1c3RvbV9lbGVtZW50c19zbG90cyxcblx0aW5zZXJ0LFxuXHRlbGVtZW50LFxuXHRhdHRyXG59IGZyb20gJy4vZG9tLmpzJztcbmltcG9ydCB7IHRyYW5zaXRpb25faW4gfSBmcm9tICcuL3RyYW5zaXRpb25zLmpzJztcblxuLyoqIEByZXR1cm5zIHt2b2lkfSAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJpbmQoY29tcG9uZW50LCBuYW1lLCBjYWxsYmFjaykge1xuXHRjb25zdCBpbmRleCA9IGNvbXBvbmVudC4kJC5wcm9wc1tuYW1lXTtcblx0aWYgKGluZGV4ICE9PSB1bmRlZmluZWQpIHtcblx0XHRjb21wb25lbnQuJCQuYm91bmRbaW5kZXhdID0gY2FsbGJhY2s7XG5cdFx0Y2FsbGJhY2soY29tcG9uZW50LiQkLmN0eFtpbmRleF0pO1xuXHR9XG59XG5cbi8qKiBAcmV0dXJucyB7dm9pZH0gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVfY29tcG9uZW50KGJsb2NrKSB7XG5cdGJsb2NrICYmIGJsb2NrLmMoKTtcbn1cblxuLyoqIEByZXR1cm5zIHt2b2lkfSAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNsYWltX2NvbXBvbmVudChibG9jaywgcGFyZW50X25vZGVzKSB7XG5cdGJsb2NrICYmIGJsb2NrLmwocGFyZW50X25vZGVzKTtcbn1cblxuLyoqIEByZXR1cm5zIHt2b2lkfSAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1vdW50X2NvbXBvbmVudChjb21wb25lbnQsIHRhcmdldCwgYW5jaG9yKSB7XG5cdGNvbnN0IHsgZnJhZ21lbnQsIGFmdGVyX3VwZGF0ZSB9ID0gY29tcG9uZW50LiQkO1xuXHRmcmFnbWVudCAmJiBmcmFnbWVudC5tKHRhcmdldCwgYW5jaG9yKTtcblx0Ly8gb25Nb3VudCBoYXBwZW5zIGJlZm9yZSB0aGUgaW5pdGlhbCBhZnRlclVwZGF0ZVxuXHRhZGRfcmVuZGVyX2NhbGxiYWNrKCgpID0+IHtcblx0XHRjb25zdCBuZXdfb25fZGVzdHJveSA9IGNvbXBvbmVudC4kJC5vbl9tb3VudC5tYXAocnVuKS5maWx0ZXIoaXNfZnVuY3Rpb24pO1xuXHRcdC8vIGlmIHRoZSBjb21wb25lbnQgd2FzIGRlc3Ryb3llZCBpbW1lZGlhdGVseVxuXHRcdC8vIGl0IHdpbGwgdXBkYXRlIHRoZSBgJCQub25fZGVzdHJveWAgcmVmZXJlbmNlIHRvIGBudWxsYC5cblx0XHQvLyB0aGUgZGVzdHJ1Y3R1cmVkIG9uX2Rlc3Ryb3kgbWF5IHN0aWxsIHJlZmVyZW5jZSB0byB0aGUgb2xkIGFycmF5XG5cdFx0aWYgKGNvbXBvbmVudC4kJC5vbl9kZXN0cm95KSB7XG5cdFx0XHRjb21wb25lbnQuJCQub25fZGVzdHJveS5wdXNoKC4uLm5ld19vbl9kZXN0cm95KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gRWRnZSBjYXNlIC0gY29tcG9uZW50IHdhcyBkZXN0cm95ZWQgaW1tZWRpYXRlbHksXG5cdFx0XHQvLyBtb3N0IGxpa2VseSBhcyBhIHJlc3VsdCBvZiBhIGJpbmRpbmcgaW5pdGlhbGlzaW5nXG5cdFx0XHRydW5fYWxsKG5ld19vbl9kZXN0cm95KTtcblx0XHR9XG5cdFx0Y29tcG9uZW50LiQkLm9uX21vdW50ID0gW107XG5cdH0pO1xuXHRhZnRlcl91cGRhdGUuZm9yRWFjaChhZGRfcmVuZGVyX2NhbGxiYWNrKTtcbn1cblxuLyoqIEByZXR1cm5zIHt2b2lkfSAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlc3Ryb3lfY29tcG9uZW50KGNvbXBvbmVudCwgZGV0YWNoaW5nKSB7XG5cdGNvbnN0ICQkID0gY29tcG9uZW50LiQkO1xuXHRpZiAoJCQuZnJhZ21lbnQgIT09IG51bGwpIHtcblx0XHRmbHVzaF9yZW5kZXJfY2FsbGJhY2tzKCQkLmFmdGVyX3VwZGF0ZSk7XG5cdFx0cnVuX2FsbCgkJC5vbl9kZXN0cm95KTtcblx0XHQkJC5mcmFnbWVudCAmJiAkJC5mcmFnbWVudC5kKGRldGFjaGluZyk7XG5cdFx0Ly8gVE9ETyBudWxsIG91dCBvdGhlciByZWZzLCBpbmNsdWRpbmcgY29tcG9uZW50LiQkIChidXQgbmVlZCB0b1xuXHRcdC8vIHByZXNlcnZlIGZpbmFsIHN0YXRlPylcblx0XHQkJC5vbl9kZXN0cm95ID0gJCQuZnJhZ21lbnQgPSBudWxsO1xuXHRcdCQkLmN0eCA9IFtdO1xuXHR9XG59XG5cbi8qKiBAcmV0dXJucyB7dm9pZH0gKi9cbmZ1bmN0aW9uIG1ha2VfZGlydHkoY29tcG9uZW50LCBpKSB7XG5cdGlmIChjb21wb25lbnQuJCQuZGlydHlbMF0gPT09IC0xKSB7XG5cdFx0ZGlydHlfY29tcG9uZW50cy5wdXNoKGNvbXBvbmVudCk7XG5cdFx0c2NoZWR1bGVfdXBkYXRlKCk7XG5cdFx0Y29tcG9uZW50LiQkLmRpcnR5LmZpbGwoMCk7XG5cdH1cblx0Y29tcG9uZW50LiQkLmRpcnR5WyhpIC8gMzEpIHwgMF0gfD0gMSA8PCBpICUgMzE7XG59XG5cbi8vIFRPRE86IERvY3VtZW50IHRoZSBvdGhlciBwYXJhbXNcbi8qKlxuICogQHBhcmFtIHtTdmVsdGVDb21wb25lbnR9IGNvbXBvbmVudFxuICogQHBhcmFtIHtpbXBvcnQoJy4vcHVibGljLmpzJykuQ29tcG9uZW50Q29uc3RydWN0b3JPcHRpb25zfSBvcHRpb25zXG4gKlxuICogQHBhcmFtIHtpbXBvcnQoJy4vdXRpbHMuanMnKVsnbm90X2VxdWFsJ119IG5vdF9lcXVhbCBVc2VkIHRvIGNvbXBhcmUgcHJvcHMgYW5kIHN0YXRlIHZhbHVlcy5cbiAqIEBwYXJhbSB7KHRhcmdldDogRWxlbWVudCB8IFNoYWRvd1Jvb3QpID0+IHZvaWR9IFthcHBlbmRfc3R5bGVzXSBGdW5jdGlvbiB0aGF0IGFwcGVuZHMgc3R5bGVzIHRvIHRoZSBET00gd2hlbiB0aGUgY29tcG9uZW50IGlzIGZpcnN0IGluaXRpYWxpc2VkLlxuICogVGhpcyB3aWxsIGJlIHRoZSBgYWRkX2Nzc2AgZnVuY3Rpb24gZnJvbSB0aGUgY29tcGlsZWQgY29tcG9uZW50LlxuICpcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gaW5pdChcblx0Y29tcG9uZW50LFxuXHRvcHRpb25zLFxuXHRpbnN0YW5jZSxcblx0Y3JlYXRlX2ZyYWdtZW50LFxuXHRub3RfZXF1YWwsXG5cdHByb3BzLFxuXHRhcHBlbmRfc3R5bGVzID0gbnVsbCxcblx0ZGlydHkgPSBbLTFdXG4pIHtcblx0Y29uc3QgcGFyZW50X2NvbXBvbmVudCA9IGN1cnJlbnRfY29tcG9uZW50O1xuXHRzZXRfY3VycmVudF9jb21wb25lbnQoY29tcG9uZW50KTtcblx0LyoqIEB0eXBlIHtpbXBvcnQoJy4vcHJpdmF0ZS5qcycpLlQkJH0gKi9cblx0Y29uc3QgJCQgPSAoY29tcG9uZW50LiQkID0ge1xuXHRcdGZyYWdtZW50OiBudWxsLFxuXHRcdGN0eDogW10sXG5cdFx0Ly8gc3RhdGVcblx0XHRwcm9wcyxcblx0XHR1cGRhdGU6IG5vb3AsXG5cdFx0bm90X2VxdWFsLFxuXHRcdGJvdW5kOiBibGFua19vYmplY3QoKSxcblx0XHQvLyBsaWZlY3ljbGVcblx0XHRvbl9tb3VudDogW10sXG5cdFx0b25fZGVzdHJveTogW10sXG5cdFx0b25fZGlzY29ubmVjdDogW10sXG5cdFx0YmVmb3JlX3VwZGF0ZTogW10sXG5cdFx0YWZ0ZXJfdXBkYXRlOiBbXSxcblx0XHRjb250ZXh0OiBuZXcgTWFwKG9wdGlvbnMuY29udGV4dCB8fCAocGFyZW50X2NvbXBvbmVudCA/IHBhcmVudF9jb21wb25lbnQuJCQuY29udGV4dCA6IFtdKSksXG5cdFx0Ly8gZXZlcnl0aGluZyBlbHNlXG5cdFx0Y2FsbGJhY2tzOiBibGFua19vYmplY3QoKSxcblx0XHRkaXJ0eSxcblx0XHRza2lwX2JvdW5kOiBmYWxzZSxcblx0XHRyb290OiBvcHRpb25zLnRhcmdldCB8fCBwYXJlbnRfY29tcG9uZW50LiQkLnJvb3Rcblx0fSk7XG5cdGFwcGVuZF9zdHlsZXMgJiYgYXBwZW5kX3N0eWxlcygkJC5yb290KTtcblx0bGV0IHJlYWR5ID0gZmFsc2U7XG5cdCQkLmN0eCA9IGluc3RhbmNlXG5cdFx0PyBpbnN0YW5jZShjb21wb25lbnQsIG9wdGlvbnMucHJvcHMgfHwge30sIChpLCByZXQsIC4uLnJlc3QpID0+IHtcblx0XHRcdFx0Y29uc3QgdmFsdWUgPSByZXN0Lmxlbmd0aCA/IHJlc3RbMF0gOiByZXQ7XG5cdFx0XHRcdGlmICgkJC5jdHggJiYgbm90X2VxdWFsKCQkLmN0eFtpXSwgKCQkLmN0eFtpXSA9IHZhbHVlKSkpIHtcblx0XHRcdFx0XHRpZiAoISQkLnNraXBfYm91bmQgJiYgJCQuYm91bmRbaV0pICQkLmJvdW5kW2ldKHZhbHVlKTtcblx0XHRcdFx0XHRpZiAocmVhZHkpIG1ha2VfZGlydHkoY29tcG9uZW50LCBpKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gcmV0O1xuXHRcdCAgfSlcblx0XHQ6IFtdO1xuXHQkJC51cGRhdGUoKTtcblx0cmVhZHkgPSB0cnVlO1xuXHRydW5fYWxsKCQkLmJlZm9yZV91cGRhdGUpO1xuXHQvLyBgZmFsc2VgIGFzIGEgc3BlY2lhbCBjYXNlIG9mIG5vIERPTSBjb21wb25lbnRcblx0JCQuZnJhZ21lbnQgPSBjcmVhdGVfZnJhZ21lbnQgPyBjcmVhdGVfZnJhZ21lbnQoJCQuY3R4KSA6IGZhbHNlO1xuXHRpZiAob3B0aW9ucy50YXJnZXQpIHtcblx0XHRpZiAob3B0aW9ucy5oeWRyYXRlKSB7XG5cdFx0XHRzdGFydF9oeWRyYXRpbmcoKTtcblx0XHRcdC8vIFRPRE86IHdoYXQgaXMgdGhlIGNvcnJlY3QgdHlwZSBoZXJlP1xuXHRcdFx0Ly8gQHRzLWV4cGVjdC1lcnJvclxuXHRcdFx0Y29uc3Qgbm9kZXMgPSBjaGlsZHJlbihvcHRpb25zLnRhcmdldCk7XG5cdFx0XHQkJC5mcmFnbWVudCAmJiAkJC5mcmFnbWVudC5sKG5vZGVzKTtcblx0XHRcdG5vZGVzLmZvckVhY2goZGV0YWNoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb25cblx0XHRcdCQkLmZyYWdtZW50ICYmICQkLmZyYWdtZW50LmMoKTtcblx0XHR9XG5cdFx0aWYgKG9wdGlvbnMuaW50cm8pIHRyYW5zaXRpb25faW4oY29tcG9uZW50LiQkLmZyYWdtZW50KTtcblx0XHRtb3VudF9jb21wb25lbnQoY29tcG9uZW50LCBvcHRpb25zLnRhcmdldCwgb3B0aW9ucy5hbmNob3IpO1xuXHRcdGVuZF9oeWRyYXRpbmcoKTtcblx0XHRmbHVzaCgpO1xuXHR9XG5cdHNldF9jdXJyZW50X2NvbXBvbmVudChwYXJlbnRfY29tcG9uZW50KTtcbn1cblxuZXhwb3J0IGxldCBTdmVsdGVFbGVtZW50O1xuXG5pZiAodHlwZW9mIEhUTUxFbGVtZW50ID09PSAnZnVuY3Rpb24nKSB7XG5cdFN2ZWx0ZUVsZW1lbnQgPSBjbGFzcyBleHRlbmRzIEhUTUxFbGVtZW50IHtcblx0XHQvKiogVGhlIFN2ZWx0ZSBjb21wb25lbnQgY29uc3RydWN0b3IgKi9cblx0XHQkJGN0b3I7XG5cdFx0LyoqIFNsb3RzICovXG5cdFx0JCRzO1xuXHRcdC8qKiBUaGUgU3ZlbHRlIGNvbXBvbmVudCBpbnN0YW5jZSAqL1xuXHRcdCQkYztcblx0XHQvKiogV2hldGhlciBvciBub3QgdGhlIGN1c3RvbSBlbGVtZW50IGlzIGNvbm5lY3RlZCAqL1xuXHRcdCQkY24gPSBmYWxzZTtcblx0XHQvKiogQ29tcG9uZW50IHByb3BzIGRhdGEgKi9cblx0XHQkJGQgPSB7fTtcblx0XHQvKiogYHRydWVgIGlmIGN1cnJlbnRseSBpbiB0aGUgcHJvY2VzcyBvZiByZWZsZWN0aW5nIGNvbXBvbmVudCBwcm9wcyBiYWNrIHRvIGF0dHJpYnV0ZXMgKi9cblx0XHQkJHIgPSBmYWxzZTtcblx0XHQvKiogQHR5cGUge1JlY29yZDxzdHJpbmcsIEN1c3RvbUVsZW1lbnRQcm9wRGVmaW5pdGlvbj59IFByb3BzIGRlZmluaXRpb24gKG5hbWUsIHJlZmxlY3RlZCwgdHlwZSBldGMpICovXG5cdFx0JCRwX2QgPSB7fTtcblx0XHQvKiogQHR5cGUge1JlY29yZDxzdHJpbmcsIEZ1bmN0aW9uW10+fSBFdmVudCBsaXN0ZW5lcnMgKi9cblx0XHQkJGwgPSB7fTtcblx0XHQvKiogQHR5cGUge01hcDxGdW5jdGlvbiwgRnVuY3Rpb24+fSBFdmVudCBsaXN0ZW5lciB1bnN1YnNjcmliZSBmdW5jdGlvbnMgKi9cblx0XHQkJGxfdSA9IG5ldyBNYXAoKTtcblxuXHRcdGNvbnN0cnVjdG9yKCQkY29tcG9uZW50Q3RvciwgJCRzbG90cywgdXNlX3NoYWRvd19kb20pIHtcblx0XHRcdHN1cGVyKCk7XG5cdFx0XHR0aGlzLiQkY3RvciA9ICQkY29tcG9uZW50Q3Rvcjtcblx0XHRcdHRoaXMuJCRzID0gJCRzbG90cztcblx0XHRcdGlmICh1c2Vfc2hhZG93X2RvbSkge1xuXHRcdFx0XHR0aGlzLmF0dGFjaFNoYWRvdyh7IG1vZGU6ICdvcGVuJyB9KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRhZGRFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyLCBvcHRpb25zKSB7XG5cdFx0XHQvLyBXZSBjYW4ndCBkZXRlcm1pbmUgdXBmcm9udCBpZiB0aGUgZXZlbnQgaXMgYSBjdXN0b20gZXZlbnQgb3Igbm90LCBzbyB3ZSBoYXZlIHRvXG5cdFx0XHQvLyBsaXN0ZW4gdG8gYm90aC4gSWYgc29tZW9uZSB1c2VzIGEgY3VzdG9tIGV2ZW50IHdpdGggdGhlIHNhbWUgbmFtZSBhcyBhIHJlZ3VsYXJcblx0XHRcdC8vIGJyb3dzZXIgZXZlbnQsIHRoaXMgZmlyZXMgdHdpY2UgLSB3ZSBjYW4ndCBhdm9pZCB0aGF0LlxuXHRcdFx0dGhpcy4kJGxbdHlwZV0gPSB0aGlzLiQkbFt0eXBlXSB8fCBbXTtcblx0XHRcdHRoaXMuJCRsW3R5cGVdLnB1c2gobGlzdGVuZXIpO1xuXHRcdFx0aWYgKHRoaXMuJCRjKSB7XG5cdFx0XHRcdGNvbnN0IHVuc3ViID0gdGhpcy4kJGMuJG9uKHR5cGUsIGxpc3RlbmVyKTtcblx0XHRcdFx0dGhpcy4kJGxfdS5zZXQobGlzdGVuZXIsIHVuc3ViKTtcblx0XHRcdH1cblx0XHRcdHN1cGVyLmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXIsIG9wdGlvbnMpO1xuXHRcdH1cblxuXHRcdHJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXIsIG9wdGlvbnMpIHtcblx0XHRcdHN1cGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXIsIG9wdGlvbnMpO1xuXHRcdFx0aWYgKHRoaXMuJCRjKSB7XG5cdFx0XHRcdGNvbnN0IHVuc3ViID0gdGhpcy4kJGxfdS5nZXQobGlzdGVuZXIpO1xuXHRcdFx0XHRpZiAodW5zdWIpIHtcblx0XHRcdFx0XHR1bnN1YigpO1xuXHRcdFx0XHRcdHRoaXMuJCRsX3UuZGVsZXRlKGxpc3RlbmVyKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGFzeW5jIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuXHRcdFx0dGhpcy4kJGNuID0gdHJ1ZTtcblx0XHRcdGlmICghdGhpcy4kJGMpIHtcblx0XHRcdFx0Ly8gV2Ugd2FpdCBvbmUgdGljayB0byBsZXQgcG9zc2libGUgY2hpbGQgc2xvdCBlbGVtZW50cyBiZSBjcmVhdGVkL21vdW50ZWRcblx0XHRcdFx0YXdhaXQgUHJvbWlzZS5yZXNvbHZlKCk7XG5cdFx0XHRcdGlmICghdGhpcy4kJGNuIHx8IHRoaXMuJCRjKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGZ1bmN0aW9uIGNyZWF0ZV9zbG90KG5hbWUpIHtcblx0XHRcdFx0XHRyZXR1cm4gKCkgPT4ge1xuXHRcdFx0XHRcdFx0bGV0IG5vZGU7XG5cdFx0XHRcdFx0XHRjb25zdCBvYmogPSB7XG5cdFx0XHRcdFx0XHRcdGM6IGZ1bmN0aW9uIGNyZWF0ZSgpIHtcblx0XHRcdFx0XHRcdFx0XHRub2RlID0gZWxlbWVudCgnc2xvdCcpO1xuXHRcdFx0XHRcdFx0XHRcdGlmIChuYW1lICE9PSAnZGVmYXVsdCcpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGF0dHIobm9kZSwgJ25hbWUnLCBuYW1lKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdC8qKlxuXHRcdFx0XHRcdFx0XHQgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSB0YXJnZXRcblx0XHRcdFx0XHRcdFx0ICogQHBhcmFtIHtIVE1MRWxlbWVudH0gW2FuY2hvcl1cblx0XHRcdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0XHRcdG06IGZ1bmN0aW9uIG1vdW50KHRhcmdldCwgYW5jaG9yKSB7XG5cdFx0XHRcdFx0XHRcdFx0aW5zZXJ0KHRhcmdldCwgbm9kZSwgYW5jaG9yKTtcblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0ZDogZnVuY3Rpb24gZGVzdHJveShkZXRhY2hpbmcpIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoZGV0YWNoaW5nKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRkZXRhY2gobm9kZSk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0cmV0dXJuIG9iajtcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNvbnN0ICQkc2xvdHMgPSB7fTtcblx0XHRcdFx0Y29uc3QgZXhpc3Rpbmdfc2xvdHMgPSBnZXRfY3VzdG9tX2VsZW1lbnRzX3Nsb3RzKHRoaXMpO1xuXHRcdFx0XHRmb3IgKGNvbnN0IG5hbWUgb2YgdGhpcy4kJHMpIHtcblx0XHRcdFx0XHRpZiAobmFtZSBpbiBleGlzdGluZ19zbG90cykge1xuXHRcdFx0XHRcdFx0JCRzbG90c1tuYW1lXSA9IFtjcmVhdGVfc2xvdChuYW1lKV07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGZvciAoY29uc3QgYXR0cmlidXRlIG9mIHRoaXMuYXR0cmlidXRlcykge1xuXHRcdFx0XHRcdC8vIHRoaXMuJCRkYXRhIHRha2VzIHByZWNlZGVuY2Ugb3ZlciB0aGlzLmF0dHJpYnV0ZXNcblx0XHRcdFx0XHRjb25zdCBuYW1lID0gdGhpcy4kJGdfcChhdHRyaWJ1dGUubmFtZSk7XG5cdFx0XHRcdFx0aWYgKCEobmFtZSBpbiB0aGlzLiQkZCkpIHtcblx0XHRcdFx0XHRcdHRoaXMuJCRkW25hbWVdID0gZ2V0X2N1c3RvbV9lbGVtZW50X3ZhbHVlKG5hbWUsIGF0dHJpYnV0ZS52YWx1ZSwgdGhpcy4kJHBfZCwgJ3RvUHJvcCcpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHQvLyBQb3J0IG92ZXIgcHJvcHMgdGhhdCB3ZXJlIHNldCBwcm9ncmFtbWF0aWNhbGx5IGJlZm9yZSBjZSB3YXMgaW5pdGlhbGl6ZWRcblx0XHRcdFx0Zm9yIChjb25zdCBrZXkgaW4gdGhpcy4kJHBfZCkge1xuXHRcdFx0XHRcdGlmICghKGtleSBpbiB0aGlzLiQkZCkgJiYgdGhpc1trZXldICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRcdHRoaXMuJCRkW2tleV0gPSB0aGlzW2tleV07IC8vIGRvbid0IHRyYW5zZm9ybSwgdGhlc2Ugd2VyZSBzZXQgdGhyb3VnaCBKYXZhU2NyaXB0XG5cdFx0XHRcdFx0XHRkZWxldGUgdGhpc1trZXldOyAvLyByZW1vdmUgdGhlIHByb3BlcnR5IHRoYXQgc2hhZG93cyB0aGUgZ2V0dGVyL3NldHRlclxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLiQkYyA9IG5ldyB0aGlzLiQkY3Rvcih7XG5cdFx0XHRcdFx0dGFyZ2V0OiB0aGlzLnNoYWRvd1Jvb3QgfHwgdGhpcyxcblx0XHRcdFx0XHRwcm9wczoge1xuXHRcdFx0XHRcdFx0Li4udGhpcy4kJGQsXG5cdFx0XHRcdFx0XHQkJHNsb3RzLFxuXHRcdFx0XHRcdFx0JCRzY29wZToge1xuXHRcdFx0XHRcdFx0XHRjdHg6IFtdXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvLyBSZWZsZWN0IGNvbXBvbmVudCBwcm9wcyBhcyBhdHRyaWJ1dGVzXG5cdFx0XHRcdGNvbnN0IHJlZmxlY3RfYXR0cmlidXRlcyA9ICgpID0+IHtcblx0XHRcdFx0XHR0aGlzLiQkciA9IHRydWU7XG5cdFx0XHRcdFx0Zm9yIChjb25zdCBrZXkgaW4gdGhpcy4kJHBfZCkge1xuXHRcdFx0XHRcdFx0dGhpcy4kJGRba2V5XSA9IHRoaXMuJCRjLiQkLmN0eFt0aGlzLiQkYy4kJC5wcm9wc1trZXldXTtcblx0XHRcdFx0XHRcdGlmICh0aGlzLiQkcF9kW2tleV0ucmVmbGVjdCkge1xuXHRcdFx0XHRcdFx0XHRjb25zdCBhdHRyaWJ1dGVfdmFsdWUgPSBnZXRfY3VzdG9tX2VsZW1lbnRfdmFsdWUoXG5cdFx0XHRcdFx0XHRcdFx0a2V5LFxuXHRcdFx0XHRcdFx0XHRcdHRoaXMuJCRkW2tleV0sXG5cdFx0XHRcdFx0XHRcdFx0dGhpcy4kJHBfZCxcblx0XHRcdFx0XHRcdFx0XHQndG9BdHRyaWJ1dGUnXG5cdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdGlmIChhdHRyaWJ1dGVfdmFsdWUgPT0gbnVsbCkge1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMucmVtb3ZlQXR0cmlidXRlKHRoaXMuJCRwX2Rba2V5XS5hdHRyaWJ1dGUgfHwga2V5KTtcblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLnNldEF0dHJpYnV0ZSh0aGlzLiQkcF9kW2tleV0uYXR0cmlidXRlIHx8IGtleSwgYXR0cmlidXRlX3ZhbHVlKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR0aGlzLiQkciA9IGZhbHNlO1xuXHRcdFx0XHR9O1xuXHRcdFx0XHR0aGlzLiQkYy4kJC5hZnRlcl91cGRhdGUucHVzaChyZWZsZWN0X2F0dHJpYnV0ZXMpO1xuXHRcdFx0XHRyZWZsZWN0X2F0dHJpYnV0ZXMoKTsgLy8gb25jZSBpbml0aWFsbHkgYmVjYXVzZSBhZnRlcl91cGRhdGUgaXMgYWRkZWQgdG9vIGxhdGUgZm9yIGZpcnN0IHJlbmRlclxuXG5cdFx0XHRcdGZvciAoY29uc3QgdHlwZSBpbiB0aGlzLiQkbCkge1xuXHRcdFx0XHRcdGZvciAoY29uc3QgbGlzdGVuZXIgb2YgdGhpcy4kJGxbdHlwZV0pIHtcblx0XHRcdFx0XHRcdGNvbnN0IHVuc3ViID0gdGhpcy4kJGMuJG9uKHR5cGUsIGxpc3RlbmVyKTtcblx0XHRcdFx0XHRcdHRoaXMuJCRsX3Uuc2V0KGxpc3RlbmVyLCB1bnN1Yik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuJCRsID0ge307XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gV2UgZG9uJ3QgbmVlZCB0aGlzIHdoZW4gd29ya2luZyB3aXRoaW4gU3ZlbHRlIGNvZGUsIGJ1dCBmb3IgY29tcGF0aWJpbGl0eSBvZiBwZW9wbGUgdXNpbmcgdGhpcyBvdXRzaWRlIG9mIFN2ZWx0ZVxuXHRcdC8vIGFuZCBzZXR0aW5nIGF0dHJpYnV0ZXMgdGhyb3VnaCBzZXRBdHRyaWJ1dGUgZXRjLCB0aGlzIGlzIGhlbHBmdWxcblx0XHRhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2soYXR0ciwgX29sZFZhbHVlLCBuZXdWYWx1ZSkge1xuXHRcdFx0aWYgKHRoaXMuJCRyKSByZXR1cm47XG5cdFx0XHRhdHRyID0gdGhpcy4kJGdfcChhdHRyKTtcblx0XHRcdHRoaXMuJCRkW2F0dHJdID0gZ2V0X2N1c3RvbV9lbGVtZW50X3ZhbHVlKGF0dHIsIG5ld1ZhbHVlLCB0aGlzLiQkcF9kLCAndG9Qcm9wJyk7XG5cdFx0XHR0aGlzLiQkYz8uJHNldCh7IFthdHRyXTogdGhpcy4kJGRbYXR0cl0gfSk7XG5cdFx0fVxuXG5cdFx0ZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG5cdFx0XHR0aGlzLiQkY24gPSBmYWxzZTtcblx0XHRcdC8vIEluIGEgbWljcm90YXNrLCBiZWNhdXNlIHRoaXMgY291bGQgYmUgYSBtb3ZlIHdpdGhpbiB0aGUgRE9NXG5cdFx0XHRQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcblx0XHRcdFx0aWYgKCF0aGlzLiQkY24gJiYgdGhpcy4kJGMpIHtcblx0XHRcdFx0XHR0aGlzLiQkYy4kZGVzdHJveSgpO1xuXHRcdFx0XHRcdHRoaXMuJCRjID0gdW5kZWZpbmVkO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHQkJGdfcChhdHRyaWJ1dGVfbmFtZSkge1xuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0T2JqZWN0LmtleXModGhpcy4kJHBfZCkuZmluZChcblx0XHRcdFx0XHQoa2V5KSA9PlxuXHRcdFx0XHRcdFx0dGhpcy4kJHBfZFtrZXldLmF0dHJpYnV0ZSA9PT0gYXR0cmlidXRlX25hbWUgfHxcblx0XHRcdFx0XHRcdCghdGhpcy4kJHBfZFtrZXldLmF0dHJpYnV0ZSAmJiBrZXkudG9Mb3dlckNhc2UoKSA9PT0gYXR0cmlidXRlX25hbWUpXG5cdFx0XHRcdCkgfHwgYXR0cmlidXRlX25hbWVcblx0XHRcdCk7XG5cdFx0fVxuXHR9O1xufVxuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wXG4gKiBAcGFyYW0ge2FueX0gdmFsdWVcbiAqIEBwYXJhbSB7UmVjb3JkPHN0cmluZywgQ3VzdG9tRWxlbWVudFByb3BEZWZpbml0aW9uPn0gcHJvcHNfZGVmaW5pdGlvblxuICogQHBhcmFtIHsndG9BdHRyaWJ1dGUnIHwgJ3RvUHJvcCd9IFt0cmFuc2Zvcm1dXG4gKi9cbmZ1bmN0aW9uIGdldF9jdXN0b21fZWxlbWVudF92YWx1ZShwcm9wLCB2YWx1ZSwgcHJvcHNfZGVmaW5pdGlvbiwgdHJhbnNmb3JtKSB7XG5cdGNvbnN0IHR5cGUgPSBwcm9wc19kZWZpbml0aW9uW3Byb3BdPy50eXBlO1xuXHR2YWx1ZSA9IHR5cGUgPT09ICdCb29sZWFuJyAmJiB0eXBlb2YgdmFsdWUgIT09ICdib29sZWFuJyA/IHZhbHVlICE9IG51bGwgOiB2YWx1ZTtcblx0aWYgKCF0cmFuc2Zvcm0gfHwgIXByb3BzX2RlZmluaXRpb25bcHJvcF0pIHtcblx0XHRyZXR1cm4gdmFsdWU7XG5cdH0gZWxzZSBpZiAodHJhbnNmb3JtID09PSAndG9BdHRyaWJ1dGUnKSB7XG5cdFx0c3dpdGNoICh0eXBlKSB7XG5cdFx0XHRjYXNlICdPYmplY3QnOlxuXHRcdFx0Y2FzZSAnQXJyYXknOlxuXHRcdFx0XHRyZXR1cm4gdmFsdWUgPT0gbnVsbCA/IG51bGwgOiBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG5cdFx0XHRjYXNlICdCb29sZWFuJzpcblx0XHRcdFx0cmV0dXJuIHZhbHVlID8gJycgOiBudWxsO1xuXHRcdFx0Y2FzZSAnTnVtYmVyJzpcblx0XHRcdFx0cmV0dXJuIHZhbHVlID09IG51bGwgPyBudWxsIDogdmFsdWU7XG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRyZXR1cm4gdmFsdWU7XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdHN3aXRjaCAodHlwZSkge1xuXHRcdFx0Y2FzZSAnT2JqZWN0Jzpcblx0XHRcdGNhc2UgJ0FycmF5Jzpcblx0XHRcdFx0cmV0dXJuIHZhbHVlICYmIEpTT04ucGFyc2UodmFsdWUpO1xuXHRcdFx0Y2FzZSAnQm9vbGVhbic6XG5cdFx0XHRcdHJldHVybiB2YWx1ZTsgLy8gY29udmVyc2lvbiBhbHJlYWR5IGhhbmRsZWQgYWJvdmVcblx0XHRcdGNhc2UgJ051bWJlcic6XG5cdFx0XHRcdHJldHVybiB2YWx1ZSAhPSBudWxsID8gK3ZhbHVlIDogdmFsdWU7XG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRyZXR1cm4gdmFsdWU7XG5cdFx0fVxuXHR9XG59XG5cbi8qKlxuICogQGludGVybmFsXG4gKlxuICogVHVybiBhIFN2ZWx0ZSBjb21wb25lbnQgaW50byBhIGN1c3RvbSBlbGVtZW50LlxuICogQHBhcmFtIHtpbXBvcnQoJy4vcHVibGljLmpzJykuQ29tcG9uZW50VHlwZX0gQ29tcG9uZW50ICBBIFN2ZWx0ZSBjb21wb25lbnQgY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7UmVjb3JkPHN0cmluZywgQ3VzdG9tRWxlbWVudFByb3BEZWZpbml0aW9uPn0gcHJvcHNfZGVmaW5pdGlvbiAgVGhlIHByb3BzIHRvIG9ic2VydmVcbiAqIEBwYXJhbSB7c3RyaW5nW119IHNsb3RzICBUaGUgc2xvdHMgdG8gY3JlYXRlXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBhY2Nlc3NvcnMgIE90aGVyIGFjY2Vzc29ycyBiZXNpZGVzIHRoZSBvbmVzIGZvciBwcm9wcyB0aGUgY29tcG9uZW50IGhhc1xuICogQHBhcmFtIHtib29sZWFufSB1c2Vfc2hhZG93X2RvbSAgV2hldGhlciB0byB1c2Ugc2hhZG93IERPTVxuICogQHBhcmFtIHsoY2U6IG5ldyAoKSA9PiBIVE1MRWxlbWVudCkgPT4gbmV3ICgpID0+IEhUTUxFbGVtZW50fSBbZXh0ZW5kXVxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlX2N1c3RvbV9lbGVtZW50KFxuXHRDb21wb25lbnQsXG5cdHByb3BzX2RlZmluaXRpb24sXG5cdHNsb3RzLFxuXHRhY2Nlc3NvcnMsXG5cdHVzZV9zaGFkb3dfZG9tLFxuXHRleHRlbmRcbikge1xuXHRsZXQgQ2xhc3MgPSBjbGFzcyBleHRlbmRzIFN2ZWx0ZUVsZW1lbnQge1xuXHRcdGNvbnN0cnVjdG9yKCkge1xuXHRcdFx0c3VwZXIoQ29tcG9uZW50LCBzbG90cywgdXNlX3NoYWRvd19kb20pO1xuXHRcdFx0dGhpcy4kJHBfZCA9IHByb3BzX2RlZmluaXRpb247XG5cdFx0fVxuXHRcdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuXHRcdFx0cmV0dXJuIE9iamVjdC5rZXlzKHByb3BzX2RlZmluaXRpb24pLm1hcCgoa2V5KSA9PlxuXHRcdFx0XHQocHJvcHNfZGVmaW5pdGlvbltrZXldLmF0dHJpYnV0ZSB8fCBrZXkpLnRvTG93ZXJDYXNlKClcblx0XHRcdCk7XG5cdFx0fVxuXHR9O1xuXHRPYmplY3Qua2V5cyhwcm9wc19kZWZpbml0aW9uKS5mb3JFYWNoKChwcm9wKSA9PiB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KENsYXNzLnByb3RvdHlwZSwgcHJvcCwge1xuXHRcdFx0Z2V0KCkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy4kJGMgJiYgcHJvcCBpbiB0aGlzLiQkYyA/IHRoaXMuJCRjW3Byb3BdIDogdGhpcy4kJGRbcHJvcF07XG5cdFx0XHR9LFxuXHRcdFx0c2V0KHZhbHVlKSB7XG5cdFx0XHRcdHZhbHVlID0gZ2V0X2N1c3RvbV9lbGVtZW50X3ZhbHVlKHByb3AsIHZhbHVlLCBwcm9wc19kZWZpbml0aW9uKTtcblx0XHRcdFx0dGhpcy4kJGRbcHJvcF0gPSB2YWx1ZTtcblx0XHRcdFx0dGhpcy4kJGM/LiRzZXQoeyBbcHJvcF06IHZhbHVlIH0pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9KTtcblx0YWNjZXNzb3JzLmZvckVhY2goKGFjY2Vzc29yKSA9PiB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KENsYXNzLnByb3RvdHlwZSwgYWNjZXNzb3IsIHtcblx0XHRcdGdldCgpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuJCRjPy5bYWNjZXNzb3JdO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9KTtcblx0aWYgKGV4dGVuZCkge1xuXHRcdC8vIEB0cy1leHBlY3QtZXJyb3IgLSBhc3NpZ25pbmcgaGVyZSBpcyBmaW5lXG5cdFx0Q2xhc3MgPSBleHRlbmQoQ2xhc3MpO1xuXHR9XG5cdENvbXBvbmVudC5lbGVtZW50ID0gLyoqIEB0eXBlIHthbnl9ICovIChDbGFzcyk7XG5cdHJldHVybiBDbGFzcztcbn1cblxuLyoqXG4gKiBCYXNlIGNsYXNzIGZvciBTdmVsdGUgY29tcG9uZW50cy4gVXNlZCB3aGVuIGRldj1mYWxzZS5cbiAqXG4gKiBAdGVtcGxhdGUge1JlY29yZDxzdHJpbmcsIGFueT59IFtQcm9wcz1hbnldXG4gKiBAdGVtcGxhdGUge1JlY29yZDxzdHJpbmcsIGFueT59IFtFdmVudHM9YW55XVxuICovXG5leHBvcnQgY2xhc3MgU3ZlbHRlQ29tcG9uZW50IHtcblx0LyoqXG5cdCAqICMjIyBQUklWQVRFIEFQSVxuXHQgKlxuXHQgKiBEbyBub3QgdXNlLCBtYXkgY2hhbmdlIGF0IGFueSB0aW1lXG5cdCAqXG5cdCAqIEB0eXBlIHthbnl9XG5cdCAqL1xuXHQkJCA9IHVuZGVmaW5lZDtcblx0LyoqXG5cdCAqICMjIyBQUklWQVRFIEFQSVxuXHQgKlxuXHQgKiBEbyBub3QgdXNlLCBtYXkgY2hhbmdlIGF0IGFueSB0aW1lXG5cdCAqXG5cdCAqIEB0eXBlIHthbnl9XG5cdCAqL1xuXHQkJHNldCA9IHVuZGVmaW5lZDtcblxuXHQvKiogQHJldHVybnMge3ZvaWR9ICovXG5cdCRkZXN0cm95KCkge1xuXHRcdGRlc3Ryb3lfY29tcG9uZW50KHRoaXMsIDEpO1xuXHRcdHRoaXMuJGRlc3Ryb3kgPSBub29wO1xuXHR9XG5cblx0LyoqXG5cdCAqIEB0ZW1wbGF0ZSB7RXh0cmFjdDxrZXlvZiBFdmVudHMsIHN0cmluZz59IEtcblx0ICogQHBhcmFtIHtLfSB0eXBlXG5cdCAqIEBwYXJhbSB7KChlOiBFdmVudHNbS10pID0+IHZvaWQpIHwgbnVsbCB8IHVuZGVmaW5lZH0gY2FsbGJhY2tcblx0ICogQHJldHVybnMgeygpID0+IHZvaWR9XG5cdCAqL1xuXHQkb24odHlwZSwgY2FsbGJhY2spIHtcblx0XHRpZiAoIWlzX2Z1bmN0aW9uKGNhbGxiYWNrKSkge1xuXHRcdFx0cmV0dXJuIG5vb3A7XG5cdFx0fVxuXHRcdGNvbnN0IGNhbGxiYWNrcyA9IHRoaXMuJCQuY2FsbGJhY2tzW3R5cGVdIHx8ICh0aGlzLiQkLmNhbGxiYWNrc1t0eXBlXSA9IFtdKTtcblx0XHRjYWxsYmFja3MucHVzaChjYWxsYmFjayk7XG5cdFx0cmV0dXJuICgpID0+IHtcblx0XHRcdGNvbnN0IGluZGV4ID0gY2FsbGJhY2tzLmluZGV4T2YoY2FsbGJhY2spO1xuXHRcdFx0aWYgKGluZGV4ICE9PSAtMSkgY2FsbGJhY2tzLnNwbGljZShpbmRleCwgMSk7XG5cdFx0fTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcGFyYW0ge1BhcnRpYWw8UHJvcHM+fSBwcm9wc1xuXHQgKiBAcmV0dXJucyB7dm9pZH1cblx0ICovXG5cdCRzZXQocHJvcHMpIHtcblx0XHRpZiAodGhpcy4kJHNldCAmJiAhaXNfZW1wdHkocHJvcHMpKSB7XG5cdFx0XHR0aGlzLiQkLnNraXBfYm91bmQgPSB0cnVlO1xuXHRcdFx0dGhpcy4kJHNldChwcm9wcyk7XG5cdFx0XHR0aGlzLiQkLnNraXBfYm91bmQgPSBmYWxzZTtcblx0XHR9XG5cdH1cbn1cblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBDdXN0b21FbGVtZW50UHJvcERlZmluaXRpb25cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbYXR0cmlidXRlXVxuICogQHByb3BlcnR5IHtib29sZWFufSBbcmVmbGVjdF1cbiAqIEBwcm9wZXJ0eSB7J1N0cmluZyd8J0Jvb2xlYW4nfCdOdW1iZXInfCdBcnJheSd8J09iamVjdCd9IFt0eXBlXVxuICovXG4iLCAidHlwZSBMaXN0ZW5lciA9ICgpID0+IHZvaWRcblxuZXhwb3J0IGNsYXNzIFN1YnNjcmliYWJsZTxUTGlzdGVuZXIgZXh0ZW5kcyBGdW5jdGlvbiA9IExpc3RlbmVyPiB7XG4gIHByb3RlY3RlZCBsaXN0ZW5lcnM6IFNldDx7IGxpc3RlbmVyOiBUTGlzdGVuZXIgfT5cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmxpc3RlbmVycyA9IG5ldyBTZXQoKVxuICAgIHRoaXMuc3Vic2NyaWJlID0gdGhpcy5zdWJzY3JpYmUuYmluZCh0aGlzKVxuICB9XG5cbiAgc3Vic2NyaWJlKGxpc3RlbmVyOiBUTGlzdGVuZXIpOiAoKSA9PiB2b2lkIHtcbiAgICBjb25zdCBpZGVudGl0eSA9IHsgbGlzdGVuZXIgfVxuICAgIHRoaXMubGlzdGVuZXJzLmFkZChpZGVudGl0eSlcblxuICAgIHRoaXMub25TdWJzY3JpYmUoKVxuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHRoaXMubGlzdGVuZXJzLmRlbGV0ZShpZGVudGl0eSlcbiAgICAgIHRoaXMub25VbnN1YnNjcmliZSgpXG4gICAgfVxuICB9XG5cbiAgaGFzTGlzdGVuZXJzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmxpc3RlbmVycy5zaXplID4gMFxuICB9XG5cbiAgcHJvdGVjdGVkIG9uU3Vic2NyaWJlKCk6IHZvaWQge1xuICAgIC8vIERvIG5vdGhpbmdcbiAgfVxuXG4gIHByb3RlY3RlZCBvblVuc3Vic2NyaWJlKCk6IHZvaWQge1xuICAgIC8vIERvIG5vdGhpbmdcbiAgfVxufVxuIiwgImltcG9ydCB0eXBlIHsgTXV0YXRpb24gfSBmcm9tICcuL211dGF0aW9uJ1xuaW1wb3J0IHR5cGUgeyBRdWVyeSB9IGZyb20gJy4vcXVlcnknXG5pbXBvcnQgdHlwZSB7XG4gIEZldGNoU3RhdHVzLFxuICBNdXRhdGlvbkZ1bmN0aW9uLFxuICBNdXRhdGlvbktleSxcbiAgTXV0YXRpb25PcHRpb25zLFxuICBRdWVyeUZ1bmN0aW9uLFxuICBRdWVyeUtleSxcbiAgUXVlcnlPcHRpb25zLFxufSBmcm9tICcuL3R5cGVzJ1xuXG4vLyBUWVBFU1xuXG5leHBvcnQgaW50ZXJmYWNlIFF1ZXJ5RmlsdGVycyB7XG4gIC8qKlxuICAgKiBGaWx0ZXIgdG8gYWN0aXZlIHF1ZXJpZXMsIGluYWN0aXZlIHF1ZXJpZXMgb3IgYWxsIHF1ZXJpZXNcbiAgICovXG4gIHR5cGU/OiBRdWVyeVR5cGVGaWx0ZXJcbiAgLyoqXG4gICAqIE1hdGNoIHF1ZXJ5IGtleSBleGFjdGx5XG4gICAqL1xuICBleGFjdD86IGJvb2xlYW5cbiAgLyoqXG4gICAqIEluY2x1ZGUgcXVlcmllcyBtYXRjaGluZyB0aGlzIHByZWRpY2F0ZSBmdW5jdGlvblxuICAgKi9cbiAgcHJlZGljYXRlPzogKHF1ZXJ5OiBRdWVyeSkgPT4gYm9vbGVhblxuICAvKipcbiAgICogSW5jbHVkZSBxdWVyaWVzIG1hdGNoaW5nIHRoaXMgcXVlcnkga2V5XG4gICAqL1xuICBxdWVyeUtleT86IFF1ZXJ5S2V5XG4gIC8qKlxuICAgKiBJbmNsdWRlIG9yIGV4Y2x1ZGUgc3RhbGUgcXVlcmllc1xuICAgKi9cbiAgc3RhbGU/OiBib29sZWFuXG4gIC8qKlxuICAgKiBJbmNsdWRlIHF1ZXJpZXMgbWF0Y2hpbmcgdGhlaXIgZmV0Y2hTdGF0dXNcbiAgICovXG4gIGZldGNoU3RhdHVzPzogRmV0Y2hTdGF0dXNcbn1cblxuZXhwb3J0IGludGVyZmFjZSBNdXRhdGlvbkZpbHRlcnMge1xuICAvKipcbiAgICogTWF0Y2ggbXV0YXRpb24ga2V5IGV4YWN0bHlcbiAgICovXG4gIGV4YWN0PzogYm9vbGVhblxuICAvKipcbiAgICogSW5jbHVkZSBtdXRhdGlvbnMgbWF0Y2hpbmcgdGhpcyBwcmVkaWNhdGUgZnVuY3Rpb25cbiAgICovXG4gIHByZWRpY2F0ZT86IChtdXRhdGlvbjogTXV0YXRpb248YW55LCBhbnksIGFueT4pID0+IGJvb2xlYW5cbiAgLyoqXG4gICAqIEluY2x1ZGUgbXV0YXRpb25zIG1hdGNoaW5nIHRoaXMgbXV0YXRpb24ga2V5XG4gICAqL1xuICBtdXRhdGlvbktleT86IE11dGF0aW9uS2V5XG4gIC8qKlxuICAgKiBJbmNsdWRlIG9yIGV4Y2x1ZGUgZmV0Y2hpbmcgbXV0YXRpb25zXG4gICAqL1xuICBmZXRjaGluZz86IGJvb2xlYW5cbn1cblxuZXhwb3J0IHR5cGUgRGF0YVVwZGF0ZUZ1bmN0aW9uPFRJbnB1dCwgVE91dHB1dD4gPSAoaW5wdXQ6IFRJbnB1dCkgPT4gVE91dHB1dFxuXG5leHBvcnQgdHlwZSBVcGRhdGVyPFRJbnB1dCwgVE91dHB1dD4gPVxuICB8IFRPdXRwdXRcbiAgfCBEYXRhVXBkYXRlRnVuY3Rpb248VElucHV0LCBUT3V0cHV0PlxuXG5leHBvcnQgdHlwZSBRdWVyeVR5cGVGaWx0ZXIgPSAnYWxsJyB8ICdhY3RpdmUnIHwgJ2luYWN0aXZlJ1xuXG4vLyBVVElMU1xuXG5leHBvcnQgY29uc3QgaXNTZXJ2ZXIgPSB0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyB8fCAnRGVubycgaW4gd2luZG93XG5cbmV4cG9ydCBmdW5jdGlvbiBub29wKCk6IHVuZGVmaW5lZCB7XG4gIHJldHVybiB1bmRlZmluZWRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZ1bmN0aW9uYWxVcGRhdGU8VElucHV0LCBUT3V0cHV0PihcbiAgdXBkYXRlcjogVXBkYXRlcjxUSW5wdXQsIFRPdXRwdXQ+LFxuICBpbnB1dDogVElucHV0LFxuKTogVE91dHB1dCB7XG4gIHJldHVybiB0eXBlb2YgdXBkYXRlciA9PT0gJ2Z1bmN0aW9uJ1xuICAgID8gKHVwZGF0ZXIgYXMgRGF0YVVwZGF0ZUZ1bmN0aW9uPFRJbnB1dCwgVE91dHB1dD4pKGlucHV0KVxuICAgIDogdXBkYXRlclxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNWYWxpZFRpbWVvdXQodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudW1iZXIge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyAmJiB2YWx1ZSA+PSAwICYmIHZhbHVlICE9PSBJbmZpbml0eVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGlmZmVyZW5jZTxUPihhcnJheTE6IFRbXSwgYXJyYXkyOiBUW10pOiBUW10ge1xuICByZXR1cm4gYXJyYXkxLmZpbHRlcigoeCkgPT4gIWFycmF5Mi5pbmNsdWRlcyh4KSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlcGxhY2VBdDxUPihhcnJheTogVFtdLCBpbmRleDogbnVtYmVyLCB2YWx1ZTogVCk6IFRbXSB7XG4gIGNvbnN0IGNvcHkgPSBhcnJheS5zbGljZSgwKVxuICBjb3B5W2luZGV4XSA9IHZhbHVlXG4gIHJldHVybiBjb3B5XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0aW1lVW50aWxTdGFsZSh1cGRhdGVkQXQ6IG51bWJlciwgc3RhbGVUaW1lPzogbnVtYmVyKTogbnVtYmVyIHtcbiAgcmV0dXJuIE1hdGgubWF4KHVwZGF0ZWRBdCArIChzdGFsZVRpbWUgfHwgMCkgLSBEYXRlLm5vdygpLCAwKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VRdWVyeUFyZ3M8XG4gIFRPcHRpb25zIGV4dGVuZHMgUXVlcnlPcHRpb25zPGFueSwgYW55LCBhbnksIFRRdWVyeUtleT4sXG4gIFRRdWVyeUtleSBleHRlbmRzIFF1ZXJ5S2V5ID0gUXVlcnlLZXksXG4+KFxuICBhcmcxOiBUUXVlcnlLZXkgfCBUT3B0aW9ucyxcbiAgYXJnMj86IFF1ZXJ5RnVuY3Rpb248YW55LCBUUXVlcnlLZXk+IHwgVE9wdGlvbnMsXG4gIGFyZzM/OiBUT3B0aW9ucyxcbik6IFRPcHRpb25zIHtcbiAgaWYgKCFpc1F1ZXJ5S2V5KGFyZzEpKSB7XG4gICAgcmV0dXJuIGFyZzEgYXMgVE9wdGlvbnNcbiAgfVxuXG4gIGlmICh0eXBlb2YgYXJnMiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiB7IC4uLmFyZzMsIHF1ZXJ5S2V5OiBhcmcxLCBxdWVyeUZuOiBhcmcyIH0gYXMgVE9wdGlvbnNcbiAgfVxuXG4gIHJldHVybiB7IC4uLmFyZzIsIHF1ZXJ5S2V5OiBhcmcxIH0gYXMgVE9wdGlvbnNcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlTXV0YXRpb25BcmdzPFxuICBUT3B0aW9ucyBleHRlbmRzIE11dGF0aW9uT3B0aW9uczxhbnksIGFueSwgYW55LCBhbnk+LFxuPihcbiAgYXJnMTogTXV0YXRpb25LZXkgfCBNdXRhdGlvbkZ1bmN0aW9uPGFueSwgYW55PiB8IFRPcHRpb25zLFxuICBhcmcyPzogTXV0YXRpb25GdW5jdGlvbjxhbnksIGFueT4gfCBUT3B0aW9ucyxcbiAgYXJnMz86IFRPcHRpb25zLFxuKTogVE9wdGlvbnMge1xuICBpZiAoaXNRdWVyeUtleShhcmcxKSkge1xuICAgIGlmICh0eXBlb2YgYXJnMiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIHsgLi4uYXJnMywgbXV0YXRpb25LZXk6IGFyZzEsIG11dGF0aW9uRm46IGFyZzIgfSBhcyBUT3B0aW9uc1xuICAgIH1cbiAgICByZXR1cm4geyAuLi5hcmcyLCBtdXRhdGlvbktleTogYXJnMSB9IGFzIFRPcHRpb25zXG4gIH1cblxuICBpZiAodHlwZW9mIGFyZzEgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4geyAuLi5hcmcyLCBtdXRhdGlvbkZuOiBhcmcxIH0gYXMgVE9wdGlvbnNcbiAgfVxuXG4gIHJldHVybiB7IC4uLmFyZzEgfSBhcyBUT3B0aW9uc1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VGaWx0ZXJBcmdzPFxuICBURmlsdGVycyBleHRlbmRzIFF1ZXJ5RmlsdGVycyxcbiAgVE9wdGlvbnMgPSB1bmtub3duLFxuPihcbiAgYXJnMT86IFF1ZXJ5S2V5IHwgVEZpbHRlcnMsXG4gIGFyZzI/OiBURmlsdGVycyB8IFRPcHRpb25zLFxuICBhcmczPzogVE9wdGlvbnMsXG4pOiBbVEZpbHRlcnMsIFRPcHRpb25zIHwgdW5kZWZpbmVkXSB7XG4gIHJldHVybiAoXG4gICAgaXNRdWVyeUtleShhcmcxKSA/IFt7IC4uLmFyZzIsIHF1ZXJ5S2V5OiBhcmcxIH0sIGFyZzNdIDogW2FyZzEgfHwge30sIGFyZzJdXG4gICkgYXMgW1RGaWx0ZXJzLCBUT3B0aW9uc11cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlTXV0YXRpb25GaWx0ZXJBcmdzPFxuICBURmlsdGVycyBleHRlbmRzIE11dGF0aW9uRmlsdGVycyxcbiAgVE9wdGlvbnMgPSB1bmtub3duLFxuPihcbiAgYXJnMT86IFF1ZXJ5S2V5IHwgVEZpbHRlcnMsXG4gIGFyZzI/OiBURmlsdGVycyB8IFRPcHRpb25zLFxuICBhcmczPzogVE9wdGlvbnMsXG4pOiBbVEZpbHRlcnMsIFRPcHRpb25zIHwgdW5kZWZpbmVkXSB7XG4gIHJldHVybiAoXG4gICAgaXNRdWVyeUtleShhcmcxKVxuICAgICAgPyBbeyAuLi5hcmcyLCBtdXRhdGlvbktleTogYXJnMSB9LCBhcmczXVxuICAgICAgOiBbYXJnMSB8fCB7fSwgYXJnMl1cbiAgKSBhcyBbVEZpbHRlcnMsIFRPcHRpb25zXVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbWF0Y2hRdWVyeShcbiAgZmlsdGVyczogUXVlcnlGaWx0ZXJzLFxuICBxdWVyeTogUXVlcnk8YW55LCBhbnksIGFueSwgYW55Pixcbik6IGJvb2xlYW4ge1xuICBjb25zdCB7XG4gICAgdHlwZSA9ICdhbGwnLFxuICAgIGV4YWN0LFxuICAgIGZldGNoU3RhdHVzLFxuICAgIHByZWRpY2F0ZSxcbiAgICBxdWVyeUtleSxcbiAgICBzdGFsZSxcbiAgfSA9IGZpbHRlcnNcblxuICBpZiAoaXNRdWVyeUtleShxdWVyeUtleSkpIHtcbiAgICBpZiAoZXhhY3QpIHtcbiAgICAgIGlmIChxdWVyeS5xdWVyeUhhc2ggIT09IGhhc2hRdWVyeUtleUJ5T3B0aW9ucyhxdWVyeUtleSwgcXVlcnkub3B0aW9ucykpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgfSBlbHNlIGlmICghcGFydGlhbE1hdGNoS2V5KHF1ZXJ5LnF1ZXJ5S2V5LCBxdWVyeUtleSkpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgfVxuXG4gIGlmICh0eXBlICE9PSAnYWxsJykge1xuICAgIGNvbnN0IGlzQWN0aXZlID0gcXVlcnkuaXNBY3RpdmUoKVxuICAgIGlmICh0eXBlID09PSAnYWN0aXZlJyAmJiAhaXNBY3RpdmUpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICBpZiAodHlwZSA9PT0gJ2luYWN0aXZlJyAmJiBpc0FjdGl2ZSkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICB9XG5cbiAgaWYgKHR5cGVvZiBzdGFsZSA9PT0gJ2Jvb2xlYW4nICYmIHF1ZXJ5LmlzU3RhbGUoKSAhPT0gc3RhbGUpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIGlmIChcbiAgICB0eXBlb2YgZmV0Y2hTdGF0dXMgIT09ICd1bmRlZmluZWQnICYmXG4gICAgZmV0Y2hTdGF0dXMgIT09IHF1ZXJ5LnN0YXRlLmZldGNoU3RhdHVzXG4gICkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgaWYgKHByZWRpY2F0ZSAmJiAhcHJlZGljYXRlKHF1ZXJ5KSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgcmV0dXJuIHRydWVcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1hdGNoTXV0YXRpb24oXG4gIGZpbHRlcnM6IE11dGF0aW9uRmlsdGVycyxcbiAgbXV0YXRpb246IE11dGF0aW9uPGFueSwgYW55Pixcbik6IGJvb2xlYW4ge1xuICBjb25zdCB7IGV4YWN0LCBmZXRjaGluZywgcHJlZGljYXRlLCBtdXRhdGlvbktleSB9ID0gZmlsdGVyc1xuICBpZiAoaXNRdWVyeUtleShtdXRhdGlvbktleSkpIHtcbiAgICBpZiAoIW11dGF0aW9uLm9wdGlvbnMubXV0YXRpb25LZXkpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICBpZiAoZXhhY3QpIHtcbiAgICAgIGlmIChcbiAgICAgICAgaGFzaFF1ZXJ5S2V5KG11dGF0aW9uLm9wdGlvbnMubXV0YXRpb25LZXkpICE9PSBoYXNoUXVlcnlLZXkobXV0YXRpb25LZXkpXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgfSBlbHNlIGlmICghcGFydGlhbE1hdGNoS2V5KG11dGF0aW9uLm9wdGlvbnMubXV0YXRpb25LZXksIG11dGF0aW9uS2V5KSkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICB9XG5cbiAgaWYgKFxuICAgIHR5cGVvZiBmZXRjaGluZyA9PT0gJ2Jvb2xlYW4nICYmXG4gICAgKG11dGF0aW9uLnN0YXRlLnN0YXR1cyA9PT0gJ2xvYWRpbmcnKSAhPT0gZmV0Y2hpbmdcbiAgKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBpZiAocHJlZGljYXRlICYmICFwcmVkaWNhdGUobXV0YXRpb24pKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICByZXR1cm4gdHJ1ZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaGFzaFF1ZXJ5S2V5QnlPcHRpb25zPFRRdWVyeUtleSBleHRlbmRzIFF1ZXJ5S2V5ID0gUXVlcnlLZXk+KFxuICBxdWVyeUtleTogVFF1ZXJ5S2V5LFxuICBvcHRpb25zPzogUXVlcnlPcHRpb25zPGFueSwgYW55LCBhbnksIFRRdWVyeUtleT4sXG4pOiBzdHJpbmcge1xuICBjb25zdCBoYXNoRm4gPSBvcHRpb25zPy5xdWVyeUtleUhhc2hGbiB8fCBoYXNoUXVlcnlLZXlcbiAgcmV0dXJuIGhhc2hGbihxdWVyeUtleSlcbn1cblxuLyoqXG4gKiBEZWZhdWx0IHF1ZXJ5IGtleXMgaGFzaCBmdW5jdGlvbi5cbiAqIEhhc2hlcyB0aGUgdmFsdWUgaW50byBhIHN0YWJsZSBoYXNoLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaGFzaFF1ZXJ5S2V5KHF1ZXJ5S2V5OiBRdWVyeUtleSk6IHN0cmluZyB7XG4gIHJldHVybiBKU09OLnN0cmluZ2lmeShxdWVyeUtleSwgKF8sIHZhbCkgPT5cbiAgICBpc1BsYWluT2JqZWN0KHZhbClcbiAgICAgID8gT2JqZWN0LmtleXModmFsKVxuICAgICAgICAgIC5zb3J0KClcbiAgICAgICAgICAucmVkdWNlKChyZXN1bHQsIGtleSkgPT4ge1xuICAgICAgICAgICAgcmVzdWx0W2tleV0gPSB2YWxba2V5XVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdFxuICAgICAgICAgIH0sIHt9IGFzIGFueSlcbiAgICAgIDogdmFsLFxuICApXG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGtleSBgYmAgcGFydGlhbGx5IG1hdGNoZXMgd2l0aCBrZXkgYGFgLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFydGlhbE1hdGNoS2V5KGE6IFF1ZXJ5S2V5LCBiOiBRdWVyeUtleSk6IGJvb2xlYW4ge1xuICByZXR1cm4gcGFydGlhbERlZXBFcXVhbChhLCBiKVxufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgYmAgcGFydGlhbGx5IG1hdGNoZXMgd2l0aCBgYWAuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwYXJ0aWFsRGVlcEVxdWFsKGE6IGFueSwgYjogYW55KTogYm9vbGVhbiB7XG4gIGlmIChhID09PSBiKSB7XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIGlmICh0eXBlb2YgYSAhPT0gdHlwZW9mIGIpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIGlmIChhICYmIGIgJiYgdHlwZW9mIGEgPT09ICdvYmplY3QnICYmIHR5cGVvZiBiID09PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiAhT2JqZWN0LmtleXMoYikuc29tZSgoa2V5KSA9PiAhcGFydGlhbERlZXBFcXVhbChhW2tleV0sIGJba2V5XSkpXG4gIH1cblxuICByZXR1cm4gZmFsc2Vcbn1cblxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIHJldHVybnMgYGFgIGlmIGBiYCBpcyBkZWVwbHkgZXF1YWwuXG4gKiBJZiBub3QsIGl0IHdpbGwgcmVwbGFjZSBhbnkgZGVlcGx5IGVxdWFsIGNoaWxkcmVuIG9mIGBiYCB3aXRoIHRob3NlIG9mIGBhYC5cbiAqIFRoaXMgY2FuIGJlIHVzZWQgZm9yIHN0cnVjdHVyYWwgc2hhcmluZyBiZXR3ZWVuIEpTT04gdmFsdWVzIGZvciBleGFtcGxlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVwbGFjZUVxdWFsRGVlcDxUPihhOiB1bmtub3duLCBiOiBUKTogVFxuZXhwb3J0IGZ1bmN0aW9uIHJlcGxhY2VFcXVhbERlZXAoYTogYW55LCBiOiBhbnkpOiBhbnkge1xuICBpZiAoYSA9PT0gYikge1xuICAgIHJldHVybiBhXG4gIH1cblxuICBjb25zdCBhcnJheSA9IGlzUGxhaW5BcnJheShhKSAmJiBpc1BsYWluQXJyYXkoYilcblxuICBpZiAoYXJyYXkgfHwgKGlzUGxhaW5PYmplY3QoYSkgJiYgaXNQbGFpbk9iamVjdChiKSkpIHtcbiAgICBjb25zdCBhU2l6ZSA9IGFycmF5ID8gYS5sZW5ndGggOiBPYmplY3Qua2V5cyhhKS5sZW5ndGhcbiAgICBjb25zdCBiSXRlbXMgPSBhcnJheSA/IGIgOiBPYmplY3Qua2V5cyhiKVxuICAgIGNvbnN0IGJTaXplID0gYkl0ZW1zLmxlbmd0aFxuICAgIGNvbnN0IGNvcHk6IGFueSA9IGFycmF5ID8gW10gOiB7fVxuXG4gICAgbGV0IGVxdWFsSXRlbXMgPSAwXG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJTaXplOyBpKyspIHtcbiAgICAgIGNvbnN0IGtleSA9IGFycmF5ID8gaSA6IGJJdGVtc1tpXVxuICAgICAgY29weVtrZXldID0gcmVwbGFjZUVxdWFsRGVlcChhW2tleV0sIGJba2V5XSlcbiAgICAgIGlmIChjb3B5W2tleV0gPT09IGFba2V5XSkge1xuICAgICAgICBlcXVhbEl0ZW1zKytcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gYVNpemUgPT09IGJTaXplICYmIGVxdWFsSXRlbXMgPT09IGFTaXplID8gYSA6IGNvcHlcbiAgfVxuXG4gIHJldHVybiBiXG59XG5cbi8qKlxuICogU2hhbGxvdyBjb21wYXJlIG9iamVjdHMuIE9ubHkgd29ya3Mgd2l0aCBvYmplY3RzIHRoYXQgYWx3YXlzIGhhdmUgdGhlIHNhbWUgcHJvcGVydGllcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNoYWxsb3dFcXVhbE9iamVjdHM8VD4oYTogVCwgYjogVCk6IGJvb2xlYW4ge1xuICBpZiAoKGEgJiYgIWIpIHx8IChiICYmICFhKSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgZm9yIChjb25zdCBrZXkgaW4gYSkge1xuICAgIGlmIChhW2tleV0gIT09IGJba2V5XSkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWVcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUGxhaW5BcnJheSh2YWx1ZTogdW5rbm93bikge1xuICByZXR1cm4gQXJyYXkuaXNBcnJheSh2YWx1ZSkgJiYgdmFsdWUubGVuZ3RoID09PSBPYmplY3Qua2V5cyh2YWx1ZSkubGVuZ3RoXG59XG5cbi8vIENvcGllZCBmcm9tOiBodHRwczovL2dpdGh1Yi5jb20vam9uc2NobGlua2VydC9pcy1wbGFpbi1vYmplY3RcbmV4cG9ydCBmdW5jdGlvbiBpc1BsYWluT2JqZWN0KG86IGFueSk6IG8gaXMgT2JqZWN0IHtcbiAgaWYgKCFoYXNPYmplY3RQcm90b3R5cGUobykpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIC8vIElmIGhhcyBtb2RpZmllZCBjb25zdHJ1Y3RvclxuICBjb25zdCBjdG9yID0gby5jb25zdHJ1Y3RvclxuICBpZiAodHlwZW9mIGN0b3IgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIC8vIElmIGhhcyBtb2RpZmllZCBwcm90b3R5cGVcbiAgY29uc3QgcHJvdCA9IGN0b3IucHJvdG90eXBlXG4gIGlmICghaGFzT2JqZWN0UHJvdG90eXBlKHByb3QpKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICAvLyBJZiBjb25zdHJ1Y3RvciBkb2VzIG5vdCBoYXZlIGFuIE9iamVjdC1zcGVjaWZpYyBtZXRob2RcbiAgaWYgKCFwcm90Lmhhc093blByb3BlcnR5KCdpc1Byb3RvdHlwZU9mJykpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIC8vIE1vc3QgbGlrZWx5IGEgcGxhaW4gT2JqZWN0XG4gIHJldHVybiB0cnVlXG59XG5cbmZ1bmN0aW9uIGhhc09iamVjdFByb3RvdHlwZShvOiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKSA9PT0gJ1tvYmplY3QgT2JqZWN0XSdcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUXVlcnlLZXkodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBRdWVyeUtleSB7XG4gIHJldHVybiBBcnJheS5pc0FycmF5KHZhbHVlKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNFcnJvcih2YWx1ZTogYW55KTogdmFsdWUgaXMgRXJyb3Ige1xuICByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBFcnJvclxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2xlZXAodGltZW91dDogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgIHNldFRpbWVvdXQocmVzb2x2ZSwgdGltZW91dClcbiAgfSlcbn1cblxuLyoqXG4gKiBTY2hlZHVsZXMgYSBtaWNyb3Rhc2suXG4gKiBUaGlzIGNhbiBiZSB1c2VmdWwgdG8gc2NoZWR1bGUgc3RhdGUgdXBkYXRlcyBhZnRlciByZW5kZXJpbmcuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzY2hlZHVsZU1pY3JvdGFzayhjYWxsYmFjazogKCkgPT4gdm9pZCkge1xuICBzbGVlcCgwKS50aGVuKGNhbGxiYWNrKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0QWJvcnRDb250cm9sbGVyKCk6IEFib3J0Q29udHJvbGxlciB8IHVuZGVmaW5lZCB7XG4gIGlmICh0eXBlb2YgQWJvcnRDb250cm9sbGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIG5ldyBBYm9ydENvbnRyb2xsZXIoKVxuICB9XG4gIHJldHVyblxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVwbGFjZURhdGE8XG4gIFREYXRhLFxuICBUT3B0aW9ucyBleHRlbmRzIFF1ZXJ5T3B0aW9uczxhbnksIGFueSwgYW55LCBhbnk+LFxuPihwcmV2RGF0YTogVERhdGEgfCB1bmRlZmluZWQsIGRhdGE6IFREYXRhLCBvcHRpb25zOiBUT3B0aW9ucyk6IFREYXRhIHtcbiAgLy8gVXNlIHByZXYgZGF0YSBpZiBhbiBpc0RhdGFFcXVhbCBmdW5jdGlvbiBpcyBkZWZpbmVkIGFuZCByZXR1cm5zIGB0cnVlYFxuICBpZiAob3B0aW9ucy5pc0RhdGFFcXVhbD8uKHByZXZEYXRhLCBkYXRhKSkge1xuICAgIHJldHVybiBwcmV2RGF0YSBhcyBURGF0YVxuICB9IGVsc2UgaWYgKHR5cGVvZiBvcHRpb25zLnN0cnVjdHVyYWxTaGFyaW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIG9wdGlvbnMuc3RydWN0dXJhbFNoYXJpbmcocHJldkRhdGEsIGRhdGEpXG4gIH0gZWxzZSBpZiAob3B0aW9ucy5zdHJ1Y3R1cmFsU2hhcmluZyAhPT0gZmFsc2UpIHtcbiAgICAvLyBTdHJ1Y3R1cmFsbHkgc2hhcmUgZGF0YSBiZXR3ZWVuIHByZXYgYW5kIG5ldyBkYXRhIGlmIG5lZWRlZFxuICAgIHJldHVybiByZXBsYWNlRXF1YWxEZWVwKHByZXZEYXRhLCBkYXRhKVxuICB9XG4gIHJldHVybiBkYXRhXG59XG4iLCAiaW1wb3J0IHsgU3Vic2NyaWJhYmxlIH0gZnJvbSAnLi9zdWJzY3JpYmFibGUnXG5pbXBvcnQgeyBpc1NlcnZlciB9IGZyb20gJy4vdXRpbHMnXG5cbnR5cGUgU2V0dXBGbiA9IChcbiAgc2V0Rm9jdXNlZDogKGZvY3VzZWQ/OiBib29sZWFuKSA9PiB2b2lkLFxuKSA9PiAoKCkgPT4gdm9pZCkgfCB1bmRlZmluZWRcblxuZXhwb3J0IGNsYXNzIEZvY3VzTWFuYWdlciBleHRlbmRzIFN1YnNjcmliYWJsZSB7XG4gIHByaXZhdGUgZm9jdXNlZD86IGJvb2xlYW5cbiAgcHJpdmF0ZSBjbGVhbnVwPzogKCkgPT4gdm9pZFxuXG4gIHByaXZhdGUgc2V0dXA6IFNldHVwRm5cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpXG4gICAgdGhpcy5zZXR1cCA9IChvbkZvY3VzKSA9PiB7XG4gICAgICAvLyBhZGRFdmVudExpc3RlbmVyIGRvZXMgbm90IGV4aXN0IGluIFJlYWN0IE5hdGl2ZSwgYnV0IHdpbmRvdyBkb2VzXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVubmVjZXNzYXJ5LWNvbmRpdGlvblxuICAgICAgaWYgKCFpc1NlcnZlciAmJiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgICBjb25zdCBsaXN0ZW5lciA9ICgpID0+IG9uRm9jdXMoKVxuICAgICAgICAvLyBMaXN0ZW4gdG8gdmlzaWJpbGxpdHljaGFuZ2UgYW5kIGZvY3VzXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd2aXNpYmlsaXR5Y2hhbmdlJywgbGlzdGVuZXIsIGZhbHNlKVxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCBsaXN0ZW5lciwgZmFsc2UpXG5cbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAvLyBCZSBzdXJlIHRvIHVuc3Vic2NyaWJlIGlmIGEgbmV3IGhhbmRsZXIgaXMgc2V0XG4gICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Zpc2liaWxpdHljaGFuZ2UnLCBsaXN0ZW5lcilcbiAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignZm9jdXMnLCBsaXN0ZW5lcilcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuXG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIG9uU3Vic2NyaWJlKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5jbGVhbnVwKSB7XG4gICAgICB0aGlzLnNldEV2ZW50TGlzdGVuZXIodGhpcy5zZXR1cClcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgb25VbnN1YnNjcmliZSgpIHtcbiAgICBpZiAoIXRoaXMuaGFzTGlzdGVuZXJzKCkpIHtcbiAgICAgIHRoaXMuY2xlYW51cD8uKClcbiAgICAgIHRoaXMuY2xlYW51cCA9IHVuZGVmaW5lZFxuICAgIH1cbiAgfVxuXG4gIHNldEV2ZW50TGlzdGVuZXIoc2V0dXA6IFNldHVwRm4pOiB2b2lkIHtcbiAgICB0aGlzLnNldHVwID0gc2V0dXBcbiAgICB0aGlzLmNsZWFudXA/LigpXG4gICAgdGhpcy5jbGVhbnVwID0gc2V0dXAoKGZvY3VzZWQpID0+IHtcbiAgICAgIGlmICh0eXBlb2YgZm9jdXNlZCA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgIHRoaXMuc2V0Rm9jdXNlZChmb2N1c2VkKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5vbkZvY3VzKClcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgc2V0Rm9jdXNlZChmb2N1c2VkPzogYm9vbGVhbik6IHZvaWQge1xuICAgIGNvbnN0IGNoYW5nZWQgPSB0aGlzLmZvY3VzZWQgIT09IGZvY3VzZWRcbiAgICBpZiAoY2hhbmdlZCkge1xuICAgICAgdGhpcy5mb2N1c2VkID0gZm9jdXNlZFxuICAgICAgdGhpcy5vbkZvY3VzKClcbiAgICB9XG4gIH1cblxuICBvbkZvY3VzKCk6IHZvaWQge1xuICAgIHRoaXMubGlzdGVuZXJzLmZvckVhY2goKHsgbGlzdGVuZXIgfSkgPT4ge1xuICAgICAgbGlzdGVuZXIoKVxuICAgIH0pXG4gIH1cblxuICBpc0ZvY3VzZWQoKTogYm9vbGVhbiB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLmZvY3VzZWQgPT09ICdib29sZWFuJykge1xuICAgICAgcmV0dXJuIHRoaXMuZm9jdXNlZFxuICAgIH1cblxuICAgIC8vIGRvY3VtZW50IGdsb2JhbCBjYW4gYmUgdW5hdmFpbGFibGUgaW4gcmVhY3QgbmF0aXZlXG4gICAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuXG4gICAgcmV0dXJuIFt1bmRlZmluZWQsICd2aXNpYmxlJywgJ3ByZXJlbmRlciddLmluY2x1ZGVzKFxuICAgICAgZG9jdW1lbnQudmlzaWJpbGl0eVN0YXRlLFxuICAgIClcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgZm9jdXNNYW5hZ2VyID0gbmV3IEZvY3VzTWFuYWdlcigpXG4iLCAiaW1wb3J0IHsgU3Vic2NyaWJhYmxlIH0gZnJvbSAnLi9zdWJzY3JpYmFibGUnXG5pbXBvcnQgeyBpc1NlcnZlciB9IGZyb20gJy4vdXRpbHMnXG5cbnR5cGUgU2V0dXBGbiA9IChcbiAgc2V0T25saW5lOiAob25saW5lPzogYm9vbGVhbikgPT4gdm9pZCxcbikgPT4gKCgpID0+IHZvaWQpIHwgdW5kZWZpbmVkXG5cbmNvbnN0IG9ubGluZUV2ZW50cyA9IFsnb25saW5lJywgJ29mZmxpbmUnXSBhcyBjb25zdFxuXG5leHBvcnQgY2xhc3MgT25saW5lTWFuYWdlciBleHRlbmRzIFN1YnNjcmliYWJsZSB7XG4gIHByaXZhdGUgb25saW5lPzogYm9vbGVhblxuICBwcml2YXRlIGNsZWFudXA/OiAoKSA9PiB2b2lkXG5cbiAgcHJpdmF0ZSBzZXR1cDogU2V0dXBGblxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKClcbiAgICB0aGlzLnNldHVwID0gKG9uT25saW5lKSA9PiB7XG4gICAgICAvLyBhZGRFdmVudExpc3RlbmVyIGRvZXMgbm90IGV4aXN0IGluIFJlYWN0IE5hdGl2ZSwgYnV0IHdpbmRvdyBkb2VzXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVubmVjZXNzYXJ5LWNvbmRpdGlvblxuICAgICAgaWYgKCFpc1NlcnZlciAmJiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgICBjb25zdCBsaXN0ZW5lciA9ICgpID0+IG9uT25saW5lKClcbiAgICAgICAgLy8gTGlzdGVuIHRvIG9ubGluZVxuICAgICAgICBvbmxpbmVFdmVudHMuZm9yRWFjaCgoZXZlbnQpID0+IHtcbiAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgbGlzdGVuZXIsIGZhbHNlKVxuICAgICAgICB9KVxuXG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgLy8gQmUgc3VyZSB0byB1bnN1YnNjcmliZSBpZiBhIG5ldyBoYW5kbGVyIGlzIHNldFxuICAgICAgICAgIG9ubGluZUV2ZW50cy5mb3JFYWNoKChldmVudCkgPT4ge1xuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVyKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuXG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIG9uU3Vic2NyaWJlKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5jbGVhbnVwKSB7XG4gICAgICB0aGlzLnNldEV2ZW50TGlzdGVuZXIodGhpcy5zZXR1cClcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgb25VbnN1YnNjcmliZSgpIHtcbiAgICBpZiAoIXRoaXMuaGFzTGlzdGVuZXJzKCkpIHtcbiAgICAgIHRoaXMuY2xlYW51cD8uKClcbiAgICAgIHRoaXMuY2xlYW51cCA9IHVuZGVmaW5lZFxuICAgIH1cbiAgfVxuXG4gIHNldEV2ZW50TGlzdGVuZXIoc2V0dXA6IFNldHVwRm4pOiB2b2lkIHtcbiAgICB0aGlzLnNldHVwID0gc2V0dXBcbiAgICB0aGlzLmNsZWFudXA/LigpXG4gICAgdGhpcy5jbGVhbnVwID0gc2V0dXAoKG9ubGluZT86IGJvb2xlYW4pID0+IHtcbiAgICAgIGlmICh0eXBlb2Ygb25saW5lID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgdGhpcy5zZXRPbmxpbmUob25saW5lKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5vbk9ubGluZSgpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHNldE9ubGluZShvbmxpbmU/OiBib29sZWFuKTogdm9pZCB7XG4gICAgY29uc3QgY2hhbmdlZCA9IHRoaXMub25saW5lICE9PSBvbmxpbmVcblxuICAgIGlmIChjaGFuZ2VkKSB7XG4gICAgICB0aGlzLm9ubGluZSA9IG9ubGluZVxuICAgICAgdGhpcy5vbk9ubGluZSgpXG4gICAgfVxuICB9XG5cbiAgb25PbmxpbmUoKTogdm9pZCB7XG4gICAgdGhpcy5saXN0ZW5lcnMuZm9yRWFjaCgoeyBsaXN0ZW5lciB9KSA9PiB7XG4gICAgICBsaXN0ZW5lcigpXG4gICAgfSlcbiAgfVxuXG4gIGlzT25saW5lKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0eXBlb2YgdGhpcy5vbmxpbmUgPT09ICdib29sZWFuJykge1xuICAgICAgcmV0dXJuIHRoaXMub25saW5lXG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgdHlwZW9mIG5hdmlnYXRvciA9PT0gJ3VuZGVmaW5lZCcgfHxcbiAgICAgIHR5cGVvZiBuYXZpZ2F0b3Iub25MaW5lID09PSAndW5kZWZpbmVkJ1xuICAgICkge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG5cbiAgICByZXR1cm4gbmF2aWdhdG9yLm9uTGluZVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBvbmxpbmVNYW5hZ2VyID0gbmV3IE9ubGluZU1hbmFnZXIoKVxuIiwgImltcG9ydCB7IGZvY3VzTWFuYWdlciB9IGZyb20gJy4vZm9jdXNNYW5hZ2VyJ1xuaW1wb3J0IHsgb25saW5lTWFuYWdlciB9IGZyb20gJy4vb25saW5lTWFuYWdlcidcbmltcG9ydCB7IHNsZWVwIH0gZnJvbSAnLi91dGlscydcbmltcG9ydCB0eXBlIHsgQ2FuY2VsT3B0aW9ucywgTmV0d29ya01vZGUgfSBmcm9tICcuL3R5cGVzJ1xuXG4vLyBUWVBFU1xuXG5pbnRlcmZhY2UgUmV0cnllckNvbmZpZzxURGF0YSA9IHVua25vd24sIFRFcnJvciA9IHVua25vd24+IHtcbiAgZm46ICgpID0+IFREYXRhIHwgUHJvbWlzZTxURGF0YT5cbiAgYWJvcnQ/OiAoKSA9PiB2b2lkXG4gIG9uRXJyb3I/OiAoZXJyb3I6IFRFcnJvcikgPT4gdm9pZFxuICBvblN1Y2Nlc3M/OiAoZGF0YTogVERhdGEpID0+IHZvaWRcbiAgb25GYWlsPzogKGZhaWx1cmVDb3VudDogbnVtYmVyLCBlcnJvcjogVEVycm9yKSA9PiB2b2lkXG4gIG9uUGF1c2U/OiAoKSA9PiB2b2lkXG4gIG9uQ29udGludWU/OiAoKSA9PiB2b2lkXG4gIHJldHJ5PzogUmV0cnlWYWx1ZTxURXJyb3I+XG4gIHJldHJ5RGVsYXk/OiBSZXRyeURlbGF5VmFsdWU8VEVycm9yPlxuICBuZXR3b3JrTW9kZTogTmV0d29ya01vZGUgfCB1bmRlZmluZWRcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZXRyeWVyPFREYXRhID0gdW5rbm93bj4ge1xuICBwcm9taXNlOiBQcm9taXNlPFREYXRhPlxuICBjYW5jZWw6IChjYW5jZWxPcHRpb25zPzogQ2FuY2VsT3B0aW9ucykgPT4gdm9pZFxuICBjb250aW51ZTogKCkgPT4gUHJvbWlzZTx1bmtub3duPlxuICBjYW5jZWxSZXRyeTogKCkgPT4gdm9pZFxuICBjb250aW51ZVJldHJ5OiAoKSA9PiB2b2lkXG59XG5cbmV4cG9ydCB0eXBlIFJldHJ5VmFsdWU8VEVycm9yPiA9IGJvb2xlYW4gfCBudW1iZXIgfCBTaG91bGRSZXRyeUZ1bmN0aW9uPFRFcnJvcj5cblxudHlwZSBTaG91bGRSZXRyeUZ1bmN0aW9uPFRFcnJvcj4gPSAoXG4gIGZhaWx1cmVDb3VudDogbnVtYmVyLFxuICBlcnJvcjogVEVycm9yLFxuKSA9PiBib29sZWFuXG5cbmV4cG9ydCB0eXBlIFJldHJ5RGVsYXlWYWx1ZTxURXJyb3I+ID0gbnVtYmVyIHwgUmV0cnlEZWxheUZ1bmN0aW9uPFRFcnJvcj5cblxudHlwZSBSZXRyeURlbGF5RnVuY3Rpb248VEVycm9yID0gdW5rbm93bj4gPSAoXG4gIGZhaWx1cmVDb3VudDogbnVtYmVyLFxuICBlcnJvcjogVEVycm9yLFxuKSA9PiBudW1iZXJcblxuZnVuY3Rpb24gZGVmYXVsdFJldHJ5RGVsYXkoZmFpbHVyZUNvdW50OiBudW1iZXIpIHtcbiAgcmV0dXJuIE1hdGgubWluKDEwMDAgKiAyICoqIGZhaWx1cmVDb3VudCwgMzAwMDApXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjYW5GZXRjaChuZXR3b3JrTW9kZTogTmV0d29ya01vZGUgfCB1bmRlZmluZWQpOiBib29sZWFuIHtcbiAgcmV0dXJuIChuZXR3b3JrTW9kZSA/PyAnb25saW5lJykgPT09ICdvbmxpbmUnXG4gICAgPyBvbmxpbmVNYW5hZ2VyLmlzT25saW5lKClcbiAgICA6IHRydWVcbn1cblxuZXhwb3J0IGNsYXNzIENhbmNlbGxlZEVycm9yIHtcbiAgcmV2ZXJ0PzogYm9vbGVhblxuICBzaWxlbnQ/OiBib29sZWFuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM/OiBDYW5jZWxPcHRpb25zKSB7XG4gICAgdGhpcy5yZXZlcnQgPSBvcHRpb25zPy5yZXZlcnRcbiAgICB0aGlzLnNpbGVudCA9IG9wdGlvbnM/LnNpbGVudFxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0NhbmNlbGxlZEVycm9yKHZhbHVlOiBhbnkpOiB2YWx1ZSBpcyBDYW5jZWxsZWRFcnJvciB7XG4gIHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIENhbmNlbGxlZEVycm9yXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVSZXRyeWVyPFREYXRhID0gdW5rbm93biwgVEVycm9yID0gdW5rbm93bj4oXG4gIGNvbmZpZzogUmV0cnllckNvbmZpZzxURGF0YSwgVEVycm9yPixcbik6IFJldHJ5ZXI8VERhdGE+IHtcbiAgbGV0IGlzUmV0cnlDYW5jZWxsZWQgPSBmYWxzZVxuICBsZXQgZmFpbHVyZUNvdW50ID0gMFxuICBsZXQgaXNSZXNvbHZlZCA9IGZhbHNlXG4gIGxldCBjb250aW51ZUZuOiAoKHZhbHVlPzogdW5rbm93bikgPT4gYm9vbGVhbikgfCB1bmRlZmluZWRcbiAgbGV0IHByb21pc2VSZXNvbHZlOiAoZGF0YTogVERhdGEpID0+IHZvaWRcbiAgbGV0IHByb21pc2VSZWplY3Q6IChlcnJvcjogVEVycm9yKSA9PiB2b2lkXG5cbiAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlPFREYXRhPigob3V0ZXJSZXNvbHZlLCBvdXRlclJlamVjdCkgPT4ge1xuICAgIHByb21pc2VSZXNvbHZlID0gb3V0ZXJSZXNvbHZlXG4gICAgcHJvbWlzZVJlamVjdCA9IG91dGVyUmVqZWN0XG4gIH0pXG5cbiAgY29uc3QgY2FuY2VsID0gKGNhbmNlbE9wdGlvbnM/OiBDYW5jZWxPcHRpb25zKTogdm9pZCA9PiB7XG4gICAgaWYgKCFpc1Jlc29sdmVkKSB7XG4gICAgICByZWplY3QobmV3IENhbmNlbGxlZEVycm9yKGNhbmNlbE9wdGlvbnMpKVxuXG4gICAgICBjb25maWcuYWJvcnQ/LigpXG4gICAgfVxuICB9XG4gIGNvbnN0IGNhbmNlbFJldHJ5ID0gKCkgPT4ge1xuICAgIGlzUmV0cnlDYW5jZWxsZWQgPSB0cnVlXG4gIH1cblxuICBjb25zdCBjb250aW51ZVJldHJ5ID0gKCkgPT4ge1xuICAgIGlzUmV0cnlDYW5jZWxsZWQgPSBmYWxzZVxuICB9XG5cbiAgY29uc3Qgc2hvdWxkUGF1c2UgPSAoKSA9PlxuICAgICFmb2N1c01hbmFnZXIuaXNGb2N1c2VkKCkgfHxcbiAgICAoY29uZmlnLm5ldHdvcmtNb2RlICE9PSAnYWx3YXlzJyAmJiAhb25saW5lTWFuYWdlci5pc09ubGluZSgpKVxuXG4gIGNvbnN0IHJlc29sdmUgPSAodmFsdWU6IGFueSkgPT4ge1xuICAgIGlmICghaXNSZXNvbHZlZCkge1xuICAgICAgaXNSZXNvbHZlZCA9IHRydWVcbiAgICAgIGNvbmZpZy5vblN1Y2Nlc3M/Lih2YWx1ZSlcbiAgICAgIGNvbnRpbnVlRm4/LigpXG4gICAgICBwcm9taXNlUmVzb2x2ZSh2YWx1ZSlcbiAgICB9XG4gIH1cblxuICBjb25zdCByZWplY3QgPSAodmFsdWU6IGFueSkgPT4ge1xuICAgIGlmICghaXNSZXNvbHZlZCkge1xuICAgICAgaXNSZXNvbHZlZCA9IHRydWVcbiAgICAgIGNvbmZpZy5vbkVycm9yPy4odmFsdWUpXG4gICAgICBjb250aW51ZUZuPy4oKVxuICAgICAgcHJvbWlzZVJlamVjdCh2YWx1ZSlcbiAgICB9XG4gIH1cblxuICBjb25zdCBwYXVzZSA9ICgpID0+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKGNvbnRpbnVlUmVzb2x2ZSkgPT4ge1xuICAgICAgY29udGludWVGbiA9ICh2YWx1ZSkgPT4ge1xuICAgICAgICBjb25zdCBjYW5Db250aW51ZSA9IGlzUmVzb2x2ZWQgfHwgIXNob3VsZFBhdXNlKClcbiAgICAgICAgaWYgKGNhbkNvbnRpbnVlKSB7XG4gICAgICAgICAgY29udGludWVSZXNvbHZlKHZhbHVlKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjYW5Db250aW51ZVxuICAgICAgfVxuICAgICAgY29uZmlnLm9uUGF1c2U/LigpXG4gICAgfSkudGhlbigoKSA9PiB7XG4gICAgICBjb250aW51ZUZuID0gdW5kZWZpbmVkXG4gICAgICBpZiAoIWlzUmVzb2x2ZWQpIHtcbiAgICAgICAgY29uZmlnLm9uQ29udGludWU/LigpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIC8vIENyZWF0ZSBsb29wIGZ1bmN0aW9uXG4gIGNvbnN0IHJ1biA9ICgpID0+IHtcbiAgICAvLyBEbyBub3RoaW5nIGlmIGFscmVhZHkgcmVzb2x2ZWRcbiAgICBpZiAoaXNSZXNvbHZlZCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgbGV0IHByb21pc2VPclZhbHVlOiBhbnlcblxuICAgIC8vIEV4ZWN1dGUgcXVlcnlcbiAgICB0cnkge1xuICAgICAgcHJvbWlzZU9yVmFsdWUgPSBjb25maWcuZm4oKVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBwcm9taXNlT3JWYWx1ZSA9IFByb21pc2UucmVqZWN0KGVycm9yKVxuICAgIH1cblxuICAgIFByb21pc2UucmVzb2x2ZShwcm9taXNlT3JWYWx1ZSlcbiAgICAgIC50aGVuKHJlc29sdmUpXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIC8vIFN0b3AgaWYgdGhlIGZldGNoIGlzIGFscmVhZHkgcmVzb2x2ZWRcbiAgICAgICAgaWYgKGlzUmVzb2x2ZWQpIHtcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIERvIHdlIG5lZWQgdG8gcmV0cnkgdGhlIHJlcXVlc3Q/XG4gICAgICAgIGNvbnN0IHJldHJ5ID0gY29uZmlnLnJldHJ5ID8/IDNcbiAgICAgICAgY29uc3QgcmV0cnlEZWxheSA9IGNvbmZpZy5yZXRyeURlbGF5ID8/IGRlZmF1bHRSZXRyeURlbGF5XG4gICAgICAgIGNvbnN0IGRlbGF5ID1cbiAgICAgICAgICB0eXBlb2YgcmV0cnlEZWxheSA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICAgICAgPyByZXRyeURlbGF5KGZhaWx1cmVDb3VudCwgZXJyb3IpXG4gICAgICAgICAgICA6IHJldHJ5RGVsYXlcbiAgICAgICAgY29uc3Qgc2hvdWxkUmV0cnkgPVxuICAgICAgICAgIHJldHJ5ID09PSB0cnVlIHx8XG4gICAgICAgICAgKHR5cGVvZiByZXRyeSA9PT0gJ251bWJlcicgJiYgZmFpbHVyZUNvdW50IDwgcmV0cnkpIHx8XG4gICAgICAgICAgKHR5cGVvZiByZXRyeSA9PT0gJ2Z1bmN0aW9uJyAmJiByZXRyeShmYWlsdXJlQ291bnQsIGVycm9yKSlcblxuICAgICAgICBpZiAoaXNSZXRyeUNhbmNlbGxlZCB8fCAhc2hvdWxkUmV0cnkpIHtcbiAgICAgICAgICAvLyBXZSBhcmUgZG9uZSBpZiB0aGUgcXVlcnkgZG9lcyBub3QgbmVlZCB0byBiZSByZXRyaWVkXG4gICAgICAgICAgcmVqZWN0KGVycm9yKVxuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgZmFpbHVyZUNvdW50KytcblxuICAgICAgICAvLyBOb3RpZnkgb24gZmFpbFxuICAgICAgICBjb25maWcub25GYWlsPy4oZmFpbHVyZUNvdW50LCBlcnJvcilcblxuICAgICAgICAvLyBEZWxheVxuICAgICAgICBzbGVlcChkZWxheSlcbiAgICAgICAgICAvLyBQYXVzZSBpZiB0aGUgZG9jdW1lbnQgaXMgbm90IHZpc2libGUgb3Igd2hlbiB0aGUgZGV2aWNlIGlzIG9mZmxpbmVcbiAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBpZiAoc2hvdWxkUGF1c2UoKSkge1xuICAgICAgICAgICAgICByZXR1cm4gcGF1c2UoKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgfSlcbiAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBpZiAoaXNSZXRyeUNhbmNlbGxlZCkge1xuICAgICAgICAgICAgICByZWplY3QoZXJyb3IpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBydW4oKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICB9KVxuICB9XG5cbiAgLy8gU3RhcnQgbG9vcFxuICBpZiAoY2FuRmV0Y2goY29uZmlnLm5ldHdvcmtNb2RlKSkge1xuICAgIHJ1bigpXG4gIH0gZWxzZSB7XG4gICAgcGF1c2UoKS50aGVuKHJ1bilcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcHJvbWlzZSxcbiAgICBjYW5jZWwsXG4gICAgY29udGludWU6ICgpID0+IHtcbiAgICAgIGNvbnN0IGRpZENvbnRpbnVlID0gY29udGludWVGbj8uKClcbiAgICAgIHJldHVybiBkaWRDb250aW51ZSA/IHByb21pc2UgOiBQcm9taXNlLnJlc29sdmUoKVxuICAgIH0sXG4gICAgY2FuY2VsUmV0cnksXG4gICAgY29udGludWVSZXRyeSxcbiAgfVxufVxuIiwgImV4cG9ydCBpbnRlcmZhY2UgTG9nZ2VyIHtcbiAgbG9nOiBMb2dGdW5jdGlvblxuICB3YXJuOiBMb2dGdW5jdGlvblxuICBlcnJvcjogTG9nRnVuY3Rpb25cbn1cblxudHlwZSBMb2dGdW5jdGlvbiA9ICguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZFxuXG5leHBvcnQgY29uc3QgZGVmYXVsdExvZ2dlcjogTG9nZ2VyID0gY29uc29sZVxuIiwgImltcG9ydCB7IHNjaGVkdWxlTWljcm90YXNrIH0gZnJvbSAnLi91dGlscydcblxuLy8gVFlQRVNcblxudHlwZSBOb3RpZnlDYWxsYmFjayA9ICgpID0+IHZvaWRcblxudHlwZSBOb3RpZnlGdW5jdGlvbiA9IChjYWxsYmFjazogKCkgPT4gdm9pZCkgPT4gdm9pZFxuXG50eXBlIEJhdGNoTm90aWZ5RnVuY3Rpb24gPSAoY2FsbGJhY2s6ICgpID0+IHZvaWQpID0+IHZvaWRcblxudHlwZSBCYXRjaENhbGxzQ2FsbGJhY2s8VCBleHRlbmRzIHVua25vd25bXT4gPSAoLi4uYXJnczogVCkgPT4gdm9pZFxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTm90aWZ5TWFuYWdlcigpIHtcbiAgbGV0IHF1ZXVlOiBOb3RpZnlDYWxsYmFja1tdID0gW11cbiAgbGV0IHRyYW5zYWN0aW9ucyA9IDBcbiAgbGV0IG5vdGlmeUZuOiBOb3RpZnlGdW5jdGlvbiA9IChjYWxsYmFjaykgPT4ge1xuICAgIGNhbGxiYWNrKClcbiAgfVxuICBsZXQgYmF0Y2hOb3RpZnlGbjogQmF0Y2hOb3RpZnlGdW5jdGlvbiA9IChjYWxsYmFjazogKCkgPT4gdm9pZCkgPT4ge1xuICAgIGNhbGxiYWNrKClcbiAgfVxuXG4gIGNvbnN0IGJhdGNoID0gPFQ+KGNhbGxiYWNrOiAoKSA9PiBUKTogVCA9PiB7XG4gICAgbGV0IHJlc3VsdFxuICAgIHRyYW5zYWN0aW9ucysrXG4gICAgdHJ5IHtcbiAgICAgIHJlc3VsdCA9IGNhbGxiYWNrKClcbiAgICB9IGZpbmFsbHkge1xuICAgICAgdHJhbnNhY3Rpb25zLS1cbiAgICAgIGlmICghdHJhbnNhY3Rpb25zKSB7XG4gICAgICAgIGZsdXNoKClcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdFxuICB9XG5cbiAgY29uc3Qgc2NoZWR1bGUgPSAoY2FsbGJhY2s6IE5vdGlmeUNhbGxiYWNrKTogdm9pZCA9PiB7XG4gICAgaWYgKHRyYW5zYWN0aW9ucykge1xuICAgICAgcXVldWUucHVzaChjYWxsYmFjaylcbiAgICB9IGVsc2Uge1xuICAgICAgc2NoZWR1bGVNaWNyb3Rhc2soKCkgPT4ge1xuICAgICAgICBub3RpZnlGbihjYWxsYmFjaylcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFsbCBjYWxscyB0byB0aGUgd3JhcHBlZCBmdW5jdGlvbiB3aWxsIGJlIGJhdGNoZWQuXG4gICAqL1xuICBjb25zdCBiYXRjaENhbGxzID0gPFQgZXh0ZW5kcyB1bmtub3duW10+KFxuICAgIGNhbGxiYWNrOiBCYXRjaENhbGxzQ2FsbGJhY2s8VD4sXG4gICk6IEJhdGNoQ2FsbHNDYWxsYmFjazxUPiA9PiB7XG4gICAgcmV0dXJuICguLi5hcmdzKSA9PiB7XG4gICAgICBzY2hlZHVsZSgoKSA9PiB7XG4gICAgICAgIGNhbGxiYWNrKC4uLmFyZ3MpXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGZsdXNoID0gKCk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IG9yaWdpbmFsUXVldWUgPSBxdWV1ZVxuICAgIHF1ZXVlID0gW11cbiAgICBpZiAob3JpZ2luYWxRdWV1ZS5sZW5ndGgpIHtcbiAgICAgIHNjaGVkdWxlTWljcm90YXNrKCgpID0+IHtcbiAgICAgICAgYmF0Y2hOb3RpZnlGbigoKSA9PiB7XG4gICAgICAgICAgb3JpZ2luYWxRdWV1ZS5mb3JFYWNoKChjYWxsYmFjaykgPT4ge1xuICAgICAgICAgICAgbm90aWZ5Rm4oY2FsbGJhY2spXG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFVzZSB0aGlzIG1ldGhvZCB0byBzZXQgYSBjdXN0b20gbm90aWZ5IGZ1bmN0aW9uLlxuICAgKiBUaGlzIGNhbiBiZSB1c2VkIHRvIGZvciBleGFtcGxlIHdyYXAgbm90aWZpY2F0aW9ucyB3aXRoIGBSZWFjdC5hY3RgIHdoaWxlIHJ1bm5pbmcgdGVzdHMuXG4gICAqL1xuICBjb25zdCBzZXROb3RpZnlGdW5jdGlvbiA9IChmbjogTm90aWZ5RnVuY3Rpb24pID0+IHtcbiAgICBub3RpZnlGbiA9IGZuXG4gIH1cblxuICAvKipcbiAgICogVXNlIHRoaXMgbWV0aG9kIHRvIHNldCBhIGN1c3RvbSBmdW5jdGlvbiB0byBiYXRjaCBub3RpZmljYXRpb25zIHRvZ2V0aGVyIGludG8gYSBzaW5nbGUgdGljay5cbiAgICogQnkgZGVmYXVsdCBSZWFjdCBRdWVyeSB3aWxsIHVzZSB0aGUgYmF0Y2ggZnVuY3Rpb24gcHJvdmlkZWQgYnkgUmVhY3RET00gb3IgUmVhY3QgTmF0aXZlLlxuICAgKi9cbiAgY29uc3Qgc2V0QmF0Y2hOb3RpZnlGdW5jdGlvbiA9IChmbjogQmF0Y2hOb3RpZnlGdW5jdGlvbikgPT4ge1xuICAgIGJhdGNoTm90aWZ5Rm4gPSBmblxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBiYXRjaCxcbiAgICBiYXRjaENhbGxzLFxuICAgIHNjaGVkdWxlLFxuICAgIHNldE5vdGlmeUZ1bmN0aW9uLFxuICAgIHNldEJhdGNoTm90aWZ5RnVuY3Rpb24sXG4gIH0gYXMgY29uc3Rcbn1cblxuLy8gU0lOR0xFVE9OXG5leHBvcnQgY29uc3Qgbm90aWZ5TWFuYWdlciA9IGNyZWF0ZU5vdGlmeU1hbmFnZXIoKVxuIiwgImltcG9ydCB7IGlzU2VydmVyLCBpc1ZhbGlkVGltZW91dCB9IGZyb20gJy4vdXRpbHMnXG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBSZW1vdmFibGUge1xuICBjYWNoZVRpbWUhOiBudW1iZXJcbiAgcHJpdmF0ZSBnY1RpbWVvdXQ/OiBSZXR1cm5UeXBlPHR5cGVvZiBzZXRUaW1lb3V0PlxuXG4gIGRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5jbGVhckdjVGltZW91dCgpXG4gIH1cblxuICBwcm90ZWN0ZWQgc2NoZWR1bGVHYygpOiB2b2lkIHtcbiAgICB0aGlzLmNsZWFyR2NUaW1lb3V0KClcblxuICAgIGlmIChpc1ZhbGlkVGltZW91dCh0aGlzLmNhY2hlVGltZSkpIHtcbiAgICAgIHRoaXMuZ2NUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMub3B0aW9uYWxSZW1vdmUoKVxuICAgICAgfSwgdGhpcy5jYWNoZVRpbWUpXG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIHVwZGF0ZUNhY2hlVGltZShuZXdDYWNoZVRpbWU6IG51bWJlciB8IHVuZGVmaW5lZCk6IHZvaWQge1xuICAgIC8vIERlZmF1bHQgdG8gNSBtaW51dGVzIChJbmZpbml0eSBmb3Igc2VydmVyLXNpZGUpIGlmIG5vIGNhY2hlIHRpbWUgaXMgc2V0XG4gICAgdGhpcy5jYWNoZVRpbWUgPSBNYXRoLm1heChcbiAgICAgIHRoaXMuY2FjaGVUaW1lIHx8IDAsXG4gICAgICBuZXdDYWNoZVRpbWUgPz8gKGlzU2VydmVyID8gSW5maW5pdHkgOiA1ICogNjAgKiAxMDAwKSxcbiAgICApXG4gIH1cblxuICBwcm90ZWN0ZWQgY2xlYXJHY1RpbWVvdXQoKSB7XG4gICAgaWYgKHRoaXMuZ2NUaW1lb3V0KSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5nY1RpbWVvdXQpXG4gICAgICB0aGlzLmdjVGltZW91dCA9IHVuZGVmaW5lZFxuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBvcHRpb25hbFJlbW92ZSgpOiB2b2lkXG59XG4iLCAiaW1wb3J0IHsgZ2V0QWJvcnRDb250cm9sbGVyLCBub29wLCByZXBsYWNlRGF0YSwgdGltZVVudGlsU3RhbGUgfSBmcm9tICcuL3V0aWxzJ1xuaW1wb3J0IHsgZGVmYXVsdExvZ2dlciB9IGZyb20gJy4vbG9nZ2VyJ1xuaW1wb3J0IHsgbm90aWZ5TWFuYWdlciB9IGZyb20gJy4vbm90aWZ5TWFuYWdlcidcbmltcG9ydCB7IGNhbkZldGNoLCBjcmVhdGVSZXRyeWVyLCBpc0NhbmNlbGxlZEVycm9yIH0gZnJvbSAnLi9yZXRyeWVyJ1xuaW1wb3J0IHsgUmVtb3ZhYmxlIH0gZnJvbSAnLi9yZW1vdmFibGUnXG5pbXBvcnQgdHlwZSB7XG4gIENhbmNlbE9wdGlvbnMsXG4gIEZldGNoU3RhdHVzLFxuICBJbml0aWFsRGF0YUZ1bmN0aW9uLFxuICBRdWVyeUZ1bmN0aW9uQ29udGV4dCxcbiAgUXVlcnlLZXksXG4gIFF1ZXJ5TWV0YSxcbiAgUXVlcnlPcHRpb25zLFxuICBRdWVyeVN0YXR1cyxcbiAgU2V0RGF0YU9wdGlvbnMsXG59IGZyb20gJy4vdHlwZXMnXG5pbXBvcnQgdHlwZSB7IFF1ZXJ5Q2FjaGUgfSBmcm9tICcuL3F1ZXJ5Q2FjaGUnXG5pbXBvcnQgdHlwZSB7IFF1ZXJ5T2JzZXJ2ZXIgfSBmcm9tICcuL3F1ZXJ5T2JzZXJ2ZXInXG5pbXBvcnQgdHlwZSB7IExvZ2dlciB9IGZyb20gJy4vbG9nZ2VyJ1xuaW1wb3J0IHR5cGUgeyBSZXRyeWVyIH0gZnJvbSAnLi9yZXRyeWVyJ1xuXG4vLyBUWVBFU1xuXG5pbnRlcmZhY2UgUXVlcnlDb25maWc8XG4gIFRRdWVyeUZuRGF0YSxcbiAgVEVycm9yLFxuICBURGF0YSxcbiAgVFF1ZXJ5S2V5IGV4dGVuZHMgUXVlcnlLZXkgPSBRdWVyeUtleSxcbj4ge1xuICBjYWNoZTogUXVlcnlDYWNoZVxuICBxdWVyeUtleTogVFF1ZXJ5S2V5XG4gIHF1ZXJ5SGFzaDogc3RyaW5nXG4gIGxvZ2dlcj86IExvZ2dlclxuICBvcHRpb25zPzogUXVlcnlPcHRpb25zPFRRdWVyeUZuRGF0YSwgVEVycm9yLCBURGF0YSwgVFF1ZXJ5S2V5PlxuICBkZWZhdWx0T3B0aW9ucz86IFF1ZXJ5T3B0aW9uczxUUXVlcnlGbkRhdGEsIFRFcnJvciwgVERhdGEsIFRRdWVyeUtleT5cbiAgc3RhdGU/OiBRdWVyeVN0YXRlPFREYXRhLCBURXJyb3I+XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUXVlcnlTdGF0ZTxURGF0YSA9IHVua25vd24sIFRFcnJvciA9IHVua25vd24+IHtcbiAgZGF0YTogVERhdGEgfCB1bmRlZmluZWRcbiAgZGF0YVVwZGF0ZUNvdW50OiBudW1iZXJcbiAgZGF0YVVwZGF0ZWRBdDogbnVtYmVyXG4gIGVycm9yOiBURXJyb3IgfCBudWxsXG4gIGVycm9yVXBkYXRlQ291bnQ6IG51bWJlclxuICBlcnJvclVwZGF0ZWRBdDogbnVtYmVyXG4gIGZldGNoRmFpbHVyZUNvdW50OiBudW1iZXJcbiAgZmV0Y2hGYWlsdXJlUmVhc29uOiBURXJyb3IgfCBudWxsXG4gIGZldGNoTWV0YTogYW55XG4gIGlzSW52YWxpZGF0ZWQ6IGJvb2xlYW5cbiAgc3RhdHVzOiBRdWVyeVN0YXR1c1xuICBmZXRjaFN0YXR1czogRmV0Y2hTdGF0dXNcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGZXRjaENvbnRleHQ8XG4gIFRRdWVyeUZuRGF0YSxcbiAgVEVycm9yLFxuICBURGF0YSxcbiAgVFF1ZXJ5S2V5IGV4dGVuZHMgUXVlcnlLZXkgPSBRdWVyeUtleSxcbj4ge1xuICBmZXRjaEZuOiAoKSA9PiB1bmtub3duIHwgUHJvbWlzZTx1bmtub3duPlxuICBmZXRjaE9wdGlvbnM/OiBGZXRjaE9wdGlvbnNcbiAgc2lnbmFsPzogQWJvcnRTaWduYWxcbiAgb3B0aW9uczogUXVlcnlPcHRpb25zPFRRdWVyeUZuRGF0YSwgVEVycm9yLCBURGF0YSwgYW55PlxuICBxdWVyeUtleTogVFF1ZXJ5S2V5XG4gIHN0YXRlOiBRdWVyeVN0YXRlPFREYXRhLCBURXJyb3I+XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUXVlcnlCZWhhdmlvcjxcbiAgVFF1ZXJ5Rm5EYXRhID0gdW5rbm93bixcbiAgVEVycm9yID0gdW5rbm93bixcbiAgVERhdGEgPSBUUXVlcnlGbkRhdGEsXG4gIFRRdWVyeUtleSBleHRlbmRzIFF1ZXJ5S2V5ID0gUXVlcnlLZXksXG4+IHtcbiAgb25GZXRjaDogKFxuICAgIGNvbnRleHQ6IEZldGNoQ29udGV4dDxUUXVlcnlGbkRhdGEsIFRFcnJvciwgVERhdGEsIFRRdWVyeUtleT4sXG4gICkgPT4gdm9pZFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZldGNoT3B0aW9ucyB7XG4gIGNhbmNlbFJlZmV0Y2g/OiBib29sZWFuXG4gIG1ldGE/OiBhbnlcbn1cblxuaW50ZXJmYWNlIEZhaWxlZEFjdGlvbjxURXJyb3I+IHtcbiAgdHlwZTogJ2ZhaWxlZCdcbiAgZmFpbHVyZUNvdW50OiBudW1iZXJcbiAgZXJyb3I6IFRFcnJvclxufVxuXG5pbnRlcmZhY2UgRmV0Y2hBY3Rpb24ge1xuICB0eXBlOiAnZmV0Y2gnXG4gIG1ldGE/OiBhbnlcbn1cblxuaW50ZXJmYWNlIFN1Y2Nlc3NBY3Rpb248VERhdGE+IHtcbiAgZGF0YTogVERhdGEgfCB1bmRlZmluZWRcbiAgdHlwZTogJ3N1Y2Nlc3MnXG4gIGRhdGFVcGRhdGVkQXQ/OiBudW1iZXJcbiAgbWFudWFsPzogYm9vbGVhblxufVxuXG5pbnRlcmZhY2UgRXJyb3JBY3Rpb248VEVycm9yPiB7XG4gIHR5cGU6ICdlcnJvcidcbiAgZXJyb3I6IFRFcnJvclxufVxuXG5pbnRlcmZhY2UgSW52YWxpZGF0ZUFjdGlvbiB7XG4gIHR5cGU6ICdpbnZhbGlkYXRlJ1xufVxuXG5pbnRlcmZhY2UgUGF1c2VBY3Rpb24ge1xuICB0eXBlOiAncGF1c2UnXG59XG5cbmludGVyZmFjZSBDb250aW51ZUFjdGlvbiB7XG4gIHR5cGU6ICdjb250aW51ZSdcbn1cblxuaW50ZXJmYWNlIFNldFN0YXRlQWN0aW9uPFREYXRhLCBURXJyb3I+IHtcbiAgdHlwZTogJ3NldFN0YXRlJ1xuICBzdGF0ZTogUGFydGlhbDxRdWVyeVN0YXRlPFREYXRhLCBURXJyb3I+PlxuICBzZXRTdGF0ZU9wdGlvbnM/OiBTZXRTdGF0ZU9wdGlvbnNcbn1cblxuZXhwb3J0IHR5cGUgQWN0aW9uPFREYXRhLCBURXJyb3I+ID1cbiAgfCBDb250aW51ZUFjdGlvblxuICB8IEVycm9yQWN0aW9uPFRFcnJvcj5cbiAgfCBGYWlsZWRBY3Rpb248VEVycm9yPlxuICB8IEZldGNoQWN0aW9uXG4gIHwgSW52YWxpZGF0ZUFjdGlvblxuICB8IFBhdXNlQWN0aW9uXG4gIHwgU2V0U3RhdGVBY3Rpb248VERhdGEsIFRFcnJvcj5cbiAgfCBTdWNjZXNzQWN0aW9uPFREYXRhPlxuXG5leHBvcnQgaW50ZXJmYWNlIFNldFN0YXRlT3B0aW9ucyB7XG4gIG1ldGE/OiBhbnlcbn1cblxuLy8gQ0xBU1NcblxuZXhwb3J0IGNsYXNzIFF1ZXJ5PFxuICBUUXVlcnlGbkRhdGEgPSB1bmtub3duLFxuICBURXJyb3IgPSB1bmtub3duLFxuICBURGF0YSA9IFRRdWVyeUZuRGF0YSxcbiAgVFF1ZXJ5S2V5IGV4dGVuZHMgUXVlcnlLZXkgPSBRdWVyeUtleSxcbj4gZXh0ZW5kcyBSZW1vdmFibGUge1xuICBxdWVyeUtleTogVFF1ZXJ5S2V5XG4gIHF1ZXJ5SGFzaDogc3RyaW5nXG4gIG9wdGlvbnMhOiBRdWVyeU9wdGlvbnM8VFF1ZXJ5Rm5EYXRhLCBURXJyb3IsIFREYXRhLCBUUXVlcnlLZXk+XG4gIGluaXRpYWxTdGF0ZTogUXVlcnlTdGF0ZTxURGF0YSwgVEVycm9yPlxuICByZXZlcnRTdGF0ZT86IFF1ZXJ5U3RhdGU8VERhdGEsIFRFcnJvcj5cbiAgc3RhdGU6IFF1ZXJ5U3RhdGU8VERhdGEsIFRFcnJvcj5cbiAgaXNGZXRjaGluZ09wdGltaXN0aWM/OiBib29sZWFuXG5cbiAgcHJpdmF0ZSBjYWNoZTogUXVlcnlDYWNoZVxuICBwcml2YXRlIGxvZ2dlcjogTG9nZ2VyXG4gIHByaXZhdGUgcHJvbWlzZT86IFByb21pc2U8VERhdGE+XG4gIHByaXZhdGUgcmV0cnllcj86IFJldHJ5ZXI8VERhdGE+XG4gIHByaXZhdGUgb2JzZXJ2ZXJzOiBRdWVyeU9ic2VydmVyPGFueSwgYW55LCBhbnksIGFueSwgYW55PltdXG4gIHByaXZhdGUgZGVmYXVsdE9wdGlvbnM/OiBRdWVyeU9wdGlvbnM8VFF1ZXJ5Rm5EYXRhLCBURXJyb3IsIFREYXRhLCBUUXVlcnlLZXk+XG4gIHByaXZhdGUgYWJvcnRTaWduYWxDb25zdW1lZDogYm9vbGVhblxuXG4gIGNvbnN0cnVjdG9yKGNvbmZpZzogUXVlcnlDb25maWc8VFF1ZXJ5Rm5EYXRhLCBURXJyb3IsIFREYXRhLCBUUXVlcnlLZXk+KSB7XG4gICAgc3VwZXIoKVxuXG4gICAgdGhpcy5hYm9ydFNpZ25hbENvbnN1bWVkID0gZmFsc2VcbiAgICB0aGlzLmRlZmF1bHRPcHRpb25zID0gY29uZmlnLmRlZmF1bHRPcHRpb25zXG4gICAgdGhpcy5zZXRPcHRpb25zKGNvbmZpZy5vcHRpb25zKVxuICAgIHRoaXMub2JzZXJ2ZXJzID0gW11cbiAgICB0aGlzLmNhY2hlID0gY29uZmlnLmNhY2hlXG4gICAgdGhpcy5sb2dnZXIgPSBjb25maWcubG9nZ2VyIHx8IGRlZmF1bHRMb2dnZXJcbiAgICB0aGlzLnF1ZXJ5S2V5ID0gY29uZmlnLnF1ZXJ5S2V5XG4gICAgdGhpcy5xdWVyeUhhc2ggPSBjb25maWcucXVlcnlIYXNoXG4gICAgdGhpcy5pbml0aWFsU3RhdGUgPSBjb25maWcuc3RhdGUgfHwgZ2V0RGVmYXVsdFN0YXRlKHRoaXMub3B0aW9ucylcbiAgICB0aGlzLnN0YXRlID0gdGhpcy5pbml0aWFsU3RhdGVcbiAgICB0aGlzLnNjaGVkdWxlR2MoKVxuICB9XG5cbiAgZ2V0IG1ldGEoKTogUXVlcnlNZXRhIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLm1ldGFcbiAgfVxuXG4gIHByaXZhdGUgc2V0T3B0aW9ucyhcbiAgICBvcHRpb25zPzogUXVlcnlPcHRpb25zPFRRdWVyeUZuRGF0YSwgVEVycm9yLCBURGF0YSwgVFF1ZXJ5S2V5PixcbiAgKTogdm9pZCB7XG4gICAgdGhpcy5vcHRpb25zID0geyAuLi50aGlzLmRlZmF1bHRPcHRpb25zLCAuLi5vcHRpb25zIH1cblxuICAgIHRoaXMudXBkYXRlQ2FjaGVUaW1lKHRoaXMub3B0aW9ucy5jYWNoZVRpbWUpXG4gIH1cblxuICBwcm90ZWN0ZWQgb3B0aW9uYWxSZW1vdmUoKSB7XG4gICAgaWYgKCF0aGlzLm9ic2VydmVycy5sZW5ndGggJiYgdGhpcy5zdGF0ZS5mZXRjaFN0YXR1cyA9PT0gJ2lkbGUnKSB7XG4gICAgICB0aGlzLmNhY2hlLnJlbW92ZSh0aGlzKVxuICAgIH1cbiAgfVxuXG4gIHNldERhdGEoXG4gICAgbmV3RGF0YTogVERhdGEsXG4gICAgb3B0aW9ucz86IFNldERhdGFPcHRpb25zICYgeyBtYW51YWw6IGJvb2xlYW4gfSxcbiAgKTogVERhdGEge1xuICAgIGNvbnN0IGRhdGEgPSByZXBsYWNlRGF0YSh0aGlzLnN0YXRlLmRhdGEsIG5ld0RhdGEsIHRoaXMub3B0aW9ucylcblxuICAgIC8vIFNldCBkYXRhIGFuZCBtYXJrIGl0IGFzIGNhY2hlZFxuICAgIHRoaXMuZGlzcGF0Y2goe1xuICAgICAgZGF0YSxcbiAgICAgIHR5cGU6ICdzdWNjZXNzJyxcbiAgICAgIGRhdGFVcGRhdGVkQXQ6IG9wdGlvbnM/LnVwZGF0ZWRBdCxcbiAgICAgIG1hbnVhbDogb3B0aW9ucz8ubWFudWFsLFxuICAgIH0pXG5cbiAgICByZXR1cm4gZGF0YVxuICB9XG5cbiAgc2V0U3RhdGUoXG4gICAgc3RhdGU6IFBhcnRpYWw8UXVlcnlTdGF0ZTxURGF0YSwgVEVycm9yPj4sXG4gICAgc2V0U3RhdGVPcHRpb25zPzogU2V0U3RhdGVPcHRpb25zLFxuICApOiB2b2lkIHtcbiAgICB0aGlzLmRpc3BhdGNoKHsgdHlwZTogJ3NldFN0YXRlJywgc3RhdGUsIHNldFN0YXRlT3B0aW9ucyB9KVxuICB9XG5cbiAgY2FuY2VsKG9wdGlvbnM/OiBDYW5jZWxPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgcHJvbWlzZSA9IHRoaXMucHJvbWlzZVxuICAgIHRoaXMucmV0cnllcj8uY2FuY2VsKG9wdGlvbnMpXG4gICAgcmV0dXJuIHByb21pc2UgPyBwcm9taXNlLnRoZW4obm9vcCkuY2F0Y2gobm9vcCkgOiBQcm9taXNlLnJlc29sdmUoKVxuICB9XG5cbiAgZGVzdHJveSgpOiB2b2lkIHtcbiAgICBzdXBlci5kZXN0cm95KClcblxuICAgIHRoaXMuY2FuY2VsKHsgc2lsZW50OiB0cnVlIH0pXG4gIH1cblxuICByZXNldCgpOiB2b2lkIHtcbiAgICB0aGlzLmRlc3Ryb3koKVxuICAgIHRoaXMuc2V0U3RhdGUodGhpcy5pbml0aWFsU3RhdGUpXG4gIH1cblxuICBpc0FjdGl2ZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5vYnNlcnZlcnMuc29tZSgob2JzZXJ2ZXIpID0+IG9ic2VydmVyLm9wdGlvbnMuZW5hYmxlZCAhPT0gZmFsc2UpXG4gIH1cblxuICBpc0Rpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmdldE9ic2VydmVyc0NvdW50KCkgPiAwICYmICF0aGlzLmlzQWN0aXZlKClcbiAgfVxuXG4gIGlzU3RhbGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuc3RhdGUuaXNJbnZhbGlkYXRlZCB8fFxuICAgICAgIXRoaXMuc3RhdGUuZGF0YVVwZGF0ZWRBdCB8fFxuICAgICAgdGhpcy5vYnNlcnZlcnMuc29tZSgob2JzZXJ2ZXIpID0+IG9ic2VydmVyLmdldEN1cnJlbnRSZXN1bHQoKS5pc1N0YWxlKVxuICAgIClcbiAgfVxuXG4gIGlzU3RhbGVCeVRpbWUoc3RhbGVUaW1lID0gMCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLnN0YXRlLmlzSW52YWxpZGF0ZWQgfHxcbiAgICAgICF0aGlzLnN0YXRlLmRhdGFVcGRhdGVkQXQgfHxcbiAgICAgICF0aW1lVW50aWxTdGFsZSh0aGlzLnN0YXRlLmRhdGFVcGRhdGVkQXQsIHN0YWxlVGltZSlcbiAgICApXG4gIH1cblxuICBvbkZvY3VzKCk6IHZvaWQge1xuICAgIGNvbnN0IG9ic2VydmVyID0gdGhpcy5vYnNlcnZlcnMuZmluZCgoeCkgPT4geC5zaG91bGRGZXRjaE9uV2luZG93Rm9jdXMoKSlcblxuICAgIGlmIChvYnNlcnZlcikge1xuICAgICAgb2JzZXJ2ZXIucmVmZXRjaCh7IGNhbmNlbFJlZmV0Y2g6IGZhbHNlIH0pXG4gICAgfVxuXG4gICAgLy8gQ29udGludWUgZmV0Y2ggaWYgY3VycmVudGx5IHBhdXNlZFxuICAgIHRoaXMucmV0cnllcj8uY29udGludWUoKVxuICB9XG5cbiAgb25PbmxpbmUoKTogdm9pZCB7XG4gICAgY29uc3Qgb2JzZXJ2ZXIgPSB0aGlzLm9ic2VydmVycy5maW5kKCh4KSA9PiB4LnNob3VsZEZldGNoT25SZWNvbm5lY3QoKSlcblxuICAgIGlmIChvYnNlcnZlcikge1xuICAgICAgb2JzZXJ2ZXIucmVmZXRjaCh7IGNhbmNlbFJlZmV0Y2g6IGZhbHNlIH0pXG4gICAgfVxuXG4gICAgLy8gQ29udGludWUgZmV0Y2ggaWYgY3VycmVudGx5IHBhdXNlZFxuICAgIHRoaXMucmV0cnllcj8uY29udGludWUoKVxuICB9XG5cbiAgYWRkT2JzZXJ2ZXIob2JzZXJ2ZXI6IFF1ZXJ5T2JzZXJ2ZXI8YW55LCBhbnksIGFueSwgYW55LCBhbnk+KTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLm9ic2VydmVycy5pbmNsdWRlcyhvYnNlcnZlcikpIHtcbiAgICAgIHRoaXMub2JzZXJ2ZXJzLnB1c2gob2JzZXJ2ZXIpXG5cbiAgICAgIC8vIFN0b3AgdGhlIHF1ZXJ5IGZyb20gYmVpbmcgZ2FyYmFnZSBjb2xsZWN0ZWRcbiAgICAgIHRoaXMuY2xlYXJHY1RpbWVvdXQoKVxuXG4gICAgICB0aGlzLmNhY2hlLm5vdGlmeSh7IHR5cGU6ICdvYnNlcnZlckFkZGVkJywgcXVlcnk6IHRoaXMsIG9ic2VydmVyIH0pXG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlT2JzZXJ2ZXIob2JzZXJ2ZXI6IFF1ZXJ5T2JzZXJ2ZXI8YW55LCBhbnksIGFueSwgYW55LCBhbnk+KTogdm9pZCB7XG4gICAgaWYgKHRoaXMub2JzZXJ2ZXJzLmluY2x1ZGVzKG9ic2VydmVyKSkge1xuICAgICAgdGhpcy5vYnNlcnZlcnMgPSB0aGlzLm9ic2VydmVycy5maWx0ZXIoKHgpID0+IHggIT09IG9ic2VydmVyKVxuXG4gICAgICBpZiAoIXRoaXMub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgICAvLyBJZiB0aGUgdHJhbnNwb3J0IGxheWVyIGRvZXMgbm90IHN1cHBvcnQgY2FuY2VsbGF0aW9uXG4gICAgICAgIC8vIHdlJ2xsIGxldCB0aGUgcXVlcnkgY29udGludWUgc28gdGhlIHJlc3VsdCBjYW4gYmUgY2FjaGVkXG4gICAgICAgIGlmICh0aGlzLnJldHJ5ZXIpIHtcbiAgICAgICAgICBpZiAodGhpcy5hYm9ydFNpZ25hbENvbnN1bWVkKSB7XG4gICAgICAgICAgICB0aGlzLnJldHJ5ZXIuY2FuY2VsKHsgcmV2ZXJ0OiB0cnVlIH0pXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmV0cnllci5jYW5jZWxSZXRyeSgpXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zY2hlZHVsZUdjKClcbiAgICAgIH1cblxuICAgICAgdGhpcy5jYWNoZS5ub3RpZnkoeyB0eXBlOiAnb2JzZXJ2ZXJSZW1vdmVkJywgcXVlcnk6IHRoaXMsIG9ic2VydmVyIH0pXG4gICAgfVxuICB9XG5cbiAgZ2V0T2JzZXJ2ZXJzQ291bnQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5vYnNlcnZlcnMubGVuZ3RoXG4gIH1cblxuICBpbnZhbGlkYXRlKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5zdGF0ZS5pc0ludmFsaWRhdGVkKSB7XG4gICAgICB0aGlzLmRpc3BhdGNoKHsgdHlwZTogJ2ludmFsaWRhdGUnIH0pXG4gICAgfVxuICB9XG5cbiAgZmV0Y2goXG4gICAgb3B0aW9ucz86IFF1ZXJ5T3B0aW9uczxUUXVlcnlGbkRhdGEsIFRFcnJvciwgVERhdGEsIFRRdWVyeUtleT4sXG4gICAgZmV0Y2hPcHRpb25zPzogRmV0Y2hPcHRpb25zLFxuICApOiBQcm9taXNlPFREYXRhPiB7XG4gICAgaWYgKHRoaXMuc3RhdGUuZmV0Y2hTdGF0dXMgIT09ICdpZGxlJykge1xuICAgICAgaWYgKHRoaXMuc3RhdGUuZGF0YVVwZGF0ZWRBdCAmJiBmZXRjaE9wdGlvbnM/LmNhbmNlbFJlZmV0Y2gpIHtcbiAgICAgICAgLy8gU2lsZW50bHkgY2FuY2VsIGN1cnJlbnQgZmV0Y2ggaWYgdGhlIHVzZXIgd2FudHMgdG8gY2FuY2VsIHJlZmV0Y2hlc1xuICAgICAgICB0aGlzLmNhbmNlbCh7IHNpbGVudDogdHJ1ZSB9KVxuICAgICAgfSBlbHNlIGlmICh0aGlzLnByb21pc2UpIHtcbiAgICAgICAgLy8gbWFrZSBzdXJlIHRoYXQgcmV0cmllcyB0aGF0IHdlcmUgcG90ZW50aWFsbHkgY2FuY2VsbGVkIGR1ZSB0byB1bm1vdW50cyBjYW4gY29udGludWVcbiAgICAgICAgdGhpcy5yZXRyeWVyPy5jb250aW51ZVJldHJ5KClcbiAgICAgICAgLy8gUmV0dXJuIGN1cnJlbnQgcHJvbWlzZSBpZiB3ZSBhcmUgYWxyZWFkeSBmZXRjaGluZ1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9taXNlXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gVXBkYXRlIGNvbmZpZyBpZiBwYXNzZWQsIG90aGVyd2lzZSB0aGUgY29uZmlnIGZyb20gdGhlIGxhc3QgZXhlY3V0aW9uIGlzIHVzZWRcbiAgICBpZiAob3B0aW9ucykge1xuICAgICAgdGhpcy5zZXRPcHRpb25zKG9wdGlvbnMpXG4gICAgfVxuXG4gICAgLy8gVXNlIHRoZSBvcHRpb25zIGZyb20gdGhlIGZpcnN0IG9ic2VydmVyIHdpdGggYSBxdWVyeSBmdW5jdGlvbiBpZiBubyBmdW5jdGlvbiBpcyBmb3VuZC5cbiAgICAvLyBUaGlzIGNhbiBoYXBwZW4gd2hlbiB0aGUgcXVlcnkgaXMgaHlkcmF0ZWQgb3IgY3JlYXRlZCB3aXRoIHNldFF1ZXJ5RGF0YS5cbiAgICBpZiAoIXRoaXMub3B0aW9ucy5xdWVyeUZuKSB7XG4gICAgICBjb25zdCBvYnNlcnZlciA9IHRoaXMub2JzZXJ2ZXJzLmZpbmQoKHgpID0+IHgub3B0aW9ucy5xdWVyeUZuKVxuICAgICAgaWYgKG9ic2VydmVyKSB7XG4gICAgICAgIHRoaXMuc2V0T3B0aW9ucyhvYnNlcnZlci5vcHRpb25zKVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBpZiAoIUFycmF5LmlzQXJyYXkodGhpcy5vcHRpb25zLnF1ZXJ5S2V5KSkge1xuICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcihcbiAgICAgICAgICBgQXMgb2YgdjQsIHF1ZXJ5S2V5IG5lZWRzIHRvIGJlIGFuIEFycmF5LiBJZiB5b3UgYXJlIHVzaW5nIGEgc3RyaW5nIGxpa2UgJ3JlcG9EYXRhJywgcGxlYXNlIGNoYW5nZSBpdCB0byBhbiBBcnJheSwgZS5nLiBbJ3JlcG9EYXRhJ11gLFxuICAgICAgICApXG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgYWJvcnRDb250cm9sbGVyID0gZ2V0QWJvcnRDb250cm9sbGVyKClcblxuICAgIC8vIENyZWF0ZSBxdWVyeSBmdW5jdGlvbiBjb250ZXh0XG4gICAgY29uc3QgcXVlcnlGbkNvbnRleHQ6IFF1ZXJ5RnVuY3Rpb25Db250ZXh0PFRRdWVyeUtleT4gPSB7XG4gICAgICBxdWVyeUtleTogdGhpcy5xdWVyeUtleSxcbiAgICAgIHBhZ2VQYXJhbTogdW5kZWZpbmVkLFxuICAgICAgbWV0YTogdGhpcy5tZXRhLFxuICAgIH1cblxuICAgIC8vIEFkZHMgYW4gZW51bWVyYWJsZSBzaWduYWwgcHJvcGVydHkgdG8gdGhlIG9iamVjdCB0aGF0XG4gICAgLy8gd2hpY2ggc2V0cyBhYm9ydFNpZ25hbENvbnN1bWVkIHRvIHRydWUgd2hlbiB0aGUgc2lnbmFsXG4gICAgLy8gaXMgcmVhZC5cbiAgICBjb25zdCBhZGRTaWduYWxQcm9wZXJ0eSA9IChvYmplY3Q6IHVua25vd24pID0+IHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmplY3QsICdzaWduYWwnLCB7XG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGdldDogKCkgPT4ge1xuICAgICAgICAgIGlmIChhYm9ydENvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgIHRoaXMuYWJvcnRTaWduYWxDb25zdW1lZCA9IHRydWVcbiAgICAgICAgICAgIHJldHVybiBhYm9ydENvbnRyb2xsZXIuc2lnbmFsXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB1bmRlZmluZWRcbiAgICAgICAgfSxcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgYWRkU2lnbmFsUHJvcGVydHkocXVlcnlGbkNvbnRleHQpXG5cbiAgICAvLyBDcmVhdGUgZmV0Y2ggZnVuY3Rpb25cbiAgICBjb25zdCBmZXRjaEZuID0gKCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLm9wdGlvbnMucXVlcnlGbikge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoXG4gICAgICAgICAgYE1pc3NpbmcgcXVlcnlGbiBmb3IgcXVlcnlLZXkgJyR7dGhpcy5vcHRpb25zLnF1ZXJ5SGFzaH0nYCxcbiAgICAgICAgKVxuICAgICAgfVxuICAgICAgdGhpcy5hYm9ydFNpZ25hbENvbnN1bWVkID0gZmFsc2VcbiAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMucXVlcnlGbihxdWVyeUZuQ29udGV4dClcbiAgICB9XG5cbiAgICAvLyBUcmlnZ2VyIGJlaGF2aW9yIGhvb2tcbiAgICBjb25zdCBjb250ZXh0OiBGZXRjaENvbnRleHQ8VFF1ZXJ5Rm5EYXRhLCBURXJyb3IsIFREYXRhLCBUUXVlcnlLZXk+ID0ge1xuICAgICAgZmV0Y2hPcHRpb25zLFxuICAgICAgb3B0aW9uczogdGhpcy5vcHRpb25zLFxuICAgICAgcXVlcnlLZXk6IHRoaXMucXVlcnlLZXksXG4gICAgICBzdGF0ZTogdGhpcy5zdGF0ZSxcbiAgICAgIGZldGNoRm4sXG4gICAgfVxuXG4gICAgYWRkU2lnbmFsUHJvcGVydHkoY29udGV4dClcblxuICAgIHRoaXMub3B0aW9ucy5iZWhhdmlvcj8ub25GZXRjaChjb250ZXh0KVxuXG4gICAgLy8gU3RvcmUgc3RhdGUgaW4gY2FzZSB0aGUgY3VycmVudCBmZXRjaCBuZWVkcyB0byBiZSByZXZlcnRlZFxuICAgIHRoaXMucmV2ZXJ0U3RhdGUgPSB0aGlzLnN0YXRlXG5cbiAgICAvLyBTZXQgdG8gZmV0Y2hpbmcgc3RhdGUgaWYgbm90IGFscmVhZHkgaW4gaXRcbiAgICBpZiAoXG4gICAgICB0aGlzLnN0YXRlLmZldGNoU3RhdHVzID09PSAnaWRsZScgfHxcbiAgICAgIHRoaXMuc3RhdGUuZmV0Y2hNZXRhICE9PSBjb250ZXh0LmZldGNoT3B0aW9ucz8ubWV0YVxuICAgICkge1xuICAgICAgdGhpcy5kaXNwYXRjaCh7IHR5cGU6ICdmZXRjaCcsIG1ldGE6IGNvbnRleHQuZmV0Y2hPcHRpb25zPy5tZXRhIH0pXG4gICAgfVxuXG4gICAgY29uc3Qgb25FcnJvciA9IChlcnJvcjogVEVycm9yIHwgeyBzaWxlbnQ/OiBib29sZWFuIH0pID0+IHtcbiAgICAgIC8vIE9wdGltaXN0aWNhbGx5IHVwZGF0ZSBzdGF0ZSBpZiBuZWVkZWRcbiAgICAgIGlmICghKGlzQ2FuY2VsbGVkRXJyb3IoZXJyb3IpICYmIGVycm9yLnNpbGVudCkpIHtcbiAgICAgICAgdGhpcy5kaXNwYXRjaCh7XG4gICAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgICBlcnJvcjogZXJyb3IgYXMgVEVycm9yLFxuICAgICAgICB9KVxuICAgICAgfVxuXG4gICAgICBpZiAoIWlzQ2FuY2VsbGVkRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgIC8vIE5vdGlmeSBjYWNoZSBjYWxsYmFja1xuICAgICAgICB0aGlzLmNhY2hlLmNvbmZpZy5vbkVycm9yPy4oZXJyb3IsIHRoaXMgYXMgUXVlcnk8YW55LCBhbnksIGFueSwgYW55PilcbiAgICAgICAgdGhpcy5jYWNoZS5jb25maWcub25TZXR0bGVkPy4oXG4gICAgICAgICAgdGhpcy5zdGF0ZS5kYXRhLFxuICAgICAgICAgIGVycm9yLFxuICAgICAgICAgIHRoaXMgYXMgUXVlcnk8YW55LCBhbnksIGFueSwgYW55PixcbiAgICAgICAgKVxuXG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoZXJyb3IpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCF0aGlzLmlzRmV0Y2hpbmdPcHRpbWlzdGljKSB7XG4gICAgICAgIC8vIFNjaGVkdWxlIHF1ZXJ5IGdjIGFmdGVyIGZldGNoaW5nXG4gICAgICAgIHRoaXMuc2NoZWR1bGVHYygpXG4gICAgICB9XG4gICAgICB0aGlzLmlzRmV0Y2hpbmdPcHRpbWlzdGljID0gZmFsc2VcbiAgICB9XG5cbiAgICAvLyBUcnkgdG8gZmV0Y2ggdGhlIGRhdGFcbiAgICB0aGlzLnJldHJ5ZXIgPSBjcmVhdGVSZXRyeWVyKHtcbiAgICAgIGZuOiBjb250ZXh0LmZldGNoRm4gYXMgKCkgPT4gVERhdGEsXG4gICAgICBhYm9ydDogYWJvcnRDb250cm9sbGVyPy5hYm9ydC5iaW5kKGFib3J0Q29udHJvbGxlciksXG4gICAgICBvblN1Y2Nlc3M6IChkYXRhKSA9PiB7XG4gICAgICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoXG4gICAgICAgICAgICAgIGBRdWVyeSBkYXRhIGNhbm5vdCBiZSB1bmRlZmluZWQuIFBsZWFzZSBtYWtlIHN1cmUgdG8gcmV0dXJuIGEgdmFsdWUgb3RoZXIgdGhhbiB1bmRlZmluZWQgZnJvbSB5b3VyIHF1ZXJ5IGZ1bmN0aW9uLiBBZmZlY3RlZCBxdWVyeSBrZXk6ICR7dGhpcy5xdWVyeUhhc2h9YCxcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9XG4gICAgICAgICAgb25FcnJvcihuZXcgRXJyb3IoYCR7dGhpcy5xdWVyeUhhc2h9IGRhdGEgaXMgdW5kZWZpbmVkYCkgYXMgYW55KVxuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXREYXRhKGRhdGEgYXMgVERhdGEpXG5cbiAgICAgICAgLy8gTm90aWZ5IGNhY2hlIGNhbGxiYWNrXG4gICAgICAgIHRoaXMuY2FjaGUuY29uZmlnLm9uU3VjY2Vzcz8uKGRhdGEsIHRoaXMgYXMgUXVlcnk8YW55LCBhbnksIGFueSwgYW55PilcbiAgICAgICAgdGhpcy5jYWNoZS5jb25maWcub25TZXR0bGVkPy4oXG4gICAgICAgICAgZGF0YSxcbiAgICAgICAgICB0aGlzLnN0YXRlLmVycm9yLFxuICAgICAgICAgIHRoaXMgYXMgUXVlcnk8YW55LCBhbnksIGFueSwgYW55PixcbiAgICAgICAgKVxuXG4gICAgICAgIGlmICghdGhpcy5pc0ZldGNoaW5nT3B0aW1pc3RpYykge1xuICAgICAgICAgIC8vIFNjaGVkdWxlIHF1ZXJ5IGdjIGFmdGVyIGZldGNoaW5nXG4gICAgICAgICAgdGhpcy5zY2hlZHVsZUdjKClcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmlzRmV0Y2hpbmdPcHRpbWlzdGljID0gZmFsc2VcbiAgICAgIH0sXG4gICAgICBvbkVycm9yLFxuICAgICAgb25GYWlsOiAoZmFpbHVyZUNvdW50LCBlcnJvcikgPT4ge1xuICAgICAgICB0aGlzLmRpc3BhdGNoKHsgdHlwZTogJ2ZhaWxlZCcsIGZhaWx1cmVDb3VudCwgZXJyb3IgfSlcbiAgICAgIH0sXG4gICAgICBvblBhdXNlOiAoKSA9PiB7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2goeyB0eXBlOiAncGF1c2UnIH0pXG4gICAgICB9LFxuICAgICAgb25Db250aW51ZTogKCkgPT4ge1xuICAgICAgICB0aGlzLmRpc3BhdGNoKHsgdHlwZTogJ2NvbnRpbnVlJyB9KVxuICAgICAgfSxcbiAgICAgIHJldHJ5OiBjb250ZXh0Lm9wdGlvbnMucmV0cnksXG4gICAgICByZXRyeURlbGF5OiBjb250ZXh0Lm9wdGlvbnMucmV0cnlEZWxheSxcbiAgICAgIG5ldHdvcmtNb2RlOiBjb250ZXh0Lm9wdGlvbnMubmV0d29ya01vZGUsXG4gICAgfSlcblxuICAgIHRoaXMucHJvbWlzZSA9IHRoaXMucmV0cnllci5wcm9taXNlXG5cbiAgICByZXR1cm4gdGhpcy5wcm9taXNlXG4gIH1cblxuICBwcml2YXRlIGRpc3BhdGNoKGFjdGlvbjogQWN0aW9uPFREYXRhLCBURXJyb3I+KTogdm9pZCB7XG4gICAgY29uc3QgcmVkdWNlciA9IChcbiAgICAgIHN0YXRlOiBRdWVyeVN0YXRlPFREYXRhLCBURXJyb3I+LFxuICAgICk6IFF1ZXJ5U3RhdGU8VERhdGEsIFRFcnJvcj4gPT4ge1xuICAgICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlICdmYWlsZWQnOlxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICAgIGZldGNoRmFpbHVyZUNvdW50OiBhY3Rpb24uZmFpbHVyZUNvdW50LFxuICAgICAgICAgICAgZmV0Y2hGYWlsdXJlUmVhc29uOiBhY3Rpb24uZXJyb3IsXG4gICAgICAgICAgfVxuICAgICAgICBjYXNlICdwYXVzZSc6XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgICAgZmV0Y2hTdGF0dXM6ICdwYXVzZWQnLFxuICAgICAgICAgIH1cbiAgICAgICAgY2FzZSAnY29udGludWUnOlxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICAgIGZldGNoU3RhdHVzOiAnZmV0Y2hpbmcnLFxuICAgICAgICAgIH1cbiAgICAgICAgY2FzZSAnZmV0Y2gnOlxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICAgIGZldGNoRmFpbHVyZUNvdW50OiAwLFxuICAgICAgICAgICAgZmV0Y2hGYWlsdXJlUmVhc29uOiBudWxsLFxuICAgICAgICAgICAgZmV0Y2hNZXRhOiBhY3Rpb24ubWV0YSA/PyBudWxsLFxuICAgICAgICAgICAgZmV0Y2hTdGF0dXM6IGNhbkZldGNoKHRoaXMub3B0aW9ucy5uZXR3b3JrTW9kZSlcbiAgICAgICAgICAgICAgPyAnZmV0Y2hpbmcnXG4gICAgICAgICAgICAgIDogJ3BhdXNlZCcsXG4gICAgICAgICAgICAuLi4oIXN0YXRlLmRhdGFVcGRhdGVkQXQgJiYge1xuICAgICAgICAgICAgICBlcnJvcjogbnVsbCxcbiAgICAgICAgICAgICAgc3RhdHVzOiAnbG9hZGluZycsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICB9XG4gICAgICAgIGNhc2UgJ3N1Y2Nlc3MnOlxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICAgIGRhdGE6IGFjdGlvbi5kYXRhLFxuICAgICAgICAgICAgZGF0YVVwZGF0ZUNvdW50OiBzdGF0ZS5kYXRhVXBkYXRlQ291bnQgKyAxLFxuICAgICAgICAgICAgZGF0YVVwZGF0ZWRBdDogYWN0aW9uLmRhdGFVcGRhdGVkQXQgPz8gRGF0ZS5ub3coKSxcbiAgICAgICAgICAgIGVycm9yOiBudWxsLFxuICAgICAgICAgICAgaXNJbnZhbGlkYXRlZDogZmFsc2UsXG4gICAgICAgICAgICBzdGF0dXM6ICdzdWNjZXNzJyxcbiAgICAgICAgICAgIC4uLighYWN0aW9uLm1hbnVhbCAmJiB7XG4gICAgICAgICAgICAgIGZldGNoU3RhdHVzOiAnaWRsZScsXG4gICAgICAgICAgICAgIGZldGNoRmFpbHVyZUNvdW50OiAwLFxuICAgICAgICAgICAgICBmZXRjaEZhaWx1cmVSZWFzb246IG51bGwsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICB9XG4gICAgICAgIGNhc2UgJ2Vycm9yJzpcbiAgICAgICAgICBjb25zdCBlcnJvciA9IGFjdGlvbi5lcnJvciBhcyB1bmtub3duXG5cbiAgICAgICAgICBpZiAoaXNDYW5jZWxsZWRFcnJvcihlcnJvcikgJiYgZXJyb3IucmV2ZXJ0ICYmIHRoaXMucmV2ZXJ0U3RhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiB7IC4uLnRoaXMucmV2ZXJ0U3RhdGUsIGZldGNoU3RhdHVzOiAnaWRsZScgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICAgIGVycm9yOiBlcnJvciBhcyBURXJyb3IsXG4gICAgICAgICAgICBlcnJvclVwZGF0ZUNvdW50OiBzdGF0ZS5lcnJvclVwZGF0ZUNvdW50ICsgMSxcbiAgICAgICAgICAgIGVycm9yVXBkYXRlZEF0OiBEYXRlLm5vdygpLFxuICAgICAgICAgICAgZmV0Y2hGYWlsdXJlQ291bnQ6IHN0YXRlLmZldGNoRmFpbHVyZUNvdW50ICsgMSxcbiAgICAgICAgICAgIGZldGNoRmFpbHVyZVJlYXNvbjogZXJyb3IgYXMgVEVycm9yLFxuICAgICAgICAgICAgZmV0Y2hTdGF0dXM6ICdpZGxlJyxcbiAgICAgICAgICAgIHN0YXR1czogJ2Vycm9yJyxcbiAgICAgICAgICB9XG4gICAgICAgIGNhc2UgJ2ludmFsaWRhdGUnOlxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICAgIGlzSW52YWxpZGF0ZWQ6IHRydWUsXG4gICAgICAgICAgfVxuICAgICAgICBjYXNlICdzZXRTdGF0ZSc6XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgICAgLi4uYWN0aW9uLnN0YXRlLFxuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnN0YXRlID0gcmVkdWNlcih0aGlzLnN0YXRlKVxuXG4gICAgbm90aWZ5TWFuYWdlci5iYXRjaCgoKSA9PiB7XG4gICAgICB0aGlzLm9ic2VydmVycy5mb3JFYWNoKChvYnNlcnZlcikgPT4ge1xuICAgICAgICBvYnNlcnZlci5vblF1ZXJ5VXBkYXRlKGFjdGlvbilcbiAgICAgIH0pXG5cbiAgICAgIHRoaXMuY2FjaGUubm90aWZ5KHsgcXVlcnk6IHRoaXMsIHR5cGU6ICd1cGRhdGVkJywgYWN0aW9uIH0pXG4gICAgfSlcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXREZWZhdWx0U3RhdGU8XG4gIFRRdWVyeUZuRGF0YSxcbiAgVEVycm9yLFxuICBURGF0YSxcbiAgVFF1ZXJ5S2V5IGV4dGVuZHMgUXVlcnlLZXksXG4+KFxuICBvcHRpb25zOiBRdWVyeU9wdGlvbnM8VFF1ZXJ5Rm5EYXRhLCBURXJyb3IsIFREYXRhLCBUUXVlcnlLZXk+LFxuKTogUXVlcnlTdGF0ZTxURGF0YSwgVEVycm9yPiB7XG4gIGNvbnN0IGRhdGEgPVxuICAgIHR5cGVvZiBvcHRpb25zLmluaXRpYWxEYXRhID09PSAnZnVuY3Rpb24nXG4gICAgICA/IChvcHRpb25zLmluaXRpYWxEYXRhIGFzIEluaXRpYWxEYXRhRnVuY3Rpb248VERhdGE+KSgpXG4gICAgICA6IG9wdGlvbnMuaW5pdGlhbERhdGFcblxuICBjb25zdCBoYXNEYXRhID0gdHlwZW9mIGRhdGEgIT09ICd1bmRlZmluZWQnXG5cbiAgY29uc3QgaW5pdGlhbERhdGFVcGRhdGVkQXQgPSBoYXNEYXRhXG4gICAgPyB0eXBlb2Ygb3B0aW9ucy5pbml0aWFsRGF0YVVwZGF0ZWRBdCA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgPyAob3B0aW9ucy5pbml0aWFsRGF0YVVwZGF0ZWRBdCBhcyAoKSA9PiBudW1iZXIgfCB1bmRlZmluZWQpKClcbiAgICAgIDogb3B0aW9ucy5pbml0aWFsRGF0YVVwZGF0ZWRBdFxuICAgIDogMFxuXG4gIHJldHVybiB7XG4gICAgZGF0YSxcbiAgICBkYXRhVXBkYXRlQ291bnQ6IDAsXG4gICAgZGF0YVVwZGF0ZWRBdDogaGFzRGF0YSA/IGluaXRpYWxEYXRhVXBkYXRlZEF0ID8/IERhdGUubm93KCkgOiAwLFxuICAgIGVycm9yOiBudWxsLFxuICAgIGVycm9yVXBkYXRlQ291bnQ6IDAsXG4gICAgZXJyb3JVcGRhdGVkQXQ6IDAsXG4gICAgZmV0Y2hGYWlsdXJlQ291bnQ6IDAsXG4gICAgZmV0Y2hGYWlsdXJlUmVhc29uOiBudWxsLFxuICAgIGZldGNoTWV0YTogbnVsbCxcbiAgICBpc0ludmFsaWRhdGVkOiBmYWxzZSxcbiAgICBzdGF0dXM6IGhhc0RhdGEgPyAnc3VjY2VzcycgOiAnbG9hZGluZycsXG4gICAgZmV0Y2hTdGF0dXM6ICdpZGxlJyxcbiAgfVxufVxuIiwgImltcG9ydCB7IGhhc2hRdWVyeUtleUJ5T3B0aW9ucywgbWF0Y2hRdWVyeSwgcGFyc2VGaWx0ZXJBcmdzIH0gZnJvbSAnLi91dGlscydcbmltcG9ydCB7IFF1ZXJ5IH0gZnJvbSAnLi9xdWVyeSdcbmltcG9ydCB7IG5vdGlmeU1hbmFnZXIgfSBmcm9tICcuL25vdGlmeU1hbmFnZXInXG5pbXBvcnQgeyBTdWJzY3JpYmFibGUgfSBmcm9tICcuL3N1YnNjcmliYWJsZSdcbmltcG9ydCB0eXBlIHsgUXVlcnlGaWx0ZXJzIH0gZnJvbSAnLi91dGlscydcbmltcG9ydCB0eXBlIHsgQWN0aW9uLCBRdWVyeVN0YXRlIH0gZnJvbSAnLi9xdWVyeSdcbmltcG9ydCB0eXBlIHsgTm90aWZ5RXZlbnQsIFF1ZXJ5S2V5LCBRdWVyeU9wdGlvbnMgfSBmcm9tICcuL3R5cGVzJ1xuaW1wb3J0IHR5cGUgeyBRdWVyeUNsaWVudCB9IGZyb20gJy4vcXVlcnlDbGllbnQnXG5pbXBvcnQgdHlwZSB7IFF1ZXJ5T2JzZXJ2ZXIgfSBmcm9tICcuL3F1ZXJ5T2JzZXJ2ZXInXG5cbi8vIFRZUEVTXG5cbmludGVyZmFjZSBRdWVyeUNhY2hlQ29uZmlnIHtcbiAgb25FcnJvcj86IChlcnJvcjogdW5rbm93biwgcXVlcnk6IFF1ZXJ5PHVua25vd24sIHVua25vd24sIHVua25vd24+KSA9PiB2b2lkXG4gIG9uU3VjY2Vzcz86IChkYXRhOiB1bmtub3duLCBxdWVyeTogUXVlcnk8dW5rbm93biwgdW5rbm93biwgdW5rbm93bj4pID0+IHZvaWRcbiAgb25TZXR0bGVkPzogKFxuICAgIGRhdGE6IHVua25vd24gfCB1bmRlZmluZWQsXG4gICAgZXJyb3I6IHVua25vd24gfCBudWxsLFxuICAgIHF1ZXJ5OiBRdWVyeTx1bmtub3duLCB1bmtub3duLCB1bmtub3duPixcbiAgKSA9PiB2b2lkXG59XG5cbmludGVyZmFjZSBRdWVyeUhhc2hNYXAge1xuICBbaGFzaDogc3RyaW5nXTogUXVlcnk8YW55LCBhbnksIGFueSwgYW55PlxufVxuXG5pbnRlcmZhY2UgTm90aWZ5RXZlbnRRdWVyeUFkZGVkIGV4dGVuZHMgTm90aWZ5RXZlbnQge1xuICB0eXBlOiAnYWRkZWQnXG4gIHF1ZXJ5OiBRdWVyeTxhbnksIGFueSwgYW55LCBhbnk+XG59XG5cbmludGVyZmFjZSBOb3RpZnlFdmVudFF1ZXJ5UmVtb3ZlZCBleHRlbmRzIE5vdGlmeUV2ZW50IHtcbiAgdHlwZTogJ3JlbW92ZWQnXG4gIHF1ZXJ5OiBRdWVyeTxhbnksIGFueSwgYW55LCBhbnk+XG59XG5cbmludGVyZmFjZSBOb3RpZnlFdmVudFF1ZXJ5VXBkYXRlZCBleHRlbmRzIE5vdGlmeUV2ZW50IHtcbiAgdHlwZTogJ3VwZGF0ZWQnXG4gIHF1ZXJ5OiBRdWVyeTxhbnksIGFueSwgYW55LCBhbnk+XG4gIGFjdGlvbjogQWN0aW9uPGFueSwgYW55PlxufVxuXG5pbnRlcmZhY2UgTm90aWZ5RXZlbnRRdWVyeU9ic2VydmVyQWRkZWQgZXh0ZW5kcyBOb3RpZnlFdmVudCB7XG4gIHR5cGU6ICdvYnNlcnZlckFkZGVkJ1xuICBxdWVyeTogUXVlcnk8YW55LCBhbnksIGFueSwgYW55PlxuICBvYnNlcnZlcjogUXVlcnlPYnNlcnZlcjxhbnksIGFueSwgYW55LCBhbnksIGFueT5cbn1cblxuaW50ZXJmYWNlIE5vdGlmeUV2ZW50UXVlcnlPYnNlcnZlclJlbW92ZWQgZXh0ZW5kcyBOb3RpZnlFdmVudCB7XG4gIHR5cGU6ICdvYnNlcnZlclJlbW92ZWQnXG4gIHF1ZXJ5OiBRdWVyeTxhbnksIGFueSwgYW55LCBhbnk+XG4gIG9ic2VydmVyOiBRdWVyeU9ic2VydmVyPGFueSwgYW55LCBhbnksIGFueSwgYW55PlxufVxuXG5pbnRlcmZhY2UgTm90aWZ5RXZlbnRRdWVyeU9ic2VydmVyUmVzdWx0c1VwZGF0ZWQgZXh0ZW5kcyBOb3RpZnlFdmVudCB7XG4gIHR5cGU6ICdvYnNlcnZlclJlc3VsdHNVcGRhdGVkJ1xuICBxdWVyeTogUXVlcnk8YW55LCBhbnksIGFueSwgYW55PlxufVxuXG5pbnRlcmZhY2UgTm90aWZ5RXZlbnRRdWVyeU9ic2VydmVyT3B0aW9uc1VwZGF0ZWQgZXh0ZW5kcyBOb3RpZnlFdmVudCB7XG4gIHR5cGU6ICdvYnNlcnZlck9wdGlvbnNVcGRhdGVkJ1xuICBxdWVyeTogUXVlcnk8YW55LCBhbnksIGFueSwgYW55PlxuICBvYnNlcnZlcjogUXVlcnlPYnNlcnZlcjxhbnksIGFueSwgYW55LCBhbnksIGFueT5cbn1cblxuZXhwb3J0IHR5cGUgUXVlcnlDYWNoZU5vdGlmeUV2ZW50ID1cbiAgfCBOb3RpZnlFdmVudFF1ZXJ5QWRkZWRcbiAgfCBOb3RpZnlFdmVudFF1ZXJ5UmVtb3ZlZFxuICB8IE5vdGlmeUV2ZW50UXVlcnlVcGRhdGVkXG4gIHwgTm90aWZ5RXZlbnRRdWVyeU9ic2VydmVyQWRkZWRcbiAgfCBOb3RpZnlFdmVudFF1ZXJ5T2JzZXJ2ZXJSZW1vdmVkXG4gIHwgTm90aWZ5RXZlbnRRdWVyeU9ic2VydmVyUmVzdWx0c1VwZGF0ZWRcbiAgfCBOb3RpZnlFdmVudFF1ZXJ5T2JzZXJ2ZXJPcHRpb25zVXBkYXRlZFxuXG50eXBlIFF1ZXJ5Q2FjaGVMaXN0ZW5lciA9IChldmVudDogUXVlcnlDYWNoZU5vdGlmeUV2ZW50KSA9PiB2b2lkXG5cbi8vIENMQVNTXG5cbmV4cG9ydCBjbGFzcyBRdWVyeUNhY2hlIGV4dGVuZHMgU3Vic2NyaWJhYmxlPFF1ZXJ5Q2FjaGVMaXN0ZW5lcj4ge1xuICBjb25maWc6IFF1ZXJ5Q2FjaGVDb25maWdcblxuICBwcml2YXRlIHF1ZXJpZXM6IFF1ZXJ5PGFueSwgYW55LCBhbnksIGFueT5bXVxuICBwcml2YXRlIHF1ZXJpZXNNYXA6IFF1ZXJ5SGFzaE1hcFxuXG4gIGNvbnN0cnVjdG9yKGNvbmZpZz86IFF1ZXJ5Q2FjaGVDb25maWcpIHtcbiAgICBzdXBlcigpXG4gICAgdGhpcy5jb25maWcgPSBjb25maWcgfHwge31cbiAgICB0aGlzLnF1ZXJpZXMgPSBbXVxuICAgIHRoaXMucXVlcmllc01hcCA9IHt9XG4gIH1cblxuICBidWlsZDxUUXVlcnlGbkRhdGEsIFRFcnJvciwgVERhdGEsIFRRdWVyeUtleSBleHRlbmRzIFF1ZXJ5S2V5PihcbiAgICBjbGllbnQ6IFF1ZXJ5Q2xpZW50LFxuICAgIG9wdGlvbnM6IFF1ZXJ5T3B0aW9uczxUUXVlcnlGbkRhdGEsIFRFcnJvciwgVERhdGEsIFRRdWVyeUtleT4sXG4gICAgc3RhdGU/OiBRdWVyeVN0YXRlPFREYXRhLCBURXJyb3I+LFxuICApOiBRdWVyeTxUUXVlcnlGbkRhdGEsIFRFcnJvciwgVERhdGEsIFRRdWVyeUtleT4ge1xuICAgIGNvbnN0IHF1ZXJ5S2V5ID0gb3B0aW9ucy5xdWVyeUtleSFcbiAgICBjb25zdCBxdWVyeUhhc2ggPVxuICAgICAgb3B0aW9ucy5xdWVyeUhhc2ggPz8gaGFzaFF1ZXJ5S2V5QnlPcHRpb25zKHF1ZXJ5S2V5LCBvcHRpb25zKVxuICAgIGxldCBxdWVyeSA9IHRoaXMuZ2V0PFRRdWVyeUZuRGF0YSwgVEVycm9yLCBURGF0YSwgVFF1ZXJ5S2V5PihxdWVyeUhhc2gpXG5cbiAgICBpZiAoIXF1ZXJ5KSB7XG4gICAgICBxdWVyeSA9IG5ldyBRdWVyeSh7XG4gICAgICAgIGNhY2hlOiB0aGlzLFxuICAgICAgICBsb2dnZXI6IGNsaWVudC5nZXRMb2dnZXIoKSxcbiAgICAgICAgcXVlcnlLZXksXG4gICAgICAgIHF1ZXJ5SGFzaCxcbiAgICAgICAgb3B0aW9uczogY2xpZW50LmRlZmF1bHRRdWVyeU9wdGlvbnMob3B0aW9ucyksXG4gICAgICAgIHN0YXRlLFxuICAgICAgICBkZWZhdWx0T3B0aW9uczogY2xpZW50LmdldFF1ZXJ5RGVmYXVsdHMocXVlcnlLZXkpLFxuICAgICAgfSlcbiAgICAgIHRoaXMuYWRkKHF1ZXJ5KVxuICAgIH1cblxuICAgIHJldHVybiBxdWVyeVxuICB9XG5cbiAgYWRkKHF1ZXJ5OiBRdWVyeTxhbnksIGFueSwgYW55LCBhbnk+KTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnF1ZXJpZXNNYXBbcXVlcnkucXVlcnlIYXNoXSkge1xuICAgICAgdGhpcy5xdWVyaWVzTWFwW3F1ZXJ5LnF1ZXJ5SGFzaF0gPSBxdWVyeVxuICAgICAgdGhpcy5xdWVyaWVzLnB1c2gocXVlcnkpXG4gICAgICB0aGlzLm5vdGlmeSh7XG4gICAgICAgIHR5cGU6ICdhZGRlZCcsXG4gICAgICAgIHF1ZXJ5LFxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICByZW1vdmUocXVlcnk6IFF1ZXJ5PGFueSwgYW55LCBhbnksIGFueT4pOiB2b2lkIHtcbiAgICBjb25zdCBxdWVyeUluTWFwID0gdGhpcy5xdWVyaWVzTWFwW3F1ZXJ5LnF1ZXJ5SGFzaF1cblxuICAgIGlmIChxdWVyeUluTWFwKSB7XG4gICAgICBxdWVyeS5kZXN0cm95KClcblxuICAgICAgdGhpcy5xdWVyaWVzID0gdGhpcy5xdWVyaWVzLmZpbHRlcigoeCkgPT4geCAhPT0gcXVlcnkpXG5cbiAgICAgIGlmIChxdWVyeUluTWFwID09PSBxdWVyeSkge1xuICAgICAgICBkZWxldGUgdGhpcy5xdWVyaWVzTWFwW3F1ZXJ5LnF1ZXJ5SGFzaF1cbiAgICAgIH1cblxuICAgICAgdGhpcy5ub3RpZnkoeyB0eXBlOiAncmVtb3ZlZCcsIHF1ZXJ5IH0pXG4gICAgfVxuICB9XG5cbiAgY2xlYXIoKTogdm9pZCB7XG4gICAgbm90aWZ5TWFuYWdlci5iYXRjaCgoKSA9PiB7XG4gICAgICB0aGlzLnF1ZXJpZXMuZm9yRWFjaCgocXVlcnkpID0+IHtcbiAgICAgICAgdGhpcy5yZW1vdmUocXVlcnkpXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICBnZXQ8XG4gICAgVFF1ZXJ5Rm5EYXRhID0gdW5rbm93bixcbiAgICBURXJyb3IgPSB1bmtub3duLFxuICAgIFREYXRhID0gVFF1ZXJ5Rm5EYXRhLFxuICAgIFRRdWVyeUtleSBleHRlbmRzIFF1ZXJ5S2V5ID0gUXVlcnlLZXksXG4gID4oXG4gICAgcXVlcnlIYXNoOiBzdHJpbmcsXG4gICk6IFF1ZXJ5PFRRdWVyeUZuRGF0YSwgVEVycm9yLCBURGF0YSwgVFF1ZXJ5S2V5PiB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMucXVlcmllc01hcFtxdWVyeUhhc2hdXG4gIH1cblxuICBnZXRBbGwoKTogUXVlcnlbXSB7XG4gICAgcmV0dXJuIHRoaXMucXVlcmllc1xuICB9XG5cbiAgZmluZDxUUXVlcnlGbkRhdGEgPSB1bmtub3duLCBURXJyb3IgPSB1bmtub3duLCBURGF0YSA9IFRRdWVyeUZuRGF0YT4oXG4gICAgYXJnMTogUXVlcnlLZXksXG4gICAgYXJnMj86IFF1ZXJ5RmlsdGVycyxcbiAgKTogUXVlcnk8VFF1ZXJ5Rm5EYXRhLCBURXJyb3IsIFREYXRhPiB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3QgW2ZpbHRlcnNdID0gcGFyc2VGaWx0ZXJBcmdzKGFyZzEsIGFyZzIpXG5cbiAgICBpZiAodHlwZW9mIGZpbHRlcnMuZXhhY3QgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBmaWx0ZXJzLmV4YWN0ID0gdHJ1ZVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnF1ZXJpZXMuZmluZCgocXVlcnkpID0+IG1hdGNoUXVlcnkoZmlsdGVycywgcXVlcnkpKVxuICB9XG5cbiAgZmluZEFsbChxdWVyeUtleT86IFF1ZXJ5S2V5LCBmaWx0ZXJzPzogUXVlcnlGaWx0ZXJzKTogUXVlcnlbXVxuICBmaW5kQWxsKGZpbHRlcnM/OiBRdWVyeUZpbHRlcnMpOiBRdWVyeVtdXG4gIGZpbmRBbGwoYXJnMT86IFF1ZXJ5S2V5IHwgUXVlcnlGaWx0ZXJzLCBhcmcyPzogUXVlcnlGaWx0ZXJzKTogUXVlcnlbXVxuICBmaW5kQWxsKGFyZzE/OiBRdWVyeUtleSB8IFF1ZXJ5RmlsdGVycywgYXJnMj86IFF1ZXJ5RmlsdGVycyk6IFF1ZXJ5W10ge1xuICAgIGNvbnN0IFtmaWx0ZXJzXSA9IHBhcnNlRmlsdGVyQXJncyhhcmcxLCBhcmcyKVxuICAgIHJldHVybiBPYmplY3Qua2V5cyhmaWx0ZXJzKS5sZW5ndGggPiAwXG4gICAgICA/IHRoaXMucXVlcmllcy5maWx0ZXIoKHF1ZXJ5KSA9PiBtYXRjaFF1ZXJ5KGZpbHRlcnMsIHF1ZXJ5KSlcbiAgICAgIDogdGhpcy5xdWVyaWVzXG4gIH1cblxuICBub3RpZnkoZXZlbnQ6IFF1ZXJ5Q2FjaGVOb3RpZnlFdmVudCkge1xuICAgIG5vdGlmeU1hbmFnZXIuYmF0Y2goKCkgPT4ge1xuICAgICAgdGhpcy5saXN0ZW5lcnMuZm9yRWFjaCgoeyBsaXN0ZW5lciB9KSA9PiB7XG4gICAgICAgIGxpc3RlbmVyKGV2ZW50KVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgb25Gb2N1cygpOiB2b2lkIHtcbiAgICBub3RpZnlNYW5hZ2VyLmJhdGNoKCgpID0+IHtcbiAgICAgIHRoaXMucXVlcmllcy5mb3JFYWNoKChxdWVyeSkgPT4ge1xuICAgICAgICBxdWVyeS5vbkZvY3VzKClcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIG9uT25saW5lKCk6IHZvaWQge1xuICAgIG5vdGlmeU1hbmFnZXIuYmF0Y2goKCkgPT4ge1xuICAgICAgdGhpcy5xdWVyaWVzLmZvckVhY2goKHF1ZXJ5KSA9PiB7XG4gICAgICAgIHF1ZXJ5Lm9uT25saW5lKClcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuIiwgImltcG9ydCB7IGRlZmF1bHRMb2dnZXIgfSBmcm9tICcuL2xvZ2dlcidcbmltcG9ydCB7IG5vdGlmeU1hbmFnZXIgfSBmcm9tICcuL25vdGlmeU1hbmFnZXInXG5pbXBvcnQgeyBSZW1vdmFibGUgfSBmcm9tICcuL3JlbW92YWJsZSdcbmltcG9ydCB7IGNhbkZldGNoLCBjcmVhdGVSZXRyeWVyIH0gZnJvbSAnLi9yZXRyeWVyJ1xuaW1wb3J0IHR5cGUgeyBNdXRhdGlvbk1ldGEsIE11dGF0aW9uT3B0aW9ucywgTXV0YXRpb25TdGF0dXMgfSBmcm9tICcuL3R5cGVzJ1xuaW1wb3J0IHR5cGUgeyBNdXRhdGlvbkNhY2hlIH0gZnJvbSAnLi9tdXRhdGlvbkNhY2hlJ1xuaW1wb3J0IHR5cGUgeyBNdXRhdGlvbk9ic2VydmVyIH0gZnJvbSAnLi9tdXRhdGlvbk9ic2VydmVyJ1xuaW1wb3J0IHR5cGUgeyBMb2dnZXIgfSBmcm9tICcuL2xvZ2dlcidcbmltcG9ydCB0eXBlIHsgUmV0cnllciB9IGZyb20gJy4vcmV0cnllcidcblxuLy8gVFlQRVNcblxuaW50ZXJmYWNlIE11dGF0aW9uQ29uZmlnPFREYXRhLCBURXJyb3IsIFRWYXJpYWJsZXMsIFRDb250ZXh0PiB7XG4gIG11dGF0aW9uSWQ6IG51bWJlclxuICBtdXRhdGlvbkNhY2hlOiBNdXRhdGlvbkNhY2hlXG4gIG9wdGlvbnM6IE11dGF0aW9uT3B0aW9uczxURGF0YSwgVEVycm9yLCBUVmFyaWFibGVzLCBUQ29udGV4dD5cbiAgbG9nZ2VyPzogTG9nZ2VyXG4gIGRlZmF1bHRPcHRpb25zPzogTXV0YXRpb25PcHRpb25zPFREYXRhLCBURXJyb3IsIFRWYXJpYWJsZXMsIFRDb250ZXh0PlxuICBzdGF0ZT86IE11dGF0aW9uU3RhdGU8VERhdGEsIFRFcnJvciwgVFZhcmlhYmxlcywgVENvbnRleHQ+XG4gIG1ldGE/OiBNdXRhdGlvbk1ldGFcbn1cblxuZXhwb3J0IGludGVyZmFjZSBNdXRhdGlvblN0YXRlPFxuICBURGF0YSA9IHVua25vd24sXG4gIFRFcnJvciA9IHVua25vd24sXG4gIFRWYXJpYWJsZXMgPSB2b2lkLFxuICBUQ29udGV4dCA9IHVua25vd24sXG4+IHtcbiAgY29udGV4dDogVENvbnRleHQgfCB1bmRlZmluZWRcbiAgZGF0YTogVERhdGEgfCB1bmRlZmluZWRcbiAgZXJyb3I6IFRFcnJvciB8IG51bGxcbiAgZmFpbHVyZUNvdW50OiBudW1iZXJcbiAgZmFpbHVyZVJlYXNvbjogVEVycm9yIHwgbnVsbFxuICBpc1BhdXNlZDogYm9vbGVhblxuICBzdGF0dXM6IE11dGF0aW9uU3RhdHVzXG4gIHZhcmlhYmxlczogVFZhcmlhYmxlcyB8IHVuZGVmaW5lZFxufVxuXG5pbnRlcmZhY2UgRmFpbGVkQWN0aW9uPFRFcnJvcj4ge1xuICB0eXBlOiAnZmFpbGVkJ1xuICBmYWlsdXJlQ291bnQ6IG51bWJlclxuICBlcnJvcjogVEVycm9yIHwgbnVsbFxufVxuXG5pbnRlcmZhY2UgTG9hZGluZ0FjdGlvbjxUVmFyaWFibGVzLCBUQ29udGV4dD4ge1xuICB0eXBlOiAnbG9hZGluZydcbiAgdmFyaWFibGVzPzogVFZhcmlhYmxlc1xuICBjb250ZXh0PzogVENvbnRleHRcbn1cblxuaW50ZXJmYWNlIFN1Y2Nlc3NBY3Rpb248VERhdGE+IHtcbiAgdHlwZTogJ3N1Y2Nlc3MnXG4gIGRhdGE6IFREYXRhXG59XG5cbmludGVyZmFjZSBFcnJvckFjdGlvbjxURXJyb3I+IHtcbiAgdHlwZTogJ2Vycm9yJ1xuICBlcnJvcjogVEVycm9yXG59XG5cbmludGVyZmFjZSBQYXVzZUFjdGlvbiB7XG4gIHR5cGU6ICdwYXVzZSdcbn1cblxuaW50ZXJmYWNlIENvbnRpbnVlQWN0aW9uIHtcbiAgdHlwZTogJ2NvbnRpbnVlJ1xufVxuXG5pbnRlcmZhY2UgU2V0U3RhdGVBY3Rpb248VERhdGEsIFRFcnJvciwgVFZhcmlhYmxlcywgVENvbnRleHQ+IHtcbiAgdHlwZTogJ3NldFN0YXRlJ1xuICBzdGF0ZTogTXV0YXRpb25TdGF0ZTxURGF0YSwgVEVycm9yLCBUVmFyaWFibGVzLCBUQ29udGV4dD5cbn1cblxuZXhwb3J0IHR5cGUgQWN0aW9uPFREYXRhLCBURXJyb3IsIFRWYXJpYWJsZXMsIFRDb250ZXh0PiA9XG4gIHwgQ29udGludWVBY3Rpb25cbiAgfCBFcnJvckFjdGlvbjxURXJyb3I+XG4gIHwgRmFpbGVkQWN0aW9uPFRFcnJvcj5cbiAgfCBMb2FkaW5nQWN0aW9uPFRWYXJpYWJsZXMsIFRDb250ZXh0PlxuICB8IFBhdXNlQWN0aW9uXG4gIHwgU2V0U3RhdGVBY3Rpb248VERhdGEsIFRFcnJvciwgVFZhcmlhYmxlcywgVENvbnRleHQ+XG4gIHwgU3VjY2Vzc0FjdGlvbjxURGF0YT5cblxuLy8gQ0xBU1NcblxuZXhwb3J0IGNsYXNzIE11dGF0aW9uPFxuICBURGF0YSA9IHVua25vd24sXG4gIFRFcnJvciA9IHVua25vd24sXG4gIFRWYXJpYWJsZXMgPSB2b2lkLFxuICBUQ29udGV4dCA9IHVua25vd24sXG4+IGV4dGVuZHMgUmVtb3ZhYmxlIHtcbiAgc3RhdGU6IE11dGF0aW9uU3RhdGU8VERhdGEsIFRFcnJvciwgVFZhcmlhYmxlcywgVENvbnRleHQ+XG4gIG9wdGlvbnMhOiBNdXRhdGlvbk9wdGlvbnM8VERhdGEsIFRFcnJvciwgVFZhcmlhYmxlcywgVENvbnRleHQ+XG4gIG11dGF0aW9uSWQ6IG51bWJlclxuXG4gIHByaXZhdGUgb2JzZXJ2ZXJzOiBNdXRhdGlvbk9ic2VydmVyPFREYXRhLCBURXJyb3IsIFRWYXJpYWJsZXMsIFRDb250ZXh0PltdXG4gIHByaXZhdGUgZGVmYXVsdE9wdGlvbnM/OiBNdXRhdGlvbk9wdGlvbnM8VERhdGEsIFRFcnJvciwgVFZhcmlhYmxlcywgVENvbnRleHQ+XG4gIHByaXZhdGUgbXV0YXRpb25DYWNoZTogTXV0YXRpb25DYWNoZVxuICBwcml2YXRlIGxvZ2dlcjogTG9nZ2VyXG4gIHByaXZhdGUgcmV0cnllcj86IFJldHJ5ZXI8VERhdGE+XG5cbiAgY29uc3RydWN0b3IoY29uZmlnOiBNdXRhdGlvbkNvbmZpZzxURGF0YSwgVEVycm9yLCBUVmFyaWFibGVzLCBUQ29udGV4dD4pIHtcbiAgICBzdXBlcigpXG5cbiAgICB0aGlzLmRlZmF1bHRPcHRpb25zID0gY29uZmlnLmRlZmF1bHRPcHRpb25zXG4gICAgdGhpcy5tdXRhdGlvbklkID0gY29uZmlnLm11dGF0aW9uSWRcbiAgICB0aGlzLm11dGF0aW9uQ2FjaGUgPSBjb25maWcubXV0YXRpb25DYWNoZVxuICAgIHRoaXMubG9nZ2VyID0gY29uZmlnLmxvZ2dlciB8fCBkZWZhdWx0TG9nZ2VyXG4gICAgdGhpcy5vYnNlcnZlcnMgPSBbXVxuICAgIHRoaXMuc3RhdGUgPSBjb25maWcuc3RhdGUgfHwgZ2V0RGVmYXVsdFN0YXRlKClcblxuICAgIHRoaXMuc2V0T3B0aW9ucyhjb25maWcub3B0aW9ucylcbiAgICB0aGlzLnNjaGVkdWxlR2MoKVxuICB9XG5cbiAgc2V0T3B0aW9ucyhcbiAgICBvcHRpb25zPzogTXV0YXRpb25PcHRpb25zPFREYXRhLCBURXJyb3IsIFRWYXJpYWJsZXMsIFRDb250ZXh0PixcbiAgKTogdm9pZCB7XG4gICAgdGhpcy5vcHRpb25zID0geyAuLi50aGlzLmRlZmF1bHRPcHRpb25zLCAuLi5vcHRpb25zIH1cblxuICAgIHRoaXMudXBkYXRlQ2FjaGVUaW1lKHRoaXMub3B0aW9ucy5jYWNoZVRpbWUpXG4gIH1cblxuICBnZXQgbWV0YSgpOiBNdXRhdGlvbk1ldGEgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMubWV0YVxuICB9XG5cbiAgc2V0U3RhdGUoc3RhdGU6IE11dGF0aW9uU3RhdGU8VERhdGEsIFRFcnJvciwgVFZhcmlhYmxlcywgVENvbnRleHQ+KTogdm9pZCB7XG4gICAgdGhpcy5kaXNwYXRjaCh7IHR5cGU6ICdzZXRTdGF0ZScsIHN0YXRlIH0pXG4gIH1cblxuICBhZGRPYnNlcnZlcihvYnNlcnZlcjogTXV0YXRpb25PYnNlcnZlcjxhbnksIGFueSwgYW55LCBhbnk+KTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLm9ic2VydmVycy5pbmNsdWRlcyhvYnNlcnZlcikpIHtcbiAgICAgIHRoaXMub2JzZXJ2ZXJzLnB1c2gob2JzZXJ2ZXIpXG5cbiAgICAgIC8vIFN0b3AgdGhlIG11dGF0aW9uIGZyb20gYmVpbmcgZ2FyYmFnZSBjb2xsZWN0ZWRcbiAgICAgIHRoaXMuY2xlYXJHY1RpbWVvdXQoKVxuXG4gICAgICB0aGlzLm11dGF0aW9uQ2FjaGUubm90aWZ5KHtcbiAgICAgICAgdHlwZTogJ29ic2VydmVyQWRkZWQnLFxuICAgICAgICBtdXRhdGlvbjogdGhpcyxcbiAgICAgICAgb2JzZXJ2ZXIsXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIHJlbW92ZU9ic2VydmVyKG9ic2VydmVyOiBNdXRhdGlvbk9ic2VydmVyPGFueSwgYW55LCBhbnksIGFueT4pOiB2b2lkIHtcbiAgICB0aGlzLm9ic2VydmVycyA9IHRoaXMub2JzZXJ2ZXJzLmZpbHRlcigoeCkgPT4geCAhPT0gb2JzZXJ2ZXIpXG5cbiAgICB0aGlzLnNjaGVkdWxlR2MoKVxuXG4gICAgdGhpcy5tdXRhdGlvbkNhY2hlLm5vdGlmeSh7XG4gICAgICB0eXBlOiAnb2JzZXJ2ZXJSZW1vdmVkJyxcbiAgICAgIG11dGF0aW9uOiB0aGlzLFxuICAgICAgb2JzZXJ2ZXIsXG4gICAgfSlcbiAgfVxuXG4gIHByb3RlY3RlZCBvcHRpb25hbFJlbW92ZSgpIHtcbiAgICBpZiAoIXRoaXMub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgaWYgKHRoaXMuc3RhdGUuc3RhdHVzID09PSAnbG9hZGluZycpIHtcbiAgICAgICAgdGhpcy5zY2hlZHVsZUdjKClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubXV0YXRpb25DYWNoZS5yZW1vdmUodGhpcylcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjb250aW51ZSgpOiBQcm9taXNlPHVua25vd24+IHtcbiAgICByZXR1cm4gdGhpcy5yZXRyeWVyPy5jb250aW51ZSgpID8/IHRoaXMuZXhlY3V0ZSgpXG4gIH1cblxuICBhc3luYyBleGVjdXRlKCk6IFByb21pc2U8VERhdGE+IHtcbiAgICBjb25zdCBleGVjdXRlTXV0YXRpb24gPSAoKSA9PiB7XG4gICAgICB0aGlzLnJldHJ5ZXIgPSBjcmVhdGVSZXRyeWVyKHtcbiAgICAgICAgZm46ICgpID0+IHtcbiAgICAgICAgICBpZiAoIXRoaXMub3B0aW9ucy5tdXRhdGlvbkZuKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoJ05vIG11dGF0aW9uRm4gZm91bmQnKVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zLm11dGF0aW9uRm4odGhpcy5zdGF0ZS52YXJpYWJsZXMhKVxuICAgICAgICB9LFxuICAgICAgICBvbkZhaWw6IChmYWlsdXJlQ291bnQsIGVycm9yKSA9PiB7XG4gICAgICAgICAgdGhpcy5kaXNwYXRjaCh7IHR5cGU6ICdmYWlsZWQnLCBmYWlsdXJlQ291bnQsIGVycm9yIH0pXG4gICAgICAgIH0sXG4gICAgICAgIG9uUGF1c2U6ICgpID0+IHtcbiAgICAgICAgICB0aGlzLmRpc3BhdGNoKHsgdHlwZTogJ3BhdXNlJyB9KVxuICAgICAgICB9LFxuICAgICAgICBvbkNvbnRpbnVlOiAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5kaXNwYXRjaCh7IHR5cGU6ICdjb250aW51ZScgfSlcbiAgICAgICAgfSxcbiAgICAgICAgcmV0cnk6IHRoaXMub3B0aW9ucy5yZXRyeSA/PyAwLFxuICAgICAgICByZXRyeURlbGF5OiB0aGlzLm9wdGlvbnMucmV0cnlEZWxheSxcbiAgICAgICAgbmV0d29ya01vZGU6IHRoaXMub3B0aW9ucy5uZXR3b3JrTW9kZSxcbiAgICAgIH0pXG5cbiAgICAgIHJldHVybiB0aGlzLnJldHJ5ZXIucHJvbWlzZVxuICAgIH1cblxuICAgIGNvbnN0IHJlc3RvcmVkID0gdGhpcy5zdGF0ZS5zdGF0dXMgPT09ICdsb2FkaW5nJ1xuICAgIHRyeSB7XG4gICAgICBpZiAoIXJlc3RvcmVkKSB7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2goeyB0eXBlOiAnbG9hZGluZycsIHZhcmlhYmxlczogdGhpcy5vcHRpb25zLnZhcmlhYmxlcyEgfSlcbiAgICAgICAgLy8gTm90aWZ5IGNhY2hlIGNhbGxiYWNrXG4gICAgICAgIGF3YWl0IHRoaXMubXV0YXRpb25DYWNoZS5jb25maWcub25NdXRhdGU/LihcbiAgICAgICAgICB0aGlzLnN0YXRlLnZhcmlhYmxlcyxcbiAgICAgICAgICB0aGlzIGFzIE11dGF0aW9uPHVua25vd24sIHVua25vd24sIHVua25vd24sIHVua25vd24+LFxuICAgICAgICApXG4gICAgICAgIGNvbnN0IGNvbnRleHQgPSBhd2FpdCB0aGlzLm9wdGlvbnMub25NdXRhdGU/Lih0aGlzLnN0YXRlLnZhcmlhYmxlcyEpXG4gICAgICAgIGlmIChjb250ZXh0ICE9PSB0aGlzLnN0YXRlLmNvbnRleHQpIHtcbiAgICAgICAgICB0aGlzLmRpc3BhdGNoKHtcbiAgICAgICAgICAgIHR5cGU6ICdsb2FkaW5nJyxcbiAgICAgICAgICAgIGNvbnRleHQsXG4gICAgICAgICAgICB2YXJpYWJsZXM6IHRoaXMuc3RhdGUudmFyaWFibGVzLFxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBleGVjdXRlTXV0YXRpb24oKVxuXG4gICAgICAvLyBOb3RpZnkgY2FjaGUgY2FsbGJhY2tcbiAgICAgIGF3YWl0IHRoaXMubXV0YXRpb25DYWNoZS5jb25maWcub25TdWNjZXNzPy4oXG4gICAgICAgIGRhdGEsXG4gICAgICAgIHRoaXMuc3RhdGUudmFyaWFibGVzLFxuICAgICAgICB0aGlzLnN0YXRlLmNvbnRleHQsXG4gICAgICAgIHRoaXMgYXMgTXV0YXRpb248dW5rbm93biwgdW5rbm93biwgdW5rbm93biwgdW5rbm93bj4sXG4gICAgICApXG5cbiAgICAgIGF3YWl0IHRoaXMub3B0aW9ucy5vblN1Y2Nlc3M/LihcbiAgICAgICAgZGF0YSxcbiAgICAgICAgdGhpcy5zdGF0ZS52YXJpYWJsZXMhLFxuICAgICAgICB0aGlzLnN0YXRlLmNvbnRleHQhLFxuICAgICAgKVxuXG4gICAgICAvLyBOb3RpZnkgY2FjaGUgY2FsbGJhY2tcbiAgICAgIGF3YWl0IHRoaXMubXV0YXRpb25DYWNoZS5jb25maWcub25TZXR0bGVkPy4oXG4gICAgICAgIGRhdGEsXG4gICAgICAgIG51bGwsXG4gICAgICAgIHRoaXMuc3RhdGUudmFyaWFibGVzLFxuICAgICAgICB0aGlzLnN0YXRlLmNvbnRleHQsXG4gICAgICAgIHRoaXMgYXMgTXV0YXRpb248dW5rbm93biwgdW5rbm93biwgdW5rbm93biwgdW5rbm93bj4sXG4gICAgICApXG5cbiAgICAgIGF3YWl0IHRoaXMub3B0aW9ucy5vblNldHRsZWQ/LihcbiAgICAgICAgZGF0YSxcbiAgICAgICAgbnVsbCxcbiAgICAgICAgdGhpcy5zdGF0ZS52YXJpYWJsZXMhLFxuICAgICAgICB0aGlzLnN0YXRlLmNvbnRleHQsXG4gICAgICApXG5cbiAgICAgIHRoaXMuZGlzcGF0Y2goeyB0eXBlOiAnc3VjY2VzcycsIGRhdGEgfSlcbiAgICAgIHJldHVybiBkYXRhXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIE5vdGlmeSBjYWNoZSBjYWxsYmFja1xuICAgICAgICBhd2FpdCB0aGlzLm11dGF0aW9uQ2FjaGUuY29uZmlnLm9uRXJyb3I/LihcbiAgICAgICAgICBlcnJvcixcbiAgICAgICAgICB0aGlzLnN0YXRlLnZhcmlhYmxlcyxcbiAgICAgICAgICB0aGlzLnN0YXRlLmNvbnRleHQsXG4gICAgICAgICAgdGhpcyBhcyBNdXRhdGlvbjx1bmtub3duLCB1bmtub3duLCB1bmtub3duLCB1bmtub3duPixcbiAgICAgICAgKVxuXG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoZXJyb3IpXG4gICAgICAgIH1cblxuICAgICAgICBhd2FpdCB0aGlzLm9wdGlvbnMub25FcnJvcj8uKFxuICAgICAgICAgIGVycm9yIGFzIFRFcnJvcixcbiAgICAgICAgICB0aGlzLnN0YXRlLnZhcmlhYmxlcyEsXG4gICAgICAgICAgdGhpcy5zdGF0ZS5jb250ZXh0LFxuICAgICAgICApXG5cbiAgICAgICAgLy8gTm90aWZ5IGNhY2hlIGNhbGxiYWNrXG4gICAgICAgIGF3YWl0IHRoaXMubXV0YXRpb25DYWNoZS5jb25maWcub25TZXR0bGVkPy4oXG4gICAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICAgIGVycm9yLFxuICAgICAgICAgIHRoaXMuc3RhdGUudmFyaWFibGVzLFxuICAgICAgICAgIHRoaXMuc3RhdGUuY29udGV4dCxcbiAgICAgICAgICB0aGlzIGFzIE11dGF0aW9uPHVua25vd24sIHVua25vd24sIHVua25vd24sIHVua25vd24+LFxuICAgICAgICApXG5cbiAgICAgICAgYXdhaXQgdGhpcy5vcHRpb25zLm9uU2V0dGxlZD8uKFxuICAgICAgICAgIHVuZGVmaW5lZCxcbiAgICAgICAgICBlcnJvciBhcyBURXJyb3IsXG4gICAgICAgICAgdGhpcy5zdGF0ZS52YXJpYWJsZXMhLFxuICAgICAgICAgIHRoaXMuc3RhdGUuY29udGV4dCxcbiAgICAgICAgKVxuICAgICAgICB0aHJvdyBlcnJvclxuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgdGhpcy5kaXNwYXRjaCh7IHR5cGU6ICdlcnJvcicsIGVycm9yOiBlcnJvciBhcyBURXJyb3IgfSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGRpc3BhdGNoKGFjdGlvbjogQWN0aW9uPFREYXRhLCBURXJyb3IsIFRWYXJpYWJsZXMsIFRDb250ZXh0Pik6IHZvaWQge1xuICAgIGNvbnN0IHJlZHVjZXIgPSAoXG4gICAgICBzdGF0ZTogTXV0YXRpb25TdGF0ZTxURGF0YSwgVEVycm9yLCBUVmFyaWFibGVzLCBUQ29udGV4dD4sXG4gICAgKTogTXV0YXRpb25TdGF0ZTxURGF0YSwgVEVycm9yLCBUVmFyaWFibGVzLCBUQ29udGV4dD4gPT4ge1xuICAgICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlICdmYWlsZWQnOlxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICAgIGZhaWx1cmVDb3VudDogYWN0aW9uLmZhaWx1cmVDb3VudCxcbiAgICAgICAgICAgIGZhaWx1cmVSZWFzb246IGFjdGlvbi5lcnJvcixcbiAgICAgICAgICB9XG4gICAgICAgIGNhc2UgJ3BhdXNlJzpcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgICBpc1BhdXNlZDogdHJ1ZSxcbiAgICAgICAgICB9XG4gICAgICAgIGNhc2UgJ2NvbnRpbnVlJzpcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgICBpc1BhdXNlZDogZmFsc2UsXG4gICAgICAgICAgfVxuICAgICAgICBjYXNlICdsb2FkaW5nJzpcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgICBjb250ZXh0OiBhY3Rpb24uY29udGV4dCxcbiAgICAgICAgICAgIGRhdGE6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGZhaWx1cmVDb3VudDogMCxcbiAgICAgICAgICAgIGZhaWx1cmVSZWFzb246IG51bGwsXG4gICAgICAgICAgICBlcnJvcjogbnVsbCxcbiAgICAgICAgICAgIGlzUGF1c2VkOiAhY2FuRmV0Y2godGhpcy5vcHRpb25zLm5ldHdvcmtNb2RlKSxcbiAgICAgICAgICAgIHN0YXR1czogJ2xvYWRpbmcnLFxuICAgICAgICAgICAgdmFyaWFibGVzOiBhY3Rpb24udmFyaWFibGVzLFxuICAgICAgICAgIH1cbiAgICAgICAgY2FzZSAnc3VjY2Vzcyc6XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgICAgZGF0YTogYWN0aW9uLmRhdGEsXG4gICAgICAgICAgICBmYWlsdXJlQ291bnQ6IDAsXG4gICAgICAgICAgICBmYWlsdXJlUmVhc29uOiBudWxsLFxuICAgICAgICAgICAgZXJyb3I6IG51bGwsXG4gICAgICAgICAgICBzdGF0dXM6ICdzdWNjZXNzJyxcbiAgICAgICAgICAgIGlzUGF1c2VkOiBmYWxzZSxcbiAgICAgICAgICB9XG4gICAgICAgIGNhc2UgJ2Vycm9yJzpcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgICBkYXRhOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBlcnJvcjogYWN0aW9uLmVycm9yLFxuICAgICAgICAgICAgZmFpbHVyZUNvdW50OiBzdGF0ZS5mYWlsdXJlQ291bnQgKyAxLFxuICAgICAgICAgICAgZmFpbHVyZVJlYXNvbjogYWN0aW9uLmVycm9yLFxuICAgICAgICAgICAgaXNQYXVzZWQ6IGZhbHNlLFxuICAgICAgICAgICAgc3RhdHVzOiAnZXJyb3InLFxuICAgICAgICAgIH1cbiAgICAgICAgY2FzZSAnc2V0U3RhdGUnOlxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICAgIC4uLmFjdGlvbi5zdGF0ZSxcbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuc3RhdGUgPSByZWR1Y2VyKHRoaXMuc3RhdGUpXG5cbiAgICBub3RpZnlNYW5hZ2VyLmJhdGNoKCgpID0+IHtcbiAgICAgIHRoaXMub2JzZXJ2ZXJzLmZvckVhY2goKG9ic2VydmVyKSA9PiB7XG4gICAgICAgIG9ic2VydmVyLm9uTXV0YXRpb25VcGRhdGUoYWN0aW9uKVxuICAgICAgfSlcbiAgICAgIHRoaXMubXV0YXRpb25DYWNoZS5ub3RpZnkoe1xuICAgICAgICBtdXRhdGlvbjogdGhpcyxcbiAgICAgICAgdHlwZTogJ3VwZGF0ZWQnLFxuICAgICAgICBhY3Rpb24sXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldERlZmF1bHRTdGF0ZTxcbiAgVERhdGEsXG4gIFRFcnJvcixcbiAgVFZhcmlhYmxlcyxcbiAgVENvbnRleHQsXG4+KCk6IE11dGF0aW9uU3RhdGU8VERhdGEsIFRFcnJvciwgVFZhcmlhYmxlcywgVENvbnRleHQ+IHtcbiAgcmV0dXJuIHtcbiAgICBjb250ZXh0OiB1bmRlZmluZWQsXG4gICAgZGF0YTogdW5kZWZpbmVkLFxuICAgIGVycm9yOiBudWxsLFxuICAgIGZhaWx1cmVDb3VudDogMCxcbiAgICBmYWlsdXJlUmVhc29uOiBudWxsLFxuICAgIGlzUGF1c2VkOiBmYWxzZSxcbiAgICBzdGF0dXM6ICdpZGxlJyxcbiAgICB2YXJpYWJsZXM6IHVuZGVmaW5lZCxcbiAgfVxufVxuIiwgImltcG9ydCB7IG5vdGlmeU1hbmFnZXIgfSBmcm9tICcuL25vdGlmeU1hbmFnZXInXG5pbXBvcnQgeyBNdXRhdGlvbiB9IGZyb20gJy4vbXV0YXRpb24nXG5pbXBvcnQgeyBtYXRjaE11dGF0aW9uLCBub29wIH0gZnJvbSAnLi91dGlscydcbmltcG9ydCB7IFN1YnNjcmliYWJsZSB9IGZyb20gJy4vc3Vic2NyaWJhYmxlJ1xuaW1wb3J0IHR5cGUgeyBNdXRhdGlvbk9ic2VydmVyIH0gZnJvbSAnLi9tdXRhdGlvbk9ic2VydmVyJ1xuaW1wb3J0IHR5cGUgeyBNdXRhdGlvbk9wdGlvbnMsIE5vdGlmeUV2ZW50IH0gZnJvbSAnLi90eXBlcydcbmltcG9ydCB0eXBlIHsgUXVlcnlDbGllbnQgfSBmcm9tICcuL3F1ZXJ5Q2xpZW50J1xuaW1wb3J0IHR5cGUgeyBBY3Rpb24sIE11dGF0aW9uU3RhdGUgfSBmcm9tICcuL211dGF0aW9uJ1xuaW1wb3J0IHR5cGUgeyBNdXRhdGlvbkZpbHRlcnMgfSBmcm9tICcuL3V0aWxzJ1xuXG4vLyBUWVBFU1xuXG5pbnRlcmZhY2UgTXV0YXRpb25DYWNoZUNvbmZpZyB7XG4gIG9uRXJyb3I/OiAoXG4gICAgZXJyb3I6IHVua25vd24sXG4gICAgdmFyaWFibGVzOiB1bmtub3duLFxuICAgIGNvbnRleHQ6IHVua25vd24sXG4gICAgbXV0YXRpb246IE11dGF0aW9uPHVua25vd24sIHVua25vd24sIHVua25vd24+LFxuICApID0+IFByb21pc2U8dW5rbm93bj4gfCB1bmtub3duXG4gIG9uU3VjY2Vzcz86IChcbiAgICBkYXRhOiB1bmtub3duLFxuICAgIHZhcmlhYmxlczogdW5rbm93bixcbiAgICBjb250ZXh0OiB1bmtub3duLFxuICAgIG11dGF0aW9uOiBNdXRhdGlvbjx1bmtub3duLCB1bmtub3duLCB1bmtub3duPixcbiAgKSA9PiBQcm9taXNlPHVua25vd24+IHwgdW5rbm93blxuICBvbk11dGF0ZT86IChcbiAgICB2YXJpYWJsZXM6IHVua25vd24sXG4gICAgbXV0YXRpb246IE11dGF0aW9uPHVua25vd24sIHVua25vd24sIHVua25vd24+LFxuICApID0+IFByb21pc2U8dW5rbm93bj4gfCB1bmtub3duXG4gIG9uU2V0dGxlZD86IChcbiAgICBkYXRhOiB1bmtub3duIHwgdW5kZWZpbmVkLFxuICAgIGVycm9yOiB1bmtub3duIHwgbnVsbCxcbiAgICB2YXJpYWJsZXM6IHVua25vd24sXG4gICAgY29udGV4dDogdW5rbm93bixcbiAgICBtdXRhdGlvbjogTXV0YXRpb248dW5rbm93biwgdW5rbm93biwgdW5rbm93bj4sXG4gICkgPT4gUHJvbWlzZTx1bmtub3duPiB8IHVua25vd25cbn1cblxuaW50ZXJmYWNlIE5vdGlmeUV2ZW50TXV0YXRpb25BZGRlZCBleHRlbmRzIE5vdGlmeUV2ZW50IHtcbiAgdHlwZTogJ2FkZGVkJ1xuICBtdXRhdGlvbjogTXV0YXRpb248YW55LCBhbnksIGFueSwgYW55PlxufVxuaW50ZXJmYWNlIE5vdGlmeUV2ZW50TXV0YXRpb25SZW1vdmVkIGV4dGVuZHMgTm90aWZ5RXZlbnQge1xuICB0eXBlOiAncmVtb3ZlZCdcbiAgbXV0YXRpb246IE11dGF0aW9uPGFueSwgYW55LCBhbnksIGFueT5cbn1cblxuaW50ZXJmYWNlIE5vdGlmeUV2ZW50TXV0YXRpb25PYnNlcnZlckFkZGVkIGV4dGVuZHMgTm90aWZ5RXZlbnQge1xuICB0eXBlOiAnb2JzZXJ2ZXJBZGRlZCdcbiAgbXV0YXRpb246IE11dGF0aW9uPGFueSwgYW55LCBhbnksIGFueT5cbiAgb2JzZXJ2ZXI6IE11dGF0aW9uT2JzZXJ2ZXI8YW55LCBhbnksIGFueT5cbn1cblxuaW50ZXJmYWNlIE5vdGlmeUV2ZW50TXV0YXRpb25PYnNlcnZlclJlbW92ZWQgZXh0ZW5kcyBOb3RpZnlFdmVudCB7XG4gIHR5cGU6ICdvYnNlcnZlclJlbW92ZWQnXG4gIG11dGF0aW9uOiBNdXRhdGlvbjxhbnksIGFueSwgYW55LCBhbnk+XG4gIG9ic2VydmVyOiBNdXRhdGlvbk9ic2VydmVyPGFueSwgYW55LCBhbnk+XG59XG5cbmludGVyZmFjZSBOb3RpZnlFdmVudE11dGF0aW9uT2JzZXJ2ZXJPcHRpb25zVXBkYXRlZCBleHRlbmRzIE5vdGlmeUV2ZW50IHtcbiAgdHlwZTogJ29ic2VydmVyT3B0aW9uc1VwZGF0ZWQnXG4gIG11dGF0aW9uPzogTXV0YXRpb248YW55LCBhbnksIGFueSwgYW55PlxuICBvYnNlcnZlcjogTXV0YXRpb25PYnNlcnZlcjxhbnksIGFueSwgYW55LCBhbnk+XG59XG5cbmludGVyZmFjZSBOb3RpZnlFdmVudE11dGF0aW9uVXBkYXRlZCBleHRlbmRzIE5vdGlmeUV2ZW50IHtcbiAgdHlwZTogJ3VwZGF0ZWQnXG4gIG11dGF0aW9uOiBNdXRhdGlvbjxhbnksIGFueSwgYW55LCBhbnk+XG4gIGFjdGlvbjogQWN0aW9uPGFueSwgYW55LCBhbnksIGFueT5cbn1cblxudHlwZSBNdXRhdGlvbkNhY2hlTm90aWZ5RXZlbnQgPVxuICB8IE5vdGlmeUV2ZW50TXV0YXRpb25BZGRlZFxuICB8IE5vdGlmeUV2ZW50TXV0YXRpb25SZW1vdmVkXG4gIHwgTm90aWZ5RXZlbnRNdXRhdGlvbk9ic2VydmVyQWRkZWRcbiAgfCBOb3RpZnlFdmVudE11dGF0aW9uT2JzZXJ2ZXJSZW1vdmVkXG4gIHwgTm90aWZ5RXZlbnRNdXRhdGlvbk9ic2VydmVyT3B0aW9uc1VwZGF0ZWRcbiAgfCBOb3RpZnlFdmVudE11dGF0aW9uVXBkYXRlZFxuXG50eXBlIE11dGF0aW9uQ2FjaGVMaXN0ZW5lciA9IChldmVudDogTXV0YXRpb25DYWNoZU5vdGlmeUV2ZW50KSA9PiB2b2lkXG5cbi8vIENMQVNTXG5cbmV4cG9ydCBjbGFzcyBNdXRhdGlvbkNhY2hlIGV4dGVuZHMgU3Vic2NyaWJhYmxlPE11dGF0aW9uQ2FjaGVMaXN0ZW5lcj4ge1xuICBjb25maWc6IE11dGF0aW9uQ2FjaGVDb25maWdcblxuICBwcml2YXRlIG11dGF0aW9uczogTXV0YXRpb248YW55LCBhbnksIGFueSwgYW55PltdXG4gIHByaXZhdGUgbXV0YXRpb25JZDogbnVtYmVyXG4gIHByaXZhdGUgcmVzdW1pbmc6IFByb21pc2U8dW5rbm93bj4gfCB1bmRlZmluZWRcblxuICBjb25zdHJ1Y3Rvcihjb25maWc/OiBNdXRhdGlvbkNhY2hlQ29uZmlnKSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMuY29uZmlnID0gY29uZmlnIHx8IHt9XG4gICAgdGhpcy5tdXRhdGlvbnMgPSBbXVxuICAgIHRoaXMubXV0YXRpb25JZCA9IDBcbiAgfVxuXG4gIGJ1aWxkPFREYXRhLCBURXJyb3IsIFRWYXJpYWJsZXMsIFRDb250ZXh0PihcbiAgICBjbGllbnQ6IFF1ZXJ5Q2xpZW50LFxuICAgIG9wdGlvbnM6IE11dGF0aW9uT3B0aW9uczxURGF0YSwgVEVycm9yLCBUVmFyaWFibGVzLCBUQ29udGV4dD4sXG4gICAgc3RhdGU/OiBNdXRhdGlvblN0YXRlPFREYXRhLCBURXJyb3IsIFRWYXJpYWJsZXMsIFRDb250ZXh0PixcbiAgKTogTXV0YXRpb248VERhdGEsIFRFcnJvciwgVFZhcmlhYmxlcywgVENvbnRleHQ+IHtcbiAgICBjb25zdCBtdXRhdGlvbiA9IG5ldyBNdXRhdGlvbih7XG4gICAgICBtdXRhdGlvbkNhY2hlOiB0aGlzLFxuICAgICAgbG9nZ2VyOiBjbGllbnQuZ2V0TG9nZ2VyKCksXG4gICAgICBtdXRhdGlvbklkOiArK3RoaXMubXV0YXRpb25JZCxcbiAgICAgIG9wdGlvbnM6IGNsaWVudC5kZWZhdWx0TXV0YXRpb25PcHRpb25zKG9wdGlvbnMpLFxuICAgICAgc3RhdGUsXG4gICAgICBkZWZhdWx0T3B0aW9uczogb3B0aW9ucy5tdXRhdGlvbktleVxuICAgICAgICA/IGNsaWVudC5nZXRNdXRhdGlvbkRlZmF1bHRzKG9wdGlvbnMubXV0YXRpb25LZXkpXG4gICAgICAgIDogdW5kZWZpbmVkLFxuICAgIH0pXG5cbiAgICB0aGlzLmFkZChtdXRhdGlvbilcblxuICAgIHJldHVybiBtdXRhdGlvblxuICB9XG5cbiAgYWRkKG11dGF0aW9uOiBNdXRhdGlvbjxhbnksIGFueSwgYW55LCBhbnk+KTogdm9pZCB7XG4gICAgdGhpcy5tdXRhdGlvbnMucHVzaChtdXRhdGlvbilcbiAgICB0aGlzLm5vdGlmeSh7IHR5cGU6ICdhZGRlZCcsIG11dGF0aW9uIH0pXG4gIH1cblxuICByZW1vdmUobXV0YXRpb246IE11dGF0aW9uPGFueSwgYW55LCBhbnksIGFueT4pOiB2b2lkIHtcbiAgICB0aGlzLm11dGF0aW9ucyA9IHRoaXMubXV0YXRpb25zLmZpbHRlcigoeCkgPT4geCAhPT0gbXV0YXRpb24pXG4gICAgdGhpcy5ub3RpZnkoeyB0eXBlOiAncmVtb3ZlZCcsIG11dGF0aW9uIH0pXG4gIH1cblxuICBjbGVhcigpOiB2b2lkIHtcbiAgICBub3RpZnlNYW5hZ2VyLmJhdGNoKCgpID0+IHtcbiAgICAgIHRoaXMubXV0YXRpb25zLmZvckVhY2goKG11dGF0aW9uKSA9PiB7XG4gICAgICAgIHRoaXMucmVtb3ZlKG11dGF0aW9uKVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgZ2V0QWxsKCk6IE11dGF0aW9uW10ge1xuICAgIHJldHVybiB0aGlzLm11dGF0aW9uc1xuICB9XG5cbiAgZmluZDxURGF0YSA9IHVua25vd24sIFRFcnJvciA9IHVua25vd24sIFRWYXJpYWJsZXMgPSBhbnksIFRDb250ZXh0ID0gdW5rbm93bj4oXG4gICAgZmlsdGVyczogTXV0YXRpb25GaWx0ZXJzLFxuICApOiBNdXRhdGlvbjxURGF0YSwgVEVycm9yLCBUVmFyaWFibGVzLCBUQ29udGV4dD4gfCB1bmRlZmluZWQge1xuICAgIGlmICh0eXBlb2YgZmlsdGVycy5leGFjdCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGZpbHRlcnMuZXhhY3QgPSB0cnVlXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMubXV0YXRpb25zLmZpbmQoKG11dGF0aW9uKSA9PiBtYXRjaE11dGF0aW9uKGZpbHRlcnMsIG11dGF0aW9uKSlcbiAgfVxuXG4gIGZpbmRBbGwoZmlsdGVyczogTXV0YXRpb25GaWx0ZXJzKTogTXV0YXRpb25bXSB7XG4gICAgcmV0dXJuIHRoaXMubXV0YXRpb25zLmZpbHRlcigobXV0YXRpb24pID0+IG1hdGNoTXV0YXRpb24oZmlsdGVycywgbXV0YXRpb24pKVxuICB9XG5cbiAgbm90aWZ5KGV2ZW50OiBNdXRhdGlvbkNhY2hlTm90aWZ5RXZlbnQpIHtcbiAgICBub3RpZnlNYW5hZ2VyLmJhdGNoKCgpID0+IHtcbiAgICAgIHRoaXMubGlzdGVuZXJzLmZvckVhY2goKHsgbGlzdGVuZXIgfSkgPT4ge1xuICAgICAgICBsaXN0ZW5lcihldmVudClcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIHJlc3VtZVBhdXNlZE11dGF0aW9ucygpOiBQcm9taXNlPHVua25vd24+IHtcbiAgICB0aGlzLnJlc3VtaW5nID0gKHRoaXMucmVzdW1pbmcgPz8gUHJvbWlzZS5yZXNvbHZlKCkpXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIGNvbnN0IHBhdXNlZE11dGF0aW9ucyA9IHRoaXMubXV0YXRpb25zLmZpbHRlcigoeCkgPT4geC5zdGF0ZS5pc1BhdXNlZClcbiAgICAgICAgcmV0dXJuIG5vdGlmeU1hbmFnZXIuYmF0Y2goKCkgPT5cbiAgICAgICAgICBwYXVzZWRNdXRhdGlvbnMucmVkdWNlKFxuICAgICAgICAgICAgKHByb21pc2UsIG11dGF0aW9uKSA9PlxuICAgICAgICAgICAgICBwcm9taXNlLnRoZW4oKCkgPT4gbXV0YXRpb24uY29udGludWUoKS5jYXRjaChub29wKSksXG4gICAgICAgICAgICBQcm9taXNlLnJlc29sdmUoKSBhcyBQcm9taXNlPHVua25vd24+LFxuICAgICAgICAgICksXG4gICAgICAgIClcbiAgICAgIH0pXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMucmVzdW1pbmcgPSB1bmRlZmluZWRcbiAgICAgIH0pXG5cbiAgICByZXR1cm4gdGhpcy5yZXN1bWluZ1xuICB9XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBRdWVyeUJlaGF2aW9yIH0gZnJvbSAnLi9xdWVyeSdcblxuaW1wb3J0IHR5cGUge1xuICBJbmZpbml0ZURhdGEsXG4gIFF1ZXJ5RnVuY3Rpb25Db250ZXh0LFxuICBRdWVyeU9wdGlvbnMsXG4gIFJlZmV0Y2hRdWVyeUZpbHRlcnMsXG59IGZyb20gJy4vdHlwZXMnXG5cbmV4cG9ydCBmdW5jdGlvbiBpbmZpbml0ZVF1ZXJ5QmVoYXZpb3I8XG4gIFRRdWVyeUZuRGF0YSxcbiAgVEVycm9yLFxuICBURGF0YSxcbj4oKTogUXVlcnlCZWhhdmlvcjxUUXVlcnlGbkRhdGEsIFRFcnJvciwgSW5maW5pdGVEYXRhPFREYXRhPj4ge1xuICByZXR1cm4ge1xuICAgIG9uRmV0Y2g6IChjb250ZXh0KSA9PiB7XG4gICAgICBjb250ZXh0LmZldGNoRm4gPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlZmV0Y2hQYWdlOiBSZWZldGNoUXVlcnlGaWx0ZXJzWydyZWZldGNoUGFnZSddIHwgdW5kZWZpbmVkID1cbiAgICAgICAgICBjb250ZXh0LmZldGNoT3B0aW9ucz8ubWV0YT8ucmVmZXRjaFBhZ2VcbiAgICAgICAgY29uc3QgZmV0Y2hNb3JlID0gY29udGV4dC5mZXRjaE9wdGlvbnM/Lm1ldGE/LmZldGNoTW9yZVxuICAgICAgICBjb25zdCBwYWdlUGFyYW0gPSBmZXRjaE1vcmU/LnBhZ2VQYXJhbVxuICAgICAgICBjb25zdCBpc0ZldGNoaW5nTmV4dFBhZ2UgPSBmZXRjaE1vcmU/LmRpcmVjdGlvbiA9PT0gJ2ZvcndhcmQnXG4gICAgICAgIGNvbnN0IGlzRmV0Y2hpbmdQcmV2aW91c1BhZ2UgPSBmZXRjaE1vcmU/LmRpcmVjdGlvbiA9PT0gJ2JhY2t3YXJkJ1xuICAgICAgICBjb25zdCBvbGRQYWdlcyA9IGNvbnRleHQuc3RhdGUuZGF0YT8ucGFnZXMgfHwgW11cbiAgICAgICAgY29uc3Qgb2xkUGFnZVBhcmFtcyA9IGNvbnRleHQuc3RhdGUuZGF0YT8ucGFnZVBhcmFtcyB8fCBbXVxuICAgICAgICBsZXQgbmV3UGFnZVBhcmFtcyA9IG9sZFBhZ2VQYXJhbXNcbiAgICAgICAgbGV0IGNhbmNlbGxlZCA9IGZhbHNlXG5cbiAgICAgICAgY29uc3QgYWRkU2lnbmFsUHJvcGVydHkgPSAob2JqZWN0OiB1bmtub3duKSA9PiB7XG4gICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iamVjdCwgJ3NpZ25hbCcsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBnZXQ6ICgpID0+IHtcbiAgICAgICAgICAgICAgaWYgKGNvbnRleHQuc2lnbmFsPy5hYm9ydGVkKSB7XG4gICAgICAgICAgICAgICAgY2FuY2VsbGVkID0gdHJ1ZVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnRleHQuc2lnbmFsPy5hZGRFdmVudExpc3RlbmVyKCdhYm9ydCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgIGNhbmNlbGxlZCA9IHRydWVcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiBjb250ZXh0LnNpZ25hbFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gR2V0IHF1ZXJ5IGZ1bmN0aW9uXG4gICAgICAgIGNvbnN0IHF1ZXJ5Rm4gPVxuICAgICAgICAgIGNvbnRleHQub3B0aW9ucy5xdWVyeUZuIHx8XG4gICAgICAgICAgKCgpID0+XG4gICAgICAgICAgICBQcm9taXNlLnJlamVjdChcbiAgICAgICAgICAgICAgYE1pc3NpbmcgcXVlcnlGbiBmb3IgcXVlcnlLZXkgJyR7Y29udGV4dC5vcHRpb25zLnF1ZXJ5SGFzaH0nYCxcbiAgICAgICAgICAgICkpXG5cbiAgICAgICAgY29uc3QgYnVpbGROZXdQYWdlcyA9IChcbiAgICAgICAgICBwYWdlczogdW5rbm93bltdLFxuICAgICAgICAgIHBhcmFtOiB1bmtub3duLFxuICAgICAgICAgIHBhZ2U6IHVua25vd24sXG4gICAgICAgICAgcHJldmlvdXM/OiBib29sZWFuLFxuICAgICAgICApID0+IHtcbiAgICAgICAgICBuZXdQYWdlUGFyYW1zID0gcHJldmlvdXNcbiAgICAgICAgICAgID8gW3BhcmFtLCAuLi5uZXdQYWdlUGFyYW1zXVxuICAgICAgICAgICAgOiBbLi4ubmV3UGFnZVBhcmFtcywgcGFyYW1dXG4gICAgICAgICAgcmV0dXJuIHByZXZpb3VzID8gW3BhZ2UsIC4uLnBhZ2VzXSA6IFsuLi5wYWdlcywgcGFnZV1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENyZWF0ZSBmdW5jdGlvbiB0byBmZXRjaCBhIHBhZ2VcbiAgICAgICAgY29uc3QgZmV0Y2hQYWdlID0gKFxuICAgICAgICAgIHBhZ2VzOiB1bmtub3duW10sXG4gICAgICAgICAgbWFudWFsPzogYm9vbGVhbixcbiAgICAgICAgICBwYXJhbT86IHVua25vd24sXG4gICAgICAgICAgcHJldmlvdXM/OiBib29sZWFuLFxuICAgICAgICApOiBQcm9taXNlPHVua25vd25bXT4gPT4ge1xuICAgICAgICAgIGlmIChjYW5jZWxsZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgnQ2FuY2VsbGVkJylcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodHlwZW9mIHBhcmFtID09PSAndW5kZWZpbmVkJyAmJiAhbWFudWFsICYmIHBhZ2VzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShwYWdlcylcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBxdWVyeUZuQ29udGV4dDogUXVlcnlGdW5jdGlvbkNvbnRleHQgPSB7XG4gICAgICAgICAgICBxdWVyeUtleTogY29udGV4dC5xdWVyeUtleSxcbiAgICAgICAgICAgIHBhZ2VQYXJhbTogcGFyYW0sXG4gICAgICAgICAgICBtZXRhOiBjb250ZXh0Lm9wdGlvbnMubWV0YSxcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBhZGRTaWduYWxQcm9wZXJ0eShxdWVyeUZuQ29udGV4dClcblxuICAgICAgICAgIGNvbnN0IHF1ZXJ5Rm5SZXN1bHQgPSBxdWVyeUZuKHF1ZXJ5Rm5Db250ZXh0KVxuXG4gICAgICAgICAgY29uc3QgcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZShxdWVyeUZuUmVzdWx0KS50aGVuKChwYWdlKSA9PlxuICAgICAgICAgICAgYnVpbGROZXdQYWdlcyhwYWdlcywgcGFyYW0sIHBhZ2UsIHByZXZpb3VzKSxcbiAgICAgICAgICApXG5cbiAgICAgICAgICByZXR1cm4gcHJvbWlzZVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHByb21pc2U6IFByb21pc2U8dW5rbm93bltdPlxuXG4gICAgICAgIC8vIEZldGNoIGZpcnN0IHBhZ2U/XG4gICAgICAgIGlmICghb2xkUGFnZXMubGVuZ3RoKSB7XG4gICAgICAgICAgcHJvbWlzZSA9IGZldGNoUGFnZShbXSlcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZldGNoIG5leHQgcGFnZT9cbiAgICAgICAgZWxzZSBpZiAoaXNGZXRjaGluZ05leHRQYWdlKSB7XG4gICAgICAgICAgY29uc3QgbWFudWFsID0gdHlwZW9mIHBhZ2VQYXJhbSAhPT0gJ3VuZGVmaW5lZCdcbiAgICAgICAgICBjb25zdCBwYXJhbSA9IG1hbnVhbFxuICAgICAgICAgICAgPyBwYWdlUGFyYW1cbiAgICAgICAgICAgIDogZ2V0TmV4dFBhZ2VQYXJhbShjb250ZXh0Lm9wdGlvbnMsIG9sZFBhZ2VzKVxuICAgICAgICAgIHByb21pc2UgPSBmZXRjaFBhZ2Uob2xkUGFnZXMsIG1hbnVhbCwgcGFyYW0pXG4gICAgICAgIH1cblxuICAgICAgICAvLyBGZXRjaCBwcmV2aW91cyBwYWdlP1xuICAgICAgICBlbHNlIGlmIChpc0ZldGNoaW5nUHJldmlvdXNQYWdlKSB7XG4gICAgICAgICAgY29uc3QgbWFudWFsID0gdHlwZW9mIHBhZ2VQYXJhbSAhPT0gJ3VuZGVmaW5lZCdcbiAgICAgICAgICBjb25zdCBwYXJhbSA9IG1hbnVhbFxuICAgICAgICAgICAgPyBwYWdlUGFyYW1cbiAgICAgICAgICAgIDogZ2V0UHJldmlvdXNQYWdlUGFyYW0oY29udGV4dC5vcHRpb25zLCBvbGRQYWdlcylcbiAgICAgICAgICBwcm9taXNlID0gZmV0Y2hQYWdlKG9sZFBhZ2VzLCBtYW51YWwsIHBhcmFtLCB0cnVlKVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gUmVmZXRjaCBwYWdlc1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBuZXdQYWdlUGFyYW1zID0gW11cblxuICAgICAgICAgIGNvbnN0IG1hbnVhbCA9IHR5cGVvZiBjb250ZXh0Lm9wdGlvbnMuZ2V0TmV4dFBhZ2VQYXJhbSA9PT0gJ3VuZGVmaW5lZCdcblxuICAgICAgICAgIGNvbnN0IHNob3VsZEZldGNoRmlyc3RQYWdlID1cbiAgICAgICAgICAgIHJlZmV0Y2hQYWdlICYmIG9sZFBhZ2VzWzBdXG4gICAgICAgICAgICAgID8gcmVmZXRjaFBhZ2Uob2xkUGFnZXNbMF0sIDAsIG9sZFBhZ2VzKVxuICAgICAgICAgICAgICA6IHRydWVcblxuICAgICAgICAgIC8vIEZldGNoIGZpcnN0IHBhZ2VcbiAgICAgICAgICBwcm9taXNlID0gc2hvdWxkRmV0Y2hGaXJzdFBhZ2VcbiAgICAgICAgICAgID8gZmV0Y2hQYWdlKFtdLCBtYW51YWwsIG9sZFBhZ2VQYXJhbXNbMF0pXG4gICAgICAgICAgICA6IFByb21pc2UucmVzb2x2ZShidWlsZE5ld1BhZ2VzKFtdLCBvbGRQYWdlUGFyYW1zWzBdLCBvbGRQYWdlc1swXSkpXG5cbiAgICAgICAgICAvLyBGZXRjaCByZW1haW5pbmcgcGFnZXNcbiAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IG9sZFBhZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBwcm9taXNlID0gcHJvbWlzZS50aGVuKChwYWdlcykgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBzaG91bGRGZXRjaE5leHRQYWdlID1cbiAgICAgICAgICAgICAgICByZWZldGNoUGFnZSAmJiBvbGRQYWdlc1tpXVxuICAgICAgICAgICAgICAgICAgPyByZWZldGNoUGFnZShvbGRQYWdlc1tpXSwgaSwgb2xkUGFnZXMpXG4gICAgICAgICAgICAgICAgICA6IHRydWVcblxuICAgICAgICAgICAgICBpZiAoc2hvdWxkRmV0Y2hOZXh0UGFnZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBhcmFtID0gbWFudWFsXG4gICAgICAgICAgICAgICAgICA/IG9sZFBhZ2VQYXJhbXNbaV1cbiAgICAgICAgICAgICAgICAgIDogZ2V0TmV4dFBhZ2VQYXJhbShjb250ZXh0Lm9wdGlvbnMsIHBhZ2VzKVxuICAgICAgICAgICAgICAgIHJldHVybiBmZXRjaFBhZ2UocGFnZXMsIG1hbnVhbCwgcGFyYW0pXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShcbiAgICAgICAgICAgICAgICBidWlsZE5ld1BhZ2VzKHBhZ2VzLCBvbGRQYWdlUGFyYW1zW2ldLCBvbGRQYWdlc1tpXSksXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZmluYWxQcm9taXNlID0gcHJvbWlzZS50aGVuKChwYWdlcykgPT4gKHtcbiAgICAgICAgICBwYWdlcyxcbiAgICAgICAgICBwYWdlUGFyYW1zOiBuZXdQYWdlUGFyYW1zLFxuICAgICAgICB9KSlcblxuICAgICAgICByZXR1cm4gZmluYWxQcm9taXNlXG4gICAgICB9XG4gICAgfSxcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TmV4dFBhZ2VQYXJhbShcbiAgb3B0aW9uczogUXVlcnlPcHRpb25zPGFueSwgYW55PixcbiAgcGFnZXM6IHVua25vd25bXSxcbik6IHVua25vd24gfCB1bmRlZmluZWQge1xuICByZXR1cm4gb3B0aW9ucy5nZXROZXh0UGFnZVBhcmFtPy4ocGFnZXNbcGFnZXMubGVuZ3RoIC0gMV0sIHBhZ2VzKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UHJldmlvdXNQYWdlUGFyYW0oXG4gIG9wdGlvbnM6IFF1ZXJ5T3B0aW9uczxhbnksIGFueT4sXG4gIHBhZ2VzOiB1bmtub3duW10sXG4pOiB1bmtub3duIHwgdW5kZWZpbmVkIHtcbiAgcmV0dXJuIG9wdGlvbnMuZ2V0UHJldmlvdXNQYWdlUGFyYW0/LihwYWdlc1swXSwgcGFnZXMpXG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIHRoZXJlIGlzIGEgbmV4dCBwYWdlLlxuICogUmV0dXJucyBgdW5kZWZpbmVkYCBpZiBpdCBjYW5ub3QgYmUgZGV0ZXJtaW5lZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhhc05leHRQYWdlKFxuICBvcHRpb25zOiBRdWVyeU9wdGlvbnM8YW55LCBhbnksIGFueSwgYW55PixcbiAgcGFnZXM/OiB1bmtub3duLFxuKTogYm9vbGVhbiB8IHVuZGVmaW5lZCB7XG4gIGlmIChvcHRpb25zLmdldE5leHRQYWdlUGFyYW0gJiYgQXJyYXkuaXNBcnJheShwYWdlcykpIHtcbiAgICBjb25zdCBuZXh0UGFnZVBhcmFtID0gZ2V0TmV4dFBhZ2VQYXJhbShvcHRpb25zLCBwYWdlcylcbiAgICByZXR1cm4gKFxuICAgICAgdHlwZW9mIG5leHRQYWdlUGFyYW0gIT09ICd1bmRlZmluZWQnICYmXG4gICAgICBuZXh0UGFnZVBhcmFtICE9PSBudWxsICYmXG4gICAgICBuZXh0UGFnZVBhcmFtICE9PSBmYWxzZVxuICAgIClcbiAgfVxuICByZXR1cm5cbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgdGhlcmUgaXMgYSBwcmV2aW91cyBwYWdlLlxuICogUmV0dXJucyBgdW5kZWZpbmVkYCBpZiBpdCBjYW5ub3QgYmUgZGV0ZXJtaW5lZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhhc1ByZXZpb3VzUGFnZShcbiAgb3B0aW9uczogUXVlcnlPcHRpb25zPGFueSwgYW55LCBhbnksIGFueT4sXG4gIHBhZ2VzPzogdW5rbm93bixcbik6IGJvb2xlYW4gfCB1bmRlZmluZWQge1xuICBpZiAob3B0aW9ucy5nZXRQcmV2aW91c1BhZ2VQYXJhbSAmJiBBcnJheS5pc0FycmF5KHBhZ2VzKSkge1xuICAgIGNvbnN0IHByZXZpb3VzUGFnZVBhcmFtID0gZ2V0UHJldmlvdXNQYWdlUGFyYW0ob3B0aW9ucywgcGFnZXMpXG4gICAgcmV0dXJuIChcbiAgICAgIHR5cGVvZiBwcmV2aW91c1BhZ2VQYXJhbSAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgIHByZXZpb3VzUGFnZVBhcmFtICE9PSBudWxsICYmXG4gICAgICBwcmV2aW91c1BhZ2VQYXJhbSAhPT0gZmFsc2VcbiAgICApXG4gIH1cbiAgcmV0dXJuXG59XG4iLCAiaW1wb3J0IHtcbiAgZnVuY3Rpb25hbFVwZGF0ZSxcbiAgaGFzaFF1ZXJ5S2V5LFxuICBoYXNoUXVlcnlLZXlCeU9wdGlvbnMsXG4gIG5vb3AsXG4gIHBhcnNlRmlsdGVyQXJncyxcbiAgcGFyc2VRdWVyeUFyZ3MsXG4gIHBhcnRpYWxNYXRjaEtleSxcbn0gZnJvbSAnLi91dGlscydcbmltcG9ydCB7IFF1ZXJ5Q2FjaGUgfSBmcm9tICcuL3F1ZXJ5Q2FjaGUnXG5pbXBvcnQgeyBNdXRhdGlvbkNhY2hlIH0gZnJvbSAnLi9tdXRhdGlvbkNhY2hlJ1xuaW1wb3J0IHsgZm9jdXNNYW5hZ2VyIH0gZnJvbSAnLi9mb2N1c01hbmFnZXInXG5pbXBvcnQgeyBvbmxpbmVNYW5hZ2VyIH0gZnJvbSAnLi9vbmxpbmVNYW5hZ2VyJ1xuaW1wb3J0IHsgbm90aWZ5TWFuYWdlciB9IGZyb20gJy4vbm90aWZ5TWFuYWdlcidcbmltcG9ydCB7IGluZmluaXRlUXVlcnlCZWhhdmlvciB9IGZyb20gJy4vaW5maW5pdGVRdWVyeUJlaGF2aW9yJ1xuaW1wb3J0IHsgZGVmYXVsdExvZ2dlciB9IGZyb20gJy4vbG9nZ2VyJ1xuaW1wb3J0IHR5cGUgeyBDYW5jZWxPcHRpb25zLCBEZWZhdWx0ZWRRdWVyeU9ic2VydmVyT3B0aW9ucyB9IGZyb20gJy4vdHlwZXMnXG5pbXBvcnQgdHlwZSB7IExvZ2dlciB9IGZyb20gJy4vbG9nZ2VyJ1xuaW1wb3J0IHR5cGUgeyBRdWVyeVN0YXRlIH0gZnJvbSAnLi9xdWVyeSdcbmltcG9ydCB0eXBlIHtcbiAgRGVmYXVsdE9wdGlvbnMsXG4gIEZldGNoSW5maW5pdGVRdWVyeU9wdGlvbnMsXG4gIEZldGNoUXVlcnlPcHRpb25zLFxuICBJbmZpbml0ZURhdGEsXG4gIEludmFsaWRhdGVPcHRpb25zLFxuICBJbnZhbGlkYXRlUXVlcnlGaWx0ZXJzLFxuICBNdXRhdGlvbktleSxcbiAgTXV0YXRpb25PYnNlcnZlck9wdGlvbnMsXG4gIE11dGF0aW9uT3B0aW9ucyxcbiAgUXVlcnlDbGllbnRDb25maWcsXG4gIFF1ZXJ5RnVuY3Rpb24sXG4gIFF1ZXJ5S2V5LFxuICBRdWVyeU9ic2VydmVyT3B0aW9ucyxcbiAgUXVlcnlPcHRpb25zLFxuICBSZWZldGNoT3B0aW9ucyxcbiAgUmVmZXRjaFF1ZXJ5RmlsdGVycyxcbiAgUmVzZXRPcHRpb25zLFxuICBSZXNldFF1ZXJ5RmlsdGVycyxcbiAgU2V0RGF0YU9wdGlvbnMsXG4gIFdpdGhSZXF1aXJlZCxcbn0gZnJvbSAnLi90eXBlcydcbmltcG9ydCB0eXBlIHsgTXV0YXRpb25GaWx0ZXJzLCBRdWVyeUZpbHRlcnMsIFVwZGF0ZXIgfSBmcm9tICcuL3V0aWxzJ1xuXG4vLyBUWVBFU1xuXG5pbnRlcmZhY2UgUXVlcnlEZWZhdWx0cyB7XG4gIHF1ZXJ5S2V5OiBRdWVyeUtleVxuICBkZWZhdWx0T3B0aW9uczogUXVlcnlPcHRpb25zPGFueSwgYW55LCBhbnk+XG59XG5cbmludGVyZmFjZSBNdXRhdGlvbkRlZmF1bHRzIHtcbiAgbXV0YXRpb25LZXk6IE11dGF0aW9uS2V5XG4gIGRlZmF1bHRPcHRpb25zOiBNdXRhdGlvbk9wdGlvbnM8YW55LCBhbnksIGFueSwgYW55PlxufVxuXG4vLyBDTEFTU1xuXG5leHBvcnQgY2xhc3MgUXVlcnlDbGllbnQge1xuICBwcml2YXRlIHF1ZXJ5Q2FjaGU6IFF1ZXJ5Q2FjaGVcbiAgcHJpdmF0ZSBtdXRhdGlvbkNhY2hlOiBNdXRhdGlvbkNhY2hlXG4gIHByaXZhdGUgbG9nZ2VyOiBMb2dnZXJcbiAgcHJpdmF0ZSBkZWZhdWx0T3B0aW9uczogRGVmYXVsdE9wdGlvbnNcbiAgcHJpdmF0ZSBxdWVyeURlZmF1bHRzOiBRdWVyeURlZmF1bHRzW11cbiAgcHJpdmF0ZSBtdXRhdGlvbkRlZmF1bHRzOiBNdXRhdGlvbkRlZmF1bHRzW11cbiAgcHJpdmF0ZSBtb3VudENvdW50OiBudW1iZXJcbiAgcHJpdmF0ZSB1bnN1YnNjcmliZUZvY3VzPzogKCkgPT4gdm9pZFxuICBwcml2YXRlIHVuc3Vic2NyaWJlT25saW5lPzogKCkgPT4gdm9pZFxuXG4gIGNvbnN0cnVjdG9yKGNvbmZpZzogUXVlcnlDbGllbnRDb25maWcgPSB7fSkge1xuICAgIHRoaXMucXVlcnlDYWNoZSA9IGNvbmZpZy5xdWVyeUNhY2hlIHx8IG5ldyBRdWVyeUNhY2hlKClcbiAgICB0aGlzLm11dGF0aW9uQ2FjaGUgPSBjb25maWcubXV0YXRpb25DYWNoZSB8fCBuZXcgTXV0YXRpb25DYWNoZSgpXG4gICAgdGhpcy5sb2dnZXIgPSBjb25maWcubG9nZ2VyIHx8IGRlZmF1bHRMb2dnZXJcbiAgICB0aGlzLmRlZmF1bHRPcHRpb25zID0gY29uZmlnLmRlZmF1bHRPcHRpb25zIHx8IHt9XG4gICAgdGhpcy5xdWVyeURlZmF1bHRzID0gW11cbiAgICB0aGlzLm11dGF0aW9uRGVmYXVsdHMgPSBbXVxuICAgIHRoaXMubW91bnRDb3VudCA9IDBcblxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIGNvbmZpZy5sb2dnZXIpIHtcbiAgICAgIHRoaXMubG9nZ2VyLmVycm9yKFxuICAgICAgICBgUGFzc2luZyBhIGN1c3RvbSBsb2dnZXIgaGFzIGJlZW4gZGVwcmVjYXRlZCBhbmQgd2lsbCBiZSByZW1vdmVkIGluIHRoZSBuZXh0IG1ham9yIHZlcnNpb24uYCxcbiAgICAgIClcbiAgICB9XG4gIH1cblxuICBtb3VudCgpOiB2b2lkIHtcbiAgICB0aGlzLm1vdW50Q291bnQrK1xuICAgIGlmICh0aGlzLm1vdW50Q291bnQgIT09IDEpIHJldHVyblxuXG4gICAgdGhpcy51bnN1YnNjcmliZUZvY3VzID0gZm9jdXNNYW5hZ2VyLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBpZiAoZm9jdXNNYW5hZ2VyLmlzRm9jdXNlZCgpKSB7XG4gICAgICAgIHRoaXMucmVzdW1lUGF1c2VkTXV0YXRpb25zKClcbiAgICAgICAgdGhpcy5xdWVyeUNhY2hlLm9uRm9jdXMoKVxuICAgICAgfVxuICAgIH0pXG4gICAgdGhpcy51bnN1YnNjcmliZU9ubGluZSA9IG9ubGluZU1hbmFnZXIuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGlmIChvbmxpbmVNYW5hZ2VyLmlzT25saW5lKCkpIHtcbiAgICAgICAgdGhpcy5yZXN1bWVQYXVzZWRNdXRhdGlvbnMoKVxuICAgICAgICB0aGlzLnF1ZXJ5Q2FjaGUub25PbmxpbmUoKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICB1bm1vdW50KCk6IHZvaWQge1xuICAgIHRoaXMubW91bnRDb3VudC0tXG4gICAgaWYgKHRoaXMubW91bnRDb3VudCAhPT0gMCkgcmV0dXJuXG5cbiAgICB0aGlzLnVuc3Vic2NyaWJlRm9jdXM/LigpXG4gICAgdGhpcy51bnN1YnNjcmliZUZvY3VzID0gdW5kZWZpbmVkXG5cbiAgICB0aGlzLnVuc3Vic2NyaWJlT25saW5lPy4oKVxuICAgIHRoaXMudW5zdWJzY3JpYmVPbmxpbmUgPSB1bmRlZmluZWRcbiAgfVxuXG4gIGlzRmV0Y2hpbmcoZmlsdGVycz86IFF1ZXJ5RmlsdGVycyk6IG51bWJlclxuICBpc0ZldGNoaW5nKHF1ZXJ5S2V5PzogUXVlcnlLZXksIGZpbHRlcnM/OiBRdWVyeUZpbHRlcnMpOiBudW1iZXJcbiAgaXNGZXRjaGluZyhhcmcxPzogUXVlcnlLZXkgfCBRdWVyeUZpbHRlcnMsIGFyZzI/OiBRdWVyeUZpbHRlcnMpOiBudW1iZXIge1xuICAgIGNvbnN0IFtmaWx0ZXJzXSA9IHBhcnNlRmlsdGVyQXJncyhhcmcxLCBhcmcyKVxuICAgIGZpbHRlcnMuZmV0Y2hTdGF0dXMgPSAnZmV0Y2hpbmcnXG4gICAgcmV0dXJuIHRoaXMucXVlcnlDYWNoZS5maW5kQWxsKGZpbHRlcnMpLmxlbmd0aFxuICB9XG5cbiAgaXNNdXRhdGluZyhmaWx0ZXJzPzogTXV0YXRpb25GaWx0ZXJzKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5tdXRhdGlvbkNhY2hlLmZpbmRBbGwoeyAuLi5maWx0ZXJzLCBmZXRjaGluZzogdHJ1ZSB9KS5sZW5ndGhcbiAgfVxuXG4gIGdldFF1ZXJ5RGF0YTxUUXVlcnlGbkRhdGEgPSB1bmtub3duPihcbiAgICBxdWVyeUtleTogUXVlcnlLZXksXG4gICAgZmlsdGVycz86IFF1ZXJ5RmlsdGVycyxcbiAgKTogVFF1ZXJ5Rm5EYXRhIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5xdWVyeUNhY2hlLmZpbmQ8VFF1ZXJ5Rm5EYXRhPihxdWVyeUtleSwgZmlsdGVycyk/LnN0YXRlLmRhdGFcbiAgfVxuXG4gIGVuc3VyZVF1ZXJ5RGF0YTxcbiAgICBUUXVlcnlGbkRhdGEgPSB1bmtub3duLFxuICAgIFRFcnJvciA9IHVua25vd24sXG4gICAgVERhdGEgPSBUUXVlcnlGbkRhdGEsXG4gICAgVFF1ZXJ5S2V5IGV4dGVuZHMgUXVlcnlLZXkgPSBRdWVyeUtleSxcbiAgPihcbiAgICBvcHRpb25zOiBXaXRoUmVxdWlyZWQ8XG4gICAgICBGZXRjaFF1ZXJ5T3B0aW9uczxUUXVlcnlGbkRhdGEsIFRFcnJvciwgVERhdGEsIFRRdWVyeUtleT4sXG4gICAgICAncXVlcnlLZXknXG4gICAgPixcbiAgKTogUHJvbWlzZTxURGF0YT5cbiAgZW5zdXJlUXVlcnlEYXRhPFxuICAgIFRRdWVyeUZuRGF0YSA9IHVua25vd24sXG4gICAgVEVycm9yID0gdW5rbm93bixcbiAgICBURGF0YSA9IFRRdWVyeUZuRGF0YSxcbiAgICBUUXVlcnlLZXkgZXh0ZW5kcyBRdWVyeUtleSA9IFF1ZXJ5S2V5LFxuICA+KFxuICAgIHF1ZXJ5S2V5OiBUUXVlcnlLZXksXG4gICAgb3B0aW9ucz86IE9taXQ8XG4gICAgICBGZXRjaFF1ZXJ5T3B0aW9uczxUUXVlcnlGbkRhdGEsIFRFcnJvciwgVERhdGEsIFRRdWVyeUtleT4sXG4gICAgICAncXVlcnlLZXknXG4gICAgPixcbiAgKTogUHJvbWlzZTxURGF0YT5cbiAgZW5zdXJlUXVlcnlEYXRhPFxuICAgIFRRdWVyeUZuRGF0YSA9IHVua25vd24sXG4gICAgVEVycm9yID0gdW5rbm93bixcbiAgICBURGF0YSA9IFRRdWVyeUZuRGF0YSxcbiAgICBUUXVlcnlLZXkgZXh0ZW5kcyBRdWVyeUtleSA9IFF1ZXJ5S2V5LFxuICA+KFxuICAgIHF1ZXJ5S2V5OiBUUXVlcnlLZXksXG4gICAgcXVlcnlGbjogUXVlcnlGdW5jdGlvbjxUUXVlcnlGbkRhdGEsIFRRdWVyeUtleT4sXG4gICAgb3B0aW9ucz86IE9taXQ8XG4gICAgICBGZXRjaFF1ZXJ5T3B0aW9uczxUUXVlcnlGbkRhdGEsIFRFcnJvciwgVERhdGEsIFRRdWVyeUtleT4sXG4gICAgICAncXVlcnlLZXknIHwgJ3F1ZXJ5Rm4nXG4gICAgPixcbiAgKTogUHJvbWlzZTxURGF0YT5cbiAgZW5zdXJlUXVlcnlEYXRhPFxuICAgIFRRdWVyeUZuRGF0YSxcbiAgICBURXJyb3IsXG4gICAgVERhdGEgPSBUUXVlcnlGbkRhdGEsXG4gICAgVFF1ZXJ5S2V5IGV4dGVuZHMgUXVlcnlLZXkgPSBRdWVyeUtleSxcbiAgPihcbiAgICBhcmcxOlxuICAgICAgfCBUUXVlcnlLZXlcbiAgICAgIHwgV2l0aFJlcXVpcmVkPFxuICAgICAgICAgIEZldGNoUXVlcnlPcHRpb25zPFRRdWVyeUZuRGF0YSwgVEVycm9yLCBURGF0YSwgVFF1ZXJ5S2V5PixcbiAgICAgICAgICAncXVlcnlLZXknXG4gICAgICAgID4sXG4gICAgYXJnMj86XG4gICAgICB8IFF1ZXJ5RnVuY3Rpb248VFF1ZXJ5Rm5EYXRhLCBUUXVlcnlLZXk+XG4gICAgICB8IEZldGNoUXVlcnlPcHRpb25zPFRRdWVyeUZuRGF0YSwgVEVycm9yLCBURGF0YSwgVFF1ZXJ5S2V5PixcbiAgICBhcmczPzogRmV0Y2hRdWVyeU9wdGlvbnM8VFF1ZXJ5Rm5EYXRhLCBURXJyb3IsIFREYXRhLCBUUXVlcnlLZXk+LFxuICApOiBQcm9taXNlPFREYXRhPiB7XG4gICAgY29uc3QgcGFyc2VkT3B0aW9ucyA9IHBhcnNlUXVlcnlBcmdzKGFyZzEsIGFyZzIsIGFyZzMpXG4gICAgY29uc3QgY2FjaGVkRGF0YSA9IHRoaXMuZ2V0UXVlcnlEYXRhPFREYXRhPihwYXJzZWRPcHRpb25zLnF1ZXJ5S2V5ISlcblxuICAgIHJldHVybiBjYWNoZWREYXRhXG4gICAgICA/IFByb21pc2UucmVzb2x2ZShjYWNoZWREYXRhKVxuICAgICAgOiB0aGlzLmZldGNoUXVlcnkocGFyc2VkT3B0aW9ucylcbiAgfVxuXG4gIGdldFF1ZXJpZXNEYXRhPFRRdWVyeUZuRGF0YSA9IHVua25vd24+KFxuICAgIHF1ZXJ5S2V5OiBRdWVyeUtleSxcbiAgKTogW1F1ZXJ5S2V5LCBUUXVlcnlGbkRhdGEgfCB1bmRlZmluZWRdW11cbiAgZ2V0UXVlcmllc0RhdGE8VFF1ZXJ5Rm5EYXRhID0gdW5rbm93bj4oXG4gICAgZmlsdGVyczogUXVlcnlGaWx0ZXJzLFxuICApOiBbUXVlcnlLZXksIFRRdWVyeUZuRGF0YSB8IHVuZGVmaW5lZF1bXVxuICBnZXRRdWVyaWVzRGF0YTxUUXVlcnlGbkRhdGEgPSB1bmtub3duPihcbiAgICBxdWVyeUtleU9yRmlsdGVyczogUXVlcnlLZXkgfCBRdWVyeUZpbHRlcnMsXG4gICk6IFtRdWVyeUtleSwgVFF1ZXJ5Rm5EYXRhIHwgdW5kZWZpbmVkXVtdIHtcbiAgICByZXR1cm4gdGhpcy5nZXRRdWVyeUNhY2hlKClcbiAgICAgIC5maW5kQWxsKHF1ZXJ5S2V5T3JGaWx0ZXJzKVxuICAgICAgLm1hcCgoeyBxdWVyeUtleSwgc3RhdGUgfSkgPT4ge1xuICAgICAgICBjb25zdCBkYXRhID0gc3RhdGUuZGF0YSBhcyBUUXVlcnlGbkRhdGEgfCB1bmRlZmluZWRcbiAgICAgICAgcmV0dXJuIFtxdWVyeUtleSwgZGF0YV1cbiAgICAgIH0pXG4gIH1cblxuICBzZXRRdWVyeURhdGE8VFF1ZXJ5Rm5EYXRhPihcbiAgICBxdWVyeUtleTogUXVlcnlLZXksXG4gICAgdXBkYXRlcjogVXBkYXRlcjxUUXVlcnlGbkRhdGEgfCB1bmRlZmluZWQsIFRRdWVyeUZuRGF0YSB8IHVuZGVmaW5lZD4sXG4gICAgb3B0aW9ucz86IFNldERhdGFPcHRpb25zLFxuICApOiBUUXVlcnlGbkRhdGEgfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IHF1ZXJ5ID0gdGhpcy5xdWVyeUNhY2hlLmZpbmQ8VFF1ZXJ5Rm5EYXRhPihxdWVyeUtleSlcbiAgICBjb25zdCBwcmV2RGF0YSA9IHF1ZXJ5Py5zdGF0ZS5kYXRhXG4gICAgY29uc3QgZGF0YSA9IGZ1bmN0aW9uYWxVcGRhdGUodXBkYXRlciwgcHJldkRhdGEpXG5cbiAgICBpZiAodHlwZW9mIGRhdGEgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgfVxuXG4gICAgY29uc3QgcGFyc2VkT3B0aW9ucyA9IHBhcnNlUXVlcnlBcmdzKHF1ZXJ5S2V5KVxuICAgIGNvbnN0IGRlZmF1bHRlZE9wdGlvbnMgPSB0aGlzLmRlZmF1bHRRdWVyeU9wdGlvbnMocGFyc2VkT3B0aW9ucylcbiAgICByZXR1cm4gdGhpcy5xdWVyeUNhY2hlXG4gICAgICAuYnVpbGQodGhpcywgZGVmYXVsdGVkT3B0aW9ucylcbiAgICAgIC5zZXREYXRhKGRhdGEsIHsgLi4ub3B0aW9ucywgbWFudWFsOiB0cnVlIH0pXG4gIH1cblxuICBzZXRRdWVyaWVzRGF0YTxUUXVlcnlGbkRhdGE+KFxuICAgIHF1ZXJ5S2V5OiBRdWVyeUtleSxcbiAgICB1cGRhdGVyOiBVcGRhdGVyPFRRdWVyeUZuRGF0YSB8IHVuZGVmaW5lZCwgVFF1ZXJ5Rm5EYXRhIHwgdW5kZWZpbmVkPixcbiAgICBvcHRpb25zPzogU2V0RGF0YU9wdGlvbnMsXG4gICk6IFtRdWVyeUtleSwgVFF1ZXJ5Rm5EYXRhIHwgdW5kZWZpbmVkXVtdXG5cbiAgc2V0UXVlcmllc0RhdGE8VFF1ZXJ5Rm5EYXRhPihcbiAgICBmaWx0ZXJzOiBRdWVyeUZpbHRlcnMsXG4gICAgdXBkYXRlcjogVXBkYXRlcjxUUXVlcnlGbkRhdGEgfCB1bmRlZmluZWQsIFRRdWVyeUZuRGF0YSB8IHVuZGVmaW5lZD4sXG4gICAgb3B0aW9ucz86IFNldERhdGFPcHRpb25zLFxuICApOiBbUXVlcnlLZXksIFRRdWVyeUZuRGF0YSB8IHVuZGVmaW5lZF1bXVxuXG4gIHNldFF1ZXJpZXNEYXRhPFRRdWVyeUZuRGF0YT4oXG4gICAgcXVlcnlLZXlPckZpbHRlcnM6IFF1ZXJ5S2V5IHwgUXVlcnlGaWx0ZXJzLFxuICAgIHVwZGF0ZXI6IFVwZGF0ZXI8VFF1ZXJ5Rm5EYXRhIHwgdW5kZWZpbmVkLCBUUXVlcnlGbkRhdGEgfCB1bmRlZmluZWQ+LFxuICAgIG9wdGlvbnM/OiBTZXREYXRhT3B0aW9ucyxcbiAgKTogW1F1ZXJ5S2V5LCBUUXVlcnlGbkRhdGEgfCB1bmRlZmluZWRdW10ge1xuICAgIHJldHVybiBub3RpZnlNYW5hZ2VyLmJhdGNoKCgpID0+XG4gICAgICB0aGlzLmdldFF1ZXJ5Q2FjaGUoKVxuICAgICAgICAuZmluZEFsbChxdWVyeUtleU9yRmlsdGVycylcbiAgICAgICAgLm1hcCgoeyBxdWVyeUtleSB9KSA9PiBbXG4gICAgICAgICAgcXVlcnlLZXksXG4gICAgICAgICAgdGhpcy5zZXRRdWVyeURhdGE8VFF1ZXJ5Rm5EYXRhPihxdWVyeUtleSwgdXBkYXRlciwgb3B0aW9ucyksXG4gICAgICAgIF0pLFxuICAgIClcbiAgfVxuXG4gIGdldFF1ZXJ5U3RhdGU8VFF1ZXJ5Rm5EYXRhID0gdW5rbm93biwgVEVycm9yID0gdW5kZWZpbmVkPihcbiAgICBxdWVyeUtleTogUXVlcnlLZXksXG4gICAgZmlsdGVycz86IFF1ZXJ5RmlsdGVycyxcbiAgKTogUXVlcnlTdGF0ZTxUUXVlcnlGbkRhdGEsIFRFcnJvcj4gfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLnF1ZXJ5Q2FjaGUuZmluZDxUUXVlcnlGbkRhdGEsIFRFcnJvcj4ocXVlcnlLZXksIGZpbHRlcnMpPy5zdGF0ZVxuICB9XG5cbiAgcmVtb3ZlUXVlcmllcyhmaWx0ZXJzPzogUXVlcnlGaWx0ZXJzKTogdm9pZFxuICByZW1vdmVRdWVyaWVzKHF1ZXJ5S2V5PzogUXVlcnlLZXksIGZpbHRlcnM/OiBRdWVyeUZpbHRlcnMpOiB2b2lkXG4gIHJlbW92ZVF1ZXJpZXMoYXJnMT86IFF1ZXJ5S2V5IHwgUXVlcnlGaWx0ZXJzLCBhcmcyPzogUXVlcnlGaWx0ZXJzKTogdm9pZCB7XG4gICAgY29uc3QgW2ZpbHRlcnNdID0gcGFyc2VGaWx0ZXJBcmdzKGFyZzEsIGFyZzIpXG4gICAgY29uc3QgcXVlcnlDYWNoZSA9IHRoaXMucXVlcnlDYWNoZVxuICAgIG5vdGlmeU1hbmFnZXIuYmF0Y2goKCkgPT4ge1xuICAgICAgcXVlcnlDYWNoZS5maW5kQWxsKGZpbHRlcnMpLmZvckVhY2goKHF1ZXJ5KSA9PiB7XG4gICAgICAgIHF1ZXJ5Q2FjaGUucmVtb3ZlKHF1ZXJ5KVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgcmVzZXRRdWVyaWVzPFRQYWdlRGF0YSA9IHVua25vd24+KFxuICAgIGZpbHRlcnM/OiBSZXNldFF1ZXJ5RmlsdGVyczxUUGFnZURhdGE+LFxuICAgIG9wdGlvbnM/OiBSZXNldE9wdGlvbnMsXG4gICk6IFByb21pc2U8dm9pZD5cbiAgcmVzZXRRdWVyaWVzPFRQYWdlRGF0YSA9IHVua25vd24+KFxuICAgIHF1ZXJ5S2V5PzogUXVlcnlLZXksXG4gICAgZmlsdGVycz86IFJlc2V0UXVlcnlGaWx0ZXJzPFRQYWdlRGF0YT4sXG4gICAgb3B0aW9ucz86IFJlc2V0T3B0aW9ucyxcbiAgKTogUHJvbWlzZTx2b2lkPlxuICByZXNldFF1ZXJpZXMoXG4gICAgYXJnMT86IFF1ZXJ5S2V5IHwgUmVzZXRRdWVyeUZpbHRlcnMsXG4gICAgYXJnMj86IFJlc2V0UXVlcnlGaWx0ZXJzIHwgUmVzZXRPcHRpb25zLFxuICAgIGFyZzM/OiBSZXNldE9wdGlvbnMsXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IFtmaWx0ZXJzLCBvcHRpb25zXSA9IHBhcnNlRmlsdGVyQXJncyhhcmcxLCBhcmcyLCBhcmczKVxuICAgIGNvbnN0IHF1ZXJ5Q2FjaGUgPSB0aGlzLnF1ZXJ5Q2FjaGVcblxuICAgIGNvbnN0IHJlZmV0Y2hGaWx0ZXJzOiBSZWZldGNoUXVlcnlGaWx0ZXJzID0ge1xuICAgICAgdHlwZTogJ2FjdGl2ZScsXG4gICAgICAuLi5maWx0ZXJzLFxuICAgIH1cblxuICAgIHJldHVybiBub3RpZnlNYW5hZ2VyLmJhdGNoKCgpID0+IHtcbiAgICAgIHF1ZXJ5Q2FjaGUuZmluZEFsbChmaWx0ZXJzKS5mb3JFYWNoKChxdWVyeSkgPT4ge1xuICAgICAgICBxdWVyeS5yZXNldCgpXG4gICAgICB9KVxuICAgICAgcmV0dXJuIHRoaXMucmVmZXRjaFF1ZXJpZXMocmVmZXRjaEZpbHRlcnMsIG9wdGlvbnMpXG4gICAgfSlcbiAgfVxuXG4gIGNhbmNlbFF1ZXJpZXMoZmlsdGVycz86IFF1ZXJ5RmlsdGVycywgb3B0aW9ucz86IENhbmNlbE9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+XG4gIGNhbmNlbFF1ZXJpZXMoXG4gICAgcXVlcnlLZXk/OiBRdWVyeUtleSxcbiAgICBmaWx0ZXJzPzogUXVlcnlGaWx0ZXJzLFxuICAgIG9wdGlvbnM/OiBDYW5jZWxPcHRpb25zLFxuICApOiBQcm9taXNlPHZvaWQ+XG4gIGNhbmNlbFF1ZXJpZXMoXG4gICAgYXJnMT86IFF1ZXJ5S2V5IHwgUXVlcnlGaWx0ZXJzLFxuICAgIGFyZzI/OiBRdWVyeUZpbHRlcnMgfCBDYW5jZWxPcHRpb25zLFxuICAgIGFyZzM/OiBDYW5jZWxPcHRpb25zLFxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBbZmlsdGVycywgY2FuY2VsT3B0aW9ucyA9IHt9XSA9IHBhcnNlRmlsdGVyQXJncyhhcmcxLCBhcmcyLCBhcmczKVxuXG4gICAgaWYgKHR5cGVvZiBjYW5jZWxPcHRpb25zLnJldmVydCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNhbmNlbE9wdGlvbnMucmV2ZXJ0ID0gdHJ1ZVxuICAgIH1cblxuICAgIGNvbnN0IHByb21pc2VzID0gbm90aWZ5TWFuYWdlci5iYXRjaCgoKSA9PlxuICAgICAgdGhpcy5xdWVyeUNhY2hlXG4gICAgICAgIC5maW5kQWxsKGZpbHRlcnMpXG4gICAgICAgIC5tYXAoKHF1ZXJ5KSA9PiBxdWVyeS5jYW5jZWwoY2FuY2VsT3B0aW9ucykpLFxuICAgIClcblxuICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbihub29wKS5jYXRjaChub29wKVxuICB9XG5cbiAgaW52YWxpZGF0ZVF1ZXJpZXM8VFBhZ2VEYXRhID0gdW5rbm93bj4oXG4gICAgZmlsdGVycz86IEludmFsaWRhdGVRdWVyeUZpbHRlcnM8VFBhZ2VEYXRhPixcbiAgICBvcHRpb25zPzogSW52YWxpZGF0ZU9wdGlvbnMsXG4gICk6IFByb21pc2U8dm9pZD5cbiAgaW52YWxpZGF0ZVF1ZXJpZXM8VFBhZ2VEYXRhID0gdW5rbm93bj4oXG4gICAgcXVlcnlLZXk/OiBRdWVyeUtleSxcbiAgICBmaWx0ZXJzPzogSW52YWxpZGF0ZVF1ZXJ5RmlsdGVyczxUUGFnZURhdGE+LFxuICAgIG9wdGlvbnM/OiBJbnZhbGlkYXRlT3B0aW9ucyxcbiAgKTogUHJvbWlzZTx2b2lkPlxuICBpbnZhbGlkYXRlUXVlcmllcyhcbiAgICBhcmcxPzogUXVlcnlLZXkgfCBJbnZhbGlkYXRlUXVlcnlGaWx0ZXJzLFxuICAgIGFyZzI/OiBJbnZhbGlkYXRlUXVlcnlGaWx0ZXJzIHwgSW52YWxpZGF0ZU9wdGlvbnMsXG4gICAgYXJnMz86IEludmFsaWRhdGVPcHRpb25zLFxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBbZmlsdGVycywgb3B0aW9uc10gPSBwYXJzZUZpbHRlckFyZ3MoYXJnMSwgYXJnMiwgYXJnMylcblxuICAgIHJldHVybiBub3RpZnlNYW5hZ2VyLmJhdGNoKCgpID0+IHtcbiAgICAgIHRoaXMucXVlcnlDYWNoZS5maW5kQWxsKGZpbHRlcnMpLmZvckVhY2goKHF1ZXJ5KSA9PiB7XG4gICAgICAgIHF1ZXJ5LmludmFsaWRhdGUoKVxuICAgICAgfSlcblxuICAgICAgaWYgKGZpbHRlcnMucmVmZXRjaFR5cGUgPT09ICdub25lJykge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcbiAgICAgIH1cbiAgICAgIGNvbnN0IHJlZmV0Y2hGaWx0ZXJzOiBSZWZldGNoUXVlcnlGaWx0ZXJzID0ge1xuICAgICAgICAuLi5maWx0ZXJzLFxuICAgICAgICB0eXBlOiBmaWx0ZXJzLnJlZmV0Y2hUeXBlID8/IGZpbHRlcnMudHlwZSA/PyAnYWN0aXZlJyxcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLnJlZmV0Y2hRdWVyaWVzKHJlZmV0Y2hGaWx0ZXJzLCBvcHRpb25zKVxuICAgIH0pXG4gIH1cblxuICByZWZldGNoUXVlcmllczxUUGFnZURhdGEgPSB1bmtub3duPihcbiAgICBmaWx0ZXJzPzogUmVmZXRjaFF1ZXJ5RmlsdGVyczxUUGFnZURhdGE+LFxuICAgIG9wdGlvbnM/OiBSZWZldGNoT3B0aW9ucyxcbiAgKTogUHJvbWlzZTx2b2lkPlxuICByZWZldGNoUXVlcmllczxUUGFnZURhdGEgPSB1bmtub3duPihcbiAgICBxdWVyeUtleT86IFF1ZXJ5S2V5LFxuICAgIGZpbHRlcnM/OiBSZWZldGNoUXVlcnlGaWx0ZXJzPFRQYWdlRGF0YT4sXG4gICAgb3B0aW9ucz86IFJlZmV0Y2hPcHRpb25zLFxuICApOiBQcm9taXNlPHZvaWQ+XG4gIHJlZmV0Y2hRdWVyaWVzKFxuICAgIGFyZzE/OiBRdWVyeUtleSB8IFJlZmV0Y2hRdWVyeUZpbHRlcnMsXG4gICAgYXJnMj86IFJlZmV0Y2hRdWVyeUZpbHRlcnMgfCBSZWZldGNoT3B0aW9ucyxcbiAgICBhcmczPzogUmVmZXRjaE9wdGlvbnMsXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IFtmaWx0ZXJzLCBvcHRpb25zXSA9IHBhcnNlRmlsdGVyQXJncyhhcmcxLCBhcmcyLCBhcmczKVxuXG4gICAgY29uc3QgcHJvbWlzZXMgPSBub3RpZnlNYW5hZ2VyLmJhdGNoKCgpID0+XG4gICAgICB0aGlzLnF1ZXJ5Q2FjaGVcbiAgICAgICAgLmZpbmRBbGwoZmlsdGVycylcbiAgICAgICAgLmZpbHRlcigocXVlcnkpID0+ICFxdWVyeS5pc0Rpc2FibGVkKCkpXG4gICAgICAgIC5tYXAoKHF1ZXJ5KSA9PlxuICAgICAgICAgIHF1ZXJ5LmZldGNoKHVuZGVmaW5lZCwge1xuICAgICAgICAgICAgLi4ub3B0aW9ucyxcbiAgICAgICAgICAgIGNhbmNlbFJlZmV0Y2g6IG9wdGlvbnM/LmNhbmNlbFJlZmV0Y2ggPz8gdHJ1ZSxcbiAgICAgICAgICAgIG1ldGE6IHsgcmVmZXRjaFBhZ2U6IGZpbHRlcnMucmVmZXRjaFBhZ2UgfSxcbiAgICAgICAgICB9KSxcbiAgICAgICAgKSxcbiAgICApXG5cbiAgICBsZXQgcHJvbWlzZSA9IFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKG5vb3ApXG5cbiAgICBpZiAoIW9wdGlvbnM/LnRocm93T25FcnJvcikge1xuICAgICAgcHJvbWlzZSA9IHByb21pc2UuY2F0Y2gobm9vcClcbiAgICB9XG5cbiAgICByZXR1cm4gcHJvbWlzZVxuICB9XG5cbiAgZmV0Y2hRdWVyeTxcbiAgICBUUXVlcnlGbkRhdGEgPSB1bmtub3duLFxuICAgIFRFcnJvciA9IHVua25vd24sXG4gICAgVERhdGEgPSBUUXVlcnlGbkRhdGEsXG4gICAgVFF1ZXJ5S2V5IGV4dGVuZHMgUXVlcnlLZXkgPSBRdWVyeUtleSxcbiAgPihcbiAgICBvcHRpb25zOiBGZXRjaFF1ZXJ5T3B0aW9uczxUUXVlcnlGbkRhdGEsIFRFcnJvciwgVERhdGEsIFRRdWVyeUtleT4sXG4gICk6IFByb21pc2U8VERhdGE+XG4gIGZldGNoUXVlcnk8XG4gICAgVFF1ZXJ5Rm5EYXRhID0gdW5rbm93bixcbiAgICBURXJyb3IgPSB1bmtub3duLFxuICAgIFREYXRhID0gVFF1ZXJ5Rm5EYXRhLFxuICAgIFRRdWVyeUtleSBleHRlbmRzIFF1ZXJ5S2V5ID0gUXVlcnlLZXksXG4gID4oXG4gICAgcXVlcnlLZXk6IFRRdWVyeUtleSxcbiAgICBvcHRpb25zPzogRmV0Y2hRdWVyeU9wdGlvbnM8VFF1ZXJ5Rm5EYXRhLCBURXJyb3IsIFREYXRhLCBUUXVlcnlLZXk+LFxuICApOiBQcm9taXNlPFREYXRhPlxuICBmZXRjaFF1ZXJ5PFxuICAgIFRRdWVyeUZuRGF0YSA9IHVua25vd24sXG4gICAgVEVycm9yID0gdW5rbm93bixcbiAgICBURGF0YSA9IFRRdWVyeUZuRGF0YSxcbiAgICBUUXVlcnlLZXkgZXh0ZW5kcyBRdWVyeUtleSA9IFF1ZXJ5S2V5LFxuICA+KFxuICAgIHF1ZXJ5S2V5OiBUUXVlcnlLZXksXG4gICAgcXVlcnlGbjogUXVlcnlGdW5jdGlvbjxUUXVlcnlGbkRhdGEsIFRRdWVyeUtleT4sXG4gICAgb3B0aW9ucz86IEZldGNoUXVlcnlPcHRpb25zPFRRdWVyeUZuRGF0YSwgVEVycm9yLCBURGF0YSwgVFF1ZXJ5S2V5PixcbiAgKTogUHJvbWlzZTxURGF0YT5cbiAgZmV0Y2hRdWVyeTxcbiAgICBUUXVlcnlGbkRhdGEsXG4gICAgVEVycm9yLFxuICAgIFREYXRhID0gVFF1ZXJ5Rm5EYXRhLFxuICAgIFRRdWVyeUtleSBleHRlbmRzIFF1ZXJ5S2V5ID0gUXVlcnlLZXksXG4gID4oXG4gICAgYXJnMTogVFF1ZXJ5S2V5IHwgRmV0Y2hRdWVyeU9wdGlvbnM8VFF1ZXJ5Rm5EYXRhLCBURXJyb3IsIFREYXRhLCBUUXVlcnlLZXk+LFxuICAgIGFyZzI/OlxuICAgICAgfCBRdWVyeUZ1bmN0aW9uPFRRdWVyeUZuRGF0YSwgVFF1ZXJ5S2V5PlxuICAgICAgfCBGZXRjaFF1ZXJ5T3B0aW9uczxUUXVlcnlGbkRhdGEsIFRFcnJvciwgVERhdGEsIFRRdWVyeUtleT4sXG4gICAgYXJnMz86IEZldGNoUXVlcnlPcHRpb25zPFRRdWVyeUZuRGF0YSwgVEVycm9yLCBURGF0YSwgVFF1ZXJ5S2V5PixcbiAgKTogUHJvbWlzZTxURGF0YT4ge1xuICAgIGNvbnN0IHBhcnNlZE9wdGlvbnMgPSBwYXJzZVF1ZXJ5QXJncyhhcmcxLCBhcmcyLCBhcmczKVxuICAgIGNvbnN0IGRlZmF1bHRlZE9wdGlvbnMgPSB0aGlzLmRlZmF1bHRRdWVyeU9wdGlvbnMocGFyc2VkT3B0aW9ucylcblxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS90YW5uZXJsaW5zbGV5L3JlYWN0LXF1ZXJ5L2lzc3Vlcy82NTJcbiAgICBpZiAodHlwZW9mIGRlZmF1bHRlZE9wdGlvbnMucmV0cnkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBkZWZhdWx0ZWRPcHRpb25zLnJldHJ5ID0gZmFsc2VcbiAgICB9XG5cbiAgICBjb25zdCBxdWVyeSA9IHRoaXMucXVlcnlDYWNoZS5idWlsZCh0aGlzLCBkZWZhdWx0ZWRPcHRpb25zKVxuXG4gICAgcmV0dXJuIHF1ZXJ5LmlzU3RhbGVCeVRpbWUoZGVmYXVsdGVkT3B0aW9ucy5zdGFsZVRpbWUpXG4gICAgICA/IHF1ZXJ5LmZldGNoKGRlZmF1bHRlZE9wdGlvbnMpXG4gICAgICA6IFByb21pc2UucmVzb2x2ZShxdWVyeS5zdGF0ZS5kYXRhIGFzIFREYXRhKVxuICB9XG5cbiAgcHJlZmV0Y2hRdWVyeTxcbiAgICBUUXVlcnlGbkRhdGEgPSB1bmtub3duLFxuICAgIFRFcnJvciA9IHVua25vd24sXG4gICAgVERhdGEgPSBUUXVlcnlGbkRhdGEsXG4gICAgVFF1ZXJ5S2V5IGV4dGVuZHMgUXVlcnlLZXkgPSBRdWVyeUtleSxcbiAgPihcbiAgICBvcHRpb25zOiBGZXRjaFF1ZXJ5T3B0aW9uczxUUXVlcnlGbkRhdGEsIFRFcnJvciwgVERhdGEsIFRRdWVyeUtleT4sXG4gICk6IFByb21pc2U8dm9pZD5cbiAgcHJlZmV0Y2hRdWVyeTxcbiAgICBUUXVlcnlGbkRhdGEgPSB1bmtub3duLFxuICAgIFRFcnJvciA9IHVua25vd24sXG4gICAgVERhdGEgPSBUUXVlcnlGbkRhdGEsXG4gICAgVFF1ZXJ5S2V5IGV4dGVuZHMgUXVlcnlLZXkgPSBRdWVyeUtleSxcbiAgPihcbiAgICBxdWVyeUtleTogVFF1ZXJ5S2V5LFxuICAgIG9wdGlvbnM/OiBGZXRjaFF1ZXJ5T3B0aW9uczxUUXVlcnlGbkRhdGEsIFRFcnJvciwgVERhdGEsIFRRdWVyeUtleT4sXG4gICk6IFByb21pc2U8dm9pZD5cbiAgcHJlZmV0Y2hRdWVyeTxcbiAgICBUUXVlcnlGbkRhdGEgPSB1bmtub3duLFxuICAgIFRFcnJvciA9IHVua25vd24sXG4gICAgVERhdGEgPSBUUXVlcnlGbkRhdGEsXG4gICAgVFF1ZXJ5S2V5IGV4dGVuZHMgUXVlcnlLZXkgPSBRdWVyeUtleSxcbiAgPihcbiAgICBxdWVyeUtleTogVFF1ZXJ5S2V5LFxuICAgIHF1ZXJ5Rm46IFF1ZXJ5RnVuY3Rpb248VFF1ZXJ5Rm5EYXRhLCBUUXVlcnlLZXk+LFxuICAgIG9wdGlvbnM/OiBGZXRjaFF1ZXJ5T3B0aW9uczxUUXVlcnlGbkRhdGEsIFRFcnJvciwgVERhdGEsIFRRdWVyeUtleT4sXG4gICk6IFByb21pc2U8dm9pZD5cbiAgcHJlZmV0Y2hRdWVyeTxcbiAgICBUUXVlcnlGbkRhdGEgPSB1bmtub3duLFxuICAgIFRFcnJvciA9IHVua25vd24sXG4gICAgVERhdGEgPSBUUXVlcnlGbkRhdGEsXG4gICAgVFF1ZXJ5S2V5IGV4dGVuZHMgUXVlcnlLZXkgPSBRdWVyeUtleSxcbiAgPihcbiAgICBhcmcxOiBUUXVlcnlLZXkgfCBGZXRjaFF1ZXJ5T3B0aW9uczxUUXVlcnlGbkRhdGEsIFRFcnJvciwgVERhdGEsIFRRdWVyeUtleT4sXG4gICAgYXJnMj86XG4gICAgICB8IFF1ZXJ5RnVuY3Rpb248VFF1ZXJ5Rm5EYXRhLCBUUXVlcnlLZXk+XG4gICAgICB8IEZldGNoUXVlcnlPcHRpb25zPFRRdWVyeUZuRGF0YSwgVEVycm9yLCBURGF0YSwgVFF1ZXJ5S2V5PixcbiAgICBhcmczPzogRmV0Y2hRdWVyeU9wdGlvbnM8VFF1ZXJ5Rm5EYXRhLCBURXJyb3IsIFREYXRhLCBUUXVlcnlLZXk+LFxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5mZXRjaFF1ZXJ5KGFyZzEgYXMgYW55LCBhcmcyIGFzIGFueSwgYXJnMylcbiAgICAgIC50aGVuKG5vb3ApXG4gICAgICAuY2F0Y2gobm9vcClcbiAgfVxuXG4gIGZldGNoSW5maW5pdGVRdWVyeTxcbiAgICBUUXVlcnlGbkRhdGEgPSB1bmtub3duLFxuICAgIFRFcnJvciA9IHVua25vd24sXG4gICAgVERhdGEgPSBUUXVlcnlGbkRhdGEsXG4gICAgVFF1ZXJ5S2V5IGV4dGVuZHMgUXVlcnlLZXkgPSBRdWVyeUtleSxcbiAgPihcbiAgICBvcHRpb25zOiBGZXRjaEluZmluaXRlUXVlcnlPcHRpb25zPFRRdWVyeUZuRGF0YSwgVEVycm9yLCBURGF0YSwgVFF1ZXJ5S2V5PixcbiAgKTogUHJvbWlzZTxJbmZpbml0ZURhdGE8VERhdGE+PlxuICBmZXRjaEluZmluaXRlUXVlcnk8XG4gICAgVFF1ZXJ5Rm5EYXRhID0gdW5rbm93bixcbiAgICBURXJyb3IgPSB1bmtub3duLFxuICAgIFREYXRhID0gVFF1ZXJ5Rm5EYXRhLFxuICAgIFRRdWVyeUtleSBleHRlbmRzIFF1ZXJ5S2V5ID0gUXVlcnlLZXksXG4gID4oXG4gICAgcXVlcnlLZXk6IFRRdWVyeUtleSxcbiAgICBvcHRpb25zPzogRmV0Y2hJbmZpbml0ZVF1ZXJ5T3B0aW9uczxUUXVlcnlGbkRhdGEsIFRFcnJvciwgVERhdGEsIFRRdWVyeUtleT4sXG4gICk6IFByb21pc2U8SW5maW5pdGVEYXRhPFREYXRhPj5cbiAgZmV0Y2hJbmZpbml0ZVF1ZXJ5PFxuICAgIFRRdWVyeUZuRGF0YSA9IHVua25vd24sXG4gICAgVEVycm9yID0gdW5rbm93bixcbiAgICBURGF0YSA9IFRRdWVyeUZuRGF0YSxcbiAgICBUUXVlcnlLZXkgZXh0ZW5kcyBRdWVyeUtleSA9IFF1ZXJ5S2V5LFxuICA+KFxuICAgIHF1ZXJ5S2V5OiBUUXVlcnlLZXksXG4gICAgcXVlcnlGbjogUXVlcnlGdW5jdGlvbjxUUXVlcnlGbkRhdGEsIFRRdWVyeUtleT4sXG4gICAgb3B0aW9ucz86IEZldGNoSW5maW5pdGVRdWVyeU9wdGlvbnM8VFF1ZXJ5Rm5EYXRhLCBURXJyb3IsIFREYXRhLCBUUXVlcnlLZXk+LFxuICApOiBQcm9taXNlPEluZmluaXRlRGF0YTxURGF0YT4+XG4gIGZldGNoSW5maW5pdGVRdWVyeTxcbiAgICBUUXVlcnlGbkRhdGEsXG4gICAgVEVycm9yLFxuICAgIFREYXRhID0gVFF1ZXJ5Rm5EYXRhLFxuICAgIFRRdWVyeUtleSBleHRlbmRzIFF1ZXJ5S2V5ID0gUXVlcnlLZXksXG4gID4oXG4gICAgYXJnMTpcbiAgICAgIHwgVFF1ZXJ5S2V5XG4gICAgICB8IEZldGNoSW5maW5pdGVRdWVyeU9wdGlvbnM8VFF1ZXJ5Rm5EYXRhLCBURXJyb3IsIFREYXRhLCBUUXVlcnlLZXk+LFxuICAgIGFyZzI/OlxuICAgICAgfCBRdWVyeUZ1bmN0aW9uPFRRdWVyeUZuRGF0YSwgVFF1ZXJ5S2V5PlxuICAgICAgfCBGZXRjaEluZmluaXRlUXVlcnlPcHRpb25zPFRRdWVyeUZuRGF0YSwgVEVycm9yLCBURGF0YSwgVFF1ZXJ5S2V5PixcbiAgICBhcmczPzogRmV0Y2hJbmZpbml0ZVF1ZXJ5T3B0aW9uczxUUXVlcnlGbkRhdGEsIFRFcnJvciwgVERhdGEsIFRRdWVyeUtleT4sXG4gICk6IFByb21pc2U8SW5maW5pdGVEYXRhPFREYXRhPj4ge1xuICAgIGNvbnN0IHBhcnNlZE9wdGlvbnMgPSBwYXJzZVF1ZXJ5QXJncyhhcmcxLCBhcmcyLCBhcmczKVxuICAgIHBhcnNlZE9wdGlvbnMuYmVoYXZpb3IgPSBpbmZpbml0ZVF1ZXJ5QmVoYXZpb3I8XG4gICAgICBUUXVlcnlGbkRhdGEsXG4gICAgICBURXJyb3IsXG4gICAgICBURGF0YVxuICAgID4oKVxuICAgIHJldHVybiB0aGlzLmZldGNoUXVlcnkocGFyc2VkT3B0aW9ucylcbiAgfVxuXG4gIHByZWZldGNoSW5maW5pdGVRdWVyeTxcbiAgICBUUXVlcnlGbkRhdGEgPSB1bmtub3duLFxuICAgIFRFcnJvciA9IHVua25vd24sXG4gICAgVERhdGEgPSBUUXVlcnlGbkRhdGEsXG4gICAgVFF1ZXJ5S2V5IGV4dGVuZHMgUXVlcnlLZXkgPSBRdWVyeUtleSxcbiAgPihcbiAgICBvcHRpb25zOiBGZXRjaEluZmluaXRlUXVlcnlPcHRpb25zPFRRdWVyeUZuRGF0YSwgVEVycm9yLCBURGF0YSwgVFF1ZXJ5S2V5PixcbiAgKTogUHJvbWlzZTx2b2lkPlxuICBwcmVmZXRjaEluZmluaXRlUXVlcnk8XG4gICAgVFF1ZXJ5Rm5EYXRhID0gdW5rbm93bixcbiAgICBURXJyb3IgPSB1bmtub3duLFxuICAgIFREYXRhID0gVFF1ZXJ5Rm5EYXRhLFxuICAgIFRRdWVyeUtleSBleHRlbmRzIFF1ZXJ5S2V5ID0gUXVlcnlLZXksXG4gID4oXG4gICAgcXVlcnlLZXk6IFRRdWVyeUtleSxcbiAgICBvcHRpb25zPzogRmV0Y2hJbmZpbml0ZVF1ZXJ5T3B0aW9uczxUUXVlcnlGbkRhdGEsIFRFcnJvciwgVERhdGEsIFRRdWVyeUtleT4sXG4gICk6IFByb21pc2U8dm9pZD5cbiAgcHJlZmV0Y2hJbmZpbml0ZVF1ZXJ5PFxuICAgIFRRdWVyeUZuRGF0YSA9IHVua25vd24sXG4gICAgVEVycm9yID0gdW5rbm93bixcbiAgICBURGF0YSA9IFRRdWVyeUZuRGF0YSxcbiAgICBUUXVlcnlLZXkgZXh0ZW5kcyBRdWVyeUtleSA9IFF1ZXJ5S2V5LFxuICA+KFxuICAgIHF1ZXJ5S2V5OiBUUXVlcnlLZXksXG4gICAgcXVlcnlGbjogUXVlcnlGdW5jdGlvbjxUUXVlcnlGbkRhdGEsIFRRdWVyeUtleT4sXG4gICAgb3B0aW9ucz86IEZldGNoSW5maW5pdGVRdWVyeU9wdGlvbnM8VFF1ZXJ5Rm5EYXRhLCBURXJyb3IsIFREYXRhLCBUUXVlcnlLZXk+LFxuICApOiBQcm9taXNlPHZvaWQ+XG4gIHByZWZldGNoSW5maW5pdGVRdWVyeTxcbiAgICBUUXVlcnlGbkRhdGEsXG4gICAgVEVycm9yLFxuICAgIFREYXRhID0gVFF1ZXJ5Rm5EYXRhLFxuICAgIFRRdWVyeUtleSBleHRlbmRzIFF1ZXJ5S2V5ID0gUXVlcnlLZXksXG4gID4oXG4gICAgYXJnMTpcbiAgICAgIHwgVFF1ZXJ5S2V5XG4gICAgICB8IEZldGNoSW5maW5pdGVRdWVyeU9wdGlvbnM8VFF1ZXJ5Rm5EYXRhLCBURXJyb3IsIFREYXRhLCBUUXVlcnlLZXk+LFxuICAgIGFyZzI/OlxuICAgICAgfCBRdWVyeUZ1bmN0aW9uPFRRdWVyeUZuRGF0YSwgVFF1ZXJ5S2V5PlxuICAgICAgfCBGZXRjaEluZmluaXRlUXVlcnlPcHRpb25zPFRRdWVyeUZuRGF0YSwgVEVycm9yLCBURGF0YSwgVFF1ZXJ5S2V5PixcbiAgICBhcmczPzogRmV0Y2hJbmZpbml0ZVF1ZXJ5T3B0aW9uczxUUXVlcnlGbkRhdGEsIFRFcnJvciwgVERhdGEsIFRRdWVyeUtleT4sXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLmZldGNoSW5maW5pdGVRdWVyeShhcmcxIGFzIGFueSwgYXJnMiBhcyBhbnksIGFyZzMpXG4gICAgICAudGhlbihub29wKVxuICAgICAgLmNhdGNoKG5vb3ApXG4gIH1cblxuICByZXN1bWVQYXVzZWRNdXRhdGlvbnMoKTogUHJvbWlzZTx1bmtub3duPiB7XG4gICAgcmV0dXJuIHRoaXMubXV0YXRpb25DYWNoZS5yZXN1bWVQYXVzZWRNdXRhdGlvbnMoKVxuICB9XG5cbiAgZ2V0UXVlcnlDYWNoZSgpOiBRdWVyeUNhY2hlIHtcbiAgICByZXR1cm4gdGhpcy5xdWVyeUNhY2hlXG4gIH1cblxuICBnZXRNdXRhdGlvbkNhY2hlKCk6IE11dGF0aW9uQ2FjaGUge1xuICAgIHJldHVybiB0aGlzLm11dGF0aW9uQ2FjaGVcbiAgfVxuXG4gIGdldExvZ2dlcigpOiBMb2dnZXIge1xuICAgIHJldHVybiB0aGlzLmxvZ2dlclxuICB9XG5cbiAgZ2V0RGVmYXVsdE9wdGlvbnMoKTogRGVmYXVsdE9wdGlvbnMge1xuICAgIHJldHVybiB0aGlzLmRlZmF1bHRPcHRpb25zXG4gIH1cblxuICBzZXREZWZhdWx0T3B0aW9ucyhvcHRpb25zOiBEZWZhdWx0T3B0aW9ucyk6IHZvaWQge1xuICAgIHRoaXMuZGVmYXVsdE9wdGlvbnMgPSBvcHRpb25zXG4gIH1cblxuICBzZXRRdWVyeURlZmF1bHRzKFxuICAgIHF1ZXJ5S2V5OiBRdWVyeUtleSxcbiAgICBvcHRpb25zOiBRdWVyeU9ic2VydmVyT3B0aW9uczx1bmtub3duLCBhbnksIGFueSwgYW55PixcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgcmVzdWx0ID0gdGhpcy5xdWVyeURlZmF1bHRzLmZpbmQoXG4gICAgICAoeCkgPT4gaGFzaFF1ZXJ5S2V5KHF1ZXJ5S2V5KSA9PT0gaGFzaFF1ZXJ5S2V5KHgucXVlcnlLZXkpLFxuICAgIClcbiAgICBpZiAocmVzdWx0KSB7XG4gICAgICByZXN1bHQuZGVmYXVsdE9wdGlvbnMgPSBvcHRpb25zXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucXVlcnlEZWZhdWx0cy5wdXNoKHsgcXVlcnlLZXksIGRlZmF1bHRPcHRpb25zOiBvcHRpb25zIH0pXG4gICAgfVxuICB9XG5cbiAgZ2V0UXVlcnlEZWZhdWx0cyhcbiAgICBxdWVyeUtleT86IFF1ZXJ5S2V5LFxuICApOiBRdWVyeU9ic2VydmVyT3B0aW9uczxhbnksIGFueSwgYW55LCBhbnksIGFueT4gfCB1bmRlZmluZWQge1xuICAgIGlmICghcXVlcnlLZXkpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWRcbiAgICB9XG5cbiAgICAvLyBHZXQgdGhlIGZpcnN0IG1hdGNoaW5nIGRlZmF1bHRzXG4gICAgY29uc3QgZmlyc3RNYXRjaGluZ0RlZmF1bHRzID0gdGhpcy5xdWVyeURlZmF1bHRzLmZpbmQoKHgpID0+XG4gICAgICBwYXJ0aWFsTWF0Y2hLZXkocXVlcnlLZXksIHgucXVlcnlLZXkpLFxuICAgIClcblxuICAgIC8vIEFkZGl0aW9uYWwgY2hlY2tzIGFuZCBlcnJvciBpbiBkZXYgbW9kZVxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAvLyBSZXRyaWV2ZSBhbGwgbWF0Y2hpbmcgZGVmYXVsdHMgZm9yIHRoZSBnaXZlbiBrZXlcbiAgICAgIGNvbnN0IG1hdGNoaW5nRGVmYXVsdHMgPSB0aGlzLnF1ZXJ5RGVmYXVsdHMuZmlsdGVyKCh4KSA9PlxuICAgICAgICBwYXJ0aWFsTWF0Y2hLZXkocXVlcnlLZXksIHgucXVlcnlLZXkpLFxuICAgICAgKVxuICAgICAgLy8gSXQgaXMgb2sgbm90IGhhdmluZyBkZWZhdWx0cywgYnV0IGl0IGlzIGVycm9yIHByb25lIHRvIGhhdmUgbW9yZSB0aGFuIDEgZGVmYXVsdCBmb3IgYSBnaXZlbiBrZXlcbiAgICAgIGlmIChtYXRjaGluZ0RlZmF1bHRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoXG4gICAgICAgICAgYFtRdWVyeUNsaWVudF0gU2V2ZXJhbCBxdWVyeSBkZWZhdWx0cyBtYXRjaCB3aXRoIGtleSAnJHtKU09OLnN0cmluZ2lmeShcbiAgICAgICAgICAgIHF1ZXJ5S2V5LFxuICAgICAgICAgICl9Jy4gVGhlIGZpcnN0IG1hdGNoaW5nIHF1ZXJ5IGRlZmF1bHRzIGFyZSB1c2VkLiBQbGVhc2UgY2hlY2sgaG93IHF1ZXJ5IGRlZmF1bHRzIGFyZSByZWdpc3RlcmVkLiBPcmRlciBkb2VzIG1hdHRlciBoZXJlLiBjZi4gaHR0cHM6Ly9yZWFjdC1xdWVyeS50YW5zdGFjay5jb20vcmVmZXJlbmNlL1F1ZXJ5Q2xpZW50I3F1ZXJ5Y2xpZW50c2V0cXVlcnlkZWZhdWx0cy5gLFxuICAgICAgICApXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZpcnN0TWF0Y2hpbmdEZWZhdWx0cz8uZGVmYXVsdE9wdGlvbnNcbiAgfVxuXG4gIHNldE11dGF0aW9uRGVmYXVsdHMoXG4gICAgbXV0YXRpb25LZXk6IE11dGF0aW9uS2V5LFxuICAgIG9wdGlvbnM6IE11dGF0aW9uT2JzZXJ2ZXJPcHRpb25zPGFueSwgYW55LCBhbnksIGFueT4sXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMubXV0YXRpb25EZWZhdWx0cy5maW5kKFxuICAgICAgKHgpID0+IGhhc2hRdWVyeUtleShtdXRhdGlvbktleSkgPT09IGhhc2hRdWVyeUtleSh4Lm11dGF0aW9uS2V5KSxcbiAgICApXG4gICAgaWYgKHJlc3VsdCkge1xuICAgICAgcmVzdWx0LmRlZmF1bHRPcHRpb25zID0gb3B0aW9uc1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm11dGF0aW9uRGVmYXVsdHMucHVzaCh7IG11dGF0aW9uS2V5LCBkZWZhdWx0T3B0aW9uczogb3B0aW9ucyB9KVxuICAgIH1cbiAgfVxuXG4gIGdldE11dGF0aW9uRGVmYXVsdHMoXG4gICAgbXV0YXRpb25LZXk/OiBNdXRhdGlvbktleSxcbiAgKTogTXV0YXRpb25PYnNlcnZlck9wdGlvbnM8YW55LCBhbnksIGFueSwgYW55PiB8IHVuZGVmaW5lZCB7XG4gICAgaWYgKCFtdXRhdGlvbktleSkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgIH1cblxuICAgIC8vIEdldCB0aGUgZmlyc3QgbWF0Y2hpbmcgZGVmYXVsdHNcbiAgICBjb25zdCBmaXJzdE1hdGNoaW5nRGVmYXVsdHMgPSB0aGlzLm11dGF0aW9uRGVmYXVsdHMuZmluZCgoeCkgPT5cbiAgICAgIHBhcnRpYWxNYXRjaEtleShtdXRhdGlvbktleSwgeC5tdXRhdGlvbktleSksXG4gICAgKVxuXG4gICAgLy8gQWRkaXRpb25hbCBjaGVja3MgYW5kIGVycm9yIGluIGRldiBtb2RlXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIC8vIFJldHJpZXZlIGFsbCBtYXRjaGluZyBkZWZhdWx0cyBmb3IgdGhlIGdpdmVuIGtleVxuICAgICAgY29uc3QgbWF0Y2hpbmdEZWZhdWx0cyA9IHRoaXMubXV0YXRpb25EZWZhdWx0cy5maWx0ZXIoKHgpID0+XG4gICAgICAgIHBhcnRpYWxNYXRjaEtleShtdXRhdGlvbktleSwgeC5tdXRhdGlvbktleSksXG4gICAgICApXG4gICAgICAvLyBJdCBpcyBvayBub3QgaGF2aW5nIGRlZmF1bHRzLCBidXQgaXQgaXMgZXJyb3IgcHJvbmUgdG8gaGF2ZSBtb3JlIHRoYW4gMSBkZWZhdWx0IGZvciBhIGdpdmVuIGtleVxuICAgICAgaWYgKG1hdGNoaW5nRGVmYXVsdHMubGVuZ3RoID4gMSkge1xuICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcihcbiAgICAgICAgICBgW1F1ZXJ5Q2xpZW50XSBTZXZlcmFsIG11dGF0aW9uIGRlZmF1bHRzIG1hdGNoIHdpdGgga2V5ICcke0pTT04uc3RyaW5naWZ5KFxuICAgICAgICAgICAgbXV0YXRpb25LZXksXG4gICAgICAgICAgKX0nLiBUaGUgZmlyc3QgbWF0Y2hpbmcgbXV0YXRpb24gZGVmYXVsdHMgYXJlIHVzZWQuIFBsZWFzZSBjaGVjayBob3cgbXV0YXRpb24gZGVmYXVsdHMgYXJlIHJlZ2lzdGVyZWQuIE9yZGVyIGRvZXMgbWF0dGVyIGhlcmUuIGNmLiBodHRwczovL3JlYWN0LXF1ZXJ5LnRhbnN0YWNrLmNvbS9yZWZlcmVuY2UvUXVlcnlDbGllbnQjcXVlcnljbGllbnRzZXRtdXRhdGlvbmRlZmF1bHRzLmAsXG4gICAgICAgIClcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmlyc3RNYXRjaGluZ0RlZmF1bHRzPy5kZWZhdWx0T3B0aW9uc1xuICB9XG5cbiAgZGVmYXVsdFF1ZXJ5T3B0aW9uczxcbiAgICBUUXVlcnlGbkRhdGEsXG4gICAgVEVycm9yLFxuICAgIFREYXRhLFxuICAgIFRRdWVyeURhdGEsXG4gICAgVFF1ZXJ5S2V5IGV4dGVuZHMgUXVlcnlLZXksXG4gID4oXG4gICAgb3B0aW9ucz86XG4gICAgICB8IFF1ZXJ5T2JzZXJ2ZXJPcHRpb25zPFRRdWVyeUZuRGF0YSwgVEVycm9yLCBURGF0YSwgVFF1ZXJ5RGF0YSwgVFF1ZXJ5S2V5PlxuICAgICAgfCBEZWZhdWx0ZWRRdWVyeU9ic2VydmVyT3B0aW9uczxcbiAgICAgICAgICBUUXVlcnlGbkRhdGEsXG4gICAgICAgICAgVEVycm9yLFxuICAgICAgICAgIFREYXRhLFxuICAgICAgICAgIFRRdWVyeURhdGEsXG4gICAgICAgICAgVFF1ZXJ5S2V5XG4gICAgICAgID4sXG4gICk6IERlZmF1bHRlZFF1ZXJ5T2JzZXJ2ZXJPcHRpb25zPFxuICAgIFRRdWVyeUZuRGF0YSxcbiAgICBURXJyb3IsXG4gICAgVERhdGEsXG4gICAgVFF1ZXJ5RGF0YSxcbiAgICBUUXVlcnlLZXlcbiAgPiB7XG4gICAgaWYgKG9wdGlvbnM/Ll9kZWZhdWx0ZWQpIHtcbiAgICAgIHJldHVybiBvcHRpb25zIGFzIERlZmF1bHRlZFF1ZXJ5T2JzZXJ2ZXJPcHRpb25zPFxuICAgICAgICBUUXVlcnlGbkRhdGEsXG4gICAgICAgIFRFcnJvcixcbiAgICAgICAgVERhdGEsXG4gICAgICAgIFRRdWVyeURhdGEsXG4gICAgICAgIFRRdWVyeUtleVxuICAgICAgPlxuICAgIH1cblxuICAgIGNvbnN0IGRlZmF1bHRlZE9wdGlvbnMgPSB7XG4gICAgICAuLi50aGlzLmRlZmF1bHRPcHRpb25zLnF1ZXJpZXMsXG4gICAgICAuLi50aGlzLmdldFF1ZXJ5RGVmYXVsdHMob3B0aW9ucz8ucXVlcnlLZXkpLFxuICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIF9kZWZhdWx0ZWQ6IHRydWUsXG4gICAgfVxuXG4gICAgaWYgKCFkZWZhdWx0ZWRPcHRpb25zLnF1ZXJ5SGFzaCAmJiBkZWZhdWx0ZWRPcHRpb25zLnF1ZXJ5S2V5KSB7XG4gICAgICBkZWZhdWx0ZWRPcHRpb25zLnF1ZXJ5SGFzaCA9IGhhc2hRdWVyeUtleUJ5T3B0aW9ucyhcbiAgICAgICAgZGVmYXVsdGVkT3B0aW9ucy5xdWVyeUtleSxcbiAgICAgICAgZGVmYXVsdGVkT3B0aW9ucyxcbiAgICAgIClcbiAgICB9XG5cbiAgICAvLyBkZXBlbmRlbnQgZGVmYXVsdCB2YWx1ZXNcbiAgICBpZiAodHlwZW9mIGRlZmF1bHRlZE9wdGlvbnMucmVmZXRjaE9uUmVjb25uZWN0ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgZGVmYXVsdGVkT3B0aW9ucy5yZWZldGNoT25SZWNvbm5lY3QgPVxuICAgICAgICBkZWZhdWx0ZWRPcHRpb25zLm5ldHdvcmtNb2RlICE9PSAnYWx3YXlzJ1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGRlZmF1bHRlZE9wdGlvbnMudXNlRXJyb3JCb3VuZGFyeSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGRlZmF1bHRlZE9wdGlvbnMudXNlRXJyb3JCb3VuZGFyeSA9ICEhZGVmYXVsdGVkT3B0aW9ucy5zdXNwZW5zZVxuICAgIH1cblxuICAgIHJldHVybiBkZWZhdWx0ZWRPcHRpb25zIGFzIERlZmF1bHRlZFF1ZXJ5T2JzZXJ2ZXJPcHRpb25zPFxuICAgICAgVFF1ZXJ5Rm5EYXRhLFxuICAgICAgVEVycm9yLFxuICAgICAgVERhdGEsXG4gICAgICBUUXVlcnlEYXRhLFxuICAgICAgVFF1ZXJ5S2V5XG4gICAgPlxuICB9XG5cbiAgZGVmYXVsdE11dGF0aW9uT3B0aW9uczxUIGV4dGVuZHMgTXV0YXRpb25PcHRpb25zPGFueSwgYW55LCBhbnksIGFueT4+KFxuICAgIG9wdGlvbnM/OiBULFxuICApOiBUIHtcbiAgICBpZiAob3B0aW9ucz8uX2RlZmF1bHRlZCkge1xuICAgICAgcmV0dXJuIG9wdGlvbnNcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnRoaXMuZGVmYXVsdE9wdGlvbnMubXV0YXRpb25zLFxuICAgICAgLi4udGhpcy5nZXRNdXRhdGlvbkRlZmF1bHRzKG9wdGlvbnM/Lm11dGF0aW9uS2V5KSxcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgICBfZGVmYXVsdGVkOiB0cnVlLFxuICAgIH0gYXMgVFxuICB9XG5cbiAgY2xlYXIoKTogdm9pZCB7XG4gICAgdGhpcy5xdWVyeUNhY2hlLmNsZWFyKClcbiAgICB0aGlzLm11dGF0aW9uQ2FjaGUuY2xlYXIoKVxuICB9XG59XG4iLCAiaW1wb3J0IHtcbiAgaXNTZXJ2ZXIsXG4gIGlzVmFsaWRUaW1lb3V0LFxuICBub29wLFxuICByZXBsYWNlRGF0YSxcbiAgc2hhbGxvd0VxdWFsT2JqZWN0cyxcbiAgdGltZVVudGlsU3RhbGUsXG59IGZyb20gJy4vdXRpbHMnXG5pbXBvcnQgeyBub3RpZnlNYW5hZ2VyIH0gZnJvbSAnLi9ub3RpZnlNYW5hZ2VyJ1xuaW1wb3J0IHsgZm9jdXNNYW5hZ2VyIH0gZnJvbSAnLi9mb2N1c01hbmFnZXInXG5pbXBvcnQgeyBTdWJzY3JpYmFibGUgfSBmcm9tICcuL3N1YnNjcmliYWJsZSdcbmltcG9ydCB7IGNhbkZldGNoLCBpc0NhbmNlbGxlZEVycm9yIH0gZnJvbSAnLi9yZXRyeWVyJ1xuaW1wb3J0IHR5cGUge1xuICBQbGFjZWhvbGRlckRhdGFGdW5jdGlvbixcbiAgUXVlcnlLZXksXG4gIFF1ZXJ5T2JzZXJ2ZXJCYXNlUmVzdWx0LFxuICBRdWVyeU9ic2VydmVyT3B0aW9ucyxcbiAgUXVlcnlPYnNlcnZlclJlc3VsdCxcbiAgUXVlcnlPcHRpb25zLFxuICBSZWZldGNoT3B0aW9ucyxcbn0gZnJvbSAnLi90eXBlcydcbmltcG9ydCB0eXBlIHsgQWN0aW9uLCBGZXRjaE9wdGlvbnMsIFF1ZXJ5LCBRdWVyeVN0YXRlIH0gZnJvbSAnLi9xdWVyeSdcbmltcG9ydCB0eXBlIHsgUXVlcnlDbGllbnQgfSBmcm9tICcuL3F1ZXJ5Q2xpZW50J1xuaW1wb3J0IHR5cGUgeyBEZWZhdWx0ZWRRdWVyeU9ic2VydmVyT3B0aW9ucywgUmVmZXRjaFBhZ2VGaWx0ZXJzIH0gZnJvbSAnLi90eXBlcydcblxudHlwZSBRdWVyeU9ic2VydmVyTGlzdGVuZXI8VERhdGEsIFRFcnJvcj4gPSAoXG4gIHJlc3VsdDogUXVlcnlPYnNlcnZlclJlc3VsdDxURGF0YSwgVEVycm9yPixcbikgPT4gdm9pZFxuXG5leHBvcnQgaW50ZXJmYWNlIE5vdGlmeU9wdGlvbnMge1xuICBjYWNoZT86IGJvb2xlYW5cbiAgbGlzdGVuZXJzPzogYm9vbGVhblxuICBvbkVycm9yPzogYm9vbGVhblxuICBvblN1Y2Nlc3M/OiBib29sZWFuXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgT2JzZXJ2ZXJGZXRjaE9wdGlvbnMgZXh0ZW5kcyBGZXRjaE9wdGlvbnMge1xuICB0aHJvd09uRXJyb3I/OiBib29sZWFuXG59XG5cbmV4cG9ydCBjbGFzcyBRdWVyeU9ic2VydmVyPFxuICBUUXVlcnlGbkRhdGEgPSB1bmtub3duLFxuICBURXJyb3IgPSB1bmtub3duLFxuICBURGF0YSA9IFRRdWVyeUZuRGF0YSxcbiAgVFF1ZXJ5RGF0YSA9IFRRdWVyeUZuRGF0YSxcbiAgVFF1ZXJ5S2V5IGV4dGVuZHMgUXVlcnlLZXkgPSBRdWVyeUtleSxcbj4gZXh0ZW5kcyBTdWJzY3JpYmFibGU8UXVlcnlPYnNlcnZlckxpc3RlbmVyPFREYXRhLCBURXJyb3I+PiB7XG4gIG9wdGlvbnM6IFF1ZXJ5T2JzZXJ2ZXJPcHRpb25zPFxuICAgIFRRdWVyeUZuRGF0YSxcbiAgICBURXJyb3IsXG4gICAgVERhdGEsXG4gICAgVFF1ZXJ5RGF0YSxcbiAgICBUUXVlcnlLZXlcbiAgPlxuXG4gIHByaXZhdGUgY2xpZW50OiBRdWVyeUNsaWVudFxuICBwcml2YXRlIGN1cnJlbnRRdWVyeSE6IFF1ZXJ5PFRRdWVyeUZuRGF0YSwgVEVycm9yLCBUUXVlcnlEYXRhLCBUUXVlcnlLZXk+XG4gIHByaXZhdGUgY3VycmVudFF1ZXJ5SW5pdGlhbFN0YXRlITogUXVlcnlTdGF0ZTxUUXVlcnlEYXRhLCBURXJyb3I+XG4gIHByaXZhdGUgY3VycmVudFJlc3VsdCE6IFF1ZXJ5T2JzZXJ2ZXJSZXN1bHQ8VERhdGEsIFRFcnJvcj5cbiAgcHJpdmF0ZSBjdXJyZW50UmVzdWx0U3RhdGU/OiBRdWVyeVN0YXRlPFRRdWVyeURhdGEsIFRFcnJvcj5cbiAgcHJpdmF0ZSBjdXJyZW50UmVzdWx0T3B0aW9ucz86IFF1ZXJ5T2JzZXJ2ZXJPcHRpb25zPFxuICAgIFRRdWVyeUZuRGF0YSxcbiAgICBURXJyb3IsXG4gICAgVERhdGEsXG4gICAgVFF1ZXJ5RGF0YSxcbiAgICBUUXVlcnlLZXlcbiAgPlxuICBwcml2YXRlIHByZXZpb3VzUXVlcnlSZXN1bHQ/OiBRdWVyeU9ic2VydmVyUmVzdWx0PFREYXRhLCBURXJyb3I+XG4gIHByaXZhdGUgc2VsZWN0RXJyb3I6IFRFcnJvciB8IG51bGxcbiAgcHJpdmF0ZSBzZWxlY3RGbj86IChkYXRhOiBUUXVlcnlEYXRhKSA9PiBURGF0YVxuICBwcml2YXRlIHNlbGVjdFJlc3VsdD86IFREYXRhXG4gIHByaXZhdGUgc3RhbGVUaW1lb3V0SWQ/OiBSZXR1cm5UeXBlPHR5cGVvZiBzZXRUaW1lb3V0PlxuICBwcml2YXRlIHJlZmV0Y2hJbnRlcnZhbElkPzogUmV0dXJuVHlwZTx0eXBlb2Ygc2V0SW50ZXJ2YWw+XG4gIHByaXZhdGUgY3VycmVudFJlZmV0Y2hJbnRlcnZhbD86IG51bWJlciB8IGZhbHNlXG4gIHByaXZhdGUgdHJhY2tlZFByb3BzITogU2V0PGtleW9mIFF1ZXJ5T2JzZXJ2ZXJSZXN1bHQ+XG5cbiAgY29uc3RydWN0b3IoXG4gICAgY2xpZW50OiBRdWVyeUNsaWVudCxcbiAgICBvcHRpb25zOiBRdWVyeU9ic2VydmVyT3B0aW9uczxcbiAgICAgIFRRdWVyeUZuRGF0YSxcbiAgICAgIFRFcnJvcixcbiAgICAgIFREYXRhLFxuICAgICAgVFF1ZXJ5RGF0YSxcbiAgICAgIFRRdWVyeUtleVxuICAgID4sXG4gICkge1xuICAgIHN1cGVyKClcblxuICAgIHRoaXMuY2xpZW50ID0gY2xpZW50XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9uc1xuICAgIHRoaXMudHJhY2tlZFByb3BzID0gbmV3IFNldCgpXG4gICAgdGhpcy5zZWxlY3RFcnJvciA9IG51bGxcbiAgICB0aGlzLmJpbmRNZXRob2RzKClcbiAgICB0aGlzLnNldE9wdGlvbnMob3B0aW9ucylcbiAgfVxuXG4gIHByb3RlY3RlZCBiaW5kTWV0aG9kcygpOiB2b2lkIHtcbiAgICB0aGlzLnJlbW92ZSA9IHRoaXMucmVtb3ZlLmJpbmQodGhpcylcbiAgICB0aGlzLnJlZmV0Y2ggPSB0aGlzLnJlZmV0Y2guYmluZCh0aGlzKVxuICB9XG5cbiAgcHJvdGVjdGVkIG9uU3Vic2NyaWJlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmxpc3RlbmVycy5zaXplID09PSAxKSB7XG4gICAgICB0aGlzLmN1cnJlbnRRdWVyeS5hZGRPYnNlcnZlcih0aGlzKVxuXG4gICAgICBpZiAoc2hvdWxkRmV0Y2hPbk1vdW50KHRoaXMuY3VycmVudFF1ZXJ5LCB0aGlzLm9wdGlvbnMpKSB7XG4gICAgICAgIHRoaXMuZXhlY3V0ZUZldGNoKClcbiAgICAgIH1cblxuICAgICAgdGhpcy51cGRhdGVUaW1lcnMoKVxuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBvblVuc3Vic2NyaWJlKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5oYXNMaXN0ZW5lcnMoKSkge1xuICAgICAgdGhpcy5kZXN0cm95KClcbiAgICB9XG4gIH1cblxuICBzaG91bGRGZXRjaE9uUmVjb25uZWN0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBzaG91bGRGZXRjaE9uKFxuICAgICAgdGhpcy5jdXJyZW50UXVlcnksXG4gICAgICB0aGlzLm9wdGlvbnMsXG4gICAgICB0aGlzLm9wdGlvbnMucmVmZXRjaE9uUmVjb25uZWN0LFxuICAgIClcbiAgfVxuXG4gIHNob3VsZEZldGNoT25XaW5kb3dGb2N1cygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gc2hvdWxkRmV0Y2hPbihcbiAgICAgIHRoaXMuY3VycmVudFF1ZXJ5LFxuICAgICAgdGhpcy5vcHRpb25zLFxuICAgICAgdGhpcy5vcHRpb25zLnJlZmV0Y2hPbldpbmRvd0ZvY3VzLFxuICAgIClcbiAgfVxuXG4gIGRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5saXN0ZW5lcnMgPSBuZXcgU2V0KClcbiAgICB0aGlzLmNsZWFyU3RhbGVUaW1lb3V0KClcbiAgICB0aGlzLmNsZWFyUmVmZXRjaEludGVydmFsKClcbiAgICB0aGlzLmN1cnJlbnRRdWVyeS5yZW1vdmVPYnNlcnZlcih0aGlzKVxuICB9XG5cbiAgc2V0T3B0aW9ucyhcbiAgICBvcHRpb25zPzogUXVlcnlPYnNlcnZlck9wdGlvbnM8XG4gICAgICBUUXVlcnlGbkRhdGEsXG4gICAgICBURXJyb3IsXG4gICAgICBURGF0YSxcbiAgICAgIFRRdWVyeURhdGEsXG4gICAgICBUUXVlcnlLZXlcbiAgICA+LFxuICAgIG5vdGlmeU9wdGlvbnM/OiBOb3RpZnlPcHRpb25zLFxuICApOiB2b2lkIHtcbiAgICBjb25zdCBwcmV2T3B0aW9ucyA9IHRoaXMub3B0aW9uc1xuICAgIGNvbnN0IHByZXZRdWVyeSA9IHRoaXMuY3VycmVudFF1ZXJ5XG5cbiAgICB0aGlzLm9wdGlvbnMgPSB0aGlzLmNsaWVudC5kZWZhdWx0UXVlcnlPcHRpb25zKG9wdGlvbnMpXG5cbiAgICBpZiAoXG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmXG4gICAgICB0eXBlb2Ygb3B0aW9ucz8uaXNEYXRhRXF1YWwgIT09ICd1bmRlZmluZWQnXG4gICAgKSB7XG4gICAgICB0aGlzLmNsaWVudFxuICAgICAgICAuZ2V0TG9nZ2VyKClcbiAgICAgICAgLmVycm9yKFxuICAgICAgICAgIGBUaGUgaXNEYXRhRXF1YWwgb3B0aW9uIGhhcyBiZWVuIGRlcHJlY2F0ZWQgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgbmV4dCBtYWpvciB2ZXJzaW9uLiBZb3UgY2FuIGFjaGlldmUgdGhlIHNhbWUgZnVuY3Rpb25hbGl0eSBieSBwYXNzaW5nIGEgZnVuY3Rpb24gYXMgdGhlIHN0cnVjdHVyYWxTaGFyaW5nIG9wdGlvbmAsXG4gICAgICAgIClcbiAgICB9XG5cbiAgICBpZiAoIXNoYWxsb3dFcXVhbE9iamVjdHMocHJldk9wdGlvbnMsIHRoaXMub3B0aW9ucykpIHtcbiAgICAgIHRoaXMuY2xpZW50LmdldFF1ZXJ5Q2FjaGUoKS5ub3RpZnkoe1xuICAgICAgICB0eXBlOiAnb2JzZXJ2ZXJPcHRpb25zVXBkYXRlZCcsXG4gICAgICAgIHF1ZXJ5OiB0aGlzLmN1cnJlbnRRdWVyeSxcbiAgICAgICAgb2JzZXJ2ZXI6IHRoaXMsXG4gICAgICB9KVxuICAgIH1cblxuICAgIGlmIChcbiAgICAgIHR5cGVvZiB0aGlzLm9wdGlvbnMuZW5hYmxlZCAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgIHR5cGVvZiB0aGlzLm9wdGlvbnMuZW5hYmxlZCAhPT0gJ2Jvb2xlYW4nXG4gICAgKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIGVuYWJsZWQgdG8gYmUgYSBib29sZWFuJylcbiAgICB9XG5cbiAgICAvLyBLZWVwIHByZXZpb3VzIHF1ZXJ5IGtleSBpZiB0aGUgdXNlciBkb2VzIG5vdCBzdXBwbHkgb25lXG4gICAgaWYgKCF0aGlzLm9wdGlvbnMucXVlcnlLZXkpIHtcbiAgICAgIHRoaXMub3B0aW9ucy5xdWVyeUtleSA9IHByZXZPcHRpb25zLnF1ZXJ5S2V5XG4gICAgfVxuXG4gICAgdGhpcy51cGRhdGVRdWVyeSgpXG5cbiAgICBjb25zdCBtb3VudGVkID0gdGhpcy5oYXNMaXN0ZW5lcnMoKVxuXG4gICAgLy8gRmV0Y2ggaWYgdGhlcmUgYXJlIHN1YnNjcmliZXJzXG4gICAgaWYgKFxuICAgICAgbW91bnRlZCAmJlxuICAgICAgc2hvdWxkRmV0Y2hPcHRpb25hbGx5KFxuICAgICAgICB0aGlzLmN1cnJlbnRRdWVyeSxcbiAgICAgICAgcHJldlF1ZXJ5LFxuICAgICAgICB0aGlzLm9wdGlvbnMsXG4gICAgICAgIHByZXZPcHRpb25zLFxuICAgICAgKVxuICAgICkge1xuICAgICAgdGhpcy5leGVjdXRlRmV0Y2goKVxuICAgIH1cblxuICAgIC8vIFVwZGF0ZSByZXN1bHRcbiAgICB0aGlzLnVwZGF0ZVJlc3VsdChub3RpZnlPcHRpb25zKVxuXG4gICAgLy8gVXBkYXRlIHN0YWxlIGludGVydmFsIGlmIG5lZWRlZFxuICAgIGlmIChcbiAgICAgIG1vdW50ZWQgJiZcbiAgICAgICh0aGlzLmN1cnJlbnRRdWVyeSAhPT0gcHJldlF1ZXJ5IHx8XG4gICAgICAgIHRoaXMub3B0aW9ucy5lbmFibGVkICE9PSBwcmV2T3B0aW9ucy5lbmFibGVkIHx8XG4gICAgICAgIHRoaXMub3B0aW9ucy5zdGFsZVRpbWUgIT09IHByZXZPcHRpb25zLnN0YWxlVGltZSlcbiAgICApIHtcbiAgICAgIHRoaXMudXBkYXRlU3RhbGVUaW1lb3V0KClcbiAgICB9XG5cbiAgICBjb25zdCBuZXh0UmVmZXRjaEludGVydmFsID0gdGhpcy5jb21wdXRlUmVmZXRjaEludGVydmFsKClcblxuICAgIC8vIFVwZGF0ZSByZWZldGNoIGludGVydmFsIGlmIG5lZWRlZFxuICAgIGlmIChcbiAgICAgIG1vdW50ZWQgJiZcbiAgICAgICh0aGlzLmN1cnJlbnRRdWVyeSAhPT0gcHJldlF1ZXJ5IHx8XG4gICAgICAgIHRoaXMub3B0aW9ucy5lbmFibGVkICE9PSBwcmV2T3B0aW9ucy5lbmFibGVkIHx8XG4gICAgICAgIG5leHRSZWZldGNoSW50ZXJ2YWwgIT09IHRoaXMuY3VycmVudFJlZmV0Y2hJbnRlcnZhbClcbiAgICApIHtcbiAgICAgIHRoaXMudXBkYXRlUmVmZXRjaEludGVydmFsKG5leHRSZWZldGNoSW50ZXJ2YWwpXG4gICAgfVxuICB9XG5cbiAgZ2V0T3B0aW1pc3RpY1Jlc3VsdChcbiAgICBvcHRpb25zOiBEZWZhdWx0ZWRRdWVyeU9ic2VydmVyT3B0aW9uczxcbiAgICAgIFRRdWVyeUZuRGF0YSxcbiAgICAgIFRFcnJvcixcbiAgICAgIFREYXRhLFxuICAgICAgVFF1ZXJ5RGF0YSxcbiAgICAgIFRRdWVyeUtleVxuICAgID4sXG4gICk6IFF1ZXJ5T2JzZXJ2ZXJSZXN1bHQ8VERhdGEsIFRFcnJvcj4ge1xuICAgIGNvbnN0IHF1ZXJ5ID0gdGhpcy5jbGllbnQuZ2V0UXVlcnlDYWNoZSgpLmJ1aWxkKHRoaXMuY2xpZW50LCBvcHRpb25zKVxuXG4gICAgY29uc3QgcmVzdWx0ID0gdGhpcy5jcmVhdGVSZXN1bHQocXVlcnksIG9wdGlvbnMpXG5cbiAgICBpZiAoc2hvdWxkQXNzaWduT2JzZXJ2ZXJDdXJyZW50UHJvcGVydGllcyh0aGlzLCByZXN1bHQsIG9wdGlvbnMpKSB7XG4gICAgICAvLyB0aGlzIGFzc2lnbnMgdGhlIG9wdGltaXN0aWMgcmVzdWx0IHRvIHRoZSBjdXJyZW50IE9ic2VydmVyXG4gICAgICAvLyBiZWNhdXNlIGlmIHRoZSBxdWVyeSBmdW5jdGlvbiBjaGFuZ2VzLCB1c2VRdWVyeSB3aWxsIGJlIHBlcmZvcm1pbmdcbiAgICAgIC8vIGFuIGVmZmVjdCB3aGVyZSBpdCB3b3VsZCBmZXRjaCBhZ2Fpbi5cbiAgICAgIC8vIFdoZW4gdGhlIGZldGNoIGZpbmlzaGVzLCB3ZSBwZXJmb3JtIGEgZGVlcCBkYXRhIGNsb25pbmcgaW4gb3JkZXJcbiAgICAgIC8vIHRvIHJldXNlIG9iamVjdHMgcmVmZXJlbmNlcy4gVGhpcyBkZWVwIGRhdGEgY2xvbmUgaXMgcGVyZm9ybWVkIGFnYWluc3RcbiAgICAgIC8vIHRoZSBgb2JzZXJ2ZXIuY3VycmVudFJlc3VsdC5kYXRhYCBwcm9wZXJ0eVxuICAgICAgLy8gV2hlbiBRdWVyeUtleSBjaGFuZ2VzLCB3ZSByZWZyZXNoIHRoZSBxdWVyeSBhbmQgZ2V0IG5ldyBgb3B0aW1pc3RpY2BcbiAgICAgIC8vIHJlc3VsdCwgd2hpbGUgd2UgbGVhdmUgdGhlIGBvYnNlcnZlci5jdXJyZW50UmVzdWx0YCwgc28gd2hlbiBuZXcgZGF0YVxuICAgICAgLy8gYXJyaXZlcywgaXQgZmluZHMgdGhlIG9sZCBgb2JzZXJ2ZXIuY3VycmVudFJlc3VsdGAgd2hpY2ggaXMgcmVsYXRlZFxuICAgICAgLy8gdG8gdGhlIG9sZCBRdWVyeUtleS4gV2hpY2ggbWVhbnMgdGhhdCBjdXJyZW50UmVzdWx0IGFuZCBzZWxlY3REYXRhIGFyZVxuICAgICAgLy8gb3V0IG9mIHN5bmMgYWxyZWFkeS5cbiAgICAgIC8vIFRvIHNvbHZlIHRoaXMsIHdlIG1vdmUgdGhlIGN1cnNvciBvZiB0aGUgY3VycmVudFJlc3VsdCBldmVyeXRpbWVcbiAgICAgIC8vIGFuIG9ic2VydmVyIHJlYWRzIGFuIG9wdGltaXN0aWMgdmFsdWUuXG5cbiAgICAgIC8vIFdoZW4ga2VlcGluZyB0aGUgcHJldmlvdXMgZGF0YSwgdGhlIHJlc3VsdCBkb2Vzbid0IGNoYW5nZSB1bnRpbCBuZXdcbiAgICAgIC8vIGRhdGEgYXJyaXZlcy5cbiAgICAgIHRoaXMuY3VycmVudFJlc3VsdCA9IHJlc3VsdFxuICAgICAgdGhpcy5jdXJyZW50UmVzdWx0T3B0aW9ucyA9IHRoaXMub3B0aW9uc1xuICAgICAgdGhpcy5jdXJyZW50UmVzdWx0U3RhdGUgPSB0aGlzLmN1cnJlbnRRdWVyeS5zdGF0ZVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0XG4gIH1cblxuICBnZXRDdXJyZW50UmVzdWx0KCk6IFF1ZXJ5T2JzZXJ2ZXJSZXN1bHQ8VERhdGEsIFRFcnJvcj4ge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRSZXN1bHRcbiAgfVxuXG4gIHRyYWNrUmVzdWx0KFxuICAgIHJlc3VsdDogUXVlcnlPYnNlcnZlclJlc3VsdDxURGF0YSwgVEVycm9yPixcbiAgKTogUXVlcnlPYnNlcnZlclJlc3VsdDxURGF0YSwgVEVycm9yPiB7XG4gICAgY29uc3QgdHJhY2tlZFJlc3VsdCA9IHt9IGFzIFF1ZXJ5T2JzZXJ2ZXJSZXN1bHQ8VERhdGEsIFRFcnJvcj5cblxuICAgIE9iamVjdC5rZXlzKHJlc3VsdCkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodHJhY2tlZFJlc3VsdCwga2V5LCB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGdldDogKCkgPT4ge1xuICAgICAgICAgIHRoaXMudHJhY2tlZFByb3BzLmFkZChrZXkgYXMga2V5b2YgUXVlcnlPYnNlcnZlclJlc3VsdClcbiAgICAgICAgICByZXR1cm4gcmVzdWx0W2tleSBhcyBrZXlvZiBRdWVyeU9ic2VydmVyUmVzdWx0XVxuICAgICAgICB9LFxuICAgICAgfSlcbiAgICB9KVxuXG4gICAgcmV0dXJuIHRyYWNrZWRSZXN1bHRcbiAgfVxuXG4gIGdldEN1cnJlbnRRdWVyeSgpOiBRdWVyeTxUUXVlcnlGbkRhdGEsIFRFcnJvciwgVFF1ZXJ5RGF0YSwgVFF1ZXJ5S2V5PiB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFF1ZXJ5XG4gIH1cblxuICByZW1vdmUoKTogdm9pZCB7XG4gICAgdGhpcy5jbGllbnQuZ2V0UXVlcnlDYWNoZSgpLnJlbW92ZSh0aGlzLmN1cnJlbnRRdWVyeSlcbiAgfVxuXG4gIHJlZmV0Y2g8VFBhZ2VEYXRhPih7XG4gICAgcmVmZXRjaFBhZ2UsXG4gICAgLi4ub3B0aW9uc1xuICB9OiBSZWZldGNoT3B0aW9ucyAmIFJlZmV0Y2hQYWdlRmlsdGVyczxUUGFnZURhdGE+ID0ge30pOiBQcm9taXNlPFxuICAgIFF1ZXJ5T2JzZXJ2ZXJSZXN1bHQ8VERhdGEsIFRFcnJvcj5cbiAgPiB7XG4gICAgcmV0dXJuIHRoaXMuZmV0Y2goe1xuICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIG1ldGE6IHsgcmVmZXRjaFBhZ2UgfSxcbiAgICB9KVxuICB9XG5cbiAgZmV0Y2hPcHRpbWlzdGljKFxuICAgIG9wdGlvbnM6IFF1ZXJ5T2JzZXJ2ZXJPcHRpb25zPFxuICAgICAgVFF1ZXJ5Rm5EYXRhLFxuICAgICAgVEVycm9yLFxuICAgICAgVERhdGEsXG4gICAgICBUUXVlcnlEYXRhLFxuICAgICAgVFF1ZXJ5S2V5XG4gICAgPixcbiAgKTogUHJvbWlzZTxRdWVyeU9ic2VydmVyUmVzdWx0PFREYXRhLCBURXJyb3I+PiB7XG4gICAgY29uc3QgZGVmYXVsdGVkT3B0aW9ucyA9IHRoaXMuY2xpZW50LmRlZmF1bHRRdWVyeU9wdGlvbnMob3B0aW9ucylcblxuICAgIGNvbnN0IHF1ZXJ5ID0gdGhpcy5jbGllbnRcbiAgICAgIC5nZXRRdWVyeUNhY2hlKClcbiAgICAgIC5idWlsZCh0aGlzLmNsaWVudCwgZGVmYXVsdGVkT3B0aW9ucylcbiAgICBxdWVyeS5pc0ZldGNoaW5nT3B0aW1pc3RpYyA9IHRydWVcblxuICAgIHJldHVybiBxdWVyeS5mZXRjaCgpLnRoZW4oKCkgPT4gdGhpcy5jcmVhdGVSZXN1bHQocXVlcnksIGRlZmF1bHRlZE9wdGlvbnMpKVxuICB9XG5cbiAgcHJvdGVjdGVkIGZldGNoKFxuICAgIGZldGNoT3B0aW9uczogT2JzZXJ2ZXJGZXRjaE9wdGlvbnMsXG4gICk6IFByb21pc2U8UXVlcnlPYnNlcnZlclJlc3VsdDxURGF0YSwgVEVycm9yPj4ge1xuICAgIHJldHVybiB0aGlzLmV4ZWN1dGVGZXRjaCh7XG4gICAgICAuLi5mZXRjaE9wdGlvbnMsXG4gICAgICBjYW5jZWxSZWZldGNoOiBmZXRjaE9wdGlvbnMuY2FuY2VsUmVmZXRjaCA/PyB0cnVlLFxuICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgdGhpcy51cGRhdGVSZXN1bHQoKVxuICAgICAgcmV0dXJuIHRoaXMuY3VycmVudFJlc3VsdFxuICAgIH0pXG4gIH1cblxuICBwcml2YXRlIGV4ZWN1dGVGZXRjaChcbiAgICBmZXRjaE9wdGlvbnM/OiBPYnNlcnZlckZldGNoT3B0aW9ucyxcbiAgKTogUHJvbWlzZTxUUXVlcnlEYXRhIHwgdW5kZWZpbmVkPiB7XG4gICAgLy8gTWFrZSBzdXJlIHdlIHJlZmVyZW5jZSB0aGUgbGF0ZXN0IHF1ZXJ5IGFzIHRoZSBjdXJyZW50IG9uZSBtaWdodCBoYXZlIGJlZW4gcmVtb3ZlZFxuICAgIHRoaXMudXBkYXRlUXVlcnkoKVxuXG4gICAgLy8gRmV0Y2hcbiAgICBsZXQgcHJvbWlzZTogUHJvbWlzZTxUUXVlcnlEYXRhIHwgdW5kZWZpbmVkPiA9IHRoaXMuY3VycmVudFF1ZXJ5LmZldGNoKFxuICAgICAgdGhpcy5vcHRpb25zIGFzIFF1ZXJ5T3B0aW9uczxUUXVlcnlGbkRhdGEsIFRFcnJvciwgVFF1ZXJ5RGF0YSwgVFF1ZXJ5S2V5PixcbiAgICAgIGZldGNoT3B0aW9ucyxcbiAgICApXG5cbiAgICBpZiAoIWZldGNoT3B0aW9ucz8udGhyb3dPbkVycm9yKSB7XG4gICAgICBwcm9taXNlID0gcHJvbWlzZS5jYXRjaChub29wKVxuICAgIH1cblxuICAgIHJldHVybiBwcm9taXNlXG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZVN0YWxlVGltZW91dCgpOiB2b2lkIHtcbiAgICB0aGlzLmNsZWFyU3RhbGVUaW1lb3V0KClcblxuICAgIGlmIChcbiAgICAgIGlzU2VydmVyIHx8XG4gICAgICB0aGlzLmN1cnJlbnRSZXN1bHQuaXNTdGFsZSB8fFxuICAgICAgIWlzVmFsaWRUaW1lb3V0KHRoaXMub3B0aW9ucy5zdGFsZVRpbWUpXG4gICAgKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdCB0aW1lID0gdGltZVVudGlsU3RhbGUoXG4gICAgICB0aGlzLmN1cnJlbnRSZXN1bHQuZGF0YVVwZGF0ZWRBdCxcbiAgICAgIHRoaXMub3B0aW9ucy5zdGFsZVRpbWUsXG4gICAgKVxuXG4gICAgLy8gVGhlIHRpbWVvdXQgaXMgc29tZXRpbWVzIHRyaWdnZXJlZCAxIG1zIGJlZm9yZSB0aGUgc3RhbGUgdGltZSBleHBpcmF0aW9uLlxuICAgIC8vIFRvIG1pdGlnYXRlIHRoaXMgaXNzdWUgd2UgYWx3YXlzIGFkZCAxIG1zIHRvIHRoZSB0aW1lb3V0LlxuICAgIGNvbnN0IHRpbWVvdXQgPSB0aW1lICsgMVxuXG4gICAgdGhpcy5zdGFsZVRpbWVvdXRJZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLmN1cnJlbnRSZXN1bHQuaXNTdGFsZSkge1xuICAgICAgICB0aGlzLnVwZGF0ZVJlc3VsdCgpXG4gICAgICB9XG4gICAgfSwgdGltZW91dClcbiAgfVxuXG4gIHByaXZhdGUgY29tcHV0ZVJlZmV0Y2hJbnRlcnZhbCgpIHtcbiAgICByZXR1cm4gdHlwZW9mIHRoaXMub3B0aW9ucy5yZWZldGNoSW50ZXJ2YWwgPT09ICdmdW5jdGlvbidcbiAgICAgID8gdGhpcy5vcHRpb25zLnJlZmV0Y2hJbnRlcnZhbCh0aGlzLmN1cnJlbnRSZXN1bHQuZGF0YSwgdGhpcy5jdXJyZW50UXVlcnkpXG4gICAgICA6IHRoaXMub3B0aW9ucy5yZWZldGNoSW50ZXJ2YWwgPz8gZmFsc2VcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlUmVmZXRjaEludGVydmFsKG5leHRJbnRlcnZhbDogbnVtYmVyIHwgZmFsc2UpOiB2b2lkIHtcbiAgICB0aGlzLmNsZWFyUmVmZXRjaEludGVydmFsKClcblxuICAgIHRoaXMuY3VycmVudFJlZmV0Y2hJbnRlcnZhbCA9IG5leHRJbnRlcnZhbFxuXG4gICAgaWYgKFxuICAgICAgaXNTZXJ2ZXIgfHxcbiAgICAgIHRoaXMub3B0aW9ucy5lbmFibGVkID09PSBmYWxzZSB8fFxuICAgICAgIWlzVmFsaWRUaW1lb3V0KHRoaXMuY3VycmVudFJlZmV0Y2hJbnRlcnZhbCkgfHxcbiAgICAgIHRoaXMuY3VycmVudFJlZmV0Y2hJbnRlcnZhbCA9PT0gMFxuICAgICkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgdGhpcy5yZWZldGNoSW50ZXJ2YWxJZCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy5vcHRpb25zLnJlZmV0Y2hJbnRlcnZhbEluQmFja2dyb3VuZCB8fFxuICAgICAgICBmb2N1c01hbmFnZXIuaXNGb2N1c2VkKClcbiAgICAgICkge1xuICAgICAgICB0aGlzLmV4ZWN1dGVGZXRjaCgpXG4gICAgICB9XG4gICAgfSwgdGhpcy5jdXJyZW50UmVmZXRjaEludGVydmFsKVxuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVUaW1lcnMoKTogdm9pZCB7XG4gICAgdGhpcy51cGRhdGVTdGFsZVRpbWVvdXQoKVxuICAgIHRoaXMudXBkYXRlUmVmZXRjaEludGVydmFsKHRoaXMuY29tcHV0ZVJlZmV0Y2hJbnRlcnZhbCgpKVxuICB9XG5cbiAgcHJpdmF0ZSBjbGVhclN0YWxlVGltZW91dCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5zdGFsZVRpbWVvdXRJZCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuc3RhbGVUaW1lb3V0SWQpXG4gICAgICB0aGlzLnN0YWxlVGltZW91dElkID0gdW5kZWZpbmVkXG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjbGVhclJlZmV0Y2hJbnRlcnZhbCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5yZWZldGNoSW50ZXJ2YWxJZCkge1xuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnJlZmV0Y2hJbnRlcnZhbElkKVxuICAgICAgdGhpcy5yZWZldGNoSW50ZXJ2YWxJZCA9IHVuZGVmaW5lZFxuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBjcmVhdGVSZXN1bHQoXG4gICAgcXVlcnk6IFF1ZXJ5PFRRdWVyeUZuRGF0YSwgVEVycm9yLCBUUXVlcnlEYXRhLCBUUXVlcnlLZXk+LFxuICAgIG9wdGlvbnM6IFF1ZXJ5T2JzZXJ2ZXJPcHRpb25zPFxuICAgICAgVFF1ZXJ5Rm5EYXRhLFxuICAgICAgVEVycm9yLFxuICAgICAgVERhdGEsXG4gICAgICBUUXVlcnlEYXRhLFxuICAgICAgVFF1ZXJ5S2V5XG4gICAgPixcbiAgKTogUXVlcnlPYnNlcnZlclJlc3VsdDxURGF0YSwgVEVycm9yPiB7XG4gICAgY29uc3QgcHJldlF1ZXJ5ID0gdGhpcy5jdXJyZW50UXVlcnlcbiAgICBjb25zdCBwcmV2T3B0aW9ucyA9IHRoaXMub3B0aW9uc1xuICAgIGNvbnN0IHByZXZSZXN1bHQgPSB0aGlzLmN1cnJlbnRSZXN1bHQgYXNcbiAgICAgIHwgUXVlcnlPYnNlcnZlclJlc3VsdDxURGF0YSwgVEVycm9yPlxuICAgICAgfCB1bmRlZmluZWRcbiAgICBjb25zdCBwcmV2UmVzdWx0U3RhdGUgPSB0aGlzLmN1cnJlbnRSZXN1bHRTdGF0ZVxuICAgIGNvbnN0IHByZXZSZXN1bHRPcHRpb25zID0gdGhpcy5jdXJyZW50UmVzdWx0T3B0aW9uc1xuICAgIGNvbnN0IHF1ZXJ5Q2hhbmdlID0gcXVlcnkgIT09IHByZXZRdWVyeVxuICAgIGNvbnN0IHF1ZXJ5SW5pdGlhbFN0YXRlID0gcXVlcnlDaGFuZ2VcbiAgICAgID8gcXVlcnkuc3RhdGVcbiAgICAgIDogdGhpcy5jdXJyZW50UXVlcnlJbml0aWFsU3RhdGVcbiAgICBjb25zdCBwcmV2UXVlcnlSZXN1bHQgPSBxdWVyeUNoYW5nZVxuICAgICAgPyB0aGlzLmN1cnJlbnRSZXN1bHRcbiAgICAgIDogdGhpcy5wcmV2aW91c1F1ZXJ5UmVzdWx0XG5cbiAgICBjb25zdCB7IHN0YXRlIH0gPSBxdWVyeVxuICAgIGxldCB7IGRhdGFVcGRhdGVkQXQsIGVycm9yLCBlcnJvclVwZGF0ZWRBdCwgZmV0Y2hTdGF0dXMsIHN0YXR1cyB9ID0gc3RhdGVcbiAgICBsZXQgaXNQcmV2aW91c0RhdGEgPSBmYWxzZVxuICAgIGxldCBpc1BsYWNlaG9sZGVyRGF0YSA9IGZhbHNlXG4gICAgbGV0IGRhdGE6IFREYXRhIHwgdW5kZWZpbmVkXG5cbiAgICAvLyBPcHRpbWlzdGljYWxseSBzZXQgcmVzdWx0IGluIGZldGNoaW5nIHN0YXRlIGlmIG5lZWRlZFxuICAgIGlmIChvcHRpb25zLl9vcHRpbWlzdGljUmVzdWx0cykge1xuICAgICAgY29uc3QgbW91bnRlZCA9IHRoaXMuaGFzTGlzdGVuZXJzKClcblxuICAgICAgY29uc3QgZmV0Y2hPbk1vdW50ID0gIW1vdW50ZWQgJiYgc2hvdWxkRmV0Y2hPbk1vdW50KHF1ZXJ5LCBvcHRpb25zKVxuXG4gICAgICBjb25zdCBmZXRjaE9wdGlvbmFsbHkgPVxuICAgICAgICBtb3VudGVkICYmIHNob3VsZEZldGNoT3B0aW9uYWxseShxdWVyeSwgcHJldlF1ZXJ5LCBvcHRpb25zLCBwcmV2T3B0aW9ucylcblxuICAgICAgaWYgKGZldGNoT25Nb3VudCB8fCBmZXRjaE9wdGlvbmFsbHkpIHtcbiAgICAgICAgZmV0Y2hTdGF0dXMgPSBjYW5GZXRjaChxdWVyeS5vcHRpb25zLm5ldHdvcmtNb2RlKVxuICAgICAgICAgID8gJ2ZldGNoaW5nJ1xuICAgICAgICAgIDogJ3BhdXNlZCdcbiAgICAgICAgaWYgKCFkYXRhVXBkYXRlZEF0KSB7XG4gICAgICAgICAgc3RhdHVzID0gJ2xvYWRpbmcnXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChvcHRpb25zLl9vcHRpbWlzdGljUmVzdWx0cyA9PT0gJ2lzUmVzdG9yaW5nJykge1xuICAgICAgICBmZXRjaFN0YXR1cyA9ICdpZGxlJ1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEtlZXAgcHJldmlvdXMgZGF0YSBpZiBuZWVkZWRcbiAgICBpZiAoXG4gICAgICBvcHRpb25zLmtlZXBQcmV2aW91c0RhdGEgJiZcbiAgICAgICFzdGF0ZS5kYXRhVXBkYXRlZEF0ICYmXG4gICAgICBwcmV2UXVlcnlSZXN1bHQ/LmlzU3VjY2VzcyAmJlxuICAgICAgc3RhdHVzICE9PSAnZXJyb3InXG4gICAgKSB7XG4gICAgICBkYXRhID0gcHJldlF1ZXJ5UmVzdWx0LmRhdGFcbiAgICAgIGRhdGFVcGRhdGVkQXQgPSBwcmV2UXVlcnlSZXN1bHQuZGF0YVVwZGF0ZWRBdFxuICAgICAgc3RhdHVzID0gcHJldlF1ZXJ5UmVzdWx0LnN0YXR1c1xuICAgICAgaXNQcmV2aW91c0RhdGEgPSB0cnVlXG4gICAgfVxuICAgIC8vIFNlbGVjdCBkYXRhIGlmIG5lZWRlZFxuICAgIGVsc2UgaWYgKG9wdGlvbnMuc2VsZWN0ICYmIHR5cGVvZiBzdGF0ZS5kYXRhICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgLy8gTWVtb2l6ZSBzZWxlY3QgcmVzdWx0XG4gICAgICBpZiAoXG4gICAgICAgIHByZXZSZXN1bHQgJiZcbiAgICAgICAgc3RhdGUuZGF0YSA9PT0gcHJldlJlc3VsdFN0YXRlPy5kYXRhICYmXG4gICAgICAgIG9wdGlvbnMuc2VsZWN0ID09PSB0aGlzLnNlbGVjdEZuXG4gICAgICApIHtcbiAgICAgICAgZGF0YSA9IHRoaXMuc2VsZWN0UmVzdWx0XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHRoaXMuc2VsZWN0Rm4gPSBvcHRpb25zLnNlbGVjdFxuICAgICAgICAgIGRhdGEgPSBvcHRpb25zLnNlbGVjdChzdGF0ZS5kYXRhKVxuICAgICAgICAgIGRhdGEgPSByZXBsYWNlRGF0YShwcmV2UmVzdWx0Py5kYXRhLCBkYXRhLCBvcHRpb25zKVxuICAgICAgICAgIHRoaXMuc2VsZWN0UmVzdWx0ID0gZGF0YVxuICAgICAgICAgIHRoaXMuc2VsZWN0RXJyb3IgPSBudWxsXG4gICAgICAgIH0gY2F0Y2ggKHNlbGVjdEVycm9yKSB7XG4gICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgIHRoaXMuY2xpZW50LmdldExvZ2dlcigpLmVycm9yKHNlbGVjdEVycm9yKVxuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLnNlbGVjdEVycm9yID0gc2VsZWN0RXJyb3IgYXMgVEVycm9yXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgLy8gVXNlIHF1ZXJ5IGRhdGFcbiAgICBlbHNlIHtcbiAgICAgIGRhdGEgPSBzdGF0ZS5kYXRhIGFzIHVua25vd24gYXMgVERhdGFcbiAgICB9XG5cbiAgICAvLyBTaG93IHBsYWNlaG9sZGVyIGRhdGEgaWYgbmVlZGVkXG4gICAgaWYgKFxuICAgICAgdHlwZW9mIG9wdGlvbnMucGxhY2Vob2xkZXJEYXRhICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgdHlwZW9mIGRhdGEgPT09ICd1bmRlZmluZWQnICYmXG4gICAgICBzdGF0dXMgPT09ICdsb2FkaW5nJ1xuICAgICkge1xuICAgICAgbGV0IHBsYWNlaG9sZGVyRGF0YVxuXG4gICAgICAvLyBNZW1vaXplIHBsYWNlaG9sZGVyIGRhdGFcbiAgICAgIGlmIChcbiAgICAgICAgcHJldlJlc3VsdD8uaXNQbGFjZWhvbGRlckRhdGEgJiZcbiAgICAgICAgb3B0aW9ucy5wbGFjZWhvbGRlckRhdGEgPT09IHByZXZSZXN1bHRPcHRpb25zPy5wbGFjZWhvbGRlckRhdGFcbiAgICAgICkge1xuICAgICAgICBwbGFjZWhvbGRlckRhdGEgPSBwcmV2UmVzdWx0LmRhdGFcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBsYWNlaG9sZGVyRGF0YSA9XG4gICAgICAgICAgdHlwZW9mIG9wdGlvbnMucGxhY2Vob2xkZXJEYXRhID09PSAnZnVuY3Rpb24nXG4gICAgICAgICAgICA/IChvcHRpb25zLnBsYWNlaG9sZGVyRGF0YSBhcyBQbGFjZWhvbGRlckRhdGFGdW5jdGlvbjxUUXVlcnlEYXRhPikoKVxuICAgICAgICAgICAgOiBvcHRpb25zLnBsYWNlaG9sZGVyRGF0YVxuICAgICAgICBpZiAob3B0aW9ucy5zZWxlY3QgJiYgdHlwZW9mIHBsYWNlaG9sZGVyRGF0YSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgcGxhY2Vob2xkZXJEYXRhID0gb3B0aW9ucy5zZWxlY3QocGxhY2Vob2xkZXJEYXRhKVxuICAgICAgICAgICAgdGhpcy5zZWxlY3RFcnJvciA9IG51bGxcbiAgICAgICAgICB9IGNhdGNoIChzZWxlY3RFcnJvcikge1xuICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgICAgdGhpcy5jbGllbnQuZ2V0TG9nZ2VyKCkuZXJyb3Ioc2VsZWN0RXJyb3IpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNlbGVjdEVycm9yID0gc2VsZWN0RXJyb3IgYXMgVEVycm9yXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgcGxhY2Vob2xkZXJEYXRhICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBzdGF0dXMgPSAnc3VjY2VzcydcbiAgICAgICAgZGF0YSA9IHJlcGxhY2VEYXRhKHByZXZSZXN1bHQ/LmRhdGEsIHBsYWNlaG9sZGVyRGF0YSwgb3B0aW9ucykgYXMgVERhdGFcbiAgICAgICAgaXNQbGFjZWhvbGRlckRhdGEgPSB0cnVlXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc2VsZWN0RXJyb3IpIHtcbiAgICAgIGVycm9yID0gdGhpcy5zZWxlY3RFcnJvciBhcyBhbnlcbiAgICAgIGRhdGEgPSB0aGlzLnNlbGVjdFJlc3VsdFxuICAgICAgZXJyb3JVcGRhdGVkQXQgPSBEYXRlLm5vdygpXG4gICAgICBzdGF0dXMgPSAnZXJyb3InXG4gICAgfVxuXG4gICAgY29uc3QgaXNGZXRjaGluZyA9IGZldGNoU3RhdHVzID09PSAnZmV0Y2hpbmcnXG4gICAgY29uc3QgaXNMb2FkaW5nID0gc3RhdHVzID09PSAnbG9hZGluZydcbiAgICBjb25zdCBpc0Vycm9yID0gc3RhdHVzID09PSAnZXJyb3InXG5cbiAgICBjb25zdCByZXN1bHQ6IFF1ZXJ5T2JzZXJ2ZXJCYXNlUmVzdWx0PFREYXRhLCBURXJyb3I+ID0ge1xuICAgICAgc3RhdHVzLFxuICAgICAgZmV0Y2hTdGF0dXMsXG4gICAgICBpc0xvYWRpbmcsXG4gICAgICBpc1N1Y2Nlc3M6IHN0YXR1cyA9PT0gJ3N1Y2Nlc3MnLFxuICAgICAgaXNFcnJvcixcbiAgICAgIGlzSW5pdGlhbExvYWRpbmc6IGlzTG9hZGluZyAmJiBpc0ZldGNoaW5nLFxuICAgICAgZGF0YSxcbiAgICAgIGRhdGFVcGRhdGVkQXQsXG4gICAgICBlcnJvcixcbiAgICAgIGVycm9yVXBkYXRlZEF0LFxuICAgICAgZmFpbHVyZUNvdW50OiBzdGF0ZS5mZXRjaEZhaWx1cmVDb3VudCxcbiAgICAgIGZhaWx1cmVSZWFzb246IHN0YXRlLmZldGNoRmFpbHVyZVJlYXNvbixcbiAgICAgIGVycm9yVXBkYXRlQ291bnQ6IHN0YXRlLmVycm9yVXBkYXRlQ291bnQsXG4gICAgICBpc0ZldGNoZWQ6IHN0YXRlLmRhdGFVcGRhdGVDb3VudCA+IDAgfHwgc3RhdGUuZXJyb3JVcGRhdGVDb3VudCA+IDAsXG4gICAgICBpc0ZldGNoZWRBZnRlck1vdW50OlxuICAgICAgICBzdGF0ZS5kYXRhVXBkYXRlQ291bnQgPiBxdWVyeUluaXRpYWxTdGF0ZS5kYXRhVXBkYXRlQ291bnQgfHxcbiAgICAgICAgc3RhdGUuZXJyb3JVcGRhdGVDb3VudCA+IHF1ZXJ5SW5pdGlhbFN0YXRlLmVycm9yVXBkYXRlQ291bnQsXG4gICAgICBpc0ZldGNoaW5nLFxuICAgICAgaXNSZWZldGNoaW5nOiBpc0ZldGNoaW5nICYmICFpc0xvYWRpbmcsXG4gICAgICBpc0xvYWRpbmdFcnJvcjogaXNFcnJvciAmJiBzdGF0ZS5kYXRhVXBkYXRlZEF0ID09PSAwLFxuICAgICAgaXNQYXVzZWQ6IGZldGNoU3RhdHVzID09PSAncGF1c2VkJyxcbiAgICAgIGlzUGxhY2Vob2xkZXJEYXRhLFxuICAgICAgaXNQcmV2aW91c0RhdGEsXG4gICAgICBpc1JlZmV0Y2hFcnJvcjogaXNFcnJvciAmJiBzdGF0ZS5kYXRhVXBkYXRlZEF0ICE9PSAwLFxuICAgICAgaXNTdGFsZTogaXNTdGFsZShxdWVyeSwgb3B0aW9ucyksXG4gICAgICByZWZldGNoOiB0aGlzLnJlZmV0Y2gsXG4gICAgICByZW1vdmU6IHRoaXMucmVtb3ZlLFxuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQgYXMgUXVlcnlPYnNlcnZlclJlc3VsdDxURGF0YSwgVEVycm9yPlxuICB9XG5cbiAgdXBkYXRlUmVzdWx0KG5vdGlmeU9wdGlvbnM/OiBOb3RpZnlPcHRpb25zKTogdm9pZCB7XG4gICAgY29uc3QgcHJldlJlc3VsdCA9IHRoaXMuY3VycmVudFJlc3VsdCBhc1xuICAgICAgfCBRdWVyeU9ic2VydmVyUmVzdWx0PFREYXRhLCBURXJyb3I+XG4gICAgICB8IHVuZGVmaW5lZFxuXG4gICAgY29uc3QgbmV4dFJlc3VsdCA9IHRoaXMuY3JlYXRlUmVzdWx0KHRoaXMuY3VycmVudFF1ZXJ5LCB0aGlzLm9wdGlvbnMpXG4gICAgdGhpcy5jdXJyZW50UmVzdWx0U3RhdGUgPSB0aGlzLmN1cnJlbnRRdWVyeS5zdGF0ZVxuICAgIHRoaXMuY3VycmVudFJlc3VsdE9wdGlvbnMgPSB0aGlzLm9wdGlvbnNcblxuICAgIC8vIE9ubHkgbm90aWZ5IGFuZCB1cGRhdGUgcmVzdWx0IGlmIHNvbWV0aGluZyBoYXMgY2hhbmdlZFxuICAgIGlmIChzaGFsbG93RXF1YWxPYmplY3RzKG5leHRSZXN1bHQsIHByZXZSZXN1bHQpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICB0aGlzLmN1cnJlbnRSZXN1bHQgPSBuZXh0UmVzdWx0XG5cbiAgICAvLyBEZXRlcm1pbmUgd2hpY2ggY2FsbGJhY2tzIHRvIHRyaWdnZXJcbiAgICBjb25zdCBkZWZhdWx0Tm90aWZ5T3B0aW9uczogTm90aWZ5T3B0aW9ucyA9IHsgY2FjaGU6IHRydWUgfVxuXG4gICAgY29uc3Qgc2hvdWxkTm90aWZ5TGlzdGVuZXJzID0gKCk6IGJvb2xlYW4gPT4ge1xuICAgICAgaWYgKCFwcmV2UmVzdWx0KSB7XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHsgbm90aWZ5T25DaGFuZ2VQcm9wcyB9ID0gdGhpcy5vcHRpb25zXG4gICAgICBjb25zdCBub3RpZnlPbkNoYW5nZVByb3BzVmFsdWUgPVxuICAgICAgICB0eXBlb2Ygbm90aWZ5T25DaGFuZ2VQcm9wcyA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICAgID8gbm90aWZ5T25DaGFuZ2VQcm9wcygpXG4gICAgICAgICAgOiBub3RpZnlPbkNoYW5nZVByb3BzXG5cbiAgICAgIGlmIChcbiAgICAgICAgbm90aWZ5T25DaGFuZ2VQcm9wc1ZhbHVlID09PSAnYWxsJyB8fFxuICAgICAgICAoIW5vdGlmeU9uQ2hhbmdlUHJvcHNWYWx1ZSAmJiAhdGhpcy50cmFja2VkUHJvcHMuc2l6ZSlcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuXG4gICAgICBjb25zdCBpbmNsdWRlZFByb3BzID0gbmV3IFNldChcbiAgICAgICAgbm90aWZ5T25DaGFuZ2VQcm9wc1ZhbHVlID8/IHRoaXMudHJhY2tlZFByb3BzLFxuICAgICAgKVxuXG4gICAgICBpZiAodGhpcy5vcHRpb25zLnVzZUVycm9yQm91bmRhcnkpIHtcbiAgICAgICAgaW5jbHVkZWRQcm9wcy5hZGQoJ2Vycm9yJylcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuY3VycmVudFJlc3VsdCkuc29tZSgoa2V5KSA9PiB7XG4gICAgICAgIGNvbnN0IHR5cGVkS2V5ID0ga2V5IGFzIGtleW9mIFF1ZXJ5T2JzZXJ2ZXJSZXN1bHRcbiAgICAgICAgY29uc3QgY2hhbmdlZCA9IHRoaXMuY3VycmVudFJlc3VsdFt0eXBlZEtleV0gIT09IHByZXZSZXN1bHRbdHlwZWRLZXldXG4gICAgICAgIHJldHVybiBjaGFuZ2VkICYmIGluY2x1ZGVkUHJvcHMuaGFzKHR5cGVkS2V5KVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBpZiAobm90aWZ5T3B0aW9ucz8ubGlzdGVuZXJzICE9PSBmYWxzZSAmJiBzaG91bGROb3RpZnlMaXN0ZW5lcnMoKSkge1xuICAgICAgZGVmYXVsdE5vdGlmeU9wdGlvbnMubGlzdGVuZXJzID0gdHJ1ZVxuICAgIH1cblxuICAgIHRoaXMubm90aWZ5KHsgLi4uZGVmYXVsdE5vdGlmeU9wdGlvbnMsIC4uLm5vdGlmeU9wdGlvbnMgfSlcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlUXVlcnkoKTogdm9pZCB7XG4gICAgY29uc3QgcXVlcnkgPSB0aGlzLmNsaWVudC5nZXRRdWVyeUNhY2hlKCkuYnVpbGQodGhpcy5jbGllbnQsIHRoaXMub3B0aW9ucylcblxuICAgIGlmIChxdWVyeSA9PT0gdGhpcy5jdXJyZW50UXVlcnkpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0IHByZXZRdWVyeSA9IHRoaXMuY3VycmVudFF1ZXJ5IGFzXG4gICAgICB8IFF1ZXJ5PFRRdWVyeUZuRGF0YSwgVEVycm9yLCBUUXVlcnlEYXRhLCBUUXVlcnlLZXk+XG4gICAgICB8IHVuZGVmaW5lZFxuICAgIHRoaXMuY3VycmVudFF1ZXJ5ID0gcXVlcnlcbiAgICB0aGlzLmN1cnJlbnRRdWVyeUluaXRpYWxTdGF0ZSA9IHF1ZXJ5LnN0YXRlXG4gICAgdGhpcy5wcmV2aW91c1F1ZXJ5UmVzdWx0ID0gdGhpcy5jdXJyZW50UmVzdWx0XG5cbiAgICBpZiAodGhpcy5oYXNMaXN0ZW5lcnMoKSkge1xuICAgICAgcHJldlF1ZXJ5Py5yZW1vdmVPYnNlcnZlcih0aGlzKVxuICAgICAgcXVlcnkuYWRkT2JzZXJ2ZXIodGhpcylcbiAgICB9XG4gIH1cblxuICBvblF1ZXJ5VXBkYXRlKGFjdGlvbjogQWN0aW9uPFREYXRhLCBURXJyb3I+KTogdm9pZCB7XG4gICAgY29uc3Qgbm90aWZ5T3B0aW9uczogTm90aWZ5T3B0aW9ucyA9IHt9XG5cbiAgICBpZiAoYWN0aW9uLnR5cGUgPT09ICdzdWNjZXNzJykge1xuICAgICAgbm90aWZ5T3B0aW9ucy5vblN1Y2Nlc3MgPSAhYWN0aW9uLm1hbnVhbFxuICAgIH0gZWxzZSBpZiAoYWN0aW9uLnR5cGUgPT09ICdlcnJvcicgJiYgIWlzQ2FuY2VsbGVkRXJyb3IoYWN0aW9uLmVycm9yKSkge1xuICAgICAgbm90aWZ5T3B0aW9ucy5vbkVycm9yID0gdHJ1ZVxuICAgIH1cblxuICAgIHRoaXMudXBkYXRlUmVzdWx0KG5vdGlmeU9wdGlvbnMpXG5cbiAgICBpZiAodGhpcy5oYXNMaXN0ZW5lcnMoKSkge1xuICAgICAgdGhpcy51cGRhdGVUaW1lcnMoKVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgbm90aWZ5KG5vdGlmeU9wdGlvbnM6IE5vdGlmeU9wdGlvbnMpOiB2b2lkIHtcbiAgICBub3RpZnlNYW5hZ2VyLmJhdGNoKCgpID0+IHtcbiAgICAgIC8vIEZpcnN0IHRyaWdnZXIgdGhlIGNvbmZpZ3VyYXRpb24gY2FsbGJhY2tzXG4gICAgICBpZiAobm90aWZ5T3B0aW9ucy5vblN1Y2Nlc3MpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zLm9uU3VjY2Vzcz8uKHRoaXMuY3VycmVudFJlc3VsdC5kYXRhISlcbiAgICAgICAgdGhpcy5vcHRpb25zLm9uU2V0dGxlZD8uKHRoaXMuY3VycmVudFJlc3VsdC5kYXRhISwgbnVsbClcbiAgICAgIH0gZWxzZSBpZiAobm90aWZ5T3B0aW9ucy5vbkVycm9yKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5vbkVycm9yPy4odGhpcy5jdXJyZW50UmVzdWx0LmVycm9yISlcbiAgICAgICAgdGhpcy5vcHRpb25zLm9uU2V0dGxlZD8uKHVuZGVmaW5lZCwgdGhpcy5jdXJyZW50UmVzdWx0LmVycm9yISlcbiAgICAgIH1cblxuICAgICAgLy8gVGhlbiB0cmlnZ2VyIHRoZSBsaXN0ZW5lcnNcbiAgICAgIGlmIChub3RpZnlPcHRpb25zLmxpc3RlbmVycykge1xuICAgICAgICB0aGlzLmxpc3RlbmVycy5mb3JFYWNoKCh7IGxpc3RlbmVyIH0pID0+IHtcbiAgICAgICAgICBsaXN0ZW5lcih0aGlzLmN1cnJlbnRSZXN1bHQpXG4gICAgICAgIH0pXG4gICAgICB9XG5cbiAgICAgIC8vIFRoZW4gdGhlIGNhY2hlIGxpc3RlbmVyc1xuICAgICAgaWYgKG5vdGlmeU9wdGlvbnMuY2FjaGUpIHtcbiAgICAgICAgdGhpcy5jbGllbnQuZ2V0UXVlcnlDYWNoZSgpLm5vdGlmeSh7XG4gICAgICAgICAgcXVlcnk6IHRoaXMuY3VycmVudFF1ZXJ5LFxuICAgICAgICAgIHR5cGU6ICdvYnNlcnZlclJlc3VsdHNVcGRhdGVkJyxcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG59XG5cbmZ1bmN0aW9uIHNob3VsZExvYWRPbk1vdW50KFxuICBxdWVyeTogUXVlcnk8YW55LCBhbnksIGFueSwgYW55PixcbiAgb3B0aW9uczogUXVlcnlPYnNlcnZlck9wdGlvbnM8YW55LCBhbnksIGFueSwgYW55Pixcbik6IGJvb2xlYW4ge1xuICByZXR1cm4gKFxuICAgIG9wdGlvbnMuZW5hYmxlZCAhPT0gZmFsc2UgJiZcbiAgICAhcXVlcnkuc3RhdGUuZGF0YVVwZGF0ZWRBdCAmJlxuICAgICEocXVlcnkuc3RhdGUuc3RhdHVzID09PSAnZXJyb3InICYmIG9wdGlvbnMucmV0cnlPbk1vdW50ID09PSBmYWxzZSlcbiAgKVxufVxuXG5mdW5jdGlvbiBzaG91bGRGZXRjaE9uTW91bnQoXG4gIHF1ZXJ5OiBRdWVyeTxhbnksIGFueSwgYW55LCBhbnk+LFxuICBvcHRpb25zOiBRdWVyeU9ic2VydmVyT3B0aW9uczxhbnksIGFueSwgYW55LCBhbnksIGFueT4sXG4pOiBib29sZWFuIHtcbiAgcmV0dXJuIChcbiAgICBzaG91bGRMb2FkT25Nb3VudChxdWVyeSwgb3B0aW9ucykgfHxcbiAgICAocXVlcnkuc3RhdGUuZGF0YVVwZGF0ZWRBdCA+IDAgJiZcbiAgICAgIHNob3VsZEZldGNoT24ocXVlcnksIG9wdGlvbnMsIG9wdGlvbnMucmVmZXRjaE9uTW91bnQpKVxuICApXG59XG5cbmZ1bmN0aW9uIHNob3VsZEZldGNoT24oXG4gIHF1ZXJ5OiBRdWVyeTxhbnksIGFueSwgYW55LCBhbnk+LFxuICBvcHRpb25zOiBRdWVyeU9ic2VydmVyT3B0aW9uczxhbnksIGFueSwgYW55LCBhbnksIGFueT4sXG4gIGZpZWxkOiB0eXBlb2Ygb3B0aW9uc1sncmVmZXRjaE9uTW91bnQnXSAmXG4gICAgdHlwZW9mIG9wdGlvbnNbJ3JlZmV0Y2hPbldpbmRvd0ZvY3VzJ10gJlxuICAgIHR5cGVvZiBvcHRpb25zWydyZWZldGNoT25SZWNvbm5lY3QnXSxcbikge1xuICBpZiAob3B0aW9ucy5lbmFibGVkICE9PSBmYWxzZSkge1xuICAgIGNvbnN0IHZhbHVlID0gdHlwZW9mIGZpZWxkID09PSAnZnVuY3Rpb24nID8gZmllbGQocXVlcnkpIDogZmllbGRcblxuICAgIHJldHVybiB2YWx1ZSA9PT0gJ2Fsd2F5cycgfHwgKHZhbHVlICE9PSBmYWxzZSAmJiBpc1N0YWxlKHF1ZXJ5LCBvcHRpb25zKSlcbiAgfVxuICByZXR1cm4gZmFsc2Vcbn1cblxuZnVuY3Rpb24gc2hvdWxkRmV0Y2hPcHRpb25hbGx5KFxuICBxdWVyeTogUXVlcnk8YW55LCBhbnksIGFueSwgYW55PixcbiAgcHJldlF1ZXJ5OiBRdWVyeTxhbnksIGFueSwgYW55LCBhbnk+LFxuICBvcHRpb25zOiBRdWVyeU9ic2VydmVyT3B0aW9uczxhbnksIGFueSwgYW55LCBhbnksIGFueT4sXG4gIHByZXZPcHRpb25zOiBRdWVyeU9ic2VydmVyT3B0aW9uczxhbnksIGFueSwgYW55LCBhbnksIGFueT4sXG4pOiBib29sZWFuIHtcbiAgcmV0dXJuIChcbiAgICBvcHRpb25zLmVuYWJsZWQgIT09IGZhbHNlICYmXG4gICAgKHF1ZXJ5ICE9PSBwcmV2UXVlcnkgfHwgcHJldk9wdGlvbnMuZW5hYmxlZCA9PT0gZmFsc2UpICYmXG4gICAgKCFvcHRpb25zLnN1c3BlbnNlIHx8IHF1ZXJ5LnN0YXRlLnN0YXR1cyAhPT0gJ2Vycm9yJykgJiZcbiAgICBpc1N0YWxlKHF1ZXJ5LCBvcHRpb25zKVxuICApXG59XG5cbmZ1bmN0aW9uIGlzU3RhbGUoXG4gIHF1ZXJ5OiBRdWVyeTxhbnksIGFueSwgYW55LCBhbnk+LFxuICBvcHRpb25zOiBRdWVyeU9ic2VydmVyT3B0aW9uczxhbnksIGFueSwgYW55LCBhbnksIGFueT4sXG4pOiBib29sZWFuIHtcbiAgcmV0dXJuIHF1ZXJ5LmlzU3RhbGVCeVRpbWUob3B0aW9ucy5zdGFsZVRpbWUpXG59XG5cbi8vIHRoaXMgZnVuY3Rpb24gd291bGQgZGVjaWRlIGlmIHdlIHdpbGwgdXBkYXRlIHRoZSBvYnNlcnZlcidzICdjdXJyZW50J1xuLy8gcHJvcGVydGllcyBhZnRlciBhbiBvcHRpbWlzdGljIHJlYWRpbmcgdmlhIGdldE9wdGltaXN0aWNSZXN1bHRcbmZ1bmN0aW9uIHNob3VsZEFzc2lnbk9ic2VydmVyQ3VycmVudFByb3BlcnRpZXM8XG4gIFRRdWVyeUZuRGF0YSA9IHVua25vd24sXG4gIFRFcnJvciA9IHVua25vd24sXG4gIFREYXRhID0gVFF1ZXJ5Rm5EYXRhLFxuICBUUXVlcnlEYXRhID0gVFF1ZXJ5Rm5EYXRhLFxuICBUUXVlcnlLZXkgZXh0ZW5kcyBRdWVyeUtleSA9IFF1ZXJ5S2V5LFxuPihcbiAgb2JzZXJ2ZXI6IFF1ZXJ5T2JzZXJ2ZXI8VFF1ZXJ5Rm5EYXRhLCBURXJyb3IsIFREYXRhLCBUUXVlcnlEYXRhLCBUUXVlcnlLZXk+LFxuICBvcHRpbWlzdGljUmVzdWx0OiBRdWVyeU9ic2VydmVyUmVzdWx0PFREYXRhLCBURXJyb3I+LFxuICBvcHRpb25zOiBEZWZhdWx0ZWRRdWVyeU9ic2VydmVyT3B0aW9uczxcbiAgICBUUXVlcnlGbkRhdGEsXG4gICAgVEVycm9yLFxuICAgIFREYXRhLFxuICAgIFRRdWVyeURhdGEsXG4gICAgVFF1ZXJ5S2V5XG4gID4sXG4pIHtcbiAgLy8gaXQgaXMgaW1wb3J0YW50IHRvIGtlZXAgdGhpcyBjb25kaXRpb24gbGlrZSB0aGlzIGZvciB0aHJlZSByZWFzb25zOlxuICAvLyAxLiBJdCB3aWxsIGdldCByZW1vdmVkIGluIHRoZSB2NVxuICAvLyAyLiBpdCByZWFkczogZG9uJ3QgdXBkYXRlIHRoZSBwcm9wZXJ0aWVzIGlmIHdlIHdhbnQgdG8ga2VlcCB0aGUgcHJldmlvdXNcbiAgLy8gZGF0YS5cbiAgLy8gMy4gVGhlIG9wcG9zaXRlIGNvbmRpdGlvbiAoIW9wdGlvbnMua2VlcFByZXZpb3VzRGF0YSkgd291bGQgZmFsbHRocm91Z2hcbiAgLy8gYW5kIHdpbGwgcmVzdWx0IGluIGEgYmFkIGRlY2lzaW9uXG4gIGlmIChvcHRpb25zLmtlZXBQcmV2aW91c0RhdGEpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIC8vIHRoaXMgbWVhbnMgd2Ugd2FudCB0byBwdXQgc29tZSBwbGFjZWhvbGRlciBkYXRhIHdoZW4gcGVuZGluZyBhbmQgcXVlcnlLZXlcbiAgLy8gY2hhbmdlZC5cbiAgaWYgKG9wdGlvbnMucGxhY2Vob2xkZXJEYXRhICE9PSB1bmRlZmluZWQpIHtcbiAgICAvLyByZS1hc3NpZ24gcHJvcGVydGllcyBvbmx5IGlmIGN1cnJlbnQgZGF0YSBpcyBwbGFjZWhvbGRlciBkYXRhXG4gICAgLy8gd2hpY2ggbWVhbnMgdGhhdCBkYXRhIGRpZCBub3QgYXJyaXZlIHlldCwgc28sIGlmIHRoZXJlIGlzIHNvbWUgY2FjaGVkIGRhdGFcbiAgICAvLyB3ZSBuZWVkIHRvIFwicHJlcGFyZVwiIHRvIHJlY2VpdmUgaXRcbiAgICByZXR1cm4gb3B0aW1pc3RpY1Jlc3VsdC5pc1BsYWNlaG9sZGVyRGF0YVxuICB9XG5cbiAgLy8gaWYgdGhlIG5ld2x5IGNyZWF0ZWQgcmVzdWx0IGlzbid0IHdoYXQgdGhlIG9ic2VydmVyIGlzIGhvbGRpbmcgYXMgY3VycmVudCxcbiAgLy8gdGhlbiB3ZSdsbCBuZWVkIHRvIHVwZGF0ZSB0aGUgcHJvcGVydGllcyBhcyB3ZWxsXG4gIGlmICghc2hhbGxvd0VxdWFsT2JqZWN0cyhvYnNlcnZlci5nZXRDdXJyZW50UmVzdWx0KCksIG9wdGltaXN0aWNSZXN1bHQpKSB7XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIC8vIGJhc2ljYWxseSwganVzdCBrZWVwIHByZXZpb3VzIHByb3BlcnRpZXMgaWYgbm90aGluZyBjaGFuZ2VkXG4gIHJldHVybiBmYWxzZVxufVxuIiwgImltcG9ydCB7IGdldERlZmF1bHRTdGF0ZSB9IGZyb20gJy4vbXV0YXRpb24nXG5pbXBvcnQgeyBub3RpZnlNYW5hZ2VyIH0gZnJvbSAnLi9ub3RpZnlNYW5hZ2VyJ1xuaW1wb3J0IHsgU3Vic2NyaWJhYmxlIH0gZnJvbSAnLi9zdWJzY3JpYmFibGUnXG5pbXBvcnQgeyBzaGFsbG93RXF1YWxPYmplY3RzIH0gZnJvbSAnLi91dGlscydcbmltcG9ydCB0eXBlIHsgUXVlcnlDbGllbnQgfSBmcm9tICcuL3F1ZXJ5Q2xpZW50J1xuaW1wb3J0IHR5cGUge1xuICBNdXRhdGVPcHRpb25zLFxuICBNdXRhdGlvbk9ic2VydmVyQmFzZVJlc3VsdCxcbiAgTXV0YXRpb25PYnNlcnZlck9wdGlvbnMsXG4gIE11dGF0aW9uT2JzZXJ2ZXJSZXN1bHQsXG59IGZyb20gJy4vdHlwZXMnXG5pbXBvcnQgdHlwZSB7IEFjdGlvbiwgTXV0YXRpb24gfSBmcm9tICcuL211dGF0aW9uJ1xuXG4vLyBUWVBFU1xuXG50eXBlIE11dGF0aW9uT2JzZXJ2ZXJMaXN0ZW5lcjxURGF0YSwgVEVycm9yLCBUVmFyaWFibGVzLCBUQ29udGV4dD4gPSAoXG4gIHJlc3VsdDogTXV0YXRpb25PYnNlcnZlclJlc3VsdDxURGF0YSwgVEVycm9yLCBUVmFyaWFibGVzLCBUQ29udGV4dD4sXG4pID0+IHZvaWRcblxuaW50ZXJmYWNlIE5vdGlmeU9wdGlvbnMge1xuICBsaXN0ZW5lcnM/OiBib29sZWFuXG4gIG9uRXJyb3I/OiBib29sZWFuXG4gIG9uU3VjY2Vzcz86IGJvb2xlYW5cbn1cblxuLy8gQ0xBU1NcblxuZXhwb3J0IGNsYXNzIE11dGF0aW9uT2JzZXJ2ZXI8XG4gIFREYXRhID0gdW5rbm93bixcbiAgVEVycm9yID0gdW5rbm93bixcbiAgVFZhcmlhYmxlcyA9IHZvaWQsXG4gIFRDb250ZXh0ID0gdW5rbm93bixcbj4gZXh0ZW5kcyBTdWJzY3JpYmFibGU8XG4gIE11dGF0aW9uT2JzZXJ2ZXJMaXN0ZW5lcjxURGF0YSwgVEVycm9yLCBUVmFyaWFibGVzLCBUQ29udGV4dD5cbj4ge1xuICBvcHRpb25zITogTXV0YXRpb25PYnNlcnZlck9wdGlvbnM8VERhdGEsIFRFcnJvciwgVFZhcmlhYmxlcywgVENvbnRleHQ+XG5cbiAgcHJpdmF0ZSBjbGllbnQ6IFF1ZXJ5Q2xpZW50XG4gIHByaXZhdGUgY3VycmVudFJlc3VsdCE6IE11dGF0aW9uT2JzZXJ2ZXJSZXN1bHQ8XG4gICAgVERhdGEsXG4gICAgVEVycm9yLFxuICAgIFRWYXJpYWJsZXMsXG4gICAgVENvbnRleHRcbiAgPlxuICBwcml2YXRlIGN1cnJlbnRNdXRhdGlvbj86IE11dGF0aW9uPFREYXRhLCBURXJyb3IsIFRWYXJpYWJsZXMsIFRDb250ZXh0PlxuICBwcml2YXRlIG11dGF0ZU9wdGlvbnM/OiBNdXRhdGVPcHRpb25zPFREYXRhLCBURXJyb3IsIFRWYXJpYWJsZXMsIFRDb250ZXh0PlxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGNsaWVudDogUXVlcnlDbGllbnQsXG4gICAgb3B0aW9uczogTXV0YXRpb25PYnNlcnZlck9wdGlvbnM8VERhdGEsIFRFcnJvciwgVFZhcmlhYmxlcywgVENvbnRleHQ+LFxuICApIHtcbiAgICBzdXBlcigpXG5cbiAgICB0aGlzLmNsaWVudCA9IGNsaWVudFxuICAgIHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zKVxuICAgIHRoaXMuYmluZE1ldGhvZHMoKVxuICAgIHRoaXMudXBkYXRlUmVzdWx0KClcbiAgfVxuXG4gIHByb3RlY3RlZCBiaW5kTWV0aG9kcygpOiB2b2lkIHtcbiAgICB0aGlzLm11dGF0ZSA9IHRoaXMubXV0YXRlLmJpbmQodGhpcylcbiAgICB0aGlzLnJlc2V0ID0gdGhpcy5yZXNldC5iaW5kKHRoaXMpXG4gIH1cblxuICBzZXRPcHRpb25zKFxuICAgIG9wdGlvbnM/OiBNdXRhdGlvbk9ic2VydmVyT3B0aW9uczxURGF0YSwgVEVycm9yLCBUVmFyaWFibGVzLCBUQ29udGV4dD4sXG4gICkge1xuICAgIGNvbnN0IHByZXZPcHRpb25zID0gdGhpcy5vcHRpb25zXG4gICAgdGhpcy5vcHRpb25zID0gdGhpcy5jbGllbnQuZGVmYXVsdE11dGF0aW9uT3B0aW9ucyhvcHRpb25zKVxuICAgIGlmICghc2hhbGxvd0VxdWFsT2JqZWN0cyhwcmV2T3B0aW9ucywgdGhpcy5vcHRpb25zKSkge1xuICAgICAgdGhpcy5jbGllbnQuZ2V0TXV0YXRpb25DYWNoZSgpLm5vdGlmeSh7XG4gICAgICAgIHR5cGU6ICdvYnNlcnZlck9wdGlvbnNVcGRhdGVkJyxcbiAgICAgICAgbXV0YXRpb246IHRoaXMuY3VycmVudE11dGF0aW9uLFxuICAgICAgICBvYnNlcnZlcjogdGhpcyxcbiAgICAgIH0pXG4gICAgfVxuICAgIHRoaXMuY3VycmVudE11dGF0aW9uPy5zZXRPcHRpb25zKHRoaXMub3B0aW9ucylcbiAgfVxuXG4gIHByb3RlY3RlZCBvblVuc3Vic2NyaWJlKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5oYXNMaXN0ZW5lcnMoKSkge1xuICAgICAgdGhpcy5jdXJyZW50TXV0YXRpb24/LnJlbW92ZU9ic2VydmVyKHRoaXMpXG4gICAgfVxuICB9XG5cbiAgb25NdXRhdGlvblVwZGF0ZShhY3Rpb246IEFjdGlvbjxURGF0YSwgVEVycm9yLCBUVmFyaWFibGVzLCBUQ29udGV4dD4pOiB2b2lkIHtcbiAgICB0aGlzLnVwZGF0ZVJlc3VsdCgpXG5cbiAgICAvLyBEZXRlcm1pbmUgd2hpY2ggY2FsbGJhY2tzIHRvIHRyaWdnZXJcbiAgICBjb25zdCBub3RpZnlPcHRpb25zOiBOb3RpZnlPcHRpb25zID0ge1xuICAgICAgbGlzdGVuZXJzOiB0cnVlLFxuICAgIH1cblxuICAgIGlmIChhY3Rpb24udHlwZSA9PT0gJ3N1Y2Nlc3MnKSB7XG4gICAgICBub3RpZnlPcHRpb25zLm9uU3VjY2VzcyA9IHRydWVcbiAgICB9IGVsc2UgaWYgKGFjdGlvbi50eXBlID09PSAnZXJyb3InKSB7XG4gICAgICBub3RpZnlPcHRpb25zLm9uRXJyb3IgPSB0cnVlXG4gICAgfVxuXG4gICAgdGhpcy5ub3RpZnkobm90aWZ5T3B0aW9ucylcbiAgfVxuXG4gIGdldEN1cnJlbnRSZXN1bHQoKTogTXV0YXRpb25PYnNlcnZlclJlc3VsdDxcbiAgICBURGF0YSxcbiAgICBURXJyb3IsXG4gICAgVFZhcmlhYmxlcyxcbiAgICBUQ29udGV4dFxuICA+IHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50UmVzdWx0XG4gIH1cblxuICByZXNldCgpOiB2b2lkIHtcbiAgICB0aGlzLmN1cnJlbnRNdXRhdGlvbiA9IHVuZGVmaW5lZFxuICAgIHRoaXMudXBkYXRlUmVzdWx0KClcbiAgICB0aGlzLm5vdGlmeSh7IGxpc3RlbmVyczogdHJ1ZSB9KVxuICB9XG5cbiAgbXV0YXRlKFxuICAgIHZhcmlhYmxlcz86IFRWYXJpYWJsZXMsXG4gICAgb3B0aW9ucz86IE11dGF0ZU9wdGlvbnM8VERhdGEsIFRFcnJvciwgVFZhcmlhYmxlcywgVENvbnRleHQ+LFxuICApOiBQcm9taXNlPFREYXRhPiB7XG4gICAgdGhpcy5tdXRhdGVPcHRpb25zID0gb3B0aW9uc1xuXG4gICAgaWYgKHRoaXMuY3VycmVudE11dGF0aW9uKSB7XG4gICAgICB0aGlzLmN1cnJlbnRNdXRhdGlvbi5yZW1vdmVPYnNlcnZlcih0aGlzKVxuICAgIH1cblxuICAgIHRoaXMuY3VycmVudE11dGF0aW9uID0gdGhpcy5jbGllbnQuZ2V0TXV0YXRpb25DYWNoZSgpLmJ1aWxkKHRoaXMuY2xpZW50LCB7XG4gICAgICAuLi50aGlzLm9wdGlvbnMsXG4gICAgICB2YXJpYWJsZXM6XG4gICAgICAgIHR5cGVvZiB2YXJpYWJsZXMgIT09ICd1bmRlZmluZWQnID8gdmFyaWFibGVzIDogdGhpcy5vcHRpb25zLnZhcmlhYmxlcyxcbiAgICB9KVxuXG4gICAgdGhpcy5jdXJyZW50TXV0YXRpb24uYWRkT2JzZXJ2ZXIodGhpcylcblxuICAgIHJldHVybiB0aGlzLmN1cnJlbnRNdXRhdGlvbi5leGVjdXRlKClcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlUmVzdWx0KCk6IHZvaWQge1xuICAgIGNvbnN0IHN0YXRlID0gdGhpcy5jdXJyZW50TXV0YXRpb25cbiAgICAgID8gdGhpcy5jdXJyZW50TXV0YXRpb24uc3RhdGVcbiAgICAgIDogZ2V0RGVmYXVsdFN0YXRlPFREYXRhLCBURXJyb3IsIFRWYXJpYWJsZXMsIFRDb250ZXh0PigpXG5cbiAgICBjb25zdCByZXN1bHQ6IE11dGF0aW9uT2JzZXJ2ZXJCYXNlUmVzdWx0PFxuICAgICAgVERhdGEsXG4gICAgICBURXJyb3IsXG4gICAgICBUVmFyaWFibGVzLFxuICAgICAgVENvbnRleHRcbiAgICA+ID0ge1xuICAgICAgLi4uc3RhdGUsXG4gICAgICBpc0xvYWRpbmc6IHN0YXRlLnN0YXR1cyA9PT0gJ2xvYWRpbmcnLFxuICAgICAgaXNTdWNjZXNzOiBzdGF0ZS5zdGF0dXMgPT09ICdzdWNjZXNzJyxcbiAgICAgIGlzRXJyb3I6IHN0YXRlLnN0YXR1cyA9PT0gJ2Vycm9yJyxcbiAgICAgIGlzSWRsZTogc3RhdGUuc3RhdHVzID09PSAnaWRsZScsXG4gICAgICBtdXRhdGU6IHRoaXMubXV0YXRlLFxuICAgICAgcmVzZXQ6IHRoaXMucmVzZXQsXG4gICAgfVxuXG4gICAgdGhpcy5jdXJyZW50UmVzdWx0ID0gcmVzdWx0IGFzIE11dGF0aW9uT2JzZXJ2ZXJSZXN1bHQ8XG4gICAgICBURGF0YSxcbiAgICAgIFRFcnJvcixcbiAgICAgIFRWYXJpYWJsZXMsXG4gICAgICBUQ29udGV4dFxuICAgID5cbiAgfVxuXG4gIHByaXZhdGUgbm90aWZ5KG9wdGlvbnM6IE5vdGlmeU9wdGlvbnMpIHtcbiAgICBub3RpZnlNYW5hZ2VyLmJhdGNoKCgpID0+IHtcbiAgICAgIC8vIEZpcnN0IHRyaWdnZXIgdGhlIG11dGF0ZSBjYWxsYmFja3NcbiAgICAgIGlmICh0aGlzLm11dGF0ZU9wdGlvbnMgJiYgdGhpcy5oYXNMaXN0ZW5lcnMoKSkge1xuICAgICAgICBpZiAob3B0aW9ucy5vblN1Y2Nlc3MpIHtcbiAgICAgICAgICB0aGlzLm11dGF0ZU9wdGlvbnMub25TdWNjZXNzPy4oXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRSZXN1bHQuZGF0YSEsXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRSZXN1bHQudmFyaWFibGVzISxcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFJlc3VsdC5jb250ZXh0ISxcbiAgICAgICAgICApXG4gICAgICAgICAgdGhpcy5tdXRhdGVPcHRpb25zLm9uU2V0dGxlZD8uKFxuICAgICAgICAgICAgdGhpcy5jdXJyZW50UmVzdWx0LmRhdGEhLFxuICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFJlc3VsdC52YXJpYWJsZXMhLFxuICAgICAgICAgICAgdGhpcy5jdXJyZW50UmVzdWx0LmNvbnRleHQsXG4gICAgICAgICAgKVxuICAgICAgICB9IGVsc2UgaWYgKG9wdGlvbnMub25FcnJvcikge1xuICAgICAgICAgIHRoaXMubXV0YXRlT3B0aW9ucy5vbkVycm9yPy4oXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRSZXN1bHQuZXJyb3IhLFxuICAgICAgICAgICAgdGhpcy5jdXJyZW50UmVzdWx0LnZhcmlhYmxlcyEsXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRSZXN1bHQuY29udGV4dCxcbiAgICAgICAgICApXG4gICAgICAgICAgdGhpcy5tdXRhdGVPcHRpb25zLm9uU2V0dGxlZD8uKFxuICAgICAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICAgICAgdGhpcy5jdXJyZW50UmVzdWx0LmVycm9yLFxuICAgICAgICAgICAgdGhpcy5jdXJyZW50UmVzdWx0LnZhcmlhYmxlcyEsXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRSZXN1bHQuY29udGV4dCxcbiAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVGhlbiB0cmlnZ2VyIHRoZSBsaXN0ZW5lcnNcbiAgICAgIGlmIChvcHRpb25zLmxpc3RlbmVycykge1xuICAgICAgICB0aGlzLmxpc3RlbmVycy5mb3JFYWNoKCh7IGxpc3RlbmVyIH0pID0+IHtcbiAgICAgICAgICBsaXN0ZW5lcih0aGlzLmN1cnJlbnRSZXN1bHQpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSlcbiAgfVxufVxuIiwgImltcG9ydCB0eXBlIHsgUXVlcnlDbGllbnQgfSBmcm9tICcuL3F1ZXJ5Q2xpZW50J1xuaW1wb3J0IHR5cGUgeyBRdWVyeSwgUXVlcnlTdGF0ZSB9IGZyb20gJy4vcXVlcnknXG5pbXBvcnQgdHlwZSB7XG4gIE11dGF0aW9uS2V5LFxuICBNdXRhdGlvbk9wdGlvbnMsXG4gIFF1ZXJ5S2V5LFxuICBRdWVyeU9wdGlvbnMsXG59IGZyb20gJy4vdHlwZXMnXG5pbXBvcnQgdHlwZSB7IE11dGF0aW9uLCBNdXRhdGlvblN0YXRlIH0gZnJvbSAnLi9tdXRhdGlvbidcblxuLy8gVFlQRVNcblxuZXhwb3J0IGludGVyZmFjZSBEZWh5ZHJhdGVPcHRpb25zIHtcbiAgZGVoeWRyYXRlTXV0YXRpb25zPzogYm9vbGVhblxuICBkZWh5ZHJhdGVRdWVyaWVzPzogYm9vbGVhblxuICBzaG91bGREZWh5ZHJhdGVNdXRhdGlvbj86IFNob3VsZERlaHlkcmF0ZU11dGF0aW9uRnVuY3Rpb25cbiAgc2hvdWxkRGVoeWRyYXRlUXVlcnk/OiBTaG91bGREZWh5ZHJhdGVRdWVyeUZ1bmN0aW9uXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSHlkcmF0ZU9wdGlvbnMge1xuICBkZWZhdWx0T3B0aW9ucz86IHtcbiAgICBxdWVyaWVzPzogUXVlcnlPcHRpb25zXG4gICAgbXV0YXRpb25zPzogTXV0YXRpb25PcHRpb25zXG4gIH1cbn1cblxuaW50ZXJmYWNlIERlaHlkcmF0ZWRNdXRhdGlvbiB7XG4gIG11dGF0aW9uS2V5PzogTXV0YXRpb25LZXlcbiAgc3RhdGU6IE11dGF0aW9uU3RhdGVcbn1cblxuaW50ZXJmYWNlIERlaHlkcmF0ZWRRdWVyeSB7XG4gIHF1ZXJ5SGFzaDogc3RyaW5nXG4gIHF1ZXJ5S2V5OiBRdWVyeUtleVxuICBzdGF0ZTogUXVlcnlTdGF0ZVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIERlaHlkcmF0ZWRTdGF0ZSB7XG4gIG11dGF0aW9uczogRGVoeWRyYXRlZE11dGF0aW9uW11cbiAgcXVlcmllczogRGVoeWRyYXRlZFF1ZXJ5W11cbn1cblxuZXhwb3J0IHR5cGUgU2hvdWxkRGVoeWRyYXRlUXVlcnlGdW5jdGlvbiA9IChxdWVyeTogUXVlcnkpID0+IGJvb2xlYW5cblxuZXhwb3J0IHR5cGUgU2hvdWxkRGVoeWRyYXRlTXV0YXRpb25GdW5jdGlvbiA9IChtdXRhdGlvbjogTXV0YXRpb24pID0+IGJvb2xlYW5cblxuLy8gRlVOQ1RJT05TXG5cbmZ1bmN0aW9uIGRlaHlkcmF0ZU11dGF0aW9uKG11dGF0aW9uOiBNdXRhdGlvbik6IERlaHlkcmF0ZWRNdXRhdGlvbiB7XG4gIHJldHVybiB7XG4gICAgbXV0YXRpb25LZXk6IG11dGF0aW9uLm9wdGlvbnMubXV0YXRpb25LZXksXG4gICAgc3RhdGU6IG11dGF0aW9uLnN0YXRlLFxuICB9XG59XG5cbi8vIE1vc3QgY29uZmlnIGlzIG5vdCBkZWh5ZHJhdGVkIGJ1dCBpbnN0ZWFkIG1lYW50IHRvIGNvbmZpZ3VyZSBhZ2FpbiB3aGVuXG4vLyBjb25zdW1pbmcgdGhlIGRlL3JlaHlkcmF0ZWQgZGF0YSwgdHlwaWNhbGx5IHdpdGggdXNlUXVlcnkgb24gdGhlIGNsaWVudC5cbi8vIFNvbWV0aW1lcyBpdCBtaWdodCBtYWtlIHNlbnNlIHRvIHByZWZldGNoIGRhdGEgb24gdGhlIHNlcnZlciBhbmQgaW5jbHVkZVxuLy8gaW4gdGhlIGh0bWwtcGF5bG9hZCwgYnV0IG5vdCBjb25zdW1lIGl0IG9uIHRoZSBpbml0aWFsIHJlbmRlci5cbmZ1bmN0aW9uIGRlaHlkcmF0ZVF1ZXJ5KHF1ZXJ5OiBRdWVyeSk6IERlaHlkcmF0ZWRRdWVyeSB7XG4gIHJldHVybiB7XG4gICAgc3RhdGU6IHF1ZXJ5LnN0YXRlLFxuICAgIHF1ZXJ5S2V5OiBxdWVyeS5xdWVyeUtleSxcbiAgICBxdWVyeUhhc2g6IHF1ZXJ5LnF1ZXJ5SGFzaCxcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVmYXVsdFNob3VsZERlaHlkcmF0ZU11dGF0aW9uKG11dGF0aW9uOiBNdXRhdGlvbikge1xuICByZXR1cm4gbXV0YXRpb24uc3RhdGUuaXNQYXVzZWRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlZmF1bHRTaG91bGREZWh5ZHJhdGVRdWVyeShxdWVyeTogUXVlcnkpIHtcbiAgcmV0dXJuIHF1ZXJ5LnN0YXRlLnN0YXR1cyA9PT0gJ3N1Y2Nlc3MnXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWh5ZHJhdGUoXG4gIGNsaWVudDogUXVlcnlDbGllbnQsXG4gIG9wdGlvbnM6IERlaHlkcmF0ZU9wdGlvbnMgPSB7fSxcbik6IERlaHlkcmF0ZWRTdGF0ZSB7XG4gIGNvbnN0IG11dGF0aW9uczogRGVoeWRyYXRlZE11dGF0aW9uW10gPSBbXVxuICBjb25zdCBxdWVyaWVzOiBEZWh5ZHJhdGVkUXVlcnlbXSA9IFtdXG5cbiAgaWYgKG9wdGlvbnMuZGVoeWRyYXRlTXV0YXRpb25zICE9PSBmYWxzZSkge1xuICAgIGNvbnN0IHNob3VsZERlaHlkcmF0ZU11dGF0aW9uID1cbiAgICAgIG9wdGlvbnMuc2hvdWxkRGVoeWRyYXRlTXV0YXRpb24gfHwgZGVmYXVsdFNob3VsZERlaHlkcmF0ZU11dGF0aW9uXG5cbiAgICBjbGllbnRcbiAgICAgIC5nZXRNdXRhdGlvbkNhY2hlKClcbiAgICAgIC5nZXRBbGwoKVxuICAgICAgLmZvckVhY2goKG11dGF0aW9uKSA9PiB7XG4gICAgICAgIGlmIChzaG91bGREZWh5ZHJhdGVNdXRhdGlvbihtdXRhdGlvbikpIHtcbiAgICAgICAgICBtdXRhdGlvbnMucHVzaChkZWh5ZHJhdGVNdXRhdGlvbihtdXRhdGlvbikpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gIH1cblxuICBpZiAob3B0aW9ucy5kZWh5ZHJhdGVRdWVyaWVzICE9PSBmYWxzZSkge1xuICAgIGNvbnN0IHNob3VsZERlaHlkcmF0ZVF1ZXJ5ID1cbiAgICAgIG9wdGlvbnMuc2hvdWxkRGVoeWRyYXRlUXVlcnkgfHwgZGVmYXVsdFNob3VsZERlaHlkcmF0ZVF1ZXJ5XG5cbiAgICBjbGllbnRcbiAgICAgIC5nZXRRdWVyeUNhY2hlKClcbiAgICAgIC5nZXRBbGwoKVxuICAgICAgLmZvckVhY2goKHF1ZXJ5KSA9PiB7XG4gICAgICAgIGlmIChzaG91bGREZWh5ZHJhdGVRdWVyeShxdWVyeSkpIHtcbiAgICAgICAgICBxdWVyaWVzLnB1c2goZGVoeWRyYXRlUXVlcnkocXVlcnkpKVxuICAgICAgICB9XG4gICAgICB9KVxuICB9XG5cbiAgcmV0dXJuIHsgbXV0YXRpb25zLCBxdWVyaWVzIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGh5ZHJhdGUoXG4gIGNsaWVudDogUXVlcnlDbGllbnQsXG4gIGRlaHlkcmF0ZWRTdGF0ZTogdW5rbm93bixcbiAgb3B0aW9ucz86IEh5ZHJhdGVPcHRpb25zLFxuKTogdm9pZCB7XG4gIGlmICh0eXBlb2YgZGVoeWRyYXRlZFN0YXRlICE9PSAnb2JqZWN0JyB8fCBkZWh5ZHJhdGVkU3RhdGUgPT09IG51bGwpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIGNvbnN0IG11dGF0aW9uQ2FjaGUgPSBjbGllbnQuZ2V0TXV0YXRpb25DYWNoZSgpXG4gIGNvbnN0IHF1ZXJ5Q2FjaGUgPSBjbGllbnQuZ2V0UXVlcnlDYWNoZSgpXG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bm5lY2Vzc2FyeS1jb25kaXRpb25cbiAgY29uc3QgbXV0YXRpb25zID0gKGRlaHlkcmF0ZWRTdGF0ZSBhcyBEZWh5ZHJhdGVkU3RhdGUpLm11dGF0aW9ucyB8fCBbXVxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVubmVjZXNzYXJ5LWNvbmRpdGlvblxuICBjb25zdCBxdWVyaWVzID0gKGRlaHlkcmF0ZWRTdGF0ZSBhcyBEZWh5ZHJhdGVkU3RhdGUpLnF1ZXJpZXMgfHwgW11cblxuICBtdXRhdGlvbnMuZm9yRWFjaCgoZGVoeWRyYXRlZE11dGF0aW9uKSA9PiB7XG4gICAgbXV0YXRpb25DYWNoZS5idWlsZChcbiAgICAgIGNsaWVudCxcbiAgICAgIHtcbiAgICAgICAgLi4ub3B0aW9ucz8uZGVmYXVsdE9wdGlvbnM/Lm11dGF0aW9ucyxcbiAgICAgICAgbXV0YXRpb25LZXk6IGRlaHlkcmF0ZWRNdXRhdGlvbi5tdXRhdGlvbktleSxcbiAgICAgIH0sXG4gICAgICBkZWh5ZHJhdGVkTXV0YXRpb24uc3RhdGUsXG4gICAgKVxuICB9KVxuXG4gIHF1ZXJpZXMuZm9yRWFjaCgoeyBxdWVyeUtleSwgc3RhdGUsIHF1ZXJ5SGFzaCB9KSA9PiB7XG4gICAgY29uc3QgcXVlcnkgPSBxdWVyeUNhY2hlLmdldChxdWVyeUhhc2gpXG5cbiAgICAvLyBEbyBub3QgaHlkcmF0ZSBpZiBhbiBleGlzdGluZyBxdWVyeSBleGlzdHMgd2l0aCBuZXdlciBkYXRhXG4gICAgaWYgKHF1ZXJ5KSB7XG4gICAgICBpZiAocXVlcnkuc3RhdGUuZGF0YVVwZGF0ZWRBdCA8IHN0YXRlLmRhdGFVcGRhdGVkQXQpIHtcbiAgICAgICAgLy8gb21pdCBmZXRjaFN0YXR1cyBmcm9tIGRlaHlkcmF0ZWQgc3RhdGVcbiAgICAgICAgLy8gc28gdGhhdCBxdWVyeSBzdGF5cyBpbiBpdHMgY3VycmVudCBmZXRjaFN0YXR1c1xuICAgICAgICBjb25zdCB7IGZldGNoU3RhdHVzOiBfaWdub3JlZCwgLi4uZGVoeWRyYXRlZFF1ZXJ5U3RhdGUgfSA9IHN0YXRlXG4gICAgICAgIHF1ZXJ5LnNldFN0YXRlKGRlaHlkcmF0ZWRRdWVyeVN0YXRlKVxuICAgICAgfVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgLy8gUmVzdG9yZSBxdWVyeVxuICAgIHF1ZXJ5Q2FjaGUuYnVpbGQoXG4gICAgICBjbGllbnQsXG4gICAgICB7XG4gICAgICAgIC4uLm9wdGlvbnM/LmRlZmF1bHRPcHRpb25zPy5xdWVyaWVzLFxuICAgICAgICBxdWVyeUtleSxcbiAgICAgICAgcXVlcnlIYXNoLFxuICAgICAgfSxcbiAgICAgIC8vIFJlc2V0IGZldGNoIHN0YXR1cyB0byBpZGxlIHRvIGF2b2lkXG4gICAgICAvLyBxdWVyeSBiZWluZyBzdHVjayBpbiBmZXRjaGluZyBzdGF0ZSB1cG9uIGh5ZHJhdGlvblxuICAgICAge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgZmV0Y2hTdGF0dXM6ICdpZGxlJyxcbiAgICAgIH0sXG4gICAgKVxuICB9KVxufVxuIiwgImV4cG9ydCB7XG5cdG9uRGVzdHJveSxcblx0c2V0Q29udGV4dCxcblx0Z2V0Q29udGV4dCxcblx0Z2V0QWxsQ29udGV4dHMsXG5cdGhhc0NvbnRleHQsXG5cdHRpY2ssXG5cdGNyZWF0ZUV2ZW50RGlzcGF0Y2hlcixcblx0U3ZlbHRlQ29tcG9uZW50LFxuXHRTdmVsdGVDb21wb25lbnRUeXBlZFxufSBmcm9tICcuL2luZGV4LmpzJztcblxuLyoqIEByZXR1cm5zIHt2b2lkfSAqL1xuZXhwb3J0IGZ1bmN0aW9uIG9uTW91bnQoKSB7fVxuXG4vKiogQHJldHVybnMge3ZvaWR9ICovXG5leHBvcnQgZnVuY3Rpb24gYmVmb3JlVXBkYXRlKCkge31cblxuLyoqIEByZXR1cm5zIHt2b2lkfSAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFmdGVyVXBkYXRlKCkge31cbiIsICJpbXBvcnQgeyBnZXRDb250ZXh0LCBzZXRDb250ZXh0IH0gZnJvbSAnc3ZlbHRlJztcbmNvbnN0IF9jb250ZXh0S2V5ID0gJyQkX3F1ZXJ5Q2xpZW50Jztcbi8qKiBSZXRyaWV2ZXMgYSBDbGllbnQgZnJvbSBTdmVsdGUncyBjb250ZXh0ICovXG5leHBvcnQgY29uc3QgZ2V0UXVlcnlDbGllbnRDb250ZXh0ID0gKCkgPT4ge1xuICAgIGNvbnN0IGNsaWVudCA9IGdldENvbnRleHQoX2NvbnRleHRLZXkpO1xuICAgIGlmICghY2xpZW50KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gUXVlcnlDbGllbnQgd2FzIGZvdW5kIGluIFN2ZWx0ZSBjb250ZXh0LiBEaWQgeW91IGZvcmdldCB0byB3cmFwIHlvdXIgY29tcG9uZW50IHdpdGggUXVlcnlDbGllbnRQcm92aWRlcj8nKTtcbiAgICB9XG4gICAgcmV0dXJuIGNsaWVudDtcbn07XG4vKiogU2V0cyBhIFF1ZXJ5Q2xpZW50IG9uIFN2ZWx0ZSdzIGNvbnRleHQgKi9cbmV4cG9ydCBjb25zdCBzZXRRdWVyeUNsaWVudENvbnRleHQgPSAoY2xpZW50KSA9PiB7XG4gICAgc2V0Q29udGV4dChfY29udGV4dEtleSwgY2xpZW50KTtcbn07XG4iLCAiaW1wb3J0IHtcblx0cnVuX2FsbCxcblx0c3Vic2NyaWJlLFxuXHRub29wLFxuXHRzYWZlX25vdF9lcXVhbCxcblx0aXNfZnVuY3Rpb24sXG5cdGdldF9zdG9yZV92YWx1ZVxufSBmcm9tICcuLi9pbnRlcm5hbC9pbmRleC5qcyc7XG5cbmNvbnN0IHN1YnNjcmliZXJfcXVldWUgPSBbXTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgYFJlYWRhYmxlYCBzdG9yZSB0aGF0IGFsbG93cyByZWFkaW5nIGJ5IHN1YnNjcmlwdGlvbi5cbiAqXG4gKiBodHRwczovL3N2ZWx0ZS5kZXYvZG9jcy9zdmVsdGUtc3RvcmUjcmVhZGFibGVcbiAqIEB0ZW1wbGF0ZSBUXG4gKiBAcGFyYW0ge1R9IFt2YWx1ZV0gaW5pdGlhbCB2YWx1ZVxuICogQHBhcmFtIHtpbXBvcnQoJy4vcHVibGljLmpzJykuU3RhcnRTdG9wTm90aWZpZXI8VD59IFtzdGFydF1cbiAqIEByZXR1cm5zIHtpbXBvcnQoJy4vcHVibGljLmpzJykuUmVhZGFibGU8VD59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZWFkYWJsZSh2YWx1ZSwgc3RhcnQpIHtcblx0cmV0dXJuIHtcblx0XHRzdWJzY3JpYmU6IHdyaXRhYmxlKHZhbHVlLCBzdGFydCkuc3Vic2NyaWJlXG5cdH07XG59XG5cbi8qKlxuICogQ3JlYXRlIGEgYFdyaXRhYmxlYCBzdG9yZSB0aGF0IGFsbG93cyBib3RoIHVwZGF0aW5nIGFuZCByZWFkaW5nIGJ5IHN1YnNjcmlwdGlvbi5cbiAqXG4gKiBodHRwczovL3N2ZWx0ZS5kZXYvZG9jcy9zdmVsdGUtc3RvcmUjd3JpdGFibGVcbiAqIEB0ZW1wbGF0ZSBUXG4gKiBAcGFyYW0ge1R9IFt2YWx1ZV0gaW5pdGlhbCB2YWx1ZVxuICogQHBhcmFtIHtpbXBvcnQoJy4vcHVibGljLmpzJykuU3RhcnRTdG9wTm90aWZpZXI8VD59IFtzdGFydF1cbiAqIEByZXR1cm5zIHtpbXBvcnQoJy4vcHVibGljLmpzJykuV3JpdGFibGU8VD59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB3cml0YWJsZSh2YWx1ZSwgc3RhcnQgPSBub29wKSB7XG5cdC8qKiBAdHlwZSB7aW1wb3J0KCcuL3B1YmxpYy5qcycpLlVuc3Vic2NyaWJlcn0gKi9cblx0bGV0IHN0b3A7XG5cdC8qKiBAdHlwZSB7U2V0PGltcG9ydCgnLi9wcml2YXRlLmpzJykuU3Vic2NyaWJlSW52YWxpZGF0ZVR1cGxlPFQ+Pn0gKi9cblx0Y29uc3Qgc3Vic2NyaWJlcnMgPSBuZXcgU2V0KCk7XG5cdC8qKiBAcGFyYW0ge1R9IG5ld192YWx1ZVxuXHQgKiBAcmV0dXJucyB7dm9pZH1cblx0ICovXG5cdGZ1bmN0aW9uIHNldChuZXdfdmFsdWUpIHtcblx0XHRpZiAoc2FmZV9ub3RfZXF1YWwodmFsdWUsIG5ld192YWx1ZSkpIHtcblx0XHRcdHZhbHVlID0gbmV3X3ZhbHVlO1xuXHRcdFx0aWYgKHN0b3ApIHtcblx0XHRcdFx0Ly8gc3RvcmUgaXMgcmVhZHlcblx0XHRcdFx0Y29uc3QgcnVuX3F1ZXVlID0gIXN1YnNjcmliZXJfcXVldWUubGVuZ3RoO1xuXHRcdFx0XHRmb3IgKGNvbnN0IHN1YnNjcmliZXIgb2Ygc3Vic2NyaWJlcnMpIHtcblx0XHRcdFx0XHRzdWJzY3JpYmVyWzFdKCk7XG5cdFx0XHRcdFx0c3Vic2NyaWJlcl9xdWV1ZS5wdXNoKHN1YnNjcmliZXIsIHZhbHVlKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAocnVuX3F1ZXVlKSB7XG5cdFx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBzdWJzY3JpYmVyX3F1ZXVlLmxlbmd0aDsgaSArPSAyKSB7XG5cdFx0XHRcdFx0XHRzdWJzY3JpYmVyX3F1ZXVlW2ldWzBdKHN1YnNjcmliZXJfcXVldWVbaSArIDFdKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0c3Vic2NyaWJlcl9xdWV1ZS5sZW5ndGggPSAwO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEBwYXJhbSB7aW1wb3J0KCcuL3B1YmxpYy5qcycpLlVwZGF0ZXI8VD59IGZuXG5cdCAqIEByZXR1cm5zIHt2b2lkfVxuXHQgKi9cblx0ZnVuY3Rpb24gdXBkYXRlKGZuKSB7XG5cdFx0c2V0KGZuKHZhbHVlKSk7XG5cdH1cblxuXHQvKipcblx0ICogQHBhcmFtIHtpbXBvcnQoJy4vcHVibGljLmpzJykuU3Vic2NyaWJlcjxUPn0gcnVuXG5cdCAqIEBwYXJhbSB7aW1wb3J0KCcuL3ByaXZhdGUuanMnKS5JbnZhbGlkYXRvcjxUPn0gW2ludmFsaWRhdGVdXG5cdCAqIEByZXR1cm5zIHtpbXBvcnQoJy4vcHVibGljLmpzJykuVW5zdWJzY3JpYmVyfVxuXHQgKi9cblx0ZnVuY3Rpb24gc3Vic2NyaWJlKHJ1biwgaW52YWxpZGF0ZSA9IG5vb3ApIHtcblx0XHQvKiogQHR5cGUge2ltcG9ydCgnLi9wcml2YXRlLmpzJykuU3Vic2NyaWJlSW52YWxpZGF0ZVR1cGxlPFQ+fSAqL1xuXHRcdGNvbnN0IHN1YnNjcmliZXIgPSBbcnVuLCBpbnZhbGlkYXRlXTtcblx0XHRzdWJzY3JpYmVycy5hZGQoc3Vic2NyaWJlcik7XG5cdFx0aWYgKHN1YnNjcmliZXJzLnNpemUgPT09IDEpIHtcblx0XHRcdHN0b3AgPSBzdGFydChzZXQsIHVwZGF0ZSkgfHwgbm9vcDtcblx0XHR9XG5cdFx0cnVuKHZhbHVlKTtcblx0XHRyZXR1cm4gKCkgPT4ge1xuXHRcdFx0c3Vic2NyaWJlcnMuZGVsZXRlKHN1YnNjcmliZXIpO1xuXHRcdFx0aWYgKHN1YnNjcmliZXJzLnNpemUgPT09IDAgJiYgc3RvcCkge1xuXHRcdFx0XHRzdG9wKCk7XG5cdFx0XHRcdHN0b3AgPSBudWxsO1xuXHRcdFx0fVxuXHRcdH07XG5cdH1cblx0cmV0dXJuIHsgc2V0LCB1cGRhdGUsIHN1YnNjcmliZSB9O1xufVxuXG4vKipcbiAqIERlcml2ZWQgdmFsdWUgc3RvcmUgYnkgc3luY2hyb25pemluZyBvbmUgb3IgbW9yZSByZWFkYWJsZSBzdG9yZXMgYW5kXG4gKiBhcHBseWluZyBhbiBhZ2dyZWdhdGlvbiBmdW5jdGlvbiBvdmVyIGl0cyBpbnB1dCB2YWx1ZXMuXG4gKlxuICogaHR0cHM6Ly9zdmVsdGUuZGV2L2RvY3Mvc3ZlbHRlLXN0b3JlI2Rlcml2ZWRcbiAqIEB0ZW1wbGF0ZSB7aW1wb3J0KCcuL3ByaXZhdGUuanMnKS5TdG9yZXN9IFNcbiAqIEB0ZW1wbGF0ZSBUXG4gKiBAb3ZlcmxvYWRcbiAqIEBwYXJhbSB7U30gc3RvcmVzIC0gaW5wdXQgc3RvcmVzXG4gKiBAcGFyYW0geyh2YWx1ZXM6IGltcG9ydCgnLi9wcml2YXRlLmpzJykuU3RvcmVzVmFsdWVzPFM+LCBzZXQ6ICh2YWx1ZTogVCkgPT4gdm9pZCwgdXBkYXRlOiAoZm46IGltcG9ydCgnLi9wdWJsaWMuanMnKS5VcGRhdGVyPFQ+KSA9PiB2b2lkKSA9PiBpbXBvcnQoJy4vcHVibGljLmpzJykuVW5zdWJzY3JpYmVyIHwgdm9pZH0gZm4gLSBmdW5jdGlvbiBjYWxsYmFjayB0aGF0IGFnZ3JlZ2F0ZXMgdGhlIHZhbHVlc1xuICogQHBhcmFtIHtUfSBbaW5pdGlhbF92YWx1ZV0gLSBpbml0aWFsIHZhbHVlXG4gKiBAcmV0dXJucyB7aW1wb3J0KCcuL3B1YmxpYy5qcycpLlJlYWRhYmxlPFQ+fVxuICovXG5cbi8qKlxuICogRGVyaXZlZCB2YWx1ZSBzdG9yZSBieSBzeW5jaHJvbml6aW5nIG9uZSBvciBtb3JlIHJlYWRhYmxlIHN0b3JlcyBhbmRcbiAqIGFwcGx5aW5nIGFuIGFnZ3JlZ2F0aW9uIGZ1bmN0aW9uIG92ZXIgaXRzIGlucHV0IHZhbHVlcy5cbiAqXG4gKiBodHRwczovL3N2ZWx0ZS5kZXYvZG9jcy9zdmVsdGUtc3RvcmUjZGVyaXZlZFxuICogQHRlbXBsYXRlIHtpbXBvcnQoJy4vcHJpdmF0ZS5qcycpLlN0b3Jlc30gU1xuICogQHRlbXBsYXRlIFRcbiAqIEBvdmVybG9hZFxuICogQHBhcmFtIHtTfSBzdG9yZXMgLSBpbnB1dCBzdG9yZXNcbiAqIEBwYXJhbSB7KHZhbHVlczogaW1wb3J0KCcuL3ByaXZhdGUuanMnKS5TdG9yZXNWYWx1ZXM8Uz4pID0+IFR9IGZuIC0gZnVuY3Rpb24gY2FsbGJhY2sgdGhhdCBhZ2dyZWdhdGVzIHRoZSB2YWx1ZXNcbiAqIEBwYXJhbSB7VH0gW2luaXRpYWxfdmFsdWVdIC0gaW5pdGlhbCB2YWx1ZVxuICogQHJldHVybnMge2ltcG9ydCgnLi9wdWJsaWMuanMnKS5SZWFkYWJsZTxUPn1cbiAqL1xuXG4vKipcbiAqIEB0ZW1wbGF0ZSB7aW1wb3J0KCcuL3ByaXZhdGUuanMnKS5TdG9yZXN9IFNcbiAqIEB0ZW1wbGF0ZSBUXG4gKiBAcGFyYW0ge1N9IHN0b3Jlc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSB7VH0gW2luaXRpYWxfdmFsdWVdXG4gKiBAcmV0dXJucyB7aW1wb3J0KCcuL3B1YmxpYy5qcycpLlJlYWRhYmxlPFQ+fVxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVyaXZlZChzdG9yZXMsIGZuLCBpbml0aWFsX3ZhbHVlKSB7XG5cdGNvbnN0IHNpbmdsZSA9ICFBcnJheS5pc0FycmF5KHN0b3Jlcyk7XG5cdC8qKiBAdHlwZSB7QXJyYXk8aW1wb3J0KCcuL3B1YmxpYy5qcycpLlJlYWRhYmxlPGFueT4+fSAqL1xuXHRjb25zdCBzdG9yZXNfYXJyYXkgPSBzaW5nbGUgPyBbc3RvcmVzXSA6IHN0b3Jlcztcblx0aWYgKCFzdG9yZXNfYXJyYXkuZXZlcnkoQm9vbGVhbikpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ2Rlcml2ZWQoKSBleHBlY3RzIHN0b3JlcyBhcyBpbnB1dCwgZ290IGEgZmFsc3kgdmFsdWUnKTtcblx0fVxuXHRjb25zdCBhdXRvID0gZm4ubGVuZ3RoIDwgMjtcblx0cmV0dXJuIHJlYWRhYmxlKGluaXRpYWxfdmFsdWUsIChzZXQsIHVwZGF0ZSkgPT4ge1xuXHRcdGxldCBzdGFydGVkID0gZmFsc2U7XG5cdFx0Y29uc3QgdmFsdWVzID0gW107XG5cdFx0bGV0IHBlbmRpbmcgPSAwO1xuXHRcdGxldCBjbGVhbnVwID0gbm9vcDtcblx0XHRjb25zdCBzeW5jID0gKCkgPT4ge1xuXHRcdFx0aWYgKHBlbmRpbmcpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0Y2xlYW51cCgpO1xuXHRcdFx0Y29uc3QgcmVzdWx0ID0gZm4oc2luZ2xlID8gdmFsdWVzWzBdIDogdmFsdWVzLCBzZXQsIHVwZGF0ZSk7XG5cdFx0XHRpZiAoYXV0bykge1xuXHRcdFx0XHRzZXQocmVzdWx0KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNsZWFudXAgPSBpc19mdW5jdGlvbihyZXN1bHQpID8gcmVzdWx0IDogbm9vcDtcblx0XHRcdH1cblx0XHR9O1xuXHRcdGNvbnN0IHVuc3Vic2NyaWJlcnMgPSBzdG9yZXNfYXJyYXkubWFwKChzdG9yZSwgaSkgPT5cblx0XHRcdHN1YnNjcmliZShcblx0XHRcdFx0c3RvcmUsXG5cdFx0XHRcdCh2YWx1ZSkgPT4ge1xuXHRcdFx0XHRcdHZhbHVlc1tpXSA9IHZhbHVlO1xuXHRcdFx0XHRcdHBlbmRpbmcgJj0gfigxIDw8IGkpO1xuXHRcdFx0XHRcdGlmIChzdGFydGVkKSB7XG5cdFx0XHRcdFx0XHRzeW5jKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHQoKSA9PiB7XG5cdFx0XHRcdFx0cGVuZGluZyB8PSAxIDw8IGk7XG5cdFx0XHRcdH1cblx0XHRcdClcblx0XHQpO1xuXHRcdHN0YXJ0ZWQgPSB0cnVlO1xuXHRcdHN5bmMoKTtcblx0XHRyZXR1cm4gZnVuY3Rpb24gc3RvcCgpIHtcblx0XHRcdHJ1bl9hbGwodW5zdWJzY3JpYmVycyk7XG5cdFx0XHRjbGVhbnVwKCk7XG5cdFx0XHQvLyBXZSBuZWVkIHRvIHNldCB0aGlzIHRvIGZhbHNlIGJlY2F1c2UgY2FsbGJhY2tzIGNhbiBzdGlsbCBoYXBwZW4gZGVzcGl0ZSBoYXZpbmcgdW5zdWJzY3JpYmVkOlxuXHRcdFx0Ly8gQ2FsbGJhY2tzIG1pZ2h0IGFscmVhZHkgYmUgcGxhY2VkIGluIHRoZSBxdWV1ZSB3aGljaCBkb2Vzbid0IGtub3cgaXQgc2hvdWxkIG5vIGxvbmdlclxuXHRcdFx0Ly8gaW52b2tlIHRoaXMgZGVyaXZlZCBzdG9yZS5cblx0XHRcdHN0YXJ0ZWQgPSBmYWxzZTtcblx0XHR9O1xuXHR9KTtcbn1cblxuLyoqXG4gKiBUYWtlcyBhIHN0b3JlIGFuZCByZXR1cm5zIGEgbmV3IG9uZSBkZXJpdmVkIGZyb20gdGhlIG9sZCBvbmUgdGhhdCBpcyByZWFkYWJsZS5cbiAqXG4gKiBodHRwczovL3N2ZWx0ZS5kZXYvZG9jcy9zdmVsdGUtc3RvcmUjcmVhZG9ubHlcbiAqIEB0ZW1wbGF0ZSBUXG4gKiBAcGFyYW0ge2ltcG9ydCgnLi9wdWJsaWMuanMnKS5SZWFkYWJsZTxUPn0gc3RvcmUgIC0gc3RvcmUgdG8gbWFrZSByZWFkb25seVxuICogQHJldHVybnMge2ltcG9ydCgnLi9wdWJsaWMuanMnKS5SZWFkYWJsZTxUPn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlYWRvbmx5KHN0b3JlKSB7XG5cdHJldHVybiB7XG5cdFx0c3Vic2NyaWJlOiBzdG9yZS5zdWJzY3JpYmUuYmluZChzdG9yZSlcblx0fTtcbn1cblxuZXhwb3J0IHsgZ2V0X3N0b3JlX3ZhbHVlIGFzIGdldCB9O1xuIiwgImltcG9ydCB7IGdldFF1ZXJ5Q2xpZW50Q29udGV4dCB9IGZyb20gJy4vY29udGV4dCc7XG5leHBvcnQgZnVuY3Rpb24gdXNlUXVlcnlDbGllbnQoKSB7XG4gICAgY29uc3QgcXVlcnlDbGllbnQgPSBnZXRRdWVyeUNsaWVudENvbnRleHQoKTtcbiAgICByZXR1cm4gcXVlcnlDbGllbnQ7XG59XG4iLCAiaW1wb3J0IHsgbm90aWZ5TWFuYWdlciwgfSBmcm9tICdAdGFuc3RhY2svcXVlcnktY29yZSc7XG5pbXBvcnQgeyBkZXJpdmVkLCByZWFkYWJsZSB9IGZyb20gJ3N2ZWx0ZS9zdG9yZSc7XG5pbXBvcnQgeyB1c2VRdWVyeUNsaWVudCB9IGZyb20gJy4vdXNlUXVlcnlDbGllbnQnO1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUJhc2VRdWVyeShvcHRpb25zLCBPYnNlcnZlcikge1xuICAgIGNvbnN0IHF1ZXJ5Q2xpZW50ID0gdXNlUXVlcnlDbGllbnQoKTtcbiAgICBjb25zdCBkZWZhdWx0ZWRPcHRpb25zID0gcXVlcnlDbGllbnQuZGVmYXVsdFF1ZXJ5T3B0aW9ucyhvcHRpb25zKTtcbiAgICBkZWZhdWx0ZWRPcHRpb25zLl9vcHRpbWlzdGljUmVzdWx0cyA9ICdvcHRpbWlzdGljJztcbiAgICBsZXQgb2JzZXJ2ZXIgPSBuZXcgT2JzZXJ2ZXIocXVlcnlDbGllbnQsIGRlZmF1bHRlZE9wdGlvbnMpO1xuICAgIC8vIEluY2x1ZGUgY2FsbGJhY2tzIGluIGJhdGNoIHJlbmRlcnNcbiAgICBpZiAoZGVmYXVsdGVkT3B0aW9ucy5vbkVycm9yKSB7XG4gICAgICAgIGRlZmF1bHRlZE9wdGlvbnMub25FcnJvciA9IG5vdGlmeU1hbmFnZXIuYmF0Y2hDYWxscyhkZWZhdWx0ZWRPcHRpb25zLm9uRXJyb3IpO1xuICAgIH1cbiAgICBpZiAoZGVmYXVsdGVkT3B0aW9ucy5vblN1Y2Nlc3MpIHtcbiAgICAgICAgZGVmYXVsdGVkT3B0aW9ucy5vblN1Y2Nlc3MgPSBub3RpZnlNYW5hZ2VyLmJhdGNoQ2FsbHMoZGVmYXVsdGVkT3B0aW9ucy5vblN1Y2Nlc3MpO1xuICAgIH1cbiAgICBpZiAoZGVmYXVsdGVkT3B0aW9ucy5vblNldHRsZWQpIHtcbiAgICAgICAgZGVmYXVsdGVkT3B0aW9ucy5vblNldHRsZWQgPSBub3RpZnlNYW5hZ2VyLmJhdGNoQ2FsbHMoZGVmYXVsdGVkT3B0aW9ucy5vblNldHRsZWQpO1xuICAgIH1cbiAgICByZWFkYWJsZShvYnNlcnZlcikuc3Vic2NyaWJlKCgkb2JzZXJ2ZXIpID0+IHtcbiAgICAgICAgb2JzZXJ2ZXIgPSAkb2JzZXJ2ZXI7XG4gICAgICAgIC8vIERvIG5vdCBub3RpZnkgb24gdXBkYXRlcyBiZWNhdXNlIG9mIGNoYW5nZXMgaW4gdGhlIG9wdGlvbnMgYmVjYXVzZVxuICAgICAgICAvLyB0aGVzZSBjaGFuZ2VzIHNob3VsZCBhbHJlYWR5IGJlIHJlZmxlY3RlZCBpbiB0aGUgb3B0aW1pc3RpYyByZXN1bHQuXG4gICAgICAgIG9ic2VydmVyLnNldE9wdGlvbnMoZGVmYXVsdGVkT3B0aW9ucywgeyBsaXN0ZW5lcnM6IGZhbHNlIH0pO1xuICAgIH0pO1xuICAgIGNvbnN0IHJlc3VsdCA9IHJlYWRhYmxlKG9ic2VydmVyLmdldEN1cnJlbnRSZXN1bHQoKSwgKHNldCkgPT4ge1xuICAgICAgICByZXR1cm4gb2JzZXJ2ZXIuc3Vic2NyaWJlKG5vdGlmeU1hbmFnZXIuYmF0Y2hDYWxscyhzZXQpKTtcbiAgICB9KTtcbiAgICBjb25zdCB7IHN1YnNjcmliZSB9ID0gZGVyaXZlZChyZXN1bHQsICgkcmVzdWx0KSA9PiB7XG4gICAgICAgICRyZXN1bHQgPSBvYnNlcnZlci5nZXRPcHRpbWlzdGljUmVzdWx0KGRlZmF1bHRlZE9wdGlvbnMpO1xuICAgICAgICByZXR1cm4gIWRlZmF1bHRlZE9wdGlvbnMubm90aWZ5T25DaGFuZ2VQcm9wc1xuICAgICAgICAgICAgPyBvYnNlcnZlci50cmFja1Jlc3VsdCgkcmVzdWx0KVxuICAgICAgICAgICAgOiAkcmVzdWx0O1xuICAgIH0pO1xuICAgIHJldHVybiB7IHN1YnNjcmliZSB9O1xufVxuIiwgImltcG9ydCB7IFF1ZXJ5T2JzZXJ2ZXIsIHBhcnNlUXVlcnlBcmdzIH0gZnJvbSAnQHRhbnN0YWNrL3F1ZXJ5LWNvcmUnO1xuaW1wb3J0IHsgY3JlYXRlQmFzZVF1ZXJ5IH0gZnJvbSAnLi9jcmVhdGVCYXNlUXVlcnknO1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVF1ZXJ5KGFyZzEsIGFyZzIsIGFyZzMpIHtcbiAgICBjb25zdCBwYXJzZWRPcHRpb25zID0gcGFyc2VRdWVyeUFyZ3MoYXJnMSwgYXJnMiwgYXJnMyk7XG4gICAgY29uc3QgcmVzdWx0ID0gY3JlYXRlQmFzZVF1ZXJ5KHBhcnNlZE9wdGlvbnMsIFF1ZXJ5T2JzZXJ2ZXIpO1xuICAgIHJldHVybiByZXN1bHQ7XG59XG4iLCAiaW1wb3J0IHsgZGVyaXZlZCwgcmVhZGFibGUgfSBmcm9tICdzdmVsdGUvc3RvcmUnO1xuaW1wb3J0IHsgTXV0YXRpb25PYnNlcnZlciwgbm90aWZ5TWFuYWdlciwgcGFyc2VNdXRhdGlvbkFyZ3MsIH0gZnJvbSAnQHRhbnN0YWNrL3F1ZXJ5LWNvcmUnO1xuaW1wb3J0IHsgdXNlUXVlcnlDbGllbnQgfSBmcm9tICcuL3VzZVF1ZXJ5Q2xpZW50JztcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVNdXRhdGlvbihhcmcxLCBhcmcyLCBhcmczKSB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHBhcnNlTXV0YXRpb25BcmdzKGFyZzEsIGFyZzIsIGFyZzMpO1xuICAgIGNvbnN0IHF1ZXJ5Q2xpZW50ID0gdXNlUXVlcnlDbGllbnQoKTtcbiAgICBsZXQgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihxdWVyeUNsaWVudCwgb3B0aW9ucyk7XG4gICAgbGV0IG11dGF0ZTtcbiAgICByZWFkYWJsZShvYnNlcnZlcikuc3Vic2NyaWJlKCgkb2JzZXJ2ZXIpID0+IHtcbiAgICAgICAgb2JzZXJ2ZXIgPSAkb2JzZXJ2ZXI7XG4gICAgICAgIG11dGF0ZSA9ICh2YXJpYWJsZXMsIG11dGF0ZU9wdGlvbnMpID0+IHtcbiAgICAgICAgICAgIG9ic2VydmVyLm11dGF0ZSh2YXJpYWJsZXMsIG11dGF0ZU9wdGlvbnMpLmNhdGNoKG5vb3ApO1xuICAgICAgICB9O1xuICAgICAgICBvYnNlcnZlci5zZXRPcHRpb25zKG9wdGlvbnMpO1xuICAgIH0pO1xuICAgIGNvbnN0IHJlc3VsdCA9IHJlYWRhYmxlKG9ic2VydmVyLmdldEN1cnJlbnRSZXN1bHQoKSwgKHNldCkgPT4ge1xuICAgICAgICByZXR1cm4gb2JzZXJ2ZXIuc3Vic2NyaWJlKG5vdGlmeU1hbmFnZXIuYmF0Y2hDYWxscygodmFsKSA9PiBzZXQodmFsKSkpO1xuICAgIH0pO1xuICAgIGNvbnN0IHsgc3Vic2NyaWJlIH0gPSBkZXJpdmVkKHJlc3VsdCwgKCRyZXN1bHQpID0+ICh7XG4gICAgICAgIC4uLiRyZXN1bHQsXG4gICAgICAgIG11dGF0ZSxcbiAgICAgICAgbXV0YXRlQXN5bmM6ICRyZXN1bHQubXV0YXRlLFxuICAgIH0pKTtcbiAgICByZXR1cm4geyBzdWJzY3JpYmUgfTtcbn1cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZW1wdHktZnVuY3Rpb25cbmZ1bmN0aW9uIG5vb3AoKSB7IH1cbiIsICJpbXBvcnQgeyBoeWRyYXRlLCB9IGZyb20gJ0B0YW5zdGFjay9xdWVyeS1jb3JlJztcbmltcG9ydCB7IHVzZVF1ZXJ5Q2xpZW50IH0gZnJvbSAnLi91c2VRdWVyeUNsaWVudCc7XG5leHBvcnQgZnVuY3Rpb24gdXNlSHlkcmF0ZShzdGF0ZSwgb3B0aW9ucykge1xuICAgIGNvbnN0IGNsaWVudCA9IHVzZVF1ZXJ5Q2xpZW50KCk7XG4gICAgaWYgKHN0YXRlKSB7XG4gICAgICAgIGh5ZHJhdGUoY2xpZW50LCBzdGF0ZSwgb3B0aW9ucyk7XG4gICAgfVxufVxuIiwgIjxzY3JpcHQ+aW1wb3J0IHsgdXNlSHlkcmF0ZSB9IGZyb20gXCIuL3VzZUh5ZHJhdGVcIjtcbmV4cG9ydCBsZXQgc3RhdGU7XG5leHBvcnQgbGV0IG9wdGlvbnMgPSB2b2lkIDA7XG51c2VIeWRyYXRlKHN0YXRlLCBvcHRpb25zKTtcbjwvc2NyaXB0PlxuXG48c2xvdCAvPlxuIiwgIjxzY3JpcHQ+aW1wb3J0IHsgb25EZXN0cm95LCBvbk1vdW50IH0gZnJvbSBcInN2ZWx0ZVwiO1xuaW1wb3J0IHsgUXVlcnlDbGllbnQgfSBmcm9tIFwiQHRhbnN0YWNrL3F1ZXJ5LWNvcmVcIjtcbmltcG9ydCB7IHNldFF1ZXJ5Q2xpZW50Q29udGV4dCB9IGZyb20gXCIuL2NvbnRleHRcIjtcbmV4cG9ydCBsZXQgY2xpZW50ID0gbmV3IFF1ZXJ5Q2xpZW50KCk7XG5vbk1vdW50KCgpID0+IHtcbiAgY2xpZW50Lm1vdW50KCk7XG59KTtcbnNldFF1ZXJ5Q2xpZW50Q29udGV4dChjbGllbnQpO1xub25EZXN0cm95KCgpID0+IHtcbiAgY2xpZW50LnVubW91bnQoKTtcbn0pO1xuPC9zY3JpcHQ+XG5cbjxzbG90IC8+XG4iLCAiLy8gU2hvdWxkIGJlIG5vIGltcG9ydHMgaGVyZSFcblxuLyoqXG4gKiBUaGUgc2VudGluZWwgdmFsdWUgcmV0dXJuZWQgYnkgcHJvZHVjZXJzIHRvIHJlcGxhY2UgdGhlIGRyYWZ0IHdpdGggdW5kZWZpbmVkLlxuICovXG5leHBvcnQgY29uc3QgTk9USElORzogdW5pcXVlIHN5bWJvbCA9IFN5bWJvbC5mb3IoXCJpbW1lci1ub3RoaW5nXCIpXG5cbi8qKlxuICogVG8gbGV0IEltbWVyIHRyZWF0IHlvdXIgY2xhc3MgaW5zdGFuY2VzIGFzIHBsYWluIGltbXV0YWJsZSBvYmplY3RzXG4gKiAoYWxiZWl0IHdpdGggYSBjdXN0b20gcHJvdG90eXBlKSwgeW91IG11c3QgZGVmaW5lIGVpdGhlciBhbiBpbnN0YW5jZSBwcm9wZXJ0eVxuICogb3IgYSBzdGF0aWMgcHJvcGVydHkgb24gZWFjaCBvZiB5b3VyIGN1c3RvbSBjbGFzc2VzLlxuICpcbiAqIE90aGVyd2lzZSwgeW91ciBjbGFzcyBpbnN0YW5jZSB3aWxsIG5ldmVyIGJlIGRyYWZ0ZWQsIHdoaWNoIG1lYW5zIGl0IHdvbid0IGJlXG4gKiBzYWZlIHRvIG11dGF0ZSBpbiBhIHByb2R1Y2UgY2FsbGJhY2suXG4gKi9cbmV4cG9ydCBjb25zdCBEUkFGVEFCTEU6IHVuaXF1ZSBzeW1ib2wgPSBTeW1ib2wuZm9yKFwiaW1tZXItZHJhZnRhYmxlXCIpXG5cbmV4cG9ydCBjb25zdCBEUkFGVF9TVEFURTogdW5pcXVlIHN5bWJvbCA9IFN5bWJvbC5mb3IoXCJpbW1lci1zdGF0ZVwiKVxuIiwgImV4cG9ydCBjb25zdCBlcnJvcnMgPVxuXHRwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCJcblx0XHQ/IFtcblx0XHRcdFx0Ly8gQWxsIGVycm9yIGNvZGVzLCBzdGFydGluZyBieSAwOlxuXHRcdFx0XHRmdW5jdGlvbihwbHVnaW46IHN0cmluZykge1xuXHRcdFx0XHRcdHJldHVybiBgVGhlIHBsdWdpbiBmb3IgJyR7cGx1Z2lufScgaGFzIG5vdCBiZWVuIGxvYWRlZCBpbnRvIEltbWVyLiBUbyBlbmFibGUgdGhlIHBsdWdpbiwgaW1wb3J0IGFuZCBjYWxsIFxcYGVuYWJsZSR7cGx1Z2lufSgpXFxgIHdoZW4gaW5pdGlhbGl6aW5nIHlvdXIgYXBwbGljYXRpb24uYFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRmdW5jdGlvbih0aGluZzogc3RyaW5nKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGBwcm9kdWNlIGNhbiBvbmx5IGJlIGNhbGxlZCBvbiB0aGluZ3MgdGhhdCBhcmUgZHJhZnRhYmxlOiBwbGFpbiBvYmplY3RzLCBhcnJheXMsIE1hcCwgU2V0IG9yIGNsYXNzZXMgdGhhdCBhcmUgbWFya2VkIHdpdGggJ1tpbW1lcmFibGVdOiB0cnVlJy4gR290ICcke3RoaW5nfSdgXG5cdFx0XHRcdH0sXG5cdFx0XHRcdFwiVGhpcyBvYmplY3QgaGFzIGJlZW4gZnJvemVuIGFuZCBzaG91bGQgbm90IGJlIG11dGF0ZWRcIixcblx0XHRcdFx0ZnVuY3Rpb24oZGF0YTogYW55KSB7XG5cdFx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHRcdFwiQ2Fubm90IHVzZSBhIHByb3h5IHRoYXQgaGFzIGJlZW4gcmV2b2tlZC4gRGlkIHlvdSBwYXNzIGFuIG9iamVjdCBmcm9tIGluc2lkZSBhbiBpbW1lciBmdW5jdGlvbiB0byBhbiBhc3luYyBwcm9jZXNzPyBcIiArXG5cdFx0XHRcdFx0XHRkYXRhXG5cdFx0XHRcdFx0KVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRcIkFuIGltbWVyIHByb2R1Y2VyIHJldHVybmVkIGEgbmV3IHZhbHVlICphbmQqIG1vZGlmaWVkIGl0cyBkcmFmdC4gRWl0aGVyIHJldHVybiBhIG5ldyB2YWx1ZSAqb3IqIG1vZGlmeSB0aGUgZHJhZnQuXCIsXG5cdFx0XHRcdFwiSW1tZXIgZm9yYmlkcyBjaXJjdWxhciByZWZlcmVuY2VzXCIsXG5cdFx0XHRcdFwiVGhlIGZpcnN0IG9yIHNlY29uZCBhcmd1bWVudCB0byBgcHJvZHVjZWAgbXVzdCBiZSBhIGZ1bmN0aW9uXCIsXG5cdFx0XHRcdFwiVGhlIHRoaXJkIGFyZ3VtZW50IHRvIGBwcm9kdWNlYCBtdXN0IGJlIGEgZnVuY3Rpb24gb3IgdW5kZWZpbmVkXCIsXG5cdFx0XHRcdFwiRmlyc3QgYXJndW1lbnQgdG8gYGNyZWF0ZURyYWZ0YCBtdXN0IGJlIGEgcGxhaW4gb2JqZWN0LCBhbiBhcnJheSwgb3IgYW4gaW1tZXJhYmxlIG9iamVjdFwiLFxuXHRcdFx0XHRcIkZpcnN0IGFyZ3VtZW50IHRvIGBmaW5pc2hEcmFmdGAgbXVzdCBiZSBhIGRyYWZ0IHJldHVybmVkIGJ5IGBjcmVhdGVEcmFmdGBcIixcblx0XHRcdFx0ZnVuY3Rpb24odGhpbmc6IHN0cmluZykge1xuXHRcdFx0XHRcdHJldHVybiBgJ2N1cnJlbnQnIGV4cGVjdHMgYSBkcmFmdCwgZ290OiAke3RoaW5nfWBcblx0XHRcdFx0fSxcblx0XHRcdFx0XCJPYmplY3QuZGVmaW5lUHJvcGVydHkoKSBjYW5ub3QgYmUgdXNlZCBvbiBhbiBJbW1lciBkcmFmdFwiLFxuXHRcdFx0XHRcIk9iamVjdC5zZXRQcm90b3R5cGVPZigpIGNhbm5vdCBiZSB1c2VkIG9uIGFuIEltbWVyIGRyYWZ0XCIsXG5cdFx0XHRcdFwiSW1tZXIgb25seSBzdXBwb3J0cyBkZWxldGluZyBhcnJheSBpbmRpY2VzXCIsXG5cdFx0XHRcdFwiSW1tZXIgb25seSBzdXBwb3J0cyBzZXR0aW5nIGFycmF5IGluZGljZXMgYW5kIHRoZSAnbGVuZ3RoJyBwcm9wZXJ0eVwiLFxuXHRcdFx0XHRmdW5jdGlvbih0aGluZzogc3RyaW5nKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGAnb3JpZ2luYWwnIGV4cGVjdHMgYSBkcmFmdCwgZ290OiAke3RoaW5nfWBcblx0XHRcdFx0fVxuXHRcdFx0XHQvLyBOb3RlOiBpZiBtb3JlIGVycm9ycyBhcmUgYWRkZWQsIHRoZSBlcnJvck9mZnNldCBpbiBQYXRjaGVzLnRzIHNob3VsZCBiZSBpbmNyZWFzZWRcblx0XHRcdFx0Ly8gU2VlIFBhdGNoZXMudHMgZm9yIGFkZGl0aW9uYWwgZXJyb3JzXG5cdFx0ICBdXG5cdFx0OiBbXVxuXG5leHBvcnQgZnVuY3Rpb24gZGllKGVycm9yOiBudW1iZXIsIC4uLmFyZ3M6IGFueVtdKTogbmV2ZXIge1xuXHRpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG5cdFx0Y29uc3QgZSA9IGVycm9yc1tlcnJvcl1cblx0XHRjb25zdCBtc2cgPSB0eXBlb2YgZSA9PT0gXCJmdW5jdGlvblwiID8gZS5hcHBseShudWxsLCBhcmdzIGFzIGFueSkgOiBlXG5cdFx0dGhyb3cgbmV3IEVycm9yKGBbSW1tZXJdICR7bXNnfWApXG5cdH1cblx0dGhyb3cgbmV3IEVycm9yKFxuXHRcdGBbSW1tZXJdIG1pbmlmaWVkIGVycm9yIG5yOiAke2Vycm9yfS4gRnVsbCBlcnJvciBhdDogaHR0cHM6Ly9iaXQubHkvM2NYRUtXZmBcblx0KVxufVxuIiwgImltcG9ydCB7XG5cdERSQUZUX1NUQVRFLFxuXHREUkFGVEFCTEUsXG5cdE9iamVjdGlzaCxcblx0RHJhZnRlZCxcblx0QW55T2JqZWN0LFxuXHRBbnlNYXAsXG5cdEFueVNldCxcblx0SW1tZXJTdGF0ZSxcblx0QXJjaFR5cGUsXG5cdGRpZSxcblx0U3RyaWN0TW9kZVxufSBmcm9tIFwiLi4vaW50ZXJuYWxcIlxuXG5leHBvcnQgY29uc3QgZ2V0UHJvdG90eXBlT2YgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2ZcblxuLyoqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZ2l2ZW4gdmFsdWUgaXMgYW4gSW1tZXIgZHJhZnQgKi9cbi8qI19fUFVSRV9fKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0RyYWZ0KHZhbHVlOiBhbnkpOiBib29sZWFuIHtcblx0cmV0dXJuICEhdmFsdWUgJiYgISF2YWx1ZVtEUkFGVF9TVEFURV1cbn1cblxuLyoqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZ2l2ZW4gdmFsdWUgY2FuIGJlIGRyYWZ0ZWQgYnkgSW1tZXIgKi9cbi8qI19fUFVSRV9fKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0RyYWZ0YWJsZSh2YWx1ZTogYW55KTogYm9vbGVhbiB7XG5cdGlmICghdmFsdWUpIHJldHVybiBmYWxzZVxuXHRyZXR1cm4gKFxuXHRcdGlzUGxhaW5PYmplY3QodmFsdWUpIHx8XG5cdFx0QXJyYXkuaXNBcnJheSh2YWx1ZSkgfHxcblx0XHQhIXZhbHVlW0RSQUZUQUJMRV0gfHxcblx0XHQhIXZhbHVlLmNvbnN0cnVjdG9yPy5bRFJBRlRBQkxFXSB8fFxuXHRcdGlzTWFwKHZhbHVlKSB8fFxuXHRcdGlzU2V0KHZhbHVlKVxuXHQpXG59XG5cbmNvbnN0IG9iamVjdEN0b3JTdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLmNvbnN0cnVjdG9yLnRvU3RyaW5nKClcbi8qI19fUFVSRV9fKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1BsYWluT2JqZWN0KHZhbHVlOiBhbnkpOiBib29sZWFuIHtcblx0aWYgKCF2YWx1ZSB8fCB0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIpIHJldHVybiBmYWxzZVxuXHRjb25zdCBwcm90byA9IGdldFByb3RvdHlwZU9mKHZhbHVlKVxuXHRpZiAocHJvdG8gPT09IG51bGwpIHtcblx0XHRyZXR1cm4gdHJ1ZVxuXHR9XG5cdGNvbnN0IEN0b3IgPVxuXHRcdE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKHByb3RvLCBcImNvbnN0cnVjdG9yXCIpICYmIHByb3RvLmNvbnN0cnVjdG9yXG5cblx0aWYgKEN0b3IgPT09IE9iamVjdCkgcmV0dXJuIHRydWVcblxuXHRyZXR1cm4gKFxuXHRcdHR5cGVvZiBDdG9yID09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdEZ1bmN0aW9uLnRvU3RyaW5nLmNhbGwoQ3RvcikgPT09IG9iamVjdEN0b3JTdHJpbmdcblx0KVxufVxuXG4vKiogR2V0IHRoZSB1bmRlcmx5aW5nIG9iamVjdCB0aGF0IGlzIHJlcHJlc2VudGVkIGJ5IHRoZSBnaXZlbiBkcmFmdCAqL1xuLyojX19QVVJFX18qL1xuZXhwb3J0IGZ1bmN0aW9uIG9yaWdpbmFsPFQ+KHZhbHVlOiBUKTogVCB8IHVuZGVmaW5lZFxuZXhwb3J0IGZ1bmN0aW9uIG9yaWdpbmFsKHZhbHVlOiBEcmFmdGVkPGFueT4pOiBhbnkge1xuXHRpZiAoIWlzRHJhZnQodmFsdWUpKSBkaWUoMTUsIHZhbHVlKVxuXHRyZXR1cm4gdmFsdWVbRFJBRlRfU1RBVEVdLmJhc2VfXG59XG5cbi8qKlxuICogRWFjaCBpdGVyYXRlcyBhIG1hcCwgc2V0IG9yIGFycmF5LlxuICogT3IsIGlmIGFueSBvdGhlciBraW5kIG9mIG9iamVjdCwgYWxsIG9mIGl0cyBvd24gcHJvcGVydGllcy5cbiAqIFJlZ2FyZGxlc3Mgd2hldGhlciB0aGV5IGFyZSBlbnVtZXJhYmxlIG9yIHN5bWJvbHNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVhY2g8VCBleHRlbmRzIE9iamVjdGlzaD4oXG5cdG9iajogVCxcblx0aXRlcjogKGtleTogc3RyaW5nIHwgbnVtYmVyLCB2YWx1ZTogYW55LCBzb3VyY2U6IFQpID0+IHZvaWRcbik6IHZvaWRcbmV4cG9ydCBmdW5jdGlvbiBlYWNoKG9iajogYW55LCBpdGVyOiBhbnkpIHtcblx0aWYgKGdldEFyY2h0eXBlKG9iaikgPT09IEFyY2hUeXBlLk9iamVjdCkge1xuXHRcdFJlZmxlY3Qub3duS2V5cyhvYmopLmZvckVhY2goa2V5ID0+IHtcblx0XHRcdGl0ZXIoa2V5LCBvYmpba2V5XSwgb2JqKVxuXHRcdH0pXG5cdH0gZWxzZSB7XG5cdFx0b2JqLmZvckVhY2goKGVudHJ5OiBhbnksIGluZGV4OiBhbnkpID0+IGl0ZXIoaW5kZXgsIGVudHJ5LCBvYmopKVxuXHR9XG59XG5cbi8qI19fUFVSRV9fKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRBcmNodHlwZSh0aGluZzogYW55KTogQXJjaFR5cGUge1xuXHRjb25zdCBzdGF0ZTogdW5kZWZpbmVkIHwgSW1tZXJTdGF0ZSA9IHRoaW5nW0RSQUZUX1NUQVRFXVxuXHRyZXR1cm4gc3RhdGVcblx0XHQ/IHN0YXRlLnR5cGVfXG5cdFx0OiBBcnJheS5pc0FycmF5KHRoaW5nKVxuXHRcdD8gQXJjaFR5cGUuQXJyYXlcblx0XHQ6IGlzTWFwKHRoaW5nKVxuXHRcdD8gQXJjaFR5cGUuTWFwXG5cdFx0OiBpc1NldCh0aGluZylcblx0XHQ/IEFyY2hUeXBlLlNldFxuXHRcdDogQXJjaFR5cGUuT2JqZWN0XG59XG5cbi8qI19fUFVSRV9fKi9cbmV4cG9ydCBmdW5jdGlvbiBoYXModGhpbmc6IGFueSwgcHJvcDogUHJvcGVydHlLZXkpOiBib29sZWFuIHtcblx0cmV0dXJuIGdldEFyY2h0eXBlKHRoaW5nKSA9PT0gQXJjaFR5cGUuTWFwXG5cdFx0PyB0aGluZy5oYXMocHJvcClcblx0XHQ6IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0aGluZywgcHJvcClcbn1cblxuLyojX19QVVJFX18qL1xuZXhwb3J0IGZ1bmN0aW9uIGdldCh0aGluZzogQW55TWFwIHwgQW55T2JqZWN0LCBwcm9wOiBQcm9wZXJ0eUtleSk6IGFueSB7XG5cdC8vIEB0cy1pZ25vcmVcblx0cmV0dXJuIGdldEFyY2h0eXBlKHRoaW5nKSA9PT0gQXJjaFR5cGUuTWFwID8gdGhpbmcuZ2V0KHByb3ApIDogdGhpbmdbcHJvcF1cbn1cblxuLyojX19QVVJFX18qL1xuZXhwb3J0IGZ1bmN0aW9uIHNldCh0aGluZzogYW55LCBwcm9wT3JPbGRWYWx1ZTogUHJvcGVydHlLZXksIHZhbHVlOiBhbnkpIHtcblx0Y29uc3QgdCA9IGdldEFyY2h0eXBlKHRoaW5nKVxuXHRpZiAodCA9PT0gQXJjaFR5cGUuTWFwKSB0aGluZy5zZXQocHJvcE9yT2xkVmFsdWUsIHZhbHVlKVxuXHRlbHNlIGlmICh0ID09PSBBcmNoVHlwZS5TZXQpIHtcblx0XHR0aGluZy5hZGQodmFsdWUpXG5cdH0gZWxzZSB0aGluZ1twcm9wT3JPbGRWYWx1ZV0gPSB2YWx1ZVxufVxuXG4vKiNfX1BVUkVfXyovXG5leHBvcnQgZnVuY3Rpb24gaXMoeDogYW55LCB5OiBhbnkpOiBib29sZWFuIHtcblx0Ly8gRnJvbTogaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL2ZianMvYmxvYi9jNjk5MDRhNTExYjkwMDI2NjkzNTE2ODIyMzA2M2RkODc3MmRmYzQwL3BhY2thZ2VzL2ZianMvc3JjL2NvcmUvc2hhbGxvd0VxdWFsLmpzXG5cdGlmICh4ID09PSB5KSB7XG5cdFx0cmV0dXJuIHggIT09IDAgfHwgMSAvIHggPT09IDEgLyB5XG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuIHggIT09IHggJiYgeSAhPT0geVxuXHR9XG59XG5cbi8qI19fUFVSRV9fKi9cbmV4cG9ydCBmdW5jdGlvbiBpc01hcCh0YXJnZXQ6IGFueSk6IHRhcmdldCBpcyBBbnlNYXAge1xuXHRyZXR1cm4gdGFyZ2V0IGluc3RhbmNlb2YgTWFwXG59XG5cbi8qI19fUFVSRV9fKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1NldCh0YXJnZXQ6IGFueSk6IHRhcmdldCBpcyBBbnlTZXQge1xuXHRyZXR1cm4gdGFyZ2V0IGluc3RhbmNlb2YgU2V0XG59XG4vKiNfX1BVUkVfXyovXG5leHBvcnQgZnVuY3Rpb24gbGF0ZXN0KHN0YXRlOiBJbW1lclN0YXRlKTogYW55IHtcblx0cmV0dXJuIHN0YXRlLmNvcHlfIHx8IHN0YXRlLmJhc2VfXG59XG5cbi8qI19fUFVSRV9fKi9cbmV4cG9ydCBmdW5jdGlvbiBzaGFsbG93Q29weShiYXNlOiBhbnksIHN0cmljdDogU3RyaWN0TW9kZSkge1xuXHRpZiAoaXNNYXAoYmFzZSkpIHtcblx0XHRyZXR1cm4gbmV3IE1hcChiYXNlKVxuXHR9XG5cdGlmIChpc1NldChiYXNlKSkge1xuXHRcdHJldHVybiBuZXcgU2V0KGJhc2UpXG5cdH1cblx0aWYgKEFycmF5LmlzQXJyYXkoYmFzZSkpIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChiYXNlKVxuXG5cdGNvbnN0IGlzUGxhaW4gPSBpc1BsYWluT2JqZWN0KGJhc2UpXG5cblx0aWYgKHN0cmljdCA9PT0gdHJ1ZSB8fCAoc3RyaWN0ID09PSBcImNsYXNzX29ubHlcIiAmJiAhaXNQbGFpbikpIHtcblx0XHQvLyBQZXJmb3JtIGEgc3RyaWN0IGNvcHlcblx0XHRjb25zdCBkZXNjcmlwdG9ycyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKGJhc2UpXG5cdFx0ZGVsZXRlIGRlc2NyaXB0b3JzW0RSQUZUX1NUQVRFIGFzIGFueV1cblx0XHRsZXQga2V5cyA9IFJlZmxlY3Qub3duS2V5cyhkZXNjcmlwdG9ycylcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGNvbnN0IGtleTogYW55ID0ga2V5c1tpXVxuXHRcdFx0Y29uc3QgZGVzYyA9IGRlc2NyaXB0b3JzW2tleV1cblx0XHRcdGlmIChkZXNjLndyaXRhYmxlID09PSBmYWxzZSkge1xuXHRcdFx0XHRkZXNjLndyaXRhYmxlID0gdHJ1ZVxuXHRcdFx0XHRkZXNjLmNvbmZpZ3VyYWJsZSA9IHRydWVcblx0XHRcdH1cblx0XHRcdC8vIGxpa2Ugb2JqZWN0LmFzc2lnbiwgd2Ugd2lsbCByZWFkIGFueSBfb3duXywgZ2V0L3NldCBhY2Nlc3NvcnMuIFRoaXMgaGVscHMgaW4gZGVhbGluZ1xuXHRcdFx0Ly8gd2l0aCBsaWJyYXJpZXMgdGhhdCB0cmFwIHZhbHVlcywgbGlrZSBtb2J4IG9yIHZ1ZVxuXHRcdFx0Ly8gdW5saWtlIG9iamVjdC5hc3NpZ24sIG5vbi1lbnVtZXJhYmxlcyB3aWxsIGJlIGNvcGllZCBhcyB3ZWxsXG5cdFx0XHRpZiAoZGVzYy5nZXQgfHwgZGVzYy5zZXQpXG5cdFx0XHRcdGRlc2NyaXB0b3JzW2tleV0gPSB7XG5cdFx0XHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxuXHRcdFx0XHRcdHdyaXRhYmxlOiB0cnVlLCAvLyBjb3VsZCBsaXZlIHdpdGggISFkZXNjLnNldCBhcyB3ZWxsIGhlcmUuLi5cblx0XHRcdFx0XHRlbnVtZXJhYmxlOiBkZXNjLmVudW1lcmFibGUsXG5cdFx0XHRcdFx0dmFsdWU6IGJhc2Vba2V5XVxuXHRcdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBPYmplY3QuY3JlYXRlKGdldFByb3RvdHlwZU9mKGJhc2UpLCBkZXNjcmlwdG9ycylcblx0fSBlbHNlIHtcblx0XHQvLyBwZXJmb3JtIGEgc2xvcHB5IGNvcHlcblx0XHRjb25zdCBwcm90byA9IGdldFByb3RvdHlwZU9mKGJhc2UpXG5cdFx0aWYgKHByb3RvICE9PSBudWxsICYmIGlzUGxhaW4pIHtcblx0XHRcdHJldHVybiB7Li4uYmFzZX0gLy8gYXNzdW1wdGlvbjogYmV0dGVyIGlubmVyIGNsYXNzIG9wdGltaXphdGlvbiB0aGFuIHRoZSBhc3NpZ24gYmVsb3dcblx0XHR9XG5cdFx0Y29uc3Qgb2JqID0gT2JqZWN0LmNyZWF0ZShwcm90bylcblx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbihvYmosIGJhc2UpXG5cdH1cbn1cblxuLyoqXG4gKiBGcmVlemVzIGRyYWZ0YWJsZSBvYmplY3RzLiBSZXR1cm5zIHRoZSBvcmlnaW5hbCBvYmplY3QuXG4gKiBCeSBkZWZhdWx0IGZyZWV6ZXMgc2hhbGxvd2x5LCBidXQgaWYgdGhlIHNlY29uZCBhcmd1bWVudCBpcyBgdHJ1ZWAgaXQgd2lsbCBmcmVlemUgcmVjdXJzaXZlbHkuXG4gKlxuICogQHBhcmFtIG9ialxuICogQHBhcmFtIGRlZXBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZyZWV6ZTxUPihvYmo6IFQsIGRlZXA/OiBib29sZWFuKTogVFxuZXhwb3J0IGZ1bmN0aW9uIGZyZWV6ZTxUPihvYmo6IGFueSwgZGVlcDogYm9vbGVhbiA9IGZhbHNlKTogVCB7XG5cdGlmIChpc0Zyb3plbihvYmopIHx8IGlzRHJhZnQob2JqKSB8fCAhaXNEcmFmdGFibGUob2JqKSkgcmV0dXJuIG9ialxuXHRpZiAoZ2V0QXJjaHR5cGUob2JqKSA+IDEgLyogTWFwIG9yIFNldCAqLykge1xuXHRcdG9iai5zZXQgPSBvYmouYWRkID0gb2JqLmNsZWFyID0gb2JqLmRlbGV0ZSA9IGRvbnRNdXRhdGVGcm96ZW5Db2xsZWN0aW9ucyBhcyBhbnlcblx0fVxuXHRPYmplY3QuZnJlZXplKG9iailcblx0aWYgKGRlZXApXG5cdFx0Ly8gU2VlICM1OTAsIGRvbid0IHJlY3Vyc2UgaW50byBub24tZW51bWVyYWJsZSAvIFN5bWJvbCBwcm9wZXJ0aWVzIHdoZW4gZnJlZXppbmdcblx0XHQvLyBTbyB1c2UgT2JqZWN0LmVudHJpZXMgKG9ubHkgc3RyaW5nLWxpa2UsIGVudW1lcmFibGVzKSBpbnN0ZWFkIG9mIGVhY2goKVxuXHRcdE9iamVjdC5lbnRyaWVzKG9iaikuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiBmcmVlemUodmFsdWUsIHRydWUpKVxuXHRyZXR1cm4gb2JqXG59XG5cbmZ1bmN0aW9uIGRvbnRNdXRhdGVGcm96ZW5Db2xsZWN0aW9ucygpIHtcblx0ZGllKDIpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0Zyb3plbihvYmo6IGFueSk6IGJvb2xlYW4ge1xuXHRyZXR1cm4gT2JqZWN0LmlzRnJvemVuKG9iailcbn1cbiIsICJpbXBvcnQge1xuXHRJbW1lclN0YXRlLFxuXHRQYXRjaCxcblx0RHJhZnRlZCxcblx0SW1tZXJCYXNlU3RhdGUsXG5cdEFueU1hcCxcblx0QW55U2V0LFxuXHRBcmNoVHlwZSxcblx0ZGllXG59IGZyb20gXCIuLi9pbnRlcm5hbFwiXG5cbi8qKiBQbHVnaW4gdXRpbGl0aWVzICovXG5jb25zdCBwbHVnaW5zOiB7XG5cdFBhdGNoZXM/OiB7XG5cdFx0Z2VuZXJhdGVQYXRjaGVzXyhcblx0XHRcdHN0YXRlOiBJbW1lclN0YXRlLFxuXHRcdFx0YmFzZVBhdGg6IFBhdGNoUGF0aCxcblx0XHRcdHBhdGNoZXM6IFBhdGNoW10sXG5cdFx0XHRpbnZlcnNlUGF0Y2hlczogUGF0Y2hbXVxuXHRcdCk6IHZvaWRcblx0XHRnZW5lcmF0ZVJlcGxhY2VtZW50UGF0Y2hlc18oXG5cdFx0XHRiYXNlOiBhbnksXG5cdFx0XHRyZXBsYWNlbWVudDogYW55LFxuXHRcdFx0cGF0Y2hlczogUGF0Y2hbXSxcblx0XHRcdGludmVyc2VQYXRjaGVzOiBQYXRjaFtdXG5cdFx0KTogdm9pZFxuXHRcdGFwcGx5UGF0Y2hlc188VD4oZHJhZnQ6IFQsIHBhdGNoZXM6IHJlYWRvbmx5IFBhdGNoW10pOiBUXG5cdH1cblx0TWFwU2V0Pzoge1xuXHRcdHByb3h5TWFwXzxUIGV4dGVuZHMgQW55TWFwPih0YXJnZXQ6IFQsIHBhcmVudD86IEltbWVyU3RhdGUpOiBUXG5cdFx0cHJveHlTZXRfPFQgZXh0ZW5kcyBBbnlTZXQ+KHRhcmdldDogVCwgcGFyZW50PzogSW1tZXJTdGF0ZSk6IFRcblx0fVxufSA9IHt9XG5cbnR5cGUgUGx1Z2lucyA9IHR5cGVvZiBwbHVnaW5zXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQbHVnaW48SyBleHRlbmRzIGtleW9mIFBsdWdpbnM+KFxuXHRwbHVnaW5LZXk6IEtcbik6IEV4Y2x1ZGU8UGx1Z2luc1tLXSwgdW5kZWZpbmVkPiB7XG5cdGNvbnN0IHBsdWdpbiA9IHBsdWdpbnNbcGx1Z2luS2V5XVxuXHRpZiAoIXBsdWdpbikge1xuXHRcdGRpZSgwLCBwbHVnaW5LZXkpXG5cdH1cblx0Ly8gQHRzLWlnbm9yZVxuXHRyZXR1cm4gcGx1Z2luXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2FkUGx1Z2luPEsgZXh0ZW5kcyBrZXlvZiBQbHVnaW5zPihcblx0cGx1Z2luS2V5OiBLLFxuXHRpbXBsZW1lbnRhdGlvbjogUGx1Z2luc1tLXVxuKTogdm9pZCB7XG5cdGlmICghcGx1Z2luc1twbHVnaW5LZXldKSBwbHVnaW5zW3BsdWdpbktleV0gPSBpbXBsZW1lbnRhdGlvblxufVxuLyoqIE1hcCAvIFNldCBwbHVnaW4gKi9cblxuZXhwb3J0IGludGVyZmFjZSBNYXBTdGF0ZSBleHRlbmRzIEltbWVyQmFzZVN0YXRlIHtcblx0dHlwZV86IEFyY2hUeXBlLk1hcFxuXHRjb3B5XzogQW55TWFwIHwgdW5kZWZpbmVkXG5cdGFzc2lnbmVkXzogTWFwPGFueSwgYm9vbGVhbj4gfCB1bmRlZmluZWRcblx0YmFzZV86IEFueU1hcFxuXHRyZXZva2VkXzogYm9vbGVhblxuXHRkcmFmdF86IERyYWZ0ZWQ8QW55TWFwLCBNYXBTdGF0ZT5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBTZXRTdGF0ZSBleHRlbmRzIEltbWVyQmFzZVN0YXRlIHtcblx0dHlwZV86IEFyY2hUeXBlLlNldFxuXHRjb3B5XzogQW55U2V0IHwgdW5kZWZpbmVkXG5cdGJhc2VfOiBBbnlTZXRcblx0ZHJhZnRzXzogTWFwPGFueSwgRHJhZnRlZD4gLy8gbWFwcyB0aGUgb3JpZ2luYWwgdmFsdWUgdG8gdGhlIGRyYWZ0IHZhbHVlIGluIHRoZSBuZXcgc2V0XG5cdHJldm9rZWRfOiBib29sZWFuXG5cdGRyYWZ0XzogRHJhZnRlZDxBbnlTZXQsIFNldFN0YXRlPlxufVxuXG4vKiogUGF0Y2hlcyBwbHVnaW4gKi9cblxuZXhwb3J0IHR5cGUgUGF0Y2hQYXRoID0gKHN0cmluZyB8IG51bWJlcilbXVxuIiwgImltcG9ydCB7XG5cdFBhdGNoLFxuXHRQYXRjaExpc3RlbmVyLFxuXHREcmFmdGVkLFxuXHRJbW1lcixcblx0RFJBRlRfU1RBVEUsXG5cdEltbWVyU3RhdGUsXG5cdEFyY2hUeXBlLFxuXHRnZXRQbHVnaW5cbn0gZnJvbSBcIi4uL2ludGVybmFsXCJcblxuLyoqIEVhY2ggc2NvcGUgcmVwcmVzZW50cyBhIGBwcm9kdWNlYCBjYWxsLiAqL1xuXG5leHBvcnQgaW50ZXJmYWNlIEltbWVyU2NvcGUge1xuXHRwYXRjaGVzXz86IFBhdGNoW11cblx0aW52ZXJzZVBhdGNoZXNfPzogUGF0Y2hbXVxuXHRjYW5BdXRvRnJlZXplXzogYm9vbGVhblxuXHRkcmFmdHNfOiBhbnlbXVxuXHRwYXJlbnRfPzogSW1tZXJTY29wZVxuXHRwYXRjaExpc3RlbmVyXz86IFBhdGNoTGlzdGVuZXJcblx0aW1tZXJfOiBJbW1lclxuXHR1bmZpbmFsaXplZERyYWZ0c186IG51bWJlclxufVxuXG5sZXQgY3VycmVudFNjb3BlOiBJbW1lclNjb3BlIHwgdW5kZWZpbmVkXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDdXJyZW50U2NvcGUoKSB7XG5cdHJldHVybiBjdXJyZW50U2NvcGUhXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVNjb3BlKFxuXHRwYXJlbnRfOiBJbW1lclNjb3BlIHwgdW5kZWZpbmVkLFxuXHRpbW1lcl86IEltbWVyXG4pOiBJbW1lclNjb3BlIHtcblx0cmV0dXJuIHtcblx0XHRkcmFmdHNfOiBbXSxcblx0XHRwYXJlbnRfLFxuXHRcdGltbWVyXyxcblx0XHQvLyBXaGVuZXZlciB0aGUgbW9kaWZpZWQgZHJhZnQgY29udGFpbnMgYSBkcmFmdCBmcm9tIGFub3RoZXIgc2NvcGUsIHdlXG5cdFx0Ly8gbmVlZCB0byBwcmV2ZW50IGF1dG8tZnJlZXppbmcgc28gdGhlIHVub3duZWQgZHJhZnQgY2FuIGJlIGZpbmFsaXplZC5cblx0XHRjYW5BdXRvRnJlZXplXzogdHJ1ZSxcblx0XHR1bmZpbmFsaXplZERyYWZ0c186IDBcblx0fVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdXNlUGF0Y2hlc0luU2NvcGUoXG5cdHNjb3BlOiBJbW1lclNjb3BlLFxuXHRwYXRjaExpc3RlbmVyPzogUGF0Y2hMaXN0ZW5lclxuKSB7XG5cdGlmIChwYXRjaExpc3RlbmVyKSB7XG5cdFx0Z2V0UGx1Z2luKFwiUGF0Y2hlc1wiKSAvLyBhc3NlcnQgd2UgaGF2ZSB0aGUgcGx1Z2luXG5cdFx0c2NvcGUucGF0Y2hlc18gPSBbXVxuXHRcdHNjb3BlLmludmVyc2VQYXRjaGVzXyA9IFtdXG5cdFx0c2NvcGUucGF0Y2hMaXN0ZW5lcl8gPSBwYXRjaExpc3RlbmVyXG5cdH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJldm9rZVNjb3BlKHNjb3BlOiBJbW1lclNjb3BlKSB7XG5cdGxlYXZlU2NvcGUoc2NvcGUpXG5cdHNjb3BlLmRyYWZ0c18uZm9yRWFjaChyZXZva2VEcmFmdClcblx0Ly8gQHRzLWlnbm9yZVxuXHRzY29wZS5kcmFmdHNfID0gbnVsbFxufVxuXG5leHBvcnQgZnVuY3Rpb24gbGVhdmVTY29wZShzY29wZTogSW1tZXJTY29wZSkge1xuXHRpZiAoc2NvcGUgPT09IGN1cnJlbnRTY29wZSkge1xuXHRcdGN1cnJlbnRTY29wZSA9IHNjb3BlLnBhcmVudF9cblx0fVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZW50ZXJTY29wZShpbW1lcjogSW1tZXIpIHtcblx0cmV0dXJuIChjdXJyZW50U2NvcGUgPSBjcmVhdGVTY29wZShjdXJyZW50U2NvcGUsIGltbWVyKSlcbn1cblxuZnVuY3Rpb24gcmV2b2tlRHJhZnQoZHJhZnQ6IERyYWZ0ZWQpIHtcblx0Y29uc3Qgc3RhdGU6IEltbWVyU3RhdGUgPSBkcmFmdFtEUkFGVF9TVEFURV1cblx0aWYgKHN0YXRlLnR5cGVfID09PSBBcmNoVHlwZS5PYmplY3QgfHwgc3RhdGUudHlwZV8gPT09IEFyY2hUeXBlLkFycmF5KVxuXHRcdHN0YXRlLnJldm9rZV8oKVxuXHRlbHNlIHN0YXRlLnJldm9rZWRfID0gdHJ1ZVxufVxuIiwgImltcG9ydCB7XG5cdEltbWVyU2NvcGUsXG5cdERSQUZUX1NUQVRFLFxuXHRpc0RyYWZ0YWJsZSxcblx0Tk9USElORyxcblx0UGF0Y2hQYXRoLFxuXHRlYWNoLFxuXHRoYXMsXG5cdGZyZWV6ZSxcblx0SW1tZXJTdGF0ZSxcblx0aXNEcmFmdCxcblx0U2V0U3RhdGUsXG5cdHNldCxcblx0QXJjaFR5cGUsXG5cdGdldFBsdWdpbixcblx0ZGllLFxuXHRyZXZva2VTY29wZSxcblx0aXNGcm96ZW5cbn0gZnJvbSBcIi4uL2ludGVybmFsXCJcblxuZXhwb3J0IGZ1bmN0aW9uIHByb2Nlc3NSZXN1bHQocmVzdWx0OiBhbnksIHNjb3BlOiBJbW1lclNjb3BlKSB7XG5cdHNjb3BlLnVuZmluYWxpemVkRHJhZnRzXyA9IHNjb3BlLmRyYWZ0c18ubGVuZ3RoXG5cdGNvbnN0IGJhc2VEcmFmdCA9IHNjb3BlLmRyYWZ0c18hWzBdXG5cdGNvbnN0IGlzUmVwbGFjZWQgPSByZXN1bHQgIT09IHVuZGVmaW5lZCAmJiByZXN1bHQgIT09IGJhc2VEcmFmdFxuXHRpZiAoaXNSZXBsYWNlZCkge1xuXHRcdGlmIChiYXNlRHJhZnRbRFJBRlRfU1RBVEVdLm1vZGlmaWVkXykge1xuXHRcdFx0cmV2b2tlU2NvcGUoc2NvcGUpXG5cdFx0XHRkaWUoNClcblx0XHR9XG5cdFx0aWYgKGlzRHJhZnRhYmxlKHJlc3VsdCkpIHtcblx0XHRcdC8vIEZpbmFsaXplIHRoZSByZXN1bHQgaW4gY2FzZSBpdCBjb250YWlucyAob3IgaXMpIGEgc3Vic2V0IG9mIHRoZSBkcmFmdC5cblx0XHRcdHJlc3VsdCA9IGZpbmFsaXplKHNjb3BlLCByZXN1bHQpXG5cdFx0XHRpZiAoIXNjb3BlLnBhcmVudF8pIG1heWJlRnJlZXplKHNjb3BlLCByZXN1bHQpXG5cdFx0fVxuXHRcdGlmIChzY29wZS5wYXRjaGVzXykge1xuXHRcdFx0Z2V0UGx1Z2luKFwiUGF0Y2hlc1wiKS5nZW5lcmF0ZVJlcGxhY2VtZW50UGF0Y2hlc18oXG5cdFx0XHRcdGJhc2VEcmFmdFtEUkFGVF9TVEFURV0uYmFzZV8sXG5cdFx0XHRcdHJlc3VsdCxcblx0XHRcdFx0c2NvcGUucGF0Y2hlc18sXG5cdFx0XHRcdHNjb3BlLmludmVyc2VQYXRjaGVzXyFcblx0XHRcdClcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0Ly8gRmluYWxpemUgdGhlIGJhc2UgZHJhZnQuXG5cdFx0cmVzdWx0ID0gZmluYWxpemUoc2NvcGUsIGJhc2VEcmFmdCwgW10pXG5cdH1cblx0cmV2b2tlU2NvcGUoc2NvcGUpXG5cdGlmIChzY29wZS5wYXRjaGVzXykge1xuXHRcdHNjb3BlLnBhdGNoTGlzdGVuZXJfIShzY29wZS5wYXRjaGVzXywgc2NvcGUuaW52ZXJzZVBhdGNoZXNfISlcblx0fVxuXHRyZXR1cm4gcmVzdWx0ICE9PSBOT1RISU5HID8gcmVzdWx0IDogdW5kZWZpbmVkXG59XG5cbmZ1bmN0aW9uIGZpbmFsaXplKHJvb3RTY29wZTogSW1tZXJTY29wZSwgdmFsdWU6IGFueSwgcGF0aD86IFBhdGNoUGF0aCkge1xuXHQvLyBEb24ndCByZWN1cnNlIGluIHRobyByZWN1cnNpdmUgZGF0YSBzdHJ1Y3R1cmVzXG5cdGlmIChpc0Zyb3plbih2YWx1ZSkpIHJldHVybiB2YWx1ZVxuXG5cdGNvbnN0IHN0YXRlOiBJbW1lclN0YXRlID0gdmFsdWVbRFJBRlRfU1RBVEVdXG5cdC8vIEEgcGxhaW4gb2JqZWN0LCBtaWdodCBuZWVkIGZyZWV6aW5nLCBtaWdodCBjb250YWluIGRyYWZ0c1xuXHRpZiAoIXN0YXRlKSB7XG5cdFx0ZWFjaCh2YWx1ZSwgKGtleSwgY2hpbGRWYWx1ZSkgPT5cblx0XHRcdGZpbmFsaXplUHJvcGVydHkocm9vdFNjb3BlLCBzdGF0ZSwgdmFsdWUsIGtleSwgY2hpbGRWYWx1ZSwgcGF0aClcblx0XHQpXG5cdFx0cmV0dXJuIHZhbHVlXG5cdH1cblx0Ly8gTmV2ZXIgZmluYWxpemUgZHJhZnRzIG93bmVkIGJ5IGFub3RoZXIgc2NvcGUuXG5cdGlmIChzdGF0ZS5zY29wZV8gIT09IHJvb3RTY29wZSkgcmV0dXJuIHZhbHVlXG5cdC8vIFVubW9kaWZpZWQgZHJhZnQsIHJldHVybiB0aGUgKGZyb3plbikgb3JpZ2luYWxcblx0aWYgKCFzdGF0ZS5tb2RpZmllZF8pIHtcblx0XHRtYXliZUZyZWV6ZShyb290U2NvcGUsIHN0YXRlLmJhc2VfLCB0cnVlKVxuXHRcdHJldHVybiBzdGF0ZS5iYXNlX1xuXHR9XG5cdC8vIE5vdCBmaW5hbGl6ZWQgeWV0LCBsZXQncyBkbyB0aGF0IG5vd1xuXHRpZiAoIXN0YXRlLmZpbmFsaXplZF8pIHtcblx0XHRzdGF0ZS5maW5hbGl6ZWRfID0gdHJ1ZVxuXHRcdHN0YXRlLnNjb3BlXy51bmZpbmFsaXplZERyYWZ0c18tLVxuXHRcdGNvbnN0IHJlc3VsdCA9IHN0YXRlLmNvcHlfXG5cdFx0Ly8gRmluYWxpemUgYWxsIGNoaWxkcmVuIG9mIHRoZSBjb3B5XG5cdFx0Ly8gRm9yIHNldHMgd2UgY2xvbmUgYmVmb3JlIGl0ZXJhdGluZywgb3RoZXJ3aXNlIHdlIGNhbiBnZXQgaW4gZW5kbGVzcyBsb29wIGR1ZSB0byBtb2RpZnlpbmcgZHVyaW5nIGl0ZXJhdGlvbiwgc2VlICM2Mjhcblx0XHQvLyBUbyBwcmVzZXJ2ZSBpbnNlcnRpb24gb3JkZXIgaW4gYWxsIGNhc2VzIHdlIHRoZW4gY2xlYXIgdGhlIHNldFxuXHRcdC8vIEFuZCB3ZSBsZXQgZmluYWxpemVQcm9wZXJ0eSBrbm93IGl0IG5lZWRzIHRvIHJlLWFkZCBub24tZHJhZnQgY2hpbGRyZW4gYmFjayB0byB0aGUgdGFyZ2V0XG5cdFx0bGV0IHJlc3VsdEVhY2ggPSByZXN1bHRcblx0XHRsZXQgaXNTZXQgPSBmYWxzZVxuXHRcdGlmIChzdGF0ZS50eXBlXyA9PT0gQXJjaFR5cGUuU2V0KSB7XG5cdFx0XHRyZXN1bHRFYWNoID0gbmV3IFNldChyZXN1bHQpXG5cdFx0XHRyZXN1bHQuY2xlYXIoKVxuXHRcdFx0aXNTZXQgPSB0cnVlXG5cdFx0fVxuXHRcdGVhY2gocmVzdWx0RWFjaCwgKGtleSwgY2hpbGRWYWx1ZSkgPT5cblx0XHRcdGZpbmFsaXplUHJvcGVydHkocm9vdFNjb3BlLCBzdGF0ZSwgcmVzdWx0LCBrZXksIGNoaWxkVmFsdWUsIHBhdGgsIGlzU2V0KVxuXHRcdClcblx0XHQvLyBldmVyeXRoaW5nIGluc2lkZSBpcyBmcm96ZW4sIHdlIGNhbiBmcmVlemUgaGVyZVxuXHRcdG1heWJlRnJlZXplKHJvb3RTY29wZSwgcmVzdWx0LCBmYWxzZSlcblx0XHQvLyBmaXJzdCB0aW1lIGZpbmFsaXppbmcsIGxldCdzIGNyZWF0ZSB0aG9zZSBwYXRjaGVzXG5cdFx0aWYgKHBhdGggJiYgcm9vdFNjb3BlLnBhdGNoZXNfKSB7XG5cdFx0XHRnZXRQbHVnaW4oXCJQYXRjaGVzXCIpLmdlbmVyYXRlUGF0Y2hlc18oXG5cdFx0XHRcdHN0YXRlLFxuXHRcdFx0XHRwYXRoLFxuXHRcdFx0XHRyb290U2NvcGUucGF0Y2hlc18sXG5cdFx0XHRcdHJvb3RTY29wZS5pbnZlcnNlUGF0Y2hlc18hXG5cdFx0XHQpXG5cdFx0fVxuXHR9XG5cdHJldHVybiBzdGF0ZS5jb3B5X1xufVxuXG5mdW5jdGlvbiBmaW5hbGl6ZVByb3BlcnR5KFxuXHRyb290U2NvcGU6IEltbWVyU2NvcGUsXG5cdHBhcmVudFN0YXRlOiB1bmRlZmluZWQgfCBJbW1lclN0YXRlLFxuXHR0YXJnZXRPYmplY3Q6IGFueSxcblx0cHJvcDogc3RyaW5nIHwgbnVtYmVyLFxuXHRjaGlsZFZhbHVlOiBhbnksXG5cdHJvb3RQYXRoPzogUGF0Y2hQYXRoLFxuXHR0YXJnZXRJc1NldD86IGJvb2xlYW5cbikge1xuXHRpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmIGNoaWxkVmFsdWUgPT09IHRhcmdldE9iamVjdClcblx0XHRkaWUoNSlcblx0aWYgKGlzRHJhZnQoY2hpbGRWYWx1ZSkpIHtcblx0XHRjb25zdCBwYXRoID1cblx0XHRcdHJvb3RQYXRoICYmXG5cdFx0XHRwYXJlbnRTdGF0ZSAmJlxuXHRcdFx0cGFyZW50U3RhdGUhLnR5cGVfICE9PSBBcmNoVHlwZS5TZXQgJiYgLy8gU2V0IG9iamVjdHMgYXJlIGF0b21pYyBzaW5jZSB0aGV5IGhhdmUgbm8ga2V5cy5cblx0XHRcdCFoYXMoKHBhcmVudFN0YXRlIGFzIEV4Y2x1ZGU8SW1tZXJTdGF0ZSwgU2V0U3RhdGU+KS5hc3NpZ25lZF8hLCBwcm9wKSAvLyBTa2lwIGRlZXAgcGF0Y2hlcyBmb3IgYXNzaWduZWQga2V5cy5cblx0XHRcdFx0PyByb290UGF0aCEuY29uY2F0KHByb3ApXG5cdFx0XHRcdDogdW5kZWZpbmVkXG5cdFx0Ly8gRHJhZnRzIG93bmVkIGJ5IGBzY29wZWAgYXJlIGZpbmFsaXplZCBoZXJlLlxuXHRcdGNvbnN0IHJlcyA9IGZpbmFsaXplKHJvb3RTY29wZSwgY2hpbGRWYWx1ZSwgcGF0aClcblx0XHRzZXQodGFyZ2V0T2JqZWN0LCBwcm9wLCByZXMpXG5cdFx0Ly8gRHJhZnRzIGZyb20gYW5vdGhlciBzY29wZSBtdXN0IHByZXZlbnRlZCB0byBiZSBmcm96ZW5cblx0XHQvLyBpZiB3ZSBnb3QgYSBkcmFmdCBiYWNrIGZyb20gZmluYWxpemUsIHdlJ3JlIGluIGEgbmVzdGVkIHByb2R1Y2UgYW5kIHNob3VsZG4ndCBmcmVlemVcblx0XHRpZiAoaXNEcmFmdChyZXMpKSB7XG5cdFx0XHRyb290U2NvcGUuY2FuQXV0b0ZyZWV6ZV8gPSBmYWxzZVxuXHRcdH0gZWxzZSByZXR1cm5cblx0fSBlbHNlIGlmICh0YXJnZXRJc1NldCkge1xuXHRcdHRhcmdldE9iamVjdC5hZGQoY2hpbGRWYWx1ZSlcblx0fVxuXHQvLyBTZWFyY2ggbmV3IG9iamVjdHMgZm9yIHVuZmluYWxpemVkIGRyYWZ0cy4gRnJvemVuIG9iamVjdHMgc2hvdWxkIG5ldmVyIGNvbnRhaW4gZHJhZnRzLlxuXHRpZiAoaXNEcmFmdGFibGUoY2hpbGRWYWx1ZSkgJiYgIWlzRnJvemVuKGNoaWxkVmFsdWUpKSB7XG5cdFx0aWYgKCFyb290U2NvcGUuaW1tZXJfLmF1dG9GcmVlemVfICYmIHJvb3RTY29wZS51bmZpbmFsaXplZERyYWZ0c18gPCAxKSB7XG5cdFx0XHQvLyBvcHRpbWl6YXRpb246IGlmIGFuIG9iamVjdCBpcyBub3QgYSBkcmFmdCwgYW5kIHdlIGRvbid0IGhhdmUgdG9cblx0XHRcdC8vIGRlZXBmcmVlemUgZXZlcnl0aGluZywgYW5kIHdlIGFyZSBzdXJlIHRoYXQgbm8gZHJhZnRzIGFyZSBsZWZ0IGluIHRoZSByZW1haW5pbmcgb2JqZWN0XG5cdFx0XHQvLyBjYXVzZSB3ZSBzYXcgYW5kIGZpbmFsaXplZCBhbGwgZHJhZnRzIGFscmVhZHk7IHdlIGNhbiBzdG9wIHZpc2l0aW5nIHRoZSByZXN0IG9mIHRoZSB0cmVlLlxuXHRcdFx0Ly8gVGhpcyBiZW5lZml0cyBlc3BlY2lhbGx5IGFkZGluZyBsYXJnZSBkYXRhIHRyZWUncyB3aXRob3V0IGZ1cnRoZXIgcHJvY2Vzc2luZy5cblx0XHRcdC8vIFNlZSBhZGQtZGF0YS5qcyBwZXJmIHRlc3Rcblx0XHRcdHJldHVyblxuXHRcdH1cblx0XHRmaW5hbGl6ZShyb290U2NvcGUsIGNoaWxkVmFsdWUpXG5cdFx0Ly8gSW1tZXIgZGVlcCBmcmVlemVzIHBsYWluIG9iamVjdHMsIHNvIGlmIHRoZXJlIGlzIG5vIHBhcmVudCBzdGF0ZSwgd2UgZnJlZXplIGFzIHdlbGxcblx0XHQvLyBQZXIgIzU5MCwgd2UgbmV2ZXIgZnJlZXplIHN5bWJvbGljIHByb3BlcnRpZXMuIEp1c3QgdG8gbWFrZSBzdXJlIGRvbid0IGFjY2lkZW50YWxseSBpbnRlcmZlcmVcblx0XHQvLyB3aXRoIG90aGVyIGZyYW1ld29ya3MuXG5cdFx0aWYgKFxuXHRcdFx0KCFwYXJlbnRTdGF0ZSB8fCAhcGFyZW50U3RhdGUuc2NvcGVfLnBhcmVudF8pICYmXG5cdFx0XHR0eXBlb2YgcHJvcCAhPT0gXCJzeW1ib2xcIiAmJlxuXHRcdFx0T2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHRhcmdldE9iamVjdCwgcHJvcClcblx0XHQpXG5cdFx0XHRtYXliZUZyZWV6ZShyb290U2NvcGUsIGNoaWxkVmFsdWUpXG5cdH1cbn1cblxuZnVuY3Rpb24gbWF5YmVGcmVlemUoc2NvcGU6IEltbWVyU2NvcGUsIHZhbHVlOiBhbnksIGRlZXAgPSBmYWxzZSkge1xuXHQvLyB3ZSBuZXZlciBmcmVlemUgZm9yIGEgbm9uLXJvb3Qgc2NvcGU7IGFzIGl0IHdvdWxkIHByZXZlbnQgcHJ1bmluZyBmb3IgZHJhZnRzIGluc2lkZSB3cmFwcGluZyBvYmplY3RzXG5cdGlmICghc2NvcGUucGFyZW50XyAmJiBzY29wZS5pbW1lcl8uYXV0b0ZyZWV6ZV8gJiYgc2NvcGUuY2FuQXV0b0ZyZWV6ZV8pIHtcblx0XHRmcmVlemUodmFsdWUsIGRlZXApXG5cdH1cbn1cbiIsICJpbXBvcnQge1xuXHRlYWNoLFxuXHRoYXMsXG5cdGlzLFxuXHRpc0RyYWZ0YWJsZSxcblx0c2hhbGxvd0NvcHksXG5cdGxhdGVzdCxcblx0SW1tZXJCYXNlU3RhdGUsXG5cdEltbWVyU3RhdGUsXG5cdERyYWZ0ZWQsXG5cdEFueU9iamVjdCxcblx0QW55QXJyYXksXG5cdE9iamVjdGlzaCxcblx0Z2V0Q3VycmVudFNjb3BlLFxuXHRnZXRQcm90b3R5cGVPZixcblx0RFJBRlRfU1RBVEUsXG5cdGRpZSxcblx0Y3JlYXRlUHJveHksXG5cdEFyY2hUeXBlLFxuXHRJbW1lclNjb3BlXG59IGZyb20gXCIuLi9pbnRlcm5hbFwiXG5cbmludGVyZmFjZSBQcm94eUJhc2VTdGF0ZSBleHRlbmRzIEltbWVyQmFzZVN0YXRlIHtcblx0YXNzaWduZWRfOiB7XG5cdFx0W3Byb3BlcnR5OiBzdHJpbmddOiBib29sZWFuXG5cdH1cblx0cGFyZW50Xz86IEltbWVyU3RhdGVcblx0cmV2b2tlXygpOiB2b2lkXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJveHlPYmplY3RTdGF0ZSBleHRlbmRzIFByb3h5QmFzZVN0YXRlIHtcblx0dHlwZV86IEFyY2hUeXBlLk9iamVjdFxuXHRiYXNlXzogYW55XG5cdGNvcHlfOiBhbnlcblx0ZHJhZnRfOiBEcmFmdGVkPEFueU9iamVjdCwgUHJveHlPYmplY3RTdGF0ZT5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBQcm94eUFycmF5U3RhdGUgZXh0ZW5kcyBQcm94eUJhc2VTdGF0ZSB7XG5cdHR5cGVfOiBBcmNoVHlwZS5BcnJheVxuXHRiYXNlXzogQW55QXJyYXlcblx0Y29weV86IEFueUFycmF5IHwgbnVsbFxuXHRkcmFmdF86IERyYWZ0ZWQ8QW55QXJyYXksIFByb3h5QXJyYXlTdGF0ZT5cbn1cblxudHlwZSBQcm94eVN0YXRlID0gUHJveHlPYmplY3RTdGF0ZSB8IFByb3h5QXJyYXlTdGF0ZVxuXG4vKipcbiAqIFJldHVybnMgYSBuZXcgZHJhZnQgb2YgdGhlIGBiYXNlYCBvYmplY3QuXG4gKlxuICogVGhlIHNlY29uZCBhcmd1bWVudCBpcyB0aGUgcGFyZW50IGRyYWZ0LXN0YXRlICh1c2VkIGludGVybmFsbHkpLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUHJveHlQcm94eTxUIGV4dGVuZHMgT2JqZWN0aXNoPihcblx0YmFzZTogVCxcblx0cGFyZW50PzogSW1tZXJTdGF0ZVxuKTogRHJhZnRlZDxULCBQcm94eVN0YXRlPiB7XG5cdGNvbnN0IGlzQXJyYXkgPSBBcnJheS5pc0FycmF5KGJhc2UpXG5cdGNvbnN0IHN0YXRlOiBQcm94eVN0YXRlID0ge1xuXHRcdHR5cGVfOiBpc0FycmF5ID8gQXJjaFR5cGUuQXJyYXkgOiAoQXJjaFR5cGUuT2JqZWN0IGFzIGFueSksXG5cdFx0Ly8gVHJhY2sgd2hpY2ggcHJvZHVjZSBjYWxsIHRoaXMgaXMgYXNzb2NpYXRlZCB3aXRoLlxuXHRcdHNjb3BlXzogcGFyZW50ID8gcGFyZW50LnNjb3BlXyA6IGdldEN1cnJlbnRTY29wZSgpISxcblx0XHQvLyBUcnVlIGZvciBib3RoIHNoYWxsb3cgYW5kIGRlZXAgY2hhbmdlcy5cblx0XHRtb2RpZmllZF86IGZhbHNlLFxuXHRcdC8vIFVzZWQgZHVyaW5nIGZpbmFsaXphdGlvbi5cblx0XHRmaW5hbGl6ZWRfOiBmYWxzZSxcblx0XHQvLyBUcmFjayB3aGljaCBwcm9wZXJ0aWVzIGhhdmUgYmVlbiBhc3NpZ25lZCAodHJ1ZSkgb3IgZGVsZXRlZCAoZmFsc2UpLlxuXHRcdGFzc2lnbmVkXzoge30sXG5cdFx0Ly8gVGhlIHBhcmVudCBkcmFmdCBzdGF0ZS5cblx0XHRwYXJlbnRfOiBwYXJlbnQsXG5cdFx0Ly8gVGhlIGJhc2Ugc3RhdGUuXG5cdFx0YmFzZV86IGJhc2UsXG5cdFx0Ly8gVGhlIGJhc2UgcHJveHkuXG5cdFx0ZHJhZnRfOiBudWxsIGFzIGFueSwgLy8gc2V0IGJlbG93XG5cdFx0Ly8gVGhlIGJhc2UgY29weSB3aXRoIGFueSB1cGRhdGVkIHZhbHVlcy5cblx0XHRjb3B5XzogbnVsbCxcblx0XHQvLyBDYWxsZWQgYnkgdGhlIGBwcm9kdWNlYCBmdW5jdGlvbi5cblx0XHRyZXZva2VfOiBudWxsIGFzIGFueSxcblx0XHRpc01hbnVhbF86IGZhbHNlXG5cdH1cblxuXHQvLyB0aGUgdHJhcHMgbXVzdCB0YXJnZXQgc29tZXRoaW5nLCBhIGJpdCBsaWtlIHRoZSAncmVhbCcgYmFzZS5cblx0Ly8gYnV0IGFsc28sIHdlIG5lZWQgdG8gYmUgYWJsZSB0byBkZXRlcm1pbmUgZnJvbSB0aGUgdGFyZ2V0IHdoYXQgdGhlIHJlbGV2YW50IHN0YXRlIGlzXG5cdC8vICh0byBhdm9pZCBjcmVhdGluZyB0cmFwcyBwZXIgaW5zdGFuY2UgdG8gY2FwdHVyZSB0aGUgc3RhdGUgaW4gY2xvc3VyZSxcblx0Ly8gYW5kIHRvIGF2b2lkIGNyZWF0aW5nIHdlaXJkIGhpZGRlbiBwcm9wZXJ0aWVzIGFzIHdlbGwpXG5cdC8vIFNvIHRoZSB0cmljayBpcyB0byB1c2UgJ3N0YXRlJyBhcyB0aGUgYWN0dWFsICd0YXJnZXQnISAoYW5kIG1ha2Ugc3VyZSB3ZSBpbnRlcmNlcHQgZXZlcnl0aGluZylcblx0Ly8gTm90ZSB0aGF0IGluIHRoZSBjYXNlIG9mIGFuIGFycmF5LCB3ZSBwdXQgdGhlIHN0YXRlIGluIGFuIGFycmF5IHRvIGhhdmUgYmV0dGVyIFJlZmxlY3QgZGVmYXVsdHMgb290YlxuXHRsZXQgdGFyZ2V0OiBUID0gc3RhdGUgYXMgYW55XG5cdGxldCB0cmFwczogUHJveHlIYW5kbGVyPG9iamVjdCB8IEFycmF5PGFueT4+ID0gb2JqZWN0VHJhcHNcblx0aWYgKGlzQXJyYXkpIHtcblx0XHR0YXJnZXQgPSBbc3RhdGVdIGFzIGFueVxuXHRcdHRyYXBzID0gYXJyYXlUcmFwc1xuXHR9XG5cblx0Y29uc3Qge3Jldm9rZSwgcHJveHl9ID0gUHJveHkucmV2b2NhYmxlKHRhcmdldCwgdHJhcHMpXG5cdHN0YXRlLmRyYWZ0XyA9IHByb3h5IGFzIGFueVxuXHRzdGF0ZS5yZXZva2VfID0gcmV2b2tlXG5cdHJldHVybiBwcm94eSBhcyBhbnlcbn1cblxuLyoqXG4gKiBPYmplY3QgZHJhZnRzXG4gKi9cbmV4cG9ydCBjb25zdCBvYmplY3RUcmFwczogUHJveHlIYW5kbGVyPFByb3h5U3RhdGU+ID0ge1xuXHRnZXQoc3RhdGUsIHByb3ApIHtcblx0XHRpZiAocHJvcCA9PT0gRFJBRlRfU1RBVEUpIHJldHVybiBzdGF0ZVxuXG5cdFx0Y29uc3Qgc291cmNlID0gbGF0ZXN0KHN0YXRlKVxuXHRcdGlmICghaGFzKHNvdXJjZSwgcHJvcCkpIHtcblx0XHRcdC8vIG5vbi1leGlzdGluZyBvciBub24tb3duIHByb3BlcnR5Li4uXG5cdFx0XHRyZXR1cm4gcmVhZFByb3BGcm9tUHJvdG8oc3RhdGUsIHNvdXJjZSwgcHJvcClcblx0XHR9XG5cdFx0Y29uc3QgdmFsdWUgPSBzb3VyY2VbcHJvcF1cblx0XHRpZiAoc3RhdGUuZmluYWxpemVkXyB8fCAhaXNEcmFmdGFibGUodmFsdWUpKSB7XG5cdFx0XHRyZXR1cm4gdmFsdWVcblx0XHR9XG5cdFx0Ly8gQ2hlY2sgZm9yIGV4aXN0aW5nIGRyYWZ0IGluIG1vZGlmaWVkIHN0YXRlLlxuXHRcdC8vIEFzc2lnbmVkIHZhbHVlcyBhcmUgbmV2ZXIgZHJhZnRlZC4gVGhpcyBjYXRjaGVzIGFueSBkcmFmdHMgd2UgY3JlYXRlZCwgdG9vLlxuXHRcdGlmICh2YWx1ZSA9PT0gcGVlayhzdGF0ZS5iYXNlXywgcHJvcCkpIHtcblx0XHRcdHByZXBhcmVDb3B5KHN0YXRlKVxuXHRcdFx0cmV0dXJuIChzdGF0ZS5jb3B5XyFbcHJvcCBhcyBhbnldID0gY3JlYXRlUHJveHkodmFsdWUsIHN0YXRlKSlcblx0XHR9XG5cdFx0cmV0dXJuIHZhbHVlXG5cdH0sXG5cdGhhcyhzdGF0ZSwgcHJvcCkge1xuXHRcdHJldHVybiBwcm9wIGluIGxhdGVzdChzdGF0ZSlcblx0fSxcblx0b3duS2V5cyhzdGF0ZSkge1xuXHRcdHJldHVybiBSZWZsZWN0Lm93bktleXMobGF0ZXN0KHN0YXRlKSlcblx0fSxcblx0c2V0KFxuXHRcdHN0YXRlOiBQcm94eU9iamVjdFN0YXRlLFxuXHRcdHByb3A6IHN0cmluZyAvKiBzdHJpY3RseSBub3QsIGJ1dCBoZWxwcyBUUyAqLyxcblx0XHR2YWx1ZVxuXHQpIHtcblx0XHRjb25zdCBkZXNjID0gZ2V0RGVzY3JpcHRvckZyb21Qcm90byhsYXRlc3Qoc3RhdGUpLCBwcm9wKVxuXHRcdGlmIChkZXNjPy5zZXQpIHtcblx0XHRcdC8vIHNwZWNpYWwgY2FzZTogaWYgdGhpcyB3cml0ZSBpcyBjYXB0dXJlZCBieSBhIHNldHRlciwgd2UgaGF2ZVxuXHRcdFx0Ly8gdG8gdHJpZ2dlciBpdCB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcblx0XHRcdGRlc2Muc2V0LmNhbGwoc3RhdGUuZHJhZnRfLCB2YWx1ZSlcblx0XHRcdHJldHVybiB0cnVlXG5cdFx0fVxuXHRcdGlmICghc3RhdGUubW9kaWZpZWRfKSB7XG5cdFx0XHQvLyB0aGUgbGFzdCBjaGVjayBpcyBiZWNhdXNlIHdlIG5lZWQgdG8gYmUgYWJsZSB0byBkaXN0aW5ndWlzaCBzZXR0aW5nIGEgbm9uLWV4aXN0aW5nIHRvIHVuZGVmaW5lZCAod2hpY2ggaXMgYSBjaGFuZ2UpXG5cdFx0XHQvLyBmcm9tIHNldHRpbmcgYW4gZXhpc3RpbmcgcHJvcGVydHkgd2l0aCB2YWx1ZSB1bmRlZmluZWQgdG8gdW5kZWZpbmVkICh3aGljaCBpcyBub3QgYSBjaGFuZ2UpXG5cdFx0XHRjb25zdCBjdXJyZW50ID0gcGVlayhsYXRlc3Qoc3RhdGUpLCBwcm9wKVxuXHRcdFx0Ly8gc3BlY2lhbCBjYXNlLCBpZiB3ZSBhc3NpZ25pbmcgdGhlIG9yaWdpbmFsIHZhbHVlIHRvIGEgZHJhZnQsIHdlIGNhbiBpZ25vcmUgdGhlIGFzc2lnbm1lbnRcblx0XHRcdGNvbnN0IGN1cnJlbnRTdGF0ZTogUHJveHlPYmplY3RTdGF0ZSA9IGN1cnJlbnQ/LltEUkFGVF9TVEFURV1cblx0XHRcdGlmIChjdXJyZW50U3RhdGUgJiYgY3VycmVudFN0YXRlLmJhc2VfID09PSB2YWx1ZSkge1xuXHRcdFx0XHRzdGF0ZS5jb3B5XyFbcHJvcF0gPSB2YWx1ZVxuXHRcdFx0XHRzdGF0ZS5hc3NpZ25lZF9bcHJvcF0gPSBmYWxzZVxuXHRcdFx0XHRyZXR1cm4gdHJ1ZVxuXHRcdFx0fVxuXHRcdFx0aWYgKGlzKHZhbHVlLCBjdXJyZW50KSAmJiAodmFsdWUgIT09IHVuZGVmaW5lZCB8fCBoYXMoc3RhdGUuYmFzZV8sIHByb3ApKSlcblx0XHRcdFx0cmV0dXJuIHRydWVcblx0XHRcdHByZXBhcmVDb3B5KHN0YXRlKVxuXHRcdFx0bWFya0NoYW5nZWQoc3RhdGUpXG5cdFx0fVxuXG5cdFx0aWYgKFxuXHRcdFx0KHN0YXRlLmNvcHlfIVtwcm9wXSA9PT0gdmFsdWUgJiZcblx0XHRcdFx0Ly8gc3BlY2lhbCBjYXNlOiBoYW5kbGUgbmV3IHByb3BzIHdpdGggdmFsdWUgJ3VuZGVmaW5lZCdcblx0XHRcdFx0KHZhbHVlICE9PSB1bmRlZmluZWQgfHwgcHJvcCBpbiBzdGF0ZS5jb3B5XykpIHx8XG5cdFx0XHQvLyBzcGVjaWFsIGNhc2U6IE5hTlxuXHRcdFx0KE51bWJlci5pc05hTih2YWx1ZSkgJiYgTnVtYmVyLmlzTmFOKHN0YXRlLmNvcHlfIVtwcm9wXSkpXG5cdFx0KVxuXHRcdFx0cmV0dXJuIHRydWVcblxuXHRcdC8vIEB0cy1pZ25vcmVcblx0XHRzdGF0ZS5jb3B5XyFbcHJvcF0gPSB2YWx1ZVxuXHRcdHN0YXRlLmFzc2lnbmVkX1twcm9wXSA9IHRydWVcblx0XHRyZXR1cm4gdHJ1ZVxuXHR9LFxuXHRkZWxldGVQcm9wZXJ0eShzdGF0ZSwgcHJvcDogc3RyaW5nKSB7XG5cdFx0Ly8gVGhlIGB1bmRlZmluZWRgIGNoZWNrIGlzIGEgZmFzdCBwYXRoIGZvciBwcmUtZXhpc3Rpbmcga2V5cy5cblx0XHRpZiAocGVlayhzdGF0ZS5iYXNlXywgcHJvcCkgIT09IHVuZGVmaW5lZCB8fCBwcm9wIGluIHN0YXRlLmJhc2VfKSB7XG5cdFx0XHRzdGF0ZS5hc3NpZ25lZF9bcHJvcF0gPSBmYWxzZVxuXHRcdFx0cHJlcGFyZUNvcHkoc3RhdGUpXG5cdFx0XHRtYXJrQ2hhbmdlZChzdGF0ZSlcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gaWYgYW4gb3JpZ2luYWxseSBub3QgYXNzaWduZWQgcHJvcGVydHkgd2FzIGRlbGV0ZWRcblx0XHRcdGRlbGV0ZSBzdGF0ZS5hc3NpZ25lZF9bcHJvcF1cblx0XHR9XG5cdFx0aWYgKHN0YXRlLmNvcHlfKSB7XG5cdFx0XHRkZWxldGUgc3RhdGUuY29weV9bcHJvcF1cblx0XHR9XG5cdFx0cmV0dXJuIHRydWVcblx0fSxcblx0Ly8gTm90ZTogV2UgbmV2ZXIgY29lcmNlIGBkZXNjLnZhbHVlYCBpbnRvIGFuIEltbWVyIGRyYWZ0LCBiZWNhdXNlIHdlIGNhbid0IG1ha2Vcblx0Ly8gdGhlIHNhbWUgZ3VhcmFudGVlIGluIEVTNSBtb2RlLlxuXHRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc3RhdGUsIHByb3ApIHtcblx0XHRjb25zdCBvd25lciA9IGxhdGVzdChzdGF0ZSlcblx0XHRjb25zdCBkZXNjID0gUmVmbGVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob3duZXIsIHByb3ApXG5cdFx0aWYgKCFkZXNjKSByZXR1cm4gZGVzY1xuXHRcdHJldHVybiB7XG5cdFx0XHR3cml0YWJsZTogdHJ1ZSxcblx0XHRcdGNvbmZpZ3VyYWJsZTogc3RhdGUudHlwZV8gIT09IEFyY2hUeXBlLkFycmF5IHx8IHByb3AgIT09IFwibGVuZ3RoXCIsXG5cdFx0XHRlbnVtZXJhYmxlOiBkZXNjLmVudW1lcmFibGUsXG5cdFx0XHR2YWx1ZTogb3duZXJbcHJvcF1cblx0XHR9XG5cdH0sXG5cdGRlZmluZVByb3BlcnR5KCkge1xuXHRcdGRpZSgxMSlcblx0fSxcblx0Z2V0UHJvdG90eXBlT2Yoc3RhdGUpIHtcblx0XHRyZXR1cm4gZ2V0UHJvdG90eXBlT2Yoc3RhdGUuYmFzZV8pXG5cdH0sXG5cdHNldFByb3RvdHlwZU9mKCkge1xuXHRcdGRpZSgxMilcblx0fVxufVxuXG4vKipcbiAqIEFycmF5IGRyYWZ0c1xuICovXG5cbmNvbnN0IGFycmF5VHJhcHM6IFByb3h5SGFuZGxlcjxbUHJveHlBcnJheVN0YXRlXT4gPSB7fVxuZWFjaChvYmplY3RUcmFwcywgKGtleSwgZm4pID0+IHtcblx0Ly8gQHRzLWlnbm9yZVxuXHRhcnJheVRyYXBzW2tleV0gPSBmdW5jdGlvbigpIHtcblx0XHRhcmd1bWVudHNbMF0gPSBhcmd1bWVudHNbMF1bMF1cblx0XHRyZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKVxuXHR9XG59KVxuYXJyYXlUcmFwcy5kZWxldGVQcm9wZXJ0eSA9IGZ1bmN0aW9uKHN0YXRlLCBwcm9wKSB7XG5cdGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgaXNOYU4ocGFyc2VJbnQocHJvcCBhcyBhbnkpKSlcblx0XHRkaWUoMTMpXG5cdC8vIEB0cy1pZ25vcmVcblx0cmV0dXJuIGFycmF5VHJhcHMuc2V0IS5jYWxsKHRoaXMsIHN0YXRlLCBwcm9wLCB1bmRlZmluZWQpXG59XG5hcnJheVRyYXBzLnNldCA9IGZ1bmN0aW9uKHN0YXRlLCBwcm9wLCB2YWx1ZSkge1xuXHRpZiAoXG5cdFx0cHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmXG5cdFx0cHJvcCAhPT0gXCJsZW5ndGhcIiAmJlxuXHRcdGlzTmFOKHBhcnNlSW50KHByb3AgYXMgYW55KSlcblx0KVxuXHRcdGRpZSgxNClcblx0cmV0dXJuIG9iamVjdFRyYXBzLnNldCEuY2FsbCh0aGlzLCBzdGF0ZVswXSwgcHJvcCwgdmFsdWUsIHN0YXRlWzBdKVxufVxuXG4vLyBBY2Nlc3MgYSBwcm9wZXJ0eSB3aXRob3V0IGNyZWF0aW5nIGFuIEltbWVyIGRyYWZ0LlxuZnVuY3Rpb24gcGVlayhkcmFmdDogRHJhZnRlZCwgcHJvcDogUHJvcGVydHlLZXkpIHtcblx0Y29uc3Qgc3RhdGUgPSBkcmFmdFtEUkFGVF9TVEFURV1cblx0Y29uc3Qgc291cmNlID0gc3RhdGUgPyBsYXRlc3Qoc3RhdGUpIDogZHJhZnRcblx0cmV0dXJuIHNvdXJjZVtwcm9wXVxufVxuXG5mdW5jdGlvbiByZWFkUHJvcEZyb21Qcm90byhzdGF0ZTogSW1tZXJTdGF0ZSwgc291cmNlOiBhbnksIHByb3A6IFByb3BlcnR5S2V5KSB7XG5cdGNvbnN0IGRlc2MgPSBnZXREZXNjcmlwdG9yRnJvbVByb3RvKHNvdXJjZSwgcHJvcClcblx0cmV0dXJuIGRlc2Ncblx0XHQ/IGB2YWx1ZWAgaW4gZGVzY1xuXHRcdFx0PyBkZXNjLnZhbHVlXG5cdFx0XHQ6IC8vIFRoaXMgaXMgYSB2ZXJ5IHNwZWNpYWwgY2FzZSwgaWYgdGhlIHByb3AgaXMgYSBnZXR0ZXIgZGVmaW5lZCBieSB0aGVcblx0XHRcdCAgLy8gcHJvdG90eXBlLCB3ZSBzaG91bGQgaW52b2tlIGl0IHdpdGggdGhlIGRyYWZ0IGFzIGNvbnRleHQhXG5cdFx0XHQgIGRlc2MuZ2V0Py5jYWxsKHN0YXRlLmRyYWZ0Xylcblx0XHQ6IHVuZGVmaW5lZFxufVxuXG5mdW5jdGlvbiBnZXREZXNjcmlwdG9yRnJvbVByb3RvKFxuXHRzb3VyY2U6IGFueSxcblx0cHJvcDogUHJvcGVydHlLZXlcbik6IFByb3BlcnR5RGVzY3JpcHRvciB8IHVuZGVmaW5lZCB7XG5cdC8vICdpbicgY2hlY2tzIHByb3RvIVxuXHRpZiAoIShwcm9wIGluIHNvdXJjZSkpIHJldHVybiB1bmRlZmluZWRcblx0bGV0IHByb3RvID0gZ2V0UHJvdG90eXBlT2Yoc291cmNlKVxuXHR3aGlsZSAocHJvdG8pIHtcblx0XHRjb25zdCBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihwcm90bywgcHJvcClcblx0XHRpZiAoZGVzYykgcmV0dXJuIGRlc2Ncblx0XHRwcm90byA9IGdldFByb3RvdHlwZU9mKHByb3RvKVxuXHR9XG5cdHJldHVybiB1bmRlZmluZWRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1hcmtDaGFuZ2VkKHN0YXRlOiBJbW1lclN0YXRlKSB7XG5cdGlmICghc3RhdGUubW9kaWZpZWRfKSB7XG5cdFx0c3RhdGUubW9kaWZpZWRfID0gdHJ1ZVxuXHRcdGlmIChzdGF0ZS5wYXJlbnRfKSB7XG5cdFx0XHRtYXJrQ2hhbmdlZChzdGF0ZS5wYXJlbnRfKVxuXHRcdH1cblx0fVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJlcGFyZUNvcHkoc3RhdGU6IHtcblx0YmFzZV86IGFueVxuXHRjb3B5XzogYW55XG5cdHNjb3BlXzogSW1tZXJTY29wZVxufSkge1xuXHRpZiAoIXN0YXRlLmNvcHlfKSB7XG5cdFx0c3RhdGUuY29weV8gPSBzaGFsbG93Q29weShcblx0XHRcdHN0YXRlLmJhc2VfLFxuXHRcdFx0c3RhdGUuc2NvcGVfLmltbWVyXy51c2VTdHJpY3RTaGFsbG93Q29weV9cblx0XHQpXG5cdH1cbn1cbiIsICJpbXBvcnQge1xuXHRJUHJvZHVjZVdpdGhQYXRjaGVzLFxuXHRJUHJvZHVjZSxcblx0SW1tZXJTdGF0ZSxcblx0RHJhZnRlZCxcblx0aXNEcmFmdGFibGUsXG5cdHByb2Nlc3NSZXN1bHQsXG5cdFBhdGNoLFxuXHRPYmplY3Rpc2gsXG5cdERSQUZUX1NUQVRFLFxuXHREcmFmdCxcblx0UGF0Y2hMaXN0ZW5lcixcblx0aXNEcmFmdCxcblx0aXNNYXAsXG5cdGlzU2V0LFxuXHRjcmVhdGVQcm94eVByb3h5LFxuXHRnZXRQbHVnaW4sXG5cdGRpZSxcblx0ZW50ZXJTY29wZSxcblx0cmV2b2tlU2NvcGUsXG5cdGxlYXZlU2NvcGUsXG5cdHVzZVBhdGNoZXNJblNjb3BlLFxuXHRnZXRDdXJyZW50U2NvcGUsXG5cdE5PVEhJTkcsXG5cdGZyZWV6ZSxcblx0Y3VycmVudFxufSBmcm9tIFwiLi4vaW50ZXJuYWxcIlxuXG5pbnRlcmZhY2UgUHJvZHVjZXJzRm5zIHtcblx0cHJvZHVjZTogSVByb2R1Y2Vcblx0cHJvZHVjZVdpdGhQYXRjaGVzOiBJUHJvZHVjZVdpdGhQYXRjaGVzXG59XG5cbmV4cG9ydCB0eXBlIFN0cmljdE1vZGUgPSBib29sZWFuIHwgXCJjbGFzc19vbmx5XCI7XG5cbmV4cG9ydCBjbGFzcyBJbW1lciBpbXBsZW1lbnRzIFByb2R1Y2Vyc0ZucyB7XG5cdGF1dG9GcmVlemVfOiBib29sZWFuID0gdHJ1ZVxuXHR1c2VTdHJpY3RTaGFsbG93Q29weV86IFN0cmljdE1vZGUgPSBmYWxzZVxuXG5cdGNvbnN0cnVjdG9yKGNvbmZpZz86IHtcblx0XHRhdXRvRnJlZXplPzogYm9vbGVhblxuXHRcdHVzZVN0cmljdFNoYWxsb3dDb3B5PzogU3RyaWN0TW9kZVxuXHR9KSB7XG5cdFx0aWYgKHR5cGVvZiBjb25maWc/LmF1dG9GcmVlemUgPT09IFwiYm9vbGVhblwiKVxuXHRcdFx0dGhpcy5zZXRBdXRvRnJlZXplKGNvbmZpZyEuYXV0b0ZyZWV6ZSlcblx0XHRpZiAodHlwZW9mIGNvbmZpZz8udXNlU3RyaWN0U2hhbGxvd0NvcHkgPT09IFwiYm9vbGVhblwiKVxuXHRcdFx0dGhpcy5zZXRVc2VTdHJpY3RTaGFsbG93Q29weShjb25maWchLnVzZVN0cmljdFNoYWxsb3dDb3B5KVxuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBgcHJvZHVjZWAgZnVuY3Rpb24gdGFrZXMgYSB2YWx1ZSBhbmQgYSBcInJlY2lwZSBmdW5jdGlvblwiICh3aG9zZVxuXHQgKiByZXR1cm4gdmFsdWUgb2Z0ZW4gZGVwZW5kcyBvbiB0aGUgYmFzZSBzdGF0ZSkuIFRoZSByZWNpcGUgZnVuY3Rpb24gaXNcblx0ICogZnJlZSB0byBtdXRhdGUgaXRzIGZpcnN0IGFyZ3VtZW50IGhvd2V2ZXIgaXQgd2FudHMuIEFsbCBtdXRhdGlvbnMgYXJlXG5cdCAqIG9ubHkgZXZlciBhcHBsaWVkIHRvIGEgX19jb3B5X18gb2YgdGhlIGJhc2Ugc3RhdGUuXG5cdCAqXG5cdCAqIFBhc3Mgb25seSBhIGZ1bmN0aW9uIHRvIGNyZWF0ZSBhIFwiY3VycmllZCBwcm9kdWNlclwiIHdoaWNoIHJlbGlldmVzIHlvdVxuXHQgKiBmcm9tIHBhc3NpbmcgdGhlIHJlY2lwZSBmdW5jdGlvbiBldmVyeSB0aW1lLlxuXHQgKlxuXHQgKiBPbmx5IHBsYWluIG9iamVjdHMgYW5kIGFycmF5cyBhcmUgbWFkZSBtdXRhYmxlLiBBbGwgb3RoZXIgb2JqZWN0cyBhcmVcblx0ICogY29uc2lkZXJlZCB1bmNvcHlhYmxlLlxuXHQgKlxuXHQgKiBOb3RlOiBUaGlzIGZ1bmN0aW9uIGlzIF9fYm91bmRfXyB0byBpdHMgYEltbWVyYCBpbnN0YW5jZS5cblx0ICpcblx0ICogQHBhcmFtIHthbnl9IGJhc2UgLSB0aGUgaW5pdGlhbCBzdGF0ZVxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWNpcGUgLSBmdW5jdGlvbiB0aGF0IHJlY2VpdmVzIGEgcHJveHkgb2YgdGhlIGJhc2Ugc3RhdGUgYXMgZmlyc3QgYXJndW1lbnQgYW5kIHdoaWNoIGNhbiBiZSBmcmVlbHkgbW9kaWZpZWRcblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gcGF0Y2hMaXN0ZW5lciAtIG9wdGlvbmFsIGZ1bmN0aW9uIHRoYXQgd2lsbCBiZSBjYWxsZWQgd2l0aCBhbGwgdGhlIHBhdGNoZXMgcHJvZHVjZWQgaGVyZVxuXHQgKiBAcmV0dXJucyB7YW55fSBhIG5ldyBzdGF0ZSwgb3IgdGhlIGluaXRpYWwgc3RhdGUgaWYgbm90aGluZyB3YXMgbW9kaWZpZWRcblx0ICovXG5cdHByb2R1Y2U6IElQcm9kdWNlID0gKGJhc2U6IGFueSwgcmVjaXBlPzogYW55LCBwYXRjaExpc3RlbmVyPzogYW55KSA9PiB7XG5cdFx0Ly8gY3VycmllZCBpbnZvY2F0aW9uXG5cdFx0aWYgKHR5cGVvZiBiYXNlID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIHJlY2lwZSAhPT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHRjb25zdCBkZWZhdWx0QmFzZSA9IHJlY2lwZVxuXHRcdFx0cmVjaXBlID0gYmFzZVxuXG5cdFx0XHRjb25zdCBzZWxmID0gdGhpc1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uIGN1cnJpZWRQcm9kdWNlKFxuXHRcdFx0XHR0aGlzOiBhbnksXG5cdFx0XHRcdGJhc2UgPSBkZWZhdWx0QmFzZSxcblx0XHRcdFx0Li4uYXJnczogYW55W11cblx0XHRcdCkge1xuXHRcdFx0XHRyZXR1cm4gc2VsZi5wcm9kdWNlKGJhc2UsIChkcmFmdDogRHJhZnRlZCkgPT4gcmVjaXBlLmNhbGwodGhpcywgZHJhZnQsIC4uLmFyZ3MpKSAvLyBwcmV0dGllci1pZ25vcmVcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAodHlwZW9mIHJlY2lwZSAhPT0gXCJmdW5jdGlvblwiKSBkaWUoNilcblx0XHRpZiAocGF0Y2hMaXN0ZW5lciAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBwYXRjaExpc3RlbmVyICE9PSBcImZ1bmN0aW9uXCIpXG5cdFx0XHRkaWUoNylcblxuXHRcdGxldCByZXN1bHRcblxuXHRcdC8vIE9ubHkgcGxhaW4gb2JqZWN0cywgYXJyYXlzLCBhbmQgXCJpbW1lcmFibGUgY2xhc3Nlc1wiIGFyZSBkcmFmdGVkLlxuXHRcdGlmIChpc0RyYWZ0YWJsZShiYXNlKSkge1xuXHRcdFx0Y29uc3Qgc2NvcGUgPSBlbnRlclNjb3BlKHRoaXMpXG5cdFx0XHRjb25zdCBwcm94eSA9IGNyZWF0ZVByb3h5KGJhc2UsIHVuZGVmaW5lZClcblx0XHRcdGxldCBoYXNFcnJvciA9IHRydWVcblx0XHRcdHRyeSB7XG5cdFx0XHRcdHJlc3VsdCA9IHJlY2lwZShwcm94eSlcblx0XHRcdFx0aGFzRXJyb3IgPSBmYWxzZVxuXHRcdFx0fSBmaW5hbGx5IHtcblx0XHRcdFx0Ly8gZmluYWxseSBpbnN0ZWFkIG9mIGNhdGNoICsgcmV0aHJvdyBiZXR0ZXIgcHJlc2VydmVzIG9yaWdpbmFsIHN0YWNrXG5cdFx0XHRcdGlmIChoYXNFcnJvcikgcmV2b2tlU2NvcGUoc2NvcGUpXG5cdFx0XHRcdGVsc2UgbGVhdmVTY29wZShzY29wZSlcblx0XHRcdH1cblx0XHRcdHVzZVBhdGNoZXNJblNjb3BlKHNjb3BlLCBwYXRjaExpc3RlbmVyKVxuXHRcdFx0cmV0dXJuIHByb2Nlc3NSZXN1bHQocmVzdWx0LCBzY29wZSlcblx0XHR9IGVsc2UgaWYgKCFiYXNlIHx8IHR5cGVvZiBiYXNlICE9PSBcIm9iamVjdFwiKSB7XG5cdFx0XHRyZXN1bHQgPSByZWNpcGUoYmFzZSlcblx0XHRcdGlmIChyZXN1bHQgPT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gYmFzZVxuXHRcdFx0aWYgKHJlc3VsdCA9PT0gTk9USElORykgcmVzdWx0ID0gdW5kZWZpbmVkXG5cdFx0XHRpZiAodGhpcy5hdXRvRnJlZXplXykgZnJlZXplKHJlc3VsdCwgdHJ1ZSlcblx0XHRcdGlmIChwYXRjaExpc3RlbmVyKSB7XG5cdFx0XHRcdGNvbnN0IHA6IFBhdGNoW10gPSBbXVxuXHRcdFx0XHRjb25zdCBpcDogUGF0Y2hbXSA9IFtdXG5cdFx0XHRcdGdldFBsdWdpbihcIlBhdGNoZXNcIikuZ2VuZXJhdGVSZXBsYWNlbWVudFBhdGNoZXNfKGJhc2UsIHJlc3VsdCwgcCwgaXApXG5cdFx0XHRcdHBhdGNoTGlzdGVuZXIocCwgaXApXG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gcmVzdWx0XG5cdFx0fSBlbHNlIGRpZSgxLCBiYXNlKVxuXHR9XG5cblx0cHJvZHVjZVdpdGhQYXRjaGVzOiBJUHJvZHVjZVdpdGhQYXRjaGVzID0gKGJhc2U6IGFueSwgcmVjaXBlPzogYW55KTogYW55ID0+IHtcblx0XHQvLyBjdXJyaWVkIGludm9jYXRpb25cblx0XHRpZiAodHlwZW9mIGJhc2UgPT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0cmV0dXJuIChzdGF0ZTogYW55LCAuLi5hcmdzOiBhbnlbXSkgPT5cblx0XHRcdFx0dGhpcy5wcm9kdWNlV2l0aFBhdGNoZXMoc3RhdGUsIChkcmFmdDogYW55KSA9PiBiYXNlKGRyYWZ0LCAuLi5hcmdzKSlcblx0XHR9XG5cblx0XHRsZXQgcGF0Y2hlczogUGF0Y2hbXSwgaW52ZXJzZVBhdGNoZXM6IFBhdGNoW11cblx0XHRjb25zdCByZXN1bHQgPSB0aGlzLnByb2R1Y2UoYmFzZSwgcmVjaXBlLCAocDogUGF0Y2hbXSwgaXA6IFBhdGNoW10pID0+IHtcblx0XHRcdHBhdGNoZXMgPSBwXG5cdFx0XHRpbnZlcnNlUGF0Y2hlcyA9IGlwXG5cdFx0fSlcblx0XHRyZXR1cm4gW3Jlc3VsdCwgcGF0Y2hlcyEsIGludmVyc2VQYXRjaGVzIV1cblx0fVxuXG5cdGNyZWF0ZURyYWZ0PFQgZXh0ZW5kcyBPYmplY3Rpc2g+KGJhc2U6IFQpOiBEcmFmdDxUPiB7XG5cdFx0aWYgKCFpc0RyYWZ0YWJsZShiYXNlKSkgZGllKDgpXG5cdFx0aWYgKGlzRHJhZnQoYmFzZSkpIGJhc2UgPSBjdXJyZW50KGJhc2UpXG5cdFx0Y29uc3Qgc2NvcGUgPSBlbnRlclNjb3BlKHRoaXMpXG5cdFx0Y29uc3QgcHJveHkgPSBjcmVhdGVQcm94eShiYXNlLCB1bmRlZmluZWQpXG5cdFx0cHJveHlbRFJBRlRfU1RBVEVdLmlzTWFudWFsXyA9IHRydWVcblx0XHRsZWF2ZVNjb3BlKHNjb3BlKVxuXHRcdHJldHVybiBwcm94eSBhcyBhbnlcblx0fVxuXG5cdGZpbmlzaERyYWZ0PEQgZXh0ZW5kcyBEcmFmdDxhbnk+Pihcblx0XHRkcmFmdDogRCxcblx0XHRwYXRjaExpc3RlbmVyPzogUGF0Y2hMaXN0ZW5lclxuXHQpOiBEIGV4dGVuZHMgRHJhZnQ8aW5mZXIgVD4gPyBUIDogbmV2ZXIge1xuXHRcdGNvbnN0IHN0YXRlOiBJbW1lclN0YXRlID0gZHJhZnQgJiYgKGRyYWZ0IGFzIGFueSlbRFJBRlRfU1RBVEVdXG5cdFx0aWYgKCFzdGF0ZSB8fCAhc3RhdGUuaXNNYW51YWxfKSBkaWUoOSlcblx0XHRjb25zdCB7c2NvcGVfOiBzY29wZX0gPSBzdGF0ZVxuXHRcdHVzZVBhdGNoZXNJblNjb3BlKHNjb3BlLCBwYXRjaExpc3RlbmVyKVxuXHRcdHJldHVybiBwcm9jZXNzUmVzdWx0KHVuZGVmaW5lZCwgc2NvcGUpXG5cdH1cblxuXHQvKipcblx0ICogUGFzcyB0cnVlIHRvIGF1dG9tYXRpY2FsbHkgZnJlZXplIGFsbCBjb3BpZXMgY3JlYXRlZCBieSBJbW1lci5cblx0ICpcblx0ICogQnkgZGVmYXVsdCwgYXV0by1mcmVlemluZyBpcyBlbmFibGVkLlxuXHQgKi9cblx0c2V0QXV0b0ZyZWV6ZSh2YWx1ZTogYm9vbGVhbikge1xuXHRcdHRoaXMuYXV0b0ZyZWV6ZV8gPSB2YWx1ZVxuXHR9XG5cblx0LyoqXG5cdCAqIFBhc3MgdHJ1ZSB0byBlbmFibGUgc3RyaWN0IHNoYWxsb3cgY29weS5cblx0ICpcblx0ICogQnkgZGVmYXVsdCwgaW1tZXIgZG9lcyBub3QgY29weSB0aGUgb2JqZWN0IGRlc2NyaXB0b3JzIHN1Y2ggYXMgZ2V0dGVyLCBzZXR0ZXIgYW5kIG5vbi1lbnVtcmFibGUgcHJvcGVydGllcy5cblx0ICovXG5cdHNldFVzZVN0cmljdFNoYWxsb3dDb3B5KHZhbHVlOiBTdHJpY3RNb2RlKSB7XG5cdFx0dGhpcy51c2VTdHJpY3RTaGFsbG93Q29weV8gPSB2YWx1ZVxuXHR9XG5cblx0YXBwbHlQYXRjaGVzPFQgZXh0ZW5kcyBPYmplY3Rpc2g+KGJhc2U6IFQsIHBhdGNoZXM6IHJlYWRvbmx5IFBhdGNoW10pOiBUIHtcblx0XHQvLyBJZiBhIHBhdGNoIHJlcGxhY2VzIHRoZSBlbnRpcmUgc3RhdGUsIHRha2UgdGhhdCByZXBsYWNlbWVudCBhcyBiYXNlXG5cdFx0Ly8gYmVmb3JlIGFwcGx5aW5nIHBhdGNoZXNcblx0XHRsZXQgaTogbnVtYmVyXG5cdFx0Zm9yIChpID0gcGF0Y2hlcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuXHRcdFx0Y29uc3QgcGF0Y2ggPSBwYXRjaGVzW2ldXG5cdFx0XHRpZiAocGF0Y2gucGF0aC5sZW5ndGggPT09IDAgJiYgcGF0Y2gub3AgPT09IFwicmVwbGFjZVwiKSB7XG5cdFx0XHRcdGJhc2UgPSBwYXRjaC52YWx1ZVxuXHRcdFx0XHRicmVha1xuXHRcdFx0fVxuXHRcdH1cblx0XHQvLyBJZiB0aGVyZSB3YXMgYSBwYXRjaCB0aGF0IHJlcGxhY2VkIHRoZSBlbnRpcmUgc3RhdGUsIHN0YXJ0IGZyb20gdGhlXG5cdFx0Ly8gcGF0Y2ggYWZ0ZXIgdGhhdC5cblx0XHRpZiAoaSA+IC0xKSB7XG5cdFx0XHRwYXRjaGVzID0gcGF0Y2hlcy5zbGljZShpICsgMSlcblx0XHR9XG5cblx0XHRjb25zdCBhcHBseVBhdGNoZXNJbXBsID0gZ2V0UGx1Z2luKFwiUGF0Y2hlc1wiKS5hcHBseVBhdGNoZXNfXG5cdFx0aWYgKGlzRHJhZnQoYmFzZSkpIHtcblx0XHRcdC8vIE4uQjogbmV2ZXIgaGl0cyBpZiBzb21lIHBhdGNoIGEgcmVwbGFjZW1lbnQsIHBhdGNoZXMgYXJlIG5ldmVyIGRyYWZ0c1xuXHRcdFx0cmV0dXJuIGFwcGx5UGF0Y2hlc0ltcGwoYmFzZSwgcGF0Y2hlcylcblx0XHR9XG5cdFx0Ly8gT3RoZXJ3aXNlLCBwcm9kdWNlIGEgY29weSBvZiB0aGUgYmFzZSBzdGF0ZS5cblx0XHRyZXR1cm4gdGhpcy5wcm9kdWNlKGJhc2UsIChkcmFmdDogRHJhZnRlZCkgPT5cblx0XHRcdGFwcGx5UGF0Y2hlc0ltcGwoZHJhZnQsIHBhdGNoZXMpXG5cdFx0KVxuXHR9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQcm94eTxUIGV4dGVuZHMgT2JqZWN0aXNoPihcblx0dmFsdWU6IFQsXG5cdHBhcmVudD86IEltbWVyU3RhdGVcbik6IERyYWZ0ZWQ8VCwgSW1tZXJTdGF0ZT4ge1xuXHQvLyBwcmVjb25kaXRpb246IGNyZWF0ZVByb3h5IHNob3VsZCBiZSBndWFyZGVkIGJ5IGlzRHJhZnRhYmxlLCBzbyB3ZSBrbm93IHdlIGNhbiBzYWZlbHkgZHJhZnRcblx0Y29uc3QgZHJhZnQ6IERyYWZ0ZWQgPSBpc01hcCh2YWx1ZSlcblx0XHQ/IGdldFBsdWdpbihcIk1hcFNldFwiKS5wcm94eU1hcF8odmFsdWUsIHBhcmVudClcblx0XHQ6IGlzU2V0KHZhbHVlKVxuXHRcdD8gZ2V0UGx1Z2luKFwiTWFwU2V0XCIpLnByb3h5U2V0Xyh2YWx1ZSwgcGFyZW50KVxuXHRcdDogY3JlYXRlUHJveHlQcm94eSh2YWx1ZSwgcGFyZW50KVxuXG5cdGNvbnN0IHNjb3BlID0gcGFyZW50ID8gcGFyZW50LnNjb3BlXyA6IGdldEN1cnJlbnRTY29wZSgpXG5cdHNjb3BlLmRyYWZ0c18ucHVzaChkcmFmdClcblx0cmV0dXJuIGRyYWZ0XG59XG4iLCAiaW1wb3J0IHtcblx0ZGllLFxuXHRpc0RyYWZ0LFxuXHRzaGFsbG93Q29weSxcblx0ZWFjaCxcblx0RFJBRlRfU1RBVEUsXG5cdHNldCxcblx0SW1tZXJTdGF0ZSxcblx0aXNEcmFmdGFibGUsXG5cdGlzRnJvemVuXG59IGZyb20gXCIuLi9pbnRlcm5hbFwiXG5cbi8qKiBUYWtlcyBhIHNuYXBzaG90IG9mIHRoZSBjdXJyZW50IHN0YXRlIG9mIGEgZHJhZnQgYW5kIGZpbmFsaXplcyBpdCAoYnV0IHdpdGhvdXQgZnJlZXppbmcpLiBUaGlzIGlzIGEgZ3JlYXQgdXRpbGl0eSB0byBwcmludCB0aGUgY3VycmVudCBzdGF0ZSBkdXJpbmcgZGVidWdnaW5nIChubyBQcm94aWVzIGluIHRoZSB3YXkpLiBUaGUgb3V0cHV0IG9mIGN1cnJlbnQgY2FuIGFsc28gYmUgc2FmZWx5IGxlYWtlZCBvdXRzaWRlIHRoZSBwcm9kdWNlci4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjdXJyZW50PFQ+KHZhbHVlOiBUKTogVFxuZXhwb3J0IGZ1bmN0aW9uIGN1cnJlbnQodmFsdWU6IGFueSk6IGFueSB7XG5cdGlmICghaXNEcmFmdCh2YWx1ZSkpIGRpZSgxMCwgdmFsdWUpXG5cdHJldHVybiBjdXJyZW50SW1wbCh2YWx1ZSlcbn1cblxuZnVuY3Rpb24gY3VycmVudEltcGwodmFsdWU6IGFueSk6IGFueSB7XG5cdGlmICghaXNEcmFmdGFibGUodmFsdWUpIHx8IGlzRnJvemVuKHZhbHVlKSkgcmV0dXJuIHZhbHVlXG5cdGNvbnN0IHN0YXRlOiBJbW1lclN0YXRlIHwgdW5kZWZpbmVkID0gdmFsdWVbRFJBRlRfU1RBVEVdXG5cdGxldCBjb3B5OiBhbnlcblx0aWYgKHN0YXRlKSB7XG5cdFx0aWYgKCFzdGF0ZS5tb2RpZmllZF8pIHJldHVybiBzdGF0ZS5iYXNlX1xuXHRcdC8vIE9wdGltaXphdGlvbjogYXZvaWQgZ2VuZXJhdGluZyBuZXcgZHJhZnRzIGR1cmluZyBjb3B5aW5nXG5cdFx0c3RhdGUuZmluYWxpemVkXyA9IHRydWVcblx0XHRjb3B5ID0gc2hhbGxvd0NvcHkodmFsdWUsIHN0YXRlLnNjb3BlXy5pbW1lcl8udXNlU3RyaWN0U2hhbGxvd0NvcHlfKVxuXHR9IGVsc2Uge1xuXHRcdGNvcHkgPSBzaGFsbG93Q29weSh2YWx1ZSwgdHJ1ZSlcblx0fVxuXHQvLyByZWN1cnNlXG5cdGVhY2goY29weSwgKGtleSwgY2hpbGRWYWx1ZSkgPT4ge1xuXHRcdHNldChjb3B5LCBrZXksIGN1cnJlbnRJbXBsKGNoaWxkVmFsdWUpKVxuXHR9KVxuXHRpZiAoc3RhdGUpIHtcblx0XHRzdGF0ZS5maW5hbGl6ZWRfID0gZmFsc2Vcblx0fVxuXHRyZXR1cm4gY29weVxufVxuIiwgImltcG9ydCB7aW1tZXJhYmxlfSBmcm9tIFwiLi4vaW1tZXJcIlxuaW1wb3J0IHtcblx0SW1tZXJTdGF0ZSxcblx0UGF0Y2gsXG5cdFNldFN0YXRlLFxuXHRQcm94eUFycmF5U3RhdGUsXG5cdE1hcFN0YXRlLFxuXHRQcm94eU9iamVjdFN0YXRlLFxuXHRQYXRjaFBhdGgsXG5cdGdldCxcblx0ZWFjaCxcblx0aGFzLFxuXHRnZXRBcmNodHlwZSxcblx0Z2V0UHJvdG90eXBlT2YsXG5cdGlzU2V0LFxuXHRpc01hcCxcblx0bG9hZFBsdWdpbixcblx0QXJjaFR5cGUsXG5cdGRpZSxcblx0aXNEcmFmdCxcblx0aXNEcmFmdGFibGUsXG5cdE5PVEhJTkcsXG5cdGVycm9yc1xufSBmcm9tIFwiLi4vaW50ZXJuYWxcIlxuXG5leHBvcnQgZnVuY3Rpb24gZW5hYmxlUGF0Y2hlcygpIHtcblx0Y29uc3QgZXJyb3JPZmZzZXQgPSAxNlxuXHRpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG5cdFx0ZXJyb3JzLnB1c2goXG5cdFx0XHQnU2V0cyBjYW5ub3QgaGF2ZSBcInJlcGxhY2VcIiBwYXRjaGVzLicsXG5cdFx0XHRmdW5jdGlvbihvcDogc3RyaW5nKSB7XG5cdFx0XHRcdHJldHVybiBcIlVuc3VwcG9ydGVkIHBhdGNoIG9wZXJhdGlvbjogXCIgKyBvcFxuXHRcdFx0fSxcblx0XHRcdGZ1bmN0aW9uKHBhdGg6IHN0cmluZykge1xuXHRcdFx0XHRyZXR1cm4gXCJDYW5ub3QgYXBwbHkgcGF0Y2gsIHBhdGggZG9lc24ndCByZXNvbHZlOiBcIiArIHBhdGhcblx0XHRcdH0sXG5cdFx0XHRcIlBhdGNoaW5nIHJlc2VydmVkIGF0dHJpYnV0ZXMgbGlrZSBfX3Byb3RvX18sIHByb3RvdHlwZSBhbmQgY29uc3RydWN0b3IgaXMgbm90IGFsbG93ZWRcIlxuXHRcdClcblx0fVxuXG5cdGNvbnN0IFJFUExBQ0UgPSBcInJlcGxhY2VcIlxuXHRjb25zdCBBREQgPSBcImFkZFwiXG5cdGNvbnN0IFJFTU9WRSA9IFwicmVtb3ZlXCJcblxuXHRmdW5jdGlvbiBnZW5lcmF0ZVBhdGNoZXNfKFxuXHRcdHN0YXRlOiBJbW1lclN0YXRlLFxuXHRcdGJhc2VQYXRoOiBQYXRjaFBhdGgsXG5cdFx0cGF0Y2hlczogUGF0Y2hbXSxcblx0XHRpbnZlcnNlUGF0Y2hlczogUGF0Y2hbXVxuXHQpOiB2b2lkIHtcblx0XHRzd2l0Y2ggKHN0YXRlLnR5cGVfKSB7XG5cdFx0XHRjYXNlIEFyY2hUeXBlLk9iamVjdDpcblx0XHRcdGNhc2UgQXJjaFR5cGUuTWFwOlxuXHRcdFx0XHRyZXR1cm4gZ2VuZXJhdGVQYXRjaGVzRnJvbUFzc2lnbmVkKFxuXHRcdFx0XHRcdHN0YXRlLFxuXHRcdFx0XHRcdGJhc2VQYXRoLFxuXHRcdFx0XHRcdHBhdGNoZXMsXG5cdFx0XHRcdFx0aW52ZXJzZVBhdGNoZXNcblx0XHRcdFx0KVxuXHRcdFx0Y2FzZSBBcmNoVHlwZS5BcnJheTpcblx0XHRcdFx0cmV0dXJuIGdlbmVyYXRlQXJyYXlQYXRjaGVzKHN0YXRlLCBiYXNlUGF0aCwgcGF0Y2hlcywgaW52ZXJzZVBhdGNoZXMpXG5cdFx0XHRjYXNlIEFyY2hUeXBlLlNldDpcblx0XHRcdFx0cmV0dXJuIGdlbmVyYXRlU2V0UGF0Y2hlcyhcblx0XHRcdFx0XHQoc3RhdGUgYXMgYW55KSBhcyBTZXRTdGF0ZSxcblx0XHRcdFx0XHRiYXNlUGF0aCxcblx0XHRcdFx0XHRwYXRjaGVzLFxuXHRcdFx0XHRcdGludmVyc2VQYXRjaGVzXG5cdFx0XHRcdClcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiBnZW5lcmF0ZUFycmF5UGF0Y2hlcyhcblx0XHRzdGF0ZTogUHJveHlBcnJheVN0YXRlLFxuXHRcdGJhc2VQYXRoOiBQYXRjaFBhdGgsXG5cdFx0cGF0Y2hlczogUGF0Y2hbXSxcblx0XHRpbnZlcnNlUGF0Y2hlczogUGF0Y2hbXVxuXHQpIHtcblx0XHRsZXQge2Jhc2VfLCBhc3NpZ25lZF99ID0gc3RhdGVcblx0XHRsZXQgY29weV8gPSBzdGF0ZS5jb3B5XyFcblxuXHRcdC8vIFJlZHVjZSBjb21wbGV4aXR5IGJ5IGVuc3VyaW5nIGBiYXNlYCBpcyBuZXZlciBsb25nZXIuXG5cdFx0aWYgKGNvcHlfLmxlbmd0aCA8IGJhc2VfLmxlbmd0aCkge1xuXHRcdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdFx0O1tiYXNlXywgY29weV9dID0gW2NvcHlfLCBiYXNlX11cblx0XHRcdDtbcGF0Y2hlcywgaW52ZXJzZVBhdGNoZXNdID0gW2ludmVyc2VQYXRjaGVzLCBwYXRjaGVzXVxuXHRcdH1cblxuXHRcdC8vIFByb2Nlc3MgcmVwbGFjZWQgaW5kaWNlcy5cblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGJhc2VfLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRpZiAoYXNzaWduZWRfW2ldICYmIGNvcHlfW2ldICE9PSBiYXNlX1tpXSkge1xuXHRcdFx0XHRjb25zdCBwYXRoID0gYmFzZVBhdGguY29uY2F0KFtpXSlcblx0XHRcdFx0cGF0Y2hlcy5wdXNoKHtcblx0XHRcdFx0XHRvcDogUkVQTEFDRSxcblx0XHRcdFx0XHRwYXRoLFxuXHRcdFx0XHRcdC8vIE5lZWQgdG8gbWF5YmUgY2xvbmUgaXQsIGFzIGl0IGNhbiBpbiBmYWN0IGJlIHRoZSBvcmlnaW5hbCB2YWx1ZVxuXHRcdFx0XHRcdC8vIGR1ZSB0byB0aGUgYmFzZS9jb3B5IGludmVyc2lvbiBhdCB0aGUgc3RhcnQgb2YgdGhpcyBmdW5jdGlvblxuXHRcdFx0XHRcdHZhbHVlOiBjbG9uZVBhdGNoVmFsdWVJZk5lZWRlZChjb3B5X1tpXSlcblx0XHRcdFx0fSlcblx0XHRcdFx0aW52ZXJzZVBhdGNoZXMucHVzaCh7XG5cdFx0XHRcdFx0b3A6IFJFUExBQ0UsXG5cdFx0XHRcdFx0cGF0aCxcblx0XHRcdFx0XHR2YWx1ZTogY2xvbmVQYXRjaFZhbHVlSWZOZWVkZWQoYmFzZV9baV0pXG5cdFx0XHRcdH0pXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gUHJvY2VzcyBhZGRlZCBpbmRpY2VzLlxuXHRcdGZvciAobGV0IGkgPSBiYXNlXy5sZW5ndGg7IGkgPCBjb3B5Xy5sZW5ndGg7IGkrKykge1xuXHRcdFx0Y29uc3QgcGF0aCA9IGJhc2VQYXRoLmNvbmNhdChbaV0pXG5cdFx0XHRwYXRjaGVzLnB1c2goe1xuXHRcdFx0XHRvcDogQURELFxuXHRcdFx0XHRwYXRoLFxuXHRcdFx0XHQvLyBOZWVkIHRvIG1heWJlIGNsb25lIGl0LCBhcyBpdCBjYW4gaW4gZmFjdCBiZSB0aGUgb3JpZ2luYWwgdmFsdWVcblx0XHRcdFx0Ly8gZHVlIHRvIHRoZSBiYXNlL2NvcHkgaW52ZXJzaW9uIGF0IHRoZSBzdGFydCBvZiB0aGlzIGZ1bmN0aW9uXG5cdFx0XHRcdHZhbHVlOiBjbG9uZVBhdGNoVmFsdWVJZk5lZWRlZChjb3B5X1tpXSlcblx0XHRcdH0pXG5cdFx0fVxuXHRcdGZvciAobGV0IGkgPSBjb3B5Xy5sZW5ndGggLSAxOyBiYXNlXy5sZW5ndGggPD0gaTsgLS1pKSB7XG5cdFx0XHRjb25zdCBwYXRoID0gYmFzZVBhdGguY29uY2F0KFtpXSlcblx0XHRcdGludmVyc2VQYXRjaGVzLnB1c2goe1xuXHRcdFx0XHRvcDogUkVNT1ZFLFxuXHRcdFx0XHRwYXRoXG5cdFx0XHR9KVxuXHRcdH1cblx0fVxuXG5cdC8vIFRoaXMgaXMgdXNlZCBmb3IgYm90aCBNYXAgb2JqZWN0cyBhbmQgbm9ybWFsIG9iamVjdHMuXG5cdGZ1bmN0aW9uIGdlbmVyYXRlUGF0Y2hlc0Zyb21Bc3NpZ25lZChcblx0XHRzdGF0ZTogTWFwU3RhdGUgfCBQcm94eU9iamVjdFN0YXRlLFxuXHRcdGJhc2VQYXRoOiBQYXRjaFBhdGgsXG5cdFx0cGF0Y2hlczogUGF0Y2hbXSxcblx0XHRpbnZlcnNlUGF0Y2hlczogUGF0Y2hbXVxuXHQpIHtcblx0XHRjb25zdCB7YmFzZV8sIGNvcHlffSA9IHN0YXRlXG5cdFx0ZWFjaChzdGF0ZS5hc3NpZ25lZF8hLCAoa2V5LCBhc3NpZ25lZFZhbHVlKSA9PiB7XG5cdFx0XHRjb25zdCBvcmlnVmFsdWUgPSBnZXQoYmFzZV8sIGtleSlcblx0XHRcdGNvbnN0IHZhbHVlID0gZ2V0KGNvcHlfISwga2V5KVxuXHRcdFx0Y29uc3Qgb3AgPSAhYXNzaWduZWRWYWx1ZSA/IFJFTU9WRSA6IGhhcyhiYXNlXywga2V5KSA/IFJFUExBQ0UgOiBBRERcblx0XHRcdGlmIChvcmlnVmFsdWUgPT09IHZhbHVlICYmIG9wID09PSBSRVBMQUNFKSByZXR1cm5cblx0XHRcdGNvbnN0IHBhdGggPSBiYXNlUGF0aC5jb25jYXQoa2V5IGFzIGFueSlcblx0XHRcdHBhdGNoZXMucHVzaChvcCA9PT0gUkVNT1ZFID8ge29wLCBwYXRofSA6IHtvcCwgcGF0aCwgdmFsdWV9KVxuXHRcdFx0aW52ZXJzZVBhdGNoZXMucHVzaChcblx0XHRcdFx0b3AgPT09IEFERFxuXHRcdFx0XHRcdD8ge29wOiBSRU1PVkUsIHBhdGh9XG5cdFx0XHRcdFx0OiBvcCA9PT0gUkVNT1ZFXG5cdFx0XHRcdFx0PyB7b3A6IEFERCwgcGF0aCwgdmFsdWU6IGNsb25lUGF0Y2hWYWx1ZUlmTmVlZGVkKG9yaWdWYWx1ZSl9XG5cdFx0XHRcdFx0OiB7b3A6IFJFUExBQ0UsIHBhdGgsIHZhbHVlOiBjbG9uZVBhdGNoVmFsdWVJZk5lZWRlZChvcmlnVmFsdWUpfVxuXHRcdFx0KVxuXHRcdH0pXG5cdH1cblxuXHRmdW5jdGlvbiBnZW5lcmF0ZVNldFBhdGNoZXMoXG5cdFx0c3RhdGU6IFNldFN0YXRlLFxuXHRcdGJhc2VQYXRoOiBQYXRjaFBhdGgsXG5cdFx0cGF0Y2hlczogUGF0Y2hbXSxcblx0XHRpbnZlcnNlUGF0Y2hlczogUGF0Y2hbXVxuXHQpIHtcblx0XHRsZXQge2Jhc2VfLCBjb3B5X30gPSBzdGF0ZVxuXG5cdFx0bGV0IGkgPSAwXG5cdFx0YmFzZV8uZm9yRWFjaCgodmFsdWU6IGFueSkgPT4ge1xuXHRcdFx0aWYgKCFjb3B5XyEuaGFzKHZhbHVlKSkge1xuXHRcdFx0XHRjb25zdCBwYXRoID0gYmFzZVBhdGguY29uY2F0KFtpXSlcblx0XHRcdFx0cGF0Y2hlcy5wdXNoKHtcblx0XHRcdFx0XHRvcDogUkVNT1ZFLFxuXHRcdFx0XHRcdHBhdGgsXG5cdFx0XHRcdFx0dmFsdWVcblx0XHRcdFx0fSlcblx0XHRcdFx0aW52ZXJzZVBhdGNoZXMudW5zaGlmdCh7XG5cdFx0XHRcdFx0b3A6IEFERCxcblx0XHRcdFx0XHRwYXRoLFxuXHRcdFx0XHRcdHZhbHVlXG5cdFx0XHRcdH0pXG5cdFx0XHR9XG5cdFx0XHRpKytcblx0XHR9KVxuXHRcdGkgPSAwXG5cdFx0Y29weV8hLmZvckVhY2goKHZhbHVlOiBhbnkpID0+IHtcblx0XHRcdGlmICghYmFzZV8uaGFzKHZhbHVlKSkge1xuXHRcdFx0XHRjb25zdCBwYXRoID0gYmFzZVBhdGguY29uY2F0KFtpXSlcblx0XHRcdFx0cGF0Y2hlcy5wdXNoKHtcblx0XHRcdFx0XHRvcDogQURELFxuXHRcdFx0XHRcdHBhdGgsXG5cdFx0XHRcdFx0dmFsdWVcblx0XHRcdFx0fSlcblx0XHRcdFx0aW52ZXJzZVBhdGNoZXMudW5zaGlmdCh7XG5cdFx0XHRcdFx0b3A6IFJFTU9WRSxcblx0XHRcdFx0XHRwYXRoLFxuXHRcdFx0XHRcdHZhbHVlXG5cdFx0XHRcdH0pXG5cdFx0XHR9XG5cdFx0XHRpKytcblx0XHR9KVxuXHR9XG5cblx0ZnVuY3Rpb24gZ2VuZXJhdGVSZXBsYWNlbWVudFBhdGNoZXNfKFxuXHRcdGJhc2VWYWx1ZTogYW55LFxuXHRcdHJlcGxhY2VtZW50OiBhbnksXG5cdFx0cGF0Y2hlczogUGF0Y2hbXSxcblx0XHRpbnZlcnNlUGF0Y2hlczogUGF0Y2hbXVxuXHQpOiB2b2lkIHtcblx0XHRwYXRjaGVzLnB1c2goe1xuXHRcdFx0b3A6IFJFUExBQ0UsXG5cdFx0XHRwYXRoOiBbXSxcblx0XHRcdHZhbHVlOiByZXBsYWNlbWVudCA9PT0gTk9USElORyA/IHVuZGVmaW5lZCA6IHJlcGxhY2VtZW50XG5cdFx0fSlcblx0XHRpbnZlcnNlUGF0Y2hlcy5wdXNoKHtcblx0XHRcdG9wOiBSRVBMQUNFLFxuXHRcdFx0cGF0aDogW10sXG5cdFx0XHR2YWx1ZTogYmFzZVZhbHVlXG5cdFx0fSlcblx0fVxuXG5cdGZ1bmN0aW9uIGFwcGx5UGF0Y2hlc188VD4oZHJhZnQ6IFQsIHBhdGNoZXM6IHJlYWRvbmx5IFBhdGNoW10pOiBUIHtcblx0XHRwYXRjaGVzLmZvckVhY2gocGF0Y2ggPT4ge1xuXHRcdFx0Y29uc3Qge3BhdGgsIG9wfSA9IHBhdGNoXG5cblx0XHRcdGxldCBiYXNlOiBhbnkgPSBkcmFmdFxuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBwYXRoLmxlbmd0aCAtIDE7IGkrKykge1xuXHRcdFx0XHRjb25zdCBwYXJlbnRUeXBlID0gZ2V0QXJjaHR5cGUoYmFzZSlcblx0XHRcdFx0bGV0IHAgPSBwYXRoW2ldXG5cdFx0XHRcdGlmICh0eXBlb2YgcCAhPT0gXCJzdHJpbmdcIiAmJiB0eXBlb2YgcCAhPT0gXCJudW1iZXJcIikge1xuXHRcdFx0XHRcdHAgPSBcIlwiICsgcFxuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gU2VlICM3MzgsIGF2b2lkIHByb3RvdHlwZSBwb2xsdXRpb25cblx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdChwYXJlbnRUeXBlID09PSBBcmNoVHlwZS5PYmplY3QgfHwgcGFyZW50VHlwZSA9PT0gQXJjaFR5cGUuQXJyYXkpICYmXG5cdFx0XHRcdFx0KHAgPT09IFwiX19wcm90b19fXCIgfHwgcCA9PT0gXCJjb25zdHJ1Y3RvclwiKVxuXHRcdFx0XHQpXG5cdFx0XHRcdFx0ZGllKGVycm9yT2Zmc2V0ICsgMylcblx0XHRcdFx0aWYgKHR5cGVvZiBiYXNlID09PSBcImZ1bmN0aW9uXCIgJiYgcCA9PT0gXCJwcm90b3R5cGVcIilcblx0XHRcdFx0XHRkaWUoZXJyb3JPZmZzZXQgKyAzKVxuXHRcdFx0XHRiYXNlID0gZ2V0KGJhc2UsIHApXG5cdFx0XHRcdGlmICh0eXBlb2YgYmFzZSAhPT0gXCJvYmplY3RcIikgZGllKGVycm9yT2Zmc2V0ICsgMiwgcGF0aC5qb2luKFwiL1wiKSlcblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgdHlwZSA9IGdldEFyY2h0eXBlKGJhc2UpXG5cdFx0XHRjb25zdCB2YWx1ZSA9IGRlZXBDbG9uZVBhdGNoVmFsdWUocGF0Y2gudmFsdWUpIC8vIHVzZWQgdG8gY2xvbmUgcGF0Y2ggdG8gZW5zdXJlIG9yaWdpbmFsIHBhdGNoIGlzIG5vdCBtb2RpZmllZCwgc2VlICM0MTFcblx0XHRcdGNvbnN0IGtleSA9IHBhdGhbcGF0aC5sZW5ndGggLSAxXVxuXHRcdFx0c3dpdGNoIChvcCkge1xuXHRcdFx0XHRjYXNlIFJFUExBQ0U6XG5cdFx0XHRcdFx0c3dpdGNoICh0eXBlKSB7XG5cdFx0XHRcdFx0XHRjYXNlIEFyY2hUeXBlLk1hcDpcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGJhc2Uuc2V0KGtleSwgdmFsdWUpXG5cdFx0XHRcdFx0XHQvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuXHRcdFx0XHRcdFx0Y2FzZSBBcmNoVHlwZS5TZXQ6XG5cdFx0XHRcdFx0XHRcdGRpZShlcnJvck9mZnNldClcblx0XHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0XHRcdC8vIGlmIHZhbHVlIGlzIGFuIG9iamVjdCwgdGhlbiBpdCdzIGFzc2lnbmVkIGJ5IHJlZmVyZW5jZVxuXHRcdFx0XHRcdFx0XHQvLyBpbiB0aGUgZm9sbG93aW5nIGFkZCBvciByZW1vdmUgb3BzLCB0aGUgdmFsdWUgZmllbGQgaW5zaWRlIHRoZSBwYXRjaCB3aWxsIGFsc28gYmUgbW9kaWZ5ZWRcblx0XHRcdFx0XHRcdFx0Ly8gc28gd2UgdXNlIHZhbHVlIGZyb20gdGhlIGNsb25lZCBwYXRjaFxuXHRcdFx0XHRcdFx0XHQvLyBAdHMtaWdub3JlXG5cdFx0XHRcdFx0XHRcdHJldHVybiAoYmFzZVtrZXldID0gdmFsdWUpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRjYXNlIEFERDpcblx0XHRcdFx0XHRzd2l0Y2ggKHR5cGUpIHtcblx0XHRcdFx0XHRcdGNhc2UgQXJjaFR5cGUuQXJyYXk6XG5cdFx0XHRcdFx0XHRcdHJldHVybiBrZXkgPT09IFwiLVwiXG5cdFx0XHRcdFx0XHRcdFx0PyBiYXNlLnB1c2godmFsdWUpXG5cdFx0XHRcdFx0XHRcdFx0OiBiYXNlLnNwbGljZShrZXkgYXMgYW55LCAwLCB2YWx1ZSlcblx0XHRcdFx0XHRcdGNhc2UgQXJjaFR5cGUuTWFwOlxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gYmFzZS5zZXQoa2V5LCB2YWx1ZSlcblx0XHRcdFx0XHRcdGNhc2UgQXJjaFR5cGUuU2V0OlxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gYmFzZS5hZGQodmFsdWUpXG5cdFx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gKGJhc2Vba2V5XSA9IHZhbHVlKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0Y2FzZSBSRU1PVkU6XG5cdFx0XHRcdFx0c3dpdGNoICh0eXBlKSB7XG5cdFx0XHRcdFx0XHRjYXNlIEFyY2hUeXBlLkFycmF5OlxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gYmFzZS5zcGxpY2Uoa2V5IGFzIGFueSwgMSlcblx0XHRcdFx0XHRcdGNhc2UgQXJjaFR5cGUuTWFwOlxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gYmFzZS5kZWxldGUoa2V5KVxuXHRcdFx0XHRcdFx0Y2FzZSBBcmNoVHlwZS5TZXQ6XG5cdFx0XHRcdFx0XHRcdHJldHVybiBiYXNlLmRlbGV0ZShwYXRjaC52YWx1ZSlcblx0XHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0XHRcdHJldHVybiBkZWxldGUgYmFzZVtrZXldXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdGRpZShlcnJvck9mZnNldCArIDEsIG9wKVxuXHRcdFx0fVxuXHRcdH0pXG5cblx0XHRyZXR1cm4gZHJhZnRcblx0fVxuXG5cdC8vIG9wdGltaXplOiB0aGlzIGlzIHF1aXRlIGEgcGVyZm9ybWFuY2UgaGl0LCBjYW4gd2UgZGV0ZWN0IGludGVsbGlnZW50bHkgd2hlbiBpdCBpcyBuZWVkZWQ/XG5cdC8vIEUuZy4gYXV0by1kcmFmdCB3aGVuIG5ldyBvYmplY3RzIGZyb20gb3V0c2lkZSBhcmUgYXNzaWduZWQgYW5kIG1vZGlmaWVkP1xuXHQvLyAoU2VlIGZhaWxpbmcgdGVzdCB3aGVuIGRlZXBDbG9uZSBqdXN0IHJldHVybnMgb2JqKVxuXHRmdW5jdGlvbiBkZWVwQ2xvbmVQYXRjaFZhbHVlPFQ+KG9iajogVCk6IFRcblx0ZnVuY3Rpb24gZGVlcENsb25lUGF0Y2hWYWx1ZShvYmo6IGFueSkge1xuXHRcdGlmICghaXNEcmFmdGFibGUob2JqKSkgcmV0dXJuIG9ialxuXHRcdGlmIChBcnJheS5pc0FycmF5KG9iaikpIHJldHVybiBvYmoubWFwKGRlZXBDbG9uZVBhdGNoVmFsdWUpXG5cdFx0aWYgKGlzTWFwKG9iaikpXG5cdFx0XHRyZXR1cm4gbmV3IE1hcChcblx0XHRcdFx0QXJyYXkuZnJvbShvYmouZW50cmllcygpKS5tYXAoKFtrLCB2XSkgPT4gW2ssIGRlZXBDbG9uZVBhdGNoVmFsdWUodildKVxuXHRcdFx0KVxuXHRcdGlmIChpc1NldChvYmopKSByZXR1cm4gbmV3IFNldChBcnJheS5mcm9tKG9iaikubWFwKGRlZXBDbG9uZVBhdGNoVmFsdWUpKVxuXHRcdGNvbnN0IGNsb25lZCA9IE9iamVjdC5jcmVhdGUoZ2V0UHJvdG90eXBlT2Yob2JqKSlcblx0XHRmb3IgKGNvbnN0IGtleSBpbiBvYmopIGNsb25lZFtrZXldID0gZGVlcENsb25lUGF0Y2hWYWx1ZShvYmpba2V5XSlcblx0XHRpZiAoaGFzKG9iaiwgaW1tZXJhYmxlKSkgY2xvbmVkW2ltbWVyYWJsZV0gPSBvYmpbaW1tZXJhYmxlXVxuXHRcdHJldHVybiBjbG9uZWRcblx0fVxuXG5cdGZ1bmN0aW9uIGNsb25lUGF0Y2hWYWx1ZUlmTmVlZGVkPFQ+KG9iajogVCk6IFQge1xuXHRcdGlmIChpc0RyYWZ0KG9iaikpIHtcblx0XHRcdHJldHVybiBkZWVwQ2xvbmVQYXRjaFZhbHVlKG9iailcblx0XHR9IGVsc2UgcmV0dXJuIG9ialxuXHR9XG5cblx0bG9hZFBsdWdpbihcIlBhdGNoZXNcIiwge1xuXHRcdGFwcGx5UGF0Y2hlc18sXG5cdFx0Z2VuZXJhdGVQYXRjaGVzXyxcblx0XHRnZW5lcmF0ZVJlcGxhY2VtZW50UGF0Y2hlc19cblx0fSlcbn1cbiIsICIvLyB0eXBlcyBvbmx5IVxuaW1wb3J0IHtcblx0SW1tZXJTdGF0ZSxcblx0QW55TWFwLFxuXHRBbnlTZXQsXG5cdE1hcFN0YXRlLFxuXHRTZXRTdGF0ZSxcblx0RFJBRlRfU1RBVEUsXG5cdGdldEN1cnJlbnRTY29wZSxcblx0bGF0ZXN0LFxuXHRpc0RyYWZ0YWJsZSxcblx0Y3JlYXRlUHJveHksXG5cdGxvYWRQbHVnaW4sXG5cdG1hcmtDaGFuZ2VkLFxuXHRkaWUsXG5cdEFyY2hUeXBlLFxuXHRlYWNoXG59IGZyb20gXCIuLi9pbnRlcm5hbFwiXG5cbmV4cG9ydCBmdW5jdGlvbiBlbmFibGVNYXBTZXQoKSB7XG5cdGNsYXNzIERyYWZ0TWFwIGV4dGVuZHMgTWFwIHtcblx0XHRbRFJBRlRfU1RBVEVdOiBNYXBTdGF0ZVxuXG5cdFx0Y29uc3RydWN0b3IodGFyZ2V0OiBBbnlNYXAsIHBhcmVudD86IEltbWVyU3RhdGUpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdHRoaXNbRFJBRlRfU1RBVEVdID0ge1xuXHRcdFx0XHR0eXBlXzogQXJjaFR5cGUuTWFwLFxuXHRcdFx0XHRwYXJlbnRfOiBwYXJlbnQsXG5cdFx0XHRcdHNjb3BlXzogcGFyZW50ID8gcGFyZW50LnNjb3BlXyA6IGdldEN1cnJlbnRTY29wZSgpISxcblx0XHRcdFx0bW9kaWZpZWRfOiBmYWxzZSxcblx0XHRcdFx0ZmluYWxpemVkXzogZmFsc2UsXG5cdFx0XHRcdGNvcHlfOiB1bmRlZmluZWQsXG5cdFx0XHRcdGFzc2lnbmVkXzogdW5kZWZpbmVkLFxuXHRcdFx0XHRiYXNlXzogdGFyZ2V0LFxuXHRcdFx0XHRkcmFmdF86IHRoaXMgYXMgYW55LFxuXHRcdFx0XHRpc01hbnVhbF86IGZhbHNlLFxuXHRcdFx0XHRyZXZva2VkXzogZmFsc2Vcblx0XHRcdH1cblx0XHR9XG5cblx0XHRnZXQgc2l6ZSgpOiBudW1iZXIge1xuXHRcdFx0cmV0dXJuIGxhdGVzdCh0aGlzW0RSQUZUX1NUQVRFXSkuc2l6ZVxuXHRcdH1cblxuXHRcdGhhcyhrZXk6IGFueSk6IGJvb2xlYW4ge1xuXHRcdFx0cmV0dXJuIGxhdGVzdCh0aGlzW0RSQUZUX1NUQVRFXSkuaGFzKGtleSlcblx0XHR9XG5cblx0XHRzZXQoa2V5OiBhbnksIHZhbHVlOiBhbnkpIHtcblx0XHRcdGNvbnN0IHN0YXRlOiBNYXBTdGF0ZSA9IHRoaXNbRFJBRlRfU1RBVEVdXG5cdFx0XHRhc3NlcnRVbnJldm9rZWQoc3RhdGUpXG5cdFx0XHRpZiAoIWxhdGVzdChzdGF0ZSkuaGFzKGtleSkgfHwgbGF0ZXN0KHN0YXRlKS5nZXQoa2V5KSAhPT0gdmFsdWUpIHtcblx0XHRcdFx0cHJlcGFyZU1hcENvcHkoc3RhdGUpXG5cdFx0XHRcdG1hcmtDaGFuZ2VkKHN0YXRlKVxuXHRcdFx0XHRzdGF0ZS5hc3NpZ25lZF8hLnNldChrZXksIHRydWUpXG5cdFx0XHRcdHN0YXRlLmNvcHlfIS5zZXQoa2V5LCB2YWx1ZSlcblx0XHRcdFx0c3RhdGUuYXNzaWduZWRfIS5zZXQoa2V5LCB0cnVlKVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9XG5cblx0XHRkZWxldGUoa2V5OiBhbnkpOiBib29sZWFuIHtcblx0XHRcdGlmICghdGhpcy5oYXMoa2V5KSkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2Vcblx0XHRcdH1cblxuXHRcdFx0Y29uc3Qgc3RhdGU6IE1hcFN0YXRlID0gdGhpc1tEUkFGVF9TVEFURV1cblx0XHRcdGFzc2VydFVucmV2b2tlZChzdGF0ZSlcblx0XHRcdHByZXBhcmVNYXBDb3B5KHN0YXRlKVxuXHRcdFx0bWFya0NoYW5nZWQoc3RhdGUpXG5cdFx0XHRpZiAoc3RhdGUuYmFzZV8uaGFzKGtleSkpIHtcblx0XHRcdFx0c3RhdGUuYXNzaWduZWRfIS5zZXQoa2V5LCBmYWxzZSlcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHN0YXRlLmFzc2lnbmVkXyEuZGVsZXRlKGtleSlcblx0XHRcdH1cblx0XHRcdHN0YXRlLmNvcHlfIS5kZWxldGUoa2V5KVxuXHRcdFx0cmV0dXJuIHRydWVcblx0XHR9XG5cblx0XHRjbGVhcigpIHtcblx0XHRcdGNvbnN0IHN0YXRlOiBNYXBTdGF0ZSA9IHRoaXNbRFJBRlRfU1RBVEVdXG5cdFx0XHRhc3NlcnRVbnJldm9rZWQoc3RhdGUpXG5cdFx0XHRpZiAobGF0ZXN0KHN0YXRlKS5zaXplKSB7XG5cdFx0XHRcdHByZXBhcmVNYXBDb3B5KHN0YXRlKVxuXHRcdFx0XHRtYXJrQ2hhbmdlZChzdGF0ZSlcblx0XHRcdFx0c3RhdGUuYXNzaWduZWRfID0gbmV3IE1hcCgpXG5cdFx0XHRcdGVhY2goc3RhdGUuYmFzZV8sIGtleSA9PiB7XG5cdFx0XHRcdFx0c3RhdGUuYXNzaWduZWRfIS5zZXQoa2V5LCBmYWxzZSlcblx0XHRcdFx0fSlcblx0XHRcdFx0c3RhdGUuY29weV8hLmNsZWFyKClcblx0XHRcdH1cblx0XHR9XG5cblx0XHRmb3JFYWNoKGNiOiAodmFsdWU6IGFueSwga2V5OiBhbnksIHNlbGY6IGFueSkgPT4gdm9pZCwgdGhpc0FyZz86IGFueSkge1xuXHRcdFx0Y29uc3Qgc3RhdGU6IE1hcFN0YXRlID0gdGhpc1tEUkFGVF9TVEFURV1cblx0XHRcdGxhdGVzdChzdGF0ZSkuZm9yRWFjaCgoX3ZhbHVlOiBhbnksIGtleTogYW55LCBfbWFwOiBhbnkpID0+IHtcblx0XHRcdFx0Y2IuY2FsbCh0aGlzQXJnLCB0aGlzLmdldChrZXkpLCBrZXksIHRoaXMpXG5cdFx0XHR9KVxuXHRcdH1cblxuXHRcdGdldChrZXk6IGFueSk6IGFueSB7XG5cdFx0XHRjb25zdCBzdGF0ZTogTWFwU3RhdGUgPSB0aGlzW0RSQUZUX1NUQVRFXVxuXHRcdFx0YXNzZXJ0VW5yZXZva2VkKHN0YXRlKVxuXHRcdFx0Y29uc3QgdmFsdWUgPSBsYXRlc3Qoc3RhdGUpLmdldChrZXkpXG5cdFx0XHRpZiAoc3RhdGUuZmluYWxpemVkXyB8fCAhaXNEcmFmdGFibGUodmFsdWUpKSB7XG5cdFx0XHRcdHJldHVybiB2YWx1ZVxuXHRcdFx0fVxuXHRcdFx0aWYgKHZhbHVlICE9PSBzdGF0ZS5iYXNlXy5nZXQoa2V5KSkge1xuXHRcdFx0XHRyZXR1cm4gdmFsdWUgLy8gZWl0aGVyIGFscmVhZHkgZHJhZnRlZCBvciByZWFzc2lnbmVkXG5cdFx0XHR9XG5cdFx0XHQvLyBkZXNwaXRlIHdoYXQgaXQgbG9va3MsIHRoaXMgY3JlYXRlcyBhIGRyYWZ0IG9ubHkgb25jZSwgc2VlIGFib3ZlIGNvbmRpdGlvblxuXHRcdFx0Y29uc3QgZHJhZnQgPSBjcmVhdGVQcm94eSh2YWx1ZSwgc3RhdGUpXG5cdFx0XHRwcmVwYXJlTWFwQ29weShzdGF0ZSlcblx0XHRcdHN0YXRlLmNvcHlfIS5zZXQoa2V5LCBkcmFmdClcblx0XHRcdHJldHVybiBkcmFmdFxuXHRcdH1cblxuXHRcdGtleXMoKTogSXRlcmFibGVJdGVyYXRvcjxhbnk+IHtcblx0XHRcdHJldHVybiBsYXRlc3QodGhpc1tEUkFGVF9TVEFURV0pLmtleXMoKVxuXHRcdH1cblxuXHRcdHZhbHVlcygpOiBJdGVyYWJsZUl0ZXJhdG9yPGFueT4ge1xuXHRcdFx0Y29uc3QgaXRlcmF0b3IgPSB0aGlzLmtleXMoKVxuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0W1N5bWJvbC5pdGVyYXRvcl06ICgpID0+IHRoaXMudmFsdWVzKCksXG5cdFx0XHRcdG5leHQ6ICgpID0+IHtcblx0XHRcdFx0XHRjb25zdCByID0gaXRlcmF0b3IubmV4dCgpXG5cdFx0XHRcdFx0LyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cblx0XHRcdFx0XHRpZiAoci5kb25lKSByZXR1cm4gclxuXHRcdFx0XHRcdGNvbnN0IHZhbHVlID0gdGhpcy5nZXQoci52YWx1ZSlcblx0XHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdFx0ZG9uZTogZmFsc2UsXG5cdFx0XHRcdFx0XHR2YWx1ZVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSBhcyBhbnlcblx0XHR9XG5cblx0XHRlbnRyaWVzKCk6IEl0ZXJhYmxlSXRlcmF0b3I8W2FueSwgYW55XT4ge1xuXHRcdFx0Y29uc3QgaXRlcmF0b3IgPSB0aGlzLmtleXMoKVxuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0W1N5bWJvbC5pdGVyYXRvcl06ICgpID0+IHRoaXMuZW50cmllcygpLFxuXHRcdFx0XHRuZXh0OiAoKSA9PiB7XG5cdFx0XHRcdFx0Y29uc3QgciA9IGl0ZXJhdG9yLm5leHQoKVxuXHRcdFx0XHRcdC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5cdFx0XHRcdFx0aWYgKHIuZG9uZSkgcmV0dXJuIHJcblx0XHRcdFx0XHRjb25zdCB2YWx1ZSA9IHRoaXMuZ2V0KHIudmFsdWUpXG5cdFx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRcdGRvbmU6IGZhbHNlLFxuXHRcdFx0XHRcdFx0dmFsdWU6IFtyLnZhbHVlLCB2YWx1ZV1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0gYXMgYW55XG5cdFx0fVxuXG5cdFx0W1N5bWJvbC5pdGVyYXRvcl0oKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5lbnRyaWVzKClcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiBwcm94eU1hcF88VCBleHRlbmRzIEFueU1hcD4odGFyZ2V0OiBULCBwYXJlbnQ/OiBJbW1lclN0YXRlKTogVCB7XG5cdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdHJldHVybiBuZXcgRHJhZnRNYXAodGFyZ2V0LCBwYXJlbnQpXG5cdH1cblxuXHRmdW5jdGlvbiBwcmVwYXJlTWFwQ29weShzdGF0ZTogTWFwU3RhdGUpIHtcblx0XHRpZiAoIXN0YXRlLmNvcHlfKSB7XG5cdFx0XHRzdGF0ZS5hc3NpZ25lZF8gPSBuZXcgTWFwKClcblx0XHRcdHN0YXRlLmNvcHlfID0gbmV3IE1hcChzdGF0ZS5iYXNlXylcblx0XHR9XG5cdH1cblxuXHRjbGFzcyBEcmFmdFNldCBleHRlbmRzIFNldCB7XG5cdFx0W0RSQUZUX1NUQVRFXTogU2V0U3RhdGVcblx0XHRjb25zdHJ1Y3Rvcih0YXJnZXQ6IEFueVNldCwgcGFyZW50PzogSW1tZXJTdGF0ZSkge1xuXHRcdFx0c3VwZXIoKVxuXHRcdFx0dGhpc1tEUkFGVF9TVEFURV0gPSB7XG5cdFx0XHRcdHR5cGVfOiBBcmNoVHlwZS5TZXQsXG5cdFx0XHRcdHBhcmVudF86IHBhcmVudCxcblx0XHRcdFx0c2NvcGVfOiBwYXJlbnQgPyBwYXJlbnQuc2NvcGVfIDogZ2V0Q3VycmVudFNjb3BlKCkhLFxuXHRcdFx0XHRtb2RpZmllZF86IGZhbHNlLFxuXHRcdFx0XHRmaW5hbGl6ZWRfOiBmYWxzZSxcblx0XHRcdFx0Y29weV86IHVuZGVmaW5lZCxcblx0XHRcdFx0YmFzZV86IHRhcmdldCxcblx0XHRcdFx0ZHJhZnRfOiB0aGlzLFxuXHRcdFx0XHRkcmFmdHNfOiBuZXcgTWFwKCksXG5cdFx0XHRcdHJldm9rZWRfOiBmYWxzZSxcblx0XHRcdFx0aXNNYW51YWxfOiBmYWxzZVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGdldCBzaXplKCk6IG51bWJlciB7XG5cdFx0XHRyZXR1cm4gbGF0ZXN0KHRoaXNbRFJBRlRfU1RBVEVdKS5zaXplXG5cdFx0fVxuXG5cdFx0aGFzKHZhbHVlOiBhbnkpOiBib29sZWFuIHtcblx0XHRcdGNvbnN0IHN0YXRlOiBTZXRTdGF0ZSA9IHRoaXNbRFJBRlRfU1RBVEVdXG5cdFx0XHRhc3NlcnRVbnJldm9rZWQoc3RhdGUpXG5cdFx0XHQvLyBiaXQgb2YgdHJpY2tlcnkgaGVyZSwgdG8gYmUgYWJsZSB0byByZWNvZ25pemUgYm90aCB0aGUgdmFsdWUsIGFuZCB0aGUgZHJhZnQgb2YgaXRzIHZhbHVlXG5cdFx0XHRpZiAoIXN0YXRlLmNvcHlfKSB7XG5cdFx0XHRcdHJldHVybiBzdGF0ZS5iYXNlXy5oYXModmFsdWUpXG5cdFx0XHR9XG5cdFx0XHRpZiAoc3RhdGUuY29weV8uaGFzKHZhbHVlKSkgcmV0dXJuIHRydWVcblx0XHRcdGlmIChzdGF0ZS5kcmFmdHNfLmhhcyh2YWx1ZSkgJiYgc3RhdGUuY29weV8uaGFzKHN0YXRlLmRyYWZ0c18uZ2V0KHZhbHVlKSkpXG5cdFx0XHRcdHJldHVybiB0cnVlXG5cdFx0XHRyZXR1cm4gZmFsc2Vcblx0XHR9XG5cblx0XHRhZGQodmFsdWU6IGFueSk6IGFueSB7XG5cdFx0XHRjb25zdCBzdGF0ZTogU2V0U3RhdGUgPSB0aGlzW0RSQUZUX1NUQVRFXVxuXHRcdFx0YXNzZXJ0VW5yZXZva2VkKHN0YXRlKVxuXHRcdFx0aWYgKCF0aGlzLmhhcyh2YWx1ZSkpIHtcblx0XHRcdFx0cHJlcGFyZVNldENvcHkoc3RhdGUpXG5cdFx0XHRcdG1hcmtDaGFuZ2VkKHN0YXRlKVxuXHRcdFx0XHRzdGF0ZS5jb3B5XyEuYWRkKHZhbHVlKVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9XG5cblx0XHRkZWxldGUodmFsdWU6IGFueSk6IGFueSB7XG5cdFx0XHRpZiAoIXRoaXMuaGFzKHZhbHVlKSkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2Vcblx0XHRcdH1cblxuXHRcdFx0Y29uc3Qgc3RhdGU6IFNldFN0YXRlID0gdGhpc1tEUkFGVF9TVEFURV1cblx0XHRcdGFzc2VydFVucmV2b2tlZChzdGF0ZSlcblx0XHRcdHByZXBhcmVTZXRDb3B5KHN0YXRlKVxuXHRcdFx0bWFya0NoYW5nZWQoc3RhdGUpXG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRzdGF0ZS5jb3B5XyEuZGVsZXRlKHZhbHVlKSB8fFxuXHRcdFx0XHQoc3RhdGUuZHJhZnRzXy5oYXModmFsdWUpXG5cdFx0XHRcdFx0PyBzdGF0ZS5jb3B5XyEuZGVsZXRlKHN0YXRlLmRyYWZ0c18uZ2V0KHZhbHVlKSlcblx0XHRcdFx0XHQ6IC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovIGZhbHNlKVxuXHRcdFx0KVxuXHRcdH1cblxuXHRcdGNsZWFyKCkge1xuXHRcdFx0Y29uc3Qgc3RhdGU6IFNldFN0YXRlID0gdGhpc1tEUkFGVF9TVEFURV1cblx0XHRcdGFzc2VydFVucmV2b2tlZChzdGF0ZSlcblx0XHRcdGlmIChsYXRlc3Qoc3RhdGUpLnNpemUpIHtcblx0XHRcdFx0cHJlcGFyZVNldENvcHkoc3RhdGUpXG5cdFx0XHRcdG1hcmtDaGFuZ2VkKHN0YXRlKVxuXHRcdFx0XHRzdGF0ZS5jb3B5XyEuY2xlYXIoKVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHZhbHVlcygpOiBJdGVyYWJsZUl0ZXJhdG9yPGFueT4ge1xuXHRcdFx0Y29uc3Qgc3RhdGU6IFNldFN0YXRlID0gdGhpc1tEUkFGVF9TVEFURV1cblx0XHRcdGFzc2VydFVucmV2b2tlZChzdGF0ZSlcblx0XHRcdHByZXBhcmVTZXRDb3B5KHN0YXRlKVxuXHRcdFx0cmV0dXJuIHN0YXRlLmNvcHlfIS52YWx1ZXMoKVxuXHRcdH1cblxuXHRcdGVudHJpZXMoKTogSXRlcmFibGVJdGVyYXRvcjxbYW55LCBhbnldPiB7XG5cdFx0XHRjb25zdCBzdGF0ZTogU2V0U3RhdGUgPSB0aGlzW0RSQUZUX1NUQVRFXVxuXHRcdFx0YXNzZXJ0VW5yZXZva2VkKHN0YXRlKVxuXHRcdFx0cHJlcGFyZVNldENvcHkoc3RhdGUpXG5cdFx0XHRyZXR1cm4gc3RhdGUuY29weV8hLmVudHJpZXMoKVxuXHRcdH1cblxuXHRcdGtleXMoKTogSXRlcmFibGVJdGVyYXRvcjxhbnk+IHtcblx0XHRcdHJldHVybiB0aGlzLnZhbHVlcygpXG5cdFx0fVxuXG5cdFx0W1N5bWJvbC5pdGVyYXRvcl0oKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy52YWx1ZXMoKVxuXHRcdH1cblxuXHRcdGZvckVhY2goY2I6IGFueSwgdGhpc0FyZz86IGFueSkge1xuXHRcdFx0Y29uc3QgaXRlcmF0b3IgPSB0aGlzLnZhbHVlcygpXG5cdFx0XHRsZXQgcmVzdWx0ID0gaXRlcmF0b3IubmV4dCgpXG5cdFx0XHR3aGlsZSAoIXJlc3VsdC5kb25lKSB7XG5cdFx0XHRcdGNiLmNhbGwodGhpc0FyZywgcmVzdWx0LnZhbHVlLCByZXN1bHQudmFsdWUsIHRoaXMpXG5cdFx0XHRcdHJlc3VsdCA9IGl0ZXJhdG9yLm5leHQoKVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRmdW5jdGlvbiBwcm94eVNldF88VCBleHRlbmRzIEFueVNldD4odGFyZ2V0OiBULCBwYXJlbnQ/OiBJbW1lclN0YXRlKTogVCB7XG5cdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdHJldHVybiBuZXcgRHJhZnRTZXQodGFyZ2V0LCBwYXJlbnQpXG5cdH1cblxuXHRmdW5jdGlvbiBwcmVwYXJlU2V0Q29weShzdGF0ZTogU2V0U3RhdGUpIHtcblx0XHRpZiAoIXN0YXRlLmNvcHlfKSB7XG5cdFx0XHQvLyBjcmVhdGUgZHJhZnRzIGZvciBhbGwgZW50cmllcyB0byBwcmVzZXJ2ZSBpbnNlcnRpb24gb3JkZXJcblx0XHRcdHN0YXRlLmNvcHlfID0gbmV3IFNldCgpXG5cdFx0XHRzdGF0ZS5iYXNlXy5mb3JFYWNoKHZhbHVlID0+IHtcblx0XHRcdFx0aWYgKGlzRHJhZnRhYmxlKHZhbHVlKSkge1xuXHRcdFx0XHRcdGNvbnN0IGRyYWZ0ID0gY3JlYXRlUHJveHkodmFsdWUsIHN0YXRlKVxuXHRcdFx0XHRcdHN0YXRlLmRyYWZ0c18uc2V0KHZhbHVlLCBkcmFmdClcblx0XHRcdFx0XHRzdGF0ZS5jb3B5XyEuYWRkKGRyYWZ0KVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHN0YXRlLmNvcHlfIS5hZGQodmFsdWUpXG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gYXNzZXJ0VW5yZXZva2VkKHN0YXRlOiBhbnkgLypFUzVTdGF0ZSB8IE1hcFN0YXRlIHwgU2V0U3RhdGUqLykge1xuXHRcdGlmIChzdGF0ZS5yZXZva2VkXykgZGllKDMsIEpTT04uc3RyaW5naWZ5KGxhdGVzdChzdGF0ZSkpKVxuXHR9XG5cblx0bG9hZFBsdWdpbihcIk1hcFNldFwiLCB7cHJveHlNYXBfLCBwcm94eVNldF99KVxufVxuIiwgImltcG9ydCB7XG5cdElQcm9kdWNlLFxuXHRJUHJvZHVjZVdpdGhQYXRjaGVzLFxuXHRJbW1lcixcblx0RHJhZnQsXG5cdEltbXV0YWJsZVxufSBmcm9tIFwiLi9pbnRlcm5hbFwiXG5cbmV4cG9ydCB7XG5cdERyYWZ0LFxuXHRXcml0YWJsZURyYWZ0LFxuXHRJbW11dGFibGUsXG5cdFBhdGNoLFxuXHRQYXRjaExpc3RlbmVyLFxuXHRQcm9kdWNlcixcblx0b3JpZ2luYWwsXG5cdGN1cnJlbnQsXG5cdGlzRHJhZnQsXG5cdGlzRHJhZnRhYmxlLFxuXHROT1RISU5HIGFzIG5vdGhpbmcsXG5cdERSQUZUQUJMRSBhcyBpbW1lcmFibGUsXG5cdGZyZWV6ZSxcblx0T2JqZWN0aXNoLFxuXHRTdHJpY3RNb2RlXG59IGZyb20gXCIuL2ludGVybmFsXCJcblxuY29uc3QgaW1tZXIgPSBuZXcgSW1tZXIoKVxuXG4vKipcbiAqIFRoZSBgcHJvZHVjZWAgZnVuY3Rpb24gdGFrZXMgYSB2YWx1ZSBhbmQgYSBcInJlY2lwZSBmdW5jdGlvblwiICh3aG9zZVxuICogcmV0dXJuIHZhbHVlIG9mdGVuIGRlcGVuZHMgb24gdGhlIGJhc2Ugc3RhdGUpLiBUaGUgcmVjaXBlIGZ1bmN0aW9uIGlzXG4gKiBmcmVlIHRvIG11dGF0ZSBpdHMgZmlyc3QgYXJndW1lbnQgaG93ZXZlciBpdCB3YW50cy4gQWxsIG11dGF0aW9ucyBhcmVcbiAqIG9ubHkgZXZlciBhcHBsaWVkIHRvIGEgX19jb3B5X18gb2YgdGhlIGJhc2Ugc3RhdGUuXG4gKlxuICogUGFzcyBvbmx5IGEgZnVuY3Rpb24gdG8gY3JlYXRlIGEgXCJjdXJyaWVkIHByb2R1Y2VyXCIgd2hpY2ggcmVsaWV2ZXMgeW91XG4gKiBmcm9tIHBhc3NpbmcgdGhlIHJlY2lwZSBmdW5jdGlvbiBldmVyeSB0aW1lLlxuICpcbiAqIE9ubHkgcGxhaW4gb2JqZWN0cyBhbmQgYXJyYXlzIGFyZSBtYWRlIG11dGFibGUuIEFsbCBvdGhlciBvYmplY3RzIGFyZVxuICogY29uc2lkZXJlZCB1bmNvcHlhYmxlLlxuICpcbiAqIE5vdGU6IFRoaXMgZnVuY3Rpb24gaXMgX19ib3VuZF9fIHRvIGl0cyBgSW1tZXJgIGluc3RhbmNlLlxuICpcbiAqIEBwYXJhbSB7YW55fSBiYXNlIC0gdGhlIGluaXRpYWwgc3RhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHByb2R1Y2VyIC0gZnVuY3Rpb24gdGhhdCByZWNlaXZlcyBhIHByb3h5IG9mIHRoZSBiYXNlIHN0YXRlIGFzIGZpcnN0IGFyZ3VtZW50IGFuZCB3aGljaCBjYW4gYmUgZnJlZWx5IG1vZGlmaWVkXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwYXRjaExpc3RlbmVyIC0gb3B0aW9uYWwgZnVuY3Rpb24gdGhhdCB3aWxsIGJlIGNhbGxlZCB3aXRoIGFsbCB0aGUgcGF0Y2hlcyBwcm9kdWNlZCBoZXJlXG4gKiBAcmV0dXJucyB7YW55fSBhIG5ldyBzdGF0ZSwgb3IgdGhlIGluaXRpYWwgc3RhdGUgaWYgbm90aGluZyB3YXMgbW9kaWZpZWRcbiAqL1xuZXhwb3J0IGNvbnN0IHByb2R1Y2U6IElQcm9kdWNlID0gaW1tZXIucHJvZHVjZVxuXG4vKipcbiAqIExpa2UgYHByb2R1Y2VgLCBidXQgYHByb2R1Y2VXaXRoUGF0Y2hlc2AgYWx3YXlzIHJldHVybnMgYSB0dXBsZVxuICogW25leHRTdGF0ZSwgcGF0Y2hlcywgaW52ZXJzZVBhdGNoZXNdIChpbnN0ZWFkIG9mIGp1c3QgdGhlIG5leHQgc3RhdGUpXG4gKi9cbmV4cG9ydCBjb25zdCBwcm9kdWNlV2l0aFBhdGNoZXM6IElQcm9kdWNlV2l0aFBhdGNoZXMgPSBpbW1lci5wcm9kdWNlV2l0aFBhdGNoZXMuYmluZChcblx0aW1tZXJcbilcblxuLyoqXG4gKiBQYXNzIHRydWUgdG8gYXV0b21hdGljYWxseSBmcmVlemUgYWxsIGNvcGllcyBjcmVhdGVkIGJ5IEltbWVyLlxuICpcbiAqIEFsd2F5cyBmcmVlemUgYnkgZGVmYXVsdCwgZXZlbiBpbiBwcm9kdWN0aW9uIG1vZGVcbiAqL1xuZXhwb3J0IGNvbnN0IHNldEF1dG9GcmVlemUgPSBpbW1lci5zZXRBdXRvRnJlZXplLmJpbmQoaW1tZXIpXG5cbi8qKlxuICogUGFzcyB0cnVlIHRvIGVuYWJsZSBzdHJpY3Qgc2hhbGxvdyBjb3B5LlxuICpcbiAqIEJ5IGRlZmF1bHQsIGltbWVyIGRvZXMgbm90IGNvcHkgdGhlIG9iamVjdCBkZXNjcmlwdG9ycyBzdWNoIGFzIGdldHRlciwgc2V0dGVyIGFuZCBub24tZW51bXJhYmxlIHByb3BlcnRpZXMuXG4gKi9cbmV4cG9ydCBjb25zdCBzZXRVc2VTdHJpY3RTaGFsbG93Q29weSA9IGltbWVyLnNldFVzZVN0cmljdFNoYWxsb3dDb3B5LmJpbmQoaW1tZXIpXG5cbi8qKlxuICogQXBwbHkgYW4gYXJyYXkgb2YgSW1tZXIgcGF0Y2hlcyB0byB0aGUgZmlyc3QgYXJndW1lbnQuXG4gKlxuICogVGhpcyBmdW5jdGlvbiBpcyBhIHByb2R1Y2VyLCB3aGljaCBtZWFucyBjb3B5LW9uLXdyaXRlIGlzIGluIGVmZmVjdC5cbiAqL1xuZXhwb3J0IGNvbnN0IGFwcGx5UGF0Y2hlcyA9IGltbWVyLmFwcGx5UGF0Y2hlcy5iaW5kKGltbWVyKVxuXG4vKipcbiAqIENyZWF0ZSBhbiBJbW1lciBkcmFmdCBmcm9tIHRoZSBnaXZlbiBiYXNlIHN0YXRlLCB3aGljaCBtYXkgYmUgYSBkcmFmdCBpdHNlbGYuXG4gKiBUaGUgZHJhZnQgY2FuIGJlIG1vZGlmaWVkIHVudGlsIHlvdSBmaW5hbGl6ZSBpdCB3aXRoIHRoZSBgZmluaXNoRHJhZnRgIGZ1bmN0aW9uLlxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlRHJhZnQgPSBpbW1lci5jcmVhdGVEcmFmdC5iaW5kKGltbWVyKVxuXG4vKipcbiAqIEZpbmFsaXplIGFuIEltbWVyIGRyYWZ0IGZyb20gYSBgY3JlYXRlRHJhZnRgIGNhbGwsIHJldHVybmluZyB0aGUgYmFzZSBzdGF0ZVxuICogKGlmIG5vIGNoYW5nZXMgd2VyZSBtYWRlKSBvciBhIG1vZGlmaWVkIGNvcHkuIFRoZSBkcmFmdCBtdXN0ICpub3QqIGJlXG4gKiBtdXRhdGVkIGFmdGVyd2FyZHMuXG4gKlxuICogUGFzcyBhIGZ1bmN0aW9uIGFzIHRoZSAybmQgYXJndW1lbnQgdG8gZ2VuZXJhdGUgSW1tZXIgcGF0Y2hlcyBiYXNlZCBvbiB0aGVcbiAqIGNoYW5nZXMgdGhhdCB3ZXJlIG1hZGUuXG4gKi9cbmV4cG9ydCBjb25zdCBmaW5pc2hEcmFmdCA9IGltbWVyLmZpbmlzaERyYWZ0LmJpbmQoaW1tZXIpXG5cbi8qKlxuICogVGhpcyBmdW5jdGlvbiBpcyBhY3R1YWxseSBhIG5vLW9wLCBidXQgY2FuIGJlIHVzZWQgdG8gY2FzdCBhbiBpbW11dGFibGUgdHlwZVxuICogdG8gYW4gZHJhZnQgdHlwZSBhbmQgbWFrZSBUeXBlU2NyaXB0IGhhcHB5XG4gKlxuICogQHBhcmFtIHZhbHVlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYXN0RHJhZnQ8VD4odmFsdWU6IFQpOiBEcmFmdDxUPiB7XG5cdHJldHVybiB2YWx1ZSBhcyBhbnlcbn1cblxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIGlzIGFjdHVhbGx5IGEgbm8tb3AsIGJ1dCBjYW4gYmUgdXNlZCB0byBjYXN0IGEgbXV0YWJsZSB0eXBlXG4gKiB0byBhbiBpbW11dGFibGUgdHlwZSBhbmQgbWFrZSBUeXBlU2NyaXB0IGhhcHB5XG4gKiBAcGFyYW0gdmFsdWVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNhc3RJbW11dGFibGU8VD4odmFsdWU6IFQpOiBJbW11dGFibGU8VD4ge1xuXHRyZXR1cm4gdmFsdWUgYXMgYW55XG59XG5cbmV4cG9ydCB7SW1tZXJ9XG5cbmV4cG9ydCB7ZW5hYmxlUGF0Y2hlc30gZnJvbSBcIi4vcGx1Z2lucy9wYXRjaGVzXCJcbmV4cG9ydCB7ZW5hYmxlTWFwU2V0fSBmcm9tIFwiLi9wbHVnaW5zL21hcHNldFwiXG4iLCAiZXhwb3J0IGZ1bmN0aW9uIHdhaXRGb3JFbGVtZW50KHNlbGVjdG9yKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgIGxldCBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuXG4gICAgaWYgKGVsKSB7XG4gICAgICByZXR1cm4gcmVzb2x2ZShlbCk7XG4gICAgfVxuXG4gICAgbGV0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xuICAgICAgbGV0IGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG5cbiAgICAgIGlmIChlbCkge1xuICAgICAgICBvYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgICAgIHJlc29sdmUoZWwpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgb2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5ib2R5LCB7XG4gICAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgICBzdWJ0cmVlOiB0cnVlLFxuICAgIH0pO1xuICB9KTtcbn1cbiIsICJleHBvcnQgZnVuY3Rpb24gY2xhc3NOYW1lKC4uLmNsYXNzZXMpIHtcbiAgcmV0dXJuIGNsYXNzZXNcbiAgICAubWFwKChjKSA9PiB7XG4gICAgICBpZiAodHlwZW9mIGMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBjO1xuICAgICAgfVxuXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShjKSkge1xuICAgICAgICByZXR1cm4gY2xhc3NOYW1lKC4uLmMpO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBPYmplY3QuZW50cmllcyhjKVxuICAgICAgICAgIC5maWx0ZXIoKFssIHZhbHVlXSkgPT4gdmFsdWUpXG4gICAgICAgICAgLm1hcCgoW2tleV0pID0+IGtleSlcbiAgICAgICAgICAuam9pbignICcpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gJyc7XG4gICAgfSlcbiAgICAuam9pbignICcpO1xufVxuIiwgIjxzY3JpcHQ+XG4gIGltcG9ydCB7IG9uTW91bnQgfSBmcm9tICdzdmVsdGUnO1xuXG4gIGxldCBlbDtcblxuICBvbk1vdW50KCgpID0+IHtcbiAgICBlbC5zdHlsZS5oZWlnaHQgPSBlbC5zY3JvbGxIZWlnaHQgKyAncHgnO1xuICAgIGVsLnN0eWxlLm92ZXJmbG93WSA9ICdoaWRkZW4nO1xuXG4gICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoKSA9PiB7XG4gICAgICBlbC5zdHlsZS5oZWlnaHQgPSAnYXV0byc7XG4gICAgICBlbC5zdHlsZS5oZWlnaHQgPSBlbC5zY3JvbGxIZWlnaHQgKyAncHgnO1xuICAgIH0pO1xuICB9KTtcbjwvc2NyaXB0PlxuXG48dGV4dGFyZWEgYmluZDp0aGlzPXtlbH0gb246Y2hhbmdlIG9uOmtleXByZXNzIHsuLi4kJHJlc3RQcm9wc30gLz5cbiIsICI8c2NyaXB0PlxuICBpbXBvcnQgeyBvbkRlc3Ryb3ksIG9uTW91bnQgfSBmcm9tICdzdmVsdGUnO1xuICBpbXBvcnQgeyBzY2FsZSB9IGZyb20gJ3N2ZWx0ZS90cmFuc2l0aW9uJztcblxuICBpbXBvcnQgeyBjbGFzc05hbWUgfSBmcm9tICcuLi8uLi9qcy91dGlscy9zdHlsZSc7XG5cbiAgZXhwb3J0IGxldCBpc09wZW4gPSBmYWxzZTtcbiAgZXhwb3J0IGxldCBzaXplID0gJ21kJztcblxuICBsZXQgbGlzdGVuZXI7XG4gIGxldCBwb3BvdmVyO1xuICBsZXQgdHJpZ2dlcjtcbiAgbGV0IGNvbnRlbnQ7XG5cbiAgLy8gVE9ETzogVXNlIEpTIHRvIGNhbGN1bGF0ZSBwb3NpdGlvbmluZ1xuICBvbk1vdW50KCgpID0+IHtcbiAgICBsaXN0ZW5lciA9IChlKSA9PiB7XG4gICAgICBpZiAocG9wb3ZlciAmJiAhcG9wb3Zlci5jb250YWlucyhlLnRhcmdldCkpIHtcbiAgICAgICAgaXNPcGVuID0gZmFsc2U7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgbGlzdGVuZXIpO1xuICB9KTtcblxuICBvbkRlc3Ryb3koKCkgPT4ge1xuICAgIGlmIChsaXN0ZW5lcikge1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBsaXN0ZW5lcik7XG4gICAgfVxuICB9KTtcbjwvc2NyaXB0PlxuXG48ZGl2IGNsYXNzPVwicmVsYXRpdmVcIiBiaW5kOnRoaXM9e3BvcG92ZXJ9PlxuICA8c2xvdCBuYW1lPVwidHJpZ2dlclwiPjwvc2xvdD5cblxuICB7I2lmIGlzT3Blbn1cbiAgICA8ZGl2XG4gICAgICBiaW5kOnRoaXM9e2NvbnRlbnR9XG4gICAgICBjbGFzcz17Y2xhc3NOYW1lKCdtZW51IGFic29sdXRlIHotcG9wb3ZlcicsIHNpemUpfVxuICAgICAgdHJhbnNpdGlvbjpzY2FsZT17e1xuICAgICAgICBkdXJhdGlvbjogMTAwLFxuICAgICAgICBvcGFjaXR5OiAwLFxuICAgICAgICBzdGFydDogMC45LFxuICAgICAgfX1cbiAgICA+XG4gICAgICA8c2xvdCBuYW1lPVwiY29udGVudFwiPjwvc2xvdD5cbiAgICA8L2Rpdj5cbiAgey9pZn1cbjwvZGl2PlxuIiwgIjxzY3JpcHQ+XG4gIGltcG9ydCB7IGNyZWF0ZU11dGF0aW9uLCBjcmVhdGVRdWVyeSB9IGZyb20gJ0B0YW5zdGFjay9zdmVsdGUtcXVlcnknO1xuICBpbXBvcnQgeyBvbkRlc3Ryb3ksIG9uTW91bnQgfSBmcm9tICdzdmVsdGUnO1xuICBpbXBvcnQgeyBkZXJpdmVkLCB3cml0YWJsZSB9IGZyb20gJ3N2ZWx0ZS9zdG9yZSc7XG5cbiAgaW1wb3J0IHsgY2xhc3NOYW1lIH0gZnJvbSAnLi4vLi4vanMvdXRpbHMvc3R5bGUnO1xuICBpbXBvcnQgUG9wb3ZlciBmcm9tICcuLi9jb21wb25lbnRzL1BvcG92ZXIuc3ZlbHRlJztcblxuICBleHBvcnQgbGV0IGlzT3BlbiA9IGZhbHNlO1xuICBleHBvcnQgbGV0IG9uQWRkTGFiZWw7XG5cbiAgbGV0IHRhZyA9ICcnO1xuICBsZXQgc2VhcmNoID0gJyc7XG4gIGxldCB0aW1lb3V0O1xuICBsZXQgc2VsZWN0ZWQgPSAtMTtcbiAgbGV0IGxpc3RlbmVyO1xuXG4gIGxldCBtdXRhdGlvbiA9IGNyZWF0ZU11dGF0aW9uKHtcbiAgICBtdXRhdGlvbkZuOiBhc3luYyAodGFnKSA9PiB7XG4gICAgICBsZXQgcmVzID0gYXdhaXQgZmV0Y2goJy9hcGkvbGFiZWxzJywge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyB0YWcgfSksXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICB9LFxuICAgICAgfSk7XG5cbiAgICAgIGxldCBkYXRhID0gYXdhaXQgcmVzLmpzb24oKTtcblxuICAgICAgaWYgKCFyZXMub2spIHtcbiAgICAgICAgLy8gVE9ETzogQWRkIHNvbWV0aGluZyB0byBwYXJzZSB0aGUgZXJyb3IgbWVzc2FnZXMgYXV0b21hdGljYWxseVxuICAgICAgICAvLyBUT0RPOiBIYW5kbGUgbGFiZWwgYWxyZWFkeSBleGlzdHMgYnkgYWRkaW5nIGl0XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihkYXRhLmVycm9ycy50YWcuam9pbignLCAnKSk7XG4gICAgICB9XG5cbiAgICAgIHNlbGVjdExhYmVsKGRhdGEpO1xuICAgIH0sXG4gIH0pO1xuXG4gICQ6IHtcbiAgICBpZiAodGltZW91dCAmJiBzZWFyY2ggIT09IHRhZykge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgIH1cblxuICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHNlYXJjaCA9IHRhZztcbiAgICB9LCAzMDApO1xuICB9XG5cbiAgJDogcXVlcnkgPSBjcmVhdGVRdWVyeSh7XG4gICAgcXVlcnlLZXk6IFsnbGFiZWxzJywgeyBzZWFyY2ggfV0sXG4gICAgcXVlcnlGbjogYXN5bmMgKCkgPT4ge1xuICAgICAgbGV0IHJlcyA9IGF3YWl0IGZldGNoKGAvYXBpL2xhYmVscz9zZWFyY2g9JHtzZWFyY2h9JmxpbWl0PTVgKTtcbiAgICAgIGxldCBkYXRhID0gYXdhaXQgcmVzLmpzb24oKTtcblxuICAgICAgc2VsZWN0ZWQgPSAtMTtcblxuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfSxcbiAgICBpbml0aWFsRGF0YTogW10sXG4gICAgZW5hYmxlZDogc2VhcmNoLmxlbmd0aCA+IDAsXG4gIH0pO1xuXG4gIGZ1bmN0aW9uIHNlbGVjdExhYmVsKGxhYmVsKSB7XG4gICAgb25BZGRMYWJlbChsYWJlbCk7XG5cbiAgICB0YWcgPSBzZWFyY2ggPSAnJztcbiAgICBpc09wZW4gPSBmYWxzZTtcbiAgICBzZWxlY3RlZCA9IC0xO1xuICB9XG5cbiAgZnVuY3Rpb24gY2xhbXBPdmVyZmxvdyhuLCB0b3RhbCkge1xuICAgIGlmIChuIDwgMCkge1xuICAgICAgcmV0dXJuIHRvdGFsIC0gMTtcbiAgICB9XG5cbiAgICBpZiAobiA+PSB0b3RhbCkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgcmV0dXJuIG47XG4gIH1cblxuICAvLyBUT0RPOiBBZGp1c3QgYWNjZXNzaWJpbGl0eSB0byBoYW5kbGUgYWN0aXZlIHNlbGVjdGlvbnNcbiAgZnVuY3Rpb24gaW5wdXRLZXlQcmVzcyhlKSB7XG4gICAgaWYgKGUua2V5ID09PSAnRW50ZXInKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIGxldCBsYWJlbDtcblxuICAgICAgaWYgKHNlbGVjdGVkICE9PSAtMSkge1xuICAgICAgICBsZXQgbGFiZWwgPSAkcXVlcnkuZGF0YVtzZWxlY3RlZF07XG4gICAgICB9XG5cbiAgICAgIGlmICh0YWcubGVuZ3RoID4gMCAmJiAoISRxdWVyeS5kYXRhLmxlbmd0aCB8fCBzZWxlY3RlZCA9PT0gLTEpKSB7XG4gICAgICAgIC8vIEZpbmQgYW4gZXhpc3RpbmcgbGFiZWwgaWYgaXQgaXMgaW4gdGhlIGxpc3RlbmVyXG4gICAgICAgIGxldCBleGlzdGluZyA9ICRxdWVyeS5kYXRhLmZpbmQoKGxhYmVsKSA9PiBsYWJlbC50YWcgPT09IHRhZyk7XG5cbiAgICAgICAgaWYgKGV4aXN0aW5nKSB7XG4gICAgICAgICAgc2VsZWN0TGFiZWwoZXhpc3RpbmcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICRtdXRhdGlvbi5tdXRhdGUodGFnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHNlbGVjdGVkICE9PSAtMSkge1xuICAgICAgICBsZXQgbGFiZWwgPSAkcXVlcnkuZGF0YVtzZWxlY3RlZF07XG5cbiAgICAgICAgaWYgKGxhYmVsKSB7XG4gICAgICAgICAgc2VsZWN0TGFiZWwobGFiZWwpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgb25Nb3VudCgoKSA9PiB7XG4gICAgbGlzdGVuZXIgPSAoZSkgPT4ge1xuICAgICAgaWYgKGUua2V5ID09PSAnQXJyb3dEb3duJykge1xuICAgICAgICBzZWxlY3RlZCA9IGNsYW1wT3ZlcmZsb3coc2VsZWN0ZWQgKyAxLCAkcXVlcnkuZGF0YS5sZW5ndGgpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZS5rZXkgPT09ICdBcnJvd1VwJykge1xuICAgICAgICBzZWxlY3RlZCA9IGNsYW1wT3ZlcmZsb3coc2VsZWN0ZWQgLSAxLCAkcXVlcnkuZGF0YS5sZW5ndGgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgbGlzdGVuZXIpO1xuICB9KTtcblxuICBvbkRlc3Ryb3koKCkgPT4ge1xuICAgIGlmIChsaXN0ZW5lcikge1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICBpZiAodGltZW91dCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgIH1cbiAgfSk7XG48L3NjcmlwdD5cblxuPFBvcG92ZXIge2lzT3Blbn0gc2l6ZT1cImxnXCI+XG4gIDxidXR0b25cbiAgICBhcmlhLWxhYmVsPVwiQWRkIHBvc2l0aW9ucyBvciBsYWJlbHMgdG8gdGVjaG5pcXVlXCJcbiAgICBjbGFzcz1cInRleHQtemluYy01MDAgaG92ZXI6dGV4dC16aW5jLTcwMCBkYXJrOmhvdmVyOnRleHQtemluYy0zMDAgdHJhbnNpdGlvbi1jb2xvcnNcIlxuICAgIHR5cGU9XCJidXR0b25cIlxuICAgIG9uOmNsaWNrPXsoKSA9PiAoaXNPcGVuID0gIWlzT3Blbil9XG4gICAgc2xvdD1cInRyaWdnZXJcIlxuICA+XG4gICAgPHNwYW4gY2xhc3M9XCJoZXJvLXRhZ1wiIC8+XG4gIDwvYnV0dG9uPlxuXG4gIDxkaXYgc2xvdD1cImNvbnRlbnRcIiBjbGFzcz1cImZsZXggZmxleC1jb2wgZ2FwLXktMlwiPlxuICAgIDxkaXYgY2xhc3M9XCJmbGV4IGZsZXgtcm93IGdhcC14LTIgaXRlbXMtY2VudGVyXCI+XG4gICAgICA8aW5wdXRcbiAgICAgICAgYmluZDp2YWx1ZT17dGFnfVxuICAgICAgICBjbGFzcz17Y2xhc3NOYW1lKFxuICAgICAgICAgICdmb2N1czpyaW5nLTAgYm9yZGVyIGJvcmRlci1zb2xpZCBib3JkZXItaW5kaWdvLTcwMCByb3VuZGVkLW1kJyxcbiAgICAgICAgICAnYmctbm9uZSBiZy10cmFuc3BhcmVudCBvdXRsaW5lLW5vbmUgcC0yIHctZnVsbCdcbiAgICAgICAgKX1cbiAgICAgICAgaWQ9XCJ0ZWNobmlxdWUtbGFiZWwtaW5wdXRcIlxuICAgICAgICBvbjprZXlwcmVzcz17aW5wdXRLZXlQcmVzc31cbiAgICAgICAgcGxhY2Vob2xkZXI9XCJndWFyZC9oYWxmXCJcbiAgICAgIC8+XG5cbiAgICAgIDxidXR0b25cbiAgICAgICAgYXJpYS1sYWJlbD1cIkFkZCBwb3NpdGlvblwiXG4gICAgICAgIGNsYXNzPVwiYnV0dG9uIHNtXCJcbiAgICAgICAgb246Y2xpY2s9eygpID0+ICRtdXRhdGlvbi5tdXRhdGUodGFnKX1cbiAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICA+XG4gICAgICAgIEFkZFxuICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+XG5cbiAgICB7I2lmICRxdWVyeS5kYXRhLmxlbmd0aCA+IDB9XG4gICAgICA8dWwgY2xhc3M9XCJmbGV4IGZsZXgtY29sIGdhcC15LTJcIj5cbiAgICAgICAgeyNlYWNoICRxdWVyeS5kYXRhIGFzIGxhYmVsLCBpbmRleCAobGFiZWwuaWQpfVxuICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgY2xhc3M9XCJvcHRpb24gdGV4dC1sZWZ0XCJcbiAgICAgICAgICAgICAgb246Y2xpY2s9eygpID0+IHNlbGVjdExhYmVsKGxhYmVsKX1cbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIHsuLi5zZWxlY3RlZCA9PT0gaW5kZXggPyB7ICdkYXRhLXNlbGVjdGVkJzogdHJ1ZSB9IDoge319XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICN7bGFiZWwudGFnfVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9saT5cbiAgICAgICAgey9lYWNofVxuICAgICAgPC91bD5cbiAgICB7L2lmfVxuICA8L2Rpdj5cbjwvUG9wb3Zlcj5cbiIsICI8c2NyaXB0PlxuICBpbXBvcnQgeyBvbkRlc3Ryb3ksIG9uTW91bnQgfSBmcm9tICdzdmVsdGUnO1xuICBpbXBvcnQgeyBmYWRlIH0gZnJvbSAnc3ZlbHRlL3RyYW5zaXRpb24nO1xuXG4gIGltcG9ydCB7IGNsYXNzTmFtZSB9IGZyb20gJy4uLy4uL2pzL3V0aWxzL3N0eWxlJztcblxuICBleHBvcnQgbGV0IGlzT3BlbiA9IGZhbHNlO1xuICBleHBvcnQgbGV0IG9uQ2xvc2U7XG4gIGV4cG9ydCBsZXQgc2l6ZSA9ICdtZCc7XG5cbiAgbGV0IGxpc3RlbmVyO1xuICBsZXQgbW9kYWw7XG5cbiAgb25Nb3VudCgoKSA9PiB7XG4gICAgbGlzdGVuZXIgPSAoZSkgPT4ge1xuICAgICAgaWYgKG1vZGFsICYmICFtb2RhbC5jb250YWlucyhlLnRhcmdldCkpIHtcbiAgICAgICAgb25DbG9zZSgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGxpc3RlbmVyKTtcbiAgfSk7XG5cbiAgb25EZXN0cm95KCgpID0+IHtcbiAgICBpZiAobGlzdGVuZXIpIHtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgbGlzdGVuZXIpO1xuICAgIH1cbiAgfSk7XG48L3NjcmlwdD5cblxueyNpZiBpc09wZW59XG4gIDxkaXZcbiAgICBjbGFzcz1cInJlbGF0aXZlIHotNTBcIlxuICAgIHRyYW5zaXRpb246ZmFkZT17e1xuICAgICAgZHVyYXRpb246IDEwMCxcbiAgICB9fVxuICA+XG4gICAgPGRpdlxuICAgICAgY2xhc3M9XCJiZy16aW5jLTUwLzkwIGRhcms6YmctemluYy04MDAvOTAgZml4ZWQgaW5zZXQtMCB0cmFuc2l0aW9uLW9wYWNpdHlcIlxuICAgICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcbiAgICAvPlxuICAgIDxkaXYgY2xhc3M9XCJmaXhlZCBpbnNldC0wIG92ZXJmbG93LXktYXV0b1wiIHJvbGU9XCJkaWFsb2dcIiBhcmlhLW1vZGFsPVwidHJ1ZVwiPlxuICAgICAgPGRpdiBjbGFzcz1cImZsZXggbWluLWgtZnVsbCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXJcIj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzPXtjbGFzc05hbWUoW1xuICAgICAgICAgICAgJ3ctZnVsbCBwLTQgc206cC02IGxnOnB5LTgnLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAnbWF4LXctbGcnOiBzaXplID09PSAnc20nLFxuICAgICAgICAgICAgICAnbWF4LXcteGwnOiBzaXplID09PSAnbWQnLFxuICAgICAgICAgICAgICAnbWF4LXctMnhsJzogc2l6ZSA9PT0gJ2xnJyxcbiAgICAgICAgICAgICAgJ21heC13LTN4bCc6IHNpemUgPT09ICd4bCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0pfVxuICAgICAgICAgIGJpbmQ6dGhpcz17bW9kYWx9XG4gICAgICAgID5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBjbGFzcz1cInNoYWRvdy16aW5jLTcwMC8xMCByaW5nLXppbmMtNzAwLzEwIHJlbGF0aXZlIHJvdW5kZWQtMnhsIGJnLXN0b25lLTMwMCBkYXJrOmJnLXppbmMtOTAwIHAtMTQgc2hhZG93LWxnIHJpbmctMSB0cmFuc2l0aW9uXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWJzb2x1dGUgdG9wLTYgcmlnaHQtNVwiPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgY2xhc3M9XCItbS0zIGZsZXgtbm9uZSBwLTMgb3BhY2l0eS0yMCBob3ZlcjpvcGFjaXR5LTQwXCJcbiAgICAgICAgICAgICAgICBvbjpjbGljaz17b25DbG9zZX1cbiAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPVwiY2xvc2VcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJoZXJvLXgtbWFyay1zb2xpZCBoLTUgdy01XCIgLz5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxzbG90Pjwvc2xvdD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbnsvaWZ9XG4iLCAiPHNjcmlwdD5cbiAgaW1wb3J0IHsgcHJvZHVjZSB9IGZyb20gJ2ltbWVyJztcbiAgaW1wb3J0IHsgZmFkZSB9IGZyb20gJ3N2ZWx0ZS90cmFuc2l0aW9uJztcblxuICBpbXBvcnQgeyB3YWl0Rm9yRWxlbWVudCB9IGZyb20gJy4uLy4uL2pzL3V0aWxzL2RvbSc7XG4gIGltcG9ydCB7IGNsYXNzTmFtZSB9IGZyb20gJy4uLy4uL2pzL3V0aWxzL3N0eWxlJztcbiAgaW1wb3J0IEF1dG9SZXNpemVUZXh0YXJlYSBmcm9tICcuLi9jb21wb25lbnRzL0F1dG9SZXNpemVUZXh0YXJlYS5zdmVsdGUnO1xuICBpbXBvcnQgTW9kYWwgZnJvbSAnLi4vY29tcG9uZW50cy9Nb2RhbC5zdmVsdGUnO1xuICBpbXBvcnQgUG9wb3ZlciBmcm9tICcuLi9jb21wb25lbnRzL1BvcG92ZXIuc3ZlbHRlJztcblxuICBleHBvcnQgbGV0IGNhbk1vdmVEb3duO1xuICBleHBvcnQgbGV0IGNhbk1vdmVVcDtcbiAgZXhwb3J0IGxldCBvbkNoYW5nZTtcbiAgZXhwb3J0IGxldCBvbkRlbGV0ZTtcbiAgZXhwb3J0IGxldCBvbk1vdmU7XG4gIGV4cG9ydCBsZXQgb25OZXh0O1xuICBleHBvcnQgbGV0IG51bWJlcjtcbiAgZXhwb3J0IGxldCBzdGVwO1xuXG4gIGxldCBpc0ZvY3VzTW9kYWxPcGVuID0gZmFsc2U7XG4gIGxldCBpc01lbnVPcGVuID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gbW92ZVN0ZXAoZGlyZWN0aW9uKSB7XG4gICAgaXNPcGVuID0gZmFsc2U7XG4gICAgb25Nb3ZlKHN0ZXAubGF5b3V0X2lkLCBkaXJlY3Rpb24pO1xuICB9XG5cbiAgZnVuY3Rpb24gYWRkRm9jdXMoKSB7XG4gICAgb25DaGFuZ2Uoc3RlcC5sYXlvdXRfaWQsICdmb2N1c2VzJywgWy4uLnN0ZXAuZm9jdXNlcywgeyBkZXNjcmlwdGlvbjogJycgfV0pO1xuICB9XG5cbiAgYXN5bmMgZnVuY3Rpb24gbmF2aWdhdGVUb0ZvY3VzKG51bWJlcikge1xuICAgIC8vIGxldCBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBzdGVwLWRlc2NyaXB0aW9uLSR7bnVtYmVyfWApO1xuICAgIC8vIGlmIChlbCkge1xuICAgIC8vICAgcmV0dXJuIGVsLmZvY3VzKCk7XG4gICAgLy8gfVxuICAgIC8vIGFkZFN0ZXAoKTtcbiAgICAvLyBlbCA9IGF3YWl0IHdhaXRGb3JFbGVtZW50KGAjc3RlcC1kZXNjcmlwdGlvbi0ke251bWJlcn1gKTtcbiAgICAvLyBlbC5mb2N1cygpO1xuICB9XG48L3NjcmlwdD5cblxuPGRpdlxuICBjbGFzcz1cImZsZXgganVzdGlmeS1lbmQgaXRlbXMtc3RhcnQgbXQtW2NhbGMoM3JlbV8tXzE2cHgpXVwiXG4gIHRyYW5zaXRpb246ZmFkZT17eyBkdXJhdGlvbjogMTAwIH19XG4+XG4gIDxzcGFuXG4gICAgY2xhc3M9e2NsYXNzTmFtZShcbiAgICAgICdpbmxpbmUtYmxvY2sgcHgtNiBweS0xIHJvdW5kZWQtZnVsbCcsXG4gICAgICAnYm9yZGVyIGJvcmRlci1zb2xpZCBib3JkZXItemluYy01MDAgZGFyazpib3JkZXItemluYy0zMDAnXG4gICAgKX0+U3RlcCB7bnVtYmVyfTwvc3BhblxuICA+XG48L2Rpdj5cblxuPGRpdlxuICBjbGFzcz17Y2xhc3NOYW1lKFxuICAgICdyb3VuZGVkLXhsIHctZnVsbCBweS0yIHB4LTMgYm9yZGVyIG5hdmlnYXRlVG9TdGVwYm9yZGVyLXNvbGlkJyxcbiAgICBzdGVwLmVycm9ycy5kZXNjcmlwdGlvbiA/ICdib3JkZXItcmVkLTkwMCcgOiAnYm9yZGVyLXppbmMtNTAwJ1xuICApfVxuICB0cmFuc2l0aW9uOmZhZGU9e3sgZHVyYXRpb246IDEwMCB9fVxuPlxuICA8QXV0b1Jlc2l6ZVRleHRhcmVhXG4gICAgaWQ9e2BzdGVwLWRlc2NyaXB0aW9uLSR7bnVtYmVyfWB9XG4gICAgb246Y2hhbmdlPXsoZSkgPT4gb25DaGFuZ2Uoc3RlcC5sYXlvdXRfaWQsICdkZXNjcmlwdGlvbicsIGUudGFyZ2V0LnZhbHVlKX1cbiAgICBvbjprZXlwcmVzcz17KGUpID0+IHtcbiAgICAgIGlmIChlLmtleSA9PT0gJ0VudGVyJyAmJiAoZS5jdHJsS2V5IHx8IGUubWV0YUtleSkpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBvbk5leHQoKTtcbiAgICAgIH1cbiAgICB9fVxuICAgIGNsYXNzPXtjbGFzc05hbWUoXG4gICAgICAnYmctbm9uZSBiZy10cmFuc3BhcmVudCBvdXRsaW5lLW5vbmUgYm9yZGVyLW5vbmUgcC0xJyxcbiAgICAgICd3LWZ1bGwgcmVzaXplLW5vbmUgbWluLWgtWzZyZW1dIGZvY3VzOnJpbmctMCdcbiAgICApfVxuICAgIHBsYWNlaG9sZGVyPVwiRGVzY3JpYmUgdGhlIHRoaXMgc3RlcFwiXG4gICAgdmFsdWU9e3N0ZXAuZGVzY3JpcHRpb259XG4gIC8+XG5cbiAgeyNpZiBzdGVwLmVycm9ycy5kZXNjcmlwdGlvbn1cbiAgICA8cCBjbGFzcz1cInRleHQtcmVkLTcwMCBkYXJrOnRleHQtcmVkLTMwMCB0ZXh0LXNtIG10LTFcIj5cbiAgICAgIHtzdGVwLmVycm9ycy5kZXNjcmlwdGlvbn1cbiAgICA8L3A+XG4gIHsvaWZ9XG5cbiAgPGRpdiBjbGFzcz1cImZsZXgganVzdGlmeS1lbmQgZ2FwLXgtMlwiPlxuICAgIDxNb2RhbFxuICAgICAgaXNPcGVuPXtpc0ZvY3VzTW9kYWxPcGVufVxuICAgICAgb25DbG9zZT17KCkgPT4gKGlzRm9jdXNNb2RhbE9wZW4gPSBmYWxzZSl9XG4gICAgICBzaXplPVwibWRcIlxuICAgID5cbiAgICAgIDxkaXYgY2xhc3M9XCJmbGV4IGZsZXgtY29sIGdhcC15LTJcIj5cbiAgICAgICAgPHAgY2xhc3M9XCJ0ZXh0LWxnXCI+QXQgdGhpcyBwb2ludDo8L3A+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzcz1cInJvdW5kZWQteGwgdy1mdWxsIHB5LTIgcHgtMyBib3JkZXIgYm9yZGVyLXNvbGlkIGJvcmRlci16aW5jLTUwMFwiXG4gICAgICAgID5cbiAgICAgICAgICA8cCBjbGFzcz1cInRleHQtemluYy01MDAgaXRhbGljXCI+XG4gICAgICAgICAgICB7c3RlcC5kZXNjcmlwdGlvbiB8fCAnTm8gZGVzY3JpcHRpb24gZ2l2ZW4uLi4nfVxuICAgICAgICAgIDwvcD5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPHAgY2xhc3M9XCJ0ZXh0LWxnXCI+Zm9jdXMgb246PC9wPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgY2xhc3M9XCJ3LWZ1bGwgZ3JpZCBncmlkLWNvbHMtWzVyZW1fMWZyXSBnYXAtNFwiPlxuICAgICAgICB7I2VhY2ggc3RlcC5mb2N1c2VzIGFzIGZvY3VzLCBpbmRleH1cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBjbGFzcz1cImZsZXgganVzdGlmeS1lbmQgaXRlbXMtc3RhcnQgbXQtNFwiXG4gICAgICAgICAgICB0cmFuc2l0aW9uOmZhZGU9e3sgZHVyYXRpb246IDEwMCB9fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgIGNsYXNzPXtjbGFzc05hbWUoXG4gICAgICAgICAgICAgICAgJ2lubGluZS1ibG9jayBweC0yIHB5LTAuNSByb3VuZGVkLWZ1bGwgdGV4dC1zbScsXG4gICAgICAgICAgICAgICAgJ2JvcmRlciBib3JkZXItc29saWQgYm9yZGVyLXppbmMtNTAwIGRhcms6Ym9yZGVyLXppbmMtMzAwJ1xuICAgICAgICAgICAgICApfT5Gb2N1cyB7aW5kZXggKyAxfTwvc3BhblxuICAgICAgICAgICAgPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgY2xhc3M9e2NsYXNzTmFtZShcbiAgICAgICAgICAgICAgJ3JvdW5kZWQteGwgdy1mdWxsIHB5LTIgcHgtMyBib3JkZXIgYm9yZGVyLXNvbGlkJyxcbiAgICAgICAgICAgICAgJ2JvcmRlci1hbWJlci01MDAnXG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgdHJhbnNpdGlvbjpmYWRlPXt7IGR1cmF0aW9uOiAxMDAgfX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8QXV0b1Jlc2l6ZVRleHRhcmVhXG4gICAgICAgICAgICAgIGlkPXtgc3RlcC1kZXNjcmlwdGlvbi0ke251bWJlcn1gfVxuICAgICAgICAgICAgICBvbjpjaGFuZ2U9eyhlKSA9PlxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlKHN0ZXAubGF5b3V0X2lkLCAnZGVzY3JpcHRpb24nLCBlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgIG9uOmtleXByZXNzPXsoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlLmtleSA9PT0gJ0VudGVyJyAmJiAoZS5jdHJsS2V5IHx8IGUubWV0YUtleSkpIHtcbiAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgIG9uTmV4dCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgY2xhc3M9e2NsYXNzTmFtZShcbiAgICAgICAgICAgICAgICAnYmctbm9uZSBiZy10cmFuc3BhcmVudCBvdXRsaW5lLW5vbmUgYm9yZGVyLW5vbmUgcC0xJyxcbiAgICAgICAgICAgICAgICAndy1mdWxsIHJlc2l6ZS1ub25lIG1pbi1oLVs2cmVtXSBmb2N1czpyaW5nLTAnXG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiV2hhdCBpcyB5b3VyIGZvY3VzP1wiXG4gICAgICAgICAgICAgIHZhbHVlPXtmb2N1cy5kZXNjcmlwdGlvbn1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIHsvZWFjaH1cblxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXNwYW4tMiBmbGV4IGZsZXgtcm93IGp1c3RpZnktY2VudGVyXCI+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgYXJpYS1sYWJlbD1cIkFkZCBmb2N1c1wiXG4gICAgICAgICAgICBjbGFzcz17Y2xhc3NOYW1lKFxuICAgICAgICAgICAgICAncC0xIHJvdW5kZWQtZnVsbCBib3JkZXIgYm9yZGVyLXNvbGlkIGJvcmRlci16aW5jLTUwMCB0cmFuc2l0aW9uLWNvbG9ycycsXG4gICAgICAgICAgICAgICdob3ZlcjpiZy16aW5jLTMwMCBkYXJrOmhvdmVyOmJnLXppbmMtNzAwIGhvdmVyOnRleHQtemluYy05MDAgZGFyazpob3Zlcjp0ZXh0LXppbmMtMjAwJ1xuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIG9uOmNsaWNrPXthZGRGb2N1c31cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaGVyby1wbHVzXCIgLz5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L01vZGFsPlxuXG4gICAgPGJ1dHRvblxuICAgICAgYXJpYS1sYWJlbD1cIkVkaXQgZm9jdXNlc1wiXG4gICAgICBjbGFzcz1cInRleHQtemluYy01MDAgaG92ZXI6dGV4dC16aW5jLTcwMCBkYXJrOmhvdmVyOnRleHQtemluYy0zMDAgdHJhbnNpdGlvbi1jb2xvcnNcIlxuICAgICAgb246Y2xpY2t8c3RvcFByb3BhZ2F0aW9uPXsoKSA9PiAoaXNGb2N1c01vZGFsT3BlbiA9IHRydWUpfVxuICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgPlxuICAgICAgPHNwYW4gY2xhc3M9XCJoZXJvLWV4Y2xhbWF0aW9uLWNpcmNsZVwiIC8+XG4gICAgPC9idXR0b24+XG5cbiAgICA8UG9wb3ZlciBpc09wZW49e2lzTWVudU9wZW59PlxuICAgICAgPGJ1dHRvblxuICAgICAgICBhcmlhLWxhYmVsPVwiRWRpdCBzdGVwXCJcbiAgICAgICAgY2xhc3M9XCJ0ZXh0LXppbmMtNTAwIGhvdmVyOnRleHQtemluYy03MDAgZGFyazpob3Zlcjp0ZXh0LXppbmMtMzAwIHRyYW5zaXRpb24tY29sb3JzXCJcbiAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgIG9uOmNsaWNrPXsoKSA9PiAoaXNNZW51T3BlbiA9ICFpc01lbnVPcGVuKX1cbiAgICAgICAgc2xvdD1cInRyaWdnZXJcIlxuICAgICAgPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImhlcm8tY29nLTYtdG9vdGhcIiAvPlxuICAgICAgPC9idXR0b24+XG5cbiAgICAgIDx1bCBjbGFzcz1cImZsZXggZmxleC1jb2wgZ2FwLXktMlwiIHNsb3Q9XCJjb250ZW50XCI+XG4gICAgICAgIHsjaWYgY2FuTW92ZVVwfVxuICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgY2xhc3M9XCJvcHRpb24gZmxleCBqdXN0aWZ5LWJldHdlZW5cIlxuICAgICAgICAgICAgICBvbjpjbGljaz17KCkgPT4gbW92ZVN0ZXAoLTEpfVxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgTW92ZSBVcFxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImhlcm8tYXJyb3ctdXBcIiAvPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9saT5cbiAgICAgICAgey9pZn1cblxuICAgICAgICB7I2lmIGNhbk1vdmVEb3dufVxuICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgY2xhc3M9XCJvcHRpb24gZmxleCBqdXN0aWZ5LWJldHdlZW5cIlxuICAgICAgICAgICAgICBvbjpjbGljaz17KCkgPT4gbW92ZVN0ZXAoMSl9XG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICBNb3ZlIERvd25cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJoZXJvLWFycm93LWRvd25cIiAvPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9saT5cbiAgICAgICAgey9pZn1cblxuICAgICAgICA8bGk+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgY2xhc3M9XCJvcHRpb24gZmxleCBqdXN0aWZ5LWJldHdlZW5cIlxuICAgICAgICAgICAgb246Y2xpY2s9eygpID0+IG9uRGVsZXRlKHN0ZXAubGF5b3V0X2lkKX1cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIFJlbW92ZVxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJoZXJvLXRyYXNoXCIgLz5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9saT5cbiAgICAgIDwvdWw+XG4gICAgPC9Qb3BvdmVyPlxuICA8L2Rpdj5cbjwvZGl2PlxuIiwgIjxzY3JpcHQ+XG4gIGltcG9ydCB7IHByb2R1Y2UgfSBmcm9tICdpbW1lcic7XG5cbiAgaW1wb3J0IHsgd2FpdEZvckVsZW1lbnQgfSBmcm9tICcuLi8uLi9qcy91dGlscy9kb20nO1xuICBpbXBvcnQgeyBjbGFzc05hbWUgfSBmcm9tICcuLi8uLi9qcy91dGlscy9zdHlsZSc7XG4gIGltcG9ydCBBdXRvUmVzaXplVGV4dGFyZWEgZnJvbSAnLi4vY29tcG9uZW50cy9BdXRvUmVzaXplVGV4dGFyZWEuc3ZlbHRlJztcbiAgaW1wb3J0IFBvcG92ZXIgZnJvbSAnLi4vY29tcG9uZW50cy9Qb3BvdmVyLnN2ZWx0ZSc7XG4gIGltcG9ydCBMYWJlbFBvcG92ZXIgZnJvbSAnLi9MYWJlbFBvcG92ZXIuc3ZlbHRlJztcbiAgaW1wb3J0IFN0ZXBDYXJkIGZyb20gJy4vU3RlcENhcmQuc3ZlbHRlJztcblxuICBleHBvcnQgbGV0IGFjdGlvbjtcbiAgZXhwb3J0IGxldCBlcnJvcnMgPSB7fTtcbiAgZXhwb3J0IGxldCBsaXZlO1xuICBleHBvcnQgbGV0IHRlY2huaXF1ZTtcblxuICBsZXQgZm9ybSA9IHsgLi4udGVjaG5pcXVlIH07XG4gIGxldCBpc0xhYmVsTWVudU9wZW4gPSBmYWxzZTtcblxuICAkOiBvcmRlcmVkU3RlcHMgPSBmb3JtLmxheW91dC5tYXAoKG5vZGUpID0+IHtcbiAgICBsZXQgaW5kZXggPSBmb3JtLnN0ZXBzLmZpbmRJbmRleChcbiAgICAgIChzdGVwKSA9PiBzdGVwLmxheW91dF9pZCA9PT0gbm9kZS5sYXlvdXRfaWRcbiAgICApO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLmZvcm0uc3RlcHNbaW5kZXhdLFxuICAgICAgZXJyb3JzOiBlcnJvcnMuc3RlcHMgPyBlcnJvcnMuc3RlcHNbaW5kZXhdIDoge30sXG4gICAgfTtcbiAgfSk7XG5cbiAgZnVuY3Rpb24gYWRkU3RlcCgpIHtcbiAgICBmb3JtID0gcHJvZHVjZShmb3JtLCAoZHJhZnQpID0+IHtcbiAgICAgIC8vIEZpbmQgdGhlIGhpZ2hlc3QgbGF5b3V0IElEIGFuZCBpbmNyZW1lbnQgaXQgdG8gZW5zdXJlIHVuaXF1ZW5lc3NcbiAgICAgIGxldCBpZCA9XG4gICAgICAgIChmb3JtLnN0ZXBzXG4gICAgICAgICAgLm1hcCgoc3RlcCkgPT4gc3RlcC5sYXlvdXRfaWQpXG4gICAgICAgICAgLnNvcnQoKGEsIGIpID0+IGEgLSBiKVxuICAgICAgICAgIC5wb3AoKSB8fCAwKSArIDE7XG5cbiAgICAgIGRyYWZ0LnN0ZXBzLnB1c2goe1xuICAgICAgICBkZXNjcmlwdGlvbjogJycsXG4gICAgICAgIGxheW91dF9pZDogaWQsXG4gICAgICB9KTtcblxuICAgICAgZHJhZnQubGF5b3V0LnB1c2goe1xuICAgICAgICBsYXlvdXRfaWQ6IGlkLFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBkZWxldGVTdGVwKGlkKSB7XG4gICAgZm9ybSA9IHByb2R1Y2UoZm9ybSwgKGRyYWZ0KSA9PiB7XG4gICAgICBkcmFmdC5zdGVwcyA9IGRyYWZ0LnN0ZXBzLmZpbHRlcigoc3RlcCkgPT4gc3RlcC5sYXlvdXRfaWQgIT09IGlkKTtcbiAgICAgIGRyYWZ0LmxheW91dCA9IGRyYWZ0LmxheW91dC5maWx0ZXIoKGNoaWxkKSA9PiBjaGlsZC5sYXlvdXRfaWQgIT09IGlkKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZVN0ZXAoaWQsIGtleSwgdmFsdWUpIHtcbiAgICBmb3JtID0gcHJvZHVjZShmb3JtLCAoZHJhZnQpID0+IHtcbiAgICAgIGxldCBzdGVwID0gZHJhZnQuc3RlcHMuZmluZCgoc3RlcCkgPT4gc3RlcC5sYXlvdXRfaWQgPT09IGlkKTtcbiAgICAgIHN0ZXBba2V5XSA9IHZhbHVlO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gbW92ZVN0ZXAoaWQsIGRpcmVjdGlvbikge1xuICAgIGxldCBpbmRleCA9IGZvcm0ubGF5b3V0LmZpbmRJbmRleCgobm9kZSkgPT4gbm9kZS5sYXlvdXRfaWQgPT09IGlkKTtcbiAgICBsZXQgbmV3SW5kZXggPSBpbmRleCArIGRpcmVjdGlvbjtcblxuICAgIGlmIChuZXdJbmRleCA8IDAgfHwgbmV3SW5kZXggPj0gZm9ybS5sYXlvdXQubGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZm9ybSA9IHByb2R1Y2UoZm9ybSwgKGRyYWZ0KSA9PiB7XG4gICAgICBkcmFmdC5sYXlvdXQuc3BsaWNlKG5ld0luZGV4LCAwLCBkcmFmdC5sYXlvdXQuc3BsaWNlKGluZGV4LCAxKVswXSk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBzdWJtaXQoKSB7XG4gICAgbGl2ZS5wdXNoRXZlbnRUbygnI3RlY2huaXF1ZS1mb3JtJywgJ3NhdmUnLCB7IHRlY2huaXF1ZTogZm9ybSB9KTtcbiAgfVxuXG4gIGFzeW5jIGZ1bmN0aW9uIG5hdmlnYXRlVG9TdGVwKG51bWJlcikge1xuICAgIGxldCBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBzdGVwLWRlc2NyaXB0aW9uLSR7bnVtYmVyfWApO1xuXG4gICAgaWYgKGVsKSB7XG4gICAgICByZXR1cm4gZWwuZm9jdXMoKTtcbiAgICB9XG5cbiAgICBhZGRTdGVwKCk7XG5cbiAgICBlbCA9IGF3YWl0IHdhaXRGb3JFbGVtZW50KGAjc3RlcC1kZXNjcmlwdGlvbi0ke251bWJlcn1gKTtcbiAgICBlbC5mb2N1cygpO1xuICB9XG5cbiAgYXN5bmMgZnVuY3Rpb24gb3BlbkxhYmVsTWVudSgpIHtcbiAgICBpc0xhYmVsTWVudU9wZW4gPSAhaXNMYWJlbE1lbnVPcGVuO1xuICAgIGxldCBlbCA9IGF3YWl0IHdhaXRGb3JFbGVtZW50KCcjdGVjaG5pcXVlLWxhYmVsLWlucHV0Jyk7XG4gICAgZWwuZm9jdXMoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZExhYmVsKGxhYmVsKSB7XG4gICAgZm9ybSA9IHByb2R1Y2UoZm9ybSwgKGRyYWZ0KSA9PiB7XG4gICAgICBkcmFmdC5sYWJlbHMucHVzaChsYWJlbCk7XG4gICAgfSk7XG5cbiAgICBpc0xhYmVsTWVudU9wZW4gPSBmYWxzZTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGVzY3JpcHRpb24nKS5mb2N1cygpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlTGFiZWwoaWQpIHtcbiAgICBmb3JtID0gcHJvZHVjZShmb3JtLCAoZHJhZnQpID0+IHtcbiAgICAgIGRyYWZ0LmxhYmVscyA9IGRyYWZ0LmxhYmVscy5maWx0ZXIoKGxhYmVsKSA9PiBsYWJlbC5pZCAhPT0gaWQpO1xuICAgIH0pO1xuICB9XG48L3NjcmlwdD5cblxuPGZvcm0gYXV0b2NvbXBsZXRlPVwib2ZmXCIgb246c3VibWl0fHByZXZlbnREZWZhdWx0PXtzdWJtaXR9PlxuICA8ZGl2IGNsYXNzPVwibWItOFwiPlxuICAgIDxpbnB1dFxuICAgICAgb246Y2hhbmdlPXsoZSkgPT4gKGZvcm0ubmFtZSA9IGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgIHZhbHVlPXtmb3JtLm5hbWV9XG4gICAgICBjbGFzcz17Y2xhc3NOYW1lKFxuICAgICAgICAndGV4dC02eGwgcHgtMyBweS00IGgtWzkycHhdIHBsYWNlaG9sZGVyOnRleHQtbmV1dHJhbC01MDAgdy1mdWxsIG91dGxpbmUtbm9uZSBib3JkZXItYicsXG4gICAgICAgICd0ZXh0LW5ldXRyYWwtOTAwIGRhcms6dGV4dC1uZXV0cmFsLTMwMCBiZy10cmFuc3BhcmVudCB0cmFuc2l0aW9uLWNvbG9ycycsXG4gICAgICAgIHtcbiAgICAgICAgICAnYm9yZGVyLXJlZC05MDAgcGxhY2Vob2xkZXI6dGV4dC1yZWQtNDAwIGRhcms6cGxhY2Vob2xkZXI6dGV4dC1yZWQtMzAwJzpcbiAgICAgICAgICAgIGVycm9ycy5uYW1lLFxuICAgICAgICAgICdib3JkZXItemluYy00MDAgZGFyazpib3JkZXItemluYy01MDAgZm9jdXM6Ym9yZGVyLXppbmMtNTAwIGRhcms6Zm9jdXM6Ym9yZGVyLXppbmMtMTAwJzpcbiAgICAgICAgICAgICFlcnJvcnMubmFtZSxcbiAgICAgICAgfVxuICAgICAgKX1cbiAgICAgIHBsYWNlaG9sZGVyPVwiVGVjaG5pcXVlIG5hbWVcIlxuICAgIC8+XG5cbiAgICB7I2lmIGVycm9ycy5uYW1lfVxuICAgICAgPHAgY2xhc3M9XCJ0ZXh0LXJlZC03MDAgZGFyazp0ZXh0LXJlZC0zMDAgdGV4dC1zbSBtdC0xXCI+e2Vycm9ycy5uYW1lfTwvcD5cbiAgICB7L2lmfVxuICA8L2Rpdj5cblxuICA8ZGl2IGNsYXNzPVwidy1mdWxsIGdyaWQgZ3JpZC1jb2xzLVs4cmVtXzFmcl0gZ2FwLTRcIj5cbiAgICA8ZGl2IGNsYXNzPVwiZmxleCBqdXN0aWZ5LWVuZCBpdGVtcy1zdGFydCBtdC1bY2FsYygzcmVtXy1fMTZweCldXCI+XG4gICAgICA8c3BhblxuICAgICAgICBjbGFzcz17Y2xhc3NOYW1lKFxuICAgICAgICAgICdpbmxpbmUtYmxvY2sgcHgtNiBweS0xIHJvdW5kZWQtZnVsbCcsXG4gICAgICAgICAgJ2JvcmRlciBib3JkZXItc29saWQgYm9yZGVyLXppbmMtNTAwIGRhcms6Ym9yZGVyLXppbmMtMzAwJ1xuICAgICAgICApfT5TdGFydDwvc3BhblxuICAgICAgPlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdlxuICAgICAgY2xhc3M9e2NsYXNzTmFtZShcbiAgICAgICAgJ3JvdW5kZWQteGwgdy1mdWxsIHB5LTIgcHgtMycsXG4gICAgICAgICdib3JkZXIgYm9yZGVyLXNvbGlkIGJvcmRlci16aW5jLTUwMCcsXG4gICAgICAgICdiZy1ncmFkaWVudC10by1iciBmcm9tLWluZGlnby05NTAgdG8temluYy05MDAgdG8tNTAlJ1xuICAgICAgKX1cbiAgICA+XG4gICAgICA8QXV0b1Jlc2l6ZVRleHRhcmVhXG4gICAgICAgIGF1dG9mb2N1c1xuICAgICAgICBpZD1cImRlc2NyaXB0aW9uXCJcbiAgICAgICAgb246Y2hhbmdlPXsoZSkgPT4gKGZvcm0uZGVzY3JpcHRpb24gPSBlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgIG9uOmtleXByZXNzPXsoZSkgPT4ge1xuICAgICAgICAgIGlmIChlLmtleSA9PT0gJ0VudGVyJyAmJiAoZS5jdHJsS2V5IHx8IGUubWV0YUtleSkpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIG5hdmlnYXRlVG9TdGVwKDEpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoZS5rZXkgPT09ICcjJykge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgb3BlbkxhYmVsTWVudSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfX1cbiAgICAgICAgdmFsdWU9e2Zvcm0uZGVzY3JpcHRpb259XG4gICAgICAgIGFyaWEtbGFiZWw9XCJEZXNjcmlwdGlvbiBvZiBzdGFydGluZyBwb3NpdGlvblwiXG4gICAgICAgIGNsYXNzPXtjbGFzc05hbWUoXG4gICAgICAgICAgJ2JnLW5vbmUgYmctdHJhbnNwYXJlbnQgb3V0bGluZS1ub25lIGJvcmRlci1ub25lIHAtMScsXG4gICAgICAgICAgJ3ctZnVsbCByZXNpemUtbm9uZSBtaW4taC1bNnJlbV0gZm9jdXM6cmluZy0wJ1xuICAgICAgICApfVxuICAgICAgICBwbGFjZWhvbGRlcj1cIkRlc2NyaWJlIHRoZSBzdGFydGluZyBwb3NpdGlvbiBmb3IgdGhpcyB0ZWNobmlxdWVcIlxuICAgICAgLz5cblxuICAgICAgPGRpdiBjbGFzcz1cImZsZXgganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJmbGV4IGZsZXgtcm93IGdhcC14LTIgZ3Jvd1wiPlxuICAgICAgICAgIHsjZWFjaCBmb3JtLmxhYmVscyBhcyBsYWJlbCAobGFiZWwuaWQpfVxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBjbGFzcz17Y2xhc3NOYW1lKFxuICAgICAgICAgICAgICAgICdpbmxpbmUtZmxleCBnYXAteC0wLjUgaXRlbXMtY2VudGVyIHB4LTMgcm91bmRlZC1mdWxsIGxlYWRpbmctNyBiZy1pbmRpZ28tODAwJyxcbiAgICAgICAgICAgICAgICAnYm9yZGVyIGJvcmRlci1zb2xpZCBib3JkZXItemluYy01MDAgZGFyazpib3JkZXItemluYy0zMDAnXG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIG9uOmNsaWNrPXsoKSA9PiByZW1vdmVMYWJlbChsYWJlbC5pZCl9XG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRleHQtemluYy0zMDBcIj4je2xhYmVsLnRhZ308L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJoZXJvLXgtbWFyay1taWNybyB0ZXh0LXppbmMtNTAwIGhvdmVyOnRleHQtemluYy0zMDBcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgey9lYWNofVxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8TGFiZWxQb3BvdmVyIGlzT3Blbj17aXNMYWJlbE1lbnVPcGVufSBvbkFkZExhYmVsPXthZGRMYWJlbH0gLz5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuXG4gICAgeyNlYWNoIG9yZGVyZWRTdGVwcyBhcyBzdGVwLCBpbmRleCAoc3RlcC5sYXlvdXRfaWQpfVxuICAgICAgPFN0ZXBDYXJkXG4gICAgICAgIGNhbk1vdmVEb3duPXtpbmRleCA8IG9yZGVyZWRTdGVwcy5sZW5ndGggLSAxfVxuICAgICAgICBjYW5Nb3ZlVXA9e2luZGV4ID4gMH1cbiAgICAgICAgb25DaGFuZ2U9e3VwZGF0ZVN0ZXB9XG4gICAgICAgIG9uRGVsZXRlPXtkZWxldGVTdGVwfVxuICAgICAgICBvbk1vdmU9e21vdmVTdGVwfVxuICAgICAgICBvbk5leHQ9eygpID0+IG5hdmlnYXRlVG9TdGVwKGluZGV4ICsgMil9XG4gICAgICAgIG51bWJlcj17aW5kZXggKyAxfVxuICAgICAgICB7c3RlcH1cbiAgICAgIC8+XG4gICAgey9lYWNofVxuXG4gICAgPGRpdiBjbGFzcz1cImNvbC1zdGFydC0yIGZsZXggZmxleC1yb3cganVzdGlmeS1jZW50ZXJcIj5cbiAgICAgIDxidXR0b25cbiAgICAgICAgYXJpYS1sYWJlbD1cIkFkZCBzdGVwXCJcbiAgICAgICAgY2xhc3M9e2NsYXNzTmFtZShcbiAgICAgICAgICAncC0xIHJvdW5kZWQtZnVsbCBib3JkZXIgYm9yZGVyLXNvbGlkIGJvcmRlci16aW5jLTUwMCB0cmFuc2l0aW9uLWNvbG9ycycsXG4gICAgICAgICAgJ2hvdmVyOmJnLXppbmMtMzAwIGRhcms6aG92ZXI6YmctemluYy03MDAgaG92ZXI6dGV4dC16aW5jLTkwMCBkYXJrOmhvdmVyOnRleHQtemluYy0yMDAnXG4gICAgICAgICl9XG4gICAgICAgIG9uOmNsaWNrPXthZGRTdGVwfVxuICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgID5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJoZXJvLXBsdXNcIiAvPlxuICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuXG4gIDxkaXYgY2xhc3M9XCJmbGV4IGp1c3RpZnktZW5kIG10LTYgZ2FwLXgtMlwiPlxuICAgIHsjaWYgYWN0aW9uID09PSAnZWRpdCd9XG4gICAgICA8YVxuICAgICAgICBjbGFzcz1cImJ1dHRvbiBvdXRsaW5lZFwiXG4gICAgICAgIGhyZWY9e2AvdGVjaG5pcXVlcy8ke3RlY2huaXF1ZS5pZH1gfVxuICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgZGF0YS1waHgtbGluaz1cInBhdGNoXCJcbiAgICAgICAgZGF0YS1waHgtbGluay1zdGF0ZT1cInB1c2hcIlxuICAgICAgPlxuICAgICAgICBDYW5jZWxcbiAgICAgIDwvYT5cbiAgICB7L2lmfVxuXG4gICAgPGJ1dHRvbiBjbGFzcz1cImJ1dHRvblwiIHR5cGU9XCJzdWJtaXRcIj5cbiAgICAgIHthY3Rpb24gPT09ICduZXcnID8gJ0NyZWF0ZScgOiAnVXBkYXRlJ31cbiAgICA8L2J1dHRvbj5cbiAgPC9kaXY+XG48L2Zvcm0+XG4iLCAiPHNjcmlwdD5cbiAgaW1wb3J0IHsgUXVlcnlDbGllbnQsIFF1ZXJ5Q2xpZW50UHJvdmlkZXIgfSBmcm9tICdAdGFuc3RhY2svc3ZlbHRlLXF1ZXJ5JztcblxuICBpbXBvcnQgRm9ybSBmcm9tICcuL3RlY2huaXF1ZV9mb3JtL0Zvcm0uc3ZlbHRlJztcblxuICBleHBvcnQgbGV0IGFjdGlvbjtcbiAgZXhwb3J0IGxldCBlcnJvcnM7XG4gIGV4cG9ydCBsZXQgbGl2ZTtcbiAgZXhwb3J0IGxldCB0ZWNobmlxdWU7XG5cbiAgbGV0IGNsaWVudCA9IG5ldyBRdWVyeUNsaWVudCgpO1xuPC9zY3JpcHQ+XG5cbjxRdWVyeUNsaWVudFByb3ZpZGVyIHtjbGllbnR9PlxuICA8Rm9ybSB7YWN0aW9ufSB7ZXJyb3JzfSB7bGl2ZX0ge3RlY2huaXF1ZX0gLz5cbjwvUXVlcnlDbGllbnRQcm92aWRlcj5cbiIsICJleHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplQ29tcG9uZW50cyhjb21wb25lbnRzKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGNvbXBvbmVudHMuZGVmYXVsdCkgfHwgIUFycmF5LmlzQXJyYXkoY29tcG9uZW50cy5maWxlbmFtZXMpKSByZXR1cm4gY29tcG9uZW50c1xuXG4gICAgY29uc3Qgbm9ybWFsaXplZCA9IHt9XG4gICAgZm9yIChjb25zdCBbaW5kZXgsIG1vZHVsZV0gb2YgY29tcG9uZW50cy5kZWZhdWx0LmVudHJpZXMoKSkge1xuICAgICAgICBjb25zdCBDb21wb25lbnQgPSBtb2R1bGUuZGVmYXVsdFxuICAgICAgICBjb25zdCBuYW1lID0gY29tcG9uZW50cy5maWxlbmFtZXNbaW5kZXhdLnJlcGxhY2UoXCIuLi9zdmVsdGUvXCIsIFwiXCIpLnJlcGxhY2UoXCIuc3ZlbHRlXCIsIFwiXCIpXG4gICAgICAgIG5vcm1hbGl6ZWRbbmFtZV0gPSBDb21wb25lbnRcbiAgICB9XG4gICAgcmV0dXJuIG5vcm1hbGl6ZWRcbn1cbiIsICJpbXBvcnQge25vcm1hbGl6ZUNvbXBvbmVudHN9IGZyb20gXCIuL3V0aWxzXCJcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFJlbmRlcihjb21wb25lbnRzKSB7XG4gICAgY29tcG9uZW50cyA9IG5vcm1hbGl6ZUNvbXBvbmVudHMoY29tcG9uZW50cylcblxuICAgIHJldHVybiBmdW5jdGlvbiByZW5kZXIobmFtZSwgcHJvcHMsIHNsb3RzKSB7XG4gICAgICAgIGNvbnN0IENvbXBvbmVudCA9IGNvbXBvbmVudHNbbmFtZV1cbiAgICAgICAgY29uc3QgJCRzbG90cyA9IE9iamVjdC5mcm9tRW50cmllcyhPYmplY3QuZW50cmllcyhzbG90cykubWFwKChbaywgdl0pID0+IFtrLCAoKSA9PiB2XSkpXG4gICAgICAgIHJldHVybiBDb21wb25lbnQucmVuZGVyKHByb3BzLCB7JCRzbG90c30pXG4gICAgfVxufVxuIiwgImltcG9ydCB7bm9ybWFsaXplQ29tcG9uZW50c30gZnJvbSBcIi4vdXRpbHNcIlxuXG5mdW5jdGlvbiBnZXRBdHRyaWJ1dGVKc29uKHJlZiwgYXR0cmlidXRlTmFtZSkge1xuICAgIGNvbnN0IGRhdGEgPSByZWYuZWwuZ2V0QXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUpXG4gICAgcmV0dXJuIGRhdGEgPyBKU09OLnBhcnNlKGRhdGEpIDoge31cbn1cblxuZnVuY3Rpb24gZGV0YWNoKG5vZGUpIHtcbiAgICBub2RlLnBhcmVudE5vZGU/LnJlbW92ZUNoaWxkKG5vZGUpXG59XG5cbmZ1bmN0aW9uIGluc2VydCh0YXJnZXQsIG5vZGUsIGFuY2hvcikge1xuICAgIHRhcmdldC5pbnNlcnRCZWZvcmUobm9kZSwgYW5jaG9yIHx8IG51bGwpXG59XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5mdW5jdGlvbiBnZXRTbG90cyhyZWYpIHtcbiAgICBjb25zdCBzbG90cyA9IHt9XG5cbiAgICBmb3IgKGNvbnN0IHNsb3ROYW1lIGluIGdldEF0dHJpYnV0ZUpzb24ocmVmLCBcImRhdGEtc2xvdHNcIikpIHtcbiAgICAgICAgY29uc3Qgc2xvdCA9ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgZ2V0RWxlbWVudCgpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYmFzZTY0ID0gZ2V0QXR0cmlidXRlSnNvbihyZWYsIFwiZGF0YS1zbG90c1wiKVtzbG90TmFtZV1cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5pbm5lckhUTUwgPSBhdG9iKGJhc2U2NCkudHJpbSgpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlbGVtZW50XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB1cGRhdGUoKSB7XG4gICAgICAgICAgICAgICAgICAgIGRldGFjaCh0aGlzLnNhdmVkRWxlbWVudClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zYXZlZEVsZW1lbnQgPSB0aGlzLmdldEVsZW1lbnQoKVxuICAgICAgICAgICAgICAgICAgICBpbnNlcnQodGhpcy5zYXZlZFRhcmdldCwgdGhpcy5zYXZlZEVsZW1lbnQsIHRoaXMuc2F2ZWRBbmNob3IpXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjOiBub29wLFxuICAgICAgICAgICAgICAgIG0odGFyZ2V0LCBhbmNob3IpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zYXZlZFRhcmdldCA9IHRhcmdldFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNhdmVkQW5jaG9yID0gYW5jaG9yXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2F2ZWRFbGVtZW50ID0gdGhpcy5nZXRFbGVtZW50KClcbiAgICAgICAgICAgICAgICAgICAgaW5zZXJ0KHRoaXMuc2F2ZWRUYXJnZXQsIHRoaXMuc2F2ZWRFbGVtZW50LCB0aGlzLnNhdmVkQW5jaG9yKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZChkZXRhY2hpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRldGFjaGluZykgZGV0YWNoKHRoaXMuc2F2ZWRFbGVtZW50KVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbDogbm9vcCxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHNsb3RzW3Nsb3ROYW1lXSA9IFtzbG90XVxuICAgIH1cblxuICAgIHJldHVybiBzbG90c1xufVxuXG5mdW5jdGlvbiBnZXRMaXZlSnNvblByb3BzKHJlZikge1xuICAgIGNvbnN0IGpzb24gPSBnZXRBdHRyaWJ1dGVKc29uKHJlZiwgXCJkYXRhLWxpdmUtanNvblwiKVxuXG4gICAgLy8gT24gU1NSLCBkYXRhLWxpdmUtanNvbiBpcyB0aGUgZnVsbCBvYmplY3Qgd2Ugd2FudFxuICAgIC8vIEFmdGVyIFNTUiwgZGF0YS1saXZlLWpzb24gaXMgYW4gYXJyYXkgb2Yga2V5cywgYW5kIHdlJ2xsIGdldCB0aGUgZGF0YSBmcm9tIHRoZSB3aW5kb3dcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoanNvbikpIHJldHVybiBqc29uXG5cbiAgICBjb25zdCBsaXZlSnNvbkRhdGEgPSB7fVxuICAgIGZvciAoY29uc3QgbGl2ZUpzb25WYXJpYWJsZSBvZiBqc29uKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSB3aW5kb3dbbGl2ZUpzb25WYXJpYWJsZV1cbiAgICAgICAgaWYgKGRhdGEpIGxpdmVKc29uRGF0YVtsaXZlSnNvblZhcmlhYmxlXSA9IGRhdGFcbiAgICB9XG4gICAgcmV0dXJuIGxpdmVKc29uRGF0YVxufVxuXG5mdW5jdGlvbiBnZXRQcm9wcyhyZWYpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICAuLi5nZXRBdHRyaWJ1dGVKc29uKHJlZiwgXCJkYXRhLXByb3BzXCIpLFxuICAgICAgICAuLi5nZXRMaXZlSnNvblByb3BzKHJlZiksXG4gICAgICAgIGxpdmU6IHJlZixcbiAgICAgICAgJCRzbG90czogZ2V0U2xvdHMocmVmKSxcbiAgICAgICAgJCRzY29wZToge30sXG4gICAgfVxufVxuXG5mdW5jdGlvbiBmaW5kU2xvdEN0eChjb21wb25lbnQpIHtcbiAgICAvLyBUaGUgZGVmYXVsdCBzbG90IGFsd2F5cyBleGlzdHMgaWYgdGhlcmUncyBhIHNsb3Qgc2V0XG4gICAgLy8gZXZlbiBpZiBubyBzbG90IGlzIHNldCBmb3IgdGhlIGV4cGxpY2l0IGRlZmF1bHQgc2xvdFxuICAgIHJldHVybiBjb21wb25lbnQuJCQuY3R4LmZpbmQoY3R4RWxlbWVudCA9PiBjdHhFbGVtZW50Py5kZWZhdWx0KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SG9va3MoY29tcG9uZW50cykge1xuICAgIGNvbXBvbmVudHMgPSBub3JtYWxpemVDb21wb25lbnRzKGNvbXBvbmVudHMpXG5cbiAgICBjb25zdCBTdmVsdGVIb29rID0ge1xuICAgICAgICBtb3VudGVkKCkge1xuICAgICAgICAgICAgY29uc3QgY29tcG9uZW50TmFtZSA9IHRoaXMuZWwuZ2V0QXR0cmlidXRlKFwiZGF0YS1uYW1lXCIpXG4gICAgICAgICAgICBpZiAoIWNvbXBvbmVudE5hbWUpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb21wb25lbnQgbmFtZSBtdXN0IGJlIHByb3ZpZGVkXCIpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IENvbXBvbmVudCA9IGNvbXBvbmVudHNbY29tcG9uZW50TmFtZV1cbiAgICAgICAgICAgIGlmICghQ29tcG9uZW50KSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmFibGUgdG8gZmluZCAke2NvbXBvbmVudE5hbWV9IGNvbXBvbmVudC5gKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGxpdmVKc29uRWxlbWVudCBvZiBPYmplY3Qua2V5cyhnZXRBdHRyaWJ1dGVKc29uKHRoaXMsIFwiZGF0YS1saXZlLWpzb25cIikpKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoYCR7bGl2ZUpzb25FbGVtZW50fV9pbml0aWFsaXplZGAsIGV2ZW50ID0+IHRoaXMuX2luc3RhbmNlLiRzZXQoZ2V0UHJvcHModGhpcykpLCBmYWxzZSlcbiAgICAgICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihgJHtsaXZlSnNvbkVsZW1lbnR9X3BhdGNoZWRgLCBldmVudCA9PiB0aGlzLl9pbnN0YW5jZS4kc2V0KGdldFByb3BzKHRoaXMpKSwgZmFsc2UpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlID0gbmV3IENvbXBvbmVudCh7XG4gICAgICAgICAgICAgICAgdGFyZ2V0OiB0aGlzLmVsLFxuICAgICAgICAgICAgICAgIHByb3BzOiBnZXRQcm9wcyh0aGlzKSxcbiAgICAgICAgICAgICAgICBoeWRyYXRlOiB0aGlzLmVsLmhhc0F0dHJpYnV0ZShcImRhdGEtc3NyXCIpLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcblxuICAgICAgICB1cGRhdGVkKCkge1xuICAgICAgICAgICAgLy8gU2V0IHRoZSBwcm9wc1xuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UuJHNldChnZXRQcm9wcyh0aGlzKSlcblxuICAgICAgICAgICAgLy8gU2V0IHRoZSBzbG90c1xuICAgICAgICAgICAgY29uc3Qgc2xvdEN0eCA9IGZpbmRTbG90Q3R4KHRoaXMuX2luc3RhbmNlKVxuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gc2xvdEN0eCkge1xuICAgICAgICAgICAgICAgIHNsb3RDdHhba2V5XVswXSgpLnVwZGF0ZSgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgZGVzdHJveWVkKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2luc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwaHg6cGFnZS1sb2FkaW5nLXN0b3BcIiwgKCkgPT4gdGhpcy5faW5zdGFuY2UuJGRlc3Ryb3koKSwge29uY2U6IHRydWV9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIFN2ZWx0ZUhvb2ssXG4gICAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7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QUFZLFdBQVcsSUFBSTtBQUNqQyxVQUFNLFVBQVUsT0FBTyxZQUFZLE9BQU8sUUFBUSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDdEYsV0FBTyxVQUFVLE9BQU8sT0FBTyxFQUFDLFFBQU8sQ0FBQztFQUM1QztBQUNKOzs7QTdEUE8sSUFBTSxTQUFTLFVBQVUsU0FBVTsiLAogICJuYW1lcyI6IFsiZWxlbWVudCIsICJlbGVtZW50IiwgImF0dHIiLCAiU3Vic2NyaWJhYmxlIiwgImNvbnN0cnVjdG9yIiwgImxpc3RlbmVycyIsICJTZXQiLCAic3Vic2NyaWJlIiwgImJpbmQiLCAibGlzdGVuZXIiLCAiaWRlbnRpdHkiLCAiYWRkIiwgIm9uU3Vic2NyaWJlIiwgImRlbGV0ZSIsICJvblVuc3Vic2NyaWJlIiwgImhhc0xpc3RlbmVycyIsICJzaXplIiwgImlzU2VydmVyIiwgIndpbmRvdyIsICJub29wIiwgInVuZGVmaW5lZCIsICJmdW5jdGlvbmFsVXBkYXRlIiwgInVwZGF0ZXIiLCAiaW5wdXQiLCAiaXNWYWxpZFRpbWVvdXQiLCAidmFsdWUiLCAiSW5maW5pdHkiLCAidGltZVVudGlsU3RhbGUiLCAidXBkYXRlZEF0IiwgInN0YWxlVGltZSIsICJNYXRoIiwgIm1heCIsICJEYXRlIiwgIm5vdyIsICJwYXJzZVF1ZXJ5QXJncyIsICJhcmcxIiwgImFyZzIiLCAiYXJnMyIsICJpc1F1ZXJ5S2V5IiwgInF1ZXJ5S2V5IiwgInF1ZXJ5Rm4iLCAicGFyc2VNdXRhdGlvbkFyZ3MiLCAibXV0YXRpb25LZXkiLCAibXV0YXRpb25GbiIsICJwYXJzZUZpbHRlckFyZ3MiLCAibWF0Y2hRdWVyeSIsICJmaWx0ZXJzIiwgInF1ZXJ5IiwgInR5cGUiLCAiZXhhY3QiLCAiZmV0Y2hTdGF0dXMiLCAicHJlZGljYXRlIiwgInF1ZXJ5S2V5IiwgInN0YWxlIiwgImlzUXVlcnlLZXkiLCAicXVlcnlIYXNoIiwgImhhc2hRdWVyeUtleUJ5T3B0aW9ucyIsICJvcHRpb25zIiwgInBhcnRpYWxNYXRjaEtleSIsICJpc0FjdGl2ZSIsICJpc1N0YWxlIiwgInN0YXRlIiwgIm1hdGNoTXV0YXRpb24iLCAibXV0YXRpb24iLCAiZmV0Y2hpbmciLCAibXV0YXRpb25LZXkiLCAiaGFzaFF1ZXJ5S2V5IiwgInN0YXR1cyIsICJoYXNoRm4iLCAicXVlcnlLZXlIYXNoRm4iLCAiSlNPTiIsICJzdHJpbmdpZnkiLCAiXyIsICJ2YWwiLCAiaXNQbGFpbk9iamVjdCIsICJPYmplY3QiLCAia2V5cyIsICJzb3J0IiwgInJlZHVjZSIsICJyZXN1bHQiLCAia2V5IiwgImEiLCAiYiIsICJwYXJ0aWFsRGVlcEVxdWFsIiwgInNvbWUiLCAicmVwbGFjZUVxdWFsRGVlcCIsICJhcnJheSIsICJpc1BsYWluQXJyYXkiLCAiYVNpemUiLCAibGVuZ3RoIiwgImJJdGVtcyIsICJiU2l6ZSIsICJjb3B5IiwgImVxdWFsSXRlbXMiLCAiaSIsICJzaGFsbG93RXF1YWxPYmplY3RzIiwgInZhbHVlIiwgIkFycmF5IiwgImlzQXJyYXkiLCAibyIsICJoYXNPYmplY3RQcm90b3R5cGUiLCAiY3RvciIsICJjb25zdHJ1Y3RvciIsICJwcm90IiwgInByb3RvdHlwZSIsICJoYXNPd25Qcm9wZXJ0eSIsICJ0b1N0cmluZyIsICJjYWxsIiwgInNsZWVwIiwgInRpbWVvdXQiLCAiUHJvbWlzZSIsICJyZXNvbHZlIiwgInNldFRpbWVvdXQiLCAic2NoZWR1bGVNaWNyb3Rhc2siLCAiY2FsbGJhY2siLCAidGhlbiIsICJnZXRBYm9ydENvbnRyb2xsZXIiLCAiQWJvcnRDb250cm9sbGVyIiwgInJlcGxhY2VEYXRhIiwgInByZXZEYXRhIiwgImRhdGEiLCAib3B0aW9ucyIsICJpc0RhdGFFcXVhbCIsICJzdHJ1Y3R1cmFsU2hhcmluZyIsICJyZXBsYWNlRXF1YWxEZWVwIiwgIkZvY3VzTWFuYWdlciIsICJTdWJzY3JpYmFibGUiLCAiY29uc3RydWN0b3IiLCAic2V0dXAiLCAib25Gb2N1cyIsICJpc1NlcnZlciIsICJ3aW5kb3ciLCAiYWRkRXZlbnRMaXN0ZW5lciIsICJsaXN0ZW5lciIsICJyZW1vdmVFdmVudExpc3RlbmVyIiwgIm9uU3Vic2NyaWJlIiwgImNsZWFudXAiLCAic2V0RXZlbnRMaXN0ZW5lciIsICJvblVuc3Vic2NyaWJlIiwgImhhc0xpc3RlbmVycyIsICJ1bmRlZmluZWQiLCAiZm9jdXNlZCIsICJzZXRGb2N1c2VkIiwgImNoYW5nZWQiLCAibGlzdGVuZXJzIiwgImZvckVhY2giLCAiaXNGb2N1c2VkIiwgImRvY3VtZW50IiwgImluY2x1ZGVzIiwgInZpc2liaWxpdHlTdGF0ZSIsICJmb2N1c01hbmFnZXIiLCAib25saW5lRXZlbnRzIiwgIk9ubGluZU1hbmFnZXIiLCAiU3Vic2NyaWJhYmxlIiwgImNvbnN0cnVjdG9yIiwgInNldHVwIiwgIm9uT25saW5lIiwgImlzU2VydmVyIiwgIndpbmRvdyIsICJhZGRFdmVudExpc3RlbmVyIiwgImxpc3RlbmVyIiwgImZvckVhY2giLCAiZXZlbnQiLCAicmVtb3ZlRXZlbnRMaXN0ZW5lciIsICJvblN1YnNjcmliZSIsICJjbGVhbnVwIiwgInNldEV2ZW50TGlzdGVuZXIiLCAib25VbnN1YnNjcmliZSIsICJoYXNMaXN0ZW5lcnMiLCAidW5kZWZpbmVkIiwgIm9ubGluZSIsICJzZXRPbmxpbmUiLCAiY2hhbmdlZCIsICJsaXN0ZW5lcnMiLCAiaXNPbmxpbmUiLCAibmF2aWdhdG9yIiwgIm9uTGluZSIsICJvbmxpbmVNYW5hZ2VyIiwgImRlZmF1bHRSZXRyeURlbGF5IiwgImZhaWx1cmVDb3VudCIsICJNYXRoIiwgIm1pbiIsICJjYW5GZXRjaCIsICJuZXR3b3JrTW9kZSIsICJvbmxpbmVNYW5hZ2VyIiwgImlzT25saW5lIiwgIkNhbmNlbGxlZEVycm9yIiwgImNvbnN0cnVjdG9yIiwgIm9wdGlvbnMiLCAicmV2ZXJ0IiwgInNpbGVudCIsICJpc0NhbmNlbGxlZEVycm9yIiwgInZhbHVlIiwgImNyZWF0ZVJldHJ5ZXIiLCAiY29uZmlnIiwgImlzUmV0cnlDYW5jZWxsZWQiLCAiaXNSZXNvbHZlZCIsICJjb250aW51ZUZuIiwgInByb21pc2VSZXNvbHZlIiwgInByb21pc2VSZWplY3QiLCAicHJvbWlzZSIsICJQcm9taXNlIiwgIm91dGVyUmVzb2x2ZSIsICJvdXRlclJlamVjdCIsICJjYW5jZWwiLCAiY2FuY2VsT3B0aW9ucyIsICJyZWplY3QiLCAiYWJvcnQiLCAiY2FuY2VsUmV0cnkiLCAiY29udGludWVSZXRyeSIsICJzaG91bGRQYXVzZSIsICJmb2N1c01hbmFnZXIiLCAiaXNGb2N1c2VkIiwgInJlc29sdmUiLCAib25TdWNjZXNzIiwgIm9uRXJyb3IiLCAicGF1c2UiLCAiY29udGludWVSZXNvbHZlIiwgImNhbkNvbnRpbnVlIiwgIm9uUGF1c2UiLCAidGhlbiIsICJ1bmRlZmluZWQiLCAib25Db250aW51ZSIsICJydW4iLCAicHJvbWlzZU9yVmFsdWUiLCAiZm4iLCAiZXJyb3IiLCAiY2F0Y2giLCAicmV0cnkiLCAicmV0cnlEZWxheSIsICJkZWxheSIsICJzaG91bGRSZXRyeSIsICJvbkZhaWwiLCAic2xlZXAiLCAiY29udGludWUiLCAiZGlkQ29udGludWUiLCAiZGVmYXVsdExvZ2dlciIsICJjb25zb2xlIiwgImNyZWF0ZU5vdGlmeU1hbmFnZXIiLCAicXVldWUiLCAidHJhbnNhY3Rpb25zIiwgIm5vdGlmeUZuIiwgImNhbGxiYWNrIiwgImJhdGNoTm90aWZ5Rm4iLCAiYmF0Y2giLCAicmVzdWx0IiwgImZsdXNoIiwgInNjaGVkdWxlIiwgInB1c2giLCAic2NoZWR1bGVNaWNyb3Rhc2siLCAiYmF0Y2hDYWxscyIsICJhcmdzIiwgIm9yaWdpbmFsUXVldWUiLCAibGVuZ3RoIiwgImZvckVhY2giLCAic2V0Tm90aWZ5RnVuY3Rpb24iLCAiZm4iLCAic2V0QmF0Y2hOb3RpZnlGdW5jdGlvbiIsICJub3RpZnlNYW5hZ2VyIiwgIlJlbW92YWJsZSIsICJkZXN0cm95IiwgImNsZWFyR2NUaW1lb3V0IiwgInNjaGVkdWxlR2MiLCAiaXNWYWxpZFRpbWVvdXQiLCAiY2FjaGVUaW1lIiwgImdjVGltZW91dCIsICJzZXRUaW1lb3V0IiwgIm9wdGlvbmFsUmVtb3ZlIiwgInVwZGF0ZUNhY2hlVGltZSIsICJuZXdDYWNoZVRpbWUiLCAiTWF0aCIsICJtYXgiLCAiaXNTZXJ2ZXIiLCAiSW5maW5pdHkiLCAiY2xlYXJUaW1lb3V0IiwgInVuZGVmaW5lZCIsICJRdWVyeSIsICJSZW1vdmFibGUiLCAiY29uc3RydWN0b3IiLCAiY29uZmlnIiwgImFib3J0U2lnbmFsQ29uc3VtZWQiLCAiZGVmYXVsdE9wdGlvbnMiLCAic2V0T3B0aW9ucyIsICJvcHRpb25zIiwgIm9ic2VydmVycyIsICJjYWNoZSIsICJsb2dnZXIiLCAiZGVmYXVsdExvZ2dlciIsICJxdWVyeUtleSIsICJxdWVyeUhhc2giLCAiaW5pdGlhbFN0YXRlIiwgInN0YXRlIiwgImdldERlZmF1bHRTdGF0ZSIsICJzY2hlZHVsZUdjIiwgIm1ldGEiLCAidXBkYXRlQ2FjaGVUaW1lIiwgImNhY2hlVGltZSIsICJvcHRpb25hbFJlbW92ZSIsICJsZW5ndGgiLCAiZmV0Y2hTdGF0dXMiLCAicmVtb3ZlIiwgInNldERhdGEiLCAibmV3RGF0YSIsICJkYXRhIiwgInJlcGxhY2VEYXRhIiwgImRpc3BhdGNoIiwgInR5cGUiLCAiZGF0YVVwZGF0ZWRBdCIsICJ1cGRhdGVkQXQiLCAibWFudWFsIiwgInNldFN0YXRlIiwgInNldFN0YXRlT3B0aW9ucyIsICJjYW5jZWwiLCAicHJvbWlzZSIsICJyZXRyeWVyIiwgInRoZW4iLCAibm9vcCIsICJjYXRjaCIsICJQcm9taXNlIiwgInJlc29sdmUiLCAiZGVzdHJveSIsICJzaWxlbnQiLCAicmVzZXQiLCAiaXNBY3RpdmUiLCAic29tZSIsICJvYnNlcnZlciIsICJlbmFibGVkIiwgImlzRGlzYWJsZWQiLCAiZ2V0T2JzZXJ2ZXJzQ291bnQiLCAiaXNTdGFsZSIsICJpc0ludmFsaWRhdGVkIiwgImdldEN1cnJlbnRSZXN1bHQiLCAiaXNTdGFsZUJ5VGltZSIsICJzdGFsZVRpbWUiLCAidGltZVVudGlsU3RhbGUiLCAib25Gb2N1cyIsICJmaW5kIiwgIngiLCAic2hvdWxkRmV0Y2hPbldpbmRvd0ZvY3VzIiwgInJlZmV0Y2giLCAiY2FuY2VsUmVmZXRjaCIsICJjb250aW51ZSIsICJvbk9ubGluZSIsICJzaG91bGRGZXRjaE9uUmVjb25uZWN0IiwgImFkZE9ic2VydmVyIiwgImluY2x1ZGVzIiwgInB1c2giLCAiY2xlYXJHY1RpbWVvdXQiLCAibm90aWZ5IiwgInF1ZXJ5IiwgInJlbW92ZU9ic2VydmVyIiwgImZpbHRlciIsICJyZXZlcnQiLCAiY2FuY2VsUmV0cnkiLCAiaW52YWxpZGF0ZSIsICJmZXRjaCIsICJmZXRjaE9wdGlvbnMiLCAiY29udGludWVSZXRyeSIsICJxdWVyeUZuIiwgInByb2Nlc3MiLCAiZW52IiwgIk5PREVfRU5WIiwgIkFycmF5IiwgImlzQXJyYXkiLCAiZXJyb3IiLCAiYWJvcnRDb250cm9sbGVyIiwgImdldEFib3J0Q29udHJvbGxlciIsICJxdWVyeUZuQ29udGV4dCIsICJwYWdlUGFyYW0iLCAidW5kZWZpbmVkIiwgImFkZFNpZ25hbFByb3BlcnR5IiwgIm9iamVjdCIsICJPYmplY3QiLCAiZGVmaW5lUHJvcGVydHkiLCAiZW51bWVyYWJsZSIsICJnZXQiLCAic2lnbmFsIiwgImZldGNoRm4iLCAicmVqZWN0IiwgImNvbnRleHQiLCAiYmVoYXZpb3IiLCAib25GZXRjaCIsICJyZXZlcnRTdGF0ZSIsICJmZXRjaE1ldGEiLCAib25FcnJvciIsICJpc0NhbmNlbGxlZEVycm9yIiwgIm9uU2V0dGxlZCIsICJpc0ZldGNoaW5nT3B0aW1pc3RpYyIsICJjcmVhdGVSZXRyeWVyIiwgImZuIiwgImFib3J0IiwgImJpbmQiLCAib25TdWNjZXNzIiwgIkVycm9yIiwgIm9uRmFpbCIsICJmYWlsdXJlQ291bnQiLCAib25QYXVzZSIsICJvbkNvbnRpbnVlIiwgInJldHJ5IiwgInJldHJ5RGVsYXkiLCAibmV0d29ya01vZGUiLCAiYWN0aW9uIiwgInJlZHVjZXIiLCAiZmV0Y2hGYWlsdXJlQ291bnQiLCAiZmV0Y2hGYWlsdXJlUmVhc29uIiwgImNhbkZldGNoIiwgInN0YXR1cyIsICJkYXRhVXBkYXRlQ291bnQiLCAiRGF0ZSIsICJub3ciLCAiZXJyb3JVcGRhdGVDb3VudCIsICJlcnJvclVwZGF0ZWRBdCIsICJub3RpZnlNYW5hZ2VyIiwgImJhdGNoIiwgImZvckVhY2giLCAib25RdWVyeVVwZGF0ZSIsICJpbml0aWFsRGF0YSIsICJoYXNEYXRhIiwgImluaXRpYWxEYXRhVXBkYXRlZEF0IiwgIlF1ZXJ5Q2FjaGUiLCAiU3Vic2NyaWJhYmxlIiwgImNvbnN0cnVjdG9yIiwgImNvbmZpZyIsICJxdWVyaWVzIiwgInF1ZXJpZXNNYXAiLCAiYnVpbGQiLCAiY2xpZW50IiwgIm9wdGlvbnMiLCAic3RhdGUiLCAicXVlcnlLZXkiLCAicXVlcnlIYXNoIiwgImhhc2hRdWVyeUtleUJ5T3B0aW9ucyIsICJxdWVyeSIsICJnZXQiLCAiUXVlcnkiLCAiY2FjaGUiLCAibG9nZ2VyIiwgImdldExvZ2dlciIsICJkZWZhdWx0UXVlcnlPcHRpb25zIiwgImRlZmF1bHRPcHRpb25zIiwgImdldFF1ZXJ5RGVmYXVsdHMiLCAiYWRkIiwgInB1c2giLCAibm90aWZ5IiwgInR5cGUiLCAicmVtb3ZlIiwgInF1ZXJ5SW5NYXAiLCAiZGVzdHJveSIsICJmaWx0ZXIiLCAieCIsICJjbGVhciIsICJub3RpZnlNYW5hZ2VyIiwgImJhdGNoIiwgImZvckVhY2giLCAiZ2V0QWxsIiwgImZpbmQiLCAiYXJnMSIsICJhcmcyIiwgImZpbHRlcnMiLCAicGFyc2VGaWx0ZXJBcmdzIiwgImV4YWN0IiwgIm1hdGNoUXVlcnkiLCAiZmluZEFsbCIsICJPYmplY3QiLCAia2V5cyIsICJsZW5ndGgiLCAiZXZlbnQiLCAibGlzdGVuZXJzIiwgImxpc3RlbmVyIiwgIm9uRm9jdXMiLCAib25PbmxpbmUiLCAiTXV0YXRpb24iLCAiUmVtb3ZhYmxlIiwgImNvbnN0cnVjdG9yIiwgImNvbmZpZyIsICJkZWZhdWx0T3B0aW9ucyIsICJtdXRhdGlvbklkIiwgIm11dGF0aW9uQ2FjaGUiLCAibG9nZ2VyIiwgImRlZmF1bHRMb2dnZXIiLCAib2JzZXJ2ZXJzIiwgInN0YXRlIiwgImdldERlZmF1bHRTdGF0ZSIsICJzZXRPcHRpb25zIiwgIm9wdGlvbnMiLCAic2NoZWR1bGVHYyIsICJ1cGRhdGVDYWNoZVRpbWUiLCAiY2FjaGVUaW1lIiwgIm1ldGEiLCAic2V0U3RhdGUiLCAiZGlzcGF0Y2giLCAidHlwZSIsICJhZGRPYnNlcnZlciIsICJvYnNlcnZlciIsICJpbmNsdWRlcyIsICJwdXNoIiwgImNsZWFyR2NUaW1lb3V0IiwgIm5vdGlmeSIsICJtdXRhdGlvbiIsICJyZW1vdmVPYnNlcnZlciIsICJmaWx0ZXIiLCAieCIsICJvcHRpb25hbFJlbW92ZSIsICJsZW5ndGgiLCAic3RhdHVzIiwgInJlbW92ZSIsICJjb250aW51ZSIsICJyZXRyeWVyIiwgImV4ZWN1dGUiLCAiZXhlY3V0ZU11dGF0aW9uIiwgImNyZWF0ZVJldHJ5ZXIiLCAiZm4iLCAibXV0YXRpb25GbiIsICJQcm9taXNlIiwgInJlamVjdCIsICJ2YXJpYWJsZXMiLCAib25GYWlsIiwgImZhaWx1cmVDb3VudCIsICJlcnJvciIsICJvblBhdXNlIiwgIm9uQ29udGludWUiLCAicmV0cnkiLCAicmV0cnlEZWxheSIsICJuZXR3b3JrTW9kZSIsICJwcm9taXNlIiwgInJlc3RvcmVkIiwgIm9uTXV0YXRlIiwgImNvbnRleHQiLCAiZGF0YSIsICJvblN1Y2Nlc3MiLCAib25TZXR0bGVkIiwgIm9uRXJyb3IiLCAicHJvY2VzcyIsICJlbnYiLCAiTk9ERV9FTlYiLCAidW5kZWZpbmVkIiwgImFjdGlvbiIsICJyZWR1Y2VyIiwgImZhaWx1cmVSZWFzb24iLCAiaXNQYXVzZWQiLCAiY2FuRmV0Y2giLCAibm90aWZ5TWFuYWdlciIsICJiYXRjaCIsICJmb3JFYWNoIiwgIm9uTXV0YXRpb25VcGRhdGUiLCAiTXV0YXRpb25DYWNoZSIsICJTdWJzY3JpYmFibGUiLCAiY29uc3RydWN0b3IiLCAiY29uZmlnIiwgIm11dGF0aW9ucyIsICJtdXRhdGlvbklkIiwgImJ1aWxkIiwgImNsaWVudCIsICJvcHRpb25zIiwgInN0YXRlIiwgIm11dGF0aW9uIiwgIk11dGF0aW9uIiwgIm11dGF0aW9uQ2FjaGUiLCAibG9nZ2VyIiwgImdldExvZ2dlciIsICJkZWZhdWx0TXV0YXRpb25PcHRpb25zIiwgImRlZmF1bHRPcHRpb25zIiwgIm11dGF0aW9uS2V5IiwgImdldE11dGF0aW9uRGVmYXVsdHMiLCAidW5kZWZpbmVkIiwgImFkZCIsICJwdXNoIiwgIm5vdGlmeSIsICJ0eXBlIiwgInJlbW92ZSIsICJmaWx0ZXIiLCAieCIsICJjbGVhciIsICJub3RpZnlNYW5hZ2VyIiwgImJhdGNoIiwgImZvckVhY2giLCAiZ2V0QWxsIiwgImZpbmQiLCAiZmlsdGVycyIsICJleGFjdCIsICJtYXRjaE11dGF0aW9uIiwgImZpbmRBbGwiLCAiZXZlbnQiLCAibGlzdGVuZXJzIiwgImxpc3RlbmVyIiwgInJlc3VtZVBhdXNlZE11dGF0aW9ucyIsICJyZXN1bWluZyIsICJQcm9taXNlIiwgInJlc29sdmUiLCAidGhlbiIsICJwYXVzZWRNdXRhdGlvbnMiLCAiaXNQYXVzZWQiLCAicmVkdWNlIiwgInByb21pc2UiLCAiY29udGludWUiLCAiY2F0Y2giLCAibm9vcCIsICJpbmZpbml0ZVF1ZXJ5QmVoYXZpb3IiLCAib25GZXRjaCIsICJjb250ZXh0IiwgImZldGNoRm4iLCAicmVmZXRjaFBhZ2UiLCAiZmV0Y2hPcHRpb25zIiwgIm1ldGEiLCAiZmV0Y2hNb3JlIiwgInBhZ2VQYXJhbSIsICJpc0ZldGNoaW5nTmV4dFBhZ2UiLCAiZGlyZWN0aW9uIiwgImlzRmV0Y2hpbmdQcmV2aW91c1BhZ2UiLCAib2xkUGFnZXMiLCAic3RhdGUiLCAiZGF0YSIsICJwYWdlcyIsICJvbGRQYWdlUGFyYW1zIiwgInBhZ2VQYXJhbXMiLCAibmV3UGFnZVBhcmFtcyIsICJjYW5jZWxsZWQiLCAiYWRkU2lnbmFsUHJvcGVydHkiLCAib2JqZWN0IiwgIk9iamVjdCIsICJkZWZpbmVQcm9wZXJ0eSIsICJlbnVtZXJhYmxlIiwgImdldCIsICJzaWduYWwiLCAiYWJvcnRlZCIsICJhZGRFdmVudExpc3RlbmVyIiwgInF1ZXJ5Rm4iLCAib3B0aW9ucyIsICJQcm9taXNlIiwgInJlamVjdCIsICJxdWVyeUhhc2giLCAiYnVpbGROZXdQYWdlcyIsICJwYXJhbSIsICJwYWdlIiwgInByZXZpb3VzIiwgImZldGNoUGFnZSIsICJtYW51YWwiLCAibGVuZ3RoIiwgInJlc29sdmUiLCAicXVlcnlGbkNvbnRleHQiLCAicXVlcnlLZXkiLCAicXVlcnlGblJlc3VsdCIsICJwcm9taXNlIiwgInRoZW4iLCAiZ2V0TmV4dFBhZ2VQYXJhbSIsICJnZXRQcmV2aW91c1BhZ2VQYXJhbSIsICJzaG91bGRGZXRjaEZpcnN0UGFnZSIsICJpIiwgInNob3VsZEZldGNoTmV4dFBhZ2UiLCAiZmluYWxQcm9taXNlIiwgIlF1ZXJ5Q2xpZW50IiwgImNvbnN0cnVjdG9yIiwgImNvbmZpZyIsICJxdWVyeUNhY2hlIiwgIlF1ZXJ5Q2FjaGUiLCAibXV0YXRpb25DYWNoZSIsICJNdXRhdGlvbkNhY2hlIiwgImxvZ2dlciIsICJkZWZhdWx0TG9nZ2VyIiwgImRlZmF1bHRPcHRpb25zIiwgInF1ZXJ5RGVmYXVsdHMiLCAibXV0YXRpb25EZWZhdWx0cyIsICJtb3VudENvdW50IiwgInByb2Nlc3MiLCAiZW52IiwgIk5PREVfRU5WIiwgImVycm9yIiwgIm1vdW50IiwgInVuc3Vic2NyaWJlRm9jdXMiLCAiZm9jdXNNYW5hZ2VyIiwgInN1YnNjcmliZSIsICJpc0ZvY3VzZWQiLCAicmVzdW1lUGF1c2VkTXV0YXRpb25zIiwgIm9uRm9jdXMiLCAidW5zdWJzY3JpYmVPbmxpbmUiLCAib25saW5lTWFuYWdlciIsICJpc09ubGluZSIsICJvbk9ubGluZSIsICJ1bm1vdW50IiwgInVuZGVmaW5lZCIsICJpc0ZldGNoaW5nIiwgImFyZzEiLCAiYXJnMiIsICJmaWx0ZXJzIiwgInBhcnNlRmlsdGVyQXJncyIsICJmZXRjaFN0YXR1cyIsICJmaW5kQWxsIiwgImxlbmd0aCIsICJpc011dGF0aW5nIiwgImZldGNoaW5nIiwgImdldFF1ZXJ5RGF0YSIsICJxdWVyeUtleSIsICJmaW5kIiwgInN0YXRlIiwgImRhdGEiLCAiZW5zdXJlUXVlcnlEYXRhIiwgImFyZzMiLCAicGFyc2VkT3B0aW9ucyIsICJwYXJzZVF1ZXJ5QXJncyIsICJjYWNoZWREYXRhIiwgIlByb21pc2UiLCAicmVzb2x2ZSIsICJmZXRjaFF1ZXJ5IiwgImdldFF1ZXJpZXNEYXRhIiwgInF1ZXJ5S2V5T3JGaWx0ZXJzIiwgImdldFF1ZXJ5Q2FjaGUiLCAibWFwIiwgInNldFF1ZXJ5RGF0YSIsICJ1cGRhdGVyIiwgIm9wdGlvbnMiLCAicXVlcnkiLCAicHJldkRhdGEiLCAiZnVuY3Rpb25hbFVwZGF0ZSIsICJkZWZhdWx0ZWRPcHRpb25zIiwgImRlZmF1bHRRdWVyeU9wdGlvbnMiLCAiYnVpbGQiLCAic2V0RGF0YSIsICJtYW51YWwiLCAic2V0UXVlcmllc0RhdGEiLCAibm90aWZ5TWFuYWdlciIsICJiYXRjaCIsICJnZXRRdWVyeVN0YXRlIiwgInJlbW92ZVF1ZXJpZXMiLCAiZm9yRWFjaCIsICJyZW1vdmUiLCAicmVzZXRRdWVyaWVzIiwgInJlZmV0Y2hGaWx0ZXJzIiwgInR5cGUiLCAicmVzZXQiLCAicmVmZXRjaFF1ZXJpZXMiLCAiY2FuY2VsUXVlcmllcyIsICJjYW5jZWxPcHRpb25zIiwgInJldmVydCIsICJwcm9taXNlcyIsICJjYW5jZWwiLCAiYWxsIiwgInRoZW4iLCAibm9vcCIsICJjYXRjaCIsICJpbnZhbGlkYXRlUXVlcmllcyIsICJpbnZhbGlkYXRlIiwgInJlZmV0Y2hUeXBlIiwgImZpbHRlciIsICJpc0Rpc2FibGVkIiwgImZldGNoIiwgImNhbmNlbFJlZmV0Y2giLCAibWV0YSIsICJyZWZldGNoUGFnZSIsICJwcm9taXNlIiwgInRocm93T25FcnJvciIsICJyZXRyeSIsICJpc1N0YWxlQnlUaW1lIiwgInN0YWxlVGltZSIsICJwcmVmZXRjaFF1ZXJ5IiwgImZldGNoSW5maW5pdGVRdWVyeSIsICJiZWhhdmlvciIsICJpbmZpbml0ZVF1ZXJ5QmVoYXZpb3IiLCAicHJlZmV0Y2hJbmZpbml0ZVF1ZXJ5IiwgImdldE11dGF0aW9uQ2FjaGUiLCAiZ2V0TG9nZ2VyIiwgImdldERlZmF1bHRPcHRpb25zIiwgInNldERlZmF1bHRPcHRpb25zIiwgInNldFF1ZXJ5RGVmYXVsdHMiLCAicmVzdWx0IiwgIngiLCAiaGFzaFF1ZXJ5S2V5IiwgInB1c2giLCAiZ2V0UXVlcnlEZWZhdWx0cyIsICJmaXJzdE1hdGNoaW5nRGVmYXVsdHMiLCAicGFydGlhbE1hdGNoS2V5IiwgIm1hdGNoaW5nRGVmYXVsdHMiLCAiSlNPTiIsICJzdHJpbmdpZnkiLCAic2V0TXV0YXRpb25EZWZhdWx0cyIsICJtdXRhdGlvbktleSIsICJnZXRNdXRhdGlvbkRlZmF1bHRzIiwgIl9kZWZhdWx0ZWQiLCAicXVlcmllcyIsICJxdWVyeUhhc2giLCAiaGFzaFF1ZXJ5S2V5QnlPcHRpb25zIiwgInJlZmV0Y2hPblJlY29ubmVjdCIsICJuZXR3b3JrTW9kZSIsICJ1c2VFcnJvckJvdW5kYXJ5IiwgInN1c3BlbnNlIiwgImRlZmF1bHRNdXRhdGlvbk9wdGlvbnMiLCAibXV0YXRpb25zIiwgImNsZWFyIiwgIlF1ZXJ5T2JzZXJ2ZXIiLCAiU3Vic2NyaWJhYmxlIiwgImNvbnN0cnVjdG9yIiwgImNsaWVudCIsICJvcHRpb25zIiwgInRyYWNrZWRQcm9wcyIsICJTZXQiLCAic2VsZWN0RXJyb3IiLCAiYmluZE1ldGhvZHMiLCAic2V0T3B0aW9ucyIsICJyZW1vdmUiLCAiYmluZCIsICJyZWZldGNoIiwgIm9uU3Vic2NyaWJlIiwgImxpc3RlbmVycyIsICJzaXplIiwgImN1cnJlbnRRdWVyeSIsICJhZGRPYnNlcnZlciIsICJzaG91bGRGZXRjaE9uTW91bnQiLCAiZXhlY3V0ZUZldGNoIiwgInVwZGF0ZVRpbWVycyIsICJvblVuc3Vic2NyaWJlIiwgImhhc0xpc3RlbmVycyIsICJkZXN0cm95IiwgInNob3VsZEZldGNoT25SZWNvbm5lY3QiLCAic2hvdWxkRmV0Y2hPbiIsICJyZWZldGNoT25SZWNvbm5lY3QiLCAic2hvdWxkRmV0Y2hPbldpbmRvd0ZvY3VzIiwgInJlZmV0Y2hPbldpbmRvd0ZvY3VzIiwgImNsZWFyU3RhbGVUaW1lb3V0IiwgImNsZWFyUmVmZXRjaEludGVydmFsIiwgInJlbW92ZU9ic2VydmVyIiwgIm5vdGlmeU9wdGlvbnMiLCAicHJldk9wdGlvbnMiLCAicHJldlF1ZXJ5IiwgImRlZmF1bHRRdWVyeU9wdGlvbnMiLCAicHJvY2VzcyIsICJlbnYiLCAiTk9ERV9FTlYiLCAiaXNEYXRhRXF1YWwiLCAiZ2V0TG9nZ2VyIiwgImVycm9yIiwgInNoYWxsb3dFcXVhbE9iamVjdHMiLCAiZ2V0UXVlcnlDYWNoZSIsICJub3RpZnkiLCAidHlwZSIsICJxdWVyeSIsICJvYnNlcnZlciIsICJlbmFibGVkIiwgIkVycm9yIiwgInF1ZXJ5S2V5IiwgInVwZGF0ZVF1ZXJ5IiwgIm1vdW50ZWQiLCAic2hvdWxkRmV0Y2hPcHRpb25hbGx5IiwgInVwZGF0ZVJlc3VsdCIsICJzdGFsZVRpbWUiLCAidXBkYXRlU3RhbGVUaW1lb3V0IiwgIm5leHRSZWZldGNoSW50ZXJ2YWwiLCAiY29tcHV0ZVJlZmV0Y2hJbnRlcnZhbCIsICJjdXJyZW50UmVmZXRjaEludGVydmFsIiwgInVwZGF0ZVJlZmV0Y2hJbnRlcnZhbCIsICJnZXRPcHRpbWlzdGljUmVzdWx0IiwgImJ1aWxkIiwgInJlc3VsdCIsICJjcmVhdGVSZXN1bHQiLCAic2hvdWxkQXNzaWduT2JzZXJ2ZXJDdXJyZW50UHJvcGVydGllcyIsICJjdXJyZW50UmVzdWx0IiwgImN1cnJlbnRSZXN1bHRPcHRpb25zIiwgImN1cnJlbnRSZXN1bHRTdGF0ZSIsICJzdGF0ZSIsICJnZXRDdXJyZW50UmVzdWx0IiwgInRyYWNrUmVzdWx0IiwgInRyYWNrZWRSZXN1bHQiLCAiT2JqZWN0IiwgImtleXMiLCAiZm9yRWFjaCIsICJrZXkiLCAiZGVmaW5lUHJvcGVydHkiLCAiY29uZmlndXJhYmxlIiwgImVudW1lcmFibGUiLCAiZ2V0IiwgImFkZCIsICJnZXRDdXJyZW50UXVlcnkiLCAicmVmZXRjaFBhZ2UiLCAiZmV0Y2giLCAibWV0YSIsICJmZXRjaE9wdGltaXN0aWMiLCAiZGVmYXVsdGVkT3B0aW9ucyIsICJpc0ZldGNoaW5nT3B0aW1pc3RpYyIsICJ0aGVuIiwgImZldGNoT3B0aW9ucyIsICJjYW5jZWxSZWZldGNoIiwgInByb21pc2UiLCAidGhyb3dPbkVycm9yIiwgImNhdGNoIiwgIm5vb3AiLCAiaXNTZXJ2ZXIiLCAiaXNTdGFsZSIsICJpc1ZhbGlkVGltZW91dCIsICJ0aW1lIiwgInRpbWVVbnRpbFN0YWxlIiwgImRhdGFVcGRhdGVkQXQiLCAidGltZW91dCIsICJzdGFsZVRpbWVvdXRJZCIsICJzZXRUaW1lb3V0IiwgInJlZmV0Y2hJbnRlcnZhbCIsICJkYXRhIiwgIm5leHRJbnRlcnZhbCIsICJyZWZldGNoSW50ZXJ2YWxJZCIsICJzZXRJbnRlcnZhbCIsICJyZWZldGNoSW50ZXJ2YWxJbkJhY2tncm91bmQiLCAiZm9jdXNNYW5hZ2VyIiwgImlzRm9jdXNlZCIsICJjbGVhclRpbWVvdXQiLCAidW5kZWZpbmVkIiwgImNsZWFySW50ZXJ2YWwiLCAicHJldlJlc3VsdCIsICJwcmV2UmVzdWx0U3RhdGUiLCAicHJldlJlc3VsdE9wdGlvbnMiLCAicXVlcnlDaGFuZ2UiLCAicXVlcnlJbml0aWFsU3RhdGUiLCAiY3VycmVudFF1ZXJ5SW5pdGlhbFN0YXRlIiwgInByZXZRdWVyeVJlc3VsdCIsICJwcmV2aW91c1F1ZXJ5UmVzdWx0IiwgImVycm9yVXBkYXRlZEF0IiwgImZldGNoU3RhdHVzIiwgInN0YXR1cyIsICJpc1ByZXZpb3VzRGF0YSIsICJpc1BsYWNlaG9sZGVyRGF0YSIsICJfb3B0aW1pc3RpY1Jlc3VsdHMiLCAiZmV0Y2hPbk1vdW50IiwgImZldGNoT3B0aW9uYWxseSIsICJjYW5GZXRjaCIsICJuZXR3b3JrTW9kZSIsICJrZWVwUHJldmlvdXNEYXRhIiwgImlzU3VjY2VzcyIsICJzZWxlY3QiLCAic2VsZWN0Rm4iLCAic2VsZWN0UmVzdWx0IiwgInJlcGxhY2VEYXRhIiwgInBsYWNlaG9sZGVyRGF0YSIsICJEYXRlIiwgIm5vdyIsICJpc0ZldGNoaW5nIiwgImlzTG9hZGluZyIsICJpc0Vycm9yIiwgImlzSW5pdGlhbExvYWRpbmciLCAiZmFpbHVyZUNvdW50IiwgImZldGNoRmFpbHVyZUNvdW50IiwgImZhaWx1cmVSZWFzb24iLCAiZmV0Y2hGYWlsdXJlUmVhc29uIiwgImVycm9yVXBkYXRlQ291bnQiLCAiaXNGZXRjaGVkIiwgImRhdGFVcGRhdGVDb3VudCIsICJpc0ZldGNoZWRBZnRlck1vdW50IiwgImlzUmVmZXRjaGluZyIsICJpc0xvYWRpbmdFcnJvciIsICJpc1BhdXNlZCIsICJpc1JlZmV0Y2hFcnJvciIsICJuZXh0UmVzdWx0IiwgImRlZmF1bHROb3RpZnlPcHRpb25zIiwgImNhY2hlIiwgInNob3VsZE5vdGlmeUxpc3RlbmVycyIsICJub3RpZnlPbkNoYW5nZVByb3BzIiwgIm5vdGlmeU9uQ2hhbmdlUHJvcHNWYWx1ZSIsICJpbmNsdWRlZFByb3BzIiwgInVzZUVycm9yQm91bmRhcnkiLCAic29tZSIsICJ0eXBlZEtleSIsICJjaGFuZ2VkIiwgImhhcyIsICJvblF1ZXJ5VXBkYXRlIiwgImFjdGlvbiIsICJvblN1Y2Nlc3MiLCAibWFudWFsIiwgImlzQ2FuY2VsbGVkRXJyb3IiLCAib25FcnJvciIsICJub3RpZnlNYW5hZ2VyIiwgImJhdGNoIiwgIm9uU2V0dGxlZCIsICJsaXN0ZW5lciIsICJzaG91bGRMb2FkT25Nb3VudCIsICJyZXRyeU9uTW91bnQiLCAicmVmZXRjaE9uTW91bnQiLCAiZmllbGQiLCAidmFsdWUiLCAic3VzcGVuc2UiLCAiaXNTdGFsZUJ5VGltZSIsICJvcHRpbWlzdGljUmVzdWx0IiwgIk11dGF0aW9uT2JzZXJ2ZXIiLCAiU3Vic2NyaWJhYmxlIiwgImNvbnN0cnVjdG9yIiwgImNsaWVudCIsICJvcHRpb25zIiwgInNldE9wdGlvbnMiLCAiYmluZE1ldGhvZHMiLCAidXBkYXRlUmVzdWx0IiwgIm11dGF0ZSIsICJiaW5kIiwgInJlc2V0IiwgInByZXZPcHRpb25zIiwgImRlZmF1bHRNdXRhdGlvbk9wdGlvbnMiLCAic2hhbGxvd0VxdWFsT2JqZWN0cyIsICJnZXRNdXRhdGlvbkNhY2hlIiwgIm5vdGlmeSIsICJ0eXBlIiwgIm11dGF0aW9uIiwgImN1cnJlbnRNdXRhdGlvbiIsICJvYnNlcnZlciIsICJvblVuc3Vic2NyaWJlIiwgImhhc0xpc3RlbmVycyIsICJyZW1vdmVPYnNlcnZlciIsICJvbk11dGF0aW9uVXBkYXRlIiwgImFjdGlvbiIsICJub3RpZnlPcHRpb25zIiwgImxpc3RlbmVycyIsICJvblN1Y2Nlc3MiLCAib25FcnJvciIsICJnZXRDdXJyZW50UmVzdWx0IiwgImN1cnJlbnRSZXN1bHQiLCAidW5kZWZpbmVkIiwgInZhcmlhYmxlcyIsICJtdXRhdGVPcHRpb25zIiwgImJ1aWxkIiwgImFkZE9ic2VydmVyIiwgImV4ZWN1dGUiLCAic3RhdGUiLCAiZ2V0RGVmYXVsdFN0YXRlIiwgInJlc3VsdCIsICJpc0xvYWRpbmciLCAic3RhdHVzIiwgImlzU3VjY2VzcyIsICJpc0Vycm9yIiwgImlzSWRsZSIsICJub3RpZnlNYW5hZ2VyIiwgImJhdGNoIiwgImRhdGEiLCAiY29udGV4dCIsICJvblNldHRsZWQiLCAiZXJyb3IiLCAiZm9yRWFjaCIsICJsaXN0ZW5lciIsICJoeWRyYXRlIiwgImNsaWVudCIsICJkZWh5ZHJhdGVkU3RhdGUiLCAib3B0aW9ucyIsICJtdXRhdGlvbkNhY2hlIiwgImdldE11dGF0aW9uQ2FjaGUiLCAicXVlcnlDYWNoZSIsICJnZXRRdWVyeUNhY2hlIiwgIm11dGF0aW9ucyIsICJxdWVyaWVzIiwgImZvckVhY2giLCAiZGVoeWRyYXRlZE11dGF0aW9uIiwgImJ1aWxkIiwgImRlZmF1bHRPcHRpb25zIiwgIm11dGF0aW9uS2V5IiwgInN0YXRlIiwgInF1ZXJ5S2V5IiwgInF1ZXJ5SGFzaCIsICJxdWVyeSIsICJnZXQiLCAiZGF0YVVwZGF0ZWRBdCIsICJmZXRjaFN0YXR1cyIsICJfaWdub3JlZCIsICJkZWh5ZHJhdGVkUXVlcnlTdGF0ZSIsICJzZXRTdGF0ZSIsICJvbk1vdW50IiwgInNldCIsICJzdWJzY3JpYmUiLCAicnVuIiwgInNldCIsICJzdWJzY3JpYmUiLCAiTXV0YXRpb25PYnNlcnZlciIsICJub29wIiwgInNldCIsICJzdWJzY3JpYmUiLCAib25Nb3VudCIsICJpc1BsYWluT2JqZWN0IiwgImVhY2giLCAiaXNQbGFpbk9iamVjdCIsICJpbW1lciIsICJlYWNoIiwgImlzU2V0IiwgImN1cnJlbnQiLCAiSW1tZXIiLCAiYmFzZSIsICJJbW1lciIsICJlbCIsICJvbk1vdW50IiwgImlzT3BlbiIsICJvbk1vdW50IiwgImlzT3BlbiIsICJ0YWciLCAibGFiZWwiLCAib25Nb3VudCIsICJpc09wZW4iLCAib25Nb3VudCIsICJlcnJvcnMiLCAic3RlcCIsICJlcnJvcnMiLCAibW9kdWxlIiwgInJlbmRlciJdCn0K
