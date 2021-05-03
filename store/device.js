export const ACTIONS = {
  loadDevice,
};

export const ACTION_TYPES = {
  DEVICE_LOAD: 'DEVICE/DEVICE_LOAD',
};

const INITIAL_STATE = {
  type: 'desktop',
  isMobile: false,
};

const device = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case ACTION_TYPES.DEVICE_LOAD:
      return payload;
    default:
      return state;
  }
};

// ACTIONS
function loadDevice(payload = []) {
  return { type: ACTION_TYPES.DEVICE_LOAD, payload };
}

export default device;
