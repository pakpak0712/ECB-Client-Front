import { DependencyList, EffectCallback, useEffect, useRef } from 'react';

const useDidMountEffect = (effect: EffectCallback, deps: DependencyList) => {
	const semaphore = useRef(1);

	useEffect(() => {
		let effectReturns: void | (() => void) = () => false;

		if (semaphore.current > 0) {
			semaphore.current--;
		} else {
			effectReturns = effect();
		}

		if (effectReturns && typeof effectReturns === 'function') {
			return effectReturns;
		}
		return undefined;
	}, deps);
};

export default useDidMountEffect;
