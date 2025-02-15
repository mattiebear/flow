// If you want to use Phoenix channels, run `mix help phx.gen.channel`
// to get started and then uncomment the line below.
// import "./user_socket.js"

// You can include dependencies in two ways.
//
// The simplest option is to put them in assets/vendor and
// import them using relative paths:
//
//     import "../vendor/some-package.js"
//
// Alternatively, you can `npm install some-package --prefix assets` and import
// them using a path starting with the package name:
//
//     import "some-package"
//

// Include phoenix_html to handle method=PUT/DELETE in forms and buttons.
import 'phoenix_html';

import { getHooks } from 'live_svelte';
// Establish Phoenix Socket and LiveView configuration.
import { Socket } from 'phoenix';
import { LiveSocket } from 'phoenix_live_view';

import * as Components from '../svelte/**/*.svelte';
import topbar from '../vendor/topbar';

let Hooks = {
  ModeToggle: {
    mounted() {
      const STORAGE_KEY = 'mode-toggle';

      let mode =
        localStorage.getItem(STORAGE_KEY) === 'dark' ? 'dark' : 'light';
      let input = this.el.querySelector('input');
      let root = document.querySelector('html');

      let setMode = (mode) => {
        localStorage.setItem(STORAGE_KEY, mode);
        root.className = mode;
        this.el.dataset.mode = mode;
      };

      setMode(mode);

      if (!input) {
        return;
      }

      input.checked = mode === 'dark';

      input.addEventListener('change', (e) => {
        let mode = e.target.checked ? 'dark' : 'light';
        setMode(mode);
      });
    },
  },
  Popover: {
    mounted() {
      let trigger = this.el.children[0];
      let menu = this.el.children[1];
      let initialized = false;

      this.el.watcher = new MutationObserver((mutations) => {
        for (let mutation of mutations) {
          if (
            mutation.type === 'attributes' &&
            mutation.attributeName === 'style'
          ) {
            if (mutation.target.style.display === 'block' && !initialized) {
              initialized = true;
              let triggerRect = trigger.getBoundingClientRect();
              let menuRect = menu.getBoundingClientRect();

              let top = triggerRect.height + 4;
              let left = menuRect.width / 2 - triggerRect.width / 2;

              menu.style.top = `${top}px`;
              menu.style.left = `-${left}px`;

              document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && menu.style.display === 'block') {
                  liveSocket.execJS(
                    this.el,
                    this.el.getAttribute('data-cancel')
                  );
                }
              });
            }
          }
        }
      });

      this.el.watcher.observe(menu, { attributes: true });
    },
  },
};

let csrfToken = document
  .querySelector("meta[name='csrf-token']")
  .getAttribute('content');
let liveSocket = new LiveSocket('/live', Socket, {
  hooks: { ...Hooks, ...getHooks(Components) },
  longPollFallbackMs: 500,
  params: { _csrf_token: csrfToken },
});

// Show progress bar on live navigation and form submits
topbar.config({ barColors: { 0: '#29d' }, shadowColor: 'rgba(0, 0, 0, .3)' });
window.addEventListener('phx:page-loading-start', (_info) => topbar.show(300));
window.addEventListener('phx:page-loading-stop', (_info) => topbar.hide());

// connect if there are any LiveViews on the page
liveSocket.connect();

// expose liveSocket on window for web console debug logs and latency simulation:
// >> liveSocket.enableDebug()
// >> liveSocket.enableLatencySim(1000)  // enabled for duration of browser session
// >> liveSocket.disableLatencySim()
window.liveSocket = liveSocket;
