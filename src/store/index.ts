import { configureStore } from '@reduxjs/toolkit';

import {
  authApi,
  usersApi,
  projectsApi,
  activitiesApi,
  subscriptionsApi,
  documentsApi,
  paymentsApi,
  typesApi,
  blocksApi,
  itemsApi,
  rainRoofsApi,
  rainRunoffsApi,
  rainPlacesApi,
  rainConditionsApi,
  heatConsumptionsApi,
  throttlePlateApi,
  pipeDiameterCalculationApi,
  heatLossCalculationApi,
  chatApi,
  collectorCalculationApi,
  projectStatusApi,
  calculationMeterApi,
} from './api/index';

import authReducer from './slices/auth-slice';
import usersReducer from './slices/users-slice';
import activitiesReducer from './slices/activities-slice';
import subscriptionsReducer from './slices/subscriptions-slice';
import projectsReducer from './slices/projects-slice';
import documentsReducer from './slices/documents-slice';
import typesReducer from './slices/types-slice';
import blocksReducer from './slices/blocks-slice';
import itemsReducer from './slices/items-slice';
import rainRoofsReducer from './slices/rain-roofs-slice';
import rainRunoffsReducer from './slices/rain-runoffs-slice';
import rainPlacesReducer from './slices/rain-places-slice';
import rainConditionsReducer from './slices/rain-conditions-slice';
import heatConsumptionReducer from './slices/heat-consumption-slice';
import throttlePlateReducer from './slices/throttle-plate-slice';
import pipeDiameterCalculationReducer from './slices/pipe-diameter-calculation-slice';
import heatLossCalculationReducer from './slices/heat-loss-calculation-slice';
import collectorCalculationReducer from './slices/collector-calculation-slice';
import calculationMeterReducer from './slices/calculation-meter-slice';
// import paymentsReducer from './slices/payments-slice';

export * from './api/projects-api/endpoints/index';
export * from './api/documents-api/endpoints/index';
export * from './api/users-api/endpoints/index';
export * from './api/types-api/endpoints/index';
export * from './api/blocks-api/endpoints/index';
export * from './api/items-api/endpoints/index';
export * from './api/rain-roofs-api/endpoints/index';
export * from './api/rain-runoffs-api/endpoints/index';
export * from './api/rain-places-api/endpoints/index';
export * from './api/rain-conditions-api/endpoints/index';
export * from './api/auth-api/endpoints/index';
export * from './api/activities-api/endpoints/index';
export * from './api/subscriptions-api/endpoints/index';
export * from './api/payments-api/endpoints/index';
export * from './api/heat-consumption-api/endpoints/index';
export * from './api/throttle-plate-api/endpoints/index';
export * from './api/pipe-diameter-calculation-api/endpoints/index';
export * from './api/heat-loss-calculation-api/endpoints/index';
export * from './api/chat-api/endpoints/index';
export * from './api/collector-calculation-api/endpoints/index';
export * from './api/project-status-api/endpoints/index';
export * from './api/calculation-meter-api/endpoints/index';

export * from './slices/index';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    activities: activitiesReducer,
    subscriptions: subscriptionsReducer,
    projects: projectsReducer,
    documents: documentsReducer,
    types: typesReducer,
    blocks: blocksReducer,
    items: itemsReducer,
    rainRoofs: rainRoofsReducer,
    rainRunoffs: rainRunoffsReducer,
    rainPlaces: rainPlacesReducer,
    rainConditions: rainConditionsReducer,
    heatConsumption: heatConsumptionReducer,
    throttlePlate: throttlePlateReducer,
    pipeDiameterCalculation: pipeDiameterCalculationReducer,
    heatLossCalculation: heatLossCalculationReducer,
    collectorCalculation: collectorCalculationReducer,
    calculationMeter: calculationMeterReducer,
    // payments: paymentsReducer,
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [projectsApi.reducerPath]: projectsApi.reducer,
    [activitiesApi.reducerPath]: activitiesApi.reducer,
    [subscriptionsApi.reducerPath]: subscriptionsApi.reducer,
    [documentsApi.reducerPath]: documentsApi.reducer,
    [paymentsApi.reducerPath]: paymentsApi.reducer,
    [typesApi.reducerPath]: typesApi.reducer,
    [blocksApi.reducerPath]: blocksApi.reducer,
    [itemsApi.reducerPath]: itemsApi.reducer,
    [rainRoofsApi.reducerPath]: rainRoofsApi.reducer,
    [rainRunoffsApi.reducerPath]: rainRunoffsApi.reducer,
    [rainPlacesApi.reducerPath]: rainPlacesApi.reducer,
    [rainConditionsApi.reducerPath]: rainConditionsApi.reducer,
    [heatConsumptionsApi.reducerPath]: heatConsumptionsApi.reducer,
    [throttlePlateApi.reducerPath]: throttlePlateApi.reducer,
    [pipeDiameterCalculationApi.reducerPath]: pipeDiameterCalculationApi.reducer,
    [heatLossCalculationApi.reducerPath]: heatLossCalculationApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
    [collectorCalculationApi.reducerPath]: collectorCalculationApi.reducer,
    [projectStatusApi.reducerPath]: projectStatusApi.reducer,
    [calculationMeterApi.reducerPath]: calculationMeterApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(
      authApi.middleware,
      usersApi.middleware,
      projectsApi.middleware,
      activitiesApi.middleware,
      subscriptionsApi.middleware,
      documentsApi.middleware,
      paymentsApi.middleware,
      typesApi.middleware,
      blocksApi.middleware,
      itemsApi.middleware,
      rainRoofsApi.middleware,
      rainRunoffsApi.middleware,
      rainPlacesApi.middleware,
      rainConditionsApi.middleware,
      heatConsumptionsApi.middleware,
      throttlePlateApi.middleware,
      pipeDiameterCalculationApi.middleware,
      heatLossCalculationApi.middleware,
      chatApi.middleware,
      collectorCalculationApi.middleware,
      projectStatusApi.middleware,
      calculationMeterApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
