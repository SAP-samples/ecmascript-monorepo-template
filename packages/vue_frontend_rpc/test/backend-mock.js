const ASYNC_NOOP = async () => {};

const DefaultRPCFunctions = {
  onFrontendReady: ASYNC_NOOP,
  save: ASYNC_NOOP,
};

/**
 * This function gets some function implementations that should be available when calling via RPC.
 * @param userProvidedRpcApis - functions implementations
 * @returns invoke mock function. When it will be called with the injected function implementation, this given mock implementation
 * will be executed. Other non given functions will have default empty implementation.
 */
export function backendMock(userProvidedRpcApis) {
  return async function invokeMock(funcName, params) {
    const actualOpts = {};
    for (const [rpcFuncName, rpcFuncDefault] of Object.entries(
      DefaultRPCFunctions
    )) {
      // choose between user (optional) provided and default (NOOP)
      actualOpts[rpcFuncName] =
        userProvidedRpcApis[rpcFuncName] || rpcFuncDefault;
    }
    if (actualOpts[funcName]) {
      return actualOpts[funcName].apply(null, params);
    } else {
      throw "Invalid function name";
    }
  };
}
