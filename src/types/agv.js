export const AgvType = {
  FORK: 'fork',
  PALLET: 'pallet',
  HIGH_MAST: 'high_mast',
  CONVEYOR: 'conveyor',
  AMR: 'amr',
};

export const AgvState = {
  IDLE: 'idle',
  MOVING: 'moving',
  CHARGING: 'charging',
  ERROR: 'error',
};

export const ErrorType = {
  UNKNOWN: 'unknown',
  SHUTDOWN: 'shutdown',
  ROUTE_DEVIATION: 'route_deviation',
  SIGNAL_LOSS: 'signal_loss',
  SENSER_ERROR: 'senser_error',
};

export const defaultAgv = {
  id: 0,
  name: '',
  type: AgvType.FORK,
  line: 0,
  battery: 100,
  hasCargo: false,
  state: AgvState.IDLE,
  path: [],
  speed: 0.01,
  hasError: false,
  ErrorType: ErrorType.UNKNOWN,
};
