// presurveySlice.test.js
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import presurveysReducer from '../../redux/slices/presurveysSlice';
import Presurvey from '../../pages/Supplier/Presurvey';

const renderWithStore = (initialState) => {
  const store = configureStore({
    reducer: {
      presurveys: presurveysReducer,
    },
    preloadedState: {
      presurveys: initialState,
    },
    // No middleware field should be set explicitly unless custom middleware is used.
  });

  return render(
    <Provider store={store}>
      <Presurvey supplierId="123" />
    </Provider>
  );
};

describe('Presurvey Component', () => {
  it('should display loading state when status is loading', () => {
    renderWithStore({ status: 'loading', data: {}, error: null });
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  it('should display error message when status is failed', () => {
    renderWithStore({ status: 'failed', data: {}, error: 'Error message' });
    expect(screen.getByText(/error: error message/i)).toBeInTheDocument();
  });

  it('should display presurvey details when status is succeeded', async () => {
    const mockData = {
      preSurvey: {
        supplierName: 'ACE',
        reportCreationYear: 2023,
        periodStartDate: '01/01/2023',
        periodEndDate: '01/01/2024',
        cdpdataAvailable: true,
        otherDataToReport: true,
        focusAreas: {
          additionalProp1: true,
          additionalProp2: true,
          additionalProp3: true,
        },
      },
    };

    renderWithStore({ status: 'succeeded', data: mockData, error: null });

    expect(await screen.findByText(/Supplier: ACE/i)).toBeInTheDocument();
    expect(screen.getByText(/Report Creation Year: 2023/i)).toBeInTheDocument();
    expect(screen.getByText(/Period Start Date: 01\/01\/2023/i)).toBeInTheDocument();
    expect(screen.getByText(/Period End Date: 01\/01\/2024/i)).toBeInTheDocument();
    expect(screen.getByText(/Cdpdata Available: Yes/i)).toBeInTheDocument();
    expect(screen.getByText(/Other Data To Report: Yes/i)).toBeInTheDocument();
    expect(screen.getByText(/Focus Areas: {"additionalProp1":true,"additionalProp2":true,"additionalProp3":true}/i)).toBeInTheDocument();
  });

  it('should render nothing if data.preSurvey is not available', () => {
    renderWithStore({ status: 'succeeded', data: {}, error: null });
    expect(screen.queryByText(/Supplier:/i)).toBeNull();
  });
});








// // presurveysSlice.test.js
// import { configureStore } from '@reduxjs/toolkit';
// import thunk from 'redux-thunk';
// import presurveysReducer, { getPresurveysBySupplierId } from '../../redux/slices/presurveysSlice';
// import { fetchPresurveyDetails } from '../../services/apiService';

// // Mock the API service
// jest.mock('../../services/apiService');

// // Define the initial state
// const initialState = {
//   data: {},
//   status: 'idle',
//   error: null
// };

// // Create a test store
// const store = configureStore({
//   reducer: {
//     presurveys: presurveysReducer
//   },
//   middleware: [thunk]
// });

// describe('presurveysSlice', () => {
//   beforeEach(() => {
//     store.dispatch({ type: 'presurveys/clear' }); // Clear store before each test
//   });

//   it('should handle initial state', () => {
//     const state = store.getState().presurveys;
//     expect(state).toEqual(initialState);
//   });

//   it('should handle getPresurveysBySupplierId.pending', async () => {
//     fetchPresurveyDetails.mockResolvedValueOnce({ data: { id: '123', name: 'Supplier Name' } });

//     await store.dispatch(getPresurveysBySupplierId('123'));

//     const state = store.getState().presurveys;
//     expect(state.status).toBe('loading');
//   });

//   it('should handle getPresurveysBySupplierId.fulfilled', async () => {
//     fetchPresurveyDetails.mockResolvedValueOnce({ data: { id: '123', name: 'Supplier Name' } });

//     await store.dispatch(getPresurveysBySupplierId('123'));

//     const state = store.getState().presurveys;
//     expect(state.status).toBe('succeeded');
//     expect(state.data).toEqual({ id: '123', name: 'Supplier Name' });
//   });

//   it('should handle getPresurveysBySupplierId.rejected', async () => {
//     fetchPresurveyDetails.mockRejectedValueOnce({ response: { data: 'Error message' } });

//     await store.dispatch(getPresurveysBySupplierId('123'));

//     const state = store.getState().presurveys;
//     expect(state.status).toBe('failed');
//     expect(state.error).toBe('Error message');
//   });
// });



// import presurveysReducer, { getPresurveysBySupplierId } from '../../redux/slices/presurveysSlice';

// describe('Pre-survey slice', () => {
//     const initialState = {
//         data : {},
//         status : 'idle',
//         error: null,
//     };

//     it('should handle initial state', () => {
//         expect(presurveysReducer(undefined, {type: 'unknown'})).toEqual(initialState);
//     });

//     it('should handle the getPresurveysBySupplierId.pending', () =>{
//         const action = {type : getPresurveysBySupplierId.pending.type};
//         const state = presurveysReducer(initialState, action);
//         expect(state).toEqual({
//             ...initialState,
//             status : 'loading',
//         });
//     });
//     it('should handle the getPresurveysBySupplierId.fullfilled', () => {
//         const payload = {
//             "supplierId": "1004",
//             "preSurvey": {
//               "supplierName": "ACE",
//               "reportCreationYear": 2023,
//               "periodStartDate": "01/01/2023",
//               "periodEndDate": "01/01/2024",
//               "otherDataToReport": true,
//               "focusAreas": {
//                 "additionalProp1": true,
//                 "additionalProp2": true,
//                 "additionalProp3": true
//               },
//               "cdpdataAvailable": true
//             }
//         };
//         const action = {type : getPresurveysBySupplierId.fulfilled.type, payload};
//         const state = presurveysReducer(initialState, action);
//         expect(state).toEqual({
//             data : payload,
//             status : 'loading',
//             error : null,
//         });
//     });
    
//     it('should handle the getPresurveysBySupplierId.rejected', () => {
//         const error = 'error in fetching the Pre-survey details';
//         const action = { type : getPresurveysBySupplierId.rejected.type, payload: error};
//         const state = presurveysReducer(initialState,action);
//         expect(state).toEqual({
//             ...initialState,
//             status : 'failed',
//             error : error,
//         });
//     });

// });