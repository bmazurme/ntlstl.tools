import paymentsApi from '../index';

export type SubscriptionStatus = {
  isActive: boolean;
  id: number | null;
};

const paymentsApiEndpoints = paymentsApi
  .enhanceEndpoints({
    addTagTypes: ['Payments'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      payments: builder.mutation<SubscriptionStatus, void>({
        query: () => ({
          url: 'payments',
          method: 'GET',
        }),
        invalidatesTags: ['Payments'],
      }),
    }),
  });

export const {
  usePaymentsMutation,
} = paymentsApiEndpoints;
export { paymentsApiEndpoints };
