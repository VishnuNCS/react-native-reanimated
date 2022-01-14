import { Dimensions } from 'react-native';
import { withSequence, withTiming } from '../../animation';
import { ComplexAnimationBuilder } from '../animationBuilder';
import {
  EntryAnimationsValues,
  ExitAnimationsValues,
  AnimationConfigFunction,
  IEntryAnimationBuilder,
  IExitAnimationBuilder,
} from '../animationBuilder/commonTypes';

const { width } = Dimensions.get('window');

export class LightSpeedInRight
  extends ComplexAnimationBuilder
  implements IEntryAnimationBuilder {
  static createInstance(): LightSpeedInRight {
    return new LightSpeedInRight();
  }

  build = (): AnimationConfigFunction<EntryAnimationsValues> => {
    const delayFunction = this.getDelayFunction();
    const [animation, config] = this.getAnimationAndConfig();
    const delay = this.getDelay();
    const duration = this.getDuration();
    const callback = this.callbackV;

    return () => {
      'worklet';
      return {
        animations: {
          opacity: delayFunction(delay, withTiming(1, { duration: duration })),
          transform: [
            {
              translateX: delayFunction(
                delay,
                animation(0, { ...config, duration: duration * 0.7 })
              ),
            },
            {
              skewX: delayFunction(
                delay,
                withSequence(
                  withTiming('10deg', { duration: duration * 0.7 }),
                  withTiming('-5deg', { duration: duration * 0.15 }),
                  withTiming('0deg', { duration: duration * 0.15 })
                )
              ),
            },
          ],
        },
        initialValues: {
          opacity: 0,
          transform: [{ translateX: width }, { skewX: '-45deg' }],
        },
        callback: callback,
      };
    };
  };
}

export class LightSpeedInLeft
  extends ComplexAnimationBuilder
  implements IEntryAnimationBuilder {
  static createInstance(): LightSpeedInLeft {
    return new LightSpeedInLeft();
  }

  build = (): AnimationConfigFunction<EntryAnimationsValues> => {
    const delayFunction = this.getDelayFunction();
    const [animation, config] = this.getAnimationAndConfig();
    const delay = this.getDelay();
    const duration = this.getDuration();
    const callback = this.callbackV;

    return () => {
      'worklet';
      return {
        animations: {
          opacity: delayFunction(delay, withTiming(1, { duration: duration })),
          transform: [
            {
              translateX: delayFunction(
                delay,
                animation(0, { ...config, duration: duration * 0.7 })
              ),
            },
            {
              skewX: delayFunction(
                delay,
                withSequence(
                  withTiming('-10deg', { duration: duration * 0.7 }),
                  withTiming('5deg', { duration: duration * 0.15 }),
                  withTiming('0deg', { duration: duration * 0.15 })
                )
              ),
            },
          ],
        },
        initialValues: {
          opacity: 0,
          transform: [{ translateX: -width }, { skewX: '45deg' }],
        },
        callback: callback,
      };
    };
  };
}

export class LightSpeedOutRight
  extends ComplexAnimationBuilder
  implements IExitAnimationBuilder {
  static createInstance(): LightSpeedOutRight {
    return new LightSpeedOutRight();
  }

  build = (): AnimationConfigFunction<ExitAnimationsValues> => {
    const delayFunction = this.getDelayFunction();
    const [animation, config] = this.getAnimationAndConfig();
    const delay = this.getDelay();
    const callback = this.callbackV;

    return () => {
      'worklet';
      return {
        animations: {
          opacity: delayFunction(delay, animation(0, config)),
          transform: [
            {
              translateX: delayFunction(delay, animation(width, config)),
            },
            {
              skewX: delayFunction(delay, animation('-45deg', config)),
            },
          ],
        },
        initialValues: {
          opacity: 1,
          transform: [{ translateX: 0 }, { skewX: '0deg' }],
        },
        callback: callback,
      };
    };
  };
}

export class LightSpeedOutLeft
  extends ComplexAnimationBuilder
  implements IExitAnimationBuilder {
  static createInstance(): LightSpeedOutLeft {
    return new LightSpeedOutLeft();
  }

  build = (): AnimationConfigFunction<ExitAnimationsValues> => {
    const delayFunction = this.getDelayFunction();
    const [animation, config] = this.getAnimationAndConfig();
    const delay = this.getDelay();
    const callback = this.callbackV;

    return () => {
      'worklet';
      return {
        animations: {
          opacity: delayFunction(delay, animation(0, config)),
          transform: [
            {
              translateX: delayFunction(delay, animation(-width, config)),
            },
            {
              skewX: delayFunction(delay, animation('45deg', config)),
            },
          ],
        },
        initialValues: {
          opacity: 1,
          transform: [{ translateX: 0 }, { skewX: '0deg' }],
        },
        callback: callback,
      };
    };
  };
}
