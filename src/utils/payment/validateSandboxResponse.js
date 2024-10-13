export function validateSandboxResponse(createResponse, executeResponse) {
  // Implement your validation logic here
  if (createResponse && executeResponse) {
    // Check specific conditions as per bKash guidelines
    return (
      createResponse.status === 'Success' &&
      executeResponse.status === 'Success'
    );
  }
  return false;
}
