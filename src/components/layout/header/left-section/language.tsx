import React from 'react';
import {Dropdown} from "flowbite-react";
const languageDropDown=[
    {label:'France',value:'fr'},
    {label:'Viet Nam',value:'vn'},
    {label:'English',value:'en'},
    {label:'Arabic',value:'ar'},
]
const Language = () => {
    return (
        <Dropdown inline label={'Language'}>
            {
                languageDropDown.map((item)=><button key={item.value}>{item.label}</button>)
            }
        </Dropdown>
    );
};

export default Language;