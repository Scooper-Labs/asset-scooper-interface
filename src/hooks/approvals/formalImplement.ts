// const approveTTokens = () => {
//   setIsBatchApprovalLoading(true);

//   sendCalls(
//     {
//       calls: approveCalls,
//     },
//     {
//       onSuccess(data, variables, context) {
//         CustomToast(
//           toast,
//           "Success! Your tokens have been approved. You're all set to sweep!",
//           4000,
//           "top"
//         );
//       },
//       onError(error) {
//         console.error("Approval failed:", error);
//         CustomToast(
//           toast,
//           "Oops! There was an issue approving your tokens. Please try again, and let us know if you need any help.",
//           4000,
//           "top"
//         );
//       },
//       onSettled() {
//         setIsBatchApprovalLoading(false);
//       },
//     }
//   );
// };
