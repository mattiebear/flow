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
    className("rounded-xl w-full py-2 px-3 border border-solid", step.errors.description ? "border-red-900" : "border-zinc-500"),
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
  )} ${step.errors.description ? `<p class="text-red-700 dark:text-red-300 text-sm mt-1">${escape(step.errors.description)}</p>` : ``} <div class="flex justify-end gap-x-2"><button aria-label="Edit focuses" class="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors" type="button"><span class="hero-exclamation-circle"></span></button> ${validate_component(Popover_default, "Popover").$$render($$result, { isOpen: isMenuOpen }, {}, {
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
var modules = [TechniqueForm_exports, AutoResizeTextarea_exports, Popover_exports, Form_exports, LabelPopover_exports, StepCard_exports];
var __default = modules;
var filenames = ["../svelte/TechniqueForm.svelte", "../svelte/components/AutoResizeTextarea.svelte", "../svelte/components/Popover.svelte", "../svelte/technique_form/Form.svelte", "../svelte/technique_form/LabelPopover.svelte", "../svelte/technique_form/StepCard.svelte"];

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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vYXNzZXRzL2pzL3NlcnZlci5qcyIsICJpbXBvcnQtZ2xvYjouLi9zdmVsdGUvKiovKi5zdmVsdGUiLCAiLi4vLi4vYXNzZXRzL25vZGVfbW9kdWxlcy9zdmVsdGUvc3JjL3J1bnRpbWUvaW50ZXJuYWwvdXRpbHMuanMiLCAiLi4vLi4vYXNzZXRzL25vZGVfbW9kdWxlcy9zdmVsdGUvc3JjL3J1bnRpbWUvaW50ZXJuYWwvZ2xvYmFscy5qcyIsICIuLi8uLi9hc3NldHMvbm9kZV9tb2R1bGVzL3N2ZWx0ZS9zcmMvcnVudGltZS9pbnRlcm5hbC9SZXNpemVPYnNlcnZlclNpbmdsZXRvbi5qcyIsICIuLi8uLi9hc3NldHMvbm9kZV9tb2R1bGVzL3N2ZWx0ZS9zcmMvcnVudGltZS9pbnRlcm5hbC9kb20uanMiLCAiLi4vLi4vYXNzZXRzL25vZGVfbW9kdWxlcy9zdmVsdGUvc3JjL3J1bnRpbWUvaW50ZXJuYWwvbGlmZWN5Y2xlLmpzIiwgIi4uLy4uL2Fzc2V0cy9ub2RlX21vZHVsZXMvc3ZlbHRlL3NyYy9ydW50aW1lL2ludGVybmFsL2VhY2guanMiLCAiLi4vLi4vYXNzZXRzL25vZGVfbW9kdWxlcy9zdmVsdGUvc3JjL3NoYXJlZC9ib29sZWFuX2F0dHJpYnV0ZXMuanMiLCAiLi4vLi4vYXNzZXRzL25vZGVfbW9kdWxlcy9zdmVsdGUvc3JjL3NoYXJlZC91dGlscy9lc2NhcGUuanMiLCAiLi4vLi4vYXNzZXRzL25vZGVfbW9kdWxlcy9zdmVsdGUvc3JjL3J1bnRpbWUvaW50ZXJuYWwvc3NyLmpzIiwgIi4uLy4uL2Fzc2V0cy9ub2RlX21vZHVsZXMvc3ZlbHRlL3NyYy9ydW50aW1lL2ludGVybmFsL0NvbXBvbmVudC5qcyIsICIuLi8uLi9hc3NldHMvbm9kZV9tb2R1bGVzL0B0YW5zdGFjay9xdWVyeS1jb3JlL3NyYy9zdWJzY3JpYmFibGUudHMiLCAiLi4vLi4vYXNzZXRzL25vZGVfbW9kdWxlcy9AdGFuc3RhY2svcXVlcnktY29yZS9zcmMvdXRpbHMudHMiLCAiLi4vLi4vYXNzZXRzL25vZGVfbW9kdWxlcy9AdGFuc3RhY2svcXVlcnktY29yZS9zcmMvZm9jdXNNYW5hZ2VyLnRzIiwgIi4uLy4uL2Fzc2V0cy9ub2RlX21vZHVsZXMvQHRhbnN0YWNrL3F1ZXJ5LWNvcmUvc3JjL29ubGluZU1hbmFnZXIudHMiLCAiLi4vLi4vYXNzZXRzL25vZGVfbW9kdWxlcy9AdGFuc3RhY2svcXVlcnktY29yZS9zcmMvcmV0cnllci50cyIsICIuLi8uLi9hc3NldHMvbm9kZV9tb2R1bGVzL0B0YW5zdGFjay9xdWVyeS1jb3JlL3NyYy9sb2dnZXIudHMiLCAiLi4vLi4vYXNzZXRzL25vZGVfbW9kdWxlcy9AdGFuc3RhY2svcXVlcnktY29yZS9zcmMvbm90aWZ5TWFuYWdlci50cyIsICIuLi8uLi9hc3NldHMvbm9kZV9tb2R1bGVzL0B0YW5zdGFjay9xdWVyeS1jb3JlL3NyYy9yZW1vdmFibGUudHMiLCAiLi4vLi4vYXNzZXRzL25vZGVfbW9kdWxlcy9AdGFuc3RhY2svcXVlcnktY29yZS9zcmMvcXVlcnkudHMiLCAiLi4vLi4vYXNzZXRzL25vZGVfbW9kdWxlcy9AdGFuc3RhY2svcXVlcnktY29yZS9zcmMvcXVlcnlDYWNoZS50cyIsICIuLi8uLi9hc3NldHMvbm9kZV9tb2R1bGVzL0B0YW5zdGFjay9xdWVyeS1jb3JlL3NyYy9tdXRhdGlvbi50cyIsICIuLi8uLi9hc3NldHMvbm9kZV9tb2R1bGVzL0B0YW5zdGFjay9xdWVyeS1jb3JlL3NyYy9tdXRhdGlvbkNhY2hlLnRzIiwgIi4uLy4uL2Fzc2V0cy9ub2RlX21vZHVsZXMvQHRhbnN0YWNrL3F1ZXJ5LWNvcmUvc3JjL2luZmluaXRlUXVlcnlCZWhhdmlvci50cyIsICIuLi8uLi9hc3NldHMvbm9kZV9tb2R1bGVzL0B0YW5zdGFjay9xdWVyeS1jb3JlL3NyYy9xdWVyeUNsaWVudC50cyIsICIuLi8uLi9hc3NldHMvbm9kZV9tb2R1bGVzL0B0YW5zdGFjay9xdWVyeS1jb3JlL3NyYy9xdWVyeU9ic2VydmVyLnRzIiwgIi4uLy4uL2Fzc2V0cy9ub2RlX21vZHVsZXMvQHRhbnN0YWNrL3F1ZXJ5LWNvcmUvc3JjL211dGF0aW9uT2JzZXJ2ZXIudHMiLCAiLi4vLi4vYXNzZXRzL25vZGVfbW9kdWxlcy9AdGFuc3RhY2svcXVlcnktY29yZS9zcmMvaHlkcmF0aW9uLnRzIiwgIi4uLy4uL2Fzc2V0cy9ub2RlX21vZHVsZXMvc3ZlbHRlL3NyYy9ydW50aW1lL3Nzci5qcyIsICIuLi8uLi9hc3NldHMvbm9kZV9tb2R1bGVzL0B0YW5zdGFjay9zdmVsdGUtcXVlcnkvYnVpbGQvbGliL2NvbnRleHQuanMiLCAiLi4vLi4vYXNzZXRzL25vZGVfbW9kdWxlcy9zdmVsdGUvc3JjL3J1bnRpbWUvc3RvcmUvaW5kZXguanMiLCAiLi4vLi4vYXNzZXRzL25vZGVfbW9kdWxlcy9AdGFuc3RhY2svc3ZlbHRlLXF1ZXJ5L2J1aWxkL2xpYi91c2VRdWVyeUNsaWVudC5qcyIsICIuLi8uLi9hc3NldHMvbm9kZV9tb2R1bGVzL0B0YW5zdGFjay9zdmVsdGUtcXVlcnkvYnVpbGQvbGliL2NyZWF0ZUJhc2VRdWVyeS5qcyIsICIuLi8uLi9hc3NldHMvbm9kZV9tb2R1bGVzL0B0YW5zdGFjay9zdmVsdGUtcXVlcnkvYnVpbGQvbGliL2NyZWF0ZVF1ZXJ5LmpzIiwgIi4uLy4uL2Fzc2V0cy9ub2RlX21vZHVsZXMvQHRhbnN0YWNrL3N2ZWx0ZS1xdWVyeS9idWlsZC9saWIvY3JlYXRlTXV0YXRpb24uanMiLCAiLi4vLi4vYXNzZXRzL25vZGVfbW9kdWxlcy9AdGFuc3RhY2svc3ZlbHRlLXF1ZXJ5L2J1aWxkL2xpYi91c2VIeWRyYXRlLmpzIiwgIi4uLy4uL2Fzc2V0cy9ub2RlX21vZHVsZXMvQHRhbnN0YWNrL3N2ZWx0ZS1xdWVyeS9idWlsZC9saWIvSHlkcmF0ZS5zdmVsdGUiLCAiLi4vLi4vYXNzZXRzL25vZGVfbW9kdWxlcy9AdGFuc3RhY2svc3ZlbHRlLXF1ZXJ5L2J1aWxkL2xpYi9RdWVyeUNsaWVudFByb3ZpZGVyLnN2ZWx0ZSIsICIuLi8uLi9hc3NldHMvbm9kZV9tb2R1bGVzL2ltbWVyL3NyYy91dGlscy9lbnYudHMiLCAiLi4vLi4vYXNzZXRzL25vZGVfbW9kdWxlcy9pbW1lci9zcmMvdXRpbHMvZXJyb3JzLnRzIiwgIi4uLy4uL2Fzc2V0cy9ub2RlX21vZHVsZXMvaW1tZXIvc3JjL3V0aWxzL2NvbW1vbi50cyIsICIuLi8uLi9hc3NldHMvbm9kZV9tb2R1bGVzL2ltbWVyL3NyYy91dGlscy9wbHVnaW5zLnRzIiwgIi4uLy4uL2Fzc2V0cy9ub2RlX21vZHVsZXMvaW1tZXIvc3JjL2NvcmUvc2NvcGUudHMiLCAiLi4vLi4vYXNzZXRzL25vZGVfbW9kdWxlcy9pbW1lci9zcmMvY29yZS9maW5hbGl6ZS50cyIsICIuLi8uLi9hc3NldHMvbm9kZV9tb2R1bGVzL2ltbWVyL3NyYy9jb3JlL3Byb3h5LnRzIiwgIi4uLy4uL2Fzc2V0cy9ub2RlX21vZHVsZXMvaW1tZXIvc3JjL2NvcmUvaW1tZXJDbGFzcy50cyIsICIuLi8uLi9hc3NldHMvbm9kZV9tb2R1bGVzL2ltbWVyL3NyYy9jb3JlL2N1cnJlbnQudHMiLCAiLi4vLi4vYXNzZXRzL25vZGVfbW9kdWxlcy9pbW1lci9zcmMvcGx1Z2lucy9wYXRjaGVzLnRzIiwgIi4uLy4uL2Fzc2V0cy9ub2RlX21vZHVsZXMvaW1tZXIvc3JjL3BsdWdpbnMvbWFwc2V0LnRzIiwgIi4uLy4uL2Fzc2V0cy9ub2RlX21vZHVsZXMvaW1tZXIvc3JjL2ltbWVyLnRzIiwgIi4uLy4uL2Fzc2V0cy9qcy91dGlscy9kb20uanMiLCAiLi4vLi4vYXNzZXRzL2pzL3V0aWxzL3N0eWxlLmpzIiwgIi4uLy4uL2Fzc2V0cy9zdmVsdGUvY29tcG9uZW50cy9BdXRvUmVzaXplVGV4dGFyZWEuc3ZlbHRlIiwgIi4uLy4uL2Fzc2V0cy9zdmVsdGUvY29tcG9uZW50cy9Qb3BvdmVyLnN2ZWx0ZSIsICIuLi8uLi9hc3NldHMvc3ZlbHRlL3RlY2huaXF1ZV9mb3JtL0xhYmVsUG9wb3Zlci5zdmVsdGUiLCAiLi4vLi4vYXNzZXRzL3N2ZWx0ZS90ZWNobmlxdWVfZm9ybS9TdGVwQ2FyZC5zdmVsdGUiLCAiLi4vLi4vYXNzZXRzL3N2ZWx0ZS90ZWNobmlxdWVfZm9ybS9Gb3JtLnN2ZWx0ZSIsICIuLi8uLi9hc3NldHMvc3ZlbHRlL1RlY2huaXF1ZUZvcm0uc3ZlbHRlIiwgIi4uLy4uL2RlcHMvbGl2ZV9zdmVsdGUvYXNzZXRzL2pzL2xpdmVfc3ZlbHRlL3V0aWxzLmpzIiwgIi4uLy4uL2RlcHMvbGl2ZV9zdmVsdGUvYXNzZXRzL2pzL2xpdmVfc3ZlbHRlL3JlbmRlci5qcyIsICIuLi8uLi9kZXBzL2xpdmVfc3ZlbHRlL2Fzc2V0cy9qcy9saXZlX3N2ZWx0ZS9ob29rcy5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0ICogYXMgQ29tcG9uZW50cyBmcm9tIFwiLi4vc3ZlbHRlLyoqLyouc3ZlbHRlXCI7XG5pbXBvcnQgeyBnZXRSZW5kZXIgfSBmcm9tIFwibGl2ZV9zdmVsdGVcIjtcblxuZXhwb3J0IGNvbnN0IHJlbmRlciA9IGdldFJlbmRlcihDb21wb25lbnRzKTtcbiIsICJcbiAgICAgICAgaW1wb3J0ICogYXMgbW9kdWxlMCBmcm9tICcuLi9zdmVsdGUvVGVjaG5pcXVlRm9ybS5zdmVsdGUnO2ltcG9ydCAqIGFzIG1vZHVsZTEgZnJvbSAnLi4vc3ZlbHRlL2NvbXBvbmVudHMvQXV0b1Jlc2l6ZVRleHRhcmVhLnN2ZWx0ZSc7aW1wb3J0ICogYXMgbW9kdWxlMiBmcm9tICcuLi9zdmVsdGUvY29tcG9uZW50cy9Qb3BvdmVyLnN2ZWx0ZSc7aW1wb3J0ICogYXMgbW9kdWxlMyBmcm9tICcuLi9zdmVsdGUvdGVjaG5pcXVlX2Zvcm0vRm9ybS5zdmVsdGUnO2ltcG9ydCAqIGFzIG1vZHVsZTQgZnJvbSAnLi4vc3ZlbHRlL3RlY2huaXF1ZV9mb3JtL0xhYmVsUG9wb3Zlci5zdmVsdGUnO2ltcG9ydCAqIGFzIG1vZHVsZTUgZnJvbSAnLi4vc3ZlbHRlL3RlY2huaXF1ZV9mb3JtL1N0ZXBDYXJkLnN2ZWx0ZSdcblxuICAgICAgICBjb25zdCBtb2R1bGVzID0gW21vZHVsZTAsbW9kdWxlMSxtb2R1bGUyLG1vZHVsZTMsbW9kdWxlNCxtb2R1bGU1XTtcblxuICAgICAgICBleHBvcnQgZGVmYXVsdCBtb2R1bGVzO1xuICAgICAgICBleHBvcnQgY29uc3QgZmlsZW5hbWVzID0gWycuLi9zdmVsdGUvVGVjaG5pcXVlRm9ybS5zdmVsdGUnLCcuLi9zdmVsdGUvY29tcG9uZW50cy9BdXRvUmVzaXplVGV4dGFyZWEuc3ZlbHRlJywnLi4vc3ZlbHRlL2NvbXBvbmVudHMvUG9wb3Zlci5zdmVsdGUnLCcuLi9zdmVsdGUvdGVjaG5pcXVlX2Zvcm0vRm9ybS5zdmVsdGUnLCcuLi9zdmVsdGUvdGVjaG5pcXVlX2Zvcm0vTGFiZWxQb3BvdmVyLnN2ZWx0ZScsJy4uL3N2ZWx0ZS90ZWNobmlxdWVfZm9ybS9TdGVwQ2FyZC5zdmVsdGUnXVxuICAgICAgIiwgIi8qKiBAcmV0dXJucyB7dm9pZH0gKi9cbmV4cG9ydCBmdW5jdGlvbiBub29wKCkge31cblxuZXhwb3J0IGNvbnN0IGlkZW50aXR5ID0gKHgpID0+IHg7XG5cbi8qKlxuICogQHRlbXBsYXRlIFRcbiAqIEB0ZW1wbGF0ZSBTXG4gKiBAcGFyYW0ge1R9IHRhclxuICogQHBhcmFtIHtTfSBzcmNcbiAqIEByZXR1cm5zIHtUICYgU31cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFzc2lnbih0YXIsIHNyYykge1xuXHQvLyBAdHMtaWdub3JlXG5cdGZvciAoY29uc3QgayBpbiBzcmMpIHRhcltrXSA9IHNyY1trXTtcblx0cmV0dXJuIC8qKiBAdHlwZSB7VCAmIFN9ICovICh0YXIpO1xufVxuXG4vLyBBZGFwdGVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL3RoZW4vaXMtcHJvbWlzZS9ibG9iL21hc3Rlci9pbmRleC5qc1xuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgTUlUIExpY2Vuc2UgaHR0cHM6Ly9naXRodWIuY29tL3RoZW4vaXMtcHJvbWlzZS9ibG9iL21hc3Rlci9MSUNFTlNFXG4vKipcbiAqIEBwYXJhbSB7YW55fSB2YWx1ZVxuICogQHJldHVybnMge3ZhbHVlIGlzIFByb21pc2VMaWtlPGFueT59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc19wcm9taXNlKHZhbHVlKSB7XG5cdHJldHVybiAoXG5cdFx0ISF2YWx1ZSAmJlxuXHRcdCh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykgJiZcblx0XHR0eXBlb2YgKC8qKiBAdHlwZSB7YW55fSAqLyAodmFsdWUpLnRoZW4pID09PSAnZnVuY3Rpb24nXG5cdCk7XG59XG5cbi8qKiBAcmV0dXJucyB7dm9pZH0gKi9cbmV4cG9ydCBmdW5jdGlvbiBhZGRfbG9jYXRpb24oZWxlbWVudCwgZmlsZSwgbGluZSwgY29sdW1uLCBjaGFyKSB7XG5cdGVsZW1lbnQuX19zdmVsdGVfbWV0YSA9IHtcblx0XHRsb2M6IHsgZmlsZSwgbGluZSwgY29sdW1uLCBjaGFyIH1cblx0fTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJ1bihmbikge1xuXHRyZXR1cm4gZm4oKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJsYW5rX29iamVjdCgpIHtcblx0cmV0dXJuIE9iamVjdC5jcmVhdGUobnVsbCk7XG59XG5cbi8qKlxuICogQHBhcmFtIHtGdW5jdGlvbltdfSBmbnNcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gcnVuX2FsbChmbnMpIHtcblx0Zm5zLmZvckVhY2gocnVuKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge2FueX0gdGhpbmdcbiAqIEByZXR1cm5zIHt0aGluZyBpcyBGdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzX2Z1bmN0aW9uKHRoaW5nKSB7XG5cdHJldHVybiB0eXBlb2YgdGhpbmcgPT09ICdmdW5jdGlvbic7XG59XG5cbi8qKiBAcmV0dXJucyB7Ym9vbGVhbn0gKi9cbmV4cG9ydCBmdW5jdGlvbiBzYWZlX25vdF9lcXVhbChhLCBiKSB7XG5cdHJldHVybiBhICE9IGEgPyBiID09IGIgOiBhICE9PSBiIHx8IChhICYmIHR5cGVvZiBhID09PSAnb2JqZWN0JykgfHwgdHlwZW9mIGEgPT09ICdmdW5jdGlvbic7XG59XG5cbmxldCBzcmNfdXJsX2VxdWFsX2FuY2hvcjtcblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gZWxlbWVudF9zcmNcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5leHBvcnQgZnVuY3Rpb24gc3JjX3VybF9lcXVhbChlbGVtZW50X3NyYywgdXJsKSB7XG5cdGlmIChlbGVtZW50X3NyYyA9PT0gdXJsKSByZXR1cm4gdHJ1ZTtcblx0aWYgKCFzcmNfdXJsX2VxdWFsX2FuY2hvcikge1xuXHRcdHNyY191cmxfZXF1YWxfYW5jaG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuXHR9XG5cdC8vIFRoaXMgaXMgYWN0dWFsbHkgZmFzdGVyIHRoYW4gZG9pbmcgVVJMKC4uKS5ocmVmXG5cdHNyY191cmxfZXF1YWxfYW5jaG9yLmhyZWYgPSB1cmw7XG5cdHJldHVybiBlbGVtZW50X3NyYyA9PT0gc3JjX3VybF9lcXVhbF9hbmNob3IuaHJlZjtcbn1cblxuLyoqIEBwYXJhbSB7c3RyaW5nfSBzcmNzZXQgKi9cbmZ1bmN0aW9uIHNwbGl0X3NyY3NldChzcmNzZXQpIHtcblx0cmV0dXJuIHNyY3NldC5zcGxpdCgnLCcpLm1hcCgoc3JjKSA9PiBzcmMudHJpbSgpLnNwbGl0KCcgJykuZmlsdGVyKEJvb2xlYW4pKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0hUTUxTb3VyY2VFbGVtZW50IHwgSFRNTEltYWdlRWxlbWVudH0gZWxlbWVudF9zcmNzZXRcbiAqIEBwYXJhbSB7c3RyaW5nIHwgdW5kZWZpbmVkIHwgbnVsbH0gc3Jjc2V0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNyY3NldF91cmxfZXF1YWwoZWxlbWVudF9zcmNzZXQsIHNyY3NldCkge1xuXHRjb25zdCBlbGVtZW50X3VybHMgPSBzcGxpdF9zcmNzZXQoZWxlbWVudF9zcmNzZXQuc3Jjc2V0KTtcblx0Y29uc3QgdXJscyA9IHNwbGl0X3NyY3NldChzcmNzZXQgfHwgJycpO1xuXG5cdHJldHVybiAoXG5cdFx0dXJscy5sZW5ndGggPT09IGVsZW1lbnRfdXJscy5sZW5ndGggJiZcblx0XHR1cmxzLmV2ZXJ5KFxuXHRcdFx0KFt1cmwsIHdpZHRoXSwgaSkgPT5cblx0XHRcdFx0d2lkdGggPT09IGVsZW1lbnRfdXJsc1tpXVsxXSAmJlxuXHRcdFx0XHQvLyBXZSBuZWVkIHRvIHRlc3QgYm90aCB3YXlzIGJlY2F1c2UgVml0ZSB3aWxsIGNyZWF0ZSBhbiBhIGZ1bGwgVVJMIHdpdGhcblx0XHRcdFx0Ly8gYG5ldyBVUkwoYXNzZXQsIGltcG9ydC5tZXRhLnVybCkuaHJlZmAgZm9yIHRoZSBjbGllbnQgd2hlbiBgYmFzZTogJy4vJ2AsIGFuZCB0aGVcblx0XHRcdFx0Ly8gcmVsYXRpdmUgVVJMcyBpbnNpZGUgc3Jjc2V0IGFyZSBub3QgYXV0b21hdGljYWxseSByZXNvbHZlZCB0byBhYnNvbHV0ZSBVUkxzIGJ5XG5cdFx0XHRcdC8vIGJyb3dzZXJzIChpbiBjb250cmFzdCB0byBpbWcuc3JjKS4gVGhpcyBtZWFucyBib3RoIFNTUiBhbmQgRE9NIGNvZGUgY291bGRcblx0XHRcdFx0Ly8gY29udGFpbiByZWxhdGl2ZSBvciBhYnNvbHV0ZSBVUkxzLlxuXHRcdFx0XHQoc3JjX3VybF9lcXVhbChlbGVtZW50X3VybHNbaV1bMF0sIHVybCkgfHwgc3JjX3VybF9lcXVhbCh1cmwsIGVsZW1lbnRfdXJsc1tpXVswXSkpXG5cdFx0KVxuXHQpO1xufVxuXG4vKiogQHJldHVybnMge2Jvb2xlYW59ICovXG5leHBvcnQgZnVuY3Rpb24gbm90X2VxdWFsKGEsIGIpIHtcblx0cmV0dXJuIGEgIT0gYSA/IGIgPT0gYiA6IGEgIT09IGI7XG59XG5cbi8qKiBAcmV0dXJucyB7Ym9vbGVhbn0gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc19lbXB0eShvYmopIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG9iaikubGVuZ3RoID09PSAwO1xufVxuXG4vKiogQHJldHVybnMge3ZvaWR9ICovXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVfc3RvcmUoc3RvcmUsIG5hbWUpIHtcblx0aWYgKHN0b3JlICE9IG51bGwgJiYgdHlwZW9mIHN0b3JlLnN1YnNjcmliZSAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdHRocm93IG5ldyBFcnJvcihgJyR7bmFtZX0nIGlzIG5vdCBhIHN0b3JlIHdpdGggYSAnc3Vic2NyaWJlJyBtZXRob2RgKTtcblx0fVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc3Vic2NyaWJlKHN0b3JlLCAuLi5jYWxsYmFja3MpIHtcblx0aWYgKHN0b3JlID09IG51bGwpIHtcblx0XHRmb3IgKGNvbnN0IGNhbGxiYWNrIG9mIGNhbGxiYWNrcykge1xuXHRcdFx0Y2FsbGJhY2sodW5kZWZpbmVkKTtcblx0XHR9XG5cdFx0cmV0dXJuIG5vb3A7XG5cdH1cblx0Y29uc3QgdW5zdWIgPSBzdG9yZS5zdWJzY3JpYmUoLi4uY2FsbGJhY2tzKTtcblx0cmV0dXJuIHVuc3ViLnVuc3Vic2NyaWJlID8gKCkgPT4gdW5zdWIudW5zdWJzY3JpYmUoKSA6IHVuc3ViO1xufVxuXG4vKipcbiAqIEdldCB0aGUgY3VycmVudCB2YWx1ZSBmcm9tIGEgc3RvcmUgYnkgc3Vic2NyaWJpbmcgYW5kIGltbWVkaWF0ZWx5IHVuc3Vic2NyaWJpbmcuXG4gKlxuICogaHR0cHM6Ly9zdmVsdGUuZGV2L2RvY3Mvc3ZlbHRlLXN0b3JlI2dldFxuICogQHRlbXBsYXRlIFRcbiAqIEBwYXJhbSB7aW1wb3J0KCcuLi9zdG9yZS9wdWJsaWMuanMnKS5SZWFkYWJsZTxUPn0gc3RvcmVcbiAqIEByZXR1cm5zIHtUfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0X3N0b3JlX3ZhbHVlKHN0b3JlKSB7XG5cdGxldCB2YWx1ZTtcblx0c3Vic2NyaWJlKHN0b3JlLCAoXykgPT4gKHZhbHVlID0gXykpKCk7XG5cdHJldHVybiB2YWx1ZTtcbn1cblxuLyoqIEByZXR1cm5zIHt2b2lkfSAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbXBvbmVudF9zdWJzY3JpYmUoY29tcG9uZW50LCBzdG9yZSwgY2FsbGJhY2spIHtcblx0Y29tcG9uZW50LiQkLm9uX2Rlc3Ryb3kucHVzaChzdWJzY3JpYmUoc3RvcmUsIGNhbGxiYWNrKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVfc2xvdChkZWZpbml0aW9uLCBjdHgsICQkc2NvcGUsIGZuKSB7XG5cdGlmIChkZWZpbml0aW9uKSB7XG5cdFx0Y29uc3Qgc2xvdF9jdHggPSBnZXRfc2xvdF9jb250ZXh0KGRlZmluaXRpb24sIGN0eCwgJCRzY29wZSwgZm4pO1xuXHRcdHJldHVybiBkZWZpbml0aW9uWzBdKHNsb3RfY3R4KTtcblx0fVxufVxuXG5mdW5jdGlvbiBnZXRfc2xvdF9jb250ZXh0KGRlZmluaXRpb24sIGN0eCwgJCRzY29wZSwgZm4pIHtcblx0cmV0dXJuIGRlZmluaXRpb25bMV0gJiYgZm4gPyBhc3NpZ24oJCRzY29wZS5jdHguc2xpY2UoKSwgZGVmaW5pdGlvblsxXShmbihjdHgpKSkgOiAkJHNjb3BlLmN0eDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldF9zbG90X2NoYW5nZXMoZGVmaW5pdGlvbiwgJCRzY29wZSwgZGlydHksIGZuKSB7XG5cdGlmIChkZWZpbml0aW9uWzJdICYmIGZuKSB7XG5cdFx0Y29uc3QgbGV0cyA9IGRlZmluaXRpb25bMl0oZm4oZGlydHkpKTtcblx0XHRpZiAoJCRzY29wZS5kaXJ0eSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRyZXR1cm4gbGV0cztcblx0XHR9XG5cdFx0aWYgKHR5cGVvZiBsZXRzID09PSAnb2JqZWN0Jykge1xuXHRcdFx0Y29uc3QgbWVyZ2VkID0gW107XG5cdFx0XHRjb25zdCBsZW4gPSBNYXRoLm1heCgkJHNjb3BlLmRpcnR5Lmxlbmd0aCwgbGV0cy5sZW5ndGgpO1xuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkgKz0gMSkge1xuXHRcdFx0XHRtZXJnZWRbaV0gPSAkJHNjb3BlLmRpcnR5W2ldIHwgbGV0c1tpXTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBtZXJnZWQ7XG5cdFx0fVxuXHRcdHJldHVybiAkJHNjb3BlLmRpcnR5IHwgbGV0cztcblx0fVxuXHRyZXR1cm4gJCRzY29wZS5kaXJ0eTtcbn1cblxuLyoqIEByZXR1cm5zIHt2b2lkfSAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZV9zbG90X2Jhc2UoXG5cdHNsb3QsXG5cdHNsb3RfZGVmaW5pdGlvbixcblx0Y3R4LFxuXHQkJHNjb3BlLFxuXHRzbG90X2NoYW5nZXMsXG5cdGdldF9zbG90X2NvbnRleHRfZm5cbikge1xuXHRpZiAoc2xvdF9jaGFuZ2VzKSB7XG5cdFx0Y29uc3Qgc2xvdF9jb250ZXh0ID0gZ2V0X3Nsb3RfY29udGV4dChzbG90X2RlZmluaXRpb24sIGN0eCwgJCRzY29wZSwgZ2V0X3Nsb3RfY29udGV4dF9mbik7XG5cdFx0c2xvdC5wKHNsb3RfY29udGV4dCwgc2xvdF9jaGFuZ2VzKTtcblx0fVxufVxuXG4vKiogQHJldHVybnMge3ZvaWR9ICovXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlX3Nsb3QoXG5cdHNsb3QsXG5cdHNsb3RfZGVmaW5pdGlvbixcblx0Y3R4LFxuXHQkJHNjb3BlLFxuXHRkaXJ0eSxcblx0Z2V0X3Nsb3RfY2hhbmdlc19mbixcblx0Z2V0X3Nsb3RfY29udGV4dF9mblxuKSB7XG5cdGNvbnN0IHNsb3RfY2hhbmdlcyA9IGdldF9zbG90X2NoYW5nZXMoc2xvdF9kZWZpbml0aW9uLCAkJHNjb3BlLCBkaXJ0eSwgZ2V0X3Nsb3RfY2hhbmdlc19mbik7XG5cdHVwZGF0ZV9zbG90X2Jhc2Uoc2xvdCwgc2xvdF9kZWZpbml0aW9uLCBjdHgsICQkc2NvcGUsIHNsb3RfY2hhbmdlcywgZ2V0X3Nsb3RfY29udGV4dF9mbik7XG59XG5cbi8qKiBAcmV0dXJucyB7YW55W10gfCAtMX0gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRfYWxsX2RpcnR5X2Zyb21fc2NvcGUoJCRzY29wZSkge1xuXHRpZiAoJCRzY29wZS5jdHgubGVuZ3RoID4gMzIpIHtcblx0XHRjb25zdCBkaXJ0eSA9IFtdO1xuXHRcdGNvbnN0IGxlbmd0aCA9ICQkc2NvcGUuY3R4Lmxlbmd0aCAvIDMyO1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcblx0XHRcdGRpcnR5W2ldID0gLTE7XG5cdFx0fVxuXHRcdHJldHVybiBkaXJ0eTtcblx0fVxuXHRyZXR1cm4gLTE7XG59XG5cbi8qKiBAcmV0dXJucyB7e319ICovXG5leHBvcnQgZnVuY3Rpb24gZXhjbHVkZV9pbnRlcm5hbF9wcm9wcyhwcm9wcykge1xuXHRjb25zdCByZXN1bHQgPSB7fTtcblx0Zm9yIChjb25zdCBrIGluIHByb3BzKSBpZiAoa1swXSAhPT0gJyQnKSByZXN1bHRba10gPSBwcm9wc1trXTtcblx0cmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqIEByZXR1cm5zIHt7fX0gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb21wdXRlX3Jlc3RfcHJvcHMocHJvcHMsIGtleXMpIHtcblx0Y29uc3QgcmVzdCA9IHt9O1xuXHRrZXlzID0gbmV3IFNldChrZXlzKTtcblx0Zm9yIChjb25zdCBrIGluIHByb3BzKSBpZiAoIWtleXMuaGFzKGspICYmIGtbMF0gIT09ICckJykgcmVzdFtrXSA9IHByb3BzW2tdO1xuXHRyZXR1cm4gcmVzdDtcbn1cblxuLyoqIEByZXR1cm5zIHt7fX0gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb21wdXRlX3Nsb3RzKHNsb3RzKSB7XG5cdGNvbnN0IHJlc3VsdCA9IHt9O1xuXHRmb3IgKGNvbnN0IGtleSBpbiBzbG90cykge1xuXHRcdHJlc3VsdFtrZXldID0gdHJ1ZTtcblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufVxuXG4vKiogQHJldHVybnMgeyh0aGlzOiBhbnksIC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkfSAqL1xuZXhwb3J0IGZ1bmN0aW9uIG9uY2UoZm4pIHtcblx0bGV0IHJhbiA9IGZhbHNlO1xuXHRyZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcblx0XHRpZiAocmFuKSByZXR1cm47XG5cdFx0cmFuID0gdHJ1ZTtcblx0XHRmbi5jYWxsKHRoaXMsIC4uLmFyZ3MpO1xuXHR9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbnVsbF90b19lbXB0eSh2YWx1ZSkge1xuXHRyZXR1cm4gdmFsdWUgPT0gbnVsbCA/ICcnIDogdmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRfc3RvcmVfdmFsdWUoc3RvcmUsIHJldCwgdmFsdWUpIHtcblx0c3RvcmUuc2V0KHZhbHVlKTtcblx0cmV0dXJuIHJldDtcbn1cblxuZXhwb3J0IGNvbnN0IGhhc19wcm9wID0gKG9iaiwgcHJvcCkgPT4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBhY3Rpb25fZGVzdHJveWVyKGFjdGlvbl9yZXN1bHQpIHtcblx0cmV0dXJuIGFjdGlvbl9yZXN1bHQgJiYgaXNfZnVuY3Rpb24oYWN0aW9uX3Jlc3VsdC5kZXN0cm95KSA/IGFjdGlvbl9yZXN1bHQuZGVzdHJveSA6IG5vb3A7XG59XG5cbi8qKiBAcGFyYW0ge251bWJlciB8IHN0cmluZ30gdmFsdWVcbiAqIEByZXR1cm5zIHtbbnVtYmVyLCBzdHJpbmddfVxuICovXG5leHBvcnQgZnVuY3Rpb24gc3BsaXRfY3NzX3VuaXQodmFsdWUpIHtcblx0Y29uc3Qgc3BsaXQgPSB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmIHZhbHVlLm1hdGNoKC9eXFxzKigtP1tcXGQuXSspKFteXFxzXSopXFxzKiQvKTtcblx0cmV0dXJuIHNwbGl0ID8gW3BhcnNlRmxvYXQoc3BsaXRbMV0pLCBzcGxpdFsyXSB8fCAncHgnXSA6IFsvKiogQHR5cGUge251bWJlcn0gKi8gKHZhbHVlKSwgJ3B4J107XG59XG5cbmV4cG9ydCBjb25zdCBjb250ZW50ZWRpdGFibGVfdHJ1dGh5X3ZhbHVlcyA9IFsnJywgdHJ1ZSwgMSwgJ3RydWUnLCAnY29udGVudGVkaXRhYmxlJ107XG4iLCAiLyoqIEB0eXBlIHt0eXBlb2YgZ2xvYmFsVGhpc30gKi9cbmV4cG9ydCBjb25zdCBnbG9iYWxzID1cblx0dHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCdcblx0XHQ/IHdpbmRvd1xuXHRcdDogdHlwZW9mIGdsb2JhbFRoaXMgIT09ICd1bmRlZmluZWQnXG5cdFx0PyBnbG9iYWxUaGlzXG5cdFx0OiAvLyBAdHMtaWdub3JlIE5vZGUgdHlwaW5ncyBoYXZlIHRoaXNcblx0XHQgIGdsb2JhbDtcbiIsICJpbXBvcnQgeyBnbG9iYWxzIH0gZnJvbSAnLi9nbG9iYWxzLmpzJztcblxuLyoqXG4gKiBSZXNpemUgb2JzZXJ2ZXIgc2luZ2xldG9uLlxuICogT25lIGxpc3RlbmVyIHBlciBlbGVtZW50IG9ubHkhXG4gKiBodHRwczovL2dyb3Vwcy5nb29nbGUuY29tL2EvY2hyb21pdW0ub3JnL2cvYmxpbmstZGV2L2MvejZpZW5PTlViNUEvbS9GNS1WY1VadEJBQUpcbiAqL1xuZXhwb3J0IGNsYXNzIFJlc2l6ZU9ic2VydmVyU2luZ2xldG9uIHtcblx0LyoqXG5cdCAqIEBwcml2YXRlXG5cdCAqIEByZWFkb25seVxuXHQgKiBAdHlwZSB7V2Vha01hcDxFbGVtZW50LCBpbXBvcnQoJy4vcHJpdmF0ZS5qcycpLkxpc3RlbmVyPn1cblx0ICovXG5cdF9saXN0ZW5lcnMgPSAnV2Vha01hcCcgaW4gZ2xvYmFscyA/IG5ldyBXZWFrTWFwKCkgOiB1bmRlZmluZWQ7XG5cblx0LyoqXG5cdCAqIEBwcml2YXRlXG5cdCAqIEB0eXBlIHtSZXNpemVPYnNlcnZlcn1cblx0ICovXG5cdF9vYnNlcnZlciA9IHVuZGVmaW5lZDtcblxuXHQvKiogQHR5cGUge1Jlc2l6ZU9ic2VydmVyT3B0aW9uc30gKi9cblx0b3B0aW9ucztcblxuXHQvKiogQHBhcmFtIHtSZXNpemVPYnNlcnZlck9wdGlvbnN9IG9wdGlvbnMgKi9cblx0Y29uc3RydWN0b3Iob3B0aW9ucykge1xuXHRcdHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG5cdH1cblxuXHQvKipcblx0ICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50XG5cdCAqIEBwYXJhbSB7aW1wb3J0KCcuL3ByaXZhdGUuanMnKS5MaXN0ZW5lcn0gbGlzdGVuZXJcblx0ICogQHJldHVybnMgeygpID0+IHZvaWR9XG5cdCAqL1xuXHRvYnNlcnZlKGVsZW1lbnQsIGxpc3RlbmVyKSB7XG5cdFx0dGhpcy5fbGlzdGVuZXJzLnNldChlbGVtZW50LCBsaXN0ZW5lcik7XG5cdFx0dGhpcy5fZ2V0T2JzZXJ2ZXIoKS5vYnNlcnZlKGVsZW1lbnQsIHRoaXMub3B0aW9ucyk7XG5cdFx0cmV0dXJuICgpID0+IHtcblx0XHRcdHRoaXMuX2xpc3RlbmVycy5kZWxldGUoZWxlbWVudCk7XG5cdFx0XHR0aGlzLl9vYnNlcnZlci51bm9ic2VydmUoZWxlbWVudCk7IC8vIHRoaXMgbGluZSBjYW4gcHJvYmFibHkgYmUgcmVtb3ZlZFxuXHRcdH07XG5cdH1cblxuXHQvKipcblx0ICogQHByaXZhdGVcblx0ICovXG5cdF9nZXRPYnNlcnZlcigpIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0dGhpcy5fb2JzZXJ2ZXIgPz9cblx0XHRcdCh0aGlzLl9vYnNlcnZlciA9IG5ldyBSZXNpemVPYnNlcnZlcigoZW50cmllcykgPT4ge1xuXHRcdFx0XHRmb3IgKGNvbnN0IGVudHJ5IG9mIGVudHJpZXMpIHtcblx0XHRcdFx0XHRSZXNpemVPYnNlcnZlclNpbmdsZXRvbi5lbnRyaWVzLnNldChlbnRyeS50YXJnZXQsIGVudHJ5KTtcblx0XHRcdFx0XHR0aGlzLl9saXN0ZW5lcnMuZ2V0KGVudHJ5LnRhcmdldCk/LihlbnRyeSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pKVxuXHRcdCk7XG5cdH1cbn1cblxuLy8gTmVlZHMgdG8gYmUgd3JpdHRlbiBsaWtlIHRoaXMgdG8gcGFzcyB0aGUgdHJlZS1zaGFrZS10ZXN0XG5SZXNpemVPYnNlcnZlclNpbmdsZXRvbi5lbnRyaWVzID0gJ1dlYWtNYXAnIGluIGdsb2JhbHMgPyBuZXcgV2Vha01hcCgpIDogdW5kZWZpbmVkO1xuIiwgImltcG9ydCB7IGNvbnRlbnRlZGl0YWJsZV90cnV0aHlfdmFsdWVzLCBoYXNfcHJvcCB9IGZyb20gJy4vdXRpbHMuanMnO1xuXG5pbXBvcnQgeyBSZXNpemVPYnNlcnZlclNpbmdsZXRvbiB9IGZyb20gJy4vUmVzaXplT2JzZXJ2ZXJTaW5nbGV0b24uanMnO1xuXG4vLyBUcmFjayB3aGljaCBub2RlcyBhcmUgY2xhaW1lZCBkdXJpbmcgaHlkcmF0aW9uLiBVbmNsYWltZWQgbm9kZXMgY2FuIHRoZW4gYmUgcmVtb3ZlZCBmcm9tIHRoZSBET01cbi8vIGF0IHRoZSBlbmQgb2YgaHlkcmF0aW9uIHdpdGhvdXQgdG91Y2hpbmcgdGhlIHJlbWFpbmluZyBub2Rlcy5cbmxldCBpc19oeWRyYXRpbmcgPSBmYWxzZTtcblxuLyoqXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0X2h5ZHJhdGluZygpIHtcblx0aXNfaHlkcmF0aW5nID0gdHJ1ZTtcbn1cblxuLyoqXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVuZF9oeWRyYXRpbmcoKSB7XG5cdGlzX2h5ZHJhdGluZyA9IGZhbHNlO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7bnVtYmVyfSBsb3dcbiAqIEBwYXJhbSB7bnVtYmVyfSBoaWdoXG4gKiBAcGFyYW0geyhpbmRleDogbnVtYmVyKSA9PiBudW1iZXJ9IGtleVxuICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICovXG5mdW5jdGlvbiB1cHBlcl9ib3VuZChsb3csIGhpZ2gsIGtleSwgdmFsdWUpIHtcblx0Ly8gUmV0dXJuIGZpcnN0IGluZGV4IG9mIHZhbHVlIGxhcmdlciB0aGFuIGlucHV0IHZhbHVlIGluIHRoZSByYW5nZSBbbG93LCBoaWdoKVxuXHR3aGlsZSAobG93IDwgaGlnaCkge1xuXHRcdGNvbnN0IG1pZCA9IGxvdyArICgoaGlnaCAtIGxvdykgPj4gMSk7XG5cdFx0aWYgKGtleShtaWQpIDw9IHZhbHVlKSB7XG5cdFx0XHRsb3cgPSBtaWQgKyAxO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRoaWdoID0gbWlkO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gbG93O1xufVxuXG4vKipcbiAqIEBwYXJhbSB7Tm9kZUV4fSB0YXJnZXRcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5mdW5jdGlvbiBpbml0X2h5ZHJhdGUodGFyZ2V0KSB7XG5cdGlmICh0YXJnZXQuaHlkcmF0ZV9pbml0KSByZXR1cm47XG5cdHRhcmdldC5oeWRyYXRlX2luaXQgPSB0cnVlO1xuXHQvLyBXZSBrbm93IHRoYXQgYWxsIGNoaWxkcmVuIGhhdmUgY2xhaW1fb3JkZXIgdmFsdWVzIHNpbmNlIHRoZSB1bmNsYWltZWQgaGF2ZSBiZWVuIGRldGFjaGVkIGlmIHRhcmdldCBpcyBub3QgPGhlYWQ+XG5cblx0bGV0IGNoaWxkcmVuID0gLyoqIEB0eXBlIHtBcnJheUxpa2U8Tm9kZUV4Mj59ICovICh0YXJnZXQuY2hpbGROb2Rlcyk7XG5cdC8vIElmIHRhcmdldCBpcyA8aGVhZD4sIHRoZXJlIG1heSBiZSBjaGlsZHJlbiB3aXRob3V0IGNsYWltX29yZGVyXG5cdGlmICh0YXJnZXQubm9kZU5hbWUgPT09ICdIRUFEJykge1xuXHRcdGNvbnN0IG15X2NoaWxkcmVuID0gW107XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuXHRcdFx0Y29uc3Qgbm9kZSA9IGNoaWxkcmVuW2ldO1xuXHRcdFx0aWYgKG5vZGUuY2xhaW1fb3JkZXIgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRteV9jaGlsZHJlbi5wdXNoKG5vZGUpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRjaGlsZHJlbiA9IG15X2NoaWxkcmVuO1xuXHR9XG5cdC8qXG5cdCAqIFJlb3JkZXIgY2xhaW1lZCBjaGlsZHJlbiBvcHRpbWFsbHkuXG5cdCAqIFdlIGNhbiByZW9yZGVyIGNsYWltZWQgY2hpbGRyZW4gb3B0aW1hbGx5IGJ5IGZpbmRpbmcgdGhlIGxvbmdlc3Qgc3Vic2VxdWVuY2Ugb2Zcblx0ICogbm9kZXMgdGhhdCBhcmUgYWxyZWFkeSBjbGFpbWVkIGluIG9yZGVyIGFuZCBvbmx5IG1vdmluZyB0aGUgcmVzdC4gVGhlIGxvbmdlc3Rcblx0ICogc3Vic2VxdWVuY2Ugb2Ygbm9kZXMgdGhhdCBhcmUgY2xhaW1lZCBpbiBvcmRlciBjYW4gYmUgZm91bmQgYnlcblx0ICogY29tcHV0aW5nIHRoZSBsb25nZXN0IGluY3JlYXNpbmcgc3Vic2VxdWVuY2Ugb2YgLmNsYWltX29yZGVyIHZhbHVlcy5cblx0ICpcblx0ICogVGhpcyBhbGdvcml0aG0gaXMgb3B0aW1hbCBpbiBnZW5lcmF0aW5nIHRoZSBsZWFzdCBhbW91bnQgb2YgcmVvcmRlciBvcGVyYXRpb25zXG5cdCAqIHBvc3NpYmxlLlxuXHQgKlxuXHQgKiBQcm9vZjpcblx0ICogV2Uga25vdyB0aGF0LCBnaXZlbiBhIHNldCBvZiByZW9yZGVyaW5nIG9wZXJhdGlvbnMsIHRoZSBub2RlcyB0aGF0IGRvIG5vdCBtb3ZlXG5cdCAqIGFsd2F5cyBmb3JtIGFuIGluY3JlYXNpbmcgc3Vic2VxdWVuY2UsIHNpbmNlIHRoZXkgZG8gbm90IG1vdmUgYW1vbmcgZWFjaCBvdGhlclxuXHQgKiBtZWFuaW5nIHRoYXQgdGhleSBtdXN0IGJlIGFscmVhZHkgb3JkZXJlZCBhbW9uZyBlYWNoIG90aGVyLiBUaHVzLCB0aGUgbWF4aW1hbFxuXHQgKiBzZXQgb2Ygbm9kZXMgdGhhdCBkbyBub3QgbW92ZSBmb3JtIGEgbG9uZ2VzdCBpbmNyZWFzaW5nIHN1YnNlcXVlbmNlLlxuXHQgKi9cblx0Ly8gQ29tcHV0ZSBsb25nZXN0IGluY3JlYXNpbmcgc3Vic2VxdWVuY2Vcblx0Ly8gbTogc3Vic2VxdWVuY2UgbGVuZ3RoIGogPT4gaW5kZXggayBvZiBzbWFsbGVzdCB2YWx1ZSB0aGF0IGVuZHMgYW4gaW5jcmVhc2luZyBzdWJzZXF1ZW5jZSBvZiBsZW5ndGggalxuXHRjb25zdCBtID0gbmV3IEludDMyQXJyYXkoY2hpbGRyZW4ubGVuZ3RoICsgMSk7XG5cdC8vIFByZWRlY2Vzc29yIGluZGljZXMgKyAxXG5cdGNvbnN0IHAgPSBuZXcgSW50MzJBcnJheShjaGlsZHJlbi5sZW5ndGgpO1xuXHRtWzBdID0gLTE7XG5cdGxldCBsb25nZXN0ID0gMDtcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuXHRcdGNvbnN0IGN1cnJlbnQgPSBjaGlsZHJlbltpXS5jbGFpbV9vcmRlcjtcblx0XHQvLyBGaW5kIHRoZSBsYXJnZXN0IHN1YnNlcXVlbmNlIGxlbmd0aCBzdWNoIHRoYXQgaXQgZW5kcyBpbiBhIHZhbHVlIGxlc3MgdGhhbiBvdXIgY3VycmVudCB2YWx1ZVxuXHRcdC8vIHVwcGVyX2JvdW5kIHJldHVybnMgZmlyc3QgZ3JlYXRlciB2YWx1ZSwgc28gd2Ugc3VidHJhY3Qgb25lXG5cdFx0Ly8gd2l0aCBmYXN0IHBhdGggZm9yIHdoZW4gd2UgYXJlIG9uIHRoZSBjdXJyZW50IGxvbmdlc3Qgc3Vic2VxdWVuY2Vcblx0XHRjb25zdCBzZXFfbGVuID1cblx0XHRcdChsb25nZXN0ID4gMCAmJiBjaGlsZHJlblttW2xvbmdlc3RdXS5jbGFpbV9vcmRlciA8PSBjdXJyZW50XG5cdFx0XHRcdD8gbG9uZ2VzdCArIDFcblx0XHRcdFx0OiB1cHBlcl9ib3VuZCgxLCBsb25nZXN0LCAoaWR4KSA9PiBjaGlsZHJlblttW2lkeF1dLmNsYWltX29yZGVyLCBjdXJyZW50KSkgLSAxO1xuXHRcdHBbaV0gPSBtW3NlcV9sZW5dICsgMTtcblx0XHRjb25zdCBuZXdfbGVuID0gc2VxX2xlbiArIDE7XG5cdFx0Ly8gV2UgY2FuIGd1YXJhbnRlZSB0aGF0IGN1cnJlbnQgaXMgdGhlIHNtYWxsZXN0IHZhbHVlLiBPdGhlcndpc2UsIHdlIHdvdWxkIGhhdmUgZ2VuZXJhdGVkIGEgbG9uZ2VyIHNlcXVlbmNlLlxuXHRcdG1bbmV3X2xlbl0gPSBpO1xuXHRcdGxvbmdlc3QgPSBNYXRoLm1heChuZXdfbGVuLCBsb25nZXN0KTtcblx0fVxuXHQvLyBUaGUgbG9uZ2VzdCBpbmNyZWFzaW5nIHN1YnNlcXVlbmNlIG9mIG5vZGVzIChpbml0aWFsbHkgcmV2ZXJzZWQpXG5cblx0LyoqXG5cdCAqIEB0eXBlIHtOb2RlRXgyW119XG5cdCAqL1xuXHRjb25zdCBsaXMgPSBbXTtcblx0Ly8gVGhlIHJlc3Qgb2YgdGhlIG5vZGVzLCBub2RlcyB0aGF0IHdpbGwgYmUgbW92ZWRcblxuXHQvKipcblx0ICogQHR5cGUge05vZGVFeDJbXX1cblx0ICovXG5cdGNvbnN0IHRvX21vdmUgPSBbXTtcblx0bGV0IGxhc3QgPSBjaGlsZHJlbi5sZW5ndGggLSAxO1xuXHRmb3IgKGxldCBjdXIgPSBtW2xvbmdlc3RdICsgMTsgY3VyICE9IDA7IGN1ciA9IHBbY3VyIC0gMV0pIHtcblx0XHRsaXMucHVzaChjaGlsZHJlbltjdXIgLSAxXSk7XG5cdFx0Zm9yICg7IGxhc3QgPj0gY3VyOyBsYXN0LS0pIHtcblx0XHRcdHRvX21vdmUucHVzaChjaGlsZHJlbltsYXN0XSk7XG5cdFx0fVxuXHRcdGxhc3QtLTtcblx0fVxuXHRmb3IgKDsgbGFzdCA+PSAwOyBsYXN0LS0pIHtcblx0XHR0b19tb3ZlLnB1c2goY2hpbGRyZW5bbGFzdF0pO1xuXHR9XG5cdGxpcy5yZXZlcnNlKCk7XG5cdC8vIFdlIHNvcnQgdGhlIG5vZGVzIGJlaW5nIG1vdmVkIHRvIGd1YXJhbnRlZSB0aGF0IHRoZWlyIGluc2VydGlvbiBvcmRlciBtYXRjaGVzIHRoZSBjbGFpbSBvcmRlclxuXHR0b19tb3ZlLnNvcnQoKGEsIGIpID0+IGEuY2xhaW1fb3JkZXIgLSBiLmNsYWltX29yZGVyKTtcblx0Ly8gRmluYWxseSwgd2UgbW92ZSB0aGUgbm9kZXNcblx0Zm9yIChsZXQgaSA9IDAsIGogPSAwOyBpIDwgdG9fbW92ZS5sZW5ndGg7IGkrKykge1xuXHRcdHdoaWxlIChqIDwgbGlzLmxlbmd0aCAmJiB0b19tb3ZlW2ldLmNsYWltX29yZGVyID49IGxpc1tqXS5jbGFpbV9vcmRlcikge1xuXHRcdFx0aisrO1xuXHRcdH1cblx0XHRjb25zdCBhbmNob3IgPSBqIDwgbGlzLmxlbmd0aCA/IGxpc1tqXSA6IG51bGw7XG5cdFx0dGFyZ2V0Lmluc2VydEJlZm9yZSh0b19tb3ZlW2ldLCBhbmNob3IpO1xuXHR9XG59XG5cbi8qKlxuICogQHBhcmFtIHtOb2RlfSB0YXJnZXRcbiAqIEBwYXJhbSB7Tm9kZX0gbm9kZVxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhcHBlbmQodGFyZ2V0LCBub2RlKSB7XG5cdHRhcmdldC5hcHBlbmRDaGlsZChub2RlKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge05vZGV9IHRhcmdldFxuICogQHBhcmFtIHtzdHJpbmd9IHN0eWxlX3NoZWV0X2lkXG4gKiBAcGFyYW0ge3N0cmluZ30gc3R5bGVzXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFwcGVuZF9zdHlsZXModGFyZ2V0LCBzdHlsZV9zaGVldF9pZCwgc3R5bGVzKSB7XG5cdGNvbnN0IGFwcGVuZF9zdHlsZXNfdG8gPSBnZXRfcm9vdF9mb3Jfc3R5bGUodGFyZ2V0KTtcblx0aWYgKCFhcHBlbmRfc3R5bGVzX3RvLmdldEVsZW1lbnRCeUlkKHN0eWxlX3NoZWV0X2lkKSkge1xuXHRcdGNvbnN0IHN0eWxlID0gZWxlbWVudCgnc3R5bGUnKTtcblx0XHRzdHlsZS5pZCA9IHN0eWxlX3NoZWV0X2lkO1xuXHRcdHN0eWxlLnRleHRDb250ZW50ID0gc3R5bGVzO1xuXHRcdGFwcGVuZF9zdHlsZXNoZWV0KGFwcGVuZF9zdHlsZXNfdG8sIHN0eWxlKTtcblx0fVxufVxuXG4vKipcbiAqIEBwYXJhbSB7Tm9kZX0gbm9kZVxuICogQHJldHVybnMge1NoYWRvd1Jvb3QgfCBEb2N1bWVudH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldF9yb290X2Zvcl9zdHlsZShub2RlKSB7XG5cdGlmICghbm9kZSkgcmV0dXJuIGRvY3VtZW50O1xuXHRjb25zdCByb290ID0gbm9kZS5nZXRSb290Tm9kZSA/IG5vZGUuZ2V0Um9vdE5vZGUoKSA6IG5vZGUub3duZXJEb2N1bWVudDtcblx0aWYgKHJvb3QgJiYgLyoqIEB0eXBlIHtTaGFkb3dSb290fSAqLyAocm9vdCkuaG9zdCkge1xuXHRcdHJldHVybiAvKiogQHR5cGUge1NoYWRvd1Jvb3R9ICovIChyb290KTtcblx0fVxuXHRyZXR1cm4gbm9kZS5vd25lckRvY3VtZW50O1xufVxuXG4vKipcbiAqIEBwYXJhbSB7Tm9kZX0gbm9kZVxuICogQHJldHVybnMge0NTU1N0eWxlU2hlZXR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhcHBlbmRfZW1wdHlfc3R5bGVzaGVldChub2RlKSB7XG5cdGNvbnN0IHN0eWxlX2VsZW1lbnQgPSBlbGVtZW50KCdzdHlsZScpO1xuXHQvLyBGb3IgdHJhbnNpdGlvbnMgdG8gd29yayB3aXRob3V0ICdzdHlsZS1zcmM6IHVuc2FmZS1pbmxpbmUnIENvbnRlbnQgU2VjdXJpdHkgUG9saWN5LFxuXHQvLyB0aGVzZSBlbXB0eSB0YWdzIG5lZWQgdG8gYmUgYWxsb3dlZCB3aXRoIGEgaGFzaCBhcyBhIHdvcmthcm91bmQgdW50aWwgd2UgbW92ZSB0byB0aGUgV2ViIEFuaW1hdGlvbnMgQVBJLlxuXHQvLyBVc2luZyB0aGUgaGFzaCBmb3IgdGhlIGVtcHR5IHN0cmluZyAoZm9yIGFuIGVtcHR5IHRhZykgd29ya3MgaW4gYWxsIGJyb3dzZXJzIGV4Y2VwdCBTYWZhcmkuXG5cdC8vIFNvIGFzIGEgd29ya2Fyb3VuZCBmb3IgdGhlIHdvcmthcm91bmQsIHdoZW4gd2UgYXBwZW5kIGVtcHR5IHN0eWxlIHRhZ3Mgd2Ugc2V0IHRoZWlyIGNvbnRlbnQgdG8gLyogZW1wdHkgKi8uXG5cdC8vIFRoZSBoYXNoICdzaGEyNTYtOU9sTk8wRE5FZWFWekhMNFJad0NMc0JIQThXQlE4dG9CcC80RjVYVjJuYz0nIHdpbGwgdGhlbiB3b3JrIGV2ZW4gaW4gU2FmYXJpLlxuXHRzdHlsZV9lbGVtZW50LnRleHRDb250ZW50ID0gJy8qIGVtcHR5ICovJztcblx0YXBwZW5kX3N0eWxlc2hlZXQoZ2V0X3Jvb3RfZm9yX3N0eWxlKG5vZGUpLCBzdHlsZV9lbGVtZW50KTtcblx0cmV0dXJuIHN0eWxlX2VsZW1lbnQuc2hlZXQ7XG59XG5cbi8qKlxuICogQHBhcmFtIHtTaGFkb3dSb290IHwgRG9jdW1lbnR9IG5vZGVcbiAqIEBwYXJhbSB7SFRNTFN0eWxlRWxlbWVudH0gc3R5bGVcbiAqIEByZXR1cm5zIHtDU1NTdHlsZVNoZWV0fVxuICovXG5mdW5jdGlvbiBhcHBlbmRfc3R5bGVzaGVldChub2RlLCBzdHlsZSkge1xuXHRhcHBlbmQoLyoqIEB0eXBlIHtEb2N1bWVudH0gKi8gKG5vZGUpLmhlYWQgfHwgbm9kZSwgc3R5bGUpO1xuXHRyZXR1cm4gc3R5bGUuc2hlZXQ7XG59XG5cbi8qKlxuICogQHBhcmFtIHtOb2RlRXh9IHRhcmdldFxuICogQHBhcmFtIHtOb2RlRXh9IG5vZGVcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gYXBwZW5kX2h5ZHJhdGlvbih0YXJnZXQsIG5vZGUpIHtcblx0aWYgKGlzX2h5ZHJhdGluZykge1xuXHRcdGluaXRfaHlkcmF0ZSh0YXJnZXQpO1xuXHRcdGlmIChcblx0XHRcdHRhcmdldC5hY3R1YWxfZW5kX2NoaWxkID09PSB1bmRlZmluZWQgfHxcblx0XHRcdCh0YXJnZXQuYWN0dWFsX2VuZF9jaGlsZCAhPT0gbnVsbCAmJiB0YXJnZXQuYWN0dWFsX2VuZF9jaGlsZC5wYXJlbnROb2RlICE9PSB0YXJnZXQpXG5cdFx0KSB7XG5cdFx0XHR0YXJnZXQuYWN0dWFsX2VuZF9jaGlsZCA9IHRhcmdldC5maXJzdENoaWxkO1xuXHRcdH1cblx0XHQvLyBTa2lwIG5vZGVzIG9mIHVuZGVmaW5lZCBvcmRlcmluZ1xuXHRcdHdoaWxlICh0YXJnZXQuYWN0dWFsX2VuZF9jaGlsZCAhPT0gbnVsbCAmJiB0YXJnZXQuYWN0dWFsX2VuZF9jaGlsZC5jbGFpbV9vcmRlciA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHR0YXJnZXQuYWN0dWFsX2VuZF9jaGlsZCA9IHRhcmdldC5hY3R1YWxfZW5kX2NoaWxkLm5leHRTaWJsaW5nO1xuXHRcdH1cblx0XHRpZiAobm9kZSAhPT0gdGFyZ2V0LmFjdHVhbF9lbmRfY2hpbGQpIHtcblx0XHRcdC8vIFdlIG9ubHkgaW5zZXJ0IGlmIHRoZSBvcmRlcmluZyBvZiB0aGlzIG5vZGUgc2hvdWxkIGJlIG1vZGlmaWVkIG9yIHRoZSBwYXJlbnQgbm9kZSBpcyBub3QgdGFyZ2V0XG5cdFx0XHRpZiAobm9kZS5jbGFpbV9vcmRlciAhPT0gdW5kZWZpbmVkIHx8IG5vZGUucGFyZW50Tm9kZSAhPT0gdGFyZ2V0KSB7XG5cdFx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUobm9kZSwgdGFyZ2V0LmFjdHVhbF9lbmRfY2hpbGQpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR0YXJnZXQuYWN0dWFsX2VuZF9jaGlsZCA9IG5vZGUubmV4dFNpYmxpbmc7XG5cdFx0fVxuXHR9IGVsc2UgaWYgKG5vZGUucGFyZW50Tm9kZSAhPT0gdGFyZ2V0IHx8IG5vZGUubmV4dFNpYmxpbmcgIT09IG51bGwpIHtcblx0XHR0YXJnZXQuYXBwZW5kQ2hpbGQobm9kZSk7XG5cdH1cbn1cblxuLyoqXG4gKiBAcGFyYW0ge05vZGV9IHRhcmdldFxuICogQHBhcmFtIHtOb2RlfSBub2RlXG4gKiBAcGFyYW0ge05vZGV9IFthbmNob3JdXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluc2VydCh0YXJnZXQsIG5vZGUsIGFuY2hvcikge1xuXHR0YXJnZXQuaW5zZXJ0QmVmb3JlKG5vZGUsIGFuY2hvciB8fCBudWxsKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge05vZGVFeH0gdGFyZ2V0XG4gKiBAcGFyYW0ge05vZGVFeH0gbm9kZVxuICogQHBhcmFtIHtOb2RlRXh9IFthbmNob3JdXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluc2VydF9oeWRyYXRpb24odGFyZ2V0LCBub2RlLCBhbmNob3IpIHtcblx0aWYgKGlzX2h5ZHJhdGluZyAmJiAhYW5jaG9yKSB7XG5cdFx0YXBwZW5kX2h5ZHJhdGlvbih0YXJnZXQsIG5vZGUpO1xuXHR9IGVsc2UgaWYgKG5vZGUucGFyZW50Tm9kZSAhPT0gdGFyZ2V0IHx8IG5vZGUubmV4dFNpYmxpbmcgIT0gYW5jaG9yKSB7XG5cdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShub2RlLCBhbmNob3IgfHwgbnVsbCk7XG5cdH1cbn1cblxuLyoqXG4gKiBAcGFyYW0ge05vZGV9IG5vZGVcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZGV0YWNoKG5vZGUpIHtcblx0aWYgKG5vZGUucGFyZW50Tm9kZSkge1xuXHRcdG5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlKTtcblx0fVxufVxuXG4vKipcbiAqIEByZXR1cm5zIHt2b2lkfSAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlc3Ryb3lfZWFjaChpdGVyYXRpb25zLCBkZXRhY2hpbmcpIHtcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBpdGVyYXRpb25zLmxlbmd0aDsgaSArPSAxKSB7XG5cdFx0aWYgKGl0ZXJhdGlvbnNbaV0pIGl0ZXJhdGlvbnNbaV0uZChkZXRhY2hpbmcpO1xuXHR9XG59XG5cbi8qKlxuICogQHRlbXBsYXRlIHtrZXlvZiBIVE1MRWxlbWVudFRhZ05hbWVNYXB9IEtcbiAqIEBwYXJhbSB7S30gbmFtZVxuICogQHJldHVybnMge0hUTUxFbGVtZW50VGFnTmFtZU1hcFtLXX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVsZW1lbnQobmFtZSkge1xuXHRyZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChuYW1lKTtcbn1cblxuLyoqXG4gKiBAdGVtcGxhdGUge2tleW9mIEhUTUxFbGVtZW50VGFnTmFtZU1hcH0gS1xuICogQHBhcmFtIHtLfSBuYW1lXG4gKiBAcGFyYW0ge3N0cmluZ30gaXNcbiAqIEByZXR1cm5zIHtIVE1MRWxlbWVudFRhZ05hbWVNYXBbS119XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBlbGVtZW50X2lzKG5hbWUsIGlzKSB7XG5cdHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KG5hbWUsIHsgaXMgfSk7XG59XG5cbi8qKlxuICogQHRlbXBsYXRlIFRcbiAqIEB0ZW1wbGF0ZSB7a2V5b2YgVH0gS1xuICogQHBhcmFtIHtUfSBvYmpcbiAqIEBwYXJhbSB7S1tdfSBleGNsdWRlXG4gKiBAcmV0dXJucyB7UGljazxULCBFeGNsdWRlPGtleW9mIFQsIEs+Pn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG9iamVjdF93aXRob3V0X3Byb3BlcnRpZXMob2JqLCBleGNsdWRlKSB7XG5cdGNvbnN0IHRhcmdldCA9IC8qKiBAdHlwZSB7UGljazxULCBFeGNsdWRlPGtleW9mIFQsIEs+Pn0gKi8gKHt9KTtcblx0Zm9yIChjb25zdCBrIGluIG9iaikge1xuXHRcdGlmIChcblx0XHRcdGhhc19wcm9wKG9iaiwgaykgJiZcblx0XHRcdC8vIEB0cy1pZ25vcmVcblx0XHRcdGV4Y2x1ZGUuaW5kZXhPZihrKSA9PT0gLTFcblx0XHQpIHtcblx0XHRcdC8vIEB0cy1pZ25vcmVcblx0XHRcdHRhcmdldFtrXSA9IG9ialtrXTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHRhcmdldDtcbn1cblxuLyoqXG4gKiBAdGVtcGxhdGUge2tleW9mIFNWR0VsZW1lbnRUYWdOYW1lTWFwfSBLXG4gKiBAcGFyYW0ge0t9IG5hbWVcbiAqIEByZXR1cm5zIHtTVkdFbGVtZW50fVxuICovXG5leHBvcnQgZnVuY3Rpb24gc3ZnX2VsZW1lbnQobmFtZSkge1xuXHRyZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsIG5hbWUpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBkYXRhXG4gKiBAcmV0dXJucyB7VGV4dH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRleHQoZGF0YSkge1xuXHRyZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoZGF0YSk7XG59XG5cbi8qKlxuICogQHJldHVybnMge1RleHR9ICovXG5leHBvcnQgZnVuY3Rpb24gc3BhY2UoKSB7XG5cdHJldHVybiB0ZXh0KCcgJyk7XG59XG5cbi8qKlxuICogQHJldHVybnMge1RleHR9ICovXG5leHBvcnQgZnVuY3Rpb24gZW1wdHkoKSB7XG5cdHJldHVybiB0ZXh0KCcnKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gY29udGVudFxuICogQHJldHVybnMge0NvbW1lbnR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb21tZW50KGNvbnRlbnQpIHtcblx0cmV0dXJuIGRvY3VtZW50LmNyZWF0ZUNvbW1lbnQoY29udGVudCk7XG59XG5cbi8qKlxuICogQHBhcmFtIHtFdmVudFRhcmdldH0gbm9kZVxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50XG4gKiBAcGFyYW0ge0V2ZW50TGlzdGVuZXJPckV2ZW50TGlzdGVuZXJPYmplY3R9IGhhbmRsZXJcbiAqIEBwYXJhbSB7Ym9vbGVhbiB8IEFkZEV2ZW50TGlzdGVuZXJPcHRpb25zIHwgRXZlbnRMaXN0ZW5lck9wdGlvbnN9IFtvcHRpb25zXVxuICogQHJldHVybnMgeygpID0+IHZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsaXN0ZW4obm9kZSwgZXZlbnQsIGhhbmRsZXIsIG9wdGlvbnMpIHtcblx0bm9kZS5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyLCBvcHRpb25zKTtcblx0cmV0dXJuICgpID0+IG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlciwgb3B0aW9ucyk7XG59XG5cbi8qKlxuICogQHJldHVybnMgeyhldmVudDogYW55KSA9PiBhbnl9ICovXG5leHBvcnQgZnVuY3Rpb24gcHJldmVudF9kZWZhdWx0KGZuKSB7XG5cdHJldHVybiBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdC8vIEB0cy1pZ25vcmVcblx0XHRyZXR1cm4gZm4uY2FsbCh0aGlzLCBldmVudCk7XG5cdH07XG59XG5cbi8qKlxuICogQHJldHVybnMgeyhldmVudDogYW55KSA9PiBhbnl9ICovXG5leHBvcnQgZnVuY3Rpb24gc3RvcF9wcm9wYWdhdGlvbihmbikge1xuXHRyZXR1cm4gZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdHJldHVybiBmbi5jYWxsKHRoaXMsIGV2ZW50KTtcblx0fTtcbn1cblxuLyoqXG4gKiBAcmV0dXJucyB7KGV2ZW50OiBhbnkpID0+IGFueX0gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdG9wX2ltbWVkaWF0ZV9wcm9wYWdhdGlvbihmbikge1xuXHRyZXR1cm4gZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0ZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG5cdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdHJldHVybiBmbi5jYWxsKHRoaXMsIGV2ZW50KTtcblx0fTtcbn1cblxuLyoqXG4gKiBAcmV0dXJucyB7KGV2ZW50OiBhbnkpID0+IHZvaWR9ICovXG5leHBvcnQgZnVuY3Rpb24gc2VsZihmbikge1xuXHRyZXR1cm4gZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdGlmIChldmVudC50YXJnZXQgPT09IHRoaXMpIGZuLmNhbGwodGhpcywgZXZlbnQpO1xuXHR9O1xufVxuXG4vKipcbiAqIEByZXR1cm5zIHsoZXZlbnQ6IGFueSkgPT4gdm9pZH0gKi9cbmV4cG9ydCBmdW5jdGlvbiB0cnVzdGVkKGZuKSB7XG5cdHJldHVybiBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHQvLyBAdHMtaWdub3JlXG5cdFx0aWYgKGV2ZW50LmlzVHJ1c3RlZCkgZm4uY2FsbCh0aGlzLCBldmVudCk7XG5cdH07XG59XG5cbi8qKlxuICogQHBhcmFtIHtFbGVtZW50fSBub2RlXG4gKiBAcGFyYW0ge3N0cmluZ30gYXR0cmlidXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gW3ZhbHVlXVxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhdHRyKG5vZGUsIGF0dHJpYnV0ZSwgdmFsdWUpIHtcblx0aWYgKHZhbHVlID09IG51bGwpIG5vZGUucmVtb3ZlQXR0cmlidXRlKGF0dHJpYnV0ZSk7XG5cdGVsc2UgaWYgKG5vZGUuZ2V0QXR0cmlidXRlKGF0dHJpYnV0ZSkgIT09IHZhbHVlKSBub2RlLnNldEF0dHJpYnV0ZShhdHRyaWJ1dGUsIHZhbHVlKTtcbn1cbi8qKlxuICogTGlzdCBvZiBhdHRyaWJ1dGVzIHRoYXQgc2hvdWxkIGFsd2F5cyBiZSBzZXQgdGhyb3VnaCB0aGUgYXR0ciBtZXRob2QsXG4gKiBiZWNhdXNlIHVwZGF0aW5nIHRoZW0gdGhyb3VnaCB0aGUgcHJvcGVydHkgc2V0dGVyIGRvZXNuJ3Qgd29yayByZWxpYWJseS5cbiAqIEluIHRoZSBleGFtcGxlIG9mIGB3aWR0aGAvYGhlaWdodGAsIHRoZSBwcm9ibGVtIGlzIHRoYXQgdGhlIHNldHRlciBvbmx5XG4gKiBhY2NlcHRzIG51bWVyaWMgdmFsdWVzLCBidXQgdGhlIGF0dHJpYnV0ZSBjYW4gYWxzbyBiZSBzZXQgdG8gYSBzdHJpbmcgbGlrZSBgNTAlYC5cbiAqIElmIHRoaXMgbGlzdCBiZWNvbWVzIHRvbyBiaWcsIHJldGhpbmsgdGhpcyBhcHByb2FjaC5cbiAqL1xuY29uc3QgYWx3YXlzX3NldF90aHJvdWdoX3NldF9hdHRyaWJ1dGUgPSBbJ3dpZHRoJywgJ2hlaWdodCddO1xuXG4vKipcbiAqIEBwYXJhbSB7RWxlbWVudCAmIEVsZW1lbnRDU1NJbmxpbmVTdHlsZX0gbm9kZVxuICogQHBhcmFtIHt7IFt4OiBzdHJpbmddOiBzdHJpbmcgfX0gYXR0cmlidXRlc1xuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRfYXR0cmlidXRlcyhub2RlLCBhdHRyaWJ1dGVzKSB7XG5cdC8vIEB0cy1pZ25vcmVcblx0Y29uc3QgZGVzY3JpcHRvcnMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhub2RlLl9fcHJvdG9fXyk7XG5cdGZvciAoY29uc3Qga2V5IGluIGF0dHJpYnV0ZXMpIHtcblx0XHRpZiAoYXR0cmlidXRlc1trZXldID09IG51bGwpIHtcblx0XHRcdG5vZGUucmVtb3ZlQXR0cmlidXRlKGtleSk7XG5cdFx0fSBlbHNlIGlmIChrZXkgPT09ICdzdHlsZScpIHtcblx0XHRcdG5vZGUuc3R5bGUuY3NzVGV4dCA9IGF0dHJpYnV0ZXNba2V5XTtcblx0XHR9IGVsc2UgaWYgKGtleSA9PT0gJ19fdmFsdWUnKSB7XG5cdFx0XHQvKiogQHR5cGUge2FueX0gKi8gKG5vZGUpLnZhbHVlID0gbm9kZVtrZXldID0gYXR0cmlidXRlc1trZXldO1xuXHRcdH0gZWxzZSBpZiAoXG5cdFx0XHRkZXNjcmlwdG9yc1trZXldICYmXG5cdFx0XHRkZXNjcmlwdG9yc1trZXldLnNldCAmJlxuXHRcdFx0YWx3YXlzX3NldF90aHJvdWdoX3NldF9hdHRyaWJ1dGUuaW5kZXhPZihrZXkpID09PSAtMVxuXHRcdCkge1xuXHRcdFx0bm9kZVtrZXldID0gYXR0cmlidXRlc1trZXldO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRhdHRyKG5vZGUsIGtleSwgYXR0cmlidXRlc1trZXldKTtcblx0XHR9XG5cdH1cbn1cblxuLyoqXG4gKiBAcGFyYW0ge0VsZW1lbnQgJiBFbGVtZW50Q1NTSW5saW5lU3R5bGV9IG5vZGVcbiAqIEBwYXJhbSB7eyBbeDogc3RyaW5nXTogc3RyaW5nIH19IGF0dHJpYnV0ZXNcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0X3N2Z19hdHRyaWJ1dGVzKG5vZGUsIGF0dHJpYnV0ZXMpIHtcblx0Zm9yIChjb25zdCBrZXkgaW4gYXR0cmlidXRlcykge1xuXHRcdGF0dHIobm9kZSwga2V5LCBhdHRyaWJ1dGVzW2tleV0pO1xuXHR9XG59XG5cbi8qKlxuICogQHBhcmFtIHtSZWNvcmQ8c3RyaW5nLCB1bmtub3duPn0gZGF0YV9tYXBcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0X2N1c3RvbV9lbGVtZW50X2RhdGFfbWFwKG5vZGUsIGRhdGFfbWFwKSB7XG5cdE9iamVjdC5rZXlzKGRhdGFfbWFwKS5mb3JFYWNoKChrZXkpID0+IHtcblx0XHRzZXRfY3VzdG9tX2VsZW1lbnRfZGF0YShub2RlLCBrZXksIGRhdGFfbWFwW2tleV0pO1xuXHR9KTtcbn1cblxuLyoqXG4gKiBAcmV0dXJucyB7dm9pZH0gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRfY3VzdG9tX2VsZW1lbnRfZGF0YShub2RlLCBwcm9wLCB2YWx1ZSkge1xuXHRjb25zdCBsb3dlciA9IHByb3AudG9Mb3dlckNhc2UoKTsgLy8gZm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5IHdpdGggZXhpc3RpbmcgYmVoYXZpb3Igd2UgZG8gbG93ZXJjYXNlIGZpcnN0XG5cdGlmIChsb3dlciBpbiBub2RlKSB7XG5cdFx0bm9kZVtsb3dlcl0gPSB0eXBlb2Ygbm9kZVtsb3dlcl0gPT09ICdib29sZWFuJyAmJiB2YWx1ZSA9PT0gJycgPyB0cnVlIDogdmFsdWU7XG5cdH0gZWxzZSBpZiAocHJvcCBpbiBub2RlKSB7XG5cdFx0bm9kZVtwcm9wXSA9IHR5cGVvZiBub2RlW3Byb3BdID09PSAnYm9vbGVhbicgJiYgdmFsdWUgPT09ICcnID8gdHJ1ZSA6IHZhbHVlO1xuXHR9IGVsc2Uge1xuXHRcdGF0dHIobm9kZSwgcHJvcCwgdmFsdWUpO1xuXHR9XG59XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHRhZ1xuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0X2R5bmFtaWNfZWxlbWVudF9kYXRhKHRhZykge1xuXHRyZXR1cm4gLy0vLnRlc3QodGFnKSA/IHNldF9jdXN0b21fZWxlbWVudF9kYXRhX21hcCA6IHNldF9hdHRyaWJ1dGVzO1xufVxuXG4vKipcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24geGxpbmtfYXR0cihub2RlLCBhdHRyaWJ1dGUsIHZhbHVlKSB7XG5cdG5vZGUuc2V0QXR0cmlidXRlTlMoJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnLCBhdHRyaWJ1dGUsIHZhbHVlKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0X3N2ZWx0ZV9kYXRhc2V0KG5vZGUpIHtcblx0cmV0dXJuIG5vZGUuZGF0YXNldC5zdmVsdGVIO1xufVxuXG4vKipcbiAqIEByZXR1cm5zIHt1bmtub3duW119ICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0X2JpbmRpbmdfZ3JvdXBfdmFsdWUoZ3JvdXAsIF9fdmFsdWUsIGNoZWNrZWQpIHtcblx0Y29uc3QgdmFsdWUgPSBuZXcgU2V0KCk7XG5cdGZvciAobGV0IGkgPSAwOyBpIDwgZ3JvdXAubGVuZ3RoOyBpICs9IDEpIHtcblx0XHRpZiAoZ3JvdXBbaV0uY2hlY2tlZCkgdmFsdWUuYWRkKGdyb3VwW2ldLl9fdmFsdWUpO1xuXHR9XG5cdGlmICghY2hlY2tlZCkge1xuXHRcdHZhbHVlLmRlbGV0ZShfX3ZhbHVlKTtcblx0fVxuXHRyZXR1cm4gQXJyYXkuZnJvbSh2YWx1ZSk7XG59XG5cbi8qKlxuICogQHBhcmFtIHtIVE1MSW5wdXRFbGVtZW50W119IGdyb3VwXG4gKiBAcmV0dXJucyB7eyBwKC4uLmlucHV0czogSFRNTElucHV0RWxlbWVudFtdKTogdm9pZDsgcigpOiB2b2lkOyB9fVxuICovXG5leHBvcnQgZnVuY3Rpb24gaW5pdF9iaW5kaW5nX2dyb3VwKGdyb3VwKSB7XG5cdC8qKlxuXHQgKiBAdHlwZSB7SFRNTElucHV0RWxlbWVudFtdfSAqL1xuXHRsZXQgX2lucHV0cztcblx0cmV0dXJuIHtcblx0XHQvKiBwdXNoICovIHAoLi4uaW5wdXRzKSB7XG5cdFx0XHRfaW5wdXRzID0gaW5wdXRzO1xuXHRcdFx0X2lucHV0cy5mb3JFYWNoKChpbnB1dCkgPT4gZ3JvdXAucHVzaChpbnB1dCkpO1xuXHRcdH0sXG5cdFx0LyogcmVtb3ZlICovIHIoKSB7XG5cdFx0XHRfaW5wdXRzLmZvckVhY2goKGlucHV0KSA9PiBncm91cC5zcGxpY2UoZ3JvdXAuaW5kZXhPZihpbnB1dCksIDEpKTtcblx0XHR9XG5cdH07XG59XG5cbi8qKlxuICogQHBhcmFtIHtudW1iZXJbXX0gaW5kZXhlc1xuICogQHJldHVybnMge3sgdShuZXdfaW5kZXhlczogbnVtYmVyW10pOiB2b2lkOyBwKC4uLmlucHV0czogSFRNTElucHV0RWxlbWVudFtdKTogdm9pZDsgcjogKCkgPT4gdm9pZDsgfX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluaXRfYmluZGluZ19ncm91cF9keW5hbWljKGdyb3VwLCBpbmRleGVzKSB7XG5cdC8qKlxuXHQgKiBAdHlwZSB7SFRNTElucHV0RWxlbWVudFtdfSAqL1xuXHRsZXQgX2dyb3VwID0gZ2V0X2JpbmRpbmdfZ3JvdXAoZ3JvdXApO1xuXG5cdC8qKlxuXHQgKiBAdHlwZSB7SFRNTElucHV0RWxlbWVudFtdfSAqL1xuXHRsZXQgX2lucHV0cztcblxuXHRmdW5jdGlvbiBnZXRfYmluZGluZ19ncm91cChncm91cCkge1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgaW5kZXhlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0Z3JvdXAgPSBncm91cFtpbmRleGVzW2ldXSA9IGdyb3VwW2luZGV4ZXNbaV1dIHx8IFtdO1xuXHRcdH1cblx0XHRyZXR1cm4gZ3JvdXA7XG5cdH1cblxuXHQvKipcblx0ICogQHJldHVybnMge3ZvaWR9ICovXG5cdGZ1bmN0aW9uIHB1c2goKSB7XG5cdFx0X2lucHV0cy5mb3JFYWNoKChpbnB1dCkgPT4gX2dyb3VwLnB1c2goaW5wdXQpKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcmV0dXJucyB7dm9pZH0gKi9cblx0ZnVuY3Rpb24gcmVtb3ZlKCkge1xuXHRcdF9pbnB1dHMuZm9yRWFjaCgoaW5wdXQpID0+IF9ncm91cC5zcGxpY2UoX2dyb3VwLmluZGV4T2YoaW5wdXQpLCAxKSk7XG5cdH1cblx0cmV0dXJuIHtcblx0XHQvKiB1cGRhdGUgKi8gdShuZXdfaW5kZXhlcykge1xuXHRcdFx0aW5kZXhlcyA9IG5ld19pbmRleGVzO1xuXHRcdFx0Y29uc3QgbmV3X2dyb3VwID0gZ2V0X2JpbmRpbmdfZ3JvdXAoZ3JvdXApO1xuXHRcdFx0aWYgKG5ld19ncm91cCAhPT0gX2dyb3VwKSB7XG5cdFx0XHRcdHJlbW92ZSgpO1xuXHRcdFx0XHRfZ3JvdXAgPSBuZXdfZ3JvdXA7XG5cdFx0XHRcdHB1c2goKTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdC8qIHB1c2ggKi8gcCguLi5pbnB1dHMpIHtcblx0XHRcdF9pbnB1dHMgPSBpbnB1dHM7XG5cdFx0XHRwdXNoKCk7XG5cdFx0fSxcblx0XHQvKiByZW1vdmUgKi8gcjogcmVtb3ZlXG5cdH07XG59XG5cbi8qKiBAcmV0dXJucyB7bnVtYmVyfSAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRvX251bWJlcih2YWx1ZSkge1xuXHRyZXR1cm4gdmFsdWUgPT09ICcnID8gbnVsbCA6ICt2YWx1ZTtcbn1cblxuLyoqIEByZXR1cm5zIHthbnlbXX0gKi9cbmV4cG9ydCBmdW5jdGlvbiB0aW1lX3Jhbmdlc190b19hcnJheShyYW5nZXMpIHtcblx0Y29uc3QgYXJyYXkgPSBbXTtcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCByYW5nZXMubGVuZ3RoOyBpICs9IDEpIHtcblx0XHRhcnJheS5wdXNoKHsgc3RhcnQ6IHJhbmdlcy5zdGFydChpKSwgZW5kOiByYW5nZXMuZW5kKGkpIH0pO1xuXHR9XG5cdHJldHVybiBhcnJheTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnRcbiAqIEByZXR1cm5zIHtDaGlsZE5vZGVbXX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNoaWxkcmVuKGVsZW1lbnQpIHtcblx0cmV0dXJuIEFycmF5LmZyb20oZWxlbWVudC5jaGlsZE5vZGVzKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0NoaWxkTm9kZUFycmF5fSBub2Rlc1xuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmZ1bmN0aW9uIGluaXRfY2xhaW1faW5mbyhub2Rlcykge1xuXHRpZiAobm9kZXMuY2xhaW1faW5mbyA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0bm9kZXMuY2xhaW1faW5mbyA9IHsgbGFzdF9pbmRleDogMCwgdG90YWxfY2xhaW1lZDogMCB9O1xuXHR9XG59XG5cbi8qKlxuICogQHRlbXBsYXRlIHtDaGlsZE5vZGVFeH0gUlxuICogQHBhcmFtIHtDaGlsZE5vZGVBcnJheX0gbm9kZXNcbiAqIEBwYXJhbSB7KG5vZGU6IENoaWxkTm9kZUV4KSA9PiBub2RlIGlzIFJ9IHByZWRpY2F0ZVxuICogQHBhcmFtIHsobm9kZTogQ2hpbGROb2RlRXgpID0+IENoaWxkTm9kZUV4IHwgdW5kZWZpbmVkfSBwcm9jZXNzX25vZGVcbiAqIEBwYXJhbSB7KCkgPT4gUn0gY3JlYXRlX25vZGVcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gZG9udF91cGRhdGVfbGFzdF9pbmRleFxuICogQHJldHVybnMge1J9XG4gKi9cbmZ1bmN0aW9uIGNsYWltX25vZGUobm9kZXMsIHByZWRpY2F0ZSwgcHJvY2Vzc19ub2RlLCBjcmVhdGVfbm9kZSwgZG9udF91cGRhdGVfbGFzdF9pbmRleCA9IGZhbHNlKSB7XG5cdC8vIFRyeSB0byBmaW5kIG5vZGVzIGluIGFuIG9yZGVyIHN1Y2ggdGhhdCB3ZSBsZW5ndGhlbiB0aGUgbG9uZ2VzdCBpbmNyZWFzaW5nIHN1YnNlcXVlbmNlXG5cdGluaXRfY2xhaW1faW5mbyhub2Rlcyk7XG5cdGNvbnN0IHJlc3VsdF9ub2RlID0gKCgpID0+IHtcblx0XHQvLyBXZSBmaXJzdCB0cnkgdG8gZmluZCBhbiBlbGVtZW50IGFmdGVyIHRoZSBwcmV2aW91cyBvbmVcblx0XHRmb3IgKGxldCBpID0gbm9kZXMuY2xhaW1faW5mby5sYXN0X2luZGV4OyBpIDwgbm9kZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGNvbnN0IG5vZGUgPSBub2Rlc1tpXTtcblx0XHRcdGlmIChwcmVkaWNhdGUobm9kZSkpIHtcblx0XHRcdFx0Y29uc3QgcmVwbGFjZW1lbnQgPSBwcm9jZXNzX25vZGUobm9kZSk7XG5cdFx0XHRcdGlmIChyZXBsYWNlbWVudCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0bm9kZXMuc3BsaWNlKGksIDEpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdG5vZGVzW2ldID0gcmVwbGFjZW1lbnQ7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCFkb250X3VwZGF0ZV9sYXN0X2luZGV4KSB7XG5cdFx0XHRcdFx0bm9kZXMuY2xhaW1faW5mby5sYXN0X2luZGV4ID0gaTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gbm9kZTtcblx0XHRcdH1cblx0XHR9XG5cdFx0Ly8gT3RoZXJ3aXNlLCB3ZSB0cnkgdG8gZmluZCBvbmUgYmVmb3JlXG5cdFx0Ly8gV2UgaXRlcmF0ZSBpbiByZXZlcnNlIHNvIHRoYXQgd2UgZG9uJ3QgZ28gdG9vIGZhciBiYWNrXG5cdFx0Zm9yIChsZXQgaSA9IG5vZGVzLmNsYWltX2luZm8ubGFzdF9pbmRleCAtIDE7IGkgPj0gMDsgaS0tKSB7XG5cdFx0XHRjb25zdCBub2RlID0gbm9kZXNbaV07XG5cdFx0XHRpZiAocHJlZGljYXRlKG5vZGUpKSB7XG5cdFx0XHRcdGNvbnN0IHJlcGxhY2VtZW50ID0gcHJvY2Vzc19ub2RlKG5vZGUpO1xuXHRcdFx0XHRpZiAocmVwbGFjZW1lbnQgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdG5vZGVzLnNwbGljZShpLCAxKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRub2Rlc1tpXSA9IHJlcGxhY2VtZW50O1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICghZG9udF91cGRhdGVfbGFzdF9pbmRleCkge1xuXHRcdFx0XHRcdG5vZGVzLmNsYWltX2luZm8ubGFzdF9pbmRleCA9IGk7XG5cdFx0XHRcdH0gZWxzZSBpZiAocmVwbGFjZW1lbnQgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdC8vIFNpbmNlIHdlIHNwbGljZWQgYmVmb3JlIHRoZSBsYXN0X2luZGV4LCB3ZSBkZWNyZWFzZSBpdFxuXHRcdFx0XHRcdG5vZGVzLmNsYWltX2luZm8ubGFzdF9pbmRleC0tO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBub2RlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHQvLyBJZiB3ZSBjYW4ndCBmaW5kIGFueSBtYXRjaGluZyBub2RlLCB3ZSBjcmVhdGUgYSBuZXcgb25lXG5cdFx0cmV0dXJuIGNyZWF0ZV9ub2RlKCk7XG5cdH0pKCk7XG5cdHJlc3VsdF9ub2RlLmNsYWltX29yZGVyID0gbm9kZXMuY2xhaW1faW5mby50b3RhbF9jbGFpbWVkO1xuXHRub2Rlcy5jbGFpbV9pbmZvLnRvdGFsX2NsYWltZWQgKz0gMTtcblx0cmV0dXJuIHJlc3VsdF9ub2RlO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7Q2hpbGROb2RlQXJyYXl9IG5vZGVzXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHt7IFtrZXk6IHN0cmluZ106IGJvb2xlYW4gfX0gYXR0cmlidXRlc1xuICogQHBhcmFtIHsobmFtZTogc3RyaW5nKSA9PiBFbGVtZW50IHwgU1ZHRWxlbWVudH0gY3JlYXRlX2VsZW1lbnRcbiAqIEByZXR1cm5zIHtFbGVtZW50IHwgU1ZHRWxlbWVudH1cbiAqL1xuZnVuY3Rpb24gY2xhaW1fZWxlbWVudF9iYXNlKG5vZGVzLCBuYW1lLCBhdHRyaWJ1dGVzLCBjcmVhdGVfZWxlbWVudCkge1xuXHRyZXR1cm4gY2xhaW1fbm9kZShcblx0XHRub2Rlcyxcblx0XHQvKiogQHJldHVybnMge25vZGUgaXMgRWxlbWVudCB8IFNWR0VsZW1lbnR9ICovXG5cdFx0KG5vZGUpID0+IG5vZGUubm9kZU5hbWUgPT09IG5hbWUsXG5cdFx0LyoqIEBwYXJhbSB7RWxlbWVudH0gbm9kZSAqL1xuXHRcdChub2RlKSA9PiB7XG5cdFx0XHRjb25zdCByZW1vdmUgPSBbXTtcblx0XHRcdGZvciAobGV0IGogPSAwOyBqIDwgbm9kZS5hdHRyaWJ1dGVzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGNvbnN0IGF0dHJpYnV0ZSA9IG5vZGUuYXR0cmlidXRlc1tqXTtcblx0XHRcdFx0aWYgKCFhdHRyaWJ1dGVzW2F0dHJpYnV0ZS5uYW1lXSkge1xuXHRcdFx0XHRcdHJlbW92ZS5wdXNoKGF0dHJpYnV0ZS5uYW1lKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmVtb3ZlLmZvckVhY2goKHYpID0+IG5vZGUucmVtb3ZlQXR0cmlidXRlKHYpKTtcblx0XHRcdHJldHVybiB1bmRlZmluZWQ7XG5cdFx0fSxcblx0XHQoKSA9PiBjcmVhdGVfZWxlbWVudChuYW1lKVxuXHQpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7Q2hpbGROb2RlQXJyYXl9IG5vZGVzXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHt7IFtrZXk6IHN0cmluZ106IGJvb2xlYW4gfX0gYXR0cmlidXRlc1xuICogQHJldHVybnMge0VsZW1lbnQgfCBTVkdFbGVtZW50fVxuICovXG5leHBvcnQgZnVuY3Rpb24gY2xhaW1fZWxlbWVudChub2RlcywgbmFtZSwgYXR0cmlidXRlcykge1xuXHRyZXR1cm4gY2xhaW1fZWxlbWVudF9iYXNlKG5vZGVzLCBuYW1lLCBhdHRyaWJ1dGVzLCBlbGVtZW50KTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0NoaWxkTm9kZUFycmF5fSBub2Rlc1xuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7eyBba2V5OiBzdHJpbmddOiBib29sZWFuIH19IGF0dHJpYnV0ZXNcbiAqIEByZXR1cm5zIHtFbGVtZW50IHwgU1ZHRWxlbWVudH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNsYWltX3N2Z19lbGVtZW50KG5vZGVzLCBuYW1lLCBhdHRyaWJ1dGVzKSB7XG5cdHJldHVybiBjbGFpbV9lbGVtZW50X2Jhc2Uobm9kZXMsIG5hbWUsIGF0dHJpYnV0ZXMsIHN2Z19lbGVtZW50KTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0NoaWxkTm9kZUFycmF5fSBub2Rlc1xuICogQHJldHVybnMge1RleHR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjbGFpbV90ZXh0KG5vZGVzLCBkYXRhKSB7XG5cdHJldHVybiBjbGFpbV9ub2RlKFxuXHRcdG5vZGVzLFxuXHRcdC8qKiBAcmV0dXJucyB7bm9kZSBpcyBUZXh0fSAqL1xuXHRcdChub2RlKSA9PiBub2RlLm5vZGVUeXBlID09PSAzLFxuXHRcdC8qKiBAcGFyYW0ge1RleHR9IG5vZGUgKi9cblx0XHQobm9kZSkgPT4ge1xuXHRcdFx0Y29uc3QgZGF0YV9zdHIgPSAnJyArIGRhdGE7XG5cdFx0XHRpZiAobm9kZS5kYXRhLnN0YXJ0c1dpdGgoZGF0YV9zdHIpKSB7XG5cdFx0XHRcdGlmIChub2RlLmRhdGEubGVuZ3RoICE9PSBkYXRhX3N0ci5sZW5ndGgpIHtcblx0XHRcdFx0XHRyZXR1cm4gbm9kZS5zcGxpdFRleHQoZGF0YV9zdHIubGVuZ3RoKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bm9kZS5kYXRhID0gZGF0YV9zdHI7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHQoKSA9PiB0ZXh0KGRhdGEpLFxuXHRcdHRydWUgLy8gVGV4dCBub2RlcyBzaG91bGQgbm90IHVwZGF0ZSBsYXN0IGluZGV4IHNpbmNlIGl0IGlzIGxpa2VseSBub3Qgd29ydGggaXQgdG8gZWxpbWluYXRlIGFuIGluY3JlYXNpbmcgc3Vic2VxdWVuY2Ugb2YgYWN0dWFsIGVsZW1lbnRzXG5cdCk7XG59XG5cbi8qKlxuICogQHJldHVybnMge1RleHR9ICovXG5leHBvcnQgZnVuY3Rpb24gY2xhaW1fc3BhY2Uobm9kZXMpIHtcblx0cmV0dXJuIGNsYWltX3RleHQobm9kZXMsICcgJyk7XG59XG5cbi8qKlxuICogQHBhcmFtIHtDaGlsZE5vZGVBcnJheX0gbm9kZXNcbiAqIEByZXR1cm5zIHtDb21tZW50fVxuICovXG5leHBvcnQgZnVuY3Rpb24gY2xhaW1fY29tbWVudChub2RlcywgZGF0YSkge1xuXHRyZXR1cm4gY2xhaW1fbm9kZShcblx0XHRub2Rlcyxcblx0XHQvKiogQHJldHVybnMge25vZGUgaXMgQ29tbWVudH0gKi9cblx0XHQobm9kZSkgPT4gbm9kZS5ub2RlVHlwZSA9PT0gOCxcblx0XHQvKiogQHBhcmFtIHtDb21tZW50fSBub2RlICovXG5cdFx0KG5vZGUpID0+IHtcblx0XHRcdG5vZGUuZGF0YSA9ICcnICsgZGF0YTtcblx0XHRcdHJldHVybiB1bmRlZmluZWQ7XG5cdFx0fSxcblx0XHQoKSA9PiBjb21tZW50KGRhdGEpLFxuXHRcdHRydWVcblx0KTtcbn1cblxuZnVuY3Rpb24gZ2V0X2NvbW1lbnRfaWR4KG5vZGVzLCB0ZXh0LCBzdGFydCkge1xuXHRmb3IgKGxldCBpID0gc3RhcnQ7IGkgPCBub2Rlcy5sZW5ndGg7IGkgKz0gMSkge1xuXHRcdGNvbnN0IG5vZGUgPSBub2Rlc1tpXTtcblx0XHRpZiAobm9kZS5ub2RlVHlwZSA9PT0gOCAvKiBjb21tZW50IG5vZGUgKi8gJiYgbm9kZS50ZXh0Q29udGVudC50cmltKCkgPT09IHRleHQpIHtcblx0XHRcdHJldHVybiBpO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gLTE7XG59XG5cbi8qKlxuICogQHBhcmFtIHtib29sZWFufSBpc19zdmdcbiAqIEByZXR1cm5zIHtIdG1sVGFnSHlkcmF0aW9ufVxuICovXG5leHBvcnQgZnVuY3Rpb24gY2xhaW1faHRtbF90YWcobm9kZXMsIGlzX3N2Zykge1xuXHQvLyBmaW5kIGh0bWwgb3BlbmluZyB0YWdcblx0Y29uc3Qgc3RhcnRfaW5kZXggPSBnZXRfY29tbWVudF9pZHgobm9kZXMsICdIVE1MX1RBR19TVEFSVCcsIDApO1xuXHRjb25zdCBlbmRfaW5kZXggPSBnZXRfY29tbWVudF9pZHgobm9kZXMsICdIVE1MX1RBR19FTkQnLCBzdGFydF9pbmRleCArIDEpO1xuXHRpZiAoc3RhcnRfaW5kZXggPT09IC0xIHx8IGVuZF9pbmRleCA9PT0gLTEpIHtcblx0XHRyZXR1cm4gbmV3IEh0bWxUYWdIeWRyYXRpb24oaXNfc3ZnKTtcblx0fVxuXG5cdGluaXRfY2xhaW1faW5mbyhub2Rlcyk7XG5cdGNvbnN0IGh0bWxfdGFnX25vZGVzID0gbm9kZXMuc3BsaWNlKHN0YXJ0X2luZGV4LCBlbmRfaW5kZXggLSBzdGFydF9pbmRleCArIDEpO1xuXHRkZXRhY2goaHRtbF90YWdfbm9kZXNbMF0pO1xuXHRkZXRhY2goaHRtbF90YWdfbm9kZXNbaHRtbF90YWdfbm9kZXMubGVuZ3RoIC0gMV0pO1xuXHRjb25zdCBjbGFpbWVkX25vZGVzID0gaHRtbF90YWdfbm9kZXMuc2xpY2UoMSwgaHRtbF90YWdfbm9kZXMubGVuZ3RoIC0gMSk7XG5cdGlmIChjbGFpbWVkX25vZGVzLmxlbmd0aCA9PT0gMCkge1xuXHRcdHJldHVybiBuZXcgSHRtbFRhZ0h5ZHJhdGlvbihpc19zdmcpO1xuXHR9XG5cdGZvciAoY29uc3QgbiBvZiBjbGFpbWVkX25vZGVzKSB7XG5cdFx0bi5jbGFpbV9vcmRlciA9IG5vZGVzLmNsYWltX2luZm8udG90YWxfY2xhaW1lZDtcblx0XHRub2Rlcy5jbGFpbV9pbmZvLnRvdGFsX2NsYWltZWQgKz0gMTtcblx0fVxuXHRyZXR1cm4gbmV3IEh0bWxUYWdIeWRyYXRpb24oaXNfc3ZnLCBjbGFpbWVkX25vZGVzKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge1RleHR9IHRleHRcbiAqIEBwYXJhbSB7dW5rbm93bn0gZGF0YVxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRfZGF0YSh0ZXh0LCBkYXRhKSB7XG5cdGRhdGEgPSAnJyArIGRhdGE7XG5cdGlmICh0ZXh0LmRhdGEgPT09IGRhdGEpIHJldHVybjtcblx0dGV4dC5kYXRhID0gLyoqIEB0eXBlIHtzdHJpbmd9ICovIChkYXRhKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge1RleHR9IHRleHRcbiAqIEBwYXJhbSB7dW5rbm93bn0gZGF0YVxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRfZGF0YV9jb250ZW50ZWRpdGFibGUodGV4dCwgZGF0YSkge1xuXHRkYXRhID0gJycgKyBkYXRhO1xuXHRpZiAodGV4dC53aG9sZVRleHQgPT09IGRhdGEpIHJldHVybjtcblx0dGV4dC5kYXRhID0gLyoqIEB0eXBlIHtzdHJpbmd9ICovIChkYXRhKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge1RleHR9IHRleHRcbiAqIEBwYXJhbSB7dW5rbm93bn0gZGF0YVxuICogQHBhcmFtIHtzdHJpbmd9IGF0dHJfdmFsdWVcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0X2RhdGFfbWF5YmVfY29udGVudGVkaXRhYmxlKHRleHQsIGRhdGEsIGF0dHJfdmFsdWUpIHtcblx0aWYgKH5jb250ZW50ZWRpdGFibGVfdHJ1dGh5X3ZhbHVlcy5pbmRleE9mKGF0dHJfdmFsdWUpKSB7XG5cdFx0c2V0X2RhdGFfY29udGVudGVkaXRhYmxlKHRleHQsIGRhdGEpO1xuXHR9IGVsc2Uge1xuXHRcdHNldF9kYXRhKHRleHQsIGRhdGEpO1xuXHR9XG59XG5cbi8qKlxuICogQHJldHVybnMge3ZvaWR9ICovXG5leHBvcnQgZnVuY3Rpb24gc2V0X2lucHV0X3ZhbHVlKGlucHV0LCB2YWx1ZSkge1xuXHRpbnB1dC52YWx1ZSA9IHZhbHVlID09IG51bGwgPyAnJyA6IHZhbHVlO1xufVxuXG4vKipcbiAqIEByZXR1cm5zIHt2b2lkfSAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldF9pbnB1dF90eXBlKGlucHV0LCB0eXBlKSB7XG5cdHRyeSB7XG5cdFx0aW5wdXQudHlwZSA9IHR5cGU7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHQvLyBkbyBub3RoaW5nXG5cdH1cbn1cblxuLyoqXG4gKiBAcmV0dXJucyB7dm9pZH0gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRfc3R5bGUobm9kZSwga2V5LCB2YWx1ZSwgaW1wb3J0YW50KSB7XG5cdGlmICh2YWx1ZSA9PSBudWxsKSB7XG5cdFx0bm9kZS5zdHlsZS5yZW1vdmVQcm9wZXJ0eShrZXkpO1xuXHR9IGVsc2Uge1xuXHRcdG5vZGUuc3R5bGUuc2V0UHJvcGVydHkoa2V5LCB2YWx1ZSwgaW1wb3J0YW50ID8gJ2ltcG9ydGFudCcgOiAnJyk7XG5cdH1cbn1cblxuLyoqXG4gKiBAcmV0dXJucyB7dm9pZH0gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZWxlY3Rfb3B0aW9uKHNlbGVjdCwgdmFsdWUsIG1vdW50aW5nKSB7XG5cdGZvciAobGV0IGkgPSAwOyBpIDwgc2VsZWN0Lm9wdGlvbnMubGVuZ3RoOyBpICs9IDEpIHtcblx0XHRjb25zdCBvcHRpb24gPSBzZWxlY3Qub3B0aW9uc1tpXTtcblx0XHRpZiAob3B0aW9uLl9fdmFsdWUgPT09IHZhbHVlKSB7XG5cdFx0XHRvcHRpb24uc2VsZWN0ZWQgPSB0cnVlO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0fVxuXHRpZiAoIW1vdW50aW5nIHx8IHZhbHVlICE9PSB1bmRlZmluZWQpIHtcblx0XHRzZWxlY3Quc2VsZWN0ZWRJbmRleCA9IC0xOyAvLyBubyBvcHRpb24gc2hvdWxkIGJlIHNlbGVjdGVkXG5cdH1cbn1cblxuLyoqXG4gKiBAcmV0dXJucyB7dm9pZH0gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZWxlY3Rfb3B0aW9ucyhzZWxlY3QsIHZhbHVlKSB7XG5cdGZvciAobGV0IGkgPSAwOyBpIDwgc2VsZWN0Lm9wdGlvbnMubGVuZ3RoOyBpICs9IDEpIHtcblx0XHRjb25zdCBvcHRpb24gPSBzZWxlY3Qub3B0aW9uc1tpXTtcblx0XHRvcHRpb24uc2VsZWN0ZWQgPSB+dmFsdWUuaW5kZXhPZihvcHRpb24uX192YWx1ZSk7XG5cdH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNlbGVjdF92YWx1ZShzZWxlY3QpIHtcblx0Y29uc3Qgc2VsZWN0ZWRfb3B0aW9uID0gc2VsZWN0LnF1ZXJ5U2VsZWN0b3IoJzpjaGVja2VkJyk7XG5cdHJldHVybiBzZWxlY3RlZF9vcHRpb24gJiYgc2VsZWN0ZWRfb3B0aW9uLl9fdmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZWxlY3RfbXVsdGlwbGVfdmFsdWUoc2VsZWN0KSB7XG5cdHJldHVybiBbXS5tYXAuY2FsbChzZWxlY3QucXVlcnlTZWxlY3RvckFsbCgnOmNoZWNrZWQnKSwgKG9wdGlvbikgPT4gb3B0aW9uLl9fdmFsdWUpO1xufVxuLy8gdW5mb3J0dW5hdGVseSB0aGlzIGNhbid0IGJlIGEgY29uc3RhbnQgYXMgdGhhdCB3b3VsZG4ndCBiZSB0cmVlLXNoYWtlYWJsZVxuLy8gc28gd2UgY2FjaGUgdGhlIHJlc3VsdCBpbnN0ZWFkXG5cbi8qKlxuICogQHR5cGUge2Jvb2xlYW59ICovXG5sZXQgY3Jvc3NvcmlnaW47XG5cbi8qKlxuICogQHJldHVybnMge2Jvb2xlYW59ICovXG5leHBvcnQgZnVuY3Rpb24gaXNfY3Jvc3NvcmlnaW4oKSB7XG5cdGlmIChjcm9zc29yaWdpbiA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0Y3Jvc3NvcmlnaW4gPSBmYWxzZTtcblx0XHR0cnkge1xuXHRcdFx0aWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5wYXJlbnQpIHtcblx0XHRcdFx0dm9pZCB3aW5kb3cucGFyZW50LmRvY3VtZW50O1xuXHRcdFx0fVxuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRjcm9zc29yaWdpbiA9IHRydWU7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBjcm9zc29yaWdpbjtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlXG4gKiBAcGFyYW0geygpID0+IHZvaWR9IGZuXG4gKiBAcmV0dXJucyB7KCkgPT4gdm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFkZF9pZnJhbWVfcmVzaXplX2xpc3RlbmVyKG5vZGUsIGZuKSB7XG5cdGNvbnN0IGNvbXB1dGVkX3N0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShub2RlKTtcblx0aWYgKGNvbXB1dGVkX3N0eWxlLnBvc2l0aW9uID09PSAnc3RhdGljJykge1xuXHRcdG5vZGUuc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xuXHR9XG5cdGNvbnN0IGlmcmFtZSA9IGVsZW1lbnQoJ2lmcmFtZScpO1xuXHRpZnJhbWUuc2V0QXR0cmlidXRlKFxuXHRcdCdzdHlsZScsXG5cdFx0J2Rpc3BsYXk6IGJsb2NrOyBwb3NpdGlvbjogYWJzb2x1dGU7IHRvcDogMDsgbGVmdDogMDsgd2lkdGg6IDEwMCU7IGhlaWdodDogMTAwJTsgJyArXG5cdFx0XHQnb3ZlcmZsb3c6IGhpZGRlbjsgYm9yZGVyOiAwOyBvcGFjaXR5OiAwOyBwb2ludGVyLWV2ZW50czogbm9uZTsgei1pbmRleDogLTE7J1xuXHQpO1xuXHRpZnJhbWUuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG5cdGlmcmFtZS50YWJJbmRleCA9IC0xO1xuXHRjb25zdCBjcm9zc29yaWdpbiA9IGlzX2Nyb3Nzb3JpZ2luKCk7XG5cblx0LyoqXG5cdCAqIEB0eXBlIHsoKSA9PiB2b2lkfVxuXHQgKi9cblx0bGV0IHVuc3Vic2NyaWJlO1xuXHRpZiAoY3Jvc3NvcmlnaW4pIHtcblx0XHRpZnJhbWUuc3JjID0gXCJkYXRhOnRleHQvaHRtbCw8c2NyaXB0Pm9ucmVzaXplPWZ1bmN0aW9uKCl7cGFyZW50LnBvc3RNZXNzYWdlKDAsJyonKX08L3NjcmlwdD5cIjtcblx0XHR1bnN1YnNjcmliZSA9IGxpc3Rlbihcblx0XHRcdHdpbmRvdyxcblx0XHRcdCdtZXNzYWdlJyxcblx0XHRcdC8qKiBAcGFyYW0ge01lc3NhZ2VFdmVudH0gZXZlbnQgKi8gKGV2ZW50KSA9PiB7XG5cdFx0XHRcdGlmIChldmVudC5zb3VyY2UgPT09IGlmcmFtZS5jb250ZW50V2luZG93KSBmbigpO1xuXHRcdFx0fVxuXHRcdCk7XG5cdH0gZWxzZSB7XG5cdFx0aWZyYW1lLnNyYyA9ICdhYm91dDpibGFuayc7XG5cdFx0aWZyYW1lLm9ubG9hZCA9ICgpID0+IHtcblx0XHRcdHVuc3Vic2NyaWJlID0gbGlzdGVuKGlmcmFtZS5jb250ZW50V2luZG93LCAncmVzaXplJywgZm4pO1xuXHRcdFx0Ly8gbWFrZSBzdXJlIGFuIGluaXRpYWwgcmVzaXplIGV2ZW50IGlzIGZpcmVkIF9hZnRlcl8gdGhlIGlmcmFtZSBpcyBsb2FkZWQgKHdoaWNoIGlzIGFzeW5jaHJvbm91cylcblx0XHRcdC8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vc3ZlbHRlanMvc3ZlbHRlL2lzc3Vlcy80MjMzXG5cdFx0XHRmbigpO1xuXHRcdH07XG5cdH1cblx0YXBwZW5kKG5vZGUsIGlmcmFtZSk7XG5cdHJldHVybiAoKSA9PiB7XG5cdFx0aWYgKGNyb3Nzb3JpZ2luKSB7XG5cdFx0XHR1bnN1YnNjcmliZSgpO1xuXHRcdH0gZWxzZSBpZiAodW5zdWJzY3JpYmUgJiYgaWZyYW1lLmNvbnRlbnRXaW5kb3cpIHtcblx0XHRcdHVuc3Vic2NyaWJlKCk7XG5cdFx0fVxuXHRcdGRldGFjaChpZnJhbWUpO1xuXHR9O1xufVxuZXhwb3J0IGNvbnN0IHJlc2l6ZV9vYnNlcnZlcl9jb250ZW50X2JveCA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgUmVzaXplT2JzZXJ2ZXJTaW5nbGV0b24oe1xuXHRib3g6ICdjb250ZW50LWJveCdcbn0pO1xuZXhwb3J0IGNvbnN0IHJlc2l6ZV9vYnNlcnZlcl9ib3JkZXJfYm94ID0gLyogQF9fUFVSRV9fICovIG5ldyBSZXNpemVPYnNlcnZlclNpbmdsZXRvbih7XG5cdGJveDogJ2JvcmRlci1ib3gnXG59KTtcbmV4cG9ydCBjb25zdCByZXNpemVfb2JzZXJ2ZXJfZGV2aWNlX3BpeGVsX2NvbnRlbnRfYm94ID0gLyogQF9fUFVSRV9fICovIG5ldyBSZXNpemVPYnNlcnZlclNpbmdsZXRvbihcblx0eyBib3g6ICdkZXZpY2UtcGl4ZWwtY29udGVudC1ib3gnIH1cbik7XG5leHBvcnQgeyBSZXNpemVPYnNlcnZlclNpbmdsZXRvbiB9O1xuXG4vKipcbiAqIEByZXR1cm5zIHt2b2lkfSAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRvZ2dsZV9jbGFzcyhlbGVtZW50LCBuYW1lLCB0b2dnbGUpIHtcblx0Ly8gVGhlIGAhIWAgaXMgcmVxdWlyZWQgYmVjYXVzZSBhbiBgdW5kZWZpbmVkYCBmbGFnIG1lYW5zIGZsaXBwaW5nIHRoZSBjdXJyZW50IHN0YXRlLlxuXHRlbGVtZW50LmNsYXNzTGlzdC50b2dnbGUobmFtZSwgISF0b2dnbGUpO1xufVxuXG4vKipcbiAqIEB0ZW1wbGF0ZSBUXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICogQHBhcmFtIHtUfSBbZGV0YWlsXVxuICogQHBhcmFtIHt7IGJ1YmJsZXM/OiBib29sZWFuLCBjYW5jZWxhYmxlPzogYm9vbGVhbiB9fSBbb3B0aW9uc11cbiAqIEByZXR1cm5zIHtDdXN0b21FdmVudDxUPn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGN1c3RvbV9ldmVudCh0eXBlLCBkZXRhaWwsIHsgYnViYmxlcyA9IGZhbHNlLCBjYW5jZWxhYmxlID0gZmFsc2UgfSA9IHt9KSB7XG5cdHJldHVybiBuZXcgQ3VzdG9tRXZlbnQodHlwZSwgeyBkZXRhaWwsIGJ1YmJsZXMsIGNhbmNlbGFibGUgfSk7XG59XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBwYXJlbnRcbiAqIEByZXR1cm5zIHtDaGlsZE5vZGVBcnJheX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHF1ZXJ5X3NlbGVjdG9yX2FsbChzZWxlY3RvciwgcGFyZW50ID0gZG9jdW1lbnQuYm9keSkge1xuXHRyZXR1cm4gQXJyYXkuZnJvbShwYXJlbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBub2RlSWRcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGhlYWRcbiAqIEByZXR1cm5zIHthbnlbXX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhlYWRfc2VsZWN0b3Iobm9kZUlkLCBoZWFkKSB7XG5cdGNvbnN0IHJlc3VsdCA9IFtdO1xuXHRsZXQgc3RhcnRlZCA9IDA7XG5cdGZvciAoY29uc3Qgbm9kZSBvZiBoZWFkLmNoaWxkTm9kZXMpIHtcblx0XHRpZiAobm9kZS5ub2RlVHlwZSA9PT0gOCAvKiBjb21tZW50IG5vZGUgKi8pIHtcblx0XHRcdGNvbnN0IGNvbW1lbnQgPSBub2RlLnRleHRDb250ZW50LnRyaW0oKTtcblx0XHRcdGlmIChjb21tZW50ID09PSBgSEVBRF8ke25vZGVJZH1fRU5EYCkge1xuXHRcdFx0XHRzdGFydGVkIC09IDE7XG5cdFx0XHRcdHJlc3VsdC5wdXNoKG5vZGUpO1xuXHRcdFx0fSBlbHNlIGlmIChjb21tZW50ID09PSBgSEVBRF8ke25vZGVJZH1fU1RBUlRgKSB7XG5cdFx0XHRcdHN0YXJ0ZWQgKz0gMTtcblx0XHRcdFx0cmVzdWx0LnB1c2gobm9kZSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmIChzdGFydGVkID4gMCkge1xuXHRcdFx0cmVzdWx0LnB1c2gobm9kZSk7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59XG4vKiogKi9cbmV4cG9ydCBjbGFzcyBIdG1sVGFnIHtcblx0LyoqXG5cdCAqIEBwcml2YXRlXG5cdCAqIEBkZWZhdWx0IGZhbHNlXG5cdCAqL1xuXHRpc19zdmcgPSBmYWxzZTtcblx0LyoqIHBhcmVudCBmb3IgY3JlYXRpbmcgbm9kZSAqL1xuXHRlID0gdW5kZWZpbmVkO1xuXHQvKiogaHRtbCB0YWcgbm9kZXMgKi9cblx0biA9IHVuZGVmaW5lZDtcblx0LyoqIHRhcmdldCAqL1xuXHR0ID0gdW5kZWZpbmVkO1xuXHQvKiogYW5jaG9yICovXG5cdGEgPSB1bmRlZmluZWQ7XG5cdGNvbnN0cnVjdG9yKGlzX3N2ZyA9IGZhbHNlKSB7XG5cdFx0dGhpcy5pc19zdmcgPSBpc19zdmc7XG5cdFx0dGhpcy5lID0gdGhpcy5uID0gbnVsbDtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gaHRtbFxuXHQgKiBAcmV0dXJucyB7dm9pZH1cblx0ICovXG5cdGMoaHRtbCkge1xuXHRcdHRoaXMuaChodG1sKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gaHRtbFxuXHQgKiBAcGFyYW0ge0hUTUxFbGVtZW50IHwgU1ZHRWxlbWVudH0gdGFyZ2V0XG5cdCAqIEBwYXJhbSB7SFRNTEVsZW1lbnQgfCBTVkdFbGVtZW50fSBhbmNob3Jcblx0ICogQHJldHVybnMge3ZvaWR9XG5cdCAqL1xuXHRtKGh0bWwsIHRhcmdldCwgYW5jaG9yID0gbnVsbCkge1xuXHRcdGlmICghdGhpcy5lKSB7XG5cdFx0XHRpZiAodGhpcy5pc19zdmcpXG5cdFx0XHRcdHRoaXMuZSA9IHN2Z19lbGVtZW50KC8qKiBAdHlwZSB7a2V5b2YgU1ZHRWxlbWVudFRhZ05hbWVNYXB9ICovICh0YXJnZXQubm9kZU5hbWUpKTtcblx0XHRcdC8qKiAjNzM2NCAgdGFyZ2V0IGZvciA8dGVtcGxhdGU+IG1heSBiZSBwcm92aWRlZCBhcyAjZG9jdW1lbnQtZnJhZ21lbnQoMTEpICovIGVsc2Vcblx0XHRcdFx0dGhpcy5lID0gZWxlbWVudChcblx0XHRcdFx0XHQvKiogQHR5cGUge2tleW9mIEhUTUxFbGVtZW50VGFnTmFtZU1hcH0gKi8gKFxuXHRcdFx0XHRcdFx0dGFyZ2V0Lm5vZGVUeXBlID09PSAxMSA/ICdURU1QTEFURScgOiB0YXJnZXQubm9kZU5hbWVcblx0XHRcdFx0XHQpXG5cdFx0XHRcdCk7XG5cdFx0XHR0aGlzLnQgPVxuXHRcdFx0XHR0YXJnZXQudGFnTmFtZSAhPT0gJ1RFTVBMQVRFJ1xuXHRcdFx0XHRcdD8gdGFyZ2V0XG5cdFx0XHRcdFx0OiAvKiogQHR5cGUge0hUTUxUZW1wbGF0ZUVsZW1lbnR9ICovICh0YXJnZXQpLmNvbnRlbnQ7XG5cdFx0XHR0aGlzLmMoaHRtbCk7XG5cdFx0fVxuXHRcdHRoaXMuaShhbmNob3IpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBodG1sXG5cdCAqIEByZXR1cm5zIHt2b2lkfVxuXHQgKi9cblx0aChodG1sKSB7XG5cdFx0dGhpcy5lLmlubmVySFRNTCA9IGh0bWw7XG5cdFx0dGhpcy5uID0gQXJyYXkuZnJvbShcblx0XHRcdHRoaXMuZS5ub2RlTmFtZSA9PT0gJ1RFTVBMQVRFJyA/IHRoaXMuZS5jb250ZW50LmNoaWxkTm9kZXMgOiB0aGlzLmUuY2hpbGROb2Rlc1xuXHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogQHJldHVybnMge3ZvaWR9ICovXG5cdGkoYW5jaG9yKSB7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm4ubGVuZ3RoOyBpICs9IDEpIHtcblx0XHRcdGluc2VydCh0aGlzLnQsIHRoaXMubltpXSwgYW5jaG9yKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQHBhcmFtIHtzdHJpbmd9IGh0bWxcblx0ICogQHJldHVybnMge3ZvaWR9XG5cdCAqL1xuXHRwKGh0bWwpIHtcblx0XHR0aGlzLmQoKTtcblx0XHR0aGlzLmgoaHRtbCk7XG5cdFx0dGhpcy5pKHRoaXMuYSk7XG5cdH1cblxuXHQvKipcblx0ICogQHJldHVybnMge3ZvaWR9ICovXG5cdGQoKSB7XG5cdFx0dGhpcy5uLmZvckVhY2goZGV0YWNoKTtcblx0fVxufVxuXG5leHBvcnQgY2xhc3MgSHRtbFRhZ0h5ZHJhdGlvbiBleHRlbmRzIEh0bWxUYWcge1xuXHQvKiogQHR5cGUge0VsZW1lbnRbXX0gaHlkcmF0aW9uIGNsYWltZWQgbm9kZXMgKi9cblx0bCA9IHVuZGVmaW5lZDtcblxuXHRjb25zdHJ1Y3Rvcihpc19zdmcgPSBmYWxzZSwgY2xhaW1lZF9ub2Rlcykge1xuXHRcdHN1cGVyKGlzX3N2Zyk7XG5cdFx0dGhpcy5lID0gdGhpcy5uID0gbnVsbDtcblx0XHR0aGlzLmwgPSBjbGFpbWVkX25vZGVzO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBodG1sXG5cdCAqIEByZXR1cm5zIHt2b2lkfVxuXHQgKi9cblx0YyhodG1sKSB7XG5cdFx0aWYgKHRoaXMubCkge1xuXHRcdFx0dGhpcy5uID0gdGhpcy5sO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzdXBlci5jKGh0bWwpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBAcmV0dXJucyB7dm9pZH0gKi9cblx0aShhbmNob3IpIHtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubi5sZW5ndGg7IGkgKz0gMSkge1xuXHRcdFx0aW5zZXJ0X2h5ZHJhdGlvbih0aGlzLnQsIHRoaXMubltpXSwgYW5jaG9yKTtcblx0XHR9XG5cdH1cbn1cblxuLyoqXG4gKiBAcGFyYW0ge05hbWVkTm9kZU1hcH0gYXR0cmlidXRlc1xuICogQHJldHVybnMge3t9fVxuICovXG5leHBvcnQgZnVuY3Rpb24gYXR0cmlidXRlX3RvX29iamVjdChhdHRyaWJ1dGVzKSB7XG5cdGNvbnN0IHJlc3VsdCA9IHt9O1xuXHRmb3IgKGNvbnN0IGF0dHJpYnV0ZSBvZiBhdHRyaWJ1dGVzKSB7XG5cdFx0cmVzdWx0W2F0dHJpYnV0ZS5uYW1lXSA9IGF0dHJpYnV0ZS52YWx1ZTtcblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufVxuXG5jb25zdCBlc2NhcGVkID0ge1xuXHQnXCInOiAnJnF1b3Q7Jyxcblx0JyYnOiAnJmFtcDsnLFxuXHQnPCc6ICcmbHQ7J1xufTtcblxuY29uc3QgcmVnZXhfYXR0cmlidXRlX2NoYXJhY3RlcnNfdG9fZXNjYXBlID0gL1tcIiY8XS9nO1xuXG4vKipcbiAqIE5vdGUgdGhhdCB0aGUgYXR0cmlidXRlIGl0c2VsZiBzaG91bGQgYmUgc3Vycm91bmRlZCBpbiBkb3VibGUgcXVvdGVzXG4gKiBAcGFyYW0ge2FueX0gYXR0cmlidXRlXG4gKi9cbmZ1bmN0aW9uIGVzY2FwZV9hdHRyaWJ1dGUoYXR0cmlidXRlKSB7XG5cdHJldHVybiBTdHJpbmcoYXR0cmlidXRlKS5yZXBsYWNlKHJlZ2V4X2F0dHJpYnV0ZV9jaGFyYWN0ZXJzX3RvX2VzY2FwZSwgKG1hdGNoKSA9PiBlc2NhcGVkW21hdGNoXSk7XG59XG5cbi8qKlxuICogQHBhcmFtIHtSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+fSBhdHRyaWJ1dGVzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdpZnlfc3ByZWFkKGF0dHJpYnV0ZXMpIHtcblx0bGV0IHN0ciA9ICcgJztcblx0Zm9yIChjb25zdCBrZXkgaW4gYXR0cmlidXRlcykge1xuXHRcdGlmIChhdHRyaWJ1dGVzW2tleV0gIT0gbnVsbCkge1xuXHRcdFx0c3RyICs9IGAke2tleX09XCIke2VzY2FwZV9hdHRyaWJ1dGUoYXR0cmlidXRlc1trZXldKX1cIiBgO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBzdHI7XG59XG5cbi8qKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHJldHVybnMge3t9fVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0X2N1c3RvbV9lbGVtZW50c19zbG90cyhlbGVtZW50KSB7XG5cdGNvbnN0IHJlc3VsdCA9IHt9O1xuXHRlbGVtZW50LmNoaWxkTm9kZXMuZm9yRWFjaChcblx0XHQvKiogQHBhcmFtIHtFbGVtZW50fSBub2RlICovIChub2RlKSA9PiB7XG5cdFx0XHRyZXN1bHRbbm9kZS5zbG90IHx8ICdkZWZhdWx0J10gPSB0cnVlO1xuXHRcdH1cblx0KTtcblx0cmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnN0cnVjdF9zdmVsdGVfY29tcG9uZW50KGNvbXBvbmVudCwgcHJvcHMpIHtcblx0cmV0dXJuIG5ldyBjb21wb25lbnQocHJvcHMpO1xufVxuXG4vKipcbiAqIEB0eXBlZGVmIHtOb2RlICYge1xuICogXHRjbGFpbV9vcmRlcj86IG51bWJlcjtcbiAqIFx0aHlkcmF0ZV9pbml0PzogdHJ1ZTtcbiAqIFx0YWN0dWFsX2VuZF9jaGlsZD86IE5vZGVFeDtcbiAqIFx0Y2hpbGROb2RlczogTm9kZUxpc3RPZjxOb2RlRXg+O1xuICogfX0gTm9kZUV4XG4gKi9cblxuLyoqIEB0eXBlZGVmIHtDaGlsZE5vZGUgJiBOb2RlRXh9IENoaWxkTm9kZUV4ICovXG5cbi8qKiBAdHlwZWRlZiB7Tm9kZUV4ICYgeyBjbGFpbV9vcmRlcjogbnVtYmVyIH19IE5vZGVFeDIgKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7Q2hpbGROb2RlRXhbXSAmIHtcbiAqIFx0Y2xhaW1faW5mbz86IHtcbiAqIFx0XHRsYXN0X2luZGV4OiBudW1iZXI7XG4gKiBcdFx0dG90YWxfY2xhaW1lZDogbnVtYmVyO1xuICogXHR9O1xuICogfX0gQ2hpbGROb2RlQXJyYXlcbiAqL1xuIiwgImltcG9ydCB7IGN1c3RvbV9ldmVudCB9IGZyb20gJy4vZG9tLmpzJztcblxuZXhwb3J0IGxldCBjdXJyZW50X2NvbXBvbmVudDtcblxuLyoqIEByZXR1cm5zIHt2b2lkfSAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldF9jdXJyZW50X2NvbXBvbmVudChjb21wb25lbnQpIHtcblx0Y3VycmVudF9jb21wb25lbnQgPSBjb21wb25lbnQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRfY3VycmVudF9jb21wb25lbnQoKSB7XG5cdGlmICghY3VycmVudF9jb21wb25lbnQpIHRocm93IG5ldyBFcnJvcignRnVuY3Rpb24gY2FsbGVkIG91dHNpZGUgY29tcG9uZW50IGluaXRpYWxpemF0aW9uJyk7XG5cdHJldHVybiBjdXJyZW50X2NvbXBvbmVudDtcbn1cblxuLyoqXG4gKiBTY2hlZHVsZXMgYSBjYWxsYmFjayB0byBydW4gaW1tZWRpYXRlbHkgYmVmb3JlIHRoZSBjb21wb25lbnQgaXMgdXBkYXRlZCBhZnRlciBhbnkgc3RhdGUgY2hhbmdlLlxuICpcbiAqIFRoZSBmaXJzdCB0aW1lIHRoZSBjYWxsYmFjayBydW5zIHdpbGwgYmUgYmVmb3JlIHRoZSBpbml0aWFsIGBvbk1vdW50YFxuICpcbiAqIGh0dHBzOi8vc3ZlbHRlLmRldi9kb2NzL3N2ZWx0ZSNiZWZvcmV1cGRhdGVcbiAqIEBwYXJhbSB7KCkgPT4gYW55fSBmblxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBiZWZvcmVVcGRhdGUoZm4pIHtcblx0Z2V0X2N1cnJlbnRfY29tcG9uZW50KCkuJCQuYmVmb3JlX3VwZGF0ZS5wdXNoKGZuKTtcbn1cblxuLyoqXG4gKiBUaGUgYG9uTW91bnRgIGZ1bmN0aW9uIHNjaGVkdWxlcyBhIGNhbGxiYWNrIHRvIHJ1biBhcyBzb29uIGFzIHRoZSBjb21wb25lbnQgaGFzIGJlZW4gbW91bnRlZCB0byB0aGUgRE9NLlxuICogSXQgbXVzdCBiZSBjYWxsZWQgZHVyaW5nIHRoZSBjb21wb25lbnQncyBpbml0aWFsaXNhdGlvbiAoYnV0IGRvZXNuJ3QgbmVlZCB0byBsaXZlICppbnNpZGUqIHRoZSBjb21wb25lbnQ7XG4gKiBpdCBjYW4gYmUgY2FsbGVkIGZyb20gYW4gZXh0ZXJuYWwgbW9kdWxlKS5cbiAqXG4gKiBJZiBhIGZ1bmN0aW9uIGlzIHJldHVybmVkIF9zeW5jaHJvbm91c2x5XyBmcm9tIGBvbk1vdW50YCwgaXQgd2lsbCBiZSBjYWxsZWQgd2hlbiB0aGUgY29tcG9uZW50IGlzIHVubW91bnRlZC5cbiAqXG4gKiBgb25Nb3VudGAgZG9lcyBub3QgcnVuIGluc2lkZSBhIFtzZXJ2ZXItc2lkZSBjb21wb25lbnRdKGh0dHBzOi8vc3ZlbHRlLmRldi9kb2NzI3J1bi10aW1lLXNlcnZlci1zaWRlLWNvbXBvbmVudC1hcGkpLlxuICpcbiAqIGh0dHBzOi8vc3ZlbHRlLmRldi9kb2NzL3N2ZWx0ZSNvbm1vdW50XG4gKiBAdGVtcGxhdGUgVFxuICogQHBhcmFtIHsoKSA9PiBpbXBvcnQoJy4vcHJpdmF0ZS5qcycpLk5vdEZ1bmN0aW9uPFQ+IHwgUHJvbWlzZTxpbXBvcnQoJy4vcHJpdmF0ZS5qcycpLk5vdEZ1bmN0aW9uPFQ+PiB8ICgoKSA9PiBhbnkpfSBmblxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBvbk1vdW50KGZuKSB7XG5cdGdldF9jdXJyZW50X2NvbXBvbmVudCgpLiQkLm9uX21vdW50LnB1c2goZm4pO1xufVxuXG4vKipcbiAqIFNjaGVkdWxlcyBhIGNhbGxiYWNrIHRvIHJ1biBpbW1lZGlhdGVseSBhZnRlciB0aGUgY29tcG9uZW50IGhhcyBiZWVuIHVwZGF0ZWQuXG4gKlxuICogVGhlIGZpcnN0IHRpbWUgdGhlIGNhbGxiYWNrIHJ1bnMgd2lsbCBiZSBhZnRlciB0aGUgaW5pdGlhbCBgb25Nb3VudGBcbiAqXG4gKiBodHRwczovL3N2ZWx0ZS5kZXYvZG9jcy9zdmVsdGUjYWZ0ZXJ1cGRhdGVcbiAqIEBwYXJhbSB7KCkgPT4gYW55fSBmblxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhZnRlclVwZGF0ZShmbikge1xuXHRnZXRfY3VycmVudF9jb21wb25lbnQoKS4kJC5hZnRlcl91cGRhdGUucHVzaChmbik7XG59XG5cbi8qKlxuICogU2NoZWR1bGVzIGEgY2FsbGJhY2sgdG8gcnVuIGltbWVkaWF0ZWx5IGJlZm9yZSB0aGUgY29tcG9uZW50IGlzIHVubW91bnRlZC5cbiAqXG4gKiBPdXQgb2YgYG9uTW91bnRgLCBgYmVmb3JlVXBkYXRlYCwgYGFmdGVyVXBkYXRlYCBhbmQgYG9uRGVzdHJveWAsIHRoaXMgaXMgdGhlXG4gKiBvbmx5IG9uZSB0aGF0IHJ1bnMgaW5zaWRlIGEgc2VydmVyLXNpZGUgY29tcG9uZW50LlxuICpcbiAqIGh0dHBzOi8vc3ZlbHRlLmRldi9kb2NzL3N2ZWx0ZSNvbmRlc3Ryb3lcbiAqIEBwYXJhbSB7KCkgPT4gYW55fSBmblxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBvbkRlc3Ryb3koZm4pIHtcblx0Z2V0X2N1cnJlbnRfY29tcG9uZW50KCkuJCQub25fZGVzdHJveS5wdXNoKGZuKTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGFuIGV2ZW50IGRpc3BhdGNoZXIgdGhhdCBjYW4gYmUgdXNlZCB0byBkaXNwYXRjaCBbY29tcG9uZW50IGV2ZW50c10oaHR0cHM6Ly9zdmVsdGUuZGV2L2RvY3MjdGVtcGxhdGUtc3ludGF4LWNvbXBvbmVudC1kaXJlY3RpdmVzLW9uLWV2ZW50bmFtZSkuXG4gKiBFdmVudCBkaXNwYXRjaGVycyBhcmUgZnVuY3Rpb25zIHRoYXQgY2FuIHRha2UgdHdvIGFyZ3VtZW50czogYG5hbWVgIGFuZCBgZGV0YWlsYC5cbiAqXG4gKiBDb21wb25lbnQgZXZlbnRzIGNyZWF0ZWQgd2l0aCBgY3JlYXRlRXZlbnREaXNwYXRjaGVyYCBjcmVhdGUgYVxuICogW0N1c3RvbUV2ZW50XShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvQ3VzdG9tRXZlbnQpLlxuICogVGhlc2UgZXZlbnRzIGRvIG5vdCBbYnViYmxlXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL0xlYXJuL0phdmFTY3JpcHQvQnVpbGRpbmdfYmxvY2tzL0V2ZW50cyNFdmVudF9idWJibGluZ19hbmRfY2FwdHVyZSkuXG4gKiBUaGUgYGRldGFpbGAgYXJndW1lbnQgY29ycmVzcG9uZHMgdG8gdGhlIFtDdXN0b21FdmVudC5kZXRhaWxdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9DdXN0b21FdmVudC9kZXRhaWwpXG4gKiBwcm9wZXJ0eSBhbmQgY2FuIGNvbnRhaW4gYW55IHR5cGUgb2YgZGF0YS5cbiAqXG4gKiBUaGUgZXZlbnQgZGlzcGF0Y2hlciBjYW4gYmUgdHlwZWQgdG8gbmFycm93IHRoZSBhbGxvd2VkIGV2ZW50IG5hbWVzIGFuZCB0aGUgdHlwZSBvZiB0aGUgYGRldGFpbGAgYXJndW1lbnQ6XG4gKiBgYGB0c1xuICogY29uc3QgZGlzcGF0Y2ggPSBjcmVhdGVFdmVudERpc3BhdGNoZXI8e1xuICogIGxvYWRlZDogbmV2ZXI7IC8vIGRvZXMgbm90IHRha2UgYSBkZXRhaWwgYXJndW1lbnRcbiAqICBjaGFuZ2U6IHN0cmluZzsgLy8gdGFrZXMgYSBkZXRhaWwgYXJndW1lbnQgb2YgdHlwZSBzdHJpbmcsIHdoaWNoIGlzIHJlcXVpcmVkXG4gKiAgb3B0aW9uYWw6IG51bWJlciB8IG51bGw7IC8vIHRha2VzIGFuIG9wdGlvbmFsIGRldGFpbCBhcmd1bWVudCBvZiB0eXBlIG51bWJlclxuICogfT4oKTtcbiAqIGBgYFxuICpcbiAqIGh0dHBzOi8vc3ZlbHRlLmRldi9kb2NzL3N2ZWx0ZSNjcmVhdGVldmVudGRpc3BhdGNoZXJcbiAqIEB0ZW1wbGF0ZSB7UmVjb3JkPHN0cmluZywgYW55Pn0gW0V2ZW50TWFwPWFueV1cbiAqIEByZXR1cm5zIHtpbXBvcnQoJy4vcHVibGljLmpzJykuRXZlbnREaXNwYXRjaGVyPEV2ZW50TWFwPn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUV2ZW50RGlzcGF0Y2hlcigpIHtcblx0Y29uc3QgY29tcG9uZW50ID0gZ2V0X2N1cnJlbnRfY29tcG9uZW50KCk7XG5cdHJldHVybiAodHlwZSwgZGV0YWlsLCB7IGNhbmNlbGFibGUgPSBmYWxzZSB9ID0ge30pID0+IHtcblx0XHRjb25zdCBjYWxsYmFja3MgPSBjb21wb25lbnQuJCQuY2FsbGJhY2tzW3R5cGVdO1xuXHRcdGlmIChjYWxsYmFja3MpIHtcblx0XHRcdC8vIFRPRE8gYXJlIHRoZXJlIHNpdHVhdGlvbnMgd2hlcmUgZXZlbnRzIGNvdWxkIGJlIGRpc3BhdGNoZWRcblx0XHRcdC8vIGluIGEgc2VydmVyIChub24tRE9NKSBlbnZpcm9ubWVudD9cblx0XHRcdGNvbnN0IGV2ZW50ID0gY3VzdG9tX2V2ZW50KC8qKiBAdHlwZSB7c3RyaW5nfSAqLyAodHlwZSksIGRldGFpbCwgeyBjYW5jZWxhYmxlIH0pO1xuXHRcdFx0Y2FsbGJhY2tzLnNsaWNlKCkuZm9yRWFjaCgoZm4pID0+IHtcblx0XHRcdFx0Zm4uY2FsbChjb21wb25lbnQsIGV2ZW50KTtcblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuICFldmVudC5kZWZhdWx0UHJldmVudGVkO1xuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fTtcbn1cblxuLyoqXG4gKiBBc3NvY2lhdGVzIGFuIGFyYml0cmFyeSBgY29udGV4dGAgb2JqZWN0IHdpdGggdGhlIGN1cnJlbnQgY29tcG9uZW50IGFuZCB0aGUgc3BlY2lmaWVkIGBrZXlgXG4gKiBhbmQgcmV0dXJucyB0aGF0IG9iamVjdC4gVGhlIGNvbnRleHQgaXMgdGhlbiBhdmFpbGFibGUgdG8gY2hpbGRyZW4gb2YgdGhlIGNvbXBvbmVudFxuICogKGluY2x1ZGluZyBzbG90dGVkIGNvbnRlbnQpIHdpdGggYGdldENvbnRleHRgLlxuICpcbiAqIExpa2UgbGlmZWN5Y2xlIGZ1bmN0aW9ucywgdGhpcyBtdXN0IGJlIGNhbGxlZCBkdXJpbmcgY29tcG9uZW50IGluaXRpYWxpc2F0aW9uLlxuICpcbiAqIGh0dHBzOi8vc3ZlbHRlLmRldi9kb2NzL3N2ZWx0ZSNzZXRjb250ZXh0XG4gKiBAdGVtcGxhdGUgVFxuICogQHBhcmFtIHthbnl9IGtleVxuICogQHBhcmFtIHtUfSBjb250ZXh0XG4gKiBAcmV0dXJucyB7VH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldENvbnRleHQoa2V5LCBjb250ZXh0KSB7XG5cdGdldF9jdXJyZW50X2NvbXBvbmVudCgpLiQkLmNvbnRleHQuc2V0KGtleSwgY29udGV4dCk7XG5cdHJldHVybiBjb250ZXh0O1xufVxuXG4vKipcbiAqIFJldHJpZXZlcyB0aGUgY29udGV4dCB0aGF0IGJlbG9uZ3MgdG8gdGhlIGNsb3Nlc3QgcGFyZW50IGNvbXBvbmVudCB3aXRoIHRoZSBzcGVjaWZpZWQgYGtleWAuXG4gKiBNdXN0IGJlIGNhbGxlZCBkdXJpbmcgY29tcG9uZW50IGluaXRpYWxpc2F0aW9uLlxuICpcbiAqIGh0dHBzOi8vc3ZlbHRlLmRldi9kb2NzL3N2ZWx0ZSNnZXRjb250ZXh0XG4gKiBAdGVtcGxhdGUgVFxuICogQHBhcmFtIHthbnl9IGtleVxuICogQHJldHVybnMge1R9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb250ZXh0KGtleSkge1xuXHRyZXR1cm4gZ2V0X2N1cnJlbnRfY29tcG9uZW50KCkuJCQuY29udGV4dC5nZXQoa2V5KTtcbn1cblxuLyoqXG4gKiBSZXRyaWV2ZXMgdGhlIHdob2xlIGNvbnRleHQgbWFwIHRoYXQgYmVsb25ncyB0byB0aGUgY2xvc2VzdCBwYXJlbnQgY29tcG9uZW50LlxuICogTXVzdCBiZSBjYWxsZWQgZHVyaW5nIGNvbXBvbmVudCBpbml0aWFsaXNhdGlvbi4gVXNlZnVsLCBmb3IgZXhhbXBsZSwgaWYgeW91XG4gKiBwcm9ncmFtbWF0aWNhbGx5IGNyZWF0ZSBhIGNvbXBvbmVudCBhbmQgd2FudCB0byBwYXNzIHRoZSBleGlzdGluZyBjb250ZXh0IHRvIGl0LlxuICpcbiAqIGh0dHBzOi8vc3ZlbHRlLmRldi9kb2NzL3N2ZWx0ZSNnZXRhbGxjb250ZXh0c1xuICogQHRlbXBsYXRlIHtNYXA8YW55LCBhbnk+fSBbVD1NYXA8YW55LCBhbnk+XVxuICogQHJldHVybnMge1R9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRBbGxDb250ZXh0cygpIHtcblx0cmV0dXJuIGdldF9jdXJyZW50X2NvbXBvbmVudCgpLiQkLmNvbnRleHQ7XG59XG5cbi8qKlxuICogQ2hlY2tzIHdoZXRoZXIgYSBnaXZlbiBga2V5YCBoYXMgYmVlbiBzZXQgaW4gdGhlIGNvbnRleHQgb2YgYSBwYXJlbnQgY29tcG9uZW50LlxuICogTXVzdCBiZSBjYWxsZWQgZHVyaW5nIGNvbXBvbmVudCBpbml0aWFsaXNhdGlvbi5cbiAqXG4gKiBodHRwczovL3N2ZWx0ZS5kZXYvZG9jcy9zdmVsdGUjaGFzY29udGV4dFxuICogQHBhcmFtIHthbnl9IGtleVxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoYXNDb250ZXh0KGtleSkge1xuXHRyZXR1cm4gZ2V0X2N1cnJlbnRfY29tcG9uZW50KCkuJCQuY29udGV4dC5oYXMoa2V5KTtcbn1cblxuLy8gVE9ETyBmaWd1cmUgb3V0IGlmIHdlIHN0aWxsIHdhbnQgdG8gc3VwcG9ydFxuLy8gc2hvcnRoYW5kIGV2ZW50cywgb3IgaWYgd2Ugd2FudCB0byBpbXBsZW1lbnRcbi8vIGEgcmVhbCBidWJibGluZyBtZWNoYW5pc21cbi8qKlxuICogQHBhcmFtIGNvbXBvbmVudFxuICogQHBhcmFtIGV2ZW50XG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJ1YmJsZShjb21wb25lbnQsIGV2ZW50KSB7XG5cdGNvbnN0IGNhbGxiYWNrcyA9IGNvbXBvbmVudC4kJC5jYWxsYmFja3NbZXZlbnQudHlwZV07XG5cdGlmIChjYWxsYmFja3MpIHtcblx0XHQvLyBAdHMtaWdub3JlXG5cdFx0Y2FsbGJhY2tzLnNsaWNlKCkuZm9yRWFjaCgoZm4pID0+IGZuLmNhbGwodGhpcywgZXZlbnQpKTtcblx0fVxufVxuIiwgImltcG9ydCB7IHRyYW5zaXRpb25faW4sIHRyYW5zaXRpb25fb3V0IH0gZnJvbSAnLi90cmFuc2l0aW9ucy5qcyc7XG5pbXBvcnQgeyBydW5fYWxsIH0gZnJvbSAnLi91dGlscy5qcyc7XG5cbi8vIGdlbmVyYWwgZWFjaCBmdW5jdGlvbnM6XG5cbmV4cG9ydCBmdW5jdGlvbiBlbnN1cmVfYXJyYXlfbGlrZShhcnJheV9saWtlX29yX2l0ZXJhdG9yKSB7XG5cdHJldHVybiBhcnJheV9saWtlX29yX2l0ZXJhdG9yPy5sZW5ndGggIT09IHVuZGVmaW5lZFxuXHRcdD8gYXJyYXlfbGlrZV9vcl9pdGVyYXRvclxuXHRcdDogQXJyYXkuZnJvbShhcnJheV9saWtlX29yX2l0ZXJhdG9yKTtcbn1cblxuLy8ga2V5ZWQgZWFjaCBmdW5jdGlvbnM6XG5cbi8qKiBAcmV0dXJucyB7dm9pZH0gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZXN0cm95X2Jsb2NrKGJsb2NrLCBsb29rdXApIHtcblx0YmxvY2suZCgxKTtcblx0bG9va3VwLmRlbGV0ZShibG9jay5rZXkpO1xufVxuXG4vKiogQHJldHVybnMge3ZvaWR9ICovXG5leHBvcnQgZnVuY3Rpb24gb3V0cm9fYW5kX2Rlc3Ryb3lfYmxvY2soYmxvY2ssIGxvb2t1cCkge1xuXHR0cmFuc2l0aW9uX291dChibG9jaywgMSwgMSwgKCkgPT4ge1xuXHRcdGxvb2t1cC5kZWxldGUoYmxvY2sua2V5KTtcblx0fSk7XG59XG5cbi8qKiBAcmV0dXJucyB7dm9pZH0gKi9cbmV4cG9ydCBmdW5jdGlvbiBmaXhfYW5kX2Rlc3Ryb3lfYmxvY2soYmxvY2ssIGxvb2t1cCkge1xuXHRibG9jay5mKCk7XG5cdGRlc3Ryb3lfYmxvY2soYmxvY2ssIGxvb2t1cCk7XG59XG5cbi8qKiBAcmV0dXJucyB7dm9pZH0gKi9cbmV4cG9ydCBmdW5jdGlvbiBmaXhfYW5kX291dHJvX2FuZF9kZXN0cm95X2Jsb2NrKGJsb2NrLCBsb29rdXApIHtcblx0YmxvY2suZigpO1xuXHRvdXRyb19hbmRfZGVzdHJveV9ibG9jayhibG9jaywgbG9va3VwKTtcbn1cblxuLyoqIEByZXR1cm5zIHthbnlbXX0gKi9cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVfa2V5ZWRfZWFjaChcblx0b2xkX2Jsb2Nrcyxcblx0ZGlydHksXG5cdGdldF9rZXksXG5cdGR5bmFtaWMsXG5cdGN0eCxcblx0bGlzdCxcblx0bG9va3VwLFxuXHRub2RlLFxuXHRkZXN0cm95LFxuXHRjcmVhdGVfZWFjaF9ibG9jayxcblx0bmV4dCxcblx0Z2V0X2NvbnRleHRcbikge1xuXHRsZXQgbyA9IG9sZF9ibG9ja3MubGVuZ3RoO1xuXHRsZXQgbiA9IGxpc3QubGVuZ3RoO1xuXHRsZXQgaSA9IG87XG5cdGNvbnN0IG9sZF9pbmRleGVzID0ge307XG5cdHdoaWxlIChpLS0pIG9sZF9pbmRleGVzW29sZF9ibG9ja3NbaV0ua2V5XSA9IGk7XG5cdGNvbnN0IG5ld19ibG9ja3MgPSBbXTtcblx0Y29uc3QgbmV3X2xvb2t1cCA9IG5ldyBNYXAoKTtcblx0Y29uc3QgZGVsdGFzID0gbmV3IE1hcCgpO1xuXHRjb25zdCB1cGRhdGVzID0gW107XG5cdGkgPSBuO1xuXHR3aGlsZSAoaS0tKSB7XG5cdFx0Y29uc3QgY2hpbGRfY3R4ID0gZ2V0X2NvbnRleHQoY3R4LCBsaXN0LCBpKTtcblx0XHRjb25zdCBrZXkgPSBnZXRfa2V5KGNoaWxkX2N0eCk7XG5cdFx0bGV0IGJsb2NrID0gbG9va3VwLmdldChrZXkpO1xuXHRcdGlmICghYmxvY2spIHtcblx0XHRcdGJsb2NrID0gY3JlYXRlX2VhY2hfYmxvY2soa2V5LCBjaGlsZF9jdHgpO1xuXHRcdFx0YmxvY2suYygpO1xuXHRcdH0gZWxzZSBpZiAoZHluYW1pYykge1xuXHRcdFx0Ly8gZGVmZXIgdXBkYXRlcyB1bnRpbCBhbGwgdGhlIERPTSBzaHVmZmxpbmcgaXMgZG9uZVxuXHRcdFx0dXBkYXRlcy5wdXNoKCgpID0+IGJsb2NrLnAoY2hpbGRfY3R4LCBkaXJ0eSkpO1xuXHRcdH1cblx0XHRuZXdfbG9va3VwLnNldChrZXksIChuZXdfYmxvY2tzW2ldID0gYmxvY2spKTtcblx0XHRpZiAoa2V5IGluIG9sZF9pbmRleGVzKSBkZWx0YXMuc2V0KGtleSwgTWF0aC5hYnMoaSAtIG9sZF9pbmRleGVzW2tleV0pKTtcblx0fVxuXHRjb25zdCB3aWxsX21vdmUgPSBuZXcgU2V0KCk7XG5cdGNvbnN0IGRpZF9tb3ZlID0gbmV3IFNldCgpO1xuXHQvKiogQHJldHVybnMge3ZvaWR9ICovXG5cdGZ1bmN0aW9uIGluc2VydChibG9jaykge1xuXHRcdHRyYW5zaXRpb25faW4oYmxvY2ssIDEpO1xuXHRcdGJsb2NrLm0obm9kZSwgbmV4dCk7XG5cdFx0bG9va3VwLnNldChibG9jay5rZXksIGJsb2NrKTtcblx0XHRuZXh0ID0gYmxvY2suZmlyc3Q7XG5cdFx0bi0tO1xuXHR9XG5cdHdoaWxlIChvICYmIG4pIHtcblx0XHRjb25zdCBuZXdfYmxvY2sgPSBuZXdfYmxvY2tzW24gLSAxXTtcblx0XHRjb25zdCBvbGRfYmxvY2sgPSBvbGRfYmxvY2tzW28gLSAxXTtcblx0XHRjb25zdCBuZXdfa2V5ID0gbmV3X2Jsb2NrLmtleTtcblx0XHRjb25zdCBvbGRfa2V5ID0gb2xkX2Jsb2NrLmtleTtcblx0XHRpZiAobmV3X2Jsb2NrID09PSBvbGRfYmxvY2spIHtcblx0XHRcdC8vIGRvIG5vdGhpbmdcblx0XHRcdG5leHQgPSBuZXdfYmxvY2suZmlyc3Q7XG5cdFx0XHRvLS07XG5cdFx0XHRuLS07XG5cdFx0fSBlbHNlIGlmICghbmV3X2xvb2t1cC5oYXMob2xkX2tleSkpIHtcblx0XHRcdC8vIHJlbW92ZSBvbGQgYmxvY2tcblx0XHRcdGRlc3Ryb3kob2xkX2Jsb2NrLCBsb29rdXApO1xuXHRcdFx0by0tO1xuXHRcdH0gZWxzZSBpZiAoIWxvb2t1cC5oYXMobmV3X2tleSkgfHwgd2lsbF9tb3ZlLmhhcyhuZXdfa2V5KSkge1xuXHRcdFx0aW5zZXJ0KG5ld19ibG9jayk7XG5cdFx0fSBlbHNlIGlmIChkaWRfbW92ZS5oYXMob2xkX2tleSkpIHtcblx0XHRcdG8tLTtcblx0XHR9IGVsc2UgaWYgKGRlbHRhcy5nZXQobmV3X2tleSkgPiBkZWx0YXMuZ2V0KG9sZF9rZXkpKSB7XG5cdFx0XHRkaWRfbW92ZS5hZGQobmV3X2tleSk7XG5cdFx0XHRpbnNlcnQobmV3X2Jsb2NrKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0d2lsbF9tb3ZlLmFkZChvbGRfa2V5KTtcblx0XHRcdG8tLTtcblx0XHR9XG5cdH1cblx0d2hpbGUgKG8tLSkge1xuXHRcdGNvbnN0IG9sZF9ibG9jayA9IG9sZF9ibG9ja3Nbb107XG5cdFx0aWYgKCFuZXdfbG9va3VwLmhhcyhvbGRfYmxvY2sua2V5KSkgZGVzdHJveShvbGRfYmxvY2ssIGxvb2t1cCk7XG5cdH1cblx0d2hpbGUgKG4pIGluc2VydChuZXdfYmxvY2tzW24gLSAxXSk7XG5cdHJ1bl9hbGwodXBkYXRlcyk7XG5cdHJldHVybiBuZXdfYmxvY2tzO1xufVxuXG4vKiogQHJldHVybnMge3ZvaWR9ICovXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVfZWFjaF9rZXlzKGN0eCwgbGlzdCwgZ2V0X2NvbnRleHQsIGdldF9rZXkpIHtcblx0Y29uc3Qga2V5cyA9IG5ldyBNYXAoKTtcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0Y29uc3Qga2V5ID0gZ2V0X2tleShnZXRfY29udGV4dChjdHgsIGxpc3QsIGkpKTtcblx0XHRpZiAoa2V5cy5oYXMoa2V5KSkge1xuXHRcdFx0bGV0IHZhbHVlID0gJyc7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHR2YWx1ZSA9IGB3aXRoIHZhbHVlICcke1N0cmluZyhrZXkpfScgYDtcblx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0Ly8gY2FuJ3Qgc3RyaW5naWZ5XG5cdFx0XHR9XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXG5cdFx0XHRcdGBDYW5ub3QgaGF2ZSBkdXBsaWNhdGUga2V5cyBpbiBhIGtleWVkIGVhY2g6IEtleXMgYXQgaW5kZXggJHtrZXlzLmdldChcblx0XHRcdFx0XHRrZXlcblx0XHRcdFx0KX0gYW5kICR7aX0gJHt2YWx1ZX1hcmUgZHVwbGljYXRlc2Bcblx0XHRcdCk7XG5cdFx0fVxuXHRcdGtleXMuc2V0KGtleSwgaSk7XG5cdH1cbn1cbiIsICJjb25zdCBfYm9vbGVhbl9hdHRyaWJ1dGVzID0gLyoqIEB0eXBlIHtjb25zdH0gKi8gKFtcblx0J2FsbG93ZnVsbHNjcmVlbicsXG5cdCdhbGxvd3BheW1lbnRyZXF1ZXN0Jyxcblx0J2FzeW5jJyxcblx0J2F1dG9mb2N1cycsXG5cdCdhdXRvcGxheScsXG5cdCdjaGVja2VkJyxcblx0J2NvbnRyb2xzJyxcblx0J2RlZmF1bHQnLFxuXHQnZGVmZXInLFxuXHQnZGlzYWJsZWQnLFxuXHQnZm9ybW5vdmFsaWRhdGUnLFxuXHQnaGlkZGVuJyxcblx0J2luZXJ0Jyxcblx0J2lzbWFwJyxcblx0J2xvb3AnLFxuXHQnbXVsdGlwbGUnLFxuXHQnbXV0ZWQnLFxuXHQnbm9tb2R1bGUnLFxuXHQnbm92YWxpZGF0ZScsXG5cdCdvcGVuJyxcblx0J3BsYXlzaW5saW5lJyxcblx0J3JlYWRvbmx5Jyxcblx0J3JlcXVpcmVkJyxcblx0J3JldmVyc2VkJyxcblx0J3NlbGVjdGVkJ1xuXSk7XG5cbi8qKlxuICogTGlzdCBvZiBIVE1MIGJvb2xlYW4gYXR0cmlidXRlcyAoZS5nLiBgPGlucHV0IGRpc2FibGVkPmApLlxuICogU291cmNlOiBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9pbmRpY2VzLmh0bWxcbiAqXG4gKiBAdHlwZSB7U2V0PHN0cmluZz59XG4gKi9cbmV4cG9ydCBjb25zdCBib29sZWFuX2F0dHJpYnV0ZXMgPSBuZXcgU2V0KFsuLi5fYm9vbGVhbl9hdHRyaWJ1dGVzXSk7XG5cbi8qKiBAdHlwZWRlZiB7dHlwZW9mIF9ib29sZWFuX2F0dHJpYnV0ZXNbbnVtYmVyXX0gQm9vbGVhbkF0dHJpYnV0ZXMgKi9cbiIsICJjb25zdCBBVFRSX1JFR0VYID0gL1smXCI8XS9nO1xuY29uc3QgQ09OVEVOVF9SRUdFWCA9IC9bJjxdL2c7XG5cbi8qKlxuICogTm90ZTogdGhpcyBtZXRob2QgaXMgcGVyZm9ybWFuY2Ugc2Vuc2l0aXZlIGFuZCBoYXMgYmVlbiBvcHRpbWl6ZWRcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9zdmVsdGVqcy9zdmVsdGUvcHVsbC81NzAxXG4gKiBAcGFyYW0ge3Vua25vd259IHZhbHVlXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZXNjYXBlKHZhbHVlLCBpc19hdHRyID0gZmFsc2UpIHtcblx0Y29uc3Qgc3RyID0gU3RyaW5nKHZhbHVlKTtcblx0Y29uc3QgcGF0dGVybiA9IGlzX2F0dHIgPyBBVFRSX1JFR0VYIDogQ09OVEVOVF9SRUdFWDtcblx0cGF0dGVybi5sYXN0SW5kZXggPSAwO1xuXHRsZXQgZXNjYXBlZCA9ICcnO1xuXHRsZXQgbGFzdCA9IDA7XG5cdHdoaWxlIChwYXR0ZXJuLnRlc3Qoc3RyKSkge1xuXHRcdGNvbnN0IGkgPSBwYXR0ZXJuLmxhc3RJbmRleCAtIDE7XG5cdFx0Y29uc3QgY2ggPSBzdHJbaV07XG5cdFx0ZXNjYXBlZCArPSBzdHIuc3Vic3RyaW5nKGxhc3QsIGkpICsgKGNoID09PSAnJicgPyAnJmFtcDsnIDogY2ggPT09ICdcIicgPyAnJnF1b3Q7JyA6ICcmbHQ7Jyk7XG5cdFx0bGFzdCA9IGkgKyAxO1xuXHR9XG5cdHJldHVybiBlc2NhcGVkICsgc3RyLnN1YnN0cmluZyhsYXN0KTtcbn1cbiIsICJpbXBvcnQgeyBzZXRfY3VycmVudF9jb21wb25lbnQsIGN1cnJlbnRfY29tcG9uZW50IH0gZnJvbSAnLi9saWZlY3ljbGUuanMnO1xuaW1wb3J0IHsgcnVuX2FsbCwgYmxhbmtfb2JqZWN0IH0gZnJvbSAnLi91dGlscy5qcyc7XG5pbXBvcnQgeyBib29sZWFuX2F0dHJpYnV0ZXMgfSBmcm9tICcuLi8uLi9zaGFyZWQvYm9vbGVhbl9hdHRyaWJ1dGVzLmpzJztcbmltcG9ydCB7IGVuc3VyZV9hcnJheV9saWtlIH0gZnJvbSAnLi9lYWNoLmpzJztcbmltcG9ydCB7IGVzY2FwZSB9IGZyb20gJy4uLy4uL3NoYXJlZC91dGlscy9lc2NhcGUuanMnO1xuZXhwb3J0IHsgaXNfdm9pZCB9IGZyb20gJy4uLy4uL3NoYXJlZC91dGlscy9uYW1lcy5qcyc7XG5leHBvcnQgeyBlc2NhcGUgfTtcblxuZXhwb3J0IGNvbnN0IGludmFsaWRfYXR0cmlidXRlX25hbWVfY2hhcmFjdGVyID1cblx0L1tcXHMnXCI+Lz1cXHV7RkREMH0tXFx1e0ZERUZ9XFx1e0ZGRkV9XFx1e0ZGRkZ9XFx1ezFGRkZFfVxcdXsxRkZGRn1cXHV7MkZGRkV9XFx1ezJGRkZGfVxcdXszRkZGRX1cXHV7M0ZGRkZ9XFx1ezRGRkZFfVxcdXs0RkZGRn1cXHV7NUZGRkV9XFx1ezVGRkZGfVxcdXs2RkZGRX1cXHV7NkZGRkZ9XFx1ezdGRkZFfVxcdXs3RkZGRn1cXHV7OEZGRkV9XFx1ezhGRkZGfVxcdXs5RkZGRX1cXHV7OUZGRkZ9XFx1e0FGRkZFfVxcdXtBRkZGRn1cXHV7QkZGRkV9XFx1e0JGRkZGfVxcdXtDRkZGRX1cXHV7Q0ZGRkZ9XFx1e0RGRkZFfVxcdXtERkZGRn1cXHV7RUZGRkV9XFx1e0VGRkZGfVxcdXtGRkZGRX1cXHV7RkZGRkZ9XFx1ezEwRkZGRX1cXHV7MTBGRkZGfV0vdTtcbi8vIGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL3N5bnRheC5odG1sI2F0dHJpYnV0ZXMtMlxuLy8gaHR0cHM6Ly9pbmZyYS5zcGVjLndoYXR3Zy5vcmcvI25vbmNoYXJhY3RlclxuXG4vKiogQHJldHVybnMge3N0cmluZ30gKi9cbmV4cG9ydCBmdW5jdGlvbiBzcHJlYWQoYXJncywgYXR0cnNfdG9fYWRkKSB7XG5cdGNvbnN0IGF0dHJpYnV0ZXMgPSBPYmplY3QuYXNzaWduKHt9LCAuLi5hcmdzKTtcblx0aWYgKGF0dHJzX3RvX2FkZCkge1xuXHRcdGNvbnN0IGNsYXNzZXNfdG9fYWRkID0gYXR0cnNfdG9fYWRkLmNsYXNzZXM7XG5cdFx0Y29uc3Qgc3R5bGVzX3RvX2FkZCA9IGF0dHJzX3RvX2FkZC5zdHlsZXM7XG5cdFx0aWYgKGNsYXNzZXNfdG9fYWRkKSB7XG5cdFx0XHRpZiAoYXR0cmlidXRlcy5jbGFzcyA9PSBudWxsKSB7XG5cdFx0XHRcdGF0dHJpYnV0ZXMuY2xhc3MgPSBjbGFzc2VzX3RvX2FkZDtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGF0dHJpYnV0ZXMuY2xhc3MgKz0gJyAnICsgY2xhc3Nlc190b19hZGQ7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmIChzdHlsZXNfdG9fYWRkKSB7XG5cdFx0XHRpZiAoYXR0cmlidXRlcy5zdHlsZSA9PSBudWxsKSB7XG5cdFx0XHRcdGF0dHJpYnV0ZXMuc3R5bGUgPSBzdHlsZV9vYmplY3RfdG9fc3RyaW5nKHN0eWxlc190b19hZGQpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0YXR0cmlidXRlcy5zdHlsZSA9IHN0eWxlX29iamVjdF90b19zdHJpbmcoXG5cdFx0XHRcdFx0bWVyZ2Vfc3NyX3N0eWxlcyhhdHRyaWJ1dGVzLnN0eWxlLCBzdHlsZXNfdG9fYWRkKVxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRsZXQgc3RyID0gJyc7XG5cdE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpLmZvckVhY2goKG5hbWUpID0+IHtcblx0XHRpZiAoaW52YWxpZF9hdHRyaWJ1dGVfbmFtZV9jaGFyYWN0ZXIudGVzdChuYW1lKSkgcmV0dXJuO1xuXHRcdGNvbnN0IHZhbHVlID0gYXR0cmlidXRlc1tuYW1lXTtcblx0XHRpZiAodmFsdWUgPT09IHRydWUpIHN0ciArPSAnICcgKyBuYW1lO1xuXHRcdGVsc2UgaWYgKGJvb2xlYW5fYXR0cmlidXRlcy5oYXMobmFtZS50b0xvd2VyQ2FzZSgpKSkge1xuXHRcdFx0aWYgKHZhbHVlKSBzdHIgKz0gJyAnICsgbmFtZTtcblx0XHR9IGVsc2UgaWYgKHZhbHVlICE9IG51bGwpIHtcblx0XHRcdHN0ciArPSBgICR7bmFtZX09XCIke3ZhbHVlfVwiYDtcblx0XHR9XG5cdH0pO1xuXHRyZXR1cm4gc3RyO1xufVxuXG4vKiogQHJldHVybnMge3t9fSAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlX3Nzcl9zdHlsZXMoc3R5bGVfYXR0cmlidXRlLCBzdHlsZV9kaXJlY3RpdmUpIHtcblx0Y29uc3Qgc3R5bGVfb2JqZWN0ID0ge307XG5cdGZvciAoY29uc3QgaW5kaXZpZHVhbF9zdHlsZSBvZiBzdHlsZV9hdHRyaWJ1dGUuc3BsaXQoJzsnKSkge1xuXHRcdGNvbnN0IGNvbG9uX2luZGV4ID0gaW5kaXZpZHVhbF9zdHlsZS5pbmRleE9mKCc6Jyk7XG5cdFx0Y29uc3QgbmFtZSA9IGluZGl2aWR1YWxfc3R5bGUuc2xpY2UoMCwgY29sb25faW5kZXgpLnRyaW0oKTtcblx0XHRjb25zdCB2YWx1ZSA9IGluZGl2aWR1YWxfc3R5bGUuc2xpY2UoY29sb25faW5kZXggKyAxKS50cmltKCk7XG5cdFx0aWYgKCFuYW1lKSBjb250aW51ZTtcblx0XHRzdHlsZV9vYmplY3RbbmFtZV0gPSB2YWx1ZTtcblx0fVxuXHRmb3IgKGNvbnN0IG5hbWUgaW4gc3R5bGVfZGlyZWN0aXZlKSB7XG5cdFx0Y29uc3QgdmFsdWUgPSBzdHlsZV9kaXJlY3RpdmVbbmFtZV07XG5cdFx0aWYgKHZhbHVlKSB7XG5cdFx0XHRzdHlsZV9vYmplY3RbbmFtZV0gPSB2YWx1ZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZGVsZXRlIHN0eWxlX29iamVjdFtuYW1lXTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHN0eWxlX29iamVjdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVzY2FwZV9hdHRyaWJ1dGVfdmFsdWUodmFsdWUpIHtcblx0Ly8ga2VlcCBib29sZWFucywgbnVsbCwgYW5kIHVuZGVmaW5lZCBmb3IgdGhlIHNha2Ugb2YgYHNwcmVhZGBcblx0Y29uc3Qgc2hvdWxkX2VzY2FwZSA9IHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgfHwgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpO1xuXHRyZXR1cm4gc2hvdWxkX2VzY2FwZSA/IGVzY2FwZSh2YWx1ZSwgdHJ1ZSkgOiB2YWx1ZTtcbn1cblxuLyoqIEByZXR1cm5zIHt7fX0gKi9cbmV4cG9ydCBmdW5jdGlvbiBlc2NhcGVfb2JqZWN0KG9iaikge1xuXHRjb25zdCByZXN1bHQgPSB7fTtcblx0Zm9yIChjb25zdCBrZXkgaW4gb2JqKSB7XG5cdFx0cmVzdWx0W2tleV0gPSBlc2NhcGVfYXR0cmlidXRlX3ZhbHVlKG9ialtrZXldKTtcblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufVxuXG4vKiogQHJldHVybnMge3N0cmluZ30gKi9cbmV4cG9ydCBmdW5jdGlvbiBlYWNoKGl0ZW1zLCBmbikge1xuXHRpdGVtcyA9IGVuc3VyZV9hcnJheV9saWtlKGl0ZW1zKTtcblx0bGV0IHN0ciA9ICcnO1xuXHRmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSArPSAxKSB7XG5cdFx0c3RyICs9IGZuKGl0ZW1zW2ldLCBpKTtcblx0fVxuXHRyZXR1cm4gc3RyO1xufVxuXG5leHBvcnQgY29uc3QgbWlzc2luZ19jb21wb25lbnQgPSB7XG5cdCQkcmVuZGVyOiAoKSA9PiAnJ1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlX2NvbXBvbmVudChjb21wb25lbnQsIG5hbWUpIHtcblx0aWYgKCFjb21wb25lbnQgfHwgIWNvbXBvbmVudC4kJHJlbmRlcikge1xuXHRcdGlmIChuYW1lID09PSAnc3ZlbHRlOmNvbXBvbmVudCcpIG5hbWUgKz0gJyB0aGlzPXsuLi59Jztcblx0XHR0aHJvdyBuZXcgRXJyb3IoXG5cdFx0XHRgPCR7bmFtZX0+IGlzIG5vdCBhIHZhbGlkIFNTUiBjb21wb25lbnQuIFlvdSBtYXkgbmVlZCB0byByZXZpZXcgeW91ciBidWlsZCBjb25maWcgdG8gZW5zdXJlIHRoYXQgZGVwZW5kZW5jaWVzIGFyZSBjb21waWxlZCwgcmF0aGVyIHRoYW4gaW1wb3J0ZWQgYXMgcHJlLWNvbXBpbGVkIG1vZHVsZXMuIE90aGVyd2lzZSB5b3UgbWF5IG5lZWQgdG8gZml4IGEgPCR7bmFtZX0+LmBcblx0XHQpO1xuXHR9XG5cdHJldHVybiBjb21wb25lbnQ7XG59XG5cbi8qKiBAcmV0dXJucyB7c3RyaW5nfSAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlYnVnKGZpbGUsIGxpbmUsIGNvbHVtbiwgdmFsdWVzKSB7XG5cdGNvbnNvbGUubG9nKGB7QGRlYnVnfSAke2ZpbGUgPyBmaWxlICsgJyAnIDogJyd9KCR7bGluZX06JHtjb2x1bW59KWApOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcblx0Y29uc29sZS5sb2codmFsdWVzKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG5cdHJldHVybiAnJztcbn1cblxubGV0IG9uX2Rlc3Ryb3k7XG5cbi8qKiBAcmV0dXJucyB7eyByZW5kZXI6IChwcm9wcz86IHt9LCB7ICQkc2xvdHMsIGNvbnRleHQgfT86IHsgJCRzbG90cz86IHt9OyBjb250ZXh0PzogTWFwPGFueSwgYW55PjsgfSkgPT4geyBodG1sOiBhbnk7IGNzczogeyBjb2RlOiBzdHJpbmc7IG1hcDogYW55OyB9OyBoZWFkOiBzdHJpbmc7IH07ICQkcmVuZGVyOiAocmVzdWx0OiBhbnksIHByb3BzOiBhbnksIGJpbmRpbmdzOiBhbnksIHNsb3RzOiBhbnksIGNvbnRleHQ6IGFueSkgPT4gYW55OyB9fSAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZV9zc3JfY29tcG9uZW50KGZuKSB7XG5cdGZ1bmN0aW9uICQkcmVuZGVyKHJlc3VsdCwgcHJvcHMsIGJpbmRpbmdzLCBzbG90cywgY29udGV4dCkge1xuXHRcdGNvbnN0IHBhcmVudF9jb21wb25lbnQgPSBjdXJyZW50X2NvbXBvbmVudDtcblx0XHRjb25zdCAkJCA9IHtcblx0XHRcdG9uX2Rlc3Ryb3ksXG5cdFx0XHRjb250ZXh0OiBuZXcgTWFwKGNvbnRleHQgfHwgKHBhcmVudF9jb21wb25lbnQgPyBwYXJlbnRfY29tcG9uZW50LiQkLmNvbnRleHQgOiBbXSkpLFxuXHRcdFx0Ly8gdGhlc2Ugd2lsbCBiZSBpbW1lZGlhdGVseSBkaXNjYXJkZWRcblx0XHRcdG9uX21vdW50OiBbXSxcblx0XHRcdGJlZm9yZV91cGRhdGU6IFtdLFxuXHRcdFx0YWZ0ZXJfdXBkYXRlOiBbXSxcblx0XHRcdGNhbGxiYWNrczogYmxhbmtfb2JqZWN0KClcblx0XHR9O1xuXHRcdHNldF9jdXJyZW50X2NvbXBvbmVudCh7ICQkIH0pO1xuXHRcdGNvbnN0IGh0bWwgPSBmbihyZXN1bHQsIHByb3BzLCBiaW5kaW5ncywgc2xvdHMpO1xuXHRcdHNldF9jdXJyZW50X2NvbXBvbmVudChwYXJlbnRfY29tcG9uZW50KTtcblx0XHRyZXR1cm4gaHRtbDtcblx0fVxuXHRyZXR1cm4ge1xuXHRcdHJlbmRlcjogKHByb3BzID0ge30sIHsgJCRzbG90cyA9IHt9LCBjb250ZXh0ID0gbmV3IE1hcCgpIH0gPSB7fSkgPT4ge1xuXHRcdFx0b25fZGVzdHJveSA9IFtdO1xuXHRcdFx0Y29uc3QgcmVzdWx0ID0geyB0aXRsZTogJycsIGhlYWQ6ICcnLCBjc3M6IG5ldyBTZXQoKSB9O1xuXHRcdFx0Y29uc3QgaHRtbCA9ICQkcmVuZGVyKHJlc3VsdCwgcHJvcHMsIHt9LCAkJHNsb3RzLCBjb250ZXh0KTtcblx0XHRcdHJ1bl9hbGwob25fZGVzdHJveSk7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRodG1sLFxuXHRcdFx0XHRjc3M6IHtcblx0XHRcdFx0XHRjb2RlOiBBcnJheS5mcm9tKHJlc3VsdC5jc3MpXG5cdFx0XHRcdFx0XHQubWFwKChjc3MpID0+IGNzcy5jb2RlKVxuXHRcdFx0XHRcdFx0LmpvaW4oJ1xcbicpLFxuXHRcdFx0XHRcdG1hcDogbnVsbCAvLyBUT0RPXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGhlYWQ6IHJlc3VsdC50aXRsZSArIHJlc3VsdC5oZWFkXG5cdFx0XHR9O1xuXHRcdH0sXG5cdFx0JCRyZW5kZXJcblx0fTtcbn1cblxuLyoqIEByZXR1cm5zIHtzdHJpbmd9ICovXG5leHBvcnQgZnVuY3Rpb24gYWRkX2F0dHJpYnV0ZShuYW1lLCB2YWx1ZSwgYm9vbGVhbikge1xuXHRpZiAodmFsdWUgPT0gbnVsbCB8fCAoYm9vbGVhbiAmJiAhdmFsdWUpKSByZXR1cm4gJyc7XG5cdGNvbnN0IGFzc2lnbm1lbnQgPSBib29sZWFuICYmIHZhbHVlID09PSB0cnVlID8gJycgOiBgPVwiJHtlc2NhcGUodmFsdWUsIHRydWUpfVwiYDtcblx0cmV0dXJuIGAgJHtuYW1lfSR7YXNzaWdubWVudH1gO1xufVxuXG4vKiogQHJldHVybnMge3N0cmluZ30gKi9cbmV4cG9ydCBmdW5jdGlvbiBhZGRfY2xhc3NlcyhjbGFzc2VzKSB7XG5cdHJldHVybiBjbGFzc2VzID8gYCBjbGFzcz1cIiR7Y2xhc3Nlc31cImAgOiAnJztcbn1cblxuLyoqIEByZXR1cm5zIHtzdHJpbmd9ICovXG5mdW5jdGlvbiBzdHlsZV9vYmplY3RfdG9fc3RyaW5nKHN0eWxlX29iamVjdCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMoc3R5bGVfb2JqZWN0KVxuXHRcdC5maWx0ZXIoKGtleSkgPT4gc3R5bGVfb2JqZWN0W2tleV0gIT0gbnVsbCAmJiBzdHlsZV9vYmplY3Rba2V5XSAhPT0gJycpXG5cdFx0Lm1hcCgoa2V5KSA9PiBgJHtrZXl9OiAke2VzY2FwZV9hdHRyaWJ1dGVfdmFsdWUoc3R5bGVfb2JqZWN0W2tleV0pfTtgKVxuXHRcdC5qb2luKCcgJyk7XG59XG5cbi8qKiBAcmV0dXJucyB7c3RyaW5nfSAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFkZF9zdHlsZXMoc3R5bGVfb2JqZWN0KSB7XG5cdGNvbnN0IHN0eWxlcyA9IHN0eWxlX29iamVjdF90b19zdHJpbmcoc3R5bGVfb2JqZWN0KTtcblx0cmV0dXJuIHN0eWxlcyA/IGAgc3R5bGU9XCIke3N0eWxlc31cImAgOiAnJztcbn1cbiIsICJpbXBvcnQge1xuXHRhZGRfcmVuZGVyX2NhbGxiYWNrLFxuXHRmbHVzaCxcblx0Zmx1c2hfcmVuZGVyX2NhbGxiYWNrcyxcblx0c2NoZWR1bGVfdXBkYXRlLFxuXHRkaXJ0eV9jb21wb25lbnRzXG59IGZyb20gJy4vc2NoZWR1bGVyLmpzJztcbmltcG9ydCB7IGN1cnJlbnRfY29tcG9uZW50LCBzZXRfY3VycmVudF9jb21wb25lbnQgfSBmcm9tICcuL2xpZmVjeWNsZS5qcyc7XG5pbXBvcnQgeyBibGFua19vYmplY3QsIGlzX2VtcHR5LCBpc19mdW5jdGlvbiwgcnVuLCBydW5fYWxsLCBub29wIH0gZnJvbSAnLi91dGlscy5qcyc7XG5pbXBvcnQge1xuXHRjaGlsZHJlbixcblx0ZGV0YWNoLFxuXHRzdGFydF9oeWRyYXRpbmcsXG5cdGVuZF9oeWRyYXRpbmcsXG5cdGdldF9jdXN0b21fZWxlbWVudHNfc2xvdHMsXG5cdGluc2VydCxcblx0ZWxlbWVudCxcblx0YXR0clxufSBmcm9tICcuL2RvbS5qcyc7XG5pbXBvcnQgeyB0cmFuc2l0aW9uX2luIH0gZnJvbSAnLi90cmFuc2l0aW9ucy5qcyc7XG5cbi8qKiBAcmV0dXJucyB7dm9pZH0gKi9cbmV4cG9ydCBmdW5jdGlvbiBiaW5kKGNvbXBvbmVudCwgbmFtZSwgY2FsbGJhY2spIHtcblx0Y29uc3QgaW5kZXggPSBjb21wb25lbnQuJCQucHJvcHNbbmFtZV07XG5cdGlmIChpbmRleCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0Y29tcG9uZW50LiQkLmJvdW5kW2luZGV4XSA9IGNhbGxiYWNrO1xuXHRcdGNhbGxiYWNrKGNvbXBvbmVudC4kJC5jdHhbaW5kZXhdKTtcblx0fVxufVxuXG4vKiogQHJldHVybnMge3ZvaWR9ICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlX2NvbXBvbmVudChibG9jaykge1xuXHRibG9jayAmJiBibG9jay5jKCk7XG59XG5cbi8qKiBAcmV0dXJucyB7dm9pZH0gKi9cbmV4cG9ydCBmdW5jdGlvbiBjbGFpbV9jb21wb25lbnQoYmxvY2ssIHBhcmVudF9ub2Rlcykge1xuXHRibG9jayAmJiBibG9jay5sKHBhcmVudF9ub2Rlcyk7XG59XG5cbi8qKiBAcmV0dXJucyB7dm9pZH0gKi9cbmV4cG9ydCBmdW5jdGlvbiBtb3VudF9jb21wb25lbnQoY29tcG9uZW50LCB0YXJnZXQsIGFuY2hvcikge1xuXHRjb25zdCB7IGZyYWdtZW50LCBhZnRlcl91cGRhdGUgfSA9IGNvbXBvbmVudC4kJDtcblx0ZnJhZ21lbnQgJiYgZnJhZ21lbnQubSh0YXJnZXQsIGFuY2hvcik7XG5cdC8vIG9uTW91bnQgaGFwcGVucyBiZWZvcmUgdGhlIGluaXRpYWwgYWZ0ZXJVcGRhdGVcblx0YWRkX3JlbmRlcl9jYWxsYmFjaygoKSA9PiB7XG5cdFx0Y29uc3QgbmV3X29uX2Rlc3Ryb3kgPSBjb21wb25lbnQuJCQub25fbW91bnQubWFwKHJ1bikuZmlsdGVyKGlzX2Z1bmN0aW9uKTtcblx0XHQvLyBpZiB0aGUgY29tcG9uZW50IHdhcyBkZXN0cm95ZWQgaW1tZWRpYXRlbHlcblx0XHQvLyBpdCB3aWxsIHVwZGF0ZSB0aGUgYCQkLm9uX2Rlc3Ryb3lgIHJlZmVyZW5jZSB0byBgbnVsbGAuXG5cdFx0Ly8gdGhlIGRlc3RydWN0dXJlZCBvbl9kZXN0cm95IG1heSBzdGlsbCByZWZlcmVuY2UgdG8gdGhlIG9sZCBhcnJheVxuXHRcdGlmIChjb21wb25lbnQuJCQub25fZGVzdHJveSkge1xuXHRcdFx0Y29tcG9uZW50LiQkLm9uX2Rlc3Ryb3kucHVzaCguLi5uZXdfb25fZGVzdHJveSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIEVkZ2UgY2FzZSAtIGNvbXBvbmVudCB3YXMgZGVzdHJveWVkIGltbWVkaWF0ZWx5LFxuXHRcdFx0Ly8gbW9zdCBsaWtlbHkgYXMgYSByZXN1bHQgb2YgYSBiaW5kaW5nIGluaXRpYWxpc2luZ1xuXHRcdFx0cnVuX2FsbChuZXdfb25fZGVzdHJveSk7XG5cdFx0fVxuXHRcdGNvbXBvbmVudC4kJC5vbl9tb3VudCA9IFtdO1xuXHR9KTtcblx0YWZ0ZXJfdXBkYXRlLmZvckVhY2goYWRkX3JlbmRlcl9jYWxsYmFjayk7XG59XG5cbi8qKiBAcmV0dXJucyB7dm9pZH0gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZXN0cm95X2NvbXBvbmVudChjb21wb25lbnQsIGRldGFjaGluZykge1xuXHRjb25zdCAkJCA9IGNvbXBvbmVudC4kJDtcblx0aWYgKCQkLmZyYWdtZW50ICE9PSBudWxsKSB7XG5cdFx0Zmx1c2hfcmVuZGVyX2NhbGxiYWNrcygkJC5hZnRlcl91cGRhdGUpO1xuXHRcdHJ1bl9hbGwoJCQub25fZGVzdHJveSk7XG5cdFx0JCQuZnJhZ21lbnQgJiYgJCQuZnJhZ21lbnQuZChkZXRhY2hpbmcpO1xuXHRcdC8vIFRPRE8gbnVsbCBvdXQgb3RoZXIgcmVmcywgaW5jbHVkaW5nIGNvbXBvbmVudC4kJCAoYnV0IG5lZWQgdG9cblx0XHQvLyBwcmVzZXJ2ZSBmaW5hbCBzdGF0ZT8pXG5cdFx0JCQub25fZGVzdHJveSA9ICQkLmZyYWdtZW50ID0gbnVsbDtcblx0XHQkJC5jdHggPSBbXTtcblx0fVxufVxuXG4vKiogQHJldHVybnMge3ZvaWR9ICovXG5mdW5jdGlvbiBtYWtlX2RpcnR5KGNvbXBvbmVudCwgaSkge1xuXHRpZiAoY29tcG9uZW50LiQkLmRpcnR5WzBdID09PSAtMSkge1xuXHRcdGRpcnR5X2NvbXBvbmVudHMucHVzaChjb21wb25lbnQpO1xuXHRcdHNjaGVkdWxlX3VwZGF0ZSgpO1xuXHRcdGNvbXBvbmVudC4kJC5kaXJ0eS5maWxsKDApO1xuXHR9XG5cdGNvbXBvbmVudC4kJC5kaXJ0eVsoaSAvIDMxKSB8IDBdIHw9IDEgPDwgaSAlIDMxO1xufVxuXG4vLyBUT0RPOiBEb2N1bWVudCB0aGUgb3RoZXIgcGFyYW1zXG4vKipcbiAqIEBwYXJhbSB7U3ZlbHRlQ29tcG9uZW50fSBjb21wb25lbnRcbiAqIEBwYXJhbSB7aW1wb3J0KCcuL3B1YmxpYy5qcycpLkNvbXBvbmVudENvbnN0cnVjdG9yT3B0aW9uc30gb3B0aW9uc1xuICpcbiAqIEBwYXJhbSB7aW1wb3J0KCcuL3V0aWxzLmpzJylbJ25vdF9lcXVhbCddfSBub3RfZXF1YWwgVXNlZCB0byBjb21wYXJlIHByb3BzIGFuZCBzdGF0ZSB2YWx1ZXMuXG4gKiBAcGFyYW0geyh0YXJnZXQ6IEVsZW1lbnQgfCBTaGFkb3dSb290KSA9PiB2b2lkfSBbYXBwZW5kX3N0eWxlc10gRnVuY3Rpb24gdGhhdCBhcHBlbmRzIHN0eWxlcyB0byB0aGUgRE9NIHdoZW4gdGhlIGNvbXBvbmVudCBpcyBmaXJzdCBpbml0aWFsaXNlZC5cbiAqIFRoaXMgd2lsbCBiZSB0aGUgYGFkZF9jc3NgIGZ1bmN0aW9uIGZyb20gdGhlIGNvbXBpbGVkIGNvbXBvbmVudC5cbiAqXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluaXQoXG5cdGNvbXBvbmVudCxcblx0b3B0aW9ucyxcblx0aW5zdGFuY2UsXG5cdGNyZWF0ZV9mcmFnbWVudCxcblx0bm90X2VxdWFsLFxuXHRwcm9wcyxcblx0YXBwZW5kX3N0eWxlcyA9IG51bGwsXG5cdGRpcnR5ID0gWy0xXVxuKSB7XG5cdGNvbnN0IHBhcmVudF9jb21wb25lbnQgPSBjdXJyZW50X2NvbXBvbmVudDtcblx0c2V0X2N1cnJlbnRfY29tcG9uZW50KGNvbXBvbmVudCk7XG5cdC8qKiBAdHlwZSB7aW1wb3J0KCcuL3ByaXZhdGUuanMnKS5UJCR9ICovXG5cdGNvbnN0ICQkID0gKGNvbXBvbmVudC4kJCA9IHtcblx0XHRmcmFnbWVudDogbnVsbCxcblx0XHRjdHg6IFtdLFxuXHRcdC8vIHN0YXRlXG5cdFx0cHJvcHMsXG5cdFx0dXBkYXRlOiBub29wLFxuXHRcdG5vdF9lcXVhbCxcblx0XHRib3VuZDogYmxhbmtfb2JqZWN0KCksXG5cdFx0Ly8gbGlmZWN5Y2xlXG5cdFx0b25fbW91bnQ6IFtdLFxuXHRcdG9uX2Rlc3Ryb3k6IFtdLFxuXHRcdG9uX2Rpc2Nvbm5lY3Q6IFtdLFxuXHRcdGJlZm9yZV91cGRhdGU6IFtdLFxuXHRcdGFmdGVyX3VwZGF0ZTogW10sXG5cdFx0Y29udGV4dDogbmV3IE1hcChvcHRpb25zLmNvbnRleHQgfHwgKHBhcmVudF9jb21wb25lbnQgPyBwYXJlbnRfY29tcG9uZW50LiQkLmNvbnRleHQgOiBbXSkpLFxuXHRcdC8vIGV2ZXJ5dGhpbmcgZWxzZVxuXHRcdGNhbGxiYWNrczogYmxhbmtfb2JqZWN0KCksXG5cdFx0ZGlydHksXG5cdFx0c2tpcF9ib3VuZDogZmFsc2UsXG5cdFx0cm9vdDogb3B0aW9ucy50YXJnZXQgfHwgcGFyZW50X2NvbXBvbmVudC4kJC5yb290XG5cdH0pO1xuXHRhcHBlbmRfc3R5bGVzICYmIGFwcGVuZF9zdHlsZXMoJCQucm9vdCk7XG5cdGxldCByZWFkeSA9IGZhbHNlO1xuXHQkJC5jdHggPSBpbnN0YW5jZVxuXHRcdD8gaW5zdGFuY2UoY29tcG9uZW50LCBvcHRpb25zLnByb3BzIHx8IHt9LCAoaSwgcmV0LCAuLi5yZXN0KSA9PiB7XG5cdFx0XHRcdGNvbnN0IHZhbHVlID0gcmVzdC5sZW5ndGggPyByZXN0WzBdIDogcmV0O1xuXHRcdFx0XHRpZiAoJCQuY3R4ICYmIG5vdF9lcXVhbCgkJC5jdHhbaV0sICgkJC5jdHhbaV0gPSB2YWx1ZSkpKSB7XG5cdFx0XHRcdFx0aWYgKCEkJC5za2lwX2JvdW5kICYmICQkLmJvdW5kW2ldKSAkJC5ib3VuZFtpXSh2YWx1ZSk7XG5cdFx0XHRcdFx0aWYgKHJlYWR5KSBtYWtlX2RpcnR5KGNvbXBvbmVudCwgaSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHJldDtcblx0XHQgIH0pXG5cdFx0OiBbXTtcblx0JCQudXBkYXRlKCk7XG5cdHJlYWR5ID0gdHJ1ZTtcblx0cnVuX2FsbCgkJC5iZWZvcmVfdXBkYXRlKTtcblx0Ly8gYGZhbHNlYCBhcyBhIHNwZWNpYWwgY2FzZSBvZiBubyBET00gY29tcG9uZW50XG5cdCQkLmZyYWdtZW50ID0gY3JlYXRlX2ZyYWdtZW50ID8gY3JlYXRlX2ZyYWdtZW50KCQkLmN0eCkgOiBmYWxzZTtcblx0aWYgKG9wdGlvbnMudGFyZ2V0KSB7XG5cdFx0aWYgKG9wdGlvbnMuaHlkcmF0ZSkge1xuXHRcdFx0c3RhcnRfaHlkcmF0aW5nKCk7XG5cdFx0XHQvLyBUT0RPOiB3aGF0IGlzIHRoZSBjb3JyZWN0IHR5cGUgaGVyZT9cblx0XHRcdC8vIEB0cy1leHBlY3QtZXJyb3Jcblx0XHRcdGNvbnN0IG5vZGVzID0gY2hpbGRyZW4ob3B0aW9ucy50YXJnZXQpO1xuXHRcdFx0JCQuZnJhZ21lbnQgJiYgJCQuZnJhZ21lbnQubChub2Rlcyk7XG5cdFx0XHRub2Rlcy5mb3JFYWNoKGRldGFjaCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbm9uLW51bGwtYXNzZXJ0aW9uXG5cdFx0XHQkJC5mcmFnbWVudCAmJiAkJC5mcmFnbWVudC5jKCk7XG5cdFx0fVxuXHRcdGlmIChvcHRpb25zLmludHJvKSB0cmFuc2l0aW9uX2luKGNvbXBvbmVudC4kJC5mcmFnbWVudCk7XG5cdFx0bW91bnRfY29tcG9uZW50KGNvbXBvbmVudCwgb3B0aW9ucy50YXJnZXQsIG9wdGlvbnMuYW5jaG9yKTtcblx0XHRlbmRfaHlkcmF0aW5nKCk7XG5cdFx0Zmx1c2goKTtcblx0fVxuXHRzZXRfY3VycmVudF9jb21wb25lbnQocGFyZW50X2NvbXBvbmVudCk7XG59XG5cbmV4cG9ydCBsZXQgU3ZlbHRlRWxlbWVudDtcblxuaWYgKHR5cGVvZiBIVE1MRWxlbWVudCA9PT0gJ2Z1bmN0aW9uJykge1xuXHRTdmVsdGVFbGVtZW50ID0gY2xhc3MgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG5cdFx0LyoqIFRoZSBTdmVsdGUgY29tcG9uZW50IGNvbnN0cnVjdG9yICovXG5cdFx0JCRjdG9yO1xuXHRcdC8qKiBTbG90cyAqL1xuXHRcdCQkcztcblx0XHQvKiogVGhlIFN2ZWx0ZSBjb21wb25lbnQgaW5zdGFuY2UgKi9cblx0XHQkJGM7XG5cdFx0LyoqIFdoZXRoZXIgb3Igbm90IHRoZSBjdXN0b20gZWxlbWVudCBpcyBjb25uZWN0ZWQgKi9cblx0XHQkJGNuID0gZmFsc2U7XG5cdFx0LyoqIENvbXBvbmVudCBwcm9wcyBkYXRhICovXG5cdFx0JCRkID0ge307XG5cdFx0LyoqIGB0cnVlYCBpZiBjdXJyZW50bHkgaW4gdGhlIHByb2Nlc3Mgb2YgcmVmbGVjdGluZyBjb21wb25lbnQgcHJvcHMgYmFjayB0byBhdHRyaWJ1dGVzICovXG5cdFx0JCRyID0gZmFsc2U7XG5cdFx0LyoqIEB0eXBlIHtSZWNvcmQ8c3RyaW5nLCBDdXN0b21FbGVtZW50UHJvcERlZmluaXRpb24+fSBQcm9wcyBkZWZpbml0aW9uIChuYW1lLCByZWZsZWN0ZWQsIHR5cGUgZXRjKSAqL1xuXHRcdCQkcF9kID0ge307XG5cdFx0LyoqIEB0eXBlIHtSZWNvcmQ8c3RyaW5nLCBGdW5jdGlvbltdPn0gRXZlbnQgbGlzdGVuZXJzICovXG5cdFx0JCRsID0ge307XG5cdFx0LyoqIEB0eXBlIHtNYXA8RnVuY3Rpb24sIEZ1bmN0aW9uPn0gRXZlbnQgbGlzdGVuZXIgdW5zdWJzY3JpYmUgZnVuY3Rpb25zICovXG5cdFx0JCRsX3UgPSBuZXcgTWFwKCk7XG5cblx0XHRjb25zdHJ1Y3RvcigkJGNvbXBvbmVudEN0b3IsICQkc2xvdHMsIHVzZV9zaGFkb3dfZG9tKSB7XG5cdFx0XHRzdXBlcigpO1xuXHRcdFx0dGhpcy4kJGN0b3IgPSAkJGNvbXBvbmVudEN0b3I7XG5cdFx0XHR0aGlzLiQkcyA9ICQkc2xvdHM7XG5cdFx0XHRpZiAodXNlX3NoYWRvd19kb20pIHtcblx0XHRcdFx0dGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiAnb3BlbicgfSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0YWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lciwgb3B0aW9ucykge1xuXHRcdFx0Ly8gV2UgY2FuJ3QgZGV0ZXJtaW5lIHVwZnJvbnQgaWYgdGhlIGV2ZW50IGlzIGEgY3VzdG9tIGV2ZW50IG9yIG5vdCwgc28gd2UgaGF2ZSB0b1xuXHRcdFx0Ly8gbGlzdGVuIHRvIGJvdGguIElmIHNvbWVvbmUgdXNlcyBhIGN1c3RvbSBldmVudCB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgYSByZWd1bGFyXG5cdFx0XHQvLyBicm93c2VyIGV2ZW50LCB0aGlzIGZpcmVzIHR3aWNlIC0gd2UgY2FuJ3QgYXZvaWQgdGhhdC5cblx0XHRcdHRoaXMuJCRsW3R5cGVdID0gdGhpcy4kJGxbdHlwZV0gfHwgW107XG5cdFx0XHR0aGlzLiQkbFt0eXBlXS5wdXNoKGxpc3RlbmVyKTtcblx0XHRcdGlmICh0aGlzLiQkYykge1xuXHRcdFx0XHRjb25zdCB1bnN1YiA9IHRoaXMuJCRjLiRvbih0eXBlLCBsaXN0ZW5lcik7XG5cdFx0XHRcdHRoaXMuJCRsX3Uuc2V0KGxpc3RlbmVyLCB1bnN1Yik7XG5cdFx0XHR9XG5cdFx0XHRzdXBlci5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyLCBvcHRpb25zKTtcblx0XHR9XG5cblx0XHRyZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyLCBvcHRpb25zKSB7XG5cdFx0XHRzdXBlci5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyLCBvcHRpb25zKTtcblx0XHRcdGlmICh0aGlzLiQkYykge1xuXHRcdFx0XHRjb25zdCB1bnN1YiA9IHRoaXMuJCRsX3UuZ2V0KGxpc3RlbmVyKTtcblx0XHRcdFx0aWYgKHVuc3ViKSB7XG5cdFx0XHRcdFx0dW5zdWIoKTtcblx0XHRcdFx0XHR0aGlzLiQkbF91LmRlbGV0ZShsaXN0ZW5lcik7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRhc3luYyBjb25uZWN0ZWRDYWxsYmFjaygpIHtcblx0XHRcdHRoaXMuJCRjbiA9IHRydWU7XG5cdFx0XHRpZiAoIXRoaXMuJCRjKSB7XG5cdFx0XHRcdC8vIFdlIHdhaXQgb25lIHRpY2sgdG8gbGV0IHBvc3NpYmxlIGNoaWxkIHNsb3QgZWxlbWVudHMgYmUgY3JlYXRlZC9tb3VudGVkXG5cdFx0XHRcdGF3YWl0IFByb21pc2UucmVzb2x2ZSgpO1xuXHRcdFx0XHRpZiAoIXRoaXMuJCRjbiB8fCB0aGlzLiQkYykge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0XHRmdW5jdGlvbiBjcmVhdGVfc2xvdChuYW1lKSB7XG5cdFx0XHRcdFx0cmV0dXJuICgpID0+IHtcblx0XHRcdFx0XHRcdGxldCBub2RlO1xuXHRcdFx0XHRcdFx0Y29uc3Qgb2JqID0ge1xuXHRcdFx0XHRcdFx0XHRjOiBmdW5jdGlvbiBjcmVhdGUoKSB7XG5cdFx0XHRcdFx0XHRcdFx0bm9kZSA9IGVsZW1lbnQoJ3Nsb3QnKTtcblx0XHRcdFx0XHRcdFx0XHRpZiAobmFtZSAhPT0gJ2RlZmF1bHQnKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRhdHRyKG5vZGUsICduYW1lJywgbmFtZSk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHQvKipcblx0XHRcdFx0XHRcdFx0ICogQHBhcmFtIHtIVE1MRWxlbWVudH0gdGFyZ2V0XG5cdFx0XHRcdFx0XHRcdCAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IFthbmNob3JdXG5cdFx0XHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdFx0XHRtOiBmdW5jdGlvbiBtb3VudCh0YXJnZXQsIGFuY2hvcikge1xuXHRcdFx0XHRcdFx0XHRcdGluc2VydCh0YXJnZXQsIG5vZGUsIGFuY2hvcik7XG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdGQ6IGZ1bmN0aW9uIGRlc3Ryb3koZGV0YWNoaW5nKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKGRldGFjaGluZykge1xuXHRcdFx0XHRcdFx0XHRcdFx0ZGV0YWNoKG5vZGUpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdHJldHVybiBvYmo7XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0fVxuXHRcdFx0XHRjb25zdCAkJHNsb3RzID0ge307XG5cdFx0XHRcdGNvbnN0IGV4aXN0aW5nX3Nsb3RzID0gZ2V0X2N1c3RvbV9lbGVtZW50c19zbG90cyh0aGlzKTtcblx0XHRcdFx0Zm9yIChjb25zdCBuYW1lIG9mIHRoaXMuJCRzKSB7XG5cdFx0XHRcdFx0aWYgKG5hbWUgaW4gZXhpc3Rpbmdfc2xvdHMpIHtcblx0XHRcdFx0XHRcdCQkc2xvdHNbbmFtZV0gPSBbY3JlYXRlX3Nsb3QobmFtZSldO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRmb3IgKGNvbnN0IGF0dHJpYnV0ZSBvZiB0aGlzLmF0dHJpYnV0ZXMpIHtcblx0XHRcdFx0XHQvLyB0aGlzLiQkZGF0YSB0YWtlcyBwcmVjZWRlbmNlIG92ZXIgdGhpcy5hdHRyaWJ1dGVzXG5cdFx0XHRcdFx0Y29uc3QgbmFtZSA9IHRoaXMuJCRnX3AoYXR0cmlidXRlLm5hbWUpO1xuXHRcdFx0XHRcdGlmICghKG5hbWUgaW4gdGhpcy4kJGQpKSB7XG5cdFx0XHRcdFx0XHR0aGlzLiQkZFtuYW1lXSA9IGdldF9jdXN0b21fZWxlbWVudF92YWx1ZShuYW1lLCBhdHRyaWJ1dGUudmFsdWUsIHRoaXMuJCRwX2QsICd0b1Byb3AnKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0Ly8gUG9ydCBvdmVyIHByb3BzIHRoYXQgd2VyZSBzZXQgcHJvZ3JhbW1hdGljYWxseSBiZWZvcmUgY2Ugd2FzIGluaXRpYWxpemVkXG5cdFx0XHRcdGZvciAoY29uc3Qga2V5IGluIHRoaXMuJCRwX2QpIHtcblx0XHRcdFx0XHRpZiAoIShrZXkgaW4gdGhpcy4kJGQpICYmIHRoaXNba2V5XSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0XHR0aGlzLiQkZFtrZXldID0gdGhpc1trZXldOyAvLyBkb24ndCB0cmFuc2Zvcm0sIHRoZXNlIHdlcmUgc2V0IHRocm91Z2ggSmF2YVNjcmlwdFxuXHRcdFx0XHRcdFx0ZGVsZXRlIHRoaXNba2V5XTsgLy8gcmVtb3ZlIHRoZSBwcm9wZXJ0eSB0aGF0IHNoYWRvd3MgdGhlIGdldHRlci9zZXR0ZXJcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0dGhpcy4kJGMgPSBuZXcgdGhpcy4kJGN0b3Ioe1xuXHRcdFx0XHRcdHRhcmdldDogdGhpcy5zaGFkb3dSb290IHx8IHRoaXMsXG5cdFx0XHRcdFx0cHJvcHM6IHtcblx0XHRcdFx0XHRcdC4uLnRoaXMuJCRkLFxuXHRcdFx0XHRcdFx0JCRzbG90cyxcblx0XHRcdFx0XHRcdCQkc2NvcGU6IHtcblx0XHRcdFx0XHRcdFx0Y3R4OiBbXVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0Ly8gUmVmbGVjdCBjb21wb25lbnQgcHJvcHMgYXMgYXR0cmlidXRlc1xuXHRcdFx0XHRjb25zdCByZWZsZWN0X2F0dHJpYnV0ZXMgPSAoKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy4kJHIgPSB0cnVlO1xuXHRcdFx0XHRcdGZvciAoY29uc3Qga2V5IGluIHRoaXMuJCRwX2QpIHtcblx0XHRcdFx0XHRcdHRoaXMuJCRkW2tleV0gPSB0aGlzLiQkYy4kJC5jdHhbdGhpcy4kJGMuJCQucHJvcHNba2V5XV07XG5cdFx0XHRcdFx0XHRpZiAodGhpcy4kJHBfZFtrZXldLnJlZmxlY3QpIHtcblx0XHRcdFx0XHRcdFx0Y29uc3QgYXR0cmlidXRlX3ZhbHVlID0gZ2V0X2N1c3RvbV9lbGVtZW50X3ZhbHVlKFxuXHRcdFx0XHRcdFx0XHRcdGtleSxcblx0XHRcdFx0XHRcdFx0XHR0aGlzLiQkZFtrZXldLFxuXHRcdFx0XHRcdFx0XHRcdHRoaXMuJCRwX2QsXG5cdFx0XHRcdFx0XHRcdFx0J3RvQXR0cmlidXRlJ1xuXHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0XHRpZiAoYXR0cmlidXRlX3ZhbHVlID09IG51bGwpIHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLnJlbW92ZUF0dHJpYnV0ZSh0aGlzLiQkcF9kW2tleV0uYXR0cmlidXRlIHx8IGtleSk7XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5zZXRBdHRyaWJ1dGUodGhpcy4kJHBfZFtrZXldLmF0dHJpYnV0ZSB8fCBrZXksIGF0dHJpYnV0ZV92YWx1ZSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0dGhpcy4kJHIgPSBmYWxzZTtcblx0XHRcdFx0fTtcblx0XHRcdFx0dGhpcy4kJGMuJCQuYWZ0ZXJfdXBkYXRlLnB1c2gocmVmbGVjdF9hdHRyaWJ1dGVzKTtcblx0XHRcdFx0cmVmbGVjdF9hdHRyaWJ1dGVzKCk7IC8vIG9uY2UgaW5pdGlhbGx5IGJlY2F1c2UgYWZ0ZXJfdXBkYXRlIGlzIGFkZGVkIHRvbyBsYXRlIGZvciBmaXJzdCByZW5kZXJcblxuXHRcdFx0XHRmb3IgKGNvbnN0IHR5cGUgaW4gdGhpcy4kJGwpIHtcblx0XHRcdFx0XHRmb3IgKGNvbnN0IGxpc3RlbmVyIG9mIHRoaXMuJCRsW3R5cGVdKSB7XG5cdFx0XHRcdFx0XHRjb25zdCB1bnN1YiA9IHRoaXMuJCRjLiRvbih0eXBlLCBsaXN0ZW5lcik7XG5cdFx0XHRcdFx0XHR0aGlzLiQkbF91LnNldChsaXN0ZW5lciwgdW5zdWIpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLiQkbCA9IHt9O1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIFdlIGRvbid0IG5lZWQgdGhpcyB3aGVuIHdvcmtpbmcgd2l0aGluIFN2ZWx0ZSBjb2RlLCBidXQgZm9yIGNvbXBhdGliaWxpdHkgb2YgcGVvcGxlIHVzaW5nIHRoaXMgb3V0c2lkZSBvZiBTdmVsdGVcblx0XHQvLyBhbmQgc2V0dGluZyBhdHRyaWJ1dGVzIHRocm91Z2ggc2V0QXR0cmlidXRlIGV0YywgdGhpcyBpcyBoZWxwZnVsXG5cdFx0YXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKGF0dHIsIF9vbGRWYWx1ZSwgbmV3VmFsdWUpIHtcblx0XHRcdGlmICh0aGlzLiQkcikgcmV0dXJuO1xuXHRcdFx0YXR0ciA9IHRoaXMuJCRnX3AoYXR0cik7XG5cdFx0XHR0aGlzLiQkZFthdHRyXSA9IGdldF9jdXN0b21fZWxlbWVudF92YWx1ZShhdHRyLCBuZXdWYWx1ZSwgdGhpcy4kJHBfZCwgJ3RvUHJvcCcpO1xuXHRcdFx0dGhpcy4kJGM/LiRzZXQoeyBbYXR0cl06IHRoaXMuJCRkW2F0dHJdIH0pO1xuXHRcdH1cblxuXHRcdGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuXHRcdFx0dGhpcy4kJGNuID0gZmFsc2U7XG5cdFx0XHQvLyBJbiBhIG1pY3JvdGFzaywgYmVjYXVzZSB0aGlzIGNvdWxkIGJlIGEgbW92ZSB3aXRoaW4gdGhlIERPTVxuXHRcdFx0UHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7XG5cdFx0XHRcdGlmICghdGhpcy4kJGNuICYmIHRoaXMuJCRjKSB7XG5cdFx0XHRcdFx0dGhpcy4kJGMuJGRlc3Ryb3koKTtcblx0XHRcdFx0XHR0aGlzLiQkYyA9IHVuZGVmaW5lZDtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0JCRnX3AoYXR0cmlidXRlX25hbWUpIHtcblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdE9iamVjdC5rZXlzKHRoaXMuJCRwX2QpLmZpbmQoXG5cdFx0XHRcdFx0KGtleSkgPT5cblx0XHRcdFx0XHRcdHRoaXMuJCRwX2Rba2V5XS5hdHRyaWJ1dGUgPT09IGF0dHJpYnV0ZV9uYW1lIHx8XG5cdFx0XHRcdFx0XHQoIXRoaXMuJCRwX2Rba2V5XS5hdHRyaWJ1dGUgJiYga2V5LnRvTG93ZXJDYXNlKCkgPT09IGF0dHJpYnV0ZV9uYW1lKVxuXHRcdFx0XHQpIHx8IGF0dHJpYnV0ZV9uYW1lXG5cdFx0XHQpO1xuXHRcdH1cblx0fTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvcFxuICogQHBhcmFtIHthbnl9IHZhbHVlXG4gKiBAcGFyYW0ge1JlY29yZDxzdHJpbmcsIEN1c3RvbUVsZW1lbnRQcm9wRGVmaW5pdGlvbj59IHByb3BzX2RlZmluaXRpb25cbiAqIEBwYXJhbSB7J3RvQXR0cmlidXRlJyB8ICd0b1Byb3AnfSBbdHJhbnNmb3JtXVxuICovXG5mdW5jdGlvbiBnZXRfY3VzdG9tX2VsZW1lbnRfdmFsdWUocHJvcCwgdmFsdWUsIHByb3BzX2RlZmluaXRpb24sIHRyYW5zZm9ybSkge1xuXHRjb25zdCB0eXBlID0gcHJvcHNfZGVmaW5pdGlvbltwcm9wXT8udHlwZTtcblx0dmFsdWUgPSB0eXBlID09PSAnQm9vbGVhbicgJiYgdHlwZW9mIHZhbHVlICE9PSAnYm9vbGVhbicgPyB2YWx1ZSAhPSBudWxsIDogdmFsdWU7XG5cdGlmICghdHJhbnNmb3JtIHx8ICFwcm9wc19kZWZpbml0aW9uW3Byb3BdKSB7XG5cdFx0cmV0dXJuIHZhbHVlO1xuXHR9IGVsc2UgaWYgKHRyYW5zZm9ybSA9PT0gJ3RvQXR0cmlidXRlJykge1xuXHRcdHN3aXRjaCAodHlwZSkge1xuXHRcdFx0Y2FzZSAnT2JqZWN0Jzpcblx0XHRcdGNhc2UgJ0FycmF5Jzpcblx0XHRcdFx0cmV0dXJuIHZhbHVlID09IG51bGwgPyBudWxsIDogSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuXHRcdFx0Y2FzZSAnQm9vbGVhbic6XG5cdFx0XHRcdHJldHVybiB2YWx1ZSA/ICcnIDogbnVsbDtcblx0XHRcdGNhc2UgJ051bWJlcic6XG5cdFx0XHRcdHJldHVybiB2YWx1ZSA9PSBudWxsID8gbnVsbCA6IHZhbHVlO1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0cmV0dXJuIHZhbHVlO1xuXHRcdH1cblx0fSBlbHNlIHtcblx0XHRzd2l0Y2ggKHR5cGUpIHtcblx0XHRcdGNhc2UgJ09iamVjdCc6XG5cdFx0XHRjYXNlICdBcnJheSc6XG5cdFx0XHRcdHJldHVybiB2YWx1ZSAmJiBKU09OLnBhcnNlKHZhbHVlKTtcblx0XHRcdGNhc2UgJ0Jvb2xlYW4nOlxuXHRcdFx0XHRyZXR1cm4gdmFsdWU7IC8vIGNvbnZlcnNpb24gYWxyZWFkeSBoYW5kbGVkIGFib3ZlXG5cdFx0XHRjYXNlICdOdW1iZXInOlxuXHRcdFx0XHRyZXR1cm4gdmFsdWUgIT0gbnVsbCA/ICt2YWx1ZSA6IHZhbHVlO1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0cmV0dXJuIHZhbHVlO1xuXHRcdH1cblx0fVxufVxuXG4vKipcbiAqIEBpbnRlcm5hbFxuICpcbiAqIFR1cm4gYSBTdmVsdGUgY29tcG9uZW50IGludG8gYSBjdXN0b20gZWxlbWVudC5cbiAqIEBwYXJhbSB7aW1wb3J0KCcuL3B1YmxpYy5qcycpLkNvbXBvbmVudFR5cGV9IENvbXBvbmVudCAgQSBTdmVsdGUgY29tcG9uZW50IGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge1JlY29yZDxzdHJpbmcsIEN1c3RvbUVsZW1lbnRQcm9wRGVmaW5pdGlvbj59IHByb3BzX2RlZmluaXRpb24gIFRoZSBwcm9wcyB0byBvYnNlcnZlXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBzbG90cyAgVGhlIHNsb3RzIHRvIGNyZWF0ZVxuICogQHBhcmFtIHtzdHJpbmdbXX0gYWNjZXNzb3JzICBPdGhlciBhY2Nlc3NvcnMgYmVzaWRlcyB0aGUgb25lcyBmb3IgcHJvcHMgdGhlIGNvbXBvbmVudCBoYXNcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gdXNlX3NoYWRvd19kb20gIFdoZXRoZXIgdG8gdXNlIHNoYWRvdyBET01cbiAqIEBwYXJhbSB7KGNlOiBuZXcgKCkgPT4gSFRNTEVsZW1lbnQpID0+IG5ldyAoKSA9PiBIVE1MRWxlbWVudH0gW2V4dGVuZF1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZV9jdXN0b21fZWxlbWVudChcblx0Q29tcG9uZW50LFxuXHRwcm9wc19kZWZpbml0aW9uLFxuXHRzbG90cyxcblx0YWNjZXNzb3JzLFxuXHR1c2Vfc2hhZG93X2RvbSxcblx0ZXh0ZW5kXG4pIHtcblx0bGV0IENsYXNzID0gY2xhc3MgZXh0ZW5kcyBTdmVsdGVFbGVtZW50IHtcblx0XHRjb25zdHJ1Y3RvcigpIHtcblx0XHRcdHN1cGVyKENvbXBvbmVudCwgc2xvdHMsIHVzZV9zaGFkb3dfZG9tKTtcblx0XHRcdHRoaXMuJCRwX2QgPSBwcm9wc19kZWZpbml0aW9uO1xuXHRcdH1cblx0XHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcblx0XHRcdHJldHVybiBPYmplY3Qua2V5cyhwcm9wc19kZWZpbml0aW9uKS5tYXAoKGtleSkgPT5cblx0XHRcdFx0KHByb3BzX2RlZmluaXRpb25ba2V5XS5hdHRyaWJ1dGUgfHwga2V5KS50b0xvd2VyQ2FzZSgpXG5cdFx0XHQpO1xuXHRcdH1cblx0fTtcblx0T2JqZWN0LmtleXMocHJvcHNfZGVmaW5pdGlvbikuZm9yRWFjaCgocHJvcCkgPT4ge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDbGFzcy5wcm90b3R5cGUsIHByb3AsIHtcblx0XHRcdGdldCgpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuJCRjICYmIHByb3AgaW4gdGhpcy4kJGMgPyB0aGlzLiQkY1twcm9wXSA6IHRoaXMuJCRkW3Byb3BdO1xuXHRcdFx0fSxcblx0XHRcdHNldCh2YWx1ZSkge1xuXHRcdFx0XHR2YWx1ZSA9IGdldF9jdXN0b21fZWxlbWVudF92YWx1ZShwcm9wLCB2YWx1ZSwgcHJvcHNfZGVmaW5pdGlvbik7XG5cdFx0XHRcdHRoaXMuJCRkW3Byb3BdID0gdmFsdWU7XG5cdFx0XHRcdHRoaXMuJCRjPy4kc2V0KHsgW3Byb3BdOiB2YWx1ZSB9KTtcblx0XHRcdH1cblx0XHR9KTtcblx0fSk7XG5cdGFjY2Vzc29ycy5mb3JFYWNoKChhY2Nlc3NvcikgPT4ge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDbGFzcy5wcm90b3R5cGUsIGFjY2Vzc29yLCB7XG5cdFx0XHRnZXQoKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLiQkYz8uW2FjY2Vzc29yXTtcblx0XHRcdH1cblx0XHR9KTtcblx0fSk7XG5cdGlmIChleHRlbmQpIHtcblx0XHQvLyBAdHMtZXhwZWN0LWVycm9yIC0gYXNzaWduaW5nIGhlcmUgaXMgZmluZVxuXHRcdENsYXNzID0gZXh0ZW5kKENsYXNzKTtcblx0fVxuXHRDb21wb25lbnQuZWxlbWVudCA9IC8qKiBAdHlwZSB7YW55fSAqLyAoQ2xhc3MpO1xuXHRyZXR1cm4gQ2xhc3M7XG59XG5cbi8qKlxuICogQmFzZSBjbGFzcyBmb3IgU3ZlbHRlIGNvbXBvbmVudHMuIFVzZWQgd2hlbiBkZXY9ZmFsc2UuXG4gKlxuICogQHRlbXBsYXRlIHtSZWNvcmQ8c3RyaW5nLCBhbnk+fSBbUHJvcHM9YW55XVxuICogQHRlbXBsYXRlIHtSZWNvcmQ8c3RyaW5nLCBhbnk+fSBbRXZlbnRzPWFueV1cbiAqL1xuZXhwb3J0IGNsYXNzIFN2ZWx0ZUNvbXBvbmVudCB7XG5cdC8qKlxuXHQgKiAjIyMgUFJJVkFURSBBUElcblx0ICpcblx0ICogRG8gbm90IHVzZSwgbWF5IGNoYW5nZSBhdCBhbnkgdGltZVxuXHQgKlxuXHQgKiBAdHlwZSB7YW55fVxuXHQgKi9cblx0JCQgPSB1bmRlZmluZWQ7XG5cdC8qKlxuXHQgKiAjIyMgUFJJVkFURSBBUElcblx0ICpcblx0ICogRG8gbm90IHVzZSwgbWF5IGNoYW5nZSBhdCBhbnkgdGltZVxuXHQgKlxuXHQgKiBAdHlwZSB7YW55fVxuXHQgKi9cblx0JCRzZXQgPSB1bmRlZmluZWQ7XG5cblx0LyoqIEByZXR1cm5zIHt2b2lkfSAqL1xuXHQkZGVzdHJveSgpIHtcblx0XHRkZXN0cm95X2NvbXBvbmVudCh0aGlzLCAxKTtcblx0XHR0aGlzLiRkZXN0cm95ID0gbm9vcDtcblx0fVxuXG5cdC8qKlxuXHQgKiBAdGVtcGxhdGUge0V4dHJhY3Q8a2V5b2YgRXZlbnRzLCBzdHJpbmc+fSBLXG5cdCAqIEBwYXJhbSB7S30gdHlwZVxuXHQgKiBAcGFyYW0geygoZTogRXZlbnRzW0tdKSA9PiB2b2lkKSB8IG51bGwgfCB1bmRlZmluZWR9IGNhbGxiYWNrXG5cdCAqIEByZXR1cm5zIHsoKSA9PiB2b2lkfVxuXHQgKi9cblx0JG9uKHR5cGUsIGNhbGxiYWNrKSB7XG5cdFx0aWYgKCFpc19mdW5jdGlvbihjYWxsYmFjaykpIHtcblx0XHRcdHJldHVybiBub29wO1xuXHRcdH1cblx0XHRjb25zdCBjYWxsYmFja3MgPSB0aGlzLiQkLmNhbGxiYWNrc1t0eXBlXSB8fCAodGhpcy4kJC5jYWxsYmFja3NbdHlwZV0gPSBbXSk7XG5cdFx0Y2FsbGJhY2tzLnB1c2goY2FsbGJhY2spO1xuXHRcdHJldHVybiAoKSA9PiB7XG5cdFx0XHRjb25zdCBpbmRleCA9IGNhbGxiYWNrcy5pbmRleE9mKGNhbGxiYWNrKTtcblx0XHRcdGlmIChpbmRleCAhPT0gLTEpIGNhbGxiYWNrcy5zcGxpY2UoaW5kZXgsIDEpO1xuXHRcdH07XG5cdH1cblxuXHQvKipcblx0ICogQHBhcmFtIHtQYXJ0aWFsPFByb3BzPn0gcHJvcHNcblx0ICogQHJldHVybnMge3ZvaWR9XG5cdCAqL1xuXHQkc2V0KHByb3BzKSB7XG5cdFx0aWYgKHRoaXMuJCRzZXQgJiYgIWlzX2VtcHR5KHByb3BzKSkge1xuXHRcdFx0dGhpcy4kJC5za2lwX2JvdW5kID0gdHJ1ZTtcblx0XHRcdHRoaXMuJCRzZXQocHJvcHMpO1xuXHRcdFx0dGhpcy4kJC5za2lwX2JvdW5kID0gZmFsc2U7XG5cdFx0fVxuXHR9XG59XG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gQ3VzdG9tRWxlbWVudFByb3BEZWZpbml0aW9uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gW2F0dHJpYnV0ZV1cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gW3JlZmxlY3RdXG4gKiBAcHJvcGVydHkgeydTdHJpbmcnfCdCb29sZWFuJ3wnTnVtYmVyJ3wnQXJyYXknfCdPYmplY3QnfSBbdHlwZV1cbiAqL1xuIiwgInR5cGUgTGlzdGVuZXIgPSAoKSA9PiB2b2lkXG5cbmV4cG9ydCBjbGFzcyBTdWJzY3JpYmFibGU8VExpc3RlbmVyIGV4dGVuZHMgRnVuY3Rpb24gPSBMaXN0ZW5lcj4ge1xuICBwcm90ZWN0ZWQgbGlzdGVuZXJzOiBTZXQ8eyBsaXN0ZW5lcjogVExpc3RlbmVyIH0+XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5saXN0ZW5lcnMgPSBuZXcgU2V0KClcbiAgICB0aGlzLnN1YnNjcmliZSA9IHRoaXMuc3Vic2NyaWJlLmJpbmQodGhpcylcbiAgfVxuXG4gIHN1YnNjcmliZShsaXN0ZW5lcjogVExpc3RlbmVyKTogKCkgPT4gdm9pZCB7XG4gICAgY29uc3QgaWRlbnRpdHkgPSB7IGxpc3RlbmVyIH1cbiAgICB0aGlzLmxpc3RlbmVycy5hZGQoaWRlbnRpdHkpXG5cbiAgICB0aGlzLm9uU3Vic2NyaWJlKClcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB0aGlzLmxpc3RlbmVycy5kZWxldGUoaWRlbnRpdHkpXG4gICAgICB0aGlzLm9uVW5zdWJzY3JpYmUoKVxuICAgIH1cbiAgfVxuXG4gIGhhc0xpc3RlbmVycygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5saXN0ZW5lcnMuc2l6ZSA+IDBcbiAgfVxuXG4gIHByb3RlY3RlZCBvblN1YnNjcmliZSgpOiB2b2lkIHtcbiAgICAvLyBEbyBub3RoaW5nXG4gIH1cblxuICBwcm90ZWN0ZWQgb25VbnN1YnNjcmliZSgpOiB2b2lkIHtcbiAgICAvLyBEbyBub3RoaW5nXG4gIH1cbn1cbiIsICJpbXBvcnQgdHlwZSB7IE11dGF0aW9uIH0gZnJvbSAnLi9tdXRhdGlvbidcbmltcG9ydCB0eXBlIHsgUXVlcnkgfSBmcm9tICcuL3F1ZXJ5J1xuaW1wb3J0IHR5cGUge1xuICBGZXRjaFN0YXR1cyxcbiAgTXV0YXRpb25GdW5jdGlvbixcbiAgTXV0YXRpb25LZXksXG4gIE11dGF0aW9uT3B0aW9ucyxcbiAgUXVlcnlGdW5jdGlvbixcbiAgUXVlcnlLZXksXG4gIFF1ZXJ5T3B0aW9ucyxcbn0gZnJvbSAnLi90eXBlcydcblxuLy8gVFlQRVNcblxuZXhwb3J0IGludGVyZmFjZSBRdWVyeUZpbHRlcnMge1xuICAvKipcbiAgICogRmlsdGVyIHRvIGFjdGl2ZSBxdWVyaWVzLCBpbmFjdGl2ZSBxdWVyaWVzIG9yIGFsbCBxdWVyaWVzXG4gICAqL1xuICB0eXBlPzogUXVlcnlUeXBlRmlsdGVyXG4gIC8qKlxuICAgKiBNYXRjaCBxdWVyeSBrZXkgZXhhY3RseVxuICAgKi9cbiAgZXhhY3Q/OiBib29sZWFuXG4gIC8qKlxuICAgKiBJbmNsdWRlIHF1ZXJpZXMgbWF0Y2hpbmcgdGhpcyBwcmVkaWNhdGUgZnVuY3Rpb25cbiAgICovXG4gIHByZWRpY2F0ZT86IChxdWVyeTogUXVlcnkpID0+IGJvb2xlYW5cbiAgLyoqXG4gICAqIEluY2x1ZGUgcXVlcmllcyBtYXRjaGluZyB0aGlzIHF1ZXJ5IGtleVxuICAgKi9cbiAgcXVlcnlLZXk/OiBRdWVyeUtleVxuICAvKipcbiAgICogSW5jbHVkZSBvciBleGNsdWRlIHN0YWxlIHF1ZXJpZXNcbiAgICovXG4gIHN0YWxlPzogYm9vbGVhblxuICAvKipcbiAgICogSW5jbHVkZSBxdWVyaWVzIG1hdGNoaW5nIHRoZWlyIGZldGNoU3RhdHVzXG4gICAqL1xuICBmZXRjaFN0YXR1cz86IEZldGNoU3RhdHVzXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTXV0YXRpb25GaWx0ZXJzIHtcbiAgLyoqXG4gICAqIE1hdGNoIG11dGF0aW9uIGtleSBleGFjdGx5XG4gICAqL1xuICBleGFjdD86IGJvb2xlYW5cbiAgLyoqXG4gICAqIEluY2x1ZGUgbXV0YXRpb25zIG1hdGNoaW5nIHRoaXMgcHJlZGljYXRlIGZ1bmN0aW9uXG4gICAqL1xuICBwcmVkaWNhdGU/OiAobXV0YXRpb246IE11dGF0aW9uPGFueSwgYW55LCBhbnk+KSA9PiBib29sZWFuXG4gIC8qKlxuICAgKiBJbmNsdWRlIG11dGF0aW9ucyBtYXRjaGluZyB0aGlzIG11dGF0aW9uIGtleVxuICAgKi9cbiAgbXV0YXRpb25LZXk/OiBNdXRhdGlvbktleVxuICAvKipcbiAgICogSW5jbHVkZSBvciBleGNsdWRlIGZldGNoaW5nIG11dGF0aW9uc1xuICAgKi9cbiAgZmV0Y2hpbmc/OiBib29sZWFuXG59XG5cbmV4cG9ydCB0eXBlIERhdGFVcGRhdGVGdW5jdGlvbjxUSW5wdXQsIFRPdXRwdXQ+ID0gKGlucHV0OiBUSW5wdXQpID0+IFRPdXRwdXRcblxuZXhwb3J0IHR5cGUgVXBkYXRlcjxUSW5wdXQsIFRPdXRwdXQ+ID1cbiAgfCBUT3V0cHV0XG4gIHwgRGF0YVVwZGF0ZUZ1bmN0aW9uPFRJbnB1dCwgVE91dHB1dD5cblxuZXhwb3J0IHR5cGUgUXVlcnlUeXBlRmlsdGVyID0gJ2FsbCcgfCAnYWN0aXZlJyB8ICdpbmFjdGl2ZSdcblxuLy8gVVRJTFNcblxuZXhwb3J0IGNvbnN0IGlzU2VydmVyID0gdHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgfHwgJ0Rlbm8nIGluIHdpbmRvd1xuXG5leHBvcnQgZnVuY3Rpb24gbm9vcCgpOiB1bmRlZmluZWQge1xuICByZXR1cm4gdW5kZWZpbmVkXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmdW5jdGlvbmFsVXBkYXRlPFRJbnB1dCwgVE91dHB1dD4oXG4gIHVwZGF0ZXI6IFVwZGF0ZXI8VElucHV0LCBUT3V0cHV0PixcbiAgaW5wdXQ6IFRJbnB1dCxcbik6IFRPdXRwdXQge1xuICByZXR1cm4gdHlwZW9mIHVwZGF0ZXIgPT09ICdmdW5jdGlvbidcbiAgICA/ICh1cGRhdGVyIGFzIERhdGFVcGRhdGVGdW5jdGlvbjxUSW5wdXQsIFRPdXRwdXQ+KShpbnB1dClcbiAgICA6IHVwZGF0ZXJcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzVmFsaWRUaW1lb3V0KHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgbnVtYmVyIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgJiYgdmFsdWUgPj0gMCAmJiB2YWx1ZSAhPT0gSW5maW5pdHlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRpZmZlcmVuY2U8VD4oYXJyYXkxOiBUW10sIGFycmF5MjogVFtdKTogVFtdIHtcbiAgcmV0dXJuIGFycmF5MS5maWx0ZXIoKHgpID0+ICFhcnJheTIuaW5jbHVkZXMoeCkpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXBsYWNlQXQ8VD4oYXJyYXk6IFRbXSwgaW5kZXg6IG51bWJlciwgdmFsdWU6IFQpOiBUW10ge1xuICBjb25zdCBjb3B5ID0gYXJyYXkuc2xpY2UoMClcbiAgY29weVtpbmRleF0gPSB2YWx1ZVxuICByZXR1cm4gY29weVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdGltZVVudGlsU3RhbGUodXBkYXRlZEF0OiBudW1iZXIsIHN0YWxlVGltZT86IG51bWJlcik6IG51bWJlciB7XG4gIHJldHVybiBNYXRoLm1heCh1cGRhdGVkQXQgKyAoc3RhbGVUaW1lIHx8IDApIC0gRGF0ZS5ub3coKSwgMClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlUXVlcnlBcmdzPFxuICBUT3B0aW9ucyBleHRlbmRzIFF1ZXJ5T3B0aW9uczxhbnksIGFueSwgYW55LCBUUXVlcnlLZXk+LFxuICBUUXVlcnlLZXkgZXh0ZW5kcyBRdWVyeUtleSA9IFF1ZXJ5S2V5LFxuPihcbiAgYXJnMTogVFF1ZXJ5S2V5IHwgVE9wdGlvbnMsXG4gIGFyZzI/OiBRdWVyeUZ1bmN0aW9uPGFueSwgVFF1ZXJ5S2V5PiB8IFRPcHRpb25zLFxuICBhcmczPzogVE9wdGlvbnMsXG4pOiBUT3B0aW9ucyB7XG4gIGlmICghaXNRdWVyeUtleShhcmcxKSkge1xuICAgIHJldHVybiBhcmcxIGFzIFRPcHRpb25zXG4gIH1cblxuICBpZiAodHlwZW9mIGFyZzIgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4geyAuLi5hcmczLCBxdWVyeUtleTogYXJnMSwgcXVlcnlGbjogYXJnMiB9IGFzIFRPcHRpb25zXG4gIH1cblxuICByZXR1cm4geyAuLi5hcmcyLCBxdWVyeUtleTogYXJnMSB9IGFzIFRPcHRpb25zXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZU11dGF0aW9uQXJnczxcbiAgVE9wdGlvbnMgZXh0ZW5kcyBNdXRhdGlvbk9wdGlvbnM8YW55LCBhbnksIGFueSwgYW55Pixcbj4oXG4gIGFyZzE6IE11dGF0aW9uS2V5IHwgTXV0YXRpb25GdW5jdGlvbjxhbnksIGFueT4gfCBUT3B0aW9ucyxcbiAgYXJnMj86IE11dGF0aW9uRnVuY3Rpb248YW55LCBhbnk+IHwgVE9wdGlvbnMsXG4gIGFyZzM/OiBUT3B0aW9ucyxcbik6IFRPcHRpb25zIHtcbiAgaWYgKGlzUXVlcnlLZXkoYXJnMSkpIHtcbiAgICBpZiAodHlwZW9mIGFyZzIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiB7IC4uLmFyZzMsIG11dGF0aW9uS2V5OiBhcmcxLCBtdXRhdGlvbkZuOiBhcmcyIH0gYXMgVE9wdGlvbnNcbiAgICB9XG4gICAgcmV0dXJuIHsgLi4uYXJnMiwgbXV0YXRpb25LZXk6IGFyZzEgfSBhcyBUT3B0aW9uc1xuICB9XG5cbiAgaWYgKHR5cGVvZiBhcmcxID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIHsgLi4uYXJnMiwgbXV0YXRpb25GbjogYXJnMSB9IGFzIFRPcHRpb25zXG4gIH1cblxuICByZXR1cm4geyAuLi5hcmcxIH0gYXMgVE9wdGlvbnNcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlRmlsdGVyQXJnczxcbiAgVEZpbHRlcnMgZXh0ZW5kcyBRdWVyeUZpbHRlcnMsXG4gIFRPcHRpb25zID0gdW5rbm93bixcbj4oXG4gIGFyZzE/OiBRdWVyeUtleSB8IFRGaWx0ZXJzLFxuICBhcmcyPzogVEZpbHRlcnMgfCBUT3B0aW9ucyxcbiAgYXJnMz86IFRPcHRpb25zLFxuKTogW1RGaWx0ZXJzLCBUT3B0aW9ucyB8IHVuZGVmaW5lZF0ge1xuICByZXR1cm4gKFxuICAgIGlzUXVlcnlLZXkoYXJnMSkgPyBbeyAuLi5hcmcyLCBxdWVyeUtleTogYXJnMSB9LCBhcmczXSA6IFthcmcxIHx8IHt9LCBhcmcyXVxuICApIGFzIFtURmlsdGVycywgVE9wdGlvbnNdXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZU11dGF0aW9uRmlsdGVyQXJnczxcbiAgVEZpbHRlcnMgZXh0ZW5kcyBNdXRhdGlvbkZpbHRlcnMsXG4gIFRPcHRpb25zID0gdW5rbm93bixcbj4oXG4gIGFyZzE/OiBRdWVyeUtleSB8IFRGaWx0ZXJzLFxuICBhcmcyPzogVEZpbHRlcnMgfCBUT3B0aW9ucyxcbiAgYXJnMz86IFRPcHRpb25zLFxuKTogW1RGaWx0ZXJzLCBUT3B0aW9ucyB8IHVuZGVmaW5lZF0ge1xuICByZXR1cm4gKFxuICAgIGlzUXVlcnlLZXkoYXJnMSlcbiAgICAgID8gW3sgLi4uYXJnMiwgbXV0YXRpb25LZXk6IGFyZzEgfSwgYXJnM11cbiAgICAgIDogW2FyZzEgfHwge30sIGFyZzJdXG4gICkgYXMgW1RGaWx0ZXJzLCBUT3B0aW9uc11cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1hdGNoUXVlcnkoXG4gIGZpbHRlcnM6IFF1ZXJ5RmlsdGVycyxcbiAgcXVlcnk6IFF1ZXJ5PGFueSwgYW55LCBhbnksIGFueT4sXG4pOiBib29sZWFuIHtcbiAgY29uc3Qge1xuICAgIHR5cGUgPSAnYWxsJyxcbiAgICBleGFjdCxcbiAgICBmZXRjaFN0YXR1cyxcbiAgICBwcmVkaWNhdGUsXG4gICAgcXVlcnlLZXksXG4gICAgc3RhbGUsXG4gIH0gPSBmaWx0ZXJzXG5cbiAgaWYgKGlzUXVlcnlLZXkocXVlcnlLZXkpKSB7XG4gICAgaWYgKGV4YWN0KSB7XG4gICAgICBpZiAocXVlcnkucXVlcnlIYXNoICE9PSBoYXNoUXVlcnlLZXlCeU9wdGlvbnMocXVlcnlLZXksIHF1ZXJ5Lm9wdGlvbnMpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIXBhcnRpYWxNYXRjaEtleShxdWVyeS5xdWVyeUtleSwgcXVlcnlLZXkpKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gIH1cblxuICBpZiAodHlwZSAhPT0gJ2FsbCcpIHtcbiAgICBjb25zdCBpc0FjdGl2ZSA9IHF1ZXJ5LmlzQWN0aXZlKClcbiAgICBpZiAodHlwZSA9PT0gJ2FjdGl2ZScgJiYgIWlzQWN0aXZlKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgaWYgKHR5cGUgPT09ICdpbmFjdGl2ZScgJiYgaXNBY3RpdmUpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgfVxuXG4gIGlmICh0eXBlb2Ygc3RhbGUgPT09ICdib29sZWFuJyAmJiBxdWVyeS5pc1N0YWxlKCkgIT09IHN0YWxlKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBpZiAoXG4gICAgdHlwZW9mIGZldGNoU3RhdHVzICE9PSAndW5kZWZpbmVkJyAmJlxuICAgIGZldGNoU3RhdHVzICE9PSBxdWVyeS5zdGF0ZS5mZXRjaFN0YXR1c1xuICApIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIGlmIChwcmVkaWNhdGUgJiYgIXByZWRpY2F0ZShxdWVyeSkpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIHJldHVybiB0cnVlXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYXRjaE11dGF0aW9uKFxuICBmaWx0ZXJzOiBNdXRhdGlvbkZpbHRlcnMsXG4gIG11dGF0aW9uOiBNdXRhdGlvbjxhbnksIGFueT4sXG4pOiBib29sZWFuIHtcbiAgY29uc3QgeyBleGFjdCwgZmV0Y2hpbmcsIHByZWRpY2F0ZSwgbXV0YXRpb25LZXkgfSA9IGZpbHRlcnNcbiAgaWYgKGlzUXVlcnlLZXkobXV0YXRpb25LZXkpKSB7XG4gICAgaWYgKCFtdXRhdGlvbi5vcHRpb25zLm11dGF0aW9uS2V5KSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgaWYgKGV4YWN0KSB7XG4gICAgICBpZiAoXG4gICAgICAgIGhhc2hRdWVyeUtleShtdXRhdGlvbi5vcHRpb25zLm11dGF0aW9uS2V5KSAhPT0gaGFzaFF1ZXJ5S2V5KG11dGF0aW9uS2V5KVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIXBhcnRpYWxNYXRjaEtleShtdXRhdGlvbi5vcHRpb25zLm11dGF0aW9uS2V5LCBtdXRhdGlvbktleSkpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgfVxuXG4gIGlmIChcbiAgICB0eXBlb2YgZmV0Y2hpbmcgPT09ICdib29sZWFuJyAmJlxuICAgIChtdXRhdGlvbi5zdGF0ZS5zdGF0dXMgPT09ICdsb2FkaW5nJykgIT09IGZldGNoaW5nXG4gICkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgaWYgKHByZWRpY2F0ZSAmJiAhcHJlZGljYXRlKG11dGF0aW9uKSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgcmV0dXJuIHRydWVcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhhc2hRdWVyeUtleUJ5T3B0aW9uczxUUXVlcnlLZXkgZXh0ZW5kcyBRdWVyeUtleSA9IFF1ZXJ5S2V5PihcbiAgcXVlcnlLZXk6IFRRdWVyeUtleSxcbiAgb3B0aW9ucz86IFF1ZXJ5T3B0aW9uczxhbnksIGFueSwgYW55LCBUUXVlcnlLZXk+LFxuKTogc3RyaW5nIHtcbiAgY29uc3QgaGFzaEZuID0gb3B0aW9ucz8ucXVlcnlLZXlIYXNoRm4gfHwgaGFzaFF1ZXJ5S2V5XG4gIHJldHVybiBoYXNoRm4ocXVlcnlLZXkpXG59XG5cbi8qKlxuICogRGVmYXVsdCBxdWVyeSBrZXlzIGhhc2ggZnVuY3Rpb24uXG4gKiBIYXNoZXMgdGhlIHZhbHVlIGludG8gYSBzdGFibGUgaGFzaC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhhc2hRdWVyeUtleShxdWVyeUtleTogUXVlcnlLZXkpOiBzdHJpbmcge1xuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkocXVlcnlLZXksIChfLCB2YWwpID0+XG4gICAgaXNQbGFpbk9iamVjdCh2YWwpXG4gICAgICA/IE9iamVjdC5rZXlzKHZhbClcbiAgICAgICAgICAuc29ydCgpXG4gICAgICAgICAgLnJlZHVjZSgocmVzdWx0LCBrZXkpID0+IHtcbiAgICAgICAgICAgIHJlc3VsdFtrZXldID0gdmFsW2tleV1cbiAgICAgICAgICAgIHJldHVybiByZXN1bHRcbiAgICAgICAgICB9LCB7fSBhcyBhbnkpXG4gICAgICA6IHZhbCxcbiAgKVxufVxuXG4vKipcbiAqIENoZWNrcyBpZiBrZXkgYGJgIHBhcnRpYWxseSBtYXRjaGVzIHdpdGgga2V5IGBhYC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnRpYWxNYXRjaEtleShhOiBRdWVyeUtleSwgYjogUXVlcnlLZXkpOiBib29sZWFuIHtcbiAgcmV0dXJuIHBhcnRpYWxEZWVwRXF1YWwoYSwgYilcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYGJgIHBhcnRpYWxseSBtYXRjaGVzIHdpdGggYGFgLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFydGlhbERlZXBFcXVhbChhOiBhbnksIGI6IGFueSk6IGJvb2xlYW4ge1xuICBpZiAoYSA9PT0gYikge1xuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBpZiAodHlwZW9mIGEgIT09IHR5cGVvZiBiKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBpZiAoYSAmJiBiICYmIHR5cGVvZiBhID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgYiA9PT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gIU9iamVjdC5rZXlzKGIpLnNvbWUoKGtleSkgPT4gIXBhcnRpYWxEZWVwRXF1YWwoYVtrZXldLCBiW2tleV0pKVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlXG59XG5cbi8qKlxuICogVGhpcyBmdW5jdGlvbiByZXR1cm5zIGBhYCBpZiBgYmAgaXMgZGVlcGx5IGVxdWFsLlxuICogSWYgbm90LCBpdCB3aWxsIHJlcGxhY2UgYW55IGRlZXBseSBlcXVhbCBjaGlsZHJlbiBvZiBgYmAgd2l0aCB0aG9zZSBvZiBgYWAuXG4gKiBUaGlzIGNhbiBiZSB1c2VkIGZvciBzdHJ1Y3R1cmFsIHNoYXJpbmcgYmV0d2VlbiBKU09OIHZhbHVlcyBmb3IgZXhhbXBsZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlcGxhY2VFcXVhbERlZXA8VD4oYTogdW5rbm93biwgYjogVCk6IFRcbmV4cG9ydCBmdW5jdGlvbiByZXBsYWNlRXF1YWxEZWVwKGE6IGFueSwgYjogYW55KTogYW55IHtcbiAgaWYgKGEgPT09IGIpIHtcbiAgICByZXR1cm4gYVxuICB9XG5cbiAgY29uc3QgYXJyYXkgPSBpc1BsYWluQXJyYXkoYSkgJiYgaXNQbGFpbkFycmF5KGIpXG5cbiAgaWYgKGFycmF5IHx8IChpc1BsYWluT2JqZWN0KGEpICYmIGlzUGxhaW5PYmplY3QoYikpKSB7XG4gICAgY29uc3QgYVNpemUgPSBhcnJheSA/IGEubGVuZ3RoIDogT2JqZWN0LmtleXMoYSkubGVuZ3RoXG4gICAgY29uc3QgYkl0ZW1zID0gYXJyYXkgPyBiIDogT2JqZWN0LmtleXMoYilcbiAgICBjb25zdCBiU2l6ZSA9IGJJdGVtcy5sZW5ndGhcbiAgICBjb25zdCBjb3B5OiBhbnkgPSBhcnJheSA/IFtdIDoge31cblxuICAgIGxldCBlcXVhbEl0ZW1zID0gMFxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBiU2l6ZTsgaSsrKSB7XG4gICAgICBjb25zdCBrZXkgPSBhcnJheSA/IGkgOiBiSXRlbXNbaV1cbiAgICAgIGNvcHlba2V5XSA9IHJlcGxhY2VFcXVhbERlZXAoYVtrZXldLCBiW2tleV0pXG4gICAgICBpZiAoY29weVtrZXldID09PSBhW2tleV0pIHtcbiAgICAgICAgZXF1YWxJdGVtcysrXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGFTaXplID09PSBiU2l6ZSAmJiBlcXVhbEl0ZW1zID09PSBhU2l6ZSA/IGEgOiBjb3B5XG4gIH1cblxuICByZXR1cm4gYlxufVxuXG4vKipcbiAqIFNoYWxsb3cgY29tcGFyZSBvYmplY3RzLiBPbmx5IHdvcmtzIHdpdGggb2JqZWN0cyB0aGF0IGFsd2F5cyBoYXZlIHRoZSBzYW1lIHByb3BlcnRpZXMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzaGFsbG93RXF1YWxPYmplY3RzPFQ+KGE6IFQsIGI6IFQpOiBib29sZWFuIHtcbiAgaWYgKChhICYmICFiKSB8fCAoYiAmJiAhYSkpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIGZvciAoY29uc3Qga2V5IGluIGEpIHtcbiAgICBpZiAoYVtrZXldICE9PSBiW2tleV0pIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1BsYWluQXJyYXkodmFsdWU6IHVua25vd24pIHtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkodmFsdWUpICYmIHZhbHVlLmxlbmd0aCA9PT0gT2JqZWN0LmtleXModmFsdWUpLmxlbmd0aFxufVxuXG4vLyBDb3BpZWQgZnJvbTogaHR0cHM6Ly9naXRodWIuY29tL2pvbnNjaGxpbmtlcnQvaXMtcGxhaW4tb2JqZWN0XG5leHBvcnQgZnVuY3Rpb24gaXNQbGFpbk9iamVjdChvOiBhbnkpOiBvIGlzIE9iamVjdCB7XG4gIGlmICghaGFzT2JqZWN0UHJvdG90eXBlKG8pKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICAvLyBJZiBoYXMgbW9kaWZpZWQgY29uc3RydWN0b3JcbiAgY29uc3QgY3RvciA9IG8uY29uc3RydWN0b3JcbiAgaWYgKHR5cGVvZiBjdG9yID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICAvLyBJZiBoYXMgbW9kaWZpZWQgcHJvdG90eXBlXG4gIGNvbnN0IHByb3QgPSBjdG9yLnByb3RvdHlwZVxuICBpZiAoIWhhc09iamVjdFByb3RvdHlwZShwcm90KSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgLy8gSWYgY29uc3RydWN0b3IgZG9lcyBub3QgaGF2ZSBhbiBPYmplY3Qtc3BlY2lmaWMgbWV0aG9kXG4gIGlmICghcHJvdC5oYXNPd25Qcm9wZXJ0eSgnaXNQcm90b3R5cGVPZicpKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICAvLyBNb3N0IGxpa2VseSBhIHBsYWluIE9iamVjdFxuICByZXR1cm4gdHJ1ZVxufVxuXG5mdW5jdGlvbiBoYXNPYmplY3RQcm90b3R5cGUobzogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykgPT09ICdbb2JqZWN0IE9iamVjdF0nXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1F1ZXJ5S2V5KHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgUXVlcnlLZXkge1xuICByZXR1cm4gQXJyYXkuaXNBcnJheSh2YWx1ZSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRXJyb3IodmFsdWU6IGFueSk6IHZhbHVlIGlzIEVycm9yIHtcbiAgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgRXJyb3Jcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNsZWVwKHRpbWVvdXQ6IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICBzZXRUaW1lb3V0KHJlc29sdmUsIHRpbWVvdXQpXG4gIH0pXG59XG5cbi8qKlxuICogU2NoZWR1bGVzIGEgbWljcm90YXNrLlxuICogVGhpcyBjYW4gYmUgdXNlZnVsIHRvIHNjaGVkdWxlIHN0YXRlIHVwZGF0ZXMgYWZ0ZXIgcmVuZGVyaW5nLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2NoZWR1bGVNaWNyb3Rhc2soY2FsbGJhY2s6ICgpID0+IHZvaWQpIHtcbiAgc2xlZXAoMCkudGhlbihjYWxsYmFjaylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEFib3J0Q29udHJvbGxlcigpOiBBYm9ydENvbnRyb2xsZXIgfCB1bmRlZmluZWQge1xuICBpZiAodHlwZW9mIEFib3J0Q29udHJvbGxlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBuZXcgQWJvcnRDb250cm9sbGVyKClcbiAgfVxuICByZXR1cm5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlcGxhY2VEYXRhPFxuICBURGF0YSxcbiAgVE9wdGlvbnMgZXh0ZW5kcyBRdWVyeU9wdGlvbnM8YW55LCBhbnksIGFueSwgYW55Pixcbj4ocHJldkRhdGE6IFREYXRhIHwgdW5kZWZpbmVkLCBkYXRhOiBURGF0YSwgb3B0aW9uczogVE9wdGlvbnMpOiBURGF0YSB7XG4gIC8vIFVzZSBwcmV2IGRhdGEgaWYgYW4gaXNEYXRhRXF1YWwgZnVuY3Rpb24gaXMgZGVmaW5lZCBhbmQgcmV0dXJucyBgdHJ1ZWBcbiAgaWYgKG9wdGlvbnMuaXNEYXRhRXF1YWw/LihwcmV2RGF0YSwgZGF0YSkpIHtcbiAgICByZXR1cm4gcHJldkRhdGEgYXMgVERhdGFcbiAgfSBlbHNlIGlmICh0eXBlb2Ygb3B0aW9ucy5zdHJ1Y3R1cmFsU2hhcmluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBvcHRpb25zLnN0cnVjdHVyYWxTaGFyaW5nKHByZXZEYXRhLCBkYXRhKVxuICB9IGVsc2UgaWYgKG9wdGlvbnMuc3RydWN0dXJhbFNoYXJpbmcgIT09IGZhbHNlKSB7XG4gICAgLy8gU3RydWN0dXJhbGx5IHNoYXJlIGRhdGEgYmV0d2VlbiBwcmV2IGFuZCBuZXcgZGF0YSBpZiBuZWVkZWRcbiAgICByZXR1cm4gcmVwbGFjZUVxdWFsRGVlcChwcmV2RGF0YSwgZGF0YSlcbiAgfVxuICByZXR1cm4gZGF0YVxufVxuIiwgImltcG9ydCB7IFN1YnNjcmliYWJsZSB9IGZyb20gJy4vc3Vic2NyaWJhYmxlJ1xuaW1wb3J0IHsgaXNTZXJ2ZXIgfSBmcm9tICcuL3V0aWxzJ1xuXG50eXBlIFNldHVwRm4gPSAoXG4gIHNldEZvY3VzZWQ6IChmb2N1c2VkPzogYm9vbGVhbikgPT4gdm9pZCxcbikgPT4gKCgpID0+IHZvaWQpIHwgdW5kZWZpbmVkXG5cbmV4cG9ydCBjbGFzcyBGb2N1c01hbmFnZXIgZXh0ZW5kcyBTdWJzY3JpYmFibGUge1xuICBwcml2YXRlIGZvY3VzZWQ/OiBib29sZWFuXG4gIHByaXZhdGUgY2xlYW51cD86ICgpID0+IHZvaWRcblxuICBwcml2YXRlIHNldHVwOiBTZXR1cEZuXG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMuc2V0dXAgPSAob25Gb2N1cykgPT4ge1xuICAgICAgLy8gYWRkRXZlbnRMaXN0ZW5lciBkb2VzIG5vdCBleGlzdCBpbiBSZWFjdCBOYXRpdmUsIGJ1dCB3aW5kb3cgZG9lc1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bm5lY2Vzc2FyeS1jb25kaXRpb25cbiAgICAgIGlmICghaXNTZXJ2ZXIgJiYgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgY29uc3QgbGlzdGVuZXIgPSAoKSA9PiBvbkZvY3VzKClcbiAgICAgICAgLy8gTGlzdGVuIHRvIHZpc2liaWxsaXR5Y2hhbmdlIGFuZCBmb2N1c1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndmlzaWJpbGl0eWNoYW5nZScsIGxpc3RlbmVyLCBmYWxzZSlcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgbGlzdGVuZXIsIGZhbHNlKVxuXG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgLy8gQmUgc3VyZSB0byB1bnN1YnNjcmliZSBpZiBhIG5ldyBoYW5kbGVyIGlzIHNldFxuICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCd2aXNpYmlsaXR5Y2hhbmdlJywgbGlzdGVuZXIpXG4gICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgbGlzdGVuZXIpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVyblxuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBvblN1YnNjcmliZSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuY2xlYW51cCkge1xuICAgICAgdGhpcy5zZXRFdmVudExpc3RlbmVyKHRoaXMuc2V0dXApXG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIG9uVW5zdWJzY3JpYmUoKSB7XG4gICAgaWYgKCF0aGlzLmhhc0xpc3RlbmVycygpKSB7XG4gICAgICB0aGlzLmNsZWFudXA/LigpXG4gICAgICB0aGlzLmNsZWFudXAgPSB1bmRlZmluZWRcbiAgICB9XG4gIH1cblxuICBzZXRFdmVudExpc3RlbmVyKHNldHVwOiBTZXR1cEZuKTogdm9pZCB7XG4gICAgdGhpcy5zZXR1cCA9IHNldHVwXG4gICAgdGhpcy5jbGVhbnVwPy4oKVxuICAgIHRoaXMuY2xlYW51cCA9IHNldHVwKChmb2N1c2VkKSA9PiB7XG4gICAgICBpZiAodHlwZW9mIGZvY3VzZWQgPT09ICdib29sZWFuJykge1xuICAgICAgICB0aGlzLnNldEZvY3VzZWQoZm9jdXNlZClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMub25Gb2N1cygpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHNldEZvY3VzZWQoZm9jdXNlZD86IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBjb25zdCBjaGFuZ2VkID0gdGhpcy5mb2N1c2VkICE9PSBmb2N1c2VkXG4gICAgaWYgKGNoYW5nZWQpIHtcbiAgICAgIHRoaXMuZm9jdXNlZCA9IGZvY3VzZWRcbiAgICAgIHRoaXMub25Gb2N1cygpXG4gICAgfVxuICB9XG5cbiAgb25Gb2N1cygpOiB2b2lkIHtcbiAgICB0aGlzLmxpc3RlbmVycy5mb3JFYWNoKCh7IGxpc3RlbmVyIH0pID0+IHtcbiAgICAgIGxpc3RlbmVyKClcbiAgICB9KVxuICB9XG5cbiAgaXNGb2N1c2VkKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0eXBlb2YgdGhpcy5mb2N1c2VkID09PSAnYm9vbGVhbicpIHtcbiAgICAgIHJldHVybiB0aGlzLmZvY3VzZWRcbiAgICB9XG5cbiAgICAvLyBkb2N1bWVudCBnbG9iYWwgY2FuIGJlIHVuYXZhaWxhYmxlIGluIHJlYWN0IG5hdGl2ZVxuICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cblxuICAgIHJldHVybiBbdW5kZWZpbmVkLCAndmlzaWJsZScsICdwcmVyZW5kZXInXS5pbmNsdWRlcyhcbiAgICAgIGRvY3VtZW50LnZpc2liaWxpdHlTdGF0ZSxcbiAgICApXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGZvY3VzTWFuYWdlciA9IG5ldyBGb2N1c01hbmFnZXIoKVxuIiwgImltcG9ydCB7IFN1YnNjcmliYWJsZSB9IGZyb20gJy4vc3Vic2NyaWJhYmxlJ1xuaW1wb3J0IHsgaXNTZXJ2ZXIgfSBmcm9tICcuL3V0aWxzJ1xuXG50eXBlIFNldHVwRm4gPSAoXG4gIHNldE9ubGluZTogKG9ubGluZT86IGJvb2xlYW4pID0+IHZvaWQsXG4pID0+ICgoKSA9PiB2b2lkKSB8IHVuZGVmaW5lZFxuXG5jb25zdCBvbmxpbmVFdmVudHMgPSBbJ29ubGluZScsICdvZmZsaW5lJ10gYXMgY29uc3RcblxuZXhwb3J0IGNsYXNzIE9ubGluZU1hbmFnZXIgZXh0ZW5kcyBTdWJzY3JpYmFibGUge1xuICBwcml2YXRlIG9ubGluZT86IGJvb2xlYW5cbiAgcHJpdmF0ZSBjbGVhbnVwPzogKCkgPT4gdm9pZFxuXG4gIHByaXZhdGUgc2V0dXA6IFNldHVwRm5cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpXG4gICAgdGhpcy5zZXR1cCA9IChvbk9ubGluZSkgPT4ge1xuICAgICAgLy8gYWRkRXZlbnRMaXN0ZW5lciBkb2VzIG5vdCBleGlzdCBpbiBSZWFjdCBOYXRpdmUsIGJ1dCB3aW5kb3cgZG9lc1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bm5lY2Vzc2FyeS1jb25kaXRpb25cbiAgICAgIGlmICghaXNTZXJ2ZXIgJiYgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgY29uc3QgbGlzdGVuZXIgPSAoKSA9PiBvbk9ubGluZSgpXG4gICAgICAgIC8vIExpc3RlbiB0byBvbmxpbmVcbiAgICAgICAgb25saW5lRXZlbnRzLmZvckVhY2goKGV2ZW50KSA9PiB7XG4gICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVyLCBmYWxzZSlcbiAgICAgICAgfSlcblxuICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgIC8vIEJlIHN1cmUgdG8gdW5zdWJzY3JpYmUgaWYgYSBuZXcgaGFuZGxlciBpcyBzZXRcbiAgICAgICAgICBvbmxpbmVFdmVudHMuZm9yRWFjaCgoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBsaXN0ZW5lcilcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVyblxuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBvblN1YnNjcmliZSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuY2xlYW51cCkge1xuICAgICAgdGhpcy5zZXRFdmVudExpc3RlbmVyKHRoaXMuc2V0dXApXG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIG9uVW5zdWJzY3JpYmUoKSB7XG4gICAgaWYgKCF0aGlzLmhhc0xpc3RlbmVycygpKSB7XG4gICAgICB0aGlzLmNsZWFudXA/LigpXG4gICAgICB0aGlzLmNsZWFudXAgPSB1bmRlZmluZWRcbiAgICB9XG4gIH1cblxuICBzZXRFdmVudExpc3RlbmVyKHNldHVwOiBTZXR1cEZuKTogdm9pZCB7XG4gICAgdGhpcy5zZXR1cCA9IHNldHVwXG4gICAgdGhpcy5jbGVhbnVwPy4oKVxuICAgIHRoaXMuY2xlYW51cCA9IHNldHVwKChvbmxpbmU/OiBib29sZWFuKSA9PiB7XG4gICAgICBpZiAodHlwZW9mIG9ubGluZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgIHRoaXMuc2V0T25saW5lKG9ubGluZSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMub25PbmxpbmUoKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBzZXRPbmxpbmUob25saW5lPzogYm9vbGVhbik6IHZvaWQge1xuICAgIGNvbnN0IGNoYW5nZWQgPSB0aGlzLm9ubGluZSAhPT0gb25saW5lXG5cbiAgICBpZiAoY2hhbmdlZCkge1xuICAgICAgdGhpcy5vbmxpbmUgPSBvbmxpbmVcbiAgICAgIHRoaXMub25PbmxpbmUoKVxuICAgIH1cbiAgfVxuXG4gIG9uT25saW5lKCk6IHZvaWQge1xuICAgIHRoaXMubGlzdGVuZXJzLmZvckVhY2goKHsgbGlzdGVuZXIgfSkgPT4ge1xuICAgICAgbGlzdGVuZXIoKVxuICAgIH0pXG4gIH1cblxuICBpc09ubGluZSgpOiBib29sZWFuIHtcbiAgICBpZiAodHlwZW9mIHRoaXMub25saW5lID09PSAnYm9vbGVhbicpIHtcbiAgICAgIHJldHVybiB0aGlzLm9ubGluZVxuICAgIH1cblxuICAgIGlmIChcbiAgICAgIHR5cGVvZiBuYXZpZ2F0b3IgPT09ICd1bmRlZmluZWQnIHx8XG4gICAgICB0eXBlb2YgbmF2aWdhdG9yLm9uTGluZSA9PT0gJ3VuZGVmaW5lZCdcbiAgICApIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuXG4gICAgcmV0dXJuIG5hdmlnYXRvci5vbkxpbmVcbiAgfVxufVxuXG5leHBvcnQgY29uc3Qgb25saW5lTWFuYWdlciA9IG5ldyBPbmxpbmVNYW5hZ2VyKClcbiIsICJpbXBvcnQgeyBmb2N1c01hbmFnZXIgfSBmcm9tICcuL2ZvY3VzTWFuYWdlcidcbmltcG9ydCB7IG9ubGluZU1hbmFnZXIgfSBmcm9tICcuL29ubGluZU1hbmFnZXInXG5pbXBvcnQgeyBzbGVlcCB9IGZyb20gJy4vdXRpbHMnXG5pbXBvcnQgdHlwZSB7IENhbmNlbE9wdGlvbnMsIE5ldHdvcmtNb2RlIH0gZnJvbSAnLi90eXBlcydcblxuLy8gVFlQRVNcblxuaW50ZXJmYWNlIFJldHJ5ZXJDb25maWc8VERhdGEgPSB1bmtub3duLCBURXJyb3IgPSB1bmtub3duPiB7XG4gIGZuOiAoKSA9PiBURGF0YSB8IFByb21pc2U8VERhdGE+XG4gIGFib3J0PzogKCkgPT4gdm9pZFxuICBvbkVycm9yPzogKGVycm9yOiBURXJyb3IpID0+IHZvaWRcbiAgb25TdWNjZXNzPzogKGRhdGE6IFREYXRhKSA9PiB2b2lkXG4gIG9uRmFpbD86IChmYWlsdXJlQ291bnQ6IG51bWJlciwgZXJyb3I6IFRFcnJvcikgPT4gdm9pZFxuICBvblBhdXNlPzogKCkgPT4gdm9pZFxuICBvbkNvbnRpbnVlPzogKCkgPT4gdm9pZFxuICByZXRyeT86IFJldHJ5VmFsdWU8VEVycm9yPlxuICByZXRyeURlbGF5PzogUmV0cnlEZWxheVZhbHVlPFRFcnJvcj5cbiAgbmV0d29ya01vZGU6IE5ldHdvcmtNb2RlIHwgdW5kZWZpbmVkXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmV0cnllcjxURGF0YSA9IHVua25vd24+IHtcbiAgcHJvbWlzZTogUHJvbWlzZTxURGF0YT5cbiAgY2FuY2VsOiAoY2FuY2VsT3B0aW9ucz86IENhbmNlbE9wdGlvbnMpID0+IHZvaWRcbiAgY29udGludWU6ICgpID0+IFByb21pc2U8dW5rbm93bj5cbiAgY2FuY2VsUmV0cnk6ICgpID0+IHZvaWRcbiAgY29udGludWVSZXRyeTogKCkgPT4gdm9pZFxufVxuXG5leHBvcnQgdHlwZSBSZXRyeVZhbHVlPFRFcnJvcj4gPSBib29sZWFuIHwgbnVtYmVyIHwgU2hvdWxkUmV0cnlGdW5jdGlvbjxURXJyb3I+XG5cbnR5cGUgU2hvdWxkUmV0cnlGdW5jdGlvbjxURXJyb3I+ID0gKFxuICBmYWlsdXJlQ291bnQ6IG51bWJlcixcbiAgZXJyb3I6IFRFcnJvcixcbikgPT4gYm9vbGVhblxuXG5leHBvcnQgdHlwZSBSZXRyeURlbGF5VmFsdWU8VEVycm9yPiA9IG51bWJlciB8IFJldHJ5RGVsYXlGdW5jdGlvbjxURXJyb3I+XG5cbnR5cGUgUmV0cnlEZWxheUZ1bmN0aW9uPFRFcnJvciA9IHVua25vd24+ID0gKFxuICBmYWlsdXJlQ291bnQ6IG51bWJlcixcbiAgZXJyb3I6IFRFcnJvcixcbikgPT4gbnVtYmVyXG5cbmZ1bmN0aW9uIGRlZmF1bHRSZXRyeURlbGF5KGZhaWx1cmVDb3VudDogbnVtYmVyKSB7XG4gIHJldHVybiBNYXRoLm1pbigxMDAwICogMiAqKiBmYWlsdXJlQ291bnQsIDMwMDAwKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2FuRmV0Y2gobmV0d29ya01vZGU6IE5ldHdvcmtNb2RlIHwgdW5kZWZpbmVkKTogYm9vbGVhbiB7XG4gIHJldHVybiAobmV0d29ya01vZGUgPz8gJ29ubGluZScpID09PSAnb25saW5lJ1xuICAgID8gb25saW5lTWFuYWdlci5pc09ubGluZSgpXG4gICAgOiB0cnVlXG59XG5cbmV4cG9ydCBjbGFzcyBDYW5jZWxsZWRFcnJvciB7XG4gIHJldmVydD86IGJvb2xlYW5cbiAgc2lsZW50PzogYm9vbGVhblxuICBjb25zdHJ1Y3RvcihvcHRpb25zPzogQ2FuY2VsT3B0aW9ucykge1xuICAgIHRoaXMucmV2ZXJ0ID0gb3B0aW9ucz8ucmV2ZXJ0XG4gICAgdGhpcy5zaWxlbnQgPSBvcHRpb25zPy5zaWxlbnRcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNDYW5jZWxsZWRFcnJvcih2YWx1ZTogYW55KTogdmFsdWUgaXMgQ2FuY2VsbGVkRXJyb3Ige1xuICByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBDYW5jZWxsZWRFcnJvclxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUmV0cnllcjxURGF0YSA9IHVua25vd24sIFRFcnJvciA9IHVua25vd24+KFxuICBjb25maWc6IFJldHJ5ZXJDb25maWc8VERhdGEsIFRFcnJvcj4sXG4pOiBSZXRyeWVyPFREYXRhPiB7XG4gIGxldCBpc1JldHJ5Q2FuY2VsbGVkID0gZmFsc2VcbiAgbGV0IGZhaWx1cmVDb3VudCA9IDBcbiAgbGV0IGlzUmVzb2x2ZWQgPSBmYWxzZVxuICBsZXQgY29udGludWVGbjogKCh2YWx1ZT86IHVua25vd24pID0+IGJvb2xlYW4pIHwgdW5kZWZpbmVkXG4gIGxldCBwcm9taXNlUmVzb2x2ZTogKGRhdGE6IFREYXRhKSA9PiB2b2lkXG4gIGxldCBwcm9taXNlUmVqZWN0OiAoZXJyb3I6IFRFcnJvcikgPT4gdm9pZFxuXG4gIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZTxURGF0YT4oKG91dGVyUmVzb2x2ZSwgb3V0ZXJSZWplY3QpID0+IHtcbiAgICBwcm9taXNlUmVzb2x2ZSA9IG91dGVyUmVzb2x2ZVxuICAgIHByb21pc2VSZWplY3QgPSBvdXRlclJlamVjdFxuICB9KVxuXG4gIGNvbnN0IGNhbmNlbCA9IChjYW5jZWxPcHRpb25zPzogQ2FuY2VsT3B0aW9ucyk6IHZvaWQgPT4ge1xuICAgIGlmICghaXNSZXNvbHZlZCkge1xuICAgICAgcmVqZWN0KG5ldyBDYW5jZWxsZWRFcnJvcihjYW5jZWxPcHRpb25zKSlcblxuICAgICAgY29uZmlnLmFib3J0Py4oKVxuICAgIH1cbiAgfVxuICBjb25zdCBjYW5jZWxSZXRyeSA9ICgpID0+IHtcbiAgICBpc1JldHJ5Q2FuY2VsbGVkID0gdHJ1ZVxuICB9XG5cbiAgY29uc3QgY29udGludWVSZXRyeSA9ICgpID0+IHtcbiAgICBpc1JldHJ5Q2FuY2VsbGVkID0gZmFsc2VcbiAgfVxuXG4gIGNvbnN0IHNob3VsZFBhdXNlID0gKCkgPT5cbiAgICAhZm9jdXNNYW5hZ2VyLmlzRm9jdXNlZCgpIHx8XG4gICAgKGNvbmZpZy5uZXR3b3JrTW9kZSAhPT0gJ2Fsd2F5cycgJiYgIW9ubGluZU1hbmFnZXIuaXNPbmxpbmUoKSlcblxuICBjb25zdCByZXNvbHZlID0gKHZhbHVlOiBhbnkpID0+IHtcbiAgICBpZiAoIWlzUmVzb2x2ZWQpIHtcbiAgICAgIGlzUmVzb2x2ZWQgPSB0cnVlXG4gICAgICBjb25maWcub25TdWNjZXNzPy4odmFsdWUpXG4gICAgICBjb250aW51ZUZuPy4oKVxuICAgICAgcHJvbWlzZVJlc29sdmUodmFsdWUpXG4gICAgfVxuICB9XG5cbiAgY29uc3QgcmVqZWN0ID0gKHZhbHVlOiBhbnkpID0+IHtcbiAgICBpZiAoIWlzUmVzb2x2ZWQpIHtcbiAgICAgIGlzUmVzb2x2ZWQgPSB0cnVlXG4gICAgICBjb25maWcub25FcnJvcj8uKHZhbHVlKVxuICAgICAgY29udGludWVGbj8uKClcbiAgICAgIHByb21pc2VSZWplY3QodmFsdWUpXG4gICAgfVxuICB9XG5cbiAgY29uc3QgcGF1c2UgPSAoKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChjb250aW51ZVJlc29sdmUpID0+IHtcbiAgICAgIGNvbnRpbnVlRm4gPSAodmFsdWUpID0+IHtcbiAgICAgICAgY29uc3QgY2FuQ29udGludWUgPSBpc1Jlc29sdmVkIHx8ICFzaG91bGRQYXVzZSgpXG4gICAgICAgIGlmIChjYW5Db250aW51ZSkge1xuICAgICAgICAgIGNvbnRpbnVlUmVzb2x2ZSh2YWx1ZSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2FuQ29udGludWVcbiAgICAgIH1cbiAgICAgIGNvbmZpZy5vblBhdXNlPy4oKVxuICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgY29udGludWVGbiA9IHVuZGVmaW5lZFxuICAgICAgaWYgKCFpc1Jlc29sdmVkKSB7XG4gICAgICAgIGNvbmZpZy5vbkNvbnRpbnVlPy4oKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICAvLyBDcmVhdGUgbG9vcCBmdW5jdGlvblxuICBjb25zdCBydW4gPSAoKSA9PiB7XG4gICAgLy8gRG8gbm90aGluZyBpZiBhbHJlYWR5IHJlc29sdmVkXG4gICAgaWYgKGlzUmVzb2x2ZWQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGxldCBwcm9taXNlT3JWYWx1ZTogYW55XG5cbiAgICAvLyBFeGVjdXRlIHF1ZXJ5XG4gICAgdHJ5IHtcbiAgICAgIHByb21pc2VPclZhbHVlID0gY29uZmlnLmZuKClcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcHJvbWlzZU9yVmFsdWUgPSBQcm9taXNlLnJlamVjdChlcnJvcilcbiAgICB9XG5cbiAgICBQcm9taXNlLnJlc29sdmUocHJvbWlzZU9yVmFsdWUpXG4gICAgICAudGhlbihyZXNvbHZlKVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAvLyBTdG9wIGlmIHRoZSBmZXRjaCBpcyBhbHJlYWR5IHJlc29sdmVkXG4gICAgICAgIGlmIChpc1Jlc29sdmVkKSB7XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICAvLyBEbyB3ZSBuZWVkIHRvIHJldHJ5IHRoZSByZXF1ZXN0P1xuICAgICAgICBjb25zdCByZXRyeSA9IGNvbmZpZy5yZXRyeSA/PyAzXG4gICAgICAgIGNvbnN0IHJldHJ5RGVsYXkgPSBjb25maWcucmV0cnlEZWxheSA/PyBkZWZhdWx0UmV0cnlEZWxheVxuICAgICAgICBjb25zdCBkZWxheSA9XG4gICAgICAgICAgdHlwZW9mIHJldHJ5RGVsYXkgPT09ICdmdW5jdGlvbidcbiAgICAgICAgICAgID8gcmV0cnlEZWxheShmYWlsdXJlQ291bnQsIGVycm9yKVxuICAgICAgICAgICAgOiByZXRyeURlbGF5XG4gICAgICAgIGNvbnN0IHNob3VsZFJldHJ5ID1cbiAgICAgICAgICByZXRyeSA9PT0gdHJ1ZSB8fFxuICAgICAgICAgICh0eXBlb2YgcmV0cnkgPT09ICdudW1iZXInICYmIGZhaWx1cmVDb3VudCA8IHJldHJ5KSB8fFxuICAgICAgICAgICh0eXBlb2YgcmV0cnkgPT09ICdmdW5jdGlvbicgJiYgcmV0cnkoZmFpbHVyZUNvdW50LCBlcnJvcikpXG5cbiAgICAgICAgaWYgKGlzUmV0cnlDYW5jZWxsZWQgfHwgIXNob3VsZFJldHJ5KSB7XG4gICAgICAgICAgLy8gV2UgYXJlIGRvbmUgaWYgdGhlIHF1ZXJ5IGRvZXMgbm90IG5lZWQgdG8gYmUgcmV0cmllZFxuICAgICAgICAgIHJlamVjdChlcnJvcilcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIGZhaWx1cmVDb3VudCsrXG5cbiAgICAgICAgLy8gTm90aWZ5IG9uIGZhaWxcbiAgICAgICAgY29uZmlnLm9uRmFpbD8uKGZhaWx1cmVDb3VudCwgZXJyb3IpXG5cbiAgICAgICAgLy8gRGVsYXlcbiAgICAgICAgc2xlZXAoZGVsYXkpXG4gICAgICAgICAgLy8gUGF1c2UgaWYgdGhlIGRvY3VtZW50IGlzIG5vdCB2aXNpYmxlIG9yIHdoZW4gdGhlIGRldmljZSBpcyBvZmZsaW5lXG4gICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHNob3VsZFBhdXNlKCkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHBhdXNlKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgIH0pXG4gICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgaWYgKGlzUmV0cnlDYW5jZWxsZWQpIHtcbiAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcnVuKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgfSlcbiAgfVxuXG4gIC8vIFN0YXJ0IGxvb3BcbiAgaWYgKGNhbkZldGNoKGNvbmZpZy5uZXR3b3JrTW9kZSkpIHtcbiAgICBydW4oKVxuICB9IGVsc2Uge1xuICAgIHBhdXNlKCkudGhlbihydW4pXG4gIH1cblxuICByZXR1cm4ge1xuICAgIHByb21pc2UsXG4gICAgY2FuY2VsLFxuICAgIGNvbnRpbnVlOiAoKSA9PiB7XG4gICAgICBjb25zdCBkaWRDb250aW51ZSA9IGNvbnRpbnVlRm4/LigpXG4gICAgICByZXR1cm4gZGlkQ29udGludWUgPyBwcm9taXNlIDogUHJvbWlzZS5yZXNvbHZlKClcbiAgICB9LFxuICAgIGNhbmNlbFJldHJ5LFxuICAgIGNvbnRpbnVlUmV0cnksXG4gIH1cbn1cbiIsICJleHBvcnQgaW50ZXJmYWNlIExvZ2dlciB7XG4gIGxvZzogTG9nRnVuY3Rpb25cbiAgd2FybjogTG9nRnVuY3Rpb25cbiAgZXJyb3I6IExvZ0Z1bmN0aW9uXG59XG5cbnR5cGUgTG9nRnVuY3Rpb24gPSAoLi4uYXJnczogYW55W10pID0+IHZvaWRcblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRMb2dnZXI6IExvZ2dlciA9IGNvbnNvbGVcbiIsICJpbXBvcnQgeyBzY2hlZHVsZU1pY3JvdGFzayB9IGZyb20gJy4vdXRpbHMnXG5cbi8vIFRZUEVTXG5cbnR5cGUgTm90aWZ5Q2FsbGJhY2sgPSAoKSA9PiB2b2lkXG5cbnR5cGUgTm90aWZ5RnVuY3Rpb24gPSAoY2FsbGJhY2s6ICgpID0+IHZvaWQpID0+IHZvaWRcblxudHlwZSBCYXRjaE5vdGlmeUZ1bmN0aW9uID0gKGNhbGxiYWNrOiAoKSA9PiB2b2lkKSA9PiB2b2lkXG5cbnR5cGUgQmF0Y2hDYWxsc0NhbGxiYWNrPFQgZXh0ZW5kcyB1bmtub3duW10+ID0gKC4uLmFyZ3M6IFQpID0+IHZvaWRcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU5vdGlmeU1hbmFnZXIoKSB7XG4gIGxldCBxdWV1ZTogTm90aWZ5Q2FsbGJhY2tbXSA9IFtdXG4gIGxldCB0cmFuc2FjdGlvbnMgPSAwXG4gIGxldCBub3RpZnlGbjogTm90aWZ5RnVuY3Rpb24gPSAoY2FsbGJhY2spID0+IHtcbiAgICBjYWxsYmFjaygpXG4gIH1cbiAgbGV0IGJhdGNoTm90aWZ5Rm46IEJhdGNoTm90aWZ5RnVuY3Rpb24gPSAoY2FsbGJhY2s6ICgpID0+IHZvaWQpID0+IHtcbiAgICBjYWxsYmFjaygpXG4gIH1cblxuICBjb25zdCBiYXRjaCA9IDxUPihjYWxsYmFjazogKCkgPT4gVCk6IFQgPT4ge1xuICAgIGxldCByZXN1bHRcbiAgICB0cmFuc2FjdGlvbnMrK1xuICAgIHRyeSB7XG4gICAgICByZXN1bHQgPSBjYWxsYmFjaygpXG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRyYW5zYWN0aW9ucy0tXG4gICAgICBpZiAoIXRyYW5zYWN0aW9ucykge1xuICAgICAgICBmbHVzaCgpXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRcbiAgfVxuXG4gIGNvbnN0IHNjaGVkdWxlID0gKGNhbGxiYWNrOiBOb3RpZnlDYWxsYmFjayk6IHZvaWQgPT4ge1xuICAgIGlmICh0cmFuc2FjdGlvbnMpIHtcbiAgICAgIHF1ZXVlLnB1c2goY2FsbGJhY2spXG4gICAgfSBlbHNlIHtcbiAgICAgIHNjaGVkdWxlTWljcm90YXNrKCgpID0+IHtcbiAgICAgICAgbm90aWZ5Rm4oY2FsbGJhY2spXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBbGwgY2FsbHMgdG8gdGhlIHdyYXBwZWQgZnVuY3Rpb24gd2lsbCBiZSBiYXRjaGVkLlxuICAgKi9cbiAgY29uc3QgYmF0Y2hDYWxscyA9IDxUIGV4dGVuZHMgdW5rbm93bltdPihcbiAgICBjYWxsYmFjazogQmF0Y2hDYWxsc0NhbGxiYWNrPFQ+LFxuICApOiBCYXRjaENhbGxzQ2FsbGJhY2s8VD4gPT4ge1xuICAgIHJldHVybiAoLi4uYXJncykgPT4ge1xuICAgICAgc2NoZWR1bGUoKCkgPT4ge1xuICAgICAgICBjYWxsYmFjayguLi5hcmdzKVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICBjb25zdCBmbHVzaCA9ICgpOiB2b2lkID0+IHtcbiAgICBjb25zdCBvcmlnaW5hbFF1ZXVlID0gcXVldWVcbiAgICBxdWV1ZSA9IFtdXG4gICAgaWYgKG9yaWdpbmFsUXVldWUubGVuZ3RoKSB7XG4gICAgICBzY2hlZHVsZU1pY3JvdGFzaygoKSA9PiB7XG4gICAgICAgIGJhdGNoTm90aWZ5Rm4oKCkgPT4ge1xuICAgICAgICAgIG9yaWdpbmFsUXVldWUuZm9yRWFjaCgoY2FsbGJhY2spID0+IHtcbiAgICAgICAgICAgIG5vdGlmeUZuKGNhbGxiYWNrKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBVc2UgdGhpcyBtZXRob2QgdG8gc2V0IGEgY3VzdG9tIG5vdGlmeSBmdW5jdGlvbi5cbiAgICogVGhpcyBjYW4gYmUgdXNlZCB0byBmb3IgZXhhbXBsZSB3cmFwIG5vdGlmaWNhdGlvbnMgd2l0aCBgUmVhY3QuYWN0YCB3aGlsZSBydW5uaW5nIHRlc3RzLlxuICAgKi9cbiAgY29uc3Qgc2V0Tm90aWZ5RnVuY3Rpb24gPSAoZm46IE5vdGlmeUZ1bmN0aW9uKSA9PiB7XG4gICAgbm90aWZ5Rm4gPSBmblxuICB9XG5cbiAgLyoqXG4gICAqIFVzZSB0aGlzIG1ldGhvZCB0byBzZXQgYSBjdXN0b20gZnVuY3Rpb24gdG8gYmF0Y2ggbm90aWZpY2F0aW9ucyB0b2dldGhlciBpbnRvIGEgc2luZ2xlIHRpY2suXG4gICAqIEJ5IGRlZmF1bHQgUmVhY3QgUXVlcnkgd2lsbCB1c2UgdGhlIGJhdGNoIGZ1bmN0aW9uIHByb3ZpZGVkIGJ5IFJlYWN0RE9NIG9yIFJlYWN0IE5hdGl2ZS5cbiAgICovXG4gIGNvbnN0IHNldEJhdGNoTm90aWZ5RnVuY3Rpb24gPSAoZm46IEJhdGNoTm90aWZ5RnVuY3Rpb24pID0+IHtcbiAgICBiYXRjaE5vdGlmeUZuID0gZm5cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgYmF0Y2gsXG4gICAgYmF0Y2hDYWxscyxcbiAgICBzY2hlZHVsZSxcbiAgICBzZXROb3RpZnlGdW5jdGlvbixcbiAgICBzZXRCYXRjaE5vdGlmeUZ1bmN0aW9uLFxuICB9IGFzIGNvbnN0XG59XG5cbi8vIFNJTkdMRVRPTlxuZXhwb3J0IGNvbnN0IG5vdGlmeU1hbmFnZXIgPSBjcmVhdGVOb3RpZnlNYW5hZ2VyKClcbiIsICJpbXBvcnQgeyBpc1NlcnZlciwgaXNWYWxpZFRpbWVvdXQgfSBmcm9tICcuL3V0aWxzJ1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUmVtb3ZhYmxlIHtcbiAgY2FjaGVUaW1lITogbnVtYmVyXG4gIHByaXZhdGUgZ2NUaW1lb3V0PzogUmV0dXJuVHlwZTx0eXBlb2Ygc2V0VGltZW91dD5cblxuICBkZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuY2xlYXJHY1RpbWVvdXQoKVxuICB9XG5cbiAgcHJvdGVjdGVkIHNjaGVkdWxlR2MoKTogdm9pZCB7XG4gICAgdGhpcy5jbGVhckdjVGltZW91dCgpXG5cbiAgICBpZiAoaXNWYWxpZFRpbWVvdXQodGhpcy5jYWNoZVRpbWUpKSB7XG4gICAgICB0aGlzLmdjVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLm9wdGlvbmFsUmVtb3ZlKClcbiAgICAgIH0sIHRoaXMuY2FjaGVUaW1lKVxuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCB1cGRhdGVDYWNoZVRpbWUobmV3Q2FjaGVUaW1lOiBudW1iZXIgfCB1bmRlZmluZWQpOiB2b2lkIHtcbiAgICAvLyBEZWZhdWx0IHRvIDUgbWludXRlcyAoSW5maW5pdHkgZm9yIHNlcnZlci1zaWRlKSBpZiBubyBjYWNoZSB0aW1lIGlzIHNldFxuICAgIHRoaXMuY2FjaGVUaW1lID0gTWF0aC5tYXgoXG4gICAgICB0aGlzLmNhY2hlVGltZSB8fCAwLFxuICAgICAgbmV3Q2FjaGVUaW1lID8/IChpc1NlcnZlciA/IEluZmluaXR5IDogNSAqIDYwICogMTAwMCksXG4gICAgKVxuICB9XG5cbiAgcHJvdGVjdGVkIGNsZWFyR2NUaW1lb3V0KCkge1xuICAgIGlmICh0aGlzLmdjVGltZW91dCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuZ2NUaW1lb3V0KVxuICAgICAgdGhpcy5nY1RpbWVvdXQgPSB1bmRlZmluZWRcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgYWJzdHJhY3Qgb3B0aW9uYWxSZW1vdmUoKTogdm9pZFxufVxuIiwgImltcG9ydCB7IGdldEFib3J0Q29udHJvbGxlciwgbm9vcCwgcmVwbGFjZURhdGEsIHRpbWVVbnRpbFN0YWxlIH0gZnJvbSAnLi91dGlscydcbmltcG9ydCB7IGRlZmF1bHRMb2dnZXIgfSBmcm9tICcuL2xvZ2dlcidcbmltcG9ydCB7IG5vdGlmeU1hbmFnZXIgfSBmcm9tICcuL25vdGlmeU1hbmFnZXInXG5pbXBvcnQgeyBjYW5GZXRjaCwgY3JlYXRlUmV0cnllciwgaXNDYW5jZWxsZWRFcnJvciB9IGZyb20gJy4vcmV0cnllcidcbmltcG9ydCB7IFJlbW92YWJsZSB9IGZyb20gJy4vcmVtb3ZhYmxlJ1xuaW1wb3J0IHR5cGUge1xuICBDYW5jZWxPcHRpb25zLFxuICBGZXRjaFN0YXR1cyxcbiAgSW5pdGlhbERhdGFGdW5jdGlvbixcbiAgUXVlcnlGdW5jdGlvbkNvbnRleHQsXG4gIFF1ZXJ5S2V5LFxuICBRdWVyeU1ldGEsXG4gIFF1ZXJ5T3B0aW9ucyxcbiAgUXVlcnlTdGF0dXMsXG4gIFNldERhdGFPcHRpb25zLFxufSBmcm9tICcuL3R5cGVzJ1xuaW1wb3J0IHR5cGUgeyBRdWVyeUNhY2hlIH0gZnJvbSAnLi9xdWVyeUNhY2hlJ1xuaW1wb3J0IHR5cGUgeyBRdWVyeU9ic2VydmVyIH0gZnJvbSAnLi9xdWVyeU9ic2VydmVyJ1xuaW1wb3J0IHR5cGUgeyBMb2dnZXIgfSBmcm9tICcuL2xvZ2dlcidcbmltcG9ydCB0eXBlIHsgUmV0cnllciB9IGZyb20gJy4vcmV0cnllcidcblxuLy8gVFlQRVNcblxuaW50ZXJmYWNlIFF1ZXJ5Q29uZmlnPFxuICBUUXVlcnlGbkRhdGEsXG4gIFRFcnJvcixcbiAgVERhdGEsXG4gIFRRdWVyeUtleSBleHRlbmRzIFF1ZXJ5S2V5ID0gUXVlcnlLZXksXG4+IHtcbiAgY2FjaGU6IFF1ZXJ5Q2FjaGVcbiAgcXVlcnlLZXk6IFRRdWVyeUtleVxuICBxdWVyeUhhc2g6IHN0cmluZ1xuICBsb2dnZXI/OiBMb2dnZXJcbiAgb3B0aW9ucz86IFF1ZXJ5T3B0aW9uczxUUXVlcnlGbkRhdGEsIFRFcnJvciwgVERhdGEsIFRRdWVyeUtleT5cbiAgZGVmYXVsdE9wdGlvbnM/OiBRdWVyeU9wdGlvbnM8VFF1ZXJ5Rm5EYXRhLCBURXJyb3IsIFREYXRhLCBUUXVlcnlLZXk+XG4gIHN0YXRlPzogUXVlcnlTdGF0ZTxURGF0YSwgVEVycm9yPlxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFF1ZXJ5U3RhdGU8VERhdGEgPSB1bmtub3duLCBURXJyb3IgPSB1bmtub3duPiB7XG4gIGRhdGE6IFREYXRhIHwgdW5kZWZpbmVkXG4gIGRhdGFVcGRhdGVDb3VudDogbnVtYmVyXG4gIGRhdGFVcGRhdGVkQXQ6IG51bWJlclxuICBlcnJvcjogVEVycm9yIHwgbnVsbFxuICBlcnJvclVwZGF0ZUNvdW50OiBudW1iZXJcbiAgZXJyb3JVcGRhdGVkQXQ6IG51bWJlclxuICBmZXRjaEZhaWx1cmVDb3VudDogbnVtYmVyXG4gIGZldGNoRmFpbHVyZVJlYXNvbjogVEVycm9yIHwgbnVsbFxuICBmZXRjaE1ldGE6IGFueVxuICBpc0ludmFsaWRhdGVkOiBib29sZWFuXG4gIHN0YXR1czogUXVlcnlTdGF0dXNcbiAgZmV0Y2hTdGF0dXM6IEZldGNoU3RhdHVzXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmV0Y2hDb250ZXh0PFxuICBUUXVlcnlGbkRhdGEsXG4gIFRFcnJvcixcbiAgVERhdGEsXG4gIFRRdWVyeUtleSBleHRlbmRzIFF1ZXJ5S2V5ID0gUXVlcnlLZXksXG4+IHtcbiAgZmV0Y2hGbjogKCkgPT4gdW5rbm93biB8IFByb21pc2U8dW5rbm93bj5cbiAgZmV0Y2hPcHRpb25zPzogRmV0Y2hPcHRpb25zXG4gIHNpZ25hbD86IEFib3J0U2lnbmFsXG4gIG9wdGlvbnM6IFF1ZXJ5T3B0aW9uczxUUXVlcnlGbkRhdGEsIFRFcnJvciwgVERhdGEsIGFueT5cbiAgcXVlcnlLZXk6IFRRdWVyeUtleVxuICBzdGF0ZTogUXVlcnlTdGF0ZTxURGF0YSwgVEVycm9yPlxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFF1ZXJ5QmVoYXZpb3I8XG4gIFRRdWVyeUZuRGF0YSA9IHVua25vd24sXG4gIFRFcnJvciA9IHVua25vd24sXG4gIFREYXRhID0gVFF1ZXJ5Rm5EYXRhLFxuICBUUXVlcnlLZXkgZXh0ZW5kcyBRdWVyeUtleSA9IFF1ZXJ5S2V5LFxuPiB7XG4gIG9uRmV0Y2g6IChcbiAgICBjb250ZXh0OiBGZXRjaENvbnRleHQ8VFF1ZXJ5Rm5EYXRhLCBURXJyb3IsIFREYXRhLCBUUXVlcnlLZXk+LFxuICApID0+IHZvaWRcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGZXRjaE9wdGlvbnMge1xuICBjYW5jZWxSZWZldGNoPzogYm9vbGVhblxuICBtZXRhPzogYW55XG59XG5cbmludGVyZmFjZSBGYWlsZWRBY3Rpb248VEVycm9yPiB7XG4gIHR5cGU6ICdmYWlsZWQnXG4gIGZhaWx1cmVDb3VudDogbnVtYmVyXG4gIGVycm9yOiBURXJyb3Jcbn1cblxuaW50ZXJmYWNlIEZldGNoQWN0aW9uIHtcbiAgdHlwZTogJ2ZldGNoJ1xuICBtZXRhPzogYW55XG59XG5cbmludGVyZmFjZSBTdWNjZXNzQWN0aW9uPFREYXRhPiB7XG4gIGRhdGE6IFREYXRhIHwgdW5kZWZpbmVkXG4gIHR5cGU6ICdzdWNjZXNzJ1xuICBkYXRhVXBkYXRlZEF0PzogbnVtYmVyXG4gIG1hbnVhbD86IGJvb2xlYW5cbn1cblxuaW50ZXJmYWNlIEVycm9yQWN0aW9uPFRFcnJvcj4ge1xuICB0eXBlOiAnZXJyb3InXG4gIGVycm9yOiBURXJyb3Jcbn1cblxuaW50ZXJmYWNlIEludmFsaWRhdGVBY3Rpb24ge1xuICB0eXBlOiAnaW52YWxpZGF0ZSdcbn1cblxuaW50ZXJmYWNlIFBhdXNlQWN0aW9uIHtcbiAgdHlwZTogJ3BhdXNlJ1xufVxuXG5pbnRlcmZhY2UgQ29udGludWVBY3Rpb24ge1xuICB0eXBlOiAnY29udGludWUnXG59XG5cbmludGVyZmFjZSBTZXRTdGF0ZUFjdGlvbjxURGF0YSwgVEVycm9yPiB7XG4gIHR5cGU6ICdzZXRTdGF0ZSdcbiAgc3RhdGU6IFBhcnRpYWw8UXVlcnlTdGF0ZTxURGF0YSwgVEVycm9yPj5cbiAgc2V0U3RhdGVPcHRpb25zPzogU2V0U3RhdGVPcHRpb25zXG59XG5cbmV4cG9ydCB0eXBlIEFjdGlvbjxURGF0YSwgVEVycm9yPiA9XG4gIHwgQ29udGludWVBY3Rpb25cbiAgfCBFcnJvckFjdGlvbjxURXJyb3I+XG4gIHwgRmFpbGVkQWN0aW9uPFRFcnJvcj5cbiAgfCBGZXRjaEFjdGlvblxuICB8IEludmFsaWRhdGVBY3Rpb25cbiAgfCBQYXVzZUFjdGlvblxuICB8IFNldFN0YXRlQWN0aW9uPFREYXRhLCBURXJyb3I+XG4gIHwgU3VjY2Vzc0FjdGlvbjxURGF0YT5cblxuZXhwb3J0IGludGVyZmFjZSBTZXRTdGF0ZU9wdGlvbnMge1xuICBtZXRhPzogYW55XG59XG5cbi8vIENMQVNTXG5cbmV4cG9ydCBjbGFzcyBRdWVyeTxcbiAgVFF1ZXJ5Rm5EYXRhID0gdW5rbm93bixcbiAgVEVycm9yID0gdW5rbm93bixcbiAgVERhdGEgPSBUUXVlcnlGbkRhdGEsXG4gIFRRdWVyeUtleSBleHRlbmRzIFF1ZXJ5S2V5ID0gUXVlcnlLZXksXG4+IGV4dGVuZHMgUmVtb3ZhYmxlIHtcbiAgcXVlcnlLZXk6IFRRdWVyeUtleVxuICBxdWVyeUhhc2g6IHN0cmluZ1xuICBvcHRpb25zITogUXVlcnlPcHRpb25zPFRRdWVyeUZuRGF0YSwgVEVycm9yLCBURGF0YSwgVFF1ZXJ5S2V5PlxuICBpbml0aWFsU3RhdGU6IFF1ZXJ5U3RhdGU8VERhdGEsIFRFcnJvcj5cbiAgcmV2ZXJ0U3RhdGU/OiBRdWVyeVN0YXRlPFREYXRhLCBURXJyb3I+XG4gIHN0YXRlOiBRdWVyeVN0YXRlPFREYXRhLCBURXJyb3I+XG4gIGlzRmV0Y2hpbmdPcHRpbWlzdGljPzogYm9vbGVhblxuXG4gIHByaXZhdGUgY2FjaGU6IFF1ZXJ5Q2FjaGVcbiAgcHJpdmF0ZSBsb2dnZXI6IExvZ2dlclxuICBwcml2YXRlIHByb21pc2U/OiBQcm9taXNlPFREYXRhPlxuICBwcml2YXRlIHJldHJ5ZXI/OiBSZXRyeWVyPFREYXRhPlxuICBwcml2YXRlIG9ic2VydmVyczogUXVlcnlPYnNlcnZlcjxhbnksIGFueSwgYW55LCBhbnksIGFueT5bXVxuICBwcml2YXRlIGRlZmF1bHRPcHRpb25zPzogUXVlcnlPcHRpb25zPFRRdWVyeUZuRGF0YSwgVEVycm9yLCBURGF0YSwgVFF1ZXJ5S2V5PlxuICBwcml2YXRlIGFib3J0U2lnbmFsQ29uc3VtZWQ6IGJvb2xlYW5cblxuICBjb25zdHJ1Y3Rvcihjb25maWc6IFF1ZXJ5Q29uZmlnPFRRdWVyeUZuRGF0YSwgVEVycm9yLCBURGF0YSwgVFF1ZXJ5S2V5Pikge1xuICAgIHN1cGVyKClcblxuICAgIHRoaXMuYWJvcnRTaWduYWxDb25zdW1lZCA9IGZhbHNlXG4gICAgdGhpcy5kZWZhdWx0T3B0aW9ucyA9IGNvbmZpZy5kZWZhdWx0T3B0aW9uc1xuICAgIHRoaXMuc2V0T3B0aW9ucyhjb25maWcub3B0aW9ucylcbiAgICB0aGlzLm9ic2VydmVycyA9IFtdXG4gICAgdGhpcy5jYWNoZSA9IGNvbmZpZy5jYWNoZVxuICAgIHRoaXMubG9nZ2VyID0gY29uZmlnLmxvZ2dlciB8fCBkZWZhdWx0TG9nZ2VyXG4gICAgdGhpcy5xdWVyeUtleSA9IGNvbmZpZy5xdWVyeUtleVxuICAgIHRoaXMucXVlcnlIYXNoID0gY29uZmlnLnF1ZXJ5SGFzaFxuICAgIHRoaXMuaW5pdGlhbFN0YXRlID0gY29uZmlnLnN0YXRlIHx8IGdldERlZmF1bHRTdGF0ZSh0aGlzLm9wdGlvbnMpXG4gICAgdGhpcy5zdGF0ZSA9IHRoaXMuaW5pdGlhbFN0YXRlXG4gICAgdGhpcy5zY2hlZHVsZUdjKClcbiAgfVxuXG4gIGdldCBtZXRhKCk6IFF1ZXJ5TWV0YSB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5tZXRhXG4gIH1cblxuICBwcml2YXRlIHNldE9wdGlvbnMoXG4gICAgb3B0aW9ucz86IFF1ZXJ5T3B0aW9uczxUUXVlcnlGbkRhdGEsIFRFcnJvciwgVERhdGEsIFRRdWVyeUtleT4sXG4gICk6IHZvaWQge1xuICAgIHRoaXMub3B0aW9ucyA9IHsgLi4udGhpcy5kZWZhdWx0T3B0aW9ucywgLi4ub3B0aW9ucyB9XG5cbiAgICB0aGlzLnVwZGF0ZUNhY2hlVGltZSh0aGlzLm9wdGlvbnMuY2FjaGVUaW1lKVxuICB9XG5cbiAgcHJvdGVjdGVkIG9wdGlvbmFsUmVtb3ZlKCkge1xuICAgIGlmICghdGhpcy5vYnNlcnZlcnMubGVuZ3RoICYmIHRoaXMuc3RhdGUuZmV0Y2hTdGF0dXMgPT09ICdpZGxlJykge1xuICAgICAgdGhpcy5jYWNoZS5yZW1vdmUodGhpcylcbiAgICB9XG4gIH1cblxuICBzZXREYXRhKFxuICAgIG5ld0RhdGE6IFREYXRhLFxuICAgIG9wdGlvbnM/OiBTZXREYXRhT3B0aW9ucyAmIHsgbWFudWFsOiBib29sZWFuIH0sXG4gICk6IFREYXRhIHtcbiAgICBjb25zdCBkYXRhID0gcmVwbGFjZURhdGEodGhpcy5zdGF0ZS5kYXRhLCBuZXdEYXRhLCB0aGlzLm9wdGlvbnMpXG5cbiAgICAvLyBTZXQgZGF0YSBhbmQgbWFyayBpdCBhcyBjYWNoZWRcbiAgICB0aGlzLmRpc3BhdGNoKHtcbiAgICAgIGRhdGEsXG4gICAgICB0eXBlOiAnc3VjY2VzcycsXG4gICAgICBkYXRhVXBkYXRlZEF0OiBvcHRpb25zPy51cGRhdGVkQXQsXG4gICAgICBtYW51YWw6IG9wdGlvbnM/Lm1hbnVhbCxcbiAgICB9KVxuXG4gICAgcmV0dXJuIGRhdGFcbiAgfVxuXG4gIHNldFN0YXRlKFxuICAgIHN0YXRlOiBQYXJ0aWFsPFF1ZXJ5U3RhdGU8VERhdGEsIFRFcnJvcj4+LFxuICAgIHNldFN0YXRlT3B0aW9ucz86IFNldFN0YXRlT3B0aW9ucyxcbiAgKTogdm9pZCB7XG4gICAgdGhpcy5kaXNwYXRjaCh7IHR5cGU6ICdzZXRTdGF0ZScsIHN0YXRlLCBzZXRTdGF0ZU9wdGlvbnMgfSlcbiAgfVxuXG4gIGNhbmNlbChvcHRpb25zPzogQ2FuY2VsT3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHByb21pc2UgPSB0aGlzLnByb21pc2VcbiAgICB0aGlzLnJldHJ5ZXI/LmNhbmNlbChvcHRpb25zKVxuICAgIHJldHVybiBwcm9taXNlID8gcHJvbWlzZS50aGVuKG5vb3ApLmNhdGNoKG5vb3ApIDogUHJvbWlzZS5yZXNvbHZlKClcbiAgfVxuXG4gIGRlc3Ryb3koKTogdm9pZCB7XG4gICAgc3VwZXIuZGVzdHJveSgpXG5cbiAgICB0aGlzLmNhbmNlbCh7IHNpbGVudDogdHJ1ZSB9KVxuICB9XG5cbiAgcmVzZXQoKTogdm9pZCB7XG4gICAgdGhpcy5kZXN0cm95KClcbiAgICB0aGlzLnNldFN0YXRlKHRoaXMuaW5pdGlhbFN0YXRlKVxuICB9XG5cbiAgaXNBY3RpdmUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMub2JzZXJ2ZXJzLnNvbWUoKG9ic2VydmVyKSA9PiBvYnNlcnZlci5vcHRpb25zLmVuYWJsZWQgIT09IGZhbHNlKVxuICB9XG5cbiAgaXNEaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5nZXRPYnNlcnZlcnNDb3VudCgpID4gMCAmJiAhdGhpcy5pc0FjdGl2ZSgpXG4gIH1cblxuICBpc1N0YWxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLnN0YXRlLmlzSW52YWxpZGF0ZWQgfHxcbiAgICAgICF0aGlzLnN0YXRlLmRhdGFVcGRhdGVkQXQgfHxcbiAgICAgIHRoaXMub2JzZXJ2ZXJzLnNvbWUoKG9ic2VydmVyKSA9PiBvYnNlcnZlci5nZXRDdXJyZW50UmVzdWx0KCkuaXNTdGFsZSlcbiAgICApXG4gIH1cblxuICBpc1N0YWxlQnlUaW1lKHN0YWxlVGltZSA9IDApOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5zdGF0ZS5pc0ludmFsaWRhdGVkIHx8XG4gICAgICAhdGhpcy5zdGF0ZS5kYXRhVXBkYXRlZEF0IHx8XG4gICAgICAhdGltZVVudGlsU3RhbGUodGhpcy5zdGF0ZS5kYXRhVXBkYXRlZEF0LCBzdGFsZVRpbWUpXG4gICAgKVxuICB9XG5cbiAgb25Gb2N1cygpOiB2b2lkIHtcbiAgICBjb25zdCBvYnNlcnZlciA9IHRoaXMub2JzZXJ2ZXJzLmZpbmQoKHgpID0+IHguc2hvdWxkRmV0Y2hPbldpbmRvd0ZvY3VzKCkpXG5cbiAgICBpZiAob2JzZXJ2ZXIpIHtcbiAgICAgIG9ic2VydmVyLnJlZmV0Y2goeyBjYW5jZWxSZWZldGNoOiBmYWxzZSB9KVxuICAgIH1cblxuICAgIC8vIENvbnRpbnVlIGZldGNoIGlmIGN1cnJlbnRseSBwYXVzZWRcbiAgICB0aGlzLnJldHJ5ZXI/LmNvbnRpbnVlKClcbiAgfVxuXG4gIG9uT25saW5lKCk6IHZvaWQge1xuICAgIGNvbnN0IG9ic2VydmVyID0gdGhpcy5vYnNlcnZlcnMuZmluZCgoeCkgPT4geC5zaG91bGRGZXRjaE9uUmVjb25uZWN0KCkpXG5cbiAgICBpZiAob2JzZXJ2ZXIpIHtcbiAgICAgIG9ic2VydmVyLnJlZmV0Y2goeyBjYW5jZWxSZWZldGNoOiBmYWxzZSB9KVxuICAgIH1cblxuICAgIC8vIENvbnRpbnVlIGZldGNoIGlmIGN1cnJlbnRseSBwYXVzZWRcbiAgICB0aGlzLnJldHJ5ZXI/LmNvbnRpbnVlKClcbiAgfVxuXG4gIGFkZE9ic2VydmVyKG9ic2VydmVyOiBRdWVyeU9ic2VydmVyPGFueSwgYW55LCBhbnksIGFueSwgYW55Pik6IHZvaWQge1xuICAgIGlmICghdGhpcy5vYnNlcnZlcnMuaW5jbHVkZXMob2JzZXJ2ZXIpKSB7XG4gICAgICB0aGlzLm9ic2VydmVycy5wdXNoKG9ic2VydmVyKVxuXG4gICAgICAvLyBTdG9wIHRoZSBxdWVyeSBmcm9tIGJlaW5nIGdhcmJhZ2UgY29sbGVjdGVkXG4gICAgICB0aGlzLmNsZWFyR2NUaW1lb3V0KClcblxuICAgICAgdGhpcy5jYWNoZS5ub3RpZnkoeyB0eXBlOiAnb2JzZXJ2ZXJBZGRlZCcsIHF1ZXJ5OiB0aGlzLCBvYnNlcnZlciB9KVxuICAgIH1cbiAgfVxuXG4gIHJlbW92ZU9ic2VydmVyKG9ic2VydmVyOiBRdWVyeU9ic2VydmVyPGFueSwgYW55LCBhbnksIGFueSwgYW55Pik6IHZvaWQge1xuICAgIGlmICh0aGlzLm9ic2VydmVycy5pbmNsdWRlcyhvYnNlcnZlcikpIHtcbiAgICAgIHRoaXMub2JzZXJ2ZXJzID0gdGhpcy5vYnNlcnZlcnMuZmlsdGVyKCh4KSA9PiB4ICE9PSBvYnNlcnZlcilcblxuICAgICAgaWYgKCF0aGlzLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgICAgLy8gSWYgdGhlIHRyYW5zcG9ydCBsYXllciBkb2VzIG5vdCBzdXBwb3J0IGNhbmNlbGxhdGlvblxuICAgICAgICAvLyB3ZSdsbCBsZXQgdGhlIHF1ZXJ5IGNvbnRpbnVlIHNvIHRoZSByZXN1bHQgY2FuIGJlIGNhY2hlZFxuICAgICAgICBpZiAodGhpcy5yZXRyeWVyKSB7XG4gICAgICAgICAgaWYgKHRoaXMuYWJvcnRTaWduYWxDb25zdW1lZCkge1xuICAgICAgICAgICAgdGhpcy5yZXRyeWVyLmNhbmNlbCh7IHJldmVydDogdHJ1ZSB9KVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJldHJ5ZXIuY2FuY2VsUmV0cnkoKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2NoZWR1bGVHYygpXG4gICAgICB9XG5cbiAgICAgIHRoaXMuY2FjaGUubm90aWZ5KHsgdHlwZTogJ29ic2VydmVyUmVtb3ZlZCcsIHF1ZXJ5OiB0aGlzLCBvYnNlcnZlciB9KVxuICAgIH1cbiAgfVxuXG4gIGdldE9ic2VydmVyc0NvdW50KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMub2JzZXJ2ZXJzLmxlbmd0aFxuICB9XG5cbiAgaW52YWxpZGF0ZSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuc3RhdGUuaXNJbnZhbGlkYXRlZCkge1xuICAgICAgdGhpcy5kaXNwYXRjaCh7IHR5cGU6ICdpbnZhbGlkYXRlJyB9KVxuICAgIH1cbiAgfVxuXG4gIGZldGNoKFxuICAgIG9wdGlvbnM/OiBRdWVyeU9wdGlvbnM8VFF1ZXJ5Rm5EYXRhLCBURXJyb3IsIFREYXRhLCBUUXVlcnlLZXk+LFxuICAgIGZldGNoT3B0aW9ucz86IEZldGNoT3B0aW9ucyxcbiAgKTogUHJvbWlzZTxURGF0YT4ge1xuICAgIGlmICh0aGlzLnN0YXRlLmZldGNoU3RhdHVzICE9PSAnaWRsZScpIHtcbiAgICAgIGlmICh0aGlzLnN0YXRlLmRhdGFVcGRhdGVkQXQgJiYgZmV0Y2hPcHRpb25zPy5jYW5jZWxSZWZldGNoKSB7XG4gICAgICAgIC8vIFNpbGVudGx5IGNhbmNlbCBjdXJyZW50IGZldGNoIGlmIHRoZSB1c2VyIHdhbnRzIHRvIGNhbmNlbCByZWZldGNoZXNcbiAgICAgICAgdGhpcy5jYW5jZWwoeyBzaWxlbnQ6IHRydWUgfSlcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5wcm9taXNlKSB7XG4gICAgICAgIC8vIG1ha2Ugc3VyZSB0aGF0IHJldHJpZXMgdGhhdCB3ZXJlIHBvdGVudGlhbGx5IGNhbmNlbGxlZCBkdWUgdG8gdW5tb3VudHMgY2FuIGNvbnRpbnVlXG4gICAgICAgIHRoaXMucmV0cnllcj8uY29udGludWVSZXRyeSgpXG4gICAgICAgIC8vIFJldHVybiBjdXJyZW50IHByb21pc2UgaWYgd2UgYXJlIGFscmVhZHkgZmV0Y2hpbmdcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvbWlzZVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFVwZGF0ZSBjb25maWcgaWYgcGFzc2VkLCBvdGhlcndpc2UgdGhlIGNvbmZpZyBmcm9tIHRoZSBsYXN0IGV4ZWN1dGlvbiBpcyB1c2VkXG4gICAgaWYgKG9wdGlvbnMpIHtcbiAgICAgIHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zKVxuICAgIH1cblxuICAgIC8vIFVzZSB0aGUgb3B0aW9ucyBmcm9tIHRoZSBmaXJzdCBvYnNlcnZlciB3aXRoIGEgcXVlcnkgZnVuY3Rpb24gaWYgbm8gZnVuY3Rpb24gaXMgZm91bmQuXG4gICAgLy8gVGhpcyBjYW4gaGFwcGVuIHdoZW4gdGhlIHF1ZXJ5IGlzIGh5ZHJhdGVkIG9yIGNyZWF0ZWQgd2l0aCBzZXRRdWVyeURhdGEuXG4gICAgaWYgKCF0aGlzLm9wdGlvbnMucXVlcnlGbikge1xuICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSB0aGlzLm9ic2VydmVycy5maW5kKCh4KSA9PiB4Lm9wdGlvbnMucXVlcnlGbilcbiAgICAgIGlmIChvYnNlcnZlcikge1xuICAgICAgICB0aGlzLnNldE9wdGlvbnMob2JzZXJ2ZXIub3B0aW9ucylcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHRoaXMub3B0aW9ucy5xdWVyeUtleSkpIHtcbiAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoXG4gICAgICAgICAgYEFzIG9mIHY0LCBxdWVyeUtleSBuZWVkcyB0byBiZSBhbiBBcnJheS4gSWYgeW91IGFyZSB1c2luZyBhIHN0cmluZyBsaWtlICdyZXBvRGF0YScsIHBsZWFzZSBjaGFuZ2UgaXQgdG8gYW4gQXJyYXksIGUuZy4gWydyZXBvRGF0YSddYCxcbiAgICAgICAgKVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGFib3J0Q29udHJvbGxlciA9IGdldEFib3J0Q29udHJvbGxlcigpXG5cbiAgICAvLyBDcmVhdGUgcXVlcnkgZnVuY3Rpb24gY29udGV4dFxuICAgIGNvbnN0IHF1ZXJ5Rm5Db250ZXh0OiBRdWVyeUZ1bmN0aW9uQ29udGV4dDxUUXVlcnlLZXk+ID0ge1xuICAgICAgcXVlcnlLZXk6IHRoaXMucXVlcnlLZXksXG4gICAgICBwYWdlUGFyYW06IHVuZGVmaW5lZCxcbiAgICAgIG1ldGE6IHRoaXMubWV0YSxcbiAgICB9XG5cbiAgICAvLyBBZGRzIGFuIGVudW1lcmFibGUgc2lnbmFsIHByb3BlcnR5IHRvIHRoZSBvYmplY3QgdGhhdFxuICAgIC8vIHdoaWNoIHNldHMgYWJvcnRTaWduYWxDb25zdW1lZCB0byB0cnVlIHdoZW4gdGhlIHNpZ25hbFxuICAgIC8vIGlzIHJlYWQuXG4gICAgY29uc3QgYWRkU2lnbmFsUHJvcGVydHkgPSAob2JqZWN0OiB1bmtub3duKSA9PiB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqZWN0LCAnc2lnbmFsJywge1xuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBnZXQ6ICgpID0+IHtcbiAgICAgICAgICBpZiAoYWJvcnRDb250cm9sbGVyKSB7XG4gICAgICAgICAgICB0aGlzLmFib3J0U2lnbmFsQ29uc3VtZWQgPSB0cnVlXG4gICAgICAgICAgICByZXR1cm4gYWJvcnRDb250cm9sbGVyLnNpZ25hbFxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgIH1cblxuICAgIGFkZFNpZ25hbFByb3BlcnR5KHF1ZXJ5Rm5Db250ZXh0KVxuXG4gICAgLy8gQ3JlYXRlIGZldGNoIGZ1bmN0aW9uXG4gICAgY29uc3QgZmV0Y2hGbiA9ICgpID0+IHtcbiAgICAgIGlmICghdGhpcy5vcHRpb25zLnF1ZXJ5Rm4pIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KFxuICAgICAgICAgIGBNaXNzaW5nIHF1ZXJ5Rm4gZm9yIHF1ZXJ5S2V5ICcke3RoaXMub3B0aW9ucy5xdWVyeUhhc2h9J2AsXG4gICAgICAgIClcbiAgICAgIH1cbiAgICAgIHRoaXMuYWJvcnRTaWduYWxDb25zdW1lZCA9IGZhbHNlXG4gICAgICByZXR1cm4gdGhpcy5vcHRpb25zLnF1ZXJ5Rm4ocXVlcnlGbkNvbnRleHQpXG4gICAgfVxuXG4gICAgLy8gVHJpZ2dlciBiZWhhdmlvciBob29rXG4gICAgY29uc3QgY29udGV4dDogRmV0Y2hDb250ZXh0PFRRdWVyeUZuRGF0YSwgVEVycm9yLCBURGF0YSwgVFF1ZXJ5S2V5PiA9IHtcbiAgICAgIGZldGNoT3B0aW9ucyxcbiAgICAgIG9wdGlvbnM6IHRoaXMub3B0aW9ucyxcbiAgICAgIHF1ZXJ5S2V5OiB0aGlzLnF1ZXJ5S2V5LFxuICAgICAgc3RhdGU6IHRoaXMuc3RhdGUsXG4gICAgICBmZXRjaEZuLFxuICAgIH1cblxuICAgIGFkZFNpZ25hbFByb3BlcnR5KGNvbnRleHQpXG5cbiAgICB0aGlzLm9wdGlvbnMuYmVoYXZpb3I/Lm9uRmV0Y2goY29udGV4dClcblxuICAgIC8vIFN0b3JlIHN0YXRlIGluIGNhc2UgdGhlIGN1cnJlbnQgZmV0Y2ggbmVlZHMgdG8gYmUgcmV2ZXJ0ZWRcbiAgICB0aGlzLnJldmVydFN0YXRlID0gdGhpcy5zdGF0ZVxuXG4gICAgLy8gU2V0IHRvIGZldGNoaW5nIHN0YXRlIGlmIG5vdCBhbHJlYWR5IGluIGl0XG4gICAgaWYgKFxuICAgICAgdGhpcy5zdGF0ZS5mZXRjaFN0YXR1cyA9PT0gJ2lkbGUnIHx8XG4gICAgICB0aGlzLnN0YXRlLmZldGNoTWV0YSAhPT0gY29udGV4dC5mZXRjaE9wdGlvbnM/Lm1ldGFcbiAgICApIHtcbiAgICAgIHRoaXMuZGlzcGF0Y2goeyB0eXBlOiAnZmV0Y2gnLCBtZXRhOiBjb250ZXh0LmZldGNoT3B0aW9ucz8ubWV0YSB9KVxuICAgIH1cblxuICAgIGNvbnN0IG9uRXJyb3IgPSAoZXJyb3I6IFRFcnJvciB8IHsgc2lsZW50PzogYm9vbGVhbiB9KSA9PiB7XG4gICAgICAvLyBPcHRpbWlzdGljYWxseSB1cGRhdGUgc3RhdGUgaWYgbmVlZGVkXG4gICAgICBpZiAoIShpc0NhbmNlbGxlZEVycm9yKGVycm9yKSAmJiBlcnJvci5zaWxlbnQpKSB7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2goe1xuICAgICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgICAgZXJyb3I6IGVycm9yIGFzIFRFcnJvcixcbiAgICAgICAgfSlcbiAgICAgIH1cblxuICAgICAgaWYgKCFpc0NhbmNlbGxlZEVycm9yKGVycm9yKSkge1xuICAgICAgICAvLyBOb3RpZnkgY2FjaGUgY2FsbGJhY2tcbiAgICAgICAgdGhpcy5jYWNoZS5jb25maWcub25FcnJvcj8uKGVycm9yLCB0aGlzIGFzIFF1ZXJ5PGFueSwgYW55LCBhbnksIGFueT4pXG4gICAgICAgIHRoaXMuY2FjaGUuY29uZmlnLm9uU2V0dGxlZD8uKFxuICAgICAgICAgIHRoaXMuc3RhdGUuZGF0YSxcbiAgICAgICAgICBlcnJvcixcbiAgICAgICAgICB0aGlzIGFzIFF1ZXJ5PGFueSwgYW55LCBhbnksIGFueT4sXG4gICAgICAgIClcblxuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgIHRoaXMubG9nZ2VyLmVycm9yKGVycm9yKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICghdGhpcy5pc0ZldGNoaW5nT3B0aW1pc3RpYykge1xuICAgICAgICAvLyBTY2hlZHVsZSBxdWVyeSBnYyBhZnRlciBmZXRjaGluZ1xuICAgICAgICB0aGlzLnNjaGVkdWxlR2MoKVxuICAgICAgfVxuICAgICAgdGhpcy5pc0ZldGNoaW5nT3B0aW1pc3RpYyA9IGZhbHNlXG4gICAgfVxuXG4gICAgLy8gVHJ5IHRvIGZldGNoIHRoZSBkYXRhXG4gICAgdGhpcy5yZXRyeWVyID0gY3JlYXRlUmV0cnllcih7XG4gICAgICBmbjogY29udGV4dC5mZXRjaEZuIGFzICgpID0+IFREYXRhLFxuICAgICAgYWJvcnQ6IGFib3J0Q29udHJvbGxlcj8uYWJvcnQuYmluZChhYm9ydENvbnRyb2xsZXIpLFxuICAgICAgb25TdWNjZXNzOiAoZGF0YSkgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIGRhdGEgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLmVycm9yKFxuICAgICAgICAgICAgICBgUXVlcnkgZGF0YSBjYW5ub3QgYmUgdW5kZWZpbmVkLiBQbGVhc2UgbWFrZSBzdXJlIHRvIHJldHVybiBhIHZhbHVlIG90aGVyIHRoYW4gdW5kZWZpbmVkIGZyb20geW91ciBxdWVyeSBmdW5jdGlvbi4gQWZmZWN0ZWQgcXVlcnkga2V5OiAke3RoaXMucXVlcnlIYXNofWAsXG4gICAgICAgICAgICApXG4gICAgICAgICAgfVxuICAgICAgICAgIG9uRXJyb3IobmV3IEVycm9yKGAke3RoaXMucXVlcnlIYXNofSBkYXRhIGlzIHVuZGVmaW5lZGApIGFzIGFueSlcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0RGF0YShkYXRhIGFzIFREYXRhKVxuXG4gICAgICAgIC8vIE5vdGlmeSBjYWNoZSBjYWxsYmFja1xuICAgICAgICB0aGlzLmNhY2hlLmNvbmZpZy5vblN1Y2Nlc3M/LihkYXRhLCB0aGlzIGFzIFF1ZXJ5PGFueSwgYW55LCBhbnksIGFueT4pXG4gICAgICAgIHRoaXMuY2FjaGUuY29uZmlnLm9uU2V0dGxlZD8uKFxuICAgICAgICAgIGRhdGEsXG4gICAgICAgICAgdGhpcy5zdGF0ZS5lcnJvcixcbiAgICAgICAgICB0aGlzIGFzIFF1ZXJ5PGFueSwgYW55LCBhbnksIGFueT4sXG4gICAgICAgIClcblxuICAgICAgICBpZiAoIXRoaXMuaXNGZXRjaGluZ09wdGltaXN0aWMpIHtcbiAgICAgICAgICAvLyBTY2hlZHVsZSBxdWVyeSBnYyBhZnRlciBmZXRjaGluZ1xuICAgICAgICAgIHRoaXMuc2NoZWR1bGVHYygpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pc0ZldGNoaW5nT3B0aW1pc3RpYyA9IGZhbHNlXG4gICAgICB9LFxuICAgICAgb25FcnJvcixcbiAgICAgIG9uRmFpbDogKGZhaWx1cmVDb3VudCwgZXJyb3IpID0+IHtcbiAgICAgICAgdGhpcy5kaXNwYXRjaCh7IHR5cGU6ICdmYWlsZWQnLCBmYWlsdXJlQ291bnQsIGVycm9yIH0pXG4gICAgICB9LFxuICAgICAgb25QYXVzZTogKCkgPT4ge1xuICAgICAgICB0aGlzLmRpc3BhdGNoKHsgdHlwZTogJ3BhdXNlJyB9KVxuICAgICAgfSxcbiAgICAgIG9uQ29udGludWU6ICgpID0+IHtcbiAgICAgICAgdGhpcy5kaXNwYXRjaCh7IHR5cGU6ICdjb250aW51ZScgfSlcbiAgICAgIH0sXG4gICAgICByZXRyeTogY29udGV4dC5vcHRpb25zLnJldHJ5LFxuICAgICAgcmV0cnlEZWxheTogY29udGV4dC5vcHRpb25zLnJldHJ5RGVsYXksXG4gICAgICBuZXR3b3JrTW9kZTogY29udGV4dC5vcHRpb25zLm5ldHdvcmtNb2RlLFxuICAgIH0pXG5cbiAgICB0aGlzLnByb21pc2UgPSB0aGlzLnJldHJ5ZXIucHJvbWlzZVxuXG4gICAgcmV0dXJuIHRoaXMucHJvbWlzZVxuICB9XG5cbiAgcHJpdmF0ZSBkaXNwYXRjaChhY3Rpb246IEFjdGlvbjxURGF0YSwgVEVycm9yPik6IHZvaWQge1xuICAgIGNvbnN0IHJlZHVjZXIgPSAoXG4gICAgICBzdGF0ZTogUXVlcnlTdGF0ZTxURGF0YSwgVEVycm9yPixcbiAgICApOiBRdWVyeVN0YXRlPFREYXRhLCBURXJyb3I+ID0+IHtcbiAgICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSAnZmFpbGVkJzpcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgICBmZXRjaEZhaWx1cmVDb3VudDogYWN0aW9uLmZhaWx1cmVDb3VudCxcbiAgICAgICAgICAgIGZldGNoRmFpbHVyZVJlYXNvbjogYWN0aW9uLmVycm9yLFxuICAgICAgICAgIH1cbiAgICAgICAgY2FzZSAncGF1c2UnOlxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICAgIGZldGNoU3RhdHVzOiAncGF1c2VkJyxcbiAgICAgICAgICB9XG4gICAgICAgIGNhc2UgJ2NvbnRpbnVlJzpcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgICBmZXRjaFN0YXR1czogJ2ZldGNoaW5nJyxcbiAgICAgICAgICB9XG4gICAgICAgIGNhc2UgJ2ZldGNoJzpcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgICBmZXRjaEZhaWx1cmVDb3VudDogMCxcbiAgICAgICAgICAgIGZldGNoRmFpbHVyZVJlYXNvbjogbnVsbCxcbiAgICAgICAgICAgIGZldGNoTWV0YTogYWN0aW9uLm1ldGEgPz8gbnVsbCxcbiAgICAgICAgICAgIGZldGNoU3RhdHVzOiBjYW5GZXRjaCh0aGlzLm9wdGlvbnMubmV0d29ya01vZGUpXG4gICAgICAgICAgICAgID8gJ2ZldGNoaW5nJ1xuICAgICAgICAgICAgICA6ICdwYXVzZWQnLFxuICAgICAgICAgICAgLi4uKCFzdGF0ZS5kYXRhVXBkYXRlZEF0ICYmIHtcbiAgICAgICAgICAgICAgZXJyb3I6IG51bGwsXG4gICAgICAgICAgICAgIHN0YXR1czogJ2xvYWRpbmcnLFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgfVxuICAgICAgICBjYXNlICdzdWNjZXNzJzpcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgICBkYXRhOiBhY3Rpb24uZGF0YSxcbiAgICAgICAgICAgIGRhdGFVcGRhdGVDb3VudDogc3RhdGUuZGF0YVVwZGF0ZUNvdW50ICsgMSxcbiAgICAgICAgICAgIGRhdGFVcGRhdGVkQXQ6IGFjdGlvbi5kYXRhVXBkYXRlZEF0ID8/IERhdGUubm93KCksXG4gICAgICAgICAgICBlcnJvcjogbnVsbCxcbiAgICAgICAgICAgIGlzSW52YWxpZGF0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgc3RhdHVzOiAnc3VjY2VzcycsXG4gICAgICAgICAgICAuLi4oIWFjdGlvbi5tYW51YWwgJiYge1xuICAgICAgICAgICAgICBmZXRjaFN0YXR1czogJ2lkbGUnLFxuICAgICAgICAgICAgICBmZXRjaEZhaWx1cmVDb3VudDogMCxcbiAgICAgICAgICAgICAgZmV0Y2hGYWlsdXJlUmVhc29uOiBudWxsLFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgfVxuICAgICAgICBjYXNlICdlcnJvcic6XG4gICAgICAgICAgY29uc3QgZXJyb3IgPSBhY3Rpb24uZXJyb3IgYXMgdW5rbm93blxuXG4gICAgICAgICAgaWYgKGlzQ2FuY2VsbGVkRXJyb3IoZXJyb3IpICYmIGVycm9yLnJldmVydCAmJiB0aGlzLnJldmVydFN0YXRlKSB7XG4gICAgICAgICAgICByZXR1cm4geyAuLi50aGlzLnJldmVydFN0YXRlLCBmZXRjaFN0YXR1czogJ2lkbGUnIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgICBlcnJvcjogZXJyb3IgYXMgVEVycm9yLFxuICAgICAgICAgICAgZXJyb3JVcGRhdGVDb3VudDogc3RhdGUuZXJyb3JVcGRhdGVDb3VudCArIDEsXG4gICAgICAgICAgICBlcnJvclVwZGF0ZWRBdDogRGF0ZS5ub3coKSxcbiAgICAgICAgICAgIGZldGNoRmFpbHVyZUNvdW50OiBzdGF0ZS5mZXRjaEZhaWx1cmVDb3VudCArIDEsXG4gICAgICAgICAgICBmZXRjaEZhaWx1cmVSZWFzb246IGVycm9yIGFzIFRFcnJvcixcbiAgICAgICAgICAgIGZldGNoU3RhdHVzOiAnaWRsZScsXG4gICAgICAgICAgICBzdGF0dXM6ICdlcnJvcicsXG4gICAgICAgICAgfVxuICAgICAgICBjYXNlICdpbnZhbGlkYXRlJzpcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgICBpc0ludmFsaWRhdGVkOiB0cnVlLFxuICAgICAgICAgIH1cbiAgICAgICAgY2FzZSAnc2V0U3RhdGUnOlxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICAgIC4uLmFjdGlvbi5zdGF0ZSxcbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5zdGF0ZSA9IHJlZHVjZXIodGhpcy5zdGF0ZSlcblxuICAgIG5vdGlmeU1hbmFnZXIuYmF0Y2goKCkgPT4ge1xuICAgICAgdGhpcy5vYnNlcnZlcnMuZm9yRWFjaCgob2JzZXJ2ZXIpID0+IHtcbiAgICAgICAgb2JzZXJ2ZXIub25RdWVyeVVwZGF0ZShhY3Rpb24pXG4gICAgICB9KVxuXG4gICAgICB0aGlzLmNhY2hlLm5vdGlmeSh7IHF1ZXJ5OiB0aGlzLCB0eXBlOiAndXBkYXRlZCcsIGFjdGlvbiB9KVxuICAgIH0pXG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0RGVmYXVsdFN0YXRlPFxuICBUUXVlcnlGbkRhdGEsXG4gIFRFcnJvcixcbiAgVERhdGEsXG4gIFRRdWVyeUtleSBleHRlbmRzIFF1ZXJ5S2V5LFxuPihcbiAgb3B0aW9uczogUXVlcnlPcHRpb25zPFRRdWVyeUZuRGF0YSwgVEVycm9yLCBURGF0YSwgVFF1ZXJ5S2V5Pixcbik6IFF1ZXJ5U3RhdGU8VERhdGEsIFRFcnJvcj4ge1xuICBjb25zdCBkYXRhID1cbiAgICB0eXBlb2Ygb3B0aW9ucy5pbml0aWFsRGF0YSA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgPyAob3B0aW9ucy5pbml0aWFsRGF0YSBhcyBJbml0aWFsRGF0YUZ1bmN0aW9uPFREYXRhPikoKVxuICAgICAgOiBvcHRpb25zLmluaXRpYWxEYXRhXG5cbiAgY29uc3QgaGFzRGF0YSA9IHR5cGVvZiBkYXRhICE9PSAndW5kZWZpbmVkJ1xuXG4gIGNvbnN0IGluaXRpYWxEYXRhVXBkYXRlZEF0ID0gaGFzRGF0YVxuICAgID8gdHlwZW9mIG9wdGlvbnMuaW5pdGlhbERhdGFVcGRhdGVkQXQgPT09ICdmdW5jdGlvbidcbiAgICAgID8gKG9wdGlvbnMuaW5pdGlhbERhdGFVcGRhdGVkQXQgYXMgKCkgPT4gbnVtYmVyIHwgdW5kZWZpbmVkKSgpXG4gICAgICA6IG9wdGlvbnMuaW5pdGlhbERhdGFVcGRhdGVkQXRcbiAgICA6IDBcblxuICByZXR1cm4ge1xuICAgIGRhdGEsXG4gICAgZGF0YVVwZGF0ZUNvdW50OiAwLFxuICAgIGRhdGFVcGRhdGVkQXQ6IGhhc0RhdGEgPyBpbml0aWFsRGF0YVVwZGF0ZWRBdCA/PyBEYXRlLm5vdygpIDogMCxcbiAgICBlcnJvcjogbnVsbCxcbiAgICBlcnJvclVwZGF0ZUNvdW50OiAwLFxuICAgIGVycm9yVXBkYXRlZEF0OiAwLFxuICAgIGZldGNoRmFpbHVyZUNvdW50OiAwLFxuICAgIGZldGNoRmFpbHVyZVJlYXNvbjogbnVsbCxcbiAgICBmZXRjaE1ldGE6IG51bGwsXG4gICAgaXNJbnZhbGlkYXRlZDogZmFsc2UsXG4gICAgc3RhdHVzOiBoYXNEYXRhID8gJ3N1Y2Nlc3MnIDogJ2xvYWRpbmcnLFxuICAgIGZldGNoU3RhdHVzOiAnaWRsZScsXG4gIH1cbn1cbiIsICJpbXBvcnQgeyBoYXNoUXVlcnlLZXlCeU9wdGlvbnMsIG1hdGNoUXVlcnksIHBhcnNlRmlsdGVyQXJncyB9IGZyb20gJy4vdXRpbHMnXG5pbXBvcnQgeyBRdWVyeSB9IGZyb20gJy4vcXVlcnknXG5pbXBvcnQgeyBub3RpZnlNYW5hZ2VyIH0gZnJvbSAnLi9ub3RpZnlNYW5hZ2VyJ1xuaW1wb3J0IHsgU3Vic2NyaWJhYmxlIH0gZnJvbSAnLi9zdWJzY3JpYmFibGUnXG5pbXBvcnQgdHlwZSB7IFF1ZXJ5RmlsdGVycyB9IGZyb20gJy4vdXRpbHMnXG5pbXBvcnQgdHlwZSB7IEFjdGlvbiwgUXVlcnlTdGF0ZSB9IGZyb20gJy4vcXVlcnknXG5pbXBvcnQgdHlwZSB7IE5vdGlmeUV2ZW50LCBRdWVyeUtleSwgUXVlcnlPcHRpb25zIH0gZnJvbSAnLi90eXBlcydcbmltcG9ydCB0eXBlIHsgUXVlcnlDbGllbnQgfSBmcm9tICcuL3F1ZXJ5Q2xpZW50J1xuaW1wb3J0IHR5cGUgeyBRdWVyeU9ic2VydmVyIH0gZnJvbSAnLi9xdWVyeU9ic2VydmVyJ1xuXG4vLyBUWVBFU1xuXG5pbnRlcmZhY2UgUXVlcnlDYWNoZUNvbmZpZyB7XG4gIG9uRXJyb3I/OiAoZXJyb3I6IHVua25vd24sIHF1ZXJ5OiBRdWVyeTx1bmtub3duLCB1bmtub3duLCB1bmtub3duPikgPT4gdm9pZFxuICBvblN1Y2Nlc3M/OiAoZGF0YTogdW5rbm93biwgcXVlcnk6IFF1ZXJ5PHVua25vd24sIHVua25vd24sIHVua25vd24+KSA9PiB2b2lkXG4gIG9uU2V0dGxlZD86IChcbiAgICBkYXRhOiB1bmtub3duIHwgdW5kZWZpbmVkLFxuICAgIGVycm9yOiB1bmtub3duIHwgbnVsbCxcbiAgICBxdWVyeTogUXVlcnk8dW5rbm93biwgdW5rbm93biwgdW5rbm93bj4sXG4gICkgPT4gdm9pZFxufVxuXG5pbnRlcmZhY2UgUXVlcnlIYXNoTWFwIHtcbiAgW2hhc2g6IHN0cmluZ106IFF1ZXJ5PGFueSwgYW55LCBhbnksIGFueT5cbn1cblxuaW50ZXJmYWNlIE5vdGlmeUV2ZW50UXVlcnlBZGRlZCBleHRlbmRzIE5vdGlmeUV2ZW50IHtcbiAgdHlwZTogJ2FkZGVkJ1xuICBxdWVyeTogUXVlcnk8YW55LCBhbnksIGFueSwgYW55PlxufVxuXG5pbnRlcmZhY2UgTm90aWZ5RXZlbnRRdWVyeVJlbW92ZWQgZXh0ZW5kcyBOb3RpZnlFdmVudCB7XG4gIHR5cGU6ICdyZW1vdmVkJ1xuICBxdWVyeTogUXVlcnk8YW55LCBhbnksIGFueSwgYW55PlxufVxuXG5pbnRlcmZhY2UgTm90aWZ5RXZlbnRRdWVyeVVwZGF0ZWQgZXh0ZW5kcyBOb3RpZnlFdmVudCB7XG4gIHR5cGU6ICd1cGRhdGVkJ1xuICBxdWVyeTogUXVlcnk8YW55LCBhbnksIGFueSwgYW55PlxuICBhY3Rpb246IEFjdGlvbjxhbnksIGFueT5cbn1cblxuaW50ZXJmYWNlIE5vdGlmeUV2ZW50UXVlcnlPYnNlcnZlckFkZGVkIGV4dGVuZHMgTm90aWZ5RXZlbnQge1xuICB0eXBlOiAnb2JzZXJ2ZXJBZGRlZCdcbiAgcXVlcnk6IFF1ZXJ5PGFueSwgYW55LCBhbnksIGFueT5cbiAgb2JzZXJ2ZXI6IFF1ZXJ5T2JzZXJ2ZXI8YW55LCBhbnksIGFueSwgYW55LCBhbnk+XG59XG5cbmludGVyZmFjZSBOb3RpZnlFdmVudFF1ZXJ5T2JzZXJ2ZXJSZW1vdmVkIGV4dGVuZHMgTm90aWZ5RXZlbnQge1xuICB0eXBlOiAnb2JzZXJ2ZXJSZW1vdmVkJ1xuICBxdWVyeTogUXVlcnk8YW55LCBhbnksIGFueSwgYW55PlxuICBvYnNlcnZlcjogUXVlcnlPYnNlcnZlcjxhbnksIGFueSwgYW55LCBhbnksIGFueT5cbn1cblxuaW50ZXJmYWNlIE5vdGlmeUV2ZW50UXVlcnlPYnNlcnZlclJlc3VsdHNVcGRhdGVkIGV4dGVuZHMgTm90aWZ5RXZlbnQge1xuICB0eXBlOiAnb2JzZXJ2ZXJSZXN1bHRzVXBkYXRlZCdcbiAgcXVlcnk6IFF1ZXJ5PGFueSwgYW55LCBhbnksIGFueT5cbn1cblxuaW50ZXJmYWNlIE5vdGlmeUV2ZW50UXVlcnlPYnNlcnZlck9wdGlvbnNVcGRhdGVkIGV4dGVuZHMgTm90aWZ5RXZlbnQge1xuICB0eXBlOiAnb2JzZXJ2ZXJPcHRpb25zVXBkYXRlZCdcbiAgcXVlcnk6IFF1ZXJ5PGFueSwgYW55LCBhbnksIGFueT5cbiAgb2JzZXJ2ZXI6IFF1ZXJ5T2JzZXJ2ZXI8YW55LCBhbnksIGFueSwgYW55LCBhbnk+XG59XG5cbmV4cG9ydCB0eXBlIFF1ZXJ5Q2FjaGVOb3RpZnlFdmVudCA9XG4gIHwgTm90aWZ5RXZlbnRRdWVyeUFkZGVkXG4gIHwgTm90aWZ5RXZlbnRRdWVyeVJlbW92ZWRcbiAgfCBOb3RpZnlFdmVudFF1ZXJ5VXBkYXRlZFxuICB8IE5vdGlmeUV2ZW50UXVlcnlPYnNlcnZlckFkZGVkXG4gIHwgTm90aWZ5RXZlbnRRdWVyeU9ic2VydmVyUmVtb3ZlZFxuICB8IE5vdGlmeUV2ZW50UXVlcnlPYnNlcnZlclJlc3VsdHNVcGRhdGVkXG4gIHwgTm90aWZ5RXZlbnRRdWVyeU9ic2VydmVyT3B0aW9uc1VwZGF0ZWRcblxudHlwZSBRdWVyeUNhY2hlTGlzdGVuZXIgPSAoZXZlbnQ6IFF1ZXJ5Q2FjaGVOb3RpZnlFdmVudCkgPT4gdm9pZFxuXG4vLyBDTEFTU1xuXG5leHBvcnQgY2xhc3MgUXVlcnlDYWNoZSBleHRlbmRzIFN1YnNjcmliYWJsZTxRdWVyeUNhY2hlTGlzdGVuZXI+IHtcbiAgY29uZmlnOiBRdWVyeUNhY2hlQ29uZmlnXG5cbiAgcHJpdmF0ZSBxdWVyaWVzOiBRdWVyeTxhbnksIGFueSwgYW55LCBhbnk+W11cbiAgcHJpdmF0ZSBxdWVyaWVzTWFwOiBRdWVyeUhhc2hNYXBcblxuICBjb25zdHJ1Y3Rvcihjb25maWc/OiBRdWVyeUNhY2hlQ29uZmlnKSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMuY29uZmlnID0gY29uZmlnIHx8IHt9XG4gICAgdGhpcy5xdWVyaWVzID0gW11cbiAgICB0aGlzLnF1ZXJpZXNNYXAgPSB7fVxuICB9XG5cbiAgYnVpbGQ8VFF1ZXJ5Rm5EYXRhLCBURXJyb3IsIFREYXRhLCBUUXVlcnlLZXkgZXh0ZW5kcyBRdWVyeUtleT4oXG4gICAgY2xpZW50OiBRdWVyeUNsaWVudCxcbiAgICBvcHRpb25zOiBRdWVyeU9wdGlvbnM8VFF1ZXJ5Rm5EYXRhLCBURXJyb3IsIFREYXRhLCBUUXVlcnlLZXk+LFxuICAgIHN0YXRlPzogUXVlcnlTdGF0ZTxURGF0YSwgVEVycm9yPixcbiAgKTogUXVlcnk8VFF1ZXJ5Rm5EYXRhLCBURXJyb3IsIFREYXRhLCBUUXVlcnlLZXk+IHtcbiAgICBjb25zdCBxdWVyeUtleSA9IG9wdGlvbnMucXVlcnlLZXkhXG4gICAgY29uc3QgcXVlcnlIYXNoID1cbiAgICAgIG9wdGlvbnMucXVlcnlIYXNoID8/IGhhc2hRdWVyeUtleUJ5T3B0aW9ucyhxdWVyeUtleSwgb3B0aW9ucylcbiAgICBsZXQgcXVlcnkgPSB0aGlzLmdldDxUUXVlcnlGbkRhdGEsIFRFcnJvciwgVERhdGEsIFRRdWVyeUtleT4ocXVlcnlIYXNoKVxuXG4gICAgaWYgKCFxdWVyeSkge1xuICAgICAgcXVlcnkgPSBuZXcgUXVlcnkoe1xuICAgICAgICBjYWNoZTogdGhpcyxcbiAgICAgICAgbG9nZ2VyOiBjbGllbnQuZ2V0TG9nZ2VyKCksXG4gICAgICAgIHF1ZXJ5S2V5LFxuICAgICAgICBxdWVyeUhhc2gsXG4gICAgICAgIG9wdGlvbnM6IGNsaWVudC5kZWZhdWx0UXVlcnlPcHRpb25zKG9wdGlvbnMpLFxuICAgICAgICBzdGF0ZSxcbiAgICAgICAgZGVmYXVsdE9wdGlvbnM6IGNsaWVudC5nZXRRdWVyeURlZmF1bHRzKHF1ZXJ5S2V5KSxcbiAgICAgIH0pXG4gICAgICB0aGlzLmFkZChxdWVyeSlcbiAgICB9XG5cbiAgICByZXR1cm4gcXVlcnlcbiAgfVxuXG4gIGFkZChxdWVyeTogUXVlcnk8YW55LCBhbnksIGFueSwgYW55Pik6IHZvaWQge1xuICAgIGlmICghdGhpcy5xdWVyaWVzTWFwW3F1ZXJ5LnF1ZXJ5SGFzaF0pIHtcbiAgICAgIHRoaXMucXVlcmllc01hcFtxdWVyeS5xdWVyeUhhc2hdID0gcXVlcnlcbiAgICAgIHRoaXMucXVlcmllcy5wdXNoKHF1ZXJ5KVxuICAgICAgdGhpcy5ub3RpZnkoe1xuICAgICAgICB0eXBlOiAnYWRkZWQnLFxuICAgICAgICBxdWVyeSxcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlKHF1ZXJ5OiBRdWVyeTxhbnksIGFueSwgYW55LCBhbnk+KTogdm9pZCB7XG4gICAgY29uc3QgcXVlcnlJbk1hcCA9IHRoaXMucXVlcmllc01hcFtxdWVyeS5xdWVyeUhhc2hdXG5cbiAgICBpZiAocXVlcnlJbk1hcCkge1xuICAgICAgcXVlcnkuZGVzdHJveSgpXG5cbiAgICAgIHRoaXMucXVlcmllcyA9IHRoaXMucXVlcmllcy5maWx0ZXIoKHgpID0+IHggIT09IHF1ZXJ5KVxuXG4gICAgICBpZiAocXVlcnlJbk1hcCA9PT0gcXVlcnkpIHtcbiAgICAgICAgZGVsZXRlIHRoaXMucXVlcmllc01hcFtxdWVyeS5xdWVyeUhhc2hdXG4gICAgICB9XG5cbiAgICAgIHRoaXMubm90aWZ5KHsgdHlwZTogJ3JlbW92ZWQnLCBxdWVyeSB9KVxuICAgIH1cbiAgfVxuXG4gIGNsZWFyKCk6IHZvaWQge1xuICAgIG5vdGlmeU1hbmFnZXIuYmF0Y2goKCkgPT4ge1xuICAgICAgdGhpcy5xdWVyaWVzLmZvckVhY2goKHF1ZXJ5KSA9PiB7XG4gICAgICAgIHRoaXMucmVtb3ZlKHF1ZXJ5KVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgZ2V0PFxuICAgIFRRdWVyeUZuRGF0YSA9IHVua25vd24sXG4gICAgVEVycm9yID0gdW5rbm93bixcbiAgICBURGF0YSA9IFRRdWVyeUZuRGF0YSxcbiAgICBUUXVlcnlLZXkgZXh0ZW5kcyBRdWVyeUtleSA9IFF1ZXJ5S2V5LFxuICA+KFxuICAgIHF1ZXJ5SGFzaDogc3RyaW5nLFxuICApOiBRdWVyeTxUUXVlcnlGbkRhdGEsIFRFcnJvciwgVERhdGEsIFRRdWVyeUtleT4gfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLnF1ZXJpZXNNYXBbcXVlcnlIYXNoXVxuICB9XG5cbiAgZ2V0QWxsKCk6IFF1ZXJ5W10ge1xuICAgIHJldHVybiB0aGlzLnF1ZXJpZXNcbiAgfVxuXG4gIGZpbmQ8VFF1ZXJ5Rm5EYXRhID0gdW5rbm93biwgVEVycm9yID0gdW5rbm93biwgVERhdGEgPSBUUXVlcnlGbkRhdGE+KFxuICAgIGFyZzE6IFF1ZXJ5S2V5LFxuICAgIGFyZzI/OiBRdWVyeUZpbHRlcnMsXG4gICk6IFF1ZXJ5PFRRdWVyeUZuRGF0YSwgVEVycm9yLCBURGF0YT4gfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IFtmaWx0ZXJzXSA9IHBhcnNlRmlsdGVyQXJncyhhcmcxLCBhcmcyKVxuXG4gICAgaWYgKHR5cGVvZiBmaWx0ZXJzLmV4YWN0ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgZmlsdGVycy5leGFjdCA9IHRydWVcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5xdWVyaWVzLmZpbmQoKHF1ZXJ5KSA9PiBtYXRjaFF1ZXJ5KGZpbHRlcnMsIHF1ZXJ5KSlcbiAgfVxuXG4gIGZpbmRBbGwocXVlcnlLZXk/OiBRdWVyeUtleSwgZmlsdGVycz86IFF1ZXJ5RmlsdGVycyk6IFF1ZXJ5W11cbiAgZmluZEFsbChmaWx0ZXJzPzogUXVlcnlGaWx0ZXJzKTogUXVlcnlbXVxuICBmaW5kQWxsKGFyZzE/OiBRdWVyeUtleSB8IFF1ZXJ5RmlsdGVycywgYXJnMj86IFF1ZXJ5RmlsdGVycyk6IFF1ZXJ5W11cbiAgZmluZEFsbChhcmcxPzogUXVlcnlLZXkgfCBRdWVyeUZpbHRlcnMsIGFyZzI/OiBRdWVyeUZpbHRlcnMpOiBRdWVyeVtdIHtcbiAgICBjb25zdCBbZmlsdGVyc10gPSBwYXJzZUZpbHRlckFyZ3MoYXJnMSwgYXJnMilcbiAgICByZXR1cm4gT2JqZWN0LmtleXMoZmlsdGVycykubGVuZ3RoID4gMFxuICAgICAgPyB0aGlzLnF1ZXJpZXMuZmlsdGVyKChxdWVyeSkgPT4gbWF0Y2hRdWVyeShmaWx0ZXJzLCBxdWVyeSkpXG4gICAgICA6IHRoaXMucXVlcmllc1xuICB9XG5cbiAgbm90aWZ5KGV2ZW50OiBRdWVyeUNhY2hlTm90aWZ5RXZlbnQpIHtcbiAgICBub3RpZnlNYW5hZ2VyLmJhdGNoKCgpID0+IHtcbiAgICAgIHRoaXMubGlzdGVuZXJzLmZvckVhY2goKHsgbGlzdGVuZXIgfSkgPT4ge1xuICAgICAgICBsaXN0ZW5lcihldmVudClcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIG9uRm9jdXMoKTogdm9pZCB7XG4gICAgbm90aWZ5TWFuYWdlci5iYXRjaCgoKSA9PiB7XG4gICAgICB0aGlzLnF1ZXJpZXMuZm9yRWFjaCgocXVlcnkpID0+IHtcbiAgICAgICAgcXVlcnkub25Gb2N1cygpXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICBvbk9ubGluZSgpOiB2b2lkIHtcbiAgICBub3RpZnlNYW5hZ2VyLmJhdGNoKCgpID0+IHtcbiAgICAgIHRoaXMucXVlcmllcy5mb3JFYWNoKChxdWVyeSkgPT4ge1xuICAgICAgICBxdWVyeS5vbk9ubGluZSgpXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cbiIsICJpbXBvcnQgeyBkZWZhdWx0TG9nZ2VyIH0gZnJvbSAnLi9sb2dnZXInXG5pbXBvcnQgeyBub3RpZnlNYW5hZ2VyIH0gZnJvbSAnLi9ub3RpZnlNYW5hZ2VyJ1xuaW1wb3J0IHsgUmVtb3ZhYmxlIH0gZnJvbSAnLi9yZW1vdmFibGUnXG5pbXBvcnQgeyBjYW5GZXRjaCwgY3JlYXRlUmV0cnllciB9IGZyb20gJy4vcmV0cnllcidcbmltcG9ydCB0eXBlIHsgTXV0YXRpb25NZXRhLCBNdXRhdGlvbk9wdGlvbnMsIE11dGF0aW9uU3RhdHVzIH0gZnJvbSAnLi90eXBlcydcbmltcG9ydCB0eXBlIHsgTXV0YXRpb25DYWNoZSB9IGZyb20gJy4vbXV0YXRpb25DYWNoZSdcbmltcG9ydCB0eXBlIHsgTXV0YXRpb25PYnNlcnZlciB9IGZyb20gJy4vbXV0YXRpb25PYnNlcnZlcidcbmltcG9ydCB0eXBlIHsgTG9nZ2VyIH0gZnJvbSAnLi9sb2dnZXInXG5pbXBvcnQgdHlwZSB7IFJldHJ5ZXIgfSBmcm9tICcuL3JldHJ5ZXInXG5cbi8vIFRZUEVTXG5cbmludGVyZmFjZSBNdXRhdGlvbkNvbmZpZzxURGF0YSwgVEVycm9yLCBUVmFyaWFibGVzLCBUQ29udGV4dD4ge1xuICBtdXRhdGlvbklkOiBudW1iZXJcbiAgbXV0YXRpb25DYWNoZTogTXV0YXRpb25DYWNoZVxuICBvcHRpb25zOiBNdXRhdGlvbk9wdGlvbnM8VERhdGEsIFRFcnJvciwgVFZhcmlhYmxlcywgVENvbnRleHQ+XG4gIGxvZ2dlcj86IExvZ2dlclxuICBkZWZhdWx0T3B0aW9ucz86IE11dGF0aW9uT3B0aW9uczxURGF0YSwgVEVycm9yLCBUVmFyaWFibGVzLCBUQ29udGV4dD5cbiAgc3RhdGU/OiBNdXRhdGlvblN0YXRlPFREYXRhLCBURXJyb3IsIFRWYXJpYWJsZXMsIFRDb250ZXh0PlxuICBtZXRhPzogTXV0YXRpb25NZXRhXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTXV0YXRpb25TdGF0ZTxcbiAgVERhdGEgPSB1bmtub3duLFxuICBURXJyb3IgPSB1bmtub3duLFxuICBUVmFyaWFibGVzID0gdm9pZCxcbiAgVENvbnRleHQgPSB1bmtub3duLFxuPiB7XG4gIGNvbnRleHQ6IFRDb250ZXh0IHwgdW5kZWZpbmVkXG4gIGRhdGE6IFREYXRhIHwgdW5kZWZpbmVkXG4gIGVycm9yOiBURXJyb3IgfCBudWxsXG4gIGZhaWx1cmVDb3VudDogbnVtYmVyXG4gIGZhaWx1cmVSZWFzb246IFRFcnJvciB8IG51bGxcbiAgaXNQYXVzZWQ6IGJvb2xlYW5cbiAgc3RhdHVzOiBNdXRhdGlvblN0YXR1c1xuICB2YXJpYWJsZXM6IFRWYXJpYWJsZXMgfCB1bmRlZmluZWRcbn1cblxuaW50ZXJmYWNlIEZhaWxlZEFjdGlvbjxURXJyb3I+IHtcbiAgdHlwZTogJ2ZhaWxlZCdcbiAgZmFpbHVyZUNvdW50OiBudW1iZXJcbiAgZXJyb3I6IFRFcnJvciB8IG51bGxcbn1cblxuaW50ZXJmYWNlIExvYWRpbmdBY3Rpb248VFZhcmlhYmxlcywgVENvbnRleHQ+IHtcbiAgdHlwZTogJ2xvYWRpbmcnXG4gIHZhcmlhYmxlcz86IFRWYXJpYWJsZXNcbiAgY29udGV4dD86IFRDb250ZXh0XG59XG5cbmludGVyZmFjZSBTdWNjZXNzQWN0aW9uPFREYXRhPiB7XG4gIHR5cGU6ICdzdWNjZXNzJ1xuICBkYXRhOiBURGF0YVxufVxuXG5pbnRlcmZhY2UgRXJyb3JBY3Rpb248VEVycm9yPiB7XG4gIHR5cGU6ICdlcnJvcidcbiAgZXJyb3I6IFRFcnJvclxufVxuXG5pbnRlcmZhY2UgUGF1c2VBY3Rpb24ge1xuICB0eXBlOiAncGF1c2UnXG59XG5cbmludGVyZmFjZSBDb250aW51ZUFjdGlvbiB7XG4gIHR5cGU6ICdjb250aW51ZSdcbn1cblxuaW50ZXJmYWNlIFNldFN0YXRlQWN0aW9uPFREYXRhLCBURXJyb3IsIFRWYXJpYWJsZXMsIFRDb250ZXh0PiB7XG4gIHR5cGU6ICdzZXRTdGF0ZSdcbiAgc3RhdGU6IE11dGF0aW9uU3RhdGU8VERhdGEsIFRFcnJvciwgVFZhcmlhYmxlcywgVENvbnRleHQ+XG59XG5cbmV4cG9ydCB0eXBlIEFjdGlvbjxURGF0YSwgVEVycm9yLCBUVmFyaWFibGVzLCBUQ29udGV4dD4gPVxuICB8IENvbnRpbnVlQWN0aW9uXG4gIHwgRXJyb3JBY3Rpb248VEVycm9yPlxuICB8IEZhaWxlZEFjdGlvbjxURXJyb3I+XG4gIHwgTG9hZGluZ0FjdGlvbjxUVmFyaWFibGVzLCBUQ29udGV4dD5cbiAgfCBQYXVzZUFjdGlvblxuICB8IFNldFN0YXRlQWN0aW9uPFREYXRhLCBURXJyb3IsIFRWYXJpYWJsZXMsIFRDb250ZXh0PlxuICB8IFN1Y2Nlc3NBY3Rpb248VERhdGE+XG5cbi8vIENMQVNTXG5cbmV4cG9ydCBjbGFzcyBNdXRhdGlvbjxcbiAgVERhdGEgPSB1bmtub3duLFxuICBURXJyb3IgPSB1bmtub3duLFxuICBUVmFyaWFibGVzID0gdm9pZCxcbiAgVENvbnRleHQgPSB1bmtub3duLFxuPiBleHRlbmRzIFJlbW92YWJsZSB7XG4gIHN0YXRlOiBNdXRhdGlvblN0YXRlPFREYXRhLCBURXJyb3IsIFRWYXJpYWJsZXMsIFRDb250ZXh0PlxuICBvcHRpb25zITogTXV0YXRpb25PcHRpb25zPFREYXRhLCBURXJyb3IsIFRWYXJpYWJsZXMsIFRDb250ZXh0PlxuICBtdXRhdGlvbklkOiBudW1iZXJcblxuICBwcml2YXRlIG9ic2VydmVyczogTXV0YXRpb25PYnNlcnZlcjxURGF0YSwgVEVycm9yLCBUVmFyaWFibGVzLCBUQ29udGV4dD5bXVxuICBwcml2YXRlIGRlZmF1bHRPcHRpb25zPzogTXV0YXRpb25PcHRpb25zPFREYXRhLCBURXJyb3IsIFRWYXJpYWJsZXMsIFRDb250ZXh0PlxuICBwcml2YXRlIG11dGF0aW9uQ2FjaGU6IE11dGF0aW9uQ2FjaGVcbiAgcHJpdmF0ZSBsb2dnZXI6IExvZ2dlclxuICBwcml2YXRlIHJldHJ5ZXI/OiBSZXRyeWVyPFREYXRhPlxuXG4gIGNvbnN0cnVjdG9yKGNvbmZpZzogTXV0YXRpb25Db25maWc8VERhdGEsIFRFcnJvciwgVFZhcmlhYmxlcywgVENvbnRleHQ+KSB7XG4gICAgc3VwZXIoKVxuXG4gICAgdGhpcy5kZWZhdWx0T3B0aW9ucyA9IGNvbmZpZy5kZWZhdWx0T3B0aW9uc1xuICAgIHRoaXMubXV0YXRpb25JZCA9IGNvbmZpZy5tdXRhdGlvbklkXG4gICAgdGhpcy5tdXRhdGlvbkNhY2hlID0gY29uZmlnLm11dGF0aW9uQ2FjaGVcbiAgICB0aGlzLmxvZ2dlciA9IGNvbmZpZy5sb2dnZXIgfHwgZGVmYXVsdExvZ2dlclxuICAgIHRoaXMub2JzZXJ2ZXJzID0gW11cbiAgICB0aGlzLnN0YXRlID0gY29uZmlnLnN0YXRlIHx8IGdldERlZmF1bHRTdGF0ZSgpXG5cbiAgICB0aGlzLnNldE9wdGlvbnMoY29uZmlnLm9wdGlvbnMpXG4gICAgdGhpcy5zY2hlZHVsZUdjKClcbiAgfVxuXG4gIHNldE9wdGlvbnMoXG4gICAgb3B0aW9ucz86IE11dGF0aW9uT3B0aW9uczxURGF0YSwgVEVycm9yLCBUVmFyaWFibGVzLCBUQ29udGV4dD4sXG4gICk6IHZvaWQge1xuICAgIHRoaXMub3B0aW9ucyA9IHsgLi4udGhpcy5kZWZhdWx0T3B0aW9ucywgLi4ub3B0aW9ucyB9XG5cbiAgICB0aGlzLnVwZGF0ZUNhY2hlVGltZSh0aGlzLm9wdGlvbnMuY2FjaGVUaW1lKVxuICB9XG5cbiAgZ2V0IG1ldGEoKTogTXV0YXRpb25NZXRhIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLm1ldGFcbiAgfVxuXG4gIHNldFN0YXRlKHN0YXRlOiBNdXRhdGlvblN0YXRlPFREYXRhLCBURXJyb3IsIFRWYXJpYWJsZXMsIFRDb250ZXh0Pik6IHZvaWQge1xuICAgIHRoaXMuZGlzcGF0Y2goeyB0eXBlOiAnc2V0U3RhdGUnLCBzdGF0ZSB9KVxuICB9XG5cbiAgYWRkT2JzZXJ2ZXIob2JzZXJ2ZXI6IE11dGF0aW9uT2JzZXJ2ZXI8YW55LCBhbnksIGFueSwgYW55Pik6IHZvaWQge1xuICAgIGlmICghdGhpcy5vYnNlcnZlcnMuaW5jbHVkZXMob2JzZXJ2ZXIpKSB7XG4gICAgICB0aGlzLm9ic2VydmVycy5wdXNoKG9ic2VydmVyKVxuXG4gICAgICAvLyBTdG9wIHRoZSBtdXRhdGlvbiBmcm9tIGJlaW5nIGdhcmJhZ2UgY29sbGVjdGVkXG4gICAgICB0aGlzLmNsZWFyR2NUaW1lb3V0KClcblxuICAgICAgdGhpcy5tdXRhdGlvbkNhY2hlLm5vdGlmeSh7XG4gICAgICAgIHR5cGU6ICdvYnNlcnZlckFkZGVkJyxcbiAgICAgICAgbXV0YXRpb246IHRoaXMsXG4gICAgICAgIG9ic2VydmVyLFxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICByZW1vdmVPYnNlcnZlcihvYnNlcnZlcjogTXV0YXRpb25PYnNlcnZlcjxhbnksIGFueSwgYW55LCBhbnk+KTogdm9pZCB7XG4gICAgdGhpcy5vYnNlcnZlcnMgPSB0aGlzLm9ic2VydmVycy5maWx0ZXIoKHgpID0+IHggIT09IG9ic2VydmVyKVxuXG4gICAgdGhpcy5zY2hlZHVsZUdjKClcblxuICAgIHRoaXMubXV0YXRpb25DYWNoZS5ub3RpZnkoe1xuICAgICAgdHlwZTogJ29ic2VydmVyUmVtb3ZlZCcsXG4gICAgICBtdXRhdGlvbjogdGhpcyxcbiAgICAgIG9ic2VydmVyLFxuICAgIH0pXG4gIH1cblxuICBwcm90ZWN0ZWQgb3B0aW9uYWxSZW1vdmUoKSB7XG4gICAgaWYgKCF0aGlzLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIGlmICh0aGlzLnN0YXRlLnN0YXR1cyA9PT0gJ2xvYWRpbmcnKSB7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVHYygpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm11dGF0aW9uQ2FjaGUucmVtb3ZlKHRoaXMpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY29udGludWUoKTogUHJvbWlzZTx1bmtub3duPiB7XG4gICAgcmV0dXJuIHRoaXMucmV0cnllcj8uY29udGludWUoKSA/PyB0aGlzLmV4ZWN1dGUoKVxuICB9XG5cbiAgYXN5bmMgZXhlY3V0ZSgpOiBQcm9taXNlPFREYXRhPiB7XG4gICAgY29uc3QgZXhlY3V0ZU11dGF0aW9uID0gKCkgPT4ge1xuICAgICAgdGhpcy5yZXRyeWVyID0gY3JlYXRlUmV0cnllcih7XG4gICAgICAgIGZuOiAoKSA9PiB7XG4gICAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMubXV0YXRpb25Gbikge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCdObyBtdXRhdGlvbkZuIGZvdW5kJylcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5tdXRhdGlvbkZuKHRoaXMuc3RhdGUudmFyaWFibGVzISlcbiAgICAgICAgfSxcbiAgICAgICAgb25GYWlsOiAoZmFpbHVyZUNvdW50LCBlcnJvcikgPT4ge1xuICAgICAgICAgIHRoaXMuZGlzcGF0Y2goeyB0eXBlOiAnZmFpbGVkJywgZmFpbHVyZUNvdW50LCBlcnJvciB9KVxuICAgICAgICB9LFxuICAgICAgICBvblBhdXNlOiAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5kaXNwYXRjaCh7IHR5cGU6ICdwYXVzZScgfSlcbiAgICAgICAgfSxcbiAgICAgICAgb25Db250aW51ZTogKCkgPT4ge1xuICAgICAgICAgIHRoaXMuZGlzcGF0Y2goeyB0eXBlOiAnY29udGludWUnIH0pXG4gICAgICAgIH0sXG4gICAgICAgIHJldHJ5OiB0aGlzLm9wdGlvbnMucmV0cnkgPz8gMCxcbiAgICAgICAgcmV0cnlEZWxheTogdGhpcy5vcHRpb25zLnJldHJ5RGVsYXksXG4gICAgICAgIG5ldHdvcmtNb2RlOiB0aGlzLm9wdGlvbnMubmV0d29ya01vZGUsXG4gICAgICB9KVxuXG4gICAgICByZXR1cm4gdGhpcy5yZXRyeWVyLnByb21pc2VcbiAgICB9XG5cbiAgICBjb25zdCByZXN0b3JlZCA9IHRoaXMuc3RhdGUuc3RhdHVzID09PSAnbG9hZGluZydcbiAgICB0cnkge1xuICAgICAgaWYgKCFyZXN0b3JlZCkge1xuICAgICAgICB0aGlzLmRpc3BhdGNoKHsgdHlwZTogJ2xvYWRpbmcnLCB2YXJpYWJsZXM6IHRoaXMub3B0aW9ucy52YXJpYWJsZXMhIH0pXG4gICAgICAgIC8vIE5vdGlmeSBjYWNoZSBjYWxsYmFja1xuICAgICAgICBhd2FpdCB0aGlzLm11dGF0aW9uQ2FjaGUuY29uZmlnLm9uTXV0YXRlPy4oXG4gICAgICAgICAgdGhpcy5zdGF0ZS52YXJpYWJsZXMsXG4gICAgICAgICAgdGhpcyBhcyBNdXRhdGlvbjx1bmtub3duLCB1bmtub3duLCB1bmtub3duLCB1bmtub3duPixcbiAgICAgICAgKVxuICAgICAgICBjb25zdCBjb250ZXh0ID0gYXdhaXQgdGhpcy5vcHRpb25zLm9uTXV0YXRlPy4odGhpcy5zdGF0ZS52YXJpYWJsZXMhKVxuICAgICAgICBpZiAoY29udGV4dCAhPT0gdGhpcy5zdGF0ZS5jb250ZXh0KSB7XG4gICAgICAgICAgdGhpcy5kaXNwYXRjaCh7XG4gICAgICAgICAgICB0eXBlOiAnbG9hZGluZycsXG4gICAgICAgICAgICBjb250ZXh0LFxuICAgICAgICAgICAgdmFyaWFibGVzOiB0aGlzLnN0YXRlLnZhcmlhYmxlcyxcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgZXhlY3V0ZU11dGF0aW9uKClcblxuICAgICAgLy8gTm90aWZ5IGNhY2hlIGNhbGxiYWNrXG4gICAgICBhd2FpdCB0aGlzLm11dGF0aW9uQ2FjaGUuY29uZmlnLm9uU3VjY2Vzcz8uKFxuICAgICAgICBkYXRhLFxuICAgICAgICB0aGlzLnN0YXRlLnZhcmlhYmxlcyxcbiAgICAgICAgdGhpcy5zdGF0ZS5jb250ZXh0LFxuICAgICAgICB0aGlzIGFzIE11dGF0aW9uPHVua25vd24sIHVua25vd24sIHVua25vd24sIHVua25vd24+LFxuICAgICAgKVxuXG4gICAgICBhd2FpdCB0aGlzLm9wdGlvbnMub25TdWNjZXNzPy4oXG4gICAgICAgIGRhdGEsXG4gICAgICAgIHRoaXMuc3RhdGUudmFyaWFibGVzISxcbiAgICAgICAgdGhpcy5zdGF0ZS5jb250ZXh0ISxcbiAgICAgIClcblxuICAgICAgLy8gTm90aWZ5IGNhY2hlIGNhbGxiYWNrXG4gICAgICBhd2FpdCB0aGlzLm11dGF0aW9uQ2FjaGUuY29uZmlnLm9uU2V0dGxlZD8uKFxuICAgICAgICBkYXRhLFxuICAgICAgICBudWxsLFxuICAgICAgICB0aGlzLnN0YXRlLnZhcmlhYmxlcyxcbiAgICAgICAgdGhpcy5zdGF0ZS5jb250ZXh0LFxuICAgICAgICB0aGlzIGFzIE11dGF0aW9uPHVua25vd24sIHVua25vd24sIHVua25vd24sIHVua25vd24+LFxuICAgICAgKVxuXG4gICAgICBhd2FpdCB0aGlzLm9wdGlvbnMub25TZXR0bGVkPy4oXG4gICAgICAgIGRhdGEsXG4gICAgICAgIG51bGwsXG4gICAgICAgIHRoaXMuc3RhdGUudmFyaWFibGVzISxcbiAgICAgICAgdGhpcy5zdGF0ZS5jb250ZXh0LFxuICAgICAgKVxuXG4gICAgICB0aGlzLmRpc3BhdGNoKHsgdHlwZTogJ3N1Y2Nlc3MnLCBkYXRhIH0pXG4gICAgICByZXR1cm4gZGF0YVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBOb3RpZnkgY2FjaGUgY2FsbGJhY2tcbiAgICAgICAgYXdhaXQgdGhpcy5tdXRhdGlvbkNhY2hlLmNvbmZpZy5vbkVycm9yPy4oXG4gICAgICAgICAgZXJyb3IsXG4gICAgICAgICAgdGhpcy5zdGF0ZS52YXJpYWJsZXMsXG4gICAgICAgICAgdGhpcy5zdGF0ZS5jb250ZXh0LFxuICAgICAgICAgIHRoaXMgYXMgTXV0YXRpb248dW5rbm93biwgdW5rbm93biwgdW5rbm93biwgdW5rbm93bj4sXG4gICAgICAgIClcblxuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgIHRoaXMubG9nZ2VyLmVycm9yKGVycm9yKVxuICAgICAgICB9XG5cbiAgICAgICAgYXdhaXQgdGhpcy5vcHRpb25zLm9uRXJyb3I/LihcbiAgICAgICAgICBlcnJvciBhcyBURXJyb3IsXG4gICAgICAgICAgdGhpcy5zdGF0ZS52YXJpYWJsZXMhLFxuICAgICAgICAgIHRoaXMuc3RhdGUuY29udGV4dCxcbiAgICAgICAgKVxuXG4gICAgICAgIC8vIE5vdGlmeSBjYWNoZSBjYWxsYmFja1xuICAgICAgICBhd2FpdCB0aGlzLm11dGF0aW9uQ2FjaGUuY29uZmlnLm9uU2V0dGxlZD8uKFxuICAgICAgICAgIHVuZGVmaW5lZCxcbiAgICAgICAgICBlcnJvcixcbiAgICAgICAgICB0aGlzLnN0YXRlLnZhcmlhYmxlcyxcbiAgICAgICAgICB0aGlzLnN0YXRlLmNvbnRleHQsXG4gICAgICAgICAgdGhpcyBhcyBNdXRhdGlvbjx1bmtub3duLCB1bmtub3duLCB1bmtub3duLCB1bmtub3duPixcbiAgICAgICAgKVxuXG4gICAgICAgIGF3YWl0IHRoaXMub3B0aW9ucy5vblNldHRsZWQ/LihcbiAgICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgICAgZXJyb3IgYXMgVEVycm9yLFxuICAgICAgICAgIHRoaXMuc3RhdGUudmFyaWFibGVzISxcbiAgICAgICAgICB0aGlzLnN0YXRlLmNvbnRleHQsXG4gICAgICAgIClcbiAgICAgICAgdGhyb3cgZXJyb3JcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2goeyB0eXBlOiAnZXJyb3InLCBlcnJvcjogZXJyb3IgYXMgVEVycm9yIH0pXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBkaXNwYXRjaChhY3Rpb246IEFjdGlvbjxURGF0YSwgVEVycm9yLCBUVmFyaWFibGVzLCBUQ29udGV4dD4pOiB2b2lkIHtcbiAgICBjb25zdCByZWR1Y2VyID0gKFxuICAgICAgc3RhdGU6IE11dGF0aW9uU3RhdGU8VERhdGEsIFRFcnJvciwgVFZhcmlhYmxlcywgVENvbnRleHQ+LFxuICAgICk6IE11dGF0aW9uU3RhdGU8VERhdGEsIFRFcnJvciwgVFZhcmlhYmxlcywgVENvbnRleHQ+ID0+IHtcbiAgICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSAnZmFpbGVkJzpcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgICBmYWlsdXJlQ291bnQ6IGFjdGlvbi5mYWlsdXJlQ291bnQsXG4gICAgICAgICAgICBmYWlsdXJlUmVhc29uOiBhY3Rpb24uZXJyb3IsXG4gICAgICAgICAgfVxuICAgICAgICBjYXNlICdwYXVzZSc6XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgICAgaXNQYXVzZWQ6IHRydWUsXG4gICAgICAgICAgfVxuICAgICAgICBjYXNlICdjb250aW51ZSc6XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgICAgaXNQYXVzZWQ6IGZhbHNlLFxuICAgICAgICAgIH1cbiAgICAgICAgY2FzZSAnbG9hZGluZyc6XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgICAgY29udGV4dDogYWN0aW9uLmNvbnRleHQsXG4gICAgICAgICAgICBkYXRhOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBmYWlsdXJlQ291bnQ6IDAsXG4gICAgICAgICAgICBmYWlsdXJlUmVhc29uOiBudWxsLFxuICAgICAgICAgICAgZXJyb3I6IG51bGwsXG4gICAgICAgICAgICBpc1BhdXNlZDogIWNhbkZldGNoKHRoaXMub3B0aW9ucy5uZXR3b3JrTW9kZSksXG4gICAgICAgICAgICBzdGF0dXM6ICdsb2FkaW5nJyxcbiAgICAgICAgICAgIHZhcmlhYmxlczogYWN0aW9uLnZhcmlhYmxlcyxcbiAgICAgICAgICB9XG4gICAgICAgIGNhc2UgJ3N1Y2Nlc3MnOlxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICAgIGRhdGE6IGFjdGlvbi5kYXRhLFxuICAgICAgICAgICAgZmFpbHVyZUNvdW50OiAwLFxuICAgICAgICAgICAgZmFpbHVyZVJlYXNvbjogbnVsbCxcbiAgICAgICAgICAgIGVycm9yOiBudWxsLFxuICAgICAgICAgICAgc3RhdHVzOiAnc3VjY2VzcycsXG4gICAgICAgICAgICBpc1BhdXNlZDogZmFsc2UsXG4gICAgICAgICAgfVxuICAgICAgICBjYXNlICdlcnJvcic6XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgICAgZGF0YTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgZXJyb3I6IGFjdGlvbi5lcnJvcixcbiAgICAgICAgICAgIGZhaWx1cmVDb3VudDogc3RhdGUuZmFpbHVyZUNvdW50ICsgMSxcbiAgICAgICAgICAgIGZhaWx1cmVSZWFzb246IGFjdGlvbi5lcnJvcixcbiAgICAgICAgICAgIGlzUGF1c2VkOiBmYWxzZSxcbiAgICAgICAgICAgIHN0YXR1czogJ2Vycm9yJyxcbiAgICAgICAgICB9XG4gICAgICAgIGNhc2UgJ3NldFN0YXRlJzpcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgICAuLi5hY3Rpb24uc3RhdGUsXG4gICAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnN0YXRlID0gcmVkdWNlcih0aGlzLnN0YXRlKVxuXG4gICAgbm90aWZ5TWFuYWdlci5iYXRjaCgoKSA9PiB7XG4gICAgICB0aGlzLm9ic2VydmVycy5mb3JFYWNoKChvYnNlcnZlcikgPT4ge1xuICAgICAgICBvYnNlcnZlci5vbk11dGF0aW9uVXBkYXRlKGFjdGlvbilcbiAgICAgIH0pXG4gICAgICB0aGlzLm11dGF0aW9uQ2FjaGUubm90aWZ5KHtcbiAgICAgICAgbXV0YXRpb246IHRoaXMsXG4gICAgICAgIHR5cGU6ICd1cGRhdGVkJyxcbiAgICAgICAgYWN0aW9uLFxuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREZWZhdWx0U3RhdGU8XG4gIFREYXRhLFxuICBURXJyb3IsXG4gIFRWYXJpYWJsZXMsXG4gIFRDb250ZXh0LFxuPigpOiBNdXRhdGlvblN0YXRlPFREYXRhLCBURXJyb3IsIFRWYXJpYWJsZXMsIFRDb250ZXh0PiB7XG4gIHJldHVybiB7XG4gICAgY29udGV4dDogdW5kZWZpbmVkLFxuICAgIGRhdGE6IHVuZGVmaW5lZCxcbiAgICBlcnJvcjogbnVsbCxcbiAgICBmYWlsdXJlQ291bnQ6IDAsXG4gICAgZmFpbHVyZVJlYXNvbjogbnVsbCxcbiAgICBpc1BhdXNlZDogZmFsc2UsXG4gICAgc3RhdHVzOiAnaWRsZScsXG4gICAgdmFyaWFibGVzOiB1bmRlZmluZWQsXG4gIH1cbn1cbiIsICJpbXBvcnQgeyBub3RpZnlNYW5hZ2VyIH0gZnJvbSAnLi9ub3RpZnlNYW5hZ2VyJ1xuaW1wb3J0IHsgTXV0YXRpb24gfSBmcm9tICcuL211dGF0aW9uJ1xuaW1wb3J0IHsgbWF0Y2hNdXRhdGlvbiwgbm9vcCB9IGZyb20gJy4vdXRpbHMnXG5pbXBvcnQgeyBTdWJzY3JpYmFibGUgfSBmcm9tICcuL3N1YnNjcmliYWJsZSdcbmltcG9ydCB0eXBlIHsgTXV0YXRpb25PYnNlcnZlciB9IGZyb20gJy4vbXV0YXRpb25PYnNlcnZlcidcbmltcG9ydCB0eXBlIHsgTXV0YXRpb25PcHRpb25zLCBOb3RpZnlFdmVudCB9IGZyb20gJy4vdHlwZXMnXG5pbXBvcnQgdHlwZSB7IFF1ZXJ5Q2xpZW50IH0gZnJvbSAnLi9xdWVyeUNsaWVudCdcbmltcG9ydCB0eXBlIHsgQWN0aW9uLCBNdXRhdGlvblN0YXRlIH0gZnJvbSAnLi9tdXRhdGlvbidcbmltcG9ydCB0eXBlIHsgTXV0YXRpb25GaWx0ZXJzIH0gZnJvbSAnLi91dGlscydcblxuLy8gVFlQRVNcblxuaW50ZXJmYWNlIE11dGF0aW9uQ2FjaGVDb25maWcge1xuICBvbkVycm9yPzogKFxuICAgIGVycm9yOiB1bmtub3duLFxuICAgIHZhcmlhYmxlczogdW5rbm93bixcbiAgICBjb250ZXh0OiB1bmtub3duLFxuICAgIG11dGF0aW9uOiBNdXRhdGlvbjx1bmtub3duLCB1bmtub3duLCB1bmtub3duPixcbiAgKSA9PiBQcm9taXNlPHVua25vd24+IHwgdW5rbm93blxuICBvblN1Y2Nlc3M/OiAoXG4gICAgZGF0YTogdW5rbm93bixcbiAgICB2YXJpYWJsZXM6IHVua25vd24sXG4gICAgY29udGV4dDogdW5rbm93bixcbiAgICBtdXRhdGlvbjogTXV0YXRpb248dW5rbm93biwgdW5rbm93biwgdW5rbm93bj4sXG4gICkgPT4gUHJvbWlzZTx1bmtub3duPiB8IHVua25vd25cbiAgb25NdXRhdGU/OiAoXG4gICAgdmFyaWFibGVzOiB1bmtub3duLFxuICAgIG11dGF0aW9uOiBNdXRhdGlvbjx1bmtub3duLCB1bmtub3duLCB1bmtub3duPixcbiAgKSA9PiBQcm9taXNlPHVua25vd24+IHwgdW5rbm93blxuICBvblNldHRsZWQ/OiAoXG4gICAgZGF0YTogdW5rbm93biB8IHVuZGVmaW5lZCxcbiAgICBlcnJvcjogdW5rbm93biB8IG51bGwsXG4gICAgdmFyaWFibGVzOiB1bmtub3duLFxuICAgIGNvbnRleHQ6IHVua25vd24sXG4gICAgbXV0YXRpb246IE11dGF0aW9uPHVua25vd24sIHVua25vd24sIHVua25vd24+LFxuICApID0+IFByb21pc2U8dW5rbm93bj4gfCB1bmtub3duXG59XG5cbmludGVyZmFjZSBOb3RpZnlFdmVudE11dGF0aW9uQWRkZWQgZXh0ZW5kcyBOb3RpZnlFdmVudCB7XG4gIHR5cGU6ICdhZGRlZCdcbiAgbXV0YXRpb246IE11dGF0aW9uPGFueSwgYW55LCBhbnksIGFueT5cbn1cbmludGVyZmFjZSBOb3RpZnlFdmVudE11dGF0aW9uUmVtb3ZlZCBleHRlbmRzIE5vdGlmeUV2ZW50IHtcbiAgdHlwZTogJ3JlbW92ZWQnXG4gIG11dGF0aW9uOiBNdXRhdGlvbjxhbnksIGFueSwgYW55LCBhbnk+XG59XG5cbmludGVyZmFjZSBOb3RpZnlFdmVudE11dGF0aW9uT2JzZXJ2ZXJBZGRlZCBleHRlbmRzIE5vdGlmeUV2ZW50IHtcbiAgdHlwZTogJ29ic2VydmVyQWRkZWQnXG4gIG11dGF0aW9uOiBNdXRhdGlvbjxhbnksIGFueSwgYW55LCBhbnk+XG4gIG9ic2VydmVyOiBNdXRhdGlvbk9ic2VydmVyPGFueSwgYW55LCBhbnk+XG59XG5cbmludGVyZmFjZSBOb3RpZnlFdmVudE11dGF0aW9uT2JzZXJ2ZXJSZW1vdmVkIGV4dGVuZHMgTm90aWZ5RXZlbnQge1xuICB0eXBlOiAnb2JzZXJ2ZXJSZW1vdmVkJ1xuICBtdXRhdGlvbjogTXV0YXRpb248YW55LCBhbnksIGFueSwgYW55PlxuICBvYnNlcnZlcjogTXV0YXRpb25PYnNlcnZlcjxhbnksIGFueSwgYW55PlxufVxuXG5pbnRlcmZhY2UgTm90aWZ5RXZlbnRNdXRhdGlvbk9ic2VydmVyT3B0aW9uc1VwZGF0ZWQgZXh0ZW5kcyBOb3RpZnlFdmVudCB7XG4gIHR5cGU6ICdvYnNlcnZlck9wdGlvbnNVcGRhdGVkJ1xuICBtdXRhdGlvbj86IE11dGF0aW9uPGFueSwgYW55LCBhbnksIGFueT5cbiAgb2JzZXJ2ZXI6IE11dGF0aW9uT2JzZXJ2ZXI8YW55LCBhbnksIGFueSwgYW55PlxufVxuXG5pbnRlcmZhY2UgTm90aWZ5RXZlbnRNdXRhdGlvblVwZGF0ZWQgZXh0ZW5kcyBOb3RpZnlFdmVudCB7XG4gIHR5cGU6ICd1cGRhdGVkJ1xuICBtdXRhdGlvbjogTXV0YXRpb248YW55LCBhbnksIGFueSwgYW55PlxuICBhY3Rpb246IEFjdGlvbjxhbnksIGFueSwgYW55LCBhbnk+XG59XG5cbnR5cGUgTXV0YXRpb25DYWNoZU5vdGlmeUV2ZW50ID1cbiAgfCBOb3RpZnlFdmVudE11dGF0aW9uQWRkZWRcbiAgfCBOb3RpZnlFdmVudE11dGF0aW9uUmVtb3ZlZFxuICB8IE5vdGlmeUV2ZW50TXV0YXRpb25PYnNlcnZlckFkZGVkXG4gIHwgTm90aWZ5RXZlbnRNdXRhdGlvbk9ic2VydmVyUmVtb3ZlZFxuICB8IE5vdGlmeUV2ZW50TXV0YXRpb25PYnNlcnZlck9wdGlvbnNVcGRhdGVkXG4gIHwgTm90aWZ5RXZlbnRNdXRhdGlvblVwZGF0ZWRcblxudHlwZSBNdXRhdGlvbkNhY2hlTGlzdGVuZXIgPSAoZXZlbnQ6IE11dGF0aW9uQ2FjaGVOb3RpZnlFdmVudCkgPT4gdm9pZFxuXG4vLyBDTEFTU1xuXG5leHBvcnQgY2xhc3MgTXV0YXRpb25DYWNoZSBleHRlbmRzIFN1YnNjcmliYWJsZTxNdXRhdGlvbkNhY2hlTGlzdGVuZXI+IHtcbiAgY29uZmlnOiBNdXRhdGlvbkNhY2hlQ29uZmlnXG5cbiAgcHJpdmF0ZSBtdXRhdGlvbnM6IE11dGF0aW9uPGFueSwgYW55LCBhbnksIGFueT5bXVxuICBwcml2YXRlIG11dGF0aW9uSWQ6IG51bWJlclxuICBwcml2YXRlIHJlc3VtaW5nOiBQcm9taXNlPHVua25vd24+IHwgdW5kZWZpbmVkXG5cbiAgY29uc3RydWN0b3IoY29uZmlnPzogTXV0YXRpb25DYWNoZUNvbmZpZykge1xuICAgIHN1cGVyKClcbiAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZyB8fCB7fVxuICAgIHRoaXMubXV0YXRpb25zID0gW11cbiAgICB0aGlzLm11dGF0aW9uSWQgPSAwXG4gIH1cblxuICBidWlsZDxURGF0YSwgVEVycm9yLCBUVmFyaWFibGVzLCBUQ29udGV4dD4oXG4gICAgY2xpZW50OiBRdWVyeUNsaWVudCxcbiAgICBvcHRpb25zOiBNdXRhdGlvbk9wdGlvbnM8VERhdGEsIFRFcnJvciwgVFZhcmlhYmxlcywgVENvbnRleHQ+LFxuICAgIHN0YXRlPzogTXV0YXRpb25TdGF0ZTxURGF0YSwgVEVycm9yLCBUVmFyaWFibGVzLCBUQ29udGV4dD4sXG4gICk6IE11dGF0aW9uPFREYXRhLCBURXJyb3IsIFRWYXJpYWJsZXMsIFRDb250ZXh0PiB7XG4gICAgY29uc3QgbXV0YXRpb24gPSBuZXcgTXV0YXRpb24oe1xuICAgICAgbXV0YXRpb25DYWNoZTogdGhpcyxcbiAgICAgIGxvZ2dlcjogY2xpZW50LmdldExvZ2dlcigpLFxuICAgICAgbXV0YXRpb25JZDogKyt0aGlzLm11dGF0aW9uSWQsXG4gICAgICBvcHRpb25zOiBjbGllbnQuZGVmYXVsdE11dGF0aW9uT3B0aW9ucyhvcHRpb25zKSxcbiAgICAgIHN0YXRlLFxuICAgICAgZGVmYXVsdE9wdGlvbnM6IG9wdGlvbnMubXV0YXRpb25LZXlcbiAgICAgICAgPyBjbGllbnQuZ2V0TXV0YXRpb25EZWZhdWx0cyhvcHRpb25zLm11dGF0aW9uS2V5KVxuICAgICAgICA6IHVuZGVmaW5lZCxcbiAgICB9KVxuXG4gICAgdGhpcy5hZGQobXV0YXRpb24pXG5cbiAgICByZXR1cm4gbXV0YXRpb25cbiAgfVxuXG4gIGFkZChtdXRhdGlvbjogTXV0YXRpb248YW55LCBhbnksIGFueSwgYW55Pik6IHZvaWQge1xuICAgIHRoaXMubXV0YXRpb25zLnB1c2gobXV0YXRpb24pXG4gICAgdGhpcy5ub3RpZnkoeyB0eXBlOiAnYWRkZWQnLCBtdXRhdGlvbiB9KVxuICB9XG5cbiAgcmVtb3ZlKG11dGF0aW9uOiBNdXRhdGlvbjxhbnksIGFueSwgYW55LCBhbnk+KTogdm9pZCB7XG4gICAgdGhpcy5tdXRhdGlvbnMgPSB0aGlzLm11dGF0aW9ucy5maWx0ZXIoKHgpID0+IHggIT09IG11dGF0aW9uKVxuICAgIHRoaXMubm90aWZ5KHsgdHlwZTogJ3JlbW92ZWQnLCBtdXRhdGlvbiB9KVxuICB9XG5cbiAgY2xlYXIoKTogdm9pZCB7XG4gICAgbm90aWZ5TWFuYWdlci5iYXRjaCgoKSA9PiB7XG4gICAgICB0aGlzLm11dGF0aW9ucy5mb3JFYWNoKChtdXRhdGlvbikgPT4ge1xuICAgICAgICB0aGlzLnJlbW92ZShtdXRhdGlvbilcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIGdldEFsbCgpOiBNdXRhdGlvbltdIHtcbiAgICByZXR1cm4gdGhpcy5tdXRhdGlvbnNcbiAgfVxuXG4gIGZpbmQ8VERhdGEgPSB1bmtub3duLCBURXJyb3IgPSB1bmtub3duLCBUVmFyaWFibGVzID0gYW55LCBUQ29udGV4dCA9IHVua25vd24+KFxuICAgIGZpbHRlcnM6IE11dGF0aW9uRmlsdGVycyxcbiAgKTogTXV0YXRpb248VERhdGEsIFRFcnJvciwgVFZhcmlhYmxlcywgVENvbnRleHQ+IHwgdW5kZWZpbmVkIHtcbiAgICBpZiAodHlwZW9mIGZpbHRlcnMuZXhhY3QgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBmaWx0ZXJzLmV4YWN0ID0gdHJ1ZVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLm11dGF0aW9ucy5maW5kKChtdXRhdGlvbikgPT4gbWF0Y2hNdXRhdGlvbihmaWx0ZXJzLCBtdXRhdGlvbikpXG4gIH1cblxuICBmaW5kQWxsKGZpbHRlcnM6IE11dGF0aW9uRmlsdGVycyk6IE11dGF0aW9uW10ge1xuICAgIHJldHVybiB0aGlzLm11dGF0aW9ucy5maWx0ZXIoKG11dGF0aW9uKSA9PiBtYXRjaE11dGF0aW9uKGZpbHRlcnMsIG11dGF0aW9uKSlcbiAgfVxuXG4gIG5vdGlmeShldmVudDogTXV0YXRpb25DYWNoZU5vdGlmeUV2ZW50KSB7XG4gICAgbm90aWZ5TWFuYWdlci5iYXRjaCgoKSA9PiB7XG4gICAgICB0aGlzLmxpc3RlbmVycy5mb3JFYWNoKCh7IGxpc3RlbmVyIH0pID0+IHtcbiAgICAgICAgbGlzdGVuZXIoZXZlbnQpXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICByZXN1bWVQYXVzZWRNdXRhdGlvbnMoKTogUHJvbWlzZTx1bmtub3duPiB7XG4gICAgdGhpcy5yZXN1bWluZyA9ICh0aGlzLnJlc3VtaW5nID8/IFByb21pc2UucmVzb2x2ZSgpKVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICBjb25zdCBwYXVzZWRNdXRhdGlvbnMgPSB0aGlzLm11dGF0aW9ucy5maWx0ZXIoKHgpID0+IHguc3RhdGUuaXNQYXVzZWQpXG4gICAgICAgIHJldHVybiBub3RpZnlNYW5hZ2VyLmJhdGNoKCgpID0+XG4gICAgICAgICAgcGF1c2VkTXV0YXRpb25zLnJlZHVjZShcbiAgICAgICAgICAgIChwcm9taXNlLCBtdXRhdGlvbikgPT5cbiAgICAgICAgICAgICAgcHJvbWlzZS50aGVuKCgpID0+IG11dGF0aW9uLmNvbnRpbnVlKCkuY2F0Y2gobm9vcCkpLFxuICAgICAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCkgYXMgUHJvbWlzZTx1bmtub3duPixcbiAgICAgICAgICApLFxuICAgICAgICApXG4gICAgICB9KVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLnJlc3VtaW5nID0gdW5kZWZpbmVkXG4gICAgICB9KVxuXG4gICAgcmV0dXJuIHRoaXMucmVzdW1pbmdcbiAgfVxufVxuIiwgImltcG9ydCB0eXBlIHsgUXVlcnlCZWhhdmlvciB9IGZyb20gJy4vcXVlcnknXG5cbmltcG9ydCB0eXBlIHtcbiAgSW5maW5pdGVEYXRhLFxuICBRdWVyeUZ1bmN0aW9uQ29udGV4dCxcbiAgUXVlcnlPcHRpb25zLFxuICBSZWZldGNoUXVlcnlGaWx0ZXJzLFxufSBmcm9tICcuL3R5cGVzJ1xuXG5leHBvcnQgZnVuY3Rpb24gaW5maW5pdGVRdWVyeUJlaGF2aW9yPFxuICBUUXVlcnlGbkRhdGEsXG4gIFRFcnJvcixcbiAgVERhdGEsXG4+KCk6IFF1ZXJ5QmVoYXZpb3I8VFF1ZXJ5Rm5EYXRhLCBURXJyb3IsIEluZmluaXRlRGF0YTxURGF0YT4+IHtcbiAgcmV0dXJuIHtcbiAgICBvbkZldGNoOiAoY29udGV4dCkgPT4ge1xuICAgICAgY29udGV4dC5mZXRjaEZuID0gKCkgPT4ge1xuICAgICAgICBjb25zdCByZWZldGNoUGFnZTogUmVmZXRjaFF1ZXJ5RmlsdGVyc1sncmVmZXRjaFBhZ2UnXSB8IHVuZGVmaW5lZCA9XG4gICAgICAgICAgY29udGV4dC5mZXRjaE9wdGlvbnM/Lm1ldGE/LnJlZmV0Y2hQYWdlXG4gICAgICAgIGNvbnN0IGZldGNoTW9yZSA9IGNvbnRleHQuZmV0Y2hPcHRpb25zPy5tZXRhPy5mZXRjaE1vcmVcbiAgICAgICAgY29uc3QgcGFnZVBhcmFtID0gZmV0Y2hNb3JlPy5wYWdlUGFyYW1cbiAgICAgICAgY29uc3QgaXNGZXRjaGluZ05leHRQYWdlID0gZmV0Y2hNb3JlPy5kaXJlY3Rpb24gPT09ICdmb3J3YXJkJ1xuICAgICAgICBjb25zdCBpc0ZldGNoaW5nUHJldmlvdXNQYWdlID0gZmV0Y2hNb3JlPy5kaXJlY3Rpb24gPT09ICdiYWNrd2FyZCdcbiAgICAgICAgY29uc3Qgb2xkUGFnZXMgPSBjb250ZXh0LnN0YXRlLmRhdGE/LnBhZ2VzIHx8IFtdXG4gICAgICAgIGNvbnN0IG9sZFBhZ2VQYXJhbXMgPSBjb250ZXh0LnN0YXRlLmRhdGE/LnBhZ2VQYXJhbXMgfHwgW11cbiAgICAgICAgbGV0IG5ld1BhZ2VQYXJhbXMgPSBvbGRQYWdlUGFyYW1zXG4gICAgICAgIGxldCBjYW5jZWxsZWQgPSBmYWxzZVxuXG4gICAgICAgIGNvbnN0IGFkZFNpZ25hbFByb3BlcnR5ID0gKG9iamVjdDogdW5rbm93bikgPT4ge1xuICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmplY3QsICdzaWduYWwnLCB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgZ2V0OiAoKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChjb250ZXh0LnNpZ25hbD8uYWJvcnRlZCkge1xuICAgICAgICAgICAgICAgIGNhbmNlbGxlZCA9IHRydWVcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb250ZXh0LnNpZ25hbD8uYWRkRXZlbnRMaXN0ZW5lcignYWJvcnQnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICBjYW5jZWxsZWQgPSB0cnVlXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gY29udGV4dC5zaWduYWxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEdldCBxdWVyeSBmdW5jdGlvblxuICAgICAgICBjb25zdCBxdWVyeUZuID1cbiAgICAgICAgICBjb250ZXh0Lm9wdGlvbnMucXVlcnlGbiB8fFxuICAgICAgICAgICgoKSA9PlxuICAgICAgICAgICAgUHJvbWlzZS5yZWplY3QoXG4gICAgICAgICAgICAgIGBNaXNzaW5nIHF1ZXJ5Rm4gZm9yIHF1ZXJ5S2V5ICcke2NvbnRleHQub3B0aW9ucy5xdWVyeUhhc2h9J2AsXG4gICAgICAgICAgICApKVxuXG4gICAgICAgIGNvbnN0IGJ1aWxkTmV3UGFnZXMgPSAoXG4gICAgICAgICAgcGFnZXM6IHVua25vd25bXSxcbiAgICAgICAgICBwYXJhbTogdW5rbm93bixcbiAgICAgICAgICBwYWdlOiB1bmtub3duLFxuICAgICAgICAgIHByZXZpb3VzPzogYm9vbGVhbixcbiAgICAgICAgKSA9PiB7XG4gICAgICAgICAgbmV3UGFnZVBhcmFtcyA9IHByZXZpb3VzXG4gICAgICAgICAgICA/IFtwYXJhbSwgLi4ubmV3UGFnZVBhcmFtc11cbiAgICAgICAgICAgIDogWy4uLm5ld1BhZ2VQYXJhbXMsIHBhcmFtXVxuICAgICAgICAgIHJldHVybiBwcmV2aW91cyA/IFtwYWdlLCAuLi5wYWdlc10gOiBbLi4ucGFnZXMsIHBhZ2VdXG4gICAgICAgIH1cblxuICAgICAgICAvLyBDcmVhdGUgZnVuY3Rpb24gdG8gZmV0Y2ggYSBwYWdlXG4gICAgICAgIGNvbnN0IGZldGNoUGFnZSA9IChcbiAgICAgICAgICBwYWdlczogdW5rbm93bltdLFxuICAgICAgICAgIG1hbnVhbD86IGJvb2xlYW4sXG4gICAgICAgICAgcGFyYW0/OiB1bmtub3duLFxuICAgICAgICAgIHByZXZpb3VzPzogYm9vbGVhbixcbiAgICAgICAgKTogUHJvbWlzZTx1bmtub3duW10+ID0+IHtcbiAgICAgICAgICBpZiAoY2FuY2VsbGVkKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoJ0NhbmNlbGxlZCcpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHR5cGVvZiBwYXJhbSA9PT0gJ3VuZGVmaW5lZCcgJiYgIW1hbnVhbCAmJiBwYWdlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocGFnZXMpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgcXVlcnlGbkNvbnRleHQ6IFF1ZXJ5RnVuY3Rpb25Db250ZXh0ID0ge1xuICAgICAgICAgICAgcXVlcnlLZXk6IGNvbnRleHQucXVlcnlLZXksXG4gICAgICAgICAgICBwYWdlUGFyYW06IHBhcmFtLFxuICAgICAgICAgICAgbWV0YTogY29udGV4dC5vcHRpb25zLm1ldGEsXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYWRkU2lnbmFsUHJvcGVydHkocXVlcnlGbkNvbnRleHQpXG5cbiAgICAgICAgICBjb25zdCBxdWVyeUZuUmVzdWx0ID0gcXVlcnlGbihxdWVyeUZuQ29udGV4dClcblxuICAgICAgICAgIGNvbnN0IHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUocXVlcnlGblJlc3VsdCkudGhlbigocGFnZSkgPT5cbiAgICAgICAgICAgIGJ1aWxkTmV3UGFnZXMocGFnZXMsIHBhcmFtLCBwYWdlLCBwcmV2aW91cyksXG4gICAgICAgICAgKVxuXG4gICAgICAgICAgcmV0dXJuIHByb21pc2VcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwcm9taXNlOiBQcm9taXNlPHVua25vd25bXT5cblxuICAgICAgICAvLyBGZXRjaCBmaXJzdCBwYWdlP1xuICAgICAgICBpZiAoIW9sZFBhZ2VzLmxlbmd0aCkge1xuICAgICAgICAgIHByb21pc2UgPSBmZXRjaFBhZ2UoW10pXG4gICAgICAgIH1cblxuICAgICAgICAvLyBGZXRjaCBuZXh0IHBhZ2U/XG4gICAgICAgIGVsc2UgaWYgKGlzRmV0Y2hpbmdOZXh0UGFnZSkge1xuICAgICAgICAgIGNvbnN0IG1hbnVhbCA9IHR5cGVvZiBwYWdlUGFyYW0gIT09ICd1bmRlZmluZWQnXG4gICAgICAgICAgY29uc3QgcGFyYW0gPSBtYW51YWxcbiAgICAgICAgICAgID8gcGFnZVBhcmFtXG4gICAgICAgICAgICA6IGdldE5leHRQYWdlUGFyYW0oY29udGV4dC5vcHRpb25zLCBvbGRQYWdlcylcbiAgICAgICAgICBwcm9taXNlID0gZmV0Y2hQYWdlKG9sZFBhZ2VzLCBtYW51YWwsIHBhcmFtKVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gRmV0Y2ggcHJldmlvdXMgcGFnZT9cbiAgICAgICAgZWxzZSBpZiAoaXNGZXRjaGluZ1ByZXZpb3VzUGFnZSkge1xuICAgICAgICAgIGNvbnN0IG1hbnVhbCA9IHR5cGVvZiBwYWdlUGFyYW0gIT09ICd1bmRlZmluZWQnXG4gICAgICAgICAgY29uc3QgcGFyYW0gPSBtYW51YWxcbiAgICAgICAgICAgID8gcGFnZVBhcmFtXG4gICAgICAgICAgICA6IGdldFByZXZpb3VzUGFnZVBhcmFtKGNvbnRleHQub3B0aW9ucywgb2xkUGFnZXMpXG4gICAgICAgICAgcHJvbWlzZSA9IGZldGNoUGFnZShvbGRQYWdlcywgbWFudWFsLCBwYXJhbSwgdHJ1ZSlcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJlZmV0Y2ggcGFnZXNcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgbmV3UGFnZVBhcmFtcyA9IFtdXG5cbiAgICAgICAgICBjb25zdCBtYW51YWwgPSB0eXBlb2YgY29udGV4dC5vcHRpb25zLmdldE5leHRQYWdlUGFyYW0gPT09ICd1bmRlZmluZWQnXG5cbiAgICAgICAgICBjb25zdCBzaG91bGRGZXRjaEZpcnN0UGFnZSA9XG4gICAgICAgICAgICByZWZldGNoUGFnZSAmJiBvbGRQYWdlc1swXVxuICAgICAgICAgICAgICA/IHJlZmV0Y2hQYWdlKG9sZFBhZ2VzWzBdLCAwLCBvbGRQYWdlcylcbiAgICAgICAgICAgICAgOiB0cnVlXG5cbiAgICAgICAgICAvLyBGZXRjaCBmaXJzdCBwYWdlXG4gICAgICAgICAgcHJvbWlzZSA9IHNob3VsZEZldGNoRmlyc3RQYWdlXG4gICAgICAgICAgICA/IGZldGNoUGFnZShbXSwgbWFudWFsLCBvbGRQYWdlUGFyYW1zWzBdKVxuICAgICAgICAgICAgOiBQcm9taXNlLnJlc29sdmUoYnVpbGROZXdQYWdlcyhbXSwgb2xkUGFnZVBhcmFtc1swXSwgb2xkUGFnZXNbMF0pKVxuXG4gICAgICAgICAgLy8gRmV0Y2ggcmVtYWluaW5nIHBhZ2VzXG4gICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBvbGRQYWdlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcHJvbWlzZSA9IHByb21pc2UudGhlbigocGFnZXMpID0+IHtcbiAgICAgICAgICAgICAgY29uc3Qgc2hvdWxkRmV0Y2hOZXh0UGFnZSA9XG4gICAgICAgICAgICAgICAgcmVmZXRjaFBhZ2UgJiYgb2xkUGFnZXNbaV1cbiAgICAgICAgICAgICAgICAgID8gcmVmZXRjaFBhZ2Uob2xkUGFnZXNbaV0sIGksIG9sZFBhZ2VzKVxuICAgICAgICAgICAgICAgICAgOiB0cnVlXG5cbiAgICAgICAgICAgICAgaWYgKHNob3VsZEZldGNoTmV4dFBhZ2UpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwYXJhbSA9IG1hbnVhbFxuICAgICAgICAgICAgICAgICAgPyBvbGRQYWdlUGFyYW1zW2ldXG4gICAgICAgICAgICAgICAgICA6IGdldE5leHRQYWdlUGFyYW0oY29udGV4dC5vcHRpb25zLCBwYWdlcylcbiAgICAgICAgICAgICAgICByZXR1cm4gZmV0Y2hQYWdlKHBhZ2VzLCBtYW51YWwsIHBhcmFtKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoXG4gICAgICAgICAgICAgICAgYnVpbGROZXdQYWdlcyhwYWdlcywgb2xkUGFnZVBhcmFtc1tpXSwgb2xkUGFnZXNbaV0pLFxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGZpbmFsUHJvbWlzZSA9IHByb21pc2UudGhlbigocGFnZXMpID0+ICh7XG4gICAgICAgICAgcGFnZXMsXG4gICAgICAgICAgcGFnZVBhcmFtczogbmV3UGFnZVBhcmFtcyxcbiAgICAgICAgfSkpXG5cbiAgICAgICAgcmV0dXJuIGZpbmFsUHJvbWlzZVxuICAgICAgfVxuICAgIH0sXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldE5leHRQYWdlUGFyYW0oXG4gIG9wdGlvbnM6IFF1ZXJ5T3B0aW9uczxhbnksIGFueT4sXG4gIHBhZ2VzOiB1bmtub3duW10sXG4pOiB1bmtub3duIHwgdW5kZWZpbmVkIHtcbiAgcmV0dXJuIG9wdGlvbnMuZ2V0TmV4dFBhZ2VQYXJhbT8uKHBhZ2VzW3BhZ2VzLmxlbmd0aCAtIDFdLCBwYWdlcylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFByZXZpb3VzUGFnZVBhcmFtKFxuICBvcHRpb25zOiBRdWVyeU9wdGlvbnM8YW55LCBhbnk+LFxuICBwYWdlczogdW5rbm93bltdLFxuKTogdW5rbm93biB8IHVuZGVmaW5lZCB7XG4gIHJldHVybiBvcHRpb25zLmdldFByZXZpb3VzUGFnZVBhcmFtPy4ocGFnZXNbMF0sIHBhZ2VzKVxufVxuXG4vKipcbiAqIENoZWNrcyBpZiB0aGVyZSBpcyBhIG5leHQgcGFnZS5cbiAqIFJldHVybnMgYHVuZGVmaW5lZGAgaWYgaXQgY2Fubm90IGJlIGRldGVybWluZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoYXNOZXh0UGFnZShcbiAgb3B0aW9uczogUXVlcnlPcHRpb25zPGFueSwgYW55LCBhbnksIGFueT4sXG4gIHBhZ2VzPzogdW5rbm93bixcbik6IGJvb2xlYW4gfCB1bmRlZmluZWQge1xuICBpZiAob3B0aW9ucy5nZXROZXh0UGFnZVBhcmFtICYmIEFycmF5LmlzQXJyYXkocGFnZXMpKSB7XG4gICAgY29uc3QgbmV4dFBhZ2VQYXJhbSA9IGdldE5leHRQYWdlUGFyYW0ob3B0aW9ucywgcGFnZXMpXG4gICAgcmV0dXJuIChcbiAgICAgIHR5cGVvZiBuZXh0UGFnZVBhcmFtICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgbmV4dFBhZ2VQYXJhbSAhPT0gbnVsbCAmJlxuICAgICAgbmV4dFBhZ2VQYXJhbSAhPT0gZmFsc2VcbiAgICApXG4gIH1cbiAgcmV0dXJuXG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIHRoZXJlIGlzIGEgcHJldmlvdXMgcGFnZS5cbiAqIFJldHVybnMgYHVuZGVmaW5lZGAgaWYgaXQgY2Fubm90IGJlIGRldGVybWluZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoYXNQcmV2aW91c1BhZ2UoXG4gIG9wdGlvbnM6IFF1ZXJ5T3B0aW9uczxhbnksIGFueSwgYW55LCBhbnk+LFxuICBwYWdlcz86IHVua25vd24sXG4pOiBib29sZWFuIHwgdW5kZWZpbmVkIHtcbiAgaWYgKG9wdGlvbnMuZ2V0UHJldmlvdXNQYWdlUGFyYW0gJiYgQXJyYXkuaXNBcnJheShwYWdlcykpIHtcbiAgICBjb25zdCBwcmV2aW91c1BhZ2VQYXJhbSA9IGdldFByZXZpb3VzUGFnZVBhcmFtKG9wdGlvbnMsIHBhZ2VzKVxuICAgIHJldHVybiAoXG4gICAgICB0eXBlb2YgcHJldmlvdXNQYWdlUGFyYW0gIT09ICd1bmRlZmluZWQnICYmXG4gICAgICBwcmV2aW91c1BhZ2VQYXJhbSAhPT0gbnVsbCAmJlxuICAgICAgcHJldmlvdXNQYWdlUGFyYW0gIT09IGZhbHNlXG4gICAgKVxuICB9XG4gIHJldHVyblxufVxuIiwgImltcG9ydCB7XG4gIGZ1bmN0aW9uYWxVcGRhdGUsXG4gIGhhc2hRdWVyeUtleSxcbiAgaGFzaFF1ZXJ5S2V5QnlPcHRpb25zLFxuICBub29wLFxuICBwYXJzZUZpbHRlckFyZ3MsXG4gIHBhcnNlUXVlcnlBcmdzLFxuICBwYXJ0aWFsTWF0Y2hLZXksXG59IGZyb20gJy4vdXRpbHMnXG5pbXBvcnQgeyBRdWVyeUNhY2hlIH0gZnJvbSAnLi9xdWVyeUNhY2hlJ1xuaW1wb3J0IHsgTXV0YXRpb25DYWNoZSB9IGZyb20gJy4vbXV0YXRpb25DYWNoZSdcbmltcG9ydCB7IGZvY3VzTWFuYWdlciB9IGZyb20gJy4vZm9jdXNNYW5hZ2VyJ1xuaW1wb3J0IHsgb25saW5lTWFuYWdlciB9IGZyb20gJy4vb25saW5lTWFuYWdlcidcbmltcG9ydCB7IG5vdGlmeU1hbmFnZXIgfSBmcm9tICcuL25vdGlmeU1hbmFnZXInXG5pbXBvcnQgeyBpbmZpbml0ZVF1ZXJ5QmVoYXZpb3IgfSBmcm9tICcuL2luZmluaXRlUXVlcnlCZWhhdmlvcidcbmltcG9ydCB7IGRlZmF1bHRMb2dnZXIgfSBmcm9tICcuL2xvZ2dlcidcbmltcG9ydCB0eXBlIHsgQ2FuY2VsT3B0aW9ucywgRGVmYXVsdGVkUXVlcnlPYnNlcnZlck9wdGlvbnMgfSBmcm9tICcuL3R5cGVzJ1xuaW1wb3J0IHR5cGUgeyBMb2dnZXIgfSBmcm9tICcuL2xvZ2dlcidcbmltcG9ydCB0eXBlIHsgUXVlcnlTdGF0ZSB9IGZyb20gJy4vcXVlcnknXG5pbXBvcnQgdHlwZSB7XG4gIERlZmF1bHRPcHRpb25zLFxuICBGZXRjaEluZmluaXRlUXVlcnlPcHRpb25zLFxuICBGZXRjaFF1ZXJ5T3B0aW9ucyxcbiAgSW5maW5pdGVEYXRhLFxuICBJbnZhbGlkYXRlT3B0aW9ucyxcbiAgSW52YWxpZGF0ZVF1ZXJ5RmlsdGVycyxcbiAgTXV0YXRpb25LZXksXG4gIE11dGF0aW9uT2JzZXJ2ZXJPcHRpb25zLFxuICBNdXRhdGlvbk9wdGlvbnMsXG4gIFF1ZXJ5Q2xpZW50Q29uZmlnLFxuICBRdWVyeUZ1bmN0aW9uLFxuICBRdWVyeUtleSxcbiAgUXVlcnlPYnNlcnZlck9wdGlvbnMsXG4gIFF1ZXJ5T3B0aW9ucyxcbiAgUmVmZXRjaE9wdGlvbnMsXG4gIFJlZmV0Y2hRdWVyeUZpbHRlcnMsXG4gIFJlc2V0T3B0aW9ucyxcbiAgUmVzZXRRdWVyeUZpbHRlcnMsXG4gIFNldERhdGFPcHRpb25zLFxuICBXaXRoUmVxdWlyZWQsXG59IGZyb20gJy4vdHlwZXMnXG5pbXBvcnQgdHlwZSB7IE11dGF0aW9uRmlsdGVycywgUXVlcnlGaWx0ZXJzLCBVcGRhdGVyIH0gZnJvbSAnLi91dGlscydcblxuLy8gVFlQRVNcblxuaW50ZXJmYWNlIFF1ZXJ5RGVmYXVsdHMge1xuICBxdWVyeUtleTogUXVlcnlLZXlcbiAgZGVmYXVsdE9wdGlvbnM6IFF1ZXJ5T3B0aW9uczxhbnksIGFueSwgYW55PlxufVxuXG5pbnRlcmZhY2UgTXV0YXRpb25EZWZhdWx0cyB7XG4gIG11dGF0aW9uS2V5OiBNdXRhdGlvbktleVxuICBkZWZhdWx0T3B0aW9uczogTXV0YXRpb25PcHRpb25zPGFueSwgYW55LCBhbnksIGFueT5cbn1cblxuLy8gQ0xBU1NcblxuZXhwb3J0IGNsYXNzIFF1ZXJ5Q2xpZW50IHtcbiAgcHJpdmF0ZSBxdWVyeUNhY2hlOiBRdWVyeUNhY2hlXG4gIHByaXZhdGUgbXV0YXRpb25DYWNoZTogTXV0YXRpb25DYWNoZVxuICBwcml2YXRlIGxvZ2dlcjogTG9nZ2VyXG4gIHByaXZhdGUgZGVmYXVsdE9wdGlvbnM6IERlZmF1bHRPcHRpb25zXG4gIHByaXZhdGUgcXVlcnlEZWZhdWx0czogUXVlcnlEZWZhdWx0c1tdXG4gIHByaXZhdGUgbXV0YXRpb25EZWZhdWx0czogTXV0YXRpb25EZWZhdWx0c1tdXG4gIHByaXZhdGUgbW91bnRDb3VudDogbnVtYmVyXG4gIHByaXZhdGUgdW5zdWJzY3JpYmVGb2N1cz86ICgpID0+IHZvaWRcbiAgcHJpdmF0ZSB1bnN1YnNjcmliZU9ubGluZT86ICgpID0+IHZvaWRcblxuICBjb25zdHJ1Y3Rvcihjb25maWc6IFF1ZXJ5Q2xpZW50Q29uZmlnID0ge30pIHtcbiAgICB0aGlzLnF1ZXJ5Q2FjaGUgPSBjb25maWcucXVlcnlDYWNoZSB8fCBuZXcgUXVlcnlDYWNoZSgpXG4gICAgdGhpcy5tdXRhdGlvbkNhY2hlID0gY29uZmlnLm11dGF0aW9uQ2FjaGUgfHwgbmV3IE11dGF0aW9uQ2FjaGUoKVxuICAgIHRoaXMubG9nZ2VyID0gY29uZmlnLmxvZ2dlciB8fCBkZWZhdWx0TG9nZ2VyXG4gICAgdGhpcy5kZWZhdWx0T3B0aW9ucyA9IGNvbmZpZy5kZWZhdWx0T3B0aW9ucyB8fCB7fVxuICAgIHRoaXMucXVlcnlEZWZhdWx0cyA9IFtdXG4gICAgdGhpcy5tdXRhdGlvbkRlZmF1bHRzID0gW11cbiAgICB0aGlzLm1vdW50Q291bnQgPSAwXG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiBjb25maWcubG9nZ2VyKSB7XG4gICAgICB0aGlzLmxvZ2dlci5lcnJvcihcbiAgICAgICAgYFBhc3NpbmcgYSBjdXN0b20gbG9nZ2VyIGhhcyBiZWVuIGRlcHJlY2F0ZWQgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgbmV4dCBtYWpvciB2ZXJzaW9uLmAsXG4gICAgICApXG4gICAgfVxuICB9XG5cbiAgbW91bnQoKTogdm9pZCB7XG4gICAgdGhpcy5tb3VudENvdW50KytcbiAgICBpZiAodGhpcy5tb3VudENvdW50ICE9PSAxKSByZXR1cm5cblxuICAgIHRoaXMudW5zdWJzY3JpYmVGb2N1cyA9IGZvY3VzTWFuYWdlci5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgaWYgKGZvY3VzTWFuYWdlci5pc0ZvY3VzZWQoKSkge1xuICAgICAgICB0aGlzLnJlc3VtZVBhdXNlZE11dGF0aW9ucygpXG4gICAgICAgIHRoaXMucXVlcnlDYWNoZS5vbkZvY3VzKClcbiAgICAgIH1cbiAgICB9KVxuICAgIHRoaXMudW5zdWJzY3JpYmVPbmxpbmUgPSBvbmxpbmVNYW5hZ2VyLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBpZiAob25saW5lTWFuYWdlci5pc09ubGluZSgpKSB7XG4gICAgICAgIHRoaXMucmVzdW1lUGF1c2VkTXV0YXRpb25zKClcbiAgICAgICAgdGhpcy5xdWVyeUNhY2hlLm9uT25saW5lKClcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgdW5tb3VudCgpOiB2b2lkIHtcbiAgICB0aGlzLm1vdW50Q291bnQtLVxuICAgIGlmICh0aGlzLm1vdW50Q291bnQgIT09IDApIHJldHVyblxuXG4gICAgdGhpcy51bnN1YnNjcmliZUZvY3VzPy4oKVxuICAgIHRoaXMudW5zdWJzY3JpYmVGb2N1cyA9IHVuZGVmaW5lZFxuXG4gICAgdGhpcy51bnN1YnNjcmliZU9ubGluZT8uKClcbiAgICB0aGlzLnVuc3Vic2NyaWJlT25saW5lID0gdW5kZWZpbmVkXG4gIH1cblxuICBpc0ZldGNoaW5nKGZpbHRlcnM/OiBRdWVyeUZpbHRlcnMpOiBudW1iZXJcbiAgaXNGZXRjaGluZyhxdWVyeUtleT86IFF1ZXJ5S2V5LCBmaWx0ZXJzPzogUXVlcnlGaWx0ZXJzKTogbnVtYmVyXG4gIGlzRmV0Y2hpbmcoYXJnMT86IFF1ZXJ5S2V5IHwgUXVlcnlGaWx0ZXJzLCBhcmcyPzogUXVlcnlGaWx0ZXJzKTogbnVtYmVyIHtcbiAgICBjb25zdCBbZmlsdGVyc10gPSBwYXJzZUZpbHRlckFyZ3MoYXJnMSwgYXJnMilcbiAgICBmaWx0ZXJzLmZldGNoU3RhdHVzID0gJ2ZldGNoaW5nJ1xuICAgIHJldHVybiB0aGlzLnF1ZXJ5Q2FjaGUuZmluZEFsbChmaWx0ZXJzKS5sZW5ndGhcbiAgfVxuXG4gIGlzTXV0YXRpbmcoZmlsdGVycz86IE11dGF0aW9uRmlsdGVycyk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMubXV0YXRpb25DYWNoZS5maW5kQWxsKHsgLi4uZmlsdGVycywgZmV0Y2hpbmc6IHRydWUgfSkubGVuZ3RoXG4gIH1cblxuICBnZXRRdWVyeURhdGE8VFF1ZXJ5Rm5EYXRhID0gdW5rbm93bj4oXG4gICAgcXVlcnlLZXk6IFF1ZXJ5S2V5LFxuICAgIGZpbHRlcnM/OiBRdWVyeUZpbHRlcnMsXG4gICk6IFRRdWVyeUZuRGF0YSB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMucXVlcnlDYWNoZS5maW5kPFRRdWVyeUZuRGF0YT4ocXVlcnlLZXksIGZpbHRlcnMpPy5zdGF0ZS5kYXRhXG4gIH1cblxuICBlbnN1cmVRdWVyeURhdGE8XG4gICAgVFF1ZXJ5Rm5EYXRhID0gdW5rbm93bixcbiAgICBURXJyb3IgPSB1bmtub3duLFxuICAgIFREYXRhID0gVFF1ZXJ5Rm5EYXRhLFxuICAgIFRRdWVyeUtleSBleHRlbmRzIFF1ZXJ5S2V5ID0gUXVlcnlLZXksXG4gID4oXG4gICAgb3B0aW9uczogV2l0aFJlcXVpcmVkPFxuICAgICAgRmV0Y2hRdWVyeU9wdGlvbnM8VFF1ZXJ5Rm5EYXRhLCBURXJyb3IsIFREYXRhLCBUUXVlcnlLZXk+LFxuICAgICAgJ3F1ZXJ5S2V5J1xuICAgID4sXG4gICk6IFByb21pc2U8VERhdGE+XG4gIGVuc3VyZVF1ZXJ5RGF0YTxcbiAgICBUUXVlcnlGbkRhdGEgPSB1bmtub3duLFxuICAgIFRFcnJvciA9IHVua25vd24sXG4gICAgVERhdGEgPSBUUXVlcnlGbkRhdGEsXG4gICAgVFF1ZXJ5S2V5IGV4dGVuZHMgUXVlcnlLZXkgPSBRdWVyeUtleSxcbiAgPihcbiAgICBxdWVyeUtleTogVFF1ZXJ5S2V5LFxuICAgIG9wdGlvbnM/OiBPbWl0PFxuICAgICAgRmV0Y2hRdWVyeU9wdGlvbnM8VFF1ZXJ5Rm5EYXRhLCBURXJyb3IsIFREYXRhLCBUUXVlcnlLZXk+LFxuICAgICAgJ3F1ZXJ5S2V5J1xuICAgID4sXG4gICk6IFByb21pc2U8VERhdGE+XG4gIGVuc3VyZVF1ZXJ5RGF0YTxcbiAgICBUUXVlcnlGbkRhdGEgPSB1bmtub3duLFxuICAgIFRFcnJvciA9IHVua25vd24sXG4gICAgVERhdGEgPSBUUXVlcnlGbkRhdGEsXG4gICAgVFF1ZXJ5S2V5IGV4dGVuZHMgUXVlcnlLZXkgPSBRdWVyeUtleSxcbiAgPihcbiAgICBxdWVyeUtleTogVFF1ZXJ5S2V5LFxuICAgIHF1ZXJ5Rm46IFF1ZXJ5RnVuY3Rpb248VFF1ZXJ5Rm5EYXRhLCBUUXVlcnlLZXk+LFxuICAgIG9wdGlvbnM/OiBPbWl0PFxuICAgICAgRmV0Y2hRdWVyeU9wdGlvbnM8VFF1ZXJ5Rm5EYXRhLCBURXJyb3IsIFREYXRhLCBUUXVlcnlLZXk+LFxuICAgICAgJ3F1ZXJ5S2V5JyB8ICdxdWVyeUZuJ1xuICAgID4sXG4gICk6IFByb21pc2U8VERhdGE+XG4gIGVuc3VyZVF1ZXJ5RGF0YTxcbiAgICBUUXVlcnlGbkRhdGEsXG4gICAgVEVycm9yLFxuICAgIFREYXRhID0gVFF1ZXJ5Rm5EYXRhLFxuICAgIFRRdWVyeUtleSBleHRlbmRzIFF1ZXJ5S2V5ID0gUXVlcnlLZXksXG4gID4oXG4gICAgYXJnMTpcbiAgICAgIHwgVFF1ZXJ5S2V5XG4gICAgICB8IFdpdGhSZXF1aXJlZDxcbiAgICAgICAgICBGZXRjaFF1ZXJ5T3B0aW9uczxUUXVlcnlGbkRhdGEsIFRFcnJvciwgVERhdGEsIFRRdWVyeUtleT4sXG4gICAgICAgICAgJ3F1ZXJ5S2V5J1xuICAgICAgICA+LFxuICAgIGFyZzI/OlxuICAgICAgfCBRdWVyeUZ1bmN0aW9uPFRRdWVyeUZuRGF0YSwgVFF1ZXJ5S2V5PlxuICAgICAgfCBGZXRjaFF1ZXJ5T3B0aW9uczxUUXVlcnlGbkRhdGEsIFRFcnJvciwgVERhdGEsIFRRdWVyeUtleT4sXG4gICAgYXJnMz86IEZldGNoUXVlcnlPcHRpb25zPFRRdWVyeUZuRGF0YSwgVEVycm9yLCBURGF0YSwgVFF1ZXJ5S2V5PixcbiAgKTogUHJvbWlzZTxURGF0YT4ge1xuICAgIGNvbnN0IHBhcnNlZE9wdGlvbnMgPSBwYXJzZVF1ZXJ5QXJncyhhcmcxLCBhcmcyLCBhcmczKVxuICAgIGNvbnN0IGNhY2hlZERhdGEgPSB0aGlzLmdldFF1ZXJ5RGF0YTxURGF0YT4ocGFyc2VkT3B0aW9ucy5xdWVyeUtleSEpXG5cbiAgICByZXR1cm4gY2FjaGVkRGF0YVxuICAgICAgPyBQcm9taXNlLnJlc29sdmUoY2FjaGVkRGF0YSlcbiAgICAgIDogdGhpcy5mZXRjaFF1ZXJ5KHBhcnNlZE9wdGlvbnMpXG4gIH1cblxuICBnZXRRdWVyaWVzRGF0YTxUUXVlcnlGbkRhdGEgPSB1bmtub3duPihcbiAgICBxdWVyeUtleTogUXVlcnlLZXksXG4gICk6IFtRdWVyeUtleSwgVFF1ZXJ5Rm5EYXRhIHwgdW5kZWZpbmVkXVtdXG4gIGdldFF1ZXJpZXNEYXRhPFRRdWVyeUZuRGF0YSA9IHVua25vd24+KFxuICAgIGZpbHRlcnM6IFF1ZXJ5RmlsdGVycyxcbiAgKTogW1F1ZXJ5S2V5LCBUUXVlcnlGbkRhdGEgfCB1bmRlZmluZWRdW11cbiAgZ2V0UXVlcmllc0RhdGE8VFF1ZXJ5Rm5EYXRhID0gdW5rbm93bj4oXG4gICAgcXVlcnlLZXlPckZpbHRlcnM6IFF1ZXJ5S2V5IHwgUXVlcnlGaWx0ZXJzLFxuICApOiBbUXVlcnlLZXksIFRRdWVyeUZuRGF0YSB8IHVuZGVmaW5lZF1bXSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0UXVlcnlDYWNoZSgpXG4gICAgICAuZmluZEFsbChxdWVyeUtleU9yRmlsdGVycylcbiAgICAgIC5tYXAoKHsgcXVlcnlLZXksIHN0YXRlIH0pID0+IHtcbiAgICAgICAgY29uc3QgZGF0YSA9IHN0YXRlLmRhdGEgYXMgVFF1ZXJ5Rm5EYXRhIHwgdW5kZWZpbmVkXG4gICAgICAgIHJldHVybiBbcXVlcnlLZXksIGRhdGFdXG4gICAgICB9KVxuICB9XG5cbiAgc2V0UXVlcnlEYXRhPFRRdWVyeUZuRGF0YT4oXG4gICAgcXVlcnlLZXk6IFF1ZXJ5S2V5LFxuICAgIHVwZGF0ZXI6IFVwZGF0ZXI8VFF1ZXJ5Rm5EYXRhIHwgdW5kZWZpbmVkLCBUUXVlcnlGbkRhdGEgfCB1bmRlZmluZWQ+LFxuICAgIG9wdGlvbnM/OiBTZXREYXRhT3B0aW9ucyxcbiAgKTogVFF1ZXJ5Rm5EYXRhIHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCBxdWVyeSA9IHRoaXMucXVlcnlDYWNoZS5maW5kPFRRdWVyeUZuRGF0YT4ocXVlcnlLZXkpXG4gICAgY29uc3QgcHJldkRhdGEgPSBxdWVyeT8uc3RhdGUuZGF0YVxuICAgIGNvbnN0IGRhdGEgPSBmdW5jdGlvbmFsVXBkYXRlKHVwZGF0ZXIsIHByZXZEYXRhKVxuXG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgIH1cblxuICAgIGNvbnN0IHBhcnNlZE9wdGlvbnMgPSBwYXJzZVF1ZXJ5QXJncyhxdWVyeUtleSlcbiAgICBjb25zdCBkZWZhdWx0ZWRPcHRpb25zID0gdGhpcy5kZWZhdWx0UXVlcnlPcHRpb25zKHBhcnNlZE9wdGlvbnMpXG4gICAgcmV0dXJuIHRoaXMucXVlcnlDYWNoZVxuICAgICAgLmJ1aWxkKHRoaXMsIGRlZmF1bHRlZE9wdGlvbnMpXG4gICAgICAuc2V0RGF0YShkYXRhLCB7IC4uLm9wdGlvbnMsIG1hbnVhbDogdHJ1ZSB9KVxuICB9XG5cbiAgc2V0UXVlcmllc0RhdGE8VFF1ZXJ5Rm5EYXRhPihcbiAgICBxdWVyeUtleTogUXVlcnlLZXksXG4gICAgdXBkYXRlcjogVXBkYXRlcjxUUXVlcnlGbkRhdGEgfCB1bmRlZmluZWQsIFRRdWVyeUZuRGF0YSB8IHVuZGVmaW5lZD4sXG4gICAgb3B0aW9ucz86IFNldERhdGFPcHRpb25zLFxuICApOiBbUXVlcnlLZXksIFRRdWVyeUZuRGF0YSB8IHVuZGVmaW5lZF1bXVxuXG4gIHNldFF1ZXJpZXNEYXRhPFRRdWVyeUZuRGF0YT4oXG4gICAgZmlsdGVyczogUXVlcnlGaWx0ZXJzLFxuICAgIHVwZGF0ZXI6IFVwZGF0ZXI8VFF1ZXJ5Rm5EYXRhIHwgdW5kZWZpbmVkLCBUUXVlcnlGbkRhdGEgfCB1bmRlZmluZWQ+LFxuICAgIG9wdGlvbnM/OiBTZXREYXRhT3B0aW9ucyxcbiAgKTogW1F1ZXJ5S2V5LCBUUXVlcnlGbkRhdGEgfCB1bmRlZmluZWRdW11cblxuICBzZXRRdWVyaWVzRGF0YTxUUXVlcnlGbkRhdGE+KFxuICAgIHF1ZXJ5S2V5T3JGaWx0ZXJzOiBRdWVyeUtleSB8IFF1ZXJ5RmlsdGVycyxcbiAgICB1cGRhdGVyOiBVcGRhdGVyPFRRdWVyeUZuRGF0YSB8IHVuZGVmaW5lZCwgVFF1ZXJ5Rm5EYXRhIHwgdW5kZWZpbmVkPixcbiAgICBvcHRpb25zPzogU2V0RGF0YU9wdGlvbnMsXG4gICk6IFtRdWVyeUtleSwgVFF1ZXJ5Rm5EYXRhIHwgdW5kZWZpbmVkXVtdIHtcbiAgICByZXR1cm4gbm90aWZ5TWFuYWdlci5iYXRjaCgoKSA9PlxuICAgICAgdGhpcy5nZXRRdWVyeUNhY2hlKClcbiAgICAgICAgLmZpbmRBbGwocXVlcnlLZXlPckZpbHRlcnMpXG4gICAgICAgIC5tYXAoKHsgcXVlcnlLZXkgfSkgPT4gW1xuICAgICAgICAgIHF1ZXJ5S2V5LFxuICAgICAgICAgIHRoaXMuc2V0UXVlcnlEYXRhPFRRdWVyeUZuRGF0YT4ocXVlcnlLZXksIHVwZGF0ZXIsIG9wdGlvbnMpLFxuICAgICAgICBdKSxcbiAgICApXG4gIH1cblxuICBnZXRRdWVyeVN0YXRlPFRRdWVyeUZuRGF0YSA9IHVua25vd24sIFRFcnJvciA9IHVuZGVmaW5lZD4oXG4gICAgcXVlcnlLZXk6IFF1ZXJ5S2V5LFxuICAgIGZpbHRlcnM/OiBRdWVyeUZpbHRlcnMsXG4gICk6IFF1ZXJ5U3RhdGU8VFF1ZXJ5Rm5EYXRhLCBURXJyb3I+IHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5xdWVyeUNhY2hlLmZpbmQ8VFF1ZXJ5Rm5EYXRhLCBURXJyb3I+KHF1ZXJ5S2V5LCBmaWx0ZXJzKT8uc3RhdGVcbiAgfVxuXG4gIHJlbW92ZVF1ZXJpZXMoZmlsdGVycz86IFF1ZXJ5RmlsdGVycyk6IHZvaWRcbiAgcmVtb3ZlUXVlcmllcyhxdWVyeUtleT86IFF1ZXJ5S2V5LCBmaWx0ZXJzPzogUXVlcnlGaWx0ZXJzKTogdm9pZFxuICByZW1vdmVRdWVyaWVzKGFyZzE/OiBRdWVyeUtleSB8IFF1ZXJ5RmlsdGVycywgYXJnMj86IFF1ZXJ5RmlsdGVycyk6IHZvaWQge1xuICAgIGNvbnN0IFtmaWx0ZXJzXSA9IHBhcnNlRmlsdGVyQXJncyhhcmcxLCBhcmcyKVxuICAgIGNvbnN0IHF1ZXJ5Q2FjaGUgPSB0aGlzLnF1ZXJ5Q2FjaGVcbiAgICBub3RpZnlNYW5hZ2VyLmJhdGNoKCgpID0+IHtcbiAgICAgIHF1ZXJ5Q2FjaGUuZmluZEFsbChmaWx0ZXJzKS5mb3JFYWNoKChxdWVyeSkgPT4ge1xuICAgICAgICBxdWVyeUNhY2hlLnJlbW92ZShxdWVyeSlcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIHJlc2V0UXVlcmllczxUUGFnZURhdGEgPSB1bmtub3duPihcbiAgICBmaWx0ZXJzPzogUmVzZXRRdWVyeUZpbHRlcnM8VFBhZ2VEYXRhPixcbiAgICBvcHRpb25zPzogUmVzZXRPcHRpb25zLFxuICApOiBQcm9taXNlPHZvaWQ+XG4gIHJlc2V0UXVlcmllczxUUGFnZURhdGEgPSB1bmtub3duPihcbiAgICBxdWVyeUtleT86IFF1ZXJ5S2V5LFxuICAgIGZpbHRlcnM/OiBSZXNldFF1ZXJ5RmlsdGVyczxUUGFnZURhdGE+LFxuICAgIG9wdGlvbnM/OiBSZXNldE9wdGlvbnMsXG4gICk6IFByb21pc2U8dm9pZD5cbiAgcmVzZXRRdWVyaWVzKFxuICAgIGFyZzE/OiBRdWVyeUtleSB8IFJlc2V0UXVlcnlGaWx0ZXJzLFxuICAgIGFyZzI/OiBSZXNldFF1ZXJ5RmlsdGVycyB8IFJlc2V0T3B0aW9ucyxcbiAgICBhcmczPzogUmVzZXRPcHRpb25zLFxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBbZmlsdGVycywgb3B0aW9uc10gPSBwYXJzZUZpbHRlckFyZ3MoYXJnMSwgYXJnMiwgYXJnMylcbiAgICBjb25zdCBxdWVyeUNhY2hlID0gdGhpcy5xdWVyeUNhY2hlXG5cbiAgICBjb25zdCByZWZldGNoRmlsdGVyczogUmVmZXRjaFF1ZXJ5RmlsdGVycyA9IHtcbiAgICAgIHR5cGU6ICdhY3RpdmUnLFxuICAgICAgLi4uZmlsdGVycyxcbiAgICB9XG5cbiAgICByZXR1cm4gbm90aWZ5TWFuYWdlci5iYXRjaCgoKSA9PiB7XG4gICAgICBxdWVyeUNhY2hlLmZpbmRBbGwoZmlsdGVycykuZm9yRWFjaCgocXVlcnkpID0+IHtcbiAgICAgICAgcXVlcnkucmVzZXQoKVxuICAgICAgfSlcbiAgICAgIHJldHVybiB0aGlzLnJlZmV0Y2hRdWVyaWVzKHJlZmV0Y2hGaWx0ZXJzLCBvcHRpb25zKVxuICAgIH0pXG4gIH1cblxuICBjYW5jZWxRdWVyaWVzKGZpbHRlcnM/OiBRdWVyeUZpbHRlcnMsIG9wdGlvbnM/OiBDYW5jZWxPcHRpb25zKTogUHJvbWlzZTx2b2lkPlxuICBjYW5jZWxRdWVyaWVzKFxuICAgIHF1ZXJ5S2V5PzogUXVlcnlLZXksXG4gICAgZmlsdGVycz86IFF1ZXJ5RmlsdGVycyxcbiAgICBvcHRpb25zPzogQ2FuY2VsT3B0aW9ucyxcbiAgKTogUHJvbWlzZTx2b2lkPlxuICBjYW5jZWxRdWVyaWVzKFxuICAgIGFyZzE/OiBRdWVyeUtleSB8IFF1ZXJ5RmlsdGVycyxcbiAgICBhcmcyPzogUXVlcnlGaWx0ZXJzIHwgQ2FuY2VsT3B0aW9ucyxcbiAgICBhcmczPzogQ2FuY2VsT3B0aW9ucyxcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgW2ZpbHRlcnMsIGNhbmNlbE9wdGlvbnMgPSB7fV0gPSBwYXJzZUZpbHRlckFyZ3MoYXJnMSwgYXJnMiwgYXJnMylcblxuICAgIGlmICh0eXBlb2YgY2FuY2VsT3B0aW9ucy5yZXZlcnQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjYW5jZWxPcHRpb25zLnJldmVydCA9IHRydWVcbiAgICB9XG5cbiAgICBjb25zdCBwcm9taXNlcyA9IG5vdGlmeU1hbmFnZXIuYmF0Y2goKCkgPT5cbiAgICAgIHRoaXMucXVlcnlDYWNoZVxuICAgICAgICAuZmluZEFsbChmaWx0ZXJzKVxuICAgICAgICAubWFwKChxdWVyeSkgPT4gcXVlcnkuY2FuY2VsKGNhbmNlbE9wdGlvbnMpKSxcbiAgICApXG5cbiAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4obm9vcCkuY2F0Y2gobm9vcClcbiAgfVxuXG4gIGludmFsaWRhdGVRdWVyaWVzPFRQYWdlRGF0YSA9IHVua25vd24+KFxuICAgIGZpbHRlcnM/OiBJbnZhbGlkYXRlUXVlcnlGaWx0ZXJzPFRQYWdlRGF0YT4sXG4gICAgb3B0aW9ucz86IEludmFsaWRhdGVPcHRpb25zLFxuICApOiBQcm9taXNlPHZvaWQ+XG4gIGludmFsaWRhdGVRdWVyaWVzPFRQYWdlRGF0YSA9IHVua25vd24+KFxuICAgIHF1ZXJ5S2V5PzogUXVlcnlLZXksXG4gICAgZmlsdGVycz86IEludmFsaWRhdGVRdWVyeUZpbHRlcnM8VFBhZ2VEYXRhPixcbiAgICBvcHRpb25zPzogSW52YWxpZGF0ZU9wdGlvbnMsXG4gICk6IFByb21pc2U8dm9pZD5cbiAgaW52YWxpZGF0ZVF1ZXJpZXMoXG4gICAgYXJnMT86IFF1ZXJ5S2V5IHwgSW52YWxpZGF0ZVF1ZXJ5RmlsdGVycyxcbiAgICBhcmcyPzogSW52YWxpZGF0ZVF1ZXJ5RmlsdGVycyB8IEludmFsaWRhdGVPcHRpb25zLFxuICAgIGFyZzM/OiBJbnZhbGlkYXRlT3B0aW9ucyxcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgW2ZpbHRlcnMsIG9wdGlvbnNdID0gcGFyc2VGaWx0ZXJBcmdzKGFyZzEsIGFyZzIsIGFyZzMpXG5cbiAgICByZXR1cm4gbm90aWZ5TWFuYWdlci5iYXRjaCgoKSA9PiB7XG4gICAgICB0aGlzLnF1ZXJ5Q2FjaGUuZmluZEFsbChmaWx0ZXJzKS5mb3JFYWNoKChxdWVyeSkgPT4ge1xuICAgICAgICBxdWVyeS5pbnZhbGlkYXRlKClcbiAgICAgIH0pXG5cbiAgICAgIGlmIChmaWx0ZXJzLnJlZmV0Y2hUeXBlID09PSAnbm9uZScpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXG4gICAgICB9XG4gICAgICBjb25zdCByZWZldGNoRmlsdGVyczogUmVmZXRjaFF1ZXJ5RmlsdGVycyA9IHtcbiAgICAgICAgLi4uZmlsdGVycyxcbiAgICAgICAgdHlwZTogZmlsdGVycy5yZWZldGNoVHlwZSA/PyBmaWx0ZXJzLnR5cGUgPz8gJ2FjdGl2ZScsXG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5yZWZldGNoUXVlcmllcyhyZWZldGNoRmlsdGVycywgb3B0aW9ucylcbiAgICB9KVxuICB9XG5cbiAgcmVmZXRjaFF1ZXJpZXM8VFBhZ2VEYXRhID0gdW5rbm93bj4oXG4gICAgZmlsdGVycz86IFJlZmV0Y2hRdWVyeUZpbHRlcnM8VFBhZ2VEYXRhPixcbiAgICBvcHRpb25zPzogUmVmZXRjaE9wdGlvbnMsXG4gICk6IFByb21pc2U8dm9pZD5cbiAgcmVmZXRjaFF1ZXJpZXM8VFBhZ2VEYXRhID0gdW5rbm93bj4oXG4gICAgcXVlcnlLZXk/OiBRdWVyeUtleSxcbiAgICBmaWx0ZXJzPzogUmVmZXRjaFF1ZXJ5RmlsdGVyczxUUGFnZURhdGE+LFxuICAgIG9wdGlvbnM/OiBSZWZldGNoT3B0aW9ucyxcbiAgKTogUHJvbWlzZTx2b2lkPlxuICByZWZldGNoUXVlcmllcyhcbiAgICBhcmcxPzogUXVlcnlLZXkgfCBSZWZldGNoUXVlcnlGaWx0ZXJzLFxuICAgIGFyZzI/OiBSZWZldGNoUXVlcnlGaWx0ZXJzIHwgUmVmZXRjaE9wdGlvbnMsXG4gICAgYXJnMz86IFJlZmV0Y2hPcHRpb25zLFxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBbZmlsdGVycywgb3B0aW9uc10gPSBwYXJzZUZpbHRlckFyZ3MoYXJnMSwgYXJnMiwgYXJnMylcblxuICAgIGNvbnN0IHByb21pc2VzID0gbm90aWZ5TWFuYWdlci5iYXRjaCgoKSA9PlxuICAgICAgdGhpcy5xdWVyeUNhY2hlXG4gICAgICAgIC5maW5kQWxsKGZpbHRlcnMpXG4gICAgICAgIC5maWx0ZXIoKHF1ZXJ5KSA9PiAhcXVlcnkuaXNEaXNhYmxlZCgpKVxuICAgICAgICAubWFwKChxdWVyeSkgPT5cbiAgICAgICAgICBxdWVyeS5mZXRjaCh1bmRlZmluZWQsIHtcbiAgICAgICAgICAgIC4uLm9wdGlvbnMsXG4gICAgICAgICAgICBjYW5jZWxSZWZldGNoOiBvcHRpb25zPy5jYW5jZWxSZWZldGNoID8/IHRydWUsXG4gICAgICAgICAgICBtZXRhOiB7IHJlZmV0Y2hQYWdlOiBmaWx0ZXJzLnJlZmV0Y2hQYWdlIH0sXG4gICAgICAgICAgfSksXG4gICAgICAgICksXG4gICAgKVxuXG4gICAgbGV0IHByb21pc2UgPSBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbihub29wKVxuXG4gICAgaWYgKCFvcHRpb25zPy50aHJvd09uRXJyb3IpIHtcbiAgICAgIHByb21pc2UgPSBwcm9taXNlLmNhdGNoKG5vb3ApXG4gICAgfVxuXG4gICAgcmV0dXJuIHByb21pc2VcbiAgfVxuXG4gIGZldGNoUXVlcnk8XG4gICAgVFF1ZXJ5Rm5EYXRhID0gdW5rbm93bixcbiAgICBURXJyb3IgPSB1bmtub3duLFxuICAgIFREYXRhID0gVFF1ZXJ5Rm5EYXRhLFxuICAgIFRRdWVyeUtleSBleHRlbmRzIFF1ZXJ5S2V5ID0gUXVlcnlLZXksXG4gID4oXG4gICAgb3B0aW9uczogRmV0Y2hRdWVyeU9wdGlvbnM8VFF1ZXJ5Rm5EYXRhLCBURXJyb3IsIFREYXRhLCBUUXVlcnlLZXk+LFxuICApOiBQcm9taXNlPFREYXRhPlxuICBmZXRjaFF1ZXJ5PFxuICAgIFRRdWVyeUZuRGF0YSA9IHVua25vd24sXG4gICAgVEVycm9yID0gdW5rbm93bixcbiAgICBURGF0YSA9IFRRdWVyeUZuRGF0YSxcbiAgICBUUXVlcnlLZXkgZXh0ZW5kcyBRdWVyeUtleSA9IFF1ZXJ5S2V5LFxuICA+KFxuICAgIHF1ZXJ5S2V5OiBUUXVlcnlLZXksXG4gICAgb3B0aW9ucz86IEZldGNoUXVlcnlPcHRpb25zPFRRdWVyeUZuRGF0YSwgVEVycm9yLCBURGF0YSwgVFF1ZXJ5S2V5PixcbiAgKTogUHJvbWlzZTxURGF0YT5cbiAgZmV0Y2hRdWVyeTxcbiAgICBUUXVlcnlGbkRhdGEgPSB1bmtub3duLFxuICAgIFRFcnJvciA9IHVua25vd24sXG4gICAgVERhdGEgPSBUUXVlcnlGbkRhdGEsXG4gICAgVFF1ZXJ5S2V5IGV4dGVuZHMgUXVlcnlLZXkgPSBRdWVyeUtleSxcbiAgPihcbiAgICBxdWVyeUtleTogVFF1ZXJ5S2V5LFxuICAgIHF1ZXJ5Rm46IFF1ZXJ5RnVuY3Rpb248VFF1ZXJ5Rm5EYXRhLCBUUXVlcnlLZXk+LFxuICAgIG9wdGlvbnM/OiBGZXRjaFF1ZXJ5T3B0aW9uczxUUXVlcnlGbkRhdGEsIFRFcnJvciwgVERhdGEsIFRRdWVyeUtleT4sXG4gICk6IFByb21pc2U8VERhdGE+XG4gIGZldGNoUXVlcnk8XG4gICAgVFF1ZXJ5Rm5EYXRhLFxuICAgIFRFcnJvcixcbiAgICBURGF0YSA9IFRRdWVyeUZuRGF0YSxcbiAgICBUUXVlcnlLZXkgZXh0ZW5kcyBRdWVyeUtleSA9IFF1ZXJ5S2V5LFxuICA+KFxuICAgIGFyZzE6IFRRdWVyeUtleSB8IEZldGNoUXVlcnlPcHRpb25zPFRRdWVyeUZuRGF0YSwgVEVycm9yLCBURGF0YSwgVFF1ZXJ5S2V5PixcbiAgICBhcmcyPzpcbiAgICAgIHwgUXVlcnlGdW5jdGlvbjxUUXVlcnlGbkRhdGEsIFRRdWVyeUtleT5cbiAgICAgIHwgRmV0Y2hRdWVyeU9wdGlvbnM8VFF1ZXJ5Rm5EYXRhLCBURXJyb3IsIFREYXRhLCBUUXVlcnlLZXk+LFxuICAgIGFyZzM/OiBGZXRjaFF1ZXJ5T3B0aW9uczxUUXVlcnlGbkRhdGEsIFRFcnJvciwgVERhdGEsIFRRdWVyeUtleT4sXG4gICk6IFByb21pc2U8VERhdGE+IHtcbiAgICBjb25zdCBwYXJzZWRPcHRpb25zID0gcGFyc2VRdWVyeUFyZ3MoYXJnMSwgYXJnMiwgYXJnMylcbiAgICBjb25zdCBkZWZhdWx0ZWRPcHRpb25zID0gdGhpcy5kZWZhdWx0UXVlcnlPcHRpb25zKHBhcnNlZE9wdGlvbnMpXG5cbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vdGFubmVybGluc2xleS9yZWFjdC1xdWVyeS9pc3N1ZXMvNjUyXG4gICAgaWYgKHR5cGVvZiBkZWZhdWx0ZWRPcHRpb25zLnJldHJ5ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgZGVmYXVsdGVkT3B0aW9ucy5yZXRyeSA9IGZhbHNlXG4gICAgfVxuXG4gICAgY29uc3QgcXVlcnkgPSB0aGlzLnF1ZXJ5Q2FjaGUuYnVpbGQodGhpcywgZGVmYXVsdGVkT3B0aW9ucylcblxuICAgIHJldHVybiBxdWVyeS5pc1N0YWxlQnlUaW1lKGRlZmF1bHRlZE9wdGlvbnMuc3RhbGVUaW1lKVxuICAgICAgPyBxdWVyeS5mZXRjaChkZWZhdWx0ZWRPcHRpb25zKVxuICAgICAgOiBQcm9taXNlLnJlc29sdmUocXVlcnkuc3RhdGUuZGF0YSBhcyBURGF0YSlcbiAgfVxuXG4gIHByZWZldGNoUXVlcnk8XG4gICAgVFF1ZXJ5Rm5EYXRhID0gdW5rbm93bixcbiAgICBURXJyb3IgPSB1bmtub3duLFxuICAgIFREYXRhID0gVFF1ZXJ5Rm5EYXRhLFxuICAgIFRRdWVyeUtleSBleHRlbmRzIFF1ZXJ5S2V5ID0gUXVlcnlLZXksXG4gID4oXG4gICAgb3B0aW9uczogRmV0Y2hRdWVyeU9wdGlvbnM8VFF1ZXJ5Rm5EYXRhLCBURXJyb3IsIFREYXRhLCBUUXVlcnlLZXk+LFxuICApOiBQcm9taXNlPHZvaWQ+XG4gIHByZWZldGNoUXVlcnk8XG4gICAgVFF1ZXJ5Rm5EYXRhID0gdW5rbm93bixcbiAgICBURXJyb3IgPSB1bmtub3duLFxuICAgIFREYXRhID0gVFF1ZXJ5Rm5EYXRhLFxuICAgIFRRdWVyeUtleSBleHRlbmRzIFF1ZXJ5S2V5ID0gUXVlcnlLZXksXG4gID4oXG4gICAgcXVlcnlLZXk6IFRRdWVyeUtleSxcbiAgICBvcHRpb25zPzogRmV0Y2hRdWVyeU9wdGlvbnM8VFF1ZXJ5Rm5EYXRhLCBURXJyb3IsIFREYXRhLCBUUXVlcnlLZXk+LFxuICApOiBQcm9taXNlPHZvaWQ+XG4gIHByZWZldGNoUXVlcnk8XG4gICAgVFF1ZXJ5Rm5EYXRhID0gdW5rbm93bixcbiAgICBURXJyb3IgPSB1bmtub3duLFxuICAgIFREYXRhID0gVFF1ZXJ5Rm5EYXRhLFxuICAgIFRRdWVyeUtleSBleHRlbmRzIFF1ZXJ5S2V5ID0gUXVlcnlLZXksXG4gID4oXG4gICAgcXVlcnlLZXk6IFRRdWVyeUtleSxcbiAgICBxdWVyeUZuOiBRdWVyeUZ1bmN0aW9uPFRRdWVyeUZuRGF0YSwgVFF1ZXJ5S2V5PixcbiAgICBvcHRpb25zPzogRmV0Y2hRdWVyeU9wdGlvbnM8VFF1ZXJ5Rm5EYXRhLCBURXJyb3IsIFREYXRhLCBUUXVlcnlLZXk+LFxuICApOiBQcm9taXNlPHZvaWQ+XG4gIHByZWZldGNoUXVlcnk8XG4gICAgVFF1ZXJ5Rm5EYXRhID0gdW5rbm93bixcbiAgICBURXJyb3IgPSB1bmtub3duLFxuICAgIFREYXRhID0gVFF1ZXJ5Rm5EYXRhLFxuICAgIFRRdWVyeUtleSBleHRlbmRzIFF1ZXJ5S2V5ID0gUXVlcnlLZXksXG4gID4oXG4gICAgYXJnMTogVFF1ZXJ5S2V5IHwgRmV0Y2hRdWVyeU9wdGlvbnM8VFF1ZXJ5Rm5EYXRhLCBURXJyb3IsIFREYXRhLCBUUXVlcnlLZXk+LFxuICAgIGFyZzI/OlxuICAgICAgfCBRdWVyeUZ1bmN0aW9uPFRRdWVyeUZuRGF0YSwgVFF1ZXJ5S2V5PlxuICAgICAgfCBGZXRjaFF1ZXJ5T3B0aW9uczxUUXVlcnlGbkRhdGEsIFRFcnJvciwgVERhdGEsIFRRdWVyeUtleT4sXG4gICAgYXJnMz86IEZldGNoUXVlcnlPcHRpb25zPFRRdWVyeUZuRGF0YSwgVEVycm9yLCBURGF0YSwgVFF1ZXJ5S2V5PixcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuZmV0Y2hRdWVyeShhcmcxIGFzIGFueSwgYXJnMiBhcyBhbnksIGFyZzMpXG4gICAgICAudGhlbihub29wKVxuICAgICAgLmNhdGNoKG5vb3ApXG4gIH1cblxuICBmZXRjaEluZmluaXRlUXVlcnk8XG4gICAgVFF1ZXJ5Rm5EYXRhID0gdW5rbm93bixcbiAgICBURXJyb3IgPSB1bmtub3duLFxuICAgIFREYXRhID0gVFF1ZXJ5Rm5EYXRhLFxuICAgIFRRdWVyeUtleSBleHRlbmRzIFF1ZXJ5S2V5ID0gUXVlcnlLZXksXG4gID4oXG4gICAgb3B0aW9uczogRmV0Y2hJbmZpbml0ZVF1ZXJ5T3B0aW9uczxUUXVlcnlGbkRhdGEsIFRFcnJvciwgVERhdGEsIFRRdWVyeUtleT4sXG4gICk6IFByb21pc2U8SW5maW5pdGVEYXRhPFREYXRhPj5cbiAgZmV0Y2hJbmZpbml0ZVF1ZXJ5PFxuICAgIFRRdWVyeUZuRGF0YSA9IHVua25vd24sXG4gICAgVEVycm9yID0gdW5rbm93bixcbiAgICBURGF0YSA9IFRRdWVyeUZuRGF0YSxcbiAgICBUUXVlcnlLZXkgZXh0ZW5kcyBRdWVyeUtleSA9IFF1ZXJ5S2V5LFxuICA+KFxuICAgIHF1ZXJ5S2V5OiBUUXVlcnlLZXksXG4gICAgb3B0aW9ucz86IEZldGNoSW5maW5pdGVRdWVyeU9wdGlvbnM8VFF1ZXJ5Rm5EYXRhLCBURXJyb3IsIFREYXRhLCBUUXVlcnlLZXk+LFxuICApOiBQcm9taXNlPEluZmluaXRlRGF0YTxURGF0YT4+XG4gIGZldGNoSW5maW5pdGVRdWVyeTxcbiAgICBUUXVlcnlGbkRhdGEgPSB1bmtub3duLFxuICAgIFRFcnJvciA9IHVua25vd24sXG4gICAgVERhdGEgPSBUUXVlcnlGbkRhdGEsXG4gICAgVFF1ZXJ5S2V5IGV4dGVuZHMgUXVlcnlLZXkgPSBRdWVyeUtleSxcbiAgPihcbiAgICBxdWVyeUtleTogVFF1ZXJ5S2V5LFxuICAgIHF1ZXJ5Rm46IFF1ZXJ5RnVuY3Rpb248VFF1ZXJ5Rm5EYXRhLCBUUXVlcnlLZXk+LFxuICAgIG9wdGlvbnM/OiBGZXRjaEluZmluaXRlUXVlcnlPcHRpb25zPFRRdWVyeUZuRGF0YSwgVEVycm9yLCBURGF0YSwgVFF1ZXJ5S2V5PixcbiAgKTogUHJvbWlzZTxJbmZpbml0ZURhdGE8VERhdGE+PlxuICBmZXRjaEluZmluaXRlUXVlcnk8XG4gICAgVFF1ZXJ5Rm5EYXRhLFxuICAgIFRFcnJvcixcbiAgICBURGF0YSA9IFRRdWVyeUZuRGF0YSxcbiAgICBUUXVlcnlLZXkgZXh0ZW5kcyBRdWVyeUtleSA9IFF1ZXJ5S2V5LFxuICA+KFxuICAgIGFyZzE6XG4gICAgICB8IFRRdWVyeUtleVxuICAgICAgfCBGZXRjaEluZmluaXRlUXVlcnlPcHRpb25zPFRRdWVyeUZuRGF0YSwgVEVycm9yLCBURGF0YSwgVFF1ZXJ5S2V5PixcbiAgICBhcmcyPzpcbiAgICAgIHwgUXVlcnlGdW5jdGlvbjxUUXVlcnlGbkRhdGEsIFRRdWVyeUtleT5cbiAgICAgIHwgRmV0Y2hJbmZpbml0ZVF1ZXJ5T3B0aW9uczxUUXVlcnlGbkRhdGEsIFRFcnJvciwgVERhdGEsIFRRdWVyeUtleT4sXG4gICAgYXJnMz86IEZldGNoSW5maW5pdGVRdWVyeU9wdGlvbnM8VFF1ZXJ5Rm5EYXRhLCBURXJyb3IsIFREYXRhLCBUUXVlcnlLZXk+LFxuICApOiBQcm9taXNlPEluZmluaXRlRGF0YTxURGF0YT4+IHtcbiAgICBjb25zdCBwYXJzZWRPcHRpb25zID0gcGFyc2VRdWVyeUFyZ3MoYXJnMSwgYXJnMiwgYXJnMylcbiAgICBwYXJzZWRPcHRpb25zLmJlaGF2aW9yID0gaW5maW5pdGVRdWVyeUJlaGF2aW9yPFxuICAgICAgVFF1ZXJ5Rm5EYXRhLFxuICAgICAgVEVycm9yLFxuICAgICAgVERhdGFcbiAgICA+KClcbiAgICByZXR1cm4gdGhpcy5mZXRjaFF1ZXJ5KHBhcnNlZE9wdGlvbnMpXG4gIH1cblxuICBwcmVmZXRjaEluZmluaXRlUXVlcnk8XG4gICAgVFF1ZXJ5Rm5EYXRhID0gdW5rbm93bixcbiAgICBURXJyb3IgPSB1bmtub3duLFxuICAgIFREYXRhID0gVFF1ZXJ5Rm5EYXRhLFxuICAgIFRRdWVyeUtleSBleHRlbmRzIFF1ZXJ5S2V5ID0gUXVlcnlLZXksXG4gID4oXG4gICAgb3B0aW9uczogRmV0Y2hJbmZpbml0ZVF1ZXJ5T3B0aW9uczxUUXVlcnlGbkRhdGEsIFRFcnJvciwgVERhdGEsIFRRdWVyeUtleT4sXG4gICk6IFByb21pc2U8dm9pZD5cbiAgcHJlZmV0Y2hJbmZpbml0ZVF1ZXJ5PFxuICAgIFRRdWVyeUZuRGF0YSA9IHVua25vd24sXG4gICAgVEVycm9yID0gdW5rbm93bixcbiAgICBURGF0YSA9IFRRdWVyeUZuRGF0YSxcbiAgICBUUXVlcnlLZXkgZXh0ZW5kcyBRdWVyeUtleSA9IFF1ZXJ5S2V5LFxuICA+KFxuICAgIHF1ZXJ5S2V5OiBUUXVlcnlLZXksXG4gICAgb3B0aW9ucz86IEZldGNoSW5maW5pdGVRdWVyeU9wdGlvbnM8VFF1ZXJ5Rm5EYXRhLCBURXJyb3IsIFREYXRhLCBUUXVlcnlLZXk+LFxuICApOiBQcm9taXNlPHZvaWQ+XG4gIHByZWZldGNoSW5maW5pdGVRdWVyeTxcbiAgICBUUXVlcnlGbkRhdGEgPSB1bmtub3duLFxuICAgIFRFcnJvciA9IHVua25vd24sXG4gICAgVERhdGEgPSBUUXVlcnlGbkRhdGEsXG4gICAgVFF1ZXJ5S2V5IGV4dGVuZHMgUXVlcnlLZXkgPSBRdWVyeUtleSxcbiAgPihcbiAgICBxdWVyeUtleTogVFF1ZXJ5S2V5LFxuICAgIHF1ZXJ5Rm46IFF1ZXJ5RnVuY3Rpb248VFF1ZXJ5Rm5EYXRhLCBUUXVlcnlLZXk+LFxuICAgIG9wdGlvbnM/OiBGZXRjaEluZmluaXRlUXVlcnlPcHRpb25zPFRRdWVyeUZuRGF0YSwgVEVycm9yLCBURGF0YSwgVFF1ZXJ5S2V5PixcbiAgKTogUHJvbWlzZTx2b2lkPlxuICBwcmVmZXRjaEluZmluaXRlUXVlcnk8XG4gICAgVFF1ZXJ5Rm5EYXRhLFxuICAgIFRFcnJvcixcbiAgICBURGF0YSA9IFRRdWVyeUZuRGF0YSxcbiAgICBUUXVlcnlLZXkgZXh0ZW5kcyBRdWVyeUtleSA9IFF1ZXJ5S2V5LFxuICA+KFxuICAgIGFyZzE6XG4gICAgICB8IFRRdWVyeUtleVxuICAgICAgfCBGZXRjaEluZmluaXRlUXVlcnlPcHRpb25zPFRRdWVyeUZuRGF0YSwgVEVycm9yLCBURGF0YSwgVFF1ZXJ5S2V5PixcbiAgICBhcmcyPzpcbiAgICAgIHwgUXVlcnlGdW5jdGlvbjxUUXVlcnlGbkRhdGEsIFRRdWVyeUtleT5cbiAgICAgIHwgRmV0Y2hJbmZpbml0ZVF1ZXJ5T3B0aW9uczxUUXVlcnlGbkRhdGEsIFRFcnJvciwgVERhdGEsIFRRdWVyeUtleT4sXG4gICAgYXJnMz86IEZldGNoSW5maW5pdGVRdWVyeU9wdGlvbnM8VFF1ZXJ5Rm5EYXRhLCBURXJyb3IsIFREYXRhLCBUUXVlcnlLZXk+LFxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5mZXRjaEluZmluaXRlUXVlcnkoYXJnMSBhcyBhbnksIGFyZzIgYXMgYW55LCBhcmczKVxuICAgICAgLnRoZW4obm9vcClcbiAgICAgIC5jYXRjaChub29wKVxuICB9XG5cbiAgcmVzdW1lUGF1c2VkTXV0YXRpb25zKCk6IFByb21pc2U8dW5rbm93bj4ge1xuICAgIHJldHVybiB0aGlzLm11dGF0aW9uQ2FjaGUucmVzdW1lUGF1c2VkTXV0YXRpb25zKClcbiAgfVxuXG4gIGdldFF1ZXJ5Q2FjaGUoKTogUXVlcnlDYWNoZSB7XG4gICAgcmV0dXJuIHRoaXMucXVlcnlDYWNoZVxuICB9XG5cbiAgZ2V0TXV0YXRpb25DYWNoZSgpOiBNdXRhdGlvbkNhY2hlIHtcbiAgICByZXR1cm4gdGhpcy5tdXRhdGlvbkNhY2hlXG4gIH1cblxuICBnZXRMb2dnZXIoKTogTG9nZ2VyIHtcbiAgICByZXR1cm4gdGhpcy5sb2dnZXJcbiAgfVxuXG4gIGdldERlZmF1bHRPcHRpb25zKCk6IERlZmF1bHRPcHRpb25zIHtcbiAgICByZXR1cm4gdGhpcy5kZWZhdWx0T3B0aW9uc1xuICB9XG5cbiAgc2V0RGVmYXVsdE9wdGlvbnMob3B0aW9uczogRGVmYXVsdE9wdGlvbnMpOiB2b2lkIHtcbiAgICB0aGlzLmRlZmF1bHRPcHRpb25zID0gb3B0aW9uc1xuICB9XG5cbiAgc2V0UXVlcnlEZWZhdWx0cyhcbiAgICBxdWVyeUtleTogUXVlcnlLZXksXG4gICAgb3B0aW9uczogUXVlcnlPYnNlcnZlck9wdGlvbnM8dW5rbm93biwgYW55LCBhbnksIGFueT4sXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMucXVlcnlEZWZhdWx0cy5maW5kKFxuICAgICAgKHgpID0+IGhhc2hRdWVyeUtleShxdWVyeUtleSkgPT09IGhhc2hRdWVyeUtleSh4LnF1ZXJ5S2V5KSxcbiAgICApXG4gICAgaWYgKHJlc3VsdCkge1xuICAgICAgcmVzdWx0LmRlZmF1bHRPcHRpb25zID0gb3B0aW9uc1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnF1ZXJ5RGVmYXVsdHMucHVzaCh7IHF1ZXJ5S2V5LCBkZWZhdWx0T3B0aW9uczogb3B0aW9ucyB9KVxuICAgIH1cbiAgfVxuXG4gIGdldFF1ZXJ5RGVmYXVsdHMoXG4gICAgcXVlcnlLZXk/OiBRdWVyeUtleSxcbiAgKTogUXVlcnlPYnNlcnZlck9wdGlvbnM8YW55LCBhbnksIGFueSwgYW55LCBhbnk+IHwgdW5kZWZpbmVkIHtcbiAgICBpZiAoIXF1ZXJ5S2V5KSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgfVxuXG4gICAgLy8gR2V0IHRoZSBmaXJzdCBtYXRjaGluZyBkZWZhdWx0c1xuICAgIGNvbnN0IGZpcnN0TWF0Y2hpbmdEZWZhdWx0cyA9IHRoaXMucXVlcnlEZWZhdWx0cy5maW5kKCh4KSA9PlxuICAgICAgcGFydGlhbE1hdGNoS2V5KHF1ZXJ5S2V5LCB4LnF1ZXJ5S2V5KSxcbiAgICApXG5cbiAgICAvLyBBZGRpdGlvbmFsIGNoZWNrcyBhbmQgZXJyb3IgaW4gZGV2IG1vZGVcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgLy8gUmV0cmlldmUgYWxsIG1hdGNoaW5nIGRlZmF1bHRzIGZvciB0aGUgZ2l2ZW4ga2V5XG4gICAgICBjb25zdCBtYXRjaGluZ0RlZmF1bHRzID0gdGhpcy5xdWVyeURlZmF1bHRzLmZpbHRlcigoeCkgPT5cbiAgICAgICAgcGFydGlhbE1hdGNoS2V5KHF1ZXJ5S2V5LCB4LnF1ZXJ5S2V5KSxcbiAgICAgIClcbiAgICAgIC8vIEl0IGlzIG9rIG5vdCBoYXZpbmcgZGVmYXVsdHMsIGJ1dCBpdCBpcyBlcnJvciBwcm9uZSB0byBoYXZlIG1vcmUgdGhhbiAxIGRlZmF1bHQgZm9yIGEgZ2l2ZW4ga2V5XG4gICAgICBpZiAobWF0Y2hpbmdEZWZhdWx0cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyLmVycm9yKFxuICAgICAgICAgIGBbUXVlcnlDbGllbnRdIFNldmVyYWwgcXVlcnkgZGVmYXVsdHMgbWF0Y2ggd2l0aCBrZXkgJyR7SlNPTi5zdHJpbmdpZnkoXG4gICAgICAgICAgICBxdWVyeUtleSxcbiAgICAgICAgICApfScuIFRoZSBmaXJzdCBtYXRjaGluZyBxdWVyeSBkZWZhdWx0cyBhcmUgdXNlZC4gUGxlYXNlIGNoZWNrIGhvdyBxdWVyeSBkZWZhdWx0cyBhcmUgcmVnaXN0ZXJlZC4gT3JkZXIgZG9lcyBtYXR0ZXIgaGVyZS4gY2YuIGh0dHBzOi8vcmVhY3QtcXVlcnkudGFuc3RhY2suY29tL3JlZmVyZW5jZS9RdWVyeUNsaWVudCNxdWVyeWNsaWVudHNldHF1ZXJ5ZGVmYXVsdHMuYCxcbiAgICAgICAgKVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmaXJzdE1hdGNoaW5nRGVmYXVsdHM/LmRlZmF1bHRPcHRpb25zXG4gIH1cblxuICBzZXRNdXRhdGlvbkRlZmF1bHRzKFxuICAgIG11dGF0aW9uS2V5OiBNdXRhdGlvbktleSxcbiAgICBvcHRpb25zOiBNdXRhdGlvbk9ic2VydmVyT3B0aW9uczxhbnksIGFueSwgYW55LCBhbnk+LFxuICApOiB2b2lkIHtcbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLm11dGF0aW9uRGVmYXVsdHMuZmluZChcbiAgICAgICh4KSA9PiBoYXNoUXVlcnlLZXkobXV0YXRpb25LZXkpID09PSBoYXNoUXVlcnlLZXkoeC5tdXRhdGlvbktleSksXG4gICAgKVxuICAgIGlmIChyZXN1bHQpIHtcbiAgICAgIHJlc3VsdC5kZWZhdWx0T3B0aW9ucyA9IG9wdGlvbnNcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tdXRhdGlvbkRlZmF1bHRzLnB1c2goeyBtdXRhdGlvbktleSwgZGVmYXVsdE9wdGlvbnM6IG9wdGlvbnMgfSlcbiAgICB9XG4gIH1cblxuICBnZXRNdXRhdGlvbkRlZmF1bHRzKFxuICAgIG11dGF0aW9uS2V5PzogTXV0YXRpb25LZXksXG4gICk6IE11dGF0aW9uT2JzZXJ2ZXJPcHRpb25zPGFueSwgYW55LCBhbnksIGFueT4gfCB1bmRlZmluZWQge1xuICAgIGlmICghbXV0YXRpb25LZXkpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWRcbiAgICB9XG5cbiAgICAvLyBHZXQgdGhlIGZpcnN0IG1hdGNoaW5nIGRlZmF1bHRzXG4gICAgY29uc3QgZmlyc3RNYXRjaGluZ0RlZmF1bHRzID0gdGhpcy5tdXRhdGlvbkRlZmF1bHRzLmZpbmQoKHgpID0+XG4gICAgICBwYXJ0aWFsTWF0Y2hLZXkobXV0YXRpb25LZXksIHgubXV0YXRpb25LZXkpLFxuICAgIClcblxuICAgIC8vIEFkZGl0aW9uYWwgY2hlY2tzIGFuZCBlcnJvciBpbiBkZXYgbW9kZVxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAvLyBSZXRyaWV2ZSBhbGwgbWF0Y2hpbmcgZGVmYXVsdHMgZm9yIHRoZSBnaXZlbiBrZXlcbiAgICAgIGNvbnN0IG1hdGNoaW5nRGVmYXVsdHMgPSB0aGlzLm11dGF0aW9uRGVmYXVsdHMuZmlsdGVyKCh4KSA9PlxuICAgICAgICBwYXJ0aWFsTWF0Y2hLZXkobXV0YXRpb25LZXksIHgubXV0YXRpb25LZXkpLFxuICAgICAgKVxuICAgICAgLy8gSXQgaXMgb2sgbm90IGhhdmluZyBkZWZhdWx0cywgYnV0IGl0IGlzIGVycm9yIHByb25lIHRvIGhhdmUgbW9yZSB0aGFuIDEgZGVmYXVsdCBmb3IgYSBnaXZlbiBrZXlcbiAgICAgIGlmIChtYXRjaGluZ0RlZmF1bHRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoXG4gICAgICAgICAgYFtRdWVyeUNsaWVudF0gU2V2ZXJhbCBtdXRhdGlvbiBkZWZhdWx0cyBtYXRjaCB3aXRoIGtleSAnJHtKU09OLnN0cmluZ2lmeShcbiAgICAgICAgICAgIG11dGF0aW9uS2V5LFxuICAgICAgICAgICl9Jy4gVGhlIGZpcnN0IG1hdGNoaW5nIG11dGF0aW9uIGRlZmF1bHRzIGFyZSB1c2VkLiBQbGVhc2UgY2hlY2sgaG93IG11dGF0aW9uIGRlZmF1bHRzIGFyZSByZWdpc3RlcmVkLiBPcmRlciBkb2VzIG1hdHRlciBoZXJlLiBjZi4gaHR0cHM6Ly9yZWFjdC1xdWVyeS50YW5zdGFjay5jb20vcmVmZXJlbmNlL1F1ZXJ5Q2xpZW50I3F1ZXJ5Y2xpZW50c2V0bXV0YXRpb25kZWZhdWx0cy5gLFxuICAgICAgICApXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZpcnN0TWF0Y2hpbmdEZWZhdWx0cz8uZGVmYXVsdE9wdGlvbnNcbiAgfVxuXG4gIGRlZmF1bHRRdWVyeU9wdGlvbnM8XG4gICAgVFF1ZXJ5Rm5EYXRhLFxuICAgIFRFcnJvcixcbiAgICBURGF0YSxcbiAgICBUUXVlcnlEYXRhLFxuICAgIFRRdWVyeUtleSBleHRlbmRzIFF1ZXJ5S2V5LFxuICA+KFxuICAgIG9wdGlvbnM/OlxuICAgICAgfCBRdWVyeU9ic2VydmVyT3B0aW9uczxUUXVlcnlGbkRhdGEsIFRFcnJvciwgVERhdGEsIFRRdWVyeURhdGEsIFRRdWVyeUtleT5cbiAgICAgIHwgRGVmYXVsdGVkUXVlcnlPYnNlcnZlck9wdGlvbnM8XG4gICAgICAgICAgVFF1ZXJ5Rm5EYXRhLFxuICAgICAgICAgIFRFcnJvcixcbiAgICAgICAgICBURGF0YSxcbiAgICAgICAgICBUUXVlcnlEYXRhLFxuICAgICAgICAgIFRRdWVyeUtleVxuICAgICAgICA+LFxuICApOiBEZWZhdWx0ZWRRdWVyeU9ic2VydmVyT3B0aW9uczxcbiAgICBUUXVlcnlGbkRhdGEsXG4gICAgVEVycm9yLFxuICAgIFREYXRhLFxuICAgIFRRdWVyeURhdGEsXG4gICAgVFF1ZXJ5S2V5XG4gID4ge1xuICAgIGlmIChvcHRpb25zPy5fZGVmYXVsdGVkKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucyBhcyBEZWZhdWx0ZWRRdWVyeU9ic2VydmVyT3B0aW9uczxcbiAgICAgICAgVFF1ZXJ5Rm5EYXRhLFxuICAgICAgICBURXJyb3IsXG4gICAgICAgIFREYXRhLFxuICAgICAgICBUUXVlcnlEYXRhLFxuICAgICAgICBUUXVlcnlLZXlcbiAgICAgID5cbiAgICB9XG5cbiAgICBjb25zdCBkZWZhdWx0ZWRPcHRpb25zID0ge1xuICAgICAgLi4udGhpcy5kZWZhdWx0T3B0aW9ucy5xdWVyaWVzLFxuICAgICAgLi4udGhpcy5nZXRRdWVyeURlZmF1bHRzKG9wdGlvbnM/LnF1ZXJ5S2V5KSxcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgICBfZGVmYXVsdGVkOiB0cnVlLFxuICAgIH1cblxuICAgIGlmICghZGVmYXVsdGVkT3B0aW9ucy5xdWVyeUhhc2ggJiYgZGVmYXVsdGVkT3B0aW9ucy5xdWVyeUtleSkge1xuICAgICAgZGVmYXVsdGVkT3B0aW9ucy5xdWVyeUhhc2ggPSBoYXNoUXVlcnlLZXlCeU9wdGlvbnMoXG4gICAgICAgIGRlZmF1bHRlZE9wdGlvbnMucXVlcnlLZXksXG4gICAgICAgIGRlZmF1bHRlZE9wdGlvbnMsXG4gICAgICApXG4gICAgfVxuXG4gICAgLy8gZGVwZW5kZW50IGRlZmF1bHQgdmFsdWVzXG4gICAgaWYgKHR5cGVvZiBkZWZhdWx0ZWRPcHRpb25zLnJlZmV0Y2hPblJlY29ubmVjdCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGRlZmF1bHRlZE9wdGlvbnMucmVmZXRjaE9uUmVjb25uZWN0ID1cbiAgICAgICAgZGVmYXVsdGVkT3B0aW9ucy5uZXR3b3JrTW9kZSAhPT0gJ2Fsd2F5cydcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBkZWZhdWx0ZWRPcHRpb25zLnVzZUVycm9yQm91bmRhcnkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBkZWZhdWx0ZWRPcHRpb25zLnVzZUVycm9yQm91bmRhcnkgPSAhIWRlZmF1bHRlZE9wdGlvbnMuc3VzcGVuc2VcbiAgICB9XG5cbiAgICByZXR1cm4gZGVmYXVsdGVkT3B0aW9ucyBhcyBEZWZhdWx0ZWRRdWVyeU9ic2VydmVyT3B0aW9uczxcbiAgICAgIFRRdWVyeUZuRGF0YSxcbiAgICAgIFRFcnJvcixcbiAgICAgIFREYXRhLFxuICAgICAgVFF1ZXJ5RGF0YSxcbiAgICAgIFRRdWVyeUtleVxuICAgID5cbiAgfVxuXG4gIGRlZmF1bHRNdXRhdGlvbk9wdGlvbnM8VCBleHRlbmRzIE11dGF0aW9uT3B0aW9uczxhbnksIGFueSwgYW55LCBhbnk+PihcbiAgICBvcHRpb25zPzogVCxcbiAgKTogVCB7XG4gICAgaWYgKG9wdGlvbnM/Ll9kZWZhdWx0ZWQpIHtcbiAgICAgIHJldHVybiBvcHRpb25zXG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAuLi50aGlzLmRlZmF1bHRPcHRpb25zLm11dGF0aW9ucyxcbiAgICAgIC4uLnRoaXMuZ2V0TXV0YXRpb25EZWZhdWx0cyhvcHRpb25zPy5tdXRhdGlvbktleSksXG4gICAgICAuLi5vcHRpb25zLFxuICAgICAgX2RlZmF1bHRlZDogdHJ1ZSxcbiAgICB9IGFzIFRcbiAgfVxuXG4gIGNsZWFyKCk6IHZvaWQge1xuICAgIHRoaXMucXVlcnlDYWNoZS5jbGVhcigpXG4gICAgdGhpcy5tdXRhdGlvbkNhY2hlLmNsZWFyKClcbiAgfVxufVxuIiwgImltcG9ydCB7XG4gIGlzU2VydmVyLFxuICBpc1ZhbGlkVGltZW91dCxcbiAgbm9vcCxcbiAgcmVwbGFjZURhdGEsXG4gIHNoYWxsb3dFcXVhbE9iamVjdHMsXG4gIHRpbWVVbnRpbFN0YWxlLFxufSBmcm9tICcuL3V0aWxzJ1xuaW1wb3J0IHsgbm90aWZ5TWFuYWdlciB9IGZyb20gJy4vbm90aWZ5TWFuYWdlcidcbmltcG9ydCB7IGZvY3VzTWFuYWdlciB9IGZyb20gJy4vZm9jdXNNYW5hZ2VyJ1xuaW1wb3J0IHsgU3Vic2NyaWJhYmxlIH0gZnJvbSAnLi9zdWJzY3JpYmFibGUnXG5pbXBvcnQgeyBjYW5GZXRjaCwgaXNDYW5jZWxsZWRFcnJvciB9IGZyb20gJy4vcmV0cnllcidcbmltcG9ydCB0eXBlIHtcbiAgUGxhY2Vob2xkZXJEYXRhRnVuY3Rpb24sXG4gIFF1ZXJ5S2V5LFxuICBRdWVyeU9ic2VydmVyQmFzZVJlc3VsdCxcbiAgUXVlcnlPYnNlcnZlck9wdGlvbnMsXG4gIFF1ZXJ5T2JzZXJ2ZXJSZXN1bHQsXG4gIFF1ZXJ5T3B0aW9ucyxcbiAgUmVmZXRjaE9wdGlvbnMsXG59IGZyb20gJy4vdHlwZXMnXG5pbXBvcnQgdHlwZSB7IEFjdGlvbiwgRmV0Y2hPcHRpb25zLCBRdWVyeSwgUXVlcnlTdGF0ZSB9IGZyb20gJy4vcXVlcnknXG5pbXBvcnQgdHlwZSB7IFF1ZXJ5Q2xpZW50IH0gZnJvbSAnLi9xdWVyeUNsaWVudCdcbmltcG9ydCB0eXBlIHsgRGVmYXVsdGVkUXVlcnlPYnNlcnZlck9wdGlvbnMsIFJlZmV0Y2hQYWdlRmlsdGVycyB9IGZyb20gJy4vdHlwZXMnXG5cbnR5cGUgUXVlcnlPYnNlcnZlckxpc3RlbmVyPFREYXRhLCBURXJyb3I+ID0gKFxuICByZXN1bHQ6IFF1ZXJ5T2JzZXJ2ZXJSZXN1bHQ8VERhdGEsIFRFcnJvcj4sXG4pID0+IHZvaWRcblxuZXhwb3J0IGludGVyZmFjZSBOb3RpZnlPcHRpb25zIHtcbiAgY2FjaGU/OiBib29sZWFuXG4gIGxpc3RlbmVycz86IGJvb2xlYW5cbiAgb25FcnJvcj86IGJvb2xlYW5cbiAgb25TdWNjZXNzPzogYm9vbGVhblxufVxuXG5leHBvcnQgaW50ZXJmYWNlIE9ic2VydmVyRmV0Y2hPcHRpb25zIGV4dGVuZHMgRmV0Y2hPcHRpb25zIHtcbiAgdGhyb3dPbkVycm9yPzogYm9vbGVhblxufVxuXG5leHBvcnQgY2xhc3MgUXVlcnlPYnNlcnZlcjxcbiAgVFF1ZXJ5Rm5EYXRhID0gdW5rbm93bixcbiAgVEVycm9yID0gdW5rbm93bixcbiAgVERhdGEgPSBUUXVlcnlGbkRhdGEsXG4gIFRRdWVyeURhdGEgPSBUUXVlcnlGbkRhdGEsXG4gIFRRdWVyeUtleSBleHRlbmRzIFF1ZXJ5S2V5ID0gUXVlcnlLZXksXG4+IGV4dGVuZHMgU3Vic2NyaWJhYmxlPFF1ZXJ5T2JzZXJ2ZXJMaXN0ZW5lcjxURGF0YSwgVEVycm9yPj4ge1xuICBvcHRpb25zOiBRdWVyeU9ic2VydmVyT3B0aW9uczxcbiAgICBUUXVlcnlGbkRhdGEsXG4gICAgVEVycm9yLFxuICAgIFREYXRhLFxuICAgIFRRdWVyeURhdGEsXG4gICAgVFF1ZXJ5S2V5XG4gID5cblxuICBwcml2YXRlIGNsaWVudDogUXVlcnlDbGllbnRcbiAgcHJpdmF0ZSBjdXJyZW50UXVlcnkhOiBRdWVyeTxUUXVlcnlGbkRhdGEsIFRFcnJvciwgVFF1ZXJ5RGF0YSwgVFF1ZXJ5S2V5PlxuICBwcml2YXRlIGN1cnJlbnRRdWVyeUluaXRpYWxTdGF0ZSE6IFF1ZXJ5U3RhdGU8VFF1ZXJ5RGF0YSwgVEVycm9yPlxuICBwcml2YXRlIGN1cnJlbnRSZXN1bHQhOiBRdWVyeU9ic2VydmVyUmVzdWx0PFREYXRhLCBURXJyb3I+XG4gIHByaXZhdGUgY3VycmVudFJlc3VsdFN0YXRlPzogUXVlcnlTdGF0ZTxUUXVlcnlEYXRhLCBURXJyb3I+XG4gIHByaXZhdGUgY3VycmVudFJlc3VsdE9wdGlvbnM/OiBRdWVyeU9ic2VydmVyT3B0aW9uczxcbiAgICBUUXVlcnlGbkRhdGEsXG4gICAgVEVycm9yLFxuICAgIFREYXRhLFxuICAgIFRRdWVyeURhdGEsXG4gICAgVFF1ZXJ5S2V5XG4gID5cbiAgcHJpdmF0ZSBwcmV2aW91c1F1ZXJ5UmVzdWx0PzogUXVlcnlPYnNlcnZlclJlc3VsdDxURGF0YSwgVEVycm9yPlxuICBwcml2YXRlIHNlbGVjdEVycm9yOiBURXJyb3IgfCBudWxsXG4gIHByaXZhdGUgc2VsZWN0Rm4/OiAoZGF0YTogVFF1ZXJ5RGF0YSkgPT4gVERhdGFcbiAgcHJpdmF0ZSBzZWxlY3RSZXN1bHQ/OiBURGF0YVxuICBwcml2YXRlIHN0YWxlVGltZW91dElkPzogUmV0dXJuVHlwZTx0eXBlb2Ygc2V0VGltZW91dD5cbiAgcHJpdmF0ZSByZWZldGNoSW50ZXJ2YWxJZD86IFJldHVyblR5cGU8dHlwZW9mIHNldEludGVydmFsPlxuICBwcml2YXRlIGN1cnJlbnRSZWZldGNoSW50ZXJ2YWw/OiBudW1iZXIgfCBmYWxzZVxuICBwcml2YXRlIHRyYWNrZWRQcm9wcyE6IFNldDxrZXlvZiBRdWVyeU9ic2VydmVyUmVzdWx0PlxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGNsaWVudDogUXVlcnlDbGllbnQsXG4gICAgb3B0aW9uczogUXVlcnlPYnNlcnZlck9wdGlvbnM8XG4gICAgICBUUXVlcnlGbkRhdGEsXG4gICAgICBURXJyb3IsXG4gICAgICBURGF0YSxcbiAgICAgIFRRdWVyeURhdGEsXG4gICAgICBUUXVlcnlLZXlcbiAgICA+LFxuICApIHtcbiAgICBzdXBlcigpXG5cbiAgICB0aGlzLmNsaWVudCA9IGNsaWVudFxuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnNcbiAgICB0aGlzLnRyYWNrZWRQcm9wcyA9IG5ldyBTZXQoKVxuICAgIHRoaXMuc2VsZWN0RXJyb3IgPSBudWxsXG4gICAgdGhpcy5iaW5kTWV0aG9kcygpXG4gICAgdGhpcy5zZXRPcHRpb25zKG9wdGlvbnMpXG4gIH1cblxuICBwcm90ZWN0ZWQgYmluZE1ldGhvZHMoKTogdm9pZCB7XG4gICAgdGhpcy5yZW1vdmUgPSB0aGlzLnJlbW92ZS5iaW5kKHRoaXMpXG4gICAgdGhpcy5yZWZldGNoID0gdGhpcy5yZWZldGNoLmJpbmQodGhpcylcbiAgfVxuXG4gIHByb3RlY3RlZCBvblN1YnNjcmliZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5saXN0ZW5lcnMuc2l6ZSA9PT0gMSkge1xuICAgICAgdGhpcy5jdXJyZW50UXVlcnkuYWRkT2JzZXJ2ZXIodGhpcylcblxuICAgICAgaWYgKHNob3VsZEZldGNoT25Nb3VudCh0aGlzLmN1cnJlbnRRdWVyeSwgdGhpcy5vcHRpb25zKSkge1xuICAgICAgICB0aGlzLmV4ZWN1dGVGZXRjaCgpXG4gICAgICB9XG5cbiAgICAgIHRoaXMudXBkYXRlVGltZXJzKClcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgb25VbnN1YnNjcmliZSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuaGFzTGlzdGVuZXJzKCkpIHtcbiAgICAgIHRoaXMuZGVzdHJveSgpXG4gICAgfVxuICB9XG5cbiAgc2hvdWxkRmV0Y2hPblJlY29ubmVjdCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gc2hvdWxkRmV0Y2hPbihcbiAgICAgIHRoaXMuY3VycmVudFF1ZXJ5LFxuICAgICAgdGhpcy5vcHRpb25zLFxuICAgICAgdGhpcy5vcHRpb25zLnJlZmV0Y2hPblJlY29ubmVjdCxcbiAgICApXG4gIH1cblxuICBzaG91bGRGZXRjaE9uV2luZG93Rm9jdXMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHNob3VsZEZldGNoT24oXG4gICAgICB0aGlzLmN1cnJlbnRRdWVyeSxcbiAgICAgIHRoaXMub3B0aW9ucyxcbiAgICAgIHRoaXMub3B0aW9ucy5yZWZldGNoT25XaW5kb3dGb2N1cyxcbiAgICApXG4gIH1cblxuICBkZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMubGlzdGVuZXJzID0gbmV3IFNldCgpXG4gICAgdGhpcy5jbGVhclN0YWxlVGltZW91dCgpXG4gICAgdGhpcy5jbGVhclJlZmV0Y2hJbnRlcnZhbCgpXG4gICAgdGhpcy5jdXJyZW50UXVlcnkucmVtb3ZlT2JzZXJ2ZXIodGhpcylcbiAgfVxuXG4gIHNldE9wdGlvbnMoXG4gICAgb3B0aW9ucz86IFF1ZXJ5T2JzZXJ2ZXJPcHRpb25zPFxuICAgICAgVFF1ZXJ5Rm5EYXRhLFxuICAgICAgVEVycm9yLFxuICAgICAgVERhdGEsXG4gICAgICBUUXVlcnlEYXRhLFxuICAgICAgVFF1ZXJ5S2V5XG4gICAgPixcbiAgICBub3RpZnlPcHRpb25zPzogTm90aWZ5T3B0aW9ucyxcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgcHJldk9wdGlvbnMgPSB0aGlzLm9wdGlvbnNcbiAgICBjb25zdCBwcmV2UXVlcnkgPSB0aGlzLmN1cnJlbnRRdWVyeVxuXG4gICAgdGhpcy5vcHRpb25zID0gdGhpcy5jbGllbnQuZGVmYXVsdFF1ZXJ5T3B0aW9ucyhvcHRpb25zKVxuXG4gICAgaWYgKFxuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJlxuICAgICAgdHlwZW9mIG9wdGlvbnM/LmlzRGF0YUVxdWFsICE9PSAndW5kZWZpbmVkJ1xuICAgICkge1xuICAgICAgdGhpcy5jbGllbnRcbiAgICAgICAgLmdldExvZ2dlcigpXG4gICAgICAgIC5lcnJvcihcbiAgICAgICAgICBgVGhlIGlzRGF0YUVxdWFsIG9wdGlvbiBoYXMgYmVlbiBkZXByZWNhdGVkIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gdGhlIG5leHQgbWFqb3IgdmVyc2lvbi4gWW91IGNhbiBhY2hpZXZlIHRoZSBzYW1lIGZ1bmN0aW9uYWxpdHkgYnkgcGFzc2luZyBhIGZ1bmN0aW9uIGFzIHRoZSBzdHJ1Y3R1cmFsU2hhcmluZyBvcHRpb25gLFxuICAgICAgICApXG4gICAgfVxuXG4gICAgaWYgKCFzaGFsbG93RXF1YWxPYmplY3RzKHByZXZPcHRpb25zLCB0aGlzLm9wdGlvbnMpKSB7XG4gICAgICB0aGlzLmNsaWVudC5nZXRRdWVyeUNhY2hlKCkubm90aWZ5KHtcbiAgICAgICAgdHlwZTogJ29ic2VydmVyT3B0aW9uc1VwZGF0ZWQnLFxuICAgICAgICBxdWVyeTogdGhpcy5jdXJyZW50UXVlcnksXG4gICAgICAgIG9ic2VydmVyOiB0aGlzLFxuICAgICAgfSlcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICB0eXBlb2YgdGhpcy5vcHRpb25zLmVuYWJsZWQgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICB0eXBlb2YgdGhpcy5vcHRpb25zLmVuYWJsZWQgIT09ICdib29sZWFuJ1xuICAgICkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCBlbmFibGVkIHRvIGJlIGEgYm9vbGVhbicpXG4gICAgfVxuXG4gICAgLy8gS2VlcCBwcmV2aW91cyBxdWVyeSBrZXkgaWYgdGhlIHVzZXIgZG9lcyBub3Qgc3VwcGx5IG9uZVxuICAgIGlmICghdGhpcy5vcHRpb25zLnF1ZXJ5S2V5KSB7XG4gICAgICB0aGlzLm9wdGlvbnMucXVlcnlLZXkgPSBwcmV2T3B0aW9ucy5xdWVyeUtleVxuICAgIH1cblxuICAgIHRoaXMudXBkYXRlUXVlcnkoKVxuXG4gICAgY29uc3QgbW91bnRlZCA9IHRoaXMuaGFzTGlzdGVuZXJzKClcblxuICAgIC8vIEZldGNoIGlmIHRoZXJlIGFyZSBzdWJzY3JpYmVyc1xuICAgIGlmIChcbiAgICAgIG1vdW50ZWQgJiZcbiAgICAgIHNob3VsZEZldGNoT3B0aW9uYWxseShcbiAgICAgICAgdGhpcy5jdXJyZW50UXVlcnksXG4gICAgICAgIHByZXZRdWVyeSxcbiAgICAgICAgdGhpcy5vcHRpb25zLFxuICAgICAgICBwcmV2T3B0aW9ucyxcbiAgICAgIClcbiAgICApIHtcbiAgICAgIHRoaXMuZXhlY3V0ZUZldGNoKClcbiAgICB9XG5cbiAgICAvLyBVcGRhdGUgcmVzdWx0XG4gICAgdGhpcy51cGRhdGVSZXN1bHQobm90aWZ5T3B0aW9ucylcblxuICAgIC8vIFVwZGF0ZSBzdGFsZSBpbnRlcnZhbCBpZiBuZWVkZWRcbiAgICBpZiAoXG4gICAgICBtb3VudGVkICYmXG4gICAgICAodGhpcy5jdXJyZW50UXVlcnkgIT09IHByZXZRdWVyeSB8fFxuICAgICAgICB0aGlzLm9wdGlvbnMuZW5hYmxlZCAhPT0gcHJldk9wdGlvbnMuZW5hYmxlZCB8fFxuICAgICAgICB0aGlzLm9wdGlvbnMuc3RhbGVUaW1lICE9PSBwcmV2T3B0aW9ucy5zdGFsZVRpbWUpXG4gICAgKSB7XG4gICAgICB0aGlzLnVwZGF0ZVN0YWxlVGltZW91dCgpXG4gICAgfVxuXG4gICAgY29uc3QgbmV4dFJlZmV0Y2hJbnRlcnZhbCA9IHRoaXMuY29tcHV0ZVJlZmV0Y2hJbnRlcnZhbCgpXG5cbiAgICAvLyBVcGRhdGUgcmVmZXRjaCBpbnRlcnZhbCBpZiBuZWVkZWRcbiAgICBpZiAoXG4gICAgICBtb3VudGVkICYmXG4gICAgICAodGhpcy5jdXJyZW50UXVlcnkgIT09IHByZXZRdWVyeSB8fFxuICAgICAgICB0aGlzLm9wdGlvbnMuZW5hYmxlZCAhPT0gcHJldk9wdGlvbnMuZW5hYmxlZCB8fFxuICAgICAgICBuZXh0UmVmZXRjaEludGVydmFsICE9PSB0aGlzLmN1cnJlbnRSZWZldGNoSW50ZXJ2YWwpXG4gICAgKSB7XG4gICAgICB0aGlzLnVwZGF0ZVJlZmV0Y2hJbnRlcnZhbChuZXh0UmVmZXRjaEludGVydmFsKVxuICAgIH1cbiAgfVxuXG4gIGdldE9wdGltaXN0aWNSZXN1bHQoXG4gICAgb3B0aW9uczogRGVmYXVsdGVkUXVlcnlPYnNlcnZlck9wdGlvbnM8XG4gICAgICBUUXVlcnlGbkRhdGEsXG4gICAgICBURXJyb3IsXG4gICAgICBURGF0YSxcbiAgICAgIFRRdWVyeURhdGEsXG4gICAgICBUUXVlcnlLZXlcbiAgICA+LFxuICApOiBRdWVyeU9ic2VydmVyUmVzdWx0PFREYXRhLCBURXJyb3I+IHtcbiAgICBjb25zdCBxdWVyeSA9IHRoaXMuY2xpZW50LmdldFF1ZXJ5Q2FjaGUoKS5idWlsZCh0aGlzLmNsaWVudCwgb3B0aW9ucylcblxuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuY3JlYXRlUmVzdWx0KHF1ZXJ5LCBvcHRpb25zKVxuXG4gICAgaWYgKHNob3VsZEFzc2lnbk9ic2VydmVyQ3VycmVudFByb3BlcnRpZXModGhpcywgcmVzdWx0LCBvcHRpb25zKSkge1xuICAgICAgLy8gdGhpcyBhc3NpZ25zIHRoZSBvcHRpbWlzdGljIHJlc3VsdCB0byB0aGUgY3VycmVudCBPYnNlcnZlclxuICAgICAgLy8gYmVjYXVzZSBpZiB0aGUgcXVlcnkgZnVuY3Rpb24gY2hhbmdlcywgdXNlUXVlcnkgd2lsbCBiZSBwZXJmb3JtaW5nXG4gICAgICAvLyBhbiBlZmZlY3Qgd2hlcmUgaXQgd291bGQgZmV0Y2ggYWdhaW4uXG4gICAgICAvLyBXaGVuIHRoZSBmZXRjaCBmaW5pc2hlcywgd2UgcGVyZm9ybSBhIGRlZXAgZGF0YSBjbG9uaW5nIGluIG9yZGVyXG4gICAgICAvLyB0byByZXVzZSBvYmplY3RzIHJlZmVyZW5jZXMuIFRoaXMgZGVlcCBkYXRhIGNsb25lIGlzIHBlcmZvcm1lZCBhZ2FpbnN0XG4gICAgICAvLyB0aGUgYG9ic2VydmVyLmN1cnJlbnRSZXN1bHQuZGF0YWAgcHJvcGVydHlcbiAgICAgIC8vIFdoZW4gUXVlcnlLZXkgY2hhbmdlcywgd2UgcmVmcmVzaCB0aGUgcXVlcnkgYW5kIGdldCBuZXcgYG9wdGltaXN0aWNgXG4gICAgICAvLyByZXN1bHQsIHdoaWxlIHdlIGxlYXZlIHRoZSBgb2JzZXJ2ZXIuY3VycmVudFJlc3VsdGAsIHNvIHdoZW4gbmV3IGRhdGFcbiAgICAgIC8vIGFycml2ZXMsIGl0IGZpbmRzIHRoZSBvbGQgYG9ic2VydmVyLmN1cnJlbnRSZXN1bHRgIHdoaWNoIGlzIHJlbGF0ZWRcbiAgICAgIC8vIHRvIHRoZSBvbGQgUXVlcnlLZXkuIFdoaWNoIG1lYW5zIHRoYXQgY3VycmVudFJlc3VsdCBhbmQgc2VsZWN0RGF0YSBhcmVcbiAgICAgIC8vIG91dCBvZiBzeW5jIGFscmVhZHkuXG4gICAgICAvLyBUbyBzb2x2ZSB0aGlzLCB3ZSBtb3ZlIHRoZSBjdXJzb3Igb2YgdGhlIGN1cnJlbnRSZXN1bHQgZXZlcnl0aW1lXG4gICAgICAvLyBhbiBvYnNlcnZlciByZWFkcyBhbiBvcHRpbWlzdGljIHZhbHVlLlxuXG4gICAgICAvLyBXaGVuIGtlZXBpbmcgdGhlIHByZXZpb3VzIGRhdGEsIHRoZSByZXN1bHQgZG9lc24ndCBjaGFuZ2UgdW50aWwgbmV3XG4gICAgICAvLyBkYXRhIGFycml2ZXMuXG4gICAgICB0aGlzLmN1cnJlbnRSZXN1bHQgPSByZXN1bHRcbiAgICAgIHRoaXMuY3VycmVudFJlc3VsdE9wdGlvbnMgPSB0aGlzLm9wdGlvbnNcbiAgICAgIHRoaXMuY3VycmVudFJlc3VsdFN0YXRlID0gdGhpcy5jdXJyZW50UXVlcnkuc3RhdGVcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdFxuICB9XG5cbiAgZ2V0Q3VycmVudFJlc3VsdCgpOiBRdWVyeU9ic2VydmVyUmVzdWx0PFREYXRhLCBURXJyb3I+IHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50UmVzdWx0XG4gIH1cblxuICB0cmFja1Jlc3VsdChcbiAgICByZXN1bHQ6IFF1ZXJ5T2JzZXJ2ZXJSZXN1bHQ8VERhdGEsIFRFcnJvcj4sXG4gICk6IFF1ZXJ5T2JzZXJ2ZXJSZXN1bHQ8VERhdGEsIFRFcnJvcj4ge1xuICAgIGNvbnN0IHRyYWNrZWRSZXN1bHQgPSB7fSBhcyBRdWVyeU9ic2VydmVyUmVzdWx0PFREYXRhLCBURXJyb3I+XG5cbiAgICBPYmplY3Qua2V5cyhyZXN1bHQpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRyYWNrZWRSZXN1bHQsIGtleSwge1xuICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBnZXQ6ICgpID0+IHtcbiAgICAgICAgICB0aGlzLnRyYWNrZWRQcm9wcy5hZGQoa2V5IGFzIGtleW9mIFF1ZXJ5T2JzZXJ2ZXJSZXN1bHQpXG4gICAgICAgICAgcmV0dXJuIHJlc3VsdFtrZXkgYXMga2V5b2YgUXVlcnlPYnNlcnZlclJlc3VsdF1cbiAgICAgICAgfSxcbiAgICAgIH0pXG4gICAgfSlcblxuICAgIHJldHVybiB0cmFja2VkUmVzdWx0XG4gIH1cblxuICBnZXRDdXJyZW50UXVlcnkoKTogUXVlcnk8VFF1ZXJ5Rm5EYXRhLCBURXJyb3IsIFRRdWVyeURhdGEsIFRRdWVyeUtleT4ge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRRdWVyeVxuICB9XG5cbiAgcmVtb3ZlKCk6IHZvaWQge1xuICAgIHRoaXMuY2xpZW50LmdldFF1ZXJ5Q2FjaGUoKS5yZW1vdmUodGhpcy5jdXJyZW50UXVlcnkpXG4gIH1cblxuICByZWZldGNoPFRQYWdlRGF0YT4oe1xuICAgIHJlZmV0Y2hQYWdlLFxuICAgIC4uLm9wdGlvbnNcbiAgfTogUmVmZXRjaE9wdGlvbnMgJiBSZWZldGNoUGFnZUZpbHRlcnM8VFBhZ2VEYXRhPiA9IHt9KTogUHJvbWlzZTxcbiAgICBRdWVyeU9ic2VydmVyUmVzdWx0PFREYXRhLCBURXJyb3I+XG4gID4ge1xuICAgIHJldHVybiB0aGlzLmZldGNoKHtcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgICBtZXRhOiB7IHJlZmV0Y2hQYWdlIH0sXG4gICAgfSlcbiAgfVxuXG4gIGZldGNoT3B0aW1pc3RpYyhcbiAgICBvcHRpb25zOiBRdWVyeU9ic2VydmVyT3B0aW9uczxcbiAgICAgIFRRdWVyeUZuRGF0YSxcbiAgICAgIFRFcnJvcixcbiAgICAgIFREYXRhLFxuICAgICAgVFF1ZXJ5RGF0YSxcbiAgICAgIFRRdWVyeUtleVxuICAgID4sXG4gICk6IFByb21pc2U8UXVlcnlPYnNlcnZlclJlc3VsdDxURGF0YSwgVEVycm9yPj4ge1xuICAgIGNvbnN0IGRlZmF1bHRlZE9wdGlvbnMgPSB0aGlzLmNsaWVudC5kZWZhdWx0UXVlcnlPcHRpb25zKG9wdGlvbnMpXG5cbiAgICBjb25zdCBxdWVyeSA9IHRoaXMuY2xpZW50XG4gICAgICAuZ2V0UXVlcnlDYWNoZSgpXG4gICAgICAuYnVpbGQodGhpcy5jbGllbnQsIGRlZmF1bHRlZE9wdGlvbnMpXG4gICAgcXVlcnkuaXNGZXRjaGluZ09wdGltaXN0aWMgPSB0cnVlXG5cbiAgICByZXR1cm4gcXVlcnkuZmV0Y2goKS50aGVuKCgpID0+IHRoaXMuY3JlYXRlUmVzdWx0KHF1ZXJ5LCBkZWZhdWx0ZWRPcHRpb25zKSlcbiAgfVxuXG4gIHByb3RlY3RlZCBmZXRjaChcbiAgICBmZXRjaE9wdGlvbnM6IE9ic2VydmVyRmV0Y2hPcHRpb25zLFxuICApOiBQcm9taXNlPFF1ZXJ5T2JzZXJ2ZXJSZXN1bHQ8VERhdGEsIFRFcnJvcj4+IHtcbiAgICByZXR1cm4gdGhpcy5leGVjdXRlRmV0Y2goe1xuICAgICAgLi4uZmV0Y2hPcHRpb25zLFxuICAgICAgY2FuY2VsUmVmZXRjaDogZmV0Y2hPcHRpb25zLmNhbmNlbFJlZmV0Y2ggPz8gdHJ1ZSxcbiAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMudXBkYXRlUmVzdWx0KClcbiAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRSZXN1bHRcbiAgICB9KVxuICB9XG5cbiAgcHJpdmF0ZSBleGVjdXRlRmV0Y2goXG4gICAgZmV0Y2hPcHRpb25zPzogT2JzZXJ2ZXJGZXRjaE9wdGlvbnMsXG4gICk6IFByb21pc2U8VFF1ZXJ5RGF0YSB8IHVuZGVmaW5lZD4ge1xuICAgIC8vIE1ha2Ugc3VyZSB3ZSByZWZlcmVuY2UgdGhlIGxhdGVzdCBxdWVyeSBhcyB0aGUgY3VycmVudCBvbmUgbWlnaHQgaGF2ZSBiZWVuIHJlbW92ZWRcbiAgICB0aGlzLnVwZGF0ZVF1ZXJ5KClcblxuICAgIC8vIEZldGNoXG4gICAgbGV0IHByb21pc2U6IFByb21pc2U8VFF1ZXJ5RGF0YSB8IHVuZGVmaW5lZD4gPSB0aGlzLmN1cnJlbnRRdWVyeS5mZXRjaChcbiAgICAgIHRoaXMub3B0aW9ucyBhcyBRdWVyeU9wdGlvbnM8VFF1ZXJ5Rm5EYXRhLCBURXJyb3IsIFRRdWVyeURhdGEsIFRRdWVyeUtleT4sXG4gICAgICBmZXRjaE9wdGlvbnMsXG4gICAgKVxuXG4gICAgaWYgKCFmZXRjaE9wdGlvbnM/LnRocm93T25FcnJvcikge1xuICAgICAgcHJvbWlzZSA9IHByb21pc2UuY2F0Y2gobm9vcClcbiAgICB9XG5cbiAgICByZXR1cm4gcHJvbWlzZVxuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVTdGFsZVRpbWVvdXQoKTogdm9pZCB7XG4gICAgdGhpcy5jbGVhclN0YWxlVGltZW91dCgpXG5cbiAgICBpZiAoXG4gICAgICBpc1NlcnZlciB8fFxuICAgICAgdGhpcy5jdXJyZW50UmVzdWx0LmlzU3RhbGUgfHxcbiAgICAgICFpc1ZhbGlkVGltZW91dCh0aGlzLm9wdGlvbnMuc3RhbGVUaW1lKVxuICAgICkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3QgdGltZSA9IHRpbWVVbnRpbFN0YWxlKFxuICAgICAgdGhpcy5jdXJyZW50UmVzdWx0LmRhdGFVcGRhdGVkQXQsXG4gICAgICB0aGlzLm9wdGlvbnMuc3RhbGVUaW1lLFxuICAgIClcblxuICAgIC8vIFRoZSB0aW1lb3V0IGlzIHNvbWV0aW1lcyB0cmlnZ2VyZWQgMSBtcyBiZWZvcmUgdGhlIHN0YWxlIHRpbWUgZXhwaXJhdGlvbi5cbiAgICAvLyBUbyBtaXRpZ2F0ZSB0aGlzIGlzc3VlIHdlIGFsd2F5cyBhZGQgMSBtcyB0byB0aGUgdGltZW91dC5cbiAgICBjb25zdCB0aW1lb3V0ID0gdGltZSArIDFcblxuICAgIHRoaXMuc3RhbGVUaW1lb3V0SWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmICghdGhpcy5jdXJyZW50UmVzdWx0LmlzU3RhbGUpIHtcbiAgICAgICAgdGhpcy51cGRhdGVSZXN1bHQoKVxuICAgICAgfVxuICAgIH0sIHRpbWVvdXQpXG4gIH1cblxuICBwcml2YXRlIGNvbXB1dGVSZWZldGNoSW50ZXJ2YWwoKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB0aGlzLm9wdGlvbnMucmVmZXRjaEludGVydmFsID09PSAnZnVuY3Rpb24nXG4gICAgICA/IHRoaXMub3B0aW9ucy5yZWZldGNoSW50ZXJ2YWwodGhpcy5jdXJyZW50UmVzdWx0LmRhdGEsIHRoaXMuY3VycmVudFF1ZXJ5KVxuICAgICAgOiB0aGlzLm9wdGlvbnMucmVmZXRjaEludGVydmFsID8/IGZhbHNlXG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZVJlZmV0Y2hJbnRlcnZhbChuZXh0SW50ZXJ2YWw6IG51bWJlciB8IGZhbHNlKTogdm9pZCB7XG4gICAgdGhpcy5jbGVhclJlZmV0Y2hJbnRlcnZhbCgpXG5cbiAgICB0aGlzLmN1cnJlbnRSZWZldGNoSW50ZXJ2YWwgPSBuZXh0SW50ZXJ2YWxcblxuICAgIGlmIChcbiAgICAgIGlzU2VydmVyIHx8XG4gICAgICB0aGlzLm9wdGlvbnMuZW5hYmxlZCA9PT0gZmFsc2UgfHxcbiAgICAgICFpc1ZhbGlkVGltZW91dCh0aGlzLmN1cnJlbnRSZWZldGNoSW50ZXJ2YWwpIHx8XG4gICAgICB0aGlzLmN1cnJlbnRSZWZldGNoSW50ZXJ2YWwgPT09IDBcbiAgICApIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHRoaXMucmVmZXRjaEludGVydmFsSWQgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMub3B0aW9ucy5yZWZldGNoSW50ZXJ2YWxJbkJhY2tncm91bmQgfHxcbiAgICAgICAgZm9jdXNNYW5hZ2VyLmlzRm9jdXNlZCgpXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5leGVjdXRlRmV0Y2goKVxuICAgICAgfVxuICAgIH0sIHRoaXMuY3VycmVudFJlZmV0Y2hJbnRlcnZhbClcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlVGltZXJzKCk6IHZvaWQge1xuICAgIHRoaXMudXBkYXRlU3RhbGVUaW1lb3V0KClcbiAgICB0aGlzLnVwZGF0ZVJlZmV0Y2hJbnRlcnZhbCh0aGlzLmNvbXB1dGVSZWZldGNoSW50ZXJ2YWwoKSlcbiAgfVxuXG4gIHByaXZhdGUgY2xlYXJTdGFsZVRpbWVvdXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuc3RhbGVUaW1lb3V0SWQpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLnN0YWxlVGltZW91dElkKVxuICAgICAgdGhpcy5zdGFsZVRpbWVvdXRJZCA9IHVuZGVmaW5lZFxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY2xlYXJSZWZldGNoSW50ZXJ2YWwoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucmVmZXRjaEludGVydmFsSWQpIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5yZWZldGNoSW50ZXJ2YWxJZClcbiAgICAgIHRoaXMucmVmZXRjaEludGVydmFsSWQgPSB1bmRlZmluZWRcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgY3JlYXRlUmVzdWx0KFxuICAgIHF1ZXJ5OiBRdWVyeTxUUXVlcnlGbkRhdGEsIFRFcnJvciwgVFF1ZXJ5RGF0YSwgVFF1ZXJ5S2V5PixcbiAgICBvcHRpb25zOiBRdWVyeU9ic2VydmVyT3B0aW9uczxcbiAgICAgIFRRdWVyeUZuRGF0YSxcbiAgICAgIFRFcnJvcixcbiAgICAgIFREYXRhLFxuICAgICAgVFF1ZXJ5RGF0YSxcbiAgICAgIFRRdWVyeUtleVxuICAgID4sXG4gICk6IFF1ZXJ5T2JzZXJ2ZXJSZXN1bHQ8VERhdGEsIFRFcnJvcj4ge1xuICAgIGNvbnN0IHByZXZRdWVyeSA9IHRoaXMuY3VycmVudFF1ZXJ5XG4gICAgY29uc3QgcHJldk9wdGlvbnMgPSB0aGlzLm9wdGlvbnNcbiAgICBjb25zdCBwcmV2UmVzdWx0ID0gdGhpcy5jdXJyZW50UmVzdWx0IGFzXG4gICAgICB8IFF1ZXJ5T2JzZXJ2ZXJSZXN1bHQ8VERhdGEsIFRFcnJvcj5cbiAgICAgIHwgdW5kZWZpbmVkXG4gICAgY29uc3QgcHJldlJlc3VsdFN0YXRlID0gdGhpcy5jdXJyZW50UmVzdWx0U3RhdGVcbiAgICBjb25zdCBwcmV2UmVzdWx0T3B0aW9ucyA9IHRoaXMuY3VycmVudFJlc3VsdE9wdGlvbnNcbiAgICBjb25zdCBxdWVyeUNoYW5nZSA9IHF1ZXJ5ICE9PSBwcmV2UXVlcnlcbiAgICBjb25zdCBxdWVyeUluaXRpYWxTdGF0ZSA9IHF1ZXJ5Q2hhbmdlXG4gICAgICA/IHF1ZXJ5LnN0YXRlXG4gICAgICA6IHRoaXMuY3VycmVudFF1ZXJ5SW5pdGlhbFN0YXRlXG4gICAgY29uc3QgcHJldlF1ZXJ5UmVzdWx0ID0gcXVlcnlDaGFuZ2VcbiAgICAgID8gdGhpcy5jdXJyZW50UmVzdWx0XG4gICAgICA6IHRoaXMucHJldmlvdXNRdWVyeVJlc3VsdFxuXG4gICAgY29uc3QgeyBzdGF0ZSB9ID0gcXVlcnlcbiAgICBsZXQgeyBkYXRhVXBkYXRlZEF0LCBlcnJvciwgZXJyb3JVcGRhdGVkQXQsIGZldGNoU3RhdHVzLCBzdGF0dXMgfSA9IHN0YXRlXG4gICAgbGV0IGlzUHJldmlvdXNEYXRhID0gZmFsc2VcbiAgICBsZXQgaXNQbGFjZWhvbGRlckRhdGEgPSBmYWxzZVxuICAgIGxldCBkYXRhOiBURGF0YSB8IHVuZGVmaW5lZFxuXG4gICAgLy8gT3B0aW1pc3RpY2FsbHkgc2V0IHJlc3VsdCBpbiBmZXRjaGluZyBzdGF0ZSBpZiBuZWVkZWRcbiAgICBpZiAob3B0aW9ucy5fb3B0aW1pc3RpY1Jlc3VsdHMpIHtcbiAgICAgIGNvbnN0IG1vdW50ZWQgPSB0aGlzLmhhc0xpc3RlbmVycygpXG5cbiAgICAgIGNvbnN0IGZldGNoT25Nb3VudCA9ICFtb3VudGVkICYmIHNob3VsZEZldGNoT25Nb3VudChxdWVyeSwgb3B0aW9ucylcblxuICAgICAgY29uc3QgZmV0Y2hPcHRpb25hbGx5ID1cbiAgICAgICAgbW91bnRlZCAmJiBzaG91bGRGZXRjaE9wdGlvbmFsbHkocXVlcnksIHByZXZRdWVyeSwgb3B0aW9ucywgcHJldk9wdGlvbnMpXG5cbiAgICAgIGlmIChmZXRjaE9uTW91bnQgfHwgZmV0Y2hPcHRpb25hbGx5KSB7XG4gICAgICAgIGZldGNoU3RhdHVzID0gY2FuRmV0Y2gocXVlcnkub3B0aW9ucy5uZXR3b3JrTW9kZSlcbiAgICAgICAgICA/ICdmZXRjaGluZydcbiAgICAgICAgICA6ICdwYXVzZWQnXG4gICAgICAgIGlmICghZGF0YVVwZGF0ZWRBdCkge1xuICAgICAgICAgIHN0YXR1cyA9ICdsb2FkaW5nJ1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAob3B0aW9ucy5fb3B0aW1pc3RpY1Jlc3VsdHMgPT09ICdpc1Jlc3RvcmluZycpIHtcbiAgICAgICAgZmV0Y2hTdGF0dXMgPSAnaWRsZSdcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBLZWVwIHByZXZpb3VzIGRhdGEgaWYgbmVlZGVkXG4gICAgaWYgKFxuICAgICAgb3B0aW9ucy5rZWVwUHJldmlvdXNEYXRhICYmXG4gICAgICAhc3RhdGUuZGF0YVVwZGF0ZWRBdCAmJlxuICAgICAgcHJldlF1ZXJ5UmVzdWx0Py5pc1N1Y2Nlc3MgJiZcbiAgICAgIHN0YXR1cyAhPT0gJ2Vycm9yJ1xuICAgICkge1xuICAgICAgZGF0YSA9IHByZXZRdWVyeVJlc3VsdC5kYXRhXG4gICAgICBkYXRhVXBkYXRlZEF0ID0gcHJldlF1ZXJ5UmVzdWx0LmRhdGFVcGRhdGVkQXRcbiAgICAgIHN0YXR1cyA9IHByZXZRdWVyeVJlc3VsdC5zdGF0dXNcbiAgICAgIGlzUHJldmlvdXNEYXRhID0gdHJ1ZVxuICAgIH1cbiAgICAvLyBTZWxlY3QgZGF0YSBpZiBuZWVkZWRcbiAgICBlbHNlIGlmIChvcHRpb25zLnNlbGVjdCAmJiB0eXBlb2Ygc3RhdGUuZGF0YSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIC8vIE1lbW9pemUgc2VsZWN0IHJlc3VsdFxuICAgICAgaWYgKFxuICAgICAgICBwcmV2UmVzdWx0ICYmXG4gICAgICAgIHN0YXRlLmRhdGEgPT09IHByZXZSZXN1bHRTdGF0ZT8uZGF0YSAmJlxuICAgICAgICBvcHRpb25zLnNlbGVjdCA9PT0gdGhpcy5zZWxlY3RGblxuICAgICAgKSB7XG4gICAgICAgIGRhdGEgPSB0aGlzLnNlbGVjdFJlc3VsdFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB0aGlzLnNlbGVjdEZuID0gb3B0aW9ucy5zZWxlY3RcbiAgICAgICAgICBkYXRhID0gb3B0aW9ucy5zZWxlY3Qoc3RhdGUuZGF0YSlcbiAgICAgICAgICBkYXRhID0gcmVwbGFjZURhdGEocHJldlJlc3VsdD8uZGF0YSwgZGF0YSwgb3B0aW9ucylcbiAgICAgICAgICB0aGlzLnNlbGVjdFJlc3VsdCA9IGRhdGFcbiAgICAgICAgICB0aGlzLnNlbGVjdEVycm9yID0gbnVsbFxuICAgICAgICB9IGNhdGNoIChzZWxlY3RFcnJvcikge1xuICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICB0aGlzLmNsaWVudC5nZXRMb2dnZXIoKS5lcnJvcihzZWxlY3RFcnJvcilcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5zZWxlY3RFcnJvciA9IHNlbGVjdEVycm9yIGFzIFRFcnJvclxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIC8vIFVzZSBxdWVyeSBkYXRhXG4gICAgZWxzZSB7XG4gICAgICBkYXRhID0gc3RhdGUuZGF0YSBhcyB1bmtub3duIGFzIFREYXRhXG4gICAgfVxuXG4gICAgLy8gU2hvdyBwbGFjZWhvbGRlciBkYXRhIGlmIG5lZWRlZFxuICAgIGlmIChcbiAgICAgIHR5cGVvZiBvcHRpb25zLnBsYWNlaG9sZGVyRGF0YSAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgIHR5cGVvZiBkYXRhID09PSAndW5kZWZpbmVkJyAmJlxuICAgICAgc3RhdHVzID09PSAnbG9hZGluZydcbiAgICApIHtcbiAgICAgIGxldCBwbGFjZWhvbGRlckRhdGFcblxuICAgICAgLy8gTWVtb2l6ZSBwbGFjZWhvbGRlciBkYXRhXG4gICAgICBpZiAoXG4gICAgICAgIHByZXZSZXN1bHQ/LmlzUGxhY2Vob2xkZXJEYXRhICYmXG4gICAgICAgIG9wdGlvbnMucGxhY2Vob2xkZXJEYXRhID09PSBwcmV2UmVzdWx0T3B0aW9ucz8ucGxhY2Vob2xkZXJEYXRhXG4gICAgICApIHtcbiAgICAgICAgcGxhY2Vob2xkZXJEYXRhID0gcHJldlJlc3VsdC5kYXRhXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwbGFjZWhvbGRlckRhdGEgPVxuICAgICAgICAgIHR5cGVvZiBvcHRpb25zLnBsYWNlaG9sZGVyRGF0YSA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICAgICAgPyAob3B0aW9ucy5wbGFjZWhvbGRlckRhdGEgYXMgUGxhY2Vob2xkZXJEYXRhRnVuY3Rpb248VFF1ZXJ5RGF0YT4pKClcbiAgICAgICAgICAgIDogb3B0aW9ucy5wbGFjZWhvbGRlckRhdGFcbiAgICAgICAgaWYgKG9wdGlvbnMuc2VsZWN0ICYmIHR5cGVvZiBwbGFjZWhvbGRlckRhdGEgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyRGF0YSA9IG9wdGlvbnMuc2VsZWN0KHBsYWNlaG9sZGVyRGF0YSlcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0RXJyb3IgPSBudWxsXG4gICAgICAgICAgfSBjYXRjaCAoc2VsZWN0RXJyb3IpIHtcbiAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICAgIHRoaXMuY2xpZW50LmdldExvZ2dlcigpLmVycm9yKHNlbGVjdEVycm9yKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zZWxlY3RFcnJvciA9IHNlbGVjdEVycm9yIGFzIFRFcnJvclxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIHBsYWNlaG9sZGVyRGF0YSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgc3RhdHVzID0gJ3N1Y2Nlc3MnXG4gICAgICAgIGRhdGEgPSByZXBsYWNlRGF0YShwcmV2UmVzdWx0Py5kYXRhLCBwbGFjZWhvbGRlckRhdGEsIG9wdGlvbnMpIGFzIFREYXRhXG4gICAgICAgIGlzUGxhY2Vob2xkZXJEYXRhID0gdHJ1ZVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLnNlbGVjdEVycm9yKSB7XG4gICAgICBlcnJvciA9IHRoaXMuc2VsZWN0RXJyb3IgYXMgYW55XG4gICAgICBkYXRhID0gdGhpcy5zZWxlY3RSZXN1bHRcbiAgICAgIGVycm9yVXBkYXRlZEF0ID0gRGF0ZS5ub3coKVxuICAgICAgc3RhdHVzID0gJ2Vycm9yJ1xuICAgIH1cblxuICAgIGNvbnN0IGlzRmV0Y2hpbmcgPSBmZXRjaFN0YXR1cyA9PT0gJ2ZldGNoaW5nJ1xuICAgIGNvbnN0IGlzTG9hZGluZyA9IHN0YXR1cyA9PT0gJ2xvYWRpbmcnXG4gICAgY29uc3QgaXNFcnJvciA9IHN0YXR1cyA9PT0gJ2Vycm9yJ1xuXG4gICAgY29uc3QgcmVzdWx0OiBRdWVyeU9ic2VydmVyQmFzZVJlc3VsdDxURGF0YSwgVEVycm9yPiA9IHtcbiAgICAgIHN0YXR1cyxcbiAgICAgIGZldGNoU3RhdHVzLFxuICAgICAgaXNMb2FkaW5nLFxuICAgICAgaXNTdWNjZXNzOiBzdGF0dXMgPT09ICdzdWNjZXNzJyxcbiAgICAgIGlzRXJyb3IsXG4gICAgICBpc0luaXRpYWxMb2FkaW5nOiBpc0xvYWRpbmcgJiYgaXNGZXRjaGluZyxcbiAgICAgIGRhdGEsXG4gICAgICBkYXRhVXBkYXRlZEF0LFxuICAgICAgZXJyb3IsXG4gICAgICBlcnJvclVwZGF0ZWRBdCxcbiAgICAgIGZhaWx1cmVDb3VudDogc3RhdGUuZmV0Y2hGYWlsdXJlQ291bnQsXG4gICAgICBmYWlsdXJlUmVhc29uOiBzdGF0ZS5mZXRjaEZhaWx1cmVSZWFzb24sXG4gICAgICBlcnJvclVwZGF0ZUNvdW50OiBzdGF0ZS5lcnJvclVwZGF0ZUNvdW50LFxuICAgICAgaXNGZXRjaGVkOiBzdGF0ZS5kYXRhVXBkYXRlQ291bnQgPiAwIHx8IHN0YXRlLmVycm9yVXBkYXRlQ291bnQgPiAwLFxuICAgICAgaXNGZXRjaGVkQWZ0ZXJNb3VudDpcbiAgICAgICAgc3RhdGUuZGF0YVVwZGF0ZUNvdW50ID4gcXVlcnlJbml0aWFsU3RhdGUuZGF0YVVwZGF0ZUNvdW50IHx8XG4gICAgICAgIHN0YXRlLmVycm9yVXBkYXRlQ291bnQgPiBxdWVyeUluaXRpYWxTdGF0ZS5lcnJvclVwZGF0ZUNvdW50LFxuICAgICAgaXNGZXRjaGluZyxcbiAgICAgIGlzUmVmZXRjaGluZzogaXNGZXRjaGluZyAmJiAhaXNMb2FkaW5nLFxuICAgICAgaXNMb2FkaW5nRXJyb3I6IGlzRXJyb3IgJiYgc3RhdGUuZGF0YVVwZGF0ZWRBdCA9PT0gMCxcbiAgICAgIGlzUGF1c2VkOiBmZXRjaFN0YXR1cyA9PT0gJ3BhdXNlZCcsXG4gICAgICBpc1BsYWNlaG9sZGVyRGF0YSxcbiAgICAgIGlzUHJldmlvdXNEYXRhLFxuICAgICAgaXNSZWZldGNoRXJyb3I6IGlzRXJyb3IgJiYgc3RhdGUuZGF0YVVwZGF0ZWRBdCAhPT0gMCxcbiAgICAgIGlzU3RhbGU6IGlzU3RhbGUocXVlcnksIG9wdGlvbnMpLFxuICAgICAgcmVmZXRjaDogdGhpcy5yZWZldGNoLFxuICAgICAgcmVtb3ZlOiB0aGlzLnJlbW92ZSxcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0IGFzIFF1ZXJ5T2JzZXJ2ZXJSZXN1bHQ8VERhdGEsIFRFcnJvcj5cbiAgfVxuXG4gIHVwZGF0ZVJlc3VsdChub3RpZnlPcHRpb25zPzogTm90aWZ5T3B0aW9ucyk6IHZvaWQge1xuICAgIGNvbnN0IHByZXZSZXN1bHQgPSB0aGlzLmN1cnJlbnRSZXN1bHQgYXNcbiAgICAgIHwgUXVlcnlPYnNlcnZlclJlc3VsdDxURGF0YSwgVEVycm9yPlxuICAgICAgfCB1bmRlZmluZWRcblxuICAgIGNvbnN0IG5leHRSZXN1bHQgPSB0aGlzLmNyZWF0ZVJlc3VsdCh0aGlzLmN1cnJlbnRRdWVyeSwgdGhpcy5vcHRpb25zKVxuICAgIHRoaXMuY3VycmVudFJlc3VsdFN0YXRlID0gdGhpcy5jdXJyZW50UXVlcnkuc3RhdGVcbiAgICB0aGlzLmN1cnJlbnRSZXN1bHRPcHRpb25zID0gdGhpcy5vcHRpb25zXG5cbiAgICAvLyBPbmx5IG5vdGlmeSBhbmQgdXBkYXRlIHJlc3VsdCBpZiBzb21ldGhpbmcgaGFzIGNoYW5nZWRcbiAgICBpZiAoc2hhbGxvd0VxdWFsT2JqZWN0cyhuZXh0UmVzdWx0LCBwcmV2UmVzdWx0KSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgdGhpcy5jdXJyZW50UmVzdWx0ID0gbmV4dFJlc3VsdFxuXG4gICAgLy8gRGV0ZXJtaW5lIHdoaWNoIGNhbGxiYWNrcyB0byB0cmlnZ2VyXG4gICAgY29uc3QgZGVmYXVsdE5vdGlmeU9wdGlvbnM6IE5vdGlmeU9wdGlvbnMgPSB7IGNhY2hlOiB0cnVlIH1cblxuICAgIGNvbnN0IHNob3VsZE5vdGlmeUxpc3RlbmVycyA9ICgpOiBib29sZWFuID0+IHtcbiAgICAgIGlmICghcHJldlJlc3VsdCkge1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuXG4gICAgICBjb25zdCB7IG5vdGlmeU9uQ2hhbmdlUHJvcHMgfSA9IHRoaXMub3B0aW9uc1xuICAgICAgY29uc3Qgbm90aWZ5T25DaGFuZ2VQcm9wc1ZhbHVlID1cbiAgICAgICAgdHlwZW9mIG5vdGlmeU9uQ2hhbmdlUHJvcHMgPT09ICdmdW5jdGlvbidcbiAgICAgICAgICA/IG5vdGlmeU9uQ2hhbmdlUHJvcHMoKVxuICAgICAgICAgIDogbm90aWZ5T25DaGFuZ2VQcm9wc1xuXG4gICAgICBpZiAoXG4gICAgICAgIG5vdGlmeU9uQ2hhbmdlUHJvcHNWYWx1ZSA9PT0gJ2FsbCcgfHxcbiAgICAgICAgKCFub3RpZnlPbkNoYW5nZVByb3BzVmFsdWUgJiYgIXRoaXMudHJhY2tlZFByb3BzLnNpemUpXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cblxuICAgICAgY29uc3QgaW5jbHVkZWRQcm9wcyA9IG5ldyBTZXQoXG4gICAgICAgIG5vdGlmeU9uQ2hhbmdlUHJvcHNWYWx1ZSA/PyB0aGlzLnRyYWNrZWRQcm9wcyxcbiAgICAgIClcblxuICAgICAgaWYgKHRoaXMub3B0aW9ucy51c2VFcnJvckJvdW5kYXJ5KSB7XG4gICAgICAgIGluY2x1ZGVkUHJvcHMuYWRkKCdlcnJvcicpXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLmN1cnJlbnRSZXN1bHQpLnNvbWUoKGtleSkgPT4ge1xuICAgICAgICBjb25zdCB0eXBlZEtleSA9IGtleSBhcyBrZXlvZiBRdWVyeU9ic2VydmVyUmVzdWx0XG4gICAgICAgIGNvbnN0IGNoYW5nZWQgPSB0aGlzLmN1cnJlbnRSZXN1bHRbdHlwZWRLZXldICE9PSBwcmV2UmVzdWx0W3R5cGVkS2V5XVxuICAgICAgICByZXR1cm4gY2hhbmdlZCAmJiBpbmNsdWRlZFByb3BzLmhhcyh0eXBlZEtleSlcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgaWYgKG5vdGlmeU9wdGlvbnM/Lmxpc3RlbmVycyAhPT0gZmFsc2UgJiYgc2hvdWxkTm90aWZ5TGlzdGVuZXJzKCkpIHtcbiAgICAgIGRlZmF1bHROb3RpZnlPcHRpb25zLmxpc3RlbmVycyA9IHRydWVcbiAgICB9XG5cbiAgICB0aGlzLm5vdGlmeSh7IC4uLmRlZmF1bHROb3RpZnlPcHRpb25zLCAuLi5ub3RpZnlPcHRpb25zIH0pXG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZVF1ZXJ5KCk6IHZvaWQge1xuICAgIGNvbnN0IHF1ZXJ5ID0gdGhpcy5jbGllbnQuZ2V0UXVlcnlDYWNoZSgpLmJ1aWxkKHRoaXMuY2xpZW50LCB0aGlzLm9wdGlvbnMpXG5cbiAgICBpZiAocXVlcnkgPT09IHRoaXMuY3VycmVudFF1ZXJ5KSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdCBwcmV2UXVlcnkgPSB0aGlzLmN1cnJlbnRRdWVyeSBhc1xuICAgICAgfCBRdWVyeTxUUXVlcnlGbkRhdGEsIFRFcnJvciwgVFF1ZXJ5RGF0YSwgVFF1ZXJ5S2V5PlxuICAgICAgfCB1bmRlZmluZWRcbiAgICB0aGlzLmN1cnJlbnRRdWVyeSA9IHF1ZXJ5XG4gICAgdGhpcy5jdXJyZW50UXVlcnlJbml0aWFsU3RhdGUgPSBxdWVyeS5zdGF0ZVxuICAgIHRoaXMucHJldmlvdXNRdWVyeVJlc3VsdCA9IHRoaXMuY3VycmVudFJlc3VsdFxuXG4gICAgaWYgKHRoaXMuaGFzTGlzdGVuZXJzKCkpIHtcbiAgICAgIHByZXZRdWVyeT8ucmVtb3ZlT2JzZXJ2ZXIodGhpcylcbiAgICAgIHF1ZXJ5LmFkZE9ic2VydmVyKHRoaXMpXG4gICAgfVxuICB9XG5cbiAgb25RdWVyeVVwZGF0ZShhY3Rpb246IEFjdGlvbjxURGF0YSwgVEVycm9yPik6IHZvaWQge1xuICAgIGNvbnN0IG5vdGlmeU9wdGlvbnM6IE5vdGlmeU9wdGlvbnMgPSB7fVxuXG4gICAgaWYgKGFjdGlvbi50eXBlID09PSAnc3VjY2VzcycpIHtcbiAgICAgIG5vdGlmeU9wdGlvbnMub25TdWNjZXNzID0gIWFjdGlvbi5tYW51YWxcbiAgICB9IGVsc2UgaWYgKGFjdGlvbi50eXBlID09PSAnZXJyb3InICYmICFpc0NhbmNlbGxlZEVycm9yKGFjdGlvbi5lcnJvcikpIHtcbiAgICAgIG5vdGlmeU9wdGlvbnMub25FcnJvciA9IHRydWVcbiAgICB9XG5cbiAgICB0aGlzLnVwZGF0ZVJlc3VsdChub3RpZnlPcHRpb25zKVxuXG4gICAgaWYgKHRoaXMuaGFzTGlzdGVuZXJzKCkpIHtcbiAgICAgIHRoaXMudXBkYXRlVGltZXJzKClcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG5vdGlmeShub3RpZnlPcHRpb25zOiBOb3RpZnlPcHRpb25zKTogdm9pZCB7XG4gICAgbm90aWZ5TWFuYWdlci5iYXRjaCgoKSA9PiB7XG4gICAgICAvLyBGaXJzdCB0cmlnZ2VyIHRoZSBjb25maWd1cmF0aW9uIGNhbGxiYWNrc1xuICAgICAgaWYgKG5vdGlmeU9wdGlvbnMub25TdWNjZXNzKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5vblN1Y2Nlc3M/Lih0aGlzLmN1cnJlbnRSZXN1bHQuZGF0YSEpXG4gICAgICAgIHRoaXMub3B0aW9ucy5vblNldHRsZWQ/Lih0aGlzLmN1cnJlbnRSZXN1bHQuZGF0YSEsIG51bGwpXG4gICAgICB9IGVsc2UgaWYgKG5vdGlmeU9wdGlvbnMub25FcnJvcikge1xuICAgICAgICB0aGlzLm9wdGlvbnMub25FcnJvcj8uKHRoaXMuY3VycmVudFJlc3VsdC5lcnJvciEpXG4gICAgICAgIHRoaXMub3B0aW9ucy5vblNldHRsZWQ/Lih1bmRlZmluZWQsIHRoaXMuY3VycmVudFJlc3VsdC5lcnJvciEpXG4gICAgICB9XG5cbiAgICAgIC8vIFRoZW4gdHJpZ2dlciB0aGUgbGlzdGVuZXJzXG4gICAgICBpZiAobm90aWZ5T3B0aW9ucy5saXN0ZW5lcnMpIHtcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMuZm9yRWFjaCgoeyBsaXN0ZW5lciB9KSA9PiB7XG4gICAgICAgICAgbGlzdGVuZXIodGhpcy5jdXJyZW50UmVzdWx0KVxuICAgICAgICB9KVxuICAgICAgfVxuXG4gICAgICAvLyBUaGVuIHRoZSBjYWNoZSBsaXN0ZW5lcnNcbiAgICAgIGlmIChub3RpZnlPcHRpb25zLmNhY2hlKSB7XG4gICAgICAgIHRoaXMuY2xpZW50LmdldFF1ZXJ5Q2FjaGUoKS5ub3RpZnkoe1xuICAgICAgICAgIHF1ZXJ5OiB0aGlzLmN1cnJlbnRRdWVyeSxcbiAgICAgICAgICB0eXBlOiAnb2JzZXJ2ZXJSZXN1bHRzVXBkYXRlZCcsXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSlcbiAgfVxufVxuXG5mdW5jdGlvbiBzaG91bGRMb2FkT25Nb3VudChcbiAgcXVlcnk6IFF1ZXJ5PGFueSwgYW55LCBhbnksIGFueT4sXG4gIG9wdGlvbnM6IFF1ZXJ5T2JzZXJ2ZXJPcHRpb25zPGFueSwgYW55LCBhbnksIGFueT4sXG4pOiBib29sZWFuIHtcbiAgcmV0dXJuIChcbiAgICBvcHRpb25zLmVuYWJsZWQgIT09IGZhbHNlICYmXG4gICAgIXF1ZXJ5LnN0YXRlLmRhdGFVcGRhdGVkQXQgJiZcbiAgICAhKHF1ZXJ5LnN0YXRlLnN0YXR1cyA9PT0gJ2Vycm9yJyAmJiBvcHRpb25zLnJldHJ5T25Nb3VudCA9PT0gZmFsc2UpXG4gIClcbn1cblxuZnVuY3Rpb24gc2hvdWxkRmV0Y2hPbk1vdW50KFxuICBxdWVyeTogUXVlcnk8YW55LCBhbnksIGFueSwgYW55PixcbiAgb3B0aW9uczogUXVlcnlPYnNlcnZlck9wdGlvbnM8YW55LCBhbnksIGFueSwgYW55LCBhbnk+LFxuKTogYm9vbGVhbiB7XG4gIHJldHVybiAoXG4gICAgc2hvdWxkTG9hZE9uTW91bnQocXVlcnksIG9wdGlvbnMpIHx8XG4gICAgKHF1ZXJ5LnN0YXRlLmRhdGFVcGRhdGVkQXQgPiAwICYmXG4gICAgICBzaG91bGRGZXRjaE9uKHF1ZXJ5LCBvcHRpb25zLCBvcHRpb25zLnJlZmV0Y2hPbk1vdW50KSlcbiAgKVxufVxuXG5mdW5jdGlvbiBzaG91bGRGZXRjaE9uKFxuICBxdWVyeTogUXVlcnk8YW55LCBhbnksIGFueSwgYW55PixcbiAgb3B0aW9uczogUXVlcnlPYnNlcnZlck9wdGlvbnM8YW55LCBhbnksIGFueSwgYW55LCBhbnk+LFxuICBmaWVsZDogdHlwZW9mIG9wdGlvbnNbJ3JlZmV0Y2hPbk1vdW50J10gJlxuICAgIHR5cGVvZiBvcHRpb25zWydyZWZldGNoT25XaW5kb3dGb2N1cyddICZcbiAgICB0eXBlb2Ygb3B0aW9uc1sncmVmZXRjaE9uUmVjb25uZWN0J10sXG4pIHtcbiAgaWYgKG9wdGlvbnMuZW5hYmxlZCAhPT0gZmFsc2UpIHtcbiAgICBjb25zdCB2YWx1ZSA9IHR5cGVvZiBmaWVsZCA9PT0gJ2Z1bmN0aW9uJyA/IGZpZWxkKHF1ZXJ5KSA6IGZpZWxkXG5cbiAgICByZXR1cm4gdmFsdWUgPT09ICdhbHdheXMnIHx8ICh2YWx1ZSAhPT0gZmFsc2UgJiYgaXNTdGFsZShxdWVyeSwgb3B0aW9ucykpXG4gIH1cbiAgcmV0dXJuIGZhbHNlXG59XG5cbmZ1bmN0aW9uIHNob3VsZEZldGNoT3B0aW9uYWxseShcbiAgcXVlcnk6IFF1ZXJ5PGFueSwgYW55LCBhbnksIGFueT4sXG4gIHByZXZRdWVyeTogUXVlcnk8YW55LCBhbnksIGFueSwgYW55PixcbiAgb3B0aW9uczogUXVlcnlPYnNlcnZlck9wdGlvbnM8YW55LCBhbnksIGFueSwgYW55LCBhbnk+LFxuICBwcmV2T3B0aW9uczogUXVlcnlPYnNlcnZlck9wdGlvbnM8YW55LCBhbnksIGFueSwgYW55LCBhbnk+LFxuKTogYm9vbGVhbiB7XG4gIHJldHVybiAoXG4gICAgb3B0aW9ucy5lbmFibGVkICE9PSBmYWxzZSAmJlxuICAgIChxdWVyeSAhPT0gcHJldlF1ZXJ5IHx8IHByZXZPcHRpb25zLmVuYWJsZWQgPT09IGZhbHNlKSAmJlxuICAgICghb3B0aW9ucy5zdXNwZW5zZSB8fCBxdWVyeS5zdGF0ZS5zdGF0dXMgIT09ICdlcnJvcicpICYmXG4gICAgaXNTdGFsZShxdWVyeSwgb3B0aW9ucylcbiAgKVxufVxuXG5mdW5jdGlvbiBpc1N0YWxlKFxuICBxdWVyeTogUXVlcnk8YW55LCBhbnksIGFueSwgYW55PixcbiAgb3B0aW9uczogUXVlcnlPYnNlcnZlck9wdGlvbnM8YW55LCBhbnksIGFueSwgYW55LCBhbnk+LFxuKTogYm9vbGVhbiB7XG4gIHJldHVybiBxdWVyeS5pc1N0YWxlQnlUaW1lKG9wdGlvbnMuc3RhbGVUaW1lKVxufVxuXG4vLyB0aGlzIGZ1bmN0aW9uIHdvdWxkIGRlY2lkZSBpZiB3ZSB3aWxsIHVwZGF0ZSB0aGUgb2JzZXJ2ZXIncyAnY3VycmVudCdcbi8vIHByb3BlcnRpZXMgYWZ0ZXIgYW4gb3B0aW1pc3RpYyByZWFkaW5nIHZpYSBnZXRPcHRpbWlzdGljUmVzdWx0XG5mdW5jdGlvbiBzaG91bGRBc3NpZ25PYnNlcnZlckN1cnJlbnRQcm9wZXJ0aWVzPFxuICBUUXVlcnlGbkRhdGEgPSB1bmtub3duLFxuICBURXJyb3IgPSB1bmtub3duLFxuICBURGF0YSA9IFRRdWVyeUZuRGF0YSxcbiAgVFF1ZXJ5RGF0YSA9IFRRdWVyeUZuRGF0YSxcbiAgVFF1ZXJ5S2V5IGV4dGVuZHMgUXVlcnlLZXkgPSBRdWVyeUtleSxcbj4oXG4gIG9ic2VydmVyOiBRdWVyeU9ic2VydmVyPFRRdWVyeUZuRGF0YSwgVEVycm9yLCBURGF0YSwgVFF1ZXJ5RGF0YSwgVFF1ZXJ5S2V5PixcbiAgb3B0aW1pc3RpY1Jlc3VsdDogUXVlcnlPYnNlcnZlclJlc3VsdDxURGF0YSwgVEVycm9yPixcbiAgb3B0aW9uczogRGVmYXVsdGVkUXVlcnlPYnNlcnZlck9wdGlvbnM8XG4gICAgVFF1ZXJ5Rm5EYXRhLFxuICAgIFRFcnJvcixcbiAgICBURGF0YSxcbiAgICBUUXVlcnlEYXRhLFxuICAgIFRRdWVyeUtleVxuICA+LFxuKSB7XG4gIC8vIGl0IGlzIGltcG9ydGFudCB0byBrZWVwIHRoaXMgY29uZGl0aW9uIGxpa2UgdGhpcyBmb3IgdGhyZWUgcmVhc29uczpcbiAgLy8gMS4gSXQgd2lsbCBnZXQgcmVtb3ZlZCBpbiB0aGUgdjVcbiAgLy8gMi4gaXQgcmVhZHM6IGRvbid0IHVwZGF0ZSB0aGUgcHJvcGVydGllcyBpZiB3ZSB3YW50IHRvIGtlZXAgdGhlIHByZXZpb3VzXG4gIC8vIGRhdGEuXG4gIC8vIDMuIFRoZSBvcHBvc2l0ZSBjb25kaXRpb24gKCFvcHRpb25zLmtlZXBQcmV2aW91c0RhdGEpIHdvdWxkIGZhbGx0aHJvdWdoXG4gIC8vIGFuZCB3aWxsIHJlc3VsdCBpbiBhIGJhZCBkZWNpc2lvblxuICBpZiAob3B0aW9ucy5rZWVwUHJldmlvdXNEYXRhKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICAvLyB0aGlzIG1lYW5zIHdlIHdhbnQgdG8gcHV0IHNvbWUgcGxhY2Vob2xkZXIgZGF0YSB3aGVuIHBlbmRpbmcgYW5kIHF1ZXJ5S2V5XG4gIC8vIGNoYW5nZWQuXG4gIGlmIChvcHRpb25zLnBsYWNlaG9sZGVyRGF0YSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgLy8gcmUtYXNzaWduIHByb3BlcnRpZXMgb25seSBpZiBjdXJyZW50IGRhdGEgaXMgcGxhY2Vob2xkZXIgZGF0YVxuICAgIC8vIHdoaWNoIG1lYW5zIHRoYXQgZGF0YSBkaWQgbm90IGFycml2ZSB5ZXQsIHNvLCBpZiB0aGVyZSBpcyBzb21lIGNhY2hlZCBkYXRhXG4gICAgLy8gd2UgbmVlZCB0byBcInByZXBhcmVcIiB0byByZWNlaXZlIGl0XG4gICAgcmV0dXJuIG9wdGltaXN0aWNSZXN1bHQuaXNQbGFjZWhvbGRlckRhdGFcbiAgfVxuXG4gIC8vIGlmIHRoZSBuZXdseSBjcmVhdGVkIHJlc3VsdCBpc24ndCB3aGF0IHRoZSBvYnNlcnZlciBpcyBob2xkaW5nIGFzIGN1cnJlbnQsXG4gIC8vIHRoZW4gd2UnbGwgbmVlZCB0byB1cGRhdGUgdGhlIHByb3BlcnRpZXMgYXMgd2VsbFxuICBpZiAoIXNoYWxsb3dFcXVhbE9iamVjdHMob2JzZXJ2ZXIuZ2V0Q3VycmVudFJlc3VsdCgpLCBvcHRpbWlzdGljUmVzdWx0KSkge1xuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICAvLyBiYXNpY2FsbHksIGp1c3Qga2VlcCBwcmV2aW91cyBwcm9wZXJ0aWVzIGlmIG5vdGhpbmcgY2hhbmdlZFxuICByZXR1cm4gZmFsc2Vcbn1cbiIsICJpbXBvcnQgeyBnZXREZWZhdWx0U3RhdGUgfSBmcm9tICcuL211dGF0aW9uJ1xuaW1wb3J0IHsgbm90aWZ5TWFuYWdlciB9IGZyb20gJy4vbm90aWZ5TWFuYWdlcidcbmltcG9ydCB7IFN1YnNjcmliYWJsZSB9IGZyb20gJy4vc3Vic2NyaWJhYmxlJ1xuaW1wb3J0IHsgc2hhbGxvd0VxdWFsT2JqZWN0cyB9IGZyb20gJy4vdXRpbHMnXG5pbXBvcnQgdHlwZSB7IFF1ZXJ5Q2xpZW50IH0gZnJvbSAnLi9xdWVyeUNsaWVudCdcbmltcG9ydCB0eXBlIHtcbiAgTXV0YXRlT3B0aW9ucyxcbiAgTXV0YXRpb25PYnNlcnZlckJhc2VSZXN1bHQsXG4gIE11dGF0aW9uT2JzZXJ2ZXJPcHRpb25zLFxuICBNdXRhdGlvbk9ic2VydmVyUmVzdWx0LFxufSBmcm9tICcuL3R5cGVzJ1xuaW1wb3J0IHR5cGUgeyBBY3Rpb24sIE11dGF0aW9uIH0gZnJvbSAnLi9tdXRhdGlvbidcblxuLy8gVFlQRVNcblxudHlwZSBNdXRhdGlvbk9ic2VydmVyTGlzdGVuZXI8VERhdGEsIFRFcnJvciwgVFZhcmlhYmxlcywgVENvbnRleHQ+ID0gKFxuICByZXN1bHQ6IE11dGF0aW9uT2JzZXJ2ZXJSZXN1bHQ8VERhdGEsIFRFcnJvciwgVFZhcmlhYmxlcywgVENvbnRleHQ+LFxuKSA9PiB2b2lkXG5cbmludGVyZmFjZSBOb3RpZnlPcHRpb25zIHtcbiAgbGlzdGVuZXJzPzogYm9vbGVhblxuICBvbkVycm9yPzogYm9vbGVhblxuICBvblN1Y2Nlc3M/OiBib29sZWFuXG59XG5cbi8vIENMQVNTXG5cbmV4cG9ydCBjbGFzcyBNdXRhdGlvbk9ic2VydmVyPFxuICBURGF0YSA9IHVua25vd24sXG4gIFRFcnJvciA9IHVua25vd24sXG4gIFRWYXJpYWJsZXMgPSB2b2lkLFxuICBUQ29udGV4dCA9IHVua25vd24sXG4+IGV4dGVuZHMgU3Vic2NyaWJhYmxlPFxuICBNdXRhdGlvbk9ic2VydmVyTGlzdGVuZXI8VERhdGEsIFRFcnJvciwgVFZhcmlhYmxlcywgVENvbnRleHQ+XG4+IHtcbiAgb3B0aW9ucyE6IE11dGF0aW9uT2JzZXJ2ZXJPcHRpb25zPFREYXRhLCBURXJyb3IsIFRWYXJpYWJsZXMsIFRDb250ZXh0PlxuXG4gIHByaXZhdGUgY2xpZW50OiBRdWVyeUNsaWVudFxuICBwcml2YXRlIGN1cnJlbnRSZXN1bHQhOiBNdXRhdGlvbk9ic2VydmVyUmVzdWx0PFxuICAgIFREYXRhLFxuICAgIFRFcnJvcixcbiAgICBUVmFyaWFibGVzLFxuICAgIFRDb250ZXh0XG4gID5cbiAgcHJpdmF0ZSBjdXJyZW50TXV0YXRpb24/OiBNdXRhdGlvbjxURGF0YSwgVEVycm9yLCBUVmFyaWFibGVzLCBUQ29udGV4dD5cbiAgcHJpdmF0ZSBtdXRhdGVPcHRpb25zPzogTXV0YXRlT3B0aW9uczxURGF0YSwgVEVycm9yLCBUVmFyaWFibGVzLCBUQ29udGV4dD5cblxuICBjb25zdHJ1Y3RvcihcbiAgICBjbGllbnQ6IFF1ZXJ5Q2xpZW50LFxuICAgIG9wdGlvbnM6IE11dGF0aW9uT2JzZXJ2ZXJPcHRpb25zPFREYXRhLCBURXJyb3IsIFRWYXJpYWJsZXMsIFRDb250ZXh0PixcbiAgKSB7XG4gICAgc3VwZXIoKVxuXG4gICAgdGhpcy5jbGllbnQgPSBjbGllbnRcbiAgICB0aGlzLnNldE9wdGlvbnMob3B0aW9ucylcbiAgICB0aGlzLmJpbmRNZXRob2RzKClcbiAgICB0aGlzLnVwZGF0ZVJlc3VsdCgpXG4gIH1cblxuICBwcm90ZWN0ZWQgYmluZE1ldGhvZHMoKTogdm9pZCB7XG4gICAgdGhpcy5tdXRhdGUgPSB0aGlzLm11dGF0ZS5iaW5kKHRoaXMpXG4gICAgdGhpcy5yZXNldCA9IHRoaXMucmVzZXQuYmluZCh0aGlzKVxuICB9XG5cbiAgc2V0T3B0aW9ucyhcbiAgICBvcHRpb25zPzogTXV0YXRpb25PYnNlcnZlck9wdGlvbnM8VERhdGEsIFRFcnJvciwgVFZhcmlhYmxlcywgVENvbnRleHQ+LFxuICApIHtcbiAgICBjb25zdCBwcmV2T3B0aW9ucyA9IHRoaXMub3B0aW9uc1xuICAgIHRoaXMub3B0aW9ucyA9IHRoaXMuY2xpZW50LmRlZmF1bHRNdXRhdGlvbk9wdGlvbnMob3B0aW9ucylcbiAgICBpZiAoIXNoYWxsb3dFcXVhbE9iamVjdHMocHJldk9wdGlvbnMsIHRoaXMub3B0aW9ucykpIHtcbiAgICAgIHRoaXMuY2xpZW50LmdldE11dGF0aW9uQ2FjaGUoKS5ub3RpZnkoe1xuICAgICAgICB0eXBlOiAnb2JzZXJ2ZXJPcHRpb25zVXBkYXRlZCcsXG4gICAgICAgIG11dGF0aW9uOiB0aGlzLmN1cnJlbnRNdXRhdGlvbixcbiAgICAgICAgb2JzZXJ2ZXI6IHRoaXMsXG4gICAgICB9KVxuICAgIH1cbiAgICB0aGlzLmN1cnJlbnRNdXRhdGlvbj8uc2V0T3B0aW9ucyh0aGlzLm9wdGlvbnMpXG4gIH1cblxuICBwcm90ZWN0ZWQgb25VbnN1YnNjcmliZSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuaGFzTGlzdGVuZXJzKCkpIHtcbiAgICAgIHRoaXMuY3VycmVudE11dGF0aW9uPy5yZW1vdmVPYnNlcnZlcih0aGlzKVxuICAgIH1cbiAgfVxuXG4gIG9uTXV0YXRpb25VcGRhdGUoYWN0aW9uOiBBY3Rpb248VERhdGEsIFRFcnJvciwgVFZhcmlhYmxlcywgVENvbnRleHQ+KTogdm9pZCB7XG4gICAgdGhpcy51cGRhdGVSZXN1bHQoKVxuXG4gICAgLy8gRGV0ZXJtaW5lIHdoaWNoIGNhbGxiYWNrcyB0byB0cmlnZ2VyXG4gICAgY29uc3Qgbm90aWZ5T3B0aW9uczogTm90aWZ5T3B0aW9ucyA9IHtcbiAgICAgIGxpc3RlbmVyczogdHJ1ZSxcbiAgICB9XG5cbiAgICBpZiAoYWN0aW9uLnR5cGUgPT09ICdzdWNjZXNzJykge1xuICAgICAgbm90aWZ5T3B0aW9ucy5vblN1Y2Nlc3MgPSB0cnVlXG4gICAgfSBlbHNlIGlmIChhY3Rpb24udHlwZSA9PT0gJ2Vycm9yJykge1xuICAgICAgbm90aWZ5T3B0aW9ucy5vbkVycm9yID0gdHJ1ZVxuICAgIH1cblxuICAgIHRoaXMubm90aWZ5KG5vdGlmeU9wdGlvbnMpXG4gIH1cblxuICBnZXRDdXJyZW50UmVzdWx0KCk6IE11dGF0aW9uT2JzZXJ2ZXJSZXN1bHQ8XG4gICAgVERhdGEsXG4gICAgVEVycm9yLFxuICAgIFRWYXJpYWJsZXMsXG4gICAgVENvbnRleHRcbiAgPiB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFJlc3VsdFxuICB9XG5cbiAgcmVzZXQoKTogdm9pZCB7XG4gICAgdGhpcy5jdXJyZW50TXV0YXRpb24gPSB1bmRlZmluZWRcbiAgICB0aGlzLnVwZGF0ZVJlc3VsdCgpXG4gICAgdGhpcy5ub3RpZnkoeyBsaXN0ZW5lcnM6IHRydWUgfSlcbiAgfVxuXG4gIG11dGF0ZShcbiAgICB2YXJpYWJsZXM/OiBUVmFyaWFibGVzLFxuICAgIG9wdGlvbnM/OiBNdXRhdGVPcHRpb25zPFREYXRhLCBURXJyb3IsIFRWYXJpYWJsZXMsIFRDb250ZXh0PixcbiAgKTogUHJvbWlzZTxURGF0YT4ge1xuICAgIHRoaXMubXV0YXRlT3B0aW9ucyA9IG9wdGlvbnNcblxuICAgIGlmICh0aGlzLmN1cnJlbnRNdXRhdGlvbikge1xuICAgICAgdGhpcy5jdXJyZW50TXV0YXRpb24ucmVtb3ZlT2JzZXJ2ZXIodGhpcylcbiAgICB9XG5cbiAgICB0aGlzLmN1cnJlbnRNdXRhdGlvbiA9IHRoaXMuY2xpZW50LmdldE11dGF0aW9uQ2FjaGUoKS5idWlsZCh0aGlzLmNsaWVudCwge1xuICAgICAgLi4udGhpcy5vcHRpb25zLFxuICAgICAgdmFyaWFibGVzOlxuICAgICAgICB0eXBlb2YgdmFyaWFibGVzICE9PSAndW5kZWZpbmVkJyA/IHZhcmlhYmxlcyA6IHRoaXMub3B0aW9ucy52YXJpYWJsZXMsXG4gICAgfSlcblxuICAgIHRoaXMuY3VycmVudE11dGF0aW9uLmFkZE9ic2VydmVyKHRoaXMpXG5cbiAgICByZXR1cm4gdGhpcy5jdXJyZW50TXV0YXRpb24uZXhlY3V0ZSgpXG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZVJlc3VsdCgpOiB2b2lkIHtcbiAgICBjb25zdCBzdGF0ZSA9IHRoaXMuY3VycmVudE11dGF0aW9uXG4gICAgICA/IHRoaXMuY3VycmVudE11dGF0aW9uLnN0YXRlXG4gICAgICA6IGdldERlZmF1bHRTdGF0ZTxURGF0YSwgVEVycm9yLCBUVmFyaWFibGVzLCBUQ29udGV4dD4oKVxuXG4gICAgY29uc3QgcmVzdWx0OiBNdXRhdGlvbk9ic2VydmVyQmFzZVJlc3VsdDxcbiAgICAgIFREYXRhLFxuICAgICAgVEVycm9yLFxuICAgICAgVFZhcmlhYmxlcyxcbiAgICAgIFRDb250ZXh0XG4gICAgPiA9IHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgaXNMb2FkaW5nOiBzdGF0ZS5zdGF0dXMgPT09ICdsb2FkaW5nJyxcbiAgICAgIGlzU3VjY2Vzczogc3RhdGUuc3RhdHVzID09PSAnc3VjY2VzcycsXG4gICAgICBpc0Vycm9yOiBzdGF0ZS5zdGF0dXMgPT09ICdlcnJvcicsXG4gICAgICBpc0lkbGU6IHN0YXRlLnN0YXR1cyA9PT0gJ2lkbGUnLFxuICAgICAgbXV0YXRlOiB0aGlzLm11dGF0ZSxcbiAgICAgIHJlc2V0OiB0aGlzLnJlc2V0LFxuICAgIH1cblxuICAgIHRoaXMuY3VycmVudFJlc3VsdCA9IHJlc3VsdCBhcyBNdXRhdGlvbk9ic2VydmVyUmVzdWx0PFxuICAgICAgVERhdGEsXG4gICAgICBURXJyb3IsXG4gICAgICBUVmFyaWFibGVzLFxuICAgICAgVENvbnRleHRcbiAgICA+XG4gIH1cblxuICBwcml2YXRlIG5vdGlmeShvcHRpb25zOiBOb3RpZnlPcHRpb25zKSB7XG4gICAgbm90aWZ5TWFuYWdlci5iYXRjaCgoKSA9PiB7XG4gICAgICAvLyBGaXJzdCB0cmlnZ2VyIHRoZSBtdXRhdGUgY2FsbGJhY2tzXG4gICAgICBpZiAodGhpcy5tdXRhdGVPcHRpb25zICYmIHRoaXMuaGFzTGlzdGVuZXJzKCkpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMub25TdWNjZXNzKSB7XG4gICAgICAgICAgdGhpcy5tdXRhdGVPcHRpb25zLm9uU3VjY2Vzcz8uKFxuICAgICAgICAgICAgdGhpcy5jdXJyZW50UmVzdWx0LmRhdGEhLFxuICAgICAgICAgICAgdGhpcy5jdXJyZW50UmVzdWx0LnZhcmlhYmxlcyEsXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRSZXN1bHQuY29udGV4dCEsXG4gICAgICAgICAgKVxuICAgICAgICAgIHRoaXMubXV0YXRlT3B0aW9ucy5vblNldHRsZWQ/LihcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFJlc3VsdC5kYXRhISxcbiAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRSZXN1bHQudmFyaWFibGVzISxcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFJlc3VsdC5jb250ZXh0LFxuICAgICAgICAgIClcbiAgICAgICAgfSBlbHNlIGlmIChvcHRpb25zLm9uRXJyb3IpIHtcbiAgICAgICAgICB0aGlzLm11dGF0ZU9wdGlvbnMub25FcnJvcj8uKFxuICAgICAgICAgICAgdGhpcy5jdXJyZW50UmVzdWx0LmVycm9yISxcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFJlc3VsdC52YXJpYWJsZXMhLFxuICAgICAgICAgICAgdGhpcy5jdXJyZW50UmVzdWx0LmNvbnRleHQsXG4gICAgICAgICAgKVxuICAgICAgICAgIHRoaXMubXV0YXRlT3B0aW9ucy5vblNldHRsZWQ/LihcbiAgICAgICAgICAgIHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFJlc3VsdC5lcnJvcixcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFJlc3VsdC52YXJpYWJsZXMhLFxuICAgICAgICAgICAgdGhpcy5jdXJyZW50UmVzdWx0LmNvbnRleHQsXG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZW4gdHJpZ2dlciB0aGUgbGlzdGVuZXJzXG4gICAgICBpZiAob3B0aW9ucy5saXN0ZW5lcnMpIHtcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMuZm9yRWFjaCgoeyBsaXN0ZW5lciB9KSA9PiB7XG4gICAgICAgICAgbGlzdGVuZXIodGhpcy5jdXJyZW50UmVzdWx0KVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG4gIH1cbn1cbiIsICJpbXBvcnQgdHlwZSB7IFF1ZXJ5Q2xpZW50IH0gZnJvbSAnLi9xdWVyeUNsaWVudCdcbmltcG9ydCB0eXBlIHsgUXVlcnksIFF1ZXJ5U3RhdGUgfSBmcm9tICcuL3F1ZXJ5J1xuaW1wb3J0IHR5cGUge1xuICBNdXRhdGlvbktleSxcbiAgTXV0YXRpb25PcHRpb25zLFxuICBRdWVyeUtleSxcbiAgUXVlcnlPcHRpb25zLFxufSBmcm9tICcuL3R5cGVzJ1xuaW1wb3J0IHR5cGUgeyBNdXRhdGlvbiwgTXV0YXRpb25TdGF0ZSB9IGZyb20gJy4vbXV0YXRpb24nXG5cbi8vIFRZUEVTXG5cbmV4cG9ydCBpbnRlcmZhY2UgRGVoeWRyYXRlT3B0aW9ucyB7XG4gIGRlaHlkcmF0ZU11dGF0aW9ucz86IGJvb2xlYW5cbiAgZGVoeWRyYXRlUXVlcmllcz86IGJvb2xlYW5cbiAgc2hvdWxkRGVoeWRyYXRlTXV0YXRpb24/OiBTaG91bGREZWh5ZHJhdGVNdXRhdGlvbkZ1bmN0aW9uXG4gIHNob3VsZERlaHlkcmF0ZVF1ZXJ5PzogU2hvdWxkRGVoeWRyYXRlUXVlcnlGdW5jdGlvblxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEh5ZHJhdGVPcHRpb25zIHtcbiAgZGVmYXVsdE9wdGlvbnM/OiB7XG4gICAgcXVlcmllcz86IFF1ZXJ5T3B0aW9uc1xuICAgIG11dGF0aW9ucz86IE11dGF0aW9uT3B0aW9uc1xuICB9XG59XG5cbmludGVyZmFjZSBEZWh5ZHJhdGVkTXV0YXRpb24ge1xuICBtdXRhdGlvbktleT86IE11dGF0aW9uS2V5XG4gIHN0YXRlOiBNdXRhdGlvblN0YXRlXG59XG5cbmludGVyZmFjZSBEZWh5ZHJhdGVkUXVlcnkge1xuICBxdWVyeUhhc2g6IHN0cmluZ1xuICBxdWVyeUtleTogUXVlcnlLZXlcbiAgc3RhdGU6IFF1ZXJ5U3RhdGVcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEZWh5ZHJhdGVkU3RhdGUge1xuICBtdXRhdGlvbnM6IERlaHlkcmF0ZWRNdXRhdGlvbltdXG4gIHF1ZXJpZXM6IERlaHlkcmF0ZWRRdWVyeVtdXG59XG5cbmV4cG9ydCB0eXBlIFNob3VsZERlaHlkcmF0ZVF1ZXJ5RnVuY3Rpb24gPSAocXVlcnk6IFF1ZXJ5KSA9PiBib29sZWFuXG5cbmV4cG9ydCB0eXBlIFNob3VsZERlaHlkcmF0ZU11dGF0aW9uRnVuY3Rpb24gPSAobXV0YXRpb246IE11dGF0aW9uKSA9PiBib29sZWFuXG5cbi8vIEZVTkNUSU9OU1xuXG5mdW5jdGlvbiBkZWh5ZHJhdGVNdXRhdGlvbihtdXRhdGlvbjogTXV0YXRpb24pOiBEZWh5ZHJhdGVkTXV0YXRpb24ge1xuICByZXR1cm4ge1xuICAgIG11dGF0aW9uS2V5OiBtdXRhdGlvbi5vcHRpb25zLm11dGF0aW9uS2V5LFxuICAgIHN0YXRlOiBtdXRhdGlvbi5zdGF0ZSxcbiAgfVxufVxuXG4vLyBNb3N0IGNvbmZpZyBpcyBub3QgZGVoeWRyYXRlZCBidXQgaW5zdGVhZCBtZWFudCB0byBjb25maWd1cmUgYWdhaW4gd2hlblxuLy8gY29uc3VtaW5nIHRoZSBkZS9yZWh5ZHJhdGVkIGRhdGEsIHR5cGljYWxseSB3aXRoIHVzZVF1ZXJ5IG9uIHRoZSBjbGllbnQuXG4vLyBTb21ldGltZXMgaXQgbWlnaHQgbWFrZSBzZW5zZSB0byBwcmVmZXRjaCBkYXRhIG9uIHRoZSBzZXJ2ZXIgYW5kIGluY2x1ZGVcbi8vIGluIHRoZSBodG1sLXBheWxvYWQsIGJ1dCBub3QgY29uc3VtZSBpdCBvbiB0aGUgaW5pdGlhbCByZW5kZXIuXG5mdW5jdGlvbiBkZWh5ZHJhdGVRdWVyeShxdWVyeTogUXVlcnkpOiBEZWh5ZHJhdGVkUXVlcnkge1xuICByZXR1cm4ge1xuICAgIHN0YXRlOiBxdWVyeS5zdGF0ZSxcbiAgICBxdWVyeUtleTogcXVlcnkucXVlcnlLZXksXG4gICAgcXVlcnlIYXNoOiBxdWVyeS5xdWVyeUhhc2gsXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlZmF1bHRTaG91bGREZWh5ZHJhdGVNdXRhdGlvbihtdXRhdGlvbjogTXV0YXRpb24pIHtcbiAgcmV0dXJuIG11dGF0aW9uLnN0YXRlLmlzUGF1c2VkXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWZhdWx0U2hvdWxkRGVoeWRyYXRlUXVlcnkocXVlcnk6IFF1ZXJ5KSB7XG4gIHJldHVybiBxdWVyeS5zdGF0ZS5zdGF0dXMgPT09ICdzdWNjZXNzJ1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVoeWRyYXRlKFxuICBjbGllbnQ6IFF1ZXJ5Q2xpZW50LFxuICBvcHRpb25zOiBEZWh5ZHJhdGVPcHRpb25zID0ge30sXG4pOiBEZWh5ZHJhdGVkU3RhdGUge1xuICBjb25zdCBtdXRhdGlvbnM6IERlaHlkcmF0ZWRNdXRhdGlvbltdID0gW11cbiAgY29uc3QgcXVlcmllczogRGVoeWRyYXRlZFF1ZXJ5W10gPSBbXVxuXG4gIGlmIChvcHRpb25zLmRlaHlkcmF0ZU11dGF0aW9ucyAhPT0gZmFsc2UpIHtcbiAgICBjb25zdCBzaG91bGREZWh5ZHJhdGVNdXRhdGlvbiA9XG4gICAgICBvcHRpb25zLnNob3VsZERlaHlkcmF0ZU11dGF0aW9uIHx8IGRlZmF1bHRTaG91bGREZWh5ZHJhdGVNdXRhdGlvblxuXG4gICAgY2xpZW50XG4gICAgICAuZ2V0TXV0YXRpb25DYWNoZSgpXG4gICAgICAuZ2V0QWxsKClcbiAgICAgIC5mb3JFYWNoKChtdXRhdGlvbikgPT4ge1xuICAgICAgICBpZiAoc2hvdWxkRGVoeWRyYXRlTXV0YXRpb24obXV0YXRpb24pKSB7XG4gICAgICAgICAgbXV0YXRpb25zLnB1c2goZGVoeWRyYXRlTXV0YXRpb24obXV0YXRpb24pKVxuICAgICAgICB9XG4gICAgICB9KVxuICB9XG5cbiAgaWYgKG9wdGlvbnMuZGVoeWRyYXRlUXVlcmllcyAhPT0gZmFsc2UpIHtcbiAgICBjb25zdCBzaG91bGREZWh5ZHJhdGVRdWVyeSA9XG4gICAgICBvcHRpb25zLnNob3VsZERlaHlkcmF0ZVF1ZXJ5IHx8IGRlZmF1bHRTaG91bGREZWh5ZHJhdGVRdWVyeVxuXG4gICAgY2xpZW50XG4gICAgICAuZ2V0UXVlcnlDYWNoZSgpXG4gICAgICAuZ2V0QWxsKClcbiAgICAgIC5mb3JFYWNoKChxdWVyeSkgPT4ge1xuICAgICAgICBpZiAoc2hvdWxkRGVoeWRyYXRlUXVlcnkocXVlcnkpKSB7XG4gICAgICAgICAgcXVlcmllcy5wdXNoKGRlaHlkcmF0ZVF1ZXJ5KHF1ZXJ5KSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgfVxuXG4gIHJldHVybiB7IG11dGF0aW9ucywgcXVlcmllcyB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoeWRyYXRlKFxuICBjbGllbnQ6IFF1ZXJ5Q2xpZW50LFxuICBkZWh5ZHJhdGVkU3RhdGU6IHVua25vd24sXG4gIG9wdGlvbnM/OiBIeWRyYXRlT3B0aW9ucyxcbik6IHZvaWQge1xuICBpZiAodHlwZW9mIGRlaHlkcmF0ZWRTdGF0ZSAhPT0gJ29iamVjdCcgfHwgZGVoeWRyYXRlZFN0YXRlID09PSBudWxsKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICBjb25zdCBtdXRhdGlvbkNhY2hlID0gY2xpZW50LmdldE11dGF0aW9uQ2FjaGUoKVxuICBjb25zdCBxdWVyeUNhY2hlID0gY2xpZW50LmdldFF1ZXJ5Q2FjaGUoKVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW5uZWNlc3NhcnktY29uZGl0aW9uXG4gIGNvbnN0IG11dGF0aW9ucyA9IChkZWh5ZHJhdGVkU3RhdGUgYXMgRGVoeWRyYXRlZFN0YXRlKS5tdXRhdGlvbnMgfHwgW11cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bm5lY2Vzc2FyeS1jb25kaXRpb25cbiAgY29uc3QgcXVlcmllcyA9IChkZWh5ZHJhdGVkU3RhdGUgYXMgRGVoeWRyYXRlZFN0YXRlKS5xdWVyaWVzIHx8IFtdXG5cbiAgbXV0YXRpb25zLmZvckVhY2goKGRlaHlkcmF0ZWRNdXRhdGlvbikgPT4ge1xuICAgIG11dGF0aW9uQ2FjaGUuYnVpbGQoXG4gICAgICBjbGllbnQsXG4gICAgICB7XG4gICAgICAgIC4uLm9wdGlvbnM/LmRlZmF1bHRPcHRpb25zPy5tdXRhdGlvbnMsXG4gICAgICAgIG11dGF0aW9uS2V5OiBkZWh5ZHJhdGVkTXV0YXRpb24ubXV0YXRpb25LZXksXG4gICAgICB9LFxuICAgICAgZGVoeWRyYXRlZE11dGF0aW9uLnN0YXRlLFxuICAgIClcbiAgfSlcblxuICBxdWVyaWVzLmZvckVhY2goKHsgcXVlcnlLZXksIHN0YXRlLCBxdWVyeUhhc2ggfSkgPT4ge1xuICAgIGNvbnN0IHF1ZXJ5ID0gcXVlcnlDYWNoZS5nZXQocXVlcnlIYXNoKVxuXG4gICAgLy8gRG8gbm90IGh5ZHJhdGUgaWYgYW4gZXhpc3RpbmcgcXVlcnkgZXhpc3RzIHdpdGggbmV3ZXIgZGF0YVxuICAgIGlmIChxdWVyeSkge1xuICAgICAgaWYgKHF1ZXJ5LnN0YXRlLmRhdGFVcGRhdGVkQXQgPCBzdGF0ZS5kYXRhVXBkYXRlZEF0KSB7XG4gICAgICAgIC8vIG9taXQgZmV0Y2hTdGF0dXMgZnJvbSBkZWh5ZHJhdGVkIHN0YXRlXG4gICAgICAgIC8vIHNvIHRoYXQgcXVlcnkgc3RheXMgaW4gaXRzIGN1cnJlbnQgZmV0Y2hTdGF0dXNcbiAgICAgICAgY29uc3QgeyBmZXRjaFN0YXR1czogX2lnbm9yZWQsIC4uLmRlaHlkcmF0ZWRRdWVyeVN0YXRlIH0gPSBzdGF0ZVxuICAgICAgICBxdWVyeS5zZXRTdGF0ZShkZWh5ZHJhdGVkUXVlcnlTdGF0ZSlcbiAgICAgIH1cbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIC8vIFJlc3RvcmUgcXVlcnlcbiAgICBxdWVyeUNhY2hlLmJ1aWxkKFxuICAgICAgY2xpZW50LFxuICAgICAge1xuICAgICAgICAuLi5vcHRpb25zPy5kZWZhdWx0T3B0aW9ucz8ucXVlcmllcyxcbiAgICAgICAgcXVlcnlLZXksXG4gICAgICAgIHF1ZXJ5SGFzaCxcbiAgICAgIH0sXG4gICAgICAvLyBSZXNldCBmZXRjaCBzdGF0dXMgdG8gaWRsZSB0byBhdm9pZFxuICAgICAgLy8gcXVlcnkgYmVpbmcgc3R1Y2sgaW4gZmV0Y2hpbmcgc3RhdGUgdXBvbiBoeWRyYXRpb25cbiAgICAgIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGZldGNoU3RhdHVzOiAnaWRsZScsXG4gICAgICB9LFxuICAgIClcbiAgfSlcbn1cbiIsICJleHBvcnQge1xuXHRvbkRlc3Ryb3ksXG5cdHNldENvbnRleHQsXG5cdGdldENvbnRleHQsXG5cdGdldEFsbENvbnRleHRzLFxuXHRoYXNDb250ZXh0LFxuXHR0aWNrLFxuXHRjcmVhdGVFdmVudERpc3BhdGNoZXIsXG5cdFN2ZWx0ZUNvbXBvbmVudCxcblx0U3ZlbHRlQ29tcG9uZW50VHlwZWRcbn0gZnJvbSAnLi9pbmRleC5qcyc7XG5cbi8qKiBAcmV0dXJucyB7dm9pZH0gKi9cbmV4cG9ydCBmdW5jdGlvbiBvbk1vdW50KCkge31cblxuLyoqIEByZXR1cm5zIHt2b2lkfSAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJlZm9yZVVwZGF0ZSgpIHt9XG5cbi8qKiBAcmV0dXJucyB7dm9pZH0gKi9cbmV4cG9ydCBmdW5jdGlvbiBhZnRlclVwZGF0ZSgpIHt9XG4iLCAiaW1wb3J0IHsgZ2V0Q29udGV4dCwgc2V0Q29udGV4dCB9IGZyb20gJ3N2ZWx0ZSc7XG5jb25zdCBfY29udGV4dEtleSA9ICckJF9xdWVyeUNsaWVudCc7XG4vKiogUmV0cmlldmVzIGEgQ2xpZW50IGZyb20gU3ZlbHRlJ3MgY29udGV4dCAqL1xuZXhwb3J0IGNvbnN0IGdldFF1ZXJ5Q2xpZW50Q29udGV4dCA9ICgpID0+IHtcbiAgICBjb25zdCBjbGllbnQgPSBnZXRDb250ZXh0KF9jb250ZXh0S2V5KTtcbiAgICBpZiAoIWNsaWVudCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIFF1ZXJ5Q2xpZW50IHdhcyBmb3VuZCBpbiBTdmVsdGUgY29udGV4dC4gRGlkIHlvdSBmb3JnZXQgdG8gd3JhcCB5b3VyIGNvbXBvbmVudCB3aXRoIFF1ZXJ5Q2xpZW50UHJvdmlkZXI/Jyk7XG4gICAgfVxuICAgIHJldHVybiBjbGllbnQ7XG59O1xuLyoqIFNldHMgYSBRdWVyeUNsaWVudCBvbiBTdmVsdGUncyBjb250ZXh0ICovXG5leHBvcnQgY29uc3Qgc2V0UXVlcnlDbGllbnRDb250ZXh0ID0gKGNsaWVudCkgPT4ge1xuICAgIHNldENvbnRleHQoX2NvbnRleHRLZXksIGNsaWVudCk7XG59O1xuIiwgImltcG9ydCB7XG5cdHJ1bl9hbGwsXG5cdHN1YnNjcmliZSxcblx0bm9vcCxcblx0c2FmZV9ub3RfZXF1YWwsXG5cdGlzX2Z1bmN0aW9uLFxuXHRnZXRfc3RvcmVfdmFsdWVcbn0gZnJvbSAnLi4vaW50ZXJuYWwvaW5kZXguanMnO1xuXG5jb25zdCBzdWJzY3JpYmVyX3F1ZXVlID0gW107XG5cbi8qKlxuICogQ3JlYXRlcyBhIGBSZWFkYWJsZWAgc3RvcmUgdGhhdCBhbGxvd3MgcmVhZGluZyBieSBzdWJzY3JpcHRpb24uXG4gKlxuICogaHR0cHM6Ly9zdmVsdGUuZGV2L2RvY3Mvc3ZlbHRlLXN0b3JlI3JlYWRhYmxlXG4gKiBAdGVtcGxhdGUgVFxuICogQHBhcmFtIHtUfSBbdmFsdWVdIGluaXRpYWwgdmFsdWVcbiAqIEBwYXJhbSB7aW1wb3J0KCcuL3B1YmxpYy5qcycpLlN0YXJ0U3RvcE5vdGlmaWVyPFQ+fSBbc3RhcnRdXG4gKiBAcmV0dXJucyB7aW1wb3J0KCcuL3B1YmxpYy5qcycpLlJlYWRhYmxlPFQ+fVxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVhZGFibGUodmFsdWUsIHN0YXJ0KSB7XG5cdHJldHVybiB7XG5cdFx0c3Vic2NyaWJlOiB3cml0YWJsZSh2YWx1ZSwgc3RhcnQpLnN1YnNjcmliZVxuXHR9O1xufVxuXG4vKipcbiAqIENyZWF0ZSBhIGBXcml0YWJsZWAgc3RvcmUgdGhhdCBhbGxvd3MgYm90aCB1cGRhdGluZyBhbmQgcmVhZGluZyBieSBzdWJzY3JpcHRpb24uXG4gKlxuICogaHR0cHM6Ly9zdmVsdGUuZGV2L2RvY3Mvc3ZlbHRlLXN0b3JlI3dyaXRhYmxlXG4gKiBAdGVtcGxhdGUgVFxuICogQHBhcmFtIHtUfSBbdmFsdWVdIGluaXRpYWwgdmFsdWVcbiAqIEBwYXJhbSB7aW1wb3J0KCcuL3B1YmxpYy5qcycpLlN0YXJ0U3RvcE5vdGlmaWVyPFQ+fSBbc3RhcnRdXG4gKiBAcmV0dXJucyB7aW1wb3J0KCcuL3B1YmxpYy5qcycpLldyaXRhYmxlPFQ+fVxuICovXG5leHBvcnQgZnVuY3Rpb24gd3JpdGFibGUodmFsdWUsIHN0YXJ0ID0gbm9vcCkge1xuXHQvKiogQHR5cGUge2ltcG9ydCgnLi9wdWJsaWMuanMnKS5VbnN1YnNjcmliZXJ9ICovXG5cdGxldCBzdG9wO1xuXHQvKiogQHR5cGUge1NldDxpbXBvcnQoJy4vcHJpdmF0ZS5qcycpLlN1YnNjcmliZUludmFsaWRhdGVUdXBsZTxUPj59ICovXG5cdGNvbnN0IHN1YnNjcmliZXJzID0gbmV3IFNldCgpO1xuXHQvKiogQHBhcmFtIHtUfSBuZXdfdmFsdWVcblx0ICogQHJldHVybnMge3ZvaWR9XG5cdCAqL1xuXHRmdW5jdGlvbiBzZXQobmV3X3ZhbHVlKSB7XG5cdFx0aWYgKHNhZmVfbm90X2VxdWFsKHZhbHVlLCBuZXdfdmFsdWUpKSB7XG5cdFx0XHR2YWx1ZSA9IG5ld192YWx1ZTtcblx0XHRcdGlmIChzdG9wKSB7XG5cdFx0XHRcdC8vIHN0b3JlIGlzIHJlYWR5XG5cdFx0XHRcdGNvbnN0IHJ1bl9xdWV1ZSA9ICFzdWJzY3JpYmVyX3F1ZXVlLmxlbmd0aDtcblx0XHRcdFx0Zm9yIChjb25zdCBzdWJzY3JpYmVyIG9mIHN1YnNjcmliZXJzKSB7XG5cdFx0XHRcdFx0c3Vic2NyaWJlclsxXSgpO1xuXHRcdFx0XHRcdHN1YnNjcmliZXJfcXVldWUucHVzaChzdWJzY3JpYmVyLCB2YWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKHJ1bl9xdWV1ZSkge1xuXHRcdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgc3Vic2NyaWJlcl9xdWV1ZS5sZW5ndGg7IGkgKz0gMikge1xuXHRcdFx0XHRcdFx0c3Vic2NyaWJlcl9xdWV1ZVtpXVswXShzdWJzY3JpYmVyX3F1ZXVlW2kgKyAxXSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHN1YnNjcmliZXJfcXVldWUubGVuZ3RoID0gMDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBAcGFyYW0ge2ltcG9ydCgnLi9wdWJsaWMuanMnKS5VcGRhdGVyPFQ+fSBmblxuXHQgKiBAcmV0dXJucyB7dm9pZH1cblx0ICovXG5cdGZ1bmN0aW9uIHVwZGF0ZShmbikge1xuXHRcdHNldChmbih2YWx1ZSkpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwYXJhbSB7aW1wb3J0KCcuL3B1YmxpYy5qcycpLlN1YnNjcmliZXI8VD59IHJ1blxuXHQgKiBAcGFyYW0ge2ltcG9ydCgnLi9wcml2YXRlLmpzJykuSW52YWxpZGF0b3I8VD59IFtpbnZhbGlkYXRlXVxuXHQgKiBAcmV0dXJucyB7aW1wb3J0KCcuL3B1YmxpYy5qcycpLlVuc3Vic2NyaWJlcn1cblx0ICovXG5cdGZ1bmN0aW9uIHN1YnNjcmliZShydW4sIGludmFsaWRhdGUgPSBub29wKSB7XG5cdFx0LyoqIEB0eXBlIHtpbXBvcnQoJy4vcHJpdmF0ZS5qcycpLlN1YnNjcmliZUludmFsaWRhdGVUdXBsZTxUPn0gKi9cblx0XHRjb25zdCBzdWJzY3JpYmVyID0gW3J1biwgaW52YWxpZGF0ZV07XG5cdFx0c3Vic2NyaWJlcnMuYWRkKHN1YnNjcmliZXIpO1xuXHRcdGlmIChzdWJzY3JpYmVycy5zaXplID09PSAxKSB7XG5cdFx0XHRzdG9wID0gc3RhcnQoc2V0LCB1cGRhdGUpIHx8IG5vb3A7XG5cdFx0fVxuXHRcdHJ1bih2YWx1ZSk7XG5cdFx0cmV0dXJuICgpID0+IHtcblx0XHRcdHN1YnNjcmliZXJzLmRlbGV0ZShzdWJzY3JpYmVyKTtcblx0XHRcdGlmIChzdWJzY3JpYmVycy5zaXplID09PSAwICYmIHN0b3ApIHtcblx0XHRcdFx0c3RvcCgpO1xuXHRcdFx0XHRzdG9wID0gbnVsbDtcblx0XHRcdH1cblx0XHR9O1xuXHR9XG5cdHJldHVybiB7IHNldCwgdXBkYXRlLCBzdWJzY3JpYmUgfTtcbn1cblxuLyoqXG4gKiBEZXJpdmVkIHZhbHVlIHN0b3JlIGJ5IHN5bmNocm9uaXppbmcgb25lIG9yIG1vcmUgcmVhZGFibGUgc3RvcmVzIGFuZFxuICogYXBwbHlpbmcgYW4gYWdncmVnYXRpb24gZnVuY3Rpb24gb3ZlciBpdHMgaW5wdXQgdmFsdWVzLlxuICpcbiAqIGh0dHBzOi8vc3ZlbHRlLmRldi9kb2NzL3N2ZWx0ZS1zdG9yZSNkZXJpdmVkXG4gKiBAdGVtcGxhdGUge2ltcG9ydCgnLi9wcml2YXRlLmpzJykuU3RvcmVzfSBTXG4gKiBAdGVtcGxhdGUgVFxuICogQG92ZXJsb2FkXG4gKiBAcGFyYW0ge1N9IHN0b3JlcyAtIGlucHV0IHN0b3Jlc1xuICogQHBhcmFtIHsodmFsdWVzOiBpbXBvcnQoJy4vcHJpdmF0ZS5qcycpLlN0b3Jlc1ZhbHVlczxTPiwgc2V0OiAodmFsdWU6IFQpID0+IHZvaWQsIHVwZGF0ZTogKGZuOiBpbXBvcnQoJy4vcHVibGljLmpzJykuVXBkYXRlcjxUPikgPT4gdm9pZCkgPT4gaW1wb3J0KCcuL3B1YmxpYy5qcycpLlVuc3Vic2NyaWJlciB8IHZvaWR9IGZuIC0gZnVuY3Rpb24gY2FsbGJhY2sgdGhhdCBhZ2dyZWdhdGVzIHRoZSB2YWx1ZXNcbiAqIEBwYXJhbSB7VH0gW2luaXRpYWxfdmFsdWVdIC0gaW5pdGlhbCB2YWx1ZVxuICogQHJldHVybnMge2ltcG9ydCgnLi9wdWJsaWMuanMnKS5SZWFkYWJsZTxUPn1cbiAqL1xuXG4vKipcbiAqIERlcml2ZWQgdmFsdWUgc3RvcmUgYnkgc3luY2hyb25pemluZyBvbmUgb3IgbW9yZSByZWFkYWJsZSBzdG9yZXMgYW5kXG4gKiBhcHBseWluZyBhbiBhZ2dyZWdhdGlvbiBmdW5jdGlvbiBvdmVyIGl0cyBpbnB1dCB2YWx1ZXMuXG4gKlxuICogaHR0cHM6Ly9zdmVsdGUuZGV2L2RvY3Mvc3ZlbHRlLXN0b3JlI2Rlcml2ZWRcbiAqIEB0ZW1wbGF0ZSB7aW1wb3J0KCcuL3ByaXZhdGUuanMnKS5TdG9yZXN9IFNcbiAqIEB0ZW1wbGF0ZSBUXG4gKiBAb3ZlcmxvYWRcbiAqIEBwYXJhbSB7U30gc3RvcmVzIC0gaW5wdXQgc3RvcmVzXG4gKiBAcGFyYW0geyh2YWx1ZXM6IGltcG9ydCgnLi9wcml2YXRlLmpzJykuU3RvcmVzVmFsdWVzPFM+KSA9PiBUfSBmbiAtIGZ1bmN0aW9uIGNhbGxiYWNrIHRoYXQgYWdncmVnYXRlcyB0aGUgdmFsdWVzXG4gKiBAcGFyYW0ge1R9IFtpbml0aWFsX3ZhbHVlXSAtIGluaXRpYWwgdmFsdWVcbiAqIEByZXR1cm5zIHtpbXBvcnQoJy4vcHVibGljLmpzJykuUmVhZGFibGU8VD59XG4gKi9cblxuLyoqXG4gKiBAdGVtcGxhdGUge2ltcG9ydCgnLi9wcml2YXRlLmpzJykuU3RvcmVzfSBTXG4gKiBAdGVtcGxhdGUgVFxuICogQHBhcmFtIHtTfSBzdG9yZXNcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge1R9IFtpbml0aWFsX3ZhbHVlXVxuICogQHJldHVybnMge2ltcG9ydCgnLi9wdWJsaWMuanMnKS5SZWFkYWJsZTxUPn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlcml2ZWQoc3RvcmVzLCBmbiwgaW5pdGlhbF92YWx1ZSkge1xuXHRjb25zdCBzaW5nbGUgPSAhQXJyYXkuaXNBcnJheShzdG9yZXMpO1xuXHQvKiogQHR5cGUge0FycmF5PGltcG9ydCgnLi9wdWJsaWMuanMnKS5SZWFkYWJsZTxhbnk+Pn0gKi9cblx0Y29uc3Qgc3RvcmVzX2FycmF5ID0gc2luZ2xlID8gW3N0b3Jlc10gOiBzdG9yZXM7XG5cdGlmICghc3RvcmVzX2FycmF5LmV2ZXJ5KEJvb2xlYW4pKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdkZXJpdmVkKCkgZXhwZWN0cyBzdG9yZXMgYXMgaW5wdXQsIGdvdCBhIGZhbHN5IHZhbHVlJyk7XG5cdH1cblx0Y29uc3QgYXV0byA9IGZuLmxlbmd0aCA8IDI7XG5cdHJldHVybiByZWFkYWJsZShpbml0aWFsX3ZhbHVlLCAoc2V0LCB1cGRhdGUpID0+IHtcblx0XHRsZXQgc3RhcnRlZCA9IGZhbHNlO1xuXHRcdGNvbnN0IHZhbHVlcyA9IFtdO1xuXHRcdGxldCBwZW5kaW5nID0gMDtcblx0XHRsZXQgY2xlYW51cCA9IG5vb3A7XG5cdFx0Y29uc3Qgc3luYyA9ICgpID0+IHtcblx0XHRcdGlmIChwZW5kaW5nKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdGNsZWFudXAoKTtcblx0XHRcdGNvbnN0IHJlc3VsdCA9IGZuKHNpbmdsZSA/IHZhbHVlc1swXSA6IHZhbHVlcywgc2V0LCB1cGRhdGUpO1xuXHRcdFx0aWYgKGF1dG8pIHtcblx0XHRcdFx0c2V0KHJlc3VsdCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjbGVhbnVwID0gaXNfZnVuY3Rpb24ocmVzdWx0KSA/IHJlc3VsdCA6IG5vb3A7XG5cdFx0XHR9XG5cdFx0fTtcblx0XHRjb25zdCB1bnN1YnNjcmliZXJzID0gc3RvcmVzX2FycmF5Lm1hcCgoc3RvcmUsIGkpID0+XG5cdFx0XHRzdWJzY3JpYmUoXG5cdFx0XHRcdHN0b3JlLFxuXHRcdFx0XHQodmFsdWUpID0+IHtcblx0XHRcdFx0XHR2YWx1ZXNbaV0gPSB2YWx1ZTtcblx0XHRcdFx0XHRwZW5kaW5nICY9IH4oMSA8PCBpKTtcblx0XHRcdFx0XHRpZiAoc3RhcnRlZCkge1xuXHRcdFx0XHRcdFx0c3luYygpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0KCkgPT4ge1xuXHRcdFx0XHRcdHBlbmRpbmcgfD0gMSA8PCBpO1xuXHRcdFx0XHR9XG5cdFx0XHQpXG5cdFx0KTtcblx0XHRzdGFydGVkID0gdHJ1ZTtcblx0XHRzeW5jKCk7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uIHN0b3AoKSB7XG5cdFx0XHRydW5fYWxsKHVuc3Vic2NyaWJlcnMpO1xuXHRcdFx0Y2xlYW51cCgpO1xuXHRcdFx0Ly8gV2UgbmVlZCB0byBzZXQgdGhpcyB0byBmYWxzZSBiZWNhdXNlIGNhbGxiYWNrcyBjYW4gc3RpbGwgaGFwcGVuIGRlc3BpdGUgaGF2aW5nIHVuc3Vic2NyaWJlZDpcblx0XHRcdC8vIENhbGxiYWNrcyBtaWdodCBhbHJlYWR5IGJlIHBsYWNlZCBpbiB0aGUgcXVldWUgd2hpY2ggZG9lc24ndCBrbm93IGl0IHNob3VsZCBubyBsb25nZXJcblx0XHRcdC8vIGludm9rZSB0aGlzIGRlcml2ZWQgc3RvcmUuXG5cdFx0XHRzdGFydGVkID0gZmFsc2U7XG5cdFx0fTtcblx0fSk7XG59XG5cbi8qKlxuICogVGFrZXMgYSBzdG9yZSBhbmQgcmV0dXJucyBhIG5ldyBvbmUgZGVyaXZlZCBmcm9tIHRoZSBvbGQgb25lIHRoYXQgaXMgcmVhZGFibGUuXG4gKlxuICogaHR0cHM6Ly9zdmVsdGUuZGV2L2RvY3Mvc3ZlbHRlLXN0b3JlI3JlYWRvbmx5XG4gKiBAdGVtcGxhdGUgVFxuICogQHBhcmFtIHtpbXBvcnQoJy4vcHVibGljLmpzJykuUmVhZGFibGU8VD59IHN0b3JlICAtIHN0b3JlIHRvIG1ha2UgcmVhZG9ubHlcbiAqIEByZXR1cm5zIHtpbXBvcnQoJy4vcHVibGljLmpzJykuUmVhZGFibGU8VD59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZWFkb25seShzdG9yZSkge1xuXHRyZXR1cm4ge1xuXHRcdHN1YnNjcmliZTogc3RvcmUuc3Vic2NyaWJlLmJpbmQoc3RvcmUpXG5cdH07XG59XG5cbmV4cG9ydCB7IGdldF9zdG9yZV92YWx1ZSBhcyBnZXQgfTtcbiIsICJpbXBvcnQgeyBnZXRRdWVyeUNsaWVudENvbnRleHQgfSBmcm9tICcuL2NvbnRleHQnO1xuZXhwb3J0IGZ1bmN0aW9uIHVzZVF1ZXJ5Q2xpZW50KCkge1xuICAgIGNvbnN0IHF1ZXJ5Q2xpZW50ID0gZ2V0UXVlcnlDbGllbnRDb250ZXh0KCk7XG4gICAgcmV0dXJuIHF1ZXJ5Q2xpZW50O1xufVxuIiwgImltcG9ydCB7IG5vdGlmeU1hbmFnZXIsIH0gZnJvbSAnQHRhbnN0YWNrL3F1ZXJ5LWNvcmUnO1xuaW1wb3J0IHsgZGVyaXZlZCwgcmVhZGFibGUgfSBmcm9tICdzdmVsdGUvc3RvcmUnO1xuaW1wb3J0IHsgdXNlUXVlcnlDbGllbnQgfSBmcm9tICcuL3VzZVF1ZXJ5Q2xpZW50JztcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVCYXNlUXVlcnkob3B0aW9ucywgT2JzZXJ2ZXIpIHtcbiAgICBjb25zdCBxdWVyeUNsaWVudCA9IHVzZVF1ZXJ5Q2xpZW50KCk7XG4gICAgY29uc3QgZGVmYXVsdGVkT3B0aW9ucyA9IHF1ZXJ5Q2xpZW50LmRlZmF1bHRRdWVyeU9wdGlvbnMob3B0aW9ucyk7XG4gICAgZGVmYXVsdGVkT3B0aW9ucy5fb3B0aW1pc3RpY1Jlc3VsdHMgPSAnb3B0aW1pc3RpYyc7XG4gICAgbGV0IG9ic2VydmVyID0gbmV3IE9ic2VydmVyKHF1ZXJ5Q2xpZW50LCBkZWZhdWx0ZWRPcHRpb25zKTtcbiAgICAvLyBJbmNsdWRlIGNhbGxiYWNrcyBpbiBiYXRjaCByZW5kZXJzXG4gICAgaWYgKGRlZmF1bHRlZE9wdGlvbnMub25FcnJvcikge1xuICAgICAgICBkZWZhdWx0ZWRPcHRpb25zLm9uRXJyb3IgPSBub3RpZnlNYW5hZ2VyLmJhdGNoQ2FsbHMoZGVmYXVsdGVkT3B0aW9ucy5vbkVycm9yKTtcbiAgICB9XG4gICAgaWYgKGRlZmF1bHRlZE9wdGlvbnMub25TdWNjZXNzKSB7XG4gICAgICAgIGRlZmF1bHRlZE9wdGlvbnMub25TdWNjZXNzID0gbm90aWZ5TWFuYWdlci5iYXRjaENhbGxzKGRlZmF1bHRlZE9wdGlvbnMub25TdWNjZXNzKTtcbiAgICB9XG4gICAgaWYgKGRlZmF1bHRlZE9wdGlvbnMub25TZXR0bGVkKSB7XG4gICAgICAgIGRlZmF1bHRlZE9wdGlvbnMub25TZXR0bGVkID0gbm90aWZ5TWFuYWdlci5iYXRjaENhbGxzKGRlZmF1bHRlZE9wdGlvbnMub25TZXR0bGVkKTtcbiAgICB9XG4gICAgcmVhZGFibGUob2JzZXJ2ZXIpLnN1YnNjcmliZSgoJG9ic2VydmVyKSA9PiB7XG4gICAgICAgIG9ic2VydmVyID0gJG9ic2VydmVyO1xuICAgICAgICAvLyBEbyBub3Qgbm90aWZ5IG9uIHVwZGF0ZXMgYmVjYXVzZSBvZiBjaGFuZ2VzIGluIHRoZSBvcHRpb25zIGJlY2F1c2VcbiAgICAgICAgLy8gdGhlc2UgY2hhbmdlcyBzaG91bGQgYWxyZWFkeSBiZSByZWZsZWN0ZWQgaW4gdGhlIG9wdGltaXN0aWMgcmVzdWx0LlxuICAgICAgICBvYnNlcnZlci5zZXRPcHRpb25zKGRlZmF1bHRlZE9wdGlvbnMsIHsgbGlzdGVuZXJzOiBmYWxzZSB9KTtcbiAgICB9KTtcbiAgICBjb25zdCByZXN1bHQgPSByZWFkYWJsZShvYnNlcnZlci5nZXRDdXJyZW50UmVzdWx0KCksIChzZXQpID0+IHtcbiAgICAgICAgcmV0dXJuIG9ic2VydmVyLnN1YnNjcmliZShub3RpZnlNYW5hZ2VyLmJhdGNoQ2FsbHMoc2V0KSk7XG4gICAgfSk7XG4gICAgY29uc3QgeyBzdWJzY3JpYmUgfSA9IGRlcml2ZWQocmVzdWx0LCAoJHJlc3VsdCkgPT4ge1xuICAgICAgICAkcmVzdWx0ID0gb2JzZXJ2ZXIuZ2V0T3B0aW1pc3RpY1Jlc3VsdChkZWZhdWx0ZWRPcHRpb25zKTtcbiAgICAgICAgcmV0dXJuICFkZWZhdWx0ZWRPcHRpb25zLm5vdGlmeU9uQ2hhbmdlUHJvcHNcbiAgICAgICAgICAgID8gb2JzZXJ2ZXIudHJhY2tSZXN1bHQoJHJlc3VsdClcbiAgICAgICAgICAgIDogJHJlc3VsdDtcbiAgICB9KTtcbiAgICByZXR1cm4geyBzdWJzY3JpYmUgfTtcbn1cbiIsICJpbXBvcnQgeyBRdWVyeU9ic2VydmVyLCBwYXJzZVF1ZXJ5QXJncyB9IGZyb20gJ0B0YW5zdGFjay9xdWVyeS1jb3JlJztcbmltcG9ydCB7IGNyZWF0ZUJhc2VRdWVyeSB9IGZyb20gJy4vY3JlYXRlQmFzZVF1ZXJ5JztcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVRdWVyeShhcmcxLCBhcmcyLCBhcmczKSB7XG4gICAgY29uc3QgcGFyc2VkT3B0aW9ucyA9IHBhcnNlUXVlcnlBcmdzKGFyZzEsIGFyZzIsIGFyZzMpO1xuICAgIGNvbnN0IHJlc3VsdCA9IGNyZWF0ZUJhc2VRdWVyeShwYXJzZWRPcHRpb25zLCBRdWVyeU9ic2VydmVyKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuIiwgImltcG9ydCB7IGRlcml2ZWQsIHJlYWRhYmxlIH0gZnJvbSAnc3ZlbHRlL3N0b3JlJztcbmltcG9ydCB7IE11dGF0aW9uT2JzZXJ2ZXIsIG5vdGlmeU1hbmFnZXIsIHBhcnNlTXV0YXRpb25BcmdzLCB9IGZyb20gJ0B0YW5zdGFjay9xdWVyeS1jb3JlJztcbmltcG9ydCB7IHVzZVF1ZXJ5Q2xpZW50IH0gZnJvbSAnLi91c2VRdWVyeUNsaWVudCc7XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTXV0YXRpb24oYXJnMSwgYXJnMiwgYXJnMykge1xuICAgIGNvbnN0IG9wdGlvbnMgPSBwYXJzZU11dGF0aW9uQXJncyhhcmcxLCBhcmcyLCBhcmczKTtcbiAgICBjb25zdCBxdWVyeUNsaWVudCA9IHVzZVF1ZXJ5Q2xpZW50KCk7XG4gICAgbGV0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIocXVlcnlDbGllbnQsIG9wdGlvbnMpO1xuICAgIGxldCBtdXRhdGU7XG4gICAgcmVhZGFibGUob2JzZXJ2ZXIpLnN1YnNjcmliZSgoJG9ic2VydmVyKSA9PiB7XG4gICAgICAgIG9ic2VydmVyID0gJG9ic2VydmVyO1xuICAgICAgICBtdXRhdGUgPSAodmFyaWFibGVzLCBtdXRhdGVPcHRpb25zKSA9PiB7XG4gICAgICAgICAgICBvYnNlcnZlci5tdXRhdGUodmFyaWFibGVzLCBtdXRhdGVPcHRpb25zKS5jYXRjaChub29wKTtcbiAgICAgICAgfTtcbiAgICAgICAgb2JzZXJ2ZXIuc2V0T3B0aW9ucyhvcHRpb25zKTtcbiAgICB9KTtcbiAgICBjb25zdCByZXN1bHQgPSByZWFkYWJsZShvYnNlcnZlci5nZXRDdXJyZW50UmVzdWx0KCksIChzZXQpID0+IHtcbiAgICAgICAgcmV0dXJuIG9ic2VydmVyLnN1YnNjcmliZShub3RpZnlNYW5hZ2VyLmJhdGNoQ2FsbHMoKHZhbCkgPT4gc2V0KHZhbCkpKTtcbiAgICB9KTtcbiAgICBjb25zdCB7IHN1YnNjcmliZSB9ID0gZGVyaXZlZChyZXN1bHQsICgkcmVzdWx0KSA9PiAoe1xuICAgICAgICAuLi4kcmVzdWx0LFxuICAgICAgICBtdXRhdGUsXG4gICAgICAgIG11dGF0ZUFzeW5jOiAkcmVzdWx0Lm11dGF0ZSxcbiAgICB9KSk7XG4gICAgcmV0dXJuIHsgc3Vic2NyaWJlIH07XG59XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWVtcHR5LWZ1bmN0aW9uXG5mdW5jdGlvbiBub29wKCkgeyB9XG4iLCAiaW1wb3J0IHsgaHlkcmF0ZSwgfSBmcm9tICdAdGFuc3RhY2svcXVlcnktY29yZSc7XG5pbXBvcnQgeyB1c2VRdWVyeUNsaWVudCB9IGZyb20gJy4vdXNlUXVlcnlDbGllbnQnO1xuZXhwb3J0IGZ1bmN0aW9uIHVzZUh5ZHJhdGUoc3RhdGUsIG9wdGlvbnMpIHtcbiAgICBjb25zdCBjbGllbnQgPSB1c2VRdWVyeUNsaWVudCgpO1xuICAgIGlmIChzdGF0ZSkge1xuICAgICAgICBoeWRyYXRlKGNsaWVudCwgc3RhdGUsIG9wdGlvbnMpO1xuICAgIH1cbn1cbiIsICI8c2NyaXB0PmltcG9ydCB7IHVzZUh5ZHJhdGUgfSBmcm9tIFwiLi91c2VIeWRyYXRlXCI7XG5leHBvcnQgbGV0IHN0YXRlO1xuZXhwb3J0IGxldCBvcHRpb25zID0gdm9pZCAwO1xudXNlSHlkcmF0ZShzdGF0ZSwgb3B0aW9ucyk7XG48L3NjcmlwdD5cblxuPHNsb3QgLz5cbiIsICI8c2NyaXB0PmltcG9ydCB7IG9uRGVzdHJveSwgb25Nb3VudCB9IGZyb20gXCJzdmVsdGVcIjtcbmltcG9ydCB7IFF1ZXJ5Q2xpZW50IH0gZnJvbSBcIkB0YW5zdGFjay9xdWVyeS1jb3JlXCI7XG5pbXBvcnQgeyBzZXRRdWVyeUNsaWVudENvbnRleHQgfSBmcm9tIFwiLi9jb250ZXh0XCI7XG5leHBvcnQgbGV0IGNsaWVudCA9IG5ldyBRdWVyeUNsaWVudCgpO1xub25Nb3VudCgoKSA9PiB7XG4gIGNsaWVudC5tb3VudCgpO1xufSk7XG5zZXRRdWVyeUNsaWVudENvbnRleHQoY2xpZW50KTtcbm9uRGVzdHJveSgoKSA9PiB7XG4gIGNsaWVudC51bm1vdW50KCk7XG59KTtcbjwvc2NyaXB0PlxuXG48c2xvdCAvPlxuIiwgIi8vIFNob3VsZCBiZSBubyBpbXBvcnRzIGhlcmUhXG5cbi8qKlxuICogVGhlIHNlbnRpbmVsIHZhbHVlIHJldHVybmVkIGJ5IHByb2R1Y2VycyB0byByZXBsYWNlIHRoZSBkcmFmdCB3aXRoIHVuZGVmaW5lZC5cbiAqL1xuZXhwb3J0IGNvbnN0IE5PVEhJTkc6IHVuaXF1ZSBzeW1ib2wgPSBTeW1ib2wuZm9yKFwiaW1tZXItbm90aGluZ1wiKVxuXG4vKipcbiAqIFRvIGxldCBJbW1lciB0cmVhdCB5b3VyIGNsYXNzIGluc3RhbmNlcyBhcyBwbGFpbiBpbW11dGFibGUgb2JqZWN0c1xuICogKGFsYmVpdCB3aXRoIGEgY3VzdG9tIHByb3RvdHlwZSksIHlvdSBtdXN0IGRlZmluZSBlaXRoZXIgYW4gaW5zdGFuY2UgcHJvcGVydHlcbiAqIG9yIGEgc3RhdGljIHByb3BlcnR5IG9uIGVhY2ggb2YgeW91ciBjdXN0b20gY2xhc3Nlcy5cbiAqXG4gKiBPdGhlcndpc2UsIHlvdXIgY2xhc3MgaW5zdGFuY2Ugd2lsbCBuZXZlciBiZSBkcmFmdGVkLCB3aGljaCBtZWFucyBpdCB3b24ndCBiZVxuICogc2FmZSB0byBtdXRhdGUgaW4gYSBwcm9kdWNlIGNhbGxiYWNrLlxuICovXG5leHBvcnQgY29uc3QgRFJBRlRBQkxFOiB1bmlxdWUgc3ltYm9sID0gU3ltYm9sLmZvcihcImltbWVyLWRyYWZ0YWJsZVwiKVxuXG5leHBvcnQgY29uc3QgRFJBRlRfU1RBVEU6IHVuaXF1ZSBzeW1ib2wgPSBTeW1ib2wuZm9yKFwiaW1tZXItc3RhdGVcIilcbiIsICJleHBvcnQgY29uc3QgZXJyb3JzID1cblx0cHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiXG5cdFx0PyBbXG5cdFx0XHRcdC8vIEFsbCBlcnJvciBjb2Rlcywgc3RhcnRpbmcgYnkgMDpcblx0XHRcdFx0ZnVuY3Rpb24ocGx1Z2luOiBzdHJpbmcpIHtcblx0XHRcdFx0XHRyZXR1cm4gYFRoZSBwbHVnaW4gZm9yICcke3BsdWdpbn0nIGhhcyBub3QgYmVlbiBsb2FkZWQgaW50byBJbW1lci4gVG8gZW5hYmxlIHRoZSBwbHVnaW4sIGltcG9ydCBhbmQgY2FsbCBcXGBlbmFibGUke3BsdWdpbn0oKVxcYCB3aGVuIGluaXRpYWxpemluZyB5b3VyIGFwcGxpY2F0aW9uLmBcblx0XHRcdFx0fSxcblx0XHRcdFx0ZnVuY3Rpb24odGhpbmc6IHN0cmluZykge1xuXHRcdFx0XHRcdHJldHVybiBgcHJvZHVjZSBjYW4gb25seSBiZSBjYWxsZWQgb24gdGhpbmdzIHRoYXQgYXJlIGRyYWZ0YWJsZTogcGxhaW4gb2JqZWN0cywgYXJyYXlzLCBNYXAsIFNldCBvciBjbGFzc2VzIHRoYXQgYXJlIG1hcmtlZCB3aXRoICdbaW1tZXJhYmxlXTogdHJ1ZScuIEdvdCAnJHt0aGluZ30nYFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRcIlRoaXMgb2JqZWN0IGhhcyBiZWVuIGZyb3plbiBhbmQgc2hvdWxkIG5vdCBiZSBtdXRhdGVkXCIsXG5cdFx0XHRcdGZ1bmN0aW9uKGRhdGE6IGFueSkge1xuXHRcdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0XHRcIkNhbm5vdCB1c2UgYSBwcm94eSB0aGF0IGhhcyBiZWVuIHJldm9rZWQuIERpZCB5b3UgcGFzcyBhbiBvYmplY3QgZnJvbSBpbnNpZGUgYW4gaW1tZXIgZnVuY3Rpb24gdG8gYW4gYXN5bmMgcHJvY2Vzcz8gXCIgK1xuXHRcdFx0XHRcdFx0ZGF0YVxuXHRcdFx0XHRcdClcblx0XHRcdFx0fSxcblx0XHRcdFx0XCJBbiBpbW1lciBwcm9kdWNlciByZXR1cm5lZCBhIG5ldyB2YWx1ZSAqYW5kKiBtb2RpZmllZCBpdHMgZHJhZnQuIEVpdGhlciByZXR1cm4gYSBuZXcgdmFsdWUgKm9yKiBtb2RpZnkgdGhlIGRyYWZ0LlwiLFxuXHRcdFx0XHRcIkltbWVyIGZvcmJpZHMgY2lyY3VsYXIgcmVmZXJlbmNlc1wiLFxuXHRcdFx0XHRcIlRoZSBmaXJzdCBvciBzZWNvbmQgYXJndW1lbnQgdG8gYHByb2R1Y2VgIG11c3QgYmUgYSBmdW5jdGlvblwiLFxuXHRcdFx0XHRcIlRoZSB0aGlyZCBhcmd1bWVudCB0byBgcHJvZHVjZWAgbXVzdCBiZSBhIGZ1bmN0aW9uIG9yIHVuZGVmaW5lZFwiLFxuXHRcdFx0XHRcIkZpcnN0IGFyZ3VtZW50IHRvIGBjcmVhdGVEcmFmdGAgbXVzdCBiZSBhIHBsYWluIG9iamVjdCwgYW4gYXJyYXksIG9yIGFuIGltbWVyYWJsZSBvYmplY3RcIixcblx0XHRcdFx0XCJGaXJzdCBhcmd1bWVudCB0byBgZmluaXNoRHJhZnRgIG11c3QgYmUgYSBkcmFmdCByZXR1cm5lZCBieSBgY3JlYXRlRHJhZnRgXCIsXG5cdFx0XHRcdGZ1bmN0aW9uKHRoaW5nOiBzdHJpbmcpIHtcblx0XHRcdFx0XHRyZXR1cm4gYCdjdXJyZW50JyBleHBlY3RzIGEgZHJhZnQsIGdvdDogJHt0aGluZ31gXG5cdFx0XHRcdH0sXG5cdFx0XHRcdFwiT2JqZWN0LmRlZmluZVByb3BlcnR5KCkgY2Fubm90IGJlIHVzZWQgb24gYW4gSW1tZXIgZHJhZnRcIixcblx0XHRcdFx0XCJPYmplY3Quc2V0UHJvdG90eXBlT2YoKSBjYW5ub3QgYmUgdXNlZCBvbiBhbiBJbW1lciBkcmFmdFwiLFxuXHRcdFx0XHRcIkltbWVyIG9ubHkgc3VwcG9ydHMgZGVsZXRpbmcgYXJyYXkgaW5kaWNlc1wiLFxuXHRcdFx0XHRcIkltbWVyIG9ubHkgc3VwcG9ydHMgc2V0dGluZyBhcnJheSBpbmRpY2VzIGFuZCB0aGUgJ2xlbmd0aCcgcHJvcGVydHlcIixcblx0XHRcdFx0ZnVuY3Rpb24odGhpbmc6IHN0cmluZykge1xuXHRcdFx0XHRcdHJldHVybiBgJ29yaWdpbmFsJyBleHBlY3RzIGEgZHJhZnQsIGdvdDogJHt0aGluZ31gXG5cdFx0XHRcdH1cblx0XHRcdFx0Ly8gTm90ZTogaWYgbW9yZSBlcnJvcnMgYXJlIGFkZGVkLCB0aGUgZXJyb3JPZmZzZXQgaW4gUGF0Y2hlcy50cyBzaG91bGQgYmUgaW5jcmVhc2VkXG5cdFx0XHRcdC8vIFNlZSBQYXRjaGVzLnRzIGZvciBhZGRpdGlvbmFsIGVycm9yc1xuXHRcdCAgXVxuXHRcdDogW11cblxuZXhwb3J0IGZ1bmN0aW9uIGRpZShlcnJvcjogbnVtYmVyLCAuLi5hcmdzOiBhbnlbXSk6IG5ldmVyIHtcblx0aWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuXHRcdGNvbnN0IGUgPSBlcnJvcnNbZXJyb3JdXG5cdFx0Y29uc3QgbXNnID0gdHlwZW9mIGUgPT09IFwiZnVuY3Rpb25cIiA/IGUuYXBwbHkobnVsbCwgYXJncyBhcyBhbnkpIDogZVxuXHRcdHRocm93IG5ldyBFcnJvcihgW0ltbWVyXSAke21zZ31gKVxuXHR9XG5cdHRocm93IG5ldyBFcnJvcihcblx0XHRgW0ltbWVyXSBtaW5pZmllZCBlcnJvciBucjogJHtlcnJvcn0uIEZ1bGwgZXJyb3IgYXQ6IGh0dHBzOi8vYml0Lmx5LzNjWEVLV2ZgXG5cdClcbn1cbiIsICJpbXBvcnQge1xuXHREUkFGVF9TVEFURSxcblx0RFJBRlRBQkxFLFxuXHRPYmplY3Rpc2gsXG5cdERyYWZ0ZWQsXG5cdEFueU9iamVjdCxcblx0QW55TWFwLFxuXHRBbnlTZXQsXG5cdEltbWVyU3RhdGUsXG5cdEFyY2hUeXBlLFxuXHRkaWUsXG5cdFN0cmljdE1vZGVcbn0gZnJvbSBcIi4uL2ludGVybmFsXCJcblxuZXhwb3J0IGNvbnN0IGdldFByb3RvdHlwZU9mID0gT2JqZWN0LmdldFByb3RvdHlwZU9mXG5cbi8qKiBSZXR1cm5zIHRydWUgaWYgdGhlIGdpdmVuIHZhbHVlIGlzIGFuIEltbWVyIGRyYWZ0ICovXG4vKiNfX1BVUkVfXyovXG5leHBvcnQgZnVuY3Rpb24gaXNEcmFmdCh2YWx1ZTogYW55KTogYm9vbGVhbiB7XG5cdHJldHVybiAhIXZhbHVlICYmICEhdmFsdWVbRFJBRlRfU1RBVEVdXG59XG5cbi8qKiBSZXR1cm5zIHRydWUgaWYgdGhlIGdpdmVuIHZhbHVlIGNhbiBiZSBkcmFmdGVkIGJ5IEltbWVyICovXG4vKiNfX1BVUkVfXyovXG5leHBvcnQgZnVuY3Rpb24gaXNEcmFmdGFibGUodmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuXHRpZiAoIXZhbHVlKSByZXR1cm4gZmFsc2Vcblx0cmV0dXJuIChcblx0XHRpc1BsYWluT2JqZWN0KHZhbHVlKSB8fFxuXHRcdEFycmF5LmlzQXJyYXkodmFsdWUpIHx8XG5cdFx0ISF2YWx1ZVtEUkFGVEFCTEVdIHx8XG5cdFx0ISF2YWx1ZS5jb25zdHJ1Y3Rvcj8uW0RSQUZUQUJMRV0gfHxcblx0XHRpc01hcCh2YWx1ZSkgfHxcblx0XHRpc1NldCh2YWx1ZSlcblx0KVxufVxuXG5jb25zdCBvYmplY3RDdG9yU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS5jb25zdHJ1Y3Rvci50b1N0cmluZygpXG4vKiNfX1BVUkVfXyovXG5leHBvcnQgZnVuY3Rpb24gaXNQbGFpbk9iamVjdCh2YWx1ZTogYW55KTogYm9vbGVhbiB7XG5cdGlmICghdmFsdWUgfHwgdHlwZW9mIHZhbHVlICE9PSBcIm9iamVjdFwiKSByZXR1cm4gZmFsc2Vcblx0Y29uc3QgcHJvdG8gPSBnZXRQcm90b3R5cGVPZih2YWx1ZSlcblx0aWYgKHByb3RvID09PSBudWxsKSB7XG5cdFx0cmV0dXJuIHRydWVcblx0fVxuXHRjb25zdCBDdG9yID1cblx0XHRPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChwcm90bywgXCJjb25zdHJ1Y3RvclwiKSAmJiBwcm90by5jb25zdHJ1Y3RvclxuXG5cdGlmIChDdG9yID09PSBPYmplY3QpIHJldHVybiB0cnVlXG5cblx0cmV0dXJuIChcblx0XHR0eXBlb2YgQ3RvciA9PSBcImZ1bmN0aW9uXCIgJiZcblx0XHRGdW5jdGlvbi50b1N0cmluZy5jYWxsKEN0b3IpID09PSBvYmplY3RDdG9yU3RyaW5nXG5cdClcbn1cblxuLyoqIEdldCB0aGUgdW5kZXJseWluZyBvYmplY3QgdGhhdCBpcyByZXByZXNlbnRlZCBieSB0aGUgZ2l2ZW4gZHJhZnQgKi9cbi8qI19fUFVSRV9fKi9cbmV4cG9ydCBmdW5jdGlvbiBvcmlnaW5hbDxUPih2YWx1ZTogVCk6IFQgfCB1bmRlZmluZWRcbmV4cG9ydCBmdW5jdGlvbiBvcmlnaW5hbCh2YWx1ZTogRHJhZnRlZDxhbnk+KTogYW55IHtcblx0aWYgKCFpc0RyYWZ0KHZhbHVlKSkgZGllKDE1LCB2YWx1ZSlcblx0cmV0dXJuIHZhbHVlW0RSQUZUX1NUQVRFXS5iYXNlX1xufVxuXG4vKipcbiAqIEVhY2ggaXRlcmF0ZXMgYSBtYXAsIHNldCBvciBhcnJheS5cbiAqIE9yLCBpZiBhbnkgb3RoZXIga2luZCBvZiBvYmplY3QsIGFsbCBvZiBpdHMgb3duIHByb3BlcnRpZXMuXG4gKiBSZWdhcmRsZXNzIHdoZXRoZXIgdGhleSBhcmUgZW51bWVyYWJsZSBvciBzeW1ib2xzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBlYWNoPFQgZXh0ZW5kcyBPYmplY3Rpc2g+KFxuXHRvYmo6IFQsXG5cdGl0ZXI6IChrZXk6IHN0cmluZyB8IG51bWJlciwgdmFsdWU6IGFueSwgc291cmNlOiBUKSA9PiB2b2lkXG4pOiB2b2lkXG5leHBvcnQgZnVuY3Rpb24gZWFjaChvYmo6IGFueSwgaXRlcjogYW55KSB7XG5cdGlmIChnZXRBcmNodHlwZShvYmopID09PSBBcmNoVHlwZS5PYmplY3QpIHtcblx0XHRSZWZsZWN0Lm93bktleXMob2JqKS5mb3JFYWNoKGtleSA9PiB7XG5cdFx0XHRpdGVyKGtleSwgb2JqW2tleV0sIG9iailcblx0XHR9KVxuXHR9IGVsc2Uge1xuXHRcdG9iai5mb3JFYWNoKChlbnRyeTogYW55LCBpbmRleDogYW55KSA9PiBpdGVyKGluZGV4LCBlbnRyeSwgb2JqKSlcblx0fVxufVxuXG4vKiNfX1BVUkVfXyovXG5leHBvcnQgZnVuY3Rpb24gZ2V0QXJjaHR5cGUodGhpbmc6IGFueSk6IEFyY2hUeXBlIHtcblx0Y29uc3Qgc3RhdGU6IHVuZGVmaW5lZCB8IEltbWVyU3RhdGUgPSB0aGluZ1tEUkFGVF9TVEFURV1cblx0cmV0dXJuIHN0YXRlXG5cdFx0PyBzdGF0ZS50eXBlX1xuXHRcdDogQXJyYXkuaXNBcnJheSh0aGluZylcblx0XHQ/IEFyY2hUeXBlLkFycmF5XG5cdFx0OiBpc01hcCh0aGluZylcblx0XHQ/IEFyY2hUeXBlLk1hcFxuXHRcdDogaXNTZXQodGhpbmcpXG5cdFx0PyBBcmNoVHlwZS5TZXRcblx0XHQ6IEFyY2hUeXBlLk9iamVjdFxufVxuXG4vKiNfX1BVUkVfXyovXG5leHBvcnQgZnVuY3Rpb24gaGFzKHRoaW5nOiBhbnksIHByb3A6IFByb3BlcnR5S2V5KTogYm9vbGVhbiB7XG5cdHJldHVybiBnZXRBcmNodHlwZSh0aGluZykgPT09IEFyY2hUeXBlLk1hcFxuXHRcdD8gdGhpbmcuaGFzKHByb3ApXG5cdFx0OiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodGhpbmcsIHByb3ApXG59XG5cbi8qI19fUFVSRV9fKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXQodGhpbmc6IEFueU1hcCB8IEFueU9iamVjdCwgcHJvcDogUHJvcGVydHlLZXkpOiBhbnkge1xuXHQvLyBAdHMtaWdub3JlXG5cdHJldHVybiBnZXRBcmNodHlwZSh0aGluZykgPT09IEFyY2hUeXBlLk1hcCA/IHRoaW5nLmdldChwcm9wKSA6IHRoaW5nW3Byb3BdXG59XG5cbi8qI19fUFVSRV9fKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXQodGhpbmc6IGFueSwgcHJvcE9yT2xkVmFsdWU6IFByb3BlcnR5S2V5LCB2YWx1ZTogYW55KSB7XG5cdGNvbnN0IHQgPSBnZXRBcmNodHlwZSh0aGluZylcblx0aWYgKHQgPT09IEFyY2hUeXBlLk1hcCkgdGhpbmcuc2V0KHByb3BPck9sZFZhbHVlLCB2YWx1ZSlcblx0ZWxzZSBpZiAodCA9PT0gQXJjaFR5cGUuU2V0KSB7XG5cdFx0dGhpbmcuYWRkKHZhbHVlKVxuXHR9IGVsc2UgdGhpbmdbcHJvcE9yT2xkVmFsdWVdID0gdmFsdWVcbn1cblxuLyojX19QVVJFX18qL1xuZXhwb3J0IGZ1bmN0aW9uIGlzKHg6IGFueSwgeTogYW55KTogYm9vbGVhbiB7XG5cdC8vIEZyb206IGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9mYmpzL2Jsb2IvYzY5OTA0YTUxMWI5MDAyNjY5MzUxNjgyMjMwNjNkZDg3NzJkZmM0MC9wYWNrYWdlcy9mYmpzL3NyYy9jb3JlL3NoYWxsb3dFcXVhbC5qc1xuXHRpZiAoeCA9PT0geSkge1xuXHRcdHJldHVybiB4ICE9PSAwIHx8IDEgLyB4ID09PSAxIC8geVxuXHR9IGVsc2Uge1xuXHRcdHJldHVybiB4ICE9PSB4ICYmIHkgIT09IHlcblx0fVxufVxuXG4vKiNfX1BVUkVfXyovXG5leHBvcnQgZnVuY3Rpb24gaXNNYXAodGFyZ2V0OiBhbnkpOiB0YXJnZXQgaXMgQW55TWFwIHtcblx0cmV0dXJuIHRhcmdldCBpbnN0YW5jZW9mIE1hcFxufVxuXG4vKiNfX1BVUkVfXyovXG5leHBvcnQgZnVuY3Rpb24gaXNTZXQodGFyZ2V0OiBhbnkpOiB0YXJnZXQgaXMgQW55U2V0IHtcblx0cmV0dXJuIHRhcmdldCBpbnN0YW5jZW9mIFNldFxufVxuLyojX19QVVJFX18qL1xuZXhwb3J0IGZ1bmN0aW9uIGxhdGVzdChzdGF0ZTogSW1tZXJTdGF0ZSk6IGFueSB7XG5cdHJldHVybiBzdGF0ZS5jb3B5XyB8fCBzdGF0ZS5iYXNlX1xufVxuXG4vKiNfX1BVUkVfXyovXG5leHBvcnQgZnVuY3Rpb24gc2hhbGxvd0NvcHkoYmFzZTogYW55LCBzdHJpY3Q6IFN0cmljdE1vZGUpIHtcblx0aWYgKGlzTWFwKGJhc2UpKSB7XG5cdFx0cmV0dXJuIG5ldyBNYXAoYmFzZSlcblx0fVxuXHRpZiAoaXNTZXQoYmFzZSkpIHtcblx0XHRyZXR1cm4gbmV3IFNldChiYXNlKVxuXHR9XG5cdGlmIChBcnJheS5pc0FycmF5KGJhc2UpKSByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYmFzZSlcblxuXHRjb25zdCBpc1BsYWluID0gaXNQbGFpbk9iamVjdChiYXNlKVxuXG5cdGlmIChzdHJpY3QgPT09IHRydWUgfHwgKHN0cmljdCA9PT0gXCJjbGFzc19vbmx5XCIgJiYgIWlzUGxhaW4pKSB7XG5cdFx0Ly8gUGVyZm9ybSBhIHN0cmljdCBjb3B5XG5cdFx0Y29uc3QgZGVzY3JpcHRvcnMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhiYXNlKVxuXHRcdGRlbGV0ZSBkZXNjcmlwdG9yc1tEUkFGVF9TVEFURSBhcyBhbnldXG5cdFx0bGV0IGtleXMgPSBSZWZsZWN0Lm93bktleXMoZGVzY3JpcHRvcnMpXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRjb25zdCBrZXk6IGFueSA9IGtleXNbaV1cblx0XHRcdGNvbnN0IGRlc2MgPSBkZXNjcmlwdG9yc1trZXldXG5cdFx0XHRpZiAoZGVzYy53cml0YWJsZSA9PT0gZmFsc2UpIHtcblx0XHRcdFx0ZGVzYy53cml0YWJsZSA9IHRydWVcblx0XHRcdFx0ZGVzYy5jb25maWd1cmFibGUgPSB0cnVlXG5cdFx0XHR9XG5cdFx0XHQvLyBsaWtlIG9iamVjdC5hc3NpZ24sIHdlIHdpbGwgcmVhZCBhbnkgX293bl8sIGdldC9zZXQgYWNjZXNzb3JzLiBUaGlzIGhlbHBzIGluIGRlYWxpbmdcblx0XHRcdC8vIHdpdGggbGlicmFyaWVzIHRoYXQgdHJhcCB2YWx1ZXMsIGxpa2UgbW9ieCBvciB2dWVcblx0XHRcdC8vIHVubGlrZSBvYmplY3QuYXNzaWduLCBub24tZW51bWVyYWJsZXMgd2lsbCBiZSBjb3BpZWQgYXMgd2VsbFxuXHRcdFx0aWYgKGRlc2MuZ2V0IHx8IGRlc2Muc2V0KVxuXHRcdFx0XHRkZXNjcmlwdG9yc1trZXldID0ge1xuXHRcdFx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcblx0XHRcdFx0XHR3cml0YWJsZTogdHJ1ZSwgLy8gY291bGQgbGl2ZSB3aXRoICEhZGVzYy5zZXQgYXMgd2VsbCBoZXJlLi4uXG5cdFx0XHRcdFx0ZW51bWVyYWJsZTogZGVzYy5lbnVtZXJhYmxlLFxuXHRcdFx0XHRcdHZhbHVlOiBiYXNlW2tleV1cblx0XHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gT2JqZWN0LmNyZWF0ZShnZXRQcm90b3R5cGVPZihiYXNlKSwgZGVzY3JpcHRvcnMpXG5cdH0gZWxzZSB7XG5cdFx0Ly8gcGVyZm9ybSBhIHNsb3BweSBjb3B5XG5cdFx0Y29uc3QgcHJvdG8gPSBnZXRQcm90b3R5cGVPZihiYXNlKVxuXHRcdGlmIChwcm90byAhPT0gbnVsbCAmJiBpc1BsYWluKSB7XG5cdFx0XHRyZXR1cm4gey4uLmJhc2V9IC8vIGFzc3VtcHRpb246IGJldHRlciBpbm5lciBjbGFzcyBvcHRpbWl6YXRpb24gdGhhbiB0aGUgYXNzaWduIGJlbG93XG5cdFx0fVxuXHRcdGNvbnN0IG9iaiA9IE9iamVjdC5jcmVhdGUocHJvdG8pXG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24ob2JqLCBiYXNlKVxuXHR9XG59XG5cbi8qKlxuICogRnJlZXplcyBkcmFmdGFibGUgb2JqZWN0cy4gUmV0dXJucyB0aGUgb3JpZ2luYWwgb2JqZWN0LlxuICogQnkgZGVmYXVsdCBmcmVlemVzIHNoYWxsb3dseSwgYnV0IGlmIHRoZSBzZWNvbmQgYXJndW1lbnQgaXMgYHRydWVgIGl0IHdpbGwgZnJlZXplIHJlY3Vyc2l2ZWx5LlxuICpcbiAqIEBwYXJhbSBvYmpcbiAqIEBwYXJhbSBkZWVwXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmcmVlemU8VD4ob2JqOiBULCBkZWVwPzogYm9vbGVhbik6IFRcbmV4cG9ydCBmdW5jdGlvbiBmcmVlemU8VD4ob2JqOiBhbnksIGRlZXA6IGJvb2xlYW4gPSBmYWxzZSk6IFQge1xuXHRpZiAoaXNGcm96ZW4ob2JqKSB8fCBpc0RyYWZ0KG9iaikgfHwgIWlzRHJhZnRhYmxlKG9iaikpIHJldHVybiBvYmpcblx0aWYgKGdldEFyY2h0eXBlKG9iaikgPiAxIC8qIE1hcCBvciBTZXQgKi8pIHtcblx0XHRvYmouc2V0ID0gb2JqLmFkZCA9IG9iai5jbGVhciA9IG9iai5kZWxldGUgPSBkb250TXV0YXRlRnJvemVuQ29sbGVjdGlvbnMgYXMgYW55XG5cdH1cblx0T2JqZWN0LmZyZWV6ZShvYmopXG5cdGlmIChkZWVwKVxuXHRcdC8vIFNlZSAjNTkwLCBkb24ndCByZWN1cnNlIGludG8gbm9uLWVudW1lcmFibGUgLyBTeW1ib2wgcHJvcGVydGllcyB3aGVuIGZyZWV6aW5nXG5cdFx0Ly8gU28gdXNlIE9iamVjdC5lbnRyaWVzIChvbmx5IHN0cmluZy1saWtlLCBlbnVtZXJhYmxlcykgaW5zdGVhZCBvZiBlYWNoKClcblx0XHRPYmplY3QuZW50cmllcyhvYmopLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4gZnJlZXplKHZhbHVlLCB0cnVlKSlcblx0cmV0dXJuIG9ialxufVxuXG5mdW5jdGlvbiBkb250TXV0YXRlRnJvemVuQ29sbGVjdGlvbnMoKSB7XG5cdGRpZSgyKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNGcm96ZW4ob2JqOiBhbnkpOiBib29sZWFuIHtcblx0cmV0dXJuIE9iamVjdC5pc0Zyb3plbihvYmopXG59XG4iLCAiaW1wb3J0IHtcblx0SW1tZXJTdGF0ZSxcblx0UGF0Y2gsXG5cdERyYWZ0ZWQsXG5cdEltbWVyQmFzZVN0YXRlLFxuXHRBbnlNYXAsXG5cdEFueVNldCxcblx0QXJjaFR5cGUsXG5cdGRpZVxufSBmcm9tIFwiLi4vaW50ZXJuYWxcIlxuXG4vKiogUGx1Z2luIHV0aWxpdGllcyAqL1xuY29uc3QgcGx1Z2luczoge1xuXHRQYXRjaGVzPzoge1xuXHRcdGdlbmVyYXRlUGF0Y2hlc18oXG5cdFx0XHRzdGF0ZTogSW1tZXJTdGF0ZSxcblx0XHRcdGJhc2VQYXRoOiBQYXRjaFBhdGgsXG5cdFx0XHRwYXRjaGVzOiBQYXRjaFtdLFxuXHRcdFx0aW52ZXJzZVBhdGNoZXM6IFBhdGNoW11cblx0XHQpOiB2b2lkXG5cdFx0Z2VuZXJhdGVSZXBsYWNlbWVudFBhdGNoZXNfKFxuXHRcdFx0YmFzZTogYW55LFxuXHRcdFx0cmVwbGFjZW1lbnQ6IGFueSxcblx0XHRcdHBhdGNoZXM6IFBhdGNoW10sXG5cdFx0XHRpbnZlcnNlUGF0Y2hlczogUGF0Y2hbXVxuXHRcdCk6IHZvaWRcblx0XHRhcHBseVBhdGNoZXNfPFQ+KGRyYWZ0OiBULCBwYXRjaGVzOiByZWFkb25seSBQYXRjaFtdKTogVFxuXHR9XG5cdE1hcFNldD86IHtcblx0XHRwcm94eU1hcF88VCBleHRlbmRzIEFueU1hcD4odGFyZ2V0OiBULCBwYXJlbnQ/OiBJbW1lclN0YXRlKTogVFxuXHRcdHByb3h5U2V0XzxUIGV4dGVuZHMgQW55U2V0Pih0YXJnZXQ6IFQsIHBhcmVudD86IEltbWVyU3RhdGUpOiBUXG5cdH1cbn0gPSB7fVxuXG50eXBlIFBsdWdpbnMgPSB0eXBlb2YgcGx1Z2luc1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UGx1Z2luPEsgZXh0ZW5kcyBrZXlvZiBQbHVnaW5zPihcblx0cGx1Z2luS2V5OiBLXG4pOiBFeGNsdWRlPFBsdWdpbnNbS10sIHVuZGVmaW5lZD4ge1xuXHRjb25zdCBwbHVnaW4gPSBwbHVnaW5zW3BsdWdpbktleV1cblx0aWYgKCFwbHVnaW4pIHtcblx0XHRkaWUoMCwgcGx1Z2luS2V5KVxuXHR9XG5cdC8vIEB0cy1pZ25vcmVcblx0cmV0dXJuIHBsdWdpblxufVxuXG5leHBvcnQgZnVuY3Rpb24gbG9hZFBsdWdpbjxLIGV4dGVuZHMga2V5b2YgUGx1Z2lucz4oXG5cdHBsdWdpbktleTogSyxcblx0aW1wbGVtZW50YXRpb246IFBsdWdpbnNbS11cbik6IHZvaWQge1xuXHRpZiAoIXBsdWdpbnNbcGx1Z2luS2V5XSkgcGx1Z2luc1twbHVnaW5LZXldID0gaW1wbGVtZW50YXRpb25cbn1cbi8qKiBNYXAgLyBTZXQgcGx1Z2luICovXG5cbmV4cG9ydCBpbnRlcmZhY2UgTWFwU3RhdGUgZXh0ZW5kcyBJbW1lckJhc2VTdGF0ZSB7XG5cdHR5cGVfOiBBcmNoVHlwZS5NYXBcblx0Y29weV86IEFueU1hcCB8IHVuZGVmaW5lZFxuXHRhc3NpZ25lZF86IE1hcDxhbnksIGJvb2xlYW4+IHwgdW5kZWZpbmVkXG5cdGJhc2VfOiBBbnlNYXBcblx0cmV2b2tlZF86IGJvb2xlYW5cblx0ZHJhZnRfOiBEcmFmdGVkPEFueU1hcCwgTWFwU3RhdGU+XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2V0U3RhdGUgZXh0ZW5kcyBJbW1lckJhc2VTdGF0ZSB7XG5cdHR5cGVfOiBBcmNoVHlwZS5TZXRcblx0Y29weV86IEFueVNldCB8IHVuZGVmaW5lZFxuXHRiYXNlXzogQW55U2V0XG5cdGRyYWZ0c186IE1hcDxhbnksIERyYWZ0ZWQ+IC8vIG1hcHMgdGhlIG9yaWdpbmFsIHZhbHVlIHRvIHRoZSBkcmFmdCB2YWx1ZSBpbiB0aGUgbmV3IHNldFxuXHRyZXZva2VkXzogYm9vbGVhblxuXHRkcmFmdF86IERyYWZ0ZWQ8QW55U2V0LCBTZXRTdGF0ZT5cbn1cblxuLyoqIFBhdGNoZXMgcGx1Z2luICovXG5cbmV4cG9ydCB0eXBlIFBhdGNoUGF0aCA9IChzdHJpbmcgfCBudW1iZXIpW11cbiIsICJpbXBvcnQge1xuXHRQYXRjaCxcblx0UGF0Y2hMaXN0ZW5lcixcblx0RHJhZnRlZCxcblx0SW1tZXIsXG5cdERSQUZUX1NUQVRFLFxuXHRJbW1lclN0YXRlLFxuXHRBcmNoVHlwZSxcblx0Z2V0UGx1Z2luXG59IGZyb20gXCIuLi9pbnRlcm5hbFwiXG5cbi8qKiBFYWNoIHNjb3BlIHJlcHJlc2VudHMgYSBgcHJvZHVjZWAgY2FsbC4gKi9cblxuZXhwb3J0IGludGVyZmFjZSBJbW1lclNjb3BlIHtcblx0cGF0Y2hlc18/OiBQYXRjaFtdXG5cdGludmVyc2VQYXRjaGVzXz86IFBhdGNoW11cblx0Y2FuQXV0b0ZyZWV6ZV86IGJvb2xlYW5cblx0ZHJhZnRzXzogYW55W11cblx0cGFyZW50Xz86IEltbWVyU2NvcGVcblx0cGF0Y2hMaXN0ZW5lcl8/OiBQYXRjaExpc3RlbmVyXG5cdGltbWVyXzogSW1tZXJcblx0dW5maW5hbGl6ZWREcmFmdHNfOiBudW1iZXJcbn1cblxubGV0IGN1cnJlbnRTY29wZTogSW1tZXJTY29wZSB8IHVuZGVmaW5lZFxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q3VycmVudFNjb3BlKCkge1xuXHRyZXR1cm4gY3VycmVudFNjb3BlIVxufVxuXG5mdW5jdGlvbiBjcmVhdGVTY29wZShcblx0cGFyZW50XzogSW1tZXJTY29wZSB8IHVuZGVmaW5lZCxcblx0aW1tZXJfOiBJbW1lclxuKTogSW1tZXJTY29wZSB7XG5cdHJldHVybiB7XG5cdFx0ZHJhZnRzXzogW10sXG5cdFx0cGFyZW50Xyxcblx0XHRpbW1lcl8sXG5cdFx0Ly8gV2hlbmV2ZXIgdGhlIG1vZGlmaWVkIGRyYWZ0IGNvbnRhaW5zIGEgZHJhZnQgZnJvbSBhbm90aGVyIHNjb3BlLCB3ZVxuXHRcdC8vIG5lZWQgdG8gcHJldmVudCBhdXRvLWZyZWV6aW5nIHNvIHRoZSB1bm93bmVkIGRyYWZ0IGNhbiBiZSBmaW5hbGl6ZWQuXG5cdFx0Y2FuQXV0b0ZyZWV6ZV86IHRydWUsXG5cdFx0dW5maW5hbGl6ZWREcmFmdHNfOiAwXG5cdH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVzZVBhdGNoZXNJblNjb3BlKFxuXHRzY29wZTogSW1tZXJTY29wZSxcblx0cGF0Y2hMaXN0ZW5lcj86IFBhdGNoTGlzdGVuZXJcbikge1xuXHRpZiAocGF0Y2hMaXN0ZW5lcikge1xuXHRcdGdldFBsdWdpbihcIlBhdGNoZXNcIikgLy8gYXNzZXJ0IHdlIGhhdmUgdGhlIHBsdWdpblxuXHRcdHNjb3BlLnBhdGNoZXNfID0gW11cblx0XHRzY29wZS5pbnZlcnNlUGF0Y2hlc18gPSBbXVxuXHRcdHNjb3BlLnBhdGNoTGlzdGVuZXJfID0gcGF0Y2hMaXN0ZW5lclxuXHR9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXZva2VTY29wZShzY29wZTogSW1tZXJTY29wZSkge1xuXHRsZWF2ZVNjb3BlKHNjb3BlKVxuXHRzY29wZS5kcmFmdHNfLmZvckVhY2gocmV2b2tlRHJhZnQpXG5cdC8vIEB0cy1pZ25vcmVcblx0c2NvcGUuZHJhZnRzXyA9IG51bGxcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxlYXZlU2NvcGUoc2NvcGU6IEltbWVyU2NvcGUpIHtcblx0aWYgKHNjb3BlID09PSBjdXJyZW50U2NvcGUpIHtcblx0XHRjdXJyZW50U2NvcGUgPSBzY29wZS5wYXJlbnRfXG5cdH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVudGVyU2NvcGUoaW1tZXI6IEltbWVyKSB7XG5cdHJldHVybiAoY3VycmVudFNjb3BlID0gY3JlYXRlU2NvcGUoY3VycmVudFNjb3BlLCBpbW1lcikpXG59XG5cbmZ1bmN0aW9uIHJldm9rZURyYWZ0KGRyYWZ0OiBEcmFmdGVkKSB7XG5cdGNvbnN0IHN0YXRlOiBJbW1lclN0YXRlID0gZHJhZnRbRFJBRlRfU1RBVEVdXG5cdGlmIChzdGF0ZS50eXBlXyA9PT0gQXJjaFR5cGUuT2JqZWN0IHx8IHN0YXRlLnR5cGVfID09PSBBcmNoVHlwZS5BcnJheSlcblx0XHRzdGF0ZS5yZXZva2VfKClcblx0ZWxzZSBzdGF0ZS5yZXZva2VkXyA9IHRydWVcbn1cbiIsICJpbXBvcnQge1xuXHRJbW1lclNjb3BlLFxuXHREUkFGVF9TVEFURSxcblx0aXNEcmFmdGFibGUsXG5cdE5PVEhJTkcsXG5cdFBhdGNoUGF0aCxcblx0ZWFjaCxcblx0aGFzLFxuXHRmcmVlemUsXG5cdEltbWVyU3RhdGUsXG5cdGlzRHJhZnQsXG5cdFNldFN0YXRlLFxuXHRzZXQsXG5cdEFyY2hUeXBlLFxuXHRnZXRQbHVnaW4sXG5cdGRpZSxcblx0cmV2b2tlU2NvcGUsXG5cdGlzRnJvemVuXG59IGZyb20gXCIuLi9pbnRlcm5hbFwiXG5cbmV4cG9ydCBmdW5jdGlvbiBwcm9jZXNzUmVzdWx0KHJlc3VsdDogYW55LCBzY29wZTogSW1tZXJTY29wZSkge1xuXHRzY29wZS51bmZpbmFsaXplZERyYWZ0c18gPSBzY29wZS5kcmFmdHNfLmxlbmd0aFxuXHRjb25zdCBiYXNlRHJhZnQgPSBzY29wZS5kcmFmdHNfIVswXVxuXHRjb25zdCBpc1JlcGxhY2VkID0gcmVzdWx0ICE9PSB1bmRlZmluZWQgJiYgcmVzdWx0ICE9PSBiYXNlRHJhZnRcblx0aWYgKGlzUmVwbGFjZWQpIHtcblx0XHRpZiAoYmFzZURyYWZ0W0RSQUZUX1NUQVRFXS5tb2RpZmllZF8pIHtcblx0XHRcdHJldm9rZVNjb3BlKHNjb3BlKVxuXHRcdFx0ZGllKDQpXG5cdFx0fVxuXHRcdGlmIChpc0RyYWZ0YWJsZShyZXN1bHQpKSB7XG5cdFx0XHQvLyBGaW5hbGl6ZSB0aGUgcmVzdWx0IGluIGNhc2UgaXQgY29udGFpbnMgKG9yIGlzKSBhIHN1YnNldCBvZiB0aGUgZHJhZnQuXG5cdFx0XHRyZXN1bHQgPSBmaW5hbGl6ZShzY29wZSwgcmVzdWx0KVxuXHRcdFx0aWYgKCFzY29wZS5wYXJlbnRfKSBtYXliZUZyZWV6ZShzY29wZSwgcmVzdWx0KVxuXHRcdH1cblx0XHRpZiAoc2NvcGUucGF0Y2hlc18pIHtcblx0XHRcdGdldFBsdWdpbihcIlBhdGNoZXNcIikuZ2VuZXJhdGVSZXBsYWNlbWVudFBhdGNoZXNfKFxuXHRcdFx0XHRiYXNlRHJhZnRbRFJBRlRfU1RBVEVdLmJhc2VfLFxuXHRcdFx0XHRyZXN1bHQsXG5cdFx0XHRcdHNjb3BlLnBhdGNoZXNfLFxuXHRcdFx0XHRzY29wZS5pbnZlcnNlUGF0Y2hlc18hXG5cdFx0XHQpXG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdC8vIEZpbmFsaXplIHRoZSBiYXNlIGRyYWZ0LlxuXHRcdHJlc3VsdCA9IGZpbmFsaXplKHNjb3BlLCBiYXNlRHJhZnQsIFtdKVxuXHR9XG5cdHJldm9rZVNjb3BlKHNjb3BlKVxuXHRpZiAoc2NvcGUucGF0Y2hlc18pIHtcblx0XHRzY29wZS5wYXRjaExpc3RlbmVyXyEoc2NvcGUucGF0Y2hlc18sIHNjb3BlLmludmVyc2VQYXRjaGVzXyEpXG5cdH1cblx0cmV0dXJuIHJlc3VsdCAhPT0gTk9USElORyA/IHJlc3VsdCA6IHVuZGVmaW5lZFxufVxuXG5mdW5jdGlvbiBmaW5hbGl6ZShyb290U2NvcGU6IEltbWVyU2NvcGUsIHZhbHVlOiBhbnksIHBhdGg/OiBQYXRjaFBhdGgpIHtcblx0Ly8gRG9uJ3QgcmVjdXJzZSBpbiB0aG8gcmVjdXJzaXZlIGRhdGEgc3RydWN0dXJlc1xuXHRpZiAoaXNGcm96ZW4odmFsdWUpKSByZXR1cm4gdmFsdWVcblxuXHRjb25zdCBzdGF0ZTogSW1tZXJTdGF0ZSA9IHZhbHVlW0RSQUZUX1NUQVRFXVxuXHQvLyBBIHBsYWluIG9iamVjdCwgbWlnaHQgbmVlZCBmcmVlemluZywgbWlnaHQgY29udGFpbiBkcmFmdHNcblx0aWYgKCFzdGF0ZSkge1xuXHRcdGVhY2godmFsdWUsIChrZXksIGNoaWxkVmFsdWUpID0+XG5cdFx0XHRmaW5hbGl6ZVByb3BlcnR5KHJvb3RTY29wZSwgc3RhdGUsIHZhbHVlLCBrZXksIGNoaWxkVmFsdWUsIHBhdGgpXG5cdFx0KVxuXHRcdHJldHVybiB2YWx1ZVxuXHR9XG5cdC8vIE5ldmVyIGZpbmFsaXplIGRyYWZ0cyBvd25lZCBieSBhbm90aGVyIHNjb3BlLlxuXHRpZiAoc3RhdGUuc2NvcGVfICE9PSByb290U2NvcGUpIHJldHVybiB2YWx1ZVxuXHQvLyBVbm1vZGlmaWVkIGRyYWZ0LCByZXR1cm4gdGhlIChmcm96ZW4pIG9yaWdpbmFsXG5cdGlmICghc3RhdGUubW9kaWZpZWRfKSB7XG5cdFx0bWF5YmVGcmVlemUocm9vdFNjb3BlLCBzdGF0ZS5iYXNlXywgdHJ1ZSlcblx0XHRyZXR1cm4gc3RhdGUuYmFzZV9cblx0fVxuXHQvLyBOb3QgZmluYWxpemVkIHlldCwgbGV0J3MgZG8gdGhhdCBub3dcblx0aWYgKCFzdGF0ZS5maW5hbGl6ZWRfKSB7XG5cdFx0c3RhdGUuZmluYWxpemVkXyA9IHRydWVcblx0XHRzdGF0ZS5zY29wZV8udW5maW5hbGl6ZWREcmFmdHNfLS1cblx0XHRjb25zdCByZXN1bHQgPSBzdGF0ZS5jb3B5X1xuXHRcdC8vIEZpbmFsaXplIGFsbCBjaGlsZHJlbiBvZiB0aGUgY29weVxuXHRcdC8vIEZvciBzZXRzIHdlIGNsb25lIGJlZm9yZSBpdGVyYXRpbmcsIG90aGVyd2lzZSB3ZSBjYW4gZ2V0IGluIGVuZGxlc3MgbG9vcCBkdWUgdG8gbW9kaWZ5aW5nIGR1cmluZyBpdGVyYXRpb24sIHNlZSAjNjI4XG5cdFx0Ly8gVG8gcHJlc2VydmUgaW5zZXJ0aW9uIG9yZGVyIGluIGFsbCBjYXNlcyB3ZSB0aGVuIGNsZWFyIHRoZSBzZXRcblx0XHQvLyBBbmQgd2UgbGV0IGZpbmFsaXplUHJvcGVydHkga25vdyBpdCBuZWVkcyB0byByZS1hZGQgbm9uLWRyYWZ0IGNoaWxkcmVuIGJhY2sgdG8gdGhlIHRhcmdldFxuXHRcdGxldCByZXN1bHRFYWNoID0gcmVzdWx0XG5cdFx0bGV0IGlzU2V0ID0gZmFsc2Vcblx0XHRpZiAoc3RhdGUudHlwZV8gPT09IEFyY2hUeXBlLlNldCkge1xuXHRcdFx0cmVzdWx0RWFjaCA9IG5ldyBTZXQocmVzdWx0KVxuXHRcdFx0cmVzdWx0LmNsZWFyKClcblx0XHRcdGlzU2V0ID0gdHJ1ZVxuXHRcdH1cblx0XHRlYWNoKHJlc3VsdEVhY2gsIChrZXksIGNoaWxkVmFsdWUpID0+XG5cdFx0XHRmaW5hbGl6ZVByb3BlcnR5KHJvb3RTY29wZSwgc3RhdGUsIHJlc3VsdCwga2V5LCBjaGlsZFZhbHVlLCBwYXRoLCBpc1NldClcblx0XHQpXG5cdFx0Ly8gZXZlcnl0aGluZyBpbnNpZGUgaXMgZnJvemVuLCB3ZSBjYW4gZnJlZXplIGhlcmVcblx0XHRtYXliZUZyZWV6ZShyb290U2NvcGUsIHJlc3VsdCwgZmFsc2UpXG5cdFx0Ly8gZmlyc3QgdGltZSBmaW5hbGl6aW5nLCBsZXQncyBjcmVhdGUgdGhvc2UgcGF0Y2hlc1xuXHRcdGlmIChwYXRoICYmIHJvb3RTY29wZS5wYXRjaGVzXykge1xuXHRcdFx0Z2V0UGx1Z2luKFwiUGF0Y2hlc1wiKS5nZW5lcmF0ZVBhdGNoZXNfKFxuXHRcdFx0XHRzdGF0ZSxcblx0XHRcdFx0cGF0aCxcblx0XHRcdFx0cm9vdFNjb3BlLnBhdGNoZXNfLFxuXHRcdFx0XHRyb290U2NvcGUuaW52ZXJzZVBhdGNoZXNfIVxuXHRcdFx0KVxuXHRcdH1cblx0fVxuXHRyZXR1cm4gc3RhdGUuY29weV9cbn1cblxuZnVuY3Rpb24gZmluYWxpemVQcm9wZXJ0eShcblx0cm9vdFNjb3BlOiBJbW1lclNjb3BlLFxuXHRwYXJlbnRTdGF0ZTogdW5kZWZpbmVkIHwgSW1tZXJTdGF0ZSxcblx0dGFyZ2V0T2JqZWN0OiBhbnksXG5cdHByb3A6IHN0cmluZyB8IG51bWJlcixcblx0Y2hpbGRWYWx1ZTogYW55LFxuXHRyb290UGF0aD86IFBhdGNoUGF0aCxcblx0dGFyZ2V0SXNTZXQ/OiBib29sZWFuXG4pIHtcblx0aWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiBjaGlsZFZhbHVlID09PSB0YXJnZXRPYmplY3QpXG5cdFx0ZGllKDUpXG5cdGlmIChpc0RyYWZ0KGNoaWxkVmFsdWUpKSB7XG5cdFx0Y29uc3QgcGF0aCA9XG5cdFx0XHRyb290UGF0aCAmJlxuXHRcdFx0cGFyZW50U3RhdGUgJiZcblx0XHRcdHBhcmVudFN0YXRlIS50eXBlXyAhPT0gQXJjaFR5cGUuU2V0ICYmIC8vIFNldCBvYmplY3RzIGFyZSBhdG9taWMgc2luY2UgdGhleSBoYXZlIG5vIGtleXMuXG5cdFx0XHQhaGFzKChwYXJlbnRTdGF0ZSBhcyBFeGNsdWRlPEltbWVyU3RhdGUsIFNldFN0YXRlPikuYXNzaWduZWRfISwgcHJvcCkgLy8gU2tpcCBkZWVwIHBhdGNoZXMgZm9yIGFzc2lnbmVkIGtleXMuXG5cdFx0XHRcdD8gcm9vdFBhdGghLmNvbmNhdChwcm9wKVxuXHRcdFx0XHQ6IHVuZGVmaW5lZFxuXHRcdC8vIERyYWZ0cyBvd25lZCBieSBgc2NvcGVgIGFyZSBmaW5hbGl6ZWQgaGVyZS5cblx0XHRjb25zdCByZXMgPSBmaW5hbGl6ZShyb290U2NvcGUsIGNoaWxkVmFsdWUsIHBhdGgpXG5cdFx0c2V0KHRhcmdldE9iamVjdCwgcHJvcCwgcmVzKVxuXHRcdC8vIERyYWZ0cyBmcm9tIGFub3RoZXIgc2NvcGUgbXVzdCBwcmV2ZW50ZWQgdG8gYmUgZnJvemVuXG5cdFx0Ly8gaWYgd2UgZ290IGEgZHJhZnQgYmFjayBmcm9tIGZpbmFsaXplLCB3ZSdyZSBpbiBhIG5lc3RlZCBwcm9kdWNlIGFuZCBzaG91bGRuJ3QgZnJlZXplXG5cdFx0aWYgKGlzRHJhZnQocmVzKSkge1xuXHRcdFx0cm9vdFNjb3BlLmNhbkF1dG9GcmVlemVfID0gZmFsc2Vcblx0XHR9IGVsc2UgcmV0dXJuXG5cdH0gZWxzZSBpZiAodGFyZ2V0SXNTZXQpIHtcblx0XHR0YXJnZXRPYmplY3QuYWRkKGNoaWxkVmFsdWUpXG5cdH1cblx0Ly8gU2VhcmNoIG5ldyBvYmplY3RzIGZvciB1bmZpbmFsaXplZCBkcmFmdHMuIEZyb3plbiBvYmplY3RzIHNob3VsZCBuZXZlciBjb250YWluIGRyYWZ0cy5cblx0aWYgKGlzRHJhZnRhYmxlKGNoaWxkVmFsdWUpICYmICFpc0Zyb3plbihjaGlsZFZhbHVlKSkge1xuXHRcdGlmICghcm9vdFNjb3BlLmltbWVyXy5hdXRvRnJlZXplXyAmJiByb290U2NvcGUudW5maW5hbGl6ZWREcmFmdHNfIDwgMSkge1xuXHRcdFx0Ly8gb3B0aW1pemF0aW9uOiBpZiBhbiBvYmplY3QgaXMgbm90IGEgZHJhZnQsIGFuZCB3ZSBkb24ndCBoYXZlIHRvXG5cdFx0XHQvLyBkZWVwZnJlZXplIGV2ZXJ5dGhpbmcsIGFuZCB3ZSBhcmUgc3VyZSB0aGF0IG5vIGRyYWZ0cyBhcmUgbGVmdCBpbiB0aGUgcmVtYWluaW5nIG9iamVjdFxuXHRcdFx0Ly8gY2F1c2Ugd2Ugc2F3IGFuZCBmaW5hbGl6ZWQgYWxsIGRyYWZ0cyBhbHJlYWR5OyB3ZSBjYW4gc3RvcCB2aXNpdGluZyB0aGUgcmVzdCBvZiB0aGUgdHJlZS5cblx0XHRcdC8vIFRoaXMgYmVuZWZpdHMgZXNwZWNpYWxseSBhZGRpbmcgbGFyZ2UgZGF0YSB0cmVlJ3Mgd2l0aG91dCBmdXJ0aGVyIHByb2Nlc3NpbmcuXG5cdFx0XHQvLyBTZWUgYWRkLWRhdGEuanMgcGVyZiB0ZXN0XG5cdFx0XHRyZXR1cm5cblx0XHR9XG5cdFx0ZmluYWxpemUocm9vdFNjb3BlLCBjaGlsZFZhbHVlKVxuXHRcdC8vIEltbWVyIGRlZXAgZnJlZXplcyBwbGFpbiBvYmplY3RzLCBzbyBpZiB0aGVyZSBpcyBubyBwYXJlbnQgc3RhdGUsIHdlIGZyZWV6ZSBhcyB3ZWxsXG5cdFx0Ly8gUGVyICM1OTAsIHdlIG5ldmVyIGZyZWV6ZSBzeW1ib2xpYyBwcm9wZXJ0aWVzLiBKdXN0IHRvIG1ha2Ugc3VyZSBkb24ndCBhY2NpZGVudGFsbHkgaW50ZXJmZXJlXG5cdFx0Ly8gd2l0aCBvdGhlciBmcmFtZXdvcmtzLlxuXHRcdGlmIChcblx0XHRcdCghcGFyZW50U3RhdGUgfHwgIXBhcmVudFN0YXRlLnNjb3BlXy5wYXJlbnRfKSAmJlxuXHRcdFx0dHlwZW9mIHByb3AgIT09IFwic3ltYm9sXCIgJiZcblx0XHRcdE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbCh0YXJnZXRPYmplY3QsIHByb3ApXG5cdFx0KVxuXHRcdFx0bWF5YmVGcmVlemUocm9vdFNjb3BlLCBjaGlsZFZhbHVlKVxuXHR9XG59XG5cbmZ1bmN0aW9uIG1heWJlRnJlZXplKHNjb3BlOiBJbW1lclNjb3BlLCB2YWx1ZTogYW55LCBkZWVwID0gZmFsc2UpIHtcblx0Ly8gd2UgbmV2ZXIgZnJlZXplIGZvciBhIG5vbi1yb290IHNjb3BlOyBhcyBpdCB3b3VsZCBwcmV2ZW50IHBydW5pbmcgZm9yIGRyYWZ0cyBpbnNpZGUgd3JhcHBpbmcgb2JqZWN0c1xuXHRpZiAoIXNjb3BlLnBhcmVudF8gJiYgc2NvcGUuaW1tZXJfLmF1dG9GcmVlemVfICYmIHNjb3BlLmNhbkF1dG9GcmVlemVfKSB7XG5cdFx0ZnJlZXplKHZhbHVlLCBkZWVwKVxuXHR9XG59XG4iLCAiaW1wb3J0IHtcblx0ZWFjaCxcblx0aGFzLFxuXHRpcyxcblx0aXNEcmFmdGFibGUsXG5cdHNoYWxsb3dDb3B5LFxuXHRsYXRlc3QsXG5cdEltbWVyQmFzZVN0YXRlLFxuXHRJbW1lclN0YXRlLFxuXHREcmFmdGVkLFxuXHRBbnlPYmplY3QsXG5cdEFueUFycmF5LFxuXHRPYmplY3Rpc2gsXG5cdGdldEN1cnJlbnRTY29wZSxcblx0Z2V0UHJvdG90eXBlT2YsXG5cdERSQUZUX1NUQVRFLFxuXHRkaWUsXG5cdGNyZWF0ZVByb3h5LFxuXHRBcmNoVHlwZSxcblx0SW1tZXJTY29wZVxufSBmcm9tIFwiLi4vaW50ZXJuYWxcIlxuXG5pbnRlcmZhY2UgUHJveHlCYXNlU3RhdGUgZXh0ZW5kcyBJbW1lckJhc2VTdGF0ZSB7XG5cdGFzc2lnbmVkXzoge1xuXHRcdFtwcm9wZXJ0eTogc3RyaW5nXTogYm9vbGVhblxuXHR9XG5cdHBhcmVudF8/OiBJbW1lclN0YXRlXG5cdHJldm9rZV8oKTogdm9pZFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFByb3h5T2JqZWN0U3RhdGUgZXh0ZW5kcyBQcm94eUJhc2VTdGF0ZSB7XG5cdHR5cGVfOiBBcmNoVHlwZS5PYmplY3Rcblx0YmFzZV86IGFueVxuXHRjb3B5XzogYW55XG5cdGRyYWZ0XzogRHJhZnRlZDxBbnlPYmplY3QsIFByb3h5T2JqZWN0U3RhdGU+XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJveHlBcnJheVN0YXRlIGV4dGVuZHMgUHJveHlCYXNlU3RhdGUge1xuXHR0eXBlXzogQXJjaFR5cGUuQXJyYXlcblx0YmFzZV86IEFueUFycmF5XG5cdGNvcHlfOiBBbnlBcnJheSB8IG51bGxcblx0ZHJhZnRfOiBEcmFmdGVkPEFueUFycmF5LCBQcm94eUFycmF5U3RhdGU+XG59XG5cbnR5cGUgUHJveHlTdGF0ZSA9IFByb3h5T2JqZWN0U3RhdGUgfCBQcm94eUFycmF5U3RhdGVcblxuLyoqXG4gKiBSZXR1cm5zIGEgbmV3IGRyYWZ0IG9mIHRoZSBgYmFzZWAgb2JqZWN0LlxuICpcbiAqIFRoZSBzZWNvbmQgYXJndW1lbnQgaXMgdGhlIHBhcmVudCBkcmFmdC1zdGF0ZSAodXNlZCBpbnRlcm5hbGx5KS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVByb3h5UHJveHk8VCBleHRlbmRzIE9iamVjdGlzaD4oXG5cdGJhc2U6IFQsXG5cdHBhcmVudD86IEltbWVyU3RhdGVcbik6IERyYWZ0ZWQ8VCwgUHJveHlTdGF0ZT4ge1xuXHRjb25zdCBpc0FycmF5ID0gQXJyYXkuaXNBcnJheShiYXNlKVxuXHRjb25zdCBzdGF0ZTogUHJveHlTdGF0ZSA9IHtcblx0XHR0eXBlXzogaXNBcnJheSA/IEFyY2hUeXBlLkFycmF5IDogKEFyY2hUeXBlLk9iamVjdCBhcyBhbnkpLFxuXHRcdC8vIFRyYWNrIHdoaWNoIHByb2R1Y2UgY2FsbCB0aGlzIGlzIGFzc29jaWF0ZWQgd2l0aC5cblx0XHRzY29wZV86IHBhcmVudCA/IHBhcmVudC5zY29wZV8gOiBnZXRDdXJyZW50U2NvcGUoKSEsXG5cdFx0Ly8gVHJ1ZSBmb3IgYm90aCBzaGFsbG93IGFuZCBkZWVwIGNoYW5nZXMuXG5cdFx0bW9kaWZpZWRfOiBmYWxzZSxcblx0XHQvLyBVc2VkIGR1cmluZyBmaW5hbGl6YXRpb24uXG5cdFx0ZmluYWxpemVkXzogZmFsc2UsXG5cdFx0Ly8gVHJhY2sgd2hpY2ggcHJvcGVydGllcyBoYXZlIGJlZW4gYXNzaWduZWQgKHRydWUpIG9yIGRlbGV0ZWQgKGZhbHNlKS5cblx0XHRhc3NpZ25lZF86IHt9LFxuXHRcdC8vIFRoZSBwYXJlbnQgZHJhZnQgc3RhdGUuXG5cdFx0cGFyZW50XzogcGFyZW50LFxuXHRcdC8vIFRoZSBiYXNlIHN0YXRlLlxuXHRcdGJhc2VfOiBiYXNlLFxuXHRcdC8vIFRoZSBiYXNlIHByb3h5LlxuXHRcdGRyYWZ0XzogbnVsbCBhcyBhbnksIC8vIHNldCBiZWxvd1xuXHRcdC8vIFRoZSBiYXNlIGNvcHkgd2l0aCBhbnkgdXBkYXRlZCB2YWx1ZXMuXG5cdFx0Y29weV86IG51bGwsXG5cdFx0Ly8gQ2FsbGVkIGJ5IHRoZSBgcHJvZHVjZWAgZnVuY3Rpb24uXG5cdFx0cmV2b2tlXzogbnVsbCBhcyBhbnksXG5cdFx0aXNNYW51YWxfOiBmYWxzZVxuXHR9XG5cblx0Ly8gdGhlIHRyYXBzIG11c3QgdGFyZ2V0IHNvbWV0aGluZywgYSBiaXQgbGlrZSB0aGUgJ3JlYWwnIGJhc2UuXG5cdC8vIGJ1dCBhbHNvLCB3ZSBuZWVkIHRvIGJlIGFibGUgdG8gZGV0ZXJtaW5lIGZyb20gdGhlIHRhcmdldCB3aGF0IHRoZSByZWxldmFudCBzdGF0ZSBpc1xuXHQvLyAodG8gYXZvaWQgY3JlYXRpbmcgdHJhcHMgcGVyIGluc3RhbmNlIHRvIGNhcHR1cmUgdGhlIHN0YXRlIGluIGNsb3N1cmUsXG5cdC8vIGFuZCB0byBhdm9pZCBjcmVhdGluZyB3ZWlyZCBoaWRkZW4gcHJvcGVydGllcyBhcyB3ZWxsKVxuXHQvLyBTbyB0aGUgdHJpY2sgaXMgdG8gdXNlICdzdGF0ZScgYXMgdGhlIGFjdHVhbCAndGFyZ2V0JyEgKGFuZCBtYWtlIHN1cmUgd2UgaW50ZXJjZXB0IGV2ZXJ5dGhpbmcpXG5cdC8vIE5vdGUgdGhhdCBpbiB0aGUgY2FzZSBvZiBhbiBhcnJheSwgd2UgcHV0IHRoZSBzdGF0ZSBpbiBhbiBhcnJheSB0byBoYXZlIGJldHRlciBSZWZsZWN0IGRlZmF1bHRzIG9vdGJcblx0bGV0IHRhcmdldDogVCA9IHN0YXRlIGFzIGFueVxuXHRsZXQgdHJhcHM6IFByb3h5SGFuZGxlcjxvYmplY3QgfCBBcnJheTxhbnk+PiA9IG9iamVjdFRyYXBzXG5cdGlmIChpc0FycmF5KSB7XG5cdFx0dGFyZ2V0ID0gW3N0YXRlXSBhcyBhbnlcblx0XHR0cmFwcyA9IGFycmF5VHJhcHNcblx0fVxuXG5cdGNvbnN0IHtyZXZva2UsIHByb3h5fSA9IFByb3h5LnJldm9jYWJsZSh0YXJnZXQsIHRyYXBzKVxuXHRzdGF0ZS5kcmFmdF8gPSBwcm94eSBhcyBhbnlcblx0c3RhdGUucmV2b2tlXyA9IHJldm9rZVxuXHRyZXR1cm4gcHJveHkgYXMgYW55XG59XG5cbi8qKlxuICogT2JqZWN0IGRyYWZ0c1xuICovXG5leHBvcnQgY29uc3Qgb2JqZWN0VHJhcHM6IFByb3h5SGFuZGxlcjxQcm94eVN0YXRlPiA9IHtcblx0Z2V0KHN0YXRlLCBwcm9wKSB7XG5cdFx0aWYgKHByb3AgPT09IERSQUZUX1NUQVRFKSByZXR1cm4gc3RhdGVcblxuXHRcdGNvbnN0IHNvdXJjZSA9IGxhdGVzdChzdGF0ZSlcblx0XHRpZiAoIWhhcyhzb3VyY2UsIHByb3ApKSB7XG5cdFx0XHQvLyBub24tZXhpc3Rpbmcgb3Igbm9uLW93biBwcm9wZXJ0eS4uLlxuXHRcdFx0cmV0dXJuIHJlYWRQcm9wRnJvbVByb3RvKHN0YXRlLCBzb3VyY2UsIHByb3ApXG5cdFx0fVxuXHRcdGNvbnN0IHZhbHVlID0gc291cmNlW3Byb3BdXG5cdFx0aWYgKHN0YXRlLmZpbmFsaXplZF8gfHwgIWlzRHJhZnRhYmxlKHZhbHVlKSkge1xuXHRcdFx0cmV0dXJuIHZhbHVlXG5cdFx0fVxuXHRcdC8vIENoZWNrIGZvciBleGlzdGluZyBkcmFmdCBpbiBtb2RpZmllZCBzdGF0ZS5cblx0XHQvLyBBc3NpZ25lZCB2YWx1ZXMgYXJlIG5ldmVyIGRyYWZ0ZWQuIFRoaXMgY2F0Y2hlcyBhbnkgZHJhZnRzIHdlIGNyZWF0ZWQsIHRvby5cblx0XHRpZiAodmFsdWUgPT09IHBlZWsoc3RhdGUuYmFzZV8sIHByb3ApKSB7XG5cdFx0XHRwcmVwYXJlQ29weShzdGF0ZSlcblx0XHRcdHJldHVybiAoc3RhdGUuY29weV8hW3Byb3AgYXMgYW55XSA9IGNyZWF0ZVByb3h5KHZhbHVlLCBzdGF0ZSkpXG5cdFx0fVxuXHRcdHJldHVybiB2YWx1ZVxuXHR9LFxuXHRoYXMoc3RhdGUsIHByb3ApIHtcblx0XHRyZXR1cm4gcHJvcCBpbiBsYXRlc3Qoc3RhdGUpXG5cdH0sXG5cdG93bktleXMoc3RhdGUpIHtcblx0XHRyZXR1cm4gUmVmbGVjdC5vd25LZXlzKGxhdGVzdChzdGF0ZSkpXG5cdH0sXG5cdHNldChcblx0XHRzdGF0ZTogUHJveHlPYmplY3RTdGF0ZSxcblx0XHRwcm9wOiBzdHJpbmcgLyogc3RyaWN0bHkgbm90LCBidXQgaGVscHMgVFMgKi8sXG5cdFx0dmFsdWVcblx0KSB7XG5cdFx0Y29uc3QgZGVzYyA9IGdldERlc2NyaXB0b3JGcm9tUHJvdG8obGF0ZXN0KHN0YXRlKSwgcHJvcClcblx0XHRpZiAoZGVzYz8uc2V0KSB7XG5cdFx0XHQvLyBzcGVjaWFsIGNhc2U6IGlmIHRoaXMgd3JpdGUgaXMgY2FwdHVyZWQgYnkgYSBzZXR0ZXIsIHdlIGhhdmVcblx0XHRcdC8vIHRvIHRyaWdnZXIgaXQgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG5cdFx0XHRkZXNjLnNldC5jYWxsKHN0YXRlLmRyYWZ0XywgdmFsdWUpXG5cdFx0XHRyZXR1cm4gdHJ1ZVxuXHRcdH1cblx0XHRpZiAoIXN0YXRlLm1vZGlmaWVkXykge1xuXHRcdFx0Ly8gdGhlIGxhc3QgY2hlY2sgaXMgYmVjYXVzZSB3ZSBuZWVkIHRvIGJlIGFibGUgdG8gZGlzdGluZ3Vpc2ggc2V0dGluZyBhIG5vbi1leGlzdGluZyB0byB1bmRlZmluZWQgKHdoaWNoIGlzIGEgY2hhbmdlKVxuXHRcdFx0Ly8gZnJvbSBzZXR0aW5nIGFuIGV4aXN0aW5nIHByb3BlcnR5IHdpdGggdmFsdWUgdW5kZWZpbmVkIHRvIHVuZGVmaW5lZCAod2hpY2ggaXMgbm90IGEgY2hhbmdlKVxuXHRcdFx0Y29uc3QgY3VycmVudCA9IHBlZWsobGF0ZXN0KHN0YXRlKSwgcHJvcClcblx0XHRcdC8vIHNwZWNpYWwgY2FzZSwgaWYgd2UgYXNzaWduaW5nIHRoZSBvcmlnaW5hbCB2YWx1ZSB0byBhIGRyYWZ0LCB3ZSBjYW4gaWdub3JlIHRoZSBhc3NpZ25tZW50XG5cdFx0XHRjb25zdCBjdXJyZW50U3RhdGU6IFByb3h5T2JqZWN0U3RhdGUgPSBjdXJyZW50Py5bRFJBRlRfU1RBVEVdXG5cdFx0XHRpZiAoY3VycmVudFN0YXRlICYmIGN1cnJlbnRTdGF0ZS5iYXNlXyA9PT0gdmFsdWUpIHtcblx0XHRcdFx0c3RhdGUuY29weV8hW3Byb3BdID0gdmFsdWVcblx0XHRcdFx0c3RhdGUuYXNzaWduZWRfW3Byb3BdID0gZmFsc2Vcblx0XHRcdFx0cmV0dXJuIHRydWVcblx0XHRcdH1cblx0XHRcdGlmIChpcyh2YWx1ZSwgY3VycmVudCkgJiYgKHZhbHVlICE9PSB1bmRlZmluZWQgfHwgaGFzKHN0YXRlLmJhc2VfLCBwcm9wKSkpXG5cdFx0XHRcdHJldHVybiB0cnVlXG5cdFx0XHRwcmVwYXJlQ29weShzdGF0ZSlcblx0XHRcdG1hcmtDaGFuZ2VkKHN0YXRlKVxuXHRcdH1cblxuXHRcdGlmIChcblx0XHRcdChzdGF0ZS5jb3B5XyFbcHJvcF0gPT09IHZhbHVlICYmXG5cdFx0XHRcdC8vIHNwZWNpYWwgY2FzZTogaGFuZGxlIG5ldyBwcm9wcyB3aXRoIHZhbHVlICd1bmRlZmluZWQnXG5cdFx0XHRcdCh2YWx1ZSAhPT0gdW5kZWZpbmVkIHx8IHByb3AgaW4gc3RhdGUuY29weV8pKSB8fFxuXHRcdFx0Ly8gc3BlY2lhbCBjYXNlOiBOYU5cblx0XHRcdChOdW1iZXIuaXNOYU4odmFsdWUpICYmIE51bWJlci5pc05hTihzdGF0ZS5jb3B5XyFbcHJvcF0pKVxuXHRcdClcblx0XHRcdHJldHVybiB0cnVlXG5cblx0XHQvLyBAdHMtaWdub3JlXG5cdFx0c3RhdGUuY29weV8hW3Byb3BdID0gdmFsdWVcblx0XHRzdGF0ZS5hc3NpZ25lZF9bcHJvcF0gPSB0cnVlXG5cdFx0cmV0dXJuIHRydWVcblx0fSxcblx0ZGVsZXRlUHJvcGVydHkoc3RhdGUsIHByb3A6IHN0cmluZykge1xuXHRcdC8vIFRoZSBgdW5kZWZpbmVkYCBjaGVjayBpcyBhIGZhc3QgcGF0aCBmb3IgcHJlLWV4aXN0aW5nIGtleXMuXG5cdFx0aWYgKHBlZWsoc3RhdGUuYmFzZV8sIHByb3ApICE9PSB1bmRlZmluZWQgfHwgcHJvcCBpbiBzdGF0ZS5iYXNlXykge1xuXHRcdFx0c3RhdGUuYXNzaWduZWRfW3Byb3BdID0gZmFsc2Vcblx0XHRcdHByZXBhcmVDb3B5KHN0YXRlKVxuXHRcdFx0bWFya0NoYW5nZWQoc3RhdGUpXG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIGlmIGFuIG9yaWdpbmFsbHkgbm90IGFzc2lnbmVkIHByb3BlcnR5IHdhcyBkZWxldGVkXG5cdFx0XHRkZWxldGUgc3RhdGUuYXNzaWduZWRfW3Byb3BdXG5cdFx0fVxuXHRcdGlmIChzdGF0ZS5jb3B5Xykge1xuXHRcdFx0ZGVsZXRlIHN0YXRlLmNvcHlfW3Byb3BdXG5cdFx0fVxuXHRcdHJldHVybiB0cnVlXG5cdH0sXG5cdC8vIE5vdGU6IFdlIG5ldmVyIGNvZXJjZSBgZGVzYy52YWx1ZWAgaW50byBhbiBJbW1lciBkcmFmdCwgYmVjYXVzZSB3ZSBjYW4ndCBtYWtlXG5cdC8vIHRoZSBzYW1lIGd1YXJhbnRlZSBpbiBFUzUgbW9kZS5cblx0Z2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHN0YXRlLCBwcm9wKSB7XG5cdFx0Y29uc3Qgb3duZXIgPSBsYXRlc3Qoc3RhdGUpXG5cdFx0Y29uc3QgZGVzYyA9IFJlZmxlY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG93bmVyLCBwcm9wKVxuXHRcdGlmICghZGVzYykgcmV0dXJuIGRlc2Ncblx0XHRyZXR1cm4ge1xuXHRcdFx0d3JpdGFibGU6IHRydWUsXG5cdFx0XHRjb25maWd1cmFibGU6IHN0YXRlLnR5cGVfICE9PSBBcmNoVHlwZS5BcnJheSB8fCBwcm9wICE9PSBcImxlbmd0aFwiLFxuXHRcdFx0ZW51bWVyYWJsZTogZGVzYy5lbnVtZXJhYmxlLFxuXHRcdFx0dmFsdWU6IG93bmVyW3Byb3BdXG5cdFx0fVxuXHR9LFxuXHRkZWZpbmVQcm9wZXJ0eSgpIHtcblx0XHRkaWUoMTEpXG5cdH0sXG5cdGdldFByb3RvdHlwZU9mKHN0YXRlKSB7XG5cdFx0cmV0dXJuIGdldFByb3RvdHlwZU9mKHN0YXRlLmJhc2VfKVxuXHR9LFxuXHRzZXRQcm90b3R5cGVPZigpIHtcblx0XHRkaWUoMTIpXG5cdH1cbn1cblxuLyoqXG4gKiBBcnJheSBkcmFmdHNcbiAqL1xuXG5jb25zdCBhcnJheVRyYXBzOiBQcm94eUhhbmRsZXI8W1Byb3h5QXJyYXlTdGF0ZV0+ID0ge31cbmVhY2gob2JqZWN0VHJhcHMsIChrZXksIGZuKSA9PiB7XG5cdC8vIEB0cy1pZ25vcmVcblx0YXJyYXlUcmFwc1trZXldID0gZnVuY3Rpb24oKSB7XG5cdFx0YXJndW1lbnRzWzBdID0gYXJndW1lbnRzWzBdWzBdXG5cdFx0cmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcblx0fVxufSlcbmFycmF5VHJhcHMuZGVsZXRlUHJvcGVydHkgPSBmdW5jdGlvbihzdGF0ZSwgcHJvcCkge1xuXHRpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmIGlzTmFOKHBhcnNlSW50KHByb3AgYXMgYW55KSkpXG5cdFx0ZGllKDEzKVxuXHQvLyBAdHMtaWdub3JlXG5cdHJldHVybiBhcnJheVRyYXBzLnNldCEuY2FsbCh0aGlzLCBzdGF0ZSwgcHJvcCwgdW5kZWZpbmVkKVxufVxuYXJyYXlUcmFwcy5zZXQgPSBmdW5jdGlvbihzdGF0ZSwgcHJvcCwgdmFsdWUpIHtcblx0aWYgKFxuXHRcdHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJlxuXHRcdHByb3AgIT09IFwibGVuZ3RoXCIgJiZcblx0XHRpc05hTihwYXJzZUludChwcm9wIGFzIGFueSkpXG5cdClcblx0XHRkaWUoMTQpXG5cdHJldHVybiBvYmplY3RUcmFwcy5zZXQhLmNhbGwodGhpcywgc3RhdGVbMF0sIHByb3AsIHZhbHVlLCBzdGF0ZVswXSlcbn1cblxuLy8gQWNjZXNzIGEgcHJvcGVydHkgd2l0aG91dCBjcmVhdGluZyBhbiBJbW1lciBkcmFmdC5cbmZ1bmN0aW9uIHBlZWsoZHJhZnQ6IERyYWZ0ZWQsIHByb3A6IFByb3BlcnR5S2V5KSB7XG5cdGNvbnN0IHN0YXRlID0gZHJhZnRbRFJBRlRfU1RBVEVdXG5cdGNvbnN0IHNvdXJjZSA9IHN0YXRlID8gbGF0ZXN0KHN0YXRlKSA6IGRyYWZ0XG5cdHJldHVybiBzb3VyY2VbcHJvcF1cbn1cblxuZnVuY3Rpb24gcmVhZFByb3BGcm9tUHJvdG8oc3RhdGU6IEltbWVyU3RhdGUsIHNvdXJjZTogYW55LCBwcm9wOiBQcm9wZXJ0eUtleSkge1xuXHRjb25zdCBkZXNjID0gZ2V0RGVzY3JpcHRvckZyb21Qcm90byhzb3VyY2UsIHByb3ApXG5cdHJldHVybiBkZXNjXG5cdFx0PyBgdmFsdWVgIGluIGRlc2Ncblx0XHRcdD8gZGVzYy52YWx1ZVxuXHRcdFx0OiAvLyBUaGlzIGlzIGEgdmVyeSBzcGVjaWFsIGNhc2UsIGlmIHRoZSBwcm9wIGlzIGEgZ2V0dGVyIGRlZmluZWQgYnkgdGhlXG5cdFx0XHQgIC8vIHByb3RvdHlwZSwgd2Ugc2hvdWxkIGludm9rZSBpdCB3aXRoIHRoZSBkcmFmdCBhcyBjb250ZXh0IVxuXHRcdFx0ICBkZXNjLmdldD8uY2FsbChzdGF0ZS5kcmFmdF8pXG5cdFx0OiB1bmRlZmluZWRcbn1cblxuZnVuY3Rpb24gZ2V0RGVzY3JpcHRvckZyb21Qcm90byhcblx0c291cmNlOiBhbnksXG5cdHByb3A6IFByb3BlcnR5S2V5XG4pOiBQcm9wZXJ0eURlc2NyaXB0b3IgfCB1bmRlZmluZWQge1xuXHQvLyAnaW4nIGNoZWNrcyBwcm90byFcblx0aWYgKCEocHJvcCBpbiBzb3VyY2UpKSByZXR1cm4gdW5kZWZpbmVkXG5cdGxldCBwcm90byA9IGdldFByb3RvdHlwZU9mKHNvdXJjZSlcblx0d2hpbGUgKHByb3RvKSB7XG5cdFx0Y29uc3QgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IocHJvdG8sIHByb3ApXG5cdFx0aWYgKGRlc2MpIHJldHVybiBkZXNjXG5cdFx0cHJvdG8gPSBnZXRQcm90b3R5cGVPZihwcm90bylcblx0fVxuXHRyZXR1cm4gdW5kZWZpbmVkXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYXJrQ2hhbmdlZChzdGF0ZTogSW1tZXJTdGF0ZSkge1xuXHRpZiAoIXN0YXRlLm1vZGlmaWVkXykge1xuXHRcdHN0YXRlLm1vZGlmaWVkXyA9IHRydWVcblx0XHRpZiAoc3RhdGUucGFyZW50Xykge1xuXHRcdFx0bWFya0NoYW5nZWQoc3RhdGUucGFyZW50Xylcblx0XHR9XG5cdH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByZXBhcmVDb3B5KHN0YXRlOiB7XG5cdGJhc2VfOiBhbnlcblx0Y29weV86IGFueVxuXHRzY29wZV86IEltbWVyU2NvcGVcbn0pIHtcblx0aWYgKCFzdGF0ZS5jb3B5Xykge1xuXHRcdHN0YXRlLmNvcHlfID0gc2hhbGxvd0NvcHkoXG5cdFx0XHRzdGF0ZS5iYXNlXyxcblx0XHRcdHN0YXRlLnNjb3BlXy5pbW1lcl8udXNlU3RyaWN0U2hhbGxvd0NvcHlfXG5cdFx0KVxuXHR9XG59XG4iLCAiaW1wb3J0IHtcblx0SVByb2R1Y2VXaXRoUGF0Y2hlcyxcblx0SVByb2R1Y2UsXG5cdEltbWVyU3RhdGUsXG5cdERyYWZ0ZWQsXG5cdGlzRHJhZnRhYmxlLFxuXHRwcm9jZXNzUmVzdWx0LFxuXHRQYXRjaCxcblx0T2JqZWN0aXNoLFxuXHREUkFGVF9TVEFURSxcblx0RHJhZnQsXG5cdFBhdGNoTGlzdGVuZXIsXG5cdGlzRHJhZnQsXG5cdGlzTWFwLFxuXHRpc1NldCxcblx0Y3JlYXRlUHJveHlQcm94eSxcblx0Z2V0UGx1Z2luLFxuXHRkaWUsXG5cdGVudGVyU2NvcGUsXG5cdHJldm9rZVNjb3BlLFxuXHRsZWF2ZVNjb3BlLFxuXHR1c2VQYXRjaGVzSW5TY29wZSxcblx0Z2V0Q3VycmVudFNjb3BlLFxuXHROT1RISU5HLFxuXHRmcmVlemUsXG5cdGN1cnJlbnRcbn0gZnJvbSBcIi4uL2ludGVybmFsXCJcblxuaW50ZXJmYWNlIFByb2R1Y2Vyc0ZucyB7XG5cdHByb2R1Y2U6IElQcm9kdWNlXG5cdHByb2R1Y2VXaXRoUGF0Y2hlczogSVByb2R1Y2VXaXRoUGF0Y2hlc1xufVxuXG5leHBvcnQgdHlwZSBTdHJpY3RNb2RlID0gYm9vbGVhbiB8IFwiY2xhc3Nfb25seVwiO1xuXG5leHBvcnQgY2xhc3MgSW1tZXIgaW1wbGVtZW50cyBQcm9kdWNlcnNGbnMge1xuXHRhdXRvRnJlZXplXzogYm9vbGVhbiA9IHRydWVcblx0dXNlU3RyaWN0U2hhbGxvd0NvcHlfOiBTdHJpY3RNb2RlID0gZmFsc2VcblxuXHRjb25zdHJ1Y3Rvcihjb25maWc/OiB7XG5cdFx0YXV0b0ZyZWV6ZT86IGJvb2xlYW5cblx0XHR1c2VTdHJpY3RTaGFsbG93Q29weT86IFN0cmljdE1vZGVcblx0fSkge1xuXHRcdGlmICh0eXBlb2YgY29uZmlnPy5hdXRvRnJlZXplID09PSBcImJvb2xlYW5cIilcblx0XHRcdHRoaXMuc2V0QXV0b0ZyZWV6ZShjb25maWchLmF1dG9GcmVlemUpXG5cdFx0aWYgKHR5cGVvZiBjb25maWc/LnVzZVN0cmljdFNoYWxsb3dDb3B5ID09PSBcImJvb2xlYW5cIilcblx0XHRcdHRoaXMuc2V0VXNlU3RyaWN0U2hhbGxvd0NvcHkoY29uZmlnIS51c2VTdHJpY3RTaGFsbG93Q29weSlcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgYHByb2R1Y2VgIGZ1bmN0aW9uIHRha2VzIGEgdmFsdWUgYW5kIGEgXCJyZWNpcGUgZnVuY3Rpb25cIiAod2hvc2Vcblx0ICogcmV0dXJuIHZhbHVlIG9mdGVuIGRlcGVuZHMgb24gdGhlIGJhc2Ugc3RhdGUpLiBUaGUgcmVjaXBlIGZ1bmN0aW9uIGlzXG5cdCAqIGZyZWUgdG8gbXV0YXRlIGl0cyBmaXJzdCBhcmd1bWVudCBob3dldmVyIGl0IHdhbnRzLiBBbGwgbXV0YXRpb25zIGFyZVxuXHQgKiBvbmx5IGV2ZXIgYXBwbGllZCB0byBhIF9fY29weV9fIG9mIHRoZSBiYXNlIHN0YXRlLlxuXHQgKlxuXHQgKiBQYXNzIG9ubHkgYSBmdW5jdGlvbiB0byBjcmVhdGUgYSBcImN1cnJpZWQgcHJvZHVjZXJcIiB3aGljaCByZWxpZXZlcyB5b3Vcblx0ICogZnJvbSBwYXNzaW5nIHRoZSByZWNpcGUgZnVuY3Rpb24gZXZlcnkgdGltZS5cblx0ICpcblx0ICogT25seSBwbGFpbiBvYmplY3RzIGFuZCBhcnJheXMgYXJlIG1hZGUgbXV0YWJsZS4gQWxsIG90aGVyIG9iamVjdHMgYXJlXG5cdCAqIGNvbnNpZGVyZWQgdW5jb3B5YWJsZS5cblx0ICpcblx0ICogTm90ZTogVGhpcyBmdW5jdGlvbiBpcyBfX2JvdW5kX18gdG8gaXRzIGBJbW1lcmAgaW5zdGFuY2UuXG5cdCAqXG5cdCAqIEBwYXJhbSB7YW55fSBiYXNlIC0gdGhlIGluaXRpYWwgc3RhdGVcblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gcmVjaXBlIC0gZnVuY3Rpb24gdGhhdCByZWNlaXZlcyBhIHByb3h5IG9mIHRoZSBiYXNlIHN0YXRlIGFzIGZpcnN0IGFyZ3VtZW50IGFuZCB3aGljaCBjYW4gYmUgZnJlZWx5IG1vZGlmaWVkXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IHBhdGNoTGlzdGVuZXIgLSBvcHRpb25hbCBmdW5jdGlvbiB0aGF0IHdpbGwgYmUgY2FsbGVkIHdpdGggYWxsIHRoZSBwYXRjaGVzIHByb2R1Y2VkIGhlcmVcblx0ICogQHJldHVybnMge2FueX0gYSBuZXcgc3RhdGUsIG9yIHRoZSBpbml0aWFsIHN0YXRlIGlmIG5vdGhpbmcgd2FzIG1vZGlmaWVkXG5cdCAqL1xuXHRwcm9kdWNlOiBJUHJvZHVjZSA9IChiYXNlOiBhbnksIHJlY2lwZT86IGFueSwgcGF0Y2hMaXN0ZW5lcj86IGFueSkgPT4ge1xuXHRcdC8vIGN1cnJpZWQgaW52b2NhdGlvblxuXHRcdGlmICh0eXBlb2YgYmFzZSA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiByZWNpcGUgIT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0Y29uc3QgZGVmYXVsdEJhc2UgPSByZWNpcGVcblx0XHRcdHJlY2lwZSA9IGJhc2VcblxuXHRcdFx0Y29uc3Qgc2VsZiA9IHRoaXNcblx0XHRcdHJldHVybiBmdW5jdGlvbiBjdXJyaWVkUHJvZHVjZShcblx0XHRcdFx0dGhpczogYW55LFxuXHRcdFx0XHRiYXNlID0gZGVmYXVsdEJhc2UsXG5cdFx0XHRcdC4uLmFyZ3M6IGFueVtdXG5cdFx0XHQpIHtcblx0XHRcdFx0cmV0dXJuIHNlbGYucHJvZHVjZShiYXNlLCAoZHJhZnQ6IERyYWZ0ZWQpID0+IHJlY2lwZS5jYWxsKHRoaXMsIGRyYWZ0LCAuLi5hcmdzKSkgLy8gcHJldHRpZXItaWdub3JlXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKHR5cGVvZiByZWNpcGUgIT09IFwiZnVuY3Rpb25cIikgZGllKDYpXG5cdFx0aWYgKHBhdGNoTGlzdGVuZXIgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgcGF0Y2hMaXN0ZW5lciAhPT0gXCJmdW5jdGlvblwiKVxuXHRcdFx0ZGllKDcpXG5cblx0XHRsZXQgcmVzdWx0XG5cblx0XHQvLyBPbmx5IHBsYWluIG9iamVjdHMsIGFycmF5cywgYW5kIFwiaW1tZXJhYmxlIGNsYXNzZXNcIiBhcmUgZHJhZnRlZC5cblx0XHRpZiAoaXNEcmFmdGFibGUoYmFzZSkpIHtcblx0XHRcdGNvbnN0IHNjb3BlID0gZW50ZXJTY29wZSh0aGlzKVxuXHRcdFx0Y29uc3QgcHJveHkgPSBjcmVhdGVQcm94eShiYXNlLCB1bmRlZmluZWQpXG5cdFx0XHRsZXQgaGFzRXJyb3IgPSB0cnVlXG5cdFx0XHR0cnkge1xuXHRcdFx0XHRyZXN1bHQgPSByZWNpcGUocHJveHkpXG5cdFx0XHRcdGhhc0Vycm9yID0gZmFsc2Vcblx0XHRcdH0gZmluYWxseSB7XG5cdFx0XHRcdC8vIGZpbmFsbHkgaW5zdGVhZCBvZiBjYXRjaCArIHJldGhyb3cgYmV0dGVyIHByZXNlcnZlcyBvcmlnaW5hbCBzdGFja1xuXHRcdFx0XHRpZiAoaGFzRXJyb3IpIHJldm9rZVNjb3BlKHNjb3BlKVxuXHRcdFx0XHRlbHNlIGxlYXZlU2NvcGUoc2NvcGUpXG5cdFx0XHR9XG5cdFx0XHR1c2VQYXRjaGVzSW5TY29wZShzY29wZSwgcGF0Y2hMaXN0ZW5lcilcblx0XHRcdHJldHVybiBwcm9jZXNzUmVzdWx0KHJlc3VsdCwgc2NvcGUpXG5cdFx0fSBlbHNlIGlmICghYmFzZSB8fCB0eXBlb2YgYmFzZSAhPT0gXCJvYmplY3RcIikge1xuXHRcdFx0cmVzdWx0ID0gcmVjaXBlKGJhc2UpXG5cdFx0XHRpZiAocmVzdWx0ID09PSB1bmRlZmluZWQpIHJlc3VsdCA9IGJhc2Vcblx0XHRcdGlmIChyZXN1bHQgPT09IE5PVEhJTkcpIHJlc3VsdCA9IHVuZGVmaW5lZFxuXHRcdFx0aWYgKHRoaXMuYXV0b0ZyZWV6ZV8pIGZyZWV6ZShyZXN1bHQsIHRydWUpXG5cdFx0XHRpZiAocGF0Y2hMaXN0ZW5lcikge1xuXHRcdFx0XHRjb25zdCBwOiBQYXRjaFtdID0gW11cblx0XHRcdFx0Y29uc3QgaXA6IFBhdGNoW10gPSBbXVxuXHRcdFx0XHRnZXRQbHVnaW4oXCJQYXRjaGVzXCIpLmdlbmVyYXRlUmVwbGFjZW1lbnRQYXRjaGVzXyhiYXNlLCByZXN1bHQsIHAsIGlwKVxuXHRcdFx0XHRwYXRjaExpc3RlbmVyKHAsIGlwKVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHJlc3VsdFxuXHRcdH0gZWxzZSBkaWUoMSwgYmFzZSlcblx0fVxuXG5cdHByb2R1Y2VXaXRoUGF0Y2hlczogSVByb2R1Y2VXaXRoUGF0Y2hlcyA9IChiYXNlOiBhbnksIHJlY2lwZT86IGFueSk6IGFueSA9PiB7XG5cdFx0Ly8gY3VycmllZCBpbnZvY2F0aW9uXG5cdFx0aWYgKHR5cGVvZiBiYXNlID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdHJldHVybiAoc3RhdGU6IGFueSwgLi4uYXJnczogYW55W10pID0+XG5cdFx0XHRcdHRoaXMucHJvZHVjZVdpdGhQYXRjaGVzKHN0YXRlLCAoZHJhZnQ6IGFueSkgPT4gYmFzZShkcmFmdCwgLi4uYXJncykpXG5cdFx0fVxuXG5cdFx0bGV0IHBhdGNoZXM6IFBhdGNoW10sIGludmVyc2VQYXRjaGVzOiBQYXRjaFtdXG5cdFx0Y29uc3QgcmVzdWx0ID0gdGhpcy5wcm9kdWNlKGJhc2UsIHJlY2lwZSwgKHA6IFBhdGNoW10sIGlwOiBQYXRjaFtdKSA9PiB7XG5cdFx0XHRwYXRjaGVzID0gcFxuXHRcdFx0aW52ZXJzZVBhdGNoZXMgPSBpcFxuXHRcdH0pXG5cdFx0cmV0dXJuIFtyZXN1bHQsIHBhdGNoZXMhLCBpbnZlcnNlUGF0Y2hlcyFdXG5cdH1cblxuXHRjcmVhdGVEcmFmdDxUIGV4dGVuZHMgT2JqZWN0aXNoPihiYXNlOiBUKTogRHJhZnQ8VD4ge1xuXHRcdGlmICghaXNEcmFmdGFibGUoYmFzZSkpIGRpZSg4KVxuXHRcdGlmIChpc0RyYWZ0KGJhc2UpKSBiYXNlID0gY3VycmVudChiYXNlKVxuXHRcdGNvbnN0IHNjb3BlID0gZW50ZXJTY29wZSh0aGlzKVxuXHRcdGNvbnN0IHByb3h5ID0gY3JlYXRlUHJveHkoYmFzZSwgdW5kZWZpbmVkKVxuXHRcdHByb3h5W0RSQUZUX1NUQVRFXS5pc01hbnVhbF8gPSB0cnVlXG5cdFx0bGVhdmVTY29wZShzY29wZSlcblx0XHRyZXR1cm4gcHJveHkgYXMgYW55XG5cdH1cblxuXHRmaW5pc2hEcmFmdDxEIGV4dGVuZHMgRHJhZnQ8YW55Pj4oXG5cdFx0ZHJhZnQ6IEQsXG5cdFx0cGF0Y2hMaXN0ZW5lcj86IFBhdGNoTGlzdGVuZXJcblx0KTogRCBleHRlbmRzIERyYWZ0PGluZmVyIFQ+ID8gVCA6IG5ldmVyIHtcblx0XHRjb25zdCBzdGF0ZTogSW1tZXJTdGF0ZSA9IGRyYWZ0ICYmIChkcmFmdCBhcyBhbnkpW0RSQUZUX1NUQVRFXVxuXHRcdGlmICghc3RhdGUgfHwgIXN0YXRlLmlzTWFudWFsXykgZGllKDkpXG5cdFx0Y29uc3Qge3Njb3BlXzogc2NvcGV9ID0gc3RhdGVcblx0XHR1c2VQYXRjaGVzSW5TY29wZShzY29wZSwgcGF0Y2hMaXN0ZW5lcilcblx0XHRyZXR1cm4gcHJvY2Vzc1Jlc3VsdCh1bmRlZmluZWQsIHNjb3BlKVxuXHR9XG5cblx0LyoqXG5cdCAqIFBhc3MgdHJ1ZSB0byBhdXRvbWF0aWNhbGx5IGZyZWV6ZSBhbGwgY29waWVzIGNyZWF0ZWQgYnkgSW1tZXIuXG5cdCAqXG5cdCAqIEJ5IGRlZmF1bHQsIGF1dG8tZnJlZXppbmcgaXMgZW5hYmxlZC5cblx0ICovXG5cdHNldEF1dG9GcmVlemUodmFsdWU6IGJvb2xlYW4pIHtcblx0XHR0aGlzLmF1dG9GcmVlemVfID0gdmFsdWVcblx0fVxuXG5cdC8qKlxuXHQgKiBQYXNzIHRydWUgdG8gZW5hYmxlIHN0cmljdCBzaGFsbG93IGNvcHkuXG5cdCAqXG5cdCAqIEJ5IGRlZmF1bHQsIGltbWVyIGRvZXMgbm90IGNvcHkgdGhlIG9iamVjdCBkZXNjcmlwdG9ycyBzdWNoIGFzIGdldHRlciwgc2V0dGVyIGFuZCBub24tZW51bXJhYmxlIHByb3BlcnRpZXMuXG5cdCAqL1xuXHRzZXRVc2VTdHJpY3RTaGFsbG93Q29weSh2YWx1ZTogU3RyaWN0TW9kZSkge1xuXHRcdHRoaXMudXNlU3RyaWN0U2hhbGxvd0NvcHlfID0gdmFsdWVcblx0fVxuXG5cdGFwcGx5UGF0Y2hlczxUIGV4dGVuZHMgT2JqZWN0aXNoPihiYXNlOiBULCBwYXRjaGVzOiByZWFkb25seSBQYXRjaFtdKTogVCB7XG5cdFx0Ly8gSWYgYSBwYXRjaCByZXBsYWNlcyB0aGUgZW50aXJlIHN0YXRlLCB0YWtlIHRoYXQgcmVwbGFjZW1lbnQgYXMgYmFzZVxuXHRcdC8vIGJlZm9yZSBhcHBseWluZyBwYXRjaGVzXG5cdFx0bGV0IGk6IG51bWJlclxuXHRcdGZvciAoaSA9IHBhdGNoZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcblx0XHRcdGNvbnN0IHBhdGNoID0gcGF0Y2hlc1tpXVxuXHRcdFx0aWYgKHBhdGNoLnBhdGgubGVuZ3RoID09PSAwICYmIHBhdGNoLm9wID09PSBcInJlcGxhY2VcIikge1xuXHRcdFx0XHRiYXNlID0gcGF0Y2gudmFsdWVcblx0XHRcdFx0YnJlYWtcblx0XHRcdH1cblx0XHR9XG5cdFx0Ly8gSWYgdGhlcmUgd2FzIGEgcGF0Y2ggdGhhdCByZXBsYWNlZCB0aGUgZW50aXJlIHN0YXRlLCBzdGFydCBmcm9tIHRoZVxuXHRcdC8vIHBhdGNoIGFmdGVyIHRoYXQuXG5cdFx0aWYgKGkgPiAtMSkge1xuXHRcdFx0cGF0Y2hlcyA9IHBhdGNoZXMuc2xpY2UoaSArIDEpXG5cdFx0fVxuXG5cdFx0Y29uc3QgYXBwbHlQYXRjaGVzSW1wbCA9IGdldFBsdWdpbihcIlBhdGNoZXNcIikuYXBwbHlQYXRjaGVzX1xuXHRcdGlmIChpc0RyYWZ0KGJhc2UpKSB7XG5cdFx0XHQvLyBOLkI6IG5ldmVyIGhpdHMgaWYgc29tZSBwYXRjaCBhIHJlcGxhY2VtZW50LCBwYXRjaGVzIGFyZSBuZXZlciBkcmFmdHNcblx0XHRcdHJldHVybiBhcHBseVBhdGNoZXNJbXBsKGJhc2UsIHBhdGNoZXMpXG5cdFx0fVxuXHRcdC8vIE90aGVyd2lzZSwgcHJvZHVjZSBhIGNvcHkgb2YgdGhlIGJhc2Ugc3RhdGUuXG5cdFx0cmV0dXJuIHRoaXMucHJvZHVjZShiYXNlLCAoZHJhZnQ6IERyYWZ0ZWQpID0+XG5cdFx0XHRhcHBseVBhdGNoZXNJbXBsKGRyYWZ0LCBwYXRjaGVzKVxuXHRcdClcblx0fVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUHJveHk8VCBleHRlbmRzIE9iamVjdGlzaD4oXG5cdHZhbHVlOiBULFxuXHRwYXJlbnQ/OiBJbW1lclN0YXRlXG4pOiBEcmFmdGVkPFQsIEltbWVyU3RhdGU+IHtcblx0Ly8gcHJlY29uZGl0aW9uOiBjcmVhdGVQcm94eSBzaG91bGQgYmUgZ3VhcmRlZCBieSBpc0RyYWZ0YWJsZSwgc28gd2Uga25vdyB3ZSBjYW4gc2FmZWx5IGRyYWZ0XG5cdGNvbnN0IGRyYWZ0OiBEcmFmdGVkID0gaXNNYXAodmFsdWUpXG5cdFx0PyBnZXRQbHVnaW4oXCJNYXBTZXRcIikucHJveHlNYXBfKHZhbHVlLCBwYXJlbnQpXG5cdFx0OiBpc1NldCh2YWx1ZSlcblx0XHQ/IGdldFBsdWdpbihcIk1hcFNldFwiKS5wcm94eVNldF8odmFsdWUsIHBhcmVudClcblx0XHQ6IGNyZWF0ZVByb3h5UHJveHkodmFsdWUsIHBhcmVudClcblxuXHRjb25zdCBzY29wZSA9IHBhcmVudCA/IHBhcmVudC5zY29wZV8gOiBnZXRDdXJyZW50U2NvcGUoKVxuXHRzY29wZS5kcmFmdHNfLnB1c2goZHJhZnQpXG5cdHJldHVybiBkcmFmdFxufVxuIiwgImltcG9ydCB7XG5cdGRpZSxcblx0aXNEcmFmdCxcblx0c2hhbGxvd0NvcHksXG5cdGVhY2gsXG5cdERSQUZUX1NUQVRFLFxuXHRzZXQsXG5cdEltbWVyU3RhdGUsXG5cdGlzRHJhZnRhYmxlLFxuXHRpc0Zyb3plblxufSBmcm9tIFwiLi4vaW50ZXJuYWxcIlxuXG4vKiogVGFrZXMgYSBzbmFwc2hvdCBvZiB0aGUgY3VycmVudCBzdGF0ZSBvZiBhIGRyYWZ0IGFuZCBmaW5hbGl6ZXMgaXQgKGJ1dCB3aXRob3V0IGZyZWV6aW5nKS4gVGhpcyBpcyBhIGdyZWF0IHV0aWxpdHkgdG8gcHJpbnQgdGhlIGN1cnJlbnQgc3RhdGUgZHVyaW5nIGRlYnVnZ2luZyAobm8gUHJveGllcyBpbiB0aGUgd2F5KS4gVGhlIG91dHB1dCBvZiBjdXJyZW50IGNhbiBhbHNvIGJlIHNhZmVseSBsZWFrZWQgb3V0c2lkZSB0aGUgcHJvZHVjZXIuICovXG5leHBvcnQgZnVuY3Rpb24gY3VycmVudDxUPih2YWx1ZTogVCk6IFRcbmV4cG9ydCBmdW5jdGlvbiBjdXJyZW50KHZhbHVlOiBhbnkpOiBhbnkge1xuXHRpZiAoIWlzRHJhZnQodmFsdWUpKSBkaWUoMTAsIHZhbHVlKVxuXHRyZXR1cm4gY3VycmVudEltcGwodmFsdWUpXG59XG5cbmZ1bmN0aW9uIGN1cnJlbnRJbXBsKHZhbHVlOiBhbnkpOiBhbnkge1xuXHRpZiAoIWlzRHJhZnRhYmxlKHZhbHVlKSB8fCBpc0Zyb3plbih2YWx1ZSkpIHJldHVybiB2YWx1ZVxuXHRjb25zdCBzdGF0ZTogSW1tZXJTdGF0ZSB8IHVuZGVmaW5lZCA9IHZhbHVlW0RSQUZUX1NUQVRFXVxuXHRsZXQgY29weTogYW55XG5cdGlmIChzdGF0ZSkge1xuXHRcdGlmICghc3RhdGUubW9kaWZpZWRfKSByZXR1cm4gc3RhdGUuYmFzZV9cblx0XHQvLyBPcHRpbWl6YXRpb246IGF2b2lkIGdlbmVyYXRpbmcgbmV3IGRyYWZ0cyBkdXJpbmcgY29weWluZ1xuXHRcdHN0YXRlLmZpbmFsaXplZF8gPSB0cnVlXG5cdFx0Y29weSA9IHNoYWxsb3dDb3B5KHZhbHVlLCBzdGF0ZS5zY29wZV8uaW1tZXJfLnVzZVN0cmljdFNoYWxsb3dDb3B5Xylcblx0fSBlbHNlIHtcblx0XHRjb3B5ID0gc2hhbGxvd0NvcHkodmFsdWUsIHRydWUpXG5cdH1cblx0Ly8gcmVjdXJzZVxuXHRlYWNoKGNvcHksIChrZXksIGNoaWxkVmFsdWUpID0+IHtcblx0XHRzZXQoY29weSwga2V5LCBjdXJyZW50SW1wbChjaGlsZFZhbHVlKSlcblx0fSlcblx0aWYgKHN0YXRlKSB7XG5cdFx0c3RhdGUuZmluYWxpemVkXyA9IGZhbHNlXG5cdH1cblx0cmV0dXJuIGNvcHlcbn1cbiIsICJpbXBvcnQge2ltbWVyYWJsZX0gZnJvbSBcIi4uL2ltbWVyXCJcbmltcG9ydCB7XG5cdEltbWVyU3RhdGUsXG5cdFBhdGNoLFxuXHRTZXRTdGF0ZSxcblx0UHJveHlBcnJheVN0YXRlLFxuXHRNYXBTdGF0ZSxcblx0UHJveHlPYmplY3RTdGF0ZSxcblx0UGF0Y2hQYXRoLFxuXHRnZXQsXG5cdGVhY2gsXG5cdGhhcyxcblx0Z2V0QXJjaHR5cGUsXG5cdGdldFByb3RvdHlwZU9mLFxuXHRpc1NldCxcblx0aXNNYXAsXG5cdGxvYWRQbHVnaW4sXG5cdEFyY2hUeXBlLFxuXHRkaWUsXG5cdGlzRHJhZnQsXG5cdGlzRHJhZnRhYmxlLFxuXHROT1RISU5HLFxuXHRlcnJvcnNcbn0gZnJvbSBcIi4uL2ludGVybmFsXCJcblxuZXhwb3J0IGZ1bmN0aW9uIGVuYWJsZVBhdGNoZXMoKSB7XG5cdGNvbnN0IGVycm9yT2Zmc2V0ID0gMTZcblx0aWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuXHRcdGVycm9ycy5wdXNoKFxuXHRcdFx0J1NldHMgY2Fubm90IGhhdmUgXCJyZXBsYWNlXCIgcGF0Y2hlcy4nLFxuXHRcdFx0ZnVuY3Rpb24ob3A6IHN0cmluZykge1xuXHRcdFx0XHRyZXR1cm4gXCJVbnN1cHBvcnRlZCBwYXRjaCBvcGVyYXRpb246IFwiICsgb3Bcblx0XHRcdH0sXG5cdFx0XHRmdW5jdGlvbihwYXRoOiBzdHJpbmcpIHtcblx0XHRcdFx0cmV0dXJuIFwiQ2Fubm90IGFwcGx5IHBhdGNoLCBwYXRoIGRvZXNuJ3QgcmVzb2x2ZTogXCIgKyBwYXRoXG5cdFx0XHR9LFxuXHRcdFx0XCJQYXRjaGluZyByZXNlcnZlZCBhdHRyaWJ1dGVzIGxpa2UgX19wcm90b19fLCBwcm90b3R5cGUgYW5kIGNvbnN0cnVjdG9yIGlzIG5vdCBhbGxvd2VkXCJcblx0XHQpXG5cdH1cblxuXHRjb25zdCBSRVBMQUNFID0gXCJyZXBsYWNlXCJcblx0Y29uc3QgQUREID0gXCJhZGRcIlxuXHRjb25zdCBSRU1PVkUgPSBcInJlbW92ZVwiXG5cblx0ZnVuY3Rpb24gZ2VuZXJhdGVQYXRjaGVzXyhcblx0XHRzdGF0ZTogSW1tZXJTdGF0ZSxcblx0XHRiYXNlUGF0aDogUGF0Y2hQYXRoLFxuXHRcdHBhdGNoZXM6IFBhdGNoW10sXG5cdFx0aW52ZXJzZVBhdGNoZXM6IFBhdGNoW11cblx0KTogdm9pZCB7XG5cdFx0c3dpdGNoIChzdGF0ZS50eXBlXykge1xuXHRcdFx0Y2FzZSBBcmNoVHlwZS5PYmplY3Q6XG5cdFx0XHRjYXNlIEFyY2hUeXBlLk1hcDpcblx0XHRcdFx0cmV0dXJuIGdlbmVyYXRlUGF0Y2hlc0Zyb21Bc3NpZ25lZChcblx0XHRcdFx0XHRzdGF0ZSxcblx0XHRcdFx0XHRiYXNlUGF0aCxcblx0XHRcdFx0XHRwYXRjaGVzLFxuXHRcdFx0XHRcdGludmVyc2VQYXRjaGVzXG5cdFx0XHRcdClcblx0XHRcdGNhc2UgQXJjaFR5cGUuQXJyYXk6XG5cdFx0XHRcdHJldHVybiBnZW5lcmF0ZUFycmF5UGF0Y2hlcyhzdGF0ZSwgYmFzZVBhdGgsIHBhdGNoZXMsIGludmVyc2VQYXRjaGVzKVxuXHRcdFx0Y2FzZSBBcmNoVHlwZS5TZXQ6XG5cdFx0XHRcdHJldHVybiBnZW5lcmF0ZVNldFBhdGNoZXMoXG5cdFx0XHRcdFx0KHN0YXRlIGFzIGFueSkgYXMgU2V0U3RhdGUsXG5cdFx0XHRcdFx0YmFzZVBhdGgsXG5cdFx0XHRcdFx0cGF0Y2hlcyxcblx0XHRcdFx0XHRpbnZlcnNlUGF0Y2hlc1xuXHRcdFx0XHQpXG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gZ2VuZXJhdGVBcnJheVBhdGNoZXMoXG5cdFx0c3RhdGU6IFByb3h5QXJyYXlTdGF0ZSxcblx0XHRiYXNlUGF0aDogUGF0Y2hQYXRoLFxuXHRcdHBhdGNoZXM6IFBhdGNoW10sXG5cdFx0aW52ZXJzZVBhdGNoZXM6IFBhdGNoW11cblx0KSB7XG5cdFx0bGV0IHtiYXNlXywgYXNzaWduZWRffSA9IHN0YXRlXG5cdFx0bGV0IGNvcHlfID0gc3RhdGUuY29weV8hXG5cblx0XHQvLyBSZWR1Y2UgY29tcGxleGl0eSBieSBlbnN1cmluZyBgYmFzZWAgaXMgbmV2ZXIgbG9uZ2VyLlxuXHRcdGlmIChjb3B5Xy5sZW5ndGggPCBiYXNlXy5sZW5ndGgpIHtcblx0XHRcdC8vIEB0cy1pZ25vcmVcblx0XHRcdDtbYmFzZV8sIGNvcHlfXSA9IFtjb3B5XywgYmFzZV9dXG5cdFx0XHQ7W3BhdGNoZXMsIGludmVyc2VQYXRjaGVzXSA9IFtpbnZlcnNlUGF0Y2hlcywgcGF0Y2hlc11cblx0XHR9XG5cblx0XHQvLyBQcm9jZXNzIHJlcGxhY2VkIGluZGljZXMuXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBiYXNlXy5sZW5ndGg7IGkrKykge1xuXHRcdFx0aWYgKGFzc2lnbmVkX1tpXSAmJiBjb3B5X1tpXSAhPT0gYmFzZV9baV0pIHtcblx0XHRcdFx0Y29uc3QgcGF0aCA9IGJhc2VQYXRoLmNvbmNhdChbaV0pXG5cdFx0XHRcdHBhdGNoZXMucHVzaCh7XG5cdFx0XHRcdFx0b3A6IFJFUExBQ0UsXG5cdFx0XHRcdFx0cGF0aCxcblx0XHRcdFx0XHQvLyBOZWVkIHRvIG1heWJlIGNsb25lIGl0LCBhcyBpdCBjYW4gaW4gZmFjdCBiZSB0aGUgb3JpZ2luYWwgdmFsdWVcblx0XHRcdFx0XHQvLyBkdWUgdG8gdGhlIGJhc2UvY29weSBpbnZlcnNpb24gYXQgdGhlIHN0YXJ0IG9mIHRoaXMgZnVuY3Rpb25cblx0XHRcdFx0XHR2YWx1ZTogY2xvbmVQYXRjaFZhbHVlSWZOZWVkZWQoY29weV9baV0pXG5cdFx0XHRcdH0pXG5cdFx0XHRcdGludmVyc2VQYXRjaGVzLnB1c2goe1xuXHRcdFx0XHRcdG9wOiBSRVBMQUNFLFxuXHRcdFx0XHRcdHBhdGgsXG5cdFx0XHRcdFx0dmFsdWU6IGNsb25lUGF0Y2hWYWx1ZUlmTmVlZGVkKGJhc2VfW2ldKVxuXHRcdFx0XHR9KVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIFByb2Nlc3MgYWRkZWQgaW5kaWNlcy5cblx0XHRmb3IgKGxldCBpID0gYmFzZV8ubGVuZ3RoOyBpIDwgY29weV8ubGVuZ3RoOyBpKyspIHtcblx0XHRcdGNvbnN0IHBhdGggPSBiYXNlUGF0aC5jb25jYXQoW2ldKVxuXHRcdFx0cGF0Y2hlcy5wdXNoKHtcblx0XHRcdFx0b3A6IEFERCxcblx0XHRcdFx0cGF0aCxcblx0XHRcdFx0Ly8gTmVlZCB0byBtYXliZSBjbG9uZSBpdCwgYXMgaXQgY2FuIGluIGZhY3QgYmUgdGhlIG9yaWdpbmFsIHZhbHVlXG5cdFx0XHRcdC8vIGR1ZSB0byB0aGUgYmFzZS9jb3B5IGludmVyc2lvbiBhdCB0aGUgc3RhcnQgb2YgdGhpcyBmdW5jdGlvblxuXHRcdFx0XHR2YWx1ZTogY2xvbmVQYXRjaFZhbHVlSWZOZWVkZWQoY29weV9baV0pXG5cdFx0XHR9KVxuXHRcdH1cblx0XHRmb3IgKGxldCBpID0gY29weV8ubGVuZ3RoIC0gMTsgYmFzZV8ubGVuZ3RoIDw9IGk7IC0taSkge1xuXHRcdFx0Y29uc3QgcGF0aCA9IGJhc2VQYXRoLmNvbmNhdChbaV0pXG5cdFx0XHRpbnZlcnNlUGF0Y2hlcy5wdXNoKHtcblx0XHRcdFx0b3A6IFJFTU9WRSxcblx0XHRcdFx0cGF0aFxuXHRcdFx0fSlcblx0XHR9XG5cdH1cblxuXHQvLyBUaGlzIGlzIHVzZWQgZm9yIGJvdGggTWFwIG9iamVjdHMgYW5kIG5vcm1hbCBvYmplY3RzLlxuXHRmdW5jdGlvbiBnZW5lcmF0ZVBhdGNoZXNGcm9tQXNzaWduZWQoXG5cdFx0c3RhdGU6IE1hcFN0YXRlIHwgUHJveHlPYmplY3RTdGF0ZSxcblx0XHRiYXNlUGF0aDogUGF0Y2hQYXRoLFxuXHRcdHBhdGNoZXM6IFBhdGNoW10sXG5cdFx0aW52ZXJzZVBhdGNoZXM6IFBhdGNoW11cblx0KSB7XG5cdFx0Y29uc3Qge2Jhc2VfLCBjb3B5X30gPSBzdGF0ZVxuXHRcdGVhY2goc3RhdGUuYXNzaWduZWRfISwgKGtleSwgYXNzaWduZWRWYWx1ZSkgPT4ge1xuXHRcdFx0Y29uc3Qgb3JpZ1ZhbHVlID0gZ2V0KGJhc2VfLCBrZXkpXG5cdFx0XHRjb25zdCB2YWx1ZSA9IGdldChjb3B5XyEsIGtleSlcblx0XHRcdGNvbnN0IG9wID0gIWFzc2lnbmVkVmFsdWUgPyBSRU1PVkUgOiBoYXMoYmFzZV8sIGtleSkgPyBSRVBMQUNFIDogQUREXG5cdFx0XHRpZiAob3JpZ1ZhbHVlID09PSB2YWx1ZSAmJiBvcCA9PT0gUkVQTEFDRSkgcmV0dXJuXG5cdFx0XHRjb25zdCBwYXRoID0gYmFzZVBhdGguY29uY2F0KGtleSBhcyBhbnkpXG5cdFx0XHRwYXRjaGVzLnB1c2gob3AgPT09IFJFTU9WRSA/IHtvcCwgcGF0aH0gOiB7b3AsIHBhdGgsIHZhbHVlfSlcblx0XHRcdGludmVyc2VQYXRjaGVzLnB1c2goXG5cdFx0XHRcdG9wID09PSBBRERcblx0XHRcdFx0XHQ/IHtvcDogUkVNT1ZFLCBwYXRofVxuXHRcdFx0XHRcdDogb3AgPT09IFJFTU9WRVxuXHRcdFx0XHRcdD8ge29wOiBBREQsIHBhdGgsIHZhbHVlOiBjbG9uZVBhdGNoVmFsdWVJZk5lZWRlZChvcmlnVmFsdWUpfVxuXHRcdFx0XHRcdDoge29wOiBSRVBMQUNFLCBwYXRoLCB2YWx1ZTogY2xvbmVQYXRjaFZhbHVlSWZOZWVkZWQob3JpZ1ZhbHVlKX1cblx0XHRcdClcblx0XHR9KVxuXHR9XG5cblx0ZnVuY3Rpb24gZ2VuZXJhdGVTZXRQYXRjaGVzKFxuXHRcdHN0YXRlOiBTZXRTdGF0ZSxcblx0XHRiYXNlUGF0aDogUGF0Y2hQYXRoLFxuXHRcdHBhdGNoZXM6IFBhdGNoW10sXG5cdFx0aW52ZXJzZVBhdGNoZXM6IFBhdGNoW11cblx0KSB7XG5cdFx0bGV0IHtiYXNlXywgY29weV99ID0gc3RhdGVcblxuXHRcdGxldCBpID0gMFxuXHRcdGJhc2VfLmZvckVhY2goKHZhbHVlOiBhbnkpID0+IHtcblx0XHRcdGlmICghY29weV8hLmhhcyh2YWx1ZSkpIHtcblx0XHRcdFx0Y29uc3QgcGF0aCA9IGJhc2VQYXRoLmNvbmNhdChbaV0pXG5cdFx0XHRcdHBhdGNoZXMucHVzaCh7XG5cdFx0XHRcdFx0b3A6IFJFTU9WRSxcblx0XHRcdFx0XHRwYXRoLFxuXHRcdFx0XHRcdHZhbHVlXG5cdFx0XHRcdH0pXG5cdFx0XHRcdGludmVyc2VQYXRjaGVzLnVuc2hpZnQoe1xuXHRcdFx0XHRcdG9wOiBBREQsXG5cdFx0XHRcdFx0cGF0aCxcblx0XHRcdFx0XHR2YWx1ZVxuXHRcdFx0XHR9KVxuXHRcdFx0fVxuXHRcdFx0aSsrXG5cdFx0fSlcblx0XHRpID0gMFxuXHRcdGNvcHlfIS5mb3JFYWNoKCh2YWx1ZTogYW55KSA9PiB7XG5cdFx0XHRpZiAoIWJhc2VfLmhhcyh2YWx1ZSkpIHtcblx0XHRcdFx0Y29uc3QgcGF0aCA9IGJhc2VQYXRoLmNvbmNhdChbaV0pXG5cdFx0XHRcdHBhdGNoZXMucHVzaCh7XG5cdFx0XHRcdFx0b3A6IEFERCxcblx0XHRcdFx0XHRwYXRoLFxuXHRcdFx0XHRcdHZhbHVlXG5cdFx0XHRcdH0pXG5cdFx0XHRcdGludmVyc2VQYXRjaGVzLnVuc2hpZnQoe1xuXHRcdFx0XHRcdG9wOiBSRU1PVkUsXG5cdFx0XHRcdFx0cGF0aCxcblx0XHRcdFx0XHR2YWx1ZVxuXHRcdFx0XHR9KVxuXHRcdFx0fVxuXHRcdFx0aSsrXG5cdFx0fSlcblx0fVxuXG5cdGZ1bmN0aW9uIGdlbmVyYXRlUmVwbGFjZW1lbnRQYXRjaGVzXyhcblx0XHRiYXNlVmFsdWU6IGFueSxcblx0XHRyZXBsYWNlbWVudDogYW55LFxuXHRcdHBhdGNoZXM6IFBhdGNoW10sXG5cdFx0aW52ZXJzZVBhdGNoZXM6IFBhdGNoW11cblx0KTogdm9pZCB7XG5cdFx0cGF0Y2hlcy5wdXNoKHtcblx0XHRcdG9wOiBSRVBMQUNFLFxuXHRcdFx0cGF0aDogW10sXG5cdFx0XHR2YWx1ZTogcmVwbGFjZW1lbnQgPT09IE5PVEhJTkcgPyB1bmRlZmluZWQgOiByZXBsYWNlbWVudFxuXHRcdH0pXG5cdFx0aW52ZXJzZVBhdGNoZXMucHVzaCh7XG5cdFx0XHRvcDogUkVQTEFDRSxcblx0XHRcdHBhdGg6IFtdLFxuXHRcdFx0dmFsdWU6IGJhc2VWYWx1ZVxuXHRcdH0pXG5cdH1cblxuXHRmdW5jdGlvbiBhcHBseVBhdGNoZXNfPFQ+KGRyYWZ0OiBULCBwYXRjaGVzOiByZWFkb25seSBQYXRjaFtdKTogVCB7XG5cdFx0cGF0Y2hlcy5mb3JFYWNoKHBhdGNoID0+IHtcblx0XHRcdGNvbnN0IHtwYXRoLCBvcH0gPSBwYXRjaFxuXG5cdFx0XHRsZXQgYmFzZTogYW55ID0gZHJhZnRcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcGF0aC5sZW5ndGggLSAxOyBpKyspIHtcblx0XHRcdFx0Y29uc3QgcGFyZW50VHlwZSA9IGdldEFyY2h0eXBlKGJhc2UpXG5cdFx0XHRcdGxldCBwID0gcGF0aFtpXVxuXHRcdFx0XHRpZiAodHlwZW9mIHAgIT09IFwic3RyaW5nXCIgJiYgdHlwZW9mIHAgIT09IFwibnVtYmVyXCIpIHtcblx0XHRcdFx0XHRwID0gXCJcIiArIHBcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIFNlZSAjNzM4LCBhdm9pZCBwcm90b3R5cGUgcG9sbHV0aW9uXG5cdFx0XHRcdGlmIChcblx0XHRcdFx0XHQocGFyZW50VHlwZSA9PT0gQXJjaFR5cGUuT2JqZWN0IHx8IHBhcmVudFR5cGUgPT09IEFyY2hUeXBlLkFycmF5KSAmJlxuXHRcdFx0XHRcdChwID09PSBcIl9fcHJvdG9fX1wiIHx8IHAgPT09IFwiY29uc3RydWN0b3JcIilcblx0XHRcdFx0KVxuXHRcdFx0XHRcdGRpZShlcnJvck9mZnNldCArIDMpXG5cdFx0XHRcdGlmICh0eXBlb2YgYmFzZSA9PT0gXCJmdW5jdGlvblwiICYmIHAgPT09IFwicHJvdG90eXBlXCIpXG5cdFx0XHRcdFx0ZGllKGVycm9yT2Zmc2V0ICsgMylcblx0XHRcdFx0YmFzZSA9IGdldChiYXNlLCBwKVxuXHRcdFx0XHRpZiAodHlwZW9mIGJhc2UgIT09IFwib2JqZWN0XCIpIGRpZShlcnJvck9mZnNldCArIDIsIHBhdGguam9pbihcIi9cIikpXG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IHR5cGUgPSBnZXRBcmNodHlwZShiYXNlKVxuXHRcdFx0Y29uc3QgdmFsdWUgPSBkZWVwQ2xvbmVQYXRjaFZhbHVlKHBhdGNoLnZhbHVlKSAvLyB1c2VkIHRvIGNsb25lIHBhdGNoIHRvIGVuc3VyZSBvcmlnaW5hbCBwYXRjaCBpcyBub3QgbW9kaWZpZWQsIHNlZSAjNDExXG5cdFx0XHRjb25zdCBrZXkgPSBwYXRoW3BhdGgubGVuZ3RoIC0gMV1cblx0XHRcdHN3aXRjaCAob3ApIHtcblx0XHRcdFx0Y2FzZSBSRVBMQUNFOlxuXHRcdFx0XHRcdHN3aXRjaCAodHlwZSkge1xuXHRcdFx0XHRcdFx0Y2FzZSBBcmNoVHlwZS5NYXA6XG5cdFx0XHRcdFx0XHRcdHJldHVybiBiYXNlLnNldChrZXksIHZhbHVlKVxuXHRcdFx0XHRcdFx0LyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cblx0XHRcdFx0XHRcdGNhc2UgQXJjaFR5cGUuU2V0OlxuXHRcdFx0XHRcdFx0XHRkaWUoZXJyb3JPZmZzZXQpXG5cdFx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0XHQvLyBpZiB2YWx1ZSBpcyBhbiBvYmplY3QsIHRoZW4gaXQncyBhc3NpZ25lZCBieSByZWZlcmVuY2Vcblx0XHRcdFx0XHRcdFx0Ly8gaW4gdGhlIGZvbGxvd2luZyBhZGQgb3IgcmVtb3ZlIG9wcywgdGhlIHZhbHVlIGZpZWxkIGluc2lkZSB0aGUgcGF0Y2ggd2lsbCBhbHNvIGJlIG1vZGlmeWVkXG5cdFx0XHRcdFx0XHRcdC8vIHNvIHdlIHVzZSB2YWx1ZSBmcm9tIHRoZSBjbG9uZWQgcGF0Y2hcblx0XHRcdFx0XHRcdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gKGJhc2Vba2V5XSA9IHZhbHVlKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0Y2FzZSBBREQ6XG5cdFx0XHRcdFx0c3dpdGNoICh0eXBlKSB7XG5cdFx0XHRcdFx0XHRjYXNlIEFyY2hUeXBlLkFycmF5OlxuXHRcdFx0XHRcdFx0XHRyZXR1cm4ga2V5ID09PSBcIi1cIlxuXHRcdFx0XHRcdFx0XHRcdD8gYmFzZS5wdXNoKHZhbHVlKVxuXHRcdFx0XHRcdFx0XHRcdDogYmFzZS5zcGxpY2Uoa2V5IGFzIGFueSwgMCwgdmFsdWUpXG5cdFx0XHRcdFx0XHRjYXNlIEFyY2hUeXBlLk1hcDpcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGJhc2Uuc2V0KGtleSwgdmFsdWUpXG5cdFx0XHRcdFx0XHRjYXNlIEFyY2hUeXBlLlNldDpcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGJhc2UuYWRkKHZhbHVlKVxuXHRcdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdFx0cmV0dXJuIChiYXNlW2tleV0gPSB2YWx1ZSlcblx0XHRcdFx0XHR9XG5cdFx0XHRcdGNhc2UgUkVNT1ZFOlxuXHRcdFx0XHRcdHN3aXRjaCAodHlwZSkge1xuXHRcdFx0XHRcdFx0Y2FzZSBBcmNoVHlwZS5BcnJheTpcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGJhc2Uuc3BsaWNlKGtleSBhcyBhbnksIDEpXG5cdFx0XHRcdFx0XHRjYXNlIEFyY2hUeXBlLk1hcDpcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGJhc2UuZGVsZXRlKGtleSlcblx0XHRcdFx0XHRcdGNhc2UgQXJjaFR5cGUuU2V0OlxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gYmFzZS5kZWxldGUocGF0Y2gudmFsdWUpXG5cdFx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZGVsZXRlIGJhc2Vba2V5XVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRkaWUoZXJyb3JPZmZzZXQgKyAxLCBvcClcblx0XHRcdH1cblx0XHR9KVxuXG5cdFx0cmV0dXJuIGRyYWZ0XG5cdH1cblxuXHQvLyBvcHRpbWl6ZTogdGhpcyBpcyBxdWl0ZSBhIHBlcmZvcm1hbmNlIGhpdCwgY2FuIHdlIGRldGVjdCBpbnRlbGxpZ2VudGx5IHdoZW4gaXQgaXMgbmVlZGVkP1xuXHQvLyBFLmcuIGF1dG8tZHJhZnQgd2hlbiBuZXcgb2JqZWN0cyBmcm9tIG91dHNpZGUgYXJlIGFzc2lnbmVkIGFuZCBtb2RpZmllZD9cblx0Ly8gKFNlZSBmYWlsaW5nIHRlc3Qgd2hlbiBkZWVwQ2xvbmUganVzdCByZXR1cm5zIG9iailcblx0ZnVuY3Rpb24gZGVlcENsb25lUGF0Y2hWYWx1ZTxUPihvYmo6IFQpOiBUXG5cdGZ1bmN0aW9uIGRlZXBDbG9uZVBhdGNoVmFsdWUob2JqOiBhbnkpIHtcblx0XHRpZiAoIWlzRHJhZnRhYmxlKG9iaikpIHJldHVybiBvYmpcblx0XHRpZiAoQXJyYXkuaXNBcnJheShvYmopKSByZXR1cm4gb2JqLm1hcChkZWVwQ2xvbmVQYXRjaFZhbHVlKVxuXHRcdGlmIChpc01hcChvYmopKVxuXHRcdFx0cmV0dXJuIG5ldyBNYXAoXG5cdFx0XHRcdEFycmF5LmZyb20ob2JqLmVudHJpZXMoKSkubWFwKChbaywgdl0pID0+IFtrLCBkZWVwQ2xvbmVQYXRjaFZhbHVlKHYpXSlcblx0XHRcdClcblx0XHRpZiAoaXNTZXQob2JqKSkgcmV0dXJuIG5ldyBTZXQoQXJyYXkuZnJvbShvYmopLm1hcChkZWVwQ2xvbmVQYXRjaFZhbHVlKSlcblx0XHRjb25zdCBjbG9uZWQgPSBPYmplY3QuY3JlYXRlKGdldFByb3RvdHlwZU9mKG9iaikpXG5cdFx0Zm9yIChjb25zdCBrZXkgaW4gb2JqKSBjbG9uZWRba2V5XSA9IGRlZXBDbG9uZVBhdGNoVmFsdWUob2JqW2tleV0pXG5cdFx0aWYgKGhhcyhvYmosIGltbWVyYWJsZSkpIGNsb25lZFtpbW1lcmFibGVdID0gb2JqW2ltbWVyYWJsZV1cblx0XHRyZXR1cm4gY2xvbmVkXG5cdH1cblxuXHRmdW5jdGlvbiBjbG9uZVBhdGNoVmFsdWVJZk5lZWRlZDxUPihvYmo6IFQpOiBUIHtcblx0XHRpZiAoaXNEcmFmdChvYmopKSB7XG5cdFx0XHRyZXR1cm4gZGVlcENsb25lUGF0Y2hWYWx1ZShvYmopXG5cdFx0fSBlbHNlIHJldHVybiBvYmpcblx0fVxuXG5cdGxvYWRQbHVnaW4oXCJQYXRjaGVzXCIsIHtcblx0XHRhcHBseVBhdGNoZXNfLFxuXHRcdGdlbmVyYXRlUGF0Y2hlc18sXG5cdFx0Z2VuZXJhdGVSZXBsYWNlbWVudFBhdGNoZXNfXG5cdH0pXG59XG4iLCAiLy8gdHlwZXMgb25seSFcbmltcG9ydCB7XG5cdEltbWVyU3RhdGUsXG5cdEFueU1hcCxcblx0QW55U2V0LFxuXHRNYXBTdGF0ZSxcblx0U2V0U3RhdGUsXG5cdERSQUZUX1NUQVRFLFxuXHRnZXRDdXJyZW50U2NvcGUsXG5cdGxhdGVzdCxcblx0aXNEcmFmdGFibGUsXG5cdGNyZWF0ZVByb3h5LFxuXHRsb2FkUGx1Z2luLFxuXHRtYXJrQ2hhbmdlZCxcblx0ZGllLFxuXHRBcmNoVHlwZSxcblx0ZWFjaFxufSBmcm9tIFwiLi4vaW50ZXJuYWxcIlxuXG5leHBvcnQgZnVuY3Rpb24gZW5hYmxlTWFwU2V0KCkge1xuXHRjbGFzcyBEcmFmdE1hcCBleHRlbmRzIE1hcCB7XG5cdFx0W0RSQUZUX1NUQVRFXTogTWFwU3RhdGVcblxuXHRcdGNvbnN0cnVjdG9yKHRhcmdldDogQW55TWFwLCBwYXJlbnQ/OiBJbW1lclN0YXRlKSB7XG5cdFx0XHRzdXBlcigpXG5cdFx0XHR0aGlzW0RSQUZUX1NUQVRFXSA9IHtcblx0XHRcdFx0dHlwZV86IEFyY2hUeXBlLk1hcCxcblx0XHRcdFx0cGFyZW50XzogcGFyZW50LFxuXHRcdFx0XHRzY29wZV86IHBhcmVudCA/IHBhcmVudC5zY29wZV8gOiBnZXRDdXJyZW50U2NvcGUoKSEsXG5cdFx0XHRcdG1vZGlmaWVkXzogZmFsc2UsXG5cdFx0XHRcdGZpbmFsaXplZF86IGZhbHNlLFxuXHRcdFx0XHRjb3B5XzogdW5kZWZpbmVkLFxuXHRcdFx0XHRhc3NpZ25lZF86IHVuZGVmaW5lZCxcblx0XHRcdFx0YmFzZV86IHRhcmdldCxcblx0XHRcdFx0ZHJhZnRfOiB0aGlzIGFzIGFueSxcblx0XHRcdFx0aXNNYW51YWxfOiBmYWxzZSxcblx0XHRcdFx0cmV2b2tlZF86IGZhbHNlXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Z2V0IHNpemUoKTogbnVtYmVyIHtcblx0XHRcdHJldHVybiBsYXRlc3QodGhpc1tEUkFGVF9TVEFURV0pLnNpemVcblx0XHR9XG5cblx0XHRoYXMoa2V5OiBhbnkpOiBib29sZWFuIHtcblx0XHRcdHJldHVybiBsYXRlc3QodGhpc1tEUkFGVF9TVEFURV0pLmhhcyhrZXkpXG5cdFx0fVxuXG5cdFx0c2V0KGtleTogYW55LCB2YWx1ZTogYW55KSB7XG5cdFx0XHRjb25zdCBzdGF0ZTogTWFwU3RhdGUgPSB0aGlzW0RSQUZUX1NUQVRFXVxuXHRcdFx0YXNzZXJ0VW5yZXZva2VkKHN0YXRlKVxuXHRcdFx0aWYgKCFsYXRlc3Qoc3RhdGUpLmhhcyhrZXkpIHx8IGxhdGVzdChzdGF0ZSkuZ2V0KGtleSkgIT09IHZhbHVlKSB7XG5cdFx0XHRcdHByZXBhcmVNYXBDb3B5KHN0YXRlKVxuXHRcdFx0XHRtYXJrQ2hhbmdlZChzdGF0ZSlcblx0XHRcdFx0c3RhdGUuYXNzaWduZWRfIS5zZXQoa2V5LCB0cnVlKVxuXHRcdFx0XHRzdGF0ZS5jb3B5XyEuc2V0KGtleSwgdmFsdWUpXG5cdFx0XHRcdHN0YXRlLmFzc2lnbmVkXyEuc2V0KGtleSwgdHJ1ZSlcblx0XHRcdH1cblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fVxuXG5cdFx0ZGVsZXRlKGtleTogYW55KTogYm9vbGVhbiB7XG5cdFx0XHRpZiAoIXRoaXMuaGFzKGtleSkpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlXG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IHN0YXRlOiBNYXBTdGF0ZSA9IHRoaXNbRFJBRlRfU1RBVEVdXG5cdFx0XHRhc3NlcnRVbnJldm9rZWQoc3RhdGUpXG5cdFx0XHRwcmVwYXJlTWFwQ29weShzdGF0ZSlcblx0XHRcdG1hcmtDaGFuZ2VkKHN0YXRlKVxuXHRcdFx0aWYgKHN0YXRlLmJhc2VfLmhhcyhrZXkpKSB7XG5cdFx0XHRcdHN0YXRlLmFzc2lnbmVkXyEuc2V0KGtleSwgZmFsc2UpXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRzdGF0ZS5hc3NpZ25lZF8hLmRlbGV0ZShrZXkpXG5cdFx0XHR9XG5cdFx0XHRzdGF0ZS5jb3B5XyEuZGVsZXRlKGtleSlcblx0XHRcdHJldHVybiB0cnVlXG5cdFx0fVxuXG5cdFx0Y2xlYXIoKSB7XG5cdFx0XHRjb25zdCBzdGF0ZTogTWFwU3RhdGUgPSB0aGlzW0RSQUZUX1NUQVRFXVxuXHRcdFx0YXNzZXJ0VW5yZXZva2VkKHN0YXRlKVxuXHRcdFx0aWYgKGxhdGVzdChzdGF0ZSkuc2l6ZSkge1xuXHRcdFx0XHRwcmVwYXJlTWFwQ29weShzdGF0ZSlcblx0XHRcdFx0bWFya0NoYW5nZWQoc3RhdGUpXG5cdFx0XHRcdHN0YXRlLmFzc2lnbmVkXyA9IG5ldyBNYXAoKVxuXHRcdFx0XHRlYWNoKHN0YXRlLmJhc2VfLCBrZXkgPT4ge1xuXHRcdFx0XHRcdHN0YXRlLmFzc2lnbmVkXyEuc2V0KGtleSwgZmFsc2UpXG5cdFx0XHRcdH0pXG5cdFx0XHRcdHN0YXRlLmNvcHlfIS5jbGVhcigpXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Zm9yRWFjaChjYjogKHZhbHVlOiBhbnksIGtleTogYW55LCBzZWxmOiBhbnkpID0+IHZvaWQsIHRoaXNBcmc/OiBhbnkpIHtcblx0XHRcdGNvbnN0IHN0YXRlOiBNYXBTdGF0ZSA9IHRoaXNbRFJBRlRfU1RBVEVdXG5cdFx0XHRsYXRlc3Qoc3RhdGUpLmZvckVhY2goKF92YWx1ZTogYW55LCBrZXk6IGFueSwgX21hcDogYW55KSA9PiB7XG5cdFx0XHRcdGNiLmNhbGwodGhpc0FyZywgdGhpcy5nZXQoa2V5KSwga2V5LCB0aGlzKVxuXHRcdFx0fSlcblx0XHR9XG5cblx0XHRnZXQoa2V5OiBhbnkpOiBhbnkge1xuXHRcdFx0Y29uc3Qgc3RhdGU6IE1hcFN0YXRlID0gdGhpc1tEUkFGVF9TVEFURV1cblx0XHRcdGFzc2VydFVucmV2b2tlZChzdGF0ZSlcblx0XHRcdGNvbnN0IHZhbHVlID0gbGF0ZXN0KHN0YXRlKS5nZXQoa2V5KVxuXHRcdFx0aWYgKHN0YXRlLmZpbmFsaXplZF8gfHwgIWlzRHJhZnRhYmxlKHZhbHVlKSkge1xuXHRcdFx0XHRyZXR1cm4gdmFsdWVcblx0XHRcdH1cblx0XHRcdGlmICh2YWx1ZSAhPT0gc3RhdGUuYmFzZV8uZ2V0KGtleSkpIHtcblx0XHRcdFx0cmV0dXJuIHZhbHVlIC8vIGVpdGhlciBhbHJlYWR5IGRyYWZ0ZWQgb3IgcmVhc3NpZ25lZFxuXHRcdFx0fVxuXHRcdFx0Ly8gZGVzcGl0ZSB3aGF0IGl0IGxvb2tzLCB0aGlzIGNyZWF0ZXMgYSBkcmFmdCBvbmx5IG9uY2UsIHNlZSBhYm92ZSBjb25kaXRpb25cblx0XHRcdGNvbnN0IGRyYWZ0ID0gY3JlYXRlUHJveHkodmFsdWUsIHN0YXRlKVxuXHRcdFx0cHJlcGFyZU1hcENvcHkoc3RhdGUpXG5cdFx0XHRzdGF0ZS5jb3B5XyEuc2V0KGtleSwgZHJhZnQpXG5cdFx0XHRyZXR1cm4gZHJhZnRcblx0XHR9XG5cblx0XHRrZXlzKCk6IEl0ZXJhYmxlSXRlcmF0b3I8YW55PiB7XG5cdFx0XHRyZXR1cm4gbGF0ZXN0KHRoaXNbRFJBRlRfU1RBVEVdKS5rZXlzKClcblx0XHR9XG5cblx0XHR2YWx1ZXMoKTogSXRlcmFibGVJdGVyYXRvcjxhbnk+IHtcblx0XHRcdGNvbnN0IGl0ZXJhdG9yID0gdGhpcy5rZXlzKClcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFtTeW1ib2wuaXRlcmF0b3JdOiAoKSA9PiB0aGlzLnZhbHVlcygpLFxuXHRcdFx0XHRuZXh0OiAoKSA9PiB7XG5cdFx0XHRcdFx0Y29uc3QgciA9IGl0ZXJhdG9yLm5leHQoKVxuXHRcdFx0XHRcdC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5cdFx0XHRcdFx0aWYgKHIuZG9uZSkgcmV0dXJuIHJcblx0XHRcdFx0XHRjb25zdCB2YWx1ZSA9IHRoaXMuZ2V0KHIudmFsdWUpXG5cdFx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRcdGRvbmU6IGZhbHNlLFxuXHRcdFx0XHRcdFx0dmFsdWVcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0gYXMgYW55XG5cdFx0fVxuXG5cdFx0ZW50cmllcygpOiBJdGVyYWJsZUl0ZXJhdG9yPFthbnksIGFueV0+IHtcblx0XHRcdGNvbnN0IGl0ZXJhdG9yID0gdGhpcy5rZXlzKClcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFtTeW1ib2wuaXRlcmF0b3JdOiAoKSA9PiB0aGlzLmVudHJpZXMoKSxcblx0XHRcdFx0bmV4dDogKCkgPT4ge1xuXHRcdFx0XHRcdGNvbnN0IHIgPSBpdGVyYXRvci5uZXh0KClcblx0XHRcdFx0XHQvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuXHRcdFx0XHRcdGlmIChyLmRvbmUpIHJldHVybiByXG5cdFx0XHRcdFx0Y29uc3QgdmFsdWUgPSB0aGlzLmdldChyLnZhbHVlKVxuXHRcdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0XHRkb25lOiBmYWxzZSxcblx0XHRcdFx0XHRcdHZhbHVlOiBbci52YWx1ZSwgdmFsdWVdXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9IGFzIGFueVxuXHRcdH1cblxuXHRcdFtTeW1ib2wuaXRlcmF0b3JdKCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZW50cmllcygpXG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gcHJveHlNYXBfPFQgZXh0ZW5kcyBBbnlNYXA+KHRhcmdldDogVCwgcGFyZW50PzogSW1tZXJTdGF0ZSk6IFQge1xuXHRcdC8vIEB0cy1pZ25vcmVcblx0XHRyZXR1cm4gbmV3IERyYWZ0TWFwKHRhcmdldCwgcGFyZW50KVxuXHR9XG5cblx0ZnVuY3Rpb24gcHJlcGFyZU1hcENvcHkoc3RhdGU6IE1hcFN0YXRlKSB7XG5cdFx0aWYgKCFzdGF0ZS5jb3B5Xykge1xuXHRcdFx0c3RhdGUuYXNzaWduZWRfID0gbmV3IE1hcCgpXG5cdFx0XHRzdGF0ZS5jb3B5XyA9IG5ldyBNYXAoc3RhdGUuYmFzZV8pXG5cdFx0fVxuXHR9XG5cblx0Y2xhc3MgRHJhZnRTZXQgZXh0ZW5kcyBTZXQge1xuXHRcdFtEUkFGVF9TVEFURV06IFNldFN0YXRlXG5cdFx0Y29uc3RydWN0b3IodGFyZ2V0OiBBbnlTZXQsIHBhcmVudD86IEltbWVyU3RhdGUpIHtcblx0XHRcdHN1cGVyKClcblx0XHRcdHRoaXNbRFJBRlRfU1RBVEVdID0ge1xuXHRcdFx0XHR0eXBlXzogQXJjaFR5cGUuU2V0LFxuXHRcdFx0XHRwYXJlbnRfOiBwYXJlbnQsXG5cdFx0XHRcdHNjb3BlXzogcGFyZW50ID8gcGFyZW50LnNjb3BlXyA6IGdldEN1cnJlbnRTY29wZSgpISxcblx0XHRcdFx0bW9kaWZpZWRfOiBmYWxzZSxcblx0XHRcdFx0ZmluYWxpemVkXzogZmFsc2UsXG5cdFx0XHRcdGNvcHlfOiB1bmRlZmluZWQsXG5cdFx0XHRcdGJhc2VfOiB0YXJnZXQsXG5cdFx0XHRcdGRyYWZ0XzogdGhpcyxcblx0XHRcdFx0ZHJhZnRzXzogbmV3IE1hcCgpLFxuXHRcdFx0XHRyZXZva2VkXzogZmFsc2UsXG5cdFx0XHRcdGlzTWFudWFsXzogZmFsc2Vcblx0XHRcdH1cblx0XHR9XG5cblx0XHRnZXQgc2l6ZSgpOiBudW1iZXIge1xuXHRcdFx0cmV0dXJuIGxhdGVzdCh0aGlzW0RSQUZUX1NUQVRFXSkuc2l6ZVxuXHRcdH1cblxuXHRcdGhhcyh2YWx1ZTogYW55KTogYm9vbGVhbiB7XG5cdFx0XHRjb25zdCBzdGF0ZTogU2V0U3RhdGUgPSB0aGlzW0RSQUZUX1NUQVRFXVxuXHRcdFx0YXNzZXJ0VW5yZXZva2VkKHN0YXRlKVxuXHRcdFx0Ly8gYml0IG9mIHRyaWNrZXJ5IGhlcmUsIHRvIGJlIGFibGUgdG8gcmVjb2duaXplIGJvdGggdGhlIHZhbHVlLCBhbmQgdGhlIGRyYWZ0IG9mIGl0cyB2YWx1ZVxuXHRcdFx0aWYgKCFzdGF0ZS5jb3B5Xykge1xuXHRcdFx0XHRyZXR1cm4gc3RhdGUuYmFzZV8uaGFzKHZhbHVlKVxuXHRcdFx0fVxuXHRcdFx0aWYgKHN0YXRlLmNvcHlfLmhhcyh2YWx1ZSkpIHJldHVybiB0cnVlXG5cdFx0XHRpZiAoc3RhdGUuZHJhZnRzXy5oYXModmFsdWUpICYmIHN0YXRlLmNvcHlfLmhhcyhzdGF0ZS5kcmFmdHNfLmdldCh2YWx1ZSkpKVxuXHRcdFx0XHRyZXR1cm4gdHJ1ZVxuXHRcdFx0cmV0dXJuIGZhbHNlXG5cdFx0fVxuXG5cdFx0YWRkKHZhbHVlOiBhbnkpOiBhbnkge1xuXHRcdFx0Y29uc3Qgc3RhdGU6IFNldFN0YXRlID0gdGhpc1tEUkFGVF9TVEFURV1cblx0XHRcdGFzc2VydFVucmV2b2tlZChzdGF0ZSlcblx0XHRcdGlmICghdGhpcy5oYXModmFsdWUpKSB7XG5cdFx0XHRcdHByZXBhcmVTZXRDb3B5KHN0YXRlKVxuXHRcdFx0XHRtYXJrQ2hhbmdlZChzdGF0ZSlcblx0XHRcdFx0c3RhdGUuY29weV8hLmFkZCh2YWx1ZSlcblx0XHRcdH1cblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fVxuXG5cdFx0ZGVsZXRlKHZhbHVlOiBhbnkpOiBhbnkge1xuXHRcdFx0aWYgKCF0aGlzLmhhcyh2YWx1ZSkpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlXG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IHN0YXRlOiBTZXRTdGF0ZSA9IHRoaXNbRFJBRlRfU1RBVEVdXG5cdFx0XHRhc3NlcnRVbnJldm9rZWQoc3RhdGUpXG5cdFx0XHRwcmVwYXJlU2V0Q29weShzdGF0ZSlcblx0XHRcdG1hcmtDaGFuZ2VkKHN0YXRlKVxuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0c3RhdGUuY29weV8hLmRlbGV0ZSh2YWx1ZSkgfHxcblx0XHRcdFx0KHN0YXRlLmRyYWZ0c18uaGFzKHZhbHVlKVxuXHRcdFx0XHRcdD8gc3RhdGUuY29weV8hLmRlbGV0ZShzdGF0ZS5kcmFmdHNfLmdldCh2YWx1ZSkpXG5cdFx0XHRcdFx0OiAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqLyBmYWxzZSlcblx0XHRcdClcblx0XHR9XG5cblx0XHRjbGVhcigpIHtcblx0XHRcdGNvbnN0IHN0YXRlOiBTZXRTdGF0ZSA9IHRoaXNbRFJBRlRfU1RBVEVdXG5cdFx0XHRhc3NlcnRVbnJldm9rZWQoc3RhdGUpXG5cdFx0XHRpZiAobGF0ZXN0KHN0YXRlKS5zaXplKSB7XG5cdFx0XHRcdHByZXBhcmVTZXRDb3B5KHN0YXRlKVxuXHRcdFx0XHRtYXJrQ2hhbmdlZChzdGF0ZSlcblx0XHRcdFx0c3RhdGUuY29weV8hLmNsZWFyKClcblx0XHRcdH1cblx0XHR9XG5cblx0XHR2YWx1ZXMoKTogSXRlcmFibGVJdGVyYXRvcjxhbnk+IHtcblx0XHRcdGNvbnN0IHN0YXRlOiBTZXRTdGF0ZSA9IHRoaXNbRFJBRlRfU1RBVEVdXG5cdFx0XHRhc3NlcnRVbnJldm9rZWQoc3RhdGUpXG5cdFx0XHRwcmVwYXJlU2V0Q29weShzdGF0ZSlcblx0XHRcdHJldHVybiBzdGF0ZS5jb3B5XyEudmFsdWVzKClcblx0XHR9XG5cblx0XHRlbnRyaWVzKCk6IEl0ZXJhYmxlSXRlcmF0b3I8W2FueSwgYW55XT4ge1xuXHRcdFx0Y29uc3Qgc3RhdGU6IFNldFN0YXRlID0gdGhpc1tEUkFGVF9TVEFURV1cblx0XHRcdGFzc2VydFVucmV2b2tlZChzdGF0ZSlcblx0XHRcdHByZXBhcmVTZXRDb3B5KHN0YXRlKVxuXHRcdFx0cmV0dXJuIHN0YXRlLmNvcHlfIS5lbnRyaWVzKClcblx0XHR9XG5cblx0XHRrZXlzKCk6IEl0ZXJhYmxlSXRlcmF0b3I8YW55PiB7XG5cdFx0XHRyZXR1cm4gdGhpcy52YWx1ZXMoKVxuXHRcdH1cblxuXHRcdFtTeW1ib2wuaXRlcmF0b3JdKCkge1xuXHRcdFx0cmV0dXJuIHRoaXMudmFsdWVzKClcblx0XHR9XG5cblx0XHRmb3JFYWNoKGNiOiBhbnksIHRoaXNBcmc/OiBhbnkpIHtcblx0XHRcdGNvbnN0IGl0ZXJhdG9yID0gdGhpcy52YWx1ZXMoKVxuXHRcdFx0bGV0IHJlc3VsdCA9IGl0ZXJhdG9yLm5leHQoKVxuXHRcdFx0d2hpbGUgKCFyZXN1bHQuZG9uZSkge1xuXHRcdFx0XHRjYi5jYWxsKHRoaXNBcmcsIHJlc3VsdC52YWx1ZSwgcmVzdWx0LnZhbHVlLCB0aGlzKVxuXHRcdFx0XHRyZXN1bHQgPSBpdGVyYXRvci5uZXh0KClcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0ZnVuY3Rpb24gcHJveHlTZXRfPFQgZXh0ZW5kcyBBbnlTZXQ+KHRhcmdldDogVCwgcGFyZW50PzogSW1tZXJTdGF0ZSk6IFQge1xuXHRcdC8vIEB0cy1pZ25vcmVcblx0XHRyZXR1cm4gbmV3IERyYWZ0U2V0KHRhcmdldCwgcGFyZW50KVxuXHR9XG5cblx0ZnVuY3Rpb24gcHJlcGFyZVNldENvcHkoc3RhdGU6IFNldFN0YXRlKSB7XG5cdFx0aWYgKCFzdGF0ZS5jb3B5Xykge1xuXHRcdFx0Ly8gY3JlYXRlIGRyYWZ0cyBmb3IgYWxsIGVudHJpZXMgdG8gcHJlc2VydmUgaW5zZXJ0aW9uIG9yZGVyXG5cdFx0XHRzdGF0ZS5jb3B5XyA9IG5ldyBTZXQoKVxuXHRcdFx0c3RhdGUuYmFzZV8uZm9yRWFjaCh2YWx1ZSA9PiB7XG5cdFx0XHRcdGlmIChpc0RyYWZ0YWJsZSh2YWx1ZSkpIHtcblx0XHRcdFx0XHRjb25zdCBkcmFmdCA9IGNyZWF0ZVByb3h5KHZhbHVlLCBzdGF0ZSlcblx0XHRcdFx0XHRzdGF0ZS5kcmFmdHNfLnNldCh2YWx1ZSwgZHJhZnQpXG5cdFx0XHRcdFx0c3RhdGUuY29weV8hLmFkZChkcmFmdClcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRzdGF0ZS5jb3B5XyEuYWRkKHZhbHVlKVxuXHRcdFx0XHR9XG5cdFx0XHR9KVxuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIGFzc2VydFVucmV2b2tlZChzdGF0ZTogYW55IC8qRVM1U3RhdGUgfCBNYXBTdGF0ZSB8IFNldFN0YXRlKi8pIHtcblx0XHRpZiAoc3RhdGUucmV2b2tlZF8pIGRpZSgzLCBKU09OLnN0cmluZ2lmeShsYXRlc3Qoc3RhdGUpKSlcblx0fVxuXG5cdGxvYWRQbHVnaW4oXCJNYXBTZXRcIiwge3Byb3h5TWFwXywgcHJveHlTZXRffSlcbn1cbiIsICJpbXBvcnQge1xuXHRJUHJvZHVjZSxcblx0SVByb2R1Y2VXaXRoUGF0Y2hlcyxcblx0SW1tZXIsXG5cdERyYWZ0LFxuXHRJbW11dGFibGVcbn0gZnJvbSBcIi4vaW50ZXJuYWxcIlxuXG5leHBvcnQge1xuXHREcmFmdCxcblx0V3JpdGFibGVEcmFmdCxcblx0SW1tdXRhYmxlLFxuXHRQYXRjaCxcblx0UGF0Y2hMaXN0ZW5lcixcblx0UHJvZHVjZXIsXG5cdG9yaWdpbmFsLFxuXHRjdXJyZW50LFxuXHRpc0RyYWZ0LFxuXHRpc0RyYWZ0YWJsZSxcblx0Tk9USElORyBhcyBub3RoaW5nLFxuXHREUkFGVEFCTEUgYXMgaW1tZXJhYmxlLFxuXHRmcmVlemUsXG5cdE9iamVjdGlzaCxcblx0U3RyaWN0TW9kZVxufSBmcm9tIFwiLi9pbnRlcm5hbFwiXG5cbmNvbnN0IGltbWVyID0gbmV3IEltbWVyKClcblxuLyoqXG4gKiBUaGUgYHByb2R1Y2VgIGZ1bmN0aW9uIHRha2VzIGEgdmFsdWUgYW5kIGEgXCJyZWNpcGUgZnVuY3Rpb25cIiAod2hvc2VcbiAqIHJldHVybiB2YWx1ZSBvZnRlbiBkZXBlbmRzIG9uIHRoZSBiYXNlIHN0YXRlKS4gVGhlIHJlY2lwZSBmdW5jdGlvbiBpc1xuICogZnJlZSB0byBtdXRhdGUgaXRzIGZpcnN0IGFyZ3VtZW50IGhvd2V2ZXIgaXQgd2FudHMuIEFsbCBtdXRhdGlvbnMgYXJlXG4gKiBvbmx5IGV2ZXIgYXBwbGllZCB0byBhIF9fY29weV9fIG9mIHRoZSBiYXNlIHN0YXRlLlxuICpcbiAqIFBhc3Mgb25seSBhIGZ1bmN0aW9uIHRvIGNyZWF0ZSBhIFwiY3VycmllZCBwcm9kdWNlclwiIHdoaWNoIHJlbGlldmVzIHlvdVxuICogZnJvbSBwYXNzaW5nIHRoZSByZWNpcGUgZnVuY3Rpb24gZXZlcnkgdGltZS5cbiAqXG4gKiBPbmx5IHBsYWluIG9iamVjdHMgYW5kIGFycmF5cyBhcmUgbWFkZSBtdXRhYmxlLiBBbGwgb3RoZXIgb2JqZWN0cyBhcmVcbiAqIGNvbnNpZGVyZWQgdW5jb3B5YWJsZS5cbiAqXG4gKiBOb3RlOiBUaGlzIGZ1bmN0aW9uIGlzIF9fYm91bmRfXyB0byBpdHMgYEltbWVyYCBpbnN0YW5jZS5cbiAqXG4gKiBAcGFyYW0ge2FueX0gYmFzZSAtIHRoZSBpbml0aWFsIHN0YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcm9kdWNlciAtIGZ1bmN0aW9uIHRoYXQgcmVjZWl2ZXMgYSBwcm94eSBvZiB0aGUgYmFzZSBzdGF0ZSBhcyBmaXJzdCBhcmd1bWVudCBhbmQgd2hpY2ggY2FuIGJlIGZyZWVseSBtb2RpZmllZFxuICogQHBhcmFtIHtGdW5jdGlvbn0gcGF0Y2hMaXN0ZW5lciAtIG9wdGlvbmFsIGZ1bmN0aW9uIHRoYXQgd2lsbCBiZSBjYWxsZWQgd2l0aCBhbGwgdGhlIHBhdGNoZXMgcHJvZHVjZWQgaGVyZVxuICogQHJldHVybnMge2FueX0gYSBuZXcgc3RhdGUsIG9yIHRoZSBpbml0aWFsIHN0YXRlIGlmIG5vdGhpbmcgd2FzIG1vZGlmaWVkXG4gKi9cbmV4cG9ydCBjb25zdCBwcm9kdWNlOiBJUHJvZHVjZSA9IGltbWVyLnByb2R1Y2VcblxuLyoqXG4gKiBMaWtlIGBwcm9kdWNlYCwgYnV0IGBwcm9kdWNlV2l0aFBhdGNoZXNgIGFsd2F5cyByZXR1cm5zIGEgdHVwbGVcbiAqIFtuZXh0U3RhdGUsIHBhdGNoZXMsIGludmVyc2VQYXRjaGVzXSAoaW5zdGVhZCBvZiBqdXN0IHRoZSBuZXh0IHN0YXRlKVxuICovXG5leHBvcnQgY29uc3QgcHJvZHVjZVdpdGhQYXRjaGVzOiBJUHJvZHVjZVdpdGhQYXRjaGVzID0gaW1tZXIucHJvZHVjZVdpdGhQYXRjaGVzLmJpbmQoXG5cdGltbWVyXG4pXG5cbi8qKlxuICogUGFzcyB0cnVlIHRvIGF1dG9tYXRpY2FsbHkgZnJlZXplIGFsbCBjb3BpZXMgY3JlYXRlZCBieSBJbW1lci5cbiAqXG4gKiBBbHdheXMgZnJlZXplIGJ5IGRlZmF1bHQsIGV2ZW4gaW4gcHJvZHVjdGlvbiBtb2RlXG4gKi9cbmV4cG9ydCBjb25zdCBzZXRBdXRvRnJlZXplID0gaW1tZXIuc2V0QXV0b0ZyZWV6ZS5iaW5kKGltbWVyKVxuXG4vKipcbiAqIFBhc3MgdHJ1ZSB0byBlbmFibGUgc3RyaWN0IHNoYWxsb3cgY29weS5cbiAqXG4gKiBCeSBkZWZhdWx0LCBpbW1lciBkb2VzIG5vdCBjb3B5IHRoZSBvYmplY3QgZGVzY3JpcHRvcnMgc3VjaCBhcyBnZXR0ZXIsIHNldHRlciBhbmQgbm9uLWVudW1yYWJsZSBwcm9wZXJ0aWVzLlxuICovXG5leHBvcnQgY29uc3Qgc2V0VXNlU3RyaWN0U2hhbGxvd0NvcHkgPSBpbW1lci5zZXRVc2VTdHJpY3RTaGFsbG93Q29weS5iaW5kKGltbWVyKVxuXG4vKipcbiAqIEFwcGx5IGFuIGFycmF5IG9mIEltbWVyIHBhdGNoZXMgdG8gdGhlIGZpcnN0IGFyZ3VtZW50LlxuICpcbiAqIFRoaXMgZnVuY3Rpb24gaXMgYSBwcm9kdWNlciwgd2hpY2ggbWVhbnMgY29weS1vbi13cml0ZSBpcyBpbiBlZmZlY3QuXG4gKi9cbmV4cG9ydCBjb25zdCBhcHBseVBhdGNoZXMgPSBpbW1lci5hcHBseVBhdGNoZXMuYmluZChpbW1lcilcblxuLyoqXG4gKiBDcmVhdGUgYW4gSW1tZXIgZHJhZnQgZnJvbSB0aGUgZ2l2ZW4gYmFzZSBzdGF0ZSwgd2hpY2ggbWF5IGJlIGEgZHJhZnQgaXRzZWxmLlxuICogVGhlIGRyYWZ0IGNhbiBiZSBtb2RpZmllZCB1bnRpbCB5b3UgZmluYWxpemUgaXQgd2l0aCB0aGUgYGZpbmlzaERyYWZ0YCBmdW5jdGlvbi5cbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZURyYWZ0ID0gaW1tZXIuY3JlYXRlRHJhZnQuYmluZChpbW1lcilcblxuLyoqXG4gKiBGaW5hbGl6ZSBhbiBJbW1lciBkcmFmdCBmcm9tIGEgYGNyZWF0ZURyYWZ0YCBjYWxsLCByZXR1cm5pbmcgdGhlIGJhc2Ugc3RhdGVcbiAqIChpZiBubyBjaGFuZ2VzIHdlcmUgbWFkZSkgb3IgYSBtb2RpZmllZCBjb3B5LiBUaGUgZHJhZnQgbXVzdCAqbm90KiBiZVxuICogbXV0YXRlZCBhZnRlcndhcmRzLlxuICpcbiAqIFBhc3MgYSBmdW5jdGlvbiBhcyB0aGUgMm5kIGFyZ3VtZW50IHRvIGdlbmVyYXRlIEltbWVyIHBhdGNoZXMgYmFzZWQgb24gdGhlXG4gKiBjaGFuZ2VzIHRoYXQgd2VyZSBtYWRlLlxuICovXG5leHBvcnQgY29uc3QgZmluaXNoRHJhZnQgPSBpbW1lci5maW5pc2hEcmFmdC5iaW5kKGltbWVyKVxuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gaXMgYWN0dWFsbHkgYSBuby1vcCwgYnV0IGNhbiBiZSB1c2VkIHRvIGNhc3QgYW4gaW1tdXRhYmxlIHR5cGVcbiAqIHRvIGFuIGRyYWZ0IHR5cGUgYW5kIG1ha2UgVHlwZVNjcmlwdCBoYXBweVxuICpcbiAqIEBwYXJhbSB2YWx1ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gY2FzdERyYWZ0PFQ+KHZhbHVlOiBUKTogRHJhZnQ8VD4ge1xuXHRyZXR1cm4gdmFsdWUgYXMgYW55XG59XG5cbi8qKlxuICogVGhpcyBmdW5jdGlvbiBpcyBhY3R1YWxseSBhIG5vLW9wLCBidXQgY2FuIGJlIHVzZWQgdG8gY2FzdCBhIG11dGFibGUgdHlwZVxuICogdG8gYW4gaW1tdXRhYmxlIHR5cGUgYW5kIG1ha2UgVHlwZVNjcmlwdCBoYXBweVxuICogQHBhcmFtIHZhbHVlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYXN0SW1tdXRhYmxlPFQ+KHZhbHVlOiBUKTogSW1tdXRhYmxlPFQ+IHtcblx0cmV0dXJuIHZhbHVlIGFzIGFueVxufVxuXG5leHBvcnQge0ltbWVyfVxuXG5leHBvcnQge2VuYWJsZVBhdGNoZXN9IGZyb20gXCIuL3BsdWdpbnMvcGF0Y2hlc1wiXG5leHBvcnQge2VuYWJsZU1hcFNldH0gZnJvbSBcIi4vcGx1Z2lucy9tYXBzZXRcIlxuIiwgImV4cG9ydCBmdW5jdGlvbiB3YWl0Rm9yRWxlbWVudChzZWxlY3Rvcikge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICBsZXQgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcblxuICAgIGlmIChlbCkge1xuICAgICAgcmV0dXJuIHJlc29sdmUoZWwpO1xuICAgIH1cblxuICAgIGxldCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcbiAgICAgIGxldCBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuXG4gICAgICBpZiAoZWwpIHtcbiAgICAgICAgb2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgICByZXNvbHZlKGVsKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIG9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQuYm9keSwge1xuICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgc3VidHJlZTogdHJ1ZSxcbiAgICB9KTtcbiAgfSk7XG59XG4iLCAiZXhwb3J0IGZ1bmN0aW9uIGNsYXNzTmFtZSguLi5jbGFzc2VzKSB7XG4gIHJldHVybiBjbGFzc2VzXG4gICAgLm1hcCgoYykgPT4ge1xuICAgICAgaWYgKHR5cGVvZiBjID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gYztcbiAgICAgIH1cblxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoYykpIHtcbiAgICAgICAgcmV0dXJuIGNsYXNzTmFtZSguLi5jKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBjID09PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmVudHJpZXMoYylcbiAgICAgICAgICAuZmlsdGVyKChbLCB2YWx1ZV0pID0+IHZhbHVlKVxuICAgICAgICAgIC5tYXAoKFtrZXldKSA9PiBrZXkpXG4gICAgICAgICAgLmpvaW4oJyAnKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuICcnO1xuICAgIH0pXG4gICAgLmpvaW4oJyAnKTtcbn1cbiIsICI8c2NyaXB0PlxuICBpbXBvcnQgeyBvbk1vdW50IH0gZnJvbSAnc3ZlbHRlJztcblxuICBsZXQgZWw7XG5cbiAgb25Nb3VudCgoKSA9PiB7XG4gICAgZWwuc3R5bGUuaGVpZ2h0ID0gZWwuc2Nyb2xsSGVpZ2h0ICsgJ3B4JztcbiAgICBlbC5zdHlsZS5vdmVyZmxvd1kgPSAnaGlkZGVuJztcblxuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKCkgPT4ge1xuICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gJ2F1dG8nO1xuICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gZWwuc2Nyb2xsSGVpZ2h0ICsgJ3B4JztcbiAgICB9KTtcbiAgfSk7XG48L3NjcmlwdD5cblxuPHRleHRhcmVhIGJpbmQ6dGhpcz17ZWx9IG9uOmNoYW5nZSBvbjprZXlwcmVzcyB7Li4uJCRyZXN0UHJvcHN9IC8+XG4iLCAiPHNjcmlwdD5cbiAgaW1wb3J0IHsgb25EZXN0cm95LCBvbk1vdW50IH0gZnJvbSAnc3ZlbHRlJztcbiAgaW1wb3J0IHsgc2NhbGUgfSBmcm9tICdzdmVsdGUvdHJhbnNpdGlvbic7XG5cbiAgaW1wb3J0IHsgY2xhc3NOYW1lIH0gZnJvbSAnLi4vLi4vanMvdXRpbHMvc3R5bGUnO1xuXG4gIGV4cG9ydCBsZXQgaXNPcGVuID0gZmFsc2U7XG4gIGV4cG9ydCBsZXQgc2l6ZSA9ICdtZCc7XG5cbiAgbGV0IGxpc3RlbmVyO1xuICBsZXQgcG9wb3ZlcjtcbiAgbGV0IHRyaWdnZXI7XG4gIGxldCBjb250ZW50O1xuXG4gIC8vIFRPRE86IFVzZSBKUyB0byBjYWxjdWxhdGUgcG9zaXRpb25pbmdcbiAgb25Nb3VudCgoKSA9PiB7XG4gICAgbGlzdGVuZXIgPSAoZSkgPT4ge1xuICAgICAgaWYgKHBvcG92ZXIgJiYgIXBvcG92ZXIuY29udGFpbnMoZS50YXJnZXQpKSB7XG4gICAgICAgIGlzT3BlbiA9IGZhbHNlO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGxpc3RlbmVyKTtcbiAgfSk7XG5cbiAgb25EZXN0cm95KCgpID0+IHtcbiAgICBpZiAobGlzdGVuZXIpIHtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgbGlzdGVuZXIpO1xuICAgIH1cbiAgfSk7XG48L3NjcmlwdD5cblxuPGRpdiBjbGFzcz1cInJlbGF0aXZlXCIgYmluZDp0aGlzPXtwb3BvdmVyfT5cbiAgPHNsb3QgbmFtZT1cInRyaWdnZXJcIj48L3Nsb3Q+XG5cbiAgeyNpZiBpc09wZW59XG4gICAgPGRpdlxuICAgICAgYmluZDp0aGlzPXtjb250ZW50fVxuICAgICAgY2xhc3M9e2NsYXNzTmFtZSgnbWVudSBhYnNvbHV0ZSB6LXBvcG92ZXInLCBzaXplKX1cbiAgICAgIHRyYW5zaXRpb246c2NhbGU9e3tcbiAgICAgICAgZHVyYXRpb246IDEwMCxcbiAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgc3RhcnQ6IDAuOSxcbiAgICAgIH19XG4gICAgPlxuICAgICAgPHNsb3QgbmFtZT1cImNvbnRlbnRcIj48L3Nsb3Q+XG4gICAgPC9kaXY+XG4gIHsvaWZ9XG48L2Rpdj5cbiIsICI8c2NyaXB0PlxuICBpbXBvcnQgeyBjcmVhdGVNdXRhdGlvbiwgY3JlYXRlUXVlcnkgfSBmcm9tICdAdGFuc3RhY2svc3ZlbHRlLXF1ZXJ5JztcbiAgaW1wb3J0IHsgb25EZXN0cm95LCBvbk1vdW50IH0gZnJvbSAnc3ZlbHRlJztcbiAgaW1wb3J0IHsgZGVyaXZlZCwgd3JpdGFibGUgfSBmcm9tICdzdmVsdGUvc3RvcmUnO1xuXG4gIGltcG9ydCB7IGNsYXNzTmFtZSB9IGZyb20gJy4uLy4uL2pzL3V0aWxzL3N0eWxlJztcbiAgaW1wb3J0IFBvcG92ZXIgZnJvbSAnLi4vY29tcG9uZW50cy9Qb3BvdmVyLnN2ZWx0ZSc7XG5cbiAgZXhwb3J0IGxldCBpc09wZW4gPSBmYWxzZTtcbiAgZXhwb3J0IGxldCBvbkFkZExhYmVsO1xuXG4gIGxldCB0YWcgPSAnJztcbiAgbGV0IHNlYXJjaCA9ICcnO1xuICBsZXQgdGltZW91dDtcbiAgbGV0IHNlbGVjdGVkID0gLTE7XG4gIGxldCBsaXN0ZW5lcjtcblxuICBsZXQgbXV0YXRpb24gPSBjcmVhdGVNdXRhdGlvbih7XG4gICAgbXV0YXRpb25GbjogYXN5bmMgKHRhZykgPT4ge1xuICAgICAgbGV0IHJlcyA9IGF3YWl0IGZldGNoKCcvYXBpL2xhYmVscycsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgdGFnIH0pLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuXG4gICAgICBsZXQgZGF0YSA9IGF3YWl0IHJlcy5qc29uKCk7XG5cbiAgICAgIGlmICghcmVzLm9rKSB7XG4gICAgICAgIC8vIFRPRE86IEFkZCBzb21ldGhpbmcgdG8gcGFyc2UgdGhlIGVycm9yIG1lc3NhZ2VzIGF1dG9tYXRpY2FsbHlcbiAgICAgICAgLy8gVE9ETzogSGFuZGxlIGxhYmVsIGFscmVhZHkgZXhpc3RzIGJ5IGFkZGluZyBpdFxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZGF0YS5lcnJvcnMudGFnLmpvaW4oJywgJykpO1xuICAgICAgfVxuXG4gICAgICBzZWxlY3RMYWJlbChkYXRhKTtcbiAgICB9LFxuICB9KTtcblxuICAkOiB7XG4gICAgaWYgKHRpbWVvdXQgJiYgc2VhcmNoICE9PSB0YWcpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICB9XG5cbiAgICB0aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBzZWFyY2ggPSB0YWc7XG4gICAgfSwgMzAwKTtcbiAgfVxuXG4gICQ6IHF1ZXJ5ID0gY3JlYXRlUXVlcnkoe1xuICAgIHF1ZXJ5S2V5OiBbJ2xhYmVscycsIHsgc2VhcmNoIH1dLFxuICAgIHF1ZXJ5Rm46IGFzeW5jICgpID0+IHtcbiAgICAgIGxldCByZXMgPSBhd2FpdCBmZXRjaChgL2FwaS9sYWJlbHM/c2VhcmNoPSR7c2VhcmNofSZsaW1pdD01YCk7XG4gICAgICBsZXQgZGF0YSA9IGF3YWl0IHJlcy5qc29uKCk7XG5cbiAgICAgIHNlbGVjdGVkID0gLTE7XG5cbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH0sXG4gICAgaW5pdGlhbERhdGE6IFtdLFxuICAgIGVuYWJsZWQ6IHNlYXJjaC5sZW5ndGggPiAwLFxuICB9KTtcblxuICBmdW5jdGlvbiBzZWxlY3RMYWJlbChsYWJlbCkge1xuICAgIG9uQWRkTGFiZWwobGFiZWwpO1xuXG4gICAgdGFnID0gc2VhcmNoID0gJyc7XG4gICAgaXNPcGVuID0gZmFsc2U7XG4gICAgc2VsZWN0ZWQgPSAtMTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNsYW1wT3ZlcmZsb3cobiwgdG90YWwpIHtcbiAgICBpZiAobiA8IDApIHtcbiAgICAgIHJldHVybiB0b3RhbCAtIDE7XG4gICAgfVxuXG4gICAgaWYgKG4gPj0gdG90YWwpIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIHJldHVybiBuO1xuICB9XG5cbiAgLy8gVE9ETzogQWRqdXN0IGFjY2Vzc2liaWxpdHkgdG8gaGFuZGxlIGFjdGl2ZSBzZWxlY3Rpb25zXG4gIGZ1bmN0aW9uIGlucHV0S2V5UHJlc3MoZSkge1xuICAgIGlmIChlLmtleSA9PT0gJ0VudGVyJykge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICBsZXQgbGFiZWw7XG5cbiAgICAgIGlmIChzZWxlY3RlZCAhPT0gLTEpIHtcbiAgICAgICAgbGV0IGxhYmVsID0gJHF1ZXJ5LmRhdGFbc2VsZWN0ZWRdO1xuICAgICAgfVxuXG4gICAgICBpZiAodGFnLmxlbmd0aCA+IDAgJiYgKCEkcXVlcnkuZGF0YS5sZW5ndGggfHwgc2VsZWN0ZWQgPT09IC0xKSkge1xuICAgICAgICAvLyBGaW5kIGFuIGV4aXN0aW5nIGxhYmVsIGlmIGl0IGlzIGluIHRoZSBsaXN0ZW5lclxuICAgICAgICBsZXQgZXhpc3RpbmcgPSAkcXVlcnkuZGF0YS5maW5kKChsYWJlbCkgPT4gbGFiZWwudGFnID09PSB0YWcpO1xuXG4gICAgICAgIGlmIChleGlzdGluZykge1xuICAgICAgICAgIHNlbGVjdExhYmVsKGV4aXN0aW5nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkbXV0YXRpb24ubXV0YXRlKHRhZyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChzZWxlY3RlZCAhPT0gLTEpIHtcbiAgICAgICAgbGV0IGxhYmVsID0gJHF1ZXJ5LmRhdGFbc2VsZWN0ZWRdO1xuXG4gICAgICAgIGlmIChsYWJlbCkge1xuICAgICAgICAgIHNlbGVjdExhYmVsKGxhYmVsKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9uTW91bnQoKCkgPT4ge1xuICAgIGxpc3RlbmVyID0gKGUpID0+IHtcbiAgICAgIGlmIChlLmtleSA9PT0gJ0Fycm93RG93bicpIHtcbiAgICAgICAgc2VsZWN0ZWQgPSBjbGFtcE92ZXJmbG93KHNlbGVjdGVkICsgMSwgJHF1ZXJ5LmRhdGEubGVuZ3RoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGUua2V5ID09PSAnQXJyb3dVcCcpIHtcbiAgICAgICAgc2VsZWN0ZWQgPSBjbGFtcE92ZXJmbG93KHNlbGVjdGVkIC0gMSwgJHF1ZXJ5LmRhdGEubGVuZ3RoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGxpc3RlbmVyKTtcbiAgfSk7XG5cbiAgb25EZXN0cm95KCgpID0+IHtcbiAgICBpZiAobGlzdGVuZXIpIHtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBsaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgaWYgKHRpbWVvdXQpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICB9XG4gIH0pO1xuPC9zY3JpcHQ+XG5cbjxQb3BvdmVyIHtpc09wZW59IHNpemU9XCJsZ1wiPlxuICA8YnV0dG9uXG4gICAgYXJpYS1sYWJlbD1cIkFkZCBwb3NpdGlvbnMgb3IgbGFiZWxzIHRvIHRlY2huaXF1ZVwiXG4gICAgY2xhc3M9XCJ0ZXh0LXppbmMtNTAwIGhvdmVyOnRleHQtemluYy03MDAgZGFyazpob3Zlcjp0ZXh0LXppbmMtMzAwIHRyYW5zaXRpb24tY29sb3JzXCJcbiAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICBvbjpjbGljaz17KCkgPT4gKGlzT3BlbiA9ICFpc09wZW4pfVxuICAgIHNsb3Q9XCJ0cmlnZ2VyXCJcbiAgPlxuICAgIDxzcGFuIGNsYXNzPVwiaGVyby10YWdcIiAvPlxuICA8L2J1dHRvbj5cblxuICA8ZGl2IHNsb3Q9XCJjb250ZW50XCIgY2xhc3M9XCJmbGV4IGZsZXgtY29sIGdhcC15LTJcIj5cbiAgICA8ZGl2IGNsYXNzPVwiZmxleCBmbGV4LXJvdyBnYXAteC0yIGl0ZW1zLWNlbnRlclwiPlxuICAgICAgPGlucHV0XG4gICAgICAgIGJpbmQ6dmFsdWU9e3RhZ31cbiAgICAgICAgY2xhc3M9e2NsYXNzTmFtZShcbiAgICAgICAgICAnZm9jdXM6cmluZy0wIGJvcmRlciBib3JkZXItc29saWQgYm9yZGVyLWluZGlnby03MDAgcm91bmRlZC1tZCcsXG4gICAgICAgICAgJ2JnLW5vbmUgYmctdHJhbnNwYXJlbnQgb3V0bGluZS1ub25lIHAtMiB3LWZ1bGwnXG4gICAgICAgICl9XG4gICAgICAgIGlkPVwidGVjaG5pcXVlLWxhYmVsLWlucHV0XCJcbiAgICAgICAgb246a2V5cHJlc3M9e2lucHV0S2V5UHJlc3N9XG4gICAgICAgIHBsYWNlaG9sZGVyPVwiZ3VhcmQvaGFsZlwiXG4gICAgICAvPlxuXG4gICAgICA8YnV0dG9uXG4gICAgICAgIGFyaWEtbGFiZWw9XCJBZGQgcG9zaXRpb25cIlxuICAgICAgICBjbGFzcz1cImJ1dHRvbiBzbVwiXG4gICAgICAgIG9uOmNsaWNrPXsoKSA9PiAkbXV0YXRpb24ubXV0YXRlKHRhZyl9XG4gICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgPlxuICAgICAgICBBZGRcbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuXG4gICAgeyNpZiAkcXVlcnkuZGF0YS5sZW5ndGggPiAwfVxuICAgICAgPHVsIGNsYXNzPVwiZmxleCBmbGV4LWNvbCBnYXAteS0yXCI+XG4gICAgICAgIHsjZWFjaCAkcXVlcnkuZGF0YSBhcyBsYWJlbCwgaW5kZXggKGxhYmVsLmlkKX1cbiAgICAgICAgICA8bGk+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIGNsYXNzPVwib3B0aW9uIHRleHQtbGVmdFwiXG4gICAgICAgICAgICAgIG9uOmNsaWNrPXsoKSA9PiBzZWxlY3RMYWJlbChsYWJlbCl9XG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICB7Li4uc2VsZWN0ZWQgPT09IGluZGV4ID8geyAnZGF0YS1zZWxlY3RlZCc6IHRydWUgfSA6IHt9fVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAje2xhYmVsLnRhZ31cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvbGk+XG4gICAgICAgIHsvZWFjaH1cbiAgICAgIDwvdWw+XG4gICAgey9pZn1cbiAgPC9kaXY+XG48L1BvcG92ZXI+XG4iLCAiPHNjcmlwdD5cbiAgaW1wb3J0IHsgb25EZXN0cm95LCBvbk1vdW50IH0gZnJvbSAnc3ZlbHRlJztcbiAgaW1wb3J0IHsgZmFkZSwgc2NhbGUgfSBmcm9tICdzdmVsdGUvdHJhbnNpdGlvbic7XG5cbiAgaW1wb3J0IHsgY2xhc3NOYW1lIH0gZnJvbSAnLi4vLi4vanMvdXRpbHMvc3R5bGUnO1xuICBpbXBvcnQgQXV0b1Jlc2l6ZVRleHRhcmVhIGZyb20gJy4uL2NvbXBvbmVudHMvQXV0b1Jlc2l6ZVRleHRhcmVhLnN2ZWx0ZSc7XG4gIGltcG9ydCBQb3BvdmVyIGZyb20gJy4uL2NvbXBvbmVudHMvUG9wb3Zlci5zdmVsdGUnO1xuXG4gIGV4cG9ydCBsZXQgY2FuTW92ZURvd247XG4gIGV4cG9ydCBsZXQgY2FuTW92ZVVwO1xuICBleHBvcnQgbGV0IG9uQ2hhbmdlO1xuICBleHBvcnQgbGV0IG9uRGVsZXRlO1xuICBleHBvcnQgbGV0IG9uTW92ZTtcbiAgZXhwb3J0IGxldCBvbk5leHQ7XG4gIGV4cG9ydCBsZXQgbnVtYmVyO1xuICBleHBvcnQgbGV0IHN0ZXA7XG5cbiAgbGV0IGlzRm9jdXNNb2RhbE9wZW4gPSBmYWxzZTtcbiAgbGV0IGlzTWVudU9wZW4gPSBmYWxzZTtcblxuICBmdW5jdGlvbiBtb3ZlU3RlcChkaXJlY3Rpb24pIHtcbiAgICBpc09wZW4gPSBmYWxzZTtcbiAgICBvbk1vdmUoc3RlcC5sYXlvdXRfaWQsIGRpcmVjdGlvbik7XG4gIH1cbjwvc2NyaXB0PlxuXG48ZGl2XG4gIGNsYXNzPVwiZmxleCBqdXN0aWZ5LWVuZCBpdGVtcy1zdGFydCBtdC1bY2FsYygzcmVtXy1fMTZweCldXCJcbiAgdHJhbnNpdGlvbjpmYWRlPXt7IGR1cmF0aW9uOiAxMDAgfX1cbj5cbiAgPHNwYW5cbiAgICBjbGFzcz17Y2xhc3NOYW1lKFxuICAgICAgJ2lubGluZS1ibG9jayBweC02IHB5LTEgcm91bmRlZC1mdWxsJyxcbiAgICAgICdib3JkZXIgYm9yZGVyLXNvbGlkIGJvcmRlci16aW5jLTUwMCBkYXJrOmJvcmRlci16aW5jLTMwMCdcbiAgICApfT5TdGVwIHtudW1iZXJ9PC9zcGFuXG4gID5cbjwvZGl2PlxuXG48ZGl2XG4gIGNsYXNzPXtjbGFzc05hbWUoXG4gICAgJ3JvdW5kZWQteGwgdy1mdWxsIHB5LTIgcHgtMyBib3JkZXIgYm9yZGVyLXNvbGlkJyxcbiAgICBzdGVwLmVycm9ycy5kZXNjcmlwdGlvbiA/ICdib3JkZXItcmVkLTkwMCcgOiAnYm9yZGVyLXppbmMtNTAwJ1xuICApfVxuICB0cmFuc2l0aW9uOmZhZGU9e3sgZHVyYXRpb246IDEwMCB9fVxuPlxuICA8QXV0b1Jlc2l6ZVRleHRhcmVhXG4gICAgaWQ9e2BzdGVwLWRlc2NyaXB0aW9uLSR7bnVtYmVyfWB9XG4gICAgb246Y2hhbmdlPXsoZSkgPT4gb25DaGFuZ2Uoc3RlcC5sYXlvdXRfaWQsICdkZXNjcmlwdGlvbicsIGUudGFyZ2V0LnZhbHVlKX1cbiAgICBvbjprZXlwcmVzcz17KGUpID0+IHtcbiAgICAgIGlmIChlLmtleSA9PT0gJ0VudGVyJyAmJiAoZS5jdHJsS2V5IHx8IGUubWV0YUtleSkpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBvbk5leHQoKTtcbiAgICAgIH1cbiAgICB9fVxuICAgIGNsYXNzPXtjbGFzc05hbWUoXG4gICAgICAnYmctbm9uZSBiZy10cmFuc3BhcmVudCBvdXRsaW5lLW5vbmUgYm9yZGVyLW5vbmUgcC0xJyxcbiAgICAgICd3LWZ1bGwgcmVzaXplLW5vbmUgbWluLWgtWzZyZW1dIGZvY3VzOnJpbmctMCdcbiAgICApfVxuICAgIHBsYWNlaG9sZGVyPVwiRGVzY3JpYmUgdGhlIHRoaXMgc3RlcFwiXG4gICAgdmFsdWU9e3N0ZXAuZGVzY3JpcHRpb259XG4gIC8+XG5cbiAgeyNpZiBzdGVwLmVycm9ycy5kZXNjcmlwdGlvbn1cbiAgICA8cCBjbGFzcz1cInRleHQtcmVkLTcwMCBkYXJrOnRleHQtcmVkLTMwMCB0ZXh0LXNtIG10LTFcIj5cbiAgICAgIHtzdGVwLmVycm9ycy5kZXNjcmlwdGlvbn1cbiAgICA8L3A+XG4gIHsvaWZ9XG5cbiAgPGRpdiBjbGFzcz1cImZsZXgganVzdGlmeS1lbmQgZ2FwLXgtMlwiPlxuICAgIDxidXR0b25cbiAgICAgIGFyaWEtbGFiZWw9XCJFZGl0IGZvY3VzZXNcIlxuICAgICAgY2xhc3M9XCJ0ZXh0LXppbmMtNTAwIGhvdmVyOnRleHQtemluYy03MDAgZGFyazpob3Zlcjp0ZXh0LXppbmMtMzAwIHRyYW5zaXRpb24tY29sb3JzXCJcbiAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgID5cbiAgICAgIDxzcGFuIGNsYXNzPVwiaGVyby1leGNsYW1hdGlvbi1jaXJjbGVcIiAvPlxuICAgIDwvYnV0dG9uPlxuXG4gICAgPFBvcG92ZXIgaXNPcGVuPXtpc01lbnVPcGVufT5cbiAgICAgIDxidXR0b25cbiAgICAgICAgYXJpYS1sYWJlbD1cIkVkaXQgc3RlcFwiXG4gICAgICAgIGNsYXNzPVwidGV4dC16aW5jLTUwMCBob3Zlcjp0ZXh0LXppbmMtNzAwIGRhcms6aG92ZXI6dGV4dC16aW5jLTMwMCB0cmFuc2l0aW9uLWNvbG9yc1wiXG4gICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICBvbjpjbGljaz17KCkgPT4gKGlzTWVudU9wZW4gPSAhaXNNZW51T3Blbil9XG4gICAgICAgIHNsb3Q9XCJ0cmlnZ2VyXCJcbiAgICAgID5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJoZXJvLWNvZy02LXRvb3RoXCIgLz5cbiAgICAgIDwvYnV0dG9uPlxuXG4gICAgICA8dWwgY2xhc3M9XCJmbGV4IGZsZXgtY29sIGdhcC15LTJcIiBzbG90PVwiY29udGVudFwiPlxuICAgICAgICB7I2lmIGNhbk1vdmVVcH1cbiAgICAgICAgICA8bGk+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIGNsYXNzPVwib3B0aW9uIGZsZXgganVzdGlmeS1iZXR3ZWVuXCJcbiAgICAgICAgICAgICAgb246Y2xpY2s9eygpID0+IG1vdmVTdGVwKC0xKX1cbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIE1vdmUgVXBcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJoZXJvLWFycm93LXVwXCIgLz5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvbGk+XG4gICAgICAgIHsvaWZ9XG5cbiAgICAgICAgeyNpZiBjYW5Nb3ZlRG93bn1cbiAgICAgICAgICA8bGk+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIGNsYXNzPVwib3B0aW9uIGZsZXgganVzdGlmeS1iZXR3ZWVuXCJcbiAgICAgICAgICAgICAgb246Y2xpY2s9eygpID0+IG1vdmVTdGVwKDEpfVxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgTW92ZSBEb3duXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaGVyby1hcnJvdy1kb3duXCIgLz5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvbGk+XG4gICAgICAgIHsvaWZ9XG5cbiAgICAgICAgPGxpPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIGNsYXNzPVwib3B0aW9uIGZsZXgganVzdGlmeS1iZXR3ZWVuXCJcbiAgICAgICAgICAgIG9uOmNsaWNrPXsoKSA9PiBvbkRlbGV0ZShzdGVwLmxheW91dF9pZCl9XG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICBSZW1vdmVcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaGVyby10cmFzaFwiIC8+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvbGk+XG4gICAgICA8L3VsPlxuICAgIDwvUG9wb3Zlcj5cbiAgPC9kaXY+XG48L2Rpdj5cbiIsICI8c2NyaXB0PlxuICBpbXBvcnQgeyBwcm9kdWNlIH0gZnJvbSAnaW1tZXInO1xuICBpbXBvcnQgeyBvbkRlc3Ryb3ksIG9uTW91bnQgfSBmcm9tICdzdmVsdGUnO1xuICBpbXBvcnQgeyBzY2FsZSB9IGZyb20gJ3N2ZWx0ZS90cmFuc2l0aW9uJztcblxuICBpbXBvcnQgeyB3YWl0Rm9yRWxlbWVudCB9IGZyb20gJy4uLy4uL2pzL3V0aWxzL2RvbSc7XG4gIGltcG9ydCB7IGNsYXNzTmFtZSB9IGZyb20gJy4uLy4uL2pzL3V0aWxzL3N0eWxlJztcbiAgaW1wb3J0IEF1dG9SZXNpemVUZXh0YXJlYSBmcm9tICcuLi9jb21wb25lbnRzL0F1dG9SZXNpemVUZXh0YXJlYS5zdmVsdGUnO1xuICBpbXBvcnQgUG9wb3ZlciBmcm9tICcuLi9jb21wb25lbnRzL1BvcG92ZXIuc3ZlbHRlJztcbiAgaW1wb3J0IExhYmVsUG9wb3ZlciBmcm9tICcuL0xhYmVsUG9wb3Zlci5zdmVsdGUnO1xuICBpbXBvcnQgU3RlcENhcmQgZnJvbSAnLi9TdGVwQ2FyZC5zdmVsdGUnO1xuXG4gIGV4cG9ydCBsZXQgYWN0aW9uO1xuICBleHBvcnQgbGV0IGVycm9ycyA9IHt9O1xuICBleHBvcnQgbGV0IGxpdmU7XG4gIGV4cG9ydCBsZXQgdGVjaG5pcXVlO1xuXG4gIGxldCBmb3JtID0geyAuLi50ZWNobmlxdWUgfTtcbiAgbGV0IGlzTGFiZWxNZW51T3BlbiA9IGZhbHNlO1xuXG4gICQ6IG9yZGVyZWRTdGVwcyA9IGZvcm0ubGF5b3V0Lm1hcCgobm9kZSkgPT4ge1xuICAgIGxldCBpbmRleCA9IGZvcm0uc3RlcHMuZmluZEluZGV4KFxuICAgICAgKHN0ZXApID0+IHN0ZXAubGF5b3V0X2lkID09PSBub2RlLmxheW91dF9pZFxuICAgICk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgLi4uZm9ybS5zdGVwc1tpbmRleF0sXG4gICAgICBlcnJvcnM6IGVycm9ycy5zdGVwcyA/IGVycm9ycy5zdGVwc1tpbmRleF0gOiB7fSxcbiAgICB9O1xuICB9KTtcblxuICBmdW5jdGlvbiBhZGRTdGVwKCkge1xuICAgIGZvcm0gPSBwcm9kdWNlKGZvcm0sIChkcmFmdCkgPT4ge1xuICAgICAgLy8gRmluZCB0aGUgaGlnaGVzdCBsYXlvdXQgSUQgYW5kIGluY3JlbWVudCBpdCB0byBlbnN1cmUgdW5pcXVlbmVzc1xuICAgICAgbGV0IGlkID1cbiAgICAgICAgKGZvcm0uc3RlcHNcbiAgICAgICAgICAubWFwKChzdGVwKSA9PiBzdGVwLmxheW91dF9pZClcbiAgICAgICAgICAuc29ydCgoYSwgYikgPT4gYSAtIGIpXG4gICAgICAgICAgLnBvcCgpIHx8IDApICsgMTtcblxuICAgICAgZHJhZnQuc3RlcHMucHVzaCh7XG4gICAgICAgIGRlc2NyaXB0aW9uOiAnJyxcbiAgICAgICAgbGF5b3V0X2lkOiBpZCxcbiAgICAgIH0pO1xuXG4gICAgICBkcmFmdC5sYXlvdXQucHVzaCh7XG4gICAgICAgIGxheW91dF9pZDogaWQsXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlbGV0ZVN0ZXAoaWQpIHtcbiAgICBmb3JtID0gcHJvZHVjZShmb3JtLCAoZHJhZnQpID0+IHtcbiAgICAgIGRyYWZ0LnN0ZXBzID0gZHJhZnQuc3RlcHMuZmlsdGVyKChzdGVwKSA9PiBzdGVwLmxheW91dF9pZCAhPT0gaWQpO1xuICAgICAgZHJhZnQubGF5b3V0ID0gZHJhZnQubGF5b3V0LmZpbHRlcigoY2hpbGQpID0+IGNoaWxkLmxheW91dF9pZCAhPT0gaWQpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlU3RlcChpZCwga2V5LCB2YWx1ZSkge1xuICAgIGZvcm0gPSBwcm9kdWNlKGZvcm0sIChkcmFmdCkgPT4ge1xuICAgICAgbGV0IHN0ZXAgPSBkcmFmdC5zdGVwcy5maW5kKChzdGVwKSA9PiBzdGVwLmxheW91dF9pZCA9PT0gaWQpO1xuICAgICAgc3RlcFtrZXldID0gdmFsdWU7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBtb3ZlU3RlcChpZCwgZGlyZWN0aW9uKSB7XG4gICAgbGV0IGluZGV4ID0gZm9ybS5sYXlvdXQuZmluZEluZGV4KChub2RlKSA9PiBub2RlLmxheW91dF9pZCA9PT0gaWQpO1xuICAgIGxldCBuZXdJbmRleCA9IGluZGV4ICsgZGlyZWN0aW9uO1xuXG4gICAgaWYgKG5ld0luZGV4IDwgMCB8fCBuZXdJbmRleCA+PSBmb3JtLmxheW91dC5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBmb3JtID0gcHJvZHVjZShmb3JtLCAoZHJhZnQpID0+IHtcbiAgICAgIGRyYWZ0LmxheW91dC5zcGxpY2UobmV3SW5kZXgsIDAsIGRyYWZ0LmxheW91dC5zcGxpY2UoaW5kZXgsIDEpWzBdKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHN1Ym1pdCgpIHtcbiAgICBsaXZlLnB1c2hFdmVudFRvKCcjdGVjaG5pcXVlLWZvcm0nLCAnc2F2ZScsIHsgdGVjaG5pcXVlOiBmb3JtIH0pO1xuICB9XG5cbiAgYXN5bmMgZnVuY3Rpb24gbmF2aWdhdGVUb1N0ZXAobnVtYmVyKSB7XG4gICAgbGV0IGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHN0ZXAtZGVzY3JpcHRpb24tJHtudW1iZXJ9YCk7XG5cbiAgICBpZiAoZWwpIHtcbiAgICAgIHJldHVybiBlbC5mb2N1cygpO1xuICAgIH1cblxuICAgIGFkZFN0ZXAoKTtcblxuICAgIGVsID0gYXdhaXQgd2FpdEZvckVsZW1lbnQoYCNzdGVwLWRlc2NyaXB0aW9uLSR7bnVtYmVyfWApO1xuICAgIGVsLmZvY3VzKCk7XG4gIH1cblxuICBhc3luYyBmdW5jdGlvbiBvcGVuTGFiZWxNZW51KCkge1xuICAgIGlzTGFiZWxNZW51T3BlbiA9ICFpc0xhYmVsTWVudU9wZW47XG4gICAgbGV0IGVsID0gYXdhaXQgd2FpdEZvckVsZW1lbnQoJyN0ZWNobmlxdWUtbGFiZWwtaW5wdXQnKTtcbiAgICBlbC5mb2N1cygpO1xuICB9XG5cbiAgZnVuY3Rpb24gYWRkTGFiZWwobGFiZWwpIHtcbiAgICBmb3JtID0gcHJvZHVjZShmb3JtLCAoZHJhZnQpID0+IHtcbiAgICAgIGRyYWZ0LmxhYmVscy5wdXNoKGxhYmVsKTtcbiAgICB9KTtcblxuICAgIGlzTGFiZWxNZW51T3BlbiA9IGZhbHNlO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZXNjcmlwdGlvbicpLmZvY3VzKCk7XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdmVMYWJlbChpZCkge1xuICAgIGZvcm0gPSBwcm9kdWNlKGZvcm0sIChkcmFmdCkgPT4ge1xuICAgICAgZHJhZnQubGFiZWxzID0gZHJhZnQubGFiZWxzLmZpbHRlcigobGFiZWwpID0+IGxhYmVsLmlkICE9PSBpZCk7XG4gICAgfSk7XG4gIH1cbjwvc2NyaXB0PlxuXG48Zm9ybSBhdXRvY29tcGxldGU9XCJvZmZcIiBvbjpzdWJtaXR8cHJldmVudERlZmF1bHQ9e3N1Ym1pdH0+XG4gIDxkaXYgY2xhc3M9XCJtYi04XCI+XG4gICAgPGlucHV0XG4gICAgICBvbjpjaGFuZ2U9eyhlKSA9PiAoZm9ybS5uYW1lID0gZS50YXJnZXQudmFsdWUpfVxuICAgICAgdmFsdWU9e2Zvcm0ubmFtZX1cbiAgICAgIGNsYXNzPXtjbGFzc05hbWUoXG4gICAgICAgICd0ZXh0LTZ4bCBweC0zIHB5LTQgaC1bOTJweF0gcGxhY2Vob2xkZXI6dGV4dC1uZXV0cmFsLTUwMCB3LWZ1bGwgb3V0bGluZS1ub25lIGJvcmRlci1iJyxcbiAgICAgICAgJ3RleHQtbmV1dHJhbC05MDAgZGFyazp0ZXh0LW5ldXRyYWwtMzAwIGJnLXRyYW5zcGFyZW50IHRyYW5zaXRpb24tY29sb3JzJyxcbiAgICAgICAge1xuICAgICAgICAgICdib3JkZXItcmVkLTkwMCBwbGFjZWhvbGRlcjp0ZXh0LXJlZC00MDAgZGFyazpwbGFjZWhvbGRlcjp0ZXh0LXJlZC0zMDAnOlxuICAgICAgICAgICAgZXJyb3JzLm5hbWUsXG4gICAgICAgICAgJ2JvcmRlci16aW5jLTQwMCBkYXJrOmJvcmRlci16aW5jLTUwMCBmb2N1czpib3JkZXItemluYy01MDAgZGFyazpmb2N1czpib3JkZXItemluYy0xMDAnOlxuICAgICAgICAgICAgIWVycm9ycy5uYW1lLFxuICAgICAgICB9XG4gICAgICApfVxuICAgICAgcGxhY2Vob2xkZXI9XCJUZWNobmlxdWUgbmFtZVwiXG4gICAgLz5cblxuICAgIHsjaWYgZXJyb3JzLm5hbWV9XG4gICAgICA8cCBjbGFzcz1cInRleHQtcmVkLTcwMCBkYXJrOnRleHQtcmVkLTMwMCB0ZXh0LXNtIG10LTFcIj57ZXJyb3JzLm5hbWV9PC9wPlxuICAgIHsvaWZ9XG4gIDwvZGl2PlxuXG4gIDxkaXYgY2xhc3M9XCJ3LWZ1bGwgZ3JpZCBncmlkLWNvbHMtWzhyZW1fMWZyXSBnYXAtNFwiPlxuICAgIDxkaXYgY2xhc3M9XCJmbGV4IGp1c3RpZnktZW5kIGl0ZW1zLXN0YXJ0IG10LVtjYWxjKDNyZW1fLV8xNnB4KV1cIj5cbiAgICAgIDxzcGFuXG4gICAgICAgIGNsYXNzPXtjbGFzc05hbWUoXG4gICAgICAgICAgJ2lubGluZS1ibG9jayBweC02IHB5LTEgcm91bmRlZC1mdWxsJyxcbiAgICAgICAgICAnYm9yZGVyIGJvcmRlci1zb2xpZCBib3JkZXItemluYy01MDAgZGFyazpib3JkZXItemluYy0zMDAnXG4gICAgICAgICl9PlN0YXJ0PC9zcGFuXG4gICAgICA+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2XG4gICAgICBjbGFzcz17Y2xhc3NOYW1lKFxuICAgICAgICAncm91bmRlZC14bCB3LWZ1bGwgcHktMiBweC0zJyxcbiAgICAgICAgJ2JvcmRlciBib3JkZXItc29saWQgYm9yZGVyLXppbmMtNTAwJyxcbiAgICAgICAgJ2JnLWdyYWRpZW50LXRvLWJyIGZyb20taW5kaWdvLTk1MCB0by16aW5jLTkwMCB0by01MCUnXG4gICAgICApfVxuICAgID5cbiAgICAgIDxBdXRvUmVzaXplVGV4dGFyZWFcbiAgICAgICAgYXV0b2ZvY3VzXG4gICAgICAgIGlkPVwiZGVzY3JpcHRpb25cIlxuICAgICAgICBvbjpjaGFuZ2U9eyhlKSA9PiAoZm9ybS5kZXNjcmlwdGlvbiA9IGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgb246a2V5cHJlc3M9eyhlKSA9PiB7XG4gICAgICAgICAgaWYgKGUua2V5ID09PSAnRW50ZXInICYmIChlLmN0cmxLZXkgfHwgZS5tZXRhS2V5KSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgbmF2aWdhdGVUb1N0ZXAoMSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChlLmtleSA9PT0gJyMnKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBvcGVuTGFiZWxNZW51KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9fVxuICAgICAgICB2YWx1ZT17Zm9ybS5kZXNjcmlwdGlvbn1cbiAgICAgICAgYXJpYS1sYWJlbD1cIkRlc2NyaXB0aW9uIG9mIHN0YXJ0aW5nIHBvc2l0aW9uXCJcbiAgICAgICAgY2xhc3M9e2NsYXNzTmFtZShcbiAgICAgICAgICAnYmctbm9uZSBiZy10cmFuc3BhcmVudCBvdXRsaW5lLW5vbmUgYm9yZGVyLW5vbmUgcC0xJyxcbiAgICAgICAgICAndy1mdWxsIHJlc2l6ZS1ub25lIG1pbi1oLVs2cmVtXSBmb2N1czpyaW5nLTAnXG4gICAgICAgICl9XG4gICAgICAgIHBsYWNlaG9sZGVyPVwiRGVzY3JpYmUgdGhlIHN0YXJ0aW5nIHBvc2l0aW9uIGZvciB0aGlzIHRlY2huaXF1ZVwiXG4gICAgICAvPlxuXG4gICAgICA8ZGl2IGNsYXNzPVwiZmxleCBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImZsZXggZmxleC1yb3cgZ2FwLXgtMiBncm93XCI+XG4gICAgICAgICAgeyNlYWNoIGZvcm0ubGFiZWxzIGFzIGxhYmVsIChsYWJlbC5pZCl9XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIGNsYXNzPXtjbGFzc05hbWUoXG4gICAgICAgICAgICAgICAgJ2lubGluZS1mbGV4IGdhcC14LTAuNSBpdGVtcy1jZW50ZXIgcHgtMyByb3VuZGVkLWZ1bGwgbGVhZGluZy03IGJnLWluZGlnby04MDAnLFxuICAgICAgICAgICAgICAgICdib3JkZXIgYm9yZGVyLXNvbGlkIGJvcmRlci16aW5jLTUwMCBkYXJrOmJvcmRlci16aW5jLTMwMCdcbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgb246Y2xpY2s9eygpID0+IHJlbW92ZUxhYmVsKGxhYmVsLmlkKX1cbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC16aW5jLTMwMFwiPiN7bGFiZWwudGFnfTwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICBjbGFzcz1cImhlcm8teC1tYXJrLW1pY3JvIHRleHQtemluYy01MDAgaG92ZXI6dGV4dC16aW5jLTMwMFwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICB7L2VhY2h9XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxMYWJlbFBvcG92ZXIgaXNPcGVuPXtpc0xhYmVsTWVudU9wZW59IG9uQWRkTGFiZWw9e2FkZExhYmVsfSAvPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgICB7I2VhY2ggb3JkZXJlZFN0ZXBzIGFzIHN0ZXAsIGluZGV4IChzdGVwLmxheW91dF9pZCl9XG4gICAgICA8U3RlcENhcmRcbiAgICAgICAgY2FuTW92ZURvd249e2luZGV4IDwgb3JkZXJlZFN0ZXBzLmxlbmd0aCAtIDF9XG4gICAgICAgIGNhbk1vdmVVcD17aW5kZXggPiAwfVxuICAgICAgICBvbkNoYW5nZT17dXBkYXRlU3RlcH1cbiAgICAgICAgb25EZWxldGU9e2RlbGV0ZVN0ZXB9XG4gICAgICAgIG9uTW92ZT17bW92ZVN0ZXB9XG4gICAgICAgIG9uTmV4dD17KCkgPT4gbmF2aWdhdGVUb1N0ZXAoaW5kZXggKyAyKX1cbiAgICAgICAgbnVtYmVyPXtpbmRleCArIDF9XG4gICAgICAgIHtzdGVwfVxuICAgICAgLz5cbiAgICB7L2VhY2h9XG5cbiAgICA8ZGl2IGNsYXNzPVwiY29sLXN0YXJ0LTIgZmxleCBmbGV4LXJvdyBqdXN0aWZ5LWNlbnRlclwiPlxuICAgICAgPGJ1dHRvblxuICAgICAgICBhcmlhLWxhYmVsPVwiQWRkIHN0ZXBcIlxuICAgICAgICBjbGFzcz17Y2xhc3NOYW1lKFxuICAgICAgICAgICdwLTEgcm91bmRlZC1mdWxsIGJvcmRlciBib3JkZXItc29saWQgYm9yZGVyLXppbmMtNTAwIHRyYW5zaXRpb24tY29sb3JzJyxcbiAgICAgICAgICAnaG92ZXI6YmctemluYy0zMDAgZGFyazpob3ZlcjpiZy16aW5jLTcwMCBob3Zlcjp0ZXh0LXppbmMtOTAwIGRhcms6aG92ZXI6dGV4dC16aW5jLTIwMCdcbiAgICAgICAgKX1cbiAgICAgICAgb246Y2xpY2s9e2FkZFN0ZXB9XG4gICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImhlcm8tcGx1c1wiIC8+XG4gICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG5cbiAgPGRpdiBjbGFzcz1cImZsZXgganVzdGlmeS1lbmQgbXQtNiBnYXAteC0yXCI+XG4gICAgeyNpZiBhY3Rpb24gPT09ICdlZGl0J31cbiAgICAgIDxhXG4gICAgICAgIGNsYXNzPVwiYnV0dG9uIG91dGxpbmVkXCJcbiAgICAgICAgaHJlZj17YC90ZWNobmlxdWVzLyR7dGVjaG5pcXVlLmlkfWB9XG4gICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICBkYXRhLXBoeC1saW5rPVwicGF0Y2hcIlxuICAgICAgICBkYXRhLXBoeC1saW5rLXN0YXRlPVwicHVzaFwiXG4gICAgICA+XG4gICAgICAgIENhbmNlbFxuICAgICAgPC9hPlxuICAgIHsvaWZ9XG5cbiAgICA8YnV0dG9uIGNsYXNzPVwiYnV0dG9uXCIgdHlwZT1cInN1Ym1pdFwiPlxuICAgICAge2FjdGlvbiA9PT0gJ25ldycgPyAnQ3JlYXRlJyA6ICdVcGRhdGUnfVxuICAgIDwvYnV0dG9uPlxuICA8L2Rpdj5cbjwvZm9ybT5cbiIsICI8c2NyaXB0PlxuICBpbXBvcnQgeyBRdWVyeUNsaWVudCwgUXVlcnlDbGllbnRQcm92aWRlciB9IGZyb20gJ0B0YW5zdGFjay9zdmVsdGUtcXVlcnknO1xuXG4gIGltcG9ydCBGb3JtIGZyb20gJy4vdGVjaG5pcXVlX2Zvcm0vRm9ybS5zdmVsdGUnO1xuXG4gIGV4cG9ydCBsZXQgYWN0aW9uO1xuICBleHBvcnQgbGV0IGVycm9ycztcbiAgZXhwb3J0IGxldCBsaXZlO1xuICBleHBvcnQgbGV0IHRlY2huaXF1ZTtcblxuICBsZXQgY2xpZW50ID0gbmV3IFF1ZXJ5Q2xpZW50KCk7XG48L3NjcmlwdD5cblxuPFF1ZXJ5Q2xpZW50UHJvdmlkZXIge2NsaWVudH0+XG4gIDxGb3JtIHthY3Rpb259IHtlcnJvcnN9IHtsaXZlfSB7dGVjaG5pcXVlfSAvPlxuPC9RdWVyeUNsaWVudFByb3ZpZGVyPlxuIiwgImV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVDb21wb25lbnRzKGNvbXBvbmVudHMpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoY29tcG9uZW50cy5kZWZhdWx0KSB8fCAhQXJyYXkuaXNBcnJheShjb21wb25lbnRzLmZpbGVuYW1lcykpIHJldHVybiBjb21wb25lbnRzXG5cbiAgICBjb25zdCBub3JtYWxpemVkID0ge31cbiAgICBmb3IgKGNvbnN0IFtpbmRleCwgbW9kdWxlXSBvZiBjb21wb25lbnRzLmRlZmF1bHQuZW50cmllcygpKSB7XG4gICAgICAgIGNvbnN0IENvbXBvbmVudCA9IG1vZHVsZS5kZWZhdWx0XG4gICAgICAgIGNvbnN0IG5hbWUgPSBjb21wb25lbnRzLmZpbGVuYW1lc1tpbmRleF0ucmVwbGFjZShcIi4uL3N2ZWx0ZS9cIiwgXCJcIikucmVwbGFjZShcIi5zdmVsdGVcIiwgXCJcIilcbiAgICAgICAgbm9ybWFsaXplZFtuYW1lXSA9IENvbXBvbmVudFxuICAgIH1cbiAgICByZXR1cm4gbm9ybWFsaXplZFxufVxuIiwgImltcG9ydCB7bm9ybWFsaXplQ29tcG9uZW50c30gZnJvbSBcIi4vdXRpbHNcIlxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UmVuZGVyKGNvbXBvbmVudHMpIHtcbiAgICBjb21wb25lbnRzID0gbm9ybWFsaXplQ29tcG9uZW50cyhjb21wb25lbnRzKVxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIHJlbmRlcihuYW1lLCBwcm9wcywgc2xvdHMpIHtcbiAgICAgICAgY29uc3QgQ29tcG9uZW50ID0gY29tcG9uZW50c1tuYW1lXVxuICAgICAgICBjb25zdCAkJHNsb3RzID0gT2JqZWN0LmZyb21FbnRyaWVzKE9iamVjdC5lbnRyaWVzKHNsb3RzKS5tYXAoKFtrLCB2XSkgPT4gW2ssICgpID0+IHZdKSlcbiAgICAgICAgcmV0dXJuIENvbXBvbmVudC5yZW5kZXIocHJvcHMsIHskJHNsb3RzfSlcbiAgICB9XG59XG4iLCAiaW1wb3J0IHtub3JtYWxpemVDb21wb25lbnRzfSBmcm9tIFwiLi91dGlsc1wiXG5cbmZ1bmN0aW9uIGdldEF0dHJpYnV0ZUpzb24ocmVmLCBhdHRyaWJ1dGVOYW1lKSB7XG4gICAgY29uc3QgZGF0YSA9IHJlZi5lbC5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSlcbiAgICByZXR1cm4gZGF0YSA/IEpTT04ucGFyc2UoZGF0YSkgOiB7fVxufVxuXG5mdW5jdGlvbiBkZXRhY2gobm9kZSkge1xuICAgIG5vZGUucGFyZW50Tm9kZT8ucmVtb3ZlQ2hpbGQobm9kZSlcbn1cblxuZnVuY3Rpb24gaW5zZXJ0KHRhcmdldCwgbm9kZSwgYW5jaG9yKSB7XG4gICAgdGFyZ2V0Lmluc2VydEJlZm9yZShub2RlLCBhbmNob3IgfHwgbnVsbClcbn1cblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbmZ1bmN0aW9uIGdldFNsb3RzKHJlZikge1xuICAgIGNvbnN0IHNsb3RzID0ge31cblxuICAgIGZvciAoY29uc3Qgc2xvdE5hbWUgaW4gZ2V0QXR0cmlidXRlSnNvbihyZWYsIFwiZGF0YS1zbG90c1wiKSkge1xuICAgICAgICBjb25zdCBzbG90ID0gKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBnZXRFbGVtZW50KCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBiYXNlNjQgPSBnZXRBdHRyaWJ1dGVKc29uKHJlZiwgXCJkYXRhLXNsb3RzXCIpW3Nsb3ROYW1lXVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmlubmVySFRNTCA9IGF0b2IoYmFzZTY0KS50cmltKClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnRcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgZGV0YWNoKHRoaXMuc2F2ZWRFbGVtZW50KVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNhdmVkRWxlbWVudCA9IHRoaXMuZ2V0RWxlbWVudCgpXG4gICAgICAgICAgICAgICAgICAgIGluc2VydCh0aGlzLnNhdmVkVGFyZ2V0LCB0aGlzLnNhdmVkRWxlbWVudCwgdGhpcy5zYXZlZEFuY2hvcilcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGM6IG5vb3AsXG4gICAgICAgICAgICAgICAgbSh0YXJnZXQsIGFuY2hvcikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNhdmVkVGFyZ2V0ID0gdGFyZ2V0XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2F2ZWRBbmNob3IgPSBhbmNob3JcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zYXZlZEVsZW1lbnQgPSB0aGlzLmdldEVsZW1lbnQoKVxuICAgICAgICAgICAgICAgICAgICBpbnNlcnQodGhpcy5zYXZlZFRhcmdldCwgdGhpcy5zYXZlZEVsZW1lbnQsIHRoaXMuc2F2ZWRBbmNob3IpXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBkKGRldGFjaGluZykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGV0YWNoaW5nKSBkZXRhY2godGhpcy5zYXZlZEVsZW1lbnQpXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBsOiBub29wLFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgc2xvdHNbc2xvdE5hbWVdID0gW3Nsb3RdXG4gICAgfVxuXG4gICAgcmV0dXJuIHNsb3RzXG59XG5cbmZ1bmN0aW9uIGdldExpdmVKc29uUHJvcHMocmVmKSB7XG4gICAgY29uc3QganNvbiA9IGdldEF0dHJpYnV0ZUpzb24ocmVmLCBcImRhdGEtbGl2ZS1qc29uXCIpXG5cbiAgICAvLyBPbiBTU1IsIGRhdGEtbGl2ZS1qc29uIGlzIHRoZSBmdWxsIG9iamVjdCB3ZSB3YW50XG4gICAgLy8gQWZ0ZXIgU1NSLCBkYXRhLWxpdmUtanNvbiBpcyBhbiBhcnJheSBvZiBrZXlzLCBhbmQgd2UnbGwgZ2V0IHRoZSBkYXRhIGZyb20gdGhlIHdpbmRvd1xuICAgIGlmICghQXJyYXkuaXNBcnJheShqc29uKSkgcmV0dXJuIGpzb25cblxuICAgIGNvbnN0IGxpdmVKc29uRGF0YSA9IHt9XG4gICAgZm9yIChjb25zdCBsaXZlSnNvblZhcmlhYmxlIG9mIGpzb24pIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IHdpbmRvd1tsaXZlSnNvblZhcmlhYmxlXVxuICAgICAgICBpZiAoZGF0YSkgbGl2ZUpzb25EYXRhW2xpdmVKc29uVmFyaWFibGVdID0gZGF0YVxuICAgIH1cbiAgICByZXR1cm4gbGl2ZUpzb25EYXRhXG59XG5cbmZ1bmN0aW9uIGdldFByb3BzKHJlZikge1xuICAgIHJldHVybiB7XG4gICAgICAgIC4uLmdldEF0dHJpYnV0ZUpzb24ocmVmLCBcImRhdGEtcHJvcHNcIiksXG4gICAgICAgIC4uLmdldExpdmVKc29uUHJvcHMocmVmKSxcbiAgICAgICAgbGl2ZTogcmVmLFxuICAgICAgICAkJHNsb3RzOiBnZXRTbG90cyhyZWYpLFxuICAgICAgICAkJHNjb3BlOiB7fSxcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGZpbmRTbG90Q3R4KGNvbXBvbmVudCkge1xuICAgIC8vIFRoZSBkZWZhdWx0IHNsb3QgYWx3YXlzIGV4aXN0cyBpZiB0aGVyZSdzIGEgc2xvdCBzZXRcbiAgICAvLyBldmVuIGlmIG5vIHNsb3QgaXMgc2V0IGZvciB0aGUgZXhwbGljaXQgZGVmYXVsdCBzbG90XG4gICAgcmV0dXJuIGNvbXBvbmVudC4kJC5jdHguZmluZChjdHhFbGVtZW50ID0+IGN0eEVsZW1lbnQ/LmRlZmF1bHQpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRIb29rcyhjb21wb25lbnRzKSB7XG4gICAgY29tcG9uZW50cyA9IG5vcm1hbGl6ZUNvbXBvbmVudHMoY29tcG9uZW50cylcblxuICAgIGNvbnN0IFN2ZWx0ZUhvb2sgPSB7XG4gICAgICAgIG1vdW50ZWQoKSB7XG4gICAgICAgICAgICBjb25zdCBjb21wb25lbnROYW1lID0gdGhpcy5lbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLW5hbWVcIilcbiAgICAgICAgICAgIGlmICghY29tcG9uZW50TmFtZSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvbXBvbmVudCBuYW1lIG11c3QgYmUgcHJvdmlkZWRcIilcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgQ29tcG9uZW50ID0gY29tcG9uZW50c1tjb21wb25lbnROYW1lXVxuICAgICAgICAgICAgaWYgKCFDb21wb25lbnQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuYWJsZSB0byBmaW5kICR7Y29tcG9uZW50TmFtZX0gY29tcG9uZW50LmApXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAoY29uc3QgbGl2ZUpzb25FbGVtZW50IG9mIE9iamVjdC5rZXlzKGdldEF0dHJpYnV0ZUpzb24odGhpcywgXCJkYXRhLWxpdmUtanNvblwiKSkpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihgJHtsaXZlSnNvbkVsZW1lbnR9X2luaXRpYWxpemVkYCwgZXZlbnQgPT4gdGhpcy5faW5zdGFuY2UuJHNldChnZXRQcm9wcyh0aGlzKSksIGZhbHNlKVxuICAgICAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKGAke2xpdmVKc29uRWxlbWVudH1fcGF0Y2hlZGAsIGV2ZW50ID0+IHRoaXMuX2luc3RhbmNlLiRzZXQoZ2V0UHJvcHModGhpcykpLCBmYWxzZSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UgPSBuZXcgQ29tcG9uZW50KHtcbiAgICAgICAgICAgICAgICB0YXJnZXQ6IHRoaXMuZWwsXG4gICAgICAgICAgICAgICAgcHJvcHM6IGdldFByb3BzKHRoaXMpLFxuICAgICAgICAgICAgICAgIGh5ZHJhdGU6IHRoaXMuZWwuaGFzQXR0cmlidXRlKFwiZGF0YS1zc3JcIiksXG4gICAgICAgICAgICB9KVxuICAgICAgICB9LFxuXG4gICAgICAgIHVwZGF0ZWQoKSB7XG4gICAgICAgICAgICAvLyBTZXQgdGhlIHByb3BzXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZS4kc2V0KGdldFByb3BzKHRoaXMpKVxuXG4gICAgICAgICAgICAvLyBTZXQgdGhlIHNsb3RzXG4gICAgICAgICAgICBjb25zdCBzbG90Q3R4ID0gZmluZFNsb3RDdHgodGhpcy5faW5zdGFuY2UpXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBzbG90Q3R4KSB7XG4gICAgICAgICAgICAgICAgc2xvdEN0eFtrZXldWzBdKCkudXBkYXRlKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBkZXN0cm95ZWQoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5faW5zdGFuY2UpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBoeDpwYWdlLWxvYWRpbmctc3RvcFwiLCAoKSA9PiB0aGlzLl9pbnN0YW5jZS4kZGVzdHJveSgpLCB7b25jZTogdHJ1ZX0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgU3ZlbHRlSG9vayxcbiAgICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7O0FDQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7Ozs7Ozs7O0FDQ08sU0FBUyxPQUFPO0FBQUM7QUFzQ2pCLFNBQVMsSUFBSSxJQUFJO0FBQ3ZCLFNBQU8sR0FBRztBQUNYO0FBRU8sU0FBUyxlQUFlO0FBQzlCLFNBQU8sdUJBQU8sT0FBTyxJQUFJO0FBQzFCO0FBTU8sU0FBUyxRQUFRLEtBQUs7QUFDNUIsTUFBSSxRQUFRLEdBQUc7QUFDaEI7QUFNTyxTQUFTLFlBQVksT0FBTztBQUNsQyxTQUFPLE9BQU8sVUFBVTtBQUN6QjtBQUdPLFNBQVMsZUFBZSxHQUFHLEdBQUc7QUFDcEMsU0FBTyxLQUFLLElBQUksS0FBSyxJQUFJLE1BQU0sS0FBTSxLQUFLLE9BQU8sTUFBTSxZQUFhLE9BQU8sTUFBTTtBQUNsRjtBQTJETyxTQUFTLGVBQWUsT0FBTyxNQUFNO0FBQzNDLE1BQUksU0FBUyxRQUFRLE9BQU8sTUFBTSxjQUFjLFlBQVk7QUFDM0QsVUFBTSxJQUFJLE1BQU0sSUFBSSxnREFBZ0Q7QUFBQSxFQUNyRTtBQUNEO0FBRU8sU0FBUyxVQUFVLFVBQVUsV0FBVztBQUM5QyxNQUFJLFNBQVMsTUFBTTtBQUNsQixlQUFXLFlBQVksV0FBVztBQUNqQyxlQUFTLE1BQVM7QUFBQSxJQUNuQjtBQUNBLFdBQU87QUFBQSxFQUNSO0FBQ0EsUUFBTSxRQUFRLE1BQU0sVUFBVSxHQUFHLFNBQVM7QUFDMUMsU0FBTyxNQUFNLGNBQWMsTUFBTSxNQUFNLFlBQVksSUFBSTtBQUN4RDtBQXFHTyxTQUFTLG1C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RixRQUFNLGFBQWEsQ0FBQztBQUNwQixhQUFXLENBQUMsT0FBT0MsT0FBTSxLQUFLLFdBQVcsUUFBUSxRQUFRLEdBQUc7QUFDeEQsVUFBTSxZQUFZQSxRQUFPO0FBQ3pCLFVBQU0sT0FBTyxXQUFXLFVBQVUsS0FBSyxFQUFFLFFBQVEsY0FBYyxFQUFFLEVBQUUsUUFBUSxXQUFXLEVBQUU7QUFDeEYsZUFBVyxJQUFJLElBQUk7RUFDdkI7QUFDQSxTQUFPO0FBQ1g7QUNSTyxTQUFTLFVBQVUsWUFBWTtBQUNsQyxlQUFhLG9CQUFvQixVQUFVO0FBRTNDLFNBQU8sU0FBU0MsUUFBTyxNQUFNLE9BQU8sT0FBTztBQUN2QyxVQUFNLFlBQVksV0FBVyxJQUFJO0FBQ2pDLFVBQU0sVUFBVSxPQUFPLFlBQVksT0FBTyxRQUFRLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUN0RixXQUFPLFVBQVUsT0FBTyxPQUFPLEVBQUMsUUFBTyxDQUFDO0VBQzVDO0FBQ0o7OztBNURQTyxJQUFNLFNBQVMsVUFBVSxTQUFVOyIsCiAgIm5hbWVzIjogWyJlbGVtZW50IiwgImVsZW1lbnQiLCAiYXR0ciIsICJTdWJzY3JpYmFibGUiLCAiY29uc3RydWN0b3IiLCAibGlzdGVuZXJzIiwgIlNldCIsICJzdWJzY3JpYmUiLCAiYmluZCIsICJsaXN0ZW5lciIsICJpZGVudGl0eSIsICJhZGQiLCAib25TdWJzY3JpYmUiLCAiZGVsZXRlIiwgIm9uVW5zdWJzY3JpYmUiLCAiaGFzTGlzdGVuZXJzIiwgInNpemUiLCAiaXNTZXJ2ZXIiLCAid2luZG93IiwgIm5vb3AiLCAidW5kZWZpbmVkIiwgImZ1bmN0aW9uYWxVcGRhdGUiLCAidXBkYXRlciIsICJpbnB1dCIsICJpc1ZhbGlkVGltZW91dCIsICJ2YWx1ZSIsICJJbmZpbml0eSIsICJ0aW1lVW50aWxTdGFsZSIsICJ1cGRhdGVkQXQiLCAic3RhbGVUaW1lIiwgIk1hdGgiLCAibWF4IiwgIkRhdGUiLCAibm93IiwgInBhcnNlUXVlcnlBcmdzIiwgImFyZzEiLCAiYXJnMiIsICJhcmczIiwgImlzUXVlcnlLZXkiLCAicXVlcnlLZXkiLCAicXVlcnlGbiIsICJwYXJzZU11dGF0aW9uQXJncyIsICJtdXRhdGlvbktleSIsICJtdXRhdGlvbkZuIiwgInBhcnNlRmlsdGVyQXJncyIsICJtYXRjaFF1ZXJ5IiwgImZpbHRlcnMiLCAicXVlcnkiLCAidHlwZSIsICJleGFjdCIsICJmZXRjaFN0YXR1cyIsICJwcmVkaWNhdGUiLCAicXVlcnlLZXkiLCAic3RhbGUiLCAiaXNRdWVyeUtleSIsICJxdWVyeUhhc2giLCAiaGFzaFF1ZXJ5S2V5QnlPcHRpb25zIiwgIm9wdGlvbnMiLCAicGFydGlhbE1hdGNoS2V5IiwgImlzQWN0aXZlIiwgImlzU3RhbGUiLCAic3RhdGUiLCAibWF0Y2hNdXRhdGlvbiIsICJtdXRhdGlvbiIsICJmZXRjaGluZyIsICJtdXRhdGlvbktleSIsICJoYXNoUXVlcnlLZXkiLCAic3RhdHVzIiwgImhhc2hGbiIsICJxdWVyeUtleUhhc2hGbiIsICJKU09OIiwgInN0cmluZ2lmeSIsICJfIiwgInZhbCIsICJpc1BsYWluT2JqZWN0IiwgIk9iamVjdCIsICJrZXlzIiwgInNvcnQiLCAicmVkdWNlIiwgInJlc3VsdCIsICJrZXkiLCAiYSIsICJiIiwgInBhcnRpYWxEZWVwRXF1YWwiLCAic29tZSIsICJyZXBsYWNlRXF1YWxEZWVwIiwgImFycmF5IiwgImlzUGxhaW5BcnJheSIsICJhU2l6ZSIsICJsZW5ndGgiLCAiYkl0ZW1zIiwgImJTaXplIiwgImNvcHkiLCAiZXF1YWxJdGVtcyIsICJpIiwgInNoYWxsb3dFcXVhbE9iamVjdHMiLCAidmFsdWUiLCAiQXJyYXkiLCAiaXNBcnJheSIsICJvIiwgImhhc09iamVjdFByb3RvdHlwZSIsICJjdG9yIiwgImNvbnN0cnVjdG9yIiwgInByb3QiLCAicHJvdG90eXBlIiwgImhhc093blByb3BlcnR5IiwgInRvU3RyaW5nIiwgImNhbGwiLCAic2xlZXAiLCAidGltZW91dCIsICJQcm9taXNlIiwgInJlc29sdmUiLCAic2V0VGltZW91dCIsICJzY2hlZHVsZU1pY3JvdGFzayIsICJjYWxsYmFjayIsICJ0aGVuIiwgImdldEFib3J0Q29udHJvbGxlciIsICJBYm9ydENvbnRyb2xsZXIiLCAicmVwbGFjZURhdGEiLCAicHJldkRhdGEiLCAiZGF0YSIsICJvcHRpb25zIiwgImlzRGF0YUVxdWFsIiwgInN0cnVjdHVyYWxTaGFyaW5nIiwgInJlcGxhY2VFcXVhbERlZXAiLCAiRm9jdXNNYW5hZ2VyIiwgIlN1YnNjcmliYWJsZSIsICJjb25zdHJ1Y3RvciIsICJzZXR1cCIsICJvbkZvY3VzIiwgImlzU2VydmVyIiwgIndpbmRvdyIsICJhZGRFdmVudExpc3RlbmVyIiwgImxpc3RlbmVyIiwgInJlbW92ZUV2ZW50TGlzdGVuZXIiLCAib25TdWJzY3JpYmUiLCAiY2xlYW51cCIsICJzZXRFdmVudExpc3RlbmVyIiwgIm9uVW5zdWJzY3JpYmUiLCAiaGFzTGlzdGVuZXJzIiwgInVuZGVmaW5lZCIsICJmb2N1c2VkIiwgInNldEZvY3VzZWQiLCAiY2hhbmdlZCIsICJsaXN0ZW5lcnMiLCAiZm9yRWFjaCIsICJpc0ZvY3VzZWQiLCAiZG9jdW1lbnQiLCAiaW5jbHVkZXMiLCAidmlzaWJpbGl0eVN0YXRlIiwgImZvY3VzTWFuYWdlciIsICJvbmxpbmVFdmVudHMiLCAiT25saW5lTWFuYWdlciIsICJTdWJzY3JpYmFibGUiLCAiY29uc3RydWN0b3IiLCAic2V0dXAiLCAib25PbmxpbmUiLCAiaXNTZXJ2ZXIiLCAid2luZG93IiwgImFkZEV2ZW50TGlzdGVuZXIiLCAibGlzdGVuZXIiLCAiZm9yRWFjaCIsICJldmVudCIsICJyZW1vdmVFdmVudExpc3RlbmVyIiwgIm9uU3Vic2NyaWJlIiwgImNsZWFudXAiLCAic2V0RXZlbnRMaXN0ZW5lciIsICJvblVuc3Vic2NyaWJlIiwgImhhc0xpc3RlbmVycyIsICJ1bmRlZmluZWQiLCAib25saW5lIiwgInNldE9ubGluZSIsICJjaGFuZ2VkIiwgImxpc3RlbmVycyIsICJpc09ubGluZSIsICJuYXZpZ2F0b3IiLCAib25MaW5lIiwgIm9ubGluZU1hbmFnZXIiLCAiZGVmYXVsdFJldHJ5RGVsYXkiLCAiZmFpbHVyZUNvdW50IiwgIk1hdGgiLCAibWluIiwgImNhbkZldGNoIiwgIm5ldHdvcmtNb2RlIiwgIm9ubGluZU1hbmFnZXIiLCAiaXNPbmxpbmUiLCAiQ2FuY2VsbGVkRXJyb3IiLCAiY29uc3RydWN0b3IiLCAib3B0aW9ucyIsICJyZXZlcnQiLCAic2lsZW50IiwgImlzQ2FuY2VsbGVkRXJyb3IiLCAidmFsdWUiLCAiY3JlYXRlUmV0cnllciIsICJjb25maWciLCAiaXNSZXRyeUNhbmNlbGxlZCIsICJpc1Jlc29sdmVkIiwgImNvbnRpbnVlRm4iLCAicHJvbWlzZVJlc29sdmUiLCAicHJvbWlzZVJlamVjdCIsICJwcm9taXNlIiwgIlByb21pc2UiLCAib3V0ZXJSZXNvbHZlIiwgIm91dGVyUmVqZWN0IiwgImNhbmNlbCIsICJjYW5jZWxPcHRpb25zIiwgInJlamVjdCIsICJhYm9ydCIsICJjYW5jZWxSZXRyeSIsICJjb250aW51ZVJldHJ5IiwgInNob3VsZFBhdXNlIiwgImZvY3VzTWFuYWdlciIsICJpc0ZvY3VzZWQiLCAicmVzb2x2ZSIsICJvblN1Y2Nlc3MiLCAib25FcnJvciIsICJwYXVzZSIsICJjb250aW51ZVJlc29sdmUiLCAiY2FuQ29udGludWUiLCAib25QYXVzZSIsICJ0aGVuIiwgInVuZGVmaW5lZCIsICJvbkNvbnRpbnVlIiwgInJ1biIsICJwcm9taXNlT3JWYWx1ZSIsICJmbiIsICJlcnJvciIsICJjYXRjaCIsICJyZXRyeSIsICJyZXRyeURlbGF5IiwgImRlbGF5IiwgInNob3VsZFJldHJ5IiwgIm9uRmFpbCIsICJzbGVlcCIsICJjb250aW51ZSIsICJkaWRDb250aW51ZSIsICJkZWZhdWx0TG9nZ2VyIiwgImNvbnNvbGUiLCAiY3JlYXRlTm90aWZ5TWFuYWdlciIsICJxdWV1ZSIsICJ0cmFuc2FjdGlvbnMiLCAibm90aWZ5Rm4iLCAiY2FsbGJhY2siLCAiYmF0Y2hOb3RpZnlGbiIsICJiYXRjaCIsICJyZXN1bHQiLCAiZmx1c2giLCAic2NoZWR1bGUiLCAicHVzaCIsICJzY2hlZHVsZU1pY3JvdGFzayIsICJiYXRjaENhbGxzIiwgImFyZ3MiLCAib3JpZ2luYWxRdWV1ZSIsICJsZW5ndGgiLCAiZm9yRWFjaCIsICJzZXROb3RpZnlGdW5jdGlvbiIsICJmbiIsICJzZXRCYXRjaE5vdGlmeUZ1bmN0aW9uIiwgIm5vdGlmeU1hbmFnZXIiLCAiUmVtb3ZhYmxlIiwgImRlc3Ryb3kiLCAiY2xlYXJHY1RpbWVvdXQiLCAic2NoZWR1bGVHYyIsICJpc1ZhbGlkVGltZW91dCIsICJjYWNoZVRpbWUiLCAiZ2NUaW1lb3V0IiwgInNldFRpbWVvdXQiLCAib3B0aW9uYWxSZW1vdmUiLCAidXBkYXRlQ2FjaGVUaW1lIiwgIm5ld0NhY2hlVGltZSIsICJNYXRoIiwgIm1heCIsICJpc1NlcnZlciIsICJJbmZpbml0eSIsICJjbGVhclRpbWVvdXQiLCAidW5kZWZpbmVkIiwgIlF1ZXJ5IiwgIlJlbW92YWJsZSIsICJjb25zdHJ1Y3RvciIsICJjb25maWciLCAiYWJvcnRTaWduYWxDb25zdW1lZCIsICJkZWZhdWx0T3B0aW9ucyIsICJzZXRPcHRpb25zIiwgIm9wdGlvbnMiLCAib2JzZXJ2ZXJzIiwgImNhY2hlIiwgImxvZ2dlciIsICJkZWZhdWx0TG9nZ2VyIiwgInF1ZXJ5S2V5IiwgInF1ZXJ5SGFzaCIsICJpbml0aWFsU3RhdGUiLCAic3RhdGUiLCAiZ2V0RGVmYXVsdFN0YXRlIiwgInNjaGVkdWxlR2MiLCAibWV0YSIsICJ1cGRhdGVDYWNoZVRpbWUiLCAiY2FjaGVUaW1lIiwgIm9wdGlvbmFsUmVtb3ZlIiwgImxlbmd0aCIsICJmZXRjaFN0YXR1cyIsICJyZW1vdmUiLCAic2V0RGF0YSIsICJuZXdEYXRhIiwgImRhdGEiLCAicmVwbGFjZURhdGEiLCAiZGlzcGF0Y2giLCAidHlwZSIsICJkYXRhVXBkYXRlZEF0IiwgInVwZGF0ZWRBdCIsICJtYW51YWwiLCAic2V0U3RhdGUiLCAic2V0U3RhdGVPcHRpb25zIiwgImNhbmNlbCIsICJwcm9taXNlIiwgInJldHJ5ZXIiLCAidGhlbiIsICJub29wIiwgImNhdGNoIiwgIlByb21pc2UiLCAicmVzb2x2ZSIsICJkZXN0cm95IiwgInNpbGVudCIsICJyZXNldCIsICJpc0FjdGl2ZSIsICJzb21lIiwgIm9ic2VydmVyIiwgImVuYWJsZWQiLCAiaXNEaXNhYmxlZCIsICJnZXRPYnNlcnZlcnNDb3VudCIsICJpc1N0YWxlIiwgImlzSW52YWxpZGF0ZWQiLCAiZ2V0Q3VycmVudFJlc3VsdCIsICJpc1N0YWxlQnlUaW1lIiwgInN0YWxlVGltZSIsICJ0aW1lVW50aWxTdGFsZSIsICJvbkZvY3VzIiwgImZpbmQiLCAieCIsICJzaG91bGRGZXRjaE9uV2luZG93Rm9jdXMiLCAicmVmZXRjaCIsICJjYW5jZWxSZWZldGNoIiwgImNvbnRpbnVlIiwgIm9uT25saW5lIiwgInNob3VsZEZldGNoT25SZWNvbm5lY3QiLCAiYWRkT2JzZXJ2ZXIiLCAiaW5jbHVkZXMiLCAicHVzaCIsICJjbGVhckdjVGltZW91dCIsICJub3RpZnkiLCAicXVlcnkiLCAicmVtb3ZlT2JzZXJ2ZXIiLCAiZmlsdGVyIiwgInJldmVydCIsICJjYW5jZWxSZXRyeSIsICJpbnZhbGlkYXRlIiwgImZldGNoIiwgImZldGNoT3B0aW9ucyIsICJjb250aW51ZVJldHJ5IiwgInF1ZXJ5Rm4iLCAicHJvY2VzcyIsICJlbnYiLCAiTk9ERV9FTlYiLCAiQXJyYXkiLCAiaXNBcnJheSIsICJlcnJvciIsICJhYm9ydENvbnRyb2xsZXIiLCAiZ2V0QWJvcnRDb250cm9sbGVyIiwgInF1ZXJ5Rm5Db250ZXh0IiwgInBhZ2VQYXJhbSIsICJ1bmRlZmluZWQiLCAiYWRkU2lnbmFsUHJvcGVydHkiLCAib2JqZWN0IiwgIk9iamVjdCIsICJkZWZpbmVQcm9wZXJ0eSIsICJlbnVtZXJhYmxlIiwgImdldCIsICJzaWduYWwiLCAiZmV0Y2hGbiIsICJyZWplY3QiLCAiY29udGV4dCIsICJiZWhhdmlvciIsICJvbkZldGNoIiwgInJldmVydFN0YXRlIiwgImZldGNoTWV0YSIsICJvbkVycm9yIiwgImlzQ2FuY2VsbGVkRXJyb3IiLCAib25TZXR0bGVkIiwgImlzRmV0Y2hpbmdPcHRpbWlzdGljIiwgImNyZWF0ZVJldHJ5ZXIiLCAiZm4iLCAiYWJvcnQiLCAiYmluZCIsICJvblN1Y2Nlc3MiLCAiRXJyb3IiLCAib25GYWlsIiwgImZhaWx1cmVDb3VudCIsICJvblBhdXNlIiwgIm9uQ29udGludWUiLCAicmV0cnkiLCAicmV0cnlEZWxheSIsICJuZXR3b3JrTW9kZSIsICJhY3Rpb24iLCAicmVkdWNlciIsICJmZXRjaEZhaWx1cmVDb3VudCIsICJmZXRjaEZhaWx1cmVSZWFzb24iLCAiY2FuRmV0Y2giLCAic3RhdHVzIiwgImRhdGFVcGRhdGVDb3VudCIsICJEYXRlIiwgIm5vdyIsICJlcnJvclVwZGF0ZUNvdW50IiwgImVycm9yVXBkYXRlZEF0IiwgIm5vdGlmeU1hbmFnZXIiLCAiYmF0Y2giLCAiZm9yRWFjaCIsICJvblF1ZXJ5VXBkYXRlIiwgImluaXRpYWxEYXRhIiwgImhhc0RhdGEiLCAiaW5pdGlhbERhdGFVcGRhdGVkQXQiLCAiUXVlcnlDYWNoZSIsICJTdWJzY3JpYmFibGUiLCAiY29uc3RydWN0b3IiLCAiY29uZmlnIiwgInF1ZXJpZXMiLCAicXVlcmllc01hcCIsICJidWlsZCIsICJjbGllbnQiLCAib3B0aW9ucyIsICJzdGF0ZSIsICJxdWVyeUtleSIsICJxdWVyeUhhc2giLCAiaGFzaFF1ZXJ5S2V5QnlPcHRpb25zIiwgInF1ZXJ5IiwgImdldCIsICJRdWVyeSIsICJjYWNoZSIsICJsb2dnZXIiLCAiZ2V0TG9nZ2VyIiwgImRlZmF1bHRRdWVyeU9wdGlvbnMiLCAiZGVmYXVsdE9wdGlvbnMiLCAiZ2V0UXVlcnlEZWZhdWx0cyIsICJhZGQiLCAicHVzaCIsICJub3RpZnkiLCAidHlwZSIsICJyZW1vdmUiLCAicXVlcnlJbk1hcCIsICJkZXN0cm95IiwgImZpbHRlciIsICJ4IiwgImNsZWFyIiwgIm5vdGlmeU1hbmFnZXIiLCAiYmF0Y2giLCAiZm9yRWFjaCIsICJnZXRBbGwiLCAiZmluZCIsICJhcmcxIiwgImFyZzIiLCAiZmlsdGVycyIsICJwYXJzZUZpbHRlckFyZ3MiLCAiZXhhY3QiLCAibWF0Y2hRdWVyeSIsICJmaW5kQWxsIiwgIk9iamVjdCIsICJrZXlzIiwgImxlbmd0aCIsICJldmVudCIsICJsaXN0ZW5lcnMiLCAibGlzdGVuZXIiLCAib25Gb2N1cyIsICJvbk9ubGluZSIsICJNdXRhdGlvbiIsICJSZW1vdmFibGUiLCAiY29uc3RydWN0b3IiLCAiY29uZmlnIiwgImRlZmF1bHRPcHRpb25zIiwgIm11dGF0aW9uSWQiLCAibXV0YXRpb25DYWNoZSIsICJsb2dnZXIiLCAiZGVmYXVsdExvZ2dlciIsICJvYnNlcnZlcnMiLCAic3RhdGUiLCAiZ2V0RGVmYXVsdFN0YXRlIiwgInNldE9wdGlvbnMiLCAib3B0aW9ucyIsICJzY2hlZHVsZUdjIiwgInVwZGF0ZUNhY2hlVGltZSIsICJjYWNoZVRpbWUiLCAibWV0YSIsICJzZXRTdGF0ZSIsICJkaXNwYXRjaCIsICJ0eXBlIiwgImFkZE9ic2VydmVyIiwgIm9ic2VydmVyIiwgImluY2x1ZGVzIiwgInB1c2giLCAiY2xlYXJHY1RpbWVvdXQiLCAibm90aWZ5IiwgIm11dGF0aW9uIiwgInJlbW92ZU9ic2VydmVyIiwgImZpbHRlciIsICJ4IiwgIm9wdGlvbmFsUmVtb3ZlIiwgImxlbmd0aCIsICJzdGF0dXMiLCAicmVtb3ZlIiwgImNvbnRpbnVlIiwgInJldHJ5ZXIiLCAiZXhlY3V0ZSIsICJleGVjdXRlTXV0YXRpb24iLCAiY3JlYXRlUmV0cnllciIsICJmbiIsICJtdXRhdGlvbkZuIiwgIlByb21pc2UiLCAicmVqZWN0IiwgInZhcmlhYmxlcyIsICJvbkZhaWwiLCAiZmFpbHVyZUNvdW50IiwgImVycm9yIiwgIm9uUGF1c2UiLCAib25Db250aW51ZSIsICJyZXRyeSIsICJyZXRyeURlbGF5IiwgIm5ldHdvcmtNb2RlIiwgInByb21pc2UiLCAicmVzdG9yZWQiLCAib25NdXRhdGUiLCAiY29udGV4dCIsICJkYXRhIiwgIm9uU3VjY2VzcyIsICJvblNldHRsZWQiLCAib25FcnJvciIsICJwcm9jZXNzIiwgImVudiIsICJOT0RFX0VOViIsICJ1bmRlZmluZWQiLCAiYWN0aW9uIiwgInJlZHVjZXIiLCAiZmFpbHVyZVJlYXNvbiIsICJpc1BhdXNlZCIsICJjYW5GZXRjaCIsICJub3RpZnlNYW5hZ2VyIiwgImJhdGNoIiwgImZvckVhY2giLCAib25NdXRhdGlvblVwZGF0ZSIsICJNdXRhdGlvbkNhY2hlIiwgIlN1YnNjcmliYWJsZSIsICJjb25zdHJ1Y3RvciIsICJjb25maWciLCAibXV0YXRpb25zIiwgIm11dGF0aW9uSWQiLCAiYnVpbGQiLCAiY2xpZW50IiwgIm9wdGlvbnMiLCAic3RhdGUiLCAibXV0YXRpb24iLCAiTXV0YXRpb24iLCAibXV0YXRpb25DYWNoZSIsICJsb2dnZXIiLCAiZ2V0TG9nZ2VyIiwgImRlZmF1bHRNdXRhdGlvbk9wdGlvbnMiLCAiZGVmYXVsdE9wdGlvbnMiLCAibXV0YXRpb25LZXkiLCAiZ2V0TXV0YXRpb25EZWZhdWx0cyIsICJ1bmRlZmluZWQiLCAiYWRkIiwgInB1c2giLCAibm90aWZ5IiwgInR5cGUiLCAicmVtb3ZlIiwgImZpbHRlciIsICJ4IiwgImNsZWFyIiwgIm5vdGlmeU1hbmFnZXIiLCAiYmF0Y2giLCAiZm9yRWFjaCIsICJnZXRBbGwiLCAiZmluZCIsICJmaWx0ZXJzIiwgImV4YWN0IiwgIm1hdGNoTXV0YXRpb24iLCAiZmluZEFsbCIsICJldmVudCIsICJsaXN0ZW5lcnMiLCAibGlzdGVuZXIiLCAicmVzdW1lUGF1c2VkTXV0YXRpb25zIiwgInJlc3VtaW5nIiwgIlByb21pc2UiLCAicmVzb2x2ZSIsICJ0aGVuIiwgInBhdXNlZE11dGF0aW9ucyIsICJpc1BhdXNlZCIsICJyZWR1Y2UiLCAicHJvbWlzZSIsICJjb250aW51ZSIsICJjYXRjaCIsICJub29wIiwgImluZmluaXRlUXVlcnlCZWhhdmlvciIsICJvbkZldGNoIiwgImNvbnRleHQiLCAiZmV0Y2hGbiIsICJyZWZldGNoUGFnZSIsICJmZXRjaE9wdGlvbnMiLCAibWV0YSIsICJmZXRjaE1vcmUiLCAicGFnZVBhcmFtIiwgImlzRmV0Y2hpbmdOZXh0UGFnZSIsICJkaXJlY3Rpb24iLCAiaXNGZXRjaGluZ1ByZXZpb3VzUGFnZSIsICJvbGRQYWdlcyIsICJzdGF0ZSIsICJkYXRhIiwgInBhZ2VzIiwgIm9sZFBhZ2VQYXJhbXMiLCAicGFnZVBhcmFtcyIsICJuZXdQYWdlUGFyYW1zIiwgImNhbmNlbGxlZCIsICJhZGRTaWduYWxQcm9wZXJ0eSIsICJvYmplY3QiLCAiT2JqZWN0IiwgImRlZmluZVByb3BlcnR5IiwgImVudW1lcmFibGUiLCAiZ2V0IiwgInNpZ25hbCIsICJhYm9ydGVkIiwgImFkZEV2ZW50TGlzdGVuZXIiLCAicXVlcnlGbiIsICJvcHRpb25zIiwgIlByb21pc2UiLCAicmVqZWN0IiwgInF1ZXJ5SGFzaCIsICJidWlsZE5ld1BhZ2VzIiwgInBhcmFtIiwgInBhZ2UiLCAicHJldmlvdXMiLCAiZmV0Y2hQYWdlIiwgIm1hbnVhbCIsICJsZW5ndGgiLCAicmVzb2x2ZSIsICJxdWVyeUZuQ29udGV4dCIsICJxdWVyeUtleSIsICJxdWVyeUZuUmVzdWx0IiwgInByb21pc2UiLCAidGhlbiIsICJnZXROZXh0UGFnZVBhcmFtIiwgImdldFByZXZpb3VzUGFnZVBhcmFtIiwgInNob3VsZEZldGNoRmlyc3RQYWdlIiwgImkiLCAic2hvdWxkRmV0Y2hOZXh0UGFnZSIsICJmaW5hbFByb21pc2UiLCAiUXVlcnlDbGllbnQiLCAiY29uc3RydWN0b3IiLCAiY29uZmlnIiwgInF1ZXJ5Q2FjaGUiLCAiUXVlcnlDYWNoZSIsICJtdXRhdGlvbkNhY2hlIiwgIk11dGF0aW9uQ2FjaGUiLCAibG9nZ2VyIiwgImRlZmF1bHRMb2dnZXIiLCAiZGVmYXVsdE9wdGlvbnMiLCAicXVlcnlEZWZhdWx0cyIsICJtdXRhdGlvbkRlZmF1bHRzIiwgIm1vdW50Q291bnQiLCAicHJvY2VzcyIsICJlbnYiLCAiTk9ERV9FTlYiLCAiZXJyb3IiLCAibW91bnQiLCAidW5zdWJzY3JpYmVGb2N1cyIsICJmb2N1c01hbmFnZXIiLCAic3Vic2NyaWJlIiwgImlzRm9jdXNlZCIsICJyZXN1bWVQYXVzZWRNdXRhdGlvbnMiLCAib25Gb2N1cyIsICJ1bnN1YnNjcmliZU9ubGluZSIsICJvbmxpbmVNYW5hZ2VyIiwgImlzT25saW5lIiwgIm9uT25saW5lIiwgInVubW91bnQiLCAidW5kZWZpbmVkIiwgImlzRmV0Y2hpbmciLCAiYXJnMSIsICJhcmcyIiwgImZpbHRlcnMiLCAicGFyc2VGaWx0ZXJBcmdzIiwgImZldGNoU3RhdHVzIiwgImZpbmRBbGwiLCAibGVuZ3RoIiwgImlzTXV0YXRpbmciLCAiZmV0Y2hpbmciLCAiZ2V0UXVlcnlEYXRhIiwgInF1ZXJ5S2V5IiwgImZpbmQiLCAic3RhdGUiLCAiZGF0YSIsICJlbnN1cmVRdWVyeURhdGEiLCAiYXJnMyIsICJwYXJzZWRPcHRpb25zIiwgInBhcnNlUXVlcnlBcmdzIiwgImNhY2hlZERhdGEiLCAiUHJvbWlzZSIsICJyZXNvbHZlIiwgImZldGNoUXVlcnkiLCAiZ2V0UXVlcmllc0RhdGEiLCAicXVlcnlLZXlPckZpbHRlcnMiLCAiZ2V0UXVlcnlDYWNoZSIsICJtYXAiLCAic2V0UXVlcnlEYXRhIiwgInVwZGF0ZXIiLCAib3B0aW9ucyIsICJxdWVyeSIsICJwcmV2RGF0YSIsICJmdW5jdGlvbmFsVXBkYXRlIiwgImRlZmF1bHRlZE9wdGlvbnMiLCAiZGVmYXVsdFF1ZXJ5T3B0aW9ucyIsICJidWlsZCIsICJzZXREYXRhIiwgIm1hbnVhbCIsICJzZXRRdWVyaWVzRGF0YSIsICJub3RpZnlNYW5hZ2VyIiwgImJhdGNoIiwgImdldFF1ZXJ5U3RhdGUiLCAicmVtb3ZlUXVlcmllcyIsICJmb3JFYWNoIiwgInJlbW92ZSIsICJyZXNldFF1ZXJpZXMiLCAicmVmZXRjaEZpbHRlcnMiLCAidHlwZSIsICJyZXNldCIsICJyZWZldGNoUXVlcmllcyIsICJjYW5jZWxRdWVyaWVzIiwgImNhbmNlbE9wdGlvbnMiLCAicmV2ZXJ0IiwgInByb21pc2VzIiwgImNhbmNlbCIsICJhbGwiLCAidGhlbiIsICJub29wIiwgImNhdGNoIiwgImludmFsaWRhdGVRdWVyaWVzIiwgImludmFsaWRhdGUiLCAicmVmZXRjaFR5cGUiLCAiZmlsdGVyIiwgImlzRGlzYWJsZWQiLCAiZmV0Y2giLCAiY2FuY2VsUmVmZXRjaCIsICJtZXRhIiwgInJlZmV0Y2hQYWdlIiwgInByb21pc2UiLCAidGhyb3dPbkVycm9yIiwgInJldHJ5IiwgImlzU3RhbGVCeVRpbWUiLCAic3RhbGVUaW1lIiwgInByZWZldGNoUXVlcnkiLCAiZmV0Y2hJbmZpbml0ZVF1ZXJ5IiwgImJlaGF2aW9yIiwgImluZmluaXRlUXVlcnlCZWhhdmlvciIsICJwcmVmZXRjaEluZmluaXRlUXVlcnkiLCAiZ2V0TXV0YXRpb25DYWNoZSIsICJnZXRMb2dnZXIiLCAiZ2V0RGVmYXVsdE9wdGlvbnMiLCAic2V0RGVmYXVsdE9wdGlvbnMiLCAic2V0UXVlcnlEZWZhdWx0cyIsICJyZXN1bHQiLCAieCIsICJoYXNoUXVlcnlLZXkiLCAicHVzaCIsICJnZXRRdWVyeURlZmF1bHRzIiwgImZpcnN0TWF0Y2hpbmdEZWZhdWx0cyIsICJwYXJ0aWFsTWF0Y2hLZXkiLCAibWF0Y2hpbmdEZWZhdWx0cyIsICJKU09OIiwgInN0cmluZ2lmeSIsICJzZXRNdXRhdGlvbkRlZmF1bHRzIiwgIm11dGF0aW9uS2V5IiwgImdldE11dGF0aW9uRGVmYXVsdHMiLCAiX2RlZmF1bHRlZCIsICJxdWVyaWVzIiwgInF1ZXJ5SGFzaCIsICJoYXNoUXVlcnlLZXlCeU9wdGlvbnMiLCAicmVmZXRjaE9uUmVjb25uZWN0IiwgIm5ldHdvcmtNb2RlIiwgInVzZUVycm9yQm91bmRhcnkiLCAic3VzcGVuc2UiLCAiZGVmYXVsdE11dGF0aW9uT3B0aW9ucyIsICJtdXRhdGlvbnMiLCAiY2xlYXIiLCAiUXVlcnlPYnNlcnZlciIsICJTdWJzY3JpYmFibGUiLCAiY29uc3RydWN0b3IiLCAiY2xpZW50IiwgIm9wdGlvbnMiLCAidHJhY2tlZFByb3BzIiwgIlNldCIsICJzZWxlY3RFcnJvciIsICJiaW5kTWV0aG9kcyIsICJzZXRPcHRpb25zIiwgInJlbW92ZSIsICJiaW5kIiwgInJlZmV0Y2giLCAib25TdWJzY3JpYmUiLCAibGlzdGVuZXJzIiwgInNpemUiLCAiY3VycmVudFF1ZXJ5IiwgImFkZE9ic2VydmVyIiwgInNob3VsZEZldGNoT25Nb3VudCIsICJleGVjdXRlRmV0Y2giLCAidXBkYXRlVGltZXJzIiwgIm9uVW5zdWJzY3JpYmUiLCAiaGFzTGlzdGVuZXJzIiwgImRlc3Ryb3kiLCAic2hvdWxkRmV0Y2hPblJlY29ubmVjdCIsICJzaG91bGRGZXRjaE9uIiwgInJlZmV0Y2hPblJlY29ubmVjdCIsICJzaG91bGRGZXRjaE9uV2luZG93Rm9jdXMiLCAicmVmZXRjaE9uV2luZG93Rm9jdXMiLCAiY2xlYXJTdGFsZVRpbWVvdXQiLCAiY2xlYXJSZWZldGNoSW50ZXJ2YWwiLCAicmVtb3ZlT2JzZXJ2ZXIiLCAibm90aWZ5T3B0aW9ucyIsICJwcmV2T3B0aW9ucyIsICJwcmV2UXVlcnkiLCAiZGVmYXVsdFF1ZXJ5T3B0aW9ucyIsICJwcm9jZXNzIiwgImVudiIsICJOT0RFX0VOViIsICJpc0RhdGFFcXVhbCIsICJnZXRMb2dnZXIiLCAiZXJyb3IiLCAic2hhbGxvd0VxdWFsT2JqZWN0cyIsICJnZXRRdWVyeUNhY2hlIiwgIm5vdGlmeSIsICJ0eXBlIiwgInF1ZXJ5IiwgIm9ic2VydmVyIiwgImVuYWJsZWQiLCAiRXJyb3IiLCAicXVlcnlLZXkiLCAidXBkYXRlUXVlcnkiLCAibW91bnRlZCIsICJzaG91bGRGZXRjaE9wdGlvbmFsbHkiLCAidXBkYXRlUmVzdWx0IiwgInN0YWxlVGltZSIsICJ1cGRhdGVTdGFsZVRpbWVvdXQiLCAibmV4dFJlZmV0Y2hJbnRlcnZhbCIsICJjb21wdXRlUmVmZXRjaEludGVydmFsIiwgImN1cnJlbnRSZWZldGNoSW50ZXJ2YWwiLCAidXBkYXRlUmVmZXRjaEludGVydmFsIiwgImdldE9wdGltaXN0aWNSZXN1bHQiLCAiYnVpbGQiLCAicmVzdWx0IiwgImNyZWF0ZVJlc3VsdCIsICJzaG91bGRBc3NpZ25PYnNlcnZlckN1cnJlbnRQcm9wZXJ0aWVzIiwgImN1cnJlbnRSZXN1bHQiLCAiY3VycmVudFJlc3VsdE9wdGlvbnMiLCAiY3VycmVudFJlc3VsdFN0YXRlIiwgInN0YXRlIiwgImdldEN1cnJlbnRSZXN1bHQiLCAidHJhY2tSZXN1bHQiLCAidHJhY2tlZFJlc3VsdCIsICJPYmplY3QiLCAia2V5cyIsICJmb3JFYWNoIiwgImtleSIsICJkZWZpbmVQcm9wZXJ0eSIsICJjb25maWd1cmFibGUiLCAiZW51bWVyYWJsZSIsICJnZXQiLCAiYWRkIiwgImdldEN1cnJlbnRRdWVyeSIsICJyZWZldGNoUGFnZSIsICJmZXRjaCIsICJtZXRhIiwgImZldGNoT3B0aW1pc3RpYyIsICJkZWZhdWx0ZWRPcHRpb25zIiwgImlzRmV0Y2hpbmdPcHRpbWlzdGljIiwgInRoZW4iLCAiZmV0Y2hPcHRpb25zIiwgImNhbmNlbFJlZmV0Y2giLCAicHJvbWlzZSIsICJ0aHJvd09uRXJyb3IiLCAiY2F0Y2giLCAibm9vcCIsICJpc1NlcnZlciIsICJpc1N0YWxlIiwgImlzVmFsaWRUaW1lb3V0IiwgInRpbWUiLCAidGltZVVudGlsU3RhbGUiLCAiZGF0YVVwZGF0ZWRBdCIsICJ0aW1lb3V0IiwgInN0YWxlVGltZW91dElkIiwgInNldFRpbWVvdXQiLCAicmVmZXRjaEludGVydmFsIiwgImRhdGEiLCAibmV4dEludGVydmFsIiwgInJlZmV0Y2hJbnRlcnZhbElkIiwgInNldEludGVydmFsIiwgInJlZmV0Y2hJbnRlcnZhbEluQmFja2dyb3VuZCIsICJmb2N1c01hbmFnZXIiLCAiaXNGb2N1c2VkIiwgImNsZWFyVGltZW91dCIsICJ1bmRlZmluZWQiLCAiY2xlYXJJbnRlcnZhbCIsICJwcmV2UmVzdWx0IiwgInByZXZSZXN1bHRTdGF0ZSIsICJwcmV2UmVzdWx0T3B0aW9ucyIsICJxdWVyeUNoYW5nZSIsICJxdWVyeUluaXRpYWxTdGF0ZSIsICJjdXJyZW50UXVlcnlJbml0aWFsU3RhdGUiLCAicHJldlF1ZXJ5UmVzdWx0IiwgInByZXZpb3VzUXVlcnlSZXN1bHQiLCAiZXJyb3JVcGRhdGVkQXQiLCAiZmV0Y2hTdGF0dXMiLCAic3RhdHVzIiwgImlzUHJldmlvdXNEYXRhIiwgImlzUGxhY2Vob2xkZXJEYXRhIiwgIl9vcHRpbWlzdGljUmVzdWx0cyIsICJmZXRjaE9uTW91bnQiLCAiZmV0Y2hPcHRpb25hbGx5IiwgImNhbkZldGNoIiwgIm5ldHdvcmtNb2RlIiwgImtlZXBQcmV2aW91c0RhdGEiLCAiaXNTdWNjZXNzIiwgInNlbGVjdCIsICJzZWxlY3RGbiIsICJzZWxlY3RSZXN1bHQiLCAicmVwbGFjZURhdGEiLCAicGxhY2Vob2xkZXJEYXRhIiwgIkRhdGUiLCAibm93IiwgImlzRmV0Y2hpbmciLCAiaXNMb2FkaW5nIiwgImlzRXJyb3IiLCAiaXNJbml0aWFsTG9hZGluZyIsICJmYWlsdXJlQ291bnQiLCAiZmV0Y2hGYWlsdXJlQ291bnQiLCAiZmFpbHVyZVJlYXNvbiIsICJmZXRjaEZhaWx1cmVSZWFzb24iLCAiZXJyb3JVcGRhdGVDb3VudCIsICJpc0ZldGNoZWQiLCAiZGF0YVVwZGF0ZUNvdW50IiwgImlzRmV0Y2hlZEFmdGVyTW91bnQiLCAiaXNSZWZldGNoaW5nIiwgImlzTG9hZGluZ0Vycm9yIiwgImlzUGF1c2VkIiwgImlzUmVmZXRjaEVycm9yIiwgIm5leHRSZXN1bHQiLCAiZGVmYXVsdE5vdGlmeU9wdGlvbnMiLCAiY2FjaGUiLCAic2hvdWxkTm90aWZ5TGlzdGVuZXJzIiwgIm5vdGlmeU9uQ2hhbmdlUHJvcHMiLCAibm90aWZ5T25DaGFuZ2VQcm9wc1ZhbHVlIiwgImluY2x1ZGVkUHJvcHMiLCAidXNlRXJyb3JCb3VuZGFyeSIsICJzb21lIiwgInR5cGVkS2V5IiwgImNoYW5nZWQiLCAiaGFzIiwgIm9uUXVlcnlVcGRhdGUiLCAiYWN0aW9uIiwgIm9uU3VjY2VzcyIsICJtYW51YWwiLCAiaXNDYW5jZWxsZWRFcnJvciIsICJvbkVycm9yIiwgIm5vdGlmeU1hbmFnZXIiLCAiYmF0Y2giLCAib25TZXR0bGVkIiwgImxpc3RlbmVyIiwgInNob3VsZExvYWRPbk1vdW50IiwgInJldHJ5T25Nb3VudCIsICJyZWZldGNoT25Nb3VudCIsICJmaWVsZCIsICJ2YWx1ZSIsICJzdXNwZW5zZSIsICJpc1N0YWxlQnlUaW1lIiwgIm9wdGltaXN0aWNSZXN1bHQiLCAiTXV0YXRpb25PYnNlcnZlciIsICJTdWJzY3JpYmFibGUiLCAiY29uc3RydWN0b3IiLCAiY2xpZW50IiwgIm9wdGlvbnMiLCAic2V0T3B0aW9ucyIsICJiaW5kTWV0aG9kcyIsICJ1cGRhdGVSZXN1bHQiLCAibXV0YXRlIiwgImJpbmQiLCAicmVzZXQiLCAicHJldk9wdGlvbnMiLCAiZGVmYXVsdE11dGF0aW9uT3B0aW9ucyIsICJzaGFsbG93RXF1YWxPYmplY3RzIiwgImdldE11dGF0aW9uQ2FjaGUiLCAibm90aWZ5IiwgInR5cGUiLCAibXV0YXRpb24iLCAiY3VycmVudE11dGF0aW9uIiwgIm9ic2VydmVyIiwgIm9uVW5zdWJzY3JpYmUiLCAiaGFzTGlzdGVuZXJzIiwgInJlbW92ZU9ic2VydmVyIiwgIm9uTXV0YXRpb25VcGRhdGUiLCAiYWN0aW9uIiwgIm5vdGlmeU9wdGlvbnMiLCAibGlzdGVuZXJzIiwgIm9uU3VjY2VzcyIsICJvbkVycm9yIiwgImdldEN1cnJlbnRSZXN1bHQiLCAiY3VycmVudFJlc3VsdCIsICJ1bmRlZmluZWQiLCAidmFyaWFibGVzIiwgIm11dGF0ZU9wdGlvbnMiLCAiYnVpbGQiLCAiYWRkT2JzZXJ2ZXIiLCAiZXhlY3V0ZSIsICJzdGF0ZSIsICJnZXREZWZhdWx0U3RhdGUiLCAicmVzdWx0IiwgImlzTG9hZGluZyIsICJzdGF0dXMiLCAiaXNTdWNjZXNzIiwgImlzRXJyb3IiLCAiaXNJZGxlIiwgIm5vdGlmeU1hbmFnZXIiLCAiYmF0Y2giLCAiZGF0YSIsICJjb250ZXh0IiwgIm9uU2V0dGxlZCIsICJlcnJvciIsICJmb3JFYWNoIiwgImxpc3RlbmVyIiwgImh5ZHJhdGUiLCAiY2xpZW50IiwgImRlaHlkcmF0ZWRTdGF0ZSIsICJvcHRpb25zIiwgIm11dGF0aW9uQ2FjaGUiLCAiZ2V0TXV0YXRpb25DYWNoZSIsICJxdWVyeUNhY2hlIiwgImdldFF1ZXJ5Q2FjaGUiLCAibXV0YXRpb25zIiwgInF1ZXJpZXMiLCAiZm9yRWFjaCIsICJkZWh5ZHJhdGVkTXV0YXRpb24iLCAiYnVpbGQiLCAiZGVmYXVsdE9wdGlvbnMiLCAibXV0YXRpb25LZXkiLCAic3RhdGUiLCAicXVlcnlLZXkiLCAicXVlcnlIYXNoIiwgInF1ZXJ5IiwgImdldCIsICJkYXRhVXBkYXRlZEF0IiwgImZldGNoU3RhdHVzIiwgIl9pZ25vcmVkIiwgImRlaHlkcmF0ZWRRdWVyeVN0YXRlIiwgInNldFN0YXRlIiwgIm9uTW91bnQiLCAic2V0IiwgInN1YnNjcmliZSIsICJydW4iLCAic2V0IiwgInN1YnNjcmliZSIsICJNdXRhdGlvbk9ic2VydmVyIiwgIm5vb3AiLCAic2V0IiwgInN1YnNjcmliZSIsICJvbk1vdW50IiwgImlzUGxhaW5PYmplY3QiLCAiZWFjaCIsICJpc1BsYWluT2JqZWN0IiwgImltbWVyIiwgImVhY2giLCAiaXNTZXQiLCAiY3VycmVudCIsICJJbW1lciIsICJiYXNlIiwgIkltbWVyIiwgImVsIiwgIm9uTW91bnQiLCAiaXNPcGVuIiwgIm9uTW91bnQiLCAiaXNPcGVuIiwgInRhZyIsICJsYWJlbCIsICJvbk1vdW50IiwgImVycm9ycyIsICJzdGVwIiwgImVycm9ycyIsICJtb2R1bGUiLCAicmVuZGVyIl0KfQo=
