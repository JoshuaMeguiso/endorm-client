import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTenantsContext } from "../hooks/useTenantsContext"

//components
import TenantDetails from '../components/tenantDetails'
import CurrentBalance from '../components/currentBalance'
import { useAuthContext } from '../hooks/useAuthContext'

const Profile = () => {
    const { tenants, dispatch } = useTenantsContext()
    const { user } = useAuthContext()
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTenants = async () => {
            const response = await fetch(`/tenant/${user.user_Name}`)
            const json = await response.json()
            if(response.ok){
               dispatch({type: 'SET_TENANTS', payload: json}) 
            }
        }
        fetchTenants();
        // eslint-disable-next-line
    }, [])

    return (
        <>
            {tenants && tenants.map((tenant) => (
                <div key={tenant.tenant_ID}>
                    <TenantDetails 
                        key={tenant.tenant_ID} 
                        tenant={tenant} 
                    />
                    <CurrentBalance 
                        key={tenant._id} 
                        tenant={tenant}
                    />
                </div>
            ))}
            <button className='btnPay' onClick={() => navigate('setting')}> 
                <i className="fa-solid fa-gear"></i> 
                <strong>Setting</strong>
            </button>
        </>
    )
} 

export default Profile