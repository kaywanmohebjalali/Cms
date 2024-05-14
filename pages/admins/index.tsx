import connectToDB from '@/utils/db';
import React from 'react'
import adminModel from '@/models/admins'
import Teachers from '@/components/templates/Teachers/Teachers';
import AddAdmin from '@/components/modules/addAdmin/AddAdmin';
import Admins from '@/components/templates/Admins/Admins';

const AdminPage = ({ admins, error }: { admins: [], error: any }) => {
  
  return <section className="container main">
    <div className="top-main">
      <h1> ادمین ها</h1>
      <AddAdmin />
    </div>
    <Admins  admins={admins} error={error} />
  </section>
};

export default AdminPage;

export async function getServerSideProps(context: any) {
  const { query } = context
  try {
    connectToDB()
   
    let admins: any
    if (Object.keys(query).length) {

      admins = await adminModel.find({ fullName: { $regex: query?.filter } });

    } else {

      admins = await adminModel.find()
    }

    return {
      props: { admins: JSON.parse(JSON.stringify(admins)), error: null },

    }
  } catch (error: any) {

    return {
      props: { admins: error?.message, error: error?.message },

    }

  }
}