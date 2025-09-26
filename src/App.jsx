import React from 'react'
import HomePage from './pages/HomePage';
import MainLayout from './layouts/MainLayout';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import JobsPage from './pages/JobsPage';
import NotFoundPage from './pages/NotFound';
import JobsDetailsPage,{jobLoader} from './pages/JobsDetailsPage';
import AddJob from './pages/AddJob';
import EditJob from './pages/EditJob';


function App() {
  //Add new job
  const addJob = async(newJob)=> {
    const res = await fetch('/api/jobs', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify(newJob)
    });
    return;
  }

  //Delete job
  const deleteJob = async(id)=> {
    const res = await fetch(`/api/jobs/${id}`, {
      method: 'DELETE',
    });
    return;
  }

  //Edit/Update Job
  const updatedJob = async(updateJob)=> {
    const res = await fetch(`/api/jobs/${updateJob.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify(updateJob)
    });
    return;
  }

  const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout/>}>
      <Route index element={<HomePage/>}/>
      <Route path='/jobs' element={<JobsPage/>}/>
      <Route path='/jobs/:id' element={<JobsDetailsPage deleteJob={deleteJob}/>} loader={jobLoader}/>
      <Route path='/jobs/edit/:id' element={<EditJob updateJob={updatedJob}/>} loader={jobLoader}/>
      <Route path='/addJob' element={<AddJob addNewJob={addJob}/>} />
      <Route path='*' element={<NotFoundPage/>}/>
    </Route>
  )
)

  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App