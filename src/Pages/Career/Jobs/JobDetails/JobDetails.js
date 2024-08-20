import React from 'react';
import { format } from 'date-fns';
import { Parser } from 'html-to-react';
import { useLoaderData } from 'react-router-dom';

const JobDetails = () => {

    const jobDetails = useLoaderData();
    const { title, photoURL, description, createdAt } = jobDetails;
    console.log(title);

    const htmlParser = new Parser();
    const parsedDescription = htmlParser.parse(description);

    let formattedDate = null;

    if (createdAt) {
        formattedDate = format(new Date(createdAt), "hh:mm a, MMMM dd, yyyy");
    }

    return (
        <div className='p-4 md:p-10'>
            <h3 className='text-lg md:text-4xl font-bold'>{title}</h3>
            {formattedDate && <p className='text-gray-700 text-sm italic mt-4'>{formattedDate}</p>}
            <img src={photoURL} alt='' className='w-5/6 mx-auto rounded my-4' />
            <p className='mt-10 text-base md:text-lg'>{parsedDescription}</p>
        </div>
    );
};

export default JobDetails;