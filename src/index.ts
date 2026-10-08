import {render} from './template.js';

export {default as createSingleton} from './addons/createSingleton.js';
export {default as delegate} from './addons/delegate.js';
export {default as animateFill} from './plugins/animateFill.js';
export {default as followCursor} from './plugins/followCursor.js';
export {default as inlinePositioning} from './plugins/inlinePositioning.js';
export {default as sticky} from './plugins/sticky.js';
export {ROUND_ARROW as roundArrow} from './constants.js';
export type {
  Content,
  CreateSingletonInstance,
  Instance,
  Props,
  DefaultProps,
  ReferenceElement,
} from './types.js'
export type {
  State,
} from '@popperjs/core';

import bindGlobalEventListeners, {
  currentInput,
} from './bindGlobalEventListeners.js';
import createTippy, {mountedInstances} from './createTippy.js';
import {getArrayOfElements, isElement, isReferenceElement} from './dom-utils.js';
import {defaultProps, setDefaultProps, validateProps} from './props.js';
import {HideAll, HideAllOptions, Instance, Props, Targets} from './types.js';
import {validateTargets, warnWhen} from './validation.js';
export {createTippy};

function tippy(
  targets: Targets,
  optionalProps: Partial<Props> = {}
): Instance | Instance[] {
  const plugins = defaultProps.plugins.concat(optionalProps.plugins || []);

  /* istanbul ignore else */
  if (true /*__DEV__*/) {
    validateTargets(targets);
    validateProps(optionalProps, plugins);
  }

  bindGlobalEventListeners();

  const passedProps: Partial<Props> = {...optionalProps, plugins};

  const elements = getArrayOfElements(targets);

  /* istanbul ignore else */
  if (true /*__DEV__*/) {
    const isSingleContentElement = isElement(passedProps.content);
    const isMoreThanOneReferenceElement = elements.length > 1;
    warnWhen(
      isSingleContentElement && isMoreThanOneReferenceElement,
      [
        'tippy() was passed an Element as the `content` prop, but more than',
        'one tippy instance was created by this invocation. This means the',
        'content element will only be appended to the last tippy instance.',
        '\n\n',
        'Instead, pass the .innerHTML of the element, or use a function that',
        'returns a cloned version of the element instead.',
        '\n\n',
        '1) content: element.innerHTML\n',
        '2) content: () => element.cloneNode(true)',
      ].join(' ')
    );
  }

  const instances: Instance[] = [];
  elements.forEach((reference) => {
    if (reference) {
      const instance = createTippy(reference, passedProps);
      instances.push(instance);
    }
  });

  const result = isElement(targets) ? instances[0] : instances;
  return result;
}

tippy.defaultProps = defaultProps;
tippy.setDefaultProps = setDefaultProps;
tippy.currentInput = currentInput;

tippy.setDefaultProps({render});

export {
  tippy,
};
export default tippy;

export const hideAll: HideAll = ({
  exclude: excludedReferenceOrInstance,
  duration,
}: HideAllOptions = {}) => {
  mountedInstances.forEach((instance) => {
    let isExcluded = false;

    if (excludedReferenceOrInstance) {
      isExcluded = isReferenceElement(excludedReferenceOrInstance)
        ? instance.reference === excludedReferenceOrInstance
        : instance.popper === (excludedReferenceOrInstance as Instance).popper;
    }

    if (!isExcluded) {
      const originalDuration = instance.props.duration;

      instance.setProps({duration});
      instance.hide();

      if (!instance.state.isDestroyed) {
        instance.setProps({duration: originalDuration});
      }
    }
  });
};
