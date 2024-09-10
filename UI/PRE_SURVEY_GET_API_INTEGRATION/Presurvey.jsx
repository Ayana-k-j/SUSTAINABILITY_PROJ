// Presurvey.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPresurveysBySupplierId } from '../../redux/slices/presurveysSlice';

const Presurvey = ({ supplierId }) => {
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.presurveys);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getPresurveysBySupplierId(supplierId));
    }
  }, [dispatch, status, supplierId]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'failed') {
    return <p>Error: {error}</p>;
  }

  if (status === 'succeeded' && data.preSurvey) {
    const { preSurvey } = data;

    return (
      <ul>
        <li key={preSurvey.supplierName}>
          <div>Supplier: {preSurvey.supplierName}</div>
          <div>Report Creation Year: {preSurvey.reportCreationYear}</div>
          <div>Period Start Date: {preSurvey.periodStartDate}</div>
          <div>Period End Date: {preSurvey.periodEndDate}</div>
          <div>Cdpdata Available: {preSurvey.cdpdataAvailable ? 'Yes' : 'No'}</div>
          <div>Other Data To Report: {preSurvey.otherDataToReport ? 'Yes' : 'No'}</div>
          <div>Focus Areas: {JSON.stringify(preSurvey.focusAreas)}</div>
        </li>
      </ul>
    );
  }

  return null;
};

export default Presurvey;





// //preservey page
// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getPresurveysBySupplierId } from '../../redux/slices/presurveysSlice';

// const Presurvey = ({supplierId}) => {
//   const dispatch = useDispatch();
//   const { data, status, error } = useSelector((state) => {
//     console.log(state.presurveys)
//     return state.presurveys
//   });

//   useEffect(() => {
//     if (status === 'idle') {
//       dispatch(getPresurveysBySupplierId(supplierId));
//     }
//   }, [dispatch]);

//   if (status === 'loading') {
//     return <p>Loading...</p>;
//   }

//   if (status === 'failed') {
//     return <p>Error: {error}</p>;
//   }

//   console.log(data)

//   if(data.preSurvey){
//     return (
//       <ul>
//           <li key={data?.preSurvey?.supplierName}>
//           <>
//           <div>Supplier: {data?.preSurvey?.supplierName}</div>
//           <div>reportCreationYear: {data?.preSurvey?.reportCreationYear}</div>
//           <div>periodStartDate: {data?.preSurvey?.periodStartDate}</div>
//           <div>periodEndDate: {data?.preSurvey?.periodEndDate}</div>
//           <div>cdpdataAvailable: {JSON.stringify(data?.preSurvey?.cdpdataAvailable)}</div>
//           <div>otherDataToReport: {JSON.stringify(data?.preSurvey?.otherDataToReport)}</div>
//           </>
//           </li>
//       </ul>
//     );
//   }else{
//     return <></>;
//   }
// };

// export default Presurvey;

