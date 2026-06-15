import typesApi from '../index';

export type ModuleTypeOption = {
  id: number;
  name: string;
  description: string;
  link: string;
};

const typesApiEndpoints = typesApi
  .enhanceEndpoints({
    addTagTypes: ['Types'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getTypes: builder.mutation<ModuleTypeOption[], void>({
        query: () => ({
          url: 'types',
          method: 'GET',
        }),
        invalidatesTags: ['Types'],
      }),
    }),
  });

export const {
  useGetTypesMutation,
} = typesApiEndpoints;
export { typesApiEndpoints };
