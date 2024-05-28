import React, { createContext, useState } from 'react';

export const FormContext = createContext();

const FormProvider = ({children})=>{
    const [submitFormData, setSubmitFormData] = useState({
        surveyNumber:'',
        width: '',
        length: '',
        price: '',
        facing: '',
        locationLink: '',
        agentName: '',
        agentMobile: '',
        description: '',
        propertyPhotos: null,
        propertyLocation: null,
      });

      return(
        <FormContext.Provider value={{submitFormData, setSubmitFormData}}>
            {children}
        </FormContext.Provider>
    );
};

export default FormProvider;