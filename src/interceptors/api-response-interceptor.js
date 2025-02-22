/**
* Response interceptor for generating APIs. Handles the quirks of engine not
* returning an error when an object is missing.
* @private
* @param {Session} session - The session the intercept is being executed on.
* @param {Object} request - The JSON-RPC request.
* @param {Object} response - The response.
* @returns {Object} - Returns the generated API
*/
export default function apiResponseInterceptor(session, request, response) {
  if (response.qHandle && response.qType) {
    return session.getObjectApi({
      handle: response.qHandle,
      type: response.qType,
      id: response.qGenericId,
      genericType: response.qGenericType,
    });
  }
  if (response.qHandle === null && response.qType === null) {
    return session.config.Promise.reject(new Error('Object not found'));
  }
  return response;
}
