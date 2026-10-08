import { expectType } from 'tsd';
import tippy, { delegate, createSingleton, animateFill, followCursor, inlinePositioning, sticky, hideAll, roundArrow, } from './src/types.js';
const singleTarget = document.createElement('div');
const mulitpleTargets = document.querySelectorAll('div');
expectType(tippy(singleTarget));
expectType(tippy(singleTarget, { content: 'hello' }));
expectType(tippy(mulitpleTargets));
expectType(tippy(mulitpleTargets, { content: 'hello' }));
expectType(delegate(singleTarget, { target: '.child' }));
expectType(delegate(singleTarget, { target: '.child', content: 'hello' }));
expectType(delegate(mulitpleTargets, { target: '.child' }));
expectType(delegate(mulitpleTargets, { target: '.child', content: 'hello' }));
const tippyInstances = [tippy(singleTarget), tippy(singleTarget)];
const singleton = createSingleton(tippyInstances);
expectType(createSingleton(tippyInstances));
expectType(createSingleton(tippyInstances, { content: 'hello' }));
expectType(createSingleton(tippyInstances, { overrides: ['content'] }));
expectType(singleton.setInstances);
// TODO: I want to assert that these *don't* error, but `tsd` does not provide
// such a function(?)
createSingleton(tippyExtended('button'));
singleton.setInstances(tippyExtended('button'));
expectType(tippy(singleTarget, {
    plugins: [animateFill, followCursor, inlinePositioning, sticky],
}));
const customPlugin = {
    name: 'custom',
    defaultValue: 42,
    fn(instance) {
        expectType(instance);
        expectType(instance.props.custom);
        return {};
    },
};
expectType(tippyExtended(singleTarget, {
    custom: 42,
    plugins: [customPlugin],
}));
expectType(hideAll({ duration: 50, exclude: tippy(singleTarget) }));
expectType(roundArrow);
