// Presurvey.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import presurveysReducer from '../../redux/slices/presurveysSlice';
import Presurvey from "../../pages/Supplier/Presurvey";

// Mock the Redux store
const renderWithStore = (initialState) => {
  const store = configureStore({
    reducer: {
      presurveys: presurveysReducer
    },
    preloadedState: { presurveys: initialState }
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
          additionalProp3: true
        }
      }
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


// import React from "react";
// import { render,screen } from "@testing-library/react";
// import { Provider } from "react-redux";
// import { configureStore } from "@reduxjs/toolkit";
// import thunk from 'redux-thunk';
// import Presurvey from "../../pages/Supplier/Presurvey";



// describe('Presurvey component', () => {
//     it('should render loading state', () => {
//         const middlewares = [thunk];
// const mockStore = configureStore(middlewares);
//         const initialState = { presurvey: {status: 'loading', data:null, error:null}};
//         const store = mockStore(initialState);
        
//         render(
//             <Provider store={store}>
//                 <Presurvey supplierId="1004"/>
//             </Provider>
//         );

//         expect(screen.getByText('Loading...')).toBeInTheDocument();
//     });
    
//     it('should render presurvey data', () => {
//         const initialState = {
//             presurvey: {
//                 status: 'succeeded',
//                 data: 
//                 {
//                     "supplierId": "1004",
//                     "preSurvey": 
//                     {
//                       "supplierName": "ACE",
//                       "reportCreationYear": 2023,
//                       "periodStartDate": "01/01/2023",
//                       "periodEndDate": "01/01/2024",
//                       "otherDataToReport": true,
//                       "focusAreas": 
//                       {
//                         "additionalProp1": true,
//                         "additionalProp2": true,
//                         "additionalProp3": true
//                       },
//                       "cdpdataAvailable": true
//                     }
//                 },
//                 error : null,
//             },
//         };
//         const store = mockStore(initialState); 
//         render(
//             <Provider store={store}>
//                 <Presurvey supplierId="1004"/>
//             </Provider>
//         );

        
//         expect(screen.getByText("Supplier: ACE")).toBeInTheDocument();
//         expect(screen.getByText("reportCreationYear: 2023")).toBeInTheDocument();
//         expect(screen.getByText("periodStartDate: 01/01/2023")).toBeInTheDocument();
//         expect(screen.getByText("periodEndDate: 01/01/2024")).toBeInTheDocument();
//         expect(screen.getByText("cdpdataAvailable: true")).toBeInTheDocument();
//         expect(screen.getByText("otherDataToReport: true")).toBeInTheDocument();
                
//    }) ;

//    it('should render error state', () => {
//         const initialState = { presurvey: {status: 'failed',data:{},error: 'Error in fetching Pre-survey details'},
//         };
//         const store = mockStore(initialState);
//         render(
//             <Provider store={store}>
//                 <Presurvey supplierId="1001"/>
//             </Provider>
//         );

//    })
// })