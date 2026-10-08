import tippy, {hideAll} from './index.js';
import createSingleton from './addons/createSingleton.js';
import delegate from './addons/delegate.js';
import animateFill from './plugins/animateFill.js';
import followCursor from './plugins/followCursor.js';
import inlinePositioning from './plugins/inlinePositioning.js';
import sticky from './plugins/sticky.js';
import {ROUND_ARROW} from './constants.js';

tippy.setDefaultProps({
  plugins: [animateFill, followCursor, inlinePositioning, sticky],
  animation: false,
});

export {
  hideAll,
  createSingleton,
  delegate,
  animateFill,
  followCursor,
  inlinePositioning,
  sticky,
  ROUND_ARROW as roundArrow,
};

export {
  tippy,
};
export default tippy;
