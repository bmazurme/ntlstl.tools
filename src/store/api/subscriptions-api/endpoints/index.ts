import subscriptionsApi from '../index';

type SubscriptionStatus = {
  isActive: boolean;
  id: number;
};

const subscriptionsApiEndpoints = subscriptionsApi
  .enhanceEndpoints({
    addTagTypes: ['Subscriptions'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getStatus: builder.mutation<SubscriptionStatus, void>({
        query: () => ({
          url: 'subscriptions/status',
          method: 'GET',
        }),
        invalidatesTags: ['Subscriptions'],
      }),
      renew: builder.mutation<void, { id: number }>({
        query: ({ id }) => ({
          url: `subscriptions/${id}/renew`,
          method: 'POST',
        }),
        invalidatesTags: ['Subscriptions'],
      }),
    }),
  });

export const {
  useGetStatusMutation,
  useRenewMutation,
} = subscriptionsApiEndpoints;
export { subscriptionsApiEndpoints };
