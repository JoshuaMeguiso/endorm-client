import { add, format } from 'date-fns'

const StatementDetails = ({statement}) => {
    const end_Month = add(new Date(statement.start_Month), {months: 1})
    
    return(
        <div className="tenant-details">
            <p>
                <strong>
                    Tenant Name &emsp;&emsp;&emsp;&emsp;:&emsp;
                </strong>
                {statement.tenant_Name}
            </p>
            <p>
                <strong>
                    Tenant ID&emsp;&emsp;&emsp;&emsp; &emsp;&emsp; :&emsp;
                </strong>
                {statement.tenant_ID}
            </p>
            <p>
                <strong>
                    Room ID&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;:&emsp;
                </strong>
                {statement.room_ID}
            </p>
            <p>
                <strong>
                    Period Covered&emsp;&emsp;&emsp; &nbsp;:&emsp;
                </strong>
                {format(new Date(statement.start_Month), 'MMMM dd, Y')} - 
            </p>
            <p>
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; &nbsp;{format(end_Month, 'MMMM dd, Y')}
            </p>
            <p>
                <strong>
                    Room Rate&emsp;&emsp;&emsp;&emsp;&emsp;&ensp; :&emsp;
                </strong>
                ₱ {parseFloat(statement.room_Rate).toFixed(2)}
            </p>
            <p>
                <strong>
                    Water Charge&emsp;&emsp;&emsp;&emsp;:&emsp; 
                </strong>
                ₱ {parseFloat(statement.water_Charge).toFixed(2)}
            </p>
            <p>
                <strong>
                    Previous Reading&emsp;&emsp; :&emsp;
                </strong>
                {statement.previous_Reading} KWH
            </p>
            <p>
                <strong>
                    Present Reading&emsp;&emsp;&ensp; :&emsp;
                </strong>
                {statement.present_Reading} KWH
            </p>
            <p>
                <strong>
                    Total Consume &emsp;&emsp;&emsp; :&emsp;
                </strong>
                {statement.total_Consume} KWH
            </p>
            <p>
                <strong>
                    Room Consume&emsp;&emsp;&emsp;:&emsp;
                </strong>
                ₱ {parseFloat(statement.room_Consume).toFixed(2)}
            </p>
            <p>
                <strong>
                    Individual Consume&ensp; :&emsp;
                </strong>
                ₱ {parseFloat(statement.individual_Consume).toFixed(2)}
            </p>
            <p>
                <strong>
                    Total Amount&emsp;&emsp;&emsp;&emsp; :&emsp; 
                </strong>
                ₱ {parseFloat(statement.total_Amount).toFixed(2)}
            </p>
        </div>
    )
}
export default StatementDetails