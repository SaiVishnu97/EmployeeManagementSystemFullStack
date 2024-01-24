
document.addEventListener('DOMContentLoaded', function () {

  const cancelIcons = document.querySelectorAll('.CancelIcon');
  cancelIcons.forEach(cancelIcon => {
    cancelIcon.addEventListener('click', async function () {
      // Retrieve the EmpId value from the data-empid attribute
      const empId = this.getAttribute('data-empid');
      
      // Use the empId value as needed
      console.log('CancelIcon clicked for EmpId:', empId);
      alert(`Are you sure you want to delete the employee with employeeId:${empId}`);

      const deleteurl=`http://localhost:3000/api/delete?`+new URLSearchParams({empId});
      try{
        const response=await fetch(deleteurl,{
          method : 'DELETE',
        });
        if(response.ok)
        {
          const result=await response.json();
          if(result)
          {
            alert("Employee record deleted successfully");
            location.reload();
          }
        }
        else
          console.error(`Error deleting record. Status: ${response.status}`);
      }
      
      catch(err){
        console.log(err);
      }
     
    });
  });
    const updateuserformDOM=document.querySelector('#update_userform')
    
    updateuserformDOM&&updateuserformDOM.addEventListener('submit',function (event) {
        // Prevent the default form submission
        event.preventDefault();

        // Extract form data
        const formData = new FormData(event.target);
        console.log(event.target);
        // Log the form data (you can do other processing here)
        const formObject = {};
        formData.forEach((value, key) => {
          formObject[key] = value;
        });

        // Log the form data (you can do other processing here)
        const jsonData = JSON.stringify(formObject);
        const updateurl='http://localhost:3000/api/updateuser'
        fetch(updateurl,{
          method : "PUT",
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: jsonData
        }).then(response=>response.json()).then(data=>alert("Employee record updated succesfully")).catch(err=>console.log(err))
    })
   
})