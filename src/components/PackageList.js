import React from "react";
import PackageData from "./PackageData";

export default ({data, active, update}) => {
    if(!data) {return (<p>Loading...</p>);}

    const packages = data.map((pckg, index) => {
        return (
            <PackageData pckg={pckg} data={data} active={active} 
                         index={index} key={`package-${index}`} update={update} />
        )
    });

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Number</th>
                    <th>Status</th>
                    <th>Location</th>
                    <th>Count</th>
                </tr>
            </thead>
           <tbody>
                {packages}
            </tbody>
        </table>
    );
}