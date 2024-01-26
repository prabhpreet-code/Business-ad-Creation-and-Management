import React from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import EditForm from "../components/forms/EditAd/EditForm";

const Edit = () => {
  {/*Fetching the params from route
*/}
  const params=useParams();

  return (
    <div>
      <Navbar/>
      <EditForm objectId={params.id}/>
    </div>
  )
}

export default Edit
