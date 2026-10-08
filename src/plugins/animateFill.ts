import {BACKDROP_CLASS} from '../constants.js';
import {div, setVisibilityState} from '../dom-utils.js';
import {getChildren} from '../template.js';
import {AnimateFill} from '../types.js';
import {errorWhen} from '../validation.js';

const animateFill: AnimateFill = {
  name: 'animateFill',
  defaultValue: false,
  fn(instance) {
    // @ts-ignore
    if (!instance.props.render?.$$tippy) {
      if (true /*__DEV__*/) {
        errorWhen(
          instance.props.animateFill,
          'The `animateFill` plugin requires the default render function.'
        );
      }

      return {};
    }

    const {box, content} = getChildren(instance.popper);

    const backdrop = instance.props.animateFill
      ? createBackdropElement()
      : null;

    return {
      onCreate(): void {
        if (backdrop) {
          box.insertBefore(backdrop, box.firstElementChild!);
          box.setAttribute('data-animatefill', '');
          box.style.overflow = 'hidden';

          instance.setProps({arrow: false, animation: 'shift-away'});
        }
      },
      onMount(): void {
        if (backdrop) {
          const {transitionDuration} = box.style;
          const duration = Number(transitionDuration.replace('ms', ''));

          // The content should fade in after the backdrop has mostly filled the
          // tooltip element. `clip-path` is the other alternative but is not
          // well-supported and is buggy on some devices.
          content.style.transitionDelay = `${Math.round(duration / 10)}ms`;

          backdrop.style.transitionDuration = transitionDuration;
          setVisibilityState([backdrop], 'visible');
        }
      },
      onShow(): void {
        if (backdrop) {
          backdrop.style.transitionDuration = '0ms';
        }
      },
      onHide(): void {
        if (backdrop) {
          setVisibilityState([backdrop], 'hidden');
        }
      },
    };
  },
};

export default animateFill;

function createBackdropElement(): HTMLDivElement {
  const backdrop = div();
  backdrop.className = BACKDROP_CLASS;
  setVisibilityState([backdrop], 'hidden');
  return backdrop;
}
