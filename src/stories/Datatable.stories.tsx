import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import Datatable, { DatatableProps } from 'components/React/Datatable/Datatable';
import '../App.scss';

const columns = [
    { Header: "Organization English", accessor: 'organizationNameEn' },
    { Header: "Post", accessor: 'post' },
    { Header: "Service", accessor: 'service' },
    { Header: "Group Name", accessor: 'groupName' },
    { Header: "Sub-Group Name", accessor: 'subGroupName' },
    { Header: "Class Name", accessor: 'className' },
    { Header: "Advertisement Code", accessor: 'advertisementCode' },
    { Header: "Payment Last Date", accessor: 'paymentLastDateEn' },
    { Header: "Payment Last Date Nepali", accessor: 'paymentLastDateNp' },
    { Header: "Last Date Submission", accessor: 'lastDateForSubmissionEn' },
    { Header: "Last Date Submission", accessor: 'lastDateForSubmissionNp' },
    { Header: "Total Vacancy", accessor: 'totalVacancy' }
];

const colData = [
    {"groupName":null,"subGroupName":null,"advertisementCode":"21068-21068/2077-78","totalVacancy":"1","service":"विविध","post":"कम्प्युटर अपरेटर","lastDateForSubmissionNp":"2077-11-23","paymentLastDateEn":"2021-02-28","paymentLastDateNp":"2077-11-16","lastDateForSubmissionEn":"2021-03-07","organizationNameEn":"Hetauda Office","organizationNameNp":"परदेश लोकसेवा आयोग, हेटौडा","className":"पाँचौ"},{"groupName":"सिभिल","subGroupName":"बिल्डिङ्ग एण्ड आर्किटेक्ट","advertisementCode":"21081-21082/2077-78","totalVacancy":"2","service":"इञ्जिनियरिङ्ग","post":"सब इञ्जिनियर","lastDateForSubmissionNp":"2077-11-23","paymentLastDateEn":"2021-02-28","paymentLastDateNp":"2077-11-16","lastDateForSubmissionEn":"2021-03-07","organizationNameEn":"Hetauda Office","organizationNameNp":"परदेश लोकसेवा आयोग, हेटौडा","className":"पाँचौ"},{"groupName":"सिभिल","subGroupName":"बिल्डिङ्ग एण्ड आर्किटेक्ट","advertisementCode":"1-1/2077-78","totalVacancy":"12","service":"इञ्जिनियरिङ्ग","post":"सब इञ्जिनियर","lastDateForSubmissionNp":"2077-11-12","paymentLastDateEn":"2021-02-24","paymentLastDateNp":"2077-11-12","lastDateForSubmissionEn":"2021-02-24","organizationNameEn":"Hetauda Office","organizationNameNp":"परदेश लोकसेवा आयोग, हेटौडा","className":"पाँचौ"},{"groupName":"सर्भे","subGroupName":null,"advertisementCode":"21073-21073/2077-78","totalVacancy":"2","service":"इञ्जिनियरिङ्ग","post":"सब इञ्जिनियर","lastDateForSubmissionNp":"2077-11-19","paymentLastDateEn":"2021-02-24","paymentLastDateNp":"2077-11-12","lastDateForSubmissionEn":"2021-03-03","organizationNameEn":"Hetauda Office","organizationNameNp":"परदेश लोकसेवा आयोग, हेटौडा","className":"पाँचौ"},{"groupName":null,"subGroupName":null,"advertisementCode":"21050-21053/2077-78","totalVacancy":"4","service":"विविध","post":"महिला विकास निरीक्षक","lastDateForSubmissionNp":"2077-11-16","paymentLastDateEn":"2021-02-21","paymentLastDateNp":"2077-11-09","lastDateForSubmissionEn":"2021-02-28","organizationNameEn":"Hetauda Office","organizationNameNp":"परदेश लोकसेवा आयोग, हेटौडा","className":"पाँचौ"},{"groupName":"सिभिल","subGroupName":"बिल्डिङ्ग एण्ड आर्किटेक्ट","advertisementCode":"21042-21043/2077-78","totalVacancy":"4","service":"इञ्जिनियरिङ्ग","post":"सब इञ्जिनियर","lastDateForSubmissionNp":"2077-11-05","paymentLastDateEn":"2021-01-25","paymentLastDateNp":"2077-10-12","lastDateForSubmissionEn":"2021-02-17","organizationNameEn":"Hetauda Office","organizationNameNp":"परदेश लोकसेवा आयोग, हेटौडा","className":"पाँचौ"},{"groupName":"रेडियोग्राफी","subGroupName":null,"advertisementCode":"21029-21030/2077-78","totalVacancy":"2","service":"स्वास्थ्य","post":"रेडियोग्राफर","lastDateForSubmissionNp":"2077-11-05","paymentLastDateEn":"2021-01-15","paymentLastDateNp":"2077-10-02","lastDateForSubmissionEn":"2021-02-17","organizationNameEn":"Hetauda Office","organizationNameNp":"परदेश लोकसेवा आयोग, हेटौडा","className":"पाँचौ"},{"groupName":"रेडियोग्राफी","subGroupName":null,"advertisementCode":"21031-21031/2077-78","totalVacancy":"1","service":"स्वास्थ्य","post":"रेडियोग्राफर","lastDateForSubmissionNp":"2077-11-06","paymentLastDateEn":"2021-01-15","paymentLastDateNp":"2077-10-02","lastDateForSubmissionEn":"2021-02-18","organizationNameEn":"Hetauda Office","organizationNameNp":"परदेश लोकसेवा आयोग, हेटौडा","className":"पाँचौ"},{"groupName":"सर्भे","subGroupName":null,"advertisementCode":"21025-21026/2077-78","totalVacancy":"2","service":"इञ्जिनियरिङ्ग","post":"अमिन","lastDateForSubmissionNp":"2077-11-20","paymentLastDateEn":"2021-01-14","paymentLastDateNp":"2077-10-01","lastDateForSubmissionEn":"2021-03-04","organizationNameEn":"Hetauda Office","organizationNameNp":"परदेश लोकसेवा आयोग, हेटौडा","className":"पाँचौ"},{"groupName":"लेखा","subGroupName":null,"advertisementCode":"21027-21028/2077-78","totalVacancy":"2","service":"प्रशासन","post":"लेखापाल/आन्तरिक लेखापरीक्षक","lastDateForSubmissionNp":"2077-11-05","paymentLastDateEn":"2021-01-12","paymentLastDateNp":"2077-10-01","lastDateForSubmissionEn":"2021-02-17","organizationNameEn":"Hetauda Office","organizationNameNp":"परदेश लोकसेवा आयोग, हेटौडा","className":"पाँचौ"},
    {"groupName":"सिभिल","subGroupName":"बिल्डिङ्ग एण्ड आर्किटेक्ट","advertisementCode":"21081-21082/2077-78","totalVacancy":"2","service":"इञ्जिनियरिङ्ग","post":"सब इञ्जिनियर","lastDateForSubmissionNp":"2077-11-23","paymentLastDateEn":"2021-02-28","paymentLastDateNp":"2077-11-16","lastDateForSubmissionEn":"2021-03-07","organizationNameEn":"Hetauda Office","organizationNameNp":"परदेश लोकसेवा आयोग, हेटौडा","className":"पाँचौ"},{"groupName":"सिभिल","subGroupName":"बिल्डिङ्ग एण्ड आर्किटेक्ट","advertisementCode":"1-1/2077-78","totalVacancy":"12","service":"इञ्जिनियरिङ्ग","post":"सब इञ्जिनियर","lastDateForSubmissionNp":"2077-11-12","paymentLastDateEn":"2021-02-24","paymentLastDateNp":"2077-11-12","lastDateForSubmissionEn":"2021-02-24","organizationNameEn":"Hetauda Office","organizationNameNp":"परदेश लोकसेवा आयोग, हेटौडा","className":"पाँचौ"},{"groupName":"सर्भे","subGroupName":null,"advertisementCode":"21073-21073/2077-78","totalVacancy":"2","service":"इञ्जिनियरिङ्ग","post":"सब इञ्जिनियर","lastDateForSubmissionNp":"2077-11-19","paymentLastDateEn":"2021-02-24","paymentLastDateNp":"2077-11-12","lastDateForSubmissionEn":"2021-03-03","organizationNameEn":"Hetauda Office","organizationNameNp":"परदेश लोकसेवा आयोग, हेटौडा","className":"पाँचौ"},{"groupName":null,"subGroupName":null,"advertisementCode":"21050-21053/2077-78","totalVacancy":"4","service":"विविध","post":"महिला विकास निरीक्षक","lastDateForSubmissionNp":"2077-11-16","paymentLastDateEn":"2021-02-21","paymentLastDateNp":"2077-11-09","lastDateForSubmissionEn":"2021-02-28","organizationNameEn":"Hetauda Office","organizationNameNp":"परदेश लोकसेवा आयोग, हेटौडा","className":"पाँचौ"},{"groupName":"सिभिल","subGroupName":"बिल्डिङ्ग एण्ड आर्किटेक्ट","advertisementCode":"21042-21043/2077-78","totalVacancy":"4","service":"इञ्जिनियरिङ्ग","post":"सब इञ्जिनियर","lastDateForSubmissionNp":"2077-11-05","paymentLastDateEn":"2021-01-25","paymentLastDateNp":"2077-10-12","lastDateForSubmissionEn":"2021-02-17","organizationNameEn":"Hetauda Office","organizationNameNp":"परदेश लोकसेवा आयोग, हेटौडा","className":"पाँचौ"},{"groupName":"रेडियोग्राफी","subGroupName":null,"advertisementCode":"21029-21030/2077-78","totalVacancy":"2","service":"स्वास्थ्य","post":"रेडियोग्राफर","lastDateForSubmissionNp":"2077-11-05","paymentLastDateEn":"2021-01-15","paymentLastDateNp":"2077-10-02","lastDateForSubmissionEn":"2021-02-17","organizationNameEn":"Hetauda Office","organizationNameNp":"परदेश लोकसेवा आयोग, हेटौडा","className":"पाँचौ"},{"groupName":"रेडियोग्राफी","subGroupName":null,"advertisementCode":"21031-21031/2077-78","totalVacancy":"1","service":"स्वास्थ्य","post":"रेडियोग्राफर","lastDateForSubmissionNp":"2077-11-06","paymentLastDateEn":"2021-01-15","paymentLastDateNp":"2077-10-02","lastDateForSubmissionEn":"2021-02-18","organizationNameEn":"Hetauda Office","organizationNameNp":"परदेश लोकसेवा आयोग, हेटौडा","className":"पाँचौ"},{"groupName":"सर्भे","subGroupName":null,"advertisementCode":"21025-21026/2077-78","totalVacancy":"2","service":"इञ्जिनियरिङ्ग","post":"अमिन","lastDateForSubmissionNp":"2077-11-20","paymentLastDateEn":"2021-01-14","paymentLastDateNp":"2077-10-01","lastDateForSubmissionEn":"2021-03-04","organizationNameEn":"Hetauda Office","organizationNameNp":"परदेश लोकसेवा आयोग, हेटौडा","className":"पाँचौ"},{"groupName":"लेखा","subGroupName":null,"advertisementCode":"21027-21028/2077-78","totalVacancy":"2","service":"प्रशासन","post":"लेखापाल/आन्तरिक लेखापरीक्षक","lastDateForSubmissionNp":"2077-11-05","paymentLastDateEn":"2021-01-12","paymentLastDateNp":"2077-10-01","lastDateForSubmissionEn":"2021-02-17","organizationNameEn":"Hetauda Office","organizationNameNp":"परदेश लोकसेवा आयोग, हेटौडा","className":"पाँचौ"}
]

export default {
    title: 'Example/Datatable',
    component: Datatable,
    argTypes: {
        size: { 
            control: {
                type: 'inline-radio',
                options: ['sm', 'md', 'lg', 'xl'],
              },
        },
        filter: {
            table: {
                category: 'Table Filter'
            }
        },
        filterText: {
            table: {
                category: 'Table Filter'
            }
        },
         serverPagination: {
            table: {
                category: 'Server Side Pagination'
            }
         },
         serverPaginationParams: {
            control: { type: "object" },
            defaultValue: {
                gotoPage: (count = 1) => "Paginate Action",
                currentPage: 1,
                rowPerPage: 10,
                totalItem: 10,
            },
            table: {
                category: 'Server Side Pagination'
            }
         }
    },
} as Meta;

const Template: Story<DatatableProps> = (args) => <Datatable {...args} />;

export const General = Template.bind({});
General.args = {
    columns: columns,
    data: colData,
    pagination: true
};