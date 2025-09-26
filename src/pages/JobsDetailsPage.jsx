// import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import Spinner from '../components/spinner';
import { Link } from 'react-router-dom';
import { useLoaderData } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { toast } from 'react-toastify';

const JobsDetailsPage = ({deleteJob}) => {
    const navigate = useNavigate();
    const {id} = useParams();
    const jobDetails = useLoaderData();

    const onDeleteClick = (id)=> {
        const confirm = window.confirm('Are you sure you want to delete this job?');
        if(!confirm) return;
        deleteJob(id);

        toast.success("Job Deleted successfully");

        return navigate('/jobs');
    }
    // const [jobDetails, setJobDetails] = useState([]);
    // const [loading, setLoading] = useState(true);

    // useEffect(()=>{
    //     const fetchJobs = async()=> {
    //         try {
    //             const res = await fetch(`/api/jobs/${id}`);
    //             const data = await res.json();
    //             setJobDetails(data);
    //         } catch (error) {
    //             console.log('error loading details');
    //         }finally{
    //             setLoading(false);
    //         }
    //     }
    //     fetchJobs();
    // }, [])

    // return loading ? 
    // <Spinner loading={loading}></Spinner> : 

  return(
    <>
        <section>
            <div className="container m-auto py-6 px-6">
                <Link to="/jobs"
                    className="text-indigo-500 hover:text-indigo-600 flex items-center">
                        <FaArrowLeft className="mr-1"></FaArrowLeft>
                        Back to Job Listings
                    {/* <i className="fas fa-arrow-left mr-2"></i> Back to Job Listings */}
                </Link>
            </div>
        </section>

        <section className="bg-indigo-50">
            <div className="container m-auto py-10 px-6">
                <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                <main>
                    <div
                    className="bg-white p-6 rounded-lg shadow-md text-center md:text-left"
                    >
                    <div className="text-gray-500 mb-4">{jobDetails.type}</div>
                    <h1 className="text-3xl font-bold mb-4">
                        {jobDetails.title}
                    </h1>
                    <div
                        className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start"
                    >
                        <i
                        className="fa-solid fa-location-dot text-lg text-orange-700 mr-2"
                        ></i>
                        <p className="text-orange-700">{jobDetails.location}</p>
                    </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                    <h3 className="text-indigo-800 text-lg font-bold mb-6">
                        Job Description
                    </h3>

                    <p className="mb-4">{jobDetails.description}</p>

                    <h3 className="text-indigo-800 text-lg font-bold mb-2">Salary</h3>

                    <p className="mb-4">{jobDetails.salary}</p>
                    </div>
                </main>

                {/* <!-- Sidebar --> */}
                <aside>
                    {/* <!-- Company Info --> */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-6">Company Info</h3>

                    <h2 className="text-2xl">{jobDetails.company.name}</h2>

                    <p className="my-2">{jobDetails.company.description}</p>

                    <hr className="my-4" />

                    <h3 className="text-xl">Contact Email:</h3>

                    <p className="my-2 bg-indigo-100 p-2 font-bold">{jobDetails.company.contactEmail}</p>

                    <h3 className="text-xl">Contact Phone:</h3>

                    <p className="my-2 bg-indigo-100 p-2 font-bold">{jobDetails.company.contactPhone}</p>
                    </div>

                    {/* <!-- Manage --> */}
                    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                        <h3 className="text-xl font-bold mb-6">Manage Job</h3>
                        <Link to={ `/jobs/edit/${jobDetails.id} `}
                            className="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">
                            Edit Job
                        </Link>
                        <button onClick={() => onDeleteClick(jobDetails.id)}
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">
                            Delete Job
                        </button>
                    </div>
                </aside>
                </div>
            </div>
        </section>
    </>
  )
    
}

const jobLoader = async({params}) => {
    const res = await fetch(`/api/jobs/${params.id}`);
    const data = res.json();
    return data;
}

export {JobsDetailsPage as default, jobLoader};